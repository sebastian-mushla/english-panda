// Тест данных обучения (без браузера): для каждой пары языков проверяем программу, задания, уроки, слова и духов.
// Запуск: node tests/data.mjs        (ненулевой код выхода, если есть ошибки)
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PAIRS = [['en', 'ru'], ['en', 'uk'], ['en', 'cz'], ['cz', 'ru'], ['cz', 'uk'], ['cz', 'cz'], ['ru', 'uk'], ['ru', 'cz'], ['hu', 'ru']];
const self = fileURLToPath(import.meta.url);

if (process.env.PAIR) {
  // проверка одной пары (запускается в отдельном процессе, чтобы модули прочитали свою пару языков)
  const [T, N] = process.env.PAIR.split('-');
  const store = { 'ep.target': T, 'ep.lang': N };
  globalThis.localStorage = { getItem: (k) => store[k] ?? null, setItem() {}, removeItem() {} };
  const root = new URL('../src/', import.meta.url);
  const cur = await import(new URL('learn/curriculum.js', root));
  const gram = await import(new URL('games/gram.js', root));
  const { LESSONS } = await import(new URL('learn/lessons.js', root));
  const { MOBS } = await import(new URL('learn/mobs.js', root));
  const { BY_THEME, CH3_OPEN, CH4_OPEN, CH5_OPEN } = await import(new URL('learn/words.js', root));
  const open = { 3: CH3_OPEN, 4: CH4_OPEN, 5: CH5_OPEN };
  const bad = [];
  const t = (o) => (o == null ? '' : typeof o === 'string' ? o : o[N] ?? o.ru);
  for (const l of cur.LEVELS) {
    if (open[l.ch] === false) continue; // глава закрыта для этого языка
    if (l.mob && !MOBS[l.mob]) bad.push(`ур. ${l.n}: нет духа ${l.mob}`);
    if (!l.built) {
      const ws = BY_THEME[l.theme] || [];
      if (!l.exam && ws.length < 4) bad.push(`ур. ${l.n}: в теме ${l.theme} меньше 4 слов`);
      for (const w of ws) {
        if (!w.t) bad.push(`ур. ${l.n}: слово без написания (${w.en})`);
        if (w.ex && w.ex.split('___').length !== 2) bad.push(`ур. ${l.n}: пример «${w.ex}» — не один пропуск`);
      }
      continue;
    }
    const parts = l.phases ? l.phases.map((_, i) => cur.buildPlay(l.n, i).def) : [cur.buildPlay(l.n).def];
    for (const d of parts) {
      const pool = gram.gramPool({ def: d });
      const id = `ур. ${l.n}${d.phase != null ? '.' + (d.phase + 1) : ''} (${d.gram})`;
      if (pool.length < 6) bad.push(`${id}: заданий ${pool.length} < 6`);
      for (const it of pool) {
        if (it.s.split('___').length !== 2) bad.push(`${id}: «${it.s}» — не один пропуск`);
        if (!gram.gramOptions(it).includes(it.a)) bad.push(`${id}: верного ответа нет среди вариантов («${it.s}»)`);
        if (/…/.test(it.a)) bad.push(`${id}: ответ с многоточием нельзя напечатать («${it.a}»)`);
      }
      if (!l.exam) for (const k of d.gram.split('|')) if (!LESSONS[T]?.[k]) bad.push(`${id}: нет урока для ${k}`);
      if (!l.exam && !t(d.title)) bad.push(`${id}: нет названия`);
    }
  }
  const xs = cur.NODE_X;
  if (!xs.every((x, i) => !i || x > xs[i - 1])) bad.push('камни на карте идут не по порядку');
  console.log(JSON.stringify({ levels: cur.LEVELS.length, bad }));
} else {
  let fail = 0;
  for (const [T, N] of PAIRS) {
    const r = spawnSync(process.execPath, [self], { env: { ...process.env, PAIR: `${T}-${N}` }, encoding: 'utf8' });
    let res;
    try { res = JSON.parse(r.stdout.trim().split('\n').pop()); } catch { res = { levels: 0, bad: [(r.stderr || r.stdout).slice(0, 600)] }; }
    const ok = !res.bad.length;
    if (!ok) fail++;
    console.log(`${ok ? '✓' : '✗'} ${T} ← ${N}: уровней ${res.levels}${ok ? '' : '\n   ' + res.bad.slice(0, 15).join('\n   ')}`);
  }
  console.log(fail ? `\nОшибки в ${fail} парах` : '\nВсе пары в порядке');
  process.exit(fail ? 1 : 0);
}
