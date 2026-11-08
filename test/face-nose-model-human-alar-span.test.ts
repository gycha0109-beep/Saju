import { describe, it, expect } from 'vitest';
import { measureVisibleNoseMaskProfile } from '../tools/face-reading/two-view/visible-nose-mask-profile.mjs';
import { createNoseDetailReviewRecord } from '../tools/face-reading/two-view/nose-detail-review.mjs';
import {
  compareNoseMaskToHumanAlarSpans,
  NOSE_MODEL_HUMAN_SPAN_VERSION,
} from '../tools/face-reading/two-view/nose-model-human-alar-span.mjs';

const width = 22,
  height = 20;
function mask() {
  const a = new Uint8Array(width * height);
  for (const [y, l, r] of [
    [4, 9, 10],
    [5, 8, 11],
    [6, 7, 12],
    [7, 7, 12],
    [8, 6, 13],
    [9, 6, 13],
    [10, 5, 14],
    [11, 5, 14],
    [12, 6, 13],
  ] as [number, number, number][])
    for (let x = l; x <= r; x++) a[y * width + x] = 1;
  return a;
}
const blank = () => ({ status: 'unknown' as const, segments: [] });
const line = (x1: number, x2: number) => ({
  status: 'marked' as const,
  segments: [
    [
      [x1, 0.57],
      [x2, 0.63],
    ],
  ],
});
function human() {
  return createNoseDetailReviewRecord(
    {
      tip: { status: 'unknown', point: null },
      imageLeftAlar: line(0.22, 0.32),
      imageRightAlar: line(0.64, 0.72),
      imageLeftNostril: blank(),
      imageRightNostril: blank(),
    },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-08T03:00:00.000Z',
    },
  );
}
const run = (
  m = mask(),
  h: unknown = human(),
  model: unknown = measureVisibleNoseMaskProfile(m, width, height),
) => compareNoseMaskToHumanAlarSpans(model, m, width, height, h);

describe('local model whole-nose mask vs one human alar drawing span', () => {
  it('compares only same-image 2D x spans, no nostril/tip/anatomical admission', () => {
    const r = run();
    expect(r).toMatchObject({
      methodVersion: NOSE_MODEL_HUMAN_SPAN_VERSION,
      status: 'available',
      candidateOnly: true,
      singleReviewerUnverified: true,
      anatomicalAlarBoundaryValidated: false,
      anatomicalNoseSubregionsObserved: false,
      modelHumanAgreementValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      humanTipReviewRecorded: false,
      humanNostrilContoursRecorded: false,
      drawingCoverageCertified: false,
    });
    if (r.status !== 'available') throw Error('expected synthetic candidate');
    expect(r.drawnOuterAlarXSpanToImageWidth).toBeCloseTo(0.5);
    expect(r.modelWholeNoseClassXSpanToImageWidth).toBeCloseTo(10 / width);
    expect(r.signedDrawnMinusModelXSpan).toBeCloseTo(0.5 - 10 / width);
    expect(JSON.stringify(r)).not.toMatch(
      /sourceSha256|sourcePath|captureRef|landmarks|segments|rawMask|vertices|point/,
    );
  });
  it('records human tip/nostril annotation presence separately from model prediction', () => {
    const h = human();
    const r = run(mask(), {
      ...h,
      tip: { status: 'marked', point: [0.5, 0.5] },
      imageLeftNostril: line(0.35, 0.39),
      imageRightNostril: line(0.6, 0.65),
    });
    expect(r).toMatchObject({
      status: 'available',
      humanTipReviewRecorded: true,
      humanNostrilContoursRecorded: true,
      anatomicalNoseSubregionsObserved: false,
    });
  });
  it('withholds absent human and missing or invalid mask', () => {
    expect(run(mask(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_NOSE_REVIEW_NOT_RECORDED',
    });
    const clipped = mask();
    clipped[4 * width] = 1;
    expect(
      run(clipped, human(), measureVisibleNoseMaskProfile(clipped, width, height)).status,
    ).toBe('unavailable');
    const modified = mask();
    modified[8 * width + 9] = 0;
    expect(
      run(modified, human(), measureVisibleNoseMaskProfile(modified, width, height)).status,
    ).toBe('unavailable');
  });
  it('rejects partially drawn or multiple fragment alar references', () => {
    const h = human();
    expect(
      run(mask(), {
        ...h,
        imageLeftAlar: {
          status: 'partial',
          segments: h.imageLeftAlar.segments,
        },
      }),
    ).toMatchObject({ status: 'unavailable', reason: 'TWO_COMPLETE_ALAR_STROKES_REQUIRED' });
    expect(
      run(mask(), {
        ...h,
        imageRightAlar: {
          status: 'marked',
          segments: [...h.imageRightAlar.segments, ...h.imageRightAlar.segments],
        },
      }).status,
    ).toBe('unavailable');
  });
  it('rejects reversed screen-side position or frame-edge drawings', () => {
    const h = human();
    expect(run(mask(), { ...h, imageLeftAlar: line(0.76, 0.83) })).toMatchObject({
      status: 'unavailable',
      reason: 'IMAGE_SIDE_ALAR_STROKES_OVERLAP',
    });
    expect(run(mask(), { ...h, imageLeftAlar: line(0, 0.3) })).toMatchObject({
      status: 'unavailable',
      reason: 'TWO_COMPLETE_ALAR_STROKES_REQUIRED',
    });
  });
  it('rejects model version, forged confidence or mismatched current mask', () => {
    const m = mask(),
      profile = measureVisibleNoseMaskProfile(m, width, height);
    expect(run(m, human(), { ...profile, accuracyValidated: true }).status).toBe('unavailable');
    expect(run(m, human(), { ...profile, methodVersion: 'new-model' }).status).toBe('unavailable');
    const changed = mask();
    changed[8 * width + 9] = 0;
    // Count and topology no longer match the original pinned observation.
    expect(run(changed, human(), profile).status).toBe('unavailable');
    const moved = mask();
    moved[7 * width + 7] = 0;
    moved[7 * width + 6] = 1;
    expect(run(moved, human(), profile)).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_MASK_CURRENT_SOURCE_MISMATCH',
    });
  });
  it('rejects invented reviewer independence or product permissions', () => {
    const h = human();
    expect(run(mask(), { ...h, independentAccuracyValidated: true })).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_REVIEW_AUTHORITY_MISMATCH',
    });
    expect(run(mask(), { ...h, canonicalF0Admitted: true }).status).toBe('unavailable');
    expect(run(mask(), { ...h, modelTrainingAuthorized: true }).status).toBe('unavailable');
  });
});
