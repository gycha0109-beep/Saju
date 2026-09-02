import { describe, expect, it } from 'vitest';
import type { GovernedMetricLipsSurfaceFR78V1 } from './governed-metric-lips-surface-fr78.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  getPoseNormalizedLipsProjectionRuleFR79,
  projectMetricLipsSurfaceToPoseNormalized2DFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';

const DIGEST = `sha256:${'9'.repeat(64)}`;

function forgedFR78(): GovernedMetricLipsSurfaceFR78V1 {
  return {
    schemaVersion: 'fr78-governed-metric-lips-surface-v1',
    artifactVersion: '0.1.0',
    authorityState: 'governed_metric_lips_surface_candidate_only',
    extensionMode: 'separate_contract_extension',
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1',
    baseFR15ContractMutated: false,
    surfaceKey: 'neutral.face.lips_contour_set',
    neutralConceptKey: 'lips_contour_set',
    observationClass: 'source_neutral_metric_geometry_extension',
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    contours: [0, 1].map((contourIndex) => ({
      contourRef: `fr78:forged:${contourIndex}`,
      geometry: {
        kind: 'metric_region_3d' as const,
        boundary: Array.from({ length: 20 }, (_, pointIndex) => ({
          x: contourIndex + pointIndex / 10,
          y: contourIndex - pointIndex / 10,
          z: pointIndex / 100,
        })),
      },
      sourceProviderTopologySymbol: 'FACE_LANDMARKS_LIPS' as const,
      sourceComponentAuthority: 'unordered_provider_graph_component_only' as const,
      anatomicalRole: null,
      traditionalRole: null,
    })),
    contourCount: 2,
    contourPointCounts: [20, 20],
    contourConsumptionState: 'unordered_set_no_outer_inner_role',
    metricLipsGeometryIssued: true,
    canonicalAlignedMetric3DSurfaceIssued: true,
    fr15ConsumerSlotIssued: false,
    poseNormalizedLipsGeometryIssued: false,
    reviewed2DProjectionRuleIssued: false,
    neutralMetricDefinitionsIssued: 0,
    neutralMetricValuesIssued: 0,
    morphologyProduced: false,
    criterionStatesIssued: 0,
    claimsIssued: 0,
    traditionalSemanticAuthority: false,
    source: {
      fr77SchemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
      fr77ArtifactVersion: '0.1.0',
      providerRepository: 'google-ai-edge/mediapipe',
      providerReleaseTag: 'v0.10.35',
      providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      providerTopologySourceBlobSha: '644de9d8c7cd90880d92b2393b4913fa93ace927',
      providerTopologySymbol: 'FACE_LANDMARKS_LIPS',
      providerRuntimePackageVersion: '0.10.35',
      geometryMetadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
    },
    authorityBoundary: {
      governedResearchMetricLipsGeometryOutputAuthorized: true,
      productionNeutralObservationIssued: false,
      mutateFR15BaseContractAllowed: false,
      fr15ConsumerSlotIssuanceAllowed: false,
      outerInnerAnatomicalAssignmentAllowed: false,
      providerComponentOrderSemanticUseAllowed: false,
      providerVertexIndexOutputAllowed: false,
      poseNormalized2DIssuanceAllowed: false,
      neutralMetricIssuanceAllowed: false,
      traditionalOperationalizationAllowed: false,
      morphologyClassificationAllowed: false,
      criterionStateIssuanceAllowed: false,
      claimIssuanceAllowed: false,
    },
    blockers: [
      'reviewed_2d_projection_rule_not_admitted',
      'pose_normalized_lips_geometry_not_issued',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ],
    prohibitedShortcuts: [
      'metric_lips_3d_to_pose_normalized_2d_without_reviewed_projection',
      'unordered_metric_lips_contours_to_outer_inner_anatomy',
      'metric_lips_surface_to_mouth_width_height_aspect_or_thickness',
      'metric_lips_surface_to_square_broad_classification',
      'metric_lips_surface_to_lips_substantial_classification',
      'provider_component_order_to_semantic_role',
      'provider_vertex_index_to_neutral_surface_output',
      'fr76_parity_tolerance_to_product_calibration_threshold',
    ],
    provenance: {
      providerRunRef: 'fr79:forged',
      canonicalAssetDigest: DIGEST,
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      rawProviderDepthPersisted: false,
      rawGeometryMetadataPersisted: false,
      derivedFullFaceMetricGeometryPersisted: false,
      derivedMetricLipsSurfacePersisted: false,
      biometricEmbeddingPersisted: false,
    },
  };
}

describe('FR79 pose-normalized lips geometry', () => {
  it('pins a narrow orthographic XY projection after canonical inverse-pose alignment', () => {
    expect(getPoseNormalizedLipsProjectionRuleFR79()).toEqual({
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
    });
  });

  it('rejects structurally plausible but unissued FR78 metric lips surfaces', () => {
    expect(() => projectMetricLipsSurfaceToPoseNormalized2DFR79(forgedFR78()))
      .toThrow(/not issued by the active FR-78 projection boundary/u);
  });

  it('rejects forged FR79 output outside the active issuer', () => {
    const forged = {
      schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      authorityState: 'governed_pose_normalized_lips_geometry_candidate_only',
    } as unknown as PoseNormalizedLipsGeometryFR79V1;
    expect(() => assertIssuedPoseNormalizedLipsGeometryFR79(forged))
      .toThrow(/not issued by the active FR-79 projection boundary/u);
  });
});
