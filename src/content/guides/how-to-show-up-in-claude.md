---
# scriptgrain: generation 6523d09b-a7c3-4742-85b3-06576c35e65c, voice match 0.78 (2026-10-18), then Claude edit + fact-check (page-pipeline item 729)
title: "How do you show up in Claude? What is documented, what is research, and what is guesswork"
seoTitle: "How to Show Up in Claude: What Is Documented"
summary: "Claude names businesses from its training data or, when it searches the web, from live pages it cites. Anthropic documents its crawlers and search, but nobody can guarantee a mention."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "Once you have run a few buyer questions by hand, it tracks over time whether Claude and other assistants name and cite your company for those questions."
related: ["how-to-rank-in-chatgpt","perplexity-seo","ai-crawlers-robots-txt"]
sources:
  - label: "Claude Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Claude Help Center: Enable and use web search"
    url: "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
  - label: "Claude Help Center: How up-to-date is Claude's training data?"
    url: "https://support.claude.com/en/articles/8114494-how-up-to-date-is-claude-s-training-data"
  - label: "Claude Platform Docs: Web search tool"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024), arXiv abstract"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full paper (HTML, v3)"
    url: "https://arxiv.org/html/2311.09735v3"
faq:
  - q: "Does Claude search the web?"
    a: "Yes. Anthropic's help centre says Claude can search the live web and that every search response includes citations. In the standard chat, users turn it on from the \"+\" menu, and Team and Enterprise owners must first enable it for the workspace. Anthropic says the new Claude experience has no toggle and searches when it helps."
  - q: "How do I get my website cited by Claude?"
    a: "Nobody can guarantee it. The documented step is to let Claude-SearchBot and Claude-User reach your pages through robots.txt. Clear, consistent pages that answer buyers' questions directly are our recommendation."
  - q: "Which Anthropic crawlers should I allow in robots.txt?"
    a: "Anthropic lists three: ClaudeBot (training), Claude-User (fetching pages when users ask questions) and Claude-SearchBot (improving search results). Anthropic says blocking either of the last two may reduce your visibility in Claude's search answers. Blocking ClaudeBot signals that your future content should be kept out of training."
  - q: "Is there such a thing as Claude SEO?"
    a: "As a label for this work, yes. It is not a separate discipline: Anthropic documents no ranking factors, so the job is the same as for other assistants. Be reachable by the right crawlers, be clear and be worth quoting."
  - q: "How can I check whether Claude mentions my business?"
    a: "Ask Claude a fixed set of buyer questions in fresh chats, several times, with web search on (and off where you can). Log whether you are named or cited and who else appears. Repeat over time and after any site change."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Claude can mention you through two routes: what a model learned in training, and what it finds when it searches the live web. Anthropic documents the crawlers behind both routes and how to control them with robots.txt. It publishes nothing about how Claude chooses which businesses to name. So this page labels every claim. **Documented** means Anthropic or a standards body publishes it. **Researched** means a peer-reviewed paper tested it, under conditions we state. **Recommended** is our own advice.

## Two ways Claude can mention you: training data and web search

**Training data.** Anthropic's help centre says each Claude model has a knowledge cutoff, and that models "may not be aware of events or information that occurred after their respective cutoff dates." So if you rename a service or change your prices today, Claude's built-in knowledge will not reflect it. That only changes when a model trained on later data comes out, and you have no way to request that.

**Web search.** Claude's help centre says that when you ask about topics that benefit from current information, Claude "invokes a search tool" to ground its answer in content from the live web, and that every response includes citations. It describes those as direct citations to sources, source links for further reading, and relevant quotes where appropriate. With web search on, Claude can also fetch a specific page when a user pastes its URL.

How search gets switched on depends on the account:

- In the standard chat, a user turns on "Web search" from the "+" menu, and can turn it off again.
- On Team and Enterprise plans, an Owner or Primary Owner must first enable web search for the whole workspace before members can use it.
- Anthropic says that in "the new Claude experience" there is no toggle, and Claude searches the web when it helps.

Developers building on Anthropic's API get a separate web search tool. Its documentation says Claude decides when to search, the response includes cited sources, and developers can restrict results with `allowed_domains` or exclude sites with `blocked_domains`. It says Claude tends to search for things that change, including "information about specific organizations, people, or products that might have changed." So an app built on Claude may never be able to see your site, whatever you do. That limit is set by whoever built the app.

The practical point: the training route is slow and outside your control, while the search route reads your pages as they are now. That makes search the route your site changes can affect.

## What Anthropic documents about its crawlers

Anthropic's help page on web crawling lists three bots. This table states only what that page says.

| Bot | What Anthropic says it does | What blocking it does, per Anthropic |
| --- | --- | --- |
| ClaudeBot | Collects web content that could potentially contribute to training its models | Signals that your site's future material should be excluded from training datasets |
| Claude-User | Accesses websites when individual users ask Claude questions | Stops Claude retrieving your content in response to a user query, which "may reduce your site's visibility for user-directed web search" |
| Claude-SearchBot | Navigates the web to improve the quality of search results | Stops Anthropic indexing your content for search, which "may reduce your site's visibility and accuracy in user search results" |

The same page says Anthropic's bots honour robots.txt directives, support the non-standard `Crawl-delay` extension, and will not try to bypass CAPTCHAs. You have to add rules for every subdomain you want to cover. Anthropic also warns that blocking its IP addresses "may not work correctly" as an opt-out, because that stops it reading your robots.txt. It publishes a list of its crawler IP addresses so you can check whether a visit really came from Anthropic.

The split means you can choose separately. A site can block ClaudeBot (keeping future content out of training) and still allow Claude-SearchBot and Claude-User (staying reachable for search). Whether that trade suits you is your decision. Anthropic does not say that blocking ClaudeBot affects search.

On robots.txt itself, RFC 9309 is the standard. It says crawlers "are requested to honor" the rules, and that the rules "are not a form of access authorization." Rules sit in groups, one per user agent, and a crawler follows the group that matches its name. If no group matches, it follows the `*` group, if there is one. So a rule for ClaudeBot says nothing about Claude-SearchBot, but a blanket `*` rule can catch all three. For writing the rules, see our guide to [AI crawlers and robots.txt](/ai-crawlers-robots-txt/).

## What you can control on your own site

**Crawler access (documented).** This is the one lever Anthropic describes. Check your robots.txt for a `User-agent: *` group with `Disallow: /`, and for old rules that block bots by name. Either can shut out Claude-SearchBot and Claude-User without anyone meaning to. Check every subdomain too, as Anthropic's instructions apply per subdomain. Our [crawler access](/#crawler-access) section covers the basics for all the main AI crawlers.

**Page content (recommended).** Anthropic publishes nothing about what makes a page more likely to be cited, so the points below are our advice.

1. Describe your business in one plain sentence on your home and about pages: what you do, for whom, and where.
2. Use the same business name and service names everywhere you appear, on your own site and elsewhere online.
3. Put the direct answer to a buyer's question near the top of the page that covers it, then add the detail.
4. Make sure the important text is in the page's HTML and does not depend on scripts or images to appear.

None of these guarantees a mention. They make your pages easier to find, read and quote.

## Which parts are research and which are practice

The main research here is GEO: Generative Engine Optimization by Aggarwal and colleagues, accepted to KDD 2024. The authors built GEO-bench, a benchmark of 10,000 queries. They tested content changes on a generative engine they set up themselves, which answered from the top five Google results for each query, and repeated the tests on Perplexity.ai. Adding citations, quotations from relevant sources and statistics improved visibility in their tests. They also found the effect varied by domain.

Its limits matter. Claude was never tested, the engine was the researchers' own, and visibility was measured with their own metrics. Treat it as evidence that content changes can affect citations in that setting. It does not show that the same edits will work in Claude.

Everything else on this page, including the content advice above and the checking method below, is practice. It is sensible practice, and it is labelled as advice.

## Why "ranking in Claude" is the wrong mental model

A search engine returns an ordered list, and you can track your position in it. Claude writes an answer, and nothing in Anthropic's documentation describes a ranked list you could climb. The same question can produce different wording and different names from one run to the next, and the API documentation says developers can steer, through their system prompt, how readily Claude searches.

"Claude SEO" is a fair label for this work, and we use it that way. It is the same job as for other assistants: be reachable, be clear, and be worth quoting. If you have read our guides on [how to rank in ChatGPT](/how-to-rank-in-chatgpt/) or [Perplexity SEO](/perplexity-seo/), the approach will look familiar. What changes is the crawler names and how search is switched on.

## How to check whether Claude names you

The most direct check is to ask Claude yourself, in a fixed way. This method is our recommendation.

1. Write a short list of questions a real buyer would ask when choosing a business like yours (we suggest eight to twelve). Fix the wording and do not change it.
2. Ask each question in a fresh chat with web search on. Where your account allows it, also ask with web search off, so you can see what Claude says from training alone.
3. Log the date, the model, whether search ran, whether you were named, whether your site was cited, which competitors appeared, and how Claude described you.
4. Run the full set several times, as one answer proves little when answers vary.
5. Repeat on a regular schedule and after any change to your site or robots.txt, then compare the logs.

For a fuller method across assistants, see [how to measure AI visibility](/how-to-measure-ai-visibility/) and our notes on [measuring progress](/#measurement).

## What to do in what order

1. **Access first.** Read Anthropic's crawler page, then check robots.txt on every subdomain so Claude-SearchBot and Claude-User are not blocked by accident. Decide on ClaudeBot separately.
2. **Then the page basics.** Write a plain description of what you do, use consistent names, and give direct answers to buyers' questions.
3. **Then a baseline.** Run your fixed question set and log the results before you change anything else, so you have something to compare against.
4. **Then repeat.** Rerun the set after changes and over time. A wider [AI visibility audit](/ai-visibility-audit/) looks at the same questions across several assistants, and [how to improve AI visibility](/how-to-improve-ai-visibility/) picks up from there.

Doing it in this order means you never spend time polishing a page that Claude's search bots cannot reach.
