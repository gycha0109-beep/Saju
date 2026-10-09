import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-preview-delivery-authority-review.js';

describe('SA-5U historical spouse Preview delivery authority review', () => {
  test('preserves the exact pre-SA-5W Preview delivery authority decision', async () => {
    const review =
      await buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview();

    expect(review.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION,
    );
    expect(review.issue).toBe('#2032');
    expect(review.capabilityKey).toBe('relationship:natal:spouse');
    expect(review.semanticScope).toBe('position_only');
    expect(review.blockers).toEqual([]);
    expect(review.deliveryAuthorityEstablished).toBe(true);
    expect(review.authorityReviewCompleted).toBe(true);
    expect(review.decision).toBe(
      'AUTHORIZE_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_DELIVERY',
    );
    expect(review.nextDisposition).toBe(
      'RUN_SA_5V_POSITION_ONLY_OFFICIAL_READING_ADMISSION_REVIEW',
    );
    expect(review.historicalDelivery).toMatchObject({
      recordedAtStage: 'SA-5U',
      unauthorizedStatus: 401,
      unauthorizedCode: 'HOST_AUTH_REQUIRED',
      previewStatus: 200,
      previewLifecycle: 'preview',
      previewState: 'delivered',
      readingSection: 'relationship:natal:spouse',
      consumerAuthority: 'legacy_narrative',
      officialReadingIdObserved: false,
      productionStatus: 404,
      productionCode: 'HOST_ROUTE_NOT_FOUND',
    });
    expect(review.historicalDelivery.semanticAdmissionBoundaries).toEqual([
      'POSITION_ONLY',
      'LEGACY_NARRATIVE_PREVIEW_ONLY',
      'NO_OFFICIAL_READING_PROMOTION',
    ]);
    expect(review.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityBoundary.productionAuthorityAuthorized).toBe(false);
  });
});
