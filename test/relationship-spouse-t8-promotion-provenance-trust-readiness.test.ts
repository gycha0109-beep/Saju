import { describe, expect, test } from 'vitest';
import { normalizeReviewerTrustContext } from '../src/interpretation/reviewer-trust.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from '../src/research/relationship-spouse-t8-runtime-admission.js';
import {
  RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_AUDIT_BASE,
  RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS,
  buildRelationshipSpouseT8PromotionProvenanceTrustReadiness,
} from '../src/research/relationship-spouse-t8-promotion-provenance-trust-readiness.js';

describe('Relationship / Spouse T8 promotion provenance and trust readiness', () => {
  test('records research evidence without treating it as a registered SourceReference', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.researchEvidencePresent).toBe(true);
    expect(report.runtimeSourceIds).toEqual([]);
    expect(report.runtimeSourceRefs).toEqual([]);
    expect(report.runtimeRegisteredSourceIds).toEqual([]);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.sourceIds).toEqual([]);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.sources).toEqual([]);
    expect(report.sourceReferenceRegistered).toBe(false);
    expect(report.sourceTierAuthorized).toBe(false);
    expect(report.promotionProvenanceReady).toBe(false);
  });

  test('does not let a test-only reviewer grant become Spouse T8 authority', () => {
    const testOnlyTrustContext = normalizeReviewerTrustContext({
      policyId: 'test-only-spouse-t8-reviewer-trust',
      version: '1.0.0',
      grants: [
        {
          reviewerId: 'test-fixture-reviewer',
          allowedReviewLevels: ['domain'],
          trustedAttestationContentHashes: ['0'.repeat(64)],
          status: 'active',
        },
      ],
    });
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(testOnlyTrustContext.grants[0]?.status).toBe('active');
    expect(testOnlyTrustContext.grants[0]?.allowedReviewLevels).toContain('domain');
    expect(report.trustedReviewerGrantPresent).toBe(false);
    expect(report.trustPinnedAttestationPresent).toBe(false);
    expect(report.trustPinnedReviewAuthorityReady).toBe(false);
  });

  test('missing trust-pinned attestation authority blocks staging eligibility', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.reviewAttestations).toEqual([]);
    expect(report.runtimeReviewAttestationCount).toBe(0);
    expect(report.trustPinnedAttestationPresent).toBe(false);
    expect(report.stagingEligibility).toBe(false);
  });

  test('missing trusted domain-approved review blocks Production promotion', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY.productionMinimumReviewLevel).toBe(
      'domain',
    );
    expect(report.domainApprovedReviewPresent).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('preserves the exact isolated research lifecycle instead of auto-promoting the bundle', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES.map((rule) => rule.status)).toEqual([
      'research',
      'research',
    ]);
    expect(report.runtimeMethodologyStatus).toBe('research');
    expect(report.runtimePackStatus).toBe('research');
    expect(report.runtimeRuleStatuses).toEqual(['research', 'research']);
    expect(report.status).toBe(
      'PROMOTION_PROVENANCE_AND_TRUST_AUTHORITY_ABSENT_FAIL_CLOSED',
    );
  });

  test('keeps all consumer/default-route and Production behavior flags fail-closed', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.consumerNarrativeActivated).toBe(false);
    expect(report.compatibilityConsumerActivated).toBe(false);
    expect(report.previewDefaultRouteChanged).toBe(false);
    expect(report.productionBehaviorChanged).toBe(false);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.consumerNarrativeActivated).toBe(
      false,
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.compatibilityConsumerActivated,
    ).toBe(false);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.previewDefaultRouteChanged).toBe(
      false,
    );
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.productionBehaviorChanged).toBe(
      false,
    );
  });

  test('pins the authority audit boundary without inventing contract fields', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.auditBaseSha).toBe(RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_AUDIT_BASE);
    expect(RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY.researchEvidenceSourceLocator).toBe(
      '4srcLx2Fq2o',
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY.domainApprovedLiteralFieldExists,
    ).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY.productionAllowedLiteralFieldExists,
    ).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY.productionEligibleSourceTiers,
    ).toEqual(['primary', 'scholarly_secondary', 'cross_reference']);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
  });

  test('is deterministic and records only the external authority still required', () => {
    const first = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();
    const second = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.requiredExternalAuthority).toEqual([
      'REGISTER_AUTHORIZED_SOURCE_REFERENCE_FOR_CURRENT_SPOUSE_EVIDENCE',
      'AUTHORIZE_SOURCE_PROVENANCE_TIER_WITHOUT_INFERENCE',
      'SUPPLY_REAL_REVIEW_ATTESTATION',
      'SUPPLY_ACTIVE_REVIEWER_TRUST_GRANT_PINNING_EXACT_ATTESTATION_HASH',
      'REQUIRE_DOMAIN_APPROVED_TRUSTED_REVIEW_FOR_PRODUCTION',
    ]);
  });
});
