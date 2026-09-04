import {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
} from './five-officers-square-broad-image-measurement-construct-design-fr133.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

const AXIS_METRIC_KEY = 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean' as const;
const AXIS_METRIC_VERSION = '0.1.0' as const;
const AXIS_METRIC_REF = `${AXIS_METRIC_KEY}@${AXIS_METRIC_VERSION}` as const;
const TURN_METRIC_KEY = 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle' as const;
const TURN_METRIC_VERSION = '0.1.0' as const;
const TURN_METRIC_REF = `${TURN_METRIC_KEY}@${TURN_METRIC_VERSION}` as const;
const FR80_REF = 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;
const FR82_REF = 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const;
const RESEARCH_NOTE_REF = 'repo:research/face-reading/fr134-square-broad-neutral-shape-metric-runtime.md' as const;

export interface SquareBroadNeutralShapeMetricDefinitionFR134V1 {
  readonly metricKey: typeof AXIS_METRIC_KEY | typeof TURN_METRIC_KEY;
  readonly metricVersion: '0.1.0';
  readonly metricRef: typeof AXIS_METRIC_REF | typeof TURN_METRIC_REF;
  readonly sourceSurfaceKey: 'neutral.face.lips_contour_set';
  readonly requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly unit: 'ratio' | 'radian';
  readonly formula: string;
  readonly componentAggregation: 'role_invariant_mean_over_both_closed_cycles';
  readonly outerInnerAnatomicalRoleRequired: false;
  readonly providerComponentOrderRequired: false;
  readonly physicalAnthropometricInterpretationAllowed: false;
  readonly traditionalCriterionBindingRef: null;
  readonly calibrationRef: null;
  readonly interpretationBoundary: string;
}

export interface SquareBroadNeutralShapeMetricValueFR134V1 {
  readonly metricRef: typeof AXIS_METRIC_REF | typeof TURN_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio' | 'radian';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly poseCompensated: true;
  readonly contributingClosedCycleCount: 2;
  readonly contributingElementCount: 40;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface SquareBroadNeutralShapeMetricRuntimeFR134V1 {
  readonly schemaVersion: 'fr134-square-broad-neutral-shape-metric-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending';
  readonly extensionMode: 'separate_contract_extension';
  readonly predecessor: {
    readonly fr133AuthorityState: 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding';
    readonly fr133NextFrontier: 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design';
    readonly traditionalSquareBroadConstructValidityEstablished: false;
    readonly squareBroadCriterionMachineMeasurableUnderCurrentAuthority: false;
    readonly methodologyApprovalDeferred: true;
  };
  readonly source: {
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly fr79ArtifactVersion: '0.1.0';
    readonly surfaceKey: 'neutral.face.lips_contour_set';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly poseCompensated: true;
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly anatomicalRoleAssigned: false;
  };
  readonly metricDefinitions: readonly [
    SquareBroadNeutralShapeMetricDefinitionFR134V1,
    SquareBroadNeutralShapeMetricDefinitionFR134V1,
  ];
  readonly metricValues: readonly [
    SquareBroadNeutralShapeMetricValueFR134V1,
    SquareBroadNeutralShapeMetricValueFR134V1,
  ];
  readonly constructValidityDatasetDesign: {
    readonly designStatus: 'schema_only_no_dataset_materialized';
    readonly candidateFeatureRefs: readonly [
      typeof FR80_REF,
      typeof AXIS_METRIC_REF,
      typeof TURN_METRIC_REF,
      typeof FR82_REF,
    ];
    readonly captureUnit: 'same_subject_repeated_pose_normalized_neutral_expression_capture';
    readonly repeatedCaptureRequired: true;
    readonly independentSemanticAnnotationRequired: true;
    readonly semanticAnnotationAuthorityAvailable: false;
    readonly semanticAnnotationTarget: 'source_grounded_square_broad_construct_annotation_research_only';
    readonly evaluationSequence: readonly [
      'neutral_metric_repeatability_and_capture_sensitivity',
      'candidate_feature_redundancy_and_discriminant_structure',
      'convergent_and_discriminant_construct_validity_after_governed_annotation',
      'calibration_only_after_construct_validity',
      'threshold_consideration_only_after_calibration',
    ];
    readonly subjectCount: null;
    readonly captureCountPerSubject: null;
    readonly splitRatios: null;
    readonly numericAcceptanceThresholds: null;
    readonly traditionalClassLabelsIssued: 0;
  };
  readonly execution: {
    readonly newNeutralMetricDefinitionsIssued: 2;
    readonly newNeutralMetricValuesIssued: 2;
    readonly constructValidityDatasetSchemasIssued: 1;
    readonly constructValidityDatasetsMaterialized: 0;
    readonly semanticAnnotationsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly roleInvariantNeutralShapeMetricMeansTraditionalFang: false;
    readonly axisAlignmentMeansRectilinearExternalMouthOutline: false;
    readonly turningAngleMeansNamedMouthCorners: false;
    readonly neutralMetricRepeatabilityMeansConstructValidity: false;
    readonly constructValidityDatasetDesignMeansDatasetEvidence: false;
    readonly constructValidityMeansTraditionalCriterionBinding: false;
    readonly metricDefinitionMeansCalibration: false;
    readonly metricValueMeansThreshold: false;
    readonly metricValueMeansCriterionState: false;
    readonly historicalArtifactMutated: false;
  };
  readonly researchNoteRef: typeof RESEARCH_NOTE_REF;
  readonly nextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition';
}

const ISSUED = new WeakSet<object>();
const POINT_KEYS = new Set(['x', 'y']);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-134 ${message}`);
}

function axisDefinition(): SquareBroadNeutralShapeMetricDefinitionFR134V1 {
  return Object.freeze({
    metricKey: AXIS_METRIC_KEY,
    metricVersion: AXIS_METRIC_VERSION,
    metricRef: AXIS_METRIC_REF,
    sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
    requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    unit: 'ratio' as const,
    formula: 'mean(max(abs(dx),abs(dy))/hypot(dx,dy)) over all 40 directed closed-cycle edges' as const,
    componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
    outerInnerAnatomicalRoleRequired: false as const,
    providerComponentOrderRequired: false as const,
    physicalAnthropometricInterpretationAllowed: false as const,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'continuous_axis_alignment_of_unordered_closed_cycles_only_no_external_outline_or_traditional_fang_classification' as const,
  });
}

function turnDefinition(): SquareBroadNeutralShapeMetricDefinitionFR134V1 {
  return Object.freeze({
    metricKey: TURN_METRIC_KEY,
    metricVersion: TURN_METRIC_VERSION,
    metricRef: TURN_METRIC_REF,
    sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
    requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    unit: 'radian' as const,
    formula: 'mean(acos(clamp(dot(unit_incoming,unit_outgoing),-1,1))) over all 40 closed-cycle vertices' as const,
    componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
    outerInnerAnatomicalRoleRequired: false as const,
    providerComponentOrderRequired: false as const,
    physicalAnthropometricInterpretationAllowed: false as const,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'continuous_local_direction_change_of_unordered_closed_cycles_only_no_named_corners_or_traditional_fang_classification' as const,
  });
}

export function getSquareBroadNeutralShapeMetricDefinitionsFR134(): readonly [
  SquareBroadNeutralShapeMetricDefinitionFR134V1,
  SquareBroadNeutralShapeMetricDefinitionFR134V1,
] {
  return Object.freeze([axisDefinition(), turnDefinition()]);
}

function validatePredecessor(): void {
  const fr133 = assessSquareBroadImageMeasurementConstructDesignFR133();
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133(fr133);
  if (
    fr133.authorityState !== 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding' ||
    fr133.nextFrontier !== 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design' ||
    fr133.findings.fangRoleInvariantCycleOrientationCandidateDerivable !== true ||
    fr133.findings.fangRoleInvariantTurningAngleCandidateDerivable !== true ||
    fr133.findings.fangExternalOutlineSquarenessCurrentlyGoverned !== false ||
    fr133.findings.traditionalSquareBroadConstructValidityEstablished !== false ||
    fr133.findings.squareBroadCriterionMachineMeasurableUnderCurrentAuthority !== false ||
    fr133.predecessor.targetSpecificApprovalExplicitlyDeferred !== true ||
    fr133.execution.newNeutralMetricDefinitionsIssued !== 0 ||
    fr133.execution.traditionalMetricBindingsIssued !== 0 ||
    fr133.execution.thresholdsIssued !== 0 ||
    fr133.execution.criterionStatesIssued !== 0
  ) fail('FR-133 predecessor or authority boundary drift.');
}

function validateSource(source: PoseNormalizedLipsGeometryFR79V1): void {
  assertIssuedPoseNormalizedLipsGeometryFR79(source);
  if (
    source.schemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.surfaceKey !== 'neutral.face.lips_contour_set' ||
    source.coordinateFrame !== 'pose_normalized_face_2d' ||
    source.poseCompensated !== true ||
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourPointCounts[0] !== 20 ||
    source.contourPointCounts[1] !== 20 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
    source.authorityBoundary.providerComponentOrderSemanticUseAllowed !== false ||
    source.traditionalSemanticAuthority !== false
  ) fail('requires the exact issued FR-79 role-free pose-normalized lips geometry boundary.');

  for (let contourIndex = 0; contourIndex < source.contours.length; contourIndex += 1) {
    const contour = source.contours[contourIndex]!;
    if (
      contour.geometry.kind !== 'region' ||
      contour.geometry.boundary.length !== 20 ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail(`contour ${contourIndex} role or geometry drift.`);
    for (let pointIndex = 0; pointIndex < contour.geometry.boundary.length; pointIndex += 1) {
      const point = contour.geometry.boundary[pointIndex]!;
      const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
      if (unexpected !== undefined) fail(`point exposes unauthorized field ${unexpected}.`);
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) fail('all contour points must contain finite X/Y.');
    }
  }
}

function edgeMetrics(source: PoseNormalizedLipsGeometryFR79V1): { axis: number; turn: number } {
  let axisSum = 0;
  let axisCount = 0;
  let turnSum = 0;
  let turnCount = 0;

  for (const contour of source.contours) {
    const points = contour.geometry.boundary;
    for (let index = 0; index < points.length; index += 1) {
      const previous = points[(index - 1 + points.length) % points.length]!;
      const current = points[index]!;
      const next = points[(index + 1) % points.length]!;
      const outX = next.x - current.x;
      const outY = next.y - current.y;
      const outLength = Math.hypot(outX, outY);
      const inX = current.x - previous.x;
      const inY = current.y - previous.y;
      const inLength = Math.hypot(inX, inY);
      if (!Number.isFinite(outLength) || outLength <= 0 || !Number.isFinite(inLength) || inLength <= 0) {
        fail(`closed-cycle edges must have finite positive length at vertex ${index}.`);
      }

      axisSum += Math.max(Math.abs(outX), Math.abs(outY)) / outLength;
      axisCount += 1;

      const cosine = Math.max(-1, Math.min(1, ((inX * outX) + (inY * outY)) / (inLength * outLength)));
      const angle = Math.acos(cosine);
      if (!Number.isFinite(angle)) fail(`invalid turning angle at vertex ${index}.`);
      turnSum += angle;
      turnCount += 1;
    }
  }

  if (axisCount !== 40 || turnCount !== 40) fail('exactly 40 edges and 40 vertices must contribute.');
  const axis = axisSum / axisCount;
  const turn = turnSum / turnCount;
  if (!Number.isFinite(axis) || axis <= 0 || !Number.isFinite(turn) || turn < 0) fail('computed neutral metric is invalid.');
  return { axis, turn };
}

export function computeSquareBroadNeutralShapeMetricsFR134(
  source: PoseNormalizedLipsGeometryFR79V1,
): SquareBroadNeutralShapeMetricRuntimeFR134V1 {
  validatePredecessor();
  validateSource(source);
  const [axisMetric, turnMetric] = getSquareBroadNeutralShapeMetricDefinitionsFR134();
  const computed = edgeMetrics(source);

  const result: SquareBroadNeutralShapeMetricRuntimeFR134V1 = Object.freeze({
    schemaVersion: 'fr134-square-broad-neutral-shape-metric-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending' as const,
    extensionMode: 'separate_contract_extension' as const,
    predecessor: Object.freeze({
      fr133AuthorityState: 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding' as const,
      fr133NextFrontier: 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design' as const,
      traditionalSquareBroadConstructValidityEstablished: false as const,
      squareBroadCriterionMachineMeasurableUnderCurrentAuthority: false as const,
      methodologyApprovalDeferred: true as const,
    }),
    source: Object.freeze({
      fr79SchemaVersion: source.schemaVersion,
      fr79ArtifactVersion: source.artifactVersion,
      surfaceKey: source.surfaceKey,
      coordinateFrame: source.coordinateFrame,
      poseCompensated: source.poseCompensated,
      contourCount: 2 as const,
      contourPointCounts: Object.freeze([20, 20] as const),
      contourConsumptionState: source.contourConsumptionState,
      anatomicalRoleAssigned: false as const,
    }),
    metricDefinitions: Object.freeze([axisMetric, turnMetric]),
    metricValues: Object.freeze([
      Object.freeze({
        metricRef: AXIS_METRIC_REF,
        value: computed.axis,
        unit: 'ratio' as const,
        coordinateFrame: 'pose_normalized_face_2d' as const,
        poseCompensated: true as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 40 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: TURN_METRIC_REF,
        value: computed.turn,
        unit: 'radian' as const,
        coordinateFrame: 'pose_normalized_face_2d' as const,
        poseCompensated: true as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 40 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
    ]),
    constructValidityDatasetDesign: Object.freeze({
      designStatus: 'schema_only_no_dataset_materialized' as const,
      candidateFeatureRefs: Object.freeze([FR80_REF, AXIS_METRIC_REF, TURN_METRIC_REF, FR82_REF] as const),
      captureUnit: 'same_subject_repeated_pose_normalized_neutral_expression_capture' as const,
      repeatedCaptureRequired: true as const,
      independentSemanticAnnotationRequired: true as const,
      semanticAnnotationAuthorityAvailable: false as const,
      semanticAnnotationTarget: 'source_grounded_square_broad_construct_annotation_research_only' as const,
      evaluationSequence: Object.freeze([
        'neutral_metric_repeatability_and_capture_sensitivity',
        'candidate_feature_redundancy_and_discriminant_structure',
        'convergent_and_discriminant_construct_validity_after_governed_annotation',
        'calibration_only_after_construct_validity',
        'threshold_consideration_only_after_calibration',
      ] as const),
      subjectCount: null,
      captureCountPerSubject: null,
      splitRatios: null,
      numericAcceptanceThresholds: null,
      traditionalClassLabelsIssued: 0 as const,
    }),
    execution: Object.freeze({
      newNeutralMetricDefinitionsIssued: 2 as const,
      newNeutralMetricValuesIssued: 2 as const,
      constructValidityDatasetSchemasIssued: 1 as const,
      constructValidityDatasetsMaterialized: 0 as const,
      semanticAnnotationsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      roleInvariantNeutralShapeMetricMeansTraditionalFang: false as const,
      axisAlignmentMeansRectilinearExternalMouthOutline: false as const,
      turningAngleMeansNamedMouthCorners: false as const,
      neutralMetricRepeatabilityMeansConstructValidity: false as const,
      constructValidityDatasetDesignMeansDatasetEvidence: false as const,
      constructValidityMeansTraditionalCriterionBinding: false as const,
      metricDefinitionMeansCalibration: false as const,
      metricValueMeansThreshold: false as const,
      metricValueMeansCriterionState: false as const,
      historicalArtifactMutated: false as const,
    }),
    researchNoteRef: RESEARCH_NOTE_REF,
    nextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition' as const,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134(
  value: SquareBroadNeutralShapeMetricRuntimeFR134V1,
): void {
  if (!ISSUED.has(value)) fail('runtime artifact was not issued by the active FR-134 metric boundary.');
}
