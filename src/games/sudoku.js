// Судоку слов 4×4: подсказанные клетки — картинки, игрок ставит слова изучаемого языка.
import { t } from '../i18n.js';
import { shuffle, esc, wait, flash, pic } from './kit.js';
import { wordHint } from '../learn/hints.js';

function solution() {
  let g = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]];
  const sw = (a, i, j) => { [a[i], a[j]] = [a[j], a[i]]; };
  if (Math.random() < 0.5) sw(g, 0, 1);
  if (Math.random() < 0.5) sw(g, 2, 3);
  if (Math.random() < 0.5) { sw(g, 0, 2); sw(g, 1, 3); }
  const cols = [0, 1, 2, 3];
  if (Math.random() < 0.5) sw(cols, 0, 1);
  if (Math.random() < 0.5) sw(cols, 2, 3);
  if (Math.random() < 0.5) { sw(cols, 0, 2); sw(cols, 1, 3); }
  const sym = shuffle([0, 1, 2, 3]);
  return g.map((row) => cols.map((c) => sym[row[c]]));
}

export default function sudoku(el, ctx) {
  // в судоку только картинки, поэтому сначала слова с однозначной картинкой
  const ws = [...shuffle(ctx.words.filter((w) => !w.vague)), ...shuffle(ctx.words.filter((w) => w.vague))].slice(0, 4);
  const sol = solution().flat();
  const givens = new Set(shuffle([...Array(16).keys()]).slice(0, 7));
  const placed = new Map();
  let active = null, target = null;

  el.innerHTML = `<div class="sudoku">
      <div class="sgrid">${sol.map((v, i) => `<button class="scell ${givens.has(i) ? 'given' : ''}" data-i="${i}">${givens.has(i) ? pic(ws[v]) : ''}</button>`).join('')}</div>
      <div class="palette">${ws.map((w, i) => `<button class="pword en" data-v="${i}">${esc(w.t)}</button>`).join('')}</div>
    </div>`;
  const cells = [...el.querySelectorAll('.scell')];
  const words = [...el.querySelectorAll('.pword')];
  const select = (v) => { active = v; words.forEach((b) => b.classList.toggle('on', +b.dataset.v === v)); };
  words.forEach((b) => b.addEventListener('click', () => { select(+b.dataset.v); ctx.sfx('click'); }));
  select(0);

  function setHint() {
    cells.forEach((c) => c.classList.remove('target'));
    target = cells.findIndex((c, i) => !givens.has(i) && !placed.has(i));
    if (target < 0) return ctx.setHint(null);
    const w = ws[sol[target]], idx = target;
    ctx.setHint('cell' + idx, (step) => {
      cells[idx].classList.add('target');
      return wordHint(w, step, () => { put(idx, sol[idx]); return t('hint.act'); });
    });
  }

  function put(i, v) {
    placed.set(i, v);
    cells[i].innerHTML = `<span class="en">${esc(ws[v].t)}</span>`;
    cells[i].classList.add('filled');
    cells[i].classList.remove('target');
    if (placed.size + givens.size === 16) { setTimeout(() => ctx.finish(true), 700); ctx.setHint(null); }
    else setHint();
  }

  cells.forEach((c, i) => c.addEventListener('click', async () => {
    if (givens.has(i)) return;
    if (placed.has(i) || active === null) return;
    if (sol[i] === active) { ctx.right(ws[active]); put(i, active); }
    else { flash(c, 'shake', 400); c.classList.add('bad'); ctx.wrong(ws[active]); await wait(500); c.classList.remove('bad'); }
  }));
  setHint();
}
