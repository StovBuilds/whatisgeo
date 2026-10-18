---
# scriptgrain: generation 7513daa4-8c8c-455c-b440-796250ec5f46, voice match 0.77 (2026-10-18), then Claude edit + fact-check (page-pipeline item 697)
title: "What is AI visibility?"
seoTitle: "What is AI visibility? A plain-English definition"
summary: "AI visibility is how often, and how accurately, AI answer tools mention, cite or describe your business when people ask relevant questions. You can check it and improve it, but nobody can guarantee it."
category: "measure"
ours:
  - product: "visibilitytoai"
    why: "If you would rather not run the manual check by hand, it tracks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions."
  - product: "hilyt"
    why: "If AI tools describe your business wrongly, it gives you an open, AI-readable profile that sets out your facts in one place."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full text (HTML)"
    url: "https://arxiv.org/html/2311.09735v3"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
faq:
  - q: "What does AI visibility mean?"
    a: "It means whether AI answer tools such as ChatGPT, Perplexity, Claude and Google's AI features bring up your business when people ask relevant questions, and whether what they say is right. It is easiest to judge in three parts: are you named, are you linked as a source, and are you described accurately."
  - q: "How is AI visibility different from SEO rankings?"
    a: "A ranking is a position in a list of results. An AI answer is written text that may name several businesses, one or none, and Google says its AI Overviews and AI Mode can show different responses and links. For Google's features the documented requirement is the same as for Search: be indexed and eligible to show with a snippet."
  - q: "How do I check whether ChatGPT or Perplexity mentions my business?"
    a: "Write a fixed list of questions a buyer would ask, put each one to each tool, and record the date, the exact wording and the full answer. Score each answer on named, linked and accurate, then repeat with the same questions on another day, because one answer proves very little."
  - q: "Can I guarantee my brand appears in AI answers?"
    a: "No. None of the platform documents we read promises inclusion, and nobody else can promise it either. You can remove blockers such as robots.txt rules, keep your facts clear and consistent, and track what happens."
  - q: "What is an AI visibility score?"
    a: "It is a number a vendor's tool calculates to sum up how you appear in AI answers. Each vendor defines and weights its own score, so a score only means something next to other scores from the same tool and method."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Put simply, when someone asks ChatGPT, Perplexity, Claude or Google's AI features a question your business could answer, AI visibility covers whether you appear in the reply and whether the reply gets you right. The useful way to look at it is in three separate parts, because each one goes wrong for different reasons and needs a different fix.

Most pages on this topic are written by vendors and define the term around their own dashboard. This guide splits it into parts you can check yourself. For the wider field it belongs to, see [what GEO is](/#what-is-geo).

## The short definition, and what it covers

AI visibility is more than your name turning up in a list. It also covers whether the tool links to your pages as a source, and whether the description is accurate: what you sell, where you work and who you serve. A mention that gets your services or area wrong can send the wrong buyers your way, or put the right ones off, so accuracy counts as much as presence.

## The three parts: being mentioned, being cited, being described correctly

You can have any one of these without the others.

| Part | What it means | What you check |
|---|---|---|
| Mentioned | The answer names your business | Is your name in the answer text? |
| Cited | The answer links to your pages as a source | Is one of your URLs among the links? |
| Described correctly | What it says about you matches reality | Are services, location and anything a buyer would act on right? |

You can be cited without being named in the text, and named without being cited. A business that never comes up has a different problem from one that comes up with the wrong service area. Combine them into one number and you lose sight of which problem you have.

Our recommendation (this is practice, not something any platform documents): judge every answer on these three parts, and write down which competitors are named alongside you or in your place.

## AI visibility vs SEO rankings: why a score is not a position

A search ranking is a position. You are third or tenth for a query, and two people looking at the same results can agree on it.

An AI answer is written text put together for that question. It may name five businesses, one or none, so there is no position three to hold. When a tool gives you an AI visibility score, it is summarising something with no fixed scale underneath.

SEO still matters. Google's documentation says that to be eligible as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to show in Google Search with a snippet, and that there are no additional technical requirements. It also says specific optimisation is not required for these features and that existing SEO fundamentals still apply. For the longer comparison, see [GEO vs SEO](/#geo-vs-seo).

## Why AI visibility is hard to pin down

Google says AI Overviews and AI Mode may use different models and techniques, so the responses and links they show will vary, and that AI Overviews only appear when Google's systems judge them useful, so they often do not trigger. That is a documented reason why one result tells you little.

Beyond Google, our working assumption (a recommendation, not a documented rule) is that answers can change between runs, between platforms and when the wording changes. A single screenshot from one tool on one day is an anecdote. Treat AI visibility as a pattern you build up over many questions, tools and dates. Anyone promising a precise, stable figure is claiming more certainty than the thing being measured allows. For how to track it over time, see [measuring progress](/#measurement).

## What affects it: documented requirements, research findings and sensible practice

These are three different kinds of evidence. Bad advice often starts when they get mixed up, so here they are separately.

### Documented by the platforms

- **Google:** pages must be indexed and eligible for a snippet. Robots.txt rules for Googlebot control crawling for Search, including its AI features. A separate token, Google-Extended, limits training and grounding in some of Google's other systems.
- **OpenAI:** OAI-SearchBot is for search. Sites that opt out of it will not be shown in ChatGPT search answers, though they can still appear as navigational links. GPTBot crawls content that may be used for training, and each setting is independent. ChatGPT-User handles certain user-initiated actions, and OpenAI says robots.txt rules may not apply to it.
- **Perplexity:** PerplexityBot surfaces and links sites in Perplexity search results, and Perplexity says it is not used to crawl content for AI foundation models. Perplexity-User fetches pages when a user asks a question, and because a user requested the fetch it generally ignores robots.txt.
- **Anthropic:** ClaudeBot collects content that may be used for training. Claude-User fetches pages when people ask Claude questions. Claude-SearchBot indexes content to improve search results. Anthropic says its bots honour robots.txt, and that blocking Claude-User or Claude-SearchBot may reduce your visibility in user searches.

In practice, blocking a search crawler is a decision about that tool. Check your robots.txt, and any firewall or CDN rules, before you assume something else is wrong. There is more on this under [crawler access](/#crawler-access). Bear in mind that robots.txt (RFC 9309) is a set of rules crawlers are asked to follow. The standard itself says those rules are not a form of access authorisation.

### Research findings

Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024), built a benchmark of 10,000 queries called GEO-bench. They tested changes to source pages, such as citing sources, adding quotations and adding statistics, against a generative engine they set up: a language model answering from the top five Google results. Visibility was measured with the paper's own metrics, which look at how much of the answer draws on a source and how prominently. The authors report gains of up to 40% on those metrics, say results varied by domain, and also ran tests on Perplexity.

This is useful evidence that content choices can matter under test conditions. It does not show that the same changes will get you into a real answer on a real platform today. Treat it as an idea worth testing.

### Sensible practice

This is our recommendation and is not sourced: write clear pages that answer the questions your buyers ask, keep your facts consistent across your own site and profiles, and state what you want an AI tool to say about you somewhere it can read. None of this guarantees anything. It is basic housekeeping that also helps human visitors. For how the pieces connect, see [how AI answers happen](/#how-it-works).

## How to check your own AI visibility without a tool

You don't need to pay for anything. You need a spreadsheet and an hour. These steps are our recommendation.

1. Write down a fixed set of buyer questions, the ones a real customer would type: what you do, who does it near them, how to choose between providers.
2. Put each question to several tools: ChatGPT, Perplexity, Claude, and Google if an AI Overview or AI Mode answer appears.
3. Record the date, the tool, the exact wording and the full answer. Paste it in rather than summarising from memory.
4. Score each answer: named or not, linked as a source or not, described accurately or not.
5. Note which competitors are named.
6. Repeat on another day with the same questions and compare.

People tend to skip step 6, but it is the step that shows whether you are seeing a pattern or a one-off. Run the check again after you change something on your site and you will have your own before and after. For Google specifically, its documentation says traffic from AI Overviews and AI Mode is counted in the Search Console Performance report under the "Web" search type, combined with other search traffic.

## What an AI visibility score does and does not tell you

Vendor scores differ from tool to tool. The definitions are proprietary, so you usually cannot see exactly what is counted or how it is weighted. A score can only be compared with other scores from the same tool using the same method: a 60 in one product and a 60 in another measure different things.

A score can be a handy way to follow change inside one tool over time. It cannot tell you how you compare across tools, and it cannot promise an outcome. We are not quoting any vendor statistic here, on purpose.

Finally, the plainest limit: none of the platform documents we read promises inclusion in an AI answer, and none gives a timeframe. Nobody else can promise either.
