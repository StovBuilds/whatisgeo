---
# scriptgrain: generation 2502bf33-a869-456c-823e-892210e3b1d3, voice match 0.74 (2026-10-18), then Claude edit + fact-check (page-pipeline item 700)
title: "How do you rank in Google AI Overviews?"
seoTitle: "How to Rank in Google AI Overviews: What Google Says"
summary: "Google says there is no special optimisation for AI Overviews. A page must be indexed and eligible for a snippet, and the usual helpful-content and technical SEO basics apply. Nobody can guarantee inclusion."
category: "platforms"
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central Blog: Top ways to ensure your content performs well in Google's AI experiences on Search (May 2025)"
    url: "https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search"
  - label: "Google Search Central: Control your snippets in search results"
    url: "https://developers.google.com/search/docs/appearance/snippet"
  - label: "Google: List of Google's common crawlers (Google-Extended)"
    url: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers"
  - label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
faq:
  - q: "Is there a way to rank in Google AI Overviews?"
    a: "Not in the sense of climbing to a position. Google says a page must be indexed and eligible to be shown with a snippet, and that there are no additional technical requirements. Beyond that, nobody can guarantee inclusion."
  - q: "Do I need to do anything different from normal SEO to appear in AI Overviews?"
    a: "Google says specific optimisation isn't required for AI Overviews and AI Mode. Its guidance points to the same fundamentals as before: helpful, people-first content, good page experience, crawl access and structured data that matches the visible page."
  - q: "Do I need to rank on page one to be cited in an AI Overview?"
    a: "Google does not document that requirement. It says AI Overviews may use query fan-out, running related searches across subtopics, and can show a wider set of links than a classic search, so supporting links can differ from the top classic results."
  - q: "Can I stop my content appearing in AI Overviews?"
    a: "Yes. Google says nosnippet, data-nosnippet, max-snippet and noindex control what is shown from your pages in Search, including AI features, but they also affect classic results. Blocking Google-Extended does not do it, because Google says that token does not affect inclusion in Search."
  - q: "Do schema markup or llms.txt help me appear in AI Overviews?"
    a: "Google says there are no additional technical requirements for AI features. It asks that any structured data matches the visible text on the page, and its AI features documentation does not mention llms.txt."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
There is no position inside an AI Overview to climb, and no tag, form or setting that asks Google to include you. What you can control is whether a page qualifies to be used as a supporting link, and Google spells out those conditions in its own documentation.

Most popular guides on this topic present guesses and correlation studies as proven tactics. This page keeps three kinds of claim apart and labels each one: what Google documents, what research suggests, and what we recommend. For background on how AI answers are put together in general, start with [how AI answers happen](/#how-it-works).

## What Google itself documents

Google's Search Central page "AI features and your website" covers AI Overviews and AI Mode from a site owner's point of view. These are its key statements:

- **Eligibility.** To be eligible as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet, meeting the normal Search technical requirements. Google adds: "There are no additional technical requirements."
- **No special optimisation.** Google says specific optimisation isn't required for AI Overviews and AI Mode, and that existing SEO fundamentals continue to be worthwhile.
- **AI Overviews often don't appear.** Google says they are only shown when its systems decide they add something beyond classic Search, "and as such, often don't trigger."
- **The two features differ.** AI Mode and AI Overviews may use different models and techniques, so the responses and links they show will vary.

The third point matters. For many queries there is no AI Overview at all, so there is nothing to appear in.

## Eligibility checklist: indexed, snippet-eligible, crawlable

Google's wording turns into a short checklist. Each item comes from the AI features page or Google's May 2025 Search Central blog post on succeeding in AI search.

| Condition | What to check |
| --- | --- |
| Indexed | The page is in Google's index. Verify your site in Search Console, which Google recommends for diagnosing technical issues, and look for a forgotten `noindex`. |
| Snippet-eligible | Nothing on the page stops Google showing a snippet, such as a `nosnippet` rule. |
| Crawlable | robots.txt allows crawling, and your CDN or hosting is not blocking Googlebot. |
| Working page | Google receives an HTTP 200 status and the page has indexable content. |
| Text available | Important content is available in textual form. |

None of this is glamorous, but it is the only part with documented rules. For which crawlers to allow and why, see [crawler access](/#crawler-access).

## What Google says about content and page experience

Google's May 2025 post, by John Mueller of Google Search Relations, and the AI features page give the same list of fundamentals:

- Unique, non-commodity content that people will find helpful and satisfying.
- A good page experience: it displays well across devices, responds quickly, and makes the main content easy to tell apart from everything else.
- Content that is easy to find through internal links on your site.
- High-quality images and videos supporting the text, where they fit.
- Structured data that follows Google's guidelines and matches the visible text on the page.
- Up-to-date Merchant Center and Business Profile information, which matters mainly if you sell products or serve a local area.

Notice what is missing. Google does not ask for a particular word count, a question-and-answer layout, a special file or a new type of markup. Some of those may still help readers, but Google has not documented any of them as a requirement for AI features, so treat claims that they are required as unverified. The overlap with ordinary SEO is covered in [GEO vs SEO](/#geo-vs-seo).

## How AI Overviews choose sources: query fan-out

Google says AI Overviews and AI Mode may use a "query fan-out" technique, "issuing multiple related searches across subtopics and data sources" to develop a response. While the response is generated, its models identify more supporting pages, which Google says lets it display "a wider and more diverse set of helpful links" than a classic web search.

In practice, that means:

- The links in an AI Overview can differ from the classic results for the same query.
- A page that answers one related subtopic well may be relevant even if it is not near the top for the exact phrase typed.
- Checking only where you rank for one keyword gives you an incomplete picture.

Keep to Google's wording here. It says "may use", and it does not publish how often fan-out happens or which queries trigger it. Nobody outside Google can tell you that with authority.

## What research and third-party studies suggest, and their limits

The best-known paper is Aggarwal et al., "GEO: Generative Engine Optimization", accepted to KDD 2024. The authors built a benchmark of queries called GEO-bench and tested content changes such as adding citations, quotations from relevant sources and statistics. They report visibility gains of up to 40% in generative engine responses, gains of up to 37% in a test on Perplexity.ai, and that how well each method worked varied by domain.

The limits matter as much as the findings:

- The main experiments used the authors' own generative engine: an LLM writing answers from the top five Google search results for each query. That is a research setup, not Google's AI Overviews.
- Visibility was measured with metrics the paper defines, which are not the same as being shown as a link in Google.
- It is not a study of Google AI Overviews, so applying its numbers to Google is an assumption.

Agencies and SEO software vendors also publish studies of which pages AI Overviews cite. We have not relied on any of them here. If you read one, look for who ran it, how many queries it covered, when, in which country, and whether it shows a correlation or a tested cause. A headline percentage from a vendor is that vendor's finding, not a Google rule.

## Sensible practice: our recommendations

This section is our opinion, built on Google's guidance above. It is not a Google requirement and it guarantees nothing.

1. **Fix eligibility first.** Check your important pages in Search Console, look for stray `noindex` or `nosnippet` rules, and confirm your CDN is not blocking Googlebot. It is cheap and it is the only part with documented rules.
2. **Answer the question plainly, in text.** Put a direct answer near the top of the page, then the detail. This serves readers, which is what Google's guidance points to.
3. **Cover the follow-up questions.** Because of fan-out, a page that handles the related subtopics a reader would ask next has more chances to be relevant.
4. **Keep structured data honest.** If you use it, make sure it matches what is visible and validate it.
5. **Keep business listings current.** If you sell products or serve a local area, keep Merchant Center and Business Profile up to date.

The thinking behind these is set out in [our GEO principles](/#principles).

## Controls: nosnippet, data-nosnippet, max-snippet and noindex

Google says AI is built into Search, so the controls for AI features are the normal Search controls. Its documentation names these:

| Control | What it does |
| --- | --- |
| `nosnippet` | Stops Google showing a text snippet for the page. |
| `data-nosnippet` | An HTML attribute that keeps specific parts of a page out of snippets. |
| `max-snippet:[number]` | Sets a maximum snippet length. |
| `noindex` | Keeps the page out of Google's index, and so out of Search entirely. |

Google says "more restrictive permissions will limit how your content is featured in our AI experiences." These controls apply to Search as a whole, so `nosnippet` also removes your snippet from classic results. Make that trade deliberately.

Two further points from Google's documentation:

- **Google-Extended is a different control.** Google describes it as a robots.txt token for managing whether content may be used to train future Gemini models and for grounding in Gemini Apps and Vertex AI. Google states it "does not impact a site's inclusion in Google Search", and its AI features page names Googlebot's robots.txt rules as the crawling control for Search. Blocking Google-Extended does not take you out of AI Overviews.
- **Changes take time.** If your content still appears after you add a preview control, Google suggests using the URL Inspection tool to check that Googlebot received the control, then allowing time to recrawl, which it says can take anywhere from several days to several months. You can also request a recrawl.

## How to check whether you appear and measure it

- **Spot checks.** Search the questions your customers ask and look. AI Overviews often don't trigger and the links shown vary, so treat this as a spot check, not a measurement.
- **Search Console.** Google says sites appearing in AI features are included in overall search traffic in the Performance report, under the "Web" search type. Its AI features page does not describe a separate AI Overviews report, so expect AI clicks and impressions to sit inside your existing totals.
- **Your own analytics.** Google suggests tracking conversions and time on site as well as clicks. It also says clicks from results pages with AI Overviews are "higher quality", meaning people are more likely to spend more time on the site. That is Google's own observation, and the page does not publish data behind it.

Be wary of any tool that claims to split AI Overview traffic out of Search Console totals without explaining how. More on tracking in [measuring progress](/#measurement).

## What not to believe

- **"Follow these steps to rank in AI Overviews."** Google documents eligibility, not a ranking you can climb.
- **"We guarantee you a place."** Google does not promise inclusion, so nobody else can.
- **"This tactic is proven."** If the proof is a correlation study or a test on a different engine, it is not proof for Google.
- **"Block Google-Extended to stay out of AI Overviews."** Google says Google-Extended does not affect inclusion in Search.
- **"You need a special file or markup for AI Overviews."** Google says there are no additional technical requirements.

A claim is only as good as its source, so ask where it comes from.
