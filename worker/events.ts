// First-party, anonymous analytics for whatisgeo.app.
//
//   POST /api/e            — the browser posts small batches of events (same origin only).
//   GET  /api/export-data  — the fleet dashboard reads aggregates with an x-api-key
//                            (same contract as every other site's export-data).
//
// What is stored: event type, path, referrer (external only), a random per-tab
// session id, utm tags, a device bucket, the country Cloudflare reports, and a
// small props object. What is never stored: IP address, user agent, cookies,
// the email typed into the signup form. Ported from howtogetaito 2026-09-17.
export interface EventsEnv {
  SITE_URL: string;
  EVENTS?: D1Database;
  EVENTS_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  EXPORT_API_KEY?: string;
}
// Our own traffic is not an audience: fleet browsers carry "JarvisFleet/1.0" or an
// automation UA, and anything from the fleet VPS is dropped whatever UA it chose.
const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gtmetrix|gpt|claude|anthropic|perplexity|python-requests|python-httpx|curl\/|wget|node-fetch|undici|go-http-client|okhttp|playwright|puppeteer|jarvisfleet/i;
const INTERNAL_IPS = ['65.21.52.116', '2a01:4f9:c014:41c3'];
const ALLOWED_TYPES = new Set(['pageview', 'scroll', 'page_leave', 'outbound_click', 'signup', 'cta_click', 'theme']);
const clip = (v: unknown, max: number) => (typeof v === 'string' ? v : v == null ? '' : String(v)).slice(0, max);
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function ingest(request: Request, env: EventsEnv): Promise<Response> {
  if (!env.EVENTS) return json({ ok: false, error: 'unavailable' }, 503);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, error: 'forbidden' }, 403);
  const ip = (request.headers.get('cf-connecting-ip') || '').trim();
  if (BOT_RE.test(request.headers.get('user-agent') || '') || INTERNAL_IPS.some(p => ip === p || ip.startsWith(p + ':'))) return json({ ok: true, stored: 0 });
  if (env.EVENTS_LIMITER) { const { success } = await env.EVENTS_LIMITER.limit({ key: ip || 'local' }); if (!success) return json({ ok: false, error: 'rate_limited' }, 429); }
  if (Number(request.headers.get('content-length') ?? 0) > 16_384) return json({ ok: false, error: 'too_large' }, 413);
  let body: { events?: unknown };
  try { body = await request.json() as { events?: unknown }; } catch { return json({ ok: false, error: 'invalid' }, 400); }
  const raw = Array.isArray(body.events) ? body.events.slice(0, 20) : [];
  if (!raw.length) return json({ ok: false, error: 'invalid' }, 400);
  const country = clip(request.headers.get('cf-ipcountry'), 2).toUpperCase();
  const ts = new Date().toISOString();
  const rows = raw.map(e => e as Record<string, unknown>).filter(e => ALLOWED_TYPES.has(String(e.type))).map(e => {
    const props = e.props && typeof e.props === 'object' && !Array.isArray(e.props) ? Object.fromEntries(Object.entries(e.props as Record<string, unknown>).slice(0, 12).map(([k, v]) => [k.slice(0, 40), typeof v === 'number' ? v : clip(v, 200)])) : {};
    return [ts, clip(e.type, 40), clip(e.path, 300) || '/', clip(e.referrer, 300), clip(e.session_id, 64), clip(e.utm_source, 100), clip(e.utm_medium, 100), clip(e.utm_campaign, 100), clip(e.device, 20), country, JSON.stringify(props)];
  });
  if (!rows.length) return json({ ok: true, stored: 0 });
  const stmt = env.EVENTS.prepare('INSERT INTO site_events (ts,type,path,referrer,session_id,utm_source,utm_medium,utm_campaign,device,country,props) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
  await env.EVENTS.batch(rows.map(r => stmt.bind(...r)));
  return json({ ok: true, stored: rows.length });
}

const AI_REFERRER: Array<[RegExp, string]> = [
  [/chatgpt\.com|chat\.openai\.com/i, 'ChatGPT'], [/perplexity\.ai/i, 'Perplexity'], [/claude\.ai/i, 'Claude'],
  [/(gemini|bard)\.google\.com/i, 'Gemini'], [/copilot\.microsoft\.com/i, 'Copilot'], [/chat\.mistral\.ai/i, 'Mistral'],
  [/grok\.com|x\.ai/i, 'Grok'], [/you\.com/i, 'You.com'], [/poe\.com/i, 'Poe'],
];
function assistantFor(referrer: string, utm: string): string | null {
  for (const [re, name] of AI_REFERRER) if (re.test(referrer) || re.test(utm)) return name;
  return null;
}

export async function exportData(request: Request, env: EventsEnv): Promise<Response> {
  if (!env.EXPORT_API_KEY) return json({ ok: false, error: 'not_configured' }, 404);
  const key = request.headers.get('x-api-key') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!key || key.length !== env.EXPORT_API_KEY.length || key !== env.EXPORT_API_KEY) return json({ ok: false, error: 'unauthorised' }, 401);
  if (!env.EVENTS) return json({ ok: false, error: 'unavailable' }, 503);
  const url = new URL(request.url);
  const action = url.searchParams.get('action') ?? 'summary';
  const days = Math.min(365, Math.max(1, Number(url.searchParams.get('days') ?? 30) || 30));
  if (action !== 'analytics' && action !== 'summary') return json({ ok: false, error: `Unknown action '${action}'. Use analytics | summary.` }, 400);
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const db = env.EVENTS;
  const q = async <T = Record<string, unknown>>(sql: string, ...binds: unknown[]) => (await db.prepare(sql).bind(...binds).all<T>()).results;
  // "Engaged" = a session a person plausibly sat in, as opposed to a headless
  // scanner that loads one page, fires every scroll mark and leaves inside one
  // batch: a second pageview, a real interaction (scroll marks and page_leave
  // are not one), >=5 s visible at page_leave, or events spread >=10 s apart.
  // Same definition as every other site's export (estate-wide 2026-09-17).
  const ENGAGED = `SELECT session_id, substr(MIN(ts),1,10) AS date FROM site_events WHERE ts>=? AND session_id<>'' GROUP BY session_id
      HAVING SUM(type='pageview')>=2 OR SUM(type NOT IN ('pageview','scroll','page_leave','theme'))>0
          OR MAX(CASE WHEN type='page_leave' THEN json_extract(props,'$.seconds') END)>=5
          OR (julianday(MAX(ts))-julianday(MIN(ts)))*86400>=10`;
  const [totals, daily, topPaths, referrers, utms, devices, countries, eventCounts, pages, outbound, scroll, leave, aiRefs, signups, ctas, engaged, engagedDaily] = await Promise.all([
    q(`SELECT SUM(type='pageview') AS pageviews, COUNT(DISTINCT CASE WHEN session_id<>'' THEN session_id END) AS sessions, COUNT(*) AS events FROM site_events WHERE ts>=?`, since),
    q(`SELECT substr(ts,1,10) AS date, SUM(type='pageview') AS pageviews, COUNT(DISTINCT CASE WHEN session_id<>'' THEN session_id END) AS sessions FROM site_events WHERE ts>=? GROUP BY date ORDER BY date`, since),
    q(`SELECT path, COUNT(*) AS pageviews, COUNT(DISTINCT session_id) AS sessions FROM site_events WHERE ts>=? AND type='pageview' GROUP BY path ORDER BY pageviews DESC LIMIT 50`, since),
    q(`SELECT referrer, COUNT(*) AS pageviews FROM site_events WHERE ts>=? AND type='pageview' AND referrer<>'' GROUP BY referrer ORDER BY pageviews DESC LIMIT 30`, since),
    q(`SELECT utm_source AS source, COUNT(*) AS pageviews FROM site_events WHERE ts>=? AND type='pageview' AND utm_source<>'' GROUP BY utm_source ORDER BY pageviews DESC LIMIT 20`, since),
    q(`SELECT device, COUNT(*) AS pageviews FROM site_events WHERE ts>=? AND type='pageview' GROUP BY device ORDER BY pageviews DESC`, since),
    q(`SELECT country, COUNT(*) AS pageviews FROM site_events WHERE ts>=? AND type='pageview' AND country<>'' GROUP BY country ORDER BY pageviews DESC LIMIT 30`, since),
    q(`SELECT type, COUNT(*) AS count FROM site_events WHERE ts>=? GROUP BY type ORDER BY count DESC`, since),
    // The guide is one long page: how many sessions read it to the end is the number that matters.
    q(`SELECT p.path, COUNT(*) AS pageviews, COUNT(DISTINCT p.session_id) AS sessions,
         (SELECT COUNT(DISTINCT s.session_id) FROM site_events s WHERE s.type='scroll' AND s.path=p.path AND s.ts>=? AND json_extract(s.props,'$.depth')>=100) AS read_completes
       FROM site_events p WHERE p.ts>=? AND p.type='pageview' AND json_extract(p.props,'$.kind')='guide' GROUP BY p.path ORDER BY pageviews DESC LIMIT 100`, since, since),
    q(`SELECT json_extract(props,'$.host') AS host, json_extract(props,'$.url') AS url, COUNT(*) AS clicks FROM site_events WHERE ts>=? AND type='outbound_click' GROUP BY host, url ORDER BY clicks DESC LIMIT 50`, since),
    q(`SELECT json_extract(props,'$.depth') AS depth, COUNT(*) AS count FROM site_events WHERE ts>=? AND type='scroll' GROUP BY depth ORDER BY depth`, since),
    q(`SELECT COUNT(*) AS n, AVG(json_extract(props,'$.seconds')) AS avg_seconds, AVG(json_extract(props,'$.max_depth')) AS avg_max_depth FROM site_events WHERE ts>=? AND type='page_leave'`, since),
    q<{ ts: string; path: string; referrer: string; utm_source: string }>(`SELECT ts, path, referrer, utm_source FROM site_events WHERE ts>=? AND type='pageview' AND (referrer<>'' OR utm_source<>'') ORDER BY ts DESC LIMIT 500`, since),
    q(`SELECT json_extract(props,'$.outcome') AS outcome, COUNT(*) AS count FROM site_events WHERE ts>=? AND type='signup' GROUP BY outcome ORDER BY count DESC`, since),
    q(`SELECT json_extract(props,'$.id') AS id, COUNT(*) AS clicks, COUNT(DISTINCT session_id) AS sessions FROM site_events WHERE ts>=? AND type='cta_click' GROUP BY id ORDER BY clicks DESC LIMIT 30`, since),
    q(`SELECT COUNT(*) AS n FROM (${ENGAGED})`, since),
    q<{ date: string; engaged_sessions: number }>(`SELECT date, COUNT(*) AS engaged_sessions FROM (${ENGAGED}) GROUP BY date ORDER BY date`, since),
  ]);
  const ai_referrals = aiRefs.map(r => ({ assistant: assistantFor(r.referrer, r.utm_source), ts: r.ts, path: r.path, referrer: r.referrer, utm_source: r.utm_source })).filter(r => r.assistant).slice(0, 200);
  const t = totals[0] ?? {};
  const engagedByDate = new Map(engagedDaily.map(r => [r.date, Number(r.engaged_sessions ?? 0)]));
  const analytics = {
    days, generated_at: new Date().toISOString(),
    totals: { pageviews: Number(t.pageviews ?? 0), sessions: Number(t.sessions ?? 0), events: Number(t.events ?? 0), engaged_sessions: Number((engaged[0] ?? {}).n ?? 0) },
    daily: daily.map(d => ({ ...d, engaged_sessions: engagedByDate.get(String(d.date)) ?? 0 })), top_paths: topPaths, top_referrers: referrers, utm_sources: utms, devices, countries, event_counts: eventCounts,
    ai_referrals, blog_posts: pages,
    // whatisgeo-specific extras (the dashboard ignores what it does not know)
    outbound_clicks: outbound, scroll_depth: scroll,
    reading: { page_leaves: Number(leave[0]?.n ?? 0), avg_visible_seconds: Math.round(Number(leave[0]?.avg_seconds ?? 0)), avg_max_depth: Math.round(Number(leave[0]?.avg_max_depth ?? 0)) },
    signups, cta_clicks: ctas,
  };
  if (action === 'analytics') return json({ ok: true, site: 'whatisgeo', action, analytics });
  return json({ ok: true, site: 'whatisgeo', action, days, analytics, posts: [], subscribers: null });
}
