// Окна: обычное модальное окно, деревянная доска с вкладками-вывесками и всплывающие тосты.
import { sfx } from '../audio.js';

const stack = [];

export function openModal(html = '', { cls = '', onClose, closable = true } = {}) {
  const el = document.createElement('div');
  el.className = 'modal ' + cls;
  el.innerHTML = `<div class="modal-back"></div><div class="modal-box" role="dialog" aria-modal="true">
    ${closable ? '<button class="x" aria-label="✕">✕</button>' : ''}<div class="modal-body">${html}</div></div>`;
  document.getElementById('modal-root').append(el);
  const body = el.querySelector('.modal-body');
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    stack.splice(stack.indexOf(api), 1);
    el.classList.add('out');
    setTimeout(() => el.remove(), 220);
    onClose?.();
  };
  const api = { el, body, close, closable };
  stack.push(api);
  if (closable) {
    el.querySelector('.x').addEventListener('click', () => { sfx('click'); close(); });
    el.querySelector('.modal-back').addEventListener('click', close);
  }
  return api;
}

addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && stack.length && stack[stack.length - 1].closable) stack[stack.length - 1].close();
});

// Доска как в старых флеш-играх: заголовок, вывески на верёвках, пергамент
export function board({ title, icon = '', tabs, active, render, cls = '', onClose }) {
  const m = openModal(`<header class="board-head"><h2><span>${icon}</span>${title}</h2></header>
    <nav class="signs">${tabs.map((tb) => `<button class="sign" data-tab="${tb.id}">${tb.label}</button>`).join('')}</nav>
    <div class="board-panel parch"></div>`, { cls: 'board ' + cls, onClose });
  const panel = m.body.querySelector('.board-panel');
  const set = (id) => {
    m.body.querySelectorAll('.sign').forEach((b) => b.classList.toggle('on', b.dataset.tab === id));
    panel.innerHTML = '';
    render(id, panel);
  };
  m.body.querySelectorAll('.sign').forEach((b) => b.addEventListener('click', () => { sfx('click'); set(b.dataset.tab); }));
  set(active || tabs[0].id);
  return { ...m, panel, set };
}

export function toast(text, icon = '✨') {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i>${icon}</i><span>${text}</span>`;
  document.getElementById('toast-root').append(el);
  setTimeout(() => el.classList.add('out'), 2400);
  setTimeout(() => el.remove(), 2800);
}
