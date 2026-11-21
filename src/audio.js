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
