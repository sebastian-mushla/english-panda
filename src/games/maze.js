// Лабиринт: доберись до плитки с правильной формой слова. По лабиринту бродит дух — не попадайся.
import { t, L } from '../i18n.js';
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
    px = 1; py = 1;
    // Лабиринт с петлями (не одни коридоры-тупики), плитки ставим так, чтобы к каждой можно было дойти,
    // не наступая на другие; если не вышло — строим лабиринт заново
    let spots = null;
    for (let tries = 0; tries < 30 && !spots; tries++) {
      wall = makeMaze(W, H);
      braid();
      const free = [];
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) if (!wall[y][x] && x + y > 6) free.push([x, y]);
      for (let k = 0; k < 120; k++) {
        const sp = shuffle(free).slice(0, 4);
        if (sp.slice(0, 3).every((p, i) => reach(p, sp.slice(0, 3).filter((_, j) => j !== i)))) { spots = sp; break; }
      }
    }
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

  // убираем часть внутренних стен между проходами: появляются обходные пути вокруг духа и неверных плиток
  function braid() {
    const cand = [];
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      if (!wall[y][x]) continue;
      if ((wall[y][x - 1] === false && wall[y][x + 1] === false) || (wall[y - 1][x] === false && wall[y + 1][x] === false)) cand.push([x, y]);
    }
    for (const [x, y] of shuffle(cand).slice(0, Math.round(cand.length * 0.35))) wall[y][x] = false;
  }

  // есть ли путь от старта до клетки to в обход клеток block
  function reach(to, block) {
    const seen = new Set(['1,1']), queue = [[1, 1]], bad = new Set(block.map(([x, y]) => x + ',' + y));
    while (queue.length) {
      const [x, y] = queue.shift();
      if (x === to[0] && y === to[1]) return true;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const k = (x + dx) + ',' + (y + dy);
        if (wall[y + dy]?.[x + dx] === false && !seen.has(k) && !bad.has(k)) { seen.add(k); queue.push([x + dx, y + dy]); }
      }
    }
    return false;
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

  // встреча с духом: игрок остаётся на месте, а дух улетает в дальний угол (без отката к старту)
  let safeUntil = 0;
  function hitGhost() {
    if (px !== gx || py !== gy || Date.now() < safeUntil) return;
    ctx.sfx('wrong'); flash(board, 'shake', 400);
    let best = [gx, gy], bd = -1;
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const d = Math.abs(x - px) + Math.abs(y - py);
      if (!wall[y][x] && d > bd && !tiles.some((tl) => tl.x === x && tl.y === y)) { bd = d; best = [x, y]; }
    }
    [gx, gy] = best;
    safeUntil = Date.now() + 2500;
  }

  // дух бродит по проходам, не разворачивается без нужды и не подходит к игроку вплотную
  let gdx = 0, gdy = 0;
  ghostT = setInterval(() => {
    if (busy || !wall) return;
    let opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => wall[gy + dy]?.[gx + dx] === false
      && Math.abs(gx + dx - px) + Math.abs(gy + dy - py) > 1);
    if (opts.length > 1) opts = opts.filter(([dx, dy]) => dx !== -gdx || dy !== -gdy);
    if (!opts.length) return;
    [gdx, gdy] = opts[Math.floor(Math.random() * opts.length)];
    gx += gdx; gy += gdy;
    draw();
  }, 900);

  next();
  return { destroy: () => { clearInterval(ghostT); f.destroy(); } };
}
