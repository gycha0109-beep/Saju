import {
  FR141_NEXT_FRONTIER,
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';
import { getSquareBroadNeutralShapeMetricDefinitionsFR134 } from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

const CORRESPONDENCE_KEY = 'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio' as const;
const CORRESPONDENCE_REF = `${CORRESPONDENCE_KEY}@0.1.0` as const;
const ORTHOGONALITY_KEY = 'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration' as const;
const ORTHOGONALITY_REF = `${ORTHOGONALITY_KEY}@0.1.0` as const;
const TURN_CONCENTRATION_KEY = 'neutral.mouth.contour_set.turning_angle_concentration_index' as const;
const TURN_CONCENTRATION_REF = `${TURN_CONCENTRATION_KEY}@0.1.0` as const;
const FR134_AXIS_REF = 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0' as const;
const FR134_TURN_REF = 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0' as const;

export const FR142_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr142-square-broad-fang-neutral-candidate-metric-runtime.md' as const;
export const FR142_NEXT_FRONTIER =
  'square_broad_fang_neutral_candidate_metric_repeatability_and_synthetic_geometry_discrimination_without_traditional_binding' as const;

export interface NeutralClosedCyclePointFR142V1 {
  readonly x: number;
  readonly y: number;
}

export interface SquareBroadFangNeutralCandidateKernelFR142V1 {
  readonly horizontalReflectionNearestSetResidualRatio: number;
  readonly orthogonalEdgeOrientationConcentration: number;
  readonly turningAngleConcentrationIndex: number;
}

export interface SquareBroadFangNeutralCandidateMetricDefinitionFR142V1 {
  readonly metricKey:
    | typeof CORRESPONDENCE_KEY
    | typeof ORTHOGONALITY_KEY
    | typeof TURN_CONCENTRATION_KEY;
  readonly metricVersion: '0.1.0';
  readonly metricRef:
    | typeof CORRESPONDENCE_REF
    | typeof ORTHOGONALITY_REF
    | typeof TURN_CONCENTRATION_REF;
  readonly candidateFamily:
    | 'structural_regularity_and_alignment'
    | 'rectilinear_segment_persistence_continuous_surrogate'
    | 'localized_corner_distinctness_supporting_later_commentary';
  readonly sourceSurfaceKey: 'neutral.face.lips_contour_set';
  readonly requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly unit: 'ratio';
  readonly formula: string;
  readonly componentAggregation: 'role_invariant_mean_over_both_closed_cycles';
  readonly cycleStartInvariant: true;
  readonly cycleDirectionInvariant: true;
  readonly providerComponentOrderInvariant: true;
  readonly outerInnerAnatomicalRoleRequired: false;
  readonly providerVertexIdentityRequired: false;
  readonly namedMouthCornerRequired: false;
  readonly numericClassificationThreshold: null;
  readonly traditionalCriterionBindingRef: null;
  readonly calibrationRef: null;
  readonly interpretationBoundary: string;
}

export interface SquareBroadFangNeutralCandidateMetricValueFR142V1 {
  readonly metricRef:
    | typeof CORRESPONDENCE_REF
    | typeof ORTHOGONALITY_REF
    | typeof TURN_CONCENTRATION_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly contributingClosedCycleCount: 2;
  readonly contributingElementCount: 40;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 {
  readonly schemaVersion: 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding';
  readonly predecessor: {
    readonly fr141AuthorityState: 'square_broad_fang_source_lineage_conflict_recorded_construct_hypotheses_refined_existing_metrics_reclassified_no_traditional_binding';
    readonly fr141NextFrontier: typeof FR141_NEXT_FRONTIER;
    readonly sourceLineageConflictPreserved: true;
    readonly fangEqualsSiziKouEstablished: false;
    readonly fourCornerFangLengIsPrimaryTargetDefinition: false;
    readonly humanSemanticCollectionAuthorized: false;
  };
  readonly source: {
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly surfaceKey: 'neutral.face.lips_contour_set';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly anatomicalRoleAssigned: false;
    readonly namedMouthCornerAssigned: false;
  };
  readonly metricDefinitions: readonly [
    SquareBroadFangNeutralCandidateMetricDefinitionFR142V1,
    SquareBroadFangNeutralCandidateMetricDefinitionFR142V1,
    SquareBroadFangNeutralCandidateMetricDefinitionFR142V1,
  ];
  readonly metricValues: readonly [
    SquareBroadFangNeutralCandidateMetricValueFR142V1,
    SquareBroadFangNeutralCandidateMetricValueFR142V1,
    SquareBroadFangNeutralCandidateMetricValueFR142V1,
  ];
  readonly designDecisions: {
    readonly upperLowerCorrespondenceOperationalizedAsGeometricHorizontalReflectionNotAnatomicalLipRole: true;
    readonly rectilinearPersistenceOperationalizedAsContinuousOrthogonalOrientationConcentrationSurrogate: true;
    readonly localizedCornerCandidateOperationalizedWithoutNamedCornerVertices: true;
    readonly arbitraryMetricCutoffIntroduced: false;
    readonly arbitraryFourCornerVertexSelectionIntroduced: false;
    readonly providerIndexSemanticUseIntroduced: false;
    readonly outerInnerRoleAssignmentIntroduced: false;
  };
  readonly execution: {
    readonly newNeutralMetricDefinitionsIssued: 3;
    readonly newNeutralMetricValuesIssued: 3;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly horizontalReflectionResidualMeansTraditionalFang: false;
    readonly orthogonalOrientationConcentrationMeansTraditionalFang: false;
    readonly turningConcentrationMeansTraditionalFang: false;
    readonly geometricUpperLowerMeansUpperLowerLipAnatomicalRole: false;
    readonly localizedDirectionChangeMeansNamedTraditionalMouthCorner: false;
    readonly continuousCandidateMetricMeansConstructValidity: false;
    readonly syntheticGeometryDiscriminationMeansConstructValidity: false;
    readonly metricDefinitionMeansCalibration: false;
    readonly metricValueMeansThreshold: false;
    readonly metricValueMeansCriterionState: false;
  };
  readonly researchNoteRef: typeof FR142_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR142_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
const POINT_KEYS = new Set(['x', 'y']);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-142 ${message}`);
}

function finitePoint(point: NeutralClosedCyclePointFR142V1, path: string): void {
  if (typeof point !== 'object' || point === null) fail(`${path} must be a point.`);
  const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
  if (unexpected !== undefined) fail(`${path} contains unauthorized field ${unexpected}.`);
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) fail(`${path} must contain finite x/y.`);
}

function validateCycleSet(
  contours: readonly (readonly NeutralClosedCyclePointFR142V1[])[],
): asserts contours is readonly [
  readonly NeutralClosedCyclePointFR142V1[],
  readonly NeutralClosedCyclePointFR142V1[],
] {
  if (contours.length !== 2) fail('kernel requires exactly two unordered closed cycles.');
  for (let contourIndex = 0; contourIndex < contours.length; contourIndex += 1) {
    const points = contours[contourIndex]!;
    if (points.length !== 20) fail(`cycle ${contourIndex} must contain exactly 20 points.`);
    for (let index = 0; index < points.length; index += 1) finitePoint(points[index]!, `cycle ${contourIndex} point ${index}`);
    for (let index = 0; index < points.length; index += 1) {
      const current = points[index]!;
      const next = points[(index + 1) % points.length]!;
      const length = Math.hypot(next.x - current.x, next.y - current.y);
      if (!Number.isFinite(length) || length <= 0) fail(`cycle ${contourIndex} edge ${index} must have finite positive length.`);
    }
  }
}

function horizontalReflectionResidual(points: readonly NeutralClosedCyclePointFR142V1[]): number {
  let centerX = 0;
  let centerY = 0;
  for (const point of points) {
    centerX += point.x;
    centerY += point.y;
  }
  centerX /= points.length;
  centerY /= points.length;

  let radiusSquaredSum = 0;
  for (const point of points) {
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    radiusSquaredSum += (dx * dx) + (dy * dy);
  }
  const rmsRadius = Math.sqrt(radiusSquaredSum / points.length);
  if (!Number.isFinite(rmsRadius) || rmsRadius <= 0) fail('horizontal-reflection normalization requires positive RMS radius.');

  let nearestDistanceSum = 0;
  for (const point of points) {
    const reflectedX = point.x;
    const reflectedY = (2 * centerY) - point.y;
    let nearest = Number.POSITIVE_INFINITY;
    for (const candidate of points) {
      const distance = Math.hypot(candidate.x - reflectedX, candidate.y - reflectedY);
      if (distance < nearest) nearest = distance;
    }
    if (!Number.isFinite(nearest)) fail('horizontal-reflection nearest-set distance is invalid.');
    nearestDistanceSum += nearest;
  }
  const ratio = (nearestDistanceSum / points.length) / rmsRadius;
  if (!Number.isFinite(ratio) || ratio < 0) fail('horizontal-reflection residual ratio is invalid.');
  return ratio;
}

function orthogonalOrientationConcentration(points: readonly NeutralClosedCyclePointFR142V1[]): number {
  let perimeter = 0;
  const edges: { readonly length: number; readonly angle: number }[] = [];
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    const length = Math.hypot(dx, dy);
    if (!Number.isFinite(length) || length <= 0) fail(`orthogonal-orientation edge ${index} is invalid.`);
    perimeter += length;
    edges.push({ length, angle: Math.atan2(dy, dx) });
  }
  if (!Number.isFinite(perimeter) || perimeter <= 0) fail('orthogonal-orientation concentration requires positive perimeter.');

  let real = 0;
  let imaginary = 0;
  for (const edge of edges) {
    const weight = edge.length / perimeter;
    real += weight * Math.cos(4 * edge.angle);
    imaginary += weight * Math.sin(4 * edge.angle);
  }
  const concentration = Math.hypot(real, imaginary);
  if (!Number.isFinite(concentration)) fail('orthogonal-orientation concentration is invalid.');
  return Math.max(0, Math.min(1, concentration));
}

function turningAngleConcentration(points: readonly NeutralClosedCyclePointFR142V1[]): number {
  const angles: number[] = [];
  let total = 0;
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length]!;
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const inX = current.x - previous.x;
    const inY = current.y - previous.y;
    const outX = next.x - current.x;
    const outY = next.y - current.y;
    const inLength = Math.hypot(inX, inY);
    const outLength = Math.hypot(outX, outY);
    if (!Number.isFinite(inLength) || inLength <= 0 || !Number.isFinite(outLength) || outLength <= 0) {
      fail(`turning-angle edge length is invalid at vertex ${index}.`);
    }
    const cosine = Math.max(-1, Math.min(1, ((inX * outX) + (inY * outY)) / (inLength * outLength)));
    const angle = Math.acos(cosine);
    if (!Number.isFinite(angle) || angle < 0) fail(`turning angle is invalid at vertex ${index}.`);
    angles.push(angle);
    total += angle;
  }
  if (!Number.isFinite(total) || total <= 0) fail('turning-angle concentration requires positive total direction change.');

  let squaredShareSum = 0;
  for (const angle of angles) {
    const share = angle / total;
    squaredShareSum += share * share;
  }
  const n = angles.length;
  const concentration = ((n * squaredShareSum) - 1) / (n - 1);
  if (!Number.isFinite(concentration)) fail('turning-angle concentration index is invalid.');
  return Math.max(0, Math.min(1, concentration));
}

export function computeSquareBroadFangNeutralCandidateKernelFR142(
  contours: readonly (readonly NeutralClosedCyclePointFR142V1[])[],
): SquareBroadFangNeutralCandidateKernelFR142V1 {
  validateCycleSet(contours);
  const correspondence = contours.map(horizontalReflectionResidual);
  const orthogonality = contours.map(orthogonalOrientationConcentration);
  const turnConcentration = contours.map(turningAngleConcentration);
  return Object.freeze({
    horizontalReflectionNearestSetResidualRatio: (correspondence[0]! + correspondence[1]!) / 2,
    orthogonalEdgeOrientationConcentration: (orthogonality[0]! + orthogonality[1]!) / 2,
    turningAngleConcentrationIndex: (turnConcentration[0]! + turnConcentration[1]!) / 2,
  });
}

function correspondenceDefinition(): SquareBroadFangNeutralCandidateMetricDefinitionFR142V1 {
  return Object.freeze({
    metricKey: CORRESPONDENCE_KEY,
    metricVersion: '0.1.0' as const,
    metricRef: CORRESPONDENCE_REF,
    candidateFamily: 'structural_regularity_and_alignment' as const,
    sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
    requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    unit: 'ratio' as const,
    formula: 'per_cycle_mean_nearest_distance(reflect_y_about_cycle_centroid,original_point_set)/cycle_rms_radius_then_mean_over_two_cycles' as const,
    componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
    cycleStartInvariant: true as const,
    cycleDirectionInvariant: true as const,
    providerComponentOrderInvariant: true as const,
    outerInnerAnatomicalRoleRequired: false as const,
    providerVertexIdentityRequired: false as const,
    namedMouthCornerRequired: false as const,
    numericClassificationThreshold: null,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'geometric_horizontal_reflection_correspondence_only_not_upper_lower_lip_role_not_traditional_fang' as const,
  });
}

function orthogonalityDefinition(): SquareBroadFangNeutralCandidateMetricDefinitionFR142V1 {
  return Object.freeze({
    metricKey: ORTHOGONALITY_KEY,
    metricVersion: '0.1.0' as const,
    metricRef: ORTHOGONALITY_REF,
    candidateFamily: 'rectilinear_segment_persistence_continuous_surrogate' as const,
    sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
    requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    unit: 'ratio' as const,
    formula: 'per_cycle_abs(length_weighted_mean(exp(i*4*edge_angle)))_then_mean_over_two_cycles' as const,
    componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
    cycleStartInvariant: true as const,
    cycleDirectionInvariant: true as const,
    providerComponentOrderInvariant: true as const,
    outerInnerAnatomicalRoleRequired: false as const,
    providerVertexIdentityRequired: false as const,
    namedMouthCornerRequired: false as const,
    numericClassificationThreshold: null,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'continuous_orthogonal_edge_orientation_concentration_surrogate_only_not_rectilinear_traditional_definition_not_traditional_fang' as const,
  });
}

function turnConcentrationDefinition(): SquareBroadFangNeutralCandidateMetricDefinitionFR142V1 {
  return Object.freeze({
    metricKey: TURN_CONCENTRATION_KEY,
    metricVersion: '0.1.0' as const,
    metricRef: TURN_CONCENTRATION_REF,
    candidateFamily: 'localized_corner_distinctness_supporting_later_commentary' as const,
    sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
    requiredGeometry: 'two_unordered_pose_normalized_20_point_closed_cycles' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    unit: 'ratio' as const,
    formula: 'per_cycle_normalized_Herfindahl_index_of_absolute_vertex_turning_angle_shares_then_mean_over_two_cycles' as const,
    componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
    cycleStartInvariant: true as const,
    cycleDirectionInvariant: true as const,
    providerComponentOrderInvariant: true as const,
    outerInnerAnatomicalRoleRequired: false as const,
    providerVertexIdentityRequired: false as const,
    namedMouthCornerRequired: false as const,
    numericClassificationThreshold: null,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'local_direction_change_concentration_only_no_four_vertex_selection_no_named_mouth_corners_not_traditional_fang' as const,
  });
}

export function getSquareBroadFangNeutralCandidateMetricDefinitionsFR142(): readonly [
  SquareBroadFangNeutralCandidateMetricDefinitionFR142V1,
  SquareBroadFangNeutralCandidateMetricDefinitionFR142V1,
  SquareBroadFangNeutralCandidateMetricDefinitionFR142V1,
] {
  return Object.freeze([correspondenceDefinition(), orthogonalityDefinition(), turnConcentrationDefinition()]);
}

function validatePredecessors(): void {
  const fr141 = assessSquareBroadFangSourceLineageConstructRefinementFR141();
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(fr141);
  if (
    fr141.nextFrontier !== FR141_NEXT_FRONTIER ||
    fr141.sourceLineageFindings.taxonomyConflictPresent !== true ||
    fr141.sourceLineageFindings.fangEqualsSiziKouEstablished !== false ||
    fr141.sourceLineageFindings.fourCornerFangLengIsPrimaryTargetDefinition !== false ||
    fr141.constructRefinement.upperLowerContourCorrespondenceCandidateRecommended !== true ||
    fr141.constructRefinement.localizedCornerGeometryCandidateRecommended !== true ||
    fr141.constructRefinement.rectilinearSegmentPersistenceCandidateRecommended !== true ||
    fr141.constructRefinement.directAspectRatioProxyForFangAuthorized !== false ||
    fr141.constructRefinement.directMouthWidthProxyForFangAuthorized !== false ||
    fr141.humanReviewTrack.humanSemanticCollectionAuthorized !== false ||
    fr141.execution.traditionalMetricBindingsIssued !== 0 ||
    fr141.execution.thresholdsIssued !== 0 ||
    fr141.execution.criterionStatesIssued !== 0
  ) fail('FR-141 predecessor or authority boundary drift.');

  const fr134 = getSquareBroadNeutralShapeMetricDefinitionsFR134();
  if (
    fr134.length !== 2 ||
    fr134[0]!.metricRef !== FR134_AXIS_REF ||
    fr134[1]!.metricRef !== FR134_TURN_REF ||
    fr134.some((definition) => definition.traditionalCriterionBindingRef !== null || definition.calibrationRef !== null)
  ) fail('FR-134 neutral metric predecessor drift.');
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
    source.authorityBoundary.providerVertexIndexOutputAllowed !== false ||
    source.traditionalSemanticAuthority !== false
  ) fail('requires exact issued FR-79 role-free pose-normalized lips geometry.');

  for (let contourIndex = 0; contourIndex < source.contours.length; contourIndex += 1) {
    const contour = source.contours[contourIndex]!;
    if (
      contour.geometry.kind !== 'region' ||
      contour.geometry.boundary.length !== 20 ||
      contour.sourceComponentAuthority !== 'unordered_provider_graph_component_only' ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail(`FR-79 contour ${contourIndex} role or geometry drift.`);
  }
}

export function computeSquareBroadFangNeutralCandidateMetricsFR142(
  source: PoseNormalizedLipsGeometryFR79V1,
): SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 {
  validatePredecessors();
  validateSource(source);
  const kernel = computeSquareBroadFangNeutralCandidateKernelFR142(
    source.contours.map((contour) => contour.geometry.boundary),
  );
  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  const values = Object.freeze([
    Object.freeze({
      metricRef: CORRESPONDENCE_REF,
      value: kernel.horizontalReflectionNearestSetResidualRatio,
      unit: 'ratio' as const,
      contributingClosedCycleCount: 2 as const,
      contributingElementCount: 40 as const,
      classificationApplied: false as const,
      calibrationApplied: false as const,
      traditionalBindingApplied: false as const,
    }),
    Object.freeze({
      metricRef: ORTHOGONALITY_REF,
      value: kernel.orthogonalEdgeOrientationConcentration,
      unit: 'ratio' as const,
      contributingClosedCycleCount: 2 as const,
      contributingElementCount: 40 as const,
      classificationApplied: false as const,
      calibrationApplied: false as const,
      traditionalBindingApplied: false as const,
    }),
    Object.freeze({
      metricRef: TURN_CONCENTRATION_REF,
      value: kernel.turningAngleConcentrationIndex,
      unit: 'ratio' as const,
      contributingClosedCycleCount: 2 as const,
      contributingElementCount: 40 as const,
      classificationApplied: false as const,
      calibrationApplied: false as const,
      traditionalBindingApplied: false as const,
    }),
  ] as const);

  const result: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 = Object.freeze({
    schemaVersion: 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding' as const,
    predecessor: Object.freeze({
      fr141AuthorityState: 'square_broad_fang_source_lineage_conflict_recorded_construct_hypotheses_refined_existing_metrics_reclassified_no_traditional_binding' as const,
      fr141NextFrontier: FR141_NEXT_FRONTIER,
      sourceLineageConflictPreserved: true as const,
      fangEqualsSiziKouEstablished: false as const,
      fourCornerFangLengIsPrimaryTargetDefinition: false as const,
      humanSemanticCollectionAuthorized: false as const,
    }),
    source: Object.freeze({
      fr79SchemaVersion: source.schemaVersion,
      surfaceKey: source.surfaceKey,
      coordinateFrame: source.coordinateFrame,
      contourCount: 2 as const,
      contourPointCounts: Object.freeze([20, 20] as const),
      contourConsumptionState: source.contourConsumptionState,
      anatomicalRoleAssigned: false as const,
      namedMouthCornerAssigned: false as const,
    }),
    metricDefinitions: definitions,
    metricValues: values,
    designDecisions: Object.freeze({
      upperLowerCorrespondenceOperationalizedAsGeometricHorizontalReflectionNotAnatomicalLipRole: true as const,
      rectilinearPersistenceOperationalizedAsContinuousOrthogonalOrientationConcentrationSurrogate: true as const,
      localizedCornerCandidateOperationalizedWithoutNamedCornerVertices: true as const,
      arbitraryMetricCutoffIntroduced: false as const,
      arbitraryFourCornerVertexSelectionIntroduced: false as const,
      providerIndexSemanticUseIntroduced: false as const,
      outerInnerRoleAssignmentIntroduced: false as const,
    }),
    execution: Object.freeze({
      newNeutralMetricDefinitionsIssued: 3 as const,
      newNeutralMetricValuesIssued: 3 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      horizontalReflectionResidualMeansTraditionalFang: false as const,
      orthogonalOrientationConcentrationMeansTraditionalFang: false as const,
      turningConcentrationMeansTraditionalFang: false as const,
      geometricUpperLowerMeansUpperLowerLipAnatomicalRole: false as const,
      localizedDirectionChangeMeansNamedTraditionalMouthCorner: false as const,
      continuousCandidateMetricMeansConstructValidity: false as const,
      syntheticGeometryDiscriminationMeansConstructValidity: false as const,
      metricDefinitionMeansCalibration: false as const,
      metricValueMeansThreshold: false as const,
      metricValueMeansCriterionState: false as const,
    }),
    researchNoteRef: FR142_RESEARCH_NOTE_REF,
    nextFrontier: FR142_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangNeutralCandidateMetricRuntimeFR142(
  value: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
): void {
  if (!ISSUED.has(value)) fail('runtime artifact was not issued by the active FR-142 runtime.');
}
