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
  RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS,
  RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_RESEARCH_EVIDENCE_SOURCE_IDS,
  buildRelationshipSpouseT8PromotionProvenanceTrustReadiness,
} from '../src/research/relationship-spouse-t8-promotion-provenance-trust-readiness.js';

describe('Relationship / Spouse T8 promotion provenance and trust readiness', () => {
  test('keeps upstream research evidence distinct from runtime SourceReference registration', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.researchProvenance.researchEvidencePresent).toBe(true);
    expect(report.researchProvenance.evidenceSourceIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_RESEARCH_EVIDENCE_SOURCE_IDS,
    );
    expect(report.researchProvenance.evidenceAuthorityScope).toBe('research_only');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.sourceIds).toEqual([]);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.sources).toEqual([]);
    expect(report.runtimeSourceAuthority.sourceReferenceRegistered).toBe(false);
    expect(report.runtimeSourceAuthority.sourceTierAuthorized).toBe(false);
    expect(report.readiness.promotionProvenanceReady).toBe(false);
  });

  test('requires actual methodology and rule source binding rather than reconstructing it from research prose', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.runtimeSourceAuthority.methodologySourceIds).toEqual([]);
    expect(report.runtimeSourceAuthority.ruleSourceIds).toEqual([]);
    expect(report.runtimeSourceAuthority.registeredSourceIds).toEqual([]);
    expect(report.runtimeSourceAuthority.sourceTiers).toEqual([]);
    for (const rule of RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES) {
      expect(rule.sourceRefs).toEqual([]);
    }
    expect(report.runtimeContract.productionSourceTiers).toEqual(
      RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS,
    );
  });

  test('does not treat a test fixture reviewer grant as concrete Spouse T8 authority', () => {
    const fixtureContext = normalizeReviewerTrustContext({
      policyId: 'fixture-only-policy',
      version: '1',
      grants: [
        {
          reviewerId: 'fixture-reviewer',
          allowedReviewLevels: ['domain'],
          trustedAttestationContentHashes: ['0'.repeat(64)],
          status: 'active',
        },
      ],
    });
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(fixtureContext.grants).toHaveLength(1);
    expect(report.authorityAudit.testsFixturesMocksExamplesDocsCountAsAuthority).toBe(false);
    expect(report.authorityAudit.spouseBoundReviewerTrustContextPresent).toBe(false);
    expect(report.runtimeReviewerAuthority.trustedReviewerGrantCount).toBe(0);
    expect(report.runtimeReviewerAuthority.trustedReviewerGrantPresent).toBe(false);
  });

  test('missing trust-pinned attestation blocks staging eligibility', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.reviewAttestations).toEqual([]);
    expect(report.runtimeReviewerAuthority.reviewAttestationCount).toBe(0);
    expect(report.runtimeReviewerAuthority.trustPinnedAttestationPresent).toBe(false);
    expect(report.readiness.trustPinnedReviewAuthorityReady).toBe(false);
    expect(report.readiness.stagingEligibility).toBe(false);
  });

  test('missing trust-pinned domain approval blocks Production without inventing authority fields', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.runtimeContract.stagingGoverningReviewLevels).toEqual(['domain', 'internal']);
    expect(report.runtimeContract.productionGoverningReviewLevel).toBe('domain');
    expect(report.runtimeContract.approvedDecisionRequired).toBe(true);
    expect(report.runtimeContract.activeReviewerGrantRequiresPinnedAttestationHash).toBe(true);
    expect(report.runtimeReviewerAuthority.domainApprovedReviewPresent).toBe(false);
    expect(report.runtimeContract.syntheticDomainApprovedFieldExists).toBe(false);
    expect(report.runtimeContract.syntheticProductionAllowedFieldExists).toBe(false);
    expect(report.readiness.productionPromotionReady).toBe(false);
    expect(report.readiness.productionState).toBe('HOLD');
  });

  test('current research lifecycle and producer readiness do not auto-promote the bundle', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.status).toBe('research');
    expect(report.bundle.ruleLifecycles).toEqual(['research', 'research']);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.spouseT8ProducerReady).toBe(true);
    expect(report.readiness.stagingEligibility).toBe(false);
    expect(report.readiness.productionPromotionReady).toBe(false);
  });

  test('preserves consumer, compatibility, default-route, and Production fail-closed boundaries', () => {
    const report = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(report.guardrails).toEqual({
      consumerNarrativeActivated: false,
      compatibilityConsumerActivated: false,
      previewDefaultRouteChanged: false,
      productionBehaviorChanged: false,
      productionPromotionReady: false,
    });
    expect(report.readiness.productionState).toBe('HOLD');
  });

  test('records a deterministic governance verdict without creating authority', () => {
    const first = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();
    const second = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.status).toBe('PROMOTION_PROVENANCE_AND_TRUST_AUTHORITY_NOT_ESTABLISHED');
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(12);
    expect(first.recommendedNextAction).toBe(
      'OBTAIN_REPOSITORY_AUTHORIZED_SOURCE_BINDING_AND_EXTERNAL_TRUST_PINNED_REVIEW_AUTHORITY_BEFORE_ANY_LIFECYCLE_PROMOTION',
    );
  });
});
