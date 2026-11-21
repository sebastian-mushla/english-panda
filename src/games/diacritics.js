// Háčky a čárky: в слове пропущена «трудная» буква (ř, ě, ů, ú…). Выбери правильную из похожих.
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { SPELL, LOOKALIKE } from '../learn/words4cz.js';

const ROUNDS = 8;

export default function diacritics(el, ctx) {
  const own = ctx.words.filter((w) => w.theme === 'spell');
  const base = own.length >= 4 ? own : SPELL.map(([t0, ru, uk, emoji]) => ({ en: 'sp:' + t0, t: t0, ru, uk, emoji }));
  // в каждом слове берём одну трудную букву; слово может попасться дважды с разными буквами
  const tasks = shuffle(base.flatMap((w) => [...w.t].map((c, i) => (LOOKALIKE[c] ? { w, i, c } : null)).filter(Boolean))).slice(0, ROUNDS);
  let k = 0, busy = false;

  function next() {
    if (k >= tasks.length) return ctx.finish(true);
    const { w, i, c } = tasks[k++];
    const opts = shuffle(LOOKALIKE[c]);
    const shown = [...w.t].map((ch, j) => (j === i ? '<u class="dc-gap">?</u>' : esc(ch))).join('');
    el.innerHTML = `<div class="diacr">
        <div class="dc-card"><span class="emo">${w.emoji}</span><small>${esc(L({ ru: w.ru, uk: w.uk }))}</small></div>
        <p class="dc-word en">${shown}</p>
        <div class="dc-opts en">${opts.map((o, j) => `<button class="dl-opt" data-k="${j}">${esc(o)}</button>`).join('')}</div>
        <div class="count">${k} / ${tasks.length}</div></div>`;
    ctx.setHint('dc' + k, (step) => {
      const bad = [...el.querySelectorAll('.dl-opt')].filter((b) => opts[+b.dataset.k] !== c && !b.disabled);
      if (step === 1) return { label: t('hint.rule'), text: esc(t('rule.spell')), en: false };
      if (step === 2 && bad[0]) { bad[0].disabled = true; bad[0].classList.add('gone'); return { label: t('hint.3'), text: t('hint.act') }; }
      el.querySelectorAll('.dl-opt').forEach((b) => { if (opts[+b.dataset.k] === c) b.classList.add('glow'); });
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    el.querySelectorAll('.dl-opt').forEach((b) => b.addEventListener('click', async () => {
      if (busy || b.disabled) return;
      if (opts[+b.dataset.k] === c) {
        busy = true; b.classList.add('ok');
        el.querySelector('.dc-gap').outerHTML = `<b class="dc-ok">${esc(c)}</b>`;
        ctx.right(w); await wait(700); next();
      } else { b.disabled = true; b.classList.add('bad'); flash(b, 'shake', 400); ctx.wrong(w); }
    }));
  }
  next();
}
