import { site } from '../data/content';
import { sitePageMarkdown } from '../lib/pages';
export const GET = () => new Response(sitePageMarkdown('mcp-server', site.url), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
