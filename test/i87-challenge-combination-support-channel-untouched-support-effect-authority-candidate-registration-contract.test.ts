import { describe, expect, test } from 'vitest';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport } from '../src/index.js';
import { buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract } from '../src/research/i87-challenge-combination-support-channel-untouched-support-effect-authority-candidate-registration-contract.js';

function i86(): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i86_i87_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS',
    decision:
      'ADDITIONAL_AUTHORITY_ACQUISITION_RESEARCH_REGISTRATION_ALLOWED_DIRECT_RULE_PROMOTION_BLOCKED',
    upstreamI85ReportId: 'i85_fixture',
    existingCanonicalInventoryExhaustedForCurrentScope: true,
    additionalAuthorityAcquisitionNeeded: true,
    externalAuthorityDiscoveryResearchAuthorized: true,
    sourceProvenanceNormalizationAuthorized: true,
    sourceRegistrationResearchAuthorized: true,
    registeredCandidateI84RequirementEvaluationAuthorized: true,
    methodologyOrRulePromotionReviewRequiredAfterCandidateEvaluation: true,
    acquisitionStages: [],
    sourceReferenceContract: [
      'sourceId',
      'sourceType',
      'title',
      'provenanceTier',
    ],
    requiredCoreSourceReferenceFields: [
      'sourceId',
      'sourceType',
      'title',
      'provenanceTier',
    ],
    provenanceDetailFieldsRequiredWhereApplicable: [
      'author',
      'editor',
      'publisher',
      'edition',
      'publicationYear',
      'language',
      'locator',
      'url',
      'accessedAt',
      'rights',
      'notes',
    ],
    candidateMustHaveStableSourceIdBeforeRequirementEvaluation: true,
    candidateMustBeRegisteredBeforeMethodologyOrRuleReference: true,
    registeredSourceContentMustBeContentAddressedInRegistrySnapshot: true,
    missingMethodologySourceReferenceFailsRegistry: true,
    missingRuleSourceReferenceFailsRegistry: true,
    sourceRegistrationAloneMeansMethodologyApproved: false,
    sourceRegistrationAloneMeansRuleApproved: false,
    sourceRegistrationAloneMeansExecutableAuthority: false,
    reviewAttestationAppliesDirectlyToSourceReference: false,
    methodologyOrRuleReviewRemainsSeparate: true,
    webSearchResultIsAuthority: false,
    retrievedSnippetIsAuthority: false,
    secondarySummaryIsAuthority: false,
    modelGeneratedSynthesisIsAuthority: false,
    relevanceMatchIsAuthority: false,
    unregisteredQuotationIsAuthority: false,
    discoveryMayBypassSourceRegistration: false,
    discoveryMayBypassI84Evaluation: false,
    candidateMayBeApprovedBecauseItIsPrimaryText: false,
    candidateMayBeApprovedBecauseItMentionsSupport: false,
    candidateMayBeApprovedBecauseItMentionsNoContestOrStability: false,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateSynthesisAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT',
    notes: [],
  };
}

describe('I87 untouched support effect authority candidate registration contract', () => {
  test('freezes a registration contract without discovering or creating a candidate', () => {
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(report.status).toBe('RESOLVED_CANDIDATE_REGISTRATION_CONTRACT');
    expect(report.decision).toBe(
      'CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED',
    );
    expect(report.registrationContractFrozen).toBe(true);
    expect(report.externalDiscoveryPerformedByThisGate).toBe(false);
    expect(report.sourceRegistrationPerformedByThisGate).toBe(false);
    expect(report.actualCandidateCreatedByThisGate).toBe(false);
  });

  test('reuses SourceReference rather than creating a parallel source registry', () => {
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(report.sourceReferenceContractReusedWithoutParallelRegistry).toBe(true);
    expect(report.sourceReferenceCoreFieldsRequired).toEqual([
      'sourceId',
      'sourceType',
      'title',
      'provenanceTier',
    ]);
    expect(report.sourceReferenceDetailFieldsPreservedWhereApplicable).toContain('edition');
    expect(report.sourceReferenceDetailFieldsPreservedWhereApplicable).toContain('locator');
    expect(report.sourceReferenceDetailFieldsPreservedWhereApplicable).toContain('rights');
  });

  test('requires exact evidence localization, language/translation, scope, applicability, exceptions, provenance, and discovery trace', () => {
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(report.evidenceRepresentationRequired).toBe(true);
    expect(report.exactLocatorStatementRequired).toBe(true);
    expect(report.sourceLanguageStatementRequired).toBe(true);
    expect(report.translationStatusRequired).toBe(true);
    expect(report.scopeStatementRequired).toBe(true);
    expect(report.applicabilityStatementRequired).toBe(true);
    expect(report.exceptionStatementRequired).toBe(true);
    expect(report.provenanceStatementRequired).toBe(true);
    expect(report.discoveryTraceStatementRequired).toBe(true);
  });

  test('initializes all six I84 requirement slots as NOT_EVALUATED with no inference shortcuts', () => {
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(report.allSixI84RequirementSlotsRequired).toBe(true);
    expect(report.requirementSlotsInitializedAsNotEvaluated).toBe(true);
    expect(report.registrationTemplate.requirementSlots).toHaveLength(6);
    expect(
      report.registrationTemplate.requirementSlots.every(
        (slot) =>
          slot.coverageState === 'NOT_EVALUATED' &&
          slot.evidenceMayBeInferredFromRelevance === false &&
          slot.evidenceMayBeInferredFromSourceType === false &&
          slot.evidenceMayBeInferredFromProvenanceTier === false &&
          slot.evidenceMayBeInferredFromNoContestLanguage === false &&
          slot.evidenceMayBeInferredFromSupportLanguage === false,
      ),
    ).toBe(true);
  });

  test('forbids fabricated bibliography, guessed locators, title-based scope inference, and locator-free evidence', () => {
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(report.missingBibliographicMetadataMayBeFabricated).toBe(false);
    expect(report.missingLocatorMayBeGuessed).toBe(false);
    expect(report.missingScopeMayBeInferredFromTitle).toBe(false);
    expect(report.translationMayReplaceOriginalLocator).toBe(false);
    expect(report.paraphraseWithoutExactLocatorAccepted).toBe(false);
    expect(report.boundedVerbatimWithoutExactLocatorAccepted).toBe(false);
    expect(report.searchSnippetMayPopulateAuthorityEvidenceWithoutSourceVerification).toBe(false);
  });

  test('requires a content-addressed candidate registration id and forbids search ranking from assigning authority identity', () => {
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(report.candidateRegistrationIdMustBeContentAddressed).toBe(true);
    expect(report.candidateRegistrationIdMayBeAssignedFromSearchRanking).toBe(false);
    expect(report.requirementCoverageMayBePreApprovedAtRegistration).toBe(false);
    expect(report.sourceTypeMayAutoSatisfyRequirement).toBe(false);
    expect(report.primaryProvenanceTierMayAutoSatisfyRequirement).toBe(false);
  });

  test('fails closed when I86 does not preserve acquisition guards', () => {
    const invalid = {
      ...i86(),
      webSearchResultIsAuthority: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport;
    const report =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        invalid,
      );
    expect(report.status).toBe('I86_UNRESOLVED_OR_INVALID');
    expect(report.registrationContractFrozen).toBe(false);
  });

  test('is deterministic and preserves approval, effect, relative-force, precedence, scoring, and classification guards', () => {
    const first =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    const second =
      buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
        i86(),
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.methodologyOrRuleApprovalAuthorized).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE',
    );
  });
});
