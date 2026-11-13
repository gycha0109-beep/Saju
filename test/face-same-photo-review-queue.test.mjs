import { describe, expect, it } from 'vitest';
import {
  SAME_PHOTO_REVIEW_QUEUE_VERSION,
  planSamePhotoReviewQueue,
} from '../tools/face-reading/two-view/same-photo-review-queue.mjs';

const input = (overrides = {}) => ({
  viewRole: 'frontal',
  poseProvisional: true,
  parsingCurrent: true,
  modelReady: { eyelid: true, lip: true, ear: true },
  humanRecorded: { eyelid: false, lip: false, ear: false },
  ...overrides,
});

describe('private existing-photo human review navigation queue', () => {
  it('only queues unmarked features with current model prerequisites', () => {
    const plan = planSamePhotoReviewQueue([
      input(),
      input({
        modelReady: { eyelid: true, lip: false, ear: false },
        humanRecorded: { eyelid: true, lip: false, ear: false },
      }),
      input({ viewRole: 'profile', poseProvisional: false }),
    ]);
    expect(plan).toMatchObject({
      schemaVersion: SAME_PHOTO_REVIEW_QUEUE_VERSION,
      photoCount: 3,
      ineligiblePhotos: 1,
      uncheckedPosePhotos: 2,
      missingReviewSlots: 5,
      modelPrerequisiteMissingSlots: 2,
      reviewTargetsCount: 3,
      targets: [
        { photoIndex: 0, part: 'eyelid', poseNotIndependentlyVerified: true },
        { photoIndex: 0, part: 'lip', poseNotIndependentlyVerified: true },
        { photoIndex: 0, part: 'ear', poseNotIndependentlyVerified: true },
      ],
      humanAnnotationsCreated: false,
      independentlyReviewedPose: false,
      independentAnatomicalAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      privatePhotoCopiedOrEmitted: false,
    });
    expect(JSON.stringify(plan)).not.toMatch(
      /captureRef|sourcePath|sha256|landmark|segment|imageBytes|personName/,
    );
  });

  it('does not mark unfinished model processing as actionable review evidence', () => {
    const plan = planSamePhotoReviewQueue([
      input({ parsingCurrent: false }),
      input({ modelReady: { eyelid: false, lip: false, ear: false } }),
    ]);
    expect(plan.reviewTargetsCount).toBe(0);
    expect(plan.modelPrerequisiteMissingSlots).toBe(6);
    expect(plan.missingReviewSlots).toBe(6);
  });

  it('preserves missing review facts without adding fabricated annotations', () => {
    const plan = planSamePhotoReviewQueue([
      input({ humanRecorded: { eyelid: true, lip: true, ear: true } }),
    ]);
    expect(plan.missingReviewSlots).toBe(0);
    expect(plan.targets).toEqual([]);
    expect(plan.humanAnnotationsCreated).toBe(false);
  });

  it('rejects unknown view, unexpected source keys, and invented results', () => {
    for (const bad of [
      input({ viewRole: 'unverified' }),
      input({ humanRecorded: { eyelid: 'true', lip: false, ear: false } }),
      input({ originalPhoto: 'not allowed' }),
      input({ modelReady: { eyelid: true, lip: true, ear: true, projection: true } }),
    ]) {
      expect(() => planSamePhotoReviewQueue([bad])).toThrow('SAME_PHOTO_REVIEW_QUEUE_INVALID');
    }
  });
});
