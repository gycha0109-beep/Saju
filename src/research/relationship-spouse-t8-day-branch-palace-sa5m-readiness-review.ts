import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket,
} from './relationship-spouse-t8-day-branch-palace-external-review-handoff-packet.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest,
  evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission,
  type RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission,
} from './relationship-spouse-t8-day-branch-palace-human-domain-materiality-request.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5M_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-sa5m-readiness-review-v1' as const;

export interface RelationshipSpouseT8DayBranchPalaceSa5mReadinessReviewInput {
  readonly submission?: RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission;
}

function refsEqual(
  left: { readonly id: string; readonly version: string; readonly contentHash: string },
  right: { readonly id: string; readonly version: string; readonly contentHash: string },
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

export async function evaluateRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview(
  input: RelationshipSpouseT8DayBranchPalaceSa5mReadinessReviewInput = {},
) {
  const request =
    await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();
  const handoffPacket =
    await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();

  const exactCurrentHandoffBinding =
    handoffPacket.upstreamRequestId === request.requestId &&
    refsEqual(handoffPacket.upstreamRequestRef, request.requestRef) &&
    handoffPacket.stagingRegistrySnapshotId === request.stagingRegistrySnapshotId &&
    refsEqual(handoffPacket.stagingPackRef, request.stagingPackRef) &&
    handoffPacket.nextDisposition ===
      'AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_REVIEW_INPUTS';

  const existingAuthorityStillUnmutated =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const externalSubmissionPresent = input.submission !== undefined;
  const submissionEvaluation =
    input.submission === undefined
      ? undefined
      : await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission(
          input.submission,
        );

  const exactSa5lSubmissionAccepted =
    submissionEvaluation !== undefined &&
    submissionEvaluation.submissionReadyForLaterAuthorityMaterialization ===
      true &&
    submissionEvaluation.blockers.length === 0 &&
    submissionEvaluation.nextDisposition ===
      'RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW';

  const sa5lAuthorityStillUnmaterialized =
    submissionEvaluation === undefined ||
    (submissionEvaluation.authorityBoundary.humanDomainReviewEstablished ===
      false &&
      submissionEvaluation.authorityBoundary
        .trustedDomainAttestationMaterializedIntoRegistry === false &&
      submissionEvaluation.authorityBoundary
        .reviewerTrustGrantMaterializedIntoExecutionAuthority === false &&
      submissionEvaluation.authorityBoundary
        .narrativeMaterialityDecisionMaterialized === false &&
      submissionEvaluation.authorityBoundary.reviewerStatusPromotionAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary
        .materialForNarrativeMutationAuthorized === false &&
      submissionEvaluation.authorityBoundary.narrativeGenerationAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary.artifactAssemblyAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary.deliveryAuthorityAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary.previewAuthorityAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary
        .officialReadingAuthorityAuthorized === false &&
      submissionEvaluation.authorityBoundary.publicSemanticAuthorityAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary.productionAuthorityAuthorized ===
        false &&
      submissionEvaluation.authorityBoundary.production === 'HOLD');

  const checks = Object.freeze({
    exactCurrentHandoffBinding,
    existingAuthorityStillUnmutated,
    externalSubmissionPresent,
    exactSa5lSubmissionAccepted,
    sa5lAuthorityStillUnmaterialized,
  });

  const blockers = Object.freeze(
    [
      ...(exactCurrentHandoffBinding
        ? []
        : ['SA5M_EXACT_CURRENT_HANDOFF_BINDING_FAILED']),
      ...(existingAuthorityStillUnmutated
        ? []
        : ['SA5M_EXISTING_AUTHORITY_ALREADY_MUTATED']),
      ...(externalSubmissionPresent
        ? []
        : ['SA5M_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_REQUIRED']),
      ...(externalSubmissionPresent && !exactSa5lSubmissionAccepted
        ? ['SA5M_SA5L_VALIDATED_SUBMISSION_REQUIRED']
        : []),
      ...(sa5lAuthorityStillUnmaterialized
        ? []
        : ['SA5M_UPSTREAM_AUTHORITY_BOUNDARY_ALREADY_MUTATED']),
    ].sort(),
  );

  const sa5mMaterializationReviewMayBegin = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5M_READINESS_REVIEW_VERSION,
    issue: '#1935' as const,
    track: 'saju-bridge' as const,
    capabilityKey: request.capabilityKey,
    semanticFamily: request.semanticFamily,
    semanticVersion: request.semanticVersion,
    semanticScope: request.semanticScope,
    upstreamRequestId: request.requestId,
    upstreamRequestRef: Object.freeze({ ...request.requestRef }),
    handoffPacketId: handoffPacket.packetId,
    stagingRegistrySnapshotId: request.stagingRegistrySnapshotId,
    stagingPackRef: Object.freeze({ ...request.stagingPackRef }),
    externalSubmissionPresent,
    upstreamSubmissionId: submissionEvaluation?.submissionId,
    upstreamSubmissionBlockers: Object.freeze([
      ...(submissionEvaluation?.blockers ?? []),
    ]),
    checks,
    blockers,
    readinessState: sa5mMaterializationReviewMayBegin
      ? ('ELIGIBLE_FOR_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW' as const)
      : ('BLOCKED_PENDING_OR_INVALID_EXTERNAL_HUMAN_DOMAIN_SUBMISSION' as const),
    sa5mMaterializationReviewMayBegin,
    authorityBoundary: Object.freeze({
      readinessReviewEstablished: true as const,
      externalHumanSubmissionValidated: exactSa5lSubmissionAccepted,
      humanDomainReviewMaterialized: false as const,
      reviewAttestationMaterializedIntoRegistry: false as const,
      reviewerTrustContextMaterializedIntoExecutionAuthority: false as const,
      reviewerTrustGrantMaterializedIntoExecutionAuthority: false as const,
      narrativeMaterialityDecisionMaterialized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      materialForNarrativeMutationAuthorized: false as const,
      claimNarrativeProfileCreationAuthorized: false as const,
      narrativeProfileAuthorityEstablished: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      sa5mAuthorityMaterializationAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: sa5mMaterializationReviewMayBegin
      ? ('DESIGN_AND_RUN_SEPARATE_SA_5M_AUTHORITY_MATERIALIZATION_REVIEW' as const)
      : ('AWAIT_OR_REPAIR_REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION' as const),
  });

  return Object.freeze({
    readinessReviewId: deterministicContentHash(material),
    ...material,
  });
}

export async function buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview() {
  return evaluateRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview();
}
