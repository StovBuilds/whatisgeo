// The ONLY place a link to one of our own products may come from. Every product here is made
// by Adapt Progress Evolve, the studio that publishes this guide, and every place one appears
// says so (the "From the same studio" panel on a guide). Descriptions are one factual line each,
// taken from the product's own site. A product never changes what a guide recommends.

export type ProductId = 'visibilitytoai' | 'hilyt' | 'scriptgrain' | 'howtogetaito';

export type Product = { id: ProductId; name: string; url: string; description: string };

export const PRODUCTS: Record<ProductId, Product> = {
  visibilitytoai: {
    id: 'visibilitytoai', name: 'visibilitytoai', url: 'https://visibilitytoai.com/',
    description: 'Measures whether ChatGPT, Claude, Gemini and Perplexity name and cite a company when buyers ask them questions, quoting every answer.',
  },
  hilyt: {
    id: 'hilyt', name: 'Hilyt', url: 'https://hilyt.it/',
    description: 'Open profiles for people and businesses that AI assistants can read and cite: stable URLs, schema.org data and a plain-text card per profile.',
  },
  scriptgrain: {
    id: 'scriptgrain', name: 'ScriptGrain', url: 'https://scriptgrain.com/',
    description: 'Measures your writing style from samples you upload, builds a voice profile and drafts new content in it, scoring every draft against the profile.',
  },
  howtogetaito: {
    id: 'howtogetaito', name: 'How to get AI to', url: 'https://howtogetaito.com/',
    description: 'A free library of step-by-step guides to getting AI to do a specific task, with prompts, tools, cost and privacy notes.',
  },
};

export const PRODUCT_IDS = Object.keys(PRODUCTS) as ProductId[];
export const isProductId = (id: unknown): id is ProductId => typeof id === 'string' && id in PRODUCTS;
