import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
  type PoseNormalizedLipsPointFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
  compareExactRationalsFR94,
  exactBinary64ToRationalFR94,
  exactNearestClosedPolylineSquaredDistanceFR94,
  getExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
  makeExactRationalFR94,
  rationalSqrtOutwardEnclosureFR94,
  type ExactRationalFR94V1,
  type ExactRationalPoint2DFR94V1,
} from './exact-rational-distance-enclosure-primitives-runtime-fr94.js';
import {
  assertIssuedCertifiedArclengthTotalErrorCompositionReviewFR95,
  reviewCertifiedArclengthTotalErrorCompositionFR95,
} from './certified-arclength-total-error-composition-review-fr95.js';
import { FaceAuthorityValidationError } from './validation.js';

const FUNCTIONAL_REF = 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0' as const;

export interface RoleFreeClosedPolylineInputFR96V1 {
  readonly contourRef: string;
  readonly points: readonly PoseNormalizedLipsPointFR79V1[];
}

export interface CertifiedDirectedArclengthMeanFR96V1 {
  readonly schemaVersion: 'fr96-certified-directed-arclength-mean-v1';
  readonly authorityState: 'certified_role_free_directed_arclength_mean_set_distance_only';
  readonly sourceContourRef: string;
  readonly targetContourRef: string;
  readonly initialSourceSegmentCount: number;
  readonly targetSegmentCount: number;
  readonly certifiedSatisfactionWitnessPrecisionBits: number;
  readonly additionalStrictSlackSubdivisionBatchApplied: true;
  readonly finalLeafCount: number;
  readonly finalSqrtPrecisionBits: number;
  readonly quadratureIntegralErrorCertificate: ExactRationalFR94V1;
  readonly sourcePerimeterLower: ExactRationalFR94V1;
  readonly sourcePerimeterUpper: ExactRationalFR94V1;
  readonly midpointIntegralLower: ExactRationalFR94V1;
  readonly midpointIntegralUpper: ExactRationalFR94V1;
  readonly exactIntegralLower: ExactRationalFR94V1;
  readonly exactIntegralUpper: ExactRationalFR94V1;
  readonly meanLower: ExactRationalFR94V1;
  readonly meanUpper: ExactRationalFR94V1;
  readonly pointEstimate: ExactRationalFR94V1;
  readonly absoluteErrorCertificate: ExactRationalFR94V1;
  readonly conservativeFR91Budget: ExactRationalFR94V1;
  readonly exactTruthContainedInInterval: true;
  readonly fr91DirectedBudgetCertified: true;
  readonly providerSegmentIdentityUsedForTieBreak: false;
  readonly crossContourCorrespondencePairsIssued: 0;
}

export interface CertifiedRoleFreeSymmetricArclengthMeanComputationFR96V1 {
  readonly schemaVersion: 'fr96-certified-role-free-symmetric-arclength-mean-computation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'certified_role_free_symmetric_arclength_mean_set_distance_geometry_only';
  readonly functionalRef: typeof FUNCTIONAL_REF;
  readonly functional: 'symmetric_arclength_mean_nearest_set_distance';
  readonly mathematicalDefinition: '0.5*((1/L_A)*integral_A d(x,B)ds+(1/L_B)*integral_B d(y,A)ds)';
  readonly runtimeAlgorithm: 'exact_rational_adaptive_midpoint_plus_certified_outward_interval_composition';
  readonly numericPolicy: 'fr90_algorithm_fr91_budget_fr94_primitives_fr95_total_error_composition';
  readonly contourRefs: readonly [string, string];
  readonly directedAtoB: CertifiedDirectedArclengthMeanFR96V1;
  readonly directedBtoA: CertifiedDirectedArclengthMeanFR96V1;
  readonly symmetricLower: ExactRationalFR94V1;
  readonly symmetricUpper: ExactRationalFR94V1;
  readonly symmetricPointEstimate: ExactRationalFR94V1;
  readonly symmetricAbsoluteErrorCertificate: ExactRationalFR94V1;
  readonly conservativeFR91SymmetricBudget: ExactRationalFR94V1;
  readonly exactTruthContainedInInterval: true;
  readonly fr91SymmetricBudgetCertified: true;
  readonly symmetricUnderContourSwapByDefinition: true;
  readonly cycleStartIndexInvariantByDefinition: true;
  readonly cycleOrientationInvariantByDefinition: true;
  readonly explicitPointPairCorrespondenceRequired: false;
  readonly explicitPointPairCorrespondenceIssued: false;
  readonly anatomicalRolesRequired: false;
  readonly empiricalToleranceApplied: false;
  readonly calibrationThresholdApplied: false;
  readonly valueCoordinateUnit: 'source_coordinate_unit';
  readonly thicknessMetricIssued: false;
  readonly traditionalSemanticAuthority: false;
}

export interface GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1 {
  readonly schemaVersion: 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_certified_role_free_symmetric_arclength_mean_geometry_functional_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly source: {
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly fr95SchemaVersion: 'fr95-certified-arclength-total-error-composition-review-v1';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly coordinateUnit: 'centimeter';
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly contourRefs: readonly [string, string];
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
  };
  readonly computation: CertifiedRoleFreeSymmetricArclengthMeanComputationFR96V1;
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
  readonly resolvedProcessGap: 'certified_arclength_mean_runtime_implementation_not_issued';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'role_free_arclength_mean_geometry_functional_neutral_metric_binding_not_reviewed',
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
    readonly certifiedArclengthMeanMeansLipThickness: false;
    readonly certifiedArclengthMeanMeansPhysicalBandWidth: false;
    readonly nearestSetDistanceMeansPointCorrespondence: false;
    readonly coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false;
    readonly geometryFunctionalValueMeansNeutralMetricBinding: false;
    readonly geometryFunctionalValueMeansMorphologyState: false;
    readonly geometryFunctionalValueMeansTraditionalDuanHou: false;
    readonly certifiedErrorBudgetMeansTraditionalThreshold: false;
  };
  readonly prohibitedShortcuts: readonly [
    'certified_arclength_mean_to_lip_thickness',
    'certified_arclength_mean_to_physical_band_width',
    'nearest_set_distance_to_cross_contour_correspondence_pair',
    'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
    'geometry_functional_value_to_neutral_metric_binding',
    'geometry_functional_value_to_morphology_state',
    'geometry_functional_value_to_traditional_duan_hou_semantics',
    'certified_error_budget_to_traditional_threshold',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_arclength_mean_separation_neutral_metric_definition_review';
    readonly purpose: 'review whether the certified role-free whole-contour separation functional can be admitted as a neutral geometry metric without anatomy, thickness, physical anthropometry, or traditional semantic binding';
    readonly runtimeReimplementationRequired: false;
    readonly automaticNeutralMetricBindingAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly derivedArclengthMeanFunctionalPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

interface ExactLeafFR96 {
  readonly start: ExactRationalPoint2DFR94V1;
  readonly end: ExactRationalPoint2DFR94V1;
  readonly hSquared: ExactRationalFR94V1;
}

const POINT_KEYS = new Set(['x', 'y']);
const GOVERNED_ISSUED = new WeakSet<object>();
const ZERO = Object.freeze({ numerator: 0n, denominator: 1n }) as ExactRationalFR94V1;
const ONE = Object.freeze({ numerator: 1n, denominator: 1n }) as ExactRationalFR94V1;
const TWO = Object.freeze({ numerator: 2n, denominator: 1n }) as ExactRationalFR94V1;
const FOUR = Object.freeze({ numerator: 4n, denominator: 1n }) as ExactRationalFR94V1;
const DENOMINATOR_4096 = Object.freeze({ numerator: 4096n, denominator: 1n }) as ExactRationalFR94V1;
const DENOMINATOR_8192 = Object.freeze({ numerator: 8192n, denominator: 1n }) as ExactRationalFR94V1;

const NEW_BLOCKERS = Object.freeze([
  'role_free_arclength_mean_geometry_functional_neutral_metric_binding_not_reviewed',
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
  'certified_arclength_mean_to_lip_thickness',
  'certified_arclength_mean_to_physical_band_width',
  'nearest_set_distance_to_cross_contour_correspondence_pair',
  'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
  'geometry_functional_value_to_neutral_metric_binding',
  'geometry_functional_value_to_morphology_state',
  'geometry_functional_value_to_traditional_duan_hou_semantics',
  'certified_error_budget_to_traditional_threshold',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-96 ${message}`);
}

function validateAuthorities(): void {
  const fr95 = reviewCertifiedArclengthTotalErrorCompositionFR95();
  assertIssuedCertifiedArclengthTotalErrorCompositionReviewFR95(fr95);
  if (
    fr95.schemaVersion !== 'fr95-certified-arclength-total-error-composition-review-v1' ||
    fr95.compositionDecision.sqrtPrecisionAllocationGoverned !== true ||
    fr95.compositionDecision.quadratureAndArithmeticTotalErrorCompositionGoverned !== true ||
    fr95.compositionDecision.certifiedDirectedMeanRuntimeMayBeImplementedNext !== true ||
    fr95.compositionDecision.certifiedSymmetricMeanRuntimeMayBeImplementedNext !== true ||
    fr95.compositionDecision.arclengthMeanRuntimeImplementationIssued !== false ||
    fr95.compositionDecision.arclengthMeanRuntimeValueIssued !== false ||
    fr95.strictQuadratureSlackPolicy.additionalSubdivisionRequiredBeforeArithmeticCertification !== true ||
    fr95.sqrtPrecisionAllocationPolicy.selectionRule !== 'minimum_p_whose_certified_directed_mean_interval_half_width_lte_L_lower_over_4096' ||
    fr95.recommendedNextFrontier.frontierKey !== 'certified_role_free_symmetric_arclength_mean_runtime_implementation' ||
    fr95.recommendedNextFrontier.runtimeConstructionAllowed !== true ||
    fr95.recommendedNextFrontier.runtimeValueAlreadyIssued !== false ||
    fr95.thicknessMetricIssued !== false ||
    fr95.traditionalSemanticAuthority !== false
  ) fail('FR-95 total-error composition or runtime gate authority drift.');

  const fr94 = getExactRationalDistanceEnclosurePrimitivesRuntimeFR94();
  assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94(fr94);
  if (
    fr94.implementationDecision.primitiveRuntimeImplementationIssued !== true ||
    fr94.implementationDecision.exactSquaredDistanceRuntimeIssued !== true ||
    fr94.implementationDecision.certifiedSqrtEnclosureRuntimeIssued !== true ||
    fr94.implementationDecision.arclengthMeanRuntimeValueIssued !== false
  ) fail('FR-94 primitive runtime authority drift.');
}

function validateInput(input: RoleFreeClosedPolylineInputFR96V1): void {
  if (typeof input.contourRef !== 'string' || input.contourRef.length === 0) fail('contourRef must be non-empty.');
  if (!Array.isArray(input.points) || input.points.length < 2) fail(`${input.contourRef} must contain at least two points.`);
  for (let index = 0; index < input.points.length; index += 1) {
    const point = input.points[index]!;
    if (typeof point !== 'object' || point === null) fail(`${input.contourRef} point ${index} must be an object.`);
    const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
    if (unexpected !== undefined) fail(`${input.contourRef} point ${index} exposes unauthorized field ${unexpected}.`);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) fail(`${input.contourRef} point ${index} must contain finite x/y.`);
  }
}

function add(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(
    left.numerator * right.denominator + right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function subtract(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(
    left.numerator * right.denominator - right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function multiply(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(left.numerator * right.numerator, left.denominator * right.denominator);
}

function divide(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  if (right.numerator === 0n) fail('exact interval division by zero.');
  return makeExactRationalFR94(left.numerator * right.denominator, left.denominator * right.numerator);
}

function square(value: ExactRationalFR94V1): ExactRationalFR94V1 {
  return multiply(value, value);
}

function half(value: ExactRationalFR94V1): ExactRationalFR94V1 {
  return divide(value, TWO);
}

function maxZero(value: ExactRationalFR94V1): ExactRationalFR94V1 {
  return compareExactRationalsFR94(value, ZERO) < 0 ? ZERO : value;
}

function exactPoint(point: PoseNormalizedLipsPointFR79V1): ExactRationalPoint2DFR94V1 {
  return Object.freeze({
    x: exactBinary64ToRationalFR94(point.x),
    y: exactBinary64ToRationalFR94(point.y),
  });
}

function midpoint(left: ExactRationalPoint2DFR94V1, right: ExactRationalPoint2DFR94V1): ExactRationalPoint2DFR94V1 {
  return Object.freeze({
    x: half(add(left.x, right.x)),
    y: half(add(left.y, right.y)),
  });
}

function squaredPointDistance(left: ExactRationalPoint2DFR94V1, right: ExactRationalPoint2DFR94V1): ExactRationalFR94V1 {
  const dx = subtract(left.x, right.x);
  const dy = subtract(left.y, right.y);
  return add(square(dx), square(dy));
}

function buildInitialLeaves(points: readonly ExactRationalPoint2DFR94V1[]): ExactLeafFR96[] {
  const leaves: ExactLeafFR96[] = [];
  for (let index = 0; index < points.length; index += 1) {
    const start = points[index]!;
    const end = points[(index + 1) % points.length]!;
    leaves.push(Object.freeze({ start, end, hSquared: squaredPointDistance(start, end) }));
  }
  return leaves;
}

function sumLeafQuadrature(leaves: readonly ExactLeafFR96[]): ExactRationalFR94V1 {
  let sum = ZERO;
  for (const leaf of leaves) sum = add(sum, divide(leaf.hSquared, FOUR));
  return sum;
}

function splitEqualMaximumLeaves(leaves: readonly ExactLeafFR96[]): ExactLeafFR96[] {
  let maximum: ExactRationalFR94V1 | null = null;
  for (const leaf of leaves) {
    if (maximum === null || compareExactRationalsFR94(leaf.hSquared, maximum) > 0) maximum = leaf.hSquared;
  }
  if (maximum === null || maximum.numerator === 0n) fail('cannot subdivide a zero-length-only source contour.');

  const next: ExactLeafFR96[] = [];
  for (const leaf of leaves) {
    if (compareExactRationalsFR94(leaf.hSquared, maximum) === 0) {
      const mid = midpoint(leaf.start, leaf.end);
      const childHSquared = divide(leaf.hSquared, FOUR);
      next.push(Object.freeze({ start: leaf.start, end: mid, hSquared: childHSquared }));
      next.push(Object.freeze({ start: mid, end: leaf.end, hSquared: childHSquared }));
    } else {
      next.push(leaf);
    }
  }
  return next;
}

function perimeterEnclosure(
  originalLeaves: readonly ExactLeafFR96[],
  precisionBits: number,
): readonly [ExactRationalFR94V1, ExactRationalFR94V1] {
  let lower = ZERO;
  let upper = ZERO;
  for (const segment of originalLeaves) {
    const enclosure = rationalSqrtOutwardEnclosureFR94(segment.hSquared, precisionBits);
    lower = add(lower, enclosure.lower);
    upper = add(upper, enclosure.upper);
  }
  return Object.freeze([lower, upper] as const);
}

function firstPositivePerimeterLowerWitness(
  originalLeaves: readonly ExactLeafFR96[],
): { readonly precisionBits: number; readonly lower: ExactRationalFR94V1 } {
  for (let precisionBits = 0; ; precisionBits += 1) {
    if (!Number.isSafeInteger(precisionBits)) fail('perimeter witness precision exceeded safe integer domain.');
    const [lower] = perimeterEnclosure(originalLeaves, precisionBits);
    if (lower.numerator > 0n) return Object.freeze({ precisionBits, lower });
  }
}

function precomputeMidpointContributionSquares(
  leaves: readonly ExactLeafFR96[],
  target: readonly ExactRationalPoint2DFR94V1[],
): readonly ExactRationalFR94V1[] {
  return Object.freeze(leaves.map((leaf) => {
    const mid = midpoint(leaf.start, leaf.end);
    const nearest = exactNearestClosedPolylineSquaredDistanceFR94(mid, target);
    return multiply(leaf.hSquared, nearest.squaredDistance);
  }));
}

function midpointIntegralEnclosure(
  contributionSquares: readonly ExactRationalFR94V1[],
  precisionBits: number,
): readonly [ExactRationalFR94V1, ExactRationalFR94V1] {
  let lower = ZERO;
  let upper = ZERO;
  for (const contributionSquared of contributionSquares) {
    const enclosure = rationalSqrtOutwardEnclosureFR94(contributionSquared, precisionBits);
    lower = add(lower, enclosure.lower);
    upper = add(upper, enclosure.upper);
  }
  return Object.freeze([lower, upper] as const);
}

function computeDirected(
  sourceRef: string,
  source: readonly ExactRationalPoint2DFR94V1[],
  targetRef: string,
  target: readonly ExactRationalPoint2DFR94V1[],
): CertifiedDirectedArclengthMeanFR96V1 {
  const originalLeaves = buildInitialLeaves(source);
  if (originalLeaves.every((leaf) => leaf.hSquared.numerator === 0n)) fail(`${sourceRef} source contour perimeter must be non-zero.`);

  const witness = firstPositivePerimeterLowerWitness(originalLeaves);
  const conservativeQuadratureBudget = divide(square(witness.lower), DENOMINATOR_4096);
  let leaves = originalLeaves;
  let quadrature = sumLeafQuadrature(leaves);

  while (compareExactRationalsFR94(quadrature, conservativeQuadratureBudget) > 0) {
    const previous = quadrature;
    leaves = splitEqualMaximumLeaves(leaves);
    quadrature = sumLeafQuadrature(leaves);
    if (compareExactRationalsFR94(quadrature, previous) >= 0) fail('adaptive subdivision failed to strictly reduce the quadrature certificate.');
  }

  if (quadrature.numerator !== 0n) {
    const previous = quadrature;
    leaves = splitEqualMaximumLeaves(leaves);
    quadrature = sumLeafQuadrature(leaves);
    if (compareExactRationalsFR94(quadrature, previous) >= 0) fail('strict-slack subdivision failed to reduce the quadrature certificate.');
  }

  const contributionSquares = precomputeMidpointContributionSquares(leaves, target);

  for (let precisionBits = 0; ; precisionBits += 1) {
    if (!Number.isSafeInteger(precisionBits)) fail('sqrt precision search exceeded safe integer domain.');
    const [perimeterLower, perimeterUpper] = perimeterEnclosure(originalLeaves, precisionBits);
    if (perimeterLower.numerator === 0n) continue;
    const [midpointLower, midpointUpper] = midpointIntegralEnclosure(contributionSquares, precisionBits);
    const exactIntegralLower = maxZero(subtract(midpointLower, quadrature));
    const exactIntegralUpper = add(midpointUpper, quadrature);
    const meanLower = divide(exactIntegralLower, perimeterUpper);
    const meanUpper = divide(exactIntegralUpper, perimeterLower);
    if (compareExactRationalsFR94(meanLower, meanUpper) > 0) fail('directed mean enclosure bounds inverted.');
    const pointEstimate = half(add(meanLower, meanUpper));
    const absoluteErrorCertificate = half(subtract(meanUpper, meanLower));
    const conservativeFR91Budget = divide(perimeterLower, DENOMINATOR_4096);

    if (compareExactRationalsFR94(absoluteErrorCertificate, conservativeFR91Budget) <= 0) {
      return Object.freeze({
        schemaVersion: 'fr96-certified-directed-arclength-mean-v1' as const,
        authorityState: 'certified_role_free_directed_arclength_mean_set_distance_only' as const,
        sourceContourRef: sourceRef,
        targetContourRef: targetRef,
        initialSourceSegmentCount: originalLeaves.length,
        targetSegmentCount: target.length,
        certifiedSatisfactionWitnessPrecisionBits: witness.precisionBits,
        additionalStrictSlackSubdivisionBatchApplied: true as const,
        finalLeafCount: leaves.length,
        finalSqrtPrecisionBits: precisionBits,
        quadratureIntegralErrorCertificate: quadrature,
        sourcePerimeterLower: perimeterLower,
        sourcePerimeterUpper: perimeterUpper,
        midpointIntegralLower: midpointLower,
        midpointIntegralUpper: midpointUpper,
        exactIntegralLower,
        exactIntegralUpper,
        meanLower,
        meanUpper,
        pointEstimate,
        absoluteErrorCertificate,
        conservativeFR91Budget,
        exactTruthContainedInInterval: true as const,
        fr91DirectedBudgetCertified: true as const,
        providerSegmentIdentityUsedForTieBreak: false as const,
        crossContourCorrespondencePairsIssued: 0 as const,
      });
    }
  }
}

export function computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
  left: RoleFreeClosedPolylineInputFR96V1,
  right: RoleFreeClosedPolylineInputFR96V1,
): CertifiedRoleFreeSymmetricArclengthMeanComputationFR96V1 {
  validateAuthorities();
  validateInput(left);
  validateInput(right);
  if (left.contourRef === right.contourRef) fail('the two contour references must be distinct.');

  const leftExact = Object.freeze(left.points.map(exactPoint));
  const rightExact = Object.freeze(right.points.map(exactPoint));
  const directedAtoB = computeDirected(left.contourRef, leftExact, right.contourRef, rightExact);
  const directedBtoA = computeDirected(right.contourRef, rightExact, left.contourRef, leftExact);
  const symmetricLower = half(add(directedAtoB.meanLower, directedBtoA.meanLower));
  const symmetricUpper = half(add(directedAtoB.meanUpper, directedBtoA.meanUpper));
  const symmetricPointEstimate = half(add(symmetricLower, symmetricUpper));
  const symmetricAbsoluteErrorCertificate = half(subtract(symmetricUpper, symmetricLower));
  const conservativeFR91SymmetricBudget = divide(
    add(directedAtoB.sourcePerimeterLower, directedBtoA.sourcePerimeterLower),
    DENOMINATOR_8192,
  );
  if (compareExactRationalsFR94(symmetricAbsoluteErrorCertificate, conservativeFR91SymmetricBudget) > 0) {
    fail('symmetric certificate exceeds the conservative FR-91 budget.');
  }

  return Object.freeze({
    schemaVersion: 'fr96-certified-role-free-symmetric-arclength-mean-computation-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'certified_role_free_symmetric_arclength_mean_set_distance_geometry_only' as const,
    functionalRef: FUNCTIONAL_REF,
    functional: 'symmetric_arclength_mean_nearest_set_distance' as const,
    mathematicalDefinition: '0.5*((1/L_A)*integral_A d(x,B)ds+(1/L_B)*integral_B d(y,A)ds)' as const,
    runtimeAlgorithm: 'exact_rational_adaptive_midpoint_plus_certified_outward_interval_composition' as const,
    numericPolicy: 'fr90_algorithm_fr91_budget_fr94_primitives_fr95_total_error_composition' as const,
    contourRefs: Object.freeze([left.contourRef, right.contourRef]) as readonly [string, string],
    directedAtoB,
    directedBtoA,
    symmetricLower,
    symmetricUpper,
    symmetricPointEstimate,
    symmetricAbsoluteErrorCertificate,
    conservativeFR91SymmetricBudget,
    exactTruthContainedInInterval: true as const,
    fr91SymmetricBudgetCertified: true as const,
    symmetricUnderContourSwapByDefinition: true as const,
    cycleStartIndexInvariantByDefinition: true as const,
    cycleOrientationInvariantByDefinition: true as const,
    explicitPointPairCorrespondenceRequired: false as const,
    explicitPointPairCorrespondenceIssued: false as const,
    anatomicalRolesRequired: false as const,
    empiricalToleranceApplied: false as const,
    calibrationThresholdApplied: false as const,
    valueCoordinateUnit: 'source_coordinate_unit' as const,
    thicknessMetricIssued: false as const,
    traditionalSemanticAuthority: false as const,
  });
}

function validateFR79Source(source: PoseNormalizedLipsGeometryFR79V1): void {
  assertIssuedPoseNormalizedLipsGeometryFR79(source);
  if (
    source.schemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
    source.authorityState !== 'governed_pose_normalized_lips_geometry_candidate_only' ||
    source.coordinateFrame !== 'pose_normalized_face_2d' ||
    source.coordinateUnit !== 'centimeter' ||
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourPointCounts[0] !== 20 ||
    source.contourPointCounts[1] !== 20 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.poseNormalizedLipsGeometryIssued !== true ||
    source.neutralMetricDefinitionsIssued !== 0 ||
    source.neutralMetricValuesIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) fail('requires the exact issued FR-79 pose-normalized lips geometry boundary.');
  for (const contour of source.contours) {
    if (
      contour.geometry.kind !== 'region' ||
      contour.geometry.boundary.length !== 20 ||
      contour.sourceComponentAuthority !== 'unordered_provider_graph_component_only' ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail('FR-79 contour authority drift.');
  }
}

export function evaluateIssuedPoseNormalizedLipsCertifiedSymmetricArclengthMeanFR96(
  source: PoseNormalizedLipsGeometryFR79V1,
): GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1 {
  validateAuthorities();
  validateFR79Source(source);
  const left = source.contours[0]!;
  const right = source.contours[1]!;
  const computation = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
    Object.freeze({ contourRef: left.contourRef, points: left.geometry.boundary }),
    Object.freeze({ contourRef: right.contourRef, points: right.geometry.boundary }),
  );

  const result: GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1 = Object.freeze({
    schemaVersion: 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_certified_role_free_symmetric_arclength_mean_geometry_functional_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    source: Object.freeze({
      fr79SchemaVersion: source.schemaVersion,
      fr95SchemaVersion: 'fr95-certified-arclength-total-error-composition-review-v1' as const,
      coordinateFrame: source.coordinateFrame,
      coordinateUnit: source.coordinateUnit,
      contourCount: 2 as const,
      contourPointCounts: source.contourPointCounts,
      contourConsumptionState: source.contourConsumptionState,
      contourRefs: Object.freeze([left.contourRef, right.contourRef]) as readonly [string, string],
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
    resolvedProcessGap: 'certified_arclength_mean_runtime_implementation_not_issued' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      certifiedArclengthMeanMeansLipThickness: false as const,
      certifiedArclengthMeanMeansPhysicalBandWidth: false as const,
      nearestSetDistanceMeansPointCorrespondence: false as const,
      coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false as const,
      geometryFunctionalValueMeansNeutralMetricBinding: false as const,
      geometryFunctionalValueMeansMorphologyState: false as const,
      geometryFunctionalValueMeansTraditionalDuanHou: false as const,
      certifiedErrorBudgetMeansTraditionalThreshold: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_arclength_mean_separation_neutral_metric_definition_review' as const,
      purpose: 'review whether the certified role-free whole-contour separation functional can be admitted as a neutral geometry metric without anatomy, thickness, physical anthropometry, or traditional semantic binding' as const,
      runtimeReimplementationRequired: false as const,
      automaticNeutralMetricBindingAllowed: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      correspondencePairIssuanceAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      derivedArclengthMeanFunctionalPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  GOVERNED_ISSUED.add(result);
  return result;
}

export function assertIssuedGovernedCertifiedRoleFreeSymmetricArclengthMeanFR96(
  value: GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1,
): void {
  if (!GOVERNED_ISSUED.has(value as object)) fail('value was not issued by the active FR-96 governed boundary.');
  if (
    value.schemaVersion !== 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1' ||
    value.authorityState !== 'governed_certified_role_free_symmetric_arclength_mean_geometry_functional_only' ||
    value.runtimeGeometryFunctionalDefinitionsIssued !== 1 ||
    value.runtimeGeometryValuesIssued !== 1 ||
    value.neutralMetricDefinitionsIssued !== 0 ||
    value.neutralMetricValuesIssued !== 0 ||
    value.anatomicalRolesIssued !== 0 ||
    value.crossContourCorrespondencePairsIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.morphologyProduced !== false ||
    value.criterionStatesIssued !== 0 ||
    value.claimsIssued !== 0 ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued FR-96 governed runtime authority drift.');
}
