// Геометрия мира в «мировых единицах»: высота экрана = 1000 единиц.
export const H = 1000;
export const W = 15600;     // главы 1 и 2 вместе с туманом осени
export const VW = 1800;     // типичная ширина экрана в единицах (для выравнивания слоёв)

export const ZONES = [
  // Глава 1 «Весна»
  { id: 'bamboo', x0: 0, x1: 1850, icon: '🎋', ch: 1 },
  { id: 'falls', x0: 1850, x1: 3300, icon: '💧', ch: 1 },
  { id: 'village', x0: 3300, x1: 4950, icon: '🏮', ch: 1 },
  { id: 'tea', x0: 4950, x1: 6450, icon: '🍵', ch: 1 },
  { id: 'gate', x0: 6450, x1: 7100, icon: '⛩', ch: 1 },
  // Глава 2 «Лето»
  { id: 'terraces', x0: 7100, x1: 8800, icon: '🌾', ch: 2 },
  { id: 'lake', x0: 8800, x1: 10400, icon: '🪷', ch: 2 },
  { id: 'market', x0: 10400, x1: 12100, icon: '🧺', ch: 2 },
  { id: 'monastery', x0: 12100, x1: 13700, icon: '🏯', ch: 2 },
  { id: 'sgate', x0: 13700, x1: 14400, icon: '🔥', ch: 2 },
  { id: 'fog', x0: 14400, x1: 15600, icon: '🌫', ch: 3 },
];
export const chapterAt = (x) => (ZONES.find((z) => x >= z.x0 && x < z.x1) || ZONES[ZONES.length - 1]).ch;

// Позиции камней-уровней на тропе
export const NODE_X = [560, 1240, 2350, 2980, 3620, 4250, 4800, 5420, 6020, 6760,
  7500, 8250, 9050, 9850, 10700, 11450, 12350, 13050, 13550, 14050];
// Начало главы 2 и туман следующей главы
export const CH2_X = 7100, FOG_X = 14400;
export const LAKE = { x0: 8900, x1: 10300 };
// Панды-NPC: книга, лавка, словарь
export const NPC_X = { book: 960, shop: 4020, dict: 5720 };

export const TEA = { x0: 5000, x1: 6400, floor: 830 };
export const RIVER = { x0: 2080, x1: 2620, bridge0: 2030, bridge1: 2670 };

// Позиция объекта слоя с параллаксом f так, чтобы он оказался над мировой точкой x
export const lx = (x, f) => x * f + (1 - f) * VW / 2;

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const baseY = (x) => 800 + 24 * Math.sin(x / 430) + 12 * Math.sin(x / 170 + 1.3);

export function groundY(x) {
  let y = baseY(x);
  const inTea = smooth(4880, 5000, x) * (1 - smooth(6400, 6520, x));
  y = y * (1 - inTea) + TEA.floor * inTea;
  const river = smooth(2000, 2110, x) * (1 - smooth(2590, 2700, x));
  return y * (1 - river) + 1000 * river;
}

// Настил подвесного моста
export function bridgeY(x) {
  const { bridge0: a, bridge1: b } = RIVER;
  const ya = baseY(a) - 4, yb = baseY(b) - 4;
  const t = (x - a) / (b - a);
  return ya + (yb - ya) * t + 46 * Math.sin(Math.PI * t);
}

export function walkY(x) {
  return x > RIVER.bridge0 + 20 && x < RIVER.bridge1 - 20 ? bridgeY(x) : groundY(x);
}

export function zoneAt(x) {
  return ZONES.find((z) => x >= z.x0 && x < z.x1) || ZONES[ZONES.length - 1];
}
