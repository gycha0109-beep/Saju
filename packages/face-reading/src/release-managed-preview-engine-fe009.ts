import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  createManagedConsumerPreviewFaceEngineFE007,
  type FE007ManagedConsumerPreviewEngine,
} from './managed-consumer-preview-engine-fe007.js';
import type { FE006PreviewImageRequest } from './bound-consumer-preview-engine-fe006.js';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import {
  MEDIAPIPE_V0_10_35_GEOMETRY_METADATA_BLOB_SHA_FE009,
  MEDIAPIPE_V0_10_35_GEOMETRY_METADATA_PBTXT_FE009,
} from './mediapipe-v0-10-35-geometry-metadata-fe009.generated.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE009_CONTRACT_VERSION =
  'FE009-RELEASE-ASSET-MANAGED-PREVIEW-ENGINE-v1' as const;

export interface FE009ReleaseManagedPreviewEngineConfig {
  readonly schemaVersion: 'fe009-release-managed-preview-engine-config-v1';
  readonly runtimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
}

export interface FE009ReleaseManagedPreviewEngine {
  readonly schemaVersion: 'fe009-release-managed-preview-engine-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE009_CONTRACT_VERSION;
  readonly engineState: 'preview_release_asset_bound_only';
  readonly releaseReceipt: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly releaseTag: 'v0.10.35';
    readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly geometryMetadataPath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt';
    readonly geometryMetadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f';
    readonly paritySchemaVersion: 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1';
    readonly metadataExactVerification: 'delegated_to_fe007_fr77_before_engine_publish';
  };
  readonly dataBoundary: {
    readonly parityObjectExposed: false;
    readonly geometryMetadataExposed: false;
    readonly runtimeInstanceExposed: false;
    readonly runtimeFactoryExposed: false;
    readonly rawImageRetainedByEngine: false;
    readonly providerResultRetainedByEngine: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly classificationIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly claimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly analyze: (
    request: FE006PreviewImageRequest,
  ) => Promise<FE004ConsumerPreviewEngineResult>;
  readonly close: () => Promise<void>;
}

const ISSUED_FR76_PARITY_FE009: MediaPipeScreenToMetricReimplementationParityFR76V1 =
  Object.freeze({
    schemaVersion: 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_reimplementation_parity_validated' as const,
    upstream: Object.freeze({
      fr75SchemaVersion: 'fr75-mediapipe-release-exact-metric-geometry-admission-v1' as const,
      fr75ArtifactVersion: '0.1.0' as const,
      fr75AuthorityState: 'release_exact_screen_to_metric_source_admitted' as const,
    }),
    releaseWitness: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      files: Object.freeze([
        Object.freeze({
          path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph_test.cc',
          blobSha: '7fa79c5a6524e7907c4c69c4077b4e4d9d98ca96',
          evidenceRole: 'exact_upstream_face_geometry_test' as const,
        }),
        Object.freeze({
          path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
          blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
          evidenceRole: 'exact_upstream_full_xyz_input_fixture' as const,
        }),
        Object.freeze({
          path: 'mediapipe/tasks/testdata/vision/face_geometry_expected_out.pbtxt',
          blobSha: 'df6eaaec358d1c0cda034db7b727bc7ce04f8a5b',
          evidenceRole: 'exact_upstream_face_geometry_golden' as const,
        }),
        Object.freeze({
          path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
          blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
          evidenceRole: 'exact_upstream_geometry_metadata' as const,
        }),
      ]),
    }),
    parityProtocol: Object.freeze({
      implementationPath: 'packages/face-reading/src/mediapipe-screen-to-metric-reimplementation-parity-fr76.ts' as const,
      verifierPath: 'scripts/verify-fr76-mediapipe-parity.mjs' as const,
      frameWidth: 820 as const,
      frameHeight: 1024 as const,
      geometryLandmarkCount: 468 as const,
      expectedPoseMatrixElements: 16 as const,
      providerTolerance: 0.0001 as const,
      exactGitBlobVerificationRequired: true as const,
      fullMetricLandmarkXYZCompared: true as const,
      fullPoseMatrixCompared: true as const,
      inputSource: 'FACE_LANDMARK_PIPELINE' as const,
      originPointLocation: 'TOP_LEFT_CORNER' as const,
      verticalFovDegrees: 63 as const,
      nearPlaneCentimeters: 1 as const,
      farPlaneCentimeters: 10000 as const,
    }),
    runtimeAuthority: Object.freeze({
      reimplementationParityValidated: true as const,
      screenToMetricReimplementationAuthorized: true as const,
      runtimeMetricGeometryOutputAuthorized: false as const,
      metricLipsGeometryIssued: false as const,
      poseNormalizedLipsGeometryIssued: false as const,
      neutralMetricDefinitionsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
      parityValidationAloneAuthorizesProductionOutput: false as const,
    }),
    persistencePolicy: Object.freeze({
      rawProviderResponsePersisted: false as const,
      rawMetricMeshPersisted: false as const,
      rawLandmarkDepthPersisted: false as const,
      parityFixtureBytesPersistedInProductRuntime: false as const,
    }),
    remainingBlockers: Object.freeze([
      'public_web_metric_face_mesh_not_exposed',
      'runtime_metric_geometry_output_not_admitted',
      'fr61_provider_z_not_consumed_as_metric_geometry',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ] as const),
    prohibitedShortcuts: Object.freeze([
      'golden_parity_to_production_metric_output',
      'screen_to_metric_parity_to_pose_normalized_lips_authority',
      'metric_geometry_to_morphology',
      'metric_geometry_to_traditional_mouth_criteria',
      'first_468_geometry_to_iris_inclusive_478_geometry',
      'provider_tolerance_to_product_calibration_threshold',
    ] as const),
  });

const RELEASE_RECEIPT = Object.freeze({
  repository: 'google-ai-edge/mediapipe' as const,
  releaseTag: 'v0.10.35' as const,
  releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
  runtimePackageName: '@mediapipe/tasks-vision' as const,
  runtimePackageVersion: '0.10.35' as const,
  geometryMetadataPath:
    'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' as const,
  geometryMetadataBlobSha: MEDIAPIPE_V0_10_35_GEOMETRY_METADATA_BLOB_SHA_FE009,
  paritySchemaVersion:
    'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1' as const,
  metadataExactVerification:
    'delegated_to_fe007_fr77_before_engine_publish' as const,
});

const DATA_BOUNDARY = Object.freeze({
  parityObjectExposed: false as const,
  geometryMetadataExposed: false as const,
  runtimeInstanceExposed: false as const,
  runtimeFactoryExposed: false as const,
  rawImageRetainedByEngine: false as const,
  providerResultRetainedByEngine: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  traditionalInterpretationIssued: false as const,
  claimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-009 ${message}`);
}

export async function createReleaseManagedConsumerPreviewFaceEngineFE009(
  config: FE009ReleaseManagedPreviewEngineConfig = {
    schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
  },
): Promise<FE009ReleaseManagedPreviewEngine> {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.');
  }
  const allowed = new Set(['schemaVersion', 'runtimeFactory']);
  const unexpected = Object.keys(config).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`config contains unauthorized field: ${unexpected}.`);
  }
  if (config.schemaVersion !== 'fe009-release-managed-preview-engine-config-v1') {
    fail('config schemaVersion is unsupported.');
  }

  validateMediaPipeScreenToMetricReimplementationParityFR76(
    ISSUED_FR76_PARITY_FE009,
  );

  const managed: FE007ManagedConsumerPreviewEngine =
    await createManagedConsumerPreviewFaceEngineFE007({
      schemaVersion: 'fe007-managed-preview-engine-config-v1',
      parity: ISSUED_FR76_PARITY_FE009,
      geometryMetadataPbtxt:
        MEDIAPIPE_V0_10_35_GEOMETRY_METADATA_PBTXT_FE009,
      ...(config.runtimeFactory === undefined
        ? {}
        : { runtimeFactory: config.runtimeFactory }),
    });

  const engine: FE009ReleaseManagedPreviewEngine = Object.freeze({
    schemaVersion: 'fe009-release-managed-preview-engine-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE009_CONTRACT_VERSION,
    engineState: 'preview_release_asset_bound_only' as const,
    releaseReceipt: RELEASE_RECEIPT,
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
    analyze(request: FE006PreviewImageRequest) {
      return managed.analyze(request);
    },
    close() {
      return managed.close();
    },
  });

  assertReleaseManagedConsumerPreviewFaceEngineFE009(engine);
  return engine;
}

export function assertReleaseManagedConsumerPreviewFaceEngineFE009(
  engine: FE009ReleaseManagedPreviewEngine,
): void {
  if (
    engine.schemaVersion !== 'fe009-release-managed-preview-engine-v1' ||
    engine.artifactVersion !== '0.1.0' ||
    engine.contractVersion !== FE009_CONTRACT_VERSION ||
    engine.engineState !== 'preview_release_asset_bound_only' ||
    engine.releaseReceipt.repository !== 'google-ai-edge/mediapipe' ||
    engine.releaseReceipt.releaseTag !== 'v0.10.35' ||
    engine.releaseReceipt.releaseCommit !==
      'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    engine.releaseReceipt.runtimePackageName !== '@mediapipe/tasks-vision' ||
    engine.releaseReceipt.runtimePackageVersion !== '0.10.35' ||
    engine.releaseReceipt.geometryMetadataBlobSha !==
      '252a7b05b24c5c43c5b94179393639f7c9a2fe8f' ||
    engine.releaseReceipt.paritySchemaVersion !==
      'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1' ||
    engine.releaseReceipt.metadataExactVerification !==
      'delegated_to_fe007_fr77_before_engine_publish' ||
    typeof engine.analyze !== 'function' ||
    typeof engine.close !== 'function'
  ) {
    fail('release-managed engine identity or receipt drift.');
  }

  if (Object.values(engine.dataBoundary).some((value) => value !== false)) {
    fail('release-managed engine data boundary widened.');
  }

  if (
    engine.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(engine.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('release-managed engine authority widened.');
  }
}
