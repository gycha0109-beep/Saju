import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AiAssistedInternalReview } from './relationship-spouse-t8-ai-assisted-internal-review.js';
import { buildRelationshipSpouseT8DomainReviewSubjectManifest } from './relationship-spouse-t8-domain-review-subject-manifest.js';
import { buildRelationshipSpouseT8EngineGovernanceHandoff } from './relationship-spouse-t8-engine-governance-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_VERSION =
  'myeonghwa-relationship-spouse-t8-bounded-engine-development-admission-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_DECISION =
  'APPROVE_BOUNDED_ENGINE_DEVELOPMENT_ONLY' as const;

export interface RelationshipSpouseT8BoundedEngineDevelopmentSubject {
  readonly subjectType: 'methodology' | 'rule';
  readonly subjectRef: ContentAddressedVersionedRef;
}

export interface RelationshipSpouseT8BoundedEngineDevelopmentReviewedSubject
  extends RelationshipSpouseT8BoundedEngineDevelopmentSubject {
  readonly reviewLevel: 'internal' | 'domain';
  readonly decision: 'approved' | 'rejected';
}

export interface RelationshipSpouseT8BoundedEngineDevelopmentAdmissionInput {
  readonly projectOwnerDecision:
    | typeof RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_DECISION
    | 'NOT_APPROVED';
  readonly capabilityKey: string;
  readonly runtimeVersion: string;
  readonly runtimeScope: string;
  readonly sourceBindingMaterialized: boolean;
  readonly registrySnapshotId: string;
  readonly methodologyRef: ContentAddressedVersionedRef;
  readonly currentSubjects:
    readonly RelationshipSpouseT8BoundedEngineDevelopmentSubject[];
  readonly reviewedSubjects:
    readonly RelationshipSpouseT8BoundedEngineDevelopmentReviewedSubject[];
  readonly sourceRoleBoundaryPreserved: boolean;
  readonly exactCurrentSubjectBinding: boolean;
  readonly aiAssistedInternalReviewEstablished: boolean;
  readonly independentHumanDomainReviewEstablished: boolean;
  readonly domainReviewAuthorityEstablished: boolean;
  readonly trustedDomainAttestationEstablished: boolean;
  readonly actualReviewerTrustGrantCount: number;
  readonly lifecyclePromotionAuthorized: boolean;
  readonly officialReadingAuthorityAuthorized: boolean;
  readonly productionAdmissionAuthority: boolean;
  readonly production: 'HOLD' | 'READY';
  readonly governedClaimBoundary: {
    readonly requiredInputs: readonly string[];
    readonly canonicalSelectorInput: string;
    readonly allowedClaims: readonly string[];
    readonly forbiddenClaims: readonly string[];
    readonly runtimePrerequisites: readonly string[];
    readonly negativeCases: readonly string[];
  };
}

function subjectKey(
  subject: RelationshipSpouseT8BoundedEngineDevelopmentSubject,
): string {
  return [
    subject.subjectType,
    `${subject.subjectRef.id}@${subject.subjectRef.version}`,
    subject.subjectRef.contentHash,
  ].join(':');
}

function sortRefs(
  refs: readonly ContentAddressedVersionedRef[],
): readonly ContentAddressedVersionedRef[] {
  return Object.freeze(
    [...refs].sort((left, right) =>
      `${left.id}@${left.version}`.localeCompare(
        `${right.id}@${right.version}`,
      ),
    ),
  );
}

function contentAddressedRef(
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

export function evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission(
  input: RelationshipSpouseT8BoundedEngineDevelopmentAdmissionInput,
) {
  const currentSubjectKeys = new Set(input.currentSubjects.map(subjectKey));
  const reviewedSubjectKeys = new Set(input.reviewedSubjects.map(subjectKey));

  const exactThreeSubjectBinding =
    input.currentSubjects.length === 3 &&
    input.reviewedSubjects.length === 3 &&
    currentSubjectKeys.size === 3 &&
    reviewedSubjectKeys.size === 3 &&
    [...currentSubjectKeys].every((key) => reviewedSubjectKeys.has(key));

  const allThreeInternalApproved =
    input.reviewedSubjects.length === 3 &&
    input.reviewedSubjects.every(
      (subject) =>
        subject.reviewLevel === 'internal' &&
        subject.decision === 'approved',
    );

  const authoritySeparationPreserved =
    input.independentHumanDomainReviewEstablished === false &&
    input.domainReviewAuthorityEstablished === false &&
    input.trustedDomainAttestationEstablished === false &&
    input.actualReviewerTrustGrantCount === 0 &&
    input.lifecyclePromotionAuthorized === false &&
    input.officialReadingAuthorityAuthorized === false &&
    input.productionAdmissionAuthority === false &&
    input.production === 'HOLD';

  const runtimeBindingReady =
    input.capabilityKey === 'relationship:natal:spouse' &&
    input.runtimeVersion === RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION &&
    input.runtimeScope === 'isolated_research_only' &&
    input.sourceBindingMaterialized === true &&
    input.registrySnapshotId.trim().length > 0;

  const reviewBindingReady =
    input.exactCurrentSubjectBinding === true &&
    exactThreeSubjectBinding &&
    input.sourceRoleBoundaryPreserved === true &&
    input.aiAssistedInternalReviewEstablished === true &&
    allThreeInternalApproved;

  const boundedEngineDevelopmentAdmitted =
    input.projectOwnerDecision ===
      RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_DECISION &&
    runtimeBindingReady &&
    reviewBindingReady &&
    authoritySeparationPreserved;

  const ruleRefs = sortRefs(
    input.currentSubjects
      .filter((subject) => subject.subjectType === 'rule')
      .map((subject) => subject.subjectRef),
  );

  const ruleClaimContractMaterial = Object.freeze({
    contractVersion:
      'myeonghwa-relationship-spouse-t8-bounded-rule-claim-contract-v1' as const,
    capabilityKey: input.capabilityKey,
    registrySnapshotId: input.registrySnapshotId,
    methodologyRef: Object.freeze({ ...input.methodologyRef }),
    ruleRefs,
    governedClaimBoundary: input.governedClaimBoundary,
  });

  const ruleClaimContractRef = contentAddressedRef(
    'relationship-spouse-t8-bounded-rule-claim-contract',
    '1.0.0',
    ruleClaimContractMaterial,
  );

  const developmentScope = Object.freeze({
    engineProducerRuntimeDevelopment: boundedEngineDevelopmentAdmitted,
    engineCompositionDevelopment: boundedEngineDevelopmentAdmitted,
    deterministicGuardDevelopment: boundedEngineDevelopmentAdmitted,
    engineE2EDevelopment: boundedEngineDevelopmentAdmitted,
    previewExpansionAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    publicSemanticAuthorityAuthorized: false as const,
    productionAdmissionAuthorized: false as const,
  });

  const admissionMaterial = Object.freeze({
    admissionVersion:
      RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_VERSION,
    issue: '#1774' as const,
    projectOwnerDecision: input.projectOwnerDecision,
    capabilityKey: input.capabilityKey,
    runtimeVersion: input.runtimeVersion,
    runtimeScope: input.runtimeScope,
    registrySnapshotId: input.registrySnapshotId,
    methodologyRef: Object.freeze({ ...input.methodologyRef }),
    ruleClaimContractRef,
    currentSubjectRefs: Object.freeze(
      input.currentSubjects
        .map((subject) =>
          Object.freeze({
            subjectType: subject.subjectType,
            subjectRef: Object.freeze({ ...subject.subjectRef }),
          }),
        )
        .sort((left, right) =>
          subjectKey(left).localeCompare(subjectKey(right)),
        ),
    ),
    reviewEvidence: Object.freeze({
      exactCurrentSubjectBinding: input.exactCurrentSubjectBinding,
      exactThreeSubjectBinding,
      sourceRoleBoundaryPreserved: input.sourceRoleBoundaryPreserved,
      aiAssistedInternalReviewEstablished:
        input.aiAssistedInternalReviewEstablished,
      allThreeInternalApproved,
      independentHumanDomainReviewEstablished:
        input.independentHumanDomainReviewEstablished,
      domainReviewAuthorityEstablished: input.domainReviewAuthorityEstablished,
      trustedDomainAttestationEstablished:
        input.trustedDomainAttestationEstablished,
      actualReviewerTrustGrantCount: input.actualReviewerTrustGrantCount,
    }),
    runtimeBindingReady,
    reviewBindingReady,
    authoritySeparationPreserved,
    boundedEngineDevelopmentAdmitted,
    developmentScope,
    authorityBoundary: Object.freeze({
      aiInternalReviewIsHumanDomainReview: false as const,
      aiInternalReviewCreatesReviewerTrustGrant: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  const admissionId = deterministicContentHash(admissionMaterial);
  const admittedAuthorityRef = boundedEngineDevelopmentAdmitted
    ? contentAddressedRef(
        'relationship-spouse-t8-bounded-engine-development-admission',
        '1.0.0',
        admissionMaterial,
      )
    : undefined;

  return Object.freeze({
    admissionId,
    ...admissionMaterial,
    admittedAuthorityRef,
    admittedMethodologyRef: boundedEngineDevelopmentAdmitted
      ? Object.freeze({ ...input.methodologyRef })
      : undefined,
    admittedRuleClaimContractRef: boundedEngineDevelopmentAdmitted
      ? ruleClaimContractRef
      : undefined,
    nextDisposition: boundedEngineDevelopmentAdmitted
      ? ('BUILD_SEPARATE_G2A_ADMITTED_HANDOFF' as const)
      : ('HOLD_AUTHORITY_AND_REFRESH_REVIEW_OR_BINDING' as const),
  });
}

export function buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission() {
  const subjectManifest =
    buildRelationshipSpouseT8DomainReviewSubjectManifest();
  const aiReview = buildRelationshipSpouseT8AiAssistedInternalReview();
  const governanceHandoff =
    buildRelationshipSpouseT8EngineGovernanceHandoff();

  const methodologySubject = subjectManifest.subjects.find(
    (subject) => subject.subjectType === 'methodology',
  );
  if (methodologySubject === undefined) {
    throw new Error('Spouse T8 bounded Engine admission requires one methodology subject.');
  }

  return evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
    projectOwnerDecision:
      RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_DECISION,
    capabilityKey: aiReview.capabilityKey,
    runtimeVersion: subjectManifest.runtimeVersion,
    runtimeScope:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.runtimeScope,
    sourceBindingMaterialized:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.sourceBindingMaterialized,
    registrySnapshotId: subjectManifest.registrySnapshotId,
    methodologyRef: methodologySubject.subjectRef,
    currentSubjects: subjectManifest.subjects,
    reviewedSubjects: aiReview.attestations.map((attestation) =>
      Object.freeze({
        subjectType: attestation.subjectType,
        subjectRef: Object.freeze({ ...attestation.subjectRef }),
        reviewLevel: attestation.reviewLevel,
        decision: attestation.decision,
      }),
    ),
    sourceRoleBoundaryPreserved:
      aiReview.sourceReview.sourceRoleBoundaryPreserved,
    exactCurrentSubjectBinding: aiReview.exactCurrentSubjectBinding,
    aiAssistedInternalReviewEstablished:
      aiReview.authority.aiAssistedInternalReviewEstablished,
    independentHumanDomainReviewEstablished:
      aiReview.authority.independentHumanDomainReviewEstablished,
    domainReviewAuthorityEstablished:
      aiReview.authority.domainReviewAuthorityEstablished,
    trustedDomainAttestationEstablished:
      aiReview.authority.trustedDomainAttestationEstablished,
    actualReviewerTrustGrantCount:
      aiReview.authority.actualReviewerTrustGrantCount,
    lifecyclePromotionAuthorized:
      aiReview.authority.lifecyclePromotionAuthorized,
    officialReadingAuthorityAuthorized:
      aiReview.authority.officialReadingAuthorityAuthorized,
    productionAdmissionAuthority:
      aiReview.authority.productionAdmissionAuthority,
    production: aiReview.authority.production,
    governedClaimBoundary: governanceHandoff.governedClaimBoundary,
  });
}
