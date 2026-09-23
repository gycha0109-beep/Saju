import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  computeEyeOuterCornerTiltFR208,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  deriveEyeOuterCornerTiltInputFromMetricGeometryFR209,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import type {
  MediaPipeMetricGeometryPointFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type {
  FR242PrimaryMetricExtraction,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import type {
  FR243DryRunCaptureExecutionRecord,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import type {
  FR257CaptureGeometryAttributionBundle,
  FR257CaptureGeometryScalars,
  FR257EphemeralGeometryObservation,
} from './observable-morphology-capture-geometry-attribution-fr257.js';
import { FR237_PRIMARY_METRIC } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR266_CONTRACT_VERSION =
  'FR266-CONTROLLED-CAPTURE-GEOMETRY-SENSITIVITY-v1' as const;

export const FR266_NEXT_FRONTIER =
  'collect_same_frame_screen_vs_fr76_eye_tilt_diagnostics_only_if_needed_then_adjudicate_capture_envelope_vs_metric_redesign_without_threshold_or_correction' as const;

const EPSILON = 1e-12;
const RAD_TO_DEG = 180 / Math.PI;

export type FR266ControlledCondition =
  | 'baseline_eye_level'
  | 'low_angle'
  | 'high_angle';

export interface FR266ScalarSummary {
  readonly mean: number;
  readonly min: number;
  readonly max: number;
  readonly span: number;
}

export interface FR266ConditionSummary {
  readonly condition: FR266ControlledCondition;
  readonly sourceRef: string;
  readonly sourceGeneratedAt: string;
  readonly captureCount: 4;
  readonly primaryMetricDegrees: FR266ScalarSummary;
  readonly geometry: {
    readonly lateralOrientationRadians: FR266ScalarSummary;
    readonly lateralOrientationDegrees: FR266ScalarSummary;
    readonly verticalOrientationRadians: FR266ScalarSummary;
    readonly verticalOrientationDegrees: FR266ScalarSummary;
    readonly relativeRotationFromFirstAcceptedCaptureRadians: FR266ScalarSummary;
    readonly relativeRotationFromFirstAcceptedCaptureDegrees: FR266ScalarSummary;
    readonly inPlaneLateralAxisOrientationRadians: FR266ScalarSummary;
    readonly inPlaneLateralAxisOrientationDegrees: FR266ScalarSummary;
    readonly poseUniformScaleComponent: FR266ScalarSummary;
    readonly screenFaceBoxWidthFraction: FR266ScalarSummary;
    readonly screenFaceBoxHeightFraction: FR266ScalarSummary;
    readonly screenFaceBoxAreaFraction: FR266ScalarSummary;
  };
}

export interface FR266BaselineRelativeContrast {
  readonly condition: 'low_angle' | 'high_angle';
  readonly baselineCondition: 'baseline_eye_level';
  readonly deltaMeanPrimaryMetricDegrees: number;
  readonly deltaMeanVerticalOrientationRadians: number;
  readonly deltaMeanVerticalOrientationDegrees: number;
  readonly deltaMeanLateralOrientationRadians: number;
  readonly deltaMeanLateralOrientationDegrees: number;
  readonly deltaMeanRelativeRotationRadians: number;
  readonly deltaMeanInPlaneLateralAxisOrientationRadians: number;
  readonly deltaMeanScreenFaceBoxWidthFraction: number;
  readonly deltaMeanScreenFaceBoxHeightFraction: number;
  readonly deltaMeanScreenFaceBoxAreaFraction: number;
}

export interface FR266ControlledGeometrySensitivityReport {
  readonly schemaVersion: 'fr266-controlled-capture-geometry-sensitivity-report-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR266_CONTRACT_VERSION;
  readonly authorityState:
    'controlled_capture_geometry_sensitivity_descriptive_only_no_threshold_calibration_or_correction';
  readonly generatedAt: string;
  readonly metricRef: typeof FR237_PRIMARY_METRIC;
  readonly conditions: readonly [
    FR266ConditionSummary,
    FR266ConditionSummary,
    FR266ConditionSummary,
  ];
  readonly baselineRelativeContrasts: readonly [
    FR266BaselineRelativeContrast,
    FR266BaselineRelativeContrast,
  ];
  readonly interpretationBoundary: {
    readonly operatorConditionLabelsAreIndependentPoseVerification: false;
    readonly singleParticipantSupportsPopulationGeneralization: false;
    readonly verticalOrientationCausalityEstablished: false;
    readonly faceScaleConfoundingEliminated: false;
    readonly linearResponseEstablished: false;
  };
  readonly authorityBoundary: {
    readonly poseAcceptanceThresholdIssued: false;
    readonly distanceAcceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly repeatabilityPassFailIssued: false;
    readonly confidenceGradeIssued: false;
    readonly interpretationValidityEstablished: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR266_NEXT_FRONTIER;
}

export interface FR266SameFrameEyeTiltDiagnosticEvidence {
  readonly schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR266_CONTRACT_VERSION;
  readonly authorityState:
    'same_frame_eye_tilt_diagnostic_scalar_only_no_metric_replacement';
  readonly providerRunRef: string;
  readonly frozenPrimaryMetric: FR242PrimaryMetricExtraction;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: number;
  readonly screenMinusFr76Degrees: number;
  readonly frozenMetricMatchesFr76Diagnostic: true;
  readonly additionalPoseNormalizationCandidateState:
    'not_issued_fr76_metric_geometry_is_already_inverse_pose_aligned';
  readonly persistenceBoundary: {
    readonly rawMediaPersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly scalarDiagnosticPersisted: true;
  };
  readonly authorityBoundary: {
    readonly frozenMetricReplaced: false;
    readonly additionalPoseNormalizationIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly thresholdIssued: false;
    readonly classificationIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR266SameFrameEyeTiltDiagnosticSlot {
  readonly schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-slot-v1';
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly resultStatus: 'rejected' | 'accepted_for_dry_run_mechanics_only';
  readonly frozenPrimaryMetric: FR242PrimaryMetricExtraction | null;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: number | null;
  readonly fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: number | null;
  readonly screenMinusFr76Degrees: number | null;
}

export interface FR266SameFrameEyeTiltDiagnosticBundle {
  readonly schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-bundle-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR266_CONTRACT_VERSION;
  readonly authorityState:
    'same_frame_eye_tilt_diagnostic_scalar_only_no_metric_replacement';
  readonly generatedAt: string;
  readonly slots: readonly FR266SameFrameEyeTiltDiagnosticSlot[];
  readonly descriptiveSummary: {
    readonly acceptedDiagnosticCount: number;
    readonly screenSpaceEyeOuterCornerTiltMeanDegrees: FR266ScalarSummary | null;
    readonly fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: FR266ScalarSummary | null;
    readonly screenMinusFr76Degrees: FR266ScalarSummary | null;
  };
  readonly persistenceBoundary: {
    readonly participantRefRetained: false;
    readonly operatorRefRetained: false;
    readonly providerRunRefRetained: false;
    readonly rawMediaPersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly scalarDiagnosticPersisted: true;
  };
  readonly authorityBoundary: {
    readonly frozenMetricReplaced: false;
    readonly additionalPoseNormalizationIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly thresholdIssued: false;
    readonly classificationIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR266SameFrameEyeTiltDiagnosticCollector {
  readonly observe: (observation: FR257EphemeralGeometryObservation) => void;
  readonly takeEvidence: (
    providerRunRef: string,
  ) => FR266SameFrameEyeTiltDiagnosticEvidence | null;
  readonly pendingEvidenceCount: () => number;
}

const EYE_CYCLE_VERTEX_SETS = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(
      orderClosedCycleProviderVerticesFR16(
        FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol],
      ),
    ),
  ),
);

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-266 ' + message);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function exactIso(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('timestamp must be an exact ISO-8601 UTC timestamp.');
  }
}

function summary(values: readonly number[]): FR266ScalarSummary {
  if (values.length === 0) fail('scalar summary requires at least one value.');
  values.forEach((value, index) => finite(value, `values[${index}]`));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    min,
    max,
    span: max - min,
  });
}

function degreesSummary(values: readonly number[]): FR266ScalarSummary {
  return summary(values.map((value) => value * RAD_TO_DEG));
}

function assertFR257Bundle(bundle: FR257CaptureGeometryAttributionBundle): void {
  if (
    bundle.schemaVersion !== 'fr257-capture-geometry-attribution-bundle-v1'
    || bundle.artifactVersion !== '0.1.0'
    || bundle.contractVersion !== 'FR257-SAME-FRAME-CAPTURE-GEOMETRY-ATTRIBUTION-v1'
    || bundle.authorityState
      !== 'capture_geometry_attribution_descriptive_only_no_threshold_or_calibration'
    || bundle.source.metricRef !== FR237_PRIMARY_METRIC
    || bundle.source.requiredSlotCount !== 4
    || bundle.slots.length !== 4
    || bundle.descriptiveSummary.recordedSlotCount !== 4
    || bundle.descriptiveSummary.acceptedMetricCount !== 4
    || bundle.descriptiveSummary.geometryAttributionCount !== 4
  ) {
    fail('requires a complete four-slot descriptive FR257 bundle.');
  }
  const expected = ['1:1', '1:2', '2:1', '2:2'];
  bundle.slots.forEach((slot, index) => {
    if (
      `${slot.sessionOrdinal}:${slot.captureOrdinal}` !== expected[index]
      || slot.resultStatus !== 'accepted_for_dry_run_mechanics_only'
      || slot.primaryMetric?.metricRef !== FR237_PRIMARY_METRIC
      || slot.primaryMetric.unit !== 'degree'
      || !Number.isFinite(slot.primaryMetric.value)
      || slot.geometry === null
      || slot.geometryAttributionState !== 'same_frame_scalar_geometry_available'
    ) {
      fail(`FR257 slot ${index} is incomplete or out of order.`);
    }
  });
  if (
    bundle.privacyBoundary.rawMediaPersisted !== false
    || bundle.privacyBoundary.rawScreenLandmarksPersisted !== false
    || bundle.privacyBoundary.rawMetricLandmarksPersisted !== false
    || bundle.privacyBoundary.poseTransformMatrixPersisted !== false
    || bundle.privacyBoundary.scalarGeometryPersisted !== true
    || Object.values(bundle.authorityBoundary).some((value) => value !== false)
  ) {
    fail('FR257 privacy or authority boundary widened.');
  }
}

function summarizeCondition(input: {
  readonly condition: FR266ControlledCondition;
  readonly sourceRef: string;
  readonly bundle: FR257CaptureGeometryAttributionBundle;
}): FR266ConditionSummary {
  assertFR257Bundle(input.bundle);
  if (input.sourceRef.trim().length === 0 || input.sourceRef.length > 512) {
    fail('sourceRef must be a bounded non-empty research reference.');
  }
  exactIso(input.bundle.generatedAt);
  const metric = input.bundle.slots.map((slot) => slot.primaryMetric!.value);
  const geometry = input.bundle.slots.map((slot) => slot.geometry!);
  const values = <K extends keyof FR257CaptureGeometryScalars>(key: K) =>
    geometry.map((item) => item[key] as number);

  return Object.freeze({
    condition: input.condition,
    sourceRef: input.sourceRef,
    sourceGeneratedAt: input.bundle.generatedAt,
    captureCount: 4 as const,
    primaryMetricDegrees: summary(metric),
    geometry: Object.freeze({
      lateralOrientationRadians: summary(values('lateralOrientationRadians')),
      lateralOrientationDegrees: degreesSummary(values('lateralOrientationRadians')),
      verticalOrientationRadians: summary(values('verticalOrientationRadians')),
      verticalOrientationDegrees: degreesSummary(values('verticalOrientationRadians')),
      relativeRotationFromFirstAcceptedCaptureRadians:
        summary(values('relativeRotationFromFirstAcceptedCaptureRadians')),
      relativeRotationFromFirstAcceptedCaptureDegrees:
        degreesSummary(values('relativeRotationFromFirstAcceptedCaptureRadians')),
      inPlaneLateralAxisOrientationRadians:
        summary(values('inPlaneLateralAxisOrientationRadians')),
      inPlaneLateralAxisOrientationDegrees:
        degreesSummary(values('inPlaneLateralAxisOrientationRadians')),
      poseUniformScaleComponent: summary(values('poseUniformScaleComponent')),
      screenFaceBoxWidthFraction: summary(values('screenFaceBoxWidthFraction')),
      screenFaceBoxHeightFraction: summary(values('screenFaceBoxHeightFraction')),
      screenFaceBoxAreaFraction: summary(values('screenFaceBoxAreaFraction')),
    }),
  });
}

function contrast(
  baseline: FR266ConditionSummary,
  condition: FR266ConditionSummary,
): FR266BaselineRelativeContrast {
  if (baseline.condition !== 'baseline_eye_level') {
    fail('contrast baseline must be baseline_eye_level.');
  }
  if (condition.condition === 'baseline_eye_level') {
    fail('contrast target must be low_angle or high_angle.');
  }
  return Object.freeze({
    condition: condition.condition,
    baselineCondition: 'baseline_eye_level' as const,
    deltaMeanPrimaryMetricDegrees:
      condition.primaryMetricDegrees.mean - baseline.primaryMetricDegrees.mean,
    deltaMeanVerticalOrientationRadians:
      condition.geometry.verticalOrientationRadians.mean
      - baseline.geometry.verticalOrientationRadians.mean,
    deltaMeanVerticalOrientationDegrees:
      condition.geometry.verticalOrientationDegrees.mean
      - baseline.geometry.verticalOrientationDegrees.mean,
    deltaMeanLateralOrientationRadians:
      condition.geometry.lateralOrientationRadians.mean
      - baseline.geometry.lateralOrientationRadians.mean,
    deltaMeanLateralOrientationDegrees:
      condition.geometry.lateralOrientationDegrees.mean
      - baseline.geometry.lateralOrientationDegrees.mean,
    deltaMeanRelativeRotationRadians:
      condition.geometry.relativeRotationFromFirstAcceptedCaptureRadians.mean
      - baseline.geometry.relativeRotationFromFirstAcceptedCaptureRadians.mean,
    deltaMeanInPlaneLateralAxisOrientationRadians:
      condition.geometry.inPlaneLateralAxisOrientationRadians.mean
      - baseline.geometry.inPlaneLateralAxisOrientationRadians.mean,
    deltaMeanScreenFaceBoxWidthFraction:
      condition.geometry.screenFaceBoxWidthFraction.mean
      - baseline.geometry.screenFaceBoxWidthFraction.mean,
    deltaMeanScreenFaceBoxHeightFraction:
      condition.geometry.screenFaceBoxHeightFraction.mean
      - baseline.geometry.screenFaceBoxHeightFraction.mean,
    deltaMeanScreenFaceBoxAreaFraction:
      condition.geometry.screenFaceBoxAreaFraction.mean
      - baseline.geometry.screenFaceBoxAreaFraction.mean,
  });
}

export function analyzeControlledCaptureGeometrySensitivityFR266(input: {
  readonly generatedAt: string;
  readonly conditions: readonly {
    readonly condition: FR266ControlledCondition;
    readonly sourceRef: string;
    readonly bundle: FR257CaptureGeometryAttributionBundle;
  }[];
}): FR266ControlledGeometrySensitivityReport {
  exactIso(input.generatedAt);
  if (input.conditions.length !== 3) {
    fail('controlled sensitivity analysis requires exactly three conditions.');
  }
  const byCondition = new Map(
    input.conditions.map((entry) => [entry.condition, entry] as const),
  );
  if (
    byCondition.size !== 3
    || !byCondition.has('baseline_eye_level')
    || !byCondition.has('low_angle')
    || !byCondition.has('high_angle')
  ) {
    fail('conditions must be exactly baseline_eye_level, low_angle, high_angle.');
  }

  const baseline = summarizeCondition(byCondition.get('baseline_eye_level')!);
  const low = summarizeCondition(byCondition.get('low_angle')!);
  const high = summarizeCondition(byCondition.get('high_angle')!);

  return Object.freeze({
    schemaVersion: 'fr266-controlled-capture-geometry-sensitivity-report-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR266_CONTRACT_VERSION,
    authorityState:
      'controlled_capture_geometry_sensitivity_descriptive_only_no_threshold_calibration_or_correction' as const,
    generatedAt: input.generatedAt,
    metricRef: FR237_PRIMARY_METRIC,
    conditions: Object.freeze([baseline, low, high] as const),
    baselineRelativeContrasts: Object.freeze([
      contrast(baseline, low),
      contrast(baseline, high),
    ] as const),
    interpretationBoundary: Object.freeze({
      operatorConditionLabelsAreIndependentPoseVerification: false as const,
      singleParticipantSupportsPopulationGeneralization: false as const,
      verticalOrientationCausalityEstablished: false as const,
      faceScaleConfoundingEliminated: false as const,
      linearResponseEstablished: false as const,
    }),
    authorityBoundary: Object.freeze({
      poseAcceptanceThresholdIssued: false as const,
      distanceAcceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      repeatabilityPassFailIssued: false as const,
      confidenceGradeIssued: false as const,
      interpretationValidityEstablished: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR266_NEXT_FRONTIER,
  });
}

type ScreenPoint = Readonly<{ x: number; y: number }>;

function uniqueExtremum(
  points: readonly ScreenPoint[],
  direction: 'min' | 'max',
): ScreenPoint | null {
  const target = direction === 'min'
    ? Math.min(...points.map((point) => point.x))
    : Math.max(...points.map((point) => point.x));
  const matches = points.filter((point) => Math.abs(point.x - target) <= EPSILON);
  return matches.length === 1 ? matches[0]! : null;
}

function screenSpaceEyeTiltMeanDegrees(
  landmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
  frameWidth: number,
  frameHeight: number,
): number {
  if (
    landmarks.length !== 468
    || !Number.isInteger(frameWidth)
    || frameWidth <= 0
    || !Number.isInteger(frameHeight)
    || frameHeight <= 0
  ) {
    fail('screen-space eye diagnostic requires 468 landmarks and positive frame dimensions.');
  }
  landmarks.forEach((point, index) => {
    if (
      !Number.isFinite(point.x)
      || !Number.isFinite(point.y)
      || !Number.isFinite(point.z)
    ) {
      fail(`screenLandmarks[${index}] must be finite.`);
    }
  });
  const meshMinX = Math.min(...landmarks.map((point) => point.x));
  const meshMaxX = Math.max(...landmarks.map((point) => point.x));
  const meshMidX = (meshMinX + meshMaxX) / 2;
  const descriptors = EYE_CYCLE_VERTEX_SETS.map((vertices) => {
    const points = vertices.map((vertex) => {
      const point = landmarks[vertex];
      if (point === undefined) fail(`missing eye vertex ${vertex}.`);
      return Object.freeze({ x: point.x, y: point.y });
    });
    const minPoint = uniqueExtremum(points, 'min');
    const maxPoint = uniqueExtremum(points, 'max');
    if (minPoint === null || maxPoint === null) return null;
    const centroidX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    if (Math.abs(centroidX - meshMidX) <= EPSILON) return null;
    const negative = centroidX < meshMidX;
    return Object.freeze({
      centroidX,
      innerCorner: negative ? maxPoint : minPoint,
      outerCorner: negative ? minPoint : maxPoint,
    });
  });
  if (descriptors.some((entry) => entry === null)) {
    fail('screen-space eye cycle extrema are ambiguous.');
  }
  const ordered = (descriptors as NonNullable<(typeof descriptors)[number]>[])
    .sort((a, b) => a.centroidX - b.centroidX);
  if (
    ordered.length !== 2
    || (ordered[0]!.centroidX < meshMidX) === (ordered[1]!.centroidX < meshMidX)
  ) {
    fail('screen-space eye cycles are not bilateral around mesh midline.');
  }
  const angle = (entry: NonNullable<(typeof descriptors)[number]>) => {
    const horizontalPixels =
      Math.abs(entry.outerCorner.x - entry.innerCorner.x) * frameWidth;
    const verticalUpPixels =
      (entry.innerCorner.y - entry.outerCorner.y) * frameHeight;
    if (!(horizontalPixels > EPSILON)) fail('screen-space eye chord is degenerate.');
    return Math.atan2(verticalUpPixels, horizontalPixels) * RAD_TO_DEG;
  };
  return (angle(ordered[0]!) + angle(ordered[1]!)) / 2;
}

export function deriveSameFrameEyeTiltDiagnosticFR266(
  observation: FR257EphemeralGeometryObservation,
): FR266SameFrameEyeTiltDiagnosticEvidence {
  const screenDegrees = screenSpaceEyeTiltMeanDegrees(
    observation.screenLandmarks,
    observation.frameWidth,
    observation.frameHeight,
  );
  const metricInput = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(
    observation.metricLandmarks,
  );
  if (metricInput.status !== 'available') {
    fail(`FR76 metric eye diagnostic unavailable: ${metricInput.reason}.`);
  }
  const metricDegrees = computeEyeOuterCornerTiltFR208(metricInput.input).mean.value;
  if (
    observation.primaryMetric.metricRef !== FR237_PRIMARY_METRIC
    || observation.primaryMetric.unit !== 'degree'
    || observation.primaryMetric.value !== metricDegrees
  ) {
    fail('frozen primary metric must exactly match the FR76 metric-space diagnostic.');
  }

  return Object.freeze({
    schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR266_CONTRACT_VERSION,
    authorityState:
      'same_frame_eye_tilt_diagnostic_scalar_only_no_metric_replacement' as const,
    providerRunRef: observation.providerRunRef,
    frozenPrimaryMetric: observation.primaryMetric,
    screenSpaceEyeOuterCornerTiltMeanDegrees: screenDegrees,
    fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: metricDegrees,
    screenMinusFr76Degrees: screenDegrees - metricDegrees,
    frozenMetricMatchesFr76Diagnostic: true as const,
    additionalPoseNormalizationCandidateState:
      'not_issued_fr76_metric_geometry_is_already_inverse_pose_aligned' as const,
    persistenceBoundary: Object.freeze({
      rawMediaPersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarDiagnosticPersisted: true as const,
    }),
    authorityBoundary: Object.freeze({
      frozenMetricReplaced: false as const,
      additionalPoseNormalizationIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      thresholdIssued: false as const,
      classificationIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function createSameFrameEyeTiltDiagnosticCollectorFR266():
FR266SameFrameEyeTiltDiagnosticCollector {
  const pending = new Map<string, FR266SameFrameEyeTiltDiagnosticEvidence>();
  const observe = (observation: FR257EphemeralGeometryObservation): void => {
    if (pending.has(observation.providerRunRef)) {
      fail('duplicate providerRunRef diagnostic observation.');
    }
    pending.set(
      observation.providerRunRef,
      deriveSameFrameEyeTiltDiagnosticFR266(observation),
    );
  };
  return Object.freeze({
    observe,
    takeEvidence(providerRunRef: string) {
      const evidence = pending.get(providerRunRef);
      if (evidence === undefined) return null;
      pending.delete(providerRunRef);
      return evidence;
    },
    pendingEvidenceCount: () => pending.size,
  });
}

export function bindSameFrameEyeTiltDiagnosticSlotFR266(input: {
  readonly record: FR243DryRunCaptureExecutionRecord;
  readonly providerRunRef: string;
  readonly evidence: FR266SameFrameEyeTiltDiagnosticEvidence | null;
}): FR266SameFrameEyeTiltDiagnosticSlot {
  if (input.record.resultStatus === 'accepted_for_dry_run_mechanics_only') {
    if (
      input.record.primaryMetric === null
      || input.evidence === null
      || input.evidence.providerRunRef !== input.providerRunRef
      || input.evidence.frozenPrimaryMetric.value !== input.record.primaryMetric.value
    ) {
      fail('accepted FR243 capture requires exact FR266 same-frame evidence.');
    }
    return Object.freeze({
      schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-slot-v1' as const,
      sessionOrdinal: input.record.sessionOrdinal,
      captureOrdinal: input.record.captureOrdinal,
      resultStatus: input.record.resultStatus,
      frozenPrimaryMetric: Object.freeze({ ...input.record.primaryMetric }),
      screenSpaceEyeOuterCornerTiltMeanDegrees:
        input.evidence.screenSpaceEyeOuterCornerTiltMeanDegrees,
      fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees:
        input.evidence.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees,
      screenMinusFr76Degrees: input.evidence.screenMinusFr76Degrees,
    });
  }
  if (input.evidence !== null || input.record.primaryMetric !== null) {
    fail('rejected capture must not retain FR266 scalar diagnostic evidence.');
  }
  return Object.freeze({
    schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-slot-v1' as const,
    sessionOrdinal: input.record.sessionOrdinal,
    captureOrdinal: input.record.captureOrdinal,
    resultStatus: input.record.resultStatus,
    frozenPrimaryMetric: null,
    screenSpaceEyeOuterCornerTiltMeanDegrees: null,
    fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: null,
    screenMinusFr76Degrees: null,
  });
}

export function buildSameFrameEyeTiltDiagnosticBundleFR266(input: {
  readonly generatedAt: string;
  readonly slots: readonly FR266SameFrameEyeTiltDiagnosticSlot[];
}): FR266SameFrameEyeTiltDiagnosticBundle {
  exactIso(input.generatedAt);
  if (input.slots.length !== 4) fail('FR266 diagnostic bundle requires four slots.');
  const expected = ['1:1', '1:2', '2:1', '2:2'];
  input.slots.forEach((slot, index) => {
    if (`${slot.sessionOrdinal}:${slot.captureOrdinal}` !== expected[index]) {
      fail('FR266 diagnostic slots must remain ordered 1:1,1:2,2:1,2:2.');
    }
  });
  const accepted = input.slots.filter(
    (slot) => slot.screenSpaceEyeOuterCornerTiltMeanDegrees !== null,
  );
  const values = <K extends
    | 'screenSpaceEyeOuterCornerTiltMeanDegrees'
    | 'fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees'
    | 'screenMinusFr76Degrees'>(key: K) =>
    accepted.map((slot) => slot[key] as number);

  return Object.freeze({
    schemaVersion: 'fr266-same-frame-eye-tilt-diagnostic-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR266_CONTRACT_VERSION,
    authorityState:
      'same_frame_eye_tilt_diagnostic_scalar_only_no_metric_replacement' as const,
    generatedAt: input.generatedAt,
    slots: Object.freeze([...input.slots]),
    descriptiveSummary: Object.freeze({
      acceptedDiagnosticCount: accepted.length,
      screenSpaceEyeOuterCornerTiltMeanDegrees:
        accepted.length === 0 ? null : summary(values('screenSpaceEyeOuterCornerTiltMeanDegrees')),
      fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees:
        accepted.length === 0 ? null : summary(values('fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees')),
      screenMinusFr76Degrees:
        accepted.length === 0 ? null : summary(values('screenMinusFr76Degrees')),
    }),
    persistenceBoundary: Object.freeze({
      participantRefRetained: false as const,
      operatorRefRetained: false as const,
      providerRunRefRetained: false as const,
      rawMediaPersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarDiagnosticPersisted: true as const,
    }),
    authorityBoundary: Object.freeze({
      frozenMetricReplaced: false as const,
      additionalPoseNormalizationIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      thresholdIssued: false as const,
      classificationIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}
