// Скоропись: листья с картинкой и переводом падают, успей напечатать слово на изучаемом языке, пока лист не упал.
import { t } from '../i18n.js';
import { shuffle, meaning, esc, wait, flash } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { keyboard } from './keyboard.js';
import { norm } from '../learn/lang.js';

const GOAL = 8, LIVES = 3, FALL_MS = 12000, EVERY_MS = 3400, MAX_ON = 3;

export default function rush(el, ctx) {
  let queue = shuffle(ctx.pool), cut = 0, lives = LIVES, buf = '', leaves = [], last = 0, raf = 0, over = false, id = 0;

  el.innerHTML = `<div class="rush">
      <div class="rush-top"><span class="rush-goal"></span><span class="rush-lives"></span></div>
      <div class="field"><div class="ground"></div></div>
      <div class="buffer en"><span></span><i class="caret"></i></div>
      <div class="kb"></div>
    </div>`;
  const field = el.querySelector('.field'), bufEl = el.querySelector('.buffer span');
  const kb = keyboard(el.querySelector('.kb'), onKey);

  function hud() {
    el.querySelector('.rush-goal').innerHTML = `🍃 ${cut} / ${GOAL}`;
    el.querySelector('.rush-lives').innerHTML = Array.from({ length: LIVES }, (_, i) => `<i class="${i < lives ? 'on' : ''}">🏮</i>`).join('');
  }

  function spawn(now) {
    if (!queue.length) queue = shuffle(ctx.pool);
    const w = queue.shift();
    const node = document.createElement('div');
    node.className = 'leaf';
    node.innerHTML = `<span class="emo">${w.emoji}</span><b>${esc(meaning(w))}</b><em class="en"></em>`;
    node.style.left = `${8 + Math.random() * 70}%`;
    field.append(node);
    leaves.push({ id: ++id, w, node, born: now, sway: Math.random() * 6 });
    setHint();
  }

  function setHint() {
    const lead = leaves[0];
    if (!lead) return ctx.setHint(null);
    ctx.setHint('leaf' + lead.id, (step) => {
      lead.node.classList.add('target');
      return wordHint(lead.w, step, () => {
        lead.node.querySelector('em').textContent = lead.w.t;
        lead.born += 3000; // лист замедляется
        return t('hint.act');
      });
    });
  }

  function remove(l) {
    leaves = leaves.filter((x) => x !== l);
    setTimeout(() => l.node.remove(), 600);
    setHint();
  }

  function tick(now) {
    if (over) return;
    raf = requestAnimationFrame(tick);
    if (!last || (now - last > EVERY_MS && leaves.length < MAX_ON)) { last = now; spawn(now); }
    const h = field.clientHeight;
    for (const l of [...leaves]) {
      const p = (now - l.born) / FALL_MS;
      if (p >= 1) {
        l.node.classList.add('fallen');
        ctx.wrong(l.w);
        queue.splice(1, 0, l.w);
        lives--;
        hud();
        remove(l);
        if (lives <= 0) return end(false);
        continue;
      }
      l.node.style.transform = `translate(${Math.sin(now / 700 + l.sway) * 18}px, ${p * (h - 70)}px) rotate(${Math.sin(now / 900 + l.sway) * 8}deg)`;
    }
  }

  function onKey(k) {
    if (over) return;
    if (k === 'back') buf = buf.slice(0, -1);
    else buf += k;
    const hit = leaves.find((l) => norm(l.w.t) === norm(buf));
    if (hit) {
      hit.node.classList.add('cut');
      ctx.right(hit.w);
      cut++;
      buf = '';
      hud();
      remove(hit);
      if (cut >= GOAL) end(true);
    } else if (buf && !leaves.some((l) => norm(l.w.t).startsWith(norm(buf)))) {
      // такого начала нет ни у одного листа: подсветить и стереть последнюю букву
      kb.mark(k, 'bad');
      flash(bufEl.parentElement, 'shake', 350);
      ctx.sfx('wrong');
      buf = buf.slice(0, -1);
    } else ctx.sfx('click');
    bufEl.textContent = buf;
  }

  async function end(ok) {
    over = true;
    cancelAnimationFrame(raf);
    await wait(700);
    ctx.finish(ok);
  }

  hud();
  raf = requestAnimationFrame(tick);
  return { destroy: () => { over = true; cancelAnimationFrame(raf); kb.destroy(); } };
}
