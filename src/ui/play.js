// Экран уровня: шапка с подсказкой и монетами, испытания по очереди, итог со звёздами.
import { state, save, addCoins, on, off, emit, upg } from '../state.js';
import { t, L, nWords } from '../i18n.js';
import { sfx } from '../audio.js';
import { THEMES } from '../learn/words.js';
import { MOBS, mobSVG } from '../learn/mobs.js';
import { LEVELS } from '../learn/curriculum.js';
import { newSession, commit, knownCount } from '../learn/srs.js';
import { hintCost } from '../learn/hints.js';
import { checkAch, dailyStep } from '../progress.js';
import { toast } from './modal.js';
import { openCertificate } from './book.js';
import { pandaSVG } from '../world/panda.js';

const GAMES = {
  intro: () => import('../games/intro.js'), cards: () => import('../games/cards.js'), type: () => import('../games/type.js'), gap: () => import('../games/gap.js'), rush: () => import('../games/rush.js'),
  spell: () => import('../games/spell.js'), sudoku: () => import('../games/sudoku.js'), builder: () => import('../games/builder.js'),
  duel: () => import('../games/duel.js'),
};

const root = document.getElementById('game');

export function runPlay(play, { onExit, onNext }) {
  const { def } = play;
  const stages = def.exam || def.review ? [...def.stages] : ['intro', ...def.stages];
  const session = newSession();
  const pool = [...play.words, ...play.review];
  let si = 0, mistakes = 0, hints = 0, mounted = null, hintKey = null, hintFn = null, stageWrong = new Set();
  const hintSteps = {};
  const lives = { max: 3 + upg('lantern'), count: 3 + upg('lantern'), shield: upg('shield') > 0 };
  lives.lose = () => {
    if (lives.shield) { lives.shield = false; toast(t('shieldSaved'), '🛡️'); return lives.count; }
    lives.count = Math.max(0, lives.count - 1);
    return lives.count;
  };

  const title = def.review ? t('reviewTitle') : `${t('level')} ${def.n} · ${def.exam ? t('exam') : L(THEMES[def.theme])}`;
  root.hidden = false;
  root.innerHTML = `<div class="g-bg"></div>
    <header class="g-head">
      <button class="g-x" aria-label="${t('close')}">✕</button>
      <div class="g-title"><b>${title}</b><span class="g-stage"></span></div>
      <div class="g-dots">${stages.map((s) => `<i title="${t('g.' + s)}"></i>`).join('')}</div>
      <button class="g-hint"><span>📜 ${t('hint')}</span><em></em></button>
      <span class="g-coins"><i class="coin"></i><b>${state.coins}</b></span>
    </header>
    <div class="g-instr"></div>
    <main class="g-stage-area"></main>
    <div class="g-hintpop" hidden></div>`;
  const area = root.querySelector('.g-stage-area'), hintBtn = root.querySelector('.g-hint'), pop = root.querySelector('.g-hintpop');
  const offCoins = on('coins', () => { root.querySelector('.g-coins b').textContent = state.coins; });

  root.querySelector('.g-x').addEventListener('click', () => { sfx('click'); exit(); });

  function exit() {
    mounted?.destroy?.();
    off('coins', offCoins);
    root.hidden = true;
    root.innerHTML = '';
    onExit?.();
  }

  function updateHintBtn() {
    const step = (hintSteps[hintKey] || 0) + 1;
    const em = hintBtn.querySelector('em');
    hintBtn.disabled = !hintFn || step > 3;
    em.innerHTML = hintFn && step <= 3 ? `${hintCost(step)} <i class="coin"></i>` : '—';
  }

  hintBtn.addEventListener('click', () => {
    if (!hintFn) return toast(t('hintNothing'), '📜');
    const step = (hintSteps[hintKey] || 0) + 1;
    if (step > 3) return;
    const cost = hintCost(step);
    if (state.coins < cost) { sfx('wrong'); return toast(t('noCoins'), '🪙'); }
    addCoins(-cost);
    hints++;
    state.stats.hints++;
    hintSteps[hintKey] = step;
    const res = hintFn(step);
    sfx('flip');
    // на клавиатурных играх и телефонах — полоска над клавиатурой / под инструкцией, чтобы не закрывать задание
    const kb = area.querySelector('.kb');
    const strip = !!kb || innerWidth < 760;
    pop.classList.toggle('strip', strip);
    if (kb) kb.before(pop); else if (strip) root.querySelector('.g-instr').after(pop); else root.append(pop);
    pop.hidden = false;
    pop.innerHTML = `<div class="scroll"><b>${res.label} · ${step}/3</b><p class="${res.en ? 'en' : ''}">${res.text}</p><small>${t('hintNote')}</small></div>`;
    pop.onclick = () => { pop.hidden = true; };
    updateHintBtn();
  });

  const ctx = {
    def, play, words: play.words, review: play.review, pool, themes: play.themes, lives,
    sfx,
    right(w) { session.right.add(w.en); state.stats.right++; dailyStep('right'); sfx('right'); },
    wrong(w) {
      session.wrong.add(w.en);
      if (!stageWrong.has(w.en)) { stageWrong.add(w.en); mistakes++; }
      sfx('wrong');
    },
    setHint(key, fn) { if (key !== hintKey) pop.hidden = true; hintKey = key; hintFn = fn || null; updateHintBtn(); },
    finish(ok) { setTimeout(() => (ok ? nextStage() : result(false)), 50); },
  };

  async function startStage() {
    const name = stages[si];
    root.tabIndex = -1;
    root.focus({ preventScroll: true });
    stageWrong = new Set();
    root.querySelectorAll('.g-dots i').forEach((d, i) => d.className = i < si ? 'done' : i === si ? 'cur' : '');
    root.querySelector('.g-stage').textContent = t('g.' + name);
    root.querySelector('.g-instr').innerHTML = `<span>${t('gi.' + name)}</span>`;
    area.className = 'g-stage-area st-' + name;
    area.innerHTML = '';
    const mod = await GAMES[name]();
    mounted = mod.default(area, ctx) || null;
  }

  function nextStage() {
    mounted?.destroy?.();
    mounted = null;
    si++;
    if (si >= stages.length) return result(true);
    startStage();
  }

  function result(win) {
    mounted?.destroy?.();
    ctx.setHint(null);
    commit(session);
    if (def.review) return reviewResult();
    const prev = state.levels[def.n] || { stars: [false, false, false], plays: 0 };
    const got = win ? [true, mistakes <= 1, hints === 0] : [false, false, false];
    const first = win && !prev.stars[0];
    const stars = prev.stars.map((s, i) => s || got[i]);
    const newStars = got.filter((g, i) => g && !prev.stars[i]).length;
    state.levels[def.n] = { stars, plays: prev.plays + 1 };
    let reward = 0, caught = false;
    if (win) {
      reward = first ? 20 + 10 * got.filter(Boolean).length + MOBS[def.mob].reward : 5 + 10 * newStars;
      reward = Math.round(reward * (1 + 0.1 * upg('coin')));
      caught = !state.mobs[def.mob];
      state.mobs[def.mob] = (state.mobs[def.mob] || 0) + 1;
      if (got.every(Boolean)) state.stats.perfect++;
      state.stats.noHintLevels = hints === 0 ? state.stats.noHintLevels + 1 : 0;
      dailyStep('levels');
      if (def.exam && !state.certs.length) state.certs.push({ ch: 1, date: new Date().toISOString().slice(0, 10), name: state.name });
    }
    save();
    sfx(win ? 'win' : 'lose');
    const mob = MOBS[def.mob];
    const hasNext = win && def.n < LEVELS.length;
    root.querySelector('.g-instr').innerHTML = '';
    area.className = 'g-stage-area st-result';
    area.innerHTML = `<div class="result ${win ? 'win' : 'lose'}">
      <div class="roll top"></div>
      <div class="res-body">
        <h2>${win ? t('win') : t('lose')}</h2>
        ${win ? `<div class="res-stars">${[t('star.done'), t('star.perfect'), t('star.nohint')].map((s, i) => `<div class="rs ${got[i] ? 'on' : ''}" style="--d:${i * 0.35 + 0.3}s"><i>★</i><span>${s}</span></div>`).join('')}</div>` : `<p class="res-lose">${t('loseText')}</p><div class="res-panda">${pandaSVG({ ...state.equip })}</div>`}
        <div class="res-stats">
          <span>${t('mistakes')}: <b>${mistakes}</b></span><span>${t('hintsUsed')}: <b>${hints}</b></span>
          <span>${t('wordsInDict')}: <b>${knownCount()}</b></span>
        </div>
        ${win && reward ? `<div class="res-reward">${t('reward')}: <b class="rcount">+0</b> <i class="coin"></i></div>` : ''}
        ${caught ? `<div class="res-caught"><div class="medal">${mobSVG(def.mob)}</div><div><b>${L(mob.name)}</b><span>${t('caught')}</span></div></div>` : ''}
        <div class="res-actions">
          ${def.exam && win && first ? `<button class="btn jade cert">📜 ${t('certTitle')}</button>` : ''}
          <button class="btn small lobby">${t('toLobby')}</button>
          <button class="btn small again">${t('retry')}</button>
          ${hasNext ? `<button class="btn red next">${t('next')} ▶</button>` : ''}
        </div>
      </div>
      <div class="roll bottom"></div>
    </div>`;
    if (win && reward) {
      setTimeout(() => {
        addCoins(reward);
        sfx('coin');
        const el = area.querySelector('.rcount');
        let n = 0;
        const step = Math.max(1, Math.round(reward / 20));
        const iv = setInterval(() => { n = Math.min(reward, n + step); el.textContent = '+' + n; if (n >= reward) clearInterval(iv); }, 40);
      }, 1300);
    }
    checkAch();
    emit('progress', { level: def.n, first });
    area.querySelector('.lobby').addEventListener('click', () => { sfx('click'); exit(); });
    area.querySelector('.again').addEventListener('click', () => { sfx('click'); exit(); onNext?.(def.n); });
    area.querySelector('.next')?.addEventListener('click', () => { sfx('click'); exit(); onNext?.(def.n + 1); });
    area.querySelector('.cert')?.addEventListener('click', () => openCertificate(state.certs[0]));
  }

  function reviewResult() {
    addCoins(10);
    sfx('win');
    checkAch();
    emit('progress', {});
    area.className = 'g-stage-area st-result';
    area.innerHTML = `<div class="result win"><div class="roll top"></div><div class="res-body">
      <h2>${t('reviewDone')}</h2><p>${nWords(play.words.length)} · ${t('mistakes')}: <b>${mistakes}</b></p>
      <div class="res-reward">${t('reward')}: <b>+10</b> <i class="coin"></i></div>
      <div class="res-actions"><button class="btn red lobby">${t('toLobby')}</button></div></div><div class="roll bottom"></div></div>`;
    area.querySelector('.lobby').addEventListener('click', exit);
  }

  startStage();
}
