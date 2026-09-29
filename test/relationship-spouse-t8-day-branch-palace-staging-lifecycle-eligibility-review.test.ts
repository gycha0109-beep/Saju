import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
} from '../src/research/relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceAiAssistedInternalReview,
  buildRelationshipSpouseT8DayBranchPalaceBoundedEngineExecutionEvidence,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-eligibility-review.js';
import {
  evaluateSourceAdjudicationApplicability,
} from '../src/research/source-adjudication-promotion-policy.js';

const review =
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview();
const upstream =
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();
const aiReview =
  buildRelationshipSpouseT8DayBranchPalaceAiAssistedInternalReview();
const engineEvidence =
  buildRelationshipSpouseT8DayBranchPalaceBoundedEngineExecutionEvidence();

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5F staging lifecycle eligibility', () => {
  test('establishes objective staging eligibility for the exact SA-5E candidate only', () => {
    expect(review.semanticVersion).toBe('2.0.0');
    expect(review.upstreamExecutionId).toBe(upstream.executionId);
    expect(review.blockers).toEqual([]);
    expect(review.stagingLifecycleEligibilityEstablished).toBe(true);
    expect(review.policyEvaluation.objectiveEligibility).toBe(true);
    expect(review.policyEvaluation.status).toBe(
      'ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION',
    );
    expect(review.policyEvaluation.gate12Resolution.status).toBe('PENDING');
    expect(review.policyEvaluation.approvedDecisionPresent).toBe(false);
    expect(review.nextDisposition).toBe(
      'REQUEST_SA_5G_EXPLICIT_STAGING_GOVERNANCE_DECISION',
    );
    expect(review.reviewId).toMatch(/^[a-f0-9]{64}$/u);
    expect(review.candidateRef.contentHash).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('maps all source-adjudication staging evidence requirements to true without a disqualifier', () => {
    expect(review.evidence).toEqual({
      semanticScopeFrozen: true,
      exactContentAddressing: true,
      sourceBindingComplete: true,
      sourceRolePinningComplete: true,
      passagePropositionBindingComplete: true,
      rightsReuseHandlingExplicit: true,
      counterexamplesAndDivergenceReviewed: true,
      calculationConventionsExplicit: true,
      executablePredicatesNoHiddenGuesses: true,
      ambiguityUnknownFailClosed: true,
      deterministicAndRegressionTestsPass: true,
      engineE2eComplete: true,
      semanticExpansionGuardsComplete: true,
      aiAdversarialInternalReviewComplete: true,
    });

    expect(review.disqualifiers).toEqual({
      openEndedNarrativeSemantics: false,
      unresolvedMethodologyConflict: false,
      crossSourceSyntheticRule: false,
      semanticScopeNotFrozen: false,
    });
  });

  test('AI-assisted internal review remains internal-only and creates no trusted human review authority', () => {
    expect(aiReview.blockers).toEqual([]);
    expect(aiReview.aiAssistedInternalReviewEstablished).toBe(true);
    expect(aiReview.authorityBoundary).toEqual({
      internalReviewOnly: true,
      reviewAttestationCreated: false,
      independentHumanDomainReviewEstablished: false,
      domainReviewAuthorityEstablished: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      stagingActivationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(
      aiReview.prohibitedInterpretations,
    ).toContain(
      'AI_INTERNAL_REVIEW_IS_NOT_INDEPENDENT_HUMAN_DOMAIN_REVIEW',
    );
  });

  test('bounded engine execution evidence stays bound to SA-5E and grants no lifecycle authority', () => {
    expect(engineEvidence.blockers).toEqual([]);
    expect(engineEvidence.boundedEngineExecutionEvidenceComplete).toBe(true);
    expect(engineEvidence.upstreamExecutionId).toBe(upstream.executionId);
    expect(engineEvidence.executionAuthorityRef).toEqual(
      upstream.executionAuthority.authorityRef,
    );
    expect(engineEvidence.registrySnapshotId).toBe(
      upstream.authorizedRegistrySnapshotId,
    );
    expect(engineEvidence.packRef).toEqual(upstream.authorizedPackRef);
    expect(engineEvidence.authorityBoundary).toEqual({
      evidenceOnly: true,
      lifecycleMutationAuthorized: false,
      stagingActivationAuthorized: false,
      shadowExecutionAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('SA-5F does not mutate the research lifecycle or create a staging registry', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status,
    ).toBe('research');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status,
    ).toBe('research');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status,
    ).toBe('research');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
        .reviewAttestations,
    ).toEqual([]);
    expect(review.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      objectiveEligibilityEstablished: true,
      explicitGovernanceDecisionPresent: false,
      explicitGovernanceDecisionMayBeRequested: true,
      sourceAdjudicationAuthorityEstablished: false,
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
  });

  test('staging candidate ref is deterministic and content-addressed to the exact upstream execution', () => {
    const first =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef();
    const second =
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef();

    expect(first).toEqual(second);
    expect(first.version).toBe('2.0.0');
    expect(first.contentHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(review.policyEvaluation.candidateRef).toEqual(first);
  });

  test('source-adjudication eligibility fails closed if a required evidence bit is removed', () => {
    const blocked = evaluateSourceAdjudicationApplicability({
      candidateRef: review.candidateRef,
      claimClass: 'bounded_deterministic_correspondence',
      intendedLifecycleTarget: 'staging',
      evidence: {
        ...review.evidence,
        aiAdversarialInternalReviewComplete: false,
      },
      disqualifiers: review.disqualifiers,
    });

    expect(blocked.objectiveEligibility).toBe(false);
    expect(blocked.status).toBe('INELIGIBLE_FOR_SOURCE_ADJUDICATION');
    expect(blocked.blockers).toContain(
      'MISSING_EVIDENCE:AI_ADVERSARIAL_INTERNAL_REVIEW_COMPLETE',
    );
    expect(blocked.gate12Resolution.status).toBe('BLOCKED');
  });

  test('eligibility is not a governance decision and does not authorize staging execution', () => {
    expect(review.policyEvaluation.approvedDecisionPresent).toBe(false);
    expect(review.authorityBoundary.explicitGovernanceDecisionPresent).toBe(
      false,
    );
    expect(review.authorityBoundary.sourceAdjudicationAuthorityEstablished).toBe(
      false,
    );
    expect(review.authorityBoundary.stagingLifecycleMutationAuthorized).toBe(
      false,
    );
    expect(review.authorityBoundary.stagingRuntimeActivationAuthorized).toBe(
      false,
    );
    expect(review.authorityBoundary.shadowExecutionAuthorized).toBe(false);
    expect(review.authorityBoundary.productionAuthorityAuthorized).toBe(false);
    expect(review.authorityBoundary.production).toBe('HOLD');
  });
});
