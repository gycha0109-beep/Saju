import {
  FR239_CONTRACT_VERSION,
} from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  FR240_CONTRACT_VERSION,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import {
  FR241_CONTRACT_VERSION,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import {
  FR312F_PRIVACY_PREREQUISITES,
  FR312F_SAMPLE_DESIGN,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import {
  FR312G_COLLECTION_PREREQUISITES,
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';

export const FR312G1_REVIEW_ID =
  'fr312g1.collection_prerequisite_reuse_review' as const;

export type CollectionPrerequisiteReuseDecisionFR312G1 =
  | 'template_reusable_dedicated_binding_required'
  | 'template_reusable_scope_incompatible'
  | 'dry_run_only_not_empirical_authority';

export interface CollectionPrerequisiteReuseFindingFR312G1 {
  readonly sourceContractVersion: string;
  readonly sourcePurpose:
    | 'retention_privacy'
    | 'participant_consent'
    | 'one_person_dry_run_runtime';
  readonly decision: CollectionPrerequisiteReuseDecisionFR312G1;
  readonly reusableAsTemplate: true;
  readonly directAuthorityReuseAuthorized: false;
  readonly numericPolicyValueInheritedAutomatically: false;
  readonly fr312gExecutionAuthorizedByThisFinding: false;
  readonly rationale: string;
}

export const FR312G1_REUSE_FINDINGS:
readonly CollectionPrerequisiteReuseFindingFR312G1[] = Object.freeze([
  Object.freeze({
    sourceContractVersion: FR239_CONTRACT_VERSION,
    sourcePurpose: 'retention_privacy',
    decision: 'template_reusable_dedicated_binding_required',
    reusableAsTemplate: true,
    directAuthorityReuseAuthorized: false,
    numericPolicyValueInheritedAutomatically: false,
    fr312gExecutionAuthorizedByThisFinding: false,
    rationale:
      'FR239 is bound to the FR238 observable-morphology runtime lineage. Its finite-retention structure may be reused as a template, but its runtime-bound authority and 30-day value do not automatically transfer to FR312G.',
  }),
  Object.freeze({
    sourceContractVersion: FR240_CONTRACT_VERSION,
    sourcePurpose: 'participant_consent',
    decision: 'template_reusable_scope_incompatible',
    reusableAsTemplate: true,
    directAuthorityReuseAuthorized: false,
    numericPolicyValueInheritedAutomatically: false,
    fr312gExecutionAuthorizedByThisFinding: false,
    rationale:
      'FR240 freezes consent requirements for a one-person dry run whose evidence is explicitly empirical-ineligible and whose partition is selection, so its clauses are a template rather than FR312G study consent authority.',
  }),
  Object.freeze({
    sourceContractVersion: FR241_CONTRACT_VERSION,
    sourcePurpose: 'one_person_dry_run_runtime',
    decision: 'dry_run_only_not_empirical_authority',
    reusableAsTemplate: true,
    directAuthorityReuseAuthorized: false,
    numericPolicyValueInheritedAutomatically: false,
    fr312gExecutionAuthorizedByThisFinding: false,
    rationale:
      'FR241 implements a one-person dry-run runtime path and therefore cannot be promoted into the governed empirical collection runtime required by FR312G.',
  }),
]);

export const FR312G1_REQUIRED_DEDICATED_ARTIFACTS = Object.freeze([
  'fr312g_retention_and_privacy_policy',
  'fr312g_participant_consent_and_withdrawal_protocol',
  'fr312g_participant_count_rationale',
  'fr312g_partition_allocation_rationale',
  'fr312g_empirical_collection_runtime_and_admission_gate',
] as const);

export const FR312G1_REUSEABLE_PRINCIPLES = Object.freeze([
  'pseudonymous_participant_reference',
  'no_identity_matching_or_identity_template',
  'raw_capture_ephemeral_processing_preference',
  'finite_review_artifact_retention_required',
  'explicit_consent_before_capture',
  'withdrawal_procedure_required',
  'quality_decision_before_metric_inspection',
  'participant_level_partition_isolation',
] as const);

export const FR312G1_NUMERIC_POLICY_BOUNDARY = Object.freeze({
  inheritedReviewImageRetentionDays: null,
  fr239ThirtyDayValueAvailableOnlyAsHistoricalPrecedent: true,
  participantCount: null,
  partitionRatios: null,
  minimumReliabilityAcceptanceValue: null,
  numericPolicyAdoptionAuthorized: false,
});

export const FR312G1_BLOCKER_ACCOUNTING = Object.freeze({
  dedicatedRetentionPrivacyPolicyIssued: false,
  dedicatedConsentWithdrawalProtocolIssued: false,
  participantCountRationaleIssued: false,
  partitionAllocationRationaleIssued: false,
  empiricalCollectionRuntimeIssued: false,
  empiricalCollectionAdmissionIssued: false,
  actualParticipantCollectionAuthorized: false,
  fr312gReliabilityExecutionAuthorized: false,
  fr312hEntryAuthorized: false,
});

export const FR312G1_REVIEW = Object.freeze({
  reviewId: FR312G1_REVIEW_ID,
  authorityState:
    'reuse_review_complete_dedicated_collection_prerequisites_still_required' as const,
  sourceStudyProtocolId: FR312G_STUDY_DESIGN.protocolId,
  sourceCollectionPrerequisites: FR312G_COLLECTION_PREREQUISITES,
  findings: FR312G1_REUSE_FINDINGS,
  reusablePrinciples: FR312G1_REUSEABLE_PRINCIPLES,
  requiredDedicatedArtifacts: FR312G1_REQUIRED_DEDICATED_ARTIFACTS,
  numericPolicyBoundary: FR312G1_NUMERIC_POLICY_BOUNDARY,
  blockerAccounting: FR312G1_BLOCKER_ACCOUNTING,
  nextAction:
    'issue_dedicated_fr312g_precollection_governance_without_starting_collection' as const,
});

export const FR312G1_AUTHORITY_BOUNDARY = Object.freeze({
  existingRetentionAuthorityPromoted: false as const,
  existingConsentAuthorityPromoted: false as const,
  existingDryRunRuntimePromoted: false as const,
  actualParticipantCollectionAuthorized: false as const,
  reliabilityExecutionAuthorized: false as const,
  morphologyEquivalenceAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertCollectionPrerequisiteReuseReviewFR312G1(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();

  if (
    FR312G1_REUSE_FINDINGS.length !== 3
    || FR312G1_REQUIRED_DEDICATED_ARTIFACTS.length !== 5
  ) {
    throw new Error('fr312g1_review_inventory_drift');
  }

  const sourceVersions = new Set(
    FR312G1_REUSE_FINDINGS.map((item) => item.sourceContractVersion),
  );
  for (const expected of [
    FR239_CONTRACT_VERSION,
    FR240_CONTRACT_VERSION,
    FR241_CONTRACT_VERSION,
  ]) {
    if (!sourceVersions.has(expected)) {
      throw new Error('fr312g1_missing_source_contract:' + expected);
    }
  }

  for (const finding of FR312G1_REUSE_FINDINGS) {
    if (
      finding.reusableAsTemplate !== true
      || finding.directAuthorityReuseAuthorized !== false
      || finding.numericPolicyValueInheritedAutomatically !== false
      || finding.fr312gExecutionAuthorizedByThisFinding !== false
    ) {
      throw new Error(
        'fr312g1_source_authority_promotion:' + finding.sourcePurpose,
      );
    }
  }

  if (
    FR312F_PRIVACY_PREREQUISITES.actualParticipantCollectionAuthorized
      !== false
    || FR312F_SAMPLE_DESIGN.participantCount !== null
    || FR312F_SAMPLE_DESIGN.partitionRatios !== null
    || FR312G_COLLECTION_PREREQUISITES.executionAuthorized !== false
  ) {
    throw new Error('fr312g1_upstream_prerequisite_state_drift');
  }

  if (
    FR312G1_NUMERIC_POLICY_BOUNDARY.inheritedReviewImageRetentionDays
      !== null
    || FR312G1_NUMERIC_POLICY_BOUNDARY.participantCount !== null
    || FR312G1_NUMERIC_POLICY_BOUNDARY.partitionRatios !== null
    || FR312G1_NUMERIC_POLICY_BOUNDARY.numericPolicyAdoptionAuthorized
      !== false
  ) {
    throw new Error('fr312g1_numeric_policy_widening');
  }

  for (const [key, value] of Object.entries(FR312G1_BLOCKER_ACCOUNTING)) {
    if (value !== false) {
      throw new Error('fr312g1_blocker_closed_without_authority:' + key);
    }
  }

  for (const [key, value] of Object.entries(FR312G1_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312g1_authority_widening:' + key);
    }
  }
}
