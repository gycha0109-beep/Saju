import { modelCycle, eyePairFrame } from './frontal-metrics.mjs';
import { supportedAnchors } from './parsing-frame.mjs';
export const EYE_DIRECTION_VERSION = 'engineering.frontal.model-eye-endpoint-direction@0.1.0';
export const EYE_TERM_KEY = 'eye.tail_down';
export function eyeClassAgreement(mask, size, points, topology, frame, width, height) {
  return ['eyeA', 'eyeB'].every((key) =>
    supportedAnchors(mask, size, points, topology[key], [4, 5], frame, width, height),
  );
}
const reasons = [
  'NO_SINGLE_FACE',
  'MULTIPLE_FACES',
  'PROFILE_VIEW',
  'EYE_CLASS_DISAGREEMENT',
  'LANDMARKS_UNAVAILABLE',
  'EYE_BOUNDARY_CLIPPED',
  'EYE_BOUNDARY_COLLAPSED',
  'EYE_AXIS_COLLAPSED',
  'ENDPOINT_AMBIGUOUS',
  'TOPOLOGY_INVALID',
];
export function unavailableEyeDirection(reason) {
  return {
    methodVersion: EYE_DIRECTION_VERSION,
    sourceTermKey: EYE_TERM_KEY,
    status: 'unavailable',
    reason,
    traditionalBindingAuthorized: false,
  };
}
export function computeEyeDirection({ landmarks, width, height, topology, viewRole }) {
  if (viewRole !== 'frontal') return unavailableEyeDirection('PROFILE_VIEW');
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0 ||
    !Array.isArray(landmarks) ||
    landmarks.length !== 478 ||
    landmarks.some((p) => !Number.isFinite(p?.x) || !Number.isFinite(p?.y))
  )
    return unavailableEyeDirection('LANDMARKS_UNAVAILABLE');
  let cycles;
  try {
    cycles = [
      modelCycle(topology.eyeA, landmarks, width, height),
      modelCycle(topology.eyeB, landmarks, width, height),
    ];
  } catch {
    return unavailableEyeDirection('TOPOLOGY_INVALID');
  }
  if (cycles.some((c) => c.some((p) => p.clipped)))
    return unavailableEyeDirection('EYE_BOUNDARY_CLIPPED');
  const frame = eyePairFrame(...cycles);
  if (!frame) return unavailableEyeDirection('EYE_AXIS_COLLAPSED');
  const projected = cycles
    .map((c) => c.map(frame.project))
    .sort((a, b) => frame.centroid(a).x - frame.centroid(b).x);
  const eyes = [];
  for (let i = 0; i < 2; i++) {
    const points = projected[i],
      xs = points.map((p) => p.x),
      ys = points.map((p) => p.y),
      left = Math.min(...xs),
      right = Math.max(...xs),
      span = right - left;
    if (span <= 0 || Math.max(...ys) - Math.min(...ys) <= 0)
      return unavailableEyeDirection('EYE_BOUNDARY_COLLAPSED');
    const min = points.filter((p) => p.x === left),
      max = points.filter((p) => p.x === right);
    if (min.length !== 1 || max.length !== 1) return unavailableEyeDirection('ENDPOINT_AMBIGUOUS');
    const inner = i === 0 ? max[0] : min[0],
      outer = i === 0 ? min[0] : max[0];
    // Roundoff only, not a shape/clinical/source tolerance or model error bound.
    const rawDelta = outer.y - inner.y,
      roundoff = 32 * Number.EPSILON * Math.max(1, Math.abs(outer.y), Math.abs(inner.y));
    const delta = Math.abs(rawDelta) <= roundoff ? 0 : rawDelta,
      ratio = delta / span;
    if (!Number.isFinite(ratio)) return unavailableEyeDirection('EYE_BOUNDARY_COLLAPSED');
    eyes.push({
      imageSide: i === 0 ? 'left' : 'right',
      outerMinusInnerHeightRatio: ratio,
      angleDegrees: (Math.atan2(delta, span) * 180) / Math.PI,
    });
  }
  return {
    methodVersion: EYE_DIRECTION_VERSION,
    sourceTermKey: EYE_TERM_KEY,
    status: 'available',
    eyes,
    traditionalBindingAuthorized: false,
  };
}
export function validateEyeDirection(input, { viewRole } = {}) {
  if (
    input?.methodVersion !== EYE_DIRECTION_VERSION ||
    input.sourceTermKey !== EYE_TERM_KEY ||
    input.traditionalBindingAuthorized !== false
  )
    throw Error('PARSING_SUMMARY_INVALID');
  if (input.status === 'unavailable' && reasons.includes(input.reason)) {
    if (viewRole !== undefined && (viewRole === 'profile') !== (input.reason === 'PROFILE_VIEW'))
      throw Error('PARSING_SUMMARY_INVALID');
    return unavailableEyeDirection(input.reason);
  }
  if (
    input.status !== 'available' ||
    viewRole === 'profile' ||
    !Array.isArray(input.eyes) ||
    input.eyes.length !== 2 ||
    input.eyes[0]?.imageSide !== 'left' ||
    input.eyes[1]?.imageSide !== 'right'
  )
    throw Error('PARSING_SUMMARY_INVALID');
  const eyes = input.eyes.map((eye) => {
    if (
      !Number.isFinite(eye.outerMinusInnerHeightRatio) ||
      !Number.isFinite(eye.angleDegrees) ||
      Math.abs(eye.angleDegrees) >= 90 ||
      Math.abs((Math.atan(eye.outerMinusInnerHeightRatio) * 180) / Math.PI - eye.angleDegrees) >
        1e-10
    )
      throw Error('PARSING_SUMMARY_INVALID');
    return {
      imageSide: eye.imageSide,
      outerMinusInnerHeightRatio: eye.outerMinusInnerHeightRatio,
      angleDegrees: eye.angleDegrees,
    };
  });
  return {
    methodVersion: EYE_DIRECTION_VERSION,
    sourceTermKey: EYE_TERM_KEY,
    status: 'available',
    eyes,
    traditionalBindingAuthorized: false,
  };
}
export function describeEyeDirection(input) {
  const value = validateEyeDirection(input);
  if (value.status !== 'available')
    return {
      status: 'unavailable',
      text: {
        NO_SINGLE_FACE: '한 얼굴의 위치를 확인하지 못했습니다.',
        MULTIPLE_FACES: '여러 얼굴을 한 사람의 관상 항목으로 합치지 않습니다.',
        PROFILE_VIEW: '눈꼬리 방향은 정면 사진에서 확인합니다.',
        EYE_CLASS_DISAGREEMENT: '눈 경계와 분할 위치가 맞지 않습니다.',
        LANDMARKS_UNAVAILABLE: '눈 경계점을 확인하지 못했습니다.',
        EYE_BOUNDARY_CLIPPED: '눈 경계가 사진 밖으로 잘렸습니다.',
        EYE_BOUNDARY_COLLAPSED: '눈 경계의 폭 또는 높이가 부족합니다.',
        EYE_AXIS_COLLAPSED: '양쪽 눈의 기준축을 만들지 못했습니다.',
        ENDPOINT_AMBIGUOUS: '안쪽·바깥쪽 모델 끝점이 하나로 정해지지 않습니다.',
        TOPOLOGY_INVALID: '눈 경계의 연결을 확인하지 못했습니다.',
      }[value.reason],
    };
  const directions = value.eyes.map((e) => Math.sign(e.outerMinusInnerHeightRatio));
  const text = directions.every((d) => d > 0)
    ? '사진에서는 양쪽 모델 눈의 바깥쪽 끝이 안쪽보다 아래에 있습니다.'
    : directions.every((d) => d < 0)
      ? '사진에서는 양쪽 모델 눈의 바깥쪽 끝이 안쪽보다 위에 있습니다.'
      : directions.every((d) => d === 0)
        ? '사진에서는 양쪽 모델 눈의 안쪽·바깥쪽 끝 높이가 같습니다.'
        : '사진에서는 양쪽 모델 눈 끝의 높이 방향이 서로 다릅니다.';
  return { status: 'available', text };
}
