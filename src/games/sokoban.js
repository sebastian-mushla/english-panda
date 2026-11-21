// Сокобан слов: толкай блок с правильным словом в пропуск предложения (клетка со звездой).
import { t, L } from '../i18n.js';
import { shuffle, esc, flash } from './kit.js';
import { field } from './field.js';
import { gramPool, gramOptions, ruleBox } from './gram.js';

const W = 9, H = 7, ROUNDS = 3;
// звезда каждый раз в новом месте; блоки никогда не стоят прямо под ней, чтобы любой блок требовал пары ходов
const SLOT = [4, 1];

export default function sokoban(el, ctx) {
  const items = shuffle(gramPool(ctx)).slice(0, ROUNDS);
  let round = 0, px, py, blocks, it, busy = false;

  el.innerHTML = `<div class="fieldgame"><div class="fg-task"></div><div class="fg-board"></div>
      <div class="fg-row"><button class="btn small fg-reset">↺ ${t('again')}</button><span class="count"></span></div></div>`;
  const board = el.querySelector('.fg-board');
  const f = field(board, { w: W, h: H, onMove: step });
  const isWall = (x, y) => x <= 0 || y <= 0 || x >= W - 1 || y >= H - 1;

  function draw() {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const b = blocks.find((bl) => bl.x === x && bl.y === y);
      const slot = x === SLOT[0] && y === SLOT[1];
      if (isWall(x, y)) f.paint(x, y, 'wall');
      else if (x === px && y === py) f.paint(x, y, 'path me', '🐼');
      else if (b) f.paint(x, y, 'path block' + (slot ? ' onslot' : ''), `<b>${esc(b.text)}</b>`);
      else f.paint(x, y, 'path' + (slot ? ' slot' : ''), slot ? '★' : '');
    }
  }

  function place() {
    SLOT[0] = 1 + Math.floor(Math.random() * (W - 2));
    const xs = shuffle([2, 3, 4, 5, 6].filter((x) => x !== SLOT[0])).slice(0, 3);
    px = 1 + Math.floor(Math.random() * (W - 2)); py = 5;
    blocks = gramOptions(it).map((text, i) => ({ text, ok: text === it.a, x: xs[i], y: 3 }));
    draw();
  }

  function next() {
    if (round >= items.length) return ctx.finish(true);
    it = items[round++];
    el.querySelector('.fg-task').innerHTML = `<p class="en">${esc(it.s).replace('___', '<u>★</u>')} <i>(${esc(it.base)})</i></p><small>${esc(L(it))}</small>${ruleBox(it.kind)}`;
    el.querySelector('.count').textContent = `${round} / ${items.length}`;
    ctx.setHint('sk' + round, (step) => {
      if (step === 1) return { label: t('hint.mean'), text: esc(L(it)), en: false };
      const ok = blocks.find((b) => b.ok);
      f.cell(ok.x, ok.y).classList.add('glow');
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    place();
  }

  function step(dx, dy) {
    if (busy) return;
    const nx = px + dx, ny = py + dy;
    if (isWall(nx, ny)) return;
    const b = blocks.find((bl) => bl.x === nx && bl.y === ny);
    if (b) {
      const bx = nx + dx, by = ny + dy;
      if (isWall(bx, by) || blocks.some((o) => o.x === bx && o.y === by)) return;
      b.x = bx; b.y = by;
      ctx.sfx('flip');
      if (bx === SLOT[0] && by === SLOT[1]) {
        px = nx; py = ny; draw();
        if (b.ok) { busy = true; ctx.right({ en: 'g:' + it.s }); setTimeout(next, 700); }
        else { flash(board, 'shake', 400); ctx.wrong({ en: 'g:' + it.s }); setTimeout(place, 600); }
        return;
      }
    }
    px = nx; py = ny;
    draw();
  }

  el.querySelector('.fg-reset').addEventListener('click', () => { if (!busy) place(); });
  next();
  return { destroy: f.destroy };
}
