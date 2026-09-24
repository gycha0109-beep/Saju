import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  buildFixedStillScreenEyeChordReportFR279,
  deriveScreenEyeChordComponentsFR279,
  type FR279FixedStillObservation,
  type FR279ScreenEyeChordCycleScalars,
} from './observable-morphology-fixed-still-screen-eye-chord-fr279.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';

function syntheticLandmarks() {
  const points = Array.from({ length: 468 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]));
  const eyeVertices = new Set(cycles.flat());
  const anchors = Array.from({ length: 468 }, (_, index) => index)
    .filter((index) => !eyeVertices.has(index))
    .slice(0, 2);
  points[anchors[0]!] = { x: 0.1, y: 0.5, z: 0 };
  points[anchors[1]!] = { x: 0.9, y: 0.5, z: 0 };

  const assignCycle = (
    vertices: readonly number[],
    minX: number,
    maxX: number,
    negativeScreenSide: boolean,
  ) => {
    vertices.forEach((vertex, index) => {
      const fraction = vertices.length === 1 ? 0 : index / (vertices.length - 1);
      points[vertex] = { x: minX + (maxX - minX) * fraction, y: 0.41, z: 0 };
    });
    const minVertex = vertices[0]!;
    const maxVertex = vertices[vertices.length - 1]!;
    if (negativeScreenSide) {
      points[minVertex] = { x: minX, y: 0.40, z: 0 };
      points[maxVertex] = { x: maxX, y: 0.42, z: 0 };
    } else {
      points[minVertex] = { x: minX, y: 0.42, z: 0 };
      points[maxVertex] = { x: maxX, y: 0.40, z: 0 };
    }
  };

  assignCycle(cycles[0]!, 0.25, 0.35, true);
  assignCycle(cycles[1]!, 0.65, 0.75, false);
  return points;
}

function cycle(
  screenSide: 'screen_left' | 'screen_right',
  horizontalPixels: number,
  verticalPixels: number,
): FR279ScreenEyeChordCycleScalars {
  return Object.freeze({
    screenSide,
    horizontalSpanPixels: horizontalPixels,
    horizontalSpanFrameWidthFraction: horizontalPixels / 1000,
    signedVerticalRisePixels: verticalPixels,
    signedVerticalRiseFrameHeightFraction: verticalPixels / 1000,
    angleDegrees: Math.atan2(verticalPixels, horizontalPixels) * 180 / Math.PI,
  });
}

function observation(
  imageLabel: FR279FixedStillObservation['imageLabel'],
  condition: FR279FixedStillObservation['condition'],
  horizontalPixels: number,
  verticalPixels: number,
  verticalOrientationRadians: number,
): FR279FixedStillObservation {
  const left = cycle('screen_left', horizontalPixels, verticalPixels);
  const right = cycle('screen_right', horizontalPixels, verticalPixels);
  const angle = (left.angleDegrees + right.angleDegrees) / 2;
  return Object.freeze({
    imageLabel,
    condition,
    frameWidth: 1000,
    frameHeight: 1000,
    screenSpaceEyeOuterCornerTiltMeanDegrees: angle,
    reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees: angle,
    screenLeftEyeChord: left,
    screenRightEyeChord: right,
    meanHorizontalSpanPixels: horizontalPixels,
    meanHorizontalSpanFrameWidthFraction: horizontalPixels / 1000,
    meanSignedVerticalRisePixels: verticalPixels,
    meanSignedVerticalRiseFrameHeightFraction: verticalPixels / 1000,
    lateralOrientationRadians: 0.01,
    verticalOrientationRadians,
    inPlaneLateralAxisOrientationRadians: 0.002,
    screenFaceBoxAreaFraction: 0.3,
  });
}

function observations(): readonly FR279FixedStillObservation[] {
  return Object.freeze([
    observation('front_1', 'front', 100, 20, -0.08),
    observation('front_2', 'front', 102, 21, -0.081),
    observation('high_1', 'high_angle', 99, 24, -0.20),
    observation('high_2', 'high_angle', 101, 25, -0.22),
    observation('low_1', 'low_angle', 100, 4, 0.20),
    observation('low_2', 'low_angle', 103, 7, 0.16),
  ]);
}

describe('FR279 fixed-still screen eye chord decomposition', () => {
  it('derives bilateral horizontal span and signed vertical rise from screen landmarks', () => {
    const result = deriveScreenEyeChordComponentsFR279({
      landmarks: syntheticLandmarks(),
      frameWidth: 1000,
      frameHeight: 1000,
    });
    expect(result.screenLeftEyeChord.horizontalSpanPixels).toBeCloseTo(100);
    expect(result.screenRightEyeChord.horizontalSpanPixels).toBeCloseTo(100);
    expect(result.screenLeftEyeChord.signedVerticalRisePixels).toBeCloseTo(20);
    expect(result.screenRightEyeChord.signedVerticalRisePixels).toBeCloseTo(20);
    expect(result.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees)
      .toBeCloseTo(Math.atan2(20, 100) * 180 / Math.PI);
  });

  it('summarizes the fixed six-image order and front-relative component deltas', () => {
    const report = buildFixedStillScreenEyeChordReportFR279({
      generatedAt: '2026-09-24T04:30:00.000Z',
      observations: observations(),
    });
    expect(report.conditions.map((item) => item.condition))
      .toEqual(['front', 'high_angle', 'low_angle']);
    expect(report.conditions[0].meanHorizontalSpanPixels.mean).toBe(101);
    expect(report.conditions[2].meanSignedVerticalRisePixels.mean).toBe(5.5);
    expect(report.frontRelativeContrasts[1].deltaMeanSignedVerticalRisePixels)
      .toBeCloseTo(-15);
  });

  it('rejects any drift between chord components and the FR269 screen-space angle', () => {
    const input = [...observations()];
    input[0] = { ...input[0]!, screenSpaceEyeOuterCornerTiltMeanDegrees: 123 };
    expect(() => buildFixedStillScreenEyeChordReportFR279({
      generatedAt: '2026-09-24T04:30:00.000Z',
      observations: input,
    })).toThrow(/must exactly match the FR269 screen-space diagnostic/);
  });

  it('persists scalar-only diagnostics and issues no authority', () => {
    const report = buildFixedStillScreenEyeChordReportFR279({
      generatedAt: '2026-09-24T04:30:00.000Z',
      observations: observations(),
    });
    expect(report.privacyBoundary.rawImagePersisted).toBe(false);
    expect(report.privacyBoundary.rawScreenLandmarksPersisted).toBe(false);
    expect(report.privacyBoundary.providerRunRefPersisted).toBe(false);
    expect(report.privacyBoundary.scalarDiagnosticPersisted).toBe(true);
    expect(Object.values(report.authorityBoundary).every((value) => value === false))
      .toBe(true);
  });
});
