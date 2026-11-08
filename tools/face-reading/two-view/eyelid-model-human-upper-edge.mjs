import { EYE_CLASS_PROFILE_VERSION } from './visible-eye-class-profile.mjs';

// Technical comparison of the pinned parser eye-class *top envelope* with a
// reviewer's manually drawn upper-lid margin. Neither is anatomical truth.
// Never compare crease/hooding boundaries with the generic eye class.
export const EYELID_UPPER_EDGE_COMPARISON_VERSION =
  'engineering.eyelid-upper-margin-to-eye-class-envelope@0.1.0';

const authority = Object.freeze({
  candidateOnly: true,
  singleReviewerUnverified: true,
  modelHumanAgreementValidated: false,
  actualAnatomicalUpperLidValidated: false,
  eyelidCreaseDetected: false,
  hoodingBoundaryDetected: false,
  anatomicalLateralityAssigned: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const unavailable = (reason) => Object.freeze({ status: 'unavailable', reason });
const point = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1);

function compareSide(model, human, side) {
  const part = human?.upperLidMargin;
  if (part?.status !== 'marked' || !Array.isArray(part.segments) || part.segments.length !== 1)
    return unavailable('COMPLETE_SINGLE_UPPER_MARGIN_REQUIRED');
  const line = part.segments[0];
  if (!Array.isArray(line) || line.length < 2 || line.length > 400 || !line.every(point))
    return unavailable('HUMAN_LINE_INVALID');
  const xs = line.map((p) => p[0]);
  const direction = Math.sign(xs[1] - xs[0]);
  if (!direction || xs.some((x, i) => i > 0 && Math.sign(x - xs[i - 1]) !== direction))
    return unavailable('HUMAN_X_MONOTONIC_REQUIRED');
  if (xs.some((x) => x <= 0 || x >= 1 || (side === 'imageLeft' ? x >= 0.5 : x <= 0.5)))
    return unavailable('ANNOTATED_IMAGE_SIDE_INVALID');

  const minX = model[side + 'XMinToImageWidth'];
  const maxX = model[side + 'XMaxToImageWidth'];
  const topY = model[side + 'TopToImageHeight'];
  if (
    ![minX, maxX, topY].every(Number.isFinite) ||
    !(minX > 0 && maxX < 1 && minX < maxX && topY > 0 && topY < 1) ||
    (side === 'imageLeft' ? maxX >= 0.5 : minX <= 0.5)
  )
    return unavailable('MODEL_SIDE_ENVELOPE_INVALID');

  const lower = Math.max(minX, Math.min(...xs));
  const upper = Math.min(maxX, Math.max(...xs));
  if (!(upper > lower)) return unavailable('NO_SHARED_HORIZONTAL_COVERAGE');
  // The parser's top Y is taken across its WHOLE class X envelope. Never
  // compare that global extremum to a shorter human marking: its topmost
  // class pixel could lie completely outside the human-covered interval.
  if (Math.min(...xs) > minX || Math.max(...xs) < maxX)
    return unavailable('FULL_MODEL_X_COVERAGE_REQUIRED');
  // Restrict the human line to that fully covered model interval; neither
  // extend a hand-drawn stroke nor treat a generic class as eyelid anatomy.
  const inRangeYs = [];
  for (let i = 1; i < line.length; i++) {
    const [ax, ay] = line[i - 1];
    const [bx, by] = line[i];
    const start = Math.max(lower, Math.min(ax, bx));
    const end = Math.min(upper, Math.max(ax, bx));
    if (!(end > start)) continue;
    for (const x of [start, end]) inRangeYs.push(ay + ((x - ax) * (by - ay)) / (bx - ax));
  }
  if (!inRangeYs.length || !inRangeYs.every(Number.isFinite))
    return unavailable('NO_SHARED_SEGMENT');
  const drawnTop = Math.min(...inRangeYs);
  return Object.freeze({
    status: 'available',
    drawnUpperMarginTopToImageHeight: drawnTop,
    modelEyeClassTopToImageHeight: topY,
    signedDrawnMinusModelTopToImageHeight: drawnTop - topY,
    overlappingXSpanToImageWidth: upper - lower,
    drawingCoverageCertified: false,
  });
}

export function compareEyeClassEnvelopeToHumanUpperMargin(model, human) {
  const base = {
    methodVersion: EYELID_UPPER_EDGE_COMPARISON_VERSION,
    ...authority,
    imageLeft: unavailable('NOT_EVALUATED'),
    imageRight: unavailable('NOT_EVALUATED'),
  };
  const fail = (reason) => Object.freeze({ ...base, status: 'unavailable', reason });
  if (!human) return fail('HUMAN_EYELID_REVIEW_NOT_RECORDED');
  if (
    human.humanReviewed !== true ||
    human.independentAccuracyValidated !== false ||
    human.actualAnatomicalContourValidated !== false ||
    human.anatomicalLateralityAssigned !== false ||
    human.eyelidProjectionMeasured !== false ||
    human.canonicalF0Admitted !== false ||
    human.traditionalBindingAuthorized !== false ||
    human.productInterpretationAuthorized !== false ||
    human.modelTrainingAuthorized !== false
  )
    return fail('HUMAN_AUTHORITY_INVALID');
  if (
    model?.methodVersion !== EYE_CLASS_PROFILE_VERSION ||
    model.source !== 'pinned_parser_classes_4_5' ||
    model.status !== 'available' ||
    model.candidateOnly !== true ||
    model.actualEyelidValidated !== false ||
    model.anatomicalLateralityAuthorized !== false ||
    model.accuracyValidated !== false ||
    model.traditionalBindingAuthorized !== false
  )
    return fail('MODEL_NOT_CURRENT_OR_INVALID');
  const imageLeft = compareSide(model, human.imageLeft, 'imageLeft');
  const imageRight = compareSide(model, human.imageRight, 'imageRight');
  const available = [imageLeft, imageRight].filter((side) => side.status === 'available');
  return Object.freeze({
    ...base,
    status:
      available.length === 2 ? 'available' : available.length === 1 ? 'partial' : 'unavailable',
    reason: available.length === 0 ? 'NO_COMPARABLE_SIDE' : null,
    imageLeft,
    imageRight,
  });
}
