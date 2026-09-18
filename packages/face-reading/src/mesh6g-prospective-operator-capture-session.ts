import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  type MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from './governed-metric-geometry-runtime-fr77.js';
import {
  buildMesh6ANeutralObservationFrame,
  type Mesh6AObservationFrameV1,
} from './mesh6a-neutral-observation-frame.js';
import type { Mesh6DWeightedRegionAdapterV2 } from './mesh6d-multi-frame-pose-sweep-evidence.js';
import {
  admitMesh6EProspectiveSweepManifest,
  type Mesh6EProspectiveSweepManifestInputV1,
} from './mesh6e-prospective-real-capture-calibration-protocol.js';
import {
  assertIssuedMesh6FProspectiveSweepAcquisitionDataset,
  materializeMesh6FProspectiveSweepAcquisitionDataset,
  recordMesh6FProspectiveSweepAcquisition,
  type Mesh6FProspectiveSweepAcquisitionDatasetV1,
  type Mesh6FProspectiveSweepAcquisitionRecordV1,
} from './mesh6f-prospective-sweep-acquisition-runtime.js';
import { FaceAuthorityValidationError } from './validation.js';

export const MESH6G_OPERATOR_CAPTURE_SESSION_RECORD_ID =
  'research.face_geometry.zygomatic.operator_capture_session.mesh6g' as const;
export const MESH6G_NEXT_FRONTIER =
  'run_actual_operator_or_browser_post_preregistration_capture_sessions_and_review_inspectable_mesh6f_descriptive_datasets_before_any_numeric_calibration_proposal' as const;

export interface Mesh6GCapturedFrameV1 {
  readonly image: unknown;
  readonly timestampMs: number;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly providerRunRef: string;
}

export interface Mesh6GProspectiveSweepPlanV1 {
  readonly manifest: Mesh6EProspectiveSweepManifestInputV1;
  readonly frames: AsyncIterable<Mesh6GCapturedFrameV1>;
}

export interface Mesh6GProspectiveCaptureSessionInputV1 {
  readonly canonicalAssetDigest: string;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly weightedRegionAdapter: Mesh6DWeightedRegionAdapterV2;
  readonly sweeps: readonly Mesh6GProspectiveSweepPlanV1[];
}

export interface Mesh6GProspectiveCaptureSessionV1 {
  readonly schemaVersion: 'mesh6g-prospective-operator-capture-session-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof MESH6G_OPERATOR_CAPTURE_SESSION_RECORD_ID;
  readonly authorityState: 'operator_supplied_capture_orchestration_descriptive_dataset_only';
  readonly dataset: Mesh6FProspectiveSweepAcquisitionDatasetV1;
  readonly execution: {
    readonly sweepCount: number;
    readonly capturedFrameCount: number;
    readonly sharedMediaPipeRuntimeCreatedOnce: true;
    readonly sharedMediaPipeRuntimeCloseInvokedExactlyOnce: true;
    readonly perFrameBorrowedRuntimeCloseIsNoop: true;
    readonly frameIterationOrderPreserved: true;
    readonly timestampsSortedByCoordinator: false;
    readonly automaticFrameSelectionApplied: false;
    readonly automaticPoseFilteringApplied: false;
    readonly automaticCaptureQualityFilteringApplied: false;
  };
  readonly attestationBoundary: {
    readonly mesh6EFreshnessAttestationRequired: true;
    readonly mesh6EFreshnessAttestationMeansIndependentProof: false;
    readonly sameParticipantSeriesAttestationRequired: true;
    readonly sameParticipantSeriesAttestationMeansIdentityMatch: false;
    readonly coordinatorInProcessManifestFrameLinkageAttested: true;
    readonly coordinatorLinkageAttestationMeansIndependentPhysicalCaptureProof: false;
  };
  readonly privacyBoundary: {
    readonly rawImageIncludedInSessionArtifact: false;
    readonly rawVideoIncludedInSessionArtifact: false;
    readonly rawProviderResponseIncludedInSessionArtifact: false;
    readonly rawLandmarkSetIncludedInSessionArtifact: false;
    readonly derivedFullFaceMetricGeometryIncludedInSessionArtifact: false;
    readonly faceEmbeddingIncludedInSessionArtifact: false;
    readonly identityTemplateIncludedInSessionArtifact: false;
    readonly callerMayRetainInputSourceOutsideCoordinatorAuthority: true;
  };
  readonly verificationBoundary: {
    readonly syntheticOrRepositoryFixtureAllowedForMechanicsOnly: true;
    readonly verifierFixtureMeansEmpiricalFreshCaptureEvidence: false;
    readonly verifierFixtureMeansRepeatabilityEstablished: false;
    readonly verifierFixtureMeansCaptureQualityValidated: false;
    readonly verifierFixtureMeansCalibrationJustified: false;
  };
  readonly authorityBoundary: {
    readonly sessionMaterializationMeansEmpiricalRepeatabilityEstablished: false;
    readonly sessionMaterializationMeansCaptureQualityValidated: false;
    readonly sessionMaterializationMeansPoseAcceptanceValidated: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly confidenceScoreIssued: false;
    readonly populationNormDefined: false;
    readonly productionMorphologyAuthorized: false;
    readonly identityMatchingPerformed: false;
    readonly anatomicalMeasurementClaimed: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly nextFrontier: typeof MESH6G_NEXT_FRONTIER;
}

const SESSION_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('MESH6G ' + message);
}

function validateRuntime(runtime: MediaPipeFaceLandmarkerRuntimeInstanceFR26V1): void {
  if (
    typeof runtime !== 'object'
    || runtime === null
    || typeof runtime.detect !== 'function'
    || typeof runtime.close !== 'function'
  ) fail('runtime factory returned an invalid shared runtime instance.');
}

function borrowedFactory(
  runtime: MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return Object.freeze({
    async create(): Promise<MediaPipeFaceLandmarkerRuntimeInstanceFR26V1> {
      return Object.freeze({
        detect(image: unknown) {
          return runtime.detect(image);
        },
        close(): void {},
      });
    },
  });
}

function validateCapturedFrame(frame: Mesh6GCapturedFrameV1, sweepIndex: number, frameIndex: number): void {
  if (typeof frame !== 'object' || frame === null) {
    fail('sweep ' + sweepIndex + ' frame ' + frameIndex + ' must be an object.');
  }
  if (frame.image === null || frame.image === undefined) {
    fail('sweep ' + sweepIndex + ' frame ' + frameIndex + ' image must be present in memory.');
  }
  if (!Number.isFinite(frame.timestampMs)) {
    fail('sweep ' + sweepIndex + ' frame ' + frameIndex + ' timestampMs must be finite.');
  }
  if (!Number.isFinite(frame.frameWidth) || !(frame.frameWidth > 0)) {
    fail('sweep ' + sweepIndex + ' frame ' + frameIndex + ' frameWidth must be finite and positive.');
  }
  if (!Number.isFinite(frame.frameHeight) || !(frame.frameHeight > 0)) {
    fail('sweep ' + sweepIndex + ' frame ' + frameIndex + ' frameHeight must be finite and positive.');
  }
  if (typeof frame.providerRunRef !== 'string' || frame.providerRunRef.length === 0) {
    fail('sweep ' + sweepIndex + ' frame ' + frameIndex + ' providerRunRef must be non-empty.');
  }
}

function validateFrameStream(value: AsyncIterable<Mesh6GCapturedFrameV1>, sweepIndex: number): void {
  if (
    typeof value !== 'object'
    || value === null
    || typeof value[Symbol.asyncIterator] !== 'function'
  ) fail('sweep ' + sweepIndex + ' frames must be an AsyncIterable.');
}

function validateSessionResult(result: Mesh6GProspectiveCaptureSessionV1): void {
  if (
    result.schemaVersion !== 'mesh6g-prospective-operator-capture-session-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== MESH6G_OPERATOR_CAPTURE_SESSION_RECORD_ID
    || result.authorityState !== 'operator_supplied_capture_orchestration_descriptive_dataset_only'
    || result.execution.sweepCount !== result.dataset.observedSweepCount
    || !(result.execution.capturedFrameCount >= result.execution.sweepCount)
    || result.execution.sharedMediaPipeRuntimeCreatedOnce !== true
    || result.execution.sharedMediaPipeRuntimeCloseInvokedExactlyOnce !== true
    || result.execution.perFrameBorrowedRuntimeCloseIsNoop !== true
    || result.execution.frameIterationOrderPreserved !== true
    || result.execution.timestampsSortedByCoordinator !== false
    || result.execution.automaticFrameSelectionApplied !== false
    || result.execution.automaticPoseFilteringApplied !== false
    || result.execution.automaticCaptureQualityFilteringApplied !== false
    || result.attestationBoundary.mesh6EFreshnessAttestationMeansIndependentProof !== false
    || result.attestationBoundary.sameParticipantSeriesAttestationMeansIdentityMatch !== false
    || result.attestationBoundary.coordinatorLinkageAttestationMeansIndependentPhysicalCaptureProof !== false
    || result.privacyBoundary.rawImageIncludedInSessionArtifact !== false
    || result.privacyBoundary.rawProviderResponseIncludedInSessionArtifact !== false
    || result.privacyBoundary.rawLandmarkSetIncludedInSessionArtifact !== false
    || result.privacyBoundary.derivedFullFaceMetricGeometryIncludedInSessionArtifact !== false
    || result.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
    || result.authorityBoundary.sessionMaterializationMeansEmpiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.sessionMaterializationMeansCaptureQualityValidated !== false
    || result.authorityBoundary.sessionMaterializationMeansPoseAcceptanceValidated !== false
    || result.authorityBoundary.classificationIssued !== false
    || result.authorityBoundary.calibrationIssued !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.confidenceScoreIssued !== false
    || result.authorityBoundary.populationNormDefined !== false
    || result.authorityBoundary.productionMorphologyAuthorized !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.anatomicalMeasurementClaimed !== false
    || result.authorityBoundary.traditionalSemanticAuthority !== false
    || result.nextFrontier !== MESH6G_NEXT_FRONTIER
  ) fail('issued operator-capture session authority boundary drift.');
  assertIssuedMesh6FProspectiveSweepAcquisitionDataset(result.dataset);
}

export function getMesh6GProspectiveCaptureSessionContract() {
  return Object.freeze({
    schemaVersion: 'mesh6g-prospective-operator-capture-session-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6G_OPERATOR_CAPTURE_SESSION_RECORD_ID,
    predecessor: Object.freeze({
      mesh6EManifestInputRequired: true as const,
      mesh6FRecordAndDatasetRuntimeRequired: true as const,
      fr77GovernedMetricGeometryRequired: true as const,
      mesh6AIssuedObservationFramesRequired: true as const,
    }),
    captureExecution: Object.freeze({
      asyncSequentialFrameSourceRequired: true as const,
      sharedMediaPipeRuntimePerSession: true as const,
      frameOrderPreserved: true as const,
      silentTimestampSortAllowed: false as const,
      automaticFrameSelectionAllowed: false as const,
      automaticPoseFilteringAllowed: false as const,
      automaticCaptureQualityFilteringAllowed: false as const,
      minimumFrameCountForProduction: null,
      minimumSweepCountForProduction: null,
    }),
    persistence: Object.freeze({
      rawImageIncludedInOutput: false as const,
      rawVideoIncludedInOutput: false as const,
      rawProviderResponseIncludedInOutput: false as const,
      rawLandmarkSetIncludedInOutput: false as const,
      derivedFullFaceMetricGeometryIncludedInOutput: false as const,
      faceEmbeddingIncludedInOutput: false as const,
      identityTemplateIncludedInOutput: false as const,
      callerInputRetentionOutsideCoordinatorAuthority: true as const,
    }),
    authorityBoundary: Object.freeze({
      empiricalRepeatabilityEstablishedBySession: false as const,
      captureQualityValidatedBySession: false as const,
      poseAcceptanceValidatedBySession: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      confidenceScoreIssued: false as const,
      populationNormDefined: false as const,
      productionMorphologyAuthorized: false as const,
      identityMatchingPerformed: false as const,
      anatomicalMeasurementClaimed: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: MESH6G_NEXT_FRONTIER,
  });
}

export async function runMesh6GProspectiveCaptureSession(
  input: Mesh6GProspectiveCaptureSessionInputV1,
  runtimeFactory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 =
    DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
): Promise<Mesh6GProspectiveCaptureSessionV1> {
  if (typeof input !== 'object' || input === null) fail('session input must be an object.');
  if (!Array.isArray(input.sweeps) || input.sweeps.length === 0) {
    fail('session requires at least one prospective sweep plan.');
  }
  if (typeof runtimeFactory !== 'object' || runtimeFactory === null || typeof runtimeFactory.create !== 'function') {
    fail('runtimeFactory must expose create().');
  }

  const sharedRuntime = await runtimeFactory.create();
  validateRuntime(sharedRuntime);
  const perFrameFactory = borrowedFactory(sharedRuntime);
  let capturedFrameCount = 0;

  try {
    const records: Mesh6FProspectiveSweepAcquisitionRecordV1[] = [];

    for (let sweepIndex = 0; sweepIndex < input.sweeps.length; sweepIndex += 1) {
      const plan = input.sweeps[sweepIndex]!;
      validateFrameStream(plan.frames, sweepIndex);
      const manifest = admitMesh6EProspectiveSweepManifest(plan.manifest);
      const frames: { readonly frame: Mesh6AObservationFrameV1; readonly timestampMs: number }[] = [];
      let previousTimestamp: number | null = null;
      let frameIndex = 0;

      for await (const captured of plan.frames) {
        validateCapturedFrame(captured, sweepIndex, frameIndex);
        if (previousTimestamp !== null && !(captured.timestampMs > previousTimestamp)) {
          fail('sweep ' + sweepIndex + ' frame timestamps must be strictly increasing and are never silently sorted.');
        }

        const metricGeometry = await runGovernedMetricGeometryFR77({
          schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
          providerRunRef: captured.providerRunRef,
          canonicalAssetDigest: input.canonicalAssetDigest,
          image: captured.image,
          frameWidth: captured.frameWidth,
          frameHeight: captured.frameHeight,
          geometryMetadataPbtxt: input.geometryMetadataPbtxt,
        }, input.parity, perFrameFactory);

        const frame = buildMesh6ANeutralObservationFrame(metricGeometry);
        frames.push(Object.freeze({ frame, timestampMs: captured.timestampMs }));
        previousTimestamp = captured.timestampMs;
        frameIndex += 1;
        capturedFrameCount += 1;
      }

      if (frames.length === 0) fail('sweep ' + sweepIndex + ' must yield at least one captured frame.');

      records.push(recordMesh6FProspectiveSweepAcquisition({
        manifest,
        mesh6DInput: Object.freeze({
          frames: Object.freeze(frames),
          weightedRegionAdapter: input.weightedRegionAdapter,
        }),
        mesh6DInputCorrespondsToManifestSweepAttested: true,
      }));
    }

    const dataset = materializeMesh6FProspectiveSweepAcquisitionDataset(records);
    const result: Mesh6GProspectiveCaptureSessionV1 = Object.freeze({
      schemaVersion: 'mesh6g-prospective-operator-capture-session-v1' as const,
      artifactVersion: '0.1.0' as const,
      recordId: MESH6G_OPERATOR_CAPTURE_SESSION_RECORD_ID,
      authorityState: 'operator_supplied_capture_orchestration_descriptive_dataset_only' as const,
      dataset,
      execution: Object.freeze({
        sweepCount: records.length,
        capturedFrameCount,
        sharedMediaPipeRuntimeCreatedOnce: true as const,
        sharedMediaPipeRuntimeCloseInvokedExactlyOnce: true as const,
        perFrameBorrowedRuntimeCloseIsNoop: true as const,
        frameIterationOrderPreserved: true as const,
        timestampsSortedByCoordinator: false as const,
        automaticFrameSelectionApplied: false as const,
        automaticPoseFilteringApplied: false as const,
        automaticCaptureQualityFilteringApplied: false as const,
      }),
      attestationBoundary: Object.freeze({
        mesh6EFreshnessAttestationRequired: true as const,
        mesh6EFreshnessAttestationMeansIndependentProof: false as const,
        sameParticipantSeriesAttestationRequired: true as const,
        sameParticipantSeriesAttestationMeansIdentityMatch: false as const,
        coordinatorInProcessManifestFrameLinkageAttested: true as const,
        coordinatorLinkageAttestationMeansIndependentPhysicalCaptureProof: false as const,
      }),
      privacyBoundary: Object.freeze({
        rawImageIncludedInSessionArtifact: false as const,
        rawVideoIncludedInSessionArtifact: false as const,
        rawProviderResponseIncludedInSessionArtifact: false as const,
        rawLandmarkSetIncludedInSessionArtifact: false as const,
        derivedFullFaceMetricGeometryIncludedInSessionArtifact: false as const,
        faceEmbeddingIncludedInSessionArtifact: false as const,
        identityTemplateIncludedInSessionArtifact: false as const,
        callerMayRetainInputSourceOutsideCoordinatorAuthority: true as const,
      }),
      verificationBoundary: Object.freeze({
        syntheticOrRepositoryFixtureAllowedForMechanicsOnly: true as const,
        verifierFixtureMeansEmpiricalFreshCaptureEvidence: false as const,
        verifierFixtureMeansRepeatabilityEstablished: false as const,
        verifierFixtureMeansCaptureQualityValidated: false as const,
        verifierFixtureMeansCalibrationJustified: false as const,
      }),
      authorityBoundary: Object.freeze({
        sessionMaterializationMeansEmpiricalRepeatabilityEstablished: false as const,
        sessionMaterializationMeansCaptureQualityValidated: false as const,
        sessionMaterializationMeansPoseAcceptanceValidated: false as const,
        classificationIssued: false as const,
        calibrationIssued: false as const,
        thresholdsIssued: false as const,
        confidenceScoreIssued: false as const,
        populationNormDefined: false as const,
        productionMorphologyAuthorized: false as const,
        identityMatchingPerformed: false as const,
        anatomicalMeasurementClaimed: false as const,
        traditionalSemanticAuthority: false as const,
      }),
      nextFrontier: MESH6G_NEXT_FRONTIER,
    });
    SESSION_ISSUED.add(result);
    return result;
  } finally {
    sharedRuntime.close();
  }
}

export function assertIssuedMesh6GProspectiveCaptureSession(
  result: Mesh6GProspectiveCaptureSessionV1,
): void {
  if (!SESSION_ISSUED.has(result)) fail('capture session was not issued by the active MESH6G boundary.');
  validateSessionResult(result);
}
