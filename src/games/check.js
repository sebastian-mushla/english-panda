// Проверка темы: 10 заданий без подсказок — половина на выбор, половина на печать.
// Засчитывается, если с первой попытки верно не меньше 80 %. Иначе тему надо пройти ещё раз.
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';
import { gramPool, gramOptions } from './gram.js';

const N = 10, PASS = 0.8;

export default function check(el, ctx) {
  const pool = shuffle(gramPool(ctx));
  const items = [...pool, ...shuffle(pool)].slice(0, Math.min(N, Math.max(pool.length, 6)));
  let k = 0, good = 0, kb = null, line = null, busy = true;
  ctx.setHint(null);

  function next() {
    kb?.destroy(); kb = null;
    if (k >= items.length) return done();
    const it = items[k++], key = { en: 'g:' + it.s };
    const typing = k % 2 === 0 && it.a.toLowerCase() !== it.base.toLowerCase();
    const [a, b] = it.s.split('___');
    let first = true;
    el.innerHTML = `<div class="typer check">
        <div class="ck-bar"><i style="width:${(k - 1) / items.length * 100}%"></i></div>
        <div class="sentence"><p class="en">${esc(a)}<span class="ck-slot">${typing ? '<span class="slots"></span>' : '<u>____</u>'}</span>${esc(b)}</p><i class="vf-base en">(${esc(it.base)})</i><small>${esc(L(it))}</small></div>
        ${typing ? '<div class="kb"></div>' : `<div class="dl-opts en">${gramOptions(it).map((o) => `<button class="dl-opt" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`}
        <div class="count">${k} / ${items.length}</div></div>`;
    const ok = async () => { busy = true; if (first) good++; ctx.right(key); await wait(600); next(); };
    if (typing) {
      const slots = el.querySelector('.slots');
      kb = keyboard(el.querySelector('.kb'), (x) => { if (!busy) line.key(x); });
      line = typeLine(slots, it.a, {
        onRight: () => ctx.sfx('click'),
        onWrong: (x) => { first = false; kb.mark(x, 'bad'); flash(slots, 'shake', 350); ctx.wrong(key); },
        onDone: () => { slots.classList.add('ok'); ok(); },
      });
    } else {
      el.querySelectorAll('.dl-opt').forEach((x) => x.addEventListener('click', () => {
        if (busy || x.disabled) return;
        if (x.dataset.o === it.a) { x.classList.add('ok'); el.querySelector('u').textContent = it.a; ok(); }
        else { first = false; x.disabled = true; x.classList.add('bad'); flash(x, 'shake', 400); ctx.wrong(key); }
      }));
    }
    busy = false;
  }

  function done() {
    const need = Math.ceil(items.length * PASS), pass = good >= need;
    el.innerHTML = `<div class="ck-result ${pass ? 'pass' : 'fail'}"><b>${good} / ${items.length}</b>
      <p>${esc(t(pass ? 'checkPass' : 'checkFail', { n: need, t: items.length }))}</p></div>`;
    setTimeout(() => ctx.finish(pass), 1800);
  }

  next();
  return { destroy: () => kb?.destroy() };
}
