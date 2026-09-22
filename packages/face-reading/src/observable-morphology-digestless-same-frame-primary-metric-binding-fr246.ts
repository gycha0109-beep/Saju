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
import {
  issueMediaPipeGeometryProfileFR77,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  deriveEyeOuterCornerTiltInputFromMetricGeometryFR209,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import {
  computeEyeOuterCornerTiltFR208,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  FR237_PRIMARY_METRIC,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import type {
  FR242PrimaryMetricExtraction,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import type {
  FR244PreparedPrimaryMetricBinding,
  FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR246_CONTRACT_VERSION =
  'FR246-DIGESTLESS-SAME-FRAME-PRIMARY-METRIC-BINDING-v1' as const;

export const FR246_NEXT_FRONTIER =
  'issue_governed_fr237_capture_quality_operationalizations_before_real_fr243_execution' as const;

const PROVIDER_LANDMARK_COUNT = 478;
const GEOMETRY_LANDMARK_COUNT = 468;
const SAFE_RUN_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;

export interface FR246DigestlessPrimaryMetricBinding
  extends FR244PreparedPrimaryMetricBinding {
  readonly schemaVersion: 'fr246-digestless-primary-metric-binding-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR246_CONTRACT_VERSION;
  readonly authorityState:
    'provider_backed_same_frame_primary_metric_binding_prepared_quality_still_external';
  readonly provider: {
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly providerRunRef: string;
    readonly providerLandmarkCount: 478;
    readonly geometryLandmarkCount: 468;
    readonly irisLandmarksExcluded: true;
  };
  readonly metric: {
    readonly metricRef: typeof FR237_PRIMARY_METRIC;
    readonly computationDeferredUntilFR242ExtractorInvocation: true;
    readonly providerGeometryPreparedBeforeQualityGate: true;
    readonly providerGeometryIsPrimaryMetricValue: false;
  };
  readonly persistence: {
    readonly rawImageDigestComputed: false;
    readonly rawImageDigestPersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawMetricGeometryPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
  readonly authorityBoundary: {
    readonly captureQualityValidated: false;
    readonly primaryMetricFormulaBoundToProviderGeometry: true;
    readonly empiricalRepeatabilityEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR246_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-246 ' + message);
}

function validateProviderLandmark(
  landmark: MediaPipeNormalizedLandmarkFR25V1,
  index: number,
): MediaPipeMetricGeometryPointFR76V1 {
  if (typeof landmark !== 'object' || landmark === null) {
    fail(`faceLandmarks[${index}] must be an object.`);
  }
  const allowed = new Set(['x', 'y', 'z', 'visibility']);
  const unexpected = Object.keys(landmark).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`faceLandmarks[${index}] contains unauthorized field: ${unexpected}.`);
  }
  if (!Number.isFinite(landmark.x) || landmark.x < 0 || landmark.x > 1) {
    fail(`faceLandmarks[${index}].x must be finite within [0,1].`);
  }
  if (!Number.isFinite(landmark.y) || landmark.y < 0 || landmark.y > 1) {
    fail(`faceLandmarks[${index}].y must be finite within [0,1].`);
  }
  if (!Number.isFinite(landmark.z)) {
    fail(`faceLandmarks[${index}].z must be finite.`);
  }
  if (landmark.visibility !== undefined && !Number.isFinite(landmark.visibility)) {
    fail(`faceLandmarks[${index}].visibility must be finite when present.`);
  }
  return Object.freeze({ x: landmark.x, y: landmark.y, z: landmark.z });
}

function geometryInputFromProviderResult(
  result: MediaPipeFaceLandmarkerResultFR25V1,
): readonly MediaPipeMetricGeometryPointFR76V1[] {
  if (typeof result !== 'object' || result === null) {
    fail('FaceLandmarker result must be an object.');
  }
  const allowed = new Set([
    'faceLandmarks',
    'faceBlendshapes',
    'facialTransformationMatrixes',
  ]);
  const unexpected = Object.keys(result).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`FaceLandmarker result contains unauthorized field: ${unexpected}.`);
  }
  if (
    !Array.isArray(result.faceLandmarks)
    || !Array.isArray(result.faceBlendshapes)
    || !Array.isArray(result.facialTransformationMatrixes)
  ) {
    fail('FaceLandmarker result arrays are malformed.');
  }
  if (result.faceLandmarks.length !== 1) {
    fail(`requires exactly one detected face; received ${result.faceLandmarks.length}.`);
  }
  if (
    result.faceBlendshapes.length !== 0
    || result.facialTransformationMatrixes.length !== 0
  ) {
    fail('blendshape and provider transformation-matrix outputs must remain disabled.');
  }
  const landmarks = result.faceLandmarks[0];
  if (!Array.isArray(landmarks) || landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    fail(`requires exactly ${PROVIDER_LANDMARK_COUNT} provider landmarks.`);
  }
  return Object.freeze(
    landmarks
      .slice(0, GEOMETRY_LANDMARK_COUNT)
      .map((landmark, index) => validateProviderLandmark(landmark, index)),
  );
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) return false;
  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}

function createBinding(
  input: {
    readonly providerRunRef: string;
    readonly expectedJpegBytes: Uint8Array;
    readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  },
  providerBackedPrimaryMetricBinding: true,
): FR246DigestlessPrimaryMetricBinding {
  if (providerBackedPrimaryMetricBinding !== true) {
    fail('provider-backed binding marker is required.');
  }
  let expectedJpegBytes: Uint8Array | undefined = input.expectedJpegBytes;
  let metricLandmarks:
    | readonly MediaPipeMetricGeometryPointFR76V1[]
    | undefined = input.metricLandmarks;
  let disposed = false;
  let consumed = false;

  const primaryMetricExtractor = (
    ephemeralBytes: Uint8Array,
  ): FR242PrimaryMetricExtraction => {
    if (disposed) fail('prepared primary-metric binding has already been disposed.');
    if (consumed) fail('prepared primary-metric binding is single-use.');
    if (expectedJpegBytes === undefined || metricLandmarks === undefined) {
      fail('prepared primary-metric binding has no live ephemeral state.');
    }
    if (!sameBytes(ephemeralBytes, expectedJpegBytes)) {
      fail('FR242 working bytes do not match the exact FR244 JPEG bound to this provider run.');
    }

    const derived = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(
      metricLandmarks,
    );
    if (derived.status !== 'available') {
      fail(`frozen primary metric is unavailable: ${derived.reason}.`);
    }
    const metric = computeEyeOuterCornerTiltFR208(Object.freeze({
      ...derived.input,
      sourceObservationRefs: Object.freeze([
        'fr246:digestless_ephemeral_fr76_metric_geometry',
        'fr24:two_closed_eye_cycles:provider_labels_not_semantic',
        'fr209:role_invariant_cycle_extrema_relative_to_mesh_midline',
      ]),
    })).mean;
    if (
      metric.metricRef !== FR237_PRIMARY_METRIC
      || metric.unit !== 'degree'
      || !Number.isFinite(metric.value)
      || metric.classificationApplied !== false
      || metric.traditionalBindingApplied !== false
    ) {
      fail('frozen FR237 primary metric boundary drift.');
    }

    consumed = true;
    expectedJpegBytes = undefined;
    metricLandmarks = undefined;
    return Object.freeze({
      metricRef: FR237_PRIMARY_METRIC,
      unit: 'degree' as const,
      value: metric.value,
    });
  };

  const dispose = (): void => {
    disposed = true;
    expectedJpegBytes = undefined;
    metricLandmarks = undefined;
  };

  return Object.freeze({
    schemaVersion: 'fr246-digestless-primary-metric-binding-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR246_CONTRACT_VERSION,
    authorityState:
      'provider_backed_same_frame_primary_metric_binding_prepared_quality_still_external' as const,
    providerBackedPrimaryMetricBinding: true as const,
    rawImageDigestComputed: false as const,
    rawImageDigestPersisted: false as const,
    primaryMetricExtractor,
    dispose,
    provider: Object.freeze({
      runtimePackageName: '@mediapipe/tasks-vision' as const,
      runtimePackageVersion: '0.10.35' as const,
      providerRunRef: input.providerRunRef,
      providerLandmarkCount: 478 as const,
      geometryLandmarkCount: 468 as const,
      irisLandmarksExcluded: true as const,
    }),
    metric: Object.freeze({
      metricRef: FR237_PRIMARY_METRIC,
      computationDeferredUntilFR242ExtractorInvocation: true as const,
      providerGeometryPreparedBeforeQualityGate: true as const,
      providerGeometryIsPrimaryMetricValue: false as const,
    }),
    persistence: Object.freeze({
      rawImageDigestComputed: false as const,
      rawImageDigestPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawMetricGeometryPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      captureQualityValidated: false as const,
      primaryMetricFormulaBoundToProviderGeometry: true as const,
      empiricalRepeatabilityEstablished: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR246_NEXT_FRONTIER,
  });
}

export async function prepareDigestlessSameFramePrimaryMetricBindingFR246(input: {
  readonly image: unknown;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly providerRunRef: string;
  readonly jpegBytes: Uint8Array;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
}): Promise<FR246DigestlessPrimaryMetricBinding> {
  if (input.image === null || input.image === undefined) {
    fail('in-memory browser frame image is required.');
  }
  if (
    !Number.isInteger(input.frameWidth)
    || !Number.isInteger(input.frameHeight)
    || input.frameWidth <= 0
    || input.frameHeight <= 0
  ) {
    fail('frame dimensions must be positive integers.');
  }
  if (!SAFE_RUN_REF.test(input.providerRunRef)) {
    fail('providerRunRef must be a bounded opaque reference without whitespace.');
  }
  if (!(input.jpegBytes instanceof Uint8Array) || input.jpegBytes.byteLength === 0) {
    fail('exact FR244 JPEG bytes are required for same-frame binding.');
  }

  validateMediaPipeScreenToMetricReimplementationParityFR76(input.parity);
  const profile = await issueMediaPipeGeometryProfileFR77(
    input.geometryMetadataPbtxt,
  );
  const factory =
    input.factory ?? DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26;
  if (
    typeof factory !== 'object'
    || factory === null
    || typeof factory.create !== 'function'
  ) {
    fail('runtime factory must expose create().');
  }

  const runtime = await factory.create();
  if (
    typeof runtime !== 'object'
    || runtime === null
    || typeof runtime.detect !== 'function'
    || typeof runtime.close !== 'function'
  ) {
    fail('runtime factory returned an invalid runtime instance.');
  }

  let metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  try {
    const providerResult = runtime.detect(input.image);
    const screenLandmarks = geometryInputFromProviderResult(providerResult);
    const metric = reimplementMediaPipeScreenToMetricFR76({
      screenLandmarks,
      canonicalMetricLandmarks: profile.canonicalMetricLandmarks,
      landmarkWeights: profile.landmarkWeights,
      frameWidth: input.frameWidth,
      frameHeight: input.frameHeight,
    });
    if (
      metric.metricLandmarks.length !== GEOMETRY_LANDMARK_COUNT
      || metric.poseTransformMatrixPackedColumnMajor.length !== 16
    ) {
      fail('FR76 metric geometry shape drift.');
    }
    metricLandmarks = metric.metricLandmarks;
  } finally {
    runtime.close();
  }

  return createBinding({
    providerRunRef: input.providerRunRef,
    expectedJpegBytes: input.jpegBytes,
    metricLandmarks,
  }, true);
}

export const FR246_PRIMARY_METRIC_BINDING_PREPARER:
FR244PrimaryMetricBindingPreparer = Object.freeze({
  async prepare(input: Parameters<FR244PrimaryMetricBindingPreparer['prepare']>[0]) {
    if (
      input.providerContext === undefined
      || typeof input.providerContext !== 'object'
      || input.providerContext === null
    ) {
      fail('FR246 providerContext is required.');
    }
    const context = input.providerContext as {
      readonly geometryMetadataPbtxt?: unknown;
      readonly parity?: unknown;
      readonly factory?: unknown;
    };
    if (typeof context.geometryMetadataPbtxt !== 'string') {
      fail('FR246 geometryMetadataPbtxt provider context is required.');
    }
    return prepareDigestlessSameFramePrimaryMetricBindingFR246({
      image: input.image,
      frameWidth: input.width,
      frameHeight: input.height,
      providerRunRef: input.providerRunRef,
      jpegBytes: input.jpegBytes,
      geometryMetadataPbtxt: context.geometryMetadataPbtxt,
      parity: context.parity as MediaPipeScreenToMetricReimplementationParityFR76V1,
      ...(context.factory === undefined
        ? {}
        : {
            factory:
              context.factory as MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
          }),
    });
  },
});

export function createSyntheticMechanicsPrimaryMetricBindingFR246(input: {
  readonly providerRunRef: string;
  readonly expectedJpegBytes: Uint8Array;
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
}) {
  const binding = createBinding({
    providerRunRef: input.providerRunRef,
    expectedJpegBytes: input.expectedJpegBytes,
    metricLandmarks: input.metricLandmarks,
  }, true);
  return Object.freeze({
    schemaVersion: 'fr246-synthetic-mechanics-primary-metric-binding-v1' as const,
    empiricalEvidenceEligible: false as const,
    realParticipantExecutionEligible: false as const,
    primaryMetricExtractor: binding.primaryMetricExtractor,
    dispose: binding.dispose,
  });
}
