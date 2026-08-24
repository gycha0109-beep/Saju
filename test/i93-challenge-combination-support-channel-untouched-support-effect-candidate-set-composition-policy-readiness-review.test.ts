import { describe, expect, test } from 'vitest';
import {
  buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport,
} from '../src/index.js';

const REQUIREMENT_IDS = [
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const;

function i84(): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  return {
    reviewId: 'i84_i93_fixture',
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS',
    decision: 'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    requirementsFrozen: true,
    allRequirementsMandatory: true,
    requirements: REQUIREMENT_IDS.map((requirementId) => ({
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

function i89(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport {
  return {
    evidenceId: 'i89_i93_fixture',
    status: 'RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    decision: 'REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE',
    candidateRegistrationId: 'candidate_ditiansui',
    candidateSourceId: 'source_ditiansui',
    evaluatedRequirementCount: 6,
    satisfiedRequirementCount: 0,
    partialRequirementCount: 3,
    unsupportedRequirementCount: 3,
    allSixRequirementsEvaluated: true,
    candidateSatisfiesAllI84Requirements: false,
    candidateAcceptedForUntouchedSupportAuthority: false,
    authorityGapClosed: false,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateSynthesisAuthorized: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport;
}

function i92(): ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport {
  return {
    evidenceId: 'i92_i93_fixture',
    status: 'RESOLVED_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    decision: 'TARGETED_REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE',
    candidateRegistrationId: 'candidate_sanming',
    candidateSourceId: 'source_sanming',
    evaluatedRequirementCount: 6,
    satisfiedRequirementCount: 0,
    partialRequirementCount: 4,
    unsupportedRequirementCount: 2,
    allSixRequirementsEvaluated: true,
    candidateSatisfiesAllI84Requirements: false,
    candidateAcceptedForUntouchedSupportAuthority: false,
    authorityGapClosed: false,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateSynthesisPerformed: false,
    crossCandidateSynthesisAuthorized: false,
    priorI88CandidateCoverageBorrowed: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport;
}

describe('I93 untouched support effect candidate-set composition policy readiness review', () => {
  test('evaluates the two independently registered partial candidate profiles', () => {
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(report.status).toBe('RESOLVED_CANDIDATE_SET_COMPOSITION_POLICY_READINESS');
    expect(report.candidateCountEvaluated).toBe(2);
    expect(report.candidateProfiles.map((item) => item.candidateSourceId)).toEqual([
      'source_ditiansui',
      'source_sanming',
    ]);
  });

  test('confirms neither candidate satisfies all six I84 requirements', () => {
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(report.anyCandidateSatisfiesAllI84Requirements).toBe(false);
    expect(report.allObservedCandidateCoverageIsPartialOrUnsupported).toBe(true);
    expect(report.candidateProfiles.every((item) => item.satisfiedRequirementCount === 0)).toBe(true);
  });

  test('preserves the frozen current-contract requirement that each candidate satisfy all requirements', () => {
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(report.currentI84ContractRequiresEachFutureCandidateToSatisfyAllRequirements).toBe(true);
    expect(report.candidateMayPassWithPartialCoverage).toBe(false);
    expect(report.underCurrentContractSingleCandidateFullCoverageRequired).toBe(true);
  });

  test('does not promote partial candidate union into satisfied coverage', () => {
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(report.partialCandidateCompositionAuthorized).toBe(false);
    expect(report.implicitCrossSourceSynthesisAuthorized).toBe(false);
    expect(report.partialCoverageUnionMayCountAsSatisfiedCoverage).toBe(false);
    expect(report.partialPlusPartialMayBecomeSatisfiedByAggregation).toBe(false);
  });

  test('does not infer composition authority from relevance overlap or multiple primary sources', () => {
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(report.relevanceOverlapMayCountAsCompositionAuthority).toBe(false);
    expect(report.primarySourceMultiplicityMayCountAsCompositionAuthority).toBe(false);
    expect(report.candidateSetCompositionPolicyCanBeDerivedFromExistingCoverageEvidence).toBe(false);
  });

  test('requires a separate normative policy before cross-candidate acceptance could ever be permitted', () => {
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(report.newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance).toBe(true);
    expect(report.newNormativeCompositionPolicyAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetCompositionPolicyResolved).toBe(false);
  });

  test('fails closed when upstream targeted coverage claims cross-candidate synthesis', () => {
    const invalid = {
      ...i92(),
      crossCandidateSynthesisPerformed: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport;
    const report = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      invalid,
    );
    expect(report.status).toBe('I84_I89_OR_I92_UNRESOLVED_OR_INVALID');
    expect(report.candidateCountEvaluated).toBe(0);
    expect(report.underCurrentContractSingleCandidateFullCoverageRequired).toBe(false);
  });

  test('keeps authority gap open and preserves all runtime, precedence, scoring, and classifier guards deterministically', () => {
    const first = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    const second = buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
      i84(),
      i89(),
      i92(),
    );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.authorityGapClosed).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS',
    );
  });
});
