import { describe, expect, it } from 'vitest';
import { buildWealthAnnualResearchReturnHandoff } from '../src/research/wealth-annual-research-return-handoff.js';

describe('Wealth Annual Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildWealthAnnualResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1554');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact current cumulative Wealth Annual candidate surface', () => {
    const handoff = buildWealthAnnualResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(6);
    expect(handoff.candidateBinding.annualActivationRuleCount).toBe(10);
    expect(handoff.candidateBinding.annualTensionRuleCount).toBe(4);
    expect(handoff.candidateBinding.annualRuleCount).toBe(14);
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
    const handoff = buildWealthAnnualResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'WEALTH_ANNUAL_STEM_TEN_GOD_SEMANTIC_AUTHORITY',
      'WEALTH_ANNUAL_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_AUTHORITY',
      'WEALTH_ANNUAL_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY',
      'WEALTH_ANNUAL_SCOPE_AND_QUALIFIER_CONTRACT',
      'WEALTH_NATAL_GENERAL_ANNUAL_AND_CAREER_ANNUAL_REUSE_BOUNDARY',
      'PRODUCT_POLICY_SEMANTIC_AND_FINANCIAL_ADVICE_SEPARATION',
    ]);
    expect(
      handoff.workstreams.every(
        (workstream) => workstream.owner === 'traditional_saju_research',
      ),
    ).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(true);
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
  });

  it('keeps temporal/domain authority inheritance and financial advice closed', () => {
    const handoff = buildWealthAnnualResearchReturnHandoff();

    expect(handoff.authorityBoundary.wealthNatalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.generalAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.careerAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.wealthAnnualAuthorityExtendsToWealthMonthlyAutomatically).toBe(false);
    expect(handoff.authorityBoundary.temporalFactsAreInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.internalProductPolicyIsTraditionalSemanticAuthority).toBe(false);
    expect(handoff.authorityBoundary.financialAdviceAuthorized).toBe(false);
    expect(handoff.authorityBoundary.deterministicFinancialEventPredictionAuthorized).toBe(false);
    expect(handoff.prohibitedExtensions).toContain(
      'NO_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_SPECIFIC_FINANCIAL_EVENT_PREDICTION',
    );
    expect(handoff.prohibitedExtensions).toContain('NO_FINANCIAL_ADVICE_AUTHORIZATION');
  });

  it('keeps governance, Engine, Official Reading, and Production fail closed', () => {
    const handoff = buildWealthAnnualResearchReturnHandoff();

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
    const left = buildWealthAnnualResearchReturnHandoff();
    const right = buildWealthAnnualResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
