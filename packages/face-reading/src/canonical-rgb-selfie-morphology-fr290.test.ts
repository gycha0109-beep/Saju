import { describe, expect, it } from 'vitest';
import type {
  FR289CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr289.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF,
  FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF,
  FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF,
} from './visible-lower-face-dimensions-fr289.js';
import {
  FR290_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr290.js';
import {
  FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
  FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
  FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
  computeVisibleAlarNostrilGeometryFR290,
  type FR290VisibleAlarNostrilGeometryInput,
} from './visible-alar-nostril-geometry-fr290.js';
import {
  extractCanonicalRgbSelfieMorphologyFR290,
  materializeCanonicalAlarNostrilFeatureFR290,
  upgradeCanonicalRgbSelfieMorphologyFR290,
} from './canonical-rgb-selfie-morphology-fr290.js';
import type {
  NeutralFaceGeometryProvenance,
  NoseTipContourGeometryInput,
} from './nose-geometry.js';

const PROVENANCE: NeutralFaceGeometryProvenance = {
  observationContractVersion: 'fr290:test:observation@1',
  extractorVersion: 'fr290:test:extractor@1',
  modelVersion: 'fr290:test:model@1',
  coordinateFrame: 'pose_normalized_face_2d',
  poseCompensated: true,
  sourceLandmarkRefs: ['fr290:test:semantic-visible-boundary'],
};

function tipInput(
  provenance: NeutralFaceGeometryProvenance = PROVENANCE,
): NoseTipContourGeometryInput {
  return {
    provenance,
    contourPoints: [
      { x: -1, y: 0 },
      { x: -0.5, y: -0.6 },
      { x: 0, y: -0.8 },
      { x: 0.5, y: -0.6 },
      { x: 1, y: 0 },
      { x: 0, y: 0.5 },
    ],
  };
}

function alarInput(
  contours: FR290VisibleAlarNostrilGeometryInput[
    'unorderedVisibleNostrilContours'
  ] = [
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0.5 },
      { x: -1, y: 0.5 },
    ],
    [
      { x: 0.5, y: 0 },
      { x: 1.5, y: 0 },
      { x: 1.5, y: 0.5 },
      { x: 0.5, y: 0.5 },
    ],
  ],
): FR290VisibleAlarNostrilGeometryInput {
  return {
    schemaVersion:
      'fr290-visible-alar-nostril-geometry-input-v1',
    authorityState:
      'governed_visible_nasal_boundary_observation_only',
    provenance: PROVENANCE,
    visibleAlarBoundaryPair: [
      { x: -1.5, y: 0 },
      { x: 1.5, y: 0 },
    ],
    unorderedVisibleNostrilContours: contours,
    sameCaptureAsFR287NoseVerified: true,
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    anatomicalLateralityAssigned: false,
    traditionalBindingApplied: false,
  };
}

function neutralAxis(
  metricRef:
    | typeof FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF
    | typeof FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF
    | typeof FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF,
  value: number,
) {
  return {
    metricRef,
    value,
    unit: 'ratio' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  };
}

function fakeFR289Prior():
FR289CanonicalRgbSelfieMorphologyPayload {
  const chinFeature = {
    featureKey:
      'chin_lower_face.chin_height_width_center_deviation' as const,
    regionKey: 'chin_lower_face' as const,
    status: 'available' as const,
    value: {
      kind: 'composite_continuous_axes' as const,
      axes: [
        neutralAxis(
          FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF,
          0.6,
        ),
        neutralAxis(
          FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF,
          0.5,
        ),
        neutralAxis(
          FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF,
          0,
        ),
      ] as const,
    },
    sourceMetricRefs: [
      FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF,
      FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF,
      FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF,
    ],
    quality: {
      dependency: 'governed_contour_geometry' as const,
      viewpointSensitivity:
        'not_characterized_by_fr283' as const,
      evidenceRefs: [],
      poseAcceptanceThresholdIssued: false as const,
      correctionApplied: false as const,
      currentCapturePoseAdjudication: 'not_issued' as const,
    },
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
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
          'chin_lower_face.chin_height_width_center_deviation'
        ) return chinFeature;
        if (
          entry.featureKey ===
          'nose.alar_width_and_nostril_geometry'
        ) {
          return {
            featureKey: entry.featureKey,
            regionKey: 'nose',
            status: 'unavailable',
            reason: 'alar_nostril_extractor_not_materialized',
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
      'fr289-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion:
      'FR289-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
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
      canonicalExtractorMaterializedCount: 14,
      extractorOrAuthorityGapCount: 15,
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

describe('FR290 visible alar and nostril geometry', () => {
  it('derives exactly three scale-invariant neutral nasal axes', () => {
    const result = computeVisibleAlarNostrilGeometryFR290(
      alarInput(),
      tipInput(),
    );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.axes.map((axis) => axis.metricRef))
      .toEqual([
        FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
        FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
        FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
      ]);
    expect(result.axes[0].value).toBeCloseTo(1.5, 10);
    expect(result.axes[1].value).toBeCloseTo(2, 10);
    expect(result.axes[2].value).toBeCloseTo(0, 10);
    expect(result.axes.every((axis) =>
      axis.anatomicalLateralityAssigned === false &&
      axis.anatomicalInterpretationAllowed === false &&
      axis.traditionalBindingApplied === false &&
      axis.thresholdApplied === false))
      .toBe(true);
  });

  it('is invariant to the unordered nostril contour array order', () => {
    const first = alarInput();
    const reversed = alarInput([
      first.unorderedVisibleNostrilContours[1],
      first.unorderedVisibleNostrilContours[0],
    ]);

    const a = computeVisibleAlarNostrilGeometryFR290(
      first,
      tipInput(),
    );
    const b = computeVisibleAlarNostrilGeometryFR290(
      reversed,
      tipInput(),
    );

    expect(a.status).toBe('available');
    expect(b.status).toBe('available');
    if (a.status !== 'available' || b.status !== 'available') {
      return;
    }
    expect(a.axes.map((axis) => axis.value))
      .toEqual(b.axes.map((axis) => axis.value));
  });

  it('does not depend on alar boundary pair ordering', () => {
    const input = alarInput();
    const reversed: FR290VisibleAlarNostrilGeometryInput = {
      ...input,
      visibleAlarBoundaryPair: [
        input.visibleAlarBoundaryPair[1],
        input.visibleAlarBoundaryPair[0],
      ],
    };

    const a = computeVisibleAlarNostrilGeometryFR290(
      input,
      tipInput(),
    );
    const b = computeVisibleAlarNostrilGeometryFR290(
      reversed,
      tipInput(),
    );

    expect(a.status).toBe('available');
    expect(b.status).toBe('available');
    if (a.status !== 'available' || b.status !== 'available') {
      return;
    }
    expect(a.axes[0].value).toBe(b.axes[0].value);
  });

  it('fails closed when visible alar width collapses', () => {
    const input = alarInput();
    const result = computeVisibleAlarNostrilGeometryFR290(
      {
        ...input,
        visibleAlarBoundaryPair: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ],
      },
      tipInput(),
    );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'visible_alar_horizontal_span_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects mismatched governed nose provenance instead of joining captures', () => {
    expect(() => computeVisibleAlarNostrilGeometryFR290(
      alarInput(),
      tipInput({
        ...PROVENANCE,
        modelVersion: 'fr290:test:other-model',
      }),
    )).toThrow(/must share observation, extractor, and model versions/u);
  });

  it('rejects duplicate-closure nostril contours', () => {
    const bad = alarInput([
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0.5 },
        { x: -1, y: 0.5 },
        { x: -1, y: 0 },
      ],
      [
        { x: 0.5, y: 0 },
        { x: 1.5, y: 0 },
        { x: 1.5, y: 0.5 },
        { x: 0.5, y: 0.5 },
      ],
    ]);

    expect(() => computeVisibleAlarNostrilGeometryFR290(
      bad,
      tipInput(),
    )).toThrow(/must not repeat vertices or duplicate closure/u);
  });

  it('raises the column map to 15 materialized columns and 14 gaps', () => {
    const materialized = FR290_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState ===
          'canonical_extractor_materialized',
    );

    expect(FR290_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(materialized).toHaveLength(15);
    expect(FR290_PRODUCT_COLUMN_MAP.length - materialized.length)
      .toBe(14);
    expect(materialized.some((entry) =>
      entry.featureKey ===
        'nose.alar_width_and_nostril_geometry'))
      .toBe(true);
  });

  it('replaces only the existing FR289 alar/nostril gap', () => {
    const geometry = computeVisibleAlarNostrilGeometryFR290(
      alarInput(),
      tipInput(),
    );
    const feature =
      materializeCanonicalAlarNostrilFeatureFR290(geometry);
    const prior = fakeFR289Prior();
    const priorKeys = prior.features.map(
      (candidate) => candidate.featureKey,
    );

    const upgraded = upgradeCanonicalRgbSelfieMorphologyFR290(
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
      canonicalExtractorMaterializedCount: 15,
      extractorOrAuthorityGapCount: 14,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
    });
    expect(upgraded.features.find((candidate) =>
      candidate.featureKey ===
        'nose.alar_width_and_nostril_geometry'))
      .toMatchObject({
        status: 'available',
        value: {
          kind: 'composite_visible_nasal_geometry',
        },
        traditionalBindingApplied: false,
        anatomicalLateralityAssigned: false,
        classificationApplied: false,
        thresholdApplied: false,
      });
  });

  it('rejects forged upstream geometry before issuing a full FR290 payload', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR290(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
      {} as FR287GovernedNeutralNoseGeometryInput,
      alarInput(),
    )).toThrow(/not issued/u);
  });
});
