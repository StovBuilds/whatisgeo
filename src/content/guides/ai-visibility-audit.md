---
# scriptgrain: generation 1ef4aa47-083c-4b79-88ce-db5eceb12b2a, voice match 0.85 (2026-10-18), then Claude edit + fact-check (page-pipeline item 715)
title: "AI visibility audit: what to check, step by step, and how to run one yourself"
seoTitle: "AI Visibility Audit: A Step-by-Step Checklist"
summary: "A free AI visibility audit: check crawler access, put real buyer questions to AI tools, map which sources the answers cite, and fix the errors you find. No tool can guarantee you a place in an answer."
category: "measure"
ours:
  - product: "visibilitytoai"
    why: "If you would rather not rerun the prompt set by hand, it tracks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions."
  - product: "hilyt"
    why: "If Step 5 turns up wrong facts about your business, it gives you an open, AI-readable profile that sets out your details in one place."
related: ["what-is-ai-visibility","how-to-rank-in-chatgpt","how-to-rank-in-google-ai-overviews"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Bing Webmaster Guidelines"
    url: "https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full text (HTML)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "What is an AI visibility audit?"
    a: "It is a one-off check of whether AI crawlers and search indexes can reach your site, what AI answers say about you for real buyer questions, and which sources those answers cite. It is a snapshot taken on particular dates, done by hand or with a tool."
  - q: "How do I run an AI visibility audit for free?"
    a: "Check robots.txt, firewall rules and indexing, then write prompts from real buyer questions and put each one to the AI tools you care about more than once. In a spreadsheet, record whether you were named, where, the tone, the cited URLs and any errors, plus the date, platform, login state, location and mode."
  - q: "What is the difference between an AI SEO audit, a GEO audit and an AI visibility audit?"
    a: "Mostly the label. All three check access, answers and sources for AI-generated responses. \"GEO\" comes from generative engine optimisation, the term Aggarwal et al. introduced in their KDD 2024 paper."
  - q: "How many prompts should I test, and how often should I repeat them?"
    a: "No platform or study we read gives a number for a business audit, so we do not give one. Take prompts from real buyer questions across category, comparison and brand intent, run each more than once, and repeat the audit after significant changes such as a migration or a robots.txt edit."
  - q: "Can an audit guarantee my site will be mentioned by ChatGPT?"
    a: "No. None of the platform documents we read promises inclusion or a timeframe. An audit shows a snapshot and finds fixable problems, such as blocking OAI-SearchBot, which OpenAI says keeps a site out of ChatGPT search answers."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
There are five steps. Check that AI crawlers and search indexes can reach your pages, write a set of real buyer questions, put them to each AI tool several times, then map the sources the answers cite and check every fact stated about you. "AI SEO audit" and "GEO audit" are other names for the same job, and the checks stay the same whatever you call it.

Each point below is tagged. **Documented** means a platform or standard publishes it. **Research** means a study reported it under its own test conditions. **Recommendation** means it is our advice on sensible practice, with no official backing. For background on the term itself, see [what AI visibility is](/what-is-ai-visibility/).

## What an AI visibility audit is, and what it is not

An audit is a snapshot: a structured look, on particular dates, at whether AI systems can read your site and what they say when buyers ask about your field. What you get is evidence: where you appear, where you do not, what is said about you, and which pages the answers lean on.

It is no score and no promise. None of the platform documents listed on this page promises inclusion in an AI answer or gives a timeframe, so an audit that implies it can get you into ChatGPT is overselling. Some vendors publish audit scores and averages of their own. Those numbers belong to the vendor and depend on the vendor's own method, so we do not repeat them here.

## How it differs from a classic SEO audit and from ongoing measurement

A classic SEO audit asks whether your pages can rank in a list of links. This audit asks whether you get named, cited and described correctly inside a written answer. Much of the groundwork overlaps.

For Google, the overlap is close to total. Google says that to be eligible as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to show in Google Search with a snippet, and that there are no additional technical requirements (documented). Bing says its Bing and Copilot search experiences rely on the same crawling, indexing and ranking foundation as traditional search (documented). So an indexing problem found in an SEO audit is an AI visibility problem too.

Measurement is the other neighbour. An audit runs once, with a start and an end. Tracking the same questions on a schedule is a separate job, covered in the [measurement section](/#measurement) of our main guide.

## Step 1: Check access (robots.txt, blocking, rendering, indexing)

Start here, because the later steps depend on it. Open `yourdomain.com/robots.txt` and read it line by line, looking for blanket `Disallow` rules and for rules aimed at AI user agents that someone added and forgot about.

The agents do different jobs and are controlled separately (documented, from each vendor's crawler page):

| Platform | Agent | What the vendor says it does | robots.txt note |
|---|---|---|---|
| Google | Googlebot | Crawls for Search, including AI Overviews and AI Mode | Google says Googlebot rules are the control for Search |
| OpenAI | OAI-SearchBot | Surfaces sites in ChatGPT search results | Opted-out sites are not shown in ChatGPT search answers, though they can still appear as navigational links; OpenAI says changes can take about 24 hours to take effect |
| OpenAI | GPTBot | Crawls content that may be used to train models | Disallowing it signals content should not be used for training |
| OpenAI | ChatGPT-User | Visits pages for certain user actions | Robots.txt rules may not apply, because a user started the action |
| Perplexity | PerplexityBot | Surfaces and links sites in Perplexity search results | Perplexity recommends allowing it if you want to appear in its results |
| Perplexity | Perplexity-User | Fetches pages when a user asks a question | Generally ignores robots.txt, because a user requested the fetch |
| Anthropic | ClaudeBot | Collects content that could contribute to training | Anthropic says its bots honour robots.txt |
| Anthropic | Claude-User | Fetches pages when people ask Claude questions | Blocking it may reduce visibility for user-directed web search |
| Anthropic | Claude-SearchBot | Indexes content to improve search results | Blocking it may reduce visibility in search results |

For each row, write down allowed or blocked, and whether that was a deliberate decision (recommendation). Blocking a training crawler and blocking a search crawler are different choices with different effects.

Keep in mind what robots.txt is. RFC 9309, the standard, says its rules "are not a form of access authorization" and that the protocol is no substitute for real security measures (documented). It asks crawlers to stay out; it cannot stop anything.

Then check four more things:

1. **Firewalls and CDNs.** Google's AI features page lists making sure crawling is allowed "by any CDN or hosting infrastructure" as well as in robots.txt, and Perplexity's crawler page explains how to allow its bots through a web application firewall (documented). Look at your bot-protection settings as well as robots.txt.
2. **Rendering.** Bing advises against hiding critical content behind client-side rendering and says content that cannot be reliably rendered may not be indexed or selected for grounding; Google advises making important content available in textual form (documented). Fetch the raw HTML of your key pages and check the main text is there.
3. **Indexing.** Confirm your important pages are indexed in Google Search Console and Bing Webmaster Tools (recommendation, building on the documented indexing requirement above).
4. **Meta directives.** Google says `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex` limit what is shown from your pages in Search. Bing says `NOARCHIVE` stops content being used in Copilot responses and `NOCACHE` limits Copilot to the URL, title and snippet (documented). Make sure any of these on your key pages are there on purpose.

More on crawler rules is in the [crawler access section](/#crawler-access).

## Step 2: Build a buyer prompt set

Build the questions from what real buyers say (recommendation): sales calls, support emails, enquiry forms, review sites and the searches that already bring people to you. Prompts made up in a meeting mostly test your own assumptions about what your market asks.

Group them by intent:

- **Category questions**, where the buyer has not named anyone yet ("who does X near Y", "how do I choose a Z").
- **Comparison questions**, where they are weighing options.
- **Brand questions**, where they name you directly ("is [your business] any good").

Include all three. Showing up when someone types your name says little about whether you show up when a stranger asks a general question. Write each prompt the way a person would type it, and freeze the wording so later runs can be compared.

## Step 3: Run the prompts and record what comes back

Put every prompt to every platform you care about, and run each one more than once (recommendation). Answers vary, so one run proves little. Google's own documentation says AI Overviews and AI Mode may use different models and techniques, so the responses and links they show will vary, and that AI Overviews often do not appear at all (documented). The GEO researchers averaged their experiments over five random seeds to reduce variance (research). That was their lab setup and sets no target for you; it does show why repeat runs matter.

Log the conditions for every run (recommendation): date, platform, logged in or not, location, and the model or mode used. Answers can differ with these, and without the log you cannot tell a real change from a different setup.

For each answer, record in a spreadsheet (recommendation):

| Column | What to write |
|---|---|
| Named | Yes or no |
| Position | Where in the answer you appear, and who is named before you |
| Sentiment | Positive, neutral, negative or mixed, with the words used |
| Cited URLs | Every link given, yours or anyone else's |
| Errors | Any wrong fact about you, quoted exactly |

Paste in the full answer as well. Summaries written from memory drift.

## Step 4: Map the sources the answers cite

Sort the cited URLs by domain. Which keep turning up: your own pages, competitors, review sites, forums, directories, news outlets?

This layer often shows the most (recommendation). If answers in your category keep citing three comparison pages and you are on none of them, you have found something no on-site check would show. If they cite your page for one topic and a competitor's for another, that is a content gap.

Tag each source as yours, a third-party page that mentions you, or a page with no link to you at all. Do not over-read one citation: a URL that appears once is an anecdote, while one that appears across runs and platforms is a pattern.

If Google matters to you, look at Search Console as well. Google says traffic from AI Overviews and AI Mode is included in the overall search traffic in the Performance report, under the "Web" search type (documented).

## Step 5: Check how AI describes your business (accuracy and entity facts)

Read every description against the facts. Is your name right? What you sell, where you work, who you serve, your prices if mentioned, whether you are still trading?

Mark each mismatch, then trace it (recommendation). Errors often come from an old page, a stale directory listing or an outdated article, so check the sources from Step 4. A wrong fact and the page feeding it are often the same finding. Google's AI features page also advises keeping your Merchant Center and Business Profile information up to date (documented).

Record vague answers as vague rather than wrong. The difference matters when you prioritise.

## How to read the results without fooling yourself

**Treat variation as normal.** A mention in one run and none in the next is no contradiction; it is the thing you are measuring. Report how often you were named across runs.

**Distrust single numbers.** A score hides the spread you worked to capture. If you see a vendor's score or benchmark quoted, it is that vendor's figure and only comparable with other figures from the same tool.

**Keep the research in proportion.** Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024), tested content changes such as citing sources, adding quotations and adding statistics on a 10,000-query benchmark called GEO-bench. Their generative engine was a language model answering from the top five Google results, scored with the paper's own visibility metrics. They report gains of up to 40% on those metrics, found results varied by domain, and also ran tests on Perplexity (research). That is a useful source of ideas for fixes. It does not show what will happen to your site on a live platform today.

## Turning findings into a prioritised fix list

Rank problems by how much they block and how hard they are to fix (recommendation):

1. **Access problems.** A blocked search crawler, a firewall rule or an unindexed key page stops everything downstream. Fix these first.
2. **Factual errors.** Wrong claims about your business do active harm, and the page feeding them is often one you or a directory can correct.
3. **Source gaps.** Absence from the third-party pages that answers keep citing. These take longer, because they sit outside your site.
4. **Content gaps.** Buyer questions where you are not mentioned and have no page that answers them.

Give each line an owner and a rough effort. Fixes make you easier to find and describe correctly; they do not guarantee a mention or a date. For platform-specific detail, see [how to rank in ChatGPT](/how-to-rank-in-chatgpt/) and [how to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/).

## Doing it yourself, with tools, or hiring someone

Doing it by hand costs time and teaches you the most: reading many answers about your own business shows things a dashboard summary hides.

Tools save effort when you have many prompts or several platforms, because they automate the running and logging. Judge them on whether they show you the raw answers and cited URLs as well as any summary number. Hiring someone makes sense when you lack time or want an outside view; apply the same test and ask to see the underlying answers. Whichever route you take, the method above is the same. The [how AI answers happen](/#how-it-works) section shows where each step fits.

## When to repeat the audit

Repeat it after meaningful changes (recommendation): a site migration, a robots.txt or firewall change, a rebrand, a big content push, or a fix to the errors you found. Those are the moments the snapshot goes out of date.

If you want a regular rhythm with the same prompts, you have moved from auditing into tracking. The [measurement section](/#measurement) covers that.
