// Research-only independent human annotations. No canonical F0 or traditional claims.
export const EAR_DETAIL_REVIEW_SCHEMA_VERSION = 'myeongha-ear-detail-human-review-v1';
export const EAR_DETAIL_STATES = Object.freeze([
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
]);
export const EAR_DETAIL_CONTOURS = Object.freeze(['outerRim', 'lobe']);
export const EAR_DETAIL_SIDES = Object.freeze(['imageLeft', 'imageRight']);
const REF = /^capture-[0-9]{2,}$/;
const SHA = /^[a-f0-9]{64}$/;
const MAX_LINES = 12;
const MAX_POINTS_PER_LINE = 400;
const MAX_TOTAL_POINTS_PER_CONTOUR = 1800;
const allowedKeys = (value, keys) =>
  isObject(value) &&
  Object.keys(value).length === keys.length &&
  keys.every((key) => Object.hasOwn(value, key));
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
function invalid() {
  throw Error('EAR_DETAIL_REVIEW_INVALID');
}

function validPoint(p) {
  return (
    Array.isArray(p) &&
    p.length === 2 &&
    p.every((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1)
  );
}
function validateContour(value) {
  if (
    !allowedKeys(value, ['status', 'segments']) ||
    !EAR_DETAIL_STATES.includes(value.status) ||
    !Array.isArray(value.segments) ||
    value.segments.length > MAX_LINES
  )
    invalid();
  const hasLines = value.status === 'marked' || value.status === 'partial';
  if (hasLines !== value.segments.length > 0) invalid();
  let points = 0;
  for (const line of value.segments) {
    if (
      !Array.isArray(line) ||
      line.length < 2 ||
      line.length > MAX_POINTS_PER_LINE ||
      !line.every(validPoint)
    )
      invalid();
    points += line.length;
  }
  if (points > MAX_TOTAL_POINTS_PER_CONTOUR) invalid();
  return value;
}
function validateAttachment(value) {
  if (
    !allowedKeys(value, ['status', 'point']) ||
    !EAR_DETAIL_STATES.includes(value.status) ||
    value.status === 'partial' ||
    (value.status === 'marked' ? !validPoint(value.point) : value.point !== null)
  )
    invalid();
  return value;
}
function validateSide(side) {
  if (!allowedKeys(side, ['outerRim', 'lobe', 'attachment'])) invalid();
  validateContour(side.outerRim);
  validateContour(side.lobe);
  validateAttachment(side.attachment);
  return side;
}
function assertRecord(value, captureRef) {
  const keys = [
    'schemaVersion',
    'captureRef',
    'sourceSha256',
    'viewRole',
    'coordinateFrame',
    ...EAR_DETAIL_SIDES,
    'humanReviewed',
    'independentAccuracyValidated',
    'canonicalF0Admitted',
    'traditionalBindingAuthorized',
    'productInterpretationAuthorized',
    'modelTrainingAuthorized',
    'earProjectionMeasured',
    'earThicknessMeasured',
    'revision',
    'reviewedAt',
  ];
  if (
    !allowedKeys(value, keys) ||
    value.schemaVersion !== EAR_DETAIL_REVIEW_SCHEMA_VERSION ||
    !REF.test(value.captureRef || '') ||
    value.captureRef !== captureRef ||
    !SHA.test(value.sourceSha256 || '') ||
    !['frontal', 'profile'].includes(value.viewRole) ||
    value.coordinateFrame !== 'normalized_original_image_screen_sides' ||
    value.humanReviewed !== true ||
    value.independentAccuracyValidated !== false ||
    value.canonicalF0Admitted !== false ||
    value.traditionalBindingAuthorized !== false ||
    value.productInterpretationAuthorized !== false ||
    value.modelTrainingAuthorized !== false ||
    value.earProjectionMeasured !== false ||
    value.earThicknessMeasured !== false ||
    !Number.isInteger(value.revision) ||
    value.revision < 1 ||
    typeof value.reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(value.reviewedAt))
  )
    invalid();
  for (const side of EAR_DETAIL_SIDES) validateSide(value[side]);
  return value;
}
function frozenContour(value) {
  return Object.freeze({
    status: value.status,
    segments: Object.freeze(
      value.segments.map((line) => Object.freeze(line.map((p) => Object.freeze([...p])))),
    ),
  });
}
function frozenSide(value) {
  return Object.freeze({
    outerRim: frozenContour(value.outerRim),
    lobe: frozenContour(value.lobe),
    attachment: Object.freeze({
      status: value.attachment.status,
      point: value.attachment.point === null ? null : Object.freeze([...value.attachment.point]),
    }),
  });
}

export function createEarDetailReviewRecord(
  input,
  { captureRef, sourceSha256, viewRole, revision, reviewedAt } = {},
) {
  if (
    !allowedKeys(input, [...EAR_DETAIL_SIDES]) ||
    !REF.test(captureRef || '') ||
    !SHA.test(sourceSha256 || '') ||
    !['frontal', 'profile'].includes(viewRole) ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    typeof reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(reviewedAt))
  )
    invalid();
  for (const side of EAR_DETAIL_SIDES) validateSide(input[side]);
  const record = Object.freeze({
    schemaVersion: EAR_DETAIL_REVIEW_SCHEMA_VERSION,
    captureRef,
    sourceSha256,
    viewRole,
    coordinateFrame: 'normalized_original_image_screen_sides',
    imageLeft: frozenSide(input.imageLeft),
    imageRight: frozenSide(input.imageRight),
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    earProjectionMeasured: false,
    earThicknessMeasured: false,
    revision,
    reviewedAt,
  });
  return assertRecord(record, captureRef);
}
export function validateEarDetailReviewStore(store, availableRecords) {
  if (
    !allowedKeys(store, ['schemaVersion', 'records']) ||
    store.schemaVersion !== EAR_DETAIL_REVIEW_SCHEMA_VERSION ||
    !isObject(store.records) ||
    !Array.isArray(availableRecords) ||
    availableRecords.some(
      (r) => !REF.test(r?.captureRef || '') || !['frontal', 'profile'].includes(r?.viewRole),
    ) ||
    new Set(availableRecords.map((r) => r.captureRef)).size !== availableRecords.length
  )
    throw Error('EAR_DETAIL_REVIEW_STORE_INVALID');
  const permitted = new Map(availableRecords.map((r) => [r.captureRef, r.viewRole]));
  const records = {};
  for (const [captureRef, value] of Object.entries(store.records)) {
    if (!permitted.has(captureRef)) throw Error('EAR_DETAIL_REVIEW_STORE_INVALID');
    try {
      assertRecord(value, captureRef);
    } catch {
      throw Error('EAR_DETAIL_REVIEW_STORE_INVALID');
    }
    if (value.viewRole !== permitted.get(captureRef))
      throw Error('EAR_DETAIL_REVIEW_STORE_INVALID');
    records[captureRef] = value;
  }
  return Object.freeze({
    schemaVersion: EAR_DETAIL_REVIEW_SCHEMA_VERSION,
    records: Object.freeze(records),
  });
}
export function projectEarDetailReviewForUi(record) {
  assertRecord(record, record?.captureRef);
  // Keep only the local screen’s research annotations; never return a biometric source hash/path.
  return Object.freeze({
    viewRole: record.viewRole,
    imageLeft: record.imageLeft,
    imageRight: record.imageRight,
    revision: record.revision,
    reviewedAt: record.reviewedAt,
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    earProjectionMeasured: false,
    earThicknessMeasured: false,
  });
}
