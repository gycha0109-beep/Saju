import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  reimplementMediaPipeScreenToMetricFR76,
  type MediaPipeMetricGeometryPointFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  buildFixedStillFR76EyeChordPropagationReportFR283,
  traceFR76EyeChordPropagationFR283,
  type FR283FixedStillObservation,
} from './observable-morphology-fr76-eye-chord-propagation-fr283.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';

function fixture(): Readonly<{
  screen: readonly MediaPipeMetricGeometryPointFR76V1[];
  canonical: readonly MediaPipeMetricGeometryPointFR76V1[];
  weights: readonly number[];
}> {
  const canonical = Array.from({ length: 468 }, (_, index) => ({
    x: ((index % 23) - 11) * 0.14,
    y: ((Math.floor(index / 23) % 20) - 9.5) * 0.11,
    z: Math.sin(index * 0.37) * 0.31 + Math.cos(index * 0.13) * 0.17,
  }));

  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]));

  const assignEye = (
    vertices: readonly number[],
    minX: number,
    maxX: number,
    negativeXSide: boolean,
  ) => {
    vertices.forEach((vertex, index) => {
      const fraction = index / Math.max(1, vertices.length - 1);
      canonical[vertex] = {
        x: minX + (maxX - minX) * fraction,
        y: 0.42 + Math.sin(index) * 0.03,
        z: -0.05 + Math.cos(index * 0.4) * 0.02,
      };
    });
    const minVertex = vertices[0]!;
    const maxVertex = vertices[vertices.length - 1]!;
    if (negativeXSide) {
      canonical[minVertex] = { x: minX, y: 0.54, z: -0.04 };
      canonical[maxVertex] = { x: maxX, y: 0.31, z: -0.02 };
    } else {
      canonical[minVertex] = { x: minX, y: 0.31, z: -0.02 };
      canonical[maxVertex] = { x: maxX, y: 0.54, z: -0.04 };
    }
  };

  assignEye(cycles[0]!, -1.65, -0.85, true);
  assignEye(cycles[1]!, 0.85, 1.65, false);

  const screen = canonical.map((point) => Object.freeze({
    x: 0.5 + point.x * 0.045,
    y: 0.5 - point.y * 0.045,
    z: point.z * 0.018,
  }));

  return Object.freeze({
    canonical: Object.freeze(canonical.map((point) => Object.freeze({ ...point }))),
    screen: Object.freeze(screen),
    weights: Object.freeze(Array.from({ length: 468 }, () => 1)),
  });
}

function oneObservation(
  imageLabel: FR283FixedStillObservation['imageLabel'],
  condition: FR283FixedStillObservation['condition'],
  verticalOrientationRadians: number,
): FR283FixedStillObservation {
  const input = fixture();
  const official = reimplementMediaPipeScreenToMetricFR76({
    screenLandmarks: input.screen,
    canonicalMetricLandmarks: input.canonical,
    landmarkWeights: input.weights,
    frameWidth: 1000,
    frameHeight: 1000,
  });
  const traced = traceFR76EyeChordPropagationFR283({
    screenLandmarks: input.screen,
    canonicalMetricLandmarks: input.canonical,
    landmarkWeights: input.weights,
    frameWidth: 1000,
    frameHeight: 1000,
    expectedSameFrameMetricLandmarks: official.metricLandmarks,
    expectedSameFramePoseTransformMatrixPackedColumnMajor:
      official.poseTransformMatrixPackedColumnMajor,
  });
  return Object.freeze({
    imageLabel,
    condition,
    verticalOrientationRadians,
    screenFaceBoxAreaFraction: 0.31,
    stages: traced.stages,
    scales: traced.scales,
  });
}

describe('FR283 FR76 eye-chord propagation', () => {
  it('traces all six FR76 stages while remaining exactly bound to FR76', () => {
    const input = fixture();
    const official = reimplementMediaPipeScreenToMetricFR76({
      screenLandmarks: input.screen,
      canonicalMetricLandmarks: input.canonical,
      landmarkWeights: input.weights,
      frameWidth: 1000,
      frameHeight: 1000,
    });
    const result = traceFR76EyeChordPropagationFR283({
      screenLandmarks: input.screen,
      canonicalMetricLandmarks: input.canonical,
      landmarkWeights: input.weights,
      frameWidth: 1000,
      frameHeight: 1000,
      expectedSameFrameMetricLandmarks: official.metricLandmarks,
      expectedSameFramePoseTransformMatrixPackedColumnMajor:
        official.poseTransformMatrixPackedColumnMajor,
    });

    expect(result.stages.map((stage) => stage.stage)).toEqual([
      'screen_pixels_y_up',
      'projected_near_plane',
      'first_intermediate',
      'second_intermediate',
      'runtime_metric_pre_pose',
      'canonical_metric_post_pose',
    ]);
    expect(result.stages[0].meanAngleDegrees)
      .toBeCloseTo(result.stages[1].meanAngleDegrees, 10);
    expect(result.stages[1].meanAngleDegrees)
      .toBeCloseTo(result.stages[2].meanAngleDegrees, 10);
    expect(result.scales.totalScale)
      .toBeCloseTo(result.scales.firstIterationScale * result.scales.secondIterationScale, 12);
    expect(Object.values(result.exactness).every((value) => value === true)).toBe(true);
  });

  it('rejects a drifted FR257 same-frame metric witness', () => {
    const input = fixture();
    const official = reimplementMediaPipeScreenToMetricFR76({
      screenLandmarks: input.screen,
      canonicalMetricLandmarks: input.canonical,
      landmarkWeights: input.weights,
      frameWidth: 1000,
      frameHeight: 1000,
    });
    const drifted = official.metricLandmarks.map((point, index) =>
      index === 0 ? { ...point, y: point.y + 0.01 } : point);

    expect(() => traceFR76EyeChordPropagationFR283({
      screenLandmarks: input.screen,
      canonicalMetricLandmarks: input.canonical,
      landmarkWeights: input.weights,
      frameWidth: 1000,
      frameHeight: 1000,
      expectedSameFrameMetricLandmarks: drifted,
      expectedSameFramePoseTransformMatrixPackedColumnMajor:
        official.poseTransformMatrixPackedColumnMajor,
    })).toThrow(/FR257 same-frame metric point mismatch/);
  });

  it('builds the fixed six-image report with stage-wise front contrasts', () => {
    const observations = Object.freeze([
      oneObservation('front_1', 'front', -0.08),
      oneObservation('front_2', 'front', -0.081),
      oneObservation('high_1', 'high_angle', -0.20),
      oneObservation('high_2', 'high_angle', -0.22),
      oneObservation('low_1', 'low_angle', 0.20),
      oneObservation('low_2', 'low_angle', 0.16),
    ]);
    const report = buildFixedStillFR76EyeChordPropagationReportFR283({
      generatedAt: '2026-09-24T06:10:00.000Z',
      observations,
    });

    expect(report.conditions.map((condition) => condition.condition))
      .toEqual(['front', 'high_angle', 'low_angle']);
    expect(report.frontRelativeContrasts).toHaveLength(2);
    expect(report.frontRelativeContrasts[1].stages).toHaveLength(6);
    expect(report.privacyBoundary.rawIntermediateLandmarksPersisted).toBe(false);
    expect(report.privacyBoundary.scalarStageDiagnosticsPersisted).toBe(true);
    expect(Object.values(report.authorityBoundary).every((value) => value === false))
      .toBe(true);
  });

  it('rejects scale identity drift in a persisted observation', () => {
    const base = oneObservation('front_1', 'front', -0.08);
    const observations = [
      { ...base, scales: { ...base.scales, totalScale: base.scales.totalScale + 1 } },
      oneObservation('front_2', 'front', -0.081),
      oneObservation('high_1', 'high_angle', -0.20),
      oneObservation('high_2', 'high_angle', -0.22),
      oneObservation('low_1', 'low_angle', 0.20),
      oneObservation('low_2', 'low_angle', 0.16),
    ];

    expect(() => buildFixedStillFR76EyeChordPropagationReportFR283({
      generatedAt: '2026-09-24T06:10:00.000Z',
      observations,
    })).toThrow(/totalScale identity drift/);
  });
});