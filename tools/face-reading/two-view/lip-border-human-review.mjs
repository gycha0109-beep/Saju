// Research-only human image-plane reference. No automatic lip morphology or F0 admission.
export const LIP_BORDER_REVIEW_SCHEMA_VERSION = 'myeongha-lip-border-human-review-v1';
export const LIP_BORDER_LINES = Object.freeze([
  'upperLipBorder',
  'lowerLipBorder',
  'philtrumImageLeft',
  'philtrumImageRight',
]);
export const LIP_BORDER_POINTS = Object.freeze(['imageLeftMouthCorner', 'imageRightMouthCorner']);
export const LIP_BORDER_STATES = Object.freeze([
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
]);
const REF = /^capture-[0-9]{2,}$/;
const SHA = /^[a-f0-9]{64}$/;
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const hasKeys = (v, keys) =>
  isObject(v) &&
  Object.keys(v).length === keys.length &&
  keys.every((key) => Object.hasOwn(v, key));
function invalid() {
  throw Error('LIP_BORDER_REVIEW_INVALID');
}
function point(p) {
  return (
    Array.isArray(p) &&
    p.length === 2 &&
    p.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1)
  );
}
function validateLine(value) {
  if (
    !hasKeys(value, ['status', 'segments']) ||
    !LIP_BORDER_STATES.includes(value.status) ||
    !Array.isArray(value.segments) ||
    value.segments.length > 12
  )
    invalid();
  if (['marked', 'partial'].includes(value.status) !== value.segments.length > 0) invalid();
  let points = 0;
  for (const line of value.segments) {
    if (!Array.isArray(line) || line.length < 2 || line.length > 400 || !line.every(point))
      invalid();
    points += line.length;
  }
  if (points > 1800) invalid();
  return value;
}
function validatePoint(value) {
  if (
    !hasKeys(value, ['status', 'point']) ||
    !LIP_BORDER_STATES.includes(value.status) ||
    value.status === 'partial' ||
    (value.status === 'marked' ? !point(value.point) : value.point !== null)
  )
    invalid();
  return value;
}
function assertRecord(value, ref) {
  const keys = [
    'schemaVersion',
    'captureRef',
    'sourceSha256',
    'coordinateFrame',
    ...LIP_BORDER_LINES,
    ...LIP_BORDER_POINTS,
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
    !hasKeys(value, keys) ||
    value.schemaVersion !== LIP_BORDER_REVIEW_SCHEMA_VERSION ||
    !REF.test(value.captureRef || '') ||
    value.captureRef !== ref ||
    !SHA.test(value.sourceSha256 || '') ||
    value.coordinateFrame !== 'normalized_original_image_screen_sides' ||
    value.humanReviewed !== true ||
    value.independentAccuracyValidated !== false ||
    value.canonicalF0Admitted !== false ||
    value.traditionalBindingAuthorized !== false ||
    value.productInterpretationAuthorized !== false ||
    value.modelTrainingAuthorized !== false ||
    !Number.isInteger(value.revision) ||
    value.revision < 1 ||
    typeof value.reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(value.reviewedAt))
  )
    invalid();
  for (const key of LIP_BORDER_LINES) validateLine(value[key]);
  for (const key of LIP_BORDER_POINTS) validatePoint(value[key]);
  return value;
}
export function createLipBorderHumanReviewRecord(
  input,
  { captureRef, sourceSha256, revision, reviewedAt } = {},
) {
  const keys = [...LIP_BORDER_LINES, ...LIP_BORDER_POINTS];
  if (
    !hasKeys(input, keys) ||
    !REF.test(captureRef || '') ||
    !SHA.test(sourceSha256 || '') ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    typeof reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(reviewedAt))
  )
    invalid();
  for (const key of LIP_BORDER_LINES) validateLine(input[key]);
  for (const key of LIP_BORDER_POINTS) validatePoint(input[key]);
  const lines = Object.fromEntries(
    LIP_BORDER_LINES.map((key) => [
      key,
      Object.freeze({
        status: input[key].status,
        segments: Object.freeze(
          input[key].segments.map((line) => Object.freeze(line.map((p) => Object.freeze([...p])))),
        ),
      }),
    ]),
  );
  const points = Object.fromEntries(
    LIP_BORDER_POINTS.map((key) => [
      key,
      Object.freeze({
        status: input[key].status,
        point: input[key].point === null ? null : Object.freeze([...input[key].point]),
      }),
    ]),
  );
  return assertRecord(
    Object.freeze({
      schemaVersion: LIP_BORDER_REVIEW_SCHEMA_VERSION,
      captureRef,
      sourceSha256,
      coordinateFrame: 'normalized_original_image_screen_sides',
      ...lines,
      ...points,
      humanReviewed: true,
      independentAccuracyValidated: false,
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
export function validateLipBorderHumanReviewStore(store, knownRefs) {
  if (
    !hasKeys(store, ['schemaVersion', 'records']) ||
    store.schemaVersion !== LIP_BORDER_REVIEW_SCHEMA_VERSION ||
    !isObject(store.records) ||
    !Array.isArray(knownRefs) ||
    new Set(knownRefs).size !== knownRefs.length
  )
    throw Error('LIP_BORDER_REVIEW_STORE_INVALID');
  const records = {};
  for (const [ref, record] of Object.entries(store.records)) {
    if (!knownRefs.includes(ref)) throw Error('LIP_BORDER_REVIEW_STORE_INVALID');
    try {
      records[ref] = assertRecord(record, ref);
    } catch {
      throw Error('LIP_BORDER_REVIEW_STORE_INVALID');
    }
  }
  return Object.freeze({
    schemaVersion: LIP_BORDER_REVIEW_SCHEMA_VERSION,
    records: Object.freeze(records),
  });
}
export function projectLipBorderHumanReviewForUi(record) {
  assertRecord(record, record?.captureRef);
  return Object.freeze({
    ...Object.fromEntries(
      [...LIP_BORDER_LINES, ...LIP_BORDER_POINTS].map((key) => [key, record[key]]),
    ),
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    revision: record.revision,
    reviewedAt: record.reviewedAt,
  });
}
