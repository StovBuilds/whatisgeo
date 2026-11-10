#!/usr/bin/env python3
"""linefile (option B) generator: writes linefile/partials/{home,guide,article,mcp}-body.html from the real files.
Every gutter number is the line's real number in its .md file (blank lines and Markdown fences skipped, never renumbered)."""
import json, re, html
from urllib.parse import urlparse

ROOT = '/home/jack/repos/whatisgeo/.claude/worktrees/site-options/design/site-options'
OUT = ROOT + '/linefile/partials'
C = json.load(open(ROOT + '/content.json'))
GUIDE = open(ROOT + '/assets/guide.md').read().split('\n')
ART = open(ROOT + '/assets/article-ai-mode-vs-ai-overviews.md').read().split('\n')
MCP = open(ROOT + '/assets/mcp-server.md').read().split('\n')

def L(lines, n): return lines[n - 1]
def nlines(lines): return len(lines) - (1 if lines and lines[-1] == '' else 0)

ICON_DOC = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/></svg>'
ICON_DIR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h6l2 2h8v11H4z"/></svg>'
CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'

# ---------------------------------------------------------------- inline Markdown → HTML
def typo(t):
    t = re.sub(r"(?<=\w)'(?=\w)", '’', t)
    t = re.sub(r"(^|[\s(])'", r'\1‘', t)
    t = t.replace("'", '’')
    out, open_q = [], True
    for ch in t:
        if ch == '"':
            out.append('“' if open_q else '”'); open_q = not open_q
        else: out.append(ch)
    return ''.join(out)

def link(text, url):
    u = url
    if u == '/#how-it-works': u = '/guide/#L31'
    ext = u.startswith('http') and 'whatisgeo.app' not in urlparse(u).netloc
    if 'whatisgeo.app' in u: u = urlparse(u).path or '/'
    t = esc_text(text)
    if ext:
        return f'<a class="ds-text-link" href="{html.escape(u)}" rel="noopener">{t}<span class="b-ext" aria-hidden="true">↗</span></a>'
    return f'<a class="ds-text-link" href="{html.escape(u)}">{t}</a>'

def esc_text(t):
    # bold, then typography, on plain text
    parts = re.split(r'(\*\*[^*]+\*\*)', t)
    o = ''
    for p in parts:
        if p.startswith('**') and p.endswith('**'): o += '<strong>' + typo(html.escape(p[2:-2], quote=False)) + '</strong>'
        else: o += typo(html.escape(p, quote=False))
    return o

def inl(t):
    o, i = '', 0
    for m in re.finditer(r'`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\x00F(\d+)\x00', t):
        o += esc_text(t[i:m.start()])
        if m.group(1) is not None: o += f'<code class="b-code">{html.escape(m.group(1))}</code>'
        elif m.group(2) is not None: o += link(m.group(2), m.group(3))
        else: o += PILL[int(m.group(4))]
        i = m.end()
    return o + esc_text(t[i:])

PILL = {}
def pills(sources):
    PILL.clear()
    for n, s in enumerate(sources, 1):
        PILL[n] = (f'<a class="ds-citation-sources-cite" data-variant="copilot-numbered-reference-list" href="#src-{n}" '
                   f'aria-label="Source {n}: {html.escape(s["label"])}"><span class="ds-citation-sources-cite__num">{n}</span></a>')

def mark(t, phrase, n):
    """footnote n at the end of the sentence holding phrase, before its full stop"""
    i = t.find(phrase); assert i >= 0, phrase
    m = re.compile(r'[.?!](?=[”"]?(\s|$))').search(t, i + len(phrase))
    j = m.start() if m else len(t)
    return t[:j] + f'\x00F{n}\x00' + t[j:]

# ---------------------------------------------------------------- line rows
def row(n, body, kind='p', marker='', cls='', attrs=''):
    tag = {'p': 'p', 'h1': 'h1', 'h2': 'h2', 'h3': 'h3', 'meta': 'p'}.get(kind, 'div')
    tcls = {'h1': 'b-l__t b-h1', 'h2': 'b-l__t b-h2', 'h3': 'b-l__t b-h3'}.get(kind, 'b-l__t')
    num = f'<span class="b-l__n" aria-hidden="true">{n}</span>' if n != '' else '<span class="b-l__n" aria-hidden="true"></span>'
    return (f'<div class="b-l{(" " + cls) if cls else ""}" id="L{n}" data-kind="{kind}"{attrs}>{num}'
            f'<span class="b-l__m" aria-hidden="true">{html.escape(marker)}</span><{tag} class="{tcls}">{body}</{tag}></div>')

def table_html(rows, code_first=False, label=''):
    head, body = rows[0], rows[2:]
    cells = lambda r: [c.strip() for c in r.strip().strip('|').split('|')]
    h = ''.join(f'<th class="ds-data-table__th" scope="col">{inl(c) if c else "<span class=\"ds-sr-only\">Row</span>"}</th>' for c in cells(head))
    b = ''
    for r in body:
        cs = cells(r)
        first = cs[0]
        f = inl(first)
        b += ('<tr class="ds-data-table__row">' + f'<th class="ds-data-table__td ds-data-table__primary" scope="row">{f}</th>'
              + ''.join(f'<td class="ds-data-table__td">{inl(c)}</td>' for c in cs[1:]) + '</tr>')
    return (f'<div class="ds-data-table"><div class="ds-data-table__scroll"><table class="ds-data-table__table"'
            f'{(" aria-label=\"" + html.escape(label) + "\"") if label else ""}><thead class="ds-data-table__head"><tr class="ds-data-table__row">{h}</tr></thead>'
            f'<tbody>{b}</tbody></table></div></div>')

def render(lines, start, end, cited=(), notes=None, table_labels=None, code_mode=False):
    """render file lines [start, end] as numbered rows. notes: {line: transformed raw text}"""
    notes = notes or {}; table_labels = table_labels or {}
    o, n = [], start
    in_fence, fence_lang, fence_buf = False, '', []
    while n <= end:
        raw = notes.get(n, L(lines, n))
        s = raw.strip()
        if s.startswith('```'):
            if not in_fence: in_fence, fence_lang, fence_buf = True, s[3:], []
            else:
                o.append(code_block(fence_lang, fence_buf)); in_fence = False
            n += 1; continue
        if in_fence: fence_buf.append((n, raw)); n += 1; continue
        if not s or s.startswith('<!--'): n += 1; continue
        if s.startswith('|'):
            t0, rows = n, []
            while n <= end and L(lines, n).strip().startswith('|'): rows.append(notes.get(n, L(lines, n))); n += 1
            o.append(row(t0, table_html(rows, label=table_labels.get(t0, '')), 'table', '|', attrs=f' data-to="{n-1}"'))
            continue
        m = re.match(r'^(#{1,3}) (.*)$', s)
        if m:
            k = {1: 'h1', 2: 'h2', 3: 'h3'}[len(m.group(1))]
            o.append(row(n, inl(m.group(2)), k, m.group(1))); n += 1; continue
        m = re.match(r'^(\d+\.|-) (.*)$', s)
        if m:
            items = []
            ordered = m.group(1) != '-'
            while n <= end:
                mm = re.match(r'^(\d+\.|-) (.*)$', notes.get(n, L(lines, n)).strip())
                if not mm: break
                items.append(row(n, inl(mm.group(2)), 'li', mm.group(1), cls='b-li', attrs=' data-cited' if n in cited else '').replace('<div class="b-l', '<li class="b-l', 1)[:-6] + '</li>')
                n += 1
            tag = 'ol' if ordered else 'ul'
            o.append(f'<{tag} class="b-list">' + ''.join(items) + f'</{tag}>')
            continue
        m = re.match(r'^(Canonical|Publisher|Contact|Updated): (.*)$', s)
        if m:
            o.append(row(n, f'<span class="b-key">{m.group(1)}:</span> {inl(m.group(2))}', 'meta')); n += 1; continue
        o.append(row(n, inl(s), 'p', attrs=' data-cited' if n in cited else '')); n += 1
    return '\n'.join(o)

def code_block(lang, buf):
    if lang == 'text' and len(buf) == 1:
        n, t = buf[0]
        return row(n, snippet(t.strip(), 'The MCP server address', url=True), 'code', '', cls='b-l--snip')
    if lang == 'sh' and len(buf) == 1:
        n, t = buf[0]
        return row(n, snippet(t.strip(), 'Add the server in Claude Code', prompt=True), 'code', '', cls='b-l--snip')
    o = []
    for i, (n, t) in enumerate(buf):
        pos = 'first' if i == 0 else ('last' if i == len(buf) - 1 else 'mid')
        o.append(row(n, f'<code>{html.escape(t) or " "}</code>', 'code', '', cls='b-l--code', attrs=f' data-pos="{pos}"'))
    return '<div class="b-codeblock" role="group" aria-label="' + lang.upper() + ' configuration">' + '\n'.join(o) + '</div>'

def snippet(code, label, url=False, prompt=False):
    p = '<span class="ds-code-snippet__prompt" aria-hidden="true">$</span>' if prompt else ''
    k = ' data-kind="url"' if url else ''
    return (f'<span class="ds-code-snippet" data-variant="jstov" data-overflow="wrap" role="group" aria-label="{label}">{p}'
            f'<code class="ds-code-snippet__code"{k}>{html.escape(code)}</code>'
            '<button class="ds-button-secondary ds-code-snippet__copy" data-variant="ghost-text" data-size="sm" type="button" aria-label="Copy">'
            '<span class="ds-button-secondary__label ds-code-snippet__copy-idle">Copy</span>'
            '<span class="ds-button-secondary__label ds-code-snippet__copy-done">Copied ✓</span></button>'
            '<span class="ds-code-snippet__status" aria-live="polite"></span></span>')

# ---------------------------------------------------------------- shared pieces
def fmt(n): return f'{n:,}'
CH = C['guide_chapters']

def nav_item(label, href, trailing='', icon='', current=False, level=0, title=''):
    cur = ' aria-current="page"' if current else ''
    lv = f' style="--_level: {level}"' if level else ''
    tt = f' title="{html.escape(title)}"' if title else ''
    tr = f'<span class="ds-nav-item__trailing"><span class="ds-nav-item__count">{trailing}</span></span>' if trailing else ''
    return (f'<li><a class="ds-nav-item" href="{href}"{cur}{lv}{tt}><span class="ds-nav-item__icon">{icon}</span>'
            f'<span class="ds-nav-item__label">{html.escape(label)}</span>{tr}</a></li>')

def rail(page, current_file):
    on_guide = page == 'guide'
    gbase = '' if on_guide else '/guide/'
    chapters = ''
    if page in ('home', 'guide'):
        chapters = ('<ul class="ds-sidebar-nav-panel__tree" aria-label="Chapters of guide.md">' +
                    ''.join(nav_item(c['title'], f'{gbase}#L{c["lines"][0]}', str(c['lines'][0])) for c in CH) + '</ul>')
    cats = ''
    for cat in C['categories']:
        cats += nav_item(cat['title'], f'/guides/#{cat["id"]}', str(cat['count']), ICON_DIR)
        if page == 'article' and cat['id'] == 'compare':
            gs = sorted([g for g in C['guides'] if g['category'] == 'compare'], key=lambda g: g['slug'])
            cats += ('<li class="b-rail__sub"><ul class="ds-sidebar-nav-panel__tree" aria-label="Comparisons">' +
                     ''.join(nav_item(g['slug'] + '.md', g['url'], '', '', g['slug'] == C['article']['slug'], title=g['title']) for g in gs) + '</ul></li>')
    machines = (nav_item('llms.txt', '/llms.txt', '', ICON_DOC) + nav_item('llms-full.txt', '/llms-full.txt', '', ICON_DOC) +
                nav_item('MCP server', '/mcp-server/', '', ICON_DOC, page == 'mcp'))
    return f'''<div class="b-rail" data-density="compact">
  <button class="ds-sidebar-nav-panel__toggle" data-kind="disclosure" type="button" aria-controls="b-files" aria-expanded="false"><span class="ds-sidebar-nav-panel__toggle-label">Files</span><span class="ds-sidebar-nav-panel__toggle-count">{current_file}</span><span class="ds-sidebar-nav-panel__toggle-chevron">{CHEV}</span></button>
  <aside class="ds-sidebar-nav-panel" id="b-files" data-variant="lloyds-inline-disclosure" aria-label="Files on this site">
    <div class="ds-sidebar-nav-panel__header"><h2 class="ds-sidebar-nav-panel__title">whatisgeo.app/</h2></div>
    <div class="ds-sidebar-nav-panel__body">
      <div class="ds-sidebar-nav-panel__group">
        <ul class="ds-sidebar-nav-panel__list">{nav_item("guide.md", "/guide/", str(C["site"]["guide_lines"]) + " lines", ICON_DOC, page == "guide")}</ul>
        {chapters}
      </div>
      <div class="ds-sidebar-nav-panel__group">
        <h3 class="ds-sidebar-nav-panel__group-label">Guides, {C["guides_total"]} files</h3>
        <ul class="ds-sidebar-nav-panel__list">{cats}</ul>
      </div>
      <div class="ds-sidebar-nav-panel__group">
        <h3 class="ds-sidebar-nav-panel__group-label">For machines</h3>
        <ul class="ds-sidebar-nav-panel__list">{machines}</ul>
      </div>
    </div>
  </aside>
</div>'''

def filebar(name, meta, link_label='', link_href=''):
    lk = (f'<a class="ds-text-link b-file__act" data-kind="route" href="{link_href}"><span class="ds-text-link__label">{link_label}</span></a>' if link_href else '')
    return (f'<div class="b-file"><p class="b-file__name">{ICON_DOC}<span>{name}</span></p>'
            f'<ul class="b-file__meta">' + ''.join(f'<li>{m}</li>' for m in meta) + f'</ul>{lk}</div>')

def domain(u): return urlparse(u).netloc.replace('www.', '')

def sources_block(title, items, note, hid):
    lis = ''
    for n, (label, url, where) in enumerate(items, 1):
        lis += (f'<li class="ds-citation-sources__card"><a class="ds-citation-sources__link" href="{html.escape(url)}" id="src-{n}" rel="noopener">'
                f'<span class="ds-citation-sources__meta"><span class="ds-citation-sources__index">{n}</span><span class="ds-citation-sources__domain">{domain(url)} · {where}</span></span>'
                f'<span class="ds-citation-sources__name">{html.escape(label)}</span></a></li>')
    return (f'<section class="ds-citation-sources" data-variant="copilot-numbered-reference-list" data-mark="mono" aria-labelledby="{hid}">'
            f'<header class="ds-citation-sources__header"><h2 class="ds-citation-sources__title" id="{hid}">{title}</h2>'
            f'<span class="ds-citation-sources__count">{len(items)}</span></header>'
            f'<ol class="ds-citation-sources__grid">{lis}</ol></section><p class="b-note">{note}</p>')

def guide_rows(guides):
    o = ''
    for g in guides:
        o += (f'<li class="b-row"><a class="b-row__t" href="{g["url"]}">{esc_text(g["title"])}</a>'
              f'<span class="b-row__m">{fmt(g["words"])} words · {g["sources"]} sources</span></li>')
    return f'<ul class="b-rows">{o}</ul>'

def signup():
    s = C['signup']
    return f'''<section class="b-sec b-signup" id="updates" aria-labelledby="signup-title">
  <h2 class="b-h2" id="signup-title">{s["title"]}</h2>
  <p class="b-p">{typo(s["body"])}</p>
  <form class="b-form" action="/api/subscribe" method="post">
    <div class="b-form__row">
      <div class="b-field">
        <label class="ds-label" for="signup-email">{s["label"]}</label>
        <div class="ds-text-input" data-variant="jstov"><input class="ds-text-input__control" id="signup-email" name="email" type="email" autocomplete="email" maxlength="254" required placeholder="you@yourbusiness.com"></div>
      </div>
      <button class="ds-button-secondary" data-variant="jstov" type="submit"><span class="ds-button-secondary__label">{s["button"]}</span></button>
    </div>
    <label class="ds-checkbox"><input class="ds-checkbox__input" name="consent" type="checkbox" value="yes" required><span class="ds-checkbox__text"><span class="ds-checkbox__label">{typo(s["consent"])}</span></span></label>
    <div class="x-hp" aria-hidden="true"><label for="company">Company</label><input id="company" name="company" tabindex="-1" autocomplete="off"></div>
    <p class="b-note"><a class="ds-text-link" href="/privacy/">Privacy</a> · Email confirmation required.</p>
  </form>
</section>'''

def chapter_rows(chs, base):
    o = ''
    for c in chs:
        a, b = c['lines']
        subs = len(c['subheads'])
        extra = f' · {subs} sections' if subs else ''
        o += (f'<div class="b-l" data-kind="toc"><span class="b-l__n" aria-hidden="true">{a}</span><span class="b-l__m" aria-hidden="true">##</span>'
              f'<a class="b-l__t b-toc" href="{base}#L{a}"><span class="b-toc__t">{esc_text(c["title"])}</span>'
              f'<span class="b-toc__r">lines {a}–{b}{extra}</span></a></div>')
    return o

S = C['site']
GUIDE_META = [f'{S["guide_lines"]} lines', f'{fmt(S["guide_words"])} words', f'{S["guide_read_minutes"]} min read', 'Reviewed 14 Sep 2026']

# ---------------------------------------------------------------- guide (lines 1–68, the way on, sources)
def guide_body():
    pills(C['guide_sources'])
    notes = {27: mark(L(GUIDE, 27), 'in AI Overviews or AI Mode', 1),
             56: mark(L(GUIDE, 56), 'by domain and topic', 2)}
    doc = render(GUIDE, 1, 68, cited={27, 56}, notes=notes, table_labels={20: 'SEO and GEO compared'})
    rest = chapter_rows(CH[4:], '')
    srcs = [(s['label'], s['url'], f'cited on line {s["cited_on_guide_line"]}') for s in C['guide_sources']]
    return f'''<div class="b-shell">
{rail('guide', 'guide.md')}
<div class="b-pane">
  {filebar('guide.md', GUIDE_META, 'Raw Markdown', '/guide.md')}
  <article class="b-doc" aria-label="guide.md">
{doc}
  </article>
  <section class="b-sec" aria-labelledby="rest-h">
    <div class="b-in"><h2 class="b-h2" id="rest-h">The rest of guide.md</h2>
    <p class="b-p">Five more chapters, from line 70 to the last line, 218.</p></div>
    <div class="b-doc">{rest}</div>
  </section>
  <section class="b-sec b-in" aria-label="Sources">
    {sources_block('Sources', srcs, typo(C['guide_sources_note']), 'src-h')}
  </section>
</div>
</div>'''

# ---------------------------------------------------------------- home (below the stage)
def home_body():
    pills(C['guide_sources'])
    doc = render(GUIDE, 1, 14)
    cats = ''
    for cat in C['categories']:
        gs = sorted([g for g in C['guides'] if g['category'] == cat['id']], key=lambda g: g['title'].lower())
        cats += (f'<div class="b-cat" id="{cat["id"]}"><div class="b-cat__head"><h3 class="b-h3">{cat["title"]}</h3>'
                 f'<span class="b-cat__n">{cat["count"]} guides</span></div><p class="b-cat__blurb">{typo(cat["blurb"])}</p>'
                 f'{guide_rows(gs)}</div>')
    return f'''<div class="b-shell" id="guide">
{rail('home', 'guide.md')}
<div class="b-pane">
  <header class="b-intro b-in">
    <h2 class="b-h2">The guide is one file</h2>
    <p class="b-p">Everything here starts from guide.md. The numbers down the left are its real line numbers, the same lines the answer above points to. Blank lines are skipped, never renumbered.</p>
  </header>
  {filebar('guide.md', GUIDE_META, 'Raw Markdown', '/guide.md')}
  <div class="b-doc" aria-label="guide.md, lines 1 to 14">
{doc}
  </div>
  <p class="b-more b-in"><a class="ds-text-link" data-kind="route" href="/guide/#L16"><span class="ds-text-link__label">Keep reading at line 16, GEO and SEO</span><span class="ds-text-link__glyph" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span></a></p>

  <section class="b-sec" aria-labelledby="toc-h">
    <div class="b-in"><h2 class="b-h2" id="toc-h">Nine chapters, by line</h2>
    <p class="b-p">About {S["guide_read_minutes"]} minutes from top to bottom. Each chapter links to its first line.</p></div>
    <div class="b-doc">{chapter_rows(CH, '/guide/')}</div>
  </section>

  <section class="b-sec b-in" id="guides" aria-labelledby="guides-h">
    <h2 class="b-h2" id="guides-h">{C["guides_total"]} shorter guides</h2>
    <p class="b-p">One question each, with its sources listed at the end. Every guide is also a Markdown file at its own address plus .md.</p>
    {cats}
  </section>

  <div class="b-in">{signup()}</div>
</div>
</div>'''

# ---------------------------------------------------------------- article
def article_body():
    A = C['article']
    pills(A['sources'])
    notes = {}
    for f in A['footnote_map']:
        ph = f['phrase']
        for n in range(38, 106):
            t = notes.get(n, L(ART, n))
            if ph in t:
                notes[n] = mark(t, ph, f['source']); break
        else: raise SystemExit('phrase not found: ' + ph)
    cited = set(notes)
    doc = render(ART, 38, 105, cited=cited, notes=notes, table_labels={42: 'AI Overviews and AI Mode compared'})
    title = re.match(r'title: "(.*)"', L(ART, 3)).group(1)
    summary = re.match(r'summary: "(.*)"', L(ART, 5)).group(1)
    faq = ''
    for i, q in enumerate(A['faq']):
        qn, an = 24 + 2 * i, 25 + 2 * i
        assert q['q'] in L(ART, qn) and q['a'] in L(ART, an)
        faq += row(qn, esc_text(q['q']), 'h3', 'q:') + row(an, esc_text(q['a']), 'p', 'a:')
    srcs = []
    for k, s in enumerate(A['sources']):
        ln = 9 + 2 * k
        assert s['label'] in L(ART, ln)
        srcs.append((s['label'], s['url'], f'listed on line {ln}'))
    rel = [g for g in C['guides'] if g['slug'] in A['related']]
    rel.sort(key=lambda g: A['related'].index(g['slug']))
    relrows = ''
    for g in rel:
        relrows += (f'<li class="b-row" data-kind="next"><a class="b-row__t" href="{g["url"]}">{esc_text(g["title"])}</a>'
                    f'<p class="b-row__s">{esc_text(g["summary"])}</p>'
                    f'<span class="b-row__m">{g["slug"]}.md · {fmt(g["words"])} words · {g["sources"]} sources</span></li>')
    return f'''<div class="b-shell">
{rail('article', A['slug'] + '.md')}
<div class="b-pane">
  <nav class="ds-breadcrumb b-crumbs" aria-label="Breadcrumb"><ol class="ds-breadcrumb__list">
    <li class="ds-breadcrumb__item"><a class="ds-breadcrumb__link" href="/guides/">Guides</a><span class="ds-breadcrumb__sep" aria-hidden="true"></span></li>
    <li class="ds-breadcrumb__item"><a class="ds-breadcrumb__link" href="/guides/#compare">{A["category_title"]}</a><span class="ds-breadcrumb__sep" aria-hidden="true"></span></li>
    <li class="ds-breadcrumb__item"><span class="ds-breadcrumb__leaf" aria-current="page">{A["slug"]}.md</span></li>
  </ol></nav>
  {filebar(A['slug'] + '.md', [f'{nlines(ART)} lines', f'{fmt(A["words"])} words', f'{A["read_minutes"]} min read', 'Updated ' + A['updated']], 'Raw Markdown', A['md'])}
  <article class="b-doc" aria-labelledby="art-title">
{row(3, esc_text(title), 'h1', '', cls='b-l--title').replace('<h1 class', '<h1 id="art-title" class')}
<div class="b-l b-l--label" data-kind="label"><span class="b-l__n" aria-hidden="true"></span><span class="b-l__m" aria-hidden="true"></span><p class="b-l__t">The short answer</p></div>
{row(5, esc_text(summary), 'p', cls='b-l--lead')}
<div class="b-l b-l--skip" data-kind="skip"><span class="b-l__n" aria-hidden="true">6–37</span><span class="b-l__m" aria-hidden="true"></span><p class="b-l__t">Front matter: the page’s seven sources and five questions. They are set out at the end of the page, with their own line numbers.</p></div>
{doc}
  </article>
  <section class="b-sec" aria-labelledby="faq-h">
    <div class="b-in"><h2 class="b-h2" id="faq-h">Questions people ask</h2></div>
    <div class="b-doc b-faq">{faq}</div>
  </section>
  <section class="b-sec b-in" aria-label="Sources">
    {sources_block('Sources', srcs, typo(A['sources_note']), 'src-h')}
  </section>
  <section class="b-sec b-in" aria-labelledby="next-h">
    <h2 class="b-h2" id="next-h">Read next</h2>
    <ul class="b-rows">{relrows}</ul>
  </section>
</div>
</div>'''

# ---------------------------------------------------------------- mcp
def mcp_body():
    PILL.clear()
    title = re.match(r'title: "(.*)"', L(MCP, 2)).group(1)
    doc = render(MCP, 7, 84, table_labels={22: 'The three tools'})
    return f'''<div class="b-shell">
{rail('mcp', 'mcp-server.md')}
<div class="b-pane">
  {filebar('mcp-server.md', [f'{nlines(MCP)} lines', 'Updated 2 Nov 2026', 'Read-only', 'No account or key'], 'Discovery card', '/.well-known/mcp.json')}
  <article class="b-doc" aria-labelledby="mcp-title">
{row(2, esc_text(title), 'h1', '', cls='b-l--title').replace('<h1 class', '<h1 id="mcp-title" class')}
<div class="b-l b-l--skip" data-kind="skip"><span class="b-l__n" aria-hidden="true">3–6</span><span class="b-l__m" aria-hidden="true"></span><p class="b-l__t">Front matter and an editing note. What follows is the page’s own text, line by line.</p></div>
{doc}
  </article>
</div>
</div>'''

for name, fn in [('home', home_body), ('guide', guide_body), ('article', article_body), ('mcp', mcp_body)]:
    open(f'{OUT}/{name}-body.html', 'w').write(f'<!-- GENERATED by linefile gen.py from assets/*.md + content.json: every gutter number is the real line number -->\n' + fn() + '\n')
    print('wrote', name)
