---
# scriptgrain: generation cbdf71b9-29c9-4608-b57f-4711f0d42a7d, voice match 0.7 (2026-10-18), then Claude edit + fact-check (page-pipeline item 730)
title: "Are Google AI Overviews accurate? What the studies show, and what to do about errors"
seoTitle: "Are Google AI Overviews Accurate? What Studies Show"
summary: "Often, but not reliably. Google says AI Overviews can and will make mistakes, and the main outside test found right answers about 91% of the time on hard factual questions, with weaker backing from cited sources."
category: "platforms"
ours:
  - product: "visibilitytoai"
    why: "If you want to know how AI assistants describe your business, it checks whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for the questions your buyers ask."
related: ["what-are-google-ai-overviews","how-to-track-ai-overviews","ai-visibility-audit","how-to-rank-in-google-ai-overviews"]
sources:
  - label: "Google Search Help: AI Overviews in Google Search"
    url: "https://support.google.com/websearch/answer/14901683"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google blog, 30 May 2024: AI Overviews: About last week"
    url: "https://blog.google/products/search/ai-overviews-update-may-2024/"
  - label: "Oumi, 14 April 2026: Oumi's Study Finds 50% of AI Overviews Untrustworthy (method and findings)"
    url: "https://oumi.ai/blog/oumis-study-finds-50-of-ai-overviews"
  - label: "Ars Technica, April 2026: Testing suggests Google's AI Overviews tell millions of lies per hour (includes Google's response)"
    url: "https://arstechnica.com/google/2026/04/analysis-finds-google-ai-overviews-is-wrong-10-percent-of-the-time/"
faq:
  - q: "Are Google AI Overviews accurate?"
    a: "Often, but not reliably. Oumi's test for The New York Times found about 91% of overviews gave the right answer to hard factual questions, but only 39% were correct and fully supported by their cited sources. Google itself says AI Overviews can and will make mistakes."
  - q: "Why is the Google AI Overview wrong?"
    a: "Google says errors usually come from misreading the query, misreading the nuance of a web page, or a lack of good information on the topic. It also limited satire and some user-generated content after odd answers in May 2024."
  - q: "How do I report a wrong or harmful AI Overview?"
    a: "Google's Search Help page says to select the thumbs down icon at the bottom of the overview, then Report a problem, choose a category, add details and submit. You can also give feedback from the three-dot menu on the overview. Nobody can guarantee the overview will change."
  - q: "Can I trust AI Overviews for health, legal or money questions?"
    a: "We recommend using them only to find sources. Google's own advice is to check important information in more than one place, so open the cited pages and rely on primary sources or a qualified professional."
  - q: "Can I correct what an AI Overview says about my business?"
    a: "You cannot edit it directly. You can report it, keep your Business Profile and website facts accurate and consistent, and fix wrong details on other sites. None of these guarantees a correction or a timeframe."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
It depends on the question, and on whether an answer still counts as accurate when the pages it cites do not back it up. In the one large outside test we could trace to its original write-up, only 39% of overviews were both correct and fully supported by their cited sources. In practice, treat an overview as a lead and check anything that matters.

This page keeps three kinds of claim apart: what Google documents, what a named analysis measured (and its limits), and what we recommend. If you want the basics first, start with [what Google AI Overviews are](/what-are-google-ai-overviews/).

## What Google says about accuracy and mistakes

**Google's documentation.** The Search Help page on AI Overviews says generative AI "may provide inaccurate or offensive information" and that "AI Overviews can and will make mistakes". It also carries a shorter warning: "AI responses may include mistakes." Google gives no accuracy percentage on that page or on its Search Central page "AI features and your website".

**Google's account of how overviews are built.** In "AI Overviews: About last week" (30 May 2024), Google's VP of Search, Elizabeth Reid, wrote that the model behind AI Overviews is "integrated with our core web ranking systems" and is "built to only show information that is backed up by top web results". She said overviews "generally don't 'hallucinate'" in the way other chatbots can. When they go wrong, she wrote, it is usually from "misinterpreting queries, misinterpreting a nuance of language on the web, or not having a lot of great information available". The post also says Google's own tests put AI Overviews' accuracy "on par with" featured snippets. That is Google's claim about its own product, and the post gives no figure or method.

**What Google changed after the May 2024 errors.** The same post admits that "some odd, inaccurate or unhelpful AI Overviews certainly did show up", alongside many faked screenshots. Examples included satire about eating rocks and a forum joke about putting glue on pizza. Google listed fixes, including:

- better detection of nonsensical queries, and limits on satire and humour content
- limits on user-generated content "in responses that could offer misleading advice"
- triggering restrictions for queries where overviews were not proving helpful
- an aim not to show overviews for hard news topics, and extra triggering refinements for health

## What the outside analysis found, and its limits

The figure most often repeated, roughly 91 percent correct, comes from Oumi, an AI model company that ran the test at the request of The New York Times. Oumi published its method on 14 April 2026.

| Item | What Oumi reported |
|---|---|
| Questions | SimpleQA, a set of a little over 4,000 short, hard factual questions with known answers, built by OpenAI |
| How overviews were collected | Automated Google searches, a screenshot of each overview, text extracted by OCR, cited pages scraped |
| How correctness was judged | An AI model (GPT-5) compared each overview with SimpleQA's answer |
| How source support was judged | Oumi's own unreleased model, HallOumi++, checked every claim against the cited text |
| Human checking | People hand-checked the judging models on a small sample (the post gives 25 overviews as an example) |
| Sample assessed | 1,609 queries with overviews powered by Gemini 3 (early 2026) |
| Correct answer | About 91% |
| Correct, with every claim supported by cited sources | 39% |
| Claims supported, across 4,876 claims | 67% |

Oumi also compared a late 2025 run (Gemini 2) with the early 2026 run (Gemini 3) on the 158 queries both could assess. Correct answers rose from 89% to 94%, while fully supported answers fell from 52% to 38%.

**The limits matter as much as the numbers:**

- **The questions are unusual.** SimpleQA is a research benchmark of obscure facts. Ars Technica reports that a Google spokesperson told the Times the study "has serious holes" and "doesn't reflect what people are actually searching on Google", and that Google believes SimpleQA contains incorrect information. Oumi replied that Gemini models score similarly on SimpleQA Verified, a vetted version Google prefers.
- **"Correct" is narrow.** Oumi says correctness covers only the question asked, not the other facts in the overview.
- **"Unsupported" may overstate the problem.** Oumi says it cannot know everything Gemini is given. Overviews may draw on text outside the quoted fragments, or on sources they do not show. Only queries whose citation fragments could all be located were analysed.
- **AI judged AI.** Both judges are language models, with human checks on a small sample.
- **The analyser has a product to sell.** HallOumi is Oumi's own technology, and the post promotes Oumi's platform.

Some headlines turn the 9 percent miss rate into millions of wrong answers per hour or per year. Those are extrapolations by journalists and commentators, built on their own assumptions about search volume and how often overviews appear. Oumi's post does not calculate one, so we have left those figures out.

## Why AI Overviews get things wrong

Google's explanation, quoted above, names three causes: misreading the query, misreading the nuance of a web page, and "data voids" where little good information exists. Its rock-eating example was a data void, filled by satire that a real company had republished on its own website.

Beyond that, what follows is our general explanation rather than a documented finding. An overview is generated text that summarises retrieved pages. When sources disagree, a summary can blend them or pick one without saying so. When a sentence loses its caveats, its meaning can shift. And an answer can be right and still cite pages that do not quite say it, which is the gap Oumi was measuring. For how retrieval and generation fit together, see [how AI answers happen](/#how-it-works).

## How to check an AI Overview before you rely on it

Google's help page gives three tips: check important information in more than one place by clicking the supporting links and trying other results; ask your question in different ways; and send feedback if something looks wrong. We would add four recommendations of our own:

1. **Open the cited links** and find the sentence that supports the claim. If you cannot find it, treat the claim as unconfirmed.
2. **Compare two independent sources**, ideally including a primary one such as an official body or the company itself.
3. **Check the dates** on the sources. An answer can be faithful to a page that is out of date.
4. **Take extra care with health, legal and money questions.** Use the overview to find sources, then rely on the sources or a qualified professional.

Google's help page says AI Overviews cannot be turned off, but the Web filter on a results page shows only text links without them.

## How to report a wrong AI Overview

Google's Search Help page describes this route:

1. At the bottom of the overview, select the thumbs down icon if you found it unhelpful, inaccurate, biased or otherwise problematic.
2. Select **Report a problem** and choose the category that best describes the issue.
3. Add details in the text box. Google recommends this.
4. Select **Submit**. Google says the feedback includes your most recent search and its results.

The page adds that you can also give feedback from the three-dot menu at the top right of an overview. In the details, say what the overview claimed, what is correct and where the correct version is published. Nobody can guarantee that a report will change the overview, or say when it might.

## What to do if an AI Overview gets your business wrong

Start by capturing the evidence: the exact search, a screenshot, the date and the cited links. The cited pages often show where the wrong fact came from.

Then work through these steps. The first two come from Google's Search Central guidance on AI features; the rest are our recommendations. None of them guarantees a correction or a timeframe.

1. **Keep your Business Profile and Merchant Center details up to date.** Google lists this among its SEO best practices for AI features, along with making sure structured data matches the visible text on the page.
2. **Make important facts available as text on your own pages**, which is also on Google's list. State prices, locations, services and opening hours plainly, in one place, and keep them current.
3. **Fix contradictions elsewhere.** If an old directory listing, press release or review site carries the wrong detail, correct it at the source where you can.
4. **Report the overview** using the steps above, and link to the page with the correct information.
5. **Check again over time.** An [AI visibility audit](/ai-visibility-audit/) sets out how to record what AI tools say about you, and [how to track AI Overviews](/how-to-track-ai-overviews/) covers monitoring the overviews themselves. For measuring progress in general, see [measuring progress](/#measurement).

If your concern is being cited at all, see [how to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/).
