import { createHash, randomBytes } from 'node:crypto';
import {
  assertObservableMorphologyRepeatabilityStudyFR237,
  type FR237RepeatabilityStudyPreregistration,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR238_CONTRACT_VERSION =
  'FR238-RESEARCH-LIVE-CAPTURE-SESSION-RUNTIME-v1' as const;

export interface FR238ResearchLiveCaptureRuntime {
  readonly schemaVersion: 'fr238-research-live-capture-session-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR238_CONTRACT_VERSION;
  readonly authorityState: 'live_capture_session_mechanics_ready_real_collection_blocked';
  readonly sourceFR237: {
    readonly protocolRef: string;
    readonly protocolDigest: string;
  };
  readonly sessionContract: {
    readonly sessionOrdinals: readonly [1, 2];
    readonly partitionValues: readonly ['selection', 'holdout'];
    readonly serverGeneratedSessionNonce: true;
    readonly serverTimestampRequired: true;
    readonly temporallySeparatedSessionsRequired: true;
    readonly participantLevelPartitionOwnershipRequired: true;
  };
  readonly captureContract: {
    readonly acceptedCaptureOrdinalsPerSession: readonly [1, 2];
    readonly serverGeneratedCaptureNonce: true;
    readonly liveCameraOnly: true;
    readonly galleryUploadAllowed: false;
    readonly retrospectiveDevelopmentCaptureAllowed: false;
    readonly qualityDecisionBeforeMetricInspection: true;
  };
  readonly privacyAndIdentity: {
    readonly pseudonymousParticipantRefRequiredForFutureCollection: true;
    readonly biometricIdentityMatchingPerformed: false;
    readonly faceEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
    readonly rawMediaPersistedByThisRuntimeArtifact: false;
  };
  readonly executionGate: {
    readonly mechanicsOnlySyntheticSessionIssuanceEnabled: true;
    readonly realParticipantSessionIssuanceEnabled: false;
    readonly realCaptureAdmissionEnabled: false;
    readonly finiteRetentionPolicyRequiredBeforeRealCollection: true;
  };
  readonly authorityBoundary: {
    readonly realParticipantDataCollectedByThisArtifact: false;
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
  readonly nextAction: 'issue_finite_review_image_retention_and_precollection_privacy_policy';
  readonly runtimeDigest: string;
  readonly runtimeRef: string;
}

export interface FR238MechanicsOnlySession {
  readonly schemaVersion: 'fr238-mechanics-only-session-v1';
  readonly runtimeRef: string;
  readonly syntheticParticipantRef: string;
  readonly partition: 'selection' | 'holdout';
  readonly sessionOrdinal: 1 | 2;
  readonly sessionNonce: string;
  readonly issuedAt: string;
  readonly mechanicsOnly: true;
  readonly empiricalEvidenceEligible: false;
  readonly realParticipantUseAuthorized: false;
  readonly sessionRef: string;
}

export interface FR238MechanicsOnlyCaptureChallenge {
  readonly schemaVersion: 'fr238-mechanics-only-capture-challenge-v1';
  readonly runtimeRef: string;
  readonly sessionRef: string;
  readonly captureOrdinal: 1 | 2;
  readonly captureNonce: string;
  readonly issuedAt: string;
  readonly requiredSource: 'live_camera';
  readonly galleryUploadAllowed: false;
  readonly qualityDecisionBeforeMetricInspection: true;
  readonly mechanicsOnly: true;
  readonly empiricalEvidenceEligible: false;
  readonly captureChallengeRef: string;
}

const ISSUED_RUNTIMES = new WeakSet<object>();
const ISSUED_SESSIONS = new WeakSet<object>();
const ISSUED_CHALLENGES = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-238 ${message}`);
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
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function nonce(): string {
  return randomBytes(24).toString('hex');
}

function assertIsoTimestamp(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('issuedAt must be an exact ISO-8601 UTC timestamp.');
  }
}

export function materializeResearchLiveCaptureRuntimeFR238(
  protocol: FR237RepeatabilityStudyPreregistration,
): FR238ResearchLiveCaptureRuntime {
  assertObservableMorphologyRepeatabilityStudyFR237(protocol);

  const core = {
    contractVersion: FR238_CONTRACT_VERSION,
    sourceFR237: {
      protocolRef: protocol.protocolRef,
      protocolDigest: protocol.protocolDigest,
    },
    sessionContract: {
      sessionOrdinals: [1, 2] as const,
      partitionValues: ['selection', 'holdout'] as const,
      serverGeneratedSessionNonce: true as const,
      serverTimestampRequired: true as const,
      temporallySeparatedSessionsRequired: true as const,
      participantLevelPartitionOwnershipRequired: true as const,
    },
    captureContract: {
      acceptedCaptureOrdinalsPerSession: [1, 2] as const,
      serverGeneratedCaptureNonce: true as const,
      liveCameraOnly: true as const,
      galleryUploadAllowed: false as const,
      retrospectiveDevelopmentCaptureAllowed: false as const,
      qualityDecisionBeforeMetricInspection: true as const,
    },
    privacyAndIdentity: {
      pseudonymousParticipantRefRequiredForFutureCollection: true as const,
      biometricIdentityMatchingPerformed: false as const,
      faceEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
      rawMediaPersistedByThisRuntimeArtifact: false as const,
    },
    executionGate: {
      mechanicsOnlySyntheticSessionIssuanceEnabled: true as const,
      realParticipantSessionIssuanceEnabled: false as const,
      realCaptureAdmissionEnabled: false as const,
      finiteRetentionPolicyRequiredBeforeRealCollection: true as const,
    },
    authorityBoundary: {
      realParticipantDataCollectedByThisArtifact: false as const,
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
    },
    nextAction:
      'issue_finite_review_image_retention_and_precollection_privacy_policy' as const,
  };

  const runtimeDigest = sha256(canonicalJson(core));
  const result: FR238ResearchLiveCaptureRuntime = Object.freeze({
    schemaVersion: 'fr238-research-live-capture-session-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'live_capture_session_mechanics_ready_real_collection_blocked' as const,
    ...core,
    runtimeDigest,
    runtimeRef:
      `runtime.fr238.research_live_capture_session:${runtimeDigest.slice('sha256:'.length)}`,
  });
  ISSUED_RUNTIMES.add(result);
  return result;
}

export function assertResearchLiveCaptureRuntimeFR238(
  runtime: FR238ResearchLiveCaptureRuntime,
): void {
  if (!ISSUED_RUNTIMES.has(runtime)) fail('runtime was not issued by the active FR238 runtime.');
  if (
    runtime.contractVersion !== FR238_CONTRACT_VERSION
    || runtime.captureContract.liveCameraOnly !== true
    || runtime.captureContract.galleryUploadAllowed !== false
    || runtime.executionGate.realParticipantSessionIssuanceEnabled !== false
    || runtime.executionGate.realCaptureAdmissionEnabled !== false
    || runtime.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || runtime.authorityBoundary.interpretationValidityEstablished !== false
    || runtime.authorityBoundary.traditionalBindingIssued !== false
  ) fail('FR238 runtime authority boundary drift.');
}

export function issueMechanicsOnlySessionFR238(
  runtime: FR238ResearchLiveCaptureRuntime,
  input: {
    readonly syntheticParticipantRef: string;
    readonly partition: 'selection' | 'holdout';
    readonly sessionOrdinal: 1 | 2;
    readonly issuedAt: string;
  },
): FR238MechanicsOnlySession {
  assertResearchLiveCaptureRuntimeFR238(runtime);
  if (!input.syntheticParticipantRef.startsWith('synthetic:fr238:')) {
    fail('mechanics-only sessions require a synthetic:fr238: participant ref.');
  }
  assertIsoTimestamp(input.issuedAt);
  const sessionNonce = nonce();
  const sessionRef = `session.fr238.mechanics:${sha256(canonicalJson({
    runtimeRef: runtime.runtimeRef,
    syntheticParticipantRef: input.syntheticParticipantRef,
    partition: input.partition,
    sessionOrdinal: input.sessionOrdinal,
    sessionNonce,
    issuedAt: input.issuedAt,
  })).slice('sha256:'.length)}`;
  const result: FR238MechanicsOnlySession = Object.freeze({
    schemaVersion: 'fr238-mechanics-only-session-v1' as const,
    runtimeRef: runtime.runtimeRef,
    syntheticParticipantRef: input.syntheticParticipantRef,
    partition: input.partition,
    sessionOrdinal: input.sessionOrdinal,
    sessionNonce,
    issuedAt: input.issuedAt,
    mechanicsOnly: true as const,
    empiricalEvidenceEligible: false as const,
    realParticipantUseAuthorized: false as const,
    sessionRef,
  });
  ISSUED_SESSIONS.add(result);
  return result;
}

export function issueMechanicsOnlyCaptureChallengeFR238(
  runtime: FR238ResearchLiveCaptureRuntime,
  session: FR238MechanicsOnlySession,
  input: {
    readonly captureOrdinal: 1 | 2;
    readonly issuedAt: string;
  },
): FR238MechanicsOnlyCaptureChallenge {
  assertResearchLiveCaptureRuntimeFR238(runtime);
  if (!ISSUED_SESSIONS.has(session)) fail('session was not issued by the active FR238 runtime.');
  if (session.runtimeRef !== runtime.runtimeRef) fail('session/runtime binding mismatch.');
  assertIsoTimestamp(input.issuedAt);
  const captureNonce = nonce();
  const captureChallengeRef = `challenge.fr238.mechanics:${sha256(canonicalJson({
    runtimeRef: runtime.runtimeRef,
    sessionRef: session.sessionRef,
    captureOrdinal: input.captureOrdinal,
    captureNonce,
    issuedAt: input.issuedAt,
  })).slice('sha256:'.length)}`;
  const result: FR238MechanicsOnlyCaptureChallenge = Object.freeze({
    schemaVersion: 'fr238-mechanics-only-capture-challenge-v1' as const,
    runtimeRef: runtime.runtimeRef,
    sessionRef: session.sessionRef,
    captureOrdinal: input.captureOrdinal,
    captureNonce,
    issuedAt: input.issuedAt,
    requiredSource: 'live_camera' as const,
    galleryUploadAllowed: false as const,
    qualityDecisionBeforeMetricInspection: true as const,
    mechanicsOnly: true as const,
    empiricalEvidenceEligible: false as const,
    captureChallengeRef,
  });
  ISSUED_CHALLENGES.add(result);
  return result;
}

export function assertMechanicsOnlyCaptureChallengeFR238(
  challenge: FR238MechanicsOnlyCaptureChallenge,
): void {
  if (!ISSUED_CHALLENGES.has(challenge)) {
    fail('capture challenge was not issued by the active FR238 runtime.');
  }
  if (
    challenge.requiredSource !== 'live_camera'
    || challenge.galleryUploadAllowed !== false
    || challenge.mechanicsOnly !== true
    || challenge.empiricalEvidenceEligible !== false
  ) fail('FR238 capture challenge authority boundary drift.');
}
