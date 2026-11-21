// Чат-квест: переписка в мессенджере (отель, кафе, собеседование). Где-то выбираешь ответ, где-то допечатываешь слово.
import { t, L } from '../i18n.js';
import { CHATS } from '../learn/words3.js';
import { shuffle, pick, esc, wait, flash } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';

export default function chat(el, ctx) {
  const q = pick(CHATS);
  let i = 0, busy = true, line = null;

  el.innerHTML = `<div class="chat">
      <div class="ct-head"><b>${esc(q.who)}</b><small>${esc(L(q.title))}</small></div>
      <div class="ct-log en"></div>
      <div class="ct-input"></div>
    </div>`;
  const log = el.querySelector('.ct-log'), input = el.querySelector('.ct-input');
  let kb = null;
  const say = (who, html) => { log.insertAdjacentHTML('beforeend', `<div class="msg ${who}">${html}</div>`); log.scrollTop = log.scrollHeight; };

  async function next() {
    if (i >= q.steps.length) { ctx.setHint(null); await wait(900); return ctx.finish(true); }
    const st = q.steps[i++];
    const key = { en: 'chat:' + st.npc };
    log.insertAdjacentHTML('beforeend', '<div class="msg npc typing">…</div>');
    await wait(600);
    log.querySelector('.typing')?.remove();
    say('npc', esc(st.npc));
    if (st.type === 'pick') {
      kb?.destroy(); kb = null;
      const choices = shuffle([{ text: st.ok, ok: true }, ...st.bad.map((b) => ({ text: b, ok: false }))]);
      input.innerHTML = `<div class="ct-opts">${choices.map((c, k) => `<button class="dl-opt en" data-k="${k}">${esc(c.text)}</button>`).join('')}</div>`;
      input.querySelectorAll('.dl-opt').forEach((b) => b.addEventListener('click', async () => {
        if (busy || b.disabled) return;
        const c = choices[+b.dataset.k];
        if (!c.ok) { b.disabled = true; b.classList.add('bad'); flash(b, 'shake', 400); ctx.wrong(key); return; }
        busy = true; ctx.right(key); input.innerHTML = ''; say('me', esc(c.text)); await wait(300); next();
      }));
      ctx.setHint('ct' + i, (step) => {
        const bad = [...input.querySelectorAll('.dl-opt')].filter((b) => !choices[+b.dataset.k].ok && !b.disabled);
        if (step < 3 && bad[0]) { bad[0].disabled = true; bad[0].classList.add('gone'); return { label: t('hint.3'), text: t('hint.act') }; }
        input.querySelectorAll('.dl-opt').forEach((b) => { if (choices[+b.dataset.k].ok) b.classList.add('glow'); });
        return { label: t('hint.3'), text: t('hint.act') };
      });
    } else {
      const [a, b] = st.tpl.split('___');
      input.innerHTML = `<div class="msg me draft"><span>${esc(a)}</span><span class="slots"></span><span>${esc(b)}</span></div><div class="kb"></div>`;
      const slots = input.querySelector('.slots');
      kb?.destroy();
      kb = keyboard(input.querySelector('.kb'), (k) => { if (!busy) line.key(k); });
      line = typeLine(slots, st.a, {
        onRight: () => ctx.sfx('click'),
        onWrong: (k) => { kb.mark(k, 'bad'); flash(slots, 'shake', 350); ctx.wrong(key); },
        onDone: async () => { busy = true; ctx.right(key); await wait(400); input.innerHTML = ''; say('me', esc(st.tpl.replace('___', st.a))); next(); },
      });
      ctx.setHint('ct' + i, (step) => { line.reveal(); return { label: t('hint.3'), text: t('hint.act') }; });
    }
    busy = false;
  }
  next();
  return { destroy: () => kb?.destroy() };
}
