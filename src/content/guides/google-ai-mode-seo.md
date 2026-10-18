---
# scriptgrain: generation edb75080-1f75-4c3c-a26c-7d45eb1ac3aa, voice match 0.73 (2026-10-18), then Claude edit + fact-check (page-pipeline item 702)
title: "Google AI Mode and SEO: what changes, and what to do about it"
seoTitle: "Google AI Mode SEO: What Changes and What to Do"
summary: "Google says the same SEO foundations apply to AI Mode, with no extra technical requirements. A page must be indexed and eligible to show a snippet to be linked, and nobody can guarantee a citation."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "Search Console cannot show you whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions, and this measures that."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Help: Get AI-powered responses with AI Mode in Google Search"
    url: "https://support.google.com/websearch/answer/16011537?hl=en"
  - label: "Search Console Help: What are impressions, position, and clicks?"
    url: "https://support.google.com/webmasters/answer/7042828?hl=en"
  - label: "Google Search Central: Robots meta tag, data-nosnippet and X-Robots-Tag specifications"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag"
  - label: "Google: List of Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "Do I need to do anything different for Google AI Mode?"
    a: "Google says no. The same foundational SEO best practices apply and there are no additional technical requirements. A page has to be indexed and eligible to show with a snippet before it can be a supporting link."
  - q: "Is AI Mode SEO different from AI Overviews SEO?"
    a: "Google gives one set of guidance that covers both. It also says the two may use different models and techniques, so the answers and links each one shows will vary."
  - q: "How do I stop my content appearing in AI Mode?"
    a: "Use nosnippet, or max-snippet, to stop or limit your content being used as a direct input. Use data-nosnippet for parts of a page, or noindex to keep the page out of Search entirely. Blocking Google-Extended will not do it, because Google says it does not affect inclusion in Google Search."
  - q: "Will AI Mode reduce my traffic?"
    a: "Nobody can tell you that for your site, and this page makes no traffic claims. Record a baseline for your key pages in Search Console and compare over time."
  - q: "Can I see AI Mode traffic in Search Console?"
    a: "Not separately. It is counted in the Performance report under the Web search type, and a click on a link to an external page in AI Mode counts as a click."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
In practice, ordinary SEO done properly is what counts: AI Mode links to pages that are in Google's Search index. Three documented things deserve your attention: who is eligible, the snippet controls that decide what AI Mode may use, and how its traffic shows up in Search Console. Throughout, we say which claims come from Google's documentation, which come from research and which are our own recommendation.

## What Google AI Mode is, in one paragraph

AI Mode is a conversational search experience inside Google Search. Google's help page describes it as an AI-powered response "with the ability to go deeper through follow-up questions and helpful links to the web", and says it expands what AI Overviews can do with more advanced reasoning. You reach it at google.com/ai, from the AI Mode option after typing a question on google.com, or in the Google app. When we checked on 18 October 2026, the help page listed a long run of supported countries and territories, including the United Kingdom and the United States, and dozens of languages, English among them. Google says it will keep refining the product, so check that page for the current list.

## What Google says you need to do (and what it says you do not)

Google's page "AI features and your website" covers AI Overviews and AI Mode together. In its own words, you can apply "the same foundational SEO best practices for AI features as you do for Google Search overall", and "specific optimization isn't required for AI Overviews and AI Mode". On technical requirements it is blunt: "There are no additional technical requirements."

It then lists SEO fundamentals it still calls worthwhile. This list is Google's:

- allow crawling in robots.txt, and by any CDN or hosting infrastructure
- make content easy to find through internal links
- provide a good page experience
- make sure important content is available in textual form
- support text with high-quality images and video where relevant
- make sure structured data matches the visible text on the page
- keep Merchant Center and Business Profile information up to date

That is the documented baseline. Many top results for this search come from agencies and vendors with a reason to say the rules have changed, and Google's own documentation does not say so. Documentation can't tell you everything about how a system behaves. Still, it is the only primary source on what Google asks of site owners, so start there.

## How AI Mode finds pages: query fan-out and what it means for your content

Google says both AI Overviews and AI Mode "may use a 'query fan-out' technique", issuing multiple related searches across subtopics and data sources to build a response. The AI Mode help page puts it more plainly: AI Mode divides your question into subtopics, searches for each one at the same time, then brings the results together. Google says this lets it show "a wider and more diverse set of helpful links" than a classic web search.

Google also says AI Mode and AI Overviews "may use different models and techniques", so the responses and links they show will vary. The guidance for site owners is the same for both, but you should expect different outputs.

What this means for your content is our interpretation, because Google publishes no recipe. If one question turns into several searches, a page that covers the question properly, plus the subtopics and follow-ups a reader would naturally have, has more chances to match one of them. Padding is a different matter. Thin sections written to touch more phrases help nobody, and the GEO research below found keyword stuffing did little. For the bigger picture of how AI answers are put together, see [how AI answers happen](/#how-it-works). For where this overlaps with ordinary search work, see [GEO and SEO](/#geo-vs-seo).

## Eligibility and controls: indexing, snippets, nosnippet and robots

This part is documented and mechanical, so it is worth getting exactly right.

**Eligibility.** Google says: "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet". That is two conditions. If a page fails either one, it can't be a supporting link.

**Controls.** Google says robots.txt rules for Googlebot are how you manage crawling for Search, AI features included. To limit what is shown, it points to `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex`. Its robots meta tag documentation spells out what each one does to AI features:

| Control | What Google documents |
| --- | --- |
| `noindex` | The page is not shown in search results, so it can't be a supporting link. It also drops out of ordinary results. |
| `nosnippet` | No text snippet or video preview in any form of Google search result, which Google says includes AI Overviews and AI Mode. The content is also not used as a direct input for them. |
| `max-snippet:[number]` | Caps snippet length and limits how much of the content may be used as a direct input for AI Overviews and AI Mode. `max-snippet:0` is the same as `nosnippet`. |
| `data-nosnippet` | An HTML attribute for `span`, `div` or `section` elements. It keeps those parts of the page out of snippets. |

Watch for two traps. First, Google can only read these rules on pages it is allowed to crawl. If robots.txt blocks a page, Google never sees its `noindex`. Second, Google-Extended. Google's crawler documentation says this token controls whether your content may be used to train future Gemini models and for grounding in Gemini Apps and Vertex AI. It also says Google-Extended "does not impact a site's inclusion in Google Search". Blocking it will not keep you out of AI Mode. The home guide's section on [crawler access](/#crawler-access) covers crawlers more widely.

Restricting snippets is a trade-off, because it limits what AI Mode can use and show. Choose it deliberately.

What if you have added a preview control and your content still appears in AI features? Google suggests using the URL Inspection tool to check that Googlebot actually received the control, then allowing time for a recrawl. It says recrawling can take "several days to several months".

## What to check and improve: a practical checklist

This checklist is our recommendation, built on Google's list above. None of it is a documented ranking requirement, and doing all of it guarantees nothing.

1. **Confirm your important pages are indexed.** Verify your site in Search Console and run URL Inspection on the pages that matter.
2. **Look for snippet blocks you didn't mean to add.** Search your templates for `nosnippet`, `max-snippet` values and stray `data-nosnippet` wrappers, and check HTTP headers for `X-Robots-Tag`.
3. **Check robots.txt and your CDN.** Make sure Googlebot isn't blocked by a rule, or by bot protection at the hosting layer.
4. **Keep the answer in text.** If key information lives only in an image, a PDF or a widget a crawler can't read, treat it as missing.
5. **Answer the next questions.** For each important page, list what a reader would ask next, and answer it on that page or a linked one.
6. **Keep titles and structured data accurate.** A title should describe the page honestly, and structured data should match what is visible.

Nothing exotic, which matches Google's guidance. The home guide's [principles](/#principles) explain the thinking behind most of it.

## What the research says, and its limits

The best-known study is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024. The authors built GEO-bench, a set of 10,000 queries from several sources. They also built a test generative engine: for each query it fetched the top five Google results and had a language model write an answer from them. They then rewrote source pages in different ways and used metrics they defined themselves to measure how much each source was used and cited.

Here is what they found under those conditions. Adding citations, quotations from relevant sources and statistics worked best, with relative improvements of roughly 30 to 40% on their position-adjusted word count metric. Keyword stuffing, a classic SEO tactic, gave "little to no improvement". They also tested the same methods on Perplexity.ai and report improvements there too.

The limits matter. The study did not test Google AI Mode. Its main results come from a research engine run on a benchmark and scored with the authors' own metrics. The authors also note that results varied by domain. Treat the study as evidence that the way a page is written can change how generative engines use it. It does not tell you what will happen in AI Mode.

The same caution applies to vendor claims. This page uses no traffic, click-through or ranking-factor numbers from agencies or tool vendors.

## How to see AI Mode in your reporting

Google says traffic from AI features is included in your overall search traffic in Search Console, in the Performance report under the "Web" search type. That report has no separate AI Mode filter.

Search Console's help page on how data is counted gives these details for AI Mode:

- a click on a link to an external page in AI Mode counts as a click
- standard impression rules apply
- position is worked out the same way as on a normal results page
- a follow-up question in AI Mode counts as a new query
- Search Labs experiments are not included

So there is no report where you can read off "AI Mode clicks". Our recommendation is to work around that:

1. Pick a set of pages that matter, and record their clicks, impressions and queries under the Web search type.
2. Keep a dated log of every change you make to those pages.
3. Compare later periods with that baseline, reading any changes against your log and against wider shifts in your traffic.

This is a blunt method, but it is honest about what the data can show. The [measurement section](/#measurement) of the home guide covers setting up a repeatable baseline, including checks on AI assistants outside Google.

## What you cannot control

You can't guarantee a citation or force a link into a generated answer. You can't isolate AI Mode traffic in Search Console, and you can't see how fan-out splits a given question. Google itself says AI Mode "doesn't always get it right" and may misinterpret web content or miss context.

These things you can control: whether your pages can be crawled and indexed, whether snippets are allowed, whether your content answers real questions in readable text, and whether your measurement is set up so you actually learn from it.
