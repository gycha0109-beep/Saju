import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I98SourceRelationVocabularyTerm } from './i98-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport } from './i104-challenge-combination-support-channel-untouched-support-effect-existing-substrate-source-vocabulary-binding-promotion-readiness-review.js';

export const I105_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-blocked-vocabulary-authority-acquisition-readiness-review-v1';

export type I105BlockedVocabularyAuthorityLaneId =
  | 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY'
  | 'SOURCE_XING_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY'
  | 'SOURCE_WEI_PROTECTION_EFFECT_CRITERIA_AUTHORITY';

export type I105AuthorityRequirement =
  | 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE'
  | 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING'
  | 'STEM_BRANCH_COMPONENT_APPLICABILITY'
  | 'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION'
  | 'EXACT_BRANCH_PUNISHMENT_MEMBERSHIP'
  | 'PUNISHMENT_RELATION_ARITY'
  | 'SELF_PUNISHMENT_CONVENTION'
  | 'PUNISHMENT_IDENTITY_SERIALIZATION_BASIS'
  | 'GENERIC_PROTECTION_CRITERIA'
  | 'PROTECTION_SOURCE_ELIGIBILITY'
  | 'PROTECTION_SCOPE_AND_EXCEPTIONS'
  | 'PROTECTION_VS_SUPPORT_AND_CLASH_RESCUE_SEPARATION'
  | 'PROTECTION_EFFECT_STATE_SEMANTICS';

export interface I105BlockedVocabularyAuthorityLane {
  sourceTerm: Extract<I98SourceRelationVocabularyTerm, '克' | '刑' | '卫'>;
  laneId: I105BlockedVocabularyAuthorityLaneId;
  currentBlocker: string;
  requiredAuthority: readonly I105AuthorityRequirement[];
  exactNormativeAuthorityRequired: true;
  originalSourceInspectionRequired: true;
  reproducibleLocatorRequired: true;
  independentRegistrationRequired: true;
  mayReuseI87SourceRegistrationContract: true;
  generalKnowledgeMaySubstitute: false;
  modelSynthesisMaySubstitute: false;
  searchSnippetMaySubstitute: false;
  existingCandidateVocabularyMentionAloneSufficient: false;
  otherLaneAuthorityMaySubstitute: false;
  structuralRelationKindRequiredAfterAuthority: boolean;
  directionalEvidenceAdapterRequiredAfterAuthority: boolean;
  protectionEffectStateTaxonomyRequiredAfterAuthority: boolean;
  implementationAuthorizedByThisGate: false;
  effectOrPersistenceOutcomeAuthorizedByThisGate: false;
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS'
    | 'I104_UNRESOLVED_OR_INVALID';
  decision:
    | 'KE_XING_WEI_AUTHORITY_ACQUISITION_LANES_SEPARATED_CROSS_LANE_SUBSTITUTION_BLOCKED'
    | 'AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED';
  upstreamI104ReviewId: string;
  candidateSourceId: string | null;
  blockedTerms: readonly I98SourceRelationVocabularyTerm[];
  lanes: readonly I105BlockedVocabularyAuthorityLane[];
  laneCount: number;
  allThreeBlockedTermsAssignedIndependentLane: boolean;
  sourceKeLaneReadyForGovernedDiscovery: boolean;
  sourceXingLaneReadyForGovernedDiscovery: boolean;
  sourceWeiLaneReadyForGovernedDiscovery: boolean;
  crossLaneSubstitutionAuthorized: false;
  partialLaneCompletionMaySatisfyAllSixI98Bindings: false;
  existingCandidateVocabularyMentionMayCloseAuthorityGap: false;
  generalKnowledgeInferenceAuthorized: false;
  sourceKeMayInferControlCycleFromFiveElementFacts: false;
  sourceXingMayInferPunishmentPairsWithoutRegisteredAuthority: false;
  sourceWeiMayInferProtectionFromSupportPresence: false;
  sourceWeiMayCollapseIntoClashRescue: false;
  sourceXingMayCollapseIntoBranchClash: false;
  sourceKeStructuralRelationKindRequired: false;
  sourceXingStructuralRelationKindRequired: true;
  sourceWeiStructuralRelationKindRequired: false;
  sourceKeDirectionalEvidenceAdapterRequired: true;
  sourceWeiProtectionEffectStateTaxonomyRequired: true;
  acquisitionResultMayDirectlyCreateMethodologyDefinition: false;
  acquisitionResultMayDirectlyCreateRuleDefinition: false;
  acquisitionResultMayDirectlyMutateRegistry: false;
  acquisitionResultMayDirectlyAuthorizeExecution: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_blocked_vocabulary_authority_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI104Accepted(
  i104: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport,
): boolean {
  return (
    i104.status === 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS' &&
    i104.decision ===
      'EXISTING_SUBSTRATE_BINDINGS_VERIFIED_FULL_METHODOLOGY_MATERIALIZATION_BLOCKED_BY_KE_XING_WEI_AND_EFFECT_SEMANTICS' &&
    i104.candidateSourceId !== null &&
    i104.verifiedExistingSubstrateTerms.join('|') === '合|冲|生' &&
    i104.authorityBlockedTerms.join('|') === '克|刑|卫' &&
    i104.verifiedExistingSubstrateTermCount === 3 &&
    i104.authorityBlockedTermCount === 3 &&
    i104.vocabularyBindingProgress === 'PARTIAL_3_OF_6' &&
    i104.sourceHeBindingVerified &&
    i104.sourceChongBindingVerified &&
    i104.sourceShengBindingVerified &&
    i104.sourceKeAuthorityStillMissing &&
    i104.sourceXingAuthorityStillMissing &&
    i104.sourceWeiAuthorityStillMissing &&
    i104.existingSubstrateBindingsMayReplaceI98UnresolvedBindingForThoseTerms &&
    i104.allSixI98VocabularyBindingsResolved === false &&
    i104.exactDamageVocabularyEvaluationResolved === false &&
    i104.supportOrProtectionConditionEvaluationResolved === false &&
    i104.noUnresolvedRequiredBindingConditionSatisfied === false &&
    i104.partialMethodologyDefinitionMaterializationAuthorized === false &&
    i104.researchMethodologyMaterializationAuthorized === false &&
    i104.evidenceBindingMayBePromotedToEffectOutcome === false &&
    i104.zeroBindingMayBePromotedToEffectAbsence === false &&
    i104.noTrackedRelationTouchMayCoverUnmodeledVocabulary === false &&
    i104.sourceActivationVerdictAuthorized === false &&
    i104.sourcePersistenceVerdictAuthorized === false &&
    i104.sourceEffectiveSupportVerdictAuthorized === false &&
    i104.relativeForceVerdictAuthorized === false &&
    i104.crossRelationPrecedenceAuthorized === false &&
    i104.classificationAuthorized === false &&
    i104.numericScoringAuthorized === false &&
    i104.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function lanes(): readonly I105BlockedVocabularyAuthorityLane[] {
  return [
    {
      sourceTerm: '克',
      laneId: 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY',
      currentBlocker: 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED',
      requiredAuthority: [
        'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
        'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
        'STEM_BRANCH_COMPONENT_APPLICABILITY',
        'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
      ],
      exactNormativeAuthorityRequired: true,
      originalSourceInspectionRequired: true,
      reproducibleLocatorRequired: true,
      independentRegistrationRequired: true,
      mayReuseI87SourceRegistrationContract: true,
      generalKnowledgeMaySubstitute: false,
      modelSynthesisMaySubstitute: false,
      searchSnippetMaySubstitute: false,
      existingCandidateVocabularyMentionAloneSufficient: false,
      otherLaneAuthorityMaySubstitute: false,
      structuralRelationKindRequiredAfterAuthority: false,
      directionalEvidenceAdapterRequiredAfterAuthority: true,
      protectionEffectStateTaxonomyRequiredAfterAuthority: false,
      implementationAuthorizedByThisGate: false,
      effectOrPersistenceOutcomeAuthorizedByThisGate: false,
      notes: [
        '克 requires a governed exact control-cycle and source-local direction authority; FiveElement labels alone do not authorize the cycle.',
        'Any future adapter must preserve direction separately from damage magnitude or settlement outcome.',
      ],
    },
    {
      sourceTerm: '刑',
      laneId: 'SOURCE_XING_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY',
      currentBlocker: 'EXACT_BRANCH_PUNISHMENT_MEMBERSHIP_AND_IDENTITY_AUTHORITY_NOT_REGISTERED',
      requiredAuthority: [
        'EXACT_BRANCH_PUNISHMENT_MEMBERSHIP',
        'PUNISHMENT_RELATION_ARITY',
        'SELF_PUNISHMENT_CONVENTION',
        'PUNISHMENT_IDENTITY_SERIALIZATION_BASIS',
      ],
      exactNormativeAuthorityRequired: true,
      originalSourceInspectionRequired: true,
      reproducibleLocatorRequired: true,
      independentRegistrationRequired: true,
      mayReuseI87SourceRegistrationContract: true,
      generalKnowledgeMaySubstitute: false,
      modelSynthesisMaySubstitute: false,
      searchSnippetMaySubstitute: false,
      existingCandidateVocabularyMentionAloneSufficient: false,
      otherLaneAuthorityMaySubstitute: false,
      structuralRelationKindRequiredAfterAuthority: true,
      directionalEvidenceAdapterRequiredAfterAuthority: false,
      protectionEffectStateTaxonomyRequiredAfterAuthority: false,
      implementationAuthorizedByThisGate: false,
      effectOrPersistenceOutcomeAuthorizedByThisGate: false,
      notes: [
        '刑 needs its own branch-relation identity authority and cannot be collapsed into branch_clash.',
        'Membership, arity, self-punishment conventions, and deterministic identity representation must be sourced before taxonomy implementation.',
      ],
    },
    {
      sourceTerm: '卫',
      laneId: 'SOURCE_WEI_PROTECTION_EFFECT_CRITERIA_AUTHORITY',
      currentBlocker: 'GENERIC_SOURCE_PROTECTION_CRITERIA_AND_EVIDENCE_CONTRACT_NOT_REGISTERED',
      requiredAuthority: [
        'GENERIC_PROTECTION_CRITERIA',
        'PROTECTION_SOURCE_ELIGIBILITY',
        'PROTECTION_SCOPE_AND_EXCEPTIONS',
        'PROTECTION_VS_SUPPORT_AND_CLASH_RESCUE_SEPARATION',
        'PROTECTION_EFFECT_STATE_SEMANTICS',
      ],
      exactNormativeAuthorityRequired: true,
      originalSourceInspectionRequired: true,
      reproducibleLocatorRequired: true,
      independentRegistrationRequired: true,
      mayReuseI87SourceRegistrationContract: true,
      generalKnowledgeMaySubstitute: false,
      modelSynthesisMaySubstitute: false,
      searchSnippetMaySubstitute: false,
      existingCandidateVocabularyMentionAloneSufficient: false,
      otherLaneAuthorityMaySubstitute: false,
      structuralRelationKindRequiredAfterAuthority: false,
      directionalEvidenceAdapterRequiredAfterAuthority: false,
      protectionEffectStateTaxonomyRequiredAfterAuthority: true,
      implementationAuthorizedByThisGate: false,
      effectOrPersistenceOutcomeAuthorizedByThisGate: false,
      notes: [
        '卫 is an effect/protection semantic, not a generic structural relation kind.',
        'Future authority must distinguish protection from ordinary support presence and from the narrow clash-rescue router.',
      ],
    },
  ];
}

function commonMaterial(
  i104: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport,
) {
  return {
    reviewVersion:
      I105_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    upstreamI104ReviewId: i104.reviewId,
    crossLaneSubstitutionAuthorized: false as const,
    partialLaneCompletionMaySatisfyAllSixI98Bindings: false as const,
    existingCandidateVocabularyMentionMayCloseAuthorityGap: false as const,
    generalKnowledgeInferenceAuthorized: false as const,
    sourceKeMayInferControlCycleFromFiveElementFacts: false as const,
    sourceXingMayInferPunishmentPairsWithoutRegisteredAuthority: false as const,
    sourceWeiMayInferProtectionFromSupportPresence: false as const,
    sourceWeiMayCollapseIntoClashRescue: false as const,
    sourceXingMayCollapseIntoBranchClash: false as const,
    sourceKeStructuralRelationKindRequired: false as const,
    sourceXingStructuralRelationKindRequired: true as const,
    sourceWeiStructuralRelationKindRequired: false as const,
    sourceKeDirectionalEvidenceAdapterRequired: true as const,
    sourceWeiProtectionEffectStateTaxonomyRequired: true as const,
    acquisitionResultMayDirectlyCreateMethodologyDefinition: false as const,
    acquisitionResultMayDirectlyCreateRuleDefinition: false as const,
    acquisitionResultMayDirectlyMutateRegistry: false as const,
    acquisitionResultMayDirectlyAuthorizeExecution: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
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

export function buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(
  i104: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport {
  const common = commonMaterial(i104);
  if (!exactI104Accepted(i104) || i104.candidateSourceId === null) {
    return finalized({
      ...common,
      status: 'I104_UNRESOLVED_OR_INVALID',
      decision: 'AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED',
      candidateSourceId: null,
      blockedTerms: [],
      lanes: [],
      laneCount: 0,
      allThreeBlockedTermsAssignedIndependentLane: false,
      sourceKeLaneReadyForGovernedDiscovery: false,
      sourceXingLaneReadyForGovernedDiscovery: false,
      sourceWeiLaneReadyForGovernedDiscovery: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW',
      notes: [
        'I105 requires exact resolved I104 3/6 vocabulary-binding promotion readiness before splitting the remaining authority-acquisition lanes.',
      ],
    });
  }

  const authorityLanes = lanes();
  return finalized({
    ...common,
    status: 'RESOLVED_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS',
    decision: 'KE_XING_WEI_AUTHORITY_ACQUISITION_LANES_SEPARATED_CROSS_LANE_SUBSTITUTION_BLOCKED',
    candidateSourceId: i104.candidateSourceId,
    blockedTerms: ['克', '刑', '卫'],
    lanes: authorityLanes,
    laneCount: authorityLanes.length,
    allThreeBlockedTermsAssignedIndependentLane: true,
    sourceKeLaneReadyForGovernedDiscovery: true,
    sourceXingLaneReadyForGovernedDiscovery: true,
    sourceWeiLaneReadyForGovernedDiscovery: true,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    notes: [
      '克, 刑, and 卫 are distinct authority gaps. Evidence acquired for one lane cannot satisfy another lane.',
      'Each lane must use governed source intake with original-source inspection and a reproducible locator before any adapter or taxonomy implementation review.',
      'The existing 1995 candidate proves vocabulary relevance but does not by vocabulary mention alone establish the missing control cycle, punishment membership, or generic protection criteria.',
      'Authority acquisition is research intake only and cannot directly create methodology/rule/executable authority.',
      'No activation, persistence, effective-support, settlement, relative-force, precedence, score, or strong/weak verdict is authorized.',
    ],
  });
}
