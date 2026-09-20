import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertVisibleCheekContourProminenceFR217,
  computeVisibleCheekContourProminenceFR217,
  deriveVisibleCheekContourProminenceFR217,
  type FR217VisibleCheekContourProminenceResult,
  type FR217XYPoint,
} from './visible-cheek-contour-prominence-fr217.js';

function faceOval36(firstScale = 1, secondScale = 1): FR217XYPoint[] {
  const first = Array.from({ length: 19 }, (_, index) => {
    const t = index / 18;
    return {
      x: firstScale * 4 * Math.sin(Math.PI * t),
      y: 5 - 10 * t,
    };
  });
  const secondAscending = Array.from({ length: 19 }, (_, index) => {
    const t = index / 18;
    return {
      x: -secondScale * 4 * Math.sin(Math.PI * t),
      y: 5 - 10 * t,
    };
  });
  return [...first, ...secondAscending.slice(1, 18).reverse()];
}

const EYES = [
  { x: -2, y: 4 }, { x: -1, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 },
];
const LIPS = [
  { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0.5, y: 0 }, { x: -0.5, y: 0 },
];

describe('FR217 visible cheek/mid-face contour prominence', () => {
  it('derives finite unordered bilateral side-contour deviation ratios', () => {
    const result = deriveVisibleCheekContourProminenceFR217({
      orderedFaceOvalPoints: faceOval36(1, 0.9),
      eyeCyclePoints: EYES,
      lipsUnionPoints: LIPS,
    });

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;
    expect(result.bandLowY).toBe(2);
    expect(result.bandHighY).toBe(4);
    expect(result.unorderedSideDeviationToFaceWidthRatios).toHaveLength(2);
    expect(result.unorderedSideDeviationToFaceWidthRatios[0])
      .toBeLessThanOrEqual(result.unorderedSideDeviationToFaceWidthRatios[1]);
    expect(result.meanDeviationToFaceWidthRatio).toBeGreaterThanOrEqual(0);
  });

  it('is invariant to exchanging which geometric side has the stronger bulge', () => {
    const a = deriveVisibleCheekContourProminenceFR217({
      orderedFaceOvalPoints: faceOval36(1, 0.8),
      eyeCyclePoints: EYES,
      lipsUnionPoints: LIPS,
    });
    const b = deriveVisibleCheekContourProminenceFR217({
      orderedFaceOvalPoints: faceOval36(0.8, 1),
      eyeCyclePoints: EYES,
      lipsUnionPoints: LIPS,
    });

    expect(a.status).toBe('available');
    expect(b.status).toBe('available');
    if (a.status !== 'available' || b.status !== 'available') return;
    expect(b.unorderedSideDeviationToFaceWidthRatios[0])
      .toBeCloseTo(a.unorderedSideDeviationToFaceWidthRatios[0], 12);
    expect(b.unorderedSideDeviationToFaceWidthRatios[1])
      .toBeCloseTo(a.unorderedSideDeviationToFaceWidthRatios[1], 12);
    expect(b.meanDeviationToFaceWidthRatio)
      .toBeCloseTo(a.meanDeviationToFaceWidthRatio, 12);
  });

  it('fails closed when eye and mouth vertical references collapse', () => {
    const result = deriveVisibleCheekContourProminenceFR217({
      orderedFaceOvalPoints: faceOval36(),
      eyeCyclePoints: EYES,
      lipsUnionPoints: LIPS.map((point) => ({ ...point, y: 4 })),
    });
    expect(result).toEqual({
      status: 'unavailable',
      reason: 'eye_and_mouth_vertical_references_collapsed',
      fallbackInvented: false,
    });
  });

  it('fails closed when the selected band cannot provide three side points', () => {
    const result = deriveVisibleCheekContourProminenceFR217({
      orderedFaceOvalPoints: faceOval36(),
      eyeCyclePoints: EYES.map((point) => ({ ...point, y: 4.9 })),
      lipsUnionPoints: LIPS.map((point) => ({ ...point, y: 4.7 })),
    });
    expect(result).toEqual({
      status: 'unavailable',
      reason: 'side_band_contains_fewer_than_three_points',
      fallbackInvented: false,
    });
  });

  it('rejects forged upstream geometry rather than inventing a cheek metric', () => {
    expect(() => computeVisibleCheekContourProminenceFR217(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects zygion, skeletal cheekbone, classifier, or traditional authority widening', () => {
    const forged = {
      schemaVersion: 'fr217-visible-cheek-contour-prominence-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR217-VISIBLE-CHEEK-CONTOUR-PROMINENCE-v1',
      authorityState: 'visible_2d_midface_side_contour_deviation_candidate_only',
      status: 'available',
      metric: {
        metricRef: 'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0',
        value: 0.03,
        unit: 'ratio',
      },
      unorderedSideValues: [0.02, 0.04],
      sideIdentityResolved: false,
      source: {
        fr77ProviderRunRef: 'fr217:test',
        fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
        sameProviderRunVerified: true,
        sameCanonicalAssetDigestVerified: true,
        faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology',
        eyeTopologySource: 'fr24_two_closed_eye_cycles_provider_labels_not_semantic',
        sidePathsConsumedAsUnordered: true,
        providerIndicesExposedInOutput: false,
        interpolationApplied: false,
        smoothingApplied: false,
      },
      authorityBoundary: {
        observableMorphologyOnly: true,
        zygionClaimIssued: true,
        bizygomaticBreadthClaimIssued: false,
        zygomaticProjectionClaimIssued: false,
        skeletalCheekboneProminenceClaimIssued: false,
        anatomicalSideIdentityIssued: false,
        classifierIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR217VisibleCheekContourProminenceResult;

    expect(() => assertVisibleCheekContourProminenceFR217(forged))
      .toThrow(/authority widened/u);
  });
});
