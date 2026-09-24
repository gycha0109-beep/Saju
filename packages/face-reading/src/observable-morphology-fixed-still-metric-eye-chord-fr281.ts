import { computeEyeOuterCornerTiltFR208 } from './cross-face-neutral-observable-primitives-fr208.js';
import { deriveEyeOuterCornerTiltInputFromMetricGeometryFR209 } from './governed-geometry-to-fr208-adapter-fr209.js';
import type { MediaPipeMetricGeometryPointFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { FR257EphemeralGeometryObservation } from './observable-morphology-capture-geometry-attribution-fr257.js';
import type { FR269ScalarSummary } from './observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import type { FR274Condition, FR274ImageLabel } from './observable-morphology-deterministic-still-image-diagnostic-fr274.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR281_CONTRACT_VERSION =
  'FR281-FIXED-STILL-FR76-METRIC-EYE-CHORD-DECOMPOSITION-v1' as const;

const EPSILON = 1e-12;
const RAD_TO_DEG = 180 / Math.PI;

export interface FR281MetricEyeChordCycleScalars {
  readonly metricSide: 'negative_x_cycle' | 'positive_x_cycle';
  readonly horizontalSpanCentimeters: number;
  readonly signedVerticalRiseCentimeters: number;
  readonly angleDegrees: number;
}

export interface FR281SameFrameMetricEyeChordEvidence {
  readonly schemaVersion: 'fr281-same-frame-metric-eye-chord-evidence-v1';
  readonly contractVersion: typeof FR281_CONTRACT_VERSION;
  readonly providerRunRef: string;
  readonly negativeXEyeChord: FR281MetricEyeChordCycleScalars;
  readonly positiveXEyeChord: FR281MetricEyeChordCycleScalars;
  readonly meanHorizontalSpanCentimeters: number;
  readonly meanSignedVerticalRiseCentimeters: number;
  readonly reconstructedFR76EyeOuterCornerTiltMeanDegrees: number;
}

export interface FR281SameFrameMetricEyeChordCollector {
  readonly observe: (observation: FR257EphemeralGeometryObservation) => void;
  readonly takeEvidence: (providerRunRef: string) => FR281SameFrameMetricEyeChordEvidence | null;
  readonly pendingEvidenceCount: () => number;
}

export interface FR281FixedStillObservation {
  readonly imageLabel: FR274ImageLabel;
  readonly condition: FR274Condition;
  readonly fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: number;
  readonly reconstructedFR76EyeOuterCornerTiltMeanDegrees: number;
  readonly negativeXEyeChord: FR281MetricEyeChordCycleScalars;
  readonly positiveXEyeChord: FR281MetricEyeChordCycleScalars;
  readonly meanHorizontalSpanCentimeters: number;
  readonly meanSignedVerticalRiseCentimeters: number;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly screenMeanHorizontalSpanPixels: number;
  readonly screenMeanSignedVerticalRisePixels: number;
  readonly verticalOrientationRadians: number;
  readonly screenFaceBoxAreaFraction: number;
}

export interface FR281ConditionSummary {
  readonly condition: FR274Condition;
  readonly imageCount: 2;
  readonly fr76EyeTiltDegrees: FR269ScalarSummary;
  readonly metricHorizontalSpanCentimeters: FR269ScalarSummary;
  readonly metricSignedVerticalRiseCentimeters: FR269ScalarSummary;
  readonly screenEyeTiltDegrees: FR269ScalarSummary;
  readonly screenHorizontalSpanPixels: FR269ScalarSummary;
  readonly screenSignedVerticalRisePixels: FR269ScalarSummary;
  readonly verticalOrientationDegrees: FR269ScalarSummary;
  readonly screenFaceBoxAreaFraction: FR269ScalarSummary;
}

export interface FR281FixedStillMetricEyeChordReport {
  readonly schemaVersion: 'fr281-fixed-still-metric-eye-chord-report-v1';
  readonly contractVersion: typeof FR281_CONTRACT_VERSION;
  readonly authorityState:
    'fixed_still_fr76_metric_eye_chord_decomposition_descriptive_only_no_threshold_calibration_correction_or_causal_classification';
  readonly generatedAt: string;
  readonly observations: readonly FR281FixedStillObservation[];
  readonly conditions: readonly FR281ConditionSummary[];
  readonly frontRelativeContrasts: readonly {
    readonly condition: 'high_angle' | 'low_angle';
    readonly deltaFR76EyeTiltDegrees: number;
    readonly deltaMetricHorizontalSpanCentimeters: number;
    readonly deltaMetricSignedVerticalRiseCentimeters: number;
    readonly deltaScreenEyeTiltDegrees: number;
    readonly deltaScreenHorizontalSpanPixels: number;
    readonly deltaScreenSignedVerticalRisePixels: number;
    readonly deltaVerticalOrientationDegrees: number;
    readonly deltaScreenFaceBoxAreaFraction: number;
  }[];
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly providerRunRefPersisted: false;
    readonly scalarDiagnosticPersisted: true;
  };
  readonly authorityBoundary: {
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly causalClassificationIssued: false;
    readonly frozenMetricReplaced: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const EXPECTED = Object.freeze([
  Object.freeze({ imageLabel: 'front_1', condition: 'front' }),
  Object.freeze({ imageLabel: 'front_2', condition: 'front' }),
  Object.freeze({ imageLabel: 'high_1', condition: 'high_angle' }),
  Object.freeze({ imageLabel: 'high_2', condition: 'high_angle' }),
  Object.freeze({ imageLabel: 'low_1', condition: 'low_angle' }),
  Object.freeze({ imageLabel: 'low_2', condition: 'low_angle' }),
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-281 ' + message);
}

function closeEnough(actual: number, expected: number): boolean {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  return Math.abs(actual - expected) <= EPSILON * scale;
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function summary(values: readonly number[]): FR269ScalarSummary {
  if (values.length !== 2) fail('condition summary requires exactly two values.');
  values.forEach((value, index) => finite(value, 'summary[' + index + ']'));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({ mean: (values[0]! + values[1]!) / 2, min, max, span: max - min });
}

export function deriveMetricEyeChordComponentsFR281(
  metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
): Omit<FR281SameFrameMetricEyeChordEvidence, 'schemaVersion' | 'contractVersion' | 'providerRunRef'> {
  const derivation = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(metricLandmarks);
  if (derivation.status !== 'available') {
    fail('FR209 metric eye derivation unavailable: ' + derivation.reason);
  }
  const frozen = computeEyeOuterCornerTiltFR208(derivation.input);

  const one = (
    side: typeof derivation.input.leftEye,
    metricSide: FR281MetricEyeChordCycleScalars['metricSide'],
  ): FR281MetricEyeChordCycleScalars => {
    const horizontalSpanCentimeters = Math.abs(side.outerCorner.x - side.innerCorner.x);
    const signedVerticalRiseCentimeters = side.outerCorner.y - side.innerCorner.y;
    if (!(horizontalSpanCentimeters > EPSILON)) fail(metricSide + ' horizontal span must be positive.');
    return Object.freeze({
      metricSide,
      horizontalSpanCentimeters,
      signedVerticalRiseCentimeters,
      angleDegrees: Math.atan2(signedVerticalRiseCentimeters, horizontalSpanCentimeters) * RAD_TO_DEG,
    });
  };

  const negativeXEyeChord = one(derivation.input.leftEye, 'negative_x_cycle');
  const positiveXEyeChord = one(derivation.input.rightEye, 'positive_x_cycle');
  const reconstructedFR76EyeOuterCornerTiltMeanDegrees =
    (negativeXEyeChord.angleDegrees + positiveXEyeChord.angleDegrees) / 2;

  if (
    !closeEnough(negativeXEyeChord.angleDegrees, frozen.left.value)
    || !closeEnough(positiveXEyeChord.angleDegrees, frozen.right.value)
    || !closeEnough(reconstructedFR76EyeOuterCornerTiltMeanDegrees, frozen.mean.value)
  ) {
    fail('metric chord reconstruction drifted from FR208 frozen eye-tilt metric.');
  }

  return Object.freeze({
    negativeXEyeChord,
    positiveXEyeChord,
    meanHorizontalSpanCentimeters:
      (negativeXEyeChord.horizontalSpanCentimeters + positiveXEyeChord.horizontalSpanCentimeters) / 2,
    meanSignedVerticalRiseCentimeters:
      (negativeXEyeChord.signedVerticalRiseCentimeters + positiveXEyeChord.signedVerticalRiseCentimeters) / 2,
    reconstructedFR76EyeOuterCornerTiltMeanDegrees,
  });
}

export function createSameFrameMetricEyeChordCollectorFR281(): FR281SameFrameMetricEyeChordCollector {
  const pending = new Map<string, FR281SameFrameMetricEyeChordEvidence>();
  return Object.freeze({
    observe(observation: FR257EphemeralGeometryObservation) {
      if (pending.has(observation.providerRunRef)) fail('duplicate providerRunRef metric observation.');
      const components = deriveMetricEyeChordComponentsFR281(observation.metricLandmarks);
      pending.set(observation.providerRunRef, Object.freeze({
        schemaVersion: 'fr281-same-frame-metric-eye-chord-evidence-v1' as const,
        contractVersion: FR281_CONTRACT_VERSION,
        providerRunRef: observation.providerRunRef,
        ...components,
      }));
    },
    takeEvidence(providerRunRef: string) {
      const evidence = pending.get(providerRunRef);
      if (evidence === undefined) return null;
      pending.delete(providerRunRef);
      return evidence;
    },
    pendingEvidenceCount: () => pending.size,
  });
}

function validateObservation(
  observation: FR281FixedStillObservation,
  expected: (typeof EXPECTED)[number],
): void {
  if (observation.imageLabel !== expected.imageLabel || observation.condition !== expected.condition) {
    fail('observations must remain ordered front_1, front_2, high_1, high_2, low_1, low_2.');
  }
  const fields: readonly (keyof FR281FixedStillObservation)[] = [
    'fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees',
    'reconstructedFR76EyeOuterCornerTiltMeanDegrees',
    'meanHorizontalSpanCentimeters',
    'meanSignedVerticalRiseCentimeters',
    'screenSpaceEyeOuterCornerTiltMeanDegrees',
    'screenMeanHorizontalSpanPixels',
    'screenMeanSignedVerticalRisePixels',
    'verticalOrientationRadians',
    'screenFaceBoxAreaFraction',
  ];
  for (const field of fields) finite(observation[field] as number, observation.imageLabel + '.' + field);
  if (!closeEnough(
    observation.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees,
    observation.reconstructedFR76EyeOuterCornerTiltMeanDegrees,
  )) {
    fail(observation.imageLabel + ' reconstructed metric angle must match FR76.');
  }
}

function conditionSummary(
  condition: FR274Condition,
  observations: readonly FR281FixedStillObservation[],
): FR281ConditionSummary {
  const selected = observations.filter((item) => item.condition === condition);
  if (selected.length !== 2) fail(condition + ' requires exactly two observations.');
  const values = (key: keyof FR281FixedStillObservation) =>
    selected.map((item) => finite(item[key] as number, String(key)));
  return Object.freeze({
    condition,
    imageCount: 2 as const,
    fr76EyeTiltDegrees: summary(values('fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees')),
    metricHorizontalSpanCentimeters: summary(values('meanHorizontalSpanCentimeters')),
    metricSignedVerticalRiseCentimeters: summary(values('meanSignedVerticalRiseCentimeters')),
    screenEyeTiltDegrees: summary(values('screenSpaceEyeOuterCornerTiltMeanDegrees')),
    screenHorizontalSpanPixels: summary(values('screenMeanHorizontalSpanPixels')),
    screenSignedVerticalRisePixels: summary(values('screenMeanSignedVerticalRisePixels')),
    verticalOrientationDegrees: summary(values('verticalOrientationRadians').map((value) => value * RAD_TO_DEG)),
    screenFaceBoxAreaFraction: summary(values('screenFaceBoxAreaFraction')),
  });
}

export function buildFixedStillMetricEyeChordReportFR281(input: {
  readonly generatedAt: string;
  readonly observations: readonly FR281FixedStillObservation[];
}): FR281FixedStillMetricEyeChordReport {
  const parsed = Date.parse(input.generatedAt);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== input.generatedAt) {
    fail('generatedAt must be exact ISO-8601 UTC.');
  }
  if (input.observations.length !== 6) fail('report requires exactly six observations.');
  input.observations.forEach((observation, index) => validateObservation(observation, EXPECTED[index]!));
  const observations = Object.freeze(input.observations.map((item) => Object.freeze({
    ...item,
    negativeXEyeChord: Object.freeze({ ...item.negativeXEyeChord }),
    positiveXEyeChord: Object.freeze({ ...item.positiveXEyeChord }),
  })));
  const conditions = Object.freeze([
    conditionSummary('front', observations),
    conditionSummary('high_angle', observations),
    conditionSummary('low_angle', observations),
  ]);
  const front = conditions[0]!;
  const frontRelativeContrasts = Object.freeze(conditions.slice(1).map((condition) => Object.freeze({
    condition: condition.condition as 'high_angle' | 'low_angle',
    deltaFR76EyeTiltDegrees: condition.fr76EyeTiltDegrees.mean - front.fr76EyeTiltDegrees.mean,
    deltaMetricHorizontalSpanCentimeters:
      condition.metricHorizontalSpanCentimeters.mean - front.metricHorizontalSpanCentimeters.mean,
    deltaMetricSignedVerticalRiseCentimeters:
      condition.metricSignedVerticalRiseCentimeters.mean - front.metricSignedVerticalRiseCentimeters.mean,
    deltaScreenEyeTiltDegrees: condition.screenEyeTiltDegrees.mean - front.screenEyeTiltDegrees.mean,
    deltaScreenHorizontalSpanPixels:
      condition.screenHorizontalSpanPixels.mean - front.screenHorizontalSpanPixels.mean,
    deltaScreenSignedVerticalRisePixels:
      condition.screenSignedVerticalRisePixels.mean - front.screenSignedVerticalRisePixels.mean,
    deltaVerticalOrientationDegrees:
      condition.verticalOrientationDegrees.mean - front.verticalOrientationDegrees.mean,
    deltaScreenFaceBoxAreaFraction:
      condition.screenFaceBoxAreaFraction.mean - front.screenFaceBoxAreaFraction.mean,
  })));

  return Object.freeze({
    schemaVersion: 'fr281-fixed-still-metric-eye-chord-report-v1' as const,
    contractVersion: FR281_CONTRACT_VERSION,
    authorityState:
      'fixed_still_fr76_metric_eye_chord_decomposition_descriptive_only_no_threshold_calibration_correction_or_causal_classification' as const,
    generatedAt: input.generatedAt,
    observations,
    conditions,
    frontRelativeContrasts,
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      providerRunRefPersisted: false as const,
      scalarDiagnosticPersisted: true as const,
    }),
    authorityBoundary: Object.freeze({
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      causalClassificationIssued: false as const,
      frozenMetricReplaced: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}