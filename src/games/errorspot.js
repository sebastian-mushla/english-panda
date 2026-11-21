// Найди ошибку: предложение уже заполнено — верно или с ошибкой? Если ошибка — выбери правильную форму.
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { gramPool, gramOptions } from './gram.js';

const ROUNDS = 6;

export default function errorspot(el, ctx) {
  const items = shuffle(gramPool(ctx)).slice(0, ROUNDS).map((it) => ({ it, bad: Math.random() < 0.6 ? it.w[0] : null }));
  let k = 0, busy = false;

  function next() {
    if (k >= items.length) return ctx.finish(true);
    const { it, bad } = items[k++], key = { en: 'g:' + it.s };
    const [a, b] = it.s.split('___');
    el.innerHTML = `<div class="errspot">
        <div class="sentence"><p class="en">${esc(a)}<b class="es-w">${esc(bad || it.a)}</b>${esc(b)}</p><small>${esc(L(it))}</small></div>
        <div class="es-btns"><button class="btn jade es-ok">✓ ${t('esRight')}</button><button class="btn red es-bad">✗ ${t('esWrong')}</button></div>
        <div class="dl-opts en" hidden></div>
        <div class="count">${k} / ${items.length}</div></div>`;
    ctx.setHint('es' + k, () => { el.querySelector(bad ? '.es-bad' : '.es-ok').classList.add('glow'); return { label: t('hint.3'), text: t('hint.act') }; });
    const w = el.querySelector('.es-w');
    const win = async () => { busy = true; ctx.right(key); w.textContent = it.a; w.classList.add('ok'); await wait(900); next(); };
    el.querySelector('.es-ok').addEventListener('click', (e) => {
      if (busy) return;
      if (!bad) return win();
      flash(e.currentTarget, 'shake', 400); ctx.wrong(key);
    });
    el.querySelector('.es-bad').addEventListener('click', (e) => {
      if (busy) return;
      if (!bad) { flash(e.currentTarget, 'shake', 400); ctx.wrong(key); return; }
      // ошибку нашли — теперь выбери, как правильно
      el.querySelector('.es-btns').hidden = true;
      w.classList.add('bad');
      const opts = el.querySelector('.dl-opts');
      opts.hidden = false;
      opts.innerHTML = gramOptions(it).map((o) => `<button class="dl-opt" data-o="${esc(o)}">${esc(o)}</button>`).join('');
      opts.querySelectorAll('.dl-opt').forEach((x) => x.addEventListener('click', () => {
        if (busy || x.disabled) return;
        if (x.dataset.o === it.a) { x.classList.add('ok'); w.classList.remove('bad'); win(); }
        else { x.disabled = true; x.classList.add('bad'); flash(x, 'shake', 400); ctx.wrong(key); }
      }));
    });
    busy = false;
  }
  next();
}
