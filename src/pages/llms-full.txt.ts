import { fullGuide } from '../lib/content';
import { site } from '../data/content';
import { guides, guideMarkdown } from '../lib/guides';
// The home guide, then every published guide in full, so a single fetch gives an AI system the whole site.
export function GET() {
  const body = [fullGuide(), ...guides.map(g => guideMarkdown(g, site).replace(/^# /, '# Guide: '))].join('\n---\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
