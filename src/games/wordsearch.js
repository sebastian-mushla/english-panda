// Поиск слов: в сетке букв спрятаны слова. Нажми первую и последнюю букву слова.
import { t, L } from '../i18n.js';
import { shuffle, meaning, esc, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { DECOY, norm } from '../learn/lang.js';

export default function wordsearch(el, ctx) {
  const N = innerWidth < 420 ? 8 : 9;
  const cand = shuffle(ctx.words.filter((w) => !w.t.includes(' ') && w.t.length <= N && w.t.length >= 3));
  const grid = Array.from({ length: N }, () => Array(N).fill(''));
  const placed = [];
  for (const w of cand) {
    if (placed.length >= 5) break;
    const word = [...w.t.toLowerCase()];
    for (let tries = 0; tries < 60; tries++) {
      const vert = Math.random() < 0.5;
      const r = Math.floor(Math.random() * (vert ? N - word.length + 1 : N)), c = Math.floor(Math.random() * (vert ? N : N - word.length + 1));
      const cells = word.map((_, i) => (vert ? [r + i, c] : [r, c + i]));
      if (cells.every(([y, x], i) => !grid[y][x] || grid[y][x] === word[i])) {
        cells.forEach(([y, x], i) => (grid[y][x] = word[i]));
        placed.push({ w, cells });
        break;
      }
    }
  }
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!grid[y][x]) grid[y][x] = DECOY[Math.floor(Math.random() * DECOY.length)];
  const found = new Set();
  let start = null;

  el.innerHTML = `<div class="wsearch">
      <div class="ws-grid en" style="--n:${N}">${grid.flat().map((ch, i) => `<button class="ws-cell" data-i="${i}">${esc(ch)}</button>`).join('')}</div>
      <div class="ws-clues">${placed.map((p, i) => `<span class="ws-clue" data-k="${i}"><i class="emo">${p.w.emoji}</i><b>${esc(meaning(p.w))}</b><em class="en"></em></span>`).join('')}</div>
    </div>`;
  const cells = [...el.querySelectorAll('.ws-cell')];
  const at = (y, x) => cells[y * N + x];

  function setHint() {
    const k = placed.findIndex((_, i) => !found.has(i));
    if (k < 0) return ctx.setHint(null);
    const p = placed[k];
    ctx.setHint('ws' + k, (step) => wordHint(p.w, step, () => { at(...p.cells[0]).classList.add('target'); return t('hint.act'); }));
  }

  function pick(i) {
    const y = Math.floor(i / N), x = i % N;
    if (!start) { start = [y, x]; at(y, x).classList.add('sel'); ctx.sfx('click'); return; }
    const [y0, x0] = start;
    at(y0, x0).classList.remove('sel');
    start = null;
    if (y0 !== y && x0 !== x) return ctx.sfx('wrong');
    const line = [];
    const dy = Math.sign(y - y0), dx = Math.sign(x - x0), len = Math.max(Math.abs(y - y0), Math.abs(x - x0)) + 1;
    for (let k = 0; k < len; k++) line.push([y0 + dy * k, x0 + dx * k]);
    const text = norm(line.map(([a, b]) => grid[a][b]).join(''));
    const k = placed.findIndex((p, j) => !found.has(j) && (norm(p.w.t) === text || norm([...p.w.t].reverse().join('')) === text));
    if (k < 0) { line.forEach(([a, b]) => flash(at(a, b), 'bad', 400)); ctx.sfx('wrong'); return; }
    found.add(k);
    placed[k].cells.forEach(([a, b]) => at(a, b).classList.add('found'));
    const clue = el.querySelector(`.ws-clue[data-k="${k}"]`);
    clue.classList.add('done'); clue.querySelector('em').textContent = placed[k].w.t;
    ctx.right(placed[k].w);
    cells.forEach((c) => c.classList.remove('target'));
    setHint();
    if (found.size === placed.length) setTimeout(() => ctx.finish(true), 700);
  }

  cells.forEach((c, i) => c.addEventListener('click', () => pick(i)));
  setHint();
}
