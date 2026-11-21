// Рыбалка: по пруду плавают рыбы со словами. Лови только слова нужной темы.
import { t, L } from '../i18n.js';
import { state, save } from '../state.js';
import { THEMES, BY_THEME } from '../learn/words.js';
import { shuffle, pick, esc, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';

const GOAL = 6, LANES = 4, MAX_SWIM = 5;

export default function fishing(el, ctx) {
  const theme = ctx.def.exam ? pick(ctx.themes) : ctx.themes[0];
  const good = BY_THEME[theme];
  const others = (ctx.others.length ? ctx.others : ctx.themes.filter((th) => th !== theme)).flatMap((th) => BY_THEME[th] || []);
  const bad = shuffle(others.length ? others : []).slice(0, 10);
  let queue = shuffle([...good, ...good.slice(0, 2), ...bad]), caught = 0, id = 0, over = false, timer = 0;
  const swimming = new Map();

  el.innerHTML = `<div class="fishing">
      <div class="fish-top"><span class="fish-goal">🎣 0 / ${GOAL}</span><span class="fish-cat">${t('fishOnly')} <b>${esc(L(THEMES[theme]))}</b></span></div>
      <div class="pond">${Array.from({ length: LANES }, (_, i) => `<div class="lane" style="--l:${i}"></div>`).join('')}<div class="lily-pad"></div></div>
    </div>`;
  const pond = el.querySelector('.pond');

  function spawn() {
    if (over) return;
    if (swimming.size < MAX_SWIM) {
      if (!queue.length) queue = shuffle([...good, ...bad]);
      const w = queue.shift();
      // самая свободная дорожка, чтобы рыбы не наезжали друг на друга
      const busy = Array(LANES).fill(0);
      swimming.forEach((v) => busy[v.lane]++);
      const lane = busy.indexOf(Math.min(...busy));
      const fid = ++id, dir = Math.random() < 0.5 ? 1 : -1;
      const f = document.createElement('button');
      f.className = `fish ${dir < 0 ? 'left' : ''}`;
      f.style.cssText = `--lane:${lane};--dur:${(8 + Math.random() * 4).toFixed(1)}s;--hue:${Math.floor(Math.random() * 360)}`;
      f.innerHTML = `<span class="fish-body"><b class="en">${esc(w.t)}</b></span>`;
      f.addEventListener('animationend', () => { swimming.delete(fid); f.remove(); if (good.includes(w)) queue.push(w); setHint(); });
      f.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(fid, f, w); });
      pond.append(f);
      swimming.set(fid, { f, w, lane });
      setHint();
    }
    timer = setTimeout(spawn, 900 + Math.random() * 700);
  }

  function tap(fid, f, w) {
    if (over || f.classList.contains('gone')) return;
    if (w.theme === theme) {
      f.classList.add('gone', 'caught');
      caught++;
      state.stats.fish = (state.stats.fish || 0) + 1; save();
      ctx.right(w);
      el.querySelector('.fish-goal').textContent = `🎣 ${caught} / ${GOAL}`;
      swimming.delete(fid);
      setTimeout(() => f.remove(), 500);
      setHint();
      if (caught >= GOAL) { over = true; clearTimeout(timer); setTimeout(() => ctx.finish(true), 700); }
    } else {
      f.classList.add('gone', 'flee');
      flash(el.querySelector('.fish-cat'), 'shake', 400);
      ctx.wrong(w);
      swimming.delete(fid);
      setTimeout(() => f.remove(), 500);
    }
  }

  function setHint() {
    const target = [...swimming.values()].find((s) => s.w.theme === theme);
    if (!target) return ctx.setHint(null);
    ctx.setHint('fish' + target.w.en, (step) => wordHint(target.w, step, () => { target.f.classList.add('glow'); return t('hint.act'); }));
  }

  spawn();
  return { destroy: () => { over = true; clearTimeout(timer); } };
}
