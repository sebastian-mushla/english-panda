// Фонарь: угадай слово по буквам. Каждая ошибка гасит фонарь, после трёх ошибок появляется картинка.
import { t, L } from '../i18n.js';
import { THEMES } from '../learn/words.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { norm } from '../learn/lang.js';
import { keyboard } from './keyboard.js';

const LIVES = 6, ROUNDS = 4;

export default function lantern(el, ctx) {
  const list = shuffle(ctx.words.filter((w) => w.t.length >= 3)).slice(0, ROUNDS);
  const total = list.length;
  let cur, letters, open, lives, busy = true, tried;

  el.innerHTML = `<div class="typer lantern">
      <div class="ln-top">
        <div class="ln-lamp"><svg viewBox="0 0 60 80" aria-hidden="true"><path d="M30,2 V10" stroke="#3a2a1a" stroke-width="3"/><rect x="18" y="9" width="24" height="6" rx="2" fill="#d9a43a"/>
          <ellipse class="ln-body" cx="30" cy="42" rx="24" ry="27" fill="#d8402e" stroke="#7a1d14" stroke-width="2"/><ellipse class="ln-flame" cx="30" cy="42" rx="11" ry="17" fill="#ffd27a"/>
          <rect x="18" y="67" width="24" height="6" rx="2" fill="#d9a43a"/></svg></div>
        <div class="ln-info"><b class="ln-cat"></b><span class="emo ln-emo" hidden></span><span class="ln-lives"></span></div>
      </div>
      <div class="slots en"></div>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const slots = el.querySelector('.slots'), lamp = el.querySelector('.ln-lamp');

  function draw() {
    slots.innerHTML = letters.map((c, i) => (c === ' ' ? '<i class="gap"></i>' : `<i class="slot ${open[i] ? 'filled' : ''}">${open[i] ? esc(c) : ''}</i>`)).join('');
    slots.style.setProperty('--n', letters.length);
    lamp.style.setProperty('--light', lives / LIVES);
    el.querySelector('.ln-lives').textContent = '🔥'.repeat(lives) + '·'.repeat(LIVES - lives);
    if (LIVES - lives >= 3) el.querySelector('.ln-emo').hidden = false;
  }

  function next() {
    if (!list.length) return ctx.finish(true);
    cur = list.shift();
    letters = [...cur.t];
    open = letters.map((c) => c === ' ');
    lives = LIVES;
    tried = new Set();
    kb.reset();
    el.querySelector('.ln-cat').textContent = L(THEMES[cur.theme]);
    const emo = el.querySelector('.ln-emo'); emo.textContent = cur.emoji; emo.hidden = true;
    el.querySelector('.count').textContent = `${total - list.length} / ${total}`;
    draw();
    const w = cur;
    ctx.setHint(w.en, (step) => wordHint(w, step, () => {
      const hidden = letters.map((c, i) => (!open[i] ? i : -1)).filter((i) => i >= 0);
      if (hidden.length) press(letters[hidden[Math.floor(Math.random() * hidden.length)]].toLowerCase(), true);
      return t('hint.act');
    }));
    busy = false;
  }

  async function press(k, fromHint = false) {
    if (busy || k === 'back' || k === ' ' || tried.has(norm(k))) return;
    tried.add(norm(k));
    const hit = letters.some((c, i) => !open[i] && norm(c) === norm(k));
    kb.used(k, hit);
    if (hit) {
      letters.forEach((c, i) => { if (norm(c) === norm(k)) open[i] = true; });
      if (!fromHint) ctx.sfx('click');
    } else {
      lives--;
      flash(lamp, 'shake', 400);
      ctx.wrong(cur);
    }
    draw();
    if (open.every(Boolean)) {
      busy = true;
      slots.classList.add('ok');
      ctx.right(cur);
      await wait(1000);
      slots.classList.remove('ok');
      next();
    } else if (lives <= 0) {
      busy = true;
      open = open.map(() => true);
      draw();
      slots.classList.add('lost');
      await wait(1600);
      slots.classList.remove('lost');
      next();
    }
  }

  const kb = keyboard(el.querySelector('.kb'), (k) => press(k));
  next();
  return { destroy: kb.destroy };
}
