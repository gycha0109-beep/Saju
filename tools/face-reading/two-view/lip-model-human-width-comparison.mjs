import { VISIBLE_LIP_CLASS_PROFILE_VERSION } from './visible-lip-class-profile.mjs';

// Local original-image horizontal span comparison. Neither a parser lip class
// nor a human-drawn stroke is an independently validated anatomical border.
export const LIP_MODEL_HUMAN_WIDTH_VERSION = 'engineering.lip-class-human-border-span@0.1.0';
const validPoint = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((x) => typeof x === 'number' && Number.isFinite(x) && x >= 0 && x <= 1);
const abort = (reason) =>
  Object.freeze({
    methodVersion: LIP_MODEL_HUMAN_WIDTH_VERSION,
    status: 'unavailable',
    reason,
    candidateOnly: true,
    singleReviewerUnverified: true,
    anatomicalLipBordersValidated: false,
    modelHumanAgreementValidated: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
function span(line) {
  if (
    !line ||
    line.status !== 'marked' ||
    !Array.isArray(line.segments) ||
    line.segments.length !== 1
  )
    return null;
  const pts = line.segments[0];
  if (!Array.isArray(pts) || pts.length < 2 || pts.length > 400 || !pts.every(validPoint))
    return null;
  const xs = pts.map((x) => x[0]),
    direction = Math.sign(xs[1] - xs[0]);
  if (!direction || xs.some((x, i) => i > 0 && Math.sign(x - xs[i - 1]) !== direction)) return null;
  const min = Math.min(...xs),
    max = Math.max(...xs);
  return max > min ? { min, max, width: max - min } : null;
}
function corner(mark) {
  return mark?.status === 'marked' && validPoint(mark.point) ? mark.point : null;
}

export function compareLipClassWidthsToHumanBorders(model, human) {
  if (!human) return abort('HUMAN_LIP_BORDER_NOT_RECORDED');
  if (!model || model.status !== 'available') return abort('MODEL_LIP_CLASS_NOT_AVAILABLE');
  if (
    model.methodVersion !== VISIBLE_LIP_CLASS_PROFILE_VERSION ||
    model.source !== 'pinned_screened_full_frame_lip_classes_12_13' ||
    model.candidateOnly !== true ||
    model.actualAnatomicalLipBorderValidated !== false ||
    model.accuracyValidated !== false ||
    model.traditionalBindingAuthorized !== false ||
    human.humanReviewed !== true ||
    human.independentAccuracyValidated !== false ||
    human.canonicalF0Admitted !== false ||
    human.traditionalBindingAuthorized !== false ||
    human.productInterpretationAuthorized !== false ||
    human.modelTrainingAuthorized !== false
  )
    return abort('SOURCE_AUTHORITY_OR_VERSION_MISMATCH');
  const upper = span(human.upperLipBorder),
    lower = span(human.lowerLipBorder);
  if (!upper || !lower) return abort('TWO_COMPLETE_SINGLE_BORDER_STROKES_REQUIRED');
  const left = corner(human.imageLeftMouthCorner),
    right = corner(human.imageRightMouthCorner);
  if (!left || !right || left[0] >= right[0]) return abort('BOTH_MOUTH_CORNERS_REQUIRED');
  if ([upper, lower].some((x) => x.min < left[0] || x.max > right[0]))
    return abort('BORDER_STROKE_OUTSIDE_MARKED_CORNERS');
  const modelUpper = model.upperVisibleWidthToCombinedXSpan;
  const modelLower = model.lowerVisibleWidthToCombinedXSpan;
  if (
    !Number.isFinite(modelUpper) ||
    !Number.isFinite(modelLower) ||
    modelUpper <= 0 ||
    modelLower <= 0 ||
    modelUpper > 1 ||
    modelLower > 1
  )
    return abort('MODEL_LIP_CLASS_SPANS_INVALID');
  const humanRatio = upper.width / lower.width;
  const modelRatio = modelUpper / modelLower;
  if (!Number.isFinite(humanRatio) || !Number.isFinite(modelRatio))
    return abort('LIP_WIDTH_RATIO_INVALID');
  return Object.freeze({
    methodVersion: LIP_MODEL_HUMAN_WIDTH_VERSION,
    status: 'available',
    drawnUpperToLowerHorizontalSpanRatio: humanRatio,
    modelClassUpperToLowerHorizontalSpanRatio: modelRatio,
    signedDrawnMinusModelRatio: humanRatio - modelRatio,
    fullAnatomicalBorderCoverageCertified: false,
    candidateOnly: true,
    singleReviewerUnverified: true,
    anatomicalLipBordersValidated: false,
    modelHumanAgreementValidated: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
}
