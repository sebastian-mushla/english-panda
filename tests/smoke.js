// Браузерный тест (только localhost): запускает каждый этап каждого уровня и фазы, жмёт «Я готов»
// и ловит ошибки и пустые экраны. Открыть: http://localhost:5188/?smoke=en-ru (изучаемый-родной)
// или ?smoke=all — все пары подряд. Итог: на экране и в window.__SMOKE.
import { state, TARGET, setLanguages } from '../src/state.js';

const ALL = ['en-ru', 'en-uk', 'en-cz', 'cz-ru', 'cz-uk', 'cz-cz', 'ru-uk', 'hu-ru'];
// ?smoke=cz-uk,hu-ru — несколько пар через запятую
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function runSmoke(arg) {
  let queue = JSON.parse(sessionStorage.getItem('ep.smokeq') || 'null') || (arg === 'all' ? [...ALL] : arg.split(','));
  const pair = queue[0], [T, N] = pair.split('-');
  // режим админа нужен, чтобы пройти все уровни, а не только открытые в сохранении
  if (localStorage.getItem('ep.admin.open') !== '1') { localStorage.setItem('ep.admin.open', '1'); sessionStorage.setItem('ep.smokeq', JSON.stringify(queue)); return location.reload(); }
  if (TARGET !== T || state.lang !== N) { sessionStorage.setItem('ep.smokeq', JSON.stringify(queue)); return setLanguages(N, T); }
  const box = document.createElement('pre');
  box.id = 'smoke';
  box.style.cssText = 'position:fixed;z-index:99999;left:8px;bottom:8px;max-width:90vw;max-height:40vh;overflow:auto;background:#111c;color:#cfc;font:12px monospace;padding:8px;border-radius:8px';
  document.body.append(box);
  const log = (s) => { box.textContent += s + '\n'; };
  const errs = [];
  const onErr = (e) => errs.push(String(e.reason?.message || e.error?.message || e.message));
  addEventListener('error', onErr);
  addEventListener('unhandledrejection', onErr);
  const cur = await import('../src/learn/curriculum.js');
  const play = await import('../src/ui/play.js');
  const bad = [];
  let n = 0;
  log(`▶ ${pair}`);
  for (const l of cur.LEVELS) {
    if (!cur.isUnlocked(l.n)) continue; // с режимом админа открыты все уровни глав, доступных этому языку
    const parts = l.phases ? l.phases.map((_, i) => i) : [null];
    for (const ph of parts) {
      const stages = ph == null ? l.stages : l.phases[ph].stages;
      for (const st of stages) {
        const p = cur.buildPlay(l.n, ph);
        p.def = { ...p.def, stages: [st] };
        const before = errs.length;
        window.__stageErrors = [];
        try { play.runPlay(p, { onExit() {}, onNext() {} }); } catch (e) { errs.push(e.message); }
        await wait(90);
        document.querySelector('#game .go')?.click();
        // ждём, пока игра отрисуется (первая загрузка модуля бывает дольше), до ~1,2 с
        let area, empty = true;
        for (let k = 0; k < 6 && empty; k++) { await wait(200); area = document.querySelector('#game .g-stage-area'); empty = !area || !area.textContent.trim(); }
        const fail = errs.length > before || window.__stageErrors.length || empty;
        if (fail) bad.push(`ур. ${l.n}${ph != null ? '.' + (ph + 1) : ''} ${st}: ${errs.slice(before).concat(window.__stageErrors).join(' | ') || 'пустой экран'}`);
        document.querySelector('#game .g-x')?.click();
        await wait(40);
        document.querySelector('.modal .btn')?.click();
        n++;
      }
    }
  }
  const res = { pair, stages: n, bad };
  log(bad.length ? `✗ ${pair}: ${bad.length} ошибок из ${n}\n  ${bad.slice(0, 20).join('\n  ')}` : `✓ ${pair}: ${n} этапов без ошибок`);
  const all = JSON.parse(sessionStorage.getItem('ep.smokeres') || '[]');
  all.push(res);
  sessionStorage.setItem('ep.smokeres', JSON.stringify(all));
  window.__SMOKE = all;
  if (queue.length > 1) {
    queue = queue.slice(1);
    sessionStorage.setItem('ep.smokeq', JSON.stringify(queue));
    const [T2, N2] = queue[0].split('-');
    return setLanguages(N2, T2);
  }
  sessionStorage.removeItem('ep.smokeq');
  document.title = all.every((r) => !r.bad.length) ? 'SMOKE OK' : 'SMOKE FAIL';
  log(document.title);
}
