import { describe, expect, it } from 'vitest';
import {
  GENERAL_MONTHLY_ACTIVATION_RULES,
  GENERAL_MONTHLY_POLICY_SOURCE,
  GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
  GENERAL_MONTHLY_READING_PACK,
  GENERAL_MONTHLY_TENSION_RULES,
} from '../src/research/general-monthly-reading-candidate.js';
import { buildGeneralMonthlyAuthorityBridgeReview } from '../src/research/general-monthly-authority-bridge-review.js';

describe('General Monthly Authority Bridge review', () => {
  it('reviews the exact current segmented General Monthly research candidate', () => {
    const review = buildGeneralMonthlyAuthorityBridgeReview();

    expect(GENERAL_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(GENERAL_MONTHLY_READING_PACK.status).toBe('research');
    expect(GENERAL_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(GENERAL_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(review.candidateState.segmentCount).toBe(2);
    expect(review.candidateState.ruleCount).toBe(28);
    expect(review.candidateState.allRulesResearchOnly).toBe(true);
    expect(review.candidateState.allRulesHeuristic).toBe(true);
    expect(review.candidateState.allRulesExperimental).toBe(true);
    expect(review.candidateState.allRulesUnreviewed).toBe(true);
  });

  it('does not mistake the internal policy source or exact jeol segmentation for Monthly semantic authority', () => {
    const review = buildGeneralMonthlyAuthorityBridgeReview();

    expect(GENERAL_MONTHLY_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(GENERAL_MONTHLY_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalProductPolicyPresent).toBe(true);
    expect(review.authorityState.exactJeolSegmentationCapabilityPresent).toBe(true);
    expect(review.authorityState.monthlySpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.monthlyInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(
      true,
    );
  });

  it('keeps monthly temporal facts as prerequisites rather than interpretation authority', () => {
    const review = buildGeneralMonthlyAuthorityBridgeReview();

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
    expect(review.temporalFactBoundary.jeolBoundaryIsSegmentationFactNotInterpretationAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.segmentMonthlyPillarIsInputFactNotInterpretationAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.segmentMonthlyStemTenGodIsInputFactNotThemeAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.segmentBranchRelationIsInputFactNotEventAuthority).toBe(true);
    expect(review.temporalFactBoundary.readingProfileCoverageIsSemanticAuthority).toBe(false);
  });

  it('returns the candidate to Research without rejecting the bounded segmented execution surface', () => {
    const review = buildGeneralMonthlyAuthorityBridgeReview();

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

  it('forbids Natal or Annual inheritance and unsupported monthly emphasis shortcuts', () => {
    const review = buildGeneralMonthlyAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain('NO_NATAL_TO_MONTHLY_AUTHORITY_INHERITANCE');
    expect(review.prohibitedExtensions).toContain('NO_ANNUAL_TO_MONTHLY_AUTHORITY_INHERITANCE');
    expect(review.prohibitedExtensions).toContain(
      'NO_INTERNAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_EXACT_JEOL_SEGMENTATION_AS_INTERPRETATION_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BEFORE_AFTER_JEOL_OR_PILLAR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
    );
  });

  it('is deterministic for the same candidate and evidence snapshot', () => {
    const left = buildGeneralMonthlyAuthorityBridgeReview();
    const right = buildGeneralMonthlyAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
