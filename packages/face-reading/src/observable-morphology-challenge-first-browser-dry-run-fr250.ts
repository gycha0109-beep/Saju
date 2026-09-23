import type {
  MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import type {
  MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type {
  Mesh6HBrowserCameraHandleV1,
  Mesh6HBrowserFrameTriggerV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  FR240OnePersonDryRunAdmission,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import {
  assertOnePersonDryRunRuntimeFR241,
  issueLiveCaptureChallengeFR241,
  issueOnePersonDryRunSessionFR241,
  type FR241LiveCaptureChallenge,
  type FR241OnePersonDryRunRuntime,
  type FR241OnePersonDryRunSession,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import type {
  FR242EphemeralLiveCameraFrameIntakeRuntime,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import {
  assertGovernedDryRunExecutionRuntimeFR243,
  reviewGovernedOnePersonDryRunMechanicsFR243,
  type FR243DryRunCaptureExecutionRecord,
  type FR243DryRunMechanicsReview,
  type FR243GovernedDryRunExecutionRuntime,
  type FR243OperatorExecutionAttestation,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import {
  executeGovernedBrowserLiveCameraCaptureFR244,
  type FR244BrowserJpegEncoder,
  type FR244CaptureQualityBindingPreparer,
  type FR244GovernedBrowserCaptureResult,
  type FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import {
  FR246_PRIMARY_METRIC_BINDING_PREPARER,
} from './observable-morphology-digestless-same-frame-primary-metric-binding-fr246.js';
import {
  FR247_CAPTURE_QUALITY_BINDING_PREPARER,
  type FR247OperatorQualityObservation,
  type FR247QualityRuntimeFactory,
} from './observable-morphology-operator-attested-dry-run-quality-fr247.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR250_CONTRACT_VERSION =
  'FR250-CHALLENGE-FIRST-BROWSER-ONE-PERSON-DRY-RUN-v1' as const;

export const FR250_NEXT_FRONTIER =
  'wire_fr250_challenge_first_coordinator_into_localhost_operator_surface_then_request_actual_participant_action' as const;

export interface FR250PreparedCaptureSlot {
  readonly schemaVersion: 'fr250-prepared-capture-slot-v1';
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly challenge: FR241LiveCaptureChallenge;
  readonly challengeMustBePresentedBeforeTrigger: true;
  readonly automaticCaptureAllowed: false;
}

export interface FR250PreparedCaptureInput {
  readonly preparedSlot: FR250PreparedCaptureSlot;
  readonly trigger: Mesh6HBrowserFrameTriggerV1;
  readonly operatorExecutionAttestation: FR243OperatorExecutionAttestation;
  readonly operatorQualityObservation: FR247OperatorQualityObservation;
}

export interface FR250ChallengeFirstBrowserDryRunCoordinator {
  readonly schemaVersion: 'fr250-challenge-first-browser-dry-run-coordinator-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR250_CONTRACT_VERSION;
  readonly authorityState:
    'challenge_first_browser_dry_run_ready_actual_participant_execution_not_performed_by_materialization';
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly beginSession: (input: {
    readonly sessionOrdinal: 1 | 2;
    readonly issuedAt: string;
  }) => FR241OnePersonDryRunSession;
  readonly prepareCapture: (input: {
    readonly challengeIssuedAt: string;
  }) => FR250PreparedCaptureSlot;
  readonly capturePrepared: (
    input: FR250PreparedCaptureInput,
  ) => Promise<FR244GovernedBrowserCaptureResult>;
  readonly review: () => FR243DryRunMechanicsReview;
  readonly getSanitizedRecords: () => readonly FR243DryRunCaptureExecutionRecord[];
  readonly authorityBoundary: {
    readonly challengeIssuedBeforeTriggerByApiShape: true;
    readonly challengePresentationStillOperatorAttested: true;
    readonly actualParticipantActionRequired: true;
    readonly actualLiveCameraInputRequired: true;
    readonly automaticCaptureAllowed: false;
    readonly temporalSeparationIndependentlyVerified: false;
    readonly participantIdentityIndependentlyVerified: false;
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

function assertRuntimeBinding(input: {
  readonly runtime: FR241OnePersonDryRunRuntime;
  readonly frameIntakeRuntime: FR242EphemeralLiveCameraFrameIntakeRuntime;
  readonly executionRuntime: FR243GovernedDryRunExecutionRuntime;
  readonly admission: FR240OnePersonDryRunAdmission;
}): void {
  assertOnePersonDryRunRuntimeFR241(input.runtime);
  assertGovernedDryRunExecutionRuntimeFR243(input.executionRuntime);
  if (
    input.executionRuntime.sourceFR241.runtimeRef !== input.runtime.runtimeRef
    || input.executionRuntime.sourceFR242.runtimeRef
      !== input.frameIntakeRuntime.runtimeRef
    || input.admission.admissionRef !== input.runtime.sourceFR240.admissionRef
    || input.admission.participantRef !== input.runtime.sourceFR240.participantRef
    || input.admission.operatorRef !== input.runtime.sourceFR240.operatorRef
  ) {
    fail('FR241/FR242/FR243/admission binding mismatch.');
  }
}

export function materializeChallengeFirstBrowserDryRunCoordinatorFR250(input: {
  readonly camera: Mesh6HBrowserCameraHandleV1;
  readonly runtime: FR241OnePersonDryRunRuntime;
  readonly frameIntakeRuntime: FR242EphemeralLiveCameraFrameIntakeRuntime;
  readonly executionRuntime: FR243GovernedDryRunExecutionRuntime;
  readonly admission: FR240OnePersonDryRunAdmission;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly metricRuntimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
  readonly qualityRuntimeFactory?: FR247QualityRuntimeFactory;
  readonly jpegEncoder?: FR244BrowserJpegEncoder;
  readonly qualityBindingPreparer?: FR244CaptureQualityBindingPreparer;
  readonly primaryMetricBindingPreparer?: FR244PrimaryMetricBindingPreparer;
}): FR250ChallengeFirstBrowserDryRunCoordinator {
  assertRuntimeBinding(input);
  if (typeof input.geometryMetadataPbtxt !== 'string') {
    fail('geometryMetadataPbtxt is required.');
  }
  if (typeof input.parity !== 'object' || input.parity === null) {
    fail('FR76 parity object is required.');
  }

  const qualityBindingPreparer =
    input.qualityBindingPreparer ?? FR247_CAPTURE_QUALITY_BINDING_PREPARER;
  const primaryMetricBindingPreparer =
    input.primaryMetricBindingPreparer ?? FR246_PRIMARY_METRIC_BINDING_PREPARER;

  let activeSession: FR241OnePersonDryRunSession | undefined;
  let activeCaptureCount = 0;
  let issuedSessionCount = 0;
  let pendingPreparedSlot: FR250PreparedCaptureSlot | undefined;
  const issuedPreparedSlots = new WeakSet<object>();
  const consumedPreparedSlots = new WeakSet<object>();
  const records: FR243DryRunCaptureExecutionRecord[] = [];

  const beginSession = (sessionInput: {
    readonly sessionOrdinal: 1 | 2;
    readonly issuedAt: string;
  }): FR241OnePersonDryRunSession => {
    const expectedOrdinal = (issuedSessionCount + 1) as 1 | 2;
    if (sessionInput.sessionOrdinal !== expectedOrdinal) {
      fail('sessions must be issued exactly in ordinal order 1 then 2.');
    }
    if (pendingPreparedSlot !== undefined) {
      fail('pending prepared capture must be consumed before changing sessions.');
    }
    if (activeSession !== undefined && activeCaptureCount !== 2) {
      fail('active session must record exactly two capture slots before the next session.');
    }
    if (issuedSessionCount >= 2) {
      fail('exactly two sessions are allowed.');
    }
    activeSession = issueOnePersonDryRunSessionFR241(
      input.runtime,
      input.admission,
      sessionInput,
    );
    activeCaptureCount = 0;
    issuedSessionCount += 1;
    return activeSession;
  };

  const prepareCapture = (captureInput: {
    readonly challengeIssuedAt: string;
  }): FR250PreparedCaptureSlot => {
    if (activeSession === undefined) {
      fail('beginSession() is required before prepareCapture().');
    }
    if (pendingPreparedSlot !== undefined) {
      fail('only one prepared capture may be pending at a time.');
    }
    if (activeCaptureCount >= 2) {
      fail('active session already contains its two required capture slots.');
    }
    const captureOrdinal = (activeCaptureCount + 1) as 1 | 2;
    const challenge = issueLiveCaptureChallengeFR241(
      input.runtime,
      activeSession,
      {
        captureOrdinal,
        issuedAt: captureInput.challengeIssuedAt,
      },
    );
    const prepared = Object.freeze({
      schemaVersion: 'fr250-prepared-capture-slot-v1' as const,
      sessionOrdinal: activeSession.sessionOrdinal,
      captureOrdinal,
      challenge,
      challengeMustBePresentedBeforeTrigger: true as const,
      automaticCaptureAllowed: false as const,
    });
    pendingPreparedSlot = prepared;
    issuedPreparedSlots.add(prepared);
    return prepared;
  };

  const capturePrepared = async (
    captureInput: FR250PreparedCaptureInput,
  ): Promise<FR244GovernedBrowserCaptureResult> => {
    if (activeSession === undefined || pendingPreparedSlot === undefined) {
      fail('prepareCapture() is required immediately before capturePrepared().');
    }
    if (
      !issuedPreparedSlots.has(captureInput.preparedSlot)
      || captureInput.preparedSlot !== pendingPreparedSlot
      || consumedPreparedSlots.has(captureInput.preparedSlot)
    ) {
      fail('prepared capture slot was not issued as the active single-use FR250 slot.');
    }
    if (
      captureInput.preparedSlot.sessionOrdinal !== activeSession.sessionOrdinal
      || captureInput.preparedSlot.captureOrdinal !== activeCaptureCount + 1
      || captureInput.preparedSlot.challenge.sessionRef !== activeSession.sessionRef
    ) {
      fail('prepared capture slot/session binding mismatch.');
    }
    if (
      captureInput.operatorQualityObservation.providerRunRef
        !== captureInput.trigger.providerRunRef
      || captureInput.operatorQualityObservation.captureTriggerTimestampMs
        !== captureInput.trigger.timestampMs
    ) {
      fail('operator quality observation must bind the exact explicit browser trigger.');
    }

    consumedPreparedSlots.add(captureInput.preparedSlot);
    pendingPreparedSlot = undefined;

    const result = await executeGovernedBrowserLiveCameraCaptureFR244({
      camera: input.camera,
      trigger: captureInput.trigger,
      runtime: input.executionRuntime,
      frameIntakeRuntime: input.frameIntakeRuntime,
      session: activeSession,
      challenge: captureInput.preparedSlot.challenge,
      qualityBindingPreparer,
      qualityProviderContext: Object.freeze({
        operatorObservation: captureInput.operatorQualityObservation,
        ...(input.qualityRuntimeFactory === undefined
          ? {}
          : { factory: input.qualityRuntimeFactory }),
      }),
      primaryMetricBindingPreparer,
      primaryMetricProviderContext: Object.freeze({
        geometryMetadataPbtxt: input.geometryMetadataPbtxt,
        parity: input.parity,
        ...(input.metricRuntimeFactory === undefined
          ? {}
          : { factory: input.metricRuntimeFactory }),
      }),
      operatorAttestation: captureInput.operatorExecutionAttestation,
      ...(input.jpegEncoder === undefined
        ? {}
        : { jpegEncoder: input.jpegEncoder }),
    });

    records.push(result.fr243Record);
    activeCaptureCount += 1;
    return result;
  };

  const review = (): FR243DryRunMechanicsReview => {
    if (pendingPreparedSlot !== undefined) {
      fail('review cannot run while a prepared capture remains pending.');
    }
    if (issuedSessionCount !== 2 || activeCaptureCount !== 2 || records.length !== 4) {
      fail('review requires two completed sessions and exactly four recorded slots.');
    }
    return reviewGovernedOnePersonDryRunMechanicsFR243(
      input.executionRuntime,
      records,
    );
  };

  const getSanitizedRecords = ():
  readonly FR243DryRunCaptureExecutionRecord[] =>
    Object.freeze([...records]);

  return Object.freeze({
    schemaVersion: 'fr250-challenge-first-browser-dry-run-coordinator-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR250_CONTRACT_VERSION,
    authorityState:
      'challenge_first_browser_dry_run_ready_actual_participant_execution_not_performed_by_materialization' as const,
    participantRef: input.runtime.sourceFR240.participantRef,
    operatorRef: input.runtime.sourceFR240.operatorRef,
    beginSession,
    prepareCapture,
    capturePrepared,
    review,
    getSanitizedRecords,
    authorityBoundary: Object.freeze({
      challengeIssuedBeforeTriggerByApiShape: true as const,
      challengePresentationStillOperatorAttested: true as const,
      actualParticipantActionRequired: true as const,
      actualLiveCameraInputRequired: true as const,
      automaticCaptureAllowed: false as const,
      temporalSeparationIndependentlyVerified: false as const,
      participantIdentityIndependentlyVerified: false as const,
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
