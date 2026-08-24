import { describe, expect, test } from 'vitest';
import {
  buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract,
  buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence,
  calculateCanonicalSajuSnapshot,
  type BirthInput,
  type CalculationPolicySnapshot,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport,
} from '../src/index.js';

function policy(): CalculationPolicySnapshot {
  return {
    policyId: 'myeonghwa/test-default',
    policyVersion: '1.0.0',
    dayBoundary: 'midnight',
    trueSolarTime: {
      enabled: false,
      longitudeSource: 'not-applicable',
      applyEquationOfTime: false,
      applyHistoricalDst: false,
    },
    timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
    unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
  };
}

function i109(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport {
  return {
    reviewId: 'i109_i111_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_PROMOTION_READINESS',
    decision: 'KE_FOUR_OF_FOUR_COVERAGE_CAN_ENTER_RESEARCH_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_DIRECT_IMPLEMENTATION_AND_EFFECT_PROMOTION_BLOCKED',
    upstreamI108EvidenceId: 'i108_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    candidateSourceClass: 'practitioner_secondary',
    allFourKeAuthorityRequirementsSatisfied: true,
    authorityCoverageGapSatisfied: true,
    keAuthorityGapClosed: false,
    promotionLifecycleEntryReady: true,
    authorizedEntryStage: 'RESEARCH_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
    semanticCeiling: 'EVIDENCE_BINDING_ONLY',
    researchKeDirectionalEvidenceAdapterContractRequired: true,
    exactFiveElementControlCycleMustBePreserved: true,
    sourceToTargetDirectionMustBePreserved: true,
    sourceAndTargetComponentIdentityRequired: true,
    visibleStemApplicabilityAllowedByContract: true,
    branchHiddenStemApplicabilityAllowedByContract: true,
    rawBranchElementDirectControlRuleAuthorized: false,
    branchApplicabilityScope: 'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK',
    adapterMustKeepControlDirectionSeparateFromDamageOutcome: true,
    adapterMustKeepControlDirectionSeparateFromDamageMagnitude: true,
    adapterMayEmitDamageOutcome: false,
    adapterMayEmitDamageMagnitude: false,
    adapterMayEmitSettlementOutcome: false,
    adapterMayEmitActivationVerdict: false,
    adapterMayEmitPersistenceVerdict: false,
    adapterMayEmitEffectiveSupportVerdict: false,
    adapterMayEmitRelativeForceVerdict: false,
    adapterMayEmitPrecedenceVerdict: false,
    structuralRelationKindMutationAuthorized: false,
    keStructuralRelationKindRequired: false,
    directSourceToExecutableAdapterPromotionAuthorized: false,
    keDirectionalAdapterImplementationAuthorizedByThisGate: false,
    ruleDefinitionCreationAuthorized: false,
    methodologyDefinitionCreationAuthorized: false,
    registrySnapshotMutationAuthorized: false,
    reviewAttestationCreatedByThisGate: false,
    stagingPromotionAuthorized: false,
    productionPromotionAuthorized: false,
    singlePractitionerSecondarySourceProductionQualitySufficient: false,
    productionMultiSourceSupportStillRequired: true,
    candidateMayRemainResearchEvidenceWithoutProductionPromotion: true,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
    notes: [],
  };
}

function contract() {
  return buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
}

function knownSnapshot() {
  const input: BirthInput = {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
  return calculateCanonicalSajuSnapshot(input, policy(), {
    now: new Date('2026-08-19T00:00:00.000Z'),
  });
}

describe('I111 source 克 directional evidence binding evidence', () => {
  test('materializes component-level directional 克 bindings on a fully resolved chart', () => {
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), knownSnapshot());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING');
    expect(report.decision).toBe('CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED');
    expect(report.currentChartComponentSubstrateResolved).toBe(true);
    expect(report.currentChartHiddenStemSubstrateVerifiedAgainstCanonicalMembership).toBe(true);
    expect(report.currentChartVisibleStemElementsVerifiedAgainstCanonicalMapping).toBe(true);
    expect(report.componentCount).toBe(12);
    expect(report.directionalBindingCount).toBeGreaterThan(0);
  });

  test('every binding follows one exact I110 cycle edge and preserves identity', () => {
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), knownSnapshot());
    const cycle = new Set(['木>土', '土>水', '水>火', '火>金', '金>木']);
    expect(report.directionalBindings.every((item) => cycle.has(`${item.sourceElement}>${item.targetElement}`))).toBe(true);
    expect(report.directionalBindings.every((item) => item.sourceComponentId !== item.targetComponentId)).toBe(true);
    expect(report.allBindingsUseExactI110CycleEdge).toBe(true);
    expect(report.allBindingsPreserveSourceTargetComponentIdentity).toBe(true);
    expect(report.allBindingsPreservePillarPosition).toBe(true);
  });

  test('uses only visible-stem and branch-hidden-stem components, never raw branch elements', () => {
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), knownSnapshot());
    const scopes = new Set(['VISIBLE_STEM', 'EARTHLY_BRANCH_HIDDEN_STEM']);
    expect(report.components.every((item) => scopes.has(item.componentScope))).toBe(true);
    expect(report.rawEarthlyBranchElementUsedAsParticipant).toBe(false);
    expect(report.reversedDirectionInferenceUsed).toBe(false);
    expect(report.transitiveControlInferenceUsed).toBe(false);
    expect(report.generalKnowledgeFallbackUsed).toBe(false);
    expect(report.nonCyclePairMaterialized).toBe(false);
  });

  test('keeps interaction eligibility positional force damage and settlement unresolved', () => {
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), knownSnapshot());
    expect(report.directionalBindings.every((item) => item.interactionEligibility === 'not_determined')).toBe(true);
    expect(report.directionalBindings.every((item) => item.positionalForceVerdict === 'not_determined')).toBe(true);
    expect(report.directionalBindings.every((item) => item.damageOutcome === 'not_determined')).toBe(true);
    expect(report.directionalBindings.every((item) => item.damageMagnitude === 'not_determined')).toBe(true);
    expect(report.directionalBindings.every((item) => item.settlementOutcome === 'not_determined')).toBe(true);
    expect(report.interactionEligibilityResolvedByThisGate).toBe(false);
    expect(report.damageOutcomeResolvedByThisGate).toBe(false);
  });

  test('fails closed when hidden-stem substrate disagrees with canonical branch membership', () => {
    const snapshot = knownSnapshot();
    const hidden = snapshot.derivedFacts.hiddenStems;
    if (hidden === undefined) throw new Error('expected hidden stem enrichment');
    const invalid = {
      ...snapshot,
      derivedFacts: {
        ...snapshot.derivedFacts,
        hiddenStems: {
          ...hidden,
          month: { status: 'resolved' as const, value: ['계'] as const },
        },
      },
    };
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), invalid);
    expect(report.status).toBe('I110_OR_CURRENT_CHART_SUBSTRATE_UNRESOLVED');
    expect(report.directionalBindings).toEqual([]);
    expect(report.currentChartComponentSubstrateResolved).toBe(false);
  });

  test('fails closed rather than fabricating hour components for unknown birth time', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), snapshot);
    expect(report.status).toBe('I110_OR_CURRENT_CHART_SUBSTRATE_UNRESOLVED');
    expect(report.componentCount).toBe(0);
    expect(report.directionalBindingCount).toBe(0);
  });

  test('fails closed when I110 contract permits damage output', () => {
    const upstream = contract();
    const invalid = { ...upstream, mayEmitDamageOutcome: true } as unknown as typeof upstream;
    const report = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(invalid, knownSnapshot());
    expect(report.status).toBe('I110_OR_CURRENT_CHART_SUBSTRATE_UNRESOLVED');
    expect(report.candidateSourceId).toBeNull();
    expect(report.directionalBindings).toEqual([]);
  });

  test('is deterministic and keeps all effect scoring classification guards closed', () => {
    const first = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), knownSnapshot());
    const second = buildI111ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceBindingEvidence(contract(), knownSnapshot());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.directionalBindings).toEqual(second.directionalBindings);
    expect(first.zeroBindingsMayProveNoDamageOutcome).toBe(false);
    expect(first.zeroBindingsMayProveNoEffectiveInteraction).toBe(false);
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
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS_REVIEW');
  });
});
