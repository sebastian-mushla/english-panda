// Выбор пары языков: «я говорю на» (интерфейс) и «хочу учить» (у каждого языка обучения своё сохранение).
import { state, TARGET, setLanguages } from '../state.js';
import { t } from '../i18n.js';
import { NATIVES, TARGETS, LANG_NAME, FLAG } from '../learn/lang.js';

const SELF = { ru: 'Русский', uk: 'Українська', cz: 'Čeština', en: 'English' };

export function langPickHTML() {
  return `<div class="langpick">
    <div class="row"><span>${t('iSpeak')}</span><div class="chips">${NATIVES.map((l) => `<button class="chip ${state.lang === l ? 'on' : ''}" data-native="${l}">${FLAG[l]} ${SELF[l]}</button>`).join('')}</div></div>
    <div class="row"><span>${t('iLearn')}</span><div class="chips">${TARGETS.map((l) => `<button class="chip ${TARGET === l ? 'on' : ''}" data-target="${l}" ${l === state.lang && l !== 'cz' ? 'disabled' : ''}>${FLAG[l]} ${LANG_NAME[l][state.lang]}</button>`).join('')}</div></div>
  </div>`;
}

export function bindLangPick(root, beforeSwitch) {
  root.querySelectorAll('[data-native]').forEach((b) => b.addEventListener('click', () => { beforeSwitch?.(); setLanguages(b.dataset.native, TARGET); }));
  root.querySelectorAll('[data-target]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.target === TARGET) return;
    beforeSwitch?.();
    setLanguages(state.lang, b.dataset.target);
  }));
}
