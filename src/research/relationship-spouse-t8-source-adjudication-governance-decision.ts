import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildSourceAdjudicationPromotionPolicy,
  evaluateSourceAdjudicationApplicability,
} from './source-adjudication-promotion-policy.js';
import {
  buildRelationshipSpouseT8SourceAdjudicationCandidateRef,
  evaluateRelationshipSpouseT8SourceAdjudicationCandidate,
} from './relationship-spouse-t8-source-adjudication-candidate-evaluation.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_GOVERNANCE_DECISION_VERSION =
  'myeonghwa-relationship-spouse-t8-source-adjudication-governance-decision-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION =
  'APPROVE_SOURCE_ADJUDICATED_STAGING_AUTHORITY' as const;

export interface RelationshipSpouseT8SourceAdjudicationGovernanceDecisionInput {
  readonly projectOwnerDecision:
    | typeof RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION
    | 'NOT_APPROVED';
  readonly candidateEvaluation: ReturnType<
    typeof evaluateRelationshipSpouseT8SourceAdjudicationCandidate
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

export function evaluateRelationshipSpouseT8SourceAdjudicationGovernanceDecision(
  input: RelationshipSpouseT8SourceAdjudicationGovernanceDecisionInput,
) {
  const policy = buildSourceAdjudicationPromotionPolicy();
  const currentCandidateRef =
    buildRelationshipSpouseT8SourceAdjudicationCandidateRef();
  const candidateEvaluation = input.candidateEvaluation;

  const exactCandidateBinding = refsEqual(
    candidateEvaluation.candidateRef,
    currentCandidateRef,
  );
  const exactPolicyBinding = refsEqual(
    candidateEvaluation.policyRef,
    policy.policyRef,
  );

  const eligibilityStateValid =
    candidateEvaluation.policyEvaluation.objectiveEligibility === true &&
    candidateEvaluation.policyEvaluation.status ===
      'ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION' &&
    candidateEvaluation.policyEvaluation.approvedDecisionPresent === false &&
    candidateEvaluation.policyEvaluation.blockers.length === 0 &&
    candidateEvaluation.policyEvaluation.gate12Resolution.status ===
      'PENDING' &&
    candidateEvaluation.authorityBoundary
      .sourceAdjudicationAuthorityEstablished === false &&
    candidateEvaluation.authorityBoundary.lifecyclePromotionAuthorized ===
      false &&
    candidateEvaluation.authorityBoundary.productionAuthorityAuthorized ===
      false &&
    candidateEvaluation.authorityBoundary.production === 'HOLD';

  const explicitProjectOwnerApproval =
    input.projectOwnerDecision ===
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION;

  const decisionPreconditionsSatisfied =
    exactCandidateBinding &&
    exactPolicyBinding &&
    eligibilityStateValid &&
    explicitProjectOwnerApproval;

  const decisionMaterial = Object.freeze({
    decisionVersion:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_GOVERNANCE_DECISION_VERSION,
    issue: '#1803' as const,
    decisionAuthority: 'PROJECT_OWNER' as const,
    decisionBasis:
      'EXPLICIT_PROJECT_OWNER_INSTRUCTION_TO_PROCEED_WITH_EXACT_SOURCE_ADJUDICATED_STAGING_GOVERNANCE_DECISION' as const,
    projectOwnerDecision: input.projectOwnerDecision,
    capabilityKey: 'relationship:natal:spouse' as const,
    authorityClass: 'source_adjudication' as const,
    lifecycleTarget: 'staging' as const,
    policyRef: Object.freeze({ ...policy.policyRef }),
    candidateRef: Object.freeze({ ...candidateEvaluation.candidateRef }),
    eligibilityEvaluationId: candidateEvaluation.evaluationId,
    exactCandidateBinding,
    exactPolicyBinding,
    eligibilityStateValid,
    explicitProjectOwnerApproval,
    decisionPreconditionsSatisfied,
    authorityBoundary: Object.freeze({
      humanDomainReviewClaimed: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantCreated: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecycleMutationAuthorizedByDecision: false as const,
      stagingRuntimeActivationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  const decisionRef = decisionPreconditionsSatisfied
    ? contentAddressedRef(
        'relationship-spouse-t8-source-adjudicated-staging-governance-decision',
        '1.0.0',
        decisionMaterial,
      )
    : undefined;

  const postDecisionPolicyEvaluation = decisionRef
    ? evaluateSourceAdjudicationApplicability({
        candidateRef: candidateEvaluation.candidateRef,
        claimClass: candidateEvaluation.policyEvaluation.claimClass,
        intendedLifecycleTarget:
          candidateEvaluation.policyEvaluation.intendedLifecycleTarget,
        evidence: candidateEvaluation.evidence,
        disqualifiers: candidateEvaluation.disqualifiers,
        governanceDecision: {
          decisionRef,
          decision: 'approved',
          authorityClass: 'source_adjudication',
          candidateRef: candidateEvaluation.candidateRef,
          lifecycleTarget: 'staging',
        },
      })
    : evaluateSourceAdjudicationApplicability({
        candidateRef: candidateEvaluation.candidateRef,
        claimClass: candidateEvaluation.policyEvaluation.claimClass,
        intendedLifecycleTarget:
          candidateEvaluation.policyEvaluation.intendedLifecycleTarget,
        evidence: candidateEvaluation.evidence,
        disqualifiers: candidateEvaluation.disqualifiers,
      });

  const sourceAdjudicationAuthorityEstablished =
    decisionRef !== undefined &&
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
    gate12Resolution:
      postDecisionPolicyEvaluation.gate12Resolution,
    authorityBoundary: Object.freeze({
      exactCandidateOnly: true as const,
      allowedLifecycleTarget: 'staging' as const,
      humanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      stagingLifecycleMutationAuthorized: false as const,
      stagingRuntimeActivationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: sourceAdjudicationAuthorityEstablished
      ? ('BUILD_SEPARATE_SOURCE_ADJUDICATED_STAGING_LIFECYCLE_MUTATION' as const)
      : ('HOLD_AND_REESTABLISH_EXACT_ELIGIBILITY_OR_PROJECT_OWNER_DECISION' as const),
  });

  return Object.freeze({
    decisionId: deterministicContentHash(resultMaterial),
    ...resultMaterial,
  });
}

export function buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision() {
  return evaluateRelationshipSpouseT8SourceAdjudicationGovernanceDecision({
    projectOwnerDecision:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION,
    candidateEvaluation:
      evaluateRelationshipSpouseT8SourceAdjudicationCandidate(),
  });
}
