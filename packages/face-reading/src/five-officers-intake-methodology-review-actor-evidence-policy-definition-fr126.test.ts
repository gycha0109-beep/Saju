import { describe, expect, it } from 'vitest';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  validateMethodologyReviewAuthorityActorRegistryFR126,
  validateMethodologyReviewEvidencePolicyRegistryFR126,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR126 methodology review actor/evidence-policy definition contracts', () => {
  it('establishes actor and evidence-policy contracts without materializing governed definitions', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126(value);

    expect(value.authorityState).toBe(
      'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions',
    );
    expect(value.admission.actorDefinitionContractReady).toBe(true);
    expect(value.admission.evidencePolicyDefinitionContractReady).toBe(true);
    expect(value.admission.governedActorDefinitionPresent).toBe(false);
    expect(value.admission.governedEvidencePolicyDefinitionPresent).toBe(false);
    expect(value.admission.decisionMaterializationAuthorized).toBe(false);
  });

  it('keeps the current actor and evidence-policy registries empty and structurally valid', () => {
    expect(() => validateMethodologyReviewAuthorityActorRegistryFR126(
      FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
    )).not.toThrow();
    expect(() => validateMethodologyReviewEvidencePolicyRegistryFR126(
      FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
    )).not.toThrow();

    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    expect(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(0);
    expect(value.currentGovernance.actorDefinitionCount).toBe(0);
    expect(value.currentGovernance.evidencePolicyDefinitionCount).toBe(0);
    expect(value.currentGovernance.governedAuthorityActorRef).toBeNull();
    expect(value.currentGovernance.governedReviewEvidencePolicyRef).toBeNull();
    expect(value.currentGovernance.admittedReviewEvidenceRefs).toEqual([]);
    expect(value.contracts.configuredQuorum).toBeNull();
    expect(value.contracts.configuredReviewerCount).toBeNull();
    expect(value.contracts.configuredConsensusThreshold).toBeNull();
  });

  it('preserves the research methodology, scan-checked witness, absent successor, and empty FR124 decision registry', () => {
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
    expect(source?.verificationStatus).toBe('scan_checked');
    expect(proposed).toBeUndefined();
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
  });

  it('keeps every downstream methodology and semantic authority surface closed', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    expect(value.execution.authorityActorDefinitionsPersisted).toBe(0);
    expect(value.execution.reviewEvidencePolicyDefinitionsPersisted).toBe(0);
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
