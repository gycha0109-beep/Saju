import { describe, it, expect } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import { METHOD_VERSION } from '../tools/face-reading/two-view/frontal-metrics.mjs';
import {
  traceWholeFacePerCaptureReadiness,
  PER_CAPTURE_READINESS_VERSION,
} from '../tools/face-reading/two-view/feature-coverage.mjs';

const capture = (captureRef = 'capture-01', metrics: Record<string, unknown>[] = []) => ({
  captureRef,
  viewRole: 'frontal' as const,
  metrics,
});
const ratio = (ref: string, name: string) => ({
  metricKey: 'engineering.frontal.' + name,
  captureRef: ref,
  viewRole: 'frontal',
  methodVersion: METHOD_VERSION,
  candidateOnly: true,
  status: 'available',
  unit: 'ratio',
  value: 0.42,
});
const row = (
  report: ReturnType<typeof traceWholeFacePerCaptureReadiness>,
  index: number,
  key: string,
) => report.captures[index]?.features.find((f) => f.featureKey === key);

describe('29 canonical features per private photo research evidence', () => {
  it('reports 29 per capture and preserves 18 calculator / 11 hard-gap authority', () => {
    const report = traceWholeFacePerCaptureReadiness(FR293_PRODUCT_COLUMN_MAP, [capture()]);
    expect(report.schemaVersion).toBe(PER_CAPTURE_READINESS_VERSION);
    expect(report).toMatchObject({
      lifecycle: 'private_local_research_only',
      photoCount: 1,
      canonicalFeatureCount: 29,
      canonicalCalculatorCount: 18,
      canonicalHardGapCount: 11,
      admittedCanonicalMeasurements: 0,
      independentAccuracyValidated: false,
      traditionalBindingAuthorized: false,
      productionAuthorized: false,
      containsRawBiometricMeasurements: false,
    });
    expect(report.captures[0]?.features).toHaveLength(29);
    expect(row(report, 0, 'eye.width_height_ratio')).toMatchObject({
      state: 'not_evaluated',
      reason: 'PHOTO_RUN_EVIDENCE_MISSING',
      canonicalObservationAdmitted: false,
    });
    expect(row(report, 0, 'ear.thickness_attachment_canal_boundary')).toMatchObject({
      state: 'unavailable',
      reason: 'CURRENT_RGB_AUTHORITY_UNAVAILABLE',
    });
    expect(Object.values(report.statusCounts).reduce((sum, n) => sum + n, 0)).toBe(29);
  });

  it('separates a real engineering proxy from an installed calculator and an unavailable extractor', () => {
    const report = traceWholeFacePerCaptureReadiness(FR293_PRODUCT_COLUMN_MAP, [
      capture('capture-02', [
        ratio('capture-02', 'eye_aperture_ratio'),
        ratio('capture-02', 'eye_span_ratio'),
      ]),
    ]);
    expect(row(report, 0, 'eye.width_height_ratio')).toMatchObject({
      state: 'candidate_only',
      reason: 'ENGINEERING_PROXY_NOT_CANONICAL',
      engineeringProxyMatched: true,
      independentHumanGroundTruthPresent: false,
    });
    expect(row(report, 0, 'eye.inter_eye_spacing_ratio')).toMatchObject({
      state: 'calculation_only',
      reason: 'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT',
    });
    expect(row(report, 0, 'eye.eyelid_crease_or_hooded_category')).toMatchObject({
      state: 'unavailable',
      reason: 'NO_VERIFIED_IMAGE_EXTRACTOR',
    });
    expect(report.statusCounts.observed).toBe(0);
    expect(report.statusCounts.candidate_only).toBe(1);
  });

  it('classifies single human review evidence as partial, never validated observation', () => {
    const captureRef = 'capture-03';
    const report = traceWholeFacePerCaptureReadiness(
      FR293_PRODUCT_COLUMN_MAP,
      [capture(captureRef, [ratio(captureRef, 'eye_span_ratio')])],
      [
        {
          captureRef,
          imageLeft: 'visible',
          imageRight: 'partial',
          humanReviewed: true,
          independentAccuracyValidated: false,
          modelTrainingAuthorized: false,
        },
      ],
    );
    expect(row(report, 0, 'eye.eyelid_crease_or_hooded_category')).toMatchObject({
      state: 'partial',
      reason: 'SINGLE_REVIEWER_NOT_INDEPENDENT_GROUND_TRUTH',
      singleReviewerLabelPresent: true,
      independentHumanGroundTruthPresent: false,
      canonicalObservationAdmitted: false,
    });
    expect(report.statusCounts.observed).toBe(0);
  });

  it('does not count a profile capture as a verified frontal engineering feature', () => {
    const ref = 'capture-04';
    const report = traceWholeFacePerCaptureReadiness(FR293_PRODUCT_COLUMN_MAP, [
      { captureRef: ref, viewRole: 'profile', metrics: [ratio(ref, 'eye_aperture_ratio')] },
    ]);
    expect(row(report, 0, 'eye.width_height_ratio')).toMatchObject({
      state: 'unavailable',
      reason: 'FRONTAL_CAPTURE_REQUIRED',
    });
  });

  it('keeps per-photo audit private and rejects duplicates or invented measurement authority', () => {
    const ref = 'capture-05';
    const report = traceWholeFacePerCaptureReadiness(FR293_PRODUCT_COLUMN_MAP, [capture(ref)]);
    expect(report.captures[0]?.captureRef).toBe(ref);
    const text = JSON.stringify(report);
    expect(text).not.toContain('sourcePath');
    expect(text).not.toContain('sourceSha256');
    expect(text).not.toContain('landmark');
    expect(() =>
      traceWholeFacePerCaptureReadiness(FR293_PRODUCT_COLUMN_MAP, [capture(ref), capture(ref)]),
    ).toThrow('COVERAGE_CAPTURE_INVALID');
  });
});
