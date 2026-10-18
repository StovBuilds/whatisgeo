---
# scriptgrain: generation a688b27a-2183-42b8-84e4-0526ad4bef1d, voice match 0.78 (2026-10-18), then Claude edit + fact-check (page-pipeline item 703)
title: "Perplexity SEO: how to get cited in Perplexity, and what is actually documented"
seoTitle: "Perplexity SEO: How to Get Cited (What's Documented)"
summary: "Perplexity searches the web and cites its sources with numbered links. The one step it documents is letting PerplexityBot crawl your site. The rest is research or practice, and nobody can guarantee a citation."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "Once you have checked a few questions by hand, it tracks whether Perplexity and other assistants name and cite your company for your buyers' questions over time."
related: ["how-to-rank-in-chatgpt","how-to-rank-in-google-ai-overviews","what-is-generative-engine-optimization"]
sources:
  - label: "Perplexity: Perplexity Crawlers"
    url: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers"
  - label: "Perplexity Help Center: How does Perplexity work?"
    url: "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024), arXiv abstract"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "Is Perplexity good for SEO?"
    a: "It depends which meaning you have in mind. As a place to be cited, it is one more way readers can find you, with no guarantee attached. As a research tool, it is useful if you open its cited sources and check them."
  - q: "How do I get my website cited in Perplexity?"
    a: "Nobody can guarantee it. Perplexity's documented advice is to allow PerplexityBot in robots.txt and let its published IP ranges through your firewall. Beyond that, clear, current pages that answer the question directly are our recommendation."
  - q: "Does Perplexity follow robots.txt?"
    a: "Perplexity recommends allowing PerplexityBot in robots.txt if you want to appear in its search results. It says Perplexity-User, which fetches pages when a user asks a question, generally ignores robots.txt rules because a user requested the fetch. Under RFC 9309, robots.txt rules are requests and give no access control, so use a firewall for anything that must be blocked."
  - q: "What is the difference between PerplexityBot and Perplexity-User?"
    a: "PerplexityBot surfaces and links websites in Perplexity's search results. Perplexity-User visits a page when a user's question needs it and may link that page in the answer. Perplexity says neither is used to collect content for training AI foundation models."
  - q: "Is SEO dead now with AI?"
    a: "No. Perplexity describes searching the web and citing the pages it uses, so pages that can be crawled and clearly answer a question still matter. What has changed is that a reader may meet you inside a cited answer before they visit your site."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Perplexity works like a search engine that writes an answer, so the work starts where ordinary SEO starts: can its crawler reach your page, and does the page clearly answer the question someone asked? Perplexity does not publish ranking factors beyond that, so this page puts every claim into one of three groups. **Documented** means Perplexity or a standards body publishes it. **Researched** means a peer-reviewed paper tested it, under conditions we state. **Recommended** is our own advice, labelled as such.

## What people mean by Perplexity SEO

The phrase covers two jobs. Most people mean getting their pages cited in Perplexity's answers, and that is what most of this page covers. Some mean using Perplexity as a research tool for SEO work, which has its own short section near the end.

Many of the top results for this search are agency pages and listicles. They present ranking factors as fact and rarely say where those factors came from. Where a point below has no source behind it, we say so.

## How Perplexity finds and cites pages

Perplexity's help centre describes three steps: it interprets the question, searches the web, and then compiles the most relevant information into an answer. It says every answer includes numbered citations that link to the original sources, so readers can check the information. Follow-up questions keep the context of the conversation.

The public documentation stops there. Neither the help centre nor the crawler page says how Perplexity chooses which sources to cite, or in what order. You can make a page eligible to be found and read, but you cannot decide whether it gets cited. For how AI answers are put together more generally, see [how AI answers happen](/#how-it-works).

## What Perplexity documents about its crawlers

Perplexity's crawler page lists two user agents:

| User agent | What Perplexity says it does | robots.txt |
| --- | --- | --- |
| PerplexityBot | Surfaces and links websites in Perplexity's search results. Perplexity says it is not used to crawl content for AI foundation models. | Perplexity recommends allowing it in robots.txt so your site can appear in search results |
| Perplexity-User | Visits a page when a user's question needs it, and may link to that page in the answer. Perplexity says it is not used for web crawling or to collect content for training. | Because a user requested the fetch, Perplexity says it "generally ignores robots.txt rules" |

The full user-agent strings, as Perplexity publishes them:

```
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)
```

In robots.txt, you refer to them by the short names `PerplexityBot` and `Perplexity-User`.

Perplexity also publishes each agent's IP addresses as a JSON file, at perplexity.com/perplexitybot.json and perplexity.com/perplexity-user.json, and says these lists are updated regularly. For sites behind a web application firewall (WAF), it recommends allowing requests that match both the user agent and those IP ranges, and the page gives setup steps for Cloudflare and AWS WAF. Checking both is also how you tell a real Perplexity request from one that only borrows the name.

## Letting Perplexity in: robots.txt, PerplexityBot and Perplexity-User

The one step Perplexity documents is to allow PerplexityBot. Robots.txt is defined in RFC 9309, and three points from that standard matter here.

- **Rules are requests.** The RFC says crawlers "are requested to honor" the rules, and that the rules "are not a form of access authorization". Anything private needs a login or similar protection. A Disallow line will not keep it private.
- **A named group replaces the catch-all.** A crawler follows the group whose user-agent line matches its name, and the match ignores upper and lower case. It falls back to the `User-agent: *` group only if no group names it. So a `PerplexityBot` group replaces your catch-all rules for that bot. The two are not combined.
- **The most specific path wins.** Within a group, the Allow or Disallow rule with the longest matching path applies. If no rule matches, the path is allowed.

For example, a site that blocks crawlers by default but wants to appear in Perplexity's search results could use:

```
User-agent: *
Disallow: /

User-agent: PerplexityBot
Allow: /
```

The example only shows how the groups interact. Whether to allow the bot is your decision. Then work through these checks:

1. **Read your live robots.txt** at yourdomain.com/robots.txt. Look for a `PerplexityBot` group. If there is none, look for a catch-all `Disallow: /`, which then applies to it. Ready-made "block AI bots" templates often include PerplexityBot.
2. **Check your firewall or CDN.** Bot protection can turn away a crawler that robots.txt allows. Use Perplexity's published IP lists, as its documentation describes.
3. **Do not rely on robots.txt for Perplexity-User.** Perplexity says this agent generally ignores robots.txt, so restricting it takes firewall or server rules.
4. **Watch your server logs** for both user agents after any change.

Our [AI crawler access guide](/#crawler-access) covers the other platforms' bots.

## What research says about getting cited

The most widely quoted study is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024. It is one of the few studies that tested Perplexity directly, so its conditions are worth knowing.

**What they tested.** Nine ways of rewriting a page's text, including adding statistics, adding quotations, citing sources, simplifying the language, improving fluency and keyword stuffing.

**How they tested it.** Most results come from the authors' own generative engine. For each query, it took the top five Google results and had a language model write an answer from them. The queries came from GEO-bench, the authors' benchmark of 10,000 queries across 25 domains, and some of those queries were taken from Perplexity's Discover section. Visibility was measured with the authors' own metrics, partly scored by GPT-3.5. They then ran the same methods on Perplexity.ai itself.

**What they found.** In their setup, citing sources, adding quotations and adding statistics worked best. The authors report visibility gains of up to 40% on their own engine and up to 37% on Perplexity.ai. Keyword stuffing gave little or no improvement, and results varied by subject area.

**What it does not show.**

- "Visibility" is the authors' own measure of how much, and how prominently, an answer drew on a source it had already retrieved. It does not measure traffic or sales, and it says nothing about how to get retrieved in the first place.
- Perplexity has changed since 2024. The study tells you how things worked under its conditions at the time, and the results may not hold today.
- The gains came from adding genuine citations, quotations and figures. Making them up would be dishonest and would cost you readers' trust.

## Sensible practice (recommendations, not guarantees)

Perplexity documents none of the following, and none of it comes with a promise. These are our recommendations.

1. **Decide on crawlers deliberately.** Choose whether to allow PerplexityBot yourself. Do not let a template make the choice for you.
2. **Keep key content in server-rendered HTML.** Text that only appears after scripts run may never be seen by some crawlers.
3. **Answer the question near the top.** A page that gives its answer early is easier for people and for software to use.
4. **Cite your own sources.** It helps readers, and it matches one of the methods that did well in the study above.
5. **Keep facts current and consistent.** Out-of-date prices, opening hours or product details give any summary something wrong to repeat.
6. **Earn credible mentions elsewhere.** Perplexity searches the wider web, so what reputable sites say about you can end up in an answer. This is a reasonable bet, but Perplexity does not name it as a factor.

The reasoning behind these points is in our [GEO principles](/#principles).

## How to check whether Perplexity cites you

1. **List your buyers' real questions**, in the words they use.
2. **Ask each question in Perplexity and open the numbered citations.** Record the date, whether your site was cited, whether your business was named without a citation, and who was cited instead.
3. **Repeat with the same list later.** Treat each answer as one data point. A pattern across many questions tells you more.
4. **Check your server logs** for PerplexityBot and Perplexity-User. A visit does not mean a citation. If PerplexityBot never visits, check robots.txt and your firewall first.

To make this a regular routine, see [measuring progress](/#measurement).

## Using Perplexity as a tool for SEO work

This is the second meaning of the phrase. Perplexity's help centre lists features that suit research: numbered citations on every answer, follow-up questions that keep context, Pro Search for more in-depth answers with a choice of AI model (free users get a limited number each day), a Research mode that runs many searches and writes a report, and, on the Pro plan, tools for building reports and spreadsheets. In SEO work, people use these to research a topic before writing, to see which sources Perplexity cites for the questions they want to rank for, and to summarise competitors' pages. Features change, so check the help centre for current details.

One caveat, which is our practice advice: open the cited source and confirm the claim is actually there before using it in a brief or a client report. Any tool that summarises pages can get a summary wrong.

## What nobody can promise

Nobody outside Perplexity can promise you a citation, whether that is an agency, a consultant or a tool. Perplexity does not publish how it chooses sources, so anyone quoting a precise formula is guessing.

You can control three things: whether PerplexityBot can reach you, how clearly your pages answer questions, and whether your facts are accurate. If someone quotes a citation rate or a traffic figure, ask who measured it and how. If the figure comes from an agency, it is that agency's number. It is not a fact about Perplexity.
