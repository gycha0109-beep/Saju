// Research-only comparison of two previously verified, non-authoritative
// ledgers. Screened model classes are NOT anatomical visibility or truth.
export const FR294_QUALITY_HUMAN_CROSSCHECK_VERSION = 'local-fr294-quality-human-crosscheck@0.1.0';

const PATHS = Object.freeze({
  'forehead.visible_width_shape': 'no_dedicated_human_review',
  'forehead.visible_hairline_boundary': 'no_dedicated_human_review',
  'eyebrow.visible_hair_density_texture': 'no_dedicated_human_review',
  'eye.eyelid_crease_or_hooded_category': 'eye_fold_and_lid_contour',
  'mouth.visible_lip_color': 'no_dedicated_human_review',
  'ear.visible_boundary_height_shape': 'ear_outline_review',
});
const STATES = Object.freeze([
  'no_direct_human_review_path',
  'review_pending_model_screened',
  'review_pending_model_not_screened',
  'single_review_model_screened',
  'single_review_model_not_screened',
]);
const QUALITY = new Set([
  'screened_region_proxy',
  'unscreened_region_proxy',
  'unspecific_region_proxy',
  'no_region_proxy',
  'profile_not_frontal_evidence',
  'parsing_unavailable',
]);
const REASONS = new Set([
  'parsing_not_completed',
  'frontal_view_not_available',
  'skin_class_candidate_only',
  'skin_class_not_returned',
  'hair_skin_contact_candidate_only',
  'hair_skin_contact_not_returned',
  'eye_class_candidate_only',
  'eye_class_not_returned',
  'region_class_not_returned',
  'region_screened_candidate_only',
  'region_screening_unchecked',
  'region_screening_suppressed',
]);
const MATCHES = Object.freeze({
  screened_region_proxy: ['region_screened_candidate_only'],
  unscreened_region_proxy: ['region_screening_unchecked', 'region_screening_suppressed'],
  unspecific_region_proxy: [
    'skin_class_candidate_only',
    'hair_skin_contact_candidate_only',
    'eye_class_candidate_only',
  ],
  no_region_proxy: [
    'skin_class_not_returned',
    'hair_skin_contact_not_returned',
    'eye_class_not_returned',
    'region_class_not_returned',
  ],
  profile_not_frontal_evidence: ['frontal_view_not_available'],
  parsing_unavailable: ['parsing_not_completed'],
});
const obj = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
function fail() {
  throw Error('FR294_QUALITY_HUMAN_CROSSCHECK_INVALID');
}

export function crosscheckFr294QualityAndHumanReview(quality, human) {
  if (
    !obj(quality) ||
    quality.schemaVersion !== 'local-fr294-parsing-region-quality@0.2.0' ||
    quality.modelRegionScreeningOnly !== true ||
    quality.anatomicalFeatureVisibilityVerified !== false ||
    quality.independentAccuracyValidated !== false ||
    quality.canonicalF0Admitted !== false ||
    quality.productInterpretationAuthorized !== false ||
    quality.mappedFeatureCount !== 6 ||
    !Number.isInteger(quality.captureCount) ||
    quality.captureCount < 1 ||
    !obj(quality.captures) ||
    !obj(human) ||
    human.schemaVersion !== 'local-fr294-human-evidence-readiness@0.1.0' ||
    human.status !== 'available' ||
    human.captureCount !== quality.captureCount ||
    human.independentHumanReferenceValidated !== false ||
    human.repeatCaptureAgreementValidated !== false ||
    human.canonicalObservationAdmitted !== false ||
    !obj(human.captures)
  )
    fail();

  const keys = Object.keys(PATHS);
  const refs = Object.keys(quality.captures);
  if (
    refs.length !== quality.captureCount ||
    Object.keys(human.captures).length !== refs.length ||
    refs.some((ref) => !/^[a-zA-Z0-9_-]{1,80}$/.test(ref) || !Object.hasOwn(human.captures, ref))
  )
    fail();

  const summary = Object.fromEntries(
    keys.map((key) => [key, Object.fromEntries(STATES.map((state) => [state, 0]))]),
  );
  const captures = {};
  for (const ref of refs) {
    const qs = quality.captures[ref],
      hs = human.captures[ref];
    if (
      !Array.isArray(qs) ||
      qs.length !== 6 ||
      !Array.isArray(hs) ||
      hs.length !== 6 ||
      new Set(qs.map((row) => row.featureKey)).size !== 6 ||
      new Set(hs.map((row) => row.featureKey)).size !== 6
    )
      fail();
    const byQuality = new Map(qs.map((row) => [row.featureKey, row]));
    const byHuman = new Map(hs.map((row) => [row.featureKey, row]));
    const rows = [];
    for (const key of keys) {
      const q = byQuality.get(key),
        h = byHuman.get(key);
      if (
        !obj(q) ||
        !obj(h) ||
        h.reviewPath !== PATHS[key] ||
        h.independentHumanReferenceValidated !== false ||
        h.repeatCaptureAgreementValidated !== false ||
        h.canonicalObservationAdmitted !== false ||
        q.anatomicalFeatureVisibilityVerified !== false ||
        q.independentHumanReferenceValidated !== false ||
        q.canonicalF0Admitted !== false ||
        !QUALITY.has(q.modelRegionScreening) ||
        !REASONS.has(q.modelRegionEvidence) ||
        !MATCHES[q.modelRegionScreening].includes(q.modelRegionEvidence) ||
        typeof h.recordedHumanReview !== 'boolean' ||
        typeof h.visibleSingleReviewerAnnotation !== 'boolean' ||
        (h.visibleSingleReviewerAnnotation && !h.recordedHumanReview) ||
        (PATHS[key] === 'no_dedicated_human_review' &&
          (h.recordedHumanReview || h.visibleSingleReviewerAnnotation))
      )
        fail();

      const screened = q.modelRegionScreening === 'screened_region_proxy';
      const status =
        PATHS[key] === 'no_dedicated_human_review'
          ? 'no_direct_human_review_path'
          : h.recordedHumanReview
            ? screened
              ? 'single_review_model_screened'
              : 'single_review_model_not_screened'
            : screened
              ? 'review_pending_model_screened'
              : 'review_pending_model_not_screened';
      summary[key][status]++;
      rows.push(
        Object.freeze({
          featureKey: key,
          jointEvidenceStatus: status,
          modelRegionScreening: q.modelRegionScreening,
          modelRegionEvidence: q.modelRegionEvidence,
          singleHumanReviewRecorded: h.recordedHumanReview,
          visibleSingleReviewerAnnotation: h.visibleSingleReviewerAnnotation,
          independentHumanReferenceValidated: false,
          modelHumanAgreementValidated: false,
          anatomicalFeatureVisibilityVerified: false,
          canonicalF0Admitted: false,
          traditionalBindingAuthorized: false,
          productInterpretationAuthorized: false,
        }),
      );
    }
    captures[ref] = Object.freeze(rows);
  }
  if (
    Object.values(summary).some(
      (byStatus) => Object.values(byStatus).reduce((n, count) => n + count, 0) !== refs.length,
    )
  )
    fail();
  return Object.freeze({
    schemaVersion: FR294_QUALITY_HUMAN_CROSSCHECK_VERSION,
    status: 'available',
    captureCount: refs.length,
    mappedFeatureCount: 6,
    summary: Object.freeze(summary),
    captures: Object.freeze(captures),
    modelHumanAgreementValidated: false,
    independentHumanReferenceValidated: false,
    anatomicalFeatureVisibilityVerified: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
}

export function withheldFr294QualityHumanCrosscheck(reason) {
  if (
    ![
      'MODEL_QUALITY_UNAVAILABLE',
      'HUMAN_REVIEW_UNAVAILABLE',
      'SOURCE_EVIDENCE_MISMATCH',
      'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED',
    ].includes(reason)
  )
    fail();
  return Object.freeze({
    schemaVersion: FR294_QUALITY_HUMAN_CROSSCHECK_VERSION,
    status: 'withheld',
    reason,
    modelHumanAgreementValidated: false,
    independentHumanReferenceValidated: false,
    anatomicalFeatureVisibilityVerified: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
}
