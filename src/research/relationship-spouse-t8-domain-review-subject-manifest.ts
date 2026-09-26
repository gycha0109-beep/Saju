import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8SourceBoundPromotionReview,
} from './relationship-spouse-t8-source-bound-promotion-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-bound-runtime.js';

export interface RelationshipSpouseT8DomainReviewSubject {
  readonly subjectType: 'methodology' | 'rule';
  readonly subjectRef: ContentAddressedVersionedRef;
  readonly requiredReviewLevel: 'domain';
  readonly attestationState: 'absent';
}

export interface RelationshipSpouseT8DomainReviewSubjectManifest {
  readonly manifestId: 'RELATIONSHIP-SPOUSE-T8-SOURCE-BOUND-DOMAIN-REVIEW-SUBJECTS';
  readonly runtimeVersion: typeof RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION;
  readonly upstreamPromotionReviewId: string;
  readonly registrySnapshotId: string;
  readonly packRef: ContentAddressedVersionedRef;
  readonly methodologySubjectCount: number;
  readonly ruleSubjectCount: number;
  readonly reviewSubjectCount: number;
  readonly reviewAttestationCount: number;
  readonly requiredReviewLevel: 'domain';
  readonly subjects: readonly RelationshipSpouseT8DomainReviewSubject[];
  readonly authority: {
    readonly reviewSubjectManifestEstablished: true;
    readonly sourceReferenceRegistered: true;
    readonly sourceTierAuthorized: true;
    readonly domainReviewAuthorityEstablished: false;
    readonly trustedDomainAttestationEstablished: false;
    readonly reviewerStatusPromotionAuthorized: false;
    readonly provenanceQualityPromotionAuthorized: false;
    readonly lifecyclePromotionAuthorized: false;
    readonly g2aAdmitted: false;
    readonly officialReadingAuthorityAuthorized: false;
    readonly productionAdmissionAuthority: false;
    readonly production: 'HOLD';
  };
  readonly manifestHash: string;
}

function subjectSortKey(subject: RelationshipSpouseT8DomainReviewSubject): string {
  return `${subject.subjectType}:${subject.subjectRef.id}@${subject.subjectRef.version}`;
}

function freezeSubject(
  subjectType: RelationshipSpouseT8DomainReviewSubject['subjectType'],
  subjectRef: ContentAddressedVersionedRef,
): RelationshipSpouseT8DomainReviewSubject {
  return Object.freeze({
    subjectType,
    subjectRef: Object.freeze({ ...subjectRef }),
    requiredReviewLevel: 'domain' as const,
    attestationState: 'absent' as const,
  });
}

export function buildRelationshipSpouseT8DomainReviewSubjectManifest(): RelationshipSpouseT8DomainReviewSubjectManifest {
  const registry = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY;
  const promotionReview = buildRelationshipSpouseT8SourceBoundPromotionReview();

  if (
    !promotionReview.sourceAuthority.sourceReferenceRegistered ||
    !promotionReview.sourceAuthority.sourceTierAuthorized
  ) {
    throw new Error(
      'Spouse T8 domain-review subjects require the governed source-bound runtime and source-tier gate.',
    );
  }

  const methodologySubjects = registry.snapshot.methodologies.map((subjectRef) =>
    freezeSubject('methodology', subjectRef),
  );
  const ruleSubjects = registry.snapshot.rules.map((subjectRef) =>
    freezeSubject('rule', subjectRef),
  );
  const subjects = Object.freeze(
    [...methodologySubjects, ...ruleSubjects].sort((left, right) =>
      subjectSortKey(left).localeCompare(subjectSortKey(right)),
    ),
  );

  const authority = Object.freeze({
    reviewSubjectManifestEstablished: true as const,
    sourceReferenceRegistered: true as const,
    sourceTierAuthorized: true as const,
    domainReviewAuthorityEstablished: false as const,
    trustedDomainAttestationEstablished: false as const,
    reviewerStatusPromotionAuthorized: false as const,
    provenanceQualityPromotionAuthorized: false as const,
    lifecyclePromotionAuthorized: false as const,
    g2aAdmitted: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const core = Object.freeze({
    manifestId: 'RELATIONSHIP-SPOUSE-T8-SOURCE-BOUND-DOMAIN-REVIEW-SUBJECTS' as const,
    runtimeVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
    upstreamPromotionReviewId: promotionReview.reviewId,
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
