// Экранная клавиатура изучаемого языка + физическая клавиатура. Общая для игр с печатью.
import { ROWS, keyLetter, norm } from '../learn/lang.js';
export { keyLetter };

// onKey получает 'a'..'z', ' ' или 'back'
export function keyboard(el, onKey) {
  el.classList.add('kbd');
  el.innerHTML = ROWS.map((r, i) => `<div class="krow">${[...r].map((c) => `<button class="key" data-k="${c}">${c}</button>`).join('')}${i === ROWS.length - 1 ? '<button class="key wide" data-k="back">⌫</button>' : ''}</div>`).join('') +
    '<div class="krow"><button class="key space" data-k=" ">space</button></div>';
  const btn = (k) => el.querySelector(`.key[data-k="${k === ' ' ? ' ' : k}"]`);
  const press = (k) => {
    const b = btn(k);
    if (b) { b.classList.add('down'); setTimeout(() => b.classList.remove('down'), 110); }
    onKey(k);
  };
  el.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('.key');
    if (!b) return;
    e.preventDefault();
    press(b.dataset.k);
  });
  const onDoc = (e) => {
    if (e.target.closest?.('input,textarea')) return;
    const k = keyLetter(e);
    if (!k) return;
    e.preventDefault();
    press(k);
  };
  addEventListener('keydown', onDoc);
  return {
    destroy: () => removeEventListener('keydown', onDoc),
    mark(k, cls) { const b = btn(k); if (b) { b.classList.add(cls); setTimeout(() => b.classList.remove(cls), 400); } },
  };
}

// Строка ввода одного слова: буквы проверяются сразу, пробелы проставляются сами
export function typeLine(el, word, { onRight, onWrong, onDone }) {
  const letters = [...word];
  let pos = 0;
  el.innerHTML = letters.map((c) => (c === ' ' ? '<i class="gap"></i>' : '<i class="slot"></i>')).join('');
  el.style.setProperty('--n', letters.length);
  const skip = () => { while (letters[pos] === ' ') pos++; };
  skip();
  const put = () => {
    const s = el.children[pos];
    s.textContent = letters[pos];
    s.classList.add('filled');
    pos++;
    skip();
    onRight?.();
    if (pos >= letters.length) onDone();
  };
  return {
    key(k) {
      if (pos >= letters.length || k === 'back' || k === ' ') return;
      if (norm(k) === norm(letters[pos])) put();
      else { el.children[pos]?.classList.add('miss'); setTimeout(() => el.children[pos]?.classList.remove('miss'), 350); onWrong(k); }
    },
    reveal() { if (pos < letters.length) put(); },
    get done() { return pos >= letters.length; },
  };
}
