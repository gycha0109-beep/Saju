import { describe, expect, it } from 'vitest';
import type { ReviewAttestation } from '../src/contracts/interpretation.js';
import { RegistryConfigurationError } from '../src/interpretation/rule-registry.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { buildRelationshipSpouseT8DomainReviewSubjectManifest } from '../src/research/relationship-spouse-t8-domain-review-subject-manifest.js';
import { createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations } from '../src/research/relationship-spouse-t8-external-review-attestation-intake.js';
import { RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY } from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

function currentRuleSubject() {
  const subject = buildRelationshipSpouseT8DomainReviewSubjectManifest().subjects.find(
    (candidate) => candidate.subjectType === 'rule',
  );
  if (subject === undefined) throw new Error('Missing Spouse T8 rule review subject fixture.');
  return subject;
}

function testDomainAttestation(
  subjectRef = currentRuleSubject().subjectRef,
  reviewerId = 'TEST-SPOUSE-T8-DOMAIN-REVIEWER-NON-AUTHORITY',
): ReviewAttestation {
  return {
    attestationId: 'TEST-SPOUSE-T8-DOMAIN-ATTESTATION',
    subjectType: 'rule',
    subjectRef: { ...subjectRef },
    reviewLevel: 'domain',
    reviewerId,
    reviewedAt: '2026-09-27T00:00:00.000Z',
    decision: 'approved',
    notes: 'Test fixture only; not bundled or authoritative.',
  };
}

describe('Relationship / Spouse T8 external domain-review attestation intake', () => {
  it('is exactly equivalent to the canonical source-bound registry when no attestations are supplied', () => {
    const intake = createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations([]);

    expect(intake.snapshot).toEqual(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot);
    expect(intake.reviewAttestations).toEqual([]);
    expect(intake.rules).toEqual(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.rules);
    expect(intake.methodologies).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.methodologies,
    );
    expect(intake.sources).toEqual(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.sources);
    expect(intake.claimTypeDefinitions).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.claimTypeDefinitions,
    );
    expect(intake.claimValueSchemas).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.claimValueSchemas,
    );
    expect(intake.pack).toEqual(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.pack);
  });

  it('accepts an externally supplied domain attestation bound to an exact current review subject', () => {
    const attestation = testDomainAttestation();
    const registry = createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations([
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
      createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations([stale]);
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
      createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations([invalid]);
      throw new Error('Expected invalid attestation rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe('REVIEW_ATTESTATION_INVALID');
    }
  });

  it('does not convert accepted external test data into rule quality, lifecycle, G2A, or Production authority', () => {
    const registry = createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations([
      testDomainAttestation(),
    ]);

    expect(registry.pack.status).toBe('research');
    expect(registry.methodologies.every((methodology) => methodology.status === 'research')).toBe(
      true,
    );
    expect(
      registry.rules.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.provenanceQuality === 'unknown' &&
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
