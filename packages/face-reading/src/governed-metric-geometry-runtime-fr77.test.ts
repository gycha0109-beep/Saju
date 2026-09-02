import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  issueMediaPipeGeometryProfileFR77,
  runGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';

const DIGEST = `sha256:${'7'.repeat(64)}`;

function providerResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: 0.25 + (index % 17) / 100,
      y: 0.25 + (index % 19) / 100,
      z: (index % 23) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factory(result: MediaPipeFaceLandmarkerResultFR25V1 = providerResult()): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return result;
        },
        close() {},
      };
    },
  };
}

async function parity() {
  const request = {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr77:parity-source',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request, factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
}

describe('FR77 governed metric geometry runtime', () => {
  it('rejects empty and non-release-exact geometry metadata before profile issuance', async () => {
    await expect(issueMediaPipeGeometryProfileFR77('')).rejects.toThrow(/non-empty pbtxt/u);
    await expect(issueMediaPipeGeometryProfileFR77('input_source: FACE_LANDMARK_PIPELINE\n')).rejects.toThrow(/Git blob SHA mismatch/u);
  });

  it('rejects malformed request fields before runtime or metadata execution', async () => {
    const fr76 = await parity();
    await expect(runGovernedMetricGeometryFR77({
      schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
      providerRunRef: 'bad ref with spaces',
      canonicalAssetDigest: DIGEST,
      image: {},
      frameWidth: 820,
      frameHeight: 1024,
      geometryMetadataPbtxt: 'forged',
    }, fr76, factory())).rejects.toThrow(/providerRunRef/u);

    await expect(runGovernedMetricGeometryFR77({
      schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
      providerRunRef: 'fr77:bad-frame',
      canonicalAssetDigest: DIGEST,
      image: {},
      frameWidth: 0,
      frameHeight: 1024,
      geometryMetadataPbtxt: 'forged',
    }, fr76, factory())).rejects.toThrow(/frameWidth/u);
  });

  it('does not accept forged metric geometry candidates outside the active issuer', () => {
    const forged = {
      schemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
      artifactVersion: '0.1.0',
      authorityState: 'governed_metric_geometry_candidate_only',
      provider: {
        runtimePackageName: '@mediapipe/tasks-vision',
        runtimePackageVersion: '0.10.35',
        providerRunRef: 'forged',
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
      metricLandmarks: Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 })),
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
    } as unknown as GovernedMetricGeometryCandidateFR77V1;

    expect(() => assertIssuedGovernedMetricGeometryFR77(forged)).toThrow(/not issued/u);
  });

  it('keeps FR61 untouched and does not authorize lips, projection, metrics, morphology, criteria, claims, or traditional semantics by declaration', async () => {
    const fr76 = await parity();
    expect(fr76.runtimeAuthority.runtimeMetricGeometryOutputAuthorized).toBe(false);
    expect(fr76.runtimeAuthority.metricLipsGeometryIssued).toBe(false);
    expect(fr76.runtimeAuthority.poseNormalizedLipsGeometryIssued).toBe(false);
  });
});
