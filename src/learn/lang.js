// Изучаемый язык: названия, раскладки экранной клавиатуры, распознавание клавиш.
import { TARGET } from '../state.js';

export { TARGET };
export const NATIVES = ['ru', 'uk', 'cz'];
export const TARGETS = ['en', 'ru', 'cz', 'hu'];

export const LANG_NAME = {
  en: { ru: 'Английский', uk: 'Англійська', cz: 'Angličtina' },
  ru: { ru: 'Русский', uk: 'Російська', cz: 'Ruština' },
  cz: { ru: 'Чешский', uk: 'Чеська', cz: 'Čeština' },
  hu: { ru: 'Венгерский', uk: 'Угорська', cz: 'Maďarština' },
};
// «напечатай по-английски / anglicky»
export const LANG_ADV = {
  en: { ru: 'по-английски', uk: 'англійською', cz: 'anglicky' },
  ru: { ru: 'по-русски', uk: 'російською', cz: 'rusky' },
  cz: { ru: 'по-чешски', uk: 'чеською', cz: 'česky' },
  hu: { ru: 'по-венгерски', uk: 'угорською', cz: 'maďarsky' },
};
export const FLAG = { en: '🇬🇧', ru: '🇷🇺', cz: '🇨🇿', uk: '🇺🇦', hu: '🇭🇺' };
// Печать на карте дуэли
export const SEAL = { en: '英', ru: '俄', cz: '捷', hu: '匈' }[TARGET];

export const ROWS = {
  en: ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'],
  ru: ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбюё'],
  cz: ['qwertzuiop', 'asdfghjkl', 'yxcvbnm'],
  hu: ['qwertzuiop', 'asdfghjkl', 'yxcvbnm'],
}[TARGET];

// Буквы с диакритикой — по долгому нажатию на базовую букву (как на телефоне): отдельный ряд съедал место на экране
export const VARIANTS = {
  cz: { a: 'á', c: 'č', d: 'ď', e: 'éě', i: 'í', n: 'ň', o: 'ó', r: 'ř', s: 'š', t: 'ť', u: 'úů', y: 'ý', z: 'ž' },
  hu: { a: 'á', e: 'é', i: 'í', o: 'óöő', u: 'úüű' },
}[TARGET] || {};

// Физические клавиши национальной раскладки: подпись на экранной кнопке (ПК) и ввод с английской раскладки
export const PHYS = {
  cz: { 'ě': ['2', 'Digit2'], 'š': ['3', 'Digit3'], 'č': ['4', 'Digit4'], 'ř': ['5', 'Digit5'], 'ž': ['6', 'Digit6'], 'ý': ['7', 'Digit7'],
    'á': ['8', 'Digit8'], 'í': ['9', 'Digit9'], 'é': ['0', 'Digit0'], 'ú': ['[', 'BracketLeft'], 'ů': [';', 'Semicolon'] },
  hu: { 'ö': ['0', 'Digit0'], 'ü': ['-', 'Minus'], 'ó': ['=', 'Equal'], 'ő': ['[', 'BracketLeft'], 'ú': [']', 'BracketRight'],
    'é': [';', 'Semicolon'], 'á': ["'", 'Quote'], 'ű': ['\\', 'Backslash'], 'í': ['`', 'Backquote'] },
}[TARGET] || {};
const BY_CODE = Object.fromEntries(Object.entries(PHYS).map(([ch, [, code]]) => [code, ch]));

const ALPHA = {
  en: /^[a-z]$/,
  ru: /^[а-яё]$/,
  cz: /^[a-záčďéěíňóřšťúůýž]$/,
  hu: /^[a-záéíóöőúüű]$/,
}[TARGET];

// Русские буквы по физическим клавишам (раскладка ЙЦУКЕН), если у ученика нет русской раскладки
const RU_BY_CODE = {
  KeyQ: 'й', KeyW: 'ц', KeyE: 'у', KeyR: 'к', KeyT: 'е', KeyY: 'н', KeyU: 'г', KeyI: 'ш', KeyO: 'щ', KeyP: 'з', BracketLeft: 'х', BracketRight: 'ъ',
  KeyA: 'ф', KeyS: 'ы', KeyD: 'в', KeyF: 'а', KeyG: 'п', KeyH: 'р', KeyJ: 'о', KeyK: 'л', KeyL: 'д', Semicolon: 'ж', Quote: 'э',
  KeyZ: 'я', KeyX: 'ч', KeyC: 'с', KeyV: 'м', KeyB: 'и', KeyN: 'т', KeyM: 'ь', Comma: 'б', Period: 'ю', Backquote: 'ё',
};

// Буква изучаемого языка для нажатой клавиши при любой системной раскладке
export function keyLetter(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return null;
  if (e.key === 'Backspace') return 'back';
  if (e.key === ' ' || e.code === 'Space') return ' ';
  const k = (e.key || '').toLowerCase();
  if (k.length === 1 && ALPHA.test(k)) return k;
  if (TARGET === 'ru') return RU_BY_CODE[e.code] || null;
  if (BY_CODE[e.code]) return BY_CODE[e.code]; // 2 → ě, ' → á … при английской раскладке
  const m = /^Key([A-Z])$/.exec(e.code || '');
  return m ? m[1].toLowerCase() : null;
}

// Сравнение букв: «ё» и «е» считаем одной буквой
export const norm = (s) => s.toLowerCase().replace(/ё/g, 'е');

// Случайные буквы-обманки для «Каллиграфии»
export const DECOY = { en: 'abcdefghijklmnoprstuwy', ru: 'абвгдеиклмнопрстуя', cz: 'abcdeiklmnoprstuvyzáéíčřš', hu: 'abdefgiklmnoprstvzáéóöü' }[TARGET];
