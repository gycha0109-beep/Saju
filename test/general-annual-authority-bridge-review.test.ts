import { describe, expect, it } from 'vitest';
import {
  GENERAL_ANNUAL_ACTIVATION_RULES,
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  GENERAL_ANNUAL_READING_PACK,
  GENERAL_ANNUAL_TENSION_RULES,
} from '../src/research/general-annual-reading-candidate.js';
import { buildGeneralAnnualAuthorityBridgeReview } from '../src/research/general-annual-authority-bridge-review.js';

describe('General Annual Authority Bridge review', () => {
  it('reviews the exact current bounded General Annual research candidate', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(GENERAL_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(GENERAL_ANNUAL_READING_PACK.status).toBe('research');
    expect(GENERAL_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(GENERAL_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(review.candidateState.ruleCount).toBe(14);
    expect(review.candidateState.allRulesResearchOnly).toBe(true);
    expect(review.candidateState.allRulesHeuristic).toBe(true);
    expect(review.candidateState.allRulesExperimental).toBe(true);
    expect(review.candidateState.allRulesUnreviewed).toBe(true);
  });

  it('does not mistake the internal policy source for Annual semantic authority', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(GENERAL_ANNUAL_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(GENERAL_ANNUAL_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalProductPolicyPresent).toBe(true);
    expect(review.authorityState.annualSpecificSourceAuthorityEstablished).toBe(false);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(
      true,
    );
  });

  it('keeps temporal facts as prerequisites rather than interpretation authority', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.annualPillar',
      'temporal.annualStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.annualBranchRelations',
    ]);
    expect(review.temporalFactBoundary.annualPillarIsInputFactNotInterpretationAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.annualStemTenGodIsInputFactNotThemeAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualBranchRelationIsInputFactNotEventAuthority).toBe(true);
    expect(review.temporalFactBoundary.readingProfileCoverageIsSemanticAuthority).toBe(false);
  });

  it('returns the candidate to Research without rejecting the bounded execution surface', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
    expect(review.authorityState.engineAuthorityPromotionAuthorized).toBe(false);
    expect(review.authorityState.previewExpansionAuthorized).toBe(false);
    expect(review.authorityState.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityState.productionAdmissionAuthority).toBe(false);
    expect(review.authorityState.production).toBe('HOLD');
  });

  it('forbids Natal inheritance and other temporal or product-policy authority shortcuts', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain('NO_NATAL_TO_ANNUAL_AUTHORITY_INHERITANCE');
    expect(review.prohibitedExtensions).toContain(
      'NO_INTERNAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain('NO_READING_PROFILE_COVERAGE_AS_AUTHORITY');
    expect(review.prohibitedExtensions).toContain('NO_ANNUAL_TO_MONTHLY_AUTHORITY_EXPANSION');
  });

  it('is deterministic for the same candidate and evidence snapshot', () => {
    const left = buildGeneralAnnualAuthorityBridgeReview();
    const right = buildGeneralAnnualAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
