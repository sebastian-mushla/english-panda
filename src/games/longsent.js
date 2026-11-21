// Длинные предложения B1: тот же «Сборщик фраз», но фразы из 8–12 слов со связками (and, but, because, if…).
import builder from './builder.js';

export default function longsent(el, ctx) {
  return builder(el, { ...ctx, long: true });
}
