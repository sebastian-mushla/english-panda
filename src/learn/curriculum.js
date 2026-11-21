// Программа обучения: камни на карте = темы. Словарная тема — уровень с мини-играми и дуэлью.
// Тема грамматики — «Правило» → узнавание → печать → «Найди ошибку» → проверка (80 %).
// Большая тема — вход в место (дом, пещера, гора…): внутри свои камни-фазы, каждая со своей проверкой.
import { state, TARGET } from '../state.js';
import { BY_THEME, WORDS, themesOf, CH3_OPEN, CH4_OPEN } from './words.js';
import { dueWords } from './srs.js';
import { LESSONS } from './lessons.js';
import { GRAMMAR as EN_A1 } from './en_a1.js';

// Старые уровни-образцы: словарные темы берут отсюда игры и духа
const LEGACY = [
  // Глава 1 «Весна · A1»
  { n: 1, ch: 1, theme: 'greet', stages: ['cards', 'dialog', 'duel'], mob: 'crane' },
  { n: 2, ch: 1, theme: 'numbers', stages: ['spell', 'type', 'duel'], mob: 'lantern' },
  { n: 3, ch: 1, theme: 'colors', stages: ['fishing', 'sudoku', 'duel'], mob: 'fox' },
  { n: 4, ch: 1, theme: 'family', gram: 'pronouns', stages: ['chain', 'builder', 'duel'], mob: 'turtle' },
  { n: 5, ch: 1, theme: 'animals', stages: ['baskets', 'rush', 'duel'], mob: 'mantis' },
  { n: 6, ch: 1, theme: 'food', stages: ['truefalse', 'builder', 'duel'], mob: 'dumpling' },
  { n: 7, ch: 1, theme: 'body', stages: ['spell', 'type', 'lantern', 'duel'], mob: 'hare' },
  { n: 8, ch: 1, theme: 'nature', stages: ['wordsearch', 'gap', 'duel'], mob: 'koi' },
  { n: 9, ch: 1, theme: 'home', stages: ['crossword', 'builder', 'duel'], mob: 'dragon' },
  { n: 10, ch: 1, theme: 'gate', stages: ['type', 'gap', 'builder', 'rush', 'duel'], mob: 'lion', exam: true },
  // Глава 2 «Лето · A2»
  { n: 11, ch: 2, theme: 'verbs', stages: ['chain', 'gap', 'duel'], mob: 'cicada' },
  { n: 12, ch: 2, theme: 'clothes', stages: ['baskets', 'spell', 'lantern', 'duel'], mob: 'silkworm' },
  { n: 13, ch: 2, theme: 'weather', stages: ['truefalse', 'crossword', 'duel'], mob: 'thunder' },
  { n: 14, ch: 2, theme: 'time', stages: ['dialog', 'builder', 'duel'], mob: 'snail' },
  { n: 15, ch: 2, theme: 'town', stages: ['fishing', 'wordsearch', 'duel'], mob: 'cricket' },
  { n: 16, ch: 2, theme: 'opposites', stages: ['cards', 'rush', 'duel'], mob: 'twin' },
  { n: 17, ch: 2, theme: 'jobs', stages: ['chain', 'lantern', 'duel'], mob: 'squirrel' },
  { n: 18, ch: 2, theme: 'hobbies', stages: ['wordsearch', 'truefalse', 'duel'], mob: 'kitedragon' },
  { n: 19, ch: 2, theme: 'travel', stages: ['dialog', 'crossword', 'duel'], mob: 'firefly' },
  { n: 20, ch: 2, theme: 'gate', stages: ['truefalse', 'lantern', 'builder', 'fishing', 'duel'], mob: 'phoenix', exam: true },
  // Глава 3 «Осень · B1» — грамматика английского
  { n: 21, ch: 3, theme: 'reg', gram: 'present', stages: ['verbform', 'maze', 'duel'], mob: 'maple' },
  { n: 22, ch: 3, theme: 'reg', gram: 'past', stages: ['verbform', 'sokoban', 'duel'], mob: 'scarecrow' },
  { n: 23, ch: 3, theme: 'irr1', gram: 'past', stages: ['irregular', 'letters', 'duel'], mob: 'owl' },
  { n: 24, ch: 3, theme: 'irr2', gram: 'past', stages: ['irregular', 'maze', 'duel'], mob: 'boar' },
  { n: 25, ch: 3, theme: 'irr1', gram: 'future', stages: ['verbform', 'longsent', 'duel'], mob: 'mooncake' },
  { n: 26, ch: 3, theme: 'reg', gram: 'article|prep', stages: ['verbform', 'sokoban', 'duel'], mob: 'ferry' },
  { n: 27, ch: 3, theme: 'irr2', gram: 'compare', stages: ['verbform', 'letters', 'duel'], mob: 'chestnut' },
  { n: 28, ch: 3, theme: 'reg', gram: 'past|present', stages: ['email', 'chat', 'duel'], mob: 'inkbrush' },
  { n: 29, ch: 3, theme: 'irr1', gram: 'future|past', stages: ['chat', 'longsent', 'maze', 'duel'], mob: 'lanternfox' },
  { n: 30, ch: 3, theme: 'gate', stages: ['b1test', 'irregular', 'longsent', 'email', 'duel'], mob: 'qilin', exam: true },
  // Глава 4 «Зима · B2» — только для чешского: механики самого языка
  { n: 31, ch: 4, theme: 'aspect', gram: 'aspect', stages: ['aspect', 'maze', 'duel'], mob: 'snowhare' },
  { n: 32, ch: 4, theme: 'nouns', gram: 'cases', stages: ['cases', 'verbform', 'duel'], mob: 'icecarp' },
  { n: 33, ch: 4, theme: 'spell', gram: 'spell', stages: ['diacritics', 'spell', 'duel'], mob: 'frostbrush' },
  { n: 34, ch: 4, theme: 'refl', gram: 'refl', stages: ['sesi', 'sokoban', 'duel'], mob: 'mirrorcat' },
  { n: 35, ch: 4, theme: 'office', gram: 'tyvy', stages: ['tyvy', 'email', 'duel'], mob: 'sealclerk' },
  { n: 36, ch: 4, theme: 'aspect', gram: 'aspect', stages: ['aspect', 'longsent', 'duel'], mob: 'yeti' },
  { n: 37, ch: 4, theme: 'nouns', gram: 'cases', stages: ['cases', 'sokoban', 'duel'], mob: 'snowlion' },
  { n: 38, ch: 4, theme: 'spell', gram: 'spell', stages: ['diacritics', 'crossword', 'duel'], mob: 'icicle' },
  { n: 39, ch: 4, theme: 'office', gram: 'tyvy|refl', stages: ['tyvy', 'sesi', 'chat', 'duel'], mob: 'teacrane' },
  { n: 40, ch: 4, theme: 'gate', stages: ['cases', 'aspect', 'diacritics', 'tyvy', 'sesi', 'duel'], mob: 'icedragon', exam: true },
];

// Грамматика главы 1 для английского: { g: id, kinds | phases, place, mob }
const EN_CH1 = [
  { v: 'greet' },
  { g: 'be', place: 'house', phases: [['be'], ['beneg']], mob: 'g_be' },
  { v: 'numbers' },
  { g: 'possess', kinds: ['pronouns', 'possess'], mob: 'g_poss' },
  { v: 'colors' },
  { g: 'plural', kinds: ['plural'], mob: 'g_plural' },
  { v: 'family' },
  { g: 'havegot', kinds: ['havegot'], mob: 'g_have' },
  { v: 'animals' },
  { g: 'thereis', kinds: ['thereis'], mob: 'g_there' },
  { v: 'food' },
  { g: 'can', kinds: ['can'], mob: 'g_can' },
  { v: 'body' },
  { g: 'ps', place: 'cave', phases: [['psA'], ['psS'], ['psNeg'], ['psQ']], mob: 'g_ps' },
  { v: 'nature' },
  { g: 'prepPlace', kinds: ['prepPlace'], mob: 'g_prep' },
  { v: 'home' },
  { g: 'wh', kinds: ['wh'], mob: 'g_wh' },
];

// Этапы одной фазы грамматики: правило → узнавание → печать (если форма меняется) → найди ошибку → проверка
export function grammarStages(kinds, i = 0) {
  // печатать имеет смысл, только если форма в ответе отличается от слова в скобках
  const changed = EN_A1.filter((g) => kinds.includes(g.kind) && g.a.toLowerCase() !== g.base.toLowerCase()).length >= 4;
  const recog = i % 2 ? 'sokoban' : 'maze';
  return ['rule', recog, changed ? 'verbform' : (recog === 'maze' ? 'sokoban' : 'maze'), 'errorspot', 'check'];
}

function buildLevels() {
  const out = [];
  const push = (d) => out.push({ ...d, n: out.length + 1 });
  const legacy = (ch) => LEGACY.filter((l) => l.ch === ch);
  for (const ch of [1, 2, 3, 4]) {
    if (ch === 1 && TARGET === 'en') {
      for (const it of EN_CH1) {
        if (it.v) { const l = LEGACY.find((x) => x.theme === it.v); push({ ...l }); continue; }
        if (it.place) push({ ch, topic: it.g, place: it.place, mob: it.mob, built: true, phases: it.phases.map((k, i) => ({ gram: k.join('|'), stages: grammarStages(k, i) })) });
        else push({ ch, topic: it.g, gram: it.kinds.join('|'), mob: it.mob, built: true, stages: grammarStages(it.kinds) });
      }
      push({ ...legacy(1).find((l) => l.exam) });
    } else for (const l of legacy(ch)) push({ ...l });
  }
  return out;
}
export const LEVELS = buildLevels();
// Номер экзамена каждой главы (для тумана и свитков)
export const EXAM_N = Object.fromEntries(LEVELS.filter((l) => l.exam).map((l) => [l.ch, l.n]));

// Позиции камней: темы главы ровно распределены по её зонам, экзамен — у врат
const CH_SPAN = { 1: [380, 6760], 2: [7400, 14050], 3: [14800, 20650], 4: [21450, 27350] };
export const NODE_X = (() => {
  const xs = [];
  for (const ch of [1, 2, 3, 4]) {
    const list = LEVELS.filter((l) => l.ch === ch), [a, b] = CH_SPAN[ch];
    const k = list.length - 1;
    list.forEach((l, i) => { xs[l.n - 1] = l.exam ? b : Math.round(a + (b - 500 - a) * (k > 1 ? i / (k - 1) : 0)); });
  }
  return xs;
})();

// Заголовок темы грамматики — из урока первой фазы
export function topicTitle(def) {
  const k = (def.phases ? def.phases[0].gram : def.gram || '').split('|').filter((x) => LESSONS[TARGET]?.[x]).pop();
  return k ? LESSONS[TARGET][k].title : null;
}
export const phaseTitle = (def, i) => LESSONS[TARGET]?.[def.phases[i].gram.split('|').pop()]?.title;
export const phaseDone = (n, i) => !!state.phases?.[n + ':' + i]?.stars?.[0];

export const CHAPTERS = {
  1: { season: 'spring', cefr: 'A1', name: { ru: 'Весна', cz: 'Jaro' } },
  2: { season: 'summer', cefr: 'A2', name: { ru: 'Лето', cz: 'Léto' } },
  3: { season: 'autumn', cefr: 'B1', name: { ru: 'Осень', cz: 'Podzim' } },
  4: { season: 'winter', cefr: 'B2', name: { ru: 'Зима', uk: 'Зима', cz: 'Zima' } },
};

export const levelDef = (n) => LEVELS[n - 1];

// Слова уровня: в главе 3 темы большие (до 25 глаголов), поэтому каждому уровню — свои 8 подряд
export function levelWords(def) {
  const all = BY_THEME[def.theme] || [];
  if (all.length <= 10) return all;
  const off = (def.n * 8) % all.length;
  return [...all, ...all].slice(off, off + 8);
}

export function isUnlocked(n) {
  if (levelDef(n)?.ch === 3 && !CH3_OPEN) return false; // глава 3 — только для английского и чешского
  if (levelDef(n)?.ch === 4 && !CH4_OPEN) return false; // глава 4 — пока только для чешского
  return n === 1 || !!state.levels[n - 1]?.stars?.[0];
}

export function currentLevel() {
  for (const l of LEVELS) if (!state.levels[l.n]?.stars?.[0] && isUnlocked(l.n)) return l.n;
  // всё доступное пройдено: стоим на последнем открытом уровне
  return [...LEVELS].reverse().find((l) => isUnlocked(l.n))?.n || 1;
}

const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export { shuffle };

// Набор слов для запуска уровня: новые слова темы + слова, которым пора на повторение
export function buildPlay(n, phase = null) {
  let def = levelDef(n);
  if (def.built) {
    if (phase != null) def = { ...def, ...def.phases[phase], phase, title: phaseTitle(def, phase) };
    return { def: { ...def, title: def.title || topicTitle(def) }, words: [], review: dueWords([], 3), themes: [], others: [] };
  }
  const chThemes = themesOf(def.ch);
  if (def.exam) {
    // экзамен главы: по 2 слова из каждой темы главы, сначала самые слабые
    const words = chThemes.flatMap((th) =>
      shuffle(BY_THEME[th]).sort((a, b) => (state.words[a.en]?.box || 0) - (state.words[b.en]?.box || 0)).slice(0, 2));
    return { def, words, review: [], themes: chThemes, others: chThemes };
  }
  const words = levelWords(def);
  // соседние темы для «Корзин» и «Рыбалки»: сначала уже пройденные
  const done = LEVELS.filter((l) => l.n < n && !l.exam).map((l) => l.theme);
  const others = shuffle(done.length ? done.slice(-4) : chThemes.filter((th) => th !== def.theme)).filter((th) => th !== def.theme);
  return { def, words, review: dueWords(words.map((w) => w.en), 3), themes: [def.theme], others };
}

// Повторение из словаря: без дуэли и звёзд
export function buildReview(list) {
  return {
    def: { n: 0, ch: 1, theme: 'review', stages: ['spell', 'type', 'gap'], mob: null, review: true },
    words: list, review: [], themes: [...new Set(list.map((w) => w.theme))], others: [],
  };
}

export const wordList = () => Object.values(WORDS);
