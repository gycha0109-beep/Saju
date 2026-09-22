import {
  assertIssuedMesh6HBrowserCameraHandle,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HBrowserFrameTriggerV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  FR241LiveCaptureChallenge,
  FR241OnePersonDryRunSession,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import type {
  FR242CaptureQualityAssessment,
  FR242EphemeralLiveCameraFrameIntakeRuntime,
  FR242PrimaryMetricExtraction,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import {
  executeGovernedDryRunCaptureFR243,
  type FR243DryRunCaptureExecutionRecord,
  type FR243GovernedDryRunExecutionRuntime,
  type FR243OperatorExecutionAttestation,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR244_CONTRACT_VERSION =
  'FR244-GOVERNED-BROWSER-LIVE-CAMERA-JPEG-BRIDGE-v1' as const;

export const FR244_NEXT_FRONTIER =
  'bind_fr244_live_jpeg_to_real_quality_and_primary_metric_execution_without_synthetic_evaluator_promotion' as const;

const MAXIMUM_MEDIA_BYTES = 32 * 1024 * 1024;

export interface FR244BrowserJpegEncoder {
  readonly encodeJpeg: (
    image: unknown,
    width: number,
    height: number,
  ) => Promise<Uint8Array>;
}

export interface FR244GovernedBrowserCaptureResult {
  readonly schemaVersion: 'fr244-governed-browser-capture-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR244_CONTRACT_VERSION;
  readonly authorityState:
    'issued_mesh6h_frame_bridged_to_fr243_ephemeral_jpeg_mechanics_only';
  readonly frame: {
    readonly timestampMs: number;
    readonly providerRunRef: string;
    readonly width: number;
    readonly height: number;
  };
  readonly transport: {
    readonly source: 'live_camera';
    readonly mediaType: 'image/jpeg';
    readonly transportEncoding: 'raw-binary';
    readonly observedByteLength: number;
    readonly maximumMediaMiB: 32;
    readonly jpegEnvelopeValidatedBeforeFR243: true;
    readonly sourceJpegZeroizedAfterFR243: true;
    readonly cameraClosedByFR244: false;
    readonly rawJpegBytesPersisted: false;
    readonly rawImageDigestComputed: false;
    readonly reviewImagePersisted: false;
  };
  readonly fr243Record: FR243DryRunCaptureExecutionRecord;
  readonly verificationBoundary: {
    readonly activeIssuedMesh6HHandleRequired: true;
    readonly explicitOperatorTriggerRequired: true;
    readonly syntheticBrowserFixtureAllowedForMechanicsOnly: true;
    readonly syntheticFixtureMeansRealParticipantEvidence: false;
    readonly cameraPermissionMeansIndependentFreshnessProof: false;
  };
  readonly authorityBoundary: {
    readonly participantIdentityIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidatedByFR244: false;
    readonly primaryMetricValidatedByFR244: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR244_NEXT_FRONTIER;
}

const ISSUED_RESULTS = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-244 ' + message);
}

function validateTrigger(trigger: Mesh6HBrowserFrameTriggerV1): void {
  if (typeof trigger !== 'object' || trigger === null) {
    fail('operator trigger must be an object.');
  }
  if (!Number.isFinite(trigger.timestampMs)) {
    fail('operator trigger timestampMs must be finite.');
  }
  if (typeof trigger.providerRunRef !== 'string' || trigger.providerRunRef.length === 0) {
    fail('operator trigger providerRunRef must be non-empty.');
  }
}

function validateJpeg(bytes: Uint8Array): void {
  if (!(bytes instanceof Uint8Array)) fail('browser JPEG encoder must return Uint8Array.');
  if (bytes.byteLength === 0) fail('browser JPEG encoder returned an empty payload.');
  if (bytes.byteLength > MAXIMUM_MEDIA_BYTES) {
    fail('browser JPEG encoder payload exceeds the FR242 32 MiB maximum.');
  }
  if (
    bytes.byteLength < 4
    || bytes[0] !== 0xff
    || bytes[1] !== 0xd8
    || bytes[bytes.byteLength - 2] !== 0xff
    || bytes[bytes.byteLength - 1] !== 0xd9
  ) {
    fail('browser JPEG encoder payload must have JPEG SOI/EOI markers.');
  }
}

function validateEncoder(encoder: FR244BrowserJpegEncoder): void {
  if (
    typeof encoder !== 'object'
    || encoder === null
    || typeof encoder.encodeJpeg !== 'function'
  ) {
    fail('browser JPEG encoder must expose encodeJpeg().');
  }
}

function defaultBrowserJpegEncoder(): FR244BrowserJpegEncoder {
  return Object.freeze({
    async encodeJpeg(image: unknown, width: number, height: number): Promise<Uint8Array> {
      const CanvasCtor = globalThis.OffscreenCanvas;
      if (typeof CanvasCtor !== 'function') {
        fail('OffscreenCanvas is unavailable; an explicit browser JPEG encoder is required.');
      }
      if (
        !Number.isInteger(width)
        || !Number.isInteger(height)
        || width <= 0
        || height <= 0
      ) {
        fail('browser frame dimensions must be positive integers.');
      }

      const canvas = new CanvasCtor(width, height);
      const context = canvas.getContext('2d');
      if (context === null) fail('OffscreenCanvas 2D context is unavailable.');
      context.drawImage(image as CanvasImageSource, 0, 0, width, height);

      const blob = await canvas.convertToBlob({
        type: 'image/jpeg',
        quality: 0.92,
      });
      if (blob.type !== 'image/jpeg') {
        fail('browser encoder did not produce image/jpeg.');
      }
      return new Uint8Array(await blob.arrayBuffer());
    },
  });
}

async function* oneTrigger(
  trigger: Mesh6HBrowserFrameTriggerV1,
): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield trigger;
}

function assertResultBoundary(result: FR244GovernedBrowserCaptureResult): void {
  if (
    result.schemaVersion !== 'fr244-governed-browser-capture-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.contractVersion !== FR244_CONTRACT_VERSION
    || result.authorityState
      !== 'issued_mesh6h_frame_bridged_to_fr243_ephemeral_jpeg_mechanics_only'
    || result.transport.source !== 'live_camera'
    || result.transport.mediaType !== 'image/jpeg'
    || result.transport.transportEncoding !== 'raw-binary'
    || result.transport.maximumMediaMiB !== 32
    || result.transport.jpegEnvelopeValidatedBeforeFR243 !== true
    || result.transport.sourceJpegZeroizedAfterFR243 !== true
    || result.transport.cameraClosedByFR244 !== false
    || result.transport.rawJpegBytesPersisted !== false
    || result.transport.rawImageDigestComputed !== false
    || result.transport.reviewImagePersisted !== false
    || result.verificationBoundary.activeIssuedMesh6HHandleRequired !== true
    || result.verificationBoundary.explicitOperatorTriggerRequired !== true
    || result.verificationBoundary.syntheticBrowserFixtureAllowedForMechanicsOnly !== true
    || result.verificationBoundary.syntheticFixtureMeansRealParticipantEvidence !== false
    || result.verificationBoundary.cameraPermissionMeansIndependentFreshnessProof !== false
    || Object.values(result.authorityBoundary).some((value) => value !== false)
    || result.nextFrontier !== FR244_NEXT_FRONTIER
  ) {
    fail('issued browser capture result authority boundary drift.');
  }
  if (
    result.fr243Record.rawBytesPersisted !== false
    || result.fr243Record.rawImageDigestPersisted !== false
    || result.fr243Record.independentRealParticipantExecutionVerification !== false
    || result.fr243Record.empiricalEvidenceEligible !== false
    || result.fr243Record.confirmatoryEvidenceEligible !== false
  ) {
    fail('FR243 record widened beyond the FR244 mechanics-only boundary.');
  }
}

export function getGovernedBrowserLiveCameraJpegBridgeContractFR244() {
  return Object.freeze({
    schemaVersion: 'fr244-governed-browser-live-camera-jpeg-bridge-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR244_CONTRACT_VERSION,
    predecessor: Object.freeze({
      activeIssuedMesh6HHandleRequired: true as const,
      activeFR243ExecutionRuntimeRequired: true as const,
      activeFR242FrameIntakeRuntimeRequired: true as const,
      exactFR241SessionAndChallengeRequired: true as const,
    }),
    execution: Object.freeze({
      explicitOperatorTriggerRequired: true as const,
      framesConsumedPerInvocation: 1 as const,
      mediaType: 'image/jpeg' as const,
      maximumMediaMiB: 32 as const,
      jpegEnvelopeValidatedBeforeFR243: true as const,
      callerRetainsCameraOwnership: true as const,
      sourceJpegZeroizedAfterFR243: true as const,
      automaticCaptureTriggeringAllowed: false as const,
      galleryUploadFallbackAllowed: false as const,
    }),
    persistence: Object.freeze({
      rawJpegBytesPersisted: false as const,
      rawVideoPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      rawImageDigestComputed: false as const,
      reviewImagePersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      independentFreshnessProofIssued: false as const,
      identityProofIssued: false as const,
      sameParticipantIdentityVerified: false as const,
      captureQualityValidated: false as const,
      primaryMetricValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR244_NEXT_FRONTIER,
  });
}

export async function executeGovernedBrowserLiveCameraCaptureFR244(input: {
  readonly camera: Mesh6HBrowserCameraHandleV1;
  readonly trigger: Mesh6HBrowserFrameTriggerV1;
  readonly runtime: FR243GovernedDryRunExecutionRuntime;
  readonly frameIntakeRuntime: FR242EphemeralLiveCameraFrameIntakeRuntime;
  readonly session: FR241OnePersonDryRunSession;
  readonly challenge: FR241LiveCaptureChallenge;
  readonly qualityEvaluator: (
    ephemeralBytes: Uint8Array,
  ) => FR242CaptureQualityAssessment;
  readonly primaryMetricExtractor: (
    ephemeralBytes: Uint8Array,
  ) => FR242PrimaryMetricExtraction;
  readonly operatorAttestation: FR243OperatorExecutionAttestation;
  readonly jpegEncoder?: FR244BrowserJpegEncoder;
}): Promise<FR244GovernedBrowserCaptureResult> {
  assertIssuedMesh6HBrowserCameraHandle(input.camera);
  validateTrigger(input.trigger);
  const encoder = input.jpegEncoder ?? defaultBrowserJpegEncoder();
  validateEncoder(encoder);

  const frameSource = input.camera.createSweepFrameSource(oneTrigger(input.trigger));
  const iterator = frameSource[Symbol.asyncIterator]();
  let jpegBytes: Uint8Array | undefined;
  let frame:
    | {
        readonly image: unknown;
        readonly timestampMs: number;
        readonly frameWidth: number;
        readonly frameHeight: number;
        readonly providerRunRef: string;
      }
    | undefined;

  try {
    const first = await iterator.next();
    if (first.done === true) fail('explicit operator trigger yielded no browser frame.');
    frame = first.value;
    if (
      !Number.isInteger(frame.frameWidth)
      || !Number.isInteger(frame.frameHeight)
      || frame.frameWidth <= 0
      || frame.frameHeight <= 0
      || frame.timestampMs !== input.trigger.timestampMs
      || frame.providerRunRef !== input.trigger.providerRunRef
    ) {
      fail('MESH6H frame drifted from the explicit operator trigger or live dimensions.');
    }

    jpegBytes = await encoder.encodeJpeg(
      frame.image,
      frame.frameWidth,
      frame.frameHeight,
    );
    validateJpeg(jpegBytes);
    const observedByteLength = jpegBytes.byteLength;

    const fr243Record = executeGovernedDryRunCaptureFR243(
      input.runtime,
      input.frameIntakeRuntime,
      input.session,
      input.challenge,
      {
        declaredContentLength: observedByteLength,
        mediaBytes: jpegBytes,
        qualityEvaluator: input.qualityEvaluator,
        primaryMetricExtractor: input.primaryMetricExtractor,
        operatorAttestation: input.operatorAttestation,
      },
    );

    const result: FR244GovernedBrowserCaptureResult = Object.freeze({
      schemaVersion: 'fr244-governed-browser-capture-result-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR244_CONTRACT_VERSION,
      authorityState:
        'issued_mesh6h_frame_bridged_to_fr243_ephemeral_jpeg_mechanics_only' as const,
      frame: Object.freeze({
        timestampMs: frame.timestampMs,
        providerRunRef: frame.providerRunRef,
        width: frame.frameWidth,
        height: frame.frameHeight,
      }),
      transport: Object.freeze({
        source: 'live_camera' as const,
        mediaType: 'image/jpeg' as const,
        transportEncoding: 'raw-binary' as const,
        observedByteLength,
        maximumMediaMiB: 32 as const,
        jpegEnvelopeValidatedBeforeFR243: true as const,
        sourceJpegZeroizedAfterFR243: true as const,
        cameraClosedByFR244: false as const,
        rawJpegBytesPersisted: false as const,
        rawImageDigestComputed: false as const,
        reviewImagePersisted: false as const,
      }),
      fr243Record,
      verificationBoundary: Object.freeze({
        activeIssuedMesh6HHandleRequired: true as const,
        explicitOperatorTriggerRequired: true as const,
        syntheticBrowserFixtureAllowedForMechanicsOnly: true as const,
        syntheticFixtureMeansRealParticipantEvidence: false as const,
        cameraPermissionMeansIndependentFreshnessProof: false as const,
      }),
      authorityBoundary: Object.freeze({
        participantIdentityIndependentlyVerified: false as const,
        captureFreshnessIndependentlyVerified: false as const,
        sameParticipantIdentityIndependentlyVerified: false as const,
        captureQualityValidatedByFR244: false as const,
        primaryMetricValidatedByFR244: false as const,
        empiricalRepeatabilityEstablished: false as const,
        interpretationValidityEstablished: false as const,
        traditionalBindingIssued: false as const,
        productionActivated: false as const,
        commerceActivated: false as const,
      }),
      nextFrontier: FR244_NEXT_FRONTIER,
    });
    assertResultBoundary(result);
    ISSUED_RESULTS.add(result);
    return result;
  } finally {
    if (jpegBytes !== undefined) jpegBytes.fill(0);
    if (typeof iterator.return === 'function') {
      await iterator.return();
    }
  }
}

export function assertGovernedBrowserCaptureResultFR244(
  result: FR244GovernedBrowserCaptureResult,
): void {
  if (!ISSUED_RESULTS.has(result)) {
    fail('browser capture result was not issued by the active FR244 bridge.');
  }
  assertResultBoundary(result);
}
