// Разговор: панда в чайной говорит фразу, выбери подходящий ответ.
import { t } from '../i18n.js';
import { state, TARGET } from '../state.js';
import { DIALOGS } from '../learn/words2.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { pandaSVG } from '../world/panda.js';

const TI = { en: 0, ru: 1, cz: 2 };

export default function dialog(el, ctx) {
  const tagged = shuffle(DIALOGS.filter((d) => d.tags.some((tg) => ctx.themes.includes(tg))));
  const rest = shuffle(DIALOGS.filter((d) => !tagged.includes(d)));
  const list = [...tagged, ...rest].slice(0, 4);
  const total = list.length;
  const ti = TI[TARGET], ni = TI[state.lang];
  let cur, busy;

  el.innerHTML = `<div class="dialog">
      <div class="dl-scene"><div class="dl-panda">${pandaSVG({ hat: 'scholar', robe: 'jade', item: 'teacup' })}</div>
        <div class="dl-say"><p class="en"></p><small class="dl-tr" hidden></small></div></div>
      <div class="dl-opts"></div>
      <div class="count"></div>
    </div>`;
  const opts = el.querySelector('.dl-opts'), tr = el.querySelector('.dl-tr');

  function next() {
    if (!list.length) return ctx.finish(true);
    cur = list.shift();
    busy = false;
    const key = 'dlg:' + cur.q[0];
    el.querySelector('.dl-say p').textContent = cur.q[ti];
    tr.textContent = cur.q[ni]; tr.hidden = true;
    flash(el.querySelector('.dl-say'), 'pop', 400);
    el.querySelector('.count').textContent = `${total - list.length} / ${total}`;
    const answers = shuffle([{ text: cur.a[ti], ok: true }, ...cur.w.map((w) => ({ text: w[ti], ok: false }))]);
    opts.innerHTML = answers.map((a, i) => `<button class="dl-opt en" data-i="${i}">${esc(a.text)}</button>`).join('');
    opts.querySelectorAll('.dl-opt').forEach((b) => b.addEventListener('click', () => choose(b, answers[+b.dataset.i], key)));
    ctx.setHint(key, (step) => {
      if (step === 1) { tr.hidden = false; return { label: t('hint.mean'), text: esc(cur.q[ni]), en: false }; }
      const wrong = [...opts.querySelectorAll('.dl-opt')].filter((b) => !answers[+b.dataset.i].ok && !b.disabled);
      if (step === 2 && wrong[0]) { wrong[0].disabled = true; wrong[0].classList.add('gone'); return { label: t('hint.3'), text: t('hint.act') }; }
      opts.querySelectorAll('.dl-opt').forEach((b) => { if (answers[+b.dataset.i].ok) b.classList.add('glow'); });
      return { label: t('hint.3'), text: t('hint.act') };
    });
  }

  async function choose(b, a, key) {
    if (busy || b.disabled) return;
    if (a.ok) {
      busy = true;
      b.classList.add('ok');
      ctx.right({ en: key });
      await wait(900);
      next();
    } else {
      b.disabled = true;
      b.classList.add('bad');
      flash(b, 'shake', 400);
      ctx.wrong({ en: key });
    }
  }
  next();
}
