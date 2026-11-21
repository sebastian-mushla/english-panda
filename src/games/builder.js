// Сборщик фраз: собери предложение на изучаемом языке по переводу.
import { t } from '../i18n.js';
import { state } from '../state.js';
import { SENTENCES, BY_TARGET, BY_THEME, sentence } from '../learn/words.js';
import { CH3 } from '../learn/ch3.js';
import { shuffle, pick, esc, wait, flash } from './kit.js';

const KEEP = new Set(['I', 'Mei', 'Мэй']);

function tokens(en) {
  return en.replace(/[.?!]$/, '').replace(/,/g, '').split(' ').map((w, i) => (i === 0 && !KEEP.has(w) ? w.toLowerCase() : w));
}

export default function builder(el, ctx) {
  // «Длинные предложения» главы 3: B1-фразы из 8–12 слов
  const list = ctx.long ? shuffle(CH3.LONG).slice(0, 3).map((s) => ({ s, th: ctx.def.theme in BY_THEME ? ctx.def.theme : 'reg' }))
    : ctx.themes.length > 1
    ? shuffle(ctx.themes).slice(0, 3).map((th) => ({ s: pick(SENTENCES[th]), th }))
    : shuffle(SENTENCES[ctx.themes[0]]).map((s) => ({ s, th: ctx.themes[0] }));
  const total = list.length;
  let cur, answer, pool, busy;

  el.innerHTML = `<div class="builder">
      <div class="prompt"><span class="mean"></span></div>
      <div class="answer en"></div>
      <div class="pool en"></div>
      <div class="stage-actions"><button class="btn red check">${t('check')}</button></div>
      <div class="count"></div>
    </div>`;
  const ansEl = el.querySelector('.answer'), poolEl = el.querySelector('.pool'), check = el.querySelector('.check');

  function next() {
    if (!list.length) return ctx.finish(true);
    const item = list.shift();
    const [en, native] = sentence(item.s, state.lang);
    const toks = tokens(en);
    const decoy = pick(BY_THEME[item.th].filter((w) => !w.t.includes(' ') && !toks.includes(w.t))).t;
    cur = { en, toks, key: 's:' + item.s[0] };
    answer = [];
    pool = shuffle([...toks, decoy]).map((w, i) => ({ w, i, used: false }));
    busy = false;
    el.querySelector('.mean').textContent = native;
    el.querySelector('.count').textContent = `${total - list.length} / ${total}`;
    render();
    ctx.setHint(cur.key, (step) => {
      if (step === 1) return { label: t('hint.pattern'), text: toks.map((w) => w[0] + '_'.repeat(w.length - 1)).join(' ') + en.slice(-1), en: true };
      fixPrefix();
      addCorrect();
      return { label: t('hint.3'), text: t('hint.act') };
    });
  }

  // оставить только верное начало ответа
  function fixPrefix() {
    let k = 0;
    while (k < answer.length && pool[answer[k]].w === cur.toks[k]) k++;
    answer.slice(k).forEach((pi) => (pool[pi].used = false));
    answer = answer.slice(0, k);
  }
  function addCorrect() {
    const need = cur.toks[answer.length];
    const p = pool.find((x) => !x.used && x.w === need);
    if (p) { p.used = true; answer.push(p.i); }
    render();
  }

  function render() {
    ansEl.innerHTML = answer.map((pi, k) => `<button class="word" data-k="${k}">${esc(pool[pi].w)}</button>`).join('') || '<span class="placeholder">…</span>';
    poolEl.innerHTML = pool.map((p) => `<button class="word ${p.used ? 'used' : ''}" data-i="${p.i}">${esc(p.w)}</button>`).join('');
    ansEl.querySelectorAll('.word').forEach((b) => b.addEventListener('click', () => {
      if (busy) return;
      const pi = answer.splice(+b.dataset.k, 1)[0];
      pool[pi].used = false; ctx.sfx('click'); render();
    }));
    poolEl.querySelectorAll('.word:not(.used)').forEach((b) => b.addEventListener('click', () => {
      if (busy) return;
      pool[+b.dataset.i].used = true; answer.push(+b.dataset.i); ctx.sfx('click'); render();
    }));
    check.disabled = answer.length !== cur.toks.length;
  }

  check.addEventListener('click', async () => {
    if (busy) return;
    const ok = answer.every((pi, k) => pool[pi].w === cur.toks[k]);
    if (ok) {
      busy = true;
      ctx.right({ en: cur.key });
      cur.toks.forEach((w) => BY_TARGET[w.toLowerCase()] && ctx.right(BY_TARGET[w.toLowerCase()]));
      ansEl.innerHTML = `<span class="full">${esc(cur.en)}</span>`;
      ansEl.classList.add('ok');
      await wait(1600);
      ansEl.classList.remove('ok');
      next();
    } else {
      ctx.wrong({ en: cur.key });
      [...ansEl.children].forEach((b, k) => { if (pool[answer[k]].w !== cur.toks[k]) b.classList.add('bad'); });
      flash(ansEl, 'shake', 400);
    }
  });
  next();
}
