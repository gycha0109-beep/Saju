// Engineering input/display transforms only; these do not measure anatomy.
export const FRAME_POLICY = Object.freeze({
  expansion: 1.6,
  anchorRadius: 12,
  anchorSupport: 0.25,
  earComponent: 64,
});
export function faceFrame(points, width, height) {
  if (
    !Array.isArray(points) ||
    points.length !== 478 ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0 ||
    points.some((p) => !Number.isFinite(p.x) || !Number.isFinite(p.y))
  )
    throw Error('FACE_FRAME_INVALID');
  const xs = points.map((p) => p.x * width),
    ys = points.map((p) => p.y * height);
  const left = Math.min(...xs),
    right = Math.max(...xs),
    top = Math.min(...ys),
    bottom = Math.max(...ys);
  const side = Math.max(right - left, bottom - top) * FRAME_POLICY.expansion;
  if (side <= 0 || left < 0 || top < 0 || right > width || bottom > height)
    throw Error('FACE_FRAME_INVALID');
  return { left: (left + right - side) / 2, top: (top + bottom - side) / 2, side };
}
export function supportedAnchors(mask, size, points, edges, labels, frame, width, height) {
  const indices = [...new Set(edges.flatMap((e) => [e.start, e.end]))];
  if (!indices.length) return false;
  let supported = 0;
  for (const i of indices) {
    const p = points[i];
    if (!p) return false;
    const x = Math.floor(((p.x * width - frame.left) * size) / frame.side),
      y = Math.floor(((p.y * height - frame.top) * size) / frame.side);
    let hit = false;
    for (let dy = -FRAME_POLICY.anchorRadius; dy <= FRAME_POLICY.anchorRadius && !hit; dy++)
      for (let dx = -FRAME_POLICY.anchorRadius; dx <= FRAME_POLICY.anchorRadius; dx++) {
        const xx = x + dx,
          yy = y + dy;
        if (
          dx * dx + dy * dy <= FRAME_POLICY.anchorRadius ** 2 &&
          xx >= 0 &&
          yy >= 0 &&
          xx < size &&
          yy < size &&
          labels.includes(mask[yy * size + xx])
        ) {
          hit = true;
          break;
        }
      }
    if (hit) supported++;
  }
  return supported / indices.length >= FRAME_POLICY.anchorSupport;
}
export function removeEarFragments(mask, size) {
  const out = new Uint8Array(mask),
    seen = new Uint8Array(mask.length);
  if (!Number.isInteger(size) || size <= 0 || mask.length !== size * size)
    throw Error('PARSING_MASK_INVALID');
  for (let start = 0; start < mask.length; start++) {
    if (seen[start] || ![7, 8].includes(mask[start])) continue;
    const component = [start];
    seen[start] = 1;
    for (let i = 0; i < component.length; i++) {
      const p = component[i],
        x = p % size,
        y = Math.floor(p / size);
      for (const q of [
        x > 0 ? p - 1 : -1,
        x + 1 < size ? p + 1 : -1,
        y > 0 ? p - size : -1,
        y + 1 < size ? p + size : -1,
      ])
        if (q >= 0 && !seen[q] && [7, 8].includes(mask[q])) {
          seen[q] = 1;
          component.push(q);
        }
    }
    if (component.length < FRAME_POLICY.earComponent) for (const p of component) out[p] = 0;
  }
  return out;
}
export function projectMask(mask, size, frame, width, height) {
  if (
    !Number.isInteger(size) ||
    size <= 0 ||
    mask.length !== size * size ||
    mask.some((n) => n > 18) ||
    ![frame.left, frame.top, frame.side, width, height].every(Number.isFinite) ||
    frame.side <= 0 ||
    width <= 0 ||
    height <= 0
  )
    throw Error('PARSING_MASK_INVALID');
  const projected = new Uint8Array(mask.length),
    counts = Array(19).fill(0);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const sx = Math.floor(((((x + 0.5) * width) / size - frame.left) * size) / frame.side),
        sy = Math.floor(((((y + 0.5) * height) / size - frame.top) * size) / frame.side);
      const label = sx >= 0 && sy >= 0 && sx < size && sy < size ? mask[sy * size + sx] : 0;
      if (!Number.isInteger(label) || label < 0 || label > 18) throw Error('PARSING_MASK_INVALID');
      projected[y * size + x] = label;
      counts[label]++;
    }
  return { mask: projected, counts };
}
