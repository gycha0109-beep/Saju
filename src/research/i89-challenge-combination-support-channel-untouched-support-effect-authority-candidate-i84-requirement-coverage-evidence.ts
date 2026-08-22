import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  I84UntouchedSupportAuthorityRequirement,
  I84UntouchedSupportAuthorityRequirementId,
} from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidenceReport,
  I88RegisteredAuthorityCandidate,
} from './i88-challenge-combination-support-channel-untouched-support-effect-authority-candidate-discovery-registration-evidence.js';

export const I89_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-authority-candidate-i84-requirement-coverage-evidence-v1';

export type I89RequirementCoverageState =
  | 'SUPPORTED_BY_REGISTERED_EVIDENCE'
  | 'PARTIAL_SCOPED_SUPPORT_ONLY'
  | 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE';

export interface I89RequirementCoverageEvidence {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  requirement: string;
  coverageState: I89RequirementCoverageState;
  evidenceBasis: readonly string[];
  limitingReason: string;
  countsAsSatisfiedForI84: boolean;
  topicalRelevanceMaySubstituteForSatisfaction: false;
  scopedExampleMaySubstituteForUniversalRule: false;
  primaryProvenanceMaySubstituteForNormativeScope: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE'
    | 'I84_OR_I88_UNRESOLVED_OR_INVALID';
  decision:
    | 'REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE'
    | 'COVERAGE_NOT_EVALUATED';
  upstreamI84ReviewId: string;
  upstreamI88EvidenceId: string;
  candidateRegistrationId: string | null;
  candidateSourceId: string | null;
  coverage: readonly I89RequirementCoverageEvidence[];
  evaluatedRequirementCount: number;
  satisfiedRequirementCount: number;
  partialRequirementCount: number;
  unsupportedRequirementCount: number;
  allSixRequirementsEvaluated: boolean;
  candidateSatisfiesAllI84Requirements: boolean;
  candidateAcceptedForUntouchedSupportAuthority: false;
  authorityGapClosed: false;
  additionalCandidateDiscoveryRequired: boolean;
  candidateSetCompositionPolicyResolved: false;
  crossCandidateSynthesisAuthorized: false;
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
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS'
    | 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_PROMOTION_READINESS';
  notes: readonly string[];
}

const EXPECTED_REQUIREMENTS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_i84_coverage_${deterministicContentHash(material).slice(0, 24)}`,
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
    i84.requirements.length === EXPECTED_REQUIREMENTS.length &&
    i84.requirements.every(
      (requirement, index) =>
        requirement.requirementId === EXPECTED_REQUIREMENTS[index] &&
        requirement.mandatory &&
        requirement.futureAuthorityCandidateMustSatisfy &&
        requirement.silenceOrAbsenceOfContestMaySatisfy === false &&
        requirement.supportDirectionAloneMaySatisfy === false &&
        requirement.scopedPatternExampleAloneMaySatisfy === false &&
        requirement.numericCalibrationMaySubstitute === false,
    ) &&
    i84.candidateMayPassWithPartialCoverage === false &&
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

function exactI88Candidate(
  i88: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidenceReport,
): I88RegisteredAuthorityCandidate | null {
  if (
    i88.status !== 'RESOLVED_DISCOVERY_AND_REGISTRATION_EVIDENCE' ||
    i88.decision !==
      'VERIFIED_DISCOVERED_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED' ||
    i88.verifiedCandidateCount !== 1 ||
    i88.rejectedCandidateCount !== 0 ||
    i88.registeredCandidate === null ||
    i88.sourceReferenceNormalized === false ||
    i88.candidateRegistrationContentAddressed === false ||
    i88.allI84RequirementSlotsRemainNotEvaluated === false ||
    i88.candidateRequirementEvaluationPerformedByThisGate ||
    i88.sourceRegistrationMeansRequirementSatisfied ||
    i88.sourceRegistrationMeansMethodologyApproved ||
    i88.sourceRegistrationMeansRuleApproved ||
    i88.sourceRegistrationMeansExecutableAuthority ||
    i88.centralExecutableRegistryMutationPerformed ||
    i88.crossCandidateSynthesisAuthorized ||
    i88.untouchedSupportEffectRuleImplementationAuthorized ||
    i88.sourceActivationVerdictAuthorized ||
    i88.sourcePersistenceVerdictAuthorized ||
    i88.sourceEffectiveSupportVerdictAuthorized ||
    i88.relativeForceVerdictAuthorized ||
    i88.crossRelationPrecedenceAuthorized ||
    i88.classificationAuthorized ||
    i88.numericScoringAuthorized
  ) {
    return null;
  }
  const candidate = i88.registeredCandidate;
  if (
    candidate.registrationStatus !== 'RESEARCH_CANDIDATE_ONLY' ||
    candidate.methodologyOrRuleApproval !== 'NOT_GRANTED' ||
    candidate.executableAuthorityStatus !== 'NOT_AUTHORIZED' ||
    candidate.candidateRequirementEvaluationStatus !== 'NOT_STARTED' ||
    candidate.centralExecutableRegistryMutationPerformed ||
    candidate.sourceReferenceApprovedForMethodologyOrRuleUse ||
    candidate.requirementSlots.length !== EXPECTED_REQUIREMENTS.length ||
    candidate.requirementSlots.some(
      (slot, index) =>
        slot.requirementId !== EXPECTED_REQUIREMENTS[index] || slot.coverageState !== 'NOT_EVALUATED',
    )
  ) {
    return null;
  }
  return candidate;
}

function coverageItem(
  requirement: I84UntouchedSupportAuthorityRequirement,
  coverageState: I89RequirementCoverageState,
  evidenceBasis: readonly string[],
  limitingReason: string,
): I89RequirementCoverageEvidence {
  return {
    requirementId: requirement.requirementId,
    requirement: requirement.requirement,
    coverageState,
    evidenceBasis,
    limitingReason,
    countsAsSatisfiedForI84: coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE',
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  };
}

function assessRequirement(
  requirement: I84UntouchedSupportAuthorityRequirement,
  candidate: I88RegisteredAuthorityCandidate,
): I89RequirementCoverageEvidence {
  const locator = candidate.exactLocatorStatement;
  switch (requirement.requirementId) {
    case 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE':
      return coverageItem(
        requirement,
        'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
        [locator, candidate.exceptionStatement],
        'The registered passage does not discuss post-interaction settlement or a support source specifically defined by absence of tracked direct relation touch.',
      );
    case 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION':
      return coverageItem(
        requirement,
        'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
        [candidate.evidenceTextOrParaphrase, candidate.exceptionStatement],
        'The passage selects 印比 as supportive/useful under a condition but does not explicitly distinguish support-channel presence from activation, persistence, and effective support effect.',
      );
    case 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [locator, candidate.scopeStatement, candidate.applicabilityStatement],
        '年月时 positions are explicitly named under a structural condition, but visible-stem versus branch-source applicability and an explicit exception model are not supplied.',
      );
    case 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [locator, candidate.scopeStatement],
        '印 and 比 appear together as support categories without numeric weight or stated precedence, but the evidence is a scoped body/use condition rather than an explicit general applicability rule for untouched sources.',
      );
    case 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS':
      return coverageItem(
        requirement,
        'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
        [candidate.exceptionStatement],
        'The passage does not state whether a source with no tracked relation settlement persists by default, conditionally, or remains unresolved.',
      );
    case 'INDEPENDENT_PROVENANCE_BASIS':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [candidate.provenanceStatement, candidate.sourceReference.sourceId],
        'The candidate has independently registered primary-text provenance, but the bounded passage itself is a scoped structural example and cannot independently establish the missing universal untouched-source settlement semantics.',
      );
  }
}

function unresolved(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i88: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport {
  return finalized({
    evidenceVersion:
      I89_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE_VERSION,
    status: 'I84_OR_I88_UNRESOLVED_OR_INVALID',
    decision: 'COVERAGE_NOT_EVALUATED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI88EvidenceId: i88.evidenceId,
    candidateRegistrationId: null,
    candidateSourceId: null,
    coverage: [],
    evaluatedRequirementCount: 0,
    satisfiedRequirementCount: 0,
    partialRequirementCount: 0,
    unsupportedRequirementCount: 0,
    allSixRequirementsEvaluated: false,
    candidateSatisfiesAllI84Requirements: false,
    candidateAcceptedForUntouchedSupportAuthority: false,
    authorityGapClosed: false,
    additionalCandidateDiscoveryRequired: true,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateSynthesisAuthorized: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS',
    notes: [
      'Exact resolved I84 acceptance requirements and exact resolved I88 registered candidate evidence are required before requirement coverage may be evaluated.',
    ],
  });
}

export function buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i88: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport {
  const candidate = exactI88Candidate(i88);
  if (!exactI84Accepted(i84) || candidate === null) return unresolved(i84, i88);

  const coverage = i84.requirements.map((requirement) => assessRequirement(requirement, candidate));
  const satisfiedRequirementCount = coverage.filter(
    (item) => item.coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE',
  ).length;
  const partialRequirementCount = coverage.filter(
    (item) => item.coverageState === 'PARTIAL_SCOPED_SUPPORT_ONLY',
  ).length;
  const unsupportedRequirementCount = coverage.filter(
    (item) => item.coverageState === 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
  ).length;
  const candidateSatisfiesAllI84Requirements =
    coverage.length === EXPECTED_REQUIREMENTS.length &&
    coverage.every((item) => item.countsAsSatisfiedForI84);

  return finalized({
    evidenceVersion:
      I89_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE_VERSION,
    status: 'RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    decision: 'REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI88EvidenceId: i88.evidenceId,
    candidateRegistrationId: candidate.candidateRegistrationId,
    candidateSourceId: candidate.sourceReference.sourceId,
    coverage,
    evaluatedRequirementCount: coverage.length,
    satisfiedRequirementCount,
    partialRequirementCount,
    unsupportedRequirementCount,
    allSixRequirementsEvaluated: coverage.length === EXPECTED_REQUIREMENTS.length,
    candidateSatisfiesAllI84Requirements,
    candidateAcceptedForUntouchedSupportAuthority: false,
    authorityGapClosed: false,
    additionalCandidateDiscoveryRequired: !candidateSatisfiesAllI84Requirements,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateSynthesisAuthorized: false,
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
    recommendedNextGate: candidateSatisfiesAllI84Requirements
      ? 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_PROMOTION_READINESS'
      : 'UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS',
    notes: [
      'The registered 滴天髓 candidate is evaluated requirement-by-requirement rather than by topical relevance or source prestige.',
      'No requirement receives full I84 satisfaction from the current bounded passage. Position/support-kind/provenance relevance remains partial and scoped; post-interaction untouched-source and persistence semantics remain unsupported.',
      'I84 forbids passing with partial coverage and candidate-set composition policy remains unresolved, so partial evidence cannot be silently combined with other sources.',
      'The authority gap therefore remains open and all activation, persistence, effective-support, relative-force, precedence, scoring, and production-classification outputs remain blocked.',
    ],
  });
}
