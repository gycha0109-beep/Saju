import { describe, expect, it } from 'vitest';
import {
  assertFR185AuthorityBoundary,
  assertFR185EvidenceRequirementSet,
  assertFR185MappingCandidateBoundary,
  assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
  FR185_MAPPING_EVIDENCE_REQUIREMENTS,
  FR185_NEXT_FRONTIER,
  FR185_REQUIRED_MAPPING_EVIDENCE_KEYS,
  FR185_RESEARCH_NOTE_REF,
  FR185_VERDICT,
  issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
  type EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1,
  type FR185AuthorityBoundaryV1,
  type FR185MappingCandidateBoundaryV1,
  type FR185MappingEvidenceRequirementV1,
} from './eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-fr185.js';
import { FR176_DIRECT_SELECTED_WITNESS_CLAUSES } from './daruma-eye-morphology-source-review-fr176.js';
import { FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES } from './eye-pair-xi-chang-operationalization-requirements-fr180.js';
import {
  FR182_FROZEN_EVIDENCE_MANIFEST,
  FR182_PAGE_146_IMAGE_SHA256,
  FR182_PAGE_146_REF,
} from './eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.js';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  FR184_CHANG_METRIC_REF,
  FR184_NEXT_FRONTIER,
  FR184_XI_METRIC_REF,
} from './eye-pair-xi-chang-metric-to-concept-mapping-feasibility-fr184.js';

function forgedFR185(): EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1 {
  return Object.freeze({}) as unknown as EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1;
}

describe('FR185 Xi/Chang metric-to-concept mapping evidence requirements', () => {
  it('preserves FR176 and FR182 direct-source provenance including exact page 146', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(FR176_DIRECT_SELECTED_WITNESS_CLAUSES).toEqual([
      '秀而正',
      '細而長',
      '目大而光',
      '目有三角',
      '目長一寸',
      '目尾相垂',
    ]);
    expect(FR182_FROZEN_EVIDENCE_MANIFEST).toMatchObject({
      workRef: 'work.shenxiang_quanbian',
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      sourcePdfSha256: 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af',
      sourcePdfPageCount: 576,
      section: '卷三 / 達摩相眼',
      reviewedPageWindow: [145, 147],
      exactScanPage: 146,
      immutablePageImageRef: FR182_PAGE_146_REF,
      immutablePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
      visibleHeading: '達摩相眼',
      visuallyMatchedClauses: FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
      visualPassageMatchConfirmed: true,
    });
    expect(result.upstreamAuthority.exactFR176DarumaEyeScanPage).toBe(146);
    expect(result.upstreamAuthority.exactFR176DarumaEyePageImageRef).toBe(FR182_PAGE_146_REF);
    expect(result.upstreamAuthority.exactFR176DarumaEyePageImageSha256).toBe(FR182_PAGE_146_IMAGE_SHA256);
  });

  it('preserves FR180 calibration evidence-class authority without turning threshold selection into mapping authority', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES).toEqual([
      'repeat_capture_stability',
      'blinded_expert_operationalization',
      'threshold_selection_result',
    ]);
    expect(result.evidenceClassSeparation).toEqual({
      existingCalibrationEvidenceClasses: FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
      repeatCaptureStabilityRequiredBeforeMappingAdmission: true,
      blindedExpertOperationalizationRequiredBeforeMappingAdmission: true,
      thresholdSelectionResultIsLaterCalibrationEvidence: true,
      thresholdSelectionResultRequiredToDefineMappingRequirements: false,
      thresholdSelectionResultIssuedByFR185: false,
      metricDirectionalityMayBeInferredFromMappingEvidence: false,
      calibrationMayBeginFromRequirementsDefinitionAlone: false,
    });
  });

  it('pins the FR183/FR184 predecessor chain and preserves all thirteen blockers', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(result.upstreamAuthority.fr184NextFrontier).toBe(FR184_NEXT_FRONTIER);
    expect(FR184_NEXT_FRONTIER).toBe(
      'define_source_authorized_xi_chang_metric_to_concept_mapping_evidence_requirements_before_directionality_or_calibration',
    );
    expect(result.blockerAccounting.resolvedExistingFR184Blockers).toEqual([]);
    expect(result.blockerAccounting.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.blockerAccounting.remainingBlockers).toHaveLength(13);
    expect(result.blockerAccounting.remainingBlockers).toEqual([
      'xi_metric_to_source_concept_mapping_not_authorized',
      'xi_metric_directionality_not_governed',
      'xi_stable_criterion_identity_not_issued',
      'xi_criterion_specific_calibration_evidence_absent',
      'xi_criterion_specific_calibration_protocol_absent',
      'xi_calibrated_decision_rule_absent',
      'chang_metric_to_source_concept_mapping_not_authorized',
      'chang_metric_directionality_not_governed',
      'chang_stable_criterion_identity_not_issued',
      'chang_criterion_specific_calibration_evidence_absent',
      'chang_criterion_specific_calibration_protocol_absent',
      'chang_calibrated_decision_rule_absent',
      'compound_xi_er_chang_composition_rule_not_authorized',
    ]);
  });

  it('defines the exact canonical ten-part mapping evidence contract', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(FR185_REQUIRED_MAPPING_EVIDENCE_KEYS).toEqual([
      'source_concept_identity_and_pinned_provenance',
      'candidate_neutral_metric_identity_and_versioned_definition',
      'explicit_mapping_hypothesis_provenance',
      'independent_blinded_expert_operationalization',
      'repeat_capture_stability',
      'source_grounded_construct_correspondence',
      'alternative_metric_and_confound_rejection',
      'end_to_end_evidence_traceability',
      'explicit_mapping_acceptance_or_rejection_decision',
      'fail_closed_completeness',
    ]);
    expect(result.evidenceRequirements).toBe(FR185_MAPPING_EVIDENCE_REQUIREMENTS);
    expect(result.evidenceRequirements.map((item) => item.key)).toEqual(FR185_REQUIRED_MAPPING_EVIDENCE_KEYS);
    expect(result.evidenceRequirements.filter((item) => item.state === 'satisfied_upstream').map((item) => item.key)).toEqual([
      'source_concept_identity_and_pinned_provenance',
      'candidate_neutral_metric_identity_and_versioned_definition',
    ]);
    expect(() => assertFR185EvidenceRequirementSet(result.evidenceRequirements)).not.toThrow();

    const injected = result.evidenceRequirements.map((item) => ({ ...item }));
    injected[2] = {
      ...injected[2]!,
      requirement: '細 means low Y:X ratio.',
    };
    expect(() => assertFR185EvidenceRequirementSet(injected as FR185MappingEvidenceRequirementV1[])).toThrow(/content drift/u);
  });

  it('keeps Xi and Chang candidate metrics neutral and rejects an actual mapping injection', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(result.mappingCandidates).toEqual([
      {
        traditionalConcept: '細',
        candidateMetricRef: FR184_XI_METRIC_REF,
        candidateOnly: true,
        mappingRelationRef: null,
        traditionalBindingRef: null,
        directionality: null,
        stableCriterionId: null,
        thresholdRef: null,
        calibrationRef: null,
        classifierRef: null,
        mappingAuthorized: false,
      },
      {
        traditionalConcept: '長',
        candidateMetricRef: FR184_CHANG_METRIC_REF,
        candidateOnly: true,
        mappingRelationRef: null,
        traditionalBindingRef: null,
        directionality: null,
        stableCriterionId: null,
        thresholdRef: null,
        calibrationRef: null,
        classifierRef: null,
        mappingAuthorized: false,
      },
    ]);
    for (const candidate of result.mappingCandidates) {
      expect(() => assertFR185MappingCandidateBoundary(candidate)).not.toThrow();
    }

    const forgedBinding = {
      ...result.mappingCandidates[0],
      mappingRelationRef: 'forged.mapping.xi_to_yx@1',
      traditionalBindingRef: 'forged.binding.xi@1',
      mappingAuthorized: true,
    } as unknown as FR185MappingCandidateBoundaryV1;
    expect(() => assertFR185MappingCandidateBoundary(forgedBinding)).toThrow(/mapping injection/u);
  });

  it('requires traceability and explicit reviewed decision authority while failing closed on absence', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(result.traceabilityRequirements).toEqual({
      exactTraditionalSourceRefsRequired: true,
      exactMethodologyOrHypothesisRefRequired: true,
      exactNeutralMetricRefRequired: true,
      protocolRefsRequiredForHumanDerivedEvidence: true,
      datasetVersionRequiredForHumanDerivedEvidence: true,
      provenanceRefsRequired: true,
      reviewedEvidenceRefsRequiredForDecision: true,
      translationMaySubstituteForDirectSource: false,
      secondarySourceMaySubstituteForDirectSource: false,
    });
    expect(result.evidenceRequirements.find((item) => item.key === 'explicit_mapping_acceptance_or_rejection_decision')?.state)
      .toBe('required_not_satisfied');
    expect(result.evidenceRequirements.find((item) => item.key === 'fail_closed_completeness')?.state)
      .toBe('required_not_satisfied');
  });

  it('rejects directionality, threshold/calibration, classifier/score/rank, composition, semantic output, and Production widening', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();
    expect(() => assertFR185AuthorityBoundary(result.authorityBoundary)).not.toThrow();

    const forbiddenWidenings = [
      { ...result.authorityBoundary, requirementsDefinitionAloneAuthorizesMappingReviewOutcome: true },
      { ...result.authorityBoundary, xiMetricBindingAuthorized: true },
      { ...result.authorityBoundary, changMetricBindingAuthorized: true },
      { ...result.authorityBoundary, metricDirectionalityAuthorized: true },
      { ...result.authorityBoundary, stableCriterionIdentityIssued: true },
      { ...result.authorityBoundary, thresholdIssued: true },
      { ...result.authorityBoundary, percentileIssued: true },
      { ...result.authorityBoundary, referencePopulationIssued: true },
      { ...result.authorityBoundary, calibrationEvidenceIssued: true },
      { ...result.authorityBoundary, calibrationProtocolIssued: true },
      { ...result.authorityBoundary, thresholdSelectionResultIssued: true },
      { ...result.authorityBoundary, calibratedDecisionRuleIssued: true },
      { ...result.authorityBoundary, classifierIssued: true },
      { ...result.authorityBoundary, scoreIssued: true },
      { ...result.authorityBoundary, rankIssued: true },
      { ...result.authorityBoundary, traditionalJiOperationalizationAuthorized: true },
      { ...result.authorityBoundary, traditionalCunMappingAuthorized: true },
      { ...result.authorityBoundary, compoundXiErChangRuleAuthorized: true },
      { ...result.authorityBoundary, morphologyProduced: true },
      { ...result.authorityBoundary, criterionStatesIssued: 1 },
      { ...result.authorityBoundary, structuredClaimsIssued: 1 },
      { ...result.authorityBoundary, boundedNarrativesIssued: 1 },
      { ...result.authorityBoundary, productionRuleAuthorized: true },
      { ...result.authorityBoundary, traditionalSemanticAuthorityPromoted: true },
    ] as unknown as FR185AuthorityBoundaryV1[];

    for (const boundary of forbiddenWidenings) {
      expect(() => assertFR185AuthorityBoundary(boundary)).toThrow(/authority widening/u);
    }
  });

  it('issues only requirements authority and advances to mapping-hypothesis provenance', () => {
    const result = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();

    expect(result.verdict).toBe(FR185_VERDICT);
    expect(FR185_VERDICT).toBe(
      'METRIC_TO_CONCEPT_MAPPING_EVIDENCE_REQUIREMENTS_DEFINED_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED',
    );
    expect(result.researchNoteRef).toBe(FR185_RESEARCH_NOTE_REF);
    expect(result.nextFrontier).toBe(FR185_NEXT_FRONTIER);
    expect(FR185_NEXT_FRONTIER).toBe(
      'establish_governed_xi_chang_mapping_hypothesis_provenance_before_blinded_operationalization_directionality_or_calibration',
    );
    expect(result.authorityBoundary.productionRuleAuthorized).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthorityPromoted).toBe(false);
    expect(Object.values(result.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(() => assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185(forgedFR185())).toThrow(/not issued/u);
  });
});
