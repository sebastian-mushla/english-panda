// Письмо: собери e-mail по ситуации — для каждой части выбери фразу нужного стиля (дружеский или официальный).
import { t, L } from '../i18n.js';
import { EMAILS } from '../learn/words3.js';
import { shuffle, pick, esc, wait, flash } from './kit.js';

export default function email(el, ctx) {
  const mail = pick(EMAILS);
  let i = 0, busy = false;

  el.innerHTML = `<div class="email">
      <div class="em-task">✉️ ${esc(L(mail.task))}</div>
      <div class="em-sheet en"><div class="em-head"><span>To: <b>${esc(mail.to)}</b></span><span>Subject: <b>${esc(mail.subject)}</b></span></div><div class="em-body"></div></div>
      <div class="em-label"></div>
      <div class="em-opts"></div>
    </div>`;
  const body = el.querySelector('.em-body'), opts = el.querySelector('.em-opts');

  function next() {
    if (i >= mail.parts.length) {
      ctx.setHint(null);
      el.querySelector('.em-label').textContent = t('emailSent');
      opts.innerHTML = '';
      el.querySelector('.em-sheet').classList.add('sent');
      return setTimeout(() => ctx.finish(true), 1600);
    }
    const part = mail.parts[i++];
    const key = { en: 'mail:' + part.ok };
    el.querySelector('.em-label').textContent = `${i}/${mail.parts.length} · ${L(part.label)}`;
    const choices = shuffle([{ text: part.ok, ok: true }, ...part.bad.map((b) => ({ text: b, ok: false }))]);
    opts.innerHTML = choices.map((c, k) => `<button class="dl-opt en" data-k="${k}">${esc(c.text)}</button>`).join('');
    opts.querySelectorAll('.dl-opt').forEach((b) => b.addEventListener('click', async () => {
      if (busy || b.disabled) return;
      const c = choices[+b.dataset.k];
      if (c.ok) {
        busy = true;
        b.classList.add('ok');
        ctx.right(key);
        body.insertAdjacentHTML('beforeend', `<p class="em-line">${esc(c.text)}</p>`);
        await wait(500);
        busy = false;
        next();
      } else {
        b.disabled = true; b.classList.add('bad'); flash(b, 'shake', 400); ctx.wrong(key);
      }
    }));
    ctx.setHint('em' + i, (step) => {
      if (step === 1) return { label: t('hint.rule'), text: esc(t(mail.subject === 'Thank you!' ? 'rule.informal' : 'rule.formal')), en: false };
      const bad = [...opts.querySelectorAll('.dl-opt')].filter((b) => !choices[+b.dataset.k].ok && !b.disabled);
      if (step === 2 && bad[0]) { bad[0].disabled = true; bad[0].classList.add('gone'); return { label: t('hint.3'), text: t('hint.act') }; }
      opts.querySelectorAll('.dl-opt').forEach((b) => { if (choices[+b.dataset.k].ok) b.classList.add('glow'); });
      return { label: t('hint.3'), text: t('hint.act') };
    });
  }
  next();
}
