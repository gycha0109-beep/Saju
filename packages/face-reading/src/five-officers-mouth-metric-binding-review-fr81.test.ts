import { describe, expect, it } from 'vitest';
import {
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81,
  reviewFiveOfficerMouthMetricBindingsFR81,
  type FiveOfficerMouthMetricBindingReviewFR81V1,
} from './five-officers-mouth-metric-binding-review-fr81.js';

describe('FR81 Five Officers mouth metric binding review', () => {
  it('reviews the FR80 aspect ratio as partial 方大 shape evidence without admitting a traditional binding', () => {
    const review = reviewFiveOfficerMouthMetricBindingsFR81();
    assertIssuedFiveOfficerMouthMetricBindingReviewFR81(review);

    expect(review.schemaVersion).toBe('fr81-five-officers-mouth-metric-binding-review-v1');
    expect(review.authorityState).toBe('traditional_metric_binding_review_completed_no_binding_admitted');
    expect(review.neutralMetricDefinition).toMatchObject({
      metricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
      coordinateFrame: 'pose_normalized_face_2d',
      unit: 'ratio',
      outerInnerAnatomicalRoleRequired: false,
      absoluteWidthHeightIssued: false,
      physicalAnthropometricInterpretationAllowed: false,
      traditionalCriterionBindingRef: null,
      calibrationRef: null,
    });

    const squareBroad = review.criterionReviews[0];
    expect(squareBroad).toEqual({
      criterionId: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      modality: 'static_geometry',
      staticV1Eligible: true,
      candidateNeutralMetricRefs: ['neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0'],
      candidateRelation: 'partial_shape_observation_only',
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      automaticCriterionStateAuthorized: false,
      bindingDecision: 'not_admitted',
      missingAuthority: [
        'relative_mouth_size_metric_definition',
        'scan_checked_traditional_source',
        'criterion_specific_calibration_evidence',
        'criterion_specific_calibration_protocol',
        'calibrated_decision_threshold',
      ],
    });
  });

  it('keeps 端厚 and capture/dynamic intake criteria unbound', () => {
    const review = reviewFiveOfficerMouthMetricBindingsFR81();
    const lipsSubstantial = review.criterionReviews[1];
    expect(lipsSubstantial).toMatchObject({
      criterionId: 'criterion.intake.lips_substantial',
      sourceConcept: '端厚',
      candidateNeutralMetricRefs: [],
      candidateRelation: 'no_applicable_neutral_metric_admitted',
      traditionalMetricBindingRef: null,
      automaticCriterionStateAuthorized: false,
      bindingDecision: 'not_admitted',
    });
    expect(lipsSubstantial?.missingAuthority).toContain('outer_inner_lip_anatomical_roles');
    expect(lipsSubstantial?.missingAuthority).toContain('lip_thickness_metric_definition');

    expect(review.criterionReviews.slice(2).map((item) => item.candidateNeutralMetricRefs.length)).toEqual([0, 0, 0]);
    expect(review.criterionReviews.every((item) => item.traditionalMetricBindingRef === null)).toBe(true);
    expect(review.criterionReviews.every((item) => item.calibrationRef === null)).toBe(true);
    expect(review.criterionReviews.every((item) => item.thresholdRef === null)).toBe(true);
  });

  it('completes review authority without issuing morphology, criteria, claims, thresholds, or traditional semantics', () => {
    const review = reviewFiveOfficerMouthMetricBindingsFR81();
    expect(review.bindingSummary).toEqual({
      traditionalMetricBindingReviewCompleted: true,
      neutralMetricDefinitionsReviewed: 1,
      traditionalMetricBindingsIssued: 0,
      calibrationRefsIssued: 0,
      thresholdRefsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalFormationAuthorized: false,
      traditionalSemanticAuthority: false,
    });
    expect(review.authorityBoundary).toEqual({
      partialShapeCandidateMeansTraditionalBinding: false,
      aspectRatioMeansRelativeMouthSize: false,
      canonicalMetricPlaneMeansPhysicalAnthropometry: false,
      operationalizationNoteMeansReviewedBinding: false,
      sourceConceptMeansMachineThreshold: false,
      staticV1EligibleMeansAutomaticCriterionState: false,
      researchMethodologyMeansProductionAuthority: false,
      unverifiedOcrMeansScanCheckedSource: false,
      noOuterInnerRolesMeansLipThicknessUnavailable: true,
    });
    expect(review.remainingBlockers).not.toContain('traditional_mouth_metric_binding_not_reviewed');
    expect(review.remainingBlockers).toContain('square_broad_relative_mouth_size_metric_not_defined');
    expect(review.remainingBlockers).toContain('five_officers_source_not_scan_checked');
    expect(review.prohibitedShortcuts).toContain('fr80_aspect_ratio_to_square_broad_binding');
    expect(review.prohibitedShortcuts).toContain('binding_review_to_criterion_state');
  });

  it('rejects a structurally plausible forged review that was not issued by FR81', () => {
    const forged = {
      schemaVersion: 'fr81-five-officers-mouth-metric-binding-review-v1',
      authorityState: 'traditional_metric_binding_review_completed_no_binding_admitted',
    } as unknown as FiveOfficerMouthMetricBindingReviewFR81V1;
    expect(() => assertIssuedFiveOfficerMouthMetricBindingReviewFR81(forged))
      .toThrow(/not issued by the active FR-81 boundary/u);
  });

  it('freezes the review artifact and nested authority collections', () => {
    const review = reviewFiveOfficerMouthMetricBindingsFR81();
    expect(Object.isFrozen(review)).toBe(true);
    expect(Object.isFrozen(review.neutralMetricDefinition)).toBe(true);
    expect(Object.isFrozen(review.traditionalSource)).toBe(true);
    expect(Object.isFrozen(review.criterionReviews)).toBe(true);
    expect(Object.isFrozen(review.criterionReviews[0])).toBe(true);
    expect(Object.isFrozen(review.criterionReviews[0]?.candidateNeutralMetricRefs)).toBe(true);
    expect(Object.isFrozen(review.criterionReviews[0]?.missingAuthority)).toBe(true);
    expect(Object.isFrozen(review.bindingSummary)).toBe(true);
    expect(Object.isFrozen(review.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(review.remainingBlockers)).toBe(true);
    expect(Object.isFrozen(review.prohibitedShortcuts)).toBe(true);
  });
});
