# What is GEO

**Live site: [whatisgeo.app](https://whatisgeo.app/)** · Published by [Adapt Progress Evolve](https://adaptprogressevolve.com/)

A free, single-page, plain-English guide to **Generative Engine Optimisation (GEO)**:
what it means, how AI answers actually pick their sources, which recommendations are
platform requirements versus research findings versus sensible advice, and what a
business owner can realistically do in the first 30 days. No hype, no invented stats,
nothing to sell. An optional email list announces new guides and course news.

The whole guide is also served to AI systems and agents as
[Markdown](https://whatisgeo.app/guide.md), [plain text](https://whatisgeo.app/llms-full.txt)
and an [llms.txt](https://whatisgeo.app/llms.txt) index. The site's own AI-readable
profile lives at [i.hilyt.it/whatisgeo](https://i.hilyt.it/whatisgeo).

## How it is built

| Layer | Choice |
| --- | --- |
| Pages | [Astro](https://astro.build/) 7, fully static (`output: 'static'`), self-hosted Manrope + Inter |
| Content | One TypeScript data file (`src/data/content.ts` + `src/data/crawlers.ts`) renders the page, `guide.md`, `llms.txt`, `llms-full.txt` and `sitemap.xml`, so the human and machine surfaces cannot drift |
| Hosting | Cloudflare Workers with static assets (`wrangler.jsonc`); the Worker 301s any non-canonical host, serves the assets, and handles `/api/*` |
| Email signup | Double opt-in via [Resend](https://resend.com/): a `SignupMailbox` Durable Object stores a hashed, single-use, 24-hour token per address; only a deliberate click on the confirmation page creates the contact and opts it into the newsletter topic. Rate limits, a per-email cooldown, a honeypot and a same-origin check limit abuse. Global unsubscribes are respected |
| Discoverability | Canonical URLs, JSON-LD graph (WebSite, Article, FAQPage, Organization), readable FAQ HTML, generated sitemap, OG image, permissive `robots.txt` |
| Security | Strict CSP with build-time script hashes (`tools/postbuild.mjs`), HSTS, `X-Frame-Options: DENY`, no third-party requests |
| Telemetry | No analytics on visitors. Requests from known AI systems and search crawlers (by user-agent) are logged as path + user-agent + country, never an IP, so the publisher can see which AI systems read the guide. The [privacy notice](https://whatisgeo.app/privacy/) says the same |

## Run it locally

Requires Node.js 24 and [Bun](https://bun.sh/).

```bash
bun install
bun run dev        # Astro dev server for the content
bun run check      # Astro + Worker typecheck
bun run test       # Worker tests (Resend is stubbed; no email is sent)
bun run build      # static build → dist/, then CSP hashes into dist/_headers
bun run preview    # built site + signup API through wrangler dev on :8787
bun run og         # re-render public/og.png from tools/og.html (needs Playwright)
```

For the signup API locally, copy `.dev.vars.example` to `.dev.vars` and fill it in.
Until every Resend setting is present, `/api/status` reports `available:false`, the
form's button is disabled and signups return 503. It never pretends to save an address.

## Deploying your own copy

1. `npx wrangler login`, then `npm run deploy` (or `bun run build && npx wrangler deploy`).
   Wrangler provisions the Durable Object and uploads the assets.
2. Edit `routes` and `SITE_URL` in `wrangler.jsonc` for your domain. Browser form
   submissions must come from `SITE_URL`'s origin or they are rejected.
3. Resend: verify a sending domain, create a segment and a topic (default
   `opt_out`, so only a confirmed click opts a contact in), then set:

   | Setting | Where |
   | --- | --- |
   | `RESEND_API_KEY` | `npx wrangler secret put RESEND_API_KEY` (needs contact + segment + topic permissions, not send-only) |
   | `RESEND_FROM` | `vars` in `wrangler.jsonc`, e.g. `What is GEO <hello@example.com>` |
   | `RESEND_SEGMENT_ID`, `RESEND_TOPIC_ID` | `vars` in `wrangler.jsonc` |
   | `AIREAD_TOKEN` (optional) | secret; if unset, no crawler reads are logged. `AIREAD_URL` overrides the meter endpoint |

4. Test with an address you control: subscribe, confirm once, check the contact
   landed in the segment and topic, confirm the link cannot be reused, unsubscribe.

## Editing the guide

Everything readers see is in `src/data/content.ts` (sections, UI strings, privacy
notice) and `src/data/crawlers.ts`. The `site`, `updated` and `updatedISO` constants
are the single source for the domain, publisher, contact address and review date.
Change the review date only when the content has genuinely been reviewed.

## Licence

Code is released under the [MIT Licence](LICENSE). The guide text, the wordmark and
the images under `public/` are © Adapt Progress Evolve and are not covered by the
MIT licence; quote them with attribution and a link to whatisgeo.app.
