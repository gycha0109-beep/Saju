import { describe, expect, it } from 'vitest';
import type { FR216VisibleLowerFaceContourResult } from './canonical-visible-lower-face-contour-fr216.js';
import {
  FR260_REFERENCE_REF,
  assertVisibleLowerFaceInferiorVerticalReferenceFR260,
  deriveVisibleLowerFaceInferiorVerticalReferenceFR260,
} from './visible-lower-face-inferior-vertical-reference-fr260.js';

const SOURCE_BOUNDARY = Object.freeze({
  observableMorphologyOnly: true as const,
  mandibularBoneBoundaryIssued: false as const,
  anatomicalChinBoundaryIssued: false as const,
  gonionAnatomicalMappingIssued: false as const,
  jawBoneWidthClaimIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

const SOURCE_RECEIPT = Object.freeze({
  fr77ProviderRunRef: 'fr260:test',
  fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
  fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0' as const,
  sameProviderRunVerified: true as const,
  sameCanonicalAssetDigestVerified: true as const,
  faceOvalTopologySource:
    'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology' as const,
  faceOvalTopologyReleaseExactForInstalledPackage: false as const,
  providerIndicesExposedInOutput: false as const,
  interpolationApplied: false as const,
  smoothingApplied: false as const,
  normalizationApplied: false as const,
});

function availableSource(): FR216VisibleLowerFaceContourResult {
  const points = Object.freeze([
    Object.freeze({ x: -2, y: -1 }),
    Object.freeze({ x: -1, y: -2 }),
    Object.freeze({ x: 0, y: -2.5 }),
    Object.freeze({ x: 1, y: -2 }),
    Object.freeze({ x: 2, y: -1 }),
  ]);
  return Object.freeze({
    schemaVersion: 'fr216-visible-lower-face-contour-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1' as const,
    authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only' as const,
    status: 'available' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
    coordinateUnit: 'centimeter' as const,
    contourDefinition:
      'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y' as const,
    points,
    pointCount: points.length,
    source: SOURCE_RECEIPT,
    authorityBoundary: SOURCE_BOUNDARY,
  });
}

function unavailableSource(): FR216VisibleLowerFaceContourResult {
  return Object.freeze({
    schemaVersion: 'fr216-visible-lower-face-contour-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1' as const,
    authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only' as const,
    status: 'unavailable' as const,
    reason: 'lower_face_contour_contains_fewer_than_three_points' as const,
    fallbackInvented: false as const,
    source: SOURCE_RECEIPT,
    authorityBoundary: SOURCE_BOUNDARY,
  });
}

describe('FR260 visible lower-face inferior vertical reference', () => {
  it('derives only the minimum canonical metric Y from an available FR216 contour', () => {
    const result = deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
      availableSource(),
    );
    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.referenceRef).toBe(FR260_REFERENCE_REF);
    expect(result.value).toBe(-2.5);
    expect(result.unit).toBe('centimeter');
    expect(result.coordinateFrame).toBe('canonical_aligned_right_handed_metric_xy');
    expect(result.selectionRule)
      .toBe('minimum_y_across_available_fr216_visible_lower_face_contour');
    expect(result.contributingContourPointCount).toBe(5);
  });

  it('preserves the explicit FR35 coordinate-frame incompatibility', () => {
    const result = deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
      availableSource(),
    );
    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.fr35Compatibility).toEqual({
      targetSurfaceSlot: 'neutral.face.chin_inferior_contour',
      targetCoordinateFrame: 'canonical_image_normalized_2d',
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      exactCoordinateFrameCompatibilityEstablished: false,
      directSlotReplacementAuthorized: false,
    });
  });

  it('fails through when FR216 has no available contour instead of inventing a point', () => {
    const result = deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
      unavailableSource(),
    );
    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'fr216_visible_lower_face_contour_unavailable',
      sourceUnavailableReason: 'lower_face_contour_contains_fewer_than_three_points',
      fallbackInvented: false,
    });
  });

  it('keeps anatomy, Dige, Three Divisions, calibration and Production authority closed', () => {
    const result = deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
      availableSource(),
    );
    expect(result.authorityBoundary).toEqual({
      neutralObservableOnly: true,
      anatomicalChinIdentityIssued: false,
      mandibularBoundaryIssued: false,
      traditionalDigeEquivalenceIssued: false,
      threeDivisionsBoundaryIssued: false,
      fr35SlotReplacementIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects forged semantic authority widening', () => {
    const result = deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
      availableSource(),
    );
    expect(() => assertVisibleLowerFaceInferiorVerticalReferenceFR260({
      ...result,
      authorityBoundary: {
        ...result.authorityBoundary,
        traditionalDigeEquivalenceIssued: true,
      },
    } as never)).toThrow(/authority widened/);
  });

  it('rejects forged FR35 direct replacement', () => {
    const result = deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
      availableSource(),
    );
    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(() => assertVisibleLowerFaceInferiorVerticalReferenceFR260({
      ...result,
      fr35Compatibility: {
        ...result.fr35Compatibility,
        directSlotReplacementAuthorized: true,
      },
    } as never)).toThrow(/available reference boundary drift/);
  });
});
