import { describe, expect, it } from 'vitest';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from '../src/research/general-natal-source-bounded-review-subject-manifest.js';

function subjectKey(subject: {
  subjectType: 'methodology' | 'rule';
  subjectRef: { id: string; version: string; contentHash: string };
}): string {
  return `${subject.subjectType}:${subject.subjectRef.id}@${subject.subjectRef.version}:${subject.subjectRef.contentHash}`;
}

describe('general natal source-bounded domain-review subject manifest', () => {
  it('pins exactly one methodology and ten rules from the current registry snapshot', () => {
    const manifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();
    expect(manifest.candidateVersion).toBe('0.2.0-research');
    expect(manifest.candidateVersion).toBe(GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION);
    expect(manifest.methodologySubjectCount).toBe(1);
    expect(manifest.ruleSubjectCount).toBe(10);
    expect(manifest.reviewSubjectCount).toBe(11);
    expect(manifest.subjects).toHaveLength(11);
  });

  it('matches the exact content-addressed methodology and rule refs in the registry snapshot', () => {
    const registry = createGeneralNatalSourceBoundedRegistry();
    const manifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();

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
  });

  it('uses lowercase SHA-256 content hashes and remains deterministic', () => {
    const left = buildGeneralNatalSourceBoundedReviewSubjectManifest();
    const right = buildGeneralNatalSourceBoundedReviewSubjectManifest();
    const sha256 = /^[a-f0-9]{64}$/;

    expect(left.manifestHash).toBe(right.manifestHash);
    expect(left.manifestHash).toMatch(sha256);
    expect(left.subjects.every((subject) => subject.subjectRef.contentHash.match(sha256))).toBe(true);
    expect(left.subjects.every((subject) => subject.subjectRef.version === '0.2.0-research')).toBe(
      true,
    );
    expect(left.subjects.every((subject) => subject.requiredReviewLevel === 'domain')).toBe(true);
  });

  it('creates no review decision, reviewer identity, attestation, or trust authority', () => {
    const manifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();
    const encoded = JSON.stringify(manifest);

    expect(manifest.reviewAttestationCount).toBe(0);
    expect(manifest.subjects.every((subject) => subject.attestationState === 'absent')).toBe(true);
    expect(encoded).not.toContain('reviewerId');
    expect(encoded).not.toContain('approved');
    expect(encoded).not.toContain('ReviewerTrustContext');
    expect(manifest.authority).toEqual({
      reviewSubjectManifestEstablished: true,
      sourceIntegrityQualificationEstablished: false,
      provenanceQualityPromotionAuthorized: false,
      domainReviewAuthorityEstablished: false,
      trustedDomainAttestationEstablished: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });

  it('does not make the research candidate executable in Production', () => {
    const registry = createGeneralNatalSourceBoundedRegistry();
    const inspection = inspectMyeonghwaProductionComposition({ registry });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
