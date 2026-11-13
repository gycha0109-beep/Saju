import { VISIBLE_EAR_MASK_SILHOUETTE_VERSION } from './visible-ear-mask-silhouette.mjs';

// Whole-ear region vs one human-drawn outer-rim stroke, in the SAME original
// frame. This is not helix, ear projection, attachment, or anatomical truth.
export const EAR_MODEL_HUMAN_SPAN_VERSION = 'engineering.ear-mask-human-rim-span@0.1.0';
const fail = (reason) =>
  Object.freeze({
    methodVersion: EAR_MODEL_HUMAN_SPAN_VERSION,
    status: 'unavailable',
    reason,
    candidateOnly: true,
    singleReviewerUnverified: true,
    modelHumanAgreementValidated: false,
    anatomicalOuterRimValidated: false,
    independentAccuracyValidated: false,
    anatomicalLateralityAssigned: false,
    earProjectionMeasured: false,
    earThicknessMeasured: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
const point = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1);
const measurable = (region) =>
  region?.status === 'available' &&
  region.reason === null &&
  Number.isFinite(region.visibleMaskWidthToImageWidth) &&
  Number.isFinite(region.visibleMaskHeightToImageHeight) &&
  region.visibleMaskWidthToImageWidth > 0 &&
  region.visibleMaskWidthToImageWidth < 1 &&
  region.visibleMaskHeightToImageHeight > 0 &&
  region.visibleMaskHeightToImageHeight < 1;

function drawnBounds(value) {
  if (value?.status !== 'marked' || !Array.isArray(value.segments) || value.segments.length !== 1)
    return null;
  const stroke = value.segments[0];
  if (!Array.isArray(stroke) || stroke.length < 3 || stroke.length > 400 || !stroke.every(point))
    return null;
  const xs = stroke.map((v) => v[0]),
    ys = stroke.map((v) => v[1]);
  const bounds = {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
  if (
    bounds.minX <= 0 ||
    bounds.maxX >= 1 ||
    bounds.minY <= 0 ||
    bounds.maxY >= 1 ||
    bounds.maxX <= bounds.minX ||
    bounds.maxY <= bounds.minY
  )
    return null;
  return bounds;
}
export function compareEarMaskToHumanOuterRim(model, human) {
  if (!human) return fail('HUMAN_EAR_REVIEW_NOT_RECORDED');
  if (!model || !['available', 'partial'].includes(model.status))
    return fail('MODEL_EAR_SILHOUETTE_UNAVAILABLE');
  if (
    model.methodVersion !== VISIBLE_EAR_MASK_SILHOUETTE_VERSION ||
    model.source !== 'pinned_face_parsing_ear_rgba_overlay' ||
    model.candidateOnly !== true ||
    model.anatomicalLateralityAssigned !== false ||
    model.helixIdentified !== false ||
    model.lobeIdentified !== false ||
    model.attachmentIdentified !== false ||
    model.projectionMeasured !== false ||
    model.thicknessMeasured !== false ||
    model.independentAccuracyValidated !== false ||
    model.traditionalBindingAuthorized !== false ||
    !Array.isArray(model.regions) ||
    human.viewRole !== 'frontal' ||
    human.humanReviewed !== true ||
    human.independentAccuracyValidated !== false ||
    human.canonicalF0Admitted !== false ||
    human.traditionalBindingAuthorized !== false ||
    human.productInterpretationAuthorized !== false ||
    human.modelTrainingAuthorized !== false ||
    human.earProjectionMeasured !== false ||
    human.earThicknessMeasured !== false ||
    human.coordinateFrame !== 'normalized_original_image_screen_sides'
  )
    return fail('SOURCE_AUTHORITY_OR_FRAME_MISMATCH');
  if (model.regions.length !== 2) return fail('TWO_UNAMBIGUOUS_IMAGE_SIDE_REGIONS_REQUIRED');
  const [left, right] = model.regions;
  if (
    left.imageOrder !== 1 ||
    right.imageOrder !== 2 ||
    !Number.isFinite(left.centerXToImageWidth) ||
    !Number.isFinite(right.centerXToImageWidth) ||
    !(left.centerXToImageWidth < 0.5 && right.centerXToImageWidth > 0.5)
  )
    return fail('IMAGE_SIDE_REGION_ASSIGNMENT_AMBIGUOUS');
  if (!measurable(left) || !measurable(right)) return fail('EAR_MASK_REGION_CLIPPED_OR_INVALID');
  const sides = [
    { side: 'imageLeft', region: left, outer: human.imageLeft?.outerRim },
    { side: 'imageRight', region: right, outer: human.imageRight?.outerRim },
  ];
  const comparisons = [];
  for (const { side, region, outer } of sides) {
    const drawn = drawnBounds(outer);
    if (!drawn) return fail('TWO_COMPLETE_SINGLE_OUTER_RIM_STROKES_REQUIRED');
    // A line explicitly marked on the other half of the image is an
    // incompatible image-side reference, not a valid geometry match.
    if ((side === 'imageLeft' && drawn.maxX >= 0.5) || (side === 'imageRight' && drawn.minX <= 0.5))
      return fail('ANNOTATED_IMAGE_SIDES_OVERLAP');
    const w = drawn.maxX - drawn.minX,
      h = drawn.maxY - drawn.minY;
    comparisons.push(
      Object.freeze({
        imageSide: side,
        drawnOuterRimXSpanToImageWidth: w,
        drawnOuterRimYSpanToImageHeight: h,
        modelRegionXSpanToImageWidth: region.visibleMaskWidthToImageWidth,
        modelRegionYSpanToImageHeight: region.visibleMaskHeightToImageHeight,
        signedDrawnMinusModelXSpan: w - region.visibleMaskWidthToImageWidth,
        signedDrawnMinusModelYSpan: h - region.visibleMaskHeightToImageHeight,
        drawingCoverageCertified: false,
      }),
    );
  }
  return Object.freeze({
    methodVersion: EAR_MODEL_HUMAN_SPAN_VERSION,
    status: 'available',
    sides: Object.freeze(comparisons),
    candidateOnly: true,
    singleReviewerUnverified: true,
    modelHumanAgreementValidated: false,
    anatomicalOuterRimValidated: false,
    independentAccuracyValidated: false,
    anatomicalLateralityAssigned: false,
    earProjectionMeasured: false,
    earThicknessMeasured: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
}
