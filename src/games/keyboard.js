// Экранная клавиатура изучаемого языка + физическая клавиатура. Общая для игр с печатью.
import { ROWS, VARIANTS, PHYS, keyLetter, norm } from '../learn/lang.js';

// Буквы с диакритикой и ряд «нужных букв»: над клавиатурой — только те из них, что есть в текущем слове
const ACCENTED = new Set(Object.values(VARIANTS).join(''));
const live = new Set(); // открытые клавиатуры (typeLine сообщает им слово)
let lastNeed = [];
export function needLetters(words) {
  lastNeed = [...new Set([].concat(words).join('').toLowerCase())].filter((c) => ACCENTED.has(c));
  for (const kb of live) kb.need(lastNeed);
}
export { keyLetter };

// onKey получает 'a'..'z', ' ' или 'back'
export function keyboard(el, onKey) {
  el.classList.add('kbd');
  const last = ROWS.length - 1;
  // пробел и ⌫ — в последнем ряду; у букв с вариантами (á, ö, ř…) точка-подсказка, варианты по долгому нажатию
  el.innerHTML = '<div class="kacc" hidden></div>' + ROWS.map((r, i) => `<div class="krow">${i === last ? '<button class="key space" data-k=" ">␣</button>' : ''}${[...r].map((c) => `<button class="key${VARIANTS[c] ? ' has-var' : ''}" data-k="${c}">${c}</button>`).join('')}${i === last ? '<button class="key wide" data-k="back">⌫</button>' : ''}</div>`).join('') +
    '<div class="kvar" hidden></div>';
  const pop = el.querySelector('.kvar'), acc = el.querySelector('.kacc');
  const btn = (k) => el.querySelector(`.krow .key[data-k="${k === ' ' ? ' ' : k}"]`) || acc.querySelector(`[data-k="${k}"]`) || pop.querySelector(`[data-k="${k}"]`);
  const press = (k) => {
    const b = btn(k);
    if (b) { b.classList.add('down'); setTimeout(() => b.classList.remove('down'), 110); }
    onKey(k);
  };
  let holdT = 0, held = null;
  const closePop = () => { pop.hidden = true; pop.innerHTML = ''; };
  function openPop(b) {
    const k = b.dataset.k;
    pop.innerHTML = [k, ...VARIANTS[k]].map((c) => `<button class="key" data-k="${c}">${c}</button>`).join('');
    const r = b.getBoundingClientRect(), er = el.getBoundingClientRect();
    pop.style.left = Math.max(0, Math.min(er.width - pop.offsetWidth, r.left - er.left + r.width / 2)) + 'px';
    pop.style.top = (r.top - er.top) + 'px';
    pop.hidden = false;
    pop.style.left = Math.max(0, Math.min(er.width - pop.offsetWidth, r.left - er.left + r.width / 2 - pop.offsetWidth / 2)) + 'px';
  }
  el.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('.key');
    if (!b) return;
    e.preventDefault();
    if (b.parentElement === pop || b.parentElement === acc) { closePop(); press(b.dataset.k); return; }
    closePop();
    if (VARIANTS[b.dataset.k]) {
      held = b;
      holdT = setTimeout(() => { openPop(b); held = null; }, 330);
      return;
    }
    press(b.dataset.k);
  });
  // короткое нажатие на букву с вариантами — обычная буква
  el.addEventListener('pointerup', (e) => {
    if (!held) return;
    clearTimeout(holdT);
    const b = held; held = null;
    press(b.dataset.k);
  });
  el.addEventListener('pointercancel', () => { clearTimeout(holdT); held = null; });
  const onDoc = (e) => {
    if (e.target.closest?.('input,textarea')) return;
    const k = keyLetter(e);
    if (!k) return;
    e.preventDefault();
    press(k);
  };
  addEventListener('keydown', onDoc);
  const api = {
    // ряд нужных букв: крупные кнопки, на ПК в углу — клавиша национальной раскладки
    need(letters) {
      acc.innerHTML = letters.map((c) => `<button class="key" data-k="${c}">${PHYS[c] ? `<sup>${PHYS[c][0]}</sup>` : ''}${c}</button>`).join('');
      acc.hidden = !letters.length;
    },
    destroy: () => { live.delete(api); removeEventListener('keydown', onDoc); },
    mark(k, cls) { const b = btn(k); if (b) { b.classList.add(cls); setTimeout(() => b.classList.remove(cls), 400); } },
    // «Фонарь»: использованные буквы гаснут до следующего слова
    used(k, ok) { btn(k)?.classList.add(ok ? 'hit' : 'miss'); },
    reset() { el.querySelectorAll('.key').forEach((b) => b.classList.remove('hit', 'miss')); },
  };
  live.add(api);
  api.need(lastNeed);
  return api;
}

// Строка ввода одного слова: буквы проверяются сразу, пробелы проставляются сами
export function typeLine(el, word, { onRight, onWrong, onDone }) {
  needLetters(word);
  const letters = [...word];
  let pos = 0;
  // пробел — промежуток, апостроф, дефис и точка вписаны заранее: их нет на клавиатуре
  const auto = (c) => c !== undefined && !/[\p{L}\d]/u.test(c);
  el.innerHTML = letters.map((c) => (c === ' ' ? '<i class="gap"></i>' : auto(c) ? `<i class="slot filled">${c}</i>` : '<i class="slot"></i>')).join('');
  el.style.setProperty('--n', letters.length);
  const skip = () => { while (auto(letters[pos])) pos++; };
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
