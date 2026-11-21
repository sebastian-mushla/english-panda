// Подсказки-лесенка: 1) загадка на английском, 2) пример с пропуском, 3) прямая помощь в игре.
// Ни одна подсказка не бесплатна: она стоит монет и снимает звезду «Без подсказок».
import { upg } from '../state.js';
import { t } from '../i18n.js';

const BASE = [5, 10, 20];
export const hintCost = (step) => Math.max(1, Math.round(BASE[step - 1] * (1 - 0.15 * upg('teapot'))));

// Общая лесенка для одного слова; act — что игра делает на третьей ступени
export function wordHint(word, step, act) {
  if (step === 1) return { label: t('hint.1'), text: word.riddle, en: true };
  if (step === 2) return { label: t('hint.2'), text: word.ex.replace('___', '_____'), en: true };
  return { label: t('hint.3'), text: act(), en: false };
}
