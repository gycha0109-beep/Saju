import { describe, expect, test } from 'vitest';
import {
  buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence,
  buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport,
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

const IDS = REQUIREMENTS.map((item) => item.requirementId);

function i84Requirements(): readonly I84UntouchedSupportAuthorityRequirement[] {
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
    reviewId: 'i84_i96_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS',
    decision: 'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    upstreamI83ReviewId: 'i83_fixture',
    requirements: i84Requirements(),
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
    reviewId: 'i87_i96_fixture',
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE',
  } as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport;
}

function i94(): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i94_i96_fixture',
    status: 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_READINESS',
    decision: 'SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION',
    discoveryMode: 'SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY',
    discoveryRequirements: REQUIREMENTS.map((item) => ({
      requirementId: item.requirementId,
      mandatory: true,
      sameCandidateMustProvideIndependentExactEvidence: true,
      coverageMayBePreApprovedAtDiscovery: false,
      topicalRelevanceMayCountAsSatisfaction: false,
      scopedExampleMayCountAsUniversalRule: false,
      absenceOfContradictionMayCountAsSatisfaction: false,
      numericCalibrationMaySubstitute: false,
    })),
    oneCandidateOnly: true,
    candidateMustUseI87RegistrationContract: true,
    oneNormalizedSourceReferencePerCandidateRequired: true,
    originalSourceInspectionRequired: true,
    exactSourceIdentityRequired: true,
    exactLocatorRequired: true,
    stableRevisionOrEquivalentReproducibleLocatorRequired: true,
    sourceLanguageAndTranslationStatusRequired: true,
    scopeApplicabilityExceptionProvenanceRequired: true,
    coherentSingleSourceAuthorityScopeRequired: true,
    everyI84RequirementNeedsIndependentExactEvidenceWithinSameCandidate: true,
    allSixRequirementCoverageMustBeEvaluatedAfterRegistration: true,
    actualExternalDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateCoverageEvaluatedByThisGate: false,
    candidateCoveragePreApprovalAuthorized: false,
    partialCoverageFallbackAuthorized: false,
    crossCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    multiplePartialCandidatesMaySubstituteForOneFullCandidate: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    modelGeneratedSynthesisMayCountAsAuthorityEvidence: false,
    secondarySummaryMaySubstituteForOriginalSourceInspection: false,
    numericCalibrationMayCountAsNormativeAuthority: false,
    noCandidateFoundMayBeConvertedToDefaultRule: false,
    methodologyOrRulePromotionAuthorized: false,
    executableAuthorityAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport;
}

function i95() {
  return buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
    i87(),
    i94(),
  );
}

describe('I96 untouched support effect single-candidate I84 full coverage evaluation evidence', () => {
  test('evaluates all six frozen I84 requirements independently against only the I95 candidate', () => {
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    expect(report.status).toBe('RESOLVED_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE');
    expect(report.evaluatedRequirementCount).toBe(6);
    expect(report.allSixRequirementsEvaluated).toBe(true);
    expect(report.coverage.map((item) => item.requirementId)).toEqual(IDS);
    expect(report.coverage.every((item) => item.evidenceComesFromSameRegisteredCandidate)).toBe(true);
  });

  test('records six satisfied requirements with no partial or unsupported slot', () => {
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    expect(report.satisfiedRequirementCount).toBe(6);
    expect(report.partialRequirementCount).toBe(0);
    expect(report.unsupportedRequirementCount).toBe(0);
    expect(report.candidateSatisfiesAllI84Requirements).toBe(true);
    expect(report.candidateMeetsFrozenI84AcceptanceContract).toBe(true);
    expect(report.authorityCoverageGapSatisfied).toBe(true);
  });

  test('treats the no-damage stem/branch rule as explicit post-interaction coverage without creating a default runtime verdict', () => {
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    const item = report.coverage.find(
      (coverage) => coverage.requirementId === 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
    );
    expect(item?.coverageState).toBe('SUPPORTED_BY_REGISTERED_EVIDENCE');
    expect(item?.countsAsSatisfiedForI84).toBe(true);
    expect(item?.absenceOfTrackedContestAloneMaySubstitute).toBe(false);
    expect(item?.genericNoTouchMayBePromotedToActive).toBe(false);
    expect(item?.genericNoTouchMayBePromotedToPersisted).toBe(false);
    expect(item?.genericNoTouchMayBePromotedToEffectiveSupport).toBe(false);
  });

  test('identifies conditional-not-default untouched persistence semantics', () => {
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    const item = report.coverage.find(
      (coverage) => coverage.requirementId === 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
    );
    expect(item?.coverageState).toBe('SUPPORTED_BY_REGISTERED_EVIDENCE');
    expect(report.conditionalUntouchedPersistenceSemanticsIdentified).toBe(true);
    expect(report.persistenceSemanticsClass).toBe('CONDITIONAL_NOT_DEFAULT');
    expect(report.universalDefaultPersistedRuleAuthorized).toBe(false);
  });

  test('covers visible-stem versus branch exceptions and both 印 and 比劫 support without precedence or weight', () => {
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    const byId = new Map(report.coverage.map((item) => [item.requirementId, item]));
    expect(byId.get('SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS')?.coverageState).toBe(
      'SUPPORTED_BY_REGISTERED_EVIDENCE',
    );
    expect(byId.get('SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT')?.coverageState).toBe(
      'SUPPORTED_BY_REGISTERED_EVIDENCE',
    );
    expect(byId.get('SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT')?.numericCalibrationMaySubstitute).toBe(false);
  });

  test('satisfies independent provenance without borrowing I88/I91 coverage or composing candidates', () => {
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    expect(report.coverage.find((item) => item.requirementId === 'INDEPENDENT_PROVENANCE_BASIS')?.coverageState).toBe(
      'SUPPORTED_BY_REGISTERED_EVIDENCE',
    );
    expect(report.priorI88CandidateCoverageBorrowed).toBe(false);
    expect(report.priorI91CandidateCoverageBorrowed).toBe(false);
    expect(report.crossCandidateSynthesisPerformed).toBe(false);
    expect(report.crossCandidateSynthesisAuthorized).toBe(false);
  });

  test('fails closed when I95 becomes composition-permissive or pre-authoritative', () => {
    const invalid = {
      ...i95(),
      crossCandidateCompositionAuthorized: true,
    } as unknown as ReturnType<typeof i95>;
    const report = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      invalid,
    );
    expect(report.status).toBe('I84_OR_I95_UNRESOLVED_OR_INVALID');
    expect(report.coverage).toEqual([]);
    expect(report.authorityCoverageGapSatisfied).toBe(false);
  });

  test('requires promotion review and preserves all effect, precedence, scoring, and classifier guards deterministically', () => {
    const first = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    const second = buildI96ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateI84FullCoverageEvaluationEvidence(
      i84(),
      i95(),
    );
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.authorityGapClosed).toBe(false);
    expect(first.candidateAcceptedForUntouchedSupportAuthority).toBe(false);
    expect(first.candidatePromotedToMethodologyOrRuleAuthority).toBe(false);
    expect(first.sourceReferenceApprovedForMethodologyOrRuleUse).toBe(false);
    expect(first.promotionReadinessReviewRequired).toBe(true);
    expect(first.additionalCandidateDiscoveryRequired).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW',
    );
  });
});
