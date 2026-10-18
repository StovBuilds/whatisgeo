---
# scriptgrain: generation 87af6477-48bd-43c8-926a-d87bf8a77474, voice match 0.85 (2026-10-18), then Claude edit + fact-check (page-pipeline item 724)
title: "AI Mode vs AI Overviews: what is the difference, and does it change what you do?"
seoTitle: "AI Mode vs AI Overviews: Differences and What to Do"
summary: "AI Overviews are a summary Google adds to some ordinary results pages. AI Mode is a separate conversational search. Google's guidance for site owners is the same for both, though the answers and links can differ."
category: "compare"
related: ["google-ai-mode-seo","what-are-google-ai-overviews","how-to-rank-in-google-ai-overviews","how-to-track-ai-overviews"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Help: AI Overviews in Google Search"
    url: "https://support.google.com/websearch/answer/14901683"
  - label: "Google Search Help: AI Mode in Google Search"
    url: "https://support.google.com/websearch/answer/16011537"
  - label: "Google: AI Overviews and AI Mode in Search (PDF)"
    url: "https://search.google/pdf/google-about-AI-overviews-AI-Mode.pdf"
  - label: "Google Search Central: Robots meta tag, data-nosnippet and X-Robots-Tag specifications"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag"
  - label: "Search Console Help: How clicks, impressions and position are counted"
    url: "https://support.google.com/webmasters/answer/7042828"
  - label: "Google crawling infrastructure: Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
faq:
  - q: "What is the difference between AI Mode and AI Overviews?"
    a: "An AI Overview is a summary Google shows on some results pages when its systems judge it useful. AI Mode is a separate experience that people open themselves, where they ask a question and keep asking follow-ups. Google's guidance for site owners is the same for both."
  - q: "Is Google AI Overview just Gemini?"
    a: "No. Google says AI Overviews use a customised Gemini model that works alongside its existing Search systems, such as ranking and the Knowledge Graph. AI Mode uses a custom version of Gemini too, but both are features of Google Search and are separate from the Gemini app."
  - q: "Do AI Mode and AI Overviews show the same sources?"
    a: "Not necessarily. Google says the two may use different models and techniques, so the responses and links they show will vary, and that a different set of links will likely appear for the same query."
  - q: "Do I need to optimise differently for AI Mode and AI Overviews?"
    a: "No. Google says specific optimisation isn't required for either, and the same foundational SEO practices apply. A page needs to be indexed and eligible to show with a snippet, and even then Google does not guarantee it will appear."
  - q: "Can I turn off AI Mode or AI Overviews?"
    a: "Searchers cannot switch AI Overviews off, but Google's Web filter shows only text links. Site owners can use nosnippet, max-snippet, data-nosnippet or noindex to limit what both features use, though these also affect ordinary results. Blocking Google-Extended does not affect Search."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
The real difference is how people arrive. An AI Overview appears by itself on a results page when Google's systems decide it helps, while AI Mode is somewhere a person chooses to go, ask a question and keep following up. Everything below comes from Google's own documentation unless it says otherwise.

## AI Mode vs AI Overviews at a glance

| | AI Overviews | AI Mode |
| --- | --- | --- |
| Where it appears | Inside an ordinary Google results page | A separate search experience |
| How people get there | It appears by itself on some queries | The searcher opens it: google.com/ai, the AI Mode option after a search, or the Google app |
| Follow-up questions | On mobile, Show more leads into AI Mode | Built in: ask, then keep asking |
| Query fan-out | May be used | May be used; described in AI Mode's help page |
| Model, as Google describes it | A customised Gemini model working with Search systems | A custom version of Gemini, with more advanced models |
| To be a supporting link | Indexed and eligible to show with a snippet | The same |
| nosnippet and max-snippet | Apply | Apply |
| Search Console | Counted in the Web search type | Counted in the Web search type |

Google's Search Central guide calls these two features "AI features" in Search, and it gives site owners a single set of advice for both.

## Where each one appears and how people reach it

An AI Overview is something that happens to a search. Google's Help page describes it as "an AI-generated snapshot with key information and links to dig deeper", shown "when our systems determine that generative AI can be especially helpful". Search Central adds that AI Overviews are only shown when they are additive to classic Search, "and as such, often don't trigger." The searcher does not ask for one.

AI Mode is somewhere a search goes. Google's AI Mode Help page lists three ways in: go to google.com/ai, type a question on google.com and tap AI Mode, or tap AI Mode on the Google app's home screen. From there people ask follow-up questions in an "Ask anything" bar.

The two are connected on mobile. The AI Overviews Help page says you can select Show more at the bottom of an AI Overview, then type a follow-up to continue in AI Mode, and the context of your original search carries over.

For each feature in more depth, see [what are Google AI Overviews](/what-are-google-ai-overviews/) and [Google AI Mode and SEO](/google-ai-mode-seo/).

## What the two share: query fan-out, links and eligibility

Search Central says both features "may use a 'query fan-out' technique", which means issuing multiple related searches across subtopics and data sources to build a response. AI Mode's Help page describes it in plain terms: it divides your question into subtopics and searches for each one simultaneously. In practice your page could be found for a sub-question the searcher never typed. The [how it works](/#how-it-works) section of our main guide covers this retrieval step in more detail.

Eligibility is the same for both. To be eligible as a supporting link in either feature, Google says a page "must be indexed and eligible to be shown in Google Search with a snippet", and "there are no additional technical requirements." Eligibility is the minimum. It does not mean a page will be shown.

Snippet controls apply to both as well. Google's robots meta tag documentation says `nosnippet` also prevents content "from being used as a direct input for AI Overviews and AI Mode", and `max-snippet` limits how much content may be used as that input. Both rules also change how the page appears in ordinary results, so check before you add one for an unrelated reason.

## What Google says may differ

Search Central puts it in one sentence: "AI Mode and AI Overviews may use different models and techniques, so the set of responses and links they show will vary." Google's longer document on the two features goes further. Because AI Mode uses more advanced models and novel techniques, "a different set of responses and links will likely appear for the same query."

Google also describes different jobs. AI Overviews help people "get to the gist" of a topic quickly. AI Mode is meant for queries that need "further exploration, reasoning, or complex comparisons." Google does not publish a mapping that predicts which links each feature will choose, so treat anyone claiming precise knowledge of the gap as working from their own observations.

## Are AI Overviews and AI Mode just Gemini?

They run on Gemini models, but neither one is the Gemini app. Google's document on the two features says AI Overviews "use a customized Gemini model, which works in tandem with our existing Search systems", such as its quality and ranking systems and the Knowledge Graph. It says AI Mode uses "a custom version of Gemini." The AI Mode Help page also lists a named Gemini model that some signed-in users, including Google AI Pro and Ultra subscribers, can pick from a menu, alongside the default "Auto" or "Fast" options.

So Gemini is the model family underneath, and AI Overviews and AI Mode are Google Search features built on it and tied to Google's index. One practical consequence: Google's crawler documentation says the Google-Extended robots.txt token controls use of your content for Gemini Apps and Vertex AI, and "does not impact a site's inclusion in Google Search." Blocking it will not remove you from either feature. For Search, the controls are Googlebot access and the snippet rules above.

## Do they cite the same pages? What research says, and its limits

Google's own answer is that they will often differ, as quoted above. This page does not repeat third-party figures on how much the cited sources overlap, because we have not verified one study's sample and method well enough to report it.

If you read such a study, check four things before acting on it: how many queries it used and what kind, which country and language, when the data was collected, and how a match was defined (same page, or just same domain). An overlap figure describes that query set at that time. It cannot tell you what will happen for your pages, and it does not override what Google says about the two features using different techniques. Your own tracking is the better guide.

## Do you need a different strategy for each?

No. Google says "specific optimization isn't required for AI Overviews and AI Mode" and that the same foundational SEO practices apply. Its list includes allowing crawling in robots.txt and at your CDN or host, internal links, a good page experience, important content in text form, structured data that matches the visible text, and an up-to-date Merchant Center and Business Profile where relevant.

One idea is worth designing around, and this is our recommendation, not a Google rule. Since both features may fan a query out into subtopics, cover the follow-up questions a topic naturally raises on a page, instead of only the headline query. [How to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/) sets out the steps, and they apply to AI Mode too. Nothing you do can guarantee a place in either feature.

## How to see each one in your reporting

Search Central says traffic from both features is included in your overall Search Console data, in the Performance report under the "Web" search type. Google's documentation describes them as part of that data and does not describe a separate report for either. Search Console's help explains how each is counted:

- **AI Overviews:** a click on an external link counts as a click. The whole overview takes a single position, and every link in it gets that same position.
- **AI Mode:** a click on an external link counts as a click, and position follows the same method as a normal results page. A follow-up question counts as a new query, so its impressions and clicks are recorded against that new query.
- **Search Labs:** experiments are not included for either feature.

To see when and where you actually appear, [how to track AI Overviews](/how-to-track-ai-overviews/) explains the methods, and [how to measure AI visibility](/how-to-measure-ai-visibility/) covers the wider picture across AI assistants.
