import {
  portableSha256RefFR248,
  secureRandomHexFR248,
} from './observable-morphology-browser-portable-crypto-fr248.js';
import {
  assertResearchLiveCaptureRuntimeFR238,
  type FR238ResearchLiveCaptureRuntime,
} from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import {
  assertOnePersonDryRunAdmissionFR240,
  assertParticipantConsentProtocolFR240,
  type FR240OnePersonDryRunAdmission,
  type FR240ParticipantConsentProtocol,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR241_CONTRACT_VERSION =
  'FR241-ONE-PERSON-DRY-RUN-EXECUTION-RUNTIME-v1' as const;

export interface FR241OnePersonDryRunRuntime {
  readonly schemaVersion: 'fr241-one-person-dry-run-execution-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR241_CONTRACT_VERSION;
  readonly authorityState:
    'one_person_dry_run_session_and_challenge_issuance_enabled_raw_media_ingress_blocked';
  readonly sourceFR238: {
    readonly runtimeRef: string;
    readonly runtimeDigest: string;
  };
  readonly sourceFR240: {
    readonly protocolRef: string;
    readonly protocolDigest: string;
    readonly admissionRef: string;
    readonly admissionDigest: string;
    readonly participantRef: string;
    readonly operatorRef: string;
  };
  readonly dryRunScope: {
    readonly purpose: 'one_person_research_dry_run';
    readonly participantCount: 1;
    readonly partition: 'selection';
    readonly maximumSessions: 2;
    readonly maximumAcceptedCapturesPerSession: 2;
    readonly liveCameraOnly: true;
    readonly empiricalEvidenceEligible: false;
    readonly confirmatoryEvidenceEligible: false;
  };
  readonly executionCapabilities: {
    readonly realParticipantSessionIssuanceEnabled: true;
    readonly liveCaptureChallengeIssuanceEnabled: true;
    readonly rawMediaByteIngressEnabled: false;
    readonly captureQualityExecutionEnabled: false;
    readonly metricExtractionEnabled: false;
    readonly reviewImagePersistenceEnabled: false;
    readonly deletionEvidenceExecutionEnabled: false;
  };
  readonly authorityBoundary: {
    readonly admissionConsumptionMechanicallyVerified: true;
    readonly consentIndependentlyVerified: false;
    readonly participantIdentityIndependentlyVerified: false;
    readonly legalConsentSufficiencyEstablished: false;
    readonly participantCaptureExecutedByThisArtifact: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly primaryMetricExtractedFromParticipantMedia: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextAction:
    'implement_ephemeral_live_camera_frame_intake_for_fr241_challenges_before_first_dry_run_execution';
  readonly runtimeDigest: string;
  readonly runtimeRef: string;
}

export interface FR241OnePersonDryRunSession {
  readonly schemaVersion: 'fr241-one-person-dry-run-session-v1';
  readonly runtimeRef: string;
  readonly admissionRef: string;
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly partition: 'selection';
  readonly sessionOrdinal: 1 | 2;
  readonly sessionNonce: string;
  readonly issuedAt: string;
  readonly realParticipantSessionAuthorized: true;
  readonly rawMediaByteIngressEnabled: false;
  readonly empiricalEvidenceEligible: false;
  readonly confirmatoryEvidenceEligible: false;
  readonly temporalSeparationIndependentlyVerified: false;
  readonly sessionRef: string;
}

export interface FR241LiveCaptureChallenge {
  readonly schemaVersion: 'fr241-live-capture-challenge-v1';
  readonly runtimeRef: string;
  readonly admissionRef: string;
  readonly sessionRef: string;
  readonly participantRef: string;
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly captureNonce: string;
  readonly issuedAt: string;
  readonly requiredSource: 'live_camera';
  readonly galleryUploadAllowed: false;
  readonly retrospectiveCaptureAllowed: false;
  readonly rawMediaByteIngressEnabled: false;
  readonly qualityDecisionBeforeMetricInspection: true;
  readonly empiricalEvidenceEligible: false;
  readonly confirmatoryEvidenceEligible: false;
  readonly captureChallengeRef: string;
}

const ISSUED_RUNTIMES = new WeakSet<object>();
const ISSUED_SESSIONS = new WeakSet<object>();
const ISSUED_CHALLENGES = new WeakSet<object>();
const ISSUED_SESSION_ORDINALS = new WeakMap<object, Set<number>>();
const ISSUED_CAPTURE_ORDINALS = new WeakMap<object, Set<number>>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-241 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('artifact cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('artifact cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('artifact must be JSON-compatible.');
}

function sha256(value: string): string {
  return portableSha256RefFR248(value);
}

function nonce(): string {
  return secureRandomHexFR248(24);
}

function assertIsoTimestamp(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('issuedAt must be an exact ISO-8601 UTC timestamp.');
  }
}

export function materializeOnePersonDryRunRuntimeFR241(input: {
  readonly runtime: FR238ResearchLiveCaptureRuntime;
  readonly protocol: FR240ParticipantConsentProtocol;
  readonly admission: FR240OnePersonDryRunAdmission;
}): FR241OnePersonDryRunRuntime {
  assertResearchLiveCaptureRuntimeFR238(input.runtime);
  assertParticipantConsentProtocolFR240(input.protocol);
  assertOnePersonDryRunAdmissionFR240(input.admission);

  if (
    input.protocol.sourceFR238.runtimeRef !== input.runtime.runtimeRef
    || input.protocol.sourceFR238.runtimeDigest !== input.runtime.runtimeDigest
  ) {
    fail('FR240 protocol must bind the exact active FR238 runtime.');
  }
  if (
    input.admission.protocolRef !== input.protocol.protocolRef
    || input.admission.protocolDigest !== input.protocol.protocolDigest
  ) {
    fail('FR240 admission must bind the exact active FR240 protocol.');
  }
  if (
    input.admission.scope.participantCount !== 1
    || input.admission.scope.partition !== 'selection'
    || input.admission.scope.maximumSessions !== 2
    || input.admission.scope.maximumAcceptedCapturesPerSession !== 2
    || input.admission.scope.requiredCaptureSource !== 'live_camera'
    || input.admission.scope.empiricalEvidenceEligible !== false
    || input.admission.scope.confirmatoryEvidenceEligible !== false
    || input.admission.executionGate.currentFR238RealParticipantExecutionEnabled !== false
    || input.admission.executionGate.runtimeExtensionStillRequired !== true
    || input.admission.executionGate.actualCollectionExecutedByThisArtifact !== false
  ) {
    fail('FR240 admission drifted from the one-person dry-run boundary.');
  }

  const core = {
    contractVersion: FR241_CONTRACT_VERSION,
    sourceFR238: {
      runtimeRef: input.runtime.runtimeRef,
      runtimeDigest: input.runtime.runtimeDigest,
    },
    sourceFR240: {
      protocolRef: input.protocol.protocolRef,
      protocolDigest: input.protocol.protocolDigest,
      admissionRef: input.admission.admissionRef,
      admissionDigest: input.admission.admissionDigest,
      participantRef: input.admission.participantRef,
      operatorRef: input.admission.operatorRef,
    },
    dryRunScope: {
      purpose: 'one_person_research_dry_run' as const,
      participantCount: 1 as const,
      partition: 'selection' as const,
      maximumSessions: 2 as const,
      maximumAcceptedCapturesPerSession: 2 as const,
      liveCameraOnly: true as const,
      empiricalEvidenceEligible: false as const,
      confirmatoryEvidenceEligible: false as const,
    },
    executionCapabilities: {
      realParticipantSessionIssuanceEnabled: true as const,
      liveCaptureChallengeIssuanceEnabled: true as const,
      rawMediaByteIngressEnabled: false as const,
      captureQualityExecutionEnabled: false as const,
      metricExtractionEnabled: false as const,
      reviewImagePersistenceEnabled: false as const,
      deletionEvidenceExecutionEnabled: false as const,
    },
    authorityBoundary: {
      admissionConsumptionMechanicallyVerified: true as const,
      consentIndependentlyVerified: false as const,
      participantIdentityIndependentlyVerified: false as const,
      legalConsentSufficiencyEstablished: false as const,
      participantCaptureExecutedByThisArtifact: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      primaryMetricExtractedFromParticipantMedia: false as const,
      empiricalRepeatabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      interpretationValidityEstablished: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    },
    nextAction:
      'implement_ephemeral_live_camera_frame_intake_for_fr241_challenges_before_first_dry_run_execution' as const,
  };

  const runtimeDigest = sha256(canonicalJson(core));
  const result: FR241OnePersonDryRunRuntime = Object.freeze({
    schemaVersion: 'fr241-one-person-dry-run-execution-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState:
      'one_person_dry_run_session_and_challenge_issuance_enabled_raw_media_ingress_blocked' as const,
    ...core,
    runtimeDigest,
    runtimeRef:
      `runtime.fr241.one_person_dry_run:${runtimeDigest.slice('sha256:'.length)}`,
  });
  ISSUED_RUNTIMES.add(result);
  return result;
}

export function assertOnePersonDryRunRuntimeFR241(
  runtime: FR241OnePersonDryRunRuntime,
): void {
  if (!ISSUED_RUNTIMES.has(runtime)) fail('runtime was not issued by the active FR241 runtime.');
  if (
    runtime.contractVersion !== FR241_CONTRACT_VERSION
    || runtime.dryRunScope.participantCount !== 1
    || runtime.dryRunScope.partition !== 'selection'
    || runtime.executionCapabilities.realParticipantSessionIssuanceEnabled !== true
    || runtime.executionCapabilities.liveCaptureChallengeIssuanceEnabled !== true
    || runtime.executionCapabilities.rawMediaByteIngressEnabled !== false
    || runtime.executionCapabilities.metricExtractionEnabled !== false
    || runtime.authorityBoundary.participantCaptureExecutedByThisArtifact !== false
    || runtime.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || runtime.authorityBoundary.interpretationValidityEstablished !== false
    || runtime.authorityBoundary.traditionalBindingIssued !== false
  ) {
    fail('FR241 runtime authority boundary drift.');
  }
}

export function issueOnePersonDryRunSessionFR241(
  runtime: FR241OnePersonDryRunRuntime,
  admission: FR240OnePersonDryRunAdmission,
  input: {
    readonly sessionOrdinal: 1 | 2;
    readonly issuedAt: string;
  },
): FR241OnePersonDryRunSession {
  assertOnePersonDryRunRuntimeFR241(runtime);
  assertOnePersonDryRunAdmissionFR240(admission);

  if (
    admission.admissionRef !== runtime.sourceFR240.admissionRef
    || admission.admissionDigest !== runtime.sourceFR240.admissionDigest
    || admission.participantRef !== runtime.sourceFR240.participantRef
    || admission.operatorRef !== runtime.sourceFR240.operatorRef
  ) {
    fail('admission/runtime binding mismatch.');
  }
  assertIsoTimestamp(input.issuedAt);

  const issuedOrdinals = ISSUED_SESSION_ORDINALS.get(admission) ?? new Set<number>();
  if (input.sessionOrdinal === 2 && !issuedOrdinals.has(1)) {
    fail('session 2 cannot be issued before session 1.');
  }
  if (issuedOrdinals.has(input.sessionOrdinal)) {
    fail('session ordinal has already been issued for this admission.');
  }

  const sessionNonce = nonce();
  const core = {
    runtimeRef: runtime.runtimeRef,
    admissionRef: admission.admissionRef,
    participantRef: admission.participantRef,
    operatorRef: admission.operatorRef,
    partition: 'selection' as const,
    sessionOrdinal: input.sessionOrdinal,
    sessionNonce,
    issuedAt: input.issuedAt,
    realParticipantSessionAuthorized: true as const,
    rawMediaByteIngressEnabled: false as const,
    empiricalEvidenceEligible: false as const,
    confirmatoryEvidenceEligible: false as const,
    temporalSeparationIndependentlyVerified: false as const,
  };
  const sessionRef =
    `session.fr241.one_person_dry_run:${sha256(canonicalJson(core)).slice('sha256:'.length)}`;
  const result: FR241OnePersonDryRunSession = Object.freeze({
    schemaVersion: 'fr241-one-person-dry-run-session-v1' as const,
    ...core,
    sessionRef,
  });

  issuedOrdinals.add(input.sessionOrdinal);
  ISSUED_SESSION_ORDINALS.set(admission, issuedOrdinals);
  ISSUED_SESSIONS.add(result);
  return result;
}

export function assertOnePersonDryRunSessionFR241(
  session: FR241OnePersonDryRunSession,
): void {
  if (!ISSUED_SESSIONS.has(session)) fail('session was not issued by the active FR241 runtime.');
  if (
    session.partition !== 'selection'
    || session.realParticipantSessionAuthorized !== true
    || session.rawMediaByteIngressEnabled !== false
    || session.empiricalEvidenceEligible !== false
    || session.confirmatoryEvidenceEligible !== false
    || session.temporalSeparationIndependentlyVerified !== false
  ) {
    fail('FR241 session authority boundary drift.');
  }
}

export function issueLiveCaptureChallengeFR241(
  runtime: FR241OnePersonDryRunRuntime,
  session: FR241OnePersonDryRunSession,
  input: {
    readonly captureOrdinal: 1 | 2;
    readonly issuedAt: string;
  },
): FR241LiveCaptureChallenge {
  assertOnePersonDryRunRuntimeFR241(runtime);
  assertOnePersonDryRunSessionFR241(session);

  if (
    session.runtimeRef !== runtime.runtimeRef
    || session.admissionRef !== runtime.sourceFR240.admissionRef
    || session.participantRef !== runtime.sourceFR240.participantRef
  ) {
    fail('session/runtime binding mismatch.');
  }
  assertIsoTimestamp(input.issuedAt);

  const issuedOrdinals = ISSUED_CAPTURE_ORDINALS.get(session) ?? new Set<number>();
  if (input.captureOrdinal === 2 && !issuedOrdinals.has(1)) {
    fail('capture 2 cannot be issued before capture 1.');
  }
  if (issuedOrdinals.has(input.captureOrdinal)) {
    fail('capture ordinal has already been issued for this session.');
  }

  const captureNonce = nonce();
  const core = {
    runtimeRef: runtime.runtimeRef,
    admissionRef: session.admissionRef,
    sessionRef: session.sessionRef,
    participantRef: session.participantRef,
    sessionOrdinal: session.sessionOrdinal,
    captureOrdinal: input.captureOrdinal,
    captureNonce,
    issuedAt: input.issuedAt,
    requiredSource: 'live_camera' as const,
    galleryUploadAllowed: false as const,
    retrospectiveCaptureAllowed: false as const,
    rawMediaByteIngressEnabled: false as const,
    qualityDecisionBeforeMetricInspection: true as const,
    empiricalEvidenceEligible: false as const,
    confirmatoryEvidenceEligible: false as const,
  };
  const captureChallengeRef =
    `challenge.fr241.live_camera:${sha256(canonicalJson(core)).slice('sha256:'.length)}`;
  const result: FR241LiveCaptureChallenge = Object.freeze({
    schemaVersion: 'fr241-live-capture-challenge-v1' as const,
    ...core,
    captureChallengeRef,
  });

  issuedOrdinals.add(input.captureOrdinal);
  ISSUED_CAPTURE_ORDINALS.set(session, issuedOrdinals);
  ISSUED_CHALLENGES.add(result);
  return result;
}

export function assertLiveCaptureChallengeFR241(
  challenge: FR241LiveCaptureChallenge,
): void {
  if (!ISSUED_CHALLENGES.has(challenge)) {
    fail('capture challenge was not issued by the active FR241 runtime.');
  }
  if (
    challenge.requiredSource !== 'live_camera'
    || challenge.galleryUploadAllowed !== false
    || challenge.retrospectiveCaptureAllowed !== false
    || challenge.rawMediaByteIngressEnabled !== false
    || challenge.qualityDecisionBeforeMetricInspection !== true
    || challenge.empiricalEvidenceEligible !== false
    || challenge.confirmatoryEvidenceEligible !== false
  ) {
    fail('FR241 capture-challenge authority boundary drift.');
  }
}
