// Лобби: горизонтальный мир с параллаксом, камень-уровень на тропе, панды-NPC, карта внизу.
import { state, save, on, emit } from '../state.js';
import { t } from '../i18n.js';
import { W, ZONES, NODE_X, NPC_X, walkY, zoneAt, groundY, CH2_X, FOG_X } from './geo.js';
import { buildScene } from './scenery.js';
import { applyPhase, applySeason } from './sky.js';
import { setupRaster, updateRaster, rasterIdle } from './raster.js';
import { stepParticles, setParticleMood } from './particles.js';
import { pandaSVG } from './panda.js';
import { LEVELS, isUnlocked, currentLevel } from '../learn/curriculum.js';
import { setWater, sfx } from '../audio.js';

const $ = (s) => document.querySelector(s);
let s = 1, viewW = 1800, cam = state.cam || 0, target = cam, paused = false;
let layerEls = [], rasterLayers = [], rasterS = 0, overlay, playerEl, handlers = {}, zoneId = '', lastPhaseCam = -1e9, season = 'spring', lastPhase = null;

export function initLobby(h) {
  handlers = h;
  const scene = buildScene();
  const root = $('#layers');
  // Все статичные слои (горы, роща, земля, передний план, свет) рисуются в картинки-куски (raster.js).
  // Живыми SVG остаются только маленькие анимации (струи водопада, рябь, пламя).
  // q — доля разрешения: дальнее, передний план и свет мягкие и так, их можно рисовать грубее.
  const phone = innerWidth < 760 || matchMedia('(pointer: coarse)').matches;
  const Q = { 0.12: phone ? 0.45 : 0.55, 0.3: phone ? 0.55 : 0.65, 0.6: phone ? 0.7 : 0.8, 1: phone ? 1 : Math.min(devicePixelRatio || 1, 1.25), 1.4: 0.5 };
  root.innerHTML = scene.layers.map((L) => `<div class="layer" data-f="${L.f}" data-raster></div>` +
    (L.fx ? `<div class="layer fxlayer" data-f="${L.f}">${L.fx}</div>` : '')).join('');
  const rEls = root.querySelectorAll('.layer[data-raster]');
  rasterLayers = scene.layers.map((L, i) => ({ f: L.f, w: L.w, raw: L.raw, el: rEls[i], q: Q[L.f] }));
  // слои света идут над тонировкой, чтобы фонари светились ночью
  const lightsRoot = document.createElement('div');
  lightsRoot.id = 'lights';
  lightsRoot.innerHTML = scene.lights.map((L) => `<div class="layer lightlayer" data-f="${L.f}"></div>`).join('');
  $('#tint').after(lightsRoot);
  lightsRoot.querySelectorAll('.lightlayer').forEach((el, i) => rasterLayers.push({ ...scene.lights[i], el, q: phone ? 0.35 : 0.5 }));
  document.body.classList.toggle('phone', phone);
  overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.className = 'layer';
  overlay.dataset.f = '1';
  $('#world').append(overlay);
  layerEls = [...document.querySelectorAll('#world .layer')].map((el) => ({ el, f: +el.dataset.f, svg: el.querySelector(':scope > svg.scene') }));

  season = applySeason();
  resize();
  renderOverlay();
  renderMinimap();
  bindInput();
  on('lang', () => { renderOverlay(); renderMinimap(); updateZone(true); });
  on('progress', () => { renderOverlay(); renderMinimap(); });
  on('equip', () => renderOverlay());
  on('view', () => { season = applySeason(); lastPhaseCam = -1e9; redraw(); });
  addEventListener('resize', resize);
  redraw();
  requestAnimationFrame(frame);
}

function resize() {
  if (!innerHeight || !innerWidth) return; // скрытая вкладка: размеров ещё нет
  s = innerHeight / 1000;
  viewW = innerWidth / s;
  document.documentElement.style.setProperty('--s', s);
  for (const L of layerEls) {
    if (!L.svg) continue;
    const w = +L.svg.dataset.w;
    L.svg.setAttribute('width', Math.ceil(w * s));
    L.svg.setAttribute('height', Math.ceil(1000 * s));
  }
  target = clamp(target);
  cam = clamp(cam);
  lastPhaseCam = -1e9;
  applyCam(true);
  // куски перерисовываются, только если высота окна заметно изменилась
  if (rasterS && Math.abs(s - rasterS) / rasterS > 0.15) { clearTimeout(redrawT); redrawT = setTimeout(redraw, 400); }
}

let redrawT = 0, lastRasterCam = -1e9;
function redraw() {
  if (!innerHeight) return;
  rasterS = s;
  setupRaster(rasterLayers, s).then(() => updateRaster(cam, viewW));
  lastRasterCam = cam;
}

const clamp = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(W - viewW, x)) : 0);

function applyCam(force) {
  if (force || Math.abs(cam - lastRasterCam) > 80) { lastRasterCam = cam; updateRaster(cam, viewW); }
  for (const L of layerEls) L.el.style.transform = `translate3d(${(-cam * L.f * s).toFixed(1)}px,0,0)`;
  const mm = $('#mm-view');
  if (mm) { mm.style.left = (cam / W * 100) + '%'; mm.style.width = (viewW / W * 100) + '%'; }
  if (force || Math.abs(cam - lastPhaseCam) > 3) {
    lastPhaseCam = cam;
    const center = cam + viewW / 2;
    lastPhase = applyPhase(center, viewW);
    setParticleMood(season, Math.min(1, lastPhase.stars), center > 5050 && center < 6350);
    setWater(Math.max(0, 1 - Math.abs(center - 2420) / 1300));
    updateZone();
    if (center > 5100 && center < 6300 && !state.stats.teaVisited) { state.stats.teaVisited = true; save(); emit('stat'); }
  }
}

function updateZone(force) {
  const center = cam + viewW / 2, z = zoneAt(center);
  if (z.id !== zoneId || force) {
    zoneId = z.id;
    const s2 = applySeason(center); // сезон «по главе» меняется при переходе между главами
    if (s2 !== season) { season = s2; lastPhaseCam = -1e9; }
    handlers.onZone?.(z);
  }
}

let lastT = 0;
function frame(time) {
  requestAnimationFrame(frame);
  if (paused) return;
  const prev = cam;
  if (!dragging) {
    target = clamp(target + vel);
    vel *= 0.92;
    if (Math.abs(vel) < 0.05) vel = 0;
  }
  cam += (target - cam) * (dragging ? 0.5 : 0.12);
  if (Math.abs(target - cam) < 0.05) cam = target;
  if (cam !== prev) applyCam();
  stepParticles((cam - prev) * s * 0.6, time);
  if (time - lastT > 2000 && Math.abs(state.cam - cam) > 50) { lastT = time; state.cam = Math.round(cam); save(); }
}

// ---------- Ввод ----------
let dragging = false, vel = 0, lastX = 0, moved = 0;
function bindInput() {
  const world = $('#world');
  world.addEventListener('wheel', (e) => {
    if (paused) return;
    e.preventDefault();
    let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (e.deltaMode === 1) d *= 32;
    target = clamp(target + d / s * 1.1);
    vel = 0;
  }, { passive: false });
  world.addEventListener('pointerdown', (e) => {
    if (paused || e.button) return;
    dragging = true; moved = 0; lastX = e.clientX; vel = 0;
  });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
    target = clamp(target - dx / s);
    vel = -dx / s * 0.6;
    if (moved > 6) document.body.classList.add('dragging');
  });
  addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    setTimeout(() => document.body.classList.remove('dragging'), 0);
  });
  addEventListener('keydown', (e) => {
    if (paused || e.target.closest?.('input,textarea') || document.querySelector('.modal')) return;
    if (e.key === 'ArrowRight' || e.key === 'd') target = clamp(target + viewW * 0.35);
    if (e.key === 'ArrowLeft' || e.key === 'a') target = clamp(target - viewW * 0.35);
    if (e.key === 'Home') target = 0;
    if (e.key === 'End') target = clamp(W);
  });
  // клик после перетаскивания не считается
  world.addEventListener('click', (e) => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
}

// ---------- Камни уровней, панды, туман ----------
function stars(n) {
  const st = state.levels[n]?.stars || [];
  return [0, 1, 2].map((i) => `<i class="${st[i] ? 'on' : ''}">★</i>`).join('');
}

function renderOverlay() {
  const cur = currentLevel();
  let h = '';
  LEVELS.forEach((l, i) => {
    const x = NODE_X[i], y = walkY(x);
    const done = !!state.levels[l.n]?.stars?.[0], open = isUnlocked(l.n);
    const cls = done ? 'done' : open ? 'current' : 'locked';
    h += `<button class="node ${cls}${l.exam ? ' exam' : ''}" data-n="${l.n}" style="--x:${x};--y:${y}" aria-label="${t('level')} ${l.n}">
      <span class="stone"><b>${l.exam ? (l.ch === 2 ? '夏' : '春') : l.n}</b>${open ? '' : '<em class="lock">🔒</em>'}</span>
      ${done ? `<span class="nstars">${stars(l.n)}</span>` : ''}</button>`;
  });
  const npc = [
    ['book', { hat: 'scholar', robe: 'monk', item: 'book' }, '📖', t('book')],
    ['shop', { hat: 'lotus', robe: 'red', item: 'fan' }, '🏮', t('shop')],
    ['dict', { hat: 'straw', robe: 'night', item: 'scroll' }, '📜', t('dict')],
  ];
  for (const [id, look, icon, label] of npc) {
    const x = NPC_X[id];
    h += `<button class="npc" data-npc="${id}" style="--x:${x};--y:${groundY(x)}" aria-label="${label}">
      <span class="npcsign"><i>${icon}</i>${label}</span>${pandaSVG(look)}</button>`;
  }
  // туман закрывает следующую главу: лето — пока не пройдены Врата весны, потом осень
  const ch2open = !!state.levels[10]?.stars?.[0];
  const fx = ch2open ? FOG_X : CH2_X, fsx = fx + 300;
  h += `<div class="fogwall" style="--x:${fx - 20};--fw:${W - fx + 200}"></div>
    <div class="fogsign" style="--x:${fsx};--y:${groundY(fsx)}"><b>${t(ch2open ? 'zone.fog' : 'zone.fog1')}</b><span>${t(ch2open ? 'soon' : 'locked')}</span><small>${t(ch2open ? 'fogText2' : 'fogText')}</small></div>`;
  const px = NODE_X[cur - 1];
  h += `<div class="player" style="--x:${px};--y:${walkY(px)}">${pandaSVG(state.equip)}</div>`;
  overlay.innerHTML = h;
  playerEl = overlay.querySelector('.player');
  overlay.querySelectorAll('.node').forEach((b) => b.addEventListener('click', () => { sfx('click'); handlers.onLevel?.(+b.dataset.n); }));
  overlay.querySelectorAll('.npc').forEach((b) => b.addEventListener('click', () => { sfx('click'); handlers.onNpc?.(b.dataset.npc); }));
}

// Панда идёт от одного камня к другому
export function walkTo(from, to) {
  if (!playerEl) return;
  const a = NODE_X[from - 1], b = NODE_X[to - 1];
  playerEl.style.setProperty('--x', a); playerEl.style.setProperty('--y', walkY(a));
  focus(to);
  requestAnimationFrame(() => {
    playerEl.classList.add('walking');
    playerEl.style.setProperty('--x', b); playerEl.style.setProperty('--y', walkY(b));
    setTimeout(() => playerEl?.classList.remove('walking'), 1600);
  });
}

export function focus(n) { jump(NODE_X[n - 1]); }
export function focusX(x) { jump(x); }

// Дальний переход (карта внизу, «К уровню»): короткое затемнение, камера сразу на месте,
// дорисовываются только куски этой зоны. Раньше камера пролетала весь мир, игра рисовала
// каждый промежуточный кусок, и на iPhone вкладка вылетала из-за памяти.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let jumping = false;
async function jump(x) {
  const to = clamp(x - viewW / 2);
  vel = 0;
  if (Math.abs(to - cam) < viewW * 1.2 || jumping) { target = to; return; }
  jumping = true;
  const world = $('#world');
  world.classList.add('jumping');
  await wait(200);
  target = cam = to;
  applyCam(true);
  await Promise.race([rasterIdle(), wait(1200)]);
  world.classList.remove('jumping');
  jumping = false;
}
export function setPaused(p) { paused = p; document.body.classList.toggle('paused', p); }

// ---------- Карта мира внизу ----------
function renderMinimap() {
  const mm = $('#minimap');
  const cur = currentLevel();
  mm.innerHTML = `<button class="mm-arrow" data-d="-1" aria-label="◀">◀</button>
    <div class="mm-bar">${ZONES.map((z) => `<button class="mm-zone mm-${z.id}" data-x="${z.x0}" style="width:${(z.x1 - z.x0) / W * 100}%"><i>${z.icon}</i><span>${t('zone.' + z.id)}</span></button>`).join('')}
      ${NODE_X.map((x, i) => `<b class="mm-dot ${state.levels[i + 1]?.stars?.[0] ? 'done' : i + 1 === cur ? 'cur' : ''}" style="left:${x / W * 100}%"></b>`).join('')}
      <div id="mm-view"></div></div>
    <button class="mm-arrow" data-d="1" aria-label="▶">▶</button>
    <button class="mm-go">🐼 <span>${t('toCurrent')}</span></button>`;
  mm.querySelectorAll('.mm-zone').forEach((b) => b.addEventListener('click', () => { focusX(+b.dataset.x + viewW / 2 - 100); }));
  mm.querySelectorAll('.mm-arrow').forEach((b) => b.addEventListener('click', () => { target = clamp(target + +b.dataset.d * viewW * 0.6); }));
  mm.querySelector('.mm-go').addEventListener('click', () => focus(currentLevel()));
  applyCam(true);
}
