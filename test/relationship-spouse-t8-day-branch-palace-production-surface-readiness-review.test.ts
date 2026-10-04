import { beforeAll, describe, expect, test } from 'vitest';
import {
  PREVIEW_E2E_APPROVAL,
} from '../src/preview/preview-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CANDIDATE_PRODUCTION_READING_SECTIONS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceProductionSurfaceReadinessReview,
  isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection,
} from '../src/research/relationship-spouse-t8-day-branch-palace-production-surface-readiness-review.js';

const SETUP_TIMEOUT_MS = 240_000;

type Result = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceProductionSurfaceReadinessReview
  >
>;

describe('SA-5Y spouse position-only Production surface readiness review', () => {
  let result: Result;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceProductionSurfaceReadinessReview();
  }, SETUP_TIMEOUT_MS);

  test('binds exactly to SA-5X and reaches only bounded implementation eligibility', () => {
    expect(result.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW_VERSION,
    );
    expect(result.issue).toBe('#2065');
    expect(result.capabilityKey).toBe('relationship:natal:spouse');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(result.productionSurfaceEligibilityEstablished).toBe(true);
    expect(result.decision).toBe(
      'POSITION_ONLY_PRODUCTION_SURFACE_ELIGIBLE_FOR_BOUNDED_IMPLEMENTATION',
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5Z_POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('keeps the deployed process Preview-only while recognizing the dormant Production transport primitive', () => {
    expect(result.checks.productionTransportPrimitiveAvailable).toBe(true);
    expect(result.checks.deployedProcessStillPreviewOnly).toBe(true);
    expect(result.upstream.httpEvidence.previewStatus).toBe(200);
    expect(result.upstream.httpEvidence.productionStatus).toBe(404);
    expect(result.upstream.httpEvidence.productionCode).toBe(
      'HOST_ROUTE_NOT_FOUND',
    );
    expect(result.candidateProductionSurface.route).toBe('/api/readings');
    expect(result.candidateProductionSurface.requiresDedicatedRuntimeWiring).toBe(
      true,
    );
  });

  test('rejects wholesale Preview-host reuse and defines an exact spouse-only fail-closed candidate allowlist', () => {
    expect(PREVIEW_E2E_APPROVAL.officialReadingSections.length).toBeGreaterThan(
      1,
    );
    expect(result.checks.previewHostContainsBroaderOfficialScope).toBe(true);
    expect(result.checks.previewHostWholesaleReuseRejected).toBe(true);
    expect(result.checks.candidateProductionAllowlistExact).toBe(true);
    expect(result.checks.failClosedSectionBoundaryRepresentable).toBe(true);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CANDIDATE_PRODUCTION_READING_SECTIONS,
    ).toEqual(['relationship:natal:spouse']);
    expect(result.candidateProductionSurface.reusePreviewHostWholesale).toBe(
      false,
    );
    expect(
      isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
        'relationship:natal:spouse',
      ),
    ).toBe(true);
    for (const section of result.nonAuthorizedPreviewSections) {
      expect(
        isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
          section,
        ),
      ).toBe(false);
    }
  });

  test('preserves the exact position-only semantic and model-free Official Reading contract', () => {
    expect(result.checks.upstreamSa5xExact).toBe(true);
    expect(result.checks.exactPositionOnlySemanticPreserved).toBe(true);
    expect(result.checks.canonicalNarrativeContractPresent).toBe(true);
    expect(result.checks.modelFreeOfficialReadingPathPreserved).toBe(true);
    expect(result.semanticContract.summary).toBe(
      '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.',
    );
    expect(result.semanticContract.qualifier).toBe(
      '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.',
    );
    expect(result.upstream.upstream.execution.modelCalls).toBe(0);
    expect(result.upstream.upstream.execution.narrative).toBeUndefined();
  });

  test('separates every broader authority axis and grants no Production authority in SA-5Y', () => {
    expect(result.checks.productOwnedAuthoritiesRemainSeparated).toBe(true);
    expect(result.checks.removedReviewerRequirementsRemainRemoved).toBe(true);
    expect(result.checks.boundedProductionSurfaceRepresentable).toBe(true);
    expect(result.authorityBoundary).toEqual({
      exactPositionOnlySemanticAuthorityPreserved: true,
      previewOfficialReadingAuthorityPreserved: true,
      productionSurfaceEligibilityEstablished: true,
      boundedProductionLaneImplementationAuthorized: true,
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
    expect(result.candidateProductionSurface.persistenceAuthorityIncluded).toBe(
      false,
    );
    expect(result.candidateProductionSurface.publicShareAuthorityIncluded).toBe(
      false,
    );
    expect(
      result.candidateProductionSurface
        .publicGeneralAvailabilityAuthorityIncluded,
    ).toBe(false);
    expect(result.candidateProductionSurface.commerceAuthorityIncluded).toBe(
      false,
    );
  });
});
