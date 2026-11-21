// Сбор букв: панда ходит по полю и собирает буквы слова по порядку. Для неправильных глаголов — форму прошедшего времени.
import { t } from '../i18n.js';
import { shuffle, meaning, esc, flash } from './kit.js';
import { field } from './field.js';
import { DECOY } from '../learn/lang.js';

const W = 9, H = 7, ROUNDS = 3;

export default function letters(el, ctx) {
  const verbs = ctx.words.filter((w) => w.v2);
  // для глаголов собираем V2 (went), иначе само слово
  const tasks = shuffle(verbs.length ? verbs : ctx.words).slice(0, ROUNDS).map((w) => ({ w, word: (w.v2 || w.t).split('/')[0], v2: !!w.v2 }));
  let round = 0, px, py, items, pos, rocks, busy = false;

  el.innerHTML = `<div class="fieldgame"><div class="fg-task"></div><div class="fg-word en"></div><div class="fg-board"></div><div class="count"></div></div>`;
  const board = el.querySelector('.fg-board');
  const f = field(board, { w: W, h: H, onMove: step });

  function draw() {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const it = items.find((i) => i.x === x && i.y === y && !i.got);
      if (x === px && y === py) f.paint(x, y, 'path me', '🐼');
      else if (rocks.has(x + ',' + y)) f.paint(x, y, 'wall rock');
      else if (it) f.paint(x, y, 'path letter', `<b>${esc(it.ch)}</b>`);
      else f.paint(x, y, 'path');
    }
    const word = tasks[round - 1].word;
    el.querySelector('.fg-word').innerHTML = [...word].map((c, i) => `<i class="${i < pos ? 'on' : ''}">${i < pos ? esc(c) : '_'}</i>`).join('');
  }

  function next() {
    if (round >= tasks.length) return ctx.finish(true);
    const task = tasks[round++];
    pos = 0; px = 4; py = 6;
    const cellsFree = shuffle(Array.from({ length: W * H }, (_, i) => [i % W, Math.floor(i / W)]).filter(([x, y]) => !(x === px && y === py)));
    rocks = new Set(cellsFree.slice(0, 6).map(([x, y]) => x + ',' + y));
    const spots = cellsFree.slice(6);
    const chars = [...task.word];
    items = [...chars.map((ch, i) => ({ ch, i })), ...[0, 1, 2].map(() => ({ ch: DECOY[Math.floor(Math.random() * DECOY.length)], i: -1 }))]
      .map((it, k) => ({ ...it, x: spots[k][0], y: spots[k][1] }));
    const w = task.w;
    el.querySelector('.fg-task').innerHTML = task.v2
      ? `<p><span class="emo">${w.emoji}</span> <b class="en">${esc(w.t)}</b> → <b>?</b></p><small>${esc(t('lettersPast'))}</small>`
      : `<p><span class="emo">${w.emoji}</span> <b>${esc(meaning(w))}</b></p><small>${esc(t('lettersWord'))}</small>`;
    el.querySelector('.count').textContent = `${round} / ${tasks.length}`;
    ctx.setHint('lt' + round, (step) => {
      if (step === 1) return { label: t('hint.mean'), text: esc(meaning(w)), en: false };
      const it = items.find((i) => i.i === pos && !i.got);
      if (it) f.cell(it.x, it.y).classList.add('glow');
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    draw();
  }

  function step(dx, dy) {
    if (busy) return;
    const nx = px + dx, ny = py + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H || rocks.has(nx + ',' + ny)) return;
    px = nx; py = ny;
    const it = items.find((i) => i.x === px && i.y === py && !i.got);
    if (it) {
      const word = tasks[round - 1].word;
      if (it.ch.toLowerCase() === word[pos].toLowerCase()) {
        it.got = true; pos++; ctx.sfx('click');
        if (pos >= word.length) { busy = true; ctx.right(tasks[round - 1].w); draw(); setTimeout(next, 700); return; }
      } else {
        flash(board, 'shake', 350);
        ctx.wrong(tasks[round - 1].w);
      }
    }
    draw();
  }

  next();
  return { destroy: f.destroy };
}
