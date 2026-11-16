export const NOSE_DETAIL_REVIEW_SCHEMA_VERSION = 'myeongha-nose-detail-human-review-v1';

export const NOSE_CONTOUR_PARTS = Object.freeze([
  'imageLeftAlar',
  'imageRightAlar',
  'imageLeftNostril',
  'imageRightNostril',
]);
export const NOSE_REVIEW_STATES = Object.freeze([
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
]);
const CAPTURE_REF = /^capture-[0-9]{2,}$/;
const SHA = /^[a-f0-9]{64}$/;

function invalid() {
  throw Error('NOSE_DETAIL_REVIEW_INVALID');
}
function object(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
function point(value) {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1)
  );
}
function validateContour(value) {
  if (
    !object(value) ||
    Object.keys(value).length !== 2 ||
    !Object.hasOwn(value, 'status') ||
    !Object.hasOwn(value, 'segments') ||
    !NOSE_REVIEW_STATES.includes(value.status) ||
    !Array.isArray(value.segments) ||
    value.segments.length > 12
  )
    invalid();
  const hasLine = value.status === 'marked' || value.status === 'partial';
  if (hasLine !== value.segments.length > 0) invalid();
  let vertices = 0;
  for (const line of value.segments) {
    if (!Array.isArray(line) || line.length < 2 || line.length > 400) invalid();
    if (!line.every(point)) invalid();
    vertices += line.length;
  }
  if (vertices > 1800) invalid();
  return value;
}
function validateTip(value) {
  if (
    !object(value) ||
    Object.keys(value).length !== 2 ||
    !Object.hasOwn(value, 'status') ||
    !Object.hasOwn(value, 'point') ||
    !NOSE_REVIEW_STATES.includes(value.status) ||
    value.status === 'partial' ||
    (value.status === 'marked' ? !point(value.point) : value.point !== null)
  )
    invalid();
  return value;
}
function assertRecord(record, ref) {
  const keys = [
    'schemaVersion',
    'captureRef',
    'sourceSha256',
    'coordinateFrame',
    'tip',
    ...NOSE_CONTOUR_PARTS,
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
    !object(record) ||
    Object.keys(record).length !== keys.length ||
    keys.some((k) => !Object.hasOwn(record, k)) ||
    record.schemaVersion !== NOSE_DETAIL_REVIEW_SCHEMA_VERSION ||
    !CAPTURE_REF.test(record.captureRef || '') ||
    record.captureRef !== ref ||
    !SHA.test(record.sourceSha256 || '') ||
    record.coordinateFrame !== 'normalized_image_coordinates_not_anatomical_laterality' ||
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
  validateTip(record.tip);
  for (const key of NOSE_CONTOUR_PARTS) validateContour(record[key]);
  return record;
}
export function createNoseDetailReviewRecord(
  input,
  { captureRef, sourceSha256, revision, reviewedAt } = {},
) {
  if (
    !object(input) ||
    Object.keys(input).length !== 1 + NOSE_CONTOUR_PARTS.length ||
    !Object.hasOwn(input, 'tip') ||
    NOSE_CONTOUR_PARTS.some((key) => !Object.hasOwn(input, key)) ||
    !CAPTURE_REF.test(captureRef || '') ||
    !SHA.test(sourceSha256 || '') ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    typeof reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(reviewedAt))
  )
    invalid();
  validateTip(input.tip);
  for (const key of NOSE_CONTOUR_PARTS) validateContour(input[key]);
  const contours = Object.fromEntries(
    NOSE_CONTOUR_PARTS.map((key) => [
      key,
      Object.freeze({
        status: input[key].status,
        segments: Object.freeze(
          input[key].segments.map((line) => Object.freeze(line.map((p) => Object.freeze([...p])))),
        ),
      }),
    ]),
  );
  const record = Object.freeze({
    schemaVersion: NOSE_DETAIL_REVIEW_SCHEMA_VERSION,
    captureRef,
    sourceSha256,
    coordinateFrame: 'normalized_image_coordinates_not_anatomical_laterality',
    tip: Object.freeze({
      status: input.tip.status,
      point: input.tip.point === null ? null : Object.freeze([...input.tip.point]),
    }),
    ...contours,
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    revision,
    reviewedAt,
  });
  return assertRecord(record, captureRef);
}
export function validateNoseDetailReviewStore(store, knownRefs) {
  if (
    !object(store) ||
    Object.keys(store).length !== 2 ||
    store.schemaVersion !== NOSE_DETAIL_REVIEW_SCHEMA_VERSION ||
    !object(store.records) ||
    !Array.isArray(knownRefs) ||
    new Set(knownRefs).size !== knownRefs.length
  )
    throw Error('NOSE_DETAIL_REVIEW_STORE_INVALID');
  const records = {};
  for (const [ref, record] of Object.entries(store.records)) {
    if (!knownRefs.includes(ref)) throw Error('NOSE_DETAIL_REVIEW_STORE_INVALID');
    try {
      records[ref] = assertRecord(record, ref);
    } catch {
      throw Error('NOSE_DETAIL_REVIEW_STORE_INVALID');
    }
  }
  return Object.freeze({
    schemaVersion: NOSE_DETAIL_REVIEW_SCHEMA_VERSION,
    records: Object.freeze(records),
  });
}
export function projectNoseDetailReviewForUi(record) {
  assertRecord(record, record?.captureRef);
  return Object.freeze({
    tip: record.tip,
    ...Object.fromEntries(NOSE_CONTOUR_PARTS.map((key) => [key, record[key]])),
    revision: record.revision,
    reviewedAt: record.reviewedAt,
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
  });
}
