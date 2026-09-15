import { describe, expect, it } from 'vitest';
import {
  assertFR183AuthorityBoundary,
  assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183,
  FR183_NEXT_FRONTIER,
  FR183_PAGE_88_IMAGE_SHA256,
  FR183_PAGE_88_REF,
  FR183_REMAINING_BLOCKERS,
  FR183_RESEARCH_NOTE_REF,
  FR183_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsRereviewFR183,
  type EyePairXiChangOperationalizationRequirementsRereviewFR183V1,
  type FR183AuthorityBoundaryV1,
} from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  FR182_PAGE_146_IMAGE_SHA256,
  FR182_PAGE_146_REF,
} from './eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.js';

function forgedFR183(): EyePairXiChangOperationalizationRequirementsRereviewFR183V1 {
  return Object.freeze({}) as unknown as EyePairXiChangOperationalizationRequirementsRereviewFR183V1;
}

describe('FR183 Xi/Chang operationalization requirements re-review', () => {
  it('consumes both exact source-page locator closures without mutating historical FR180', () => {
    const result = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();

    expect(result.upstreamAuthority).toEqual({
      fr180Verdict: 'OPERATIONALIZATION_REQUIREMENTS_DEFINED_TRADITIONAL_BINDING_NOT_ADMITTED',
      fr180NextFrontier: 'acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration',
      fr181Verdict: 'FR175_EYE_PASSAGE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY',
      fr182Verdict: 'FR176_DARUMA_EYE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY',
      fr182NextFrontier: 'review_fr180_xi_chang_operationalization_requirements_with_both_exact_source_pages_pinned_while_traditional_binding_remains_not_admitted',
    });

    expect(result.sourcePrerequisiteReview).toEqual({
      fixedWitnessIdentityConsistent: true,
      exactFR175EyePassageScanPageRequired: true,
      exactFR175EyePassageScanPageNowPinned: true,
      exactFR175EyePassageScanPage: 88,
      fr175ImmutablePageImageRef: FR183_PAGE_88_REF,
      fr175ImmutablePageImageSha256: FR183_PAGE_88_IMAGE_SHA256,
      exactFR176DarumaEyeScanPageRequired: true,
      exactFR176DarumaEyeScanPageNowPinned: true,
      exactFR176DarumaEyeScanPage: 146,
      fr176ImmutablePageImageRef: FR182_PAGE_146_REF,
      fr176ImmutablePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
      locatorPrerequisitesSatisfied: true,
      scanCheckedPromotionAuthorized: false,
      doubleCheckedSourceAuthorized: false,
      provenanceSatisfactionDoesNotAuthorizeTraditionalBinding: true,
    });
  });

  it('resolves exactly the two historical locator blockers and preserves all thirteen FR182 blockers', () => {
    const result = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();

    expect(result.resolvedSinceFR180).toEqual([
      'fr175_exact_eye_passage_scan_page_not_pinned',
      'fr176_exact_daruma_eye_scan_page_not_pinned',
    ]);
    expect(result.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.remainingBlockers).toHaveLength(13);
    expect(result.remainingBlockers).toEqual([
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

  it('re-audits the active calibration registries and still finds zero Eye-Pair coverage', () => {
    const result = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();

    expect(result.calibrationReaudit).toEqual({
      requiredEvidenceClasses: [
        'repeat_capture_stability',
        'blinded_expert_operationalization',
        'threshold_selection_result',
      ],
      eyePairCoveredEvidenceCount: 0,
      eyePairCaptureProtocolCount: 0,
      eyePairLabelingProtocolCount: 0,
      eyePairStudyCount: 0,
      anyCriterionSpecificCalibrationAuthorityFound: false,
      reviewerBlindingStillRequired: true,
      participantLevelDatasetSplitStillRequired: true,
      thresholdSelectionMayReadHoldout: false,
    });
  });

  it('keeps Xi, Chang, and compound semantic bindings fail-closed after provenance closure', () => {
    const result = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();

    expect(result.xiReview).toEqual({
      traditionalConcept: '細',
      candidateMetricRef: 'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
      neutralMetricAvailable: true,
      sourceAuthorizedMetricRelationCurrentlyIssued: false,
      metricDirectionalityCurrentlyIssued: false,
      stableCriterionIdentityCurrentlyIssued: false,
      criterionSpecificCalibrationEvidencePresent: false,
      criterionSpecificCalibrationProtocolPresent: false,
      calibratedDecisionRulePresent: false,
      traditionalBindingDecision: 'not_admitted',
    });
    expect(result.changReview).toEqual({
      traditionalConcept: '長',
      candidateMetricRef: 'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      neutralMetricAvailable: true,
      sourceAuthorizedMetricRelationCurrentlyIssued: false,
      metricDirectionalityCurrentlyIssued: false,
      stableCriterionIdentityCurrentlyIssued: false,
      criterionSpecificCalibrationEvidencePresent: false,
      criterionSpecificCalibrationProtocolPresent: false,
      calibratedDecisionRulePresent: false,
      normalizedRatioMeansTraditionalAbsoluteLength: false,
      traditionalBindingDecision: 'not_admitted',
    });
    expect(result.compoundReview).toEqual({
      sourceClause: '細而長',
      xiBindingCurrentlyAdmitted: false,
      changBindingCurrentlyAdmitted: false,
      sourceAuthorizedCompositionRuleCurrentlyIssued: false,
      simpleBooleanAndAuthorized: false,
      compoundBindingDecision: 'not_admitted',
    });
  });

  it('rejects authority widening caused by treating pinned pages as semantic or calibration authority', () => {
    const result = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();
    expect(() => assertFR183AuthorityBoundary(result.authorityBoundary)).not.toThrow();

    const forbiddenWidenings = [
      { ...result.authorityBoundary, provenanceSatisfactionMeansMetricBinding: true },
      { ...result.authorityBoundary, xiMetricBindingAuthorized: true },
      { ...result.authorityBoundary, changMetricBindingAuthorized: true },
      { ...result.authorityBoundary, metricDirectionalityAuthorized: true },
      { ...result.authorityBoundary, stableCriterionIdentityIssued: true },
      { ...result.authorityBoundary, thresholdIssued: true },
      { ...result.authorityBoundary, percentileIssued: true },
      { ...result.authorityBoundary, calibrationEvidenceIssued: true },
      { ...result.authorityBoundary, calibrationProtocolIssued: true },
      { ...result.authorityBoundary, calibratedDecisionRuleIssued: true },
      { ...result.authorityBoundary, traditionalJiOperationalizationAuthorized: true },
      { ...result.authorityBoundary, traditionalCunMappingAuthorized: true },
      { ...result.authorityBoundary, compoundXiErChangRuleAuthorized: true },
      { ...result.authorityBoundary, scanCheckedRegistryPromotionAuthorized: true },
      { ...result.authorityBoundary, doubleCheckedSourceAuthorized: true },
      { ...result.authorityBoundary, productionRuleAuthorized: true },
      { ...result.authorityBoundary, traditionalSemanticAuthorityPromoted: true },
    ] as unknown as FR183AuthorityBoundaryV1[];

    for (const boundary of forbiddenWidenings) {
      expect(() => assertFR183AuthorityBoundary(boundary)).toThrow(/authority widening/u);
    }
  });

  it('issues only the re-review verdict and advances to metric-to-concept mapping feasibility', () => {
    const result = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();

    expect(result.verdict).toBe(FR183_VERDICT);
    expect(FR183_VERDICT).toBe(
      'SOURCE_PAGE_PREREQUISITES_SATISFIED_OPERATIONALIZATION_REQUIREMENTS_REVIEWED_TRADITIONAL_BINDING_NOT_ADMITTED',
    );
    expect(result.researchNoteRef).toBe(FR183_RESEARCH_NOTE_REF);
    expect(result.nextFrontier).toBe(FR183_NEXT_FRONTIER);
    expect(FR183_NEXT_FRONTIER).toBe(
      'review_source_authorized_xi_chang_metric_to_concept_mapping_feasibility_before_directionality_or_calibration',
    );
    expect(result.authorityBoundary.productionRuleAuthorized).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthorityPromoted).toBe(false);
    expect(result.privacyBoundary.biometricIdentityMatchingPerformed).toBe(false);
    expect(() => assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183(forgedFR183())).toThrow(/not issued/u);
  });
});
