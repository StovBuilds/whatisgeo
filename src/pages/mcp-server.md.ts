import { site } from '../data/content';
import { sitePage } from '../lib/pages';
const page = sitePage('mcp-server');
export const GET = () => new Response(['---', `title: ${JSON.stringify(page.fm.title)}`, `url: ${site.url}${page.url}`, ...(page.fm.updated ? [`updated: ${page.fm.updated}`] : []), '---', '', `# ${page.fm.title}`, '', page.raw, ''].join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
