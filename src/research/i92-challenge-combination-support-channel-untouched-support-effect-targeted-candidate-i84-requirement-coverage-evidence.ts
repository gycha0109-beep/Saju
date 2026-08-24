import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  I84UntouchedSupportAuthorityRequirement,
  I84UntouchedSupportAuthorityRequirementId,
} from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport,
  I91RegisteredTargetedAuthorityCandidate,
} from './i91-challenge-combination-support-channel-untouched-support-effect-targeted-authority-candidate-discovery-evidence.js';

export const I92_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-targeted-candidate-i84-requirement-coverage-evidence-v1';

export type I92RequirementCoverageState =
  | 'SUPPORTED_BY_REGISTERED_EVIDENCE'
  | 'PARTIAL_SCOPED_SUPPORT_ONLY'
  | 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE';

export interface I92RequirementCoverageEvidence {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  requirement: string;
  coverageState: I92RequirementCoverageState;
  evidenceBasis: readonly string[];
  limitingReason: string;
  countsAsSatisfiedForI84: boolean;
  discoveryLaneRelevanceMaySubstituteForSatisfaction: false;
  noDamageLanguageMaySubstituteForGenericUntouchedPersistence: false;
  scopedInteractionLanguageMaySubstituteForGenericPostInteractionRule: false;
  primaryProvenanceMaySubstituteForNormativeScope: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE'
    | 'I84_OR_I91_UNRESOLVED_OR_INVALID';
  decision:
    | 'TARGETED_REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE'
    | 'COVERAGE_NOT_EVALUATED';
  upstreamI84ReviewId: string;
  upstreamI91EvidenceId: string;
  candidateRegistrationId: string | null;
  candidateSourceId: string | null;
  coverage: readonly I92RequirementCoverageEvidence[];
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
  crossCandidateSynthesisPerformed: false;
  crossCandidateSynthesisAuthorized: false;
  priorI88CandidateCoverageBorrowed: false;
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
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW';
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
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_targeted_i84_coverage_${deterministicContentHash(material).slice(0, 24)}`,
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

function exactI91Candidate(
  i91: ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport,
): I91RegisteredTargetedAuthorityCandidate | null {
  if (
    i91.status !== 'RESOLVED_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' ||
    i91.decision !==
      'ONE_ADDITIONAL_VERIFIED_TARGETED_CANDIDATE_REGISTERED_RESEARCH_ONLY_LANES_REMAIN_UNRESOLVED' ||
    i91.targetedLaneCount !== EXPECTED_REQUIREMENTS.length ||
    i91.verifiedNewCandidateCount !== 1 ||
    i91.registeredCandidates.length !== 1 ||
    i91.allCandidateI84RequirementSlotsRemainNotEvaluated === false ||
    i91.candidateRequirementEvaluationPerformedByThisGate ||
    i91.candidateRegistrationMeansRequirementSatisfied ||
    i91.centralExecutableRegistryMutationPerformed ||
    i91.crossCandidateSynthesisPerformed ||
    i91.candidateSetCompositionPolicyResolved ||
    i91.methodologyOrRulePromotionAuthorized ||
    i91.executableAuthorityAuthorized ||
    i91.untouchedSupportEffectRuleImplementationAuthorized ||
    i91.sourceActivationVerdictAuthorized ||
    i91.sourcePersistenceVerdictAuthorized ||
    i91.sourceEffectiveSupportVerdictAuthorized ||
    i91.relativeForceVerdictAuthorized ||
    i91.crossRelationPrecedenceAuthorized ||
    i91.classificationAuthorized ||
    i91.numericScoringAuthorized
  ) {
    return null;
  }

  const candidate = i91.registeredCandidates[0];
  if (
    candidate === undefined ||
    candidate.registrationStatus !== 'RESEARCH_CANDIDATE_ONLY' ||
    candidate.methodologyOrRuleApproval !== 'NOT_GRANTED' ||
    candidate.executableAuthorityStatus !== 'NOT_AUTHORIZED' ||
    candidate.candidateRequirementEvaluationStatus !== 'NOT_STARTED' ||
    candidate.centralExecutableRegistryMutationPerformed ||
    candidate.sourceReferenceApprovedForMethodologyOrRuleUse ||
    candidate.discoveryVerification.sourcePageResolved !== true ||
    candidate.discoveryVerification.exactLocatorResolved !== true ||
    candidate.discoveryVerification.sourceTextInspectedAtLocator !== true ||
    candidate.discoveryVerification.stableHistoricalRevisionResolved !== true ||
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
  coverageState: I92RequirementCoverageState,
  evidenceBasis: readonly string[],
  limitingReason: string,
): I92RequirementCoverageEvidence {
  return {
    requirementId: requirement.requirementId,
    requirement: requirement.requirement,
    coverageState,
    evidenceBasis,
    limitingReason,
    countsAsSatisfiedForI84: coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE',
    discoveryLaneRelevanceMaySubstituteForSatisfaction: false,
    noDamageLanguageMaySubstituteForGenericUntouchedPersistence: false,
    scopedInteractionLanguageMaySubstituteForGenericPostInteractionRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  };
}

function assessRequirement(
  requirement: I84UntouchedSupportAuthorityRequirement,
  candidate: I91RegisteredTargetedAuthorityCandidate,
): I92RequirementCoverageEvidence {
  const locator = candidate.exactLocatorStatement;

  switch (requirement.requirementId) {
    case 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE':
      return coverageItem(
        requirement,
        'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
        [locator, candidate.scopeStatement, candidate.exceptionStatement],
        'The 印綬 passage describes scoped damage and interaction conditions but does not define a generic post-interaction rule for a support source identified by no tracked direct relation touch.',
      );
    case 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [locator, candidate.evidenceTextOrParaphrase, candidate.applicabilityStatement],
        'The passage distinguishes an 印綬 configuration from damage- or interaction-affected outcomes, which is relevant to presence-versus-effect separation, but it does not explicitly define the independent ACTIVE, PERSISTED, and effective-support states required by I84.',
      );
    case 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [locator, candidate.scopeStatement, candidate.exceptionStatement],
        'The registered 論印綬 scope preserves position-specific and condition-specific exceptions, but it does not provide a complete generic applicability contract across visible-stem and branch support sources without positional precedence assumptions.',
      );
    case 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT':
      return coverageItem(
        requirement,
        'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
        [candidate.scopeStatement, candidate.exceptionStatement],
        'The candidate is 印綬-specific and does not establish one common untouched-source applicability rule spanning both resource-generation support and same-element 比劫 support without precedence or weight.',
      );
    case 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [locator, candidate.evidenceTextOrParaphrase, candidate.exceptionStatement],
        'The no-damage and interaction-condition language supplies scoped evidence that an 印綬 state may differ when affected, but it does not state whether generic no-tracked-touch persistence is a default, conditional, or unresolved state after all tracked settlement is absent.',
      );
    case 'INDEPENDENT_PROVENANCE_BASIS':
      return coverageItem(
        requirement,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [candidate.provenanceStatement, candidate.sourceReference.sourceId, locator],
        'The candidate has independent primary classical-text provenance with an exact locator, but the bounded 印綬 passage cannot independently establish the missing universal untouched-source settlement semantics.',
      );
  }
}

function unresolved(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i91: ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport {
  return finalized({
    evidenceVersion:
      I92_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE_VERSION,
    status: 'I84_OR_I91_UNRESOLVED_OR_INVALID',
    decision: 'COVERAGE_NOT_EVALUATED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI91EvidenceId: i91.evidenceId,
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
    crossCandidateSynthesisPerformed: false,
    crossCandidateSynthesisAuthorized: false,
    priorI88CandidateCoverageBorrowed: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
    notes: [
      'Exact resolved I84 acceptance requirements and exact resolved I91 targeted candidate registration evidence are required before I92 may evaluate coverage.',
    ],
  });
}

export function buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i91: ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidenceReport {
  const candidate = exactI91Candidate(i91);
  if (!exactI84Accepted(i84) || candidate === null) return unresolved(i84, i91);

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
      I92_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE_VERSION,
    status: 'RESOLVED_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    decision:
      'TARGETED_REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI91EvidenceId: i91.evidenceId,
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
    crossCandidateSynthesisPerformed: false,
    crossCandidateSynthesisAuthorized: false,
    priorI88CandidateCoverageBorrowed: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
    notes: [
      'I92 evaluates only the single I91 三命通會 candidate. It does not borrow or combine coverage from the earlier I88 滴天髓 candidate.',
      'The candidate supplies scoped evidence for presence-versus-effect, position/exception, persistence-like damage distinctions, and independent provenance, but none of those partial lanes satisfies the universal I84 contract.',
      'The explicit post-interaction no-tracked-touch rule and a common resource-generation/same-element support-kind rule remain unsupported by this candidate.',
      'No ACTIVE, PERSISTED, effective-support, relative-force, precedence, scoring, or strong/weak classification rule is authorized.',
    ],
  });
}
