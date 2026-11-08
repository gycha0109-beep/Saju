import { describe, expect, it } from 'vitest';
import { measureVisibleLipClassProfile } from '../tools/face-reading/two-view/visible-lip-class-profile.mjs';
import { createLipBorderHumanReviewRecord } from '../tools/face-reading/two-view/lip-border-human-review.mjs';
import {
  compareLipClassVerticalEnvelopesToHumanBorders,
  LIP_VERTICAL_ENVELOPE_COMPARISON_VERSION,
} from '../tools/face-reading/two-view/lip-model-human-vertical-envelope.mjs';

const size = 18;
function model() {
  const mask = new Uint8Array(size * size);
  for (let y = 4; y <= 5; y++) for (let x = 5; x <= 10; x++) mask[y * size + x] = 12;
  for (let y = 7; y <= 9; y++) for (let x = 4; x <= 11; x++) mask[y * size + x] = 13;
  return measureVisibleLipClassProfile(mask, size);
}
const marked = (points: number[][]) => ({ status: 'marked' as const, segments: [points] });
const unknown = () => ({ status: 'unknown' as const, segments: [] });
const upper = [
  [0.25, 0.3],
  [0.45, 0.28],
  [0.65, 0.31],
];
const lower = [
  [0.2, 0.62],
  [0.45, 0.65],
  [0.7, 0.63],
];
function human() {
  return createLipBorderHumanReviewRecord(
    {
      upperLipBorder: marked(upper),
      lowerLipBorder: marked(lower),
      philtrumImageLeft: unknown(),
      philtrumImageRight: unknown(),
      imageLeftMouthCorner: { status: 'marked', point: [0.15, 0.5] },
      imageRightMouthCorner: { status: 'marked', point: [0.8, 0.5] },
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-09T00:00:00Z',
    },
  );
}
const compare = (m: unknown = model(), h: unknown = human()) =>
  compareLipClassVerticalEnvelopesToHumanBorders(m, h);

describe('same-original visible lip-class vertical envelope vs human outer borders', () => {
  it('compares the image-plane extrema without granting anatomical or traditional authority', () => {
    const r = compare();
    expect(r).toMatchObject({
      methodVersion: LIP_VERTICAL_ENVELOPE_COMPARISON_VERSION,
      status: 'available',
      candidateOnly: true,
      singleReviewerUnverified: true,
      anatomicalLipBordersValidated: false,
      lipThicknessMeasured: false,
      modelHumanAgreementValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (r.upperBorder.status !== 'available' || r.lowerBorder.status !== 'available')
      throw Error('EXPECTED_SYNTHETIC_AVAILABLE');
    expect(r.upperBorder.modelClassExtremeToImageHeight).toBeCloseTo(4 / size);
    expect(r.upperBorder.drawnBorderExtremeToImageHeight).toBeCloseTo(0.28);
    expect(r.upperBorder.signedDrawnMinusModelExtremeToImageHeight).toBeCloseTo(0.28 - 4 / size);
    expect(r.lowerBorder.modelClassExtremeToImageHeight).toBeCloseTo(10 / size);
    expect(r.lowerBorder.drawnBorderExtremeToImageHeight).toBeCloseTo(0.65);
    expect(r.lowerBorder.signedDrawnMinusModelExtremeToImageHeight).toBeCloseTo(0.65 - 10 / size);
    expect(r.upperBorder.fullModelHorizontalRangeCompared).toBe(true);
    expect(JSON.stringify(r)).not.toMatch(
      /captureRef|sourceSha256|segments|rawCoordinates|maskPixels/,
    );
  });
  it('keeps a valid lower border when the upper border is obscured', () => {
    const h = human();
    const r = compare(model(), {
      ...h,
      upperLipBorder: { status: 'occluded', segments: [] },
    });
    expect(r.status).toBe('partial');
    expect(r.upperBorder).toMatchObject({
      status: 'unavailable',
      reason: 'COMPLETE_SINGLE_BORDER_STROKE_REQUIRED',
    });
    expect(r.lowerBorder.status).toBe('available');
  });
  it('requires full model-class horizontal coverage before comparing its global vertical extreme', () => {
    const h = human();
    const r = compare(model(), {
      ...h,
      upperLipBorder: marked([
        [0.35, 0.3],
        [0.55, 0.31],
      ]),
    });
    expect(r.status).toBe('partial');
    expect(r.upperBorder).toMatchObject({
      status: 'unavailable',
      reason: 'FULL_MODEL_X_COVERAGE_REQUIRED',
    });
    expect(r.lowerBorder.status).toBe('available');
    const disconnected = compare(model(), {
      ...h,
      upperLipBorder: marked([
        [0.71, 0.3],
        [0.75, 0.31],
      ]),
    });
    expect(disconnected.upperBorder).toMatchObject({
      status: 'unavailable',
      reason: 'NO_SHARED_HORIZONTAL_COVERAGE',
    });
  });
  it('rejects fragmented or nonmonotonic drawn borders while preserving other evidence', () => {
    const h = human();
    const bad = [
      { status: 'partial', segments: [upper] },
      { status: 'marked', segments: [upper, upper] },
      marked([
        [0.25, 0.3],
        [0.6, 0.31],
        [0.5, 0.32],
      ]),
      marked([
        [0.25, 0.3],
        [1.2, 0.31],
      ]),
    ];
    for (const upperLipBorder of bad) {
      const r = compare(model(), { ...h, upperLipBorder });
      expect(r.upperBorder.status).toBe('unavailable');
      expect(r.lowerBorder.status).toBe('available');
    }
  });
  it('requires mouth corners and prevents model or drawn curves outside their horizontal span', () => {
    const h = human();
    expect(
      compare(model(), {
        ...h,
        imageLeftMouthCorner: { status: 'unknown', point: null },
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'BOTH_MARKED_MOUTH_CORNERS_REQUIRED' });
    const humanOutside = compare(model(), {
      ...h,
      upperLipBorder: marked([
        [0.1, 0.3],
        [0.65, 0.3],
      ]),
    });
    expect(humanOutside.upperBorder).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_STROKE_OUTSIDE_MOUTH_CORNERS',
    });
    const modelOutside = compare(model(), {
      ...h,
      imageLeftMouthCorner: { status: 'marked', point: [0.3, 0.5] },
    });
    expect(modelOutside.upperBorder).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_CLASS_OUTSIDE_MOUTH_CORNERS',
    });
  });
  it('withholds forged authority, malformed model geometry and inverted human vertical order', () => {
    const h = human();
    expect(compare(model(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_LIP_BORDER_NOT_RECORDED',
    });
    for (const fake of [
      { ...model(), methodVersion: 'future-parser' },
      { ...model(), accuracyValidated: true },
      { ...model(), actualAnatomicalLipBorderValidated: true },
    ])
      expect(compare(fake, h)).toMatchObject({
        status: 'unavailable',
        reason: 'MODEL_SOURCE_OR_AUTHORITY_INVALID',
      });
    const invalidModel = compare({ ...model(), upperClassTopToImageHeight: Infinity }, h);
    expect(invalidModel.upperBorder).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_ENVELOPE_INVALID',
    });
    for (const fake of [
      { ...h, canonicalF0Admitted: true },
      { ...h, traditionalBindingAuthorized: true },
    ])
      expect(compare(model(), fake)).toMatchObject({
        status: 'unavailable',
        reason: 'HUMAN_AUTHORITY_INVALID',
      });
    const inverted = compare(model(), {
      ...h,
      upperLipBorder: marked([
        [0.25, 0.7],
        [0.65, 0.72],
      ]),
    });
    expect(inverted).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_UPPER_LOWER_VERTICAL_ORDER_CONFLICT',
    });
  });
  it('supports reversed stroke direction if continuous and fully covering the class', () => {
    const h = human();
    const r = compare(model(), {
      ...h,
      upperLipBorder: marked([...upper].reverse()),
      lowerLipBorder: marked([...lower].reverse()),
    });
    expect(r.status).toBe('available');
  });
});
