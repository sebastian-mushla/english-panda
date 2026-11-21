// Интервальное повторение по Лейтнеру: 5 коробок. Ошибка → коробка 1, верный ответ → следующая коробка.
import { state, save } from '../state.js';
import { WORDS } from './words.js';

const DAY = 864e5;
const INTERVAL = [0, 0, DAY, 3 * DAY, 7 * DAY, 21 * DAY];

const rec = (en) => (state.words[en] ||= { box: 0, due: 0, seen: 0, right: 0, wrong: 0 });

export function markSeen(list) {
  for (const w of list) {
    const r = rec(w.en);
    r.seen++;
    if (!r.box) { r.box = 1; r.due = Date.now(); }
  }
  save();
}

// Сессия уровня: копим ответы, а в коробки переносим один раз в конце
export function newSession() { return { right: new Set(), wrong: new Set() }; }

export function commit(session) {
  const now = Date.now();
  for (const en of new Set([...session.right, ...session.wrong])) {
    // правила грамматики (ключи «g:…») повторяются по той же схеме, но в отдельном списке
    const r = WORDS[en] ? rec(en) : en.startsWith('g:') ? ((state.gram ||= {})[en] ||= { box: 1, due: 0, right: 0, wrong: 0 }) : null;
    if (!r) continue;
    if (session.wrong.has(en)) { r.box = 1; r.wrong++; r.due = now; }
    else { r.box = Math.min(5, (r.box || 1) + 1); r.right++; r.due = now + INTERVAL[r.box]; }
  }
  save();
}

export const box = (en) => state.words[en]?.box || 0;

// Слова, которым пора на повторение (самые слабые первыми)
export function dueWords(exclude = [], n = 3) {
  const now = Date.now(), ex = new Set(exclude);
  return Object.entries(state.words)
    .filter(([en, r]) => WORDS[en] && !ex.has(en) && r.due <= now && r.box < 5)
    .sort((a, b) => a[1].box - b[1].box || a[1].due - b[1].due)
    .slice(0, n)
    .map(([en]) => WORDS[en]);
}

export function weakWords(n = 8) {
  return Object.entries(state.words)
    .filter(([en]) => WORDS[en])
    .sort((a, b) => a[1].box - b[1].box || b[1].wrong - a[1].wrong)
    .slice(0, n)
    .map(([en]) => WORDS[en]);
}

export const knownCount = () => Object.keys(state.words).filter((en) => WORDS[en]).length;
