import { describe, expect, it } from 'vitest';
import {
  FACE_FR131_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR131_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
  FACE_FR131_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131,
} from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR131 project-owner methodology review governance materialization', () => {
  it('materializes the project-owner single-approver governance without issuing a target-specific review decision', () => {
    const value = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
    assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(value);

    expect(value.authorityState).toBe(
      'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending',
    );
    expect(value.governanceDecision.authorityRoleRef).toBe('role.myeongha.project_owner');
    expect(value.governanceDecision.requiredApprovalCount).toBe(1);
    expect(value.governanceDecision.configuredReviewerCount).toBe(1);
    expect(value.governanceDecision.configuredQuorum).toBeNull();
    expect(value.governanceDecision.configuredConsensusThreshold).toBeNull();
    expect(value.governanceDecision.externalExpertRequired).toBe(false);
    expect(value.governanceDecision.targetSpecificApprovalRequired).toBe(true);
    expect(value.admission.trustAnchorMaterialized).toBe(true);
    expect(value.admission.futureTargetSpecificDecisionMaterializationAuthorized).toBe(true);
    expect(value.admission.targetSpecificReviewDecisionPresent).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
  });

  it('persists exactly one governed trust anchor, actor, and evidence policy in FR131', () => {
    validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(
      FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
    );
    expect(FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY.decisions).toHaveLength(1);
    expect(FACE_FR131_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors).toHaveLength(1);
    expect(FACE_FR131_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(1);
    expect(FACE_FR131_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(1);

    const value = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
    expect(value.currentGovernance.governedTrustAnchorRef).toBe(
      'anchor.myeongha.project_owner_methodology_review@0.1.0',
    );
    expect(value.currentGovernance.governedAuthorityActorRef).toBe('actor.myeongha.project_owner@0.1.0');
    expect(value.currentGovernance.governedReviewEvidencePolicyRef).toBe(
      'policy.myeongha.project_owner_single_approver_methodology_review@0.1.0',
    );
  });

  it('keeps the target methodology research until a separate target-specific owner approval is issued', () => {
    const target = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (candidate) => `${candidate.methodologyId}@${candidate.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
    );
    const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (candidate) => `${candidate.methodologyId}@${candidate.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
      (candidate) => candidate.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
    );

    expect(target?.reviewStatus).toBe('research');
    expect(target?.sourceRefs).toEqual(['passage.shenxiang.five_officers.intake.nlc_1925']);
    expect(proposed).toBeUndefined();
    expect(source?.verificationStatus).toBe('scan_checked');
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
  });

  it('opens only the future decision path and keeps semantic execution closed', () => {
    const value = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
    expect(value.execution.governanceDecisionRecordsPersisted).toBe(1);
    expect(value.execution.governanceTrustAnchorsMaterialized).toBe(1);
    expect(value.execution.authorityActorDefinitionsPersisted).toBe(1);
    expect(value.execution.reviewEvidencePolicyDefinitionsPersisted).toBe(1);
    expect(value.execution.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(value.execution.methodologyReviewPromotionsIssued).toBe(0);
    expect(value.execution.reviewedMethodologyDefinitionsIssued).toBe(0);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
    expect(value.nextFrontier).toBe('project_owner_target_specific_intake_methodology_review_decision');
  });
});
