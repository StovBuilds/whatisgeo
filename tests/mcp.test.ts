// The read-only MCP server (worker/mcp.ts) over an index built by tools/build-mcp-index.mjs
// from a tiny dist: sitemap pages only, Markdown twins preferred, off-site URLs refused.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mcp } from '../worker/mcp';

const dist = mkdtempSync(join(tmpdir(), 'mcp-dist-'));
const O = 'https://example.test';
writeFileSync(join(dist, 'sitemap.xml'), `<urlset><url><loc>${O}/</loc></url><url><loc>${O}/questions/write-my-cv/</loc></url><url><loc>${O}/about/</loc></url></urlset>`);
writeFileSync(join(dist, 'llms.txt'), '# Example Site\n\n> Answers about using AI.\n');
writeFileSync(join(dist, 'index.md'), '# Example Site\n\nAnswers about using AI at work.\n');
mkdirSync(join(dist, 'questions'));
writeFileSync(join(dist, 'questions', 'write-my-cv.md'), '---\ntitle: "Can you use AI to write my CV?"\nverdict: yes-with-care\nupdated: 2026-10-04\n---\n\n# Can you use AI to write my CV?\n\nYes, with care. Every job and date must be real. The constructor of a CV is you.\n\n## How to do it well\n\nTailor it to the advert.\n');
writeFileSync(join(dist, 'questions', 'draft-only.md'), '# Not in the sitemap\n\nSecret draft about CVs.\n');
mkdirSync(join(dist, 'about'));
writeFileSync(join(dist, 'about', 'index.html'), '<html><head><title>About us</title><meta name="description" content="Who runs the site."></head><body><nav>menu</nav><main><h1>About us</h1><p>Run by a small UK company.</p></main></body></html>');
execFileSync('node', [fileURLToPath(new URL('../tools/build-mcp-index.mjs', import.meta.url)), dist]);

const env = {
  SITE_URL: O,
  ASSETS: { fetch: async (r: Request) => { const f = join(dist, new URL(r.url).pathname); return existsSync(f) ? new Response(readFileSync(f)) : new Response('not found', { status: 404 }); } },
};
async function rpc(method: string, params?: unknown) {
  const res = await mcp(new Request(`${O}/mcp`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) }), env);
  return (await res.json() as { result: any; error?: { message: string } });
}
const tool = async (name: string, args: unknown) => (await rpc('tools/call', { name, arguments: args })).result;

test('build writes the index, the discovery card and the llms.txt line', () => {
  const ix = JSON.parse(readFileSync(join(dist, 'mcp-index.json'), 'utf8'));
  assert.deepEqual(ix.pages.map((p: { path: string }) => p.path), ['/', '/questions/write-my-cv/', '/about/']);
  assert.equal(JSON.parse(readFileSync(join(dist, '.well-known', 'mcp.json'), 'utf8')).endpoint, `${O}/mcp`);
  assert.match(readFileSync(join(dist, 'llms.txt'), 'utf8'), /\[MCP server\]\(https:\/\/example\.test\/mcp\)/);
});

test('initialize and tools/list describe a read-only server', async () => {
  const init = (await rpc('initialize', { protocolVersion: '2025-06-18' })).result;
  assert.equal(init.serverInfo.title, 'Example Site');
  const { tools } = (await rpc('tools/list')).result;
  assert.deepEqual(tools.map((t: { name: string }) => t.name), ['search_site', 'get_page', 'list_pages']);
  assert.ok(tools.every((t: { annotations: { readOnlyHint: boolean } }) => t.annotations.readOnlyHint));
});

test('search finds sitemap pages only', async () => {
  const r = await tool('search_site', { query: 'can I use AI for my CV' });
  assert.equal(r.structuredContent.results[0].url, `${O}/questions/write-my-cv/`);
  assert.ok(!JSON.stringify(r).includes('Secret draft'));
});

test('words that are Object.prototype keys are ordinary search terms', async () => {
  const r = await tool('search_site', { query: 'constructor' });
  assert.equal(r.structuredContent.results[0].url, `${O}/questions/write-my-cv/`);
  assert.equal((await tool('search_site', { query: 'tostring hasownproperty' })).structuredContent.count, 0);
});

test('get_page returns the Markdown twin with its fields, and refuses other sites', async () => {
  const r = await tool('get_page', { url: '/questions/write-my-cv' });
  assert.equal(r.structuredContent.fields.verdict, 'yes-with-care');
  assert.match(r.structuredContent.markdown, /## How to do it well/);
  assert.equal((await tool('get_page', { url: 'https://other.test/questions/write-my-cv/' })).isError, true);
  assert.equal((await tool('get_page', { url: '/questions/draft-only/' })).isError, true);
});

test('pages without a Markdown twin fall back to their HTML main text', async () => {
  const r = await tool('get_page', { url: `${O}/about/` });
  assert.equal(r.structuredContent.title, 'About us');
  assert.match(r.structuredContent.markdown, /small UK company/);
  assert.doesNotMatch(r.structuredContent.markdown, /menu/);
});

test('list_pages pages through a section', async () => {
  const r = await tool('list_pages', { section: 'questions' });
  assert.equal(r.structuredContent.total, 1);
  assert.equal((await tool('list_pages', { section: 'nope' })).isError, true);
});
