---
# scriptgrain: generation 10e5859a-c0ec-49c0-9346-811d47369a36, voice match 0.81 (2026-10-18), then Claude edit + fact-check (page-pipeline item 709)
title: "AI crawlers and robots.txt: which bots exist, and what to allow or block"
seoTitle: "AI Crawlers and robots.txt: What to Allow or Block"
summary: "robots.txt lets you set a separate rule for each AI crawler. Vendors run different bots for training, search and user-requested fetches, so blocking one rarely blocks the others, and obeying the file is voluntary."
category: "technical"
ours:
  - product: "visibilitytoai"
    why: "Once the search bots can reach you, it tracks whether ChatGPT, Claude, Gemini and Perplexity actually name and cite your company for your buyers' questions."
related: ["how-to-rank-in-chatgpt","how-to-rank-in-google-ai-overviews","what-is-ai-visibility"]
sources:
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Google Search Central: Introduction to robots.txt"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro"
  - label: "OpenAI: Overview of OpenAI Crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Anthropic (Claude Help Center): Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Perplexity: Perplexity Crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Google: List of Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
  - label: "Google: Overview of Google crawlers and fetchers"
    url: "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Bing Webmaster Tools: How to create a robots.txt file"
    url: "https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec"
  - label: "Bing Webmaster Blog: New options for webmasters to control usage of their content in Bing Chat (September 2023)"
    url: "https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat"
faq:
  - q: "Does robots.txt stop AI crawlers?"
    a: "Only crawlers that choose to obey it. RFC 9309 says robots.txt rules are not a form of access authorisation, and some user-requested fetchers, such as Perplexity-User, say they generally ignore it. To actually refuse requests you need server, firewall or CDN rules."
  - q: "What is the difference between GPTBot and OAI-SearchBot?"
    a: "OpenAI says GPTBot crawls content that may be used to train its foundation models, while OAI-SearchBot surfaces websites in ChatGPT's search features. Each is controlled independently in robots.txt, so you can block one and allow the other."
  - q: "If I block GPTBot, will ChatGPT stop mentioning my site?"
    a: "Not according to OpenAI's documentation. Blocking GPTBot signals your content should not be used for training; ChatGPT search relies on OAI-SearchBot, which you control separately. Nobody can guarantee ChatGPT will mention you either way."
  - q: "Does blocking Google-Extended remove me from Google AI Overviews?"
    a: "No. Google says Google-Extended does not affect inclusion in Google Search, and AI Overviews and AI Mode are part of Search. Google points to Googlebot rules and the nosnippet, data-nosnippet, max-snippet and noindex controls for those features."
  - q: "How can I check whether AI bots are crawling my site?"
    a: "Search your server or CDN logs for the user-agent names the vendors document, and note which URLs they request. User-agent text can be faked, so check the request's IP address against the lists OpenAI, Anthropic and Perplexity publish."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
There is no single switch for "AI". OpenAI, Anthropic, Perplexity and Google each document separate crawlers for separate jobs, and each name gets its own group in your robots.txt. So decide bot by bot, based on what each one is for, then check your logs to see what actually arrives.

## One file, a separate decision per bot

Asking whether you want AI bots is too broad to answer. Ask what a particular bot does with your pages and whether you want that. A training crawler, a search crawler and a fetcher acting for one user asking one question are three different trades.

Two caveats before the detail. First, the bot names and behaviour below are what each vendor's own page said when we checked on 18 October 2026. Those pages change, and they are the authority, so treat this page as a snapshot and check them. Second, allowing a bot only makes you crawlable. OpenAI and Perplexity recommend allowing their search bots if you want to appear in their results, but none of the pages we read promises a citation in return.

## How robots.txt works, and what it cannot do

robots.txt is the Robots Exclusion Protocol, standardised as RFC 9309. The file must be called `/robots.txt` (all lowercase) and sit at the top level of a host, and it applies to that host only. Anthropic's help article makes the practical point: add the rules to every subdomain you want covered.

The file is made of groups. Each group starts with one or more `User-agent` lines naming a crawler, followed by `Allow` and `Disallow` rules for paths. Under RFC 9309, crawlers match their name case-insensitively, and when several rules match a URL, the most specific one (the longest path) wins.

What it cannot do matters as much:

- **It is not access control.** RFC 9309 says the rules "are not a form of access authorization". Google's guide says robots.txt "cannot enforce crawler behavior" and that it is up to each crawler to obey.
- **It is public.** The RFC's security section warns that listing paths in robots.txt exposes them and makes them discoverable. Do not use it to hide a private area. Put a login on it.
- **It controls crawling, not indexing.** Google says a page blocked in robots.txt can still be indexed if other pages link to it. To keep a page out of Google, use `noindex` or password protection.

## The three jobs AI bots do: training, search and user-requested fetching

1. **Training.** The crawler collects content that may be used to train the vendor's models.
2. **Search.** The crawler builds an index the vendor's assistant uses to find and link to pages in its answers.
3. **User-requested fetching.** A person asks a question or pastes a link, and the assistant fetches that page on the spot. These fetchers do not crawl the web automatically.

Here is how the documented names map to those jobs:

| Vendor | Training | Search | User-requested fetch |
| --- | --- | --- | --- |
| OpenAI | GPTBot | OAI-SearchBot | ChatGPT-User |
| Anthropic | ClaudeBot | Claude-SearchBot | Claude-User |
| Perplexity | None documented; Perplexity says PerplexityBot is not used to crawl for foundation models | PerplexityBot | Perplexity-User |
| Google | Google-Extended (a control token, also covers Gemini grounding) | Googlebot, which covers Search including AI Overviews and AI Mode | Not covered here |

Blocking a training bot says nothing about search. Blocking a search bot takes you out of that vendor's index even if you were happy to be there.

## Which crawlers each vendor documents

### OpenAI

OpenAI says each of its robots.txt settings "is independent of the others".

- **OAI-SearchBot** surfaces websites in ChatGPT's search features. Sites that opt out "will not be shown in ChatGPT search answers, though can still appear as navigational links". OpenAI says changes can take around 24 hours to take effect.
- **GPTBot** crawls content that may be used to train OpenAI's foundation models. Disallowing it signals that your content should not be used for training.
- **ChatGPT-User** visits pages when a user's request needs them. OpenAI says it does not crawl automatically, that "robots.txt rules may not apply", and that it is not used to decide what appears in search.
- **OAI-AdsBot** only visits landing pages submitted as ads on ChatGPT.

OpenAI publishes IP lists for OAI-SearchBot, GPTBot and ChatGPT-User.

### Anthropic

- **ClaudeBot** collects content that could be used for training. Blocking it signals that your future content should be left out of training data.
- **Claude-SearchBot** indexes content to improve Claude's search results. Anthropic says blocking it may reduce your visibility in those results.
- **Claude-User** fetches pages when a Claude user asks a question. Anthropic says blocking it stops Claude retrieving your pages for those requests, which may reduce your visibility for user-directed search.

Anthropic also says its bots honour the non-standard `Crawl-delay` rule, and it publishes a list of its crawler IP addresses.

### Perplexity

- **PerplexityBot** surfaces and links websites in Perplexity's search results. Perplexity says it is not used to crawl content for AI foundation models.
- **Perplexity-User** fetches pages when a user asks a question. Perplexity says that because a user requested the fetch, it "generally ignores robots.txt rules".

Perplexity publishes IP lists for both.

### Google

**Google-Extended** is a robots.txt token, not a separate crawler: Google crawls with its usual user agents and reads the token as a control. It decides whether content Google crawls may be used to train future Gemini models and for grounding in Gemini Apps and Grounding with Google Search on Vertex AI. Google says it does not affect inclusion in Google Search and is not a ranking signal.

AI Overviews and AI Mode are part of Search. Google's AI features guide says robots.txt rules for Googlebot are the control for Search crawling. To limit what Search shows from your pages, including in AI features, use `nosnippet`, `data-nosnippet`, `max-snippet` or `noindex`.

### Microsoft Bing

Bing's robots.txt guide covers Bingbot and lists no separate AI crawler name. In a September 2023 announcement about Bing Chat, Microsoft used robots meta tags rather than a robots.txt name: pages tagged `NOARCHIVE` would not be included in Bing Chat answers or used to train its models, and tagged pages would still appear in Bing search results. That post is from 2023, so check Bing's current documentation before relying on it.

## Sample robots.txt patterns (and what each one does)

These show the logic. Check every name against the vendor pages before you copy anything.

**Opt out of training but stay available to search bots.**

```
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
Disallow: /

User-agent: OAI-SearchBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
Allow: /
```

RFC 9309 allows several `User-agent` lines in one group. The first group asks the three training controls to stay off the whole site. The second states plainly that the search bots are welcome. This shows how the controls work independently. It is not advice to block training; that choice is yours.

**Slow one crawler down.**

```
User-agent: ClaudeBot
Crawl-delay: 1
```

`Crawl-delay` is not part of RFC 9309. Anthropic says it supports it, but do not assume other crawlers do.

## Common mistakes: blocking a search bot when you meant to block training, and wildcard rules

**Blocking by vendor instead of by job.** If you block every Anthropic or OpenAI name because you object to training, you also block the search bot and may drop out of that assistant's search results. Block the training name, and leave the search name alone if you want to be citable.

**Assuming the wildcard still applies.** Under RFC 9309, a crawler obeys the `User-agent: *` group only if no group names it. Once a bot has its own group, it ignores the `*` group completely. Bing's guide says the same about Bingbot. So in this file:

```
User-agent: *
Disallow: /checkout/

User-agent: OAI-SearchBot
Allow: /
```

OAI-SearchBot follows only its own group and may crawl `/checkout/`. If you want it kept out, repeat the `Disallow` line in its group.

**A blanket block under the wildcard.** `User-agent: *` with `Disallow: /` also blocks Googlebot and Bingbot, which takes you out of ordinary search as well as AI Overviews and AI Mode.

**Misspelt names.** A name with a typo matches no crawler, so the bot you meant falls back to the `*` group, or to no rules at all if there is none. Nothing warns you.

**Expecting robots.txt to stop user-requested fetchers.** OpenAI says its rules "may not apply" to ChatGPT-User, and Perplexity says Perplexity-User generally ignores them.

## Checking that your rules work: logs, testing and verifying bot identity

These are our recommendations; the vendors document the details they rely on.

1. **Load the file.** Open yourdomain.com/robots.txt in a browser and on each subdomain you care about.
2. **Validate it.** Bing Webmaster Tools has a robots.txt tester that shows how a given crawler would read your rules.
3. **Read your logs.** Server or CDN logs record each request's user agent. Search for the names above, see which URLs they request, and check whether a bot you blocked keeps fetching pages. OpenAI says its bots may add a `robots.txt` marker to the user agent when fetching the file itself. Google-Extended never appears in logs because it has no user agent of its own.
4. **Verify identity.** A user agent is just text and can be faked. OpenAI, Anthropic and Perplexity publish IP lists to check requests against. Google says its crawlers can be identified by user agent, source IP and reverse DNS.
5. **Give it time.** OpenAI mentions around 24 hours for search. Google says recrawling can take days to months.

For turning this into a regular routine, see [measuring progress](/#measurement).

## Blocking at server or CDN level when robots.txt is not enough

If logs show a bot ignoring your file, or you have content that must not be fetched at all, robots.txt is the wrong tool. Firewall, server or CDN rules actually refuse requests. Perplexity's documentation shows how to write firewall rules that match both the user agent and the published IP ranges. It uses them to allow its bots, but the same matching works for blocking.

Two cautions. Anthropic says blocking its IP addresses may not reliably opt you out, because it stops its bots reading your robots.txt, so keep the robots.txt rule as well. And bot protection can cut both ways: Google's AI features guide lists making sure your CDN or hosting allows crawling among its basics, and OpenAI and Perplexity ask you to allow their search bots' IP ranges. Check that a security setting is not turning away the search bots you meant to welcome. The home guide's [crawler access](/#crawler-access) section has the short version.

## How to decide: a short framework for small businesses

This is our recommendation, not a vendor requirement.

1. **Write down what you want.** Do you want to be findable and citable in AI assistants? Do you object to your content being used for training?
2. **Map each bot to its job** using the table above and the vendor pages.
3. **Allow the search bots if you want to be citable.** That makes you eligible to be found. It guarantees nothing. For the platform detail, see [how to rank in ChatGPT](/how-to-rank-in-chatgpt/) and [how to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/).
4. **Block training names only if that is your decision**, one name per line.
5. **Remember the fetchers.** Some user-requested fetchers do not follow robots.txt, so anything truly private needs a login.
6. **Check your logs**, then escalate to firewall or CDN rules only if a bot ignores you.
7. **Revisit now and then.** Vendors add and rename bots, and their pages say so first.

The reasoning behind this approach is in our [GEO principles](/#principles).
