import { describe, expect, it } from 'vitest';
import type { ReviewAttestation } from '../src/contracts/interpretation.js';
import {
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8DomainReviewSubjectManifest } from '../src/research/relationship-spouse-t8-domain-review-subject-manifest.js';
import { buildRelationshipSpouseT8TrustGrantRequestManifest } from '../src/research/relationship-spouse-t8-trust-grant-request-manifest.js';

function currentSubjects() {
  return buildRelationshipSpouseT8DomainReviewSubjectManifest().subjects;
}

function testAttestation(
  index: number,
  overrides: Partial<ReviewAttestation> = {},
): ReviewAttestation {
  const subject = currentSubjects()[index];
  if (subject === undefined) throw new Error(`Missing review subject fixture at index ${index}.`);

  return {
    attestationId: `TEST-SPOUSE-T8-ATTESTATION-${index}`,
    subjectType: subject.subjectType,
    subjectRef: { ...subject.subjectRef },
    reviewerId: `TEST-SPOUSE-T8-DOMAIN-REVIEWER-${index}-NON-AUTHORITY`,
    reviewLevel: 'domain',
    decision: 'approved',
    reviewedAt: `2026-09-27T03:4${index}:00.000Z`,
    notes: 'Test fixture only; not a real review or trust grant.',
    ...overrides,
  };
}

describe('Relationship / Spouse T8 trust-grant request manifest', () => {
  it('reports all three current review subjects as uncovered when no attestations are supplied', () => {
    const manifest = buildRelationshipSpouseT8TrustGrantRequestManifest([]);

    expect(manifest.reviewSubjectCount).toBe(3);
    expect(manifest.suppliedReviewAttestationCount).toBe(0);
    expect(manifest.domainReviewAttestationCount).toBe(0);
    expect(manifest.trustGrantRequestCandidateCount).toBe(0);
    expect(manifest.coveredSubjectCount).toBe(0);
    expect(manifest.uncoveredSubjectCount).toBe(3);
    expect(manifest.uncoveredSubjects).toHaveLength(3);
    expect(manifest.authority.actualReviewerTrustGrantCount).toBe(0);
    expect(manifest.authority.trustedDomainAttestationEstablished).toBe(false);
    expect(manifest.authority.domainReviewAuthorityEstablished).toBe(false);
    expect(manifest.authority.g2aAdmitted).toBe(false);
    expect(manifest.authority.production).toBe('HOLD');
  });

  it('materializes exact trust-pinning inputs from one validated domain attestation without creating a grant', () => {
    const attestation = testAttestation(0);
    const manifest = buildRelationshipSpouseT8TrustGrantRequestManifest([attestation]);
    const candidate = manifest.candidates[0];

    expect(candidate).toBeDefined();
    expect(candidate?.subjectType).toBe(attestation.subjectType);
    expect(candidate?.subjectRef).toEqual(attestation.subjectRef);
    expect(candidate?.reviewerId).toBe(attestation.reviewerId);
    expect(candidate?.requiredAllowedReviewLevel).toBe('domain');
    expect(candidate?.attestationId).toBe(attestation.attestationId);
    expect(candidate?.trustedAttestationContentHash).toBe(deterministicContentHash(attestation));
    expect(candidate?.decision).toBe('approved');
    expect(candidate?.reviewedAt).toBe(attestation.reviewedAt);
    expect('allowedReviewLevels' in (candidate ?? {})).toBe(false);
    expect('status' in (candidate ?? {})).toBe(false);
    expect(manifest.coveredSubjectCount).toBe(1);
    expect(manifest.uncoveredSubjectCount).toBe(2);
    expect(manifest.authority.actualReviewerTrustGrantCount).toBe(0);
    expect(manifest.authority.g2aAdmitted).toBe(false);
  });

  it('does not treat an internal-level attestation as domain-review coverage', () => {
    const attestation = testAttestation(0, { reviewLevel: 'internal' });
    const manifest = buildRelationshipSpouseT8TrustGrantRequestManifest([attestation]);

    expect(manifest.suppliedReviewAttestationCount).toBe(1);
    expect(manifest.domainReviewAttestationCount).toBe(0);
    expect(manifest.trustGrantRequestCandidateCount).toBe(0);
    expect(manifest.coveredSubjectCount).toBe(0);
    expect(manifest.uncoveredSubjectCount).toBe(3);
  });

  it('preserves rejected domain decisions as review facts rather than converting them to approval', () => {
    const attestation = testAttestation(0, { decision: 'rejected' });
    const manifest = buildRelationshipSpouseT8TrustGrantRequestManifest([attestation]);

    expect(manifest.candidates).toHaveLength(1);
    expect(manifest.candidates[0]?.decision).toBe('rejected');
    expect(manifest.authority.domainReviewAuthorityEstablished).toBe(false);
    expect(manifest.authority.trustedDomainAttestationEstablished).toBe(false);
    expect(manifest.authority.lifecyclePromotionAuthorized).toBe(false);
  });

  it('is deterministic regardless of accepted attestation input ordering', () => {
    const first = testAttestation(0);
    const second = testAttestation(1);

    const left = buildRelationshipSpouseT8TrustGrantRequestManifest([second, first]);
    const right = buildRelationshipSpouseT8TrustGrantRequestManifest([first, second]);

    expect(left).toEqual(right);
    expect(left.manifestHash).toBe(right.manifestHash);
  });

  it('rejects stale subject hashes before producing any trust handoff candidate', () => {
    const subject = currentSubjects()[0];
    if (subject === undefined) throw new Error('Missing review subject fixture.');

    const stale = testAttestation(0, {
      subjectRef: { ...subject.subjectRef, contentHash: '0'.repeat(64) },
    });

    try {
      buildRelationshipSpouseT8TrustGrantRequestManifest([stale]);
      throw new Error('Expected stale subject rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe(
        'REVIEW_ATTESTATION_SUBJECT_MISMATCH',
      );
    }
  });
});
