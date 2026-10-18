// The guide frontmatter contract, and a validator with no build-tool dependencies so the
// build (src/lib/guides.ts) and the tests (tests/guides.test.ts) run the same checks.
//
//   ---
//   # scriptgrain: generation <id> … then Claude edit + fact-check
//   title: "GEO vs SEO: what is the difference?"   # the H1
//   seoTitle: "…"                                   # optional <title>, ≤ 60 chars
//   summary: "…"                                    # the direct answer, ≤ 220 chars (also the meta description)
//   category: basics | compare | platforms | technical | measure | choosing
//   ours:                                           # optional, ≤ 2, our products where they genuinely fit
//     - product: visibilitytoai                     # an id from src/data/products.ts
//       why: "…"
//   related: [other-slug, …]                        # optional
//   sources:                                        # ≥ 1
//     - label: "…"
//       url: https://…
//   faq:                                            # 3–6
//     - q: "…"
//       a: "…"
//   published: 2026-10-18
//   updated: 2026-10-18
//   status: draft | published
//   order: 10                                       # optional, lower first
//   ---
import { isProductId, type ProductId } from '../data/products';

export const CATEGORIES = [
  { id: 'basics', title: 'The basics', blurb: 'What the terms mean and where they came from.' },
  { id: 'compare', title: 'Comparisons', blurb: 'GEO, AEO, SEO and the rest, side by side.' },
  { id: 'platforms', title: 'Platform by platform', blurb: 'ChatGPT, Google AI Overviews, Perplexity and others.' },
  { id: 'technical', title: 'Technical', blurb: 'llms.txt, structured data, crawlers and access.' },
  { id: 'measure', title: 'Measuring it', blurb: 'Tracking mentions, citations and AI referral traffic.' },
  { id: 'choosing', title: 'Tools and help', blurb: 'Choosing software, agencies and courses without getting burned.' },
] as const;
export type CategoryId = typeof CATEGORIES[number]['id'];
export const CATEGORY_IDS = CATEGORIES.map(c => c.id) as readonly string[];

export type Source = { label: string; url: string };
export type Faq = { q: string; a: string };
export type Ours = { product: ProductId; why: string };
export type GuideFm = {
  title: string; seoTitle?: string; summary: string; category: CategoryId;
  ours?: Ours[]; related?: string[]; sources: Source[]; faq: Faq[];
  published: string; updated: string; status: 'draft' | 'published'; order?: number;
};

export const SUMMARY_MAX = 220;
export const SEO_TITLE_MAX = 60;
/** Paths the site already uses at the root; a guide slug may not shadow them. */
export const RESERVED = new Set(['guide', 'guides', 'privacy', 'confirm', 'llms', 'llms-full', 'sitemap', 'api', '404', 'og', 'favicon', 'robots', 'index']);
const KEYS = new Set(['title', 'seoTitle', 'summary', 'category', 'ours', 'related', 'sources', 'faq', 'published', 'updated', 'status', 'order']);
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const asDate = (v: unknown): string => {
  const s = v instanceof Date ? v.toISOString() : String(v ?? '');
  return /^\d{4}-\d{2}-\d{2}(T00:00:00(\.000)?Z)?$/.test(s) ? s.slice(0, 10) : s;
};
const nonEmpty = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const httpUrl = (v: unknown) => { try { return /^https?:$/.test(new URL(String(v)).protocol); } catch { return false; } };
const DASH = new RegExp(`[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}]`);

/** Problems with one guide (empty = valid). `slugs` = every guide slug, for `related`. */
export function validateGuide(slug: string, raw: Record<string, unknown>, slugs: Set<string> = new Set(), body = ''): string[] {
  const e: string[] = [];
  const fm = raw as Partial<GuideFm> & Record<string, unknown>;
  if (!SLUG.test(slug)) e.push(`slug "${slug}" must be lowercase-kebab`);
  if (RESERVED.has(slug)) e.push(`slug "${slug}" is reserved by another route`);
  for (const k of Object.keys(fm)) if (!KEYS.has(k)) e.push(`unknown key "${k}"`);
  if (!nonEmpty(fm.title)) e.push('title is required');
  if (fm.seoTitle !== undefined && (!nonEmpty(fm.seoTitle) || fm.seoTitle.length > SEO_TITLE_MAX)) e.push(`seoTitle, if set, must be 1-${SEO_TITLE_MAX} chars`);
  if (!nonEmpty(fm.summary)) e.push('summary is required');
  else if (fm.summary.length > SUMMARY_MAX) e.push(`summary is ${fm.summary.length} chars (max ${SUMMARY_MAX})`);
  if (!CATEGORY_IDS.includes(fm.category as string)) e.push(`category must be one of ${CATEGORY_IDS.join(' | ')}`);
  if (fm.ours !== undefined) {
    if (!Array.isArray(fm.ours) || fm.ours.length > 2) e.push('ours must be a list of at most 2');
    else fm.ours.forEach((o, i) => {
      if (!isProductId(o?.product)) e.push(`ours[${i}].product "${o?.product}" is not an id in src/data/products.ts`);
      if (!nonEmpty(o?.why)) e.push(`ours[${i}].why is required`);
    });
  }
  if (fm.related !== undefined) {
    if (!Array.isArray(fm.related)) e.push('related must be a list of slugs');
    else fm.related.forEach(r => {
      if (r === slug) e.push('related must not list the guide itself');
      else if (slugs.size && !slugs.has(String(r))) e.push(`related slug "${r}" has no guide file`);
    });
  }
  if (!Array.isArray(fm.sources) || fm.sources.length === 0) e.push('sources: at least one {label,url} is required');
  else fm.sources.forEach((s, i) => {
    if (!nonEmpty(s?.label)) e.push(`sources[${i}].label is required`);
    if (!httpUrl(s?.url)) e.push(`sources[${i}].url must be an http(s) URL`);
  });
  if (!Array.isArray(fm.faq) || fm.faq.length < 3 || fm.faq.length > 6) e.push('faq: 3-6 {q,a} items are required');
  else fm.faq.forEach((f, i) => { if (!nonEmpty(f?.q) || !nonEmpty(f?.a)) e.push(`faq[${i}] needs q and a`); });
  for (const k of ['published', 'updated'] as const) if (!DATE.test(asDate(fm[k]))) e.push(`${k} must be YYYY-MM-DD`);
  if (DATE.test(asDate(fm.published)) && DATE.test(asDate(fm.updated)) && asDate(fm.updated) < asDate(fm.published)) e.push('updated is before published');
  if (fm.status !== 'draft' && fm.status !== 'published') e.push('status must be draft | published');
  if (fm.order !== undefined && typeof fm.order !== 'number') e.push('order must be a number');
  if (body) {
    if (/^#\s/m.test(body)) e.push('body must not contain an H1 (the title is the H1)');
    if (DASH.test(body) || DASH.test(String(fm.summary ?? '')) || DASH.test(String(fm.title ?? ''))) e.push('em or en dash in the copy (house style: none)');
  }
  return e;
}

export const stripComments = (md: string) => md.replace(/<!--[\s\S]*?-->\n?/g, '');
