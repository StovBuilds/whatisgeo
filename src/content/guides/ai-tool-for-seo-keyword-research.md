---
# scriptgrain: generation 2de3aa79-5bb7-476b-9c48-8ede85f47891, voice match 0.87 (2026-10-30), then Claude edit + fact-check (page-pipeline item 1387)
title: "AI tools for SEO keyword research: what they can do, what they cannot, and how to use them"
seoTitle: "AI tools for SEO keyword research: what works"
summary: "AI tools are good at generating, grouping and sense-checking keyword ideas, but a chatbot has no search volume data of its own. Use AI for ideas and clustering, and check demand in Google's own tools."
category: "choosing"
ours:
  - product: "visibilitytoai"
    why: "If your list of buyer questions is longer than you can check by hand, it tracks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for those questions."
related: ["ai-seo-tools","chatgpt-seo-tools","how-to-measure-ai-visibility","is-ai-content-good-for-seo"]
sources:
  - label: "Google Ads Help: Use Keyword Planner"
    url: "https://support.google.com/google-ads/answer/7337243?hl=en"
  - label: "Search Console Help: Performance report (Search results): overview and basic setup"
    url: "https://support.google.com/webmasters/answer/7576553?hl=en"
  - label: "Google Search Central: Google Search's guidance on using generative AI content on your website"
    url: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content"
  - label: "Google Search Central: Spam policies for Google web search (scaled content abuse)"
    url: "https://developers.google.com/search/docs/essentials/spam-policies"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "Can ChatGPT do keyword research?"
    a: "Partly. It is good at suggesting phrase ideas, grouping them and judging intent. On its own it has no search volume data, so check demand in Google Keyword Planner and your Search Console account."
  - q: "Does an AI keyword tool give accurate search volume?"
    a: "Only if it draws on a real data source, and even then the figures are estimates. If a tool quotes volume, ask where the number comes from and compare it with Keyword Planner."
  - q: "Is there a free AI tool for keyword research?"
    a: "Any general chatbot can do the idea and clustering work, including free versions where they exist. For demand data, use Google Keyword Planner, which needs a Google Ads account with billing information entered, and your own Search Console data."
  - q: "How do I find the questions people ask AI about my business?"
    a: "Start with your own records: sales calls, support emails, reviews and enquiries. Keep questions an AI model suggests only if they match what real customers say. Then put a sample to the assistants your buyers use and note whether you are named and cited."
  - q: "Should I use AI to cluster keywords?"
    a: "Yes, as a first pass. Read every group before you act on it, because a model can merge topics that need separate pages. If you use Keyword Planner, compare its grouping with the model's."
published: 2026-10-30
updated: 2026-10-30
status: "published"
---
Keyword research is really three jobs, and AI suits two of them. Coming up with ideas and grouping them are language tasks a model does well. Demand data has to come from a source that records real searches, such as Google Keyword Planner or your own Search Console account.

## Can AI do keyword research? The direct answer by job

| Job | What it means | Can an AI model do it? |
|---|---|---|
| Idea generation | Listing the phrases and questions a buyer might use | Yes, well, from a good brief |
| Clustering and intent | Grouping phrases into topics and judging what each searcher wants | Yes, as a first pass that you check |
| Demand data | How many people search, how competitive it is, whether interest is rising | Not on its own; this needs a real data source |

The split follows from how the models work. Google's guidance on generative AI content says generative models "don't retrieve facts, but predict a likely sequence of words based on their training data", and that their output may contain inaccuracies. Writing plausible phrases is exactly that kind of task. Counting searches is a different one.

## What a chatbot cannot tell you: volume, difficulty and trends

Ask a chatbot how many people search for a phrase each month and it will often give you a confident number. On its own, the model has no search log to read that number from, so treat it as a guess. That is our reasoning from how the models work and from Google's description above, not a measured finding.

Difficulty and trends have the same problem. Without a live data source, a model cannot see who ranks today, how strong those pages are, or whether interest is climbing or fading. It can describe what a competitive topic usually looks like. It cannot measure yours.

Some chat tools can search the web, and some SEO products add AI features on top of their own databases. In both cases a figure is only as good as its origin. Ask the tool, or the vendor, which data source produced the number. A source you can check is an answer; a vague reply is a warning sign.

## Where AI genuinely helps: ideas, clustering and intent

Google's guidance says generative AI "can be particularly useful when researching a topic, and to add structure to original content". Keyword research benefits from both. The uses below are our recommendations.

- **Ideas.** Give the model your product, your customer and a few seed phrases, then ask for variations in the words buyers use, including the clumsy ones. It will surface angles that the tidy language on your own website misses.
- **Clustering.** Paste in a long list and ask it to group the phrases by topic. A model produces a respectable first pass far faster than you could sort by hand. Read the groups yourself, though: it will sometimes merge two things that need separate pages.
- **Intent.** Ask what each group is after: learning, comparing or buying. Someone who wants a definition and someone who wants a quote need different pages. Check the model's read by searching the phrase and looking at what already ranks.

## Where the real numbers come from

### Google Keyword Planner

Keyword Planner is part of Google Ads. Google's help page says it lets you discover new keywords related to your business and see estimates of how many searches they get each month and what it costs to target them with ads. You can start from words or a website ("Discover new keywords"), or paste in a list you already have ("Get search volume and forecasts").

The same page makes three points worth knowing before you start:

- To use even basic features such as getting keyword ideas, you must complete your Google Ads account setup, including entering billing information.
- Keywords with very low search volumes, or ones considered sensitive, cannot be discovered or forecast. Google says its policies often prevent results for sensitive categories such as health or finance.
- The tool is built to research keywords for Search ad campaigns, so its figures are estimates made for ad planning.

Keyword Planner can also show keyword ideas grouped by theme, and can automatically organise keywords into ad groups (in English only). That gives you a second opinion on the clusters your AI model suggested.

### Search Console

The Search Console Performance report shows how your own site performs in Google Search. Its Queries view lists the searches your site appeared for, with clicks, impressions, click-through rate and average position. The default view covers the past three months. Google notes that a query appearing in the list does not mean you will see your site when you search it yourself, because results depend on the time, place, device and recent history of the person searching.

This is real behaviour on your own pages, which makes it the most reliable check you have. Its limit is scope: it covers only your site, and only queries where you already appeared, so it says nothing about demand in the wider market.

### Your own records

Sales calls, support emails, reviews and enquiry forms hold the exact words your customers use. No tool has that data, and it costs nothing to collect.

## A simple workflow you can run yourself

This method needs a chatbot, Keyword Planner and Search Console. Remember that Keyword Planner needs a Google Ads account with billing information entered. The steps are our recommended method, not a platform requirement.

1. Write down your product, your customer and the problem you solve, in plain words.
2. Ask an AI model for a long list of phrases and full questions a buyer might use.
3. Ask it to group the list into topics and label the likely intent of each group.
4. Paste the strongest phrases into Keyword Planner's "Get search volume and forecasts" and note the estimates. Expect some phrases to return nothing.
5. Open the Search Console Performance report, choose Queries, and look for phrases where you already get impressions but few clicks.
6. Pick a short list and search each phrase yourself before you write. If every top result is a format you cannot match, it is better to find that out before you start.

For other no-cost options, see [free AI tools for SEO](/free-ai-tools-for-seo/).

## Keyword research for AI answers: questions and prompts, not just keywords

People type short phrases into a search box, but they often ask an AI assistant a full question with context attached. "Which accountant suits a small bakery that has just hired its first employee?" carries far more detail than "bakery accountant". We recommend adding a second layer to your research to cover questions like that.

Google's documentation on AI features adds a relevant detail. AI Overviews and AI Mode may use a "query fan-out" technique, issuing multiple related searches across subtopics and data sources to build a response. So a single question can touch several subtopics, which is a good reason to cover the follow-up questions around a topic as well as the main phrase. The same page says that to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to appear in Google Search with a snippet, and that there are no additional technical requirements.

To build a prompt list (our recommendation):

- Collect the questions customers already ask you, in their own words.
- Ask an AI model what else a buyer in that situation might ask. Cut anything you have never heard a real customer say.
- Put a handful of those questions to the assistants your buyers use, and note whether you are named and which sources are cited. Repeat this over time, because answers vary.
- Write pages that answer the questions clearly; see [how to write content for AI search](/how-to-write-content-for-ai-search/).

Research on this exists but is young. Aggarwal et al. (GEO, KDD 2024) built a benchmark of queries across multiple domains and tested ways of making content more visible in generative engine responses. They found that how well each method worked varied by domain. They also describe generative engines as black-box and fast-moving, and say content creators have little to no control over when and how their content is shown. Nobody can guarantee inclusion in an AI answer. To track how you appear, see [how to measure AI visibility](/how-to-measure-ai-visibility/) and the [measurement section of our main guide](/#measurement).

## Kinds of tool compared

This table compares kinds of tool, not products, and ranks none of them.

| Kind of tool | What it is for | What data it uses | What to check |
|---|---|---|---|
| General AI chatbot | Ideas, clustering, intent labels, question lists | Patterns from its training; web pages only if it searched | Treat any volume it quotes without a named source as a guess |
| Google Keyword Planner | Keyword ideas and monthly search estimates | Google's own data, inside Google Ads | Needs account setup with billing information; low-volume and sensitive terms may not appear |
| Google Search Console | Queries your site already appears for | Your own clicks, impressions, click-through rate and positions | Covers your site only, not the wider market |
| SEO suite with AI features | A combined research workflow | The vendor's own data, which varies by product | Ask where the volume figures come from and how they are estimated |

For more on using ChatGPT itself in SEO work, see [ChatGPT SEO tools](/chatgpt-seo-tools/).

## Mistakes to avoid

- **Trusting a chatbot's volume figure.** Check it in Keyword Planner or ignore it.
- **Publishing a page per keyword from raw AI text.** Google's spam policies give "using generative AI tools or other similar tools to generate many pages without adding value for users" as an example of scaled content abuse. Its generative AI guidance also says to fact-check and review AI-generated content before publishing. What matters is whether a page adds value for readers, however it was produced; [is AI content good for SEO](/is-ai-content-good-for-seo/) covers this in detail.
- **Skipping the results check.** The pages already ranking show you what format and depth a phrase needs.
- **Researching keywords only.** Buyers who ask an assistant use full questions, so keep a question list alongside your keyword list.
