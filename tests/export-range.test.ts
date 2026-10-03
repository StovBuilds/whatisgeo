import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exportData, type EventsEnv } from '../worker/events.ts';

// export-data: optional from/to window (fake D1 records every statement + binds).
function fakeD1() {
  const calls: Array<{ sql: string; binds: unknown[] }> = [];
  const db = { prepare(sql: string) { return { bind(...binds: unknown[]) { return { async all() { calls.push({ sql, binds }); return { results: /substr\(ts,1,13\)/.test(sql) ? [{ h: '2026-10-03T10', pageviews: 3, sessions: 2 }] : [] }; } }; } }; } } as unknown as D1Database;
  return { db, calls };
}
const exp = (qs: string, db: D1Database) => exportData(new Request(`https://example.test/api/export-data?${qs}`, { headers: { 'x-api-key': 'k' } }), { SITE_URL: 'https://example.test', EXPORT_API_KEY: 'k', EVENTS: db } as EventsEnv);

test('export-data from/to: windowed queries, range, days, hourly', async () => {
  const { db, calls } = fakeD1();
  const r = await exp('action=analytics&from=2026-10-03T00:00:00Z&to=2026-10-04T06:00:00Z', db);
  assert.equal(r.status, 200);
  const a = (await r.json() as { analytics: Record<string, unknown> }).analytics;
  assert.deepEqual(a.range, { from: '2026-10-03T00:00:00.000Z', to: '2026-10-04T06:00:00.000Z' });
  assert.equal(a.days, 2);
  assert.deepEqual(a.hourly, [{ hour: '2026-10-03T10:00:00Z', pageviews: 3, sessions: 2 }]);
  assert.ok(calls.length > 10);
  for (const c of calls) { assert.deepEqual(c.binds, ['2026-10-03T00:00:00.000Z', '2026-10-04T06:00:00.000Z']); assert.match(c.sql, /ts<\?2/); assert.doesNotMatch(c.sql, /ts>=\?(?!1)/); }
});
test('export-data from/to: long ranges have no hourly; rolling mode is unchanged', async () => {
  const a = (await (await exp('from=2026-09-01T00:00:00Z&to=2026-09-20T00:00:00Z', fakeD1().db)).json() as { analytics: Record<string, unknown> }).analytics;
  assert.equal(a.days, 19); assert.equal('hourly' in a, false);
  const b = (await (await exp('days=7', fakeD1().db)).json() as { analytics: Record<string, unknown> }).analytics;
  assert.equal(b.days, 7); assert.equal('range' in b, false); assert.equal('hourly' in b, false);
});
test('export-data from/to: bad input is a 400', async () => {
  for (const qs of ['from=nope', 'from=2026-10-03T00:00:00Z&to=nope', 'from=2026-10-04T00:00:00Z&to=2026-10-03T00:00:00Z', 'from=2026-10-03T00:00:00Z&to=2026-10-03T00:00:00Z', 'from=2024-01-01T00:00:00Z&to=2026-01-01T00:00:00Z']) {
    const r = await exp(qs, fakeD1().db);
    assert.equal(r.status, 400, qs);
    assert.equal((await r.json() as { ok: boolean }).ok, false);
  }
});
