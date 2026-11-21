// Фаза дня и сезон: цвета неба, тонировка сцены, сила света фонарей, звёзды, солнце и луна.
import { state } from '../state.js';
import { TEA } from './geo.js';

// Ключевые точки по мировой координате X (центр экрана)
const KEYS = [
  { x: 0, name: 'dawn', sky: ['#f3b9a8', '#f8dcc4', '#d6eee4'], tint: [255, 160, 130, 0.14], glow: 0.35, stars: 0.15, rays: 0.9, sun: [0.12, 0.66] },
  { x: 1300, name: 'day', sky: ['#7cc6d8', '#bfe6e0', '#eef6e8'], tint: [255, 255, 255, 0], glow: 0.08, stars: 0, rays: 0.6, sun: [0.35, 0.16] },
  { x: 2500, name: 'noon', sky: ['#5fb4cf', '#a6dde0', '#e9f7ef'], tint: [200, 255, 240, 0.04], glow: 0.06, stars: 0, rays: 0.5, sun: [0.52, 0.08] },
  { x: 3700, name: 'golden', sky: ['#e3a873', '#f5d09a', '#f2e6c2'], tint: [255, 170, 80, 0.14], glow: 0.35, stars: 0, rays: 0.9, sun: [0.72, 0.36] },
  { x: 4650, name: 'sunset', sky: ['#9c4f6e', '#e8805a', '#f6bd78'], tint: [210, 80, 70, 0.24], glow: 0.8, stars: 0.2, rays: 0.55, sun: [0.86, 0.74] },
  { x: 5700, name: 'tea', sky: ['#2a2346', '#5a3b5e', '#8a5a5a'], tint: [60, 28, 10, 0.32], glow: 1, stars: 0.5, rays: 0, sun: [0.95, 1.2] },
  { x: 6750, name: 'night', sky: ['#0b1430', '#1b2b55', '#334a7c'], tint: [12, 22, 64, 0.5], glow: 1, stars: 1, rays: 0, sun: [0.95, 1.3] },
  { x: 8600, name: 'night', sky: ['#0b1430', '#1b2b55', '#334a7c'], tint: [12, 22, 64, 0.52], glow: 1, stars: 1, rays: 0, sun: [0.95, 1.3] },
];

// Реальное время суток → ближайший ключ
function keyForHour(h) {
  if (h >= 5 && h < 8) return KEYS[0];
  if (h >= 8 && h < 12) return KEYS[1];
  if (h >= 12 && h < 16) return KEYS[2];
  if (h >= 16 && h < 18) return KEYS[3];
  if (h >= 18 && h < 21) return KEYS[4];
  return KEYS[6];
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixC = (a, b, t) => {
  const A = hex(a), B = hex(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const mix = (a, b, t) => a + (b - a) * t;

function lerpKey(a, b, t) {
  return {
    name: t < 0.5 ? a.name : b.name,
    sky: a.sky.map((c, i) => mixC(c, b.sky[i], t)),
    tint: a.tint.map((v, i) => mix(v, b.tint[i], t)),
    glow: mix(a.glow, b.glow, t), stars: mix(a.stars, b.stars, t), rays: mix(a.rays, b.rays, t),
    sun: [mix(a.sun[0], b.sun[0], t), mix(a.sun[1], b.sun[1], t)],
  };
}

function phaseAt(x) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i], b = KEYS[i + 1];
    if (x <= b.x) return lerpKey(a, b, Math.max(0, (x - a.x) / (b.x - a.x)));
  }
  return KEYS[KEYS.length - 1];
}

let last = '';
// Сила света фонарей в точке мира (для растеризованных кусков: окна светятся там, где вечер и ночь)
export function glowAt(x) {
  if (state.view.time === 'real') return x > TEA.x0 && x < TEA.x1 ? 1 : keyForHour(new Date().getHours()).glow;
  return phaseAt(x).glow;
}

export function applyPhase(centerX, viewW) {
  let p;
  if (state.view.time === 'real') {
    p = lerpKey(keyForHour(new Date().getHours()), keyForHour(new Date().getHours()), 0);
    // внутри чайного дома всегда тёплый свет
    const inside = Math.max(0, Math.min(1, (Math.min(centerX + viewW / 2, TEA.x1) - Math.max(centerX - viewW / 2, TEA.x0)) / viewW));
    if (inside > 0) p = lerpKey(p, KEYS[5], inside);
  } else p = phaseAt(centerX);
  const key = p.sky.join() + p.tint.map((v) => v.toFixed(2)).join() + p.glow.toFixed(2);
  if (key === last) return p;
  last = key;
  // переменные ставим на сами слои: смена на корне пересчитывала бы стили тысяч SVG-элементов
  const sky = document.getElementById('sky').style, root = document.documentElement.style;
  sky.setProperty('--sky1', p.sky[0]); sky.setProperty('--sky2', p.sky[1]); sky.setProperty('--sky3', p.sky[2]);
  sky.setProperty('--stars', p.stars.toFixed(3));
  sky.setProperty('--sunx', (p.sun[0] * 100).toFixed(1) + '%');
  sky.setProperty('--suny', (p.sun[1] * 100).toFixed(1) + '%');
  sky.setProperty('--moon', Math.max(0, p.stars - 0.3).toFixed(2));
  sky.setProperty('--day', Math.max(0, 1 - p.glow).toFixed(2));
  sky.setProperty('--rays', p.rays.toFixed(3));
  document.getElementById('tint').style.background = `rgba(${p.tint.slice(0, 3).map(Math.round).join(',')},${p.tint[3].toFixed(3)})`;
  const lights = document.getElementById('lights');
  if (lights) lights.style.setProperty('--glow', p.glow.toFixed(3));
  // для SVG-слоёв значения грубые (шаг 0.1) и меняются редко
  const gq = (Math.round(p.glow * 10) / 10).toFixed(1), dq = (Math.round(Math.max(0, 1 - p.glow) * 10) / 10).toFixed(1);
  if (root.getPropertyValue('--glowq') !== gq) root.setProperty('--glowq', gq);
  if (root.getPropertyValue('--dayq') !== dq) root.setProperty('--dayq', dq);
  if (document.body.dataset.phase !== p.name) document.body.dataset.phase = p.name;
  return p;
}

export const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
export function currentSeason() {
  return state.view.season === 'auto' ? 'spring' : state.view.season;
}
export function applySeason() {
  const s = currentSeason();
  SEASONS.forEach((n) => document.body.classList.toggle('season-' + n, n === s));
  last = '';
  return s;
}
