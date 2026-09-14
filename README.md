# What is GEO

A TypeScript-led educational website for **whatisgeo.app**, published by Adapt Progress Evolve. Copy was drafted with the **ScriptGrain Brand** voice profile and edited for factual accuracy and the actual signup behaviour.

## Run locally

Use Node.js 24 LTS and Bun (the fleet's CI standard), then `bun install` and `bun run dev` for the content preview. `bun run build` pre-renders the entire guide, privacy notice, confirmation page, 404 page, sitemap and text exports, then `tools/postbuild.mjs` fills the CSP script hashes in `dist/_headers`. `bun run preview` serves the built site and signup API locally through Cloudflare Wrangler at port 8787.

`bun run check` checks the Astro and Worker TypeScript. `bun run test` verifies email validation, request bounds, cross-origin rejection, canonical-host redirects, confirmation before contact creation, replay protection, global opt-outs, and provider failures. The tests stub Resend and send no real email. `bun run og` re-renders `public/og.png` and the touch icon from `tools/og.html` (needs the Playwright install in `~/repos/claude-design`).

## Cloudflare deployment

The site uses **Cloudflare Workers Static Assets**, with a small Worker for `/api/*`. The `SignupMailbox` Durable Object serialises email confirmation and rejects token replay; its SQLite migration is declared in `wrangler.jsonc`. No separate database setup is required.

Production deploys run from the VPS through the fleet sweep (`~/bin/pages-deploy.sh whatisgeo`, every 10 minutes via `pages-deploy-all.sh`): it builds `origin/main` in a throwaway worktree and runs `wrangler deploy`, so **merging to main is the deploy**. `wrangler.jsonc` declares both custom domains (`whatisgeo.app` + `www.whatisgeo.app`; wrangler creates the DNS records and certificates), disables the `workers.dev` and preview hosts, and the Worker 301s every non-canonical host to `SITE_URL`. `RESEND_FROM`, `RESEND_SEGMENT_ID` and `RESEND_TOPIC_ID` are plain `vars`; only `RESEND_API_KEY` is a secret (`wrangler secret put RESEND_API_KEY`, value in `~/.bot-infra.env` as `WHATISGEO_RESEND_API_KEY`).

Keep `SITE_URL=https://whatisgeo.app`. For an alternate preview origin, explicitly set its own SITE_URL; browser form submissions must match this origin.

## Activate Resend

Create a dedicated **What is GEO segment** and **What is GEO updates topic** in Resend. Use the topic for all subsequent Broadcasts, and include Resend's unsubscribe controls. Use a verified sending domain and mailbox.

Live values (set 2026-09-14): Resend domain `whatisgeo.app` (eu-west-1), segment **What is GEO**, topic **What is GEO updates** (default opt_out, so only a confirmed click opts a contact in), sender `What is GEO <hello@whatisgeo.app>`. Inbound mail to `hello@`/`dmarc@`/anything@whatisgeo.app forwards to Jack through Cloudflare Email Routing. The settings the Worker needs:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | A key permitted to send emails and manage contacts, segments and topics. A send-only key is insufficient. |
| `RESEND_FROM` | `What is GEO <your verified sender address>` |
| `RESEND_SEGMENT_ID` | The dedicated segment ID |
| `RESEND_TOPIC_ID` | The dedicated topic ID |

Do not put secrets in Git, browser code, or chat. For local API testing copy `.dev.vars.example` to `.dev.vars` and fill it privately.

Until all settings are present, `/api/status` reports `available:false`, the signup button is disabled, and signup requests return 503. It never pretends to save an address.

Signup sends a confirmation email. Only a deliberate button click on the confirmation page creates/updates the Resend contact and opts it into the dedicated topic. Tokens are random, hashed in storage, expire after 24 hours and cannot be reused. Email addresses stay out of confirmation URLs. Global Resend opt-outs are preserved; such readers are directed to the publisher to update their preferences. IP rate limits, per-email cooldowns and a honeypot limit abuse. Temporary records are scheduled for deletion after expiry. Provider errors remain retryable and never report success.

After changing any of these, test a signup with an address you control: verify delivery, confirm once, check the topic/segment in Resend, verify replay fails, and test unsubscribe.

## Content and discoverability

Edit `src/data/content.ts` and `src/data/crawlers.ts`. `/guide.md`, `/llms-full.txt`, `/llms.txt` and `/sitemap.xml` are generated from the same data as the visible guide; the site constants (`site`, `updated`, `updatedISO`) in `content.ts` are the single source for the domain, publisher, contact address and review date. Update the review date only when the content is actually reviewed.

The site has semantic HTML, canonical URLs, a JSON-LD graph (WebSite, Article, FAQPage, publisher Organization), readable FAQ content present in HTML, a sitemap, an OG image, a strict CSP, and permissive public-content crawler rules. `llms.txt` is an optional navigation aid; it is not a promise of ranking or citation. Review Cloudflare's bot settings so intended search crawlers can reach the site. Search and model-training permissions are separate decisions.

Fonts are self-hosted. White is the default theme; only an explicit dark/light preference is kept in localStorage. Reduced-motion preferences disable scrolling effects. No analytics, advertising tags, blog or course routes are included.

## Launch status

Live on https://whatisgeo.app since 2026-09-14 (Cloudflare Registrar domain, zone in the fleet account). Origin: an agent-built first cut reviewed and hardened by the resident Claude session before launch.
