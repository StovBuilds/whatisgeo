#!/usr/bin/env node
// Build the read-only MCP index (worker/mcp.ts) from what the site already publishes:
// sitemap.xml says which pages exist, each page's Markdown twin (/foo/ → dist/foo.md) is
// its content, and llms.txt's heading + blockquote name the site. No page is indexed
// that the sitemap does not list, so noindex/draft pages never reach an agent.
//
//   node tools/build-mcp-index.mjs [distDir]   (runs at the end of `build`)
//
// Writes dist/mcp-index.json (read by the worker through ASSETS), dist/.well-known/mcp.json
// (a discovery card) and appends an "AI agents" section to dist/llms.txt.
// Shared across the fleet: the source of truth is guide-site-starter; copy, don't fork.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const read = p => readFileSync(join(dist, p), 'utf8');

const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1].replace(/&amp;/g, '&'));
if (!urls.length) throw new Error('build-mcp-index: sitemap.xml lists no URLs');
const origin = new URL(urls[0]).origin;

const llms = existsSync(join(dist, 'llms.txt')) ? read('llms.txt') : '';
const title = (llms.match(/^#\s+(.+)$/m)?.[1] || new URL(origin).hostname).trim();
const description = (llms.match(/^>\s+(.+)$/m)?.[1] || '').trim();

// ── Markdown → plain parts ─────────────────────────────────────────────────────
function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fields: {}, body: md };
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv || !kv[2]) continue; // nested/list keys are skipped: scalars only
    fields[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { fields, body: md.slice(m[0].length) };
}
const plain = s => s
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/^\s*[#>|*-]+\s*/gm, '')
  .replace(/[*_`]+/g, '')
  .replace(/\s+/g, ' ')
  .trim();
function fromHtml(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html.match(/<body[\s\S]*?<\/body>/i)?.[0] || html;
  const t = main.replace(/<(script|style|nav|footer|header|svg)[\s\S]*?<\/\1>/gi, ' ');
  const headings = [...t.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map(m => plain(m[1]));
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '';
  const ttl = html.match(/<title>([^<]*)<\/title>/i)?.[1] || '';
  return { title: ttl, description: desc, headings, text: plain(t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"')) };
}

const pages = [];
for (const url of urls) {
  const u = new URL(url);
  const path = u.pathname;
  const slug = path.replace(/^\/|\/$/g, '');
  const mdRel = slug ? `${slug}.md` : 'index.md';
  const htmlRel = slug ? (existsSync(join(dist, slug, 'index.html')) ? `${slug}/index.html` : `${slug}.html`) : 'index.html';
  let page;
  if (existsSync(join(dist, mdRel))) {
    const { fields, body } = frontmatter(read(mdRel));
    const h1 = body.match(/^#\s+(.+)$/m)?.[1];
    const headings = [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map(m => plain(m[1]));
    const firstPara = body.split(/\n\s*\n/).map(p => p.trim()).find(p => p && !p.startsWith('#') && !/^(Author|Published|Updated):/i.test(p)) || '';
    page = { title: fields.title || plain(h1 || ''), description: fields.description || plain(firstPara).slice(0, 300), headings, text: plain(body), markdown: `/${mdRel}`, fields };
  } else if (existsSync(join(dist, htmlRel))) {
    page = { ...fromHtml(read(htmlRel)), markdown: null, fields: {} };
  } else continue;
  for (const k of ['title', 'url', 'description']) delete page.fields[k];
  pages.push({
    path, url, section: slug.split('/')[0] && slug.includes('/') ? slug.split('/')[0] : (slug ? 'pages' : 'home'),
    title: page.title || title, description: page.description, updated: page.fields.updated || page.fields.published || null,
    headings: page.headings.slice(0, 40), markdown: page.markdown, fields: page.fields,
    text: page.text.slice(0, 40_000),
  });
}

const index = { version: 1, built: new Date().toISOString(), site: { title, description, origin, endpoint: `${origin}/mcp` }, pages };
writeFileSync(join(dist, 'mcp-index.json'), JSON.stringify(index));

const card = {
  name: new URL(origin).hostname, title, description,
  endpoint: `${origin}/mcp`, transport: 'streamable-http', protocol: '2025-06-18', auth: 'none', readOnly: true,
  tools: ['search_site', 'get_page', 'list_pages'], llms: `${origin}/llms.txt`,
};
mkdirSync(join(dist, '.well-known'), { recursive: true });
writeFileSync(join(dist, '.well-known', 'mcp.json'), JSON.stringify(card, null, 2) + '\n');

if (llms && !llms.includes(`${origin}/mcp`)) {
  writeFileSync(join(dist, 'llms.txt'), llms.replace(/\s*$/, '\n') + `\n## AI agents\n\n- [MCP server](${origin}/mcp): Read-only remote MCP server (Streamable HTTP, no key). Tools: search_site, get_page, list_pages. Every page listed in the sitemap, with its URL and last-updated date.\n`);
}

const bytes = JSON.stringify(index).length;
console.log(`build-mcp-index: ${pages.length}/${urls.length} sitemap page(s) indexed, ${(bytes / 1024).toFixed(0)} KB`);
if (pages.length < urls.length) console.log(`build-mcp-index: no .md or .html for ${urls.length - pages.length} sitemap URL(s)`);
