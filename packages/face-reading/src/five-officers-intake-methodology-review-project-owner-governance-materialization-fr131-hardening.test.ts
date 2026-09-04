import { describe, expect, it } from 'vitest';
import {
  FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131,
  type FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1,
  type ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1,
} from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js';

describe('FR131 project-owner methodology review governance hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
    const forged = structuredClone(issued) as FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1;
    expect(() => assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(forged)).toThrow(/FR-131/);
  });

  it('rejects changing the required project-owner approval count away from one', () => {
    const decision = FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY.decisions[0];
    expect(decision).toBeDefined();
    const invalid = {
      ...FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
      decisions: [{ ...decision!, requiredApprovalCount: 2 }],
    } as unknown as ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1;
    expect(() => validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(invalid)).toThrow(/FR-131/);
  });

  it('rejects silently adding an external-expert requirement or consensus threshold', () => {
    const decision = FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY.decisions[0];
    expect(decision).toBeDefined();
    const expertRequired = {
      ...FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
      decisions: [{ ...decision!, externalExpertRequired: true }],
    } as unknown as ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1;
    const inventedConsensus = {
      ...FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
      decisions: [{ ...decision!, configuredConsensusThreshold: 1 }],
    } as unknown as ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1;
    expect(() => validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(expertRequired)).toThrow(/FR-131/);
    expect(() => validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(inventedConsensus)).toThrow(/FR-131/);
  });

  it('rejects governance that removes target-specific approval', () => {
    const decision = FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY.decisions[0];
    expect(decision).toBeDefined();
    const invalid = {
      ...FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
      decisions: [{ ...decision!, targetSpecificApprovalRequired: false }],
    } as unknown as ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1;
    expect(() => validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(invalid)).toThrow(/FR-131/);
  });

  it('does not convert governance materialization into a target approval or semantic authority', () => {
    const value = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
    expect(value.authorityBoundary.projectOwnerGovernanceDecisionMeansTargetMethodologyApproved).toBe(false);
    expect(value.authorityBoundary.singleApproverPolicyMeansAutomaticPromotion).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansTargetMethodologyApproved).toBe(false);
    expect(value.authorityBoundary.actorAuthorityMeansTargetMethodologyApproved).toBe(false);
    expect(value.authorityBoundary.evidencePolicyMeansEvidenceItemAlreadyAdmitted).toBe(false);
    expect(value.authorityBoundary.futureDecisionAuthorizationMeansCurrentDecisionIssued).toBe(false);
    expect(value.authorityBoundary.sourceVerificationMeansMethodologyApproval).toBe(false);
    expect(value.authorityBoundary.repositoryMergeMeansMethodologyApproval).toBe(false);
    expect(value.authorityBoundary.governanceMaterializationMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.governanceMaterializationMeansThreshold).toBe(false);
    expect(value.authorityBoundary.governanceMaterializationMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.governanceMaterializationMeansClaim).toBe(false);
    expect(value.admission.targetSpecificReviewDecisionPresent).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
