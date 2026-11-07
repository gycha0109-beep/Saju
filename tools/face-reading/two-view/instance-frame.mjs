// Detector boxes/keypoints are ephemeral input-routing data, never anatomy.
export const INSTANCE_PIN = Object.freeze({
  repository: 'opencv/opencv_zoo',
  revision: 'f12e12798e8314f7c074a6656816c048dcc95b7a',
  asset: 'face_detection_yunet_2023mar.onnx',
  sha256: '8f2383e4dd3cfbb4553ea8718107fc0423210dc964f9f4280604804ed2552fa4',
  size: 640,
  score: 0.6,
  nms: 0.3,
  maxFaces: 4,
  context: 2,
  anchorRadius: 24,
  witnessContext: 3,
});
export function bgrTensor(rgba, size) {
  if (rgba.length !== size * size * 4 || !Number.isInteger(size) || size <= 0)
    throw Error('INSTANCE_INPUT_INVALID');
  const out = new Float32Array(size * size * 3),
    n = size * size;
  for (let p = 0; p < n; p++) {
    out[p] = rgba[p * 4 + 2];
    out[n + p] = rgba[p * 4 + 1];
    out[2 * n + p] = rgba[p * 4];
  }
  return out;
}
function iou(a, b) {
  const w = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)),
    h = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)),
    area = w * h;
  return area / (a.w * a.h + b.w * b.h - area);
}
export function decodeFaces(outputs, width, height) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
    throw Error('INSTANCE_INPUT_INVALID');
  const size = INSTANCE_PIN.size,
    scale = Math.min(size / width, size / height),
    candidates = [];
  for (const stride of [8, 16, 32]) {
    const side = size / stride,
      n = side * side;
    const arrays = {};
    for (const [name, channels] of [
      ['cls', 1],
      ['obj', 1],
      ['bbox', 4],
      ['kps', 10],
    ]) {
      const t = outputs[`${name}_${stride}`];
      if (
        !t ||
        t.dims.join(',') !== `1,${n},${channels}` ||
        t.data.length !== n * channels ||
        t.data.some((v) => !Number.isFinite(v))
      )
        throw Error('INSTANCE_OUTPUT_INVALID');
      arrays[name] = t.data;
    }
    for (let p = 0; p < n; p++) {
      const score = Math.sqrt(
        Math.max(0, Math.min(1, arrays.cls[p])) * Math.max(0, Math.min(1, arrays.obj[p])),
      );
      if (score < INSTANCE_PIN.score) continue;
      const col = p % side,
        row = Math.floor(p / side),
        cx = ((col + arrays.bbox[p * 4]) * stride) / scale,
        cy = ((row + arrays.bbox[p * 4 + 1]) * stride) / scale;
      const w = (Math.exp(arrays.bbox[p * 4 + 2]) * stride) / scale,
        h = (Math.exp(arrays.bbox[p * 4 + 3]) * stride) / scale;
      if (![cx, cy, w, h].every(Number.isFinite) || w <= 0 || h <= 0)
        throw Error('INSTANCE_OUTPUT_INVALID');
      if (cx < 0 || cy < 0 || cx >= width || cy >= height) continue;
      const points = Array.from({ length: 5 }, (_, i) => ({
        x: ((arrays.kps[p * 10 + 2 * i] + col) * stride) / scale,
        y: ((arrays.kps[p * 10 + 2 * i + 1] + row) * stride) / scale,
      }));
      candidates.push({ x: cx - w / 2, y: cy - h / 2, w, h, score, points });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  const kept = [];
  for (const box of candidates.slice(0, 5000))
    if (!kept.some((k) => iou(k, box) >= INSTANCE_PIN.nms)) {
      kept.push(box);
      if (kept.length > INSTANCE_PIN.maxFaces) break;
    }
  return kept.sort((a, b) => a.x - b.x);
}
export function instanceFrame(box) {
  const side = Math.max(box.w, box.h) * INSTANCE_PIN.context,
    eye = {
      x: (box.points[0].x + box.points[1].x) / 2,
      y: (box.points[0].y + box.points[1].y) / 2,
    },
    mouth = {
      x: (box.points[3].x + box.points[4].x) / 2,
      y: (box.points[3].y + box.points[4].y) / 2,
    };
  if (Math.hypot(mouth.x - eye.x, mouth.y - eye.y) < 1) throw Error('INSTANCE_FRAME_INVALID');
  return {
    left: box.x + box.w / 2 - side / 2,
    top: box.y + box.h / 2 - side / 2,
    side,
    angle: Math.atan2(mouth.x - eye.x, mouth.y - eye.y),
  };
}
export function instancePoint(point, size, frame) {
  const dx = point.x - frame.left - frame.side / 2,
    dy = point.y - frame.top - frame.side / 2,
    c = Math.cos(frame.angle),
    s = Math.sin(frame.angle);
  return {
    x: ((c * dx - s * dy + frame.side / 2) * size) / frame.side,
    y: ((s * dx + c * dy + frame.side / 2) * size) / frame.side,
  };
}
export function projectInstance(mask, size, frame, width, height) {
  const projected = new Uint8Array(size * size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const p = instancePoint(
          { x: ((x + 0.5) * width) / size, y: ((y + 0.5) * height) / size },
          size,
          frame,
        ),
        xx = Math.floor(p.x),
        yy = Math.floor(p.y);
      if (xx >= 0 && yy >= 0 && xx < size && yy < size)
        projected[y * size + x] = mask[yy * size + xx];
    }
  return projected;
}
export function instanceChecks(mask, size, box, frame) {
  function near(point, labels) {
    const mapped = instancePoint(point, size, frame),
      x = Math.floor(mapped.x),
      y = Math.floor(mapped.y),
      r = INSTANCE_PIN.anchorRadius;
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) {
        const xx = x + dx,
          yy = y + dy;
        if (
          dx * dx + dy * dy <= r * r &&
          xx >= 0 &&
          yy >= 0 &&
          xx < size &&
          yy < size &&
          labels.includes(mask[yy * size + xx])
        )
          return true;
      }
    return false;
  }
  return {
    noseAligned: mask.includes(1) && near(box.points[2], [10]),
    lipsAligned: near(
      { x: (box.points[3].x + box.points[4].x) / 2, y: (box.points[3].y + box.points[4].y) / 2 },
      [12, 13],
    ),
  };
}
export function mergeInstances(base, size, instances, width, height) {
  const merged = new Uint8Array(base);
  let backgroundRemoved = 0;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const px = ((x + 0.5) * width) / size,
        py = ((y + 0.5) * height) / size;
      let owner = null,
        distance = Infinity;
      for (const instance of instances) {
        const { box, frame } = instance,
          p = instancePoint({ x: px, y: py }, size, frame);
        if (p.x < 0 || p.y < 0 || p.x >= size || p.y >= size) continue;
        const d = ((px - box.x - box.w / 2) / box.w) ** 2 + ((py - box.y - box.h / 2) / box.h) ** 2;
        if (d < distance) {
          owner = instance;
          distance = d;
        }
      }
      const label = owner?.mask[y * size + x];
      if (
        owner?.background?.[y * size + x] &&
        [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13].includes(merged[y * size + x])
      ) {
        merged[y * size + x] = 0;
        backgroundRemoved++;
      } else if (label > 0 && (![12, 13].includes(label) || owner.lipsAligned))
        merged[y * size + x] = label;
    }
  const counts = Array(19).fill(0);
  for (const label of merged) counts[label]++;
  return { mask: merged, counts, backgroundRemoved };
}
export function backgroundWitness(primary, witness, size, frame, witnessFrame, box, width, height) {
  const out = new Uint8Array(size * size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const source = { x: ((x + 0.5) * width) / size, y: ((y + 0.5) * height) / size };
      if (
        source.x < 1 ||
        source.y < 1 ||
        source.x >= width - 1 ||
        source.y >= height - 1 ||
        source.x < box.x ||
        source.y < box.y ||
        source.x >= box.x + box.w ||
        source.y >= box.y + box.h
      )
        continue;
      const a = instancePoint(source, size, frame),
        b = instancePoint(source, size, witnessFrame);
      if ([a, b].some((p) => p.x < 1 || p.y < 1 || p.x >= size - 1 || p.y >= size - 1)) continue;
      if (
        primary[Math.floor(a.y) * size + Math.floor(a.x)] === 0 &&
        witness[Math.floor(b.y) * size + Math.floor(b.x)] === 0
      )
        out[y * size + x] = 1;
    }
  return out;
}
