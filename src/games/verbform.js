// Формы слова: предложение с пропуском и подсказкой (go) — впиши правильную форму (goes / went / will …).
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';
import { gramPool } from './gram.js';

export default function verbform(el, ctx) {
  // задания, где ответ совпадает со словом в скобках (They ___ (live) → live), путают: в печати их не даём
  const pool = gramPool(ctx);
  const changed = pool.filter((g) => g.a.toLowerCase() !== g.base.toLowerCase());
  const list = shuffle(changed.length >= 4 ? changed : pool).slice(0, 6);
  const total = list.length;
  let line, busy = true;

  el.innerHTML = `<div class="typer gapper vform">
      <div class="sentence en"></div>
      <small class="vf-tr"></small>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const sent = el.querySelector('.sentence');
  const kb = keyboard(el.querySelector('.kb'), (k) => { if (!busy) line.key(k); });

  function next() {
    if (!list.length) return ctx.finish(true);
    const it = list.shift();
    const key = { en: 'g:' + it.s };
    const [a, b] = it.s.split('___');
    sent.innerHTML = `<p>${esc(a)}<span class="slots"></span>${esc(b)}</p><i class="vf-base">(${esc(it.base)})</i>`;
    el.querySelector('.vf-tr').textContent = L(it);
    el.querySelector('.count').textContent = `${total - list.length} / ${total}`;
    const slots = sent.querySelector('.slots');
    line = typeLine(slots, it.a, {
      onRight: () => ctx.sfx('click'),
      onWrong: (k) => { kb.mark(k, 'bad'); flash(slots, 'shake', 350); ctx.wrong(key); },
      onDone: async () => { busy = true; slots.classList.add('ok'); ctx.right(key); await wait(1000); next(); },
    });
    ctx.setHint('vf' + it.s, (step) => {
      if (step === 1) return { label: t('hint.rule'), text: esc(t('rule.' + it.kind)), en: false };
      line.reveal();
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
  }
  next();
  return { destroy: kb.destroy };
}
