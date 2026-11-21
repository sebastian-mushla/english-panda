// Программа обучения: камни на карте = темы. Словарная тема — уровень с мини-играми и дуэлью.
// Тема грамматики — «Правило» → узнавание → печать → «Найди ошибку» → проверка (80 %).
// Большая тема — вход в место (дом, пещера, гора…): внутри свои камни-фазы, каждая со своей проверкой.
import { state, TARGET, save } from '../state.js';
import { BY_THEME, WORDS, themesOf, CH3_OPEN, CH4_OPEN } from './words.js';
import { dueWords } from './srs.js';
import { LESSONS } from './lessons.js';
import { GRAMMAR as EN_A1 } from './en_a1.js';
import { GRAMMAR as EN_A2 } from './en_a2.js';
import { GRAMMAR as EN_B1 } from './en_b1.js';
import { GRAMMAR as EN_B2 } from './en_b2.js';
import { GRAMMAR as CZ_AB } from './cz_ab.js';
import { GRAMMAR as CZ_B } from './cz_b.js';

// Задания тем грамматики изучаемого языка (для английского A1–B2, для чешского A1–B2)
export const TOPIC_GRAMMAR = TARGET === 'en' ? [...EN_A1, ...EN_A2, ...EN_B1, ...EN_B2] : TARGET === 'cz' ? [...CZ_AB, ...CZ_B] : [];

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

// Программы по главам: { L: номер старого уровня } — словарная тема или старая игра,
// { g, kinds, mob } — тема грамматики, { g, place, phases, mob } — большая тема-место с фазами,
// { exam: [виды] } — экзамен главы из тем грамматики. Глава без программы берёт старые уровни.
const T_ = (g, kinds, mob) => ({ g, kinds, mob });
const P_ = (g, place, phases, mob) => ({ g, place, phases, mob });
const PROGRAM = {
  en: {
    1: [{ L: 1 }, P_('be', 'house', [['be'], ['beneg']], 'g_be'), { L: 2 }, T_('possess', ['pronouns', 'possess'], 'g_poss'), { L: 3 }, T_('plural', ['plural'], 'g_plural'),
      { L: 4 }, T_('havegot', ['havegot'], 'g_have'), { L: 5 }, T_('thereis', ['thereis'], 'g_there'), { L: 6 }, T_('can', ['can'], 'g_can'),
      { L: 7 }, P_('ps', 'cave', [['psA'], ['psS'], ['psNeg'], ['psQ']], 'g_ps'), { L: 8 }, T_('prepPlace', ['prepPlace'], 'g_prep'), { L: 9 }, T_('wh', ['wh'], 'g_wh'), { L: 10 }],
    2: [{ L: 11 }, P_('pc', 'fountain', [['pc'], ['pcVs']], 'g_pc'), { L: 12 }, T_('was', ['wasWere'], 'g_was'), { L: 13 }, P_('past', 'mountain', [['pastReg'], ['pastIrr'], ['pastNQ']], 'g_past'),
      { L: 14 }, T_('quant', ['quant'], 'g_quant'), { L: 15 }, T_('cmp', ['cmp'], 'g_cmp'), { L: 16 }, T_('fut', ['fut'], 'g_fut'),
      { L: 17 }, T_('modal', ['modal'], 'g_modal'), { L: 18 }, T_('adv', ['adv'], 'g_adv'), { L: 19 }, T_('obj', ['objPron'], 'g_obj'), { L: 20 }],
    3: [{ L: 23 }, P_('pp', 'temple', [['pp'], ['ppEver'], ['ppFor'], ['ppVsPast']], 'g_pp'), T_('pastCont', ['pastCont'], 'g_pcont'), { L: 24 }, T_('usedTo', ['usedTo'], 'g_used'),
      P_('cond', 'library', [['cond1'], ['cond2']], 'g_cond'), T_('passive', ['passive'], 'g_pass'), T_('relative', ['relative'], 'g_rel'), { L: 28 },
      T_('gerInf', ['gerInf'], 'g_ger'), T_('phrasal1', ['phrasal1'], 'g_phr1'), T_('linkers1', ['linkers1'], 'g_link1'), { L: 30 }],
    4: [P_('time', 'mountain', [['ppc'], ['pastPerf'], ['futCont']], 'g_time'), T_('deduct', ['deduct'], 'g_deduct'), P_('cond3', 'library', [['cond3'], ['mixed'], ['wish']], 'g_cond3'),
      T_('passive2', ['passive2'], 'g_pass2'), P_('rep', 'house', [['repS'], ['repQ'], ['repC']], 'g_rep'), T_('rel2', ['rel2'], 'g_rel2'),
      T_('phrasal2', ['phrasal2'], 'g_phr2'), T_('linkers2', ['linkers2'], 'g_link2'), T_('tags', ['tags'], 'g_tags'),
      { exam: ['ppc', 'pastPerf', 'futCont', 'deduct', 'cond3', 'mixed', 'wish', 'passive2', 'repS', 'repQ', 'repC', 'rel2', 'phrasal2', 'linkers2', 'tags'], mob: 'icedragon' }],
  },
  cz: {
    1: [{ L: 1 }, P_('cz_byt', 'house', [['cz_byt'], ['cz_mit']], 'g_cz_byt'), { L: 2 }, T_('cz_rod', ['cz_rod'], 'g_cz_rod'), { L: 3 }, T_('cz_konj', ['cz_konj'], 'g_cz_konj'),
      { L: 4 }, T_('cz_priv', ['cz_priv'], 'g_cz_priv'), { L: 5 }, T_('cz_akuz', ['cz_akuz'], 'g_cz_akuz'), { L: 6 }, T_('cz_neg', ['cz_neg'], 'g_cz_neg'), { L: 7 }, { L: 8 }, { L: 9 }, { L: 10 }],
    2: [{ L: 11 }, P_('cz_time', 'mountain', [['cz_minuly'], ['cz_budouci']], 'g_cz_time'), { L: 12 }, T_('cz_lokal', ['cz_lokal'], 'g_cz_lokal'), { L: 13 }, T_('cz_plural', ['cz_plural'], 'g_cz_plural'),
      { L: 14 }, T_('cz_adj', ['cz_adj'], 'g_cz_adj'), { L: 15 }, T_('cz_imper', ['cz_imper'], 'g_cz_imper'), { L: 16 }, T_('cz_pohyb', ['cz_pohyb'], 'g_cz_pohyb'), { L: 17 }, { L: 18 }, { L: 19 }, { L: 20 }],
    3: [{ L: 21 }, P_('cz_pady', 'cave', [['cz_gen'], ['cz_dat'], ['cz_instr']], 'g_cz_pady'), { L: 22 }, P_('cz_modal', 'library', [['cz_modal'], ['cz_kdyby']], 'g_cz_modal'), { L: 23 }, T_('cz_num', ['cz_num'], 'g_cz_num'),
      { L: 24 }, T_('cz_cmp', ['cz_cmp'], 'g_cz_cmp'), { L: 25 }, { L: 26 }, { L: 27 }, { L: 28 }, { L: 29 }, { L: 30 }],
    4: [{ L: 31 }, { L: 32 }, T_('cz_plcase', ['cz_plcase'], 'g_cz_plcase'), { L: 33 }, P_('cz_pass', 'temple', [['cz_pass'], ['cz_ktery']], 'g_cz_pass'), { L: 34 }, T_('cz_enkl', ['cz_enkl'], 'g_cz_enkl'),
      { L: 35 }, { L: 36 }, T_('cz_conj', ['cz_conj'], 'g_cz_conj'), { L: 37 }, { L: 38 }, { L: 39 }, { L: 40 }],
  },
};
const EXAM_TITLE = { ru: 'Экзамен главы', uk: 'Іспит розділу', cz: 'Zkouška kapitoly' };

// Этапы одной фазы грамматики: правило → узнавание → печать (если форма меняется) → найди ошибку → проверка
export function grammarStages(kinds, i = 0) {
  // печатать имеет смысл, только если форма в ответе отличается от слова в скобках
  const changed = TOPIC_GRAMMAR.filter((g) => kinds.includes(g.kind) && g.a.toLowerCase() !== g.base.toLowerCase()).length >= 4;
  const recog = i % 2 ? 'sokoban' : 'maze';
  return ['rule', recog, changed ? 'verbform' : (recog === 'maze' ? 'sokoban' : 'maze'), 'errorspot', 'check'];
}

function buildLevels() {
  const out = [];
  const push = (d) => out.push({ ...d, n: out.length + 1 });
  for (const ch of [1, 2, 3, 4]) {
    const prog = PROGRAM[TARGET]?.[ch];
    if (!prog) { for (const l of LEGACY.filter((x) => x.ch === ch)) push({ ...l }); continue; }
    for (const it of prog) {
      if (it.L) push({ ...LEGACY[it.L - 1] });
      else if (it.exam) push({ ch, theme: 'gate', exam: true, built: true, gram: it.exam.join('|'), title: EXAM_TITLE, mob: it.mob, stages: ['errorspot', 'check'] });
      else if (it.place) push({ ch, topic: it.g, place: it.place, mob: it.mob, built: true, phases: it.phases.map((k, i) => ({ gram: k.join('|'), stages: grammarStages(k, i) })) });
      else push({ ch, topic: it.g, gram: it.kinds.join('|'), mob: it.mob, built: true, stages: grammarStages(it.kinds) });
    }
  }
  return out;
}
export const LEVELS = buildLevels();

// Переход на программу до B2: номера уровней сдвинулись (у английского после главы 1, у чешского везде),
// поэтому сдвинутый прогресс сбрасываем, а пойманные духи и слова остаются
if ((state.prog || 0) < 4 && (TARGET === 'en' || TARGET === 'cz')) {
  const from = TARGET === 'en' ? (state.prog === 3 ? 999 : 20) : (state.prog === 3 ? 34 : 2);
  for (const k of Object.keys(state.levels || {})) if (+k >= from) delete state.levels[k];
  for (const k of Object.keys(state.phases || {})) if (+k.split(':')[0] >= from) delete state.phases[k];
  state.prog = 4;
  save();
}
// Номер экзамена каждой главы (для тумана и свитков)
export const EXAM_N = Object.fromEntries(LEVELS.filter((l) => l.exam).map((l) => [l.ch, l.n]));

// Позиции камней: темы главы ровно распределены по её зонам, экзамен — у врат
const CH_SPAN = { 1: [380, 6760], 2: [7400, 14050], 3: [14800, 20650], 4: [21450, 27350] };
export const NODE_X = (() => {
  const xs = [];
  for (const ch of [1, 2, 3, 4]) {
    const list = LEVELS.filter((l) => l.ch === ch), [a, b] = CH_SPAN[ch];
    const k = list.length - 1;
    list.forEach((l, i) => {
      let x = l.exam ? b : Math.round(a + (b - 500 - a) * (k > 1 ? i / (k - 1) : 0));
      // вход в место не ставим внутрь чайного дома: он должен стоять снаружи, на земле
      if (l.place && x > 4800 && x < 6450) x = 4790;
      xs[l.n - 1] = x;
    });
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
