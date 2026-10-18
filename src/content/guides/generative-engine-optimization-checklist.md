---
# scriptgrain: generation b6200571-0a52-4f16-a90a-68b36e2c1d26, voice match 0.73 (2026-10-18), then Claude edit + fact-check (page-pipeline item 725)
title: "Generative engine optimisation checklist: what to do, in order, and what each item rests on"
seoTitle: "GEO Checklist: Steps in Order, With the Evidence"
summary: "A GEO checklist covers crawler access, indexing, quotable content, identity and measurement. A few steps are platform requirements; the rest is research or sensible practice. None guarantees a citation."
category: "basics"
ours:
  - product: "visibilitytoai"
    why: "Once the checklist is done, VisibilityToAI measures whether ChatGPT, Claude, Gemini and Perplexity actually name and cite you for your buyers' questions."
  - product: "hilyt"
    why: "For the entity step, Hilyt publishes an open AI-readable profile so the same name, place and offer are stated in one consistent place."
related: ["ai-crawlers-robots-txt","how-to-improve-ai-visibility","how-to-measure-ai-visibility","schema-markup-for-ai","llms-txt","what-is-answer-engine-optimization","geo-vs-seo"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central: Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - label: "Bing Webmaster Tools: Webmaster Guidelines"
    url: "https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a"
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
  - label: "llmstxt.org: The /llms.txt file, v2"
    url: "https://llmstxt.org/"
faq:
  - q: "What should be on a generative engine optimization checklist?"
    a: "Crawler access, indexing and snippet eligibility, quotable content, a clear and consistent business identity, and a fixed way to measure. The first two rest on platform documentation; the rest ranges from one research paper to our own recommendation."
  - q: "Is a GEO checklist different from an SEO checklist?"
    a: "Mostly it overlaps. Google says existing SEO fundamentals still apply to its AI features, and Bing says Copilot relies on the same crawling and indexing foundation as search. The additions are checking AI-specific crawlers and measuring what AI answers say rather than only rankings."
  - q: "Is there an AEO checklist, and is it the same thing?"
    a: "AEO, LLM SEO and GEO checklists describe almost the same work, so one list covers all three. The labels differ more than the steps do."
  - q: "Do I need llms.txt or schema markup on the checklist?"
    a: "Neither is required by Google, which says there are no additional technical requirements beyond being indexed and snippet-eligible. If you use structured data, Google says it should match the visible text, and llms.txt is a proposal that the major AI crawler documents we read do not mention."
  - q: "How do I know if the checklist worked?"
    a: "Put a fixed set of buyer questions to the same AI platforms on a regular schedule and record who is named, cited and how you are described. For Google, AI feature traffic is counted inside the Search Console Performance report's Web search type, not shown separately."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Work through it in order: first make sure the crawlers behind AI search can reach your pages, then that those pages are indexed and eligible for a snippet, then make each page easy to quote. Only the first two steps rest mainly on what platforms document; the content step leans partly on one research paper, and most of the rest is our recommendation, labelled as such.

## What a GEO checklist can and cannot do

Many GEO checklists are long runs of tick-boxes that never say what each item rests on. You tick everything and still don't know what mattered.

A checklist can do three useful things. It can make sure the right systems are allowed to reach your pages. It can make those pages easy to quote accurately. And it can give you a repeatable way to check what happens next.

It cannot promise a citation. AI answers are assembled by systems you don't control, and none of the platform documents below offers a guarantee. Google even notes that AI Overviews are only shown when its systems judge them additive to classic Search, "and as such, often don't trigger". If someone sells you guaranteed inclusion, that tells you something about the seller.

The same list serves whether you call the work GEO, AEO or LLM SEO. The terms are used loosely and the practical steps overlap almost completely.

## How to read this checklist: documented, researched or recommended

Every item carries one of three labels:

- **Documented:** a platform states it in its own published guidance. This is the strongest label, though it still describes one platform at one point in time.
- **Researched:** a named study found an effect under stated conditions. Useful, but a study is not a live platform.
- **Our recommendation:** sensible practice with no source behind it. We think it is worth doing; nobody has proved it works.

Guidance gets revised, so read the linked source yourself before acting on our summary of it.

## 1. Access: can the right crawlers reach your pages?

**Label: documented.**

Start here, because nothing else matters if the door is shut. The main AI companies publish separate crawlers for separate jobs, and you set your preferences for each in robots.txt.

| Platform | Search or indexing | Training | User-initiated fetches |
|---|---|---|---|
| OpenAI | OAI-SearchBot | GPTBot | ChatGPT-User |
| Perplexity | PerplexityBot | None listed | Perplexity-User |
| Anthropic | Claude-SearchBot | ClaudeBot | Claude-User |
| Google | Googlebot | Google-Extended (some other Google systems) | Not covered here |

What each platform says, in short:

- **OpenAI** says sites opted out of OAI-SearchBot will not be shown in ChatGPT search answers, though they can still appear as navigational links. Each setting is independent, so you can allow OAI-SearchBot while disallowing GPTBot. Because ChatGPT-User acts on a user's request, OpenAI says robots.txt rules may not apply to it. OpenAI also lists OAI-AdsBot, which only visits pages submitted as ads.
- **Perplexity** recommends allowing PerplexityBot if you want to appear in its search results, says PerplexityBot is not used to crawl content for AI foundation models, and says Perplexity-User generally ignores robots.txt because a user requested the fetch.
- **Anthropic** says its bots honour robots.txt, and that disabling Claude-SearchBot or Claude-User may reduce your visibility in user search results.
- **Google** says robots.txt rules for Googlebot are the control for its AI features in Search, and that crawling should be allowed in robots.txt "and by any CDN or hosting infrastructure". That second part is easy to miss: a firewall or bot-blocking setting at your host can shut out crawlers your robots.txt allows.

So check each crawler separately, and check your CDN as well as the file. Search crawlers and training crawlers are different decisions, and a blanket "block all AI bots" rule may remove you from the answers you wanted to appear in.

One caveat: robots.txt is defined in RFC 9309, which says crawlers "are requested to honor" its rules and that the rules "are not a form of access authorization". It states your preferences; it does not enforce them.

The full walkthrough, with example rules, is in [AI crawlers and robots.txt](/ai-crawlers-robots-txt/).

## 2. Eligibility: are your pages indexed and snippet-eligible?

**Label: documented.**

Google's guidance on its AI features is direct. To be eligible as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet. Google says there are no additional technical requirements.

That makes the first Google check an ordinary one. Is the page indexed? Can it show with a snippet, or has a `nosnippet` or `noindex` rule removed it? Google suggests verifying your site in Search Console to catch technical problems. Fix these before anything cleverer.

Bing's webmaster guidelines say Bing and Copilot rely on the same crawling, indexing and ranking foundation as traditional search. They recommend sitemaps with accurate `lastmod` values, and IndexNow to tell Bing when URLs change. They also note that `noarchive` prevents content from being used in Copilot responses, and `nocache` limits Copilot to the URL, title and snippet. Check you have not set either by accident.

For Google detail, see [how to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/).

## 3. Content: is each page easy to quote?

**Label: partly documented, partly researched, partly our recommendation.**

*Documented.* Google says specific optimisation isn't required for its AI features and that existing SEO fundamentals still apply. Its list includes making sure important content is available in textual form, providing a good page experience, making content findable through internal links, and creating helpful, reliable, people-first content. Its helpful-content guidance asks whether content earns trust through "clear sourcing" and evidence of expertise. None of this is specific to AI, and that is the point.

*Researched.* Aggarwal et al., in "GEO: Generative Engine Optimization" (KDD 2024), tested nine ways of rewriting source content on GEO-bench, a benchmark of queries the authors built. Their generative engine fed the top five Google results for each query to a language model. Adding citations, quotations and statistics performed best, with reported visibility gains of up to 40% on the authors' own metrics; keyword stuffing did not perform well; and the effect varied by subject area. They also ran the methods on Perplexity.ai. Because it is a benchmark study of rewritten pages, treat it as a reason to test these changes on your own pages. It cannot tell you what any one edit will do on a live platform today.

*Our recommendation.* No source claim behind these:

- Put the direct answer near the top of the page.
- Keep one question per page.
- Date your facts and say where each one came from.

A page that states its answer plainly, once, with its source named, is easier for a person to quote. We think the same is likely true for a machine, but no platform document we have read says so.

More on the content side is in [how to improve AI visibility](/how-to-improve-ai-visibility/).

## 4. Entity: is it clear who you are and what you do?

**Label: mostly our recommendation, one documented item.**

*Documented.* For Google, keep your Business Profile and, if you sell products, your Merchant Center information up to date. Google lists both in its SEO best practices for AI features.

*Our recommendation.* Use the same business name, location and description of what you offer across your site and every profile you control. A system trying to work out who you are has to match scattered mentions to one business, and inconsistency makes that harder. That is our reasoning; no platform documents it as a requirement. It is cheap to do and unlikely to hurt.

## 5. Optional extras: schema and llms.txt, and what is actually documented

**Label: documented for what Google requires; otherwise our recommendation.**

*Schema.* Google says there are no additional technical requirements for its AI features, so structured data is not a gate. Where you do use it, Google's advice is to make sure it matches the visible text on the page. Use it for its own reasons and keep it honest.

*llms.txt.* This is a proposal published at llmstxt.org, with no standards-body status. The proposal notes that thousands of sites publish one and that the AI labs publish llms.txt files for their own developer docs. None of the crawler documents from OpenAI, Perplexity or Anthropic that we read for this page mentions using it, and neither does Google's AI features guidance. It is cheap to add, and that is the whole case for it. The detail is in our [llms.txt guide](/llms-txt/).

Both are optional, and neither belongs ahead of access, eligibility or content.

## 6. Measurement: how to check the result

**Label: one documented item, the rest our recommendation.**

*Documented.* Google says traffic from its AI features is counted in the Search Console Performance report, within the overall "Web" search type. It does not appear there as a separate line.

*Our recommendation.* Write down a fixed set of the questions your buyers actually ask. Put the same questions to the same platforms on a regular schedule, and record who is named, who is cited and how your business is described, including when you are absent. Keep the wording fixed: change it every run and you end up measuring your own phrasing. We don't put numbers on what to expect, because we have no sourced figure to give.

The method, and what to do with the results, is in [how to measure AI visibility](/how-to-measure-ai-visibility/).

## What to skip or treat with caution

- **Guaranteed inclusion.** None of the platform documents we read offers one.
- **Schema or special files sold as a Google requirement.** Google says there are no additional technical requirements beyond indexing and snippet eligibility.
- **llms.txt as a proven lever.** It is a proposal, and the major AI crawler documents we read do not mention it.
- **Keyword stuffing.** In the GEO paper's benchmark it did not perform well.
- **robots.txt as protection.** RFC 9309 says its rules are not access authorisation, and some user-initiated fetchers may not follow them.
- **The GEO paper as proof for your platform.** It is a benchmark study with stated conditions.
- **Items with no stated basis.** If a checklist item can't say what it rests on, you can't weigh it.

## A short order of work

| Step | What to do | Label |
|---|---|---|
| 1 | Check robots.txt and CDN rules for each AI search crawler | Documented |
| 2 | Confirm pages are indexed and snippet-eligible in Google and Bing | Documented |
| 3 | Make each page easy to quote: text, answer first, sourced and dated facts | Mixed |
| 4 | Keep your name, place, offer and business profiles consistent and current | Mostly recommendation |
| 5 | Add schema or llms.txt only if you have your own reason | Optional |
| 6 | Re-run a fixed question set on a schedule | Mostly recommendation |

Steps one and two carry the strongest evidence, so do them first. For the wider plan these steps sit inside, the home guide has a [30-day getting-started plan](/#getting-started).
