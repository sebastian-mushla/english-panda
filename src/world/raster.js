// Растеризация слоёв мира: каждый SVG-слой рисуется в холсты-куски шириной 1000 единиц.
// В памяти держим только куски рядом с камерой, остальные освобождаем и дорисовываем при подходе:
// иначе на телефонах (особенно iPhone) вкладка вылетает из-за нехватки памяти.
import { VW } from './geo.js';
import { glowAt } from './sky.js';

const CHUNK = 1000;
// переменные сезона, которые нужны SVG-слоям (в картинке нет <body>, поэтому подставляем значения)
const VARS = ['--m1', '--m2', '--m3', '--mist', '--snow', '--leaf1', '--leaf2', '--leaffar', '--bam', '--bamfar', '--ground', '--grass',
  '--pine', '--pine2', '--trunk', '--cliff', '--cliff2', '--moss', '--blossom', '--blossom2', '--roof', '--summer', '--front', '--rainbow'];

let css = null, layers = [], scale = 1, gen = 0, running = false, cam = 0, view = 1800, idle = [];

async function sheet() {
  if (css === null) css = await fetch('styles/world.css').then((r) => r.text()).catch(() => '');
  return css;
}

function varsBlock(glow) {
  const cs = getComputedStyle(document.body);
  const q = (Math.round(glow * 10) / 10).toFixed(1), d = (Math.round(Math.max(0, 1 - glow) * 10) / 10).toFixed(1);
  return `svg{${VARS.map((v) => `${v}:${cs.getPropertyValue(v).trim()}`).join(';')};--glowq:${q};--dayq:${d};--f-cn:'Songti SC','STKaiti','Noto Serif CJK SC',serif}`;
}

function load(src) {
  return new Promise((res, rej) => { const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = src; });
}

// Куски, которые должны быть в памяти, и куски, которые можно выбросить
const range = (L, a, b) => [Math.max(0, Math.floor((cam * L.f + view * a) / CHUNK)), Math.min(Math.ceil(L.w / CHUNK) - 1, Math.floor((cam * L.f + view * b) / CHUNK))];

function free(cv) { cv.width = 0; cv.height = 0; cv.remove(); }

// layers: [{f, w, raw, el, q}] — q: доля разрешения экрана (дальние слои и свет можно рисовать мягче)
export async function setupRaster(list, s) {
  const my = ++gen;
  await sheet();
  if (my !== gen) return;
  for (const L of layers) for (const cv of L.chunks?.values() || []) if (cv) free(cv);
  layers = list;
  scale = s;
  for (const L of layers) L.chunks = new Map();
  pump();
}

export function updateRaster(camX, viewW) {
  cam = camX; view = viewW;
  for (const L of layers) {
    const [k0, k1] = range(L, -2.2, 3.2);
    for (const [i, cv] of L.chunks) if (i < k0 || i > k1) { if (cv) free(cv); L.chunks.delete(i); }
  }
  pump();
}

// Следующий нужный кусок: ближайший к центру экрана
function nextTask() {
  let best = null;
  for (const L of layers) {
    const [k0, k1] = range(L, -0.8, 1.8);
    for (let i = k0; i <= k1; i++) {
      if (L.chunks.has(i)) continue;
      const d = Math.abs(i * CHUNK + CHUNK / 2 - (cam * L.f + view / 2)) / Math.max(0.3, L.f);
      if (!best || d < best.d) best = { L, i, d };
    }
  }
  return best;
}

async function pump() {
  if (running) return;
  running = true;
  const my = gen;
  for (let tk = nextTask(); tk && my === gen; tk = nextTask()) {
    const { L, i } = tk;
    L.chunks.set(i, null); // занято, чтобы не взять второй раз
    const cv = await draw(L, i).catch(() => null);
    if (my !== gen) { if (cv) free(cv); break; }
    if (!L.chunks.has(i)) { if (cv) free(cv); continue; } // пока рисовали, кусок стал не нужен
    if (cv) { L.el.append(cv); L.chunks.set(i, cv); } else L.chunks.delete(i);
    await new Promise((r) => setTimeout(r, 0));
  }
  running = false;
  if (my !== gen) return pump();
  idle.splice(0).forEach((r) => r());
}

// Обещание: все куски вокруг камеры нарисованы
export function rasterIdle() {
  if (!running && !nextTask()) return Promise.resolve();
  return new Promise((r) => idle.push(r));
}

async function draw(L, i) {
  const x0 = i * CHUNK, cw = Math.min(CHUNK, L.w - x0);
  const pw = Math.ceil(cw * scale * L.q) + 1, ph = Math.ceil(1000 * scale * L.q);
  const worldX = (x0 + CHUNK / 2 - (1 - L.f) * VW / 2) / L.f;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} 0 ${cw} 1000" width="${pw}" height="${ph}" preserveAspectRatio="none"><style>${css}${varsBlock(glowAt(worldX))}</style>${L.raw}</svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  try {
    const img = await load(url);
    const cv = document.createElement('canvas');
    cv.width = pw; cv.height = ph;
    cv.getContext('2d').drawImage(img, 0, 0);
    img.src = ''; // сразу отпускаем декодированную картинку: на iOS сборщик мусора не успевает
    cv.className = 'chunk';
    cv.style.cssText = `left:calc(${x0}px * var(--s));width:calc(${cw}px * var(--s) + 1px)`;
    return cv;
  } finally {
    URL.revokeObjectURL(url);
  }
}
