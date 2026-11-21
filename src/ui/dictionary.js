// Словарь учёного: все встреченные слова, знание 0–5, примеры, повторение слабых слов.
import { state } from '../state.js';
import { t, L, nWords } from '../i18n.js';
import { WORDS, THEMES } from '../learn/words.js';
import { weakWords, dueWords } from '../learn/srs.js';
import { board } from './modal.js';
import { sfx } from '../audio.js';
import { esc, fillEx } from '../games/kit.js';

export function openDict(onReview) {
  let theme = 'all', q = '';
  const m = board({
    title: t('dict'), icon: '📜', cls: 'dict',
    tabs: [{ id: 'words', label: t('dict') }],
    render(_, panel) {
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
          (!q || w.t.toLowerCase().includes(q) || w.ru.includes(q) || w.cz.toLowerCase().includes(q)));
        list.innerHTML = rows.map((w) => {
          const r = state.words[w.en];
          return `<div class="drow"><span class="emo">${w.emoji}</span>
            <div class="dw"><b class="en">${esc(w.t)}</b><span>${esc(L({ ru: w.ru, cz: w.cz }))}</span><small class="en">${fillEx(w)}</small></div>
            <div class="know" title="${t('knowledge')}">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= r.box ? 'on' : ''}"></i>`).join('')}</div></div>`;
        }).join('');
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
