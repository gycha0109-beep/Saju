import { describe, expect, it } from 'vitest';
import {
  EAR_DETAIL_REVIEW_SCHEMA_VERSION,
  EAR_DETAIL_STATES,
  createEarDetailReviewRecord,
  validateEarDetailReviewStore,
  projectEarDetailReviewForUi,
} from '../tools/face-reading/two-view/ear-detail-review.mjs';

const empty = () => ({ status: 'unknown' as const, segments: [] });
const input = () => ({
  imageLeft: {
    outerRim: {
      status: 'marked' as const,
      segments: [
        [
          [0.13, 0.35],
          [0.17, 0.22],
          [0.2, 0.3],
        ],
      ],
    },
    lobe: {
      status: 'partial' as const,
      segments: [
        [
          [0.19, 0.42],
          [0.18, 0.46],
        ],
      ],
    },
    attachment: { status: 'marked' as const, point: [0.2, 0.37] },
  },
  imageRight: {
    outerRim: empty(),
    lobe: empty(),
    attachment: { status: 'unknown' as const, point: null },
  },
});
const opts = {
  captureRef: 'capture-01',
  sourceSha256: 'b'.repeat(64),
  viewRole: 'frontal' as const,
  revision: 1,
  reviewedAt: '2026-11-07T11:00:00Z',
};
const create = () => createEarDetailReviewRecord(input(), opts);

describe('local human ear detail research contract', () => {
  it('separates outer rim, lobe and attachment for each visible image-side ear', () => {
    expect(EAR_DETAIL_STATES).toEqual([
      'marked',
      'partial',
      'occluded',
      'out_of_frame',
      'not_visible',
      'unknown',
    ]);
    expect(create()).toMatchObject({
      imageLeft: {
        outerRim: { status: 'marked' },
        lobe: { status: 'partial' },
        attachment: { status: 'marked' },
      },
      imageRight: { outerRim: { status: 'unknown' } },
      humanReviewed: true,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
      earProjectionMeasured: false,
      earThicknessMeasured: false,
    });
  });
  it('allows a separate side-view original without claiming biological laterality', () => {
    const result = createEarDetailReviewRecord(input(), { ...opts, viewRole: 'profile' });
    expect(result.viewRole).toBe('profile');
    expect(result.coordinateFrame).toBe('normalized_original_image_screen_sides');
  });
  it('distinguishes occluded, not visible and out-of-frame evidence per part', () => {
    const result = createEarDetailReviewRecord(
      {
        ...input(),
        imageRight: {
          outerRim: { status: 'out_of_frame', segments: [] },
          lobe: { status: 'occluded', segments: [] },
          attachment: { status: 'not_visible', point: null },
        },
      },
      opts,
    );
    expect(result.imageRight.lobe.status).toBe('occluded');
    expect(result.imageRight.outerRim.status).toBe('out_of_frame');
  });
  it('rejects a drawn contour with no segments or non-drawn contours with points', () => {
    expect(() =>
      createEarDetailReviewRecord(
        {
          ...input(),
          imageRight: { ...input().imageRight, outerRim: { status: 'marked', segments: [] } },
        },
        opts,
      ),
    ).toThrow('EAR_DETAIL_REVIEW_INVALID');
    expect(() =>
      createEarDetailReviewRecord(
        {
          ...input(),
          imageRight: {
            ...input().imageRight,
            outerRim: {
              status: 'occluded',
              segments: [
                [
                  [0.1, 0.2],
                  [0.2, 0.3],
                ],
              ],
            },
          },
        },
        opts,
      ),
    ).toThrow('EAR_DETAIL_REVIEW_INVALID');
  });
  it('rejects false attachment location, out-of-bounds coordinates and missing evidence', () => {
    expect(() =>
      createEarDetailReviewRecord(
        {
          ...input(),
          imageLeft: { ...input().imageLeft, attachment: { status: 'unknown', point: [0.2, 0.2] } },
        },
        opts,
      ),
    ).toThrow('EAR_DETAIL_REVIEW_INVALID');
    expect(() =>
      createEarDetailReviewRecord(
        {
          ...input(),
          imageLeft: {
            ...input().imageLeft,
            outerRim: {
              status: 'marked',
              segments: [
                [
                  [1.1, 0.2],
                  [0.1, 0.2],
                ],
              ],
            },
          },
        },
        opts,
      ),
    ).toThrow('EAR_DETAIL_REVIEW_INVALID');
    expect(() =>
      createEarDetailReviewRecord(input(), { ...opts, captureRef: '../capture-01' }),
    ).toThrow('EAR_DETAIL_REVIEW_INVALID');
  });
  it('requires immutable unprivileged record rights during private restore', () => {
    const base = create();
    const stored = {
      schemaVersion: EAR_DETAIL_REVIEW_SCHEMA_VERSION,
      records: { 'capture-01': base },
    };
    expect(
      validateEarDetailReviewStore(stored, [{ captureRef: 'capture-01', viewRole: 'frontal' }])
        .records['capture-01'],
    ).toEqual(base);
    expect(() =>
      validateEarDetailReviewStore(stored, [{ captureRef: 'capture-01', viewRole: 'profile' }]),
    ).toThrow('EAR_DETAIL_REVIEW_STORE_INVALID');
    expect(() =>
      validateEarDetailReviewStore(
        {
          ...stored,
          records: { 'capture-01': { ...base, earProjectionMeasured: true } },
        },
        [{ captureRef: 'capture-01', viewRole: 'frontal' }],
      ),
    ).toThrow('EAR_DETAIL_REVIEW_STORE_INVALID');
    expect(() =>
      validateEarDetailReviewStore(stored, [{ captureRef: 'capture-02', viewRole: 'frontal' }]),
    ).toThrow('EAR_DETAIL_REVIEW_STORE_INVALID');
  });
  it('only presents local annotations, not raw source file hashes or paths', () => {
    const ui = projectEarDetailReviewForUi(create());
    expect(JSON.stringify(ui)).not.toContain(opts.sourceSha256);
    expect(JSON.stringify(ui)).not.toContain('sourceSha256');
    expect(JSON.stringify(ui)).not.toContain('sourcePath');
    expect(ui.earProjectionMeasured).toBe(false);
  });
});
