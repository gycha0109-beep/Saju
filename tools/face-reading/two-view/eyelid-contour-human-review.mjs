// Local research reference only. Existing qualitative eye-fold labels remain independent.
export const EYELID_CONTOUR_REVIEW_VERSION = 'myeongha-eyelid-contour-human-review-v1';
export const EYELID_CONTOUR_SIDES = Object.freeze(['imageLeft', 'imageRight']);
export const EYELID_CONTOUR_PARTS = Object.freeze([
  'upperLidMargin',
  'creaseLine',
  'hoodingBoundary',
]);
export const EYELID_CONTOUR_STATES = Object.freeze([
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
]);
const SHA = /^[a-f0-9]{64}$/;
const REF = /^capture-[0-9]{2,}$/;
const isRecord = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const strictKeys = (v, keys) =>
  isRecord(v) &&
  Object.keys(v).length === keys.length &&
  keys.every((key) => Object.hasOwn(v, key));
function invalid() {
  throw Error('EYELID_CONTOUR_REVIEW_INVALID');
}
function validPoint(p) {
  return (
    Array.isArray(p) &&
    p.length === 2 &&
    p.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1)
  );
}
function validPart(v) {
  if (
    !strictKeys(v, ['status', 'segments']) ||
    !EYELID_CONTOUR_STATES.includes(v.status) ||
    !Array.isArray(v.segments) ||
    v.segments.length > 12 ||
    ['marked', 'partial'].includes(v.status) !== v.segments.length > 0
  )
    invalid();
  let total = 0;
  for (const line of v.segments) {
    if (!Array.isArray(line) || line.length < 2 || line.length > 400 || !line.every(validPoint))
      invalid();
    total += line.length;
  }
  if (total > 1800) invalid();
  return v;
}
function validSide(v) {
  if (!strictKeys(v, EYELID_CONTOUR_PARTS)) invalid();
  for (const key of EYELID_CONTOUR_PARTS) validPart(v[key]);
  return v;
}
function validateRecord(v, ref) {
  const keys = [
    'schemaVersion',
    'captureRef',
    'sourceSha256',
    'coordinateFrame',
    ...EYELID_CONTOUR_SIDES,
    'humanReviewed',
    'independentAccuracyValidated',
    'actualAnatomicalContourValidated',
    'anatomicalLateralityAssigned',
    'eyelidProjectionMeasured',
    'canonicalF0Admitted',
    'traditionalBindingAuthorized',
    'productInterpretationAuthorized',
    'modelTrainingAuthorized',
    'revision',
    'reviewedAt',
  ];
  if (
    !strictKeys(v, keys) ||
    v.schemaVersion !== EYELID_CONTOUR_REVIEW_VERSION ||
    !REF.test(v.captureRef || '') ||
    v.captureRef !== ref ||
    !SHA.test(v.sourceSha256 || '') ||
    v.coordinateFrame !== 'normalized_original_image_screen_sides' ||
    v.humanReviewed !== true ||
    v.independentAccuracyValidated !== false ||
    v.actualAnatomicalContourValidated !== false ||
    v.anatomicalLateralityAssigned !== false ||
    v.eyelidProjectionMeasured !== false ||
    v.canonicalF0Admitted !== false ||
    v.traditionalBindingAuthorized !== false ||
    v.productInterpretationAuthorized !== false ||
    v.modelTrainingAuthorized !== false ||
    !Number.isInteger(v.revision) ||
    v.revision < 1 ||
    typeof v.reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(v.reviewedAt))
  )
    invalid();
  for (const side of EYELID_CONTOUR_SIDES) validSide(v[side]);
  return v;
}
function copiedPart(p) {
  return Object.freeze({
    status: p.status,
    segments: Object.freeze(
      p.segments.map((line) => Object.freeze(line.map((v) => Object.freeze([...v])))),
    ),
  });
}
function copiedSide(v) {
  return Object.freeze(
    Object.fromEntries(EYELID_CONTOUR_PARTS.map((key) => [key, copiedPart(v[key])])),
  );
}
export function createEyelidContourReviewRecord(
  input,
  { captureRef, sourceSha256, revision, reviewedAt } = {},
) {
  if (
    !strictKeys(input, EYELID_CONTOUR_SIDES) ||
    !REF.test(captureRef || '') ||
    !SHA.test(sourceSha256 || '') ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    typeof reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(reviewedAt))
  )
    invalid();
  for (const side of EYELID_CONTOUR_SIDES) validSide(input[side]);
  return validateRecord(
    Object.freeze({
      schemaVersion: EYELID_CONTOUR_REVIEW_VERSION,
      captureRef,
      sourceSha256,
      coordinateFrame: 'normalized_original_image_screen_sides',
      imageLeft: copiedSide(input.imageLeft),
      imageRight: copiedSide(input.imageRight),
      humanReviewed: true,
      independentAccuracyValidated: false,
      actualAnatomicalContourValidated: false,
      anatomicalLateralityAssigned: false,
      eyelidProjectionMeasured: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
      revision,
      reviewedAt,
    }),
    captureRef,
  );
}
export function validateEyelidContourReviewStore(store, knownRefs) {
  if (
    !strictKeys(store, ['schemaVersion', 'records']) ||
    store.schemaVersion !== EYELID_CONTOUR_REVIEW_VERSION ||
    !isRecord(store.records) ||
    !Array.isArray(knownRefs) ||
    new Set(knownRefs).size !== knownRefs.length
  )
    throw Error('EYELID_CONTOUR_STORE_INVALID');
  const records = {};
  for (const [ref, review] of Object.entries(store.records)) {
    if (!knownRefs.includes(ref)) throw Error('EYELID_CONTOUR_STORE_INVALID');
    try {
      records[ref] = validateRecord(review, ref);
    } catch {
      throw Error('EYELID_CONTOUR_STORE_INVALID');
    }
  }
  return Object.freeze({
    schemaVersion: EYELID_CONTOUR_REVIEW_VERSION,
    records: Object.freeze(records),
  });
}
export function projectEyelidContourReviewForUi(review) {
  validateRecord(review, review?.captureRef);
  return Object.freeze({
    imageLeft: review.imageLeft,
    imageRight: review.imageRight,
    humanReviewed: true,
    independentAccuracyValidated: false,
    actualAnatomicalContourValidated: false,
    anatomicalLateralityAssigned: false,
    eyelidProjectionMeasured: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    revision: review.revision,
    reviewedAt: review.reviewedAt,
  });
}
