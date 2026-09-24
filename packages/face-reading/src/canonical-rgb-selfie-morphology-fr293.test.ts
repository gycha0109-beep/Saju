import { describe, expect, it } from 'vitest';
import type {
  FR292CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr292.js';
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
import type {
  FR291VisiblePhiltrumGeometryInput,
  FR291VisibleMouthWidthReference,
} from './visible-philtrum-geometry-fr291.js';
import type {
  FR292VisibleEyebrowPairGeometryInput,
} from './visible-eyebrow-pair-geometry-fr292.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR292_MEAN_ARCH_METRIC_REF,
  FR292_MEAN_SPAN_METRIC_REF,
  FR292_MEAN_TAIL_TILT_METRIC_REF,
} from './visible-eyebrow-pair-geometry-fr292.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR293_COMBINED_AREA_METRIC_REF,
  FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
  FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
  computeVisibleLipBandFullnessFR293,
  type FR293VisibleLipBandGeometryInput,
} from './visible-lip-band-fullness-fr293.js';
import {
  extractCanonicalRgbSelfieMorphologyFR293,
  materializeCanonicalLipFullnessFeatureFR293,
  upgradeCanonicalRgbSelfieMorphologyFR293,
} from './canonical-rgb-selfie-morphology-fr293.js';

const ASSET = 'fr293:test:asset';

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

function lipBandInput(
  overrides:
    Partial<FR293VisibleLipBandGeometryInput> = {},
): FR293VisibleLipBandGeometryInput {
  return {
    schemaVersion:
      'fr293-visible-lip-band-geometry-input-v1',
    authorityState:
      'governed_explicit_visible_upper_lower_lip_band_geometry_only',
    coordinateFrame: 'pose_normalized_face_2d',
    coordinateUnit: 'centimeter',
    upperVisibleLipBandBoundary: [
      { x: -1, y: 0.2 },
      { x: 1, y: 0.2 },
      { x: 1, y: 0.6 },
      { x: -1, y: 0.6 },
    ],
    lowerVisibleLipBandBoundary: [
      { x: -1, y: -0.2 },
      { x: 1, y: -0.2 },
      { x: 1, y: -0.8 },
      { x: -1, y: -0.8 },
    ],
    visibleUpperLowerRoleAssignmentExplicit: true,
    visibilityAdmitted: true,
    sameCaptureAsFR79LipsVerified: true,
    sourceCanonicalAssetDigest: ASSET,
    sourceObservationRefs: [
      'fr293:test:visible-lip-band-observer',
    ],
    providerContourIdentityUsed: false,
    providerComponentOrderUsed: false,
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    anatomicalOuterInnerRolesAssigned: false,
    hiddenBoundaryInferred: false,
    traditionalBindingApplied: false,
    ...overrides,
  };
}

function browAxis(
  metricRef:
    | typeof FR292_MEAN_SPAN_METRIC_REF
    | typeof FR292_MEAN_ARCH_METRIC_REF
    | typeof FR292_MEAN_TAIL_TILT_METRIC_REF,
  value: number,
  unit: 'ratio' | 'degree',
) {
  return {
    metricRef,
    value,
    unit,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    browPairOrderSemantic: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  };
}

function fakeFR292Prior():
FR292CanonicalRgbSelfieMorphologyPayload {
  const eyebrowFeature = {
    featureKey:
      'eyebrow.span_arch_tail_orientation' as const,
    regionKey: 'eyebrow' as const,
    status: 'available' as const,
    value: {
      kind: 'composite_continuous_axes' as const,
      axes: [
        browAxis(
          FR292_MEAN_SPAN_METRIC_REF,
          0.2,
          'ratio',
        ),
        browAxis(
          FR292_MEAN_ARCH_METRIC_REF,
          0.4,
          'ratio',
        ),
        browAxis(
          FR292_MEAN_TAIL_TILT_METRIC_REF,
          3,
          'degree',
        ),
      ] as const,
    },
    sourceMetricRefs: [
      FR292_MEAN_SPAN_METRIC_REF,
      FR292_MEAN_ARCH_METRIC_REF,
      FR292_MEAN_TAIL_TILT_METRIC_REF,
    ],
    quality: {
      dependency: 'canonical_metric_geometry' as const,
      viewpointSensitivity:
        'not_characterized_by_fr283' as const,
      evidenceRefs: [],
      poseAcceptanceThresholdIssued: false as const,
      correctionApplied: false as const,
      currentCapturePoseAdjudication: 'not_issued' as const,
    },
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceObservationRefsExposed: false as const,
    providerEyebrowComponentsConsumed: false as const,
    providerComponentRoleMappingIssued: false as const,
    anatomicalBoundaryRoleAssigned: false as const,
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
          'eyebrow.span_arch_tail_orientation'
        ) return eyebrowFeature;

        if (
          entry.featureKey ===
          'mouth.visible_lip_fullness'
        ) {
          return {
            featureKey: entry.featureKey,
            regionKey: 'mouth_lips',
            status: 'unavailable',
            reason:
              'governed_lip_fullness_extractor_not_materialized',
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
      'fr292-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion:
      'FR292-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
    authorityState:
      'product_facing_complete_fr282_schema_no_traditional_semantics',
    captureBoundary: {} as never,
    materializedRegionKeys: [
      'eye_pair',
      'mouth_lips',
      'cheek_mid_face',
      'chin_lower_face',
      'nose',
      'eyebrow',
    ],
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
      canonicalExtractorMaterializedCount: 17,
      extractorOrAuthorityGapCount: 12,
      allFR282FeatureKeysRepresented: true,
    },
    provenance: {
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      providerLandmarkIndicesExposed: false,
      sameCaptureEyebrowGeometryVerified: true,
      sourceEyebrowObservationRefsExposed: false,
      sourceEyebrowCanonicalAssetDigestExposed: false,
      providerEyebrowComponentsConsumed: false,
    } as never,
    authorityBoundary: {
      fixtureAuthority: false,
    } as never,
  };
}

describe('FR293 visible lip-band fullness axes', () => {
  it('derives three scale-invariant visible lip-band geometry axes', () => {
    const result = computeVisibleLipBandFullnessFR293(
      lipBandInput(),
      reference(),
    );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.axes.map((axis) => axis.metricRef))
      .toEqual([
        FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
        FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
        FR293_COMBINED_AREA_METRIC_REF,
      ]);
    expect(result.axes[0].value).toBeCloseTo(0.1, 10);
    expect(result.axes[1].value).toBeCloseTo(0.15, 10);
    expect(result.axes[2].value).toBeCloseTo(0.125, 10);
    expect(result.source).toMatchObject({
      explicitVisibleUpperLowerRolesConsumed: true,
      providerLipContoursConsumed: false,
      providerComponentOrderConsumed: false,
      anatomicalOuterInnerRolesAssigned: false,
    });
    expect(result.axes.every((axis) =>
      axis.fullnessCategoryIssued === false &&
      axis.physicalThicknessInterpretationAllowed === false &&
      axis.anatomicalInterpretationAllowed === false &&
      axis.traditionalBindingApplied === false))
      .toBe(true);
  });

  it('is invariant to polygon winding and starting vertex', () => {
    const input = lipBandInput();
    const upper = input.upperVisibleLipBandBoundary;
    const lower = input.lowerVisibleLipBandBoundary;
    const transformed = lipBandInput({
      upperVisibleLipBandBoundary: [
        upper[2]!,
        upper[1]!,
        upper[0]!,
        upper[3]!,
      ],
      lowerVisibleLipBandBoundary: [
        lower[1]!,
        lower[0]!,
        lower[3]!,
        lower[2]!,
      ],
    });

    const a = computeVisibleLipBandFullnessFR293(
      input,
      reference(),
    );
    const b = computeVisibleLipBandFullnessFR293(
      transformed,
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

  it('fails closed when an explicit visible band vertical span collapses', () => {
    const result = computeVisibleLipBandFullnessFR293(
      lipBandInput({
        upperVisibleLipBandBoundary: [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      }),
      reference(),
    );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'upper_visible_lip_band_vertical_span_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects duplicate polygon closure', () => {
    const input = lipBandInput();
    const upper = input.upperVisibleLipBandBoundary;

    expect(() => computeVisibleLipBandFullnessFR293(
      lipBandInput({
        upperVisibleLipBandBoundary: [
          ...upper,
          upper[0]!,
        ],
      }),
      reference(),
    )).toThrow(/must not repeat vertices or duplicate closure/u);
  });

  it('rejects a self-intersecting visible band polygon', () => {
    expect(() => computeVisibleLipBandFullnessFR293(
      lipBandInput({
        upperVisibleLipBandBoundary: [
          { x: -1, y: 0.2 },
          { x: 1, y: 0.6 },
          { x: -1, y: 0.6 },
          { x: 1, y: 0.2 },
        ],
      }),
      reference(),
    )).toThrow(/simple non-self-intersecting polygon/u);
  });

  it('rejects a cross-capture canonical asset join', () => {
    expect(() => computeVisibleLipBandFullnessFR293(
      lipBandInput({
        sourceCanonicalAssetDigest:
          'fr293:test:other-asset',
      }),
      reference(),
    )).toThrow(/must share canonical asset digest/u);
  });

  it('rejects visible lip-band geometry outside the FR79 mouth envelope', () => {
    expect(() => computeVisibleLipBandFullnessFR293(
      lipBandInput({
        upperVisibleLipBandBoundary: [
          { x: -3, y: 0.2 },
          { x: 1, y: 0.2 },
          { x: 1, y: 0.6 },
          { x: -3, y: 0.6 },
        ],
      }),
      reference(),
    )).toThrow(/visible mouth horizontal envelope/u);
  });

  it('raises the product map to 18 materialized columns and 11 gaps', () => {
    const materialized = FR293_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState ===
          'canonical_extractor_materialized',
    );

    expect(FR293_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(materialized).toHaveLength(18);
    expect(
      FR293_PRODUCT_COLUMN_MAP.length - materialized.length,
    ).toBe(11);
    expect(materialized.some((entry) =>
      entry.featureKey === 'mouth.visible_lip_fullness'))
      .toBe(true);
  });

  it('replaces only the existing FR292 lip-fullness gap', () => {
    const geometry = computeVisibleLipBandFullnessFR293(
      lipBandInput(),
      reference(),
    );
    const feature =
      materializeCanonicalLipFullnessFeatureFR293(
        geometry,
      );
    const prior = fakeFR292Prior();
    const priorKeys = prior.features.map(
      (candidate) => candidate.featureKey,
    );

    const upgraded =
      upgradeCanonicalRgbSelfieMorphologyFR293(
        prior,
        feature,
      );

    expect(upgraded.features.map(
      (candidate) => candidate.featureKey))
      .toEqual(priorKeys);
    expect(new Set(upgraded.features.map(
      (candidate) => candidate.featureKey)).size)
      .toBe(29);
    expect(upgraded.materializedRegionKeys)
      .toEqual(prior.materializedRegionKeys);
    expect(upgraded.schemaCoverage).toMatchObject({
      canonicalExtractorMaterializedCount: 18,
      extractorOrAuthorityGapCount: 11,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
    });
    expect(upgraded.features.find((candidate) =>
      candidate.featureKey === 'mouth.visible_lip_fullness'))
      .toMatchObject({
        status: 'available',
        value: { kind: 'composite_geometry' },
        providerLipContoursConsumed: false,
        providerComponentOrderConsumed: false,
        anatomicalOuterInnerRolesAssigned: false,
        physicalThicknessInterpretationApplied: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      });
  });

  it('rejects forged upstream geometry before issuing a full FR293 payload', () => {
    expect(() =>
      extractCanonicalRgbSelfieMorphologyFR293(
        {} as GovernedMetricGeometryCandidateFR77V1,
        {} as PoseNormalizedLipsGeometryFR79V1,
        {} as FR287GovernedNeutralNoseGeometryInput,
        {} as FR290VisibleAlarNostrilGeometryInput,
        {} as FR291VisiblePhiltrumGeometryInput,
        {} as FR292VisibleEyebrowPairGeometryInput,
        lipBandInput(),
      ),
    ).toThrow(/not issued/u);
  });
});
