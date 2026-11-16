// Research-only apparent eyebrow *region* thickness, derived from the pinned
// face-parsing overlay. NOT hair-fibre thickness, hair density, or F0 authority.
export const VISIBLE_BROW_MASK_ENVELOPE_VERSION = 'engineering.visible-brow-mask-envelope@0.2.0';

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

// A local horizontal-section *mask* midline, not the anatomical eyebrow ridge.
// Both ends define a chord; column-centre excursions from it describe only the
// model's visible image-plane band. No threshold or named arch classification.
function maskColumnMidlineShape(component, width, scaleX, scaleY) {
  const columns = component.maxX - component.minX + 1;
  if (columns < 2) return null;
  const counts = new Int32Array(columns);
  const sumY = new Float64Array(columns);
  for (const pixel of component.indices) {
    const column = (pixel % width) - component.minX;
    counts[column]++;
    sumY[column] += Math.floor(pixel / width) + 0.5;
  }
  if (counts.some((n) => n === 0)) return null;
  const firstY = sumY[0] / counts[0];
  const lastY = sumY[columns - 1] / counts[columns - 1];
  const span = (columns - 1) * scaleX;
  if (!(span > 0)) return null;
  let maxUp = 0;
  let maxDown = 0;
  let peakUpAt = null;
  let peakDownAt = null;
  for (let x = 0; x < columns; x++) {
    const meanY = sumY[x] / counts[x];
    const referenceY = firstY + ((lastY - firstY) * x) / (columns - 1);
    const deltaY = meanY - referenceY;
    // Rounding tolerance only. No visual-model error or curvature threshold.
    const roundoff = 32 * Number.EPSILON * Math.max(1, Math.abs(meanY), Math.abs(referenceY));
    const departure = Math.abs(deltaY) <= roundoff ? 0 : (deltaY * scaleY) / span;
    if (-departure > maxUp) {
      maxUp = -departure;
      peakUpAt = x / (columns - 1);
    }
    if (departure > maxDown) {
      maxDown = departure;
      peakDownAt = x / (columns - 1);
    }
  }
  return {
    apparentMidlineUpwardBendToMaskXSpan: maxUp,
    apparentMidlineDownwardBendToMaskXSpan: maxDown,
    apparentMidlineEndToEndVerticalSlope: ((lastY - firstY) * scaleY) / span,
    upwardBendPositionOnMaskXSpan: peakUpAt,
    downwardBendPositionOnMaskXSpan: peakDownAt,
  };
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
    const midlineShape = maskColumnMidlineShape(c, width, scaleX, scaleY);
    if (!midlineShape) return unavailable('MASK_MIDLINE_UNAVAILABLE');
    brows.push(
      Object.freeze({
        imageSide: brows.length === 0 ? 'left' : 'right',
        apparentMaskThicknessToLongSpan: (c.indices.length * scaleX * scaleY) / (span * span),
        ...midlineShape,
        // Fraction of the 2D image plane, NOT hair coverage within the skin.
        visibleMaskAreaToImageArea: c.indices.length / (width * height),
      }),
    );
  }

  // Image-side mask edges only: not the anatomical glabella or hair roots.
  // Both gap and widths are horizontal spans in the same original-image frame;
  // their ratio is scale-independent and never proxies eye spacing.
  const maskGap = components[1].minX - components[0].maxX - 1;
  const meanMaskXSpan =
    (components[0].maxX - components[0].minX + 1 +
      (components[1].maxX - components[1].minX + 1)) /
    2;

  return Object.freeze({
    methodVersion: VISIBLE_BROW_MASK_ENVELOPE_VERSION,
    source: SOURCE,
    status: 'available',
    brows: Object.freeze(brows),
    apparentInterBrowGapToMeanMaskXSpan: maskGap / meanMaskXSpan,
    candidateOnly: true,
    individualHairThicknessMeasured: false,
    hairDensityMeasured: false,
    anatomicalLateralityAssigned: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });
}
