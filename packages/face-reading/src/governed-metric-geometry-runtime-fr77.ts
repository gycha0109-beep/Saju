import type {
  MediaPipeFaceLandmarkerResultFR25V1,
  MediaPipeNormalizedLandmarkFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  reimplementMediaPipeScreenToMetricFR76,
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeMetricGeometryPointFR76V1,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { FaceAuthorityValidationError } from './validation.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b' as const;
const METADATA_PATH = 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' as const;
const METADATA_BLOB_SHA = '252a7b05b24c5c43c5b94179393639f7c9a2fe8f' as const;
const PROVIDER_LANDMARK_COUNT = 478;
const GEOMETRY_LANDMARK_COUNT = 468;
const CANONICAL_VERTEX_STRIDE = 5;
const PROCRUSTES_BASIS_COUNT = 33;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_RUN_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;

export interface MediaPipeMetricGeometryRuntimeRequestFR77V1 {
  readonly schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly image: unknown;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly geometryMetadataPbtxt: string;
}

export interface MediaPipeGeometryProfileFR77V1 {
  readonly schemaVersion: 'fr77-mediapipe-geometry-profile-v1';
  readonly authorityState: 'release_exact_geometry_profile_verified';
  readonly releaseCommit: typeof RELEASE_COMMIT;
  readonly metadataPath: typeof METADATA_PATH;
  readonly metadataBlobSha: typeof METADATA_BLOB_SHA;
  readonly inputSource: 'FACE_LANDMARK_PIPELINE';
  readonly geometryLandmarkCount: 468;
  readonly procrustesBasisCount: 33;
  readonly canonicalMetricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly landmarkWeights: readonly number[];
}

export interface GovernedMetricGeometryCandidateFR77V1 {
  readonly schemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_metric_geometry_candidate_only';
  readonly provider: {
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly providerLandmarkCount: 478;
    readonly geometryLandmarkCount: 468;
    readonly irisLandmarksExcluded: true;
    readonly providerDepthConsumedForMetricGeometry: true;
    readonly fr61ContractModified: false;
  };
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
  readonly geometryProfile: {
    readonly releaseCommit: typeof RELEASE_COMMIT;
    readonly metadataPath: typeof METADATA_PATH;
    readonly metadataBlobSha: typeof METADATA_BLOB_SHA;
    readonly exactGitBlobVerified: true;
    readonly procrustesBasisCount: 33;
  };
  readonly authorityBoundary: {
    readonly governedResearchMetricGeometryOutputAuthorized: true;
    readonly productionNeutralObservationIssued: false;
    readonly metricLipsGeometryIssued: false;
    readonly poseNormalizedLipsGeometryIssued: false;
    readonly reviewed2DProjectionRuleIssued: false;
    readonly neutralMetricDefinitionsIssued: 0;
    readonly neutralMetricValuesIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly persistencePolicy: {
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly rawGeometryMetadataPersisted: false;
    readonly derivedMetricGeometryPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
  readonly blockers: readonly [
    'metric_lips_geometry_not_issued',
    'reviewed_2d_projection_rule_not_admitted',
    'pose_normalized_lips_geometry_not_issued',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'full_face_metric_geometry_to_lips_semantic_role',
    'metric_xyz_to_pose_normalized_2d_without_reviewed_projection',
    'metric_geometry_to_morphology',
    'metric_geometry_to_mouth_criterion_state',
    'provider_component_order_to_outer_inner_lip_role',
    'provider_parity_tolerance_to_product_calibration_threshold',
  ];
}

const PROFILE_ISSUED = new WeakSet<object>();
const CANDIDATE_ISSUED = new WeakSet<object>();

const BLOCKERS = Object.freeze([
  'metric_lips_geometry_not_issued',
  'reviewed_2d_projection_rule_not_admitted',
  'pose_normalized_lips_geometry_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'full_face_metric_geometry_to_lips_semantic_role',
  'metric_xyz_to_pose_normalized_2d_without_reviewed_projection',
  'metric_geometry_to_morphology',
  'metric_geometry_to_mouth_criterion_state',
  'provider_component_order_to_outer_inner_lip_role',
  'provider_parity_tolerance_to_product_calibration_threshold',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-77 ${message}`);
}

function hex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (value) => value.toString(16).padStart(2, '0')).join('');
}

async function gitBlobSha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const body = encoder.encode(text);
  const prefix = encoder.encode(`blob ${body.byteLength}\0`);
  const payload = new Uint8Array(prefix.byteLength + body.byteLength);
  payload.set(prefix, 0);
  payload.set(body, prefix.byteLength);
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) fail('Web Crypto SubtleCrypto is required to verify the release-exact geometry metadata blob.');
  return hex(await subtle.digest('SHA-1', payload));
}

function numericMatches(text: string, expression: RegExp): number[] {
  return [...text.matchAll(expression)].map((match) => Number(match[1]));
}

export async function issueMediaPipeGeometryProfileFR77(
  metadataPbtxt: string,
): Promise<MediaPipeGeometryProfileFR77V1> {
  if (typeof metadataPbtxt !== 'string' || metadataPbtxt.length === 0) {
    fail('geometry metadata must be a non-empty pbtxt string.');
  }
  const actualBlobSha = await gitBlobSha1(metadataPbtxt);
  if (actualBlobSha !== METADATA_BLOB_SHA) {
    fail(`geometry metadata Git blob SHA mismatch: expected=${METADATA_BLOB_SHA} actual=${actualBlobSha}.`);
  }
  if (!/^input_source:\s*FACE_LANDMARK_PIPELINE\s*$/mu.test(metadataPbtxt)) {
    fail('geometry metadata input_source must remain FACE_LANDMARK_PIPELINE.');
  }

  const weights = Array.from({ length: GEOMETRY_LANDMARK_COUNT }, () => 0);
  let basisCount = 0;
  const basisPattern = /procrustes_landmark_basis\s*\{\s*landmark_id:\s*(\d+)\s*weight:\s*([-+0-9.eE]+)\s*\}/g;
  for (const match of metadataPbtxt.matchAll(basisPattern)) {
    const landmarkId = Number(match[1]);
    const weight = Number(match[2]);
    if (
      !Number.isInteger(landmarkId) ||
      landmarkId < 0 ||
      landmarkId >= GEOMETRY_LANDMARK_COUNT ||
      !Number.isFinite(weight) ||
      weight < 0
    ) fail('geometry metadata contains an invalid Procrustes basis entry.');
    weights[landmarkId] = weight;
    basisCount += 1;
  }
  if (basisCount !== PROCRUSTES_BASIS_COUNT) {
    fail(`expected ${PROCRUSTES_BASIS_COUNT} Procrustes basis entries; got ${basisCount}.`);
  }

  const vertexValues = numericMatches(metadataPbtxt, /vertex_buffer:\s*([-+0-9.eE]+)/g);
  const expectedVertexValues = GEOMETRY_LANDMARK_COUNT * CANONICAL_VERTEX_STRIDE;
  if (vertexValues.length !== expectedVertexValues) {
    fail(`canonical mesh vertex buffer length drift: expected=${expectedVertexValues} actual=${vertexValues.length}.`);
  }
  const canonicalMetricLandmarks = Object.freeze(Array.from(
    { length: GEOMETRY_LANDMARK_COUNT },
    (_, index) => Object.freeze({
      x: vertexValues[index * CANONICAL_VERTEX_STRIDE]!,
      y: vertexValues[index * CANONICAL_VERTEX_STRIDE + 1]!,
      z: vertexValues[index * CANONICAL_VERTEX_STRIDE + 2]!,
    }),
  ));

  const profile: MediaPipeGeometryProfileFR77V1 = Object.freeze({
    schemaVersion: 'fr77-mediapipe-geometry-profile-v1' as const,
    authorityState: 'release_exact_geometry_profile_verified' as const,
    releaseCommit: RELEASE_COMMIT,
    metadataPath: METADATA_PATH,
    metadataBlobSha: METADATA_BLOB_SHA,
    inputSource: 'FACE_LANDMARK_PIPELINE' as const,
    geometryLandmarkCount: 468 as const,
    procrustesBasisCount: 33 as const,
    canonicalMetricLandmarks,
    landmarkWeights: Object.freeze(weights),
  });
  PROFILE_ISSUED.add(profile);
  return profile;
}

function assertIssuedProfile(profile: MediaPipeGeometryProfileFR77V1): void {
  if (!PROFILE_ISSUED.has(profile)) fail('geometry profile was not issued by the active FR-77 exact-blob verifier.');
}

function validateParity(parity: MediaPipeScreenToMetricReimplementationParityFR76V1): void {
  validateMediaPipeScreenToMetricReimplementationParityFR76(parity);
  if (
    parity.runtimeAuthority.reimplementationParityValidated !== true ||
    parity.runtimeAuthority.screenToMetricReimplementationAuthorized !== true ||
    parity.runtimeAuthority.runtimeMetricGeometryOutputAuthorized !== false ||
    parity.runtimeAuthority.metricLipsGeometryIssued !== false ||
    parity.runtimeAuthority.poseNormalizedLipsGeometryIssued !== false
  ) fail('requires the exact FR-76 parity-only authority boundary before runtime output admission.');
}

function validateRequest(request: MediaPipeMetricGeometryRuntimeRequestFR77V1): void {
  if (typeof request !== 'object' || request === null) fail('runtime request must be an object.');
  const allowed = new Set([
    'schemaVersion', 'providerRunRef', 'canonicalAssetDigest', 'image',
    'frameWidth', 'frameHeight', 'geometryMetadataPbtxt',
  ]);
  const unexpected = Object.keys(request).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`runtime request contains unauthorized field: ${unexpected}.`);
  if (request.schemaVersion !== 'fr77-governed-metric-geometry-runtime-request-v1') fail('runtime request schemaVersion is unsupported.');
  if (!SAFE_RUN_REF.test(request.providerRunRef)) fail('providerRunRef must be a bounded opaque reference without whitespace.');
  if (!SHA256.test(request.canonicalAssetDigest)) fail('canonicalAssetDigest must be sha256:<64 lowercase hex>.');
  if (request.image === null || request.image === undefined) fail('image must be present as an opaque in-memory source.');
  if (!Number.isInteger(request.frameWidth) || request.frameWidth <= 0) fail('frameWidth must be a positive integer.');
  if (!Number.isInteger(request.frameHeight) || request.frameHeight <= 0) fail('frameHeight must be a positive integer.');
}

function validateProviderLandmark(
  landmark: MediaPipeNormalizedLandmarkFR25V1,
  index: number,
): MediaPipeMetricGeometryPointFR76V1 {
  if (typeof landmark !== 'object' || landmark === null) fail(`faceLandmarks[${index}] must be an object.`);
  const allowed = new Set(['x', 'y', 'z', 'visibility']);
  const unexpected = Object.keys(landmark).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`faceLandmarks[${index}] contains unauthorized field: ${unexpected}.`);
  if (!Number.isFinite(landmark.x) || landmark.x < 0 || landmark.x > 1) fail(`faceLandmarks[${index}].x must be finite within [0,1].`);
  if (!Number.isFinite(landmark.y) || landmark.y < 0 || landmark.y > 1) fail(`faceLandmarks[${index}].y must be finite within [0,1].`);
  if (!Number.isFinite(landmark.z)) fail(`faceLandmarks[${index}].z must be finite.`);
  if (landmark.visibility !== undefined && !Number.isFinite(landmark.visibility)) fail(`faceLandmarks[${index}].visibility must be finite when present.`);
  return Object.freeze({ x: landmark.x, y: landmark.y, z: landmark.z });
}

function geometryInputFromProviderResult(
  result: MediaPipeFaceLandmarkerResultFR25V1,
): readonly MediaPipeMetricGeometryPointFR76V1[] {
  if (typeof result !== 'object' || result === null) fail('FaceLandmarker result must be an object.');
  const allowed = new Set(['faceLandmarks', 'faceBlendshapes', 'facialTransformationMatrixes']);
  const unexpected = Object.keys(result).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`FaceLandmarker result contains unauthorized field: ${unexpected}.`);
  if (
    !Array.isArray(result.faceLandmarks) ||
    !Array.isArray(result.faceBlendshapes) ||
    !Array.isArray(result.facialTransformationMatrixes)
  ) fail('FaceLandmarker result arrays are malformed.');
  if (result.faceLandmarks.length !== 1) fail(`requires exactly one detected face; received ${result.faceLandmarks.length}.`);
  if (result.faceBlendshapes.length !== 0 || result.facialTransformationMatrixes.length !== 0) {
    fail('blendshape and provider transformation-matrix outputs must remain disabled for FR-77.');
  }
  const landmarks = result.faceLandmarks[0];
  if (!Array.isArray(landmarks) || landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    fail(`requires exactly ${PROVIDER_LANDMARK_COUNT} provider landmarks before the release-exact 468 geometry slice.`);
  }
  return Object.freeze(
    landmarks.slice(0, GEOMETRY_LANDMARK_COUNT).map((landmark, index) => validateProviderLandmark(landmark, index)),
  );
}

export async function runGovernedMetricGeometryFR77(
  request: MediaPipeMetricGeometryRuntimeRequestFR77V1,
  parity: MediaPipeScreenToMetricReimplementationParityFR76V1,
  factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 = DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
): Promise<GovernedMetricGeometryCandidateFR77V1> {
  validateRequest(request);
  validateParity(parity);
  if (typeof factory !== 'object' || factory === null || typeof factory.create !== 'function') {
    fail('runtime factory must expose create().');
  }
  const profile = await issueMediaPipeGeometryProfileFR77(request.geometryMetadataPbtxt);
  assertIssuedProfile(profile);

  const runtime = await factory.create();
  if (typeof runtime !== 'object' || runtime === null || typeof runtime.detect !== 'function' || typeof runtime.close !== 'function') {
    fail('runtime factory returned an invalid runtime instance.');
  }

  try {
    const providerResult = runtime.detect(request.image);
    const screenLandmarks = geometryInputFromProviderResult(providerResult);
    const metric = reimplementMediaPipeScreenToMetricFR76({
      screenLandmarks,
      canonicalMetricLandmarks: profile.canonicalMetricLandmarks,
      landmarkWeights: profile.landmarkWeights,
      frameWidth: request.frameWidth,
      frameHeight: request.frameHeight,
    });
    if (metric.metricLandmarks.length !== GEOMETRY_LANDMARK_COUNT || metric.poseTransformMatrixPackedColumnMajor.length !== 16) {
      fail('FR-76 reimplementation returned an invalid metric geometry shape.');
    }

    const candidate: GovernedMetricGeometryCandidateFR77V1 = Object.freeze({
      schemaVersion: 'fr77-governed-metric-geometry-candidate-v1' as const,
      artifactVersion: '0.1.0' as const,
      authorityState: 'governed_metric_geometry_candidate_only' as const,
      provider: Object.freeze({
        runtimePackageName: '@mediapipe/tasks-vision' as const,
        runtimePackageVersion: '0.10.35' as const,
        providerRunRef: request.providerRunRef,
        canonicalAssetDigest: request.canonicalAssetDigest,
        providerLandmarkCount: 478 as const,
        geometryLandmarkCount: 468 as const,
        irisLandmarksExcluded: true as const,
        providerDepthConsumedForMetricGeometry: true as const,
        fr61ContractModified: false as const,
      }),
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      unit: 'centimeter' as const,
      frame: Object.freeze({ width: request.frameWidth, height: request.frameHeight }),
      metricLandmarks: metric.metricLandmarks,
      poseTransformMatrixPackedColumnMajor: metric.poseTransformMatrixPackedColumnMajor,
      geometryProfile: Object.freeze({
        releaseCommit: profile.releaseCommit,
        metadataPath: profile.metadataPath,
        metadataBlobSha: profile.metadataBlobSha,
        exactGitBlobVerified: true as const,
        procrustesBasisCount: profile.procrustesBasisCount,
      }),
      authorityBoundary: Object.freeze({
        governedResearchMetricGeometryOutputAuthorized: true as const,
        productionNeutralObservationIssued: false as const,
        metricLipsGeometryIssued: false as const,
        poseNormalizedLipsGeometryIssued: false as const,
        reviewed2DProjectionRuleIssued: false as const,
        neutralMetricDefinitionsIssued: 0 as const,
        neutralMetricValuesIssued: 0 as const,
        morphologyProduced: false as const,
        criterionStatesIssued: 0 as const,
        claimsIssued: 0 as const,
        traditionalSemanticAuthority: false as const,
      }),
      persistencePolicy: Object.freeze({
        rawSourcePersisted: false as const,
        rawProviderResponsePersisted: false as const,
        rawProviderDepthPersisted: false as const,
        rawGeometryMetadataPersisted: false as const,
        derivedMetricGeometryPersisted: false as const,
        biometricEmbeddingPersisted: false as const,
      }),
      blockers: BLOCKERS,
      prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    });
    CANDIDATE_ISSUED.add(candidate);
    return candidate;
  } finally {
    runtime.close();
  }
}

export function assertIssuedGovernedMetricGeometryFR77(
  candidate: GovernedMetricGeometryCandidateFR77V1,
): void {
  if (!CANDIDATE_ISSUED.has(candidate)) fail('metric geometry candidate was not issued by the active FR-77 runtime boundary.');
  if (
    candidate.schemaVersion !== 'fr77-governed-metric-geometry-candidate-v1' ||
    candidate.artifactVersion !== '0.1.0' ||
    candidate.authorityState !== 'governed_metric_geometry_candidate_only' ||
    candidate.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    candidate.unit !== 'centimeter' ||
    candidate.metricLandmarks.length !== GEOMETRY_LANDMARK_COUNT ||
    candidate.poseTransformMatrixPackedColumnMajor.length !== 16
  ) fail('issued metric geometry candidate identity/shape drift.');
  if (
    candidate.provider.providerLandmarkCount !== 478 ||
    candidate.provider.geometryLandmarkCount !== 468 ||
    candidate.provider.irisLandmarksExcluded !== true ||
    candidate.provider.providerDepthConsumedForMetricGeometry !== true ||
    candidate.provider.fr61ContractModified !== false ||
    candidate.geometryProfile.metadataBlobSha !== METADATA_BLOB_SHA ||
    candidate.geometryProfile.exactGitBlobVerified !== true
  ) fail('issued metric geometry provider/profile boundary drift.');
  const authority = candidate.authorityBoundary;
  if (
    authority.governedResearchMetricGeometryOutputAuthorized !== true ||
    authority.productionNeutralObservationIssued !== false ||
    authority.metricLipsGeometryIssued !== false ||
    authority.poseNormalizedLipsGeometryIssued !== false ||
    authority.reviewed2DProjectionRuleIssued !== false ||
    authority.neutralMetricDefinitionsIssued !== 0 ||
    authority.neutralMetricValuesIssued !== 0 ||
    authority.morphologyProduced !== false ||
    authority.criterionStatesIssued !== 0 ||
    authority.claimsIssued !== 0 ||
    authority.traditionalSemanticAuthority !== false
  ) fail('issued metric geometry authority widened.');
  if (Object.values(candidate.persistencePolicy).some((value) => value !== false)) fail('issued metric geometry persistence boundary widened.');
  if (candidate.blockers.length !== BLOCKERS.length || candidate.blockers.some((value, index) => value !== BLOCKERS[index])) {
    fail('issued metric geometry blocker drift.');
  }
  if (
    candidate.prohibitedShortcuts.length !== PROHIBITED_SHORTCUTS.length ||
    candidate.prohibitedShortcuts.some((value, index) => value !== PROHIBITED_SHORTCUTS[index])
  ) fail('issued metric geometry prohibited-shortcut drift.');
}
