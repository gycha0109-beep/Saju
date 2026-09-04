import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
} from './five-officers-intake-methodology-review-governance-trust-anchor-admission-fr128.js';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR128 methodology review governance trust-anchor admission', () => {
  it('blocks provenance acquisition and admission without an independent governance trust anchor', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128(value);

    expect(value.authorityState).toBe(
      'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor',
    );
    expect(value.admission.independentGovernanceTrustAnchorPresent).toBe(false);
    expect(value.admission.actorProvenanceAcquisitionAuthorized).toBe(false);
    expect(value.admission.evidencePolicyProvenanceAcquisitionAuthorized).toBe(false);
    expect(value.admission.actorProvenanceAdmissionAuthorized).toBe(false);
    expect(value.admission.evidencePolicyProvenanceAdmissionAuthorized).toBe(false);
  });

  it('keeps the root governance and numeric review policy unresolved', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    expect(value.currentRootGovernance.independentGovernanceTrustAnchorRef).toBeNull();
    expect(value.currentRootGovernance.independentAuthorityActorRef).toBeNull();
    expect(value.currentRootGovernance.actorProvenanceCandidateRef).toBeNull();
    expect(value.currentRootGovernance.actorProvenanceAdmissionRef).toBeNull();
    expect(value.currentRootGovernance.evidencePolicyProvenanceCandidateRef).toBeNull();
    expect(value.currentRootGovernance.evidencePolicyProvenanceAdmissionRef).toBeNull();
    expect(value.currentRootGovernance.configuredQuorum).toBeNull();
    expect(value.currentRootGovernance.configuredReviewerCount).toBeNull();
    expect(value.currentRootGovernance.configuredConsensusThreshold).toBeNull();
  });

  it('preserves the research methodology and all empty methodology-review governance registries', () => {
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
    expect(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(0);
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
  });

  it('keeps all downstream semantic authority closed', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    expect(value.execution.governanceTrustAnchorsPersisted).toBe(0);
    expect(value.execution.governanceTrustAnchorAdmissionsIssued).toBe(0);
    expect(value.execution.actorProvenanceCandidatesPersisted).toBe(0);
    expect(value.execution.actorProvenanceAdmissionsIssued).toBe(0);
    expect(value.execution.evidencePolicyProvenanceCandidatesPersisted).toBe(0);
    expect(value.execution.evidencePolicyProvenanceAdmissionsIssued).toBe(0);
    expect(value.execution.authorityActorDefinitionsPersisted).toBe(0);
    expect(value.execution.reviewEvidencePolicyDefinitionsPersisted).toBe(0);
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
