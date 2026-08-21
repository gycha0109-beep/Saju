import { describe, expect, test } from 'vitest';
import {
  buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport,
} from '../src/index.js';

function i101(): ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport {
  return {
    reviewId: 'i101_i102_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_MINIMAL_SOURCE_VOCABULARY_IMPLEMENTATION_READINESS',
    decision: 'EXISTING_SUBSTRATE_ADAPTER_SLICE_READY_NEW_TAXONOMY_AUTHORITY_GAPS_BLOCKED',
    upstreamI100ReviewId: 'i100_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    items: [],
    implementationReadyTerms: ['合', '冲', '生'],
    authorityBlockedTerms: ['克', '刑', '卫'],
    implementationReadyTermCount: 3,
    authorityBlockedTermCount: 3,
    existingSubstrateAdapterSliceReady: true,
    sourceHeResearchBindingAdapterReady: true,
    sourceChongResearchBindingAdapterReady: true,
    sourceShengResearchBindingAdapterReady: true,
    sourceKeBlockedOnExactControlCycleAuthority: true,
    sourceXingBlockedOnExactBranchPunishmentIdentityAuthority: true,
    sourceWeiBlockedOnProtectionCriteriaAuthority: true,
    sourceKeMayDeriveControlFromFiveElementFactsWithoutAuthority: false,
    sourceXingMayInventPunishmentPairsFromGeneralKnowledge: false,
    sourceWeiMayInventProtectionCriteriaFromSupportPresence: false,
    existingSubstrateAdapterSemanticCeiling: 'EVIDENCE_BINDING_ONLY',
    existingSubstrateAdapterMayEmitRelationOutcome: false,
    existingSubstrateAdapterMayEmitPersistenceOutcome: false,
    existingSubstrateAdapterMayEmitEffectiveSupport: false,
    existingSubstrateAdapterMayChangeTrackedTopologyMeaning: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    implementationContractMayBeFrozenForReadyTerms: true,
    directAdapterImplementationAuthorizedByThisGate: false,
    calculationCoreMutationAuthorizedByThisGate: false,
    structuralRelationKindMutationAuthorizedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    methodologyRegisteredByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT',
    notes: [],
  };
}

describe('I102 untouched support effect existing substrate source vocabulary adapter contract', () => {
  test('freezes exactly three ready adapters and excludes blocked terms', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    expect(report.status).toBe('RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT');
    expect(report.decision).toBe('HE_CHONG_SHENG_EVIDENCE_BINDING_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE');
    expect(report.readyTerms).toEqual(['合', '冲', '生']);
    expect(report.blockedTerms).toEqual(['克', '刑', '卫']);
    expect(report.adapters.map((item) => item.sourceTerm)).toEqual(['合', '冲', '生']);
    expect(report.adapterCount).toBe(3);
    expect(report.allReadyTermsContracted).toBe(true);
    expect(report.blockedTermsExplicitlyExcluded).toBe(true);
  });

  test('binds 合 only to component-scoped existing combination identities', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    const adapter = report.adapters.find((item) => item.sourceTerm === '合');
    expect(adapter?.inputDomain).toBe('STRUCTURAL_RELATION_IDENTITY');
    expect(adapter?.acceptedStructuralRelationKinds).toEqual([
      'stem_five_combination',
      'branch_six_combination',
      'branch_three_combination',
    ]);
    expect(adapter?.outputSemantic).toBe('SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING');
    expect(adapter?.preserveRelationId).toBe(true);
    expect(adapter?.preserveComponentScope).toBe(true);
    expect(report.sourceHeGenericRelationKindCreated).toBe(false);
    expect(report.sourceHeComponentScopeMustBePreserved).toBe(true);
  });

  test('binds 冲 to branch_clash identity only and not damage outcome', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    const adapter = report.adapters.find((item) => item.sourceTerm === '冲');
    expect(adapter?.acceptedStructuralRelationKinds).toEqual(['branch_clash']);
    expect(adapter?.outputSemantic).toBe('SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING');
    expect(adapter?.mayEmitDamageOutcome).toBe(false);
    expect(adapter?.mayEmitRescueOutcome).toBe(false);
    expect(report.sourceChongIdentityOnly).toBe(true);
    expect(report.sourceChongDamageOutcomeStillUnresolved).toBe(true);
  });

  test('binds 生 to exact resource-generation directional evidence only', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    const adapter = report.adapters.find((item) => item.sourceTerm === '生');
    expect(adapter?.inputDomain).toBe('SUPPORT_CHANNEL_DIRECTIONAL_EVIDENCE');
    expect(adapter?.acceptedSupportChannelKinds).toEqual(['RESOURCE_GENERATION_SUPPORT_CHANNEL']);
    expect(adapter?.outputSemantic).toBe('SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING');
    expect(adapter?.preserveParticipantOrSourcePosition).toBe(true);
    expect(adapter?.mayEmitActivationOutcome).toBe(false);
    expect(adapter?.mayEmitPersistenceOutcome).toBe(false);
    expect(adapter?.mayEmitEffectiveSupportOutcome).toBe(false);
    expect(report.sourceShengDirectionOnly).toBe(true);
    expect(report.sourceShengPersistenceStillUnresolved).toBe(true);
  });

  test('requires exact existing substrate and fails closed for missing or ambiguous input', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    for (const adapter of report.adapters) {
      expect(adapter.exactInputIdentityRequired).toBe(true);
      expect(adapter.missingInputBehavior).toBe('FAIL_CLOSED_NO_BINDING');
      expect(adapter.ambiguousInputBehavior).toBe('FAIL_CLOSED_NO_BINDING');
      expect(adapter.outputEvidenceOnly).toBe(true);
    }
    expect(report.adapterMayConsumeOnlyExistingAuthorizedSubstrate).toBe(true);
    expect(report.adapterMaySynthesizeMissingSubstrate).toBe(false);
    expect(report.adapterMayInferUntrackedVocabularyAbsence).toBe(false);
  });

  test('explicitly excludes 克 刑 卫 and preserves NO_TRACKED_RELATION_TOUCH meaning', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    expect(report.sourceKeAdapterIncluded).toBe(false);
    expect(report.sourceXingAdapterIncluded).toBe(false);
    expect(report.sourceWeiAdapterIncluded).toBe(false);
    expect(report.adapterMayChangeNoTrackedRelationTouchMeaning).toBe(false);
    expect(report.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
  });

  test('keeps every downstream outcome and executable authority blocked', () => {
    const report = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    expect(report.adapterSemanticCeiling).toBe('EVIDENCE_BINDING_ONLY');
    expect(report.adapterImplementationPerformedByThisGate).toBe(false);
    expect(report.adapterImplementationAuthorizedByThisGate).toBe(false);
    expect(report.calculationCoreMutationAuthorizedByThisGate).toBe(false);
    expect(report.structuralRelationKindMutationAuthorizedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(report.registrySnapshotMutatedByThisGate).toBe(false);
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and fails closed for noncanonical I101', () => {
    const first = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    const second = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(i101());
    expect(first.contractId).toBe(second.contractId);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE');

    const invalid = {
      ...i101(),
      implementationReadyTerms: ['合', '生'],
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport;
    const blocked = buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(invalid);
    expect(blocked.status).toBe('I101_UNRESOLVED_OR_INVALID');
    expect(blocked.adapters).toEqual([]);
    expect(blocked.adapterImplementationAuthorizedByThisGate).toBe(false);
    expect(blocked.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW');
  });
});
