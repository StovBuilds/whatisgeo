---
# scriptgrain: generation cdf4a63d-dedc-4ac3-b438-a1cdfe114ac5, voice match 0.85 (2026-10-18), then Claude edit + fact-check (page-pipeline item 706)
title: "What is llms.txt, and does it actually work?"
seoTitle: "llms.txt: What It Is, Examples and Does It Work?"
summary: "llms.txt is a proposed Markdown file that points AI agents to your key pages. It is not a web standard and no major AI search platform documents using it to pick citations, so it is cheap to add but unproven."
category: "technical"
ours:
  - product: "hilyt"
    why: "If you want AI tools to find an accurate, readable description of your business beyond a single llms.txt file, Hilyt publishes open AI-readable profiles."
  - product: "visibilitytoai"
    why: "To find out whether adding llms.txt or anything else changes how ChatGPT, Claude, Gemini and Perplexity name and cite you, VisibilityToAI measures it."
sources:
  - label: "llmstxt.org: The /llms.txt file, v2 (Jeremy Howard)"
    url: "https://llmstxt.org/"
  - label: "llmstxt.org: Changes in v2"
    url: "https://llmstxt.org/changes.html"
  - label: "Chrome Lighthouse: llms.txt audit"
    url: "https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "Sitemaps.org: Sitemaps XML format"
    url: "https://www.sitemaps.org/protocol.html"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Anthropic: Does Anthropic crawl data from the web?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "SE Ranking: Does llms.txt impact AI visibility and citations? (vendor research)"
    url: "https://seranking.com/blog/llms-txt/"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "What is an llms.txt file?"
    a: "It is a Markdown file at /llms.txt, or at a subpath, that gives AI agents a short overview of a site and links to the detail. Under the llmstxt.org proposal, an H1 with the site name is the only required part."
  - q: "Is llms.txt still used, and by whom?"
    a: "Many sites publish one, including AI companies for their own developer docs, and documentation platforms generate it automatically. Chrome's Lighthouse checks for it. None of OpenAI, Anthropic or Perplexity documents its crawlers reading it to decide citations."
  - q: "Does llms.txt really work for getting cited by ChatGPT or Perplexity?"
    a: "We found no controlled evidence that it does. An observational study by the SEO vendor SE Ranking, covering nearly 300,000 domains, found no correlation between having the file and being cited by AI systems."
  - q: "Does Google use llms.txt?"
    a: "Google's guidance for AI Overviews and AI Mode says you don't need to create new machine readable files, AI text files or markup to appear in them. A page needs to be indexed and eligible to show with a snippet, and Google says there are no additional technical requirements."
  - q: "Is llms.txt needed, and how is it different from robots.txt?"
    a: "It is not needed. robots.txt is an IETF standard (RFC 9309) that tells crawlers what they may access. llms.txt is an informal proposal that only describes your site, and no tool is obliged to read it."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
An llms.txt file is a plain Markdown index of your site, written for AI agents that fetch pages while they help someone. Whether it gets you cited by ChatGPT, Perplexity or Google's AI features is unproven: none of those platforms documents reading it for that purpose, and the largest analysis we found saw no link between having one and being cited.

Below, each claim is marked as one of three kinds: what the proposal says, what platforms have documented, and what is only our recommendation.

## What llms.txt is, and who proposed it

The proposal lives at llmstxt.org. Jeremy Howard wrote it, first published it on 3 September 2024 and revised it as version 2 in August 2026. It starts from the point that web pages are built for people: navigation, ads and scripts get in the way when an agent wants clean text, and most sites are too big to fit in a model's context window. So the proposal suggests one small Markdown file that gives agents a short overview and links to the detail.

Three points from the proposal itself are worth knowing:

- **Where it goes.** At `/llms.txt`, or at any path such as `/docs/llms.txt`. A file covers the pages under its path, and where more than one applies, agents should use the most specific.
- **Markdown copies of pages.** It also proposes that useful pages offer a clean Markdown version at the same URL, either with `.md` added (`page.html.md`) or with the extension swapped (`page.md`). Version 2 adds standard link relations so agents can find them: `rel="alternate" type="text/markdown"` for a page's Markdown copy and `rel="describedby"` for the llms.txt file that covers it.
- **How it is meant to be read.** Agents are expected to view or search the file, then follow the relevant links. Version 1 described a tool for expanding the file into one big context; version 2 drops it. The proposal text we read does not define a separate llms-full.txt file.

Its status matters. The proposal calls itself an informal overview, open for community input and hosted on GitHub. It has not been through a standards body. Compare robots.txt, which is an IETF Standards Track document, RFC 9309.

## What the proposal says the file should contain

The format is small and ordered. In sequence, a file contains:

1. An optional byte order mark.
2. An H1 with the name of the project or site. This is the only required part.
3. A blockquote with a short summary holding the key information needed to understand the rest.
4. Zero or more Markdown sections of any type except headings (paragraphs, lists) with more detail.
5. Zero or more sections under H2 headings, each a "file list": a Markdown list where every item has a `[name](url)` link, optionally followed by `:` and a note.

By convention, a section called "Optional" holds secondary links an agent can skip when it needs a shorter context. Since version 2 it carries no special mechanical meaning; it is simply a useful label.

## An annotated llms.txt example

This is our own illustrative sample for a made up business. It is an example and does not describe any real site.

```markdown
# Harbour Bakery

> Independent bakery in one location selling bread, pastries and
> celebration cakes. Custom cake orders need two days' notice.

Prices and opening hours change seasonally; the linked pages are
the current source.

## Key pages

- [Menu](https://example.com/menu.md): current bread and pastry list with prices
- [Custom orders](https://example.com/orders.md): how to order a cake and the notice needed
- [Opening hours](https://example.com/hours.md): weekly hours and holiday closures

## Optional

- [Our story](https://example.com/about.md): background on the bakery
```

Reading it line by line:

- **`# Harbour Bakery`** is the H1, the one required element.
- **The blockquote** is the summary an agent reads first, so it carries the facts that matter most.
- **The plain paragraph** is the optional detail section. Here it tells the agent which pages to trust for things that change.
- **`## Key pages`** is a file list. Each link has a note after the colon so an agent knows what the page holds before fetching it. The links point to `.md` copies, as the proposal suggests; if your site has no Markdown versions, ordinary page URLs still fit the format.
- **`## Optional`** holds material an agent can skip.

Notice what the file does not do. It grants no permissions, blocks nothing and carries no ranking signal. It only describes.

## llms.txt vs robots.txt vs sitemap.xml

| File | What it does | Status | Does anything have to follow it? |
|---|---|---|---|
| robots.txt | Tells crawlers which parts of a site they may access | IETF standard, RFC 9309 | Crawlers that follow the standard honour it, though the RFC says its rules "are not a form of access authorization" |
| sitemap.xml | Gives search engines details about your pages | Sitemaps protocol (sitemaps.org) | No; the protocol says search engines "may use" the information |
| llms.txt | A curated overview for agents, used on demand while answering | Informal proposal | No; nothing obliges any tool to read it |

The proposal itself says llms.txt is meant to sit alongside the other two: a sitemap lists everything indexable, while llms.txt is a short, curated path that can also include external links. If your real question is whether AI crawlers can reach your pages at all, that is a robots.txt and crawler question, covered in [crawler access](/#crawler-access).

## Is llms.txt actually used? What is documented and what is not

"Used" can mean three different things, and the evidence differs for each.

**Sites publishing the file.** The proposal's author says thousands of sites now publish one. The proposal lists documentation platforms and CMS tools that generate the file automatically, including Mintlify, GitBook, Yoast SEO and Wix. That adoption figure is the author's own claim. AI companies publish llms.txt files for their own developer documentation; OpenAI's and Perplexity's crawler documentation pages both point readers to an llms.txt index. The proposal says the heaviest use is software documentation, where coding agents follow the files to find API references.

**Tools checking for it.** Chrome's Lighthouse has an llms.txt audit among its agentic browsing checks. It describes the file as "an emerging convention" that gives LLMs and AI agents a machine readable summary of a site. The audit fails only if the server errors when Lighthouse requests the file. A 404 makes the audit not applicable, because the file is "optional at the moment". The page does not say that any AI system reads the file.

**AI answer systems reading your file to decide what to cite.** This is where the documentation runs out. We read each company's crawler documentation:

- **OpenAI** describes OAI-SearchBot (ChatGPT search), GPTBot (training) and ChatGPT-User (user actions), all managed through robots.txt. It does not mention llms.txt as something its crawlers read.
- **Anthropic** describes ClaudeBot, Claude-User and Claude-SearchBot, also controlled through robots.txt. No mention of llms.txt.
- **Perplexity** describes PerplexityBot and Perplexity-User, with robots.txt and published IP ranges. No mention of llms.txt for crawling.

Absence from documentation is not proof that nobody reads the file. An agent fetching pages for a user could open it. What we can say is that none of these companies documents using it, so any claim that they do needs its own source.

## Does llms.txt work? What the evidence does and does not show

The best evidence we found is a vendor study. SE Ranking, an SEO software company, analysed nearly 300,000 domains and found that 10.13% had an llms.txt file. It then compared that with how often each domain appeared as a source in sampled LLM responses. Using Spearman correlation, an XGBoost model and SHAP analysis, it reported no correlation between AI citations and having the file. It also found its model became more accurate when the llms.txt variable was removed.

Read that with its limits. It is SE Ranking's own research. It is observational: sites chose whether to add a file, and nobody tested before and after. The article we read does not name which AI systems were sampled, and it calls its findings context dependent. It does not prove the file has no effect. What it does mean is that we could find no published evidence of a benefit.

The best known research on generative engine optimisation, Aggarwal et al.'s GEO paper (accepted to KDD 2024), does not settle the question either way. It tested ways of changing page content on its own benchmark, GEO-bench, and reported visibility gains of up to 40% in that setup. It did not test llms.txt.

We found no controlled experiment with published results showing that adding llms.txt changes citations.

## llms.txt and Google

Google's guidance on AI features in Search (AI Overviews and AI Mode) is direct: "You don't need to create new machine readable files, AI text files, or markup to appear in these features." It also says there is no special schema.org structured data to add. To be eligible, a page must be indexed and eligible to be shown in Google Search with a snippet, and "there are no additional technical requirements".

The page does not name llms.txt, but its wording covers it, since it says no AI text file is needed. So for Google, the documented route is ordinary indexing, which is the same ground covered in [GEO vs SEO](/#geo-vs-seo).

## Should you add one? A sensible-practice checklist

This section is our recommendation; no platform requires any of it. For most small sites an llms.txt file is a short job and costs nothing to host, so adding one is reasonable as long as you expect nothing measurable from it.

1. **Serve it at `/llms.txt`** as plain text and check it returns a 200 status. A 404 is harmless; a server error is what fails the Lighthouse audit.
2. **Start with the H1**, then a blockquote summary with the facts a stranger most needs (what you do, where, for whom).
3. **List only the pages you would want read first**, each with a one line note after a colon.
4. **Use full, canonical URLs** that resolve without redirects or logins. Click every one.
5. **Put secondary links under `## Optional`.**
6. **Keep it in step with the site.** Wrong opening hours or a dead link in an llms.txt file is worse than having no file.
7. **Check that robots.txt is not blocking the pages you list.** The file cannot help an agent reach pages it is not allowed to fetch.
8. **Test it the way the proposal suggests:** give an AI assistant only your llms.txt and ask it questions about your business. If the answers are wrong, fix the summary.
9. **Do not pay for a service that promises citations from it.** Nobody can promise that.

Writing the file has one benefit you can count on: it forces you to decide which pages matter and to say in two lines what you do. That clarity is worth having on your actual pages too.

## What to do first if AI visibility is the goal

Do the documented things before the speculative one.

1. **Make sure the right crawlers can reach you.** Every platform above documents robots.txt controls, so start with [crawler access](/#crawler-access).
2. **Understand how assistants find and use pages**, explained in [how AI answers happen](/#how-it-works).
3. **Get the content right.** Clear, specific, well structured pages are what the GEO research worked on; see [principles](/#principles).
4. **Measure.** Check how AI assistants describe you before and after any change, including adding llms.txt, so you work from your own results instead of someone else's claim. [Measuring progress](/#measurement) covers how.

llms.txt can sit alongside all of that. It should not come first.
