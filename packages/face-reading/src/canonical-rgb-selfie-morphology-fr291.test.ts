import { describe, expect, it } from 'vitest';
import type {
  FR290CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr290.js';
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
  FR290VisibleAlarNostrilGeometryInput,
} from './visible-alar-nostril-geometry-fr290.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
  FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
  FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
} from './visible-alar-nostril-geometry-fr290.js';
import {
  FR291_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr291.js';
import {
  FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
  FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
  computeVisiblePhiltrumGeometryFR291,
  deriveVisibleMouthWidthReferenceFR291,
  type FR291VisibleMouthWidthReference,
  type FR291VisiblePhiltrumGeometryInput,
} from './visible-philtrum-geometry-fr291.js';
import {
  extractCanonicalRgbSelfieMorphologyFR291,
  materializeCanonicalPhiltrumFeatureFR291,
  upgradeCanonicalRgbSelfieMorphologyFR291,
} from './canonical-rgb-selfie-morphology-fr291.js';

const ASSET = 'fr291:test:asset';

function reference(
  overrides: Partial<FR291VisibleMouthWidthReference> = {},
): FR291VisibleMouthWidthReference {
  return {
    schemaVersion:
      'fr291-visible-mouth-width-reference-v1',
    authorityState:
      'fr79_visible_lips_horizontal_envelope_reference_only',
    coordinateFrame: 'pose_normalized_face_2d',
    coordinateUnit: 'centimeter',
    mouthMinX: -2,
    mouthMaxX: 2,
    mouthHorizontalSpan: 4,
    sourceFR79SchemaVersion:
      'fr79-pose-normalized-lips-geometry-v1',
    sourceCanonicalAssetDigest: ASSET,
    providerRunRefExposed: false,
    canonicalAssetDigestExposed: false,
    providerVertexIndicesExposed: false,
    anatomicalRoleAssigned: false,
    ...overrides,
  };
}

function philtrumInput(
  overrides: Partial<FR291VisiblePhiltrumGeometryInput> = {},
): FR291VisiblePhiltrumGeometryInput {
  return {
    schemaVersion:
      'fr291-visible-philtrum-geometry-input-v1',
    authorityState:
      'governed_visible_central_groove_geometry_only',
    coordinateFrame: 'pose_normalized_face_2d',
    coordinateUnit: 'centimeter',
    visibleCentralGrooveAxisEndpoints: [
      { x: 0, y: 1.2 },
      { x: 0, y: 0.2 },
    ],
    visibleCorridorWidthPair: [
      { x: -0.5, y: 0.7 },
      { x: 0.5, y: 0.7 },
    ],
    visibilityAdmitted: true,
    sameCaptureAsFR79LipsVerified: true,
    sourceCanonicalAssetDigest: ASSET,
    sourceObservationRefs: [
      'fr291:test:visible-central-groove-observer',
    ],
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    anatomicalLandmarkNamesAssigned: false,
    hiddenBoundaryInferred: false,
    traditionalBindingApplied: false,
    ...overrides,
  };
}

function neutralNasalAxis(
  metricRef:
    | typeof FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF
    | typeof FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF
    | typeof FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
  value: number,
) {
  return {
    metricRef,
    value,
    unit: 'ratio' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
    anatomicalLateralityAssigned: false as const,
  };
}

function fakeFR290Prior():
FR290CanonicalRgbSelfieMorphologyPayload {
  const alarFeature = {
    featureKey:
      'nose.alar_width_and_nostril_geometry' as const,
    regionKey: 'nose' as const,
    status: 'available' as const,
    value: {
      kind: 'composite_visible_nasal_geometry' as const,
      axes: [
        neutralNasalAxis(
          FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
          1.2,
        ),
        neutralNasalAxis(
          FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
          1.8,
        ),
        neutralNasalAxis(
          FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
          0.1,
        ),
      ] as const,
    },
    sourceMetricRefs: [
      FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
      FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
      FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
    ],
    quality: {
      dependency: 'segmentation_and_visibility' as const,
      viewpointSensitivity:
        'not_characterized_by_fr283' as const,
      evidenceRefs: [],
      poseAcceptanceThresholdIssued: false as const,
      correctionApplied: false as const,
      currentCapturePoseAdjudication: 'not_issued' as const,
    },
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceLandmarkRefsExposed: false as const,
    anatomicalLateralityAssigned: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };

  const features =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((entry) => {
        if (
          entry.featureKey ===
          'nose.alar_width_and_nostril_geometry'
        ) return alarFeature;

        if (
          entry.featureKey ===
          'mouth.philtrum_length_width'
        ) {
          return {
            featureKey: entry.featureKey,
            regionKey: 'mouth_lips',
            status: 'unavailable',
            reason: 'philtrum_extractor_not_materialized',
            fallbackInvented: false,
          };
        }

        return {
          featureKey: entry.featureKey,
          status: 'unavailable',
          reason: 'test_fixture',
        };
      });

  return {
    schemaVersion:
      'fr290-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion:
      'FR290-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
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
      canonicalExtractorMaterializedCount: 15,
      extractorOrAuthorityGapCount: 14,
      allFR282FeatureKeysRepresented: true,
    },
    provenance: {
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      providerLandmarkIndicesExposed: false,
    } as never,
    authorityBoundary: {
      fixtureAuthority: false,
    } as never,
  };
}

describe('FR291 visible philtrum axes', () => {
  it('derives two scale-invariant visible central-groove axes', () => {
    const result = computeVisiblePhiltrumGeometryFR291(
      philtrumInput(),
      reference(),
    );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.axes.map((axis) => axis.metricRef))
      .toEqual([
        FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
        FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
      ]);
    expect(result.axes[0].value).toBeCloseTo(0.25, 10);
    expect(result.axes[1].value).toBeCloseTo(0.25, 10);
    expect(result.axes.every((axis) =>
      axis.scaleInvariant === true &&
      axis.anatomicalInterpretationAllowed === false &&
      axis.physicalAnthropometryAllowed === false &&
      axis.traditionalBindingApplied === false &&
      axis.thresholdApplied === false))
      .toBe(true);
  });

  it('is invariant to both semantic pair orderings', () => {
    const input = philtrumInput();
    const reversed = philtrumInput({
      visibleCentralGrooveAxisEndpoints: [
        input.visibleCentralGrooveAxisEndpoints[1],
        input.visibleCentralGrooveAxisEndpoints[0],
      ],
      visibleCorridorWidthPair: [
        input.visibleCorridorWidthPair[1],
        input.visibleCorridorWidthPair[0],
      ],
    });

    const a = computeVisiblePhiltrumGeometryFR291(
      input,
      reference(),
    );
    const b = computeVisiblePhiltrumGeometryFR291(
      reversed,
      reference(),
    );

    expect(a.status).toBe('available');
    expect(b.status).toBe('available');
    if (a.status !== 'available' || b.status !== 'available') {
      return;
    }
    expect(a.axes.map((axis) => axis.value))
      .toEqual(b.axes.map((axis) => axis.value));
  });

  it('fails closed when the visible central-groove axis collapses', () => {
    const result = computeVisiblePhiltrumGeometryFR291(
      philtrumInput({
        visibleCentralGrooveAxisEndpoints: [
          { x: 0, y: 0.5 },
          { x: 0, y: 0.5 },
        ],
      }),
      reference(),
    );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'visible_central_groove_axis_collapsed',
      fallbackInvented: false,
    });
  });

  it('fails closed when the FR79 mouth reference collapses', () => {
    const result = computeVisiblePhiltrumGeometryFR291(
      philtrumInput(),
      reference({
        mouthMinX: 0,
        mouthMaxX: 0,
        mouthHorizontalSpan: 0,
      }),
    );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'visible_mouth_horizontal_span_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects a cross-capture canonical asset join', () => {
    expect(() => computeVisiblePhiltrumGeometryFR291(
      philtrumInput({
        sourceCanonicalAssetDigest: 'fr291:test:other-asset',
      }),
      reference(),
    )).toThrow(/must share canonical asset digest/u);
  });

  it('rejects semantic geometry outside the visible mouth horizontal envelope', () => {
    expect(() => computeVisiblePhiltrumGeometryFR291(
      philtrumInput({
        visibleCorridorWidthPair: [
          { x: -3, y: 0.7 },
          { x: 0.5, y: 0.7 },
        ],
      }),
      reference(),
    )).toThrow(/must lie within the FR79 visible mouth horizontal envelope/u);
  });

  it('requires an issued FR79 lips geometry for the derived mouth reference', () => {
    expect(() => deriveVisibleMouthWidthReferenceFR291(
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/was not issued/u);
  });

  it('raises the product map to 16 materialized columns and 13 gaps', () => {
    const materialized = FR291_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState ===
          'canonical_extractor_materialized',
    );

    expect(FR291_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(materialized).toHaveLength(16);
    expect(FR291_PRODUCT_COLUMN_MAP.length - materialized.length)
      .toBe(13);
    expect(materialized.some((entry) =>
      entry.featureKey ===
        'mouth.philtrum_length_width'))
      .toBe(true);
  });

  it('replaces only the existing FR290 philtrum gap', () => {
    const geometry = computeVisiblePhiltrumGeometryFR291(
      philtrumInput(),
      reference(),
    );
    const feature =
      materializeCanonicalPhiltrumFeatureFR291(geometry);
    const prior = fakeFR290Prior();
    const priorKeys = prior.features.map(
      (candidate) => candidate.featureKey,
    );

    const upgraded =
      upgradeCanonicalRgbSelfieMorphologyFR291(
        prior,
        feature,
      );

    expect(upgraded.features.map(
      (candidate) => candidate.featureKey))
      .toEqual(priorKeys);
    expect(new Set(upgraded.features.map(
      (candidate) => candidate.featureKey)).size)
      .toBe(29);
    expect(upgraded.schemaCoverage).toMatchObject({
      canonicalExtractorMaterializedCount: 16,
      extractorOrAuthorityGapCount: 13,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
    });
    expect(upgraded.features.find((candidate) =>
      candidate.featureKey ===
        'mouth.philtrum_length_width'))
      .toMatchObject({
        status: 'available',
        value: {
          kind: 'composite_continuous_axes',
        },
        anatomicalLandmarkNamesAssigned: false,
        hiddenBoundaryInferred: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      });
  });

  it('rejects forged upstream geometry before issuing a full FR291 payload', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR291(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
      {} as FR287GovernedNeutralNoseGeometryInput,
      {} as FR290VisibleAlarNostrilGeometryInput,
      philtrumInput(),
    )).toThrow(/not issued/u);
  });
});
