import { beforeAll, describe, expect, test } from 'vitest';
import {
  PRODUCT_PREVIEW_READING_HTTP_PATH,
  PRODUCT_READING_PREVIEW_LIFECYCLE,
} from '../src/production-calculation-host.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-preview-delivery-authority-review.js';

const SETUP_TIMEOUT_MS = 120_000;

type Review = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview
  >
>;

describe('SA-5U spouse position-only Preview delivery authority review', () => {
  let review: Review;

  beforeAll(async () => {
    review =
      await buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview();
  }, SETUP_TIMEOUT_MS);

  test('authorizes only the exact legacy Narrative Preview delivery capability', () => {
    expect(review.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION,
    );
    expect(review.issue).toBe('#2032');
    expect(review.capabilityKey).toBe('relationship:natal:spouse');
    expect(review.claimType).toBe(
      'relationship.spouse.traditional_spouse_palace_position',
    );
    expect(review.semanticScope).toBe('position_only');
    expect(review.deliveryRoute).toBe(PRODUCT_PREVIEW_READING_HTTP_PATH);
    expect(review.blockers).toEqual([]);
    expect(review.deliveryAuthorityEstablished).toBe(true);
    expect(review.authorityReviewCompleted).toBe(true);
    expect(review.decision).toBe(
      'AUTHORIZE_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_DELIVERY',
    );
    expect(review.nextDisposition).toBe(
      'RUN_SA_5V_POSITION_ONLY_OFFICIAL_READING_ADMISSION_REVIEW',
    );
    expect(review.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('proves the real Preview HTTP delivery boundary is authenticated and admitted', () => {
    expect(review.checks.serviceBearerBoundaryExact).toBe(true);
    expect(review.checks.responseAdmissionAndLifecycleExact).toBe(true);
    expect(review.http.unauthorizedStatus).toBe(401);
    expect(review.http.unauthorizedPayload.error?.code).toBe(
      'HOST_AUTH_REQUIRED',
    );
    expect(review.http.previewStatus).toBe(200);
    expect(review.http.previewLifecycleHeader).toBe(
      PRODUCT_READING_PREVIEW_LIFECYCLE,
    );
    expect(review.http.previewPayload.state).toBe('delivered');
    expect(review.http.previewPayload.messageCode).toBe('READING_DELIVERED');
  });

  test('delivers only the exact spouse-palace position meaning and qualifier', () => {
    expect(review.checks.exactPositionOnlyDeliveryObserved).toBe(true);
    const encoded = JSON.stringify(review.http.previewPayload);

    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    expect(encoded).not.toContain('"readingId":"official_reading_');

    for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
      expect(encoded).not.toContain(phrase);
    }
  });

  test('keeps Official Reading and the Production route closed', () => {
    expect(review.checks.upstreamRemediationExact).toBe(true);
    expect(review.checks.legacyNarrativeAuthorityExact).toBe(true);
    expect(review.checks.semanticAdmissionExact).toBe(true);
    expect(review.checks.productionRouteClosed).toBe(true);
    expect(review.checks.protectedAuthorityBoundariesClosed).toBe(true);

    expect(review.authority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(review.authority.supportedOfficialReadingSection).toBeUndefined();
    expect(review.http.productionStatus).toBe(404);
    expect(review.http.productionPayload.error?.code).toBe(
      'HOST_ROUTE_NOT_FOUND',
    );
  });

  test('preserves every broader authority boundary as closed', () => {
    expect(review.authorityBoundary).toEqual({
      exactPositionOnlyPreviewDeliveryAuthorized: true,
      previewHttpDeliveryAuthorityAuthorized: true,
      serviceBearerProtectedPreviewDelivery: true,
      sourceOwnedResponseAdmissionRequired: true,
      legacyNarrativePreviewLaneAuthorized: true,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
  });
});
