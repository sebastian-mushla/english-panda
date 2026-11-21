// Кисти для детальных рисунков мест: скалы со светом и тенью, мох, папоротник, лианы, кристаллы, свечение.
// Всё — обычный SVG без фильтров (фильтры и blend-режимы роняли частоту кадров на телефонах).
export function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const P = (n) => Math.round(n * 10) / 10;

// Неровный камень: многоугольник с «шумом» по краю
function blob(cx, cy, rx, ry, r, n = 12, jit = 0.18) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = 1 + (r() - 0.5) * 2 * jit;
    d += `${i ? 'L' : 'M'}${P(cx + Math.cos(a) * rx * k)},${P(cy + Math.sin(a) * ry * k)}`;
  }
  return d + 'Z';
}

// Каменная глыба: основа, освещённый верх-лево, тень снизу-справа, трещины
export function rock(cx, cy, rx, ry, r, pal = ROCK) {
  const d = blob(cx, cy, rx, ry, r);
  let s = `<path d="${d}" fill="${pal[1]}"/>`;
  s += `<path d="${blob(cx - rx * 0.18, cy - ry * 0.22, rx * 0.72, ry * 0.6, r, 10, 0.12)}" fill="${pal[0]}" opacity=".85"/>`;
  s += `<path d="${blob(cx + rx * 0.22, cy + ry * 0.3, rx * 0.7, ry * 0.5, r, 10, 0.12)}" fill="${pal[2]}" opacity=".7"/>`;
  for (let i = 0; i < 2; i++) {
    const x = cx + (r() - 0.5) * rx, y = cy + (r() - 0.6) * ry * 0.8;
    s += `<path d="M${P(x)},${P(y)} l${P(r() * 14 - 7)},${P(8 + r() * 12)} l${P(r() * 12 - 6)},${P(6 + r() * 10)}" stroke="${pal[3]}" stroke-width="2" fill="none" opacity=".6"/>`;
  }
  return s;
}
export const ROCK = ['#d9dccf', '#a8ad9e', '#6f7566', '#4a5044'];
export const ROCK_COOL = ['#b9a8e8', '#6d5ab8', '#3a2c78', '#22184a'];

// Подушка мха: много кругов трёх оттенков
export function moss(x, y, w, r, dense = 1) {
  let s = '';
  const cols = ['#4f7a2a', '#6f9a34', '#9cc24a'];
  for (let i = 0; i < Math.round(w / 7 * dense); i++) {
    const px = x + r() * w, py = y + (r() - 0.5) * 10, rad = 4 + r() * 8;
    s += `<circle cx="${P(px)}" cy="${P(py)}" r="${P(rad)}" fill="${cols[Math.floor(r() * 3)]}"/>`;
  }
  for (let i = 0; i < w / 18; i++) s += `<circle cx="${P(x + r() * w)}" cy="${P(y - 4 + r() * 6)}" r="${P(2 + r() * 3)}" fill="#c8e070" opacity=".8"/>`;
  return s;
}

// Свисающая лиана с листочками
export function vine(x, y, len, r) {
  let d = `M${P(x)},${P(y)}`, s = '', cx = x;
  for (let t = 0; t < len; t += 12) { cx += (r() - 0.5) * 6; d += ` L${P(cx)},${P(y + t)}`; if (r() < 0.7) s += `<ellipse cx="${P(cx + (r() < 0.5 ? -5 : 5))}" cy="${P(y + t)}" rx="5" ry="2.6" fill="#6f9a34" transform="rotate(${Math.round(r() * 60 - 30)} ${P(cx)} ${P(y + t)})"/>`; }
  return `<path d="${d}" stroke="#4f7a2a" stroke-width="2" fill="none"/>` + s;
}

// Лист папоротника: стебель и пары листочков
export function fern(x, y, len, ang, r) {
  const rad = (ang * Math.PI) / 180, ex = x + Math.cos(rad) * len, ey = y + Math.sin(rad) * len;
  let s = `<path d="M${P(x)},${P(y)} Q${P((x + ex) / 2 - Math.sin(rad) * 10)},${P((y + ey) / 2 + Math.cos(rad) * 10)} ${P(ex)},${P(ey)}" stroke="#3f6a24" stroke-width="2.2" fill="none"/>`;
  for (let t = 0.15; t < 1; t += 0.11) {
    const px = x + (ex - x) * t, py = y + (ey - y) * t, l = (1 - t) * len * 0.32 + 3;
    for (const side of [-1, 1]) {
      const a = rad + side * 1.1;
      s += `<path d="M${P(px)},${P(py)} q${P(Math.cos(a) * l * 0.5)},${P(Math.sin(a) * l * 0.5 - 2)} ${P(Math.cos(a) * l)},${P(Math.sin(a) * l)}" stroke="${r() < 0.5 ? '#5a8a2c' : '#78a83a'}" stroke-width="3.2" stroke-linecap="round" fill="none"/>`;
    }
  }
  return s;
}
export const fernBush = (x, y, s, r) => [-150, -120, -95, -70, -40].map((a) => fern(x, y, (40 + r() * 20) * s, a + (r() - 0.5) * 12, r)).join('');

// Светящийся кристалл: грани и ореол
export function crystal(x, y, h, col, r) {
  const w = h * 0.32;
  return `<ellipse cx="${P(x)}" cy="${P(y - h * 0.4)}" rx="${P(h * 0.9)}" ry="${P(h * 0.7)}" fill="${col}" opacity=".16"/>
    <path d="M${P(x - w)},${P(y)} L${P(x - w * 0.6)},${P(y - h * 0.7)} L${P(x)},${P(y - h)} L${P(x + w * 0.6)},${P(y - h * 0.68)} L${P(x + w)},${P(y)}Z" fill="${col}"/>
    <path d="M${P(x)},${P(y - h)} L${P(x + w * 0.6)},${P(y - h * 0.68)} L${P(x + w)},${P(y)} L${P(x)},${P(y)}Z" fill="#fff" opacity=".28"/>
    <path d="M${P(x - w * 0.6)},${P(y - h * 0.7)} L${P(x)},${P(y - h)} L${P(x)},${P(y)}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>`;
}

// Мягкое свечение (радиальный градиент по id)
export const glowE = (x, y, rx, ry, id, op = 1) => `<ellipse cx="${P(x)}" cy="${P(y)}" rx="${P(rx)}" ry="${P(ry)}" fill="url(#${id})" opacity="${op}"/>`;
export const radial = (id, c, mid = 0.4) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity=".95"/><stop offset="${mid}" stop-color="${c}" stop-opacity=".4"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
