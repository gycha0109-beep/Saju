import { describe, expect, it } from 'vitest';
import type {
  FR293CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr293.js';
import {
  FR293_COMBINED_AREA_METRIC_REF,
  FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
  FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
} from './visible-lip-band-fullness-fr293.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  buildFaceProductDisplayFactReceipt,
} from './index.js';

function quality(
  dependency = 'canonical_metric_geometry',
) {
  return {
    dependency,
    viewpointSensitivity:
      'not_characterized_by_fr283',
    evidenceRefs: [],
    poseAcceptanceThresholdIssued: false,
    correctionApplied: false,
    currentCapturePoseAdjudication:
      'not_issued' as const,
  };
}

function unavailableFeature(
  featureKey: string,
  regionKey: string,
) {
  return {
    featureKey,
    regionKey,
    status: 'unavailable' as const,
    reason: 'test_capture_unavailable',
    fallbackInvented: false as const,
    sourceMetricRefs: [],
    quality: quality(),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };
}

function fixture():
FR293CanonicalRgbSelfieMorphologyPayload {
  const features =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((entry) =>
        unavailableFeature(
          entry.featureKey,
          entry.regionKey,
        ),
      );

  function replace(
    featureKey: string,
    value: unknown,
  ): void {
    const index = features.findIndex(
      (feature) => feature.featureKey === featureKey,
    );
    if (index < 0) {
      throw new Error(`missing fixture feature: ${featureKey}`);
    }
    features[index] = value as typeof features[number];
  }

  replace('eye.width_height_ratio', {
    featureKey: 'eye.width_height_ratio',
    regionKey: 'eye_pair',
    status: 'available',
    value: {
      kind: 'scalar',
      value: 0.42,
      unit: 'ratio',
    },
    sourceMetricRefs: [
      'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
    ],
    quality: quality(),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });

  replace('mouth.width_and_relative_size', {
    featureKey: 'mouth.width_and_relative_size',
    regionKey: 'mouth_lips',
    status: 'available',
    value: {
      kind: 'continuous_axes',
      axes: [
        {
          axisKey: 'bounding_box_aspect_ratio',
          value: 2.1,
          unit: 'ratio',
          sourceMetricRef:
            'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
        },
        {
          axisKey:
            'horizontal_span_to_full_mesh_horizontal_span_ratio',
          value: 0.31,
          unit: 'ratio',
          sourceMetricRef:
            'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
        },
      ],
    },
    sourceMetricRefs: [
      'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
      'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
    ],
    quality: quality(),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });

  replace('chin_lower_face.visible_width_ratio', {
    featureKey: 'chin_lower_face.visible_width_ratio',
    regionKey: 'chin_lower_face',
    status: 'available',
    value: {
      kind: 'scalar',
      value: 0.68,
      unit: 'ratio',
    },
    sourceMetricRefs: [
      'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0',
    ],
    quality: quality(),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });

  replace('chin_lower_face.visible_contour', {
    featureKey: 'chin_lower_face.visible_contour',
    regionKey: 'chin_lower_face',
    status: 'available',
    value: {
      kind: 'canonical_contour_2d',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      coordinateUnit: 'centimeter',
      points: [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
      ],
      pointCount: 3,
      persistenceAllowed: false,
    },
    sourceMetricRefs: [
      'neutral.lower_face.visible_contour@0.1.0',
    ],
    quality: quality(),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });

  replace('nose.alar_width_and_nostril_geometry', {
    featureKey: 'nose.alar_width_and_nostril_geometry',
    regionKey: 'nose',
    status: 'available',
    value: {
      kind: 'composite_visible_nasal_geometry',
      axes: [
        {
          metricRef:
            'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
          value: 1.6,
          unit: 'ratio',
        },
        {
          metricRef:
            'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
          value: 1.8,
          unit: 'ratio',
        },
        {
          metricRef:
            'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
          value: 0.07,
          unit: 'ratio',
        },
      ],
    },
    sourceMetricRefs: [
      'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
      'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
      'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
    ],
    quality: quality('segmentation_and_visibility'),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    sourceLandmarkRefsExposed: false,
    anatomicalLateralityAssigned: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });

  replace('mouth.visible_lip_fullness', {
    featureKey: 'mouth.visible_lip_fullness',
    regionKey: 'mouth_lips',
    status: 'unavailable',
    reason: 'visible_mouth_horizontal_span_collapsed',
    fallbackInvented: false,
    sourceMetricRefs: [
      FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
      FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
      FR293_COMBINED_AREA_METRIC_REF,
    ],
    quality: quality('governed_contour_geometry'),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    sourceObservationRefsExposed: false,
    providerLipContoursConsumed: false,
    providerComponentOrderConsumed: false,
    anatomicalOuterInnerRolesAssigned: false,
    hiddenBoundaryInferred: false,
    physicalThicknessInterpretationApplied: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });

  return {
    schemaVersion:
      'fr293-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion:
      'FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
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
      canonicalExtractorMaterializedCount: 18,
      extractorOrAuthorityGapCount: 11,
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
      sameCaptureLipBandGeometryVerified: true,
      sourceLipBandObservationRefsExposed: false,
      sourceLipBandCanonicalAssetDigestExposed: false,
      providerLipContoursConsumed: false,
    } as never,
    authorityBoundary: {
      rawImageExposed: false,
      rawLandmarksExposed: false,
      providerLandmarkIndicesExposed: false,
      identityRecognitionApplied: false,
      biometricTemplateCreated: false,
      traditionalInterpretationIncluded: false,
      traditionalBindingIssued: false,
      thresholdIssued: false,
    } as never,
  };
}

describe('Face Product display-fact receipt', () => {
  it('binds all 29 FR293 columns to stable opaque observation refs', () => {
    const receipt = buildFaceProductDisplayFactReceipt(
      fixture(),
      'face-observation-artifact:test-001',
    );

    expect(receipt.facts).toHaveLength(29);
    expect(
      new Set(receipt.facts.map((fact) => fact.featureKey))
        .size,
    ).toBe(29);
    expect(
      new Set(
        receipt.facts.map((fact) => fact.observationRef),
      ).size,
    ).toBe(29);
    expect(receipt.coverage).toEqual({
      representedFeatureCount: 29,
      canonicalExtractorMaterializedCount: 18,
      extractorOrAuthorityGapCount: 11,
      availableDisplayFactCount: 4,
      unavailableDisplayFactCount: 25,
    });
  });

  it('exposes the four current DISCOVER structure values without semantic promotion', () => {
    const receipt = buildFaceProductDisplayFactReceipt(
      fixture(),
      'face-observation-artifact:test-002',
    );
    const keys = [
      'eye.width_height_ratio',
      'mouth.width_and_relative_size',
      'chin_lower_face.visible_width_ratio',
      'nose.alar_width_and_nostril_geometry',
    ] as const;

    for (const featureKey of keys) {
      const fact = receipt.facts.find(
        (candidate) =>
          candidate.featureKey === featureKey,
      );
      expect(fact?.status).toBe('available');
      expect(fact).toMatchObject({
        featureKey,
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        sourceObservationRefsExposed: false,
        sourceCanonicalAssetDigestExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      });
    }

    const nose = receipt.facts.find(
      (fact) =>
        fact.featureKey ===
        'nose.alar_width_and_nostril_geometry',
    );
    expect(nose?.status).toBe('available');
    if (nose?.status !== 'available') return;
    expect(nose.value).toMatchObject({
      kind: 'composite_visible_nasal_geometry',
    });
    if (nose.value.kind === 'scalar') return;
    expect(
      nose.value.axes.map((axis) => axis.sourceMetricRef),
    ).toEqual([
      'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
      'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
      'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
    ]);
  });

  it('does not persist the canonical contour point payload into Product display facts', () => {
    const receipt = buildFaceProductDisplayFactReceipt(
      fixture(),
      'face-observation-artifact:test-003',
    );
    expect(
      receipt.facts.find(
        (fact) =>
          fact.featureKey ===
          'chin_lower_face.visible_contour',
      ),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'product_display_value_not_persistable',
      sourceReason:
        'canonical_contour_2d_persistence_disallowed',
      fallbackInvented: false,
    });
    expect(JSON.stringify(receipt)).not.toContain(
      '"points"',
    );
  });

  it('fails closed if an FR293 hard-gap column is forged available', () => {
    const payload = fixture();
    const features = payload.features.map((feature) =>
      feature.featureKey === 'forehead.visible_width_shape'
        ? {
            ...feature,
            status: 'available' as const,
            value: {
              kind: 'scalar' as const,
              value: 1,
              unit: 'ratio' as const,
            },
          }
        : feature,
    );

    expect(() =>
      buildFaceProductDisplayFactReceipt(
        {
          ...payload,
          features: features as never,
        },
        'face-observation-artifact:test-004',
      ),
    ).toThrow(
      /unmaterialized Product column became available/u,
    );
  });

  it('changes observation refs only when the opaque observation artifact ref changes', () => {
    const payload = fixture();
    const first = buildFaceProductDisplayFactReceipt(
      payload,
      'face-observation-artifact:test-a',
    );
    const repeated = buildFaceProductDisplayFactReceipt(
      payload,
      'face-observation-artifact:test-a',
    );
    const other = buildFaceProductDisplayFactReceipt(
      payload,
      'face-observation-artifact:test-b',
    );

    expect(
      first.facts.map((fact) => fact.observationRef),
    ).toEqual(
      repeated.facts.map((fact) => fact.observationRef),
    );
    expect(
      first.facts.map((fact) => fact.observationRef),
    ).not.toEqual(
      other.facts.map((fact) => fact.observationRef),
    );
  });

  it('rejects raw or URL-like material masquerading as an observation artifact ref', () => {
    expect(() =>
      buildFaceProductDisplayFactReceipt(
        fixture(),
        'https://example.com/photo.jpg',
      ),
    ).toThrow(/opaque face-observation-artifact ref/u);

    expect(() =>
      buildFaceProductDisplayFactReceipt(
        fixture(),
        'face-observation-artifact:raw/photo.jpg',
      ),
    ).toThrow(/opaque face-observation-artifact ref/u);
  });
});
