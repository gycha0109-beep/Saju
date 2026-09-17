import { describe, expect, it } from 'vitest';
import type { ReviewAttestation } from '../src/contracts/interpretation.js';
import { RegistryConfigurationError } from '../src/interpretation/rule-registry.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  createGeneralNatalSourceBoundedRegistry,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from '../src/research/general-natal-source-bounded-review-subject-manifest.js';
import { createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations } from '../src/research/general-natal-source-bounded-external-review-attestation-intake.js';

function currentRuleSubject() {
  const subject = buildGeneralNatalSourceBoundedReviewSubjectManifest().subjects.find(
    (candidate) => candidate.subjectType === 'rule',
  );
  if (subject === undefined) throw new Error('Missing rule review subject fixture.');
  return subject;
}

function testDomainAttestation(
  subjectRef = currentRuleSubject().subjectRef,
  reviewerId = 'TEST-DOMAIN-REVIEWER-NON-AUTHORITY',
): ReviewAttestation {
  return {
    attestationId: 'TEST-GENERAL-NATAL-DOMAIN-ATTESTATION',
    subjectType: 'rule',
    subjectRef: { ...subjectRef },
    reviewLevel: 'domain',
    reviewerId,
    reviewedAt: '2026-09-18T00:00:00.000Z',
    decision: 'approved',
    notes: 'Test fixture only; not bundled or authoritative.',
  };
}

describe('general natal external domain-review attestation intake', () => {
  it('is exactly equivalent to the canonical candidate registry when no attestations are supplied', () => {
    const canonical = createGeneralNatalSourceBoundedRegistry();
    const intake = createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations([]);

    expect(intake.snapshot).toEqual(canonical.snapshot);
    expect(intake.reviewAttestations).toEqual([]);
    expect(intake.rules).toEqual(canonical.rules);
    expect(intake.methodologies).toEqual(canonical.methodologies);
    expect(intake.sources).toEqual(canonical.sources);
    expect(intake.pack).toEqual(canonical.pack);
  });

  it('accepts an externally supplied domain attestation bound to an exact current review subject', () => {
    const attestation = testDomainAttestation();
    const registry = createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations([
      attestation,
    ]);

    expect(registry.reviewAttestations).toHaveLength(1);
    expect(registry.reviewAttestations[0]).toEqual(attestation);
    expect(registry.snapshot.reviewAttestations).toHaveLength(1);
    expect(registry.snapshot.reviewAttestations[0]?.attestationId).toBe(attestation.attestationId);
  });

  it('rejects a stale or mutated subject content hash through generic registry governance', () => {
    const current = currentRuleSubject();
    const stale = testDomainAttestation({
      ...current.subjectRef,
      contentHash: '0'.repeat(64),
    });

    try {
      createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations([stale]);
      throw new Error('Expected stale attestation rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe(
        'REVIEW_ATTESTATION_SUBJECT_MISMATCH',
      );
    }
  });

  it('rejects invalid reviewer identity through generic registry governance', () => {
    const invalid = testDomainAttestation(currentRuleSubject().subjectRef, '');

    try {
      createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations([invalid]);
      throw new Error('Expected invalid attestation rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe('REVIEW_ATTESTATION_INVALID');
    }
  });

  it('does not convert accepted external test data into candidate review, provenance, trust, or Production authority', () => {
    const registry = createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations([
      testDomainAttestation(),
    ]);

    expect(registry.pack.status).toBe('research');
    expect(registry.methodologies.every((methodology) => methodology.status === 'research')).toBe(true);
    expect(
      registry.rules.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.provenanceQuality === 'secondary_only' &&
          rule.quality.reviewerStatus === 'unreviewed',
      ),
    ).toBe(true);

    const inspection = inspectMyeonghwaProductionComposition({ registry });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
