import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import { FR294_HARD_GAP_FRONTIER } from '../packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.js';
import { traceFr294PhotoHardGaps } from '../tools/face-reading/two-view/fr294-photo-gap-bridge.mjs';
import {
  traceFr294HumanEvidenceReadiness,
  FR294_HUMAN_EVIDENCE_VERSION,
} from '../tools/face-reading/two-view/fr294-human-evidence-readiness.mjs';

const source = readFileSync(
  'packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
  'utf8',
);
const keys = FR293_PRODUCT_COLUMN_MAP.map((x) => x.featureKey);
const gapKeys = new Set(FR294_HARD_GAP_FRONTIER.map((x) => x.featureKey));
const baseState = () => ({
  eyeFold: { staleCount: 0, restoreFailed: false },
  eyelidContour: { staleCount: 0, restoreFailed: false },
  ear: { staleCount: 0, restoreFailed: false },
});
function fixture(n = 1) {
  const records = Array.from({ length: n }, (_, i) => ({
    captureRef: 'capture-' + String(i + 1).padStart(2, '0'),
    viewRole: 'frontal' as const,
  }));
  const readiness = {
    status: 'available',
    captureCount: n,
    canonicalPhotoMeasurementVerified: false,
    independentAccuracyValidated: false,
    captures: Object.fromEntries(
      records.map((r) => [
        r.captureRef,
        {
          viewRole: r.viewRole,
          features: keys.map((key) => ({
            featureKey: key,
            state: gapKeys.has(key) ? 'unavailable' : 'calculation_only',
            reason: gapKeys.has(key)
              ? 'CURRENT_RGB_AUTHORITY_UNAVAILABLE'
              : 'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT',
          })),
        },
      ]),
    ),
  };
  return { records, gaps: traceFr294PhotoHardGaps(source, readiness, keys) };
}
function fold() {
  return {
    imageLeft: 'visible',
    imageRight: 'partial',
    humanReviewed: true,
    independentAccuracyValidated: false,
    modelTrainingAuthorized: false,
  };
}
function eyelid() {
  const part = (status = 'unknown') => ({ status, segments: [] as number[][][] });
  const side = () => ({ upperLidMargin: part(), creaseLine: part(), hoodingBoundary: part() });
  return {
    imageLeft: side(),
    imageRight: side(),
    humanReviewed: true,
    independentAccuracyValidated: false,
    actualAnatomicalContourValidated: false,
    anatomicalLateralityAssigned: false,
    eyelidProjectionMeasured: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
  };
}
function ear() {
  const side = () => ({
    outerRim: { status: 'unknown', segments: [] as number[][][] },
    lobe: { status: 'unknown', segments: [] },
    attachment: { status: 'unknown', point: null },
  });
  return {
    viewRole: 'frontal',
    imageLeft: side(),
    imageRight: side(),
    humanReviewed: true,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    earProjectionMeasured: false,
    earThicknessMeasured: false,
  };
}
describe('FR294 local human evidence and repeatability readiness', () => {
  it('shows no invented labels or independent accuracy for existing 18 photos', () => {
    const { records, gaps } = fixture(18);
    const result = traceFr294HumanEvidenceReadiness(gaps, records, {}, {}, {}, baseState());
    expect(result).toMatchObject({
      schemaVersion: FR294_HUMAN_EVIDENCE_VERSION,
      status: 'available',
      captureCount: 18,
      sourceHumanReviewRecords: { eyeFold: 0, eyelidContour: 0, ear: 0 },
      independentHumanReferenceValidated: false,
      repeatCaptureAgreementValidated: false,
      canonicalObservationAdmitted: false,
    });
    if (result.status !== 'available') throw Error('unexpected result');
    expect(
      Object.values(result.captures).every(
        (rows) => rows.length === 6 && rows.every((item) => !item.recordedHumanReview),
      ),
    ).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(/sourceSha256|sourcePath|segments|point|mask/);
  });
  it('links qualitative and contour reviews only to the canonical eye-crease gap', () => {
    const { records, gaps } = fixture();
    const contour = eyelid();
    contour.imageLeft.creaseLine.status = 'marked';
    contour.imageLeft.creaseLine.segments = [
      [
        [0.1, 0.1],
        [0.2, 0.2],
      ],
    ];
    const result = traceFr294HumanEvidenceReadiness(
      gaps,
      records,
      { 'capture-01': fold() },
      { 'capture-01': contour },
      {},
      baseState(),
    );
    if (result.status !== 'available') throw Error('unavailable');
    const eye = result.captures['capture-01']!.find(
      (r) => r.featureKey === 'eye.eyelid_crease_or_hooded_category',
    )!;
    expect(eye).toMatchObject({
      recordedHumanReview: true,
      visibleSingleReviewerAnnotation: true,
      qualitativeEyeFoldReviewed: true,
      eyelidContourReviewed: true,
      independentHumanReferenceValidated: false,
      repeatCaptureAgreementValidated: false,
    });
    expect(result.featureCounts[eye.featureKey]!.reviewRecordedPhotos).toBe(1);
    expect(JSON.stringify(result)).not.toContain('segments');
    expect(JSON.stringify(result)).not.toContain('[[0.1,0.1]');
  });
  it('maps ear review without claiming ear projection or canonical F0', () => {
    const { records, gaps } = fixture();
    const record = ear();
    record.imageRight.outerRim.status = 'marked';
    record.imageRight.outerRim.segments = [
      [
        [0.1, 0.1],
        [0.2, 0.2],
      ],
    ];
    const result = traceFr294HumanEvidenceReadiness(
      gaps,
      records,
      {},
      {},
      { 'capture-01': record },
      baseState(),
    );
    if (result.status !== 'available') throw Error('unavailable');
    expect(
      result.captures['capture-01']!.find(
        (r) => r.featureKey === 'ear.visible_boundary_height_shape',
      ),
    ).toMatchObject({
      earOutlineReviewed: true,
      visibleSingleReviewerAnnotation: true,
      independentHumanReferenceValidated: false,
      canonicalObservationAdmitted: false,
    });
  });
  it('withholds every human evidence claim after stale records or damaged restore', () => {
    const { records, gaps } = fixture();
    for (const key of ['eyeFold', 'eyelidContour', 'ear'] as const) {
      const state = baseState();
      state[key].staleCount = 1;
      expect(traceFr294HumanEvidenceReadiness(gaps, records, {}, {}, {}, state)).toMatchObject({
        status: 'withheld',
        independentHumanReferenceValidated: false,
      });
      state[key].staleCount = 0;
      state[key].restoreFailed = true;
      expect(traceFr294HumanEvidenceReadiness(gaps, records, {}, {}, {}, state).status).toBe(
        'withheld',
      );
    }
  });
  it('rejects forged permission, malformed geometry or unknown capture refs', () => {
    const { records, gaps } = fixture();
    const bad = fold();
    (bad as typeof bad & { independentAccuracyValidated: boolean }).independentAccuracyValidated =
      true;
    expect(() =>
      traceFr294HumanEvidenceReadiness(gaps, records, { 'capture-01': bad }, {}, {}, baseState()),
    ).toThrow('FR294_HUMAN_EVIDENCE_INVALID');
    const broken = eyelid();
    broken.imageRight.creaseLine.status = 'marked';
    expect(() =>
      traceFr294HumanEvidenceReadiness(
        gaps,
        records,
        {},
        { 'capture-01': broken },
        {},
        baseState(),
      ),
    ).toThrow();
    expect(() =>
      traceFr294HumanEvidenceReadiness(
        gaps,
        records,
        { 'capture-99': fold() },
        {},
        {},
        baseState(),
      ),
    ).toThrow();
  });
  it('rejects false canonical keys, missing FR294 source and profiles with frontal eye labels', () => {
    const { records, gaps } = fixture();
    const bad = { ...gaps, canonicalObservationAdmitted: true };
    expect(() => traceFr294HumanEvidenceReadiness(bad, records, {}, {}, {}, baseState())).toThrow(
      'FR294_HUMAN_EVIDENCE_INVALID',
    );
    const role = records.map((r) => ({ ...r, viewRole: 'profile' as const }));
    expect(() =>
      traceFr294HumanEvidenceReadiness(gaps, role, { 'capture-01': fold() }, {}, {}, baseState()),
    ).toThrow();
  });
});
