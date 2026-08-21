import { describe, expect, test } from 'vitest';
import {
  buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence,
  i91VerifiedSanmingTonghuiYinshouCandidate,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
  type I84UntouchedSupportAuthorityRequirementId,
  type I90TargetedDiscoveryLane,
} from '../src/index.js';

const IDS = [
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[];

function lane(requirementId: I84UntouchedSupportAuthorityRequirementId, index: number): I90TargetedDiscoveryLane {
  const missing = [0, 1, 4].includes(index);
  return {
    requirementId,
    priorCoverageState: missing
      ? 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE'
      : 'PARTIAL_SCOPED_SUPPORT_ONLY',
    laneClass: missing ? 'MISSING_NORMATIVE_AUTHORITY' : 'SCOPED_COVERAGE_COMPLETION',
    discoveryObjective: `objective:${requirementId}`,
    requiredEvidenceShape: `shape:${requirementId}`,
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

function i90(): ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i90_i91_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_TARGETED_AUTHORITY_DISCOVERY_READINESS',
    decision: 'TARGETED_DISCOVERY_LANES_AUTHORIZED_NO_CROSS_CANDIDATE_SYNTHESIS_OR_PROMOTION',
    upstreamI89EvidenceId: 'i89_fixture',
    discoveryLanes: IDS.map(lane),
    unsatisfiedRequirementCount: 6,
    missingNormativeAuthorityLaneCount: 3,
    scopedCoverageCompletionLaneCount: 3,
    discoveryMayProceed: true,
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
    notes: [],
  };
}

describe('I91 untouched support effect targeted authority candidate discovery evidence', () => {
  test('registers one additional verified research-only candidate', () => {
    const report =
      buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
        i90(),
      );
    expect(report.status).toBe('RESOLVED_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE');
    expect(report.verifiedNewCandidateCount).toBe(1);
    expect(report.registeredCandidates).toHaveLength(1);
    expect(report.registeredCandidates[0]?.registrationStatus).toBe('RESEARCH_CANDIDATE_ONLY');
  });

  test('preserves Sanming Tonghui volume six Yinshou exact source identity and historical revision', () => {
    const candidate = i91VerifiedSanmingTonghuiYinshouCandidate();
    expect(candidate.sourceReference.sourceId).toBe(
      'source_sanming_tonghui_vol6_yinshou_wikisource_2017_oldid845352',
    );
    expect(candidate.sourceReference.title).toBe('三命通會');
    expect(candidate.sourceReference.locator?.volume).toBe('卷六');
    expect(candidate.sourceReference.locator?.section).toBe('論印綬');
    expect(candidate.sourceReference.locator?.anchor).toContain('印綬不逢損傷');
    expect(candidate.sourceReference.locator?.anchor).toContain('逢合則晦，逢沖則災');
    expect(candidate.sourceReference.url).toContain('oldid=845352');
  });

  test('records relevance for four lanes without evaluating I84 coverage', () => {
    const report =
      buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
        i90(),
      );
    expect(report.targetedLaneCount).toBe(6);
    expect(report.lanesWithVerifiedCandidateRelevanceCount).toBe(4);
    expect(report.lanesWithoutNewExactCandidateCount).toBe(2);
    expect(
      report.laneDiscoveryEvidence
        .filter((lane) => lane.state === 'VERIFIED_CANDIDATE_RELEVANCE_NOT_COVERAGE_EVALUATION')
        .map((lane) => lane.requirementId),
    ).toEqual([
      'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
      'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
      'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
      'INDEPENDENT_PROVENANCE_BASIS',
    ]);
    expect(report.laneDiscoveryEvidence.every((lane) => !lane.requirementCoverageEvaluated)).toBe(true);
    expect(report.laneDiscoveryEvidence.every((lane) => !lane.requirementSatisfied)).toBe(true);
  });

  test('does not invent a new candidate for explicit untouched rule or paired support-kind lane', () => {
    const report =
      buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
        i90(),
      );
    const unresolved = report.laneDiscoveryEvidence
      .filter((lane) => lane.state === 'NO_NEW_EXACT_CANDIDATE_VERIFIED')
      .map((lane) => lane.requirementId);
    expect(unresolved).toEqual([
      'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
      'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
    ]);
  });

  test('keeps all I84 registration slots NOT_EVALUATED and assigns deterministic content address', () => {
    const first = i91VerifiedSanmingTonghuiYinshouCandidate();
    const second = i91VerifiedSanmingTonghuiYinshouCandidate();
    expect(first.candidateRegistrationId).toBe(second.candidateRegistrationId);
    expect(first.candidateRegistrationId).toMatch(/^untouched_support_targeted_candidate_[a-f0-9]{24}$/);
    expect(first.requirementSlots).toHaveLength(6);
    expect(first.requirementSlots.every((slot) => slot.coverageState === 'NOT_EVALUATED')).toBe(true);
  });

  test('fails closed when I90 permits snippet evidence', () => {
    const valid = i90();
    const invalid = {
      ...valid,
      discoveryLanes: valid.discoveryLanes.map((item, index) =>
        index === 0 ? { ...item, searchSnippetMayCountAsEvidence: true } : item,
      ),
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport;
    const report =
      buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
        invalid,
      );
    expect(report.status).toBe('I90_UNRESOLVED_OR_INVALID');
    expect(report.registeredCandidates).toEqual([]);
    expect(report.externalDiscoveryPerformed).toBe(false);
  });

  test('keeps candidate scoped to Yinshou instead of generalizing no-damage language', () => {
    const candidate = i91VerifiedSanmingTonghuiYinshouCandidate();
    expect(candidate.scopeStatement).toContain('印綬-specific');
    expect(candidate.exceptionStatement).toContain('does not say that every no-touch source');
    expect(candidate.targetLaneIds).not.toContain('EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE');
    expect(candidate.targetLaneIds).not.toContain(
      'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
    );
  });

  test('preserves registration, synthesis, effect, relative-force, precedence, score, and classifier guards', () => {
    const first =
      buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
        i90(),
      );
    const second =
      buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
        i90(),
      );
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.allCandidateI84RequirementSlotsRemainNotEvaluated).toBe(true);
    expect(first.candidateRequirementEvaluationPerformedByThisGate).toBe(false);
    expect(first.candidateRegistrationMeansRequirementSatisfied).toBe(false);
    expect(first.centralExecutableRegistryMutationPerformed).toBe(false);
    expect(first.crossCandidateSynthesisPerformed).toBe(false);
    expect(first.candidateSetCompositionPolicyResolved).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    );
  });
});
