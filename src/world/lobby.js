// Лобби: горизонтальный мир с параллаксом, камень-уровень на тропе, панды-NPC, карта внизу.
import { state, save, on, emit } from '../state.js';
import { t } from '../i18n.js';
import { W, ZONES, NPC_X, walkY, zoneAt, groundY, CH2_X, CH3_X, CH4_X, CH5_X, FOG_X } from './geo.js';
import { CH3_OPEN, CH4_OPEN, CH5_OPEN } from '../learn/words.js';
import { ADMIN_OPEN } from '../adminFlags.js';
import { buildScene } from './scenery.js';
import { applyPhase, applySeason } from './sky.js';
import { setupRaster, updateRaster, rasterIdle } from './raster.js';
import { stepParticles, setParticleMood } from './particles.js';
import { pandaSVG } from './panda.js';
import { LEVELS, isUnlocked, currentLevel, NODE_X, EXAM_N } from '../learn/curriculum.js';
import { ENTRANCE, ENTRANCE_DEFS } from './entrances.js';
import { setWater, sfx } from '../audio.js';

const $ = (s) => document.querySelector(s);
let s = 1, viewW = 1800, cam = state.cam || 0, target = cam, paused = false;
// Фоны зон из картинок: x и w в единицах слоя (мир × f), высота — весь экран
// Каждая картинка лежит на слое f = 0.6 и видна, пока камера в своей зоне; края уходят в туман и перекрываются с соседями
const ART_ZONES = ['bamboo', 'falls', 'village', 'tea', 'gate', 'terraces', 'lake', 'market', 'monastery', 'sgate', 'maple', 'harvest',
  'ferry', 'academy', 'agate', 'snowwood', 'icelake', 'lanternfest', 'hermit', 'wgate', 'fog3'];
const ART_BG = ZONES.filter((z) => ART_ZONES.includes(z.id)).map((z) => (z.x0 === 0
  ? { src: 'assets/zones/' + z.id + '.webp', f: 0.6, x: 0, w: 2900, first: true }
  : { src: 'assets/zones/' + z.id + '.webp', f: 0.6, x: Math.round(z.x0 * 0.6 - 500), w: Math.round((z.x1 - z.x0) * 0.6 + 2000) }));
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
  // нарисованные фоны зон (картинки) лежат над средним планом и уходят в туман справа
  root.querySelectorAll('.layer[data-raster]')[2].insertAdjacentHTML('afterend', ART_BG.map((b) =>
    `<div class="layer artbg" data-f="${b.f}"><img class="${b.first ? 'first' : ''}" src="${b.src}" alt="" loading="lazy" decoding="async" onerror="this.remove()" style="left:calc(var(--s)*${b.x}px);width:calc(var(--s)*${b.w}px)"></div>`).join(''));
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
  // живые слои анимаций — размером с экран: камера двигает viewBox, а не сам слой.
  // Слой шириной во весь мир (18 000+ px) на телефоне не помещался в видеопамять, и вкладка падала при прокрутке.
  for (const L of layerEls) {
    if (!L.svg) continue;
    L.svg.setAttribute('width', innerWidth);
    L.svg.setAttribute('height', innerHeight);
    L.svg.setAttribute('preserveAspectRatio', 'none');
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
  for (const L of layerEls) {
    if (L.svg) L.svg.setAttribute('viewBox', `${(cam * L.f).toFixed(1)} 0 ${viewW.toFixed(1)} 1000`);
    else L.el.style.transform = `translate3d(${(-cam * L.f * s).toFixed(1)}px,0,0)`;
  }
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

// Где стоит панда: у входа в место — сбоку, чтобы не загораживать дверь
const standX = (n) => NODE_X[n - 1] - (LEVELS[n - 1]?.place ? 150 : 0);

function renderOverlay() {
  const cur = currentLevel();
  let h = '';
  LEVELS.forEach((l, i) => {
    const x = NODE_X[i], y = walkY(x);
    const done = !!state.levels[l.n]?.stars?.[0], open = isUnlocked(l.n);
    const cls = done ? 'done' : open ? 'current' : 'locked';
    // вход в место большой темы рисуется прямо на объекте: дверь дома, пасть пещеры, ступени к фонтану…
    if (l.place) {
      h += `<button class="node entrance ${cls}" data-n="${l.n}" style="--x:${x};--y:${y}" aria-label="${t('level')} ${l.n} · ${t('place.' + l.place)}">
        <img class="ent ent-img" src="assets/doors/${l.place}.png" alt="" loading="lazy" onerror="this.parentNode.classList.add('noimg')">
        <svg class="ent ent-svg" viewBox="0 0 260 240" aria-hidden="true">${ENTRANCE_DEFS}${ENTRANCE[l.place]}</svg>
        <span class="ent-n"><b>${l.n}</b>${open ? '' : '<em class="lock">🔒</em>'}</span>
        ${done ? `<span class="nstars">${stars(l.n)}</span>` : ''}</button>`;
      return;
    }
    h += `<button class="node ${cls}${l.exam ? ' exam' : ''}" data-n="${l.n}" style="--x:${x};--y:${y}" aria-label="${t('level')} ${l.n}">
      <span class="stone"><b>${l.exam ? ({ 1: '春', 2: '夏', 3: '秋', 4: '冬', 5: '玉' })[l.ch] : l.n}</b>${open ? '' : '<em class="lock">🔒</em>'}</span>
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
  // Туман закрывает следующую главу: лето — до Врат весны, осень — до Врат лета (и всегда, если учишь не английский), зима — скоро
  // в режиме админа главы открыты: туман остаётся только у ещё не сделанной главы C1
  const done = (n) => ADMIN_OPEN || !!state.levels[n]?.stars?.[0];
  const [fx, label, sub, text] = !done(EXAM_N[1]) ? [CH2_X, 'zone.fog1', 'locked', 'fogText']
    : !done(EXAM_N[2]) ? [CH3_X, 'zone.fog', 'locked', 'fogText2']
      : !CH3_OPEN ? [CH3_X, 'zone.fog', 'soon', 'ch3Locked']
        : !done(EXAM_N[3]) ? [CH4_X, 'zone.fog2', 'locked', 'fogText3']
          : !CH4_OPEN ? [CH4_X, 'zone.fog2', 'soon', 'ch4Locked']
            : !done(EXAM_N[4]) ? [CH5_X, 'zone.fog3', 'locked', 'fogText5']
              : !CH5_OPEN ? [CH5_X, 'zone.fog3', 'soon', 'fogText4']
                : [FOG_X, 'zone.fog4', 'soon', 'fogText6'];
  const fsx = fx + 300;
  h += `<div class="fogwall" style="--x:${fx - 20};--fw:${W - fx + 200}"></div>
    <div class="fogsign" style="--x:${fsx};--y:${groundY(fsx)}"><b>${t(label)}</b><span>${t(sub)}</span><small>${t(text)}</small></div>`;
  const px = standX(cur);
  h += `<div class="player" style="--x:${px};--y:${walkY(px)}">${pandaSVG(state.equip)}</div>`;
  overlay.innerHTML = h;
  playerEl = overlay.querySelector('.player');
  overlay.querySelectorAll('.node').forEach((b) => b.addEventListener('click', () => { sfx('click'); handlers.onLevel?.(+b.dataset.n); }));
  overlay.querySelectorAll('.npc').forEach((b) => b.addEventListener('click', () => { sfx('click'); handlers.onNpc?.(b.dataset.npc); }));
}

// Панда идёт от одного камня к другому
export function walkTo(from, to) {
  if (!playerEl) return;
  const a = standX(from), b = standX(to);
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
