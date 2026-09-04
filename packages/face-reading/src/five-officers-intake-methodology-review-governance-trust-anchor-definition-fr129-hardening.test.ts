import { describe, expect, it } from 'vitest';
import {
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129,
  type FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1,
  type MethodologyReviewGovernanceTrustAnchorDefinitionFR129V1,
  type MethodologyReviewGovernanceTrustAnchorRegistryFR129V1,
} from './five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js';

const validAnchor = (): MethodologyReviewGovernanceTrustAnchorDefinitionFR129V1 => ({
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
});

const validCandidate = (): MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 => ({
  registryId: 'registry.face.methodology_review_governance_trust_anchors.candidate',
  version: '0.1.0',
  anchors: [validAnchor()],
});

describe('FR129 methodology review governance trust-anchor definition hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129(forged)).toThrow(/FR-129/);
  });

  it('rejects structural candidates without provenance, designation evidence, or limitations', () => {
    for (const field of ['provenanceRefs', 'designationEvidenceRefs', 'limitations'] as const) {
      const invalidAnchor = {
        ...validAnchor(),
        [field]: [],
      } as unknown as MethodologyReviewGovernanceTrustAnchorDefinitionFR129V1;
      const candidate: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 = {
        registryId: 'registry.face.methodology_review_governance_trust_anchors.invalid_candidate',
        version: '0.1.0',
        anchors: [invalidAnchor],
      };
      expect(() => validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(candidate)).toThrow(/FR-129/);
    }
  });

  it('rejects self-designation and inherited authority shortcuts', () => {
    const forbidden = [
      'selfDesignationAuthorized',
      'sourceVerificationAuthorityInherited',
      'repositoryIdentityAuthorityInherited',
      'pullRequestMergeAuthorityInherited',
      'pieOperationalAuthorityInherited',
      'legacyReviewedScalarAuthorityInherited',
      'externalProviderProvenanceAuthorityInherited',
      'methodologyReviewDecisionAuthorityGranted',
    ] as const;

    for (const field of forbidden) {
      const invalidAnchor = {
        ...validAnchor(),
        [field]: true,
      } as unknown as MethodologyReviewGovernanceTrustAnchorDefinitionFR129V1;
      const candidate: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 = {
        registryId: 'registry.face.methodology_review_governance_trust_anchors.invalid_candidate',
        version: '0.1.0',
        anchors: [invalidAnchor],
      };
      expect(() => validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(candidate)).toThrow(/FR-129/);
    }
  });

  it('rejects duplicate trust-anchor refs even when the definitions are otherwise valid', () => {
    const first = validAnchor();
    const duplicate: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 = {
      registryId: 'registry.face.methodology_review_governance_trust_anchors.candidate',
      version: '0.1.0',
      anchors: [first, { ...first, provenanceRefs: ['provenance.external.other'] }],
    };
    expect(() => validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(duplicate)).toThrow(/duplicate trust-anchor definition/);
  });

  it('does not let a structurally valid external-looking definition authorize any governance or semantic step', () => {
    const candidate = validCandidate();
    expect(validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(candidate)).toBe(candidate);
    expect(FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors).toHaveLength(0);

    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
    expect(value.authorityBoundary.structurallyValidTrustAnchorDefinitionMeansGovernedTrustAnchor).toBe(false);
    expect(value.authorityBoundary.nonEmptyDesignationEvidenceStringMeansExternalDesignationAuthority).toBe(false);
    expect(value.authorityBoundary.selfDesignationMeansIndependentTrustAnchor).toBe(false);
    expect(value.authorityBoundary.repositoryIdentityMeansTrustAnchorDesignation).toBe(false);
    expect(value.authorityBoundary.sourceVerificationMeansTrustAnchorDesignation).toBe(false);
    expect(value.authorityBoundary.pullRequestMergeMeansTrustAnchorDesignation).toBe(false);
    expect(value.authorityBoundary.pieOperationalReadinessMeansTrustAnchorDesignation).toBe(false);
    expect(value.authorityBoundary.legacyReviewedScalarMeansTrustAnchorDesignation).toBe(false);
    expect(value.authorityBoundary.externalProviderProvenanceMeansTrustAnchorDesignation).toBe(false);
    expect(value.admission.trustAnchorMaterializationAuthorized).toBe(false);
    expect(value.admission.actorProvenanceAcquisitionAuthorized).toBe(false);
    expect(value.admission.evidencePolicyProvenanceAcquisitionAuthorized).toBe(false);
    expect(value.admission.decisionMaterializationAuthorized).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
