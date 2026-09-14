#!/usr/bin/env node
// Fill the CSP script hashes in dist/_headers from the inline scripts Astro
// actually emitted, so the policy stays correct if the theme bootstrap changes.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const html = [];
(function walk(dir) { for (const name of readdirSync(dir)) { const p = join(dir, name); statSync(p).isDirectory() ? walk(p) : name.endsWith('.html') && html.push(p); } })(dist);
const hashes = new Set();
for (const file of html) {
  for (const match of readFileSync(file, 'utf8').matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type=["']application\/ld\+json["']/.test(match[1])) continue; // data, never executed
    hashes.add(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`);
  }
}
const headersPath = join(dist, '_headers');
const out = readFileSync(headersPath, 'utf8').replaceAll('__SCRIPT_HASHES__', [...hashes].join(' '));
if (out.includes('__SCRIPT_HASHES__')) throw new Error('placeholder not replaced');
writeFileSync(headersPath, out);
console.log(`postbuild: ${hashes.size} inline script hash(es) written to dist/_headers`);
