import { fullGuide } from './content';
import { stageAnswers, type StageAnswer } from '../data/stage';

/** Straight quotes, single spaces: how a part is compared with a line of guide.md. */
export const norm = (t: string) => t.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
/** A cut clause may close with a full stop the guide has as a comma; compare without the closing mark. */
const core = (t: string) => norm(t).replace(/[.,;:]$/, '');

export interface WallLine { n: number; text: string; heading: boolean }
export interface ResolvedAnswer { key: string; pill: string; q: string; parts: [string, number][]; note?: [string, string] }

/** guide.md exactly as /guide.md serves it, numbered from 1. */
export function guideLines() { return fullGuide().split('\n'); }

/** Find the one line of guide.md each part was copied from. Throws (and so fails the build) if a part is not in
 * the guide, or appears on more than one line. */
export function resolveAnswers(lines = guideLines(), answers: StageAnswer[] = stageAnswers): ResolvedAnswer[] {
  const normed = lines.map(norm);
  return answers.map(a => ({
    key: a.key, pill: a.pill, q: a.q, note: a.note,
    parts: a.parts.map(p => {
      if (p.gap) return [p.text, -1] as [string, number];
      const want = core(p.text);
      const hits = normed.flatMap((l, i) => (l.includes(want) ? [i + 1] : []));
      if (hits.length !== 1) throw new Error(`stage hero: "${want}" is on ${hits.length} lines of guide.md (needs exactly 1)`);
      return [p.text, hits[0]] as [string, number];
    })
  }));
}

/** The wall either side of the stage: every non-blank line of guide.md, numbered by its real line number (blank
 * lines are skipped, never renumbered), split in half. */
export function wall(lines = guideLines()) {
  const items: WallLine[] = lines.map((text, i) => ({ n: i + 1, text, heading: text.startsWith('#') })).filter(l => l.text.trim());
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half), right = items.slice(half);
  return { left, right, rows: half, split: left[left.length - 1].n };
}
