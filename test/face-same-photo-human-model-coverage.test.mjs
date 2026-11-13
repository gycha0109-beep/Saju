import { describe, expect, it } from 'vitest';
import {
  HUMAN_MODEL_COMPARISON_COVERAGE_VERSION,
  summarizeSamePhotoHumanModelCoverage,
} from '../tools/face-reading/two-view/same-photo-human-model-coverage.mjs';

const sample = (options = {}) => ({
  viewRole: 'frontal',
  poseProvisional: false,
  comparisons: Object.fromEntries(['eyelid', 'lip', 'ear'].map((key) => [
    key, {
      humanReviewRecorded: false,
      modelCandidateAvailable: true,
      comparisonStatus: 'not_run',
      reviewStoreUnavailable: false,
    },
  ])),
  ...options,
});
const comparison = (extra = {}) => ({
  humanReviewRecorded: true,
  modelCandidateAvailable: true,
  comparisonStatus: 'available',
  reviewStoreUnavailable: false,
  ...extra,
});

describe('same-photo model/human comparison coverage without biometric output', () => {
  it('counts absent human strokes separately from same-photo research comparisons', () => {
    const first = sample({ poseProvisional: true });
    const second = sample({
      comparisons: {
        eyelid: comparison(),
        lip: comparison({ comparisonStatus: 'partial' }),
        ear: comparison({ comparisonStatus: 'unavailable' }),
      },
    });
    const third = sample({
      viewRole: 'profile',
      comparisons: Object.fromEntries(['eyelid', 'lip', 'ear'].map((key) =>
        [key, comparison({ comparisonStatus: 'not_run', modelCandidateAvailable: false })])),
    });
    const report = summarizeSamePhotoHumanModelCoverage([first, second, third]);
    expect(report).toMatchObject({
      schemaVersion: HUMAN_MODEL_COMPARISON_COVERAGE_VERSION,
      photoCount: 3,
      featureCount: 3,
      photoFeatureCount: 9,
      provisionalPosePhotos: 1,
      statusCounts: {
        human_review_missing: 3,
        research_comparison_available: 1,
        research_comparison_partial: 1,
        noncomparable: 1,
        view_ineligible: 3,
      },
      independentlyReviewedPose: false,
      independentHumanGroundTruthValidated: false,
      independentMeasurementAccuracyValidated: false,
      repeatCaptureAgreementValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      rawSourcePersistedOrEmitted: false,
    });
    expect(JSON.stringify(report)).not.toMatch(
      /captureRef|sourceSha|sourcePath|segments|landmark|imageBytes|coordinates|signedDrawnMinus/,
    );
  });

  it('separates stale review store, absent model, and unexecuted comparison', () => {
    const report = summarizeSamePhotoHumanModelCoverage([
      sample({
        comparisons: {
          eyelid: comparison({ comparisonStatus: 'not_run', reviewStoreUnavailable: true }),
          lip: comparison({ modelCandidateAvailable: false, comparisonStatus: 'not_run' }),
          ear: comparison({ comparisonStatus: 'not_run' }),
        },
      }),
    ]);
    expect(report.statusCounts).toMatchObject({
      review_store_unavailable: 1,
      model_candidate_missing: 1,
      comparison_not_run: 1,
    });
  });

  it('rejects fabricated comparisons, unknown fields, and nonfrontal authority', () => {
    const eye = sample().comparisons.eyelid;
    for (const invalid of [
      sample({ comparisons: { ...sample().comparisons, eyelid: { ...eye, comparisonStatus: 'available' } } }),
      sample({ comparisons: { ...sample().comparisons, eyelid: { ...eye, personName: 'invented' } } }),
      sample({ viewRole: 'other' }),
      sample({ viewRole: 'profile', comparisons: {
        ...sample().comparisons, eyelid: comparison(),
      } }),
      sample({ originalPhotoBytes: 'forbidden' }),
    ]) {
      expect(() => summarizeSamePhotoHumanModelCoverage([invalid]))
        .toThrow('HUMAN_MODEL_COVERAGE_INPUT_INVALID');
    }
  });

  it('never infers comparison results from an empty session', () => {
    const report = summarizeSamePhotoHumanModelCoverage([]);
    expect(report.photoFeatureCount).toBe(0);
    expect(report.statusCounts.research_comparison_available).toBe(0);
    expect(report.features).toHaveLength(3);
  });
});
