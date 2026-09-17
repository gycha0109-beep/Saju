import { describe, expect, it } from 'vitest';
import type { ReviewAttestation } from '../src/contracts/interpretation.js';
import {
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from '../src/research/general-natal-source-bounded-review-subject-manifest.js';
import { buildGeneralNatalTrustGrantRequestManifest } from '../src/research/general-natal-source-bounded-trust-grant-request-manifest.js';

function currentSubjects() {
  return buildGeneralNatalSourceBoundedReviewSubjectManifest().subjects;
}

function testAttestation(
  index: number,
  overrides: Partial<ReviewAttestation> = {},
): ReviewAttestation {
  const subject = currentSubjects()[index];
  if (subject === undefined) throw new Error(`Missing review subject fixture at index ${index}.`);
  return {
    attestationId: `TEST-GENERAL-NATAL-ATTESTATION-${index}`,
    subjectType: subject.subjectType,
    subjectRef: { ...subject.subjectRef },
    reviewerId: `TEST-DOMAIN-REVIEWER-${index}-NON-AUTHORITY`,
    reviewLevel: 'domain',
    decision: 'approved',
    reviewedAt: `2026-09-18T00:0${index}:00.000Z`,
    notes: 'Test fixture only; not a real review or trust grant.',
    ...overrides,
  };
}

describe('general natal trust-grant request manifest', () => {
  it('reports all eleven current review subjects as uncovered when no attestations are supplied', () => {
    const manifest = buildGeneralNatalTrustGrantRequestManifest([]);

    expect(manifest.reviewSubjectCount).toBe(11);
    expect(manifest.suppliedReviewAttestationCount).toBe(0);
    expect(manifest.domainReviewAttestationCount).toBe(0);
    expect(manifest.trustGrantRequestCandidateCount).toBe(0);
    expect(manifest.coveredSubjectCount).toBe(0);
    expect(manifest.uncoveredSubjectCount).toBe(11);
    expect(manifest.uncoveredSubjects).toHaveLength(11);
    expect(manifest.authority.actualReviewerTrustGrantCount).toBe(0);
    expect(manifest.authority.trustedDomainAttestationEstablished).toBe(false);
    expect(manifest.authority.production).toBe('HOLD');
  });

  it('materializes the exact existing trust-grant pinning inputs from one validated domain attestation', () => {
    const attestation = testAttestation(0);
    const manifest = buildGeneralNatalTrustGrantRequestManifest([attestation]);
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
    expect(manifest.uncoveredSubjectCount).toBe(10);
    expect(manifest.authority.actualReviewerTrustGrantCount).toBe(0);
  });

  it('does not treat an internal-level attestation as domain-review coverage', () => {
    const attestation = testAttestation(0, { reviewLevel: 'internal' });
    const manifest = buildGeneralNatalTrustGrantRequestManifest([attestation]);

    expect(manifest.suppliedReviewAttestationCount).toBe(1);
    expect(manifest.domainReviewAttestationCount).toBe(0);
    expect(manifest.trustGrantRequestCandidateCount).toBe(0);
    expect(manifest.coveredSubjectCount).toBe(0);
    expect(manifest.uncoveredSubjectCount).toBe(11);
  });

  it('preserves rejected domain decisions as review facts rather than silently converting them to approval', () => {
    const attestation = testAttestation(0, { decision: 'rejected' });
    const manifest = buildGeneralNatalTrustGrantRequestManifest([attestation]);

    expect(manifest.candidates).toHaveLength(1);
    expect(manifest.candidates[0]?.decision).toBe('rejected');
    expect(manifest.authority.domainReviewAuthorityEstablished).toBe(false);
    expect(manifest.authority.trustedDomainAttestationEstablished).toBe(false);
  });

  it('is deterministic regardless of accepted attestation input ordering', () => {
    const first = testAttestation(0);
    const second = testAttestation(1);

    const left = buildGeneralNatalTrustGrantRequestManifest([second, first]);
    const right = buildGeneralNatalTrustGrantRequestManifest([first, second]);

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
      buildGeneralNatalTrustGrantRequestManifest([stale]);
      throw new Error('Expected stale subject rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe(
        'REVIEW_ATTESTATION_SUBJECT_MISMATCH',
      );
    }
  });
});
