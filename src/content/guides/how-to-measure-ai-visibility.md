---
# scriptgrain: generation c47cc368-93ee-452f-a569-df259849d4ff, voice match 0.79 (2026-10-18), then Claude edit + fact-check (page-pipeline item 705)
title: "How do you measure AI visibility? A method you can run and trust"
seoTitle: "How to Measure AI Visibility: A Method That Holds Up"
summary: "Ask each assistant the same set of real buyer questions, repeat every run, and score whether you are named, cited and described correctly. Then cross-check with referral traffic, server logs and platform reports."
category: "measure"
ours:
  - product: "visibilitytoai"
    why: "Once you know what you want to track, it runs buyer questions across ChatGPT, Claude, Gemini and Perplexity and records whether your company is named and cited, so you don't have to rerun them by hand."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Bing Webmaster Tools help: AI Performance"
    url: "https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c"
  - label: "Bing Webmaster Blog: Introducing AI Performance in Bing Webmaster Tools Public Preview (February 2026)"
    url: "https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "OpenAI Help Center: Searching the web with ChatGPT"
    url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
  - label: "Search Engine Roundtable: OpenAI drops UTM parameters from ChatGPT results (14 October 2026, updated)"
    url: "https://www.seroundtable.com/utm-parameters-missing-chatgpt-42299.html"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic (Claude Help Center): Does Anthropic crawl data from the web?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, KDD 2024 (arXiv)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "How do I check if ChatGPT mentions my business?"
    a: "Ask it the questions your buyers ask, mostly without naming your business, in a fresh or temporary chat. Run each question more than once and record whether you are named, cited and described correctly. A rate across runs tells you far more than one answer."
  - q: "How many times should I run each prompt to trust the result?"
    a: "No platform documents a number. Our suggestion is at least three runs per prompt on each assistant to start, with more where the answers change a lot. If the same brands appear every time you can be more confident; if they move around, report a rate and say so."
  - q: "Can I see AI Overviews traffic in Google Search Console?"
    a: "Yes, as part of the total. Google says sites that appear in AI Overviews and AI Mode are counted in the overall search traffic in the Performance report, under the Web search type. Its AI features page does not describe a separate AI-only view in that report."
  - q: "How do I find ChatGPT or Perplexity referral traffic in analytics?"
    a: "Check your referral sources for the assistants' domains and, for ChatGPT, campaign data tagged utm_source=chatgpt.com. That tag went missing for a few days in October 2026 before it was reported fixed, so read tagged traffic as a minimum figure."
  - q: "Is there a single AI visibility score I can rely on?"
    a: "No. Answers vary between runs and between features, and Bing says its own AI Performance report does not measure rankings. Track mention, citation and accuracy rates over repeated runs, and look at how they change over time."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
No single check tells you where you stand, because the same question can get a different answer on the next run. So this method rests on repeated samples, scored the same way every time and checked against data you already own. You can do all of it by hand with a spreadsheet. The five steps below take you from a blank sheet to a baseline you can compare month to month.

Throughout, we label three kinds of claim: what a platform documents, what research has found under its own conditions, and what is our recommendation. The recommendations are sensible practice. None of them is proof.

## What you can and cannot measure

You can measure:

- whether your business is **named** in an answer to a given question, on a given day, under given conditions
- whether the answer **cites** a page on your site
- whether what it says about you is **accurate**
- tagged and referred visits from assistants in your analytics
- crawler and user-triggered visits from AI companies in your server logs
- the figures Google and Bing report to site owners

You cannot measure a stable position. Google says AI Mode and AI Overviews "may use different models and techniques, so the set of responses and links they show will vary", and that AI Overviews often don't appear at all. Bing says its own AI Performance report "does not measure rankings, authority, performance, or importance". Treat every figure as a sample from a system that keeps moving. For how these answers get put together in the first place, see [how AI answers happen](/#how-it-works).

## Step 1: Build a fixed prompt set from real buyer questions

Start with questions your customers actually ask. Pull them from sales calls, support emails, contact form messages, reviews and the search terms you already see. Write them the way a buyer would type them, messy phrasing included. A prompt that reads like a marketing brief won't behave like a real question.

**Our recommendation:** aim for 15 to 30 prompts. That is a suggestion, not a research finding. It is enough to cover your main services and buying stages, and few enough that a small team will actually finish each round. The [30-day plan](/#getting-started) on our home guide starts with 3 to 5 prompts, which is a good first look. Widen the set once the routine sticks.

Mix three types:

- **Unbranded:** "Who does emergency boiler repair in Leeds?" These matter most, because they show whether you appear when nobody asks for you.
- **Comparison:** "What should I look for when choosing an accountant for a small charity?"
- **Branded:** "What does [your business] do?" These are your accuracy checks.

Then freeze the list and give it a version number. If you change a prompt's wording, you have started a new test, and its results won't compare with the old ones.

## Step 2: Fix the conditions and run each prompt more than once

Conditions change answers, so record them. **Our recommendation** is to log, for every run:

- the date
- the assistant, plus the mode or model if the app shows one
- your location (or the location you set)
- whether you were logged in

Where you can, run each prompt in a fresh or temporary chat so that earlier questions don't shape later answers. Stick with the same assistants every round. Choose the ones your buyers plausibly use, and don't add a new one halfway through and compare it as though nothing changed.

Then repeat. **Our suggestion** is at least three runs per prompt on each assistant to begin with, and more where answers swing about. There is no documented right number. For comparison, the researchers behind the GEO paper (below) ran their experiments on five different random seeds and averaged the results "to reduce variance". That was a lab setup with its own goals, so it is no target for you. It does show that people who study these systems don't trust a single run either.

## Step 3: Score each answer: named, cited, described correctly

For every answer, record yes or no for three questions:

1. **Named.** Does the answer mention your business by name?
2. **Cited.** Does it link to a page on your site? If so, note which page.
3. **Described correctly.** Is everything it says about you accurate?

Also note which competitors were named. That shows you who the assistant treats as the alternatives.

Keep the scoring blunt. A ten-point scale invites you to argue with yourself, and you will score the same answer differently on another day. Track naming and citing separately: you can be named with no link, or linked while the text barely mentions you.

Accuracy is the check people skip. OpenAI's own help page warns that ChatGPT search results and citations "can be incomplete, outdated, or incorrect". Being named with the wrong address, an old price or a service you no longer offer can do more harm than being left out. Copy the wrong statement word for word, so you can find and fix whatever it came from.

**What the research says.** Aggarwal et al. (GEO, KDD 2024) proposed two visibility measures for generative engines. *Position-adjusted word count* counts the words in sentences that cite a source, weighted down the later the citation appears. *Subjective impression* has an LLM (GPT-3.5, using the G-Eval method) score seven aspects, such as how relevant the cited material is and how likely a user is to click it. The authors tested these on their own benchmark, GEO-bench (10,000 queries), with an engine they built that answered from the top five Google results, and ran a further check on Perplexity. These are research measures under the authors' conditions. No assistant reports them to you. The yes/no scoring above is a simpler version of the same idea that a small business can run.

## Step 4: Add the data you already own: referrals, server logs and platform reports

Your own data is the cross-check. It doesn't depend on which prompts you wrote.

### What the platforms document

**Google Search Console.** Google says sites appearing in AI Overviews and AI Mode are "included in the overall search traffic in Search Console", reported in the Performance report "within the 'Web' search type". Its AI features page describes no separate AI-only view in that report, so treat these as part of your overall search totals. Google also says there are "no additional technical requirements" for appearing in AI features: a page must be indexed and eligible to show in Search with a snippet. Your normal indexing checks still count here.

**Bing Webmaster Tools.** Bing's AI Performance report, released as a public preview in February 2026, shows citation activity across Microsoft Copilot, AI-generated summaries in Bing and "select partner AI integrations". It reports total citations, average cited pages per day, page-level citation counts and grounding queries (the phrases the AI used when it retrieved content it then cited). Bing says the grounding query data "represents a sample of overall citation activity".

**ChatGPT referrals.** ChatGPT links have carried a `utm_source=chatgpt.com` tag, so look for it in your campaign and referral reports. OpenAI's publisher FAQ was not available at its published address when we checked, so we are relying on industry reporting here. In October 2026 the tag and the referrer went missing from ChatGPT links for a few days, and those visits showed up as direct traffic. The Adobe analyst who spotted it later said it was a bug and that tagging had resumed (reported by Search Engine Roundtable).

**Server logs.** The AI companies publish what each of their user agents does:

| Company | User agent | Documented role |
|---|---|---|
| OpenAI | OAI-SearchBot | Surfaces sites in ChatGPT's search features |
| OpenAI | GPTBot | Crawls content that may be used to train models |
| OpenAI | ChatGPT-User | Visits a page when a user's question needs it; not an automatic crawler |
| Perplexity | PerplexityBot | Surfaces and links sites in Perplexity search results |
| Perplexity | Perplexity-User | Fetches a page when a user asks a question |
| Anthropic | ClaudeBot | Collects content that could contribute to model training |
| Anthropic | Claude-SearchBot | Indexes content to improve search results |
| Anthropic | Claude-User | Fetches pages when people ask Claude questions |

OpenAI, Perplexity and Anthropic each publish the IP addresses their bots use. Check against those lists before you trust a user-agent string, because anyone can copy one. If these bots can't reach your pages at all, fix that first: see [crawler access](/#crawler-access).

### What to treat with caution

- **A crawl is not a citation.** A search or training crawler fetching a page doesn't mean the page was used in any answer. The user-triggered agents (ChatGPT-User, Perplexity-User, Claude-User) are a closer signal, since they fetch because someone asked a question. Even so, a fetch doesn't prove you were cited.
- **Tagged traffic is a minimum.** Visits can arrive with no tag and no referrer, as the October 2026 episode showed, and those get filed as direct.
- **Trends don't explain themselves.** Bing says changes in its citation trends "are observational" and "cannot be attributed to a specific cause or event". The same caution applies to your own numbers.
- **Rising together isn't cause.** If referrals and your mention rate rise in the same month, that is worth noting. It doesn't prove one caused the other.

## Step 5: Record, compare over time and read the changes honestly

Keep one sheet with one row per run:

| Column | Example entry |
|---|---|
| Prompt set version | v1 |
| Date | the day you ran it |
| Assistant and mode | ChatGPT, search on |
| Location / logged in | Manchester / logged out |
| Prompt | the exact wording |
| Named / Cited / Accurate | Y / N / Y |
| Page cited, competitors named, errors | free text |

Summarise each prompt and assistant as a rate: named in *x* of *y* runs, cited in *x* of *y*, accurate in *x* of *y*. **Our recommendation** is to report rates or ranges and never a single result, and to run a round at a steady interval, monthly for most small businesses.

Only compare like with like: the same prompt set version, the same assistants, the same conditions. If any of those change, note it in the sheet and don't draw a trend line across the break. Small moves between rounds are often noise. Before you call something a trend, look for a change that holds across several rounds and several prompts, and that your referral and log data agree with. More on reading progress is in [measuring progress](/#measurement).

## Doing it by hand or with a tool

Everything above works by hand: a frozen list of prompts, a spreadsheet and a couple of hours each round. Nothing here needs a paid tool.

A tool can save time by running prompts on a schedule, across more assistants and locations, and logging the results. That is most useful once you know what you are measuring. Run at least one round by hand first. You'll learn what answers in your sector look like, which prompts matter and what counts as accurate. Then you can judge whether a tool's numbers mean anything, and ask how it handles the run-to-run variation described above.

## What a good result looks like (and what no measurement can promise)

A good result is modest and steady. You are named in a fair share of unbranded answers, citations point to the right pages, descriptions are accurate, and that holds across rounds as well as in one lucky run.

No measurement can promise inclusion, and nobody can guarantee that an assistant will name you. What you can do is make your site easy to crawl, easy to understand and accurate, then use this method to see whether things move. The [core principles](/#principles) cover the first part. The rest is careful, repeated sampling.
