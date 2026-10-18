---
# scriptgrain: generation 09554307-02f9-4d63-9be7-4971b34b25a7, voice match 0.75 (2026-10-18), then Claude edit + fact-check (page-pipeline item 722)
title: "Do Google AI Overviews reduce clicks to websites? What the evidence shows"
seoTitle: "Do Google AI Overviews Reduce Clicks? The Evidence"
summary: "On average, yes: every study we checked finds fewer clicks when an AI Overview appears, but estimates vary widely with method and query mix. Google disputes the framing, and no study predicts your site's traffic."
category: "measure"
ours:
  - product: "visibilitytoai"
    why: "Search Console only covers Google, so if you also want to know whether ChatGPT, Claude, Gemini and Perplexity name and cite your company for buyers' questions, it tracks that."
related: ["how-to-track-ai-overviews","what-are-google-ai-overviews","generative-engine-optimization-statistics"]
sources:
  - label: "Pew Research Center: Google users are less likely to click on links when an AI summary appears in the results (22 July 2025)"
    url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
  - label: "Agarwal and Sen: The Impact of Google AI Overviews on Publisher Traffic and User Experience (SSRN working paper)"
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6513059"
  - label: "Search Engine Journal: Study Confirms Google AI Overviews Cut Organic Clicks 38%"
    url: "https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/"
  - label: "Ahrefs: AI Overviews Reduce Clicks by 34.5% (vendor study, April 2025)"
    url: "https://ahrefs.com/blog/ai-overviews-reduce-clicks/"
  - label: "Ahrefs: 2026 update to its AI Overviews click study (vendor study)"
    url: "https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/"
  - label: "Define Media Group: BREAKING! News Thrives in the Age of AI"
    url: "https://www.definemg.com/breaking-news-thrives-in-the-age-of-ai/"
  - label: "Search Engine Land: Google AI Overviews cut search clicks 42%: Report"
    url: "https://searchengineland.com/google-ai-overviews-cut-search-clicks-report-471497"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google: AI in Search is driving more queries and higher quality clicks (Liz Reid, 6 August 2025)"
    url: "https://blog.google/products/search/ai-search-driving-more-queries-higher-quality-clicks/"
  - label: "Search Engine Land: Google says AI Search features send billions of clicks to websites each week"
    url: "https://searchengineland.com/google-says-ai-search-features-sending-billions-of-clicks-to-websites-each-week-482599"
  - label: "Search Console Help: What are impressions, position, and clicks?"
    url: "https://support.google.com/webmasters/answer/7042828"
  - label: "Search Console Help: Generative AI performance report (Search)"
    url: "https://support.google.com/webmasters/answer/16984139"
  - label: "Google Search Central Blog: Introducing Search Generative AI performance reports in Search Console"
    url: "https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports"
faq:
  - q: "Do Google AI Overviews reduce clicks to websites?"
    a: "Every study we checked finds fewer clicks on searches where an AI Overview appears. The only randomised experiment we found measured 39.8% fewer outbound organic clicks on those searches. Google says overall click volume has been relatively stable, and none of these studies predicts what happens to a particular site."
  - q: "Why do studies give different percentages for the click drop?"
    a: "They measure different things. Pew counts visits with any click, the experiment counts clicks per search, Ahrefs counts position one click-through rate and Define Media Group counts total clicks across its clients' sites. The designs, query mixes, devices and time periods also differ."
  - q: "Is AI killing website traffic?"
    a: "The evidence shows fewer clicks on searches with an AI Overview. It does not show that every site loses traffic. Google says traffic is shifting between sites, so whether your own traffic is falling is something only your own data can show."
  - q: "How can I see whether AI Overviews are hurting my own traffic?"
    a: "Search Console's generative AI performance report shows which of your pages get impressions in AI Overviews and AI Mode, but it does not show clicks. Compare those pages' clicks, click-through rate and position against last year in the main Performance report. Split out branded and question-style queries."
  - q: "Are clicks from an AI Overview higher quality?"
    a: "Google says they are, meaning people spend more time on the site, but it has not published the data behind that. The Agarwal and Sen field experiment found no difference in engagement on websites once a click happened."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
The studies that measure this agree on the direction and disagree on the size, because each one measures something different. The question that matters for you is whether it is happening to your queries, and only your own Search Console data can start to answer that.

## The direct evidence: what the main studies measured

The figures you will see quoted (34.5%, 38%, 42%, 58%) come from studies with very different designs. Here they are side by side, sorted by who produced them.

| Study | Type | Method | Market | Data period | What it measured | Main limits |
| --- | --- | --- | --- | --- | --- | --- |
| Pew Research Center, published 22 July 2025 | Independent research | Browsing data from 900 adults on a consenting panel: 68,879 unique Google searches, 12,593 of them with an AI summary | US | March 2025 | Visits where the user clicked a traditional result: 8% with an AI summary, 15% without | Observational, so it compares different searches; one month; results pages were re-collected in April 2025 |
| Agarwal (Indian School of Business) and Sen (Carnegie Mellon), SSRN working paper posted 3 April 2026 | Independent research | Randomised field experiment: a Chrome extension hid AI Overviews for one group of users | US | January to February 2026 | Outbound organic clicks on searches where an AI Overview appeared: 39.8% lower in the current abstract | Working paper, not peer reviewed; desktop Chrome only; paid, self-selected participants |
| Ahrefs, 17 April 2025 | Vendor data | 300,000 keywords from its own database; average desktop click-through rate from aggregated Search Console data | Not stated in the post | March 2024 vs March 2025 | Position one click-through rate on AI Overview keywords against a forecast: about 34.5% lower | Correlational; desktop only; informational keywords only |
| Ahrefs update, February 2026 | Vendor data | Same method | Not stated in the post | December 2023 vs December 2025 | Position one click-through rate: about 58% lower, with smaller drops further down (19.4% at position 10) | As above, over a two-year gap that includes many other Google changes |
| Define Media Group, reported by Search Engine Land on 12 March 2026 | Industry data from a publisher consultancy | Search Console clicks across its client portfolio (64 sites, according to Search Engine Land) | Publisher clients, including major US news sites | Q1 2023 to Q4 2025 | Total organic search clicks: down 42% in Q4 2025 against the pre-AI Overviews average | Before and after on one portfolio; cannot separate AI Overviews from core updates and other changes; publishers only |

Some details matter more than the headlines.

**Pew** also found that people clicked a link inside the AI summary itself on just 1% of visits to pages with one. They ended their browsing session on 26% of pages with a summary, against 16% without. Summaries appeared on 18% of the searches in the dataset, and on 60% of searches that began with words such as who, what, when or why.

**The Agarwal and Sen experiment** is the only randomised test we found, which is why it is the strongest evidence of cause. Search Engine Journal's report on the first version (27 April 2026) described 1,065 participants recruited through Prolific, AI Overviews appearing on 42% of their queries, and outbound clicks rising from 0.38 to 0.61 per search when AI Overviews were removed. It gave the reduction as 38%. The abstract, last revised 8 July 2026, now gives 39.8%. According to the same report, the effect came from AI Overviews shown at the top of the page, and sponsored clicks and overall search frequency did not change.

**Ahrefs** is a vendor that sells SEO tools, so its figures are its own. Its method compares how click-through rates changed for keywords that gained an AI Overview with how they changed for similar informational keywords that did not, and treats the difference as the effect.

## Why the headline percentages disagree

They are percentages of different things. Pew counts visits with a click on a traditional result. The experiment counts outbound clicks per search. Ahrefs counts the click-through rate for the page ranked first. Define Media Group counts all organic clicks to its clients' sites.

The designs differ too. Only the experiment randomly assigns who sees an AI Overview. Pew compares searches that had a summary with searches that did not, and those searches differ in other ways (longer, question-style searches were far more likely to get one). Ahrefs and Define compare before and after, so anything else that changed in Google over those years is mixed in.

Query mix, position and population all move the number. Ahrefs looked only at informational keywords on desktop, and its own figures show the effect shrinking further down the page. The experiment found the effect came from AI Overviews at the top of the page. The samples were a US browsing panel, US desktop Chrome users, a vendor's keyword database and a portfolio of news publishers.

Time matters as well. Ahrefs' own estimate moved from 34.5% to 58% between its two runs. Note too that the two 42% figures are unrelated: one is how often AI Overviews appeared in the experiment, the other is Define Media Group's traffic decline. Do not average these numbers. Ask what each one was a percentage of.

## What Google says about clicks from AI Overviews

These are Google's own claims about its own product, and they are labelled as such here.

- In its Search Central guide to AI features, Google says that when people click from results pages with AI Overviews, "these clicks are higher quality (meaning, users are more likely to spend more time on the site)."
- In August 2025, Google's head of Search, Liz Reid, wrote that total organic click volume from Google Search to websites had been "relatively stable year-over-year" and that Google was sending slightly more quality clicks, defined as clicks where users do not quickly click back. The same post called third-party reports of dramatic declines inaccurate and "often based on flawed methodologies". It also said traffic was shifting, with some sites losing and others gaining.
- Google's Nick Fox later said Google sends "billions of clicks to websites every week through AI features in Search alone", as reported by Search Engine Land, which noted that Google has not shared the click data behind it.

Google's claims and the studies can both be partly true. Fewer clicks per search with an AI Overview could still add up to stable totals if people search more and clicks move to different sites. The quality claim has had one independent test so far: the Agarwal and Sen paper found that engagement on websites, once someone clicked, did not differ between the groups.

## Why a click drop is not the same as a visibility drop

Your page can be shown in an AI Overview and still get fewer clicks than it used to. Google's documentation sets out how Search Console handles this:

- Clicks and impressions from AI Overviews and AI Mode are included in the Performance report under the Web search type, with no click figure for AI features on its own.
- Clicking a link to an external page in an AI Overview counts as a click. An AI Overview takes a single position, and every link in it is given that same position.
- Since 31 August 2026, every site has had a generative AI performance report. It shows impressions in AI Overviews and AI Mode by page, country, device and date. It does not show clicks.

So you can now see which pages Google shows in AI features, but not how many clicks those features send. A falling click line could mean lower rankings, seasonality, a change in what people search for, or an AI Overview answering the question. For the full tracking setup, see [how to track AI Overviews](/how-to-track-ai-overviews/).

## How to check whether AI Overviews affect your own site

This is our recommended approach, not a Google procedure.

1. **Compare like with like.** Set the Performance report to compare a recent period with the same period last year, so seasonality does not mislead you.
2. **Find the exposed pages.** In the generative AI performance report, note which pages get AI feature impressions. In the main Performance report, compare those pages' clicks, impressions, click-through rate and position with your other pages.
3. **Split by query type.** Separate informational and question-style queries from transactional and navigational ones. Pew's data suggests question-style searches are far more likely to get an AI summary.
4. **Separate branded from non-branded.** Filter queries containing your brand name. Searches for your own name are a useful comparison group.
5. **Check position before blaming AI.** If your average position fell, a ranking change may explain the drop on its own.
6. **Note other changes.** Write down Google updates and your own site changes (migrations, redesigns, removed pages) in the same period.

If impressions and position hold steady while clicks fall on informational, non-branded queries for pages that get AI impressions, that fits an AI Overview effect. It does not prove one. Our [measuring progress](/#measurement) section covers how this fits with tracking AI answers more widely.

## What to do if your clicks have fallen

Work out the cause first. If rankings fell, that is an SEO problem to fix before anything else.

If the pattern points to AI Overviews, these are sensible steps (our recommendations):

- **Look at value, not only clicks.** Google's own guide suggests tracking conversions and time on site in a tool such as Google Analytics. A smaller number of visits that convert may matter more than the raw count.
- **Make sure you can be cited.** Google says a page only needs to be indexed and eligible to show with a snippet to appear as a link in AI Overviews, with no extra technical requirements. [How to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/) covers the rest.
- **Think before opting out.** Snippet controls such as nosnippet limit what Google can show, and they also limit how your page appears in search results generally.
- **Look at which content still earns clicks.** Define Media Group found breaking news held up for its publishers while evergreen content fell. That finding applies to news sites, but the habit of checking which content types are holding up applies to any site.

Nobody can guarantee a click or a citation in an AI Overview, and any promise of a recovery should be treated with suspicion.

## What nobody can tell you yet

No study gives a number that applies to a single site. Most of the evidence is from the US, much of it is desktop only, and the strongest study is still a working paper. Google has not published click data for its AI features, and Search Console does not show AI Overview clicks separately. AI Overviews also keep changing, as the move between Ahrefs' two figures suggests. More background on the feature itself is in [what are Google AI Overviews](/what-are-google-ai-overviews/), and the wider set of figures is in our [GEO statistics guide](/generative-engine-optimization-statistics/).
