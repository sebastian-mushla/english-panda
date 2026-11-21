// Ты → Вы: перепиши дружескую фразу вежливо (vykání). Впечатай слово в форме на «Вы».
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';
import { TYVY } from '../learn/words4cz.js';

const ROUNDS = 6;

export default function tyvy(el, ctx) {
  const items = shuffle(TYVY).slice(0, ROUNDS);
  let k = 0, line, busy = true;

  el.innerHTML = `<div class="typer tyvy">
      <div class="ty-pair"><div class="msg npc"><small>👋 ${esc(t('tyvyFriend'))}</small><p class="en"></p></div>
        <div class="msg me"><small>🎩 ${esc(t('tyvyFormal'))}</small><p class="en"></p></div></div>
      <small class="ty-tr"></small>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const kb = keyboard(el.querySelector('.kb'), (key) => { if (!busy) line.key(key); });

  function next() {
    if (k >= items.length) return ctx.finish(true);
    const [inf, tpl, ans, , ru, uk] = items[k++];
    const [a, b] = tpl.split('___');
    el.querySelector('.msg.npc p').textContent = inf;
    el.querySelector('.msg.me p').innerHTML = `${esc(a)}<span class="slots"></span>${esc(b)}`;
    el.querySelector('.ty-tr').textContent = L({ ru, uk });
    el.querySelector('.count').textContent = `${k} / ${items.length}`;
    const slots = el.querySelector('.msg.me .slots');
    const key = { en: 'tyvy:' + inf };
    line = typeLine(slots, ans, {
      onRight: () => ctx.sfx('click'),
      onWrong: (x) => { kb.mark(x, 'bad'); flash(slots, 'shake', 350); ctx.wrong(key); },
      onDone: async () => { busy = true; slots.classList.add('ok'); ctx.right(key); await wait(900); next(); },
    });
    ctx.setHint('ty' + k, (step) => {
      if (step === 1) return { label: t('hint.rule'), text: esc(t('rule.tyvy')), en: false };
      line.reveal();
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
  }
  next();
  return { destroy: kb.destroy };
}
