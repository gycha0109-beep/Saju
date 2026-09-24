import { describe, expect, it } from 'vitest';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  FR288CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr288.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR289_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr289.js';
import {
  deriveVisibleLowerFaceDimensionAxesFR289,
  materializeVisibleLowerFaceDimensionsFR289,
  type FR289VisibleLowerFaceDimensionsResult,
} from './visible-lower-face-dimensions-fr289.js';
import type {
  FR213VisibleLowerFaceWidthResult,
} from './visible-lower-face-width-fr213.js';
import type {
  FR216VisibleLowerFaceContourResult,
} from './canonical-visible-lower-face-contour-fr216.js';
import {
  extractCanonicalRgbSelfieMorphologyFR289,
  materializeCanonicalChinDimensionFeatureFR289,
  upgradeCanonicalRgbSelfieMorphologyFR289,
} from './canonical-rgb-selfie-morphology-fr289.js';

const RUN_REF = 'fr289:test';
const DIGEST = `sha256:${'a'.repeat(64)}`;

function widthResult(): FR213VisibleLowerFaceWidthResult {
  return {
    schemaVersion: 'fr213-visible-lower-face-width-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FR213-VISIBLE-LOWER-FACE-WIDTH-v1',
    authorityState: 'observable_lower_face_contour_candidate_only',
    status: 'available',
    metric: {
      metricRef:
        'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0',
      value: 0.6,
      unit: 'ratio',
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      classificationApplied: false,
      thresholdApplied: false,
      calibrationApplied: false,
      traditionalBindingApplied: false,
      anatomicalInterpretationAllowed: false,
      sourceObservationRefs: ['fr289:test:width'],
    },
    contourDefinition:
      'face_oval_points_at_or_below_unordered_lips_union_mean_y',
    lowerFacePointCount: 5,
    source: {
      fr77ProviderRunRef: RUN_REF,
      fr77CanonicalAssetDigest: DIGEST,
      fr79ProjectionRuleRef:
        'fr79:canonical-metric-xy-orthographic@0.1.0',
      sameProviderRunVerified: true,
      sameCanonicalAssetDigestVerified: true,
      faceOvalTopologySource:
        'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology',
      providerIndicesExposedInOutput: false,
    },
    authorityBoundary: {
      observableMorphologyOnly: true,
      mandibularBoneBoundaryIssued: false,
      gonionAnatomicalMappingIssued: false,
      jawBoneWidthClaimIssued: false,
      skeletalCalibrationIssued: false,
      classifierIssued: false,
      thresholdIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function contourResult(): FR216VisibleLowerFaceContourResult {
  return {
    schemaVersion: 'fr216-visible-lower-face-contour-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1',
    authorityState:
      'canonical_visible_soft_tissue_lower_face_contour_only',
    status: 'available',
    coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
    coordinateUnit: 'centimeter',
    contourDefinition:
      'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y',
    points: [
      { x: -2, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -2 },
      { x: 1, y: -1 },
      { x: 2, y: 0 },
    ],
    pointCount: 5,
    source: {
      fr77ProviderRunRef: RUN_REF,
      fr77CanonicalAssetDigest: DIGEST,
      fr79ProjectionRuleRef:
        'fr79:canonical-metric-xy-orthographic@0.1.0',
      sameProviderRunVerified: true,
      sameCanonicalAssetDigestVerified: true,
      faceOvalTopologySource:
        'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology',
      faceOvalTopologyReleaseExactForInstalledPackage: false,
      providerIndicesExposedInOutput: false,
      interpolationApplied: false,
      smoothingApplied: false,
      normalizationApplied: false,
    },
    authorityBoundary: {
      observableMorphologyOnly: true,
      mandibularBoneBoundaryIssued: false,
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
  };
}

function fakeFR288Prior(): FR288CanonicalRgbSelfieMorphologyPayload {
  const features =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((entry) =>
        entry.featureKey ===
          'chin_lower_face.chin_height_width_center_deviation'
          ? {
              featureKey: entry.featureKey,
              status: 'unavailable',
              reason: 'chin_dimension_extractor_not_materialized',
            }
          : {
              featureKey: entry.featureKey,
              status: 'unavailable',
              reason: 'test_fixture',
            });

  return {
    schemaVersion: 'fr288-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion: 'FR288-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
    authorityState:
      'product_facing_complete_fr282_schema_no_traditional_semantics',
    captureBoundary: {} as never,
    materializedRegionKeys: [] as never,
    representedRegionKeys: [
      'forehead',
      'eyebrow',
      'eye_pair',
      'nose',
      'mouth_lips',
      'ear',
      'cheek_mid_face',
      'chin_lower_face',
    ],
    features: features as never,
    pendingFeatureKeys: [],
    schemaCoverage: {
      fr282FeatureCount: 29,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
      canonicalExtractorMaterializedCount: 13,
      extractorOrAuthorityGapCount: 16,
      allFR282FeatureKeysRepresented: true,
    },
    provenance: {
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      providerLandmarkIndicesExposed: false,
    },
    authorityBoundary: {
      fixtureAuthority: false,
    } as never,
  };
}

describe('FR289 visible lower-face dimension axes', () => {
  it('derives width, height/width, and centered inferior-envelope axes', () => {
    const result = deriveVisibleLowerFaceDimensionAxesFR289({
      points: [
        { x: -2, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -2 },
        { x: 1, y: -1 },
        { x: 2, y: 0 },
      ],
      visibleWidthToFaceWidthRatio: 0.6,
    });

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;
    expect(result.axes.map((candidate) => candidate.value))
      .toEqual([0.6, 0.5, 0]);
    expect(result.visibleContourPointCount).toBe(5);
    expect(result.inferiorVisiblePointCount).toBe(1);
    expect(result.axes.every((candidate) =>
      candidate.anatomicalInterpretationAllowed === false &&
      candidate.traditionalBindingApplied === false &&
      candidate.thresholdApplied === false))
      .toBe(true);
  });

  it('measures center deviation without assigning anatomical laterality', () => {
    const result = deriveVisibleLowerFaceDimensionAxesFR289({
      points: [
        { x: -2, y: 0 },
        { x: -1, y: -1 },
        { x: 1, y: -2 },
        { x: 2, y: 0 },
      ],
      visibleWidthToFaceWidthRatio: 0.7,
    });

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;
    expect(result.axes[1].value).toBeCloseTo(0.5, 10);
    expect(result.axes[2].value).toBeCloseTo(0.25, 10);
  });

  it('fails closed on collapsed visible lower-face spans', () => {
    expect(deriveVisibleLowerFaceDimensionAxesFR289({
      points: [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
      ],
      visibleWidthToFaceWidthRatio: 0.6,
    })).toEqual({
      status: 'unavailable',
      reason: 'visible_lower_face_horizontal_span_collapsed',
      fallbackInvented: false,
    });

    expect(deriveVisibleLowerFaceDimensionAxesFR289({
      points: [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      visibleWidthToFaceWidthRatio: 0.6,
    })).toEqual({
      status: 'unavailable',
      reason: 'visible_lower_face_vertical_span_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects impossible width ratios instead of normalizing them silently', () => {
    expect(() => deriveVisibleLowerFaceDimensionAxesFR289({
      points: [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
      ],
      visibleWidthToFaceWidthRatio: 1.1,
    })).toThrow(/must be in \(0,1\]/u);
  });

  it('propagates an unavailable FR216 contour without inventing dimensions', () => {
    const unavailableContour = {
      ...contourResult(),
      status: 'unavailable',
      reason: 'lower_face_contour_contains_fewer_than_three_points',
      fallbackInvented: false,
      points: undefined,
      pointCount: undefined,
      coordinateFrame: undefined,
      coordinateUnit: undefined,
      contourDefinition: undefined,
    } as unknown as FR216VisibleLowerFaceContourResult;

    const result = materializeVisibleLowerFaceDimensionsFR289(
      widthResult(),
      unavailableContour,
    );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'source_visible_lower_face_contour_unavailable',
      sourceReason:
        'lower_face_contour_contains_fewer_than_three_points',
      fallbackInvented: false,
    });
  });

  it('raises the implementation map to 14 materialized columns and 15 gaps', () => {
    const materialized = FR289_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState ===
          'canonical_extractor_materialized',
    );
    expect(FR289_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(materialized).toHaveLength(14);
    expect(FR289_PRODUCT_COLUMN_MAP.length - materialized.length)
      .toBe(15);
    expect(materialized.some((entry) =>
      entry.featureKey ===
        'chin_lower_face.chin_height_width_center_deviation'))
      .toBe(true);
  });

  it('replaces only the FR288 chin-dimension gap and preserves all 29 keys', () => {
    const dimensions: FR289VisibleLowerFaceDimensionsResult =
      materializeVisibleLowerFaceDimensionsFR289(
        widthResult(),
        contourResult(),
      );
    const feature =
      materializeCanonicalChinDimensionFeatureFR289(dimensions);
    const prior = fakeFR288Prior();
    const priorKeys = prior.features.map((candidate) =>
      candidate.featureKey);

    const upgraded = upgradeCanonicalRgbSelfieMorphologyFR289(
      prior,
      feature,
    );

    expect(upgraded.features.map((candidate) => candidate.featureKey))
      .toEqual(priorKeys);
    expect(new Set(upgraded.features.map((candidate) =>
      candidate.featureKey)).size)
      .toBe(29);
    expect(upgraded.schemaCoverage).toMatchObject({
      canonicalExtractorMaterializedCount: 14,
      extractorOrAuthorityGapCount: 15,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
    });
    expect(upgraded.features.find((candidate) =>
      candidate.featureKey ===
        'chin_lower_face.chin_height_width_center_deviation'))
      .toMatchObject({
        status: 'available',
        value: {
          kind: 'composite_continuous_axes',
        },
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      });
  });

  it('rejects forged upstream geometry before issuing a canonical FR289 payload', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR289(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
      {} as FR287GovernedNeutralNoseGeometryInput,
    )).toThrow(/not issued/u);
  });
});
