import { describe, expect, it } from 'vitest';
import {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
} from './five-officers-square-broad-image-measurement-construct-design-fr133.js';

describe('FR133 square-broad image measurement construct design', () => {
  it('preserves FR132 deferred approval while narrowing the work to 方大 measurement constructs', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    assertIssuedSquareBroadImageMeasurementConstructDesignFR133(value);

    expect(value.authorityState).toBe(
      'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding',
    );
    expect(value.predecessor.targetSpecificApprovalExplicitlyDeferred).toBe(true);
    expect(value.predecessor.methodologyReviewStatus).toBe('research');
    expect(value.governedSource.criterionId).toBe('criterion.intake.square_broad');
    expect(value.governedSource.sourceConcept).toBe('方大');
  });

  it('records the actual landmark geometry capability without inventing outer/inner anatomy', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    expect(value.geometryCapability.providerReleaseExactLipsTopology).toBe(true);
    expect(value.geometryCapability.lipsConnectedComponentCount).toBe(2);
    expect(value.geometryCapability.lipsClosedCycleComponentCount).toBe(2);
    expect(value.geometryCapability.contourPointCounts).toEqual([20, 20]);
    expect(value.geometryCapability.poseNormalized2DProjectionReviewed).toBe(true);
    expect(value.geometryCapability.poseCompensated).toBe(true);
    expect(value.geometryCapability.contourComponentRoleLabelsPublished).toBe(false);
    expect(value.geometryCapability.outerInnerAnatomicalRoleAuthorized).toBe(false);
    expect(value.geometryCapability.providerComponentOrderSemanticUseAuthorized).toBe(false);
    expect(value.geometryCapability.externalMouthOutlineGovernedIdentificationAvailable).toBe(false);
  });

  it('separates implemented and derivable neutral 方 observations from the unavailable external-outline construct', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    const aspect = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.fang.bounding_box_aspect_ratio');
    const orientation = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.fang.closed_cycle_edge_orientation_distribution');
    const turning = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.fang.closed_cycle_turning_angle_distribution');
    const outline = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.fang.external_outline_rectilinearity');

    expect(aspect?.readiness).toBe('implemented_neutral_metric');
    expect(aspect?.existingMetricRef).toBe('neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0');
    expect(orientation?.readiness).toBe('derivable_role_invariant_neutral_candidate');
    expect(turning?.readiness).toBe('derivable_role_invariant_neutral_candidate');
    expect(outline?.readiness).toBe('blocked_missing_outer_contour_anatomical_role');
    expect(value.findings.fangBoundingBoxAspectRatioAloneSufficient).toBe(false);
    expect(value.findings.fangExternalOutlineSquarenessCurrentlyGoverned).toBe(false);
  });

  it('keeps 大 relative-span observability separate from anatomical face width and containment', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    const meshRatio = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.da.full_mesh_horizontal_span_ratio');
    const anatomicalRatio = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.da.anatomical_face_width_relative_span');
    const containment = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.da.containment_geometry');

    expect(meshRatio?.readiness).toBe('implemented_neutral_metric');
    expect(meshRatio?.existingMetricRef).toBe(
      'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
    );
    expect(anatomicalRatio?.readiness).toBe('blocked_missing_governed_anatomical_reference');
    expect(containment?.readiness).toBe('blocked_missing_source_grounded_geometric_definition');
    expect(value.findings.fr82FullMeshDenominatorIsAnatomicalFaceWidth).toBe(false);
    expect(value.findings.daAnatomicalRelativeSizeCurrentlyGoverned).toBe(false);
    expect(value.findings.daContainmentOperationalizationAvailable).toBe(false);
  });

  it('defines a construct-validity sequence without creating calibration values, thresholds or criterion states', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    expect(value.constructValidityPlan.numericThresholdProposed).toBe(false);
    expect(value.constructValidityPlan.calibrationDatasetSizeInvented).toBe(false);
    expect(value.constructValidityPlan.reviewerCountInvented).toBe(false);
    expect(value.constructValidityPlan.evaluationSequence).toEqual([
      'neutral_metric_repeatability_and_capture_sensitivity',
      'candidate_construct_convergent_and_discriminant_validity',
      'source_grounded_semantic_review_after_approval_is_no_longer_deferred',
      'calibration_only_after_construct_validity',
      'threshold_consideration_only_after_calibration',
    ]);
    expect(value.execution.newNeutralMetricDefinitionsIssued).toBe(0);
    expect(value.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(value.execution.calibrationProtocolsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
    expect(value.findings.squareBroadCriterionMachineMeasurableUnderCurrentAuthority).toBe(false);
  });
});
