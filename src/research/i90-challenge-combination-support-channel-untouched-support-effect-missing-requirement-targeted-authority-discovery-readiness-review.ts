import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I84UntouchedSupportAuthorityRequirementId } from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
  I89RequirementCoverageState,
} from './i89-challenge-combination-support-channel-untouched-support-effect-authority-candidate-i84-requirement-coverage-evidence.js';

export const I90_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-missing-requirement-targeted-authority-discovery-readiness-review-v1';

export type I90TargetedDiscoveryLaneClass =
  | 'MISSING_NORMATIVE_AUTHORITY'
  | 'SCOPED_COVERAGE_COMPLETION';

export interface I90TargetedDiscoveryLane {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  priorCoverageState: I89RequirementCoverageState;
  laneClass: I90TargetedDiscoveryLaneClass;
  discoveryObjective: string;
  requiredEvidenceShape: string;
  candidateMustUseI87RegistrationContract: true;
  originalSourceInspectionRequired: true;
  exactLocatorRequired: true;
  requirementMustBeEvaluatedIndependently: true;
  sameCandidateMayCoverMultipleRequirementsOnlyWithIndependentExactEvidence: true;
  crossCandidateSynthesisMayCloseRequirement: false;
  searchSnippetMayCountAsEvidence: false;
  modelSynthesisMayCountAsEvidence: false;
  numericCalibrationMayCountAsEvidence: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_TARGETED_AUTHORITY_DISCOVERY_READINESS'
    | 'I89_UNRESOLVED_OR_INVALID';
  decision:
    | 'TARGETED_DISCOVERY_LANES_AUTHORIZED_NO_CROSS_CANDIDATE_SYNTHESIS_OR_PROMOTION'
    | 'TARGETED_DISCOVERY_NOT_AUTHORIZED';
  upstreamI89EvidenceId: string;
  discoveryLanes: readonly I90TargetedDiscoveryLane[];
  unsatisfiedRequirementCount: number;
  missingNormativeAuthorityLaneCount: number;
  scopedCoverageCompletionLaneCount: number;
  discoveryMayProceed: boolean;
  actualExternalDiscoveryPerformedByThisGate: false;
  i84AcceptanceThresholdChanged: false;
  partialCoveragePromotedToSatisfied: false;
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
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const OBJECTIVES: Readonly<
  Record<
    I84UntouchedSupportAuthorityRequirementId,
    { objective: string; evidenceShape: string }
  >
> = Object.freeze({
  EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE: {
    objective:
      'Find authority that explicitly addresses a support source after interaction/settlement when that source has no tracked direct clash or combination touch.',
    evidenceShape:
      'Original-source statement with exact locator defining the untouched post-interaction state; absence-of-contest inference is insufficient.',
  },
  STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION: {
    objective:
      'Find authority that distinguishes structural support presence/direction from whether the source remains active, persists, or actually contributes effective support.',
    evidenceShape:
      'Exact normative distinction between presence and post-interaction effect semantics.',
  },
  SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS: {
    objective:
      'Complete the position scope beyond the current 年/月/时 example, including visible-stem versus branch-source applicability and explicit exception conditions without fixed positional precedence.',
    evidenceShape:
      'Exact source-position applicability and exception language with locators sufficient to distinguish visible stems and branch-derived sources.',
  },
  SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT: {
    objective:
      'Complete applicability for same-element and resource-generation support without importing fixed precedence or numeric weight.',
    evidenceShape:
      'Exact authority covering both support kinds as qualitative applicability classes and explicitly avoiding or not requiring fixed ranking/weight for this boundary.',
  },
  UNTOUCHED_PERSISTENCE_STATE_SEMANTICS: {
    objective:
      'Find authority stating whether untouched-source persistence is default, conditional, or intentionally unresolved after tracked relation settlement is absent.',
    evidenceShape:
      'Exact persistence-state semantics tied to an untouched/no-settlement source condition.',
  },
  INDEPENDENT_PROVENANCE_BASIS: {
    objective:
      'Find a provenance basis whose relevant passage independently supports the missing untouched-source semantics rather than merely repeating a scoped pattern or unbounded cross-reference.',
    evidenceShape:
      'Independently inspectable original or high-quality source with exact locator and scope sufficient for the specific normative claim.',
  },
});

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_targeted_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedI89(
  i89: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
): boolean {
  return (
    i89.status === 'RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE' &&
    i89.decision ===
      'REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE' &&
    i89.allSixRequirementsEvaluated &&
    i89.coverage.length === 6 &&
    i89.evaluatedRequirementCount === 6 &&
    i89.candidateSatisfiesAllI84Requirements === false &&
    i89.candidateAcceptedForUntouchedSupportAuthority === false &&
    i89.authorityGapClosed === false &&
    i89.additionalCandidateDiscoveryRequired &&
    i89.candidateSetCompositionPolicyResolved === false &&
    i89.crossCandidateSynthesisAuthorized === false &&
    i89.methodologyOrRulePromotionAuthorized === false &&
    i89.executableAuthorityAuthorized === false &&
    i89.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i89.sourceActivationVerdictAuthorized === false &&
    i89.sourcePersistenceVerdictAuthorized === false &&
    i89.sourceEffectiveSupportVerdictAuthorized === false &&
    i89.relativeForceVerdictAuthorized === false &&
    i89.crossRelationPrecedenceAuthorized === false &&
    i89.classificationAuthorized === false &&
    i89.numericScoringAuthorized === false &&
    i89.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS'
  );
}

function laneFor(
  requirementId: I84UntouchedSupportAuthorityRequirementId,
  coverageState: I89RequirementCoverageState,
): I90TargetedDiscoveryLane {
  const target = OBJECTIVES[requirementId];
  return {
    requirementId,
    priorCoverageState: coverageState,
    laneClass:
      coverageState === 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE'
        ? 'MISSING_NORMATIVE_AUTHORITY'
        : 'SCOPED_COVERAGE_COMPLETION',
    discoveryObjective: target.objective,
    requiredEvidenceShape: target.evidenceShape,
    candidateMustUseI87RegistrationContract: true,
    originalSourceInspectionRequired: true,
    exactLocatorRequired: true,
    requirementMustBeEvaluatedIndependently: true,
    sameCandidateMayCoverMultipleRequirementsOnlyWithIndependentExactEvidence: true,
    crossCandidateSynthesisMayCloseRequirement: false,
    searchSnippetMayCountAsEvidence: false,
    modelSynthesisMayCountAsEvidence: false,
    numericCalibrationMayCountAsEvidence: false,
  };
}

function unresolved(
  i89: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  return finalized({
    reviewVersion:
      I90_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: 'I89_UNRESOLVED_OR_INVALID',
    decision: 'TARGETED_DISCOVERY_NOT_AUTHORIZED',
    upstreamI89EvidenceId: i89.evidenceId,
    discoveryLanes: [],
    unsatisfiedRequirementCount: 0,
    missingNormativeAuthorityLaneCount: 0,
    scopedCoverageCompletionLaneCount: 0,
    discoveryMayProceed: false,
    actualExternalDiscoveryPerformedByThisGate: false,
    i84AcceptanceThresholdChanged: false,
    partialCoveragePromotedToSatisfied: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: [
      'Resolved fail-closed I89 requirement coverage evidence is required before targeted external discovery may proceed.',
    ],
  });
}

export function buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
  i89: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  if (!acceptedI89(i89)) return unresolved(i89);

  const unsatisfied = i89.coverage.filter((item) => !item.countsAsSatisfiedForI84);
  const discoveryLanes = unsatisfied.map((item) => laneFor(item.requirementId, item.coverageState));
  const missingNormativeAuthorityLaneCount = discoveryLanes.filter(
    (lane) => lane.laneClass === 'MISSING_NORMATIVE_AUTHORITY',
  ).length;
  const scopedCoverageCompletionLaneCount = discoveryLanes.filter(
    (lane) => lane.laneClass === 'SCOPED_COVERAGE_COMPLETION',
  ).length;

  return finalized({
    reviewVersion:
      I90_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_TARGETED_AUTHORITY_DISCOVERY_READINESS',
    decision:
      'TARGETED_DISCOVERY_LANES_AUTHORIZED_NO_CROSS_CANDIDATE_SYNTHESIS_OR_PROMOTION',
    upstreamI89EvidenceId: i89.evidenceId,
    discoveryLanes,
    unsatisfiedRequirementCount: discoveryLanes.length,
    missingNormativeAuthorityLaneCount,
    scopedCoverageCompletionLaneCount,
    discoveryMayProceed: discoveryLanes.length > 0,
    actualExternalDiscoveryPerformedByThisGate: false,
    i84AcceptanceThresholdChanged: false,
    partialCoveragePromotedToSatisfied: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: [
      'I90 converts each unsatisfied I84 requirement into an independent discovery lane without changing the I84 acceptance threshold.',
      'The three unsupported requirements target missing normative authority; the three partial requirements target scoped coverage completion.',
      'A single future candidate may support multiple lanes only when independently inspectable exact evidence supports each requirement. Different candidates may not be silently synthesized to close a requirement or the full authority gap.',
      'Search snippets, model synthesis, numeric calibration, source prestige, and topical relevance remain non-authoritative until normalized and evaluated through the frozen research contracts.',
    ],
  });
}
