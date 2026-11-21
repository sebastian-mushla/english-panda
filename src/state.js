// Сохранение прогресса игрока в localStorage (один игрок на браузер).
// У каждого изучаемого языка своё сохранение: английский — ep.save.v1, русский — ep.save.v1.ru, чешский — ep.save.v1.cz.
const read = (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } };
export const TARGET = ['en', 'ru', 'cz'].includes(read('ep.target', 'en')) ? read('ep.target', 'en') : 'en';
const KEY = 'ep.save.v1' + (TARGET === 'en' ? '' : '.' + TARGET);

const fresh = () => ({
  v: 1,
  name: read('ep.name', ''),
  lang: read('ep.lang', TARGET === 'ru' || /^cs|^sk/i.test(navigator.language || '') ? 'cz' : 'ru'),
  sound: true,
  coins: 60,
  levels: {},        // {n: {stars:[done, perfect, nohint], plays}}
  words: {},         // {en: {box, due, seen, right, wrong}}
  mobs: {},          // {id: count}
  owned: ['hat:none', 'robe:none', 'item:none'],
  equip: { hat: 'none', robe: 'none', item: 'none' },
  upgrades: {},      // {id: level}
  ach: {},           // {id: timestamp}
  daily: null,       // {date, kind, prog, goal, done}
  stats: { hints: 0, perfect: 0, maxCombo: 0, noHintLevels: 0, right: 0, teaVisited: false },
  certs: [],
  view: { season: 'auto', time: 'scroll' },
  cam: 0,
  welcomed: false,
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      const f = fresh();
      return { ...f, ...s, stats: { ...f.stats, ...s.stats }, view: { ...f.view, ...s.view }, equip: { ...f.equip, ...s.equip } };
    }
  } catch { /* приватный режим или битые данные */ }
  return fresh();
}

export const state = load();

let timer = 0;
export function save() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* нет места или запрещено */ }
  }, 150);
}

// Смена языка интерфейса и изучаемого языка: язык обучения = отдельное сохранение, поэтому перезагрузка
export function setLanguages(native, target) {
  if (native === target) target = native === 'ru' ? (TARGET === 'cz' ? 'cz' : 'en') : (TARGET === 'ru' ? 'ru' : 'en');
  state.lang = native;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    localStorage.setItem('ep.lang', native);
    localStorage.setItem('ep.name', state.name || '');
    localStorage.setItem('ep.target', target);
  } catch { /* нет доступа к хранилищу */ }
  location.reload();
}

export function resetAll() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  location.reload();
}

// Простая шина событий: 'coins', 'lang', 'progress', 'equip', 'view'
const subs = {};
export const on = (ev, fn) => ((subs[ev] ||= []).push(fn), fn);
export const off = (ev, fn) => { const a = subs[ev]; if (a) a.splice(a.indexOf(fn) >>> 0, 1); };
export const emit = (ev, data) => (subs[ev] || []).forEach((fn) => fn(data));

export function addCoins(n) {
  state.coins = Math.max(0, state.coins + n);
  save();
  emit('coins', n);
}

export const today = () => new Date().toISOString().slice(0, 10);

export function totalStars() {
  return Object.values(state.levels).reduce((s, l) => s + l.stars.filter(Boolean).length, 0);
}

export const upg = (id) => state.upgrades[id] || 0;
