import { beforeAll, describe, expect, test } from 'vitest';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
} from '../src/production/production-spouse-official-reading-delivery-authority.js';
import {
  PRODUCT_READING_PREVIEW_LIFECYCLE,
} from '../src/production-calculation-host.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationImplementation,
} from '../src/research/relationship-spouse-t8-day-branch-palace-production-delivery-activation-implementation.js';

const SETUP_TIMEOUT_MS = 240_000;

type Result = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationImplementation
  >
>;

describe('SA-5AB spouse position-only Production delivery activation', () => {
  let result: Result;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationImplementation();
  }, SETUP_TIMEOUT_MS);

  test('activates the exact bounded Production spouse lane authorized by SA-5AA', () => {
    expect(result.implementationVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION_VERSION,
    );
    expect(result.issue).toBe('#2091');
    expect(result.capabilityKey).toBe('relationship:natal:spouse');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.activationImplemented).toBe(true);
    expect(result.decision).toBe(
      'POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTED',
    );
    expect(result.nextDisposition).toBe(
      'CLOSE_SPOUSE_POSITION_ONLY_PRODUCTION_VERTICAL_SLICE_AND_RETURN_TO_ENGINE_COMPLETION',
    );
    expect(result.implementationId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('serves /api/readings on the actual deployed process with Production lifecycle semantics', () => {
    expect(result.checks.serviceBearerBoundaryExact).toBe(true);
    expect(result.checks.productionHttpDeliveryActive).toBe(true);
    expect(result.httpEvidence.productionRoute).toBe('/api/readings');
    expect(result.httpEvidence.productionStatus).toBe(200);
    expect(result.httpEvidence.productionLifecycleHeader).toBeNull();
  });

  test('preserves Preview and calculation routes in the same deployed process', () => {
    expect(result.checks.previewLanePreserved).toBe(true);
    expect(result.httpEvidence.previewStatus).toBe(200);
    expect(result.httpEvidence.previewLifecycleHeader).toBe(
      PRODUCT_READING_PREVIEW_LIFECYCLE,
    );
    expect(result.checks.calculationLanePreserved).toBe(true);
    expect(result.httpEvidence.calculationStatus).toBe(400);
    expect(result.httpEvidence.calculationCode).toBe('HOST_INVALID_JSON');
  });

  test('fails closed for every non-allowlisted Production reading request', () => {
    expect(result.checks.nonAllowlistedProductionFailClosed).toBe(true);
    expect(result.httpEvidence.rejected).toHaveLength(10);
    for (const rejected of result.httpEvidence.rejected) {
      expect(rejected.status).toBe(400);
      expect(rejected.code).toBe('HOST_INVALID_READING_REQUEST');
    }
  });

  test('preserves exact position-only meaning and model-free pillars.day execution', () => {
    expect(result.checks.exactPositionOnlyMeaningPreserved).toBe(true);
    expect(result.checks.modelFreeOfficialExecutionExact).toBe(true);
    expect(result.checks.activeProjectionExact).toBe(true);
    expect(result.execution.consumerReadingAuthority?.authorityVersion).toBe(
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
    );
    expect(result.execution.consumerReadingAuthority?.authority).toBe(
      'official_reading',
    );
    expect(result.execution.modelCalls).toBe(0);
    expect(result.execution.narrative).toBeUndefined();
  });

  test('keeps every non-spouse and product-owned broader authority closed', () => {
    expect(result.checks.protectedAuthoritiesRemainClosed).toBe(true);
    expect(result.authorityBoundary).toEqual({
      spousePositionOnlyProductionTransportAuthorityActive: true,
      spousePositionOnlyProductionSemanticDeliveryAuthorityActive: true,
      nonSpouseProductionSemanticAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'ACTIVE_BOUNDED',
    });
  });
});
