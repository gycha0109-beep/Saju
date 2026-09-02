import { describe, expect, it } from 'vitest';
import {
  assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84,
  reviewNeutralLipBandGeometryFeasibilityFR84,
  type NeutralLipBandGeometryFeasibilityReviewFR84V1,
} from './neutral-lip-band-geometry-feasibility-review-fr84.js';

describe('FR84 neutral lip-band geometry feasibility review', () => {
  it('pins the release-exact unordered lips geometry without inventing component anatomy', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();
    assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(review);

    expect(review.schemaVersion).toBe('fr84-neutral-lip-band-geometry-feasibility-review-v1');
    expect(review.authorityState).toBe(
      'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted',
    );
    expect(review.sourceGeometry).toEqual({
      providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      providerTopologySymbol: 'FACE_LANDMARKS_LIPS',
      connectedComponentCount: 2,
      closedCycleComponentCount: 2,
      componentPointCounts: [20, 20],
      componentRoleLabelsPublished: false,
      poseNormalizedCoordinateFrame: 'pose_normalized_face_2d',
      contourConsumptionState: 'unordered_set_no_outer_inner_role',
    });
  });

  it('recognizes only role-free mathematical operations and admits no thickness metric', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();

    expect(review.existingRoleFreeNeutralMetrics).toEqual([
      {
        metricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
        role: 'union_contour_set_shape_ratio',
        outerInnerRoleRequired: false,
        traditionalBindingRef: null,
      },
      {
        metricRef: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
        role: 'union_contour_set_relative_horizontal_size',
        outerInnerRoleRequired: false,
        traditionalBindingRef: null,
      },
    ]);
    expect(review.feasibilityReview).toEqual({
      unorderedContourSetGeometryAvailable: true,
      perComponentClosedCycleGeometryAvailable: true,
      componentLocalAreaOrPerimeterMathematicallyDefinable: true,
      crossComponentDistanceMathematicallyDefinable: true,
      perSampleNestingRelationMathematicallyTestable: true,
      providerTopologyAloneAuthorizesNestingRelation: false,
      crossContourPointCorrespondenceAuthorized: false,
      outerInnerAnatomicalRolesAuthorized: false,
      geometricEnclosingEnclosedRolesAuthorized: false,
      lipBandAreaAuthorized: false,
      neutralThicknessLikeMetricDefinitionAdmitted: false,
      traditionalSubstantialThicknessSemanticsOperationalized: false,
      reviewDecision: 'prerequisite_geometry_only_more_validation_required',
    });
    expect(review.neutralMetricDefinitionsIssued).toBe(0);
    expect(review.neutralMetricValuesIssued).toBe(0);
    expect(review.anatomicalRolesIssued).toBe(0);
  });

  it('selects role-free per-sample nesting/nonintersection validation as the next frontier', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();

    expect(review.recommendedNextFrontier).toEqual({
      frontierKey: 'role_free_per_sample_contour_nesting_and_nonintersection_validation',
      purpose:
        'determine whether the two unordered pose-normalized contour cycles admit stable geometric enclosing/enclosed roles without anatomical naming',
      anatomicalRoleAssignmentAllowed: false,
      traditionalSemanticAssignmentAllowed: false,
      thicknessMetricIssuanceAllowed: false,
    });
    expect(review.resolvedProcessGap).toBe('lips_substantial_neutral_geometry_feasibility_not_reviewed');
    expect(review.newlyExposedPrerequisiteBlockers).toEqual([
      'role_free_contour_nesting_not_validated',
      'role_free_cross_contour_correspondence_not_defined',
    ]);
    expect(review.remainingBlockers).toContain('outer_inner_lip_roles_not_authorized');
    expect(review.remainingBlockers).toContain('lips_substantial_thickness_metric_not_defined');
    expect(review.remainingBlockers).toContain('five_officers_source_not_scan_checked');
  });

  it('preserves anti-shortcuts and emits no morphology, criterion state, claim, or traditional semantics', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();

    expect(review.authorityBoundary).toEqual({
      mathematicalDistanceMeansLipThickness: false,
      componentAreaDifferenceMeansLipBandArea: false,
      geometricNestingMeansOuterInnerAnatomy: false,
      geometricEnclosingEnclosedMeansOuterInnerAnatomy: false,
      providerClosedCyclesMeanNesting: false,
      providerComponentOrderMeansSemanticRole: false,
      feasibilityReviewMeansMetricDefinition: false,
      neutralGeometryMeansTraditionalDuanHou: false,
      sourceConceptMeansNumericThreshold: false,
    });
    expect(review.prohibitedShortcuts).toContain('two_closed_cycles_to_assumed_contour_nesting');
    expect(review.prohibitedShortcuts).toContain('cross_component_distance_to_lip_thickness');
    expect(review.prohibitedShortcuts).toContain('geometric_enclosing_enclosed_to_anatomical_outer_inner');
    expect(review.prohibitedShortcuts).toContain('neutral_geometry_to_traditional_duan_hou_semantics');
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects structurally plausible but unissued FR84 reviews', () => {
    const forged = {
      schemaVersion: 'fr84-neutral-lip-band-geometry-feasibility-review-v1',
      authorityState: 'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted',
    } as unknown as NeutralLipBandGeometryFeasibilityReviewFR84V1;

    expect(() => assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(forged)).toThrow(
      /not issued by the active FR-84 boundary/u,
    );
  });
});
