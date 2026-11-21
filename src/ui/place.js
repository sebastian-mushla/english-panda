// Место большой темы (дом мастера, пещера, вход в гору, фонтан знаний, храм, библиотека):
// отдельная локация поверх мира с тропой из камней-фаз. Фаза открывается, когда пройдена предыдущая.
import { state } from '../state.js';
import { t, L } from '../i18n.js';
import { levelDef, topicTitle, phaseTitle, phaseDone } from '../learn/curriculum.js';
import { sfx } from '../audio.js';
import { esc } from '../games/kit.js';

export const PLACE_ICON = { house: '🏠', cave: '🦇', mountain: '⛰️', fountain: '⛲', temple: '🏯', library: '📚' };

import { interior, PATH } from '../world/interiors.js';

let root = null;

export function openPlace(n, onPhase) {
  const def = levelDef(n);
  closePlace();
  root = document.createElement('div');
  root.id = 'place';
  root.className = 'place place-' + def.place;
  const done = (i) => phaseDone(n, i);
  const open = (i) => i === 0 || done(i - 1);
  // сцена-картина 16:9: на телефоне её листают по горизонтали, камни фаз стоят прямо на тропе внутри
  const pts = def.phases.map((p, i) => PATH[Math.round(i * (PATH.length - 1) / Math.max(1, def.phases.length - 1))]);
  root.innerHTML = `<header class="pl-head"><button class="g-x pl-x" aria-label="${t('close')}">✕</button>
      <div><b>${PLACE_ICON[def.place] || ''} ${esc(t('place.' + def.place))}</b><small>${esc(L(topicTitle(def)) || '')}</small></div></header>
    <div class="pl-world">
      <svg class="pl-bg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">${interior(def.place)}
        <path d="M${pts.map(([x, y]) => `${x},${y + 40}`).join(' L')}" stroke="#f6ecd4" stroke-width="6" stroke-dasharray="4 18" stroke-linecap="round" fill="none" opacity=".75"/></svg>
      ${def.phases.map((p, i) => {
        const st = state.phases[n + ':' + i]?.stars || [];
        const cls = done(i) ? 'done' : open(i) ? 'current' : 'locked';
        const [x, y] = pts[i];
        return `<button class="pl-stone ${cls}" data-i="${i}" style="left:${x / 16}%;top:${y / 9}%" ${open(i) ? '' : 'disabled'} aria-label="${t('phase')} ${i + 1}: ${esc(L(phaseTitle(def, i)) || '')}">
          <span class="stone"><b>${i + 1}</b>${open(i) ? '' : '<em class="lock">🔒</em>'}</span>
          <span class="pl-label">${esc(L(phaseTitle(def, i)) || t('phase') + ' ' + (i + 1))}${done(i) ? `<i class="pl-stars">${[0, 1, 2].map((j) => `<em class="${st[j] ? 'on' : ''}">★</em>`).join('')}</i>` : ''}</span></button>`;
      }).join('')}
    </div>`;
  document.body.append(root);
  root.querySelector('.pl-x').addEventListener('click', () => { sfx('click'); closePlace(); });
  root.querySelectorAll('.pl-stone').forEach((b) => b.addEventListener('click', () => { sfx('click'); onPhase(n, +b.dataset.i); }));
  // прокрутка к текущей фазе
  root.querySelector('.pl-stone.current')?.scrollIntoView({ block: 'center', inline: 'center' });
}

export function closePlace() { root?.remove(); root = null; }
