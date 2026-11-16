import { describe, it, expect } from 'vitest';
import { measureVisibleLipClassProfile } from '../tools/face-reading/two-view/visible-lip-class-profile.mjs';
import { createLipBorderHumanReviewRecord } from '../tools/face-reading/two-view/lip-border-human-review.mjs';
import {
  compareLipClassWidthsToHumanBorders,
  LIP_MODEL_HUMAN_WIDTH_VERSION,
} from '../tools/face-reading/two-view/lip-model-human-width-comparison.mjs';
const size = 18;
function model() {
  const mask = new Uint8Array(size * size);
  for (let y = 4; y < 6; y++) for (let x = 5; x < 11; x++) mask[y * size + x] = 12;
  for (let y = 7; y < 10; y++) for (let x = 4; x < 12; x++) mask[y * size + x] = 13;
  return measureVisibleLipClassProfile(mask, size);
}
const line = (a: number, b: number, y: number) => ({
  status: 'marked' as const,
  segments: [
    [
      [a, y],
      [b, y],
    ],
  ],
});
const unknownLine = () => ({ status: 'unknown' as const, segments: [] });
function human() {
  return createLipBorderHumanReviewRecord(
    {
      upperLipBorder: line(0.3, 0.7, 0.45),
      lowerLipBorder: line(0.25, 0.75, 0.55),
      philtrumImageLeft: unknownLine(),
      philtrumImageRight: unknownLine(),
      imageLeftMouthCorner: { status: 'marked', point: [0.2, 0.5] },
      imageRightMouthCorner: { status: 'marked', point: [0.8, 0.5] },
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-08T00:00:00.000Z',
    },
  );
}
const compare = (m: unknown = model(), h: unknown = human()) =>
  compareLipClassWidthsToHumanBorders(m, h);
describe('screened lip classes and one human lip-border stroke pair', () => {
  it('measures separate upper/lower horizontal-span ratios without authorizing anatomy', () => {
    const result = compare();
    expect(result).toMatchObject({
      status: 'available',
      methodVersion: LIP_MODEL_HUMAN_WIDTH_VERSION,
      candidateOnly: true,
      singleReviewerUnverified: true,
      anatomicalLipBordersValidated: false,
      modelHumanAgreementValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      fullAnatomicalBorderCoverageCertified: false,
    });
    if (result.status !== 'available') throw Error('expected synthetic comparison');
    expect(result.drawnUpperToLowerHorizontalSpanRatio).toBeCloseTo(0.8);
    expect(result.modelClassUpperToLowerHorizontalSpanRatio).toBeCloseTo(0.75);
    expect(result.signedDrawnMinusModelRatio).toBeCloseTo(0.05);
    expect(JSON.stringify(result)).not.toMatch(/sourceSha256|captureRef|segments|maskPixels|point/);
  });
  it('withholds when an actual human border review is unavailable', () => {
    expect(compare(model(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_LIP_BORDER_NOT_RECORDED',
      independentAccuracyValidated: false,
    });
  });
  it('withholds when the pinned model lip classes are absent', () => {
    expect(compare(null, human())).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_LIP_CLASS_NOT_AVAILABLE',
    });
  });
  it('withholds partial, multiple and backwards drawn borders', () => {
    const base = human();
    const partial = {
      ...base,
      upperLipBorder: { status: 'partial', segments: base.upperLipBorder.segments },
    };
    expect(compare(model(), partial)).toMatchObject({
      status: 'unavailable',
      reason: 'TWO_COMPLETE_SINGLE_BORDER_STROKES_REQUIRED',
    });
    const multi = {
      ...base,
      upperLipBorder: {
        status: 'marked' as const,
        segments: [...base.upperLipBorder.segments, ...base.upperLipBorder.segments],
      },
    };
    expect(compare(model(), multi).status).toBe('unavailable');
    const back = {
      ...base,
      upperLipBorder: {
        status: 'marked' as const,
        segments: [
          [
            [0.3, 0.45],
            [0.7, 0.45],
            [0.6, 0.45],
          ],
        ],
      },
    };
    expect(compare(model(), back).status).toBe('unavailable');
  });
  it('accepts reversed drawing direction with the same horizontal spans', () => {
    const base = human();
    const reversed = {
      ...base,
      upperLipBorder: line(0.7, 0.3, 0.45),
      lowerLipBorder: line(0.75, 0.25, 0.55),
    };
    const result = compare(model(), reversed);
    expect(result.status).toBe('available');
    if (result.status === 'available')
      expect(result.drawnUpperToLowerHorizontalSpanRatio).toBeCloseTo(0.8);
  });
  it('rejects missing mouth corners and borders outside marked corner locations', () => {
    const base = human();
    expect(
      compare(model(), {
        ...base,
        imageLeftMouthCorner: {
          status: 'unknown',
          point: null,
        },
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'BOTH_MOUTH_CORNERS_REQUIRED' });
    expect(compare(model(), { ...base, upperLipBorder: line(0.1, 0.7, 0.45) })).toMatchObject({
      status: 'unavailable',
      reason: 'BORDER_STROKE_OUTSIDE_MARKED_CORNERS',
    });
    expect(
      compare(model(), {
        ...base,
        imageRightMouthCorner: {
          status: 'marked' as const,
          point: [0.1, 0.5],
        },
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'BOTH_MOUTH_CORNERS_REQUIRED' });
  });
  it('does not accept forged independent validation or changed model version', () => {
    expect(compare({ ...model(), accuracyValidated: true }, human())).toMatchObject({
      status: 'unavailable',
      reason: 'SOURCE_AUTHORITY_OR_VERSION_MISMATCH',
    });
    expect(compare({ ...model(), methodVersion: 'future-model' }, human()).status).toBe(
      'unavailable',
    );
    expect(compare(model(), { ...human(), independentAccuracyValidated: true }).status).toBe(
      'unavailable',
    );
  });
  it('rejects malicious geometries and malformed model spans', () => {
    const base = human();
    expect(compare(model(), { ...base, upperLipBorder: line(-1, 0.7, 0.45) }).status).toBe(
      'unavailable',
    );
    expect(compare({ ...model(), upperVisibleWidthToCombinedXSpan: Infinity }, base).status).toBe(
      'unavailable',
    );
    expect(compare({ ...model(), lowerVisibleWidthToCombinedXSpan: 0 }, base).status).toBe(
      'unavailable',
    );
  });
});
