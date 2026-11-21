// Каллиграфия: собери слово из букв-кистей (или напечатай на клавиатуре).
import { t } from '../i18n.js';
import { shuffle, meaning, esc, wait, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { keyLetter } from './keyboard.js';
import { DECOY, norm } from '../learn/lang.js';


export default function spell(el, ctx) {
  const list = shuffle(ctx.words.length > 5 ? ctx.words.filter((w) => w.t.length <= 11) : ctx.words).slice(0, 5);
  let cur, pos, letters, tiles, busy;

  el.innerHTML = `<div class="spell">
      <div class="prompt"><span class="emo"></span><span class="mean"></span></div>
      <div class="slots en"></div>
      <div class="tiles"></div>
      <div class="count"></div>
    </div>`;
  const slots = el.querySelector('.slots'), tilesEl = el.querySelector('.tiles');

  function next() {
    if (!list.length) return ctx.finish(true);
    cur = list.shift();
    busy = false;
    letters = [...cur.t];
    pos = 0;
    el.querySelector('.emo').textContent = cur.emoji;
    el.querySelector('.mean').textContent = meaning(cur);
    el.querySelector('.count').textContent = `${5 - list.length} / 5`;
    slots.innerHTML = letters.map((c) => (c === ' ' ? '<i class="gap"></i>' : '<i class="slot"></i>')).join('');
    slots.style.setProperty('--n', letters.length);
    const pool = letters.filter((c) => c !== ' ').map((c) => c.toLowerCase());
    for (let i = 0; i < 2; i++) pool.push(DECOY[Math.floor(Math.random() * DECOY.length)]);
    tiles = shuffle(pool).map((c) => ({ c, used: false }));
    tilesEl.innerHTML = tiles.map((tl, i) => `<button class="tile" data-i="${i}">${esc(tl.c)}</button>`).join('');
    tilesEl.querySelectorAll('.tile').forEach((b) => b.addEventListener('click', () => press(+b.dataset.i)));
    skipSpaces();
    const w = cur;
    ctx.setHint(w.en, (step) => wordHint(w, step, () => { autoplace(); return t('hint.act'); }));
  }

  function skipSpaces() { while (letters[pos] === ' ') pos++; }

  function place(i) {
    tiles[i].used = true;
    tilesEl.children[i].classList.add('used');
    const slot = slots.children[pos];
    slot.textContent = letters[pos];
    slot.classList.add('filled');
    pos++;
    skipSpaces();
    ctx.sfx('click');
    if (pos >= letters.length) complete();
  }

  function autoplace() {
    const i = tiles.findIndex((tl) => !tl.used && norm(tl.c) === norm(letters[pos]));
    if (i >= 0) place(i);
  }

  function press(i) {
    if (busy || tiles[i].used) return;
    if (norm(tiles[i].c) === norm(letters[pos])) return place(i);
    flash(tilesEl.children[i], 'shake', 400);
    ctx.wrong(cur);
  }

  async function complete() {
    busy = true;
    slots.classList.add('ok');
    ctx.right(cur);
    await wait(1000);
    slots.classList.remove('ok');
    next();
  }

  const onKey = (e) => {
    const k = keyLetter(e);
    if (busy || !cur || !k || k === 'back' || k === ' ') return;
    e.preventDefault();
    const i = tiles.findIndex((tl) => !tl.used && norm(tl.c) === norm(k) && norm(k) === norm(letters[pos]));
    if (i >= 0) place(i);
    else { flash(slots, 'shake', 400); ctx.wrong(cur); }
  };
  addEventListener('keydown', onKey);
  next();
  return { destroy: () => removeEventListener('keydown', onKey) };
}
