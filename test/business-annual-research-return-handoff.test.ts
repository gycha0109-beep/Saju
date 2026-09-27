import { describe, expect, it } from 'vitest';
import { buildBusinessAnnualResearchReturnHandoff } from '../src/research/business-annual-research-return-handoff.js';

describe('Business Annual Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildBusinessAnnualResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1569');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact current cumulative Business Annual candidate surface', () => {
    const handoff = buildBusinessAnnualResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(
      handoff.candidateBinding.methodologies.length,
    );
    expect(handoff.candidateBinding.annualActivationRuleCount).toBe(10);
    expect(handoff.candidateBinding.annualTensionRuleCount).toBe(4);
    expect(handoff.candidateBinding.annualRuleCount).toBe(14);
    expect(handoff.candidateBinding.reusedNatalRuleCount).toBe(11);
    expect(handoff.candidateBinding.ruleCount).toBe(
      handoff.candidateBinding.registryRuleCount,
    );
    expect(handoff.candidateBinding.packRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoff.candidateBinding.methodologies).toHaveLength(
      handoff.candidateBinding.methodologyCount,
    );
    expect(handoff.candidateBinding.rules).toHaveLength(
      handoff.candidateBinding.registryRuleCount,
    );
    expect(handoff.candidateBinding.candidateSurfaceHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('returns six bounded Research workstreams instead of treating candidate semantics as truth', () => {
    const handoff = buildBusinessAnnualResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'BUSINESS_ANNUAL_STEM_TEN_GOD_OPERATING_SEMANTIC_AUTHORITY',
      'BUSINESS_ANNUAL_BRANCH_CLASH_OPERATING_ADJUSTMENT_AUTHORITY',
      'BUSINESS_ANNUAL_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY',
      'BUSINESS_ANNUAL_SCOPE_AND_QUALIFIER_CONTRACT',
      'BUSINESS_NATAL_GENERAL_ANNUAL_CAREER_ANNUAL_WEALTH_ANNUAL_REUSE_BOUNDARY',
      'PRODUCT_POLICY_SEMANTIC_BUSINESS_OUTCOME_AND_FINANCIAL_ADVICE_SEPARATION',
    ]);
    expect(
      handoff.workstreams.every(
        (workstream) => workstream.owner === 'traditional_saju_research',
      ),
    ).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(true);
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
  });

  it('keeps temporal/domain authority inheritance, outcome prediction, and financial advice closed', () => {
    const handoff = buildBusinessAnnualResearchReturnHandoff();

    expect(handoff.authorityBoundary.businessNatalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.generalAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.careerAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.wealthAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(
      handoff.authorityBoundary.businessAnnualAuthorityExtendsToBusinessMonthlyAutomatically,
    ).toBe(false);
    expect(handoff.authorityBoundary.temporalFactsAreInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.internalProductPolicyIsTraditionalSemanticAuthority).toBe(
      false,
    );
    expect(handoff.authorityBoundary.financialOrInvestmentAdviceAuthorized).toBe(false);
    expect(handoff.authorityBoundary.businessOutcomePredictionAuthorized).toBe(false);
    expect(handoff.prohibitedExtensions).toContain(
      'NO_BUSINESS_SUCCESS_FAILURE_REVENUE_PROFIT_FUNDING_INVESTMENT_BANKRUPTCY_PARTNER_BREAKUP_MARKET_EVENT_INDUSTRY_OUTCOME_FOUNDER_SUITABILITY_OR_GUARANTEED_TIMING_PREDICTION',
    );
    expect(handoff.prohibitedExtensions).toContain(
      'NO_FINANCIAL_OR_INVESTMENT_ADVICE_AUTHORIZATION',
    );
  });

  it('keeps governance, Engine, Official Reading, and Production fail closed', () => {
    const handoff = buildBusinessAnnualResearchReturnHandoff();

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
    const left = buildBusinessAnnualResearchReturnHandoff();
    const right = buildBusinessAnnualResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
