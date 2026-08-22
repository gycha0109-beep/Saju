import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I98SourceRelationVocabularyTerm, ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport } from './i98-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport } from './i103-challenge-combination-support-channel-untouched-support-effect-existing-substrate-source-vocabulary-binding-evidence.js';

export const I104_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-existing-substrate-source-vocabulary-binding-promotion-readiness-review-v1';

export type I104VocabularyPromotionState =
  | 'VERIFIED_EXISTING_SUBSTRATE_BINDING_EFFECT_UNRESOLVED'
  | 'BLOCKED_NORMATIVE_AUTHORITY_NOT_REGISTERED';

export interface I104VocabularyPromotionItem {
  sourceTerm: I98SourceRelationVocabularyTerm;
  promotionState: I104VocabularyPromotionState;
  exactEvidenceBindingAvailable: boolean;
  normativeAuthorityGapRemaining: boolean;
  effectOrPersistenceSemanticResolved: false;
  eligibleForI98ResolvedVocabularyBinding: boolean;
  blocker: string | null;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS'
    | 'I98_OR_I103_UNRESOLVED_OR_INVALID';
  decision:
    | 'EXISTING_SUBSTRATE_BINDINGS_VERIFIED_FULL_METHODOLOGY_MATERIALIZATION_BLOCKED_BY_KE_XING_WEI_AND_EFFECT_SEMANTICS'
    | 'VOCABULARY_BINDING_PROMOTION_READINESS_NOT_ESTABLISHED';
  upstreamI98ContractId: string;
  upstreamI103EvidenceId: string;
  candidateSourceId: string | null;
  items: readonly I104VocabularyPromotionItem[];
  verifiedExistingSubstrateTerms: readonly I98SourceRelationVocabularyTerm[];
  authorityBlockedTerms: readonly I98SourceRelationVocabularyTerm[];
  verifiedExistingSubstrateTermCount: number;
  authorityBlockedTermCount: number;
  vocabularyBindingProgress: 'PARTIAL_3_OF_6' | 'NONE';
  sourceHeBindingVerified: boolean;
  sourceChongBindingVerified: boolean;
  sourceShengBindingVerified: boolean;
  sourceKeAuthorityStillMissing: boolean;
  sourceXingAuthorityStillMissing: boolean;
  sourceWeiAuthorityStillMissing: boolean;
  existingSubstrateBindingsMayReplaceI98UnresolvedBindingForThoseTerms: boolean;
  allSixI98VocabularyBindingsResolved: false;
  exactDamageVocabularyEvaluationResolved: false;
  supportOrProtectionConditionEvaluationResolved: false;
  noUnresolvedRequiredBindingConditionSatisfied: false;
  canonicalRequiredFactBindingsResolvedForI98Materialization: false;
  partialMethodologyDefinitionMaterializationAuthorized: false;
  researchMethodologyMaterializationAuthorized: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  evidenceBindingMayBePromotedToEffectOutcome: false;
  zeroBindingMayBePromotedToEffectAbsence: false;
  noTrackedRelationTouchMayCoverUnmodeledVocabulary: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE';
  notes: readonly string[];
}

const VERIFIED_TERMS = Object.freeze(['合', '冲', '生'] as const satisfies readonly I98SourceRelationVocabularyTerm[]);
const BLOCKED_TERMS = Object.freeze(['克', '刑', '卫'] as const satisfies readonly I98SourceRelationVocabularyTerm[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_vocabulary_binding_promotion_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI98Accepted(
  i98: ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
): boolean {
  return (
    i98.status === 'RESOLVED_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT' &&
    i98.decision ===
      'CONDITIONAL_PERSISTENCE_RESEARCH_METHODOLOGY_CONTRACT_FROZEN_RELATION_VOCABULARY_BINDING_REQUIRED_BEFORE_MATERIALIZATION' &&
    i98.candidateSourceId !== null &&
    i98.methodologyContractFrozen &&
    i98.reservedMethodologyId === 'M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE' &&
    i98.methodologyStatusCeiling === 'research' &&
    i98.exactRelationVocabularyBindingRequired &&
    i98.allSourceRelationVocabularyBindingsResolved === false &&
    i98.conditionalPersistenceRequiresExactDamageVocabularyEvaluation &&
    i98.conditionalPersistenceRequiresSupportOrProtectionConditionEvaluation &&
    i98.conditionalPersistenceRequiresNoUnresolvedRequiredBinding &&
    i98.noTrackedRelationTouchAloneSufficientForConditionalPersistence === false &&
    i98.supportPresenceAloneSufficientForConditionalPersistence === false &&
    i98.supportDirectionAloneSufficientForConditionalPersistence === false &&
    i98.activeStateMayBeEmitted === false &&
    i98.persistedStateMayBeEmitted === false &&
    i98.effectiveSupportStateMayBeEmitted === false &&
    i98.sourceDamageStateMayBeInventedFromMissingEvidence === false &&
    i98.sourceProtectionStateMayBeInventedFromMissingEvidence === false &&
    i98.researchMethodologyMaterializationAuthorized === false &&
    i98.methodologyOrRulePromotionAuthorized === false &&
    i98.executableAuthorityAuthorized === false &&
    i98.sourceActivationVerdictAuthorized === false &&
    i98.sourcePersistenceVerdictAuthorized === false &&
    i98.sourceEffectiveSupportVerdictAuthorized === false &&
    i98.relativeForceVerdictAuthorized === false &&
    i98.crossRelationPrecedenceAuthorized === false &&
    i98.classificationAuthorized === false &&
    i98.numericScoringAuthorized === false &&
    i98.sourceRelationVocabulary.length === 6 &&
    i98.sourceRelationVocabulary.map((item) => item.sourceTerm).join('|') === '克|合|刑|冲|生|卫'
  );
}

function exactI103Accepted(
  i103: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport,
): boolean {
  return (
    i103.status === 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE' &&
    i103.termSummaries.length === 3 &&
    i103.termSummaries.map((item) => item.sourceTerm).join('|') === VERIFIED_TERMS.join('|') &&
    i103.relationsIndependentlyRecomputedFromPillars &&
    i103.i52RelationContextsIndependentlyVerified &&
    i103.duplicateDirectionalEvidenceCollapsedByInference === false &&
    i103.zeroBindingMayBeTreatedAsPositiveSettlementOutcome === false &&
    i103.zeroBindingMayBeTreatedAsVocabularyAbsence === false &&
    i103.evidenceBindingMeansRelationOutcomeResolved === false &&
    i103.evidenceBindingMeansPersistenceResolved === false &&
    i103.evidenceBindingMeansEffectiveSupportResolved === false &&
    i103.evidenceBindingMeansMethodologyMaterialized === false &&
    i103.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i103.calculationCoreMutationPerformed === false &&
    i103.structuralRelationKindMutationPerformed === false &&
    i103.methodologyDefinitionCreatedByThisGate === false &&
    i103.ruleDefinitionCreatedByThisGate === false &&
    i103.registrySnapshotMutatedByThisGate === false &&
    i103.sourceKeEvidenceMaterialized === false &&
    i103.sourceXingEvidenceMaterialized === false &&
    i103.sourceWeiEvidenceMaterialized === false &&
    i103.sourceActivationVerdictAuthorized === false &&
    i103.sourcePersistenceVerdictAuthorized === false &&
    i103.sourceEffectiveSupportVerdictAuthorized === false &&
    i103.relativeForceVerdictAuthorized === false &&
    i103.crossRelationPrecedenceAuthorized === false &&
    i103.classificationAuthorized === false &&
    i103.numericScoringAuthorized === false &&
    i103.termSummaries.every(
      (item) =>
        item.noBindingMeansEffectAbsent === false &&
        item.noBindingMeansVocabularyAbsentFromChart === false,
    ) &&
    i103.structuralBindings.every(
      (binding) =>
        binding.bindingOutcome === 'not_determined' &&
        binding.damageOutcome === 'not_determined' &&
        binding.persistenceOutcome === 'not_determined' &&
        binding.relativeForceVerdict === 'not_determined' &&
        binding.precedence === 'not_determined' &&
        binding.numericWeight === 'not_assigned',
    ) &&
    i103.resourceGenerationBindings.every(
      (binding) =>
        binding.activationState === 'not_determined' &&
        binding.persistenceState === 'not_determined' &&
        binding.effectiveSupportEffect === 'not_resolved' &&
        binding.relativeForceVerdict === 'not_determined' &&
        binding.precedence === 'not_determined' &&
        binding.numericWeight === 'not_assigned',
    ) &&
    i103.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW'
  );
}

function item(
  sourceTerm: I98SourceRelationVocabularyTerm,
): I104VocabularyPromotionItem {
  if ((VERIFIED_TERMS as readonly string[]).includes(sourceTerm)) {
    return {
      sourceTerm,
      promotionState: 'VERIFIED_EXISTING_SUBSTRATE_BINDING_EFFECT_UNRESOLVED',
      exactEvidenceBindingAvailable: true,
      normativeAuthorityGapRemaining: false,
      effectOrPersistenceSemanticResolved: false,
      eligibleForI98ResolvedVocabularyBinding: true,
      blocker: null,
    };
  }

  const blocker =
    sourceTerm === '克'
      ? 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED'
      : sourceTerm === '刑'
        ? 'EXACT_BRANCH_PUNISHMENT_MEMBERSHIP_AND_IDENTITY_AUTHORITY_NOT_REGISTERED'
        : 'GENERIC_SOURCE_PROTECTION_CRITERIA_AND_EVIDENCE_CONTRACT_NOT_REGISTERED';
  return {
    sourceTerm,
    promotionState: 'BLOCKED_NORMATIVE_AUTHORITY_NOT_REGISTERED',
    exactEvidenceBindingAvailable: false,
    normativeAuthorityGapRemaining: true,
    effectOrPersistenceSemanticResolved: false,
    eligibleForI98ResolvedVocabularyBinding: false,
    blocker,
  };
}

function commonMaterial(
  i98: ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
  i103: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport,
) {
  return {
    reviewVersion:
      I104_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW_VERSION,
    upstreamI98ContractId: i98.contractId,
    upstreamI103EvidenceId: i103.evidenceId,
    allSixI98VocabularyBindingsResolved: false as const,
    exactDamageVocabularyEvaluationResolved: false as const,
    supportOrProtectionConditionEvaluationResolved: false as const,
    noUnresolvedRequiredBindingConditionSatisfied: false as const,
    canonicalRequiredFactBindingsResolvedForI98Materialization: false as const,
    partialMethodologyDefinitionMaterializationAuthorized: false as const,
    researchMethodologyMaterializationAuthorized: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    evidenceBindingMayBePromotedToEffectOutcome: false as const,
    zeroBindingMayBePromotedToEffectAbsence: false as const,
    noTrackedRelationTouchMayCoverUnmodeledVocabulary: false as const,
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

export function buildI104ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReview(
  i98: ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
  i103: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport {
  const common = commonMaterial(i98, i103);
  if (!exactI98Accepted(i98) || !exactI103Accepted(i103) || i98.candidateSourceId === null) {
    return finalized({
      ...common,
      status: 'I98_OR_I103_UNRESOLVED_OR_INVALID',
      decision: 'VOCABULARY_BINDING_PROMOTION_READINESS_NOT_ESTABLISHED',
      candidateSourceId: null,
      items: [],
      verifiedExistingSubstrateTerms: [],
      authorityBlockedTerms: [],
      verifiedExistingSubstrateTermCount: 0,
      authorityBlockedTermCount: 0,
      vocabularyBindingProgress: 'NONE',
      sourceHeBindingVerified: false,
      sourceChongBindingVerified: false,
      sourceShengBindingVerified: false,
      sourceKeAuthorityStillMissing: false,
      sourceXingAuthorityStillMissing: false,
      sourceWeiAuthorityStillMissing: false,
      existingSubstrateBindingsMayReplaceI98UnresolvedBindingForThoseTerms: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE',
      notes: [
        'I104 requires the exact frozen I98 methodology contract and exact fail-closed I103 binding evidence before promotion readiness may be assessed.',
      ],
    });
  }

  const items = i98.sourceRelationVocabulary.map((entry) => item(entry.sourceTerm));
  return finalized({
    ...common,
    status: 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS',
    decision:
      'EXISTING_SUBSTRATE_BINDINGS_VERIFIED_FULL_METHODOLOGY_MATERIALIZATION_BLOCKED_BY_KE_XING_WEI_AND_EFFECT_SEMANTICS',
    candidateSourceId: i98.candidateSourceId,
    items,
    verifiedExistingSubstrateTerms: VERIFIED_TERMS,
    authorityBlockedTerms: BLOCKED_TERMS,
    verifiedExistingSubstrateTermCount: VERIFIED_TERMS.length,
    authorityBlockedTermCount: BLOCKED_TERMS.length,
    vocabularyBindingProgress: 'PARTIAL_3_OF_6',
    sourceHeBindingVerified: true,
    sourceChongBindingVerified: true,
    sourceShengBindingVerified: true,
    sourceKeAuthorityStillMissing: true,
    sourceXingAuthorityStillMissing: true,
    sourceWeiAuthorityStillMissing: true,
    existingSubstrateBindingsMayReplaceI98UnresolvedBindingForThoseTerms: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    notes: [
      'I103 is sufficient to replace the I98 unresolved vocabulary-binding placeholder for 合, 冲, and 生 at the evidence-binding layer only.',
      '克, 刑, and 卫 remain unresolved mandatory vocabulary bindings, so the I98 no-unresolved-required-binding condition is not satisfied and MethodologyDefinition materialization remains blocked.',
      'Even the three verified terms retain unresolved effect/persistence semantics; source-vocabulary evidence binding is not a damage, persistence, protection, or effective-support verdict.',
      'Partial MethodologyDefinition materialization is not authorized because I98 requires a coherent methodology contract with no unresolved mandatory binding rather than a half-materialized executable surface.',
      'NO_TRACKED_RELATION_TOUCH cannot cover unmodeled 克, 刑, or 卫 and zero I103 bindings cannot be promoted into effect absence.',
      'No methodology/rule/registry mutation, activation/persistence/effective-support verdict, relative-force/settlement/precedence verdict, numeric scoring, or strong/weak classification is authorized.',
    ],
  });
}
