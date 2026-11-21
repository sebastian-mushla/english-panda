// Уровни главы 1. Порядок испытаний: знакомство → узнавание → воспроизведение → дуэль.
// Позже: генератор глав A2–C2 из банка слов и тем грамматики (≈3000 уровней).
import { state } from '../state.js';
import { BY_THEME, WORDS } from './words.js';
import { dueWords } from './srs.js';

export const LEVELS = [
  { n: 1, theme: 'greet', stages: ['cards', 'gap', 'duel'], mob: 'crane' },
  { n: 2, theme: 'numbers', stages: ['spell', 'type', 'duel'], mob: 'lantern' },
  { n: 3, theme: 'colors', stages: ['cards', 'sudoku', 'duel'], mob: 'fox' },
  { n: 4, theme: 'family', stages: ['gap', 'builder', 'duel'], mob: 'turtle' },
  { n: 5, theme: 'animals', stages: ['cards', 'rush', 'duel'], mob: 'mantis' },
  { n: 6, theme: 'food', stages: ['sudoku', 'builder', 'duel'], mob: 'dumpling' },
  { n: 7, theme: 'body', stages: ['type', 'rush', 'duel'], mob: 'hare' },
  { n: 8, theme: 'nature', stages: ['cards', 'gap', 'duel'], mob: 'koi' },
  { n: 9, theme: 'home', stages: ['spell', 'builder', 'duel'], mob: 'dragon' },
  { n: 10, theme: 'gate', stages: ['type', 'gap', 'builder', 'rush', 'duel'], mob: 'lion', exam: true },
];

export const levelDef = (n) => LEVELS[n - 1];

export function isUnlocked(n) {
  return n === 1 || !!state.levels[n - 1]?.stars?.[0];
}

export function currentLevel() {
  for (const l of LEVELS) if (!state.levels[l.n]?.stars?.[0]) return l.n;
  return LEVELS.length;
}

const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export { shuffle };

// Набор слов для запуска уровня: новые слова темы + слова, которым пора на повторение
export function buildPlay(n) {
  const def = levelDef(n);
  if (def.exam) {
    // экзамен: по 2 слова из каждой темы, сначала самые слабые
    const words = Object.values(BY_THEME).flatMap((list) =>
      shuffle(list).sort((a, b) => (state.words[a.en]?.box || 0) - (state.words[b.en]?.box || 0)).slice(0, 2));
    return { def, words, review: [], themes: Object.keys(BY_THEME) };
  }
  const words = BY_THEME[def.theme];
  return { def, words, review: dueWords(words.map((w) => w.en), 3), themes: [def.theme] };
}

// Повторение из словаря: без дуэли и звёзд
export function buildReview(list) {
  return {
    def: { n: 0, theme: 'review', stages: ['type', 'gap'], mob: null, review: true },
    words: list, review: [], themes: [...new Set(list.map((w) => w.theme))],
  };
}

export const wordList = () => Object.values(WORDS);
