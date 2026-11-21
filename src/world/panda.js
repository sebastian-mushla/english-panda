// Пандочка в SVG (поле 120×140). Наряды: шляпа, одежда, предмет в лапе.
const ROBES = {
  red: ['#c23a2b', '#f2c14e'], jade: ['#2f8a63', '#e9d9a6'], night: ['#283a7a', '#c9d4ff'],
  gold: ['#e0a92a', '#8a2a1f'], monk: ['#e07a1f', '#7a2e12'], ink: ['#2b2b33', '#c23a2b'],
};

function hat(id) {
  switch (id) {
    case 'straw': return `<path d="M14,42 L60,6 L106,42 Q60,52 14,42Z" fill="#d9b66b" stroke="#8a6a32" stroke-width="2"/>
      <path d="M37,24 L60,40 M83,24 L60,40 M60,6 L60,46" stroke="#a9853f" stroke-width="1.4" fill="none"/>`;
    case 'band': return `<path d="M27,38 Q60,26 93,38 L93,46 Q60,34 27,46Z" fill="#c8322a"/>
      <path d="M92,40 q10,4 14,16 M92,44 q6,8 6,20" stroke="#c8322a" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    case 'scholar': return `<path d="M36,30 Q60,8 84,30 L84,36 L36,36Z" fill="#1d1d24"/>
      <rect x="14" y="27" width="22" height="6" rx="3" fill="#1d1d24"/><rect x="84" y="27" width="22" height="6" rx="3" fill="#1d1d24"/>
      <rect x="54" y="18" width="12" height="5" rx="2" fill="#f2c14e"/>`;
    case 'lotus': return `<g fill="#f4a6c0" stroke="#c45a80" stroke-width="1.2">
      <path d="M60,8 Q68,22 60,34 Q52,22 60,8Z"/><path d="M44,16 Q58,22 58,34 Q44,30 44,16Z"/><path d="M76,16 Q62,22 62,34 Q76,30 76,16Z"/></g>
      <ellipse cx="60" cy="34" rx="16" ry="4" fill="#6fbf5a"/>`;
    case 'fox': return `<g transform="translate(80 18) rotate(18)"><path d="M0,10 L4,-6 L12,4 L20,-6 L24,10 Q12,26 0,10Z" fill="#f08a3c" stroke="#7a3a12" stroke-width="1.5"/>
      <path d="M4,10 Q12,18 20,10 Q12,22 4,10Z" fill="#fff"/><circle cx="8" cy="8" r="1.6" fill="#222"/><circle cx="16" cy="8" r="1.6" fill="#222"/></g>`;
    default: return '';
  }
}

function robe(id) {
  const c = ROBES[id];
  if (!c) return '';
  return `<path d="M30,84 Q60,66 90,84 L96,118 Q60,132 24,118Z" fill="${c[0]}"/>
    <path d="M48,72 L60,92 L72,72" fill="none" stroke="${c[1]}" stroke-width="4"/>
    <rect x="28" y="100" width="64" height="7" rx="3" fill="${c[1]}"/>
    ${id === 'night' ? '<g fill="#fff" opacity=".8"><circle cx="40" cy="114" r="1.6"/><circle cx="76" cy="90" r="1.3"/><circle cx="66" cy="118" r="1.5"/></g>' : ''}`;
}

function item(id) {
  switch (id) {
    case 'staff': return `<rect x="99" y="34" width="6" height="104" rx="3" fill="#b88a3e" stroke="#6b4a1c" stroke-width="1.2"/>
      <path d="M99,60 h6 M99,88 h6 M99,116 h6" stroke="#6b4a1c" stroke-width="2"/>`;
    case 'lantern': return `<path d="M100,100 L104,112" stroke="#3a2a1a" stroke-width="2"/><rect x="98" y="110" width="12" height="3" fill="#d9a43a"/>
      <ellipse cx="104" cy="122" rx="10" ry="11" fill="#d8402e" stroke="#7a1d14" stroke-width="1.4"/>
      <rect x="98" y="131" width="12" height="3" fill="#d9a43a"/><ellipse cx="104" cy="122" rx="5" ry="7" fill="#ffb347" opacity=".55"/>`;
    case 'umbrella': return `<path d="M100,104 L100,24" stroke="#5a3a1a" stroke-width="3"/>
      <path d="M62,40 Q100,-2 138,40 Q119,32 100,40 Q81,32 62,40Z" fill="#d03a2c" stroke="#7a1d14" stroke-width="1.5"/>
      <path d="M100,12 L81,38 M100,12 L119,38" stroke="#f2c14e" stroke-width="1.2" opacity=".8"/>`;
    case 'scroll': return `<rect x="92" y="94" width="22" height="12" rx="3" fill="#efdcb0" stroke="#8a6a32" stroke-width="1.5"/>
      <rect x="90" y="92" width="4" height="16" rx="2" fill="#8a3a22"/><rect x="112" y="92" width="4" height="16" rx="2" fill="#8a3a22"/>`;
    case 'fan': return `<path d="M100,104 L84,78 Q100,68 116,78Z" fill="#f4e3c0" stroke="#8a2a1f" stroke-width="1.5"/>
      <path d="M100,104 L92,74 M100,104 L100,72 M100,104 L108,74" stroke="#c23a2b" stroke-width="1"/>`;
    case 'basket': return `<path d="M88,100 Q104,84 120,100" fill="none" stroke="#8a6a32" stroke-width="3"/>
      <path d="M86,100 L122,100 L116,124 L92,124Z" fill="#c99a52" stroke="#7a5a26" stroke-width="1.5"/>
      <circle cx="98" cy="98" r="5" fill="#e07a1f"/><circle cx="108" cy="97" r="5" fill="#e07a1f"/>`;
    case 'bamboo': return `<rect x="98" y="40" width="7" height="72" rx="3" fill="#7fb069" stroke="#4b7d43" stroke-width="1.2"/>
      <path d="M105,58 q14,-6 22,-2 q-12,6 -22,2Z M98,72 q-12,-8 -20,-4 q10,8 20,4Z" fill="#6fbf5a"/>`;
    case 'broom': return `<rect x="100" y="40" width="5" height="80" fill="#a8783a"/><path d="M92,118 L113,118 L118,138 L87,138Z" fill="#d9b66b" stroke="#8a6a32"/>`;
    case 'book': return `<rect x="88" y="92" width="28" height="22" rx="2" fill="#7a2e1f" stroke="#3a140c" stroke-width="1.5"/>
      <rect x="92" y="95" width="20" height="16" fill="#efdcb0"/><path d="M102,95 V111" stroke="#7a2e1f" stroke-width="1.5"/>`;
    case 'teacup': return `<path d="M94,100 h18 l-3,12 h-12Z" fill="#f4f1ea" stroke="#2f5bb0" stroke-width="1.5"/>
      <path d="M100,96 q2,-6 0,-10 M106,96 q2,-6 0,-10" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/>`;
    default: return '';
  }
}

// Градиенты меха: подключаются один раз в каждый SVG, где есть панды
export const PANDA_DEFS = `<radialGradient id="pdFur" cx=".42" cy=".3" r=".78"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f3eee2"/><stop offset="1" stop-color="#d6ccb9"/></radialGradient>
  <radialGradient id="pdDark" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#55505c"/><stop offset=".5" stop-color="#26232c"/><stop offset="1" stop-color="#121116"/></radialGradient>
  <radialGradient id="pdEye" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#c98a44"/><stop offset=".6" stop-color="#5e3416"/><stop offset="1" stop-color="#2a160a"/></radialGradient>`;

const patch = (x) => `M${x - 12},50 C${x - 21},56 ${x - 17},73 ${x - 6},71 C${x + 3},69 ${x + 5},56 ${x},51 C${x - 3},47 ${x - 9},47 ${x - 12},50Z`;
const eye = (x, d) => `<ellipse cx="${x}" cy="59" rx="5.4" ry="6" fill="#fff"/><circle cx="${x + d}" cy="59.6" r="4.4" fill="url(#pdEye)"/>
  <circle cx="${x + d}" cy="59.8" r="2.3" fill="#0d0a08"/><circle cx="${x + d - 1.7}" cy="57.6" r="1.6" fill="#fff"/><circle cx="${x + d + 1.4}" cy="61.6" r=".8" fill="#fff" opacity=".8"/>`;

// Содержимое <g> для вставки в любой SVG
export function pandaG({ hat: h = 'none', robe: r = 'none', item: it = 'none' } = {}) {
  const back = it === 'umbrella' || it === 'staff' || it === 'broom' || it === 'bamboo' ? item(it) : '';
  const front = back ? '' : item(it);
  return `<ellipse cx="60" cy="134" rx="34" ry="5.5" fill="#000" opacity=".25"/>
    ${back}
    <ellipse cx="43" cy="123" rx="14" ry="11" fill="url(#pdDark)"/><ellipse cx="77" cy="123" rx="14" ry="11" fill="url(#pdDark)"/>
    <ellipse cx="42" cy="127" rx="6" ry="3.5" fill="#6a5a62" opacity=".7"/><ellipse cx="78" cy="127" rx="6" ry="3.5" fill="#6a5a62" opacity=".7"/>
    <ellipse cx="60" cy="98" rx="35" ry="31" fill="url(#pdFur)" stroke="#2a2522" stroke-width="1.6"/>
    <ellipse cx="60" cy="110" rx="22" ry="14" fill="#e6dccb" opacity=".55"/>
    ${robe(r)}
    <ellipse cx="28" cy="95" rx="11.5" ry="18.5" transform="rotate(24 28 95)" fill="url(#pdDark)"/>
    <ellipse cx="92" cy="95" rx="11.5" ry="18.5" transform="rotate(-24 92 95)" fill="url(#pdDark)"/>
    <circle cx="34" cy="31" r="12.5" fill="url(#pdDark)"/><circle cx="86" cy="31" r="12.5" fill="url(#pdDark)"/>
    <circle cx="35" cy="32" r="6" fill="#4a3f48"/><circle cx="85" cy="32" r="6" fill="#4a3f48"/>
    <ellipse cx="60" cy="57" rx="36" ry="31" fill="url(#pdFur)" stroke="#2a2522" stroke-width="1.6"/>
    <ellipse cx="49" cy="39" rx="15" ry="6.5" fill="#fff" opacity=".55"/>
    <path d="${patch(48)}" fill="url(#pdDark)"/><path d="${patch(48)}" transform="translate(120 0) scale(-1 1)" fill="url(#pdDark)"/>
    ${eye(45, 0.8)}${eye(75, -0.8)}
    <path d="M54,66.5 Q60,63.5 66,66.5 Q63.5,72 60,72 Q56.5,72 54,66.5Z" fill="#1a1719"/><ellipse cx="58.5" cy="66.4" rx="2.4" ry="1.1" fill="#fff" opacity=".45"/>
    <path d="M60,72 v2 M55,74.2 Q57.5,77.4 60,74.6 Q62.5,77.4 65,74.2" stroke="#1a1719" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="71" rx="6" ry="4" fill="#f49a9a" opacity=".38"/><ellipse cx="84" cy="71" rx="6" ry="4" fill="#f49a9a" opacity=".38"/>
    ${hat(h)}
    ${front}`;
}

export function pandaSVG(opts, cls = '') {
  return `<svg class="panda ${cls}" viewBox="0 0 140 142" aria-hidden="true"><defs>${PANDA_DEFS}</defs>${pandaG(opts)}</svg>`;
}
