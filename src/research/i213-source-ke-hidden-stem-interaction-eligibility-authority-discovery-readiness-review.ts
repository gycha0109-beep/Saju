import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS,
  type I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport,
} from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';

export const I213_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-authority-discovery-readiness-review-v1';

export const I213_DISCOVERY_PATH_IDS = Object.freeze([
  'EXISTING_NORMALIZED_SOURCE_DEEP_REINSPECTION',
  'NEW_NORMATIVE_SOURCE_CANDIDATE_DISCOVERY',
  'PRIMARY_OR_FIRST_PARTY_SOURCE_CONTEXT_DISCOVERY',
  'VERIFIED_TRANSCRIPTION_OR_EDITION_LOCATOR_CONFIRMATION',
] as const);
export type I213DiscoveryPathId = (typeof I213_DISCOVERY_PATH_IDS)[number];

export const I213_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I212_SEVEN_REQUIREMENT_BOUNDARY_REQUIRED',
  'HIDDEN_STEM_MEMBERSHIP_MUST_NOT_COUNT_AS_EFFECTIVE_INTERACTION_ELIGIBILITY',
  'VISIBLE_STEM_POSITION_OR_THRESHOLD_RULES_MUST_NOT_BACKFILL_HIDDEN_STEM_ELIGIBILITY',
  'VISIBLE_TO_HIDDEN_HIDDEN_TO_VISIBLE_AND_HIDDEN_TO_HIDDEN_SCOPES_MUST_REMAIN_DISTINCT',
  'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS_REQUIRE_EXPLICIT_AUTHORITY',
  'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_MUST_REMAIN_DISTINCT',
  'EXACT_SOURCE_IDENTITY_ORIGINAL_OR_VERIFIED_CONTEXT_AND_REPRODUCIBLE_LOCATOR_REQUIRED',
  'SEARCH_SNIPPET_MODEL_SYNTHESIS_GENERAL_KNOWLEDGE_AND_EMPIRICAL_CALIBRATION_ARE_NOT_AUTHORITY',
  'EXISTING_NORMALIZED_SOURCE_MAY_BE_REINSPECTED_WITHOUT_AUTO_ACCEPTANCE',
  'NEW_SOURCE_CANDIDATE_MAY_BE_DISCOVERED_WITHOUT_SOURCE_CLASS_AUTO_ACCEPTANCE',
  'PARTIAL_DISCOVERY_EVIDENCE_MAY_BE_RECORDED_BUT_MUST_NOT_BE_CROSS_CANDIDATE_COMPOSED',
  'DISCOVERY_DOES_NOT_REGISTER_SELECT_REBIND_OR_REEVALUATE_CURRENT_CANDIDATES',
  'I132_QU_WEI_HOLD_LI_SUSPENSION_AND_CURRENT_V2_GUARDS_MUST_REMAIN_UNCHANGED',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I213DiscoveryControlId = (typeof I213_DISCOVERY_CONTROL_IDS)[number];

export interface I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'I212_REQUIREMENTS_BOUNDARY_INVALID';
  decision:
    | 'SEVEN_REQUIREMENT_HIDDEN_STEM_AUTHORITY_DISCOVERY_CONTRACT_FROZEN_FOUR_PATHS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED'
    | 'HIDDEN_STEM_AUTHORITY_DISCOVERY_NOT_READY';
  upstreamI212ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI212BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  requirementIds: readonly string[];
  requirementCount: 7 | 0;
  requirementsFrozen: boolean;
  discoveryPathIds: readonly I213DiscoveryPathId[];
  discoveryPathCount: 4 | 0;
  discoveryPathsFrozen: boolean;
  discoveryControlIds: readonly I213DiscoveryControlId[];
  discoveryControlCount: 14 | 0;
  discoveryControlsFrozen: boolean;
  existingNormalizedSourceDeepReinspectionAllowed: boolean;
  existingSourceAutoAcceptanceAllowed: false;
  newNormativeSourceDiscoveryAllowed: boolean;
  sourceClassAloneMayEstablishAuthority: false;
  primaryOrFirstPartyContextPreferredWhenAvailable: boolean;
  verifiedTranscriptionOrEditionLocatorConfirmationRequiredForCandidateEvidence: boolean;
  exactSourceIdentityRequired: boolean;
  originalOrVerifiedSourceContextRequired: boolean;
  reproducibleLocatorRequired: boolean;
  partialRequirementEvidenceMayBeRecordedAtDiscovery: boolean;
  partialEvidenceCountsAsRequirementSatisfiedByDiscovery: false;
  crossCandidateCompositionAuthorized: false;
  hiddenStemMembershipCountsAsEligibility: false;
  visibleStemRuleBackfillAuthorized: false;
  visibleToHiddenScopeRequired: boolean;
  hiddenToVisibleScopeRequired: boolean;
  hiddenToHiddenScopeRequired: boolean;
  explicitPositionContextActivationAndExceptionsRequired: boolean;
  relationExistenceDistinctFromEffectiveInteraction: boolean;
  effectiveInteractionDistinctFromDamageOutcome: boolean;
  searchSnippetMayCountAsAuthority: false;
  modelSynthesisMayCountAsAuthority: false;
  generalKnowledgeMayCountAsAuthority: false;
  empiricalCalibrationMayCreateAuthority: false;
  discoveryAuthorized: boolean;
  discoveryExecutedByThisGate: false;
  candidateEvidenceRecordedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  authorityAcquiredByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI212Accepted(i212: I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport): boolean {
  return (
    i212.status === 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW' &&
    i212.decision ===
      'HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_SEVEN_REQUIREMENTS_NO_AUTHORITY_ACQUIRED' &&
    i212.exactI113HiddenStemBoundaryAccepted &&
    i212.exactI211CurrentRepositoryBoundaryAccepted &&
    i212.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i212.authorityGapConfirmed &&
    i212.authorityGapClosed === false &&
    i212.requirementCount === 7 &&
    i212.requirements.length === I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS.length &&
    i212.requirements.every((item, index) =>
      item.requirementId === I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS[index] &&
      item.mandatory &&
      item.currentlySatisfied === false &&
      item.exactAuthorityRequired &&
      item.generalKnowledgeMaySatisfy === false &&
      item.visibleStemRuleMayBackfill === false &&
      item.hiddenStemMembershipMaySatisfy === false
    ) &&
    i212.allRequirementsMandatory &&
    i212.allRequirementsCurrentlyUnsatisfied &&
    i212.requirementsFrozenProspectively &&
    i212.existingSourceEstablishesHiddenStemFiveElementApplicability &&
    i212.existingSourceEstablishesHiddenStemPairEligibility === false &&
    i212.existingSourceEstablishesHiddenStemPositionalEligibility === false &&
    i212.hiddenStemMembershipAloneMayEstablishInteractionEligibility === false &&
    i212.visibleStemPositionalRuleMayBackfillHiddenStemEligibility === false &&
    i212.visibleStemThresholdRuleMayResolveHiddenStemEligibility === false &&
    i212.allThreeDirectionalComponentScopesRequireAuthority &&
    i212.positionContextActivationAndExceptionsRequireExplicitAuthority &&
    i212.relationExistenceMustRemainDistinctFromEffectiveInteraction &&
    i212.effectiveInteractionMustRemainDistinctFromDamageOutcome &&
    i212.candidateDiscoveryReadinessReviewAuthorized &&
    i212.candidateDiscoveryExecutedByThisGate === false &&
    i212.authorityAcquiredByThisGate === false &&
    i212.quWei2001HoldPreserved &&
    i212.li1998SameTargetPathSuspendedNotRetired &&
    i212.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i212.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i212.provenanceIndependenceAdjudicatedByThisGate === false &&
    i212.evidenceRebindingAuthorizedByThisGate === false &&
    i212.currentV2PackageAndCandidateSetRemainImmutable &&
    i212.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i212.actualCompositionPerformedByThisGate === false &&
    i212.multiSourceCompositionAuthorized === false &&
    i212.thresholdRuleCreatedByThisGate === false &&
    i212.damageEvaluationAuthorized === false &&
    i212.classificationAuthorized === false &&
    i212.numericScoringAuthorized === false &&
    i212.productionPolicyExecutionAuthorized === false &&
    i212.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport, 'reviewId'>,
): I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `i213_hidden_stem_ke_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(
  i212: I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport,
): I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport {
  const accepted = exactI212Accepted(i212);
  return finalized({
    reviewVersion: I213_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'I212_REQUIREMENTS_BOUNDARY_INVALID',
    decision: accepted
      ? 'SEVEN_REQUIREMENT_HIDDEN_STEM_AUTHORITY_DISCOVERY_CONTRACT_FROZEN_FOUR_PATHS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED'
      : 'HIDDEN_STEM_AUTHORITY_DISCOVERY_NOT_READY',
    upstreamI212ReviewId: i212.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI212BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    authorityGap: accepted ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    requirementIds: accepted ? I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS : Object.freeze([]),
    requirementCount: accepted ? 7 : 0,
    requirementsFrozen: accepted,
    discoveryPathIds: accepted ? I213_DISCOVERY_PATH_IDS : Object.freeze([]),
    discoveryPathCount: accepted ? 4 : 0,
    discoveryPathsFrozen: accepted,
    discoveryControlIds: accepted ? I213_DISCOVERY_CONTROL_IDS : Object.freeze([]),
    discoveryControlCount: accepted ? 14 : 0,
    discoveryControlsFrozen: accepted,
    existingNormalizedSourceDeepReinspectionAllowed: accepted,
    existingSourceAutoAcceptanceAllowed: false,
    newNormativeSourceDiscoveryAllowed: accepted,
    sourceClassAloneMayEstablishAuthority: false,
    primaryOrFirstPartyContextPreferredWhenAvailable: accepted,
    verifiedTranscriptionOrEditionLocatorConfirmationRequiredForCandidateEvidence: accepted,
    exactSourceIdentityRequired: accepted,
    originalOrVerifiedSourceContextRequired: accepted,
    reproducibleLocatorRequired: accepted,
    partialRequirementEvidenceMayBeRecordedAtDiscovery: accepted,
    partialEvidenceCountsAsRequirementSatisfiedByDiscovery: false,
    crossCandidateCompositionAuthorized: false,
    hiddenStemMembershipCountsAsEligibility: false,
    visibleStemRuleBackfillAuthorized: false,
    visibleToHiddenScopeRequired: accepted,
    hiddenToVisibleScopeRequired: accepted,
    hiddenToHiddenScopeRequired: accepted,
    explicitPositionContextActivationAndExceptionsRequired: accepted,
    relationExistenceDistinctFromEffectiveInteraction: accepted,
    effectiveInteractionDistinctFromDamageOutcome: accepted,
    searchSnippetMayCountAsAuthority: false,
    modelSynthesisMayCountAsAuthority: false,
    generalKnowledgeMayCountAsAuthority: false,
    empiricalCalibrationMayCreateAuthority: false,
    discoveryAuthorized: accepted,
    discoveryExecutedByThisGate: false,
    candidateEvidenceRecordedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    authorityAcquiredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I213 authorizes a bounded discovery pass only. It does not evaluate requirement coverage or acquire hidden-stem interaction authority.',
          'The existing normalized source may be deeply reinspected, and genuinely new normative candidates may be discovered, but neither path receives automatic acceptance.',
          'Partial evidence can be recorded per source during discovery; it cannot be cross-source composed into a hidden-stem eligibility rule in this gate.',
        ])
      : Object.freeze(['I213 fails closed unless the exact I212 seven-requirement authority boundary is intact.']),
  });
}
