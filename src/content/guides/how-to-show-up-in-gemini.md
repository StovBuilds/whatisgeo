---
# scriptgrain: generation 166cb0ad-c1fe-4ad0-bb8a-a80b1f6334cc, voice match 0.71 (2026-10-18), then Claude edit + fact-check (page-pipeline item 728)
title: "How do you show up in Gemini? What is documented, what is research, and what is guesswork"
seoTitle: "How to Show Up in Gemini: What Is Documented"
summary: "Nobody can guarantee a mention in Gemini. Google documents that AI Overviews and AI Mode draw on Search and that the Gemini app can ground answers in the Search index, so being indexable is the main lever."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "Once you have checked a few questions by hand, it tracks whether Gemini and other assistants name and cite your company for your buyers' questions over time."
related: ["how-to-rank-in-google-ai-overviews","google-ai-mode-seo","perplexity-seo"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google: List of Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
  - label: "Google AI for Developers: Grounding with Google Search"
    url: "https://ai.google.dev/gemini-api/docs/google-search"
  - label: "Gemini Apps Help: View related sources from Gemini Apps"
    url: "https://support.google.com/gemini/answer/14143489"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024), arXiv abstract"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "How do I get my website to show up in Gemini?"
    a: "Nobody can guarantee it. Google's stated requirement for AI Overviews and AI Mode is that a page is indexed and eligible to show with a snippet, with no additional technical requirements. Beyond that, clear pages, consistent business details and testing with real buyer questions are our recommendations."
  - q: "Does blocking Google-Extended stop me appearing in Gemini or AI Overviews?"
    a: "Google says Google-Extended does not affect inclusion or ranking in Google Search, and points to Googlebot as the robots.txt control for AI features in Search. It does govern whether Google may use your content to train future Gemini models and to ground answers in the Gemini apps, so blocking it can affect the Gemini app."
  - q: "Is Gemini SEO different from Google SEO?"
    a: "For AI Overviews and AI Mode, Google says the same foundational SEO practices apply and no specific optimisation is required. Anything beyond that is someone's opinion, including ours."
  - q: "Do I need to submit my site to Gemini?"
    a: "None of the Google documentation we checked describes a separate submission step. For AI features in Search, the stated condition is being indexed and eligible for a snippet."
  - q: "Is Gemini better than ChatGPT for SEO?"
    a: "We have no evidence to rank them. They reach web content in different ways, so test each one with your own buyer questions and compare the answers you actually get."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Start by working out which Gemini your customers actually use, because Google documents each one in a different place and the controls differ. In every case Google describes, the web content Gemini uses comes through Google Search, so the work starts with ordinary crawlability and indexing. This page labels each claim. **Documented** means Google publishes it. **Researched** means a paper tested it, under conditions we state. **Recommended** is our own advice.

## Which Gemini do you mean? The app, AI Overviews, AI Mode and the API

"Gemini" covers several things, and the most useful first step is deciding which one matters to you.

| Surface | Where people meet it | Where Google documents it |
|---|---|---|
| Gemini app | gemini.google.com and the mobile apps | Gemini Apps Help Centre |
| AI Overviews | A summary on a Google results page | Google Search Central |
| AI Mode | A conversational mode inside Google Search | Google Search Central |
| Gemini API with Search grounding | Apps that developers build on Gemini | Google AI for Developers |

The most common mistake is treating all four as one channel. Google's own Search documentation says AI Mode and AI Overviews "may use different models and techniques, so the set of responses and links they show will vary", and those two are the closest pair. If your buyers mostly meet you on a results page, read our guides to [ranking in Google AI Overviews](/how-to-rank-in-google-ai-overviews/) and [Google AI Mode SEO](/google-ai-mode-seo/). This page covers what applies across all four.

## What Google documents about how Gemini finds web content

**AI Overviews and AI Mode (documented).** Google Search Central's page on AI features says that to be eligible as a supporting link, "a page must be indexed and eligible to be shown in Google Search with a snippet", and that "there are no additional technical requirements." It also says specific optimisation "isn't required" and that the usual SEO fundamentals still apply. Google adds that both features may use "query fan-out", running several related searches across subtopics to build one answer.

**The Gemini app (documented).** Google's crawler documentation describes grounding in the Gemini apps as "providing content from the Google Search index to the model at prompt time." The Gemini Apps Help Centre says the apps "may provide links to sources and related content", which can include public websites. It also says that not every response includes sources. If there is no Sources button, the app gave no links for that answer.

**The Gemini API (documented).** Grounding with Google Search is a tool a developer switches on. Google's developer docs say the model decides whether a search would improve the answer, runs one or more queries if so, and returns a response with inline citations to its sources. This explains how Gemini can use Search. It says nothing about how individual pages get chosen.

Across all three, the web content Google describes comes from its Search index. That much is documented. Exactly how pages get picked from that index for any given answer is not published.

## What you control: crawling, indexing and Google-Extended

You control two separate settings, and they are easy to mix up. Our home guide's section on [crawler access](/#crawler-access) explains the general idea.

**Googlebot controls Search, including its AI features (documented).** Google says AI is "integral to how Search functions", so robots.txt rules for Googlebot are how you control crawling for Search. To limit what Search shows from a page, it points to `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex`. Because snippet eligibility is a stated condition, a page with `nosnippet` or `noindex` cannot be a supporting link in AI Overviews or AI Mode.

**Google-Extended controls Gemini training and app grounding (documented).** Google describes Google-Extended as "a standalone product token" for robots.txt. It does not crawl on its own and has no separate user agent. It decides whether content Google crawls from your site may be used to train future Gemini models (for the Gemini apps and the Vertex AI API for Gemini) and for grounding in the Gemini apps and in Grounding with Google Search on Vertex AI. Google states that it "does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search."

In practice:

- Blocking Google-Extended leaves AI Overviews and AI Mode alone, because Google ties those to Googlebot and Search.
- Blocking Google-Extended can keep your content out of grounded answers in the Gemini app. If you want to appear there, check you have not blocked it by accident, for example through a blanket rule copied from an "AI bots" list.

Google updates these pages, so check the current wording before you change robots.txt. Our guide to [AI crawlers and robots.txt](/ai-crawlers-robots-txt/) covers the other assistants' crawlers.

## What research says about getting cited by generative engines

The most cited study is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024 (researched). The authors built a benchmark of 10,000 queries. For each query they gave a language model the text of the top five Google results and asked it to write an answer. Then they rewrote individual sources in different ways and measured how visible each source became in the answer.

They report gains of up to 40% on their own visibility measures. Adding citations, quotations from relevant sources and statistics did especially well. They also found that what worked varied by domain. They repeated the methods on Perplexity.ai as a check on a live product.

Bear its limits in mind:

- **It did not test Gemini,** the Gemini app, AI Overviews or AI Mode.
- **Most results came from a setup the authors built** and scored on their own metrics. A live product that changes without notice may behave differently.
- **It measured visibility inside answers,** not traffic, leads or sales.

The fair conclusion is that how a page is written can change how much of it a generative engine uses, and that the effect depends on the subject. It does not tell you that any given edit will get you named in Gemini.

## What is sensible practice (and labelled as such)

These are our recommendations. They follow from the documentation above, and none of them comes with a guarantee.

1. **Make sure key pages are indexable and snippet-eligible.** This is the one step with documentation behind it. Use the URL Inspection tool in Search Console to check.
2. **Check robots.txt for Googlebot and Google-Extended separately.** Decide on purpose what each one should be allowed to do.
3. **Answer the question early and in plain words.** Put the fact, price or condition near the top of the page, where a model summarising it has less to misread.
4. **Keep business details consistent.** Use the same name, description, location and offer on your site, your Google Business Profile and other listings. Google's AI features page itself advises keeping Business Profile and Merchant Center information up to date.
5. **Test with real buyer questions,** the ones customers actually ask before they buy.

This is mostly good Search practice. That is to be expected, because the documented route into Gemini runs through Search.

## What nobody can promise

Nobody can promise you a mention in Gemini, and that includes Google, agencies, tool vendors and us. Google does not document any inclusion guarantee for any Gemini surface. The research does not offer one either. Nobody can honestly promise a timeframe or a percentage uplift.

Answers also vary. Google says AI Overviews often do not appear at all, and that AI Mode and AI Overviews can show different links for the same question. One check therefore tells you very little. If someone sells you numbered steps, ask which Google page or paper each step comes from.

## How to check whether Gemini names you, step by step

You can run this yourself. It shows where you stand today and predicts nothing.

1. **List 10 to 20 real buyer questions** in your customers' own words.
2. **Pick one surface per test.** Use the Gemini app, a Google search (for AI Overviews), or AI Mode. Do not mix results from different surfaces.
3. **Ask each question and record the result.** Note whether you are named, whether you are linked (in the app, open the Sources panel) and which sites appear instead.
4. **Repeat on other days.** Answers shift between runs, so look for patterns.
5. **Check the basics on any page you expected to see.** Is it indexed? Is it eligible for a snippet? Is Google-Extended set the way you intended?
6. **Use Search Console for AI Overviews and AI Mode.** Google says clicks and impressions from these features count in the Performance report under the "Web" search type. They are combined with ordinary results there, not broken out separately.

For a fuller method that covers other assistants too, read [how to measure AI visibility](/how-to-measure-ai-visibility/).

## Gemini compared with ChatGPT and Perplexity for visibility

The documented difference is where the content comes from. For Gemini, Google's documentation points back to its own Search index every time. ChatGPT and Perplexity use their own crawlers and their own documentation, so a robots.txt rule or a fix that matters for one may do nothing for the others. We cover them separately in [how to rank in ChatGPT](/how-to-rank-in-chatgpt/) and our Perplexity guide.

We have no evidence for ranking one above another as a channel. The useful comparison is your own: run the same buyer questions in each and see where you are named.

## Questions

The common questions about Gemini visibility are answered below.
