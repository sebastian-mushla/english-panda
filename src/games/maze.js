// Лабиринт: доберись до плитки с правильной формой слова. По лабиринту бродит дух — не попадайся.
import { t, L } from '../i18n.js';
import { GRAMMAR } from '../learn/words3.js';
import { shuffle, esc, flash } from './kit.js';
import { field, makeMaze } from './field.js';
import { gramPool, gramOptions } from './gram.js';

const W = 11, H = 11, ROUNDS = 3;

export default function maze(el, ctx) {
  const items = shuffle(gramPool(ctx)).slice(0, ROUNDS);
  let round = 0, wall, px, py, gx, gy, tiles, ghostT = 0, busy = false;

  el.innerHTML = `<div class="fieldgame"><div class="fg-task"></div><div class="fg-board"></div><div class="count"></div></div>`;
  const board = el.querySelector('.fg-board');
  const f = field(board, { w: W, h: H, onMove: step });

  function draw() {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const tile = tiles.find((tl) => tl.x === x && tl.y === y && !tl.gone);
      if (x === px && y === py) f.paint(x, y, 'path me', '🐼');
      else if (x === gx && y === gy) f.paint(x, y, 'path ghost', '👻');
      else if (tile) f.paint(x, y, 'path tile', `<b>${esc(tile.text)}</b>`);
      else f.paint(x, y, wall[y][x] ? 'wall' : 'path');
    }
  }

  function next() {
    if (round >= items.length) { clearInterval(ghostT); return ctx.finish(true); }
    const it = items[round++];
    wall = makeMaze(W, H);
    px = 1; py = 1;
    // плитки — в дальних свободных клетках
    const free = [];
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) if (!wall[y][x] && x + y > 6) free.push([x, y]);
    const spots = shuffle(free).slice(0, 4);
    tiles = gramOptions(it).map((text, i) => ({ text, ok: text === it.a, x: spots[i][0], y: spots[i][1] }));
    [gx, gy] = spots[3];
    el.querySelector('.fg-task').innerHTML = `<p class="en">${esc(it.s).replace('___', '<u>____</u>')} <i>(${esc(it.base)})</i></p><small>${esc(L(it))}</small>`;
    el.querySelector('.count').textContent = `${round} / ${items.length}`;
    ctx.setHint('mz' + round, (step) => {
      if (step === 1) return { label: t('hint.mean'), text: esc(L(it)), en: false };
      const bad = tiles.find((tl) => !tl.ok && !tl.gone);
      if (step === 2 && bad) { bad.gone = true; draw(); return { label: t('hint.3'), text: t('hint.act') }; }
      f.cell(...[tiles.find((tl) => tl.ok)].map((tl) => [tl.x, tl.y])[0]).classList.add('glow');
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    draw();
  }

  function step(dx, dy) {
    if (busy) return;
    const nx = px + dx, ny = py + dy;
    if (wall[ny]?.[nx] !== false) return;
    px = nx; py = ny;
    ctx.sfx('click');
    const tile = tiles.find((tl) => tl.x === px && tl.y === py && !tl.gone);
    if (tile) {
      if (tile.ok) { busy = true; ctx.right({ en: 'g:' + items[round - 1].s }); draw(); setTimeout(next, 600); return; }
      tile.gone = true;
      flash(board, 'shake', 400);
      ctx.wrong({ en: 'g:' + items[round - 1].s });
    }
    hitGhost();
    draw();
  }

  function hitGhost() {
    if (px === gx && py === gy) { px = 1; py = 1; ctx.sfx('wrong'); flash(board, 'shake', 400); }
  }

  // дух ходит случайно по проходам
  ghostT = setInterval(() => {
    if (busy || !wall) return;
    const opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => wall[gy + dy]?.[gx + dx] === false);
    if (!opts.length) return;
    const [dx, dy] = opts[Math.floor(Math.random() * opts.length)];
    gx += dx; gy += dy;
    hitGhost();
    draw();
  }, 700);

  next();
  return { destroy: () => { clearInterval(ghostT); f.destroy(); } };
}
