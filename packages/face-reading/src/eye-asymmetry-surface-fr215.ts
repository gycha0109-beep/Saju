import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR215_CONTRACT_VERSION =
  'FR215-ROLE-INVARIANT-EYE-ASYMMETRY-SURFACE-v1' as const;

export interface FR215Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface FR215EyeCycleShape {
  readonly xSpan: number;
  readonly yToXSpanRatio: number;
  readonly meanClosedCycleTurningAngleRadian: number;
}

export interface FR215EyeAsymmetryAxes {
  readonly horizontalSpanRelativeDifference: number;
  readonly geometricYToXRatioAbsoluteDifference: number;
  readonly meanTurningAngleAbsoluteDifferenceRadian: number;
}

export interface FR215EyeAsymmetrySurface {
  readonly schemaVersion: 'fr215-eye-asymmetry-surface-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR215_CONTRACT_VERSION;
  readonly authorityState: 'unordered_pair_continuous_eye_asymmetry_axes_only';
  readonly source: {
    readonly fr77ProviderRunRef: string;
    readonly fr77CanonicalAssetDigest: string;
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly coordinateUnit: 'centimeter';
    readonly eyeTopologyWitnessRegionCount: 2;
    readonly eyeTopologyWitnessPointCounts: readonly [16, 16];
    readonly pairConsumedAsUnordered: true;
    readonly providerTopologySymbolsUsedAsSemanticSides: false;
    readonly anatomicalLateralityResolved: false;
  };
  readonly axes: {
    readonly horizontalSpanRelativeDifference: {
      readonly metricRef: 'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0';
      readonly value: number;
      readonly unit: 'ratio';
    };
    readonly geometricYToXRatioAbsoluteDifference: {
      readonly metricRef: 'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0';
      readonly value: number;
      readonly unit: 'ratio';
    };
    readonly meanTurningAngleAbsoluteDifference: {
      readonly metricRef: 'neutral.eye_pair.asymmetry.absolute_mean_turning_angle_difference@0.1.0';
      readonly value: number;
      readonly unit: 'radian';
    };
  };
  readonly invariance: {
    readonly eyeCycleSwapInvariant: true;
    readonly cycleStartInvariant: true;
    readonly cycleOrientationInvariant: true;
  };
  readonly authorityBoundary: {
    readonly observableMorphologyOnly: true;
    readonly anatomicalLateralityIssued: false;
    readonly sideIdentityIssued: false;
    readonly physiologicalEyeApertureIssued: false;
    readonly diagnosisIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly classifierIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const EYE_CYCLE_VERTEX_SETS: readonly (readonly number[])[] = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol])),
  ),
);

const AUTHORITY_BOUNDARY = Object.freeze({
  observableMorphologyOnly: true as const,
  anatomicalLateralityIssued: false as const,
  sideIdentityIssued: false as const,
  physiologicalEyeApertureIssued: false as const,
  diagnosisIssued: false as const,
  scoreIssued: false as const,
  rankIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-215 ${message}`);
}

function assertFR207EyeBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const eye = inventory.entries.find((entry) => entry.regionKey === 'eye_pair');
  if (
    eye?.mayProceedWithoutNewAnatomicalResearch !== true ||
    eye.smallestMissingObservablePrimitives.includes('product_individual_eye_asymmetry_surface') !== true ||
    eye.availableNeutralConstructs.includes('mean_eye_cycle_x_span_ratio') !== true ||
    eye.availableNeutralConstructs.includes('mean_eye_cycle_y_to_x_span_ratio') !== true ||
    eye.availableNeutralConstructs.includes('mean_eye_cycle_turning_angle') !== true
  ) {
    fail('FR207 Eye-Pair asymmetry reuse boundary drift.');
  }
}

function validateCycle(points: readonly FR215Point3D[], label: string): void {
  if (points.length !== 16) fail(`${label} requires exactly 16 closed-cycle points.`);
  points.forEach((point, index) => {
    if (![point.x, point.y, point.z].every(Number.isFinite)) {
      fail(`${label}[${index}] must contain finite x/y/z.`);
    }
    const next = points[(index + 1) % points.length]!;
    if (Math.hypot(next.x - point.x, next.y - point.y, next.z - point.z) <= 0) {
      fail(`${label} contains a degenerate adjacent segment at index ${index}.`);
    }
  });
}

export function computeEyeCycleShapeFR215(
  points: readonly FR215Point3D[],
): FR215EyeCycleShape {
  validateCycle(points, 'eye cycle');
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const xSpan = Math.max(...xs) - Math.min(...xs);
  const ySpan = Math.max(...ys) - Math.min(...ys);
  if (!Number.isFinite(xSpan) || xSpan <= 0) fail('eye cycle X span must be finite and positive.');
  if (!Number.isFinite(ySpan) || ySpan < 0) fail('eye cycle Y span must be finite and non-negative.');

  let turnSum = 0;
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length]!;
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const inVector = {
      x: current.x - previous.x,
      y: current.y - previous.y,
      z: current.z - previous.z,
    };
    const outVector = {
      x: next.x - current.x,
      y: next.y - current.y,
      z: next.z - current.z,
    };
    const inLength = Math.hypot(inVector.x, inVector.y, inVector.z);
    const outLength = Math.hypot(outVector.x, outVector.y, outVector.z);
    if (inLength <= 0 || outLength <= 0) {
      fail(`eye cycle has a degenerate local segment at index ${index}.`);
    }
    const cosine = Math.max(-1, Math.min(1,
      (inVector.x * outVector.x + inVector.y * outVector.y + inVector.z * outVector.z) /
      (inLength * outLength),
    ));
    const angle = Math.acos(cosine);
    if (!Number.isFinite(angle)) fail(`eye cycle turning angle is non-finite at index ${index}.`);
    turnSum += angle;
  }

  return Object.freeze({
    xSpan,
    yToXSpanRatio: ySpan / xSpan,
    meanClosedCycleTurningAngleRadian: turnSum / points.length,
  });
}

export function computeUnorderedEyeCycleAsymmetryFR215(
  first: readonly FR215Point3D[],
  second: readonly FR215Point3D[],
): FR215EyeAsymmetryAxes {
  const a = computeEyeCycleShapeFR215(first);
  const b = computeEyeCycleShapeFR215(second);
  const meanXSpan = (a.xSpan + b.xSpan) / 2;
  if (!Number.isFinite(meanXSpan) || meanXSpan <= 0) {
    fail('mean eye-cycle X span must be finite and positive.');
  }

  const result = Object.freeze({
    horizontalSpanRelativeDifference: Math.abs(a.xSpan - b.xSpan) / meanXSpan,
    geometricYToXRatioAbsoluteDifference: Math.abs(a.yToXSpanRatio - b.yToXSpanRatio),
    meanTurningAngleAbsoluteDifferenceRadian:
      Math.abs(a.meanClosedCycleTurningAngleRadian - b.meanClosedCycleTurningAngleRadian),
  });
  if (!Object.values(result).every(Number.isFinite)) {
    fail('computed eye asymmetry axes must all be finite.');
  }
  return result;
}

export function computeEyeAsymmetrySurfaceFR215(
  source: GovernedMetricGeometryCandidateFR77V1,
): FR215EyeAsymmetrySurface {
  assertFR207EyeBoundary();
  assertIssuedGovernedMetricGeometryFR77(source);

  if (
    source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    source.unit !== 'centimeter' ||
    source.metricLandmarks.length !== 468 ||
    source.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
    source.authorityBoundary.productionNeutralObservationIssued !== false ||
    source.authorityBoundary.traditionalSemanticAuthority !== false
  ) {
    fail('requires the exact FR77 governed metric-geometry authority boundary.');
  }
  if (
    EYE_CYCLE_VERTEX_SETS.length !== 2 ||
    EYE_CYCLE_VERTEX_SETS.some((cycle) => cycle.length !== 16)
  ) {
    fail('FR24 eye topology witness must remain exactly two 16-point closed cycles.');
  }

  const cycles = EYE_CYCLE_VERTEX_SETS.map((vertices, cycleIndex) =>
    Object.freeze(vertices.map((vertex) => {
      const point = source.metricLandmarks[vertex];
      if (point === undefined) fail(`FR77 geometry missing eye-cycle vertex ${vertex}.`);
      if (![point.x, point.y, point.z].every(Number.isFinite)) {
        fail(`FR77 eye-cycle vertex ${vertex} in cycle ${cycleIndex} must be finite.`);
      }
      return Object.freeze({ x: point.x, y: point.y, z: point.z });
    })),
  );
  const asymmetry = computeUnorderedEyeCycleAsymmetryFR215(cycles[0]!, cycles[1]!);

  const result: FR215EyeAsymmetrySurface = Object.freeze({
    schemaVersion: 'fr215-eye-asymmetry-surface-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR215_CONTRACT_VERSION,
    authorityState: 'unordered_pair_continuous_eye_asymmetry_axes_only' as const,
    source: Object.freeze({
      fr77ProviderRunRef: source.provider.providerRunRef,
      fr77CanonicalAssetDigest: source.provider.canonicalAssetDigest,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      coordinateUnit: 'centimeter' as const,
      eyeTopologyWitnessRegionCount: 2 as const,
      eyeTopologyWitnessPointCounts: Object.freeze([16, 16] as const),
      pairConsumedAsUnordered: true as const,
      providerTopologySymbolsUsedAsSemanticSides: false as const,
      anatomicalLateralityResolved: false as const,
    }),
    axes: Object.freeze({
      horizontalSpanRelativeDifference: Object.freeze({
        metricRef: 'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0' as const,
        value: asymmetry.horizontalSpanRelativeDifference,
        unit: 'ratio' as const,
      }),
      geometricYToXRatioAbsoluteDifference: Object.freeze({
        metricRef: 'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0' as const,
        value: asymmetry.geometricYToXRatioAbsoluteDifference,
        unit: 'ratio' as const,
      }),
      meanTurningAngleAbsoluteDifference: Object.freeze({
        metricRef: 'neutral.eye_pair.asymmetry.absolute_mean_turning_angle_difference@0.1.0' as const,
        value: asymmetry.meanTurningAngleAbsoluteDifferenceRadian,
        unit: 'radian' as const,
      }),
    }),
    invariance: Object.freeze({
      eyeCycleSwapInvariant: true as const,
      cycleStartInvariant: true as const,
      cycleOrientationInvariant: true as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertEyeAsymmetrySurfaceFR215(result);
  return result;
}

export function assertEyeAsymmetrySurfaceFR215(
  result: FR215EyeAsymmetrySurface,
): void {
  if (
    result.schemaVersion !== 'fr215-eye-asymmetry-surface-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR215_CONTRACT_VERSION ||
    result.authorityState !== 'unordered_pair_continuous_eye_asymmetry_axes_only' ||
    result.source.eyeTopologyWitnessRegionCount !== 2 ||
    result.source.eyeTopologyWitnessPointCounts[0] !== 16 ||
    result.source.eyeTopologyWitnessPointCounts[1] !== 16 ||
    result.source.pairConsumedAsUnordered !== true ||
    result.source.providerTopologySymbolsUsedAsSemanticSides !== false ||
    result.source.anatomicalLateralityResolved !== false ||
    result.invariance.eyeCycleSwapInvariant !== true ||
    result.invariance.cycleStartInvariant !== true ||
    result.invariance.cycleOrientationInvariant !== true
  ) {
    fail('surface identity/source/invariance boundary drift.');
  }

  const axes = [
    result.axes.horizontalSpanRelativeDifference,
    result.axes.geometricYToXRatioAbsoluteDifference,
    result.axes.meanTurningAngleAbsoluteDifference,
  ];
  if (axes.some((axis) => !Number.isFinite(axis.value) || axis.value < 0)) {
    fail('asymmetry axes must be finite and non-negative.');
  }
  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond unordered visible eye-pair asymmetry.');
  }
}
