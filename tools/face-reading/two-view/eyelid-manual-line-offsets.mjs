// Research-only offsets between manually marked visible eyelid lines.
// Lines are not automatically detected folds, hooding diagnoses, or anatomical truth.
export const EYELID_MANUAL_LINE_OFFSETS_VERSION = 'engineering.manual-eyelid-line-offsets@0.1.0';

const authority = Object.freeze({
  candidateOnly: true,
  manualDrawingOnly: true,
  singleReviewerUnverified: true,
  anatomicalFoldTypeIdentified: false,
  eyelidProjectionMeasured: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const withheld = (reason) => Object.freeze({ status: 'unavailable', reason });
const isPoint = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((v) => typeof v === 'number' && Number.isFinite(v) && v > 0 && v < 1);

function completeLine(part, side) {
  if (part?.status !== 'marked' || !Array.isArray(part.segments) || part.segments.length !== 1)
    return null;
  const input = part.segments[0];
  if (!Array.isArray(input) || input.length < 2 || input.length > 400 || !input.every(isPoint))
    return null;
  const points = input[0][0] > input.at(-1)[0] ? [...input].reverse() : input;
  if (
    points.some(
      (p, i) =>
        (side === 'imageLeft' ? p[0] >= 0.5 : p[0] <= 0.5) || (i > 0 && p[0] <= points[i - 1][0]),
    )
  )
    return null;
  return points;
}

function interpolate(points, x) {
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (x >= a[0] && x <= b[0]) return a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]);
  }
  return null;
}

function compareLines(side, upper, other) {
  const lid = completeLine(upper, side);
  const target = completeLine(other, side);
  if (!lid || !target) return withheld('COMPLETE_SINGLE_VISIBLE_LINES_REQUIRED');
  const start = Math.max(lid[0][0], target[0][0]);
  const end = Math.min(lid.at(-1)[0], target.at(-1)[0]);
  if (!(end > start)) return withheld('NO_SHARED_HORIZONTAL_SPAN');
  const offsets = [0.25, 0.5, 0.75].map((fraction) => {
    const x = start + fraction * (end - start);
    const a = interpolate(lid, x);
    const b = interpolate(target, x);
    return a === null || b === null ? NaN : b - a;
  });
  if (offsets.some((value) => !Number.isFinite(value)))
    return withheld('SHARED_LINE_INTERPOLATION_INVALID');
  const fullCoverage =
    start === lid[0][0] &&
    start === target[0][0] &&
    end === lid.at(-1)[0] &&
    end === target.at(-1)[0];
  return Object.freeze({
    status: fullCoverage ? 'available' : 'partial',
    sharedXSpanToImageWidth: end - start,
    signedOtherMinusUpperAtSharedQuartilesToImageHeight: Object.freeze(offsets),
    fullBothLinesHorizontalCoverage: fullCoverage,
  });
}

export function measureManualEyelidLineOffsets(review) {
  const base = {
    methodVersion: EYELID_MANUAL_LINE_OFFSETS_VERSION,
    ...authority,
  };
  if (!review)
    return Object.freeze({ ...base, status: 'unavailable', reason: 'HUMAN_REVIEW_NOT_RECORDED' });
  if (
    review.humanReviewed !== true ||
    review.actualAnatomicalContourValidated !== false ||
    review.anatomicalLateralityAssigned !== false ||
    review.eyelidProjectionMeasured !== false ||
    review.independentAccuracyValidated !== false ||
    review.canonicalF0Admitted !== false ||
    review.traditionalBindingAuthorized !== false ||
    review.productInterpretationAuthorized !== false ||
    review.modelTrainingAuthorized !== false
  )
    return Object.freeze({ ...base, status: 'unavailable', reason: 'HUMAN_AUTHORITY_INVALID' });

  const sides = Object.fromEntries(
    ['imageLeft', 'imageRight'].map((side) => [
      side,
      Object.freeze({
        creaseToUpperMargin: compareLines(
          side,
          review[side]?.upperLidMargin,
          review[side]?.creaseLine,
        ),
        hoodingToUpperMargin: compareLines(
          side,
          review[side]?.upperLidMargin,
          review[side]?.hoodingBoundary,
        ),
      }),
    ]),
  );
  const items = Object.values(sides).flatMap((side) => Object.values(side));
  const available = items.filter((item) => item.status !== 'unavailable');
  return Object.freeze({
    ...base,
    status:
      available.length === 0
        ? 'unavailable'
        : available.length === 4 && available.every((i) => i.status === 'available')
          ? 'available'
          : 'partial',
    reason: available.length === 0 ? 'NO_COMPLETE_SHARED_MARKED_LINES' : null,
    ...sides,
  });
}
