// Знакомство: карточки новых слов с озвучкой; обратная сторона — перевод и пример.
import { t } from '../i18n.js';
import { meaning, fillEx, esc } from './kit.js';
import { markSeen } from '../learn/srs.js';

export default function intro(el, ctx) {
  const ws = ctx.words;
  ctx.setHint(null);
  el.innerHTML = `<div class="intro-grid">${ws.map((w, i) => `
    <button class="icard" data-i="${i}" style="animation-delay:${i * 60}ms">
      <span class="icard-in">
        <span class="face front"><span class="emo">${w.emoji}</span><span class="en">${esc(w.t)}</span></span>
        <span class="face back"><span class="mean">${esc(meaning(w))}</span><span class="ex en">${fillEx(w)}</span></span>
      </span></button>`).join('')}</div>
    <div class="stage-actions"><button class="btn red go">${t('ready')}</button></div>`;
  el.querySelectorAll('.icard').forEach((b) => b.addEventListener('click', () => {
    b.classList.toggle('flip');
    ctx.sfx('flip');
  }));
  el.querySelector('.go').addEventListener('click', () => { markSeen(ws); ctx.finish(true); });
}
