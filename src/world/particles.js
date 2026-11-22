// Частицы поверх мира: лепестки, светлячки, листья, снег. Зависят от сезона и фазы дня.
const cv = document.getElementById('particles');
const ctx = cv.getContext('2d');
let W = 0, H = 0, dpr = 1, parts = [], season = 'spring', night = 0, indoor = false;

function resize() {
  const phone = innerWidth < 760 || matchMedia('(pointer: coarse)').matches;
  dpr = Math.min(phone ? 1.5 : 2, devicePixelRatio || 1);
  W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.round(Math.min(phone ? 28 : 70, (W * H) / 22000));
  parts = Array.from({ length: n }, () => spawn(true));
}

function spawn(any) {
  const fly = Math.random() < night * 0.6 && season !== 'winter';
  return {
    x: Math.random() * W,
    y: any ? Math.random() * H : -20,
    vx: 0.2 + Math.random() * 0.6,
    vy: fly ? 0 : 0.35 + Math.random() * 0.8,
    r: fly ? 1.6 + Math.random() * 1.6 : 3 + Math.random() * 4,
    a: Math.random() * Math.PI * 2,
    va: (Math.random() - 0.5) * 0.06,
    ph: Math.random() * 10,
    fly,
  };
}

const COLORS = {
  spring: ['#f7b6c8', '#f39ab6', '#ffd6e2'],
  summer: ['#fff2b0', '#d8f59a', '#ffffff'],
  autumn: ['#e8873a', '#c9502c', '#f2b24a'],
  winter: ['#ffffff', '#eef6ff', '#dfeaf5'],
  indoor: ['#ffd27a', '#ffe7b0', '#f5c06a'],
};

// В чайном доме вместо лепестков и снега — медленные золотые пылинки
export function setParticleMood(s, n, inside = false) {
  const k = inside ? 'indoor' : s;
  if (k !== season) { season = k; parts = parts.map(() => spawn(true)); }
  night = inside ? 0 : n;
  indoor = inside;
}

// Частицы рисуем не чаще 60 раз в секунду: на экранах 120 Гц это вдвое меньше работы, а глаз разницы не видит
let lastDraw = 0, accDx = 0;
export function stepParticles(dxPx, t) {
  accDx += dxPx;
  // на телефоне частицы рисуем ~30 раз в секунду: при 120 Гц экран иначе не успевает за прокруткой
  if (document.hidden || t - lastDraw < (document.body.classList.contains('phone') ? 32 : 15)) return;
  lastDraw = t;
  dxPx = accDx;
  accDx = 0;
  ctx.clearRect(0, 0, W, H);
  const cols = COLORS[season];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.fly) {
      p.x += Math.sin(t / 900 + p.ph) * 0.5 - dxPx * 0.9;
      p.y += Math.cos(t / 1100 + p.ph) * 0.4;
      const a = 0.4 + 0.6 * Math.abs(Math.sin(t / 500 + p.ph));
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = `rgba(255,214,120,${0.18 * a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, 7); ctx.fill();
      ctx.fillStyle = `rgba(255,240,180,${a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      if (p.y < H * 0.15) p.y += 1;
      if (p.y > H * 0.95) p.y -= 1;
    } else {
      p.x += p.vx + Math.sin(t / 700 + p.ph) * 0.6 - dxPx * 1.1;
      p.y += p.vy;
      p.a += p.va;
      ctx.fillStyle = cols[i % cols.length];
      ctx.globalAlpha = season === 'summer' ? 0.5 : 0.85;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      if (season === 'indoor') { p.y -= p.vy * 0.85; ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t / 600 + p.ph); ctx.beginPath(); ctx.arc(0, 0, p.r * 0.3, 0, 7); ctx.fill(); }
      else if (season === 'winter') { ctx.beginPath(); ctx.arc(0, 0, p.r * 0.6, 0, 7); ctx.fill(); }
      else if (season === 'summer') { ctx.beginPath(); ctx.arc(0, 0, p.r * 0.35, 0, 7); ctx.fill(); }
      else if (season === 'autumn') {
        ctx.beginPath(); ctx.moveTo(-p.r * 1.4, 0); ctx.quadraticCurveTo(0, -p.r, p.r * 1.4, 0); ctx.quadraticCurveTo(0, p.r, -p.r * 1.4, 0); ctx.fill();
      } else { ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 7); ctx.fill(); }
      ctx.restore();
      ctx.globalAlpha = 1;
    }
    if (p.y > H + 20 || p.x < -40 || p.x > W + 40) {
      parts[i] = spawn(false);
      if (parts[i].fly) parts[i].y = H * (0.3 + Math.random() * 0.6);
      if (p.x < -40) parts[i].x = W + 20; else if (p.x > W + 40) parts[i].x = -20;
    }
  }
}

addEventListener('resize', resize);
resize();
