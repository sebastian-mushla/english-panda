// Входы в места больших тем прямо в ландшафте: дверь дома, пасть пещеры в скале, тоннель в горе,
// ступени вниз к фонтану, ворота храма, башня-библиотека. Поле 260×240, низ рисунка (y = 240) — земля у тропы.
// Проём входа (класс .door) светится, когда тема открыта, и закрыт решёткой, когда закрыта.
import { rng, rock, moss, vine, fernBush, crystal, ROCK } from './art.js';

// Пещера: каменная арка из глыб, тёмная глубина с бликом, мох и лианы сверху, папоротник у входа
function caveArt() {
  const r = rng(7);
  let s = `<path d="M70,240 Q60,200 80,180 L180,180 Q200,200 190,240Z" fill="#c9b48a"/>`;
  // глыбы, образующие холм
  for (const [x, y, rx, ry] of [[40, 200, 46, 44], [222, 204, 44, 40], [58, 140, 42, 46], [206, 138, 46, 50], [100, 92, 50, 38], [166, 88, 50, 40], [132, 64, 44, 30]]) s += rock(x, y, rx, ry, r);
  // проём: глубина и тёмное нутро
  s += `<path class="mouth" d="M82,236 Q74,150 130,118 Q188,150 180,236Z" fill="url(#entDeep)"/>`;
  s += `<path class="door" d="M100,236 Q98,170 130,148 Q162,170 160,236Z"/>`;
  s += `<path d="M86,150 l6,18 l5,-12 l4,16 M168,152 l-5,16 l-4,-12" stroke="#d9dccf" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  // мох по верху, лианы с края арки
  s += moss(60, 66, 150, r, 1.4) + moss(10, 118, 50, r) + moss(196, 112, 56, r);
  for (const x of [96, 112, 150, 170]) s += vine(x, 120 + (x % 7), 40 + r() * 40, r);
  s += fernBush(30, 240, 0.9, r) + fernBush(236, 240, 0.8, r) + fernBush(70, 240, 0.55, r);
  s += crystal(196, 236, 22, '#7ae0ee', r);
  return s;
}

// Дом мастера: каменный цоколь, деревянные стены, черепичная крыша в два яруса, светящиеся сёдзи, фонари, ступени
function houseArt() {
  const r = rng(11);
  let s = `<rect x="14" y="214" width="232" height="26" rx="3" fill="#8a8678"/>`;
  for (let x = 18; x < 244; x += 26) s += `<rect x="${x}" y="218" width="22" height="9" rx="2" fill="#a29e8e"/><rect x="${x + 11}" y="229" width="22" height="9" rx="2" fill="#7a7668"/>`;
  s += `<rect x="24" y="122" width="212" height="94" fill="url(#entWood)"/>`;
  for (const x of [24, 74, 186, 230]) s += `<rect x="${x}" y="120" width="8" height="96" fill="#3a2414"/>`;
  s += `<rect x="24" y="166" width="212" height="6" fill="#3a2414"/>`;
  // окна-сёдзи
  for (const x of [36, 194]) { s += `<rect x="${x}" y="132" width="32" height="30" fill="#ffe2a0"/>`; for (let i = 1; i < 3; i++) s += `<path d="M${x + i * 11},132 V162 M${x},${132 + i * 10} H${x + 32}" stroke="#5a3820" stroke-width="2"/>`; }
  // дверь-проём и ступени
  s += `<path class="door" d="M96,214 V140 H164 V214Z"/>`;
  for (let i = 0; i < 4; i++) s += `<path d="M96,${150 + i * 16} H164 M${107 + i * 16},140 V214" stroke="#5a3820" stroke-width="2" opacity=".55"/>`;
  s += `<rect x="90" y="134" width="80" height="8" fill="#3a2414"/>`;
  s += `<rect x="84" y="214" width="92" height="9" fill="#bab4a4"/><rect x="92" y="223" width="76" height="9" fill="#a8a292"/><rect x="100" y="232" width="60" height="8" fill="#969080"/>`;
  // крыша: нижний ярус с черепицей и загнутыми углами
  const roofs = [[118, 140, 26, 8], [74, 96, 22, -40]];
  for (const [y, hw, h, dx] of roofs) {
    const d = `M${130 - hw - 18},${y} Q${130 - hw},${y - 4} ${130 - hw + 14},${y - h} L${130 + hw - 14},${y - h} Q${130 + hw},${y - 4} ${130 + hw + 18},${y} Q130,${y + 10} ${130 - hw - 18},${y}Z`;
    s += `<path d="${d}" fill="#3a3a44"/>`;
    for (let x = 130 - hw + 6; x < 130 + hw - 2; x += 8) s += `<path d="M${x},${y - h + 2} V${y + 2}" stroke="#23232b" stroke-width="3"/>`;
    s += `<path d="M${130 - hw - 18},${y} Q130,${y + 10} ${130 + hw + 18},${y}" stroke="#1a1a20" stroke-width="5" fill="none"/>`;
  }
  s += `<rect x="82" y="96" width="96" height="22" fill="url(#entWood)"/><rect x="104" y="98" width="52" height="18" rx="2" fill="#efdcb0" stroke="#8a3a22" stroke-width="2"/><text x="130" y="113" text-anchor="middle" font-size="15" fill="#8a3a22" font-family="serif">師</text>`;
  s += `<path d="M120,52 Q130,40 140,52" stroke="#d9a43a" stroke-width="5" fill="none"/>`;
  // фонари
  for (const x of [58, 202]) s += `<path d="M${x},122 V130" stroke="#3a2414" stroke-width="2"/><ellipse cx="${x}" cy="141" rx="10" ry="12" fill="#d8402e"/><ellipse cx="${x}" cy="141" rx="5" ry="8" fill="#ffb347" opacity=".7"/><ellipse cx="${x}" cy="141" rx="30" ry="30" fill="#ff9a3c" opacity=".12"/>`;
  // бамбук в горшках и кусты
  for (const x of [8, 252]) { s += `<path d="M${x - 8},240 h16 l-3,-16 h-10Z" fill="#6a4424"/>`; for (let i = 0; i < 3; i++) s += `<rect x="${x - 5 + i * 4}" y="${150 + i * 14}" width="3" height="${76 - i * 14}" fill="#7aa83a"/>`; }
  s += moss(16, 212, 60, r, 0.7) + moss(184, 212, 60, r, 0.7);
  return s;
}

export const ENTRANCE = {
  house: houseArt(),
  cave: caveArt(),
  mountain: `<path d="M0,240 L70,60 L110,100 L150,20 L260,240Z" fill="url(#entRock)"/><path d="M150,20 L176,74 L160,66 L146,82 L132,58Z" fill="#f2f6fa"/>
    <path d="M70,60 L86,98 L74,92 L62,104Z" fill="#f2f6fa"/>
    <path d="M84,240 V176 Q84,140 130,140 Q176,140 176,176 V240Z" fill="#6a5a48"/>
    <path class="door" d="M96,240 V178 Q96,152 130,152 Q164,152 164,178 V240Z"/>
    ${[96, 113, 130, 147, 164].map((x, i) => `<rect x="${x - 8}" y="${136 + Math.abs(i - 2) * 6}" width="14" height="14" fill="#7a6a56" stroke="#4a3e30" stroke-width="2"/>`).join('')}
    <rect x="62" y="178" width="6" height="40" fill="#5a3a1e"/><circle cx="65" cy="172" r="8" fill="#ffb347"/><rect x="192" y="178" width="6" height="40" fill="#5a3a1e"/><circle cx="195" cy="172" r="8" fill="#ffb347"/>`,
  fountain: `<ellipse cx="130" cy="222" rx="126" ry="18" fill="#8a9a8a"/><path d="M10,222 Q130,250 250,222 V240 H10Z" fill="#6a7a6a"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${78 + i * 8}" y="${170 + i * 14}" width="${104 - i * 16}" height="12" rx="2" fill="${['#d6d0c0', '#c8c2b2', '#bab4a4', '#aca696'][i]}"/>`).join('')}
    <path class="door" d="M96,170 V132 Q130,108 164,132 V170Z"/><path d="M90,172 V130 Q130,98 170,130 V172" stroke="#c8c2b2" stroke-width="10" fill="none"/>
    <ellipse cx="130" cy="96" rx="34" ry="9" fill="#cfd8dc"/><rect x="124" y="70" width="12" height="28" fill="#cfd8dc"/>
    <path d="M130,70 Q112,40 100,90 M130,70 Q148,40 160,90 M130,70 V36" stroke="#9fe0f6" stroke-width="4" fill="none"/>
    <circle cx="36" cy="204" r="18" fill="#e88aa8" opacity=".85"/><circle cx="226" cy="204" r="18" fill="#e88aa8" opacity=".85"/>`,
  temple: `<rect x="34" y="96" width="18" height="144" fill="#a3301e"/><rect x="208" y="96" width="18" height="144" fill="#a3301e"/>
    <path d="M6,96 Q130,66 254,96 V112 H6Z" fill="#2a2a2a"/><rect x="20" y="118" width="220" height="12" fill="#a3301e"/>
    <path class="door" d="M60,240 V136 H200 V240Z"/><rect x="100" y="84" width="60" height="24" fill="#efdcb0" stroke="#8a3a22" stroke-width="3"/><text x="130" y="103" text-anchor="middle" font-size="18" fill="#8a3a22" font-family="serif">道</text>
    <rect x="24" y="226" width="212" height="14" fill="#8a8678"/>`,
  library: `<rect x="70" y="40" width="120" height="200" fill="#7a5a3a"/><path d="M58,46 L130,0 L202,46Z" fill="#3a2a22"/>
    ${[70, 110].map((y) => `<rect x="86" y="${y}" width="22" height="28" fill="#ffd98a" opacity=".85"/><rect x="152" y="${y}" width="22" height="28" fill="#ffd98a" opacity=".85"/>`).join('')}
    <path class="door" d="M108,240 V176 Q130,156 152,176 V240Z"/><rect x="104" y="150" width="52" height="18" fill="#efdcb0" stroke="#8a3a22" stroke-width="2"/><text x="130" y="164" text-anchor="middle" font-size="14" fill="#8a3a22" font-family="serif">書</text>`,
};

// Общие градиенты рисунков входов
export const ENTRANCE_DEFS = `<defs>
  <linearGradient id="entWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a683c"/><stop offset="1" stop-color="#6a4226"/></linearGradient>
  <radialGradient id="entDeep" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#3a3428"/><stop offset=".6" stop-color="#14110c"/><stop offset="1" stop-color="#0a0806"/></radialGradient>
  <linearGradient id="entRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa4a8"/><stop offset=".6" stop-color="#6c767c"/><stop offset="1" stop-color="#4a5258"/></linearGradient>
</defs>`;
