// Корзины: разложи слова по корзинам-темам.
import { t, L } from '../i18n.js';
import { THEMES, BY_THEME } from '../learn/words.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';

export default function baskets(el, ctx) {
  const pool = shuffle(ctx.def.exam ? ctx.themes : [ctx.themes[0], ...ctx.others]);
  const themes = [...new Set(pool)].slice(0, ctx.def.exam ? 3 : 2);
  if (themes.length < 2) themes.push(...Object.keys(BY_THEME).filter((th) => !themes.includes(th)).slice(0, 2 - themes.length));
  const per = themes.length === 3 ? 3 : 4;
  const cards = shuffle(themes.flatMap((th) => shuffle(BY_THEME[th]).slice(0, per)));
  const total = cards.length;
  let cur = null, busy = false;

  el.innerHTML = `<div class="baskets">
      <div class="bk-card"><span class="emo" hidden></span><b class="en"></b></div>
      <div class="count"></div>
      <div class="bk-row">${themes.map((th) => `<button class="basket" data-th="${th}"><span class="bk-ico">${BY_THEME[th][0].emoji}</span><b>${esc(L(THEMES[th]))}</b><i class="bk-n">0</i></button>`).join('')}</div>
    </div>`;
  const card = el.querySelector('.bk-card');

  function next() {
    if (!cards.length) return ctx.finish(true);
    cur = cards.shift();
    busy = false;
    card.querySelector('b').textContent = cur.t;
    const emo = card.querySelector('.emo');
    emo.textContent = cur.emoji; emo.hidden = true;
    el.querySelector('.count').textContent = `${total - cards.length} / ${total}`;
    flash(card, 'pop', 400);
    const w = cur;
    ctx.setHint(w.en, (step) => wordHint(w, step, () => { emo.hidden = false; return t('hint.act'); }));
  }

  el.querySelectorAll('.basket').forEach((b) => b.addEventListener('click', async () => {
    if (busy || !cur) return;
    if (b.dataset.th === cur.theme) {
      busy = true;
      ctx.right(cur);
      const n = b.querySelector('.bk-n'); n.textContent = +n.textContent + 1;
      card.classList.add('drop');
      flash(b, 'pop', 400);
      await wait(380);
      card.classList.remove('drop');
      next();
    } else {
      flash(b, 'shake', 400);
      flash(card, 'shake', 400);
      ctx.wrong(cur);
    }
  }));
  next();
}
