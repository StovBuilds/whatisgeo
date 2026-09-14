import { fullGuide } from '../lib/content';
export function GET() { return new Response(fullGuide(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } }); }
