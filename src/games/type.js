// Печать: видишь картинку и перевод, печатаешь слово на изучаемом языке по памяти (без подсказок-букв).
import { t } from '../i18n.js';
import { shuffle, meaning, wait, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { keyboard, typeLine } from './keyboard.js';

export default function type(el, ctx) {
  const list = shuffle([...shuffle(ctx.words).slice(0, 5), ...ctx.review.slice(0, 1)]);
  const total = list.length;
  let cur, line, busy = true;

  el.innerHTML = `<div class="typer">
      <div class="prompt"><span class="emo"></span><span class="mean"></span></div>
      <div class="slots en"></div>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const slots = el.querySelector('.slots');
  const kb = keyboard(el.querySelector('.kb'), (k) => { if (!busy) line.key(k); });

  function next() {
    if (!list.length) return ctx.finish(true);
    cur = list.shift();
    el.querySelector('.emo').textContent = cur.emoji;
    el.querySelector('.mean').textContent = meaning(cur);
    el.querySelector('.count').textContent = `${total - list.length} / ${total}`;
    const w = cur;
    line = typeLine(slots, w.t, {
      onRight: () => ctx.sfx('click'),
      onWrong: (k) => { kb.mark(k, 'bad'); flash(slots, 'shake', 350); ctx.wrong(w); },
      onDone: async () => {
        busy = true;
        slots.classList.add('ok');
        ctx.right(w);
        await wait(900);
        slots.classList.remove('ok');
        next();
      },
    });
    ctx.setHint(w.en, (step) => wordHint(w, step, () => { line.reveal(); return t('hint.act'); }));
    busy = false;
  }
  next();
  return { destroy: kb.destroy };
}
