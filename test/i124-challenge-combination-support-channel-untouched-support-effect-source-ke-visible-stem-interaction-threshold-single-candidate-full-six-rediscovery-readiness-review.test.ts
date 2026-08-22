import { describe, expect, test } from 'vitest';
import {
  buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReviewReport,
} from '../src/index.js';

const IDS = [
  'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
  'CONTEXT_AND_EXCEPTION_CONDITIONS',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
] as const;

function i118(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReviewReport {
  const base = {
    reviewId: 'i118_i124_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    decision:
      'VISIBLE_STEM_BINARY_INTERACTION_THRESHOLD_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_THRESHOLD_AUTHORIZED',
    targetSourceTerm: '克',
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    authorityGapConfirmed: true,
    authorityGapClosed: false,
    requirementCount: 6,
    requirements: IDS.map((requirementId) => ({ requirementId })),
    allRequirementsMandatory: true,
    crossCandidateSynthesisAuthorized: false,
    multiSourceCompositionPolicyResolved: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReviewReport;
}

function i123(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReviewReport {
  const base = {
    reviewId: 'i123_i124_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS',
    decision:
      'CURRENT_THRESHOLD_AUTHORITY_CONTRACT_BLOCKS_COMPLEMENTARY_CANDIDATE_COMPOSITION_SINGLE_CANDIDATE_FULL_SIX_REMAINS_REQUIRED',
    complementaryEvidenceObserved: true,
    currentContractRequiresSingleCandidateFullSix: true,
    currentContractAuthorizesCrossCandidateComposition: false,
    complementaryEvidenceUnionMayCountAsAuthority: false,
    semanticEquivalenceMayBeInferredAcrossCandidates: false,
    candidateSetCompositionPolicyResolved: false,
    singleCandidateFullSixRediscoveryRequiredUnderCurrentContract: true,
    priorCandidatesMayBeRetainedAsResearchContext: true,
    priorCandidatesMayBeAggregatedForThresholdVerdict: false,
    noCandidateMayBePromotedByThisGate: true,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_READINESS_REVIEW',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReviewReport;
}

describe('I124 source 克 visible-stem threshold single-candidate full-six rediscovery readiness', () => {
  test('authorizes only broadened one-candidate full-six rediscovery', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_READINESS',
    );
    expect(report.decision).toBe(
      'SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_AUTHORIZED_PRIOR_CANDIDATES_CONTEXT_ONLY_NO_THRESHOLD_PROMOTION',
    );
    expect(report.rediscoveryMode).toBe('ONE_CANDIDATE_ALL_SIX_I118_REQUIREMENTS_BROADENED_CORPUS');
    expect(report.oneCandidateOnly).toBe(true);
    expect(report.requirementCount).toBe(6);
  });

  test('preserves the exact six I118 requirements inside one candidate', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(report.requirements.map((item) => item.requirementId)).toEqual(IDS);
    expect(report.everyRequirementNeedsIndependentExactEvidenceWithinSameCandidate).toBe(true);
    expect(report.allSixLocatorsRequiredBeforeRegistration).toBe(true);
    expect(report.coverageEvaluationRequiredAfterRegistration).toBe(true);
    expect(
      report.requirements.every(
        (item) =>
          item.mandatory &&
          item.sameCandidateExactEvidenceRequired &&
          item.exactLocatorRequired &&
          item.originalOrVerifiedSourceContextRequired,
      ),
    ).toBe(true);
  });

  test('requires the missing literal boundary and every other semantic locus in the same source', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(report.literalWuLiOrTraditionalEquivalentRequiredWithinSameCandidate).toBe(true);
    expect(report.explicitWuLiSemanticBoundaryRequiredWithinSameCandidate).toBe(true);
    expect(report.explicitVisibleStemScopeRequiredWithinSameCandidate).toBe(true);
    expect(report.explicitBinaryEligibilitySemanticsRequiredWithinSameCandidate).toBe(true);
    expect(report.qualitativeVsBinarySeparationRequiredWithinSameCandidate).toBe(true);
    expect(report.contextAndExceptionsRequiredWithinSameCandidate).toBe(true);
    expect(report.independentNormativeProvenanceRequiredWithinSameCandidate).toBe(true);
  });

  test('broadens search classes without treating source class as coverage', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(report.broadenHistoricalPrimarySources).toBe(true);
    expect(report.broadenPublishedModernBooks).toBe(true);
    expect(report.broadenScholarlyOrInstitutionalReferences).toBe(true);
    expect(report.broadenPractitionerSecondarySources).toBe(true);
    expect(report.alternateEditionMayBeInspectedAfterIdentityResolution).toBe(true);
    expect(report.verifiedSameWorkTranscriptionMayBeInspectedAfterIdentityResolution).toBe(true);
  });

  test('retains earlier candidates only as rediscovery seeds and forbids coverage aggregation', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(report.priorChenYuanCandidateMaySeedSearch).toBe(true);
    expect(report.priorWeiQianliCandidateMaySeedSearch).toBe(true);
    expect(report.priorZhuZuxiaCandidateMaySeedSearch).toBe(true);
    expect(report.priorPractitionerCandidateMaySeedSearch).toBe(true);
    expect(report.priorCandidatesMayCountAsCombinedCoverage).toBe(false);
    expect(report.priorCandidateLiteralMayBeCombinedWithNewCandidateBoundary).toBe(false);
    expect(report.priorCandidateBoundaryMayBeCombinedWithNewCandidateLiteral).toBe(false);
    expect(report.candidateSetCompositionAuthorized).toBe(false);
    expect(report.semanticEquivalenceAcrossSourcesAuthorized).toBe(false);
  });

  test('keeps every authority shortcut and downstream authority closed', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(report.partialCoverageFallbackAuthorized).toBe(false);
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.modelGeneratedSynthesisMayCountAsAuthorityEvidence).toBe(false);
    expect(report.numericCalibrationMayCountAsNormativeAuthority).toBe(false);
    expect(report.noCandidateFoundMayCreateDefaultThreshold).toBe(false);
    expect(report.discoveryPerformedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and routes valid readiness to actual rediscovery evidence', () => {
    const first = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );
    const second = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_EVIDENCE',
    );
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
  });

  test('fails closed if either I118 or I123 governance boundary changes', () => {
    const report = buildI124ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryReadinessReview(
      i118(),
      i123({ currentContractAuthorizesCrossCandidateComposition: true }),
    );

    expect(report.status).toBe('I118_OR_I123_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_READINESS_NOT_ESTABLISHED');
    expect(report.rediscoveryMode).toBe('NONE');
    expect(report.requirementCount).toBe(0);
    expect(report.requirements).toEqual([]);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
    );
  });
});
