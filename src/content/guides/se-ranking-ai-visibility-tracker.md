---
# scriptgrain: generation 7415c316-bd2a-44a6-a373-c7e1f6c175bd, voice match 0.73 (2026-10-22), then Claude edit + fact-check (page-pipeline item 964)
title: "SE Ranking's AI visibility tracker: what it does, what its numbers mean, and how to check them"
seoTitle: "SE Ranking AI Visibility Tracker: What It Does"
summary: "SE Ranking tracks AI answers in two places: the AI Results Tracker inside its SEO platform and SE Visible, a standalone dashboard. Both report on prompts you choose, so treat the figures as samples and check them."
category: "choosing"
ours:
  - product: "visibilitytoai"
    why: "If you want a second, independent reading to compare against any tracker, it checks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions."
related: ["how-to-measure-ai-visibility","ai-visibility-checker","generative-engine-optimization-tools","how-to-track-ai-overviews","what-is-ai-visibility"]
sources:
  - label: "SE Ranking: Subscription pricing (read 22 October 2026)"
    url: "https://seranking.com/pricing.html"
  - label: "SE Ranking: AI Search Toolkit / AI visibility tracker product page"
    url: "https://seranking.com/ai-visibility-tracker.html"
  - label: "SE Ranking Help Center: How to use AI Results Tracker: Rankings"
    url: "https://help.seranking.com/hc/en-us/articles/16335399186460-How-to-use-AI-Results-Tracker-Rankings"
  - label: "SE Ranking API documentation: AI Results Tracker"
    url: "https://seranking.com/api/project/ai-result-tracker/"
  - label: "SE Visible: product and pricing page"
    url: "https://visible.seranking.com/"
  - label: "SE Visible: Inside SE Visible: what you see and where the data comes from (29 September 2026)"
    url: "https://visible.seranking.com/blog/how-se-visible-works/"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
faq:
  - q: "What is SE Ranking's AI visibility tracker, and is SE Visible the same thing?"
    a: "No. The AI Results Tracker is part of SE Ranking's main SEO platform and is sold through plan prompt limits and an AI Search add-on. SE Visible is a separate dashboard, \"Powered by SE Ranking\", with its own plans and its own metrics."
  - q: "Which AI platforms does SE Ranking track?"
    a: "SE Ranking's product page and API docs name AI Overviews, AI Mode, ChatGPT and Gemini for the AI Results Tracker. SE Visible lists those plus Perplexity, with Claude \"coming soon\". Its pages disagree in places, so confirm coverage during a trial."
  - q: "How much does SE Ranking's AI visibility tracking cost?"
    a: "On 22 October 2026 the pricing page showed Core at $129 a month (100 daily prompts) and Growth at $279 (250 daily prompts), or 20% less billed annually. The AI Search add-on started at $89 a month, and SE Visible plans ran from $99 to $355 a month. Prices and currency vary, so check on the day you buy."
  - q: "How accurate is any AI visibility tracker?"
    a: "A tracker reports on the prompts you chose, on the days they ran, and AI answers can change between runs. Neither SE Ranking product documents how many times each prompt runs per check. Check a sample against the stored answers and your own repeated runs before you rely on a number."
  - q: "Can I track AI visibility without paying for a tool?"
    a: "Yes, on a small scale. Run a fixed list of prompts by hand several times each, record whether you are named and cited, and repeat monthly. For Google, Search Console counts traffic from AI Overviews and AI Mode within the Web search type of its Performance report."
published: 2026-10-22
updated: 2026-10-22
status: "published"
---
SE Ranking sells AI tracking in two forms. The first is prompt tracking inside its main SEO platform, called the AI Results Tracker and grouped under what SE Ranking calls its AI Search Toolkit. The second is SE Visible, a standalone dashboard at visible.seranking.com. Below is what each covers, what its numbers mean and how to check them.

Everything here about the products comes from SE Ranking's own product, help, API and pricing pages, read on 22 October 2026. Where we give advice, we say it is ours.

## What SE Ranking's AI visibility tracking is

| | AI Results Tracker | SE Visible |
|---|---|---|
| Where it lives | Inside SE Ranking projects, next to rank tracking and audits | A separate product, described as "Powered by SE Ranking" |
| Engines SE Ranking names | AI Overviews, AI Mode, ChatGPT and Gemini (product page and API docs) | ChatGPT, Gemini, AI Mode, AI Overviews and Perplexity, with "Claude will be added soon" |
| How it is sold | Prompt limits in the Core and Growth plans, plus an AI Search add-on | Its own plans, or 200 prompts of access through the AI Search add-on |

In short, the AI Results Tracker suits someone who already uses SE Ranking for SEO. SE Visible is a brand-level dashboard you can buy on its own.

## Which AI platforms it covers

SE Ranking's own pages disagree on this, so check it during a trial. The AI visibility product page names AI Overviews, AI Mode, ChatGPT and Gemini, and the AI Results Tracker API documentation lists the same four. The pricing page shows "5 LLMs to track" under both the Core and Growth plans, yet the AI Search add-on on the same page names only "AI Overviews, AI Mode, ChatGPT". SE Visible's pages list five engines, Perplexity included, and say every plan gets all five.

None of these pages listed Claude or Microsoft Copilot as tracked when we read them. If your buyers use an assistant that is missing, no dashboard figure will tell you about it.

## What it tracks and what it reports

The two products use different metrics with similar-sounding names, so read the definitions before you compare them.

### AI Results Tracker

SE Ranking's help article on the Rankings tab defines:

- **Mention**: whether your brand was named in the AI answer, even without a link.
- **Link**: whether your page was linked in the answer, and in which position.
- **Top 3 Presence**: the share of AI answers where your mention or link appears in the top three positions.
- **Source Presence**: the share of answers that contain at least one source link.
- **Organic-AI Overlap** (AI Overviews only): how many unique URLs an AI Overview shares with the top 20 organic results for the same keyword. The percentage always divides by 20, and a day with no AI Overview shows as empty rather than zero.

Each result links to a cached copy of the AI answer, and arrows show the change since the previous check. The API documentation says the full answer text is kept for 30 days and the presence data for one year.

### SE Visible

SE Visible's own explainer defines:

- **Visibility**: how often answers mention you, weighted by where the mention appears. First place scores 1.0, lower positions score less, and answers that leave you out score zero.
- **Mentions**: whether your brand appears, with linked and unlinked mentions counted separately.
- **Share of voice**: your share of mentions compared with the competitors you track.
- **Average position**: where you usually appear in the answers that mention you.
- **Net sentiment**: the share of positive mentions minus the share of negative ones, on a scale from -100 to +100.
- **Citations**: tracked separately in a Sources view, where a source's coverage is the share of analysed answers that cite it.

## How it collects the data

SE Visible documents more than most tools do. Its explainer says it checks every tracked prompt on every selected engine daily by default, with weekly checks available on some plans. It collects answers "through a real browser session in each engine's user interface" instead of through an API, and stores each response unedited. Each project tracks one brand in one location, with its own prompt language. You choose up to five topics, and industry prompt suggestions arrive pre-selected.

For the AI Results Tracker, the product page says it "sends queries to AI platforms and captures the responses as a real user would see them". The help article says your prompt limit is shared across every project in the account.

Neither product's documentation says how many times each prompt is run per check. That matters, because one answer is one draw. Ask SE Ranking before you treat a daily figure as stable.

## What it costs

These are the prices SE Ranking's pricing pages showed us in US dollars on 22 October 2026. The main pricing page showed euro prices when we read it from another location, so you may see a different currency and amount.

| Plan or add-on | Monthly billing | Billed annually (per month) | AI tracking included |
|---|---|---|---|
| SE Ranking Core | $129 | $103.20 | 100 prompts tracked daily, 5 LLMs |
| SE Ranking Growth | $279 | $223.20 | 250 prompts tracked daily, 5 LLMs |
| AI Search add-on | from $89 | from $71.20 | AI Results Tracker, AI competitor research, SE Visible access (200 prompts) |
| SE Visible Basic / Core / Plus | $99 / $189 / $355 | "Save 20%", per the page | 200 / 450 / 1,000 prompts |

SE Ranking offers a 14-day free trial of the main platform that includes 20 AI prompts a day. SE Visible advertises a 10-day free trial. Enterprise pricing is not published. Prices change, so check both pricing pages on the day you buy.

## What the numbers can and cannot tell you

This is our reading of the definitions above.

- **They describe your prompt list, not the market.** Add prompts where you are strong and every rate rises. None of it measures how many real people asked those questions.
- **Weighted scores are not percentages of answers.** An SE Visible visibility score of 0.5 does not mean you appear in half the answers, because position changes the weight.
- **Share of voice depends on who you track.** Add or remove a competitor and your share moves, even if no AI answer changed.
- **A single day's arrow is weak evidence.** AI answers can change between runs, and the documentation we read does not say how many runs make up one check. Look at trends over weeks.
- **Coverage differs by product.** A figure from the AI Results Tracker and one from SE Visible may cover different engines, so do not add them together.

Our guide to [how to measure AI visibility](/how-to-measure-ai-visibility/) explains why repeated samples beat single checks.

## How to check the data yourself

This is our recommendation, not a vendor requirement. It works with or without a paid tool.

1. Pick ten tracked prompts: some where the tool says you appear and some where it says you do not.
2. Open the cached copy of each answer in the tool and note whether you are named, linked and described correctly. Do this within 30 days, while the answer text is still kept.
3. Run the same prompts yourself on each engine, in a logged-out or temporary session, from the country the project tracks. Repeat each prompt at least three times.
4. Record in a spreadsheet whether you were named, whether you were cited and which other sources appeared.
5. Compare. If your hand checks and the dashboard broadly agree, you can lean on the trend. If they often disagree, ask SE Ranking whether location, timing or run counts explain the gap.

Our [AI visibility checker](/ai-visibility-checker/) guide sets out a free way to run these spot checks, and [how to track AI Overviews](/how-to-track-ai-overviews/) covers Google's own surfaces.

## Questions to ask any tracker before paying

These are our recommendations, not a formal standard. They apply to SE Ranking and to every option in our [generative engine optimisation tools](/generative-engine-optimization-tools/) guide:

1. Which engines does my plan cover, and where is that written down?
2. Are the prompts mine, the vendor's suggestions, or both?
3. How often is each prompt run, and how many times per check?
4. How exactly are mention, citation, position and share figures calculated?
5. Can I see or export the raw answers behind every number?
6. Which locations and languages can I track?

A tool earns its cost when you need many prompts, several engines and a daily record you could not keep by hand. For a dozen prompts checked monthly, a spreadsheet is enough.

## What to do with the results

Start with the gaps: prompts where you are never named, or named but never cited. Those are your to-do list.

For Google's AI features, Google Search Central says "there are no additional requirements to appear in AI Overviews or AI Mode" beyond normal Search eligibility. It also says sites shown in them are reported in Search Console's Performance report, within the "Web" search type. So Search Console remains the place to see Google traffic, and crawlable, indexed, useful pages remain the starting point. The [measurement section](/#measurement) of our main guide shows how tracker data, referral traffic and Search Console fit together.
