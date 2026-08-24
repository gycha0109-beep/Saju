import { describe, expect, test } from 'vitest';
import {
  buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport,
} from '../src/index.js';

function i99(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport {
  const bindings = [
    {
      sourceTerm: '克',
      bindingState: 'NO_EXACT_REPOSITORY_BINDING',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: ['fixture'],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: true,
      semanticLossRisk: true,
      notes: [],
    },
    {
      sourceTerm: '合',
      bindingState: 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED',
      repositoryRelationKinds: [
        'stem_five_combination',
        'branch_six_combination',
        'branch_three_combination',
      ],
      repositoryEvidenceDomains: ['fixture'],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: false,
      semanticLossRisk: true,
      notes: [],
    },
    {
      sourceTerm: '刑',
      bindingState: 'NO_EXACT_REPOSITORY_BINDING',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: ['fixture'],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: true,
      semanticLossRisk: true,
      notes: [],
    },
    {
      sourceTerm: '冲',
      bindingState: 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED',
      repositoryRelationKinds: ['branch_clash'],
      repositoryEvidenceDomains: ['fixture'],
      relationIdentityBound: true,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: false,
      semanticLossRisk: false,
      notes: [],
    },
    {
      sourceTerm: '生',
      bindingState: 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: ['fixture'],
      relationIdentityBound: true,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: false,
      semanticLossRisk: false,
      notes: [],
    },
    {
      sourceTerm: '卫',
      bindingState: 'NO_EXACT_REPOSITORY_BINDING',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: ['fixture'],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: true,
      semanticLossRisk: true,
      notes: [],
    },
  ] as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport['bindings'];

  return {
    reviewId: 'i99_i100_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW',
    decision: 'PARTIAL_VOCABULARY_BINDING_PRESENT_EXACT_METHODOLOGY_MATERIALIZATION_BLOCKED',
    upstreamI98ContractId: 'i98_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    bindings,
    reviewedVocabularyCount: 6,
    exactRelationIdentityBindingCount: 1,
    scopedOrDirectionalPartialBindingCount: 2,
    noExactBindingCount: 3,
    allVocabularyReviewed: true,
    allBindingsExactEnoughForMethodologyMaterialization: false,
    branchClashIsExactBindingForSourceChongAtIdentityLayer: true,
    branchClashIdentityBindingMeansGenericDamageSettled: false,
    sourceHeMayMapToOneStructuralRelationKindOnly: false,
    sourceHeRequiresComponentScopedMultiKindHandling: true,
    sourceXingStructuralRelationKindExists: false,
    sourceKeSourceLocalRelationKindExists: false,
    sourceShengHasDirectionalResourceGenerationSupportBasis: true,
    sourceShengDirectionalBasisMeansEffectiveSupport: false,
    sourceWeiGenericProtectionStateExists: false,
    existingClashRescueRouterMaySubstituteForGenericWeiProtection: false,
    missingTaxonomyMustBeInventedByThisGate: false,
    sourceVocabularyMayBeSilentlyCollapsed: false,
    i98MethodologyMaterializationAuthorized: false,
    methodologyDefinitionCreatedByThisGate: false,
    methodologyRegisteredByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW',
    notes: [],
  };
}

describe('I100 untouched support effect source vocabulary taxonomy gap requirements review', () => {
  test('classifies all six terms while keeping methodology materialization blocked', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    expect(report.status).toBe('RESOLVED_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW');
    expect(report.reviewedVocabularyCount).toBe(6);
    expect(report.allSixVocabularyRequirementsClassified).toBe(true);
    expect(report.currentRepositoryTaxonomySufficientForI98MethodologyMaterialization).toBe(false);
    expect(report.taxonomyImplementationAuthorizedByThisGate).toBe(false);
  });

  test('requires a new StructuralRelationKind only for 刑', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    expect(report.newStructuralRelationKindRequiredCount).toBe(1);
    expect(report.onlySourceXingRequiresNewStructuralRelationKind).toBe(true);
    const xing = report.requirements.find((item) => item.sourceTerm === '刑');
    expect(xing?.requirementKind).toBe('NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED');
    expect(xing?.newStructuralRelationKindRequired).toBe(true);
    expect(report.sourceXingMayBeCollapsedIntoBranchClash).toBe(false);
  });

  test('routes 克 to source-local control-direction evidence rather than structural relation taxonomy', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    const ke = report.requirements.find((item) => item.sourceTerm === '克');
    expect(ke?.requirementKind).toBe('SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED');
    expect(ke?.newStructuralRelationKindRequired).toBe(false);
    expect(ke?.sourceLocalDirectionalEvidenceAdapterRequired).toBe(true);
    expect(report.sourceLocalDirectionalEvidenceAdapterRequiredCount).toBe(1);
    expect(report.sourceKeMustNotBeForcedIntoStructuralRelationKind).toBe(true);
    expect(report.sourceKeExistingTextualControlBasisMeansCurrentChartControlIdentityResolved).toBe(false);
  });

  test('routes 卫 to a protection effect-state taxonomy rather than StructuralRelationKind or clash rescue', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    const wei = report.requirements.find((item) => item.sourceTerm === '卫');
    expect(wei?.requirementKind).toBe('PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED');
    expect(wei?.newStructuralRelationKindRequired).toBe(false);
    expect(wei?.protectionSemanticStateRequired).toBe(true);
    expect(report.protectionSemanticStateRequiredCount).toBe(1);
    expect(report.sourceWeiMustNotBeForcedIntoStructuralRelationKind).toBe(true);
    expect(report.sourceWeiMayBeCollapsedIntoClashRescue).toBe(false);
  });

  test('reuses existing 合 relation kinds only through component-scoped binding', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    const he = report.requirements.find((item) => item.sourceTerm === '合');
    expect(he?.requirementKind).toBe('COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED');
    expect(he?.existingStructuralRelationKindsMayBeReused).toEqual([
      'stem_five_combination',
      'branch_six_combination',
      'branch_three_combination',
    ]);
    expect(he?.componentScopedBindingAdapterRequired).toBe(true);
    expect(report.componentScopedBindingAdapterRequiredCount).toBe(1);
  });

  test('reuses 冲 identity and 生 direction without resolving downstream effects', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    const chong = report.requirements.find((item) => item.sourceTerm === '冲');
    const sheng = report.requirements.find((item) => item.sourceTerm === '生');
    expect(chong?.existingStructuralRelationKindsMayBeReused).toEqual(['branch_clash']);
    expect(chong?.effectOrPersistenceSettlementAdapterRequired).toBe(true);
    expect(report.sourceChongMayReuseBranchClashIdentity).toBe(true);
    expect(report.sourceChongBranchClashIdentityMeansDamageOutcomeResolved).toBe(false);
    expect(sheng?.requirementKind).toBe('EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED');
    expect(sheng?.effectOrPersistenceSettlementAdapterRequired).toBe(true);
    expect(report.sourceShengMayReuseResourceGenerationDirection).toBe(true);
    expect(report.sourceShengResourceGenerationDirectionMeansPersistenceResolved).toBe(false);
    expect(report.existingIdentityOrDirectionReuseCount).toBe(3);
  });

  test('does not let NO_TRACKED_RELATION_TOUCH erase unmodeled vocabulary or authorize effects', () => {
    const report = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    expect(report.noTrackedRelationTouchMayProveAbsenceOfUnmodeledKeXingWei).toBe(false);
    expect(report.calculationCoreMutationAuthorizedByThisGate).toBe(false);
    expect(report.structuralRelationKindMutationAuthorizedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(report.registrySnapshotMutatedByThisGate).toBe(false);
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and fails closed for noncanonical I99', () => {
    const first = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    const second = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(i99());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW');

    const invalid = {
      ...i99(),
      noExactBindingCount: 2,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport;
    const blocked = buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(invalid);
    expect(blocked.status).toBe('I99_UNRESOLVED_OR_INVALID');
    expect(blocked.requirements).toEqual([]);
    expect(blocked.taxonomyImplementationAuthorizedByThisGate).toBe(false);
    expect(blocked.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW');
  });
});
