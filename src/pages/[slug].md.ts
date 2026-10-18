import type { APIRoute } from 'astro';
import { site } from '../data/content';
import { guides, guideMarkdown, type Guide } from '../lib/guides';
export function getStaticPaths() { return guides.map(entry => ({ params: { slug: entry.slug }, props: { entry } })); }
export const GET: APIRoute = ({ props }) => new Response(guideMarkdown((props as { entry: Guide }).entry, site), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
