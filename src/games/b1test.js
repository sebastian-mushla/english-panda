// Пробный тест B1: чтение текста с вопросами и грамматика. В конце — результат в процентах.
import { t } from '../i18n.js';
import { CH3 } from '../learn/ch3.js';
import { TARGET } from '../state.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { gramOptions } from './gram.js';

export default function b1test(el, ctx) {
  const reading = CH3.READING.q.map((q) => ({ part: 'read', q: q.q, ok: q.ok, opts: shuffle([q.ok, ...q.bad]) }));
  const grammar = shuffle(CH3.GRAMMAR).slice(0, 6).map((g) => ({ part: 'gram', q: g.s.replace('___', '_____'), ok: g.a, opts: gramOptions(g) }));
  const items = [...reading, ...grammar];
  let i = 0, score = 0, busy = false;

  el.innerHTML = `<div class="b1test">
      <div class="bt-head"><b>${TARGET === 'cz' ? 'B1 · Zkušební test' : 'B1 · Practice test'}</b><span class="bt-prog"></span></div>
      <div class="bt-text en"><p>${esc(CH3.READING.text)}</p></div>
      <div class="bt-q en"></div>
      <div class="bt-opts"></div>
    </div>`;
  const qEl = el.querySelector('.bt-q'), opts = el.querySelector('.bt-opts');

  async function next() {
    if (i >= items.length) {
      ctx.setHint(null);
      const pct = Math.round(score / items.length * 100);
      el.querySelector('.bt-text').hidden = true;
      qEl.innerHTML = `<div class="bt-score">${pct}%</div><p>${t(pct >= 70 ? 'b1Pass' : 'b1Fail')}</p>`;
      opts.innerHTML = '';
      await wait(2200);
      return ctx.finish(true);
    }
    const it = items[i++];
    el.querySelector('.bt-text').hidden = it.part !== 'read';
    el.querySelector('.bt-prog').textContent = `${i} / ${items.length} · ${t(it.part === 'read' ? 'b1Reading' : 'b1Grammar')}`;
    qEl.textContent = it.q;
    opts.innerHTML = it.opts.map((o, k) => `<button class="dl-opt en" data-k="${k}">${esc(o)}</button>`).join('');
    let first = true;
    opts.querySelectorAll('.dl-opt').forEach((b) => b.addEventListener('click', async () => {
      if (busy || b.disabled) return;
      const key = { en: 'b1:' + it.q };
      if (it.opts[+b.dataset.k] === it.ok) {
        busy = true; if (first) score++;
        b.classList.add('ok'); ctx.right(key); await wait(600); busy = false; next();
      } else {
        first = false; b.disabled = true; b.classList.add('bad'); flash(b, 'shake', 400); ctx.wrong(key);
      }
    }));
    // на тесте подсказка только убирает один неверный вариант
    ctx.setHint('bt' + i, () => {
      const bad = [...opts.querySelectorAll('.dl-opt')].find((b) => it.opts[+b.dataset.k] !== it.ok && !b.disabled);
      if (bad) { bad.disabled = true; bad.classList.add('gone'); }
      return { label: t('hint.3'), text: t('hint.act') };
    });
  }
  next();
}
