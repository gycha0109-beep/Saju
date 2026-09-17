import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { ReviewAttestation } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations } from './general-natal-source-bounded-external-review-attestation-intake.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from './general-natal-source-bounded-review-subject-manifest.js';

export const GENERAL_NATAL_TRUST_GRANT_REQUEST_MANIFEST_VERSION =
  'myeonghwa-general-natal-trust-grant-request-manifest-v1' as const;

export interface GeneralNatalTrustGrantRequestCandidate {
  readonly subjectType: ReviewAttestation['subjectType'];
  readonly subjectRef: ContentAddressedVersionedRef;
  readonly reviewerId: string;
  readonly requiredAllowedReviewLevel: 'domain';
  readonly attestationId: string;
  readonly trustedAttestationContentHash: string;
  readonly decision: ReviewAttestation['decision'];
  readonly reviewedAt: string;
}

export interface GeneralNatalUncoveredTrustSubject {
  readonly subjectType: ReviewAttestation['subjectType'];
  readonly subjectRef: ContentAddressedVersionedRef;
}

function reviewSubjectKey(
  subjectType: ReviewAttestation['subjectType'],
  subjectRef: ContentAddressedVersionedRef,
): string {
  return `${subjectType}:${subjectRef.id}@${subjectRef.version}:${subjectRef.contentHash}`;
}

function candidateSortKey(candidate: GeneralNatalTrustGrantRequestCandidate): string {
  return [
    reviewSubjectKey(candidate.subjectType, candidate.subjectRef),
    candidate.reviewedAt,
    candidate.attestationId,
    candidate.reviewerId,
  ].join(':');
}

export function buildGeneralNatalTrustGrantRequestManifest(
  reviewAttestations: readonly ReviewAttestation[],
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  const registry = createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations(
    reviewAttestations,
    createdAt,
  );
  const reviewSubjectManifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();
  const currentSubjectKeys = new Set(
    reviewSubjectManifest.subjects.map((subject) =>
      reviewSubjectKey(subject.subjectType, subject.subjectRef),
    ),
  );

  const candidates = Object.freeze(
    registry.reviewAttestations
      .filter(
        (attestation) =>
          attestation.reviewLevel === 'domain' &&
          currentSubjectKeys.has(reviewSubjectKey(attestation.subjectType, attestation.subjectRef)),
      )
      .map((attestation): GeneralNatalTrustGrantRequestCandidate =>
        Object.freeze({
          subjectType: attestation.subjectType,
          subjectRef: Object.freeze({ ...attestation.subjectRef }),
          reviewerId: attestation.reviewerId,
          requiredAllowedReviewLevel: 'domain',
          attestationId: attestation.attestationId,
          trustedAttestationContentHash: deterministicContentHash(attestation),
          decision: attestation.decision,
          reviewedAt: attestation.reviewedAt,
        }),
      )
      .sort((left, right) => candidateSortKey(left).localeCompare(candidateSortKey(right))),
  );

  const coveredSubjectKeys = new Set(
    candidates.map((candidate) => reviewSubjectKey(candidate.subjectType, candidate.subjectRef)),
  );
  const uncoveredSubjects = Object.freeze(
    reviewSubjectManifest.subjects
      .filter(
        (subject) => !coveredSubjectKeys.has(reviewSubjectKey(subject.subjectType, subject.subjectRef)),
      )
      .map((subject): GeneralNatalUncoveredTrustSubject =>
        Object.freeze({
          subjectType: subject.subjectType,
          subjectRef: Object.freeze({ ...subject.subjectRef }),
        }),
      ),
  );

  const authority = Object.freeze({
    trustGrantRequestManifestEstablished: true as const,
    actualReviewerTrustGrantCount: 0 as const,
    trustedDomainAttestationEstablished: false as const,
    domainReviewAuthorityEstablished: false as const,
    sourceIntegrityQualificationEstablished: false as const,
    provenanceQualityPromotionAuthorized: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const core = Object.freeze({
    manifestId: 'GENERAL-NATAL-SOURCE-BOUNDED-TRUST-GRANT-REQUESTS' as const,
    version: GENERAL_NATAL_TRUST_GRANT_REQUEST_MANIFEST_VERSION,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    reviewSubjectManifestHash: reviewSubjectManifest.manifestHash,
    reviewSubjectCount: reviewSubjectManifest.reviewSubjectCount,
    suppliedReviewAttestationCount: registry.reviewAttestations.length,
    domainReviewAttestationCount: candidates.length,
    trustGrantRequestCandidateCount: candidates.length,
    coveredSubjectCount: coveredSubjectKeys.size,
    uncoveredSubjectCount: uncoveredSubjects.length,
    candidates,
    uncoveredSubjects,
    authority,
  });

  return Object.freeze({
    ...core,
    manifestHash: deterministicContentHash(core),
  });
}
