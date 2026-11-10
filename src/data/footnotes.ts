// Footnotes placed inside a guide's text by an exact phrase, for guides whose body names a source without linking it.
// Each entry: the phrase (copied exactly from ONE line of the guide body) and the number of the source in that guide's
// `sources:` list (1 = the first). src/lib/linefile.ts checks both at build time: a phrase that is not on exactly one
// line, or a source number the guide does not have, fails the build. Never add a footnote the source does not support.
// Rule: footnote a sentence only where it NAMES its source document ("Google's AI Mode Help page lists…"), to that
// document. ai-mode-vs-ai-overviews was mapped this way on 2026-11-10 for the redesign board (design/site-options).
import type { Footnote } from '../lib/linefile';

export const footnotes: Record<string, Footnote[]> = {
  'ai-mode-vs-ai-overviews': [
    { phrase: "Google's Help page describes it as \"an AI-generated snapshot with key information and links to dig deeper\"", source: 2 },
    { phrase: "Search Central adds that AI Overviews are only shown when they are additive to classic Search", source: 1 },
    { phrase: "Google's AI Mode Help page lists three ways in", source: 3 },
    { phrase: "Google's Search Central guide calls these two features \"AI features\" in Search", source: 1 },
    { phrase: "Google's document on the two features says AI Overviews \"use a customized Gemini model", source: 4 },
    { phrase: "Google's crawler documentation says the Google-Extended robots.txt token controls use of your content for Gemini Apps and Vertex AI", source: 7 },
    { phrase: "Search Central says traffic from both features is included in your overall Search Console data", source: 6 },
    { phrase: "Google's robots meta tag documentation says `nosnippet` also prevents content", source: 5 },
  ],
};
