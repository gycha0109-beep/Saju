import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
} from '../src/interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview,
  buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority,
  evaluateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview,
  runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution,
  validateRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority,
  type RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions,
} from '../src/research/relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5i-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: {
    source: 'service-default',
    timeZone: 'Asia/Seoul',
  },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function baseSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-10-01T00:00:00.000Z') },
  );
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5I shadow staging execution review', () => {
  test('creates and validates the exact source-adjudication execution authority for the SA-5H staging registry', () => {
    const authority =
      buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
    const validation =
      validateRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority(
        authority,
      );

    expect(validation).toEqual({ valid: true, blockers: [] });
    expect(authority.authorityRef).toEqual(
      expect.objectContaining({
        id: 'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-execution-authority',
        version: '1.0.0',
      }),
    );
    expect(authority.authorityRef.contentHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(authority.material).toMatchObject({
      authorityClass: 'source_adjudication',
      lifecycleTarget: 'staging',
      capabilityKey: 'relationship:natal:spouse',
      authorizedRegistrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
          .registrySnapshotId,
      sourceAdjudicationAuthorityEstablished: true,
      productionAuthorityAuthorized: false,
    });
    expect(authority.material.authorizedPackRef).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );
  });

  test('rejects a tampered staging execution authority', () => {
    const authority =
      buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
    const tampered = {
      authorityRef: authority.authorityRef,
      material: {
        ...authority.material,
        candidateRef: {
          ...authority.material.candidateRef,
          contentHash: '0'.repeat(64),
        },
      },
    } as typeof authority;

    const validation =
      validateRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority(
        tampered,
      );

    expect(validation.valid).toBe(false);
    expect(validation.blockers).toContain('SA5I_CANDIDATE_REF_DRIFT');
    expect(validation.blockers).toContain(
      'SOURCE_ADJUDICATION_AUTHORITY_HASH_MISMATCH',
    );
    expect(validation.blockers).toContain(
      'SA5I_EXECUTION_AUTHORITY_REF_DRIFT',
    );
  });

  test('runs the staging registry only with the internally owned source-adjudication authority', () => {
    const authority =
      buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
    const result =
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
        baseSnapshot(),
        {
          requestId: 'sa5i-owned-authority',
          now: new Date('2026-10-01T00:01:00.000Z'),
        },
      );

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]?.value).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(result.run.authorizationPolicyVersion).toBe(
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
    );
    expect(result.run.sourceAdjudicationAuthorityRef).toEqual(
      authority.authorityRef,
    );
  });

  test('blocks caller-supplied promotion and reviewer-trust authority', () => {
    expect(() =>
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
        baseSnapshot(),
        {
          promotionAuthorityContext: null,
        } as unknown as RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions,
      ),
    ).toThrow(/may not inject promotion or reviewer-trust authority/u);

    expect(() =>
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
        baseSnapshot(),
        {
          reviewerTrustContext: null,
        } as unknown as RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions,
      ),
    ).toThrow(/may not inject promotion or reviewer-trust authority/u);
  });

  test('completes research-vs-staging semantic parity for all 12 resolved Day Branches', () => {
    const review =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();

    expect(review.resolvedBranchCases).toHaveLength(12);
    expect(review.resolvedBranchCases.every((item) => item.casePass)).toBe(
      true,
    );
    expect(
      review.resolvedBranchCases.every(
        (item) =>
          item.semanticParity &&
          item.exactPositionOnlyClaim &&
          item.stagingDeterministic &&
          item.stagingAuthorizationRecorded &&
          item.lifecycleIdentitySeparated,
      ),
    ).toBe(true);
    expect(new Set(review.resolvedBranchCases.map((item) => item.branch)).size)
      .toBe(12);
  });

  test('keeps ambiguous, unavailable, pending, and missing Day Pillar cases fail-closed across research and staging', () => {
    const review =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();

    expect(review.failClosedCases.map((item) => item.caseId)).toEqual([
      'ambiguous-day-pillar',
      'unavailable-day-pillar',
      'pending-day-pillar',
      'missing-day-pillar',
    ]);
    expect(review.failClosedCases.every((item) => item.casePass)).toBe(true);
    expect(
      review.failClosedCases.every(
        (item) =>
          item.researchClaimCount === 0 &&
          item.stagingClaimCount === 0 &&
          item.semanticParity,
      ),
    ).toBe(true);
  });

  test('keeps the position-only semantic invariant across male, female, and unspecified traditional-sex inputs', () => {
    const review =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();

    expect(review.demographicCases.map((item) => item.sexForTraditionalCalculation))
      .toEqual(['male', 'female', 'unspecified']);
    expect(review.demographicCases.every((item) => item.claimCount === 1)).toBe(
      true,
    );
    expect(
      new Set(review.demographicCases.map((item) => item.semanticHash)).size,
    ).toBe(1);
    expect(review.checks.demographicInputIsolation).toBe(true);
  });

  test('satisfies the shadow-staging gate without expanding reviewer, consumer, Preview, Official, or Production authority', () => {
    const review =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();

    expect(review.blockers).toEqual([]);
    expect(review.requiredShadowStagingEvidenceComplete).toBe(true);
    expect(review.gate14Resolution).toEqual({
      gateId: 'REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE',
      status: 'SATISFIED',
    });
    expect(review.checks).toMatchObject({
      materializationIntegrityValid: true,
      exactMaterializationBinding: true,
      materializationStateValid: true,
      stagingRegistryIntegrityVerified: true,
      stagingAuthorityValidationValid: true,
      exactAuthorityLineage: true,
      allTwelveBranchesPass: true,
      failClosedParity: true,
      demographicInputIsolation: true,
      exactSourceAndQualityBoundary: true,
      legacyV110Isolated: true,
      noConsumerOrProductionExpansion: true,
      registryIntegrityErrors: [],
      stagingAuthorityValidationBlockers: [],
    });
    expect(review.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      sourceAdjudicationAuthorityEstablished: true,
      stagingLifecycleMaterialized: true,
      stagingExecutionAuthorityCreated: true,
      stagingExecutionAuthorized: true,
      shadowExecutionAuthorized: true,
      shadowExecutionCompleted: true,
      humanDomainReviewEstablished: false,
      reviewAttestationCreated: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      narrativeConsumerActivated: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(review.nextDisposition).toBe(
      'RUN_SA_5J_STAGING_CONSUMER_ADMISSION_REVIEW',
    );
    expect(review.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('fails closed when the SA-5H materialization content is changed under a stale identity', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
    const forged = {
      ...current,
      stagingLifecycleMaterializationEstablished: false,
    } as typeof current;

    const review =
      evaluateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview({
        materialization: forged,
      });

    expect(review.checks.materializationIntegrityValid).toBe(false);
    expect(review.checks.exactMaterializationBinding).toBe(false);
    expect(review.checks.materializationStateValid).toBe(false);
    expect(review.requiredShadowStagingEvidenceComplete).toBe(false);
    expect(review.gate14Resolution.status).toBe('BLOCKED');
    expect(review.authorityBoundary.exactCandidateOnly).toBe(false);
  });

  test('is deterministic for the exact same materialization and fixture contract', () => {
    const left =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();
    const right =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.executionAuthorityRef).toEqual(right.executionAuthorityRef);
    expect(
      deterministicContentHash(left.resolvedBranchCases),
    ).toBe(deterministicContentHash(right.resolvedBranchCases));
    expect(deterministicContentHash(left.failClosedCases)).toBe(
      deterministicContentHash(right.failClosedCases),
    );
  });
});
