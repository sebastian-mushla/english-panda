// Растеризация слоёв мира: каждый SVG-слой один раз рисуется в холсты-куски шириной 1000 единиц.
// При прокрутке двигаются готовые картинки, браузеру не нужно заново рисовать тысячи элементов SVG.
import { VW } from './geo.js';
import { glowAt } from './sky.js';

const CHUNK = 1000;
// переменные сезона, которые нужны SVG-слоям (в картинке нет <body>, поэтому подставляем значения)
const VARS = ['--m1', '--m2', '--m3', '--mist', '--snow', '--leaf1', '--leaf2', '--leaffar', '--bam', '--bamfar', '--ground', '--grass',
  '--pine', '--pine2', '--trunk', '--cliff', '--cliff2', '--moss', '--blossom', '--blossom2', '--roof', '--summer', '--front', '--rainbow'];

let css = null, job = 0;

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

// layers: [{f, w, raw, el}], s — масштаб экрана, camX — текущая камера (сначала рисуем ближнее)
export async function rasterize(layers, s, camX, viewW) {
  const my = ++job;
  const style = await sheet();
  const tasks = [];
  for (const L of layers) {
    const q = L.f === 1 ? Math.min(devicePixelRatio || 1, 1.25) : 1;
    L.fresh = [];
    for (let x0 = 0; x0 < L.w; x0 += CHUNK) {
      const worldX = (x0 + CHUNK / 2 - (1 - L.f) * VW / 2) / L.f;
      const screenX = x0 - camX * L.f;
      tasks.push({ L, x0, q, worldX, dist: Math.abs(screenX + CHUNK / 2 - viewW / 2) });
    }
  }
  tasks.sort((a, b) => a.dist - b.dist);
  for (const tk of tasks) {
    if (my !== job) return;
    const { L, x0, q } = tk;
    const cw = Math.min(CHUNK, L.w - x0);
    const pw = Math.ceil(cw * s * q) + 1, ph = Math.ceil(1000 * s * q);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} 0 ${cw} 1000" width="${pw}" height="${ph}" preserveAspectRatio="none"><style>${style}${varsBlock(glowAt(tk.worldX))}</style>${L.raw}</svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    try {
      const img = await load(url);
      if (my !== job) return;
      const cv = document.createElement('canvas');
      cv.width = pw; cv.height = ph;
      cv.getContext('2d').drawImage(img, 0, 0);
      cv.className = 'chunk';
      cv.style.cssText = `left:calc(${x0}px * var(--s));width:calc(${cw}px * var(--s) + 1px)`;
      cv.dataset.x = x0;
      // заменить старый кусок (после смены сезона или размера окна)
      L.el.querySelector(`canvas.chunk[data-x="${x0}"]`)?.remove();
      L.el.append(cv);
    } catch { /* кусок не нарисовался — просто пропускаем */ }
    URL.revokeObjectURL(url);
    await new Promise((r) => setTimeout(r, 0));
  }
}
