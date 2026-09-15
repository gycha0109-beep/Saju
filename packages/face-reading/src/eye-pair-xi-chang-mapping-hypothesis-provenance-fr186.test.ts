import { describe, expect, it } from 'vitest';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  FR184_CHANG_METRIC_REF,
  FR184_XI_METRIC_REF,
} from './eye-pair-xi-chang-metric-to-concept-mapping-feasibility-fr184.js';
import {
  FR185_NEXT_FRONTIER,
  FR185_REQUIRED_MAPPING_EVIDENCE_KEYS,
  issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
} from './eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-fr185.js';
import {
  assertFR186AuthorityBoundary,
  assertFR186MappingHypothesis,
  assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186,
  FR186_MAPPING_HYPOTHESES,
  FR186_METHOD_REF,
  FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT,
  FR186_NEXT_FRONTIER,
  FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
  FR186_VERDICT,
  issueEyePairXiChangMappingHypothesisProvenanceFR186,
  type EyePairXiChangMappingHypothesisProvenanceFR186V1,
  type FR186AuthorityBoundaryV1,
  type FR186MappingHypothesisV1,
} from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';

function forgedFR186(): EyePairXiChangMappingHypothesisProvenanceFR186V1 {
  return Object.freeze({}) as unknown as EyePairXiChangMappingHypothesisProvenanceFR186V1;
}

describe('FR186 Xi/Chang mapping hypothesis provenance', () => {
  it('closes only the FR185 explicit hypothesis-provenance prerequisite', () => {
    const fr185 = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();
    const result = issueEyePairXiChangMappingHypothesisProvenanceFR186();

    expect(FR185_NEXT_FRONTIER).toBe(
      'establish_governed_xi_chang_mapping_hypothesis_provenance_before_blinded_operationalization_directionality_or_calibration',
    );
    expect(FR185_REQUIRED_MAPPING_EVIDENCE_KEYS).toContain(FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT);
    expect(fr185.evidenceRequirements.find((item) => item.key === FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT)?.state)
      .toBe('required_not_satisfied');
    expect(result.upstreamAuthority.fr185RequirementsRemainImmutable).toBe(true);
    expect(result.evidenceProgression.newlySatisfiedRequirement).toBe('explicit_mapping_hypothesis_provenance');
    expect(result.evidenceProgression.remainingUnsatisfiedRequirements).toEqual([
      'independent_blinded_expert_operationalization',
      'repeat_capture_stability',
      'source_grounded_construct_correspondence',
      'alternative_metric_and_confound_rejection',
      'end_to_end_evidence_traceability',
      'explicit_mapping_acceptance_or_rejection_decision',
      'fail_closed_completeness',
    ]);
    expect(result.evidenceProgression.remainingUnsatisfiedRequirements)
      .toBe(FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS);
  });

  it('freezes exactly two non-directional pre-evidence hypotheses', () => {
    const result = issueEyePairXiChangMappingHypothesisProvenanceFR186();
    expect(result.hypotheses).toBe(FR186_MAPPING_HYPOTHESES);
    expect(result.hypotheses).toHaveLength(2);
    expect(result.hypotheses.map((item) => [item.traditionalConcept, item.candidateMetricRef])).toEqual([
      ['細', FR184_XI_METRIC_REF],
      ['長', FR184_CHANG_METRIC_REF],
    ]);
    for (const hypothesis of result.hypotheses) {
      expect(hypothesis.methodologyRef).toBe(FR186_METHOD_REF);
      expect(hypothesis.exactSourcePage).toBe(146);
      expect(hypothesis.frozenBeforeEvidenceCollection).toBe(true);
      expect(hypothesis.postHocMutationAuthorized).toBe(false);
      expect(hypothesis.directionality).toBeNull();
      expect(hypothesis.thresholdRef).toBeNull();
      expect(hypothesis.calibrationRef).toBeNull();
      expect(hypothesis.mappingRelationRef).toBeNull();
      expect(hypothesis.traditionalBindingRef).toBeNull();
      expect(hypothesis.evidenceCollected).toBe(false);
      expect(hypothesis.expertLabelsCollected).toBe(false);
      expect(hypothesis.metricValuesObserved).toBe(false);
      expect(hypothesis.mappingAuthorized).toBe(false);
    }
  });

  it('rejects post-hoc mutation, directionality, evidence injection, or binding authority', () => {
    const base = FR186_MAPPING_HYPOTHESES[0]!;
    const invalid = [
      { ...base, postHocMutationAuthorized: true },
      { ...base, directionality: 'lower_means_more_xi' },
      { ...base, thresholdRef: 'forged.threshold@1' },
      { ...base, calibrationRef: 'forged.calibration@1' },
      { ...base, mappingRelationRef: 'forged.mapping@1' },
      { ...base, traditionalBindingRef: 'forged.binding@1' },
      { ...base, evidenceCollected: true },
      { ...base, expertLabelsCollected: true },
      { ...base, metricValuesObserved: true },
      { ...base, mappingAuthorized: true },
    ] as unknown as FR186MappingHypothesisV1[];

    for (const hypothesis of invalid) {
      expect(() => assertFR186MappingHypothesis(hypothesis, base)).toThrow(/widening|drift/u);
    }
  });

  it('preserves all thirteen FR183/FR184 blockers', () => {
    const result = issueEyePairXiChangMappingHypothesisProvenanceFR186();
    expect(result.blockerAccounting.resolvedExistingFR184Blockers).toEqual([]);
    expect(result.blockerAccounting.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.blockerAccounting.remainingBlockers).toHaveLength(13);
    expect(result.blockerAccounting.hypothesisProvenanceDoesNotResolveMappingBlocker).toBe(true);
    expect(result.blockerAccounting.hypothesisProvenanceDoesNotResolveDirectionalityBlocker).toBe(true);
    expect(result.blockerAccounting.hypothesisProvenanceDoesNotResolveCalibrationBlockers).toBe(true);
    expect(result.blockerAccounting.hypothesisProvenanceDoesNotResolveCompoundBlocker).toBe(true);
  });

  it('rejects evidence collection, semantic binding, directionality, calibration, composition, and Production widening', () => {
    const result = issueEyePairXiChangMappingHypothesisProvenanceFR186();
    expect(() => assertFR186AuthorityBoundary(result.authorityBoundary)).not.toThrow();

    const invalid = [
      { ...result.authorityBoundary, hypothesisProvenanceAloneAuthorizesMapping: true },
      { ...result.authorityBoundary, evidenceCollectionAuthorized: true },
      { ...result.authorityBoundary, blindedExpertOperationalizationProtocolIssued: true },
      { ...result.authorityBoundary, xiMetricBindingAuthorized: true },
      { ...result.authorityBoundary, changMetricBindingAuthorized: true },
      { ...result.authorityBoundary, metricDirectionalityAuthorized: true },
      { ...result.authorityBoundary, stableCriterionIdentityIssued: true },
      { ...result.authorityBoundary, thresholdIssued: true },
      { ...result.authorityBoundary, percentileIssued: true },
      { ...result.authorityBoundary, referencePopulationIssued: true },
      { ...result.authorityBoundary, calibrationEvidenceIssued: true },
      { ...result.authorityBoundary, calibrationProtocolIssued: true },
      { ...result.authorityBoundary, calibratedDecisionRuleIssued: true },
      { ...result.authorityBoundary, classifierIssued: true },
      { ...result.authorityBoundary, scoreIssued: true },
      { ...result.authorityBoundary, rankIssued: true },
      { ...result.authorityBoundary, traditionalCunMappingAuthorized: true },
      { ...result.authorityBoundary, compoundXiErChangRuleAuthorized: true },
      { ...result.authorityBoundary, morphologyProduced: true },
      { ...result.authorityBoundary, criterionStatesIssued: 1 },
      { ...result.authorityBoundary, structuredClaimsIssued: 1 },
      { ...result.authorityBoundary, boundedNarrativesIssued: 1 },
      { ...result.authorityBoundary, productionRuleAuthorized: true },
      { ...result.authorityBoundary, traditionalSemanticAuthorityPromoted: true },
    ] as unknown as FR186AuthorityBoundaryV1[];

    for (const boundary of invalid) {
      expect(() => assertFR186AuthorityBoundary(boundary)).toThrow(/widening/u);
    }
  });

  it('issues only pre-evidence hypothesis provenance and advances to blinded operationalization protocol', () => {
    const result = issueEyePairXiChangMappingHypothesisProvenanceFR186();
    expect(result.verdict).toBe(FR186_VERDICT);
    expect(FR186_VERDICT).toBe(
      'GOVERNED_XI_CHANG_MAPPING_HYPOTHESIS_PROVENANCE_ESTABLISHED_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED',
    );
    expect(result.nextFrontier).toBe(FR186_NEXT_FRONTIER);
    expect(FR186_NEXT_FRONTIER).toBe(
      'define_governed_blinded_expert_operationalization_protocol_for_xi_chang_mapping_hypotheses_before_evidence_collection_directionality_or_calibration',
    );
    expect(Object.values(result.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(result.authorityBoundary.productionRuleAuthorized).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthorityPromoted).toBe(false);
    expect(() => assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186(forgedFR186())).toThrow(/not issued/u);
  });
});
