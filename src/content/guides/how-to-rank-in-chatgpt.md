---
# scriptgrain: generation 3e938d36-5b77-4f58-8915-be333783dbeb, voice match 0.79 (2026-10-18), then Claude edit + fact-check (page-pipeline item 699)
title: "How do you rank in ChatGPT? What is documented, what is research, and what is guesswork"
seoTitle: "How to Rank in ChatGPT: What Is Actually Documented"
summary: "ChatGPT has no ranking to climb. When it searches the web it picks and cites sources; you can improve your odds by letting OAI-SearchBot in and publishing clear, findable pages, but nobody can guarantee a mention."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "Once you have checked a few questions by hand, it tracks whether ChatGPT and other assistants name and cite your company for your buyers' questions over time."
sources:
  - label: "OpenAI: Overview of OpenAI Crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "OpenAI Help Center: Searching the web with ChatGPT"
    url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024), arXiv abstract"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
faq:
  - q: "How do I get my website to show up in ChatGPT answers?"
    a: "You can make your site eligible and improve your odds, but you cannot force it. OpenAI says to allow OAI-SearchBot in robots.txt and let its published IP addresses through your host or CDN. After that, clear pages that ordinary search can find give ChatGPT search something to cite."
  - q: "Does blocking GPTBot stop me appearing in ChatGPT search?"
    a: "Not according to OpenAI. Its crawler documentation says each robots.txt setting is independent, and gives the example of allowing OAI-SearchBot to appear in search results while disallowing GPTBot so content is not used for training."
  - q: "How can I tell if ChatGPT is mentioning my business?"
    a: "Ask it your buyers' real questions and record whether it searched, whether it named you, whether it cited your site and who it named instead. Repeat the same questions over time, because a single answer tells you little."
  - q: "Is SEO for ChatGPT different from normal SEO?"
    a: "It overlaps a lot. OpenAI says ChatGPT search sometimes uses other search providers, so being findable in ordinary search still matters, and there is one extra crawler to allow: OAI-SearchBot. The research on writing for AI answers is early and was not done on ChatGPT."
  - q: "Can I pay to rank higher in ChatGPT?"
    a: "OpenAI's documentation mentions ads on ChatGPT, but nothing we read says paying changes which sources ChatGPT search cites. OpenAI's help centre says placement in search results is not guaranteed, so be wary of anyone who sells guaranteed placement."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
"Rank" is a search engine word. Google shows an ordered list of results. ChatGPT gives one answer, sometimes with citations, and OpenAI's own help centre says that placement in its search results is not guaranteed. A better question is what makes your site eligible to be cited, and what improves the odds once it is.

Most of the top results on this topic are agency and vendor listicles: confident tips with little sourcing. This page puts each tip in one of three groups. **Documented** means OpenAI publishes it. **Researched** means a peer-reviewed paper tested it, and we say under what conditions. **Recommended** is our own advice, labelled as such.

## Two ways ChatGPT can mention you: training and search

ChatGPT can answer from what its model learned in training, or it can search the web first. OpenAI's help centre says ChatGPT may search automatically when a question would benefit from current information, and users can also choose Search themselves. Responses that use web search may include citations, and a **Sources** view lists the cited pages and other relevant links.

This split matters because only the search route gives your page a citation someone can click. Content can also reach a model through training, which OpenAI's GPTBot crawler collects for. That route is slow and you cannot see it: you have no way to check what a model learned from you, or when. If you want a named, linked mention, prepare for the search route. For the wider picture of how AI answers are put together, see [how AI answers happen](/#how-it-works).

## What OpenAI documents

OpenAI's crawler page lists the user agents it uses and what each one is for:

| User agent | What OpenAI says it does | What robots.txt does |
| --- | --- | --- |
| OAI-SearchBot | Surfaces websites in ChatGPT's search features | Sites that opt out "will not be shown in ChatGPT search answers", though they can still appear as navigational links |
| GPTBot | Crawls content that may be used to train OpenAI's foundation models | Disallowing it signals that your content should not be used for training |
| ChatGPT-User | Visits a page when a user's request needs it; it does not crawl automatically | OpenAI says robots.txt rules "may not apply", and this agent is not used to decide what appears in search |
| OAI-AdsBot | Checks landing pages submitted as ads on ChatGPT | Only visits pages submitted as ads |

Three more documented points matter here:

- **Each setting is independent.** OpenAI's example is a site that allows OAI-SearchBot so it can appear in search results, while disallowing GPTBot so its content is not used for training.
- **Changes are not instant.** OpenAI says it can take around 24 hours after a robots.txt update for its search systems to adjust.
- **Eligibility has two parts.** The help centre says that to make a site eligible, you should allow OAI-SearchBot to crawl it and confirm that your host or content delivery network (CDN) allows traffic from OpenAI's published search bot IP addresses.

On ranking itself, OpenAI says only that ChatGPT "ranks search results using multiple factors intended to help users find relevant, reliable information" and that placement is not guaranteed. It does not publish those factors. Anyone selling a ChatGPT "ranking formula" is guessing, whatever they call it.

## Step 1: make sure OAI-SearchBot can reach you

This is the one step OpenAI documents directly, so do it first.

1. **Read your robots.txt.** It lives at the root of your domain (yourdomain.com/robots.txt). Look for a group naming `OAI-SearchBot`, and for a catch-all `User-agent: *` group with `Disallow: /`. Templates that block every AI crawler at once often catch OAI-SearchBot along with the training bots.
2. **Decide on each bot separately.** A site that wants to appear in ChatGPT search but keep its content out of training might use:

```
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /
```

   That choice is yours. This example shows the two settings working independently. It is not a recommendation to block training.
3. **Check your host or CDN.** Bot protection or firewall rules can turn away a crawler that robots.txt allows. OpenAI publishes the search bot's IP ranges at openai.com/searchbot.json and asks that they be allowed.
4. **Allow around a day** for OpenAI's search systems to pick up a change, as its documentation says.

One caveat about robots.txt in general. RFC 9309, the standard behind it, says its rules "are not a form of access authorization". Listing a path in robots.txt also makes that path public. If something must stay private, protect it with real access control, such as a login. Our guide to [AI crawler access](/#crawler-access) covers the other platforms' bots.

## Step 2: be easy to find and read in ordinary search

OpenAI's help centre says ChatGPT search sometimes works with other search providers. It usually rewrites the user's question into one or more targeted queries and sends those to the provider. The article lists Microsoft's privacy statement among the providers' policies. Our reading, which OpenAI does not state in so many words, is that pages ordinary search engines can find and understand give this process more to retrieve.

That makes the groundwork familiar: pages that can be crawled and indexed, a clear title and topic for each page, and important text in the HTML itself rather than loaded later by scripts. Where this overlaps with traditional SEO and where it differs is covered in [GEO vs SEO](/#geo-vs-seo).

## What research suggests about content that gets cited

The study most often quoted here is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024. Its conditions shape what you can take from it.

**What they tested.** Nine ways of rewriting a source's text: making it more authoritative in tone, adding statistics, keyword stuffing, citing sources, adding quotations, simplifying the language, improving fluency, adding unique words and adding technical terms.

**How they tested it.** The authors built their own generative engine. For each query it fetched the top five Google results, and a language model wrote an answer from them. The queries came from GEO-bench, their benchmark of 10,000 queries drawn from nine sources across 25 domains. They measured "visibility" with their own metrics: how much of the answer drew on a source and how prominently, plus a subjective impression score judged by GPT-3.5. They also repeated the methods on Perplexity.ai.

**What they found.** In their setup, citing sources, adding quotations and adding statistics did best. The authors' headline is a visibility boost of up to 40% on their metric. Improving fluency and readability also helped. Keyword stuffing, a classic SEO tactic, gave little or no improvement. The authors also say results varied by domain.

**What it does not show.**

- It did not test ChatGPT. Do not treat "works in ChatGPT" as a finding of this paper.
- It measured how visible a source was among five pages already retrieved. It does not tell you how to get retrieved in the first place, which is the job of Steps 1 and 2.
- "Visibility" is the authors' own measure, partly scored by another language model. It does not measure traffic or sales.
- Generative engines change often, so a 2024 benchmark result is evidence, not a lasting rule.

The reasonable takeaway is modest. How a page is written can affect whether a generative engine uses it. Adding real, sourced statistics and quotations is worth considering. Making numbers up to game this would be dishonest, and it would undermine trust in your page.

## Sensible practice, labelled as recommendation

OpenAI does not document the points below, and the paper did not test them on ChatGPT. They are our advice.

1. **Write pages that each answer one question.** A page with one clear job is easier for a reader to use and easier for a search system to match to a query.
2. **Keep key facts in plain text.** Prices, services, locations and opening hours should sit in the page's HTML, not only in images or content loaded by scripts.
3. **Keep facts consistent.** Your site and your profiles elsewhere should describe what you do in the same way. Contradictions confuse people first and machines second.
4. **Test, then record what you find.** See the next section.

None of this is clever, and it helps human readers whether or not a model ever cites the page. The reasoning behind these points is set out in our [GEO principles](/#principles).

## What you cannot control, and claims to ignore

You cannot control whether ChatGPT decides to search for a given question, which sources it picks or how it weighs them. Answers also vary by user. OpenAI says ChatGPT may use a person's approximate location and, if memory is turned on, their saved memories when rewriting a search query.

Treat these claims as red flags:

1. **A guaranteed mention or position.** OpenAI itself says placement is not guaranteed.
2. **Precise percentages or timelines with no named study.** If you are not told who measured it and how, the number tells you nothing.
3. **"Proven in ChatGPT" claims based on research done elsewhere.** The GEO paper is useful, but it is not a ChatGPT study.
4. **"Official" tips you cannot find on OpenAI's own pages.**
5. **Paid placement in the answer itself.** OpenAI documents ads on ChatGPT, but nothing we read says that buying ads changes which sources ChatGPT search cites.

If someone quotes a vendor's study, attribute it to that vendor and ask what it is selling.

## How to check where you stand, by hand

You do not need a tool for a first look.

1. **List your buyers' real questions**, the ones that come in by phone, email and sales calls, in their words.
2. **Ask each one in a fresh conversation.** OpenAI says people who are not signed in can also use web search. That lets you check without your own memory shaping the query. Location still applies, so note where you ran the check.
3. **Record the same fields each time:** date, question, whether ChatGPT searched (a Sources list appears), whether it named your business, whether it cited your site, and which competitors or sites it named instead.
4. **Open the cited sources.** OpenAI's help centre warns that citations can be incomplete, outdated or wrong, and you may find ChatGPT describing you from someone else's out-of-date page.
5. **Repeat with the same list later.** Answers vary between runs, so one check proves little. A pattern across many questions tells you more.

To turn this into a regular routine, see [measuring progress](/#measurement).

## Where to go next

Start with Step 1, because it is quick and it is the one thing OpenAI documents as a requirement. Then run the hand check, so you know where you stand before you change any content. Changes to robots.txt, your CDN rules or your pages can then be judged against that record, not against a vendor's promise.
