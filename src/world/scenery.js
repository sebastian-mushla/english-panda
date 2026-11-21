// Рисует слои мира в SVG-строки в «живописном» стиле: градиенты, освещённые грани, дымка в глубине,
// размытие дальнего и переднего плана. Цвета сезона приходят из CSS-переменных.
// Мелкие одинаковые детали (листья, трава, цветы) собираются в один <path> на цвет, чтобы DOM был лёгким.
// Каждый источник света кладёт свечение в отдельный слой света (lights) с тем же параллаксом.
import { W, H, lx, groundY, bridgeY, RIVER, TEA, LAKE, FOG_X } from './geo.js';
import { pandaG, PANDA_DEFS } from './panda.js';

const P = (n) => Math.round(n * 10) / 10;

function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Корзины путей по классам и по кускам мира шириной 500: один контур на весь мир
// заставлял браузер перерисовывать его целиком для каждой новой плитки при прокрутке
class Ink {
  constructor() { this.b = {}; }
  add(cls, d) {
    const x = parseFloat(d.slice(1));
    const key = cls + '|' + Math.floor((Number.isFinite(x) ? x : 0) / 500);
    (this.b[key] ||= []).push(d);
  }
  out() { return Object.entries(this.b).map(([k, a]) => `<path class="${k.split('|')[0]}" d="${a.join('')}"/>`).join(''); }
}
const ell = (cx, cy, rx, ry) => `M${P(cx - rx)},${P(cy)}a${P(rx)},${P(ry)} 0 1,0 ${P(2 * rx)},0a${P(rx)},${P(ry)} 0 1,0 ${P(-2 * rx)},0Z`;
const circ = (cx, cy, r) => ell(cx, cy, r, r);
function leafD(x, y, len, ang, w = 0.17) {
  const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
  const pt = (u, v) => `${P(x + u * c - v * s)},${P(y + u * s + v * c)}`;
  return `M${pt(0, 0)}Q${pt(len * 0.42, -len * w)} ${pt(len, 0)}Q${pt(len * 0.42, len * w)} ${pt(0, 0)}Z`;
}

export const FACTORS = [0.12, 0.3, 0.6, 1, 1.4];
// Анимированные элементы живут в отдельных лёгких слоях: иначе браузер каждый кадр перерисовывает огромный слой целиком
let FX = {};
const fx = (f, html) => { (FX[f] ||= []).push(html); return ''; };
const layerW = (f) => Math.ceil(W * f + 2600);
const mixc = (a, p, b) => `color-mix(in srgb,${a} ${p}%,${b})`;
const stop = (o, c, op = 1) => `<stop offset="${o}" style="stop-color:${c};stop-opacity:${op}"/>`;

// ---------- Горы ----------
function karstD(x, base, w, h, a) {
  const top = base - h, c = x + a;
  return `M${P(x - w / 2)},${base} C${P(x - w * 0.48)},${P(base - h * 0.55)} ${P(c - w * 0.3)},${P(top)} ${P(c)},${P(top)} C${P(c + w * 0.28)},${P(top)} ${P(x + w * 0.46)},${P(base - h * 0.6)} ${P(x + w / 2)},${base}Z`;
}
function karst(x, base, w, h, fill, r, ink, { snow = true, lines = false, trees = false } = {}) {
  const a = (r() - 0.5) * w * 0.22, d = karstD(x, base, w, h, a), top = base - h, c = x + a;
  let s = `<path d="${d}" fill="url(#${fill})"/><path d="${d}" fill="url(#gLit)"/>`;
  if (snow) s += `<path class="snow" d="M${P(c - w * 0.2)},${P(top + h * 0.1)} C${P(c - w * 0.12)},${P(top - 1)} ${P(c + w * 0.12)},${P(top - 1)} ${P(c + w * 0.2)},${P(top + h * 0.1)} L${P(c + w * 0.08)},${P(top + h * 0.065)} L${P(c)},${P(top + h * 0.13)} L${P(c - w * 0.09)},${P(top + h * 0.06)}Z"/>`;
  if (lines) for (let i = 0; i < 4; i++) {
    const lx0 = c - w * 0.25 + r() * w * 0.5, ly = top + h * (0.15 + r() * 0.3);
    ink.add('rockline', `M${P(lx0)},${P(ly)}q${P((r() - 0.5) * 20)},${P(h * 0.25)} ${P((r() - 0.5) * 14)},${P(h * 0.5)}`);
  }
  if (trees) for (let i = 0; i < 6; i++) {
    const tx = c + (r() - 0.5) * w * 0.3, ty = top + 4 + Math.abs(tx - c) * 0.5;
    ink.add('treetop', circ(tx, ty, 4 + r() * 6));
  }
  return s;
}

// ---------- Растения ----------
function bamboo(x, base, h, w, r, ink, { grad = 'gBam', lf = ['leafA', 'leafB', 'leafC'], lean = 0, leaves = true, node = 'bamn' } = {}) {
  const seg = 70 + r() * 40, rad = (lean * Math.PI) / 180;
  const at = (dy) => [x + Math.sin(rad) * dy, base - Math.cos(rad) * dy];
  let s = `<g transform="rotate(${P(lean)} ${P(x)} ${P(base)})">`;
  for (let y = base, i = 0; y > base - h; y -= seg, i++) {
    const hh = Math.min(seg - 3, y - (base - h)), ww = w * (1 - i * 0.025);
    s += `<rect x="${P(x - ww / 2)}" y="${P(y - hh)}" width="${P(ww)}" height="${P(hh)}" rx="${P(ww * 0.3)}" fill="url(#${grad})"/>`;
    s += `<rect class="${node}" x="${P(x - ww / 2 - 1.5)}" y="${P(y - hh - 3)}" width="${P(ww + 3)}" height="${P(Math.max(2.5, w * 0.28))}" rx="1.5"/>`;
  }
  s += '</g>';
  if (leaves) {
    for (let dy = h * 0.35; dy < h; dy += seg) {
      if (r() < 0.4) continue;
      const [px, py] = at(dy), side = r() < 0.5 ? -1 : 1, n = 3 + Math.floor(r() * 4);
      const tx = px + side * (20 + r() * 30), ty = py - 10 + r() * 20;
      ink.add('twig', `M${P(px)},${P(py)}Q${P((px + tx) / 2)},${P(py - 12)} ${P(tx)},${P(ty)}`);
      for (let i = 0; i < n; i++) {
        const ang = (side < 0 ? 180 - 30 - r() * 70 : 30 + r() * 70) + lean;
        ink.add(lf[i % 3], leafD(tx, ty, 26 + r() * 30 + w, ang, 0.15));
      }
    }
  }
  return s;
}

function pine(x, base, s, r, ink) {
  let g = `<path fill="url(#gTrunk)" d="M${P(x - 16 * s)},${base} C${P(x - 10 * s)},${P(base - 120 * s)} ${P(x + 34 * s)},${P(base - 180 * s)} ${P(x + 10 * s)},${P(base - 300 * s)} L${P(x + 24 * s)},${P(base - 300 * s)} C${P(x + 50 * s)},${P(base - 180 * s)} ${P(x + 8 * s)},${P(base - 120 * s)} ${P(x + 16 * s)},${base}Z"/>`;
  g += `<path class="branch" stroke-width="${P(11 * s)}" d="M${P(x + 12 * s)},${P(base - 200 * s)} Q${P(x - 60 * s)},${P(base - 232 * s)} ${P(x - 128 * s)},${P(base - 216 * s)} M${P(x + 18 * s)},${P(base - 250 * s)} Q${P(x + 60 * s)},${P(base - 270 * s)} ${P(x + 90 * s)},${P(base - 246 * s)}"/>`;
  const pads = [[-124, -226, 95], [-40, -262, 85], [30, -308, 100], [80, -246, 75], [-84, -304, 64]];
  for (const [dx, dy, w] of pads) {
    const cx = x + dx * s, cy = base + dy * s;
    for (let i = 0; i < 5; i++) ink.add('pineD', ell(cx + (r() - 0.5) * w * 0.7 * s, cy + 6 * s, w * (0.35 + r() * 0.25) * s, w * 0.17 * s));
    for (let i = 0; i < 5; i++) ink.add('pineM', ell(cx + (r() - 0.5) * w * 0.6 * s, cy - 2 * s, w * (0.3 + r() * 0.22) * s, w * 0.14 * s));
    for (let i = 0; i < 4; i++) ink.add('pineL', ell(cx - w * 0.12 * s + (r() - 0.5) * w * 0.4 * s, cy - 9 * s, w * (0.18 + r() * 0.14) * s, w * 0.07 * s));
  }
  return g;
}

function blossomTree(x, base, s, r, ink) {
  let g = `<path fill="url(#gTrunk)" d="M${P(x - 10 * s)},${base} Q${P(x - 4 * s)},${P(base - 80 * s)} ${P(x - 34 * s)},${P(base - 150 * s)} L${P(x - 20 * s)},${P(base - 156 * s)} Q${P(x + 12 * s)},${P(base - 92 * s)} ${P(x + 10 * s)},${base}Z"/>
    <path class="branch" stroke-width="${P(6 * s)}" d="M${P(x - 6 * s)},${P(base - 100 * s)} Q${P(x + 40 * s)},${P(base - 130 * s)} ${P(x + 70 * s)},${P(base - 128 * s)} M${P(x - 26 * s)},${P(base - 140 * s)} Q${P(x - 70 * s)},${P(base - 160 * s)} ${P(x - 96 * s)},${P(base - 150 * s)}"/>`;
  for (let i = 0; i < 26; i++) {
    const a = r() * Math.PI, d = 30 + r() * 80;
    const cx = x - 16 * s + Math.cos(a) * d * s * 1.35, cy = base - 150 * s - Math.sin(a) * d * s * 0.7, rr = (14 + r() * 16) * s;
    ink.add('blossomD', circ(cx + 3 * s, cy + 4 * s, rr));
    ink.add('blossom', circ(cx, cy, rr * 0.9));
    if (r() < 0.6) ink.add('blossomL', circ(cx - rr * 0.3, cy - rr * 0.35, rr * 0.45));
  }
  return g;
}

function rock(x, y, w, h, ink) {
  const d = `M${P(x - w / 2)},${P(y)} Q${P(x - w * 0.46)},${P(y - h)} ${P(x - w * 0.05)},${P(y - h)} Q${P(x + w * 0.46)},${P(y - h * 0.92)} ${P(x + w / 2)},${P(y)}Z`;
  ink.add('moss', `M${P(x - w * 0.38)},${P(y - h * 0.7)} Q${P(x)},${P(y - h * 1.1)} ${P(x + w * 0.32)},${P(y - h * 0.82)} Q${P(x)},${P(y - h * 0.84)} ${P(x - w * 0.38)},${P(y - h * 0.7)}Z`);
  return `<path d="${d}" fill="url(#gRock)"/>`;
}

// ---------- Огни ----------
function glow(x, y, r, flick, grad = 'gGlow') {
  return `<circle cx="${P(x)}" cy="${P(y)}" r="${P(r)}" fill="url(#${grad})"/>`;
}
function spill(x, y, rx, lights) {
  lights.push(`<ellipse cx="${P(x)}" cy="${P(y)}" rx="${P(rx)}" ry="${P(rx * 0.22)}" fill="url(#gSpill)"/>`);
}

function lantern(x, y, s, lights, flick = false) {
  lights.push(glow(x, y, 90 * s, flick), glow(x, y, 26 * s, flick, 'gCore'));
  return `<line x1="${P(x)}" y1="${P(y - 28 * s)}" x2="${P(x)}" y2="${P(y - 16 * s)}" class="rope"/>
    <rect class="gold" x="${P(x - 8 * s)}" y="${P(y - 20 * s)}" width="${P(16 * s)}" height="${P(5 * s)}" rx="${P(1.5 * s)}"/>
    <ellipse cx="${P(x)}" cy="${P(y)}" rx="${P(16 * s)}" ry="${P(17 * s)}" fill="url(#gLan)" stroke="#6a160e" stroke-width="${P(1.5 * s)}"/>
    <path d="M${P(x)},${P(y - 16 * s)}V${P(y + 16 * s)}M${P(x - 9 * s)},${P(y - 13 * s)}Q${P(x - 15 * s)},${P(y)} ${P(x - 9 * s)},${P(y + 13 * s)}M${P(x + 9 * s)},${P(y - 13 * s)}Q${P(x + 15 * s)},${P(y)} ${P(x + 9 * s)},${P(y + 13 * s)}" stroke="#7a1d14" stroke-width="${P(1.1 * s)}" fill="none" opacity=".6"/>
    <rect class="gold" x="${P(x - 8 * s)}" y="${P(y + 15 * s)}" width="${P(16 * s)}" height="${P(5 * s)}" rx="${P(1.5 * s)}"/>
    <path d="M${P(x - 3 * s)},${P(y + 20 * s)}h${P(6 * s)}l${P(1.5 * s)},${P(16 * s)}h${P(-9 * s)}Z" class="tassel"/>`;
}

function lanternString(x0, x1, y, sag, n, lights) {
  let s = `<path class="rope" fill="none" d="M${x0},${y} Q${(x0 + x1) / 2},${y + sag * 2} ${x1},${y}"/>`;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1), x = x0 + (x1 - x0) * t;
    const yy = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag * 2) + t * t * y;
    s += lantern(x, yy + 26, 0.7, lights, i % 2 === 0);
  }
  return s;
}

function stoneLantern(x, base, lights) {
  lights.push(glow(x, base - 74, 100, true), glow(x, base - 74, 22, true, 'gCore'));
  spill(x, base + 6, 90, lights);
  return `<rect fill="url(#gStone)" x="${x - 22}" y="${base - 12}" width="44" height="12" rx="3"/>
    <rect fill="url(#gStone)" x="${x - 8}" y="${base - 56}" width="16" height="46"/>
    <rect fill="url(#gStone)" x="${x - 19}" y="${base - 63}" width="38" height="9" rx="2"/>
    <rect fill="url(#gStone)" x="${x - 15}" y="${base - 92}" width="30" height="30"/>
    <rect class="win" x="${x - 8}" y="${base - 86}" width="16" height="18"/>
    <path fill="url(#gStone)" d="M${x - 32},${base - 89} Q${x},${base - 116} ${x + 32},${base - 89}Z"/>
    <circle fill="url(#gStone)" cx="${x}" cy="${base - 112}" r="5.5"/>
    <path class="moss" d="M${x - 28},${base - 90} Q${x - 10},${base - 100} ${x + 6},${base - 98} Q${x - 8},${base - 94} ${x - 28},${base - 90}Z"/>`;
}

// ---------- Дом на сваях с черепичной крышей ----------
function roof(x, l, w, T, s, ov, rh, lights, ink) {
  const rl = l - ov, rr = l + w + ov;
  const d = `M${P(rl)},${P(T - 6 * s)} Q${P(l - 10 * s)},${P(T - 14 * s)} ${P(l + 6 * s)},${P(T - 34 * s)} L${P(x - w * 0.24)},${P(T - rh)} L${P(x + w * 0.24)},${P(T - rh)} L${P(l + w - 6 * s)},${P(T - 34 * s)} Q${P(l + w + 10 * s)},${P(T - 14 * s)} ${P(rr)},${P(T - 6 * s)} Q${P(x)},${P(T + 22 * s)} ${P(rl)},${P(T - 6 * s)}Z`;
  let g = `<path class="roof" d="${d}"/><path d="${d}" fill="url(#pTiles)" opacity=".7"/><path d="${d}" fill="url(#gRoofShade)"/>`;
  // концы черепицы по краю карниза
  for (let i = 1; i < 26; i++) {
    const t = i / 26, cx = (1 - t) * (1 - t) * rr + 2 * (1 - t) * t * x + t * t * rl;
    const cy = (1 - t) * (1 - t) * (T - 6 * s) + 2 * (1 - t) * t * (T + 22 * s) + t * t * (T - 6 * s);
    ink.add('tileend', circ(cx, cy - 1, 3.6 * s));
  }
  // мох на крыше
  for (let i = 0; i < 4; i++) ink.add('mossroof', ell(x + (i - 1.5) * w * 0.28, T - rh * (0.35 + (i % 2) * 0.25), 24 * s, 7 * s));
  g += `<path class="snow" d="M${P(x - w * 0.26)},${P(T - rh + 2)} L${P(x + w * 0.26)},${P(T - rh + 2)} L${P(l + w - 2 * s)},${P(T - 36 * s)} Q${P(x)},${P(T - 50 * s)} ${P(l + 2 * s)},${P(T - 36 * s)}Z"/>
    <path class="ridge" stroke-width="${P(7 * s)}" d="M${P(x - w * 0.25)},${P(T - rh)} H${P(x + w * 0.25)}"/>
    <path class="ridge" stroke-width="${P(5 * s)}" d="M${P(x - w * 0.25 - 4 * s)},${P(T - rh)} q${P(-10 * s)},${P(-2 * s)} ${P(-12 * s)},${P(-14 * s)} q${P(6 * s)},${P(-4 * s)} ${P(8 * s)},${P(2 * s)} M${P(x + w * 0.25 + 4 * s)},${P(T - rh)} q${P(10 * s)},${P(-2 * s)} ${P(12 * s)},${P(-14 * s)} q${P(-6 * s)},${P(-4 * s)} ${P(-8 * s)},${P(2 * s)}"/>
    <path class="eave" stroke-width="${P(5 * s)}" d="M${P(rr)},${P(T - 6 * s)} Q${P(x)},${P(T + 22 * s)} ${P(rl)},${P(T - 6 * s)}"/>`;
  g += lantern(rl + 28 * s, T + 20 * s, s * 0.9, lights, true) + lantern(rr - 28 * s, T + 20 * s, s * 0.9, lights);
  return g;
}

function house(x, base, s, lights, ink, { floors = 1, deck = 46, sign = '' } = {}) {
  const bw = 250 * s, bh = 140 * s, L = x - bw / 2;
  const floorY = base - deck * s;
  let g = `<ellipse cx="${P(x)}" cy="${P(base + 4)}" rx="${P(bw * 0.7)}" ry="${P(14 * s)}" fill="#000" opacity=".22"/>`;
  for (const px of [L + 12 * s, x - bw * 0.15, x + bw * 0.15, L + bw - 12 * s]) {
    g += `<rect fill="url(#gTrunk)" x="${P(px - 7 * s)}" y="${P(floorY)}" width="${P(14 * s)}" height="${P(deck * s + 4)}"/>`;
    g += `<rect fill="url(#gStone)" x="${P(px - 12 * s)}" y="${P(base - 8 * s)}" width="${P(24 * s)}" height="${P(12 * s)}" rx="${P(3 * s)}"/>`;
  }
  g += `<rect fill="url(#gDeck)" x="${P(L - 34 * s)}" y="${P(floorY - 9 * s)}" width="${P(bw + 68 * s)}" height="${P(14 * s)}" rx="${P(2 * s)}"/>`;
  let top = floorY - 9 * s;
  for (let f = 0; f < floors; f++) {
    const w = f ? bw * 0.72 : bw, l = x - w / 2, h = f ? bh * 0.8 : bh, T = top - h;
    g += `<rect fill="url(#gWall)" x="${P(l)}" y="${P(T)}" width="${P(w)}" height="${P(h)}"/><rect fill="url(#pPlank)" x="${P(l)}" y="${P(T)}" width="${P(w)}" height="${P(h)}" opacity=".6"/>`;
    // красные угловые колонны и балка с кронштейнами
    for (const px of [l - 4 * s, l + w - 10 * s]) g += `<rect fill="url(#gPillar)" x="${P(px)}" y="${P(T - 6 * s)}" width="${P(14 * s)}" height="${P(h + 6 * s)}"/>`;
    g += `<rect class="beam" x="${P(l - 8 * s)}" y="${P(T - 8 * s)}" width="${P(w + 16 * s)}" height="${P(12 * s)}"/>`;
    for (let bx = l + 8 * s; bx < l + w; bx += 26 * s) ink.add('bracket', `M${P(bx)},${P(T - 8 * s)}h${P(12 * s)}v${P(-6 * s)}h${P(-12 * s)}Z`);
    const nWin = f ? 2 : 3;
    for (let i = 0; i < nWin; i++) {
      const wx = l + w * (i + 0.5) / nWin - 23 * s, wy = T + h * 0.2;
      if (!f && i === 1) {
        const dx = wx + 2 * s, dw = 42 * s, dy = T + h * 0.26, dh = h * 0.74;
        g += `<rect class="beam" x="${P(dx - 4 * s)}" y="${P(dy - 4 * s)}" width="${P(dw + 8 * s)}" height="${P(dh + 4 * s)}"/>
          <rect class="win" x="${P(dx)}" y="${P(dy)}" width="${P(dw)}" height="${P(dh * 0.35)}"/><rect fill="url(#pLatSmall)" x="${P(dx)}" y="${P(dy)}" width="${P(dw)}" height="${P(dh * 0.35)}"/>
          <rect fill="url(#gDoor)" x="${P(dx)}" y="${P(dy + dh * 0.35)}" width="${P(dw)}" height="${P(dh * 0.65)}"/>
          <line class="beam-l" x1="${P(dx + dw / 2)}" y1="${P(dy)}" x2="${P(dx + dw / 2)}" y2="${P(dy + dh)}"/>
          <circle class="gold" cx="${P(dx + dw / 2 - 4 * s)}" cy="${P(dy + dh * 0.62)}" r="${P(2.2 * s)}"/><circle class="gold" cx="${P(dx + dw / 2 + 4 * s)}" cy="${P(dy + dh * 0.62)}" r="${P(2.2 * s)}"/>`;
        lights.push(glow(dx + dw / 2, dy + dh * 0.2, 50 * s, false));
        continue;
      }
      g += `<rect class="beam" x="${P(wx - 4 * s)}" y="${P(wy - 4 * s)}" width="${P(54 * s)}" height="${P(60 * s)}"/>
        <rect class="win" x="${P(wx)}" y="${P(wy)}" width="${P(46 * s)}" height="${P(52 * s)}"/><rect fill="url(#pLatSmall)" x="${P(wx)}" y="${P(wy)}" width="${P(46 * s)}" height="${P(52 * s)}"/>`;
      lights.push(glow(wx + 23 * s, wy + 26 * s, 70 * s, false));
    }
    if (!f) {
      g += `<rect class="rail" x="${P(L - 34 * s)}" y="${P(top - 32 * s)}" width="${P(bw + 68 * s)}" height="${P(5 * s)}"/>`;
      for (let i = 0; i <= 14; i++) {
        const px = L - 32 * s + i * (bw + 64 * s) / 14;
        ink.add('railbar', `M${P(px)},${P(top - 30 * s)}h${P(3.5 * s)}v${P(30 * s)}h${P(-3.5 * s)}Z`);
        if (i < 14) ink.add('railbar', `M${P(px + 3 * s)},${P(top - 14 * s)}l${P((bw + 64 * s) / 14 - 3 * s)},${P(-8 * s)}v${P(2.5 * s)}l${P(-((bw + 64 * s) / 14 - 3 * s))},${P(8 * s)}Z`);
      }
      spill(x, base + 10, bw * 0.6, lights);
    }
    g += roof(x, l, w, T, s, (f ? 52 : 74) * s, (f ? 72 : 94) * s, lights, ink);
    top = T - 22 * s;
  }
  if (sign) {
    g += `<rect fill="url(#gPillar)" x="${P(L + bw - 46 * s)}" y="${P(floorY - 130 * s)}" width="${P(26 * s)}" height="${P(70 * s)}" rx="${P(3 * s)}" stroke="#d9a43a" stroke-width="${P(2 * s)}"/>
      <text class="callig gold-t" x="${P(L + bw - 33 * s)}" y="${P(floorY - 82 * s)}" text-anchor="middle" style="font-size:${P(28 * s)}px">${sign}</text>`;
  }
  return g;
}

function decoPanda(x, base, s, opts, flip = false) {
  const k = s * 0.9;
  return `<g transform="translate(${P(x - (flip ? -70 : 70) * k)} ${P(base - 136 * k)}) scale(${flip ? -k : k} ${k})">${pandaG(opts)}</g>`;
}

// ---------- Слои ----------
function layerFar(r) {
  const f = 0.12, w = layerW(f), ink = new Ink();
  let a = '', b = '';
  for (let x = -100; x < w; x += 90 + r() * 80) a += karst(x, 700, 160 + r() * 160, 230 + r() * 240, 'gM1', r, ink);
  for (let x = -60; x < w; x += 120 + r() * 120) b += karst(x, 770, 150 + r() * 130, 140 + r() * 170, 'gM2', r, ink);
  const px = lx(900, f);
  const pagoda = `<g transform="translate(${P(px)} 470)" fill="url(#gM3)"><rect x="-8" y="0" width="16" height="60"/><path d="M-32,6 Q0,-12 32,6Z M-25,-18 Q0,-34 25,-18Z M-18,-40 Q0,-54 18,-40Z"/><rect x="-6" y="-38" width="12" height="40"/></g>`;
  let s = `<g>${a}<rect x="0" y="520" width="${w}" height="240" fill="url(#gMist)" opacity=".7"/>${b}${pagoda}</g>`;
  for (let x = 0; x < w; x += 500 + r() * 400) s += `<ellipse cx="${P(x)}" cy="${P(600 + r() * 120)}" rx="${P(300 + r() * 200)}" ry="${P(40 + r() * 30)}" fill="url(#gCloud)"/>`;
  s += `<rect x="0" y="560" width="${w}" height="260" fill="url(#gMist)"/>`;
  return { f, w, svg: s + ink.out() };
}

function layerMountains(r, lights) {
  const f = 0.3, w = layerW(f), ink = new Ink();
  let s = '<g>';
  for (let x = -80; x < w; x += 160 + r() * 140) s += karst(x, 880, 220 + r() * 200, 200 + r() * 270, 'gM3', r, ink, { lines: true, trees: true });
  s += ink.out() + '</g>';
  const ink2 = new Ink();
  // большой утёс с водопадом
  const cx = lx(2420, f);
  const cliffD = `M${P(cx - 270)},900 L${P(cx - 236)},300 Q${P(cx - 186)},118 ${P(cx - 62)},108 L${P(cx + 72)},103 Q${P(cx + 206)},128 ${P(cx + 236)},300 L${P(cx + 280)},900Z`;
  s += `<path d="${cliffD}" fill="url(#gCliff)"/><path d="${cliffD}" fill="url(#gLit)"/>`;
  for (let i = 0; i < 16; i++) {
    const sx = cx - 230 + r() * 460;
    if (Math.abs(sx - cx) < 70) continue;
    ink2.add('crevice', `M${P(sx)},${P(150 + r() * 120)}q${P((r() - 0.5) * 30)},${P(150 + r() * 120)} ${P((r() - 0.5) * 20)},${P(320 + r() * 260)}`);
  }
  for (let i = 0; i < 6; i++) {
    const ly = 260 + i * 100 + r() * 30, lx0 = cx + (i % 2 ? 80 : -230) + r() * 40;
    ink2.add('ledge', ell(lx0 + 40, ly, 60 + r() * 30, 10));
    for (let k = 0; k < 3; k++) ink2.add('treetop', circ(lx0 + 20 + k * 22, ly - 12 - r() * 8, 9 + r() * 6));
  }
  ink2.add('mosscap', `M${P(cx - 236)},300 Q${P(cx - 176)},118 ${P(cx - 62)},108 L${P(cx + 72)},103 Q${P(cx + 206)},128 ${P(cx + 236)},300 Q${P(cx + 120)},210 ${P(cx)},230 Q${P(cx - 120)},215 ${P(cx - 236)},300Z`);
  s += ink2.out();
  s += `<rect x="${P(cx - 58)}" y="112" width="116" height="770" fill="url(#gFall)"/><rect x="${P(cx - 58)}" y="112" width="116" height="770" fill="url(#gFallH)"/>`;
  for (let i = 0; i < 14; i++) {
    const sx = cx - 50 + i * 7.6 + r() * 3;
    fx(0.3, `<line class="fallstreak" x1="${P(sx)}" y1="114" x2="${P(sx)}" y2="880" style="stroke-width:${P(1.5 + r() * 3)};animation-duration:${P(0.7 + r() * 0.9)}s;opacity:${P(0.35 + r() * 0.5)}"/>`);
  }
  s += `<g class="rainbow">${['#ff6b6b', '#ffb36b', '#ffe36b', '#7fdc8a', '#6bb7ff', '#a78bfa'].map((c, i) => `<path d="M${P(cx - 340 + i * 8)},870 A${340 - i * 8},${290 - i * 7} 0 0 1 ${P(cx + 340 - i * 8)},870" stroke="${c}"/>`).join('')}</g>`;
  s += `<g>${[[-80, 860, 120], [0, 870, 150], [90, 862, 110], [-30, 820, 80], [40, 830, 90]].map(([dx, y, rr]) => `<circle cx="${P(cx + dx)}" cy="${y}" r="${rr}" fill="url(#gFoam)"/>`).join('')}</g>`;
  // пагода на скале
  const px = cx - 150, py = 112;
  s += `<g transform="translate(${P(px)} ${py})">` +
    [0, 1, 2].map((i) => {
      const yy = -i * 34, ww = 54 - i * 12;
      return `<rect fill="url(#gPillar)" x="${-ww / 2 + 4}" y="${yy - 26}" width="${ww - 8}" height="26"/><path class="roof" d="M${-ww / 2 - 16},${yy - 24} Q${-ww / 2},${yy - 28} ${-ww / 2 + 4},${yy - 38} H${ww / 2 - 4} Q${ww / 2},${yy - 28} ${ww / 2 + 16},${yy - 24} Q0,${yy - 18} ${-ww / 2 - 16},${yy - 24}Z"/>`;
    }).join('') + '</g>';
  lights.push(glow(px, py - 20, 40, true));
  // террасы и далёкие дома у деревни
  const vx = lx(4200, f);
  for (let i = 0; i < 6; i++) s += `<path class="${i % 2 ? 'terr' : 'terr2'}" d="M${P(vx - 320 + i * 22)},${P(820 - i * 40)} Q${P(vx)},${P(798 - i * 46)} ${P(vx + 320 - i * 22)},${P(820 - i * 40)} L${P(vx + 320 - i * 22)},${P(840 - i * 40)} Q${P(vx)},${P(818 - i * 46)} ${P(vx - 320 + i * 22)},${P(840 - i * 40)}Z"/>`;
  const ink3 = new Ink();
  s += `<g transform="translate(${P(vx + 120)} 0)">${house(0, 650, 0.32, lights, ink3)}</g><g transform="translate(${P(lx(1100, f))} 0)">${house(0, 610, 0.3, lights, ink3, { floors: 3 })}</g>${ink3.out()}`;
  s += `<rect x="0" y="740" width="${w}" height="200" fill="url(#gMist)" opacity=".85"/>`;
  return { f, w, svg: s };
}

function layerMid(r, lights) {
  const f = 0.6, w = layerW(f), ink = new Ink(), inkFar = new Ink();
  let s = '<g opacity=".92">';
  for (let x = lx(-200, f); x < lx(2000, f); x += 14 + r() * 24) {
    s += bamboo(x, 920, 420 + r() * 420, 8 + r() * 6, r, inkFar, { grad: 'gBamFar', lf: ['leaffar', 'leaffar2', 'leaffar'], node: 'bamfarn', lean: (r() - 0.5) * 8 });
  }
  s += inkFar.out() + '</g>';
  s += `<rect x="${P(lx(-200, f))}" y="520" width="${P(lx(2100, f) - lx(-200, f))}" height="420" fill="url(#gMist)" opacity=".35"/>`;
  for (let x = lx(-100, f); x < lx(1900, f); x += 60 + r() * 90) s += bamboo(x, 940, 500 + r() * 400, 13 + r() * 5, r, ink, { lean: (r() - 0.5) * 5 });
  s += pine(lx(1650, f), 880, 1.25, r, ink);
  // скалы у водопада и цветущие деревья
  const a = lx(1950, f), b = lx(2900, f);
  const c1 = `M${P(a - 130)},940 L${P(a - 44)},420 Q${P(a + 30)},296 ${P(a + 124)},356 L${P(a + 190)},940Z`;
  const c2 = `M${P(b - 170)},940 L${P(b - 96)},376 Q${P(b)},256 ${P(b + 114)},326 L${P(b + 170)},940Z`;
  s += `<path d="${c1}" fill="url(#gCliff)"/><path d="${c1}" fill="url(#gLit)"/><path d="${c2}" fill="url(#gCliff)"/><path d="${c2}" fill="url(#gLit)"/>
    <rect x="${P(b - 72)}" y="348" width="38" height="580" fill="url(#gFall)"/><rect x="${P(b - 72)}" y="348" width="38" height="580" fill="url(#gFallH)"/>`;
  for (let i = 0; i < 4; i++) fx(0.6, `<line class="fallstreak" x1="${P(b - 66 + i * 8)}" y1="350" x2="${P(b - 66 + i * 8)}" y2="920" style="animation-duration:${P(0.8 + r() * 0.6)}s"/>`);
  s += `<g><circle cx="${P(b - 53)}" cy="915" r="60" fill="url(#gFoam)"/></g>`;
  s += blossomTree(a + 60, 920, 1.45, r, ink) + blossomTree(b - 10, 920, 1.25, r, ink) + blossomTree(lx(3200, f), 920, 1.1, r, ink);
  s += pine(lx(3450, f), 920, 1, r, ink);
  // деревня второго ряда
  s += house(lx(3700, f), 870, 0.55, lights, ink) + house(lx(4380, f), 860, 0.6, lights, ink, { floors: 2 }) + house(lx(4900, f), 870, 0.5, lights, ink);
  s += lanternString(lx(3800, f), lx(4250, f), 600, 30, 5, lights);
  // ночной лес у врат и лето в тумане
  for (let x = lx(6500, f); x < lx(7150, f); x += 70 + r() * 90) {
    const cx = x, cy = 700 + r() * 80, rx = 70 + r() * 60, ry = 110 + r() * 70;
    s += `<rect fill="url(#gTrunk)" x="${P(cx - 7)}" y="760" width="14" height="180"/>`;
    ink.add('leafB', ell(cx + 8, cy + 10, rx, ry));
    ink.add('leafA', ell(cx, cy, rx * 0.85, ry * 0.85));
    ink.add('leafC', ell(cx - rx * 0.3, cy - ry * 0.4, rx * 0.35, ry * 0.3));
  }
  s += midSummer(f, r, ink, lights);
  s += ink.out();
  s += `<rect x="0" y="830" width="${w}" height="130" fill="url(#gMist)" opacity=".3"/>`;
  return { f, w, svg: s };
}

function teaHouse(lights, r, ink) {
  const { x0, x1, floor } = TEA;
  let s = `<rect fill="url(#gTeaWall)" x="${x0}" y="0" width="${x1 - x0}" height="${floor}"/><rect fill="url(#pPlank)" x="${x0}" y="0" width="${x1 - x0}" height="${floor}" opacity=".35"/>`;
  // круглое «лунное» окно с ночным небом
  const mx = 5250, my = 270, mr = 120;
  s += `<circle cx="${mx}" cy="${my}" r="${mr + 14}" class="beam"/><circle cx="${mx}" cy="${my}" r="${mr}" fill="url(#gMoonWin)"/>
    <circle cx="${mx + 40}" cy="${my - 40}" r="34" fill="#fff8dc"/><circle cx="${mx + 40}" cy="${my - 40}" r="60" fill="#fff8dc" opacity=".12"/>
    <path d="M${mx - mr},${my + 70} Q${mx - 40},${my + 10} ${mx + 10},${my + 60} T${mx + mr},${my + 40} V${my + mr} H${mx - mr}Z" fill="#1a2440"/>
    <path class="beam-l" d="M${mx - 16},${my - mr + 4} V${my + mr - 4} M${mx + 16},${my - mr + 4} V${my + mr - 4}" stroke-width="6"/>
    <circle cx="${mx}" cy="${my}" r="${mr}" fill="none" stroke="#2a170c" stroke-width="10"/>`;
  // решётчатые окна
  for (const x of [5480, 5940, 6170]) {
    s += `<rect class="beam" x="${x - 8}" y="142" width="186" height="226"/><rect class="twin" x="${x}" y="150" width="170" height="210"/><rect x="${x}" y="150" width="170" height="210" fill="url(#pLattice)"/>`;
    lights.push(glow(x + 85, 255, 160, false));
  }
  s += `<rect class="beam" x="${x0}" y="96" width="${x1 - x0}" height="30"/><rect class="beam" x="${x0}" y="420" width="${x1 - x0}" height="24"/>`;
  for (let bx = x0 + 20; bx < x1; bx += 70) ink.add('bracket', `M${bx},126h22v10h-22Z`);
  // центральная стена со свитком
  const cx = 5720;
  s += `<rect class="plaster" x="${cx - 150}" y="444" width="300" height="${floor - 444}"/><rect x="${cx - 150}" y="444" width="300" height="${floor - 444}" fill="url(#gRoofShade)" opacity=".5"/>
    <rect class="scrollbg" x="${cx - 54}" y="470" width="108" height="210" rx="3"/>
    <rect class="beam" x="${cx - 62}" y="464" width="124" height="8" rx="3"/><rect class="beam" x="${cx - 62}" y="678" width="124" height="8" rx="3"/>
    <text class="callig" x="${cx}" y="560" text-anchor="middle">茶</text><text class="callig sm" x="${cx}" y="640" text-anchor="middle">静</text>
    <circle class="carve" cx="${cx}" cy="740" r="38"/><circle class="carvein" cx="${cx}" cy="740" r="26"/>
    <path class="carvein" d="M${cx - 18},740 q9,-14 18,0 q9,14 18,0" fill="none" stroke-width="4"/>`;
  // полки
  for (const y of [560, 700]) s += `<rect fill="url(#gDeck)" x="5050" y="${y}" width="380" height="16" rx="2"/>`;
  const vase = (x, y, h) => `<path class="porc" d="M${x - 14},${y} Q${x - 24},${y - h * 0.6} ${x - 8},${y - h} L${x + 8},${y - h} Q${x + 24},${y - h * 0.6} ${x + 14},${y}Z"/><path d="M${x - 14},${y} Q${x - 24},${y - h * 0.6} ${x - 8},${y - h} L${x + 8},${y - h} Q${x + 24},${y - h * 0.6} ${x + 14},${y}Z" fill="url(#gPorcShade)"/><path class="blue" d="M${x - 17},${y - h * 0.45} Q${x},${y - h * 0.62} ${x + 17},${y - h * 0.45} M${x - 12},${y - h * 0.22} h24 M${x - 6},${y - h * 0.82} h12" fill="none" stroke-width="3"/>`;
  s += vase(5090, 560, 64) + vase(5142, 560, 46) + vase(5380, 700, 74) + vase(5338, 700, 40);
  s += `<path class="pot" d="M5196,560 h96 l-10,-28 h-76Z"/>${pine(5240, 532, 0.32, rng(7), ink)}`;
  s += `<ellipse class="porc" cx="5160" cy="696" rx="42" ry="7"/>`;
  for (const [ox, oy] of [[5145, 686], [5166, 684], [5182, 689], [5156, 678]]) s += `<circle cx="${ox}" cy="${oy}" r="9" fill="url(#gOrange)"/>`;
  s += `<rect class="book" x="5240" y="638" width="16" height="62"/><rect class="book2" x="5258" y="648" width="14" height="52"/><rect class="book" x="5274" y="634" width="18" height="66"/><rect class="book2" x="5294" y="660" width="12" height="40" transform="rotate(12 5300 700)"/>`;
  const candle = (x, y, hh = 26) => (lights.push(glow(x, y - hh - 8, 80, true), glow(x, y - hh - 8, 16, true, 'gCore')),
    `<rect fill="url(#gCandle)" x="${x - 6}" y="${y - hh}" width="12" height="${hh}" rx="2"/><path d="M${x},${y - hh} v-4" stroke="#222" stroke-width="1.5"/>` + fx(1, `<ellipse class="flame" cx="${x}" cy="${y - hh - 9}" rx="4.5" ry="9"/>`));
  s += candle(5320, 560) + candle(5338, 560, 18) + candle(5070, 700) + candle(6085, 740, 20) + candle(6250, 760, 30);
  for (const vx of [5110, 5400]) {
    s += `<path class="vine" d="M${vx},560 q-20,60 0,120 q16,50 -6,110" fill="none"/>`;
    for (let i = 0; i < 9; i++) ink.add(i % 2 ? 'leafA' : 'leafB', leafD(vx + Math.sin(i) * 12, 576 + i * 24, 22, i % 2 ? 140 : 40, 0.3));
  }
  for (const [x, y, sc] of [[5480, 400, 1.2], [5960, 300, 1.5], [6150, 380, 1.2], [6320, 260, 1.3]]) s += `<line class="rope" x1="${x}" y1="126" x2="${x}" y2="${y - 26 * sc}"/>` + lantern(x, y, sc, lights, true);
  // чайный столик, подушка, чайник
  s += `<rect class="rug" x="5850" y="${floor - 6}" width="480" height="12" rx="4"/>
    <rect fill="url(#gDeck)" x="5900" y="740" width="300" height="22" rx="4"/><rect fill="url(#gTrunk)" x="5915" y="760" width="16" height="70"/><rect fill="url(#gTrunk)" x="6170" y="760" width="16" height="70"/>
    <path class="porc" d="M5990,740 q-6,-34 26,-36 q32,2 26,36Z"/><path d="M5990,740 q-6,-34 26,-36 q32,2 26,36Z" fill="url(#gPorcShade)"/><path class="blue" d="M5992,724 q24,-10 48,0" fill="none" stroke-width="3"/>
    <path d="M6040,722 q16,-4 18,-14" fill="none" stroke-width="5" stroke="#efeae0"/><circle class="porc" cx="6016" cy="702" r="5"/>
    <path class="porc" d="M6100,740 h22 l-3,-16 h-16Z"/><path class="porc" d="M6130,740 h22 l-3,-16 h-16Z"/>
    ${fx(1, '<path class="smoke" d="M6142,716 q10,-30 -4,-60 q-12,-30 6,-70" fill="none"/>')}
    <rect class="cushion" x="6230" y="768" width="150" height="40" rx="12"/><rect class="pillow" x="6260" y="704" width="100" height="70" rx="14"/>
    <path d="M6275,720 h70 M6275,758 h70" stroke="#d9c79a" stroke-width="3" opacity=".7"/>`;
  s += decoPanda(5870, 830, 0.95, { robe: 'jade', item: 'teacup' });
  s += `<path class="knot" d="M${x0 + 60},450 l14,14 l-14,14 l-14,-14Z M${x0 + 60},478 v60" stroke-width="4"/>`;
  // пол с бликами
  s += `<rect fill="url(#gFloor)" x="${x0 - 40}" y="${floor}" width="${x1 - x0 + 80}" height="${H - floor}"/>`;
  for (let y = floor + 26; y < H; y += 30) ink.add('floorline', `M${x0 - 40},${y}H${x1 + 40}`);
  for (const lx0 of [5480, 5960, 6150, 6320]) spill(lx0, floor + 50, 120, lights);
  for (const px of [x0 - 10, x1 + 10]) s += `<rect fill="url(#gPillar)" x="${px - 24}" y="60" width="48" height="${floor - 60}"/>`;
  s += `<path class="roof" d="M${x0 - 170},74 Q${x0 - 60},52 ${x0 - 20},10 L${x1 + 20},10 Q${x1 + 60},52 ${x1 + 170},74 Q${(x0 + x1) / 2},114 ${x0 - 170},74Z"/><path fill="url(#pTiles)" opacity=".7" d="M${x0 - 170},74 Q${x0 - 60},52 ${x0 - 20},10 L${x1 + 20},10 Q${x1 + 60},52 ${x1 + 170},74 Q${(x0 + x1) / 2},114 ${x0 - 170},74Z"/>
    <path class="eave" stroke-width="6" d="M${x1 + 170},74 Q${(x0 + x1) / 2},114 ${x0 - 170},74"/>`;
  return s;
}

function gate(x, base, lights, ch = '春') {
  let s = '';
  for (const px of [x - 180, x + 180]) s += `<rect fill="url(#gStone)" x="${px - 42}" y="${base - 32}" width="84" height="32" rx="3"/><rect fill="url(#gPillar)" x="${px - 21}" y="${base - 402}" width="42" height="372"/>`;
  s += `<rect fill="url(#gPillar)" x="${x - 224}" y="${base - 342}" width="448" height="28"/><rect fill="url(#gPillar)" x="${x - 204}" y="${base - 300}" width="408" height="16"/>
    <rect class="plaque" x="${x - 56}" y="${base - 316}" width="112" height="62" rx="4"/><text class="callig gold-t" x="${x}" y="${base - 267}" text-anchor="middle">${ch}</text>`;
  for (const [y0, hw, hh] of [[380, 296, 40], [426, 146, 34]]) {
    const d = `M${x - hw},${base - y0} Q${x - hw + 80},${base - y0 - 12} ${x - hw + 100},${base - y0 - hh} L${x + hw - 100},${base - y0 - hh} Q${x + hw - 80},${base - y0 - 12} ${x + hw},${base - y0} Q${x},${base - y0 + 30} ${x - hw},${base - y0}Z`;
    s += `<path class="roof" d="${d}"/><path d="${d}" fill="url(#pTiles)" opacity=".7"/><path class="eave" stroke-width="5" d="M${x + hw},${base - y0} Q${x},${base - y0 + 30} ${x - hw},${base - y0}"/>`;
  }
  s += `<path class="snow" d="M${x - 196},${base - 418} L${x + 196},${base - 418} L${x + 176},${base - 404} Q${x},${base - 396} ${x - 176},${base - 404}Z"/>`;
  s += lantern(x - 120, base - 240, 1.3, lights, true) + lantern(x + 120, base - 240, 1.3, lights, true);
  spill(x, base + 8, 260, lights);
  for (const [px, fl] of [[x - 296, 1], [x + 296, -1]]) {
    s += `<g transform="translate(${px} ${base}) scale(${fl} 1)"><rect fill="url(#gStone)" x="-38" y="-42" width="76" height="42" rx="3"/>
      <path fill="url(#gStone)" d="M-30,-42 Q-32,-112 6,-120 Q36,-120 32,-88 Q26,-72 32,-42Z"/><circle fill="url(#gStone)" cx="10" cy="-106" r="21"/>
      <circle fill="#5a584e" cx="17" cy="-110" r="4"/><path d="M-10,-122 q6,-14 20,-8 q14,-8 22,6" stroke="#6f6c60" stroke-width="5" fill="none"/></g>`;
  }
  return s;
}

function layerGround(r, lights) {
  const f = 1, w = W + 400, ink = new Ink(), back = new Ink();
  let s = '';
  for (let x = -40; x < 1900; x += 30 + r() * 50) {
    if (Math.abs(x - 560) < 70 || Math.abs(x - 1240) < 70) continue;
    s += bamboo(x, groundY(x) - 18, 360 + r() * 400, 12 + r() * 7, r, back, { lean: (r() - 0.5) * 7 });
  }
  s += back.out();
  // земля с травой и цветами
  let d = `M-20,${H} `;
  for (let x = -20; x <= w; x += 20) d += `L${x},${P(groundY(x))} `;
  s += `<path fill="url(#gGround)" d="${d}L${w},${H}Z"/>`;
  const grass = new Ink();
  for (let x = -20; x < w; x += 5 + r() * 5) {
    if (x > TEA.x0 - 30 && x < TEA.x1 + 30) continue;
    if (x > RIVER.x0 + 20 && x < RIVER.x1 - 20) continue;
    if (x > LAKE.x0 + 20 && x < LAKE.x1 - 20) continue;
    const y = groundY(x) + 4, hh = 10 + r() * 22, lean = (r() - 0.5) * 14;
    grass.add(r() < 0.5 ? 'blade' : 'blade2', `M${P(x - 2)},${P(y)}Q${P(x + lean * 0.4)},${P(y - hh * 0.6)} ${P(x + lean)},${P(y - hh)}Q${P(x + lean * 0.3 + 1)},${P(y - hh * 0.5)} ${P(x + 2)},${P(y)}Z`);
    if (r() < 0.06) { const fy = y - hh * 0.6; grass.add(r() < 0.5 ? 'flowerA' : 'flowerB', circ(x + lean * 0.6, fy, 3.2) + circ(x + lean * 0.6 + 5, fy + 2, 2.6)); }
  }
  s += grass.out();
  // река и мост
  const { x0, x1, bridge0: b0, bridge1: b1 } = RIVER;
  s += `<rect fill="url(#gWater)" x="${x0 - 40}" y="900" width="${x1 - x0 + 80}" height="100"/>`;
  for (let i = 0; i < 9; i++) fx(1, `<path class="ripple" d="M${x0 + i * 62},${926 + (i % 3) * 20} q20,-6 40,0" style="animation-delay:${-i * 0.5}s"/>`);
  for (const [lx0, ly, rr] of [[x0 + 90, 942, 22], [x1 - 120, 966, 18], [x0 + 300, 975, 16]]) ink.add('lily', ell(lx0, ly, rr, rr * 0.28));
  ink.add('flowerA', circ(x1 - 112, 960, 5) + circ(x0 + 96, 936, 4));
  for (let i = 0; i < 14; i++) { const rx0 = x0 - 30 + r() * 60 + (i > 6 ? x1 - x0 : 0); ink.add('reed', `M${P(rx0)},960q${P((r() - 0.5) * 10)},-40 ${P((r() - 0.5) * 16)},-${P(60 + r() * 40)}`); }
  let ropes = '';
  for (let x = b0; x <= b1; x += 18) {
    const y = bridgeY(x);
    s += `<rect fill="url(#gDeck)" x="${x - 7}" y="${P(y - 2)}" width="15" height="9" rx="1.5"/>`;
    if ((x - b0) % 72 === 0) ropes += `<line class="rope" x1="${x}" y1="${P(y)}" x2="${x}" y2="${P(y - 60)}"/>`;
  }
  let hand = `M${b0},${P(bridgeY(b0) - 60)} `;
  for (let x = b0; x <= b1; x += 30) hand += `L${x},${P(bridgeY(x) - 60)} `;
  s += ropes + `<path class="rope" d="${hand}" fill="none"/>`;
  for (const px of [b0 - 10, b1 + 10]) s += `<rect fill="url(#gTrunk)" x="${px - 8}" y="${P(groundY(px) - 92)}" width="16" height="102"/>`;
  // тропа: утоптанная земля и камни
  // утоптанная тропа короткими кусками (см. Ink)
  for (let c = 0; c < W; c += 480) {
    let dp = '';
    for (let x = c; x <= c + 480; x += 30) {
      if ((x > b0 - 20 && x < b1 + 20) || (x > TEA.x0 - 30 && x < TEA.x1 + 30) || (x > LAKE.x0 && x < LAKE.x1)) { dp += ' '; continue; }
      dp += `${dp.endsWith(' ') || !dp ? 'M' : 'L'}${x},${P(groundY(x) + 20)}`;
    }
    if (dp.trim()) s += `<path class="dirt" d="${dp.trim()}"/>`;
  }
  for (let x = 30; x < W; x += 46 + r() * 20) {
    if ((x > b0 - 20 && x < b1 + 20) || (x > TEA.x0 - 20 && x < TEA.x1 + 20) || (x > LAKE.x0 - 20 && x < LAKE.x1 + 20)) continue;
    const cy = groundY(x) + 18 + r() * 8, rx = 18 + r() * 10;
    s += `<ellipse cx="${P(x)}" cy="${P(cy + 2)}" rx="${P(rx)}" ry="${P(6 + r() * 3)}" fill="#000" opacity=".18"/><ellipse fill="url(#gStone)" cx="${P(x)}" cy="${P(cy)}" rx="${P(rx)}" ry="${P(6 + r() * 3)}"/>`;
  }
  for (const x of [180, 1050, 1720, 2000, 2760, 3210, 6560, 7250]) s += rock(x, groundY(x) + 10, 90 + r() * 80, 50 + r() * 44, ink);
  for (const x of [820, 1520, 2860, 3420, 4550, 6480, 7020]) s += stoneLantern(x, groundY(x) - 2, lights);
  s += decoPanda(300, groundY(300) - 4, 0.9, { item: 'bamboo' });
  s += decoPanda(1680, groundY(1680) - 4, 0.75, { hat: 'straw', item: 'basket' }, true);
  s += decoPanda(2780, groundY(2780) - 4, 0.8, { hat: 'band', item: 'staff' });
  // деревня
  s += house(3470, groundY(3470) + 6, 0.95, lights, ink) + house(4020, groundY(4020) + 6, 1.15, lights, ink, { floors: 2, sign: '店' }) + house(4600, groundY(4600) + 6, 0.9, lights, ink, { sign: '福' });
  s += lanternString(3620, 3860, 470, 26, 4, lights) + lanternString(4200, 4440, 470, 26, 4, lights);
  s += decoPanda(3760, groundY(3760) - 4, 0.8, { hat: 'straw', item: 'basket' }) + decoPanda(4420, groundY(4420) - 4, 0.75, { robe: 'monk', item: 'broom' }, true);
  for (const x of [3330, 4260, 4880]) s += `<path class="pot" d="M${x - 22},${P(groundY(x) - 2)} h44 l-7,-32 h-30Z"/>` + bamboo(x, groundY(x) - 32, 120, 6, r, ink, { lean: 4 });
  s += teaHouse(lights, r, ink);
  s += gate(6760, groundY(6760) + 4, lights);
  s += groundSummer(r, ink, lights);
  // осень в тумане
  for (let x = FOG_X + 50; x < w; x += 110 + r() * 90) {
    const cy = groundY(x) - 160, rx = 80 + r() * 50, ry = 130 + r() * 50;
    s += `<rect fill="url(#gTrunk)" x="${P(x - 8)}" y="${P(groundY(x) - 60)}" width="16" height="80"/>`;
    ink.add('autumnD', ell(x + 8, cy + 8, rx, ry));
    ink.add('autumn', ell(x, cy, rx * 0.85, ry * 0.85));
  }
  return { f, w, svg: s + ink.out() };
}

function layerFront(r, lights) {
  const f = 1.4, w = layerW(f);
  let s = '';
  for (const X of [-40, 120, 1880, 3260, 7150, 12150]) {
    const x = lx(X, f), ink = new Ink();
    let g = '';
    for (let i = 0; i < 3; i++) g += bamboo(x + i * 48, 1050, 1120, 32 + r() * 10, r, ink, { grad: 'gBamFront', lf: ['leaffront', 'leaffront2', 'leaffront'], node: 'bamfrontn', lean: (r() - 0.5) * 6 });
    s += `<g>${g}${ink.out()}</g>`;
  }
  const bx = lx(2400, f), ink = new Ink();
  for (let i = 0; i < 20; i++) ink.add(i % 2 ? 'leaffront' : 'leaffront2', leafD(bx - 270 + i * 22, 30 + Math.sin(i) * 22, 54, 70 + (r() - 0.5) * 60, 0.2));
  s += `<g><path class="trunkfront" d="M${P(bx - 320)},-10 Q${P(bx - 100)},64 ${P(bx + 150)},40" stroke-width="18" fill="none"/>${ink.out()}</g>`;
  const fx = lx(4150, f);
  let fence = '';
  for (let i = 0; i < 6; i++) fence += `<rect fill="url(#gBamFront)" x="${P(fx + i * 130)}" y="${P(820 + (i % 2) * 20)}" width="24" height="220" rx="7"/>`;
  s += `<g>${fence}<path class="ropefront" d="M${P(fx)},880 Q${P(fx + 330)},920 ${P(fx + 670)},880" fill="none"/></g>`;
  for (const X of [5000, 6400]) s += `<rect class="pillarfront" x="${P(lx(X, f) - 50)}" y="-20" width="100" height="1100"/>`;
  s += `<g>${lantern(lx(5600, f), 120, 2.2, lights, true)}${lantern(lx(6200, f), 90, 2, lights, true)}</g>`;
  const gr = new Ink();
  for (let x = 0; x < w; x += 60 + r() * 120) {
    if (x > lx(TEA.x0 - 100, f) && x < lx(TEA.x1 + 100, f)) continue;
    for (let i = 0; i < 5; i++) gr.add('grassfront', `M${P(x + i * 8)},1010q${P(-10 + r() * 20)},-${P(50 + r() * 80)} ${P(-14 + r() * 30)},-${P(90 + r() * 70)}`);
  }
  s += gr.out();
  return { f, w, svg: s };
}


// ---------- Глава 2 «Лето» ----------
function pagoda(x, base, s, lights, tiers = 5) {
  let g = '';
  let y = base;
  for (let i = 0; i < tiers; i++) {
    const w = (120 - i * 16) * s, h = (54 - i * 4) * s, l = x - w / 2;
    g += `<rect fill="url(#gWall)" x="${P(l)}" y="${P(y - h)}" width="${P(w)}" height="${P(h)}"/>`;
    for (const px of [l, l + w - 8 * s]) g += `<rect fill="url(#gPillar)" x="${P(px)}" y="${P(y - h)}" width="${P(8 * s)}" height="${P(h)}"/>`;
    g += `<rect class="win" x="${P(x - 10 * s)}" y="${P(y - h * 0.75)}" width="${P(20 * s)}" height="${P(h * 0.5)}"/>`;
    lights.push(glow(x, y - h * 0.5, 50 * s, true));
    const T = y - h, ov = 34 * s, rl = l - ov, rr = l + w + ov;
    const d = `M${P(rl)},${P(T)} Q${P(l)},${P(T - 6 * s)} ${P(l + 10 * s)},${P(T - 22 * s)} L${P(l + w - 10 * s)},${P(T - 22 * s)} Q${P(l + w)},${P(T - 6 * s)} ${P(rr)},${P(T)} Q${P(x)},${P(T + 14 * s)} ${P(rl)},${P(T)}Z`;
    g += `<path class="roof" d="${d}"/><path d="${d}" fill="url(#pTiles)" opacity=".7"/><path class="eave" stroke-width="${P(4 * s)}" d="M${P(rr)},${P(T)} Q${P(x)},${P(T + 14 * s)} ${P(rl)},${P(T)}"/>`;
    g += lantern(rl + 8 * s, T + 14 * s, s * 0.6, lights, i % 2 === 0) + lantern(rr - 8 * s, T + 14 * s, s * 0.6, lights);
    y = T - 20 * s;
  }
  g += `<path class="ridge" stroke-width="${P(5 * s)}" d="M${P(x)},${P(y + 18 * s)} V${P(y - 30 * s)}"/><circle class="gold" cx="${P(x)}" cy="${P(y - 32 * s)}" r="${P(6 * s)}"/>`;
  return g;
}

function stall(x, base, s, color, sign, lights, ink, r) {
  const w = 170 * s, l = x - w / 2, top = base - 150 * s;
  let g = `<ellipse cx="${P(x)}" cy="${P(base + 2)}" rx="${P(w * 0.6)}" ry="${P(10 * s)}" fill="#000" opacity=".2"/>`;
  for (const px of [l + 6 * s, l + w - 14 * s]) g += `<rect fill="url(#gTrunk)" x="${P(px)}" y="${P(top)}" width="${P(8 * s)}" height="${P(base - top)}"/>`;
  g += `<rect fill="url(#gDeck)" x="${P(l - 6 * s)}" y="${P(base - 62 * s)}" width="${P(w + 12 * s)}" height="${P(14 * s)}" rx="${P(3 * s)}"/>
    <rect fill="url(#gWall)" x="${P(l)}" y="${P(base - 48 * s)}" width="${P(w)}" height="${P(48 * s)}"/>`;
  // товары на прилавке
  const goods = ['orange', 'apple', 'melon'];
  for (let i = 0; i < 9; i++) ink.add('good-' + goods[i % 3], circ(l + 18 * s + i * 16 * s, base - 70 * s - (i % 2) * 6 * s, (7 + r() * 3) * s));
  ink.add('basketw', `M${P(l + 10 * s)},${P(base - 62 * s)}h${P(46 * s)}l${P(-6 * s)},${P(-22 * s)}h${P(-34 * s)}Z`);
  // полосатый навес с фестонами
  const aw = `M${P(l - 18 * s)},${P(top + 30 * s)} L${P(l + 10 * s)},${P(top - 8 * s)} H${P(l + w - 10 * s)} L${P(l + w + 18 * s)},${P(top + 30 * s)}` +
    Array.from({ length: 6 }, (_, i) => { const x1 = l + w + 18 * s - (i + 1) * (w + 36 * s) / 6; return ` Q${P(x1 + (w + 36 * s) / 12)},${P(top + 46 * s)} ${P(x1)},${P(top + 30 * s)}`; }).join('') + 'Z';
  g += `<path d="${aw}" style="fill:${color}"/><path d="${aw}" fill="url(#pStripe)" opacity=".55"/><path class="eave" stroke-width="${P(3 * s)}" d="M${P(l - 18 * s)},${P(top + 30 * s)} L${P(l + 10 * s)},${P(top - 8 * s)} H${P(l + w - 10 * s)} L${P(l + w + 18 * s)},${P(top + 30 * s)}"/>`;
  g += `<rect class="plaque" x="${P(x - 22 * s)}" y="${P(top - 46 * s)}" width="${P(44 * s)}" height="${P(36 * s)}" rx="${P(4 * s)}"/><text class="callig gold-t" x="${P(x)}" y="${P(top - 18 * s)}" text-anchor="middle" style="font-size:${P(26 * s)}px">${sign}</text>`;
  g += lantern(l + 4 * s, top + 52 * s, s * 0.7, lights, true) + lantern(l + w - 4 * s, top + 52 * s, s * 0.7, lights);
  spill(x, base + 8, w * 0.6, lights);
  return g;
}

function prayerFlags(x0, x1, y, sag, ink) {
  const cols = ['flagR', 'flagY', 'flagG', 'flagB', 'flagW'];
  let g = `<path class="rope" fill="none" d="M${x0},${y} Q${(x0 + x1) / 2},${y + sag * 2} ${x1},${y}"/>`;
  const n = Math.floor((x1 - x0) / 34);
  for (let i = 1; i < n; i++) {
    const t = i / n, x = x0 + (x1 - x0) * t, yy = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag * 2) + t * t * y;
    ink.add(cols[i % 5], `M${P(x - 10)},${P(yy)}h20l-10,${24}Z`);
  }
  return g;
}

function midSummer(f, r, ink, lights) {
  let s = '';
  // рисовые террасы на склоне
  const a = lx(7150, f), b = lx(8850, f);
  s += `<path fill="url(#gCliff)" d="M${P(a - 100)},940 Q${P(a + 200)},420 ${P((a + b) / 2)},400 Q${P(b - 200)},420 ${P(b + 100)},940Z" opacity=".35"/>`;
  for (let i = 0; i < 8; i++) {
    const y = 900 - i * 52, ins = 40 + i * 46;
    const d = `M${P(a + ins)},${y} Q${P((a + b) / 2)},${y - 30} ${P(b - ins)},${y} L${P(b - ins)},${y + 28} Q${P((a + b) / 2)},${y - 2} ${P(a + ins)},${y + 28}Z`;
    s += `<path class="paddy" d="${d}"/><path class="paddyedge" d="M${P(a + ins)},${y} Q${P((a + b) / 2)},${y - 30} ${P(b - ins)},${y}"/>`;
    for (let x = a + ins + 14; x < b - ins - 10; x += 16 + r() * 6) {
      const t = (x - a - ins) / (b - a - 2 * ins), yy = y + 22 - 30 * 4 * t * (1 - t) * 0.5;
      ink.add('rice', `M${P(x)},${P(yy)}l-3,-12M${P(x)},${P(yy)}l0,-14M${P(x)},${P(yy)}l3,-12`);
    }
  }
  s += house(lx(8300, f), 520, 0.4, lights, ink);
  // озеро лотосов с павильоном
  const c = lx(8800, f), d2 = lx(10450, f), m = (c + d2) / 2;
  s += `<rect fill="url(#gLake)" x="${P(c)}" y="740" width="${P(d2 - c)}" height="200"/>`;
  for (let i = 0; i < 10; i++) ink.add('shine', `M${P(c + 40 + r() * (d2 - c - 120))},${P(760 + r() * 150)}h${P(40 + r() * 80)}`);
  for (let i = 0; i < 26; i++) {
    const x = c + 30 + r() * (d2 - c - 60), y = 770 + r() * 150, rr = 12 + r() * 14;
    ink.add('lily', ell(x, y, rr, rr * 0.32));
    if (r() < 0.4) { ink.add('lotus', `M${P(x - 8)},${P(y - 2)}q8,-22 16,0z`); ink.add('lotusL', `M${P(x - 4)},${P(y - 2)}q4,-14 8,0z`); }
  }
  s += `<g transform="translate(0 0)">${house(m, 790, 0.45, lights, ink, { deck: 60 })}</g>`;
  s += `<path fill="#6a4424" d="M${P(m - 200)},840 h120 l-14,16 h-92z"/>${decoPanda(m - 150, 842, 0.35, { hat: 'straw' })}`;
  // рынок: дома второго ряда и гирлянда
  s += house(lx(10700, f), 860, 0.5, lights, ink, { floors: 2 }) + house(lx(11250, f), 860, 0.45, lights, ink) + house(lx(11850, f), 860, 0.5, lights, ink, { floors: 2 });
  s += lanternString(lx(10650, f), lx(11300, f), 560, 30, 7, lights) + lanternString(lx(11350, f), lx(12000, f), 560, 30, 7, lights);
  // монастырь на холме с лестницей
  const h = lx(12900, f);
  const hill = `M${P(h - 420)},940 Q${P(h - 300)},520 ${P(h - 80)},420 L${P(h + 80)},420 Q${P(h + 300)},520 ${P(h + 420)},940Z`;
  s += `<path d="${hill}" fill="url(#gCliff)"/><path d="${hill}" fill="url(#gLit)"/>`;
  for (let i = 0; i < 6; i++) ink.add('treetop', circ(h - 300 + r() * 600, 560 + r() * 300, 20 + r() * 16));
  let st = '';
  for (let i = 0; i < 14; i++) { const y = 920 - i * 36, x = h + (i % 2 ? 60 : -60) * Math.sin(i * 0.8); st += `<rect fill="url(#gStone)" x="${P(x - 40)}" y="${P(y)}" width="80" height="10" rx="2"/>`; }
  s += st + pagoda(h, 430, 1.3, lights);
  s += prayerFlags(h - 380, h - 90, 600, 30, ink) + prayerFlags(h + 90, h + 380, 600, 30, ink);
  // летние деревья вдоль главы 2
  for (let x = lx(7150, f); x < lx(FOG_X, f); x += 160 + r() * 200) {
    if (x > c - 40 && x < d2 + 40) continue;
    const cy = 760 + r() * 60, rx = 60 + r() * 40, ry = 90 + r() * 50;
    s += `<rect fill="url(#gTrunk)" x="${P(x - 6)}" y="800" width="12" height="140"/>`;
    ink.add('leafB', ell(x + 6, cy + 8, rx, ry)); ink.add('leafA', ell(x, cy, rx * 0.85, ry * 0.85)); ink.add('leafC', ell(x - rx * 0.3, cy - ry * 0.4, rx * 0.3, ry * 0.25));
  }
  return s;
}

function groundSummer(r, ink, lights) {
  let s = '';
  // террасы: пугало, фермеры, рис у тропы
  for (let x = 7150; x < 8800; x += 9 + r() * 6) {
    const y = groundY(x) + 34 + r() * 20;
    if (r() < 0.6) ink.add('rice', `M${P(x)},${P(y)}l-4,-18M${P(x)},${P(y)}l0,-22M${P(x)},${P(y)}l4,-18`);
  }
  const sx = 7900, sy = groundY(7900);
  s += `<path class="trunkfront" stroke-width="8" d="M${sx},${P(sy)} V${P(sy - 150)} M${sx - 50},${P(sy - 110)} H${sx + 50}"/>
    <circle fill="#e8d7a8" cx="${sx}" cy="${P(sy - 168)}" r="20"/><path fill="#d9b66b" stroke="#8a6a32" stroke-width="2" d="M${sx - 40},${P(sy - 176)} L${sx},${P(sy - 206)} L${sx + 40},${P(sy - 176)}Z"/>
    <path fill="#c23a2b" d="M${sx - 34},${P(sy - 130)} h68 l-8,50 h-52z"/>`;
  s += decoPanda(7300, groundY(7300) - 4, 0.8, { hat: 'straw', item: 'basket' }) + decoPanda(8600, groundY(8600) - 4, 0.75, { hat: 'straw', robe: 'jade', item: 'broom' }, true);
  for (const x of [7700, 8450]) s += stoneLantern(x, groundY(x) - 2, lights);
  // озеро: вода перед тропой, мостки, рыбак, лотосы
  const { x0, x1 } = LAKE;
  let wd = `M${x0},1000 `;
  for (let x = x0; x <= x1; x += 20) wd += `L${x},${P(groundY(x) + 28)} `;
  s += `<path fill="url(#gWater)" d="${wd}L${x1},1000Z"/>`;
  for (let x = x0 + 10; x < x1; x += 22) s += `<rect fill="url(#gDeck)" x="${x}" y="${P(groundY(x) + 6)}" width="18" height="12" rx="2"/>`;
  for (let x = x0 + 40; x < x1; x += 160) s += `<rect fill="url(#gTrunk)" x="${x - 5}" y="${P(groundY(x) + 14)}" width="10" height="${P(1000 - groundY(x))}"/>`;
  for (let i = 0; i < 9; i++) fx(1, `<path class="ripple" d="M${x0 + 60 + i * 150},${930 + (i % 3) * 22} q20,-6 40,0" style="animation-delay:${-i * 0.4}s"/>`);
  for (let i = 0; i < 30; i++) {
    const x = x0 + 20 + r() * (x1 - x0 - 40), y = groundY(x) + 60 + r() * 100, rr = 16 + r() * 16;
    ink.add('lily', ell(x, y, rr, rr * 0.3));
    if (r() < 0.45) { ink.add('lotus', `M${P(x - 10)},${P(y - 2)}q10,-28 20,0z`); ink.add('lotusL', `M${P(x - 5)},${P(y - 2)}q5,-18 10,0z`); }
  }
  const fx0 = 9450, fy = groundY(fx0);
  s += decoPanda(fx0, fy + 6, 0.75, { hat: 'straw', robe: 'night' }) + `<path stroke="#5a3a1a" stroke-width="3" fill="none" d="M${fx0 + 30},${P(fy - 60)} L${fx0 + 150},${P(fy - 150)}"/><path stroke="#eee" stroke-width="1.2" fill="none" d="M${fx0 + 150},${P(fy - 150)} Q${fx0 + 170},${P(fy - 40)} ${fx0 + 168},${P(fy + 70)}"/>`;
  // рынок: прилавки, покупатели, гирлянды
  const stalls = [[10560, '#c23a2b', '果'], [11020, '#2f8a63', '茶'], [11620, '#2f5bb0', '布'], [12000, '#e0a92a', '鱼']];
  for (const [x, col, sign] of stalls) s += stall(x, groundY(x) - 6, 1, col, sign, lights, ink, r);
  s += lanternString(10500, 10900, 440, 22, 4, lights) + lanternString(11500, 11900, 440, 22, 4, lights);
  s += decoPanda(10820, groundY(10820) - 4, 0.75, { item: 'basket' }) + decoPanda(11280, groundY(11280) - 4, 0.75, { hat: 'lotus', robe: 'red', item: 'fan' }, true) + decoPanda(11820, groundY(11820) - 4, 0.7, { item: 'umbrella' });
  // монастырь: колокол, курильница, монахи, флажки
  const bx = 12650, by = groundY(bx);
  s += `<rect fill="url(#gPillar)" x="${bx - 70}" y="${P(by - 200)}" width="14" height="200"/><rect fill="url(#gPillar)" x="${bx + 56}" y="${P(by - 200)}" width="14" height="200"/>
    <path class="roof" d="M${bx - 120},${P(by - 196)} Q${bx - 60},${P(by - 206)} ${bx - 50},${P(by - 240)} H${bx + 50} Q${bx + 60},${P(by - 206)} ${bx + 120},${P(by - 196)} Q${bx},${P(by - 176)} ${bx - 120},${P(by - 196)}Z"/>
    <path fill="#a67c3a" stroke="#5a3a14" stroke-width="3" d="M${bx - 34},${P(by - 70)} Q${bx - 36},${P(by - 160)} ${bx},${P(by - 166)} Q${bx + 36},${P(by - 160)} ${bx + 34},${P(by - 70)}Z"/>
    <path stroke="#5a3a14" stroke-width="3" d="M${bx - 30},${P(by - 100)} h60 M${bx - 32},${P(by - 82)} h64"/>`;
  const ix = 13250, iy = groundY(ix);
  s += `<path fill="#4a4a3a" d="M${ix - 40},${P(iy - 10)} Q${ix - 46},${P(iy - 70)} ${ix},${P(iy - 72)} Q${ix + 46},${P(iy - 70)} ${ix + 40},${P(iy - 10)}Z"/><rect fill="#3a3a2a" x="${ix - 48}" y="${P(iy - 80)}" width="96" height="12" rx="4"/>`;
  fx(1, `<path class="smoke" d="M${ix},${P(iy - 84)} q12,-40 -4,-80 q-14,-40 8,-90" fill="none"/>`);
  lights.push(glow(ix, iy - 80, 60, true));
  s += decoPanda(12500, groundY(12500) - 4, 0.8, { hat: 'scholar', robe: 'monk', item: 'book' }) + decoPanda(13400, groundY(13400) - 4, 0.75, { robe: 'monk', item: 'staff' }, true);
  s += prayerFlags(12200, 12560, 520, 24, ink) + prayerFlags(12780, 13150, 520, 24, ink);
  for (const x of [12250, 13650]) s += stoneLantern(x, groundY(x) - 2, lights);
  // Врата лета
  s += gate(14050, groundY(14050) + 4, lights, '夏');
  return s;
}

const DEFS = `<defs>
  <radialGradient id="gGlow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset=".3" stop-color="#ff9a3c" stop-opacity=".42"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient>
  <radialGradient id="gCore"><stop offset="0" stop-color="#fffbe8" stop-opacity="1"/><stop offset=".5" stop-color="#ffd27a" stop-opacity=".6"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
  <radialGradient id="gSpill"><stop offset="0" stop-color="#ffb860" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a3c" stop-opacity="0"/></radialGradient>
  <radialGradient id="gLan" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffb070"/><stop offset=".35" stop-color="#e2452f"/><stop offset="1" stop-color="#8a1c10"/></radialGradient>
  <linearGradient id="gMist" x1="0" y1="0" x2="0" y2="1">${stop(0, 'var(--mist)', 0)}${stop(0.6, 'var(--mist)', 0.75)}${stop(1, 'var(--mist)', 0.25)}</linearGradient>
  <radialGradient id="gCloud">${stop(0, 'var(--mist)', 0.75)}${stop(1, 'var(--mist)', 0)}</radialGradient>
  <linearGradient id="gM1" x1="0" y1="0" x2="0" y2="1">${stop(0, mixc('var(--m1)', 85, '#5a7a8a'))}${stop(0.55, 'var(--m1)')}${stop(1, 'var(--mist)')}</linearGradient>
  <linearGradient id="gM2" x1="0" y1="0" x2="0" y2="1">${stop(0, mixc('var(--m2)', 80, '#3a5a6a'))}${stop(0.6, 'var(--m2)')}${stop(1, mixc('var(--m2)', 40, 'var(--mist)'))}</linearGradient>
  <linearGradient id="gM3" x1="0" y1="0" x2="0" y2="1">${stop(0, mixc('var(--m3)', 75, '#1f3a3a'))}${stop(0.5, 'var(--m3)')}${stop(1, mixc('var(--m3)', 45, 'var(--mist)'))}</linearGradient>
  <linearGradient id="gLit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff4d6" stop-opacity=".5"/><stop offset=".42" stop-color="#fff4d6" stop-opacity=".08"/><stop offset=".6" stop-color="#0a2030" stop-opacity="0"/><stop offset="1" stop-color="#0a2030" stop-opacity=".28"/></linearGradient>
  <linearGradient id="gCliff" x1="0" y1="0" x2="0" y2="1">${stop(0, mixc('var(--cliff)', 70, '#fff'))}${stop(0.25, 'var(--cliff)')}${stop(0.75, 'var(--cliff2)')}${stop(1, mixc('var(--cliff2)', 50, 'var(--mist)'))}</linearGradient>
  <linearGradient id="gBam" x1="0" y1="0" x2="1" y2="0">${stop(0, mixc('var(--bam)', 55, '#fff'))}${stop(0.28, 'var(--bam)')}${stop(0.75, mixc('var(--bam)', 80, '#000'))}${stop(1, mixc('var(--bam)', 55, '#000'))}</linearGradient>
  <linearGradient id="gBamFar" x1="0" y1="0" x2="1" y2="0">${stop(0, mixc('var(--bamfar)', 70, '#fff'))}${stop(0.4, 'var(--bamfar)')}${stop(1, mixc('var(--bamfar)', 82, '#000'))}</linearGradient>
  <linearGradient id="gBamFront" x1="0" y1="0" x2="1" y2="0">${stop(0, mixc('var(--front)', 75, '#9ab'))}${stop(0.35, 'var(--front)')}${stop(1, mixc('var(--front)', 50, '#000'))}</linearGradient>
  <linearGradient id="gTrunk" x1="0" y1="0" x2="1" y2="0">${stop(0, mixc('var(--trunk)', 70, '#fff'))}${stop(0.4, 'var(--trunk)')}${stop(1, mixc('var(--trunk)', 55, '#000'))}</linearGradient>
  <linearGradient id="gGround" x1="0" y1="0" x2="0" y2="1">${stop(0, 'var(--grass)')}${stop(0.06, 'var(--ground)')}${stop(0.5, mixc('var(--ground)', 80, '#203018'))}${stop(1, mixc('var(--ground)', 45, '#101a0c'))}</linearGradient>
  <linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6e0dc"/><stop offset=".35" stop-color="#4aa6b5"/><stop offset="1" stop-color="#1c4f63"/></linearGradient>
  <linearGradient id="gFall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9fbff" stop-opacity=".75"/><stop offset=".5" stop-color="#c4f0f2" stop-opacity=".95"/><stop offset="1" stop-color="#ffffff" stop-opacity=".95"/></linearGradient>
  <linearGradient id="gFallH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a6a70" stop-opacity=".45"/><stop offset=".25" stop-color="#fff" stop-opacity=".0"/><stop offset=".55" stop-color="#fff" stop-opacity=".35"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#2a6a70" stop-opacity=".45"/></linearGradient>
  <radialGradient id="gFoam"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".6" stop-color="#f4fbff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="gStone" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e2ded0"/><stop offset=".55" stop-color="#a9a696"/><stop offset="1" stop-color="#6c695c"/></radialGradient>
  <radialGradient id="gRock" cx=".35" cy=".25" r=".85"><stop offset="0" stop-color="#b8c0b4"/><stop offset=".6" stop-color="#7c867c"/><stop offset="1" stop-color="#4a524a"/></radialGradient>
  <linearGradient id="gPillar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8513a"/><stop offset=".35" stop-color="#a3301e"/><stop offset="1" stop-color="#5a140a"/></linearGradient>
  <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4226"/><stop offset=".25" stop-color="#9a683c"/><stop offset="1" stop-color="#7a4e2a"/></linearGradient>
  <linearGradient id="gDeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a87a4a"/><stop offset="1" stop-color="#5a3a1e"/></linearGradient>
  <linearGradient id="gDoor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3018"/><stop offset=".5" stop-color="#7a4422"/><stop offset="1" stop-color="#4a2612"/></linearGradient>
  <linearGradient id="gRoofShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  <linearGradient id="gTeaWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22130a"/><stop offset=".45" stop-color="#4a2e1c"/><stop offset="1" stop-color="#5e3b22"/></linearGradient>
  <linearGradient id="gFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5630"/><stop offset="1" stop-color="#3a2010"/></linearGradient>
  <radialGradient id="gMoonWin" cx=".6" cy=".3" r=".9"><stop offset="0" stop-color="#4a5a90"/><stop offset=".6" stop-color="#1e2a54"/><stop offset="1" stop-color="#0c1430"/></radialGradient>
  <linearGradient id="gPorcShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#6a7a9a" stop-opacity=".35"/></linearGradient>
  <radialGradient id="gOrange" cx=".35" cy=".3"><stop offset="0" stop-color="#ffc46a"/><stop offset=".6" stop-color="#f08a1f"/><stop offset="1" stop-color="#b85a0a"/></radialGradient>
  <linearGradient id="gCandle" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6e0"/><stop offset="1" stop-color="#d9c49a"/></linearGradient>
  <linearGradient id="gLake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe8e8"/><stop offset=".4" stop-color="#6fbcc4"/><stop offset="1" stop-color="#2f7d8a"/></linearGradient>
  <pattern id="pStripe" width="28" height="10" patternUnits="userSpaceOnUse"><rect width="14" height="10" fill="#fff"/></pattern>
  <pattern id="pTiles" width="12" height="16" patternUnits="userSpaceOnUse"><path d="M1.5,0V16" stroke="#000" stroke-opacity=".38" stroke-width="3"/><path d="M7,0V16" stroke="#fff" stroke-opacity=".14" stroke-width="2.5"/><path d="M0,15Q6,10.5 12,15" stroke="#000" stroke-opacity=".22" fill="none" stroke-width="1.5"/></pattern>
  <pattern id="pPlank" width="16" height="240" patternUnits="userSpaceOnUse"><path d="M0.5,0V240" stroke="#2a160a" stroke-opacity=".55" stroke-width="1.5"/><path d="M6,20q2,40 0,80M10,120q-2,50 1,100" stroke="#fff" stroke-opacity=".08" fill="none" stroke-width="1.2"/></pattern>
  <pattern id="pLattice" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M0,17 H34 M17,0 V34" stroke="#2a170c" stroke-width="5"/><rect x="10" y="10" width="14" height="14" fill="none" stroke="#2a170c" stroke-width="3"/></pattern>
  <pattern id="pLatSmall" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0,6H12M6,0V12" stroke="#3a2210" stroke-width="2"/></pattern>
  <filter id="fFar" x="-2%" y="-10%" width="104%" height="120%"><feGaussianBlur stdDeviation="1.4"/></filter>
  <filter id="fMid" x="-2%" y="-10%" width="104%" height="120%"><feGaussianBlur stdDeviation=".7"/></filter>
  <filter id="fSoft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="fFront" x="-20%" y="-5%" width="140%" height="110%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="fFront2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
  ${PANDA_DEFS}
</defs>`;

export function buildScene() {
  const r = rng(20261120);
  FX = {};
  const lights = { 0.3: [], 0.6: [], 1: [], 1.4: [] };
  const layers = [layerFar(r), layerMountains(r, lights[0.3]), layerMid(r, lights[0.6]), layerGround(r, lights[1]), layerFront(r, lights[1.4])];
  const wrap = (L, body) => `<svg class="scene" data-w="${L.w}" viewBox="0 0 ${L.w} ${H}" preserveAspectRatio="xMinYMin meet">${DEFS}${body}</svg>`;
  return {
    layers: layers.map((L) => ({ f: L.f, w: L.w, html: wrap(L, L.svg), raw: DEFS + L.svg, fx: FX[L.f] ? wrap(L, FX[L.f].join('')) : '' })),
    lights: Object.entries(lights).map(([f, arr]) => {
      const L = { f: +f, w: layerW(+f) };
      return { f: L.f, w: L.w, html: wrap(L, arr.join('')), raw: DEFS + arr.join('') };
    }),
  };
}
