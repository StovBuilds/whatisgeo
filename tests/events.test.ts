import test from 'node:test';
import assert from 'node:assert/strict';
import { ingest, exportData, type EventsEnv } from '../worker/events';

// A D1 stand-in that records what would be inserted; the real schema is proven
// against wrangler dev with the local D1 (see the analytics skill), not here.
function fakeDb() {
  const rows: unknown[][] = [];
  const db = {
    prepare: () => ({ bind: (...args: unknown[]) => ({ args }) }),
    batch: async (stmts: Array<{ args: unknown[] }>) => { for (const s of stmts) rows.push(s.args); return []; },
  } as unknown as D1Database;
  return { db, rows };
}
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('https://whatisgeo.app/api/e', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://whatisgeo.app', 'user-agent': UA, ...headers }, body: JSON.stringify(body) });

test('ingest stores allowed events with clipped props and drops the rest', async () => {
  const { db, rows } = fakeDb();
  const env = { SITE_URL: 'https://whatisgeo.app', EVENTS: db } as EventsEnv;
  const res = await ingest(post({ events: [
    { type: 'pageview', path: '/', referrer: 'https://chatgpt.com/', session_id: 's1', device: 'desktop', props: { kind: 'guide' } },
    { type: 'email', path: '/', session_id: 's1', props: { e: 'a@b.c' } },
    { type: 'scroll', path: '/', session_id: 's1', props: { depth: 50, note: 'x'.repeat(500) } },
  ] }), env);
  assert.deepEqual(await res.json(), { ok: true, stored: 2 });
  assert.equal(rows.length, 2);
  assert.equal(rows[0][1], 'pageview'); assert.equal(rows[0][3], 'https://chatgpt.com/');
  assert.equal(JSON.parse(rows[1][10] as string).note.length, 200);
  assert.ok(!JSON.stringify(rows).includes('a@b.c'));
});

test('ingest drops fleet and automation user agents and the fleet VPS, and refuses other origins', async () => {
  const { db, rows } = fakeDb();
  const env = { SITE_URL: 'https://whatisgeo.app', EVENTS: db } as EventsEnv;
  for (const ua of ['JarvisFleet/1.0', 'Mozilla/5.0 (X11) HeadlessChrome/140', 'curl/8.0', 'Mozilla/5.0 AppleWebKit/537.36 (compatible; GPTBot/1.4)']) {
    assert.deepEqual(await (await ingest(post({ events: [{ type: 'pageview', path: '/' }] }, { 'user-agent': ua }), env)).json(), { ok: true, stored: 0 });
  }
  assert.deepEqual(await (await ingest(post({ events: [{ type: 'pageview', path: '/' }] }, { 'cf-connecting-ip': '65.21.52.116' }), env)).json(), { ok: true, stored: 0 });
  assert.equal((await ingest(post({ events: [{ type: 'pageview', path: '/' }] }, { origin: 'https://evil.example' }), env)).status, 403);
  assert.equal(rows.length, 0);
});

test('export-data is gated by the key and absent until configured', async () => {
  const get = (key?: string) => new Request('https://whatisgeo.app/api/export-data?action=analytics', { headers: key ? { 'x-api-key': key } : {} });
  assert.equal((await exportData(get('k'), { SITE_URL: 'https://whatisgeo.app' } as EventsEnv)).status, 404);
  const env = { SITE_URL: 'https://whatisgeo.app', EXPORT_API_KEY: 'right', EVENTS: fakeDb().db } as EventsEnv;
  assert.equal((await exportData(get(), env)).status, 401);
  assert.equal((await exportData(get('wrong'), env)).status, 401);
  assert.equal((await exportData(get('rightx'), env)).status, 401);
});
