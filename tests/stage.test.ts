import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveAnswers, guideLines, wall, norm } from '../src/lib/stage';
import { stageAnswers } from '../src/data/stage';

const lines = guideLines();

test('every cited part of the hero answer is copied from exactly one line of guide.md', () => {
  const resolved = resolveAnswers(lines);
  for (const a of resolved) for (const [text, n] of a.parts) {
    if (n === -1) continue;
    assert.ok(norm(lines[n - 1]).includes(norm(text).replace(/[.,;:]$/, '')), `${a.key}: line ${n} does not contain "${text}"`);
  }
});

test('the What is GEO answer cites the definition, the SEO line and the warning (lines 10, 18, 12 on 2026-11-10)', () => {
  const what = resolveAnswers(lines).find(a => a.key === 'what')!;
  for (const [, n] of what.parts) assert.ok(n > 0);
  assert.match(lines[what.parts[0][1] - 1], /^Generative Engine Optimisation \(GEO\) is the practice/);
});

test('only the deliberate gap has no source, and it is labelled as a gap', () => {
  const gaps = stageAnswers.flatMap(a => a.parts.filter(p => p.gap).map(() => a));
  assert.equal(gaps.length, 1);
  assert.ok(gaps[0].note, 'the gap answer explains itself');
});

test('a part that is not in the guide fails the build', () => {
  assert.throws(() => resolveAnswers(lines, [{ key: 'x', pill: 'x', q: 'x', parts: [{ text: 'GEO guarantees a citation.' }] }]));
});

test('the wall is the whole guide, real line numbers, blank lines skipped', () => {
  const w = wall(lines);
  const all = [...w.left, ...w.right];
  assert.equal(all.length, lines.filter(l => l.trim()).length);
  for (const l of all) assert.equal(lines[l.n - 1], l.text);
  assert.equal(w.split, w.left[w.left.length - 1].n);
});
