import { describe, expect, it } from 'vitest';
import {
  buildDeterministicStillImageDiagnosticReportFR274,
  type FR274StillImageScalarObservation,
} from './observable-morphology-deterministic-still-image-diagnostic-fr274.js';

function observation(
  imageLabel: FR274StillImageScalarObservation['imageLabel'],
  condition: FR274StillImageScalarObservation['condition'],
  screen: number,
  fr76: number,
  vertical: number,
  area: number,
): FR274StillImageScalarObservation {
  return Object.freeze({
    imageLabel,
    condition,
    frameWidth: 1536,
    frameHeight: 2048,
    screenSpaceEyeOuterCornerTiltMeanDegrees: screen,
    fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: fr76,
    screenMinusFr76Degrees: screen - fr76,
    lateralOrientationRadians: 0.01,
    verticalOrientationRadians: vertical,
    relativeRotationFromFirstFrontRadians: 0.02,
    inPlaneLateralAxisOrientationRadians: 0.003,
    poseUniformScaleComponent: 1,
    screenFaceBoxWidthFraction: 0.45,
    screenFaceBoxHeightFraction: 0.43,
    screenFaceBoxAreaFraction: area,
  });
}

function observations(): readonly FR274StillImageScalarObservation[] {
  return Object.freeze([
    observation('front_1', 'front', 9.9, 9.0, -0.10, 0.19),
    observation('front_2', 'front', 10.1, 9.1, -0.09, 0.191),
    observation('high_1', 'high_angle', 10.5, 8.2, -0.18, 0.187),
    observation('high_2', 'high_angle', 10.6, 8.3, -0.17, 0.188),
    observation('low_1', 'low_angle', 3.1, 6.0, 0.14, 0.20),
    observation('low_2', 'low_angle', 3.0, 5.9, 0.15, 0.201),
  ]);
}

describe('FR274 deterministic still-image diagnostic report', () => {
  it('summarizes exactly two fixed images per condition and emits front contrasts', () => {
    const report = buildDeterministicStillImageDiagnosticReportFR274({
      generatedAt: '2026-09-24T02:00:00.000Z',
      observations: observations(),
    });
    expect(report.source.inputImageCount).toBe(6);
    expect(report.conditions[0].condition).toBe('front');
    expect(report.conditions[0].screenSpaceEyeOuterCornerTiltMeanDegrees.mean).toBe(10);
    expect(report.conditions[2].screenSpaceEyeOuterCornerTiltMeanDegrees.mean).toBe(3.05);
    expect(report.frontRelativeContrasts[1].deltaMeanScreenSpaceEyeTiltDegrees)
      .toBeCloseTo(-6.95);
    expect(report.frontRelativeContrasts[1].deltaMeanFR76EyeTiltDegrees)
      .toBeCloseTo(-3.10);
  });

  it('rejects image order or condition-label drift', () => {
    const input = [...observations()];
    input[2] = { ...input[2]!, imageLabel: 'high_2' };
    expect(() => buildDeterministicStillImageDiagnosticReportFR274({
      generatedAt: '2026-09-24T02:00:00.000Z',
      observations: input,
    })).toThrow(/ordered front_1/);
  });

  it('rejects an inconsistent screen-minus-FR76 scalar', () => {
    const input = [...observations()];
    input[5] = { ...input[5]!, screenMinusFr76Degrees: 123 };
    expect(() => buildDeterministicStillImageDiagnosticReportFR274({
      generatedAt: '2026-09-24T02:00:00.000Z',
      observations: input,
    })).toThrow(/screen-minus-FR76 scalar is inconsistent/);
  });

  it('persists scalar-only diagnostics and issues no authority', () => {
    const report = buildDeterministicStillImageDiagnosticReportFR274({
      generatedAt: '2026-09-24T02:00:00.000Z',
      observations: observations(),
    });
    expect(report.privacyBoundary.rawImagePersisted).toBe(false);
    expect(report.privacyBoundary.rawScreenLandmarksPersisted).toBe(false);
    expect(report.privacyBoundary.rawMetricLandmarksPersisted).toBe(false);
    expect(report.privacyBoundary.providerRunRefPersisted).toBe(false);
    expect(report.privacyBoundary.scalarDiagnosticPersisted).toBe(true);
    expect(Object.values(report.authorityBoundary).every((value) => value === false))
      .toBe(true);
  });
});
