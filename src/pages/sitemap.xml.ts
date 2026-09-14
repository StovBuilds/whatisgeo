import { site, updatedISO } from '../data/content';
// Generated from the same date constant as the guide so lastmod cannot go stale by hand.
const urls = [`${site.url}/`, `${site.url}/privacy/`];
export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${u}</loc><lastmod>${updatedISO}</lastmod></url>`).join('')}</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
