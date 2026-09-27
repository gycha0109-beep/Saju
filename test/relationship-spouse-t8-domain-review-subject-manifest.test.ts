import { describe, expect, test } from 'vitest';
import type { ContentAddressedVersionedRef } from '../src/contracts/common.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  buildRelationshipSpouseT8DomainReviewSubjectManifest,
} from '../src/research/relationship-spouse-t8-domain-review-subject-manifest.js';
import {
  buildRelationshipSpouseT8SourceBoundPromotionReview,
} from '../src/research/relationship-spouse-t8-source-bound-promotion-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
} from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

function subjectKey(subject: {
  subjectType: 'methodology' | 'rule';
  subjectRef: ContentAddressedVersionedRef;
}): string {
  return `${subject.subjectType}:${subject.subjectRef.id}@${subject.subjectRef.version}:${subject.subjectRef.contentHash}`;
}

describe('Relationship / Spouse T8 domain-review subject manifest', () => {
  test('pins exactly one methodology and two selector rules', () => {
    const manifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();

    expect(manifest.runtimeVersion).toBe('1.0.1');
    expect(manifest.runtimeVersion).toBe(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION);
    expect(manifest.methodologySubjectCount).toBe(1);
    expect(manifest.ruleSubjectCount).toBe(2);
    expect(manifest.reviewSubjectCount).toBe(3);
    expect(manifest.subjects).toHaveLength(3);
    expect(manifest.requiredReviewLevel).toBe('domain');
  });

  test('matches the exact content-addressed refs in the source-bound registry snapshot', () => {
    const registry = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY;
    const manifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();

    const expected = [
      ...registry.snapshot.methodologies.map((subjectRef) => ({
        subjectType: 'methodology' as const,
        subjectRef,
      })),
      ...registry.snapshot.rules.map((subjectRef) => ({
        subjectType: 'rule' as const,
        subjectRef,
      })),
    ]
      .map(subjectKey)
      .sort();

    expect(manifest.subjects.map(subjectKey).sort()).toEqual(expected);
    expect(manifest.registrySnapshotId).toBe(registry.snapshot.registrySnapshotId);
    expect(manifest.packRef).toEqual(registry.snapshot.packRef);
    expect(manifest.subjects.every((subject) => subject.subjectRef.version === '1.0.1')).toBe(
      true,
    );
  });

  test('binds to the current promotion review and requires domain review for every subject', () => {
    const manifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();
    const promotionReview = buildRelationshipSpouseT8SourceBoundPromotionReview();

    expect(manifest.upstreamPromotionReviewId).toBe(promotionReview.reviewId);
    expect(manifest.subjects.every((subject) => subject.requiredReviewLevel === 'domain')).toBe(
      true,
    );
    expect(manifest.subjects.every((subject) => subject.attestationState === 'absent')).toBe(true);
  });

  test('uses deterministic lowercase SHA-256 subject and manifest hashes', () => {
    const first = buildRelationshipSpouseT8DomainReviewSubjectManifest();
    const second = buildRelationshipSpouseT8DomainReviewSubjectManifest();
    const sha256 = /^[a-f0-9]{64}$/;

    expect(first.manifestHash).toBe(second.manifestHash);
    expect(first.manifestHash).toMatch(sha256);
    expect(first.subjects.every((subject) => sha256.test(subject.subjectRef.contentHash))).toBe(
      true,
    );
  });

  test('creates no reviewer identity, decision, attestation, trust grant, or promotion authority', () => {
    const manifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();
    const encoded = JSON.stringify(manifest);

    expect(manifest.reviewAttestationCount).toBe(0);
    expect(encoded).not.toContain('reviewerId');
    expect(encoded).not.toContain('reviewedAt');
    expect(encoded).not.toContain('approved');
    expect(encoded).not.toContain('ReviewerTrustContext');
    expect(encoded).not.toContain('ReviewerTrustGrant');
    expect(manifest.authority).toEqual({
      reviewSubjectManifestEstablished: true,
      sourceReferenceRegistered: true,
      sourceTierAuthorized: true,
      domainReviewAuthorityEstablished: false,
      trustedDomainAttestationEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      g2aAdmitted: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });

  test('does not make the source-bound research runtime executable in Production', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    });

    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
