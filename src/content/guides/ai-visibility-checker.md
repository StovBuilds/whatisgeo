---
# scriptgrain: generation 1804e49d-0a95-4c4a-8d2e-5f1dce8464ab, voice match 0.75 (2026-10-18), then Claude edit + fact-check (page-pipeline item 718)
title: "AI visibility checker: what a free check tells you, and how to run your own"
seoTitle: "AI Visibility Checker: What It Shows and Its Limits"
summary: "An AI visibility checker asks AI assistants questions or scans your site, then reports whether you are named or cited. Treat one run as a sample, not a score, and check by hand too."
category: "measure"
ours:
  - product: "visibilitytoai"
    why: "If rerunning the manual check by hand gets tedious, it runs buyer questions across ChatGPT, Claude, Gemini and Perplexity and records whether your company is named and cited; ask it the same questions you would ask any checker."
related: ["how-to-measure-ai-visibility","ai-visibility-audit","generative-engine-optimization-tools","what-is-ai-visibility"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://platform.openai.com/docs/bots"
  - label: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
faq:
  - q: "What is an AI visibility checker?"
    a: "It is a tool that puts questions to AI assistants, scans your site, or does both, and then reports whether your business is named or cited. What it shows you is a small set of observations from one day, so it is not a full picture."
  - q: "Are free AI visibility checkers accurate?"
    a: "A free check can be accurate about the answers it collected and still mislead you, because one run is a single observation and answers can change between runs. We know of no independent accuracy figure for these tools. Repeat the check and compare it with your own manual results."
  - q: "Can I check my AI visibility without a tool?"
    a: "Yes. Write five real buyer questions, ask them in two or three assistants in fresh chats, and note whether you are named and whether your site is linked. Check your robots.txt, put a date on the sheet and repeat it later."
  - q: "What is the difference between an AI visibility checker and a tracker?"
    a: "A checker is usually a one-off look. A tracker runs the same questions again on a schedule so you can see movement over time. Since any single run is a sample, the repetition is where most of the value comes from."
  - q: "Does a high readiness score mean AI will cite me?"
    a: "No. A readiness score is about access and structure, and it cannot tell you what an assistant chooses to say. Google, for example, says being indexed and eligible for a snippet makes a page eligible for AI Overviews and AI Mode, and it promises nothing beyond eligibility."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Whatever a checker reports, whether a percentage, a grade or a list of mentions, comes from a small number of answers collected on one day for the questions the tool chose. That makes it a useful snapshot and a poor verdict. This page explains the three kinds of checker, what each can and cannot show, and how to run your own check for free.

## What an AI visibility checker actually does

Under the dashboard, a checker does one of two jobs, and some tools do both. It puts questions to AI assistants and records the replies. Or it looks at your website and reports how ready it seems to be for assistants to find and use.

Neither job sees how every user is being answered. The tool has the answers it collected, on the day it collected them, for its own prompts. Keep that in mind and the output becomes much easier to read. If you want the definition of visibility itself first, see [what is AI visibility](/what-is-ai-visibility/).

## Three kinds of checker and what each one measures

The three labels below are ours, for clarity. They are not an industry standard, and one product can mix them.

| Kind | What it does | What it can show | What it cannot show |
| --- | --- | --- | --- |
| Answer sampling | Sends prompts to one or more assistants and reads the replies | Whether you were named or linked, and who else appeared, in those runs | Whether that holds across other runs, phrasings or days |
| Site readiness scan | Crawls your pages and checks access and structure | Whether crawlers are blocked, whether content is readable as text | Whether any assistant has actually mentioned you |
| Simulated answers | Uses a model to predict how an assistant might answer, often against a rival's content | Possible gaps in your content | What a real assistant says to a real person |

The three answer different questions. Sampling asks "was I named?" A readiness scan asks "could I be?" A simulation asks "might I be?" Most misreadings of checker results come from treating one of these as if it answered another.

A readiness scan is on firmest ground when it checks things platforms document themselves. Google's guidance on AI features lists, among its SEO basics, making sure crawling is allowed in robots.txt and by any CDN or hosting setup, and making sure important content is available as text. Anything a scanner scores beyond documented requirements like these is the vendor's own judgement, so read it as their judgement.

## What a single free check cannot tell you

A free check is usually one run. Answers from AI assistants can differ when you ask the same question again, so our recommendation is to treat any single run as one draw from a range of possible answers. That is a working rule from practice, not a measured statistic. If the same prompt gives different brands on two tries, the assistant is behaving normally and the checker has not broken.

So one run leaves three questions open.

1. **Consistency.** You might be named once and missing the next few times, or the other way round.
2. **Phrasing.** Buyers ask the same thing many different ways. A checker only tests the wording it was given.
3. **Readiness versus outcome.** Good access is good news, and it is only a starting point. For Google, a page must be indexed and eligible to appear with a snippet to be shown as a supporting link in AI Overviews or AI Mode, and Google says there are no additional technical requirements. Eligibility is all that gives you. It does not promise inclusion.

Google also notes that AI Overviews and AI Mode may use different models and techniques, so the responses and links they show will vary between the two. A check of one AI feature tells you little about another.

## How to run your own check in 15 minutes

You need a spreadsheet and two or three assistants. The time below is our estimate for a first pass with five prompts; more prompts or assistants take longer.

1. **Write five prompts.** Use the questions a real customer would type: two or three about your category ("best accountant for freelancers in Leeds"), one comparing options, one naming your business directly. Keep the wording plain.
2. **Pick two or three assistants** your customers are likely to use, and keep the same set every time you repeat the check.
3. **Use a fresh chat for each prompt** so earlier answers do not shape later ones.
4. **Log each answer.** Note whether your business was named, whether your site was linked as a source, which competitors appeared, and anything it got wrong about you. Yes or no per column is enough.
5. **Check your robots.txt.** Make sure you have not blocked the crawlers that matter by accident. OpenAI, for example, documents separate agents: OAI-SearchBot is used to show sites in ChatGPT's search features, and OpenAI says sites that opt it out will not appear in ChatGPT search answers, though they can still appear as navigational links; GPTBot crawls content that may be used for training; ChatGPT-User visits pages when a user asks something, and OpenAI says robots.txt rules may not apply to it. The rules work under RFC 9309, which describes them as rules crawlers are requested to honour and says they are not a form of access authorisation. For a full walkthrough, see [AI crawlers and robots.txt](/ai-crawlers-robots-txt/).
6. **Date the sheet.** A check with no date cannot be compared with the next one.

Then run the same prompts again on another day. Two dated passes tell you more than one long session.

## How to read the result and what to do next

Look for patterns across runs and assistants, not single answers. If you are named when someone asks about you by name but rarely for category questions, people who already know you can find you and new buyers mostly cannot. If you never appear at all, rule out access first (step 5), then look at whether your pages answer the questions you asked.

Do not read much into one missing mention. A pattern that repeats across prompts, assistants and days is worth acting on.

Fix access problems first, because they are usually cheap and clear. If you want a structured review, an [AI visibility audit](/ai-visibility-audit/) works through access, prompts, cited sources and accuracy in order. For a repeatable method with scoring, see [how to measure AI visibility](/how-to-measure-ai-visibility/), and for the other signals worth tracking, including Search Console, which Google says counts AI Overviews and AI Mode traffic in its Performance report under the Web search type, see [measuring progress](/#measurement).

Repeat the manual check on a regular schedule. How often is up to you; we suggest monthly as a sensible default for a small site. The trend across dated checks matters more than any single result.

## What to look for in a checker, free or paid

We do not rank checkers, because the right one depends on what you need to know. These questions apply to any of them:

- **Does it say which kind it is?** It should be clear whether it sampled real answers, scanned your site or simulated a reply. If that is vague, be wary.
- **Can you see the raw answers?** A score with no evidence behind it is hard to trust. You want the actual replies so you can judge them yourself.
- **Does it run each prompt more than once?** Because answers vary, repeated runs say more than a single snapshot.
- **Does it say which assistants, settings and dates it used?** Without that you cannot compare one check with the next.
- **Do its claims come with sources?** Any claim about what a tool does, or about its accuracy, should come from the vendor's own pages. Treat it as the vendor's claim unless someone independent has tested it.

For a side-by-side view of the tool categories, see [generative engine optimisation tools](/generative-engine-optimization-tools/).

You may not need a tool at all. For a small business, the manual check above may be all you ever need. A bigger site with many products or markets is where a tool's value shows: it saves you repeating the same prompts by hand. Paying for that is reasonable. Paying for a score you cannot inspect is not.
