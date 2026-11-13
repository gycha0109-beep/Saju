export const CAPTURE_SCREEN_REVIEW_VERSION = 'research.capture-screen-human-review@0.1.0';
export const CAPTURE_SCREEN_POSES = Object.freeze([
  'frontal_usable_candidate',
  'not_frontal',
  'uncertain',
]);
export const CAPTURE_SCREEN_VISIBILITY = Object.freeze([
  'clear_enough_to_review',
  'partially_occluded',
  'unusable',
]);
const REF = /^capture-[0-9]{2,}$/;
const SHA = /^[a-f0-9]{64}$/;
const exact = (v, fields) =>
  v !== null &&
  typeof v === 'object' &&
  !Array.isArray(v) &&
  Object.keys(v).length === fields.length &&
  fields.every((k) => Object.hasOwn(v, k));
const fail = () => {
  throw Error('CAPTURE_SCREEN_REVIEW_INVALID');
};
const FIELDS = [
  'schemaVersion',
  'captureRef',
  'sourceSha256',
  'pose',
  'visibility',
  'humanReviewed',
  'reviewerCount',
  'independentPoseValidated',
  'independentlyVerifiedAnatomy',
  'comparisonAccuracyValidated',
  'canonicalF0Admitted',
  'traditionalBindingAuthorized',
  'productInterpretationAuthorized',
  'modelTrainingAuthorized',
  'revision',
  'reviewedAt',
];
function validateRecord(r, ref) {
  if (
    !exact(r, FIELDS) ||
    r.schemaVersion !== CAPTURE_SCREEN_REVIEW_VERSION ||
    r.captureRef !== ref ||
    !REF.test(ref) ||
    !SHA.test(r.sourceSha256) ||
    !CAPTURE_SCREEN_POSES.includes(r.pose) ||
    !CAPTURE_SCREEN_VISIBILITY.includes(r.visibility) ||
    r.humanReviewed !== true ||
    r.reviewerCount !== 1 ||
    r.independentPoseValidated !== false ||
    r.independentlyVerifiedAnatomy !== false ||
    r.comparisonAccuracyValidated !== false ||
    r.canonicalF0Admitted !== false ||
    r.traditionalBindingAuthorized !== false ||
    r.productInterpretationAuthorized !== false ||
    r.modelTrainingAuthorized !== false ||
    !Number.isInteger(r.revision) ||
    r.revision < 1 ||
    typeof r.reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(r.reviewedAt))
  )
    fail();
  return r;
}
export function createCaptureScreenReview(input, provenance) {
  if (
    !exact(input, ['pose', 'visibility']) ||
    !CAPTURE_SCREEN_POSES.includes(input.pose) ||
    !CAPTURE_SCREEN_VISIBILITY.includes(input.visibility) ||
    !exact(provenance, ['captureRef', 'sourceSha256', 'revision', 'reviewedAt'])
  )
    fail();
  return Object.freeze(
    validateRecord(
      {
        schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
        ...provenance,
        ...input,
        humanReviewed: true,
        reviewerCount: 1,
        independentPoseValidated: false,
        independentlyVerifiedAnatomy: false,
        comparisonAccuracyValidated: false,
        canonicalF0Admitted: false,
        traditionalBindingAuthorized: false,
        productInterpretationAuthorized: false,
        modelTrainingAuthorized: false,
      },
      provenance.captureRef,
    ),
  );
}
export function validateCaptureScreenReviewStore(store, knownRefs) {
  if (
    !exact(store, ['schemaVersion', 'records']) ||
    store.schemaVersion !== CAPTURE_SCREEN_REVIEW_VERSION ||
    !Array.isArray(knownRefs) ||
    new Set(knownRefs).size !== knownRefs.length ||
    !store.records ||
    typeof store.records !== 'object' ||
    Array.isArray(store.records)
  )
    fail();
  const allowed = new Set(knownRefs),
    records = {};
  for (const [ref, r] of Object.entries(store.records)) {
    if (!allowed.has(ref)) fail();
    records[ref] = validateRecord(r, ref);
  }
  return Object.freeze({
    schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
    records: Object.freeze(records),
  });
}
export function projectCaptureScreenReview(r) {
  validateRecord(r, r?.captureRef);
  return Object.freeze({
    pose: r.pose,
    visibility: r.visibility,
    humanReviewed: true,
    reviewerCount: 1,
    independentPoseValidated: false,
    independentlyVerifiedAnatomy: false,
    comparisonAccuracyValidated: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    revision: r.revision,
    reviewedAt: r.reviewedAt,
  });
}
// Audit the existing private screening ledger without exposing photo refs,
// original SHA values or single-reviewer decisions as anatomical ground truth.
export function auditCurrentCaptureScreenReviews(store, knownRefs, currentSourceDigests) {
  const validated = validateCaptureScreenReviewStore(store, knownRefs);
  if (!(currentSourceDigests instanceof Map)) fail();
  const current = {};
  let staleSourceReviews = 0;
  for (const [ref, review] of Object.entries(validated.records)) {
    if (currentSourceDigests.get(ref) !== review.sourceSha256) {
      staleSourceReviews++;
      continue;
    }
    current[ref] = projectCaptureScreenReview(review);
  }
  return Object.freeze({
    ...summarizeCaptureScreenReviews(current, knownRefs.length),
    staleSourceReviews,
    comparisonScreeningBlocked: staleSourceReviews > 0,
    independentPoseValidated: false,
    independentAnatomicalAccuracyValidated: false,
  });
}

// Fresh research photos need explicit single-reviewer pose/visibility screening
// before a human contour can be saved. This is not independent accuracy proof.
export function canSaveScreenedBoundaryReview({
  freshResearchOnly,
  restoreFailed,
  staleCount,
  review,
}) {
  if (freshResearchOnly === false) return true; // Preserve legacy render reviews.
  return (
    freshResearchOnly === true &&
    restoreFailed === false &&
    staleCount === 0 &&
    review?.humanReviewed === true &&
    review.reviewerCount === 1 &&
    review.independentPoseValidated === false &&
    review.pose === 'frontal_usable_candidate' &&
    ['clear_enough_to_review', 'partially_occluded'].includes(review.visibility)
  );
}

export function summarizeCaptureScreenReviews(records, totalPhotos) {
  if (
    !records ||
    typeof records !== 'object' ||
    Array.isArray(records) ||
    !Number.isInteger(totalPhotos) ||
    totalPhotos < 0 ||
    Object.keys(records).length > totalPhotos
  )
    fail();
  let frontalCandidatesSingleReviewer = 0,
    uncertainOrRejectedPhotos = 0,
    partiallyOrFullyOccludedPhotos = 0;
  for (const r of Object.values(records)) {
    if (
      !r ||
      !CAPTURE_SCREEN_POSES.includes(r.pose) ||
      !CAPTURE_SCREEN_VISIBILITY.includes(r.visibility) ||
      r.humanReviewed !== true ||
      r.independentPoseValidated !== false ||
      r.independentlyVerifiedAnatomy !== false ||
      r.comparisonAccuracyValidated !== false ||
      !Number.isInteger(r.revision) ||
      r.revision < 1
    )
      fail();
    if (r.pose === 'frontal_usable_candidate' && r.visibility !== 'unusable')
      frontalCandidatesSingleReviewer++;
    else uncertainOrRejectedPhotos++;
    if (r.visibility !== 'clear_enough_to_review') partiallyOrFullyOccludedPhotos++;
  }
  return Object.freeze({
    schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
    totalPhotos,
    humanScreenedPhotos: Object.keys(records).length,
    unreviewedPhotos: totalPhotos - Object.keys(records).length,
    frontalCandidatesSingleReviewer,
    uncertainOrRejectedPhotos,
    partiallyOrFullyOccludedPhotos,
    independentPoseValidated: false,
    independentAnatomicalAccuracyValidated: false,
    automaticAnnotationPerformed: false,
    rawPhotoOrSourceHashesEmitted: false,
  });
}
