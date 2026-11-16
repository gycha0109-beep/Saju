// Study only: visible spacing between two manually drawn philtrum ridge lines.
// This is not anatomical philtrum width/length or independently validated data.
export const PHILTRUM_MANUAL_SPACING_VERSION =
  'engineering.philtrum-manual-ridge-spacing@0.1.0';

const researchOnly = Object.freeze({
  candidateOnly: true,
  manualDrawingOnly: true,
  singleReviewerUnverified: true,
  actualPhiltrumWidthValidated: false,
  actualPhiltrumLengthMeasured: false,
  independentAccuracyValidated: false,
  anatomicalLateralityAssigned: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const fail = (reason) =>
  Object.freeze({
    methodVersion: PHILTRUM_MANUAL_SPACING_VERSION,
    status: 'unavailable',
    reason,
    ...researchOnly,
  });
const point = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1);

function stroke(part) {
  if (part?.status !== 'marked' || !Array.isArray(part.segments) || part.segments.length !== 1)
    return null;
  const points = part.segments[0];
  if (!Array.isArray(points) || points.length < 2 || points.length > 400 || !points.every(point))
    return null;
  const direction = Math.sign(points[1][1] - points[0][1]);
  if (
    !direction ||
    points.some((p, i) => i > 0 && Math.sign(p[1] - points[i - 1][1]) !== direction)
  )
    return null;
  const ys = points.map((p) => p[1]);
  return { points, top: Math.min(...ys), bottom: Math.max(...ys) };
}
function xAtY(points, y) {
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (y < Math.min(a[1], b[1]) || y > Math.max(a[1], b[1])) continue;
    return a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]);
  }
  return NaN;
}

export function measureManualPhiltrumRidgeSpacing(review) {
  if (!review) return fail('HUMAN_LIP_REVIEW_NOT_RECORDED');
  if (
    review.humanReviewed !== true ||
    review.independentAccuracyValidated !== false ||
    review.canonicalF0Admitted !== false ||
    review.traditionalBindingAuthorized !== false ||
    review.productInterpretationAuthorized !== false ||
    review.modelTrainingAuthorized !== false
  )
    return fail('HUMAN_REVIEW_AUTHORITY_INVALID');
  const leftCorner = review.imageLeftMouthCorner;
  const rightCorner = review.imageRightMouthCorner;
  if (
    leftCorner?.status !== 'marked' ||
    rightCorner?.status !== 'marked' ||
    !point(leftCorner.point) ||
    !point(rightCorner.point) ||
    !(leftCorner.point[0] > 0 && rightCorner.point[0] < 1 &&
      leftCorner.point[0] < rightCorner.point[0])
  )
    return fail('MARKED_MOUTH_WIDTH_REFERENCE_REQUIRED');
  const left = stroke(review.philtrumImageLeft);
  const right = stroke(review.philtrumImageRight);
  if (!left || !right) return fail('TWO_COMPLETE_MONOTONIC_RIDGE_STROKES_REQUIRED');

  const mouthLeft = leftCorner.point[0];
  const mouthRight = rightCorner.point[0];
  if ([...left.points, ...right.points].some((p) => p[0] <= mouthLeft || p[0] >= mouthRight))
    return fail('RIDGE_OUTSIDE_MARKED_MOUTH_SPAN');

  const top = Math.max(left.top, right.top);
  const bottom = Math.min(left.bottom, right.bottom);
  if (!(bottom > top && top > 0 && bottom < 1))
    return fail('NO_INTERIOR_SHARED_VERTICAL_RANGE');
  // Only overlap that BOTH manually drawn lines cover, never inferred endpoints.
  const fractions = [0.25, 0.5, 0.75];
  const ratios = [];
  for (const fraction of fractions) {
    const y = top + (bottom - top) * fraction;
    const xLeft = xAtY(left.points, y);
    const xRight = xAtY(right.points, y);
    if (!(Number.isFinite(xLeft) && Number.isFinite(xRight)))
      return fail('RIDGE_INTERPOLATION_UNAVAILABLE');
    if (!(xLeft < xRight)) return fail('RIDGE_STROKES_CROSS_OR_REVERSE');
    ratios.push((xRight - xLeft) / (mouthRight - mouthLeft));
  }
  return Object.freeze({
    methodVersion: PHILTRUM_MANUAL_SPACING_VERSION,
    status: 'available',
    sampledPositionsInSharedDrawnYRange: Object.freeze(fractions),
    drawnRidgeSpacingToMarkedMouthWidth: Object.freeze(ratios),
    sharedDrawnYRangeToImageHeight: bottom - top,
    actualSubnasaleOrUpperLipEndpointIdentified: false,
    drawingCoverageCertified: false,
    ...researchOnly,
  });
}
