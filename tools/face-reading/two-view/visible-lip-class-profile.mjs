import { PARSING_LABELS } from './parsing-contract.mjs';

// Current pinned parser labels. They are *model semantic classes* rather than
// human-adjudicated anatomical labial borders.
export const VISIBLE_LIP_CLASS_PROFILE_VERSION = 'engineering.visible-upper-lower-lip-class@0.1.0';
if (PARSING_LABELS[12] !== 'u_lip' || PARSING_LABELS[13] !== 'l_lip')
  throw Error('LIP_CLASS_SOURCE_DRIFT');

const missing = (reason) =>
  Object.freeze({
    methodVersion: VISIBLE_LIP_CLASS_PROFILE_VERSION,
    status: 'unavailable',
    reason,
    source: 'pinned_screened_full_frame_lip_classes_12_13',
    candidateOnly: true,
    actualAnatomicalLipBorderValidated: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });

function component(mask, size, classId) {
  let start = -1,
    count = 0;
  for (let p = 0; p < mask.length; p++) {
    if (mask[p] !== classId) continue;
    count++;
    if (start < 0) start = p;
  }
  if (!count) return { reason: 'BOTH_LIP_CLASSES_REQUIRED' };
  const seen = new Uint8Array(mask.length);
  const queue = new Int32Array(count);
  let front = 0,
    back = 1;
  let minX = size,
    maxX = -1,
    minY = size,
    maxY = -1,
    sumX = 0,
    sumY = 0;
  queue[0] = start;
  seen[start] = 1;
  while (front < back) {
    const p = queue[front++];
    const x = p % size,
      y = Math.floor(p / size);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    sumX += x + 0.5;
    sumY += y + 0.5;
    for (let dy = -1; dy <= 1; dy++) {
      const ny = y + dy;
      if (ny < 0 || ny >= size) continue;
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        if (nx < 0 || nx >= size || (dx === 0 && dy === 0)) continue;
        const q = ny * size + nx;
        if (mask[q] === classId && !seen[q]) {
          seen[q] = 1;
          queue[back++] = q;
        }
      }
    }
  }
  if (back !== count) return { reason: 'FRAGMENTED_LIP_CLASS' };
  if (minX === 0 || minY === 0 || maxX === size - 1 || maxY === size - 1)
    return { reason: 'LIP_CLASS_TOUCHES_FRAME_EDGE' };
  const width = maxX - minX + 1,
    height = maxY - minY + 1;
  if (width < 2 || height < 2) return { reason: 'DEGENERATE_LIP_CLASS_REGION' };
  return { count, width, height, minX, maxX, minY, maxY, cx: sumX / count, cy: sumY / count };
}

// No source pixels, mask, landmarks, individual positions or capture identity
// leave this calculator. Ratios describe two visible model class regions only.
export function measureVisibleLipClassProfile(
  mask,
  size,
  { imageWidth = size, imageHeight = size } = {},
) {
  if (
    !Number.isInteger(size) ||
    size < 1 ||
    mask?.length !== size * size ||
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    imageWidth <= 0 ||
    imageHeight <= 0
  )
    throw Error('LIP_CLASS_MASK_INVALID');
  for (const label of mask)
    if (!Number.isInteger(label) || label < 0 || label >= PARSING_LABELS.length)
      throw Error('LIP_CLASS_MASK_INVALID');
  const upper = component(mask, size, 12);
  if (upper.reason) return missing(upper.reason);
  const lower = component(mask, size, 13);
  if (lower.reason) return missing(lower.reason);
  if (upper.cy >= lower.cy) return missing('LIP_CLASS_VERTICAL_ORDER_CONFLICT');
  const overallSpan = Math.max(upper.maxX, lower.maxX) - Math.min(upper.minX, lower.minX) + 1;
  if (!(overallSpan > 0)) return missing('DEGENERATE_LIP_CLASS_REGION');
  const imageScaleX = imageWidth / size,
    imageScaleY = imageHeight / size;
  return Object.freeze({
    methodVersion: VISIBLE_LIP_CLASS_PROFILE_VERSION,
    status: 'available',
    source: 'pinned_screened_full_frame_lip_classes_12_13',
    // These are transient FULL-image class bounding envelopes, not actual lip borders.
    upperClassXMinToImageWidth: upper.minX / size,
    upperClassXMaxToImageWidth: (upper.maxX + 1) / size,
    upperClassTopToImageHeight: upper.minY / size,
    lowerClassXMinToImageWidth: lower.minX / size,
    lowerClassXMaxToImageWidth: (lower.maxX + 1) / size,
    lowerClassBottomToImageHeight: (lower.maxY + 1) / size,
    // Relative visible area is invariant to the original image aspect ratio.
    upperToLowerVisibleClassAreaRatio: upper.count / lower.count,
    upperVisibleWidthToCombinedXSpan: upper.width / overallSpan,
    lowerVisibleWidthToCombinedXSpan: lower.width / overallSpan,
    upperVisibleHeightToCombinedXSpan: (upper.height * imageScaleY) / (overallSpan * imageScaleX),
    lowerVisibleHeightToCombinedXSpan: (lower.height * imageScaleY) / (overallSpan * imageScaleX),
    centreYSeparationToCombinedXSpan:
      ((lower.cy - upper.cy) * imageScaleY) / (overallSpan * imageScaleX),
    lowerVsUpperCentreXOffsetToCombinedXSpan: (lower.cx - upper.cx) / overallSpan,
    candidateOnly: true,
    actualAnatomicalLipBorderValidated: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });
}
