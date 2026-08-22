import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport } from './i108-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-requirement-coverage-evaluation-evidence.js';

export const I109_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-promotion-readiness-review-v1';

const REQUIREMENTS = Object.freeze([
  'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
  'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  'STEM_BRANCH_COMPONENT_APPLICABILITY',
  'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
] as const);

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_AUTHORITY_PROMOTION_READINESS'
    | 'I108_UNRESOLVED_OR_INVALID';
  decision:
    | 'KE_FOUR_OF_FOUR_COVERAGE_CAN_ENTER_RESEARCH_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_DIRECT_IMPLEMENTATION_AND_EFFECT_PROMOTION_BLOCKED'
    | 'KE_PROMOTION_READINESS_NOT_ESTABLISHED';
  upstreamI108EvidenceId: string;
  candidateSourceId: string | null;
  candidateSourceClass: string | null;
  allFourKeAuthorityRequirementsSatisfied: boolean;
  authorityCoverageGapSatisfied: boolean;
  keAuthorityGapClosed: false;
  promotionLifecycleEntryReady: boolean;
  authorizedEntryStage: 'RESEARCH_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT' | 'none';
  semanticCeiling: 'EVIDENCE_BINDING_ONLY' | 'NONE';
  researchKeDirectionalEvidenceAdapterContractRequired: boolean;
  exactFiveElementControlCycleMustBePreserved: boolean;
  sourceToTargetDirectionMustBePreserved: boolean;
  sourceAndTargetComponentIdentityRequired: boolean;
  visibleStemApplicabilityAllowedByContract: boolean;
  branchHiddenStemApplicabilityAllowedByContract: boolean;
  rawBranchElementDirectControlRuleAuthorized: false;
  branchApplicabilityScope:
    | 'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK'
    | 'none';
  adapterMustKeepControlDirectionSeparateFromDamageOutcome: boolean;
  adapterMustKeepControlDirectionSeparateFromDamageMagnitude: boolean;
  adapterMayEmitDamageOutcome: false;
  adapterMayEmitDamageMagnitude: false;
  adapterMayEmitSettlementOutcome: false;
  adapterMayEmitActivationVerdict: false;
  adapterMayEmitPersistenceVerdict: false;
  adapterMayEmitEffectiveSupportVerdict: false;
  adapterMayEmitRelativeForceVerdict: false;
  adapterMayEmitPrecedenceVerdict: false;
  structuralRelationKindMutationAuthorized: false;
  keStructuralRelationKindRequired: false;
  directSourceToExecutableAdapterPromotionAuthorized: false;
  keDirectionalAdapterImplementationAuthorizedByThisGate: false;
  ruleDefinitionCreationAuthorized: false;
  methodologyDefinitionCreationAuthorized: false;
  registrySnapshotMutationAuthorized: false;
  reviewAttestationCreatedByThisGate: false;
  stagingPromotionAuthorized: false;
  productionPromotionAuthorized: false;
  singlePractitionerSecondarySourceProductionQualitySufficient: false;
  productionMultiSourceSupportStillRequired: true;
  candidateMayRemainResearchEvidenceWithoutProductionPromotion: true;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_authority_promotion_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI108Accepted(
  i108: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport,
): boolean {
  return (
    i108.status === 'RESOLVED_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE' &&
    i108.decision ===
      'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_FOUR_KE_AUTHORITY_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED' &&
    i108.candidateSourceId !== null &&
    i108.candidateSourceClass === 'practitioner_secondary' &&
    i108.coverage.length === REQUIREMENTS.length &&
    i108.coverage.every(
      (item, index) =>
        item.requirement === REQUIREMENTS[index] &&
        item.coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE' &&
        item.countsAsSatisfiedForKeAuthorityCoverage &&
        item.evidenceComesFromSameRegisteredCandidate &&
        item.priorI95CoverageBorrowed === false &&
        item.generalKnowledgeMaySubstitute === false &&
        item.fiveElementLabelsAloneMaySubstitute === false &&
        item.crossCandidateCompositionMaySubstitute === false &&
        item.directionMayBePromotedToDamageOutcome === false &&
        item.evidenceLocator.trim().length > 0 &&
        item.evidenceBasis.length > 0 &&
        item.limitingReason.trim().length > 0,
    ) &&
    i108.evaluatedRequirementCount === REQUIREMENTS.length &&
    i108.satisfiedRequirementCount === REQUIREMENTS.length &&
    i108.partialRequirementCount === 0 &&
    i108.unsupportedRequirementCount === 0 &&
    i108.allFourRequirementsEvaluated &&
    i108.candidateSatisfiesAllFourKeRequirements &&
    i108.keAuthorityCoverageGapSatisfied &&
    i108.keAuthorityGapClosed === false &&
    i108.candidateAcceptedForKeAuthority === false &&
    i108.candidatePromotedToKeAuthority === false &&
    i108.sourceReferenceApprovedForKeAdapterUse === false &&
    i108.promotionReadinessReviewRequired &&
    i108.additionalKeCandidateDiscoveryRequired === false &&
    i108.controlCycleAuthorityCoverageSatisfied &&
    i108.sourceLocalDirectionAuthorityCoverageSatisfied &&
    i108.stemBranchApplicabilityAuthorityCoverageSatisfied &&
    i108.controlVsDamageSeparationAuthorityCoverageSatisfied &&
    i108.branchApplicabilityScope ===
      'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK' &&
    i108.rawBranchElementDirectControlRuleAuthorized === false &&
    i108.controlDirectionMayBeTreatedAsDamageOutcome === false &&
    i108.controlDirectionMayBeTreatedAsDamageMagnitude === false &&
    i108.sourceClassAloneMayAuthorizeAdapter === false &&
    i108.singlePractitionerSecondarySourceMayAuthorizeProductionRule === false &&
    i108.keDirectionalAdapterImplementationAuthorizedByThisGate === false &&
    i108.structuralRelationKindMutationAuthorizedByThisGate === false &&
    i108.methodologyDefinitionCreatedByThisGate === false &&
    i108.methodologyRegisteredByThisGate === false &&
    i108.ruleDefinitionCreatedByThisGate === false &&
    i108.registrySnapshotMutatedByThisGate === false &&
    i108.reviewAttestationCreatedByThisGate === false &&
    i108.sourceActivationVerdictAuthorized === false &&
    i108.sourcePersistenceVerdictAuthorized === false &&
    i108.sourceEffectiveSupportVerdictAuthorized === false &&
    i108.relativeForceVerdictAuthorized === false &&
    i108.clashSettlementAuthorized === false &&
    i108.crossRelationPrecedenceAuthorized === false &&
    i108.classificationAuthorized === false &&
    i108.numericScoringAuthorized === false &&
    i108.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW'
  );
}

function commonMaterial(
  i108: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport,
) {
  return {
    reviewVersion:
      I109_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW_VERSION,
    upstreamI108EvidenceId: i108.evidenceId,
    keAuthorityGapClosed: false as const,
    rawBranchElementDirectControlRuleAuthorized: false as const,
    adapterMayEmitDamageOutcome: false as const,
    adapterMayEmitDamageMagnitude: false as const,
    adapterMayEmitSettlementOutcome: false as const,
    adapterMayEmitActivationVerdict: false as const,
    adapterMayEmitPersistenceVerdict: false as const,
    adapterMayEmitEffectiveSupportVerdict: false as const,
    adapterMayEmitRelativeForceVerdict: false as const,
    adapterMayEmitPrecedenceVerdict: false as const,
    structuralRelationKindMutationAuthorized: false as const,
    keStructuralRelationKindRequired: false as const,
    directSourceToExecutableAdapterPromotionAuthorized: false as const,
    keDirectionalAdapterImplementationAuthorizedByThisGate: false as const,
    ruleDefinitionCreationAuthorized: false as const,
    methodologyDefinitionCreationAuthorized: false as const,
    registrySnapshotMutationAuthorized: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    stagingPromotionAuthorized: false as const,
    productionPromotionAuthorized: false as const,
    singlePractitionerSecondarySourceProductionQualitySufficient: false as const,
    productionMultiSourceSupportStillRequired: true as const,
    candidateMayRemainResearchEvidenceWithoutProductionPromotion: true as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(
  i108: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport {
  const common = commonMaterial(i108);

  if (!exactI108Accepted(i108)) {
    return finalized({
      ...common,
      status: 'I108_UNRESOLVED_OR_INVALID',
      decision: 'KE_PROMOTION_READINESS_NOT_ESTABLISHED',
      candidateSourceId: null,
      candidateSourceClass: null,
      allFourKeAuthorityRequirementsSatisfied: false,
      authorityCoverageGapSatisfied: false,
      promotionLifecycleEntryReady: false,
      authorizedEntryStage: 'none',
      semanticCeiling: 'NONE',
      researchKeDirectionalEvidenceAdapterContractRequired: false,
      exactFiveElementControlCycleMustBePreserved: false,
      sourceToTargetDirectionMustBePreserved: false,
      sourceAndTargetComponentIdentityRequired: false,
      visibleStemApplicabilityAllowedByContract: false,
      branchHiddenStemApplicabilityAllowedByContract: false,
      branchApplicabilityScope: 'none',
      adapterMustKeepControlDirectionSeparateFromDamageOutcome: false,
      adapterMustKeepControlDirectionSeparateFromDamageMagnitude: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
      notes: [
        'I109 remains fail-closed unless I108 provides exact four-of-four same-candidate 克 authority coverage while every implementation, effect, settlement, precedence, scoring, and classification guard remains false.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_PROMOTION_READINESS',
    decision:
      'KE_FOUR_OF_FOUR_COVERAGE_CAN_ENTER_RESEARCH_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_DIRECT_IMPLEMENTATION_AND_EFFECT_PROMOTION_BLOCKED',
    candidateSourceId: i108.candidateSourceId,
    candidateSourceClass: i108.candidateSourceClass,
    allFourKeAuthorityRequirementsSatisfied: true,
    authorityCoverageGapSatisfied: true,
    promotionLifecycleEntryReady: true,
    authorizedEntryStage: 'RESEARCH_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
    semanticCeiling: 'EVIDENCE_BINDING_ONLY',
    researchKeDirectionalEvidenceAdapterContractRequired: true,
    exactFiveElementControlCycleMustBePreserved: true,
    sourceToTargetDirectionMustBePreserved: true,
    sourceAndTargetComponentIdentityRequired: true,
    visibleStemApplicabilityAllowedByContract: true,
    branchHiddenStemApplicabilityAllowedByContract: true,
    branchApplicabilityScope:
      'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK',
    adapterMustKeepControlDirectionSeparateFromDamageOutcome: true,
    adapterMustKeepControlDirectionSeparateFromDamageMagnitude: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
    notes: [
      'I108 four-of-four research coverage is sufficient to enter a governed 克 directional-evidence adapter contract stage, but not to implement that adapter directly.',
      'The future contract may bind source-to-target 克 direction only for explicit stem components and earthly-branch hidden-stem components supported by the frozen source scope. A raw earthly-branch element label is not authorized as a direct 克 participant.',
      '克 direction remains evidence only. Damage outcome, damage magnitude, settlement, activation, persistence, effective support, relative force, and precedence must remain separate unresolved domains.',
      'No new StructuralRelationKind is required or authorized for 克. The adapter belongs to a source-local directional evidence layer rather than the structural-relation identity taxonomy.',
      'A single practitioner-secondary source is sufficient only for this research contract entry. Existing production quality policy still requires multi-source support and separate reviewed promotion artifacts.',
    ],
  });
}
