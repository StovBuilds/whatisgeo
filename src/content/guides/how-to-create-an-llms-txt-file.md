---
# scriptgrain: generation 15e12161-bdcb-42fc-aed0-67443a2cedcf, voice match 0.84 (2026-10-18), then Claude edit + fact-check (page-pipeline item 707)
title: "How do you create an llms.txt file? A step-by-step guide, and what it can and cannot do"
seoTitle: "How to Create an llms.txt File (Step by Step)"
summary: "Write a plain Markdown file called llms.txt with an H1 title, a short summary and lists of links, and publish it at your site root. It is a proposed convention, and no platform guarantees it affects AI answers."
category: "technical"
ours:
  - product: "hilyt"
    why: "If you want a structured, AI-readable description of your business alongside your llms.txt, Hilyt publishes an open profile for it."
  - product: "visibilitytoai"
    why: "llms.txt carries no guarantee, so the useful next step is checking whether ChatGPT, Claude, Gemini and Perplexity actually name and cite you."
related: ["what-is-ai-visibility","llm-seo","how-to-rank-in-chatgpt"]
sources:
  - label: "llmstxt.org: The /llms.txt file, v2"
    url: "https://llmstxt.org/"
  - label: "llmstxt.org: Changes (v2, August 2026)"
    url: "https://llmstxt.org/changes.html"
  - label: "Chrome for Developers: Lighthouse llms.txt audit"
    url: "https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Shopify developer docs: llms.txt.liquid"
    url: "https://shopify.dev/docs/storefronts/themes/architecture/templates/llms-txt-liquid"
  - label: "Webflow Help Center: Upload an llms.txt file to your site"
    url: "https://help.webflow.com/hc/en-us/articles/43240104183315-Upload-an-llms-txt-file-to-your-site"
  - label: "Yoast: How to enable llms.txt with Yoast SEO"
    url: "https://yoast.com/help/enable-llmstxt/"
  - label: "Yoast: llms.txt feature page"
    url: "https://yoast.com/features/llms-txt/"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Anthropic: Does Anthropic crawl data from the web?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
faq:
  - q: "How do I create an llms.txt file?"
    a: "Write a Markdown file with an H1 title, an optional blockquote summary and H2 sections listing links to your key pages, then publish it so it loads at yourdomain.com/llms.txt. Check first whether your platform already generates one, as Shopify does by default."
  - q: "What is the llms.txt format?"
    a: "According to llmstxt.org, it is Markdown in a fixed order: an H1 with the site name (the only required part), a blockquote summary, optional detail without headings, then H2 sections of links written as `[name](url)` with an optional colon and note. An H2 called Optional is a convention for secondary links."
  - q: "Are llms.txt files worth it?"
    a: "The file is cheap to make and low risk, but none of the crawler documentation we checked from Google, OpenAI, Anthropic or Perplexity says it is used for answers, and Webflow calls its effects on AI-driven search unclear. Treat it as a small extra, not a strategy."
  - q: "Is llms.txt still used?"
    a: "Yes, as a proposal. The spec reached v2 in August 2026, Lighthouse audits for it, and Shopify, Webflow and Yoast all support it. None of the major AI platforms' crawler documentation commits to reading it."
  - q: "How do I add llms.txt to WordPress or Shopify?"
    a: "On WordPress, Yoast SEO can generate one under Settings, Site Features, AI tools, LLMS.txt, or you can upload a file to your site root. On Shopify, the platform serves /llms.txt by default, and you customise it through an agents.md.liquid or llms.txt.liquid theme template."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
The whole job takes an afternoon: pick a short list of your best pages, write them up in the format below, and get the file to load at yourdomain.com/llms.txt. Before you start, check whether your platform already makes one for you. Shopify does by default, and Yoast SEO can do it on WordPress.

This page keeps three kinds of claim apart: what the llms.txt proposal itself says, what platforms document about the file, and what is only our recommendation.

## What the llms.txt format actually requires

The format comes from the proposal at llmstxt.org, currently labelled v2. Its changes page dates v2 to August 2026 and says the original was published in September 2024. The text is maintained in Answer.AI's llms-txt repository on GitHub, and the site describes it as open for community input.

According to the spec, a file in the format contains these parts, in this order:

1. An optional byte-order mark.
2. An H1 with the name of the project or site. **This is the only required section.**
3. A blockquote with a short summary, "containing key information necessary for understanding the rest of the file".
4. Zero or more sections of any Markdown except headings (paragraphs, lists) with more detail.
5. Zero or more sections under H2 headings, each holding a "file list" of links. Every item needs a Markdown link, `[name](url)`, and can then take a colon and a note.

An H2 called "Optional" is, by convention, for secondary links an agent can skip when it needs a shorter context. v2 says the Optional section no longer has any special mechanical meaning. It is still a useful convention.

Three other details from the spec are worth knowing:

- **Location.** The file can sit at the root, `/llms.txt`, or at any path, such as `/docs/llms.txt`. A file covers the pages under its path, and where more than one applies, agents should use the most specific.
- **What the links should point to.** The spec says links "should point to LLM-friendly content", such as clean Markdown versions of pages. Webflow's help centre takes a looser view: it says a well-structured HTML page linked from the file "should be sufficient for LLMs today". That is Webflow's opinion, and the spec does not say it.
- **Inference rather than training.** The spec says llms.txt is used "on demand, when an agent needs information about a topic while assisting a user". It adds that the expectation was that it "would mainly be useful for inference rather than training", "though training runs could take advantage of the information too".

## Step 1: Decide which pages belong in it

Start with a list rather than a file. Ask which pages you would hand to someone who needed to describe your business accurately in five minutes.

What follows is our recommendation. No spec or platform requires it. Link to the canonical pages that best describe what you do: main product or service pages, pricing or ordering information, an about page, contact and location details, and any help content customers rely on. Leave out thin pages, duplicates, tag archives, internal or sensitive URLs, and anything you would not want quoted back to you.

Keep it short. A dozen well-chosen links tell a clearer story than a sitemap pasted into Markdown. The spec makes a related point: the file "stays small enough to fit in context", and the detail lives behind the links.

## Step 2: Write the file

Write it in a plain text editor and save it as `llms.txt` with UTF-8 encoding:

1. An H1 with the name of the business or site.
2. A blockquote with a one or two sentence summary in plain words.
3. Optional paragraphs, if a reader needs to know something before the links make sense.
4. H2 sections grouping your links by purpose.
5. Under each H2, a list of links, each followed by a colon and a short note.
6. If you need one, an "Optional" H2 for lower-priority links.

The spec's writing guidelines are brief: use concise, clear language, give links short informative descriptions, and avoid ambiguous terms or unexplained jargon. Webflow's advice points the same way: say what your product actually does, and do not paste in homepage marketing copy. A good test for each note is whether it could sit on any company's site. If it could, rewrite it.

## A worked example

Here is the file for an invented business, a small bakery with an online shop. Every name and URL is made up.

```
# Example Bakery

> Independent bakery in Leeds selling sourdough, pastries and celebration cakes. Order online for collection in store or local delivery.

Celebration cakes need at least five days' notice. We do not offer gluten-free products.

## Shop

- [Bread and pastries](https://example.com/shop/bread): Full range with ingredients and allergen information
- [Celebration cakes](https://example.com/shop/cakes): Sizes, flavours, prices and how to order

## About

- [Our story](https://example.com/about): Who runs the bakery and how we bake
- [Visit us](https://example.com/visit): Address, opening hours and collection details
- [Delivery and refunds](https://example.com/delivery): Delivery area, charges and refund policy

## Optional

- [Blog](https://example.com/blog): Recipes and bakery news
```

The file has no keyword lists, no "best bakery" claims and no forty-link dump. The paragraph after the summary uses the slot the spec sets aside for detail: it holds facts a reader needs before following the links.

## Step 3: Publish it at your site root

Chrome's Lighthouse documentation says to create the file and "place it in the root directory of your website (for example, https://example.com/llms.txt)". That is the right target for a whole-site file. How you get it there depends on the platform.

### WordPress

If you use Yoast SEO, its help centre documents a built-in llms.txt feature. In the WordPress dashboard, go to Yoast SEO, then Settings, then Site Features. Under AI tools, find LLMS.txt, switch the toggle on and click Save changes. Yoast says the file is generated and refreshed automatically. To choose the pages yourself, open Customize llms.txt file and select Manual page selection. Yoast notes the feature is not available for multisite, and that if you see "Your llms.txt file couldn't be auto-generated" you should check the web server's file system permissions.

The llmstxt.org integrations list also names AIOSEO as a WordPress plugin with a generator. We have not checked AIOSEO's own documentation.

Without a plugin, the generic route is to upload your `llms.txt` to your site's root folder on the server, using your host's file manager or SFTP, so it loads at /llms.txt. Our advice is to use one method only, so a plugin and a hand-made file are not both trying to serve the same URL.

### Shopify

Shopify's developer documentation says that "by default, Shopify manages /llms.txt" by mirroring the content of /agents.md, and that "for most stores, the managed file is all you need". So open yourstore.com/llms.txt before you build anything. Your store probably already serves one.

To change it, Shopify recommends an `agents.md.liquid` theme template, which customises /agents.md, /llms.txt and /llms-full.txt together. Add an `llms.txt.liquid` template only if you need /llms.txt to differ from /agents.md. In the admin, go to Online Store, then Themes, click the three dots on your theme and choose Edit code. Then right-click the Templates folder, choose New File and name it `llms.txt.liquid`. Shopify's documented limits:

- It must be `llms.txt.liquid`. It cannot be a JSON template.
- It accepts plain text or Markdown plus Liquid, but only the `request` and `agents` objects are available. Standard objects such as `shop` and `collections` are not.
- Once you add it, you maintain its content yourself.
- The file is served at the bare primary domain, with no locale or Markets subfolder.

### Webflow and other hosted builders

Webflow's help centre documents an upload. Go to Site settings, then SEO, then LLMs.txt, click Upload file, choose your file and click Save changes. The file must be UTF-8 encoded and under 100 KB. After you publish, it is available at /llms.txt on your custom domain. It is not published to the Webflow staging domain.

The llmstxt.org integrations list says Wix generates an llms.txt file for every Wix site. That claim comes from the spec site, and we have not checked it against Wix's own help centre. For any other builder, look in its official help for a way to serve a plain text file at the root path, then confirm the result in a browser.

## Step 4: Check that it works (a validation checklist)

You do not need a validator tool. A browser and ten minutes are enough. This checklist is our recommendation, built from the spec's format rules.

1. Open yourdomain.com/llms.txt on the live domain. It should show plain text, not a styled web page or an error.
2. Check the first line is an H1 (`# Name`), followed by the `>` summary if you wrote one.
3. Check that the only headings after that are H2s (`##`), and that each list item starts with a `[name](url)` link.
4. Open every link. Each should load the page you meant and should not return an error.
5. Check that robots.txt does not block those pages for the crawlers you care about. Our [crawler access](/#crawler-access) section covers the main user agents.
6. Reread the notes. Do they still describe each page accurately?
7. Run the spec's own test: give an AI assistant only your llms.txt and ask it questions about your business.

Lighthouse has an llms.txt audit, but it checks little. Its documentation says it flags the page if a server error occurs when fetching the file, and marks the audit not applicable if the file returns a 404, "as providing the file is optional at the moment". It describes no check of the file's format, so passing the audit does not mean the file is well formed.

## Should you use a generator?

A generator or plugin saves typing, and on Shopify, or with Yoast switched on, one may already be running. The trouble is that automatic tools tend to include whatever they find, while the point of the file is a short, curated list. Our recommendation: treat generated output as a first draft, cut it down, rewrite vague notes and run the checklist above. We have not tested any standalone generator, so we do not name or rank any.

## What llms.txt does not do, and what is documented about it

No one can guarantee that this file changes whether or how an AI assistant cites you. Here is what the sources we checked actually say.

- **The spec** presents llms.txt as a proposal for helping agents while they assist users. It says thousands of sites publish one and that the files are used most heavily for software documentation. Those are the spec's own statements.
- **Google's** AI features documentation says that to be a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to show with a snippet, and "there are no additional technical requirements". It also says "specific optimization isn't required". It does not mention llms.txt.
- **OpenAI, Anthropic and Perplexity** describe their bots and robots.txt controls in their crawler documentation. None of those pages says the crawlers read a website's llms.txt. OpenAI and Perplexity publish llms.txt files for their own developer docs. That shows the format in use for documentation. It does not show that ChatGPT or Perplexity read your file when answering.
- **Webflow** calls the format "experimental", says it "doesn't guarantee your site will be read by LLMs", and says its effects on AI-driven search "are unclear".

So treat llms.txt as cheap and low-risk, and do not mistake it for a ranking lever. Whether assistants describe you well depends on the wider work covered in [what GEO is](/#what-is-geo) and [what AI visibility means](/what-is-ai-visibility/). To find out whether anything you change makes a difference, see our section on [measurement](/#measurement).

## Keeping the file up to date

An out-of-date llms.txt points at pages that have moved and describes a business that has changed. Webflow's advice is to update it regularly as your site changes, and we agree. In practice, review it whenever you add or retire a product line, change prices or policies, or restructure a section, and run the checklist again each time. If Shopify or a plugin generates the file for you, still read what it actually serves, because that is what an agent will see.
