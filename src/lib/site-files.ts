// The site as files: guide.md and its chapters, each guide's served .md, and the numbers the file list shows.
// Everything here is computed from the same text the .md routes serve, so a count can never drift from the file.
import { sections, site } from '../data/content';
import { fullGuide } from './content';
import { guides, guideMarkdown, guidesIn, categoriesWithGuides, type Guide } from './guides';
import { chaptersOf, lineCount, wordCount } from './linefile';

export const minutes = (words: number) => Math.max(1, Math.ceil(words / 200));
const sectionIdByTitle = new Map<string, string>(sections.map(s => [s.title, s.id]));

/** guide.md as /guide.md serves it. */
export function guideFile() {
  const text = fullGuide();
  const lines = text.split('\n');
  const chapters = chaptersOf(lines).map(c => ({ ...c, id: sectionIdByTitle.get(c.title) ?? `L${c.from}` }));
  const words = wordCount(text);
  return { text, lines, chapters, count: lineCount(text), words, minutes: minutes(words) };
}

/** A guide's served /<slug>.md, with the ids its headings had on the live page (Astro's slugs). */
export function guideFileOf(g: Guide) {
  const text = guideMarkdown(g, site);
  const lines = text.split('\n');
  const slugs = new Map<string, string[]>();
  for (const h of g.headings) slugs.set(h.text, [...(slugs.get(h.text) ?? []), h.slug]);
  const fixed: Record<string, string> = { 'From the same studio': 'ours', 'Questions people ask': 'questions', 'Sources': 'sources' };
  const bodyStart = lines.indexOf(g.raw.split('\n')[0]) + 1;
  const bodyEnd = bodyStart + g.raw.split('\n').length - 1;
  const headingId = (text: string, depth: number, line: number) => {
    if (depth === 1) return undefined;
    if (line > bodyEnd) return depth === 2 ? fixed[text] : undefined;
    const plainText = text.replace(/[*_`]/g, '');
    const list = slugs.get(plainText) ?? slugs.get(text);
    return list?.shift();
  };
  const sectionsOf = chaptersOf(lines).map(c => ({ ...c, id: c.from > bodyEnd ? fixed[c.title] ?? `L${c.from}` : undefined as string | undefined }));
  const leadLine = lines.findIndex(l => l.startsWith('> ')) + 1;
  const words = wordCount(g.raw);
  return { text, lines, count: lineCount(text), words, minutes: minutes(words), headingId, sections: sectionsOf, leadLine, bodyStart, bodyEnd };
}

export const guideStats = (g: Guide) => ({ words: wordCount(g.raw), sources: g.fm.sources.length });
export { guides, guidesIn, categoriesWithGuides };
