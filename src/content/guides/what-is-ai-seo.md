---
# scriptgrain: generation dfda3467-a1ce-4d44-9108-1104da8d1bb6, voice match 0.79 (2026-10-18), then Claude edit + fact-check (page-pipeline item 696)
title: "What is AI SEO, and what is it called?"
seoTitle: "What is AI SEO? Meaning, names and what to do"
summary: "\"AI SEO\" means two things: optimising a site to be found and cited in AI answers, and using AI tools to do SEO work. The first is also called GEO, AEO or AI search optimisation, and no name is an official standard."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "If you want to check whether ChatGPT, Claude, Gemini and Perplexity actually name and cite your business for buyers' questions, this measures it."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "OpenAI: overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Search Engine Land: What is AI SEO?"
    url: "https://searchengineland.com/guide/what-is-ai-seo"
  - label: "Search Engine Land: SEO, GEO, or ASO? What to call the new era of brand visibility in AI"
    url: "https://searchengineland.com/seo-geo-aso-new-era-brand-visibility-ai-research-464936"
faq:
  - q: "What is AI SEO called now?"
    a: "Several names are in use for the visibility meaning, including GEO, AEO, LLMO, AISO and ASO, and publishers define them in overlapping ways. None is an official standard, and Google's own documentation simply talks about SEO for its AI features."
  - q: "Is AI SEO the same as GEO?"
    a: "It depends who is writing. Search Engine Land's guide treats AI SEO as the broader practice with GEO inside it, while other writers use the two as synonyms. GEO as a term comes from a 2023 research paper, published at KDD 2024."
  - q: "Do I need a separate strategy for AI search, or is normal SEO enough?"
    a: "For Google, its documentation says specific optimisation is not required for AI Overviews and AI Mode, and the same SEO fundamentals apply. For other AI products, the documented extra step is making sure their search crawlers are allowed in robots.txt. Answer-first writing and testing with real questions are sensible practice, not requirements."
  - q: "Can ChatGPT do SEO for me?"
    a: "It can help with tasks such as outlining, drafting and summarising, but it does not check its own facts or take responsibility for what you publish. You still need to review the work and make sure the page genuinely helps the reader."
  - q: "Can anyone guarantee my site will be cited in AI answers?"
    a: "No. Google, OpenAI, Anthropic and Perplexity describe eligibility and controls, and none of them promises inclusion. Treat anyone offering a guarantee with caution."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
When someone says "AI SEO", first find out which job they mean, because the advice for each is different. For the visibility job, Google's own documentation says its AI features need no special optimisation beyond normal SEO. The other AI companies document crawlers you can allow or block.

## The two meanings of AI SEO

The first meaning is about **visibility**. People ask ChatGPT, Perplexity, Claude, Gemini or Google's AI Overviews a question and get a written answer, often with links to sources. The aim is for your pages to be among the sources those answers draw on and cite, and for your business to be described accurately.

The second meaning is about **workflow**. You use AI tools to help with SEO tasks: outlining, drafting, summarising research, grouping keywords. Here AI is the assistant, and the target can still be ordinary search results.

The two overlap, because you can use AI tools while optimising for AI answers. They are still separate questions, and most confusion in articles and sales pitches comes from treating them as one. The rest of this page is mostly about the first meaning, with a section on the second near the end.

## What SEO for AI search is called

Several labels are in circulation. Publishers use them in overlapping and sometimes contradictory ways:

| Name | Where it comes from or how it is used |
|---|---|
| GEO (generative engine optimisation) | Coined in a research paper by Aggarwal et al., first posted in 2023 and accepted to KDD 2024 |
| AEO (answer engine optimisation) | Older term for featured snippets and voice answers, now stretched to cover AI answers |
| LLMO (large language model optimisation) | Used by some writers for influencing what models know, as opposed to what they retrieve |
| AI search optimisation (also AISO, ASO) | Plain descriptive labels with no single owner |
| AI SEO | Either the umbrella for all of the above, or the workflow meaning |

Two examples show how much the definitions vary. Search Engine Land's guide "What is AI SEO?" treats AI SEO as the broader discipline, with GEO, AEO and LLMO as parts of it. A separate Search Engine Land research piece, "SEO, GEO, or ASO?", surveyed marketers on which terms they recognise and use, and found no settled answer. Those are one publication's framings, not industry rules.

Our reading is that no standards body defines any of these terms. The platforms we checked do not use any of them in their own documentation either: Google's guidance for its AI features simply talks about SEO. The same advice gets filed under every label. For the longer explanation of the term this site uses, see [what GEO is](/#what-is-geo), and for how it compares with the classic discipline, [GEO vs SEO](/#geo-vs-seo).

## What platforms actually document

This is the most solid ground, because it is written down by the companies running the systems.

### Google AI Overviews and AI Mode

Google Search Central's page on AI features says:

- **No special optimisation is required.** It says specific optimisation is not required for AI Overviews and AI Mode, and that the same foundational SEO best practices apply as for Google Search overall.
- **Eligibility.** To be shown as a supporting link, a page must be indexed and eligible to appear in Google Search with a snippet. It states there are no additional technical requirements.
- **Controls.** Robots.txt rules for Googlebot control crawling for Search, including its AI features. To limit what is shown from your pages, use `nosnippet`, `data-nosnippet`, `max-snippet` or `noindex`. Google-Extended is the separate control for limiting AI training and grounding in some of Google's other systems.
- **Measurement.** Traffic from AI features is included in Search Console's Performance report, under the "Web" search type. It is not broken out separately there.

### OpenAI, Anthropic and Perplexity

Each company documents separate user agents for different jobs:

| Company | Search crawler | Training crawler | User-triggered fetches |
|---|---|---|---|
| OpenAI | OAI-SearchBot: sites opted out will not be shown in ChatGPT search answers | GPTBot | ChatGPT-User: robots.txt rules may not apply |
| Anthropic | Claude-SearchBot | ClaudeBot | Claude-User: blocking it may reduce visibility for user-directed search |
| Perplexity | PerplexityBot: not used for training foundation models | None documented | Perplexity-User: generally ignores robots.txt |

OpenAI says its settings are independent, so you can allow search while blocking training. Anthropic says its bots honour robots.txt. The practical point is that crawler access is a documented lever you can check and set. Much of what gets sold as AI SEO has no documentation behind it. More in [crawler access](/#crawler-access).

None of these pages promises that following them gets you into an answer. They describe eligibility and controls, not outcomes.

## What the research says, and its limits

The paper by Aggarwal et al. introduced the term GEO and a benchmark called GEO-bench: a set of user queries across several domains, with web sources for answering them. The authors tested ways of changing page content and measured how visible each source was in generative engine responses. In their abstract they report that their methods boosted visibility by up to 40% on that benchmark, and that how well a method worked varied by domain.

Read it as a study with conditions. Those results come from the authors' benchmark and their own visibility measures. They do not show that any one tactic works on today's ChatGPT, Google or Perplexity, for your queries or your site. The paper itself stresses that results differ across domains. Treat it as a source of ideas to test.

## What stays the same as classic SEO

For Google, the documentation answers this directly: the same fundamentals apply. Its list includes allowing crawling in robots.txt and in any CDN or hosting setup, internal links, good page experience, important content available as text, structured data that matches the visible text, and up-to-date Business Profile and Merchant Center information.

Beyond Google, the rest of this section is our recommendation, not a platform requirement. A page that is crawlable, clear, accurate and useful to the person asking is well placed for any system that retrieves web pages. A new interface on top does not change what a good source looks like.

## What is different in practice

These are sensible practices, labelled as such. No platform requires them.

- **Check robots.txt deliberately.** The AI companies now separate search, training and user-triggered agents, so an old blanket rule may be blocking search crawlers you would want, or allowing training you would not. Decide each one on purpose.
- **Write answer-first.** State the answer near the top of the page, then support it. Readers find it clearer, and a self-contained answer is easier for any system to quote accurately.
- **Think in full questions.** Plan pages around the sentences a buyer would actually type or say to an assistant, as well as short keywords.

The home guide's [principles](/#principles) cover these in more depth.

## Using AI tools to do SEO work

This is the second meaning. AI tools can help draft, restructure, summarise and organise material you would otherwise do by hand. They do not check their own facts or take responsibility for what you publish. You still need to verify claims, keep the writing sounding like you and make sure each page helps a real reader. Speed makes it easy to publish many weak pages quickly, which serves nobody.

## How to tell whether it is working

For Google, Search Console counts traffic from AI features within the Web search type, without a separate breakdown. For other assistants, the most direct check is sensible practice rather than a documented method. Put the real questions your buyers ask to the assistants they use, and note whether you are mentioned, whether you are cited and whether the description is accurate. Repeat this over time, because answers vary from one run to the next. Keep a dated log rather than a single screenshot. See [measurement](/#measurement) for the wider picture.
