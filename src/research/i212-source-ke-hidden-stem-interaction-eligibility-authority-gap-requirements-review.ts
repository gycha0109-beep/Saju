import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport } from './i113-challenge-combination-support-channel-untouched-support-effect-source-ke-interaction-eligibility-methodology-review.js';
import type { I211QuWei2001ExternalCustodianAccessRequirementHoldRecord } from './i211-qu-wei-2001-external-custodian-access-requirement-hold-record.js';

export const I212_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review-v1';

export const I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS = Object.freeze([
  'HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
  'VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
  'HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
  'HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
  'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS',
  'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION',
  'EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR',
] as const);

export type I212HiddenStemAuthorityRequirementId =
  (typeof I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS)[number];

export interface I212HiddenStemAuthorityRequirement {
  requirementId: I212HiddenStemAuthorityRequirementId;
  mandatory: true;
  currentlySatisfied: false;
  exactAuthorityRequired: true;
  generalKnowledgeMaySatisfy: false;
  visibleStemRuleMayBackfill: false;
  hiddenStemMembershipMaySatisfy: false;
}

export interface I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
    | 'I113_OR_I211_AUTHORITY_BOUNDARY_INVALID';
  decision:
    | 'HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_SEVEN_REQUIREMENTS_NO_AUTHORITY_ACQUIRED'
    | 'HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_REQUIREMENTS_NOT_FROZEN';
  upstreamI113ReviewId: string;
  upstreamI211HoldRecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI113HiddenStemBoundaryAccepted: boolean;
  exactI211CurrentRepositoryBoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapConfirmed: boolean;
  authorityGapClosed: false;
  existingSourceCandidateIdContext: string | null;
  existingSourceHiddenStemLocatorVerified: boolean;
  existingSourceEstablishesHiddenStemFiveElementApplicability: boolean;
  existingSourceEstablishesHiddenStemPairEligibility: false;
  existingSourceEstablishesHiddenStemPositionalEligibility: false;
  hiddenStemMembershipAloneMayEstablishInteractionEligibility: false;
  visibleStemPositionalRuleMayBackfillHiddenStemEligibility: false;
  visibleStemThresholdRuleMayResolveHiddenStemEligibility: false;
  rawEarthlyBranchElementMaySubstituteForHiddenStemComponent: false;
  visibleToHiddenEligibilityResolved: false;
  hiddenToVisibleEligibilityResolved: false;
  hiddenToHiddenEligibilityResolved: false;
  allThreeDirectionalComponentScopesRequireAuthority: boolean;
  positionContextActivationAndExceptionsRequireExplicitAuthority: boolean;
  relationExistenceMustRemainDistinctFromEffectiveInteraction: boolean;
  effectiveInteractionMustRemainDistinctFromDamageOutcome: boolean;
  requirements: readonly I212HiddenStemAuthorityRequirement[];
  requirementCount: 7 | 0;
  allRequirementsMandatory: boolean;
  allRequirementsCurrentlyUnsatisfied: boolean;
  requirementsFrozenProspectively: boolean;
  exactSourceIdentityRequired: boolean;
  originalOrVerifiedSourceContextRequired: boolean;
  reproducibleLocatorRequired: boolean;
  searchSnippetMayCountAsAuthority: false;
  modelSynthesisMayCountAsAuthority: false;
  generalKnowledgeMayCountAsAuthority: false;
  empiricalCalibrationMayCreateAuthority: false;
  candidateDiscoveryReadinessReviewAuthorized: boolean;
  candidateDiscoveryExecutedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  authorityAcquiredByThisGate: false;
  quWei2001HoldPreserved: boolean;
  quWei2001HoldState:
    | 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE'
    | 'NOT_ESTABLISHED';
  quWei2001ExternalContactAuthorizedByThisGate: false;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW';
  notes: readonly string[];
}

const REQUIREMENTS = Object.freeze(
  I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS.map(
    (requirementId): I212HiddenStemAuthorityRequirement => ({
      requirementId,
      mandatory: true,
      currentlySatisfied: false,
      exactAuthorityRequired: true,
      generalKnowledgeMaySatisfy: false,
      visibleStemRuleMayBackfill: false,
      hiddenStemMembershipMaySatisfy: false,
    }),
  ),
);

function exactI113Accepted(
  i113: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport,
): boolean {
  return (
    i113.status === 'RESOLVED_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW' &&
    i113.decision ===
      'VISIBLE_STEM_POSITIONAL_METHODOLOGY_AVAILABLE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REMAINS' &&
    i113.candidateSourceId !== null &&
    i113.directionalBindingLayerResolved &&
    i113.visibleStemSourceLocatorVerified &&
    i113.visibleStemPositionalApplicabilityLanguageAvailable &&
    i113.branchHiddenStemSourceLocatorVerified &&
    i113.branchHiddenStemFiveElementApplicabilityAuthorityAvailable &&
    i113.branchHiddenStemPositionalInteractionEligibilityAuthorityAvailable === false &&
    i113.visibleStemToHiddenStemEligibilityAuthorityAvailable === false &&
    i113.hiddenStemToVisibleStemEligibilityAuthorityAvailable === false &&
    i113.hiddenStemToHiddenStemEligibilityAuthorityAvailable === false &&
    i113.hiddenStemMembershipAloneMayEstablishInteractionEligibility === false &&
    i113.hiddenStemCurrentAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i113.genericAllComponentInteractionEligibilityResolved === false &&
    i113.effectiveInteractionSetResolved === false &&
    i113.currentChartInteractionEligibilityMaterializationAuthorizedByThisGate === false &&
    i113.directionalBindingMayBePromotedToEffectiveInteraction === false &&
    i113.directionalBindingMayBePromotedToDamageOutcome === false &&
    i113.classificationAuthorized === false &&
    i113.numericScoringAuthorized === false
  );
}

function exactI211Accepted(i211: I211QuWei2001ExternalCustodianAccessRequirementHoldRecord): boolean {
  return (
    i211.status === 'RESOLVED_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD' &&
    i211.decision ===
      'QU_WEI_2001_WEB_ONLY_REMEDIATION_ON_HOLD_TWO_EXTERNAL_ACCESS_TRIGGERS_FROZEN_TWO_GAPS_REMAIN_NO_EXHAUSTION_NO_CONTACT_AUTHORIZATION_NO_REBINDING_NO_INDEPENDENCE' &&
    i211.holdState === 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE' &&
    i211.remainingGapCount === 2 &&
    i211.webOnlyAutomatedRemediationHoldActive &&
    i211.webOnlyAutomatedResearchRetired === false &&
    i211.officialCustodianContactExecutionAuthorizedByThisGate === false &&
    i211.evidenceRebindingAuthorizedByThisGate === false &&
    i211.provenanceIndependenceAdjudicatedByThisGate === false &&
    i211.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i211.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i211.currentV2PackageAndCandidateSetRemainImmutable &&
    i211.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i211.liSameTargetPathSuspendedNotRetired &&
    i211.candidateSetMutatedByThisGate === false &&
    i211.candidateSetReevaluationAuthorizedByThisGate === false &&
    i211.actualCompositionPerformedByThisGate === false &&
    i211.multiSourceCompositionAuthorized === false &&
    i211.thresholdRuleCreatedByThisGate === false &&
    i211.damageEvaluationAuthorized === false &&
    i211.classificationAuthorized === false &&
    i211.numericScoringAuthorized === false &&
    i211.productionPolicyExecutionAuthorized === false &&
    i211.hiddenStemInteractionEligibilityGapRemains &&
    i211.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i211.nextGateActivationCondition === 'MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE_TRIGGER_REQUIRED'
  );
}

function finalized(
  material: Omit<I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport, 'reviewId'>,
): I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport {
  return {
    reviewId: `i212_hidden_stem_ke_authority_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
  i113: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport,
  i211: I211QuWei2001ExternalCustodianAccessRequirementHoldRecord,
): I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport {
  const accepted = exactI113Accepted(i113) && exactI211Accepted(i211);

  return finalized({
    reviewVersion: I212_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
      : 'I113_OR_I211_AUTHORITY_BOUNDARY_INVALID',
    decision: accepted
      ? 'HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_SEVEN_REQUIREMENTS_NO_AUTHORITY_ACQUIRED'
      : 'HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_REQUIREMENTS_NOT_FROZEN',
    upstreamI113ReviewId: i113.reviewId,
    upstreamI211HoldRecordId: i211.holdRecordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI113HiddenStemBoundaryAccepted: accepted,
    exactI211CurrentRepositoryBoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapConfirmed: accepted,
    authorityGapClosed: false,
    existingSourceCandidateIdContext: accepted ? i113.candidateSourceId : null,
    existingSourceHiddenStemLocatorVerified: accepted,
    existingSourceEstablishesHiddenStemFiveElementApplicability: accepted,
    existingSourceEstablishesHiddenStemPairEligibility: false,
    existingSourceEstablishesHiddenStemPositionalEligibility: false,
    hiddenStemMembershipAloneMayEstablishInteractionEligibility: false,
    visibleStemPositionalRuleMayBackfillHiddenStemEligibility: false,
    visibleStemThresholdRuleMayResolveHiddenStemEligibility: false,
    rawEarthlyBranchElementMaySubstituteForHiddenStemComponent: false,
    visibleToHiddenEligibilityResolved: false,
    hiddenToVisibleEligibilityResolved: false,
    hiddenToHiddenEligibilityResolved: false,
    allThreeDirectionalComponentScopesRequireAuthority: accepted,
    positionContextActivationAndExceptionsRequireExplicitAuthority: accepted,
    relationExistenceMustRemainDistinctFromEffectiveInteraction: accepted,
    effectiveInteractionMustRemainDistinctFromDamageOutcome: accepted,
    requirements: accepted ? REQUIREMENTS : Object.freeze([]),
    requirementCount: accepted ? 7 : 0,
    allRequirementsMandatory: accepted,
    allRequirementsCurrentlyUnsatisfied: accepted,
    requirementsFrozenProspectively: accepted,
    exactSourceIdentityRequired: accepted,
    originalOrVerifiedSourceContextRequired: accepted,
    reproducibleLocatorRequired: accepted,
    searchSnippetMayCountAsAuthority: false,
    modelSynthesisMayCountAsAuthority: false,
    generalKnowledgeMayCountAsAuthority: false,
    empiricalCalibrationMayCreateAuthority: false,
    candidateDiscoveryReadinessReviewAuthorized: accepted,
    candidateDiscoveryExecutedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    authorityAcquiredByThisGate: false,
    quWei2001HoldPreserved: accepted,
    quWei2001HoldState: accepted
      ? 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE'
      : 'NOT_ESTABLISHED',
    quWei2001ExternalContactAuthorizedByThisGate: false,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I212 opens a new governed hidden-stem authority lane without reopening the suspended Li 1998 path or the Qu Wei 2001 external-access HOLD.',
          'Existing evidence establishes that hidden stems participate in five-element generating/overcoming relations, but it does not establish which hidden-stem component pairs are effectively eligible to interact in a concrete chart.',
          'Visible-stem positional language cannot be backfilled into hidden-stem eligibility. Each visible-to-hidden, hidden-to-visible, and hidden-to-hidden direction requires explicit authority or an authority that explicitly and unambiguously covers all three.',
          'Interaction eligibility must remain distinct from relation existence and from damage outcome. No threshold, classification, scoring, composition, or production semantics are created here.',
        ])
      : Object.freeze([
          'I212 fails closed unless both the original I113 hidden-stem gap boundary and the current I211 repository HOLD/guard boundary are preserved exactly.',
        ]),
  });
}
