import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { MethodologyFamily } from '../contracts/interpretation.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport } from './i96-challenge-combination-support-channel-untouched-support-effect-single-candidate-i84-full-coverage-evaluation-evidence.js';

export const I97_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-single-candidate-authority-promotion-readiness-review-v1';

const EXPECTED_REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const);

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS'
    | 'I96_UNRESOLVED_OR_INVALID';
  decision:
    | 'I84_FULL_COVERAGE_CAN_ENTER_RESEARCH_METHODOLOGY_DEFINITION_REVIEW_DIRECT_RULE_AND_EXECUTABLE_PROMOTION_BLOCKED'
    | 'PROMOTION_READINESS_NOT_ESTABLISHED';
  upstreamI96EvidenceId: string;
  candidateRegistrationId: string | null;
  candidateSourceId: string | null;
  candidateMeetsFrozenI84AcceptanceContract: boolean;
  authorityCoverageGapSatisfied: boolean;
  authorityGapClosed: false;
  promotionLifecycleEntryReady: boolean;
  authorizedEntryStage: 'RESEARCH_METHODOLOGY_DEFINITION_CONTRACT' | 'none';
  recommendedMethodologyFamily: MethodologyFamily | null;
  methodologyStatusCeilingByThisGate: 'research' | 'none';
  researchMethodologyDefinitionContractRequired: boolean;
  methodologySourceLinkMustReferenceCandidate: boolean;
  methodologyMustPreserveConditionalNotDefaultPersistence: boolean;
  methodologyMustDefineRepositoryStateMapping: boolean;
  methodologyMayTranslateNoTouchIntoDefaultActive: false;
  methodologyMayTranslateNoTouchIntoDefaultPersisted: false;
  methodologyMayTranslateNoTouchIntoDefaultEffectiveSupport: false;
  directSourceToRulePromotionAuthorized: false;
  ruleDefinitionCreationAuthorized: false;
  rulePromotionAuthorized: false;
  researchRegistryMutationAuthorizedByThisGate: false;
  stagingPromotionAuthorized: false;
  productionPromotionAuthorized: false;
  sourceReferenceDirectReviewAttestationSupported: false;
  methodologyAndRuleContentAttestationRequiredForPromotion: true;
  internalReviewRequiredBeforeStaging: true;
  domainReviewRequiredBeforeProduction: true;
  trustPinnedAttestationRequiredForPromotedPack: true;
  singleSourceProductionQualitySufficient: false;
  productionMultiSourceSupportRequiredByExistingPolicy: true;
  candidateSourceMayRemainResearchEvidenceWithoutProductionPromotion: true;
  candidateAcceptedForUntouchedSupportAuthority: false;
  candidatePromotedToMethodologyOrRuleAuthority: false;
  sourceReferenceApprovedForMethodologyOrRuleUse: false;
  methodologyOrRulePromotionAuthorized: false;
  executableAuthorityAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
  universalDefaultActiveRuleAuthorized: false;
  universalDefaultPersistedRuleAuthorized: false;
  universalDefaultEffectiveSupportRuleAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  effectiveSupportToRelativeForceAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_authority_promotion_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI96Accepted(
  i96: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport,
): boolean {
  return (
    i96.status === 'RESOLVED_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE' &&
    i96.decision ===
      'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_I84_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED' &&
    i96.candidateRegistrationId !== null &&
    i96.candidateSourceId !== null &&
    i96.coverage.length === EXPECTED_REQUIREMENT_IDS.length &&
    i96.coverage.every(
      (item, index) =>
        item.requirementId === EXPECTED_REQUIREMENT_IDS[index] &&
        item.coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE' &&
        item.countsAsSatisfiedForI84 &&
        item.evidenceComesFromSameRegisteredCandidate &&
        item.priorCandidateCoverageBorrowed === false &&
        item.absenceOfTrackedContestAloneMaySubstitute === false &&
        item.supportDirectionAloneMaySubstitute === false &&
        item.genericNoTouchMayBePromotedToActive === false &&
        item.genericNoTouchMayBePromotedToPersisted === false &&
        item.genericNoTouchMayBePromotedToEffectiveSupport === false &&
        item.numericCalibrationMaySubstitute === false,
    ) &&
    i96.evaluatedRequirementCount === EXPECTED_REQUIREMENT_IDS.length &&
    i96.satisfiedRequirementCount === EXPECTED_REQUIREMENT_IDS.length &&
    i96.partialRequirementCount === 0 &&
    i96.unsupportedRequirementCount === 0 &&
    i96.allSixRequirementsEvaluated &&
    i96.candidateSatisfiesAllI84Requirements &&
    i96.candidateMeetsFrozenI84AcceptanceContract &&
    i96.authorityCoverageGapSatisfied &&
    i96.authorityGapClosed === false &&
    i96.conditionalUntouchedPersistenceSemanticsIdentified &&
    i96.persistenceSemanticsClass === 'CONDITIONAL_NOT_DEFAULT' &&
    i96.candidateAcceptedForUntouchedSupportAuthority === false &&
    i96.candidatePromotedToMethodologyOrRuleAuthority === false &&
    i96.sourceReferenceApprovedForMethodologyOrRuleUse === false &&
    i96.promotionReadinessReviewRequired &&
    i96.additionalCandidateDiscoveryRequired === false &&
    i96.priorI88CandidateCoverageBorrowed === false &&
    i96.priorI91CandidateCoverageBorrowed === false &&
    i96.crossCandidateSynthesisPerformed === false &&
    i96.crossCandidateSynthesisAuthorized === false &&
    i96.centralExecutableRegistryMutationPerformed === false &&
    i96.methodologyOrRulePromotionAuthorized === false &&
    i96.executableAuthorityAuthorized === false &&
    i96.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i96.universalDefaultActiveRuleAuthorized === false &&
    i96.universalDefaultPersistedRuleAuthorized === false &&
    i96.universalDefaultEffectiveSupportRuleAuthorized === false &&
    i96.sourceActivationVerdictAuthorized === false &&
    i96.sourcePersistenceVerdictAuthorized === false &&
    i96.sourceEffectiveSupportVerdictAuthorized === false &&
    i96.relativeForceVerdictAuthorized === false &&
    i96.crossRelationPrecedenceAuthorized === false &&
    i96.classificationAuthorized === false &&
    i96.numericScoringAuthorized === false &&
    i96.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW'
  );
}

function commonMaterial(
  i96: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport,
) {
  return {
    reviewVersion:
      I97_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW_VERSION,
    upstreamI96EvidenceId: i96.evidenceId,
    authorityGapClosed: false as const,
    methodologyMayTranslateNoTouchIntoDefaultActive: false as const,
    methodologyMayTranslateNoTouchIntoDefaultPersisted: false as const,
    methodologyMayTranslateNoTouchIntoDefaultEffectiveSupport: false as const,
    directSourceToRulePromotionAuthorized: false as const,
    ruleDefinitionCreationAuthorized: false as const,
    rulePromotionAuthorized: false as const,
    researchRegistryMutationAuthorizedByThisGate: false as const,
    stagingPromotionAuthorized: false as const,
    productionPromotionAuthorized: false as const,
    sourceReferenceDirectReviewAttestationSupported: false as const,
    methodologyAndRuleContentAttestationRequiredForPromotion: true as const,
    internalReviewRequiredBeforeStaging: true as const,
    domainReviewRequiredBeforeProduction: true as const,
    trustPinnedAttestationRequiredForPromotedPack: true as const,
    singleSourceProductionQualitySufficient: false as const,
    productionMultiSourceSupportRequiredByExistingPolicy: true as const,
    candidateSourceMayRemainResearchEvidenceWithoutProductionPromotion: true as const,
    candidateAcceptedForUntouchedSupportAuthority: false as const,
    candidatePromotedToMethodologyOrRuleAuthority: false as const,
    sourceReferenceApprovedForMethodologyOrRuleUse: false as const,
    methodologyOrRulePromotionAuthorized: false as const,
    executableAuthorityAuthorized: false as const,
    untouchedSupportEffectRuleImplementationAuthorized: false as const,
    universalDefaultActiveRuleAuthorized: false as const,
    universalDefaultPersistedRuleAuthorized: false as const,
    universalDefaultEffectiveSupportRuleAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    effectiveSupportToRelativeForceAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI97ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReview(
  i96: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport {
  const common = commonMaterial(i96);

  if (!exactI96Accepted(i96)) {
    return finalized({
      ...common,
      status: 'I96_UNRESOLVED_OR_INVALID',
      decision: 'PROMOTION_READINESS_NOT_ESTABLISHED',
      candidateRegistrationId: null,
      candidateSourceId: null,
      candidateMeetsFrozenI84AcceptanceContract: false,
      authorityCoverageGapSatisfied: false,
      promotionLifecycleEntryReady: false,
      authorizedEntryStage: 'none',
      recommendedMethodologyFamily: null,
      methodologyStatusCeilingByThisGate: 'none',
      researchMethodologyDefinitionContractRequired: false,
      methodologySourceLinkMustReferenceCandidate: false,
      methodologyMustPreserveConditionalNotDefaultPersistence: false,
      methodologyMustDefineRepositoryStateMapping: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE',
      notes: [
        'I97 remains fail-closed unless I96 has exact six-of-six same-candidate coverage with conditional-not-default persistence semantics and every executable/promotion guard still false.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS',
    decision:
      'I84_FULL_COVERAGE_CAN_ENTER_RESEARCH_METHODOLOGY_DEFINITION_REVIEW_DIRECT_RULE_AND_EXECUTABLE_PROMOTION_BLOCKED',
    candidateRegistrationId: i96.candidateRegistrationId,
    candidateSourceId: i96.candidateSourceId,
    candidateMeetsFrozenI84AcceptanceContract: true,
    authorityCoverageGapSatisfied: true,
    promotionLifecycleEntryReady: true,
    authorizedEntryStage: 'RESEARCH_METHODOLOGY_DEFINITION_CONTRACT',
    recommendedMethodologyFamily: 'stem_branch_interaction',
    methodologyStatusCeilingByThisGate: 'research',
    researchMethodologyDefinitionContractRequired: true,
    methodologySourceLinkMustReferenceCandidate: true,
    methodologyMustPreserveConditionalNotDefaultPersistence: true,
    methodologyMustDefineRepositoryStateMapping: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT',
    notes: [
      'I96 six-of-six coverage is sufficient to enter the existing governed promotion lifecycle, but the first admissible artifact is a research MethodologyDefinition contract rather than a RuleDefinition or executable registry mutation.',
      'The methodology must translate the source semantics into repository concepts without turning NO_TRACKED_RELATION_TOUCH into default ACTIVE, PERSISTED, or effective-support verdicts. The source supports conditional-not-default persistence only.',
      'The existing review model attests methodology/rule content, not SourceReference directly. Any later staging promotion therefore requires content-bound internal review and trust; production requires content-bound domain review and trust.',
      'Existing production authorization also requires multi-source-supported rule quality. A single practitioner-secondary source that satisfies I84 coverage is not by itself sufficient for production rule quality.',
      'Rule definition, executable authority, relative force, clash settlement, cross-relation precedence, numeric scoring, and strong/weak classification remain blocked.',
    ],
  });
}
