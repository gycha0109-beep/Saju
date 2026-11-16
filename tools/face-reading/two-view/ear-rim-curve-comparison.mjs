import { measureVisibleEarMaskSilhouette } from './visible-ear-mask-silhouette.mjs';

// Transient comparison of a reviewed outer-rim stroke and whole-ear model CLASS
// pixels in the same original image. Not anatomical helix accuracy or 3D truth.
export const EAR_RIM_CURVE_COMPARISON_VERSION = 'engineering.ear-rim-class-boundary-curve@0.1.0';
const policy = Object.freeze({
  candidateOnly: true,
  singleReviewerUnverified: true,
  drawingCoverageCertified: false,
  anatomicalOuterRimValidated: false,
  modelHumanAgreementValidated: false,
  independentAccuracyValidated: false,
  earThicknessMeasured: false,
  earProjectionMeasured: false,
  anatomicalLateralityAssigned: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const no = (reason) => Object.freeze({ status: 'unavailable', reason });
const fractions = Object.freeze([0.1, 0.3, 0.5, 0.7, 0.9]);

function reviewed(human) {
  return (
    human?.viewRole === 'frontal' &&
    human.coordinateFrame === 'normalized_original_image_screen_sides' &&
    human.humanReviewed === true &&
    human.independentAccuracyValidated === false &&
    human.canonicalF0Admitted === false &&
    human.traditionalBindingAuthorized === false &&
    human.productInterpretationAuthorized === false &&
    human.modelTrainingAuthorized === false &&
    human.earThicknessMeasured === false &&
    human.earProjectionMeasured === false
  );
}
function validStroke(contour, left, imageWidth, imageHeight) {
  if (
    contour?.status !== 'marked' ||
    !Array.isArray(contour.segments) ||
    contour.segments.length !== 1
  )
    return null;
  const pts = contour.segments[0];
  if (
    !Array.isArray(pts) ||
    pts.length < 3 ||
    pts.length > 400 ||
    !pts.every(
      (p) =>
        Array.isArray(p) &&
        p.length === 2 &&
        p.every((n) => Number.isFinite(n) && n > 0 && n < 1) &&
        (left ? p[0] < 0.5 : p[0] > 0.5),
    )
  )
    return null;
  const scaled = pts.map(([x, y]) => [x * imageWidth, y * imageHeight]);
  const distances = scaled
    .slice(1)
    .map((point, i) => Math.hypot(point[0] - scaled[i][0], point[1] - scaled[i][1]));
  if (distances.some((d) => d <= 0 || !Number.isFinite(d))) return null;
  const total = distances.reduce((a, b) => a + b, 0);
  if (total < fractions.length) return null; // Five distinct display-pixel samples.
  return { scaled, distances, total };
}
function pointsAtFractions(stroke) {
  return fractions.map((fraction) => {
    let distance = fraction * stroke.total;
    for (let i = 0; i < stroke.distances.length; i++) {
      const len = stroke.distances[i];
      if (distance <= len || i === stroke.distances.length - 1) {
        const t = Math.min(1, distance / len);
        const a = stroke.scaled[i],
          b = stroke.scaled[i + 1];
        return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      }
      distance -= len;
    }
    return null;
  });
}
function maskBoundary(mask, width, height, left, imageWidth, imageHeight) {
  const border = [];
  for (let y = 1; y < height - 1; y++)
    for (let x = 1; x < width - 1; x++) {
      if (mask[y * width + x] !== 1 || (left ? x >= width / 2 : x <= width / 2)) continue;
      const p = y * width + x;
      if (mask[p - 1] && mask[p + 1] && mask[p - width] && mask[p + width]) continue;
      border.push([((x + 0.5) / width) * imageWidth, ((y + 0.5) / height) * imageHeight]);
    }
  return border;
}
function sideDistance(contour, border, left, imageWidth, imageHeight) {
  const stroke = validStroke(contour, left, imageWidth, imageHeight);
  if (!stroke) return no('FULL_SINGLE_VISIBLE_OUTER_RIM_STROKE_REQUIRED');
  if (!border.length) return no('NO_MODEL_EAR_CLASS_BOUNDARY');
  const diagonal = Math.hypot(imageWidth, imageHeight);
  const distances = pointsAtFractions(stroke).map((point) => {
    let shortest = Infinity;
    for (const [x, y] of border)
      shortest = Math.min(shortest, Math.hypot(point[0] - x, point[1] - y));
    return shortest / diagonal;
  });
  if (distances.some((v) => !Number.isFinite(v))) return no('MODEL_STROKE_DISTANCE_INVALID');
  return Object.freeze({
    status: 'available',
    comparedStrokeArcSamples: distances.length,
    meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal:
      distances.reduce((a, b) => a + b, 0) / distances.length,
    maxHumanStrokeToNearestModelClassEdgeOverImageDiagonal: Math.max(...distances),
    inspectedWholeEarClassOnly: true,
  });
}
export function compareEarMaskBoundaryToHumanOuterRim({
  mask,
  width,
  height,
  imageWidth = width,
  imageHeight = height,
  human,
} = {}) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 3 ||
    height < 3 ||
    mask?.length !== width * height ||
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    imageWidth < 3 ||
    imageHeight < 3
  )
    throw Error('EAR_RIM_CURVE_INPUT_INVALID');
  const base = { methodVersion: EAR_RIM_CURVE_COMPARISON_VERSION, ...policy };
  const unavailable = (reason) => Object.freeze({ ...base, status: 'unavailable', reason });
  if (!human) return unavailable('HUMAN_EAR_REVIEW_NOT_RECORDED');
  if (!reviewed(human)) return unavailable('HUMAN_EAR_SOURCE_AUTHORITY_INVALID');
  const envelope = measureVisibleEarMaskSilhouette(mask, width, height, {
    imageWidth,
    imageHeight,
  });
  if (
    envelope.status !== 'available' ||
    envelope.regions.length !== 2 ||
    envelope.regions[0].centerXToImageWidth >= 0.5 ||
    envelope.regions[1].centerXToImageWidth <= 0.5
  )
    return unavailable('TWO_UNCLIPPED_IMAGE_SIDE_EAR_CLASSES_REQUIRED');
  const imageLeft = sideDistance(
    human.imageLeft?.outerRim,
    maskBoundary(mask, width, height, true, imageWidth, imageHeight),
    true,
    imageWidth,
    imageHeight,
  );
  const imageRight = sideDistance(
    human.imageRight?.outerRim,
    maskBoundary(mask, width, height, false, imageWidth, imageHeight),
    false,
    imageWidth,
    imageHeight,
  );
  const complete = [imageLeft, imageRight].filter((item) => item.status === 'available').length;
  return Object.freeze({
    ...base,
    status: complete === 2 ? 'available' : complete === 1 ? 'partial' : 'unavailable',
    reason: complete === 0 ? 'NO_COMPARABLE_VISIBLE_OUTER_RIM_STROKES' : null,
    imageLeft,
    imageRight,
  });
}
