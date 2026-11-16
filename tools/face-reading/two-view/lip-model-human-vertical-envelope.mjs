import { VISIBLE_LIP_CLASS_PROFILE_VERSION } from './visible-lip-class-profile.mjs';

// Compare two different visible 2D representations in the SAME original frame:
// complete human outer-border strokes and the pinned parser's class extrema.
// The model's full-class top/bottom requires human FULL horizontal coverage.
// Neither representation establishes anatomical lip thickness or shape.
export const LIP_VERTICAL_ENVELOPE_COMPARISON_VERSION =
  'engineering.lip-class-human-border-vertical-envelope@0.1.0';

const authority = Object.freeze({
  candidateOnly: true,
  singleReviewerUnverified: true,
  anatomicalLipBordersValidated: false,
  lipThicknessMeasured: false,
  modelHumanAgreementValidated: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const unavailable = (reason) => Object.freeze({ status: 'unavailable', reason });
const validPoint = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1);
function reviewCorners(human) {
  const left = human?.imageLeftMouthCorner;
  const right = human?.imageRightMouthCorner;
  if (
    left?.status !== 'marked' ||
    right?.status !== 'marked' ||
    !validPoint(left.point) ||
    !validPoint(right.point) ||
    !(left.point[0] > 0 && left.point[0] < right.point[0] && right.point[0] < 1)
  )
    return null;
  return [left.point[0], right.point[0]];
}
function compareBorder(part, bounds, corners, mode) {
  if (part?.status !== 'marked' || !Array.isArray(part.segments) || part.segments.length !== 1)
    return unavailable('COMPLETE_SINGLE_BORDER_STROKE_REQUIRED');
  const line = part.segments[0];
  if (!Array.isArray(line) || line.length < 2 || line.length > 400 || !line.every(validPoint))
    return unavailable('HUMAN_LINE_INVALID');
  const xs = line.map((point) => point[0]);
  const sign = Math.sign(xs[1] - xs[0]);
  if (!sign || xs.some((x, i) => i > 0 && Math.sign(x - xs[i - 1]) !== sign))
    return unavailable('HUMAN_X_MONOTONIC_REQUIRED');
  const [minX, maxX, yExtreme] = bounds;
  if (
    ![minX, maxX, yExtreme].every(Number.isFinite) ||
    !(minX > 0 && maxX < 1 && minX < maxX && yExtreme > 0 && yExtreme < 1)
  )
    return unavailable('MODEL_ENVELOPE_INVALID');
  const drawnLeft = Math.min(...xs);
  const drawnRight = Math.max(...xs);
  if (minX < corners[0] || maxX > corners[1])
    return unavailable('MODEL_CLASS_OUTSIDE_MOUTH_CORNERS');
  if (drawnLeft < corners[0] || drawnRight > corners[1])
    return unavailable('HUMAN_STROKE_OUTSIDE_MOUTH_CORNERS');
  if (drawnRight <= minX || drawnLeft >= maxX) return unavailable('NO_SHARED_HORIZONTAL_COVERAGE');
  if (drawnLeft > minX || drawnRight < maxX) return unavailable('FULL_MODEL_X_COVERAGE_REQUIRED');

  const values = [];
  for (let i = 1; i < line.length; i++) {
    const [ax, ay] = line[i - 1];
    const [bx, by] = line[i];
    const from = Math.max(minX, Math.min(ax, bx));
    const to = Math.min(maxX, Math.max(ax, bx));
    if (!(to > from)) continue;
    values.push(
      ay + ((from - ax) * (by - ay)) / (bx - ax),
      ay + ((to - ax) * (by - ay)) / (bx - ax),
    );
  }
  if (!values.length || !values.every(Number.isFinite)) return unavailable('NO_SHARED_SEGMENT');
  const drawnExtreme = mode === 'upper' ? Math.min(...values) : Math.max(...values);
  return Object.freeze({
    status: 'available',
    drawnBorderExtremeToImageHeight: drawnExtreme,
    modelClassExtremeToImageHeight: yExtreme,
    signedDrawnMinusModelExtremeToImageHeight: drawnExtreme - yExtreme,
    fullModelHorizontalRangeCompared: true,
    anatomicalBorderCoverageCertified: false,
  });
}

export function compareLipClassVerticalEnvelopesToHumanBorders(model, human) {
  const base = {
    methodVersion: LIP_VERTICAL_ENVELOPE_COMPARISON_VERSION,
    ...authority,
    upperBorder: unavailable('NOT_EVALUATED'),
    lowerBorder: unavailable('NOT_EVALUATED'),
  };
  const fail = (reason) => Object.freeze({ ...base, status: 'unavailable', reason });
  if (!human) return fail('HUMAN_LIP_BORDER_NOT_RECORDED');
  if (
    human.humanReviewed !== true ||
    human.independentAccuracyValidated !== false ||
    human.canonicalF0Admitted !== false ||
    human.traditionalBindingAuthorized !== false ||
    human.productInterpretationAuthorized !== false ||
    human.modelTrainingAuthorized !== false
  )
    return fail('HUMAN_AUTHORITY_INVALID');
  if (
    model?.status !== 'available' ||
    model.methodVersion !== VISIBLE_LIP_CLASS_PROFILE_VERSION ||
    model.source !== 'pinned_screened_full_frame_lip_classes_12_13' ||
    model.candidateOnly !== true ||
    model.actualAnatomicalLipBorderValidated !== false ||
    model.accuracyValidated !== false ||
    model.traditionalBindingAuthorized !== false
  )
    return fail('MODEL_SOURCE_OR_AUTHORITY_INVALID');
  const corners = reviewCorners(human);
  if (!corners) return fail('BOTH_MARKED_MOUTH_CORNERS_REQUIRED');
  const upperBorder = compareBorder(
    human.upperLipBorder,
    [
      model.upperClassXMinToImageWidth,
      model.upperClassXMaxToImageWidth,
      model.upperClassTopToImageHeight,
    ],
    corners,
    'upper',
  );
  const lowerBorder = compareBorder(
    human.lowerLipBorder,
    [
      model.lowerClassXMinToImageWidth,
      model.lowerClassXMaxToImageWidth,
      model.lowerClassBottomToImageHeight,
    ],
    corners,
    'lower',
  );
  if (
    upperBorder.status === 'available' &&
    lowerBorder.status === 'available' &&
    upperBorder.drawnBorderExtremeToImageHeight >= lowerBorder.drawnBorderExtremeToImageHeight
  )
    return fail('HUMAN_UPPER_LOWER_VERTICAL_ORDER_CONFLICT');
  const valid = [upperBorder, lowerBorder].filter((v) => v.status === 'available').length;
  return Object.freeze({
    ...base,
    status: valid === 2 ? 'available' : valid === 1 ? 'partial' : 'unavailable',
    reason: valid ? null : 'NO_COMPARABLE_BORDER',
    upperBorder,
    lowerBorder,
  });
}
