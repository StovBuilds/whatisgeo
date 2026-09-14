import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://whatisgeo.app',
  output: 'static',
  trailingSlash: 'always',
  // Never inline small assets as data: URIs — the CSP is font-src 'self' / img-src 'self' data:,
  // and Vite's default 4 kB inlining turns font subsets into data: fonts the browser refuses.
  vite: { build: { assetsInlineLimit: 0 } }
});
