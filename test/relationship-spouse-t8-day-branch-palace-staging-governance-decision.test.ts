import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-eligibility-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
  buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision,
  evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-governance-decision.js';

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5G staging governance decision', () => {
  test('approves only the exact SA-5F eligible 2.0.0 candidate for source-adjudicated staging authority', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();

    expect(result.decisionMaterial.issue).toBe('#1895');
    expect(result.decisionMaterial.projectOwnerDecision).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
    );
    expect(result.decisionMaterial.decisionAuthority).toBe('PROJECT_OWNER');
    expect(result.decisionMaterial.authorityClass).toBe('source_adjudication');
    expect(result.decisionMaterial.lifecycleTarget).toBe('staging');
    expect(result.decisionMaterial.semanticVersion).toBe('2.0.0');
    expect(result.decisionMaterial.checks).toEqual({
      eligibilityReviewIntegrityValid: true,
      exactEligibilityReviewBinding: true,
      exactCandidateBinding: true,
      exactPolicyBinding: true,
      exactUpstreamExecutionBinding: true,
      exactSemanticBinding: true,
      eligibilityStateValid: true,
      reviewAuthorityPreserved: true,
      lifecycleStillResearchOnly: true,
      explicitProjectOwnerApproval: true,
    });
    expect(result.decisionMaterial.blockers).toEqual([]);
    expect(result.decisionMaterial.decisionPreconditionsSatisfied).toBe(true);

    expect(result.decisionRef).toEqual(
      expect.objectContaining({
        id: 'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-governance-decision',
        version: '1.0.0',
      }),
    );
    expect(result.decisionRef?.contentHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(true);
  });

  test('resolves Gate 12 through the existing source-adjudication policy without claiming human domain review', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();

    expect(result.postDecisionPolicyEvaluation.objectiveEligibility).toBe(true);
    expect(result.postDecisionPolicyEvaluation.status).toBe(
      'SOURCE_ADJUDICATION_APPLICABILITY_APPROVED',
    );
    expect(result.postDecisionPolicyEvaluation.approvedDecisionPresent).toBe(
      true,
    );
    expect(result.postDecisionPolicyEvaluation.blockers).toEqual([]);
    expect(result.gate12Resolution).toEqual(
      expect.objectContaining({
        status: 'NOT_APPLICABLE_WITH_JUSTIFICATION',
        applicability: 'CONDITIONAL',
      }),
    );
    expect(result.gate12Resolution.justification).toContain(
      'no human domain review is claimed or implied',
    );
  });

  test('does not mutate lifecycle or authorize staging runtime, shadow, consumers, Preview, Official, or Production', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();

    expect(result.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      objectiveEligibilityEstablished: true,
      explicitGovernanceDecisionPresent: true,
      sourceAdjudicationAuthorityEstablished: true,
      allowedLifecycleTarget: 'staging',
      humanDomainReviewEstablished: false,
      reviewAttestationCreated: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecycleMutationAuthorized: false,
      stagingLifecycleMutationAuthorized: false,
      stagingRuntimeActivationAuthorized: false,
      shadowExecutionAuthorized: false,
      narrativeConsumerActivated: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(result.nextDisposition).toBe(
      'BUILD_SA_5H_SOURCE_ADJUDICATED_STAGING_LIFECYCLE_MATERIALIZATION',
    );
  });

  test('preserves research lifecycle and unreviewed reviewer authority on the exact 2.0.0 artifacts', () => {
    buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status,
    ).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status).toBe(
      'research',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status).toBe(
      'research',
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
        .reviewAttestations,
    ).toEqual([]);
  });

  test('fails closed when the explicit project-owner decision is not approved', () => {
    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision: 'NOT_APPROVED',
        eligibilityReview:
          buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview(),
      });

    expect(
      result.decisionMaterial.checks.explicitProjectOwnerApproval,
    ).toBe(false);
    expect(result.decisionMaterial.blockers).toContain(
      'SA5G_EXPLICIT_PROJECT_OWNER_APPROVAL_FAILED',
    );
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
    expect(result.gate12Resolution.status).toBe('PENDING');
  });

  test('fails closed when the exact SA-5F review identity drifts', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview();
    const drifted = {
      ...current,
      reviewId: '0'.repeat(64),
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
        eligibilityReview: drifted,
      });

    expect(
      result.decisionMaterial.checks.exactEligibilityReviewBinding,
    ).toBe(false);
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
  });

  test('fails closed when SA-5F content changes while a stale reviewId is retained', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview();
    const forged = {
      ...current,
      evidence: {
        ...current.evidence,
        aiAdversarialInternalReviewComplete: false,
      },
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
        eligibilityReview: forged,
      });

    expect(
      result.decisionMaterial.checks.eligibilityReviewIntegrityValid,
    ).toBe(false);
    expect(
      result.decisionMaterial.checks.exactEligibilityReviewBinding,
    ).toBe(false);
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
  });

  test('fails closed when candidate, policy, or upstream execution identity drifts', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview();

    const candidateDrift = {
      ...current,
      candidateRef: {
        ...current.candidateRef,
        contentHash: '1'.repeat(64),
      },
    } as typeof current;
    const policyDrift = {
      ...current,
      policyRef: {
        ...current.policyRef,
        contentHash: '2'.repeat(64),
      },
    } as typeof current;
    const executionDrift = {
      ...current,
      upstreamExecutionId: '3'.repeat(64),
    } as typeof current;

    const candidateResult =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
        eligibilityReview: candidateDrift,
      });
    const policyResult =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
        eligibilityReview: policyDrift,
      });
    const executionResult =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
        eligibilityReview: executionDrift,
      });

    expect(
      candidateResult.decisionMaterial.checks.exactCandidateBinding,
    ).toBe(false);
    expect(candidateResult.decisionRef).toBeUndefined();

    expect(policyResult.decisionMaterial.checks.exactPolicyBinding).toBe(false);
    expect(policyResult.decisionRef).toBeUndefined();

    expect(
      executionResult.decisionMaterial.checks.exactUpstreamExecutionBinding,
    ).toBe(false);
    expect(executionResult.decisionRef).toBeUndefined();
  });

  test('fails closed when SA-5F objective eligibility is no longer established', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview();
    const drifted = {
      ...current,
      stagingLifecycleEligibilityEstablished: false,
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_DECISION,
        eligibilityReview: drifted,
      });

    expect(result.decisionMaterial.checks.eligibilityStateValid).toBe(false);
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
    expect(result.nextDisposition).toBe(
      'HOLD_AND_REESTABLISH_EXACT_SA5F_ELIGIBILITY_OR_PROJECT_OWNER_DECISION',
    );
  });

  test('is deterministic for the same exact SA-5F review and project-owner decision', () => {
    const left =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();
    const right =
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();

    expect(left.decisionRef).toEqual(right.decisionRef);
    expect(left.decisionId).toBe(right.decisionId);
    expect(left.postDecisionPolicyEvaluation.evaluationId).toBe(
      right.postDecisionPolicyEvaluation.evaluationId,
    );
    expect(left.decisionId).toMatch(/^[a-f0-9]{64}$/u);
  });
});
