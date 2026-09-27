import { describe, expect, it } from 'vitest';
import {
  SOURCE_ADJUDICATION_ALLOWED_LIFECYCLE_TARGETS,
  SOURCE_ADJUDICATION_ELIGIBLE_CLAIM_CLASSES,
  SOURCE_ADJUDICATION_PROMOTION_POLICY_ID,
  SOURCE_ADJUDICATION_PROMOTION_POLICY_VERSION,
  buildSourceAdjudicationPromotionPolicy,
  evaluateSourceAdjudicationApplicability,
  type SourceAdjudicationApplicabilityInput,
} from '../src/research/source-adjudication-promotion-policy.js';

const candidateRef = {
  id: 'bounded-candidate',
  version: '1.0.0',
  contentHash: 'a'.repeat(64),
} as const;

const decisionRef = {
  id: 'source-adjudication-decision',
  version: '1.0.0',
  contentHash: 'b'.repeat(64),
} as const;

function completeInput(): SourceAdjudicationApplicabilityInput {
  return {
    candidateRef,
    claimClass: 'bounded_deterministic_correspondence',
    intendedLifecycleTarget: 'staging',
    evidence: {
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
    },
    disqualifiers: {
      openEndedNarrativeSemantics: false,
      unresolvedMethodologyConflict: false,
      crossSourceSyntheticRule: false,
      semanticScopeNotFrozen: false,
    },
  };
}

describe('source-adjudication promotion applicability policy', () => {
  it('defines a content-addressed staging-only policy without claiming human review authority', () => {
    const policy = buildSourceAdjudicationPromotionPolicy();

    expect(SOURCE_ADJUDICATION_PROMOTION_POLICY_ID).toBe(
      'myeonghwa-source-adjudication-promotion-policy',
    );
    expect(SOURCE_ADJUDICATION_PROMOTION_POLICY_VERSION).toBe('1.0.0');
    expect(SOURCE_ADJUDICATION_ELIGIBLE_CLAIM_CLASSES).toEqual([
      'bounded_deterministic_correspondence',
    ]);
    expect(SOURCE_ADJUDICATION_ALLOWED_LIFECYCLE_TARGETS).toEqual(['staging']);
    expect(policy.policyRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(policy.authorityBoundary).toEqual({
      humanDomainReviewClaimed: false,
      reviewerTrustGrantClaimed: false,
      reviewAttestationClaimed: false,
      domainReviewedStatusClaimed: false,
      lifecycleMutationAuthorizedByPolicyDefinition: false,
      previewAuthorityGranted: false,
      officialReadingAuthorityGranted: false,
      productionAuthorityGranted: false,
      sourceAdjudicationV1MayTargetProduction: false,
    });
  });

  it('keeps Gate 12 pending until an exact explicit governance decision exists', () => {
    const result = evaluateSourceAdjudicationApplicability(completeInput());

    expect(result.objectiveEligibility).toBe(true);
    expect(result.approvedDecisionPresent).toBe(false);
    expect(result.status).toBe('ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION');
    expect(result.blockers).toEqual([]);
    expect(result.gate12Resolution).toEqual(
      expect.objectContaining({
        status: 'PENDING',
        applicability: 'CONDITIONAL',
      }),
    );
    expect(result.gate12Resolution.policyRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('permits governed Gate 12 N/A only after an exact approved staging decision', () => {
    const input = completeInput();
    const result = evaluateSourceAdjudicationApplicability({
      ...input,
      governanceDecision: {
        decisionRef,
        decision: 'approved',
        authorityClass: 'source_adjudication',
        candidateRef,
        lifecycleTarget: 'staging',
      },
    });

    expect(result.objectiveEligibility).toBe(true);
    expect(result.approvedDecisionPresent).toBe(true);
    expect(result.status).toBe('SOURCE_ADJUDICATION_APPLICABILITY_APPROVED');
    expect(result.gate12Resolution).toEqual(
      expect.objectContaining({
        status: 'NOT_APPLICABLE_WITH_JUSTIFICATION',
        applicability: 'CONDITIONAL',
      }),
    );
    expect(result.authorityBoundary.humanDomainReviewClaimed).toBe(false);
    expect(result.authorityBoundary.productionAuthorityGranted).toBe(false);
  });

  it('fails closed when required evidence is missing', () => {
    const input = completeInput();
    const result = evaluateSourceAdjudicationApplicability({
      ...input,
      evidence: {
        ...input.evidence,
        counterexamplesAndDivergenceReviewed: false,
      },
    });

    expect(result.status).toBe('INELIGIBLE_FOR_SOURCE_ADJUDICATION');
    expect(result.blockers).toContain(
      'MISSING_EVIDENCE:COUNTEREXAMPLES_AND_DIVERGENCE_REVIEWED',
    );
    expect(result.gate12Resolution.status).toBe('BLOCKED');
  });

  it('fails closed for unresolved methodology conflict or open-ended narrative semantics', () => {
    const input = completeInput();
    const result = evaluateSourceAdjudicationApplicability({
      ...input,
      disqualifiers: {
        ...input.disqualifiers,
        openEndedNarrativeSemantics: true,
        unresolvedMethodologyConflict: true,
      },
    });

    expect(result.blockers).toContain(
      'DISQUALIFIER:OPEN_ENDED_NARRATIVE_SEMANTICS',
    );
    expect(result.blockers).toContain(
      'DISQUALIFIER:UNRESOLVED_METHODOLOGY_CONFLICT',
    );
    expect(result.gate12Resolution.status).toBe('BLOCKED');
  });

  it('does not permit source adjudication v1 to satisfy a Production promotion path', () => {
    const input = completeInput();
    const result = evaluateSourceAdjudicationApplicability({
      ...input,
      intendedLifecycleTarget: 'production',
    });

    expect(result.status).toBe('INELIGIBLE_FOR_SOURCE_ADJUDICATION');
    expect(result.blockers).toContain(
      'SOURCE_ADJUDICATION_V1_DOES_NOT_AUTHORIZE_PRODUCTION',
    );
    expect(result.authorityBoundary.productionAuthorityGranted).toBe(false);
  });

  it('invalidates an approval decision when the exact candidate content identity drifts', () => {
    const input = completeInput();
    const result = evaluateSourceAdjudicationApplicability({
      ...input,
      governanceDecision: {
        decisionRef,
        decision: 'approved',
        authorityClass: 'source_adjudication',
        candidateRef: {
          ...candidateRef,
          contentHash: 'c'.repeat(64),
        },
        lifecycleTarget: 'staging',
      },
    });

    expect(result.approvedDecisionPresent).toBe(false);
    expect(result.blockers).toContain('GOVERNANCE_DECISION_CANDIDATE_MISMATCH');
    expect(result.gate12Resolution.status).toBe('BLOCKED');
  });

  it('is deterministic for the same policy and candidate state', () => {
    const leftPolicy = buildSourceAdjudicationPromotionPolicy();
    const rightPolicy = buildSourceAdjudicationPromotionPolicy();
    const left = evaluateSourceAdjudicationApplicability(completeInput());
    const right = evaluateSourceAdjudicationApplicability(completeInput());

    expect(leftPolicy.policyRef).toEqual(rightPolicy.policyRef);
    expect(left.evaluationId).toBe(right.evaluationId);
    expect(left.evaluationId).toMatch(/^[a-f0-9]{64}$/);
  });
});
