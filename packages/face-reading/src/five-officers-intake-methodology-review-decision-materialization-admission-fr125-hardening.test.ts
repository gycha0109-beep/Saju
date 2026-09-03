import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
  type FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1,
} from './five-officers-intake-methodology-review-decision-materialization-admission-fr125.js';

describe('FR125 intake methodology review decision materialization admission hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125(forged)).toThrow(/FR-125/);
  });

  it('forbids actor inference from source checker, git author, PR merger, or legacy reviewed scalar', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    expect(value.materializationRequirements.actorMayBeInferredFromSourceChecker).toBe(false);
    expect(value.materializationRequirements.actorMayBeInferredFromGitHubAuthor).toBe(false);
    expect(value.materializationRequirements.actorMayBeInferredFromPullRequestMerger).toBe(false);
    expect(value.materializationRequirements.actorMayBeInferredFromLegacyReviewedMethodology).toBe(false);
    expect(value.authorityBoundary.sourceVerificationCheckerMeansReviewAuthorityActor).toBe(false);
    expect(value.authorityBoundary.gitCommitAuthorMeansReviewAuthorityActor).toBe(false);
    expect(value.authorityBoundary.pullRequestMergeMeansMethodologyReviewApproval).toBe(false);
    expect(value.authorityBoundary.legacyReviewedScalarMeansTransferableReviewAuthority).toBe(false);
  });

  it('forbids bare strings from satisfying governed actor or evidence authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    expect(value.authorityBoundary.nonEmptyAuthorityActorStringMeansGovernedActor).toBe(false);
    expect(value.authorityBoundary.nonEmptyEvidenceRefStringMeansAdmittedReviewEvidence).toBe(false);
    expect(value.currentGovernance.governedAuthorityActorRef).toBeNull();
    expect(value.currentGovernance.admittedReviewEvidenceRefs).toHaveLength(0);
  });

  it('does not reinterpret PIE operational review as methodology semantic review', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    expect(value.authorityBoundary.pieOperationalReviewMeansMethodologySemanticReview).toBe(false);
    expect(value.admission.reviewEvidenceGovernanceReady).toBe(false);
    expect(value.admission.decisionMaterializationAuthorized).toBe(false);
  });

  it('preserves the boundary from review decision to metric and semantic execution', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    expect(value.authorityBoundary.reviewDecisionMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansThreshold).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansClaim).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
    expect(value.nextFrontier).toBe('methodology_review_authority_actor_and_evidence_policy_definition');
  });
});
