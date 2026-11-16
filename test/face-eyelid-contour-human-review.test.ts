import { describe, expect, it } from 'vitest';
import {
  EYELID_CONTOUR_REVIEW_VERSION,
  EYELID_CONTOUR_PARTS,
  createEyelidContourReviewRecord,
  validateEyelidContourReviewStore,
  projectEyelidContourReviewForUi,
} from '../tools/face-reading/two-view/eyelid-contour-human-review.mjs';

const none = () => ({ status: 'unknown' as const, segments: [] });
const example = () => ({
  imageLeft: {
    upperLidMargin: {
      status: 'marked' as const,
      segments: [
        [
          [0.25, 0.43],
          [0.35, 0.44],
        ],
      ],
    },
    creaseLine: {
      status: 'partial' as const,
      segments: [
        [
          [0.26, 0.4],
          [0.3, 0.39],
        ],
      ],
    },
    hoodingBoundary: none(),
  },
  imageRight: {
    upperLidMargin: { status: 'occluded' as const, segments: [] },
    creaseLine: { status: 'not_visible' as const, segments: [] },
    hoodingBoundary: {
      status: 'marked' as const,
      segments: [
        [
          [0.62, 0.39],
          [0.71, 0.4],
        ],
      ],
    },
  },
});
const options = {
  captureRef: 'capture-01',
  sourceSha256: 'd'.repeat(64),
  revision: 1,
  reviewedAt: '2026-11-07T00:00:00.000Z',
};
const create = () => createEyelidContourReviewRecord(example(), options);

describe('local eyelid contour person annotations', () => {
  it('captures crease line, upper margin and hooding boundary independently for screen left/right', () => {
    expect(EYELID_CONTOUR_PARTS).toEqual(['upperLidMargin', 'creaseLine', 'hoodingBoundary']);
    expect(create()).toMatchObject({
      imageLeft: { creaseLine: { status: 'partial' }, upperLidMargin: { status: 'marked' } },
      imageRight: { creaseLine: { status: 'not_visible' } },
      humanReviewed: true,
      independentAccuracyValidated: false,
      actualAnatomicalContourValidated: false,
      anatomicalLateralityAssigned: false,
      eyelidProjectionMeasured: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
  });
  it('preserves partial, occluded and not-visible status per contour, not a facial-wide failure', () => {
    const record = create();
    expect(record.imageLeft.hoodingBoundary.segments).toHaveLength(0);
    expect(record.imageRight.upperLidMargin.status).toBe('occluded');
    expect(record.imageRight.hoodingBoundary.segments).toHaveLength(1);
  });
  it('rejects marked-with-no-line and hidden-with-line contradictions', () => {
    expect(() =>
      createEyelidContourReviewRecord(
        {
          ...example(),
          imageLeft: { ...example().imageLeft, creaseLine: { status: 'marked', segments: [] } },
        },
        options,
      ),
    ).toThrow('EYELID_CONTOUR_REVIEW_INVALID');
    expect(() =>
      createEyelidContourReviewRecord(
        {
          ...example(),
          imageLeft: {
            ...example().imageLeft,
            creaseLine: {
              status: 'occluded',
              segments: [
                [
                  [0.2, 0.2],
                  [0.3, 0.3],
                ],
              ],
            },
          },
        },
        options,
      ),
    ).toThrow('EYELID_CONTOUR_REVIEW_INVALID');
  });
  it('fails closed on out-of-frame coordinates, invalid source hashes, capture traversal and extra fields', () => {
    expect(() =>
      createEyelidContourReviewRecord(
        {
          ...example(),
          imageLeft: {
            ...example().imageLeft,
            creaseLine: {
              status: 'marked',
              segments: [
                [
                  [0.2, 0.2],
                  [1.4, 0.3],
                ],
              ],
            },
          },
        },
        options,
      ),
    ).toThrow('EYELID_CONTOUR_REVIEW_INVALID');
    expect(() =>
      createEyelidContourReviewRecord(example(), {
        ...options,
        sourceSha256: 'not-a-sha',
      }),
    ).toThrow('EYELID_CONTOUR_REVIEW_INVALID');
    expect(() =>
      createEyelidContourReviewRecord(example(), {
        ...options,
        captureRef: '../capture-01',
      }),
    ).toThrow('EYELID_CONTOUR_REVIEW_INVALID');
    expect(() =>
      createEyelidContourReviewRecord(
        {
          ...example(),
          newAnatomicalJudgment: true,
        } as never,
        options,
      ),
    ).toThrow('EYELID_CONTOUR_REVIEW_INVALID');
  });
  it('denies previous-record authority escalation and mismatched capture references', () => {
    const saved = {
      schemaVersion: EYELID_CONTOUR_REVIEW_VERSION,
      records: { 'capture-01': create() },
    };
    expect(validateEyelidContourReviewStore(saved, ['capture-01']).records['capture-01']).toEqual(
      create(),
    );
    expect(() => validateEyelidContourReviewStore(saved, ['capture-02'])).toThrow(
      'EYELID_CONTOUR_STORE_INVALID',
    );
    expect(() =>
      validateEyelidContourReviewStore(
        {
          ...saved,
          records: { 'capture-01': { ...create(), canonicalF0Admitted: true } },
        },
        ['capture-01'],
      ),
    ).toThrow('EYELID_CONTOUR_STORE_INVALID');
  });
  it('exposes only local contour geometry without source SHA or private paths', () => {
    const text = JSON.stringify(projectEyelidContourReviewForUi(create()));
    expect(text).toContain('creaseLine');
    expect(text).not.toContain(options.sourceSha256);
    expect(text).not.toContain('sourceSha256');
    expect(text).not.toContain('sourcePath');
  });
  it('deep copies input coordinates to prevent later mutation of persisted review data', () => {
    const input = example();
    const rec = createEyelidContourReviewRecord(input, options);
    input.imageLeft.upperLidMargin.segments[0]![0]![0] = 0.91;
    expect(rec.imageLeft.upperLidMargin.segments[0]![0]![0]).toBeCloseTo(0.25);
  });
});
