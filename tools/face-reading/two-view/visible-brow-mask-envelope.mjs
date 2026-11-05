// Research-only apparent eyebrow *region* thickness, derived from the pinned
// face-parsing overlay. NOT hair-fibre thickness, hair density, or F0 authority.
export const VISIBLE_BROW_MASK_ENVELOPE_VERSION = 'engineering.visible-brow-mask-envelope@0.1.0';

const SOURCE = 'pinned_face_parsing_brow_rgba_overlay';
const unavailable = (reason) =>
  Object.freeze({
    methodVersion: VISIBLE_BROW_MASK_ENVELOPE_VERSION,
    source: SOURCE,
    status: 'unavailable',
    reason,
    candidateOnly: true,
    individualHairThicknessMeasured: false,
    hairDensityMeasured: false,
    anatomicalLateralityAssigned: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });

export function eyebrowBinaryFromOverlayRGBA(rgba, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    rgba?.length !== width * height * 4
  )
    throw Error('BROW_OVERLAY_INVALID');
  const mask = new Uint8Array(width * height);
  for (let i = 0; i < mask.length; i++) {
    const p = 4 * i;
    const alpha = rgba[p + 3];
    const allZero = rgba[p] === 0 && rgba[p + 1] === 0 && rgba[p + 2] === 0;
    const actualBrow = rgba[p] === 70 && rgba[p + 1] === 245 && rgba[p + 2] === 130;
    if (alpha === 0 && allZero) continue;
    if (alpha !== 255 || !actualBrow) throw Error('BROW_OVERLAY_INVALID');
    mask[i] = 1;
  }
  return mask;
}

function regionStatistics(indices, width, scaleX, scaleY) {
  const n = indices.length;
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  let sx = 0,
    sy = 0,
    sxx = 0,
    syy = 0,
    sxy = 0;
  for (const index of indices) {
    const x = index % width,
      y = Math.floor(index / width);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    const scaledX = (x + 0.5) * scaleX,
      scaledY = (y + 0.5) * scaleY;
    sx += scaledX;
    sy += scaledY;
    sxx += scaledX * scaledX;
    syy += scaledY * scaledY;
    sxy += scaledX * scaledY;
  }
  const cx = sx / n,
    cy = sy / n;
  const cxx = sxx / n - cx * cx;
  const cyy = syy / n - cy * cy;
  const cxy = sxy / n - cx * cy;
  return { indices, minX, maxX, minY, maxY, cx, cy, cxx, cyy, cxy };
}

// Uses 8-connectivity. Extra components, joined brows, clipped regions, or
// degenerate principal orientation abstain instead of selecting two blobs
// with invented noise/size thresholds.
export function measureVisibleBrowMaskEnvelope(
  mask,
  width,
  height,
  { imageWidth = width, imageHeight = height } = {},
) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    mask?.length !== width * height ||
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    imageWidth <= 0 ||
    imageHeight <= 0 ||
    Array.from(mask).some((value) => value !== 0 && value !== 1)
  )
    throw Error('BROW_MASK_INVALID');

  const scaleX = imageWidth / width,
    scaleY = imageHeight / height;
  const visited = new Uint8Array(mask.length);
  const queue = new Int32Array(mask.length);
  const components = [];
  for (let first = 0; first < mask.length; first++) {
    if (!mask[first] || visited[first]) continue;
    const region = [];
    let head = 0,
      tail = 1;
    queue[0] = first;
    visited[first] = 1;
    while (head < tail) {
      const p = queue[head++];
      region.push(p);
      const y = Math.floor(p / width),
        x = p % width;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width || (dx === 0 && dy === 0)) continue;
          const target = ny * width + nx;
          if (!visited[target] && mask[target]) {
            visited[target] = 1;
            queue[tail++] = target;
          }
        }
      }
    }
    components.push(regionStatistics(region, width, scaleX, scaleY));
    if (components.length > 2) return unavailable('FRAGMENTED_OR_MULTIPLE_COMPONENTS');
  }

  if (components.length !== 2) return unavailable('BOTH_VISIBLE_BROWS_REQUIRED');
  components.sort((a, b) => a.cx - b.cx);
  if (components[0].maxX >= components[1].minX) return unavailable('IMAGE_SIDE_OVERLAP');

  const brows = [];
  for (const c of components) {
    if (c.minX === 0 || c.minY === 0 || c.maxX === width - 1 || c.maxY === height - 1)
      return unavailable('IMAGE_EDGE_CLIPPED');
    if (c.minX === c.maxX || c.minY === c.maxY) return unavailable('INSUFFICIENT_REGION_EXTENT');
    const eigenGap = Math.hypot(c.cxx - c.cyy, 2 * c.cxy);
    if (!(eigenGap > 0)) return unavailable('UNSTABLE_REGION_AXIS');
    const angle = Math.atan2(2 * c.cxy, c.cxx - c.cyy) / 2;
    const ux = Math.cos(angle),
      uy = Math.sin(angle);
    let low = Infinity,
      high = -Infinity;
    for (const index of c.indices) {
      const x = ((index % width) + 0.5) * scaleX - c.cx;
      const y = (Math.floor(index / width) + 0.5) * scaleY - c.cy;
      const longitudinal = x * ux + y * uy;
      low = Math.min(low, longitudinal);
      high = Math.max(high, longitudinal);
    }
    const span = high - low + Math.hypot(ux * scaleX, uy * scaleY);
    if (!(span > 0) || !Number.isFinite(span)) return unavailable('UNSTABLE_REGION_AXIS');
    brows.push(
      Object.freeze({
        imageSide: brows.length === 0 ? 'left' : 'right',
        apparentMaskThicknessToLongSpan: (c.indices.length * scaleX * scaleY) / (span * span),
        // Fraction of the 2D image plane, NOT hair coverage within the skin.
        visibleMaskAreaToImageArea: c.indices.length / (width * height),
      }),
    );
  }

  return Object.freeze({
    methodVersion: VISIBLE_BROW_MASK_ENVELOPE_VERSION,
    source: SOURCE,
    status: 'available',
    brows: Object.freeze(brows),
    candidateOnly: true,
    individualHairThicknessMeasured: false,
    hairDensityMeasured: false,
    anatomicalLateralityAssigned: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });
}
