// Guides, loaded at build time from src/content/guides/<slug>.md and served at /<slug>/.
// Each file's frontmatter drives its page, its /<slug>.md mirror, llms.txt, llms-full.txt,
// the sitemap, the /guides/ index and JSON-LD. Only `status: published` ships. Published files
// are validated strictly (a bad one fails the build); drafts only warn.
// Local preview of drafts: SHOW_DRAFTS=1 bun run build (never deploy that build).
import { PRODUCTS } from '../data/products';
import { CATEGORIES, validateGuide, asDate, stripComments, type GuideFm, type CategoryId } from './guide-schema';

export type Heading = { depth: number; slug: string; text: string };
type Mod = { frontmatter: Record<string, unknown>; rawContent(): string; getHeadings(): Heading[]; Content: unknown };
export type Guide = { slug: string; fm: GuideFm; raw: string; Content: any; url: string; md: string; headings: Heading[] };

const mods = import.meta.glob<Mod>('../content/guides/*.md', { eager: true });
const showDrafts = typeof process !== 'undefined' && process.env?.SHOW_DRAFTS === '1';
const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');
const allSlugs = new Set(Object.keys(mods).map(slugOf));

const loaded: Guide[] = [];
for (const [path, m] of Object.entries(mods)) {
  const slug = slugOf(path);
  const fm = m.frontmatter;
  const raw = stripComments(m.rawContent()).trim();
  const problems = validateGuide(slug, fm, allSlugs, raw);
  if (problems.length) {
    const msg = `src/content/guides/${slug}.md:\n  - ${problems.join('\n  - ')}`;
    if (fm.status === 'published') throw new Error(`Invalid published guide\n${msg}`);
    console.warn(`[guides] draft has problems (not shipped)\n${msg}`);
  }
  if (fm.status !== 'published' && !showDrafts) continue;
  const g = { ...fm, published: asDate(fm.published), updated: asDate(fm.updated) } as GuideFm;
  loaded.push({ slug, fm: g, raw, Content: m.Content, url: `/${slug}/`, md: `/${slug}.md`, headings: m.getHeadings() });
}
// A published guide must never link to a draft.
const live = new Set(loaded.map(g => g.slug));
for (const g of loaded) g.fm.related = (g.fm.related ?? []).filter(r => live.has(r));

export const guides = loaded.sort((a, b) => (a.fm.order ?? 99) - (b.fm.order ?? 99) || a.fm.title.localeCompare(b.fm.title));
export const guideBySlug = (slug: string) => guides.find(g => g.slug === slug);
export const guidesIn = (cat: CategoryId) => guides.filter(g => g.fm.category === cat);
export const categoriesWithGuides = () => CATEGORIES.filter(c => guidesIn(c.id).length > 0);
export const categoryOf = (id: CategoryId) => CATEGORIES.find(c => c.id === id)!;
export const lastUpdated = () => guides.reduce((m, g) => (g.fm.updated > m ? g.fm.updated : m), '');

/** The guide as one Markdown document: body, our products (labelled), sources, FAQ. */
export function guideMarkdown(g: Guide, site: { url: string; publisher: { name: string } }): string {
  const parts = [`# ${g.fm.title}`, `Canonical: ${site.url}${g.url}\nPublisher: ${site.publisher.name}\nUpdated: ${g.fm.updated}`, `> ${g.fm.summary}`, g.raw];
  if (g.fm.ours?.length) parts.push(`## From the same studio\n\nThese are made by the studio that publishes this guide.\n\n${g.fm.ours.map(o => `- [${PRODUCTS[o.product].name}](${PRODUCTS[o.product].url}): ${o.why}`).join('\n')}`);
  parts.push(`## Questions people ask\n\n${g.fm.faq.map(f => `### ${f.q}\n\n${f.a}`).join('\n\n')}`);
  parts.push(`## Sources\n\n${g.fm.sources.map(s => `- [${s.label}](${s.url})`).join('\n')}`);
  return parts.join('\n\n') + '\n';
}
