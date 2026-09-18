import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { Mesh6DWeightedRegionAdapterV2 } from './mesh6d-multi-frame-pose-sweep-evidence.js';
import type { Mesh6EProspectiveSweepManifestInputV1 } from './mesh6e-prospective-real-capture-calibration-protocol.js';
import {
  assertIssuedMesh6GProspectiveCaptureSession,
  runMesh6GProspectiveCaptureSession,
  type Mesh6GProspectiveCaptureSessionV1,
} from './mesh6g-prospective-operator-capture-session.js';
import {
  assertIssuedMesh6HBrowserCameraHandle,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HBrowserFrameTriggerV1,
} from './mesh6h-browser-camera-frame-source.js';
import { FaceAuthorityValidationError } from './validation.js';

export const MESH6I_MANUAL_BROWSER_CAPTURE_CONTROLLER_RECORD_ID =
  'research.face_geometry.zygomatic.manual_browser_capture_controller.mesh6i' as const;
export const MESH6I_NEXT_FRONTIER =
  'mount_mesh6i_in_an_actual_browser_or_product_operator_page_and_collect_real_post_preregistration_repeated_sweep_datasets_before_any_numeric_calibration_proposal' as const;

export type Mesh6ICameraOwnershipV1 =
  | 'controller_closes_after_session'
  | 'caller_retains_camera';

export interface Mesh6IManualSweepPlanV1 {
  readonly manifest: Mesh6EProspectiveSweepManifestInputV1;
  readonly triggers: AsyncIterable<Mesh6HBrowserFrameTriggerV1>;
}

export interface Mesh6IManualBrowserCaptureInputV1 {
  readonly camera: Mesh6HBrowserCameraHandleV1;
  readonly canonicalAssetDigest: string;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly weightedRegionAdapter: Mesh6DWeightedRegionAdapterV2;
  readonly sweeps: readonly Mesh6IManualSweepPlanV1[];
  readonly cameraOwnership?: Mesh6ICameraOwnershipV1;
}

export interface Mesh6IManualBrowserCaptureResultV1 {
  readonly schemaVersion: 'mesh6i-manual-browser-capture-controller-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof MESH6I_MANUAL_BROWSER_CAPTURE_CONTROLLER_RECORD_ID;
  readonly authorityState: 'manual_browser_capture_binding_to_mesh6g_descriptive_only';
  readonly session: Mesh6GProspectiveCaptureSessionV1;
  readonly execution: {
    readonly sweepCount: number;
    readonly captureTriggerSource: 'explicit_operator_async_iterable_only';
    readonly automaticTriggerSynthesisApplied: false;
    readonly triggerReorderingApplied: false;
    readonly automaticFrameSelectionApplied: false;
    readonly automaticPoseFilteringApplied: false;
    readonly automaticCaptureQualityFilteringApplied: false;
    readonly cameraOwnership: Mesh6ICameraOwnershipV1;
    readonly controllerCloseInvokedInFinally: boolean;
    readonly controllerCloseInvocationMeansTrackLifecycleDelegatedToMesh6H: true;
  };
  readonly sourceBoundary: {
    readonly activeIssuedMesh6HHandleRequired: true;
    readonly mesh6HFrameSourceUsedForEverySweep: true;
    readonly activeMesh6GSessionIssued: true;
    readonly externalPrebuiltMesh6GSessionAccepted: false;
    readonly controllerCreatesRawCaptureCopy: false;
  };
  readonly privacyBoundary: {
    readonly rawImageIncludedInControllerResult: false;
    readonly rawVideoIncludedInControllerResult: false;
    readonly rawProviderResponseIncludedInControllerResult: false;
    readonly rawLandmarkSetIncludedInControllerResult: false;
    readonly derivedFullFaceMetricGeometryIncludedInControllerResult: false;
    readonly faceEmbeddingIncludedInControllerResult: false;
    readonly identityTemplateIncludedInControllerResult: false;
  };
  readonly verificationBoundary: {
    readonly syntheticBrowserOrRepositoryFixtureAllowedForMechanicsOnly: true;
    readonly verifierFixtureMeansEmpiricalFreshCaptureEvidence: false;
    readonly verifierFixtureMeansRepeatabilityEstablished: false;
    readonly verifierFixtureMeansCaptureQualityValidated: false;
    readonly verifierFixtureMeansCalibrationJustified: false;
  };
  readonly authorityBoundary: {
    readonly controllerExecutionMeansIndependentFreshnessProof: false;
    readonly controllerExecutionMeansIdentityProof: false;
    readonly controllerExecutionMeansEmpiricalRepeatabilityEstablished: false;
    readonly controllerExecutionMeansCaptureQualityValidated: false;
    readonly controllerExecutionMeansPoseAcceptanceValidated: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly confidenceScoreIssued: false;
    readonly populationNormDefined: false;
    readonly productionMorphologyAuthorized: false;
    readonly anatomicalMeasurementClaimed: false;
    readonly beautyInterpretationIssued: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly nextFrontier: typeof MESH6I_NEXT_FRONTIER;
}

const RESULT_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('MESH6I ' + message);
}

function validateTriggerStream(
  value: AsyncIterable<Mesh6HBrowserFrameTriggerV1>,
  sweepIndex: number,
): void {
  if (
    typeof value !== 'object'
    || value === null
    || typeof value[Symbol.asyncIterator] !== 'function'
  ) fail('sweep ' + sweepIndex + ' triggers must be an AsyncIterable.');
}

function resolveOwnership(
  value: Mesh6ICameraOwnershipV1 | undefined,
): Mesh6ICameraOwnershipV1 {
  if (value === undefined) return 'controller_closes_after_session';
  if (
    value !== 'controller_closes_after_session'
    && value !== 'caller_retains_camera'
  ) fail('cameraOwnership is unsupported.');
  return value;
}

function validateResult(result: Mesh6IManualBrowserCaptureResultV1): void {
  if (
    result.schemaVersion !== 'mesh6i-manual-browser-capture-controller-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== MESH6I_MANUAL_BROWSER_CAPTURE_CONTROLLER_RECORD_ID
    || result.authorityState !== 'manual_browser_capture_binding_to_mesh6g_descriptive_only'
    || result.execution.sweepCount !== result.session.execution.sweepCount
    || result.execution.captureTriggerSource !== 'explicit_operator_async_iterable_only'
    || result.execution.automaticTriggerSynthesisApplied !== false
    || result.execution.triggerReorderingApplied !== false
    || result.execution.automaticFrameSelectionApplied !== false
    || result.execution.automaticPoseFilteringApplied !== false
    || result.execution.automaticCaptureQualityFilteringApplied !== false
    || result.execution.controllerCloseInvocationMeansTrackLifecycleDelegatedToMesh6H !== true
    || result.sourceBoundary.activeIssuedMesh6HHandleRequired !== true
    || result.sourceBoundary.mesh6HFrameSourceUsedForEverySweep !== true
    || result.sourceBoundary.activeMesh6GSessionIssued !== true
    || result.sourceBoundary.externalPrebuiltMesh6GSessionAccepted !== false
    || result.sourceBoundary.controllerCreatesRawCaptureCopy !== false
    || result.privacyBoundary.rawImageIncludedInControllerResult !== false
    || result.privacyBoundary.rawVideoIncludedInControllerResult !== false
    || result.privacyBoundary.rawProviderResponseIncludedInControllerResult !== false
    || result.privacyBoundary.rawLandmarkSetIncludedInControllerResult !== false
    || result.privacyBoundary.derivedFullFaceMetricGeometryIncludedInControllerResult !== false
    || result.privacyBoundary.faceEmbeddingIncludedInControllerResult !== false
    || result.privacyBoundary.identityTemplateIncludedInControllerResult !== false
    || result.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
    || result.verificationBoundary.verifierFixtureMeansRepeatabilityEstablished !== false
    || result.verificationBoundary.verifierFixtureMeansCaptureQualityValidated !== false
    || result.verificationBoundary.verifierFixtureMeansCalibrationJustified !== false
    || result.authorityBoundary.controllerExecutionMeansIndependentFreshnessProof !== false
    || result.authorityBoundary.controllerExecutionMeansIdentityProof !== false
    || result.authorityBoundary.controllerExecutionMeansEmpiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.controllerExecutionMeansCaptureQualityValidated !== false
    || result.authorityBoundary.controllerExecutionMeansPoseAcceptanceValidated !== false
    || result.authorityBoundary.classificationIssued !== false
    || result.authorityBoundary.calibrationIssued !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.confidenceScoreIssued !== false
    || result.authorityBoundary.populationNormDefined !== false
    || result.authorityBoundary.productionMorphologyAuthorized !== false
    || result.authorityBoundary.anatomicalMeasurementClaimed !== false
    || result.authorityBoundary.beautyInterpretationIssued !== false
    || result.authorityBoundary.traditionalSemanticAuthority !== false
    || result.nextFrontier !== MESH6I_NEXT_FRONTIER
  ) fail('issued manual browser capture result authority boundary drift.');

  if (
    result.execution.cameraOwnership === 'controller_closes_after_session'
    && result.execution.controllerCloseInvokedInFinally !== true
  ) fail('controller-owned camera must report close invocation in finally.');
  if (
    result.execution.cameraOwnership === 'caller_retains_camera'
    && result.execution.controllerCloseInvokedInFinally !== false
  ) fail('caller-retained camera must not report controller close invocation.');

  assertIssuedMesh6GProspectiveCaptureSession(result.session);
}

export function getMesh6IManualBrowserCaptureControllerContract() {
  return Object.freeze({
    schemaVersion: 'mesh6i-manual-browser-capture-controller-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6I_MANUAL_BROWSER_CAPTURE_CONTROLLER_RECORD_ID,
    predecessor: Object.freeze({
      activeIssuedMesh6HHandleRequired: true as const,
      mesh6GProspectiveCaptureSessionRequired: true as const,
      mesh6EManifestInputPerSweepRequired: true as const,
      explicitOperatorTriggerAsyncIterablePerSweepRequired: true as const,
    }),
    execution: Object.freeze({
      defaultCameraOwnership: 'controller_closes_after_session' as const,
      callerMayExplicitlyRetainCamera: true as const,
      controllerOwnedCameraClosedInFinally: true as const,
      automaticTriggerSynthesisAllowed: false as const,
      triggerReorderingAllowed: false as const,
      automaticFrameSelectionAllowed: false as const,
      automaticPoseFilteringAllowed: false as const,
      automaticCaptureQualityFilteringAllowed: false as const,
      minimumFrameCountForProduction: null,
      minimumSweepCountForProduction: null,
    }),
    persistence: Object.freeze({
      rawImageIncludedInResult: false as const,
      rawVideoIncludedInResult: false as const,
      rawProviderResponseIncludedInResult: false as const,
      rawLandmarkSetIncludedInResult: false as const,
      derivedFullFaceMetricGeometryIncludedInResult: false as const,
      faceEmbeddingIncludedInResult: false as const,
      identityTemplateIncludedInResult: false as const,
    }),
    authorityBoundary: Object.freeze({
      independentFreshnessProofIssued: false as const,
      identityProofIssued: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      poseAcceptanceValidated: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      confidenceScoreIssued: false as const,
      populationNormDefined: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
      beautyInterpretationIssued: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: MESH6I_NEXT_FRONTIER,
  });
}

export async function runMesh6IManualBrowserCaptureController(
  input: Mesh6IManualBrowserCaptureInputV1,
  runtimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): Promise<Mesh6IManualBrowserCaptureResultV1> {
  if (typeof input !== 'object' || input === null) fail('controller input must be an object.');
  assertIssuedMesh6HBrowserCameraHandle(input.camera);
  if (!Array.isArray(input.sweeps) || input.sweeps.length === 0) {
    fail('controller requires at least one manual sweep plan.');
  }
  const cameraOwnership = resolveOwnership(input.cameraOwnership);

  for (let index = 0; index < input.sweeps.length; index += 1) {
    validateTriggerStream(input.sweeps[index]!.triggers, index);
  }

  let closeInvoked = false;
  try {
    const sweeps = Object.freeze(input.sweeps.map((sweep) => Object.freeze({
      manifest: sweep.manifest,
      frames: input.camera.createSweepFrameSource(sweep.triggers),
    })));

    const sessionInput = Object.freeze({
      canonicalAssetDigest: input.canonicalAssetDigest,
      geometryMetadataPbtxt: input.geometryMetadataPbtxt,
      parity: input.parity,
      weightedRegionAdapter: input.weightedRegionAdapter,
      sweeps,
    });

    const session = runtimeFactory === undefined
      ? await runMesh6GProspectiveCaptureSession(sessionInput)
      : await runMesh6GProspectiveCaptureSession(sessionInput, runtimeFactory);
    assertIssuedMesh6GProspectiveCaptureSession(session);

    const result: Mesh6IManualBrowserCaptureResultV1 = Object.freeze({
      schemaVersion: 'mesh6i-manual-browser-capture-controller-result-v1' as const,
      artifactVersion: '0.1.0' as const,
      recordId: MESH6I_MANUAL_BROWSER_CAPTURE_CONTROLLER_RECORD_ID,
      authorityState: 'manual_browser_capture_binding_to_mesh6g_descriptive_only' as const,
      session,
      execution: Object.freeze({
        sweepCount: input.sweeps.length,
        captureTriggerSource: 'explicit_operator_async_iterable_only' as const,
        automaticTriggerSynthesisApplied: false as const,
        triggerReorderingApplied: false as const,
        automaticFrameSelectionApplied: false as const,
        automaticPoseFilteringApplied: false as const,
        automaticCaptureQualityFilteringApplied: false as const,
        cameraOwnership,
        controllerCloseInvokedInFinally: cameraOwnership === 'controller_closes_after_session',
        controllerCloseInvocationMeansTrackLifecycleDelegatedToMesh6H: true as const,
      }),
      sourceBoundary: Object.freeze({
        activeIssuedMesh6HHandleRequired: true as const,
        mesh6HFrameSourceUsedForEverySweep: true as const,
        activeMesh6GSessionIssued: true as const,
        externalPrebuiltMesh6GSessionAccepted: false as const,
        controllerCreatesRawCaptureCopy: false as const,
      }),
      privacyBoundary: Object.freeze({
        rawImageIncludedInControllerResult: false as const,
        rawVideoIncludedInControllerResult: false as const,
        rawProviderResponseIncludedInControllerResult: false as const,
        rawLandmarkSetIncludedInControllerResult: false as const,
        derivedFullFaceMetricGeometryIncludedInControllerResult: false as const,
        faceEmbeddingIncludedInControllerResult: false as const,
        identityTemplateIncludedInControllerResult: false as const,
      }),
      verificationBoundary: Object.freeze({
        syntheticBrowserOrRepositoryFixtureAllowedForMechanicsOnly: true as const,
        verifierFixtureMeansEmpiricalFreshCaptureEvidence: false as const,
        verifierFixtureMeansRepeatabilityEstablished: false as const,
        verifierFixtureMeansCaptureQualityValidated: false as const,
        verifierFixtureMeansCalibrationJustified: false as const,
      }),
      authorityBoundary: Object.freeze({
        controllerExecutionMeansIndependentFreshnessProof: false as const,
        controllerExecutionMeansIdentityProof: false as const,
        controllerExecutionMeansEmpiricalRepeatabilityEstablished: false as const,
        controllerExecutionMeansCaptureQualityValidated: false as const,
        controllerExecutionMeansPoseAcceptanceValidated: false as const,
        classificationIssued: false as const,
        calibrationIssued: false as const,
        thresholdsIssued: false as const,
        confidenceScoreIssued: false as const,
        populationNormDefined: false as const,
        productionMorphologyAuthorized: false as const,
        anatomicalMeasurementClaimed: false as const,
        beautyInterpretationIssued: false as const,
        traditionalSemanticAuthority: false as const,
      }),
      nextFrontier: MESH6I_NEXT_FRONTIER,
    });
    RESULT_ISSUED.add(result);
    return result;
  } finally {
    if (cameraOwnership === 'controller_closes_after_session') {
      closeInvoked = true;
      input.camera.close();
    }
    void closeInvoked;
  }
}

export function assertIssuedMesh6IManualBrowserCaptureResult(
  result: Mesh6IManualBrowserCaptureResultV1,
): void {
  if (!RESULT_ISSUED.has(result)) fail('controller result was not issued by the active MESH6I boundary.');
  validateResult(result);
}
