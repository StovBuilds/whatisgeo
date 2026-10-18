---
# scriptgrain: generation 1afcae2e-bab5-47f8-acf5-8476788eb63b, voice match 0.86 (2026-10-18), then Claude edit + fact-check (page-pipeline item 731)
title: "Generative engine optimisation strategy: how to plan one, and what to decide first"
seoTitle: "Generative Engine Optimization Strategy: A Plain Plan"
summary: "A GEO strategy is a short set of decisions: which buyer questions matter, which AI platforms your buyers use, what to fix first and how to check progress. Nobody can guarantee inclusion, so plan to iterate."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "If you would rather not rerun your question list by hand, it tracks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions."
  - product: "hilyt"
    why: "If your strategy puts entity information first, it gives you an open, AI-readable profile that sets out your business details in one place."
related: ["how-to-measure-ai-visibility","ai-visibility-audit","how-to-improve-ai-visibility","ai-crawlers-robots-txt","geo-vs-seo"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full text (HTML)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "What is a generative engine optimisation strategy?"
    a: "It is a short set of written decisions: which buyer questions matter, which AI platforms your buyers use, what you will fix first and how you will check progress. It comes before the tasks, and it cannot guarantee inclusion in AI answers because nobody can."
  - q: "What is the best GEO strategy for a small business?"
    a: "No single plan suits every business, but our recommendation is to keep it small: a short list of real buyer questions, a check that crawlers can reach your site, and accurate, consistent business details. Google's own SEO fundamentals include keeping your Business Profile up to date, which matters most for local firms."
  - q: "Is a GEO strategy different from an SEO strategy?"
    a: "They overlap heavily. Google says its AI features have no additional technical requirements beyond being indexed and eligible for a snippet, and that SEO fundamentals still apply. A GEO strategy adds decisions about AI crawler access and a way of checking whether AI answers name and cite you."
  - q: "How long does a GEO strategy take to show results?"
    a: "We cannot give a reliable timeframe, and no platform documentation we have read gives one. Answers vary between runs, so you need repeated checks over time to see a pattern."
  - q: "How often should you review a GEO strategy?"
    a: "Set a regular rhythm you can keep; how often depends on your resources and how quickly you can act on what you find. Each review should be able to change something: the questions, the platforms or where effort goes."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Write the decisions down before you touch a single page: a goal, a fixed set of buyer questions, the platforms you will check, what you will fix first and how you will review it. The rest of this page takes those decisions in order.

Each point is tagged. **Documented** means a platform or standard publishes it. **Research** means a study reported it under its own test conditions. **Recommendation** means it is our advice on sensible practice, with no official backing.

## What a GEO strategy is, and what it is not

A strategy is the set of choices that tells you which tasks to do first. You decide what you want, where you will look for it and how you will know, and only then start editing pages.

It is no list of tricks and no promise of visibility. Many agency pages rank "factors" and attach confident percentages to them without a source you can check. Nobody outside the platforms controls what an AI answer says, and answers can differ each time a question is asked.

One documented anchor makes planning easier. Google says that to be eligible as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet, and that there are no additional technical requirements. It adds that specific optimisation is not required and that existing SEO fundamentals continue to be worthwhile (documented). So a GEO strategy builds on your SEO foundations; [GEO vs SEO](/geo-vs-seo/) sets out what overlaps.

When you are ready for the doing, [how to improve AI visibility](/how-to-improve-ai-visibility/) covers the tactics. This page stays with the deciding.

## Start with the buyer questions, not the platforms

Most people start by asking which platform to be on. Start instead with what your buyers ask: real questions, in their words, at the points where they compare options, check prices or look for someone nearby. Sales calls, support emails and your Search Console queries are good raw material.

Our recommendation: write the list down and keep it fixed between checks, so that results from one round can be compared with the next. Group the questions by intent if it helps, for example choosing a provider, comparing alternatives and solving a specific problem. Keep it short enough that you will actually run it. You will revise it at reviews, because first lists are rarely right.

The list shapes everything below. It tells you which pages need work, which facts about your business must be stated consistently, and where you are missing from answers altogether.

## Decide which AI platforms matter to your buyers

Pick the platforms your buyers use, which may differ from the ones that get the most press. Ask customers how they research, check your analytics for referrals from AI tools, and think about your sector: a software buyer and someone hiring a local plumber may behave quite differently. If you are unsure, run your question list across the main assistants and let the results guide you (recommendation).

For Google's AI features there is no separate report to plan around. Google says sites appearing in AI Overviews and AI Mode are included in the overall search traffic in Search Console, reported in the Performance report within the "Web" search type (documented).

Name a primary few platforms in your plan and go deep on those, then revisit the choice at each review.

## Make sure you can be reached: access and indexing

If a system cannot fetch your pages, little else matters, so settle access early. Vendors run separate crawlers for separate jobs, and each publishes its own list (documented):

| Vendor | Search or indexing | Training | User-requested fetches |
|---|---|---|---|
| OpenAI | OAI-SearchBot | GPTBot | ChatGPT-User |
| Perplexity | PerplexityBot | None listed; Perplexity says PerplexityBot is not used for foundation model training | Perplexity-User |
| Anthropic | Claude-SearchBot | ClaudeBot | Claude-User |

The details matter for strategy. OpenAI says sites opted out of OAI-SearchBot will not be shown in ChatGPT search answers, though they can still appear as navigational links, and that each of its settings is independent, so you can allow OAI-SearchBot while disallowing GPTBot. It also says robots.txt rules may not apply to ChatGPT-User, because those visits are started by a user. Perplexity says Perplexity-User generally ignores robots.txt for the same reason. Anthropic says its bots honour robots.txt and that disabling Claude-SearchBot or Claude-User may reduce your visibility in its search results. Check each vendor's page before you act, because names and descriptions change.

The decision is which of these you allow, made on purpose. Blocking a training crawler and blocking a search crawler have different consequences. [AI crawlers and robots.txt](/ai-crawlers-robots-txt/) walks through the rules.

Remember what robots.txt can and cannot do. RFC 9309, the standard behind it, describes rules that crawlers "are requested to honor" and says they "are not a form of access authorization" (documented). Treat the file as a statement of your wishes and never as a security control.

On the Google side, Google lists checking that crawling is allowed in robots.txt and by any CDN or hosting infrastructure among its SEO fundamentals (documented). A firewall rule can shut a crawler out as surely as robots.txt can.

## Choose where to put effort: content, entity and third-party mentions

You cannot do everything at once, so split effort across three places and decide the order:

- **Your own content:** the pages you control, starting with those that answer your highest-value buyer questions.
- **Your entity information:** the facts about who you are, what you do and where, stated the same way on your site, your profiles and your structured data. Google's list of SEO fundamentals includes keeping Business Profile and Merchant Center information up to date and making sure structured data matches the visible text on the page (documented).
- **Third-party mentions:** what other sites, directories and reviews say about you. The platforms do not document how much this affects their answers, so treat it as a recommendation.

**Research.** Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024), tested content changes on GEO-bench, a benchmark of 10,000 queries, using a generative engine they built from the top five Google results plus a language model, and also ran tests on Perplexity.ai. Adding citations, quotations and statistics performed best on their visibility measures, with the abstract reporting gains of up to 40%, while keyword stuffing did poorly, and the effect varied across domains. These are the paper's own metrics in a test setup. Read the study as a sign that clear, well-sourced content helped in that setting; it does not forecast results for your site.

## A strategy by business type and budget

Different businesses should lean different ways. This is our recommendation, with no statistics behind it.

| Business type | Lean towards | Why |
|---|---|---|
| Local or service firm | Accurate entity information and reviews | Your name, services, area and contact details need to read the same everywhere |
| Publisher | Crawler access and distinctive content | Your access choices decide who can use your pages, and original material is harder to replace |
| SaaS or software | Comparison and documentation pages | Buyers ask comparison and how-to questions, and clear docs give answers something solid to cite |

Budget sets the depth while the order stays the same. With little time: write the question list, check access and indexing, and fix one or two key pages. With more resource: widen the question set, cover more platforms and work on third-party presence.

## How to measure and review the strategy

Decide the method before you start, so you are not inventing it afterwards to fit the results. Our recommendation: run the fixed question list on each chosen platform on a set schedule, record whether you are named, whether you are cited and what is said about you, and compare patterns across runs. Because answers vary, one result tells you little.

Pair that with what you already have, including Search Console's Web search data and AI referrals in your analytics. [How to measure AI visibility](/how-to-measure-ai-visibility/) gives a full method, and an [AI visibility audit](/ai-visibility-audit/) gives you a baseline to measure from.

Set a review rhythm you can keep. The point of a review is to change the plan when the evidence says so: drop a platform, add a question, or move effort to a different page. If reviews never change anything, they are not doing their job.

## What to leave out of a GEO strategy

- **Guarantees.** No platform document we have read promises inclusion in an AI answer, so do not promise it to yourself, your boss or a client.
- **Unsourced numbers.** If a "factor" comes with a precise percentage and no study you can read, skip it. The same goes for any timeframe nobody can back.
- **Single screenshots.** One answer naming your brand is pleasant to see and proves little.
- **Every tactic.** A strategy that lists every task becomes a checklist, and a checklist cannot tell you what to do first.

## A one-page strategy template

If it does not fit on one page, it is too long. Write down:

1. **Goal.** What you want from AI answers, in one sentence.
2. **Question set.** Your fixed list of buyer questions, grouped by intent.
3. **Platforms.** The few you will check, and why your buyers use them.
4. **Access.** Which crawlers you allow, and confirmation that key pages are indexed and reachable.
5. **Effort.** The pages, entity facts and third-party sources you will work on first.
6. **Measurement.** How and how often you will run the questions, and what you will record.
7. **Review rhythm.** When you will review, and what changes you are prepared to make.

If you are starting from nothing, the 30-day plan in [getting started](/#getting-started) turns this template into a first month of work.
