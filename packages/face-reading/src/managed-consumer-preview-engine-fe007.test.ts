import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  assertManagedConsumerPreviewFaceEngineFE007,
  createManagedConsumerPreviewFaceEngineFE007,
  type FE007ManagedConsumerPreviewEngine,
} from './managed-consumer-preview-engine-fe007.js';

vi.mock('./governed-metric-geometry-runtime-fr77.js', async (importOriginal) => {
  const actual = await importOriginal<
    typeof import('./governed-metric-geometry-runtime-fr77.js')
  >();
  return {
    ...actual,
    issueMediaPipeGeometryProfileFR77: vi.fn(async () => ({
      schemaVersion: 'fr77-mediapipe-geometry-profile-v1',
      authorityState: 'release_exact_geometry_profile_verified',
    })),
  };
});

function parity(): MediaPipeScreenToMetricReimplementationParityFR76V1 {
  return {
    schemaVersion: 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1',
    artifactVersion: '0.1.0',
    authorityState: 'release_exact_reimplementation_parity_validated',
    upstream: {
      fr75SchemaVersion: 'fr75-mediapipe-release-exact-metric-geometry-admission-v1',
      fr75ArtifactVersion: '0.1.0',
      fr75AuthorityState: 'release_exact_screen_to_metric_source_admitted',
    },
    releaseWitness: {
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      files: [
        {
          path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph_test.cc',
          blobSha: '7fa79c5a6524e7907c4c69c4077b4e4d9d98ca96',
          evidenceRole: 'exact_upstream_face_geometry_test',
        },
        {
          path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
          blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
          evidenceRole: 'exact_upstream_full_xyz_input_fixture',
        },
        {
          path: 'mediapipe/tasks/testdata/vision/face_geometry_expected_out.pbtxt',
          blobSha: 'df6eaaec358d1c0cda034db7b727bc7ce04f8a5b',
          evidenceRole: 'exact_upstream_face_geometry_golden',
        },
        {
          path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
          blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
          evidenceRole: 'exact_upstream_geometry_metadata',
        },
      ],
    },
    parityProtocol: {
      implementationPath: 'packages/face-reading/src/mediapipe-screen-to-metric-reimplementation-parity-fr76.ts',
      verifierPath: 'scripts/verify-fr76-mediapipe-parity.mjs',
      frameWidth: 820,
      frameHeight: 1024,
      geometryLandmarkCount: 468,
      expectedPoseMatrixElements: 16,
      providerTolerance: 0.0001,
      exactGitBlobVerificationRequired: true,
      fullMetricLandmarkXYZCompared: true,
      fullPoseMatrixCompared: true,
      inputSource: 'FACE_LANDMARK_PIPELINE',
      originPointLocation: 'TOP_LEFT_CORNER',
      verticalFovDegrees: 63,
      nearPlaneCentimeters: 1,
      farPlaneCentimeters: 10000,
    },
    runtimeAuthority: {
      reimplementationParityValidated: true,
      screenToMetricReimplementationAuthorized: true,
      runtimeMetricGeometryOutputAuthorized: false,
      metricLipsGeometryIssued: false,
      poseNormalizedLipsGeometryIssued: false,
      neutralMetricDefinitionsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
      parityValidationAloneAuthorizesProductionOutput: false,
    },
    persistencePolicy: {
      rawProviderResponsePersisted: false,
      rawMetricMeshPersisted: false,
      rawLandmarkDepthPersisted: false,
      parityFixtureBytesPersistedInProductRuntime: false,
    },
    remainingBlockers: [
      'public_web_metric_face_mesh_not_exposed',
      'runtime_metric_geometry_output_not_admitted',
      'fr61_provider_z_not_consumed_as_metric_geometry',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ],
    prohibitedShortcuts: [
      'golden_parity_to_production_metric_output',
      'screen_to_metric_parity_to_pose_normalized_lips_authority',
      'metric_geometry_to_morphology',
      'metric_geometry_to_traditional_mouth_criteria',
      'first_468_geometry_to_iris_inclusive_478_geometry',
      'provider_tolerance_to_product_calibration_threshold',
    ],
  };
}

function countingFactory(counter: { create: number; close: number }): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      counter.create += 1;
      return {
        detect() {
          return {
            faceLandmarks: [],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          };
        },
        close() {
          counter.close += 1;
        },
      };
    },
  };
}

describe('FE007 managed consumer preview engine session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates one runtime and closes it exactly once for the session', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createManagedConsumerPreviewFaceEngineFE007({
      schemaVersion: 'fe007-managed-preview-engine-config-v1',
      parity: parity(),
      geometryMetadataPbtxt: 'mocked exact metadata preflight',
      runtimeFactory: countingFactory(counter),
    });

    expect(counter.create).toBe(1);
    expect(engine.lifecycleReceipt).toEqual({
      runtimeInstancesCreated: 1,
      metadataPreflightVerified: true,
      analysesSerialized: true,
      perAnalysisRuntimeCloseSuppressed: true,
      explicitSessionCloseRequired: true,
    });
    expect(() => assertManagedConsumerPreviewFaceEngineFE007(engine)).not.toThrow();

    await engine.close();
    await engine.close();
    expect(counter.close).toBe(1);
  });

  it('does not expose the runtime, parity, metadata, or factory', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createManagedConsumerPreviewFaceEngineFE007({
      schemaVersion: 'fe007-managed-preview-engine-config-v1',
      parity: parity(),
      geometryMetadataPbtxt: 'mocked exact metadata preflight',
      runtimeFactory: countingFactory(counter),
    });

    expect(engine).not.toHaveProperty('runtime');
    expect(engine).not.toHaveProperty('parity');
    expect(engine).not.toHaveProperty('geometryMetadataPbtxt');
    expect(engine).not.toHaveProperty('runtimeFactory');

    await engine.close();
  });

  it('rejects new analysis after close begins', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createManagedConsumerPreviewFaceEngineFE007({
      schemaVersion: 'fe007-managed-preview-engine-config-v1',
      parity: parity(),
      geometryMetadataPbtxt: 'mocked exact metadata preflight',
      runtimeFactory: countingFactory(counter),
    });

    await engine.close();

    await expect(engine.analyze({
      schemaVersion: 'fe006-preview-image-request-v1',
      providerRunRef: 'fe007:closed',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      image: {},
      frameWidth: 100,
      frameHeight: 100,
    })).rejects.toThrow(/session close has begun/u);
  });

  it('rejects invalid source runtime factories before publishing an engine', async () => {
    await expect(createManagedConsumerPreviewFaceEngineFE007({
      schemaVersion: 'fe007-managed-preview-engine-config-v1',
      parity: parity(),
      geometryMetadataPbtxt: 'mocked exact metadata preflight',
      runtimeFactory: {} as MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
    })).rejects.toThrow(/runtimeFactory must expose create/u);
  });

  it('rejects managed-engine authority widening', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createManagedConsumerPreviewFaceEngineFE007({
      schemaVersion: 'fe007-managed-preview-engine-config-v1',
      parity: parity(),
      geometryMetadataPbtxt: 'mocked exact metadata preflight',
      runtimeFactory: countingFactory(counter),
    });
    const forged = {
      ...engine,
      authorityBoundary: {
        ...engine.authorityBoundary,
        claimIssued: true,
      },
    } as unknown as FE007ManagedConsumerPreviewEngine;

    expect(() => assertManagedConsumerPreviewFaceEngineFE007(forged))
      .toThrow(/authority widened/u);

    await engine.close();
  });
});
