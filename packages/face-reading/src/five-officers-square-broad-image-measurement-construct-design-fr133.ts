import {
  assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
} from './five-officers-intake-criterion-semantic-operationalization-research-fr132.js';
import { assessGovernedMetricLipsSurfaceReadinessFR78 } from './governed-metric-lips-surface-fr78.js';
import { getPoseNormalizedLipsProjectionRuleFR79 } from './pose-normalized-lips-geometry-fr79.js';
import { getNeutralMouthContourMetricDefinitionFR80 } from './neutral-mouth-contour-metric-fr80.js';
import { getNeutralMouthRelativeSizeMetricDefinitionFR82 } from './neutral-mouth-relative-size-metric-fr82.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_ID = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const SOURCE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const SOURCE_TEXT = '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const;
const RESEARCH_NOTE_REF = 'repo:research/face-reading/fr133-square-broad-image-measurement-construct-design.md' as const;
const FR80_REF = 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;
const FR82_REF = 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const;

export type SquareBroadComponentFR133V1 = '方' | '大';
export type SquareBroadObservableReadinessFR133V1 =
  | 'implemented_neutral_metric'
  | 'derivable_role_invariant_neutral_candidate'
  | 'blocked_missing_outer_contour_anatomical_role'
  | 'blocked_missing_governed_anatomical_reference'
  | 'blocked_missing_source_grounded_geometric_definition';

export interface SquareBroadNeutralObservableCandidateFR133V1 {
  readonly candidateId:
    | 'candidate.fang.bounding_box_aspect_ratio'
    | 'candidate.fang.closed_cycle_edge_orientation_distribution'
    | 'candidate.fang.closed_cycle_turning_angle_distribution'
    | 'candidate.fang.external_outline_rectilinearity'
    | 'candidate.da.full_mesh_horizontal_span_ratio'
    | 'candidate.da.anatomical_face_width_relative_span'
    | 'candidate.da.containment_geometry';
  readonly component: SquareBroadComponentFR133V1;
  readonly readiness: SquareBroadObservableReadinessFR133V1;
  readonly existingMetricRef: typeof FR80_REF | typeof FR82_REF | null;
  readonly sourceGeometry: string;
  readonly measuresNeutralProperty: string;
  readonly doesNotEstablish: readonly string[];
  readonly normalizationOrAuthorityRequirements: readonly string[];
  readonly constructValidityStatus: 'not_established';
  readonly traditionalSemanticBindingAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly criterionStateAuthorized: false;
}

export interface SquareBroadImageMeasurementConstructDesignFR133V1 {
  readonly schemaVersion: 'fr133-square-broad-image-measurement-construct-design-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding';
  readonly predecessor: {
    readonly fr132AuthorityState: 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred';
    readonly fr132NextFrontier: 'source_grounded_square_broad_construct_operationalization_and_calibration_design';
    readonly targetSpecificApprovalExplicitlyDeferred: true;
    readonly methodologyReviewStatus: 'research';
  };
  readonly governedSource: {
    readonly criterionId: typeof CRITERION_ID;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly passageRef: typeof SOURCE_REF;
    readonly text: typeof SOURCE_TEXT;
    readonly verificationStatus: 'scan_checked';
  };
  readonly geometryCapability: {
    readonly providerReleaseExactLipsTopology: true;
    readonly lipsConnectedComponentCount: 2;
    readonly lipsClosedCycleComponentCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly poseNormalized2DProjectionReviewed: true;
    readonly poseNormalizedCoordinateFrame: 'pose_normalized_face_2d';
    readonly poseCompensated: true;
    readonly contourComponentRoleLabelsPublished: false;
    readonly outerInnerAnatomicalRoleAuthorized: false;
    readonly providerComponentOrderSemanticUseAuthorized: false;
    readonly roleInvariantClosedCycleGeometryResearchPossible: true;
    readonly externalMouthOutlineGovernedIdentificationAvailable: false;
  };
  readonly observableCandidates: readonly SquareBroadNeutralObservableCandidateFR133V1[];
  readonly findings: {
    readonly fangPartiallyImageMeasurableAsNeutralGeometry: true;
    readonly fangBoundingBoxAspectRatioAloneSufficient: false;
    readonly fangRoleInvariantCycleOrientationCandidateDerivable: true;
    readonly fangRoleInvariantTurningAngleCandidateDerivable: true;
    readonly fangExternalOutlineSquarenessCurrentlyGoverned: false;
    readonly daPartiallyImageMeasurableAsNeutralRelativeSpan: true;
    readonly fr82FullMeshDenominatorIsAnatomicalFaceWidth: false;
    readonly daAnatomicalRelativeSizeCurrentlyGoverned: false;
    readonly daContainmentOperationalizationAvailable: false;
    readonly traditionalSquareBroadConstructValidityEstablished: false;
    readonly squareBroadCriterionMachineMeasurableUnderCurrentAuthority: false;
  };
  readonly constructValidityPlan: {
    readonly prerequisites: readonly [
      'freeze_neutral_candidate_metric_definitions_before_evaluation',
      'govern_external_mouth_outline_role_or_use_explicit_role_invariant_candidate_only',
      'govern_anatomical_relative_size_reference_before_calling_da_relative_face_size',
      'define_source_grounded_containment_construct_before_measuring_containment',
      'use_pose_normalized_neutral_expression_capture_protocol',
      'keep_semantic_annotation_and_metric_computation_independent',
    ];
    readonly evaluationSequence: readonly [
      'neutral_metric_repeatability_and_capture_sensitivity',
      'candidate_construct_convergent_and_discriminant_validity',
      'source_grounded_semantic_review_after_approval_is_no_longer_deferred',
      'calibration_only_after_construct_validity',
      'threshold_consideration_only_after_calibration',
    ];
    readonly numericThresholdProposed: false;
    readonly calibrationDatasetSizeInvented: false;
    readonly reviewerCountInvented: false;
  };
  readonly execution: {
    readonly constructDesignRecordsIssued: 1;
    readonly neutralObservableCandidatesAssessed: 7;
    readonly existingImplementedNeutralMetricsRecognized: 2;
    readonly newNeutralMetricDefinitionsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly closedCycleTopologyMeansOuterLipRole: false;
    readonly roleInvariantGeometryMeansTraditionalFang: false;
    readonly aspectRatioMeansTraditionalFang: false;
    readonly fullMeshRelativeSpanMeansTraditionalDa: false;
    readonly fullMeshHorizontalSpanMeansAnatomicalFaceWidth: false;
    readonly imageMeasurableNeutralPropertyMeansConstructValidity: false;
    readonly constructDesignMeansReviewedPromotion: false;
    readonly constructDesignMeansCalibration: false;
    readonly constructDesignMeansThreshold: false;
    readonly constructDesignMeansCriterionState: false;
    readonly historicalArtifactMutated: false;
  };
  readonly researchNoteRef: typeof RESEARCH_NOTE_REF;
  readonly nextFrontier: 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design';
}

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadImageMeasurementConstructDesignFR133V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-133 ${message}`);
}

function validatePredecessorAndGeometry(): void {
  const fr132 = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(fr132);
  if (
    fr132.authorityState !== 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred' ||
    fr132.nextFrontier !== 'source_grounded_square_broad_construct_operationalization_and_calibration_design' ||
    fr132.promotionStatus.targetSpecificApprovalExplicitlyDeferred !== true ||
    fr132.governedSource.methodologyReviewStatus !== 'research' ||
    fr132.governedSource.passageRef !== SOURCE_REF ||
    fr132.governedSource.text !== SOURCE_TEXT ||
    fr132.governedSource.verificationStatus !== 'scan_checked' ||
    fr132.execution.traditionalMetricBindingsIssued !== 0 ||
    fr132.execution.thresholdsIssued !== 0 ||
    fr132.execution.criterionStatesIssued !== 0
  ) fail('FR-132 predecessor or deferred-approval boundary drift.');

  const squareBroad = fr132.criterionResearch.find((record) => record.criterionId === CRITERION_ID);
  if (
    squareBroad === undefined || squareBroad.sourceConcept !== SOURCE_CONCEPT ||
    squareBroad.constructValidityStatus !== 'not_established' ||
    squareBroad.traditionalMetricBindingAuthorized !== false ||
    !squareBroad.missingOperationalConstructs.includes('governed_mouth_outline_rectilinearity_or_angularity_observation_for_fang') ||
    !squareBroad.missingOperationalConstructs.includes('anatomically_governed_relative_mouth_size_reference_for_da')
  ) fail('FR-132 square-broad research boundary drift.');

  const readiness = assessGovernedMetricLipsSurfaceReadinessFR78();
  const projection = getPoseNormalizedLipsProjectionRuleFR79();
  if (
    readiness.authorityState !== 'release_exact_metric_lips_projection_ready' ||
    readiness.sourceWitness.edgeCount !== 40 || readiness.sourceWitness.connectedComponentCount !== 2 ||
    readiness.sourceWitness.closedCycleComponentCount !== 2 || readiness.sourceWitness.componentRoleLabelsPublished !== false ||
    readiness.contourCount !== 2 || readiness.contourPointCounts[0] !== 20 || readiness.contourPointCounts[1] !== 20 ||
    readiness.outerInnerAnatomicalAssignmentAllowed !== false || readiness.providerComponentOrderSemanticUseAllowed !== false ||
    projection.authorityState !== 'reviewed_neutral_orthographic_projection_rule' ||
    projection.targetCoordinateFrame !== 'pose_normalized_face_2d' || projection.poseCompensated !== true ||
    projection.semanticAuthority !== false
  ) fail('FR-78/FR-79 governed geometry capability drift.');

  const fr80 = getNeutralMouthContourMetricDefinitionFR80();
  const fr82 = getNeutralMouthRelativeSizeMetricDefinitionFR82();
  if (
    fr80.metricRef !== FR80_REF || fr80.traditionalCriterionBindingRef !== null ||
    fr80.interpretationBoundary !== 'continuous_unordered_contour_set_shape_metric_only_no_physiognomy_classification' ||
    fr82.metricRef !== FR82_REF || fr82.faceWidthAnatomicalRoleAssigned !== false ||
    fr82.traditionalCriterionBindingRef !== null ||
    fr82.interpretationBoundary !== 'continuous_relative_mesh_span_metric_only_no_traditional_big_or_face_width_anatomy'
  ) fail('FR-80/FR-82 neutral metric boundary drift.');
}

function candidates(): readonly SquareBroadNeutralObservableCandidateFR133V1[] {
  const base = {
    constructValidityStatus: 'not_established' as const,
    traditionalSemanticBindingAuthorized: false as const,
    calibrationAuthorized: false as const,
    thresholdAuthorized: false as const,
    criterionStateAuthorized: false as const,
  };
  return Object.freeze([
    Object.freeze({
      ...base,
      candidateId: 'candidate.fang.bounding_box_aspect_ratio' as const,
      component: '方' as const,
      readiness: 'implemented_neutral_metric' as const,
      existingMetricRef: FR80_REF,
      sourceGeometry: 'union_of_two_unordered_pose_normalized_lips_closed_cycles',
      measuresNeutralProperty: 'global mouth-contour-set bounding-box width-to-height proportion',
      doesNotEstablish: Object.freeze(['rectilinearity', 'corner angularity', 'external mouth outline identity', 'traditional 方']),
      normalizationOrAuthorityRequirements: Object.freeze(['pose_normalized_face_2d']),
    }),
    Object.freeze({
      ...base,
      candidateId: 'candidate.fang.closed_cycle_edge_orientation_distribution' as const,
      component: '方' as const,
      readiness: 'derivable_role_invariant_neutral_candidate' as const,
      existingMetricRef: null,
      sourceGeometry: 'each pose-normalized 20-point closed cycle, aggregated without assigning component semantics',
      measuresNeutralProperty: 'distribution of local segment orientations relative to canonical horizontal and vertical axes',
      doesNotEstablish: Object.freeze(['external lip outline', 'rectangular mouth morphology', 'traditional 方']),
      normalizationOrAuthorityRequirements: Object.freeze(['pose_normalized_face_2d', 'closed_cycle_traversal', 'role_invariant_component_aggregation']),
    }),
    Object.freeze({
      ...base,
      candidateId: 'candidate.fang.closed_cycle_turning_angle_distribution' as const,
      component: '方' as const,
      readiness: 'derivable_role_invariant_neutral_candidate' as const,
      existingMetricRef: null,
      sourceGeometry: 'each pose-normalized 20-point closed cycle, aggregated without assigning component semantics',
      measuresNeutralProperty: 'distribution and concentration of local boundary direction changes',
      doesNotEstablish: Object.freeze(['named mouth corners', 'external lip outline', 'traditional 方']),
      normalizationOrAuthorityRequirements: Object.freeze(['pose_normalized_face_2d', 'closed_cycle_traversal', 'role_invariant_component_aggregation']),
    }),
    Object.freeze({
      ...base,
      candidateId: 'candidate.fang.external_outline_rectilinearity' as const,
      component: '方' as const,
      readiness: 'blocked_missing_outer_contour_anatomical_role' as const,
      existingMetricRef: null,
      sourceGeometry: 'would require governed external mouth/lip boundary identification',
      measuresNeutralProperty: 'rectilinearity or defined-edge character of the external mouth outline',
      doesNotEstablish: Object.freeze(['traditional 方 without construct validation']),
      normalizationOrAuthorityRequirements: Object.freeze(['governed_outer_contour_role', 'pose_normalized_face_2d', 'frozen_metric_definition']),
    }),
    Object.freeze({
      ...base,
      candidateId: 'candidate.da.full_mesh_horizontal_span_ratio' as const,
      component: '大' as const,
      readiness: 'implemented_neutral_metric' as const,
      existingMetricRef: FR82_REF,
      sourceGeometry: 'mouth horizontal span divided by all-468-landmark mesh horizontal span',
      measuresNeutralProperty: 'mouth horizontal span relative to the provider full-mesh horizontal span',
      doesNotEstablish: Object.freeze(['anatomical face width', 'overall mouth size', 'containment', 'traditional 大']),
      normalizationOrAuthorityRequirements: Object.freeze(['same_provider_run', 'same_canonical_asset', 'shared_canonical_metric_x']),
    }),
    Object.freeze({
      ...base,
      candidateId: 'candidate.da.anatomical_face_width_relative_span' as const,
      component: '大' as const,
      readiness: 'blocked_missing_governed_anatomical_reference' as const,
      existingMetricRef: null,
      sourceGeometry: 'would require a governed anatomical facial-width reference in the same normalized frame',
      measuresNeutralProperty: 'mouth span relative to an explicitly governed anatomical facial-width denominator',
      doesNotEstablish: Object.freeze(['traditional 大 without construct validation', 'containment']),
      normalizationOrAuthorityRequirements: Object.freeze(['governed_anatomical_face_width_reference', 'same_subject_same_frame', 'frozen_metric_definition']),
    }),
    Object.freeze({
      ...base,
      candidateId: 'candidate.da.containment_geometry' as const,
      component: '大' as const,
      readiness: 'blocked_missing_source_grounded_geometric_definition' as const,
      existingMetricRef: null,
      sourceGeometry: 'not yet defined',
      measuresNeutralProperty: 'no governed neutral property yet; FR132 only identifies containment as a source-context hypothesis',
      doesNotEstablish: Object.freeze(['a numeric definition of 收拾', 'traditional 大']),
      normalizationOrAuthorityRequirements: Object.freeze(['source_grounded_containment_definition', 'governed_observation_protocol']),
    }),
  ]);
}

export function assessSquareBroadImageMeasurementConstructDesignFR133(): SquareBroadImageMeasurementConstructDesignFR133V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessorAndGeometry();
  const observableCandidates = candidates();
  const result: SquareBroadImageMeasurementConstructDesignFR133V1 = Object.freeze({
    schemaVersion: 'fr133-square-broad-image-measurement-construct-design-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding' as const,
    predecessor: Object.freeze({
      fr132AuthorityState: 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred' as const,
      fr132NextFrontier: 'source_grounded_square_broad_construct_operationalization_and_calibration_design' as const,
      targetSpecificApprovalExplicitlyDeferred: true as const,
      methodologyReviewStatus: 'research' as const,
    }),
    governedSource: Object.freeze({
      criterionId: CRITERION_ID,
      sourceConcept: SOURCE_CONCEPT,
      passageRef: SOURCE_REF,
      text: SOURCE_TEXT,
      verificationStatus: 'scan_checked' as const,
    }),
    geometryCapability: Object.freeze({
      providerReleaseExactLipsTopology: true as const,
      lipsConnectedComponentCount: 2 as const,
      lipsClosedCycleComponentCount: 2 as const,
      contourPointCounts: Object.freeze([20, 20] as const),
      poseNormalized2DProjectionReviewed: true as const,
      poseNormalizedCoordinateFrame: 'pose_normalized_face_2d' as const,
      poseCompensated: true as const,
      contourComponentRoleLabelsPublished: false as const,
      outerInnerAnatomicalRoleAuthorized: false as const,
      providerComponentOrderSemanticUseAuthorized: false as const,
      roleInvariantClosedCycleGeometryResearchPossible: true as const,
      externalMouthOutlineGovernedIdentificationAvailable: false as const,
    }),
    observableCandidates,
    findings: Object.freeze({
      fangPartiallyImageMeasurableAsNeutralGeometry: true as const,
      fangBoundingBoxAspectRatioAloneSufficient: false as const,
      fangRoleInvariantCycleOrientationCandidateDerivable: true as const,
      fangRoleInvariantTurningAngleCandidateDerivable: true as const,
      fangExternalOutlineSquarenessCurrentlyGoverned: false as const,
      daPartiallyImageMeasurableAsNeutralRelativeSpan: true as const,
      fr82FullMeshDenominatorIsAnatomicalFaceWidth: false as const,
      daAnatomicalRelativeSizeCurrentlyGoverned: false as const,
      daContainmentOperationalizationAvailable: false as const,
      traditionalSquareBroadConstructValidityEstablished: false as const,
      squareBroadCriterionMachineMeasurableUnderCurrentAuthority: false as const,
    }),
    constructValidityPlan: Object.freeze({
      prerequisites: Object.freeze([
        'freeze_neutral_candidate_metric_definitions_before_evaluation',
        'govern_external_mouth_outline_role_or_use_explicit_role_invariant_candidate_only',
        'govern_anatomical_relative_size_reference_before_calling_da_relative_face_size',
        'define_source_grounded_containment_construct_before_measuring_containment',
        'use_pose_normalized_neutral_expression_capture_protocol',
        'keep_semantic_annotation_and_metric_computation_independent',
      ] as const),
      evaluationSequence: Object.freeze([
        'neutral_metric_repeatability_and_capture_sensitivity',
        'candidate_construct_convergent_and_discriminant_validity',
        'source_grounded_semantic_review_after_approval_is_no_longer_deferred',
        'calibration_only_after_construct_validity',
        'threshold_consideration_only_after_calibration',
      ] as const),
      numericThresholdProposed: false as const,
      calibrationDatasetSizeInvented: false as const,
      reviewerCountInvented: false as const,
    }),
    execution: Object.freeze({
      constructDesignRecordsIssued: 1 as const,
      neutralObservableCandidatesAssessed: 7 as const,
      existingImplementedNeutralMetricsRecognized: 2 as const,
      newNeutralMetricDefinitionsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      closedCycleTopologyMeansOuterLipRole: false as const,
      roleInvariantGeometryMeansTraditionalFang: false as const,
      aspectRatioMeansTraditionalFang: false as const,
      fullMeshRelativeSpanMeansTraditionalDa: false as const,
      fullMeshHorizontalSpanMeansAnatomicalFaceWidth: false as const,
      imageMeasurableNeutralPropertyMeansConstructValidity: false as const,
      constructDesignMeansReviewedPromotion: false as const,
      constructDesignMeansCalibration: false as const,
      constructDesignMeansThreshold: false as const,
      constructDesignMeansCriterionState: false as const,
      historicalArtifactMutated: false as const,
    }),
    researchNoteRef: RESEARCH_NOTE_REF,
    nextFrontier: 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design' as const,
  });
  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadImageMeasurementConstructDesignFR133(
  value: SquareBroadImageMeasurementConstructDesignFR133V1,
): void {
  if (!ISSUED.has(value)) fail('artifact must be issued by the FR-133 assessor.');
}
