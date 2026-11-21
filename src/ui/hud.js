// Верхняя панель: вывеска главы, задание дня, монеты, звёзды, кнопки окон, язык, звук, настройки.
import { state, save, on, emit, totalStars, resetAll, TARGET } from '../state.js';
import { LANG_NAME, FLAG } from '../learn/lang.js';
import { langPickHTML, bindLangPick } from './langpick.js';
import { t } from '../i18n.js';
import { setSound, startAmbient, sfx } from '../audio.js';
import { ensureDaily } from '../progress.js';
import { openModal } from './modal.js';

const el = document.getElementById('hud');
let zone = null, actions = {};

export function initHud(a) {
  actions = a;
  render();
  on('coins', (n) => { render(); if (n > 0) el.querySelector('.h-coins')?.classList.add('bump'); });
  ['lang', 'progress', 'daily'].forEach((ev) => on(ev, render));
}

export function setZone(z) {
  zone = z;
  const zEl = el.querySelector('.h-zone');
  if (zEl) { zEl.textContent = t('zone.' + z.id); zEl.classList.remove('swap'); void zEl.offsetWidth; zEl.classList.add('swap'); }
}

function render() {
  const q = ensureDaily();
  el.innerHTML = `
    <div class="h-left">
      <div class="h-sign"><span class="h-ch">${t('chapter')}</span><span class="h-zone">${zone ? t('zone.' + zone.id) : ''}</span></div>
      <div class="h-daily ${q.done ? 'done' : ''}" title="${t('daily')}"><b>🎋 ${t('daily')}</b><span>${t('daily.' + q.kind)}</span>
        <i class="bar"><i style="width:${q.prog / q.goal * 100}%"></i></i><em>${q.done ? '✓' : `${q.prog}/${q.goal} · +30`}</em></div>
    </div>
    <div class="h-right">
      <span class="h-pill h-coins"><i class="coin"></i><b>${state.coins}</b></span>
      <span class="h-pill h-stars"><i>★</i><b>${totalStars()}</b></span>
      <button class="h-btn" data-a="book" title="${t('book')}"><i>📖</i><span>${t('book')}</span></button>
      <button class="h-btn" data-a="shop" title="${t('shop')}"><i>🏮</i><span>${t('shop')}</span></button>
      <button class="h-btn" data-a="dict" title="${t('dict')}"><i>📜</i><span>${t('dict')}</span></button>
      <button class="h-btn lang" data-a="settings" title="${t('learning')}: ${LANG_NAME[TARGET][state.lang]}"><i>${FLAG[state.lang]}</i>→<i>${FLAG[TARGET]}</i></button>
      <button class="h-btn round" data-a="sound" title="${t('sound')}">${state.sound ? '🔊' : '🔇'}</button>
      <button class="h-btn round" data-a="settings" title="${t('settings')}">⚙️</button>
    </div>`;
  el.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => {
    const a = b.dataset.a;
    sfx('click');
    if (a === 'sound') { setSound(!state.sound); if (state.sound) startAmbient(); save(); render(); return; }
    if (a === 'settings') return openSettings();
    actions[a]?.();
  }));
}

export function openSettings() {
  const v = state.view;
  const opt = (name, val, label) => `<button class="chip ${v[name] === val ? 'on' : ''}" data-k="${name}" data-v="${val}">${label}</button>`;
  const m = openModal(`<div class="settings parch">
      <h2>⚙️ ${t('settings')}</h2>
      <label>${t('name')}<input class="name" maxlength="30" value="${state.name.replace(/"/g, '&quot;')}"></label>
      ${langPickHTML()}
      <div class="row"><span>${t('season')}</span><div class="chips">${['auto', 'spring', 'summer', 'autumn', 'winter'].map((s) => opt('season', s, t('season.' + s))).join('')}</div></div>
      <div class="row"><span>${t('dayTime')}</span><div class="chips">${opt('time', 'scroll', t('time.scroll'))}${opt('time', 'real', t('time.real'))}</div></div>
      <div class="row end"><button class="btn small danger">${t('reset')}</button></div>
    </div>`, { cls: 'small' });
  const b = m.body;
  b.querySelector('.name').addEventListener('input', (e) => { state.name = e.target.value.trim(); save(); });
  bindLangPick(b);

  b.querySelectorAll('[data-k]').forEach((x) => x.addEventListener('click', () => {
    state.view[x.dataset.k] = x.dataset.v; save(); emit('view');
    b.querySelectorAll(`[data-k="${x.dataset.k}"]`).forEach((y) => y.classList.toggle('on', y === x));
  }));
  b.querySelector('.danger').addEventListener('click', () => { if (confirm(t('resetConfirm'))) resetAll(); });
}
