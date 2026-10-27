---
# scriptgrain: generation 208c8a3f-509f-41e2-855d-67cb767ecd0c, voice match 0.85 (2026-10-27), then Claude edit + fact-check (page-pipeline item 1230)
title: "Competitor analysis for AI search: how to see who AI names instead of you, and which tools help"
seoTitle: "Competitor Analysis for AI Search: Method and Tools"
summary: "Ask real buyer questions across several assistants, record who is named, cited and how they are described, then compare with your own pages. Tools repeat this at scale; no 'best rated' tool can be verified."
category: "measure"
ours:
  - product: "visibilitytoai"
    why: "Once your manual sheet shows which buyer questions matter, it reruns them across ChatGPT, Claude, Gemini and Perplexity and records whether your company is named and cited, so you don't have to repeat the copy and paste by hand."
related: ["how-to-measure-ai-visibility","ai-visibility-audit","generative-engine-optimization-tools","ai-search-optimization-tool-data-accuracy","ai-crawlers-robots-txt"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Anthropic (Claude Help Center): Does Anthropic crawl data from the web?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization, KDD 2024 (arXiv)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "How do I find out which competitors ChatGPT and Perplexity recommend instead of me?"
    a: "Ask them the questions your buyers ask, without naming your business, and record who is named and which pages are cited. Run each question more than once, because answers vary between runs and users, and count how often each brand appears."
  - q: "Do traditional SEO competitor tools show AI search competitors?"
    a: "Not on their own. Keyword and backlink data describes search results and links, and an AI answer is a separate output you have to check separately. That data can still help explain why a competitor's cited pages are strong."
  - q: "Is there a best rated tool for AI search competitor analysis?"
    a: "We know of no rating method we can verify, so we make no 'best rated' claim. Choose by what you need to see, and by how plainly a vendor answers questions about its prompts, models, number of runs and raw data."
  - q: "How often should I repeat a competitor check in AI answers?"
    a: "No platform documents a schedule. Our suggestion is to rerun the same question set at regular intervals and after you change pages, keeping the conditions the same, so you compare like with like and can see a trend through the noise."
  - q: "Can I copy what a competitor does to get cited?"
    a: "You can learn from it. Look at what their cited page does for the buyer's question, then make a better page for the same question. Copying tells you nothing about which element mattered, and nothing guarantees a citation."
published: 2026-10-27
updated: 2026-10-27
status: "published"
---
The useful output is a spreadsheet you built yourself: who each assistant names for your buyers' questions, which pages it cites, and how it describes each brand. Do that by hand first. Then you know what a tool would need to repeat, and you can judge whether its numbers hold up.

## What competitor analysis means when the answer is written by AI

Classic competitor analysis is about rankings: who sits above you for a keyword, and why. The pages that currently rank for this topic mostly follow that habit. They are generic lists of SEO competitor tools, ordered without a stated method. They are a reasonable starting point for keyword and link data, but they answer a different question.

An AI answer has no page one. It is one written response that names you or leaves you out. So you stop measuring position and start measuring presence:

- **Share of mentions:** across all the answers you collected, how often each brand is named.
- **Cited sources:** which pages the answer links to next to each mention.
- **Description:** the words used about each brand, and whether they are accurate.
- **Reasons:** what those cited pages have that yours lack.

Most tool lists stop before the last of these, and it is the one that tells you what to do next.

## What to record for each competitor

For every answer, log these for each brand that appears, and for yourself:

1. Named or not, and roughly where in the answer.
2. The URLs cited next to the mention.
3. The type of each cited source: the brand's own site, a review or comparison site, a forum, a news article.
4. The description: category, strengths, price positioning, caveats.
5. The tone: recommended, listed neutrally, or warned against.

A hand count you can check line by line is worth more than a dashboard figure you cannot audit. The source-type column often tells you the most. If assistants keep citing the same few third-party comparison pages, you have learned where the answer really comes from.

## A manual method you can run in an afternoon

You need a spreadsheet, a list of questions and free access to a few assistants.

1. **Write the questions.** Our suggestion is 15 to 25 that a real buyer would type: "best X for Y", "X vs Y", "is X worth it", "alternatives to X". Use the buyer's words, not your marketing terms, and mostly leave your brand name out.
2. **Run them.** Use ChatGPT, Perplexity and any other assistant your buyers use, and run the same queries in Google Search to see whether an AI Overview appears. Google says AI Overviews often don't trigger, and that AI Overviews and AI Mode may use different models, so the responses and links they show will vary.
3. **Record.** Paste each answer into the sheet and fill in the columns above.
4. **Repeat.** Run every question again, ideally in a fresh session. Answers can vary between runs and between users, so one pass is an anecdote. Our suggestion, in line with [how to measure AI visibility](/how-to-measure-ai-visibility/), is at least three runs per question to start.
5. **Tally.** Count mentions per brand as a rate across runs, then group the citations by source.

If you also want the wider checks (crawler access, how AI describes your own business, source mapping), the [AI visibility audit](/ai-visibility-audit/) walks through them, and this sheet fits straight into it.

## Reading the results: why a competitor gets named

Once the sheet is full, look for reasons as well as counts.

**Open the cited pages.** Does the competitor's page answer the buyer's exact question directly, with specifics? Compare it with your equivalent page. Often the gap is plain: they have a page for that question and you don't.

**Check access.** These are documented platform controls you can read in anyone's public robots.txt file, at the root of their domain:

| Platform | Bot that governs search answers | Separate training bot |
|---|---|---|
| ChatGPT | OAI-SearchBot (OpenAI says sites that opt it out will not be shown in ChatGPT search answers, though can still appear as navigational links) | GPTBot |
| Perplexity | PerplexityBot | Perplexity says PerplexityBot is not used for foundation model training |
| Claude | Claude-SearchBot (Anthropic says disabling it may reduce visibility in search results) | ClaudeBot |
| Google AI Overviews and AI Mode | Googlebot (Google says robots.txt for Googlebot is the control for Search, including its AI features) | Google-Extended covers some of Google's other systems |

If a competitor allows these bots and you block them, that is worth fixing first. The check has limits. Blocking can also happen at a CDN or firewall, which robots.txt won't show, and user-triggered fetchers (ChatGPT-User, Perplexity-User) are handled differently: OpenAI says robots.txt rules may not apply to them, and Perplexity says its fetcher generally ignores them. The [AI crawlers and robots.txt](/ai-crawlers-robots-txt/) guide covers the detail.

**Look at third parties.** If assistants cite review or comparison sites that mention the competitor and leave you out, the fix sits outside your own domain. Know that before you rewrite a dozen pages.

**Be careful about causes.** A competitor named often may simply be older, better known or a clearer fit for the category. The sheet lets you form hypotheses. It cannot prove them.

## What tools add, and what they cannot tell you

Tools add scale and repetition. They run many prompts on a schedule across several assistants and keep the history. That saves real time once your manual run has shown which questions matter.

They cannot explain a result. A tool can report that a competitor appeared in a share of its sampled answers. It cannot show why the model chose them, and its prompts may not match your buyers. Any competitor share-of-voice figure is the vendor's own estimate, shaped by the vendor's choice of prompts, models and sampling. Quote it as theirs, and if you quote a vendor's figure or price anywhere, take it from the vendor's own page and date the check.

Google's documentation sets one more limit. It says the same foundational SEO practices apply to AI Overviews and AI Mode, with no additional technical requirements and no specific optimisation required. Search Console counts traffic from these features inside the Performance report's Web search type, as part of your overall search traffic. It shows your own site only, so it will not show you rivals.

## Kinds of tool compared

The table groups tools by type and does not rank them, because we have no rating method we could defend. For named options and how they differ, see [generative engine optimisation tools](/generative-engine-optimization-tools/).

| Tool type | What it does | Question to ask the vendor |
|---|---|---|
| Traditional SEO suites | Keyword, ranking and backlink data on competitors | Does any of this reflect what AI assistants actually say? |
| AI answer trackers | Run prompts across assistants, log brands and citations | Which prompts, which models, how many runs, and who chose them? |
| Brand mention monitors | Track mentions across the web and social media | Do they link mentions to AI answers, or only the open web? |
| Log and crawler analysers | Show which bots visit your own site | Do they identify AI bots by their published names? |
| Free platform reports | Show your own performance on one platform | Do they show competitors at all, or only you? |

Read the table as a map of what each type can and cannot see.

## Questions to ask before trusting any tool's competitor numbers

1. How are prompts chosen, and can I supply my own?
2. Which assistants and model versions are covered, and how often are they run?
3. How many runs per prompt, given that answers vary?
4. How is the share-of-voice figure calculated?
5. Can I export the raw answers and citations to check them?
6. What happens to the history when a model changes?

If a vendor can't answer plainly, treat its numbers with caution. The guide to [AI search optimisation tool data accuracy](/ai-search-optimization-tool-data-accuracy/) explains why figures differ between tools.

## What to do with the findings

Sort the sheet into three lists:

1. Questions where a competitor is named and you are absent.
2. Questions where you are named but described wrongly.
3. Questions where nobody is named well. These are your openings.

Fix access problems first. Then build or improve the pages that should answer the missing questions, and correct inaccurate descriptions wherever they come from. Afterwards, rerun the same questions under the same conditions so the comparison is fair. The [measurement section of the main guide](/#measurement) explains how to read changes over time.

Keep expectations modest. The GEO paper (Aggarwal et al., KDD 2024) tested content changes on its own benchmark of queries and sources and reported visibility gains under those test conditions. It also found that how well each change worked varied across domains. Treat it as a source of ideas to test on your own pages. It does not predict what will happen on your site, and nobody can guarantee that an assistant will name you.
