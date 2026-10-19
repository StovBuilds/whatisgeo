---
# scriptgrain: generation 5d7b8014-c556-4eeb-b570-92f412c59d03, voice match 0.82 (2026-10-19), then Claude edit + fact-check (page-pipeline item 784)
title: "Is there a Chrome extension to hide Google AI Overviews? What they do and what to check first"
seoTitle: "Hide Google AI Overviews Chrome Extension: What to Know"
summary: "Yes. Several Chrome extensions hide the AI Overview on your own screen, but none can switch it off, because Google says it cannot be turned off. Check site access, privacy declarations and update dates first."
category: "platforms"
related: ["how-to-turn-off-google-ai-overviews","what-are-google-ai-overviews","how-to-track-ai-overviews","do-google-ai-overviews-reduce-clicks"]
sources:
  - label: "Google Search Help: AI Overviews in Google Search"
    url: "https://support.google.com/websearch/answer/14901683?hl=en"
  - label: "Chrome Web Store Help: Install and manage extensions"
    url: "https://support.google.com/chrome_webstore/answer/2664769?hl=en"
  - label: "Chrome for Developers: Fill out the privacy fields (Chrome Web Store)"
    url: "https://developer.chrome.com/docs/webstore/cws-dashboard-privacy"
  - label: "Chrome Web Store listing: Google AI Overview Hider (checked 19 October 2026)"
    url: "https://chromewebstore.google.com/detail/aaafgcgohpoahgdhhgkpodjfekjgbfln"
  - label: "Chrome Web Store listing: AI Overview Hider for Google (checked 19 October 2026)"
    url: "https://chromewebstore.google.com/detail/foobohnghnhkmgpglaefdnbcjkenjpgi"
  - label: "Chrome Web Store listing: Hide Google AI Overview (checked 19 October 2026)"
    url: "https://chromewebstore.google.com/detail/ckalpgoholmlfjncjahmnkmmihodgajc"
  - label: "Firefox Add-ons listing: Hide Google AI Overviews (checked 19 October 2026)"
    url: "https://addons.mozilla.org/en-US/firefox/addon/hide-google-ai-overviews/"
  - label: "Google Chrome Help: Set default search engine and site search shortcuts"
    url: "https://support.google.com/chrome/answer/95426?hl=en"
  - label: "udm14.com (third-party shortcut site by Tedium)"
    url: "https://udm14.com/"
faq:
  - q: "Is there a Chrome extension that hides Google AI Overviews?"
    a: "Yes. When we searched the Chrome Web Store on 19 October 2026, more than ten extensions offered to hide AI Overviews, including listings named \"Google AI Overview Hider\" and \"AI Overview Hider for Google\". None of them is made by Google."
  - q: "Does an extension turn AI Overviews off, or just hide them?"
    a: "It only hides them. Google says Search features cannot be turned off, so an extension removes the block from the page in your browser after it loads, and the AI Overview is still generated."
  - q: "Is it safe to install a Google AI Overview hider extension?"
    a: "We cannot vouch for any extension. Before you install, check the listing's developer details, its update date and its Privacy section, and once it is installed, limit its site access in Chrome's extension Details to the Google site you use."
  - q: "Why did my AI Overview extension stop working?"
    a: "Most likely Google changed its results page and the extension no longer finds the AI Overview. Check the listing for a recent update. The Firefox Hide Google AI Overviews listing, for example, said it stopped working in late March and was waiting for an update to be reviewed."
  - q: "Can I hide AI Overviews in Chrome without an extension?"
    a: "Yes. Choose the Web filter after each search, or add a custom search engine in Chrome's settings that opens the Web view and make it your default. That shortcut relies on an address parameter Google does not document, so it may stop working."
published: 2026-10-19
updated: 2026-10-19
status: "published"
---
Every one of these extensions works the same way. It edits the Google results page inside your browser after the page arrives, so the AI Overview is still produced and simply not shown to you. Before you install one, ask three questions: what can it access, what does its developer declare about your data, and is anyone keeping it up to date?

## What a hiding extension actually does

A hiding extension runs inside Chrome on Google's search pages. When a results page loads, it finds the part of the page that holds the AI Overview and hides it. Nothing changes on Google's side.

The listings say as much if you read past the name. The "Google AI Overview Hider" listing uses "Disable AI Overview" and "Turn Off AI Overview" in its marketing, then explains in its own "How it works" section that it works "by hiding them from the Search Page". It also says that switching the extension off reloads the page "to show the original content". Whatever a store listing calls it, hiding is the only thing an extension can do here.

## What Google says about turning AI Overviews off

Google's Search Help page calls AI Overviews "a core Google Search feature, like knowledge panels" and says "Features cannot be turned off." The same paragraph gives Google's alternative: select the Web filter after you search, which "displays only text-based links without features like AI Overviews."

Google offers no extension or setting that removes AI Overviews. Our guide on [how to turn off Google AI Overviews](/how-to-turn-off-google-ai-overviews/) covers every route, including why the old Search Labs opt-out does not do it.

## Extensions listed in the Chrome Web Store

Searching the Chrome Web Store for "Google AI Overview Hider" on 19 October 2026 returned more than ten extensions offering to hide or remove AI Overviews. The three below are examples, in alphabetical order, with what each listing said that day. We have not installed or tested any of them, and this is not a ranking or a recommendation.

| Listing | What the listing says it does | Updated (per listing) | Privacy section (per listing) |
|---|---|---|---|
| AI Overview Hider for Google (soitis.dev) | "Hides the AI Overview section in Google search results" | 5 April 2026 | Developer says it will not collect or use your data |
| Google AI Overview Hider | Hides AI Overviews and "AI Mode" labels with an on/off toggle, "bringing the top organic search results back to the top of the page" | 23 April 2026 | Developer says it will not collect or use your data, and links a privacy policy |
| Hide Google AI Overview (ternera) | Hides the AI Overview from Google results; says it is open source and links its code | 30 December 2025 | Developer says it will not collect or use your data |

Firefox has its own equivalents. The "Hide Google AI Overviews" add-on on Mozilla's add-ons site says it removes "AI-generated overviews from Google search results". Its listing is also the clearest example of what can go wrong, covered below.

We leave out user counts and star ratings. They change daily, several of these listings have only a handful of ratings, and neither tells you whether an extension is safe. Check the listing yourself on the day you install.

## How to check an extension before you install it

Chrome and the Web Store give you three things to check, and each takes a minute.

1. **Who publishes it and when it was last updated.** Every Chrome Web Store listing has a Details section showing the version, the "Updated" date and the developer's contact details. Some also carry a badge: the soitis.dev listing says it was "Created by the owner of the listed website" and that the publisher "has a good record with no history of violations." Our reading: for a page Google keeps changing, a recent update date matters more than a high rating.
2. **The Privacy section.** Chrome's developer documentation says developers "must disclose how your extension collects and uses user data" in the Web Store's privacy fields, and certify that they comply with its limited use policy. That disclosure is what appears under "Privacy" on the listing. It is the developer's own declaration, so read it as their statement of what the extension does with your data.
3. **What it asks for, and what you allow afterwards.** Chrome Web Store Help says some extensions tell you at install time if they "need certain permissions or data", and advises: "Make sure you only approve extensions that you trust." After installing, open More, then Extensions, then Manage extensions, and select Details on the extension. Next to "Allow this extension to read and change all your data on websites you visit", you can set its site access to On select, On specific sites or On all sites. Our reading: a hider only needs Google's search pages, so limiting it to the Google site you use is a sensible default.

Firefox shows required permissions on the listing page itself. The Hide Google AI Overviews listing, for example, asks for access to Google's search pages across Google's country domains.

## What can go wrong

Hiding depends on how Google builds its results page. When Google changes the page, the extension can stop finding the AI Overview until its developer ships a fix, and nothing warns you. You just see the AI Overview again.

The Firefox Hide Google AI Overviews listing shows this happening. When we checked it on 19 October 2026, it carried an "April Update" saying the developers were "aware the extension no longer functions as of late March", had updated the add-on and were awaiting review from Mozilla.

Two more risks, both our reading:

- **Abandoned extensions.** If nobody updates an extension, it will break the next time Google changes its page, and it can stay listed in the store after it stops working.
- **Access to your searches.** An extension that can read and change Google's search pages can see what you search for. The Privacy section is the developer's statement about what happens to that data, which is why it is worth reading.

Chrome Web Store Help also says Chrome may disable extensions that do not keep up with new requirements.

## Options that need no extension

**The Web filter.** Search as normal, then choose Web from the filters under the search bar. Google documents this option. The catch is that you have to choose it again on each search.

**A custom search engine in Chrome.** This makes the Web view your default. Chrome Help gives these steps:

1. Open More, then Settings, then Search engine, then Manage search engines and site search.
2. Next to "Site search", select Add.
3. Give it a name and a shortcut. For the address, run any search, choose Web, copy the address from the address bar and replace your search word with `%s`.
4. Select Add, then select More next to the new entry and choose Make default.

The part of that address that selects the Web view is `udm=14`, which Tedium's udm14.com offers as a shortcut to an "AI-Free" Google search. Google does not document that parameter, and the FAQ on udm14.com warns that "Google sometimes introduces random breaking changes." Neither route needs permissions or updates from a third party. The [off-switch guide](/how-to-turn-off-google-ai-overviews/) has the Firefox and phone versions.

## Does hiding AI Overviews change what searchers see or what you should do as a site owner

This section is our reading. A hiding extension changes your screen and nothing else. Other people searching the same thing still see whatever Google shows them, and Google still generates the AI Overview.

If you run a website, hiding the block on your own screen changes nothing about whether your site is cited in AI Overviews. It can, however, skew your view of your own search results, so check from a browser without the extension. [How to track AI Overviews](/how-to-track-ai-overviews/) covers what you can measure. If your concern is traffic, see [do Google AI Overviews reduce clicks](/do-google-ai-overviews-reduce-clicks/). If you want to appear in them, see [how to rank in Google AI Overviews](/how-to-rank-in-google-ai-overviews/). For background, see [what Google AI Overviews are](/what-are-google-ai-overviews/) and [how AI answers happen](/#how-it-works).
