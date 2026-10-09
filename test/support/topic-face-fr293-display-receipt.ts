import {
  FACE_ENGINE_FR293_AUTHORITY_STATE,
  FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION,
  FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF,
  FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION,
} from '../../src/face-topic/live-fr293-reader.js';

const FEATURE_KEYS = Object.freeze([
  'forehead.visible_width_shape',
  'forehead.visible_hairline_boundary',
  'forehead.relative_surface_curvature',
  'eyebrow.span_arch_tail_orientation',
  'eyebrow.visible_hair_density_texture',
  'eye.width_height_ratio',
  'eye.inter_eye_spacing_ratio',
  'eye.outer_corner_tilt',
  'eye.bilateral_shape_asymmetry',
  'eye.eyelid_crease_or_hooded_category',
  'nose.bridge_centerline_deviation',
  'nose.tip_contour_circularity',
  'nose.alar_width_and_nostril_geometry',
  'nose.tip_bridge_relative_projection',
  'mouth.width_and_relative_size',
  'mouth.corner_orientation',
  'mouth.outline_angularity',
  'mouth.visible_lip_fullness',
  'mouth.philtrum_length_width',
  'mouth.visible_lip_color',
  'ear.visible_boundary_height_shape',
  'ear.thickness_attachment_canal_boundary',
  'cheek_midface.visible_width_ratio',
  'cheek_midface.visible_contour_prominence',
  'cheek_midface.relative_3d_prominence',
  'chin_lower_face.visible_width_ratio',
  'chin_lower_face.visible_contour',
  'chin_lower_face.chin_height_width_center_deviation',
  'chin_lower_face.relative_projection',
] as const);

const AVAILABLE_STRUCTURE_KEYS =
  new Set<string>([
    'eye.width_height_ratio',
    'mouth.width_and_relative_size',
    'chin_lower_face.visible_width_ratio',
    'nose.alar_width_and_nostril_geometry',
  ]);

function observationRef(
  artifactRef: string,
  featureKey: string,
): string {
  return [
    'face-neutral-observation:v1',
    encodeURIComponent(artifactRef),
    encodeURIComponent(featureKey),
  ].join(':');
}

function displayValue(
  featureKey: string,
): unknown {
  switch (featureKey) {
    case 'eye.width_height_ratio':
      return {
        kind: 'scalar',
        value: 0.42,
        unit: 'ratio',
      };
    case 'mouth.width_and_relative_size':
      return {
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
      };
    case 'chin_lower_face.visible_width_ratio':
      return {
        kind: 'scalar',
        value: 0.68,
        unit: 'ratio',
      };
    case 'nose.alar_width_and_nostril_geometry':
      return {
        kind:
          'composite_visible_nasal_geometry',
        axes: [
          {
            axisKey:
              'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
            value: 1.6,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
          },
          {
            axisKey:
              'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
            value: 1.8,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
          },
          {
            axisKey:
              'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
            value: 0.07,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
          },
        ],
      };
    default:
      throw new Error(
        `no display value fixture for ${featureKey}`,
      );
  }
}

function regionKey(featureKey: string): string {
  return featureKey.split('.')[0] ?? 'face';
}

export function buildFR293ProductDisplayReceiptForTopicFaceTest(
  observationArtifactRef: string,
): Record<string, unknown> {
  const facts = FEATURE_KEYS.map(
    (featureKey) => {
      const base = {
        featureKey,
        observationRef: observationRef(
          observationArtifactRef,
          featureKey,
        ),
        regionKey: regionKey(featureKey),
        sourceMetricRefs:
          AVAILABLE_STRUCTURE_KEYS.has(featureKey)
            ? [
                `neutral.test.${featureKey}@0.1.0`,
              ]
            : [],
        quality: {
          dependency:
            'canonical_metric_geometry',
          viewpointSensitivity:
            'not_characterized_by_fr283',
          evidenceRefs: [],
          poseAcceptanceThresholdIssued: false,
          correctionApplied: false,
          currentCapturePoseAdjudication:
            'not_issued',
        },
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        sourceObservationRefsExposed: false,
        sourceCanonicalAssetDigestExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      };

      if (
        AVAILABLE_STRUCTURE_KEYS.has(featureKey)
      ) {
        return {
          ...base,
          status: 'available',
          value: displayValue(featureKey),
        };
      }

      return {
        ...base,
        status: 'unavailable',
        reason: 'source_feature_unavailable',
        sourceReason:
          'test_capture_unavailable',
        fallbackInvented: false,
      };
    },
  );

  return {
    schemaVersion:
      FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION,
    authorityRef:
      FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF,
    observationArtifactRef,
    sourceContractVersion:
      FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION,
    authorityState:
      FACE_ENGINE_FR293_AUTHORITY_STATE,
    facts,
    coverage: {
      representedFeatureCount: 29,
      canonicalExtractorMaterializedCount: 18,
      extractorOrAuthorityGapCount: 11,
      availableDisplayFactCount: 4,
      unavailableDisplayFactCount: 25,
    },
    provenance: {
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      sourceObservationRefsExposed: false,
      providerLandmarkIndicesExposed: false,
      rawLandmarksExposed: false,
    },
    authorityBoundary: {
      neutralObservationOnly: true,
      rawImageExposed: false,
      rawLandmarksExposed: false,
      providerLandmarkIndicesExposed: false,
      sourceObservationRefsExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      identityRecognitionApplied: false,
      biometricTemplateCreated: false,
      traditionalInterpretationIncluded: false,
      traditionalBindingIssued: false,
      classifierIssued: false,
      thresholdIssued: false,
      commerceActivated: false,
    },
  };
}
