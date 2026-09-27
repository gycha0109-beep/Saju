import { describe, expect, it } from 'vitest';
import { buildWealthMonthlyResearchReturnHandoff } from '../src/research/wealth-monthly-research-return-handoff.js';

describe('Wealth Monthly Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildWealthMonthlyResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1561');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact cumulative Wealth Monthly candidate surface', () => {
    const handoff = buildWealthMonthlyResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(6);
    expect(handoff.candidateBinding.segmentCount).toBe(2);
    expect(handoff.candidateBinding.monthlyActivationRuleCount).toBe(20);
    expect(handoff.candidateBinding.monthlyTensionRuleCount).toBe(8);
    expect(handoff.candidateBinding.monthlyRuleCount).toBe(28);
    expect(handoff.candidateBinding.reusedNatalRuleCount).toBe(11);
    expect(handoff.candidateBinding.ruleCount).toBe(
      handoff.candidateBinding.registryRuleCount,
    );
    expect(handoff.candidateBinding.packRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoff.candidateBinding.methodologies).toHaveLength(6);
    expect(handoff.candidateBinding.rules).toHaveLength(
      handoff.candidateBinding.registryRuleCount,
    );
    expect(handoff.candidateBinding.candidateSurfaceHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('returns six bounded Research workstreams instead of treating candidate semantics as truth', () => {
    const handoff = buildWealthMonthlyResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'WEALTH_MONTHLY_SEGMENT_STEM_TEN_GOD_SEMANTIC_AUTHORITY',
      'WEALTH_MONTHLY_SEGMENT_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_AUTHORITY',
      'WEALTH_MONTHLY_SEGMENT_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY',
      'WEALTH_MONTHLY_SCOPE_AND_QUALIFIER_CONTRACT',
      'WEALTH_NATAL_GENERAL_MONTHLY_WEALTH_ANNUAL_AND_CAREER_MONTHLY_REUSE_BOUNDARY',
      'PRODUCT_POLICY_TEMPORAL_SEGMENTATION_SEMANTIC_AND_FINANCIAL_ADVICE_SEPARATION',
    ]);
    expect(
      handoff.workstreams.every(
        (workstream) => workstream.owner === 'traditional_saju_research',
      ),
    ).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(true);
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
  });

  it('keeps temporal segmentation, domain inheritance, and financial advice closed', () => {
    const handoff = buildWealthMonthlyResearchReturnHandoff();

    expect(handoff.authorityBoundary.wealthNatalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.generalMonthlyAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.wealthAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.careerMonthlyAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.temporalSegmentationIsWealthInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.exactJeolBoundaryIsWealthInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.internalProductPolicyIsTraditionalSemanticAuthority).toBe(false);
    expect(handoff.authorityBoundary.financialAdviceAuthorized).toBe(false);
    expect(handoff.authorityBoundary.deterministicFinancialEventPredictionAuthorized).toBe(false);
    expect(handoff.prohibitedExtensions).toContain(
      'NO_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_SPECIFIC_FINANCIAL_EVENT_PREDICTION',
    );
    expect(handoff.prohibitedExtensions).toContain('NO_FINANCIAL_ADVICE_AUTHORIZATION');
  });

  it('keeps governance, Engine, Official Reading, and Production fail closed', () => {
    const handoff = buildWealthMonthlyResearchReturnHandoff();

    expect(handoff.deferredGovernance).toContain('REAL_DOMAIN_REVIEW_ATTESTATIONS');
    expect(handoff.deferredGovernance).toContain('INDEPENDENT_REVIEWER_TRUST_GRANTS');
    expect(handoff.deferredGovernance).toContain('ENGINE_AUTHORITY_ADMISSION');
    expect(handoff.authorityBoundary).toEqual(
      expect.objectContaining({
        domainReviewAuthorityEstablished: false,
        trustedDomainAttestationEstablished: false,
        provenanceQualityPromotionAuthorized: false,
        lifecyclePromotionAuthorized: false,
        engineAuthorityPromotionAuthorized: false,
        previewExpansionAuthorized: false,
        officialReadingAuthorityAuthorized: false,
        productionAdmissionAuthority: false,
        production: 'HOLD',
      }),
    );
    expect(handoff.reentryRequirements.sourceCompletionOnlyAuthorizesBridgeRereview).toBe(true);
    expect(handoff.reentryRequirements.highestPermittedFutureReentryState).toBe(
      'READY_FOR_BRIDGE_REREVIEW',
    );
  });

  it('is deterministic for the same governed repository state', () => {
    const left = buildWealthMonthlyResearchReturnHandoff();
    const right = buildWealthMonthlyResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
