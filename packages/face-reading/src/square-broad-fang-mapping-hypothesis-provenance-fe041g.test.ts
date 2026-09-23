import { describe, expect, it } from 'vitest';
import {
  FE041G_MAPPING_HYPOTHESES,
  FE041G_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT,
  FE041G_NEXT_FRONTIER,
  FE041G_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
  assertFE041GMappingHypothesis,
  assertIssuedSquareBroadFangMappingHypothesisProvenanceFE041G,
  issueSquareBroadFangMappingHypothesisProvenanceFE041G,
  type SquareBroadFangMappingHypothesisFE041GV1,
} from './square-broad-fang-mapping-hypothesis-provenance-fe041g.js';

describe('FE041G square-broad Fang mapping-hypothesis provenance', () => {
  it('closes only explicit mapping-hypothesis provenance and advances evidence from 2/10 to 3/10', () => {
    const result = issueSquareBroadFangMappingHypothesisProvenanceFE041G();
    assertIssuedSquareBroadFangMappingHypothesisProvenanceFE041G(result);

    expect(result.evidenceProgression.newlySatisfiedRequirement)
      .toBe(FE041G_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT);
    expect(result.evidenceProgression.satisfiedRequirementKeys).toEqual([
      'source_concept_identity_and_pinned_provenance',
      'candidate_neutral_metric_identity_and_versioned_definition',
      'explicit_mapping_hypothesis_provenance',
    ]);
    expect(result.evidenceProgression.remainingUnsatisfiedRequirements)
      .toBe(FE041G_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS);
    expect(result.evidenceProgression).toMatchObject({
      mappingEvidenceRequirementCount: 10,
      satisfiedRequirementCount: 3,
      unsatisfiedRequirementCount: 7,
      actualMappingAdmitted: false,
    });
  });

  it('freezes exactly three source-pinned non-directional hypotheses for the exact FR142 candidates', () => {
    const result = issueSquareBroadFangMappingHypothesisProvenanceFE041G();
    expect(result.hypotheses).toBe(FE041G_MAPPING_HYPOTHESES);
    expect(result.hypotheses).toHaveLength(3);
    expect(result.hypotheses.map((item) => item.candidateMetricRef)).toEqual([
      'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
      'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
      'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
    ]);
    expect(result.hypotheses.map((item) => item.constructFacet)).toEqual([
      'structural_regularity_and_alignment',
      'rectilinear_segment_persistence',
      'localized_corner_distinctness_supporting_later_commentary',
    ]);

    for (const hypothesis of result.hypotheses) {
      expect(hypothesis.focalTraditionalTerm).toBe('方');
      expect(hypothesis.sourceConcept).toBe('方大');
      expect(hypothesis.sourcePassageRef)
        .toBe('passage.shenxiang.five_officers.intake.nlc_1925');
      expect(hypothesis.sourceWitnessId)
        .toBe('witness.shenxiang_quanbian.nlc_1925');
      expect(hypothesis.sourceChapter).toBe('出納官');
      expect(hypothesis.sourceScanPage).toBe(88);
      expect(hypothesis.sourceVerificationStatus).toBe('scan_checked');
      expect(hypothesis.sourceClause).toBe('口須要方大');
      expect(hypothesis.reviewedMethodologyRef)
        .toBe('method.shenxiang.five_officers.intake_criteria@0.3.0');
      expect(hypothesis.sourceLineageConflictPreserved).toBe(true);
      expect(hypothesis.frozenBeforeEvidenceCollection).toBe(true);
    }
  });

  it('keeps mapping, directionality, thresholds, calibration, evidence collection, and canonicalization closed', () => {
    const result = issueSquareBroadFangMappingHypothesisProvenanceFE041G();

    for (const hypothesis of result.hypotheses) {
      expect(hypothesis.directionality).toBeNull();
      expect(hypothesis.thresholdRef).toBeNull();
      expect(hypothesis.percentileRef).toBeNull();
      expect(hypothesis.referencePopulationRef).toBeNull();
      expect(hypothesis.calibrationRef).toBeNull();
      expect(hypothesis.classifierRef).toBeNull();
      expect(hypothesis.mappingRelationRef).toBeNull();
      expect(hypothesis.traditionalBindingRef).toBeNull();
      expect(hypothesis.evidenceCollected).toBe(false);
      expect(hypothesis.expertLabelsCollected).toBe(false);
      expect(hypothesis.metricValuesObserved).toBe(false);
      expect(hypothesis.mappingAuthorized).toBe(false);
      expect(hypothesis.candidateCanonicalized).toBe(false);
    }

    expect(result.neutralCanonicalizationLane).toEqual({
      currentCanonicalRegistryContract:
        'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1',
      candidateCanonicalIntersectionCount: 0,
      mutateCurrentRegistryInPlaceAuthorized: false,
      newNeutralMetricRequiresNewContractVersion: true,
      candidateCanonicalizationPolicyDefined: false,
      candidateCanonicalizationAuthorized: false,
      successorRegistryIssued: false,
    });
    expect(result.authorityBoundary).toMatchObject({
      mappingHypothesisProvenanceEstablished: true,
      hypothesisProvenanceAloneAuthorizesMapping: false,
      evidenceCollectionAuthorized: false,
      blindedExpertOperationalizationProtocolIssued: false,
      mappingRelationIssued: false,
      traditionalFangBindingIssued: false,
      metricDirectionalityIssued: false,
      thresholdIssued: false,
      calibrationEvidenceIssued: false,
      calibrationProtocolIssued: false,
      candidateCanonicalizationIssued: false,
      deterministicCriterionStateIssued: false,
      ruleAuthorityIssued: false,
      structuredClaimIssued: false,
      narrativeAuthorityIssued: false,
      productionSemanticExecutionAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
  });

  it('rejects post-hoc mutation or authority widening inside a hypothesis', () => {
    const base = FE041G_MAPPING_HYPOTHESES[0]!;
    const invalid = [
      { ...base, postHocMutationAuthorized: true },
      { ...base, directionality: 'higher_means_more_fang' },
      { ...base, thresholdRef: 'forged.threshold@1' },
      { ...base, calibrationRef: 'forged.calibration@1' },
      { ...base, mappingRelationRef: 'forged.mapping@1' },
      { ...base, traditionalBindingRef: 'forged.binding@1' },
      { ...base, evidenceCollected: true },
      { ...base, expertLabelsCollected: true },
      { ...base, metricValuesObserved: true },
      { ...base, mappingAuthorized: true },
      { ...base, candidateCanonicalized: true },
    ] as unknown as SquareBroadFangMappingHypothesisFE041GV1[];

    for (const hypothesis of invalid) {
      expect(() => assertFE041GMappingHypothesis(hypothesis, base))
        .toThrow(/widening|drift/u);
    }
  });

  it('rejects structural clones and advances only to the next pre-evidence frontier', () => {
    const result = issueSquareBroadFangMappingHypothesisProvenanceFE041G();
    expect(result.nextFrontier).toBe(FE041G_NEXT_FRONTIER);
    expect(() =>
      assertIssuedSquareBroadFangMappingHypothesisProvenanceFE041G(
        JSON.parse(JSON.stringify(result)),
      ),
    ).toThrow(/not issued/u);
  });
});
