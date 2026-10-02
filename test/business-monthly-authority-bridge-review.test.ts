import { describe, expect, it } from 'vitest';
import {
  BUSINESS_MONTHLY_ACTIVATION_RULES,
  BUSINESS_MONTHLY_POLICY_SOURCE,
  BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
  BUSINESS_MONTHLY_TENSION_RULES,
} from '../src/research/business-monthly-reading-candidate.js';
import {
  BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  BUSINESS_NATAL_READING_RULES,
} from '../src/research/business-natal-reading-candidate.js';
import { buildBusinessMonthlyAuthorityBridgeReview } from '../src/research/business-monthly-authority-bridge-review.js';

describe('Business Monthly Authority Bridge review', () => {
  it('reviews the exact current Business Monthly candidate and reused Business Natal research surface', () => {
    const review = buildBusinessMonthlyAuthorityBridgeReview();

    expect(BUSINESS_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(BUSINESS_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(BUSINESS_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(review.candidateState.segmentCount).toBe(2);
    expect(review.candidateState.monthlyRuleCount).toBe(28);
    expect(BUSINESS_NATAL_READING_CANDIDATE_VERSION).toBe('0.8.0-research');
    expect(BUSINESS_NATAL_READING_RULES).toHaveLength(11);
    expect(review.candidateState.declaredNatalSpecialistRuleCount).toBe(11);
    expect(review.candidateState.reusedNatalBusinessRuleCount).toBe(11);
    expect(review.candidateState.packStatus).toBe('research');
    expect(review.candidateState.sharedChannelGatedNatalBusinessRulesPresent).toBe(true);
    expect(review.candidateState.allMonthlyRulesResearchOnly).toBe(true);
    expect(review.candidateState.allMonthlyRulesHeuristic).toBe(true);
    expect(review.candidateState.allMonthlyRulesExperimental).toBe(true);
    expect(review.candidateState.allMonthlyRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalBusinessRulesUnreviewed).toBe(true);
  });

  it('does not mistake shared-channel gating, internal policy, or exact jeol segmentation for Business Monthly authority', () => {
    const review = buildBusinessMonthlyAuthorityBridgeReview();

    expect(BUSINESS_MONTHLY_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(BUSINESS_MONTHLY_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalBusinessMonthlyPolicyPresent).toBe(true);
    expect(review.authorityState.exactJeolSegmentationCapabilityPresent).toBe(true);
    expect(review.authorityState.sharedChannelGatedNatalResearchPresent).toBe(true);
    expect(review.authorityState.businessMonthlySpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.businessMonthlyInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
  });

  it('keeps Monthly facts, Business Natal reuse, and shared-channel gating outside Monthly semantic authority', () => {
    const review = buildBusinessMonthlyAuthorityBridgeReview();

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
    expect(review.temporalFactBoundary.jeolBoundaryIsSegmentationFactNotBusinessAuthority).toBe(true);
    expect(review.temporalFactBoundary.segmentMonthlyPillarIsInputFactNotBusinessAuthority).toBe(true);
    expect(
      review.temporalFactBoundary.segmentMonthlyStemTenGodIsInputFactNotBusinessThemeAuthority,
    ).toBe(true);
    expect(
      review.temporalFactBoundary.segmentBranchRelationIsInputFactNotBusinessEventAuthority,
    ).toBe(true);
    expect(review.temporalFactBoundary.businessNatalResearchReuseIsMonthlyAuthority).toBe(false);
    expect(review.temporalFactBoundary.sharedChannelGateIsMonthlyAuthority).toBe(false);
  });

  it('returns the candidate to Research and keeps governance, advice, outcome, and production gates closed', () => {
    const review = buildBusinessMonthlyAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
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

  it('forbids authority inheritance, jeol-as-authority, deterministic business outcomes, and advice', () => {
    const review = buildBusinessMonthlyAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_BUSINESS_NATAL_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_MONTHLY_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_MONTHLY_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_WEALTH_MONTHLY_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BUSINESS_ANNUAL_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_SHARED_CHANNEL_GATE_AS_BUSINESS_MONTHLY_SEMANTIC_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_EXACT_JEOL_SEGMENTATION_AS_BUSINESS_INTERPRETATION_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BUSINESS_SUCCESS_FAILURE_REVENUE_PROFIT_FUNDING_INVESTMENT_BANKRUPTCY_PARTNER_BREAKUP_MARKET_EVENT_INDUSTRY_OUTCOME_FOUNDER_SUITABILITY_OR_GUARANTEED_TIMING_PREDICTION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_FINANCIAL_OR_INVESTMENT_ADVICE_AUTHORIZATION',
    );
  });

  it('is deterministic for the same candidate and evidence surface', () => {
    const left = buildBusinessMonthlyAuthorityBridgeReview();
    const right = buildBusinessMonthlyAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
