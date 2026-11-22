// Точка входа: лобби, панель, окна, запуск уровней.
import { state, save, on } from './state.js';
import { t } from './i18n.js';
import { initLobby, walkTo, focus, setPaused } from './world/lobby.js';
import { initHud, setZone } from './ui/hud.js';
import { openLevelCard } from './ui/levelCard.js';
import { runPlay } from './ui/play.js';
import { openBook } from './ui/book.js';
import { openShop } from './ui/shop.js';
import { openDict } from './ui/dictionary.js';
import { openModal } from './ui/modal.js';
import { buildPlay, buildReview, isUnlocked, currentLevel, LEVELS, levelDef } from './learn/curriculum.js';
import { openPlace, closePlace } from './ui/place.js';
import { startAmbient } from './audio.js';
import { checkAch } from './progress.js';
import { pandaSVG } from './world/panda.js';
import { langPickHTML, bindLangPick } from './ui/langpick.js';
import { ADMIN_HOST } from './adminFlags.js';

document.documentElement.lang = ({ cz: 'cs', uk: 'uk' })[state.lang] || 'ru';

let pendingWalk = null;

function start(n) {
  if (!isUnlocked(n)) return openLevelCard(n, start);
  // большая тема — вход в место с фазами
  if (levelDef(n).place) return openPlace(n, startPhase);
  setPaused(true);
  runPlay(buildPlay(n), {
    onExit: back,
    onNext: (k) => setTimeout(() => openLevelCard(k, start), 250),
  });
}

function startPhase(n, i) {
  closePlace();
  setPaused(true);
  runPlay(buildPlay(n, i), {
    // после фазы возвращаемся в то же место; если тема пройдена — в мир
    onExit: () => { back(); if (!state.levels[n]?.stars?.[0]) openPlace(n, startPhase); },
    onNext: (k, p) => setTimeout(() => (p != null && p < levelDef(k).phases.length ? startPhase(k, p) : openLevelCard(k, start)), 250),
  });
}

// Один этап уровня или фазы (для админки): без смены прогресса темы целиком
function runStage(n, phase, stage) {
  closePlace();
  setPaused(true);
  const play = buildPlay(n, phase);
  play.def = { ...play.def, stages: [stage] };
  runPlay(play, { onExit: back, onNext: back });
}

// автотест всех этапов: ?smoke=en-ru или ?smoke=all (только localhost)
const smoke = ADMIN_HOST && new URLSearchParams(location.search).get('smoke');
if (smoke) setTimeout(() => import('../tests/smoke.js').then((m) => m.runSmoke(smoke)), 800);
if (ADMIN_HOST) import('./ui/admin.js').then((m) => m.initAdmin({ start, startPhase, runStage, focus }));

function startReview(list) {
  if (!list.length) return;
  setPaused(true);
  runPlay(buildReview(list), { onExit: back });
}

function back() {
  setPaused(false);
  if (pendingWalk) { const [a, b] = pendingWalk; pendingWalk = null; setTimeout(() => walkTo(a, b), 300); }
}

on('progress', (p) => { if (p?.first && p.level < LEVELS.length) pendingWalk = [p.level, p.level + 1]; });
on('stat', checkAch);

initLobby({
  onLevel: (n) => openLevelCard(n, start),
  onNpc: (id) => (id === 'book' ? openBook() : id === 'shop' ? openShop() : openDict(startReview)),
  onZone: setZone,
});
initHud({ book: () => openBook(), shop: () => openShop(), dict: () => openDict(startReview) });

// Звук можно включить только после первого жеста пользователя
addEventListener('pointerdown', () => { if (state.sound) startAmbient(); }, { once: true });

// Масштаб экрана игры: интерфейс рассчитан примерно на 820 × 800; на планшете и большом мониторе
// увеличиваем до 2×, на телефоне и маленьком окне не уменьшаем
function gameZoom() {
  const z = Math.max(1, Math.min(2, innerHeight / 800, innerWidth / 820));
  document.documentElement.style.setProperty('--gz', z.toFixed(3));
}
gameZoom();
addEventListener('resize', gameZoom);


if (!state.welcomed) {
  const m = openModal(`<div class="welcome">
      <div class="w-panda">${pandaSVG({ hat: 'straw', robe: 'jade', item: 'scroll' })}</div>
      <h2>${t('welcome')}</h2>
      <p>${t('welcomeText')}</p>
      <label>${t('yourName')}<input class="name" maxlength="30" autocomplete="off"></label>
      ${langPickHTML()}
      <button class="btn red go">${t('go')} ▶</button>
    </div>`, { cls: 'small', closable: false });
  bindLangPick(m.body, () => { state.name = m.body.querySelector('.name').value.trim(); });
  m.body.querySelector('.go').addEventListener('click', () => {
    state.name = m.body.querySelector('.name').value.trim();
    state.welcomed = true; save(); m.close();
    focus(currentLevel());
  });
} else if (!state.cam) focus(currentLevel());
