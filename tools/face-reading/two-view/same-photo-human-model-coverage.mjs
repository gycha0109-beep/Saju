// Research-only, source-free rollup of existing same-photo model/human previews.
// The input is assembled in the current browser from SHA-checked local state;
// this code never copies human strokes, original images or measured offsets.
export const HUMAN_MODEL_COMPARISON_COVERAGE_VERSION =
  'engineering.same-photo-human-model-coverage@0.1.0';

const FEATURES = Object.freeze([
  ['eyelid', '눈꺼풀 윗경계와 눈 클래스'],
  ['lip', '입술 표시 가로폭과 모델 클래스'],
  ['ear', '귀 바깥선과 모델 귀 클래스'],
]);
const STATUSES = Object.freeze([
  'view_ineligible',
  'review_store_unavailable',
  'human_review_missing',
  'model_candidate_missing',
  'comparison_not_run',
  'noncomparable',
  'research_comparison_partial',
  'research_comparison_available',
]);
const isObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
const tally = () => Object.fromEntries(STATUSES.map((key) => [key, 0]));
const invalid = () => {
  throw Error('HUMAN_MODEL_COVERAGE_INPUT_INVALID');
};

function statusFor(capture, key) {
  const comparison = capture.comparisons[key];
  if (
    !isObject(comparison) ||
    Object.keys(comparison).sort().join('|') !== [
      'humanReviewRecorded', 'modelCandidateAvailable', 'comparisonStatus', 'reviewStoreUnavailable',
    ].sort().join('|') ||
    typeof comparison.humanReviewRecorded !== 'boolean' ||
    typeof comparison.modelCandidateAvailable !== 'boolean' ||
    typeof comparison.reviewStoreUnavailable !== 'boolean' ||
    !['not_run', 'available', 'partial', 'unavailable'].includes(comparison.comparisonStatus)
  ) invalid();
  if (
    comparison.comparisonStatus !== 'not_run' &&
    (!comparison.humanReviewRecorded || !comparison.modelCandidateAvailable ||
      comparison.reviewStoreUnavailable || capture.viewRole !== 'frontal')
  ) invalid();
  if (capture.viewRole !== 'frontal') return 'view_ineligible';
  if (comparison.reviewStoreUnavailable) return 'review_store_unavailable';
  if (!comparison.humanReviewRecorded) return 'human_review_missing';
  if (!comparison.modelCandidateAvailable) return 'model_candidate_missing';
  return {
    not_run: 'comparison_not_run',
    unavailable: 'noncomparable',
    partial: 'research_comparison_partial',
    available: 'research_comparison_available',
  }[comparison.comparisonStatus];
}

export function summarizeSamePhotoHumanModelCoverage(captures) {
  if (!Array.isArray(captures) || captures.length > 1000) invalid();
  const summary = FEATURES.map(([featureKey, label]) => ({
    featureKey, label, ...tally(),
  }));
  const totals = tally();
  let provisionalPosePhotos = 0;
  for (const capture of captures) {
    if (
      !isObject(capture) ||
      Object.keys(capture).sort().join('|') !==
        ['viewRole', 'poseProvisional', 'comparisons'].sort().join('|') ||
      !['frontal', 'profile'].includes(capture.viewRole) ||
      typeof capture.poseProvisional !== 'boolean' ||
      !isObject(capture.comparisons) ||
      Object.keys(capture.comparisons).sort().join('|') !==
        FEATURES.map(([key]) => key).sort().join('|')
    ) invalid();
    if (capture.poseProvisional) provisionalPosePhotos++;
    for (let i = 0; i < FEATURES.length; i++) {
      const status = statusFor(capture, FEATURES[i][0]);
      summary[i][status]++;
      totals[status]++;
    }
  }
  return Object.freeze({
    schemaVersion: HUMAN_MODEL_COMPARISON_COVERAGE_VERSION,
    status: 'local_research_comparison_coverage_not_accuracy',
    photoCount: captures.length,
    featureCount: FEATURES.length,
    photoFeatureCount: captures.length * FEATURES.length,
    provisionalPosePhotos,
    statusCounts: Object.freeze(totals),
    features: Object.freeze(summary.map((row) => Object.freeze({ ...row }))),
    // A same-photo geometric candidate is not independent anatomical truth.
    independentlyReviewedPose: false,
    independentHumanGroundTruthValidated: false,
    independentMeasurementAccuracyValidated: false,
    repeatCaptureAgreementValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    rawSourcePersistedOrEmitted: false,
  });
}
