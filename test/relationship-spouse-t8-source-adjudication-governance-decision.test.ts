import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION,
  buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision,
  evaluateRelationshipSpouseT8SourceAdjudicationGovernanceDecision,
} from '../src/research/relationship-spouse-t8-source-adjudication-governance-decision.js';
import {
  evaluateRelationshipSpouseT8SourceAdjudicationCandidate,
} from '../src/research/relationship-spouse-t8-source-adjudication-candidate-evaluation.js';

describe('Relationship / Spouse T8 source-adjudication staging governance decision', () => {
  it('approves only the exact objectively eligible current candidate for staging authority', () => {
    const result =
      buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();

    expect(result.decisionMaterial.projectOwnerDecision).toBe(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION,
    );
    expect(result.decisionMaterial.decisionAuthority).toBe('PROJECT_OWNER');
    expect(result.decisionMaterial.lifecycleTarget).toBe('staging');
    expect(result.decisionMaterial.exactCandidateBinding).toBe(true);
    expect(result.decisionMaterial.exactPolicyBinding).toBe(true);
    expect(result.decisionMaterial.eligibilityStateValid).toBe(true);
    expect(result.decisionMaterial.explicitProjectOwnerApproval).toBe(true);
    expect(result.decisionMaterial.decisionPreconditionsSatisfied).toBe(true);

    expect(result.decisionRef).toEqual(
      expect.objectContaining({
        id: 'relationship-spouse-t8-source-adjudicated-staging-governance-decision',
        version: '1.0.0',
      }),
    );
    expect(result.decisionRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);

    expect(result.sourceAdjudicationAuthorityEstablished).toBe(true);
    expect(result.postDecisionPolicyEvaluation.status).toBe(
      'SOURCE_ADJUDICATION_APPLICABILITY_APPROVED',
    );
    expect(
      result.postDecisionPolicyEvaluation.approvedDecisionPresent,
    ).toBe(true);
    expect(result.postDecisionPolicyEvaluation.blockers).toEqual([]);
    expect(result.gate12Resolution).toEqual(
      expect.objectContaining({
        status: 'NOT_APPLICABLE_WITH_JUSTIFICATION',
        applicability: 'CONDITIONAL',
      }),
    );
  });

  it('does not authorize lifecycle mutation, staging runtime activation, human review, or Production', () => {
    const result =
      buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();

    expect(result.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      allowedLifecycleTarget: 'staging',
      humanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      stagingLifecycleMutationAuthorized: false,
      stagingRuntimeActivationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(result.nextDisposition).toBe(
      'BUILD_SEPARATE_SOURCE_ADJUDICATED_STAGING_LIFECYCLE_MUTATION',
    );
  });

  it('fails closed when the explicit Product Owner decision is not approved', () => {
    const result =
      evaluateRelationshipSpouseT8SourceAdjudicationGovernanceDecision({
        projectOwnerDecision: 'NOT_APPROVED',
        candidateEvaluation:
          evaluateRelationshipSpouseT8SourceAdjudicationCandidate(),
      });

    expect(result.decisionMaterial.explicitProjectOwnerApproval).toBe(false);
    expect(result.decisionMaterial.decisionPreconditionsSatisfied).toBe(false);
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
    expect(result.gate12Resolution.status).toBe('PENDING');
    expect(result.authorityBoundary.production).toBe('HOLD');
  });

  it('invalidates the decision path when the exact candidate content identity drifts', () => {
    const current =
      evaluateRelationshipSpouseT8SourceAdjudicationCandidate();
    const drifted = {
      ...current,
      candidateRef: {
        ...current.candidateRef,
        contentHash: '0'.repeat(64),
      },
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8SourceAdjudicationGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION,
        candidateEvaluation: drifted,
      });

    expect(result.decisionMaterial.exactCandidateBinding).toBe(false);
    expect(result.decisionMaterial.decisionPreconditionsSatisfied).toBe(false);
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
    expect(result.nextDisposition).toBe(
      'HOLD_AND_REESTABLISH_EXACT_ELIGIBILITY_OR_PROJECT_OWNER_DECISION',
    );
  });

  it('invalidates the decision path when the exact policy identity drifts', () => {
    const current =
      evaluateRelationshipSpouseT8SourceAdjudicationCandidate();
    const drifted = {
      ...current,
      policyRef: {
        ...current.policyRef,
        contentHash: 'f'.repeat(64),
      },
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8SourceAdjudicationGovernanceDecision({
        projectOwnerDecision:
          RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_STAGING_DECISION,
        candidateEvaluation: drifted,
      });

    expect(result.decisionMaterial.exactPolicyBinding).toBe(false);
    expect(result.decisionMaterial.decisionPreconditionsSatisfied).toBe(false);
    expect(result.decisionRef).toBeUndefined();
    expect(result.sourceAdjudicationAuthorityEstablished).toBe(false);
  });

  it('is deterministic for the same exact candidate and governance decision', () => {
    const left =
      buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();
    const right =
      buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();

    expect(left.decisionRef).toEqual(right.decisionRef);
    expect(left.decisionId).toBe(right.decisionId);
    expect(left.postDecisionPolicyEvaluation.evaluationId).toBe(
      right.postDecisionPolicyEvaluation.evaluationId,
    );
    expect(left.decisionId).toMatch(/^[a-f0-9]{64}$/);
  });
});
