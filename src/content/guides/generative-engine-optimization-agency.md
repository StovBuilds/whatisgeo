---
# scriptgrain: generation 34c83e0c-d051-403a-815f-239763f16f2f, voice match 0.71 (2026-10-18), then Claude edit + fact-check (page-pipeline item 713)
title: "Generative engine optimisation agency: what to ask before you hire one"
seoTitle: "GEO Agency: What to Ask Before You Hire One"
summary: "A GEO agency can do real work on content, crawler access, structured data and measurement, but none can guarantee inclusion in AI answers. Judge one by its method, its measurement and its honesty about limits."
category: "choosing"
ours:
  - product: "visibilitytoai"
    why: "If you want a repeatable baseline to judge an agency against, it tracks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions."
related: ["what-is-generative-engine-optimization","geo-vs-seo","seo-vs-geo-vs-aeo","what-is-ai-visibility"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central: Spam policies for Google web search"
    url: "https://developers.google.com/search/docs/essentials/spam-policies"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, full text (HTML)"
    url: "https://arxiv.org/html/2311.09735v3"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
faq:
  - q: "What is the best agency for generative engine optimization?"
    a: "No honest answer applies to everyone, and we do not name or rank agencies. The right one depends on your site, your budget and the work you need done, so compare shortlisted agencies on how specific their method is, how clear their measurement plan is and how openly they describe limits."
  - q: "Can a GEO agency guarantee my business appears in ChatGPT or Google AI Overviews?"
    a: "No. Nobody outside the platform controls what it generates, and Google says indexing and serving is not guaranteed even for pages that meet all its requirements. Treat any guarantee as a red flag."
  - q: "Is a GEO agency different from an SEO agency?"
    a: "Partly. The overlap is large, and Google says SEO best practices remain relevant for its AI features. The extra work is mostly crawler choices across several AI products, content written to be quoted, and new ways of measuring, so compare the scope of work and ignore the label."
  - q: "How do I know if a GEO agency is working?"
    a: "Record a baseline before work starts: your key questions, what each AI tool says in answer, and your analytics and Search Console data. Repeat the same checks at agreed intervals and keep your own copy. Google includes AI Overviews and AI Mode traffic in the Performance report's Web search type, so there is no separate AI line to point to."
  - q: "Do I need an agency for GEO or can I do it in-house?"
    a: "Often you can do it in-house. Checking crawler access, improving key pages and adding basic markup are within reach of most capable teams; an agency helps most when you lack capacity, technical help or an outside view on measurement."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Before you talk to any agency, know that the work is mostly ordinary website work you can check, and the platforms decide the outcome. Google says plainly that "indexing and serving isn't guaranteed" even for pages that meet all its requirements, so a good agency sells a method and a way of measuring it, and a bad one sells certainty.

This page ranks no agencies. It sets out what the work consists of, which parts rest on platform documentation, which on research and which on practice, and how to check an agency's claims yourself. If you want the background first, start with [what GEO is](/#what-is-geo).

## What a GEO agency can and cannot promise

An agency cannot promise that ChatGPT, Perplexity, Claude or Google's AI features will name or cite you. Nobody outside those platforms controls what they generate. That is our position as a site, and it matches what Google documents for its own AI features.

What an agency can promise is effort in defined areas, on a schedule you can see: clearer and better sourced content, crawlers that can reach your pages, accurate markup and a measurement plan. That is a fair scope and it can be useful. The test of a pitch is whether it says what will be done, how it will be checked and where it might fail.

## What GEO agency work actually consists of

Strip away the branding and the work falls into four jobs.

1. **Content.** Making pages answer real questions plainly, with sources, quotations and figures where they genuinely belong.
2. **Crawler access.** Making sure the bots that feed AI products can read your site, and that you have chosen deliberately which ones to allow. See [crawler access](/#crawler-access).
3. **Structured data.** Marking up pages so machines can read what they are about. This is useful practice, though Google says no special schema.org markup is needed for its AI features.
4. **Measurement.** Working out whether any of it changed anything. See [measuring progress](/#measurement).

If a proposal contains a fifth job it cannot explain in a sentence, ask about it. Much of the rest is relabelled SEO. That is no bad thing, because the fundamentals matter, but you should know what you are paying for. The [GEO vs SEO](/#geo-vs-seo) section covers the overlap.

## What is documented, what is researched, what is just practice

This is the section sales pages skip. Claims about GEO come from three different places and deserve different levels of trust.

### Documented by the platforms

- **Google.** Its "AI features and your website" page says there are "no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary", that SEO best practices remain relevant, and that a page must be indexed and eligible to show with a snippet.
- **OpenAI.** OAI-SearchBot is for search and GPTBot is used for training its foundation models. OpenAI says each robots.txt setting is independent, so you can allow one and block the other. ChatGPT-User handles visits a user starts, and OpenAI says robots.txt rules may not apply to those.
- **Perplexity.** PerplexityBot surfaces and links sites in Perplexity's search results. Perplexity-User fetches pages when a user asks a question, and Perplexity says it "generally ignores robots.txt rules" because a person triggered the fetch.
- **Anthropic.** ClaudeBot collects content that may be used for training, Claude-User fetches pages when people ask Claude questions, and Claude-SearchBot indexes content for search. Each can be controlled in robots.txt, set separately for each subdomain.
- **robots.txt itself.** RFC 9309 defines it as rules that crawlers "are requested to honor", and says those rules "are not a form of access authorization".

You can check every one of these on the platforms' own pages, linked in the sources below.

### Researched

Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024), tested content changes such as citing sources, adding quotations and adding statistics, and found those three performed best. The conditions matter. The main tests used the authors' own benchmark of 10,000 queries and a set-up that took the top five Google results for each query and had gpt-3.5-turbo write the answer. They also ran a smaller test on Perplexity.ai with 200 queries. The authors say methods may need to change as engines evolve, and that they did not measure effects on search rankings. Treat it as good evidence that a direction is worth testing on your own pages. It does not show what ChatGPT or Google will do with your site today.

### Practice

Everything else: prompt tracking, entity work, which page formats seem to get quoted. Some of it may well be sound. It is still experience and opinion, and an honest agency will label it that way. If an agency cannot tell you which of these three groups a claim belongs to, that tells you something.

## Do you need an agency at all?

Possibly not, and sales pages never say so. If you have someone who owns your site's content and someone who can edit robots.txt and markup, you already have most of the skills. Checking robots.txt against the crawler names above, reading Google's AI features page and rewriting key pages so they answer questions clearly is ordinary work for a capable in-house team.

An agency can earn its fee when you have a large site and no capacity, no technical help, or you want an outside view on measurement. If your SEO basics are shaky, fix those first: Google says they still apply, and a new layer on a weak foundation is poor value. The [30-day plan](/#getting-started) is a reasonable way to try the basics yourself before deciding.

## Questions to ask before you hire

These are our recommendations, drawn from the limits above; no platform requires them. Use what is useful.

1. What exactly will you change on our site, and in what order?
2. Which of your claims come from platform documentation, and which from research or your own experience?
3. How do you decide which AI crawlers to allow or block, and who signs that off?
4. How will you measure results, and what will we record before you start?
5. What would make you tell us the work is not helping?
6. Do you produce pages in bulk, and how do you keep that within Google's spam policies?
7. Who actually does the work, and who do we speak to?
8. What do we keep if we leave?

Listen to the shape of the answers. Specific and bounded is good. Vague and confident is a warning.

## Red flags in pitches and proposals

This list is also our recommendation, built on the documented limits above.

**Guaranteed citations or placements.** Nobody outside the platform can deliver them, and Google says serving is not guaranteed. Treat any guarantee as disqualifying.

**Unsourced statistics.** If a figure has no named source you can check, ask where it came from. A number from a vendor's own marketing is that vendor's claim and should be described as such.

**"Secret" tactics.** The documented parts of this field are public. A method that cannot be explained cannot be evaluated.

**Mass-produced pages.** Google's spam policies define scaled content abuse as generating many pages "for the primary purpose of manipulating search rankings", and say this applies "no matter how it's created", naming generative AI tools as one example. A plan for hundreds of thin pages puts your site at risk.

**Selling robots.txt as security.** It is a voluntary standard for crawlers, and some user-triggered fetchers say they may not follow it. Anyone who presents it as a lock has misread it.

## How to judge results: set a baseline first

Most buyers hire, wait, and then try to work out whether anything changed. By then there is nothing to compare against. Our recommended method is to record where you stand before any work starts. This is practice; no platform requires it.

- The questions that matter to your business, written down word for word.
- What each AI tool currently says in answer, saved with the date.
- What your analytics and Search Console show.

Know what Search Console can and cannot tell you. Google says traffic from AI Overviews and AI Mode is included in the Performance report under the "Web" search type, so there is no separate AI line. Be wary of anyone who presents one as if it came from Google.

Then repeat the same checks at agreed intervals: same questions, same tools, same method. Keep your own copy of the records. That is your independent check, and it works whether or not you hire anyone.

## Names you will see: GEO, AEO, LLM SEO, AI SEO

Generative engine optimisation, answer engine optimisation, LLM SEO and AI SEO are different labels for work that overlaps heavily; [SEO vs GEO vs AEO](/seo-vs-geo-vs-aeo/) sets them side by side. Do not pay extra for a name. Compare each task list against the four jobs above. If two proposals carry different labels but list the same tasks, they are the same offer.

## How to compare agencies without a "best of" list

Many "best agencies" lists are ranked by the publisher's own criteria, sometimes with the publisher near the top. You can build a fairer comparison yourself.

1. Send the same eight questions to each shortlisted agency, in writing.
2. Score each answer on three things: how specific the method is, how clear the measurement plan is, and how openly limits are described.
3. Ask each agency to mark its claims as documented, researched or practice.
4. Open any source they cite and check it says what they say it does.

The agency that does best is usually the one whose answers survive being checked. The site's principles for GEO are a handy reference while you do it.
