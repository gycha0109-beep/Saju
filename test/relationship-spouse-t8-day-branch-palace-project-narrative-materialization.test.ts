import { beforeAll, describe, expect, test } from 'vitest';
import {
  verifyResolvedRegistryContentIntegrity,
} from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProjectNarrativeMaterialization,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-narrative-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-governed-materiality-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

const TEST_TIMEOUT_MS = 30_000;

describe('Relationship / Spouse T8 Day-Branch spouse-palace project-governed SA-5M materialization', () => {
  let result: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceProjectNarrativeMaterialization
    >
  >;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectNarrativeMaterialization();
  }, TEST_TIMEOUT_MS);

  test('materializes narrative eligibility from the exact internal SA-5L decision', () => {
    expect(result.blockers).toEqual([]);
    expect(result.narrativeMaterialityMaterialized).toBe(true);
    expect(result.materializationId).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.semanticScope).toBe('position_only');
    expect(result.nextDisposition).toBe(
      'RUN_SA_5N_POSITION_ONLY_NARRATIVE_PROFILE_MATERIALIZATION',
    );
    expect(result.checks).toEqual({
      decisionIntegrityValid: true,
      exactDecisionBinding: true,
      exactTargetMutation: true,
      stagingPreStateExact: true,
      exactRuleMutationOnly: true,
      exactClaimMaterialityMutationOnly: true,
      semanticBoundaryExact: true,
      lifecycleAndQualityPreserved: true,
      materializedRegistryExact: true,
    });
  });

  test('applies exactly internal_reviewed and materialForNarrative=true', () => {
    expect(result.appliedMutations).toEqual({
      reviewerStatus: {
        before: 'unreviewed',
        after: 'internal_reviewed',
      },
      materialForNarrative: {
        before: false,
        after: true,
      },
    });

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
        .reviewerStatus,
    ).toBe('internal_reviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(true);

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
        .provenanceQuality,
    ).toBe('multi_source_supported');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
        .testCoverage,
    ).toBe('fixture_matrix');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
        .methodologyStability,
    ).toBe('stable_within_method');
  });

  test('preserves historical staging state and creates a distinct valid registry snapshot', () => {
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
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
        .reviewAttestations,
    ).toEqual([]);

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
        .snapshot.registrySnapshotId,
    ).not.toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    );
    expect(
      verifyResolvedRegistryContentIntegrity(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY,
      ),
    ).toEqual([]);
  });

  test('keeps the meaning strictly position-only', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.output
        .value,
    ).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(result.allowedNarrativeProposition).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(result.prohibitedExtensions).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
    );
    expect(result.prohibitedExtensions).toHaveLength(10);
  });

  test('requires no external review and grants no narrative runtime or delivery authority', () => {
    expect(result.authorityBoundary).toEqual({
      projectGovernedMaterialityDecisionEstablished: true,
      internalReviewStatusMaterialized: true,
      narrativeMaterialityMaterialized: true,
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
  });
});
