import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from './general-natal-conclusion-source-bounded-candidate.js';

export interface GeneralNatalSourceBoundedReviewSubject {
  readonly subjectType: 'methodology' | 'rule';
  readonly subjectRef: ContentAddressedVersionedRef;
  readonly requiredReviewLevel: 'domain';
  readonly attestationState: 'absent';
}

export interface GeneralNatalSourceBoundedReviewSubjectManifest {
  readonly manifestId: 'GENERAL-NATAL-SOURCE-BOUNDED-DOMAIN-REVIEW-SUBJECTS';
  readonly candidateVersion: typeof GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION;
  readonly registrySnapshotId: string;
  readonly packRef: ContentAddressedVersionedRef;
  readonly methodologySubjectCount: number;
  readonly ruleSubjectCount: number;
  readonly reviewSubjectCount: number;
  readonly reviewAttestationCount: number;
  readonly requiredReviewLevel: 'domain';
  readonly subjects: readonly GeneralNatalSourceBoundedReviewSubject[];
  readonly authority: {
    readonly reviewSubjectManifestEstablished: true;
    readonly sourceIntegrityQualificationEstablished: false;
    readonly provenanceQualityPromotionAuthorized: false;
    readonly domainReviewAuthorityEstablished: false;
    readonly trustedDomainAttestationEstablished: false;
    readonly productionAdmissionAuthority: false;
    readonly production: 'HOLD';
  };
  readonly manifestHash: string;
}

function subjectSortKey(subject: GeneralNatalSourceBoundedReviewSubject): string {
  return `${subject.subjectType}:${subject.subjectRef.id}@${subject.subjectRef.version}`;
}

function freezeSubject(
  subjectType: GeneralNatalSourceBoundedReviewSubject['subjectType'],
  subjectRef: ContentAddressedVersionedRef,
): GeneralNatalSourceBoundedReviewSubject {
  return Object.freeze({
    subjectType,
    subjectRef: Object.freeze({ ...subjectRef }),
    requiredReviewLevel: 'domain' as const,
    attestationState: 'absent' as const,
  });
}

export function buildGeneralNatalSourceBoundedReviewSubjectManifest(): GeneralNatalSourceBoundedReviewSubjectManifest {
  const registry = createGeneralNatalSourceBoundedRegistry();
  const methodologySubjects = registry.snapshot.methodologies.map((subjectRef) =>
    freezeSubject('methodology', subjectRef),
  );
  const ruleSubjects = registry.snapshot.rules.map((subjectRef) => freezeSubject('rule', subjectRef));
  const subjects = Object.freeze(
    [...methodologySubjects, ...ruleSubjects].sort((left, right) =>
      subjectSortKey(left).localeCompare(subjectSortKey(right)),
    ),
  );

  const authority = Object.freeze({
    reviewSubjectManifestEstablished: true as const,
    sourceIntegrityQualificationEstablished: false as const,
    provenanceQualityPromotionAuthorized: false as const,
    domainReviewAuthorityEstablished: false as const,
    trustedDomainAttestationEstablished: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const core = Object.freeze({
    manifestId: 'GENERAL-NATAL-SOURCE-BOUNDED-DOMAIN-REVIEW-SUBJECTS' as const,
    candidateVersion: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    packRef: Object.freeze({ ...registry.snapshot.packRef }),
    methodologySubjectCount: methodologySubjects.length,
    ruleSubjectCount: ruleSubjects.length,
    reviewSubjectCount: subjects.length,
    reviewAttestationCount: registry.reviewAttestations.length,
    requiredReviewLevel: 'domain' as const,
    subjects,
    authority,
  });

  return Object.freeze({
    ...core,
    manifestHash: deterministicContentHash(core),
  });
}
