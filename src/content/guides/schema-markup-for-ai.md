---
# scriptgrain: generation 9fa7d07b-49b8-4ed7-a3c9-a715022fa701, voice match 0.76 (2026-10-18), then Claude edit + fact-check (page-pipeline item 708)
title: "Does schema markup help with AI search? What is documented, what is tested, and what to do"
seoTitle: "Schema Markup for AI Search: What Is Documented"
summary: "Google says AI Overviews and AI Mode have no additional technical requirements, so schema is not required. It does help machines read a page, so add accurate markup for the facts you already show."
category: "technical"
ours:
  - product: "hilyt"
    why: "If your next question is how AI systems describe your business, Hilyt publishes an open, AI-readable profile alongside the markup on your own site."
related: ["how-to-rank-in-google-ai-overviews","what-is-ai-visibility","how-to-rank-in-chatgpt"]
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central: Introduction to structured data markup"
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
  - label: "Google Search Central: General structured data guidelines"
    url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies"
  - label: "Google Search Central: Latest documentation updates (FAQ and HowTo rich results)"
    url: "https://developers.google.com/search/updates"
  - label: "Schema.org: Getting started"
    url: "https://schema.org/docs/gs.html"
  - label: "Schema.org: LocalBusiness type"
    url: "https://schema.org/LocalBusiness"
  - label: "Aggarwal et al.: GEO: Generative Engine Optimization (KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "Google Rich Results Test"
    url: "https://search.google.com/test/rich-results"
  - label: "Schema Markup Validator"
    url: "https://validator.schema.org/"
faq:
  - q: "Does schema markup help you appear in Google AI Overviews?"
    a: "Google says a page only needs to be indexed and eligible to show with a snippet, and that \"there are no additional technical requirements\". It does say Google uses structured data to understand pages, so accurate markup can help in that way. Nobody can guarantee a place in an AI Overview."
  - q: "Do ChatGPT, Perplexity or Claude read schema markup?"
    a: "This page makes no claim either way, because we have not read documentation from OpenAI, Perplexity or Anthropic that says how their systems use schema markup. If it matters to you, check each provider's own documentation and treat second-hand claims with care."
  - q: "Which schema types should a small business add first?"
    a: "We recommend Organization, LocalBusiness if customers visit or you serve a local area, Article on guides and posts, and Product or Service on sales pages. This is our recommendation and not a platform rule. Only mark up what a visitor can see on the page."
  - q: "What format should schema markup be in, and how do I test it?"
    a: "Google recommends JSON-LD in most cases. Check the markup with Google's Rich Results Test (search.google.com/test/rich-results) and the Schema Markup Validator (validator.schema.org)."
  - q: "Is schema markup the same as structured data?"
    a: "In everyday use the two mean almost the same thing. Structured data is any machine-readable description of a page. Schema.org supplies the shared vocabulary most of it uses, and JSON-LD is the usual format you write it in."
  - q: "Is FAQ markup still worth adding?"
    a: "Google's changelog says the FAQ rich result has stopped appearing in Search since 7 May 2026, and the HowTo rich result was removed in 2023. FAQPage is still a valid Schema.org type, so marking up real, visible FAQs does no harm, but do not expect a Google rich result from it."
published: 2026-10-18
updated: 2026-10-18
status: "published"
---
Schema markup labels the facts on a page so software can read them without guessing. It cannot win you a place in an AI answer by itself, and nobody can promise you that place. Most claims you will read about it fall into one of three groups: what the platforms document, what research has tested, and what is simply sensible practice. This page keeps the three apart and tells you which is which.

## What schema can and cannot do for AI answers

Schema can describe your business, your products and your articles in a fixed vocabulary that search engines understand. Google says it uses that markup to understand pages. That is a real benefit, and it costs little to get right.

No platform we cite here says that schema decides which sources an AI answer uses. Google's documentation for AI Overviews and AI Mode lists no markup requirement at all. So treat schema as a way to make your facts easy to read. It does not replace being a page worth citing. If you want the bigger picture of how AI answers choose sources first, start with [how AI answers happen](/#how-it-works).

## What the platforms document

### Google on AI Overviews and AI Mode

Google's guide to AI features says that to be eligible as a supporting link in AI Overviews or AI Mode, "a page must be indexed and eligible to be shown in Google Search with a snippet, fulfilling the Search technical requirements. There are no additional technical requirements." It adds: "While specific optimization isn't required for AI Overviews and AI Mode, all existing SEO fundamentals continue to be worthwhile."

Structured data appears once in that list of fundamentals: "Making sure your structured data matches the visible text on the page." In other words, Google's AI guidance mentions schema as something to keep accurate. It never presents it as a way in. Our guide to [ranking in Google AI Overviews](/how-to-rank-in-google-ai-overviews/) covers the rest of that list.

### Google on structured data in general

Google's introduction to structured data says: "Google uses structured data that it finds on the web to understand the content of the page, as well as to gather information about the web and the world in general." On format, it says "we recommend using a format that's easiest for you to implement and maintain (in most cases, that's JSON-LD)", and adds that JSON-LD, Microdata and RDFa are "equally fine for Google" if the markup is valid.

Google's general structured data guidelines set the conditions for rich results (the enhanced listings such as review stars). The guidelines "must be followed in order to be eligible for appearance as a rich result", and breaking a quality guideline "can prevent syntactically correct structured data from being displayed as a rich result". Following the rules makes you eligible. Being eligible does not mean the rich result will appear.

### FAQ and HowTo rich results

Many schema guides still promise FAQ rich results. Google's own changelog says the FAQ rich result "will no longer appear in Google Search results starting May 7, 2026", and Google removed its FAQ documentation on 15 June 2026. The HowTo rich result went in September 2023, when Google said it "is no longer shown in search results". So any advice that depends on these features is out of date.

### Schema.org

Schema.org maintains the vocabulary itself. Its getting-started guide describes "a collection of shared vocabularies webmasters can use to mark up their pages in ways that can be understood by the major search engines". It defines the types, such as Organization, LocalBusiness and Product, along with their properties. It says nothing about AI citations.

## What the published research covers, and what it does not

People often cite Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024) as evidence for all kinds of GEO tactics. The paper tested changes to the text of a page. Its strongest methods were Cite Sources, Quotation Addition and Statistics Addition, which the authors describe as adding citations from reliable sources, credible quotes and relevant statistics to the content. They measured the results on their own benchmark of queries (GEO-bench). Schema markup was not one of the methods tested. The paper tells you nothing about schema either way.

You will also find vendor studies quoting figures for how much more often marked-up pages get cited. We do not repeat those figures here. If you meet one, remember that it belongs to the vendor and comes from a method you usually cannot check. Before trusting any schema test, ask three things:

1. How many pages and queries were tested?
2. Did only the markup change, or did the content, links and ranking position change too?
3. Which platform was tested, and when? A result from one engine at one moment may not hold after the next update.

A test on a handful of pages, or one that changed several things at once, cannot show that schema caused the result.

## Which schema types are worth adding, and which to skip

This section is our recommendation, not a documented platform rule. For most small businesses we would add these, and only where the page already shows the information:

| Type | Where it goes | What it labels |
|---|---|---|
| Organization | Home or about page | Your name, logo, website and contact details |
| LocalBusiness | Home or contact page, if customers visit or you serve an area | Address, phone, opening hours |
| Article | Guides and blog posts | Headline, author, publication and update dates |
| Product or Service | Pages that sell something | What is offered and, if shown, the price |

LocalBusiness is a more specific kind of Organization in the Schema.org vocabulary, so a local firm can use it in place of plain Organization. Google also suggests using "the most specific applicable type" Schema.org offers.

FAQPage is still a valid Schema.org type. Add it only for real questions and answers shown on the page, and do not expect a Google rich result from it.

Skip anything that describes what a visitor cannot see: reviews you have not collected, awards you have not won, opening hours you do not keep. More types do not make better markup. Accurate types do.

## How to add it: JSON-LD, one example and a check

JSON-LD sits in a single script block, separate from your visible text. Here is a minimal LocalBusiness example. Every value is a placeholder for your own details:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example Bakery",
  "url": "https://www.example.com/",
  "telephone": "+44 20 0000 0000",
  "openingHours": "Mo-Sa 08:00-17:00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Example Street",
    "addressLocality": "Exampleton",
    "postalCode": "EX1 1AA",
    "addressCountry": "GB"
  }
}
</script>
```

Then check it with two free tools:

- **Google's Rich Results Test** (search.google.com/test/rich-results) shows whether Google can read the markup and whether the page qualifies for any rich result.
- **The Schema Markup Validator** (validator.schema.org), run by Schema.org, checks the markup against the vocabulary, whether or not Google uses that type.

Where you put the markup also matters. Google says it can read JSON-LD that is injected into the page by JavaScript. Other crawlers may not handle it the same way, and we have not seen documentation from every AI company on this point. As a precaution, we put the markup in the HTML the server sends, so it does not depend on scripts running. This is our own practice, not a documented requirement. Whether a crawler can reach the page at all is a separate question, covered in [crawler access](/#crawler-access).

## Keep the markup honest: match the visible page

This is the point with the most documentation behind it. Google's guidelines say: "Don't mark up content that is not visible to readers of the page." Its AI features guide repeats the idea: make sure structured data "matches the visible text on the page". Fake reviews and misleading markup can lead to a manual action. Google says this takes away rich result eligibility but "doesn't affect how the page ranks in Google web search".

In practice:

- If the page says you open at nine, the markup says nine.
- If a price changes on the page, change it in the markup at the same time.
- If a product is out of stock, do not label it available.

Markup that contradicts the page gives a machine two versions of the facts and no way to choose between them. When someone edits a page, have them check its markup too.

## Where schema fits in the wider GEO picture

Schema labels facts you already publish. It cannot make a thin page useful or make an unknown business well known. The work that usually matters more is clear, specific content, pages that crawlers can reach, and a way to see whether anything changes. Our [principles](/#principles) cover the content side. [Measuring progress](/#measurement) covers how to check results without assuming them. If you want to know how often AI tools mention you at all, start with [what AI visibility means](/what-is-ai-visibility/).

Treat schema as housekeeping. It is worth doing and cheap to do well, but it will not stand in for having something worth citing.
