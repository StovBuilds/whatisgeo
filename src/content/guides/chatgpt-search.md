---
# scriptgrain: generation bcdb63e5-f927-4fca-afeb-524df11370d3, voice match 0.76 (2026-10-18), then Claude edit + fact-check (page-pipeline item 732)
title: "ChatGPT search: what it is, how it works, and how a website appears in it"
seoTitle: "ChatGPT Search: How It Works and How Sites Appear"
summary: "ChatGPT search is the web search feature inside ChatGPT. It pulls current web results into an answer and links the sources. Sites become eligible by allowing OAI-SearchBot, but placement is never guaranteed."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "Once you have checked a few questions by hand, it tracks whether ChatGPT and other assistants name and cite your company for your buyers' questions over time."
related: ["how-to-rank-in-chatgpt","ai-crawlers-robots-txt","how-to-measure-ai-visibility","perplexity-seo"]
sources:
  - label: "OpenAI: Introducing ChatGPT search (31 October 2024, with later updates)"
    url: "https://openai.com/index/introducing-chatgpt-search/"
  - label: "OpenAI Help Center: Searching the web with ChatGPT"
    url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
  - label: "OpenAI: Overview of OpenAI Crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024), arXiv abstract"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "Is ChatGPT search free?"
    a: "Yes. OpenAI's help centre says web search is available on ChatGPT Free, Go, Plus, Pro, Business, Enterprise and Edu, and to people who are not signed in, subject to each plan's usage limits (checked 18 October 2026)."
  - q: "Does ChatGPT always search the web?"
    a: "No. OpenAI says ChatGPT may search automatically when a question would benefit from current information, and users can also choose Search themselves. Questions it can answer without the web may never trigger a search."
  - q: "How is ChatGPT search different from Google?"
    a: "Google shows a ranked list of results. ChatGPT search writes one answer and attaches citations. OpenAI also says ChatGPT search sometimes sends rewritten queries to other search providers, so it is partly built on top of other search indexes."
  - q: "How do I stop or allow ChatGPT search using my site?"
    a: "Use the OAI-SearchBot user agent in robots.txt. OpenAI says sites that opt out of it will not be shown in ChatGPT search answers, though they can still appear as navigational links, and that changes can take around 24 hours to apply."
  - q: "Does blocking GPTBot keep me out of ChatGPT search?"
    a: "Not according to OpenAI. Its crawler page says each robots.txt setting is independent, so you can allow OAI-SearchBot for search while disallowing GPTBot, which collects content that may be used for training."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
For a site owner, the useful part is the citations. They are the only route by which ChatGPT sends a reader to your page. OpenAI documents one thing you control, crawler access, and says plainly that placement is not guaranteed.

The launch post and help article are written for people using the feature. This page is for the people being searched: what the feature does, when it runs, where its sources come from and what you can actually change. For tactics, see the separate guide on [how to rank in ChatGPT](/how-to-rank-in-chatgpt/).

## What is ChatGPT search?

OpenAI introduced ChatGPT search on 31 October 2024. At first it was available to paying Plus and Team users. Updates to the launch post say it reached all logged-in users on 16 December 2024 and everyone, without signing up, on 5 February 2025. OpenAI's help centre now lists web search on ChatGPT Free, Go, Plus, Pro, Business, Enterprise and Edu, and for signed-out users, subject to each plan's usage limits (checked 18 October 2026). Any older article that says it is for paid users only is out of date.

It works on chatgpt.com and in the desktop and mobile apps. OpenAI also offers a Chrome extension that makes ChatGPT the browser's default search engine.

## When does ChatGPT search the web?

There are two routes, and OpenAI documents both:

- **ChatGPT decides.** The help centre says ChatGPT "may search the web automatically when your question would benefit from current information".
- **The user asks.** People can pick Search from the tools menu, type / in the message box, or regenerate an answer with "Search the web".

OpenAI does not publish a list of what triggers an automatic search, so treat any list you see elsewhere as guesswork. What follows for you is simple: if ChatGPT answers a question from what it already knows, no search happens and no page gets a citation, however good your site is. For how this fits into AI answers generally, see [how AI answers happen](/#how-it-works).

## How does ChatGPT search work?

OpenAI's help article describes the parts that matter to a site owner:

1. **It rewrites the question.** When ChatGPT search uses other search providers, it "typically rewrites your query into one or more targeted queries". After reviewing the first results, it may send further, more specific queries.
2. **It draws on outside search providers and partners.** The launch post says ChatGPT search "leverages third-party search providers, as well as content provided directly by our partners". The help article names Microsoft and Shopify among the providers whose privacy policies apply.
3. **It uses location.** ChatGPT may estimate a user's general location from their IP address and pass that general location to search providers. A question like "good restaurants near me" can become "top restaurants San Francisco". If memory is turned on, saved memories can shape the rewritten query too.
4. **It writes an answer with citations.** Responses that use search may include citations, and a Sources button lists the cited pages and other relevant links.

This tells you two things. First, your page has to be findable by the searches ChatGPT runs, which partly means ordinary search indexes. Second, two people asking the same question from different places, or with different memories saved, may see different sources. One screenshot of "what ChatGPT says about us" is an anecdote.

OpenAI also says it "ranks search results using multiple factors intended to help users find relevant, reliable information". It does not say what those factors are.

## Is ChatGPT search a search engine like Google?

Partly. It answers questions from web pages, and OpenAI's Chrome extension can even replace Google as the browser's default search. The output is different, though:

| | Google search | ChatGPT search |
| --- | --- | --- |
| What you get | A ranked list of results | One written answer with citations |
| Where results come from | Google's own index | Third-party search providers and partner content, per OpenAI |
| Crawler to allow | Googlebot | OAI-SearchBot |
| Placement | Not guaranteed | "Placement is not guaranteed" (OpenAI) |

With Google you compete for a place in a list. With ChatGPT search you compete to be one of the sources behind a single answer. Perplexity works in a similar way and has its own crawler; see [Perplexity SEO](/perplexity-seo/).

## Where do the sources and citations come from?

From the pages ChatGPT retrieves for that conversation through the searches described above. OpenAI's own help article warns that "search results and citations can be incomplete, outdated, or incorrect" and tells users to open sources and check them. Being cited does not mean ChatGPT has described your page correctly, so read the answers you appear in.

Why one page is cited and not another is where documentation ends and research begins. The best-known study is Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024). The authors built their own generative engine, which fed the top five Google results for each query to a language model. They then tested whether rewriting a source changed how visible it was in the answers. Adding citations, quotations and statistics improved visibility in that setup, and results varied by subject. The paper also ran a smaller test on Perplexity.ai. It did not test ChatGPT search, which launched after the paper's final revision in June 2024. Treat it as evidence about generative engines in general, not a rulebook for ChatGPT.

So keep three kinds of claim apart: what OpenAI documents, what a study found under its own conditions, and what practitioners recommend from experience. Most advice on this topic mixes all three in one confident tone.

## What controls does a website owner have?

The documented control is crawler access. OpenAI's crawler page describes three user agents that matter here:

| User agent | What OpenAI says it does | What robots.txt does |
| --- | --- | --- |
| OAI-SearchBot | Surfaces websites in ChatGPT's search features | Sites opted out "will not be shown in ChatGPT search answers, though can still appear as navigational links" |
| GPTBot | Crawls content that may be used to train OpenAI's foundation models | Disallowing it signals your content should not be used for training |
| ChatGPT-User | Visits a page when a user's request needs it; does not crawl automatically | Robots.txt rules "may not apply"; it is not used to decide what appears in search |

The details OpenAI documents:

- **Each setting is independent.** You can allow OAI-SearchBot to appear in search while disallowing GPTBot.
- **Allow the bot and its IP addresses.** The help centre says that, to make a site eligible, you should allow OAI-SearchBot and make sure your host or CDN lets through traffic from OpenAI's published searchbot IP addresses (openai.com/searchbot.json). A firewall that blocks unfamiliar bots can undo a correct robots.txt.
- **Changes are not instant.** OpenAI says it can take around 24 hours after a robots.txt update for its search systems to adjust.

Allowing the crawler makes you eligible. It does not earn you a place in an answer. For the file-level rules across every AI crawler, see [AI crawlers and robots.txt](/ai-crawlers-robots-txt/), or the short version in [crawler access](/#crawler-access).

## How do you check whether your site appears?

There is no OpenAI console for this, so you check by hand and keep records. This is our recommended method, not an OpenAI one:

1. Write down the questions your customers actually ask.
2. Ask them in ChatGPT with Search turned on, and note whether a search ran, whether you were cited, and who was cited instead.
3. Check your server logs for OAI-SearchBot visits. Visits show the crawler can reach you. They do not show you are being cited.
4. Repeat the same questions on a regular schedule, because answers change with location, memory and time.

One check is a snapshot; a series of checks shows a trend. The guide on [how to measure AI visibility](/how-to-measure-ai-visibility/) sets out a fuller method, and [what is AI visibility](/what-is-ai-visibility/) explains the term.

## What nobody can promise

OpenAI's own words are "Placement is not guaranteed". No agency, consultant or tool can promise more than that. What you can do is let OAI-SearchBot in, make sure your pages are findable and worth citing, and measure honestly over time. The page-level work is covered in [how to rank in ChatGPT](/how-to-rank-in-chatgpt/).
