import { describe, expect, it } from 'vitest';
import type {
  FR291CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr291.js';
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
} from './visible-philtrum-geometry-fr291.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
  FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
} from './visible-philtrum-geometry-fr291.js';
import {
  FR292_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr292.js';
import {
  FR292_MEAN_ARCH_METRIC_REF,
  FR292_MEAN_SPAN_METRIC_REF,
  FR292_MEAN_TAIL_TILT_METRIC_REF,
  computeVisibleEyebrowPairGeometryFR292,
  type FR292VisibleEyebrowPairGeometryInput,
} from './visible-eyebrow-pair-geometry-fr292.js';
import {
  extractCanonicalRgbSelfieMorphologyFR292,
  materializeCanonicalEyebrowFeatureFR292,
  upgradeCanonicalRgbSelfieMorphologyFR292,
} from './canonical-rgb-selfie-morphology-fr292.js';

const ASSET = 'fr292:test:asset';

function eyebrowInput(
  overrides:
    Partial<FR292VisibleEyebrowPairGeometryInput> = {},
): FR292VisibleEyebrowPairGeometryInput {
  return {
    schemaVersion:
      'fr292-visible-eyebrow-pair-input-v1',
    authorityState:
      'governed_explicit_visible_eyebrow_pair_geometry_only',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    unorderedVisibleBrows: [
      {
        medialEndpoint: { x: -1, y: 0 },
        lateralEndpoint: { x: -3, y: 0 },
        orderedVisibleCurve: [
          { x: -1, y: 0 },
          { x: -2, y: 1 },
          { x: -3, y: 0 },
        ],
      },
      {
        medialEndpoint: { x: 1, y: 0 },
        lateralEndpoint: { x: 3, y: 0 },
        orderedVisibleCurve: [
          { x: 1, y: 0 },
          { x: 2, y: 1 },
          { x: 3, y: 0 },
        ],
      },
    ],
    visibleFaceWidthPair: [
      { x: -5, y: 0 },
      { x: 5, y: 0 },
    ],
    visibilityAdmitted: true,
    explicitVisibleEndpointRolesProvided: true,
    sameCaptureAsFR77FullFaceVerified: true,
    sourceCanonicalAssetDigest: ASSET,
    sourceObservationRefs: [
      'fr292:test:explicit-visible-brow-observer',
    ],
    providerComponentIdentityUsed: false,
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    anatomicalBoundaryRoleAssigned: false,
    traditionalBindingApplied: false,
    ...overrides,
  };
}

function philtrumAxis(
  metricRef:
    | typeof FR291_VISIBLE_GROOVE_AXIS_METRIC_REF
    | typeof FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
  value: number,
) {
  return {
    metricRef,
    value,
    unit: 'ratio' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    scaleInvariant: true as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    physicalAnthropometryAllowed: false as const,
    anatomicalInterpretationAllowed: false as const,
  };
}

function fakeFR291Prior():
FR291CanonicalRgbSelfieMorphologyPayload {
  const philtrumFeature = {
    featureKey:
      'mouth.philtrum_length_width' as const,
    regionKey: 'mouth_lips' as const,
    status: 'available' as const,
    value: {
      kind: 'composite_continuous_axes' as const,
      axes: [
        philtrumAxis(
          FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
          0.2,
        ),
        philtrumAxis(
          FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
          0.1,
        ),
      ] as const,
    },
    sourceMetricRefs: [
      FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
      FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
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
    sourceObservationRefsExposed: false as const,
    anatomicalLandmarkNamesAssigned: false as const,
    hiddenBoundaryInferred: false as const,
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
          'mouth.philtrum_length_width'
        ) return philtrumFeature;

        if (
          entry.featureKey ===
          'eyebrow.span_arch_tail_orientation'
        ) {
          return {
            featureKey: entry.featureKey,
            regionKey: 'eyebrow',
            status: 'unavailable',
            reason:
              'eyebrow_boundary_role_wiring_not_materialized',
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
      'fr291-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion:
      'FR291-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
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
      canonicalExtractorMaterializedCount: 16,
      extractorOrAuthorityGapCount: 13,
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

describe('FR292 visible eyebrow pair geometry', () => {
  it('aggregates the two explicit visible curves into three neutral pair axes', () => {
    const result =
      computeVisibleEyebrowPairGeometryFR292(
        eyebrowInput(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.axes.map((axis) => axis.metricRef))
      .toEqual([
        FR292_MEAN_SPAN_METRIC_REF,
        FR292_MEAN_ARCH_METRIC_REF,
        FR292_MEAN_TAIL_TILT_METRIC_REF,
      ]);
    expect(result.axes[0].value).toBeCloseTo(0.2, 10);
    expect(result.axes[1].value).toBeCloseTo(0.5, 10);
    expect(result.axes[2].value).toBeCloseTo(0, 10);
    expect(result.browPairOrderSemantic).toBe(false);
    expect(result.source).toMatchObject({
      explicitVisibleSemanticCurvesConsumed: true,
      providerEyebrowComponentsConsumed: false,
      providerComponentRoleMappingIssued: false,
      providerSpecificIndicesExposed: false,
      rawLandmarksExposed: false,
      anatomicalBoundaryRoleAssigned: false,
    });
  });

  it('is invariant to eyebrow pair order', () => {
    const input = eyebrowInput();
    const reversed = eyebrowInput({
      unorderedVisibleBrows: [
        input.unorderedVisibleBrows[1],
        input.unorderedVisibleBrows[0],
      ],
    });

    const a =
      computeVisibleEyebrowPairGeometryFR292(input);
    const b =
      computeVisibleEyebrowPairGeometryFR292(reversed);

    expect(a.status).toBe('available');
    expect(b.status).toBe('available');
    if (a.status !== 'available' || b.status !== 'available') {
      return;
    }

    expect(a.axes.map((axis) => axis.value))
      .toEqual(b.axes.map((axis) => axis.value));
  });

  it('is invariant to visible face-width pair order', () => {
    const input = eyebrowInput();
    const reversed = eyebrowInput({
      visibleFaceWidthPair: [
        input.visibleFaceWidthPair[1],
        input.visibleFaceWidthPair[0],
      ],
    });

    const a =
      computeVisibleEyebrowPairGeometryFR292(input);
    const b =
      computeVisibleEyebrowPairGeometryFR292(reversed);

    expect(a.status).toBe('available');
    expect(b.status).toBe('available');
    if (a.status !== 'available' || b.status !== 'available') {
      return;
    }

    expect(a.axes.map((axis) => axis.value))
      .toEqual(b.axes.map((axis) => axis.value));
  });

  it('fails closed when the visible face width collapses', () => {
    const result =
      computeVisibleEyebrowPairGeometryFR292(
        eyebrowInput({
          visibleFaceWidthPair: [
            { x: 0, y: 0 },
            { x: 0, y: 2 },
          ],
        }),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'visible_face_width_collapsed',
      fallbackInvented: false,
    });
  });

  it('fails closed when a visible brow horizontal span collapses', () => {
    const input = eyebrowInput();
    const result =
      computeVisibleEyebrowPairGeometryFR292(
        eyebrowInput({
          unorderedVisibleBrows: [
            {
              medialEndpoint: { x: -2, y: 0 },
              lateralEndpoint: { x: -2, y: 1 },
              orderedVisibleCurve: [
                { x: -2, y: 0 },
                { x: -2.1, y: 0.5 },
                { x: -2, y: 1 },
              ],
            },
            input.unorderedVisibleBrows[1],
          ],
        }),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'visible_brow_horizontal_span_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects malformed semantic curves through the FR208 boundary', () => {
    const input = eyebrowInput();
    expect(() =>
      computeVisibleEyebrowPairGeometryFR292(
        eyebrowInput({
          unorderedVisibleBrows: [
            {
              ...input.unorderedVisibleBrows[0],
              orderedVisibleCurve: [
                { x: -2, y: 1 },
                { x: -1, y: 0 },
                { x: -3, y: 0 },
              ],
            },
            input.unorderedVisibleBrows[1],
          ],
        }),
      ),
    ).toThrow(/must begin at medialEndpoint/u);
  });

  it('rejects visible brow points outside the supplied face envelope', () => {
    const input = eyebrowInput();
    expect(() =>
      computeVisibleEyebrowPairGeometryFR292(
        eyebrowInput({
          unorderedVisibleBrows: [
            {
              medialEndpoint: { x: -1, y: 0 },
              lateralEndpoint: { x: -6, y: 0 },
              orderedVisibleCurve: [
                { x: -1, y: 0 },
                { x: -3, y: 1 },
                { x: -6, y: 0 },
              ],
            },
            input.unorderedVisibleBrows[1],
          ],
        }),
      ),
    ).toThrow(/visible face horizontal envelope/u);
  });

  it('raises the product map to 17 materialized columns and 12 gaps', () => {
    const materialized = FR292_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState ===
          'canonical_extractor_materialized',
    );

    expect(FR292_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(materialized).toHaveLength(17);
    expect(
      FR292_PRODUCT_COLUMN_MAP.length - materialized.length,
    ).toBe(12);
    expect(materialized.some((entry) =>
      entry.featureKey ===
        'eyebrow.span_arch_tail_orientation'))
      .toBe(true);
  });

  it('replaces only the FR291 eyebrow wiring gap and adds eyebrow to materialized regions', () => {
    const geometry =
      computeVisibleEyebrowPairGeometryFR292(
        eyebrowInput(),
      );
    const feature =
      materializeCanonicalEyebrowFeatureFR292(geometry);
    const prior = fakeFR291Prior();
    const priorKeys = prior.features.map(
      (candidate) => candidate.featureKey,
    );

    const upgraded =
      upgradeCanonicalRgbSelfieMorphologyFR292(
        prior,
        feature,
      );

    expect(upgraded.features.map(
      (candidate) => candidate.featureKey))
      .toEqual(priorKeys);
    expect(new Set(upgraded.features.map(
      (candidate) => candidate.featureKey)).size)
      .toBe(29);
    expect(upgraded.materializedRegionKeys).toEqual([
      'eye_pair',
      'mouth_lips',
      'cheek_mid_face',
      'chin_lower_face',
      'nose',
      'eyebrow',
    ]);
    expect(upgraded.schemaCoverage).toMatchObject({
      canonicalExtractorMaterializedCount: 17,
      extractorOrAuthorityGapCount: 12,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
    });
    expect(upgraded.features.find((candidate) =>
      candidate.featureKey ===
        'eyebrow.span_arch_tail_orientation'))
      .toMatchObject({
        status: 'available',
        value: {
          kind: 'composite_continuous_axes',
        },
        providerEyebrowComponentsConsumed: false,
        providerComponentRoleMappingIssued: false,
        anatomicalBoundaryRoleAssigned: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      });
  });

  it('rejects forged upstream geometry before issuing a full FR292 payload', () => {
    expect(() =>
      extractCanonicalRgbSelfieMorphologyFR292(
        {} as GovernedMetricGeometryCandidateFR77V1,
        {} as PoseNormalizedLipsGeometryFR79V1,
        {} as FR287GovernedNeutralNoseGeometryInput,
        {} as FR290VisibleAlarNostrilGeometryInput,
        {} as FR291VisiblePhiltrumGeometryInput,
        eyebrowInput(),
      ),
    ).toThrow(/not issued/u);
  });
});
