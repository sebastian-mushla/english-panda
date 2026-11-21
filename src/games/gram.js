// Общее для грамматических игр главы 3: набор заданий уровня и варианты ответа.
import { IRREGULAR, pastRegular } from '../learn/words3.js';
import { CH3 } from '../learn/ch3.js';
import { shuffle, esc } from './kit.js';
import { t, L } from '../i18n.js';
import { TARGET } from '../state.js';
import { LESSONS } from '../learn/lessons.js';

// Задания уровня: по виду грамматики (def.gram = 'past' | 'present|future' ...); экзамен — всё вперемешку
export function gramPool(ctx) {
  const kinds = (ctx.def.gram || 'present|past|future|article|prep|compare').split('|');
  return CH3.GRAMMAR.filter((g) => kinds.includes(g.kind));
}

// Неверная, но правдоподобная форма
function wrongForm(it) {
  const b = it.base;
  const irr = IRREGULAR.find((v) => v[0] === b);
  const cands = [b, b + 's', b + 'ed', pastRegular(b), irr?.[2], b + 'er', 'more ' + b, b + 'est', b + 'ing'];
  return cands.filter((c) => c && c.toLowerCase() !== it.a.toLowerCase());
}

// Три варианта ответа, один верный
export function gramOptions(it) {
  if (it.w) return shuffle([it.a, ...shuffle(it.w).slice(0, 2)]); // готовые неверные варианты (чешский)
  if (it.base.includes('/')) {
    const set = [...new Set([it.a.toLowerCase(), ...it.base.split('/'), 'the', 'a', 'in'])];
    const out = [it.a, ...shuffle(set.filter((x) => x !== it.a.toLowerCase())).slice(0, 2)];
    return shuffle(out);
  }
  return shuffle([it.a, ...shuffle([...new Set(wrongForm(it))]).slice(0, 2)]);
}

// Урок грамматики: заголовок, объяснение на родном языке и таблица примеров
export function lessonHTML(kind) {
  const ls = LESSONS[TARGET]?.[kind];
  if (!ls) return '';
  return `<div class="lesson"><h4>${esc(L(ls.title))}</h4><ul>${L(ls.pts).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    <table class="lesson-ex en">${ls.ex.map((r) => `<tr>${r.map((c, i) => `<td>${i ? '→ ' : ''}${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
}

// открытое правило закрывается нажатием на него
addEventListener('click', (e) => { const ls = e.target.closest('.rulebox[open] .lesson'); if (ls) ls.parentElement.open = false; });

// Бесплатная кнопка «📘 Правило» под заданием: раскрывает урок нужного вида грамматики
export const ruleBox = (kind) => (LESSONS[TARGET]?.[kind] ? `<details class="rulebox"><summary>📘 ${t('ruleBtn')}</summary>${lessonHTML(kind)}</details>` : '');
