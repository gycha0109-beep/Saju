import type { Mesh6GCapturedFrameV1 } from './mesh6g-prospective-operator-capture-session.js';
import { FaceAuthorityValidationError } from './validation.js';

export const MESH6H_BROWSER_CAMERA_ADAPTER_RECORD_ID =
  'research.face_geometry.zygomatic.browser_camera_frame_source.mesh6h' as const;
export const MESH6H_NEXT_FRONTIER =
  'bind_mesh6h_to_a_manual_operator_capture_surface_and_collect_actual_post_preregistration_repeated_sweep_datasets_through_mesh6g' as const;

export interface Mesh6HBrowserFrameTriggerV1 {
  readonly timestampMs: number;
  readonly providerRunRef: string;
}

export interface Mesh6HMediaStreamTrackLikeV1 {
  readonly stop: () => void;
}

export interface Mesh6HMediaStreamLikeV1 {
  readonly getTracks: () => readonly Mesh6HMediaStreamTrackLikeV1[];
}

export interface Mesh6HVideoElementLikeV1 {
  srcObject: unknown;
  readonly videoWidth: number;
  readonly videoHeight: number;
  readonly readyState: number;
  readonly play: () => Promise<void> | void;
  readonly pause: () => void;
}

export interface Mesh6HClosableImageLikeV1 {
  readonly close: () => void;
}

export interface Mesh6HBrowserEnvironmentV1 {
  readonly getUserMedia: (constraints: {
    readonly audio: false;
    readonly video: {
      readonly facingMode: 'user';
    };
  }) => Promise<Mesh6HMediaStreamLikeV1>;
  readonly createImageBitmap: (source: Mesh6HVideoElementLikeV1) => Promise<Mesh6HClosableImageLikeV1>;
}

export interface Mesh6HBrowserCameraOpenInputV1 {
  readonly video: Mesh6HVideoElementLikeV1;
}

export interface Mesh6HBrowserCameraHandleV1 {
  readonly schemaVersion: 'mesh6h-browser-camera-handle-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof MESH6H_BROWSER_CAMERA_ADAPTER_RECORD_ID;
  readonly authorityState: 'explicit_operator_triggered_browser_frame_source_only';
  readonly createSweepFrameSource: (
    triggers: AsyncIterable<Mesh6HBrowserFrameTriggerV1>,
  ) => AsyncIterable<Mesh6GCapturedFrameV1>;
  readonly close: () => void;
  readonly executionBoundary: {
    readonly getUserMediaInvokedOnceAtOpen: true;
    readonly audioRequested: false;
    readonly facingModeRequested: 'user';
    readonly explicitOperatorTriggerRequired: true;
    readonly automaticCaptureTriggering: false;
    readonly automaticFrameSelectionApplied: false;
    readonly automaticPoseFilteringApplied: false;
    readonly automaticCaptureQualityFilteringApplied: false;
    readonly triggerOrderPreserved: true;
    readonly timestampsSortedOrRepaired: false;
    readonly bitmapClosedAfterConsumerAdvance: true;
    readonly streamTracksStoppedOnClose: true;
    readonly closeIsIdempotent: true;
  };
  readonly privacyBoundary: {
    readonly rawImagePersistedByAdapter: false;
    readonly rawVideoPersistedByAdapter: false;
    readonly rawProviderResponsePersistedByAdapter: false;
    readonly rawLandmarkSetPersistedByAdapter: false;
    readonly derivedMetricGeometryPersistedByAdapter: false;
    readonly faceEmbeddingPersistedByAdapter: false;
    readonly identityTemplatePersistedByAdapter: false;
    readonly liveVideoElementReturnedAsMetadata: false;
  };
  readonly verificationBoundary: {
    readonly syntheticBrowserFixtureAllowedForMechanicsOnly: true;
    readonly verifierFixtureMeansEmpiricalFreshCaptureEvidence: false;
    readonly verifierFixtureMeansRepeatabilityEstablished: false;
    readonly verifierFixtureMeansCaptureQualityValidated: false;
    readonly verifierFixtureMeansCalibrationJustified: false;
  };
  readonly authorityBoundary: {
    readonly cameraPermissionMeansFreshCaptureProof: false;
    readonly explicitTriggerMeansFreshCaptureProof: false;
    readonly sameParticipantIdentityVerified: false;
    readonly poseAcceptanceIssued: false;
    readonly captureQualityAcceptanceIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly confidenceScoreIssued: false;
    readonly productionMorphologyAuthorized: false;
    readonly anatomicalMeasurementClaimed: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly nextFrontier: typeof MESH6H_NEXT_FRONTIER;
}

const HANDLE_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('MESH6H ' + message);
}

function defaultEnvironment(): Mesh6HBrowserEnvironmentV1 {
  const navigatorValue = globalThis.navigator;
  const createImageBitmapValue = globalThis.createImageBitmap;
  if (
    navigatorValue === undefined
    || navigatorValue.mediaDevices === undefined
    || typeof navigatorValue.mediaDevices.getUserMedia !== 'function'
    || typeof createImageBitmapValue !== 'function'
  ) fail('browser camera APIs are unavailable; an explicit environment adapter is required.');

  return Object.freeze({
    async getUserMedia(constraints: { readonly audio: false; readonly video: { readonly facingMode: 'user' } }) {
      const stream = await navigatorValue.mediaDevices.getUserMedia(constraints);
      return stream as unknown as Mesh6HMediaStreamLikeV1;
    },
    async createImageBitmap(source: Mesh6HVideoElementLikeV1) {
      return createImageBitmapValue(source as unknown as ImageBitmapSource) as Promise<Mesh6HClosableImageLikeV1>;
    },
  });
}

function validateVideo(video: Mesh6HVideoElementLikeV1): void {
  if (
    typeof video !== 'object'
    || video === null
    || typeof video.play !== 'function'
    || typeof video.pause !== 'function'
  ) fail('video must expose srcObject, play(), pause(), videoWidth, videoHeight, and readyState.');
}

function validateStream(stream: Mesh6HMediaStreamLikeV1): readonly Mesh6HMediaStreamTrackLikeV1[] {
  if (typeof stream !== 'object' || stream === null || typeof stream.getTracks !== 'function') {
    fail('getUserMedia returned an invalid MediaStream-like value.');
  }
  const tracks = stream.getTracks();
  if (!Array.isArray(tracks)) fail('MediaStream-like getTracks() must return an array.');
  for (const track of tracks) {
    if (typeof track !== 'object' || track === null || typeof track.stop !== 'function') {
      fail('MediaStream-like track must expose stop().');
    }
  }
  return tracks;
}

function validateTrigger(
  trigger: Mesh6HBrowserFrameTriggerV1,
  previousTimestampMs: number | null,
): void {
  if (typeof trigger !== 'object' || trigger === null) fail('capture trigger must be an object.');
  if (!Number.isFinite(trigger.timestampMs)) fail('capture trigger timestampMs must be finite.');
  if (previousTimestampMs !== null && !(trigger.timestampMs > previousTimestampMs)) {
    fail('capture trigger timestamps must be strictly increasing and are never sorted or repaired.');
  }
  if (typeof trigger.providerRunRef !== 'string' || trigger.providerRunRef.length === 0) {
    fail('capture trigger providerRunRef must be non-empty.');
  }
}

function validateVideoReady(video: Mesh6HVideoElementLikeV1): void {
  if (
    !Number.isFinite(video.videoWidth)
    || !Number.isFinite(video.videoHeight)
    || !(video.videoWidth > 0)
    || !(video.videoHeight > 0)
    || !Number.isFinite(video.readyState)
    || video.readyState < 2
  ) fail('video must have positive dimensions and readyState >= 2 before an explicit capture trigger.');
}

function assertHandleBoundary(handle: Mesh6HBrowserCameraHandleV1): void {
  if (
    handle.schemaVersion !== 'mesh6h-browser-camera-handle-v1'
    || handle.artifactVersion !== '0.1.0'
    || handle.recordId !== MESH6H_BROWSER_CAMERA_ADAPTER_RECORD_ID
    || handle.authorityState !== 'explicit_operator_triggered_browser_frame_source_only'
    || handle.executionBoundary.getUserMediaInvokedOnceAtOpen !== true
    || handle.executionBoundary.audioRequested !== false
    || handle.executionBoundary.facingModeRequested !== 'user'
    || handle.executionBoundary.explicitOperatorTriggerRequired !== true
    || handle.executionBoundary.automaticCaptureTriggering !== false
    || handle.executionBoundary.automaticFrameSelectionApplied !== false
    || handle.executionBoundary.automaticPoseFilteringApplied !== false
    || handle.executionBoundary.automaticCaptureQualityFilteringApplied !== false
    || handle.executionBoundary.triggerOrderPreserved !== true
    || handle.executionBoundary.timestampsSortedOrRepaired !== false
    || handle.executionBoundary.bitmapClosedAfterConsumerAdvance !== true
    || handle.executionBoundary.streamTracksStoppedOnClose !== true
    || handle.executionBoundary.closeIsIdempotent !== true
    || handle.privacyBoundary.rawImagePersistedByAdapter !== false
    || handle.privacyBoundary.rawVideoPersistedByAdapter !== false
    || handle.privacyBoundary.rawProviderResponsePersistedByAdapter !== false
    || handle.privacyBoundary.rawLandmarkSetPersistedByAdapter !== false
    || handle.privacyBoundary.derivedMetricGeometryPersistedByAdapter !== false
    || handle.privacyBoundary.faceEmbeddingPersistedByAdapter !== false
    || handle.privacyBoundary.identityTemplatePersistedByAdapter !== false
    || handle.privacyBoundary.liveVideoElementReturnedAsMetadata !== false
    || handle.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
    || handle.verificationBoundary.verifierFixtureMeansRepeatabilityEstablished !== false
    || handle.verificationBoundary.verifierFixtureMeansCaptureQualityValidated !== false
    || handle.verificationBoundary.verifierFixtureMeansCalibrationJustified !== false
    || handle.authorityBoundary.cameraPermissionMeansFreshCaptureProof !== false
    || handle.authorityBoundary.explicitTriggerMeansFreshCaptureProof !== false
    || handle.authorityBoundary.sameParticipantIdentityVerified !== false
    || handle.authorityBoundary.poseAcceptanceIssued !== false
    || handle.authorityBoundary.captureQualityAcceptanceIssued !== false
    || handle.authorityBoundary.classificationIssued !== false
    || handle.authorityBoundary.calibrationIssued !== false
    || handle.authorityBoundary.thresholdsIssued !== false
    || handle.authorityBoundary.confidenceScoreIssued !== false
    || handle.authorityBoundary.productionMorphologyAuthorized !== false
    || handle.authorityBoundary.anatomicalMeasurementClaimed !== false
    || handle.authorityBoundary.traditionalSemanticAuthority !== false
    || handle.nextFrontier !== MESH6H_NEXT_FRONTIER
  ) fail('issued browser camera handle authority boundary drift.');
}

export function getMesh6HBrowserCameraAdapterContract() {
  return Object.freeze({
    schemaVersion: 'mesh6h-browser-camera-adapter-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6H_BROWSER_CAMERA_ADAPTER_RECORD_ID,
    predecessor: Object.freeze({
      mesh6GFrameSchemaVersion: 'mesh6g-prospective-operator-capture-session-v1' as const,
      outputCompatibility: 'async_iterable_mesh6g_captured_frame_v1' as const,
    }),
    camera: Object.freeze({
      getUserMediaCalledAtOpen: true as const,
      audioRequested: false as const,
      facingMode: 'user' as const,
      automaticCaptureTriggering: false as const,
      automaticFrameSelection: false as const,
      automaticPoseFiltering: false as const,
      automaticCaptureQualityFiltering: false as const,
      triggerTimestampRepairAllowed: false as const,
      minimumFrameCountForProduction: null,
      minimumSweepCountForProduction: null,
    }),
    resourceLifecycle: Object.freeze({
      bitmapClosedAfterConsumerAdvance: true as const,
      allAcquiredTracksStoppedOnClose: true as const,
      allAcquiredTracksStoppedOnSetupFailure: true as const,
      closeIsIdempotent: true as const,
    }),
    persistence: Object.freeze({
      rawImagePersisted: false as const,
      rawVideoPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedMetricGeometryPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      freshCaptureProofIssued: false as const,
      identityMatchingPerformed: false as const,
      poseAcceptanceIssued: false as const,
      captureQualityAcceptanceIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: MESH6H_NEXT_FRONTIER,
  });
}

export async function openMesh6HBrowserCamera(
  input: Mesh6HBrowserCameraOpenInputV1,
  environment: Mesh6HBrowserEnvironmentV1 = defaultEnvironment(),
): Promise<Mesh6HBrowserCameraHandleV1> {
  if (typeof input !== 'object' || input === null) fail('camera open input must be an object.');
  validateVideo(input.video);
  if (
    typeof environment !== 'object'
    || environment === null
    || typeof environment.getUserMedia !== 'function'
    || typeof environment.createImageBitmap !== 'function'
  ) fail('browser environment must expose getUserMedia() and createImageBitmap().');

  const stream = await environment.getUserMedia(Object.freeze({
    audio: false as const,
    video: Object.freeze({ facingMode: 'user' as const }),
  }));
  const tracks = validateStream(stream);
  let closed = false;

  const stop = (): void => {
    if (closed) return;
    closed = true;
    for (const track of tracks) track.stop();
    input.video.pause();
    input.video.srcObject = null;
  };

  try {
    input.video.srcObject = stream;
    await input.video.play();
  } catch (error) {
    stop();
    throw error;
  }

  const handle: Mesh6HBrowserCameraHandleV1 = Object.freeze({
    schemaVersion: 'mesh6h-browser-camera-handle-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6H_BROWSER_CAMERA_ADAPTER_RECORD_ID,
    authorityState: 'explicit_operator_triggered_browser_frame_source_only' as const,
    createSweepFrameSource(triggers: AsyncIterable<Mesh6HBrowserFrameTriggerV1>) {
      if (
        typeof triggers !== 'object'
        || triggers === null
        || typeof triggers[Symbol.asyncIterator] !== 'function'
      ) fail('sweep triggers must be an AsyncIterable.');

      return Object.freeze({
        async *[Symbol.asyncIterator](): AsyncGenerator<Mesh6GCapturedFrameV1> {
          let previousTimestampMs: number | null = null;
          for await (const trigger of triggers) {
            if (closed) fail('browser camera handle is closed.');
            validateTrigger(trigger, previousTimestampMs);
            validateVideoReady(input.video);

            const bitmap = await environment.createImageBitmap(input.video);
            if (typeof bitmap !== 'object' || bitmap === null || typeof bitmap.close !== 'function') {
              fail('createImageBitmap returned an invalid closable image.');
            }

            try {
              yield Object.freeze({
                image: bitmap,
                timestampMs: trigger.timestampMs,
                frameWidth: input.video.videoWidth,
                frameHeight: input.video.videoHeight,
                providerRunRef: trigger.providerRunRef,
              });
            } finally {
              bitmap.close();
            }
            previousTimestampMs = trigger.timestampMs;
          }
        },
      });
    },
    close: stop,
    executionBoundary: Object.freeze({
      getUserMediaInvokedOnceAtOpen: true as const,
      audioRequested: false as const,
      facingModeRequested: 'user' as const,
      explicitOperatorTriggerRequired: true as const,
      automaticCaptureTriggering: false as const,
      automaticFrameSelectionApplied: false as const,
      automaticPoseFilteringApplied: false as const,
      automaticCaptureQualityFilteringApplied: false as const,
      triggerOrderPreserved: true as const,
      timestampsSortedOrRepaired: false as const,
      bitmapClosedAfterConsumerAdvance: true as const,
      streamTracksStoppedOnClose: true as const,
      closeIsIdempotent: true as const,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersistedByAdapter: false as const,
      rawVideoPersistedByAdapter: false as const,
      rawProviderResponsePersistedByAdapter: false as const,
      rawLandmarkSetPersistedByAdapter: false as const,
      derivedMetricGeometryPersistedByAdapter: false as const,
      faceEmbeddingPersistedByAdapter: false as const,
      identityTemplatePersistedByAdapter: false as const,
      liveVideoElementReturnedAsMetadata: false as const,
    }),
    verificationBoundary: Object.freeze({
      syntheticBrowserFixtureAllowedForMechanicsOnly: true as const,
      verifierFixtureMeansEmpiricalFreshCaptureEvidence: false as const,
      verifierFixtureMeansRepeatabilityEstablished: false as const,
      verifierFixtureMeansCaptureQualityValidated: false as const,
      verifierFixtureMeansCalibrationJustified: false as const,
    }),
    authorityBoundary: Object.freeze({
      cameraPermissionMeansFreshCaptureProof: false as const,
      explicitTriggerMeansFreshCaptureProof: false as const,
      sameParticipantIdentityVerified: false as const,
      poseAcceptanceIssued: false as const,
      captureQualityAcceptanceIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      confidenceScoreIssued: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: MESH6H_NEXT_FRONTIER,
  });

  HANDLE_ISSUED.add(handle);
  return handle;
}

export function assertIssuedMesh6HBrowserCameraHandle(
  handle: Mesh6HBrowserCameraHandleV1,
): void {
  if (!HANDLE_ISSUED.has(handle)) fail('browser camera handle was not issued by the active MESH6H boundary.');
  assertHandleBoundary(handle);
}
