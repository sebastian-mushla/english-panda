// Игровое поле-сетка: панда ходит стрелками / WASD, свайпом или экранным крестиком.
// Общая основа для «Лабиринта», «Сбора букв» и «Сокобана».
export function field(el, { w, h, onMove }) {
  el.innerHTML = `<div class="field-grid" style="--fw:${w};--fh:${h}"></div>
    <div class="dpad"><button data-d="up">▲</button><button data-d="left">◀</button><button data-d="down">▼</button><button data-d="right">▶</button></div>`;
  const grid = el.querySelector('.field-grid');
  grid.innerHTML = Array.from({ length: w * h }, (_, i) => `<i class="fc" data-i="${i}"></i>`).join('');
  const cells = [...grid.children];
  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const move = (d) => DIRS[d] && onMove(...DIRS[d]);

  const onKey = (e) => {
    const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right' };
    const d = map[e.key] || { KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right' }[e.code];
    if (d) { e.preventDefault(); move(d); }
  };
  addEventListener('keydown', onKey);
  el.querySelectorAll('.dpad button').forEach((b) => b.addEventListener('pointerdown', (e) => { e.preventDefault(); move(b.dataset.d); }));
  // свайп по полю
  let sx = 0, sy = 0;
  grid.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; });
  grid.addEventListener('pointerup', (e) => {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  });

  return {
    cell: (x, y) => cells[y * w + x],
    paint(x, y, cls, html = '') { const c = cells[y * w + x]; c.className = 'fc ' + cls; c.innerHTML = html; },
    destroy: () => removeEventListener('keydown', onKey),
  };
}

// Лабиринт методом поиска в глубину: стены там, где true
export function makeMaze(w, h) {
  const wall = Array.from({ length: h }, () => Array(w).fill(true));
  const stack = [[1, 1]];
  wall[1][1] = false;
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const nb = [[2, 0], [-2, 0], [0, 2], [0, -2]].map(([dx, dy]) => [x + dx, y + dy, x + dx / 2, y + dy / 2])
      .filter(([nx, ny]) => nx > 0 && ny > 0 && nx < w - 1 && ny < h - 1 && wall[ny][nx]);
    if (!nb.length) { stack.pop(); continue; }
    const [nx, ny, mx, my] = nb[Math.floor(Math.random() * nb.length)];
    wall[my][mx] = false; wall[ny][nx] = false;
    stack.push([nx, ny]);
  }
  // несколько лишних проходов, чтобы было не одно-единственное русло
  for (let i = 0; i < w; i++) {
    const x = 1 + Math.floor(Math.random() * (w - 2)), y = 1 + Math.floor(Math.random() * (h - 2));
    if ((x + y) % 2 === 1) wall[y][x] = false;
  }
  return wall;
}
