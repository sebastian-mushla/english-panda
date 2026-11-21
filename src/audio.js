// Звуки на WebAudio (без файлов). Озвучки слов нет: всё обучение через чтение и печать.
import { state } from './state.js';

let ac = null, master = null, waterGain = null, windGain = null;
const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66];

function ctx() {
  if (!ac) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ac = new AC();
    master = ac.createGain();
    master.gain.value = state.sound ? 0.8 : 0;
    master.connect(ac.destination);
  }
  if (ac.state === 'suspended') ac.resume();
  return ac;
}

function tone(freq, dur, { type = 'triangle', vol = 0.18, at = 0, slide = 0 } = {}) {
  const c = ctx(); if (!c) return;
  const t0 = c.currentTime + at;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(master);
  o.start(t0); o.stop(t0 + dur + 0.05);
}

function noise(dur, { vol = 0.12, freq = 1200, q = 1, at = 0 } = {}) {
  const c = ctx(); if (!c) return;
  const t0 = c.currentTime + at;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q; g.gain.value = vol;
  src.connect(f).connect(g).connect(master);
  src.start(t0);
}

export function sfx(name) {
  if (!state.sound) return;
  switch (name) {
    case 'click': tone(880, 0.06, { type: 'sine', vol: 0.08 }); noise(0.04, { vol: 0.05, freq: 2400 }); break;
    case 'flip': noise(0.12, { vol: 0.08, freq: 1800, q: 0.7 }); break;
    case 'right': tone(PENTA[2], 0.35); tone(PENTA[4], 0.45, { at: 0.08 }); break;
    case 'wrong': tone(180, 0.3, { type: 'sine', vol: 0.2, slide: -80 }); noise(0.15, { vol: 0.06, freq: 400 }); break;
    case 'coin': tone(1318, 0.08, { type: 'square', vol: 0.05 }); tone(1760, 0.18, { type: 'square', vol: 0.05, at: 0.07 }); break;
    case 'hit': noise(0.18, { vol: 0.18, freq: 700, q: 0.6 }); tone(120, 0.2, { type: 'sine', vol: 0.25, slide: -60 }); break;
    case 'win':
      [0, 2, 3, 4, 6].forEach((n, i) => tone(PENTA[n], 0.6, { at: i * 0.11, vol: 0.14 }));
      tone(110, 2.4, { type: 'sine', vol: 0.22, at: 0.55 }); tone(112.5, 2.4, { type: 'sine', vol: 0.12, at: 0.55 });
      break;
    case 'lose': [4, 3, 1, 0].forEach((n, i) => tone(PENTA[n] / 2, 0.5, { at: i * 0.16, vol: 0.12 })); break;
    case 'chime': tone(PENTA[Math.floor(Math.random() * PENTA.length)] * 2, 1.6, { type: 'sine', vol: 0.025 }); break;
  }
}

// Фоновый ветер и шум воды (громкость воды зависит от близости водопада)
export function startAmbient() {
  const c = ctx(); if (!c || windGain) return;
  const mk = (type, freq, vol) => {
    const len = c.sampleRate * 4, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = type === 'brown' ? last * 3.5 : w; }
    const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    const f = c.createBiquadFilter(); f.type = type === 'brown' ? 'lowpass' : 'bandpass'; f.frequency.value = freq; f.Q.value = 0.6;
    const g = c.createGain(); g.gain.value = vol;
    src.connect(f).connect(g).connect(master); src.start();
    return g;
  };
  windGain = mk('brown', 500, 0.05);
  waterGain = mk('white', 1400, 0);
  setInterval(() => { if (state.sound && Math.random() < 0.5) sfx('chime'); }, 7000);
  startFlute();
}

// Фоновая музыка (генеративная, без файлов): тихий гул-бурдон, щипки гучжэна и флейта
// с плавными подъездами между нотами. Всё идёт через общий ревербератор.
const SCALE = [146.83, 174.61, 196, 220, 261.63, 293.66, 349.23, 392, 440, 523.25, 587.33, 698.46]; // ре-минорная пентатоника
let musicBus = null, verb = null;
function startFlute() {
  const c = ac;
  musicBus = c.createGain(); musicBus.gain.value = 0.55;
  // ревербератор: импульс из затухающего шума (большой зал / долина)
  verb = c.createConvolver();
  const len = c.sampleRate * 3.5, ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
  verb.buffer = ir;
  const wet = c.createGain(); wet.gain.value = 0.55;
  musicBus.connect(master); musicBus.connect(verb); verb.connect(wet).connect(master);
  drone();
  // темп: одна «доля» 0.75 с; фразы флейты чередуются с паузами, гучжэн звучит всегда редкими щипками
  let deg = 7;
  const bar = () => {
    if (state.sound && !document.hidden) {
      const t0 = c.currentTime + 0.05;
      // гучжэн: 2–4 щипка на такт, иногда быстрая «рябь» вниз
      for (let k = 0; k < 4; k++) if (Math.random() < 0.6) pluck(SCALE[Math.floor(Math.random() * 8)], t0 + k * 0.75 + Math.random() * 0.05);
      if (Math.random() < 0.15) for (let k = 0; k < 4; k++) pluck(SCALE[9 - k], t0 + 2.6 + k * 0.11, 0.6);
      // флейта: фраза примерно в каждом втором такте
      if (Math.random() < 0.55) {
        let t = t0 + 0.4;
        const n = 2 + Math.floor(Math.random() * 3);
        for (let k = 0; k < n; k++) {
          const prev = SCALE[deg];
          deg = Math.max(5, Math.min(11, deg + [-2, -1, -1, 0, 1, 1, 2][Math.floor(Math.random() * 7)]));
          const dur = k === n - 1 ? 2.2 : [0.75, 1.1, 1.5][Math.floor(Math.random() * 3)];
          fluteNote(SCALE[deg], t, dur, prev);
          t += dur;
        }
      }
    }
    setTimeout(bar, 3000);
  };
  setTimeout(bar, 1500);
}
// бурдон: ре и ля в низу, медленно дышит
function drone() {
  const c = ac, g = c.createGain(), lp = c.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 420; g.gain.value = 0.05;
  for (const [f, det] of [[73.42, -4], [73.42, 5], [110, 0], [146.83, 3]]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det; o.connect(lp); o.start(); }
  const lfo = c.createOscillator(), ld = c.createGain(); lfo.frequency.value = 0.06; ld.gain.value = 0.025;
  lfo.connect(ld).connect(g.gain); lfo.start();
  lp.connect(g).connect(musicBus);
}
// щипок струны: Karplus-Strong в буфере (звучит как гучжэн)
const pluckCache = {};
function pluck(f, t, vol = 1) {
  const c = ac, key = Math.round(f);
  if (!pluckCache[key]) {
    const len = Math.floor(c.sampleRate * 2.5), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    const p = Math.round(c.sampleRate / f);
    for (let i = 0; i < p; i++) d[i] = Math.random() * 2 - 1;
    for (let i = p; i < len; i++) d[i] = 0.996 * 0.5 * (d[i - p] + d[i - p + 1]);
    pluckCache[key] = buf;
  }
  const src = c.createBufferSource(), g = c.createGain();
  src.buffer = pluckCache[key]; g.gain.value = 0.22 * vol;
  src.connect(g).connect(musicBus); src.start(t);
}
// нота флейты с подъездом от предыдущей, вибрато и дыханием
function fluteNote(f, t, dur, from = f) {
  const c = ac, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), g2 = c.createGain();
  o.type = 'sine'; o2.type = 'sine'; g2.gain.value = 0.1;
  o.frequency.setValueAtTime(from, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.09);
  o2.frequency.setValueAtTime(from * 2, t); o2.frequency.exponentialRampToValueAtTime(f * 2, t + 0.09);
  const lfo = c.createOscillator(), ld = c.createGain();
  lfo.frequency.value = 4.8; ld.gain.setValueAtTime(0, t); ld.gain.linearRampToValueAtTime(f * 0.008, t + dur * 0.7);
  lfo.connect(ld); ld.connect(o.frequency); ld.connect(o2.frequency);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.16, t + 0.15);
  g.gain.setTargetAtTime(0.12, t + 0.15, 0.4);
  g.gain.setTargetAtTime(0, t + dur - 0.1, 0.15);
  o.connect(g); o2.connect(g2).connect(g); g.connect(musicBus);
  const nb = c.createBuffer(1, c.sampleRate * 0.3, c.sampleRate), d = nb.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const ns = c.createBufferSource(), nf = c.createBiquadFilter(), ng = c.createGain();
  ns.buffer = nb; nf.type = 'bandpass'; nf.frequency.value = f * 2.5; nf.Q.value = 1.2; ng.gain.value = 0.025;
  ns.connect(nf).connect(ng).connect(musicBus);
  for (const x of [o, o2, lfo]) { x.start(t); x.stop(t + dur + 0.8); }
  ns.start(t);
}

export function setWater(v) {
  if (waterGain) waterGain.gain.setTargetAtTime(v * 0.06, ac.currentTime, 0.3);
}

export function setSound(on) {
  state.sound = on;
  if (master) master.gain.setTargetAtTime(on ? 0.8 : 0, ac.currentTime, 0.05);
}

// Озвучка слова в словаре — только по нажатию на 🔊 (в играх голоса нет).
// Голос берётся под изучаемый язык: английский, русский или чешский.
const VOICE_LANG = { en: ['en-GB', 'en-US', 'en'], ru: ['ru-RU', 'ru'], cz: ['cs-CZ', 'cs'], hu: ['hu-HU', 'hu'] };
export const canSpeak = () => 'speechSynthesis' in window;
export function speakWord(text, lang, slow = false) {
  if (!canSpeak()) return false;
  const prefs = VOICE_LANG[lang] || VOICE_LANG.en;
  const voices = speechSynthesis.getVoices();
  const voice = prefs.map((p) => voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(p.toLowerCase()))).find(Boolean);
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = voice?.lang || prefs[0];
  if (voice) u.voice = voice;
  u.rate = slow ? 0.6 : 0.9;
  speechSynthesis.speak(u);
  return true;
}
if (canSpeak()) speechSynthesis.getVoices();
