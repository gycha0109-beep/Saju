import { createHash } from 'node:crypto';
import {
  assertResearchLiveCaptureRuntimeFR238,
  type FR238ResearchLiveCaptureRuntime,
} from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR239_CONTRACT_VERSION =
  'FR239-REPEATABILITY-PRECOLLECTION-RETENTION-PRIVACY-POLICY-v1' as const;

export interface FR239PrecollectionRetentionPrivacyPolicy {
  readonly schemaVersion: 'fr239-repeatability-precollection-retention-privacy-policy-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR239_CONTRACT_VERSION;
  readonly authorityState: 'finite_retention_and_privacy_policy_issued_collection_still_blocked';
  readonly sourceFR238: {
    readonly runtimeRef: string;
    readonly runtimeDigest: string;
  };
  readonly rawCapturePolicy: {
    readonly persistenceClass: 'ephemeral_processing_only';
    readonly deleteAfterQualityAndMetricExtraction: true;
    readonly trainingReuseAllowed: false;
    readonly productionReuseAllowed: false;
  };
  readonly reviewImagePolicy: {
    readonly artifactClass: 'sanitized_research_review_image';
    readonly maxRetentionDays: 30;
    readonly deleteEarlierWhenQualityReviewAndAuditComplete: true;
    readonly embeddedMetadataSanitizationRequired: true;
    readonly assignedResearchOperatorAccessAllowed: true;
    readonly assignedAuditorAccessAllowed: true;
    readonly generalProductAccessAllowed: false;
    readonly trainingReuseAllowed: false;
  };
  readonly identityPolicy: {
    readonly pseudonymousParticipantRefRequired: true;
    readonly realNameInMeasurementDatasetAllowed: false;
    readonly biometricIdentityMatchingAllowed: false;
    readonly faceEmbeddingAllowed: false;
    readonly identityTemplateAllowed: false;
  };
  readonly deletionEvidence: {
    readonly deletionEventRecordRequired: true;
    readonly deletedArtifactRefRequired: true;
    readonly deletionReasonRequired: true;
    readonly rawImageBytesInDeletionRecordAllowed: false;
  };
  readonly precollectionGate: {
    readonly finiteRetentionPolicyIssued: true;
    readonly privacyPolicyIssued: true;
    readonly participantConsentProtocolIssued: false;
    readonly realParticipantCollectionAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly policyIssuanceMeansDeletionExecuted: false;
    readonly policyIssuanceMeansConsentObtained: false;
    readonly participantDataCollectedByThisArtifact: false;
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
  readonly nextAction: 'issue_participant_consent_and_real_collection_admission_gate_before_dry_run';
  readonly policyDigest: string;
  readonly policyRef: string;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-239 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('policy cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('policy cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('policy must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

export function issuePrecollectionRetentionPrivacyPolicyFR239(
  runtime: FR238ResearchLiveCaptureRuntime,
): FR239PrecollectionRetentionPrivacyPolicy {
  assertResearchLiveCaptureRuntimeFR238(runtime);

  const core = {
    contractVersion: FR239_CONTRACT_VERSION,
    sourceFR238: {
      runtimeRef: runtime.runtimeRef,
      runtimeDigest: runtime.runtimeDigest,
    },
    rawCapturePolicy: {
      persistenceClass: 'ephemeral_processing_only' as const,
      deleteAfterQualityAndMetricExtraction: true as const,
      trainingReuseAllowed: false as const,
      productionReuseAllowed: false as const,
    },
    reviewImagePolicy: {
      artifactClass: 'sanitized_research_review_image' as const,
      maxRetentionDays: 30 as const,
      deleteEarlierWhenQualityReviewAndAuditComplete: true as const,
      embeddedMetadataSanitizationRequired: true as const,
      assignedResearchOperatorAccessAllowed: true as const,
      assignedAuditorAccessAllowed: true as const,
      generalProductAccessAllowed: false as const,
      trainingReuseAllowed: false as const,
    },
    identityPolicy: {
      pseudonymousParticipantRefRequired: true as const,
      realNameInMeasurementDatasetAllowed: false as const,
      biometricIdentityMatchingAllowed: false as const,
      faceEmbeddingAllowed: false as const,
      identityTemplateAllowed: false as const,
    },
    deletionEvidence: {
      deletionEventRecordRequired: true as const,
      deletedArtifactRefRequired: true as const,
      deletionReasonRequired: true as const,
      rawImageBytesInDeletionRecordAllowed: false as const,
    },
    precollectionGate: {
      finiteRetentionPolicyIssued: true as const,
      privacyPolicyIssued: true as const,
      participantConsentProtocolIssued: false as const,
      realParticipantCollectionAuthorized: false as const,
    },
    authorityBoundary: {
      policyIssuanceMeansDeletionExecuted: false as const,
      policyIssuanceMeansConsentObtained: false as const,
      participantDataCollectedByThisArtifact: false as const,
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
      'issue_participant_consent_and_real_collection_admission_gate_before_dry_run' as const,
  };

  const policyDigest = sha256(canonicalJson(core));
  const result: FR239PrecollectionRetentionPrivacyPolicy = Object.freeze({
    schemaVersion: 'fr239-repeatability-precollection-retention-privacy-policy-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'finite_retention_and_privacy_policy_issued_collection_still_blocked' as const,
    ...core,
    policyDigest,
    policyRef:
      `policy.fr239.repeatability_precollection_privacy:${policyDigest.slice('sha256:'.length)}`,
  });
  ISSUED.add(result);
  return result;
}

export function assertPrecollectionRetentionPrivacyPolicyFR239(
  policy: FR239PrecollectionRetentionPrivacyPolicy,
): void {
  if (!ISSUED.has(policy)) fail('policy was not issued by the active FR239 runtime.');
  if (
    policy.contractVersion !== FR239_CONTRACT_VERSION
    || policy.rawCapturePolicy.persistenceClass !== 'ephemeral_processing_only'
    || policy.rawCapturePolicy.deleteAfterQualityAndMetricExtraction !== true
    || policy.reviewImagePolicy.maxRetentionDays !== 30
    || policy.reviewImagePolicy.deleteEarlierWhenQualityReviewAndAuditComplete !== true
    || policy.reviewImagePolicy.trainingReuseAllowed !== false
    || policy.identityPolicy.biometricIdentityMatchingAllowed !== false
    || policy.identityPolicy.faceEmbeddingAllowed !== false
    || policy.precollectionGate.finiteRetentionPolicyIssued !== true
    || policy.precollectionGate.participantConsentProtocolIssued !== false
    || policy.precollectionGate.realParticipantCollectionAuthorized !== false
    || policy.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || policy.authorityBoundary.interpretationValidityEstablished !== false
    || policy.authorityBoundary.traditionalBindingIssued !== false
  ) fail('FR239 policy authority boundary drift.');
}
