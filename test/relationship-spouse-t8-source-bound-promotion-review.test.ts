import { describe, expect, test } from 'vitest';
import { RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS } from '../src/research/relationship-spouse-t8-promotion-provenance-trust-readiness.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_PROMOTION_CONTROL_IDS,
  buildRelationshipSpouseT8SourceBoundPromotionReview,
} from '../src/research/relationship-spouse-t8-source-bound-promotion-review.js';

describe('Relationship / Spouse T8 source-bound promotion review', () => {
  test('recognizes that source registration and the governed source-tier gate are now satisfied', () => {
    const review = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(review.sourceAuthority.sourceReferenceRegistered).toBe(true);
    expect(review.sourceAuthority.sourceTierAuthorized).toBe(true);
    expect(review.sourceAuthority.promotionProvenanceReady).toBe(true);
    expect(review.sourceAuthority.sourceTiers).toEqual([
      'cross_reference',
      'scholarly_secondary',
    ]);
    expect(RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS).toEqual([
      'primary',
      'scholarly_secondary',
      'cross_reference',
    ]);
  });

  test('does not convert source authority into reviewer authority', () => {
    const review = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(review.reviewerAuthority).toEqual({
      reviewAttestationCount: 0,
      reviewAttestationPresent: false,
      spouseBoundReviewerTrustContextPresent: false,
      trustedReviewerGrantPresent: false,
      trustPinnedAttestationPresent: false,
      reviewerAuthorityReady: false,
    });
    expect(review.blockers).toContain('NO_SPOUSE_BOUND_REVIEW_ATTESTATION');
    expect(review.blockers).toContain('NO_SPOUSE_BOUND_REVIEWER_TRUST_CONTEXT');
    expect(review.blockers).toContain('NO_ACTIVE_TRUST_PINNED_REVIEWER_GRANT');
    expect(review.blockers).toContain('NO_TRUST_PINNED_ATTESTATION_HASH');
  });

  test('preserves research lifecycle and unreviewed/unknown rule quality', () => {
    const review = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(review.lifecycleAndQuality.methodologyStatus).toBe('research');
    expect(review.lifecycleAndQuality.ruleStatuses).toEqual(['research', 'research']);
    expect(review.lifecycleAndQuality.packStatus).toBe('research');
    expect(review.lifecycleAndQuality.ruleReviewerStatuses).toEqual([
      'unreviewed',
      'unreviewed',
    ]);
    expect(review.lifecycleAndQuality.ruleProvenanceQualities).toEqual([
      'unknown',
      'unknown',
    ]);
    expect(review.lifecycleAndQuality.stagingMethodologyLifecycleReady).toBe(false);
    expect(review.lifecycleAndQuality.stagingRuleLifecycleReady).toBe(false);
    expect(review.lifecycleAndQuality.stagingRuleQualityReady).toBe(false);
    expect(review.lifecycleAndQuality.productionLifecycleReady).toBe(false);
    expect(review.lifecycleAndQuality.productionRuleQualityReady).toBe(false);
  });

  test('keeps staging, G2A admission, consumers, Official Reading, and Production closed', () => {
    const review = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(review.readiness).toEqual({
      stagingEligibility: false,
      productionPromotionReady: false,
      g2aAdmitted: false,
      consumerNarrativeActivated: false,
      compatibilityConsumerActivated: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      productionState: 'HOLD',
    });
  });

  test('forbids synthetic authority and automatic promotion', () => {
    const review = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(review.authorityBoundary).toEqual({
      sourceTierInflationAuthorized: false,
      ruleQualityAutoPromotionAuthorized: false,
      reviewerIdentityFabricationAuthorized: false,
      reviewAttestationFabricationAuthorized: false,
      reviewerTrustGrantFabricationAuthorized: false,
      lifecycleAutoPromotionAuthorized: false,
      semanticExpansionAuthorized: false,
    });
  });

  test('locks a deterministic content-addressed review and next action', () => {
    const first = buildRelationshipSpouseT8SourceBoundPromotionReview();
    const second = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(/^[a-f0-9]{64}$/);
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_PROMOTION_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(15);
    expect(first.recommendedNextAction).toBe(
      'OBTAIN_REAL_SPOUSE_BOUND_REVIEW_ATTESTATION_AND_TRUST_PINNED_REVIEW_AUTHORITY_THEN_REVIEW_RULE_QUALITY_AND_LIFECYCLE_SEPARATELY',
    );
  });
});
