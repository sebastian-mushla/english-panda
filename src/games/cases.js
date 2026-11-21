// Падежное колесо: одно существительное во всех падежах. Вопрос и рамка-предложение подсказывают падеж, форму надо впечатать.
import { t, L } from '../i18n.js';
import { shuffle, esc, wait, flash } from './kit.js';
import { keyboard, typeLine } from './keyboard.js';
import { CASES, NOUNS } from '../learn/words4cz.js';

const ROUNDS = 2, PER = 3;

export default function cases(el, ctx) {
  const own = ctx.words.filter((w) => w.forms);
  const nouns = shuffle(own.length ? own : NOUNS.map(([forms, ru, uk, emoji]) => ({ en: 'n:' + forms[0], t: forms[0], forms, ru, uk, emoji }))).slice(0, ROUNDS);
  let round = 0, line, busy = true, asks = [], cur;

  el.innerHTML = `<div class="typer cwheel">
      <div class="cw-head"><span class="emo"></span><b class="en"></b><small></small></div>
      <div class="cw-rows en"></div>
      <div class="count"></div>
      <div class="kb"></div>
    </div>`;
  const rows = el.querySelector('.cw-rows');
  const kb = keyboard(el.querySelector('.kb'), (k) => { if (!busy) line.key(k); });

  function nextNoun() {
    if (round >= nouns.length) return ctx.finish(true);
    cur = nouns[round++];
    asks = shuffle(CASES.slice(1).map((c) => c.n)).slice(0, PER).sort((a, b) => a - b);
    el.querySelector('.cw-head .emo').textContent = cur.emoji;
    el.querySelector('.cw-head b').textContent = cur.t;
    el.querySelector('.cw-head small').textContent = L({ ru: cur.ru, uk: cur.uk });
    rows.innerHTML = CASES.map((c) => {
      const [a, b] = c.frame.split('___');
      const known = c.n === 1 || !asks.includes(c.n);
      return `<div class="cw-row ${known ? 'known' : ''}" data-n="${c.n}"><i>${c.n}</i><small>${esc(c.q)}</small>
        <span>${esc(a)}${known ? `<b>${esc(cur.forms[c.n - 1])}</b>` : '<span class="slots"></span>'}${esc(b)}</span></div>`;
    }).join('');
    el.querySelector('.count').textContent = `${round} / ${nouns.length}`;
    ask();
  }

  function ask() {
    const n = asks.shift();
    if (!n) { busy = true; return wait(700).then(nextNoun); }
    const c = CASES[n - 1], row = rows.querySelector(`[data-n="${n}"]`);
    rows.querySelectorAll('.cw-row').forEach((r) => r.classList.toggle('active', r === row));
    const slots = row.querySelector('.slots');
    const key = { en: 'case:' + cur.t + ':' + n };
    line = typeLine(slots, cur.forms[n - 1], {
      onRight: () => ctx.sfx('click'),
      onWrong: (k) => { kb.mark(k, 'bad'); flash(slots, 'shake', 350); ctx.wrong(key); },
      onDone: async () => { busy = true; row.classList.add('ok'); ctx.right(key); kb.reset?.(); await wait(500); busy = false; ask(); },
    });
    ctx.setHint('cw' + cur.t + n, (step) => {
      if (step === 1) return { label: t('hint.rule'), text: `${n}. pád — ${esc(L(c))} (${esc(c.q)})`, en: false };
      line.reveal();
      return { label: t('hint.3'), text: t('hint.act') };
    });
    busy = false;
  }

  nextNoun();
  return { destroy: kb.destroy };
}
