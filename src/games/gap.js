// Вставь пропуск: предложение с пропуском, нужное слово впечатать. Смысл понятен из контекста.
import { t } from '../i18n.js';
import { shuffle, esc, wait, flash, meaning } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';

export default function gap(el, ctx) {
  const list = shuffle([...shuffle(ctx.words).slice(0, 5), ...ctx.review.slice(0, 1)]);
  const total = list.length;
  let cur, line, busy = true;

  el.innerHTML = `<div class="typer gapper">
      <div class="sentence en"></div>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const sent = el.querySelector('.sentence');
  const kb = keyboard(el.querySelector('.kb'), (k) => { if (!busy) line.key(k); });

  function next() {
    if (!list.length) return ctx.finish(true);
    cur = list.shift();
    const w = cur;
    // заглавная буква, если слово стоит в начале предложения
    const word = w.ex.startsWith('___') ? w.t[0].toUpperCase() + w.t.slice(1) : w.t;
    const [a, b] = w.ex.split('___');
    sent.innerHTML = `<span class="emo">${w.emoji}</span><p>${esc(a)}<span class="slots"></span>${esc(b)}</p>`;
    const slots = sent.querySelector('.slots');
    el.querySelector('.count').textContent = `${total - list.length} / ${total}`;
    line = typeLine(slots, word, {
      onRight: () => ctx.sfx('click'),
      onWrong: (k) => { kb.mark(k, 'bad'); flash(slots, 'shake', 350); ctx.wrong(w); },
      onDone: async () => {
        busy = true;
        slots.classList.add('ok');
        ctx.right(w);
        await wait(1100);
        next();
      },
    });
    ctx.setHint(w.en, (step) => {
      if (step === 1) return { label: t('hint.1'), text: w.riddle, en: true };
      if (step === 2) return { label: t('hint.mean'), text: `${w.emoji} <b>${esc(meaning(w))}</b>`, en: false };
      line.reveal();
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
  }
  next();
  return { destroy: kb.destroy };
}
