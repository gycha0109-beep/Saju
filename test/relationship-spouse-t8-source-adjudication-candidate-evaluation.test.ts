import { describe, expect, it } from 'vitest';
import {
  buildRelationshipSpouseT8SourceAdjudicationCandidateRef,
  evaluateRelationshipSpouseT8SourceAdjudicationCandidate,
} from '../src/research/relationship-spouse-t8-source-adjudication-candidate-evaluation.js';

describe('Relationship / Spouse T8 source-adjudication candidate evaluation', () => {
  it('builds a deterministic exact content-addressed staging candidate', () => {
    const left = buildRelationshipSpouseT8SourceAdjudicationCandidateRef();
    const right = buildRelationshipSpouseT8SourceAdjudicationCandidateRef();

    expect(left).toEqual(right);
    expect(left.id).toBe(
      'relationship-spouse-t8-source-adjudication-candidate',
    );
    expect(left.version).toBe('1.0.0');
    expect(left.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('establishes all objective source-adjudication evidence without a governance approval', () => {
    const result = evaluateRelationshipSpouseT8SourceAdjudicationCandidate();

    expect(result.evidence).toEqual({
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

    expect(result.disqualifiers).toEqual({
      openEndedNarrativeSemantics: false,
      unresolvedMethodologyConflict: false,
      crossSourceSyntheticRule: false,
      semanticScopeNotFrozen: false,
    });

    expect(result.policyEvaluation.objectiveEligibility).toBe(true);
    expect(result.policyEvaluation.approvedDecisionPresent).toBe(false);
    expect(result.policyEvaluation.blockers).toEqual([]);
    expect(result.policyEvaluation.status).toBe(
      'ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION',
    );
    expect(result.policyEvaluation.gate12Resolution.status).toBe('PENDING');
  });

  it('does not fabricate human review, reviewer trust, lifecycle, staging, or Production authority', () => {
    const result = evaluateRelationshipSpouseT8SourceAdjudicationCandidate();

    expect(result.authorityBoundary).toEqual({
      objectiveEligibilityEstablished: true,
      explicitGovernanceDecisionPresent: false,
      sourceAdjudicationAuthorityEstablished: false,
      gate12ResolvedAsNotApplicable: false,
      humanDomainReviewClaimed: false,
      reviewerTrustGrantClaimed: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      stagingActivationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });

    expect(result.nextDisposition).toBe(
      'REQUEST_EXPLICIT_SOURCE_ADJUDICATION_STAGING_GOVERNANCE_DECISION',
    );
  });

  it('preserves the bounded source-role and Engine-ready evidence identities in the evaluation', () => {
    const result = evaluateRelationshipSpouseT8SourceAdjudicationCandidate();

    expect(result.subjectManifestHash).toMatch(/^[a-f0-9]{64}$/);
    expect(result.sourceManifestId).toMatch(/^[a-f0-9]{64}$/);
    expect(result.aiInternalReviewId).toMatch(/^[a-f0-9]{64}$/);
    expect(result.engineHardeningEvidenceId).toMatch(/^[a-f0-9]{64}$/);
    expect(result.boundedAdmissionRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(result.policyRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(result.evaluationId).toMatch(/^[a-f0-9]{64}$/);
  });

  it('is deterministic for the unchanged exact candidate state', () => {
    const left = evaluateRelationshipSpouseT8SourceAdjudicationCandidate();
    const right = evaluateRelationshipSpouseT8SourceAdjudicationCandidate();

    expect(left.candidateRef).toEqual(right.candidateRef);
    expect(left.evaluationId).toBe(right.evaluationId);
    expect(left.policyEvaluation.evaluationId).toBe(
      right.policyEvaluation.evaluationId,
    );
  });
});
