import { describe, expect, it } from 'vitest';
import {
  FE041H_CANONICALIZATION_REQUIREMENT_KEYS,
  FE041H_CANONICALIZATION_REQUIREMENTS,
  FE041H_NEXT_FRONTIER,
  FE041H_PRODUCT_SURFACE_CONTRACT_REF,
  FE041H_SATISFIED_REQUIREMENT_KEYS,
  FE041H_UNSATISFIED_REQUIREMENT_KEYS,
  assertIssuedNeutralCandidateCanonicalizationPolicyFE041H,
  issueNeutralCandidateCanonicalizationPolicyFE041H,
} from './neutral-candidate-canonicalization-policy-fe041h.js';

describe('FE041H neutral candidate canonicalization policy', () => {
  it('defines exactly eight admission requirements with four currently satisfied', () => {
    const result = issueNeutralCandidateCanonicalizationPolicyFE041H();
    assertIssuedNeutralCandidateCanonicalizationPolicyFE041H(result);

    expect(FE041H_CANONICALIZATION_REQUIREMENTS.map((entry) => entry.key))
      .toEqual(FE041H_CANONICALIZATION_REQUIREMENT_KEYS);
    expect(result.policyProgression).toEqual({
      requirementCount: 8,
      satisfiedRequirementKeys: FE041H_SATISFIED_REQUIREMENT_KEYS,
      unsatisfiedRequirementKeys: FE041H_UNSATISFIED_REQUIREMENT_KEYS,
      satisfiedRequirementCount: 4,
      unsatisfiedRequirementCount: 4,
    });
  });

  it('issues the governed FE041H product-surface contract for all three FR142 candidates', () => {
    const result = issueNeutralCandidateCanonicalizationPolicyFE041H();
    expect(result.candidateAssessments).toHaveLength(3);
    expect(result.candidateAssessments.map((entry) => entry.metricRef)).toEqual([
      'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
      'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
      'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
    ]);

    for (const candidate of result.candidateAssessments) {
      expect(candidate.metricVersion).toBe('0.1.0');
      expect(candidate.sourceSurfaceKey).toBe('neutral.face.lips_contour_set');
      expect(candidate.candidateUnit).toBe('ratio');
      expect(candidate.productRegionKey).toBe('mouth_lips');
      expect(candidate.productPresence).toBe('required');
      expect(candidate.productUnavailableSurfaceRef).toBeNull();
      expect(candidate.productSurfaceContractRef).toBe(FE041H_PRODUCT_SURFACE_CONTRACT_REF);
      expect(candidate.productSurfaceContractIssued).toBe(true);
      expect(candidate.empiricalRepeatCaptureEstablished).toBe(false);
      expect(candidate.captureQualityAdmissionEvidenceIssued).toBe(false);
      expect(candidate.duplicateAndRedundancyReviewComplete).toBe(false);
      expect(candidate.successorContractVersion).toBeNull();
      expect(candidate.migrationDesignRef).toBeNull();
      expect(candidate.registryAdmissionDecisionRef).toBeNull();
      expect(candidate.endToEndAdmissionProvenanceComplete).toBe(false);
      expect(candidate.canonicalizationAuthorized).toBe(false);
    }
  });

  it('preserves FE035B immutability and refuses to treat zero identity overlap as admission', () => {
    const result = issueNeutralCandidateCanonicalizationPolicyFE041H();
    expect(result.currentRegistry).toEqual({
      contractVersion: 'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1',
      metricCount: 13,
      mutateV1InPlaceAuthorized: false,
      newNeutralMetricRequiresNewContractVersion: true,
      semanticAuthorityMayBeInferredFromRegistryMembership: false,
    });
    expect(result.exactIdentityReview).toEqual({
      candidateMetricCount: 3,
      currentCanonicalMetricCount: 13,
      exactIntersectionCount: 0,
      exactIdentityNonOverlapMeansAdmission: false,
      exactIdentityNonOverlapMeansNonRedundant: false,
    });
  });

  it('keeps semantic mapping evidence unchanged at FE041G 3/10', () => {
    const result = issueNeutralCandidateCanonicalizationPolicyFE041H();
    expect(result.mappingEvidenceLane).toEqual({
      fe041gSatisfiedRequirementCount: 3,
      fe041gUnsatisfiedRequirementCount: 7,
      neutralCanonicalizationPolicyChangesMappingEvidenceCount: false,
      mappingRelationIssued: false,
      traditionalFangBindingIssued: false,
    });
  });

  it('keeps registry, semantic, calibration, and production authority closed', () => {
    const result = issueNeutralCandidateCanonicalizationPolicyFE041H();
    expect(result.authorityBoundary).toMatchObject({
      canonicalizationPolicyDefined: true,
      policyDefinitionMeansCandidateAdmission: false,
      structuralAppendValidityMeansGovernedAdmission: false,
      exactIdentityNonOverlapMeansGovernedAdmission: false,
      syntheticVerificationMeansProductStability: false,
      neutralRegistryMembershipMeansTraditionalBinding: false,
      currentRegistryMutationAuthorized: false,
      successorRegistryIssued: false,
      candidateCanonicalizationAuthorized: false,
      mappingRelationIssued: false,
      traditionalFangBindingIssued: false,
      metricDirectionalityIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classificationIssued: false,
      scoreIssued: false,
      rankIssued: false,
      deterministicCriterionStateIssued: false,
      ruleAuthorityIssued: false,
      structuredClaimIssued: false,
      narrativeAuthorityIssued: false,
      productionSemanticExecutionAuthorized: false,
    });
    expect(result.nextFrontier).toBe(FE041H_NEXT_FRONTIER);
  });

  it('rejects structural clones as issued authority', () => {
    const result = issueNeutralCandidateCanonicalizationPolicyFE041H();
    expect(() =>
      assertIssuedNeutralCandidateCanonicalizationPolicyFE041H(
        JSON.parse(JSON.stringify(result)),
      ),
    ).toThrow(/not issued/u);
  });
});
