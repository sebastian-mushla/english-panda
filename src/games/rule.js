// Правило: короткий урок грамматики перед играми на формы слова. Сначала объяснение, потом практика.
import { t } from '../i18n.js';
import { lessonHTML, verbTableHTML } from './gram.js';

export default function rule(el, ctx) {
  ctx.setHint(null);
  const kinds = (ctx.def.gram || '').split('|').filter(Boolean);
  // после правил — таблица неправильных глаголов уровня
  el.innerHTML = `<div class="rule-stage">${kinds.map(lessonHTML).join('')}${verbTableHTML(ctx.words)}</div>
    <div class="stage-actions"><button class="btn red go">${t('gotIt')}</button></div>`;
  el.querySelector('.go').addEventListener('click', () => ctx.finish(true));
}
