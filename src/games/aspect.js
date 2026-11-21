// Вид глагола: сначала собери пары «несовершенный — совершенный» (psát — napsat), потом выбери вид по смыслу предложения.
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { gramPool, gramOptions } from './gram.js';
import { ASPECT } from '../learn/words4cz.js';

export default function aspect(el, ctx) {
  const own = ctx.words.filter((w) => w.v2 && w.theme === 'aspect');
  const pairs = shuffle(own.length >= 4 ? own.map((w) => [w.t, w.v2]) : ASPECT.map(([a, b]) => [a, b])).slice(0, 4);
  const sents = shuffle(gramPool({ def: { gram: 'aspect' } })).slice(0, 4);
  let pick = null, matched = 0, busy = false;

  el.innerHTML = `<div class="aspect">
      <p class="as-title">${esc(t('aspectMatch'))}</p>
      <div class="as-cols en"><div class="as-l">${pairs.map(([a], i) => `<button class="dl-opt" data-i="${i}">${esc(a)}</button>`).join('')}</div>
        <div class="as-r">${shuffle(pairs.map(([, b], i) => [b, i])).map(([b, i]) => `<button class="dl-opt" data-j="${i}">${esc(b)}</button>`).join('')}</div></div>
      <div class="count"></div>
    </div>`;
  el.querySelector('.count').textContent = `0 / ${pairs.length}`;
  ctx.setHint('asm', (step) => {
    const l = [...el.querySelectorAll('[data-i]')].find((b) => !b.disabled);
    if (l) { l.classList.add('glow'); el.querySelector(`[data-j="${l.dataset.i}"]`).classList.add('glow'); }
    return { label: t('hint.3'), text: t('hint.act') };
  });
  el.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => {
    if (busy || b.disabled) return;
    el.querySelectorAll('[data-i]').forEach((x) => x.classList.toggle('sel', x === b));
    pick = b; ctx.sfx('click');
  }));
  el.querySelectorAll('[data-j]').forEach((b) => b.addEventListener('click', async () => {
    if (busy || b.disabled || !pick) return;
    const key = { en: 'asp:' + pairs[pick.dataset.i][0] };
    if (b.dataset.j === pick.dataset.i) {
      [b, pick].forEach((x) => { x.disabled = true; x.classList.remove('sel', 'glow'); x.classList.add('ok'); });
      ctx.right(key); pick = null; matched++;
      el.querySelector('.count').textContent = `${matched} / ${pairs.length}`;
      if (matched === pairs.length) { busy = true; await wait(600); sentences(); }
    } else { flash(b, 'shake', 400); ctx.wrong(key); }
  }));

  // вторая часть: какой вид нужен в предложении
  let k = 0;
  function sentences() {
    if (k >= sents.length) return ctx.finish(true);
    const it = sents[k++];
    const opts = gramOptions(it);
    const [a, b] = it.s.split('___');
    el.innerHTML = `<div class="aspect">
        <div class="sentence"><p class="en">${esc(a)}<u>____</u>${esc(b)}</p><i class="vf-base en">(${esc(it.base)})</i><small>${esc(L(it))}</small></div>
        <div class="dl-opts en">${opts.map((o, i) => `<button class="dl-opt" data-k="${i}">${esc(o)}</button>`).join('')}</div>
        <div class="count">${k} / ${sents.length}</div></div>`;
    const key = { en: 'g:' + it.s };
    ctx.setHint('ass' + k, (step) => {
      if (step === 1) return { label: t('hint.rule'), text: esc(t('rule.aspect')), en: false };
      el.querySelectorAll('.dl-opt').forEach((x) => { if (opts[+x.dataset.k] === it.a) x.classList.add('glow'); });
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    el.querySelectorAll('.dl-opt').forEach((x) => x.addEventListener('click', async () => {
      if (busy || x.disabled) return;
      if (opts[+x.dataset.k] === it.a) { busy = true; x.classList.add('ok'); el.querySelector('u').textContent = it.a; ctx.right(key); await wait(800); sentences(); }
      else { x.disabled = true; x.classList.add('bad'); flash(x, 'shake', 400); ctx.wrong(key); }
    }));
  }
}
