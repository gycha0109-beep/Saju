import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  I84UntouchedSupportAuthorityRequirement,
  I84UntouchedSupportAuthorityRequirementId,
} from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport,
  I95DiscoveryTopicRepresentation,
} from './i95-challenge-combination-support-channel-untouched-support-effect-single-candidate-full-coverage-authority-discovery-evidence.js';

export const I96_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-single-candidate-i84-full-coverage-evaluation-evidence-v1';

export type I96RequirementCoverageState =
  | 'SUPPORTED_BY_REGISTERED_EVIDENCE'
  | 'PARTIAL_SCOPED_SUPPORT_ONLY'
  | 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE';

export interface I96RequirementCoverageEvidence {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  requirement: string;
  coverageState: I96RequirementCoverageState;
  evidenceBasis: readonly string[];
  limitingReason: string;
  countsAsSatisfiedForI84: boolean;
  evidenceComesFromSameRegisteredCandidate: true;
  priorCandidateCoverageBorrowed: false;
  absenceOfTrackedContestAloneMaySubstitute: false;
  supportDirectionAloneMaySubstitute: false;
  genericNoTouchMayBePromotedToActive: false;
  genericNoTouchMayBePromotedToPersisted: false;
  genericNoTouchMayBePromotedToEffectiveSupport: false;
  numericCalibrationMaySubstitute: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE'
    | 'I84_OR_I95_UNRESOLVED_OR_INVALID';
  decision:
    | 'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_I84_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED'
    | 'COVERAGE_NOT_EVALUATED';
  upstreamI84ReviewId: string;
  upstreamI95EvidenceId: string;
  candidateRegistrationId: string | null;
  candidateSourceId: string | null;
  coverage: readonly I96RequirementCoverageEvidence[];
  evaluatedRequirementCount: number;
  satisfiedRequirementCount: number;
  partialRequirementCount: number;
  unsupportedRequirementCount: number;
  allSixRequirementsEvaluated: boolean;
  candidateSatisfiesAllI84Requirements: boolean;
  candidateMeetsFrozenI84AcceptanceContract: boolean;
  authorityCoverageGapSatisfied: boolean;
  authorityGapClosed: false;
  conditionalUntouchedPersistenceSemanticsIdentified: boolean;
  persistenceSemanticsClass: 'CONDITIONAL_NOT_DEFAULT' | 'not_evaluated';
  candidateAcceptedForUntouchedSupportAuthority: false;
  candidatePromotedToMethodologyOrRuleAuthority: false;
  sourceReferenceApprovedForMethodologyOrRuleUse: false;
  promotionReadinessReviewRequired: boolean;
  additionalCandidateDiscoveryRequired: boolean;
  priorI88CandidateCoverageBorrowed: false;
  priorI91CandidateCoverageBorrowed: false;
  crossCandidateSynthesisPerformed: false;
  crossCandidateSynthesisAuthorized: false;
  centralExecutableRegistryMutationPerformed: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE';
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
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_single_candidate_i84_coverage_${deterministicContentHash(material).slice(0, 24)}`,
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
        requirement.currentCanonicalAuthoritySatisfies === false &&
        requirement.silenceOrAbsenceOfContestMaySatisfy === false &&
        requirement.supportDirectionAloneMaySatisfy === false &&
        requirement.scopedPatternExampleAloneMaySatisfy === false &&
        requirement.numericCalibrationMaySubstitute === false,
    ) &&
    i84.candidateMayPassWithPartialCoverage === false &&
    i84.candidateMayPassBySilence === false &&
    i84.candidateMayPassFromAbsenceOfTrackedContestAlone === false &&
    i84.candidateMayPassFromSupportDirectionAlone === false &&
    i84.candidateMayPassFromScopedPatternExampleAlone === false &&
    i84.candidateMayPassFromNumericCalibration === false &&
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

function exactTopicRepresentation(
  representation: readonly I95DiscoveryTopicRepresentation[],
): boolean {
  return (
    representation.length === EXPECTED_REQUIREMENTS.length &&
    representation.every(
      (item, index) =>
        item.requirementId === EXPECTED_REQUIREMENTS[index] &&
        item.topicRepresentedForLaterEvaluation &&
        item.countsAsI84RequirementSatisfied === false &&
        item.representationBasis.trim().length > 0,
    )
  );
}

function exactI95Candidate(
  i95: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport,
) {
  if (
    i95.status !== 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_EVIDENCE' ||
    i95.decision !==
      'ONE_PLAUSIBLE_FULL_COVERAGE_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED' ||
    i95.registeredCandidateCount !== 1 ||
    i95.registeredCandidate === null ||
    !i95.externalDiscoveryPerformed ||
    !i95.allSixRequirementTopicsRepresentedForLaterEvaluation ||
    !exactTopicRepresentation(i95.discoveryTopicRepresentation) ||
    !i95.allSixRequirementSlotsRemainNotEvaluated ||
    i95.candidateRequirementEvaluationPerformedByThisGate ||
    i95.candidateSatisfiesAllI84Requirements !== 'not_evaluated' ||
    i95.candidateAcceptedForUntouchedSupportAuthority ||
    !i95.sourceBibliographyCrossVerified ||
    !i95.originalSourceTextInspectedViaTranscription ||
    !i95.exactBookEditionIdentityResolved ||
    !i95.equivalentReproducibleLocatorResolved ||
    !i95.exactLocatorResolved ||
    !i95.candidateRegisteredThroughI87ContractReuse ||
    i95.oneCandidateOnly !== true ||
    i95.priorI88CandidateCoverageBorrowed ||
    i95.priorI91CandidateCoverageBorrowed ||
    i95.crossCandidateCompositionPerformed ||
    i95.crossCandidateCompositionAuthorized ||
    i95.centralExecutableRegistryMutationPerformed ||
    i95.methodologyOrRulePromotionAuthorized ||
    i95.executableAuthorityAuthorized ||
    i95.untouchedSupportEffectRuleImplementationAuthorized ||
    i95.sourceActivationVerdictAuthorized ||
    i95.sourcePersistenceVerdictAuthorized ||
    i95.sourceEffectiveSupportVerdictAuthorized ||
    i95.relativeForceVerdictAuthorized ||
    i95.crossRelationPrecedenceAuthorized ||
    i95.classificationAuthorized ||
    i95.numericScoringAuthorized ||
    i95.recommendedNextGate !==
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE'
  ) {
    return null;
  }

  const candidate = i95.registeredCandidate;
  const source = candidate.sourceReference;
  if (
    candidate.registrationStatus !== 'RESEARCH_CANDIDATE_ONLY' ||
    candidate.methodologyOrRuleApproval !== 'NOT_GRANTED' ||
    candidate.executableAuthorityStatus !== 'NOT_AUTHORIZED' ||
    candidate.candidateRequirementEvaluationStatus !== 'NOT_STARTED' ||
    candidate.centralExecutableRegistryMutationPerformed ||
    candidate.sourceReferenceApprovedForMethodologyOrRuleUse ||
    source.sourceId !== 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515' ||
    source.sourceType !== 'modern_book' ||
    source.title !== '邵伟华四柱预测学入门' ||
    source.author !== '陈园' ||
    source.publisher !== '广州出版社' ||
    source.publicationYear !== 1995 ||
    source.locator?.chapter !== '第十一章 富贵贫贱' ||
    source.locator?.section !== '第三节 论吉凶' ||
    source.locator?.anchor?.includes('用神在天干不受克合') !== true ||
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
  evidenceBasis: readonly string[],
  limitingReason: string,
): I96RequirementCoverageEvidence {
  return {
    requirementId: requirement.requirementId,
    requirement: requirement.requirement,
    coverageState: 'SUPPORTED_BY_REGISTERED_EVIDENCE',
    evidenceBasis,
    limitingReason,
    countsAsSatisfiedForI84: true,
    evidenceComesFromSameRegisteredCandidate: true,
    priorCandidateCoverageBorrowed: false,
    absenceOfTrackedContestAloneMaySubstitute: false,
    supportDirectionAloneMaySubstitute: false,
    genericNoTouchMayBePromotedToActive: false,
    genericNoTouchMayBePromotedToPersisted: false,
    genericNoTouchMayBePromotedToEffectiveSupport: false,
    numericCalibrationMaySubstitute: false,
  };
}

function assessRequirement(
  requirement: I84UntouchedSupportAuthorityRequirement,
  candidate: NonNullable<
    ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport['registeredCandidate']
  >,
): I96RequirementCoverageEvidence {
  const locator = candidate.exactLocatorStatement;

  switch (requirement.requirementId) {
    case 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE':
      return coverageItem(
        requirement,
        [
          locator,
          'Within the same 吉凶 rule section, a useful factor in a heavenly stem is explicitly evaluated as favorable when it is not subjected to overcoming or combination, while a branch useful factor is evaluated against overcoming, combination, punishment, and clash.',
          candidate.exceptionStatement,
        ],
        'The source supplies an explicit relation-conditioned no-damage rule rather than requiring I96 to infer persistence from silence. This satisfies the I84 authority-coverage requirement but does not translate generic repository NO_TRACKED_RELATION_TOUCH into an executable verdict.',
      );
    case 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION':
      return coverageItem(
        requirement,
        [
          locator,
          'The section distinguishes a useful factor that exists in the chart from one that is damaged, destroyed, unsupported, protected, or rescued, and treats those later interaction states as outcome-relevant.',
          candidate.evidenceTextOrParaphrase,
        ],
        'Structural presence is therefore not treated as identical to post-interaction usefulness. Runtime ACTIVE, PERSISTED, and effective-support states remain a separate implementation/promotion concern.',
      );
    case 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS':
      return coverageItem(
        requirement,
        [
          locator,
          'The rule explicitly separates heavenly-stem and earthly-branch useful-factor conditions: stems are checked for overcoming/combination, while branches are checked for overcoming/combination/punishment/clash.',
          candidate.scopeStatement,
        ],
        'The candidate gives explicit visible-stem versus branch applicability and exceptions without declaring a fixed positional winner or precedence ordering.',
      );
    case 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT':
      return coverageItem(
        requirement,
        [
          locator,
          'In the same 身弱 subsection, 比劫 is expressly used as one support route and 印 as another; both are handled as context-dependent support choices rather than a fixed cross-kind ranking.',
          candidate.scopeStatement,
        ],
        'The same registered source covers same-element 比劫 support and resource-generation 印 support without assigning numeric weights or a universal precedence between the two kinds.',
      );
    case 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS':
      return coverageItem(
        requirement,
        [
          locator,
          'The section treats a useful factor as stable/favorable when it is supported or protected and not damaged by the enumerated interactions, while damaged or destroyed useful factors are treated differently.',
          candidate.exceptionStatement,
        ],
        'The source therefore supports CONDITIONAL_NOT_DEFAULT persistence semantics: lack of damaging relation contact is not enough by itself; useful-factor status plus support/protection and absence of specified damage conditions remain material.',
      );
    case 'INDEPENDENT_PROVENANCE_BASIS':
      return coverageItem(
        requirement,
        [
          candidate.provenanceStatement,
          candidate.discoveryTraceStatement,
          `${candidate.sourceReference.author ?? ''}|${candidate.sourceReference.title}|${candidate.sourceReference.publisher ?? ''}|${candidate.sourceReference.publicationYear ?? ''}`,
        ],
        'The rule is directly stated in one independently identified published book edition with stabilized author, publisher, year, ISBN, chapter, section, and anchor provenance; its I84 coverage does not depend on I88/I91 candidate composition or a scoped cross-reference.',
      );
  }
}

function unresolved(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i95: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport {
  return finalized({
    evidenceVersion:
      I96_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE_VERSION,
    status: 'I84_OR_I95_UNRESOLVED_OR_INVALID',
    decision: 'COVERAGE_NOT_EVALUATED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI95EvidenceId: i95.evidenceId,
    candidateRegistrationId: null,
    candidateSourceId: null,
    coverage: [],
    evaluatedRequirementCount: 0,
    satisfiedRequirementCount: 0,
    partialRequirementCount: 0,
    unsupportedRequirementCount: 0,
    allSixRequirementsEvaluated: false,
    candidateSatisfiesAllI84Requirements: false,
    candidateMeetsFrozenI84AcceptanceContract: false,
    authorityCoverageGapSatisfied: false,
    authorityGapClosed: false,
    conditionalUntouchedPersistenceSemanticsIdentified: false,
    persistenceSemanticsClass: 'not_evaluated',
    candidateAcceptedForUntouchedSupportAuthority: false,
    candidatePromotedToMethodologyOrRuleAuthority: false,
    sourceReferenceApprovedForMethodologyOrRuleUse: false,
    promotionReadinessReviewRequired: false,
    additionalCandidateDiscoveryRequired: true,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: [
      'Exact frozen I84 authority requirements and exact resolved I95 single-candidate registration evidence are required before I96 evaluates coverage.',
      'An invalid upstream contract cannot be repaired by borrowing coverage from earlier candidates or by weakening the six-requirement acceptance threshold.',
    ],
  });
}

export function buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i95: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidenceReport {
  const candidate = exactI95Candidate(i95);
  if (!exactI84Accepted(i84) || candidate === null) return unresolved(i84, i95);

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
    coverage.every((item, index) => {
      return (
        item.requirementId === EXPECTED_REQUIREMENTS[index] &&
        item.countsAsSatisfiedForI84 &&
        item.evidenceComesFromSameRegisteredCandidate &&
        item.priorCandidateCoverageBorrowed === false
      );
    });

  if (!candidateSatisfiesAllI84Requirements) return unresolved(i84, i95);

  return finalized({
    evidenceVersion:
      I96_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE_VERSION,
    status: 'RESOLVED_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE',
    decision:
      'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_I84_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI95EvidenceId: i95.evidenceId,
    candidateRegistrationId: candidate.candidateRegistrationId,
    candidateSourceId: candidate.sourceReference.sourceId,
    coverage,
    evaluatedRequirementCount: coverage.length,
    satisfiedRequirementCount,
    partialRequirementCount,
    unsupportedRequirementCount,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW',
    notes: [
      'I96 independently evaluates all six frozen I84 requirements against only the single I95 registered 1995 陈园 candidate. No I88/I91 coverage is borrowed.',
      'The candidate satisfies the frozen I84 coverage contract because the same source explicitly separates stem/branch interaction conditions, distinguishes presence from damaged/protected usefulness, covers both 印 and 比劫 weak-body support, and supplies conditional rather than default untouched persistence semantics.',
      'I84 coverage satisfaction is not methodology/rule promotion. Source approval, executable authority, ACTIVE/PERSISTED/effective-support verdicts, relative force, precedence, numeric scoring, and strong/weak classification remain blocked pending a separate promotion-readiness review.',
    ],
  });
}
