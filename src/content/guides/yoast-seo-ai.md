---
# scriptgrain: generation 813c9094-55e8-446d-9754-77390a0f1a23, voice match 0.77 (2026-10-30), then Claude edit + fact-check (page-pipeline item 1384)
title: "Yoast SEO AI: what its AI features do, what they cannot do, and what to check first"
seoTitle: "Yoast SEO AI: what it does and what it can't"
summary: "Yoast's AI features draft titles and meta descriptions, control AI crawler access and llms.txt, and in the AI+ plan report how AI assistants mention your brand. None of them can guarantee you appear in an AI answer."
category: "choosing"
ours:
  - product: "visibilitytoai"
    why: "If you want a second, independent reading to compare with Brand Insights, it checks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions."
related: ["ai-crawlers-robots-txt","llms-txt","how-to-create-an-llms-txt-file","schema-markup-for-ai","how-to-measure-ai-visibility","ai-visibility-checker"]
sources:
  - label: "WordPress.org: Yoast SEO plugin listing (read 30 October 2026)"
    url: "https://wordpress.org/plugins/wordpress-seo/"
  - label: "Yoast: Yoast SEO 21.5: Helping you block AI bots in Premium (31 October 2023)"
    url: "https://yoast.com/yoast-seo-october-31-2023/"
  - label: "Yoast: AI Generate feature page"
    url: "https://yoast.com/features/ai-generate/"
  - label: "Yoast: llms.txt feature page"
    url: "https://yoast.com/features/llms-txt/"
  - label: "Yoast: Yoast SEO AI+ product page (price read 30 October 2026)"
    url: "https://yoast.com/yoast-seo-ai-plus/"
  - label: "Yoast: Yoast SEO Premium product page (price read 30 October 2026)"
    url: "https://yoast.com/product/yoast-seo-premium-wordpress/"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Google: Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "llmstxt.org: The /llms.txt file proposal"
    url: "https://llmstxt.org/"
faq:
  - q: "Is Yoast SEO AI free, or do I need Premium?"
    a: "Partly free. Yoast's pages put llms.txt generation and basic schema in the free plugin. AI Generate, the other AI writing tools and the AI bot blocker are Premium features. On 30 October 2026 Premium was $118.80 a year excluding VAT."
  - q: "Does Yoast SEO AI help me show up in ChatGPT or Google AI Overviews?"
    a: "No Yoast feature can guarantee that, and Yoast's own WordPress.org listing says nobody can. Google says AI Overviews and AI Mode have no technical requirements beyond normal Search eligibility, so the basics of your site matter more than any plugin setting."
  - q: "Can Yoast block AI bots from my WordPress site?"
    a: "Yes, in Premium. Since version 21.5 a toggle adds robots.txt rules for GPTBot, CCBot and Google-Extended, which Yoast describes as bots used to train AI systems. It does not name search crawlers such as OAI-SearchBot, so read your robots.txt afterwards."
  - q: "Does Yoast generate an llms.txt file?"
    a: "Yes. Yoast's feature page says the free plugin and all paid plans generate and refresh an llms.txt file automatically, and you can choose the pages yourself. Whether an AI assistant reads the file is up to that assistant."
  - q: "Is Yoast SEO AI+ worth it, and how do I check its brand tracking numbers?"
    a: "That depends on whether you need weekly brand monitoring. On 30 October 2026 AI+ cost $358.80 a year excluding VAT and covered up to five questions per brand, analysed weekly across ChatGPT, Gemini, Claude and Perplexity. To check its findings, ask the same questions yourself and read the actual answers."
published: 2026-10-30
updated: 2026-10-30
status: "published"
---
Yoast's AI features do three different jobs. Some help you write: titles, meta descriptions and summaries. Some control what AI crawlers and agents can read on your site: the bot blocker, llms.txt and schema output. One, in the separate Yoast SEO AI+ plan, reports how AI assistants mention your brand. Everything below about the products comes from Yoast's own product, feature and release pages and its WordPress.org listing, read on 30 October 2026. Where we give advice, we say it is ours.

## What Yoast SEO's AI features are

| Feature | What Yoast says it does | Where Yoast lists it | Job |
|---|---|---|---|
| AI Generate | Drafts titles and meta descriptions, including social titles, from what you have written | Premium, WooCommerce SEO, AI+ and Yoast SEO for Shopify | Writing |
| AI Optimize, AI Summarize, AI Content Planner | Suggests keyphrase edits, writes a post summary, suggests post ideas and a starter draft | Premium (the listing says Yoast's AI tools "come with Yoast SEO Premium") | Writing |
| Bot blocker | Adds robots.txt lines that block GPTBot, CCBot and Google-Extended | Premium | Crawler access |
| llms.txt | Generates and refreshes an llms.txt file | Free plugin and every paid plan | File generation |
| Schema.org output | Structured data; Premium adds "significantly more schema types" and schema aggregation for NLWeb | Free, with more in Premium | Markup |
| AI Brand Insights | Weekly report on how ChatGPT, Gemini, Claude and Perplexity mention your brand | Yoast SEO AI+ | Measurement |

On 30 October 2026 Yoast's product pages showed Yoast SEO Premium at $118.80 a year and Yoast SEO AI+ at $358.80 a year, both excluding VAT. The AI+ page says it includes Yoast WooCommerce SEO and the Premium features. Prices change, so check on the day you buy.

The WordPress.org listing says "All AI tools included, no hidden fees." Read that in context. The same listing says the AI tools come with Premium, with "no separate AI subscription, no extra login, and no credit top-up to buy". So you pay nothing on top of a paid plan, but the AI writing tools themselves are Premium features.

None of these is a way into AI answers. Each section below says what the feature does and where its job stops.

## The writing helpers: AI-generated titles and meta descriptions

According to the WordPress.org listing, Yoast AI Generate "creates five SEO-friendly titles and meta descriptions", with one-click regeneration if you want more options. Yoast's feature page adds that it works for posts, pages and category pages and can draft social sharing titles and descriptions. You apply or dismiss each suggestion. The bulk editor is free; drafting metadata in bulk with AI needs Premium.

What you get is a first draft of a snippet. You still choose, edit and publish.

Our recommendation is to check every generated line against the page it describes. Does the title say what the page actually covers? Does the description promise something the content does not deliver? Generated copy tends to sound plausible even when it is slightly off, and that is how errors slip through.

A better meta description helps people scanning search results; that is the whole of its job. Google's documentation on AI features says a page needs to be indexed and eligible to show in Google Search with a snippet to appear as a link in AI Overviews or AI Mode, and that "there are no additional technical requirements." Nothing in that documentation makes a generated meta description a route into those answers.

## Blocking or allowing AI crawlers from Yoast

Yoast SEO 21.5, announced on 31 October 2023, added a Premium toggle to block AI bots. Yoast's release post says it blocks "AI robots like GPTBot, CCBot, and Google-Extended" by automatically adding disallow lines to your robots.txt file. The current listing names the same three.

What those tokens control is set by the platforms, not by Yoast:

- **GPTBot:** OpenAI says disallowing it indicates your content should not be used to train its foundation models. ChatGPT search uses a separate crawler, OAI-SearchBot, and OpenAI says each setting is independent of the others.
- **Google-Extended:** Google says it controls whether crawled content may be used to train future Gemini models and for grounding in Gemini Apps and Vertex AI, and that it "does not impact a site's inclusion in Google Search."

So the toggle, as Yoast describes it, is about AI training. Yoast's own heading for the feature is "Blocking bots used to train AI systems". Its post and listing do not name OAI-SearchBot, PerplexityBot or ClaudeBot, so do not assume it covers them. Our guide to [AI crawlers and robots.txt](/ai-crawlers-robots-txt/) lists the documented tokens for each platform.

Two more limits. First, robots.txt is a request to crawlers: the standard, RFC 9309, says its rules "are not a form of access authorization." Second, blocking or allowing is your decision, as Yoast's post says under "Think before you do". Our recommendation: decide what you want first, flip the toggle, then open yoursite.com/robots.txt and read exactly which lines were added. The home guide's section on [crawler access](/#crawler-access) covers the trade-offs.

## llms.txt and structured data in Yoast: what is documented

**llms.txt.** Yes, Yoast generates one. Its feature page says you can generate the file "automatically with a click" and that it refreshes automatically. Yoast can pick your key content or you can choose it manually, and you can preview the file before publishing. The page calls it "free for everyone" and lists the free plugin, Premium, WooCommerce SEO, AI+ and Yoast SEO for Shopify.

What Yoast cannot tell you is whether AI tools will read the file. llms.txt is a proposal published at llmstxt.org, not a standard, and no assistant has to use it. Yoast's page says the file can help AI tools represent your business more accurately; that is Yoast's description, not a commitment from any AI platform. Our [llms.txt guide](/llms-txt/) covers what is and is not known.

**Structured data.** The listing says the free plugin outputs Schema.org structured data. It says Premium "outputs significantly more schema types" and adds schema aggregation for NLWeb, which combines your site's structured data into one graph. For developers, Yoast's Schema API covers graph pieces including Article, Organization, Person, Breadcrumb and WebPage. Its HowTo and FAQ blocks output schema by default.

The listing does not say which types appear on which of your templates. To see what your pages actually output, test them yourself. Google's AI features documentation asks that structured data match the visible text on the page, and repeats that there are no additional technical requirements for AI features. Our guide to [schema markup for AI](/schema-markup-for-ai/) covers what structured data can and cannot do.

## AI brand tracking: what Yoast reports and how to treat the numbers

Yoast SEO AI+ includes Yoast AI Brand Insights. According to Yoast's AI+ page:

- You set up a brand profile, choose competitors and create up to five brand questions, or let AI suggest them.
- Each brand gets one scheduled analysis a week across ChatGPT, Gemini, Claude and Perplexity. Yoast says no extra automatic analyses are available.
- The dashboard shows an "AI visibility index": a score out of 100 that blends mentions, ranking, citations and sentiment. It also shows Found or Not found for each question, the sources cited, a competitor ranking and a positive sentiment percentage.
- It does not need access to your website's admin.

How we suggest reading those numbers: five questions checked once a week is a small sample. AI answers can vary between runs, users and platforms, and the AI+ page we read does not say how many times each question is run. A blended score out of 100 also hides which part of it moved.

So treat the dashboard as a lead, then check it. If it says you were cited, look at the actual answer. If sentiment drops, read the wording behind it. Keep an independent check running alongside: ask the same questions yourself on a schedule and record what comes back. Our guide on [how to measure AI visibility](/how-to-measure-ai-visibility/) sets out a method, and the [AI visibility checker](/ai-visibility-checker/) page covers quicker spot checks.

## What Yoast cannot do for AI visibility

Yoast says it plainly in the FAQ on its own listing: "Nobody can guarantee that an AI assistant will mention your site." We agree, and we recommend treating any plugin the same way.

Yoast can draft snippets, write robots.txt lines, generate an llms.txt file, output schema and report on mentions. None of those makes an AI system name or cite you. Some things stay outside any plugin's reach: the quality of your content, whether other sources reference you, and whether an AI system chooses to retrieve your page at all.

## How to decide what you need, and how to check it yourself

Our recommended order:

1. **Name the job.** Do you want writing help, crawler control or measurement? Pick one before you look at plans.
2. **Check what is free.** According to Yoast's pages, llms.txt generation and basic schema are in the free plugin. The AI writing tools and the bot blocker are Premium. Brand Insights is in AI+ only.
3. **Check the price on the day.** Use Yoast's own product pages and note the date.
4. **For crawler control,** confirm which user agents the toggle adds, then read your live robots.txt.
5. **For llms.txt and schema,** open the generated file and test a few pages after you switch them on.
6. **For measurement,** run your own checks alongside any dashboard before you act on a number.
7. **Set a review date.** Yoast's listing says the plugin is updated every two weeks, so features and plans change.
