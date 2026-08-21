import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  I84UntouchedSupportAuthorityRequirementId,
} from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport } from './i93-challenge-combination-support-channel-untouched-support-effect-candidate-set-composition-policy-readiness-review.js';

export const I94_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-single-candidate-full-coverage-authority-discovery-readiness-review-v1';

export interface I94SingleCandidateDiscoveryRequirement {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  mandatory: true;
  sameCandidateMustProvideIndependentExactEvidence: true;
  coverageMayBePreApprovedAtDiscovery: false;
  topicalRelevanceMayCountAsSatisfaction: false;
  scopedExampleMayCountAsUniversalRule: false;
  absenceOfContradictionMayCountAsSatisfaction: false;
  numericCalibrationMaySubstitute: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_READINESS'
    | 'I84_OR_I93_UNRESOLVED_OR_INVALID';
  decision:
    | 'SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION'
    | 'DISCOVERY_READINESS_NOT_ESTABLISHED';
  upstreamI84ReviewId: string;
  upstreamI93ReviewId: string;
  discoveryMode: 'SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY';
  discoveryRequirements: readonly I94SingleCandidateDiscoveryRequirement[];
  requiredRequirementCount: 6;
  oneCandidateOnly: true;
  candidateMustUseI87RegistrationContract: true;
  oneNormalizedSourceReferencePerCandidateRequired: true;
  originalSourceInspectionRequired: true;
  exactSourceIdentityRequired: true;
  exactLocatorRequired: true;
  stableRevisionOrEquivalentReproducibleLocatorRequired: true;
  sourceLanguageAndTranslationStatusRequired: true;
  scopeApplicabilityExceptionProvenanceRequired: true;
  coherentSingleSourceAuthorityScopeRequired: true;
  everyI84RequirementNeedsIndependentExactEvidenceWithinSameCandidate: true;
  allSixRequirementCoverageMustBeEvaluatedAfterRegistration: true;
  actualExternalDiscoveryPerformedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateCoverageEvaluatedByThisGate: false;
  candidateCoveragePreApprovalAuthorized: false;
  partialCoverageFallbackAuthorized: false;
  crossCandidateCompositionAuthorized: false;
  implicitCrossSourceSynthesisAuthorized: false;
  multiplePartialCandidatesMaySubstituteForOneFullCandidate: false;
  searchSnippetMayCountAsAuthorityEvidence: false;
  modelGeneratedSynthesisMayCountAsAuthorityEvidence: false;
  secondarySummaryMaySubstituteForOriginalSourceInspection: false;
  numericCalibrationMayCountAsNormativeAuthority: false;
  noCandidateFoundMayBeConvertedToDefaultRule: false;
  candidateSetCompositionPolicyResolved: false;
  methodologyOrRulePromotionAuthorized: false;
  executableAuthorityAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
  universalDefaultActiveRuleAuthorized: false;
  universalDefaultPersistedRuleAuthorized: false;
  universalDefaultEffectiveSupportRuleAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_single_candidate_full_coverage_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI84Accepted(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
): boolean {
  return (
    i84.status === 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS' &&
    i84.decision ===
      'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED' &&
    i84.requirementsFrozen &&
    i84.allRequirementsMandatory &&
    i84.requirements.length === REQUIREMENT_IDS.length &&
    i84.requirements.every(
      (requirement, index) =>
        requirement.requirementId === REQUIREMENT_IDS[index] &&
        requirement.mandatory &&
        requirement.futureAuthorityCandidateMustSatisfy &&
        requirement.silenceOrAbsenceOfContestMaySatisfy === false &&
        requirement.supportDirectionAloneMaySatisfy === false &&
        requirement.scopedPatternExampleAloneMaySatisfy === false &&
        requirement.numericCalibrationMaySubstitute === false,
    ) &&
    i84.candidateMayPassWithPartialCoverage === false &&
    i84.candidateSetCompositionPolicyResolved === false &&
    i84.partialCandidateCompositionAuthorized === false &&
    i84.implicitCrossSourceSynthesisAuthorized === false &&
    i84.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i84.sourceActivationVerdictAuthorized === false &&
    i84.sourcePersistenceVerdictAuthorized === false &&
    i84.sourceEffectiveSupportVerdictAuthorized === false &&
    i84.relativeForceVerdictAuthorized === false &&
    i84.crossRelationPrecedenceAuthorized === false &&
    i84.classificationAuthorized === false &&
    i84.numericScoringAuthorized === false
  );
}

function exactI93Accepted(
  i93: ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport,
): boolean {
  return (
    i93.status === 'RESOLVED_CANDIDATE_SET_COMPOSITION_POLICY_READINESS' &&
    i93.decision ===
      'CURRENT_I84_CONTRACT_BLOCKS_PARTIAL_CANDIDATE_COMPOSITION_SINGLE_CANDIDATE_FULL_COVERAGE_REQUIRED' &&
    i93.candidateCountEvaluated === 2 &&
    i93.anyCandidateSatisfiesAllI84Requirements === false &&
    i93.allObservedCandidateCoverageIsPartialOrUnsupported &&
    i93.currentI84ContractRequiresEachFutureCandidateToSatisfyAllRequirements &&
    i93.candidateMayPassWithPartialCoverage === false &&
    i93.partialCandidateCompositionAuthorized === false &&
    i93.implicitCrossSourceSynthesisAuthorized === false &&
    i93.candidateSetCompositionPolicyResolved === false &&
    i93.candidateSetCompositionPolicyCanBeDerivedFromExistingCoverageEvidence === false &&
    i93.partialCoverageUnionMayCountAsSatisfiedCoverage === false &&
    i93.partialPlusPartialMayBecomeSatisfiedByAggregation === false &&
    i93.newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance &&
    i93.newNormativeCompositionPolicyAuthorizedByThisGate === false &&
    i93.underCurrentContractSingleCandidateFullCoverageRequired &&
    i93.authorityGapClosed === false &&
    i93.methodologyOrRulePromotionAuthorized === false &&
    i93.executableAuthorityAuthorized === false &&
    i93.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i93.sourceActivationVerdictAuthorized === false &&
    i93.sourcePersistenceVerdictAuthorized === false &&
    i93.sourceEffectiveSupportVerdictAuthorized === false &&
    i93.relativeForceVerdictAuthorized === false &&
    i93.crossRelationPrecedenceAuthorized === false &&
    i93.classificationAuthorized === false &&
    i93.numericScoringAuthorized === false &&
    i93.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS'
  );
}

function discoveryRequirements(): readonly I94SingleCandidateDiscoveryRequirement[] {
  return REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    mandatory: true,
    sameCandidateMustProvideIndependentExactEvidence: true,
    coverageMayBePreApprovedAtDiscovery: false,
    topicalRelevanceMayCountAsSatisfaction: false,
    scopedExampleMayCountAsUniversalRule: false,
    absenceOfContradictionMayCountAsSatisfaction: false,
    numericCalibrationMaySubstitute: false,
  }));
}

function unresolved(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i93: ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport {
  return finalized({
    reviewVersion:
      I94_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: 'I84_OR_I93_UNRESOLVED_OR_INVALID',
    decision: 'DISCOVERY_READINESS_NOT_ESTABLISHED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI93ReviewId: i93.reviewId,
    discoveryMode: 'SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY',
    discoveryRequirements: [],
    requiredRequirementCount: 6,
    oneCandidateOnly: true,
    candidateMustUseI87RegistrationContract: true,
    oneNormalizedSourceReferencePerCandidateRequired: true,
    originalSourceInspectionRequired: true,
    exactSourceIdentityRequired: true,
    exactLocatorRequired: true,
    stableRevisionOrEquivalentReproducibleLocatorRequired: true,
    sourceLanguageAndTranslationStatusRequired: true,
    scopeApplicabilityExceptionProvenanceRequired: true,
    coherentSingleSourceAuthorityScopeRequired: true,
    everyI84RequirementNeedsIndependentExactEvidenceWithinSameCandidate: true,
    allSixRequirementCoverageMustBeEvaluatedAfterRegistration: true,
    actualExternalDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateCoverageEvaluatedByThisGate: false,
    candidateCoveragePreApprovalAuthorized: false,
    partialCoverageFallbackAuthorized: false,
    crossCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    multiplePartialCandidatesMaySubstituteForOneFullCandidate: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    modelGeneratedSynthesisMayCountAsAuthorityEvidence: false,
    secondarySummaryMaySubstituteForOriginalSourceInspection: false,
    numericCalibrationMayCountAsNormativeAuthority: false,
    noCandidateFoundMayBeConvertedToDefaultRule: false,
    candidateSetCompositionPolicyResolved: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: [
      'Exact frozen I84 acceptance requirements and exact I93 single-candidate current-contract boundary are required before full-coverage discovery readiness is established.',
    ],
  });
}

export function buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i93: ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport {
  if (!exactI84Accepted(i84) || !exactI93Accepted(i93)) return unresolved(i84, i93);

  return finalized({
    reviewVersion:
      I94_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_READINESS',
    decision: 'SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI93ReviewId: i93.reviewId,
    discoveryMode: 'SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY',
    discoveryRequirements: discoveryRequirements(),
    requiredRequirementCount: 6,
    oneCandidateOnly: true,
    candidateMustUseI87RegistrationContract: true,
    oneNormalizedSourceReferencePerCandidateRequired: true,
    originalSourceInspectionRequired: true,
    exactSourceIdentityRequired: true,
    exactLocatorRequired: true,
    stableRevisionOrEquivalentReproducibleLocatorRequired: true,
    sourceLanguageAndTranslationStatusRequired: true,
    scopeApplicabilityExceptionProvenanceRequired: true,
    coherentSingleSourceAuthorityScopeRequired: true,
    everyI84RequirementNeedsIndependentExactEvidenceWithinSameCandidate: true,
    allSixRequirementCoverageMustBeEvaluatedAfterRegistration: true,
    actualExternalDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateCoverageEvaluatedByThisGate: false,
    candidateCoveragePreApprovalAuthorized: false,
    partialCoverageFallbackAuthorized: false,
    crossCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    multiplePartialCandidatesMaySubstituteForOneFullCandidate: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    modelGeneratedSynthesisMayCountAsAuthorityEvidence: false,
    secondarySummaryMaySubstituteForOriginalSourceInspection: false,
    numericCalibrationMayCountAsNormativeAuthority: false,
    noCandidateFoundMayBeConvertedToDefaultRule: false,
    candidateSetCompositionPolicyResolved: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: [
      'I94 authorizes only external discovery for one independently registered candidate that could plausibly satisfy all six frozen I84 requirements from one coherent source authority scope.',
      'Discovery relevance is not coverage satisfaction. Every requirement must be evaluated independently after registration using exact evidence from the same candidate.',
      'Partial-candidate fallback, cross-source composition, snippets, model synthesis, secondary summaries without original inspection, and numeric calibration remain invalid authority shortcuts.',
      'If no qualifying candidate is found, the result remains no verified candidate; absence cannot be converted into a default ACTIVE, PERSISTED, or effective-support rule.',
    ],
  });
}
