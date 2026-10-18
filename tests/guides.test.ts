// Every guide file (drafts included) must match the frontmatter contract in src/lib/guide-schema.ts.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { validateGuide, stripComments } from '../src/lib/guide-schema.ts';

const dir = new URL('../src/content/guides/', import.meta.url);
const files = readdirSync(dir).filter(f => f.endsWith('.md'));
const slugs = new Set(files.map(f => f.replace(/\.md$/, '')));
const split = (src: string) => { const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/); assert.ok(m, 'file must start with a --- frontmatter block'); return { fm: parse(m[1]) as Record<string, unknown>, head: m[1], body: stripComments(m[2]).trim() }; };

for (const f of files) {
  test(`${f} matches the guide contract`, () => {
    const { fm, head, body } = split(readFileSync(new URL(f, dir), 'utf8'));
    assert.deepEqual(validateGuide(f.replace(/\.md$/, ''), fm, slugs, body), []);
    assert.match(head, /^# scriptgrain: generation /m, 'needs the "# scriptgrain: generation …" provenance line');
  });
}

const good = {
  title: 'GEO vs SEO', summary: 'Short answer.', category: 'compare',
  sources: [{ label: 'Source', url: 'https://example.org/' }],
  faq: [{ q: 'a?', a: 'b' }, { q: 'c?', a: 'd' }, { q: 'e?', a: 'f' }],
  published: '2026-10-18', updated: '2026-10-18', status: 'published',
};
test('a valid guide passes', () => assert.deepEqual(validateGuide('geo-vs-seo', good, new Set(), 'Body text.'), []));
test('reserved slugs are refused', () => assert.ok(validateGuide('privacy', good).some(p => p.includes('reserved'))));
test('unknown keys are refused', () => assert.ok(validateGuide('x', { ...good, verdict: 'yes' }).some(p => p.includes('unknown key'))));
test('a bad category is refused', () => assert.ok(validateGuide('x', { ...good, category: 'misc' }).length > 0));
test('more than two products is refused', () => assert.ok(validateGuide('x', { ...good, ours: [1, 2, 3].map(() => ({ product: 'hilyt', why: 'w' })) }).length > 0));
test('an unknown product is refused', () => assert.ok(validateGuide('x', { ...good, ours: [{ product: 'nope', why: 'w' }] }).length > 0));
test('an H1 in the body is refused', () => assert.ok(validateGuide('x', good, new Set(), '# Title\n\nText').length > 0));
test('an em dash in the body is refused', () => assert.ok(validateGuide('x', good, new Set(), `A ${String.fromCharCode(0x2014)} B`).length > 0));
test('a dangling related slug is refused', () => assert.ok(validateGuide('x', { ...good, related: ['missing'] }, new Set(['x'])).length > 0));
test('a summary over the limit is refused', () => assert.ok(validateGuide('x', { ...good, summary: 'a'.repeat(221) }).length > 0));
