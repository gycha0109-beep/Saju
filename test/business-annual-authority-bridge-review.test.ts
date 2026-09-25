import { describe, expect, it } from 'vitest';
import {
  BUSINESS_ANNUAL_ACTIVATION_RULES,
  BUSINESS_ANNUAL_POLICY_SOURCE,
  BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
  BUSINESS_ANNUAL_TENSION_RULES,
} from '../src/research/business-annual-reading-candidate.js';
import {
  BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  BUSINESS_NATAL_READING_RULES,
} from '../src/research/business-natal-reading-candidate.js';
import { buildBusinessAnnualAuthorityBridgeReview } from '../src/research/business-annual-authority-bridge-review.js';

describe('Business Annual Authority Bridge review', () => {
  it('reviews the exact current Business Annual candidate and reused Business Natal research surface', () => {
    const review = buildBusinessAnnualAuthorityBridgeReview();

    expect(BUSINESS_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(BUSINESS_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(BUSINESS_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(review.candidateState.annualRuleCount).toBe(14);
    expect(BUSINESS_NATAL_READING_CANDIDATE_VERSION).toBe('0.8.0-research');
    expect(BUSINESS_NATAL_READING_RULES).toHaveLength(11);
    expect(review.candidateState.declaredNatalSpecialistRuleCount).toBe(11);
    expect(review.candidateState.reusedNatalBusinessRuleCount).toBe(11);
    expect(review.candidateState.packStatus).toBe('research');
    expect(review.candidateState.sharedChannelGatedNatalBusinessRulesPresent).toBe(true);
    expect(review.candidateState.allAnnualRulesResearchOnly).toBe(true);
    expect(review.candidateState.allAnnualRulesHeuristic).toBe(true);
    expect(review.candidateState.allAnnualRulesExperimental).toBe(true);
    expect(review.candidateState.allAnnualRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesUnreviewed).toBe(true);
  });

  it('does not mistake shared-channel gating, internal policy, or temporal facts for Business Annual authority', () => {
    const review = buildBusinessAnnualAuthorityBridgeReview();

    expect(BUSINESS_ANNUAL_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(BUSINESS_ANNUAL_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalBusinessAnnualPolicyPresent).toBe(true);
    expect(review.authorityState.sharedChannelGatedNatalResearchPresent).toBe(true);
    expect(review.authorityState.businessAnnualSpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.businessAnnualInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.annualPillar',
      'temporal.annualStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.annualBranchRelations',
    ]);
    expect(review.temporalFactBoundary.annualPillarIsInputFactNotBusinessAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualStemTenGodIsInputFactNotBusinessThemeAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualBranchRelationIsInputFactNotBusinessEventAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.businessNatalResearchReuseIsAnnualAuthority).toBe(false);
    expect(review.temporalFactBoundary.sharedChannelGateIsAnnualAuthority).toBe(false);
  });

  it('returns the candidate to Research and keeps governance, advice, outcome, and production gates closed', () => {
    const review = buildBusinessAnnualAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
    expect(review.authorityState.financialOrInvestmentAdviceAuthorized).toBe(false);
    expect(review.authorityState.businessOutcomePredictionAuthorized).toBe(false);
    expect(review.authorityState.domainReviewAuthorityEstablished).toBe(false);
    expect(review.authorityState.trustedDomainAttestationEstablished).toBe(false);
    expect(review.authorityState.provenanceQualityPromotionAuthorized).toBe(false);
    expect(review.authorityState.lifecyclePromotionAuthorized).toBe(false);
    expect(review.authorityState.engineAuthorityPromotionAuthorized).toBe(false);
    expect(review.authorityState.previewExpansionAuthorized).toBe(false);
    expect(review.authorityState.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityState.productionAdmissionAuthority).toBe(false);
    expect(review.authorityState.production).toBe('HOLD');
  });

  it('forbids authority inheritance, deterministic business outcomes, and financial advice', () => {
    const review = buildBusinessAnnualAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_BUSINESS_NATAL_TO_BUSINESS_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_ANNUAL_TO_BUSINESS_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_ANNUAL_TO_BUSINESS_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_WEALTH_ANNUAL_TO_BUSINESS_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BUSINESS_ANNUAL_TO_BUSINESS_MONTHLY_AUTHORITY_EXPANSION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_SHARED_CHANNEL_GATE_AS_BUSINESS_ANNUAL_SEMANTIC_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BUSINESS_SUCCESS_FAILURE_REVENUE_PROFIT_FUNDING_INVESTMENT_BANKRUPTCY_PARTNER_BREAKUP_MARKET_EVENT_INDUSTRY_OUTCOME_FOUNDER_SUITABILITY_OR_GUARANTEED_TIMING_PREDICTION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_FINANCIAL_OR_INVESTMENT_ADVICE_AUTHORIZATION',
    );
  });

  it('is deterministic for the same candidate and evidence surface', () => {
    const left = buildBusinessAnnualAuthorityBridgeReview();
    const right = buildBusinessAnnualAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
