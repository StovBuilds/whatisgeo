---
# scriptgrain: generation d71e85d9-b074-48ff-a065-687782a83f88, voice match 0.88 (2026-10-18), then Claude edit + fact-check (page-pipeline item 698)
title: "How to improve your AI visibility: what you can influence and what you cannot"
seoTitle: "How to Improve AI Visibility: What Actually Helps"
summary: "AI visibility is how often AI answers name, cite and correctly describe your business. You can improve your odds with crawler access, clear pages and consistent details. Nobody can guarantee inclusion."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "Once you have a baseline routine, this tracks whether ChatGPT, Claude, Gemini and Perplexity name and cite your business for buyers' questions over time."
  - product: "hilyt"
    why: "If assistants describe your business inconsistently, an open AI-readable profile gives them one clear statement of who you are and what you do."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO paper, full text (HTML v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "How do I improve my business's visibility in ChatGPT and AI Overviews?"
    a: "Record a baseline, check the right crawlers can reach you, make pages clear and quotable, keep your business details consistent, then re-check the same way. For ChatGPT search, OpenAI recommends allowing OAI-SearchBot in robots.txt. For AI Overviews and AI Mode, Google says a page must be indexed and eligible for a snippet, with no additional technical requirements."
  - q: "Is AI visibility different from SEO rankings?"
    a: "They overlap but they are not the same thing. Google says the same foundational SEO best practices apply to its AI features, so good SEO groundwork still counts there. AI visibility asks whether generated answers name, cite and correctly describe you, and those answers vary rather than sitting in a fixed position."
  - q: "Can I pay or submit my site to get into AI answers?"
    a: "None of the crawler and AI features documentation we read from Google, OpenAI, Perplexity or Anthropic describes a way to pay or submit your way into the answer itself. OpenAI's crawler page does mention ads on ChatGPT, which are a separate paid placement. Google's documentation says no special optimisation is required for AI Overviews and AI Mode."
  - q: "How do I check whether AI mentions my business?"
    a: "Ask the assistants your customers use the questions a buyer would ask, several times each on different days, and record whether you are named, cited and described correctly. Answers vary between runs, so compare patterns across many runs. For Google, AI Overviews and AI Mode traffic is counted within Search Console's Performance report under the Web search type."
  - q: "How long does it take to improve AI visibility?"
    a: "Nobody can honestly promise a timeframe. Google says crawling can take anywhere from several days to several months, depending on how often its systems decide a page needs refreshing, and assistants change independently of anything you do. Judge progress against your own baseline."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Start by measuring, because AI answers vary from one run to the next and you need a baseline to compare against. Then check crawler access, make your pages easy to quote, remove contradictions about your business across the web, and re-check the same way. Each step below says what kind of claim it rests on: a platform's own documentation, published research, or sensible practice.

| Step | What you do | What it rests on |
|---|---|---|
| 1. Baseline | Ask assistants buyer questions repeatedly and log the results | Sensible practice |
| 2. Access | Allow the search crawlers you want in robots.txt and at your CDN or firewall | Platform documentation (Google, OpenAI, Perplexity, Anthropic) |
| 3. Quotable pages | Direct answer first, specific sentences, one question per page | Sensible practice, partly backed by Google's guidance and one research paper |
| 4. Consistency | Same name, location, services and facts everywhere | Sensible practice, partly backed by Google's guidance |
| 5. Re-check | Repeat the baseline and compare patterns | Sensible practice |

## What AI visibility means (and what it does not guarantee)

Three things have to happen. The assistant names you. It cites you, with a link or source attribution a reader can follow. And it describes you correctly: right services, right location, right facts.

Miss any one and you have a problem. Being named but described wrongly is arguably worse than not being named at all.

Visibility is not a ranking. There is no fixed results page to sit at the top of, and no guaranteed slot for a given question. Google's own documentation says AI Overviews and AI Mode may use different models and techniques, so the responses and links they show will vary, and that AI Overviews only appear when Google's systems judge them useful, so they often don't trigger at all. What you can realistically aim for is better odds, measured properly.

That is why the order of work matters: measure first, change things second, check again third. For the wider picture of how answers are assembled, see [how AI answers happen](/#how-it-works).

## Step 1: Find out where you stand today

This is a recommendation from practice, not a platform rule, and it is the step most people skip.

Write down the questions a buyer would really ask. Leave out your brand name and describe the problem you solve: "Who does X near me?" or "What should I look for in a Y supplier?" Put those questions to the assistants your customers are likely to use and record what comes back.

Do it more than once. Answers vary between runs, so a single query tells you very little. Ask each question several times, ideally on different days, and log three things each time: were you named, were you cited, and was the description correct?

A plain spreadsheet does the job, with one row per question per run. You are looking for patterns, not a single verdict. Keep the log, because without it every later claim of improvement is guesswork. If you are setting this up for the first time, [the 30-day plan](/#getting-started) covers the groundwork.

## Step 2: Make sure the right crawlers can reach you

If a crawler cannot read your pages, it cannot use them. The major providers document their own crawlers, and they are not interchangeable:

| Provider | Crawler | What the provider says it does |
|---|---|---|
| OpenAI | OAI-SearchBot | Surfaces sites in ChatGPT's search features. Sites that block it will not be shown in ChatGPT search answers, though they can still appear as navigational links. |
| OpenAI | GPTBot | Crawls content that may be used to train OpenAI's foundation models. |
| OpenAI | ChatGPT-User | Visits pages when a user asks something. OpenAI says robots.txt rules may not apply, and it is not used to decide search inclusion. |
| Perplexity | PerplexityBot | Surfaces and links sites in Perplexity search results. Perplexity says it is not used to crawl content for AI foundation models. |
| Perplexity | Perplexity-User | Fetches pages for user questions. Perplexity says it generally ignores robots.txt, because a user requested the fetch. |
| Anthropic | ClaudeBot | Collects content that may contribute to model training. |
| Anthropic | Claude-User | Fetches pages when people ask Claude questions. Anthropic says blocking it may reduce your visibility for user-directed web search. |
| Anthropic | Claude-SearchBot | Indexes content to improve Claude's search results. Anthropic says blocking it may reduce your visibility in search results. |

Because search and training crawlers are separate, opting out is not all-or-nothing. OpenAI states plainly that you can allow OAI-SearchBot to appear in search results while disallowing GPTBot. Read each provider's page before you edit anything, since the names and behaviour are theirs to define and the pages get updated.

Robots.txt is only part of it. Google lists making sure crawling is allowed "by any CDN or hosting infrastructure" as a best practice, and Perplexity's documentation explains how to allow its bots through a web application firewall. A firewall rule set up years ago can block crawlers that your robots.txt welcomes.

Two cautions. First, robots.txt is a request, not a lock. RFC 9309, the standard that defines it, says its rules "are not a form of access authorization". If something needs to be private, put it behind a login.

Second, Google works differently. For AI Overviews and AI Mode, Google says the same foundational SEO best practices apply. To be shown as a supporting link, a page must be indexed and eligible to appear in Search with a snippet, and "there are no additional technical requirements". Google also says robots.txt rules for Googlebot are the control for Search, including its AI features. Google-Extended is a separate control for training and grounding in some of Google's other systems, so it is not the switch for AI Overviews. More detail is in [crawler access](/#crawler-access).

## Step 3: Make pages easy to quote

Most of this step is our recommendation. Google's guidance supports parts of it: it asks for helpful, reliable, people-first content and for important content to be available as text.

Put the direct answer first. If a page exists to answer a question, answer it in the opening lines in plain words, before the context and caveats. A system looking for a passage to use will find one, and a person skimming will too.

Write sentences that still make sense when quoted on their own. "We do it differently" means nothing by itself. A sentence that names the service, the place and the fact can be quoted. Specific beats clever.

Keep pages focused: one page, one question, one clear answer. A page that sprawls across six topics is harder to quote accurately.

None of this is exotic. It is good writing for readers, and it happens to suit systems that summarise and cite. The thinking behind it is set out in [the principles](/#principles).

## Step 4: Be described consistently across the web

Assistants do not only read your site. They also draw on what others say about you, so your business can be described in several places at once, and those descriptions can disagree.

Keep your business name, location, services and key facts consistent across your own site and your profiles. Spell the name the same way, use the same address format and list the same services. If you move or drop a service, update it everywhere, not just on your home page.

This is mostly a recommendation from practice, though Google's AI features page does list two related checks: keep your Business Profile and Merchant Center information up to date, and make sure your structured data matches the visible text on the page. It costs little and reduces the chance of an assistant stitching a muddled description together from conflicting sources. You cannot make a third party say anything, but you can make sure everything you control says the same thing.

## What the research says, and its limits

The most cited study is Aggarwal et al., *GEO: Generative Engine Optimization*, accepted to KDD 2024. The authors built GEO-bench, a benchmark of 10,000 queries, and used a generative engine of their own that answered each query from the top five Google results, roughly mimicking engines like Perplexity. They then rewrote source pages in different ways and measured visibility with their own metrics.

The rewrites that added citations, quotations from relevant sources and statistics did best. They report improvements of up to 40% on their own visibility measure, and they also ran the same methods on Perplexity.ai. Keyword stuffing, a classic SEO tactic, gave little to no improvement. They also found that what works varies by domain.

Those results come from a specific benchmark, a specific engine design and metrics the authors defined, with some scoring done by an earlier language model (GPT-3.5). Today's assistants work differently and keep changing. The paper is a reasonable argument for clear, well-supported writing and for measuring what happens. It does not predict what any one change will do for your site.

You will also see vendors quoting big percentage lifts, sometimes borrowed from this paper without its conditions. If a figure comes from a vendor, it is the vendor's claim, and you should weigh it that way.

## What you cannot control

You cannot control whether an assistant includes you in a given answer, how it words its description, or which sources it prefers on a given day. You cannot make its output repeatable: the same question can return different answers on different runs. None of the provider documentation listed on this page describes a way to pay or submit your way into the answer itself. OpenAI's crawler page does mention ads on ChatGPT, but that is advertising, which is a separate thing from the answer.

You also cannot control what third parties say about you, or when providers change their crawlers and policies. Re-read the provider pages from time to time rather than relying on an old screenshot.

What you can control is in Steps 2 to 4: access, clarity and consistency. That is less than the hype suggests, but it is real.

## How to tell whether it is working

Go back to your baseline log. Run the same questions again, the same number of times, and record the same three things: named, cited, described correctly.

Compare patterns, not single answers. One run where you are named proves little, and so does one run where you are missing. If, across many runs, you are named more often, cited more reliably or described more accurately than before, that is worth taking seriously. If nothing changes, that tells you something too.

For Google specifically, traffic from AI Overviews and AI Mode is included in Search Console's Performance report, counted within the "Web" search type. Remember that changes take time to be picked up: Google says crawling can take anywhere from several days to several months, depending on how often its systems decide a page needs refreshing.

Be careful about giving your changes the credit. Assistants change on their own, so a better result might come from your work or from an update you never saw. Note what you changed and when, and don't declare success early. There is more on this in [measuring progress](/#measurement).
