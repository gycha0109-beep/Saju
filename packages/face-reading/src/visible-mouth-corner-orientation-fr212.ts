import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
  type PoseNormalizedLipsPointFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  computeMouthCornerElevationFR208,
  type MouthCornerElevationInputFR208V1,
  type NeutralObservableMetricFR208V1,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR212_CONTRACT_VERSION =
  'FR212-VISIBLE-MOUTH-CORNER-ORIENTATION-v1' as const;

export type FR212MouthCornerUnavailableReason =
  | 'left_horizontal_extremum_has_multiple_vertical_values'
  | 'right_horizontal_extremum_has_multiple_vertical_values'
  | 'mouth_horizontal_span_collapsed'
  | 'mouth_vertical_span_collapsed';

export type FR212MouthCornerDerivation =
  | Readonly<{
      status: 'available';
      input: MouthCornerElevationInputFR208V1;
    }>
  | Readonly<{
      status: 'unavailable';
      reason: FR212MouthCornerUnavailableReason;
      fallbackInvented: false;
    }>;

export type FR212MouthCornerOrientationResult =
  | Readonly<{
      schemaVersion: 'fr212-mouth-corner-orientation-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR212_CONTRACT_VERSION;
      authorityState: 'visible_mouth_contour_axis_candidate_only';
      status: 'available';
      metric: NeutralObservableMetricFR208V1;
      convention:
        'mean_visible_horizontal_extrema_elevation_relative_to_unordered_union_bounding_box_center';
      source: FR212SourceReceipt;
      authorityBoundary: FR212AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion: 'fr212-mouth-corner-orientation-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR212_CONTRACT_VERSION;
      authorityState: 'visible_mouth_contour_axis_candidate_only';
      status: 'unavailable';
      reason: FR212MouthCornerUnavailableReason;
      fallbackInvented: false;
      source: FR212SourceReceipt;
      authorityBoundary: FR212AuthorityBoundary;
    }>;

export interface FR212SourceReceipt {
  readonly fr79ProviderRunRef: string;
  readonly fr79CanonicalAssetDigest: string;
  readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
  readonly unorderedContourUnionConsumed: true;
  readonly providerComponentOrderUsedSemantically: false;
  readonly providerVertexIndexExposed: false;
}

export interface FR212AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly outerInnerLipRoleIssued: false;
  readonly cheilionAnatomicalClaimIssued: false;
  readonly lipThicknessOrFullnessIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const AUTHORITY_BOUNDARY: FR212AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  outerInnerLipRoleIssued: false as const,
  cheilionAnatomicalClaimIssued: false as const,
  lipThicknessOrFullnessIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-212 ${message}`);
}

function assertFR207MouthBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const mouth = inventory.entries.find((entry) => entry.regionKey === 'mouth_lips');
  if (
    mouth?.mayProceedWithoutNewAnatomicalResearch !== true ||
    mouth.currentReadiness !== 'existing_governed_neutral_metric' ||
    mouth.smallestMissingObservablePrimitives.includes('mouth_corner_orientation') !== true ||
    mouth.imageModelRequiredConstructs.includes('visible_lip_color') !== true ||
    mouth.currentlyUnavailableConstructs.includes('traditional_duan_component_of_duan_hou') !== true
  ) {
    fail('FR207 mouth/lips reuse boundary drift.');
  }
}

function assertPoints(points: readonly PoseNormalizedLipsPointFR79V1[]): void {
  if (points.length < 4) fail('unordered lips contour union requires at least four points.');
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`unordered lips contour point ${index} must contain finite x/y.`);
    }
  });
}

function uniqueYAtX(
  points: readonly PoseNormalizedLipsPointFR79V1[],
  x: number,
): number[] {
  return [...new Set(points.filter((point) => point.x === x).map((point) => point.y))];
}

export function deriveVisibleMouthCornerInputFR212(
  points: readonly PoseNormalizedLipsPointFR79V1[],
  sourceObservationRefs: readonly string[],
): FR212MouthCornerDerivation {
  assertPoints(points);
  const refs = sourceObservationRefs.map((ref) => ref.trim());
  if (refs.length === 0 || refs.some((ref) => ref.length === 0) || new Set(refs).size !== refs.length) {
    fail('sourceObservationRefs must be non-empty and unique.');
  }

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  if (!(maxX > minX)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'mouth_horizontal_span_collapsed' as const,
      fallbackInvented: false as const,
    });
  }
  if (!(maxY > minY)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'mouth_vertical_span_collapsed' as const,
      fallbackInvented: false as const,
    });
  }

  const leftYs = uniqueYAtX(points, minX);
  const rightYs = uniqueYAtX(points, maxX);
  if (leftYs.length !== 1) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'left_horizontal_extremum_has_multiple_vertical_values' as const,
      fallbackInvented: false as const,
    });
  }
  if (rightYs.length !== 1) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'right_horizontal_extremum_has_multiple_vertical_values' as const,
      fallbackInvented: false as const,
    });
  }

  return Object.freeze({
    status: 'available' as const,
    input: Object.freeze({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      leftCorner: Object.freeze({ x: minX, y: leftYs[0]! }),
      rightCorner: Object.freeze({ x: maxX, y: rightYs[0]! }),
      visibleMouthCenter: Object.freeze({
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
      }),
      sourceObservationRefs: Object.freeze([...refs]),
    }),
  });
}

function sourceReceipt(lips: PoseNormalizedLipsGeometryFR79V1): FR212SourceReceipt {
  return Object.freeze({
    fr79ProviderRunRef: lips.provenance.providerRunRef,
    fr79CanonicalAssetDigest: lips.provenance.canonicalAssetDigest,
    fr79ProjectionRuleRef: lips.projectionRule.projectionRuleRef,
    unorderedContourUnionConsumed: true as const,
    providerComponentOrderUsedSemantically: false as const,
    providerVertexIndexExposed: false as const,
  });
}

export function computeVisibleMouthCornerOrientationFR212(
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR212MouthCornerOrientationResult {
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
    lips.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
    lips.authorityBoundary.providerComponentOrderSemanticUseAllowed !== false ||
    lips.authorityBoundary.providerVertexIndexOutputAllowed !== false ||
    lips.traditionalSemanticAuthority !== false
  ) {
    fail('requires the exact FR79 unordered pose-normalized lips geometry boundary.');
  }

  const points = lips.contours.flatMap((contour) =>
    contour.geometry.boundary.map((point) => Object.freeze({ x: point.x, y: point.y })),
  );
  const derivation = deriveVisibleMouthCornerInputFR212(points, [
    'fr79:unordered_lips_contour_union',
    'fr212:horizontal_extrema_role_invariant_visible_corner_candidates',
    'fr212:unordered_union_bounding_box_center',
  ]);
  const source = sourceReceipt(lips);

  if (derivation.status === 'unavailable') {
    return Object.freeze({
      schemaVersion: 'fr212-mouth-corner-orientation-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR212_CONTRACT_VERSION,
      authorityState: 'visible_mouth_contour_axis_candidate_only' as const,
      status: 'unavailable' as const,
      reason: derivation.reason,
      fallbackInvented: false as const,
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const computed = computeMouthCornerElevationFR208(derivation.input);
  if (
    computed.mean.metricRef !== 'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0' ||
    computed.mean.anatomicalInterpretationAllowed !== false
  ) {
    fail('FR208 mouth-corner output boundary drift.');
  }

  return Object.freeze({
    schemaVersion: 'fr212-mouth-corner-orientation-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR212_CONTRACT_VERSION,
    authorityState: 'visible_mouth_contour_axis_candidate_only' as const,
    status: 'available' as const,
    metric: computed.mean,
    convention:
      'mean_visible_horizontal_extrema_elevation_relative_to_unordered_union_bounding_box_center' as const,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

export function assertVisibleMouthCornerOrientationFR212(
  result: FR212MouthCornerOrientationResult,
): void {
  if (
    result.schemaVersion !== 'fr212-mouth-corner-orientation-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR212_CONTRACT_VERSION ||
    result.authorityState !== 'visible_mouth_contour_axis_candidate_only' ||
    result.source.unorderedContourUnionConsumed !== true ||
    result.source.providerComponentOrderUsedSemantically !== false ||
    result.source.providerVertexIndexExposed !== false
  ) {
    fail('result identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible mouth morphology.');
  }

  if (result.status === 'available') {
    if (
      result.metric.metricRef !== 'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0' ||
      result.metric.unit !== 'ratio' ||
      !Number.isFinite(result.metric.value) ||
      result.metric.classificationApplied !== false ||
      result.metric.thresholdApplied !== false ||
      result.metric.calibrationApplied !== false ||
      result.metric.traditionalBindingApplied !== false ||
      result.metric.anatomicalInterpretationAllowed !== false
    ) {
      fail('available mouth-corner metric boundary drift.');
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable mouth-corner result invented a fallback.');
  }
}
