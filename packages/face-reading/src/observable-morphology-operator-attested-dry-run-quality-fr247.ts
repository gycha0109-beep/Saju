import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import type {
  MediaPipeFaceLandmarkerResultFR25V1,
  MediaPipeNormalizedLandmarkFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import {
  FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
  FR26_MEDIAPIPE_WASM_ROOT,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  type MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import type {
  FR242CaptureQualityAssessment,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import type {
  FR244CaptureQualityBindingPreparer,
  FR244PreparedCaptureQualityBinding,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR247_CONTRACT_VERSION =
  'FR247-OPERATOR-ATTESTED-DRY-RUN-CAPTURE-QUALITY-OPERATIONALIZATION-v1' as const;

export const FR247_NEXT_FRONTIER =
  'execute_actual_fr243_four_capture_dry_run_with_real_participant_live_camera_and_operator_attested_quality_mechanics' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;

export interface FR247OperatorQualityObservation {
  readonly schemaVersion: 'fr247-operator-quality-observation-v1';
  readonly operatorRef: string;
  readonly providerRunRef: string;
  readonly captureTriggerTimestampMs: number;
  readonly recordedAt: string;
  readonly frontalNeutralPoseObserved: boolean;
  readonly bilateralEyeContoursVisuallyResolvable: boolean;
  readonly bilateralEyeRegionsFullyVisible: boolean;
  readonly majorEyeRegionOcclusionAbsent: boolean;
  readonly observationMadeBeforeExplicitCaptureTrigger: true;
  readonly observationIsIndependentQualityVerification: false;
}

export interface FR247PreparedDryRunQualityBinding
  extends FR244PreparedCaptureQualityBinding {
  readonly schemaVersion: 'fr247-prepared-dry-run-quality-binding-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR247_CONTRACT_VERSION;
  readonly authorityState:
    'operator_attested_dry_run_quality_mechanics_bound_no_construct_validation';
  readonly mechanics: {
    readonly faceCountDetectionMaxFaces: 2;
    readonly exactlyOneFaceObserved: boolean;
    readonly bilateralEyeLandmarkCoverageObserved: boolean;
    readonly bilateralEyeTopologySource: 'FR24';
  };
  readonly operatorObservation: FR247OperatorQualityObservation;
  readonly authorityBoundary: {
    readonly governedDryRunOperationalizationIssued: true;
    readonly operatorObservationIsIndependentQualityVerification: false;
    readonly providerMechanicsMeanCaptureQualityConstructValidated: false;
    readonly captureQualityConstructValidated: false;
    readonly numericCaptureQualityThresholdIssued: false;
    readonly automaticProductQualityGateAuthorized: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR247_NEXT_FRONTIER;
}

export interface FR247QualityRuntimeFactory {
  readonly create: () => Promise<MediaPipeFaceLandmarkerRuntimeInstanceFR26V1>;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-247 ' + message);
}

function validIso(value: string): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString() === value;
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) return false;
  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}

function validateObservation(
  observation: FR247OperatorQualityObservation,
  providerRunRef: string,
  triggerTimestampMs: number,
): void {
  if (typeof observation !== 'object' || observation === null) {
    fail('operator quality observation is required.');
  }
  if (
    observation.schemaVersion !== 'fr247-operator-quality-observation-v1'
    || !SAFE_REF.test(observation.operatorRef)
    || observation.providerRunRef !== providerRunRef
    || observation.captureTriggerTimestampMs !== triggerTimestampMs
    || !Number.isFinite(observation.captureTriggerTimestampMs)
    || !validIso(observation.recordedAt)
    || typeof observation.frontalNeutralPoseObserved !== 'boolean'
    || typeof observation.bilateralEyeContoursVisuallyResolvable !== 'boolean'
    || typeof observation.bilateralEyeRegionsFullyVisible !== 'boolean'
    || typeof observation.majorEyeRegionOcclusionAbsent !== 'boolean'
    || observation.observationMadeBeforeExplicitCaptureTrigger !== true
    || observation.observationIsIndependentQualityVerification !== false
  ) {
    fail('operator quality observation drift or frame binding mismatch.');
  }
}

function eyeTopologyIndices(): readonly number[] {
  const indices = new Set<number>();
  for (const symbol of FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER) {
    for (const edge of FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]) {
      indices.add(edge.start);
      indices.add(edge.end);
    }
  }
  return Object.freeze([...indices].sort((left, right) => left - right));
}

const EYE_TOPOLOGY_INDICES = eyeTopologyIndices();

function finiteLandmark(
  landmark: MediaPipeNormalizedLandmarkFR25V1 | undefined,
): boolean {
  return (
    landmark !== undefined
    && Number.isFinite(landmark.x)
    && Number.isFinite(landmark.y)
    && Number.isFinite(landmark.z)
  );
}

function providerMechanics(result: MediaPipeFaceLandmarkerResultFR25V1): {
  readonly exactlyOneFaceObserved: boolean;
  readonly bilateralEyeLandmarkCoverageObserved: boolean;
} {
  if (
    typeof result !== 'object'
    || result === null
    || !Array.isArray(result.faceLandmarks)
  ) {
    fail('provider result faceLandmarks must be an array.');
  }
  const exactlyOneFaceObserved = result.faceLandmarks.length === 1;
  const face = exactlyOneFaceObserved ? result.faceLandmarks[0] : undefined;
  const bilateralEyeLandmarkCoverageObserved =
    face !== undefined
    && EYE_TOPOLOGY_INDICES.every((index) => finiteLandmark(face[index]));
  return Object.freeze({
    exactlyOneFaceObserved,
    bilateralEyeLandmarkCoverageObserved,
  });
}

export const DEFAULT_FR247_QUALITY_RUNTIME_FACTORY:
FR247QualityRuntimeFactory = Object.freeze({
  async create(): Promise<MediaPipeFaceLandmarkerRuntimeInstanceFR26V1> {
    const vision = await import('@mediapipe/tasks-vision');
    const fileset = await vision.FilesetResolver.forVisionTasks(
      FR26_MEDIAPIPE_WASM_ROOT,
    );
    const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
      },
      runningMode: 'IMAGE',
      numFaces: 2,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
    });
    return Object.freeze({
      detect(image: unknown): MediaPipeFaceLandmarkerResultFR25V1 {
        const detect = landmarker.detect.bind(landmarker) as unknown as (
          source: unknown,
        ) => unknown;
        return detect(image) as MediaPipeFaceLandmarkerResultFR25V1;
      },
      close(): void {
        landmarker.close();
      },
    });
  },
});

export async function prepareOperatorAttestedDryRunQualityBindingFR247(input: {
  readonly image: unknown;
  readonly providerRunRef: string;
  readonly triggerTimestampMs: number;
  readonly jpegBytes: Uint8Array;
  readonly operatorObservation: FR247OperatorQualityObservation;
  readonly factory?: FR247QualityRuntimeFactory;
}): Promise<FR247PreparedDryRunQualityBinding> {
  if (input.image === null || input.image === undefined) {
    fail('in-memory browser frame image is required.');
  }
  if (!SAFE_REF.test(input.providerRunRef)) {
    fail('providerRunRef must be a bounded opaque reference without whitespace.');
  }
  if (!Number.isFinite(input.triggerTimestampMs) || input.triggerTimestampMs < 0) {
    fail('triggerTimestampMs must be a non-negative finite number.');
  }
  if (!(input.jpegBytes instanceof Uint8Array) || input.jpegBytes.byteLength === 0) {
    fail('exact FR244 JPEG bytes are required.');
  }
  validateObservation(
    input.operatorObservation,
    input.providerRunRef,
    input.triggerTimestampMs,
  );

  const factory = input.factory ?? DEFAULT_FR247_QUALITY_RUNTIME_FACTORY;
  if (
    typeof factory !== 'object'
    || factory === null
    || typeof factory.create !== 'function'
  ) {
    fail('quality runtime factory must expose create().');
  }
  const runtime = await factory.create();
  if (
    typeof runtime !== 'object'
    || runtime === null
    || typeof runtime.detect !== 'function'
    || typeof runtime.close !== 'function'
  ) {
    fail('quality runtime factory returned an invalid runtime instance.');
  }

  let mechanics: ReturnType<typeof providerMechanics>;
  try {
    mechanics = providerMechanics(runtime.detect(input.image));
  } finally {
    runtime.close();
  }

  let expectedJpegBytes: Uint8Array | undefined = input.jpegBytes;
  let disposed = false;
  let consumed = false;

  const qualityEvaluator = (
    ephemeralBytes: Uint8Array,
  ): FR242CaptureQualityAssessment => {
    if (disposed) fail('prepared quality binding has already been disposed.');
    if (consumed) fail('prepared quality binding is single-use.');
    if (expectedJpegBytes === undefined) {
      fail('prepared quality binding has no live JPEG reference.');
    }
    if (!sameBytes(ephemeralBytes, expectedJpegBytes)) {
      fail('FR242 working bytes do not match the exact FR244 JPEG bound to this quality observation.');
    }
    consumed = true;
    expectedJpegBytes = undefined;
    return Object.freeze({
      schemaVersion: 'fr242-capture-quality-assessment-v1' as const,
      singleFace: mechanics.exactlyOneFaceObserved,
      frontalPose: input.operatorObservation.frontalNeutralPoseObserved,
      sharpness:
        input.operatorObservation.bilateralEyeContoursVisuallyResolvable,
      bilateralEyeRegionVisibility:
        input.operatorObservation.bilateralEyeRegionsFullyVisible,
      bilateralEyeLandmarkCoverage:
        mechanics.bilateralEyeLandmarkCoverageObserved,
      majorEyeRegionOcclusionAbsent:
        input.operatorObservation.majorEyeRegionOcclusionAbsent,
    });
  };

  const dispose = (): void => {
    disposed = true;
    expectedJpegBytes = undefined;
  };

  return Object.freeze({
    schemaVersion: 'fr247-prepared-dry-run-quality-binding-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR247_CONTRACT_VERSION,
    authorityState:
      'operator_attested_dry_run_quality_mechanics_bound_no_construct_validation' as const,
    governedDryRunQualityBinding: true as const,
    rawImageDigestComputed: false as const,
    rawImageDigestPersisted: false as const,
    qualityEvaluator,
    dispose,
    mechanics: Object.freeze({
      faceCountDetectionMaxFaces: 2 as const,
      exactlyOneFaceObserved: mechanics.exactlyOneFaceObserved,
      bilateralEyeLandmarkCoverageObserved:
        mechanics.bilateralEyeLandmarkCoverageObserved,
      bilateralEyeTopologySource: 'FR24' as const,
    }),
    operatorObservation: Object.freeze({ ...input.operatorObservation }),
    authorityBoundary: Object.freeze({
      governedDryRunOperationalizationIssued: true as const,
      operatorObservationIsIndependentQualityVerification: false as const,
      providerMechanicsMeanCaptureQualityConstructValidated: false as const,
      captureQualityConstructValidated: false as const,
      numericCaptureQualityThresholdIssued: false as const,
      automaticProductQualityGateAuthorized: false as const,
      empiricalRepeatabilityEstablished: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR247_NEXT_FRONTIER,
  });
}

export const FR247_CAPTURE_QUALITY_BINDING_PREPARER:
FR244CaptureQualityBindingPreparer = Object.freeze({
  async prepare(input: Parameters<FR244CaptureQualityBindingPreparer['prepare']>[0]) {
    if (
      input.providerContext === undefined
      || typeof input.providerContext !== 'object'
      || input.providerContext === null
    ) {
      fail('FR247 providerContext is required.');
    }
    const context = input.providerContext as {
      readonly operatorObservation?: unknown;
      readonly factory?: unknown;
    };
    return prepareOperatorAttestedDryRunQualityBindingFR247({
      image: input.image,
      providerRunRef: input.providerRunRef,
      triggerTimestampMs: input.triggerTimestampMs,
      jpegBytes: input.jpegBytes,
      operatorObservation:
        context.operatorObservation as FR247OperatorQualityObservation,
      ...(context.factory === undefined
        ? {}
        : { factory: context.factory as MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 }),
    });
  },
});
