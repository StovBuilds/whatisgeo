import { marked } from 'marked';
import { sections } from '../data/content';
export function render(markdown: string) { return (marked.parse(markdown, { async: false }) as string).replace(/<table>/g, '<div class="table-wrap" role="region" aria-label="Comparison table" tabindex="0"><table>').replace(/<\/table>/g, '</table></div>'); }
export function questions() { return sections.find(s => s.id === 'questions')!.markdown.split(/^### /m).slice(1).map(s => ({ question: s.slice(0, s.indexOf('\n')).trim(), answer: s.slice(s.indexOf('\n')).trim() })); }
export function fullGuide() { return '# What is GEO?\n\nCanonical: https://whatisgeo.app/\nPublisher: Adapt Progress Evolve — https://adaptprogressevolve.com/\nUpdated: 14 September 2026\n\n' + sections.filter(s => s.id !== 'hero' && s.id !== 'updates').map(s => `## ${s.title}\n\n${s.markdown}`).join('\n\n') + '\n'; }
export const sources = [
  { name: 'Google Search Central: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
  { name: 'Aggarwal et al.: GEO: Generative Engine Optimization (KDD 2024)', url: 'https://arxiv.org/abs/2311.09735' },
  { name: 'OpenAI: overview of crawlers', url: 'https://developers.openai.com/api/docs/bots' },
  { name: 'Perplexity: crawler documentation', url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers' },
  { name: 'The llms.txt proposal', url: 'https://llmstxt.org/' }
];
