import { PARSING_GROUPS } from './parsing-contract.mjs';

// Browser-memory research candidate from the existing full-frame ResNet18
// nose *class overlay*. This is not a nostril, nose-tip, wing or nasal-root
// boundary and must never be routed to canonical F0/F1 or product reading.
export const VISIBLE_NOSE_MASK_PROFILE_VERSION =
  'engineering.visible-nose-mask-width-profile@0.1.0';

const SOURCE = 'pinned_full_frame_face_parsing_nose_rgba_overlay';
const noseGroup = PARSING_GROUPS.find((group) => group.id === 'nose');
if (!noseGroup || noseGroup.classes.length !== 1 || noseGroup.classes[0] !== 10)
  throw Error('NOSE_SOURCE_CONTRACT_DRIFT');

const unavailable = (reason) =>
  Object.freeze({
    methodVersion: VISIBLE_NOSE_MASK_PROFILE_VERSION,
    source: SOURCE,
    status: 'unavailable',
    reason,
    candidateOnly: true,
    anatomicalNoseSubregionsObserved: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });

export function noseBinaryFromOverlayRGBA(rgba, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    rgba?.length !== width * height * 4
  )
    throw Error('NOSE_OVERLAY_INVALID');
  const binary = new Uint8Array(width * height);
  const color = noseGroup.color;
  for (let i = 0; i < binary.length; i++) {
    const p = i * 4;
    if (rgba[p + 3] === 0 && rgba[p] === 0 && rgba[p + 1] === 0 && rgba[p + 2] === 0)
      continue;
    if (
      rgba[p + 3] !== 255 ||
      rgba[p] !== color[0] ||
      rgba[p + 1] !== color[1] ||
      rgba[p + 2] !== color[2]
    )
      throw Error('NOSE_OVERLAY_INVALID');
    binary[i] = 1;
  }
  return binary;
}

// Validate the one visible connected mask, without removing small fragments,
// filling holes, making hidden boundaries, or choosing anatomy-specific rows.
export function measureVisibleNoseMaskProfile(
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
    imageHeight <= 0
  )
    throw Error('NOSE_MASK_INVALID');

  let start = -1, occupied = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== 0 && mask[i] !== 1) throw Error('NOSE_MASK_INVALID');
    if (mask[i] === 1) {
      occupied++;
      if (start < 0) start = i;
    }
  }
  if (start < 0) return unavailable('NO_VISIBLE_NOSE_CLASS');

  const seen = new Uint8Array(mask.length);
  const queue = new Int32Array(occupied);
  let front = 0, back = 1, minX = width, maxX = -1, minY = height, maxY = -1;
  const rowLeft = new Int32Array(height).fill(width);
  const rowRight = new Int32Array(height).fill(-1);
  seen[start] = 1;
  queue[0] = start;
  while (front < back) {
    const p = queue[front++];
    const x = p % width, y = Math.floor(p / width);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    rowLeft[y] = Math.min(rowLeft[y], x);
    rowRight[y] = Math.max(rowRight[y], x);
    for (let dy = -1; dy <= 1; dy++) {
      const ny = y + dy;
      if (ny < 0 || ny >= height) continue;
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        if (nx < 0 || nx >= width || (dx === 0 && dy === 0)) continue;
        const next = ny * width + nx;
        if (mask[next] && !seen[next]) {
          seen[next] = 1;
          queue[back++] = next;
        }
      }
    }
  }
  if (back !== occupied) return unavailable('DISCONNECTED_OR_FRAGMENTED_MASK');
  if (minX === 0 || minY === 0 || maxX === width - 1 || maxY === height - 1)
    return unavailable('MASK_CLIPPED_AT_IMAGE_EDGE');
  const boxWidth = maxX - minX + 1, boxHeight = maxY - minY + 1;
  // Three different interior image rows require at least 5 occupied rows.
  if (boxWidth < 2 || boxHeight < 5) return unavailable('INSUFFICIENT_VISIBLE_EXTENT');
  for (let y = minY; y <= maxY; y++) {
    if (rowRight[y] < rowLeft[y]) return unavailable('ROW_MASK_DISCONTINUITY');
    for (let x = rowLeft[y]; x <= rowRight[y]; x++)
      if (mask[y * width + x] !== 1) return unavailable('ROW_MASK_DISCONTINUITY');
  }

  const boxCentreX = (minX + maxX) / 2;
  const section = (fraction) => {
    const y = minY + Math.round((maxY - minY) * fraction);
    const centreX = (rowLeft[y] + rowRight[y]) / 2;
    return Object.freeze({
      visibleMaskWidthToBoundingXSpan: (rowRight[y] - rowLeft[y] + 1) / boxWidth,
      imagePlaneCentreOffsetToBoundingXSpan: (centreX - boxCentreX) / boxWidth,
    });
  };
  const upper = section(0.25), middle = section(0.5), lower = section(0.75);
  return Object.freeze({
    methodVersion: VISIBLE_NOSE_MASK_PROFILE_VERSION,
    source: SOURCE,
    status: 'available',
    sections: Object.freeze({ upper, middle, lower }),
    lowerVsUpperImagePlaneCentreShiftToBoundingXSpan:
      lower.imagePlaneCentreOffsetToBoundingXSpan -
      upper.imagePlaneCentreOffsetToBoundingXSpan,
    apparentMaskXSpanToYSpan:
      ((boxWidth * imageWidth) / width) / ((boxHeight * imageHeight) / height),
    candidateOnly: true,
    anatomicalNoseSubregionsObserved: false,
    accuracyValidated: false,
    traditionalBindingAuthorized: false,
  });
}
