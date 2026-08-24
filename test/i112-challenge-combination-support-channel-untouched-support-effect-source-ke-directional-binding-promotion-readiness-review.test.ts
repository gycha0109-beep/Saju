import { describe, expect, test } from 'vitest';
import {
  buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
} from '../src/index.js';

function i111(
  overrides: Partial<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport {
  const base = {
    evidenceId: 'i111_i112_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING',
    decision: 'CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED',
    upstreamI110ContractId: 'i110_fixture',
    snapshotId: 'snapshot_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    currentChartComponentSubstrateResolved: true,
    currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership: true,
    currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping: true,
    components: [
      {
        componentId: 'year:visible-stem:갑',
        pillarSlot: 'year',
        componentScope: 'VISIBLE_STEM',
        stem: '갑',
        canonicalElement: '목',
        contractElement: '木',
        exactComponentIdentityResolved: true,
        exactElementIdentityResolved: true,
      },
      {
        componentId: 'month:hidden-stem:기',
        pillarSlot: 'month',
        componentScope: 'EARTHLY_BRANCH_HIDDEN_STEM',
        stem: '기',
        canonicalElement: '토',
        contractElement: '土',
        exactComponentIdentityResolved: true,
        exactElementIdentityResolved: true,
      },
    ],
    componentCount: 2,
    directionalBindings: [
      {
        bindingId: 'ke-direction-fixture',
        sourceComponentId: 'year:visible-stem:갑',
        targetComponentId: 'month:hidden-stem:기',
        sourcePillarSlot: 'year',
        targetPillarSlot: 'month',
        sourceComponentScope: 'VISIBLE_STEM',
        targetComponentScope: 'EARTHLY_BRANCH_HIDDEN_STEM',
        sourceStem: '갑',
        targetStem: '기',
        sourceElement: '木',
        targetElement: '土',
        relation: '克',
        exactCycleEdgeMatched: true,
        sourceToTargetDirectionVerified: true,
        interactionEligibility: 'not_determined',
        positionalForceVerdict: 'not_determined',
        damageOutcome: 'not_determined',
        damageMagnitude: 'not_determined',
        settlementOutcome: 'not_determined',
        countsAsDirectionalVocabularyBinding: true,
        countsAsDamageOrEffectSettlement: false,
      },
    ],
    directionalBindingCount: 1,
    allBindingsUseExactI110CycleEdge: true,
    allBindingsPreserveSourceTargetComponentIdentity: true,
    allBindingsPreservePillarPosition: true,
    rawEarthlyBranchElementUsedAsParticipant: false,
    reversedDirectionInferenceUsed: false,
    transitiveControlInferenceUsed: false,
    generalKnowledgeFallbackUsed: false,
    nonCyclePairMaterialized: false,
    zeroBindingsMeansNoContractedDirectionalPairWithinResolvedComponents: false,
    zeroBindingsMayProveNoDamageOutcome: false,
    zeroBindingsMayProveNoEffectiveInteraction: false,
    interactionEligibilityResolvedByThisGate: false,
    positionalForceResolvedByThisGate: false,
    damageOutcomeResolvedByThisGate: false,
    damageMagnitudeResolvedByThisGate: false,
    settlementOutcomeResolvedByThisGate: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    structuralRelationKindMutationPerformed: false,
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW',
    notes: [],
  } as const;
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport;
}

describe('I112 source 克 directional binding promotion readiness', () => {
  test('resolves the directional vocabulary-binding layer but not I98 damage semantics', () => {
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(i111());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS');
    expect(report.decision).toBe('KE_DIRECTIONAL_BINDING_LAYER_RESOLVED_I98_DAMAGE_VOCABULARY_PROMOTION_BLOCKED_BY_INTERACTION_ELIGIBILITY');
    expect(report.directionalVocabularyBindingLayerResolved).toBe(true);
    expect(report.sourceKeDirectionalAuthorityAndBindingGapClosed).toBe(true);
    expect(report.i98SourceTerm).toBe('克');
    expect(report.i98SemanticRole).toBe('DAMAGE');
    expect(report.i98KeDamageVocabularyEvaluationResolved).toBe(false);
  });

  test('retires the old authority-direction blocker and exposes the narrower next blocker', () => {
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(i111());
    expect(report.priorKeAuthorityBlocker).toBe('EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED');
    expect(report.priorKeAuthorityBlockerResolved).toBe(true);
    expect(report.currentBlockingGap).toBe('SOURCE_KE_EFFECTIVE_INTERACTION_ELIGIBILITY_AND_POSITIONAL_APPLICABILITY_AUTHORITY_UNRESOLVED');
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW');
  });

  test('does not treat a directional pair as an effective interaction', () => {
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(i111());
    expect(report.interactionEligibilityAuthorityEstablished).toBe(false);
    expect(report.positionalInteractionApplicabilityAuthorityEstablished).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.directionalBindingMayBePromotedToEffectiveInteraction).toBe(false);
    expect(report.interactionEligibilityMayBeInferredFromElementPairAlone).toBe(false);
    expect(report.interactionEligibilityMayBeInferredFromSameChartCoPresence).toBe(false);
    expect(report.positionalApplicabilityMayBeInferredFromPillarDistanceAlone).toBe(false);
    expect(report.hiddenStemMembershipMayBeTreatedAsActivatedInteraction).toBe(false);
  });

  test('keeps damage magnitude settlement and I98 materialization blocked', () => {
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(i111());
    expect(report.directionalBindingAloneSatisfiesI98DamageVocabularyEvaluation).toBe(false);
    expect(report.directionalBindingMayBePromotedToDamageOutcome).toBe(false);
    expect(report.directionalBindingMayBePromotedToDamageMagnitude).toBe(false);
    expect(report.directionalBindingMayBePromotedToSettlementOutcome).toBe(false);
    expect(report.i98ExactDamageVocabularyEvaluationReady).toBe(false);
    expect(report.i98AllSixVocabularyBindingsResolved).toBe(false);
    expect(report.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
  });

  test('accepts a resolved zero-binding evidence-layer result without inferring no damage', () => {
    const upstream = i111({
      directionalBindings: [],
      directionalBindingCount: 0,
      zeroBindingsMeansNoContractedDirectionalPairWithinResolvedComponents: true,
    });
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(upstream);
    expect(report.status).toBe('RESOLVED_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS');
    expect(report.directionalVocabularyBindingCount).toBe(0);
    expect(report.zeroDirectionalBindingResultStillValidEvidenceLayerResult).toBe(true);
    expect(report.zeroDirectionalBindingMayProveNoDamage).toBe(false);
    expect(report.zeroDirectionalBindingMayProveNoEffectiveInteraction).toBe(false);
  });

  test('fails closed if I111 claims interaction eligibility resolution', () => {
    const upstream = i111({ interactionEligibilityResolvedByThisGate: true as false });
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(upstream);
    expect(report.status).toBe('I111_UNRESOLVED_OR_INVALID');
    expect(report.directionalVocabularyBindingLayerResolved).toBe(false);
    expect(report.currentBlockingGap).toBe('UPSTREAM_I111_INVALID');
  });

  test('fails closed if an I111 binding is promoted to damage settlement', () => {
    const upstream = i111();
    const binding = upstream.directionalBindings[0];
    if (binding === undefined) throw new Error('fixture binding missing');
    const invalid = i111({
      directionalBindings: [
        { ...binding, countsAsDamageOrEffectSettlement: true as false },
      ],
    });
    const report = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(invalid);
    expect(report.status).toBe('I111_UNRESOLVED_OR_INVALID');
  });

  test('is deterministic and keeps all settlement scoring classification guards closed', () => {
    const first = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(i111());
    const second = buildI112ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReview(i111());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.rawEarthlyBranchDirectControlBindingAuthorized).toBe(false);
    expect(first.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
    expect(first.structuralRelationKindMutationAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.clashSettlementAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
