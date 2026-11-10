// "linefile": render a Markdown file as numbered rows, so a page reads as the file it is served as (design/site/DESIGN.md).
// Every gutter number is the line's real number in the served .md (blank lines and code fences skipped, never
// renumbered). Used by /guide/, every guide page, /mcp-server/ and the home page's opening lines.
//
// Footnotes are never invented: a line is "cited" only when it links one of the page's own sources, or when
// src/data/footnotes.ts places a footnote on it by an exact phrase (checked here; a phrase that is not on exactly one
// line throws, which fails the build).
import { marked } from 'marked';

export type Src = { label: string; url: string };
export type Footnote = { phrase: string; source: number };
export interface RenderOpts {
  /** The page's sources, numbered from 1 in this order. */
  sources?: Src[];
  /** Phrase-placed footnotes (src/data/footnotes.ts). */
  footnotes?: Footnote[];
  /** id for a heading row (default: none; the row itself is always #L<n>). */
  headingId?: (text: string, depth: number, line: number) => string | undefined;
  /** aria-label for the table that starts on a line. */
  tableLabel?: (line: number) => string | undefined;
  /** Line number of a `> …` line to set as "The short answer". */
  leadLine?: number;
  /** The note for a front matter block at the top of the file. */
  frontMatterNote?: string;
}

const SITE = 'whatisgeo.app';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const domainOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; } };
/** Old home-page chapter anchors now live on /guide/. */
export const guideHref = (href: string) => href.replace(/^\/#/, '/guide/#');

export function pill(n: number, label: string) {
  return `<a class="ds-citation-sources-cite lf-fn" data-variant="copilot-numbered-reference-list" href="#src-${n}" data-src="${n}" aria-label="Source ${n}: ${esc(label)}"><span class="ds-citation-sources-cite__num">${n}</span></a>`;
}

/** Which lines cite which sources: a link to the source's URL, or a footnote phrase. */
export function citations(lines: string[], start: number, end: number, opts: RenderOpts) {
  const sources = opts.sources ?? [];
  const cited = new Map<number, number[]>();
  const add = (line: number, k: number) => { const l = cited.get(line) ?? []; if (!l.includes(k)) l.push(k); cited.set(line, l); };
  const inSources = sourcesSection(lines);
  for (let n = start; n <= end; n++) {
    if (inSources.has(n)) continue;
    const t = lines[n - 1];
    sources.forEach((s, i) => { if (t.includes(`](${s.url})`)) add(n, i + 1); });
  }
  for (const f of opts.footnotes ?? []) {
    if (!sources[f.source - 1]) throw new Error(`footnote "${f.phrase}": no source ${f.source}`);
    const hits: number[] = [];
    for (let n = start; n <= end; n++) if (!inSources.has(n) && lines[n - 1].includes(f.phrase)) hits.push(n);
    if (hits.length !== 1) throw new Error(`footnote "${f.phrase}" is on ${hits.length} lines (needs exactly 1)`);
    add(hits[0], f.source);
  }
  return cited;
}

/** Line numbers inside a "## Sources" section (they list sources; they do not cite them). */
function sourcesSection(lines: string[]) {
  const out = new Set<number>(); let on = false;
  lines.forEach((l, i) => { if (/^## /.test(l)) on = /^## Sources\s*$/.test(l); else if (on) out.add(i + 1); });
  return out;
}

/** Insert footnote placeholders after the sentence holding each phrase (before its closing mark). */
function placeFootnotes(text: string, notes: Footnote[]) {
  let t = text;
  for (const f of notes) {
    const i = t.indexOf(f.phrase);
    if (i < 0) continue;
    const m = /[.?!](?=["”’)]*(\s|$))/g; m.lastIndex = i + f.phrase.length;
    const hit = m.exec(t); const j = hit ? hit.index : t.length;
    t = t.slice(0, j) + `@@FN${f.source}@@` + t.slice(j);
  }
  return t;
}

/** Inline Markdown → HTML, with the site's link rules: internal links are paths, external ones say so (↗) and open
 * nothing new; a link to one of the page's sources gets its footnote. */
export function inline(text: string, opts: RenderOpts = {}, notes: Footnote[] = []) {
  const sources = opts.sources ?? [];
  let html = marked.parseInline(placeFootnotes(text, notes), { async: false }) as string;
  html = html.replace(/<a href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (_m, rawHref: string, rest: string, body: string) => {
    let href = rawHref.replace(/&amp;/g, '&');
    let ext = /^https?:/.test(href);
    if (ext && domainOf(href) === SITE) { const u = new URL(href); href = u.pathname + u.search + u.hash; ext = false; }
    href = guideHref(href);
    const k = sources.findIndex(s => s.url === rawHref.replace(/&amp;/g, '&'));
    const a = ext
      ? `<a class="ds-text-link lf-a" href="${esc(href)}" rel="noopener"${rest}>${body}<span class="lf-ext" aria-hidden="true">↗</span></a>`
      : `<a class="ds-text-link lf-a" href="${esc(href)}"${rest}>${body}</a>`;
    return k >= 0 ? a + pill(k + 1, sources[k].label) : a;
  });
  return html.replace(/@@FN(\d+)@@/g, (_m, n) => pill(Number(n), sources[Number(n) - 1]?.label ?? ''));
}

const num = (n: number | string) => `<span class="lf-n" aria-hidden="true">${n}</span>`;
const mark = (m: string) => `<span class="lf-m" aria-hidden="true">${esc(m)}</span>`;
function row(n: number | string, body: string, kind: string, marker = '', extra = '', tag = 'div', inner = 'p', innerAttrs = '') {
  const id = typeof n === 'number' ? ` id="L${n}"` : '';
  return `<${tag} class="lf-l"${id} data-kind="${kind}"${extra}>${num(n)}${mark(marker)}<${inner} class="lf-t"${innerAttrs}>${body}</${inner}></${tag}>`;
}
const plain = (h: string) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function table(rows: string[], label: string | undefined, opts: RenderOpts) {
  const cells = (r: string) => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  const head = cells(rows[0]).map(c => inline(c, opts));
  const th = head.map(h => `<th class="ds-data-table__th" scope="col">${h || '<span class="ds-sr-only">Row</span>'}</th>`).join('');
  const body = rows.slice(2).map(r => {
    const cs = cells(r);
    return `<tr class="ds-data-table__row"><th class="ds-data-table__td ds-data-table__primary" scope="row">${inline(cs[0], opts)}</th>${cs.slice(1).map((c, i) => `<td class="ds-data-table__td" data-label="${esc(plain(head[i + 1] ?? ''))}">${inline(c, opts)}</td>`).join('')}</tr>`;
  }).join('');
  return `<div class="ds-data-table lf-table"><div class="ds-data-table__scroll"><table class="ds-data-table__table"${label ? ` aria-label="${esc(label)}"` : ''}><thead class="ds-data-table__head"><tr class="ds-data-table__row">${th}</tr></thead><tbody>${body}</tbody></table></div></div>`;
}

function snippet(code: string, label: string, prompt: boolean) {
  return `<span class="ds-code-snippet lf-snip" data-variant="jstov" data-overflow="wrap" role="group" aria-label="${esc(label)}">${prompt ? '<span class="ds-code-snippet__prompt" aria-hidden="true">$</span>' : ''}<code class="ds-code-snippet__code">${esc(code)}</code><button class="ds-button-secondary ds-code-snippet__copy" data-variant="ghost-text" data-size="sm" type="button" data-copy="${esc(code)}"><span class="ds-button-secondary__label ds-code-snippet__copy-idle">Copy</span><span class="ds-button-secondary__label ds-code-snippet__copy-done">Copied ✓</span></button><span class="ds-code-snippet__status ds-sr-only" aria-live="polite"></span></span>`;
}

/** Render lines [start, end] (1-based, inclusive) of a file as numbered rows. */
export function renderLines(lines: string[], start: number, end: number, opts: RenderOpts = {}) {
  const cited = citations(lines, start, end, opts);
  const notesOn = (n: number) => (opts.footnotes ?? []).filter(f => lines[n - 1].includes(f.phrase));
  const srcLines = sourcesSection(lines);
  const sources = opts.sources ?? [];
  const citedBy = (k: number) => [...cited].filter(([, ks]) => ks.includes(k)).map(([n]) => n);
  const attrsFor = (n: number) => cited.has(n) ? ` data-cited="${cited.get(n)!.join(' ')}"` : '';
  const out: string[] = [];
  let n = start;
  if (start === 1 && lines[0] === '---') {
    const close = lines.indexOf('---', 1) + 1;
    out.push(row(`1–${close}`, esc(opts.frontMatterNote ?? 'Front matter.'), 'skip'));
    n = close + 1;
  }
  let inMeta = true, lastHeading = '';
  while (n <= end) {
    const raw = lines[n - 1]; const s = raw.trim();
    if (/^(```|~~~)/.test(s)) {
      const fence = s.slice(0, 3), lang = s.slice(3).trim(), buf: [number, string][] = [];
      let k = n + 1;
      while (k <= end && !lines[k - 1].trim().startsWith(fence)) { buf.push([k, lines[k - 1]]); k++; }
      if (buf.length === 1 && (lang === 'text' || lang === 'sh')) {
        const [ln, code] = buf[0];
        out.push(row(ln, snippet(code.trim(), lang === 'sh' ? 'Command' : 'Address', lang === 'sh'), 'snip', '', '', 'div', 'div'));
      } else {
        out.push(`<div class="lf-code" role="group" aria-label="${esc(lang ? `${lang.toUpperCase()} example` : 'Example')}">` +
          buf.map(([ln, t], i) => row(ln, `<code>${esc(t) || ' '}</code>`, 'code', '', ` data-pos="${i === 0 ? 'first' : i === buf.length - 1 ? 'last' : 'mid'}"`, 'div', 'pre')).join('') + '</div>');
      }
      n = k + 1; continue;
    }
    if (!s || s.startsWith('<!--')) { n++; continue; }
    if (s.startsWith('|')) {
      const t0 = n, rows: string[] = [];
      while (n <= end && lines[n - 1].trim().startsWith('|')) rows.push(lines[n - 1]), n++;
      out.push(row(t0, table(rows, opts.tableLabel?.(t0) ?? (lastHeading ? `Table: ${lastHeading}` : undefined), opts), 'table', '|', ` data-to="${n - 1}"`, 'div', 'div'));
      continue;
    }
    const h = /^(#{1,3}) (.*)$/.exec(s);
    if (h) {
      const depth = h[1].length, id = opts.headingId?.(h[2], depth, n);
      if (depth > 1) inMeta = false;
      lastHeading = plain(inline(h[2]));
      out.push(row(n, inline(h[2], opts), `h${depth}`, h[1], '', 'div', `h${depth}`, id ? ` id="${esc(id)}"` : ''));
      n++; continue;
    }
    if (/^(\d+\.|[-*]) /.test(s)) {
      const ordered = /^\d/.test(s), items: string[] = [];
      while (n <= end) {
        const m = /^(\d+\.|[-*]) (.*)$/.exec(lines[n - 1].trim());
        if (!m) break;
        const src = srcLines.has(n) ? /^\[([^\]]+)\]\((https?:[^)]+)\)\s*$/.exec(m[2]) : null;
        const k = src ? sources.findIndex(x => x.url === src[2]) + 1 : 0;
        if (src && k > 0) {
          const by = citedBy(k);
          const where = by.length ? `cited on line${by.length > 1 ? 's' : ''} ${by.map(b => `<a href="#L${b}">${b}</a>`).join(', ')}` : `listed on line ${n}`;
          items.push(`<li class="lf-l lf-src" id="L${n}" data-kind="src">${num(n)}${mark(m[1])}<p class="lf-t" id="src-${k}"><span class="lf-src__k">${k}</span><a class="ds-text-link lf-a" href="${esc(src[2])}" rel="noopener">${esc(src[1])}<span class="lf-ext" aria-hidden="true">↗</span></a><span class="lf-src__where">${esc(domainOf(src[2]))} · ${where}</span></p></li>`);
        } else {
          items.push(row(n, inline(m[2], opts, notesOn(n)), 'li', m[1], attrsFor(n), 'li'));
        }
        n++;
      }
      out.push(`<${ordered ? 'ol' : 'ul'} class="lf-list">${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    if (s.startsWith('>')) {
      const items: string[] = [];
      while (n <= end && lines[n - 1].trim().startsWith('>')) {
        const t = lines[n - 1].trim().replace(/^>\s?/, '');
        const lead = n === opts.leadLine;
        items.push(row(n, (lead ? '<span class="lf-label">The short answer</span>' : '') + inline(t, opts, notesOn(n)), lead ? 'lead' : 'quote', '>', attrsFor(n)));
        n++;
      }
      out.push(`<blockquote class="lf-quote">${items.join('')}</blockquote>`);
      continue;
    }
    const meta = inMeta && /^(Canonical|Publisher|Contact|Updated): (.*)$/.exec(s);
    if (meta) {
      const v = meta[2].replace(/(https:\/\/[^\s]+)/g, u => `<a class="ds-text-link lf-a" href="${esc(domainOf(u) === SITE ? new URL(u).pathname : u)}">${esc(u)}</a>`);
      out.push(row(n, `<span class="lf-key">${meta[1]}:</span> ${v}`, 'meta'));
      n++; continue;
    }
    out.push(row(n, inline(s, opts, notesOn(n)), 'p', '', attrsFor(n)));
    n++;
  }
  return { html: out.join('\n'), cited };
}

/** Real line counts as a file: trailing newline does not add a line. */
export const lineCount = (text: string) => text.replace(/\n$/, '').split('\n').length;
export const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Chapters of a file: each `## ` heading with its line range and how many `### ` it holds. */
export function chaptersOf(lines: string[]) {
  const total = lineCount(lines.join('\n'));
  const heads = lines.flatMap((l, i) => (/^## /.test(l) ? [i + 1] : []));
  return heads.map((from, i) => {
    const to = (heads[i + 1] ?? total + 1) - 1;
    let last = to; while (last > from && !lines[last - 1].trim()) last--;
    const subs = lines.slice(from, last).filter(l => /^### /.test(l)).length;
    return { title: lines[from - 1].slice(3).trim(), from, to: last, subs };
  });
}
