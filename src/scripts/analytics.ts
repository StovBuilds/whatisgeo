// First-party, anonymous analytics. No cookies, no IP, no user agent, no email.
// A random per-tab id in sessionStorage groups one visit's events and is gone
// when the tab closes. Honours Global Privacy Control, Do Not Track and the
// opt-out switch on /privacy/. Every call is fail-silent: analytics must never
// break or slow the page. Events land at /api/e on this origin (worker/events.ts).
type Props = Record<string, string | number | boolean>;
type Ev = { type: string; path: string; referrer: string; session_id: string; utm_source: string; utm_medium: string; utm_campaign: string; device: string; props: Props };
const OPT_OUT = 'analytics_opt_out';
const queue: Ev[] = []; let timer = 0;
const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
function enabled(): boolean {
  try { return !(nav.globalPrivacyControl || navigator.doNotTrack === '1' || localStorage.getItem(OPT_OUT) === '1'); } catch { return true; }
}
function sid(): string { try { let s = sessionStorage.getItem('wig_sid'); if (!s) { s = crypto.randomUUID(); sessionStorage.setItem('wig_sid', s); } return s; } catch { return ''; } }
function referrer(): string { try { if (sessionStorage.getItem('wig_ref') === '1') return ''; sessionStorage.setItem('wig_ref', '1'); const r = document.referrer; return r && new URL(r).host !== location.host ? r : ''; } catch { return ''; } }
function utm(k: string) { return new URLSearchParams(location.search).get(k) ?? ''; }
function flush(beacon = false) {
  if (!queue.length) return;
  const body = JSON.stringify({ events: queue.splice(0, 20) });
  try {
    if (beacon && navigator.sendBeacon) navigator.sendBeacon('/api/e', new Blob([body], { type: 'application/json' }));
    else fetch('/api/e', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* never surface */ }
}
export function track(type: string, props: Props = {}, beacon = false) {
  if (!enabled()) return;
  queue.push({ type, path: location.pathname, referrer: type === 'pageview' ? referrer() : '', session_id: sid(), utm_source: utm('utm_source'), utm_medium: utm('utm_medium'), utm_campaign: utm('utm_campaign'), device: innerWidth < 768 ? 'mobile' : innerWidth < 1024 ? 'tablet' : 'desktop', props });
  if (beacon) { clearTimeout(timer); timer = 0; flush(true); return; }
  if (!timer) timer = window.setTimeout(() => { timer = 0; flush(); }, 2500);
}

// The guide is the home page; everything else is a utility page.
const kind = location.pathname === '/' ? 'guide' : location.pathname.replace(/^\/|\/$/g, '') || 'page';
track('pageview', { kind });

// Scroll depth: 25/50/75/100 once each per page, measured against the document.
let maxDepth = 0; const sent = new Set<number>();
function depth() {
  const doc = document.documentElement; const total = doc.scrollHeight - innerHeight;
  const d = total <= 0 ? 100 : Math.min(100, Math.round(((scrollY + innerHeight) / doc.scrollHeight) * 100));
  if (d > maxDepth) maxDepth = d;
  for (const m of [25, 50, 75, 100]) if (d >= m && !sent.has(m)) { sent.add(m); track('scroll', { depth: m, kind }); }
}
addEventListener('scroll', () => requestAnimationFrame(depth), { passive: true }); depth();

// Visible time on the page, sent once when the visitor leaves.
let visibleSince = document.visibilityState === 'visible' ? Date.now() : 0; let visible = 0; let left = false;
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { if (visibleSince) visible += Date.now() - visibleSince; visibleSince = 0; leave(); } else visibleSince = Date.now(); });
addEventListener('pagehide', leave);
function leave() { if (left) return; left = true; if (visibleSince) visible += Date.now() - visibleSince; track('page_leave', { seconds: Math.round(visible / 1000), max_depth: maxDepth, kind }, true); }

// Outbound clicks: host + path only.
document.addEventListener('click', event => {
  const a = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  let u: URL; try { u = new URL(a.href); } catch { return; }
  if (u.host === location.host || !/^https?:$/.test(u.protocol)) return;
  track('outbound_click', { host: u.host, url: u.pathname.slice(0, 120), from: kind }, true);
}, { capture: true });

// Signup outcome (site.ts dispatches this; no email involved).
addEventListener('wig:signup', e => track('signup', { outcome: String((e as CustomEvent).detail ?? 'unknown') }));
