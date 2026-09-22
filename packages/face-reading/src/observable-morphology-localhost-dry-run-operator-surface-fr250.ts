import type {
  MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import type {
  MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  assertIssuedMesh6HBrowserCameraHandle,
  type Mesh6HBrowserCameraHandleV1,
} from './mesh6h-browser-camera-frame-source.js';
import {
  preregisterObservableMorphologyRepeatabilityStudyFR237,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import {
  materializeResearchLiveCaptureRuntimeFR238,
} from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import {
  issuePrecollectionRetentionPrivacyPolicyFR239,
} from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  issueOnePersonDryRunAdmissionFR240,
  issueParticipantConsentProtocolFR240,
  recordParticipantConsentFR240,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import {
  materializeOnePersonDryRunRuntimeFR241,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import {
  materializeEphemeralLiveCameraFrameIntakeRuntimeFR242,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import {
  materializeGovernedDryRunExecutionRuntimeFR243,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import type {
  FR244BrowserJpegEncoder,
  FR244CaptureQualityBindingPreparer,
  FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import type {
  FR247QualityRuntimeFactory,
} from './observable-morphology-operator-attested-dry-run-quality-fr247.js';
import {
  materializeGovernedBrowserDryRunCoordinatorFR249,
  type FR249GovernedBrowserDryRunCoordinator,
} from './observable-morphology-governed-browser-dry-run-coordinator-fr249.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR250_CONTRACT_VERSION =
  'FR250-LOCALHOST-ONE-PERSON-DRY-RUN-OPERATOR-SURFACE-v1' as const;

export const FR250_NEXT_FRONTIER =
  'execute_actual_fr243_four_capture_dry_run_with_real_participant_and_live_camera_through_fr250_surface' as const;

export interface FR250ConsentConfirmations {
  readonly studyNoticeRead: true;
  readonly voluntaryParticipationConfirmed: true;
  readonly liveCameraCaptureConsent: true;
  readonly transientRawCaptureProcessingConsent: true;
  readonly sanitizedReviewImageRetentionConsent: true;
  readonly pseudonymousMetricStorageConsent: true;
  readonly noTrainingReuseAcknowledged: true;
  readonly noProductionReuseAcknowledged: true;
  readonly noBiometricIdentityMatchingAcknowledged: true;
  readonly withdrawalProcedureAcknowledged: true;
}

export interface FR250LocalhostOperatorRuntime {
  readonly schemaVersion: 'fr250-localhost-operator-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR250_CONTRACT_VERSION;
  readonly authorityState:
    'localhost_operator_runtime_ready_actual_participant_execution_not_performed_by_materialization';
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly authorityRefs: {
    readonly protocolRef: string;
    readonly consentReceiptRef: string;
    readonly admissionRef: string;
    readonly fr241RuntimeRef: string;
    readonly fr242RuntimeRef: string;
  };
  readonly coordinator: FR249GovernedBrowserDryRunCoordinator;
  readonly persistence: {
    readonly rawFramePersisted: false;
    readonly rawJpegPersisted: false;
    readonly providerPayloadPersisted: false;
    readonly landmarkSetPersisted: false;
    readonly rawImageDigestComputed: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly localhostSurfaceIsIndependentVerification: false;
    readonly actualParticipantActionRequired: true;
    readonly actualLiveCameraInputRequired: true;
    readonly participantIdentityIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly temporalSeparationIndependentlyVerified: false;
    readonly captureQualityConstructValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR250_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-250 ' + message);
}

export function materializeLocalhostOnePersonDryRunOperatorRuntimeFR250(input: {
  readonly camera: Mesh6HBrowserCameraHandleV1;
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly consentRecordedAt: string;
  readonly consent: FR250ConsentConfirmations;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly metricRuntimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
  readonly qualityRuntimeFactory?: FR247QualityRuntimeFactory;
  readonly jpegEncoder?: FR244BrowserJpegEncoder;
  readonly qualityBindingPreparer?: FR244CaptureQualityBindingPreparer;
  readonly primaryMetricBindingPreparer?: FR244PrimaryMetricBindingPreparer;
}): FR250LocalhostOperatorRuntime {
  assertIssuedMesh6HBrowserCameraHandle(input.camera);
  if (typeof input.consent !== 'object' || input.consent === null) {
    fail('explicit FR240 consent confirmations are required.');
  }
  if (Object.values(input.consent).some((value) => value !== true)) {
    fail('every FR240 consent confirmation must be explicitly true.');
  }
  if (typeof input.geometryMetadataPbtxt !== 'string' || input.geometryMetadataPbtxt.length === 0) {
    fail('geometryMetadataPbtxt is required.');
  }
  if (typeof input.parity !== 'object' || input.parity === null) {
    fail('FR76 parity object is required.');
  }

  const fr237 = preregisterObservableMorphologyRepeatabilityStudyFR237();
  const fr238 = materializeResearchLiveCaptureRuntimeFR238(fr237);
  const fr239 = issuePrecollectionRetentionPrivacyPolicyFR239(fr238);
  const protocol = issueParticipantConsentProtocolFR240({
    runtime: fr238,
    policy: fr239,
  });
  const receipt = recordParticipantConsentFR240(protocol, {
    participantRef: input.participantRef,
    operatorRef: input.operatorRef,
    consentRecordedAt: input.consentRecordedAt,
    ...input.consent,
  });
  const admission = issueOnePersonDryRunAdmissionFR240({
    protocol,
    consentReceipt: receipt,
  });
  const fr241 = materializeOnePersonDryRunRuntimeFR241({
    runtime: fr238,
    protocol,
    admission,
  });
  const fr242 = materializeEphemeralLiveCameraFrameIntakeRuntimeFR242({
    runtime: fr241,
    policy: fr239,
  });
  const fr243 = materializeGovernedDryRunExecutionRuntimeFR243({
    runtime: fr241,
    frameIntakeRuntime: fr242,
  });
  const coordinator = materializeGovernedBrowserDryRunCoordinatorFR249({
    camera: input.camera,
    runtime: fr241,
    frameIntakeRuntime: fr242,
    executionRuntime: fr243,
    admission,
    geometryMetadataPbtxt: input.geometryMetadataPbtxt,
    parity: input.parity,
    ...(input.metricRuntimeFactory === undefined
      ? {}
      : { metricRuntimeFactory: input.metricRuntimeFactory }),
    ...(input.qualityRuntimeFactory === undefined
      ? {}
      : { qualityRuntimeFactory: input.qualityRuntimeFactory }),
    ...(input.jpegEncoder === undefined
      ? {}
      : { jpegEncoder: input.jpegEncoder }),
    ...(input.qualityBindingPreparer === undefined
      ? {}
      : { qualityBindingPreparer: input.qualityBindingPreparer }),
    ...(input.primaryMetricBindingPreparer === undefined
      ? {}
      : { primaryMetricBindingPreparer: input.primaryMetricBindingPreparer }),
  });

  return Object.freeze({
    schemaVersion: 'fr250-localhost-operator-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR250_CONTRACT_VERSION,
    authorityState:
      'localhost_operator_runtime_ready_actual_participant_execution_not_performed_by_materialization' as const,
    participantRef: receipt.participantRef,
    operatorRef: receipt.operatorRef,
    authorityRefs: Object.freeze({
      protocolRef: protocol.protocolRef,
      consentReceiptRef: receipt.receiptRef,
      admissionRef: admission.admissionRef,
      fr241RuntimeRef: fr241.runtimeRef,
      fr242RuntimeRef: fr242.runtimeRef,
    }),
    coordinator,
    persistence: Object.freeze({
      rawFramePersisted: false as const,
      rawJpegPersisted: false as const,
      providerPayloadPersisted: false as const,
      landmarkSetPersisted: false as const,
      rawImageDigestComputed: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      localhostSurfaceIsIndependentVerification: false as const,
      actualParticipantActionRequired: true as const,
      actualLiveCameraInputRequired: true as const,
      participantIdentityIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      temporalSeparationIndependentlyVerified: false as const,
      captureQualityConstructValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR250_NEXT_FRONTIER,
  });
}
