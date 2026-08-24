import { describe, expect, test } from 'vitest';
import {
  buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport,
} from '../src/index.js';

const SOURCE_ID = 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515';

function i114(
  overrides: Partial<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport {
  const mappings = [
    {
      sourcePositionVocabulary: '邻干',
      sourceQualitativeForceVocabulary: '力大',
      repositorySlotDistance: 1,
      repositoryPositionTopology: 'ADJACENT_PILLAR_STEMS',
      distanceIsTopologyOnly: true,
      distanceIsForceWeight: false,
      qualitativeForceLabelIsNumericWeight: false,
      mayEmitNoInteractionVerdict: false,
      mayEmitDamageOutcome: false,
      mayEmitDamageMagnitude: false,
    },
    {
      sourcePositionVocabulary: '隔干',
      sourceQualitativeForceVocabulary: '次之',
      repositorySlotDistance: 2,
      repositoryPositionTopology: 'ONE_INTERVENING_PILLAR_STEM',
      distanceIsTopologyOnly: true,
      distanceIsForceWeight: false,
      qualitativeForceLabelIsNumericWeight: false,
      mayEmitNoInteractionVerdict: false,
      mayEmitDamageOutcome: false,
      mayEmitDamageMagnitude: false,
    },
    {
      sourcePositionVocabulary: '远干',
      sourceQualitativeForceVocabulary: '无力',
      repositorySlotDistance: 3,
      repositoryPositionTopology: 'TWO_INTERVENING_PILLAR_STEMS',
      distanceIsTopologyOnly: true,
      distanceIsForceWeight: false,
      qualitativeForceLabelIsNumericWeight: false,
      mayEmitNoInteractionVerdict: false,
      mayEmitDamageOutcome: false,
      mayEmitDamageMagnitude: false,
    },
  ] as const;
  const base = {
    contractId: 'i114_i115_fixture',
    contractVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_ADAPTER_CONTRACT',
    decision: 'VISIBLE_STEM_POSITIONAL_TOPOLOGY_ADAPTER_CONTRACT_FROZEN_NO_EFFECT_OR_INTERACTION_VERDICT',
    upstreamI113ReviewId: 'i113_fixture',
    candidateSourceId: SOURCE_ID,
    sourceTerm: '克',
    componentScope: 'VISIBLE_HEAVENLY_STEM_PAIR_ONLY',
    sourcePositionVocabulary: ['邻干', '隔干', '远干'],
    sourceQualitativeForceVocabulary: ['力大', '次之', '无力'],
    repositoryPillarOrder: ['year', 'month', 'day', 'hour'],
    positionMappings: mappings,
    positionMappingCount: 3,
    repositorySlotDistanceMappingContractFrozen: true,
    repositorySlotDistanceMayBeDerivedByAbsolutePillarIndexDifference: true,
    sourceVocabularyMayBeMappedToRepositorySlotDistanceByThisContract: true,
    positionalEvidenceAdapterImplementationAuthorized: true,
    currentChartPositionalEvidenceMaterializedByThisGate: false,
    pairMustAlreadyBeExactDirectionalKeBinding: true,
    bothParticipantsMustBeVisibleHeavenlyStems: true,
    selfPairAllowed: false,
    sourceTargetDirectionMustRemainFromDirectionalBinding: true,
    rawEarthlyBranchElementMayParticipate: false,
    hiddenStemParticipantMayParticipate: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    positionalTopologyIsInteractionEligibilityVerdict: false,
    positionalTopologyIsDamageVerdict: false,
    positionalTopologyIsDamageMagnitude: false,
    qualitativeForceLabelsArePreservedSourceVocabularyOnly: true,
    farStemNoForceMayBePromotedToNoInteraction: false,
    qualitativeForceMayBeConvertedToNumericWeight: false,
    repositorySlotDistanceMayBeConvertedToNumericForceWeight: false,
    positionalEvidenceMayResolveGlobalRelativeForce: false,
    visibleStemEffectiveInteractionEligibilityAuthorized: false,
    effectiveInteractionSetResolved: false,
    damageOutcomeAuthorized: false,
    damageMagnitudeAuthorized: false,
    settlementOutcomeAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    structuralRelationKindMutationAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE',
    notes: [],
  } as const;
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport;
}

function binding(
  id: string,
  sourceSlot: 'year' | 'month' | 'day' | 'hour',
  targetSlot: 'year' | 'month' | 'day' | 'hour',
  sourceScope: 'VISIBLE_STEM' | 'EARTHLY_BRANCH_HIDDEN_STEM' = 'VISIBLE_STEM',
  targetScope: 'VISIBLE_STEM' | 'EARTHLY_BRANCH_HIDDEN_STEM' = 'VISIBLE_STEM',
) {
  return {
    bindingId: id,
    sourceComponentId: `${sourceSlot}:${sourceScope}:갑`,
    targetComponentId: `${targetSlot}:${targetScope}:기`,
    sourcePillarSlot: sourceSlot,
    targetPillarSlot: targetSlot,
    sourceComponentScope: sourceScope,
    targetComponentScope: targetScope,
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
  } as const;
}

function i111(
  overrides: Partial<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport {
  const bindings = [
    binding('b-adjacent', 'year', 'month'),
    binding('b-intervening', 'year', 'day'),
    binding('b-far', 'year', 'hour'),
    binding('b-hidden-excluded', 'month', 'day', 'VISIBLE_STEM', 'EARTHLY_BRANCH_HIDDEN_STEM'),
  ];
  const base = {
    evidenceId: 'i111_i115_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING',
    decision: 'CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED',
    upstreamI110ContractId: 'i110_fixture',
    snapshotId: 'snapshot_i115_fixture',
    candidateSourceId: SOURCE_ID,
    currentChartComponentSubstrateResolved: true,
    currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership: true,
    currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping: true,
    components: [],
    componentCount: 0,
    directionalBindings: bindings,
    directionalBindingCount: bindings.length,
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

describe('I115 source 克 visible-stem positional applicability evidence', () => {
  test('materializes only visible-visible directional 克 bindings', () => {
    const report = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE');
    expect(report.decision).toBe('CURRENT_CHART_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED_EFFECT_UNRESOLVED');
    expect(report.visibleVisibleDirectionalBindingsEligibleForPositionalEvidence).toBe(3);
    expect(report.hiddenOrMixedDirectionalBindingsExcluded).toBe(1);
    expect(report.positionalEvidenceCount).toBe(3);
    expect(report.hiddenStemParticipantEmitted).toBe(false);
  });

  test('materializes exact 邻干 隔干 远干 topology from slot distance', () => {
    const report = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    const ordered = [...report.positionalEvidence].sort((a, b) => a.repositorySlotDistance - b.repositorySlotDistance);
    expect(ordered.map((item) => [item.repositorySlotDistance, item.sourcePositionVocabulary, item.sourceQualitativeForceVocabulary, item.repositoryPositionTopology])).toEqual([
      [1, '邻干', '力大', 'ADJACENT_PILLAR_STEMS'],
      [2, '隔干', '次之', 'ONE_INTERVENING_PILLAR_STEM'],
      [3, '远干', '无力', 'TWO_INTERVENING_PILLAR_STEMS'],
    ]);
  });

  test('preserves the exact I111 directional binding identity and source-target direction', () => {
    const report = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    expect(report.allPositionalEvidencePreservesI111Direction).toBe(true);
    expect(report.allPositionalEvidenceUsesVisibleStemPairsOnly).toBe(true);
    expect(report.positionalEvidence.map((item) => item.sourceDirectionalBindingId).sort()).toEqual([
      'b-adjacent',
      'b-far',
      'b-intervening',
    ]);
    expect(report.positionalEvidence.every((item) => item.exactDirectionalBindingPreserved && item.sourceTargetDirectionPreserved)).toBe(true);
  });

  test('keeps every positional evidence item below interaction damage magnitude settlement and relative-force verdicts', () => {
    const report = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    expect(report.allPositionalEvidenceKeepsEffectUnresolved).toBe(true);
    expect(report.positionalEvidence.every((item) => item.interactionEligibility === 'not_determined')).toBe(true);
    expect(report.positionalEvidence.every((item) => item.damageOutcome === 'not_determined')).toBe(true);
    expect(report.positionalEvidence.every((item) => item.damageMagnitude === 'not_determined')).toBe(true);
    expect(report.positionalEvidence.every((item) => item.settlementOutcome === 'not_determined')).toBe(true);
    expect(report.positionalEvidence.every((item) => item.relativeForceVerdict === 'not_determined')).toBe(true);
    expect(report.positionalEvidence.every((item) => item.countsAsInteractionEffectOrSettlement === false)).toBe(true);
  });

  test('does not turn 远干无力 or slot distance into no-interaction or numeric force', () => {
    const report = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    expect(report.farStemNoForcePromotedToNoInteraction).toBe(false);
    expect(report.qualitativeForceConvertedToNumericWeight).toBe(false);
    expect(report.slotDistanceConvertedToNumericForceWeight).toBe(false);
    expect(report.positionalEvidencePromotedToInteractionEligibility).toBe(false);
    expect(report.positionalEvidencePromotedToRelativeForceVerdict).toBe(false);
  });

  test('accepts zero visible-visible bindings without inferring no interaction or no damage', () => {
    const onlyMixed = [binding('mixed-only', 'year', 'month', 'VISIBLE_STEM', 'EARTHLY_BRANCH_HIDDEN_STEM')];
    const report = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(
      i114(),
      i111({ directionalBindings: onlyMixed, directionalBindingCount: 1 }),
    );
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE');
    expect(report.positionalEvidenceCount).toBe(0);
    expect(report.zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult).toBe(true);
    expect(report.zeroEligibleVisibleVisibleBindingsMayProveNoInteraction).toBe(false);
    expect(report.zeroEligibleVisibleVisibleBindingsMayProveNoDamage).toBe(false);
  });

  test('fails closed on source identity mismatch or invalid I114 mapping', () => {
    const mismatched = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(
      i114({ candidateSourceId: 'source_other' }),
      i111(),
    );
    expect(mismatched.status).toBe('I111_OR_I114_UNRESOLVED_OR_INVALID');
    expect(mismatched.positionalEvidence).toEqual([]);

    const contract = i114();
    const invalidMapping = contract.positionMappings.map((item) =>
      item.repositorySlotDistance === 1 ? { ...item, distanceIsForceWeight: true as false } : item,
    );
    const invalid = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(
      i114({ positionMappings: invalidMapping }),
      i111(),
    );
    expect(invalid.status).toBe('I111_OR_I114_UNRESOLVED_OR_INVALID');
  });

  test('is deterministic and preserves hidden-stem I98 settlement and classifier guards', () => {
    const first = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    const second = buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(i114(), i111());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(first.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(first.effectiveInteractionSetResolved).toBe(false);
    expect(first.i98KeDamageVocabularyEvaluationResolved).toBe(false);
    expect(first.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(first.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
    expect(first.structuralRelationKindMutationPerformed).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.clashSettlementAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW');
  });
});
