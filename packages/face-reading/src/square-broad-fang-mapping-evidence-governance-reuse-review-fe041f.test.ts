import { describe, expect, it } from 'vitest';
import {
  FE041F_CANDIDATE_METRIC_REFS,
  FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS,
  FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS,
  assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F,
  issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F,
} from './square-broad-fang-mapping-evidence-governance-reuse-review-fe041f.js';

describe('FE041F square-broad mapping-evidence governance reuse review', () => {
  it('reuses only FR185 evidence-governance structure, not Xi/Chang semantics', () => {
    const result =
      issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
    assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F(
      result,
    );

    expect(result.candidateMetricRefs).toEqual(FE041F_CANDIDATE_METRIC_REFS);
    expect(result.governanceReuse).toMatchObject({
      evidenceGovernanceStructureReusable: true,
      criterionSpecificEvidenceStillRequired: true,
      xiChangMetricIdentityReuseAuthorized: false,
      xiChangMappingRelationReuseAuthorized: false,
      xiChangDirectionalityReuseAuthorized: false,
      xiChangThresholdReuseAuthorized: false,
      xiChangCalibrationReuseAuthorized: false,
    });
  });

  it('records exactly two satisfied and eight unsatisfied mapping requirements', () => {
    const result =
      issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
    expect(result.evidenceProgression.satisfiedRequirementKeys)
      .toEqual(FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS);
    expect(result.evidenceProgression.unsatisfiedRequirementKeys)
      .toEqual(FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS);
    expect(result.evidenceProgression).toMatchObject({
      mappingEvidenceRequirementCount: 10,
      satisfiedRequirementCount: 2,
      unsatisfiedRequirementCount: 8,
      explicitMappingHypothesesIssued: 0,
      independentHumanSemanticLabelsIssued: 0,
      empiricalRepeatabilityEstablished: false,
      constructValidityEstablished: false,
    });
  });

  it('keeps neutral canonicalization separate from semantic mapping evidence', () => {
    const result =
      issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
    expect(result.neutralCanonicalizationLane).toEqual({
      currentCanonicalRegistryContract:
        'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1',
      currentCanonicalRegistryMetricCount: 13,
      candidateCanonicalIntersectionCount: 0,
      mutateCurrentRegistryInPlaceAuthorized: false,
      newNeutralMetricRequiresNewContractVersion: true,
      fr185DefinesNeutralRegistryCanonicalizationPolicy: false,
      candidateCanonicalizationPolicyDefined: false,
      candidateCanonicalizationAuthorized: false,
      successorRegistryIssued: false,
    });
  });

  it('does not require threshold selection to define or admit mapping evidence requirements', () => {
    const result =
      issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
    expect(result.mappingAuthorityBoundary).toMatchObject({
      mappingRequirementsDefinitionMeansMappingAdmission: false,
      mappingRelationIssued: false,
      traditionalFangBindingIssued: false,
      metricDirectionalityIssued: false,
      thresholdSelectionRequiredBeforeMappingAdmission: false,
      thresholdIssued: false,
      calibrationEvidenceIssued: false,
      calibrationProtocolIssued: false,
      deterministicCriterionStateIssued: false,
      structuredClaimIssued: false,
      narrativeAuthorityIssued: false,
      productionSemanticExecutionAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
  });

  it('rejects structural clones as issued authority', () => {
    const result =
      issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
    expect(() =>
      assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F(
        JSON.parse(JSON.stringify(result)),
      ),
    ).toThrow();
  });
});
