import { describe, expect, it } from 'vitest';
import {
  buildDeterministicStillImageDiagnosticReportFR274,
  type FR274StillImageScalarObservation,
} from './observable-morphology-deterministic-still-image-diagnostic-fr274.js';
import {
  analyzeFixedStillVerticalSensitivityFR277,
  FR277_NEXT_FRONTIER,
} from './observable-morphology-fixed-still-vertical-sensitivity-fr277.js';

const DEG_TO_RAD = Math.PI / 180;

const ROWS = [
  ['front_1', 'front', -5],
  ['front_2', 'front', -4],
  ['high_1', 'high_angle', -12],
  ['high_2', 'high_angle', -14],
  ['low_1', 'low_angle', 9],
  ['low_2', 'low_angle', 14],
] as const;

function observations(
  screenOffset = 0,
): readonly FR274StillImageScalarObservation[] {
  return ROWS.map(([imageLabel, condition, verticalDegrees], index) => {
    const screen = 8 - 0.4 * verticalDegrees + (index === 0 ? screenOffset : 0);
    const fr76 = 8 - 0.2 * verticalDegrees;
    return Object.freeze({
      imageLabel,
      condition,
      frameWidth: 1536,
      frameHeight: 2048,
      screenSpaceEyeOuterCornerTiltMeanDegrees: screen,
      fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: fr76,
      screenMinusFr76Degrees: screen - fr76,
      lateralOrientationRadians: (-2 + index * 0.1) * DEG_TO_RAD,
      verticalOrientationRadians: verticalDegrees * DEG_TO_RAD,
      relativeRotationFromFirstFrontRadians: index * 0.01,
      inPlaneLateralAxisOrientationRadians: (0.5 - index * 0.1) * DEG_TO_RAD,
      poseUniformScaleComponent: 1,
      screenFaceBoxWidthFraction: 0.55 + index * 0.001,
      screenFaceBoxHeightFraction: 0.54 - index * 0.001,
      screenFaceBoxAreaFraction:
        (0.55 + index * 0.001) * (0.54 - index * 0.001),
    });
  });
}

function report(generatedAt: string, screenOffset = 0) {
  return buildDeterministicStillImageDiagnosticReportFR274({
    generatedAt,
    observations: observations(screenOffset),
  });
}

describe('FR277 fixed-still vertical viewpoint sensitivity', () => {
  it('requires exact scalar identity across independent FR274 runs', () => {
    const result = analyzeFixedStillVerticalSensitivityFR277({
      runA: report('2026-09-24T03:00:00.000Z'),
      runB: report('2026-09-24T03:00:01.000Z'),
    });

    expect(result.source).toEqual({
      fr274ContractVersion:
        'FR274-DETERMINISTIC-STILL-IMAGE-EYE-TILT-DIAGNOSTIC-v1',
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
      runCount: 2,
      inputImageCountPerRun: 6,
      exactObservationScalarsMatchAcrossRuns: true,
      generatedAtExcludedFromReproducibilityComparison: true,
    });
  });

  it('computes descriptive vertical association without admitting a linear model', () => {
    const result = analyzeFixedStillVerticalSensitivityFR277({
      runA: report('2026-09-24T03:00:00.000Z'),
      runB: report('2026-09-24T03:00:01.000Z'),
    });

    const [screen, fr76, divergence] = result.verticalAssociations;
    expect(screen.leastSquaresSlopeResponseDegreesPerVerticalDegree)
      .toBeCloseTo(-0.4, 12);
    expect(fr76.leastSquaresSlopeResponseDegreesPerVerticalDegree)
      .toBeCloseTo(-0.2, 12);
    expect(divergence.leastSquaresSlopeResponseDegreesPerVerticalDegree)
      .toBeCloseTo(-0.2, 12);
    expect(screen.rSquared).toBeCloseTo(1, 12);
    expect(fr76.rSquared).toBeCloseTo(1, 12);
    expect(divergence.rSquared).toBeCloseTo(1, 12);
    expect(result.verticalAssociations.every(
      (entry) =>
        entry.evaluationState
        === 'descriptive_only_no_linear_model_admission_or_causal_interpretation',
    )).toBe(true);
  });

  it('rejects a run pair when any persisted scalar evidence differs', () => {
    expect(() =>
      analyzeFixedStillVerticalSensitivityFR277({
        runA: report('2026-09-24T03:00:00.000Z'),
        runB: report('2026-09-24T03:00:01.000Z', 0.01),
      })
    ).toThrow(/must match exactly/);
  });

  it('retains aggregate scalars only and keeps interpretation authority closed', () => {
    const result = analyzeFixedStillVerticalSensitivityFR277({
      runA: report('2026-09-24T03:00:00.000Z'),
      runB: report('2026-09-24T03:00:01.000Z'),
    });

    expect(result.privacyBoundary.rawImagePersisted).toBe(false);
    expect(result.privacyBoundary.rawLandmarksPersisted).toBe(false);
    expect(result.privacyBoundary.perImageScalarRowsPersistedByFR277).toBe(false);
    expect(result.privacyBoundary.aggregateScalarEvidencePersisted).toBe(true);
    expect(Object.values(result.interpretationBoundary).every((value) => value === false))
      .toBe(true);
    expect(Object.values(result.authorityBoundary).every((value) => value === false))
      .toBe(true);
    expect(result.nextFrontier).toBe(FR277_NEXT_FRONTIER);
  });
});