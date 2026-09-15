import { describe, expect, it } from 'vitest';
import {
  assertFR184AuthorityBoundary,
  assertIssuedEyePairXiChangMetricToConceptMappingFeasibilityFR184,
  FR184_CHANG_METRIC_REF,
  FR184_MAPPING_GAPS,
  FR184_NEXT_FRONTIER,
  FR184_RESEARCH_NOTE_REF,
  FR184_VERDICT,
  FR184_XI_METRIC_REF,
  issueEyePairXiChangMetricToConceptMappingFeasibilityFR184,
  type EyePairXiChangMetricToConceptMappingFeasibilityFR184V1,
  type FR184AuthorityBoundaryV1,
} from './eye-pair-xi-chang-metric-to-concept-mapping-feasibility-fr184.js';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';

function forgedFR184(): EyePairXiChangMetricToConceptMappingFeasibilityFR184V1 {
  return Object.freeze({}) as unknown as EyePairXiChangMetricToConceptMappingFeasibilityFR184V1;
}

describe('FR184 Xi/Chang metric-to-concept mapping feasibility', () => {
  it('reviews the exact direct-source wording without treating candidate neutral geometry as source semantics', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();

    expect(result.upstreamAuthority).toEqual({
      fr175Verdict: 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION',
      fr176Verdict: 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION',
      fr183Verdict: 'SOURCE_PAGE_PREREQUISITES_SATISFIED_OPERATIONALIZATION_REQUIREMENTS_REVIEWED_TRADITIONAL_BINDING_NOT_ADMITTED',
      fr183NextFrontier: 'review_source_authorized_xi_chang_metric_to_concept_mapping_feasibility_before_directionality_or_calibration',
      exactSourcePagesPinned: true,
      provenanceClosureMeansSemanticMapping: false,
    });
    expect(result.sourceReview.fr175RelevantClause).toBe('或細長極寸');
    expect(result.sourceReview.fr176RelevantClauses).toEqual(['細而長', '目長一寸']);
    expect(result.sourceReview.sourceUsesImplementationMetricIdentifiers).toBe(false);
    expect(result.sourceReview.sourceDefinesCoordinateFrame).toBe(false);
    expect(result.sourceReview.sourceDefinesRoleInvariantTwoEyeAggregation).toBe(false);
    expect(result.sourceReview.sourceDefinesNormalizedFullMeshDenominator).toBe(false);
    expect(result.sourceReview.translationUsedAsAuthority).toBe(false);
    expect(result.sourceReview.secondarySourceUsedAsAuthority).toBe(false);
  });

  it('keeps the Xi candidate metric neutral and finds no source-authorized mapping relation', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();

    expect(result.xiMappingReview).toEqual({
      traditionalConcept: '細',
      sourceClause: '細而長',
      candidateMetricRef: FR184_XI_METRIC_REF,
      neutralMetricAvailable: true,
      candidateGeometricRelevanceForFutureReview: true,
      neutralMetricTraditionalBindingRef: null,
      neutralMetricAllowsPhysiologicalApertureInterpretation: false,
      neutralMetricAllowsEyeHeightSemanticInterpretation: false,
      sourceExplicitlyDefinesCandidateFormula: false,
      sourceExplicitlyDefinesCandidateDenominator: false,
      sourceExplicitlyDefinesCandidateAggregation: false,
      sourceAuthorizedMetricRelationFound: false,
      mappingGaps: FR184_MAPPING_GAPS.xi,
      mappingDecision: 'not_admitted',
    });
    expect(FR184_XI_METRIC_REF).toBe('neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0');
  });

  it('does not convert traditional Chang/Cun wording into the normalized X-span candidate metric', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();

    expect(result.changMappingReview).toEqual({
      traditionalConcept: '長',
      sourceClauses: ['細而長', '目長一寸', '或細長極寸'],
      candidateMetricRef: FR184_CHANG_METRIC_REF,
      neutralMetricAvailable: true,
      candidateGeometricRelevanceForFutureReview: true,
      sourceExplicitlyDefinesFullMeshNormalizedRatio: false,
      sourceExplicitlyDefinesCandidateAggregation: false,
      traditionalCunAppearsInDirectSource: true,
      governedCunToNormalizedRatioConversionExists: false,
      normalizedRatioMeansTraditionalAbsoluteLength: false,
      sourceAuthorizedMetricRelationFound: false,
      mappingGaps: FR184_MAPPING_GAPS.chang,
      mappingDecision: 'not_admitted',
    });
    expect(FR184_CHANG_METRIC_REF).toBe('neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0');
  });

  it('preserves all thirteen FR183 blockers because feasibility review alone resolves none', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();

    expect(result.resolvedByFR184).toEqual([]);
    expect(result.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.remainingBlockers).toHaveLength(13);
    expect(result.remainingBlockers[0]).toBe('xi_metric_to_source_concept_mapping_not_authorized');
    expect(result.remainingBlockers[6]).toBe('chang_metric_to_source_concept_mapping_not_authorized');
    expect(result.remainingBlockers[12]).toBe('compound_xi_er_chang_composition_rule_not_authorized');
  });

  it('keeps compound 細而長 composition closed while both component mappings are unadmitted', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();

    expect(result.compoundReview).toEqual({
      sourceClause: '細而長',
      xiMappingAdmitted: false,
      changMappingAdmitted: false,
      sourceAuthorizedCompositionRuleIssued: false,
      simpleBooleanAndAuthorized: false,
      compoundDecision: 'not_admitted',
    });
  });

  it('rejects mapping, directionality, calibration, decision, and Production widening', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();
    expect(() => assertFR184AuthorityBoundary(result.authorityBoundary)).not.toThrow();

    const forbiddenWidenings = [
      { ...result.authorityBoundary, xiMetricBindingAuthorized: true },
      { ...result.authorityBoundary, changMetricBindingAuthorized: true },
      { ...result.authorityBoundary, candidateMetricRelevanceMeansBindingAuthority: true },
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
      { ...result.authorityBoundary, productionRuleAuthorized: true },
      { ...result.authorityBoundary, traditionalSemanticAuthorityPromoted: true },
    ] as unknown as FR184AuthorityBoundaryV1[];

    for (const boundary of forbiddenWidenings) {
      expect(() => assertFR184AuthorityBoundary(boundary)).toThrow(/authority widening/u);
    }
  });

  it('issues a fail-closed feasibility verdict and advances only to mapping evidence requirements', () => {
    const result = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();

    expect(result.verdict).toBe(FR184_VERDICT);
    expect(FR184_VERDICT).toBe(
      'SOURCE_AUTHORIZED_XI_CHANG_METRIC_TO_CONCEPT_MAPPING_NOT_FOUND_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED',
    );
    expect(result.researchNoteRef).toBe(FR184_RESEARCH_NOTE_REF);
    expect(result.nextFrontier).toBe(FR184_NEXT_FRONTIER);
    expect(FR184_NEXT_FRONTIER).toBe(
      'define_source_authorized_xi_chang_metric_to_concept_mapping_evidence_requirements_before_directionality_or_calibration',
    );
    expect(result.authorityBoundary.productionRuleAuthorized).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthorityPromoted).toBe(false);
    expect(result.privacyBoundary.biometricIdentityMatchingPerformed).toBe(false);
    expect(() => assertIssuedEyePairXiChangMetricToConceptMappingFeasibilityFR184(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangMetricToConceptMappingFeasibilityFR184(forgedFR184())).toThrow(/not issued/u);
  });
});
