#!/usr/bin/env python3
"""Option C (questions) partial generator. Reads content.json + assets/, writes questions/partials/*.html.
All copy is the site's own; only the headings listed in COPY_CHANGES are rewritten (as questions)."""
import json, re, html, sys, os

D = '/home/jack/repos/whatisgeo/.claude/worktrees/site-options/design/site-options'
OUT = os.path.join(D, 'questions', 'partials')
os.makedirs(OUT, exist_ok=True)
C = json.load(open(os.path.join(D, 'content.json')))
GUIDE = open(os.path.join(D, 'assets/guide.md')).read().split('\n')
ART = open(os.path.join(D, 'assets/article-ai-mode-vs-ai-overviews.md')).read().split('\n')
MCP = open(os.path.join(D, 'assets/mcp-server.md')).read().split('\n')

def L(n):  # 1-based guide line
    return GUIDE[n - 1]

def smart(t):
    t = re.sub(r'(^|[\s(\[—–-])"', lambda m: m.group(1) + '“', t)
    t = t.replace('"', '”')
    t = re.sub(r"(\w)'(\w)", r'\1’\2', t)
    t = re.sub(r"(^|[\s(“])'", lambda m: m.group(1) + '‘', t)
    t = t.replace("'", '’')
    return t

EXT = '<span class="c-ext" aria-hidden="true">↗</span>'

def inline(t):
    """markdown inline → html (escaped, smart quotes outside code)."""
    out, pos = [], 0
    for m in re.finditer(r'`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|\[\[cite:(\d+):([^\]]+)\]\]', t):
        out.append(smart(html.escape(t[pos:m.start()], quote=False)))
        if m.group(1):
            out.append('<code class="c-code">' + html.escape(m.group(1)) + '</code>')
        elif m.group(2):
            href = m.group(3)
            ext = href.startswith('http') and 'whatisgeo.app' not in href
            out.append('<a href="%s">%s%s</a>' % (html.escape(href), smart(html.escape(m.group(2), quote=False)), EXT if ext else ''))
        elif m.group(4):
            out.append('<strong>' + inline(m.group(4)) + '</strong>')
        elif m.group(5):
            out.append('<em class="c-aside">' + inline(m.group(5)) + '</em>')
        elif m.group(6):
            n, nid = m.group(6), m.group(7)
            out.append('<a class="ds-citation-sources-cite" data-variant="copilot-numbered-reference-list" href="#%s" aria-label="Note %s"><span class="ds-citation-sources-cite__num">%s</span></a>' % (nid, n, n))
        pos = m.end()
    out.append(smart(html.escape(t[pos:], quote=False)))
    return ''.join(out)

def esc(t):
    return smart(html.escape(t, quote=False))

def table(rows, label):
    head, body = rows[0], rows[2:]
    def cells(r):
        return [c.strip() for c in r.strip().strip('|').split('|')]
    h = cells(head)
    s = ['<div class="ds-data-table c-table%s" data-variant="jstov" role="region" aria-label="%s" tabindex="0"><div class="ds-data-table__scroll"><table class="ds-data-table__table">' % (' c-wide' if len(h) > 2 else '', html.escape(label))]
    s.append('<thead><tr>' + ''.join('<th class="ds-data-table__th" scope="col">%s</th>' % inline(c) for c in h) + '</tr></thead><tbody>')
    for r in body:
        cs = cells(r)
        s.append('<tr>' + ''.join(('<th class="ds-data-table__td ds-data-table__primary" scope="row">%s</th>' if i == 0 else '<td class="ds-data-table__td">%s</td>') % inline(c.replace('**', '')) for i, c in enumerate(cs)) + '</tr>')
    s.append('</tbody></table></div></div>')
    return ''.join(s)

def blocks(lines, table_label='Comparison'):
    """md block lines → html (paragraphs, tables, lists, h3, blockquote)."""
    out, i = [], 0
    lines = list(lines)
    while i < len(lines):
        ln = lines[i]
        if not ln.strip():
            i += 1; continue
        if ln.startswith('|'):
            j = i
            while j < len(lines) and lines[j].startswith('|'): j += 1
            out.append(table(lines[i:j], table_label)); i = j; continue
        if re.match(r'^\d+\. ', ln):
            j, items = i, []
            while j < len(lines) and re.match(r'^\d+\. ', lines[j]):
                items.append(re.sub(r'^\d+\. ', '', lines[j])); j += 1
            out.append('<ol class="c-list" data-kind="ol">' + ''.join('<li>%s</li>' % inline(x) for x in items) + '</ol>'); i = j; continue
        if ln.startswith('- '):
            j, items = i, []
            while j < len(lines) and lines[j].startswith('- '):
                items.append(lines[j][2:]); j += 1
            out.append('<ul class="c-list">' + ''.join('<li>%s</li>' % inline(x) for x in items) + '</ul>'); i = j; continue
        if ln.startswith('### '):
            out.append('<h3 class="c-h4">%s</h3>' % inline(ln[4:])); i += 1; continue
        if ln.startswith('> '):
            out.append('<blockquote class="c-quote"><p>%s</p></blockquote>' % inline(ln[2:])); i += 1; continue
        out.append('<p>%s</p>' % inline(ln)); i += 1
    return '\n'.join(out)

def notes(items, label='Where this comes from'):
    """items: list of (n, id, html_body)."""
    if not items: return ''
    return ('<ol class="c-notes" aria-label="%s">' % label) + ''.join(
        '<li id="%s"><span class="c-notes__n">%s</span><span class="c-notes__body">%s</span></li>' % (nid, n, body) for n, nid, body in items) + '</ol>'

def guide_line_note(n, line, prefix='guide.md'):
    return '<span class="c-notes__file">%s</span><a class="x-ln" href="/guide.md#L%d">L%d</a>' % (prefix, line, line)

def ext_note(label, url, line=None):
    s = '<a class="c-notes__link" href="%s">%s%s</a>' % (html.escape(url), esc(label), EXT)
    if line: s += '<span class="c-notes__on">on</span><a class="x-ln" href="/guide.md#L%d">L%d</a>' % (line, line)
    return s

def write(name, s):
    open(os.path.join(OUT, name), 'w').write(s.rstrip() + '\n')
    print('wrote', name, len(s))

# ------------------------------------------------------------------ shared: the ask row (chips as the secondary nav)
CHIP_HREF = {
    'What is GEO?': '/guide/#what-is-geo',
    'Is SEO dead?': '/#L184',
    'Do I need llms.txt?': '/#L200',
    'Training or search?': '/#L208',
    'Can citation be guaranteed?': '/#L204',
    'Which tool should I buy?': '/guides/#choosing',
}
ask = ['<!-- the hero\'s six questions, kept as the way around the site (secondary nav row under the top bar) -->',
       '<nav class="c-ask" aria-label="Questions this site answers"><div class="c-wrap"><div class="c-ask__track">',
       '<div class="ds-suggestion-chips" data-variant="jstov" data-size="sm" data-align="start" role="group" aria-label="Questions this site answers">',
       '<span class="ds-suggestion-chips__label">Ask</span>']
for q in C['stage_questions']:
    ask.append('<a class="ds-suggestion-chips__chip" href="%s"><span class="ds-suggestion-chips__text">%s</span></a>' % (CHIP_HREF[q], esc(q)))
ask.append('</div></div></div></nav>')
write('ask.html', '\n'.join(ask))

# ------------------------------------------------------------------ chapters as questions
CH_Q = {  # every rewrite is listed in the lane return (copy_changes)
    1: 'What is GEO?',
    2: 'Does GEO replace SEO?',
    3: 'How do AI answers happen?',
    4: 'What are the principles?',
    5: 'How do I let the right crawlers in?',
    6: 'What does it look like in practice?',
    7: 'What should I do in my first 30 days?',
    8: 'How do I measure progress?',
    9: 'What do people ask most?',
}
CH_ID = {1: 'what-is-geo', 2: 'geo-and-seo', 3: 'how-it-works', 4: 'principles', 5: 'crawlers', 6: 'example', 7: 'first-30-days', 8: 'measure', 9: 'common-questions'}
CH_FIRST = {  # each chapter's own first sentence (the way on)
    5: L(72).split('. ')[0] + '.',
    6: L(106).split('. ')[0] + '.' if L(106).count('. ') else L(106),
    7: L(118),
    8: L(154).split('. ')[0] + '.',
    9: None,
}

def rng(ch):
    a, b = ch['lines']; return 'L%d–%d' % (a, b)

# ------------------------------------------------------------------ home · the guide as nine questions
chs = C['guide_chapters']
S = C['site']
home_guide = ['<!-- HOME 1 · the guide, as the nine questions its chapters answer (contents). id=guide is the hero CTA target -->',
 '<section class="c-sec" id="guide" aria-labelledby="guide-h">', '<div class="c-wrap">', '<div class="c-row" data-kind="lead">',
 '<div class="c-side">',
 '<h2 class="c-h2" id="guide-h">The guide</h2>',
 '<p class="c-meta">guide.md · %d lines · %s words · %d min read</p>' % (S['guide_lines'], format(S['guide_words'], ','), S['guide_read_minutes']),
 '</div>',
 '<div class="c-a">',
 '<p>%s</p>' % esc(S['description']),
 '<ol class="c-toc">']
for ch in chs:
    home_guide.append('<li><a class="c-toc__a" href="/guide/#%s"><span class="c-toc__n">%02d</span><span class="c-toc__q">%s</span><span class="c-toc__ln">%s</span></a></li>' % (CH_ID[ch['n']], ch['n'], esc(CH_Q[ch['n']]), rng(ch)))
home_guide += ['</ol>',
 '<p class="c-actions"><a class="ds-text-link" data-kind="route" href="/guide/"><span class="ds-text-link__label">Read the guide</span><span class="ds-text-link__glyph" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span></a>',
 '<a class="ds-text-link" data-kind="route" href="/guide.md"><span class="ds-text-link__label">Text version</span><span class="ds-text-link__glyph" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span></a></p>',
 '<p class="c-fine">Updated %s.</p>' % S['guide_updated'],
 '</div>', '</div>', '</div>', '</section>']
write('home-guide.html', '\n'.join(home_guide))

# ------------------------------------------------------------------ the ten common questions (home)
faq = []
for sh in chs[8]['subheads']:
    qline = sh['line']; aline = qline + 2
    faq.append((qline, sh['title'], aline))

def faq_row(qline, q, aline, h='h3'):
    a = L(aline)
    nid = 'n-L%d' % aline
    items = [(1, nid, guide_line_note(1, aline))]
    if aline == 202:
        # the guide's inline "(see llmstxt.org)" becomes footnote 1 after the sentence that names the proposal
        a = a.replace(' (see [llmstxt.org](https://llmstxt.org/))', '')
        a = a.replace('summary of your site.', 'summary of your site.[[cite:1:n-L202-src]]', 1)
        items = [(1, 'n-L202-src', ext_note('The llms.txt proposal', 'https://llmstxt.org/', 202)), (2, nid, guide_line_note(2, aline))]
        a = a + '[[cite:2:%s]]' % nid
    else:
        # the whole answer is that one line of guide.md: the footnote closes it
        a = a + '[[cite:1:%s]]' % nid
    return ('<div class="c-row" id="L%d">' % qline +
            '<%s class="c-q">%s</%s>' % (h, esc(q), h) +
            '<div class="c-a"><p>%s</p>%s</div></div>' % (inline(a), notes(items)))

home_faq = ['<!-- HOME 2 · the guide\'s ten common questions (guide.md L178-218), answers word for word, each footnoted to its own line -->',
 '<section class="c-sec" id="questions" aria-labelledby="q-h">', '<div class="c-wrap">',
 '<div class="c-head"><h2 class="c-h2" id="q-h">Common questions</h2><p class="c-head__note">From the end of the guide, word for word. Each footnote is the line of guide.md the answer is on.</p></div>',
 '<div class="c-rows">']
for qline, q, aline in faq:
    home_faq.append(faq_row(qline, q, aline))
home_faq += ['</div>', '</div>', '</section>']
write('home-faq.html', '\n'.join(home_faq))

# ------------------------------------------------------------------ the 60 guides as question lists
def short(title):
    m = re.match(r'^(.*?\?)(\s|$)', title)
    if m: return m.group(1), title[m.end():].strip()
    if ': ' in title:
        a, b = title.split(': ', 1); return a, b
    return title, ''

home_guides = ['<!-- HOME 3 · all 60 guides, by category, as the questions they answer (title up to its question mark or colon; full title on hover) -->',
 '<section class="c-sec" id="guides" aria-labelledby="g-h">', '<div class="c-wrap">',
 '<div class="c-head"><h2 class="c-h2" id="g-h">%d guides</h2><p class="c-head__note">One question each, in six groups. <a class="ds-text-link" data-kind="route" href="/guides/"><span class="ds-text-link__label">See every guide</span><span class="ds-text-link__glyph" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span></a></p></div>' % C['guides_total'],
 '<div class="c-rows">']
for cat in C['categories']:
    gs = [g for g in C['guides'] if g['category'] == cat['id']]
    assert len(gs) == cat['count'], cat
    home_guides.append('<div class="c-row" id="%s" data-kind="list"><div class="c-side" data-sticky><h3 class="c-q" data-size="sm">%s</h3><p class="c-side__p">%s</p><p class="c-meta">%d guides</p></div>' % (cat['id'], esc(cat['title']), esc(cat['blurb']), cat['count']))
    home_guides.append('<ul class="c-qlist">')
    for g in gs:
        s, rest = short(g['title'])
        home_guides.append('<li><a class="c-qlist__a" href="%s" title="%s"><span class="c-qlist__t">%s</span><span class="c-qlist__w">%s words</span></a></li>' % (g['url'], html.escape(smart(g['title'])), esc(s), format(g['words'], ',')))
    home_guides.append('</ul></div>')
home_guides += ['</div>', '</div>', '</section>']
write('home-guides.html', '\n'.join(home_guides))

# ------------------------------------------------------------------ sign-up (one quiet row)
sg = C['signup']
signup = ['<!-- sign-up: the live form, as one row of the grid (no tinted panel) -->',
 '<section class="c-sec" id="updates" aria-labelledby="signup-h">', '<div class="c-wrap">', '<div class="c-row" data-kind="signup">',
 '<div class="c-side"><h2 class="c-h2" id="signup-h">%s</h2><p class="c-side__p">%s</p></div>' % (esc(sg['title']), esc(sg['body'])),
 '<form class="c-form" action="/api/subscribe" method="post">',
 '<div class="c-form__row"><div class="c-field"><label class="ds-label" for="signup-email">%s</label>' % sg['label'],
 '<div class="ds-text-input" data-variant="jstov"><input class="ds-text-input__control" id="signup-email" name="email" type="email" autocomplete="email" maxlength="254" required placeholder="you@yourbusiness.com"></div></div>',
 '<button class="ds-button-primary" type="submit"><span class="ds-button-primary__label">%s</span></button></div>' % esc(sg['button']),
 '<label class="ds-checkbox"><input class="ds-checkbox__input" name="consent" type="checkbox" value="yes" required><span class="ds-checkbox__text"><span class="ds-checkbox__label">%s</span></span></label>' % esc(sg['consent']),
 '<div class="c-hp" aria-hidden="true"><label for="company">Company</label><input id="company" name="company" tabindex="-1" autocomplete="off"></div>',
 '<p class="c-fine"><a href="/privacy/">Privacy</a> · Email confirmation required.</p>',
 '</form>', '</div>', '</div>', '</section>']
write('signup.html', '\n'.join(signup))

# ------------------------------------------------------------------ GUIDE page
def chapter_lines(ch):
    a, b = ch['lines']
    return GUIDE[a:b]  # skip the '## ' heading line (index a-1)

def principles(ch):
    """chapter 4 body as sub-rows: each principle heading + its paragraph (with footnote 2 on L56)."""
    out = []
    for sh in ch['subheads']:
        body = L(sh['line'] + 2)
        items = []
        if sh['line'] + 2 == 56:
            body = body.replace(' (KDD 2024, [arxiv.org/abs/2311.09735](https://arxiv.org/abs/2311.09735))', ' (KDD 2024)')
            body = body.replace('domain and topic.', 'domain and topic.[[cite:2:n-src-2]]', 1)
            items.append((2, 'n-src-2', ext_note(C['guide_sources'][1]['label'], C['guide_sources'][1]['url'], 56)))
        out.append('<div class="c-sub" id="L%d"><h3 class="c-h4"><span class="c-h4__n">%s</span>%s</h3><p>%s</p>%s</div>' % (
            sh['line'], sh['title'].split('. ', 1)[0], esc(sh['title'].split('. ', 1)[1]), inline(body), notes(items)))
    return '\n'.join(out)

g = ['<!-- GUIDE · the long-form guide at its own URL (/guide/). Each chapter is headed by the question it answers; the',
     '     mono address is its real line range in guide.md. Chapters 01-04 in full, then the way on, then the sources. -->',
     '<header class="c-pagehead"><div class="c-wrap"><div class="c-row" data-kind="title">',
     '<div class="c-side"><p class="c-meta">guide.md · %d lines · updated %s</p><h1 class="c-h1">%s</h1></div>' % (S['guide_lines'], S['guide_updated'], esc(S['tagline_live'])),
     '<div class="c-a"><p>%s</p>' % esc(S['description']),
     '<ol class="c-toc" aria-label="Contents">']
for ch in chs:
    g.append('<li><a class="c-toc__a" href="#%s"><span class="c-toc__n">%02d</span><span class="c-toc__q">%s</span><span class="c-toc__ln">%s</span></a></li>' % (CH_ID[ch['n']], ch['n'], esc(CH_Q[ch['n']]), rng(ch)))
g += ['</ol>', '<p class="c-fine">%s words · %d min read · <a href="/guide.md">Read it as Markdown</a></p>' % (format(S['guide_words'], ','), S['guide_read_minutes']), '</div></div></div></header>']
write('guide-head.html', '\n'.join(g))

gb = ['<div class="c-wrap"><div class="c-rows" data-kind="chapters">']
for ch in chs[:4]:
    n = ch['n']
    side = '<div class="c-side" data-sticky><p class="c-meta">%02d · %s</p><h2 class="c-q" data-size="lg">%s</h2></div>' % (n, rng(ch), esc(CH_Q[n]))
    if n == 4:
        body = principles(ch)
    else:
        lines = list(chapter_lines(ch))
        items = []
        if n == 2:
            i27 = 27 - ch['lines'][0] - 1
            t = lines[i27]
            t = t.replace(' You can read Google\'s guide directly at [developers.google.com/search/docs/appearance/ai-features](https://developers.google.com/search/docs/appearance/ai-features).', '')
            t = t.replace('AI Overviews or AI Mode.', 'AI Overviews or AI Mode.[[cite:1:n-src-1]]', 1)
            lines[i27] = t
            items.append((1, 'n-src-1', ext_note(C['guide_sources'][0]['label'], C['guide_sources'][0]['url'], 27)))
        body = blocks(lines, 'SEO and GEO compared') + notes(items)
    gb.append('<section class="c-row" data-kind="chapter" id="%s" aria-labelledby="%s-h">' % (CH_ID[n], CH_ID[n]))
    gb.append(side.replace('<h2 class="c-q"', '<h2 class="c-q" id="%s-h"' % CH_ID[n]))
    gb.append('<div class="c-a" data-kind="prose">%s</div></section>' % body)
gb.append('</div></div>')
write('guide-body.html', '\n'.join(gb))

way = ['<!-- the way on: chapters 05-09, each by its question, line range and own first sentence -->',
 '<section class="c-sec" aria-labelledby="on-h"><div class="c-wrap">',
 '<div class="c-head"><h2 class="c-h2" id="on-h">Five more questions</h2><p class="c-head__note">The rest of the guide, lines 70 to 218.</p></div>',
 '<ol class="c-rows c-on">']
for ch in chs[4:]:
    n = ch['n']
    if n == 9:
        right = '<p>%s</p>' % ' '.join('<span class="c-on__q">%s</span>' % esc(s['title']) for s in ch['subheads'][:3]) + '<p class="c-meta">%d questions</p>' % len(ch['subheads'])
        right = '<p class="c-on__first">%d questions, from “%s” to “%s”</p>' % (len(ch['subheads']), esc(ch['subheads'][0]['title']), esc(ch['subheads'][-1]['title']))
    else:
        right = '<p class="c-on__first">%s</p>' % esc(CH_FIRST[n])
        if ch['subheads']:
            right += '<p class="c-meta">%s</p>' % ' · '.join(esc(s['title'].split(': ')[0]) for s in ch['subheads'])
    way.append('<li class="c-row" id="%s"><a class="c-on__a" href="#%s"><span class="c-meta">%02d · %s</span><span class="c-q">%s</span></a><div class="c-a">%s</div></li>' % (CH_ID[n], CH_ID[n], n, rng(ch), esc(CH_Q[n]), right))
way += ['</ol>', '</div></section>']
write('guide-wayon.html', '\n'.join(way))

def srclist(srcs, hid, title, note, ids=None, lines=None):
    s = ['<section class="c-sec" aria-labelledby="%s" data-last><div class="c-wrap"><div class="c-row" data-kind="sources">' % hid,
         '<div class="c-side"><h2 class="c-h2" id="%s">%s</h2><p class="c-side__p">%s</p></div>' % (hid, title, esc(note)),
         '<section class="ds-citation-sources" data-variant="copilot-numbered-reference-list" data-mark="mono" aria-label="%s"><ol class="ds-citation-sources__grid">' % title]
    for i, src in enumerate(srcs):
        dom = re.sub(r'^https?://', '', src['url']).split('/')[0]
        if lines and lines[i]: dom += ' · cited on L%d' % lines[i]
        s.append('<li class="ds-citation-sources__card"><a class="ds-citation-sources__link" href="%s" id="%s"><span class="ds-citation-sources__meta"><span class="ds-citation-sources__index">%d</span><span class="ds-citation-sources__domain">%s</span></span><span class="ds-citation-sources__name">%s</span></a></li>' % (
            html.escape(src['url']), (ids[i] if ids else 'src-%d' % (i + 1)), i + 1, html.escape(dom), esc(src['label'])))
    s += ['</ol></section>', '</div></div></section>']
    return '\n'.join(s)

write('guide-sources.html', srclist(C['guide_sources'], 'src-h', 'Sources', C['guide_sources_note'], lines=[x['cited_on_guide_line'] for x in C['guide_sources']]))

# ------------------------------------------------------------------ ARTICLE
A = C['article']
fm_end = [i for i, x in enumerate(ART) if x.strip() == '---'][1]
body = ART[fm_end + 1:]
FMAP = A['footnote_map']
used = {}
def cite_para(t):
    for f in FMAP:
        ph = f['phrase']
        k = t.find(ph)
        if k < 0: continue
        m = re.compile(r'[.?!]["”)]?(?=\s|$)').search(t, k + len(ph))
        end = m.end() if m else len(t)
        n = f['source']
        nid = 'fn-%d' % n
        t = t[:end] + '[[cite:%d:%s]]' % (n, nid) + t[end:]
        used.setdefault(ph, n)
    return t

secs, cur = [], None
lede = []
for ln in body:
    if ln.startswith('## '):
        cur = [ln[3:], []]; secs.append(cur)
    elif cur is None:
        lede.append(ln)
    else:
        cur[1].append(ln)

def src_note(n):
    s = A['sources'][n - 1]
    return ext_note(s['label'], s['url'])

ah = ['<!-- ARTICLE · /ai-mode-vs-ai-overviews/ — the title, then the short answer, then every H2 as a question/answer row.',
      '     Footnotes ONLY where content.json article.footnote_map allows (a sentence that names its source document). -->',
      '<header class="c-pagehead"><div class="c-wrap">',
      '<p class="c-meta c-crumbs"><a href="/guides/#compare">%s</a> · %d min read · updated %s · <a href="%s">.md</a></p>' % (A['category_title'], A['read_minutes'], A['updated'], A['md']),
      '<h1 class="c-h1" data-size="article">%s</h1>' % esc(A['title']),
      '<div class="c-row" data-kind="short">',
      '<div class="c-side"><p class="c-label">The short answer</p></div>',
      '<div class="c-a"><p class="c-a__lead">%s</p><p>%s</p></div>' % (esc(A['summary']), inline(' '.join(x for x in lede if x.strip()))),
      '</div></div></header>']
write('article-head.html', '\n'.join(ah))

ab = ['<div class="c-wrap"><div class="c-rows" data-kind="chapters">']
for i, (h2, lines) in enumerate(secs):
    lines = [cite_para(x) if x.strip() and not x.startswith('|') else x for x in lines]
    nums = []
    for x in lines:
        for m in re.finditer(r'\[\[cite:(\d+):', x):
            if int(m.group(1)) not in nums: nums.append(int(m.group(1)))
    hid = 'h-%d' % (i + 1)
    ab.append('<section class="c-row" data-kind="chapter" aria-labelledby="%s"><div class="c-side" data-sticky><h2 class="c-q" id="%s">%s</h2></div>' % (hid, hid, esc(h2)))
    ab.append('<div class="c-a" data-kind="prose">%s%s</div></section>' % (blocks(lines, 'AI Overviews and AI Mode compared'),
              notes([(n, 'fn-%d' % n if True else '', src_note(n)) for n in nums], 'Sources named in this section')))
ab.append('</div></div>')
abody = '\n'.join(ab)
# a note id may repeat across sections: keep the first id, later ones point back to it
seen = set()
def dedupe(m):
    nid = m.group(1)
    if nid in seen: return '<li data-ref="%s">' % nid
    seen.add(nid); return m.group(0)
abody = re.sub(r'<li id="(fn-\d+)">', dedupe, abody)
write('article-body.html', abody)
missing = [f['phrase'] for f in FMAP if f['phrase'] not in used]
if missing: print('UNPLACED FOOTNOTES', missing, file=sys.stderr)

af = ['<!-- article FAQ (frontmatter faq), as rows; no footnotes (the footnote map covers the body only) -->',
      '<section class="c-sec" aria-labelledby="afaq-h"><div class="c-wrap">',
      '<div class="c-head"><h2 class="c-h2" id="afaq-h">Common questions</h2></div>', '<div class="c-rows">']
for f in A['faq']:
    af.append('<div class="c-row"><h3 class="c-q">%s</h3><div class="c-a"><p>%s</p></div></div>' % (esc(f['q']), esc(f['a'])))
af += ['</div>', '</div></section>']
write('article-faq.html', '\n'.join(af))

write('article-sources.html', srclist(A['sources'], 'asrc-h', 'Sources', A['sources_note'], ids=['src-%d' % (i + 1) for i in range(len(A['sources']))]).replace(' data-last', ''))

rn = ['<!-- read next: the four related guides, title left, summary right (no 3+1 cards) -->',
      '<section class="c-sec" aria-labelledby="next-h" data-last><div class="c-wrap">',
      '<div class="c-head"><h2 class="c-h2" id="next-h">Read next</h2></div>', '<div class="c-rows">']
for slug in A['related']:
    r = C['related_titles'][slug]
    rn.append('<div class="c-row"><h3 class="c-q" data-size="sm"><a class="c-q__a" href="/%s/">%s</a></h3><div class="c-a"><p>%s</p></div></div>' % (slug, esc(r['title']), esc(r['summary'])))
rn += ['</div>', '</div></section>']
write('article-next.html', '\n'.join(rn))

# ------------------------------------------------------------------ MCP
mfm = [i for i, x in enumerate(MCP) if x.strip() == '---'][1]
mtitle = re.search(r'title: "(.*)"', '\n'.join(MCP[:mfm])).group(1)
mupd = re.search(r'updated: "(.*)"', '\n'.join(MCP[:mfm])).group(1)
mb = MCP[mfm + 1:]
mb = [x for x in mb if not x.startswith('<!--')]
intro = [x for x in mb[:mb.index('## The address')] if x.strip()]
addr = 'https://whatisgeo.app/mcp'

def snippet(code, label, prompt=False, size='lg', aria='Copy the address'):
    return ('<div class="ds-code-snippet" data-variant="jstov" data-size="%s" role="group" aria-label="%s">' % (size, html.escape(label)) +
            ('<span class="ds-code-snippet__label">%s</span>' % esc(label) if label else '') +
            ('<span class="ds-code-snippet__prompt" aria-hidden="true">$</span>' if prompt else '') +
            '<code class="ds-code-snippet__code"%s>%s</code>' % ('' if prompt else ' data-kind="url"', html.escape(code)) +
            '<button class="ds-button-secondary ds-code-snippet__copy" data-variant="ghost-text" data-size="sm" type="button" aria-label="%s"><span class="ds-button-secondary__label ds-code-snippet__copy-idle">Copy</span><span class="ds-button-secondary__label ds-code-snippet__copy-done">Copied ✓</span></button>' % aria +
            '<span class="ds-code-snippet__status" aria-live="polite"></span></div>')

mh = ['<!-- MCP · /mcp-server/ — the address is the thing to copy; then the page\'s own sections as question/answer rows -->',
      '<header class="c-pagehead"><div class="c-wrap">',
      '<p class="c-meta c-crumbs">For machines · updated 2 November 2026</p>',
      '<h1 class="c-h1" data-size="article">%s</h1>' % esc(mtitle),
      '<div class="c-row" data-kind="short">',
      '<div class="c-side"><p class="c-label">The address</p></div>',
      '<div class="c-a">' + snippet(addr, '', aria='Copy the MCP address') + '<p class="c-fine">%s</p></div>' % esc(mb[mb.index('## The address') + 6]),
      '</div></div></header>']
write('mcp-head.html', '\n'.join(mh))

def msec(h):
    i = mb.index(h); j = i + 1
    while j < len(mb) and not mb[j].startswith('## '): j += 1
    return mb[i + 1:j]

rows = []
def mrow(q, inner, rid=None):
    rows.append('<section class="c-row" data-kind="chapter"%s><div class="c-side" data-sticky><h2 class="c-q">%s</h2></div><div class="c-a" data-kind="prose">%s</div></section>' % (' id="%s"' % rid if rid else '', esc(q), inner))

mrow('Why would my assistant use it?', blocks([x.replace('Add the address below,', 'Add the address above,') for x in intro]), 'why')
tools = msec('## What your assistant can do with it')
tl = [x for x in tools if x.startswith('|')]
rest = [x for x in tools if not x.startswith('|')]
k = rest.index('Things to ask once it\'s connected:')
asks = [x[2:] for x in rest if x.startswith('- ')]
inner = table(tl, 'The three tools') + blocks([x for x in rest[:k] if x.strip()])
inner += '<h3 class="c-h4">%s</h3><ul class="c-list" data-kind="asks">%s</ul>' % (esc('Things to ask once it\'s connected'), ''.join('<li><q>%s</q></li>' % esc(a.strip('"')) for a in asks))
mrow('What can my assistant do with it?', inner, 'tools')

conn = msec('## How to connect it')
parts, cur = [], None
for x in conn:
    if x.startswith('### '):
        cur = [x[4:], []]; parts.append(cur)
    elif cur: cur[1].append(x)
inner = []
for name, ls in parts:
    out, i, inner_lines = [], 0, []
    txt = []
    while i < len(ls):
        if ls[i].startswith('```'):
            lang = ls[i][3:]; j = i + 1
            while not ls[j].startswith('```'): j += 1
            code = ls[i + 1:j]
            if lang == 'sh':
                txt.append(snippet(code[0], 'Terminal', prompt=True, size='md', aria='Copy the command'))
            else:
                txt.append('<figure class="c-file"><figcaption class="c-file__cap">%s</figcaption><pre class="c-file__pre"><code>%s</code></pre></figure>' % (lang, html.escape('\n'.join(code))))
            i = j + 1; continue
        if ls[i].strip(): txt.append('<p>%s</p>' % inline(ls[i]))
        i += 1
    inner.append('<div class="c-sub"><h3 class="c-h4">%s</h3>%s</div>' % (esc(name), ''.join(txt)))
mrow('How do I connect it?', ''.join(inner), 'connect')
mrow('What do you record?', blocks(msec('## What we record')), 'record')
other = msec('## Other machine-readable files')
mrow('What else is there for machines?', blocks(other), 'files')
write('mcp-body.html', '<div class="c-wrap"><div class="c-rows" data-kind="chapters" data-last>' + '\n'.join(rows) + '</div></div>')
print('mcp title', mtitle, mupd)
