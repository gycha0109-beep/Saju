import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildSourceAdjudicationPromotionPolicy,
  evaluateSourceAdjudicationApplicability,
} from './source-adjudication-promotion-policy.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
} from './relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-eligibility-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_GOVERNANCE_DECISION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-staging-governance-decision-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION =
  'APPROVE_SOURCE_ADJUDICATED_STAGING_AUTHORITY' as const;

export interface RelationshipSpouseT8DayBranchPalaceStagingGovernanceDecisionInput {
  readonly projectOwnerDecision:
    | typeof RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION
    | 'NOT_APPROVED';
  readonly eligibilityReview: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview
  >;
}

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

export function evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision(
  input: RelationshipSpouseT8DayBranchPalaceStagingGovernanceDecisionInput,
) {
  const policy = buildSourceAdjudicationPromotionPolicy();
  const currentEligibility =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview();
  const currentCandidateRef =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef();
  const currentExecution =
    buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();
  const eligibilityReview = input.eligibilityReview;
  const { reviewId: declaredEligibilityReviewId, ...eligibilityReviewMaterial } =
    eligibilityReview;

  const eligibilityReviewIntegrityValid =
    deterministicContentHash(eligibilityReviewMaterial) ===
    declaredEligibilityReviewId;

  const exactEligibilityReviewBinding =
    eligibilityReviewIntegrityValid &&
    eligibilityReview.reviewId === currentEligibility.reviewId &&
    eligibilityReview.reviewVersion === currentEligibility.reviewVersion;

  const exactCandidateBinding =
    refsEqual(eligibilityReview.candidateRef, currentCandidateRef) &&
    refsEqual(
      eligibilityReview.policyEvaluation.candidateRef,
      currentCandidateRef,
    ) &&
    eligibilityReview.candidateRef.version === '2.0.0';

  const exactPolicyBinding =
    refsEqual(eligibilityReview.policyRef, policy.policyRef) &&
    refsEqual(
      eligibilityReview.policyEvaluation.policyRef,
      policy.policyRef,
    );

  const exactUpstreamExecutionBinding =
    eligibilityReview.upstreamExecutionId === currentExecution.executionId &&
    refsEqual(
      eligibilityReview.upstreamExecutionAuthorityRef,
      currentExecution.executionAuthority.authorityRef,
    );

  const exactSemanticBinding =
    eligibilityReview.capabilityKey === 'relationship:natal:spouse' &&
    eligibilityReview.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    eligibilityReview.semanticVersion === '2.0.0';

  const eligibilityStateValid =
    eligibilityReview.stagingLifecycleEligibilityEstablished === true &&
    eligibilityReview.blockers.length === 0 &&
    eligibilityReview.policyEvaluation.objectiveEligibility === true &&
    eligibilityReview.policyEvaluation.status ===
      'ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION' &&
    eligibilityReview.policyEvaluation.approvedDecisionPresent === false &&
    eligibilityReview.policyEvaluation.blockers.length === 0 &&
    eligibilityReview.policyEvaluation.gate12Resolution.status ===
      'PENDING' &&
    eligibilityReview.authorityBoundary.objectiveEligibilityEstablished ===
      true &&
    eligibilityReview.authorityBoundary
      .explicitGovernanceDecisionPresent === false &&
    eligibilityReview.authorityBoundary
      .sourceAdjudicationAuthorityEstablished === false &&
    eligibilityReview.nextDisposition ===
      'REQUEST_SA_5G_EXPLICIT_STAGING_GOVERNANCE_DECISION';

  const reviewAuthorityPreserved =
    eligibilityReview.checks.reviewAuthorityPreserved === true &&
    eligibilityReview.authorityBoundary.humanDomainReviewEstablished ===
      false &&
    eligibilityReview.authorityBoundary.reviewAttestationCreated === false &&
    eligibilityReview.authorityBoundary
      .reviewerTrustGrantEstablished === false &&
    eligibilityReview.authorityBoundary
      .reviewerStatusPromotionAuthorized === false;

  const lifecycleStillResearchOnly =
    eligibilityReview.checks.lifecycleStillResearchOnly === true &&
    eligibilityReview.authorityBoundary.lifecycleMutationAuthorized ===
      false &&
    eligibilityReview.authorityBoundary
      .stagingLifecycleMutationAuthorized === false &&
    eligibilityReview.authorityBoundary
      .stagingRuntimeActivationAuthorized === false &&
    eligibilityReview.authorityBoundary.shadowExecutionAuthorized === false &&
    eligibilityReview.authorityBoundary.narrativeConsumerActivated === false &&
    eligibilityReview.authorityBoundary.previewAuthorityAuthorized === false &&
    eligibilityReview.authorityBoundary
      .officialReadingAuthorityAuthorized === false &&
    eligibilityReview.authorityBoundary.productionAuthorityAuthorized ===
      false &&
    eligibilityReview.authorityBoundary.production === 'HOLD';

  const explicitProjectOwnerApproval =
    input.projectOwnerDecision ===
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION;

  const checks = Object.freeze({
    eligibilityReviewIntegrityValid,
    exactEligibilityReviewBinding,
    exactCandidateBinding,
    exactPolicyBinding,
    exactUpstreamExecutionBinding,
    exactSemanticBinding,
    eligibilityStateValid,
    reviewAuthorityPreserved,
    lifecycleStillResearchOnly,
    explicitProjectOwnerApproval,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5G_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const decisionPreconditionsSatisfied = blockers.length === 0;

  const decisionMaterial = Object.freeze({
    decisionVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_GOVERNANCE_DECISION_VERSION,
    issue: '#1895' as const,
    decisionAuthority: 'PROJECT_OWNER' as const,
    decisionBasis:
      'EXPLICIT_PROJECT_OWNER_INSTRUCTION_TO_PROCEED_WITH_EXACT_SA5F_ELIGIBLE_STAGING_GOVERNANCE_DECISION' as const,
    projectOwnerDecision: input.projectOwnerDecision,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    authorityClass: 'source_adjudication' as const,
    lifecycleTarget: 'staging' as const,
    eligibilityReviewId: eligibilityReview.reviewId,
    policyRef: Object.freeze({ ...eligibilityReview.policyRef }),
    candidateRef: Object.freeze({ ...eligibilityReview.candidateRef }),
    upstreamExecutionId: eligibilityReview.upstreamExecutionId,
    upstreamExecutionAuthorityRef: Object.freeze({
      ...eligibilityReview.upstreamExecutionAuthorityRef,
    }),
    checks,
    blockers,
    decisionPreconditionsSatisfied,
    authorityBoundary: Object.freeze({
      humanDomainReviewClaimed: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantCreated: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecycleMutationAuthorizedByDecision: false as const,
      stagingLifecycleMutationAuthorized: false as const,
      stagingRuntimeActivationAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  const decisionRef = decisionPreconditionsSatisfied
    ? contentAddressedRef(
        'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-governance-decision',
        '1.0.0',
        decisionMaterial,
      )
    : undefined;

  const postDecisionPolicyEvaluation = decisionRef
    ? evaluateSourceAdjudicationApplicability({
        candidateRef: eligibilityReview.candidateRef,
        claimClass: eligibilityReview.policyEvaluation.claimClass,
        intendedLifecycleTarget:
          eligibilityReview.policyEvaluation.intendedLifecycleTarget,
        evidence: eligibilityReview.evidence,
        disqualifiers: eligibilityReview.disqualifiers,
        governanceDecision: {
          decisionRef,
          decision: 'approved',
          authorityClass: 'source_adjudication',
          candidateRef: eligibilityReview.candidateRef,
          lifecycleTarget: 'staging',
        },
      })
    : evaluateSourceAdjudicationApplicability({
        candidateRef: eligibilityReview.candidateRef,
        claimClass: eligibilityReview.policyEvaluation.claimClass,
        intendedLifecycleTarget:
          eligibilityReview.policyEvaluation.intendedLifecycleTarget,
        evidence: eligibilityReview.evidence,
        disqualifiers: eligibilityReview.disqualifiers,
      });

  const sourceAdjudicationAuthorityEstablished =
    decisionRef !== undefined &&
    postDecisionPolicyEvaluation.objectiveEligibility === true &&
    postDecisionPolicyEvaluation.status ===
      'SOURCE_ADJUDICATION_APPLICABILITY_APPROVED' &&
    postDecisionPolicyEvaluation.approvedDecisionPresent === true &&
    postDecisionPolicyEvaluation.gate12Resolution.status ===
      'NOT_APPLICABLE_WITH_JUSTIFICATION' &&
    postDecisionPolicyEvaluation.blockers.length === 0;

  const resultMaterial = Object.freeze({
    decisionMaterial,
    decisionRef,
    postDecisionPolicyEvaluation,
    sourceAdjudicationAuthorityEstablished,
    gate12Resolution: postDecisionPolicyEvaluation.gate12Resolution,
    authorityBoundary: Object.freeze({
      exactCandidateOnly:
        exactEligibilityReviewBinding &&
        exactCandidateBinding &&
        exactPolicyBinding &&
        exactUpstreamExecutionBinding &&
        exactSemanticBinding,
      objectiveEligibilityEstablished: eligibilityStateValid,
      explicitGovernanceDecisionPresent: decisionRef !== undefined,
      sourceAdjudicationAuthorityEstablished,
      allowedLifecycleTarget: 'staging' as const,
      humanDomainReviewEstablished: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecycleMutationAuthorized: false as const,
      stagingLifecycleMutationAuthorized: false as const,
      stagingRuntimeActivationAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: sourceAdjudicationAuthorityEstablished
      ? ('BUILD_SA_5H_SOURCE_ADJUDICATED_STAGING_LIFECYCLE_MATERIALIZATION' as const)
      : ('HOLD_AND_REESTABLISH_EXACT_SA5F_ELIGIBILITY_OR_PROJECT_OWNER_DECISION' as const),
  });

  return Object.freeze({
    decisionId: deterministicContentHash(resultMaterial),
    ...resultMaterial,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision() {
  return evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
    projectOwnerDecision:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
    eligibilityReview:
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview(),
  });
}
