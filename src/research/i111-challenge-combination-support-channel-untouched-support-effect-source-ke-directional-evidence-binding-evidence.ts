import { getHeavenlyStemElement } from 'manseryeok';
import type {
  CanonicalSajuSnapshot,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import { getHiddenStemMembership } from '../calculation/hidden-stems.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport,
  I110KeComponentScope,
  I110KeElement,
} from './i110-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-evidence-adapter-contract.js';

export const I111_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-evidence-binding-evidence-v1';

export type I111PillarSlot = 'year' | 'month' | 'day' | 'hour';

export interface I111KeComponentEvidence {
  componentId: string;
  pillarSlot: I111PillarSlot;
  componentScope: I110KeComponentScope;
  stem: HeavenlyStem;
  canonicalElement: FiveElement;
  contractElement: I110KeElement;
  exactComponentIdentityResolved: true;
  exactElementIdentityResolved: true;
}

export interface I111KeDirectionalBindingEvidence {
  bindingId: string;
  sourceComponentId: string;
  targetComponentId: string;
  sourcePillarSlot: I111PillarSlot;
  targetPillarSlot: I111PillarSlot;
  sourceComponentScope: I110KeComponentScope;
  targetComponentScope: I110KeComponentScope;
  sourceStem: HeavenlyStem;
  targetStem: HeavenlyStem;
  sourceElement: I110KeElement;
  targetElement: I110KeElement;
  relation: '克';
  exactCycleEdgeMatched: true;
  sourceToTargetDirectionVerified: true;
  interactionEligibility: 'not_determined';
  positionalForceVerdict: 'not_determined';
  damageOutcome: 'not_determined';
  damageMagnitude: 'not_determined';
  settlementOutcome: 'not_determined';
  countsAsDirectionalVocabularyBinding: true;
  countsAsDamageOrEffectSettlement: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING'
    | 'I110_OR_CURRENT_CHART_SUBSTRATE_UNRESOLVED';
  decision:
    | 'CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED'
    | 'NO_SOURCE_KE_DIRECTIONAL_BINDING_EVIDENCE_MATERIALIZED';
  upstreamI110ContractId: string;
  snapshotId: string;
  candidateSourceId: string | null;
  currentChartComponentSubstrateResolved: boolean;
  currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership: boolean;
  currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping: boolean;
  components: readonly I111KeComponentEvidence[];
  componentCount: number;
  directionalBindings: readonly I111KeDirectionalBindingEvidence[];
  directionalBindingCount: number;
  allBindingsUseExactI110CycleEdge: boolean;
  allBindingsPreserveSourceTargetComponentIdentity: boolean;
  allBindingsPreservePillarPosition: boolean;
  rawEarthlyBranchElementUsedAsParticipant: false;
  reversedDirectionInferenceUsed: false;
  transitiveControlInferenceUsed: false;
  generalKnowledgeFallbackUsed: false;
  nonCyclePairMaterialized: false;
  zeroBindingsMeansNoContractedDirectionalPairWithinResolvedComponents: boolean;
  zeroBindingsMayProveNoDamageOutcome: false;
  zeroBindingsMayProveNoEffectiveInteraction: false;
  interactionEligibilityResolvedByThisGate: false;
  positionalForceResolvedByThisGate: false;
  damageOutcomeResolvedByThisGate: false;
  damageMagnitudeResolvedByThisGate: false;
  settlementOutcomeResolvedByThisGate: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  structuralRelationKindMutationPerformed: false;
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT';
  notes: readonly string[];
}

const SLOTS = Object.freeze(['year', 'month', 'day', 'hour'] as const satisfies readonly I111PillarSlot[]);

const TO_CONTRACT_ELEMENT: Readonly<Record<FiveElement, I110KeElement>> = Object.freeze({
  목: '木',
  화: '火',
  토: '土',
  금: '金',
  수: '水',
});

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_directional_binding_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI110Accepted(
  i110: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport,
): boolean {
  const expectedCycle = '木>土|土>水|水>火|火>金|金>木';
  return (
    i110.status === 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT' &&
    i110.decision ===
      'SOURCE_KE_COMPONENT_SCOPED_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE' &&
    i110.candidateSourceId !== null &&
    i110.sourceTerm === '克' &&
    i110.inputDomain === 'COMPONENT_ELEMENT_DIRECTIONAL_EVIDENCE' &&
    i110.outputSemantic === 'SOURCE_KE_COMPONENT_SCOPED_CONTROL_DIRECTION_BINDING' &&
    i110.semanticCeiling === 'EVIDENCE_BINDING_ONLY' &&
    i110.exactControlCycleEdgeCount === 5 &&
    i110.exactControlCycle.map((edge) => `${edge.sourceElement}>${edge.targetElement}`).join('|') ===
      expectedCycle &&
    i110.exactFiveElementControlCycleRequired &&
    i110.acceptedSourceComponentScopes.join('|') === 'VISIBLE_STEM|EARTHLY_BRANCH_HIDDEN_STEM' &&
    i110.acceptedTargetComponentScopes.join('|') === 'VISIBLE_STEM|EARTHLY_BRANCH_HIDDEN_STEM' &&
    i110.visibleStemToVisibleStemBindingContracted &&
    i110.visibleStemToBranchHiddenStemBindingContracted &&
    i110.branchHiddenStemToVisibleStemBindingContracted &&
    i110.branchHiddenStemToBranchHiddenStemBindingContracted &&
    i110.rawEarthlyBranchElementParticipantAllowed === false &&
    i110.sourceComponentIdentityRequired &&
    i110.targetComponentIdentityRequired &&
    i110.sourceElementIdentityRequired &&
    i110.targetElementIdentityRequired &&
    i110.sourceToTargetDirectionMustMatchExactCycle &&
    i110.reversedDirectionMayBeInferred === false &&
    i110.transitiveControlMayBeInferred === false &&
    i110.generalKnowledgeFallbackAllowed === false &&
    i110.fiveElementLabelPresenceAloneMayCreateBinding === false &&
    i110.missingComponentIdentityBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    i110.ambiguousComponentIdentityBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    i110.missingElementIdentityBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    i110.ambiguousElementIdentityBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    i110.nonCycleElementPairBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    i110.outputEvidenceOnly &&
    i110.mayEmitDamageOutcome === false &&
    i110.mayEmitDamageMagnitude === false &&
    i110.mayEmitSettlementOutcome === false &&
    i110.mayEmitActivationOutcome === false &&
    i110.mayEmitPersistenceOutcome === false &&
    i110.mayEmitEffectiveSupportOutcome === false &&
    i110.mayEmitRelativeForceOutcome === false &&
    i110.mayEmitPrecedenceOutcome === false &&
    i110.mayEmitNumericWeight === false &&
    i110.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i110.adapterMayChangeNoTrackedRelationTouchMeaning === false &&
    i110.structuralRelationKindMutationAuthorizedByThisGate === false &&
    i110.keStructuralRelationKindCreatedByThisGate === false &&
    i110.adapterImplementationPerformedByThisGate === false &&
    i110.adapterImplementationAuthorizedByThisGate === false &&
    i110.sourceActivationVerdictAuthorized === false &&
    i110.sourcePersistenceVerdictAuthorized === false &&
    i110.sourceEffectiveSupportVerdictAuthorized === false &&
    i110.relativeForceVerdictAuthorized === false &&
    i110.clashSettlementAuthorized === false &&
    i110.crossRelationPrecedenceAuthorized === false &&
    i110.classificationAuthorized === false &&
    i110.numericScoringAuthorized === false &&
    i110.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE'
  );
}

function exactResolvedComponents(snapshot: CanonicalSajuSnapshot): readonly I111KeComponentEvidence[] | null {
  const hiddenChart = snapshot.derivedFacts.hiddenStems;
  if (hiddenChart === undefined) return null;

  const components: I111KeComponentEvidence[] = [];
  for (const slot of SLOTS) {
    const pillar = snapshot.pillars[slot];
    const hidden = hiddenChart[slot];
    if (pillar.status !== 'resolved' || hidden.status !== 'resolved') return null;

    const expectedHidden = getHiddenStemMembership(pillar.value.branch.value);
    if (hidden.value.join('|') !== expectedHidden.join('|')) return null;

    const visibleCanonicalElement = getHeavenlyStemElement(pillar.value.stem.value) as FiveElement;
    if (pillar.value.stem.element !== visibleCanonicalElement) return null;
    components.push({
      componentId: `${slot}:visible-stem:${pillar.value.stem.value}`,
      pillarSlot: slot,
      componentScope: 'VISIBLE_STEM',
      stem: pillar.value.stem.value,
      canonicalElement: visibleCanonicalElement,
      contractElement: TO_CONTRACT_ELEMENT[visibleCanonicalElement],
      exactComponentIdentityResolved: true,
      exactElementIdentityResolved: true,
    });

    for (const stem of hidden.value) {
      const canonicalElement = getHeavenlyStemElement(stem) as FiveElement;
      components.push({
        componentId: `${slot}:hidden-stem:${stem}`,
        pillarSlot: slot,
        componentScope: 'EARTHLY_BRANCH_HIDDEN_STEM',
        stem,
        canonicalElement,
        contractElement: TO_CONTRACT_ELEMENT[canonicalElement],
        exactComponentIdentityResolved: true,
        exactElementIdentityResolved: true,
      });
    }
  }

  return components;
}

function bindings(
  i110: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport,
  components: readonly I111KeComponentEvidence[],
): readonly I111KeDirectionalBindingEvidence[] {
  const cycle = new Set(i110.exactControlCycle.map((edge) => `${edge.sourceElement}>${edge.targetElement}`));
  const materialized: I111KeDirectionalBindingEvidence[] = [];

  for (const source of components) {
    for (const target of components) {
      if (source.componentId === target.componentId) continue;
      if (!cycle.has(`${source.contractElement}>${target.contractElement}`)) continue;
      const base = {
        sourceComponentId: source.componentId,
        targetComponentId: target.componentId,
        sourcePillarSlot: source.pillarSlot,
        targetPillarSlot: target.pillarSlot,
        sourceComponentScope: source.componentScope,
        targetComponentScope: target.componentScope,
        sourceStem: source.stem,
        targetStem: target.stem,
        sourceElement: source.contractElement,
        targetElement: target.contractElement,
        relation: '克' as const,
        exactCycleEdgeMatched: true as const,
        sourceToTargetDirectionVerified: true as const,
        interactionEligibility: 'not_determined' as const,
        positionalForceVerdict: 'not_determined' as const,
        damageOutcome: 'not_determined' as const,
        damageMagnitude: 'not_determined' as const,
        settlementOutcome: 'not_determined' as const,
        countsAsDirectionalVocabularyBinding: true as const,
        countsAsDamageOrEffectSettlement: false as const,
      };
      materialized.push({
        bindingId: `ke-direction:${deterministicContentHash(base).slice(0, 20)}`,
        ...base,
      });
    }
  }

  return materialized.sort((left, right) => left.bindingId.localeCompare(right.bindingId));
}

export function buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(
  i110: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport,
  snapshot: CanonicalSajuSnapshot,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidenceReport {
  const common = {
    evidenceVersion:
      I111_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE_VERSION,
    upstreamI110ContractId: i110.contractId,
    snapshotId: snapshot.snapshotId,
    rawEarthlyBranchElementUsedAsParticipant: false as const,
    reversedDirectionInferenceUsed: false as const,
    transitiveControlInferenceUsed: false as const,
    generalKnowledgeFallbackUsed: false as const,
    nonCyclePairMaterialized: false as const,
    zeroBindingsMayProveNoDamageOutcome: false as const,
    zeroBindingsMayProveNoEffectiveInteraction: false as const,
    interactionEligibilityResolvedByThisGate: false as const,
    positionalForceResolvedByThisGate: false as const,
    damageOutcomeResolvedByThisGate: false as const,
    damageMagnitudeResolvedByThisGate: false as const,
    settlementOutcomeResolvedByThisGate: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    structuralRelationKindMutationPerformed: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (!exactI110Accepted(i110)) {
    return finalized({
      ...common,
      status: 'I110_OR_CURRENT_CHART_SUBSTRATE_UNRESOLVED',
      decision: 'NO_SOURCE_KE_DIRECTIONAL_BINDING_EVIDENCE_MATERIALIZED',
      candidateSourceId: null,
      currentChartComponentSubstrateResolved: false,
      currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership: false,
      currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping: false,
      components: [],
      componentCount: 0,
      directionalBindings: [],
      directionalBindingCount: 0,
      allBindingsUseExactI110CycleEdge: false,
      allBindingsPreserveSourceTargetComponentIdentity: false,
      allBindingsPreservePillarPosition: false,
      zeroBindingsMeansNoContractedDirectionalPairWithinResolvedComponents: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
      notes: ['I111 requires the exact resolved I110 contract before current-chart binding evidence can be materialized.'],
    });
  }

  const components = exactResolvedComponents(snapshot);
  if (components === null) {
    return finalized({
      ...common,
      status: 'I110_OR_CURRENT_CHART_SUBSTRATE_UNRESOLVED',
      decision: 'NO_SOURCE_KE_DIRECTIONAL_BINDING_EVIDENCE_MATERIALIZED',
      candidateSourceId: i110.candidateSourceId,
      currentChartComponentSubstrateResolved: false,
      currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership: false,
      currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping: false,
      components: [],
      componentCount: 0,
      directionalBindings: [],
      directionalBindingCount: 0,
      allBindingsUseExactI110CycleEdge: false,
      allBindingsPreserveSourceTargetComponentIdentity: false,
      allBindingsPreservePillarPosition: false,
      zeroBindingsMeansNoContractedDirectionalPairWithinResolvedComponents: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
      notes: [
        'I111 fails closed when any pillar or hidden-stem component substrate is unavailable, ambiguous, or inconsistent with canonical membership/element mapping.',
      ],
    });
  }

  const directionalBindings = bindings(i110, components);
  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING',
    decision:
      'CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED',
    candidateSourceId: i110.candidateSourceId,
    currentChartComponentSubstrateResolved: true,
    currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership: true,
    currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping: true,
    components,
    componentCount: components.length,
    directionalBindings,
    directionalBindingCount: directionalBindings.length,
    allBindingsUseExactI110CycleEdge: true,
    allBindingsPreserveSourceTargetComponentIdentity: true,
    allBindingsPreservePillarPosition: true,
    zeroBindingsMeansNoContractedDirectionalPairWithinResolvedComponents:
      directionalBindings.length === 0,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW',
    notes: [
      'I111 materializes only component-level directional 克 vocabulary bindings among exact resolved visible-stem and branch-hidden-stem components whose element pair matches an I110 cycle edge.',
      'The binding records a potential source-to-target five-element control direction. It does not determine whether that pair is an effective interaction under positional, distance, activation, settlement, or other relation conditions.',
      'All bindings retain exact pillar position and component scope so a later gate can decide whether additional interaction-eligibility authority is required before I98 克-condition evaluation.',
      'No raw branch element is used, no reversed/transitive pair is inferred, and no damage, magnitude, settlement, persistence, force, precedence, score, or classifier verdict is emitted.',
    ],
  });
}
