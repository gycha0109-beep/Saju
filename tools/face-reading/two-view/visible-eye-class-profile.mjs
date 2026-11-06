import { PARSING_LABELS } from './parsing-contract.mjs';
export const EYE_CLASS_PROFILE_VERSION = 'engineering.visible-eye-classes@0.1.0';
if (PARSING_LABELS[4] !== 'l_eye' || PARSING_LABELS[5] !== 'r_eye') throw Error('EYE_LABEL_DRIFT');
const unavailable = (reason) => ({
  methodVersion: EYE_CLASS_PROFILE_VERSION,
  status: 'unavailable',
  reason,
  candidateOnly: true,
  actualEyelidValidated: false,
  traditionalBindingAuthorized: false,
});
function region(mask, size, label) {
  let count = 0,
    first = -1;
  for (let p = 0; p < mask.length; p++)
    if (mask[p] === label) {
      count++;
      if (first < 0) first = p;
    }
  if (!count) return { reason: 'BOTH_EYE_CLASSES_REQUIRED' };
  const seen = new Uint8Array(mask.length),
    queue = new Int32Array(count);
  queue[0] = first;
  seen[first] = 1;
  let head = 0,
    tail = 1,
    left = size,
    right = 0,
    top = size,
    bottom = 0,
    sx = 0,
    sy = 0;
  while (head < tail) {
    const p = queue[head++],
      x = p % size,
      y = Math.floor(p / size);
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
    sx += x + 0.5;
    sy += y + 0.5;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx,
          ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size || (!dx && !dy)) continue;
        const q = ny * size + nx;
        if (!seen[q] && mask[q] === label) {
          seen[q] = 1;
          queue[tail++] = q;
        }
      }
  }
  if (tail !== count) return { reason: 'EYE_CLASS_FRAGMENTED' };
  if (!left || !top || right === size - 1 || bottom === size - 1)
    return { reason: 'EYE_CLASS_CLIPPED' };
  const width = right - left + 1,
    height = bottom - top + 1;
  if (width < 2 || height < 2) return { reason: 'EYE_CLASS_DEGENERATE' };
  return { count, left, right, width, height, cx: sx / count, cy: sy / count };
}
// Pinned parser image-plane class shapes, not eyelid contours or named forms.
export function measureVisibleEyeClassProfile(
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
    throw Error('EYE_CLASS_MASK_INVALID');
  for (const label of mask)
    if (!Number.isInteger(label) || label < 0 || label >= PARSING_LABELS.length)
      throw Error('EYE_CLASS_MASK_INVALID');
  const a = region(mask, size, 4);
  if (a.reason) return unavailable(a.reason);
  const b = region(mask, size, 5);
  if (b.reason) return unavailable(b.reason);
  if (!(a.right < b.left || b.right < a.left)) return unavailable('EYE_CLASS_OVERLAP');
  const [left, right] = a.cx < b.cx ? [a, b] : [b, a];
  const avgWidth = (left.width + right.width) / 2;
  const aspectCorrection = imageHeight / imageWidth;
  return Object.freeze({
    methodVersion: EYE_CLASS_PROFILE_VERSION,
    status: 'available',
    source: 'pinned_parser_classes_4_5',
    imageLeftHeightToWidth: (left.height / left.width) * aspectCorrection,
    imageRightHeightToWidth: (right.height / right.width) * aspectCorrection,
    imageLeftToRightWidthRatio: left.width / right.width,
    imageLeftToRightClassAreaRatio: left.count / right.count,
    centreSpacingToMeanWidth: (right.cx - left.cx) / avgWidth,
    imageRightVsLeftCentreHeightToMeanWidth: ((right.cy - left.cy) / avgWidth) * aspectCorrection,
    candidateOnly: true,
    actualEyelidValidated: false,
    anatomicalLateralityAuthorized: false,
    traditionalBindingAuthorized: false,
    accuracyValidated: false,
  });
}
