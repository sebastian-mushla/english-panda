// Карточная дуэль с духом: дух загадывает значение, игрок бросает карту с нужным словом.
import { t, L } from '../i18n.js';
import { state, save } from '../state.js';
import { MOBS, mobSVG } from '../learn/mobs.js';
import { shuffle, meaning, esc, distractors, wait, flash, pic } from './kit.js';
import { wordHint } from '../learn/hints.js';
import { SEAL } from '../learn/lang.js';

export default function duel(el, ctx) {
  const mob = MOBS[ctx.def.mob];
  const pool = ctx.pool;
  let hp = mob.hp, combo = 0, turn = 0, queue = shuffle(pool), cur = null, type = '', busy = false;
  const types = ['meaning', 'pic', 'riddle', 'meaning', 'pic'];

  el.innerHTML = `<div class="duel">
      <div class="foe">
        <div class="foe-hp"></div>
        <div class="foe-art">${mobSVG(ctx.def.mob)}</div>
        <div class="foe-name">${esc(L(mob.name))}</div>
      </div>
      <div class="bubble"><small></small><div class="ask"></div></div>
      <div class="combo"></div>
      <div class="hand"></div>
      <div class="lives"></div>
      <div class="splash"></div>
    </div>`;
  const art = el.querySelector('.foe-art'), hand = el.querySelector('.hand'), bubble = el.querySelector('.bubble');

  function drawHp() {
    el.querySelector('.foe-hp').innerHTML = Array.from({ length: mob.hp }, (_, i) => `<i class="${i < hp ? 'on' : ''}">🌸</i>`).join('');
    el.querySelector('.lives').innerHTML = Array.from({ length: ctx.lives.max }, (_, i) => `<i class="${i < ctx.lives.count ? 'on' : ''}">🏮</i>`).join('');
  }

  function nextTurn() {
    if (!queue.length) queue = shuffle(pool);
    cur = queue.shift();
    type = types[turn++ % types.length];
    if (type === 'riddle' && ((ctx.def.n < 3 && !ctx.def.exam) || !cur.riddle)) type = 'meaning';
    const ask = bubble.querySelector('.ask'), small = bubble.querySelector('small');
    if (type === 'meaning') { small.textContent = t('askMeaning'); ask.innerHTML = `<b>${esc(meaning(cur))}</b>`; }
    if (type === 'pic') { small.textContent = t('askPic'); ask.innerHTML = pic(cur); }
    if (type === 'riddle') { small.textContent = t('askRiddle'); ask.innerHTML = `<i class="en">${esc(cur.riddle)}</i>`; }
    flash(bubble, 'pop', 400);
    const cards = shuffle([cur, ...distractors(cur, 3, pool)]);
    hand.innerHTML = cards.map((w, i) => `<button class="dcard" data-en="${esc(w.en)}" style="--i:${i}"><span class="seal">${SEAL}</span><span class="en">${esc(w.t)}</span></button>`).join('');
    hand.querySelectorAll('.dcard').forEach((b) => b.addEventListener('click', () => play(b)));
    const w = cur;
    ctx.setHint(w.en + turn, (step) => wordHint(w, step, () => {
      [...hand.querySelectorAll('.dcard')].filter((b) => b.dataset.en !== w.en).slice(0, 2).forEach((b) => { b.disabled = true; b.classList.add('gone'); });
      return t('hint.act');
    }));
    busy = false;
  }

  async function play(b) {
    if (busy || b.disabled) return;
    busy = true;
    if (b.dataset.en === cur.en) {
      combo++;
      const dmg = combo >= 3 ? 2 : 1;
      state.stats.maxCombo = Math.max(state.stats.maxCombo, combo); save();
      b.classList.add('fly');
      ctx.right(cur);
      await wait(380);
      ctx.sfx('hit');
      flash(art, 'hit', 500);
      hp = Math.max(0, hp - dmg);
      const c = el.querySelector('.combo');
      c.textContent = combo >= 3 ? `${t('crit')} ${t('combo', { n: combo })}` : combo > 1 ? t('combo', { n: combo }) : '';
      flash(c, 'pop', 600);
      drawHp();
      await wait(500);
      if (hp <= 0) {
        art.classList.add('caught');
        bubble.classList.add('hide');
        hand.innerHTML = '';
        await wait(1200);
        return ctx.finish(true);
      }
    } else {
      combo = 0;
      b.classList.add('burn');
      ctx.wrong(cur);
      queue.splice(1, 0, cur);
      flash(art, 'attack', 600);
      flash(el.querySelector('.splash'), 'show', 900);
      const left = ctx.lives.lose();
      drawHp();
      el.querySelector('.combo').textContent = '';
      // показываем верную карту, чтобы ошибка стала уроком
      hand.querySelector(`.dcard[data-en="${CSS.escape(cur.en)}"]`)?.classList.add('right');
      await wait(1300);
      if (left <= 0) return ctx.finish(false);
    }
    nextTurn();
  }

  drawHp();
  nextTurn();
}
