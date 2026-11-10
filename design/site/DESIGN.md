# whatisgeo.app — the site as its own Markdown files ("linefile")

Jack's pick, terminal, 10 Nov 2026 (verbatim): *"Yeah, move the long guide to its own page. Yes, on number two. Just do
like three per category. I think we go with B. I'd like to make it a bit more exciting, but overall B, like, is the
cleanest structure, I think."*

Board: `design/site-options/` on branch `design/site-options` (BRIEF.md has the live-site slop audit). This file is
the contract for the build; the prototype HTML is not.

## 1. Idea

Every page is the Markdown file it is served as. A gutter of real line numbers runs down the guide, every guide and
the MCP page; headings show their `##` marker; every page links its own `.md`. The stage hero on the home page (PR #10)
already shows the guide as a wall of numbered lines with threads to the answer — below the hero, the site keeps
reading the same way. A calm document reader, not a code editor: no dark IDE chrome, no syntax colours.

## 2. Shell

- **Top bar** — `l-nav-01-marketing-top-nav` (jstov, `data-collapse="cta"`): wordmark · The guide (`/guide/`) · All
  guides (`/guides/`) · Get started (`/guide/#getting-started`, chapter 07 "Your first 30 days") · "Stay in the loop"
  (outline CTA, `/#updates`) · status "Reviewed 14 Sep 2026" → `/guide.md`. Current route gets `aria-current="page"`.
- **File list (rail)** — `sidebar-nav-panel` (`lloyds-inline-disclosure`) + `nav-item` rows, 17.5rem, sticky.
  `whatisgeo.app/` · `guide.md` (N lines) with its nine chapters and their first line · "Guides, 60 files" with the
  six categories and counts (the current category unfolds into its files, names wrap, never cut off) · "For machines"
  (llms.txt, llms-full.txt, MCP server). Phones (< 768 px): one full-width "Files" row that unfolds in flow.
- **Reading pane** — a file bar (icon, file name, mono meta: lines · words · minutes · updated, "Raw Markdown" →
  the `.md`), then numbered rows: `number | marker | text` on a 40rem measure (~68 ch of Inter at the body size).
- **Footer** — `l-foot-01-sitemap-footer` (jstov, ruled headings, mono legal row): Read / For machines / Site, the
  company line, the theme radiogroup (system / light / dark). No giant wordmark.

## 3. Type, colour, space

- Theme `whatisgeo` (live colours, Manrope display, Inter body). One type change: `--ds-font-mono` = IBM Plex Mono
  400/500 (OFL, self-hosted latin woff2) for gutters, markers, file meta, code. Plex is a humanist mono that sits
  quietly beside Inter; JetBrains/SF read as an editor.
- Headings at reading sizes: h1 `--ds-text-2xl…3xl`, h2 `--ds-text-xl`, h3 `--ds-text-lg`. One body size
  (`--ds-text-md`, `--ds-lh-prose`). No display-face paragraphs.
- **Blue means a source**, as in the hero: a blue line number = that line cites one; the blue pill = the footnote;
  links are accent ink. The line you are reading gets a 2 px accent tick on its number. Nothing else is blue. Purple
  and orange only in the wordmark.
- Tokens only. Layout glue lives in `src/styles/linefile.css`, classes `lf-*`; DS components composed by root class.

## 4. Pages

| route | anatomy |
|---|---|
| `/` | stage hero (unchanged; "Understand GEO" now goes to `/guide/`) · "The guide is one file": `guide.md` lines 1–14 numbered, a visible "Read the whole guide" link where `#guide` used to be · "Nine chapters, by line" (each chapter's line range + sub-section count, links into `/guide/`) · "60 shorter guides": three per category, each category linking to its full list · sign-up (`#updates`) |
| `/guide/` | the whole of `/guide.md`, every line numbered, chapters keep their old ids (`#what-is-geo` … `#questions`) · the five sources with the lines that cite them · Article + FAQPage JSON-LD, canonical `/guide/` |
| `/<slug>/` | breadcrumb · the whole served `/<slug>.md` numbered: `#` title, Canonical/Publisher/Updated, `>` short answer, body, "From the same studio", "Questions people ask", "Sources" (each source says which lines cite it) · Read next (unnumbered) |
| `/guides/` | `guides/` as a folder of six folders: each category with its blurb and every guide (title, full summary, `slug.md · words · sources`) |
| `/mcp-server/` | the served `/mcp-server.md` numbered; the address is a copyable `code-snippet`; the tools table; setup blocks keep their line numbers |
| 404 | file bar "404 · no such file", two numbered lines saying so, links to `guide.md` and `guides/` |
| `/privacy/`, `/confirm/` | the shell with plain prose (no gutter: neither has a `.md`) |

`/#guide` and the old chapter anchors (`/#principles` …) hop client-side to `/guide/#…` (a hash never reaches the
server). Guides' own links to `/#chapter` are rewritten to `/guide/#chapter` in the content.

## 5. Footnotes (honesty rules)

- A line is "cited" when it links one of the page's own sources, or when `src/data/footnotes.ts` places a footnote on
  it by an exact phrase (checked at build: the phrase must sit on exactly one body line, the source must exist).
- No invented citations: a guide with no map shows its sources at the end with the lines that list them, nothing
  inline.

## 6. Motion (two moments, both drawn from the hero)

1. **The thread** (≥ 1200 px): hover or focus a cited line, or read it (it crosses the reading band at ~40 % of the
   viewport), and a hairline thread draws from its footnote to a margin note level with the line: source number,
   domain, title, "cited on line N". One at a time. Transform/opacity + one SVG stroke; nothing animates per frame.
2. **The reading marker**: the file list knows where you are. A 2 px accent marker slides to the chapter (or section,
   or category) in view, the open file's row shows `L56 / 218` live, and the line you are on gets its accent tick.
   On phones the "Files" row shows the same `L56`.

`prefers-reduced-motion`: the still state — marker and note jump without transition, no thread drawing. No
tickers/marquees, no backdrop-filter, no imagery. Frame budget ~16.7 ms (IntersectionObserver only, no scroll loop).

## 7. States and a11y

Every link/button has hover + a visible `:focus-visible` ring; line numbers and markers are `aria-hidden`; tables are
real tables (stacked into labelled rows under 600 px, no sideways scroll at 390); the rail disclosure mirrors
`aria-expanded`/`data-state`; the copy button announces "Copied"; skip link; the sign-up keeps its labels, consent,
honeypot and inline status.

## 8. DS gaps (logged, worked around in glue)

- `nav-item`: no wrapping label mode — long file names in the rail need to wrap. Workaround: the current category's
  files are a plain `lf-files` list in glue.
- `data-table`: no stacked/"reflow" mode for phones. Workaround: glue stacks rows under 600 px with `data-label`.
- `sidebar-nav-panel` / `nav-item`: no "reading position" marker. Workaround: `lf-marker` in glue.
