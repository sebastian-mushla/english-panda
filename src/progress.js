// Достижения и задание дня.
import { state, save, addCoins, today, emit } from './state.js';
import { L, t } from './i18n.js';
import { toast } from './ui/modal.js';
import { knownCount } from './learn/srs.js';
import { sfx } from './audio.js';

export const ACH = [
  { id: 'first', icon: '🐾', name: { ru: 'Первый шаг', cz: 'První krok' }, text: { ru: 'Пройди первый уровень.', cz: 'Projdi první úroveň.' }, test: (s) => !!s.levels[1]?.stars?.[0] },
  { id: 'perfect', icon: '🖌️', name: { ru: 'Чистая кисть', cz: 'Čistý štětec' }, text: { ru: 'Собери 3 звезды на одном уровне.', cz: 'Získej 3 hvězdy v jedné úrovni.' }, test: (s) => s.stats.perfect > 0 },
  { id: 'words20', icon: '📜', name: { ru: 'Собиратель слов', cz: 'Sběratel slov' }, text: { ru: '20 слов в словаре.', cz: '20 slov ve slovníku.' }, test: () => knownCount() >= 20 },
  { id: 'words60', icon: '📚', name: { ru: 'Ходячий словарь', cz: 'Chodící slovník' }, text: { ru: '60 слов в словаре.', cz: '60 slov ve slovníku.' }, test: () => knownCount() >= 60 },
  { id: 'combo5', icon: '🃏', name: { ru: 'Танец карт', cz: 'Tanec karet' }, text: { ru: 'Комбо из 5 карт в дуэли.', cz: 'Kombo 5 karet v souboji.' }, test: (s) => s.stats.maxCombo >= 5 },
  { id: 'nohint3', icon: '🧠', name: { ru: 'Сам себе мастер', cz: 'Sám sobě mistrem' }, text: { ru: '3 уровня подряд без подсказок.', cz: '3 úrovně za sebou bez nápověd.' }, test: (s) => s.stats.noHintLevels >= 3 },
  { id: 'spirits5', icon: '👻', name: { ru: 'Охотник за духами', cz: 'Lovec duchů' }, text: { ru: '5 духов в Книге.', cz: '5 duchů v Knize.' }, test: (s) => Object.keys(s.mobs).length >= 5 },
  { id: 'shopper', icon: '👘', name: { ru: 'Модная панда', cz: 'Módní panda' }, text: { ru: 'Купи первый наряд в Лавке.', cz: 'Kup první oblek v Obchůdku.' }, test: (s) => s.owned.length > 3 },
  { id: 'tea', icon: '🍵', name: { ru: 'Чайная церемония', cz: 'Čajový obřad' }, text: { ru: 'Загляни в чайный дом.', cz: 'Nahlédni do čajovny.' }, test: (s) => s.stats.teaVisited },
  { id: 'gate', icon: '🏮', name: { ru: 'Хранитель весны', cz: 'Strážce jara' }, text: { ru: 'Пройди Врата весны и получи свиток.', cz: 'Projdi Bránou jara a získej svitek.' }, test: (s) => s.certs.some((c) => (c.ch || 1) === 1) },
  { id: 'summer', icon: '🔥', name: { ru: 'Хранитель лета', cz: 'Strážce léta' }, text: { ru: 'Пройди Врата лета и получи свиток A2.', cz: 'Projdi Bránou léta a získej svitek A2.' }, test: (s) => s.certs.some((c) => c.ch === 2) },
  { id: 'fisher', icon: '🎣', name: { ru: 'Рыбак долины', cz: 'Rybář údolí' }, text: { ru: 'Поймай 30 нужных рыб.', cz: 'Chyť 30 správných ryb.' }, test: (s) => (s.stats.fish || 0) >= 30 },
  { id: 'words120', icon: '🏯', name: { ru: 'Мудрец библиотеки', cz: 'Mudrc knihovny' }, text: { ru: '120 слов в словаре.', cz: '120 slov ve slovníku.' }, test: () => knownCount() >= 120 },
];

export function checkAch() {
  for (const a of ACH) {
    if (state.ach[a.id] || !a.test(state)) continue;
    state.ach[a.id] = Date.now();
    addCoins(15);
    sfx('coin');
    setTimeout(() => toast(`${t('achNew')}: <b>${L(a.name)}</b> · +15 <i class="coin"></i>`, a.icon), 300);
  }
  save();
}

export function ensureDaily() {
  const d = today();
  if (state.daily?.date === d) return state.daily;
  const kind = Number(d.slice(-2)) % 2 ? 'levels' : 'right';
  state.daily = { date: d, kind, prog: 0, goal: kind === 'levels' ? 2 : 25, done: false };
  save();
  return state.daily;
}

export function dailyStep(kind, n = 1) {
  const q = ensureDaily();
  if (q.kind !== kind || q.done) return;
  q.prog = Math.min(q.goal, q.prog + n);
  if (q.prog >= q.goal) {
    q.done = true;
    addCoins(30);
    sfx('coin');
    toast(`${t('dailyDone')} +30 <i class="coin"></i>`, '🎋');
  }
  save();
  emit('daily');
}
