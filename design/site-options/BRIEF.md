# whatisgeo.app — the whole site, 3 design directions (2026-11-10)

Jack's ask (terminal, 10 Nov 2026 ~10:45 London), verbatim: *"Also, I think it's what is GEO? I think Hero looks really
good, but I think we probably need to rework the rest of the site. It's not fantastic. Could we follow a new design theme
that flows throughout the site? It's quite a lot of it is AI generated and it clearly looks it as well. You know, we have
that AI checklist somewhere."*

Prototypes only — nothing in the product's `src/` changes in this pass, nothing merges to main (main = live in ≤10 min).
Every option is built **from the JSTOV design system** (worktree `~/repos/design-system/.claude/worktrees/whatisgeo-site-options`,
branch `whatisgeo/site-options`, which carries the `whatisgeo` theme): its tokens, its components composed by root class.
Content comes from `content.json` and `assets/` in this directory. **Never lorem, never invented numbers.**

## What's AI-looking now (live audit, 10 Nov 2026, against design-system `foundations/slop-signs.md`)

Shots in `live-audit/` (home, /guides/, /ai-mode-vs-ai-overviews/, /mcp-server/, /privacy/, /confirm/, 404; 1440 + 390,
light + dark). The stage hero is excluded: it stays.

1. **Spacing** — section rhythm is uneven: ~150 px between guide chapters, cramped lists inside them; the suggestions box
   floats as a narrow centred card that lines up with no column; the 4-column guide grid ends ragged with half a row empty.
2. **Colour** — a full-bleed saturated blue "statement band" with lime asterisks (a colour outside the brand set); the
   lavender tint used three ways (guide definition, article "short answer", sign-up band) so it means nothing; process
   card 04 filled solid blue for no reason; each process glyph a different colour.
3. **Icons** — decorative glyphs `? ↗ ≋ ↳` and `✳` as ornament; the external-link arrow `↗` on internal links and
   buttons ("Back to the guide ↗", "Join email updates ↗", "See every guide ↗", "Start with the full GEO guide ↗"); a `↗`
   permalink on every chapter.
4. **Copy** — three-beat slogan "Be clear. ✳ Be useful. ✳ Be worth citing."; stacked two-line slogans that fit any
   product ("From a question. / To your expertise.", "One question. / One clear answer."); the 404 quip "Well, this page
   didn't optimise for anything."
5. **Type** — display sizes too big for the job (chapter H2s ~64 px; article H1 wraps to 3 lines, MCP H1 to 4); whole
   paragraphs set in the display face at ~28 px (definition + short-answer panels; a wall of display text on a phone);
   two body sizes inside one chapter; label repeats the heading ("01 / What is GEO?" over "What is GEO?", "The basics"
   eyebrow over "The basics", "Questions people ask" twice).
6. **Layout** — the template rhythm everywhere: square-bullet eyebrow + giant two-line H2 + small blurb on the right; four
   equal process cards that repeat guide chapter 03 word for word; "Read next" as 3 + 1 orphan cards; /guides/ summaries
   cut off with ellipses.
7. **Details** — the giant multi-coloured wordmark as the footer (template trope); sign-up checkbox off its text baseline;
   the suggestions card has its own radius and border, unlike anything else; the MCP code block is a different black.
8. **Visuals / the big one** — the site's whole argument (every claim traced to its source, acted out by the hero) stops
   at the hero. Below it, and on every article, sources are a bare list at the end with no inline footnotes, so the body
   reads like any AI-written blog. Nothing below the fold looks like it belongs to the hero.
10. **Template look** — every page is "huge headline + lavender panel + ruled list": the stock AI docs-site look.

## 0. Ground rules (all lanes)

1. **Tokens only.** No colour, font, radius or shadow literals. Per-option `partials/_style.html` is layout glue, classes
   prefixed with the option letter (`.a-`, `.b-`, `.c-`; the hero owns `.x-`). Never restyle a component's parts
   (`.ds-x__part`); compose by root class + documented `data-variant` / `data-*`. Option B alone may swap the mono face
   (see B).
2. **Missing component → nearest documented variant + a gap in your return** (`gaps[]`), never a fork. Read
   `components/<id>/README.md` for every component you place.
3. **One filled primary per view.** Accent (blue `--ds-accent`) means "this is a citation / source / link" — the hero's
   meaning — and nothing else. Purple and orange appear only in the wordmark (orange also = "the guide doesn't say").
4. **The stage hero stays exactly as it is.** Every `home.json` includes, in this order: `../_stage/style.html`, your
   `partials/_style.html`, nav, `<main id="main">`, `../_stage/hero.html`, your home sections, `</main>`, footer,
   `../_stage/script.html`. Do not edit `_stage/`. The rest of the site must look like it was made by the same hand:
   the hero's world (guide.md line numbers, numbered blue footnotes, hairline threads, the "with / without a source"
   honesty) becomes how the whole site reads.
5. **390 px clean** (no `HORIZONTAL OVERFLOW`), **light + dark** both right (`data-mode` on `<html>` is flipped by the shooter).
6. **Copy is design material.** Sentence case, UK spelling, the site's own nouns. Reuse live copy; you may cut it, and
   you may rewrite only the slop lines named in the audit (slogans, the 404 quip) — say what you changed in `notes`.
7. **No tickers, no marquees, no auto-scrolling strips, ever.** No generated "AI" imagery, no stock art, no blobs/glows.
   No emoji. `↗` only on links that leave the site.
8. **Real content only:** `content.json` + `assets/guide.md` (live /guide.md, real line numbers),
   `assets/article-ai-mode-vs-ai-overviews.md`, `assets/mcp-server.md`. No invented stats or testimonials. Footnotes
   on the article only where `content.json → article.footnote_map` allows.
9. **Write only inside your option directory.** No git. Look at every screenshot before you return, and run the slop
   checklist (`~/repos/design-system/foundations/slop-signs.md`) on your own shots first.
10. Keep each page under ~14,000 px tall on a phone (Chromium blanks taller full-page shots). The guide screen shows the
    guide from the top through the end of chapter 04 "The principles" in full, then the real list of the remaining
    chapters (05–09) as the way on, then the guide's real sources.

## 1. Screens (identical set per option, fixed file names)

| file | persona / state | what it must show |
|---|---|---|
| `home` | first-time visitor from search or a link | the stage hero as is, then the rest of the home: what the guide is and how to read it, the guides (60, six categories), sign-up, footer |
| `guide` | someone reading the long-form guide (live: `/#guide` on the home page) | the guide as a reading experience: contents, chapters 01–04 in full, the way on, sources. Say whether it lives at `/` below the hero or at its own URL (a Jack call — see notes) |
| `article` | someone landing on one guide from search: `/ai-mode-vs-ai-overviews/` | title, the short answer, body (incl. the comparison table) with the honest footnotes, FAQ, sources, read next |
| `mcp` | a developer setting up the MCP server: `/mcp-server/` | the page's real content, the address as the thing to copy, the three tools, setup steps |

Build + shoot (full page), from `~/repos/claude-design` (where Playwright resolves), one shooting run at a time:

```
cd ~/repos/claude-design && NODE_OPTIONS=--max-old-space-size=1536 flock /tmp/claude-1000/wig-shoot.lock \
  node ~/repos/design-system/.claude/worktrees/whatisgeo-site-options/tools/loop.mjs explore \
  ~/repos/whatisgeo/.claude/worktrees/site-options/design/site-options --only <option> --full
```

## 2. What "better" means here

- Below the hero, the site keeps doing what the hero does: show where every claim comes from. A reader on any page can
  see that it is the same site as the hero, within one screen.
- Fixes every live-audit hit above (or the lane says which it kept and why).
- Quiet chrome, one accent meaning, real reading comfort (60–75 character measure, one body size).

## 3. The options

### A · `margin` — "The margin: the guide is read like an annotated text. Every sourced sentence carries the hero's blue footnote, and its source sits level with it in a right-hand margin, joined by the same hairline thread. Chapters are addressed by their guide.md line range."   theme: **whatisgeo**

Shell: a slim top bar (wordmark left, three routes, "Stay in the loop" as a text action), a reading column (~66 ch) plus a
margin column for notes; on phones the margin notes drop in under their paragraph. Home: below the stage, "the guide in
nine chapters" as a contents list with line ranges (L8–15 …) and a sentence each, then the 60 guides by category as plain
lists, sign-up as one quiet row. Footer: small, ruled, no giant wordmark. Character: a well-set book with marginalia;
white, Manrope headings at sane sizes, Inter body.

### B · `linefile` — "The file: the site is guide.md. A gutter of real line numbers runs down the guide and every article (the hero's wall, made readable); headings show as their Markdown rows; every page links its own .md, and the MCP page is the same file seen by a machine."   theme: **whatisgeo** + a real monospace face for the gutter and meta (the one type change)

Shell: a left rail on desktop (the site as a file list: guide.md, guides/ by category, llms.txt, mcp) beside a single
reading pane; on phones the rail becomes a top "files" disclosure. Home: below the stage, the guide's opening lines
(1–15) with their numbers, the contents as line ranges, guides as a categorised file list with word counts from
content.json. Character: a calm document reader, not a code editor: no dark IDE chrome, no syntax colours; blue only on
footnotes, links and the line you're on. Self-host the mono face (woff2 in your option's `fonts/`), override only
`--ds-font-mono`, say which face and why in `notes`.

### C · `questions` — "The questions: every page is a set of questions and their answers, laid out the way the hero asks one. Question on the left, the answer with its footnotes on the right, row after row; the hero's question chips become how you get around."   theme: **whatisgeo**

Shell: top bar whose secondary row is the six hero questions as chips (the same `ds-suggestion-chips`), leading into the
guide. Pages are a two-column question/answer grid (question ~5/12 left in Manrope, answer ~7/12 right in Inter) — an
asymmetric split, never centred stacks. Home: below the stage, the guide's ten common questions as Q/A rows with
footnotes to guide.md lines, then the guides grouped by category as question lists. The guide's chapters are headed by
the question each one answers. Character: an index of plain answers; white, hairline rows, generous left column.

## 4. Lane return (structured, final output is data)

`{ option, screens: [...], components_used: [...], gaps: [{ component, need, workaround }], overflow: [...], slop_self_audit: [{ sign, where, fixed|listed }], copy_changes: [...], notes }`

## 5. Review

`node tools/loop.mjs board <this dir> --title "whatisgeo.app — the whole site, three directions"` → publish `board/` as an
artifact with `db`; Jack picks a base per screen, borrows parts, leaves notes. Then `loop.mjs combine`.
