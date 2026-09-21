import { createHash } from 'node:crypto';
import {
  assertResearchLiveCaptureRuntimeFR238,
  type FR238ResearchLiveCaptureRuntime,
} from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import {
  assertPrecollectionRetentionPrivacyPolicyFR239,
  type FR239PrecollectionRetentionPrivacyPolicy,
} from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR240_CONTRACT_VERSION =
  'FR240-PARTICIPANT-CONSENT-AND-ONE-PERSON-DRY-RUN-ADMISSION-v1' as const;

export interface FR240ParticipantConsentProtocol {
  readonly schemaVersion: 'fr240-participant-consent-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR240_CONTRACT_VERSION;
  readonly authorityState:
    'participant_consent_requirements_frozen_one_person_dry_run_execution_still_blocked';
  readonly sourceFR238: {
    readonly runtimeRef: string;
    readonly runtimeDigest: string;
  };
  readonly sourceFR239: {
    readonly policyRef: string;
    readonly policyDigest: string;
  };
  readonly requiredConsent: {
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
  };
  readonly privacyRequirements: {
    readonly pseudonymousParticipantRefRequired: true;
    readonly realNameStoredByThisArtifact: false;
    readonly emailStoredByThisArtifact: false;
    readonly signatureImageStoredByThisArtifact: false;
    readonly faceEmbeddingStoredByThisArtifact: false;
    readonly identityTemplateStoredByThisArtifact: false;
  };
  readonly dryRunLimits: {
    readonly maximumParticipants: 1;
    readonly requiredPartition: 'selection';
    readonly maximumSessionsPerParticipant: 2;
    readonly maximumAcceptedCapturesPerSession: 2;
    readonly requiredCaptureSource: 'live_camera';
    readonly empiricalEvidenceEligible: false;
    readonly confirmatoryEvidenceEligible: false;
  };
  readonly authorityBoundary: {
    readonly consentIndependentlyVerified: false;
    readonly participantIdentityIndependentlyVerified: false;
    readonly legalConsentSufficiencyEstablished: false;
    readonly realParticipantCollectionExecutedByThisArtifact: false;
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
  readonly nextAction:
    'extend_fr238_runtime_to_consume_fr240_one_person_dry_run_admission_without_empirical_promotion';
  readonly protocolDigest: string;
  readonly protocolRef: string;
}

export interface FR240ParticipantConsentReceipt {
  readonly schemaVersion: 'fr240-participant-consent-receipt-v1';
  readonly protocolRef: string;
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly consentRecordedAt: string;
  readonly confirmations: FR240ParticipantConsentProtocol['requiredConsent'];
  readonly participantIdentityStored: false;
  readonly signatureImageStored: false;
  readonly consentIndependentlyVerified: false;
  readonly legalConsentSufficiencyEstablished: false;
  readonly receiptDigest: string;
  readonly receiptRef: string;
}

export interface FR240OnePersonDryRunAdmission {
  readonly schemaVersion: 'fr240-one-person-dry-run-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly protocolRef: string;
  readonly protocolDigest: string;
  readonly consentReceiptRef: string;
  readonly consentReceiptDigest: string;
  readonly participantRef: string;
  readonly operatorRef: string;
  readonly scope: {
    readonly purpose: 'one_person_research_dry_run';
    readonly participantCount: 1;
    readonly partition: 'selection';
    readonly maximumSessions: 2;
    readonly maximumAcceptedCapturesPerSession: 2;
    readonly requiredCaptureSource: 'live_camera';
    readonly empiricalEvidenceEligible: false;
    readonly confirmatoryEvidenceEligible: false;
  };
  readonly executionGate: {
    readonly consentReceiptPresent: true;
    readonly retentionPrivacyPolicyBound: true;
    readonly liveCaptureRuntimeBound: true;
    readonly currentFR238RealParticipantExecutionEnabled: false;
    readonly runtimeExtensionStillRequired: true;
    readonly actualCollectionExecutedByThisArtifact: false;
  };
  readonly authorityBoundary: FR240ParticipantConsentProtocol['authorityBoundary'];
  readonly nextAction:
    'extend_fr238_runtime_to_consume_fr240_one_person_dry_run_admission_without_empirical_promotion';
  readonly admissionDigest: string;
  readonly admissionRef: string;
}

const ISSUED_PROTOCOLS = new WeakSet<object>();
const ISSUED_RECEIPTS = new WeakSet<object>();
const ISSUED_ADMISSIONS = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-240 ${message}`);
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

function assertExactIsoTimestamp(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('consentRecordedAt must be an exact ISO-8601 UTC timestamp.');
  }
}

function assertOpaqueRef(value: string, prefix: string, label: string): void {
  if (!value.startsWith(prefix) || value.length <= prefix.length) {
    fail(`${label} must use the ${prefix} opaque-ref namespace.`);
  }
  if (/\s/u.test(value)) fail(`${label} must not contain whitespace.`);
}

export function issueParticipantConsentProtocolFR240(input: {
  readonly runtime: FR238ResearchLiveCaptureRuntime;
  readonly policy: FR239PrecollectionRetentionPrivacyPolicy;
}): FR240ParticipantConsentProtocol {
  assertResearchLiveCaptureRuntimeFR238(input.runtime);
  assertPrecollectionRetentionPrivacyPolicyFR239(input.policy);

  if (
    input.policy.sourceFR238.runtimeRef !== input.runtime.runtimeRef
    || input.policy.sourceFR238.runtimeDigest !== input.runtime.runtimeDigest
  ) {
    fail('FR239 policy must bind the exact active FR238 runtime.');
  }
  if (
    input.policy.precollectionGate.finiteRetentionPolicyIssued !== true
    || input.policy.precollectionGate.privacyPolicyIssued !== true
    || input.policy.precollectionGate.participantConsentProtocolIssued !== false
    || input.policy.precollectionGate.realParticipantCollectionAuthorized !== false
    || input.runtime.executionGate.realParticipantSessionIssuanceEnabled !== false
    || input.runtime.executionGate.realCaptureAdmissionEnabled !== false
  ) {
    fail('pre-collection predecessor boundary drift.');
  }

  const authorityBoundary = Object.freeze({
    consentIndependentlyVerified: false as const,
    participantIdentityIndependentlyVerified: false as const,
    legalConsentSufficiencyEstablished: false as const,
    realParticipantCollectionExecutedByThisArtifact: false as const,
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
  });

  const core = {
    contractVersion: FR240_CONTRACT_VERSION,
    sourceFR238: {
      runtimeRef: input.runtime.runtimeRef,
      runtimeDigest: input.runtime.runtimeDigest,
    },
    sourceFR239: {
      policyRef: input.policy.policyRef,
      policyDigest: input.policy.policyDigest,
    },
    requiredConsent: {
      studyNoticeRead: true as const,
      voluntaryParticipationConfirmed: true as const,
      liveCameraCaptureConsent: true as const,
      transientRawCaptureProcessingConsent: true as const,
      sanitizedReviewImageRetentionConsent: true as const,
      pseudonymousMetricStorageConsent: true as const,
      noTrainingReuseAcknowledged: true as const,
      noProductionReuseAcknowledged: true as const,
      noBiometricIdentityMatchingAcknowledged: true as const,
      withdrawalProcedureAcknowledged: true as const,
    },
    privacyRequirements: {
      pseudonymousParticipantRefRequired: true as const,
      realNameStoredByThisArtifact: false as const,
      emailStoredByThisArtifact: false as const,
      signatureImageStoredByThisArtifact: false as const,
      faceEmbeddingStoredByThisArtifact: false as const,
      identityTemplateStoredByThisArtifact: false as const,
    },
    dryRunLimits: {
      maximumParticipants: 1 as const,
      requiredPartition: 'selection' as const,
      maximumSessionsPerParticipant: 2 as const,
      maximumAcceptedCapturesPerSession: 2 as const,
      requiredCaptureSource: 'live_camera' as const,
      empiricalEvidenceEligible: false as const,
      confirmatoryEvidenceEligible: false as const,
    },
    authorityBoundary,
    nextAction:
      'extend_fr238_runtime_to_consume_fr240_one_person_dry_run_admission_without_empirical_promotion' as const,
  };

  const protocolDigest = sha256(canonicalJson(core));
  const result: FR240ParticipantConsentProtocol = Object.freeze({
    schemaVersion: 'fr240-participant-consent-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState:
      'participant_consent_requirements_frozen_one_person_dry_run_execution_still_blocked' as const,
    ...core,
    protocolDigest,
    protocolRef:
      `policy.fr240.participant_consent_protocol:${protocolDigest.slice('sha256:'.length)}`,
  });
  ISSUED_PROTOCOLS.add(result);
  return result;
}

export function assertParticipantConsentProtocolFR240(
  protocol: FR240ParticipantConsentProtocol,
): void {
  if (!ISSUED_PROTOCOLS.has(protocol)) fail('protocol was not issued by the active FR240 runtime.');
  if (
    protocol.contractVersion !== FR240_CONTRACT_VERSION
    || protocol.dryRunLimits.maximumParticipants !== 1
    || protocol.dryRunLimits.requiredPartition !== 'selection'
    || protocol.dryRunLimits.empiricalEvidenceEligible !== false
    || protocol.dryRunLimits.confirmatoryEvidenceEligible !== false
    || protocol.authorityBoundary.consentIndependentlyVerified !== false
    || protocol.authorityBoundary.legalConsentSufficiencyEstablished !== false
    || protocol.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || protocol.authorityBoundary.interpretationValidityEstablished !== false
    || protocol.authorityBoundary.traditionalBindingIssued !== false
  ) {
    fail('FR240 consent-protocol authority boundary drift.');
  }
}

export function recordParticipantConsentFR240(
  protocol: FR240ParticipantConsentProtocol,
  input: {
    readonly participantRef: string;
    readonly operatorRef: string;
    readonly consentRecordedAt: string;
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
  },
): FR240ParticipantConsentReceipt {
  assertParticipantConsentProtocolFR240(protocol);
  assertOpaqueRef(input.participantRef, 'participant:fr240:', 'participantRef');
  assertOpaqueRef(input.operatorRef, 'operator:fr240:', 'operatorRef');
  assertExactIsoTimestamp(input.consentRecordedAt);

  const confirmations = {
    studyNoticeRead: input.studyNoticeRead,
    voluntaryParticipationConfirmed: input.voluntaryParticipationConfirmed,
    liveCameraCaptureConsent: input.liveCameraCaptureConsent,
    transientRawCaptureProcessingConsent: input.transientRawCaptureProcessingConsent,
    sanitizedReviewImageRetentionConsent: input.sanitizedReviewImageRetentionConsent,
    pseudonymousMetricStorageConsent: input.pseudonymousMetricStorageConsent,
    noTrainingReuseAcknowledged: input.noTrainingReuseAcknowledged,
    noProductionReuseAcknowledged: input.noProductionReuseAcknowledged,
    noBiometricIdentityMatchingAcknowledged: input.noBiometricIdentityMatchingAcknowledged,
    withdrawalProcedureAcknowledged: input.withdrawalProcedureAcknowledged,
  } as const;

  if (Object.values(confirmations).some((value) => value !== true)) {
    fail('every FR240 consent confirmation must be explicitly true.');
  }

  const core = {
    protocolRef: protocol.protocolRef,
    participantRef: input.participantRef,
    operatorRef: input.operatorRef,
    consentRecordedAt: input.consentRecordedAt,
    confirmations,
    participantIdentityStored: false as const,
    signatureImageStored: false as const,
    consentIndependentlyVerified: false as const,
    legalConsentSufficiencyEstablished: false as const,
  };
  const receiptDigest = sha256(canonicalJson(core));
  const result: FR240ParticipantConsentReceipt = Object.freeze({
    schemaVersion: 'fr240-participant-consent-receipt-v1' as const,
    ...core,
    receiptDigest,
    receiptRef:
      `evidence.fr240.participant_consent_receipt:${receiptDigest.slice('sha256:'.length)}`,
  });
  ISSUED_RECEIPTS.add(result);
  return result;
}

export function assertParticipantConsentReceiptFR240(
  receipt: FR240ParticipantConsentReceipt,
): void {
  if (!ISSUED_RECEIPTS.has(receipt)) fail('consent receipt was not issued by the active FR240 runtime.');
  if (
    receipt.participantIdentityStored !== false
    || receipt.signatureImageStored !== false
    || receipt.consentIndependentlyVerified !== false
    || receipt.legalConsentSufficiencyEstablished !== false
    || Object.values(receipt.confirmations).some((value) => value !== true)
  ) {
    fail('FR240 consent-receipt authority boundary drift.');
  }
}

export function issueOnePersonDryRunAdmissionFR240(input: {
  readonly protocol: FR240ParticipantConsentProtocol;
  readonly consentReceipt: FR240ParticipantConsentReceipt;
}): FR240OnePersonDryRunAdmission {
  assertParticipantConsentProtocolFR240(input.protocol);
  assertParticipantConsentReceiptFR240(input.consentReceipt);

  if (input.consentReceipt.protocolRef !== input.protocol.protocolRef) {
    fail('consent receipt must bind the exact active FR240 protocol.');
  }

  const core = {
    protocolRef: input.protocol.protocolRef,
    protocolDigest: input.protocol.protocolDigest,
    consentReceiptRef: input.consentReceipt.receiptRef,
    consentReceiptDigest: input.consentReceipt.receiptDigest,
    participantRef: input.consentReceipt.participantRef,
    operatorRef: input.consentReceipt.operatorRef,
    scope: {
      purpose: 'one_person_research_dry_run' as const,
      participantCount: 1 as const,
      partition: 'selection' as const,
      maximumSessions: 2 as const,
      maximumAcceptedCapturesPerSession: 2 as const,
      requiredCaptureSource: 'live_camera' as const,
      empiricalEvidenceEligible: false as const,
      confirmatoryEvidenceEligible: false as const,
    },
    executionGate: {
      consentReceiptPresent: true as const,
      retentionPrivacyPolicyBound: true as const,
      liveCaptureRuntimeBound: true as const,
      currentFR238RealParticipantExecutionEnabled: false as const,
      runtimeExtensionStillRequired: true as const,
      actualCollectionExecutedByThisArtifact: false as const,
    },
    authorityBoundary: input.protocol.authorityBoundary,
    nextAction:
      'extend_fr238_runtime_to_consume_fr240_one_person_dry_run_admission_without_empirical_promotion' as const,
  };
  const admissionDigest = sha256(canonicalJson(core));
  const result: FR240OnePersonDryRunAdmission = Object.freeze({
    schemaVersion: 'fr240-one-person-dry-run-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    ...core,
    admissionDigest,
    admissionRef:
      `admission.fr240.one_person_dry_run:${admissionDigest.slice('sha256:'.length)}`,
  });
  ISSUED_ADMISSIONS.add(result);
  return result;
}

export function assertOnePersonDryRunAdmissionFR240(
  admission: FR240OnePersonDryRunAdmission,
): void {
  if (!ISSUED_ADMISSIONS.has(admission)) fail('admission was not issued by the active FR240 runtime.');
  if (
    admission.scope.participantCount !== 1
    || admission.scope.partition !== 'selection'
    || admission.scope.empiricalEvidenceEligible !== false
    || admission.scope.confirmatoryEvidenceEligible !== false
    || admission.executionGate.currentFR238RealParticipantExecutionEnabled !== false
    || admission.executionGate.runtimeExtensionStillRequired !== true
    || admission.executionGate.actualCollectionExecutedByThisArtifact !== false
    || admission.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || admission.authorityBoundary.interpretationValidityEstablished !== false
    || admission.authorityBoundary.traditionalBindingIssued !== false
  ) {
    fail('FR240 dry-run admission authority boundary drift.');
  }
}
