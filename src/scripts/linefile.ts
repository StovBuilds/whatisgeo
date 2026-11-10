// The linefile layer (design/site/DESIGN.md §6–7): theme, menus, the "Files" disclosure, copy buttons, and the two
// moments drawn from the hero — the reading marker and the thread from a cited line to its source.
// Everything is IntersectionObserver- or event-driven: nothing runs per frame while scrolling.
const root = document.documentElement;


// ---------------------------------------------------------------- theme: system / light / dark (footer radiogroup)
const themeOpts = [...document.querySelectorAll<HTMLButtonElement>('[data-theme-opt]')];
const dark = matchMedia('(prefers-color-scheme: dark)');
function stored() { try { return localStorage.getItem('wig-theme') || 'system'; } catch { return 'system'; } }
function applyTheme(choice: string) {
  root.dataset.mode = choice === 'dark' || (choice === 'system' && dark.matches) ? 'dark' : 'light';
  for (const b of themeOpts) b.setAttribute('aria-checked', String(b.dataset.themeOpt === choice));
}
applyTheme(stored());
for (const b of themeOpts) b.addEventListener('click', () => {
  const choice = b.dataset.themeOpt!;
  try { choice === 'system' ? localStorage.removeItem('wig-theme') : localStorage.setItem('wig-theme', choice); } catch { /* private mode */ }
  applyTheme(choice);
});
dark.addEventListener('change', () => applyTheme(stored()));

// ---------------------------------------------------------------- top bar menu (marketing-nav's own enhancement)
for (const nav of document.querySelectorAll<HTMLElement>('.ds-marketing-nav')) {
  const btn = nav.querySelector<HTMLButtonElement>('.ds-marketing-nav__menu-toggle');
  if (!btn || nav.hasAttribute('data-js')) continue;
  nav.setAttribute('data-js', '');
  btn.addEventListener('click', () => btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true')));
  nav.addEventListener('keydown', e => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
}

// ---------------------------------------------------------------- "Files" disclosure on phones (sidebar-nav-panel)
const filesBtn = document.querySelector<HTMLButtonElement>('.lf-rail .ds-sidebar-nav-panel__toggle');
const filesPanel = document.getElementById('lf-files');
if (filesBtn && filesPanel) {
  const set = (open: boolean) => { filesBtn.setAttribute('aria-expanded', String(open)); open ? filesPanel.setAttribute('data-state', 'open') : filesPanel.removeAttribute('data-state'); };
  filesBtn.addEventListener('click', () => set(filesBtn.getAttribute('aria-expanded') !== 'true'));
  filesPanel.addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); filesBtn.focus(); } });
  matchMedia('(min-width: 768px)').addEventListener('change', () => set(false));
}

// ---------------------------------------------------------------- copy buttons (code-snippet)
for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const snip = btn.closest<HTMLElement>('.ds-code-snippet');
  const status = snip?.querySelector<HTMLElement>('.ds-code-snippet__status');
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy!); } catch { return; }
    snip?.setAttribute('data-state', 'copied'); if (status) status.textContent = 'Copied';
    setTimeout(() => { snip?.removeAttribute('data-state'); if (status) status.textContent = ''; }, 2000);
  });
}

// ---------------------------------------------------------------- moment 2: the reading marker
// The line crossing a thin band ~a third of the way down the viewport is "the line you are on": its number gets the
// accent tick, the open file's row says L<n> / <total>, and the marker in the file list slides to the chapter (or
// section, or category) it belongs to.
const pane = document.querySelector<HTMLElement>('.lf-pane');
const total = Number(pane?.dataset.lfFile ?? 0);
const railBody = document.querySelector<HTMLElement>('.lf-rail__body');
const marker = railBody?.querySelector<HTMLElement>('.lf-marker');
const ranged = [...document.querySelectorAll<HTMLAnchorElement>('.lf-rail a[data-from]')];
const targeted = [...document.querySelectorAll<HTMLAnchorElement>('.lf-rail a[data-target]')];
const counts = [...document.querySelectorAll<HTMLElement>('[data-lf-count]')];
const where = document.querySelector<HTMLElement>('[data-lf-where]');
let railOn: HTMLAnchorElement | null = null;

function moveMarker(a: HTMLAnchorElement | null) {
  if (a === railOn) return;
  railOn?.removeAttribute('aria-current');
  railOn = a;
  if (!marker || !railBody) return;
  if (!a || !a.offsetParent) { marker.removeAttribute('data-on'); return; }
  if (!a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'location');
  const b = railBody.getBoundingClientRect(), r = a.getBoundingClientRect();
  marker.style.transform = `translate3d(${Math.round(r.left - b.left) - 1}px, ${Math.round(r.top - b.top + railBody.scrollTop + (r.height - marker.offsetHeight) / 2)}px, 0)`;
  marker.setAttribute('data-on', '');
  // keep the part you are reading in view inside a long file list (the list scrolls on its own)
  const top = r.top - b.top, bottom = r.bottom - b.top;
  if (top < 0 || bottom > railBody.clientHeight) railBody.scrollTo({ top: railBody.scrollTop + top - railBody.clientHeight / 3, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

if (pane && total) {
  let current: HTMLElement | null = null;
  const rows = [...pane.querySelectorAll<HTMLElement>('.lf-doc .lf-l[id^="L"]')];
  const setLine = (row: HTMLElement) => {
    if (row === current) return;
    current?.removeAttribute('data-current');
    current = row; row.setAttribute('data-current', '');
    const n = Number(row.id.slice(1));
    for (const c of counts) c.textContent = `L${n} / ${c.dataset.lfCount}`;
    if (where) { where.hidden = false; where.textContent = ` · L${n}`; }
    moveMarker(ranged.find(a => n >= Number(a.dataset.from) && n <= Number(a.dataset.to)) ?? null);
  };
  const io = new IntersectionObserver(entries => {
    const hit = entries.filter(e => e.isIntersecting).pop();
    if (hit) setLine(hit.target as HTMLElement);
  }, { rootMargin: '-33% 0px -66% 0px' });
  rows.forEach(r => io.observe(r));
}
if (targeted.length) {
  const io = new IntersectionObserver(entries => {
    const hit = entries.filter(e => e.isIntersecting).pop();
    if (hit) moveMarker(targeted.find(a => a.dataset.target === hit.target.id) ?? null);
  }, { rootMargin: '-33% 0px -60% 0px' });
  for (const a of targeted) { const t = document.getElementById(a.dataset.target!); if (t) io.observe(t); }
}

// ---------------------------------------------------------------- moment 1: the thread
// Hover or focus a cited line (blue number), or read it, and a hairline draws from its footnote to a note in the
// margin, level with the line: the source, its site, and the line that cites it. The hero's thread, for the reader.
const wide = matchMedia('(min-width: 1200px)');
const cited = pane ? [...pane.querySelectorAll<HTMLElement>('.lf-l[data-cited]')] : [];
if (pane && cited.length) {
  const SVG = 'http://www.w3.org/2000/svg';
  const note = document.createElement('aside');
  note.className = 'lf-margin'; note.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS(SVG, 'svg'); svg.setAttribute('class', 'lf-thread'); svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG, 'path'); path.setAttribute('pathLength', '1'); svg.append(path);
  pane.append(svg, note);
  let on: HTMLElement | null = null, hover: HTMLElement | null = null, read: HTMLElement | null = null;

  const fill = (row: HTMLElement) => {
    const n = row.id.slice(1);
    note.replaceChildren(...row.dataset.cited!.split(' ').map(k => {
      const src = document.getElementById(`src-${k}`);
      const name = (src?.querySelector('.ds-citation-sources__name') ?? src?.querySelector('a'))?.textContent?.replace('↗', '').trim() ?? '';
      const link = src?.querySelector<HTMLAnchorElement>('a[href^="http"]');
      const el = document.createElement('p'); el.className = 'lf-margin__src';
      const head = document.createElement('span'); head.className = 'lf-margin__k'; head.textContent = `${k} · ${link ? new URL(link.href).hostname.replace(/^www\./, '') : ''}`;
      const t = document.createElement('span'); t.className = 'lf-margin__t'; t.textContent = name;
      const w = document.createElement('span'); w.className = 'lf-margin__w'; w.textContent = `cited on line ${n}`;
      el.append(head, t, w); return el;
    }));
  };
  const place = () => {
    if (!on) return;
    const p = pane.getBoundingClientRect(), r = on.getBoundingClientRect();
    const anchor = on.querySelector('.lf-fn') ?? on.querySelector('.lf-n')!;
    const a = anchor.getBoundingClientRect();
    const top = Math.round(Math.max(r.top, a.top - 10) - p.top);
    note.style.transform = `translate3d(0, ${top}px, 0)`;
    const x1 = a.right - p.left + 4, y1 = a.top + a.height / 2 - p.top;
    const x2 = note.offsetLeft - 6, y2 = top + 11;
    const bend = Math.max(24, (x2 - x1) / 2);
    path.setAttribute('d', `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + bend).toFixed(1)} ${y1.toFixed(1)} ${(x2 - bend).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  };
  const show = (row: HTMLElement | null) => {
    if (!wide.matches) row = null;
    if (row === on) return;
    on?.removeAttribute('data-thread');
    on = row;
    if (!row) { svg.removeAttribute('data-on'); note.removeAttribute('data-on'); return; }
    row.setAttribute('data-thread', '');
    fill(row); place();
    // restart the draw: dash at full length without a transition, one reflow, then let it run
    svg.removeAttribute('data-on'); note.removeAttribute('data-on');
    void svg.getBoundingClientRect();
    svg.setAttribute('data-on', ''); note.setAttribute('data-on', '');
  };
  for (const row of cited) {
    row.addEventListener('pointerenter', () => { hover = row; show(row); });
    row.addEventListener('pointerleave', () => { hover = null; show(read); });
    row.addEventListener('focusin', () => { hover = row; show(row); });
    row.addEventListener('focusout', () => { hover = null; show(read); });
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) read = e.target as HTMLElement;
      else if (read === e.target) read = null;
    }
    if (!hover) show(read);
  }, { rootMargin: '-30% 0px -45% 0px' });
  cited.forEach(r => io.observe(r));
  new ResizeObserver(() => place()).observe(pane);
  wide.addEventListener('change', () => show(wide.matches ? (hover ?? read) : null));
}

