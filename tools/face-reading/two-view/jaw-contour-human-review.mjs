// Private, single-reviewer lower-face visible outline annotation.
// The marked image-plane line is not an anatomical jaw or bone boundary.
export const JAW_CONTOUR_REVIEW_VERSION = 'myeongha-jaw-visible-contour-human-review-v1';
export const JAW_CONTOUR_STATES = Object.freeze([
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
]);
const REF = /^capture-[0-9]{2,}$/;
const SHA = /^[a-f0-9]{64}$/;
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const exact = (v, names) =>
  isObject(v) &&
  Object.keys(v).length === names.length &&
  names.every((name) => Object.hasOwn(v, name));
const abort = () => {
  throw Error('JAW_CONTOUR_REVIEW_INVALID');
};
const validPoint = (p) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1);

function validatedContour(value) {
  if (
    !exact(value, ['status', 'segments']) ||
    !JAW_CONTOUR_STATES.includes(value.status) ||
    !Array.isArray(value.segments) ||
    value.segments.length > 8
  )
    abort();
  if (['marked', 'partial'].includes(value.status) !== value.segments.length > 0) abort();
  if (value.status === 'marked' && value.segments.length !== 1) abort();
  let total = 0;
  for (const line of value.segments) {
    if (!Array.isArray(line) || line.length < 2 || line.length > 400 || !line.every(validPoint))
      abort();
    total += line.length;
    // An inferior face silhouette must be traversed monotonically across
    // screen X. This is a drawing precondition, never a skeletal assertion.
    const direction = Math.sign(line[1][0] - line[0][0]);
    if (!direction || line.some((p, i) => i > 0 && Math.sign(p[0] - line[i - 1][0]) !== direction))
      abort();
  }
  if (total > 1600) abort();
  return value;
}
const fields = [
  'schemaVersion',
  'captureRef',
  'sourceSha256',
  'viewRole',
  'coordinateFrame',
  'visibleLowerFaceOutline',
  'humanReviewed',
  'independentAccuracyValidated',
  'actualJawAnatomyValidated',
  'boneShapeInferred',
  'canonicalF0Admitted',
  'traditionalBindingAuthorized',
  'productInterpretationAuthorized',
  'modelTrainingAuthorized',
  'revision',
  'reviewedAt',
];
function assertRecord(record, ref) {
  if (
    !exact(record, fields) ||
    record.schemaVersion !== JAW_CONTOUR_REVIEW_VERSION ||
    !REF.test(record.captureRef || '') ||
    record.captureRef !== ref ||
    !SHA.test(record.sourceSha256 || '') ||
    record.viewRole !== 'frontal' ||
    record.coordinateFrame !== 'normalized_original_image_screen_sides' ||
    record.humanReviewed !== true ||
    record.independentAccuracyValidated !== false ||
    record.actualJawAnatomyValidated !== false ||
    record.boneShapeInferred !== false ||
    record.canonicalF0Admitted !== false ||
    record.traditionalBindingAuthorized !== false ||
    record.productInterpretationAuthorized !== false ||
    record.modelTrainingAuthorized !== false ||
    !Number.isInteger(record.revision) ||
    record.revision < 1 ||
    typeof record.reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(record.reviewedAt))
  )
    abort();
  validatedContour(record.visibleLowerFaceOutline);
  return record;
}
export function createJawContourReviewRecord(
  input,
  { captureRef, sourceSha256, revision, reviewedAt } = {},
) {
  if (
    !exact(input, ['visibleLowerFaceOutline']) ||
    !REF.test(captureRef || '') ||
    !SHA.test(sourceSha256 || '') ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    typeof reviewedAt !== 'string' ||
    !Number.isFinite(Date.parse(reviewedAt))
  )
    abort();
  const value = validatedContour(input.visibleLowerFaceOutline);
  const contour = Object.freeze({
    status: value.status,
    segments: Object.freeze(
      value.segments.map((line) => Object.freeze(line.map((p) => Object.freeze([...p])))),
    ),
  });
  return assertRecord(
    Object.freeze({
      schemaVersion: JAW_CONTOUR_REVIEW_VERSION,
      captureRef,
      sourceSha256,
      viewRole: 'frontal',
      coordinateFrame: 'normalized_original_image_screen_sides',
      visibleLowerFaceOutline: contour,
      humanReviewed: true,
      independentAccuracyValidated: false,
      actualJawAnatomyValidated: false,
      boneShapeInferred: false,
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
export function validateJawContourReviewStore(store, knownRefs) {
  if (
    !exact(store, ['schemaVersion', 'records']) ||
    store.schemaVersion !== JAW_CONTOUR_REVIEW_VERSION ||
    !isObject(store.records) ||
    !Array.isArray(knownRefs) ||
    new Set(knownRefs).size !== knownRefs.length
  )
    abort();
  const records = {};
  for (const [ref, record] of Object.entries(store.records)) {
    if (!knownRefs.includes(ref)) abort();
    records[ref] = assertRecord(record, ref);
  }
  return Object.freeze({
    schemaVersion: JAW_CONTOUR_REVIEW_VERSION,
    records: Object.freeze(records),
  });
}
export function projectJawContourReviewForUi(record) {
  assertRecord(record, record?.captureRef);
  // Keep original digest and source metadata in private server storage only.
  return Object.freeze({
    visibleLowerFaceOutline: record.visibleLowerFaceOutline,
    humanReviewed: true,
    independentAccuracyValidated: false,
    actualJawAnatomyValidated: false,
    boneShapeInferred: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    revision: record.revision,
    reviewedAt: record.reviewedAt,
  });
}
