// Интерьеры мест (сцена 1600×900): пещера со светящейся рекой, дом мастера, тоннель в горе, сад с фонтаном, храм, библиотека.
// PATH — точки тропы для камней-фаз (в координатах сцены), до 6 фаз.
import { rng, rock, crystal, vine, moss, fernBush, glowE, radial, ROCK, ROCK_COOL } from './art.js';

const W = 1600, H = 900;
export const PATH = [[230, 700], [480, 610], [760, 690], [1010, 590], [1250, 680], [1430, 560]];

// Пещера: слои скал, сталактиты, светящаяся река, кристаллы, золотой проём в глубине
function cave(pal, accent, r) {
  let s = `<defs>${radial('icGlow', accent)}${radial('icGold', '#ffc65a')}
    <linearGradient id="icBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[3]}"/><stop offset="1" stop-color="#0c0a1e"/></linearGradient>
    <linearGradient id="icRiver" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${accent}" stop-opacity=".9"/><stop offset=".5" stop-color="#e8ffff" stop-opacity=".95"/><stop offset="1" stop-color="${accent}" stop-opacity=".9"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#icBg)"/>`;
  // золотой проём в глубине
  s += glowE(1180, 330, 260, 220, 'icGold', 0.8) + `<path d="M1100,520 V300 Q1180,200 1260,300 V520Z" fill="#ffd27a"/><path d="M1130,520 V310 Q1180,240 1230,310 V520Z" fill="#fff2c0" opacity=".7"/>`;
  // дальняя стена — крупные глыбы
  for (let x = -60; x < W + 80; x += 140 + r() * 60) s += rock(x, 160 + r() * 140, 120 + r() * 60, 150 + r() * 80, r, pal);
  // ниши со светом между глыбами
  for (const x of [300, 640, 1460]) s += glowE(x, 360, 120, 90, 'icGlow', 0.5);
  // сталактиты
  for (let x = 0; x < W; x += 40 + r() * 50) { const h = 60 + r() * 140; s += `<path d="M${x - 18},0 L${x},${h} L${x + 18},0Z" fill="${pal[2]}"/><path d="M${x - 4},0 L${x},${h} L${x + 6},0Z" fill="${pal[0]}" opacity=".35"/>`; }
  // пол
  s += `<path d="M0,560 Q300,500 600,560 Q900,620 1200,540 Q1420,490 1600,540 V900 H0Z" fill="${pal[2]}"/>`;
  // светящаяся река
  s += glowE(800, 790, 900, 120, 'icGlow', 0.6);
  s += `<path d="M0,770 Q260,720 520,770 Q820,830 1100,760 Q1350,700 1600,750 V860 Q1350,820 1100,860 Q820,900 520,850 Q260,810 0,860Z" fill="url(#icRiver)" opacity=".85"/>`;
  for (let i = 0; i < 40; i++) { const x = r() * W, y = 770 + r() * 80; s += `<path d="M${x.toFixed(0)},${y.toFixed(0)} h${(20 + r() * 60).toFixed(0)}" stroke="#fff" stroke-width="2" opacity="${(0.3 + r() * 0.5).toFixed(2)}"/>`; }
  // кристаллы и глыбы переднего плана
  for (const [x, y, h] of [[90, 640, 70], [380, 560, 50], [600, 610, 40], [910, 560, 60], [1380, 600, 80], [1540, 700, 60]]) s += crystal(x, y, h, accent, r);
  for (const [x, y, rx, ry] of [[40, 880, 120, 70], [1560, 880, 110, 80], [700, 900, 90, 40]]) s += rock(x, y, rx, ry, r, pal);
  for (const x of [200, 520, 1300]) s += vine(x, 0, 140 + r() * 120, r);
  return s;
}

// Дом мастера: стена из досок, балки, окна-сёдзи с луной и бамбуком, полки со свитками, фонари, татами, низкий стол с чаем
function house(r, { red = false, books = false } = {}) {
  const wall = red ? ['#6a1d14', '#4a120c'] : ['#7a4e2a', '#5a3820'];
  let s = `<defs>${radial('ihLamp', '#ffb347')}${radial('ihMoon', '#f6e7b0')}
    <linearGradient id="ihWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${wall[1]}"/><stop offset="1" stop-color="${wall[0]}"/></linearGradient>
    <linearGradient id="ihFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b47a"/><stop offset="1" stop-color="#8a7448"/></linearGradient></defs>
    <rect width="${W}" height="600" fill="url(#ihWall)"/>`;
  for (let x = 0; x < W; x += 46) s += `<rect x="${x}" y="0" width="3" height="600" fill="#000" opacity=".18"/>`;
  for (const x of [0, 400, 800, 1200, 1580]) s += `<rect x="${x}" y="0" width="22" height="600" fill="#2a180c"/>`;
  s += `<rect y="70" width="${W}" height="22" fill="#2a180c"/>`;
  // окна-сёдзи с луной и силуэтами бамбука
  for (const x of [470, 1270]) {
    s += `<rect x="${x}" y="150" width="240" height="250" fill="#1b2450"/>` + glowE(x + 160, 220, 120, 120, 'ihMoon', 0.7) + `<circle cx="${x + 160}" cy="220" r="34" fill="#f6e7b0"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${x + 20 + i * 44}" y="${180 + (i % 3) * 20}" width="6" height="${220 - (i % 3) * 20}" fill="#0c1430"/><path d="M${x + 23 + i * 44},${200 + i * 10} q30,-12 40,6" stroke="#0c1430" stroke-width="5" fill="none"/>`;
    for (let i = 1; i < 4; i++) s += `<path d="M${x + i * 60},150 V400 M${x},${150 + i * 62} H${x + 240}" stroke="#3a2414" stroke-width="7"/>`;
    s += `<rect x="${x - 8}" y="142" width="256" height="266" fill="none" stroke="#2a180c" stroke-width="14"/>`;
  }
  // полки со свитками и книгами
  for (const [x, y] of [[60, 200], [60, 330], [880, 230], [880, 360]]) {
    s += `<rect x="${x}" y="${y}" width="300" height="12" fill="#3a2414"/>`;
    for (let i = 0; i < 9; i++) {
      const c = ['#a3301e', '#2f6a4a', '#d9a43a', '#3a5a8a', '#efdcb0', '#8a3a6a'][Math.floor(r() * 6)];
      s += books || r() < 0.5 ? `<rect x="${x + 10 + i * 32}" y="${y - 60 + (i % 3) * 8}" width="22" height="${60 - (i % 3) * 8}" fill="${c}"/>` : `<rect x="${x + 10 + i * 32}" y="${y - 22}" width="28" height="20" rx="10" fill="#efdcb0" stroke="#8a6a32" stroke-width="2"/>`;
    }
  }
  // свиток-каллиграфия
  s += `<rect x="1060" y="410" width="10" height="10" fill="#3a2414"/><rect x="1010" y="420" width="110" height="160" fill="#efdcb0"/><text x="1065" y="520" font-size="80" text-anchor="middle" fill="#2a1c14" font-family="serif">學</text>`;
  // пол-татами
  s += `<path d="M0,600 H${W} V900 H0Z" fill="url(#ihFloor)"/>`;
  for (let x = -200; x < W + 200; x += 260) s += `<path d="M${x},600 L${x - 120},900" stroke="#6a5a34" stroke-width="5"/>`;
  s += `<path d="M0,740 H${W}" stroke="#6a5a34" stroke-width="5"/>`;
  // низкий стол с чайником
  s += `<ellipse cx="800" cy="860" rx="210" ry="26" fill="#000" opacity=".25"/><rect x="600" y="790" width="400" height="22" rx="6" fill="#5a3418"/><rect x="630" y="812" width="22" height="50" fill="#3a2010"/><rect x="948" y="812" width="22" height="50" fill="#3a2010"/>
    <ellipse cx="760" cy="780" rx="40" ry="26" fill="#3a6a5a"/><path d="M800,772 q24,-6 28,-20" stroke="#3a6a5a" stroke-width="8" fill="none"/><ellipse cx="860" cy="784" rx="16" ry="8" fill="#efe6d0"/><ellipse cx="900" cy="784" rx="16" ry="8" fill="#efe6d0"/>`;
  // фонари под потолком
  for (const x of [250, 800, 1360]) s += glowE(x, 180, 170, 150, 'ihLamp', 0.55) + `<path d="M${x},92 V130" stroke="#2a180c" stroke-width="3"/><ellipse cx="${x}" cy="168" rx="28" ry="36" fill="#d8402e"/><ellipse cx="${x}" cy="168" rx="14" ry="24" fill="#ffb347" opacity=".75"/><rect x="${x - 16}" y="128" width="32" height="8" fill="#d9a43a"/><rect x="${x - 16}" y="200" width="32" height="8" fill="#d9a43a"/>`;
  // растения в горшках
  for (const x of [120, 1500]) s += `<path d="M${x - 40},900 h80 l-12,-70 h-56Z" fill="#6a4424"/>` + fernBush(x, 832, 2.2, r);
  return s;
}

// Сад с фонтаном знаний: небо, стены сада, фонтан, вишни, пруд
function garden(r) {
  let s = `<defs>${radial('igSun', '#fff4c0')}<linearGradient id="igSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8cc8e8"/><stop offset="1" stop-color="#e6f4f0"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#igSky)"/>` + glowE(1300, 150, 260, 200, 'igSun', 0.9);
  for (let x = -60; x < W + 60; x += 160) s += rock(x, 470, 130, 80, r, ['#a8c8a0', '#7aa86a', '#4f7a42', '#3a5a32']);
  s += `<rect y="480" width="${W}" height="420" fill="#8ab86a"/><path d="M0,480 H${W}" stroke="#c8b48a" stroke-width="20"/>`;
  s += `<ellipse cx="800" cy="640" rx="320" ry="70" fill="#cfd8dc"/><ellipse cx="800" cy="630" rx="290" ry="56" fill="#5ab0d0"/><rect x="780" y="420" width="40" height="210" fill="#cfd8dc"/><ellipse cx="800" cy="420" rx="110" ry="24" fill="#cfd8dc"/>
    <path d="M800,410 Q740,300 700,430 M800,410 Q860,300 900,430 M800,410 V300" stroke="#e6f8ff" stroke-width="10" fill="none" opacity=".9"/>`;
  for (const [x, y] of [[180, 470], [1420, 470], [320, 820], [1300, 840]]) { s += `<rect x="${x - 8}" y="${y - 40}" width="16" height="80" fill="#6a4424"/>`; for (let i = 0; i < 14; i++) s += `<circle cx="${(x + (r() - 0.5) * 160).toFixed(0)}" cy="${(y - 70 + (r() - 0.5) * 90).toFixed(0)}" r="${(20 + r() * 20).toFixed(0)}" fill="${r() < 0.5 ? '#f4b8c8' : '#e88aa8'}" opacity=".9"/>`; }
  s += moss(0, 900, W, r, 0.5);
  return s;
}

export function interior(type) {
  const r = rng(type.length * 97 + 13);
  if (type === 'house') return house(r);
  if (type === 'temple') return house(r, { red: true });
  if (type === 'library') return house(r, { books: true });
  if (type === 'fountain') return garden(r);
  if (type === 'mountain') return cave(['#c8a888', '#8a6a4a', '#4a3424', '#22160c'], '#ffb347', r);
  return cave(ROCK_COOL, '#4ae0f0', r);
}
