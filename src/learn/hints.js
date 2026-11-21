// Подсказки-лесенка: 1) перевод на родном языке и первая буква с длиной слова, 2) половина букв и пример, 3) прямая помощь в игре.
// Ни одна подсказка не бесплатна: она стоит монет и снимает звезду «Без подсказок».
import { upg } from '../state.js';
import { t, L } from '../i18n.js';

const BASE = [5, 10, 20];
export const hintCost = (step) => Math.max(1, Math.round(BASE[step - 1] * (1 - 0.15 * upg('teapot'))));

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Маска слова: open(i, k) решает, показывать ли букву (i — номер в слове, k — номер в части слова)
function mask(word, open) {
  let k = -1;
  return [...word].map((c, i) => {
    if (c === ' ') { k = -1; return '\u00a0'; }
    k++;
    return open(i, k) ? c : '_';
  }).join(' ');
}
export const letterCount = (word) => word.replace(/ /g, '').length;

// Общая лесенка для одного слова; act — что игра делает на третьей ступени
export function wordHint(word, step, act) {
  const mean = L({ ru: word.ru, uk: word.uk, cz: word.cz });
  if (step === 1) {
    const m = mask(word.t, (i, k) => k === 0);
    return { label: t('hint.1'), text: `${word.emoji} <b>${esc(mean)}</b> → <span class="en hmask">${esc(m)}</span> <small>(${t('hint.letters', { n: letterCount(word.t) })})</small>`, en: false };
  }
  if (step === 2) {
    const m = mask(word.t, (i, k) => k % 2 === 0);
    const ex = word.ex ? `<br><small class="en">${esc(word.ex.replace('___', '_____'))}</small>` : '';
    return { label: t('hint.2'), text: `<span class="en hmask">${esc(m)}</span>${ex}`, en: false };
  }
  return { label: t('hint.3'), text: act(), en: false };
}
