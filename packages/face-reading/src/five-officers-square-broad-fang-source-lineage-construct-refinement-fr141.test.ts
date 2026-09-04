import { describe, expect, it } from 'vitest';
import {
  FR141_NEXT_FRONTIER,
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';

describe('FR141 square-broad 方 source-lineage construct refinement', () => {
  it('records the lineage conflict without changing the governed target source', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();
    assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(result);

    expect(result.target).toEqual({
      criterionRef: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      activeConstructScope: 'fang_shape_candidate_features_only',
      authoritativeSourceRef: 'passage.shenxiang.five_officers.intake.nlc_1925',
    });
    expect(result.sourceLineageFindings.targetPassageContainsFangDaCompound).toBe(true);
    expect(result.sourceLineageFindings.shenxiangNamedMouthTaxonomySeparatesSiziKouAndFangKou).toBe(true);
    expect(result.sourceLineageFindings.gujinCompilationPreservesSeparateSiziKouAndFangKouEntries).toBe(true);
    expect(result.sourceLineageFindings.gongduLaterCommentaryEquatesFangKouWithAncientSiziKou).toBe(true);
    expect(result.sourceLineageFindings.gongduLaterCommentaryDescribesUpperAndLowerFourCornersWithFangLeng).toBe(true);
    expect(result.sourceLineageFindings.taxonomyConflictPresent).toBe(true);
    expect(result.sourceLineageFindings.fangEqualsSiziKouEstablished).toBe(false);
    expect(result.sourceLineageFindings.fourCornerFangLengIsPrimaryTargetDefinition).toBe(false);
  });

  it('keeps external research material below authority-registry and reviewed-methodology mutation boundaries', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.evidenceBoundary.authoritativeTargetPassageUnchanged).toBe(true);
    expect(result.evidenceBoundary.externalResearchSourcesAreAuthorityRegistryEntries).toBe(false);
    expect(result.evidenceBoundary.externalResearchSourcesAutomaticallyAmendReviewedMethodology).toBe(false);
    expect(result.evidenceBoundary.modernInternetIllustrationsAreGroundTruthLabels).toBe(false);
    expect(result.evidenceBoundary.laterCommentaryMayOverridePrimaryTargetPassage).toBe(false);
  });

  it('refines 方 into separate source-grounded neutral candidate families', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.constructRefinement.fangAndDaRemainAnalyticallySeparatedForResearch).toBe(true);
    expect(result.constructRefinement.primaryCandidateFamilies).toEqual([
      'structural_regularity_and_alignment',
      'rectilinear_segment_persistence',
      'localized_corner_distinctness_supporting_later_commentary',
    ]);
    expect(result.constructRefinement.daBreadthResearchTrackSeparated).toBe(true);
    expect(result.constructRefinement.upperLowerContourCorrespondenceCandidateRecommended).toBe(true);
    expect(result.constructRefinement.localizedCornerGeometryCandidateRecommended).toBe(true);
    expect(result.constructRefinement.rectilinearSegmentPersistenceCandidateRecommended).toBe(true);
    expect(result.constructRefinement.directAspectRatioProxyForFangAuthorized).toBe(false);
    expect(result.constructRefinement.directMouthWidthProxyForFangAuthorized).toBe(false);
  });

  it('reclassifies existing metrics without turning any of them into a traditional 方 proxy', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.existingMetricReclassification).toEqual([
      {
        metricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
        role: 'deprioritized_for_fang_possible_size_or_shape_context_only',
        directTraditionalFangBindingAuthorized: false,
      },
      {
        metricRef: 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0',
        role: 'supporting_neutral_shape_candidate_not_direct_fang_proxy',
        directTraditionalFangBindingAuthorized: false,
      },
      {
        metricRef: 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0',
        role: 'supporting_neutral_local_direction_change_candidate_not_named_corner_metric',
        directTraditionalFangBindingAuthorized: false,
      },
      {
        metricRef: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
        role: 'route_toward_da_breadth_research_not_direct_fang_proxy',
        directTraditionalFangBindingAuthorized: false,
      },
    ]);
  });

  it('defers unavailable human review while keeping production semantic execution closed', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.humanReviewTrack.concreteReviewerUnavailableAtCurrentProjectState).toBe(true);
    expect(result.humanReviewTrack.reviewerActorAssignmentDeferred).toBe(true);
    expect(result.humanReviewTrack.reviewerDeferralMeansFangConstructAbandoned).toBe(false);
    expect(result.humanReviewTrack.collectionAuthorizationPresent).toBe(false);
    expect(result.humanReviewTrack.humanSemanticCollectionAuthorized).toBe(false);
    expect(result.humanReviewTrack.empiricalSemanticEvidenceAcquisitionAuthorized).toBe(false);
    expect(result.execution.newNeutralMetricDefinitionsIssued).toBe(0);
    expect(result.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(result.execution.calibrationProtocolsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.structuredClaimsIssued).toBe(0);
    expect(result.execution.boundedNarrativesIssued).toBe(0);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
    expect(result.nextFrontier).toBe(FR141_NEXT_FRONTIER);
  });
});
