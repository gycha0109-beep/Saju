import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport } from './i111-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-evidence-binding-evidence.js';

export const I112_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-binding-promotion-readiness-review-v1';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS'
    | 'I111_UNRESOLVED_OR_INVALID';
  decision:
    | 'KE_DIRECTIONAL_BINDING_LAYER_RESOLVED_I98_DAMAGE_VOCABULARY_PROMOTION_BLOCKED_BY_INTERACTION_ELIGIBILITY'
    | 'KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_NOT_ESTABLISHED';
  upstreamI111EvidenceId: string;
  snapshotId: string;
  candidateSourceId: string | null;
  currentChartComponentSubstrateResolved: boolean;
  directionalVocabularyBindingLayerResolved: boolean;
  directionalVocabularyBindingCount: number;
  zeroDirectionalBindingResultStillValidEvidenceLayerResult: boolean;
  zeroDirectionalBindingMayProveNoDamage: false;
  zeroDirectionalBindingMayProveNoEffectiveInteraction: false;
  exactFiveElementControlCycleAuthorityResolved: boolean;
  sourceLocalControlDirectionAuthorityResolved: boolean;
  sourceComponentIdentityBindingResolved: boolean;
  targetComponentIdentityBindingResolved: boolean;
  branchHiddenStemScopeBindingResolved: boolean;
  rawEarthlyBranchDirectControlBindingAuthorized: false;
  sourceKeDirectionalAuthorityAndBindingGapClosed: boolean;
  priorKeAuthorityBlocker:
    | 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED'
    | null;
  priorKeAuthorityBlockerResolved: boolean;
  i98SourceTerm: '克' | null;
  i98SemanticRole: 'DAMAGE' | null;
  directionalBindingAloneSatisfiesI98DamageVocabularyEvaluation: false;
  interactionEligibilityAuthorityEstablished: false;
  positionalInteractionApplicabilityAuthorityEstablished: false;
  effectiveInteractionSetResolved: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ExactDamageVocabularyEvaluationReady: false;
  i98AllSixVocabularyBindingsResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  currentBlockingGap:
    | 'SOURCE_KE_EFFECTIVE_INTERACTION_ELIGIBILITY_AND_POSITIONAL_APPLICABILITY_AUTHORITY_UNRESOLVED'
    | 'UPSTREAM_I111_INVALID';
  directionalBindingMayBePromotedToEffectiveInteraction: false;
  directionalBindingMayBePromotedToDamageOutcome: false;
  directionalBindingMayBePromotedToDamageMagnitude: false;
  directionalBindingMayBePromotedToSettlementOutcome: false;
  interactionEligibilityMayBeInferredFromElementPairAlone: false;
  interactionEligibilityMayBeInferredFromSameChartCoPresence: false;
  positionalApplicabilityMayBeInferredFromPillarDistanceAlone: false;
  hiddenStemMembershipMayBeTreatedAsActivatedInteraction: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  structuralRelationKindMutationAuthorized: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_directional_binding_promotion_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI111Accepted(
  i111: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
): boolean {
  return (
    i111.status === 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING' &&
    i111.decision ===
      'CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED' &&
    i111.candidateSourceId !== null &&
    i111.currentChartComponentSubstrateResolved &&
    i111.currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership &&
    i111.currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping &&
    i111.componentCount === i111.components.length &&
    i111.directionalBindingCount === i111.directionalBindings.length &&
    i111.components.every(
      (component) =>
        component.exactComponentIdentityResolved && component.exactElementIdentityResolved,
    ) &&
    i111.directionalBindings.every(
      (binding) =>
        binding.exactCycleEdgeMatched &&
        binding.sourceToTargetDirectionVerified &&
        binding.interactionEligibility === 'not_determined' &&
        binding.positionalForceVerdict === 'not_determined' &&
        binding.damageOutcome === 'not_determined' &&
        binding.damageMagnitude === 'not_determined' &&
        binding.settlementOutcome === 'not_determined' &&
        binding.countsAsDirectionalVocabularyBinding &&
        binding.countsAsDamageOrEffectSettlement === false,
    ) &&
    i111.allBindingsUseExactI110CycleEdge &&
    i111.allBindingsPreserveSourceTargetComponentIdentity &&
    i111.allBindingsPreservePillarPosition &&
    i111.rawEarthlyBranchElementUsedAsParticipant === false &&
    i111.reversedDirectionInferenceUsed === false &&
    i111.transitiveControlInferenceUsed === false &&
    i111.generalKnowledgeFallbackUsed === false &&
    i111.nonCyclePairMaterialized === false &&
    i111.zeroBindingsMayProveNoDamageOutcome === false &&
    i111.zeroBindingsMayProveNoEffectiveInteraction === false &&
    i111.interactionEligibilityResolvedByThisGate === false &&
    i111.positionalForceResolvedByThisGate === false &&
    i111.damageOutcomeResolvedByThisGate === false &&
    i111.damageMagnitudeResolvedByThisGate === false &&
    i111.settlementOutcomeResolvedByThisGate === false &&
    i111.sourceActivationVerdictAuthorized === false &&
    i111.sourcePersistenceVerdictAuthorized === false &&
    i111.sourceEffectiveSupportVerdictAuthorized === false &&
    i111.relativeForceVerdictAuthorized === false &&
    i111.clashSettlementAuthorized === false &&
    i111.crossRelationPrecedenceAuthorized === false &&
    i111.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i111.structuralRelationKindMutationPerformed === false &&
    i111.methodologyDefinitionCreatedByThisGate === false &&
    i111.ruleDefinitionCreatedByThisGate === false &&
    i111.registrySnapshotMutatedByThisGate === false &&
    i111.classificationAuthorized === false &&
    i111.numericScoringAuthorized === false &&
    i111.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW'
  );
}

function commonMaterial(
  i111: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
) {
  return {
    reviewVersion:
      I112_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW_VERSION,
    upstreamI111EvidenceId: i111.evidenceId,
    snapshotId: i111.snapshotId,
    zeroDirectionalBindingMayProveNoDamage: false as const,
    zeroDirectionalBindingMayProveNoEffectiveInteraction: false as const,
    rawEarthlyBranchDirectControlBindingAuthorized: false as const,
    directionalBindingAloneSatisfiesI98DamageVocabularyEvaluation: false as const,
    interactionEligibilityAuthorityEstablished: false as const,
    positionalInteractionApplicabilityAuthorityEstablished: false as const,
    effectiveInteractionSetResolved: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ExactDamageVocabularyEvaluationReady: false as const,
    i98AllSixVocabularyBindingsResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    directionalBindingMayBePromotedToEffectiveInteraction: false as const,
    directionalBindingMayBePromotedToDamageOutcome: false as const,
    directionalBindingMayBePromotedToDamageMagnitude: false as const,
    directionalBindingMayBePromotedToSettlementOutcome: false as const,
    interactionEligibilityMayBeInferredFromElementPairAlone: false as const,
    interactionEligibilityMayBeInferredFromSameChartCoPresence: false as const,
    positionalApplicabilityMayBeInferredFromPillarDistanceAlone: false as const,
    hiddenStemMembershipMayBeTreatedAsActivatedInteraction: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    structuralRelationKindMutationAuthorized: false as const,
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

export function buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(
  i111: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport {
  const common = commonMaterial(i111);

  if (!exactI111Accepted(i111)) {
    return finalized({
      ...common,
      status: 'I111_UNRESOLVED_OR_INVALID',
      decision: 'KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_NOT_ESTABLISHED',
      candidateSourceId: null,
      currentChartComponentSubstrateResolved: false,
      directionalVocabularyBindingLayerResolved: false,
      directionalVocabularyBindingCount: 0,
      zeroDirectionalBindingResultStillValidEvidenceLayerResult: false,
      exactFiveElementControlCycleAuthorityResolved: false,
      sourceLocalControlDirectionAuthorityResolved: false,
      sourceComponentIdentityBindingResolved: false,
      targetComponentIdentityBindingResolved: false,
      branchHiddenStemScopeBindingResolved: false,
      sourceKeDirectionalAuthorityAndBindingGapClosed: false,
      priorKeAuthorityBlocker: null,
      priorKeAuthorityBlockerResolved: false,
      i98SourceTerm: null,
      i98SemanticRole: null,
      currentBlockingGap: 'UPSTREAM_I111_INVALID',
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE',
      notes: [
        'I112 remains fail-closed unless I111 provides exact current-chart component-level 克 directional vocabulary binding evidence while every interaction/effect guard remains unresolved.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS',
    decision:
      'KE_DIRECTIONAL_BINDING_LAYER_RESOLVED_I98_DAMAGE_VOCABULARY_PROMOTION_BLOCKED_BY_INTERACTION_ELIGIBILITY',
    candidateSourceId: i111.candidateSourceId,
    currentChartComponentSubstrateResolved: true,
    directionalVocabularyBindingLayerResolved: true,
    directionalVocabularyBindingCount: i111.directionalBindingCount,
    zeroDirectionalBindingResultStillValidEvidenceLayerResult: true,
    exactFiveElementControlCycleAuthorityResolved: true,
    sourceLocalControlDirectionAuthorityResolved: true,
    sourceComponentIdentityBindingResolved: true,
    targetComponentIdentityBindingResolved: true,
    branchHiddenStemScopeBindingResolved: true,
    sourceKeDirectionalAuthorityAndBindingGapClosed: true,
    priorKeAuthorityBlocker:
      'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED',
    priorKeAuthorityBlockerResolved: true,
    i98SourceTerm: '克',
    i98SemanticRole: 'DAMAGE',
    currentBlockingGap:
      'SOURCE_KE_EFFECTIVE_INTERACTION_ELIGIBILITY_AND_POSITIONAL_APPLICABILITY_AUTHORITY_UNRESOLVED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    notes: [
      'I108 through I111 resolve the former 克 authority-and-directional-binding gap at the research evidence layer. The old missing-control-cycle/source-local-direction blocker may therefore be retired for this path.',
      'I98, however, uses 克 in a DAMAGE semantic role. A potential component-level control direction does not establish that the pair is an applicable effective interaction in the current chart.',
      'The next authority gap is interaction eligibility and positional applicability: which visible/hidden component pairs may count as an actual 克 interaction under source-governed positional conditions.',
      'Element-pair membership, same-chart co-presence, pillar distance alone, or hidden-stem membership alone may not be promoted into effective interaction eligibility.',
      'Even after interaction eligibility is resolved, damage outcome and magnitude remain separate later questions; I112 does not authorize either.',
      'I98 methodology materialization remains blocked, and 刑/卫 authority gaps remain independently unresolved.',
    ],
  });
}
