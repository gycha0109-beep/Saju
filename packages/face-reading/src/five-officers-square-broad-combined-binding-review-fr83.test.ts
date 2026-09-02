import { describe, expect, it } from 'vitest';
import {
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83,
  reviewFiveOfficerSquareBroadCombinedMetricBindingFR83,
  type FiveOfficerSquareBroadCombinedBindingReviewFR83V1,
} from './five-officers-square-broad-combined-binding-review-fr83.js';

describe('FR83 Five Officers square-broad combined binding review', () => {
  it('reviews FR80 shape and FR82 relative-size metrics together without admitting 方大 semantics or binding', () => {
    const review = reviewFiveOfficerSquareBroadCombinedMetricBindingFR83();
    assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83(review);

    expect(review.schemaVersion).toBe('fr83-five-officers-square-broad-combined-binding-review-v1');
    expect(review.authorityState).toBe('combined_neutral_metric_binding_review_completed_no_traditional_binding_admitted');
    expect(review.traditionalTarget).toMatchObject({
      criterionId: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      traditionalOfficerName: '出納官',
      anatomicalTarget: 'mouth',
      modality: 'static_geometry',
      staticV1Eligible: true,
      sourceVerificationStatus: 'unverified_ocr',
      methodologyReviewStatus: 'research',
    });
    expect(review.candidateNeutralMetrics).toEqual([
      {
        metricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
        neutralObservationRole: 'unordered_contour_set_shape_ratio',
        sourceConceptRelation: 'candidate_shape_observation_not_traditional_fang_semantics',
        unit: 'ratio',
        traditionalCriterionBindingRef: null,
        calibrationRef: null,
      },
      {
        metricRef: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
        neutralObservationRole: 'mouth_span_relative_to_full_468_mesh_span',
        sourceConceptRelation: 'candidate_relative_size_observation_not_traditional_da_semantics',
        unit: 'ratio',
        denominatorAnatomicalRole: null,
        traditionalCriterionBindingRef: null,
        calibrationRef: null,
      },
    ]);
  });

  it('marks the combined binding review complete while keeping operationalization, calibration, thresholds and states closed', () => {
    const review = reviewFiveOfficerSquareBroadCombinedMetricBindingFR83();
    expect(review.combinedReview).toEqual({
      combinedMetricBindingReviewCompleted: true,
      candidateNeutralMetricCount: 2,
      shapeObservationAvailable: true,
      relativeSizeObservationAvailable: true,
      traditionalFangSemanticsOperationalized: false,
      traditionalDaSemanticsOperationalized: false,
      compoundFangDaOperationalized: false,
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      automaticCriterionStateAuthorized: false,
      bindingDecision: 'not_admitted',
    });
    expect(review.resolvedBlockers).toEqual(['square_broad_combined_metric_binding_not_reviewed']);
    expect(review.remainingBlockers).not.toContain('square_broad_combined_metric_binding_not_reviewed');
    expect(review.remainingBlockers).toContain('square_broad_metric_to_source_concept_mapping_not_authorized');
    expect(review.remainingBlockers).toContain('five_officers_source_not_scan_checked');
    expect(review.remainingBlockers).toContain('square_broad_calibration_evidence_absent');
    expect(review.remainingBlockers).toContain('square_broad_threshold_not_calibrated');
  });

  it('preserves every anti-shortcut and emits no morphology, criterion state, claim, formation, or traditional semantics', () => {
    const review = reviewFiveOfficerSquareBroadCombinedMetricBindingFR83();
    expect(review.authorityBoundary).toEqual({
      twoNeutralMetricsMeanTraditionalBinding: false,
      aspectRatioMeansTraditionalFang: false,
      relativeMeshSpanMeansTraditionalDa: false,
      fullMeshSpanMeansAnatomicalFaceWidth: false,
      neutralMetricsMeanCompoundFangDa: false,
      reviewCompletionMeansOperationalization: false,
      researchSourceMeansProductionAuthority: false,
      unverifiedOcrMeansScanCheckedSource: false,
      candidateMetricPairMeansCalibrationEvidence: false,
      metricValueMeansCriterionState: false,
    });
    expect(review.prohibitedShortcuts).toContain('fr80_plus_fr82_to_square_broad_binding');
    expect(review.prohibitedShortcuts).toContain('fr80_plus_fr82_values_to_square_broad_state');
    expect(review.prohibitedShortcuts).toContain('uncalibrated_metric_pair_to_threshold');
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalFormationAuthorized).toBe(false);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects structurally plausible but unissued FR83 reviews', () => {
    const forged = {
      schemaVersion: 'fr83-five-officers-square-broad-combined-binding-review-v1',
      authorityState: 'combined_neutral_metric_binding_review_completed_no_traditional_binding_admitted',
    } as unknown as FiveOfficerSquareBroadCombinedBindingReviewFR83V1;
    expect(() => assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83(forged))
      .toThrow(/not issued by the active FR-83 boundary/u);
  });
});