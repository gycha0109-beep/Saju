import { describe, expect, it } from 'vitest';
import { measureVisibleEyeClassProfile } from '../tools/face-reading/two-view/visible-eye-class-profile.mjs';
import { createEyelidContourReviewRecord } from '../tools/face-reading/two-view/eyelid-contour-human-review.mjs';
import {
  compareEyeClassEnvelopeToHumanUpperMargin,
  EYELID_UPPER_EDGE_COMPARISON_VERSION,
} from '../tools/face-reading/two-view/eyelid-model-human-upper-edge.mjs';

const size = 24;
function model() {
  const mask = new Uint8Array(size * size);
  for (let y = 5; y <= 8; y++) for (let x = 4; x <= 8; x++) mask[y * size + x] = 4;
  for (let y = 6; y <= 10; y++) for (let x = 15; x <= 20; x++) mask[y * size + x] = 5;
  return measureVisibleEyeClassProfile(mask, size);
}
const unused = () => ({ status: 'unknown' as const, segments: [] });
const drawn = (points: number[][]) => ({ status: 'marked' as const, segments: [points] });
const left = [
  [0.2, 0.3],
  [0.3, 0.26],
  [0.35, 0.28],
];
const right = [
  [0.67, 0.28],
  [0.72, 0.3],
  [0.8, 0.31],
];
function human() {
  return createEyelidContourReviewRecord(
    {
      imageLeft: { upperLidMargin: drawn(left), creaseLine: unused(), hoodingBoundary: unused() },
      imageRight: { upperLidMargin: drawn(right), creaseLine: unused(), hoodingBoundary: unused() },
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-08T00:00:00Z',
    },
  );
}
function compare(m: unknown = model(), h: unknown = human()) {
  return compareEyeClassEnvelopeToHumanUpperMargin(m, h);
}
describe('same-original eye-class upper envelope vs marked upper-lid margin', () => {
  it('compares only shared horizontal span of each screen side and remains research only', () => {
    const r = compare();
    expect(r).toMatchObject({
      methodVersion: EYELID_UPPER_EDGE_COMPARISON_VERSION,
      status: 'available',
      candidateOnly: true,
      singleReviewerUnverified: true,
      modelHumanAgreementValidated: false,
      actualAnatomicalUpperLidValidated: false,
      eyelidCreaseDetected: false,
      hoodingBoundaryDetected: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (r.imageLeft.status !== 'available' || r.imageRight.status !== 'available')
      throw Error('EXPECTED_SYNTHETIC_COMPARISON');
    expect(r.imageLeft.modelEyeClassTopToImageHeight).toBeCloseTo(5 / size);
    expect(r.imageLeft.drawnUpperMarginTopToImageHeight).toBeCloseTo(0.26);
    expect(r.imageLeft.signedDrawnMinusModelTopToImageHeight).toBeCloseTo(0.26 - 5 / size);
    expect(r.imageRight.modelEyeClassTopToImageHeight).toBeCloseTo(6 / size);
    expect(r.imageRight.drawnUpperMarginTopToImageHeight).toBeCloseTo(0.28);
    expect(JSON.stringify(r)).not.toMatch(/sourceSha|captureRef|segments|vertices|rawCoordinates/);
  });
  it('keeps the other supported eye when one human margin is obscured', () => {
    const h = human();
    const r = compare(model(), {
      ...h,
      imageRight: {
        ...h.imageRight,
        upperLidMargin: { status: 'occluded', segments: [] },
      },
    });
    expect(r.status).toBe('partial');
    expect(r.imageLeft.status).toBe('available');
    expect(r.imageRight).toMatchObject({
      status: 'unavailable',
      reason: 'COMPLETE_SINGLE_UPPER_MARGIN_REQUIRED',
    });
  });
  it('does not extrapolate an unmatched manual stroke beyond horizontal overlap', () => {
    const h = human();
    const r = compare(model(), {
      ...h,
      imageLeft: {
        ...h.imageLeft,
        upperLidMargin: drawn([
          [0.03, 0.2],
          [0.09, 0.19],
        ]),
      },
    });
    expect(r.imageLeft).toMatchObject({
      status: 'unavailable',
      reason: 'NO_SHARED_HORIZONTAL_COVERAGE',
    });
    expect(r.status).toBe('partial');
  });
  it('withholds partial, multi-stroke and nonmonotonic markings', () => {
    const h = human();
    for (const upperLidMargin of [
      { status: 'partial', segments: [left] },
      { status: 'marked', segments: [left, left] },
      drawn([
        [0.2, 0.3],
        [0.3, 0.31],
        [0.29, 0.32],
      ]),
    ]) {
      const r = compare(model(), { ...h, imageLeft: { ...h.imageLeft, upperLidMargin } });
      expect(r.imageLeft.status).toBe('unavailable');
      expect(r.imageRight.status).toBe('available');
    }
  });
  it('rejects out-of-bounds and incorrectly assigned screen-side lines', () => {
    const h = human();
    for (const points of [
      [
        [-0.01, 0.2],
        [0.2, 0.2],
      ],
      [
        [0.7, 0.2],
        [0.8, 0.2],
      ],
      [
        [0.2, 0.2],
        [0.5, 0.2],
      ],
    ]) {
      const r = compare(model(), {
        ...h,
        imageLeft: { ...h.imageLeft, upperLidMargin: drawn(points) },
      });
      expect(r.imageLeft.status).toBe('unavailable');
    }
  });
  it('rejects missing, stale or forged model and human authority', () => {
    const h = human();
    expect(compare(model(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_EYELID_REVIEW_NOT_RECORDED',
    });
    for (const altered of [
      { ...model(), methodVersion: 'future' },
      { ...model(), actualEyelidValidated: true },
      { ...model(), accuracyValidated: true },
      { ...model(), source: 'unverified' },
      { ...model(), imageLeftTopToImageHeight: Infinity },
    ]) {
      const r = compare(altered, h);
      expect(r.status === 'unavailable' || r.imageLeft.status === 'unavailable').toBe(true);
    }
    for (const altered of [
      { ...h, canonicalF0Admitted: true },
      { ...h, traditionalBindingAuthorized: true },
      { ...h, independentAccuracyValidated: true },
    ])
      expect(compare(model(), altered)).toMatchObject({
        status: 'unavailable',
        reason: 'HUMAN_AUTHORITY_INVALID',
      });
  });
});
