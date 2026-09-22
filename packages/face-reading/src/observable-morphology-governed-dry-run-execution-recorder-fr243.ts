import {
  assertLiveCaptureChallengeFR241,
  assertOnePersonDryRunRuntimeFR241,
  assertOnePersonDryRunSessionFR241,
  type FR241LiveCaptureChallenge,
  type FR241OnePersonDryRunRuntime,
  type FR241OnePersonDryRunSession,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import {
  assertEphemeralLiveCameraFrameIntakeRuntimeFR242,
  processEphemeralLiveCameraFrameFR242,
  type FR242CaptureQualityAssessment,
  type FR242EphemeralLiveCameraFrameIntakeRuntime,
  type FR242PrimaryMetricExtraction,
  type FR242QualityRejectionReason,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR243_CONTRACT_VERSION =
  'FR243-GOVERNED-ONE-PERSON-DRY-RUN-EXECUTION-RECORDER-v1' as const;

export interface FR243GovernedDryRunExecutionRuntime {
  readonly schemaVersion: 'fr243-governed-dry-run-execution-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR243_CONTRACT_VERSION;
  readonly authorityState:
    'operator_attested_real_execution_recording_enabled_independent_verification_absent';
  readonly sourceFR241: {
    readonly runtimeRef: string;
    readonly admissionRef: string;
    readonly participantRef: string;
    readonly operatorRef: string;
  };
  readonly sourceFR242: {
    readonly runtimeRef: string;
    readonly policyRef: string;
    readonly policyDigest: string;
  };
  readonly executionContract: {
    readonly requiredSource: 'live_camera';
    readonly operatorAttestationRequired: true;
    readonly consentReconfirmationRequired: true;
    readonly challengePresentationRequired: true;
    readonly duplicateChallengeExecutionAllowed: false;
    readonly rawBytesPersisted: false;
    readonly rawImageDigestPersisted: false;
    readonly reviewImagePersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly empiricalEvidenceEligible: false;
    readonly confirmatoryEvidenceEligible: false;
  };
  readonly authorityBoundary: {
    readonly operatorAttestationIsIndependentVerification: false;
    readonly consentIndependentlyVerified: false;
    readonly participantIdentityIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly runtimeRef: string;
}

export interface FR243OperatorExecutionAttestation {
  readonly schemaVersion: 'fr243-operator-execution-attestation-v1';
  readonly operatorRef: string;
  readonly recordedAt: string;
  readonly participantPresentObserved: true;
  readonly liveCameraCaptureObserved: true;
  readonly consentReconfirmedImmediatelyBeforeCapture: true;
  readonly challengePresentedBeforeCapture: true;
}

export interface FR243DryRunCaptureExecutionRecord {
  readonly schemaVersion: 'fr243-dry-run-capture-execution-record-v1';
  readonly runtimeRef: string;
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly sessionRef: string;
  readonly challengeRef: string;
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly challengeIssuedAt: string;
  readonly operatorAttestation: FR243OperatorExecutionAttestation;
  readonly resultStatus: 'rejected' | 'accepted_for_dry_run_mechanics_only';
  readonly observedByteLength: number;
  readonly qualityAssessment: FR242CaptureQualityAssessment;
  readonly rejectionReasons: readonly FR242QualityRejectionReason[];
  readonly primaryMetric: FR242PrimaryMetricExtraction | null;
  readonly metricExtractorInvoked: boolean;
  readonly workingBufferZeroizedAfterProcessing: true;
  readonly rawBytesPersisted: false;
  readonly rawImageDigestPersisted: false;
  readonly reviewImagePersisted: false;
  readonly faceEmbeddingPersisted: false;
  readonly identityTemplatePersisted: false;
  readonly operatorAttestedRealParticipantExecution: true;
  readonly independentRealParticipantExecutionVerification: false;
  readonly empiricalEvidenceEligible: false;
  readonly confirmatoryEvidenceEligible: false;
}

export interface FR243DryRunMechanicsReview {
  readonly schemaVersion: 'fr243-dry-run-mechanics-review-v1';
  readonly runtimeRef: string;
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly requiredSlotCount: 4;
  readonly recordedSlotCount: 4;
  readonly acceptedCaptureCount: number;
  readonly rejectedCaptureCount: number;
  readonly mechanicsReviewState:
    | 'four_slot_operator_attested_mechanics_complete'
    | 'four_slot_operator_attested_mechanics_complete_with_rejections';
  readonly acceptedPrimaryMetrics: readonly {
    readonly sessionOrdinal: 1 | 2;
    readonly captureOrdinal: 1 | 2;
    readonly metricRef: FR242PrimaryMetricExtraction['metricRef'];
    readonly unit: 'degree';
    readonly value: number;
  }[];
  readonly actualRealParticipantDryRunOperatorAttested: true;
  readonly actualRealParticipantDryRunIndependentlyVerified: false;
  readonly empiricalEvidenceEligible: false;
  readonly confirmatoryEvidenceEligible: false;
  readonly empiricalRepeatabilityEstablished: false;
  readonly interpretationValidityEstablished: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const ISSUED_RUNTIMES = new WeakSet<object>();
const ISSUED_RECORDS = new WeakSet<object>();
const EXECUTED_CHALLENGES = new WeakMap<object, Set<string>>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-243 ' + message);
}

function assertIsoTimestamp(value: string, label: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail(label + ' must be an exact ISO-8601 UTC timestamp.');
  }
}

function assertOperatorAttestation(
  runtime: FR243GovernedDryRunExecutionRuntime,
  challenge: FR241LiveCaptureChallenge,
  attestation: FR243OperatorExecutionAttestation,
): void {
  if (attestation.schemaVersion !== 'fr243-operator-execution-attestation-v1') {
    fail('operator attestation schemaVersion drift.');
  }
  if (attestation.operatorRef !== runtime.sourceFR241.operatorRef) {
    fail('operator attestation must bind the admitted operatorRef.');
  }
  assertIsoTimestamp(attestation.recordedAt, 'operator attestation recordedAt');
  if (Date.parse(attestation.recordedAt) < Date.parse(challenge.issuedAt)) {
    fail('operator attestation cannot predate the capture challenge.');
  }
  if (
    attestation.participantPresentObserved !== true
    || attestation.liveCameraCaptureObserved !== true
    || attestation.consentReconfirmedImmediatelyBeforeCapture !== true
    || attestation.challengePresentedBeforeCapture !== true
  ) {
    fail('every operator execution attestation must be explicitly true.');
  }
}

export function materializeGovernedDryRunExecutionRuntimeFR243(input: {
  readonly runtime: FR241OnePersonDryRunRuntime;
  readonly frameIntakeRuntime: FR242EphemeralLiveCameraFrameIntakeRuntime;
}): FR243GovernedDryRunExecutionRuntime {
  assertOnePersonDryRunRuntimeFR241(input.runtime);
  assertEphemeralLiveCameraFrameIntakeRuntimeFR242(input.frameIntakeRuntime);

  if (
    input.frameIntakeRuntime.sourceFR241.runtimeRef !== input.runtime.runtimeRef
    || input.frameIntakeRuntime.sourceFR241.admissionRef !== input.runtime.sourceFR240.admissionRef
    || input.frameIntakeRuntime.sourceFR241.participantRef !== input.runtime.sourceFR240.participantRef
  ) {
    fail('FR242 frame-intake runtime must bind the exact active FR241 runtime.');
  }

  const result: FR243GovernedDryRunExecutionRuntime = Object.freeze({
    schemaVersion: 'fr243-governed-dry-run-execution-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR243_CONTRACT_VERSION,
    authorityState:
      'operator_attested_real_execution_recording_enabled_independent_verification_absent' as const,
    sourceFR241: Object.freeze({
      runtimeRef: input.runtime.runtimeRef,
      admissionRef: input.runtime.sourceFR240.admissionRef,
      participantRef: input.runtime.sourceFR240.participantRef,
      operatorRef: input.runtime.sourceFR240.operatorRef,
    }),
    sourceFR242: Object.freeze({
      runtimeRef: input.frameIntakeRuntime.runtimeRef,
      policyRef: input.frameIntakeRuntime.sourceFR239.policyRef,
      policyDigest: input.frameIntakeRuntime.sourceFR239.policyDigest,
    }),
    executionContract: Object.freeze({
      requiredSource: 'live_camera' as const,
      operatorAttestationRequired: true as const,
      consentReconfirmationRequired: true as const,
      challengePresentationRequired: true as const,
      duplicateChallengeExecutionAllowed: false as const,
      rawBytesPersisted: false as const,
      rawImageDigestPersisted: false as const,
      reviewImagePersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      empiricalEvidenceEligible: false as const,
      confirmatoryEvidenceEligible: false as const,
    }),
    authorityBoundary: Object.freeze({
      operatorAttestationIsIndependentVerification: false as const,
      consentIndependentlyVerified: false as const,
      participantIdentityIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      interpretationValidityEstablished: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    runtimeRef:
      'runtime.fr243.governed_dry_run:' +
      input.runtime.runtimeDigest.slice('sha256:'.length) +
      ':' +
      input.frameIntakeRuntime.sourceFR239.policyDigest.slice('sha256:'.length),
  });
  ISSUED_RUNTIMES.add(result);
  return result;
}

export function assertGovernedDryRunExecutionRuntimeFR243(
  runtime: FR243GovernedDryRunExecutionRuntime,
): void {
  if (!ISSUED_RUNTIMES.has(runtime)) {
    fail('runtime was not issued by the active FR243 runtime.');
  }
  if (
    runtime.contractVersion !== FR243_CONTRACT_VERSION
    || runtime.executionContract.requiredSource !== 'live_camera'
    || runtime.executionContract.operatorAttestationRequired !== true
    || runtime.executionContract.duplicateChallengeExecutionAllowed !== false
    || runtime.executionContract.rawBytesPersisted !== false
    || runtime.executionContract.empiricalEvidenceEligible !== false
    || runtime.authorityBoundary.operatorAttestationIsIndependentVerification !== false
    || runtime.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || runtime.authorityBoundary.interpretationValidityEstablished !== false
    || runtime.authorityBoundary.traditionalBindingIssued !== false
  ) {
    fail('FR243 runtime authority boundary drift.');
  }
}

export function executeGovernedDryRunCaptureFR243(
  runtime: FR243GovernedDryRunExecutionRuntime,
  frameIntakeRuntime: FR242EphemeralLiveCameraFrameIntakeRuntime,
  session: FR241OnePersonDryRunSession,
  challenge: FR241LiveCaptureChallenge,
  input: {
    readonly declaredContentLength?: number;
    readonly mediaBytes: Uint8Array;
    readonly qualityEvaluator: (ephemeralBytes: Uint8Array) => FR242CaptureQualityAssessment;
    readonly primaryMetricExtractor: (ephemeralBytes: Uint8Array) => FR242PrimaryMetricExtraction;
    readonly operatorAttestation: FR243OperatorExecutionAttestation;
  },
): FR243DryRunCaptureExecutionRecord {
  assertGovernedDryRunExecutionRuntimeFR243(runtime);
  assertEphemeralLiveCameraFrameIntakeRuntimeFR242(frameIntakeRuntime);
  assertOnePersonDryRunSessionFR241(session);
  assertLiveCaptureChallengeFR241(challenge);

  if (
    frameIntakeRuntime.runtimeRef !== runtime.sourceFR242.runtimeRef
    || session.runtimeRef !== runtime.sourceFR241.runtimeRef
    || session.admissionRef !== runtime.sourceFR241.admissionRef
    || session.participantRef !== runtime.sourceFR241.participantRef
    || session.operatorRef !== runtime.sourceFR241.operatorRef
    || challenge.runtimeRef !== runtime.sourceFR241.runtimeRef
    || challenge.admissionRef !== runtime.sourceFR241.admissionRef
    || challenge.sessionRef !== session.sessionRef
    || challenge.participantRef !== runtime.sourceFR241.participantRef
    || challenge.requiredSource !== 'live_camera'
  ) {
    fail('runtime/session/challenge binding mismatch.');
  }

  assertOperatorAttestation(runtime, challenge, input.operatorAttestation);

  const executed = EXECUTED_CHALLENGES.get(runtime) ?? new Set<string>();
  if (executed.has(challenge.captureChallengeRef)) {
    fail('capture challenge has already been executed by this FR243 runtime.');
  }

  const frameResult = processEphemeralLiveCameraFrameFR242(
    frameIntakeRuntime,
    challenge,
    {
      source: 'live_camera',
      mediaType: 'image/jpeg',
      transportEncoding: 'raw-binary',
      ...(input.declaredContentLength === undefined
        ? {}
        : { declaredContentLength: input.declaredContentLength }),
      mediaBytes: input.mediaBytes,
      qualityEvaluator: input.qualityEvaluator,
      primaryMetricExtractor: input.primaryMetricExtractor,
    },
  );

  const record: FR243DryRunCaptureExecutionRecord = Object.freeze({
    schemaVersion: 'fr243-dry-run-capture-execution-record-v1' as const,
    runtimeRef: runtime.runtimeRef,
    participantRef: runtime.sourceFR241.participantRef,
    operatorRef: runtime.sourceFR241.operatorRef,
    sessionRef: session.sessionRef,
    challengeRef: challenge.captureChallengeRef,
    sessionOrdinal: challenge.sessionOrdinal,
    captureOrdinal: challenge.captureOrdinal,
    challengeIssuedAt: challenge.issuedAt,
    operatorAttestation: Object.freeze({ ...input.operatorAttestation }),
    resultStatus: frameResult.status,
    observedByteLength: frameResult.observedByteLength,
    qualityAssessment: frameResult.qualityAssessment,
    rejectionReasons: frameResult.rejectionReasons,
    primaryMetric: frameResult.primaryMetric,
    metricExtractorInvoked: frameResult.metricExtractorInvoked,
    workingBufferZeroizedAfterProcessing: true as const,
    rawBytesPersisted: false as const,
    rawImageDigestPersisted: false as const,
    reviewImagePersisted: false as const,
    faceEmbeddingPersisted: false as const,
    identityTemplatePersisted: false as const,
    operatorAttestedRealParticipantExecution: true as const,
    independentRealParticipantExecutionVerification: false as const,
    empiricalEvidenceEligible: false as const,
    confirmatoryEvidenceEligible: false as const,
  });

  executed.add(challenge.captureChallengeRef);
  EXECUTED_CHALLENGES.set(runtime, executed);
  ISSUED_RECORDS.add(record);
  return record;
}

export function assertDryRunCaptureExecutionRecordFR243(
  record: FR243DryRunCaptureExecutionRecord,
): void {
  if (!ISSUED_RECORDS.has(record)) {
    fail('capture execution record was not issued by the active FR243 runtime.');
  }
  if (
    record.operatorAttestedRealParticipantExecution !== true
    || record.independentRealParticipantExecutionVerification !== false
    || record.workingBufferZeroizedAfterProcessing !== true
    || record.rawBytesPersisted !== false
    || record.rawImageDigestPersisted !== false
    || record.reviewImagePersisted !== false
    || record.faceEmbeddingPersisted !== false
    || record.identityTemplatePersisted !== false
    || record.empiricalEvidenceEligible !== false
    || record.confirmatoryEvidenceEligible !== false
  ) {
    fail('FR243 capture execution record authority boundary drift.');
  }
}

export function reviewGovernedOnePersonDryRunMechanicsFR243(
  runtime: FR243GovernedDryRunExecutionRuntime,
  records: readonly FR243DryRunCaptureExecutionRecord[],
): FR243DryRunMechanicsReview {
  assertGovernedDryRunExecutionRuntimeFR243(runtime);
  if (records.length !== 4) {
    fail('mechanics review requires exactly four session/capture slots.');
  }

  const requiredSlots = new Set(['1:1', '1:2', '2:1', '2:2']);
  const observedSlots = new Set<string>();

  for (const record of records) {
    assertDryRunCaptureExecutionRecordFR243(record);
    if (
      record.runtimeRef !== runtime.runtimeRef
      || record.participantRef !== runtime.sourceFR241.participantRef
      || record.operatorRef !== runtime.sourceFR241.operatorRef
    ) {
      fail('capture execution record does not bind the exact FR243 runtime.');
    }
    const slot = String(record.sessionOrdinal) + ':' + String(record.captureOrdinal);
    if (!requiredSlots.has(slot)) fail('capture execution record contains an unauthorized slot.');
    if (observedSlots.has(slot)) fail('mechanics review contains a duplicate slot.');
    observedSlots.add(slot);
  }

  if (observedSlots.size !== requiredSlots.size) {
    fail('mechanics review is missing one or more required slots.');
  }

  const accepted = records.filter(
    (record) => record.resultStatus === 'accepted_for_dry_run_mechanics_only',
  );
  const rejected = records.length - accepted.length;
  const acceptedPrimaryMetrics = accepted.map((record) => {
    if (record.primaryMetric === null) {
      fail('accepted capture execution record must carry the frozen primary metric.');
    }
    return Object.freeze({
      sessionOrdinal: record.sessionOrdinal,
      captureOrdinal: record.captureOrdinal,
      metricRef: record.primaryMetric.metricRef,
      unit: record.primaryMetric.unit,
      value: record.primaryMetric.value,
    });
  });

  return Object.freeze({
    schemaVersion: 'fr243-dry-run-mechanics-review-v1' as const,
    runtimeRef: runtime.runtimeRef,
    participantRef: runtime.sourceFR241.participantRef,
    operatorRef: runtime.sourceFR241.operatorRef,
    requiredSlotCount: 4 as const,
    recordedSlotCount: 4 as const,
    acceptedCaptureCount: accepted.length,
    rejectedCaptureCount: rejected,
    mechanicsReviewState: rejected === 0
      ? 'four_slot_operator_attested_mechanics_complete' as const
      : 'four_slot_operator_attested_mechanics_complete_with_rejections' as const,
    acceptedPrimaryMetrics: Object.freeze(acceptedPrimaryMetrics),
    actualRealParticipantDryRunOperatorAttested: true as const,
    actualRealParticipantDryRunIndependentlyVerified: false as const,
    empiricalEvidenceEligible: false as const,
    confirmatoryEvidenceEligible: false as const,
    empiricalRepeatabilityEstablished: false as const,
    interpretationValidityEstablished: false as const,
    traditionalBindingIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });
}
