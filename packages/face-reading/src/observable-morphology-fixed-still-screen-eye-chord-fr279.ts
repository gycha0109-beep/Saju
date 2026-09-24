import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import type { MediaPipeMetricGeometryPointFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { FR257EphemeralGeometryObservation } from './observable-morphology-capture-geometry-attribution-fr257.js';
import type { FR269ScalarSummary } from './observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import type {
  FR274Condition,
  FR274ImageLabel,
} from './observable-morphology-deterministic-still-image-diagnostic-fr274.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR279_CONTRACT_VERSION =
  'FR279-FIXED-STILL-SCREEN-EYE-CHORD-DECOMPOSITION-v1' as const;

export const FR279_NEXT_FRONTIER =
  'rerun_the_exact_six_fixed_stills_then_descriptively_compare_horizontal_span_vs_signed_vertical_rise_contributions_without_threshold_correction_or_causal_claim' as const;

const EPSILON = 1e-12;
const RAD_TO_DEG = 180 / Math.PI;

export interface FR279ScreenEyeChordCycleScalars {
  readonly screenSide: 'screen_left' | 'screen_right';
  readonly horizontalSpanPixels: number;
  readonly horizontalSpanFrameWidthFraction: number;
  readonly signedVerticalRisePixels: number;
  readonly signedVerticalRiseFrameHeightFraction: number;
  readonly angleDegrees: number;
}

export interface FR279SameFrameScreenEyeChordEvidence {
  readonly schemaVersion: 'fr279-same-frame-screen-eye-chord-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR279_CONTRACT_VERSION;
  readonly authorityState:
    'screen_eye_chord_scalar_decomposition_only_no_threshold_calibration_correction_or_metric_replacement';
  readonly providerRunRef: string;
  readonly screenLeftEyeChord: FR279ScreenEyeChordCycleScalars;
  readonly screenRightEyeChord: FR279ScreenEyeChordCycleScalars;
  readonly meanHorizontalSpanPixels: number;
  readonly meanHorizontalSpanFrameWidthFraction: number;
  readonly meanSignedVerticalRisePixels: number;
  readonly meanSignedVerticalRiseFrameHeightFraction: number;
  readonly reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly persistenceBoundary: {
    readonly rawMediaPersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
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

export interface FR279SameFrameScreenEyeChordCollector {
  readonly observe: (observation: FR257EphemeralGeometryObservation) => void;
  readonly takeEvidence: (
    providerRunRef: string,
  ) => FR279SameFrameScreenEyeChordEvidence | null;
  readonly pendingEvidenceCount: () => number;
}

export interface FR279FixedStillObservation {
  readonly imageLabel: FR274ImageLabel;
  readonly condition: FR274Condition;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly screenLeftEyeChord: FR279ScreenEyeChordCycleScalars;
  readonly screenRightEyeChord: FR279ScreenEyeChordCycleScalars;
  readonly meanHorizontalSpanPixels: number;
  readonly meanHorizontalSpanFrameWidthFraction: number;
  readonly meanSignedVerticalRisePixels: number;
  readonly meanSignedVerticalRiseFrameHeightFraction: number;
  readonly lateralOrientationRadians: number;
  readonly verticalOrientationRadians: number;
  readonly inPlaneLateralAxisOrientationRadians: number;
  readonly screenFaceBoxAreaFraction: number;
}

export interface FR279ConditionSummary {
  readonly condition: FR274Condition;
  readonly imageCount: 2;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: FR269ScalarSummary;
  readonly meanHorizontalSpanPixels: FR269ScalarSummary;
  readonly meanHorizontalSpanFrameWidthFraction: FR269ScalarSummary;
  readonly meanSignedVerticalRisePixels: FR269ScalarSummary;
  readonly meanSignedVerticalRiseFrameHeightFraction: FR269ScalarSummary;
  readonly verticalOrientationRadians: FR269ScalarSummary;
  readonly verticalOrientationDegrees: FR269ScalarSummary;
  readonly lateralOrientationRadians: FR269ScalarSummary;
  readonly inPlaneLateralAxisOrientationRadians: FR269ScalarSummary;
  readonly screenFaceBoxAreaFraction: FR269ScalarSummary;
}

export interface FR279FrontRelativeContrast {
  readonly condition: 'high_angle' | 'low_angle';
  readonly baselineCondition: 'front';
  readonly deltaMeanScreenSpaceEyeTiltDegrees: number;
  readonly deltaMeanHorizontalSpanPixels: number;
  readonly deltaMeanHorizontalSpanFrameWidthFraction: number;
  readonly deltaMeanSignedVerticalRisePixels: number;
  readonly deltaMeanSignedVerticalRiseFrameHeightFraction: number;
  readonly deltaMeanVerticalOrientationDegrees: number;
  readonly deltaMeanScreenFaceBoxAreaFraction: number;
}

export interface FR279FixedStillScreenEyeChordReport {
  readonly schemaVersion: 'fr279-fixed-still-screen-eye-chord-report-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR279_CONTRACT_VERSION;
  readonly authorityState:
    'fixed_still_screen_eye_chord_decomposition_descriptive_only_no_threshold_calibration_correction_or_causal_classification';
  readonly generatedAt: string;
  readonly source: {
    readonly runtimePackage: '@mediapipe/tasks-vision@0.10.35';
    readonly runningMode: 'IMAGE';
    readonly inputImageCount: 6;
    readonly exactInputImageReuseSupported: true;
    readonly screenSideSemantics: 'display_coordinates_not_anatomical_left_right';
  };
  readonly observations: readonly FR279FixedStillObservation[];
  readonly conditions: readonly [
    FR279ConditionSummary,
    FR279ConditionSummary,
    FR279ConditionSummary,
  ];
  readonly frontRelativeContrasts: readonly [
    FR279FrontRelativeContrast,
    FR279FrontRelativeContrast,
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
    readonly singleParticipantSupportsPopulationGeneralization: false;
    readonly viewpointCausalityEstablished: false;
    readonly componentDominanceEstablishedBeforeEmpiricalRerun: false;
    readonly horizontalSpanIsCausal: false;
    readonly signedVerticalRiseIsCausal: false;
    readonly faceScaleConfoundingEliminated: false;
  };
  readonly authorityBoundary: {
    readonly poseAcceptanceThresholdIssued: false;
    readonly distanceAcceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly causalClassificationIssued: false;
    readonly frozenMetricReplaced: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR279_NEXT_FRONTIER;
}

type ScreenPoint = Readonly<{ x: number; y: number }>;

const EYE_CYCLE_VERTEX_SETS = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(
      orderClosedCycleProviderVerticesFR16(
        FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol],
      ),
    ),
  ),
);

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
  throw new FaceAuthorityValidationError('FR-279 ' + message);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function exactIso(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('generatedAt must be an exact ISO-8601 UTC timestamp.');
  }
}

function summary(values: readonly number[]): FR269ScalarSummary {
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

function closeEnough(actual: number, expected: number): boolean {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  return Math.abs(actual - expected) <= 1e-12 * scale;
}

export function deriveScreenEyeChordComponentsFR279(input: {
  readonly landmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly frameWidth: number;
  readonly frameHeight: number;
}): Readonly<{
  screenLeftEyeChord: FR279ScreenEyeChordCycleScalars;
  screenRightEyeChord: FR279ScreenEyeChordCycleScalars;
  meanHorizontalSpanPixels: number;
  meanHorizontalSpanFrameWidthFraction: number;
  meanSignedVerticalRisePixels: number;
  meanSignedVerticalRiseFrameHeightFraction: number;
  reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees: number;
}> {
  const { landmarks, frameWidth, frameHeight } = input;
  if (
    landmarks.length !== 468
    || !Number.isInteger(frameWidth)
    || frameWidth <= 0
    || !Number.isInteger(frameHeight)
    || frameHeight <= 0
  ) {
    fail('screen-space eye chord decomposition requires 468 landmarks and positive frame dimensions.');
  }
  landmarks.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
      fail('screenLandmarks[' + index + '] must be finite.');
    }
  });

  const meshMinX = Math.min(...landmarks.map((point) => point.x));
  const meshMaxX = Math.max(...landmarks.map((point) => point.x));
  const meshMidX = (meshMinX + meshMaxX) / 2;
  const descriptors = EYE_CYCLE_VERTEX_SETS.map((vertices) => {
    const points = vertices.map((vertex) => {
      const point = landmarks[vertex];
      if (point === undefined) fail('missing eye vertex ' + vertex + '.');
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

  const cycle = (
    entry: NonNullable<(typeof descriptors)[number]>,
    screenSide: 'screen_left' | 'screen_right',
  ): FR279ScreenEyeChordCycleScalars => {
    const horizontalSpanFrameWidthFraction =
      Math.abs(entry.outerCorner.x - entry.innerCorner.x);
    const signedVerticalRiseFrameHeightFraction =
      entry.innerCorner.y - entry.outerCorner.y;
    const horizontalSpanPixels = horizontalSpanFrameWidthFraction * frameWidth;
    const signedVerticalRisePixels = signedVerticalRiseFrameHeightFraction * frameHeight;
    if (!(horizontalSpanPixels > EPSILON)) fail('screen-space eye chord is degenerate.');
    return Object.freeze({
      screenSide,
      horizontalSpanPixels,
      horizontalSpanFrameWidthFraction,
      signedVerticalRisePixels,
      signedVerticalRiseFrameHeightFraction,
      angleDegrees: Math.atan2(signedVerticalRisePixels, horizontalSpanPixels) * RAD_TO_DEG,
    });
  };

  const screenLeftEyeChord = cycle(ordered[0]!, 'screen_left');
  const screenRightEyeChord = cycle(ordered[1]!, 'screen_right');
  return Object.freeze({
    screenLeftEyeChord,
    screenRightEyeChord,
    meanHorizontalSpanPixels:
      (screenLeftEyeChord.horizontalSpanPixels + screenRightEyeChord.horizontalSpanPixels) / 2,
    meanHorizontalSpanFrameWidthFraction:
      (screenLeftEyeChord.horizontalSpanFrameWidthFraction
        + screenRightEyeChord.horizontalSpanFrameWidthFraction) / 2,
    meanSignedVerticalRisePixels:
      (screenLeftEyeChord.signedVerticalRisePixels + screenRightEyeChord.signedVerticalRisePixels) / 2,
    meanSignedVerticalRiseFrameHeightFraction:
      (screenLeftEyeChord.signedVerticalRiseFrameHeightFraction
        + screenRightEyeChord.signedVerticalRiseFrameHeightFraction) / 2,
    reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees:
      (screenLeftEyeChord.angleDegrees + screenRightEyeChord.angleDegrees) / 2,
  });
}

export function deriveSameFrameScreenEyeChordEvidenceFR279(
  observation: FR257EphemeralGeometryObservation,
): FR279SameFrameScreenEyeChordEvidence {
  const components = deriveScreenEyeChordComponentsFR279({
    landmarks: observation.screenLandmarks,
    frameWidth: observation.frameWidth,
    frameHeight: observation.frameHeight,
  });
  return Object.freeze({
    schemaVersion: 'fr279-same-frame-screen-eye-chord-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR279_CONTRACT_VERSION,
    authorityState:
      'screen_eye_chord_scalar_decomposition_only_no_threshold_calibration_correction_or_metric_replacement' as const,
    providerRunRef: observation.providerRunRef,
    ...components,
    persistenceBoundary: Object.freeze({
      rawMediaPersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
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

export function createSameFrameScreenEyeChordCollectorFR279():
FR279SameFrameScreenEyeChordCollector {
  const pending = new Map<string, FR279SameFrameScreenEyeChordEvidence>();
  return Object.freeze({
    observe(observation: FR257EphemeralGeometryObservation) {
      if (pending.has(observation.providerRunRef)) {
        fail('duplicate providerRunRef component observation.');
      }
      pending.set(
        observation.providerRunRef,
        deriveSameFrameScreenEyeChordEvidenceFR279(observation),
      );
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

function validateCycle(
  cycle: FR279ScreenEyeChordCycleScalars,
  side: 'screen_left' | 'screen_right',
  frameWidth: number,
  frameHeight: number,
): void {
  if (cycle.screenSide !== side) fail('screen-side ordering drift.');
  const fields: readonly (keyof FR279ScreenEyeChordCycleScalars)[] = [
    'horizontalSpanPixels',
    'horizontalSpanFrameWidthFraction',
    'signedVerticalRisePixels',
    'signedVerticalRiseFrameHeightFraction',
    'angleDegrees',
  ];
  for (const key of fields) finite(cycle[key] as number, side + '.' + key);
  if (!(cycle.horizontalSpanPixels > 0) || !(cycle.horizontalSpanFrameWidthFraction > 0)) {
    fail(side + ' horizontal span must be positive.');
  }
  if (!closeEnough(
    cycle.horizontalSpanPixels,
    cycle.horizontalSpanFrameWidthFraction * frameWidth,
  )) {
    fail(side + ' horizontal pixel/fraction identity drift.');
  }
  if (!closeEnough(
    cycle.signedVerticalRisePixels,
    cycle.signedVerticalRiseFrameHeightFraction * frameHeight,
  )) {
    fail(side + ' vertical pixel/fraction identity drift.');
  }
  const angle = Math.atan2(cycle.signedVerticalRisePixels, cycle.horizontalSpanPixels) * RAD_TO_DEG;
  if (!closeEnough(cycle.angleDegrees, angle)) {
    fail(side + ' angle is inconsistent with chord components.');
  }
}

function validateObservation(
  observation: FR279FixedStillObservation,
  expected: Readonly<{ label: FR274ImageLabel; condition: FR274Condition }>,
): void {
  if (observation.imageLabel !== expected.label || observation.condition !== expected.condition) {
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
  validateCycle(observation.screenLeftEyeChord, 'screen_left', observation.frameWidth, observation.frameHeight);
  validateCycle(observation.screenRightEyeChord, 'screen_right', observation.frameWidth, observation.frameHeight);
  const numericFields: readonly (keyof FR279FixedStillObservation)[] = [
    'screenSpaceEyeOuterCornerTiltMeanDegrees',
    'reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees',
    'meanHorizontalSpanPixels',
    'meanHorizontalSpanFrameWidthFraction',
    'meanSignedVerticalRisePixels',
    'meanSignedVerticalRiseFrameHeightFraction',
    'lateralOrientationRadians',
    'verticalOrientationRadians',
    'inPlaneLateralAxisOrientationRadians',
    'screenFaceBoxAreaFraction',
  ];
  for (const key of numericFields) finite(observation[key] as number, observation.imageLabel + '.' + key);
  const left = observation.screenLeftEyeChord;
  const right = observation.screenRightEyeChord;
  const expectedMeanAngle = (left.angleDegrees + right.angleDegrees) / 2;
  if (
    !closeEnough(observation.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees, expectedMeanAngle)
    || !closeEnough(observation.screenSpaceEyeOuterCornerTiltMeanDegrees, expectedMeanAngle)
  ) {
    fail(observation.imageLabel + ' reconstructed angle must exactly match the FR269 screen-space diagnostic.');
  }
  const means: readonly [number, number, string][] = [
    [observation.meanHorizontalSpanPixels,
      (left.horizontalSpanPixels + right.horizontalSpanPixels) / 2,
      'meanHorizontalSpanPixels'],
    [observation.meanHorizontalSpanFrameWidthFraction,
      (left.horizontalSpanFrameWidthFraction + right.horizontalSpanFrameWidthFraction) / 2,
      'meanHorizontalSpanFrameWidthFraction'],
    [observation.meanSignedVerticalRisePixels,
      (left.signedVerticalRisePixels + right.signedVerticalRisePixels) / 2,
      'meanSignedVerticalRisePixels'],
    [observation.meanSignedVerticalRiseFrameHeightFraction,
      (left.signedVerticalRiseFrameHeightFraction + right.signedVerticalRiseFrameHeightFraction) / 2,
      'meanSignedVerticalRiseFrameHeightFraction'],
  ];
  for (const [actual, expectedMean, label] of means) {
    if (!closeEnough(actual, expectedMean)) fail(observation.imageLabel + '.' + label + ' drift.');
  }
  if (!(observation.screenFaceBoxAreaFraction > 0)) {
    fail(observation.imageLabel + ' screenFaceBoxAreaFraction must be positive.');
  }
}

function conditionSummary(
  condition: FR274Condition,
  observations: readonly FR279FixedStillObservation[],
): FR279ConditionSummary {
  const selected = observations.filter((item) => item.condition === condition);
  if (selected.length !== 2) fail(condition + ' requires exactly two observations.');
  const values = <K extends keyof FR279FixedStillObservation>(key: K): number[] =>
    selected.map((item) => {
      const value = item[key];
      if (typeof value !== 'number') fail(String(key) + ' must be numeric.');
      return value;
    });
  return Object.freeze({
    condition,
    imageCount: 2 as const,
    screenSpaceEyeOuterCornerTiltMeanDegrees:
      summary(values('screenSpaceEyeOuterCornerTiltMeanDegrees')),
    meanHorizontalSpanPixels: summary(values('meanHorizontalSpanPixels')),
    meanHorizontalSpanFrameWidthFraction: summary(values('meanHorizontalSpanFrameWidthFraction')),
    meanSignedVerticalRisePixels: summary(values('meanSignedVerticalRisePixels')),
    meanSignedVerticalRiseFrameHeightFraction:
      summary(values('meanSignedVerticalRiseFrameHeightFraction')),
    verticalOrientationRadians: summary(values('verticalOrientationRadians')),
    verticalOrientationDegrees:
      summary(values('verticalOrientationRadians').map((value) => value * RAD_TO_DEG)),
    lateralOrientationRadians: summary(values('lateralOrientationRadians')),
    inPlaneLateralAxisOrientationRadians:
      summary(values('inPlaneLateralAxisOrientationRadians')),
    screenFaceBoxAreaFraction: summary(values('screenFaceBoxAreaFraction')),
  });
}

function contrast(
  front: FR279ConditionSummary,
  condition: FR279ConditionSummary,
): FR279FrontRelativeContrast {
  if (front.condition !== 'front') fail('contrast baseline must be front.');
  if (condition.condition === 'front') fail('contrast target must not be front.');
  return Object.freeze({
    condition: condition.condition,
    baselineCondition: 'front' as const,
    deltaMeanScreenSpaceEyeTiltDegrees:
      condition.screenSpaceEyeOuterCornerTiltMeanDegrees.mean
      - front.screenSpaceEyeOuterCornerTiltMeanDegrees.mean,
    deltaMeanHorizontalSpanPixels:
      condition.meanHorizontalSpanPixels.mean - front.meanHorizontalSpanPixels.mean,
    deltaMeanHorizontalSpanFrameWidthFraction:
      condition.meanHorizontalSpanFrameWidthFraction.mean
      - front.meanHorizontalSpanFrameWidthFraction.mean,
    deltaMeanSignedVerticalRisePixels:
      condition.meanSignedVerticalRisePixels.mean - front.meanSignedVerticalRisePixels.mean,
    deltaMeanSignedVerticalRiseFrameHeightFraction:
      condition.meanSignedVerticalRiseFrameHeightFraction.mean
      - front.meanSignedVerticalRiseFrameHeightFraction.mean,
    deltaMeanVerticalOrientationDegrees:
      condition.verticalOrientationDegrees.mean - front.verticalOrientationDegrees.mean,
    deltaMeanScreenFaceBoxAreaFraction:
      condition.screenFaceBoxAreaFraction.mean - front.screenFaceBoxAreaFraction.mean,
  });
}

export function buildFixedStillScreenEyeChordReportFR279(input: {
  readonly generatedAt: string;
  readonly observations: readonly FR279FixedStillObservation[];
}): FR279FixedStillScreenEyeChordReport {
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
    input.observations.map((observation) => Object.freeze({
      ...observation,
      screenLeftEyeChord: Object.freeze({ ...observation.screenLeftEyeChord }),
      screenRightEyeChord: Object.freeze({ ...observation.screenRightEyeChord }),
    })),
  );
  const front = conditionSummary('front', observations);
  const high = conditionSummary('high_angle', observations);
  const low = conditionSummary('low_angle', observations);
  return Object.freeze({
    schemaVersion: 'fr279-fixed-still-screen-eye-chord-report-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR279_CONTRACT_VERSION,
    authorityState:
      'fixed_still_screen_eye_chord_decomposition_descriptive_only_no_threshold_calibration_correction_or_causal_classification' as const,
    generatedAt: input.generatedAt,
    source: Object.freeze({
      runtimePackage: '@mediapipe/tasks-vision@0.10.35' as const,
      runningMode: 'IMAGE' as const,
      inputImageCount: 6 as const,
      exactInputImageReuseSupported: true as const,
      screenSideSemantics: 'display_coordinates_not_anatomical_left_right' as const,
    }),
    observations,
    conditions: Object.freeze([front, high, low]) as readonly [
      FR279ConditionSummary,
      FR279ConditionSummary,
      FR279ConditionSummary,
    ],
    frontRelativeContrasts: Object.freeze([
      contrast(front, high),
      contrast(front, low),
    ]) as readonly [FR279FrontRelativeContrast, FR279FrontRelativeContrast],
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
      singleParticipantSupportsPopulationGeneralization: false as const,
      viewpointCausalityEstablished: false as const,
      componentDominanceEstablishedBeforeEmpiricalRerun: false as const,
      horizontalSpanIsCausal: false as const,
      signedVerticalRiseIsCausal: false as const,
      faceScaleConfoundingEliminated: false as const,
    }),
    authorityBoundary: Object.freeze({
      poseAcceptanceThresholdIssued: false as const,
      distanceAcceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      causalClassificationIssued: false as const,
      frozenMetricReplaced: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR279_NEXT_FRONTIER,
  });
}
