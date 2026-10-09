import { beforeAll, describe, expect, test } from 'vitest';
import {
  PRODUCT_PREVIEW_READING_HTTP_PATH,
  PRODUCT_READING_PREVIEW_LIFECYCLE,
} from '../src/production-calculation-host.js';
import { PRODUCT_READING_RESPONSE_VERSION } from '../src/reading/product-reading-response.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingDeliveryAuthorityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-official-reading-delivery-authority-review.js';

const SETUP_TIMEOUT_MS = 240_000;

type Result = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceOfficialReadingDeliveryAuthorityReview
  >
>;

describe('SA-5X spouse position-only Official Reading delivery authority review', () => {
  let result: Result;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingDeliveryAuthorityReview();
  }, SETUP_TIMEOUT_MS);

  test('authorizes only the exact bounded Official Reading Preview delivery', () => {
    expect(result.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW_VERSION,
    );
    expect(result.issue).toBe('#2060');
    expect(result.capabilityKey).toBe('relationship:natal:spouse');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.deliveryAuthorityEstablished).toBe(true);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(result.decision).toBe(
      'AUTHORIZE_POSITION_ONLY_OFFICIAL_READING_PREVIEW_DELIVERY',
    );
    expect(result.nextDisposition).toBe(
      'HOLD_POSITION_ONLY_BROADER_AUTHORITY_PENDING_SEPARATE_REVIEW',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('observes the authenticated HTTP boundary and source admission', () => {
    expect(result.httpEvidence).toMatchObject({
      deliveryRoute: PRODUCT_PREVIEW_READING_HTTP_PATH,
      unauthorizedStatus: 401,
      unauthorizedCode: 'HOST_AUTH_REQUIRED',
      previewStatus: 200,
      previewAdmissionHeader: PRODUCT_READING_RESPONSE_VERSION,
      previewLifecycleHeader: PRODUCT_READING_PREVIEW_LIFECYCLE,
      previewState: 'delivered',
      officialReadingIdObserved: true,
      productionStatus: 404,
      productionCode: 'HOST_ROUTE_NOT_FOUND',
    });
    expect(result.checks.serviceBearerBoundaryExact).toBe(true);
    expect(result.checks.responseAdmissionExact).toBe(true);
    expect(result.checks.previewLifecycleExact).toBe(true);
    expect(result.checks.productionRouteClosed).toBe(true);
  });

  test('preserves the position-only meaning and model-free Official Reading path', () => {
    expect(result.checks.officialReadingHttpDeliveryExact).toBe(true);
    expect(result.checks.exactPositionOnlyMeaningPreserved).toBe(true);
    expect(result.checks.prohibitedExpansionAbsent).toBe(true);
    expect(result.checks.modelFreeOfficialExecutionExact).toBe(true);
    expect(result.checks.canonicalFactBindingExact).toBe(true);

    expect(result.upstream.execution.modelCalls).toBe(0);
    expect(result.upstream.execution.narrative).toBeUndefined();
    expect(result.upstream.execution.consumerReadingAuthority?.authority).toBe(
      'official_reading',
    );
  });

  test('keeps every broader authority boundary closed', () => {
    expect(result.checks.protectedAuthorityBoundariesClosed).toBe(true);
    expect(result.authorityBoundary).toEqual({
      exactPositionOnlyOfficialReadingPreviewDeliveryAuthorized: true,
      previewHttpDeliveryAuthorityAuthorized: true,
      serviceBearerProtectedPreviewDelivery: true,
      sourceOwnedResponseAdmissionRequired: true,
      officialReadingPreviewAuthorityAuthorized: true,
      legacyNarrativeRuntimeRequiredForSpouse: false,
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
