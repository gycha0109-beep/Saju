import {
  FR4_NOSE_NEUTRAL_METRICS_V0,
} from './nose-geometry.js';
import {
  FR266_RESEARCH_NOTE_REF,
  PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  assertProviderIndependentNasalApexAuthorityFR266,
} from './provider-independent-nasal-apex-reference-fr266.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR295_RGB_RELATIVE_3D_TARGETS,
  assertFR295RgbRelative3DBenchmarkProtocol,
} from './rgb-relative-3d-benchmark-protocol-fr295.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR296_NOSE_PROJECTION_REFERENCE_READINESS_CONTRACT_VERSION =
  'FR296-NOSE-TIP-BRIDGE-RELATIVE-PROJECTION-REFERENCE-READINESS-v1' as const;

export const FR296_TARGET_FEATURE_KEY =
  'nose.tip_bridge_relative_projection' as const;

export const FR296_EXISTING_BRIDGE_METRIC_REF =
  'neutral.nose.bridge.centerline_rms_deviation@0.1.0' as const;

export const FR296_NOSE_PROJECTION_REFERENCE_READINESS =
  Object.freeze({
    schemaVersion:
      'fr296-nose-tip-bridge-relative-projection-reference-readiness-v1' as const,
    contractVersion:
      FR296_NOSE_PROJECTION_REFERENCE_READINESS_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    targetFeatureKey: FR296_TARGET_FEATURE_KEY,
    authorityState:
      'blocked_missing_provider_independent_3d_bridge_reference_and_relative_projection_axis' as const,
    tipSidePredecessor: Object.freeze({
      authorityRef: FR266_RESEARCH_NOTE_REF,
      annotationDefinition:
        'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d' as const,
      coordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      providerIndependentDefinitionGoverned: true as const,
      realAnnotationInstanceSuppliedByFR296: false as const,
      acquisitionValidatedByFR296: false as const,
      usableAsFrozenBenchmarkReferenceWithoutRealAnnotation:
        false as const,
    }),
    bridgeSidePredecessor: Object.freeze({
      existingMetricRef: FR296_EXISTING_BRIDGE_METRIC_REF,
      existingMetricCoordinateFrame:
        'pose_normalized_face_2d' as const,
      existingMetricSemantics:
        'bridge_centerline_shape_deviation_only' as const,
      providerIndependent3DReferenceDefinitionGoverned:
        false as const,
      usableAsRelative3DReference: false as const,
    }),
    referenceAxis: Object.freeze({
      status: 'blocked' as const,
      blockers: Object.freeze([
        'provider_independent_3d_bridge_reference_definition_missing',
        'real_independent_3d_tip_bridge_reference_acquisition_not_bound',
        'tip_bridge_relative_projection_axis_definition_missing',
      ] as const),
      requiredNextEvidence: Object.freeze([
        'govern_provider_independent_3d_bridge_reference_definition',
        'acquire_and_freeze_real_provider_blind_tip_and_bridge_reference_evidence',
        'bind_same_capture_or_validated_registration',
        'freeze_neutral_tip_bridge_relative_projection_axis_before_candidate_scoring',
      ] as const),
    }),
    prohibitedShortcuts: Object.freeze([
      'reuse_2d_bridge_centerline_deviation_as_3d_projection_reference',
      'reuse_candidate_provider_z_as_benchmark_ground_truth',
      'infer_bridge_depth_from_2d_centerline_shape',
      'infer_traditional_nose_semantics_from_relative_projection',
    ] as const),
    authorityBoundary: Object.freeze({
      realIndependent3DReferenceIssued: false as const,
      referenceAxisDefinitionIssued: false as const,
      rgbCandidateIssued: false as const,
      benchmarkWinnerIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      physicalDepthProductOutputIssued: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-296 ${message}`);
}

export function assertFR296NoseProjectionReferenceReadiness(): void {
  assertFR295RgbRelative3DBenchmarkProtocol();
  assertProviderIndependentNasalApexAuthorityFR266(
    PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  );
  assertFR293ProductColumnMap();

  if (
    !FR295_RGB_RELATIVE_3D_TARGETS.includes(
      FR296_TARGET_FEATURE_KEY,
    )
  ) {
    fail('target must remain an FR295 RGB relative-3D benchmark target.');
  }

  const tipAuthority =
    PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266;
  if (
    tipAuthority.protocol.sourceFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    tipAuthority.protocol.providerBlindAnnotationRequired !== true ||
    tipAuthority.protocol.providerIndexBlindAnnotationRequired !==
      true ||
    tipAuthority.protocol.traditionalLabelBlindAnnotationRequired !==
      true ||
    tipAuthority.protocol.freezeBeforeProviderScoringRequired !== true ||
    tipAuthority.authorityBoundary
      .automatedExtractionIssued !== false ||
    tipAuthority.authorityBoundary
      .traditionalSemanticProjectionAllowed !== false ||
    tipAuthority.authorityBoundary
      .productionGeometryAuthorized !== false
  ) {
    fail('FR266 tip-side predecessor authority drift.');
  }

  const bridgeMetric = FR4_NOSE_NEUTRAL_METRICS_V0.find(
    (candidate) =>
      `${candidate.metricKey}@${candidate.version}` ===
      FR296_EXISTING_BRIDGE_METRIC_REF,
  );
  if (
    bridgeMetric === undefined ||
    bridgeMetric.coordinateFrame !== 'pose_normalized_face_2d' ||
    bridgeMetric.unit !== 'ratio' ||
    !bridgeMetric.requiredSemanticInputs.includes(
      'ordered_nose_bridge_centerline_points',
    )
  ) {
    fail('existing bridge metric predecessor drift.');
  }

  const readiness = FR296_NOSE_PROJECTION_REFERENCE_READINESS;
  if (
    readiness.targetFeatureKey !== FR296_TARGET_FEATURE_KEY ||
    readiness.authorityState !==
      'blocked_missing_provider_independent_3d_bridge_reference_and_relative_projection_axis' ||
    readiness.tipSidePredecessor
      .providerIndependentDefinitionGoverned !== true ||
    readiness.tipSidePredecessor
      .realAnnotationInstanceSuppliedByFR296 !== false ||
    readiness.tipSidePredecessor
      .usableAsFrozenBenchmarkReferenceWithoutRealAnnotation !== false ||
    readiness.bridgeSidePredecessor
      .existingMetricCoordinateFrame !== 'pose_normalized_face_2d' ||
    readiness.bridgeSidePredecessor
      .providerIndependent3DReferenceDefinitionGoverned !== false ||
    readiness.bridgeSidePredecessor
      .usableAsRelative3DReference !== false ||
    readiness.referenceAxis.status !== 'blocked'
  ) {
    fail('reference readiness boundary drift.');
  }

  if (
    readiness.referenceAxis.blockers.length !== 3 ||
    new Set(readiness.referenceAxis.blockers).size !== 3 ||
    readiness.referenceAxis.requiredNextEvidence.length !== 4 ||
    new Set(readiness.referenceAxis.requiredNextEvidence).size !== 4 ||
    readiness.prohibitedShortcuts.length !== 4 ||
    new Set(readiness.prohibitedShortcuts).size !== 4
  ) {
    fail('blocker, evidence, or shortcut inventory drift.');
  }

  if (
    Object.values(readiness.authorityBoundary).some(
      (value) => value !== false,
    )
  ) {
    fail('FR296 widened into benchmark, semantic, or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR296 must not promote an FR293 product column.');
  }
}

assertFR296NoseProjectionReferenceReadiness();
