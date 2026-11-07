import { describe, it, expect } from 'vitest';
import { measureVisibleEarMaskSilhouette } from '../tools/face-reading/two-view/visible-ear-mask-silhouette.mjs';
import { createEarDetailReviewRecord } from '../tools/face-reading/two-view/ear-detail-review.mjs';
import {
  compareEarMaskToHumanOuterRim,
  EAR_MODEL_HUMAN_SPAN_VERSION,
} from '../tools/face-reading/two-view/ear-model-human-rim-span.mjs';
const width = 28,
  height = 18;
const region = (mask: Uint8Array, x1: number, y1: number, x2: number, y2: number) => {
  for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) mask[y * width + x] = 1;
};
function mask(pair = true, clip = false) {
  const a = new Uint8Array(width * height);
  region(a, clip ? 0 : 3, 2, 6, 11);
  if (pair) region(a, 21, 3, 24, 12);
  return measureVisibleEarMaskSilhouette(a, width, height);
}
const emptyContour = () => ({ status: 'unknown' as const, segments: [] });
const emptyAttachment = () => ({ status: 'unknown' as const, point: null });
const outline = (points: number[][]) => ({ status: 'marked' as const, segments: [points] });
const leftPoints = [
  [0.12, 0.16],
  [0.22, 0.16],
  [0.22, 0.74],
  [0.12, 0.74],
];
const rightPoints = [
  [0.76, 0.18],
  [0.87, 0.18],
  [0.87, 0.79],
  [0.76, 0.79],
];
function human() {
  return createEarDetailReviewRecord(
    {
      imageLeft: {
        outerRim: outline(leftPoints),
        lobe: emptyContour(),
        attachment: emptyAttachment(),
      },
      imageRight: {
        outerRim: outline(rightPoints),
        lobe: emptyContour(),
        attachment: emptyAttachment(),
      },
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      viewRole: 'frontal',
      revision: 1,
      reviewedAt: '2026-11-08T00:00:00Z',
    },
  );
}
const compare = (m: unknown = mask(), h: unknown = human()) => compareEarMaskToHumanOuterRim(m, h);

describe('private ear model-to-human outer-rim span candidates', () => {
  it('measures screen-side 2D bounding spans, never independent anatomy', () => {
    const r = compare();
    expect(r).toMatchObject({
      status: 'available',
      methodVersion: EAR_MODEL_HUMAN_SPAN_VERSION,
      candidateOnly: true,
      singleReviewerUnverified: true,
      modelHumanAgreementValidated: false,
      anatomicalOuterRimValidated: false,
      independentAccuracyValidated: false,
      anatomicalLateralityAssigned: false,
      earProjectionMeasured: false,
      earThicknessMeasured: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
    });
    if (r.status !== 'available') throw Error('expected synthetic result');
    expect(r.sides).toHaveLength(2);
    expect(r.sides[0]?.imageSide).toBe('imageLeft');
    expect(r.sides[0]?.drawnOuterRimXSpanToImageWidth).toBeCloseTo(0.1);
    expect(r.sides[0]?.modelRegionXSpanToImageWidth).toBeCloseTo(4 / width);
    expect(r.sides[0]?.signedDrawnMinusModelXSpan).toBeCloseTo(0.1 - 4 / width);
    expect(r.sides[1]?.imageSide).toBe('imageRight');
    expect(r.sides[1]?.drawnOuterRimYSpanToImageHeight).toBeCloseTo(0.61);
    expect(r.sides[1]?.modelRegionYSpanToImageHeight).toBeCloseTo(10 / height);
    expect(JSON.stringify(r)).not.toMatch(
      /sourceSha256|captureRef|segments|vertices|maskPixels|rawCoordinates/,
    );
  });
  it('withholds a single/ambiguous region instead of inventing anatomical left/right', () => {
    expect(compare(mask(false))).toMatchObject({
      status: 'unavailable',
      reason: 'TWO_UNAMBIGUOUS_IMAGE_SIDE_REGIONS_REQUIRED',
    });
    const forged = {
      ...mask(),
      regions: mask().regions.map((r, i) => ({
        ...r,
        centerXToImageWidth: i === 0 ? 0.1 : 0.42,
      })),
    };
    expect(compare(forged)).toMatchObject({
      status: 'unavailable',
      reason: 'IMAGE_SIDE_REGION_ASSIGNMENT_AMBIGUOUS',
    });
  });
  it('withholds missing review or clipped model', () => {
    expect(compare(mask(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_EAR_REVIEW_NOT_RECORDED',
    });
    expect(compare(mask(true, true))).toMatchObject({
      status: 'unavailable',
      reason: 'EAR_MASK_REGION_CLIPPED_OR_INVALID',
    });
  });
  it('withholds partial, multi-stroke, clipped and missing human outer-rim lines', () => {
    const x = human();
    expect(
      compare(mask(), {
        ...x,
        imageLeft: {
          ...x.imageLeft,
          outerRim: { status: 'partial', segments: [leftPoints] },
        },
      }),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'TWO_COMPLETE_SINGLE_OUTER_RIM_STROKES_REQUIRED',
    });
    expect(
      compare(mask(), {
        ...x,
        imageLeft: {
          ...x.imageLeft,
          outerRim: outline(leftPoints.slice(0, 2)),
        },
      }).status,
    ).toBe('unavailable');
    expect(
      compare(mask(), {
        ...x,
        imageRight: {
          ...x.imageRight,
          outerRim: { status: 'marked', segments: [rightPoints, rightPoints] },
        },
      }).status,
    ).toBe('unavailable');
    const clipped = leftPoints.map((p) => [p[0] === 0.12 ? 0 : p[0]!, p[1]!]);
    expect(
      compare(mask(), {
        ...x,
        imageLeft: {
          ...x.imageLeft,
          outerRim: outline(clipped),
        },
      }).status,
    ).toBe('unavailable');
  });
  it('rejects human drawing in the wrong image half, without assigning anatomical side', () => {
    const x = human();
    expect(
      compare(mask(), {
        ...x,
        imageLeft: {
          ...x.imageLeft,
          outerRim: outline(rightPoints),
        },
      }),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'ANNOTATED_IMAGE_SIDES_OVERLAP',
    });
  });
  it('rejects forged 3D, anatomical approval, parser or human review authority', () => {
    const x = human();
    for (const obj of [
      { ...mask(), projectionMeasured: true },
      { ...mask(), anatomicalLateralityAssigned: true },
      { ...mask(), methodVersion: 'future-ear-mask' },
    ])
      expect(compare(obj, x).status).toBe('unavailable');
    expect(compare(mask(), { ...x, independentAccuracyValidated: true }).status).toBe(
      'unavailable',
    );
    expect(compare(mask(), { ...x, viewRole: 'profile' }).status).toBe('unavailable');
  });
  it('rejects malformed nonfinite model geometry', () => {
    const x = mask();
    const forged = {
      ...x,
      regions: [{ ...x.regions[0], visibleMaskWidthToImageWidth: Infinity }, x.regions[1]],
    };
    expect(compare(forged).status).toBe('unavailable');
  });
});
