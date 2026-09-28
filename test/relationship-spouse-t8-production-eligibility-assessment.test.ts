import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8ProductionEligibilityAssessment,
  evaluateRelationshipSpouseT8ProductionProvenanceDeclaration,
  evaluateRelationshipSpouseT8ProductionReviewerDeclaration,
} from '../src/research/relationship-spouse-t8-production-eligibility-assessment.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
} from '../src/research/relationship-spouse-t8-source-adjudicated-staging-runtime.js';

const assessment =
  buildRelationshipSpouseT8ProductionEligibilityAssessment();

describe('Relationship / Spouse T8 production eligibility assessment', () => {
  test('binds exact Gate 14 and staging lineage before assessing Production', () => {
    expect(assessment.capabilityKey).toBe('relationship:natal:spouse');
    expect(assessment.lineage.shadowEvidenceId).toMatch(/^[a-f0-9]{64}$/);
    expect(assessment.lineage.stagingRegistrySnapshotId).toMatch(
      /^registry_[a-f0-9]{24}$/,
    );
    expect(assessment.lineage.stagingPackRef.contentHash).toMatch(
      /^[a-f0-9]{64}$/,
    );
    expect(
      assessment.lineage.sourceAdjudicationAuthorityRef.contentHash,
    ).toMatch(/^[a-f0-9]{64}$/);
    expect(assessment.observations.gate14Satisfied).toBe(true);
    expect(assessment.observations.exactLineageBound).toBe(true);
  });

  test('separates source-tier eligibility from rule-level production provenance', () => {
    expect(assessment.observations.testCoverageReady).toBe(true);
    expect(assessment.observations.sourceTierReady).toBe(true);
    expect(assessment.observations.methodologySourceTierAuthorized).toBe(true);

    expect(assessment.observations.directSelectorSourceIds).toHaveLength(1);
    expect(assessment.observations.directSelectorSourceTiers).toEqual([
      'cross_reference',
    ]);

    expect(assessment.observations.primaryDirectBasisEstablished).toBe(false);
    expect(
      assessment.observations.multiSourceSelectorSupportEstablished,
    ).toBe(false);
    expect(
      assessment.observations.declaredProductionProvenanceQualityReady,
    ).toBe(false);
    expect(assessment.observations.provenancePathReady).toBe(false);

    expect(
      assessment.blockers,
    ).toContain('PRODUCTION_RULE_PROVENANCE_QUALITY_NOT_ESTABLISHED');
    expect(assessment.blockers).toContain(
      'PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED',
    );
    expect(assessment.blockers).toContain(
      'MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED',
    );

    expect(assessment.blockers).not.toContain(
      'PRODUCTION_SOURCE_TIER_NOT_AUTHORIZED',
    );
    expect(assessment.blockers).not.toContain(
      'PRODUCTION_TEST_COVERAGE_NOT_ESTABLISHED',
    );
  });

  test('does not turn quality metadata declarations into provenance authority', () => {
    const primary =
      evaluateRelationshipSpouseT8ProductionProvenanceDeclaration(
        'primary_supported',
      );
    const multi =
      evaluateRelationshipSpouseT8ProductionProvenanceDeclaration(
        'multi_source_supported',
      );

    expect(primary.primaryDirectBasisEstablished).toBe(false);
    expect(primary.declarationSupported).toBe(false);

    expect(multi.multiSourceSelectorSupportEstablished).toBe(false);
    expect(multi.declarationSupported).toBe(false);

    expect(primary.directBasisSourceIds).toEqual(multi.directBasisSourceIds);
    expect(primary.directBasisSourceIds).toHaveLength(1);
  });

  test('does not turn domain_reviewed metadata alone into trusted review authority', () => {
    const statusOnly =
      evaluateRelationshipSpouseT8ProductionReviewerDeclaration(
        'domain_reviewed',
        false,
        false,
      );
    const attestationWithoutTrustGrant =
      evaluateRelationshipSpouseT8ProductionReviewerDeclaration(
        'domain_reviewed',
        true,
        false,
      );

    expect(statusOnly.reviewerStatusEstablished).toBe(true);
    expect(statusOnly.trustedDomainReviewAuthorityEstablished).toBe(false);

    expect(attestationWithoutTrustGrant.domainAttestationCoverageEstablished).toBe(
      true,
    );
    expect(
      attestationWithoutTrustGrant.trustedDomainReviewAuthorityEstablished,
    ).toBe(false);
  });

  test('records the exact missing trusted-domain-review authority separately', () => {
    expect(assessment.observations.domainReviewerStatusEstablished).toBe(false);
    expect(
      assessment.observations.domainAttestationCoverageEstablished,
    ).toBe(false);
    expect(assessment.observations.reviewerTrustGrantEstablished).toBe(false);
    expect(
      assessment.observations.trustedDomainReviewAuthorityEstablished,
    ).toBe(false);

    expect(assessment.blockers).toContain(
      'DOMAIN_REVIEW_STATUS_NOT_ESTABLISHED',
    );
    expect(assessment.blockers).toContain(
      'TRUST_PINNED_DOMAIN_REVIEW_ATTESTATIONS_NOT_ESTABLISHED',
    );
    expect(assessment.blockers).toContain(
      'REVIEWER_TRUST_GRANT_NOT_ESTABLISHED',
    );
  });

  test('keeps source-adjudication v1 out of Production and preserves trusted-review route boundary', () => {
    expect(
      assessment.productionContract.sourceAdjudicationV1MayTargetProduction,
    ).toBe(false);
    expect(assessment.productionContract.trustedReviewRequiredForProduction).toBe(
      true,
    );
    expect(assessment.observations.sourceAdjudicationProductionAllowed).toBe(
      false,
    );
    expect(assessment.routeConstraints).toEqual([
      'SOURCE_ADJUDICATION_V1_NOT_AUTHORIZED_FOR_PRODUCTION',
      'PRODUCTION_REQUIRES_TRUSTED_REVIEW_AUTHORITY',
    ]);
  });

  test('does not mutate lifecycle or factual quality metadata while assessing', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
    ).toBe('reviewed');
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status).toBe(
      'staging',
    );

    for (const rule of RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES) {
      expect(rule.status).toBe('reviewed');
      expect(rule.quality.testCoverage).toBe('regression_suite');
      expect(rule.quality.provenanceQuality).toBe('unknown');
      expect(rule.quality.reviewerStatus).toBe('unreviewed');
    }

    expect(assessment.currentLifecycle).toEqual({
      methodology: 'reviewed',
      rules: ['reviewed', 'reviewed'],
      pack: 'staging',
      productionLifecycleMaterialized: false,
    });
  });

  test('fails closed on current Production eligibility without reopening consumers', () => {
    expect(assessment.productionCandidateResearchReady).toBe(false);
    expect(assessment.productionExecutionAuthorityReady).toBe(false);
    expect(assessment.productionPromotionReady).toBe(false);
    expect(assessment.productionEligibility).toBe('BLOCKED');

    expect(assessment.authorityBoundary).toEqual({
      humanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      productionLifecycleMutationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });

    expect(assessment.nextDisposition).toBe(
      'OBTAIN_PRODUCTION_GRADE_DIRECT_SELECTOR_PROVENANCE',
    );
  });

  test('content-addresses the assessment material deterministically', () => {
    const { assessmentId, ...material } = assessment;

    expect(assessmentId).toMatch(/^[a-f0-9]{64}$/);
    expect(assessmentId).toBe(deterministicContentHash(material));
  });
});
