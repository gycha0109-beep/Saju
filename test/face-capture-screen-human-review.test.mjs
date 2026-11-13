import { describe, expect, it } from 'vitest';
import {
  CAPTURE_SCREEN_REVIEW_VERSION,
  createCaptureScreenReview,
  validateCaptureScreenReviewStore,
  projectCaptureScreenReview,
  summarizeCaptureScreenReviews,
  auditCurrentCaptureScreenReviews,
} from '../tools/face-reading/two-view/capture-screen-human-review.mjs';

const sha = 'a'.repeat(64);
const context = (n = 1) => ({
  captureRef: 'capture-9001',
  sourceSha256: sha,
  revision: n,
  reviewedAt: '2026-11-13T02:00:00.000Z',
});
const source = () =>
  createCaptureScreenReview(
    {
      pose: 'frontal_usable_candidate',
      visibility: 'partially_occluded',
    },
    context(),
  );
describe('source-pinned human pose/occlusion review (research only)', () => {
  it('creates only explicitly selected human screening states, never independent truth', () => {
    const record = source();
    expect(record).toMatchObject({
      schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
      humanReviewed: true,
      reviewerCount: 1,
      independentPoseValidated: false,
      independentlyVerifiedAnatomy: false,
      comparisonAccuracyValidated: false,
      canonicalF0Admitted: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    const projected = projectCaptureScreenReview(record);
    expect(projected.pose).toBe('frontal_usable_candidate');
    expect(projected).not.toHaveProperty('sourceSha256');
    expect(projected).not.toHaveProperty('captureRef');
    const validated = validateCaptureScreenReviewStore(
      {
        schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
        records: { 'capture-9001': record },
      },
      ['capture-9001'],
    );
    expect(validated.records['capture-9001']).toBe(record);
    expect(summarizeCaptureScreenReviews({ 'capture-9001': projected }, 10)).toMatchObject({
      totalPhotos: 10,
      humanScreenedPhotos: 1,
      unreviewedPhotos: 9,
      frontalCandidatesSingleReviewer: 1,
      partiallyOrFullyOccludedPhotos: 1,
      independentPoseValidated: false,
      automaticAnnotationPerformed: false,
      rawPhotoOrSourceHashesEmitted: false,
    });
  });
  it('does not treat unsuitable/uncertain as usable frontal evidence', () => {
    const reviews = {
      x: projectCaptureScreenReview(
        createCaptureScreenReview(
          {
            pose: 'not_frontal',
            visibility: 'clear_enough_to_review',
          },
          context(),
        ),
      ),
      y: projectCaptureScreenReview(
        createCaptureScreenReview(
          {
            pose: 'uncertain',
            visibility: 'unusable',
          },
          context(2),
        ),
      ),
    };
    expect(summarizeCaptureScreenReviews(reviews, 2)).toMatchObject({
      frontalCandidatesSingleReviewer: 0,
      uncertainOrRejectedPhotos: 2,
    });
  });
  it('rejects forged ground truth, free-form details and malformed provenance', () => {
    for (const invalid of [
      {
        pose: 'frontal_usable_candidate',
        visibility: 'clear_enough_to_review',
        independentPoseValidated: true,
      },
      { pose: 'perfect_frontal', visibility: 'clear_enough_to_review' },
      {
        pose: 'frontal_usable_candidate',
        visibility: 'clear_enough_to_review',
        personName: 'private',
      },
    ])
      expect(() => createCaptureScreenReview(invalid, context())).toThrow(
        'CAPTURE_SCREEN_REVIEW_INVALID',
      );
    expect(() =>
      createCaptureScreenReview(
        { pose: 'uncertain', visibility: 'unusable' },
        { ...context(), sourceSha256: 'malformed' },
      ),
    ).toThrow();
    const r = source();
    for (const invalid of [
      { ...r, independentPoseValidated: true },
      { ...r, rawImage: 'forbidden' },
      { ...r, sourceSha256: '0' },
      { ...r, revision: 0 },
    ])
      expect(() =>
        validateCaptureScreenReviewStore(
          {
            schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
            records: { 'capture-9001': invalid },
          },
          ['capture-9001'],
        ),
      ).toThrow();
  });
  it('audits stored screening separately from independent truth and excludes changed originals', () => {
    const second = createCaptureScreenReview(
      { pose: 'not_frontal', visibility: 'unusable' },
      { ...context(), captureRef: 'capture-9002' },
    );
    const store = {
      schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
      records: { 'capture-9001': source(), 'capture-9002': second },
    };
    const current = auditCurrentCaptureScreenReviews(
      store,
      ['capture-9001', 'capture-9002'],
      new Map([
        ['capture-9001', sha],
        ['capture-9002', 'b'.repeat(64)],
      ]),
    );
    expect(current).toMatchObject({
      totalPhotos: 2,
      humanScreenedPhotos: 1,
      unreviewedPhotos: 1,
      frontalCandidatesSingleReviewer: 1,
      staleSourceReviews: 1,
      comparisonScreeningBlocked: true,
      independentPoseValidated: false,
      independentAnatomicalAccuracyValidated: false,
    });
    const safe = JSON.stringify(current);
    expect(safe).not.toContain('capture-9001');
    expect(safe).not.toContain(sha);
    const restored = auditCurrentCaptureScreenReviews(
      store,
      ['capture-9001', 'capture-9002'],
      new Map([
        ['capture-9001', sha],
        ['capture-9002', sha],
      ]),
    );
    expect(restored.humanScreenedPhotos).toBe(2);
    expect(restored.uncertainOrRejectedPhotos).toBe(1);
    expect(restored.comparisonScreeningBlocked).toBe(false);
    expect(() =>
      auditCurrentCaptureScreenReviews(
        { ...store, records: { 'capture-9001': { ...source(), canonicalF0Admitted: true } } },
        ['capture-9001', 'capture-9002'],
        new Map([['capture-9001', sha]]),
      ),
    ).toThrow('CAPTURE_SCREEN_REVIEW_INVALID');
  });
  it('rejects unknown photos and does not fabricate missing reviewers', () => {
    expect(() =>
      validateCaptureScreenReviewStore(
        {
          schemaVersion: CAPTURE_SCREEN_REVIEW_VERSION,
          records: { 'capture-9001': source() },
        },
        ['capture-9002'],
      ),
    ).toThrow('CAPTURE_SCREEN_REVIEW_INVALID');
    expect(summarizeCaptureScreenReviews({}, 10).humanScreenedPhotos).toBe(0);
  });
});
