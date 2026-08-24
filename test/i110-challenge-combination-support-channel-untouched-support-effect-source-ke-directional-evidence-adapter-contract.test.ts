import { describe, expect, test } from 'vitest';
import {
  buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport,
} from '../src/index.js';

function i109(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport {
  return {
    reviewId: 'i109_i110_fixture',
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

describe('I110 source 克 directional evidence adapter contract', () => {
  test('freezes a research-only component-scoped 克 evidence binding contract', () => {
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT');
    expect(report.decision).toBe('SOURCE_KE_COMPONENT_SCOPED_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE');
    expect(report.sourceTerm).toBe('克');
    expect(report.inputDomain).toBe('COMPONENT_ELEMENT_DIRECTIONAL_EVIDENCE');
    expect(report.outputSemantic).toBe('SOURCE_KE_COMPONENT_SCOPED_CONTROL_DIRECTION_BINDING');
    expect(report.semanticCeiling).toBe('EVIDENCE_BINDING_ONLY');
  });

  test('freezes exactly the five directed 克 cycle edges', () => {
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(report.exactControlCycle).toEqual([
      { sourceElement: '木', targetElement: '土', relation: '克' },
      { sourceElement: '土', targetElement: '水', relation: '克' },
      { sourceElement: '水', targetElement: '火', relation: '克' },
      { sourceElement: '火', targetElement: '金', relation: '克' },
      { sourceElement: '金', targetElement: '木', relation: '克' },
    ]);
    expect(report.exactControlCycleEdgeCount).toBe(5);
    expect(report.sourceToTargetDirectionMustMatchExactCycle).toBe(true);
    expect(report.reversedDirectionMayBeInferred).toBe(false);
    expect(report.transitiveControlMayBeInferred).toBe(false);
  });

  test('contracts only visible stems and earthly-branch hidden stems', () => {
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(report.acceptedSourceComponentScopes).toEqual(['VISIBLE_STEM', 'EARTHLY_BRANCH_HIDDEN_STEM']);
    expect(report.acceptedTargetComponentScopes).toEqual(['VISIBLE_STEM', 'EARTHLY_BRANCH_HIDDEN_STEM']);
    expect(report.visibleStemToVisibleStemBindingContracted).toBe(true);
    expect(report.visibleStemToBranchHiddenStemBindingContracted).toBe(true);
    expect(report.branchHiddenStemToVisibleStemBindingContracted).toBe(true);
    expect(report.branchHiddenStemToBranchHiddenStemBindingContracted).toBe(true);
    expect(report.rawEarthlyBranchElementParticipantAllowed).toBe(false);
  });

  test('requires exact component and element identities and fails closed otherwise', () => {
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(report.sourceComponentIdentityRequired).toBe(true);
    expect(report.targetComponentIdentityRequired).toBe(true);
    expect(report.sourceElementIdentityRequired).toBe(true);
    expect(report.targetElementIdentityRequired).toBe(true);
    expect(report.missingComponentIdentityBehavior).toBe('FAIL_CLOSED_NO_BINDING');
    expect(report.ambiguousComponentIdentityBehavior).toBe('FAIL_CLOSED_NO_BINDING');
    expect(report.missingElementIdentityBehavior).toBe('FAIL_CLOSED_NO_BINDING');
    expect(report.ambiguousElementIdentityBehavior).toBe('FAIL_CLOSED_NO_BINDING');
    expect(report.nonCycleElementPairBehavior).toBe('FAIL_CLOSED_NO_BINDING');
  });

  test('does not convert directional evidence into any effect or score', () => {
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(report.outputEvidenceOnly).toBe(true);
    expect(report.mayEmitDamageOutcome).toBe(false);
    expect(report.mayEmitDamageMagnitude).toBe(false);
    expect(report.mayEmitSettlementOutcome).toBe(false);
    expect(report.mayEmitActivationOutcome).toBe(false);
    expect(report.mayEmitPersistenceOutcome).toBe(false);
    expect(report.mayEmitEffectiveSupportOutcome).toBe(false);
    expect(report.mayEmitRelativeForceOutcome).toBe(false);
    expect(report.mayEmitPrecedenceOutcome).toBe(false);
    expect(report.mayEmitNumericWeight).toBe(false);
  });

  test('does not mutate structural relation taxonomy or no-touch semantics', () => {
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(report.structuralRelationKindMutationAuthorizedByThisGate).toBe(false);
    expect(report.keStructuralRelationKindCreatedByThisGate).toBe(false);
    expect(report.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
    expect(report.adapterMayChangeNoTrackedRelationTouchMeaning).toBe(false);
    expect(report.adapterImplementationPerformedByThisGate).toBe(false);
    expect(report.adapterImplementationAuthorizedByThisGate).toBe(false);
  });

  test('fails closed when upstream I109 implementation authority is corrupted', () => {
    const upstream = {
      ...i109(),
      keDirectionalAdapterImplementationAuthorizedByThisGate: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport;
    const report = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(upstream);
    expect(report.status).toBe('I109_UNRESOLVED_OR_INVALID');
    expect(report.sourceTerm).toBeNull();
    expect(report.exactControlCycle).toEqual([]);
    expect(report.semanticCeiling).toBe('NONE');
  });

  test('is deterministic and preserves production settlement and classification guards', () => {
    const first = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    const second = buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(i109());
    expect(first.contractId).toBe(second.contractId);
    expect(first.generalKnowledgeFallbackAllowed).toBe(false);
    expect(first.fiveElementLabelPresenceAloneMayCreateBinding).toBe(false);
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.clashSettlementAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE');
  });
});
