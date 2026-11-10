#!/usr/bin/env python3
"""Generate option A (margin) partials + page specs from content.json and assets/*.md. Run with -I."""
import json, re, html, os
from datetime import date

ROOT = '/home/jack/repos/whatisgeo/.claude/worktrees/site-options/design/site-options'
OUT = ROOT + '/margin'
C = json.load(open(ROOT + '/content.json'))
GUIDE = open(ROOT + '/assets/guide.md').read().split('\n')  # GUIDE[n-1] = line n
ART = open(ROOT + '/assets/article-ai-mode-vs-ai-overviews.md').read()
MCP = open(ROOT + '/assets/mcp-server.md').read()

def esc(s): return html.escape(s, quote=False)
def attr(s): return html.escape(s, quote=True)

def domain(u):
    return re.sub(r'^https?://(www\.)?', '', u).split('/')[0]

ARROW = '<span class="ds-text-link__glyph" aria-hidden="true">↗</span>'
ROUTE = '<span class="ds-text-link__glyph" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>'

def link(text, href, cls='ds-text-link'):
    if href.startswith('https://whatisgeo.app/'): href = href[len('https://whatisgeo.app'):]
    ext = href.startswith('http')
    if ext:
        return f'<a class="{cls}" href="{attr(href)}" data-external>{text}{ARROW}</a>'
    return f'<a class="{cls}" href="{attr(href)}">{text}</a>'

def route(text, href):
    return f'<a class="ds-text-link" data-kind="route" href="{attr(href)}"><span class="ds-text-link__label">{esc(text)}</span>{ROUTE}</a>'

CITES = {}  # marker -> html
def cite(n, cid, href, label):
    return (f'<a class="ds-citation-sources-cite" data-variant="copilot-numbered-reference-list" id="{cid}" href="{href}" '
            f'aria-label="Source {n}: {attr(label)}"><span class="ds-citation-sources-cite__num">{n}</span></a>')

def inl(s):
    """markdown inline → html; ⟦k⟧ markers are swapped for cite pills afterwards"""
    s = esc(s)
    s = re.sub(r'`([^`]+)`', r'<code class="a-code-i">\1</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*([^*]+)\*(?![\w*])', r'<span class="a-muted">\1</span>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', lambda m: link(m.group(1), html.unescape(m.group(2))), s)
    s = s.replace('\'', '’')
    s = re.sub(r'⟦(\w+)⟧', lambda m: CITES[m.group(1)], s)
    return s

def typog(s):
    # curly quotes for prose (outside tags): simple pass on text nodes
    def fix(t):
        t = re.sub(r'(^|[\s(\[—])"', r'\1“', t)
        t = t.replace('"', '”')
        return t
    parts = re.split(r'(<[^>]+>)', s)
    return ''.join(p if p.startswith('<') else fix(p) for p in parts)

def P(s): return typog(inl(s))

# --------------------------------------------------------------------------- shared bits
def note(n, cid, src_label, url, where):
    return (f'<div class="a-note" id="n-{cid}" data-for="{cid}">'
            f'<p class="a-note__head">{cite(n, "", "#" + cid, "back to the text").replace(" id=\"\"", "")}<span class="a-note__where">{where}</span></p>'
            f'<p class="a-note__src">{link(esc(src_label), url)}</p>'
            f'<p class="a-note__dom">{esc(domain(url))}</p></div>')

def row(inner, ln='', notes='', cls='', ln_href=None):
    lab = ''
    if ln:
        lab = f'<a class="a-ln" href="{ln_href}">{ln}</a>' if ln_href else f'<p class="a-ln">{ln}</p>'
    nts = f'<div class="a-notes">{notes}</div>' if notes else ''
    return f'<div class="a-row{(" " + cls) if cls else ""}">{lab}{inner}{nts}</div>\n'

def table(rows, label, first_col_primary=True, mono_first=False):
    head, body = rows[0], rows[1:]
    th = ''.join(f'<th class="ds-data-table__th" scope="col">{P(h) if h.strip() else "<span class=\"ds-sr-only\">Aspect</span>"}</th>' for h in head)
    trs = ''
    for r in body:
        tds = ''
        for i, c in enumerate(r):
            if i == 0 and first_col_primary:
                v = re.sub(r'^\*\*(.*)\*\*$', r'\1', c.strip())
                inner = P(v) if not mono_first else P(v)
                tds += f'<th class="ds-data-table__td" scope="row"><span class="ds-data-table__primary">{inner}</span></th>'
            else:
                tds += f'<td class="ds-data-table__td">{P(c.strip())}</td>'
        trs += f'<tr class="ds-data-table__row">{tds}</tr>'
    return (f'<div class="ds-data-table" data-variant="jstov" role="region" aria-label="{attr(label)}" tabindex="0"><div class="ds-data-table__scroll">'
            f'<table class="ds-data-table__table" style="--_min-w: 34rem"><thead class="ds-data-table__head"><tr class="ds-data-table__row">{th}</tr></thead>'
            f'<tbody>{trs}</tbody></table></div></div>')

def parse_table(lines):
    out = []
    for l in lines:
        cells = [c for c in l.strip().strip('|').split('|')]
        if all(re.fullmatch(r'\s*-+\s*', c) for c in cells): continue
        out.append(cells)
    return out

def sheet(inner, sid=None, label=None, first=False, extra=''):
    a = f' id="{sid}"' if sid else ''
    lb = f' aria-labelledby="{label}"' if label else ''
    f = ' data-first' if first else ''
    return f'<section class="a-sec"{a}{lb}{f}{extra}><div class="a-wrap"><div class="a-sheet">\n{inner}</div></div></section>\n'

def write(name, s):
    open(f'{OUT}/partials/{name}', 'w').write(s)

GS = {s['n']: s for s in C['guide_sources']}
CH = {c['n']: c for c in C['guide_chapters']}
def lr(c): return f'L{c["lines"][0]}–{c["lines"][1]}'

# --------------------------------------------------------------------------- HOME
def ch_sources(n):
    lo, hi = CH[n]['lines']
    return [s for s in C['guide_sources'] if lo <= s['cited_on_guide_line'] <= hi]

SHORT = {1: 'Google Search Central', 2: 'Aggarwal et al., KDD 2024', 3: 'OpenAI, crawler docs', 4: 'Perplexity, crawler docs', 5: 'The llms.txt proposal'}
def src_line(s, href):
    return (f'<span class="a-src">{cite(s["n"], "", href, s["label"]).replace(" id=\"\"", "")}'
            f'<span><b>{esc(SHORT[s["n"]])}</b> · line {s["cited_on_guide_line"]}</span></span>')

# a sentence per chapter, each the guide's own words (line numbers in comments)
FIRST = {1: (12, "GEO isn't a new mystical discipline that replaces everything you already know about being findable online. It's an extension of it."),
         2: (18, "GEO doesn't replace SEO. It sits on top of it, and overlaps heavily with a related idea called AEO (answer engine optimisation)."),
         3: (33, "Not every AI answer involves a live search. Some come straight from what the model learned during training."),
         4: (48, "Start with what people genuinely ask, not what you wish they asked."),
         5: (72, "Blocking a crawler and welcoming one look almost identical from the outside."),
         6: (106, "Picture a small furniture shop, sells desks, run by two people and a website."),
         7: (118, "A realistic beginner plan. No agency required, no budget assumed."),
         8: (154, "A vendor's visibility score describes its own sample of prompts and platforms. It isn't a universal GEO rank."),
         9: (None, "Ten plain answers, from whether SEO is dead to how often to update.")}
for k, (ln, s) in FIRST.items():
    if ln: assert s in GUIDE[ln - 1].replace('’', "'"), (k, s)

def chapter_index(ns, base, compact=False, sentences=True):
    lis = ''
    for n in ns:
        c = CH[n]
        anchor = f'{base}#ch-{n:02d}'
        idattr = ' id="getting-started"' if (n == 7 and base == '/guide/' and not compact) else ''
        srcs = ''.join(src_line(s, f'/guide/#src-{s["n"]}') for s in ch_sources(n))
        body = f'<p class="a-index__t"><a href="{anchor}"><span class="a-num">{n:02d}</span>{esc(c["title"])}</a></p>'
        if sentences:
            body += f'<p class="a-index__s">{P(FIRST[n][1])}</p>'
        lis += (f'<li{idattr}><a class="a-ln" href="/guide.md#L{c["lines"][0]}">{lr(c)}</a>'
                f'<div class="a-index__body">{body}</div>'
                f'<div class="a-index__note">{srcs}</div></li>\n')
    return f'<ol class="a-index"{" data-compact" if compact else ""}>\n{lis}</ol>\n'

S = C['site']
home = ''
# 1 · the guide, in nine chapters
CITES['h1'] = cite(1, 'c-h1', '#n-c-h1', 'guide.md line 14')
CITES['h2'] = cite(2, 'c-h2', '#n-c-h2', 'guide.md line 14')
def line_note(n, cid, line, title, quote_href):
    return (f'<div class="a-note" id="n-{cid}" data-for="{cid}"><p class="a-note__head">'
            f'{cite(n, "", "#" + cid, "back to the text").replace(" id=\"\"", "")}'
            f'<span class="a-note__where">guide.md line {line}</span></p>'
            f'<p class="a-note__src"><a class="ds-text-link" href="{quote_href}">{esc(title)}</a></p></div>')
intro = ''
intro += row('<h2 class="a-h2" id="guide-title">The guide, in nine chapters</h2>', ln='guide.md', ln_href='/guide.md', cls='a-row--first')
INTRO = "A practical, source-linked guide to Generative Engine Optimisation (GEO) for business owners and marketers. So this isn't a page selling you a shortcut. It's a page explaining the mechanics, the actual research, and what you can do this month that's worth your time.⟦h1⟧"
intro += row('<p class="a-p">' + P(INTRO) + '</p>',
             notes=line_note(1, 'c-h1', 14, 'Chapter 01, What is GEO?', '/guide/#ch-01'))
intro += row('<p class="a-meta"><span>2,959 words</span><span>about 15 minutes</span><span>reviewed 14 September 2026</span><span><a href="/guide.md">guide.md</a></span></p>')
intro += '<div class="a-row" style="margin-block-start: var(--ds-space-10)"></div>\n'
intro += chapter_index(range(1, 10), '/guide/')
intro += f'<div class="a-row"><p class="a-after">{route("Read the guide from the start", "/guide/")}</p></div>\n'
home += sheet(intro, 'guide', 'guide-title', first=True)

# 2 · every guide, by category
g = row('<h2 class="a-h2" id="guides-title">Every guide, by category</h2>', ln='/guides/', ln_href='/guides/', cls='a-row--first')
g += row(f'<p class="a-meta"><span>{C["guides_total"]} guides</span><span>six categories</span></p>')
g += '<div class="a-row" style="margin-block-start: var(--ds-space-8)"></div>\n'
def fmt_date(s):
    d = date.fromisoformat(s); return f'{d.day} {d.strftime("%b")} {d.year}'
for cat in C['categories']:
    gs = sorted([x for x in C['guides'] if x['category'] == cat['id']], key=lambda x: x['title'].lower())
    assert len(gs) == cat['count']
    lis = ''.join(f'<li><a href="{x["url"]}">{esc(x["title"]).replace(chr(39), "’")}</a>'
                  f'<p class="a-meta"><span>{x["sources"]} sources</span><span>{fmt_date(x["updated"])}</span></p></li>\n' for x in gs)
    g += (f'<div class="a-cat" id="cat-{cat["id"]}"><div class="a-cat__head"><p class="a-ln">{cat["count"]} guides</p>'
          f'<h3 class="a-h3">{esc(cat["title"])}</h3><p class="a-cat__blurb">{esc(cat["blurb"])}</p></div>'
          f'<ul class="a-guides">\n{lis}</ul></div>\n')
home += sheet(g, 'guides', 'guides-title')

# 3 · sign-up, one quiet row
su = C['signup']
form = (f'<form class="a-form" action="/api/subscribe" method="post">'
        f'<div class="a-form__row"><div class="a-form__field"><label class="ds-label" for="signup-email">{su["label"]}</label>'
        f'<div class="ds-text-input" data-variant="jstov"><input class="ds-text-input__control" id="signup-email" name="email" type="email" autocomplete="email" maxlength="254" required placeholder="you@yourbusiness.com"></div></div>'
        f'<button class="ds-button-secondary" type="submit"><span class="ds-button-secondary__label">{su["button"]}</span></button></div>'
        f'<label class="ds-checkbox"><input class="ds-checkbox__input" name="consent" type="checkbox" value="yes" required><span class="ds-checkbox__text"><span class="ds-checkbox__label">{esc(su["consent"]).replace(chr(39), "’")}</span></span></label>'
        f'<div class="a-hp" aria-hidden="true"><label for="company">Company</label><input id="company" name="company" tabindex="-1" autocomplete="off"></div>'
        f'</form>')
upd = row(f'<div><h2 class="a-h2" data-size="sm" id="updates-title">{su["title"]}</h2><p class="a-p a-muted" style="margin-block-start: var(--ds-space-2)">{P(su["body"])}</p>{form}</div>',
          ln='updates', cls='a-row--first',
          notes='<div class="a-note"><p class="a-note__body"><a class="ds-text-link" href="/privacy/">Privacy</a> · Email confirmation required. Nothing else is sent.</p></div>'.replace(' Nothing else is sent.', ''))
upd = upd.replace('<div class="a-notes">', '<div class="a-notes" data-flow>')
home += sheet(upd, 'updates', 'updates-title')
write('home.html', home)

# --------------------------------------------------------------------------- GUIDE
def guide_block(lo, hi, cite_at):
    """render guide.md lines lo..hi into rows; cite_at = {line: (sentence_end_substring, source_n)}"""
    out = ''; i = lo
    while i <= hi:
        l = GUIDE[i - 1]
        if not l.strip(): i += 1; continue
        if l.startswith('## '):
            n = [c['n'] for c in C['guide_chapters'] if c['lines'][0] == i][0]
            out += row(f'<h2 class="a-h2" id="ch-{n:02d}-title"><span class="a-num">{n:02d}</span>{P(l[3:])}</h2>',
                       ln=lr(CH[n]), ln_href=f'/guide.md#L{i}', cls='a-row--h2" id="ch-%02d' % n)
            i += 1; continue
        if l.startswith('### '):
            out += row(f'<h3 class="a-h3">{P(l[4:])}</h3>', ln=f'L{i}', ln_href=f'/guide.md#L{i}', cls='a-row--h3')
            i += 1; continue
        if l.startswith('|'):
            j = i
            while j <= hi and GUIDE[j - 1].startswith('|'): j += 1
            out += row(table(parse_table(GUIDE[i - 1:j - 1]), 'SEO and GEO compared'), ln=f'L{i}–{j - 1}')
            i = j; continue
        if re.match(r'\d+\. ', l):
            j = i; items = []
            while j <= hi and re.match(r'\d+\. ', GUIDE[j - 1]): items.append(re.sub(r'^\d+\. ', '', GUIDE[j - 1])); j += 1
            out += row('<ol class="a-list">' + ''.join(f'<li>{P(x)}</li>' for x in items) + '</ol>')
            i = j; continue
        if l.startswith('- '):
            j = i; items = []
            while j <= hi and GUIDE[j - 1].startswith('- '): items.append(GUIDE[j - 1][2:]); j += 1
            out += row('<ul class="a-list">' + ''.join(f'<li>{P(x)}</li>' for x in items) + '</ul>')
            i = j; continue
        if l.startswith('> '):
            out += row(f'<blockquote class="a-quote"><p class="a-p">{P(l[2:])}</p></blockquote>'); i += 1; continue
        text = l; notes = ''
        if i in cite_at:
            end, n = cite_at[i]
            assert end in text, (i, end)
            cid = f'c-g{n}'
            CITES[cid.replace('-', '')] = cite(n, cid, f'#n-{cid}', GS[n]['label'])
            text = text.replace(end, end + '⟦' + cid.replace('-', '') + '⟧', 1)
            notes = note(n, cid, GS[n]['label'], GS[n]['url'], f'cited on line {i}')
        out += row(f'<p class="a-p">{P(text)}</p>', notes=notes)
        i += 1
    return out

gp = ''
gp += row('<h1 class="a-h1 a-wide" id="guide-h1">What is GEO?</h1>', ln='guide.md', ln_href='/guide.md', cls='a-row--first')
LEDE = "A practical, source-linked guide to Generative Engine Optimisation (GEO) for business owners and marketers. What it means, what actually helps, and what's still guesswork."
gp += row('<p class="a-p a-lede">' + P(LEDE) + '</p>',
          notes='<div class="a-note"><p class="a-note__title">How to read this page</p><p class="a-note__body">Blue numbers are sources. Each one sits here in the margin, level with the sentence it supports. The line numbers on the left are the lines of <a class="ds-text-link" href="/guide.md">guide.md</a>, the same text as plain Markdown.</p></div>')
gp += row('<p class="a-meta"><span>Updated 14 September 2026</span><span>2,959 words</span><span>15 minutes</span></p>')
gp += '<div class="a-row" style="margin-block-start: var(--ds-space-10)"><h2 class="a-h3" id="contents-title">Contents</h2></div>\n'
gp += '<div class="a-row" style="margin-block-start: var(--ds-space-3)"></div>\n'
gp += chapter_index(range(1, 10), '', compact=True, sentences=False)
gp += guide_block(8, 68, {27: ('eligible for a search snippet to be a supporting link in AI Overviews or AI Mode.', 1),
                          56: ('with results varying a lot by domain and topic.', 2)})
guide_html = sheet(gp, 'top', 'guide-h1', first=True)

wo = row('<h2 class="a-h2" id="on-title">Read on: chapters 05 to 09</h2>', ln='L70–218', ln_href='/guide.md#L70', cls='a-row--first')
wo += '<div class="a-row" style="margin-block-start: var(--ds-space-8)"></div>\n'
wo += chapter_index(range(5, 10), '/guide/')
guide_html += sheet(wo, 'read-on', 'on-title')

srcs = row('<h2 class="a-h2" id="sources-title">Sources</h2>', ln='5 sources', cls='a-row--first')
srcs += row(f'<p class="a-p a-muted">{P(C["guide_sources_note"])}</p>')
srcs += '<div class="a-row" style="margin-block-start: var(--ds-space-8)"></div>\n'
lis = ''
for s in C['guide_sources']:
    l = s['cited_on_guide_line']; ch = [c for c in C['guide_chapters'] if c['lines'][0] <= l <= c['lines'][1]][0]
    back = f'#c-g{s["n"]}' if l in (27, 56) else f'/guide/#ch-{ch["n"]:02d}'
    pill = cite(s['n'], f'src-{s["n"]}', back, s['label'])
    lis += (f'<li><p class="a-ln">{pill}</p><div class="a-index__body"><p class="a-p">{link(esc(s["label"]), s["url"])}</p>'
            f'<p class="a-index__s a-meta">{esc(domain(s["url"]))}</p></div>'
            f'<div class="a-index__note"><span class="a-meta">line {l} · chapter {ch["n"]:02d}, {esc(ch["title"])}</span></div></li>\n')
srcs += f'<ol class="a-index" data-compact>\n{lis}</ol>\n'
guide_html += sheet(srcs, 'sources', 'sources-title')
write('guide.html', guide_html)

# --------------------------------------------------------------------------- ARTICLE
A = C['article']
fm, body = ART.split('\n---\n', 1)
body = body.replace('](/#how-it-works)', '](/guide/#ch-03)')  # the guide moves to /guide/ in this option
body = body.strip('\n')
# footnotes per footnote_map only
for k, fmap in enumerate(A['footnote_map'], 1):
    ph = fmap['phrase']; n = fmap['source']
    idx = body.find(ph); assert idx >= 0, ph
    m = re.compile(r'[.;](["”])?(?=\s|$)').search(body, idx + len(ph))
    pos = m.end()
    key = f'ca{k}'
    CITES[key] = cite(n, f'c-a{k}', f'#n-c-a{k}', A['sources'][n - 1]['label'])
    body = body[:pos] + f'⟦{key}⟧' + body[pos:]

def md_rows(md, note_for=None, h2_cls=True, slugify=None):
    out = ''; lines = md.split('\n'); i = 0
    while i < len(lines):
        l = lines[i]
        if not l.strip(): i += 1; continue
        if l.startswith('## '):
            t = l[3:]; sid = re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')
            out += row(f'<h2 class="a-h2" id="{sid}">{P(t)}</h2>', cls='a-row--h2'); i += 1; continue
        if l.startswith('### '):
            out += row(f'<h3 class="a-h3">{P(l[4:])}</h3>', cls='a-row--h3'); i += 1; continue
        if l.startswith('|'):
            j = i
            while j < len(lines) and lines[j].startswith('|'): j += 1
            out += row(table(parse_table(lines[i:j]), 'Comparison table')); i = j; continue
        if l.startswith('```'):
            j = i + 1
            while not lines[j].startswith('```'): j += 1
            code = '\n'.join(lines[i + 1:j])
            out += row(code_block(l[3:], code)); i = j + 1; continue
        if l.startswith('- '):
            j = i; items = []
            while j < len(lines) and lines[j].startswith('- '): items.append(lines[j][2:]); j += 1
            out += row('<ul class="a-list">' + ''.join(f'<li>{P(x)}</li>' for x in items) + '</ul>'); i = j; continue
        if l.startswith('<!--'): i += 1; continue
        keys = re.findall(r'⟦(ca\d+)⟧', l)
        notes = ''
        for kk in keys:
            k = int(kk[2:]); n = A['footnote_map'][k - 1]['source']; s = A['sources'][n - 1]
            notes += note(n, f'c-a{k}', s['label'], s['url'], f'source {n} of 7')
        out += row(f'<p class="a-p">{P(l)}</p>', notes=notes)
        i += 1
    return out

def code_block(lang, code):
    if '\n' not in code:
        kind = ' data-kind="url"' if code.startswith('http') else ''
        prompt = '<span class="ds-code-snippet__prompt" aria-hidden="true">$</span>' if lang == 'sh' else ''
        size = ' data-size="lg"' if code.startswith('http') else ''
        return (f'<div class="ds-code-snippet" data-variant="jstov"{size} data-overflow="wrap" role="group" aria-label="{"MCP server address" if kind else "Command"}">{prompt}'
                f'<code class="ds-code-snippet__code"{kind}>{esc(code)}</code>'
                f'<button class="ds-button-secondary ds-code-snippet__copy" data-variant="ghost-text" data-size="sm" type="button" aria-label="Copy"><span class="ds-button-secondary__label ds-code-snippet__copy-idle">Copy</span><span class="ds-button-secondary__label ds-code-snippet__copy-done">Copied</span></button>'
                f'<span class="ds-code-snippet__status" aria-live="polite"></span></div>')
    return f'<pre class="a-pre" aria-label="{lang}"><code>{esc(code)}</code></pre>'

ap = ''
crumbs = ('<nav class="ds-breadcrumb" data-variant="jstov" data-sep="chevron" aria-label="Breadcrumb"><ol class="ds-breadcrumb__list">'
          '<li class="ds-breadcrumb__item"><a class="ds-breadcrumb__link" href="/guides/">All guides</a><span class="ds-breadcrumb__sep" aria-hidden="true"></span></li>'
          '<li class="ds-breadcrumb__item"><a class="ds-breadcrumb__link" href="/guides/#cat-compare">Comparisons</a><span class="ds-breadcrumb__sep" aria-hidden="true"></span></li>'
          '<li class="ds-breadcrumb__item"><span class="ds-breadcrumb__leaf" aria-current="page">AI Mode vs AI Overviews</span></li></ol></nav>')
ap += row(crumbs, cls='a-row--first')
ap += row(f'<h1 class="a-h1 a-wide" id="art-h1">{P(A["title"])}</h1>')
ap += row(f'<p class="a-meta"><span>Updated {A["updated"]}</span><span>{A["read_minutes"]} minutes</span><span>{len(A["sources"])} sources</span><span><a href="{A["md"]}">Markdown version</a></span></p>')
ap += row(f'<p class="a-p a-lede" data-weight="medium">{P(A["summary"])}</p>', ln='Short answer', cls='a-short" style="margin-block-start: var(--ds-space-10)')
ap += md_rows(body)
# FAQ
ap += row('<h2 class="a-h2" id="common-questions">Common questions</h2>', cls='a-row--h2')
for qa in A['faq']:
    ap += row(f'<h3 class="a-h3">{P(qa["q"])}</h3>', cls='a-row--h3')
    ap += row(f'<p class="a-p">{P(qa["a"])}</p>')
art_html = sheet(ap, 'article', 'art-h1', first=True)

sp = row('<h2 class="a-h2" id="art-sources">Sources</h2>', ln=f'{len(A["sources"])} sources', cls='a-row--first')
sp += row(f'<p class="a-p a-muted">{P(A["sources_note"])}</p>')
sp += '<div class="a-row" style="margin-block-start: var(--ds-space-8)"></div>\n'
lis = ''
for n, s in enumerate(A['sources'], 1):
    first = next(k for k, f in enumerate(A['footnote_map'], 1) if f['source'] == n)
    times = sum(1 for f in A['footnote_map'] if f['source'] == n)
    lis += (f'<li><p class="a-ln">{cite(n, f"src-{n}", f"#c-a{first}", s["label"])}</p><div class="a-index__body"><p class="a-p">{link(esc(s["label"]), s["url"])}</p>'
            f'<p class="a-index__s a-meta">{esc(domain(s["url"]))}</p></div>'
            f'<div class="a-index__note"><span class="a-meta">cited {"once" if times == 1 else "twice"} in the text</span></div></li>\n')
sp += f'<ol class="a-index" data-compact>\n{lis}</ol>\n'
art_html += sheet(sp, 'sources', 'art-sources')

rn = row('<h2 class="a-h2" id="read-next">Read next</h2>', ln='Comparisons', cls='a-row--first')
rn += '<div class="a-row" style="margin-block-start: var(--ds-space-8)"></div>\n'
lis = ''
for slug in A['related']:
    r = C['related_titles'][slug]
    gd = next((x for x in C['guides'] if x['slug'] == slug), None)
    meta = f'<span class="a-meta">{gd["sources"]} sources · {fmt_date(gd["updated"])}</span>' if gd else ''
    lis += (f'<li><span class="a-ln"></span><div class="a-index__body"><p class="a-index__t"><a href="/{slug}/">{P(r["title"])}</a></p>'
            f'<p class="a-index__s">{P(r["summary"])}</p></div><div class="a-index__note">{meta}</div></li>\n')
rn += f'<ol class="a-index">\n{lis}</ol>\n'
art_html += sheet(rn, 'next', 'read-next')
write('article.html', art_html)

# --------------------------------------------------------------------------- MCP
mfm, mbody = MCP.split('\n---\n', 1)
mbody = mbody.strip('\n')
mp = ''
mp += row('<h1 class="a-h1 a-wide" id="mcp-h1">MCP server: use this site from your AI assistant</h1>', ln='/mcp', cls='a-row--first')
mp += row('<p class="a-meta"><span>Updated 2 November 2026</span><span>free</span><span>read-only</span><span>no account, no key</span></p>')
mr = md_rows(mbody)
# margin notes for the MCP page (flowing, not cited): the facts beside the thing they qualify
addr_note = ('<div class="a-notes"><div class="a-note">'
             '<p class="a-note__body">It speaks MCP over Streamable HTTP. There is no sign-in, no API key and nothing to install on the site’s side.</p></div></div>')
mr = mr.replace('<div class="ds-code-snippet" data-variant="jstov" data-size="lg"', '§ADDR§<div class="ds-code-snippet" data-variant="jstov" data-size="lg"', 1)
# put the note into the address row
mr = re.sub(r'(<div class="a-row">)§ADDR§(.*?</div>)(</div>\n)', lambda m: m.group(1) + m.group(2) + addr_note + m.group(3), mr, count=1, flags=re.S)
mr = mr.replace('§ADDR§', '')
chk = ('<div class="a-notes"><div class="a-note">'
       '<p class="a-note__body">Setup steps checked against Anthropic’s and OpenAI’s documentation on 2 November 2026.</p></div></div>')
mr = mr.replace('<h3 class="a-h3">Claude (claude.ai and the desktop app)</h3></div>', '<h3 class="a-h3">Claude (claude.ai and the desktop app)</h3>' + chk + '</div>', 1)
# drop the paragraph that duplicates the address note
mr = re.sub(r'<div class="a-row"><p class="a-p">It speaks MCP over Streamable HTTP\..*?</p></div>\n', '', mr)
mp += mr
mcp_html = sheet(mp, 'mcp', 'mcp-h1', first=True)
write('mcp.html', mcp_html)

# --------------------------------------------------------------------------- specs
ATTR = {"depth": "flat", "selection": "tint", "buttons": "pill", "labels": "sentence", "controls": "sentence", "accent-scope": "action",
        "hover": "tint", "density": "default", "texture": "none", "ornament": "none", "illustration": "none"}
WM = '<span class="ds-marketing-nav__wordmark x-wm"><b>w</b>hat<b>i</b>s<b>g</b>eo<i>.</i></span>'
REPLACE = {"<span class=\"ds-marketing-nav__wordmark\">whatisgeo.</span>": WM,
           "<span class=\"ds-footer__wordmark\">whatisgeo.</span>": "<span class=\"ds-footer__wordmark x-wm\"><b>w</b>hat<b>i</b>s<b>g</b>eo<i>.</i></span>",
           "data-cta=\"outline\"": "data-cta=\"text\""}

def nav(current=None):
    links = [{"label": "The guide", "href": "/guide/"}, {"label": "All guides", "href": "/guides/"}, {"label": "Get started", "href": "/guide/#getting-started"}]
    for l in links:
        if l['label'] == current: l['current'] = True
    return {"section": "l-nav-01-marketing-top-nav", "variant": "jstov",
            "note": "slim bar: wordmark, three routes, 'Stay in the loop' as a text action, the guide's review date as the status token",
            "props": {"id": "nav", "brand": "whatisgeo.", "brand_href": "/", "mark_html": "", "nav_label": "Main navigation", "menu_label": "Menu",
                      "links": links, "secondary_label": "Stay in the loop", "secondary_href": "/#updates",
                      "status_label": "Reviewed 14 Sep 2026", "status_href": "/guide.md", "status_state": "version"}}

FOOT = {"section": "l-foot-01-sitemap-footer", "variant": "jstov", "omit": ["ds-footer__ai-rail", "ds-footer__theme", "ds-footer__status", "ds-footer__legal-end"],
        "note": "small and ruled: no giant wordmark, no AI tiles; the legal line kept verbatim",
        "props": {"id": "foot", "brand_name": "whatisgeo.", "brand_href": "/", "brand_home_label": "What is GEO home",
                  "brand_tagline": "A practical, source-linked guide to Generative Engine Optimisation for business owners and marketers.",
                  "mark_html": "", "ai_label": "", "ai_tiles": [],
                  "groups": [
                      {"key": "read", "heading": "Read", "links": [{"label": "The guide", "href": "/guide/"}, {"label": "All guides", "href": "/guides/"}, {"label": "Get started", "href": "/guide/#getting-started"}]},
                      {"key": "machines", "heading": "For machines", "links": [{"label": "llms.txt", "href": "/llms.txt"}, {"label": "Text version", "href": "/guide.md"}, {"label": "MCP server", "href": "/mcp-server/"}, {"label": "Source", "href": "https://github.com/StovBuilds/whatisgeo", "external": True}]},
                      {"key": "site", "heading": "Site", "links": [{"label": "Privacy", "href": "/privacy/"}, {"label": "Contact", "href": "mailto:hello@whatisgeo.app"}]}],
                  "card_show": False, "signoff_html": "",
                  "copyright": "© 2026 What is GEO. " + S['legal'],
                  "status_label": "Reviewed 14 Sep 2026", "status_href": "/guide.md", "status_state": "ok",
                  "legal_links": [], "legal_mono": True, "dark_island": False, "show_terminator": False, "theme_label": "Theme"}}
SKIP = {"html": "<a class=\"ds-button-secondary x-skip\" href=\"#main\"><span class=\"ds-button-secondary__label\">Skip to content</span></a>"}

def spec(title, desc, body_modules, current, home=False, comment=''):
    mods = [{"file": "../_stage/style.html"}, {"file": "partials/_style.html"}, SKIP, nav(current), {"html": "<main id=\"main\">"}]
    if home: mods.append({"file": "../_stage/hero.html"})
    mods += body_modules + [{"html": "</main>"}, FOOT]
    if home: mods.append({"file": "../_stage/script.html"})
    mods.append({"file": "partials/_script.html"})
    return {"$comment": comment, "title": title, "description": desc, "lang": "en-GB", "theme": "whatisgeo", "attributes": ATTR, "replace": REPLACE, "modules": mods}

specs = {
    'home': spec("What is GEO? A practical guide to Generative Engine Optimisation", S['description'], [{"file": "partials/home.html", "note": "below the stage: the guide's contents by line range, every guide by category, sign-up as one row"}], None, home=True,
                 comment="Option A · margin. The stage hero as is, then the site read as an annotated text: a rail of guide.md line ranges, a ~66ch reading column, a margin for notes joined to their sentence by the hero's blue thread. GENERATED partials (scratch gen.py) from content.json + assets/."),
    'guide': spec("The guide: What is GEO?", S['description'], [{"file": "partials/guide.html", "note": "chapters 01-04 in full, the way on (05-09), the guide's five sources; footnotes only on lines 27 and 56"}], "The guide",
                  comment="Option A · margin. The guide at its own URL (/guide/) set as an annotated text. Line labels are guide.md's own."),
    'article': spec(A['title'] + " | What is GEO", A['summary'], [{"file": "partials/article.html", "note": "footnotes only where article.footnote_map allows (8 places)"}], "All guides",
                    comment="Option A · margin. One guide page: short answer, body with the honest footnotes in the margin, FAQ, sources, read next."),
    'mcp': spec("MCP server: use this site from your AI assistant | What is GEO", "whatisgeo.app has a free, read-only MCP server at https://whatisgeo.app/mcp.", [{"file": "partials/mcp.html"}], None,
                comment="Option A · margin. The MCP page: the address as the thing to copy, the three tools, setup per client; margin notes carry the qualifiers."),
}
for k, v in specs.items():
    json.dump(v, open(f'{OUT}/{k}.json', 'w'), indent=2, ensure_ascii=False)
print('ok')
