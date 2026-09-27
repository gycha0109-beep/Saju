import { describe, expect, it } from 'vitest';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
  RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID,
  buildRelationshipSpouseT8AiAssistedInternalReview,
} from '../src/research/relationship-spouse-t8-ai-assisted-internal-review.js';
import { buildRelationshipSpouseT8DomainReviewSubjectManifest } from '../src/research/relationship-spouse-t8-domain-review-subject-manifest.js';
import { createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations } from '../src/research/relationship-spouse-t8-external-review-attestation-intake.js';
import { buildRelationshipSpouseT8TrustGrantRequestManifest } from '../src/research/relationship-spouse-t8-trust-grant-request-manifest.js';

function key(value: {
  subjectType: string;
  subjectRef: { id: string; version: string; contentHash: string };
}) {
  return `${value.subjectType}:${value.subjectRef.id}@${value.subjectRef.version}:${value.subjectRef.contentHash}`;
}

describe('Relationship / Spouse T8 AI-assisted internal source review', () => {
  it('pins all three exact current source-bound subjects by content hash', () => {
    const manifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();

    expect(RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS).toHaveLength(3);
    expect(
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS.map(key).sort(),
    ).toEqual(manifest.subjects.map(key).sort());
  });

  it('records actual AI-assisted internal approvals without claiming domain review', () => {
    const report = buildRelationshipSpouseT8AiAssistedInternalReview();

    expect(report.reviewerClass).toBe('AI_ASSISTED_INTERNAL_REVIEW');
    expect(report.reviewerId).toBe(
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID,
    );
    expect(report.reviewedSubjectCount).toBe(3);
    expect(report.exactCurrentSubjectBinding).toBe(true);
    expect(report.attestations.every((attestation) => attestation.reviewLevel === 'internal')).toBe(
      true,
    );
    expect(report.attestations.every((attestation) => attestation.decision === 'approved')).toBe(
      true,
    );
    expect(report.authority.aiAssistedInternalReviewEstablished).toBe(true);
    expect(report.authority.independentHumanDomainReviewEstablished).toBe(false);
    expect(report.authority.domainReviewAuthorityEstablished).toBe(false);
  });

  it('preserves source roles: Whisper direct basis, Lee methodology context only', () => {
    const report = buildRelationshipSpouseT8AiAssistedInternalReview();

    expect(report.sourceReview.whisperPublicBodyRechecked).toBe(true);
    expect(report.sourceReview.whisperYangSelectorObserved).toBe(true);
    expect(report.sourceReview.whisperYinSelectorObserved).toBe(true);
    expect(report.sourceReview.whisperSchoolDependenceObserved).toBe(true);
    expect(report.sourceReview.leeKciIdentityAndAbstractRechecked).toBe(true);
    expect(report.sourceReview.leeModernSpouseRemappingContextObserved).toBe(true);
    expect(report.sourceReview.leePureNatalSelectorObserved).toBe(false);
    expect(report.sourceReview.leeUsedAsRuleDirectBasis).toBe(false);
    expect(report.sourceReview.sourceRoleBoundaryPreserved).toBe(true);
  });

  it('is accepted by registry shape and subject binding but creates no domain trust candidate', () => {
    const registry = createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations(
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
      '2026-09-27T18:01:00.000Z',
    );
    const trustRequest = buildRelationshipSpouseT8TrustGrantRequestManifest(
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
      '2026-09-27T18:01:00.000Z',
    );

    expect(registry.reviewAttestations).toHaveLength(3);
    expect(trustRequest.suppliedReviewAttestationCount).toBe(3);
    expect(trustRequest.domainReviewAttestationCount).toBe(0);
    expect(trustRequest.trustGrantRequestCandidateCount).toBe(0);
    expect(trustRequest.coveredSubjectCount).toBe(0);
    expect(trustRequest.uncoveredSubjectCount).toBe(3);
    expect(trustRequest.authority.actualReviewerTrustGrantCount).toBe(0);
  });

  it('does not mutate reviewer status, provenance, lifecycle, G2A, Official Reading, or Production authority', () => {
    const registry = createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations(
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
    );
    const report = buildRelationshipSpouseT8AiAssistedInternalReview();

    expect(registry.pack.status).toBe('research');
    expect(registry.methodologies.every((methodology) => methodology.status === 'research')).toBe(
      true,
    );
    expect(registry.rules.every((rule) => rule.status === 'research')).toBe(true);
    expect(registry.rules.every((rule) => rule.quality.reviewerStatus === 'unreviewed')).toBe(true);
    expect(registry.rules.every((rule) => rule.quality.provenanceQuality === 'unknown')).toBe(true);
    expect(report.authority.reviewerStatusPromotionAuthorized).toBe(false);
    expect(report.authority.provenanceQualityPromotionAuthorized).toBe(false);
    expect(report.authority.lifecyclePromotionAuthorized).toBe(false);
    expect(report.authority.boundedEngineDevelopmentPolicyMayBeEvaluated).toBe(true);
    expect(report.authority.g2aAdmitted).toBe(false);
    expect(report.authority.officialReadingAuthorityAuthorized).toBe(false);
    expect(report.authority.productionAdmissionAuthority).toBe(false);
    expect(report.authority.production).toBe('HOLD');

    const inspection = inspectMyeonghwaProductionComposition({ registry });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected Production block.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });

  it('is deterministic', () => {
    const left = buildRelationshipSpouseT8AiAssistedInternalReview();
    const right = buildRelationshipSpouseT8AiAssistedInternalReview();

    expect(left).toEqual(right);
    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
