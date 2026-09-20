import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
  type PoseNormalizedLipsPointFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR214_CONTRACT_VERSION =
  'FR214-ROLE-FREE-MOUTH-OUTLINE-ANGULARITY-v1' as const;

const EPSILON = 1e-12;

export interface FR214ContourAngularities {
  readonly contourRef: string;
  readonly vertexCount: 20;
  readonly rmsAbsoluteTurningAngleDegrees: number;
}

export interface FR214MouthOutlineAngularityResult {
  readonly schemaVersion: 'fr214-mouth-outline-angularity-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR214_CONTRACT_VERSION;
  readonly authorityState: 'role_free_visible_mouth_outline_continuous_axis_only';
  readonly metric: {
    readonly metricRef: 'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0';
    readonly value: number;
    readonly unit: 'degree';
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
    readonly contourSwapInvariant: true;
    readonly cycleStartInvariant: true;
    readonly cycleOrientationInvariant: true;
    readonly classificationApplied: false;
    readonly thresholdApplied: false;
    readonly calibrationApplied: false;
    readonly traditionalBindingApplied: false;
    readonly anatomicalInterpretationAllowed: false;
  };
  readonly contourValues: readonly [FR214ContourAngularities, FR214ContourAngularities];
  readonly source: {
    readonly fr79ProviderRunRef: string;
    readonly fr79CanonicalAssetDigest: string;
    readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly providerComponentOrderUsedSemantically: false;
    readonly providerVertexIndexExposed: false;
  };
  readonly authorityBoundary: {
    readonly observableMorphologyOnly: true;
    readonly outerInnerLipRoleIssued: false;
    readonly cheilionOrStomionAnatomyIssued: false;
    readonly lipThicknessOrFullnessIssued: false;
    readonly squareMouthClassifierIssued: false;
    readonly fangDaTraditionalStateIssued: false;
    readonly duanHouTraditionalStateIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const AUTHORITY_BOUNDARY = Object.freeze({
  observableMorphologyOnly: true as const,
  outerInnerLipRoleIssued: false as const,
  cheilionOrStomionAnatomyIssued: false as const,
  lipThicknessOrFullnessIssued: false as const,
  squareMouthClassifierIssued: false as const,
  fangDaTraditionalStateIssued: false as const,
  duanHouTraditionalStateIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-214 ${message}`);
}

function assertFR207MouthBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const mouth = inventory.entries.find((entry) => entry.regionKey === 'mouth_lips');
  if (
    mouth?.mayProceedWithoutNewAnatomicalResearch !== true ||
    mouth.currentReadiness !== 'existing_governed_neutral_metric' ||
    mouth.smallestMissingObservablePrimitives.includes('mouth_outline_angularity_or_rectilinearity') !== true ||
    mouth.prohibitedShortcuts.includes('aspect_ratio_alone_to_fang_da') !== true ||
    mouth.prohibitedShortcuts.includes('contour_separation_to_duan_hou') !== true
  ) {
    fail('FR207 mouth/lips observable-geometry boundary drift.');
  }
}

function assertClosedContourPoints(
  points: readonly PoseNormalizedLipsPointFR79V1[],
  label: string,
): void {
  if (points.length !== 20) fail(`${label} requires exactly 20 governed contour points.`);
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`${label}[${index}] must contain finite x/y coordinates.`);
    }
    const next = points[(index + 1) % points.length]!;
    if (Math.hypot(next.x - point.x, next.y - point.y) <= EPSILON) {
      fail(`${label} contains a degenerate adjacent segment at index ${index}.`);
    }
  });
}

export function computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(
  points: readonly PoseNormalizedLipsPointFR79V1[],
): number {
  assertClosedContourPoints(points, 'closed mouth contour');

  const absoluteTurningAngles = points.map((current, index) => {
    const previous = points[(index - 1 + points.length) % points.length]!;
    const next = points[(index + 1) % points.length]!;
    const inX = current.x - previous.x;
    const inY = current.y - previous.y;
    const outX = next.x - current.x;
    const outY = next.y - current.y;
    const inLength = Math.hypot(inX, inY);
    const outLength = Math.hypot(outX, outY);
    if (inLength <= EPSILON || outLength <= EPSILON) {
      fail(`closed mouth contour has a degenerate local segment at index ${index}.`);
    }
    const cross = inX * outY - inY * outX;
    const dot = inX * outX + inY * outY;
    const angle = Math.abs(Math.atan2(cross, dot) * 180 / Math.PI);
    if (!Number.isFinite(angle)) fail(`closed mouth contour produced non-finite turning angle at index ${index}.`);
    return angle;
  });

  const meanSquared =
    absoluteTurningAngles.reduce((sum, angle) => sum + angle * angle, 0) /
    absoluteTurningAngles.length;
  const rms = Math.sqrt(meanSquared);
  if (!Number.isFinite(rms) || rms < 0 || rms > 180) {
    fail(`closed mouth contour RMS absolute turning angle is invalid: ${rms}.`);
  }
  return rms;
}

export function computeRoleFreeMouthOutlineAngularityFR214(
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR214MouthOutlineAngularityResult {
  assertFR207MouthBoundary();
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);

  if (
    lips.coordinateFrame !== 'pose_normalized_face_2d' ||
    lips.coordinateUnit !== 'centimeter' ||
    lips.poseCompensated !== true ||
    lips.contourCount !== 2 ||
    lips.contours.length !== 2 ||
    lips.contourPointCounts[0] !== 20 ||
    lips.contourPointCounts[1] !== 20 ||
    lips.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    lips.projectionRule.projectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    lips.projectionRule.formula !== 'x2d=x3d;y2d=y3d' ||
    lips.projectionRule.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
    lips.projectionRule.recenteringApplied !== false ||
    lips.projectionRule.rescalingApplied !== false ||
    lips.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
    lips.authorityBoundary.providerComponentOrderSemanticUseAllowed !== false ||
    lips.authorityBoundary.providerVertexIndexOutputAllowed !== false ||
    lips.traditionalSemanticAuthority !== false
  ) {
    fail('requires the exact FR79 unordered canonical-metric XY lips boundary.');
  }

  const contourValues = lips.contours.map((contour): FR214ContourAngularities =>
    Object.freeze({
      contourRef: contour.contourRef,
      vertexCount: 20 as const,
      rmsAbsoluteTurningAngleDegrees:
        computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(contour.geometry.boundary),
    }),
  ) as [FR214ContourAngularities, FR214ContourAngularities];

  // The final metric is symmetric under provider-contour swap.
  const value =
    (contourValues[0].rmsAbsoluteTurningAngleDegrees +
      contourValues[1].rmsAbsoluteTurningAngleDegrees) / 2;

  const result: FR214MouthOutlineAngularityResult = Object.freeze({
    schemaVersion: 'fr214-mouth-outline-angularity-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR214_CONTRACT_VERSION,
    authorityState: 'role_free_visible_mouth_outline_continuous_axis_only' as const,
    metric: Object.freeze({
      metricRef: 'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0' as const,
      value,
      unit: 'degree' as const,
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      contourSwapInvariant: true as const,
      cycleStartInvariant: true as const,
      cycleOrientationInvariant: true as const,
      classificationApplied: false as const,
      thresholdApplied: false as const,
      calibrationApplied: false as const,
      traditionalBindingApplied: false as const,
      anatomicalInterpretationAllowed: false as const,
    }),
    contourValues: Object.freeze(contourValues) as readonly [
      FR214ContourAngularities,
      FR214ContourAngularities,
    ],
    source: Object.freeze({
      fr79ProviderRunRef: lips.provenance.providerRunRef,
      fr79CanonicalAssetDigest: lips.provenance.canonicalAssetDigest,
      fr79ProjectionRuleRef: lips.projectionRule.projectionRuleRef,
      contourConsumptionState: 'unordered_set_no_outer_inner_role' as const,
      providerComponentOrderUsedSemantically: false as const,
      providerVertexIndexExposed: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertRoleFreeMouthOutlineAngularityFR214(result);
  return result;
}

export function assertRoleFreeMouthOutlineAngularityFR214(
  result: FR214MouthOutlineAngularityResult,
): void {
  if (
    result.schemaVersion !== 'fr214-mouth-outline-angularity-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR214_CONTRACT_VERSION ||
    result.authorityState !== 'role_free_visible_mouth_outline_continuous_axis_only' ||
    result.metric.metricRef !== 'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0' ||
    result.metric.unit !== 'degree' ||
    result.metric.coordinateFrame !== 'canonical_aligned_right_handed_metric_xy' ||
    !Number.isFinite(result.metric.value) ||
    result.metric.value < 0 ||
    result.metric.value > 180 ||
    result.metric.contourSwapInvariant !== true ||
    result.metric.cycleStartInvariant !== true ||
    result.metric.cycleOrientationInvariant !== true ||
    result.metric.classificationApplied !== false ||
    result.metric.thresholdApplied !== false ||
    result.metric.calibrationApplied !== false ||
    result.metric.traditionalBindingApplied !== false ||
    result.metric.anatomicalInterpretationAllowed !== false
  ) {
    fail('metric identity or neutral continuous-axis boundary drift.');
  }
  if (
    result.source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    result.source.providerComponentOrderUsedSemantically !== false ||
    result.source.providerVertexIndexExposed !== false
  ) {
    fail('source role-free boundary drift.');
  }
  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible mouth morphology.');
  }
}
