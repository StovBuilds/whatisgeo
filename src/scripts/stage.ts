// The home hero's motion (design-system concepts/hero-stage, worked up for whatisgeo.app). Data comes from the
// #stage-data block the build writes (src/data/stage.ts resolved against the real guide.md). Every animation is
// transform / opacity / stroke-dashoffset; no backdrop-filter; the caret pauses off-screen. Without html.x-js
// (reduced motion, automated browsers, or if this script never runs) the page shows the finished still.
import { excerpt } from '../lib/excerpt';

type Part = [string, number];
interface Answer { key: string; q: string; parts: Part[]; note?: [string, string] }
interface Built { used: number[] }

const SVG = 'http://www.w3.org/2000/svg';
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function init() {
  const doc = document.documentElement;
  const stageEl = $('#stage'), dataEl = $('#stage-data');
  if (!stageEl || !dataEl) return;
  const stage: HTMLElement = stageEl;
  const { split, answers } = JSON.parse(dataEl.textContent || '{}') as { split: number; answers: Answer[] };
  const ANSWERS: Record<string, Answer> = Object.fromEntries(answers.map(a => [a.key, a]));
  const animated = doc.classList.contains('x-js');

  const qEl = $('[data-x="q"]', stage)!, prose = $('[data-x="prose"]', stage)!, answer = $('[data-x="answer"]', stage)!;
  const note = $('[data-x="note"]', stage), without = $('[data-x="without"]', stage)!, srcs = $('[data-x="srcs"]', stage);
  const svg = $<SVGSVGElement>('[data-x="threads"]', stage);
  const walls: Record<'l' | 'r', HTMLElement | null> = { l: $('.x-wall[data-side="l"]', stage), r: $('.x-wall[data-side="r"]', stage) };
  const chips = $$('[data-q]', stage);
  chips.forEach((c, k) => c.style.setProperty('--k', String(k + 1)));
  const lbl = $('.x-pills .ds-suggestion-chips__label', stage); if (lbl) lbl.style.setProperty('--k', '0');
  const lineEl: Record<string, HTMLElement> = {};
  $$('.x-wall li[data-n]', stage).forEach(li => { lineEl[li.dataset.n!] = li; });
  let current = answers[0].key, run = 0, timers: number[] = [], built: Built = { used: [] };

  const later = (fn: () => void, ms: number) => { const id = window.setTimeout(fn, ms); timers.push(id); return id; };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const lineText = (n: number) => lineEl[n]?.textContent?.trim() ?? '';
  const sideOf = (n: number): 'l' | 'r' => (n <= split ? 'l' : 'r');

  /* the answer DOM: sentences of hidden words, each followed by its footnote */
  function buildAnswer(a: Answer): Built {
    let html = '';
    const used: number[] = [], said: Record<number, string> = {};
    a.parts.forEach(([text, n]) => {
      const words = text.split(/(\s+)/).map(w => (w.trim() ? `<span class="x-w">${esc(w)}</span>` : w)).join('');
      html += `<span class="x-sent" data-line="${n}">${words}</span>`;
      if (n > 0) {
        let k = used.indexOf(n); if (k < 0) { used.push(n); said[n] = text; k = used.length - 1; }
        html += `<a class="ds-citation-sources-cite" href="#stage" data-line="${n}" aria-label="Source ${k + 1}: guide.md line ${n}, ${esc(lineText(n))}"><span class="ds-citation-sources-cite__num">${k + 1}</span></a>`;
      } else html += '<span class="x-gap-cite" data-line="gap">not in the guide</span>';
    });
    prose.innerHTML = `<p>${html}</p>`;
    if (note) { note.hidden = true; note.innerHTML = a.note ? `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3.5M8 11h.01"/></svg><span><b>${esc(a.note[0])}</b>${esc(a.note[1])}</span>` : ''; }
    $$('.x-callout', stage).forEach(c => c.remove());
    $$('li[data-lit]', stage).forEach(li => li.removeAttribute('data-lit'));
    if (srcs) srcs.innerHTML = '';
    used.forEach((n, k) => {
      const t = esc(excerpt(lineText(n), said[n] || ''));
      const c = document.createElement('div');
      c.className = 'x-callout'; c.dataset.line = String(n);
      c.innerHTML = `<span class="x-callout__n"><b>${k + 1}</b>line ${n}</span><span class="x-callout__t">${t}</span>`;
      walls[sideOf(n)]?.appendChild(c);
      if (srcs) { const li = document.createElement('li'); li.dataset.line = String(n); li.innerHTML = `<b>${k + 1} · L${n}</b><span>${t}</span>`; srcs.appendChild(li); }
    });
    return { used };
  }

  /* pin each callout where its line sits in the file, then de-overlap per wall: push down in line order, then
     back up if the last one runs off the stage */
  function place() {
    (['l', 'r'] as const).forEach(side => {
      const wall = walls[side]; if (!wall) return;
      const wr = wall.getBoundingClientRect(), gap = 6;
      const items = $$('.x-callout', wall).flatMap(c => {
        const li = lineEl[c.dataset.line!]; if (!li) return [];
        const lr = li.getBoundingClientRect(), h = c.offsetHeight;
        return [{ c, h, y: lr.top - wr.top + lr.height / 2 - h / 2 }];
      }).sort((a, b) => a.y - b.y);
      let floor = 8;
      items.forEach(it => { it.y = Math.max(floor, it.y); floor = it.y + it.h + gap; });
      let ceil = wr.height - 8;
      for (let i = items.length - 1; i >= 0; i--) { const it = items[i]; it.y = Math.min(it.y, ceil - it.h); ceil = it.y - gap; }
      items.forEach(it => { it.c.style.top = `${Math.max(8, it.y)}px`; });
    });
  }

  /* a thread from each footnote to its callout's inner edge, leaving from the answer's margin so it never crosses text */
  function threads() {
    if (!svg) return;
    svg.innerHTML = '';
    if (getComputedStyle(svg).display === 'none') return;
    const sr = stage.getBoundingClientRect(), pr = prose.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`);
    $$('.ds-citation-sources-cite[data-line]', prose).forEach(cite => {
      const n = cite.dataset.line!, c = $(`.x-callout[data-line="${n}"]`, stage); if (!c) return;
      const a = cite.getBoundingClientRect(), b = c.getBoundingClientRect(), left = sideOf(+n) === 'l';
      const x1 = (left ? pr.left - 14 : pr.right + 14) - sr.left, y1 = a.top + a.height / 2 - sr.top;
      const x2 = (left ? b.right : b.left) - sr.left, y2 = b.top + b.height / 2 - sr.top;
      const dx = Math.max(40, Math.abs(x2 - x1) * 0.6) * (left ? -1 : 1);
      const p = document.createElementNS(SVG, 'path'); p.style.opacity = '0';
      p.setAttribute('d', `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`);
      p.setAttribute('data-line', n);
      svg.appendChild(p);
      p.style.transition = 'none'; p.style.setProperty('--len', String(Math.ceil(p.getTotalLength() + 2))); p.getBoundingClientRect(); p.style.transition = ''; p.style.opacity = '';
      [[x1, y1], [x2, y2]].forEach((pt, i) => {
        const dot = document.createElementNS(SVG, 'circle');
        dot.setAttribute('cx', String(pt[0])); dot.setAttribute('cy', String(pt[1])); dot.setAttribute('r', i ? '3.5' : '2.5');
        dot.setAttribute('data-line', n); dot.setAttribute('data-end', String(i));
        svg.appendChild(dot);
      });
    });
  }

  /* light one source: footnote → thread → the wall line → its callout (and the phone list row) */
  function light(n: string | number, instant?: boolean) {
    $(`.ds-citation-sources-cite[data-line="${n}"]`, prose)?.setAttribute('data-on', '');
    if (svg) $$(`[data-line="${n}"]`, svg).forEach(el => { if (el.getAttribute('data-end') !== '1') el.setAttribute('data-on', ''); });
    const land = () => {
      lineEl[n]?.setAttribute('data-lit', '');
      $$(`.x-callout[data-line="${n}"], .x-srcs li[data-line="${n}"], circle[data-end="1"][data-line="${n}"]`, stage).forEach(el => el.setAttribute('data-on', ''));
    };
    if (instant) land(); else later(land, 520);
  }

  function finish(a: Answer) {
    answer.removeAttribute('data-streaming'); answer.removeAttribute('aria-busy');
    $$('.x-w, .x-gap-cite', prose).forEach(w => w.setAttribute('data-on', ''));
    if (note && a.note) note.hidden = false;
    stage.setAttribute('data-ready', ''); stage.removeAttribute('data-typing'); stage.setAttribute('data-idle', '');
  }

  function go(key: string, stream: boolean) {
    const a = ANSWERS[key]; if (!a) return;
    const me = ++run; clearTimers(); current = key; stage.setAttribute('data-live', '');
    chips.forEach(c => c.setAttribute('aria-pressed', c.dataset.q === key ? 'true' : 'false'));
    built = buildAnswer(a);
    if (!stream) {
      qEl.textContent = a.q; place(); threads();
      built.used.forEach(n => light(n, true));
      finish(a); return;
    }
    answer.setAttribute('data-streaming', ''); answer.setAttribute('aria-busy', 'true');
    stage.removeAttribute('data-idle'); stage.setAttribute('data-typing', '');
    place(); threads();
    const old = qEl.textContent || '';
    let i = old.length;
    const stream1 = () => {
      if (me !== run) return;
      stage.removeAttribute('data-typing');
      const seq = $$('.x-w, .ds-citation-sources-cite, .x-gap-cite', prose);
      let k = 0;
      const step = () => {
        if (me !== run) return;
        const el = seq[k++];
        if (!el) { later(() => { if (me === run) finish(a); }, 350); return; }
        if (el.classList.contains('x-w')) { el.setAttribute('data-on', ''); later(step, 20 + Math.random() * 18); }
        else if (el.classList.contains('x-gap-cite')) { el.setAttribute('data-on', ''); later(step, 380); }
        else { light(el.dataset.line!); later(step, 200); }
      };
      step();
    };
    /* erase the old question, type the new one */
    const erase = () => {
      if (me !== run) return;
      if (i > 0 && old !== a.q) { qEl.textContent = old.slice(0, --i); later(erase, 14); return; }
      if (old === a.q) { later(stream1, 250); return; }
      let j = 0;
      const type = () => {
        if (me !== run) return;
        qEl.textContent = a.q.slice(0, ++j);
        if (j < a.q.length) later(type, 28 + Math.random() * 26); else later(stream1, 220);
      };
      type();
    };
    erase();
  }

  /* hover / focus a sentence or a footnote: its thread and line stay bright, the rest dim */
  function focusLine(n: string | null) {
    $$<Element>('.x-sent, .x-callout, .x-threads path, .x-threads circle', stage).forEach(el => {
      if (n && el.getAttribute('data-line') !== n) el.setAttribute('data-dim', ''); else el.removeAttribute('data-dim');
    });
    $$('.ds-citation-sources-cite', prose).forEach(c => { if (n && c.dataset.line === n) c.setAttribute('data-hot', ''); else c.removeAttribute('data-hot'); });
  }
  const lineOf = (e: Event) => (e.target as Element | null)?.closest<HTMLElement>('[data-line]');
  prose.addEventListener('mouseover', e => { const t = lineOf(e); if (t && !answer.hasAttribute('data-streaming')) focusLine(t.dataset.line === 'gap' ? '-1' : t.dataset.line!); });
  prose.addEventListener('mouseleave', () => focusLine(null));
  prose.addEventListener('focusin', e => { const t = lineOf(e); if (t) focusLine(t.dataset.line!); });
  prose.addEventListener('focusout', () => focusLine(null));
  prose.addEventListener('click', e => { if ((e.target as Element).closest('.ds-citation-sources-cite')) e.preventDefault(); });

  function setSource(value: string) {
    const off = value === 'without', v = off ? 'without' : 'with'; /* only ever one of the two known values */
    const r = $<HTMLInputElement>(off ? 'input[name="x-src"][value="without"]' : 'input[name="x-src"][value="with"]', stage); if (r) r.checked = true;
    stage.dataset.src = v;
    answer.hidden = off; without.hidden = !off;
    if (off) { run++; clearTimers(); stage.setAttribute('data-ready', ''); stage.setAttribute('data-idle', ''); stage.removeAttribute('data-typing'); }
  }
  chips.forEach(c => c.addEventListener('click', () => { setSource('with'); go(c.dataset.q!, animated); }));
  $$<HTMLInputElement>('input[name="x-src"]', stage).forEach(r => r.addEventListener('change', () => { setSource(r.value); if (r.value === 'with') go(current, animated); }));

  let rz = 0;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = window.setTimeout(() => {
      if (stage.dataset.src !== 'with') return;
      place(); threads();
      if (!answer.hasAttribute('data-streaming')) built.used.forEach(n => light(n, true));
    }, 120);
  });

  /* pause the caret blink while the stage is off-screen */
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { if (es[0].isIntersecting) stage.removeAttribute('data-off'); else stage.setAttribute('data-off', ''); }).observe(stage);

  /* the finished answer is already in the HTML; animated pages play the opening once the fonts are in */
  const ready = document.fonts?.ready ?? Promise.resolve();
  if (!animated) { ready.then(() => go(current, false)); return; }
  qEl.textContent = '';
  stage.setAttribute('data-intro', '');
  built = buildAnswer(ANSWERS[current]); answer.setAttribute('data-streaming', '');
  stage.setAttribute('data-live', '');
  ready.then(() => { setTimeout(() => go(current, true), 400); setTimeout(() => stage.removeAttribute('data-intro'), 2400); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
