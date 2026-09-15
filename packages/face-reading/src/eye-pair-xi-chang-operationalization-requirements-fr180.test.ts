import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180,
  FR180_NEXT_FRONTIER,
  FR180_PROHIBITED_SHORTCUTS,
  FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
  FR180_RESEARCH_NOTE_REF,
  FR180_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsFR180,
  type EyePairXiChangOperationalizationRequirementsFR180V1,
} from './eye-pair-xi-chang-operationalization-requirements-fr180.js';

function forgedFR180(): EyePairXiChangOperationalizationRequirementsFR180V1 {
  return Object.freeze({}) as unknown as EyePairXiChangOperationalizationRequirementsFR180V1;
}

describe('FR180 Eye-Pair Xi/Chang source-authorized operationalization requirements', () => {
  it('pins the exact FR179 predecessor and unresolved scan-page provenance', () => {
    const review = issueEyePairXiChangOperationalizationRequirementsFR180();

    expect(review.upstreamAuthority).toEqual({
      fr179Verdict: 'NEUTRAL_GEOMETRY_REPRESENTABILITY_EXPANDED_TRADITIONAL_BINDING_NOT_ADMITTED',
      fr179NextFrontier: 'review_source_authorized_operationalization_requirements_for_eye_pair_xi_chang_without_inventing_thresholds_or_cun_mapping',
      fr175DirectPassageReviewed: true,
      fr175ExactEyePassageScanPagePinned: false,
      fr175ScanCheckedPromotionAuthorized: false,
      fr176SelectedClausesReviewed: true,
      fr176ExactDarumaEyeScanPagePinned: false,
      fr176ScanCheckedPromotionAuthorized: false,
    });
    expect(review.sourcePromotionRequirements).toMatchObject({
      sourceIdentityResolved: true,
      exactFR175EyePassageScanPageRequired: true,
      exactFR175EyePassageScanPageCurrentlyPinned: false,
      exactFR176DarumaEyeScanPageRequired: true,
      exactFR176DarumaEyeScanPageCurrentlyPinned: false,
      scanCheckedSourceRequiredBeforeProductionCalibration: true,
      translationMaySubstituteForDirectSource: false,
      secondarySourceMaySubstituteForDirectSource: false,
    });
  });

  it('treats neutral Y:X and relative X-span as candidates only, not traditional Xi/Chang', () => {
    const review = issueEyePairXiChangOperationalizationRequirementsFR180();

    expect(review.currentNeutralObservationSurface).toEqual({
      xiCandidateMetricRef: 'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
      changCandidateMetricRef: 'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      roleInvariantOverTwoEyeCycles: true,
      individualEyeValuesExposed: false,
      physiologicalApertureInterpretationAllowed: false,
      physicalAnthropometricInterpretationAllowed: false,
    });
    expect(review.xiRequirements).toMatchObject({
      traditionalConcept: '細',
      neutralMetricAvailable: true,
      sourceAuthorizedMetricRelationRequired: true,
      sourceAuthorizedMetricRelationCurrentlyIssued: false,
      metricDirectionalityMustBeGoverned: true,
      metricDirectionalityCurrentlyIssued: false,
      stableCriterionIdentityRequired: true,
      stableCriterionIdentityCurrentlyIssued: false,
      traditionalBindingDecision: 'not_admitted',
    });
    expect(review.changRequirements).toMatchObject({
      traditionalConcept: '長',
      neutralMetricAvailable: true,
      sourceAuthorizedMetricRelationCurrentlyIssued: false,
      metricDirectionalityCurrentlyIssued: false,
      stableCriterionIdentityCurrentlyIssued: false,
      normalizedRatioMeansTraditionalAbsoluteLength: false,
      traditionalBindingDecision: 'not_admitted',
    });
  });

  it('requires the repository calibration evidence classes without inventing a percentile or threshold', () => {
    const review = issueEyePairXiChangOperationalizationRequirementsFR180();

    expect(review.calibrationFramework.requiredEvidenceClasses).toBe(FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES);
    expect(FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES).toEqual([
      'repeat_capture_stability',
      'blinded_expert_operationalization',
      'threshold_selection_result',
    ]);
    expect(review.calibrationFramework).toMatchObject({
      evidenceRegistryId: 'calibration-evidence.face.research_v0',
      eyePairCoveredEvidenceCount: 0,
      eyePairCoveredEvidenceRefs: [],
      protocolRegistryId: 'calibration-protocol.face.nose_bridge.research_v0',
      eyePairCaptureProtocolCount: 0,
      eyePairLabelingProtocolCount: 0,
      eyePairStudyCount: 0,
      participantSpecificIdentityMatchingRequired: false,
      reviewerBlindingRequiredForFutureOperationalization: true,
      participantLevelDatasetSplitRequired: true,
      thresholdSelectionMayReadHoldout: false,
    });
    expect(review.decisionBoundary.thresholdIssued).toBe(false);
    expect(review.decisionBoundary.calibrationEvidenceIssuedByThisPhase).toBe(false);
    expect(review.decisionBoundary.calibrationProtocolIssuedByThisPhase).toBe(false);
  });

  it('does not manufacture the compound Xi-er-Chang rule from two future individual thresholds', () => {
    const review = issueEyePairXiChangOperationalizationRequirementsFR180();

    expect(review.compoundRequirements).toEqual({
      sourceClause: '細而長',
      xiBindingMustBeAdmittedFirst: true,
      changBindingMustBeAdmittedFirst: true,
      sourceAuthorizedCompositionRuleRequired: true,
      xiBindingCurrentlyAdmitted: false,
      changBindingCurrentlyAdmitted: false,
      sourceAuthorizedCompositionRuleCurrentlyIssued: false,
      simpleBooleanAndOfFutureThresholdsAuthorized: false,
      selectiveSemanticDecompositionAuthorized: false,
      compoundBindingDecision: 'not_admitted',
    });
  });

  it('keeps Ji, Cun, semantic authority, outputs, and Production closed', () => {
    const review = issueEyePairXiChangOperationalizationRequirementsFR180();

    expect(review.verdict).toBe(FR180_VERDICT);
    expect(review.verdict).toBe('OPERATIONALIZATION_REQUIREMENTS_DEFINED_TRADITIONAL_BINDING_NOT_ADMITTED');
    expect(review.prohibitedShortcuts).toBe(FR180_PROHIBITED_SHORTCUTS);
    expect(review.decisionBoundary).toEqual({
      requirementsReviewCompleted: true,
      traditionalXiOperationalized: false,
      traditionalChangOperationalized: false,
      compoundXiErChangOperationalized: false,
      traditionalJiOperationalized: false,
      traditionalCunMappingIssued: false,
      metricDirectionalityIssued: false,
      criterionIdentityIssued: false,
      calibrationEvidenceIssuedByThisPhase: false,
      calibrationProtocolIssuedByThisPhase: false,
      thresholdIssued: false,
      classifierIssued: false,
      scoreIssued: false,
      rankIssued: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      structuredClaimsIssued: 0,
      boundedNarrativesIssued: 0,
      productionRuleAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
    expect(Object.values(review.privacyBoundary).every((value) => value === false)).toBe(true);
  });

  it('records every unresolved authority prerequisite and advances only to exact FR175 scan-page acquisition', () => {
    const review = issueEyePairXiChangOperationalizationRequirementsFR180();

    expect(review.unresolvedAuthorityRequirements).toContain('xi_metric_to_source_concept_mapping_not_authorized');
    expect(review.unresolvedAuthorityRequirements).toContain('xi_calibrated_decision_rule_absent');
    expect(review.unresolvedAuthorityRequirements).toContain('chang_metric_to_source_concept_mapping_not_authorized');
    expect(review.unresolvedAuthorityRequirements).toContain('chang_calibrated_decision_rule_absent');
    expect(review.unresolvedAuthorityRequirements).toContain('compound_xi_er_chang_composition_rule_not_authorized');
    expect(review.unresolvedAuthorityRequirements).toContain('fr175_exact_eye_passage_scan_page_not_pinned');
    expect(review.unresolvedAuthorityRequirements).toContain('fr176_exact_daruma_eye_scan_page_not_pinned');

    expect(() => assertIssuedEyePairXiChangOperationalizationRequirementsFR180(review)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangOperationalizationRequirementsFR180(forgedFR180())).toThrow(/not issued/u);
    expect(FR180_RESEARCH_NOTE_REF).toBe(
      'repo:research/face-reading/fr180-eye-pair-xi-chang-operationalization-requirements.md',
    );
    expect(FR180_NEXT_FRONTIER).toBe(
      'acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration',
    );
  });
});
