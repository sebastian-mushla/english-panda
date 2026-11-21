// Общее для грамматических игр главы 3: набор заданий уровня и варианты ответа.
import { GRAMMAR, IRREGULAR, pastRegular } from '../learn/words3.js';
import { shuffle } from './kit.js';

// Задания уровня: по виду грамматики (def.gram = 'past' | 'present|future' ...); экзамен — всё вперемешку
export function gramPool(ctx) {
  const kinds = (ctx.def.gram || 'present|past|future|article|prep|compare').split('|');
  return GRAMMAR.filter((g) => kinds.includes(g.kind));
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
  if (it.base.includes('/')) {
    const set = [...new Set([it.a.toLowerCase(), ...it.base.split('/'), 'the', 'a', 'in'])];
    const out = [it.a, ...shuffle(set.filter((x) => x !== it.a.toLowerCase())).slice(0, 2)];
    return shuffle(out);
  }
  return shuffle([it.a, ...shuffle([...new Set(wrongForm(it))]).slice(0, 2)]);
}
