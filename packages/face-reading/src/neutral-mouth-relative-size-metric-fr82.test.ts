import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedNeutralMouthRelativeSizeMetricFR82,
  computeNeutralMouthRelativeSizeMetricFR82,
  getNeutralMouthRelativeSizeMetricDefinitionFR82,
  type NeutralMouthRelativeSizeMetricFR82V1,
} from './neutral-mouth-relative-size-metric-fr82.js';

function forgedFR77(): GovernedMetricGeometryCandidateFR77V1 {
  return {
    schemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
    artifactVersion: '0.1.0',
    authorityState: 'governed_metric_geometry_candidate_only',
    provider: {
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      providerRunRef: 'fr82:forged',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      providerLandmarkCount: 478,
      geometryLandmarkCount: 468,
      irisLandmarksExcluded: true,
      providerDepthConsumedForMetricGeometry: true,
      fr61ContractModified: false,
    },
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    frame: { width: 820, height: 1024 },
    metricLandmarks: Array.from({ length: 468 }, (_, index) => ({ x: index / 100, y: 0, z: 0 })),
    poseTransformMatrixPackedColumnMajor: Array.from({ length: 16 }, (_, index) => index % 5 === 0 ? 1 : 0),
    geometryProfile: {
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      metadataPath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
      metadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
      exactGitBlobVerified: true,
      procrustesBasisCount: 33,
    },
    authorityBoundary: {
      governedResearchMetricGeometryOutputAuthorized: true,
      productionNeutralObservationIssued: false,
      metricLipsGeometryIssued: false,
      poseNormalizedLipsGeometryIssued: false,
      reviewed2DProjectionRuleIssued: false,
      neutralMetricDefinitionsIssued: 0,
      neutralMetricValuesIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    },
    persistencePolicy: {
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      rawProviderDepthPersisted: false,
      rawGeometryMetadataPersisted: false,
      derivedMetricGeometryPersisted: false,
      biometricEmbeddingPersisted: false,
    },
    blockers: [
      'metric_lips_geometry_not_issued',
      'reviewed_2d_projection_rule_not_admitted',
      'pose_normalized_lips_geometry_not_issued',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ],
    prohibitedShortcuts: [
      'full_face_metric_geometry_to_lips_semantic_role',
      'metric_xyz_to_pose_normalized_2d_without_reviewed_projection',
      'metric_geometry_to_morphology',
      'metric_geometry_to_mouth_criterion_state',
      'provider_component_order_to_outer_inner_lip_role',
      'provider_parity_tolerance_to_product_calibration_threshold',
    ],
  };
}

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
        boundary: Array.from({ length: 20 }, (_, pointIndex) => ({ x: pointIndex / 10, y: contourIndex })),
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
      providerRunRef: 'fr82:forged',
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

describe('FR82 neutral mouth relative size metric', () => {
  it('defines one neutral same-run horizontal-span ratio without assigning anatomical face width or traditional 大 meaning', () => {
    expect(getNeutralMouthRelativeSizeMetricDefinitionFR82()).toEqual({
      schemaVersion: 'fr82-neutral-mouth-relative-size-metric-definition-v1',
      artifactVersion: '0.1.0',
      authorityState: 'reviewed_neutral_relative_size_metric_definition_only',
      metricKey: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio',
      metricVersion: '0.1.0',
      metricRef: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
      region: 'mouth',
      numeratorSource: 'fr79_two_unordered_pose_normalized_lips_contours_horizontal_span',
      denominatorSource: 'fr77_all_468_canonical_aligned_metric_landmarks_horizontal_span',
      numeratorCoordinateFrame: 'pose_normalized_face_2d',
      denominatorCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      comparisonAxis: 'shared_canonical_metric_x',
      axisCompatibilityRule: 'fr79_x_equals_fr77_canonical_metric_x_without_recenter_or_rescale',
      unit: 'ratio',
      formula: '(max_lips_x-min_lips_x)/(max_mesh_x-min_mesh_x)',
      sameProviderRunRequired: true,
      sameCanonicalAssetDigestRequired: true,
      fullMeshLandmarkCount: 468,
      faceOvalTopologyRequired: false,
      faceWidthAnatomicalRoleAssigned: false,
      outerInnerAnatomicalRoleRequired: false,
      absoluteSpanValuesIssued: false,
      physicalAnthropometricInterpretationAllowed: false,
      traditionalCriterionBindingRef: null,
      calibrationRef: null,
      interpretationBoundary: 'continuous_relative_mesh_span_metric_only_no_traditional_big_or_face_width_anatomy',
    });
  });

  it('rejects structurally plausible but unissued upstream geometry', () => {
    expect(() => computeNeutralMouthRelativeSizeMetricFR82(forgedFR77(), forgedFR79()))
      .toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects structurally plausible but unissued FR82 output', () => {
    const forged = {
      schemaVersion: 'fr82-neutral-mouth-relative-size-metric-v1',
      authorityState: 'governed_neutral_mouth_relative_size_metric_only',
    } as unknown as NeutralMouthRelativeSizeMetricFR82V1;
    expect(() => assertIssuedNeutralMouthRelativeSizeMetricFR82(forged))
      .toThrow(/not issued by the active FR-82 metric boundary/u);
  });
});