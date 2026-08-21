import { describe, expect, test } from 'vitest';
import {
  buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence,
  i95VerifiedChenYuanSizhuYuceCandidate,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport,
  type I88DiscoveredAuthorityCandidateInput,
} from '../src/index.js';

const IDS = [
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const;

function i87(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport {
  return {
    reviewId: 'i87_i95_fixture',
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
    reviewId: 'i94_i95_fixture',
    status: 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_READINESS',
    decision: 'SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION',
    discoveryMode: 'SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY',
    discoveryRequirements: IDS.map((requirementId) => ({
      requirementId,
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

describe('I95 untouched support effect single-candidate full-coverage authority discovery evidence', () => {
  test('registers one plausible all-six-topic candidate as research-only evidence', () => {
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    expect(report.status).toBe('RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_EVIDENCE');
    expect(report.decision).toBe('ONE_PLAUSIBLE_FULL_COVERAGE_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED');
    expect(report.registeredCandidateCount).toBe(1);
    expect(report.registeredCandidate?.registrationStatus).toBe('RESEARCH_CANDIDATE_ONLY');
    expect(report.oneCandidateOnly).toBe(true);
  });

  test('preserves exact 1995 book identity, ISBN note, chapter, section, and anchor', () => {
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    const source = report.registeredCandidate?.sourceReference;
    expect(source?.sourceId).toBe('source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515');
    expect(source?.sourceType).toBe('modern_book');
    expect(source?.author).toBe('陈园');
    expect(source?.publisher).toBe('广州出版社');
    expect(source?.publicationYear).toBe(1995);
    expect(source?.locator?.chapter).toBe('第十一章 富贵贫贱');
    expect(source?.locator?.section).toBe('第三节 论吉凶');
    expect(source?.locator?.anchor).toContain('用神在天干不受克合');
    expect(source?.notes).toContain('9787805922515');
    expect(source?.rights?.copyrightStatus).toBe('copyrighted');
  });

  test('uses bibliography cross-verification and transcription inspection without registering the transcription as a separate authority', () => {
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    expect(report.sourceBibliographyCrossVerified).toBe(true);
    expect(report.originalSourceTextInspectedViaTranscription).toBe(true);
    expect(report.exactBookEditionIdentityResolved).toBe(true);
    expect(report.equivalentReproducibleLocatorResolved).toBe(true);
    expect(report.registeredCandidate?.sourceReference.url).toContain('books.google.com');
    expect(report.registeredCandidate?.discoveryTraceStatement).toContain('wangdailin.com');
    expect(report.registeredCandidateCount).toBe(1);
  });

  test('represents all six topics for later evaluation while keeping every I84 slot NOT_EVALUATED', () => {
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    expect(report.discoveryTopicRepresentation).toHaveLength(6);
    expect(report.discoveryTopicRepresentation.map((item) => item.requirementId)).toEqual(IDS);
    expect(report.allSixRequirementTopicsRepresentedForLaterEvaluation).toBe(true);
    expect(report.discoveryTopicRepresentation.every((item) => !item.countsAsI84RequirementSatisfied)).toBe(true);
    expect(report.allSixRequirementSlotsRemainNotEvaluated).toBe(true);
    expect(report.registeredCandidate?.requirementSlots.every((slot) => slot.coverageState === 'NOT_EVALUATED')).toBe(true);
    expect(report.candidateSatisfiesAllI84Requirements).toBe('not_evaluated');
  });

  test('reuses the I87 registration path and does not borrow prior candidate coverage or compose sources', () => {
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    expect(report.candidateRegisteredThroughI87ContractReuse).toBe(true);
    expect(report.priorI88CandidateCoverageBorrowed).toBe(false);
    expect(report.priorI91CandidateCoverageBorrowed).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.centralExecutableRegistryMutationPerformed).toBe(false);
  });

  test('rejects a plausible candidate if its exact locator is absent', () => {
    const candidate = i95VerifiedChenYuanSizhuYuceCandidate();
    const sourceWithoutLocator = { ...candidate.sourceReference };
    delete sourceWithoutLocator.locator;
    const invalid: I88DiscoveredAuthorityCandidateInput = {
      ...candidate,
      sourceReference: sourceWithoutLocator,
      exactLocatorStatement: '',
      discoveryVerification: {
        ...candidate.discoveryVerification,
        exactLocatorResolved: false,
      },
    };
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
      invalid,
    );
    expect(report.status).toBe('CANDIDATE_REGISTRATION_REJECTED');
    expect(report.registeredCandidate).toBeNull();
    expect(report.rejectionReasons).toContain('sourceReference exact locator missing');
    expect(report.rejectionReasons).toContain('exact locator statement missing');
  });

  test('fails closed if the upstream I94 admission contract becomes composition-permissive', () => {
    const invalid = {
      ...i94(),
      crossCandidateCompositionAuthorized: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport;
    const report = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      invalid,
    );
    expect(report.status).toBe('I87_OR_I94_UNRESOLVED_OR_INVALID');
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.registeredCandidate).toBeNull();
  });

  test('preserves all authority, effect, precedence, scoring, and classifier guards deterministically', () => {
    const first = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    const second = buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
      i87(),
      i94(),
    );
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.candidateRequirementEvaluationPerformedByThisGate).toBe(false);
    expect(first.candidateAcceptedForUntouchedSupportAuthority).toBe(false);
    expect(first.methodologyOrRulePromotionAuthorized).toBe(false);
    expect(first.executableAuthorityAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE');
  });
});
