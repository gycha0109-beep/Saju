import { describe, expect, it } from 'vitest';
import { createLipBorderHumanReviewRecord } from '../tools/face-reading/two-view/lip-border-human-review.mjs';
import {
  measureManualPhiltrumRidgeSpacing,
  PHILTRUM_MANUAL_SPACING_VERSION,
} from '../tools/face-reading/two-view/philtrum-manual-ridge-spacing.mjs';

const marked = (points: number[][]) => ({ status: 'marked' as const, segments: [points] });
const unknown = () => ({ status: 'unknown' as const, segments: [] });
const left = [[0.43, 0.34], [0.42, 0.39], [0.43, 0.44]];
const right = [[0.56, 0.34], [0.58, 0.39], [0.57, 0.44]];
function human() {
  return createLipBorderHumanReviewRecord(
    {
      upperLipBorder: unknown(),
      lowerLipBorder: unknown(),
      philtrumImageLeft: marked(left),
      philtrumImageRight: marked(right),
      imageLeftMouthCorner: { status: 'marked', point: [0.25, 0.54] },
      imageRightMouthCorner: { status: 'marked', point: [0.75, 0.54] },
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-11T00:00:00Z',
    },
  );
}
const measure = (review: unknown = human()) => measureManualPhiltrumRidgeSpacing(review);

describe('private visible philtrum ridge drawing spacing, not anatomical measurement', () => {
  it('samples only shared manual coverage, without private evidence or admission', () => {
    const result = measure();
    expect(result).toMatchObject({
      methodVersion: PHILTRUM_MANUAL_SPACING_VERSION,
      status: 'available',
      candidateOnly: true,
      manualDrawingOnly: true,
      singleReviewerUnverified: true,
      actualPhiltrumWidthValidated: false,
      actualPhiltrumLengthMeasured: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (result.status !== 'available') throw Error('EXPECTED_SYNTHETIC_AVAILABLE');
    expect(result.drawnRidgeSpacingToMarkedMouthWidth).toHaveLength(3);
    expect(result.drawnRidgeSpacingToMarkedMouthWidth[1]).toBeCloseTo(0.32);
    expect(result.sharedDrawnYRangeToImageHeight).toBeCloseTo(0.1);
    expect(JSON.stringify(result)).not.toMatch(
      /"(sourceSha256|captureRef|segments|point|originalPath|sourcePath)"/,
    );
  });
  it('supports either drawing direction but does not infer anatomical laterality', () => {
    const review = human();
    expect(
      measure({
        ...review,
        philtrumImageLeft: marked([...left].reverse()),
        philtrumImageRight: marked([...right].reverse()),
      }).status,
    ).toBe('available');
  });
  it('withholds both ridges when either side is occluded or partial', () => {
    const review = human();
    for (const side of ['philtrumImageLeft', 'philtrumImageRight'] as const) {
      expect(
        measure({ ...review, [side]: { status: 'occluded', segments: [] } }),
      ).toMatchObject({
        status: 'unavailable',
        reason: 'TWO_COMPLETE_MONOTONIC_RIDGE_STROKES_REQUIRED',
      });
    }
  });
  it('withholds when two drawn vertical intervals do not overlap', () => {
    const review = human();
    expect(
      measure({
        ...review,
        philtrumImageRight: marked([[0.56, 0.48], [0.57, 0.54]]),
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'NO_INTERIOR_SHARED_VERTICAL_RANGE' });
  });
  it('withholds crossing, backtracking and out-of-bounds strokes', () => {
    const review = human();
    expect(
      measure({
        ...review,
        philtrumImageLeft: marked([[0.43, 0.34], [0.61, 0.39], [0.63, 0.44]]),
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'RIDGE_STROKES_CROSS_OR_REVERSE' });
    for (const line of [
      [[0.43, 0.34], [0.43, 0.43], [0.43, 0.4]],
      [[1.2, 0.34], [1.3, 0.44]],
    ]) {
      expect(measure({ ...review, philtrumImageLeft: marked(line) }).status).toBe('unavailable');
    }
  });
  it('requires marked mouth corners and rejects a drawing outside the mouth span', () => {
    const review = human();
    expect(
      measure({
        ...review,
        imageLeftMouthCorner: { status: 'unknown', point: null },
      }),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'MARKED_MOUTH_WIDTH_REFERENCE_REQUIRED',
    });
    expect(
      measure({
        ...review,
        imageLeftMouthCorner: { status: 'marked', point: [0.45, 0.54] },
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'RIDGE_OUTSIDE_MARKED_MOUTH_SPAN' });
  });
  it('rejects unsupported additional strokes and forged approval', () => {
    const review = human();
    expect(
      measure({
        ...review,
        philtrumImageLeft: { status: 'marked', segments: [left, left] },
      }).status,
    ).toBe('unavailable');
    for (const altered of [
      { ...review, independentAccuracyValidated: true },
      { ...review, modelTrainingAuthorized: true },
      { ...review, canonicalF0Admitted: true },
    ]) {
      expect(measure(altered)).toMatchObject({
        status: 'unavailable',
        reason: 'HUMAN_REVIEW_AUTHORITY_INVALID',
      });
    }
  });
});
