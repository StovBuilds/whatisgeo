# What is GEO

A TypeScript-led educational website for **whatisgeo.app**, published by Adapt Progress Evolve. Copy was drafted with the **ScriptGrain Brand** voice profile and edited for factual accuracy and the actual signup behaviour.

## Run locally

Use Node.js 24 LTS, then `npm ci` and `npm run dev` for the content preview. `npm run build` pre-renders the entire guide, privacy notice, confirmation page, 404 page and text exports. `npm run preview` serves the built site and signup API locally through Cloudflare Wrangler at port 8787.

`npm run check` checks the Astro and Worker TypeScript. `npm test` verifies email validation, request bounds, cross-origin rejection, confirmation before contact creation, replay protection, global opt-outs, and provider failures. The tests stub Resend and send no real email.

## Cloudflare deployment

The site uses **Cloudflare Workers Static Assets**, with a small Worker for `/api/*`. The `SignupMailbox` Durable Object serialises email confirmation and rejects token replay; its SQLite migration is declared in `wrangler.jsonc`. No separate database setup is required.

1. Authenticate the intended Cloudflare account with `npx wrangler login`.
2. Run `npm run deploy`. Wrangler provisions the declared Durable Object namespace.
3. In Workers & Pages → whatisgeo → Settings → Domains & Routes, add `whatisgeo.app` as a custom domain. Add `www.whatisgeo.app` only if you want it, with a canonical redirect to the apex.
4. Keep `SITE_URL=https://whatisgeo.app`. For an alternate preview origin, explicitly set its own SITE_URL; browser form submissions must match this origin.
5. For automatic deployments, connect this GitHub repository in Cloudflare Workers Builds. Build command: `npm run build`. Deploy command: `npx wrangler deploy`. Node version: 24.

The repository does not assume an account ID, alter existing DNS, or store credentials.

## Activate Resend

Create a dedicated **What is GEO segment** and **What is GEO updates topic** in Resend. Use the topic for all subsequent Broadcasts, and include Resend's unsubscribe controls. Use a verified sending domain and mailbox.

Add these values as Cloudflare Worker secrets/settings (or use `npx wrangler secret put NAME` interactively):

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | A key permitted to send emails and manage contacts, segments and topics. A send-only key is insufficient. |
| `RESEND_FROM` | `What is GEO <your verified sender address>` |
| `RESEND_SEGMENT_ID` | The dedicated segment ID |
| `RESEND_TOPIC_ID` | The dedicated topic ID |

Do not put secrets in Git, browser code, or chat. For local API testing copy `.dev.vars.example` to `.dev.vars` and fill it privately.

Until all settings are present, `/api/status` reports `available:false`, the signup button is disabled, and signup requests return 503. It never pretends to save an address.

Signup sends a confirmation email. Only a deliberate button click on the confirmation page creates/updates the Resend contact and opts it into the dedicated topic. Tokens are random, hashed in storage, expire after 24 hours and cannot be reused. Email addresses stay out of confirmation URLs. Global Resend opt-outs are preserved; such readers are directed to the publisher to update their preferences. IP rate limits, per-email cooldowns and a honeypot limit abuse. Temporary records are scheduled for deletion after expiry. Provider errors remain retryable and never report success.

After adding real settings, test a signup with an address you control: verify delivery, confirm once, check the topic/segment in Resend, verify replay fails, and test unsubscribe. Live delivery has not been verified without those credentials.

## Content and discoverability

Edit `src/data/content.ts` and `src/data/crawlers.ts`. `/guide.md`, `/llms-full.txt` and `/llms.txt` are generated from the same data as the visible guide. The sitemap and page metadata use the production domain. Update the review date only when the content is actually reviewed.

The site has semantic HTML, canonical URLs, an Article JSON-LD object, readable FAQ content present in HTML, a sitemap, and permissive public-content crawler rules. `llms.txt` is an optional navigation aid; it is not a promise of ranking or citation. Review Cloudflare's bot settings so intended search crawlers can reach the site. Search and model-training permissions are separate decisions.

Fonts are self-hosted. White is the default theme; only an explicit dark/light preference is kept in localStorage. Reduced-motion preferences disable scrolling effects. No analytics, advertising tags, blog or course routes are included.

## Launch status

Source and local tests can be completed without service secrets. Production publishing, custom-domain connection and real email verification require Cloudflare authentication and the Resend settings above. Check the current task handoff for which external steps have been completed.
