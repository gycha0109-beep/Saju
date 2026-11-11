import { describe, expect, it } from 'vitest';
import {
  JAW_CONTOUR_REVIEW_VERSION,
  JAW_CONTOUR_STATES,
  createJawContourReviewRecord,
  validateJawContourReviewStore,
  projectJawContourReviewForUi,
} from '../tools/face-reading/two-view/jaw-contour-human-review.mjs';
import type { JawContourSegment } from '../tools/face-reading/two-view/jaw-contour-human-review.mjs';

const outline = (): JawContourSegment => ({
  status: 'marked' as const,
  segments: [
    [
      [0.2, 0.64],
      [0.35, 0.78],
      [0.5, 0.85],
      [0.65, 0.78],
      [0.8, 0.64],
    ],
  ],
});
const options = {
  captureRef: 'capture-01',
  sourceSha256: 'a'.repeat(64),
  revision: 1,
  reviewedAt: '2026-11-11T03:00:00Z',
};
const create = () => createJawContourReviewRecord({ visibleLowerFaceOutline: outline() }, options);

describe('private original-photo human lower-face visible outline', () => {
  it('stores only one screen-plane visible contour with all governance flags false', () => {
    expect(JAW_CONTOUR_REVIEW_STATES_SORTED()).toEqual([...JAW_CONTOUR_STATES].sort());
    const review = create();
    expect(review).toMatchObject({
      schemaVersion: JAW_CONTOUR_REVIEW_VERSION,
      viewRole: 'frontal',
      coordinateFrame: 'normalized_original_image_screen_sides',
      visibleLowerFaceOutline: { status: 'marked' },
      humanReviewed: true,
      independentAccuracyValidated: false,
      actualJawAnatomyValidated: false,
      boneShapeInferred: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    const ui = projectJawContourReviewForUi(review);
    expect(ui.visibleLowerFaceOutline).toEqual(review.visibleLowerFaceOutline);
    expect(JSON.stringify(ui)).not.toMatch(/sourceSha256|captureRef|sourcePath|filename/);
  });
  it('restores only known captures and validates private original binding', () => {
    const review = create();
    const store = { schemaVersion: JAW_CONTOUR_REVIEW_VERSION, records: { 'capture-01': review } };
    const result = validateJawContourReviewStore(store, ['capture-01', 'capture-02']);
    expect(Object.keys(result.records)).toEqual(['capture-01']);
    expect(() => validateJawContourReviewStore(store, ['capture-02'])).toThrow(
      'JAW_CONTOUR_REVIEW_INVALID',
    );
    expect(() =>
      validateJawContourReviewStore(
        {
          ...store,
          records: { 'capture-02': review },
        },
        ['capture-02'],
      ),
    ).toThrow('JAW_CONTOUR_REVIEW_INVALID');
  });
  it('keeps partial and invisible evidence explicitly without guessing hidden lines', () => {
    for (const status of ['occluded', 'out_of_frame', 'not_visible', 'unknown'] as const) {
      const r = createJawContourReviewRecord(
        { visibleLowerFaceOutline: { status, segments: [] } },
        options,
      );
      expect(r.visibleLowerFaceOutline.segments).toEqual([]);
    }
    const partial = createJawContourReviewRecord(
      {
        visibleLowerFaceOutline: {
          status: 'partial',
          segments: [
            [
              [0.3, 0.8],
              [0.4, 0.85],
            ],
          ],
        },
      },
      options,
    );
    expect(partial.visibleLowerFaceOutline.status).toBe('partial');
  });
  it('rejects zero, multiple marked strokes, X backtracking, duplicate X, and invalid coordinates', () => {
    for (const segments of [
      [],
      [outline().segments[0], outline().segments[0]],
      [
        [
          [0.25, 0.72],
          [0.3, 0.75],
          [0.28, 0.76],
        ],
      ],
      [
        [
          [0.25, 0.72],
          [0.25, 0.76],
        ],
      ],
      [
        [
          [0.25, 0.72],
          [1.2, 0.75],
        ],
      ],
    ]) {
      expect(() =>
        createJawContourReviewRecord(
          {
            visibleLowerFaceOutline: {
              status: 'marked',
              segments: segments as JawContourSegment['segments'],
            },
          },
          options,
        ),
      ).toThrow('JAW_CONTOUR_REVIEW_INVALID');
    }
  });
  it('rejects content tampering, false authority and synthetic metadata', () => {
    const r = create();
    for (const altered of [
      { ...r, actualJawAnatomyValidated: true },
      { ...r, traditionalBindingAuthorized: true },
      { ...r, sourceSha256: 'tampered' },
      { ...r, boneShapeInferred: true },
      { ...r, coordinateFrame: 'crop_aligned' },
      { ...r, viewRole: 'profile' },
      { ...r, extra: 'bypass' },
    ]) {
      expect(() =>
        validateJawContourReviewStore(
          {
            schemaVersion: JAW_CONTOUR_REVIEW_VERSION,
            records: { 'capture-01': altered },
          },
          ['capture-01'],
        ),
      ).toThrow('JAW_CONTOUR_REVIEW_INVALID');
    }
  });
});
function JAW_CONTOUR_REVIEW_STATES_SORTED() {
  return [...JAW_CONTOUR_STATES].sort();
}
