// Место большой темы (дом мастера, пещера, вход в гору, фонтан знаний, храм, библиотека):
// отдельная локация поверх мира с тропой из камней-фаз. Фаза открывается, когда пройдена предыдущая.
import { state } from '../state.js';
import { t, L } from '../i18n.js';
import { levelDef, topicTitle, phaseTitle, phaseDone } from '../learn/curriculum.js';
import { sfx } from '../audio.js';
import { esc } from '../games/kit.js';

export const PLACE_ICON = { house: '🏠', cave: '🦇', mountain: '⛰️', fountain: '⛲', temple: '🏯', library: '📚' };

// Фоны мест: один SVG на весь экран, без растеризации (лёгкий для телефона)
const SCENE = {
  house: `<rect width="400" height="800" fill="#3a2414"/><rect y="560" width="400" height="240" fill="#5a3820"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 50}" y="0" width="4" height="560" fill="#2a180c"/>`).join('')}
    <rect x="250" y="90" width="110" height="140" rx="6" fill="#1b2450"/><circle cx="320" cy="140" r="22" fill="#f6e7b0"/><path d="M250,160 H360 M305,90 V230" stroke="#3a2414" stroke-width="6"/>
    <rect x="30" y="250" width="150" height="10" fill="#7a4e2a"/><rect x="30" y="330" width="150" height="10" fill="#7a4e2a"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${38 + i * 28}" y="${200 + (i % 2) * 6}" width="20" height="${50 - (i % 2) * 6}" fill="${['#a3301e', '#2f6a4a', '#d9a43a', '#3a5a8a', '#8a3a6a'][i]}"/>`).join('')}
    <circle cx="200" cy="60" r="26" fill="#d8402e"/><circle cx="200" cy="60" r="60" fill="#ffb347" opacity=".18"/>`,
  cave: `<rect width="400" height="800" fill="#141b2c"/><path d="M0,0 H400 V120 Q300,200 200,150 Q100,110 0,190Z" fill="#0b1020"/>
    <path d="M0,800 V600 Q100,560 200,610 Q300,650 400,580 V800Z" fill="#1d2640"/>
    ${[[40, 260], [340, 340], [80, 520], [320, 640], [180, 720]].map(([x, y]) => `<path d="M${x},${y} l10,-34 l10,34 z" fill="#5ad0e0" opacity=".8"/><circle cx="${x + 10}" cy="${y - 14}" r="26" fill="#5ad0e0" opacity=".12"/>`).join('')}
    ${[60, 150, 260, 350].map((x) => `<path d="M${x},0 l12,${60 + (x % 50)} l12,-${60 + (x % 50)}" fill="#0b1020"/>`).join('')}`,
  mountain: `<rect width="400" height="800" fill="#2a2620"/><path d="M0,0 H400 V800 H0Z" fill="url(#plTun)"/>
    <path d="M60,800 V260 Q200,90 340,260 V800" fill="#14110d"/><path d="M90,800 V280 Q200,140 310,280 V800" fill="#1e1a14"/>
    ${[[70, 300], [330, 300], [70, 560], [330, 560]].map(([x, y]) => `<rect x="${x - 4}" y="${y}" width="8" height="40" fill="#6a4424"/><circle cx="${x}" cy="${y - 6}" r="9" fill="#ffb347"/><circle cx="${x}" cy="${y - 6}" r="40" fill="#ff9a3c" opacity=".15"/>`).join('')}
    <defs><linearGradient id="plTun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4438"/><stop offset="1" stop-color="#1a1712"/></linearGradient></defs>`,
  fountain: `<rect width="400" height="800" fill="#9fd0e0"/><rect y="420" width="400" height="380" fill="#7aa86a"/>
    <ellipse cx="200" cy="470" rx="150" ry="40" fill="#cfd8dc"/><ellipse cx="200" cy="465" rx="130" ry="30" fill="#5ab0d0"/>
    <rect x="186" y="330" width="28" height="130" fill="#cfd8dc"/><ellipse cx="200" cy="330" rx="60" ry="14" fill="#cfd8dc"/>
    <path d="M200,320 Q170,250 150,330 M200,320 Q230,250 250,330 M200,320 V230" stroke="#e6f8ff" stroke-width="6" fill="none" opacity=".9"/>
    ${[[60, 400], [340, 400], [40, 700], [360, 720]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="40" fill="#e88aa8" opacity=".8"/>`).join('')}`,
  temple: `<rect width="400" height="800" fill="#5a1d14"/><rect y="600" width="400" height="200" fill="#3a120c"/>
    ${[50, 350].map((x) => `<rect x="${x - 16}" y="80" width="32" height="520" fill="#a3301e"/>`).join('')}
    <path d="M0,90 Q200,40 400,90 V110 H0Z" fill="#2a2a2a"/><circle cx="200" cy="330" r="80" fill="#d9a43a" opacity=".25"/><text x="200" y="360" font-size="90" text-anchor="middle" fill="#d9a43a" opacity=".6">道</text>`,
  library: `<rect width="400" height="800" fill="#2e2016"/>
    ${[0, 1, 2, 3, 4, 5].map((r) => `<rect x="0" y="${60 + r * 120}" width="400" height="8" fill="#6a4424"/>${[...Array(14)].map((_, i) => `<rect x="${6 + i * 28}" y="${68 + r * 120 - 0}" width="20" height="${60 + ((i * 7 + r) % 4) * 8}" transform="translate(0 ${-((i * 7 + r) % 4) * 8 + 40})" fill="${['#8a3a22', '#2f5a4a', '#c8a050', '#3a4a7a', '#6a2a4a'][(i + r) % 5]}" opacity=".85"/>`).join('')}`).join('')}
    <rect width="400" height="800" fill="#000" opacity=".25"/>`,
};

let root = null;

export function openPlace(n, onPhase) {
  const def = levelDef(n);
  closePlace();
  root = document.createElement('div');
  root.id = 'place';
  root.className = 'place place-' + def.place;
  const done = (i) => phaseDone(n, i);
  const open = (i) => i === 0 || done(i - 1);
  root.innerHTML = `<svg class="pl-bg" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${SCENE[def.place] || SCENE.cave}</svg>
    <header class="pl-head"><button class="g-x pl-x" aria-label="${t('close')}">✕</button>
      <div><b>${PLACE_ICON[def.place] || ''} ${esc(t('place.' + def.place))}</b><small>${esc(L(topicTitle(def)) || '')}</small></div></header>
    <div class="pl-path">${def.phases.map((p, i) => {
      const st = state.phases[n + ':' + i]?.stars || [];
      const cls = done(i) ? 'done' : open(i) ? 'current' : 'locked';
      return `<button class="pl-stone ${cls} ${i % 2 ? 'r' : 'l'}" data-i="${i}" ${open(i) ? '' : 'disabled'}>
        <span class="stone"><b>${i + 1}</b>${open(i) ? '' : '<em class="lock">🔒</em>'}</span>
        <span class="pl-label">${esc(L(phaseTitle(def, i)) || t('phase') + ' ' + (i + 1))}${done(i) ? `<i class="pl-stars">${[0, 1, 2].map((j) => `<em class="${st[j] ? 'on' : ''}">★</em>`).join('')}</i>` : ''}</span></button>`;
    }).join('')}</div>`;
  document.body.append(root);
  root.querySelector('.pl-x').addEventListener('click', () => { sfx('click'); closePlace(); });
  root.querySelectorAll('.pl-stone').forEach((b) => b.addEventListener('click', () => { sfx('click'); onPhase(n, +b.dataset.i); }));
  // прокрутка к текущей фазе
  root.querySelector('.pl-stone.current')?.scrollIntoView({ block: 'center' });
}

export function closePlace() { root?.remove(); root = null; }
