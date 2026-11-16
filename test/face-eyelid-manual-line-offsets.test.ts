import { describe, expect, it } from 'vitest';
import { createEyelidContourReviewRecord } from '../tools/face-reading/two-view/eyelid-contour-human-review.mjs';
import { measureManualEyelidLineOffsets } from '../tools/face-reading/two-view/eyelid-manual-line-offsets.mjs';

const line = (coords: number[][], status: 'marked' | 'partial' = 'marked') => ({
  status,
  segments: [coords],
});
const empty = () => ({ status: 'unknown' as const, segments: [] });
const lid: [number, number][] = [
  [0.11, 0.34],
  [0.18, 0.32],
  [0.26, 0.34],
  [0.34, 0.35],
];
const crease: [number, number][] = [
  [0.11, 0.29],
  [0.18, 0.28],
  [0.26, 0.29],
  [0.34, 0.3],
];
const hood: [number, number][] = [
  [0.11, 0.3],
  [0.18, 0.31],
  [0.26, 0.32],
  [0.34, 0.33],
];
const rightLid = lid.map(([x, y]) => [x + 0.52, y]);
const rightCrease = crease.map(([x, y]) => [x + 0.52, y]);

function review() {
  return createEyelidContourReviewRecord(
    {
      imageLeft: {
        upperLidMargin: line(lid),
        creaseLine: line(crease),
        hoodingBoundary: line(hood),
      },
      imageRight: {
        upperLidMargin: line(rightLid),
        creaseLine: line(rightCrease),
        hoodingBoundary: empty(),
      },
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-11T00:00:00Z',
    },
  );
}

describe('manual image-plane eyelid crease and hooding line offsets', () => {
  it('samples three shared X locations without inferring an eyelid type or persisting coordinates', () => {
    const output = measureManualEyelidLineOffsets(review());
    expect(output).toMatchObject({
      status: 'partial',
      candidateOnly: true,
      manualDrawingOnly: true,
      anatomicalFoldTypeIdentified: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
      independentAccuracyValidated: false,
    });
    const left = output.imageLeft?.creaseToUpperMargin;
    if (left?.status !== 'available') throw Error('EXPECTED_CREASE_SAMPLES');
    expect(left.signedOtherMinusUpperAtSharedQuartilesToImageHeight).toHaveLength(3);
    expect(left.signedOtherMinusUpperAtSharedQuartilesToImageHeight.every((n) => n < 0)).toBe(true);
    expect(output.imageRight?.hoodingToUpperMargin).toMatchObject({ status: 'unavailable' });
    expect(JSON.stringify(output)).not.toMatch(/capture-01|sourceSha|segments|revision|reviewedAt/);
  });
  it('is invariant to drawing direction', () => {
    const source = review();
    const reversed = {
      ...source,
      imageLeft: {
        ...source.imageLeft,
        upperLidMargin: line([...lid].reverse()),
        creaseLine: line([...crease].reverse()),
      },
    };
    const a = measureManualEyelidLineOffsets(source);
    const b = measureManualEyelidLineOffsets(reversed);
    expect(b.imageLeft?.creaseToUpperMargin).toEqual(a.imageLeft?.creaseToUpperMargin);
  });
  it('restricts incomplete X overlap and never extrapolates outside the annotation', () => {
    const source = review();
    const partial = measureManualEyelidLineOffsets({
      ...source,
      imageLeft: {
        ...source.imageLeft,
        creaseLine: line([
          [0.18, 0.28],
          [0.26, 0.29],
        ]),
      },
    });
    expect(partial.imageLeft?.creaseToUpperMargin).toMatchObject({
      status: 'partial',
      fullBothLinesHorizontalCoverage: false,
    });
    const blocked = measureManualEyelidLineOffsets({
      ...source,
      imageLeft: {
        ...source.imageLeft,
        creaseLine: line([
          [0.38, 0.3],
          [0.42, 0.29],
        ]),
      },
    });
    expect(blocked.imageLeft?.creaseToUpperMargin).toMatchObject({
      status: 'unavailable',
      reason: 'NO_SHARED_HORIZONTAL_SPAN',
    });
  });
  it('withholds partial, occluded, multi-stroke, nonmonotonic and off-side marks independently', () => {
    const source = review();
    const rejected = [
      line(crease, 'partial'),
      { status: 'occluded', segments: [] },
      { status: 'marked', segments: [crease, crease] },
      line([
        [0.11, 0.2],
        [0.22, 0.2],
        [0.19, 0.21],
      ]),
      line([
        [0.65, 0.2],
        [0.7, 0.21],
      ]),
    ];
    for (const mark of rejected) {
      const measured = measureManualEyelidLineOffsets({
        ...source,
        imageLeft: { ...source.imageLeft, creaseLine: mark },
      });
      expect(measured.imageLeft?.creaseToUpperMargin?.status).toBe('unavailable');
      expect(measured.imageRight?.creaseToUpperMargin?.status).toBe('available');
    }
  });
  it('rejects fabricated admission and absent review', () => {
    expect(measureManualEyelidLineOffsets(null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_REVIEW_NOT_RECORDED',
    });
    expect(
      measureManualEyelidLineOffsets({ ...review(), canonicalF0Admitted: true }),
    ).toMatchObject({ status: 'unavailable', reason: 'HUMAN_AUTHORITY_INVALID' });
    expect(
      measureManualEyelidLineOffsets({ ...review(), modelTrainingAuthorized: true }),
    ).toMatchObject({ status: 'unavailable', reason: 'HUMAN_AUTHORITY_INVALID' });
  });
});
