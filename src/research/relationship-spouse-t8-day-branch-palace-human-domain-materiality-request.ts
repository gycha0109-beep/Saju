import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { ReviewAttestation } from '../contracts/interpretation.js';
import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  normalizeReviewerTrustContext,
  reviewerIsTrustedForLevel,
  reviewerTrustPolicyRef,
  reviewerTrustsAttestation,
  type ReviewerTrustContext,
} from '../interpretation/reviewer-trust.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_HUMAN_DOMAIN_MATERIALITY_REQUEST_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-human-domain-materiality-request-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL =
  'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY' as const;

const PROHIBITED_NARRATIVE_EXTENSIONS = Object.freeze([
  'spouse_star_selection',
  'partner_personality',
  'partner_identity',
  'marriage_timing',
  'marriage_outcome',
  'relationship_outcome',
  'favorable_unfavorable_palace_judgment',
  'yongshin_jisin_semantics',
  'second_chart_compatibility',
  'sex_scoped_spouse_role_expansion',
] as const);

function refsEqual(
  left: ContentAddressedVersionedRef,
  right: ContentAddressedVersionedRef,
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function exactStrings(
  left: readonly string[],
  right: readonly string[],
): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function contentRef(
  id: string,
  version: string,
  material: unknown,
): ContentAddressedVersionedRef {
  return Object.freeze({
    id,
    version,
    contentHash: deterministicContentHash(material),
  });
}

function currentAuthorityReviewIntegrityValid(
  review: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview
    >
  >,
): boolean {
  const {
    reviewId: declaredReviewId,
    governedExecution: _governedExecution,
    delivery: _delivery,
    ...material
  } = review;
  void _governedExecution;
  void _delivery;
  return deterministicContentHash(material) === declaredReviewId;
}

export interface RelationshipSpouseT8DayBranchPalaceHumanDomainReviewSubject {
  readonly subjectType: 'methodology' | 'rule';
  readonly subjectRef: ContentAddressedVersionedRef;
  readonly requiredReviewLevel: 'domain';
  readonly requiredDecision: 'approved';
  readonly attestationState: 'absent';
}

export interface RelationshipSpouseT8DayBranchPalaceNarrativeMaterialityDecision {
  readonly decision:
    | typeof RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL
    | 'REJECT_NARRATIVE_MATERIALITY';
  readonly reviewerId: string;
  readonly decidedAt: string;
  readonly requestId: string;
  readonly claimType: typeof RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE;
  readonly semanticFamily:
    'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION';
  readonly semanticVersion: '2.0.0';
  readonly semanticScope: 'position_only';
  readonly allowedNarrativeProposition: {
    readonly position: 'day_branch';
    readonly traditionalRole: 'spouse_palace';
    readonly semanticScope: 'position_only';
  };
  readonly prohibitedExtensions: readonly string[];
  readonly notes?: string;
}

export interface RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission {
  readonly request: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest
    >
  >;
  readonly reviewAttestations: readonly ReviewAttestation[];
  readonly reviewerTrustContext: ReviewerTrustContext;
  readonly materialityDecision: RelationshipSpouseT8DayBranchPalaceNarrativeMaterialityDecision;
}

function freezeSubject(
  subjectType: RelationshipSpouseT8DayBranchPalaceHumanDomainReviewSubject['subjectType'],
  subjectRef: ContentAddressedVersionedRef,
): RelationshipSpouseT8DayBranchPalaceHumanDomainReviewSubject {
  return Object.freeze({
    subjectType,
    subjectRef: Object.freeze({ ...subjectRef }),
    requiredReviewLevel: 'domain' as const,
    requiredDecision: 'approved' as const,
    attestationState: 'absent' as const,
  });
}

export async function buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest() {
  const authorityReview =
    await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

  if (
    !currentAuthorityReviewIntegrityValid(authorityReview) ||
    authorityReview.authorityReviewCompleted !== true ||
    authorityReview.decision !== 'HOLD_NARRATIVE_AND_DELIVERY_AUTHORITY' ||
    authorityReview.narrativeEligibilityEstablished !== false ||
    authorityReview.deliveryAuthorityEstablished !== false ||
    authorityReview.nextDisposition !==
      'REQUEST_SA_5L_EXPLICIT_HUMAN_DOMAIN_NARRATIVE_MATERIALITY_DECISION'
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch human/domain materiality request requires the exact completed SA-5K HOLD review.',
    );
  }

  if (
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
      .methodologies.length !== 1 ||
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.rules
      .length !== 1 ||
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length !== 0 ||
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus !== 'unreviewed' ||
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative !== false
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch human/domain materiality request requires the exact unreviewed, non-narrative staging boundary.',
    );
  }

  const methodologyRef =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
      .methodologies[0];
  const ruleRef =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.rules[0];

  if (methodologyRef === undefined || ruleRef === undefined) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch staging registry must expose one methodology and one rule subject.',
    );
  }

  const subjects = Object.freeze([
    freezeSubject('methodology', methodologyRef),
    freezeSubject('rule', ruleRef),
  ]);

  const material = Object.freeze({
    requestVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_HUMAN_DOMAIN_MATERIALITY_REQUEST_VERSION,
    issue: '#1920' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    semanticScope: 'position_only' as const,
    upstreamAuthorityReviewId: authorityReview.reviewId,
    upstreamConsumerAdmissionId: authorityReview.upstreamConsumerAdmissionId,
    upstreamExecutionAuthorityRef: Object.freeze({
      ...authorityReview.upstreamExecutionAuthorityRef,
    }),
    governedEvidenceHash: authorityReview.governedEvidenceHash,
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    stagingPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .packRef,
    }),
    requiredReviewLevel: 'domain' as const,
    requiredReviewDecision: 'approved' as const,
    subjects,
    requiredAttestationCount: 2 as const,
    currentAttestationCount:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations.length,
    reviewerTrustRequirements: Object.freeze({
      activeGrantRequired: true as const,
      domainReviewLevelRequired: true as const,
      exactAttestationHashPinRequired: true as const,
    }),
    materialityDecisionRequirements: Object.freeze({
      decision:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
      decisionAuthority: 'TRUSTED_HUMAN_DOMAIN_REVIEWER' as const,
      claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      semanticScope: 'position_only' as const,
      allowedNarrativeProposition: Object.freeze({
        position: 'day_branch' as const,
        traditionalRole: 'spouse_palace' as const,
        semanticScope: 'position_only' as const,
      }),
      prohibitedExtensions: PROHIBITED_NARRATIVE_EXTENSIONS,
    }),
    requestState: 'PENDING_EXTERNAL_HUMAN_DOMAIN_REVIEW' as const,
    authorityBoundary: Object.freeze({
      requestManifestEstablished: true as const,
      humanDomainReviewEstablished: false as const,
      trustedDomainAttestationEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      narrativeMaterialityDecisionEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      materialForNarrativeMutationAuthorized: false as const,
      narrativeProfileAuthorityEstablished: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    requestId: deterministicContentHash(material),
    requestRef: contentRef(
      'relationship-spouse-t8-day-branch-palace-human-domain-narrative-materiality-request',
      '1.0.0',
      material,
    ),
    ...material,
  });
}

function exactRequestIntegrityValid(
  request: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest
    >
  >,
): boolean {
  const {
    requestId: declaredRequestId,
    requestRef,
    ...material
  } = request;
  return (
    deterministicContentHash(material) === declaredRequestId &&
    requestRef.contentHash === deterministicContentHash(material) &&
    requestRef.id ===
      'relationship-spouse-t8-day-branch-palace-human-domain-narrative-materiality-request' &&
    requestRef.version === '1.0.0'
  );
}

function attestationMatchesSubject(
  attestation: ReviewAttestation,
  subject: RelationshipSpouseT8DayBranchPalaceHumanDomainReviewSubject,
): boolean {
  return (
    attestation.subjectType === subject.subjectType &&
    refsEqual(attestation.subjectRef, subject.subjectRef) &&
    attestation.reviewLevel === 'domain' &&
    attestation.decision === 'approved' &&
    attestation.attestationId.trim().length > 0 &&
    attestation.reviewerId.trim().length > 0 &&
    !Number.isNaN(Date.parse(attestation.reviewedAt))
  );
}

function normalizeTrustContextSafe(
  context: ReviewerTrustContext,
): ReviewerTrustContext | undefined {
  try {
    return normalizeReviewerTrustContext(context);
  } catch {
    return undefined;
  }
}

export async function evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission(
  input: RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission,
) {
  const currentRequest =
    await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();
  const request = input.request;

  const requestIntegrityValid = exactRequestIntegrityValid(request);
  const exactRequestBinding =
    requestIntegrityValid &&
    request.requestId === currentRequest.requestId &&
    refsEqual(request.requestRef, currentRequest.requestRef) &&
    request.upstreamAuthorityReviewId ===
      currentRequest.upstreamAuthorityReviewId &&
    request.stagingRegistrySnapshotId ===
      currentRequest.stagingRegistrySnapshotId &&
    refsEqual(request.stagingPackRef, currentRequest.stagingPackRef);

  const exactAttestationCount =
    input.reviewAttestations.length === request.requiredAttestationCount;

  const methodologySubject = request.subjects.find(
    (subject) => subject.subjectType === 'methodology',
  );
  const ruleSubject = request.subjects.find(
    (subject) => subject.subjectType === 'rule',
  );

  const methodologyAttestation =
    methodologySubject === undefined
      ? undefined
      : input.reviewAttestations.find((attestation) =>
          attestationMatchesSubject(attestation, methodologySubject),
        );
  const ruleAttestation =
    ruleSubject === undefined
      ? undefined
      : input.reviewAttestations.find((attestation) =>
          attestationMatchesSubject(attestation, ruleSubject),
        );

  const exactDomainAttestations =
    methodologySubject !== undefined &&
    ruleSubject !== undefined &&
    methodologyAttestation !== undefined &&
    ruleAttestation !== undefined &&
    methodologyAttestation.attestationId !== ruleAttestation.attestationId &&
    exactAttestationCount;

  const normalizedTrustContext =
    normalizeTrustContextSafe(input.reviewerTrustContext);

  const trustedDomainAttestations =
    normalizedTrustContext !== undefined &&
    methodologyAttestation !== undefined &&
    ruleAttestation !== undefined &&
    reviewerIsTrustedForLevel(
      normalizedTrustContext,
      methodologyAttestation.reviewerId,
      'domain',
    ) &&
    reviewerIsTrustedForLevel(
      normalizedTrustContext,
      ruleAttestation.reviewerId,
      'domain',
    ) &&
    reviewerTrustsAttestation(
      normalizedTrustContext,
      methodologyAttestation,
    ) &&
    reviewerTrustsAttestation(
      normalizedTrustContext,
      ruleAttestation,
    );

  const materialityDecision = input.materialityDecision;
  const decisionReviewerTrustedForDomain =
    normalizedTrustContext !== undefined &&
    reviewerIsTrustedForLevel(
      normalizedTrustContext,
      materialityDecision.reviewerId,
      'domain',
    );

  const decisionReviewerParticipatedInDomainReview =
    methodologyAttestation !== undefined &&
    ruleAttestation !== undefined &&
    [methodologyAttestation.reviewerId, ruleAttestation.reviewerId].includes(
      materialityDecision.reviewerId,
    );

  const exactMaterialityDecision =
    materialityDecision.decision ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL &&
    materialityDecision.reviewerId.trim().length > 0 &&
    !Number.isNaN(Date.parse(materialityDecision.decidedAt)) &&
    materialityDecision.requestId === request.requestId &&
    materialityDecision.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    materialityDecision.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    materialityDecision.semanticVersion === '2.0.0' &&
    materialityDecision.semanticScope === 'position_only' &&
    deterministicContentHash(materialityDecision.allowedNarrativeProposition) ===
      deterministicContentHash(
        request.materialityDecisionRequirements.allowedNarrativeProposition,
      ) &&
    exactStrings(
      materialityDecision.prohibitedExtensions,
      request.materialityDecisionRequirements.prohibitedExtensions,
    ) &&
    decisionReviewerTrustedForDomain &&
    decisionReviewerParticipatedInDomainReview;

  const existingAuthorityStillUnmutated =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const checks = Object.freeze({
    requestIntegrityValid,
    exactRequestBinding,
    exactAttestationCount,
    exactDomainAttestations,
    reviewerTrustContextValid: normalizedTrustContext !== undefined,
    trustedDomainAttestations,
    decisionReviewerTrustedForDomain,
    decisionReviewerParticipatedInDomainReview,
    exactMaterialityDecision,
    existingAuthorityStillUnmutated,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5L_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const submissionReadyForLaterAuthorityMaterialization =
    blockers.length === 0;

  const materialityDecisionRef =
    submissionReadyForLaterAuthorityMaterialization
      ? contentRef(
          'relationship-spouse-t8-day-branch-palace-human-domain-narrative-materiality-decision',
          '1.0.0',
          materialityDecision,
        )
      : undefined;

  const reviewerTrustRef =
    normalizedTrustContext === undefined
      ? undefined
      : reviewerTrustPolicyRef(normalizedTrustContext);

  const material = Object.freeze({
    requestId: request.requestId,
    requestRef: request.requestRef,
    stagingRegistrySnapshotId: request.stagingRegistrySnapshotId,
    stagingPackRef: request.stagingPackRef,
    methodologyAttestationHash:
      methodologyAttestation === undefined
        ? undefined
        : deterministicContentHash(methodologyAttestation),
    ruleAttestationHash:
      ruleAttestation === undefined
        ? undefined
        : deterministicContentHash(ruleAttestation),
    reviewerTrustRef,
    materialityDecisionRef,
    checks,
    blockers,
    submissionReadyForLaterAuthorityMaterialization,
    authorityBoundary: Object.freeze({
      externalHumanInputsStructurallyAccepted:
        submissionReadyForLaterAuthorityMaterialization,
      humanDomainReviewEstablished: false as const,
      trustedDomainAttestationMaterializedIntoRegistry: false as const,
      reviewerTrustGrantMaterializedIntoExecutionAuthority: false as const,
      narrativeMaterialityDecisionMaterialized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      materialForNarrativeMutationAuthorized: false as const,
      narrativeProfileAuthorityEstablished: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: submissionReadyForLaterAuthorityMaterialization
      ? ('RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW' as const)
      : ('HOLD_PENDING_OR_REPAIR_EXTERNAL_HUMAN_DOMAIN_SUBMISSION' as const),
  });

  return Object.freeze({
    submissionId: deterministicContentHash(material),
    ...material,
  });
}
