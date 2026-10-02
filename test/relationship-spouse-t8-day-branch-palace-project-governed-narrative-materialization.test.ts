import { describe, expect, test } from 'vitest';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { verifyResolvedRegistryContentIntegrity } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIAL_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';
import {
  runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution,
} from '../src/research/relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

const TEST_TIMEOUT_MS = 20_000;

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5m-project-materialization-test',
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
} as const satisfies CalculationPolicySnapshot);

function fixtureSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    CALCULATION_POLICY,
    { now: new Date('2026-10-02T04:10:00.000Z') },
  );
}

function semanticProjection(
  result: ReturnType<typeof runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution>,
) {
  expect(result.integrity).toEqual({ valid: true, errors: [] });

  const claims = result.claims.filter(
    (claim) =>
      claim.claimType === RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );
  expect(claims).toHaveLength(1);
  const claim = claims[0];
  if (claim === undefined) throw new Error('Expected spouse-palace position claim.');

  return {
    taxonomy: claim.taxonomy,
    claimType: claim.claimType,
    subject: claim.subject,
    predicate: claim.predicate,
    value: claim.value,
    polarity: claim.polarity,
    factRefs: claim.factRefs,
    methodologyRef: claim.methodologyRef,
  };
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5M project-governed narrative materialization', () => {
  test('materializes exactly the two internally approved metadata changes', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization();

    expect(result.blockers).toEqual([]);
    expect(result.narrativeMaterializationEstablished).toBe(true);
    expect(result.appliedMutations).toEqual([
      {
        target: 'rule.quality.reviewerStatus',
        from: 'unreviewed',
        to: 'internal_reviewed',
      },
      {
        target: 'claimType.materialForNarrative',
        from: false,
        to: true,
      },
    ]);
    expect(result.nextDisposition).toBe(
      'RUN_SA_5N_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION',
    );
  }, TEST_TIMEOUT_MS);

  test('keeps the historical staging objects unchanged', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
  });

  test('materializes internal_reviewed and narrative materiality only in the new registry variant', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE.quality,
    ).toEqual({
      provenanceQuality: 'multi_source_supported',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'stable_within_method',
      reviewerStatus: 'internal_reviewed',
    });
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIAL_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(true);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
  });

  test('preserves registry integrity and creates a distinct content-addressed registry identity', () => {
    expect(
      verifyResolvedRegistryContentIntegrity(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
      ),
    ).toEqual([]);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.registrySnapshotId,
    ).not.toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.packRef,
    ).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );
  });

  test('preserves exact position-only interpretation semantics after materialization', async () => {
    const snapshot = fixtureSnapshot();
    const beforeExecution =
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
        requestId: 'sa5m-before',
        now: new Date('2026-10-02T04:11:00.000Z'),
      });
    const afterExecution =
      await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
        snapshot,
        {
          requestId: 'sa5m-after',
          now: new Date('2026-10-02T04:11:00.000Z'),
        },
      );

    const before = semanticProjection(beforeExecution);
    const after = semanticProjection(afterExecution);

    expect(after).toEqual(before);
    expect(after).toMatchObject({
      taxonomy: {
        tier: 'T8',
        category: 'relationship',
        subcategory: 'spouse',
      },
      claimType: 'relationship.spouse.traditional_spouse_palace_position',
      value: {
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      },
      polarity: 'neutral',
      factRefs: ['pillars.day'],
    });
  }, TEST_TIMEOUT_MS);

  test('does not create narrative profile, runtime, delivery, preview, official, public, or production authority', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization();

    expect(result.authorityBoundary).toEqual({
      projectGovernedMaterialityDecisionEstablished: true,
      internalReviewStatusMaterialized: true,
      positionOnlyNarrativeMaterialityMaterialized: true,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      claimNarrativeProfileCreated: false,
      narrativeProfileAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  }, TEST_TIMEOUT_MS);

  test('is deterministic for the same current internal-governance state', async () => {
    const first =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization();
    const second =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization();

    expect(first).toEqual(second);
    expect(first.materializationId).toBe(second.materializationId);
    expect(first.materializationId).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.checks).toEqual({
      upstreamDecisionExact: true,
      existingStagingStateExact: true,
      ruleMutationExact: true,
      claimTypeMutationExact: true,
      exactRegistryPreservation: true,
      semanticBoundaryExact: true,
      distinctRegistryIdentity: true,
      registryIntegrityErrors: [],
    });
  }, TEST_TIMEOUT_MS);
});
