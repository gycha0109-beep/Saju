import { beforeAll, describe, expect, test } from 'vitest';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
} from '../src/production/production-spouse-official-reading-candidate-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceBoundedProductionOfficialReadingLaneImplementation,
} from '../src/research/relationship-spouse-t8-day-branch-palace-bounded-production-official-reading-lane-implementation.js';

const SETUP_TIMEOUT_MS = 240_000;

type Result = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceBoundedProductionOfficialReadingLaneImplementation
  >
>;

describe('SA-5Z spouse-only bounded Production Official Reading candidate lane', () => {
  let result: Result;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceBoundedProductionOfficialReadingLaneImplementation();
  }, SETUP_TIMEOUT_MS);

  test('implements only the bounded Production candidate lane authorized by SA-5Y', () => {
    expect(result.implementationVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION_VERSION,
    );
    expect(result.issue).toBe('#2072');
    expect(result.capabilityKey).toBe('relationship:natal:spouse');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.implementationEstablished).toBe(true);
    expect(result.decision).toBe(
      'POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTED',
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5AA_POSITION_ONLY_PRODUCTION_DELIVERY_AUTHORITY_REVIEW',
    );
    expect(result.implementationId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('serves spouse-only Official Reading on the isolated Production candidate route', () => {
    expect(result.checks.serviceBearerBoundaryExact).toBe(true);
    expect(result.checks.spouseHttpDeliveryExact).toBe(true);
    expect(result.checks.productionMeaningExact).toBe(true);
    expect(result.httpEvidence.route).toBe('/api/readings');
    expect(result.httpEvidence.spouseStatus).toBe(200);
    expect(result.httpEvidence.spouseLifecycleHeader).toBeNull();
  });

  test('fails closed for every non-allowlisted request and keeps Preview closed on the candidate server', () => {
    expect(result.checks.nonAllowlistedRequestsFailClosed).toBe(true);
    expect(result.httpEvidence.rejected).toHaveLength(10);
    for (const rejected of result.httpEvidence.rejected) {
      expect(rejected.status).toBe(400);
      expect(rejected.code).toBe('HOST_INVALID_READING_REQUEST');
    }
    expect(result.checks.previewRouteClosedOnCandidate).toBe(true);
    expect(result.httpEvidence.previewStatus).toBe(404);
    expect(result.httpEvidence.previewCode).toBe('HOST_ROUTE_NOT_FOUND');
  });

  test('does not activate /api/readings in the deployed process', () => {
    expect(result.checks.deployedProcessUnchanged).toBe(true);
    expect(result.httpEvidence.deployedProductionStatus).toBe(404);
    expect(result.httpEvidence.deployedProductionCode).toBe(
      'HOST_ROUTE_NOT_FOUND',
    );
  });

  test('uses Production candidate authority and remains model-free with pillars.day as the sole direct fact', () => {
    expect(result.checks.candidateAuthorityExact).toBe(true);
    expect(result.checks.modelFreeOfficialExecutionExact).toBe(true);
    expect(result.checks.candidateProjectionExact).toBe(true);
    expect(result.execution.consumerReadingAuthority?.authorityVersion).toBe(
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
    );
    expect(result.execution.consumerReadingAuthority?.authority).toBe(
      'official_reading',
    );
    expect(result.execution.modelCalls).toBe(0);
    expect(result.execution.narrative).toBeUndefined();
  });

  test('grants no actual Production, persistence, public, or commerce authority', () => {
    expect(result.checks.broaderAuthoritiesClosed).toBe(true);
    expect(result.authorityBoundary).toEqual({
      boundedProductionCandidateLaneImplemented: true,
      productionTransportAuthorityAuthorized: false,
      productionSemanticDeliveryAuthorityAuthorized: false,
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
  });
});
