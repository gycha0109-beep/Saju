import { describe, expect, it } from 'vitest';
import {
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129,
  type MethodologyReviewGovernanceTrustAnchorRegistryFR129V1,
} from './five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR129 methodology review governance trust-anchor definition', () => {
  it('establishes a definition contract without materializing a governed trust anchor', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
    assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129(value);

    expect(value.authorityState).toBe(
      'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor',
    );
    expect(value.contract.trustAnchorRegistryRef).toBe(
      'registry.face.methodology_review_governance_trust_anchors.fr129@0.1.0',
    );
    expect(value.contract.provenanceRefsRequired).toBe(true);
    expect(value.contract.externalDesignationEvidenceRefsRequired).toBe(true);
    expect(value.contract.independenceFromTargetActorRegistryRequired).toBe(true);
    expect(value.contract.independenceFromTargetEvidencePolicyRegistryRequired).toBe(true);
    expect(value.contract.selfDesignationAuthorized).toBe(false);
    expect(value.contract.structurallyValidDefinitionAutoAdmitted).toBe(false);
    expect(value.currentGovernance.trustAnchorDefinitionCount).toBe(0);
    expect(value.currentGovernance.governedTrustAnchorRef).toBeNull();
    expect(value.admission.trustAnchorMaterializationAuthorized).toBe(false);
  });

  it('can validate a structural candidate without admitting it into the governed registry', () => {
    const candidate: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 = {
      registryId: 'registry.face.methodology_review_governance_trust_anchors.candidate',
      version: '0.1.0',
      anchors: [
        {
          anchorId: 'anchor.candidate.external_designation',
          version: '0.1.0',
          authorityScope: 'methodology_review_governance_root',
          provenanceRefs: ['provenance.external.candidate'],
          designationEvidenceRefs: ['evidence.external.designation.candidate'],
          limitations: ['candidate-only structural validation does not establish governed authority'],
          independentFromTargetActorRegistry: true,
          independentFromTargetEvidencePolicyRegistry: true,
          selfDesignationAuthorized: false,
          sourceVerificationAuthorityInherited: false,
          repositoryIdentityAuthorityInherited: false,
          pullRequestMergeAuthorityInherited: false,
          pieOperationalAuthorityInherited: false,
          legacyReviewedScalarAuthorityInherited: false,
          externalProviderProvenanceAuthorityInherited: false,
          methodologyReviewDecisionAuthorityGranted: false,
        },
      ],
    };

    expect(validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(candidate)).toBe(candidate);
    expect(FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors).toHaveLength(0);
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
    expect(value.currentGovernance.trustAnchorDefinitionCount).toBe(0);
    expect(value.admission.governedTrustAnchorDefinitionPresent).toBe(false);
    expect(value.admission.trustAnchorMaterializationAuthorized).toBe(false);
  });

  it('preserves the research methodology and all predecessor governance registries', () => {
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
    expect(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(0);
    expect(FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors).toHaveLength(0);
  });

  it('keeps numeric governance policy and all downstream semantic authority closed', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
    expect(value.contract.configuredQuorum).toBeNull();
    expect(value.contract.configuredReviewerCount).toBeNull();
    expect(value.contract.configuredConsensusThreshold).toBeNull();
    expect(value.execution.governanceTrustAnchorDefinitionsPersisted).toBe(0);
    expect(value.execution.governanceTrustAnchorsMaterialized).toBe(0);
    expect(value.execution.actorProvenanceAdmissionsIssued).toBe(0);
    expect(value.execution.evidencePolicyProvenanceAdmissionsIssued).toBe(0);
    expect(value.execution.authorityActorDefinitionsPersisted).toBe(0);
    expect(value.execution.reviewEvidencePolicyDefinitionsPersisted).toBe(0);
    expect(value.execution.methodologyReviewDecisionRecordsIssued).toBe(0);
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
