import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  buildFixedStillMetricEyeChordReportFR281,
  deriveMetricEyeChordComponentsFR281,
  type FR281FixedStillObservation,
} from './observable-morphology-fixed-still-metric-eye-chord-fr281.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';

function metricLandmarks() {
  const points = Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 }));
  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]));
  const eye = new Set(cycles.flat());
  const anchors = Array.from({ length: 468 }, (_, index) => index)
    .filter((index) => !eye.has(index)).slice(0, 2);
  points[anchors[0]!] = { x: -8, y: 0, z: 0 };
  points[anchors[1]!] = { x: 8, y: 0, z: 0 };

  const assign = (vertices: readonly number[], minX: number, maxX: number, negative: boolean) => {
    vertices.forEach((vertex, index) => {
      const f = index / (vertices.length - 1);
      points[vertex] = { x: minX + (maxX - minX) * f, y: 0, z: 0 };
    });
    if (negative) {
      points[vertices[0]!] = { x: minX, y: 0.2, z: 0 };
      points[vertices[vertices.length - 1]!] = { x: maxX, y: 0, z: 0 };
    } else {
      points[vertices[0]!] = { x: minX, y: 0, z: 0 };
      points[vertices[vertices.length - 1]!] = { x: maxX, y: 0.2, z: 0 };
    }
  };
  assign(cycles[0]!, -4, -2, true);
  assign(cycles[1]!, 2, 4, false);
  return points;
}

function chord(side: 'negative_x_cycle' | 'positive_x_cycle', h: number, v: number) {
  return Object.freeze({
    metricSide: side,
    horizontalSpanCentimeters: h,
    signedVerticalRiseCentimeters: v,
    angleDegrees: Math.atan2(v, h) * 180 / Math.PI,
  });
}

function observation(
  imageLabel: FR281FixedStillObservation['imageLabel'],
  condition: FR281FixedStillObservation['condition'],
  h: number,
  v: number,
  screen: number,
): FR281FixedStillObservation {
  const negative = chord('negative_x_cycle', h, v);
  const positive = chord('positive_x_cycle', h, v);
  const angle = negative.angleDegrees;
  return Object.freeze({
    imageLabel,
    condition,
    fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: angle,
    reconstructedFR76EyeOuterCornerTiltMeanDegrees: angle,
    negativeXEyeChord: negative,
    positiveXEyeChord: positive,
    meanHorizontalSpanCentimeters: h,
    meanSignedVerticalRiseCentimeters: v,
    screenSpaceEyeOuterCornerTiltMeanDegrees: screen,
    screenMeanHorizontalSpanPixels: 160,
    screenMeanSignedVerticalRisePixels: 20,
    verticalOrientationRadians: condition === 'low_angle' ? 0.2 : condition === 'high_angle' ? -0.2 : -0.08,
    screenFaceBoxAreaFraction: 0.3,
  });
}

function six(): readonly FR281FixedStillObservation[] {
  return Object.freeze([
    observation('front_1', 'front', 2, 0.3, 9.5),
    observation('front_2', 'front', 2.1, 0.31, 10),
    observation('high_1', 'high_angle', 2.0, 0.33, 11.7),
    observation('high_2', 'high_angle', 2.05, 0.34, 12.7),
    observation('low_1', 'low_angle', 2.0, 0.15, 1.4),
    observation('low_2', 'low_angle', 2.1, 0.20, 4.0),
  ]);
}

describe('FR281 fixed-still FR76 metric eye chord decomposition', () => {
  it('reconstructs the frozen FR208 eye tilt from canonical metric chord components', () => {
    const result = deriveMetricEyeChordComponentsFR281(metricLandmarks());
    expect(result.negativeXEyeChord.horizontalSpanCentimeters).toBeCloseTo(2);
    expect(result.positiveXEyeChord.horizontalSpanCentimeters).toBeCloseTo(2);
    expect(result.negativeXEyeChord.signedVerticalRiseCentimeters).toBeCloseTo(0.2);
    expect(result.positiveXEyeChord.signedVerticalRiseCentimeters).toBeCloseTo(0.2);
    expect(result.reconstructedFR76EyeOuterCornerTiltMeanDegrees)
      .toBeCloseTo(Math.atan2(0.2, 2) * 180 / Math.PI);
  });

  it('summarizes the exact fixed six-image order and front-relative metric components', () => {
    const report = buildFixedStillMetricEyeChordReportFR281({
      generatedAt: '2026-09-24T05:20:00.000Z',
      observations: six(),
    });
    expect(report.conditions.map((item) => item.condition))
      .toEqual(['front', 'high_angle', 'low_angle']);
    expect(report.conditions[0]!.metricHorizontalSpanCentimeters.mean).toBeCloseTo(2.05);
    expect(report.frontRelativeContrasts[1]!.deltaMetricSignedVerticalRiseCentimeters)
      .toBeCloseTo(-0.13);
  });

  it('rejects drift from the frozen FR76/FR208 angle', () => {
    const input = [...six()];
    input[0] = { ...input[0]!, fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: 99 };
    expect(() => buildFixedStillMetricEyeChordReportFR281({
      generatedAt: '2026-09-24T05:20:00.000Z',
      observations: input,
    })).toThrow(/must match FR76/);
  });

  it('keeps the persistence and authority boundaries closed', () => {
    const report = buildFixedStillMetricEyeChordReportFR281({
      generatedAt: '2026-09-24T05:20:00.000Z',
      observations: six(),
    });
    expect(report.privacyBoundary.rawMetricLandmarksPersisted).toBe(false);
    expect(report.privacyBoundary.providerRunRefPersisted).toBe(false);
    expect(report.privacyBoundary.scalarDiagnosticPersisted).toBe(true);
    expect(Object.values(report.authorityBoundary).every((value) => value === false)).toBe(true);
  });
});
