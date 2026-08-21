import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport } from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport } from './i89-challenge-combination-support-channel-untouched-support-effect-authority-candidate-i84-requirement-coverage-evidence.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport } from './i92-challenge-combination-support-channel-untouched-support-effect-targeted-candidate-i84-requirement-coverage-evidence.js';

export const I93_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-candidate-set-composition-policy-readiness-review-v1';

export interface I93CandidateCoverageProfile {
  evidenceId: string;
  candidateRegistrationId: string;
  candidateSourceId: string;
  satisfiedRequirementCount: number;
  partialRequirementCount: number;
  unsupportedRequirementCount: number;
  satisfiesAllI84Requirements: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_CANDIDATE_SET_COMPOSITION_POLICY_READINESS'
    | 'I84_I89_OR_I92_UNRESOLVED_OR_INVALID';
  decision:
    | 'CURRENT_I84_CONTRACT_BLOCKS_PARTIAL_CANDIDATE_COMPOSITION_SINGLE_CANDIDATE_FULL_COVERAGE_REQUIRED'
    | 'COMPOSITION_READINESS_NOT_EVALUATED';
  upstreamI84ReviewId: string;
  upstreamI89EvidenceId: string;
  upstreamI92EvidenceId: string;
  candidateProfiles: readonly I93CandidateCoverageProfile[];
  candidateCountEvaluated: number;
  anyCandidateSatisfiesAllI84Requirements: false;
  allObservedCandidateCoverageIsPartialOrUnsupported: boolean;
  currentI84ContractRequiresEachFutureCandidateToSatisfyAllRequirements: boolean;
  candidateMayPassWithPartialCoverage: false;
  partialCandidateCompositionAuthorized: false;
  implicitCrossSourceSynthesisAuthorized: false;
  candidateSetCompositionPolicyResolved: false;
  candidateSetCompositionPolicyCanBeDerivedFromExistingCoverageEvidence: false;
  partialCoverageUnionMayCountAsSatisfiedCoverage: false;
  partialPlusPartialMayBecomeSatisfiedByAggregation: false;
  relevanceOverlapMayCountAsCompositionAuthority: false;
  primarySourceMultiplicityMayCountAsCompositionAuthority: false;
  newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance: true;
  newNormativeCompositionPolicyAuthorizedByThisGate: false;
  underCurrentContractSingleCandidateFullCoverageRequired: boolean;
  authorityGapClosed: false;
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
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_candidate_set_composition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
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
    i84.requirements.length === 6 &&
    i84.requirements.every(
      (requirement) =>
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

function exactI89Accepted(
  i89: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
): boolean {
  return (
    i89.status === 'RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE' &&
    i89.decision === 'REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE' &&
    i89.candidateRegistrationId !== null &&
    i89.candidateSourceId !== null &&
    i89.evaluatedRequirementCount === 6 &&
    i89.satisfiedRequirementCount === 0 &&
    i89.partialRequirementCount === 3 &&
    i89.unsupportedRequirementCount === 3 &&
    i89.allSixRequirementsEvaluated &&
    i89.candidateSatisfiesAllI84Requirements === false &&
    i89.candidateAcceptedForUntouchedSupportAuthority === false &&
    i89.authorityGapClosed === false &&
    i89.candidateSetCompositionPolicyResolved === false &&
    i89.crossCandidateSynthesisAuthorized === false &&
    i89.methodologyOrRulePromotionAuthorized === false &&
    i89.executableAuthorityAuthorized === false &&
    i89.sourceActivationVerdictAuthorized === false &&
    i89.sourcePersistenceVerdictAuthorized === false &&
    i89.sourceEffectiveSupportVerdictAuthorized === false &&
    i89.relativeForceVerdictAuthorized === false &&
    i89.crossRelationPrecedenceAuthorized === false &&
    i89.classificationAuthorized === false &&
    i89.numericScoringAuthorized === false
  );
}

function exactI92Accepted(
  i92: ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport,
): boolean {
  return (
    i92.status === 'RESOLVED_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE' &&
    i92.decision ===
      'TARGETED_REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE' &&
    i92.candidateRegistrationId !== null &&
    i92.candidateSourceId !== null &&
    i92.evaluatedRequirementCount === 6 &&
    i92.satisfiedRequirementCount === 0 &&
    i92.partialRequirementCount === 4 &&
    i92.unsupportedRequirementCount === 2 &&
    i92.allSixRequirementsEvaluated &&
    i92.candidateSatisfiesAllI84Requirements === false &&
    i92.candidateAcceptedForUntouchedSupportAuthority === false &&
    i92.authorityGapClosed === false &&
    i92.candidateSetCompositionPolicyResolved === false &&
    i92.crossCandidateSynthesisPerformed === false &&
    i92.crossCandidateSynthesisAuthorized === false &&
    i92.priorI88CandidateCoverageBorrowed === false &&
    i92.methodologyOrRulePromotionAuthorized === false &&
    i92.executableAuthorityAuthorized === false &&
    i92.sourceActivationVerdictAuthorized === false &&
    i92.sourcePersistenceVerdictAuthorized === false &&
    i92.sourceEffectiveSupportVerdictAuthorized === false &&
    i92.relativeForceVerdictAuthorized === false &&
    i92.crossRelationPrecedenceAuthorized === false &&
    i92.classificationAuthorized === false &&
    i92.numericScoringAuthorized === false &&
    i92.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW'
  );
}

function unresolved(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i89: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
  i92: ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport {
  return finalized({
    reviewVersion:
      I93_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW_VERSION,
    status: 'I84_I89_OR_I92_UNRESOLVED_OR_INVALID',
    decision: 'COMPOSITION_READINESS_NOT_EVALUATED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI89EvidenceId: i89.evidenceId,
    upstreamI92EvidenceId: i92.evidenceId,
    candidateProfiles: [],
    candidateCountEvaluated: 0,
    anyCandidateSatisfiesAllI84Requirements: false,
    allObservedCandidateCoverageIsPartialOrUnsupported: false,
    currentI84ContractRequiresEachFutureCandidateToSatisfyAllRequirements: false,
    candidateMayPassWithPartialCoverage: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    candidateSetCompositionPolicyResolved: false,
    candidateSetCompositionPolicyCanBeDerivedFromExistingCoverageEvidence: false,
    partialCoverageUnionMayCountAsSatisfiedCoverage: false,
    partialPlusPartialMayBecomeSatisfiedByAggregation: false,
    relevanceOverlapMayCountAsCompositionAuthority: false,
    primarySourceMultiplicityMayCountAsCompositionAuthority: false,
    newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance: true,
    newNormativeCompositionPolicyAuthorizedByThisGate: false,
    underCurrentContractSingleCandidateFullCoverageRequired: false,
    authorityGapClosed: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS',
    notes: [
      'Exact I84, I89, and I92 fail-closed authority evidence is required before candidate-set composition readiness may be evaluated.',
    ],
  });
}

export function buildI93ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReview(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i89: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
  i92: ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectCandidateSetCompositionPolicyReadinessReviewReport {
  if (!exactI84Accepted(i84) || !exactI89Accepted(i89) || !exactI92Accepted(i92)) {
    return unresolved(i84, i89, i92);
  }

  const candidateProfiles: readonly I93CandidateCoverageProfile[] = [
    {
      evidenceId: i89.evidenceId,
      candidateRegistrationId: i89.candidateRegistrationId as string,
      candidateSourceId: i89.candidateSourceId as string,
      satisfiedRequirementCount: i89.satisfiedRequirementCount,
      partialRequirementCount: i89.partialRequirementCount,
      unsupportedRequirementCount: i89.unsupportedRequirementCount,
      satisfiesAllI84Requirements: false,
    },
    {
      evidenceId: i92.evidenceId,
      candidateRegistrationId: i92.candidateRegistrationId as string,
      candidateSourceId: i92.candidateSourceId as string,
      satisfiedRequirementCount: i92.satisfiedRequirementCount,
      partialRequirementCount: i92.partialRequirementCount,
      unsupportedRequirementCount: i92.unsupportedRequirementCount,
      satisfiesAllI84Requirements: false,
    },
  ];

  return finalized({
    reviewVersion:
      I93_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CANDIDATE_SET_COMPOSITION_POLICY_READINESS',
    decision:
      'CURRENT_I84_CONTRACT_BLOCKS_PARTIAL_CANDIDATE_COMPOSITION_SINGLE_CANDIDATE_FULL_COVERAGE_REQUIRED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI89EvidenceId: i89.evidenceId,
    upstreamI92EvidenceId: i92.evidenceId,
    candidateProfiles,
    candidateCountEvaluated: candidateProfiles.length,
    anyCandidateSatisfiesAllI84Requirements: false,
    allObservedCandidateCoverageIsPartialOrUnsupported: candidateProfiles.every(
      (profile) => profile.satisfiedRequirementCount === 0,
    ),
    currentI84ContractRequiresEachFutureCandidateToSatisfyAllRequirements:
      i84.requirements.every((requirement) => requirement.futureAuthorityCandidateMustSatisfy),
    candidateMayPassWithPartialCoverage: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    candidateSetCompositionPolicyResolved: false,
    candidateSetCompositionPolicyCanBeDerivedFromExistingCoverageEvidence: false,
    partialCoverageUnionMayCountAsSatisfiedCoverage: false,
    partialPlusPartialMayBecomeSatisfiedByAggregation: false,
    relevanceOverlapMayCountAsCompositionAuthority: false,
    primarySourceMultiplicityMayCountAsCompositionAuthority: false,
    newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance: true,
    newNormativeCompositionPolicyAuthorizedByThisGate: false,
    underCurrentContractSingleCandidateFullCoverageRequired: true,
    authorityGapClosed: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_READINESS',
    notes: [
      'I84 requires every future candidate to satisfy all six mandatory requirements and explicitly disallows partial-candidate passage, partial-candidate composition, and implicit cross-source synthesis.',
      'I89 and I92 each contain only partial or unsupported coverage and zero fully satisfied I84 requirements; their coexistence does not create new authority.',
      'A future explicit normative composition policy could change this boundary only through a separate governed review. I93 does not create such a policy.',
      'Under the current frozen contract, discovery must target a single independently registered candidate capable of full six-requirement coverage.',
    ],
  });
}
