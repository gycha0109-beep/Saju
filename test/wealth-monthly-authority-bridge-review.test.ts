import { describe, expect, it } from 'vitest';
import {
  WEALTH_MONTHLY_ACTIVATION_RULES,
  WEALTH_MONTHLY_POLICY_SOURCE,
  WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
  WEALTH_MONTHLY_READING_PACK,
  WEALTH_MONTHLY_TENSION_RULES,
} from '../src/research/wealth-monthly-reading-candidate.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_RULES,
} from '../src/research/wealth-natal-reading-candidate.js';
import { buildWealthMonthlyAuthorityBridgeReview } from '../src/research/wealth-monthly-authority-bridge-review.js';

describe('Wealth Monthly Authority Bridge review', () => {
  it('reviews the exact current Wealth Monthly candidate and reused Wealth Natal research surface', () => {
    const review = buildWealthMonthlyAuthorityBridgeReview();

    expect(WEALTH_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(WEALTH_MONTHLY_READING_PACK.status).toBe('research');
    expect(WEALTH_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(WEALTH_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(review.candidateState.segmentCount).toBe(2);
    expect(review.candidateState.monthlyRuleCount).toBe(28);
    expect(WEALTH_NATAL_READING_CANDIDATE_VERSION).toBe('0.4.0-research');
    expect(WEALTH_NATAL_READING_RULES).toHaveLength(11);
    expect(review.candidateState.reusedNatalRuleCount).toBe(11);
    expect(review.candidateState.allMonthlyRulesResearchOnly).toBe(true);
    expect(review.candidateState.allMonthlyRulesHeuristic).toBe(true);
    expect(review.candidateState.allMonthlyRulesExperimental).toBe(true);
    expect(review.candidateState.allMonthlyRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalRulesUnreviewed).toBe(true);
    expect(review.authorityState.boundedResearchRegistryAvailable).toBe(true);
  });

  it('does not mistake internal policy or exact jeol segmentation for Wealth Monthly authority', () => {
    const review = buildWealthMonthlyAuthorityBridgeReview();

    expect(WEALTH_MONTHLY_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(WEALTH_MONTHLY_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalWealthMonthlyPolicyPresent).toBe(true);
    expect(review.authorityState.exactJeolSegmentationCapabilityPresent).toBe(true);
    expect(review.authorityState.wealthMonthlySpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.wealthMonthlyInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
  });

  it('keeps Monthly facts and Wealth Natal reuse outside Wealth Monthly semantic authority', () => {
    const review = buildWealthMonthlyAuthorityBridgeReview();

    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.targetMonth',
      'temporal.jeolBoundary.at',
      'temporal.segmentsById.*.segmentId',
      'temporal.segmentsById.*.monthlyPillar',
      'temporal.segmentsById.*.monthlyStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.segmentsById.*.monthlyBranchRelations.*.relation',
    ]);
    expect(review.temporalFactBoundary.jeolBoundaryIsSegmentationFactNotWealthAuthority).toBe(true);
    expect(review.temporalFactBoundary.segmentMonthlyPillarIsInputFactNotWealthAuthority).toBe(true);
    expect(review.temporalFactBoundary.segmentMonthlyStemTenGodIsInputFactNotWealthThemeAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.segmentBranchRelationIsInputFactNotFinancialEventAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.wealthNatalResearchReuseIsMonthlyAuthority).toBe(false);
  });

  it('returns the candidate to Research and keeps all governance and production gates closed', () => {
    const review = buildWealthMonthlyAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
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

  it('forbids authority inheritance, jeol-as-authority, deterministic financial outcomes, and advice', () => {
    const review = buildWealthMonthlyAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_WEALTH_NATAL_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_MONTHLY_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_WEALTH_ANNUAL_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_MONTHLY_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_EXACT_JEOL_SEGMENTATION_AS_WEALTH_INTERPRETATION_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_SPECIFIC_FINANCIAL_EVENT_PREDICTION',
    );
    expect(review.prohibitedExtensions).toContain('NO_FINANCIAL_ADVICE_AUTHORIZATION');
  });

  it('is deterministic for the same candidate and evidence surface', () => {
    const left = buildWealthMonthlyAuthorityBridgeReview();
    const right = buildWealthMonthlyAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
