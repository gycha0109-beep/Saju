import process from 'node:process';

const {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
} = await import('../.face-reading-dist/five-officers-square-broad-image-measurement-construct-design-fr133.js');

const value = assessSquareBroadImageMeasurementConstructDesignFR133();
assertIssuedSquareBroadImageMeasurementConstructDesignFR133(value);

const byId = new Map(value.observableCandidates.map((candidate) => [candidate.candidateId, candidate]));
const aspect = byId.get('candidate.fang.bounding_box_aspect_ratio');
const orientation = byId.get('candidate.fang.closed_cycle_edge_orientation_distribution');
const turning = byId.get('candidate.fang.closed_cycle_turning_angle_distribution');
const outline = byId.get('candidate.fang.external_outline_rectilinearity');
const meshRatio = byId.get('candidate.da.full_mesh_horizontal_span_ratio');
const anatomicalRatio = byId.get('candidate.da.anatomical_face_width_relative_span');
const containment = byId.get('candidate.da.containment_geometry');

if (
  value.schemaVersion !== 'fr133-square-broad-image-measurement-construct-design-v1' ||
  value.authorityState !== 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding' ||
  value.predecessor.fr132AuthorityState !== 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred' ||
  value.predecessor.targetSpecificApprovalExplicitlyDeferred !== true ||
  value.predecessor.methodologyReviewStatus !== 'research' ||
  value.governedSource.criterionId !== 'criterion.intake.square_broad' ||
  value.governedSource.sourceConcept !== '方大' ||
  value.governedSource.passageRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  value.governedSource.verificationStatus !== 'scan_checked' ||
  value.geometryCapability.lipsConnectedComponentCount !== 2 ||
  value.geometryCapability.lipsClosedCycleComponentCount !== 2 ||
  value.geometryCapability.contourPointCounts[0] !== 20 ||
  value.geometryCapability.contourPointCounts[1] !== 20 ||
  value.geometryCapability.poseNormalized2DProjectionReviewed !== true ||
  value.geometryCapability.outerInnerAnatomicalRoleAuthorized !== false ||
  value.geometryCapability.providerComponentOrderSemanticUseAuthorized !== false ||
  value.geometryCapability.roleInvariantClosedCycleGeometryResearchPossible !== true ||
  value.geometryCapability.externalMouthOutlineGovernedIdentificationAvailable !== false ||
  value.observableCandidates.length !== 7 ||
  aspect?.readiness !== 'implemented_neutral_metric' ||
  aspect.existingMetricRef !== 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' ||
  orientation?.readiness !== 'derivable_role_invariant_neutral_candidate' ||
  turning?.readiness !== 'derivable_role_invariant_neutral_candidate' ||
  outline?.readiness !== 'blocked_missing_outer_contour_anatomical_role' ||
  meshRatio?.readiness !== 'implemented_neutral_metric' ||
  meshRatio.existingMetricRef !== 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' ||
  anatomicalRatio?.readiness !== 'blocked_missing_governed_anatomical_reference' ||
  containment?.readiness !== 'blocked_missing_source_grounded_geometric_definition' ||
  value.findings.fangBoundingBoxAspectRatioAloneSufficient !== false ||
  value.findings.fangExternalOutlineSquarenessCurrentlyGoverned !== false ||
  value.findings.fr82FullMeshDenominatorIsAnatomicalFaceWidth !== false ||
  value.findings.daAnatomicalRelativeSizeCurrentlyGoverned !== false ||
  value.findings.daContainmentOperationalizationAvailable !== false ||
  value.findings.traditionalSquareBroadConstructValidityEstablished !== false ||
  value.findings.squareBroadCriterionMachineMeasurableUnderCurrentAuthority !== false ||
  value.constructValidityPlan.numericThresholdProposed !== false ||
  value.constructValidityPlan.calibrationDatasetSizeInvented !== false ||
  value.constructValidityPlan.reviewerCountInvented !== false ||
  value.execution.constructDesignRecordsIssued !== 1 ||
  value.execution.neutralObservableCandidatesAssessed !== 7 ||
  value.execution.existingImplementedNeutralMetricsRecognized !== 2 ||
  value.execution.newNeutralMetricDefinitionsIssued !== 0 ||
  value.execution.traditionalMetricBindingsIssued !== 0 ||
  value.execution.calibrationProtocolsIssued !== 0 ||
  value.execution.thresholdsIssued !== 0 ||
  value.execution.criterionStatesIssued !== 0 ||
  value.execution.structuredClaimsIssued !== 0 ||
  value.execution.boundedNarrativesIssued !== 0 ||
  value.execution.traditionalSemanticAuthority !== false ||
  value.authorityBoundary.closedCycleTopologyMeansOuterLipRole !== false ||
  value.authorityBoundary.aspectRatioMeansTraditionalFang !== false ||
  value.authorityBoundary.fullMeshRelativeSpanMeansTraditionalDa !== false ||
  value.authorityBoundary.fullMeshHorizontalSpanMeansAnatomicalFaceWidth !== false ||
  value.authorityBoundary.imageMeasurableNeutralPropertyMeansConstructValidity !== false ||
  value.authorityBoundary.constructDesignMeansReviewedPromotion !== false ||
  value.authorityBoundary.historicalArtifactMutated !== false ||
  value.nextFrontier !== 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design'
) throw new Error('FR133 exact square-broad image measurement construct design drift.');

if (value.observableCandidates.some((candidate) =>
  candidate.constructValidityStatus !== 'not_established' ||
  candidate.traditionalSemanticBindingAuthorized !== false ||
  candidate.calibrationAuthorized !== false ||
  candidate.thresholdAuthorized !== false ||
  candidate.criterionStateAuthorized !== false
)) throw new Error('FR133 candidate authority boundary drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR133_SQUARE_BROAD_IMAGE_MEASUREMENT_CONSTRUCT_DESIGN_PASS',
  authorityState: value.authorityState,
  neutralObservableCandidatesAssessed: value.execution.neutralObservableCandidatesAssessed,
  squareBroadCriterionMachineMeasurable: value.findings.squareBroadCriterionMachineMeasurableUnderCurrentAuthority,
  nextFrontier: value.nextFrontier,
})}\n`);
