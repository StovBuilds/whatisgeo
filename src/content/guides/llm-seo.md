---
# scriptgrain: generation 89fca9a8-2cbb-4213-8f6b-1b0abdf135a9, voice match 0.78 (2026-10-18), then Claude edit + fact-check (page-pipeline item 695)
title: "LLM SEO: what it means and what to actually do"
seoTitle: "LLM SEO: What It Is and What Actually Works"
summary: "LLM SEO is another name for GEO: making your content findable, quotable and accurately described in AI answers. It builds on ordinary SEO, and nobody can guarantee inclusion."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "Once the basics are in place, the next question is whether ChatGPT, Claude, Gemini and Perplexity actually name and cite you, and this measures that."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic help centre: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Google: Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - label: "llmstxt.org: The /llms.txt file proposal"
    url: "https://llmstxt.org/"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "What is LLM SEO?"
    a: "It is the work of making your pages findable, quotable and accurately described in answers from AI tools such as ChatGPT, Perplexity, Claude and Google's AI features. It is another name for GEO, and it builds on ordinary SEO."
  - q: "Is LLM SEO different from GEO or AEO?"
    a: "No. LLM SEO, LLM optimisation, AEO and GEO are different labels for the same practice. Each label puts the stress somewhere slightly different, but the work is the same."
  - q: "Is SEO dead because of AI?"
    a: "No. Google's own documentation says pages appear as supporting links in AI Overviews and AI Mode by being indexed and eligible to show with a snippet, and that existing SEO fundamentals are still worthwhile."
  - q: "How do I do LLM SEO for my business?"
    a: "Make sure your pages are indexed, decide which AI crawlers to allow in robots.txt, put clear answers near the top of your pages, back your claims with named sources and describe your business the same way everywhere. Then check AI answers regularly over time."
  - q: "Can I guarantee ChatGPT will mention my site?"
    a: "No. You can let OpenAI's search crawler reach your pages and make them worth quoting, but no one outside OpenAI controls what an answer includes, and OpenAI offers no guarantee."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
In practice, LLM SEO means two jobs: letting AI search tools reach and understand your pages, and writing pages clear enough to quote. Most of that is SEO you may already be doing. The rest of this page sorts the usual tactics by how much evidence stands behind each one.

## What LLM SEO means (and the other names for it)

LLM SEO is the practice of making it more likely that AI tools find your pages, use them as sources and describe your business correctly. It is an extension of ordinary SEO, with no hidden layer of the web behind it.

You will see it under several labels: LLM optimisation, SEO for LLMs, answer engine optimisation (AEO) and generative engine optimisation (GEO). They all describe the same work. The fuller definition is in [what GEO is](/#what-is-geo), and how it relates to traditional search is covered in [GEO vs SEO](/#geo-vs-seo).

Most "LLM SEO" guides hand you a list of tactics and treat them all as equally proven. This page sorts them into three kinds of claim instead:

- **Platform-documented:** the company that runs the system has said so in its own documentation.
- **Research finding:** someone tested it, under conditions that limit how far it applies.
- **Sensible practice:** a recommendation. No platform requires it.

## Two different things people call LLM optimisation

"Optimising for an LLM" can mean two separate goals, and they need different expectations.

**Being retrieved and cited by live AI search.** Someone asks a question, the tool searches or fetches pages, and your page becomes one of the sources it uses or links to. You can influence this. Your pages need to be reachable by the right crawlers, indexed, and clear enough to quote.

**Being known from model training.** A model learns from a large body of text collected before it was released. You cannot submit your site to a training run, and you cannot see what went in. The platforms do let you opt out of training crawlers, but controlling access is a different thing from controlling what a model later says about you.

So most of the practical work is on the retrieval side. On the training side, about the most you can do is be described clearly and consistently across the web over time. Be sceptical of anyone who claims more control than that.

## What the platforms themselves document

The platforms have published more about this than many guides admit. Everything in this section is a documented platform statement.

**Google.** Google's "AI features and your website" page says that to be eligible as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to show in Google Search with a snippet, and that there are no additional technical requirements. It also says specific optimisation is not required for these features, while existing SEO fundamentals are still worthwhile. Its examples include allowing crawling in robots.txt and in your CDN or hosting setup, internal linking, and making sure important content is available as text.

**OpenAI.** OpenAI documents separate crawlers. Sites opted out of OAI-SearchBot will not be shown in ChatGPT search answers. Disallowing GPTBot signals that your content should not be used to train its foundation models. ChatGPT-User makes visits a user has asked for, and OpenAI says robots.txt rules may not apply to it. OpenAI also says each setting is independent of the others, so you can allow search and block training.

**Perplexity.** PerplexityBot is the crawler that surfaces and links websites in Perplexity's search results, and Perplexity says it is not used to crawl content for AI foundation models. Perplexity-User handles user actions, and Perplexity says that because a user requested the fetch, it generally ignores robots.txt rules.

**Anthropic.** ClaudeBot collects web content that may be used for model training. Claude-SearchBot indexes content to improve search results. Claude-User fetches pages when a person asks Claude something. Anthropic says its bots honour robots.txt, and that blocking Claude-SearchBot or Claude-User may reduce your visibility in search and user-directed answers.

**Google-Extended.** This is a robots.txt token that controls whether Google uses your content to train Gemini models and to ground Gemini answers. Google says it does not affect inclusion in Google Search and is not a ranking signal, so blocking it will not remove you from Search.

**robots.txt itself.** RFC 9309, the standard for robots.txt, says its rules are not a form of access authorisation. Crawlers are asked to honour them, and as the OpenAI and Perplexity notes above show, fetchers acting for a user may not. For setting these rules in practice, see [crawler access](/#crawler-access).

**llms.txt.** This is a proposal published at llmstxt.org: a Markdown file, usually at your site root, that gives AI agents a short summary and links to your key pages. The proposal itself does not say any major AI platform reads these files, and none of the platform documents above mention it.

## What the research says, and its limits

The best-known study is Aggarwal et al., "GEO: Generative Engine Optimization", accepted at KDD 2024. The authors built a benchmark of queries (GEO-bench) and tested nine ways of rewriting source content, then measured how visible each source was in generated answers.

What they reported:

- Adding quotations, adding statistics and citing sources did best among the methods tested.
- Keyword stuffing gave little or no improvement. The authors suggest that tactics that work in traditional search may not carry over.
- Which methods worked best varied by subject area.

The conditions matter. Their main generative engine was one they built themselves: gpt-3.5-turbo writing answers from the top five Google results. They also ran a smaller test on Perplexity.ai. They say the methods may need to change as these engines change, and that they did not measure effects on search rankings. These are results from a controlled experiment, not a measurement of ChatGPT, Google or Claude as they work today.

So treat the paper as a set of ideas worth testing. Quotations, figures and named sources also help human readers, so there is little to lose by using them where they are genuine. Do not read it as a promise that any particular edit will increase how often you are cited.

## What to do: sensible practice

Everything in this section is a recommendation. Where a platform or the research backs a step, that is noted.

| Step | Kind of claim |
|---|---|
| Get pages indexed and eligible for snippets | Platform-documented (Google) |
| Decide which search and training crawlers to allow | Platform-documented (OpenAI, Perplexity, Anthropic, Google) |
| Keep important content in text, not only in images or scripts | Platform-documented (Google) |
| Answer the question near the top of the page | Sensible practice |
| Back claims with named sources, quotes and real figures | Research finding, under the paper's conditions |
| Describe your business the same way everywhere | Sensible practice |
| Keep pages current and specific | Sensible practice |

1. **Get the basics right first.** Check that your important pages are indexed and nothing blocks them from showing with a snippet.
2. **Set crawler access on purpose.** Search crawlers and training crawlers are separate, so you can allow OAI-SearchBot, PerplexityBot and Claude-SearchBot while making your own decision about GPTBot, ClaudeBot and Google-Extended. Check your CDN or firewall too, since Google notes they can block crawling.
3. **Answer early.** Put the direct answer near the top, then the detail. A page that states its point plainly is easier to quote accurately.
4. **Source your claims.** Say where each figure comes from. It helps readers, and it matches what the GEO paper tested.
5. **Describe yourself consistently.** Use the same name, the same description of what you do and the same key facts on your site and your profiles. When those differ, an AI tool has conflicting material to work from.
6. **Keep pages specific.** Generic copy gives a system nothing distinctive to quote.

Most of this overlaps with good SEO, and that is intended. The wider approach is in the [principles](/#principles) section, and if you are starting from scratch, the [30-day plan](/#getting-started) puts these steps in order.

## What not to bother with, and claims to distrust

**Do not build a plan around llms.txt.** It is cheap to add, but nothing in the platform documentation says the major AI tools use it, so do not expect it to change anything.

**Do not believe guaranteed citations.** No one outside these companies controls what an AI answer includes, and the platforms themselves promise nothing.

**Distrust unsourced numbers.** If a guide says a tactic delivers a specific uplift, ask what was tested, on which system and under what conditions. If the figure comes from a vendor selling the service, treat it as that vendor's claim.

**Skip keyword stuffing.** It is old SEO advice, and the GEO paper found it did little in generated answers.

**Be wary of tricks.** A tactic that only works by gaming one system tends to stop working when that system changes. Pages that are genuinely useful hold up better.

## How to tell whether it is working

Measure what you can and be honest about the rest. Check that your pages are indexed. Look in your server logs for the documented crawlers by name. Ask AI tools the questions your customers ask, and note whether you are cited and whether you are described correctly.

AI answers vary from one run to the next, so a single check proves little. Repeat the same set of questions over time and look for patterns across many questions rather than any single result. The method is set out under [measuring progress](/#measurement).
