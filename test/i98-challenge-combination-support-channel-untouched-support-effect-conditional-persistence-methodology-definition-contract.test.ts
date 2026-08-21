import { describe, expect, test } from 'vitest';
import {
  buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport,
} from '../src/index.js';

function i97(): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport {
  return {
    reviewId: 'i97_i98_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS',
    decision:
      'I84_FULL_COVERAGE_CAN_ENTER_RESEARCH_METHODOLOGY_DEFINITION_REVIEW_DIRECT_RULE_AND_EXECUTABLE_PROMOTION_BLOCKED',
    upstreamI96EvidenceId: 'i96_fixture',
    candidateRegistrationId: 'candidate_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    candidateMeetsFrozenI84AcceptanceContract: true,
    authorityCoverageGapSatisfied: true,
    authorityGapClosed: false,
    promotionLifecycleEntryReady: true,
    authorizedEntryStage: 'RESEARCH_METHODOLOGY_DEFINITION_CONTRACT',
    recommendedMethodologyFamily: 'stem_branch_interaction',
    methodologyStatusCeilingByThisGate: 'research',
    researchMethodologyDefinitionContractRequired: true,
    methodologySourceLinkMustReferenceCandidate: true,
    methodologyMustPreserveConditionalNotDefaultPersistence: true,
    methodologyMustDefineRepositoryStateMapping: true,
    methodologyMayTranslateNoTouchIntoDefaultActive: false,
    methodologyMayTranslateNoTouchIntoDefaultPersisted: false,
    methodologyMayTranslateNoTouchIntoDefaultEffectiveSupport: false,
    directSourceToRulePromotionAuthorized: false,
    ruleDefinitionCreationAuthorized: false,
    rulePromotionAuthorized: false,
    researchRegistryMutationAuthorizedByThisGate: false,
    stagingPromotionAuthorized: false,
    productionPromotionAuthorized: false,
    sourceReferenceDirectReviewAttestationSupported: false,
    methodologyAndRuleContentAttestationRequiredForPromotion: true,
    internalReviewRequiredBeforeStaging: true,
    domainReviewRequiredBeforeProduction: true,
    trustPinnedAttestationRequiredForPromotedPack: true,
    singleSourceProductionQualitySufficient: false,
    productionMultiSourceSupportRequiredByExistingPolicy: true,
    candidateSourceMayRemainResearchEvidenceWithoutProductionPromotion: true,
    candidateAcceptedForUntouchedSupportAuthority: false,
    candidatePromotedToMethodologyOrRuleAuthority: false,
    sourceReferenceApprovedForMethodologyOrRuleUse: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    effectiveSupportToRelativeForceAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT',
    notes: [],
  };
}

describe('I98 untouched support effect conditional persistence methodology definition contract', () => {
  test('freezes only a research stem-branch-interaction methodology contract', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.status).toBe('RESOLVED_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT');
    expect(report.methodologyContractFrozen).toBe(true);
    expect(report.reservedMethodologyId).toBe('M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE');
    expect(report.requiredMethodologyFamily).toBe('stem_branch_interaction');
    expect(report.methodologyStatusCeiling).toBe('research');
    expect(report.methodologyVersionConvention).toBe('0.1.0-research');
  });

  test('requires the exact I97 candidate source and forbids borrowing earlier candidates', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.candidateSourceId).toBe('source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515');
    expect(report.sourceIdsMustContainCandidateSource).toBe(true);
    expect(report.sourceIdsMayBorrowI88OrI91Candidate).toBe(false);
  });

  test('freezes seven input semantics and keeps unresolved vocabulary bindings as a materialization blocker', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.requiredInputSemantics).toHaveLength(7);
    expect(report.requiredInputSemantics.every((input) => input.required)).toBe(true);
    expect(report.requiredInputSemantics.every((input) => !input.mayUsePlaceholderFactPathInMaterializedMethodology)).toBe(true);
    expect(report.canonicalRequiredFactBindingsResolved).toBe(false);
    expect(report.researchMethodologyMaterializationAuthorized).toBe(false);
  });

  test('preserves all six source vocabulary terms with exact repository binding unresolved', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.sourceRelationVocabulary.map((item) => item.sourceTerm)).toEqual(['克', '合', '刑', '冲', '生', '卫']);
    expect(report.exactRelationVocabularyBindingRequired).toBe(true);
    expect(report.allSourceRelationVocabularyBindingsResolved).toBe(false);
    expect(report.sourceRelationVocabulary.every((item) => item.exactRepositoryBindingState === 'UNRESOLVED_EXACT_BINDING_REQUIRED')).toBe(true);
    expect(report.sourceRelationVocabulary.every((item) => !item.mayBeSilentlyMappedToExistingRelationKind)).toBe(true);
  });

  test('treats NO_TRACKED_RELATION_TOUCH only as relation-settlement dependency clearance', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.noTrackedRelationTouchOnlyClearsTrackedRelationSettlementDependency).toBe(true);
    expect(report.noTrackedRelationTouchAloneSufficientForConditionalPersistence).toBe(false);
    expect(report.supportPresenceAloneSufficientForConditionalPersistence).toBe(false);
    expect(report.supportDirectionAloneSufficientForConditionalPersistence).toBe(false);
  });

  test('requires support kind, position, exact damage vocabulary, protection evaluation, and no unresolved bindings', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.conditionalPersistenceRequiresApplicableSupportKind).toBe(true);
    expect(report.conditionalPersistenceRequiresKnownSourcePosition).toBe(true);
    expect(report.conditionalPersistenceRequiresExactDamageVocabularyEvaluation).toBe(true);
    expect(report.conditionalPersistenceRequiresSupportOrProtectionConditionEvaluation).toBe(true);
    expect(report.conditionalPersistenceRequiresNoUnresolvedRequiredBinding).toBe(true);
  });

  test('creates no methodology, rule, registry mutation, attestation, or runtime effect state', () => {
    const report = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.methodologyRegisteredByThisGate).toBe(false);
    expect(report.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(report.registrySnapshotMutatedByThisGate).toBe(false);
    expect(report.reviewAttestationCreatedByThisGate).toBe(false);
    expect(report.activeStateMayBeEmitted).toBe(false);
    expect(report.persistedStateMayBeEmitted).toBe(false);
    expect(report.effectiveSupportStateMayBeEmitted).toBe(false);
  });

  test('fails closed on invalid I97 and preserves execution/scoring/classifier guards deterministically', () => {
    const first = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    const second = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(i97());
    expect(first.contractId).toBe(second.contractId);
    expect(first.methodologyOrRulePromotionAuthorized).toBe(false);
    expect(first.executableAuthorityAuthorized).toBe(false);
    expect(first.stagingPromotionAuthorized).toBe(false);
    expect(first.productionPromotionAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW');

    const invalid = {
      ...i97(),
      methodologyMayTranslateNoTouchIntoDefaultPersisted: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport;
    const blocked = buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(invalid);
    expect(blocked.status).toBe('I97_UNRESOLVED_OR_INVALID');
    expect(blocked.methodologyContractFrozen).toBe(false);
    expect(blocked.researchMethodologyMaterializationAuthorized).toBe(false);
  });
});
