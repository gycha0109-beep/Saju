import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertCanonicalVisibleLowerFaceContourFR216,
  computeCanonicalVisibleLowerFaceContourFR216,
  deriveCanonicalVisibleLowerFaceContourFR216,
  type FR216VisibleLowerFaceContourResult,
} from './canonical-visible-lower-face-contour-fr216.js';

describe('FR216 canonical visible lower-face contour projection', () => {
  it('preserves the pinned contour order for the contiguous run below the visible mouth line', () => {
    const face = [
      { x: -3, y: 3 },
      { x: -4, y: 2 },
      { x: -4.5, y: 1 },
      { x: -4, y: 0 },
      { x: -3, y: -1 },
      { x: -1, y: -2 },
      { x: 0, y: -2.5 },
      { x: 1, y: -2 },
      { x: 3, y: -1 },
      { x: 4, y: 0 },
      { x: 4.5, y: 1 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
    ];
    const lips = [
      { x: -1, y: 0.5 },
      { x: 1, y: 0.5 },
      { x: 1, y: -0.5 },
      { x: -1, y: -0.5 },
    ];

    const result = deriveCanonicalVisibleLowerFaceContourFR216({
      orderedFaceOvalPoints: face,
      lipsUnionPoints: lips,
    });

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;
    expect(result.mouthLineY).toBe(0);
    expect(result.points).toEqual(face.slice(3, 10));
  });

  it('fails closed when fewer than three contour vertices are below the mouth line', () => {
    const result = deriveCanonicalVisibleLowerFaceContourFR216({
      orderedFaceOvalPoints: [
        { x: -2, y: 2 },
        { x: -1, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: 2, y: 1 },
      ],
      lipsUnionPoints: [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ],
    });
    expect(result).toEqual({
      status: 'unavailable',
      reason: 'lower_face_contour_contains_fewer_than_three_points',
      fallbackInvented: false,
    });
  });

  it('fails closed on duplicate retained contour points', () => {
    const result = deriveCanonicalVisibleLowerFaceContourFR216({
      orderedFaceOvalPoints: [
        { x: -2, y: 2 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 2, y: 2 },
      ],
      lipsUnionPoints: [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0.5, y: 0 },
        { x: -0.5, y: 0 },
      ],
    });
    expect(result).toEqual({
      status: 'unavailable',
      reason: 'lower_face_contour_contains_duplicate_points',
      fallbackInvented: false,
    });
  });

  it('fails closed when retained selector vertices form disconnected runs', () => {
    const result = deriveCanonicalVisibleLowerFaceContourFR216({
      orderedFaceOvalPoints: [
        { x: -3, y: 2 },
        { x: -2, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: -1 },
        { x: 2, y: 0 },
        { x: 3, y: 2 },
      ],
      lipsUnionPoints: [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0.5, y: 0 },
        { x: -0.5, y: 0 },
      ],
    });
    expect(result).toEqual({
      status: 'unavailable',
      reason: 'lower_face_selector_run_is_disconnected',
      fallbackInvented: false,
    });
  });

  it('rejects forged upstream geometry rather than inventing a projection', () => {
    expect(() => computeCanonicalVisibleLowerFaceContourFR216(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects mandibular or traditional authority widening', () => {
    const forged = {
      schemaVersion: 'fr216-visible-lower-face-contour-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1',
      authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only',
      status: 'available',
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      coordinateUnit: 'centimeter',
      contourDefinition: 'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y',
      points: [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }],
      pointCount: 3,
      source: {
        fr77ProviderRunRef: 'fr216:test',
        fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
        sameProviderRunVerified: true,
        sameCanonicalAssetDigestVerified: true,
        faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology',
        faceOvalTopologyReleaseExactForInstalledPackage: false,
        providerIndicesExposedInOutput: false,
        interpolationApplied: false,
        smoothingApplied: false,
        normalizationApplied: false,
      },
      authorityBoundary: {
        observableMorphologyOnly: true,
        mandibularBoneBoundaryIssued: true,
        anatomicalChinBoundaryIssued: false,
        gonionAnatomicalMappingIssued: false,
        jawBoneWidthClaimIssued: false,
        classifierIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR216VisibleLowerFaceContourResult;

    expect(() => assertCanonicalVisibleLowerFaceContourFR216(forged))
      .toThrow(/authority widened/u);
  });
});
