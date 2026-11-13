export const BROW_CENTERLINE_REVIEW_SCHEMA_VERSION = 'myeongha-brow-centerline-human-review-v1';

export const BROW_CENTERLINE_REVIEW_STATES = Object.freeze([
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'no_visible_brow',
  'unknown',
]);

const CAPTURE_REF = /^capture-[0-9]{2,}$/;
const SOURCE_SHA256 = /^[a-f0-9]{64}$/;
const MAX_SEGMENTS_PER_SIDE = 24;
const MAX_VERTICES_PER_SEGMENT = 1200;
const MAX_TOTAL_VERTICES = 10000;

function invalid() {
  throw Error('BROW_CENTERLINE_REVIEW_INVALID');
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateSide(side) {
  if (
    !isRecord(side) ||
    Object.keys(side).length !== 2 ||
    !Object.hasOwn(side, 'status') ||
    !Object.hasOwn(side, 'segments') ||
    !BROW_CENTERLINE_REVIEW_STATES.includes(side.status) ||
    !Array.isArray(side.segments) ||
    side.segments.length > MAX_SEGMENTS_PER_SIDE
  )
    invalid();

  let vertices = 0;
  for (const segment of side.segments) {
    if (!Array.isArray(segment) || segment.length < 2 || segment.length > MAX_VERTICES_PER_SEGMENT)
      invalid();
    for (const point of segment) {
      if (
        !Array.isArray(point) ||
        point.length !== 2 ||
        point.some((value) => typeof value !== 'number' || !Number.isFinite(value)) ||
        point[0] < 0 ||
        point[0] > 1 ||
        point[1] < 0 ||
        point[1] > 1
      )
        invalid();
      vertices++;
    }
  }
  if (vertices > MAX_TOTAL_VERTICES) invalid();

  const visible = side.status === 'marked' || side.status === 'partial';
  if (visible !== side.segments.length > 0) invalid();
  return side;
}

function assertReviewRecord(record, expectedCaptureRef) {
  const keys = [
    'schemaVersion',
    'captureRef',
    'sourceSha256',
    'coordinateFrame',
    'imageLeft',
    'imageRight',
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
    record.schemaVersion !== BROW_CENTERLINE_REVIEW_SCHEMA_VERSION ||
    !CAPTURE_REF.test(record.captureRef || '') ||
    record.captureRef !== expectedCaptureRef ||
    !SOURCE_SHA256.test(record.sourceSha256 || '') ||
    record.coordinateFrame !== 'normalized_image_coordinates' ||
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

  validateSide(record.imageLeft);
  validateSide(record.imageRight);
  return record;
}

export function createBrowCenterlineReviewRecord(
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
    schemaVersion: BROW_CENTERLINE_REVIEW_SCHEMA_VERSION,
    captureRef,
    sourceSha256: sourceSha256.toLowerCase(),
    coordinateFrame: 'normalized_image_coordinates',
    imageLeft: Object.freeze({
      status: input.imageLeft?.status,
      segments: Object.freeze(
        (input.imageLeft?.segments || []).map((segment) =>
          Object.freeze(segment.map((point) => Object.freeze([...point]))),
        ),
      ),
    }),
    imageRight: Object.freeze({
      status: input.imageRight?.status,
      segments: Object.freeze(
        (input.imageRight?.segments || []).map((segment) =>
          Object.freeze(segment.map((point) => Object.freeze([...point]))),
        ),
      ),
    }),
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

export function validateBrowCenterlineReviewStore(store, knownCaptureRefs) {
  if (
    !isRecord(store) ||
    store.schemaVersion !== BROW_CENTERLINE_REVIEW_SCHEMA_VERSION ||
    !isRecord(store.records) ||
    !Array.isArray(knownCaptureRefs) ||
    new Set(knownCaptureRefs).size !== knownCaptureRefs.length
  )
    throw Error('BROW_CENTERLINE_REVIEW_STORE_INVALID');

  const records = {};
  for (const [captureRef, record] of Object.entries(store.records)) {
    if (!knownCaptureRefs.includes(captureRef)) throw Error('BROW_CENTERLINE_REVIEW_STORE_INVALID');
    try {
      assertReviewRecord(record, captureRef);
    } catch {
      throw Error('BROW_CENTERLINE_REVIEW_STORE_INVALID');
    }
    records[captureRef] = record;
  }
  return Object.freeze({
    schemaVersion: BROW_CENTERLINE_REVIEW_SCHEMA_VERSION,
    records: Object.freeze(records),
  });
}

export function projectBrowCenterlineReviewForUi(record) {
  assertReviewRecord(record, record?.captureRef);
  const projectSide = (side) =>
    Object.freeze({
      status: side.status,
      segments: Object.freeze(
        side.segments.map((segment) =>
          Object.freeze(segment.map((point) => Object.freeze([...point]))),
        ),
      ),
    });
  return Object.freeze({
    imageLeft: projectSide(record.imageLeft),
    imageRight: projectSide(record.imageRight),
    humanReviewed: true,
    independentAccuracyValidated: false,
    modelTrainingAuthorized: false,
    revision: record.revision,
    reviewedAt: record.reviewedAt,
  });
}
