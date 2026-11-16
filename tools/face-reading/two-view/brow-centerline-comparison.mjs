import { measureVisibleBrowMaskEnvelope } from './visible-brow-mask-envelope.mjs';

export const BROW_CENTERLINE_COMPARISON_VERSION =
  'engineering.brow-centerline-human-comparison@0.2.0';

function unavailable(reason) {
  return Object.freeze({
    status: 'unavailable',
    reason,
  });
}

function validHumanSide(side) {
  if (
    !side ||
    !['marked', 'partial', 'occluded', 'out_of_frame', 'no_visible_brow', 'unknown'].includes(
      side.status,
    ) ||
    !Array.isArray(side.segments)
  )
    return false;
  const drawn = ['marked', 'partial'].includes(side.status);
  if (drawn !== side.segments.length > 0) return false;
  return side.segments.every(
    (line) =>
      Array.isArray(line) &&
      line.length >= 2 &&
      line.every(
        (point) =>
          Array.isArray(point) &&
          point.length === 2 &&
          point.every((value) => Number.isFinite(value) && value >= 0 && value <= 1),
      ),
  );
}

function squaredSegmentDistance(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const den = dx * dx + dy * dy;
  const t = den === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / den));
  const x = ax + t * dx;
  const y = ay + t * dy;
  return (px - x) ** 2 + (py - y) ** 2;
}

// Span of *drawn centreline annotations*, not true eyebrow roots. Only a
// continuous, strictly image-x-monotonic line on each fully marked image side
// is comparable; arbitrary partial lines never become an anatomical endpoint.
function compareApparentBrowGapToHumanLines(envelope, human) {
  const candidateOnly = {
    candidateOnly: true,
    singleReviewerUnverified: true,
    anatomicalInnerBrowEndsValidated: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  };
  const unavailable = (reason) =>
    Object.freeze({ ...candidateOnly, status: 'unavailable', reason });
  const sides = [human.imageLeft, human.imageRight];
  if (sides.some((side) => side.status !== 'marked' || side.segments.length !== 1))
    return unavailable('FULL_SINGLE_SEGMENT_PER_BROW_REQUIRED');
  const spans = sides.map((side) => {
    const points = side.segments[0];
    const xs = points.map((point) => point[0]);
    if (xs.length < 2) return null;
    const sign = Math.sign(xs[1] - xs[0]);
    if (!sign || xs.some((x, i) => i > 0 && Math.sign(x - xs[i - 1]) !== sign)) return null;
    const min = Math.min(...xs);
    const max = Math.max(...xs);
    return max > min ? { min, max, span: max - min } : null;
  });
  if (spans.some((span) => !span)) return unavailable('ANNOTATION_HORIZONTAL_SPAN_INVALID');
  const [left, right] = spans;
  if (!(left.max < right.min)) return unavailable('ANNOTATED_IMAGE_SIDES_OVERLAP');
  const avgSpan = (left.span + right.span) / 2;
  const observed = (right.min - left.max) / avgSpan;
  const model = envelope.apparentInterBrowGapToMeanMaskXSpan;
  if (!(Number.isFinite(observed) && Number.isFinite(model) && observed >= 0 && model >= 0))
    return unavailable('GAP_RATIO_INVALID');
  return Object.freeze({
    ...candidateOnly,
    status: 'available',
    drawnCenterlineGapToMeanDrawnXSpan: observed,
    modelMaskGapToMeanMaskXSpan: model,
    signedDrawnMinusModelRatio: observed - model,
    drawingCoverageCertified: false,
  });
}

function maskColumnRuns(mask, width, height) {
  const runs = [];
  let open = -1;
  for (let x = 0; x <= width; x++) {
    let hasPixel = false;
    if (x < width)
      for (let y = 0; y < height; y++)
        if (mask[y * width + x]) {
          hasPixel = true;
          break;
        }
    if (hasPixel && open === -1) open = x;
    if (!hasPixel && open !== -1) {
      runs.push([open, x - 1]);
      open = -1;
    }
  }
  return runs;
}

function compareSide(mask, width, height, imageWidth, imageHeight, run, side) {
  if (!['marked', 'partial'].includes(side.status)) return unavailable('HUMAN_SIDE_NOT_MARKED');
  const [minX, maxX] = run;
  const segments = side.segments.flatMap((line) =>
    line.slice(1).map((point, i) => [line[i], point]),
  );
  if (segments.length === 0) return unavailable('HUMAN_LINE_UNAVAILABLE');
  const distances = [];
  for (let x = minX; x <= maxX; x++) {
    let sum = 0,
      count = 0;
    for (let y = 0; y < height; y++) {
      if (!mask[y * width + x]) continue;
      sum += y + 0.5;
      count++;
    }
    if (count === 0) return unavailable('MODEL_COLUMN_GAP');
    const px = ((x + 0.5) / width) * imageWidth;
    const py = (sum / count / height) * imageHeight;
    let closest = Infinity;
    for (const [a, b] of segments) {
      const ax = a[0] * imageWidth,
        bx = b[0] * imageWidth;
      // Do not extrapolate a short/partial manual segment to the rest of the brow.
      if (px < Math.min(ax, bx) || px > Math.max(ax, bx)) continue;
      closest = Math.min(
        closest,
        squaredSegmentDistance(px, py, ax, a[1] * imageHeight, bx, b[1] * imageHeight),
      );
    }
    if (Number.isFinite(closest)) distances.push(Math.sqrt(closest));
  }
  if (!distances.length) return unavailable('NO_SHARED_HORIZONTAL_COVERAGE');
  return Object.freeze({
    status:
      side.status === 'partial' || distances.length < maxX - minX + 1 ? 'partial' : 'available',
    meanMaskColumnToHumanLineDistancePx: distances.reduce((a, b) => a + b, 0) / distances.length,
    maxMaskColumnToHumanLineDistancePx: Math.max(...distances),
    comparedMaskColumns: distances.length,
    totalMaskColumns: maxX - minX + 1,
    comparedMaskColumnFraction: distances.length / (maxX - minX + 1),
    humanReviewStatus: side.status,
  });
}

/**
 * A local engineering comparison, NOT ground-truth accuracy.
 * Candidate: per-column mean row of the existing pinned eyebrow segmentation mask.
 * Reference: one reviewer's line in the same original-image normalized coordinates.
 * No model selection, IoU, anatomical meaning, population threshold, or F0 admission.
 */
export function compareBrowCenterlinesToHumanReview({
  mask,
  width,
  height,
  imageWidth,
  imageHeight,
  humanReview,
} = {}) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 2 ||
    height < 2 ||
    mask?.length !== width * height ||
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    imageWidth <= 0 ||
    imageHeight <= 0
  )
    throw Error('BROW_COMPARISON_INPUT_INVALID');

  const summary = {
    methodVersion: BROW_CENTERLINE_COMPARISON_VERSION,
    status: 'unavailable',
    reason: null,
    imageLeft: unavailable('NOT_EVALUATED'),
    imageRight: unavailable('NOT_EVALUATED'),
    apparentBrowGapComparison: unavailable('NOT_EVALUATED'),
    candidateOnly: true,
    singleReviewerUnverified: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
  };
  if (!humanReview)
    return Object.freeze({
      ...summary,
      reason: 'HUMAN_REVIEW_UNAVAILABLE',
      apparentBrowGapComparison: unavailable('HUMAN_REVIEW_UNAVAILABLE'),
    });
  if (
    humanReview.humanReviewed !== true ||
    humanReview.independentAccuracyValidated !== false ||
    humanReview.modelTrainingAuthorized !== false ||
    !validHumanSide(humanReview.imageLeft) ||
    !validHumanSide(humanReview.imageRight)
  )
    return Object.freeze({
      ...summary,
      reason: 'HUMAN_REVIEW_INVALID',
      apparentBrowGapComparison: unavailable('HUMAN_REVIEW_INVALID'),
    });

  const envelope = measureVisibleBrowMaskEnvelope(mask, width, height, { imageWidth, imageHeight });
  if (envelope.status !== 'available')
    return Object.freeze({
      ...summary,
      reason: 'MODEL_' + envelope.reason,
      apparentBrowGapComparison: unavailable('MODEL_' + envelope.reason),
    });
  const runs = maskColumnRuns(mask, width, height);
  if (runs.length !== 2)
    return Object.freeze({
      ...summary,
      reason: 'MODEL_SIDE_SPLIT_UNAVAILABLE',
      apparentBrowGapComparison: unavailable('MODEL_SIDE_SPLIT_UNAVAILABLE'),
    });
  const imageLeft = compareSide(
    mask,
    width,
    height,
    imageWidth,
    imageHeight,
    runs[0],
    humanReview.imageLeft,
  );
  const imageRight = compareSide(
    mask,
    width,
    height,
    imageWidth,
    imageHeight,
    runs[1],
    humanReview.imageRight,
  );
  const available = [imageLeft, imageRight].filter(
    (side) => side.status === 'available' || side.status === 'partial',
  );
  return Object.freeze({
    ...summary,
    status:
      available.length === 0
        ? 'unavailable'
        : available.length === 2 && available.every((side) => side.status === 'available')
          ? 'available'
          : 'partial',
    reason: available.length === 0 ? 'NO_COMPARABLE_SIDES' : null,
    imageLeft,
    imageRight,
    apparentBrowGapComparison: compareApparentBrowGapToHumanLines(envelope, humanReview),
  });
}
