import { site, updatedISO } from '../data/content';
import { guides, lastUpdated } from '../lib/guides';
// Generated from the guide's date constant and each guide's own `updated`, so lastmod cannot go stale by hand.
const latest = [updatedISO, lastUpdated()].sort().pop()!;
const urls: [string, string][] = [
  [`${site.url}/`, updatedISO],
  [`${site.url}/guides/`, latest],
  ...guides.map(g => [`${site.url}${g.url}`, g.fm.updated] as [string, string]),
  [`${site.url}/privacy/`, updatedISO],
];
export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(([u, d]) => `<url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join('')}</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
