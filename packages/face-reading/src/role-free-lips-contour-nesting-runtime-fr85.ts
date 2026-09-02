import {
  assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84,
  reviewNeutralLipBandGeometryFeasibilityFR84,
} from './neutral-lip-band-geometry-feasibility-review-fr84.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
  type PoseNormalizedLipsPointFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface RoleFreeContourInputFR85V1 {
  readonly contourRef: string;
  readonly points: readonly PoseNormalizedLipsPointFR79V1[];
}

export type RoleFreeContourRelationStateFR85V1 =
  | 'strictly_nested'
  | 'disjoint_non_nested'
  | 'rejected_degenerate_cycle'
  | 'rejected_self_intersection'
  | 'rejected_mutual_intersection_or_touch'
  | 'rejected_boundary_ambiguity';

export interface RoleFreeContourCycleAssessmentFR85V1 {
  readonly contourRef: string;
  readonly pointCount: number;
  readonly finiteCoordinates: true;
  readonly zeroLengthEdgePresent: boolean;
  readonly nonzeroSignedArea: boolean;
  readonly selfIntersectionFree: boolean;
}

export interface RoleFreeGeometricContourRoleFR85V1 {
  readonly contourRef: string;
  readonly geometricRole: 'enclosing_cycle' | 'enclosed_cycle';
  readonly anatomicalRole: null;
  readonly traditionalRole: null;
}

export interface RoleFreeContourRelationComputationFR85V1 {
  readonly schemaVersion: 'fr85-role-free-contour-relation-computation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'pure_coordinate_geometry_predicate_only_not_anatomical_or_traditional';
  readonly numericPolicy: 'ieee754_double_exact_predicates_no_empirical_tolerance';
  readonly empiricalToleranceApplied: false;
  readonly calibrationThresholdApplied: false;
  readonly contourAssessments: readonly [
    RoleFreeContourCycleAssessmentFR85V1,
    RoleFreeContourCycleAssessmentFR85V1,
  ];
  readonly mutualBoundaryIntersectionOrTouch: boolean | null;
  readonly relationState: RoleFreeContourRelationStateFR85V1;
  readonly strictNestingValidated: boolean;
  readonly geometricRoles: readonly RoleFreeGeometricContourRoleFR85V1[];
  readonly geometricRolesIssued: 0 | 2;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourPointCorrespondenceIssued: false;
  readonly thicknessMetricIssued: false;
  readonly traditionalSemanticAuthority: false;
}

export interface GovernedRoleFreeLipsContourNestingFR85V1 {
  readonly schemaVersion: 'fr85-governed-role-free-lips-contour-nesting-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_role_free_per_sample_contour_relation_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly source: {
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly fr79ArtifactVersion: '0.1.0';
    readonly fr84SchemaVersion: 'fr84-neutral-lip-band-geometry-feasibility-review-v1';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly coordinateUnit: 'centimeter';
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly contourRefs: readonly [string, string];
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
  };
  readonly relation: RoleFreeContourRelationComputationFR85V1;
  readonly roleFreeGeometricRolesIssued: 0 | 2;
  readonly anatomicalRolesIssued: 0;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'role_free_contour_nesting_not_validated';
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
  ];
  readonly authorityBoundary: {
    readonly strictGeometricNestingMeansOuterInnerAnatomy: false;
    readonly enclosingCycleMeansOuterLip: false;
    readonly enclosedCycleMeansInnerLip: false;
    readonly crossContourDistanceMeansLipThickness: false;
    readonly geometricRoleMeansThicknessMetricAuthorized: false;
    readonly perSampleRoleMeansProviderComponentSemanticRole: false;
    readonly exactCoordinatePredicateMeansPhysicalAnthropometry: false;
    readonly roleFreeGeometryMeansTraditionalDuanHou: false;
    readonly relationStateMeansCriterionState: false;
  };
  readonly prohibitedShortcuts: readonly [
    'strict_nesting_to_anatomical_outer_inner',
    'enclosing_cycle_to_outer_lip',
    'enclosed_cycle_to_inner_lip',
    'per_sample_geometric_role_to_provider_component_semantic_role',
    'cross_contour_distance_to_lip_thickness',
    'nested_polygon_area_difference_to_traditional_thickness',
    'role_free_contour_relation_to_duan_hou_semantics',
    'role_free_contour_relation_to_lips_substantial_state',
    'coordinate_predicate_to_calibration_threshold',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly derivedContourRelationPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const POINT_KEYS = new Set(['x', 'y']);
const GOVERNED_ISSUED = new WeakSet<object>();

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
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'strict_nesting_to_anatomical_outer_inner',
  'enclosing_cycle_to_outer_lip',
  'enclosed_cycle_to_inner_lip',
  'per_sample_geometric_role_to_provider_component_semantic_role',
  'cross_contour_distance_to_lip_thickness',
  'nested_polygon_area_difference_to_traditional_thickness',
  'role_free_contour_relation_to_duan_hou_semantics',
  'role_free_contour_relation_to_lips_substantial_state',
  'coordinate_predicate_to_calibration_threshold',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-85 ${message}`);
}

function validatePoints(input: RoleFreeContourInputFR85V1): void {
  if (typeof input.contourRef !== 'string' || input.contourRef.length === 0) fail('contourRef must be non-empty.');
  if (!Array.isArray(input.points) || input.points.length < 3) fail(`${input.contourRef} must contain at least three points.`);
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

function samePoint(a: PoseNormalizedLipsPointFR79V1, b: PoseNormalizedLipsPointFR79V1): boolean {
  return a.x === b.x && a.y === b.y;
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

function signedAreaTwice(points: readonly PoseNormalizedLipsPointFR79V1[]): number {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    area += current.x * next.y - next.x * current.y;
  }
  return area;
}

function hasZeroLengthEdge(points: readonly PoseNormalizedLipsPointFR79V1[]): boolean {
  for (let index = 0; index < points.length; index += 1) {
    if (samePoint(points[index]!, points[(index + 1) % points.length]!)) return true;
  }
  return false;
}

function isSelfIntersectionFree(points: readonly PoseNormalizedLipsPointFR79V1[]): boolean {
  const count = points.length;
  for (let left = 0; left < count; left += 1) {
    const leftNext = (left + 1) % count;
    for (let right = left + 1; right < count; right += 1) {
      const rightNext = (right + 1) % count;
      const adjacent = left === right || leftNext === right || rightNext === left;
      if (adjacent) continue;
      if (segmentsIntersectOrTouch(points[left]!, points[leftNext]!, points[right]!, points[rightNext]!)) {
        return false;
      }
    }
  }
  return true;
}

function contoursIntersectOrTouch(
  left: readonly PoseNormalizedLipsPointFR79V1[],
  right: readonly PoseNormalizedLipsPointFR79V1[],
): boolean {
  for (let leftIndex = 0; leftIndex < left.length; leftIndex += 1) {
    const leftNext = (leftIndex + 1) % left.length;
    for (let rightIndex = 0; rightIndex < right.length; rightIndex += 1) {
      const rightNext = (rightIndex + 1) % right.length;
      if (segmentsIntersectOrTouch(left[leftIndex]!, left[leftNext]!, right[rightIndex]!, right[rightNext]!)) {
        return true;
      }
    }
  }
  return false;
}

type PointLocation = 'inside' | 'outside' | 'boundary';

function locatePointInPolygon(
  point: PoseNormalizedLipsPointFR79V1,
  polygon: readonly PoseNormalizedLipsPointFR79V1[],
): PointLocation {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const a = polygon[previous]!;
    const b = polygon[index]!;
    if (pointOnSegment(point, a, b)) return 'boundary';
    const crossesRay = (a.y > point.y) !== (b.y > point.y) &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;
    if (crossesRay) inside = !inside;
  }
  return inside ? 'inside' : 'outside';
}

function allStrictlyInside(
  candidate: readonly PoseNormalizedLipsPointFR79V1[],
  container: readonly PoseNormalizedLipsPointFR79V1[],
): boolean | null {
  for (const point of candidate) {
    const location = locatePointInPolygon(point, container);
    if (location === 'boundary') return null;
    if (location === 'outside') return false;
  }
  return true;
}

function assessCycle(input: RoleFreeContourInputFR85V1): RoleFreeContourCycleAssessmentFR85V1 {
  const zeroLengthEdgePresent = hasZeroLengthEdge(input.points);
  const nonzeroSignedArea = signedAreaTwice(input.points) !== 0;
  const selfIntersectionFree = !zeroLengthEdgePresent && nonzeroSignedArea && isSelfIntersectionFree(input.points);
  return Object.freeze({
    contourRef: input.contourRef,
    pointCount: input.points.length,
    finiteCoordinates: true as const,
    zeroLengthEdgePresent,
    nonzeroSignedArea,
    selfIntersectionFree,
  });
}

function emptyRoles(): readonly RoleFreeGeometricContourRoleFR85V1[] {
  return Object.freeze([]);
}

function resultWithState(
  assessments: readonly [RoleFreeContourCycleAssessmentFR85V1, RoleFreeContourCycleAssessmentFR85V1],
  relationState: RoleFreeContourRelationStateFR85V1,
  mutualBoundaryIntersectionOrTouch: boolean | null,
  roles: readonly RoleFreeGeometricContourRoleFR85V1[] = emptyRoles(),
): RoleFreeContourRelationComputationFR85V1 {
  const strictNestingValidated = relationState === 'strictly_nested';
  const geometricRolesIssued = strictNestingValidated ? 2 as const : 0 as const;
  return Object.freeze({
    schemaVersion: 'fr85-role-free-contour-relation-computation-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'pure_coordinate_geometry_predicate_only_not_anatomical_or_traditional' as const,
    numericPolicy: 'ieee754_double_exact_predicates_no_empirical_tolerance' as const,
    empiricalToleranceApplied: false as const,
    calibrationThresholdApplied: false as const,
    contourAssessments: assessments,
    mutualBoundaryIntersectionOrTouch,
    relationState,
    strictNestingValidated,
    geometricRoles: roles,
    geometricRolesIssued,
    anatomicalRolesIssued: 0 as const,
    crossContourPointCorrespondenceIssued: false as const,
    thicknessMetricIssued: false as const,
    traditionalSemanticAuthority: false as const,
  });
}

export function classifyRoleFreeClosedContourRelationFR85(
  left: RoleFreeContourInputFR85V1,
  right: RoleFreeContourInputFR85V1,
): RoleFreeContourRelationComputationFR85V1 {
  validatePoints(left);
  validatePoints(right);
  if (left.contourRef === right.contourRef) fail('the two contour references must be distinct.');

  const assessments = Object.freeze([assessCycle(left), assessCycle(right)] as const);
  if (assessments.some((item) => item.zeroLengthEdgePresent || !item.nonzeroSignedArea)) {
    return resultWithState(assessments, 'rejected_degenerate_cycle', null);
  }
  if (assessments.some((item) => !item.selfIntersectionFree)) {
    return resultWithState(assessments, 'rejected_self_intersection', null);
  }

  const mutualIntersection = contoursIntersectOrTouch(left.points, right.points);
  if (mutualIntersection) {
    return resultWithState(assessments, 'rejected_mutual_intersection_or_touch', true);
  }

  const leftInsideRight = allStrictlyInside(left.points, right.points);
  const rightInsideLeft = allStrictlyInside(right.points, left.points);
  if (leftInsideRight === null || rightInsideLeft === null) {
    return resultWithState(assessments, 'rejected_boundary_ambiguity', false);
  }

  if (leftInsideRight === true && rightInsideLeft === false) {
    const roles = Object.freeze([
      Object.freeze({
        contourRef: right.contourRef,
        geometricRole: 'enclosing_cycle' as const,
        anatomicalRole: null,
        traditionalRole: null,
      }),
      Object.freeze({
        contourRef: left.contourRef,
        geometricRole: 'enclosed_cycle' as const,
        anatomicalRole: null,
        traditionalRole: null,
      }),
    ] as const);
    return resultWithState(assessments, 'strictly_nested', false, roles);
  }

  if (rightInsideLeft === true && leftInsideRight === false) {
    const roles = Object.freeze([
      Object.freeze({
        contourRef: left.contourRef,
        geometricRole: 'enclosing_cycle' as const,
        anatomicalRole: null,
        traditionalRole: null,
      }),
      Object.freeze({
        contourRef: right.contourRef,
        geometricRole: 'enclosed_cycle' as const,
        anatomicalRole: null,
        traditionalRole: null,
      }),
    ] as const);
    return resultWithState(assessments, 'strictly_nested', false, roles);
  }

  if (leftInsideRight === false && rightInsideLeft === false) {
    return resultWithState(assessments, 'disjoint_non_nested', false);
  }

  return resultWithState(assessments, 'rejected_boundary_ambiguity', false);
}

function validateFR84Authority(): void {
  const review = reviewNeutralLipBandGeometryFeasibilityFR84();
  assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(review);
  if (
    review.authorityState !== 'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted' ||
    review.sourceGeometry.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    review.feasibilityReview.perSampleNestingRelationMathematicallyTestable !== true ||
    review.feasibilityReview.providerTopologyAloneAuthorizesNestingRelation !== false ||
    review.feasibilityReview.outerInnerAnatomicalRolesAuthorized !== false ||
    review.feasibilityReview.geometricEnclosingEnclosedRolesAuthorized !== false ||
    review.feasibilityReview.neutralThicknessLikeMetricDefinitionAdmitted !== false ||
    review.recommendedNextFrontier.frontierKey !== 'role_free_per_sample_contour_nesting_and_nonintersection_validation' ||
    review.recommendedNextFrontier.anatomicalRoleAssignmentAllowed !== false ||
    review.recommendedNextFrontier.thicknessMetricIssuanceAllowed !== false ||
    !review.newlyExposedPrerequisiteBlockers.includes('role_free_contour_nesting_not_validated') ||
    !review.newlyExposedPrerequisiteBlockers.includes('role_free_cross_contour_correspondence_not_defined')
  ) fail('FR-84 feasibility authority drift.');
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
    validatePoints({ contourRef: contour.contourRef, points: contour.geometry.boundary });
  }

  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.rawProviderDepthPersisted !== false ||
    source.provenance.derivedPoseNormalizedLipsGeometryPersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-79 non-persistence provenance to remain intact.');
}

export function evaluateIssuedPoseNormalizedLipsContourNestingFR85(
  source: PoseNormalizedLipsGeometryFR79V1,
): GovernedRoleFreeLipsContourNestingFR85V1 {
  validateFR84Authority();
  validateFR79Source(source);

  const relation = classifyRoleFreeClosedContourRelationFR85(
    { contourRef: source.contours[0]!.contourRef, points: source.contours[0]!.geometry.boundary },
    { contourRef: source.contours[1]!.contourRef, points: source.contours[1]!.geometry.boundary },
  );

  const result: GovernedRoleFreeLipsContourNestingFR85V1 = Object.freeze({
    schemaVersion: 'fr85-governed-role-free-lips-contour-nesting-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_role_free_per_sample_contour_relation_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    source: Object.freeze({
      fr79SchemaVersion: source.schemaVersion,
      fr79ArtifactVersion: source.artifactVersion,
      fr84SchemaVersion: 'fr84-neutral-lip-band-geometry-feasibility-review-v1' as const,
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
    relation,
    roleFreeGeometricRolesIssued: relation.geometricRolesIssued,
    anatomicalRolesIssued: 0 as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'role_free_contour_nesting_not_validated' as const,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      strictGeometricNestingMeansOuterInnerAnatomy: false as const,
      enclosingCycleMeansOuterLip: false as const,
      enclosedCycleMeansInnerLip: false as const,
      crossContourDistanceMeansLipThickness: false as const,
      geometricRoleMeansThicknessMetricAuthorized: false as const,
      perSampleRoleMeansProviderComponentSemanticRole: false as const,
      exactCoordinatePredicateMeansPhysicalAnthropometry: false as const,
      roleFreeGeometryMeansTraditionalDuanHou: false as const,
      relationStateMeansCriterionState: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      derivedContourRelationPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });

  GOVERNED_ISSUED.add(result);
  return result;
}

export function assertIssuedGovernedRoleFreeLipsContourNestingFR85(
  result: GovernedRoleFreeLipsContourNestingFR85V1,
): void {
  if (!GOVERNED_ISSUED.has(result)) fail('role-free lips contour relation was not issued by the active FR-85 boundary.');
  if (
    result.schemaVersion !== 'fr85-governed-role-free-lips-contour-nesting-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.authorityState !== 'governed_role_free_per_sample_contour_relation_only' ||
    result.baseFR15ContractMutated !== false ||
    result.source.contourCount !== 2 ||
    result.source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    result.relation.anatomicalRolesIssued !== 0 ||
    result.relation.crossContourPointCorrespondenceIssued !== false ||
    result.relation.thicknessMetricIssued !== false ||
    result.roleFreeGeometricRolesIssued !== result.relation.geometricRolesIssued ||
    result.anatomicalRolesIssued !== 0 ||
    result.neutralMetricDefinitionsIssued !== 0 ||
    result.neutralMetricValuesIssued !== 0 ||
    result.morphologyProduced !== false ||
    result.criterionStatesIssued !== 0 ||
    result.claimsIssued !== 0 ||
    result.traditionalSemanticAuthority !== false ||
    result.resolvedProcessGap !== 'role_free_contour_nesting_not_validated' ||
    result.authorityBoundary.strictGeometricNestingMeansOuterInnerAnatomy !== false ||
    result.authorityBoundary.geometricRoleMeansThicknessMetricAuthorized !== false ||
    result.authorityBoundary.roleFreeGeometryMeansTraditionalDuanHou !== false
  ) fail('issued FR-85 authority boundary drift.');
  if (result.relation.relationState === 'strictly_nested') {
    if (
      result.relation.strictNestingValidated !== true ||
      result.relation.geometricRolesIssued !== 2 ||
      result.relation.geometricRoles.length !== 2 ||
      result.relation.geometricRoles[0]!.geometricRole !== 'enclosing_cycle' ||
      result.relation.geometricRoles[1]!.geometricRole !== 'enclosed_cycle' ||
      result.relation.geometricRoles.some((role) => role.anatomicalRole !== null || role.traditionalRole !== null)
    ) fail('strictly nested FR-85 output must contain exactly two role-free geometric roles.');
  } else if (
    result.relation.strictNestingValidated !== false ||
    result.relation.geometricRolesIssued !== 0 ||
    result.relation.geometricRoles.length !== 0
  ) fail('non-nested or rejected FR-85 output must fail-close geometric-role issuance.');
}
