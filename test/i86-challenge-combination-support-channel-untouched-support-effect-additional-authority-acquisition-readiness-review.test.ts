import { describe, expect, test } from 'vitest';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport } from '../src/index.js';
import { buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview } from '../src/research/i86-challenge-combination-support-channel-untouched-support-effect-additional-authority-acquisition-readiness-review.js';

function i85(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport {
  return {
    reportId: 'i85_i86_fixture',
    inventoryVersion: 'fixture',
    status: 'RESOLVED_AUTHORITY_CANDIDATE_INVENTORY',
    decision: 'EXISTING_CANONICAL_CANDIDATES_INVENTORIED_NO_FULL_REQUIREMENT_COVERAGE',
    upstreamI84ReviewId: 'i84_fixture',
    upstreamI51ReviewId: 'i51_fixture',
    upstreamI53ReviewId: 'i53_fixture',
    candidates: [
      {
        sourceId: 'SRC-FIXTURE',
        registrations: [
          {
            upstreamAuthority: 'I51',
            supportType: 'direct_basis',
            finding: 'fixture relevance only',
          },
        ],
        canonicalRelevanceClass: 'DIRECT_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE',
        directBasisRegistrationObserved: true,
        scopeLimitRegistrationObserved: false,
        crossReferenceRegistrationObserved: false,
        requirementCoverage: [],
        satisfiedRequirementIds: [],
        unsatisfiedRequirementIds: [
          'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
          'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
          'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
          'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
          'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
          'INDEPENDENT_PROVENANCE_BASIS',
        ],
        fullRequirementCoverage: false,
        candidateEligibleForUntouchedEffectRulePromotion: false,
        candidateEligibleForDefaultActivationRule: false,
        candidateEligibleForDefaultPersistenceRule: false,
        candidateEligibleForDefaultEffectiveSupportRule: false,
      },
    ],
    registrationCount: 8,
    uniqueCandidateCount: 6,
    duplicateSourceRegistrationsCollapsedBySourceId: true,
    provenancePreservedPerRegistration: true,
    anyCandidateFullRequirementCoverage: false,
    allCandidatesFailAtLeastOneMandatoryRequirement: true,
    existingCandidateSetCoverageUnionClosesAnyRequirement: false,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateCoverageCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    sameSourceDuplicateRegistrationAggregationAuthorizedForInventoryOnly: true,
    externalAuthoritySearchPerformed: false,
    newAuthorityCandidateAdded: false,
    candidateApprovalAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    notes: [],
  };
}

describe('I86 untouched support effect additional authority acquisition readiness', () => {
  test('opens only research discovery, provenance normalization, registration, and I84 evaluation after the canonical inventory is exhausted', () => {
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(report.status).toBe('RESOLVED_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS');
    expect(report.decision).toBe(
      'ADDITIONAL_AUTHORITY_ACQUISITION_RESEARCH_REGISTRATION_ALLOWED_DIRECT_RULE_PROMOTION_BLOCKED',
    );
    expect(report.existingCanonicalInventoryExhaustedForCurrentScope).toBe(true);
    expect(report.additionalAuthorityAcquisitionNeeded).toBe(true);
    expect(report.externalAuthorityDiscoveryResearchAuthorized).toBe(true);
    expect(report.sourceProvenanceNormalizationAuthorized).toBe(true);
    expect(report.sourceRegistrationResearchAuthorized).toBe(true);
    expect(report.registeredCandidateI84RequirementEvaluationAuthorized).toBe(true);
  });

  test('freezes the staged acquisition path and does not let any stage create executable authority directly', () => {
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(report.acquisitionStages.map((stage) => stage.stage)).toEqual([
      'DISCOVERY_ONLY',
      'PROVENANCE_NORMALIZATION',
      'SOURCE_REGISTRATION',
      'I84_REQUIREMENT_EVALUATION',
      'METHODOLOGY_OR_RULE_PROMOTION_REVIEW',
    ]);
    expect(report.acquisitionStages.every((stage) => stage.mayCreateExecutableAuthority === false)).toBe(
      true,
    );
    expect(report.acquisitionStages.at(-1)?.authorizedForResearch).toBe(false);
  });

  test('uses the existing SourceReference provenance contract and distinguishes required core fields from applicable detail fields', () => {
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(report.requiredCoreSourceReferenceFields).toEqual([
      'sourceId',
      'sourceType',
      'title',
      'provenanceTier',
    ]);
    expect(report.sourceReferenceContract).toEqual(
      expect.arrayContaining([
        'sourceId',
        'sourceType',
        'title',
        'edition',
        'locator',
        'url',
        'provenanceTier',
        'rights',
      ]),
    );
    expect(report.provenanceDetailFieldsRequiredWhereApplicable).toContain('edition');
    expect(report.provenanceDetailFieldsRequiredWhereApplicable).toContain('locator');
  });

  test('preserves registry content addressing and missing-source fail-closed requirements without equating registration to approval', () => {
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(report.candidateMustHaveStableSourceIdBeforeRequirementEvaluation).toBe(true);
    expect(report.candidateMustBeRegisteredBeforeMethodologyOrRuleReference).toBe(true);
    expect(report.registeredSourceContentMustBeContentAddressedInRegistrySnapshot).toBe(true);
    expect(report.missingMethodologySourceReferenceFailsRegistry).toBe(true);
    expect(report.missingRuleSourceReferenceFailsRegistry).toBe(true);
    expect(report.sourceRegistrationAloneMeansMethodologyApproved).toBe(false);
    expect(report.sourceRegistrationAloneMeansRuleApproved).toBe(false);
    expect(report.sourceRegistrationAloneMeansExecutableAuthority).toBe(false);
    expect(report.methodologyOrRuleReviewRemainsSeparate).toBe(true);
  });

  test('keeps discovery artifacts and model synthesis outside authority status', () => {
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(report.webSearchResultIsAuthority).toBe(false);
    expect(report.retrievedSnippetIsAuthority).toBe(false);
    expect(report.secondarySummaryIsAuthority).toBe(false);
    expect(report.modelGeneratedSynthesisIsAuthority).toBe(false);
    expect(report.relevanceMatchIsAuthority).toBe(false);
    expect(report.unregisteredQuotationIsAuthority).toBe(false);
    expect(report.discoveryMayBypassSourceRegistration).toBe(false);
    expect(report.discoveryMayBypassI84Evaluation).toBe(false);
  });

  test('does not approve a candidate merely for being primary, mentioning support, or describing stability/no-contest', () => {
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(report.candidateMayBeApprovedBecauseItIsPrimaryText).toBe(false);
    expect(report.candidateMayBeApprovedBecauseItMentionsSupport).toBe(false);
    expect(report.candidateMayBeApprovedBecauseItMentionsNoContestOrStability).toBe(false);
    expect(report.candidateSetCompositionPolicyResolved).toBe(false);
    expect(report.crossCandidateSynthesisAuthorized).toBe(false);
  });

  test('fails closed on an unresolved or promotion-ready I85 input', () => {
    const invalid = {
      ...i85(),
      anyCandidateFullRequirementCoverage: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport;
    const report =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        invalid,
      );
    expect(report.status).toBe('I85_UNRESOLVED_OR_INVALID');
    expect(report.externalAuthorityDiscoveryResearchAuthorized).toBe(false);
    expect(report.sourceRegistrationResearchAuthorized).toBe(false);
    expect(report.acquisitionStages).toEqual([]);
  });

  test('is deterministic and preserves untouched-effect, relative-force, precedence, scoring, and classification guards', () => {
    const first =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    const second =
      buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
        i85(),
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.newNormativeUntouchedSupportPolicyAuthorized).toBe(false);
    expect(first.untouchedSupportEffectRuleImplementationAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT',
    );
  });
});
