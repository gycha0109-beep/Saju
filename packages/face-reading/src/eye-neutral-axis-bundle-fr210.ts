import {
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158,
  computeRoleInvariantEyePairNeutralShapeMetricsFR158,
  type RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
} from './role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';
import {
  assertIssuedEyePairGeometricYSpanMetricsFR178,
  computeEyePairGeometricYSpanMetricsFR178,
  type EyePairGeometricYSpanMetricValueFR178V1,
} from './eye-pair-geometric-y-span-runtime-fr178.js';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import {
  computeEyeOuterCornerTiltFR208,
  type NeutralObservableMetricFR208V1,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  deriveEyeOuterCornerTiltInputFromMetricGeometryFR209,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR210_CONTRACT_VERSION =
  'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1' as const;

const X_SPAN_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;
const CENTROID_SEPARATION_REF =
  'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0' as const;
const TURNING_ANGLE_REF =
  'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0' as const;
const Y_TO_X_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;

export type FR210EyeAxisKey =
  | 'relative_horizontal_span'
  | 'geometric_vertical_to_horizontal_ratio'
  | 'centroid_separation'
  | 'closed_cycle_turning_angle'
  | 'outer_corner_tilt';

export interface FR210EyeAxis {
  readonly axisKey: FR210EyeAxisKey;
  readonly value: number;
  readonly unit: 'ratio' | 'radian' | 'degree';
  readonly sourceMetricRef: string;
  readonly semanticScope:
    | 'closed_cycle_geometry_only'
    | 'bilateral_visible_corner_geometry_only';
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly anatomicalInterpretationAllowed: false;
}

export interface FR210UnavailableEyeAxis {
  readonly axisKey: 'outer_corner_tilt';
  readonly status: 'unavailable';
  readonly reason: 'eye_cycle_extrema_ambiguous' | 'eye_cycles_not_bilateral_around_mesh_midline';
  readonly fallbackInvented: false;
}

export interface FR210EyeNeutralAxisBundle {
  readonly schemaVersion: 'fr210-eye-neutral-axis-bundle-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR210_CONTRACT_VERSION;
  readonly authorityState: 'reused_neutral_eye_geometry_axes_research_only';
  readonly source: {
    readonly fr77ProviderRunRef: string;
    readonly fr77CanonicalAssetDigest: string;
    readonly fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1';
    readonly fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1';
    readonly fr209DerivationAttempted: true;
    readonly fr207MayProceedWithoutNewAnatomicalResearch: true;
  };
  readonly axes: {
    readonly relativeHorizontalSpan: FR210EyeAxis;
    readonly geometricVerticalToHorizontalRatio: FR210EyeAxis;
    readonly centroidSeparation: FR210EyeAxis;
    readonly closedCycleTurningAngle: FR210EyeAxis;
    readonly outerCornerTilt: FR210EyeAxis | FR210UnavailableEyeAxis;
  };
  readonly unsupportedImageTraits: readonly [
    'eyelid_crease_category',
    'hooded_eyelid_category',
    'ocular_radiance_or_visible_brightness_quality',
  ];
  readonly unresolvedProductSurface: readonly [
    'product_individual_eye_asymmetry_surface',
  ];
  readonly authorityBoundary: {
    readonly newAnatomicalResearchRequired: false;
    readonly providerIndexToAnatomyBindingIssued: false;
    readonly anatomicalLateralityIssued: false;
    readonly physiologicalEyeApertureIssued: false;
    readonly almondRoundNarrowClassifierIssued: false;
    readonly upturnedDownturnedClassifierIssued: false;
    readonly eyelidCreaseClassifierIssued: false;
    readonly hoodedEyelidClassifierIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-210 ${message}`);
}

function axis(
  axisKey: FR210EyeAxisKey,
  value: number,
  unit: FR210EyeAxis['unit'],
  sourceMetricRef: string,
  semanticScope: FR210EyeAxis['semanticScope'],
): FR210EyeAxis {
  if (!Number.isFinite(value)) fail(`${axisKey} must be finite.`);
  return Object.freeze({
    axisKey,
    value,
    unit,
    sourceMetricRef,
    semanticScope,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  });
}

export function selectUniqueFR158MetricFR210(
  values: readonly RoleInvariantEyePairNeutralShapeMetricValueFR158V1[],
  metricRef: RoleInvariantEyePairNeutralShapeMetricValueFR158V1['metricRef'],
): RoleInvariantEyePairNeutralShapeMetricValueFR158V1 {
  const matches = values.filter((value) => value.metricRef === metricRef);
  if (matches.length !== 1) {
    fail(`expected exactly one FR158 metric for ${metricRef}; found ${matches.length}.`);
  }
  const selected = matches[0]!;
  if (
    !Number.isFinite(selected.value) ||
    selected.classificationApplied !== false ||
    selected.calibrationApplied !== false ||
    selected.thresholdApplied !== false ||
    selected.identityMatchingApplied !== false ||
    selected.traditionalBindingApplied !== false
  ) {
    fail(`FR158 metric boundary drift for ${metricRef}.`);
  }
  return selected;
}

export function selectUniqueFR178MetricFR210(
  values: readonly EyePairGeometricYSpanMetricValueFR178V1[],
  metricRef: EyePairGeometricYSpanMetricValueFR178V1['metricRef'],
): EyePairGeometricYSpanMetricValueFR178V1 {
  const matches = values.filter((value) => value.metricRef === metricRef);
  if (matches.length !== 1) {
    fail(`expected exactly one FR178 metric for ${metricRef}; found ${matches.length}.`);
  }
  const selected = matches[0]!;
  if (
    !Number.isFinite(selected.value) ||
    selected.individualEyeValuesExposed !== false ||
    selected.classificationApplied !== false ||
    selected.calibrationApplied !== false ||
    selected.thresholdApplied !== false ||
    selected.identityMatchingApplied !== false ||
    selected.traditionalBindingApplied !== false
  ) {
    fail(`FR178 metric boundary drift for ${metricRef}.`);
  }
  return selected;
}

function assertFR207EyeReuseBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const eye = inventory.entries.find((entry) => entry.regionKey === 'eye_pair');
  if (
    eye?.mayProceedWithoutNewAnatomicalResearch !== true ||
    eye.currentReadiness !== 'existing_research_metric' ||
    eye.availableNeutralConstructs.includes('mean_eye_cycle_x_span_ratio') !== true ||
    eye.availableNeutralConstructs.includes('mean_eye_cycle_y_to_x_span_ratio') !== true ||
    eye.availableNeutralConstructs.includes('eye_cycle_centroid_separation_ratio') !== true ||
    eye.availableNeutralConstructs.includes('mean_eye_cycle_turning_angle') !== true ||
    eye.smallestMissingObservablePrimitives.includes('eye_tail_orientation_angle') !== true ||
    eye.imageModelRequiredConstructs.includes('eyelid_crease_category') !== true ||
    eye.imageModelRequiredConstructs.includes('hooded_eyelid_category') !== true
  ) {
    fail('FR207 Eye-Pair reuse boundary drift.');
  }
}

function fromFR208Tilt(metric: NeutralObservableMetricFR208V1): FR210EyeAxis {
  if (
    metric.metricRef !== 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' ||
    metric.unit !== 'degree' ||
    metric.classificationApplied !== false ||
    metric.thresholdApplied !== false ||
    metric.calibrationApplied !== false ||
    metric.traditionalBindingApplied !== false ||
    metric.anatomicalInterpretationAllowed !== false
  ) {
    fail('FR208 outer-corner tilt boundary drift.');
  }
  return axis(
    'outer_corner_tilt',
    metric.value,
    'degree',
    metric.metricRef,
    'bilateral_visible_corner_geometry_only',
  );
}

export function computeEyeNeutralAxisBundleFR210(
  source: GovernedMetricGeometryCandidateFR77V1,
): FR210EyeNeutralAxisBundle {
  assertFR207EyeReuseBoundary();

  const fr158 = computeRoleInvariantEyePairNeutralShapeMetricsFR158(source);
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(fr158);
  const fr178 = computeEyePairGeometricYSpanMetricsFR178(source);
  assertIssuedEyePairGeometricYSpanMetricsFR178(fr178);

  const horizontal = selectUniqueFR158MetricFR210(fr158.metricValues, X_SPAN_REF);
  const spacing = selectUniqueFR158MetricFR210(fr158.metricValues, CENTROID_SEPARATION_REF);
  const turning = selectUniqueFR158MetricFR210(fr158.metricValues, TURNING_ANGLE_REF);
  const verticalToHorizontal = selectUniqueFR178MetricFR210(fr178.metricValues, Y_TO_X_REF);

  const tiltDerivation = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(source.metricLandmarks);
  const outerCornerTilt: FR210EyeAxis | FR210UnavailableEyeAxis =
    tiltDerivation.status === 'available'
      ? fromFR208Tilt(computeEyeOuterCornerTiltFR208(tiltDerivation.input).mean)
      : Object.freeze({
          axisKey: 'outer_corner_tilt' as const,
          status: 'unavailable' as const,
          reason: tiltDerivation.reason,
          fallbackInvented: false as const,
        });

  return Object.freeze({
    schemaVersion: 'fr210-eye-neutral-axis-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR210_CONTRACT_VERSION,
    authorityState: 'reused_neutral_eye_geometry_axes_research_only' as const,
    source: Object.freeze({
      fr77ProviderRunRef: source.provider.providerRunRef,
      fr77CanonicalAssetDigest: source.provider.canonicalAssetDigest,
      fr158SchemaVersion: fr158.schemaVersion,
      fr178SchemaVersion: fr178.schemaVersion,
      fr209DerivationAttempted: true as const,
      fr207MayProceedWithoutNewAnatomicalResearch: true as const,
    }),
    axes: Object.freeze({
      relativeHorizontalSpan: axis(
        'relative_horizontal_span',
        horizontal.value,
        horizontal.unit,
        horizontal.metricRef,
        'closed_cycle_geometry_only',
      ),
      geometricVerticalToHorizontalRatio: axis(
        'geometric_vertical_to_horizontal_ratio',
        verticalToHorizontal.value,
        verticalToHorizontal.unit,
        verticalToHorizontal.metricRef,
        'closed_cycle_geometry_only',
      ),
      centroidSeparation: axis(
        'centroid_separation',
        spacing.value,
        spacing.unit,
        spacing.metricRef,
        'closed_cycle_geometry_only',
      ),
      closedCycleTurningAngle: axis(
        'closed_cycle_turning_angle',
        turning.value,
        turning.unit,
        turning.metricRef,
        'closed_cycle_geometry_only',
      ),
      outerCornerTilt,
    }),
    unsupportedImageTraits: Object.freeze([
      'eyelid_crease_category',
      'hooded_eyelid_category',
      'ocular_radiance_or_visible_brightness_quality',
    ] as const),
    unresolvedProductSurface: Object.freeze([
      'product_individual_eye_asymmetry_surface',
    ] as const),
    authorityBoundary: Object.freeze({
      newAnatomicalResearchRequired: false as const,
      providerIndexToAnatomyBindingIssued: false as const,
      anatomicalLateralityIssued: false as const,
      physiologicalEyeApertureIssued: false as const,
      almondRoundNarrowClassifierIssued: false as const,
      upturnedDownturnedClassifierIssued: false as const,
      eyelidCreaseClassifierIssued: false as const,
      hoodedEyelidClassifierIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function assertEyeNeutralAxisBundleFR210(
  result: FR210EyeNeutralAxisBundle,
): void {
  if (
    result.schemaVersion !== 'fr210-eye-neutral-axis-bundle-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR210_CONTRACT_VERSION ||
    result.authorityState !== 'reused_neutral_eye_geometry_axes_research_only' ||
    result.source.fr209DerivationAttempted !== true ||
    result.source.fr207MayProceedWithoutNewAnatomicalResearch !== true
  ) {
    fail('bundle identity/source boundary drift.');
  }

  for (const [key, value] of Object.entries(result.authorityBoundary)) {
    if (key === 'newAnatomicalResearchRequired') {
      if (value !== false) fail('new anatomical research was incorrectly made mandatory.');
    } else if (value !== false) {
      fail(`authority widening: ${key}.`);
    }
  }

  const required = [
    result.axes.relativeHorizontalSpan,
    result.axes.geometricVerticalToHorizontalRatio,
    result.axes.centroidSeparation,
    result.axes.closedCycleTurningAngle,
  ];
  for (const metric of required) {
    if (
      !Number.isFinite(metric.value) ||
      metric.classificationApplied !== false ||
      metric.thresholdApplied !== false ||
      metric.calibrationApplied !== false ||
      metric.traditionalBindingApplied !== false ||
      metric.anatomicalInterpretationAllowed !== false
    ) {
      fail(`axis boundary drift: ${metric.axisKey}.`);
    }
  }

  if ('status' in result.axes.outerCornerTilt) {
    if (result.axes.outerCornerTilt.status !== 'unavailable' || result.axes.outerCornerTilt.fallbackInvented !== false) {
      fail('outer-corner tilt unavailable boundary drift.');
    }
  } else if (
    result.axes.outerCornerTilt.axisKey !== 'outer_corner_tilt' ||
    result.axes.outerCornerTilt.unit !== 'degree'
  ) {
    fail('outer-corner tilt available boundary drift.');
  }
}
