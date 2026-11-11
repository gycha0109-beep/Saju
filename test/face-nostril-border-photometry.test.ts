import { describe, expect, it } from 'vitest';
import { createNoseDetailReviewRecord } from '../tools/face-reading/two-view/nose-detail-review.mjs';
import {
  measureHumanMarkedNostrilBorderPhotometry,
  NOSTRIL_BORDER_PHOTOMETRY_VERSION,
} from '../tools/face-reading/two-view/nostril-border-photometry.mjs';

const width = 128,
  height = 96;
const left: number[][] = [
  [0.2, 0.42],
  [0.3, 0.42],
  [0.3, 0.58],
  [0.2, 0.58],
  [0.2, 0.42],
];
const right: number[][] = left.map(([x, y]) => [(x ?? 0) + 0.48, y ?? 0]);
const marked = (points: number[][], status: 'marked' | 'partial' = 'marked') => ({
  status,
  segments: [points],
});
const absent = () => ({ status: 'unknown' as const, segments: [] });
function reviewed() {
  return createNoseDetailReviewRecord(
    {
      tip: { status: 'unknown', point: null },
      imageLeftAlar: absent(),
      imageRightAlar: absent(),
      imageLeftNostril: marked(left),
      imageRightNostril: marked(right),
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-11T07:30:00Z',
    },
  );
}
function photo(): Uint8ClampedArray {
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const xn = x / (width - 1),
        yn = y / (height - 1);
      const dark = yn > 0.42 && yn < 0.58 && ((xn > 0.2 && xn < 0.3) || (xn > 0.68 && xn < 0.78));
      const k = (y * width + x) * 4;
      rgba[k] = rgba[k + 1] = rgba[k + 2] = dark ? 35 : 230;
      rgba[k + 3] = 255;
    }
  return rgba;
}
function measure(human: unknown = reviewed(), rgba: ArrayLike<number> = photo()) {
  return measureHumanMarkedNostrilBorderPhotometry({ rgba, width, height, human });
}
describe('local source-image contrast across human marked nostril rims', () => {
  it('measures 2D inside/outside pixel brightness on both closed screen-side contours without anatomical authority', () => {
    const actual = measure();
    expect(actual).toMatchObject({
      methodVersion: NOSTRIL_BORDER_PHOTOMETRY_VERSION,
      status: 'available',
      candidateOnly: true,
      manualContourRequired: true,
      anatomicalNostrilInteriorIdentified: false,
      anatomicalNostrilExteriorIdentified: false,
      anatomicalBoundaryAccuracyValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    for (const side of [actual.imageLeft, actual.imageRight]) {
      if (!side || side.status !== 'available') throw Error('EXPECTED_SYNTHETIC_CONTRAST');
      expect(side.comparedPairs).toBe(4);
      expect(side.meanOutsideMinusInsideSrgbLuma).toBeGreaterThan(0.6);
      expect(side.meanAbsoluteSrgbLumaDifference).toBeGreaterThan(0.6);
    }
    expect(JSON.stringify(actual)).not.toMatch(
      /sourceSha256|captureRef|segments|sourcePath|rawPixels|landmarks|revision/,
    );
  });
  it('does not equate a dark outside pixel with proof of an anatomical nostril', () => {
    const rgba = photo();
    for (let i = 0; i < rgba.length; i += 4) {
      rgba[i] = rgba[i + 1] = rgba[i + 2] = 255 - (rgba[i] ?? 0);
    }
    const actual = measure(reviewed(), rgba);
    if (actual.imageLeft?.status !== 'available') throw Error('EXPECTED_PHOTO_SAMPLE');
    expect(actual.imageLeft.meanOutsideMinusInsideSrgbLuma).toBeLessThan(-0.6);
    expect(actual.anatomicalNostrilInteriorIdentified).toBe(false);
  });
  it('holds only a missing, occluded, or partially drawn side without reconstructing its boundary', () => {
    const review = reviewed();
    for (const replacement of [
      absent(),
      { status: 'occluded', segments: [] },
      marked(left, 'partial'),
    ]) {
      const actual = measure({ ...review, imageLeftNostril: replacement });
      expect(actual.status).toBe('partial');
      expect(actual.imageLeft).toMatchObject({
        status: 'unavailable',
        reason: 'ONE_COMPLETE_MARKED_CONTOUR_REQUIRED',
      });
      expect(actual.imageRight?.status).toBe('available');
    }
  });
  it('withholds open, self-crossing, off-side and tiny hand-drawn contours', () => {
    const review = reviewed();
    const cases = [
      {
        points: [
          [0.2, 0.42],
          [0.25, 0.4],
          [0.3, 0.42],
          [0.3, 0.58],
          [0.2, 0.58],
        ],
        reason: 'VISIBLE_CLOSED_RIM_REQUIRED',
      },
      {
        points: [
          [0.2, 0.42],
          [0.3, 0.58],
          [0.2, 0.58],
          [0.3, 0.42],
          [0.2, 0.42],
        ],
        reason: 'CONTOUR_SELF_INTERSECTION',
      },
      { points: right, reason: 'IMAGE_SIDE_MISMATCH' },
      {
        points: [
          [0.2, 0.42],
          [0.201, 0.42],
          [0.201, 0.421],
          [0.2, 0.421],
          [0.2, 0.42],
        ],
        reason: 'CONTOUR_EDGE_DEGENERATE',
      },
    ];
    for (const { points, reason } of cases) {
      const actual = measure({ ...review, imageLeftNostril: marked(points) });
      expect(actual.imageLeft).toMatchObject({ status: 'unavailable', reason });
      expect(actual.imageRight?.status).toBe('available');
    }
  });
  it('keeps unclipped partial image evidence unavailable and never uses stale authorization', () => {
    const rgba = photo();
    rgba[(Math.floor(0.42 * (height - 1)) * width + Math.floor(0.25 * (width - 1))) * 4 + 3] = 0;
    const old = measure({ ...reviewed(), canonicalF0Admitted: true });
    expect(old).toMatchObject({ status: 'unavailable', reason: 'HUMAN_REVIEW_AUTHORITY_INVALID' });
    expect(measure(null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_NOSE_REVIEW_NOT_RECORDED',
    });
    expect(() => measure(reviewed(), new Uint8ClampedArray(8))).toThrow(
      'NOSTRIL_IMAGE_FRAME_INVALID',
    );
    expect(measure(reviewed(), rgba).anatomicalNostrilExteriorIdentified).toBe(false);
  });
});
