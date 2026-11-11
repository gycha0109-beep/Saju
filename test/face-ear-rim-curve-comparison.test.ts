import { describe, expect, it } from 'vitest';
import { createEarDetailReviewRecord } from '../tools/face-reading/two-view/ear-detail-review.mjs';
import {
  compareEarMaskBoundaryToHumanOuterRim,
  EAR_RIM_CURVE_COMPARISON_VERSION,
} from '../tools/face-reading/two-view/ear-rim-curve-comparison.mjs';
const width = 100,
  height = 80;
const left = [
  [0.105, 0.2],
  [0.105, 0.4],
  [0.105, 0.67],
];
const right = [
  [0.89, 0.2],
  [0.89, 0.4],
  [0.89, 0.67],
];
const line = (pts: number[][], status: 'marked' | 'partial' = 'marked') => ({
  status,
  segments: [pts],
});
const blank = () => ({ status: 'unknown' as const, segments: [] });
function makeSide(points: number[][]) {
  return {
    outerRim: line(points),
    lobe: blank(),
    attachment: { status: 'unknown' as const, point: null },
  };
}
function human() {
  return createEarDetailReviewRecord(
    { imageLeft: makeSide(left), imageRight: makeSide(right) },
    {
      captureRef: 'capture-02',
      sourceSha256: 'a'.repeat(64),
      viewRole: 'frontal',
      revision: 1,
      reviewedAt: '2026-11-11T00:00:00Z',
    },
  );
}
function earMask() {
  const mask = new Uint8Array(width * height);
  for (let y = 15; y <= 55; y++) for (let x = 10; x <= 24; x++) mask[y * width + x] = 1;
  for (let y = 15; y <= 55; y++) for (let x = 74; x <= 89; x++) mask[y * width + x] = 1;
  return mask;
}
const run = (extra: Record<string, unknown> = {}) =>
  compareEarMaskBoundaryToHumanOuterRim({
    mask: earMask(),
    width,
    height,
    imageWidth: 400,
    imageHeight: 320,
    human: human(),
    ...extra,
  });
describe('visible whole-ear model class vs independent local outer-rim stroke geometry', () => {
  it('compares each human stroke with actual projected model border pixels, with no anatomical approval', () => {
    const r = run();
    expect(r).toMatchObject({
      methodVersion: EAR_RIM_CURVE_COMPARISON_VERSION,
      status: 'available',
      candidateOnly: true,
      singleReviewerUnverified: true,
      drawingCoverageCertified: false,
      anatomicalOuterRimValidated: false,
      modelHumanAgreementValidated: false,
      independentAccuracyValidated: false,
      earThicknessMeasured: false,
      earProjectionMeasured: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    for (const side of [r.imageLeft, r.imageRight]) {
      if (!side || side.status !== 'available') throw Error('EXPECTED_CURVE_COMPARISON');
      expect(side.comparedStrokeArcSamples).toBe(5);
      expect(side.meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal).toBeLessThan(0.04);
    }
    expect(JSON.stringify(r)).not.toMatch(
      /captureRef|sourceSha256|rawMask|sourcePath|landmarks|segments|vertices|reviewedAt/,
    );
  });
  it('measures a shifted human curve as more distant without inventing an accuracy threshold', () => {
    const close = run();
    const moved = run({
      human: {
        ...human(),
        imageLeft: {
          ...human().imageLeft,
          outerRim: line([
            [0.32, 0.2],
            [0.32, 0.4],
            [0.32, 0.67],
          ]),
        },
      },
    });
    if (close.imageLeft?.status !== 'available' || moved.imageLeft?.status !== 'available')
      throw Error('EXPECTED_DISTANCES');
    expect(moved.imageLeft.meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal).toBeGreaterThan(
      close.imageLeft.meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal,
    );
    expect(moved.anatomicalOuterRimValidated).toBe(false);
  });
  it('is drawing-direction invariant and ignores lobe/attachment anatomy', () => {
    const normal = run(),
      reversed = run({
        human: {
          ...human(),
          imageLeft: { ...human().imageLeft, outerRim: line([...left].reverse()) },
        },
      });
    if (normal.imageLeft?.status !== 'available' || reversed.imageLeft?.status !== 'available')
      throw Error('MISSING_SIDE');
    expect(reversed.imageLeft.meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal).toBeCloseTo(
      normal.imageLeft.meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal,
    );
  });
  it('withholds one partially drawn or covered ear while preserving the other side', () => {
    const h = human();
    for (const replacement of [
      line(left, 'partial'),
      { status: 'occluded', segments: [] },
      blank(),
    ]) {
      const result = run({ human: { ...h, imageLeft: { ...h.imageLeft, outerRim: replacement } } });
      expect(result.status).toBe('partial');
      expect(result.imageLeft).toMatchObject({
        status: 'unavailable',
        reason: 'FULL_SINGLE_VISIBLE_OUTER_RIM_STROKE_REQUIRED',
      });
      expect(result.imageRight?.status).toBe('available');
    }
  });
  it('withholds off-side, clipped or malformed model and human evidence', () => {
    const h = human();
    expect(
      run({ human: { ...h, imageLeft: { ...h.imageLeft, outerRim: line(right) } } }).imageLeft,
    ).toMatchObject({
      status: 'unavailable',
      reason: 'FULL_SINGLE_VISIBLE_OUTER_RIM_STROKE_REQUIRED',
    });
    expect(run({ human: { ...h, canonicalF0Admitted: true } })).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_EAR_SOURCE_AUTHORITY_INVALID',
    });
    expect(run({ human: { ...h, viewRole: 'profile' } }).status).toBe('unavailable');
    const clipped = earMask();
    for (let y = 15; y <= 55; y++) clipped[y * width] = 1;
    expect(run({ mask: clipped }).status).toBe('unavailable');
    expect(() => run({ mask: new Uint8Array(3) })).toThrow('EAR_RIM_CURVE_INPUT_INVALID');
  });
});
