// Книга духов: пойманные духи, достижения, свитки-сертификаты.
import { state } from '../state.js';
import { t, L } from '../i18n.js';
import { MOBS, mobSVG } from '../learn/mobs.js';
import { LEVELS, CHAPTERS } from '../learn/curriculum.js';
import { ACH } from '../progress.js';
import { board, openModal } from './modal.js';
import { sfx } from '../audio.js';

export function openBook(tab = 'spirits') {
  board({
    title: t('book'), icon: '📖', active: tab, cls: 'book',
    tabs: [{ id: 'spirits', label: t('tab.spirits') }, { id: 'ach', label: t('tab.ach') }, { id: 'certs', label: t('tab.certs') }],
    render(id, panel) {
      if (id === 'spirits') return spirits(panel);
      if (id === 'ach') return achievements(panel);
      certs(panel);
    },
  });
}

function spirits(panel) {
  const ids = LEVELS.map((l) => l.mob);
  panel.innerHTML = `<div class="split"><div class="medals"></div><div class="detail"></div></div>`;
  const medals = panel.querySelector('.medals'), detail = panel.querySelector('.detail');
  medals.innerHTML = ids.map((id, i) => `<button class="medal ${state.mobs[id] ? '' : 'unknown'}" data-id="${id}" data-n="${i + 1}">${mobSVG(id)}</button>`).join('');
  const show = (b) => {
    medals.querySelectorAll('.medal').forEach((m) => m.classList.toggle('on', m === b));
    const id = b.dataset.id, m = MOBS[id], known = !!state.mobs[id];
    detail.innerHTML = `<div class="card-head"><h3>${known ? L(m.name) : t('unknownSpirit')}</h3><span class="num">#${b.dataset.n}</span></div>
      <div class="big-medal ${known ? '' : 'unknown'}">${mobSVG(id)}</div>
      <p class="note">${known ? L(m.text) : t('unknownText', { n: b.dataset.n })}</p>
      <div class="card-foot"><span>${known ? t('beaten', { n: state.mobs[id] }) : '???'}</span><span>${m.reward} <i class="coin"></i></span></div>`;
  };
  medals.querySelectorAll('.medal').forEach((b) => b.addEventListener('click', () => { sfx('click'); show(b); }));
  show(medals.querySelector('.medal:not(.unknown)') || medals.firstElementChild);
}

function achievements(panel) {
  panel.innerHTML = `<div class="ach-list">${ACH.map((a) => `<div class="ach ${state.ach[a.id] ? 'on' : ''}">
    <span class="medal sm">${a.icon}</span><div><b>${L(a.name)}</b><span>${L(a.text)}</span></div><em>${state.ach[a.id] ? '✓' : '+15 <i class="coin"></i>'}</em></div>`).join('')}</div>`;
}

function certs(panel) {
  if (!state.certs.length) { panel.innerHTML = `<p class="empty">${t('noCerts')}</p>`; return; }
  panel.innerHTML = `<div class="cert-list">${state.certs.map((c, i) => `<button class="cert-mini" data-i="${i}"><span>📜</span><b>${t('certTitle')}</b><small>${c.cefr || 'A1'} · ${c.date}</small></button>`).join('')}</div>`;
  panel.querySelectorAll('.cert-mini').forEach((b) => b.addEventListener('click', () => openCertificate(state.certs[+b.dataset.i])));
}

export function openCertificate(c) {
  const m = openModal(`<div class="certificate" id="cert-print">
      <div class="cert-roll"></div>
      <div class="cert-body">
        <div class="seal">${({ 1: '春', 2: '夏', 3: '秋' })[c.ch || 1]}</div>
        <h2>${t('certTitle')}</h2>
        <p>${t('certConfirms')}</p>
        <div class="cert-name">${c.name || state.name || '🐼'}</div>
        <p>${t('certText', { chn: L(CHAPTERS[c.ch || 1].name), cefr: c.cefr || 'A1' })}</p>
        <div class="cert-level">CEFR <b>${c.cefr || 'A1'}</b> · ${({ 1: 'Starter', 2: 'Elementary', 3: 'Intermediate' })[c.ch || 1]}</div>
        <p class="cert-next">${t({ 1: 'certNext', 2: 'certNext2', 3: 'certNext3' }[c.ch || 1])}</p>
        <p class="cert-off">${t('certOfficial')}</p>
        <div class="cert-foot"><span>English Panda</span><span>${c.date}</span></div>
      </div>
      <div class="cert-roll"></div>
    </div>
    <div class="stage-actions"><button class="btn small print">🖨️ ${t('print')}</button></div>`, { cls: 'cert-modal' });
  m.body.querySelector('.print').addEventListener('click', () => window.print());
}
