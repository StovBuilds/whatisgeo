// The linefile renderer (src/lib/linefile.ts): every gutter number is the real line of the served .md, footnotes are
// never invented, and the guide's chapters keep the ids the old /#<chapter> links used.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { renderLines, citations, chaptersOf, lineCount } from '../src/lib/linefile.ts';
import { guideLines } from '../src/lib/stage.ts';
import { sources } from '../src/lib/content.ts';
import { sections } from '../src/data/content.ts';
import { footnotes } from '../src/data/footnotes.ts';

const lines = guideLines();
const srcs = sources.map(s => ({ label: s.name, url: s.url }));
const count = lineCount(lines.join('\n'));

test('every non-blank line of guide.md is a row numbered with its real line (fences skipped)', () => {
  const { html } = renderLines(lines, 1, count, { sources: srcs });
  const ids = new Set([...html.matchAll(/id="L(\d+)"/g)].map(m => Number(m[1])));
  lines.forEach((l, i) => {
    const n = i + 1;
    if (!l.trim() || /^(```|~~~)/.test(l.trim()) || /^\|\s*-/.test(l.trim()) || (l.trim().startsWith('|') && lines[i - 1]?.trim().startsWith('|'))) return;
    assert.ok(ids.has(n), `line ${n} has no row: ${l.slice(0, 60)}`);
  });
  for (const m of html.matchAll(/id="L(\d+)"[^>]*><span class="lf-n" aria-hidden="true">(\d+)<\/span>/g)) assert.equal(m[1], m[2]);
});

test('a line is cited only when it links one of the sources', () => {
  const cited = citations(lines, 1, count, { sources: srcs });
  const expected = lines.flatMap((l, i) => (srcs.some(s => l.includes(`](${s.url})`)) ? [i + 1] : []));
  assert.deepEqual([...cited.keys()].sort((a, b) => a - b), expected);
  assert.ok(expected.length >= 4, 'the guide links its sources inline');
});

test('a footnote phrase that is not in the text fails the build', () => {
  assert.throws(() => citations(['Some text.'], 1, 1, { sources: srcs, footnotes: [{ phrase: 'not here', source: 1 }] }));
  assert.throws(() => citations(['Some text.'], 1, 1, { sources: srcs, footnotes: [{ phrase: 'Some', source: 99 }] }));
});

test('every placed footnote names its source document, on exactly one body line, with a real source number', () => {
  const dir = new URL('../src/content/guides/', import.meta.url);
  for (const [slug, notes] of Object.entries(footnotes)) {
    const raw = readFileSync(new URL(`${slug}.md`, dir), 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)!;
    const fm = parse(m[1]) as { sources: { url: string }[] };
    const body = m[2].split('\n');
    for (const f of notes) {
      assert.equal(body.filter(l => l.includes(f.phrase)).length, 1, `${slug}: "${f.phrase}"`);
      assert.ok(f.source >= 1 && f.source <= fm.sources.length, `${slug}: source ${f.source}`);
    }
  }
});

test('the guide keeps its chapter ids, and Get started is chapter 07 "Your first 30 days"', () => {
  const chapters = chaptersOf(lines);
  const ids = sections.filter(s => s.id !== 'hero' && s.id !== 'updates');
  assert.deepEqual(chapters.map(c => c.title), ids.map(s => s.title));
  assert.equal(chapters[6].title, 'Your first 30 days');
  assert.equal(ids[6].id, 'getting-started');
  assert.equal(lines[2], 'Canonical: https://whatisgeo.app/guide/');
});

test('guides link the guide at /guide/#<chapter>, never the old home anchors', () => {
  const dir = new URL('../src/content/guides/', import.meta.url);
  for (const f of readdirSync(dir).filter(f => f.endsWith('.md'))) assert.doesNotMatch(readFileSync(new URL(f, dir), 'utf8'), /\]\(\/#/, f);
});

test('tables stack on phones: every body cell carries its column label', () => {
  const { html } = renderLines(['| | SEO | GEO |', '| --- | --- | --- |', '| Goal | Rank | Be cited |'], 1, 3);
  assert.match(html, /data-label="SEO"/);
  assert.match(html, /data-label="GEO"/);
  assert.match(html, /scope="row">Goal/);
});
