# Fill {{WALL_L}} / {{WALL_R}} / {{SPLIT}} / {{ROWS}} in a template from the real guide.md.
# Every non-blank line of the file, numbered by its REAL line number (blank lines are skipped, not renumbered).
import sys, html, json
src, tpl, out = sys.argv[1], sys.argv[2], sys.argv[3]
lines = open(src, encoding='utf-8').read().split('\n')
items = [(i + 1, t) for i, t in enumerate(lines) if t.strip()]
half = (len(items) + 1) // 2
L, R = items[:half], items[half:]
def li(n, t, r):
    h = ' data-h' if t.startswith('#') else ''
    return '<li data-n="%d" style="--r: %d"%s><span>%s</span></li>' % (n, r, h, html.escape(t, quote=False))
wl = '\n'.join(li(n, t, r) for r, (n, t) in enumerate(L))
wr = '\n'.join(li(n, t, r) for r, (n, t) in enumerate(R))
s = open(tpl, encoding='utf-8').read()
s = s.replace('{{WALL_L}}', wl).replace('{{WALL_R}}', wr).replace('{{ROWS}}', str(half)).replace('{{SPLIT}}', str(L[-1][0]))
open(out, 'w', encoding='utf-8').write(s)
print('lines', len(lines), 'non-blank', len(items), 'rows/side', half, 'left ends at line', L[-1][0], 'right starts', R[0][0])
