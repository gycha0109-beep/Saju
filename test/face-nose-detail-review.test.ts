import { describe, expect, it } from 'vitest';
import {
  NOSE_DETAIL_REVIEW_SCHEMA_VERSION,
  NOSE_CONTOUR_PARTS,
  createNoseDetailReviewRecord,
  validateNoseDetailReviewStore,
  projectNoseDetailReviewForUi,
} from '../tools/face-reading/two-view/nose-detail-review.mjs';

const blank = () => ({ status: 'unknown' as const, segments: [] });
const line = () => ({
  status: 'marked' as const,
  segments: [
    [
      [0.35, 0.62],
      [0.37, 0.63],
    ],
  ],
});
const input = () => ({
  tip: { status: 'marked' as const, point: [0.5, 0.6] },
  imageLeftAlar: line(),
  imageRightAlar: blank(),
  imageLeftNostril: blank(),
  imageRightNostril: blank(),
});
const options = {
  captureRef: 'capture-01',
  sourceSha256: 'c'.repeat(64),
  revision: 1,
  reviewedAt: '2026-11-07T00:00:00.000Z',
};
const make = () => createNoseDetailReviewRecord(input(), options);

describe('local detailed nose human-reference contract', () => {
  it('captures tip and separately named alar / nostril boundaries in image coordinates', () => {
    const value = make();
    expect(NOSE_CONTOUR_PARTS).toEqual([
      'imageLeftAlar',
      'imageRightAlar',
      'imageLeftNostril',
      'imageRightNostril',
    ]);
    expect(value).toMatchObject({
      tip: { status: 'marked' },
      imageLeftAlar: { status: 'marked' },
      imageRightNostril: { status: 'unknown' },
      coordinateFrame: 'normalized_image_coordinates_not_anatomical_laterality',
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      independentAccuracyValidated: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
  });
  it('supports partial and withheld structures without inventing hidden anatomy', () => {
    const v = createNoseDetailReviewRecord(
      {
        ...input(),
        imageLeftAlar: {
          status: 'partial',
          segments: [
            [
              [0.2, 0.3],
              [0.21, 0.31],
            ],
          ],
        },
        imageRightNostril: { status: 'not_visible', segments: [] },
        tip: { status: 'occluded', point: null },
      },
      options,
    );
    expect(v.imageLeftAlar.status).toBe('partial');
    expect(v.tip.point).toBeNull();
  });
  it('rejects coordinates outside the original image and fabricated tip points', () => {
    expect(() =>
      createNoseDetailReviewRecord(
        {
          ...input(),
          tip: { status: 'unknown', point: [0.5, 0.6] },
        },
        options,
      ),
    ).toThrow('NOSE_DETAIL_REVIEW_INVALID');
    expect(() =>
      createNoseDetailReviewRecord(
        {
          ...input(),
          imageLeftAlar: {
            status: 'marked',
            segments: [
              [
                [0.1, 0.2],
                [1.1, 0.3],
              ],
            ],
          },
        },
        options,
      ),
    ).toThrow('NOSE_DETAIL_REVIEW_INVALID');
  });
  it('rejects visibility / segment contradictions and invalid references', () => {
    expect(() =>
      createNoseDetailReviewRecord(
        {
          ...input(),
          imageRightAlar: { status: 'marked', segments: [] },
        },
        options,
      ),
    ).toThrow('NOSE_DETAIL_REVIEW_INVALID');
    expect(() =>
      createNoseDetailReviewRecord(input(), { ...options, captureRef: '../capture-01' }),
    ).toThrow('NOSE_DETAIL_REVIEW_INVALID');
    expect(() =>
      createNoseDetailReviewRecord(input(), { ...options, sourceSha256: 'invalid' }),
    ).toThrow('NOSE_DETAIL_REVIEW_INVALID');
  });
  it('restores only matching captures without accepting authority escalation', () => {
    const store = {
      schemaVersion: NOSE_DETAIL_REVIEW_SCHEMA_VERSION,
      records: { 'capture-01': make() },
    };
    expect(validateNoseDetailReviewStore(store, ['capture-01']).records['capture-01']).toEqual(
      make(),
    );
    expect(() => validateNoseDetailReviewStore(store, ['capture-02'])).toThrow(
      'NOSE_DETAIL_REVIEW_STORE_INVALID',
    );
    expect(() =>
      validateNoseDetailReviewStore(
        {
          ...store,
          records: { 'capture-01': { ...make(), traditionalBindingAuthorized: true } },
        },
        ['capture-01'],
      ),
    ).toThrow('NOSE_DETAIL_REVIEW_STORE_INVALID');
  });
  it('projects private review geometry to the local screen without source hashes or paths', () => {
    const publicUi = JSON.stringify(projectNoseDetailReviewForUi(make()));
    expect(publicUi).not.toContain(options.sourceSha256);
    expect(publicUi).not.toContain('sourceSha256');
    expect(publicUi).not.toContain('sourcePath');
    expect(publicUi).toContain('imageLeftNostril');
  });
});
