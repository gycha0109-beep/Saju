import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
} from './five-officers-intake-methodology-review-governance-trust-anchor-materialization-admission-fr130.js';
import { FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY } from './five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR130 methodology review governance trust-anchor materialization admission', () => {
  it('blocks trust-anchor materialization without governed external designation', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130(value);

    expect(value.authorityState).toBe(
      'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation',
    );
    expect(value.predecessor.trustAnchorDefinitionCount).toBe(0);
    expect(value.predecessor.governedTrustAnchorRef).toBeNull();
    expect(value.materializationRequirements.governedExternalDesignationRequired).toBe(true);
    expect(value.materializationRequirements.designationMustBindExactTrustAnchorDefinition).toBe(true);
    expect(value.currentDesignation.governedExternalDesignationRef).toBeNull();
    expect(value.currentDesignation.governedExternalDesignationAdmissionRef).toBeNull();
    expect(value.currentDesignation.designatedTrustAnchorDefinitionRef).toBeNull();
    expect(value.currentDesignation.materializedTrustAnchorRef).toBeNull();
    expect(value.admission.trustAnchorMaterializationAuthorized).toBe(false);
  });

  it('keeps every governance registry empty and the intake methodology in research', () => {
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
    expect(proposed).toBeUndefined();
    expect(source?.verificationStatus).toBe('scan_checked');
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(0);
    expect(FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors).toHaveLength(0);
  });

  it('keeps actor/policy provenance, decision, promotion, and semantics closed', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    expect(value.admission.actorProvenanceAcquisitionAuthorized).toBe(false);
    expect(value.admission.evidencePolicyProvenanceAcquisitionAuthorized).toBe(false);
    expect(value.admission.actorProvenanceAdmissionAuthorized).toBe(false);
    expect(value.admission.evidencePolicyProvenanceAdmissionAuthorized).toBe(false);
    expect(value.admission.actorRegistryAppendAuthorized).toBe(false);
    expect(value.admission.evidencePolicyRegistryAppendAuthorized).toBe(false);
    expect(value.admission.decisionMaterializationAuthorized).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
    expect(value.admission.reviewedSuccessorIssued).toBe(false);
    expect(value.execution.externalDesignationRecordsPersisted).toBe(0);
    expect(value.execution.externalDesignationAdmissionsIssued).toBe(0);
    expect(value.execution.governanceTrustAnchorsMaterialized).toBe(0);
    expect(value.execution.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(value.execution.reviewedMethodologyDefinitionsIssued).toBe(0);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });

  it('keeps governance numeric policy unresolved', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    expect(value.currentDesignation.configuredQuorum).toBeNull();
    expect(value.currentDesignation.configuredReviewerCount).toBeNull();
    expect(value.currentDesignation.configuredConsensusThreshold).toBeNull();
    expect(value.nextFrontier).toBe(
      'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission',
    );
  });
});
