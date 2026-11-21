// se или si: вставь в предложение возвратную частицу. «—» значит, что частица не нужна.
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { gramPool } from './gram.js';

const ROUNDS = 8;

export default function sesi(el, ctx) {
  const items = shuffle(gramPool({ def: { gram: 'refl' } })).slice(0, ROUNDS);
  let k = 0, busy = false;

  function next() {
    if (k >= items.length) return ctx.finish(true);
    const it = items[k++];
    const [a, b] = it.s.split('___');
    el.innerHTML = `<div class="sesi">
        <div class="sentence"><p class="en">${esc(a)}<u>___</u>${esc(b)}</p><small>${esc(L(it))}</small></div>
        <div class="ss-opts en">${['se', 'si'].map((o) => `<button class="dl-opt" data-o="${o}">${o}</button>`).join('')}</div>
        <div class="count">${k} / ${items.length}</div></div>`;
    const key = { en: 'g:' + it.s };
    ctx.setHint('ss' + k, (step) => {
      if (step === 1) return { label: t('hint.rule'), text: esc(t('rule.refl')), en: false };
      el.querySelector(`[data-o="${it.a}"]`)?.classList.add('glow');
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    el.querySelectorAll('.dl-opt').forEach((x) => x.addEventListener('click', async () => {
      if (busy || x.disabled) return;
      if (x.dataset.o === it.a) { busy = true; x.classList.add('ok'); el.querySelector('u').textContent = it.a; ctx.right(key); await wait(700); next(); }
      else { x.disabled = true; x.classList.add('bad'); flash(x, 'shake', 400); ctx.wrong(key); }
    }));
  }
  next();
}
