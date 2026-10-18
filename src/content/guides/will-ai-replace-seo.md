---
# scriptgrain: generation d75dacdd-c6f1-48b6-8237-6c08a3fff509, voice match 0.82 (2026-10-18), then Claude edit + fact-check (page-pipeline item 711)
title: "Will AI replace SEO?"
seoTitle: "Will AI Replace SEO? What Is Documented, What Is Not"
summary: "No platform documentation or research we have read says AI search removes the need for SEO. Google says SEO basics still apply to its AI features. What changes is where you appear and how you measure it."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "If you want to see whether ChatGPT, Claude, Gemini and Perplexity actually name and cite your company for your buyers' questions, it does that check for you."
related: ["geo-vs-seo","what-is-ai-seo","how-to-rank-in-google-ai-overviews","what-is-ai-visibility"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central Blog: Top ways to ensure your content performs well in Google's AI experiences on Search (May 2025)"
    url: "https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (full text, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "Is SEO going away with AI?"
    a: "No source we have read says so. Google documents that pages need to be indexed and eligible to show with a snippet to appear in AI Overviews and AI Mode, and that existing SEO fundamentals continue to be worthwhile."
  - q: "Is SEO dead after ChatGPT?"
    a: "We found nothing that shows it. OpenAI documents that sites which block its search crawler, OAI-SearchBot, will not be shown in ChatGPT search answers. That makes crawler access a dependency, which is classic SEO ground."
  - q: "Will ChatGPT replace SEO?"
    a: "Nobody can say, and any answer is a forecast. ChatGPT's own documentation describes relying on a crawler to surface websites in its search answers, and the best-known research paper on the topic did not test ChatGPT at all."
  - q: "How will ChatGPT affect SEO?"
    a: "The documented effects are narrow: your content can appear inside answers as well as in result lists, and that is harder to measure. Our recommendation is to keep pages crawlable and accurate and to check regularly which assistants name your business for buyer questions."
  - q: "Will SEO exist in five years?"
    a: "Nobody can predict that, and a source that claims to know is guessing. What we can tell you is what platforms document today, and today they all depend on pages their crawlers can reach."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Nothing we have read from Google, OpenAI, Perplexity or Anthropic, or in the best-known research paper on the topic, says that pages crawlers can reach stop mattering once AI writes the answers. The documented changes are narrower: where your content appears, and how you can see it. Anything about the longer term is a forecast.

Most "SEO is dead" posts mix three kinds of claim in one paragraph. On this page each one is labelled: **documented** (a platform's own documentation says it), **research** (a named study, with its conditions and limits) and **our recommendation** (sensible practice, nothing more). Where a claim is only a prediction, we say so.

## Two different questions: the channel and the job

"Will AI replace SEO?" asks two things at once.

- **The channel question:** what happens to search when AI answers sit above or beside the usual results?
- **The job question:** which of the tasks an SEO does can a tool now do?

They have different answers. A channel can change shape while the work inside it stays busy, and a task can be partly automated while the channel grows. Treating them as one question is how a headline manages to sound alarming and tell you nothing. For the wider comparison of classic search work and AI answer work, see [GEO vs SEO](/#geo-vs-seo).

## What platforms document about AI answers and ordinary search

**Documented (Google).** Google's page on AI features and your website says that to be eligible as a supporting link in AI Overviews or AI Mode, "a page must be indexed and eligible to be shown in Google Search with a snippet", and that "there are no additional technical requirements." It adds that "all existing SEO fundamentals continue to be worthwhile". Its examples include allowing crawling in robots.txt and by any CDN or hosting infrastructure, internal links, important content available as text, and structured data that matches the visible page.

Google's Search Central blog post on succeeding in its AI experiences (May 2025) says the same in plainer words: "The underpinnings of what Google has long advised carries across to these new experiences," and "Meeting the technical requirements covers you for search generally, including AI formats."

**Documented (other assistants).** OpenAI, Perplexity and Anthropic each publish crawler documentation. It establishes one narrow point: access is a dependency.

| Platform | Crawler used for search answers | What its documentation says about it |
|---|---|---|
| OpenAI (ChatGPT) | OAI-SearchBot (GPTBot is separate, for training) | Sites opted out of OAI-SearchBot "will not be shown in ChatGPT search answers, though can still appear as navigational links" |
| Perplexity | PerplexityBot | Used to "surface and link websites in search results"; Perplexity recommends allowing it in robots.txt |
| Anthropic (Claude) | Claude-SearchBot (ClaudeBot is separate, for training) | Disabling it "may reduce your site's visibility and accuracy in user search results" |

None of these pages says the crawler will choose your page, rank it or send you visitors. What they show is that a page the bot cannot reach is out of the running before quality comes into it. OpenAI also documents that its search and training settings are independent, so you can allow one and block the other. More on this under [crawler access](/#crawler-access).

## What research says about visibility in AI answers

**Research.** The most cited paper is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024. Its test conditions matter more than its headline:

- The authors built their own generative engine. For each query it fetched the top five Google results, and a language model wrote an answer from them.
- They tested on GEO-bench, a benchmark of 10,000 queries they put together from nine sources.
- Visibility was scored with the authors' own metrics: how much of the answer drew on a source and how prominently, plus a subjective score rated by GPT-3.5.
- They report that rewriting content to add citations, quotations and statistics raised visibility on those metrics, and that results varied by subject area. They also ran the methods on Perplexity.ai.

The limits: this is one engine design, built for the study and measured with metrics the authors defined. It did not test ChatGPT or Google's AI features, and those products have changed since. It does not address whether SEO is still needed.

One detail of the method is worth noticing. In that setup a page could only be cited if it was already in Google's top five for the query. Ordinary retrieval came first, and presentation was tested on top of it.

## What is genuinely changing for SEO

Two things are documented: where visibility shows up, and how you measure it.

**Where it shows up.** Google says AI Overviews and AI Mode may use a "query fan-out" technique, running several related searches to build a response, and can display "a wider and more diverse set of helpful links" than a classic results page. It also says AI Overviews appear only when its systems judge them additive to classic Search, "and as such, often don't trigger." So a page can be used inside an answer, shown as a supporting link, or left out entirely, and each of those looks different in a report.

**How you measure it.** Google documents that sites appearing in AI Overviews and AI Mode are counted in the overall search traffic in the Search Console Performance report, under the "Web" search type. The page we read describes no separate AI-only report, so what you see is the combined figure. Google also says clicks from results pages with AI Overviews are "higher quality". That is Google's own observation, and the page publishes no figures behind it. For ChatGPT, Perplexity and Claude, none of the crawler pages we read offers a reporting tool. The [measurement](/#measurement) section covers practical ways to check.

On the platforms' own account, the dependency on pages that are reachable, indexed and eligible is unchanged.

## Which SEO tasks AI tools can take on, and which still need a person

This is the job question. We have no study to cite here, so everything in this section is **our recommendation**.

Treat AI tools as aids for drafting and analysis, and have a person review what they produce. They are quick at first drafts of routine copy, sorting and summarising lists of pages or queries, and spotting patterns in data you have already collected.

A person still needs to make the judgement calls. Is this page factually right? Does it answer the question a buyer actually has? Should it be published at all? A tool produces fluent text whether or not its claims hold up, and fluent text can still be wrong. We will not put a number on how much of an SEO's work this covers, because we have found no source that measures it.

## What to keep doing, and what to start checking

**Keep doing:**

1. **Keep pages crawlable and indexable.** Google documents this as the requirement for AI Overviews and AI Mode, including allowing crawling at the CDN or hosting level.
2. **Make sure structured data matches what is visible on the page.** Google lists this among the SEO fundamentals for AI features.
3. **Keep factual pages accurate and clear.** Our recommendation: if a machine summarises you, you want the summary to be right.
4. **Decide, crawler by crawler, what your robots.txt allows.** OpenAI and Anthropic document separate crawlers for search and for training, so this is a real choice.

**Start checking (our recommendation):**

1. Which AI assistants name your business when someone asks a buyer question in your market. Ask the questions yourself on more than one assistant, and record the answers over time.
2. Whether the documented crawlers can actually reach the pages that matter. Your server logs show which user agents visit.
3. What Search Console can and cannot tell you, given that AI feature traffic is reported inside the overall Web figures.

None of this comes with a timeline or a guarantee, and nobody can promise inclusion in an AI answer. For background on how answers are put together, see [how AI answers happen](/#how-it-works). For where AI fits into SEO work more generally, see [what AI SEO means](/what-is-ai-seo/).

## How to judge the next "SEO is dead" headline

Ask four questions:

1. Does it name a source?
2. Is that source platform documentation, a piece of research, or an opinion?
3. If it is research, does it give the conditions the result holds under?
4. Does it separate the channel from the job?

Most posts fail the first question. Some pass it and fail the third, quoting a study without its limits. Even the GEO paper's abstract says generative engines are "rapidly replacing traditional search engines like Google and Bing". That is the authors' framing: their experiments measure visibility inside answers and do not measure how many people use search. A confident claim with no source behind it is an opinion, however it is presented.

Google's own blog post makes the only forecast we would repeat: "The only thing predictable in Search is that it always evolves."
