import { describe, expect, test } from 'vitest';
import {
  buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence,
  buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  type I84UntouchedSupportAuthorityRequirement,
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
    reviewId: 'i84_i89_fixture',
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

function i87(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport {
  return {
    reviewId: 'i87_i89_fixture',
    status: 'RESOLVED_CANDIDATE_REGISTRATION_CONTRACT',
    decision: 'CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED',
    registrationContractFrozen: true,
    sourceReferenceContractReusedWithoutParallelRegistry: true,
    evidenceRepresentationRequired: true,
    exactLocatorStatementRequired: true,
    sourceLanguageStatementRequired: true,
    translationStatusRequired: true,
    scopeStatementRequired: true,
    applicabilityStatementRequired: true,
    exceptionStatementRequired: true,
    provenanceStatementRequired: true,
    discoveryTraceStatementRequired: true,
    allSixI84RequirementSlotsRequired: true,
    requirementSlotsInitializedAsNotEvaluated: true,
    candidateRegistrationIdMustBeContentAddressed: true,
    searchSnippetMayPopulateAuthorityEvidenceWithoutSourceVerification: false,
    requirementCoverageMayBePreApprovedAtRegistration: false,
    methodologyOrRuleApprovalAuthorized: false,
    executableAuthorityAuthorized: false,
    crossCandidateSynthesisAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE',
  } as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport;
}

function i88() {
  return buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
    i87(),
  );
}

describe('I89 untouched support effect authority candidate I84 requirement coverage evidence', () => {
  test('evaluates all six frozen I84 requirements independently', () => {
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    expect(report.status).toBe('RESOLVED_I84_REQUIREMENT_COVERAGE_EVIDENCE');
    expect(report.evaluatedRequirementCount).toBe(6);
    expect(report.allSixRequirementsEvaluated).toBe(true);
    expect(report.coverage.map((item) => item.requirementId)).toEqual(
      REQUIREMENTS.map((item) => item.requirementId),
    );
  });

  test('does not fully satisfy any I84 requirement from topical relevance alone', () => {
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    expect(report.satisfiedRequirementCount).toBe(0);
    expect(report.partialRequirementCount).toBe(3);
    expect(report.unsupportedRequirementCount).toBe(3);
    expect(report.candidateSatisfiesAllI84Requirements).toBe(false);
    expect(report.candidateAcceptedForUntouchedSupportAuthority).toBe(false);
  });

  test('keeps post-interaction untouched-source rule and persistence semantics unsupported', () => {
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    const byId = new Map(report.coverage.map((item) => [item.requirementId, item]));
    expect(byId.get('EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE')?.coverageState).toBe(
      'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
    );
    expect(byId.get('UNTOUCHED_PERSISTENCE_STATE_SEMANTICS')?.coverageState).toBe(
      'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
    );
  });

  test('records position and support-kind evidence as scoped partial coverage only', () => {
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    const byId = new Map(report.coverage.map((item) => [item.requirementId, item]));
    expect(byId.get('SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS')?.coverageState).toBe(
      'PARTIAL_SCOPED_SUPPORT_ONLY',
    );
    expect(
      byId.get('SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT')?.coverageState,
    ).toBe('PARTIAL_SCOPED_SUPPORT_ONLY');
    expect(byId.get('SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS')?.countsAsSatisfiedForI84).toBe(
      false,
    );
  });

  test('does not let primary provenance substitute for missing normative scope', () => {
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    const provenance = report.coverage.find(
      (item) => item.requirementId === 'INDEPENDENT_PROVENANCE_BASIS',
    );
    expect(provenance?.coverageState).toBe('PARTIAL_SCOPED_SUPPORT_ONLY');
    expect(provenance?.primaryProvenanceMaySubstituteForNormativeScope).toBe(false);
    expect(provenance?.countsAsSatisfiedForI84).toBe(false);
  });

  test('fails closed if the I84 contract allows partial candidate passage', () => {
    const invalid = {
      ...i84(),
      candidateMayPassWithPartialCoverage: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport;
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        invalid,
        i88(),
      );
    expect(report.status).toBe('I84_OR_I88_UNRESOLVED_OR_INVALID');
    expect(report.evaluatedRequirementCount).toBe(0);
  });

  test('fails closed if I88 claims registration itself satisfies requirements', () => {
    const invalid = {
      ...i88(),
      sourceRegistrationMeansRequirementSatisfied: true,
    } as unknown as ReturnType<typeof i88>;
    const report =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        invalid,
      );
    expect(report.status).toBe('I84_OR_I88_UNRESOLVED_OR_INVALID');
    expect(report.coverage).toEqual([]);
  });

  test('keeps authority gap open and preserves effect, precedence, scoring, and classifier guards', () => {
    const first =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    const second =
      buildI89ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateI84RequirementCoverageEvidence(
        i84(),
        i88(),
      );
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.authorityGapClosed).toBe(false);
    expect(first.additionalCandidateDiscoveryRequired).toBe(true);
    expect(first.crossCandidateSynthesisAuthorized).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_MISSING_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS',
    );
  });
});
