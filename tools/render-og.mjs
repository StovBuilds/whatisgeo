#!/usr/bin/env node
// Render public/og.png (1200×630) and public/apple-touch-icon.png (180×180)
// from tools/og.html + public/favicon.svg. Uses the Playwright install in
// ~/repos/claude-design (PLAYWRIGHT_ROOT to override); serves the repo root over
// a throwaway python http.server so the fontsource woff2 files resolve.
//   node tools/render-og.mjs
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PW_ROOT = process.env.PLAYWRIGHT_ROOT ?? '/home/jack/repos/claude-design';
const { chromium } = createRequire(path.join(PW_ROOT, 'package.json'))('playwright');
const port = 8900 + Math.floor(Math.random() * 100);
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
await new Promise(r => setTimeout(r, 700));
try {
  const browser = await chromium.launch();
  const base = `http://127.0.0.1:${port}`;
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await og.goto(`${base}/tools/og.html`, { waitUntil: 'networkidle' });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: path.join(ROOT, 'public/og.png'), type: 'png' });
  console.log('wrote public/og.png');
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  await icon.setContent(`<style>html,body{margin:0;background:#354afa}img{display:block;width:180px;height:180px}</style><img src="${base}/public/favicon.svg">`, { waitUntil: 'networkidle' });
  await icon.screenshot({ path: path.join(ROOT, 'public/apple-touch-icon.png'), type: 'png' });
  console.log('wrote public/apple-touch-icon.png');
  await browser.close();
} finally { server.kill(); }
