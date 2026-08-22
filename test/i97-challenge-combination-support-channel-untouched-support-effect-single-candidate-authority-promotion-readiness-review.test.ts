import { describe, expect, test } from 'vitest';
import {
  buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport,
  type I84UntouchedSupportAuthorityRequirementId,
  type I96RequirementCoverageEvidence,
} from '../src/index.js';

const IDS = [
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[];

function coverage(): readonly I96RequirementCoverageEvidence[] {
  return IDS.map((requirementId) => ({
    requirementId,
    requirement: `fixture:${requirementId}`,
    coverageState: 'SUPPORTED_BY_REGISTERED_EVIDENCE',
    evidenceBasis: [`evidence:${requirementId}`],
    limitingReason: `limit:${requirementId}`,
    countsAsSatisfiedForI84: true,
    evidenceComesFromSameRegisteredCandidate: true,
    priorCandidateCoverageBorrowed: false,
    absenceOfTrackedContestAloneMaySubstitute: false,
    supportDirectionAloneMaySubstitute: false,
    genericNoTouchMayBePromotedToActive: false,
    genericNoTouchMayBePromotedToPersisted: false,
    genericNoTouchMayBePromotedToEffectiveSupport: false,
    numericCalibrationMaySubstitute: false,
  }));
}

function i96(): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport {
  return {
    evidenceId: 'i96_i97_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE',
    decision: 'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_I84_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED',
    upstreamI84ReviewId: 'i84_fixture',
    upstreamI95EvidenceId: 'i95_fixture',
    candidateRegistrationId: 'candidate_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    coverage: coverage(),
    evaluatedRequirementCount: 6,
    satisfiedRequirementCount: 6,
    partialRequirementCount: 0,
    unsupportedRequirementCount: 0,
    allSixRequirementsEvaluated: true,
    candidateSatisfiesAllI84Requirements: true,
    candidateMeetsFrozenI84AcceptanceContract: true,
    authorityCoverageGapSatisfied: true,
    authorityGapClosed: false,
    conditionalUntouchedPersistenceSemanticsIdentified: true,
    persistenceSemanticsClass: 'CONDITIONAL_NOT_DEFAULT',
    candidateAcceptedForUntouchedSupportAuthority: false,
    candidatePromotedToMethodologyOrRuleAuthority: false,
    sourceReferenceApprovedForMethodologyOrRuleUse: false,
    promotionReadinessReviewRequired: true,
    additionalCandidateDiscoveryRequired: false,
    priorI88CandidateCoverageBorrowed: false,
    priorI91CandidateCoverageBorrowed: false,
    crossCandidateSynthesisPerformed: false,
    crossCandidateSynthesisAuthorized: false,
    centralExecutableRegistryMutationPerformed: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW',
    notes: [],
  };
}

describe('I97 untouched support effect single-candidate authority promotion readiness review', () => {
  test('allows only entry into a research MethodologyDefinition contract', () => {
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(report.status).toBe('RESOLVED_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS');
    expect(report.decision).toBe(
      'I84_FULL_COVERAGE_CAN_ENTER_RESEARCH_METHODOLOGY_DEFINITION_REVIEW_DIRECT_RULE_AND_EXECUTABLE_PROMOTION_BLOCKED',
    );
    expect(report.promotionLifecycleEntryReady).toBe(true);
    expect(report.authorizedEntryStage).toBe('RESEARCH_METHODOLOGY_DEFINITION_CONTRACT');
    expect(report.researchMethodologyDefinitionContractRequired).toBe(true);
  });

  test('selects stem_branch_interaction and caps this gate at research methodology status', () => {
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(report.recommendedMethodologyFamily).toBe('stem_branch_interaction');
    expect(report.methodologyStatusCeilingByThisGate).toBe('research');
    expect(report.methodologySourceLinkMustReferenceCandidate).toBe(true);
    expect(report.methodologyMustDefineRepositoryStateMapping).toBe(true);
  });

  test('preserves conditional-not-default semantics and forbids default no-touch translations', () => {
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(report.methodologyMustPreserveConditionalNotDefaultPersistence).toBe(true);
    expect(report.methodologyMayTranslateNoTouchIntoDefaultActive).toBe(false);
    expect(report.methodologyMayTranslateNoTouchIntoDefaultPersisted).toBe(false);
    expect(report.methodologyMayTranslateNoTouchIntoDefaultEffectiveSupport).toBe(false);
  });

  test('blocks direct rule creation, registry mutation, staging, and production promotion', () => {
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(report.directSourceToRulePromotionAuthorized).toBe(false);
    expect(report.ruleDefinitionCreationAuthorized).toBe(false);
    expect(report.rulePromotionAuthorized).toBe(false);
    expect(report.researchRegistryMutationAuthorizedByThisGate).toBe(false);
    expect(report.stagingPromotionAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('preserves review-attestation and trust requirements for later promoted packs', () => {
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(report.sourceReferenceDirectReviewAttestationSupported).toBe(false);
    expect(report.methodologyAndRuleContentAttestationRequiredForPromotion).toBe(true);
    expect(report.internalReviewRequiredBeforeStaging).toBe(true);
    expect(report.domainReviewRequiredBeforeProduction).toBe(true);
    expect(report.trustPinnedAttestationRequiredForPromotedPack).toBe(true);
  });

  test('does not treat one practitioner-secondary source as sufficient production rule quality', () => {
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(report.singleSourceProductionQualitySufficient).toBe(false);
    expect(report.productionMultiSourceSupportRequiredByExistingPolicy).toBe(true);
    expect(report.candidateSourceMayRemainResearchEvidenceWithoutProductionPromotion).toBe(true);
    expect(report.authorityCoverageGapSatisfied).toBe(true);
    expect(report.authorityGapClosed).toBe(false);
  });

  test('fails closed if I96 prematurely promotes the candidate', () => {
    const invalid = {
      ...i96(),
      candidateAcceptedForUntouchedSupportAuthority: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport;
    const report = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(invalid);
    expect(report.status).toBe('I96_UNRESOLVED_OR_INVALID');
    expect(report.promotionLifecycleEntryReady).toBe(false);
    expect(report.authorizedEntryStage).toBe('none');
  });

  test('preserves all execution, effect, precedence, scoring, and classifier guards deterministically', () => {
    const first = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    const second = buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(i96());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.candidateAcceptedForUntouchedSupportAuthority).toBe(false);
    expect(first.candidatePromotedToMethodologyOrRuleAuthority).toBe(false);
    expect(first.sourceReferenceApprovedForMethodologyOrRuleUse).toBe(false);
    expect(first.methodologyOrRulePromotionAuthorized).toBe(false);
    expect(first.executableAuthorityAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT',
    );
  });
});
