export const EYE_FOLD_REVIEW_SCHEMA_VERSION = 'myeongha-eye-fold-human-review-v1';

export const EYE_FOLD_REVIEW_STATES = Object.freeze([
  'visible',
  'hooded',
  'no_visible_crease',
  'partial',
  'occluded',
  'out_of_frame',
  'unknown',
]);

const CAPTURE_REF = /^capture-[0-9]{2,}$/;
const SOURCE_SHA256 = /^[a-f0-9]{64}$/;

function invalid() {
  throw Error('EYE_FOLD_REVIEW_INVALID');
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertReviewRecord(record, expectedCaptureRef) {
  const keys = [
    'schemaVersion',
    'captureRef',
    'sourceSha256',
    'imageLeft',
    'imageRight',
    'coordinateFrame',
    'humanReviewed',
    'independentAccuracyValidated',
    'canonicalF0Admitted',
    'traditionalBindingAuthorized',
    'productInterpretationAuthorized',
    'modelTrainingAuthorized',
    'revision',
    'reviewedAt',
  ];
  if (
    !isRecord(record) ||
    Object.keys(record).length !== keys.length ||
    keys.some((key) => !Object.hasOwn(record, key)) ||
    record.schemaVersion !== EYE_FOLD_REVIEW_SCHEMA_VERSION ||
    !CAPTURE_REF.test(record.captureRef || '') ||
    record.captureRef !== expectedCaptureRef ||
    !SOURCE_SHA256.test(record.sourceSha256 || '') ||
    !EYE_FOLD_REVIEW_STATES.includes(record.imageLeft) ||
    !EYE_FOLD_REVIEW_STATES.includes(record.imageRight) ||
    record.coordinateFrame !== 'image_left_right_not_anatomical_laterality' ||
    record.humanReviewed !== true ||
    record.independentAccuracyValidated !== false ||
    record.canonicalF0Admitted !== false ||
    record.traditionalBindingAuthorized !== false ||
    record.productInterpretationAuthorized !== false ||
    record.modelTrainingAuthorized !== false ||
    !Number.isInteger(record.revision) ||
    record.revision < 1 ||
    typeof record.reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(record.reviewedAt))
  )
    invalid();
  return record;
}

export function createEyeFoldReviewRecord(
  input,
  { captureRef, sourceSha256, revision, reviewedAt } = {},
) {
  if (
    !isRecord(input) ||
    Object.keys(input).length !== 2 ||
    !Object.hasOwn(input, 'imageLeft') ||
    !Object.hasOwn(input, 'imageRight') ||
    !CAPTURE_REF.test(captureRef || '') ||
    !SOURCE_SHA256.test(sourceSha256 || '') ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    typeof reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(reviewedAt))
  )
    invalid();

  const record = Object.freeze({
    schemaVersion: EYE_FOLD_REVIEW_SCHEMA_VERSION,
    captureRef,
    sourceSha256: sourceSha256.toLowerCase(),
    imageLeft: input.imageLeft,
    imageRight: input.imageRight,
    coordinateFrame: 'image_left_right_not_anatomical_laterality',
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    revision,
    reviewedAt,
  });
  assertReviewRecord(record, captureRef);
  return record;
}

export function validateEyeFoldReviewStore(store, knownCaptureRefs) {
  if (
    !isRecord(store) ||
    store.schemaVersion !== EYE_FOLD_REVIEW_SCHEMA_VERSION ||
    !isRecord(store.records) ||
    !Array.isArray(knownCaptureRefs) ||
    new Set(knownCaptureRefs).size !== knownCaptureRefs.length
  )
    throw Error('EYE_FOLD_REVIEW_STORE_INVALID');

  const records = {};
  for (const [captureRef, record] of Object.entries(store.records)) {
    if (!knownCaptureRefs.includes(captureRef)) throw Error('EYE_FOLD_REVIEW_STORE_INVALID');
    try {
      assertReviewRecord(record, captureRef);
    } catch {
      throw Error('EYE_FOLD_REVIEW_STORE_INVALID');
    }
    records[captureRef] = record;
  }
  return Object.freeze({
    schemaVersion: EYE_FOLD_REVIEW_SCHEMA_VERSION,
    records: Object.freeze(records),
  });
}

export function projectEyeFoldReviewForUi(record) {
  assertReviewRecord(record, record?.captureRef);
  return Object.freeze({
    imageLeft: record.imageLeft,
    imageRight: record.imageRight,
    humanReviewed: true,
    independentAccuracyValidated: false,
    modelTrainingAuthorized: false,
    revision: record.revision,
    reviewedAt: record.reviewedAt,
  });
}
