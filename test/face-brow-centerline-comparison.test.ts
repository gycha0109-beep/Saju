import { describe, expect, it } from 'vitest';
import { compareBrowCenterlinesToHumanReview } from '../tools/face-reading/two-view/brow-centerline-comparison.mjs';

const width = 40;
const height = 24;
const imageWidth = 400;
const imageHeight = 240;
function mask() {
  const pixels = new Uint8Array(width * height);
  for (const [from, to] of [
    [4, 12],
    [22, 30],
  ] as [number, number][])
    for (let x = from; x <= to; x++) for (let y = 8; y <= 10; y++) pixels[y * width + x] = 1;
  return pixels;
}
const line = (a: number, b: number, y = 9.5) => [
  [a / width, y / height],
  [b / width, y / height],
];
function human({
  left = { status: 'marked', segments: [line(4.5, 12.5)] },
  right = { status: 'marked', segments: [line(22.5, 30.5)] },
}: {
  left?: { status: string; segments: number[][][] };
  right?: { status: string; segments: number[][][] };
} = {}) {
  return {
    humanReviewed: true as const,
    independentAccuracyValidated: false as const,
    modelTrainingAuthorized: false as const,
    imageLeft: left,
    imageRight: right,
  };
}
function compare(maskInput = mask(), humanReview: ReturnType<typeof human> | null = human()) {
  return compareBrowCenterlinesToHumanReview({
    mask: maskInput,
    width,
    height,
    imageWidth,
    imageHeight,
    humanReview,
  });
}

describe('local mask-column to human eyebrow midline comparison', () => {
  it('keeps exact centreline agreement at zero and compares left/right independently', () => {
    const result = compare();
    expect(result.status).toBe('available');
    expect(result.imageLeft.meanMaskColumnToHumanLineDistancePx).toBeCloseTo(0, 8);
    expect(result.imageRight.meanMaskColumnToHumanLineDistancePx).toBeCloseTo(0, 8);
    expect(result.imageLeft.comparedMaskColumns).toBe(9);
    expect(result.imageRight.totalMaskColumns).toBe(9);
    expect(result).toMatchObject({
      candidateOnly: true,
      singleReviewerUnverified: true,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
  });
  it('reports image-pixel displacement rather than a made-up similarity score', () => {
    const result = compare(
      mask(),
      human({
        left: { status: 'marked', segments: [line(4.5, 12.5, 10.5)] },
        right: { status: 'marked', segments: [line(22.5, 30.5)] },
      }),
    );
    expect(result.imageLeft.meanMaskColumnToHumanLineDistancePx).toBeCloseTo(10, 8);
    expect(result.imageRight.meanMaskColumnToHumanLineDistancePx).toBeCloseTo(0, 8);
  });
  it('uses only horizontally annotated portions for partial centreline references', () => {
    const result = compare(
      mask(),
      human({
        left: { status: 'partial', segments: [line(8.5, 12.5)] },
        right: { status: 'occluded', segments: [] },
      }),
    );
    expect(result.status).toBe('partial');
    expect(result.imageLeft.status).toBe('partial');
    expect(result.imageLeft.comparedMaskColumns).toBe(5);
    expect(result.imageLeft.totalMaskColumns).toBe(9);
    expect(result.imageRight.status).toBe('unavailable');
  });
  it('does not extrapolate off-image or disjoint human lines to a model candidate', () => {
    const result = compare(
      mask(),
      human({
        left: { status: 'marked', segments: [line(15, 18)] },
        right: { status: 'occluded', segments: [] },
      }),
    );
    expect(result.status).toBe('unavailable');
    expect(result.imageLeft.reason).toBe('NO_SHARED_HORIZONTAL_COVERAGE');
  });
  it('does not silently treat absent person review as an accuracy measurement', () => {
    expect(compare(mask(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_REVIEW_UNAVAILABLE',
      independentAccuracyValidated: false,
    });
  });
  it('fails closed for invalid human annotations and authority overrides', () => {
    expect(
      compare(mask(), { ...human(), independentAccuracyValidated: true } as never),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_REVIEW_INVALID',
    });
    expect(
      compare(
        mask(),
        human({
          left: { status: 'marked', segments: [line(-1, 12)] },
        }),
      ),
    ).toMatchObject({ status: 'unavailable', reason: 'HUMAN_REVIEW_INVALID' });
    expect(
      compare(
        mask(),
        human({
          left: { status: 'partial', segments: [] },
        }),
      ),
    ).toMatchObject({ status: 'unavailable', reason: 'HUMAN_REVIEW_INVALID' });
  });
  it('fails closed for fragmented or clipped model masks without discarding the human review', () => {
    const fragmented = mask();
    fragmented[3 * width + 18] = 1;
    expect(compare(fragmented).reason).toBe('MODEL_FRAGMENTED_OR_MULTIPLE_COMPONENTS');
    const clipped = mask();
    clipped[8 * width + 0] = 1;
    clipped[8 * width + 1] = 1;
    clipped[8 * width + 2] = 1;
    clipped[8 * width + 3] = 1;
    expect(compare(clipped).status).toBe('unavailable');
  });
  it('rejects invalid mask geometry instead of guessing image dimensions', () => {
    expect(() =>
      compareBrowCenterlinesToHumanReview({
        mask: mask(),
        width: 40,
        height: 24,
        imageWidth: 0,
        imageHeight,
        humanReview: human(),
      }),
    ).toThrow('BROW_COMPARISON_INPUT_INVALID');
  });
});

describe('candidate-only brow gap versus marked human centreline span', () => {
  const gap = (result: ReturnType<typeof compare>) => result.apparentBrowGapComparison;
  it('compares the image-plane drawn-line gap with the existing model-mask gap', () => {
    const observed = gap(compare());
    expect(observed).toMatchObject({
      status: 'available',
      candidateOnly: true,
      singleReviewerUnverified: true,
      anatomicalInnerBrowEndsValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      drawingCoverageCertified: false,
    });
    if (observed.status !== 'available') throw Error('synthetic mark failed');
    expect(observed.drawnCenterlineGapToMeanDrawnXSpan).toBeCloseTo(10 / 8);
    expect(observed.modelMaskGapToMeanMaskXSpan).toBeCloseTo(9 / 9);
    expect(observed.signedDrawnMinusModelRatio).toBeCloseTo(10 / 8 - 1);
    expect(JSON.stringify(observed)).not.toMatch(
      /captureRef|sourceSha|segment|landmarks|rawCoordinates/,
    );
  });
  it('accepts reverse drawing direction while preserving image-side order', () => {
    const reversed = gap(
      compare(
        mask(),
        human({
          left: { status: 'marked', segments: [line(12.5, 4.5)] },
          right: { status: 'marked', segments: [line(30.5, 22.5)] },
        }),
      ),
    );
    expect(reversed.status).toBe('available');
    if (reversed.status === 'available')
      expect(reversed.drawnCenterlineGapToMeanDrawnXSpan).toBeCloseTo(1.25);
  });
  it('withholds drawn-gap comparison on partial or missing side', () => {
    const partial = gap(
      compare(
        mask(),
        human({
          left: { status: 'partial', segments: [line(4.5, 12.5)] },
        }),
      ),
    );
    expect(partial).toMatchObject({
      status: 'unavailable',
      reason: 'FULL_SINGLE_SEGMENT_PER_BROW_REQUIRED',
      independentAccuracyValidated: false,
    });
    expect(gap(compare(mask(), null))).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_REVIEW_UNAVAILABLE',
    });
  });
  it('withholds fragments, loops and overlapping left/right annotations', () => {
    const fragmented = gap(
      compare(
        mask(),
        human({
          left: { status: 'marked', segments: [line(4.5, 8.5), line(9.5, 12.5)] },
        }),
      ),
    );
    expect(fragmented).toMatchObject({
      status: 'unavailable',
      reason: 'FULL_SINGLE_SEGMENT_PER_BROW_REQUIRED',
    });
    const zigzag = gap(
      compare(
        mask(),
        human({
          left: {
            status: 'marked',
            segments: [
              [
                [4.5 / width, 9.5 / height],
                [10.5 / width, 9.5 / height],
                [8.5 / width, 9.5 / height],
              ],
            ],
          },
        }),
      ),
    );
    expect(zigzag).toMatchObject({
      status: 'unavailable',
      reason: 'ANNOTATION_HORIZONTAL_SPAN_INVALID',
    });
    const overlap = gap(
      compare(
        mask(),
        human({
          left: { status: 'marked', segments: [line(4.5, 28.5)] },
        }),
      ),
    );
    expect(overlap).toMatchObject({
      status: 'unavailable',
      reason: 'ANNOTATED_IMAGE_SIDES_OVERLAP',
    });
  });
  it('never returns a drawn-gap estimate from corrupted/edge-clipped model masks', () => {
    const clipped = mask();
    for (let x = 0; x <= 4; x++) clipped[8 * width + x] = 1;
    expect(gap(compare(clipped)).status).toBe('unavailable');
    expect(
      gap(compare(mask(), { ...human(), independentAccuracyValidated: true } as never)),
    ).toMatchObject({ status: 'unavailable', reason: 'HUMAN_REVIEW_INVALID' });
  });
});
