import { describe, expect, test } from 'vitest';
import {
  buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence,
  buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
  type I84UntouchedSupportAuthorityRequirement,
  type I84UntouchedSupportAuthorityRequirementId,
  type I90TargetedDiscoveryLane,
} from '../src/index.js';

const REQUIREMENTS = [
  {
    requirementId: 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
    requirement:
      'An explicit post-interaction rule scoped to a support source with no tracked direct relation touch, rather than an inference from absence of contest.',
  },
  {
    requirementId: 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
    requirement:
      'A distinction between structural support-channel presence/direction and source activation, persistence, and effective support effect.',
  },
  {
    requirementId: 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
    requirement:
      'Explicit applicability and exception conditions across visible-stem and branch sources without assuming fixed positional precedence.',
  },
  {
    requirementId: 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
    requirement:
      'Explicit applicability across same-element and resource-generation support without assuming one kind outranks the other or assigning numeric weight.',
  },
  {
    requirementId: 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
    requirement:
      'A statement of whether untouched-source persistence is a default, conditional state, or intentionally unresolved state after all tracked relation settlement is absent.',
  },
  {
    requirementId: 'INDEPENDENT_PROVENANCE_BASIS',
    requirement:
      'A provenance basis strong enough to stand independently of scoped pattern examples or cross-references that were not written as universal settlement rules.',
  },
] as const;

function requirements(): readonly I84UntouchedSupportAuthorityRequirement[] {
  return REQUIREMENTS.map((item) => ({
    ...item,
    mandatory: true,
    currentCanonicalAuthoritySatisfies: false,
    futureAuthorityCandidateMustSatisfy: true,
    silenceOrAbsenceOfContestMaySatisfy: false,
    supportDirectionAloneMaySatisfy: false,
    scopedPatternExampleAloneMaySatisfy: false,
    numericCalibrationMaySubstitute: false,
  }));
}

function i84(): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  return {
    reviewId: 'i84_i92_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS',
    decision: 'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    upstreamI83ReviewId: 'i83_fixture',
    requirements: requirements(),
    requirementsFrozen: true,
    allRequirementsMandatory: true,
    currentCanonicalAuthoritySatisfiesAllRequirements: false,
    candidateMayPassWithPartialCoverage: false,
    candidateMayPassBySilence: false,
    candidateMayPassFromAbsenceOfTrackedContestAlone: false,
    candidateMayPassFromSupportDirectionAlone: false,
    candidateMayPassFromScopedPatternExampleAlone: false,
    candidateMayPassFromNumericCalibration: false,
    candidateSetCompositionPolicyResolved: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    newNormativeUntouchedSupportPolicyAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY',
    notes: [],
  };
}

const IDS = REQUIREMENTS.map((item) => item.requirementId) as readonly I84UntouchedSupportAuthorityRequirementId[];

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
    reviewId: 'i90_i92_fixture',
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

function i91() {
  return buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
    i90(),
  );
}

describe('I92 untouched support effect targeted candidate I84 requirement coverage evidence', () => {
  test('evaluates all six frozen I84 requirements independently for the I91 candidate', () => {
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    expect(report.status).toBe('RESOLVED_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE');
    expect(report.evaluatedRequirementCount).toBe(6);
    expect(report.allSixRequirementsEvaluated).toBe(true);
    expect(report.coverage.map((item) => item.requirementId)).toEqual(IDS);
  });

  test('records zero satisfied, four scoped partial, and two unsupported requirements', () => {
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    expect(report.satisfiedRequirementCount).toBe(0);
    expect(report.partialRequirementCount).toBe(4);
    expect(report.unsupportedRequirementCount).toBe(2);
    expect(report.candidateSatisfiesAllI84Requirements).toBe(false);
    expect(report.candidateAcceptedForUntouchedSupportAuthority).toBe(false);
  });

  test('keeps explicit untouched post-interaction rule and common paired support-kind rule unsupported', () => {
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    const byId = new Map(report.coverage.map((item) => [item.requirementId, item]));
    expect(byId.get('EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE')?.coverageState).toBe(
      'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
    );
    expect(
      byId.get('SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT')?.coverageState,
    ).toBe('NOT_SUPPORTED_BY_REGISTERED_EVIDENCE');
  });

  test('treats presence-versus-effect and persistence-like no-damage language as scoped partial only', () => {
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    const byId = new Map(report.coverage.map((item) => [item.requirementId, item]));
    expect(byId.get('STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION')?.coverageState).toBe(
      'PARTIAL_SCOPED_SUPPORT_ONLY',
    );
    expect(byId.get('UNTOUCHED_PERSISTENCE_STATE_SEMANTICS')?.coverageState).toBe(
      'PARTIAL_SCOPED_SUPPORT_ONLY',
    );
    expect(
      byId.get('UNTOUCHED_PERSISTENCE_STATE_SEMANTICS')
        ?.noDamageLanguageMaySubstituteForGenericUntouchedPersistence,
    ).toBe(false);
  });

  test('keeps position exceptions and primary provenance scoped instead of universally satisfying I84', () => {
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    const byId = new Map(report.coverage.map((item) => [item.requirementId, item]));
    expect(byId.get('SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS')?.coverageState).toBe(
      'PARTIAL_SCOPED_SUPPORT_ONLY',
    );
    expect(byId.get('INDEPENDENT_PROVENANCE_BASIS')?.coverageState).toBe(
      'PARTIAL_SCOPED_SUPPORT_ONLY',
    );
    expect(byId.get('INDEPENDENT_PROVENANCE_BASIS')?.primaryProvenanceMaySubstituteForNormativeScope).toBe(false);
  });

  test('does not borrow I88 coverage or synthesize candidates', () => {
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    expect(report.priorI88CandidateCoverageBorrowed).toBe(false);
    expect(report.crossCandidateSynthesisPerformed).toBe(false);
    expect(report.crossCandidateSynthesisAuthorized).toBe(false);
    expect(report.candidateSetCompositionPolicyResolved).toBe(false);
  });

  test('fails closed if I84 allows partial coverage to pass', () => {
    const invalid = {
      ...i84(),
      candidateMayPassWithPartialCoverage: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport;
    const report = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      invalid,
      i91(),
    );
    expect(report.status).toBe('I84_OR_I91_UNRESOLVED_OR_INVALID');
    expect(report.coverage).toEqual([]);
  });

  test('preserves open authority gap and all effect, precedence, scoring, and classifier guards deterministically', () => {
    const first = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    const second = buildI92ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedCandidateI84RequirementCoverageEvidence(
      i84(),
      i91(),
    );
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.authorityGapClosed).toBe(false);
    expect(first.additionalCandidateDiscoveryRequired).toBe(true);
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
      'UNTOUCHED_SUPPORT_EFFECT_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
    );
  });
});
