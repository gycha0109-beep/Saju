import { beforeAll, describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationAuthorityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-production-delivery-activation-authority-review.js';

const SETUP_TIMEOUT_MS = 240_000;

type Result = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationAuthorityReview
  >
>;

describe('SA-5AA spouse position-only Production delivery activation authority review', () => {
  let result: Result;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationAuthorityReview();
  }, SETUP_TIMEOUT_MS);

  test('binds exactly to SA-5Z and authorizes only activation implementation', () => {
    expect(result.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW_VERSION,
    );
    expect(result.issue).toBe('#2082');
    expect(result.capabilityKey).toBe('relationship:natal:spouse');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(
      result.productionDeliveryActivationEligibilityEstablished,
    ).toBe(true);
    expect(result.decision).toBe(
      'AUTHORIZE_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION',
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5AB_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('proves the bounded spouse-only transport and fail-closed boundary', () => {
    expect(result.checks.candidateAuthorityStillBounded).toBe(true);
    expect(result.checks.failClosedBoundaryProven).toBe(true);
    expect(result.checks.authenticatedProductionTransportProven).toBe(true);
    expect(result.activationConstraints.allowedReadingSections).toEqual([
      'relationship:natal:spouse',
    ]);
    expect(result.activationConstraints.targetPersonRefAllowed).toBe(false);
    expect(result.activationConstraints.nonAllowlistedSectionsFailClosed).toBe(
      true,
    );
  });

  test('proves exact position-only semantics and model-free Official Reading', () => {
    expect(result.checks.exactPositionOnlySemanticDeliveryProven).toBe(true);
    expect(result.checks.modelFreeOfficialReadingProven).toBe(true);
    expect(result.activationConstraints.directFactRefs).toEqual([
      'pillars.day',
    ]);
    expect(result.activationConstraints.maximumModelCalls).toBe(0);
    expect(result.activationConstraints.legacyNarrativeRuntimeAllowed).toBe(
      false,
    );
    expect(result.upstream.execution.modelCalls).toBe(0);
    expect(result.upstream.execution.narrative).toBeUndefined();
  });

  test('keeps current deployed Production route inactive during the review', () => {
    expect(result.checks.deployedProcessStillInactive).toBe(true);
    expect(result.checks.previewAndProductionSurfacesRemainSeparated).toBe(
      true,
    );
    expect(result.upstream.httpEvidence.deployedProductionStatus).toBe(404);
    expect(result.upstream.httpEvidence.deployedProductionCode).toBe(
      'HOST_ROUTE_NOT_FOUND',
    );
  });

  test('separates implementation authorization from active authority and product-owned authorities', () => {
    expect(result.checks.protectedProductAuthoritiesRemainClosed).toBe(true);
    expect(
      result.checks.activeProductionAuthorityStillClosedBeforeActivation,
    ).toBe(true);
    expect(result.checks.removedReviewerRequirementsRemainRemoved).toBe(true);
    expect(result.authorityBoundary).toEqual({
      exactPositionOnlyProductionDeliveryCandidateValidated: true,
      productionTransportActivationImplementationAuthorized: true,
      productionSemanticDeliveryActivationImplementationAuthorized: true,
      productionTransportAuthorityActive: false,
      productionSemanticDeliveryAuthorityActive: false,
      publicSemanticAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
    expect(result.activationConstraints.persistenceIncluded).toBe(false);
    expect(result.activationConstraints.publicShareIncluded).toBe(false);
    expect(result.activationConstraints.publicGeneralAvailabilityIncluded).toBe(
      false,
    );
    expect(result.activationConstraints.commerceIncluded).toBe(false);
  });
});
