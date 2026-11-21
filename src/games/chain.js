// Цепочка памяти: запомни ряд слов, они спрячутся — повтори в том же порядке.
import { t } from '../i18n.js';
import { shuffle, esc, wait, flash, distractors } from './kit.js';

const LENGTHS = [3, 4, 5];

export default function chain(el, ctx) {
  let round = 0, seq = [], pos = 0, busy = true;

  el.innerHTML = `<div class="chain">
      <div class="ch-row"></div>
      <div class="ch-note"></div>
      <div class="ch-opts"></div>
      <div class="count"></div>
    </div>`;
  const row = el.querySelector('.ch-row'), opts = el.querySelector('.ch-opts'), note = el.querySelector('.ch-note');

  async function show(ms) {
    busy = true;
    row.innerHTML = seq.map((w, i) => `<span class="ch-card" style="--i:${i}"><i class="emo">${w.emoji}</i><b class="en">${esc(w.t)}</b></span>`).join('');
    note.textContent = t('chainLook');
    await wait(ms);
    renderSlots();
    busy = false;
  }

  function renderSlots() {
    row.innerHTML = seq.map((w, i) => `<span class="ch-card ${i < pos ? 'done' : 'hidden'}">${i < pos ? `<i class="emo">${w.emoji}</i><b class="en">${esc(w.t)}</b>` : '<i>?</i>'}</span>`).join('');
    note.textContent = t('chainRepeat');
  }

  async function next() {
    if (round >= LENGTHS.length) return ctx.finish(true);
    const len = LENGTHS[round++];
    seq = shuffle(ctx.pool.length >= len ? ctx.pool : ctx.words).slice(0, len);
    pos = 0;
    const extra = distractors(seq[0], 2, ctx.pool).filter((w) => !seq.includes(w));
    const options = shuffle([...seq, ...extra]);
    el.querySelector('.count').textContent = `${round} / ${LENGTHS.length}`;
    opts.innerHTML = options.map((w) => `<button class="ch-opt en" data-en="${esc(w.en)}">${esc(w.t)}</button>`).join('');
    opts.querySelectorAll('.ch-opt').forEach((b) => b.addEventListener('click', () => tap(b)));
    ctx.setHint('chain' + round, (step) => {
      if (step === 1) { show(1500); return { label: t('hint.3'), text: t('hint.act') }; }
      opts.querySelector(`.ch-opt[data-en="${CSS.escape(seq[pos].en)}"]`)?.classList.add('glow');
      return { label: t('hint.3'), text: t('hint.act') };
    });
    await show(1400 + len * 700);
  }

  async function tap(b) {
    if (busy || b.disabled) return;
    const w = seq[pos];
    if (b.dataset.en === w.en) {
      ctx.right(w);
      b.disabled = true;
      b.classList.add('ok');
      b.classList.remove('glow');
      pos++;
      renderSlots();
      if (pos >= seq.length) { busy = true; flash(row, 'pop', 500); await wait(900); next(); }
    } else {
      flash(b, 'shake', 400);
      ctx.wrong(w);
    }
  }
  next();
}
