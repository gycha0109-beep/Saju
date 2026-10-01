import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
  buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest,
} from './relationship-spouse-t8-day-branch-palace-human-domain-materiality-request.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_EXTERNAL_REVIEW_HANDOFF_PACKET_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-external-review-handoff-packet-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket() {
  const request =
    await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();

  if (
    request.requestState !== 'PENDING_EXTERNAL_HUMAN_DOMAIN_REVIEW' ||
    request.requiredReviewLevel !== 'domain' ||
    request.requiredReviewDecision !== 'approved' ||
    request.requiredAttestationCount !== 2 ||
    request.currentAttestationCount !== 0 ||
    request.authorityBoundary.humanDomainReviewEstablished !== false ||
    request.authorityBoundary.reviewerTrustGrantEstablished !== false ||
    request.authorityBoundary.materialForNarrativeMutationAuthorized !== false ||
    request.authorityBoundary.production !== 'HOLD'
  ) {
    throw new Error(
      'Relationship Spouse T8 external review handoff packet requires the exact pending SA-5L HOLD boundary.',
    );
  }

  const subjects = Object.freeze(
    request.subjects.map((subject) =>
      Object.freeze({
        subjectType: subject.subjectType,
        subjectRef: Object.freeze({ ...subject.subjectRef }),
        requiredReviewLevel: subject.requiredReviewLevel,
        requiredDecision: subject.requiredDecision,
        reviewerSupplied: Object.freeze({
          attestationId: null,
          reviewerId: null,
          reviewedAt: null,
          decision: null,
          notes: null,
        }),
      }),
    ),
  );

  const material = Object.freeze({
    packetVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_EXTERNAL_REVIEW_HANDOFF_PACKET_VERSION,
    issue: '#1930' as const,
    track: 'saju-bridge' as const,
    purpose:
      'EXTERNAL_HUMAN_DOMAIN_REVIEW_HANDOFF_ONLY' as const,
    upstreamRequestId: request.requestId,
    upstreamRequestRef: Object.freeze({ ...request.requestRef }),
    capabilityKey: request.capabilityKey,
    semanticFamily: request.semanticFamily,
    semanticVersion: request.semanticVersion,
    claimType: request.claimType,
    semanticScope: request.semanticScope,
    stagingRegistrySnapshotId: request.stagingRegistrySnapshotId,
    stagingPackRef: Object.freeze({ ...request.stagingPackRef }),
    subjects,
    materialityReviewForm: Object.freeze({
      requiredDecision:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
      decisionAuthority: 'TRUSTED_HUMAN_DOMAIN_REVIEWER' as const,
      allowedNarrativeProposition: Object.freeze({
        ...request.materialityDecisionRequirements.allowedNarrativeProposition,
      }),
      prohibitedExtensions: Object.freeze([
        ...request.materialityDecisionRequirements.prohibitedExtensions,
      ]),
      reviewerSupplied: Object.freeze({
        decision: null,
        reviewerId: null,
        decidedAt: null,
        notes: null,
      }),
    }),
    reviewerTrustRequirements: Object.freeze({
      trustContextGeneratedByPacket: false as const,
      trustGrantGeneratedByPacket: false as const,
      activeGrantRequired:
        request.reviewerTrustRequirements.activeGrantRequired,
      domainReviewLevelRequired:
        request.reviewerTrustRequirements.domainReviewLevelRequired,
      exactAttestationHashPinRequired:
        request.reviewerTrustRequirements.exactAttestationHashPinRequired,
      requirement:
        'A separately governed ReviewerTrustContext must contain an active grant for each accepted reviewer and pin the exact deterministic hash of each accepted attestation.' as const,
    }),
    intakeFlow: Object.freeze({
      step1:
        'REAL_EXTERNAL_HUMAN_DOMAIN_REVIEW_COMPLETES_BOTH_ATTESTATIONS' as const,
      step2:
        'SEPARATELY_GOVERNED_REVIEWER_TRUST_CONTEXT_PINS_ACCEPTED_ATTESTATION_HASHES' as const,
      step3:
        'TRUSTED_DOMAIN_REVIEWER_COMPLETES_POSITION_ONLY_MATERIALITY_DECISION' as const,
      step4:
        'RUN_SA_5L_EXTERNAL_SUBMISSION_VALIDATOR' as const,
      validator:
        'evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission' as const,
      validatorPassDisposition:
        'RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW' as const,
      validatorFailureDisposition:
        'HOLD_PENDING_OR_REPAIR_EXTERNAL_HUMAN_DOMAIN_SUBMISSION' as const,
    }),
    authorityBoundary: Object.freeze({
      handoffPacketEstablished: true as const,
      humanDomainReviewEstablished: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustContextCreated: false as const,
      reviewerTrustGrantCreated: false as const,
      narrativeMaterialityDecisionCreated: false as const,
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
    nextDisposition:
      'AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_REVIEW_INPUTS' as const,
  });

  return Object.freeze({
    packetId: deterministicContentHash(material),
    ...material,
  });
}
