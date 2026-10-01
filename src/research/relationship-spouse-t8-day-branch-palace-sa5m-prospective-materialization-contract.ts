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
} from './relationship-spouse-t8-day-branch-palace-human-domain-materiality-request.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview,
} from './relationship-spouse-t8-day-branch-palace-sa5m-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5M_PROSPECTIVE_MATERIALIZATION_CONTRACT_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-sa5m-prospective-materialization-contract-v1' as const;

const PROSPECTIVE_MUTATION_IDS = Object.freeze([
  'REGISTER_EXACT_TWO_APPROVED_DOMAIN_REVIEW_ATTESTATIONS',
  'PROMOTE_RULE_REVIEWER_STATUS_UNREVIEWED_TO_DOMAIN_REVIEWED',
  'ENABLE_EXACT_POSITION_ONLY_CLAIM_MATERIAL_FOR_NARRATIVE',
] as const);

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

export async function buildRelationshipSpouseT8DayBranchPalaceSa5mProspectiveMaterializationContract() {
  const request =
    await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();
  const handoff =
    await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();
  const readiness =
    await buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview();

  const exactRequestAndHandoffBinding =
    handoff.upstreamRequestId === request.requestId &&
    refsEqual(handoff.upstreamRequestRef, request.requestRef) &&
    handoff.stagingRegistrySnapshotId === request.stagingRegistrySnapshotId &&
    refsEqual(handoff.stagingPackRef, request.stagingPackRef) &&
    handoff.nextDisposition ===
      'AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_REVIEW_INPUTS';

  const exactReadinessFailClosedBoundary =
    readiness.upstreamRequestId === request.requestId &&
    refsEqual(readiness.upstreamRequestRef, request.requestRef) &&
    readiness.handoffPacketId === handoff.packetId &&
    readiness.externalSubmissionPresent === false &&
    readiness.sa5mMaterializationReviewMayBegin === false &&
    readiness.readinessState ===
      'BLOCKED_PENDING_OR_INVALID_EXTERNAL_HUMAN_DOMAIN_SUBMISSION' &&
    readiness.blockers.includes(
      'SA5M_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_REQUIRED',
    ) &&
    readiness.nextDisposition ===
      'AWAIT_OR_REPAIR_REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION';

  const exactCurrentAuthorityBoundary =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK.status === 'staging' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const exactPositionOnlyBoundary =
    request.claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    request.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    request.semanticVersion === '2.0.0' &&
    request.semanticScope === 'position_only' &&
    request.materialityDecisionRequirements.allowedNarrativeProposition
      .position === 'day_branch' &&
    request.materialityDecisionRequirements.allowedNarrativeProposition
      .traditionalRole === 'spouse_palace' &&
    request.materialityDecisionRequirements.allowedNarrativeProposition
      .semanticScope === 'position_only' &&
    request.materialityDecisionRequirements.prohibitedExtensions.length === 10;

  const exactFutureReviewRequirements =
    request.requiredAttestationCount === 2 &&
    request.requiredReviewLevel === 'domain' &&
    request.requiredReviewDecision === 'approved' &&
    request.reviewerTrustRequirements.activeGrantRequired === true &&
    request.reviewerTrustRequirements.domainReviewLevelRequired === true &&
    request.reviewerTrustRequirements.exactAttestationHashPinRequired === true &&
    request.materialityDecisionRequirements.decision ===
      'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY' &&
    request.materialityDecisionRequirements.decisionAuthority ===
      'TRUSTED_HUMAN_DOMAIN_REVIEWER';

  const checks = Object.freeze({
    exactRequestAndHandoffBinding,
    exactReadinessFailClosedBoundary,
    exactCurrentAuthorityBoundary,
    exactPositionOnlyBoundary,
    exactFutureReviewRequirements,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5M_CONTRACT_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const prospectiveMaterializationRulesFrozen = blockers.length === 0;

  const prospectiveMutationPlan = Object.freeze({
    mutationIds: PROSPECTIVE_MUTATION_IDS,
    mutationCount: 3 as const,
    reviewAttestationRegistration: Object.freeze({
      currentCount: 0 as const,
      targetCountIfLaterAuthorized: 2 as const,
      exactSubjects: Object.freeze(
        request.subjects.map((subject) =>
          Object.freeze({
            subjectType: subject.subjectType,
            subjectRef: Object.freeze({ ...subject.subjectRef }),
            requiredReviewLevel: 'domain' as const,
            requiredDecision: 'approved' as const,
          }),
        ),
      ),
      mustBeExternallySupplied: true as const,
      exactAttestationHashPinRequired: true as const,
      authorizedByThisContract: false as const,
    }),
    reviewerStatus: Object.freeze({
      current: 'unreviewed' as const,
      targetIfLaterAuthorized: 'domain_reviewed' as const,
      authorizedByThisContract: false as const,
    }),
    narrativeMateriality: Object.freeze({
      claimType: request.claimType,
      currentMaterialForNarrative: false as const,
      targetMaterialForNarrativeIfLaterAuthorized: true as const,
      semanticScope: 'position_only' as const,
      allowedNarrativeProposition: Object.freeze({
        ...request.materialityDecisionRequirements.allowedNarrativeProposition,
      }),
      prohibitedExtensions: Object.freeze([
        ...request.materialityDecisionRequirements.prohibitedExtensions,
      ]),
      authorizedByThisContract: false as const,
    }),
    preservedAuthority: Object.freeze({
      methodologyLifecycle: 'reviewed' as const,
      ruleLifecycle: 'reviewed' as const,
      packLifecycle: 'staging' as const,
      provenanceQuality: 'multi_source_supported' as const,
    }),
  });

  const material = Object.freeze({
    contractVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5M_PROSPECTIVE_MATERIALIZATION_CONTRACT_VERSION,
    issue: '#1941' as const,
    track: 'saju-bridge' as const,
    purpose:
      'FREEZE_FUTURE_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_RULES_ONLY' as const,
    capabilityKey: request.capabilityKey,
    semanticFamily: request.semanticFamily,
    semanticVersion: request.semanticVersion,
    semanticScope: request.semanticScope,
    claimType: request.claimType,
    upstreamRequestId: request.requestId,
    upstreamRequestRef: Object.freeze({ ...request.requestRef }),
    upstreamHandoffPacketId: handoff.packetId,
    upstreamReadinessReviewId: readiness.readinessReviewId,
    stagingRegistrySnapshotId: request.stagingRegistrySnapshotId,
    stagingPackRef: Object.freeze({ ...request.stagingPackRef }),
    checks,
    blockers,
    prospectiveMaterializationRulesFrozen,
    requiredValidationPipeline: Object.freeze([
      'REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_SUPPLIED',
      'SA_5L_EXTERNAL_SUBMISSION_VALIDATOR_PASS',
      'SA_5M_READINESS_GATE_PASS_WITH_EXACT_SUBMISSION',
      'SEPARATE_MATERIALIZATION_RECORD_REVIEW_REQUIRED',
    ] as const),
    prospectiveMutationPlan,
    currentState: Object.freeze({
      externalHumanDomainSubmissionPresent: false as const,
      externalHumanDomainSubmissionValidated: false as const,
      materializationRecordPresent: false as const,
      authorityMaterialized: false as const,
    }),
    authorityBoundary: Object.freeze({
      prospectiveContractEstablished:
        prospectiveMaterializationRulesFrozen,
      syntheticFixtureMaySatisfyAuthority: false as const,
      repositoryControlledDataMayCreateReviewAttestation: false as const,
      reviewerTrustContextCreationAuthorized: false as const,
      reviewerTrustGrantCreationAuthorized: false as const,
      reviewAttestationRegistrationAuthorized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      materialForNarrativeMutationAuthorized: false as const,
      humanDomainReviewMaterialized: false as const,
      narrativeMaterialityDecisionMaterialized: false as const,
      claimNarrativeProfileCreationAuthorized: false as const,
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
    nextDisposition: prospectiveMaterializationRulesFrozen
      ? ('AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_THEN_RUN_SEPARATE_SA_5M_MATERIALIZATION_RECORD_REVIEW' as const)
      : ('REPAIR_SA_5M_PROSPECTIVE_MATERIALIZATION_CONTRACT' as const),
  });

  return Object.freeze({
    contractId: deterministicContentHash(material),
    ...material,
  });
}
