import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
  type PoseNormalizedLipsPointFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87,
  reviewRoleFreeSymmetricSetDistanceFeasibilityFR87,
} from './role-free-symmetric-set-distance-feasibility-review-fr87.js';
import { FaceAuthorityValidationError } from './validation.js';

const FUNCTIONAL_REF = 'fr88:role-free-minimum-set-separation@0.1.0' as const;

export interface RoleFreeClosedPolylineInputFR88V1 {
  readonly contourRef: string;
  readonly points: readonly PoseNormalizedLipsPointFR79V1[];
}

export interface RoleFreeMinimumSetSeparationComputationFR88V1 {
  readonly schemaVersion: 'fr88-role-free-minimum-set-separation-computation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'pure_coordinate_closed_polyline_minimum_separation_only';
  readonly functionalRef: typeof FUNCTIONAL_REF;
  readonly functional: 'minimum_set_separation';
  readonly mathematicalDefinition: 'inf_{a_in_A,b_in_B} euclidean_distance(a,b)';
  readonly runtimeAlgorithm: 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances';
  readonly numericPolicy: 'ieee754_double_deterministic_segment_pair_minimum_no_empirical_tolerance';
  readonly distanceKernel: 'euclidean_2d';
  readonly continuousPolylineInterpretation: true;
  readonly discreteVertexOnlyApproximationUsed: false;
  readonly contourRefs: readonly [string, string];
  readonly contourPointCounts: readonly [number, number];
  readonly segmentPairCount: number;
  readonly minimumSeparation: number;
  readonly valueCoordinateUnit: 'source_coordinate_unit';
  readonly valueIsZero: boolean;
  readonly symmetricUnderContourSwap: true;
  readonly cycleStartIndexInvariantByDefinition: true;
  readonly cycleOrientationInvariantByDefinition: true;
  readonly explicitPointPairCorrespondenceRequired: false;
  readonly explicitPointPairCorrespondenceIssued: false;
  readonly anatomicalRolesRequired: false;
  readonly anatomicalRolesIssued: 0;
  readonly empiricalToleranceApplied: false;
  readonly calibrationThresholdApplied: false;
  readonly thicknessMetricIssued: false;
  readonly traditionalSemanticAuthority: false;
}

export interface GovernedRoleFreeMinimumSetSeparationFR88V1 {
  readonly schemaVersion: 'fr88-governed-role-free-minimum-set-separation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_role_free_minimum_boundary_separation_geometry_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly source: {
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly fr79ArtifactVersion: '0.1.0';
    readonly fr87SchemaVersion: 'fr87-role-free-symmetric-set-distance-feasibility-review-v1';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly coordinateUnit: 'centimeter';
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly contourRefs: readonly [string, string];
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
  };
  readonly computation: RoleFreeMinimumSetSeparationComputationFR88V1;
  readonly runtimeGeometryFunctionalDefinitionsIssued: 1;
  readonly runtimeGeometryValuesIssued: 1;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'role_free_minimum_set_separation_runtime_not_implemented';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'role_free_representative_band_width_functional_not_reviewed',
  ];
  readonly remainingBlockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'outer_inner_lip_roles_not_authorized',
    'role_free_cross_contour_correspondence_not_defined',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
    'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
  ];
  readonly authorityBoundary: {
    readonly minimumSeparationMeansLipThickness: false;
    readonly minimumSeparationMeansRepresentativeBandWidth: false;
    readonly minimumSeparationMeansOuterInnerAnatomy: false;
    readonly coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false;
    readonly zeroSeparationMeansTraditionalState: false;
    readonly geometryFunctionalValueMeansNeutralMetricBinding: false;
    readonly geometryFunctionalValueMeansTraditionalDuanHou: false;
    readonly geometryFunctionalValueMeansLipsSubstantialCriterionState: false;
  };
  readonly prohibitedShortcuts: readonly [
    'minimum_set_separation_to_lip_thickness',
    'minimum_set_separation_to_representative_band_width',
    'minimum_set_separation_to_outer_inner_anatomy',
    'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
    'zero_minimum_separation_to_traditional_state',
    'runtime_geometry_value_to_neutral_metric_semantic_binding',
    'runtime_geometry_value_to_traditional_duan_hou_semantics',
    'runtime_geometry_value_to_lips_substantial_state',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_representative_band_width_functionals_feasibility_review';
    readonly purpose: 'review correspondence-free symmetric whole-contour distance summaries without assigning thickness or traditional semantics';
    readonly minimumGapAloneSufficient: false;
    readonly correspondenceAssignmentAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly derivedMinimumSetSeparationPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const POINT_KEYS = new Set(['x', 'y']);
const GOVERNED_ISSUED = new WeakSet<object>();

const NEWLY_EXPOSED = Object.freeze([
  'role_free_representative_band_width_functional_not_reviewed',
] as const);

const REMAINING_BLOCKERS = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'outer_inner_lip_roles_not_authorized',
  'role_free_cross_contour_correspondence_not_defined',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
  'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'minimum_set_separation_to_lip_thickness',
  'minimum_set_separation_to_representative_band_width',
  'minimum_set_separation_to_outer_inner_anatomy',
  'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
  'zero_minimum_separation_to_traditional_state',
  'runtime_geometry_value_to_neutral_metric_semantic_binding',
  'runtime_geometry_value_to_traditional_duan_hou_semantics',
  'runtime_geometry_value_to_lips_substantial_state',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-88 ${message}`);
}

function validatePolyline(input: RoleFreeClosedPolylineInputFR88V1): void {
  if (typeof input.contourRef !== 'string' || input.contourRef.length === 0) fail('contourRef must be non-empty.');
  if (!Array.isArray(input.points) || input.points.length < 2) fail(`${input.contourRef} must contain at least two points.`);
  for (let index = 0; index < input.points.length; index += 1) {
    const point = input.points[index]!;
    if (typeof point !== 'object' || point === null) fail(`${input.contourRef} point ${index} must be an object.`);
    const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
    if (unexpected !== undefined) fail(`${input.contourRef} point ${index} exposes unauthorized field ${unexpected}.`);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`${input.contourRef} point ${index} must contain finite x/y.`);
    }
  }
}

function cross(
  a: PoseNormalizedLipsPointFR79V1,
  b: PoseNormalizedLipsPointFR79V1,
  c: PoseNormalizedLipsPointFR79V1,
): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function pointOnSegment(
  point: PoseNormalizedLipsPointFR79V1,
  a: PoseNormalizedLipsPointFR79V1,
  b: PoseNormalizedLipsPointFR79V1,
): boolean {
  if (cross(a, b, point) !== 0) return false;
  return point.x >= Math.min(a.x, b.x) &&
    point.x <= Math.max(a.x, b.x) &&
    point.y >= Math.min(a.y, b.y) &&
    point.y <= Math.max(a.y, b.y);
}

function orientationSign(
  a: PoseNormalizedLipsPointFR79V1,
  b: PoseNormalizedLipsPointFR79V1,
  c: PoseNormalizedLipsPointFR79V1,
): -1 | 0 | 1 {
  const value = cross(a, b, c);
  return value === 0 ? 0 : value > 0 ? 1 : -1;
}

function segmentsIntersectOrTouch(
  a1: PoseNormalizedLipsPointFR79V1,
  a2: PoseNormalizedLipsPointFR79V1,
  b1: PoseNormalizedLipsPointFR79V1,
  b2: PoseNormalizedLipsPointFR79V1,
): boolean {
  const o1 = orientationSign(a1, a2, b1);
  const o2 = orientationSign(a1, a2, b2);
  const o3 = orientationSign(b1, b2, a1);
  const o4 = orientationSign(b1, b2, a2);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && pointOnSegment(b1, a1, a2)) return true;
  if (o2 === 0 && pointOnSegment(b2, a1, a2)) return true;
  if (o3 === 0 && pointOnSegment(a1, b1, b2)) return true;
  if (o4 === 0 && pointOnSegment(a2, b1, b2)) return true;
  return false;
}

function squaredDistance(a: PoseNormalizedLipsPointFR79V1, b: PoseNormalizedLipsPointFR79V1): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function pointToSegmentDistance(
  point: PoseNormalizedLipsPointFR79V1,
  a: PoseNormalizedLipsPointFR79V1,
  b: PoseNormalizedLipsPointFR79V1,
): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.sqrt(squaredDistance(point, a));
  const projection = ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared;
  const t = Math.max(0, Math.min(1, projection));
  const closest = { x: a.x + t * dx, y: a.y + t * dy };
  return Math.sqrt(squaredDistance(point, closest));
}

function segmentDistance(
  a1: PoseNormalizedLipsPointFR79V1,
  a2: PoseNormalizedLipsPointFR79V1,
  b1: PoseNormalizedLipsPointFR79V1,
  b2: PoseNormalizedLipsPointFR79V1,
): number {
  if (segmentsIntersectOrTouch(a1, a2, b1, b2)) return 0;
  return Math.min(
    pointToSegmentDistance(a1, b1, b2),
    pointToSegmentDistance(a2, b1, b2),
    pointToSegmentDistance(b1, a1, a2),
    pointToSegmentDistance(b2, a1, a2),
  );
}

export function computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
  left: RoleFreeClosedPolylineInputFR88V1,
  right: RoleFreeClosedPolylineInputFR88V1,
): RoleFreeMinimumSetSeparationComputationFR88V1 {
  validatePolyline(left);
  validatePolyline(right);
  if (left.contourRef === right.contourRef) fail('the two contour references must be distinct.');

  let minimum = Number.POSITIVE_INFINITY;
  for (let leftIndex = 0; leftIndex < left.points.length; leftIndex += 1) {
    const leftNext = (leftIndex + 1) % left.points.length;
    for (let rightIndex = 0; rightIndex < right.points.length; rightIndex += 1) {
      const rightNext = (rightIndex + 1) % right.points.length;
      const distance = segmentDistance(
        left.points[leftIndex]!,
        left.points[leftNext]!,
        right.points[rightIndex]!,
        right.points[rightNext]!,
      );
      if (distance < minimum) minimum = distance;
    }
  }

  if (!Number.isFinite(minimum) || minimum < 0) fail('minimum segment-pair distance must be finite and non-negative.');

  return Object.freeze({
    schemaVersion: 'fr88-role-free-minimum-set-separation-computation-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'pure_coordinate_closed_polyline_minimum_separation_only' as const,
    functionalRef: FUNCTIONAL_REF,
    functional: 'minimum_set_separation' as const,
    mathematicalDefinition: 'inf_{a_in_A,b_in_B} euclidean_distance(a,b)' as const,
    runtimeAlgorithm: 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances' as const,
    numericPolicy: 'ieee754_double_deterministic_segment_pair_minimum_no_empirical_tolerance' as const,
    distanceKernel: 'euclidean_2d' as const,
    continuousPolylineInterpretation: true as const,
    discreteVertexOnlyApproximationUsed: false as const,
    contourRefs: Object.freeze([left.contourRef, right.contourRef]) as readonly [string, string],
    contourPointCounts: Object.freeze([left.points.length, right.points.length]) as readonly [number, number],
    segmentPairCount: left.points.length * right.points.length,
    minimumSeparation: minimum,
    valueCoordinateUnit: 'source_coordinate_unit' as const,
    valueIsZero: minimum === 0,
    symmetricUnderContourSwap: true as const,
    cycleStartIndexInvariantByDefinition: true as const,
    cycleOrientationInvariantByDefinition: true as const,
    explicitPointPairCorrespondenceRequired: false as const,
    explicitPointPairCorrespondenceIssued: false as const,
    anatomicalRolesRequired: false as const,
    anatomicalRolesIssued: 0 as const,
    empiricalToleranceApplied: false as const,
    calibrationThresholdApplied: false as const,
    thicknessMetricIssued: false as const,
    traditionalSemanticAuthority: false as const,
  });
}

function validateFR87Authority(): void {
  const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();
  assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(review);
  if (
    review.authorityState !== 'role_free_symmetric_set_distance_feasibility_review_completed_no_runtime_metric_issued' ||
    review.feasibilityDecision.preferredNextRuntimeFunctional !== 'minimum_set_separation' ||
    review.mathematicalDefinitions.minimumSetSeparation !== 'inf_{a_in_A,b_in_B} euclidean_distance(a,b)' ||
    review.mathematicalDefinitions.minimumSetSeparationFiniteAlgorithm !== 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances' ||
    review.recommendedNextFrontier.frontierKey !== 'role_free_minimum_set_separation_runtime' ||
    review.recommendedNextFrontier.requiresExplicitPointPairCorrespondence !== false ||
    review.recommendedNextFrontier.requiresAnatomicalRoles !== false ||
    review.recommendedNextFrontier.neutralMetricSemanticBindingAllowed !== false ||
    review.recommendedNextFrontier.thicknessSemanticAssignmentAllowed !== false ||
    review.recommendedNextFrontier.traditionalSemanticAssignmentAllowed !== false ||
    review.neutralMetricDefinitionsIssued !== 0 ||
    review.neutralMetricValuesIssued !== 0 ||
    review.thicknessMetricIssued !== false ||
    review.traditionalSemanticAuthority !== false ||
    !review.newlyExposedPrerequisiteBlockers.includes('role_free_minimum_set_separation_runtime_not_implemented')
  ) fail('FR-87 minimum-set-separation frontier authority drift.');
}

function validateFR79Source(source: PoseNormalizedLipsGeometryFR79V1): void {
  assertIssuedPoseNormalizedLipsGeometryFR79(source);
  if (
    source.schemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'governed_pose_normalized_lips_geometry_candidate_only' ||
    source.coordinateFrame !== 'pose_normalized_face_2d' ||
    source.coordinateUnit !== 'centimeter' ||
    source.poseCompensated !== true ||
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourPointCounts[0] !== 20 ||
    source.contourPointCounts[1] !== 20 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.fr15ConsumerSlotIssued !== false ||
    source.neutralMetricDefinitionsIssued !== 0 ||
    source.neutralMetricValuesIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false ||
    source.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
    source.authorityBoundary.providerComponentOrderSemanticUseAllowed !== false ||
    source.authorityBoundary.traditionalOperationalizationAllowed !== false ||
    !source.blockers.includes('outer_inner_lip_roles_not_authorized') ||
    !source.blockers.includes('five_officers_source_not_scan_checked')
  ) fail('requires the exact narrow FR-79 unordered pose-normalized lips geometry authority.');

  if (source.contours[0]!.contourRef === source.contours[1]!.contourRef) fail('FR-79 contour refs must remain distinct.');
  for (let contourIndex = 0; contourIndex < source.contours.length; contourIndex += 1) {
    const contour = source.contours[contourIndex]!;
    if (
      contour.geometry.kind !== 'region' ||
      contour.geometry.boundary.length !== 20 ||
      contour.sourceComponentAuthority !== 'unordered_provider_graph_component_only' ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail(`FR-79 contour ${contourIndex} geometry or semantic-role authority drift.`);
    validatePolyline({ contourRef: contour.contourRef, points: contour.geometry.boundary });
  }

  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.rawProviderDepthPersisted !== false ||
    source.provenance.derivedPoseNormalizedLipsGeometryPersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-79 non-persistence provenance to remain intact.');
}

export function evaluateIssuedPoseNormalizedLipsMinimumSetSeparationFR88(
  source: PoseNormalizedLipsGeometryFR79V1,
): GovernedRoleFreeMinimumSetSeparationFR88V1 {
  validateFR87Authority();
  validateFR79Source(source);

  const computation = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
    { contourRef: source.contours[0]!.contourRef, points: source.contours[0]!.geometry.boundary },
    { contourRef: source.contours[1]!.contourRef, points: source.contours[1]!.geometry.boundary },
  );

  const result: GovernedRoleFreeMinimumSetSeparationFR88V1 = Object.freeze({
    schemaVersion: 'fr88-governed-role-free-minimum-set-separation-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_role_free_minimum_boundary_separation_geometry_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    source: Object.freeze({
      fr79SchemaVersion: source.schemaVersion,
      fr79ArtifactVersion: source.artifactVersion,
      fr87SchemaVersion: 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' as const,
      coordinateFrame: source.coordinateFrame,
      coordinateUnit: source.coordinateUnit,
      contourCount: source.contourCount,
      contourPointCounts: source.contourPointCounts,
      contourConsumptionState: source.contourConsumptionState,
      contourRefs: Object.freeze([
        source.contours[0]!.contourRef,
        source.contours[1]!.contourRef,
      ]) as readonly [string, string],
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
    }),
    computation,
    runtimeGeometryFunctionalDefinitionsIssued: 1 as const,
    runtimeGeometryValuesIssued: 1 as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'role_free_minimum_set_separation_runtime_not_implemented' as const,
    newlyExposedPrerequisiteBlockers: NEWLY_EXPOSED,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      minimumSeparationMeansLipThickness: false as const,
      minimumSeparationMeansRepresentativeBandWidth: false as const,
      minimumSeparationMeansOuterInnerAnatomy: false as const,
      coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false as const,
      zeroSeparationMeansTraditionalState: false as const,
      geometryFunctionalValueMeansNeutralMetricBinding: false as const,
      geometryFunctionalValueMeansTraditionalDuanHou: false as const,
      geometryFunctionalValueMeansLipsSubstantialCriterionState: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_representative_band_width_functionals_feasibility_review' as const,
      purpose: 'review correspondence-free symmetric whole-contour distance summaries without assigning thickness or traditional semantics' as const,
      minimumGapAloneSufficient: false as const,
      correspondenceAssignmentAllowed: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      derivedMinimumSetSeparationPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });

  GOVERNED_ISSUED.add(result);
  return result;
}

export function assertIssuedGovernedRoleFreeMinimumSetSeparationFR88(
  result: GovernedRoleFreeMinimumSetSeparationFR88V1,
): void {
  if (!GOVERNED_ISSUED.has(result)) fail('minimum set separation was not issued by the active FR-88 boundary.');
  if (
    result.schemaVersion !== 'fr88-governed-role-free-minimum-set-separation-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.authorityState !== 'governed_role_free_minimum_boundary_separation_geometry_only' ||
    result.baseFR15ContractMutated !== false ||
    result.source.fr87SchemaVersion !== 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' ||
    result.source.coordinateFrame !== 'pose_normalized_face_2d' ||
    result.source.coordinateUnit !== 'centimeter' ||
    result.source.contourCount !== 2 ||
    result.source.contourPointCounts[0] !== 20 ||
    result.source.contourPointCounts[1] !== 20 ||
    result.source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    result.computation.functional !== 'minimum_set_separation' ||
    result.computation.runtimeAlgorithm !== 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances' ||
    result.computation.segmentPairCount !== 400 ||
    !Number.isFinite(result.computation.minimumSeparation) ||
    result.computation.minimumSeparation < 0 ||
    result.computation.discreteVertexOnlyApproximationUsed !== false ||
    result.computation.explicitPointPairCorrespondenceIssued !== false ||
    result.computation.anatomicalRolesIssued !== 0 ||
    result.computation.empiricalToleranceApplied !== false ||
    result.computation.calibrationThresholdApplied !== false ||
    result.computation.thicknessMetricIssued !== false ||
    result.runtimeGeometryFunctionalDefinitionsIssued !== 1 ||
    result.runtimeGeometryValuesIssued !== 1 ||
    result.neutralMetricDefinitionsIssued !== 0 ||
    result.neutralMetricValuesIssued !== 0 ||
    result.anatomicalRolesIssued !== 0 ||
    result.crossContourCorrespondencePairsIssued !== 0 ||
    result.thicknessMetricIssued !== false ||
    result.physicalAnthropometricInterpretationAuthorized !== false ||
    result.morphologyProduced !== false ||
    result.criterionStatesIssued !== 0 ||
    result.claimsIssued !== 0 ||
    result.traditionalSemanticAuthority !== false ||
    result.resolvedProcessGap !== 'role_free_minimum_set_separation_runtime_not_implemented' ||
    result.recommendedNextFrontier.minimumGapAloneSufficient !== false ||
    result.authorityBoundary.minimumSeparationMeansLipThickness !== false ||
    result.authorityBoundary.minimumSeparationMeansRepresentativeBandWidth !== false ||
    result.authorityBoundary.geometryFunctionalValueMeansTraditionalDuanHou !== false
  ) fail('issued FR-88 authority boundary drift.');
}