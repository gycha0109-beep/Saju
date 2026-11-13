// Local research-only bridge from existing SHA-verified human review stores
// to FR294 image/visibility gaps. Never issues F0, truth, or accuracy authority.
import { EYE_FOLD_REVIEW_STATES } from './eye-fold-review.mjs';
import {
  EYELID_CONTOUR_SIDES,
  EYELID_CONTOUR_PARTS,
  EYELID_CONTOUR_STATES,
} from './eyelid-contour-human-review.mjs';
import { EAR_DETAIL_SIDES, EAR_DETAIL_STATES } from './ear-detail-review.mjs';

export const FR294_HUMAN_EVIDENCE_VERSION = 'local-fr294-human-evidence-readiness@0.1.0';

const REFERENCE_TARGETS = Object.freeze([
  ['forehead.visible_width_shape', 'new_image_model', 'no_dedicated_human_review'],
  ['forehead.visible_hairline_boundary', 'new_image_model', 'no_dedicated_human_review'],
  ['eyebrow.visible_hair_density_texture', 'new_image_model', 'no_dedicated_human_review'],
  ['eye.eyelid_crease_or_hooded_category', 'new_image_model', 'eye_fold_and_lid_contour'],
  ['mouth.visible_lip_color', 'new_image_model', 'no_dedicated_human_review'],
  ['ear.visible_boundary_height_shape', 'ear_visibility_then_image_model', 'ear_outline_review'],
]);
const ALLOWED_MODES = new Set(REFERENCE_TARGETS.map((x) => x[2]));
const ALLOWED_EAR_STATES = new Set(EAR_DETAIL_STATES);
const ALLOWED_EYE_STATES = new Set(EYE_FOLD_REVIEW_STATES);
const ALLOWED_CONTOUR_STATES = new Set(EYELID_CONTOUR_STATES);
const isRecord = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
function invalid() {
  throw Error('FR294_HUMAN_EVIDENCE_INVALID');
}
function onlyKnownKeys(records, references) {
  return isRecord(records) && Object.keys(records).every((ref) => references.has(ref));
}
function assertNoPromotedFlags(review) {
  if (
    review.humanReviewed !== true ||
    review.independentAccuracyValidated !== false ||
    review.canonicalF0Admitted === true ||
    review.traditionalBindingAuthorized === true ||
    review.productInterpretationAuthorized === true ||
    review.modelTrainingAuthorized === true
  )
    invalid();
}
function assertFoldReview(v) {
  assertNoPromotedFlags(v);
  if (!ALLOWED_EYE_STATES.has(v.imageLeft) || !ALLOWED_EYE_STATES.has(v.imageRight)) invalid();
}
function assertEyelidReview(v) {
  assertNoPromotedFlags(v);
  if (
    v.actualAnatomicalContourValidated !== false ||
    v.anatomicalLateralityAssigned !== false ||
    v.eyelidProjectionMeasured !== false ||
    v.canonicalF0Admitted !== false
  )
    invalid();
  for (const side of EYELID_CONTOUR_SIDES) {
    if (!isRecord(v[side])) invalid();
    for (const part of EYELID_CONTOUR_PARTS) {
      const segment = v[side][part];
      if (
        !isRecord(segment) ||
        !ALLOWED_CONTOUR_STATES.has(segment.status) ||
        !Array.isArray(segment.segments) ||
        ['marked', 'partial'].includes(segment.status) !== segment.segments.length > 0
      )
        invalid();
    }
  }
}
function assertEarReview(v, role) {
  assertNoPromotedFlags(v);
  if (
    v.viewRole !== role ||
    v.earProjectionMeasured !== false ||
    v.earThicknessMeasured !== false ||
    v.canonicalF0Admitted !== false
  )
    invalid();
  for (const side of EAR_DETAIL_SIDES) {
    if (!isRecord(v[side]) || !isRecord(v[side].outerRim)) invalid();
    const outer = v[side].outerRim;
    if (
      !ALLOWED_EAR_STATES.has(outer.status) ||
      !Array.isArray(outer.segments) ||
      ['marked', 'partial'].includes(outer.status) !== outer.segments.length > 0
    )
      invalid();
  }
}

export function traceFr294HumanEvidenceReadiness(
  gapReport,
  captures,
  foldReviews = {},
  eyelidReviews = {},
  earReviews = {},
  reviewState = {},
) {
  if (
    !isRecord(gapReport) ||
    gapReport.schemaVersion !== 'local-fr294-per-photo-gap-bridge@0.1.0' ||
    gapReport.canonicalObservationAdmitted !== false ||
    gapReport.independentAccuracyValidated !== false ||
    gapReport.canonicalHardGapCount !== 11 ||
    !isRecord(gapReport.captures) ||
    !Array.isArray(captures) ||
    captures.length !== gapReport.captureCount ||
    !onlyKnownKeys(foldReviews, new Set(captures.map((c) => c.captureRef))) ||
    !onlyKnownKeys(eyelidReviews, new Set(captures.map((c) => c.captureRef))) ||
    !onlyKnownKeys(earReviews, new Set(captures.map((c) => c.captureRef))) ||
    !isRecord(reviewState)
  )
    invalid();
  const known = new Set(captures.map((c) => c.captureRef));
  if (
    known.size !== captures.length ||
    captures.some(
      (c) =>
        !/^[a-zA-Z0-9_-]{1,80}$/.test(c.captureRef) ||
        !['frontal', 'profile'].includes(c.viewRole) ||
        !Array.isArray(gapReport.captures[c.captureRef]) ||
        gapReport.captures[c.captureRef].length !== 11,
    )
  )
    invalid();
  for (const key of ['eyeFold', 'eyelidContour', 'ear']) {
    const record = reviewState[key];
    if (
      !isRecord(record) ||
      typeof record.restoreFailed !== 'boolean' ||
      !Number.isInteger(record.staleCount) ||
      record.staleCount < 0
    )
      invalid();
  }
  if (Object.values(reviewState).some((value) => value.restoreFailed || value.staleCount > 0))
    return Object.freeze({
      schemaVersion: FR294_HUMAN_EVIDENCE_VERSION,
      status: 'withheld',
      reason: 'HUMAN_REVIEW_STORE_STALE_OR_RESTORE_FAILED',
      independentHumanReferenceValidated: false,
      repeatCaptureAgreementValidated: false,
      canonicalObservationAdmitted: false,
    });
  const result = {};
  const featureCounts = Object.fromEntries(
    REFERENCE_TARGETS.map(([key]) => [
      key,
      { reviewRecordedPhotos: 0, visibleAnnotationPhotos: 0 },
    ]),
  );
  for (const capture of captures) {
    const ref = capture.captureRef;
    const existingGaps = new Map(gapReport.captures[ref].map((g) => [g.featureKey, g]));
    const fold = foldReviews[ref];
    const lid = eyelidReviews[ref];
    const ear = earReviews[ref];
    if ((fold && capture.viewRole !== 'frontal') || (lid && capture.viewRole !== 'frontal'))
      invalid();
    if (fold) assertFoldReview(fold);
    if (lid) assertEyelidReview(lid);
    if (ear) assertEarReview(ear, capture.viewRole);
    const features = [];
    for (const [key, lane, kind] of REFERENCE_TARGETS) {
      const gap = existingGaps.get(key);
      if (
        !gap ||
        gap.lane !== lane ||
        !ALLOWED_MODES.has(kind) ||
        gap.canonicalMaterializationAllowedNow !== false
      )
        invalid();
      const recorded =
        kind === 'eye_fold_and_lid_contour'
          ? Boolean(fold || lid)
          : kind === 'ear_outline_review'
            ? Boolean(ear)
            : false;
      const visible =
        kind === 'eye_fold_and_lid_contour'
          ? Boolean(
              lid &&
              EYELID_CONTOUR_SIDES.some((side) =>
                EYELID_CONTOUR_PARTS.some((part) =>
                  ['marked', 'partial'].includes(lid[side][part].status),
                ),
              ),
            )
          : kind === 'ear_outline_review'
            ? Boolean(
                ear &&
                EAR_DETAIL_SIDES.some((side) =>
                  ['marked', 'partial'].includes(ear[side].outerRim.status),
                ),
              )
            : false;
      if (recorded) featureCounts[key].reviewRecordedPhotos++;
      if (visible) featureCounts[key].visibleAnnotationPhotos++;
      features.push(
        Object.freeze({
          featureKey: key,
          lane,
          reviewPath: kind,
          recordedHumanReview: recorded,
          visibleSingleReviewerAnnotation: visible,
          qualitativeEyeFoldReviewed: kind === 'eye_fold_and_lid_contour' && Boolean(fold),
          eyelidContourReviewed: kind === 'eye_fold_and_lid_contour' && Boolean(lid),
          earOutlineReviewed: kind === 'ear_outline_review' && Boolean(ear),
          independentHumanReferenceValidated: false,
          repeatCaptureAgreementValidated: false,
          canonicalObservationAdmitted: false,
        }),
      );
    }
    result[ref] = Object.freeze(features);
  }
  return Object.freeze({
    schemaVersion: FR294_HUMAN_EVIDENCE_VERSION,
    status: 'available',
    captureCount: captures.length,
    sourceHumanReviewRecords: Object.freeze({
      eyeFold: Object.keys(foldReviews).length,
      eyelidContour: Object.keys(eyelidReviews).length,
      ear: Object.keys(earReviews).length,
    }),
    featureCounts: Object.freeze(
      Object.fromEntries(
        Object.entries(featureCounts).map(([key, value]) => [key, Object.freeze(value)]),
      ),
    ),
    independentHumanReferenceValidated: false,
    repeatCaptureAgreementValidated: false,
    canonicalObservationAdmitted: false,
    captures: Object.freeze(result),
  });
}
