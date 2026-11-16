import { describe, expect, it } from 'vitest';
import type {
  BrowCenterlineReviewSide,
  BrowCenterlineReviewState,
} from '../tools/face-reading/two-view/brow-centerline-review.mjs';
import {
  BROW_CENTERLINE_REVIEW_SCHEMA_VERSION,
  BROW_CENTERLINE_REVIEW_STATES,
  createBrowCenterlineReviewRecord,
  projectBrowCenterlineReviewForUi,
  validateBrowCenterlineReviewStore,
} from '../tools/face-reading/two-view/brow-centerline-review.mjs';

const sourceSha256 = 'b'.repeat(64);
const reviewedAt = '2026-11-07T00:00:00.000Z';

function side(
  status: BrowCenterlineReviewState = 'marked',
  segments: number[][][] = [
    [
      [0.12, 0.35],
      [0.18, 0.31],
      [0.25, 0.33],
    ],
  ],
): BrowCenterlineReviewSide {
  return { status, segments };
}

function create(imageLeft = side(), imageRight = side('partial')) {
  return createBrowCenterlineReviewRecord(
    { imageLeft, imageRight },
    {
      captureRef: 'capture-01',
      sourceSha256,
      revision: 1,
      reviewedAt,
    },
  );
}

describe('local human eyebrow centerline review contract', () => {
  it('supports marked, partial, occluded, out-of-frame, no-visible-brow and unknown states', () => {
    expect(BROW_CENTERLINE_REVIEW_STATES).toEqual([
      'marked',
      'partial',
      'occluded',
      'out_of_frame',
      'no_visible_brow',
      'unknown',
    ]);
    for (const status of BROW_CENTERLINE_REVIEW_STATES) {
      const visible = status === 'marked' || status === 'partial';
      expect(
        create(
          side(
            status,
            visible
              ? [
                  [
                    [0.1, 0.3],
                    [0.2, 0.25],
                  ],
                ]
              : [],
          ),
          side(
            status,
            visible
              ? [
                  [
                    [0.7, 0.3],
                    [0.8, 0.25],
                  ],
                ]
              : [],
          ),
        ),
      ).toMatchObject({
        imageLeft: { status },
        imageRight: { status },
        humanReviewed: true,
        independentAccuracyValidated: false,
      });
    }
  });

  it('stores normalized image coordinates, not anatomical laterality or a canonical verdict', () => {
    expect(create()).toMatchObject({
      coordinateFrame: 'normalized_image_coordinates',
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
  });

  it('rejects malformed or out-of-range points and inconsistent visibility states', () => {
    expect(() => create(side('marked', []))).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
    expect(() =>
      create(
        side('unknown', [
          [
            [0.1, 0.2],
            [0.2, 0.3],
          ],
        ]),
        side('unknown', []),
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
    expect(() =>
      create(
        side('marked', [
          [
            [0.1, 0.2],
            [1.01, 0.3],
          ],
        ]),
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
    expect(() => create(side('partial', [[[0.1, 0.2]]]))).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
  });

  it('rejects malformed review identity, hash, revision and capture references', () => {
    expect(() =>
      createBrowCenterlineReviewRecord(
        { imageLeft: side(), imageRight: side() },
        { captureRef: '../capture-01', sourceSha256, revision: 1, reviewedAt },
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
    expect(() =>
      createBrowCenterlineReviewRecord(
        { imageLeft: side(), imageRight: side() },
        { captureRef: 'capture-01', sourceSha256: 'bad', revision: 1, reviewedAt },
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
    expect(() =>
      createBrowCenterlineReviewRecord(
        { imageLeft: side(), imageRight: side() },
        { captureRef: 'capture-01', sourceSha256, revision: 0, reviewedAt },
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_INVALID');
  });

  it('restores only known capture references and rejects authority escalation', () => {
    const record = create();
    const restored = validateBrowCenterlineReviewStore(
      { schemaVersion: BROW_CENTERLINE_REVIEW_SCHEMA_VERSION, records: { 'capture-01': record } },
      ['capture-01', 'capture-02'],
    );
    expect(restored.records['capture-01']).toEqual(record);
    expect(() =>
      validateBrowCenterlineReviewStore(
        { schemaVersion: BROW_CENTERLINE_REVIEW_SCHEMA_VERSION, records: { 'capture-99': record } },
        ['capture-01'],
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_STORE_INVALID');
    expect(() =>
      validateBrowCenterlineReviewStore(
        {
          schemaVersion: BROW_CENTERLINE_REVIEW_SCHEMA_VERSION,
          records: {
            'capture-01': { ...record, traditionalBindingAuthorized: true },
          },
        },
        ['capture-01'],
      ),
    ).toThrow('BROW_CENTERLINE_REVIEW_STORE_INVALID');
  });

  it('projects local review geometry without exposing source hashes or private paths', () => {
    const projection = projectBrowCenterlineReviewForUi(create());
    const serialized = JSON.stringify(projection);
    expect(projection).toMatchObject({
      imageLeft: { status: 'marked' },
      imageRight: { status: 'partial' },
      humanReviewed: true,
      independentAccuracyValidated: false,
      modelTrainingAuthorized: false,
    });
    expect(serialized).not.toContain(sourceSha256);
    expect(serialized).not.toContain('sourceSha256');
    expect(serialized).not.toContain('sourcePath');
  });
});
