import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The old registered office was Jack's home address: never publish it.
// The current registered office (5 Brayford Square) is published from 2026-10-23 (DESK-505).
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

test('the residential address never appears in source', () => {
  const hits = ['src', 'public', 'worker'].flatMap(files).filter((f) => /\.(astro|ts|mjs|js|json|md|txt|html)$/.test(f) && /Rothbury|E9 ?5PB|Flat 304/i.test(readFileSync(f, 'utf8')));
  assert.deepEqual(hits, []);
});

test('privacy text, footer and llms.txt carry the registered office', () => {
  for (const f of ['src/data/content.ts', 'src/layouts/Base.astro', 'src/pages/llms.txt.ts']) assert.match(readFileSync(f, 'utf8'), /5 Brayford Square/, f);
});
