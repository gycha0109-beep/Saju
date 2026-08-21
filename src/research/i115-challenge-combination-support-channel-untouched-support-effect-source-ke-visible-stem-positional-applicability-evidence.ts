import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
  I111KeDirectionalBindingEvidence,
} from './i111-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-evidence-binding-evidence.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport,
  I114RepositoryPositionTopology,
  I114SourcePositionVocabulary,
  I114SourceQualitativeForceVocabulary,
  I114VisibleStemPositionMapping,
} from './i114-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-positional-applicability-adapter-contract.js';

export const I115_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-positional-applicability-evidence-v1';

export interface I115VisibleStemPositionalApplicabilityEvidence {
  positionalEvidenceId: string;
  sourceDirectionalBindingId: string;
  sourceComponentId: string;
  targetComponentId: string;
  sourcePillarSlot: I111KeDirectionalBindingEvidence['sourcePillarSlot'];
  targetPillarSlot: I111KeDirectionalBindingEvidence['targetPillarSlot'];
  sourceStem: I111KeDirectionalBindingEvidence['sourceStem'];
  targetStem: I111KeDirectionalBindingEvidence['targetStem'];
  sourceElement: I111KeDirectionalBindingEvidence['sourceElement'];
  targetElement: I111KeDirectionalBindingEvidence['targetElement'];
  relation: '克';
  repositorySlotDistance: 1 | 2 | 3;
  repositoryPositionTopology: I114RepositoryPositionTopology;
  sourcePositionVocabulary: I114SourcePositionVocabulary;
  sourceQualitativeForceVocabulary: I114SourceQualitativeForceVocabulary;
  exactDirectionalBindingPreserved: true;
  bothParticipantsVisibleHeavenlyStems: true;
  sourceTargetDirectionPreserved: true;
  exactPositionMappingMatched: true;
  slotDistanceIsTopologyOnly: true;
  qualitativeForceVocabularyPreservedOnly: true;
  interactionEligibility: 'not_determined';
  damageOutcome: 'not_determined';
  damageMagnitude: 'not_determined';
  settlementOutcome: 'not_determined';
  relativeForceVerdict: 'not_determined';
  countsAsPositionalApplicabilityEvidence: true;
  countsAsInteractionEffectOrSettlement: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE'
    | 'I111_OR_I114_UNRESOLVED_OR_INVALID';
  decision:
    | 'CURRENT_CHART_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED_EFFECT_UNRESOLVED'
    | 'NO_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED';
  upstreamI111EvidenceId: string;
  upstreamI114ContractId: string;
  snapshotId: string;
  candidateSourceId: string | null;
  visibleVisibleDirectionalBindingsEligibleForPositionalEvidence: number;
  hiddenOrMixedDirectionalBindingsExcluded: number;
  positionalEvidence: readonly I115VisibleStemPositionalApplicabilityEvidence[];
  positionalEvidenceCount: number;
  allPositionalEvidenceUsesExactI114Mapping: boolean;
  allPositionalEvidencePreservesI111Direction: boolean;
  allPositionalEvidenceUsesVisibleStemPairsOnly: boolean;
  allPositionalEvidenceKeepsEffectUnresolved: boolean;
  hiddenStemParticipantEmitted: false;
  rawEarthlyBranchElementEmitted: false;
  reversedDirectionInferenceUsed: false;
  transitiveControlInferenceUsed: false;
  nonDirectionalBindingPromoted: false;
  zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult: boolean;
  zeroEligibleVisibleVisibleBindingsMayProveNoInteraction: false;
  zeroEligibleVisibleVisibleBindingsMayProveNoDamage: false;
  farStemNoForcePromotedToNoInteraction: false;
  qualitativeForceConvertedToNumericWeight: false;
  slotDistanceConvertedToNumericForceWeight: false;
  positionalEvidencePromotedToInteractionEligibility: false;
  positionalEvidencePromotedToDamageOutcome: false;
  positionalEvidencePromotedToDamageMagnitude: false;
  positionalEvidencePromotedToSettlementOutcome: false;
  positionalEvidencePromotedToRelativeForceVerdict: false;
  visibleStemEffectiveInteractionEligibilityResolved: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  effectiveInteractionSetResolved: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  structuralRelationKindMutationPerformed: false;
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE';
  notes: readonly string[];
}

const PILLAR_INDEX = Object.freeze({ year: 0, month: 1, day: 2, hour: 3 } as const);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_positional_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI114Accepted(
  i114: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport,
): boolean {
  const expected = [
    ['邻干', '力大', 1, 'ADJACENT_PILLAR_STEMS'],
    ['隔干', '次之', 2, 'ONE_INTERVENING_PILLAR_STEM'],
    ['远干', '无力', 3, 'TWO_INTERVENING_PILLAR_STEMS'],
  ] as const;
  return (
    i114.status === 'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_ADAPTER_CONTRACT' &&
    i114.decision ===
      'VISIBLE_STEM_POSITIONAL_TOPOLOGY_ADAPTER_CONTRACT_FROZEN_NO_EFFECT_OR_INTERACTION_VERDICT' &&
    i114.candidateSourceId !== null &&
    i114.sourceTerm === '克' &&
    i114.componentScope === 'VISIBLE_HEAVENLY_STEM_PAIR_ONLY' &&
    i114.sourcePositionVocabulary.join('|') === '邻干|隔干|远干' &&
    i114.sourceQualitativeForceVocabulary.join('|') === '力大|次之|无力' &&
    i114.repositoryPillarOrder.join('|') === 'year|month|day|hour' &&
    i114.positionMappings.length === 3 &&
    i114.positionMappingCount === 3 &&
    i114.positionMappings.every((item, index) => {
      const target = expected[index];
      return (
        target !== undefined &&
        item.sourcePositionVocabulary === target[0] &&
        item.sourceQualitativeForceVocabulary === target[1] &&
        item.repositorySlotDistance === target[2] &&
        item.repositoryPositionTopology === target[3] &&
        item.distanceIsTopologyOnly &&
        item.distanceIsForceWeight === false &&
        item.qualitativeForceLabelIsNumericWeight === false &&
        item.mayEmitNoInteractionVerdict === false &&
        item.mayEmitDamageOutcome === false &&
        item.mayEmitDamageMagnitude === false
      );
    }) &&
    i114.repositorySlotDistanceMappingContractFrozen &&
    i114.repositorySlotDistanceMayBeDerivedByAbsolutePillarIndexDifference &&
    i114.sourceVocabularyMayBeMappedToRepositorySlotDistanceByThisContract &&
    i114.positionalEvidenceAdapterImplementationAuthorized &&
    i114.currentChartPositionalEvidenceMaterializedByThisGate === false &&
    i114.pairMustAlreadyBeExactDirectionalKeBinding &&
    i114.bothParticipantsMustBeVisibleHeavenlyStems &&
    i114.selfPairAllowed === false &&
    i114.sourceTargetDirectionMustRemainFromDirectionalBinding &&
    i114.rawEarthlyBranchElementMayParticipate === false &&
    i114.hiddenStemParticipantMayParticipate === false &&
    i114.hiddenStemInteractionEligibilityGapRemains &&
    i114.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i114.positionalTopologyIsInteractionEligibilityVerdict === false &&
    i114.positionalTopologyIsDamageVerdict === false &&
    i114.positionalTopologyIsDamageMagnitude === false &&
    i114.qualitativeForceLabelsArePreservedSourceVocabularyOnly &&
    i114.farStemNoForceMayBePromotedToNoInteraction === false &&
    i114.qualitativeForceMayBeConvertedToNumericWeight === false &&
    i114.repositorySlotDistanceMayBeConvertedToNumericForceWeight === false &&
    i114.positionalEvidenceMayResolveGlobalRelativeForce === false &&
    i114.visibleStemEffectiveInteractionEligibilityAuthorized === false &&
    i114.effectiveInteractionSetResolved === false &&
    i114.damageOutcomeAuthorized === false &&
    i114.damageMagnitudeAuthorized === false &&
    i114.settlementOutcomeAuthorized === false &&
    i114.i98KeDamageVocabularyEvaluationResolved === false &&
    i114.i98ResearchMethodologyMaterializationAuthorized === false &&
    i114.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i114.structuralRelationKindMutationAuthorized === false &&
    i114.relativeForceVerdictAuthorized === false &&
    i114.clashSettlementAuthorized === false &&
    i114.crossRelationPrecedenceAuthorized === false &&
    i114.classificationAuthorized === false &&
    i114.numericScoringAuthorized === false &&
    i114.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE'
  );
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
    i111.allBindingsUseExactI110CycleEdge &&
    i111.allBindingsPreserveSourceTargetComponentIdentity &&
    i111.allBindingsPreservePillarPosition &&
    i111.directionalBindings.every(
      (binding) =>
        binding.relation === '克' &&
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
    i111.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i111.structuralRelationKindMutationPerformed === false &&
    i111.methodologyDefinitionCreatedByThisGate === false &&
    i111.ruleDefinitionCreatedByThisGate === false &&
    i111.registrySnapshotMutatedByThisGate === false &&
    i111.relativeForceVerdictAuthorized === false &&
    i111.clashSettlementAuthorized === false &&
    i111.crossRelationPrecedenceAuthorized === false &&
    i111.classificationAuthorized === false &&
    i111.numericScoringAuthorized === false &&
    i111.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW'
  );
}

function mappingByDistance(
  i114: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport,
  distance: number,
): I114VisibleStemPositionMapping | undefined {
  return i114.positionMappings.find((item) => item.repositorySlotDistance === distance);
}

function materialize(
  i114: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport,
  bindings: readonly I111KeDirectionalBindingEvidence[],
): readonly I115VisibleStemPositionalApplicabilityEvidence[] | null {
  const evidence: I115VisibleStemPositionalApplicabilityEvidence[] = [];

  for (const binding of bindings) {
    if (binding.sourceComponentScope !== 'VISIBLE_STEM' || binding.targetComponentScope !== 'VISIBLE_STEM') {
      continue;
    }
    const sourceIndex = PILLAR_INDEX[binding.sourcePillarSlot];
    const targetIndex = PILLAR_INDEX[binding.targetPillarSlot];
    const rawDistance = Math.abs(sourceIndex - targetIndex);
    if (rawDistance !== 1 && rawDistance !== 2 && rawDistance !== 3) return null;
    const distance = rawDistance as 1 | 2 | 3;
    const mapping = mappingByDistance(i114, distance);
    if (mapping === undefined) return null;

    const base = {
      sourceDirectionalBindingId: binding.bindingId,
      sourceComponentId: binding.sourceComponentId,
      targetComponentId: binding.targetComponentId,
      sourcePillarSlot: binding.sourcePillarSlot,
      targetPillarSlot: binding.targetPillarSlot,
      sourceStem: binding.sourceStem,
      targetStem: binding.targetStem,
      sourceElement: binding.sourceElement,
      targetElement: binding.targetElement,
      relation: '克' as const,
      repositorySlotDistance: distance,
      repositoryPositionTopology: mapping.repositoryPositionTopology,
      sourcePositionVocabulary: mapping.sourcePositionVocabulary,
      sourceQualitativeForceVocabulary: mapping.sourceQualitativeForceVocabulary,
      exactDirectionalBindingPreserved: true as const,
      bothParticipantsVisibleHeavenlyStems: true as const,
      sourceTargetDirectionPreserved: true as const,
      exactPositionMappingMatched: true as const,
      slotDistanceIsTopologyOnly: true as const,
      qualitativeForceVocabularyPreservedOnly: true as const,
      interactionEligibility: 'not_determined' as const,
      damageOutcome: 'not_determined' as const,
      damageMagnitude: 'not_determined' as const,
      settlementOutcome: 'not_determined' as const,
      relativeForceVerdict: 'not_determined' as const,
      countsAsPositionalApplicabilityEvidence: true as const,
      countsAsInteractionEffectOrSettlement: false as const,
    };
    evidence.push({
      positionalEvidenceId: `ke-visible-position:${deterministicContentHash(base).slice(0, 20)}`,
      ...base,
    });
  }

  return evidence.sort((left, right) => left.positionalEvidenceId.localeCompare(right.positionalEvidenceId));
}

export function buildI115ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidence(
  i114: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityAdapterContractReport,
  i111: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityEvidenceReport {
  const common = {
    evidenceVersion:
      I115_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE_VERSION,
    upstreamI111EvidenceId: i111.evidenceId,
    upstreamI114ContractId: i114.contractId,
    snapshotId: i111.snapshotId,
    hiddenStemParticipantEmitted: false as const,
    rawEarthlyBranchElementEmitted: false as const,
    reversedDirectionInferenceUsed: false as const,
    transitiveControlInferenceUsed: false as const,
    nonDirectionalBindingPromoted: false as const,
    zeroEligibleVisibleVisibleBindingsMayProveNoInteraction: false as const,
    zeroEligibleVisibleVisibleBindingsMayProveNoDamage: false as const,
    farStemNoForcePromotedToNoInteraction: false as const,
    qualitativeForceConvertedToNumericWeight: false as const,
    slotDistanceConvertedToNumericForceWeight: false as const,
    positionalEvidencePromotedToInteractionEligibility: false as const,
    positionalEvidencePromotedToDamageOutcome: false as const,
    positionalEvidencePromotedToDamageMagnitude: false as const,
    positionalEvidencePromotedToSettlementOutcome: false as const,
    positionalEvidencePromotedToRelativeForceVerdict: false as const,
    visibleStemEffectiveInteractionEligibilityResolved: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    effectiveInteractionSetResolved: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    structuralRelationKindMutationPerformed: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
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

  if (
    !exactI114Accepted(i114) ||
    !exactI111Accepted(i111) ||
    i114.candidateSourceId !== i111.candidateSourceId
  ) {
    return finalized({
      ...common,
      status: 'I111_OR_I114_UNRESOLVED_OR_INVALID',
      decision: 'NO_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED',
      candidateSourceId: null,
      visibleVisibleDirectionalBindingsEligibleForPositionalEvidence: 0,
      hiddenOrMixedDirectionalBindingsExcluded: 0,
      positionalEvidence: [],
      positionalEvidenceCount: 0,
      allPositionalEvidenceUsesExactI114Mapping: false,
      allPositionalEvidencePreservesI111Direction: false,
      allPositionalEvidenceUsesVisibleStemPairsOnly: false,
      allPositionalEvidenceKeepsEffectUnresolved: false,
      zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE',
      notes: [
        'I115 requires exact resolved I114 and exact resolved I111 for the same normalized source identity.',
      ],
    });
  }

  const eligible = i111.directionalBindings.filter(
    (binding) =>
      binding.sourceComponentScope === 'VISIBLE_STEM' && binding.targetComponentScope === 'VISIBLE_STEM',
  );
  const excluded = i111.directionalBindings.length - eligible.length;
  const positionalEvidence = materialize(i114, i111.directionalBindings);
  if (positionalEvidence === null || positionalEvidence.length !== eligible.length) {
    return finalized({
      ...common,
      status: 'I111_OR_I114_UNRESOLVED_OR_INVALID',
      decision: 'NO_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED',
      candidateSourceId: null,
      visibleVisibleDirectionalBindingsEligibleForPositionalEvidence: eligible.length,
      hiddenOrMixedDirectionalBindingsExcluded: excluded,
      positionalEvidence: [],
      positionalEvidenceCount: 0,
      allPositionalEvidenceUsesExactI114Mapping: false,
      allPositionalEvidencePreservesI111Direction: false,
      allPositionalEvidenceUsesVisibleStemPairsOnly: false,
      allPositionalEvidenceKeepsEffectUnresolved: false,
      zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE',
      notes: [
        'I115 failed closed because an eligible visible-visible directional binding could not be mapped exactly to the frozen I114 position topology.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_EVIDENCE',
    decision:
      'CURRENT_CHART_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED_EFFECT_UNRESOLVED',
    candidateSourceId: i111.candidateSourceId,
    visibleVisibleDirectionalBindingsEligibleForPositionalEvidence: eligible.length,
    hiddenOrMixedDirectionalBindingsExcluded: excluded,
    positionalEvidence,
    positionalEvidenceCount: positionalEvidence.length,
    allPositionalEvidenceUsesExactI114Mapping: true,
    allPositionalEvidencePreservesI111Direction: true,
    allPositionalEvidenceUsesVisibleStemPairsOnly: true,
    allPositionalEvidenceKeepsEffectUnresolved: true,
    zeroEligibleVisibleVisibleBindingsIsValidEvidenceLayerResult: eligible.length === 0,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW',
    notes: [
      'I115 materializes positional applicability evidence only for I111 directional 克 bindings between two visible heavenly stems.',
      'Hidden/mixed directional bindings remain valid I111 directional evidence but are excluded from I115 because the I113 hidden-stem interaction-eligibility authority gap remains open.',
      'Slot distance and the preserved source labels 邻干/隔干/远干 plus 力大/次之/无力 remain evidence-layer topology/vocabulary only.',
      'No positional evidence item resolves effective interaction, damage, magnitude, settlement, relative force, activation, persistence, or effective support.',
    ],
  });
}
