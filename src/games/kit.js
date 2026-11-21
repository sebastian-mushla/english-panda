// Общие помощники мини-игр.
import { L } from '../i18n.js';
import { WORDS } from '../learn/words.js';

export const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export const pick = (a) => a[Math.floor(Math.random() * a.length)];
export const meaning = (w) => L({ ru: w.ru, uk: w.uk, cz: w.cz });
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Картинка слова; для неоднозначных картинок — ещё и значение на родном языке
export const pic = (w) => `<span class="emo">${w.emoji}</span>${w.vague ? `<small class="pcap">${esc(meaning(w))}</small>` : ''}`;

// Пример с подставленным словом
export function fillEx(w, mark = true) {
  const word = w.ex.startsWith('___') ? w.t[0].toUpperCase() + w.t.slice(1) : w.t;
  return esc(w.ex).replace('___', mark ? `<b>${esc(word)}</b>` : esc(word));
}

// Отвлекающие варианты: сначала из той же темы, потом из всех слов
export function distractors(w, n, pool = []) {
  const same = shuffle(pool.filter((x) => x.en !== w.en));
  const theme = shuffle(Object.values(WORDS).filter((x) => x.theme === w.theme && x.en !== w.en));
  const all = shuffle(Object.values(WORDS).filter((x) => x.en !== w.en));
  const out = [];
  for (const x of [...same, ...theme, ...all]) {
    if (out.length >= n) break;
    if (!out.includes(x) && x.emoji !== w.emoji) out.push(x);
  }
  return out;
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function flash(el, cls, ms = 450) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}
