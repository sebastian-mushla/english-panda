// Карточка уровня: дух, три звезды с условиями, новые слова, испытания, кнопка «Старт».
import { state, TARGET } from '../state.js';
import { t, L } from '../i18n.js';
import { THEMES, BY_THEME } from '../learn/words.js';
import { MOBS, mobSVG } from '../learn/mobs.js';
import { levelDef, isUnlocked, levelWords, topicTitle, phaseTitle, phaseDone } from '../learn/curriculum.js';
import { PLACE_ICON } from './place.js';
import { openModal } from './modal.js';
import { sfx } from '../audio.js';
import { esc } from '../games/kit.js';

export function openLevelCard(n, onStart) {
  const def = levelDef(n), mob = MOBS[def.mob];
  const open = isUnlocked(n), stars = state.levels[n]?.stars || [];
  const known = !!state.mobs[def.mob];
  const words = def.exam || def.built ? [] : levelWords(def);
  const stages = def.place ? [] : def.exam || def.built ? def.stages : ['intro', ...def.stages];
  const title = def.built ? L(topicTitle(def)) : '';
  const m = openModal(`<div class="lcard">
      <h2>${t('level')} ${n}</h2>
      ${def.place ? `<img class="lc-door" src="assets/places/${def.place}-door.webp" alt="">` : ''}
      <div class="lc-sub">${def.exam ? `${t('exam')} · ${t({ 1: 'zone.gate', 2: 'zone.sgate', 3: 'zone.agate', 4: 'zone.wgate', 5: 'zone.c1gate' }[def.ch])}` : (def.built ? `${def.place ? PLACE_ICON[def.place] + ' ' + t('place.' + def.place) + ' · ' : ''}${esc(title)}` : `${L(THEMES[def.theme])} · <span class="en">${THEMES[def.theme][TARGET]}</span>`)}</div>
      <div class="lc-inner parch">
        <div class="lc-top">
          <div class="lc-spirit"><div class="medal ${known ? '' : 'unknown'}">${mobSVG(def.mob)}</div><small>${known ? L(mob.name) : t('spirit')}</small></div>
          <ul class="lc-stars">${['done', 'perfect', 'nohint'].map((k, i) => `<li class="${stars[i] ? 'on' : ''}"><i>★</i>${t('star.' + k)}</li>`).join('')}</ul>
        </div>
        <div class="lc-sep"></div>
        ${def.place ? `<div class="lc-stages"><b>${t('phases')}:</b> ${def.phases.map((p, i) => `<span class="chip ${phaseDone(n, i) ? 'on' : ''}">${i + 1}. ${esc(L(phaseTitle(def, i)) || '')}</span>`).join('')}</div>` : `<div class="lc-stages"><b>${t('stages')}:</b> ${stages.map((s) => `<span class="chip">${t('g.' + s)}</span>`).join('')}</div>`}
        ${words.length ? `<div class="lc-words"><b>${t('newWords')}:</b><div>${words.map((w) => `<span class="wchip">${w.emoji} <span class="en">${esc(w.t)}</span></span>`).join('')}</div></div>` : ''}
      </div>
      ${open ? `<button class="btn red start">${def.place ? t('enter') : t('start')} ▶</button>` : `<p class="lc-locked">🔒 ${t('lockedText', { n: n - 1 })}</p>`}
    </div>`, { cls: 'small lcard-modal' });
  m.body.querySelector('.start')?.addEventListener('click', () => { sfx('click'); m.close(); onStart(n); });
}
