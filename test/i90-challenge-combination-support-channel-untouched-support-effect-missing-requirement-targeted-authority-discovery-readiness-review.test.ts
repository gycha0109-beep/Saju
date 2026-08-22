import { describe, expect, test } from 'vitest';
import {
  buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport,
  type I89RequirementCoverageEvidence,
} from '../src/index.js';

const COVERAGE: readonly I89RequirementCoverageEvidence[] = [
  {
    requirementId: 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
    requirement: 'explicit post-interaction untouched source rule',
    coverageState: 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
    evidenceBasis: ['fixture'],
    limitingReason: 'not supported',
    countsAsSatisfiedForI84: false,
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  },
  {
    requirementId: 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
    requirement: 'presence versus effect separation',
    coverageState: 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
    evidenceBasis: ['fixture'],
    limitingReason: 'not supported',
    countsAsSatisfiedForI84: false,
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  },
  {
    requirementId: 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
    requirement: 'source position applicability and exceptions',
    coverageState: 'PARTIAL_SCOPED_SUPPORT_ONLY',
    evidenceBasis: ['fixture'],
    limitingReason: 'partial',
    countsAsSatisfiedForI84: false,
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  },
  {
    requirementId: 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
    requirement: 'support kind applicability',
    coverageState: 'PARTIAL_SCOPED_SUPPORT_ONLY',
    evidenceBasis: ['fixture'],
    limitingReason: 'partial',
    countsAsSatisfiedForI84: false,
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  },
  {
    requirementId: 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
    requirement: 'untouched persistence state semantics',
    coverageState: 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
    evidenceBasis: ['fixture'],
    limitingReason: 'not supported',
    countsAsSatisfiedForI84: false,
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  },
  {
    requirementId: 'INDEPENDENT_PROVENANCE_BASIS',
    requirement: 'independent provenance basis',
    coverageState: 'PARTIAL_SCOPED_SUPPORT_ONLY',
    evidenceBasis: ['fixture'],
    limitingReason: 'partial',
    countsAsSatisfiedForI84: false,
    topicalRelevanceMaySubstituteForSatisfaction: false,
    scopedExampleMaySubstituteForUniversalRule: false,
    primaryProvenanceMaySubstituteForNormativeScope: false,
  },
];

function i89(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport {
  return {
    evidenceId: 'i89_i90_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    decision: 'REGISTERED_CANDIDATE_PARTIAL_COVERAGE_INSUFFICIENT_FOR_I84_ACCEPTANCE',
    upstreamI84ReviewId: 'i84_fixture',
    upstreamI88EvidenceId: 'i88_fixture',
    candidateRegistrationId: 'candidate_fixture',
    candidateSourceId: 'source_fixture',
    coverage: COVERAGE,
    evaluatedRequirementCount: 6,
    satisfiedRequirementCount: 0,
    partialRequirementCount: 3,
    unsupportedRequirementCount: 3,
    allSixRequirementsEvaluated: true,
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
    notes: [],
  };
}

describe('I90 untouched support effect missing-requirement targeted authority discovery readiness', () => {
  test('creates one independent discovery lane for every unsatisfied I84 requirement', () => {
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(report.status).toBe('RESOLVED_TARGETED_AUTHORITY_DISCOVERY_READINESS');
    expect(report.discoveryLanes).toHaveLength(6);
    expect(report.unsatisfiedRequirementCount).toBe(6);
    expect(new Set(report.discoveryLanes.map((lane) => lane.requirementId)).size).toBe(6);
  });

  test('routes unsupported requirements to missing normative authority lanes', () => {
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(report.missingNormativeAuthorityLaneCount).toBe(3);
    expect(
      report.discoveryLanes
        .filter((lane) => lane.laneClass === 'MISSING_NORMATIVE_AUTHORITY')
        .map((lane) => lane.requirementId),
    ).toEqual([
      'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
      'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
      'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
    ]);
  });

  test('routes partial requirements to scoped coverage completion lanes without promoting them', () => {
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(report.scopedCoverageCompletionLaneCount).toBe(3);
    expect(report.partialCoveragePromotedToSatisfied).toBe(false);
    expect(
      report.discoveryLanes
        .filter((lane) => lane.laneClass === 'SCOPED_COVERAGE_COMPLETION')
        .map((lane) => lane.requirementId),
    ).toEqual([
      'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
      'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
      'INDEPENDENT_PROVENANCE_BASIS',
    ]);
  });

  test('requires original source inspection, exact locator, and I87 registration for every future candidate', () => {
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(
      report.discoveryLanes.every(
        (lane) =>
          lane.candidateMustUseI87RegistrationContract &&
          lane.originalSourceInspectionRequired &&
          lane.exactLocatorRequired &&
          lane.requirementMustBeEvaluatedIndependently,
      ),
    ).toBe(true);
  });

  test('forbids snippets, model synthesis, numeric calibration, and cross-candidate synthesis as evidence shortcuts', () => {
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(
      report.discoveryLanes.every(
        (lane) =>
          !lane.searchSnippetMayCountAsEvidence &&
          !lane.modelSynthesisMayCountAsEvidence &&
          !lane.numericCalibrationMayCountAsEvidence &&
          !lane.crossCandidateSynthesisMayCloseRequirement,
      ),
    ).toBe(true);
    expect(report.crossCandidateSynthesisAuthorized).toBe(false);
  });

  test('allows one candidate to cover multiple lanes only with independent exact evidence per requirement', () => {
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(
      report.discoveryLanes.every(
        (lane) => lane.sameCandidateMayCoverMultipleRequirementsOnlyWithIndependentExactEvidence,
      ),
    ).toBe(true);
  });

  test('fails closed if I89 unexpectedly authorizes cross-candidate synthesis', () => {
    const invalid = {
      ...i89(),
      crossCandidateSynthesisAuthorized: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidenceReport;
    const report =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        invalid,
      );
    expect(report.status).toBe('I89_UNRESOLVED_OR_INVALID');
    expect(report.discoveryMayProceed).toBe(false);
    expect(report.discoveryLanes).toEqual([]);
  });

  test('preserves all effect, promotion, precedence, scoring, and classifier guards while authorizing discovery only', () => {
    const first =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    const second =
      buildI90ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReview(
        i89(),
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.discoveryMayProceed).toBe(true);
    expect(first.actualExternalDiscoveryPerformedByThisGate).toBe(false);
    expect(first.i84AcceptanceThresholdChanged).toBe(false);
    expect(first.methodologyOrRulePromotionAuthorized).toBe(false);
    expect(first.executableAuthorityAuthorized).toBe(false);
    expect(first.untouchedSupportEffectRuleImplementationAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });
});
