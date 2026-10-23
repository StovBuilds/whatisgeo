---
# scriptgrain: generation 1f9f809b-9694-4264-84f5-5d7cff3e7010, voice match 0.87 (2026-10-23), then Claude edit + fact-check (page-pipeline item 1033)
title: "SEO AI agents: what they are, what they can do, and where a human still has to decide"
seoTitle: "SEO AI agents: what they do and what to check"
summary: "An SEO AI agent is software that carries out multi-step SEO tasks, such as audits, keyword clustering or drafting, with little prompting. Judge one by what it is allowed to change and the checks you keep."
category: "choosing"
ours:
  - product: "visibilitytoai"
    why: "If the outcome you want to check is whether AI assistants name and cite your company, it is one way to measure that across ChatGPT, Claude, Gemini and Perplexity without relying on the agent's own reporting."
related: ["ai-seo-tools","what-is-ai-seo","is-ai-content-good-for-seo","generative-engine-optimization-tools","how-to-measure-ai-visibility"]
sources:
  - label: "Google Search Central: Spam policies (scaled content abuse)"
    url: "https://developers.google.com/search/docs/essentials/spam-policies"
  - label: "Google Search Central: Google Search's guidance on using generative AI content on your website"
    url: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content"
  - label: "Google Search Central: Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Ahrefs blog: AI Agents for SEO (Louise Linehan, May 2026), vendor page"
    url: "https://ahrefs.com/blog/ai-agents-for-seo/"
  - label: "Gumloop: SEO automation with AI agents, vendor page"
    url: "https://www.gumloop.com/solutions/seo-automation"
  - label: "Nightwatch: SEO AI Agent (NightOwl), vendor page"
    url: "https://nightwatch.io/seo-ai-agent/"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "Can AI agents do SEO?"
    a: "They can carry out parts of it. Vendors such as Ahrefs, Gumloop and Nightwatch describe agents for keyword research, audits, content work, internal linking and rank tracking, but those are vendor descriptions and no independent evidence of ranking results is cited here."
  - q: "Is there an AI that can do SEO?"
    a: "Several products are sold as SEO AI agents, and each covers a different set of tasks. None can guarantee rankings, so check which tasks a product does, what it is allowed to change, and who reviews its work."
  - q: "What is the difference between an SEO AI agent and an SEO tool or chatbot?"
    a: "A chatbot answers a prompt and a tool does one defined job when you run it. An agent works through several steps towards a goal and uses tools along the way. Vendors draw the line in different places, so ask what the product does."
  - q: "Is it safe to let an AI agent publish content or edit my site automatically?"
    a: "Our recommendation is no, not by default. Google says it is critical to manually fact-check and review all AI-generated content before publishing, and its spam policies cover generating many pages without adding value for users, however they are made."
  - q: "Will an SEO AI agent get my site cited in ChatGPT or AI Overviews?"
    a: "Nobody can promise that. Google says there are no special optimisations needed to appear in AI Overviews or AI Mode beyond SEO best practice, so an agent can help you audit and track, but it does not control whether you are cited."
published: 2026-10-23
updated: 2026-10-23
status: "published"
---
There is no standard definition, so the useful question is what a given agent is allowed to do on its own. Reading and reporting carries little risk. Publishing or editing live pages without a person checking first is where Google's spam and AI content policies come in.

## What an SEO AI agent is, and how vendors use the term

In practice, an agent takes a goal, breaks it into steps, uses tools such as a crawler, a keyword database or your CMS to carry them out, and keeps going without a new prompt at each step. A chatbot answers you. An agent works through a task. The line between the two is blurry, and each vendor draws it where its product sits.

Three vendor pages show the range. These are their words, and each comes from a company with an agent product to sell:

| Vendor | How its page describes SEO agents |
|---|---|
| Ahrefs (blog, May 2026) | "An AI SEO agent is software that actually does the SEO work, as opposed to just describing it." It adds that agents do not need full autonomy: "Most good ones have human approval steps built in." |
| Gumloop (SEO automation page) | "AI agents that automate every part of your SEO workflows", built "for keyword research, competitor analysis, audits, content briefs, and more". |
| Nightwatch (SEO AI Agent page) | "Your 24/7 SEO AI Agent that never sleeps", to "Automate your SEO research, technical audits, SEO tasks, site changes, and rank tracking". |

One definition is about doing the work, one is about automating whole workflows, and one includes making site changes. Those are very different levels of trust to hand over, which is why the label alone tells you little. For the broader set of AI products aimed at SEO, see [AI SEO tools](/ai-seo-tools/) and [what is AI SEO](/what-is-ai-seo/).

## What agents are used for in SEO

According to the vendor pages above, agents are used for:

- **Keyword research and clustering** (Ahrefs, Gumloop, Nightwatch)
- **Technical audits** (all three)
- **Content work**: optimisation and scoring (Ahrefs), content briefs (Gumloop), content suggestions (Nightwatch)
- **Internal linking** (Ahrefs)
- **Rank tracking and reporting** (Ahrefs, Nightwatch)
- **Competitor analysis or monitoring** (Gumloop, Nightwatch)

That list describes what vendors say they aim at. It does not verify capabilities. A task on a product page tells you what the vendor is selling, and you still have to test how well the agent does it on your own site.

## Three levels of autonomy: analyse, suggest, act

Sort every agent task by what it is allowed to touch. This framework is our recommendation, not a source claim.

| Level | What the agent does | Example tasks | Main risk |
|---|---|---|---|
| 1. Analyse | Reads, crawls and reports. Nothing on your site changes. | Audits, rank reports, keyword clusters | A wrong conclusion, which you can check before acting |
| 2. Suggest | Proposes changes that a person approves or rejects | Internal link suggestions, title rewrites, draft briefs | Reviews done in a hurry, so poor suggestions get waved through |
| 3. Act | Edits or publishes without a person in between | Auto-published pages, bulk metadata changes, site changes | Mistakes reach live pages and readers at the speed the agent works |

So ask any product which level each task runs at, and whether you can cap it. Start every agent at level 1. Move a task to level 2 once you have watched it be right. Treat level 3 as something that needs a specific reason and a way to undo it.

## What Google documents about automated and AI-generated content

The risky end of that scale is where Google's published policies apply.

**Scaled content abuse.** Google's spam policies define it as "when many pages are generated for the primary purpose of manipulating search rankings and not helping users", producing content of little or no value to users "no matter how it's created". Its examples include "Using generative AI tools or other similar tools to generate many pages without adding value for users", scraping content to generate many pages, and stitching together content from different pages without adding value. An agent set to publish pages in bulk is the setup that policy describes if the pages add nothing for readers. Whether a given setup crosses the line is a judgement you have to make.

**Using generative AI.** Google's guidance says generative AI "can be particularly useful when researching a topic, and to add structure to original content". It asks publishers to focus on "accuracy, quality, and relevance, especially when automatically generating the content", warns that outputs may contain inaccuracies (hallucinations), and says "It is critical to manually factcheck and review all AI-generated content for accuracy". That review applies to metadata too: titles, meta descriptions, structured data and image alt text. The page also suggests telling readers how automatically generated content was created, where that makes sense for them.

**People-first content.** Google says its automated ranking systems are designed to prioritise helpful, reliable information for people. It says E-E-A-T is not a specific ranking factor in itself, and that trust is the most important part of it. Where automation is used to substantially generate content, it suggests asking yourself who made it, how it was made and why.

For more on publishing AI-written pages, see [is AI content good for SEO](/is-ai-content-good-for-seo/).

## Do SEO AI agents work? What can and cannot be claimed

This page cites no independent evidence of agent performance. We found no primary source or named study measuring ranking uplift, traffic gains or time saved from SEO agents, so we state none.

The figures that do exist come from vendors. Nightwatch's page has a heading reading "Save 100+ Hours" but gives no method. The Ahrefs article gives timings and results from its own team's workflows, with no controlled comparison. These are the vendors' own results, drawn from conditions they chose, and they show what a vendor reports. They are not a measure of what an agent will do for you.

A tool can still be useful without a proven ranking effect. An audit that finds real broken links has saved you time whether or not a position moves. Judge an agent by what you can check (it found these errors, it grouped these queries sensibly), not by promised outcomes.

## Checks to keep before an agent changes your site

Our recommendation, not a claim from any source. Keep all five:

1. **Read-only by default.** Give the agent no write access to your CMS or code until you have decided a task needs it.
2. **Human approval before anything goes live.** No page is published or edited on the agent's say-so alone. Google's own guidance asks for manual review of AI-generated content, metadata included.
3. **A change log.** Record every edit with what changed and when, so any of it can be reversed.
4. **Fact checks.** Verify every claim, figure, quote and link the agent adds. Google warns that generative AI output can contain inaccuracies.
5. **Your own measurement.** Track outcomes with a method you control, such as Search Console data, your analytics or a fixed set of test questions, and do not rely only on the vendor's dashboard.

## Agents and AI search visibility: where they do and do not help

Agents fit the level 1 groundwork: checking whether pages are crawlable and indexable, collecting what AI answers say about your business, and tracking which sources get cited. That is the same work described in [how to measure AI visibility](/how-to-measure-ai-visibility/).

What no agent can do is guarantee a citation. Google says there are "no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary", and that SEO best practices remain relevant there. An agent can help you do that work, but it cannot change how Google or an AI assistant picks its sources.

The research is about content, not agents. The GEO paper by Aggarwal et al. (KDD 2024) tested ways of rewriting content on its own benchmark, GEO-bench, in the authors' own generative engine setup. It found that effects varied by domain. It did not study SEO agents and is not evidence that they improve visibility. The site's [principles](/#principles) cover what the evidence does support.

## How to choose or build one: questions to ask

Whether you are buying or building, ask:

1. Which tasks does it do, and at which level: analyse, suggest or act?
2. Can I make it read-only, and require approval before any change?
3. Is every change logged and reversible?
4. How does it check facts and links before it writes them?
5. What evidence exists beyond the vendor's own results?
6. Can I measure outcomes without relying on its reporting?

If a vendor cannot answer the third and fifth clearly, treat that as your answer. For a wider comparison of AI visibility tools, see [generative engine optimisation tools](/generative-engine-optimization-tools/).
