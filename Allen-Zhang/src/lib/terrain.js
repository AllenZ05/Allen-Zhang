// Random terrain drawn as topographic contour lines, so the home page gets a new design on every visit.

// Gradient noise over a freshly shuffled permutation table: each call makes a different landscape.
export function createNoise() {
  const order = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const p = new Uint8Array(512).map((_, i) => order[i & 255]);
  const gradient = (hash, x, y) => {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -2 * v : 2 * v);
  };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t, a, b) => a + t * (b - a);
  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const u = fade(fx);
    const v = fade(fy);
    const a = p[X] + Y;
    const b = p[X + 1] + Y;
    return lerp(
      v,
      lerp(u, gradient(p[a], fx, fy), gradient(p[b], fx - 1, fy)),
      lerp(u, gradient(p[a + 1], fx, fy - 1), gradient(p[b + 1], fx - 1, fy - 1)),
    );
  };
}

// Traces `count` contour lines with marching squares, spread across this landscape's height range
// unless one is passed. Returns one Path2D and that range. `scale` is the size of a hill in pixels.
export function traceContours(noise, width, height, { count, scale, range, cell = 8 }) {
  const cols = Math.ceil(width / cell) + 1;
  const rows = Math.ceil(height / cell) + 1;
  const field = new Float32Array(cols * rows);
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = (i * cell) / scale;
      const y = (j * cell) / scale;
      const value = noise(x, y) + 0.35 * noise(x * 2.3 + 40, y * 2.3 + 40);
      field[j * cols + i] = value;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  }
  if (range) [min, max] = range;
  const path = new Path2D();
  for (let k = 1; k <= count; k++) {
    const level = min + ((max - min) * k) / (count + 1);
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const corners = [
          field[j * cols + i],
          field[j * cols + i + 1],
          field[(j + 1) * cols + i + 1],
          field[(j + 1) * cols + i],
        ];
        const x = i * cell;
        const y = j * cell;
        const at = [
          [x, y],
          [x + cell, y],
          [x + cell, y + cell],
          [x, y + cell],
        ];
        const crossings = [];
        for (let e = 0; e < 4; e++) {
          const a = corners[e];
          const b = corners[(e + 1) % 4];
          if (a < level !== b < level) {
            const t = (level - a) / (b - a);
            const [ax, ay] = at[e];
            const [bx, by] = at[(e + 1) % 4];
            crossings.push([ax + (bx - ax) * t, ay + (by - ay) * t]);
          }
        }
        for (let c = 0; c + 1 < crossings.length; c += 2) {
          path.moveTo(crossings[c][0], crossings[c][1]);
          path.lineTo(crossings[c + 1][0], crossings[c + 1][1]);
        }
      }
    }
  }
  return { path, range: [min, max] };
}
