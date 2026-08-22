import { describe, expect, test } from 'vitest';
import {
  buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport,
} from '../src/index.js';

const SOURCE_ID = 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515';

function i107(
  overrides: Partial<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport {
  const requirements = [
    ['EXACT_FIVE_ELEMENT_CONTROL_CYCLE', '木克土，土克水，水克火，火克金，金克木'],
    ['SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING', '两干相克；邻干力大，隔干次之，远干无力'],
    ['STEM_BRANCH_COMPONENT_APPLICABILITY', '包括地支藏干；它们之间的生克关系，也即五行的生克关系'],
    ['CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION', '不是见生就吉见克就凶'],
  ] as const;
  const requirementEvidence = requirements.map(([requirement, anchor]) => ({
    requirement,
    chapter: 'fixture chapter',
    section: 'fixture section',
    anchor,
    transcriptionUrl: 'https://example.invalid/fixture',
    faithfulParaphrase: 'fixture paraphrase',
    sourceTextInspectedAtLocator: true as const,
    exactLocatorResolved: true as const,
    topicRepresentedForLaterEvaluation: true as const,
    countsAsRequirementSatisfied: false as const,
  }));
  const base = {
    evidenceId: 'i107_i117_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    decision: 'ONE_EXISTING_SOURCE_CANDIDATE_REINSPECTED_UNDER_I106_ALL_FOUR_KE_TOPICS_LOCATED_REQUIREMENTS_NOT_EVALUATED',
    upstreamI106ReviewId: 'i106_fixture',
    externalDiscoveryPerformed: false,
    candidateReconsideredUnderI106: true,
    priorI95CoverageBorrowed: false,
    i95CandidateAutoAcceptanceUsed: false,
    candidateSourceReference: {
      sourceId: SOURCE_ID,
      sourceType: 'modern_book',
      title: '四柱预测学入门',
      author: '陈园',
      publisher: '广州出版社',
      publicationYear: 1995,
      language: 'zh-Hans',
      provenanceTier: 'practitioner_secondary',
      rights: { reusePolicy: 'paraphrase_only' },
    },
    candidateSourceId: SOURCE_ID,
    candidateSourceClass: 'practitioner_secondary',
    candidateRegistrationMode: 'REUSE_EXISTING_NORMALIZED_SOURCE_REFERENCE_NEW_KE_LANE_INSPECTION',
    sourceBibliographyCrossVerified: true,
    exactBookEditionIdentityResolved: true,
    equivalentReproducibleLocatorResolved: true,
    originalSourceTextInspectedViaTranscription: true,
    sourceTextInspectedAtAllLocators: true,
    exactLocatorResolvedForAllFourRequirements: true,
    oneCandidateOnly: true,
    sameCandidateProvidesAllFourTopicLocators: true,
    requirementEvidence,
    requirementEvidenceCount: 4,
    allFourRequirementTopicsRepresentedForLaterEvaluation: true,
    allFourRequirementsRemainNotEvaluated: true,
    requirementEvaluationPerformedByThisGate: false,
    candidateAcceptedForKeAuthority: false,
    keAuthorityAcquiredByThisGate: false,
    keDirectionalAdapterImplementedByThisGate: false,
    generalKnowledgeControlCycleUsedAsAuthority: false,
    fiveElementFactsImplicitlyUsedAsControlCycleAuthority: false,
    searchSnippetUsedAsAuthorityEvidence: false,
    modelGeneratedSynthesisUsedAsAuthorityEvidence: false,
    crossCandidateCompositionPerformed: false,
    crossCandidateCompositionAuthorized: false,
    directionEvidencePromotedToDamageOutcome: false,
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
    rejectionReasons: [],
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
    notes: [],
  } as const;
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport;
}

function i116(
  overrides: Partial<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport {
  const base = {
    reviewId: 'i116_i117_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS',
    decision: 'VISIBLE_STEM_POSITIONAL_SUBSTRATE_COMPLETE_EFFECTIVE_INTERACTION_REQUIRES_SEPARATE_METHODOLOGY_REVIEW',
    upstreamI115EvidenceId: 'i115_fixture',
    snapshotId: 'snapshot_fixture',
    candidateSourceId: SOURCE_ID,
    visibleStemDirectionalBindingLayerResolved: true,
    visibleStemPositionalAdapterContractResolved: true,
    visibleStemCurrentChartPositionalEvidenceResolved: true,
    visibleStemPositionalSubstrateComplete: true,
    zeroEligibleVisibleVisibleBindingsAcceptedAsValidEvidenceLayerResult: true,
    positionalEvidenceMayEnterEffectiveInteractionMethodologyReview: true,
    authorizedNextReviewScope: 'VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    visibleStemEffectiveInteractionEligibilityResolved: false,
    visibleStemEffectiveInteractionEligibilityMayBeInferredDirectlyFromPositionalEvidence: false,
    farStemNoForceMayBePromotedToNoInteraction: false,
    qualitativeForceMayBeConvertedToNumericWeight: false,
    slotDistanceMayBeConvertedToNumericForceWeight: false,
    positionalEvidenceMayResolveDamageOutcome: false,
    positionalEvidenceMayResolveDamageMagnitude: false,
    positionalEvidenceMayResolveSettlementOutcome: false,
    positionalEvidenceMayResolveRelativeForce: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    visibleStemReviewMayBorrowHiddenStemAuthority: false,
    hiddenStemEvidenceMayBorrowVisibleStemPositionRule: false,
    effectiveInteractionSetResolved: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    notes: [],
  } as const;
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport;
}

describe('I117 source 克 visible-stem effective interaction eligibility methodology review', () => {
  test('preserves the source qualitative positional semantics but rejects a binary eligibility threshold', () => {
    const report = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW');
    expect(report.decision).toBe('VISIBLE_STEM_POSITIONAL_FORCE_SEMANTICS_AVAILABLE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_NOT_AUTHORIZED');
    expect(report.sourceVisibleStemLocatorVerified).toBe(true);
    expect(report.sourceExplicitlyDescribesVisibleStemKeRelation).toBe(true);
    expect(report.sourceExplicitlyDistinguishesPositionalQualitativeForce).toBe(true);
    expect(report.sourceEstablishesQualitativePositionalForceOrdering).toBe(true);
    expect(report.sourceEstablishesBinaryInteractionThreshold).toBe(false);
  });

  test('keeps 邻干 隔干 远干 and 力大 次之 无力 as qualitative evidence only', () => {
    const report = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(report.sourcePositionVocabulary).toEqual(['邻干', '隔干', '远干']);
    expect(report.sourceQualitativeForceVocabulary).toEqual(['力大', '次之', '无力']);
    expect(report.qualitativeOrderingMayBeConvertedToNumericWeight).toBe(false);
    expect(report.slotDistanceMayBeUsedAsNumericInteractionThreshold).toBe(false);
    expect(report.binaryEligibilityMayBeInferredFromQualitativeOrdering).toBe(false);
  });

  test('does not translate 无力 into no interaction or zero damage', () => {
    const report = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(report.sourceExplicitlyDefinesWuLiAsNoInteraction).toBe(false);
    expect(report.sourceExplicitlyDefinesWuLiAsZeroEffect).toBe(false);
    expect(report.farStemNoForceMayBePromotedToNoInteraction).toBe(false);
    expect(report.farStemNoForceMayBePromotedToZeroDamage).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
  });

  test('confirms the visible-stem threshold authority gap and requires additional authority', () => {
    const report = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(report.visibleStemInteractionThresholdAuthorityGapConfirmed).toBe(true);
    expect(report.visibleStemInteractionThresholdAuthorityGap).toBe('SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED');
    expect(report.additionalAuthorityRequiredForBinaryEligibilityThreshold).toBe(true);
    expect(report.existingSourceMayStillSupportNonBinaryPositionalEvidence).toBe(true);
    expect(report.positionalEvidenceMayRemainResearchEvidenceWithoutBinaryEligibility).toBe(true);
  });

  test('keeps damage evaluation and I98 methodology materialization blocked', () => {
    const report = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(report.damageEvaluationMayProceedWithoutBinaryEligibilityResolution).toBe(false);
    expect(report.i98KeDamageVocabularyEvaluationResolved).toBe(false);
    expect(report.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.damageOutcomeAuthorized).toBe(false);
    expect(report.damageMagnitudeAuthorized).toBe(false);
    expect(report.settlementOutcomeAuthorized).toBe(false);
  });

  test('keeps the hidden-stem authority gap independent', () => {
    const report = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.visibleStemThresholdReviewMayResolveHiddenStemEligibility).toBe(false);
  });

  test('fails closed on source identity mismatch or an invalid I116 promotion boundary', () => {
    const mismatched = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(
      i107({ candidateSourceId: 'source_other' }),
      i116(),
    );
    expect(mismatched.status).toBe('I107_OR_I116_UNRESOLVED_OR_INVALID');
    expect(mismatched.visibleStemInteractionThresholdAuthorityGap).toBe('UPSTREAM_INVALID');

    const invalid = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(
      i107(),
      i116({ visibleStemEffectiveInteractionEligibilityResolved: true as false }),
    );
    expect(invalid.status).toBe('I107_OR_I116_UNRESOLVED_OR_INVALID');
  });

  test('is deterministic and preserves production settlement and classifier guards', () => {
    const first = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    const second = buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(i107(), i116());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
    expect(first.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
    expect(first.structuralRelationKindMutationAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.clashSettlementAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW');
  });
});
