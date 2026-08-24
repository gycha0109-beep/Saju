import { describe, expect, test } from 'vitest';
import {
  buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport,
} from '../src/index.js';

function requirement(
  sourceTerm: '克' | '合' | '刑' | '冲' | '生' | '卫',
  requirementKind:
    | 'SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED'
    | 'COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED'
    | 'NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED'
    | 'EXISTING_BRANCH_CLASH_IDENTITY_REUSE_EFFECT_ADAPTER_REQUIRED'
    | 'EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED'
    | 'PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED',
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport['requirements'][number] {
  return {
    sourceTerm,
    upstreamBindingState:
      sourceTerm === '冲'
        ? 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED'
        : sourceTerm === '合'
          ? 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED'
          : sourceTerm === '生'
            ? 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED'
            : 'NO_EXACT_REPOSITORY_BINDING',
    requirementKind,
    newStructuralRelationKindRequired: sourceTerm === '刑',
    existingStructuralRelationKindsMayBeReused:
      sourceTerm === '合'
        ? ['stem_five_combination', 'branch_six_combination', 'branch_three_combination']
        : sourceTerm === '冲'
          ? ['branch_clash']
          : [],
    componentScopedBindingAdapterRequired: sourceTerm === '合',
    sourceLocalDirectionalEvidenceAdapterRequired: sourceTerm === '克',
    effectOrPersistenceSettlementAdapterRequired: true,
    protectionSemanticStateRequired: sourceTerm === '卫',
    exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
    requirementImplementedByThisGate: false,
    forbiddenShortcuts: [],
    notes: [],
  };
}

function i100(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport {
  const requirements = [
    requirement('克', 'SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED'),
    requirement('合', 'COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED'),
    requirement('刑', 'NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED'),
    requirement('冲', 'EXISTING_BRANCH_CLASH_IDENTITY_REUSE_EFFECT_ADAPTER_REQUIRED'),
    requirement('生', 'EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED'),
    requirement('卫', 'PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED'),
  ] as const;

  return {
    reviewId: 'i100_i101_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW',
    decision:
      'VOCABULARY_GAPS_CLASSIFIED_MINIMAL_TAXONOMY_AND_ADAPTER_REQUIREMENTS_FROZEN_IMPLEMENTATION_BLOCKED',
    upstreamI99ReviewId: 'i99_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    requirements,
    reviewedVocabularyCount: 6,
    newStructuralRelationKindRequiredCount: 1,
    sourceLocalDirectionalEvidenceAdapterRequiredCount: 1,
    componentScopedBindingAdapterRequiredCount: 1,
    protectionSemanticStateRequiredCount: 1,
    existingIdentityOrDirectionReuseCount: 3,
    allSixVocabularyRequirementsClassified: true,
    onlySourceXingRequiresNewStructuralRelationKind: true,
    sourceKeMustNotBeForcedIntoStructuralRelationKind: true,
    sourceWeiMustNotBeForcedIntoStructuralRelationKind: true,
    sourceHeMayReuseExistingCombinationKindsOnlyWithComponentScope: true,
    sourceChongMayReuseBranchClashIdentity: true,
    sourceChongBranchClashIdentityMeansDamageOutcomeResolved: false,
    sourceShengMayReuseResourceGenerationDirection: true,
    sourceShengResourceGenerationDirectionMeansPersistenceResolved: false,
    sourceKeExistingTextualControlBasisMeansCurrentChartControlIdentityResolved: false,
    sourceXingMayBeCollapsedIntoBranchClash: false,
    sourceWeiMayBeCollapsedIntoClashRescue: false,
    noTrackedRelationTouchMayProveAbsenceOfUnmodeledKeXingWei: false,
    currentRepositoryTaxonomySufficientForI98MethodologyMaterialization: false,
    taxonomyImplementationAuthorizedByThisGate: false,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW',
    notes: [],
  };
}

describe('I101 untouched support effect minimal source vocabulary taxonomy implementation readiness review', () => {
  test('opens only the existing-substrate adapter contract slice', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    expect(report.status).toBe('RESOLVED_MINIMAL_SOURCE_VOCABULARY_IMPLEMENTATION_READINESS');
    expect(report.decision).toBe('EXISTING_SUBSTRATE_ADAPTER_SLICE_READY_NEW_TAXONOMY_AUTHORITY_GAPS_BLOCKED');
    expect(report.implementationReadyTerms).toEqual(['合', '冲', '生']);
    expect(report.authorityBlockedTerms).toEqual(['克', '刑', '卫']);
    expect(report.implementationReadyTermCount).toBe(3);
    expect(report.authorityBlockedTermCount).toBe(3);
    expect(report.existingSubstrateAdapterSliceReady).toBe(true);
    expect(report.implementationContractMayBeFrozenForReadyTerms).toBe(true);
  });

  test('marks 合, 冲, 生 research evidence-binding adapters as contract-ready only', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    for (const term of ['合', '冲', '生'] as const) {
      const item = report.items.find((candidate) => candidate.sourceTerm === term);
      expect(item?.readinessState).toBe('RESEARCH_EVIDENCE_BINDING_ADAPTER_READY');
      expect(item?.researchEvidenceBindingAdapterMayBeContracted).toBe(true);
      expect(item?.effectOrPersistenceOutcomeMayBeImplemented).toBe(false);
      expect(item?.executableMethodologyMayBeImplemented).toBe(false);
      expect(item?.blocker).toBeNull();
    }
    expect(report.sourceHeResearchBindingAdapterReady).toBe(true);
    expect(report.sourceChongResearchBindingAdapterReady).toBe(true);
    expect(report.sourceShengResearchBindingAdapterReady).toBe(true);
  });

  test('blocks 克 on exact control-cycle authority rather than deriving it from element facts', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    const item = report.items.find((candidate) => candidate.sourceTerm === '克');
    expect(item?.readinessState).toBe('BLOCKED_EXACT_CONTROL_CYCLE_AUTHORITY_REQUIRED');
    expect(item?.newNormativeAuthorityRequiredBeforeImplementation).toBe(true);
    expect(item?.structuralRelationKindMutationRequiredForNextStep).toBe(false);
    expect(report.sourceKeBlockedOnExactControlCycleAuthority).toBe(true);
    expect(report.sourceKeMayDeriveControlFromFiveElementFactsWithoutAuthority).toBe(false);
  });

  test('blocks 刑 on exact branch-punishment identity authority', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    const item = report.items.find((candidate) => candidate.sourceTerm === '刑');
    expect(item?.readinessState).toBe('BLOCKED_EXACT_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY_REQUIRED');
    expect(item?.structuralRelationKindMutationRequiredForNextStep).toBe(true);
    expect(item?.newNormativeAuthorityRequiredBeforeImplementation).toBe(true);
    expect(report.sourceXingBlockedOnExactBranchPunishmentIdentityAuthority).toBe(true);
    expect(report.sourceXingMayInventPunishmentPairsFromGeneralKnowledge).toBe(false);
  });

  test('blocks 卫 on sourced protection criteria', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    const item = report.items.find((candidate) => candidate.sourceTerm === '卫');
    expect(item?.readinessState).toBe('BLOCKED_PROTECTION_CRITERIA_AUTHORITY_REQUIRED');
    expect(item?.structuralRelationKindMutationRequiredForNextStep).toBe(false);
    expect(item?.newNormativeAuthorityRequiredBeforeImplementation).toBe(true);
    expect(report.sourceWeiBlockedOnProtectionCriteriaAuthority).toBe(true);
    expect(report.sourceWeiMayInventProtectionCriteriaFromSupportPresence).toBe(false);
  });

  test('keeps ready adapters at evidence-binding-only semantic ceiling', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    expect(report.existingSubstrateAdapterSemanticCeiling).toBe('EVIDENCE_BINDING_ONLY');
    expect(report.existingSubstrateAdapterMayEmitRelationOutcome).toBe(false);
    expect(report.existingSubstrateAdapterMayEmitPersistenceOutcome).toBe(false);
    expect(report.existingSubstrateAdapterMayEmitEffectiveSupport).toBe(false);
    expect(report.existingSubstrateAdapterMayChangeTrackedTopologyMeaning).toBe(false);
    expect(report.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
  });

  test('does not authorize implementation, taxonomy mutation, effects, settlement, scoring, or classification', () => {
    const report = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    expect(report.directAdapterImplementationAuthorizedByThisGate).toBe(false);
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

  test('is deterministic and fails closed for noncanonical I100', () => {
    const first = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    const second = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(i100());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT');

    const invalid = {
      ...i100(),
      existingIdentityOrDirectionReuseCount: 2,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport;
    const blocked = buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(invalid);
    expect(blocked.status).toBe('I100_UNRESOLVED_OR_INVALID');
    expect(blocked.items).toEqual([]);
    expect(blocked.implementationContractMayBeFrozenForReadyTerms).toBe(false);
    expect(blocked.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW');
  });
});
