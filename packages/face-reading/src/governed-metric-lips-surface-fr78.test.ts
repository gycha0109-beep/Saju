import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedGovernedMetricLipsSurfaceFR78,
  assessGovernedMetricLipsSurfaceReadinessFR78,
  projectIssuedGovernedMetricGeometryToLipsSurfaceFR78,
  type GovernedMetricLipsSurfaceFR78V1,
} from './governed-metric-lips-surface-fr78.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;

function forgedFR77(): GovernedMetricGeometryCandidateFR77V1 {
  return {
    schemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
    artifactVersion: '0.1.0',
    authorityState: 'governed_metric_geometry_candidate_only',
    provider: {
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      providerRunRef: 'fr78:forged-source',
      canonicalAssetDigest: DIGEST,
      providerLandmarkCount: 478,
      geometryLandmarkCount: 468,
      irisLandmarksExcluded: true,
      providerDepthConsumedForMetricGeometry: true,
      fr61ContractModified: false,
    },
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    frame: { width: 820, height: 1024 },
    metricLandmarks: Array.from({ length: 468 }, (_, index) => ({
      x: index / 100,
      y: index / 200,
      z: index / 300,
    })),
    poseTransformMatrixPackedColumnMajor: Array.from(
      { length: 16 },
      (_, index) => index % 5 === 0 ? 1 : 0,
    ),
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

describe('FR78 governed metric lips surface', () => {
  it('admits only the release-exact two-cycle lips topology for 468-landmark metric projection', () => {
    const readiness = assessGovernedMetricLipsSurfaceReadinessFR78();
    expect(readiness).toMatchObject({
      schemaVersion: 'fr78-governed-metric-lips-surface-readiness-v1',
      artifactVersion: '0.1.0',
      authorityState: 'release_exact_metric_lips_projection_ready',
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      geometryLandmarkCount: 468,
      contourCount: 2,
      contourPointCounts: [20, 20],
      metricLipsGeometryProjectionAuthorized: true,
      providerVertexIndexOutputAllowed: false,
      outerInnerAnatomicalAssignmentAllowed: false,
      providerComponentOrderSemanticUseAllowed: false,
      poseNormalized2DProjectionAuthorized: false,
      neutralMetricIssuanceAllowed: false,
      traditionalOperationalizationAllowed: false,
    });
    expect(readiness.sourceWitness).toEqual({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
      sourceSymbol: 'FACE_LANDMARKS_LIPS',
      edgeCount: 40,
      connectedComponentCount: 2,
      closedCycleComponentCount: 2,
      componentRoleLabelsPublished: false,
    });
  });

  it('does not expose provider vertex indices through the readiness contract', () => {
    const serialized = JSON.stringify(assessGovernedMetricLipsSurfaceReadinessFR78());
    expect(serialized).not.toContain('providerVertexIndices');
    expect(serialized).not.toContain('providerGraphComponentOrdinal');
  });

  it('rejects structurally plausible but unissued FR77 metric geometry', () => {
    expect(() => projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(forgedFR77()))
      .toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects forged FR78 surfaces outside the active issuer', () => {
    const forged = {
      schemaVersion: 'fr78-governed-metric-lips-surface-v1',
      authorityState: 'governed_metric_lips_surface_candidate_only',
    } as unknown as GovernedMetricLipsSurfaceFR78V1;
    expect(() => assertIssuedGovernedMetricLipsSurfaceFR78(forged))
      .toThrow(/not issued by the active FR-78 projection boundary/u);
  });
});
