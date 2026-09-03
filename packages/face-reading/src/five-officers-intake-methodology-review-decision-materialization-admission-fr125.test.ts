import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
} from './five-officers-intake-methodology-review-decision-materialization-admission-fr125.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR125 intake methodology review decision materialization admission', () => {
  it('blocks decision materialization until governed actor and evidence policies exist', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125(value);

    expect(value.authorityState).toBe(
      'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy',
    );
    expect(value.admission.fr124DecisionContractReady).toBe(true);
    expect(value.admission.sourcePrerequisiteSatisfied).toBe(true);
    expect(value.admission.authorityActorGovernanceReady).toBe(false);
    expect(value.admission.reviewEvidenceGovernanceReady).toBe(false);
    expect(value.admission.decisionMaterializationAuthorized).toBe(false);
  });

  it('does not invent actor, evidence-policy, quorum, reviewer-count, or consensus authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    expect(value.currentGovernance.governedAuthorityActorRegistryRef).toBeNull();
    expect(value.currentGovernance.governedAuthorityActorRef).toBeNull();
    expect(value.currentGovernance.governedReviewEvidencePolicyRef).toBeNull();
    expect(value.currentGovernance.admittedReviewEvidenceRefs).toEqual([]);
    expect(value.currentGovernance.configuredQuorum).toBeNull();
    expect(value.currentGovernance.configuredReviewerCount).toBeNull();
    expect(value.currentGovernance.configuredConsensusThreshold).toBeNull();
  });

  it('preserves the research methodology, witness-qualified source, and empty FR124 decision registry', () => {
    const method = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (candidate) => `${candidate.methodologyId}@${candidate.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
    );
    const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (candidate) => `${candidate.methodologyId}@${candidate.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
      (candidate) => candidate.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
    );

    expect(method?.reviewStatus).toBe('research');
    expect(method?.sourceRefs).toEqual(['passage.shenxiang.five_officers.intake.nlc_1925']);
    expect(proposed).toBeUndefined();
    expect(source?.verificationStatus).toBe('scan_checked');
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
  });

  it('keeps all downstream semantic authority closed', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
    expect(value.execution.authorityActorsIssued).toBe(0);
    expect(value.execution.reviewEvidencePoliciesIssued).toBe(0);
    expect(value.execution.admittedReviewEvidenceItemsIssued).toBe(0);
    expect(value.execution.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(value.execution.methodologyReviewAuthorizationsIssued).toBe(0);
    expect(value.execution.methodologyReviewPromotionsIssued).toBe(0);
    expect(value.execution.reviewedMethodologyDefinitionsIssued).toBe(0);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.calibrationProtocolsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
