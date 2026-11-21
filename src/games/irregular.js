// Неправильные глаголы: дана первая форма (go) — впиши вторую (went) и третью (gone).
import { t } from '../i18n.js';
import { shuffle, meaning, esc, wait, flash } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';

export default function irregular(el, ctx) {
  const verbs = shuffle(ctx.pool.filter((w) => w.v2)).slice(0, 5);
  const total = verbs.length;
  let line, busy = true, cur, form;

  el.innerHTML = `<div class="typer irreg">
      <div class="ir-card"><span class="emo"></span><span class="ir-mean"></span></div>
      <div class="ir-table en"><div><small>V1</small><b class="ir-v1"></b></div><div><small>V2 · Past</small><span class="slots ir-v2"></span></div><div><small>V3 · Participle</small><span class="slots ir-v3"></span></div></div>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const kb = keyboard(el.querySelector('.kb'), (k) => { if (!busy) line.key(k); });

  function start(which) {
    form = which;
    const target = (which === 2 ? cur.v2 : cur.v3).split('/')[0];
    const slots = el.querySelector(which === 2 ? '.ir-v2' : '.ir-v3');
    slots.classList.add('active');
    line = typeLine(slots, target, {
      onRight: () => ctx.sfx('click'),
      onWrong: (k) => { kb.mark(k, 'bad'); flash(slots, 'shake', 350); ctx.wrong(cur); },
      onDone: async () => {
        slots.classList.remove('active'); slots.classList.add('ok');
        if (which === 2) return start(3);
        busy = true; ctx.right(cur); await wait(1100); next();
      },
    });
  }

  function next() {
    if (!verbs.length) return ctx.finish(true);
    cur = verbs.shift();
    el.querySelector('.ir-card .emo').textContent = cur.emoji;
    el.querySelector('.ir-mean').textContent = meaning(cur);
    el.querySelector('.ir-v1').textContent = cur.t;
    el.querySelectorAll('.ir-table .slots').forEach((s) => { s.className = 'slots ' + (s.classList.contains('ir-v2') ? 'ir-v2' : 'ir-v3'); s.innerHTML = ''; });
    el.querySelector('.count').textContent = `${total - verbs.length} / ${total}`;
    const w = cur;
    ctx.setHint('ir' + w.en, (step) => {
      if (step === 1) return { label: t('hint.1'), text: esc(t('irregTip')), en: false };
      line.reveal();
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
    start(2);
  }
  next();
  return { destroy: kb.destroy };
}
