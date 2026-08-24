import { describe, expect, test } from 'vitest';
import {
  buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport,
} from '../src/index.js';

function i122(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport {
  const base = {
    evidenceId: 'i122_i123_fixture',
    evidenceVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    decision:
      'TARGETED_WU_LI_DISCOVERY_FOUND_COMPLEMENTARY_NONCOMPOSABLE_EVIDENCE_NO_SINGLE_SOURCE_FULL_SIX_ADMISSION',
    upstreamI121ReviewId: 'i121_fixture',
    targetedDiscoveryPerformed: true,
    targetLiteralForms: ['无力', '無力'],
    inspectedCandidateCount: 4,
    inspectedCandidates: [{}, {}, {}, {}],
    literalBearingCandidateCount: 2,
    explicitBoundaryBearingCandidateCount: 2,
    fullSixCandidateCount: 0,
    registeredCandidateCount: 0,
    registeredCandidate: null,
    existingI107LiteralBoundaryStillUndefined: true,
    weiQianliSameWorkWuLiLocatorVerified: false,
    zhuZuxiaRemoteConditionalBoundaryObserved: true,
    zhuZuxiaTargetLiteralObservedInRemoteBoundarySection: false,
    practitionerRemoteWuLiLiteralObserved: true,
    practitionerRemoteWuLiBoundaryExplicitlyDefined: false,
    complementaryEvidenceExistsAcrossCandidates: true,
    complementaryEvidenceMayBeComposed: false,
    crossCandidateSemanticEquivalenceAuthorized: false,
    wuLiMayBeEquatedToBuNengXiangKe: false,
    wuLiMayBeEquatedToWeakButConditionalInteraction: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    modelSynthesisMayCountAsAuthorityEvidence: false,
    noResultMayCreateDefaultThreshold: false,
    candidateRegistrationPerformedByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
    notes: [],
  } as const;

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport;
}

describe('I123 source 克 visible-stem threshold candidate-set composition readiness', () => {
  test('confirms that complementary evidence does not authorize composition', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS',
    );
    expect(report.decision).toBe(
      'CURRENT_THRESHOLD_AUTHORITY_CONTRACT_BLOCKS_COMPLEMENTARY_CANDIDATE_COMPOSITION_SINGLE_CANDIDATE_FULL_SIX_REMAINS_REQUIRED',
    );
    expect(report.complementaryEvidenceObserved).toBe(true);
    expect(report.currentContractAuthorizesCrossCandidateComposition).toBe(false);
    expect(report.complementaryEvidenceUnionMayCountAsAuthority).toBe(false);
  });

  test('preserves the single-candidate full-six authority requirement', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(report.currentContractRequiresSingleCandidateFullSix).toBe(true);
    expect(report.singleCandidateFullSixRediscoveryRequiredUnderCurrentContract).toBe(true);
    expect(report.fullSixCandidateCount).toBe(0);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.noCandidateMayBePromotedByThisGate).toBe(true);
  });

  test('forbids literal-plus-boundary union and inferred cross-source semantic equivalence', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(report.literalFromOneCandidatePlusBoundaryFromAnotherMayCountAsSatisfiedRequirement).toBe(false);
    expect(report.semanticEquivalenceMayBeInferredAcrossCandidates).toBe(false);
    expect(report.priorCandidatesMayBeAggregatedForThresholdVerdict).toBe(false);
    expect(report.priorCandidatesMayBeRetainedAsResearchContext).toBe(true);
  });

  test('does not derive composition authority from provenance, multiplicity, or relevance overlap', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(report.candidateSourceMultiplicityMayCountAsCompositionAuthority).toBe(false);
    expect(report.primarySourceStatusMayAuthorizeCompositionByItself).toBe(false);
    expect(report.provenanceTierMayAuthorizeCompositionByItself).toBe(false);
    expect(report.relevanceOverlapMayAuthorizeComposition).toBe(false);
    expect(report.consistentDirectionalConclusionMayAuthorizeComposition).toBe(false);
    expect(report.compositionPolicyMayBeDerivedFromI122Evidence).toBe(false);
  });

  test('requires a separate normative policy before any future cross-candidate acceptance', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(report.candidateSetCompositionPolicyResolved).toBe(false);
    expect(report.newNormativeCompositionPolicyRequiredToPermitCrossCandidateAcceptance).toBe(true);
    expect(report.newNormativeCompositionPolicyAuthorizedByThisGate).toBe(false);
    expect(report.newNormativeCompositionPolicyRequirementsFrozenByThisGate).toBe(false);
  });

  test('keeps threshold, hidden-stem, settlement, scoring, and classification authority closed', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and routes to renewed single-candidate full-six discovery readiness', () => {
    const first = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );
    const second = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.literalBearingCandidateCount).toBe(2);
    expect(first.explicitBoundaryBearingCandidateCount).toBe(2);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_READINESS_REVIEW',
    );
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
  });

  test('fails closed when I122 no longer proves the exact complementary evidence frontier', () => {
    const report = buildI123ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdCandidateSetCompositionPolicyReadinessReview(
      i122({ complementaryEvidenceMayBeComposed: true }),
    );

    expect(report.status).toBe('I122_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('THRESHOLD_CANDIDATE_SET_COMPOSITION_READINESS_NOT_EVALUATED');
    expect(report.complementaryEvidenceObserved).toBe(false);
    expect(report.currentContractRequiresSingleCandidateFullSix).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    );
  });
});
