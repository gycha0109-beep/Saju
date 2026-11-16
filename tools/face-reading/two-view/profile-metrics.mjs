import { faceClasses } from './region-quality.mjs';
export const PROFILE_VERSION = 'engineering.profile.visible-class-extents@0.1.0';
export const PROFILE_DEFINITIONS = Object.freeze([
  { id: 'visible_face_aspect', label: '보이는 얼굴 피부 윤곽 세로 / 가로' },
  { id: 'nose_width_to_face_height', label: '코 영역 폭 / 얼굴 피부 높이' },
  { id: 'lip_width_to_face_height', label: '입술 영역 폭 / 얼굴 피부 높이' },
  { id: 'ear_height_to_face_height', label: '귀 후보 높이 / 얼굴 피부 높이' },
]);
const reasons = [
  'NO_SINGLE_FACE',
  'FRAME_UNAVAILABLE',
  'REFERENCE_UNAVAILABLE',
  'FACE_CLIPPED',
  'PART_MISSING',
  'PART_CLIPPED',
  'ANCHOR_DISAGREEMENT',
];
function extent(mask, size, classes) {
  let left = size,
    top = size,
    right = -1,
    bottom = -1;
  for (let p = 0; p < mask.length; p++)
    if (classes.includes(mask[p])) {
      const x = p % size,
        y = Math.floor(p / size);
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  return right < 0
    ? null
    : {
        width: right - left + 1,
        height: bottom - top + 1,
        clipped: left === 0 || top === 0 || right === size - 1 || bottom === size - 1,
      };
}
export function unavailableProfile(reason) {
  return {
    methodVersion: PROFILE_VERSION,
    status: 'completed',
    metrics: PROFILE_DEFINITIONS.map((d) => ({ id: d.id, status: 'unavailable', reason })),
  };
}
export function measureProfile(mask, size, checks) {
  if (
    !Number.isInteger(size) ||
    size <= 0 ||
    mask.length !== size * size ||
    mask.some((n) => n > 18)
  )
    throw Error('PROFILE_INPUT_INVALID');
  const face = extent(mask, size, faceClasses);
  if (!checks.referenceSupported || !face || face.width < 2 || face.height < 2)
    return unavailableProfile('REFERENCE_UNAVAILABLE');
  if (face.clipped || checks.sourceClipped) return unavailableProfile('FACE_CLIPPED');
  const groups = [
    { classes: [10], axis: 'width' },
    { classes: [12, 13], axis: 'width' },
    { classes: [7, 8], axis: 'height' },
  ];
  const metrics = PROFILE_DEFINITIONS.map((d, i) => {
    if (!i)
      return { id: d.id, status: 'available', value: face.height / face.width, unit: 'ratio' };
    if (i === 2 && !checks.lipsAligned)
      return { id: d.id, status: 'unavailable', reason: 'ANCHOR_DISAGREEMENT' };
    const group = groups[i - 1],
      part = extent(mask, size, group.classes);
    if (!part || part.width < 2 || part.height < 2)
      return { id: d.id, status: 'unavailable', reason: 'PART_MISSING' };
    if (part.clipped) return { id: d.id, status: 'unavailable', reason: 'PART_CLIPPED' };
    return {
      id: d.id,
      status: 'available',
      value: part[group.axis] / face.height,
      unit: 'ratio',
    };
  });
  return { methodVersion: PROFILE_VERSION, status: 'completed', metrics };
}
export function sourceFaceClipped(mask, size, frame, width, height) {
  const c = Math.cos(frame.angle || 0),
    s = Math.sin(frame.angle || 0);
  for (let p = 0; p < mask.length; p++)
    if (faceClasses.includes(mask[p])) {
      const dx = (((p % size) + 0.5) / size - 0.5) * frame.side,
        dy = ((Math.floor(p / size) + 0.5) / size - 0.5) * frame.side;
      const x = frame.left + frame.side / 2 + c * dx + s * dy,
        y = frame.top + frame.side / 2 - s * dx + c * dy;
      if (x <= 1 || y <= 1 || x >= width - 1 || y >= height - 1) return true;
    }
  return false;
}
export function validateProfile(input) {
  if (input?.status === 'not_requested') return { status: 'not_requested' };
  if (
    input?.methodVersion !== PROFILE_VERSION ||
    input.status !== 'completed' ||
    !Array.isArray(input.metrics) ||
    input.metrics.length !== PROFILE_DEFINITIONS.length ||
    new Set(input.metrics.map((m) => m.id)).size !== PROFILE_DEFINITIONS.length
  )
    throw Error('PARSING_SUMMARY_INVALID');
  return {
    methodVersion: PROFILE_VERSION,
    status: 'completed',
    metrics: PROFILE_DEFINITIONS.map((d) => {
      const m = input.metrics.find((m) => m.id === d.id);
      if (
        m?.status === 'available' &&
        Number.isFinite(m.value) &&
        m.value > 0 &&
        m.value <= 512 &&
        m.unit === 'ratio'
      )
        return { id: d.id, status: 'available', value: m.value, unit: 'ratio' };
      if (m?.status === 'unavailable' && reasons.includes(m.reason) && m.value === undefined)
        return { id: d.id, status: 'unavailable', reason: m.reason };
      throw Error('PARSING_SUMMARY_INVALID');
    }),
  };
}
