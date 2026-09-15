import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179,
  FR179_CLAUSE_REVIEWS,
  FR179_NEXT_FRONTIER,
  FR179_RESEARCH_NOTE_REF,
  FR179_VERDICT,
  issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179,
  type EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1,
} from './eye-pair-direct-source-morphology-representability-reassessment-fr179.js';

function forgedFR179(): EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1 {
  return Object.freeze({}) as unknown as EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1;
}

describe('FR179 Eye-Pair direct-source morphology representability reassessment', () => {
  it('pins the FR175 and FR176 direct-source authority without semantic promotion', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();

    expect(review.sourceAuthority.fr175DirectPassage).toContain('或細長極寸');
    expect(review.sourceAuthority.fr175Verdict).toBe('SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION');
    expect(review.sourceAuthority.fr176SelectedWitnessClauses).toContain('細而長');
    expect(review.sourceAuthority.fr176SelectedWitnessClauses).toContain('目長一寸');
    expect(review.sourceAuthority.fr176ExactScanPageVisuallyPinned).toBe(false);
    expect(review.sourceAuthority.translationUsedAsAuthority).toBe(false);
  });

  it('recognizes FR178 Y-span geometry as neutral observation authority only', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();

    expect(review.observationAuthority.fr178MetricRefs).toEqual([
      'neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
    ]);
    expect(review.observationAuthority).toMatchObject({
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      roleInvariantAggregationOverTwoEyeCycles: true,
      geometricYSpanAvailable: true,
      geometricYToXSpanRatioAvailable: true,
      physiologicalApertureIssued: false,
      eyeHeightSemanticLabelIssued: false,
      anatomicalLateralityResolved: false,
      individualEyeAsymmetryOutputAuthorized: false,
      traditionalUnitMappingAuthorized: false,
      numericTraditionalThresholdAuthorized: false,
    });
  });

  it('narrows the geometry gap for 細長 clauses but admits no traditional binding', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();
    const fr175 = review.clauseReviews.find((item) => item.original === '或細長極寸');
    const thinLong = review.clauseReviews.find((item) => item.original === '細而長');

    expect(fr175).toMatchObject({
      geometryGapNarrowedByFR178: true,
      directlyRepresentableAfterFR178: false,
      traditionalBindingDecision: 'not_admitted',
    });
    expect(fr175?.remainingBlockers).toContain('traditional_cun_mapping_absent');
    expect(fr175?.remainingBlockers).toContain('traditional_ji_extent_operationalization_absent');
    expect(thinLong).toMatchObject({
      geometryGapNarrowedByFR178: true,
      directlyRepresentableAfterFR178: false,
      traditionalBindingDecision: 'not_admitted',
    });
    expect(thinLong?.remainingBlockers).toContain('source_authorized_thresholds_absent');
  });

  it('keeps unit, triangle, radiance, eye-tail and compound-clause gaps fail closed', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();
    const cun = review.clauseReviews.find((item) => item.original === '目長一寸');
    const triangle = review.clauseReviews.find((item) => item.original === '目有三角');
    const radiance = review.clauseReviews.find((item) => item.original === '目大而光');
    const tail = review.clauseReviews.find((item) => item.original === '目尾相垂');

    expect(cun?.directlyRepresentableAfterFR178).toBe(false);
    expect(cun?.remainingBlockers).toContain('traditional_cun_mapping_absent');
    expect(triangle?.remainingBlockers).toContain('turning_angle_to_triangle_classifier_not_authorized');
    expect(radiance?.remainingBlockers).toContain('ocular_radiance_outside_static_geometry');
    expect(tail?.remainingBlockers).toContain('eye_tail_orientation_metric_not_defined');
    expect(review.authorityBoundary.selectiveSemanticDecompositionAuthorized).toBe(false);
  });

  it('issues zero traditional bindings, thresholds, morphology, claims, or production rules', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();

    expect(review.verdict).toBe(FR179_VERDICT);
    expect(review.verdict).toBe('NEUTRAL_GEOMETRY_REPRESENTABILITY_EXPANDED_TRADITIONAL_BINDING_NOT_ADMITTED');
    expect(review.representabilitySummary).toEqual({
      reviewedClauseCount: 7,
      fr178NarrowedPriorGeometryGapClauseCount: 2,
      directlyRepresentableClauseCount: 0,
      traditionalMetricBindingsIssued: 0,
      calibrationRefsIssued: 0,
      thresholdRefsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      structuredClaimsIssued: 0,
      productionRulesIssued: 0,
      bindingDecision: 'not_admitted',
    });
    expect(review.authorityBoundary).toMatchObject({
      neutralYToXRatioMeansTraditionalXi: false,
      relativeXSpanMeansTraditionalChang: false,
      neutralMetricPairMeansTraditionalXiErChang: false,
      geometricYSpanMeansPhysiologicalAperture: false,
      neutralGeometryMeansTraditionalJi: false,
      normalizedMetricRatioMeansTraditionalCun: false,
      turningAngleMeansTriangleClassifier: false,
      thresholdIssued: false,
      scoreIssued: false,
      rankIssued: false,
      calibrationIssued: false,
      productionRuleAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
  });

  it('preserves privacy and biometric boundaries', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();

    expect(Object.values(review.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(FR179_CLAUSE_REVIEWS).toHaveLength(7);
  });

  it('rejects structural lookalikes and advances only to separate operationalization research', () => {
    const review = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();

    expect(() => assertIssuedEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179(review)).not.toThrow();
    expect(() => assertIssuedEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179(forgedFR179())).toThrow(/not issued/u);
    expect(FR179_RESEARCH_NOTE_REF).toBe(
      'repo:research/face-reading/fr179-eye-pair-direct-source-morphology-representability-reassessment.md',
    );
    expect(FR179_NEXT_FRONTIER).toBe(
      'review_source_authorized_operationalization_requirements_for_eye_pair_xi_chang_without_inventing_thresholds_or_cun_mapping',
    );
  });
});