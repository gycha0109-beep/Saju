import { describe, expect, test } from 'vitest';
import {
  buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
} from '../src/index.js';

function i98(): ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport {
  return {
    contractId: 'i98_i99_fixture',
    contractVersion: 'fixture',
    status: 'RESOLVED_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT',
    decision:
      'CONDITIONAL_PERSISTENCE_RESEARCH_METHODOLOGY_CONTRACT_FROZEN_RELATION_VOCABULARY_BINDING_REQUIRED_BEFORE_MATERIALIZATION',
    upstreamI97ReviewId: 'i97_fixture',
    candidateRegistrationId: 'candidate_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    methodologyContractFrozen: true,
    reservedMethodologyId: 'M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE',
    requiredMethodologyFamily: 'stem_branch_interaction',
    methodologyStatusCeiling: 'research',
    methodologyVersionConvention: '0.1.0-research',
    sourceIdsMustContainCandidateSource: true,
    sourceIdsMayBorrowI88OrI91Candidate: false,
    methodologyDefinitionCreatedByThisGate: false,
    methodologyRegisteredByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    requiredInputSemantics: [
      'SUPPORT_SOURCE_IDENTITY',
      'SUPPORT_KIND',
      'SUPPORT_SOURCE_POSITION',
      'RELATION_TOUCH_TOPOLOGY',
      'RELATION_SETTLEMENT_DEPENDENCY_STATE',
      'SOURCE_RELATION_VOCABULARY_BINDING',
      'SUPPORT_OR_PROTECTION_CONDITION',
    ].map((semanticId, index) => ({
      semanticId,
      required: true,
      canonicalFactBindingResolved: index < 5,
      mayUsePlaceholderFactPathInMaterializedMethodology: false,
      basis: `fixture:${semanticId}`,
    })) as ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport['requiredInputSemantics'],
    canonicalRequiredFactBindingsResolved: false,
    placeholderRequiredFactPathsAuthorized: false,
    sourceRelationVocabulary: [
      ['克', 'STEM_AND_BRANCH', 'DAMAGE'],
      ['合', 'STEM_AND_BRANCH', 'INTERACTION'],
      ['刑', 'BRANCH', 'DAMAGE'],
      ['冲', 'BRANCH', 'DAMAGE'],
      ['生', 'SUPPORT_OR_PROTECTION', 'SUPPORT'],
      ['卫', 'SUPPORT_OR_PROTECTION', 'PROTECTION'],
    ].map(([sourceTerm, sourceScope, semanticRole]) => ({
      sourceTerm,
      sourceScope,
      semanticRole,
      exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
      mayBeSilentlyMappedToExistingRelationKind: false,
      absenceMayBeInferredFromNoTrackedRelationTouch: false,
    })) as ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport['sourceRelationVocabulary'],
    exactRelationVocabularyBindingRequired: true,
    allSourceRelationVocabularyBindingsResolved: false,
    noTrackedRelationTouchOnlyClearsTrackedRelationSettlementDependency: true,
    noTrackedRelationTouchAloneSufficientForConditionalPersistence: false,
    supportPresenceAloneSufficientForConditionalPersistence: false,
    supportDirectionAloneSufficientForConditionalPersistence: false,
    conditionalPersistenceRequiresApplicableSupportKind: true,
    conditionalPersistenceRequiresKnownSourcePosition: true,
    conditionalPersistenceRequiresExactDamageVocabularyEvaluation: true,
    conditionalPersistenceRequiresSupportOrProtectionConditionEvaluation: true,
    conditionalPersistenceRequiresNoUnresolvedRequiredBinding: true,
    methodologySemanticStateCeiling: 'CONDITIONAL_PERSISTENCE_EVALUATION_CONTRACT_ONLY',
    activeStateMayBeEmitted: false,
    persistedStateMayBeEmitted: false,
    effectiveSupportStateMayBeEmitted: false,
    sourceDamageStateMayBeInventedFromMissingEvidence: false,
    sourceProtectionStateMayBeInventedFromMissingEvidence: false,
    methodologyMayResolveCrossRelationPrecedence: false,
    methodologyMayResolveRelativeForce: false,
    methodologyMayAssignNumericWeight: false,
    researchMethodologyMaterializationAuthorized: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    stagingPromotionAuthorized: false,
    productionPromotionAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW',
    notes: [],
  };
}

describe('I99 untouched support effect source relation vocabulary repository binding review', () => {
  test('reviews all six source terms without declaring methodology materialization ready', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    expect(report.status).toBe('RESOLVED_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW');
    expect(report.reviewedVocabularyCount).toBe(6);
    expect(report.allVocabularyReviewed).toBe(true);
    expect(report.allBindingsExactEnoughForMethodologyMaterialization).toBe(false);
    expect(report.i98MethodologyMaterializationAuthorized).toBe(false);
  });

  test('binds 冲 exactly to branch_clash identity but not generic damage settlement', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    const item = report.bindings.find((binding) => binding.sourceTerm === '冲');
    expect(item?.bindingState).toBe('EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED');
    expect(item?.repositoryRelationKinds).toEqual(['branch_clash']);
    expect(item?.relationIdentityBound).toBe(true);
    expect(item?.effectOrPersistenceBound).toBe(false);
    expect(report.branchClashIsExactBindingForSourceChongAtIdentityLayer).toBe(true);
    expect(report.branchClashIdentityBindingMeansGenericDamageSettled).toBe(false);
  });

  test('keeps 合 as a component-scoped multi-kind binding rather than one relation kind', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    const item = report.bindings.find((binding) => binding.sourceTerm === '合');
    expect(item?.bindingState).toBe('SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED');
    expect(item?.repositoryRelationKinds).toEqual([
      'stem_five_combination',
      'branch_six_combination',
      'branch_three_combination',
    ]);
    expect(report.sourceHeMayMapToOneStructuralRelationKindOnly).toBe(false);
    expect(report.sourceHeRequiresComponentScopedMultiKindHandling).toBe(true);
  });

  test('finds no exact repository relation binding for 克, 刑, or 卫', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    for (const term of ['克', '刑', '卫'] as const) {
      const item = report.bindings.find((binding) => binding.sourceTerm === term);
      expect(item?.bindingState).toBe('NO_EXACT_REPOSITORY_BINDING');
      expect(item?.taxonomyGap).toBe(true);
      expect(item?.exactEnoughForI98MethodologyMaterialization).toBe(false);
    }
    expect(report.sourceKeSourceLocalRelationKindExists).toBe(false);
    expect(report.sourceXingStructuralRelationKindExists).toBe(false);
    expect(report.sourceWeiGenericProtectionStateExists).toBe(false);
  });

  test('binds 生 only to directional resource-generation support, not effective support', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    const item = report.bindings.find((binding) => binding.sourceTerm === '生');
    expect(item?.bindingState).toBe('DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED');
    expect(item?.relationIdentityBound).toBe(true);
    expect(item?.effectOrPersistenceBound).toBe(false);
    expect(report.sourceShengHasDirectionalResourceGenerationSupportBasis).toBe(true);
    expect(report.sourceShengDirectionalBasisMeansEffectiveSupport).toBe(false);
  });

  test('does not reuse clash rescue routing as generic 卫 protection', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    expect(report.existingClashRescueRouterMaySubstituteForGenericWeiProtection).toBe(false);
    expect(report.sourceWeiGenericProtectionStateExists).toBe(false);
  });

  test('reports one exact identity binding, two scoped/directional partial bindings, and three missing bindings', () => {
    const report = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    expect(report.exactRelationIdentityBindingCount).toBe(1);
    expect(report.scopedOrDirectionalPartialBindingCount).toBe(2);
    expect(report.noExactBindingCount).toBe(3);
    expect(report.sourceVocabularyMayBeSilentlyCollapsed).toBe(false);
    expect(report.missingTaxonomyMustBeInventedByThisGate).toBe(false);
  });

  test('fails closed for invalid I98 and preserves all effect/scoring/classifier guards deterministically', () => {
    const first = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    const second = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(i98());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
    expect(first.reviewAttestationCreatedByThisGate).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW');

    const invalid = {
      ...i98(),
      allSourceRelationVocabularyBindingsResolved: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport;
    const blocked = buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(invalid);
    expect(blocked.status).toBe('I98_UNRESOLVED_OR_INVALID');
    expect(blocked.bindings).toEqual([]);
    expect(blocked.i98MethodologyMaterializationAuthorized).toBe(false);
  });
});
