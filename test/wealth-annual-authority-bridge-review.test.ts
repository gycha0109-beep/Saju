import { describe, expect, it } from 'vitest';
import {
  WEALTH_ANNUAL_ACTIVATION_RULES,
  WEALTH_ANNUAL_POLICY_SOURCE,
  WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
  WEALTH_ANNUAL_READING_PACK,
  WEALTH_ANNUAL_TENSION_RULES,
} from '../src/research/wealth-annual-reading-candidate.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_RULES,
} from '../src/research/wealth-natal-reading-candidate.js';
import { buildWealthAnnualAuthorityBridgeReview } from '../src/research/wealth-annual-authority-bridge-review.js';

describe('Wealth Annual Authority Bridge review', () => {
  it('reviews the exact current Wealth Annual candidate and reused Wealth Natal research surface', () => {
    const review = buildWealthAnnualAuthorityBridgeReview();

    expect(WEALTH_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(WEALTH_ANNUAL_READING_PACK.status).toBe('research');
    expect(WEALTH_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(WEALTH_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(review.candidateState.annualRuleCount).toBe(14);
    expect(WEALTH_NATAL_READING_CANDIDATE_VERSION).toBe('0.4.0-research');
    expect(WEALTH_NATAL_READING_RULES).toHaveLength(11);
    expect(review.candidateState.reusedNatalRuleCount).toBe(11);
    expect(review.candidateState.allAnnualRulesResearchOnly).toBe(true);
    expect(review.candidateState.allAnnualRulesHeuristic).toBe(true);
    expect(review.candidateState.allAnnualRulesExperimental).toBe(true);
    expect(review.candidateState.allAnnualRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalRulesUnreviewed).toBe(true);
    expect(review.authorityState.boundedResearchRegistryAvailable).toBe(true);
  });

  it('does not mistake internal Wealth policy or temporal facts for semantic authority', () => {
    const review = buildWealthAnnualAuthorityBridgeReview();

    expect(WEALTH_ANNUAL_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(WEALTH_ANNUAL_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalWealthAnnualPolicyPresent).toBe(true);
    expect(review.authorityState.wealthAnnualSpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.wealthAnnualInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.annualPillar',
      'temporal.annualStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.annualBranchRelations',
    ]);
    expect(review.temporalFactBoundary.annualPillarIsInputFactNotWealthAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualStemTenGodIsInputFactNotWealthThemeAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualBranchRelationIsInputFactNotFinancialEventAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.wealthNatalResearchReuseIsAnnualAuthority).toBe(false);
  });

  it('returns the candidate to Research and keeps all governance and production gates closed', () => {
    const review = buildWealthAnnualAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
    expect(review.authorityState.financialAdviceAuthorized).toBe(false);
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

  it('forbids temporal/domain inheritance, deterministic financial outcomes, and financial advice', () => {
    const review = buildWealthAnnualAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_WEALTH_NATAL_TO_WEALTH_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_ANNUAL_TO_WEALTH_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_ANNUAL_TO_WEALTH_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_WEALTH_ANNUAL_TO_WEALTH_MONTHLY_AUTHORITY_EXPANSION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_SPECIFIC_FINANCIAL_EVENT_PREDICTION',
    );
    expect(review.prohibitedExtensions).toContain('NO_FINANCIAL_ADVICE_AUTHORIZATION');
  });

  it('is deterministic for the same candidate and evidence surface', () => {
    const left = buildWealthAnnualAuthorityBridgeReview();
    const right = buildWealthAnnualAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
