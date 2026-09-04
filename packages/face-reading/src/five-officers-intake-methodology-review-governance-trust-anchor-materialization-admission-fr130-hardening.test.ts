import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
  type FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1,
} from './five-officers-intake-methodology-review-governance-trust-anchor-materialization-admission-fr130.js';
import {
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129,
  type MethodologyReviewGovernanceTrustAnchorRegistryFR129V1,
} from './five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js';

describe('FR130 methodology review governance trust-anchor materialization admission hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130(forged)).toThrow(/FR-130/);
  });

  it('does not let a structurally valid FR129 candidate substitute for governed external designation', () => {
    const candidate: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 = {
      registryId: 'registry.face.methodology_review_governance_trust_anchors.structural_candidate',
      version: '0.1.0',
      anchors: [{
        anchorId: 'anchor.structural.candidate',
        version: '0.1.0',
        authorityScope: 'methodology_review_governance_root',
        provenanceRefs: ['provenance.external.structural_candidate'],
        designationEvidenceRefs: ['evidence.external.designation.structural_candidate'],
        limitations: ['structural validation is not governed external designation'],
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
      }],
    };
    expect(validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(candidate)).toBe(candidate);
    expect(FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors).toHaveLength(0);

    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    expect(value.materializationRequirements.structurallyValidCandidateMaySubstituteForExternalDesignation).toBe(false);
    expect(value.authorityBoundary.structurallyValidCandidateMeansGovernedExternalDesignation).toBe(false);
    expect(value.admission.governedExternalDesignationPresent).toBe(false);
    expect(value.admission.trustAnchorMaterializationAuthorized).toBe(false);
  });

  it('forbids every known shortcut to external designation authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    expect(value.materializationRequirements.nonEmptyDesignationEvidenceStringMaySubstituteForGovernedDesignation).toBe(false);
    expect(value.materializationRequirements.sourceVerificationMaySubstituteForExternalDesignation).toBe(false);
    expect(value.materializationRequirements.repositoryIdentityMaySubstituteForExternalDesignation).toBe(false);
    expect(value.materializationRequirements.pullRequestMergeMaySubstituteForExternalDesignation).toBe(false);
    expect(value.materializationRequirements.pieOperationalReadinessMaySubstituteForExternalDesignation).toBe(false);
    expect(value.materializationRequirements.legacyReviewedScalarMaySubstituteForExternalDesignation).toBe(false);
    expect(value.materializationRequirements.externalProviderSignatureValidityMaySubstituteForExternalDesignation).toBe(false);
    expect(value.authorityBoundary.designationEvidenceStringMeansGovernedExternalDesignation).toBe(false);
    expect(value.authorityBoundary.sourceVerificationMeansExternalDesignationAuthority).toBe(false);
    expect(value.authorityBoundary.repositoryIdentityMeansExternalDesignationAuthority).toBe(false);
    expect(value.authorityBoundary.pullRequestMergeMeansExternalDesignationAuthority).toBe(false);
    expect(value.authorityBoundary.pieOperationalReadinessMeansExternalDesignationAuthority).toBe(false);
    expect(value.authorityBoundary.legacyReviewedScalarMeansExternalDesignationAuthority).toBe(false);
    expect(value.authorityBoundary.externalProviderSignatureValidityMeansMethodologyReviewDesignationAuthority).toBe(false);
  });

  it('does not collapse trust-anchor materialization into downstream authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
    expect(value.authorityBoundary.trustAnchorDefinitionContractMeansMaterializationAuthority).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansActorProvenanceAdmission).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansEvidencePolicyProvenanceAdmission).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansReviewDecisionAuthority).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansReviewedPromotion).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansThreshold).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.trustAnchorMaterializationMeansClaim).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
  });
});
