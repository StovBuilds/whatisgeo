---
# scriptgrain: generation 428da14f-f006-4943-94c9-abacbc827512, voice match 0.71 (2026-10-18), then Claude edit + fact-check (page-pipeline item 701)
title: "What are Google AI Overviews?"
seoTitle: "What Are Google AI Overviews? How They Work and Start"
summary: "AI Overviews are AI-generated summaries that Google shows on some searches, with links to supporting web pages. Google says no special markup is needed to be included, and no one can guarantee it."
category: "platforms"
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Help: AI Overviews in Google Search"
    url: "https://support.google.com/websearch/answer/14901683"
  - label: "Google Search Central: Robots meta tag, data-nosnippet and X-Robots-Tag specifications"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag"
  - label: "Google crawling infrastructure: Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
  - label: "Google Search Central: Featured snippets and your website"
    url: "https://developers.google.com/search/docs/appearance/featured-snippets"
  - label: "Google blog, 14 May 2024: Generative AI in Search (Google I/O 2024)"
    url: "https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/"
  - label: "Google blog, 15 August 2024: New ways to connect to the web with AI Overviews"
    url: "https://blog.google/products-and-platforms/products/search/new-ways-to-connect-to-the-web-with-ai-overviews/"
  - label: "Google blog, 28 October 2024: AI Overviews expanding to more than 100 countries"
    url: "https://blog.google/products-and-platforms/products/search/ai-overviews-search-october-2024/"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "What are Google AI Overviews?"
    a: "They are AI-generated snapshots of key information that Google shows in some search results, with links to web pages for more detail. Google shows them only when its systems judge that generative AI adds something to the classic results."
  - q: "When did Google AI Overviews start, and when did they reach the UK?"
    a: "Google announced on 14 May 2024 that AI Overviews were rolling out to everyone in the US, after an experiment in Search Labs. On 15 August 2024 Google announced they were coming to six more countries, including the United Kingdom."
  - q: "Can I turn off Google AI Overviews?"
    a: "Searchers cannot. Google's Search Help says features cannot be turned off, but the Web filter shows only text-based links. Publishers can use nosnippet, max-snippet or noindex, though these also affect how the page appears in ordinary results."
  - q: "Do I need special markup or a file to appear in an AI Overview?"
    a: "No. Google says a page must be indexed and eligible to show with a snippet, and that there are no additional technical requirements. Meeting those conditions makes a page eligible but does not guarantee it will appear."
  - q: "How are AI Overviews different from AI Mode?"
    a: "An AI Overview appears within normal search results and only on some queries. AI Mode is a conversational experience for questions that need more exploration or comparison. Google says the two may use different models and techniques, so their answers and links can differ."
  - q: "Does blocking Google-Extended remove my site from AI Overviews?"
    a: "No. Google's crawler documentation says Google-Extended does not affect a site's inclusion in Google Search. It controls use in Gemini model training and in grounding for Gemini Apps and Vertex AI. Googlebot and the snippet controls are what apply to Search."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
They do not appear on every search. Google says AI Overviews are shown only when its systems decide they add something to the classic results, so on many queries there is none. This page sticks to what Google has documented and labels each point as one of three things: Google's own documentation, a research finding, or our recommendation.

## What AI Overviews are, in plain terms

**Google's documentation.** Google's Search Help calls an AI Overview "an AI-generated snapshot with key information and links to dig deeper". Search Central lists AI Overviews and AI Mode as the two AI features in Google Search. Both show links to supporting web pages alongside the generated text.

Google also says plainly that "AI Overviews can and will make mistakes", and it tells searchers to check important information in more than one place and to click through to the linked sources.

For a site owner, the links are what count. An AI Overview sits among the normal results, which are still there, and the supporting links are how your pages appear in it.

## When did Google AI Overviews start?

**Google's announcements.** The dates below come from Google's own blog posts:

| Date | What Google announced |
|---|---|
| 14 May 2024 (Google I/O) | AI Overviews "will begin rolling out to everyone in the U.S.", following an experiment in Search Labs |
| 15 August 2024 | Expansion to six more countries: the United Kingdom, India, Japan, Indonesia, Mexico and Brazil, with local language support |
| 28 October 2024 | Expansion to more than 100 countries |

According to the May 2024 post, AI Overviews were tested in Search Labs before launch. Google's Search Help now lists the countries, territories and languages where they are available. The list is long and it changes, so check that page for the current position.

## How an AI Overview is produced

**Google's documentation.** Search Central says AI Overviews and AI Mode "may use a 'query fan-out' technique", which means "issuing multiple related searches across subtopics and data sources" to build a response. While the response is being generated, Google's models find more supporting pages. Google says this lets it show a "wider and more diverse set of helpful links" than a classic web search.

Google has not published a list of signals that decide which pages get cited in an AI Overview. Anyone who claims to know the formula is guessing. Our [guide to how AI answers happen](/#how-it-works) walks through retrieval and citation across the main assistants.

## How AI Overviews differ from AI Mode and featured snippets

**Google's documentation.**

| | AI Overviews | AI Mode | Featured snippets |
|---|---|---|---|
| What it is | AI-generated snapshot with links | Conversational AI response with links to supporting sites | A box that shows a page's snippet first, reversing the normal result format |
| When it shows | Only when Google's systems judge it adds to classic Search | For questions that need more exploration, reasoning or comparison | Selected automatically by Google |
| Source of the text | Generated by AI from several sources | Generated by AI from several sources | Taken from one page |

Google says AI Mode and AI Overviews "may use different models and techniques", so their answers and links will vary. On mobile, Search Help says you can move from an AI Overview into AI Mode by selecting **Show more** and asking a follow-up question.

## What decides whether your site appears as a link

**Google's documentation.** Search Central puts it this way: "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet". It adds: "There are no additional technical requirements." Google also says specific optimisation "isn't required" and that the usual SEO fundamentals still apply. Those include allowing crawling in robots.txt and at your CDN or host, linking to pages internally, putting important content in text, and keeping structured data consistent with the visible page.

Eligibility does not mean inclusion. A page that meets every condition may still never be cited, and nobody can promise otherwise.

**Research finding.** Aggarwal et al. ("GEO: Generative Engine Optimization", accepted to KDD 2024) tested changes to content, such as adding citations, quotations and statistics, and found that these could make a source more visible in generated answers. Bear in mind the conditions. The tests ran on a generative engine the authors built themselves, which answered from the top five Google results, using a benchmark of 10,000 queries. They repeated the tests on Perplexity.ai. They did not test Google AI Overviews, and they found that results varied by subject area. Treat it as a useful pointer, not a rule for Google.

**Our recommendation.** Make sure your important pages are crawlable, indexed and able to show a snippet. Then put your effort into clear, well-sourced content in plain text. Paid markup or special files will not help, because Google says none is needed. Our [principles](/#principles) explain why, and the [crawler access](/#crawler-access) section covers robots.txt and CDN blocks.

## Can you turn AI Overviews off or opt out?

Searchers and publishers get different answers.

**Searchers (Google's documentation).** Searchers cannot turn them off. Google's Search Help says AI Overviews are "a core Google Search feature" and that "Features cannot be turned off." What you can do is select the **Web** filter after searching, which "displays only text-based links without features like AI Overviews". Turning off "AI in Search" in Labs only opts you out of experiments, not AI Overviews themselves.

**Publishers (Google's documentation).** Google says robots.txt rules for Googlebot are how you control crawling for Search, AI features included. To limit what is shown from your pages, the robots meta tag documentation lists these controls:

- `nosnippet`: no text snippet in any form of search result, including AI Overviews and AI Mode. Google says it "will also prevent the content from being used as a direct input for AI Overviews and AI Mode."
- `max-snippet:[number]`: caps the snippet length and "will also limit how much of the content may be used as a direct input for AI Overviews and AI Mode." `max-snippet:0` works the same as `nosnippet`.
- `data-nosnippet`: an HTML attribute that keeps specific parts of a page out of snippets.
- `noindex`: removes the page from Google Search altogether.

The catch is that these controls work across all of Search. `nosnippet` also removes the text snippet in ordinary web results, and `noindex` removes the page from Google entirely. Google offers no setting that only takes you out of AI Overviews.

**Google-Extended does not cover this.** Google's crawler documentation says the Google-Extended token governs whether your content may be used to train Gemini models and to ground answers in Gemini Apps and Vertex AI. It also says it "does not impact a site's inclusion in Google Search". Blocking it will not remove you from AI Overviews.

If you add a preview control and still see your content in AI features, Google suggests checking the control with the URL Inspection tool and waiting for a recrawl, which it says can take from several days to several months.

## How to see whether your site shows up

**Google's documentation.** Search Central says traffic from AI features is counted in Search Console's Performance report, under the "Web" search type, together with the rest of your search traffic. Google's page does not mention a separate AI Overviews report, so you cannot use these figures to isolate AI Overview clicks. Google also suggests tracking conversions and time on site in tools such as Google Analytics.

**Our recommendation.** Search for the questions your customers actually ask and note whether an AI Overview appears and which pages it links to. Repeat the check over time, and read it alongside your Search Console trend. Our [measurement guide](/#measurement) explains how to do this without reading too much into small samples.

## What to do next

These are our recommendations, based on Google's documentation:

1. Check your key pages in Search Console's URL Inspection tool to confirm they are indexed and nothing blocks a snippet.
2. Make sure robots.txt, your CDN and your host let Googlebot crawl them.
3. Before adding `nosnippet`, `max-snippet` or `noindex`, decide whether you can accept the effect on your ordinary results as well.
4. Keep important content in text, and keep structured data consistent with what visitors see.
5. Use the Performance report as your baseline, and run your own spot checks on the questions that matter to you.

For a fuller plan covering every AI assistant, see our [30-day plan](/#getting-started).
