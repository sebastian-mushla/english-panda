// Админка для локальной разработки: любой уровень, фаза или отдельный этап, смена языков, монеты, духи, сброс.
import { state, save, emit, setLanguages, resetAll, TARGET } from '../state.js';
import { L } from '../i18n.js';
import { LEVELS, CHAPTERS, topicTitle, phaseTitle } from '../learn/curriculum.js';
import { THEMES } from '../learn/words.js';
import { MOBS } from '../learn/mobs.js';
import { ADMIN_OPEN } from '../adminFlags.js';
import { esc } from '../games/kit.js';

const title = (l) => (l.exam ? '🚪 Экзамен' : l.built ? (l.place ? '🏛 ' : '📘 ') + (L(topicTitle(l) || l.title) || l.topic) : '🔤 ' + L(THEMES[l.theme] || { ru: l.theme }));
const stagesOf = (l, i) => (l.phases ? l.phases[i].stages : l.stages);

export function initAdmin({ start, startPhase, runStage, focus }) {
  const btn = document.createElement('button');
  btn.id = 'adm-btn';
  btn.textContent = '🛠';
  btn.title = 'Админка (только localhost)';
  // переключатель режима админа: ON — все уровни и фазы открыты, OFF — обычная игра
  const tog = document.createElement('button');
  tog.id = 'adm-tog';
  tog.className = ADMIN_OPEN ? 'on' : '';
  tog.textContent = ADMIN_OPEN ? 'ADMIN ON' : 'ADMIN OFF';
  tog.addEventListener('click', () => { try { localStorage.setItem('ep.admin.open', ADMIN_OPEN ? '0' : '1'); } catch { /* */ } location.reload(); });
  document.body.append(btn, tog);
  let panel = null;
  btn.addEventListener('click', () => (panel ? close() : openPanel()));
  const close = () => { panel?.remove(); panel = null; };

  function openPanel() {
    panel = document.createElement('aside');
    panel.id = 'adm';
    const sel = (id, list, cur) => `<select id="${id}">${list.map((x) => `<option ${x === cur ? 'selected' : ''}>${x}</option>`).join('')}</select>`;
    panel.innerHTML = `<header><b>🛠 Админка</b><button class="adm-x">✕</button></header>
      <section class="adm-row">Родной ${sel('adm-nat', ['ru', 'uk', 'cz'], state.lang)} Учу ${sel('adm-tgt', ['en', 'cz', 'ru', 'hu'], TARGET)} <button id="adm-lang">Сменить</button></section>
      <section class="adm-row"><label><input type="checkbox" id="adm-open" ${ADMIN_OPEN ? 'checked' : ''}> Открыть всё</label>
        <button data-a="coins">+1000 🪙</button><button data-a="mobs">Все духи</button><button data-a="done">Пройти всё</button><button data-a="reset" class="adm-red">Сброс</button></section>
      <input id="adm-q" placeholder="Поиск: номер, тема, игра…">
      <div class="adm-list">${[1, 2, 3, 4, 5].map((ch) => `<h4>Глава ${ch} · ${CHAPTERS[ch].cefr}</h4>` + LEVELS.filter((l) => l.ch === ch).map((l) => {
        const done = state.levels[l.n]?.stars?.[0] ? '✅' : '';
        const parts = l.phases ? l.phases.map((p, i) => ({ i, name: `Фаза ${i + 1}: ${L(phaseTitle(l, i)) || p.gram}` })) : [{ i: null, name: '' }];
        return `<div class="adm-lv" data-q="${esc((l.n + ' ' + title(l) + ' ' + (l.gram || '') + ' ' + JSON.stringify(l.stages || l.phases)).toLowerCase())}">
          <div class="adm-h"><b>${l.n}</b> ${esc(title(l))} ${done}<span><button data-go="${l.n}">▶</button><button data-map="${l.n}">📍</button></span></div>
          ${parts.map(({ i, name }) => `<div class="adm-st">${name ? `<button data-ph="${l.n}:${i}">${esc(name)}</button>` : ''}
            ${stagesOf(l, i ?? 0).map((s) => `<button class="chip" data-stage="${l.n}:${i ?? ''}:${s}">${s}</button>`).join('')}</div>`).join('')}</div>`;
      }).join('')).join('')}</div>`;
    document.body.append(panel);
    const $ = (s) => panel.querySelector(s);
    $('.adm-x').onclick = close;
    $('#adm-lang').onclick = () => setLanguages($('#adm-nat').value, $('#adm-tgt').value);
    $('#adm-open').onchange = (e) => { try { localStorage.setItem('ep.admin.open', e.target.checked ? '1' : '0'); } catch { /* */ } location.reload(); };
    $('#adm-q').oninput = (e) => { const q = e.target.value.toLowerCase(); panel.querySelectorAll('.adm-lv').forEach((d) => (d.hidden = q && !d.dataset.q.includes(q))); };
    panel.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      const d = b.dataset;
      if (d.a === 'coins') { state.coins += 1000; save(); emit('coins', 1000); }
      if (d.a === 'mobs') { for (const id of Object.keys(MOBS)) state.mobs[id] ||= 1; save(); emit('progress'); }
      if (d.a === 'done') { for (const l of LEVELS) { state.levels[l.n] = { stars: [1, 1, 1], plays: 1 }; l.phases?.forEach((p, i) => (state.phases[l.n + ':' + i] = { stars: [1, 1, 1] })); } save(); emit('progress'); }
      if (d.a === 'reset' && confirm('Сбросить весь прогресс этого языка?')) resetAll();
      if (d.go) { close(); start(+d.go); }
      if (d.map) { close(); focus(+d.map); }
      if (d.ph) { const [n, i] = d.ph.split(':'); close(); startPhase(+n, +i); }
      if (d.stage) { const [n, i, s] = d.stage.split(':'); close(); runStage(+n, i === '' ? null : +i, s); }
    });
  }
}
