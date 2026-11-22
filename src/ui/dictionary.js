// Словарь учёного: все встреченные слова, транскрипция и озвучка, знание 0–5, примеры, повторение слабых слов.
import { state } from '../state.js';
import { t, L, nWords } from '../i18n.js';
import { WORDS, THEMES } from '../learn/words.js';
import { weakWords, dueWords } from '../learn/srs.js';
import { board } from './modal.js';
import { sfx, speakWord, canSpeak } from '../audio.js';
import { IPA, RU_STRESS } from '../learn/phonetics.js';
import { TARGET } from '../state.js';
import { esc, fillEx, meaning } from '../games/kit.js';
import { LEVELS } from '../learn/curriculum.js';
import { LESSONS } from '../learn/lessons.js';
import { lessonHTML, verbTableHTML } from '../games/gram.js';

// Пройденные правила: уроки тем и фаз, где уже есть хотя бы одна звезда (по порядку программы)
function doneRules() {
  const out = [];
  const add = (k) => { if (LESSONS[TARGET]?.[k] && !out.includes(k)) out.push(k); };
  for (const l of LEVELS) {
    if (l.phases) l.phases.forEach((ph, i) => { if (state.phases[l.n + ':' + i]?.stars?.[0]) ph.gram.split('|').forEach(add); });
    else if (l.gram && !l.exam && state.levels[l.n]?.stars?.[0]) l.gram.split('|').forEach(add);
  }
  return out;
}
const verbsDone = () => LEVELS.some((l) => l.ch === 3 && !l.built && state.levels[l.n]?.stars?.[0] && /irr/.test(l.theme));

// Транскрипция: английский — IPA, русский — ударение, чешский — ударение на первом слоге
function phon(w) {
  if (TARGET === 'en' && (IPA[w.en] || IPA[w.t])) return `<i class="ipa">[${esc(IPA[w.en] || IPA[w.t])}]${w.v2 ? ` · ${esc(w.v2)} · ${esc(w.v3)}` : ''}</i>`;
  if (TARGET === 'ru' && RU_STRESS[w.en]) return `<i class="ipa">${esc(RU_STRESS[w.en])}</i>`;
  if (TARGET === 'cz' || TARGET === 'hu') return `<i class="ipa">ˈ${esc(w.t)}</i>`;
  return '';
}

export function openDict(onReview) {
  let theme = 'all', q = '';
  const m = board({
    title: t('dict'), icon: '📜', cls: 'dict',
    tabs: [{ id: 'words', label: t('dict') }, { id: 'rules', label: '📘 ' + t('rulesTab') }],
    render(tab, panel) {
      if (tab === 'rules') return renderRules(panel);
      const known = Object.keys(state.words).filter((en) => WORDS[en]);
      if (!known.length) { panel.innerHTML = `<p class="empty">${t('dictEmpty')}</p>`; return; }
      const themes = [...new Set(known.map((en) => WORDS[en].theme))];
      const due = dueWords([], 99).length;
      panel.innerHTML = `<div class="dict-top">
          <input class="search" type="search" placeholder="${t('search')}" value="${esc(q)}">
          <div class="chips"><button class="chip ${theme === 'all' ? 'on' : ''}" data-th="all">${t('allThemes')}</button>${themes.map((th) => `<button class="chip ${theme === th ? 'on' : ''}" data-th="${th}">${L(THEMES[th])}</button>`).join('')}</div>
          <div class="dict-meta"><b>${nWords(known.length)}</b>${due ? ` · <span class="due">${due} ${t('due')}</span>` : ''}
            <button class="btn red small review">🔁 ${t('reviewWeak')}</button></div>
        </div><div class="dict-list"></div>`;
      const list = panel.querySelector('.dict-list');
      const draw = () => {
        const rows = known.map((en) => WORDS[en]).filter((w) => (theme === 'all' || w.theme === theme) &&
          (!q || w.t.toLowerCase().includes(q) || meaning(w).toLowerCase().includes(q)));
        list.innerHTML = rows.map((w) => {
          const r = state.words[w.en];
          return `<div class="drow"><span class="emo">${w.emoji}</span>
            <div class="dw"><b class="en">${esc(w.t)}</b>${phon(w)}<span>${esc(meaning(w))}</span><small class="en">${fillEx(w)}</small></div>
            <div class="know" title="${t('knowledge')}">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= r.box ? 'on' : ''}"></i>`).join('')}</div>
            ${canSpeak() ? `<button class="spk" data-en="${esc(w.en)}" aria-label="${t('listen')}">🔊</button>` : ''}</div>`;
        }).join('');
        list.querySelectorAll('.spk').forEach((b) => b.addEventListener('click', () => {
          const w = WORDS[b.dataset.en];
          // второе нажатие подряд — медленно
          const slow = b.classList.toggle('slow');
          speakWord(w.t, TARGET, slow);
          setTimeout(() => b.classList.remove('slow'), 2500);
        }));
      };
      draw();
      panel.querySelector('.search').addEventListener('input', (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
      panel.querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => { theme = b.dataset.th; sfx('click'); m.set('words'); }));
      panel.querySelector('.review').addEventListener('click', () => {
        const ws = dueWords([], 8);
        const list8 = ws.length >= 4 ? ws : weakWords(8);
        m.close();
        onReview(list8);
      });
    },
  });
}

// Вкладка «Правила»: таблицы и объяснения пройденных тем — заголовок раскрывает урок
function renderRules(panel) {
  const ks = doneRules();
  if (!ks.length && !verbsDone()) { panel.innerHTML = `<p class="empty">${t('rulesEmpty')}</p>`; return; }
  panel.innerHTML = `<input class="search" type="search" placeholder="${t('search')}">
    <div class="rules-list">${verbsDone() ? `<details class="rule-item"><summary>📜 ${esc(t('verbTable'))}</summary>${verbTableHTML([])}</details>` : ''}
    ${ks.map((k) => `<details class="rule-item" data-q="${esc(L(LESSONS[TARGET][k].title).toLowerCase())}"><summary>${esc(L(LESSONS[TARGET][k].title))}</summary>${lessonHTML(k)}</details>`).join('')}</div>`;
  panel.querySelector('.search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    panel.querySelectorAll('.rule-item[data-q]').forEach((d) => (d.hidden = q && !d.dataset.q.includes(q) && !d.textContent.toLowerCase().includes(q)));
  });
}
