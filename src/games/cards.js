// Пары: найди слово на изучаемом языке и его значение (картинка + перевод).
import { t } from '../i18n.js';
import { shuffle, meaning, esc, wait } from './kit.js';
import { wordHint } from '../learn/hints.js';

export default function cards(el, ctx) {
  const ws = shuffle(ctx.words).slice(0, 6);
  const deck = shuffle(ws.flatMap((w) => [{ w, kind: 'en' }, { w, kind: 'mean' }]));
  const seen = new Set(), matched = new Set();
  let open = [], lock = false;

  el.innerHTML = `<div class="mem-grid">${deck.map((c, i) => `
    <button class="mcard" data-i="${i}" aria-label="card"><span class="mcard-in">
      <span class="face back"><i>🐾</i></span>
      <span class="face front ${c.kind}">${c.kind === 'en' ? `<span class="en">${esc(c.w.t)}</span>` : `<span class="emo">${c.w.emoji}</span><span class="mean">${esc(meaning(c.w))}</span>`}</span>
    </span></button>`).join('')}</div>`;
  const btns = [...el.querySelectorAll('.mcard')];

  const partner = (i) => deck.findIndex((c, j) => j !== i && c.w === deck[i].w);

  function setHint() {
    const target = ws.find((w) => !matched.has(w.en));
    if (!target) return ctx.setHint(null);
    ctx.setHint(target.en, (step) => wordHint(target, step, () => {
      deck.forEach((c, j) => { if (c.w === target) btns[j].classList.add('peek'); });
      setTimeout(() => btns.forEach((b) => b.classList.remove('peek')), 1400);
      return t('hint.act');
    }));
  }
  setHint();

  btns.forEach((b, i) => b.addEventListener('click', async () => {
    if (lock || matched.has(deck[i].w.en) || open.includes(i)) return;
    b.classList.add('flip');
    ctx.sfx('flip');
    if (!open.length) { open = [i]; return; }
    const a = open[0];
    open = [];
    if (deck[a].w === deck[i].w) {
      const w = deck[i].w;
      matched.add(w.en);
      ctx.right(w);
      btns[a].classList.add('done'); b.classList.add('done');
      seen.add(a); seen.add(i);
      setHint();
      if (matched.size === ws.length) { await wait(800); ctx.finish(true); }
      return;
    }
    // ошибка только если пара первой карты уже была открыта раньше
    if (seen.has(partner(a))) ctx.wrong(deck[a].w); else ctx.sfx('wrong');
    seen.add(a); seen.add(i);
    lock = true;
    await wait(950);
    btns[a].classList.remove('flip'); b.classList.remove('flip');
    lock = false;
  }));
}
