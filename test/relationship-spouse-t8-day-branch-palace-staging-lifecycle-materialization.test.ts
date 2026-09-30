import { describe, expect, test } from 'vitest';
import {
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
} from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-governance-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization,
  buildRelationshipSpouseT8DayBranchPalaceStagingRegistryRef,
  evaluateRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5H staging lifecycle materialization', () => {
  test('materializes the exact SA-5G-approved 2.0.0 candidate into a separate staging lifecycle surface', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(result.issue).toBe('#1901');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.blockers).toEqual([]);
    expect(result.stagingLifecycleMaterializationEstablished).toBe(true);
    expect(result.materializationRef).toEqual(
      expect.objectContaining({
        id: 'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-lifecycle-materialization',
        version: '1.0.0',
      }),
    );
    expect(result.materializationRef?.contentHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.stagingRegistryRef).toEqual(
      buildRelationshipSpouseT8DayBranchPalaceStagingRegistryRef(),
    );
    expect(result.stagingRegistrySnapshotId).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    );
    expect(result.stagingPackRef).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5I_ISOLATED_SHADOW_STAGING_EXECUTION_REVIEW',
    );
  });

  test('changes only the declared lifecycle fields on methodology, rule, and pack', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(result.checks.methodologyNonLifecycleParity).toBe(true);
    expect(result.checks.ruleNonLifecycleParity).toBe(true);
    expect(result.checks.packNonLifecycleParity).toBe(true);
    expect(result.checks.lifecycleMutationExact).toBe(true);

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status,
    ).toBe('research');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY.status,
    ).toBe('reviewed');

    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status).toBe(
      'research',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.status).toBe(
      'reviewed',
    );

    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status).toBe(
      'research',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK.status).toBe(
      'staging',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK.packId).not.toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.packId,
    );
  });

  test('preserves the exact position-only semantic, source pair, and quality metadata', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(result.checks.exactSourceManifestPreserved).toBe(true);
    expect(result.checks.exactClaimContractPreserved).toBe(true);
    expect(result.checks.exactQualityAuthorityPreserved).toBe(true);
    expect(result.checks.exactPositionOnlySemanticPreserved).toBe(true);

    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources)
      .toHaveLength(2);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality,
    ).toEqual(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .provenanceQuality,
    ).toBe('multi_source_supported');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value,
    ).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
  });

  test('keeps zero trusted review authority and does not create staging execution authority', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
    expect(result.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      sourceAdjudicationAuthorityEstablished: true,
      stagingLifecycleMaterialized: true,
      stagingRegistryMaterialized: true,
      stagingLifecycleMutationApplied: true,
      humanDomainReviewEstablished: false,
      reviewAttestationCreated: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      stagingExecutionAuthorityCreated: false,
      stagingExecutionAuthorized: false,
      shadowExecutionAuthorized: false,
      narrativeConsumerActivated: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('preserves the research candidate unchanged and independently addressable', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(result.checks.researchCandidatePreserved).toBe(true);
    expect(
      verifyResolvedRegistryContentIntegrity(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
      ),
    ).toEqual([]);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .registrySnapshotId,
    ).toBe(result.researchRegistrySnapshotId);
    expect(result.researchRegistrySnapshotId).not.toBe(
      result.stagingRegistrySnapshotId,
    );
    expect(result.researchPackRef).not.toEqual(result.stagingPackRef);
  });

  test('materializes a content-integrity-valid staging registry', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(result.checks.stagingRegistryIntegrityVerified).toBe(true);
    expect(result.checks.stagingRegistryIntegrityErrors).toEqual([]);
    expect(
      verifyResolvedRegistryContentIntegrity(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
      ),
    ).toEqual([]);
  });

  test('fails closed when the SA-5G decision content changes while a stale decisionId is retained', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();
    const forged = {
      ...current,
      sourceAdjudicationAuthorityEstablished: false,
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization({
        governanceDecision: forged,
      });

    expect(result.checks.governanceDecisionIntegrityValid).toBe(false);
    expect(result.checks.exactGovernanceDecisionBinding).toBe(false);
    expect(result.stagingLifecycleMaterializationEstablished).toBe(false);
    expect(result.materializationRef).toBeUndefined();
    expect(result.nextDisposition).toBe(
      'HOLD_AND_REPAIR_SA_5H_STAGING_LIFECYCLE_MATERIALIZATION',
    );
  });

  test('fails closed when the exact SA-5G decision identity drifts', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();
    const drifted = {
      ...current,
      decisionId: '0'.repeat(64),
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization({
        governanceDecision: drifted,
      });

    expect(result.checks.governanceDecisionIntegrityValid).toBe(false);
    expect(result.checks.exactGovernanceDecisionBinding).toBe(false);
    expect(result.materializationRef).toBeUndefined();
  });

  test('fails closed when the source-adjudication governance authority is no longer established', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();
    const { decisionId: _currentDecisionId, ...currentMaterial } = current;
    expect(_currentDecisionId).toBe(current.decisionId);
    const driftedMaterial = {
      ...currentMaterial,
      sourceAdjudicationAuthorityEstablished: false,
    };
    const drifted = {
      decisionId: deterministicContentHash(driftedMaterial),
      ...driftedMaterial,
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization({
        governanceDecision: drifted,
      });

    expect(result.checks.governanceDecisionIntegrityValid).toBe(true);
    expect(result.checks.exactGovernanceDecisionBinding).toBe(false);
    expect(result.checks.governanceAuthorityValid).toBe(false);
    expect(result.stagingLifecycleMaterializationEstablished).toBe(false);
    expect(result.materializationRef).toBeUndefined();
    expect(result.authorityBoundary.exactCandidateOnly).toBe(false);
  });

  test('is deterministic for the exact same governance decision and materialized staging surface', () => {
    const left =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
    const right =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

    expect(left.materializationRef).toEqual(right.materializationRef);
    expect(left.materializationId).toBe(right.materializationId);
    expect(left.stagingRegistryRef).toEqual(right.stagingRegistryRef);
    expect(left.stagingRegistrySnapshotId).toBe(
      right.stagingRegistrySnapshotId,
    );
    expect(left.materializationId).toMatch(/^[a-f0-9]{64}$/u);
  });
});
