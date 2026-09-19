import { describe, expect, it } from 'vitest';

import {
  convertScreenLandmarksToMetricFR201,
  solveWeightedSimilarityFR201,
  type FaceGeometryPointFR201V1,
} from './face-reading-mediapipe-metric-geometry-fr201.js';
import { FaceAuthorityValidationError } from './validation.js';

function transformPoint(
  point: FaceGeometryPointFR201V1,
  angle: number,
  scale: number,
  translation: readonly [number, number, number],
): FaceGeometryPointFR201V1 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    x: scale * (cosine * point.x - sine * point.y) + translation[0],
    y: scale * (sine * point.x + cosine * point.y) + translation[1],
    z: scale * point.z + translation[2],
  };
}

describe('FR201 MediaPipe metric face geometry port', () => {
  it('recovers a known weighted similarity transform', () => {
    const source: FaceGeometryPointFR201V1[] = [
      { x: -1, y: -1, z: 0 },
      { x: 1, y: -1, z: 0.2 },
      { x: -0.5, y: 1, z: -0.3 },
      { x: 0.8, y: 0.9, z: 1 },
      { x: 0.1, y: 0.2, z: -1.2 },
    ];
    const angle = Math.PI / 7;
    const scale = 1.7;
    const translation = [2.5, -1.25, 4.75] as const;
    const target = source.map((point) =>
      transformPoint(point, angle, scale, translation),
    );

    const result = solveWeightedSimilarityFR201({
      source,
      target,
      weights: [1, 2, 0.5, 3, 1.25],
    });

    expect(result.scale).toBeCloseTo(scale, 8);
    expect(result.translation[0]).toBeCloseTo(translation[0], 8);
    expect(result.translation[1]).toBeCloseTo(translation[1], 8);
    expect(result.translation[2]).toBeCloseTo(translation[2], 8);

    const expectedRotation = [
      Math.cos(angle), -Math.sin(angle), 0,
      Math.sin(angle), Math.cos(angle), 0,
      0, 0, 1,
    ];
    for (let index = 0; index < 9; index += 1) {
      expect(result.rotationRowMajor[index]).toBeCloseTo(expectedRotation[index]!, 8);
    }
  });

  it('uses the official 63-degree / 1cm camera defaults and keeps every authority gate closed', () => {
    const canonical = Array.from({ length: 468 }, (_, index) => {
      const theta = (index / 468) * Math.PI * 2;
      const ring = 3 + (index % 17) * 0.01;
      return {
        x: Math.cos(theta) * ring,
        y: Math.sin(theta) * ring * 1.2,
        z: 5 + Math.sin(theta * 3) * 0.5 + (index % 7) * 0.01,
      };
    });
    const screen = canonical.map((point) => ({
      x: 0.5 + point.x / 30,
      y: 0.5 - point.y / 30,
      z: -point.z / 30,
    }));
    const landmarkWeights = [
      { landmarkId: 4, weight: 0.2 },
      { landmarkId: 33, weight: 0.3 },
      { landmarkId: 129, weight: 0.5 },
      { landmarkId: 263, weight: 0.3 },
      { landmarkId: 358, weight: 0.5 },
      { landmarkId: 425, weight: 0.2 },
    ];

    const result = convertScreenLandmarksToMetricFR201({
      screenLandmarks: screen,
      canonicalMetricLandmarks: canonical,
      landmarkWeights,
      frameWidth: 1200,
      frameHeight: 1600,
    });

    expect(result.metricLandmarksCanonicalAligned).toHaveLength(468);
    expect(result.firstIterationScale).toBeGreaterThan(0);
    expect(result.secondIterationScale).toBeGreaterThan(0);
    expect(result.totalUnprojectionScale).toBeGreaterThan(0);
    expect(result.providerIndexAdmissionAuthorized).toBe(false);
    expect(result.anatomicalZygionClaimAuthorized).toBe(false);
    expect(result.productionAuthorized).toBe(false);
    expect(result.commerceAuthorized).toBe(false);
  });

  it('fails closed for malformed landmark counts', () => {
    expect(() =>
      convertScreenLandmarksToMetricFR201({
        screenLandmarks: Array.from({ length: 467 }, () => ({ x: 0, y: 0, z: 0 })),
        canonicalMetricLandmarks: Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 })),
        landmarkWeights: [],
        frameWidth: 100,
        frameHeight: 100,
      }),
    ).toThrow(FaceAuthorityValidationError);
  });
});
