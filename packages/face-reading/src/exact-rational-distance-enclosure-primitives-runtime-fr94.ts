import {
  assertIssuedExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93,
  reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93,
} from './exact-dyadic-rational-distance-enclosure-primitives-review-fr93.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface ExactRationalFR94V1 {
  readonly numerator: bigint;
  readonly denominator: bigint;
}

export interface ExactRationalPoint2DFR94V1 {
  readonly x: ExactRationalFR94V1;
  readonly y: ExactRationalFR94V1;
}

export interface ExactPointToSegmentSquaredDistanceFR94V1 {
  readonly schemaVersion: 'fr94-exact-point-to-segment-squared-distance-v1';
  readonly authorityState: 'exact_rational_squared_distance_primitive_only';
  readonly branch: 'degenerate_segment' | 'before_start' | 'after_end' | 'interior_projection';
  readonly squaredDistance: ExactRationalFR94V1;
  readonly sqrtApplied: false;
  readonly correspondencePairIssued: false;
}

export interface ExactNearestClosedPolylineSquaredDistanceFR94V1 {
  readonly schemaVersion: 'fr94-exact-nearest-closed-polyline-squared-distance-v1';
  readonly authorityState: 'exact_rational_nearest_squared_set_distance_primitive_only';
  readonly squaredDistance: ExactRationalFR94V1;
  readonly targetSegmentCount: number;
  readonly targetSegmentIdentityIssued: false;
  readonly correspondencePairIssued: false;
  readonly sqrtApplied: false;
}

export interface RationalSqrtOutwardEnclosureFR94V1 {
  readonly schemaVersion: 'fr94-rational-sqrt-outward-enclosure-v1';
  readonly authorityState: 'certified_dyadic_outward_sqrt_enclosure_primitive_only';
  readonly precisionBits: number;
  readonly lower: ExactRationalFR94V1;
  readonly upper: ExactRationalFR94V1;
  readonly width: ExactRationalFR94V1;
  readonly exact: boolean;
  readonly floatingPointSqrtUsed: false;
  readonly empiricalToleranceApplied: false;
}

export interface ExactRationalDistanceEnclosurePrimitivesRuntimeFR94V1 {
  readonly schemaVersion: 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'exact_rational_distance_enclosure_primitive_runtime_implemented_no_geometry_value_issued';
  readonly sourceAuthority: {
    readonly fr93SchemaVersion: 'fr93-exact-dyadic-rational-distance-enclosure-primitives-review-v1';
    readonly primitiveRuntimeConstructionAllowed: true;
    readonly arclengthMeanRuntimeConstructionAllowed: false;
    readonly runtimeGeometryValueIssuanceAllowedBeforeFR94: false;
  };
  readonly primitiveImplementations: {
    readonly binary64ToExactRational: true;
    readonly exactRationalPointToSegmentSquaredDistance: true;
    readonly exactNearestClosedPolylineSquaredDistance: true;
    readonly bigintFloorSqrt: true;
    readonly rationalSqrtOutwardEnclosure: true;
    readonly implementationCount: 5;
  };
  readonly implementationDecision: {
    readonly primitiveRuntimeImplementationIssued: true;
    readonly exactBinary64InputRecoveryIssued: true;
    readonly exactSquaredDistanceRuntimeIssued: true;
    readonly certifiedSqrtEnclosureRuntimeIssued: true;
    readonly arclengthMeanRuntimeAuthorized: false;
    readonly arclengthMeanRuntimeValueIssued: false;
    readonly runtimeGeometryFunctionalDefinitionsIssued: 0;
    readonly runtimeGeometryValuesIssued: 0;
  };
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
  readonly resolvedProcessGap: 'exact_rational_distance_enclosure_primitives_runtime_not_issued';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'certified_sqrt_enclosure_precision_allocation_not_governed',
    'certified_arclength_mean_total_error_composition_not_governed',
  ];
  readonly remainingBlockers: readonly [
    'certified_arclength_mean_runtime_implementation_not_issued',
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
    readonly exactBinary64RecoveryMeansOriginalPhysicalQuantityExact: false;
    readonly exactRationalSquaredDistanceMeansAnatomicalTruth: false;
    readonly nearestTargetSegmentMeansCorrespondencePair: false;
    readonly sqrtEnclosurePrecisionBitsMeanMorphologyThreshold: false;
    readonly certifiedDistanceEnclosureMeansLipThickness: false;
    readonly primitiveRuntimeMeansArclengthMeanMetric: false;
    readonly primitiveRuntimeMeansProductionMetricBinding: false;
    readonly primitiveRuntimeMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'binary64_exact_recovery_to_physical_measurement_exactness',
    'exact_rational_squared_distance_to_anatomical_role',
    'nearest_target_segment_to_cross_contour_correspondence_pair',
    'sqrt_precision_bits_to_morphology_threshold',
    'sqrt_precision_bits_to_traditional_threshold',
    'certified_distance_enclosure_to_lip_thickness',
    'primitive_runtime_to_arclength_mean_runtime_value',
    'primitive_runtime_to_neutral_metric_binding',
    'primitive_runtime_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'certified_sqrt_enclosure_precision_allocation_and_total_error_composition_review';
    readonly purpose: 'govern how primitive sqrt enclosure widths are allocated and composed with the FR90 quadrature certificate before any certified arclength-mean runtime value can be issued';
    readonly primitiveRuntimeReuseAllowed: true;
    readonly arclengthMeanRuntimeValueIssuanceAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const RUNTIME_ISSUED = new WeakSet<object>();

const NEW_BLOCKERS = Object.freeze([
  'certified_sqrt_enclosure_precision_allocation_not_governed',
  'certified_arclength_mean_total_error_composition_not_governed',
] as const);

const REMAINING_BLOCKERS = Object.freeze([
  'certified_arclength_mean_runtime_implementation_not_issued',
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
  'binary64_exact_recovery_to_physical_measurement_exactness',
  'exact_rational_squared_distance_to_anatomical_role',
  'nearest_target_segment_to_cross_contour_correspondence_pair',
  'sqrt_precision_bits_to_morphology_threshold',
  'sqrt_precision_bits_to_traditional_threshold',
  'certified_distance_enclosure_to_lip_thickness',
  'primitive_runtime_to_arclength_mean_runtime_value',
  'primitive_runtime_to_neutral_metric_binding',
  'primitive_runtime_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-94 ${message}`);
}

function validateFR93Authority(): void {
  const fr93 = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();
  assertIssuedExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93(fr93);
  if (
    fr93.schemaVersion !== 'fr93-exact-dyadic-rational-distance-enclosure-primitives-review-v1' ||
    fr93.authorityState !== 'exact_rational_distance_enclosure_primitive_algorithms_reviewed_no_runtime_primitive_issued' ||
    fr93.reviewDecision.binary64ExactConversionAlgorithmAdmitted !== true ||
    fr93.reviewDecision.exactRationalPointToSegmentSquaredDistanceAlgorithmAdmitted !== true ||
    fr93.reviewDecision.rationalSqrtOutwardEnclosureAlgorithmAdmitted !== true ||
    fr93.reviewDecision.primitiveRuntimeImplementationMayBeReviewedNext !== true ||
    fr93.reviewDecision.primitiveRuntimeImplementationIssued !== false ||
    fr93.reviewDecision.arclengthMeanRuntimeAuthorized !== false ||
    fr93.reviewDecision.runtimeValueIssued !== false ||
    fr93.recommendedNextFrontier.frontierKey !== 'exact_rational_distance_enclosure_primitives_runtime_implementation' ||
    fr93.recommendedNextFrontier.primitiveRuntimeConstructionAllowed !== true ||
    fr93.recommendedNextFrontier.arclengthMeanRuntimeConstructionAllowed !== false ||
    fr93.recommendedNextFrontier.runtimeGeometryValueIssuanceAllowed !== false ||
    !fr93.newlyExposedPrerequisiteBlockers.includes('exact_rational_distance_enclosure_primitives_runtime_not_issued') ||
    !fr93.newlyExposedPrerequisiteBlockers.includes('certified_sqrt_enclosure_precision_allocation_not_governed') ||
    !fr93.newlyExposedPrerequisiteBlockers.includes('certified_arclength_mean_total_error_composition_not_governed') ||
    fr93.thicknessMetricIssued !== false ||
    fr93.traditionalSemanticAuthority !== false
  ) fail('FR-93 primitive specification or runtime gate authority drift.');
}

function absBigInt(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function gcdBigInt(left: bigint, right: bigint): bigint {
  let a = absBigInt(left);
  let b = absBigInt(right);
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a;
}

export function makeExactRationalFR94(numerator: bigint, denominator: bigint = 1n): ExactRationalFR94V1 {
  validateFR93Authority();
  if (denominator === 0n) fail('rational denominator must be non-zero.');
  if (numerator === 0n) return Object.freeze({ numerator: 0n, denominator: 1n });
  const sign = denominator < 0n ? -1n : 1n;
  const signedNumerator = numerator * sign;
  const positiveDenominator = denominator * sign;
  const divisor = gcdBigInt(signedNumerator, positiveDenominator);
  return Object.freeze({
    numerator: signedNumerator / divisor,
    denominator: positiveDenominator / divisor,
  });
}

function rationalAdd(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(
    left.numerator * right.denominator + right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function rationalSubtract(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(
    left.numerator * right.denominator - right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function rationalMultiply(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(left.numerator * right.numerator, left.denominator * right.denominator);
}

function rationalDivide(left: ExactRationalFR94V1, right: ExactRationalFR94V1): ExactRationalFR94V1 {
  if (right.numerator === 0n) fail('rational division by zero.');
  return makeExactRationalFR94(left.numerator * right.denominator, left.denominator * right.numerator);
}

export function compareExactRationalsFR94(left: ExactRationalFR94V1, right: ExactRationalFR94V1): -1 | 0 | 1 {
  validateFR93Authority();
  const difference = left.numerator * right.denominator - right.numerator * left.denominator;
  return difference === 0n ? 0 : difference < 0n ? -1 : 1;
}

function rationalSquare(value: ExactRationalFR94V1): ExactRationalFR94V1 {
  return makeExactRationalFR94(value.numerator * value.numerator, value.denominator * value.denominator);
}

function squaredDistanceBetweenPoints(
  left: ExactRationalPoint2DFR94V1,
  right: ExactRationalPoint2DFR94V1,
): ExactRationalFR94V1 {
  const dx = rationalSubtract(left.x, right.x);
  const dy = rationalSubtract(left.y, right.y);
  return rationalAdd(rationalSquare(dx), rationalSquare(dy));
}

export function exactBinary64ToRationalFR94(value: number): ExactRationalFR94V1 {
  validateFR93Authority();
  if (!Number.isFinite(value)) fail('binary64 input must be finite.');
  if (Object.is(value, 0) || Object.is(value, -0)) return makeExactRationalFR94(0n);

  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  const bits = view.getBigUint64(0, false);
  const sign = (bits >> 63n) === 0n ? 1n : -1n;
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fraction = bits & ((1n << 52n) - 1n);

  let significand: bigint;
  let exponent: number;
  if (exponentBits === 0) {
    significand = fraction;
    exponent = -1074;
  } else {
    significand = (1n << 52n) + fraction;
    exponent = exponentBits - 1023 - 52;
  }

  if (significand === 0n) return makeExactRationalFR94(0n);
  if (exponent >= 0) {
    return makeExactRationalFR94(sign * (significand << BigInt(exponent)));
  }
  return makeExactRationalFR94(sign * significand, 1n << BigInt(-exponent));
}

export function exactRationalPointFromBinary64FR94(x: number, y: number): ExactRationalPoint2DFR94V1 {
  validateFR93Authority();
  return Object.freeze({
    x: exactBinary64ToRationalFR94(x),
    y: exactBinary64ToRationalFR94(y),
  });
}

export function exactRationalPointToSegmentSquaredDistanceFR94(
  point: ExactRationalPoint2DFR94V1,
  start: ExactRationalPoint2DFR94V1,
  end: ExactRationalPoint2DFR94V1,
): ExactPointToSegmentSquaredDistanceFR94V1 {
  validateFR93Authority();
  const dx = rationalSubtract(end.x, start.x);
  const dy = rationalSubtract(end.y, start.y);
  const px = rationalSubtract(point.x, start.x);
  const py = rationalSubtract(point.y, start.y);
  const len2 = rationalAdd(rationalSquare(dx), rationalSquare(dy));
  const dot = rationalAdd(rationalMultiply(px, dx), rationalMultiply(py, dy));

  let branch: ExactPointToSegmentSquaredDistanceFR94V1['branch'];
  let squaredDistance: ExactRationalFR94V1;

  if (len2.numerator === 0n) {
    branch = 'degenerate_segment';
    squaredDistance = squaredDistanceBetweenPoints(point, start);
  } else if (compareExactRationalsFR94(dot, makeExactRationalFR94(0n)) <= 0) {
    branch = 'before_start';
    squaredDistance = squaredDistanceBetweenPoints(point, start);
  } else if (compareExactRationalsFR94(dot, len2) >= 0) {
    branch = 'after_end';
    squaredDistance = squaredDistanceBetweenPoints(point, end);
  } else {
    branch = 'interior_projection';
    const norm2 = rationalAdd(rationalSquare(px), rationalSquare(py));
    const projected = rationalDivide(rationalSquare(dot), len2);
    squaredDistance = rationalSubtract(norm2, projected);
  }

  if (squaredDistance.numerator < 0n) fail('exact squared distance must be non-negative.');

  return Object.freeze({
    schemaVersion: 'fr94-exact-point-to-segment-squared-distance-v1' as const,
    authorityState: 'exact_rational_squared_distance_primitive_only' as const,
    branch,
    squaredDistance,
    sqrtApplied: false as const,
    correspondencePairIssued: false as const,
  });
}

export function exactNearestClosedPolylineSquaredDistanceFR94(
  point: ExactRationalPoint2DFR94V1,
  targetClosedPolyline: readonly ExactRationalPoint2DFR94V1[],
): ExactNearestClosedPolylineSquaredDistanceFR94V1 {
  validateFR93Authority();
  if (!Array.isArray(targetClosedPolyline) || targetClosedPolyline.length === 0) {
    fail('target closed polyline must contain at least one point.');
  }

  let minimum: ExactRationalFR94V1 | null = null;
  for (let index = 0; index < targetClosedPolyline.length; index += 1) {
    const start = targetClosedPolyline[index]!;
    const end = targetClosedPolyline[(index + 1) % targetClosedPolyline.length]!;
    const candidate = exactRationalPointToSegmentSquaredDistanceFR94(point, start, end).squaredDistance;
    if (minimum === null || compareExactRationalsFR94(candidate, minimum) < 0) minimum = candidate;
  }
  if (minimum === null) fail('nearest squared distance computation produced no candidate.');

  return Object.freeze({
    schemaVersion: 'fr94-exact-nearest-closed-polyline-squared-distance-v1' as const,
    authorityState: 'exact_rational_nearest_squared_set_distance_primitive_only' as const,
    squaredDistance: minimum,
    targetSegmentCount: targetClosedPolyline.length,
    targetSegmentIdentityIssued: false as const,
    correspondencePairIssued: false as const,
    sqrtApplied: false as const,
  });
}

export function floorSqrtBigIntFR94(value: bigint): bigint {
  validateFR93Authority();
  if (value < 0n) fail('integer square root input must be non-negative.');
  if (value < 2n) return value;

  const bitLength = value.toString(2).length;
  let estimate = 1n << BigInt(Math.ceil(bitLength / 2));
  while (true) {
    const next = (estimate + value / estimate) >> 1n;
    if (next >= estimate) return estimate;
    estimate = next;
  }
}

export function rationalSqrtOutwardEnclosureFR94(
  value: ExactRationalFR94V1,
  precisionBits: number,
): RationalSqrtOutwardEnclosureFR94V1 {
  validateFR93Authority();
  if (value.numerator < 0n) fail('sqrt enclosure input must be non-negative.');
  if (!Number.isSafeInteger(precisionBits) || precisionBits < 0) {
    fail('sqrt enclosure precisionBits must be a non-negative safe integer.');
  }

  const denominatorPower = 1n << BigInt(precisionBits);
  const scale = 1n << BigInt(precisionBits * 2);
  const scaledNumerator = value.numerator * scale;
  const q = scaledNumerator / value.denominator;
  const m = floorSqrtBigIntFR94(q);
  const exact = m * m * value.denominator === scaledNumerator;
  const lower = makeExactRationalFR94(m, denominatorPower);
  const upper = exact ? lower : makeExactRationalFR94(m + 1n, denominatorPower);
  const width = rationalSubtract(upper, lower);

  return Object.freeze({
    schemaVersion: 'fr94-rational-sqrt-outward-enclosure-v1' as const,
    authorityState: 'certified_dyadic_outward_sqrt_enclosure_primitive_only' as const,
    precisionBits,
    lower,
    upper,
    width,
    exact,
    floatingPointSqrtUsed: false as const,
    empiricalToleranceApplied: false as const,
  });
}

export function getExactRationalDistanceEnclosurePrimitivesRuntimeFR94(): ExactRationalDistanceEnclosurePrimitivesRuntimeFR94V1 {
  validateFR93Authority();
  const result: ExactRationalDistanceEnclosurePrimitivesRuntimeFR94V1 = Object.freeze({
    schemaVersion: 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'exact_rational_distance_enclosure_primitive_runtime_implemented_no_geometry_value_issued' as const,
    sourceAuthority: Object.freeze({
      fr93SchemaVersion: 'fr93-exact-dyadic-rational-distance-enclosure-primitives-review-v1' as const,
      primitiveRuntimeConstructionAllowed: true as const,
      arclengthMeanRuntimeConstructionAllowed: false as const,
      runtimeGeometryValueIssuanceAllowedBeforeFR94: false as const,
    }),
    primitiveImplementations: Object.freeze({
      binary64ToExactRational: true as const,
      exactRationalPointToSegmentSquaredDistance: true as const,
      exactNearestClosedPolylineSquaredDistance: true as const,
      bigintFloorSqrt: true as const,
      rationalSqrtOutwardEnclosure: true as const,
      implementationCount: 5 as const,
    }),
    implementationDecision: Object.freeze({
      primitiveRuntimeImplementationIssued: true as const,
      exactBinary64InputRecoveryIssued: true as const,
      exactSquaredDistanceRuntimeIssued: true as const,
      certifiedSqrtEnclosureRuntimeIssued: true as const,
      arclengthMeanRuntimeAuthorized: false as const,
      arclengthMeanRuntimeValueIssued: false as const,
      runtimeGeometryFunctionalDefinitionsIssued: 0 as const,
      runtimeGeometryValuesIssued: 0 as const,
    }),
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
    resolvedProcessGap: 'exact_rational_distance_enclosure_primitives_runtime_not_issued' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      exactBinary64RecoveryMeansOriginalPhysicalQuantityExact: false as const,
      exactRationalSquaredDistanceMeansAnatomicalTruth: false as const,
      nearestTargetSegmentMeansCorrespondencePair: false as const,
      sqrtEnclosurePrecisionBitsMeanMorphologyThreshold: false as const,
      certifiedDistanceEnclosureMeansLipThickness: false as const,
      primitiveRuntimeMeansArclengthMeanMetric: false as const,
      primitiveRuntimeMeansProductionMetricBinding: false as const,
      primitiveRuntimeMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'certified_sqrt_enclosure_precision_allocation_and_total_error_composition_review' as const,
      purpose: 'govern how primitive sqrt enclosure widths are allocated and composed with the FR90 quadrature certificate before any certified arclength-mean runtime value can be issued' as const,
      primitiveRuntimeReuseAllowed: true as const,
      arclengthMeanRuntimeValueIssuanceAllowed: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      correspondencePairIssuanceAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
  });
  RUNTIME_ISSUED.add(result);
  return result;
}

export function assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94(
  value: ExactRationalDistanceEnclosurePrimitivesRuntimeFR94V1,
): void {
  if (!RUNTIME_ISSUED.has(value as object)) fail('value was not issued by the active FR-94 boundary.');
  if (
    value.schemaVersion !== 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1' ||
    value.authorityState !== 'exact_rational_distance_enclosure_primitive_runtime_implemented_no_geometry_value_issued' ||
    value.implementationDecision.primitiveRuntimeImplementationIssued !== true ||
    value.implementationDecision.arclengthMeanRuntimeAuthorized !== false ||
    value.implementationDecision.arclengthMeanRuntimeValueIssued !== false ||
    value.implementationDecision.runtimeGeometryValuesIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued FR-94 primitive runtime authority drift.');
}
