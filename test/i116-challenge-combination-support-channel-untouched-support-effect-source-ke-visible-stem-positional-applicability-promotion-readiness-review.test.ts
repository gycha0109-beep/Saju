import { describe, expect, test } from 'vitest';
import {
  buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport,
} from '../src/index.js';

function item() {
  return {
    positionalEvidenceId: 'p1',
    sourceDirectionalBindingId: 'b1',
    sourceComponentId: 'year:visible-stem:갑',
    targetComponentId: 'month:visible-stem:기',
    sourcePillarSlot: 'year',
    targetPillarSlot: 'month',
    sourceStem: '갑',
    targetStem: '기',
    sourceElement: '木',
    targetElement: '土',
    relation: '克',
    repositorySlotDistance: 1,
    repositoryPositionTopology: 'ADJACENT_PILLAR_STEMS',
    sourcePositionVocabulary: '邻干',
    sourceQualitativeForceVocabulary: '力大',
    exactDirectionalBindingPreserved: true,
    bothParticipantsVisibleHeavenlyStems: true,
    sourceTargetDirectionPreserved: true,
    exactPositionMappingMatched: true,
    slotDistanceIsTopologyOnly: true,
    qualitativeForceVocabularyPreservedOnly: true,
    interactionEligibility: 'not_determined',
    damageOutcome: 'not_determined',
    damageMagnitude: 'not_determined',
    settlementOutcome: 'not_determined',
    relativeForceVerdict: 'not_determined',
    countsAsPositionalApplicabilityEvidence: true,
    countsAsInteractionEffectOrSettlement: false,
  } as const;
}

function i115(
  overrides: Partial<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport {
  const positionalEvidence = [item()];
  const base = {
    evidenceId: 'i115_i116_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE',
    decision: 'CURRENT_CHART_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED_EFFECT_UNRESOLVED',
    upstreamI111EvidenceId: 'i111_fixture',
    upstreamI114ContractId: 'i114_fixture',
    snapshotId: 'snapshot_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    visibleVisibleDirectionalBindingsEligibleForPositionalEvidence: 1,
    hiddenOrMixedDirectionalBindingsExcluded: 2,
    positionalEvidence,
    positionalEvidenceCount: 1,
    allPositionalEvidenceUsesExactI114Mapping: true,
    allPositionalEvidencePreservesI111Direction: true,
    allPositionalEvidenceUsesVisibleStemPairsOnly: true,
    allPositionalEvidenceKeepsEffectUnresolved: true,
    hiddenStemParticipantEmitted: false,
    rawEarthlyBranchElementEmitted: false,
    reversedDirectionInferenceUsed: false,
    transitiveControlInferenceUsed: false,
    nonDirectionalBindingPromoted: false,
    zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult: false,
    zeroEligibleVisibleVisibleBindingsMayProveNoInteraction: false,
    zeroEligibleVisibleVisibleBindingsMayProveNoDamage: false,
    farStemNoForcePromotedToNoInteraction: false,
    qualitativeForceConvertedToNumericWeight: false,
    slotDistanceConvertedToNumericForceWeight: false,
    positionalEvidencePromotedToInteractionEligibility: false,
    positionalEvidencePromotedToDamageOutcome: false,
    positionalEvidencePromotedToDamageMagnitude: false,
    positionalEvidencePromotedToSettlementOutcome: false,
    positionalEvidencePromotedToRelativeForceVerdict: false,
    visibleStemEffectiveInteractionEligibilityResolved: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    effectiveInteractionSetResolved: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    structuralRelationKindMutationPerformed: false,
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW',
    notes: [],
  } as const;
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport;
}

describe('I116 source 克 visible-stem positional applicability promotion readiness', () => {
  test('closes the visible-stem directional and positional substrate only', () => {
    const report = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS');
    expect(report.decision).toBe('VISIBLE_STEM_POSITIONAL_SUBSTRATE_COMPLETE_EFFECTIVE_INTERACTION_REQUIRES_SEPARATE_METHODOLOGY_REVIEW');
    expect(report.visibleStemDirectionalBindingLayerResolved).toBe(true);
    expect(report.visibleStemPositionalAdapterContractResolved).toBe(true);
    expect(report.visibleStemCurrentChartPositionalEvidenceResolved).toBe(true);
    expect(report.visibleStemPositionalSubstrateComplete).toBe(true);
  });

  test('authorizes only entry into a separate visible-stem effective-interaction methodology review', () => {
    const report = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115());
    expect(report.positionalEvidenceMayEnterEffectiveInteractionMethodologyReview).toBe(true);
    expect(report.authorizedNextReviewScope).toBe('VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW');
    expect(report.visibleStemEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.visibleStemEffectiveInteractionEligibilityMayBeInferredDirectlyFromPositionalEvidence).toBe(false);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW');
  });

  test('keeps positional vocabulary below interaction damage magnitude settlement and relative force', () => {
    const report = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115());
    expect(report.farStemNoForceMayBePromotedToNoInteraction).toBe(false);
    expect(report.qualitativeForceMayBeConvertedToNumericWeight).toBe(false);
    expect(report.slotDistanceMayBeConvertedToNumericForceWeight).toBe(false);
    expect(report.positionalEvidenceMayResolveDamageOutcome).toBe(false);
    expect(report.positionalEvidenceMayResolveDamageMagnitude).toBe(false);
    expect(report.positionalEvidenceMayResolveSettlementOutcome).toBe(false);
    expect(report.positionalEvidenceMayResolveRelativeForce).toBe(false);
  });

  test('keeps the hidden-stem authority lane isolated', () => {
    const report = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115());
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.visibleStemReviewMayBorrowHiddenStemAuthority).toBe(false);
    expect(report.hiddenStemEvidenceMayBorrowVisibleStemPositionRule).toBe(false);
  });

  test('accepts an exact zero-visible-pair I115 result as substrate-complete without inventing absence semantics', () => {
    const empty = i115({
      visibleVisibleDirectionalBindingsEligibleForPositionalEvidence: 0,
      positionalEvidence: [],
      positionalEvidenceCount: 0,
      zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult: true,
    });
    const report = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(empty);
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS');
    expect(report.zeroEligibleVisibleVisibleBindingsAcceptedAsValidEvidenceLayerResult).toBe(true);
    expect(report.visibleStemEffectiveInteractionEligibilityResolved).toBe(false);
  });

  test('fails closed if I115 promotes positional evidence to interaction eligibility', () => {
    const invalid = i115({ positionalEvidencePromotedToInteractionEligibility: true as false });
    const report = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(invalid);
    expect(report.status).toBe('I115_UNRESOLVED_OR_INVALID');
    expect(report.visibleStemPositionalSubstrateComplete).toBe(false);
    expect(report.positionalEvidenceMayEnterEffectiveInteractionMethodologyReview).toBe(false);
  });

  test('fails closed if evidence counts or effect guards are inconsistent', () => {
    const badCount = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115({ positionalEvidenceCount: 2 }));
    expect(badCount.status).toBe('I115_UNRESOLVED_OR_INVALID');
    const badEffect = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115({ i98KeDamageVocabularyEvaluationResolved: true as false }));
    expect(badEffect.status).toBe('I115_UNRESOLVED_OR_INVALID');
  });

  test('is deterministic and preserves I98 settlement production and classifier guards', () => {
    const first = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115());
    const second = buildI116ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReview(i115());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.effectiveInteractionSetResolved).toBe(false);
    expect(first.i98KeDamageVocabularyEvaluationResolved).toBe(false);
    expect(first.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
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
