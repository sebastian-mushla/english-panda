// Мини-кроссворд: слова пересекаются по общим буквам. Подсказка к слову — картинка и перевод.
// Выбираешь слово (по клетке или подсказке) и печатаешь его на клавиатуре.
import { t } from '../i18n.js';
import { shuffle, meaning, esc, wait, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { norm } from '../learn/lang.js';
import { keyboard } from './keyboard.js';

// Жадная раскладка: каждое следующее слово пересекает уже стоящие по общей букве
function layout(words) {
  let best = null;
  for (let attempt = 0; attempt < 40; attempt++) {
    const list = attempt ? shuffle(words) : [...words].sort((a, b) => b.t.length - a.t.length);
    const cells = new Map(); // "y,x" → буква
    const placed = [];
    const key = (y, x) => y + ',' + x;
    const fits = (word, y, x, vert) => {
      for (let i = 0; i < word.length; i++) {
        const yy = vert ? y + i : y, xx = vert ? x : x + i, have = cells.get(key(yy, xx));
        if (have && norm(have) !== norm(word[i])) return false;
        if (!have) { // соседи сбоку должны быть пустыми, чтобы не слипались слова
          const side = vert ? [key(yy, xx - 1), key(yy, xx + 1)] : [key(yy - 1, xx), key(yy + 1, xx)];
          if (side.some((k) => cells.has(k))) return false;
        }
      }
      const before = vert ? key(y - 1, x) : key(y, x - 1), after = vert ? key(y + word.length, x) : key(y, x + word.length);
      return !cells.has(before) && !cells.has(after);
    };
    const put = (w, y, x, vert) => {
      const word = [...w.t.toLowerCase()];
      word.forEach((ch, i) => cells.set(key(vert ? y + i : y, vert ? x : x + i), ch));
      placed.push({ w, y, x, vert, len: word.length });
    };
    for (const w of list) {
      const word = [...w.t.toLowerCase()];
      if (!placed.length) { put(w, 0, 0, false); continue; }
      let done = false;
      for (const p of shuffle(placed)) {
        for (let j = 0; j < p.len && !done; j++) {
          const py = p.vert ? p.y + j : p.y, px = p.vert ? p.x : p.x + j, ch = cells.get(key(py, px));
          for (let i = 0; i < word.length && !done; i++) {
            if (norm(word[i]) !== norm(ch)) continue;
            const vert = !p.vert, y = vert ? py - i : py, x = vert ? px : px - i;
            if (fits(word, y, x, vert)) { put(w, y, x, vert); done = true; }
          }
        }
        if (done) break;
      }
      if (placed.length >= 6) break;
    }
    if (!best || placed.length > best.placed.length) best = { placed, cells };
    if (placed.length >= 5) break;
  }
  return best;
}

export default function crossword(el, ctx) {
  const pool = shuffle(ctx.words.filter((w) => !w.t.includes(' ') && w.t.length >= 3 && w.t.length <= 9)).slice(0, 8);
  const { placed } = layout(pool);
  const ys = placed.flatMap((p) => [p.y, p.vert ? p.y + p.len - 1 : p.y]), xs = placed.flatMap((p) => [p.x, p.vert ? p.x : p.x + p.len - 1]);
  const y0 = Math.min(...ys), x0 = Math.min(...xs), rows = Math.max(...ys) - y0 + 1, cols = Math.max(...xs) - x0 + 1;
  placed.forEach((p, i) => { p.y -= y0; p.x -= x0; p.n = i + 1; p.solved = false; p.pos = 0; });
  const cellOf = (p, i) => [p.vert ? p.y + i : p.y, p.vert ? p.x : p.x + i];
  const filled = new Map(); // "y,x" → буква, уже вписанная
  let cur = null;

  const map = new Map();
  placed.forEach((p) => { for (let i = 0; i < p.len; i++) { const [y, x] = cellOf(p, i); map.set(y + ',' + x, p.w.t.toLowerCase()[i]); } });

  el.innerHTML = `<div class="xword">
      <div class="xw-grid en" style="--rows:${rows};--cols:${cols}">${Array.from({ length: rows * cols }, (_, k) => {
        const y = Math.floor(k / cols), x = k % cols, has = map.has(y + ',' + x);
        const num = placed.find((p) => p.y === y && p.x === x);
        return `<i class="xw-cell ${has ? '' : 'void'}" data-yx="${y},${x}">${num ? `<sup>${num.n}</sup>` : ''}<span></span></i>`;
      }).join('')}</div>
      <div class="xw-clues">${placed.map((p) => `<button class="xw-clue" data-n="${p.n}"><b>${p.n}${p.vert ? '↓' : '→'}</b><i class="emo">${p.w.emoji}</i><span>${esc(meaning(p.w))}</span></button>`).join('')}</div>
      <div class="kb"></div>
    </div>`;
  const cell = (y, x) => el.querySelector(`.xw-cell[data-yx="${y},${x}"]`);

  // пропустить уже вписанные клетки (на пересечениях)
  const skip = (p) => { while (p.pos < p.len && filled.has(cellOf(p, p.pos).join(','))) p.pos++; };

  function select(p) {
    if (!p || p.solved) return;
    cur = p;
    el.querySelectorAll('.xw-cell').forEach((c) => c.classList.remove('on'));
    el.querySelectorAll('.xw-clue').forEach((c) => c.classList.toggle('on', +c.dataset.n === p.n));
    for (let i = 0; i < p.len; i++) cell(...cellOf(p, i)).classList.add('on');
    skip(p);
    const w = p.w;
    ctx.setHint('xw' + p.n, (step) => wordHint(w, step, () => { write(p); return t('hint.act'); }));
  }

  function write(p) {
    const [y, x] = cellOf(p, p.pos);
    const ch = p.w.t.toLowerCase()[p.pos];
    filled.set(y + ',' + x, ch);
    cell(y, x).querySelector('span').textContent = ch;
    cell(y, x).classList.add('ok');
    p.pos++;
    skip(p);
    if (p.pos >= p.len) done(p);
  }

  async function done(p) {
    p.solved = true;
    ctx.right(p.w);
    el.querySelector(`.xw-clue[data-n="${p.n}"]`).classList.add('done');
    // другие слова могли заполниться через пересечения
    placed.forEach((q) => { skip(q); if (!q.solved && q.pos >= q.len) { q.solved = true; ctx.right(q.w); el.querySelector(`.xw-clue[data-n="${q.n}"]`).classList.add('done'); } });
    const next = placed.find((q) => !q.solved);
    if (!next) { ctx.setHint(null); await wait(700); return ctx.finish(true); }
    select(next);
  }

  const kb = keyboard(el.querySelector('.kb'), (k) => {
    if (!cur || cur.solved || k === 'back' || k === ' ') return;
    const ch = cur.w.t.toLowerCase()[cur.pos];
    if (norm(k) === norm(ch)) { ctx.sfx('click'); write(cur); } else {
      kb.mark(k, 'bad');
      flash(cell(...cellOf(cur, cur.pos)), 'shake', 350);
      ctx.wrong(cur.w);
    }
  });
  el.querySelectorAll('.xw-clue').forEach((b) => b.addEventListener('click', () => select(placed[+b.dataset.n - 1])));
  el.querySelectorAll('.xw-cell:not(.void)').forEach((c) => c.addEventListener('click', () => {
    const [y, x] = c.dataset.yx.split(',').map(Number);
    const hit = placed.filter((p) => !p.solved && [...Array(p.len).keys()].some((i) => { const [a, b] = cellOf(p, i); return a === y && b === x; }));
    select(hit.find((p) => p !== cur) || hit[0]);
  }));
  select(placed[0]);
  return { destroy: kb.destroy };
}
