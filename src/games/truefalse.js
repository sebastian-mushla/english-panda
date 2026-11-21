// Верно или неверно: быстрые утверждения «картинка = слово» и «загадка = слово», на время.
import { t } from '../i18n.js';
import { shuffle, pick, esc, wait, flash, distractors, pic } from './kit.js';
import { wordHint } from '../learn/hints.js';

const ROUNDS = 10, TIME = 8000;

export default function truefalse(el, ctx) {
  const words = shuffle([...ctx.pool, ...ctx.pool]).slice(0, ROUNDS);
  const items = words.map((w, i) => {
    const truth = Math.random() < 0.5;
    const shown = truth ? w : pick(distractors(w, 3, ctx.pool));
    return { w, shown, truth, kind: i % 3 === 2 && w.riddle ? 'riddle' : 'pic' };
  });
  let cur = null, busy = false, timer = 0, started = 0, raf = 0, n = 0;

  el.innerHTML = `<div class="tfalse">
      <div class="tf-card"><div class="tf-left"></div><span class="tf-eq">=</span><b class="tf-word en"></b></div>
      <div class="tf-bar"><i></i></div>
      <div class="tf-btns"><button class="btn red tf-no" data-v="0">✗ ${t('tfFalse')}</button><button class="btn jade tf-yes" data-v="1">✓ ${t('tfTrue')}</button></div>
      <div class="count"></div>
    </div>`;
  const bar = el.querySelector('.tf-bar i'), card = el.querySelector('.tf-card');

  function tick() {
    const p = Math.min(1, (performance.now() - started) / TIME);
    bar.style.transform = `scaleX(${1 - p})`;
    if (p < 1) raf = requestAnimationFrame(tick);
  }

  function next() {
    clearTimeout(timer); cancelAnimationFrame(raf);
    if (!items.length) return ctx.finish(true);
    cur = items.shift();
    n++;
    busy = false;
    card.classList.remove('ok', 'bad');
    el.querySelector('.tf-left').innerHTML = cur.kind === 'pic' ? pic(cur.w) : `<i class="en">${esc(cur.w.riddle)}</i>`;
    el.querySelector('.tf-word').textContent = cur.shown.t;
    el.querySelector('.count').textContent = `${n} / ${ROUNDS}`;
    flash(card, 'pop', 400);
    started = performance.now();
    raf = requestAnimationFrame(tick);
    timer = setTimeout(() => answer(null), TIME);
    const w = cur.w;
    ctx.setHint('tf' + n, (step) => wordHint(w, step, () => { el.querySelector(cur.truth ? '.tf-yes' : '.tf-no').classList.add('glow'); return t('hint.act'); }));
  }

  async function answer(v) {
    if (busy || !cur) return;
    busy = true;
    clearTimeout(timer); cancelAnimationFrame(raf);
    el.querySelectorAll('.tf-btns .btn').forEach((b) => b.classList.remove('glow'));
    const ok = v === cur.truth;
    card.classList.add(ok ? 'ok' : 'bad');
    if (ok) ctx.right(cur.w); else { ctx.wrong(cur.w); flash(card, 'shake', 400); el.querySelector('.tf-word').textContent = `${cur.shown.t} → ${cur.w.t}`; }
    await wait(ok ? 600 : 1300);
    next();
  }

  el.querySelectorAll('.tf-btns .btn').forEach((b) => b.addEventListener('click', () => answer(b.dataset.v === '1')));
  const onKey = (e) => { if (e.key === 'ArrowLeft') answer(false); if (e.key === 'ArrowRight') answer(true); };
  addEventListener('keydown', onKey);
  next();
  return { destroy: () => { clearTimeout(timer); cancelAnimationFrame(raf); removeEventListener('keydown', onKey); } };
}
