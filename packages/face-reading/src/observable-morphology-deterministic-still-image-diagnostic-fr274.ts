import type { FR269ScalarSummary } from './observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import { FR237_PRIMARY_METRIC } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR274_CONTRACT_VERSION =
  'FR274-DETERMINISTIC-STILL-IMAGE-EYE-TILT-DIAGNOSTIC-v1' as const;

export const FR274_NEXT_FRONTIER =
  'run_fixed_front_high_low_still_images_through_the_existing_fr26_fr76_fr257_fr269_path_then_compare_descriptive_vertical_viewpoint_sensitivity' as const;

export type FR274Condition = 'front' | 'high_angle' | 'low_angle';

export type FR274ImageLabel =
  | 'front_1'
  | 'front_2'
  | 'high_1'
  | 'high_2'
  | 'low_1'
  | 'low_2';

export interface FR274StillImageScalarObservation {
  readonly imageLabel: FR274ImageLabel;
  readonly condition: FR274Condition;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: number;
  readonly screenMinusFr76Degrees: number;
  readonly lateralOrientationRadians: number;
  readonly verticalOrientationRadians: number;
  readonly relativeRotationFromFirstFrontRadians: number;
  readonly inPlaneLateralAxisOrientationRadians: number;
  readonly poseUniformScaleComponent: number;
  readonly screenFaceBoxWidthFraction: number;
  readonly screenFaceBoxHeightFraction: number;
  readonly screenFaceBoxAreaFraction: number;
}

export interface FR274ConditionSummary {
  readonly condition: FR274Condition;
  readonly imageCount: 2;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: FR269ScalarSummary;
  readonly fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: FR269ScalarSummary;
  readonly screenMinusFr76Degrees: FR269ScalarSummary;
  readonly lateralOrientationRadians: FR269ScalarSummary;
  readonly lateralOrientationDegrees: FR269ScalarSummary;
  readonly verticalOrientationRadians: FR269ScalarSummary;
  readonly verticalOrientationDegrees: FR269ScalarSummary;
  readonly relativeRotationFromFirstFrontRadians: FR269ScalarSummary;
  readonly inPlaneLateralAxisOrientationRadians: FR269ScalarSummary;
  readonly inPlaneLateralAxisOrientationDegrees: FR269ScalarSummary;
  readonly poseUniformScaleComponent: FR269ScalarSummary;
  readonly screenFaceBoxWidthFraction: FR269ScalarSummary;
  readonly screenFaceBoxHeightFraction: FR269ScalarSummary;
  readonly screenFaceBoxAreaFraction: FR269ScalarSummary;
}

export interface FR274FrontRelativeContrast {
  readonly condition: 'high_angle' | 'low_angle';
  readonly baselineCondition: 'front';
  readonly deltaMeanScreenSpaceEyeTiltDegrees: number;
  readonly deltaMeanFR76EyeTiltDegrees: number;
  readonly deltaMeanScreenMinusFR76Degrees: number;
  readonly deltaMeanVerticalOrientationDegrees: number;
  readonly deltaMeanLateralOrientationDegrees: number;
  readonly deltaMeanInPlaneOrientationDegrees: number;
  readonly deltaMeanScreenFaceBoxAreaFraction: number;
}

export interface FR274DeterministicStillImageDiagnosticReport {
  readonly schemaVersion: 'fr274-deterministic-still-image-diagnostic-report-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR274_CONTRACT_VERSION;
  readonly authorityState:
    'fixed_still_image_descriptive_diagnostic_only_no_threshold_calibration_correction_or_causal_classification';
  readonly generatedAt: string;
  readonly metricRef: typeof FR237_PRIMARY_METRIC;
  readonly source: {
    readonly runtimePackage: '@mediapipe/tasks-vision@0.10.35';
    readonly runningMode: 'IMAGE';
    readonly inputImageCount: 6;
    readonly exactInputImageReuseSupported: true;
  };
  readonly observations: readonly FR274StillImageScalarObservation[];
  readonly conditions: readonly [
    FR274ConditionSummary,
    FR274ConditionSummary,
    FR274ConditionSummary,
  ];
  readonly frontRelativeContrasts: readonly [
    FR274FrontRelativeContrast,
    FR274FrontRelativeContrast,
  ];
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawImageDigestPersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly providerRunRefPersisted: false;
    readonly biometricEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly scalarDiagnosticPersisted: true;
  };
  readonly interpretationBoundary: {
    readonly operatorConditionLabelsAreIndependentPoseVerification: false;
    readonly twoImagesPerConditionSupportPopulationGeneralization: false;
    readonly viewpointCausalityEstablished: false;
    readonly providerInferenceCausalityEstablished: false;
    readonly fr76ReconstructionCausalityEstablished: false;
    readonly faceScaleConfoundingEliminated: false;
  };
  readonly authorityBoundary: {
    readonly captureAcceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly poseClassificationIssued: false;
    readonly causalClassificationIssued: false;
    readonly frozenMetricReplaced: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR274_NEXT_FRONTIER;
}

const RAD_TO_DEG = 180 / Math.PI;
const EXPECTED: readonly Readonly<{
  label: FR274ImageLabel;
  condition: FR274Condition;
}>[] = Object.freeze([
  Object.freeze({ label: 'front_1', condition: 'front' }),
  Object.freeze({ label: 'front_2', condition: 'front' }),
  Object.freeze({ label: 'high_1', condition: 'high_angle' }),
  Object.freeze({ label: 'high_2', condition: 'high_angle' }),
  Object.freeze({ label: 'low_1', condition: 'low_angle' }),
  Object.freeze({ label: 'low_2', condition: 'low_angle' }),
]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-274 ' + message);
}

function exactIso(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('generatedAt must be an exact ISO-8601 UTC timestamp.');
  }
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function scalarSummary(values: readonly number[]): FR269ScalarSummary {
  if (values.length !== 2) fail('condition summary requires exactly two values.');
  values.forEach((value, index) => finite(value, 'summary[' + index + ']'));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({
    mean: (values[0]! + values[1]!) / 2,
    min,
    max,
    span: max - min,
  });
}

function validateObservation(
  observation: FR274StillImageScalarObservation,
  expected: Readonly<{ label: FR274ImageLabel; condition: FR274Condition }>,
): void {
  if (
    observation.imageLabel !== expected.label
    || observation.condition !== expected.condition
  ) {
    fail('observations must remain ordered front_1, front_2, high_1, high_2, low_1, low_2.');
  }
  if (
    !Number.isInteger(observation.frameWidth)
    || observation.frameWidth <= 0
    || !Number.isInteger(observation.frameHeight)
    || observation.frameHeight <= 0
  ) {
    fail(observation.imageLabel + ' requires positive integer frame dimensions.');
  }
  const numericFields: readonly (keyof FR274StillImageScalarObservation)[] = [
    'screenSpaceEyeOuterCornerTiltMeanDegrees',
    'fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees',
    'screenMinusFr76Degrees',
    'lateralOrientationRadians',
    'verticalOrientationRadians',
    'relativeRotationFromFirstFrontRadians',
    'inPlaneLateralAxisOrientationRadians',
    'poseUniformScaleComponent',
    'screenFaceBoxWidthFraction',
    'screenFaceBoxHeightFraction',
    'screenFaceBoxAreaFraction',
  ];
  for (const key of numericFields) {
    finite(observation[key] as number, observation.imageLabel + '.' + key);
  }
  const expectedDifference =
    observation.screenSpaceEyeOuterCornerTiltMeanDegrees
    - observation.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees;
  const scale = Math.max(
    1,
    Math.abs(expectedDifference),
    Math.abs(observation.screenMinusFr76Degrees),
  );
  if (
    Math.abs(expectedDifference - observation.screenMinusFr76Degrees)
    > 1e-12 * scale
  ) {
    fail(observation.imageLabel + ' screen-minus-FR76 scalar is inconsistent.');
  }
  if (
    !(observation.poseUniformScaleComponent > 0)
    || !(observation.screenFaceBoxWidthFraction > 0)
    || !(observation.screenFaceBoxHeightFraction > 0)
    || !(observation.screenFaceBoxAreaFraction > 0)
  ) {
    fail(observation.imageLabel + ' geometry scalars must remain positive where required.');
  }
}

function conditionSummary(
  condition: FR274Condition,
  observations: readonly FR274StillImageScalarObservation[],
): FR274ConditionSummary {
  const selected = observations.filter((item) => item.condition === condition);
  if (selected.length !== 2) fail(condition + ' requires exactly two observations.');
  const values = <K extends keyof FR274StillImageScalarObservation>(key: K): number[] =>
    selected.map((item) => {
      const value = item[key];
      if (typeof value !== 'number') fail(String(key) + ' must be numeric.');
      return value;
    });
  const degrees = (key: keyof FR274StillImageScalarObservation) =>
    scalarSummary(values(key).map((value) => value * RAD_TO_DEG));

  return Object.freeze({
    condition,
    imageCount: 2 as const,
    screenSpaceEyeOuterCornerTiltMeanDegrees:
      scalarSummary(values('screenSpaceEyeOuterCornerTiltMeanDegrees')),
    fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees:
      scalarSummary(values('fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees')),
    screenMinusFr76Degrees: scalarSummary(values('screenMinusFr76Degrees')),
    lateralOrientationRadians: scalarSummary(values('lateralOrientationRadians')),
    lateralOrientationDegrees: degrees('lateralOrientationRadians'),
    verticalOrientationRadians: scalarSummary(values('verticalOrientationRadians')),
    verticalOrientationDegrees: degrees('verticalOrientationRadians'),
    relativeRotationFromFirstFrontRadians:
      scalarSummary(values('relativeRotationFromFirstFrontRadians')),
    inPlaneLateralAxisOrientationRadians:
      scalarSummary(values('inPlaneLateralAxisOrientationRadians')),
    inPlaneLateralAxisOrientationDegrees:
      degrees('inPlaneLateralAxisOrientationRadians'),
    poseUniformScaleComponent: scalarSummary(values('poseUniformScaleComponent')),
    screenFaceBoxWidthFraction: scalarSummary(values('screenFaceBoxWidthFraction')),
    screenFaceBoxHeightFraction: scalarSummary(values('screenFaceBoxHeightFraction')),
    screenFaceBoxAreaFraction: scalarSummary(values('screenFaceBoxAreaFraction')),
  });
}

function contrast(
  front: FR274ConditionSummary,
  condition: FR274ConditionSummary,
): FR274FrontRelativeContrast {
  if (front.condition !== 'front') fail('contrast baseline must be front.');
  if (condition.condition === 'front') fail('contrast target must not be front.');
  return Object.freeze({
    condition: condition.condition,
    baselineCondition: 'front' as const,
    deltaMeanScreenSpaceEyeTiltDegrees:
      condition.screenSpaceEyeOuterCornerTiltMeanDegrees.mean
      - front.screenSpaceEyeOuterCornerTiltMeanDegrees.mean,
    deltaMeanFR76EyeTiltDegrees:
      condition.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees.mean
      - front.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees.mean,
    deltaMeanScreenMinusFR76Degrees:
      condition.screenMinusFr76Degrees.mean - front.screenMinusFr76Degrees.mean,
    deltaMeanVerticalOrientationDegrees:
      condition.verticalOrientationDegrees.mean - front.verticalOrientationDegrees.mean,
    deltaMeanLateralOrientationDegrees:
      condition.lateralOrientationDegrees.mean - front.lateralOrientationDegrees.mean,
    deltaMeanInPlaneOrientationDegrees:
      condition.inPlaneLateralAxisOrientationDegrees.mean
      - front.inPlaneLateralAxisOrientationDegrees.mean,
    deltaMeanScreenFaceBoxAreaFraction:
      condition.screenFaceBoxAreaFraction.mean - front.screenFaceBoxAreaFraction.mean,
  });
}

export function buildDeterministicStillImageDiagnosticReportFR274(input: {
  readonly generatedAt: string;
  readonly observations: readonly FR274StillImageScalarObservation[];
}): FR274DeterministicStillImageDiagnosticReport {
  exactIso(input.generatedAt);
  if (input.observations.length !== EXPECTED.length) {
    fail('report requires exactly six fixed still-image observations.');
  }
  input.observations.forEach((observation, index) => {
    const expected = EXPECTED[index];
    if (expected === undefined) fail('unexpected observation index.');
    validateObservation(observation, expected);
  });

  const observations = Object.freeze(
    input.observations.map((observation) => Object.freeze({ ...observation })),
  );
  const front = conditionSummary('front', observations);
  const high = conditionSummary('high_angle', observations);
  const low = conditionSummary('low_angle', observations);

  return Object.freeze({
    schemaVersion: 'fr274-deterministic-still-image-diagnostic-report-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR274_CONTRACT_VERSION,
    authorityState:
      'fixed_still_image_descriptive_diagnostic_only_no_threshold_calibration_correction_or_causal_classification' as const,
    generatedAt: input.generatedAt,
    metricRef: FR237_PRIMARY_METRIC,
    source: Object.freeze({
      runtimePackage: '@mediapipe/tasks-vision@0.10.35' as const,
      runningMode: 'IMAGE' as const,
      inputImageCount: 6 as const,
      exactInputImageReuseSupported: true as const,
    }),
    observations,
    conditions: Object.freeze([front, high, low]) as readonly [
      FR274ConditionSummary,
      FR274ConditionSummary,
      FR274ConditionSummary,
    ],
    frontRelativeContrasts: Object.freeze([
      contrast(front, high),
      contrast(front, low),
    ]) as readonly [
      FR274FrontRelativeContrast,
      FR274FrontRelativeContrast,
    ],
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawImageDigestPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      providerRunRefPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      scalarDiagnosticPersisted: true as const,
    }),
    interpretationBoundary: Object.freeze({
      operatorConditionLabelsAreIndependentPoseVerification: false as const,
      twoImagesPerConditionSupportPopulationGeneralization: false as const,
      viewpointCausalityEstablished: false as const,
      providerInferenceCausalityEstablished: false as const,
      fr76ReconstructionCausalityEstablished: false as const,
      faceScaleConfoundingEliminated: false as const,
    }),
    authorityBoundary: Object.freeze({
      captureAcceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      poseClassificationIssued: false as const,
      causalClassificationIssued: false as const,
      frozenMetricReplaced: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR274_NEXT_FRONTIER,
  });
}
