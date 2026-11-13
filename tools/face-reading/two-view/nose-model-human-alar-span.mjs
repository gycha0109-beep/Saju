import {
  measureVisibleNoseMaskProfile,
  VISIBLE_NOSE_MASK_PROFILE_VERSION,
} from './visible-nose-mask-profile.mjs';

// Raw mask stays in browser memory; output contains ONLY normalized scalar
// candidates. A whole-nose model class is not an alar/nostril/tip detector.
export const NOSE_MODEL_HUMAN_SPAN_VERSION = 'engineering.nose-mask-human-alar-span@0.1.0';
const blocked = (reason) =>
  Object.freeze({
    methodVersion: NOSE_MODEL_HUMAN_SPAN_VERSION,
    status: 'unavailable',
    reason,
    candidateOnly: true,
    singleReviewerUnverified: true,
    anatomicalAlarBoundaryValidated: false,
    anatomicalNoseSubregionsObserved: false,
    modelHumanAgreementValidated: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
const point = (x) =>
  Array.isArray(x) &&
  x.length === 2 &&
  x.every((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1);
const contourRange = (line) => {
  if (
    !line ||
    line.status !== 'marked' ||
    !Array.isArray(line.segments) ||
    line.segments.length !== 1
  )
    return null;
  const pts = line.segments[0];
  if (!Array.isArray(pts) || pts.length < 2 || pts.length > 400 || !pts.every(point)) return null;
  const xs = pts.map((p) => p[0]),
    ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
  return minX > 0 && maxX < 1 && minY > 0 && maxY < 1 && maxX > minX
    ? { minX, maxX, minY, maxY }
    : null;
};
function validatedHuman(human) {
  return (
    human &&
    human.humanReviewed === true &&
    human.independentAccuracyValidated === false &&
    human.canonicalF0Admitted === false &&
    human.traditionalBindingAuthorized === false &&
    human.productInterpretationAuthorized === false &&
    human.modelTrainingAuthorized === false
  );
}
function maskWidth(mask, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    mask?.length !== width * height
  )
    return null;
  let min = width,
    max = -1;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== 0 && mask[i] !== 1) return null;
    if (mask[i]) {
      min = Math.min(min, i % width);
      max = Math.max(max, i % width);
    }
  }
  if (min <= 0 || max >= width - 1 || max <= min) return null;
  return (max - min + 1) / width;
}
export function compareNoseMaskToHumanAlarSpans(model, mask, width, height, human) {
  if (!human) return blocked('HUMAN_NOSE_REVIEW_NOT_RECORDED');
  if (!validatedHuman(human)) return blocked('HUMAN_REVIEW_AUTHORITY_MISMATCH');
  if (!model || model.status !== 'available') return blocked('MODEL_NOSE_CLASS_UNAVAILABLE');
  if (
    model.methodVersion !== VISIBLE_NOSE_MASK_PROFILE_VERSION ||
    model.source !== 'pinned_full_frame_face_parsing_nose_rgba_overlay' ||
    model.candidateOnly !== true ||
    model.anatomicalNoseSubregionsObserved !== false ||
    model.accuracyValidated !== false ||
    model.traditionalBindingAuthorized !== false
  )
    return blocked('MODEL_SOURCE_AUTHORITY_MISMATCH');
  const left = contourRange(human.imageLeftAlar);
  const right = contourRange(human.imageRightAlar);
  if (!left || !right) return blocked('TWO_COMPLETE_ALAR_STROKES_REQUIRED');
  if (left.maxX >= right.minX) return blocked('IMAGE_SIDE_ALAR_STROKES_OVERLAP');
  const span = right.maxX - left.minX;
  if (!Number.isFinite(span) || span <= 0 || span >= 1) return blocked('DRAWN_ALAR_SPAN_INVALID');
  const modelSpan = maskWidth(mask, width, height);
  if (modelSpan === null) return blocked('MASK_FRAME_OR_BINARY_INVALID');
  // Validate full original mask topology, not just its extrema. Do not
  // recompute or authorize a separate anatomical nose measurement.
  let recomputed;
  try {
    recomputed = measureVisibleNoseMaskProfile(mask, width, height);
  } catch {
    return blocked('MODEL_MASK_VALIDATION_FAILED');
  }
  if (
    recomputed.status !== 'available' ||
    recomputed.methodVersion !== model.methodVersion ||
    JSON.stringify(recomputed.sections) !== JSON.stringify(model.sections)
  )
    return blocked('MODEL_MASK_CURRENT_SOURCE_MISMATCH');
  return Object.freeze({
    methodVersion: NOSE_MODEL_HUMAN_SPAN_VERSION,
    status: 'available',
    drawnOuterAlarXSpanToImageWidth: span,
    modelWholeNoseClassXSpanToImageWidth: modelSpan,
    signedDrawnMinusModelXSpan: span - modelSpan,
    humanTipReviewRecorded: human.tip?.status === 'marked',
    humanNostrilContoursRecorded:
      human.imageLeftNostril?.status === 'marked' && human.imageRightNostril?.status === 'marked',
    drawingCoverageCertified: false,
    candidateOnly: true,
    singleReviewerUnverified: true,
    anatomicalAlarBoundaryValidated: false,
    anatomicalNoseSubregionsObserved: false,
    modelHumanAgreementValidated: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
}
