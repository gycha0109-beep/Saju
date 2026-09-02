import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedNeutralMouthContourMetricFR80,
  computeNeutralMouthContourMetricFR80,
  getNeutralMouthContourMetricDefinitionFR80,
  type NeutralMouthContourMetricFR80V1,
} from './neutral-mouth-contour-metric-fr80.js';

function forgedFR79(): PoseNormalizedLipsGeometryFR79V1 {
  return {
    schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
    artifactVersion: '0.1.0',
    authorityState: 'governed_pose_normalized_lips_geometry_candidate_only',
    extensionMode: 'separate_contract_extension',
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1',
    baseFR15ContractMutated: false,
    surfaceKey: 'neutral.face.lips_contour_set',
    neutralConceptKey: 'lips_contour_set',
    observationClass: 'source_neutral_pose_normalized_geometry_extension',
    coordinateFrame: 'pose_normalized_face_2d',
    coordinateUnit: 'centimeter',
    poseCompensated: true,
    projectionRule: {
      schemaVersion: 'fr79-pose-normalized-lips-projection-rule-v1',
      artifactVersion: '0.1.0',
      authorityState: 'reviewed_neutral_orthographic_projection_rule',
      projectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      targetCoordinateFrame: 'pose_normalized_face_2d',
      sourceUnit: 'centimeter',
      targetCoordinateUnit: 'centimeter',
      projectionKind: 'canonical_frontal_orthographic_xy',
      formula: 'x2d=x3d;y2d=y3d',
      depthTreatment: 'drop_z_only_after_canonical_inverse_pose_alignment',
      axisConvention: 'retain_canonical_metric_x_right_y_up',
      recenteringApplied: false,
      rescalingApplied: false,
      perspectiveReprojectionApplied: false,
      screenCoordinateReconstructionApplied: false,
      poseCompensated: true,
      sourceAlignmentWitness: {
        repository: 'google-ai-edge/mediapipe',
        releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
        path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
        blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
        witnessedOperation: 'inverse_pose_align_metric_landmarks_to_canonical',
      },
      semanticAuthority: false,
    },
    contours: [0, 1].map((contourIndex) => ({
      contourRef: `fr79:forged:${contourIndex}`,
      geometry: {
        kind: 'region' as const,
        boundary: Array.from({ length: 20 }, (_, pointIndex) => ({
          x: pointIndex / 10,
          y: contourIndex + pointIndex / 20,
        })),
      },
      sourceMetricContourRef: `fr78:forged:${contourIndex}`,
      sourceComponentAuthority: 'unordered_provider_graph_component_only' as const,
      anatomicalRole: null,
      traditionalRole: null,
    })),
    contourCount: 2,
    contourPointCounts: [20, 20],
    contourConsumptionState: 'unordered_set_no_outer_inner_role',
    metricLipsGeometryConsumed: true,
    poseNormalizedLipsGeometryIssued: true,
    reviewed2DProjectionRuleIssued: true,
    depthOutputIssued: false,
    fr15ConsumerSlotIssued: false,
    neutralMetricDefinitionsIssued: 0,
    neutralMetricValuesIssued: 0,
    morphologyProduced: false,
    criterionStatesIssued: 0,
    claimsIssued: 0,
    traditionalSemanticAuthority: false,
    source: {
      fr78SchemaVersion: 'fr78-governed-metric-lips-surface-v1',
      fr78ArtifactVersion: '0.1.0',
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      providerTopologySourceBlobSha: '644de9d8c7cd90880d92b2393b4913fa93ace927',
      geometryMetadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
    },
    authorityBoundary: {
      governedResearchPoseNormalizedLipsGeometryAuthorized: true,
      productionNeutralObservationIssued: false,
      mutateFR15BaseContractAllowed: false,
      fr15ConsumerSlotIssuanceAllowed: false,
      outerInnerAnatomicalAssignmentAllowed: false,
      providerComponentOrderSemanticUseAllowed: false,
      providerVertexIndexOutputAllowed: false,
      metricDefinitionIssuanceAllowed: false,
      metricValueIssuanceAllowed: false,
      traditionalOperationalizationAllowed: false,
      morphologyClassificationAllowed: false,
      criterionStateIssuanceAllowed: false,
      claimIssuanceAllowed: false,
    },
    blockers: [
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ],
    prohibitedShortcuts: [
      'pose_normalized_lips_geometry_to_mouth_width_height_aspect_or_thickness_without_metric_definition',
      'unordered_pose_normalized_contours_to_outer_inner_anatomy',
      'pose_normalized_lips_geometry_to_square_broad_classification',
      'pose_normalized_lips_geometry_to_lips_substantial_classification',
      'orthographic_projection_rule_to_metric_threshold',
      'centimeter_plane_coordinate_to_physical_anthropometric_measurement',
      'provider_component_order_to_semantic_role',
    ],
    provenance: {
      providerRunRef: 'fr80:forged',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      rawProviderDepthPersisted: false,
      derivedMetricLipsSurfacePersisted: false,
      derivedPoseNormalizedLipsGeometryPersisted: false,
      biometricEmbeddingPersisted: false,
    },
  };
}

describe('FR80 neutral mouth contour metric', () => {
  it('defines one dimensionless unordered contour-set aspect metric with no traditional binding', () => {
    expect(getNeutralMouthContourMetricDefinitionFR80()).toEqual({
      schemaVersion: 'fr80-neutral-mouth-contour-metric-definition-v1',
      artifactVersion: '0.1.0',
      authorityState: 'reviewed_neutral_geometry_metric_definition_only',
      metricKey: 'neutral.mouth.contour_set.bounding_box_aspect_ratio',
      metricVersion: '0.1.0',
      metricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
      region: 'mouth',
      sourceSurfaceKey: 'neutral.face.lips_contour_set',
      coordinateFrame: 'pose_normalized_face_2d',
      unit: 'ratio',
      requiredGeometry: 'two_unordered_pose_normalized_lips_contours',
      formula: '(max_x-min_x)/(max_y-min_y) over the union of both contour point sets',
      outerInnerAnatomicalRoleRequired: false,
      providerComponentOrderRequired: false,
      absoluteWidthHeightIssued: false,
      physicalAnthropometricInterpretationAllowed: false,
      traditionalCriterionBindingRef: null,
      calibrationRef: null,
      interpretationBoundary: 'continuous_unordered_contour_set_shape_metric_only_no_physiognomy_classification',
    });
  });

  it('rejects structurally plausible but unissued FR79 geometry', () => {
    expect(() => computeNeutralMouthContourMetricFR80(forgedFR79()))
      .toThrow(/not issued by the active FR-79 projection boundary/u);
  });

  it('rejects structurally plausible but unissued FR80 metric output', () => {
    const forged = {
      schemaVersion: 'fr80-neutral-mouth-contour-metric-v1',
      authorityState: 'governed_neutral_mouth_contour_metric_only',
    } as unknown as NeutralMouthContourMetricFR80V1;
    expect(() => assertIssuedNeutralMouthContourMetricFR80(forged))
      .toThrow(/not issued by the active FR-80 metric boundary/u);
  });
});
