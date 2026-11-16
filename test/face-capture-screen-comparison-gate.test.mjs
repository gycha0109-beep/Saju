import { describe, expect, it } from 'vitest';
import { planSamePhotoReviewQueue } from '../tools/face-reading/two-view/same-photo-review-queue.mjs';
import { summarizeSamePhotoHumanModelCoverage } from '../tools/face-reading/two-view/same-photo-human-model-coverage.mjs';

const queueSource = (eligibility) => ({
  viewRole: 'frontal',
  poseProvisional: true,
  captureScreenEligibility: eligibility,
  parsingCurrent: true,
  modelReady: { eyelid: true, lip: true, ear: true },
  humanRecorded: { eyelid: false, lip: false, ear: false },
});
const comparisonSource = (eligibility, status = 'not_run') => ({
  viewRole: 'frontal',
  poseProvisional: true,
  captureScreenEligibility: eligibility,
  comparisons: Object.fromEntries(
    ['eyelid', 'lip', 'ear'].map((part) => [
      part,
      {
        humanReviewRecorded: true,
        modelCandidateAvailable: true,
        comparisonStatus: status,
        reviewStoreUnavailable: false,
      },
    ]),
  ),
});

describe('single-reviewer capture-screen gate for existing 2D comparisons', () => {
  it('routes only manually suitable pose candidates to boundary review', () => {
    const report = planSamePhotoReviewQueue([
      queueSource('pending'),
      queueSource('rejected'),
      queueSource('unavailable'),
      queueSource('frontal_candidate'),
    ]);
    expect(report).toMatchObject({
      photoCount: 4,
      uncheckedPosePhotos: 4,
      missingReviewSlots: 12,
      modelPrerequisiteMissingSlots: 0,
      captureScreenPendingPhotos: 1,
      captureScreenRejectedPhotos: 1,
      captureScreenUnavailablePhotos: 1,
      captureScreenReadySingleReviewerPhotos: 1,
      captureScreenPendingModelReadySlots: 3,
      captureScreenRejectedModelReadySlots: 3,
      captureScreenUnavailableModelReadySlots: 3,
      reviewTargetsCount: 3,
    });
    expect(report.targets.map((x) => x.photoIndex)).toEqual([3, 3, 3]);
    expect(report.independentlyReviewedPose).toBe(false);
    expect(JSON.stringify(report)).not.toMatch(/captureRef|sourceSha256|coordinates/);
  });
  it('does not move a fresh unreviewed photo into the comparison-ready queue', () => {
    const report = planSamePhotoReviewQueue(
      Array.from({ length: 10 }, () => queueSource('pending')),
    );
    expect(report.reviewTargetsCount).toBe(0);
    expect(report.captureScreenPendingModelReadySlots).toBe(30);
    expect(report.captureScreenPendingPhotos).toBe(10);
  });
  it('separates screening-blocked slots from same-photo research comparisons', () => {
    const report = summarizeSamePhotoHumanModelCoverage([
      comparisonSource('pending'),
      comparisonSource('rejected'),
      comparisonSource('unavailable'),
      comparisonSource('frontal_candidate', 'available'),
    ]);
    expect(report.statusCounts).toMatchObject({
      capture_screen_pending: 3,
      capture_screen_rejected: 3,
      capture_screen_unavailable: 3,
      research_comparison_available: 3,
      human_review_missing: 0,
    });
    expect(report.captureScreenReadySingleReviewerPhotos).toBe(1);
    expect(report.captureScreenPendingPhotos).toBe(1);
    expect(report.captureScreenRejectedPhotos).toBe(1);
    expect(report.captureScreenUnavailablePhotos).toBe(1);
    expect(report.candidateEvidenceCounts).toMatchObject({
      modelCandidateInCurrentSession: 12,
      humanReviewRecorded: 12,
      humanAndModelBothPresent: 3,
    });
    expect(report.independentlyReviewedPose).toBe(false);
    expect(report.independentMeasurementAccuracyValidated).toBe(false);
    expect(report.traditionalBindingAuthorized).toBe(false);
  });
  it('rejects forged comparison success before screening or with malformed state', () => {
    for (const eligibility of ['pending', 'rejected', 'unavailable']) {
      expect(() =>
        summarizeSamePhotoHumanModelCoverage([comparisonSource(eligibility, 'available')]),
      ).toThrow('HUMAN_MODEL_COVERAGE_INPUT_INVALID');
    }
    expect(() => planSamePhotoReviewQueue([queueSource('automatically_verified')])).toThrow(
      'SAME_PHOTO_REVIEW_QUEUE_INVALID',
    );
    expect(() =>
      summarizeSamePhotoHumanModelCoverage([comparisonSource('automatically_verified')]),
    ).toThrow('HUMAN_MODEL_COVERAGE_INPUT_INVALID');
  });
});
