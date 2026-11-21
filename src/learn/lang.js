// Изучаемый язык: названия, раскладки экранной клавиатуры, распознавание клавиш.
import { TARGET } from '../state.js';

export { TARGET };
export const NATIVES = ['ru', 'cz'];
export const TARGETS = ['en', 'ru', 'cz'];

export const LANG_NAME = {
  en: { ru: 'Английский', cz: 'Angličtina' },
  ru: { ru: 'Русский', cz: 'Ruština' },
  cz: { ru: 'Чешский', cz: 'Čeština' },
};
// «напечатай по-английски / anglicky»
export const LANG_ADV = {
  en: { ru: 'по-английски', cz: 'anglicky' },
  ru: { ru: 'по-русски', cz: 'rusky' },
  cz: { ru: 'по-чешски', cz: 'česky' },
};
export const FLAG = { en: '🇬🇧', ru: '🇷🇺', cz: '🇨🇿' };
// Печать на карте дуэли
export const SEAL = { en: '英', ru: '俄', cz: '捷' }[TARGET];

export const ROWS = {
  en: ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'],
  ru: ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбюё'],
  cz: ['ěščřžýáíéůú', 'qwertzuiop', 'asdfghjkl', 'yxcvbnmňďťó'],
}[TARGET];

const ALPHA = {
  en: /^[a-z]$/,
  ru: /^[а-яё]$/,
  cz: /^[a-záčďéěíňóřšťúůýž]$/,
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
  const m = /^Key([A-Z])$/.exec(e.code || '');
  return m ? m[1].toLowerCase() : null;
}

// Сравнение букв: «ё» и «е» считаем одной буквой
export const norm = (s) => s.toLowerCase().replace(/ё/g, 'е');

// Случайные буквы-обманки для «Каллиграфии»
export const DECOY = { en: 'abcdefghijklmnoprstuwy', ru: 'абвгдеиклмнопрстуя', cz: 'abcdeiklmnoprstuvyzáéíčřš' }[TARGET];
