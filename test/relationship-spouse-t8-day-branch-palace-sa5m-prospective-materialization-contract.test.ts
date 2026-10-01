import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract,
} from '../src/research/relationship-spouse-t8-day-branch-palace-sa5m-prospective-materialization-contract.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

const TEST_TIMEOUT_MS = 20_000;

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5M prospective materialization contract', () => {
  test('freezes the future materialization rules while current external review remains absent', async () => {
    const contract =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract();

    expect(contract.contractId).toMatch(/^[a-f0-9]{64}$/u);
    expect(contract.blockers).toEqual([]);
    expect(contract.prospectiveMaterializationRulesFrozen).toBe(true);
    expect(contract.currentState).toEqual({
      externalHumanDomainSubmissionPresent: false,
      externalHumanDomainSubmissionValidated: false,
      materializationRecordPresent: false,
      authorityMaterialized: false,
    });
    expect(contract.nextDisposition).toBe(
      'AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_THEN_RUN_SEPARATE_SA_5M_MATERIALIZATION_RECORD_REVIEW',
    );
  }, TEST_TIMEOUT_MS);

  test('allows exactly three prospective mutation candidates and authorizes none of them', async () => {
    const contract =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract();

    expect(contract.prospectiveMutationPlan.mutationIds).toEqual([
      'REGISTER_EXACT_TWO_APPROVED_DOMAIN_REVIEW_ATTESTATIONS',
      'PROMOTE_RULE_REVIEWER_STATUS_UNREVIEWED_TO_DOMAIN_REVIEWED',
      'ENABLE_EXACT_POSITION_ONLY_CLAIM_MATERIAL_FOR_NARRATIVE',
    ]);
    expect(contract.prospectiveMutationPlan.mutationCount).toBe(3);

    expect(
      contract.prospectiveMutationPlan.reviewAttestationRegistration,
    ).toEqual(
      expect.objectContaining({
        currentCount: 0,
        targetCountIfLaterAuthorized: 2,
        mustBeExternallySupplied: true,
        exactAttestationHashPinRequired: true,
        authorizedByThisContract: false,
      }),
    );
    expect(contract.prospectiveMutationPlan.reviewerStatus).toEqual({
      current: 'unreviewed',
      targetIfLaterAuthorized: 'domain_reviewed',
      authorizedByThisContract: false,
    });
    expect(contract.prospectiveMutationPlan.narrativeMateriality).toEqual(
      expect.objectContaining({
        claimType: 'relationship.spouse.traditional_spouse_palace_position',
        currentMaterialForNarrative: false,
        targetMaterialForNarrativeIfLaterAuthorized: true,
        semanticScope: 'position_only',
        authorizedByThisContract: false,
      }),
    );
    expect(
      contract.prospectiveMutationPlan.narrativeMateriality.prohibitedExtensions,
    ).toEqual([
      'spouse_star_selection',
      'partner_personality',
      'partner_identity',
      'marriage_timing',
      'marriage_outcome',
      'relationship_outcome',
      'favorable_unfavorable_palace_judgment',
      'yongshin_jisin_semantics',
      'second_chart_compatibility',
      'sex_scoped_spouse_role_expansion',
    ]);
  }, TEST_TIMEOUT_MS);

  test('preserves the exact staging lifecycle and current quality authority', async () => {
    const contract =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract();

    expect(contract.prospectiveMutationPlan.preservedAuthority).toEqual({
      methodologyLifecycle: 'reviewed',
      ruleLifecycle: 'reviewed',
      packLifecycle: 'staging',
      provenanceQuality: 'multi_source_supported',
    });
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY.status,
    ).toBe('reviewed');
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.status).toBe(
      'reviewed',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK.status).toBe(
      'staging',
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);
  }, TEST_TIMEOUT_MS);

  test('keeps all authority materialization and delivery surfaces fail-closed', async () => {
    const contract =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract();

    expect(contract.authorityBoundary).toEqual({
      prospectiveContractEstablished: true,
      syntheticFixtureMaySatisfyAuthority: false,
      repositoryControlledDataMayCreateReviewAttestation: false,
      reviewerTrustContextCreationAuthorized: false,
      reviewerTrustGrantCreationAuthorized: false,
      reviewAttestationRegistrationAuthorized: false,
      reviewerStatusPromotionAuthorized: false,
      materialForNarrativeMutationAuthorized: false,
      humanDomainReviewMaterialized: false,
      narrativeMaterialityDecisionMaterialized: false,
      claimNarrativeProfileCreationAuthorized: false,
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

  test('is deterministic for the unchanged current HOLD state', async () => {
    const first =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract();
    const second =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract();

    expect(first).toEqual(second);
    expect(first.contractId).toBe(second.contractId);
    expect(first.checks).toEqual({
      exactRequestAndHandoffBinding: true,
      exactReadinessFailClosedBoundary: true,
      exactCurrentAuthorityBoundary: true,
      exactPositionOnlyBoundary: true,
      exactFutureReviewRequirements: true,
    });
  }, TEST_TIMEOUT_MS);
});
