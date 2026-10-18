---
# scriptgrain: generation 0bca7a54-381b-4a09-8b23-b058a9d27535, voice match 0.72 (2026-10-18), then Claude edit + fact-check (page-pipeline item 726)
title: "How do you write content for AI search? What is documented, what is research, and what is folklore"
seoTitle: "How to Write Content for AI Search: What's Evidenced"
summary: "Answer the question plainly near the top, make each section stand alone and source your facts. Google says its AI features need no special optimisation, and nobody can guarantee a citation."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "Once you have rewritten a page, you can check whether ChatGPT, Claude, Gemini and Perplexity name and cite you for your buyers' questions."
related: ["how-to-improve-ai-visibility","how-to-rank-in-google-ai-overviews","how-to-rank-in-chatgpt","is-ai-content-good-for-seo","schema-markup-for-ai","how-to-measure-ai-visibility"]
sources:
  - label: "Google Search Central Blog: Top ways to ensure your content performs well in Google's AI experiences on Search (John Mueller, 21 May 2025)"
    url: "https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central: Robots meta tag, data-nosnippet and X-Robots-Tag specifications"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag"
  - label: "Google Search Central: Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024), arXiv abstract"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "How do you structure content for AI search?"
    a: "We recommend opening with the direct answer, using headings that describe what each section says, and writing each section so it makes sense on its own. None of this is a documented requirement. Google says its AI features need no special optimisation beyond being indexed and eligible for a snippet."
  - q: "Should answers be 40 to 60 words?"
    a: "We found no platform documentation or published study that sets an answer length. The 40 to 60 word figure is a rule of thumb repeated on vendor and agency pages. A short, plain answer near the top is good writing, but no exact word count is required."
  - q: "Does writing in a question-and-answer format help you get cited?"
    a: "No platform documentation we read says it does, and the GEO study did not test it. Use a question-and-answer layout where readers really do arrive with separate questions, and keep any FAQ markup matched to text that is visible on the page."
  - q: "Do I need to write differently for AI Overviews, ChatGPT and Perplexity?"
    a: "Nothing we read says so. Google states there are no special optimisations needed for AI Overviews or AI Mode, and OpenAI's documented requirement is crawler access for OAI-SearchBot. One clear page written for the reader is the sensible default."
  - q: "Can I use AI to write content for AI search?"
    a: "You can, as long as the result is accurate, specific and useful to the reader. Google's people-first guidance asks you to consider who made the content, how and why, so check every fact and add what only you know before you publish."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
No platform documents a special writing style for AI search. What Google and OpenAI publish is short and familiar, the main study tested rewrites under lab conditions, and most of the confident rules online have nothing public behind them. This page sorts the advice into three groups. **Documented** means a platform says it. **Research** means a named study found it, under conditions we state. **Recommended** is our own advice, labelled as ours.

## What AI search systems do with your writing

Google documents that AI Overviews and AI Mode may use a "query fan-out" technique: they run several related searches across subtopics and data sources, then build one response that can link to a wider set of pages than a classic results page. OpenAI says its OAI-SearchBot crawler is used to surface websites in ChatGPT's search features.

The documentation does not say how passages are picked. Our working model, which is a recommendation and not a documented fact, is that one part of your page may be used next to parts of other pages. So each part should make sense on its own, say something specific and be easy to check. The home guide's [principles](/#principles) set out the same idea for the whole site.

## What the platforms document about content

Google's Search Central post of 21 May 2025, by John Mueller, lists what it advises for AI experiences:

- Focus on "unique, non-commodity content" that is useful to visitors.
- Provide a good page experience.
- Make sure Googlebot is not blocked, that pages return a successful HTTP status and that the content is indexable.
- Use preview controls (nosnippet, data-nosnippet, max-snippet, noindex) to decide what appears, "including in our AI formats".
- Make sure "all the content in your markup is also visible on your web page".
- Support the text with high-quality images and videos.

Google's AI features documentation says a page must be indexed and eligible to show in Search with a snippet, that "there are no additional technical requirements", and that no special optimisations are needed for AI Overviews or AI Mode. It adds that there is no special schema.org markup you need to add, and that indexing and serving are not guaranteed. More on markup is in [schema markup for AI](/schema-markup-for-ai/).

Two documented points matter to writers because they can stop good sentences from ever being used:

- **Snippet controls.** Google's robots meta tag documentation says nosnippet also stops the content being used as a direct input for AI Overviews and AI Mode, and max-snippet limits how much of it may be used there. data-nosnippet keeps marked parts of a page out of snippets.
- **Crawler access.** OpenAI says sites that opt out of OAI-SearchBot will not be shown in ChatGPT search answers, though they can still appear as navigational links. The setup is covered in [AI crawlers and robots.txt](/ai-crawlers-robots-txt/).

Google's guidance on helpful, people-first content suggests judging a page by "Who, How, and Why". It says E-E-A-T is not a specific ranking factor and that trust is the most important of its four parts. Two of its self-assessment questions apply at sentence level: does the main heading give "a descriptive, helpful summary of the content", and does the content provide "original information, reporting, research, or analysis"?

## What the research found, and its limits

The main study is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024. The authors tested nine ways of rewriting a source: making it more authoritative, adding statistics, keyword stuffing, citing sources, adding quotations, making it easier to understand, improving fluency, using unique words and adding technical terms.

They built a benchmark called GEO-bench of about 10,000 queries drawn from nine sources. They ran most tests on a simulated engine built on gpt-3.5-turbo, using the top five Google results for each query, and checked a 200-query subset on Perplexity.ai. The abstract reports that GEO "can boost visibility by up to 40%" in generative engine responses. Adding citations, quotations and statistics did best. Keyword stuffing gave little or no improvement.

Read those results with their conditions attached:

- Visibility was measured with the authors' own metrics: a word count weighted by citation position, and impression scores rated by GPT-3.5.
- The sources were supplied to the engine, so the study tests what happens once a page is already among the sources. It does not test whether a page gets found.
- Results varied by domain, and the authors say methods "may need to adapt over time" as engines change.
- The engines tested in 2023 and 2024 are not the products running today.

The fair reading: adding sourced facts and quotations is supported by one study under lab conditions. That supports the sourcing advice below, and it is not a guarantee.

## Write the answer first, then the detail

**Recommended.** Put the plain answer in the first sentence or two of the page, and again at the top of each section. Then give the reasoning, the conditions and the exceptions. If the honest answer is "it depends", name what it depends on straight away.

This serves a reader who skims, and it gives any system that reads one passage a complete answer. Nobody has published evidence that it raises citation rates, so treat it as good writing.

## Make each section stand on its own

**Recommended.** Write every section as if it might be the only part someone reads.

1. Name things in full the first time they appear in a section ("Acme Heating's annual boiler service" rather than "it" or "this option").
2. Make headings say what the section says. "Pricing" tells a reader less than "What a boiler service costs and what it includes". Google's own self-assessment questions ask for descriptive headings.
3. Do not make a section depend on a definition three screens up. Repeat the short version.

If a passage only makes sense after reading everything above it, it is fragile, for a person arriving from a search result and for a system pulling one passage.

## Be specific, and source your claims

**Recommended**, and loosely backed by the research above. Replace vague claims with specific ones a reader can check. Say where a figure came from, date facts that change, and update them when they go stale. If you cannot source a claim, soften it or cut it.

This fits Google's people-first framing, where trust matters most. It also guards against the worst outcome: a confident, out-of-date sentence that gets repeated.

## Match the question people actually ask

**Recommended.** Write headings and opening sentences in your buyers' words, not your internal ones. If customers ask "how much is a boiler service for a flat", a heading called "Service packages" misses them. Look at the questions in your enquiries, reviews and sales calls. To see which of those questions AI assistants already name you for, see [how to measure AI visibility](/how-to-measure-ai-visibility/).

## Tips you will see that have no public evidence

These turn up on vendor and agency pages near the top of search results, written as if they were rules. We found no platform documentation or published study behind any of them:

| Claim | What we found |
|---|---|
| Answers must be 40 to 60 words | No documented or researched length. A rule of thumb. |
| Add an FAQ block to every page | Not a documented requirement. Not tested in the GEO study. |
| Write in "chunks" of a set size | No published source for any ideal length. |
| You need special schema for AI | Google says no special schema.org markup is needed. |

A short answer near the top is good writing. The exact number is what has no evidence behind it. Be wary of anyone who sells these as certainties.

## A paragraph before and after

This is an invented example for a fictional heating firm.

Before:

> Our team has been designed with a wide range of customers in mind, and we believe that keeping your home warm doesn't have to be complicated. Many customers find the experience smooth, and there are various options available depending on what you need.

Nothing there can be lifted or checked. It has no answer, no name and no fact.

After:

> Acme Heating's annual boiler service covers a safety check, a clean of the main parts and a written report. A Gas Safe registered engineer does the work. Prices for gas, oil and LPG boilers are on our prices page, and we update them each April.

What changed: the business and service are named, the answer comes first, each claim can be checked, and the page says when the prices change. We added no keywords, no target length and no markup trick.

## What writing cannot fix

Good prose will not rescue a page that is blocked, not indexed or set to nosnippet. It will not make a commodity page unique, and it cannot guarantee a citation, because nobody can. Check access first, then the writing. The platform detail is in [the Google AI Overviews guide](/how-to-rank-in-google-ai-overviews/). If you are drafting with AI tools, read [whether AI content is good for SEO](/is-ai-content-good-for-seo/).
