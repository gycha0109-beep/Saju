import { describe, expect, it } from 'vitest';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
  GENERAL_NATAL_SOURCE_BOUNDED_PACK,
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from '../src/research/general-natal-source-bounded-authority-bridge-review.js';

describe('General Natal source-bounded Authority Bridge review', () => {
  it('binds the exact current bounded candidate and review surface without changing lifecycle', () => {
    const review = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

    expect(review.candidateState.version).toBe('0.2.0-research');
    expect(review.candidateState.familyRuleCount).toBe(5);
    expect(review.candidateState.relationRuleCount).toBe(5);
    expect(review.candidateState.ruleCount).toBe(10);
    expect(review.authorityState.reviewSubjectCount).toBe(11);

    expect(GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.status).toBe('research');
    expect(GENERAL_NATAL_SOURCE_BOUNDED_PACK.status).toBe('research');
    expect(review.candidateState.allRulesResearchOnly).toBe(true);
    expect(review.candidateState.allRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allRulesUnreviewed).toBe(true);
    expect(review.candidateState.allRulesContested).toBe(true);

    expect([
      ...GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
      ...GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
    ]).toHaveLength(10);
  });

  it('returns the candidate to Research because full source integrity is still unestablished', () => {
    const review = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);

    expect(review.authorityState.sourceIntegrityQualificationEstablished).toBe(false);
    expect(review.sourceResearchBlockers).toEqual([
      expect.objectContaining({
        code: 'FIXED_WITNESS_SOURCE_INTEGRITY_NOT_ESTABLISHED',
        established: false,
      }),
      expect.objectContaining({
        code: 'SAMYEONG_V7_PEER_SOURCE_INTEGRITY_NOT_ESTABLISHED',
        established: false,
      }),
    ]);
  });

  it('keeps review, trust, provenance, engine, Official, and Production authority fail-closed', () => {
    const review = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

    expect(review.authorityState.bundledReviewAttestationCount).toBe(0);
    expect(review.authorityState.provenanceQualityPromotionAuthorized).toBe(false);
    expect(review.authorityState.domainReviewAuthorityEstablished).toBe(false);
    expect(review.authorityState.trustedDomainAttestationEstablished).toBe(false);
    expect(review.authorityState.engineAuthorityPromotionAuthorized).toBe(false);
    expect(review.authorityState.previewExpansionAuthorized).toBe(false);
    expect(review.authorityState.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityState.productionAdmissionAuthority).toBe(false);
    expect(review.authorityState.production).toBe('HOLD');

    expect(review.governanceBlockers.map((blocker) => blocker.code)).toEqual([
      'DOMAIN_REVIEW_ATTESTATIONS_ABSENT',
      'TRUSTED_DOMAIN_ATTESTATION_AUTHORITY_ABSENT',
      'PROVENANCE_QUALITY_PROMOTION_NOT_AUTHORIZED',
    ]);
  });

  it('separates Research return conditions from later governance promotion gates', () => {
    const review = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

    expect(review.reReviewEntryCriteria.research).toContain(
      'COMPLETE_EXACT_SOURCE_INTEGRITY_QUALIFICATION_FOR_EVERY_SOURCE_CONSUMED_BY_THE_CURRENT_SOURCE_BOUNDED_CANDIDATE',
    );
    expect(review.reReviewEntryCriteria.governance).toContain(
      'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_BOUND_TO_THE_EXACT_CURRENT_11_CONTENT_ADDRESSED_SUBJECTS',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_REVIEWER_IDENTITY_OR_TRUST_GRANT_FABRICATION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_PRODUCTION_PACK_OR_PRODUCTION_ADMISSION_FROM_THIS_REVIEW',
    );
  });

  it('is deterministic for the same governed repository state', () => {
    const left = buildGeneralNatalSourceBoundedAuthorityBridgeReview();
    const right = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
    expect(left.evidence.registrySnapshotId).toBe(right.evidence.registrySnapshotId);
    expect(left.evidence.reviewSubjectManifestHash).toBe(
      right.evidence.reviewSubjectManifestHash,
    );
  });
});
