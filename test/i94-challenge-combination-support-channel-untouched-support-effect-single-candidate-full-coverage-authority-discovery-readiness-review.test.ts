import { describe, expect, test } from 'vitest';
import {
  buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport,
} from '../src/index.js';

const IDS = [
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const;

function i84(): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  return {
    reviewId: 'i84_i94_fixture',
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS',
    decision: 'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    requirementsFrozen: true,
    allRequirementsMandatory: true,
    requirements: IDS.map((requirementId) => ({
      requirementId,
      requirement: requirementId,
      mandatory: true,
      currentCanonicalAuthoritySatisfies: false,
      futureAuthorityCandidateMustSatisfy: true,
      silenceOrAbsenceOfContestMaySatisfy: false,
      supportDirectionAloneMaySatisfy: false,
      scopedPatternExampleAloneMaySatisfy: false,
      numericCalibrationMaySubstitute: false,
    })),
    candidateMayPassWithPartialCoverage: false,
    candidateSetCompositionPolicyResolved: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport;
}

function i93(): ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport {
  return {
    reviewId: 'i93_i94_fixture',
    status: 'RESOLVED_CANDIDATE_SET_COMPOSITION_POLICY_READINESS',
    decision: 'CURRENT_I84_CONTRACT_BLOCKS_PARTIAL_CANDIDATE_COMPOSITION_SINGLE_CANDIDATE_FULL_COVERAGE_REQUIRED',
    candidateCountEvaluated: 2,
    anyCandidateSatisfiesAllI84Requirements: false,
    allObservedCandidateCoverageIsPartialOrUnsupported: true,
    currentI84ContractRequiresEachFutureCandidateToSatisfyAllRequirements: true,
    candidateMayPassWithPartialCoverage: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    candidateSetCompositionPolicyResolved: false,
    candidateSetCompositionPolicyCanBeDerivedFromExistingCoverageEvidence: false,
    partialCoverageUnionMayCountAsSatisfiedCoverage: false,
    partialPlusPartialMayBecomeSatisfiedByAggregation: false,
    newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance: true,
    newNormativeCompositionPolicyAuthorizedByThisGate: false,
    underCurrentContractSingleCandidateFullCoverageRequired: true,
    authorityGapClosed: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport;
}

describe('I94 untouched support effect single-candidate full-coverage authority discovery readiness review', () => {
  test('authorizes only the single-candidate full-I84-coverage discovery mode', () => {
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(report.status).toBe('RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_READINESS');
    expect(report.decision).toBe('SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION');
    expect(report.discoveryMode).toBe('SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY');
    expect(report.oneCandidateOnly).toBe(true);
  });

  test('freezes all six requirements as mandatory same-candidate independent-evidence lanes', () => {
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(report.discoveryRequirements).toHaveLength(6);
    expect(report.discoveryRequirements.map((item) => item.requirementId)).toEqual(IDS);
    expect(report.discoveryRequirements.every((item) => item.mandatory)).toBe(true);
    expect(report.discoveryRequirements.every((item) => item.sameCandidateMustProvideIndependentExactEvidence)).toBe(true);
  });

  test('requires normalized provenance, exact locator, original inspection, and reproducible source identity', () => {
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(report.candidateMustUseI87RegistrationContract).toBe(true);
    expect(report.oneNormalizedSourceReferencePerCandidateRequired).toBe(true);
    expect(report.originalSourceInspectionRequired).toBe(true);
    expect(report.exactSourceIdentityRequired).toBe(true);
    expect(report.exactLocatorRequired).toBe(true);
    expect(report.stableRevisionOrEquivalentReproducibleLocatorRequired).toBe(true);
  });

  test('does not pre-approve coverage at discovery time', () => {
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateCoverageEvaluatedByThisGate).toBe(false);
    expect(report.candidateCoveragePreApprovalAuthorized).toBe(false);
    expect(report.allSixRequirementCoverageMustBeEvaluatedAfterRegistration).toBe(true);
    expect(report.discoveryRequirements.every((item) => !item.coverageMayBePreApprovedAtDiscovery)).toBe(true);
  });

  test('blocks partial fallback and every cross-candidate composition shortcut', () => {
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(report.partialCoverageFallbackAuthorized).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.implicitCrossSourceSynthesisAuthorized).toBe(false);
    expect(report.multiplePartialCandidatesMaySubstituteForOneFullCandidate).toBe(false);
  });

  test('blocks snippets, model synthesis, secondary summaries, and numeric calibration as authority substitutes', () => {
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.modelGeneratedSynthesisMayCountAsAuthorityEvidence).toBe(false);
    expect(report.secondarySummaryMaySubstituteForOriginalSourceInspection).toBe(false);
    expect(report.numericCalibrationMayCountAsNormativeAuthority).toBe(false);
    expect(report.discoveryRequirements.every((item) => !item.numericCalibrationMaySubstitute)).toBe(true);
  });

  test('fails closed when upstream I93 permits partial composition', () => {
    const invalid = {
      ...i93(),
      partialCandidateCompositionAuthorized: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport;
    const report = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      invalid,
    );
    expect(report.status).toBe('I84_OR_I93_UNRESOLVED_OR_INVALID');
    expect(report.discoveryRequirements).toEqual([]);
    expect(report.actualExternalDiscoveryPerformedByThisGate).toBe(false);
  });

  test('preserves no-candidate fail-closed semantics and all runtime/scoring/classifier guards deterministically', () => {
    const first = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    const second = buildI94ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReview(
      i84(),
      i93(),
    );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.actualExternalDiscoveryPerformedByThisGate).toBe(false);
    expect(first.noCandidateFoundMayBeConvertedToDefaultRule).toBe(false);
    expect(first.methodologyOrRulePromotionAuthorized).toBe(false);
    expect(first.executableAuthorityAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE');
  });
});
