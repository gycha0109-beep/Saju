import type { ReviewAttestation } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8DomainReviewSubjectManifest } from './relationship-spouse-t8-domain-review-subject-manifest.js';
import { createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations } from './relationship-spouse-t8-external-review-attestation-intake.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
  RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
} from './relationship-spouse-t8-runtime-source-manifest.js';
import { buildRelationshipSpouseT8TrustGrantRequestManifest } from './relationship-spouse-t8-trust-grant-request-manifest.js';

export const RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-ai-assisted-internal-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID =
  'OPENAI-GPT-5.6-SOL-AI-INTERNAL-REVIEW' as const;

export const RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT =
  '2026-09-27T18:01:00.000Z' as const;

export const RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_BASE_SHA =
  '338aeeafa958dba8661fb0ba378f93bce694337e' as const;

export const RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS =
  Object.freeze([
    Object.freeze({
      attestationId: 'SPOUSE-T8-AI-INTERNAL-20260928-METHODOLOGY',
      subjectType: 'methodology',
      subjectRef: Object.freeze({
        id: 'relationship-spouse-t8-role-neutral-day-master-polarity',
        version: '1.0.1',
        contentHash: '0821e6be2f2bd18e6f40b449f9f21568a3ababf1ee29cd77f46098a50cada0e2',
      }),
      reviewLevel: 'internal',
      reviewerId: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID,
      reviewedAt: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT,
      decision: 'approved',
      notes:
        'AI-assisted internal approval for bounded Engine-development policy evaluation only. Whisper directly publishes the Yang/Yin Day-Master polarity spouse-star framework and explicitly marks the convention as school-dependent. Lee Youngeun 2025 is accepted only as methodology-level modern spouse-remapping context and is not treated as selector direct basis. This is not independent human domain review or Production authority.',
    } satisfies ReviewAttestation),
    Object.freeze({
      attestationId: 'SPOUSE-T8-AI-INTERNAL-20260928-YANG',
      subjectType: 'rule',
      subjectRef: Object.freeze({
        id: 'relationship-spouse-t8-yang-day-master',
        version: '1.0.1',
        contentHash: 'a1f18090a049dd4c2d058aa192eeb7c63a674261cf5588e8b07086f0b2d0545e',
      }),
      reviewLevel: 'internal',
      reviewerId: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID,
      reviewedAt: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT,
      decision: 'approved',
      notes:
        'AI-assisted internal approval only. The current public Whisper body directly states Yang Day Masters select Indirect Wealth (偏財) as the Spouse Star. The rule remains bounded to a role-neutral natal marker and does not authorize marriage, partner identity or sex, orientation, compatibility, second-chart, temporal expansion, or relationship-outcome claims.',
    } satisfies ReviewAttestation),
    Object.freeze({
      attestationId: 'SPOUSE-T8-AI-INTERNAL-20260928-YIN',
      subjectType: 'rule',
      subjectRef: Object.freeze({
        id: 'relationship-spouse-t8-yin-day-master',
        version: '1.0.1',
        contentHash: 'e30b63380e651b46318266063f09d333e86957c246f61a7d38f0f582841bb4bf',
      }),
      reviewLevel: 'internal',
      reviewerId: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID,
      reviewedAt: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT,
      decision: 'approved',
      notes:
        'AI-assisted internal approval only. The current public Whisper body directly states Yin Day Masters select Indirect Power (偏官) as the Spouse Star. The rule remains bounded to a role-neutral natal marker and does not authorize marriage, partner identity or sex, orientation, compatibility, second-chart, temporal expansion, or relationship-outcome claims.',
    } satisfies ReviewAttestation),
  ] as const);

function subjectKey(attestation: ReviewAttestation): string {
  return [
    attestation.subjectType,
    `${attestation.subjectRef.id}@${attestation.subjectRef.version}`,
    attestation.subjectRef.contentHash,
  ].join(':');
}

export function buildRelationshipSpouseT8AiAssistedInternalReview() {
  const subjectManifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();
  const reviewedRegistry =
    createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations(
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT,
    );
  const trustRequest = buildRelationshipSpouseT8TrustGrantRequestManifest(
    RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
    RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT,
  );

  const currentSubjectKeys = new Set(
    subjectManifest.subjects.map((subject) =>
      [
        subject.subjectType,
        `${subject.subjectRef.id}@${subject.subjectRef.version}`,
        subject.subjectRef.contentHash,
      ].join(':'),
    ),
  );
  const reviewedSubjectKeys = new Set(
    RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS.map(subjectKey),
  );

  const exactCurrentSubjectBinding =
    currentSubjectKeys.size === 3 &&
    reviewedSubjectKeys.size === 3 &&
    [...currentSubjectKeys].every((key) => reviewedSubjectKeys.has(key));

  const whisper = RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.find(
    (source) => source.sourceId === RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
  );
  const lee = RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.find(
    (source) => source.sourceId === RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
  );
  const whisperIsOnlyRuleDirectBasis =
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.length === 2 &&
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.every(
      (binding) =>
        binding.sourceRefs.length === 1 &&
        binding.sourceRefs[0]?.sourceId === RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID &&
        binding.sourceRefs[0]?.supportType === 'direct_basis',
    );

  const sourceRoleBoundaryPreserved =
    whisper?.provenanceTier === 'cross_reference' &&
    lee?.provenanceTier === 'scholarly_secondary' &&
    whisperIsOnlyRuleDirectBasis;

  const allThreeInternalApproved =
    reviewedRegistry.reviewAttestations.length === 3 &&
    reviewedRegistry.reviewAttestations.every(
      (attestation) =>
        attestation.reviewerId === RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID &&
        attestation.reviewLevel === 'internal' &&
        attestation.decision === 'approved',
    );

  const aiAssistedInternalReviewEstablished =
    exactCurrentSubjectBinding &&
    sourceRoleBoundaryPreserved &&
    allThreeInternalApproved &&
    trustRequest.domainReviewAttestationCount === 0 &&
    trustRequest.trustGrantRequestCandidateCount === 0;

  const authority = Object.freeze({
    aiAssistedInternalReviewEstablished,
    internalApprovedSubjectCount: allThreeInternalApproved ? 3 : 0,
    independentHumanDomainReviewEstablished: false as const,
    domainReviewAuthorityEstablished: false as const,
    actualReviewerTrustGrantCount: 0 as const,
    trustedDomainAttestationEstablished: false as const,
    reviewerStatusPromotionAuthorized: false as const,
    provenanceQualityPromotionAuthorized: false as const,
    lifecyclePromotionAuthorized: false as const,
    boundedEngineDevelopmentPolicyMayBeEvaluated: aiAssistedInternalReviewEstablished,
    g2aAdmitted: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_VERSION,
    issue: '#1771' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    reviewedRepositoryBaseSha:
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_BASE_SHA,
    reviewerClass: 'AI_ASSISTED_INTERNAL_REVIEW' as const,
    reviewerId: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWER_ID,
    reviewedAt: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEWED_AT,
    subjectManifestHash: subjectManifest.manifestHash,
    reviewedSubjectCount:
      RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS.length,
    exactCurrentSubjectBinding,
    sourceReview: Object.freeze({
      whisperPublicBodyRechecked: true as const,
      whisperYangSelectorObserved: true as const,
      whisperYinSelectorObserved: true as const,
      whisperSchoolDependenceObserved: true as const,
      leeKciIdentityAndAbstractRechecked: true as const,
      leeModernSpouseRemappingContextObserved: true as const,
      leePureNatalSelectorObserved: false as const,
      leeUsedAsRuleDirectBasis: false as const,
      sourceRoleBoundaryPreserved,
    }),
    attestations: RELATIONSHIP_SPOUSE_T8_AI_ASSISTED_INTERNAL_REVIEW_ATTESTATIONS,
    authority,
    prohibitedInterpretations: Object.freeze([
      'AI_INTERNAL_REVIEW_IS_NOT_INDEPENDENT_HUMAN_DOMAIN_REVIEW',
      'AI_INTERNAL_REVIEW_IS_NOT_TRUSTED_DOMAIN_ATTESTATION',
      'AI_INTERNAL_REVIEW_DOES_NOT_CREATE_REVIEWER_TRUST_GRANT',
      'AI_INTERNAL_REVIEW_DOES_NOT_PROMOTE_RULE_REVIEWER_STATUS',
      'AI_INTERNAL_REVIEW_DOES_NOT_PROMOTE_PROVENANCE_QUALITY',
      'AI_INTERNAL_REVIEW_DOES_NOT_PROMOTE_LIFECYCLE',
      'AI_INTERNAL_REVIEW_DOES_NOT_AUTHORIZE_OFFICIAL_READING',
      'AI_INTERNAL_REVIEW_DOES_NOT_AUTHORIZE_PRODUCTION',
      'SCHOOL_DEPENDENT_SELECTOR_IS_NOT_UNIVERSAL_CLASSICAL_TRUTH',
    ] as const),
    nextAction: aiAssistedInternalReviewEstablished
      ? ('EVALUATE_SEPARATE_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_POLICY' as const)
      : ('REPAIR_AI_ASSISTED_INTERNAL_REVIEW_BINDING' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
