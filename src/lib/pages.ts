// Plain site pages written as Markdown (src/content/pages/<slug>.md). One text feeds the HTML page and its .md twin.
import { stripComments } from './guide-schema';
type PageMod = { frontmatter: { title: string; description: string; updated?: string }; rawContent(): string; Content: unknown };
const pageMods = import.meta.glob<PageMod>('../content/pages/*.md', { eager: true });
export function sitePage(slug: 'mcp-server') {
  const m = pageMods[`../content/pages/${slug}.md`];
  if (!m) throw new Error(`missing src/content/pages/${slug}.md`);
  return { slug, fm: m.frontmatter, raw: stripComments(m.rawContent()).trim(), Content: m.Content as any, url: `/${slug}/`, md: `/${slug}.md` };
}
