// Local-only reviewer navigation from an existing validated photo list.
// Model readiness indicates a *screening prerequisite*, never human truth,
// frontal pose confirmation, or anatomical measurement accuracy.
export const SAME_PHOTO_REVIEW_QUEUE_VERSION = 'engineering.same-photo-review-queue@0.1.0';
const PARTS = Object.freeze(['eyelid', 'lip', 'ear']);
const isObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
const keys = (x, expected) =>
  isObject(x) && Object.keys(x).sort().join('|') === expected.slice().sort().join('|');
const invalid = () => {
  throw Error('SAME_PHOTO_REVIEW_QUEUE_INVALID');
};

export function planSamePhotoReviewQueue(sources) {
  if (!Array.isArray(sources) || sources.length > 1000) invalid();
  const targets = [];
  let ineligiblePhotos = 0;
  let uncheckedPosePhotos = 0;
  let missingReviewSlots = 0;
  let modelPrerequisiteMissingSlots = 0;
  for (const [index, source] of sources.entries()) {
    if (
      !keys(source, [
        'viewRole',
        'poseProvisional',
        'parsingCurrent',
        'modelReady',
        'humanRecorded',
      ]) ||
      !['frontal', 'profile'].includes(source.viewRole) ||
      typeof source.poseProvisional !== 'boolean' ||
      typeof source.parsingCurrent !== 'boolean' ||
      !keys(source.modelReady, PARTS) ||
      !keys(source.humanRecorded, PARTS) ||
      PARTS.some(
        (part) =>
          typeof source.modelReady[part] !== 'boolean' ||
          typeof source.humanRecorded[part] !== 'boolean',
      )
    )
      invalid();
    if (source.viewRole !== 'frontal') {
      ineligiblePhotos++;
      continue;
    }
    if (source.poseProvisional) uncheckedPosePhotos++;
    const local = [];
    for (const part of PARTS) {
      if (source.humanRecorded[part]) continue;
      missingReviewSlots++;
      if (!source.parsingCurrent || !source.modelReady[part]) {
        modelPrerequisiteMissingSlots++;
        continue;
      }
      local.push(
        Object.freeze({
          photoIndex: index,
          part,
          poseNotIndependentlyVerified: source.poseProvisional,
        }),
      );
    }
    targets.push(...local);
  }
  const report = {
    schemaVersion: SAME_PHOTO_REVIEW_QUEUE_VERSION,
    status: 'local_human_review_navigation_not_validation',
    photoCount: sources.length,
    ineligiblePhotos,
    uncheckedPosePhotos,
    missingReviewSlots,
    modelPrerequisiteMissingSlots,
    reviewTargetsCount: targets.length,
    targets: Object.freeze(targets),
    humanAnnotationsCreated: false,
    independentlyReviewedPose: false,
    independentAnatomicalAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    privatePhotoCopiedOrEmitted: false,
  };
  return Object.freeze(report);
}
