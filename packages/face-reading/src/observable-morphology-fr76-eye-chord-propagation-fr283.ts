import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  reimplementMediaPipeScreenToMetricFR76,
  solveWeightedOrthogonalProblemFR76,
  type MediaPipeMetricGeometryPointFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  deriveScreenEyeChordComponentsFR279,
} from './observable-morphology-fixed-still-screen-eye-chord-fr279.js';
import {
  deriveMetricEyeChordComponentsFR281,
} from './observable-morphology-fixed-still-metric-eye-chord-fr281.js';
import type {
  FR257EphemeralGeometryObservation,
} from './observable-morphology-capture-geometry-attribution-fr257.js';
import type {
  FR269ScalarSummary,
} from './observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import type {
  FR274Condition,
  FR274ImageLabel,
} from './observable-morphology-deterministic-still-image-diagnostic-fr274.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR283_CONTRACT_VERSION =
  'FR283-FIXED-STILL-FR76-EYE-CHORD-PROPAGATION-v1' as const;

export const FR283_NEXT_FRONTIER =
  'handoff_the_localized_rgb_viewpoint_sensitivity_to_feature_authority_consumers_without_designing_a_correction_in_fr283' as const;

const EPSILON = 1e-12;
const RAD_TO_DEG = 180 / Math.PI;
const NEAR_PLANE_CENTIMETERS = 1;
const VERTICAL_FOV_DEGREES = 63;

export type FR283StageKey =
  | 'screen_pixels_y_up'
  | 'projected_near_plane'
  | 'first_intermediate'
  | 'second_intermediate'
  | 'runtime_metric_pre_pose'
  | 'canonical_metric_post_pose';

export type FR283StageUnit =
  | 'pixel'
  | 'virtual_camera_near_plane_unit'
  | 'fr76_internal_coordinate_unit'
  | 'centimeter';

export interface FR283EyeChordStageScalars {
  readonly stage: FR283StageKey;
  readonly unit: FR283StageUnit;
  readonly meanHorizontalSpan: number;
  readonly meanSignedVerticalRise: number;
  readonly meanAngleDegrees: number;
}

export interface FR283FR76ScaleScalars {
  readonly firstIterationScale: number;
  readonly secondIterationScale: number;
  readonly totalScale: number;
}

export interface FR283SameFramePropagationEvidence {
  readonly schemaVersion: 'fr283-same-frame-fr76-eye-chord-propagation-v1';
  readonly contractVersion: typeof FR283_CONTRACT_VERSION;
  readonly authorityState:
    'fr76_internal_eye_chord_propagation_descriptive_only_no_correction_or_metric_replacement';
  readonly providerRunRef: string;
  readonly stages: readonly [
    FR283EyeChordStageScalars,
    FR283EyeChordStageScalars,
    FR283EyeChordStageScalars,
    FR283EyeChordStageScalars,
    FR283EyeChordStageScalars,
    FR283EyeChordStageScalars,
  ];
  readonly scales: FR283FR76ScaleScalars;
  readonly exactness: {
    readonly tracedFinalMetricMatchesFR76: true;
    readonly tracedPoseMatchesFR76: true;
    readonly screenStageMatchesFR279: true;
    readonly canonicalStageMatchesFR281: true;
    readonly sameFrameFR257MetricMatchesTrace: true;
    readonly sameFrameFR257PoseMatchesTrace: true;
  };
  readonly persistenceBoundary: {
    readonly rawScreenLandmarksPersisted: false;
    readonly rawIntermediateLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly scalarStageDiagnosticsPersisted: true;
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

export interface FR283SameFramePropagationCollector {
  readonly observe: (observation: FR257EphemeralGeometryObservation) => void;
  readonly takeEvidence: (providerRunRef: string) => FR283SameFramePropagationEvidence | null;
  readonly pendingEvidenceCount: () => number;
}

export interface FR283FixedStillObservation {
  readonly imageLabel: FR274ImageLabel;
  readonly condition: FR274Condition;
  readonly verticalOrientationRadians: number;
  readonly screenFaceBoxAreaFraction: number;
  readonly stages: FR283SameFramePropagationEvidence['stages'];
  readonly scales: FR283FR76ScaleScalars;
}

export interface FR283StageConditionSummary {
  readonly stage: FR283StageKey;
  readonly unit: FR283StageUnit;
  readonly meanHorizontalSpan: FR269ScalarSummary;
  readonly meanSignedVerticalRise: FR269ScalarSummary;
  readonly meanAngleDegrees: FR269ScalarSummary;
}

export interface FR283ConditionSummary {
  readonly condition: FR274Condition;
  readonly imageCount: 2;
  readonly stages: readonly FR283StageConditionSummary[];
  readonly firstIterationScale: FR269ScalarSummary;
  readonly secondIterationScale: FR269ScalarSummary;
  readonly totalScale: FR269ScalarSummary;
  readonly verticalOrientationDegrees: FR269ScalarSummary;
  readonly screenFaceBoxAreaFraction: FR269ScalarSummary;
}

export interface FR283StageFrontRelativeContrast {
  readonly stage: FR283StageKey;
  readonly unit: FR283StageUnit;
  readonly deltaMeanHorizontalSpan: number;
  readonly deltaMeanHorizontalSpanPercentOfFront: number | null;
  readonly deltaMeanSignedVerticalRise: number;
  readonly deltaMeanSignedVerticalRisePercentOfFront: number | null;
  readonly deltaMeanAngleDegrees: number;
}

export interface FR283FrontRelativeContrast {
  readonly condition: 'high_angle' | 'low_angle';
  readonly baselineCondition: 'front';
  readonly stages: readonly FR283StageFrontRelativeContrast[];
  readonly deltaFirstIterationScale: number;
  readonly deltaSecondIterationScale: number;
  readonly deltaTotalScale: number;
  readonly deltaVerticalOrientationDegrees: number;
  readonly deltaScreenFaceBoxAreaFraction: number;
}

export interface FR283FixedStillPropagationReport {
  readonly schemaVersion: 'fr283-fixed-still-fr76-eye-chord-propagation-report-v1';
  readonly contractVersion: typeof FR283_CONTRACT_VERSION;
  readonly authorityState:
    'fixed_still_fr76_stage_propagation_descriptive_only_no_threshold_calibration_correction_or_causal_classification';
  readonly generatedAt: string;
  readonly source: {
    readonly runtimePackage: '@mediapipe/tasks-vision@0.10.35';
    readonly runningMode: 'IMAGE';
    readonly inputImageCount: 6;
    readonly exactInputImageReuseSupported: true;
    readonly fr76VerticalFovDegrees: 63;
    readonly fr76NearPlaneCentimeters: 1;
  };
  readonly observations: readonly FR283FixedStillObservation[];
  readonly conditions: readonly [
    FR283ConditionSummary,
    FR283ConditionSummary,
    FR283ConditionSummary,
  ];
  readonly frontRelativeContrasts: readonly [
    FR283FrontRelativeContrast,
    FR283FrontRelativeContrast,
  ];
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawImageDigestPersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawIntermediateLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly providerRunRefPersisted: false;
    readonly biometricEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly scalarStageDiagnosticsPersisted: true;
  };
  readonly interpretationBoundary: {
    readonly singleParticipantSupportsPopulationGeneralization: false;
    readonly viewpointCausalityEstablished: false;
    readonly internalStageMechanismEstablishedAsCausal: false;
    readonly correctionAuthorized: false;
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
  readonly nextFrontier: typeof FR283_NEXT_FRONTIER;
}

type Matrix4 = number[];

const EYE_CYCLE_VERTEX_SETS = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(
      orderClosedCycleProviderVerticesFR16(
        FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol],
      ),
    ),
  ),
);

const EXPECTED = Object.freeze([
  Object.freeze({ imageLabel: 'front_1', condition: 'front' }),
  Object.freeze({ imageLabel: 'front_2', condition: 'front' }),
  Object.freeze({ imageLabel: 'high_1', condition: 'high_angle' }),
  Object.freeze({ imageLabel: 'high_2', condition: 'high_angle' }),
  Object.freeze({ imageLabel: 'low_1', condition: 'low_angle' }),
  Object.freeze({ imageLabel: 'low_2', condition: 'low_angle' }),
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-283 ' + message);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function closeEnough(actual: number, expected: number): boolean {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  return Math.abs(actual - expected) <= EPSILON * scale;
}

function validatePoint(
  point: MediaPipeMetricGeometryPointFR76V1,
  label: string,
): void {
  finite(point.x, label + '.x');
  finite(point.y, label + '.y');
  finite(point.z, label + '.z');
}

function determinant3(matrix: readonly number[]): number {
  return (
    matrix[0]! * (matrix[4]! * matrix[8]! - matrix[5]! * matrix[7]!)
    - matrix[1]! * (matrix[3]! * matrix[8]! - matrix[5]! * matrix[6]!)
    + matrix[2]! * (matrix[3]! * matrix[7]! - matrix[4]! * matrix[6]!)
  );
}

function multiplyMatrix3Vector(
  matrix: readonly number[],
  vector: readonly number[],
): [number, number, number] {
  return [
    matrix[0]! * vector[0]! + matrix[1]! * vector[1]! + matrix[2]! * vector[2]!,
    matrix[3]! * vector[0]! + matrix[4]! * vector[1]! + matrix[5]! * vector[2]!,
    matrix[6]! * vector[0]! + matrix[7]! * vector[1]! + matrix[8]! * vector[2]!,
  ];
}

function matrix4Scale(matrix: readonly number[]): number {
  return Math.hypot(matrix[0]!, matrix[4]!, matrix[8]!);
}

function inverseAffineMatrix4(matrix: readonly number[]): Matrix4 {
  const a = [
    matrix[0]!, matrix[1]!, matrix[2]!,
    matrix[4]!, matrix[5]!, matrix[6]!,
    matrix[8]!, matrix[9]!, matrix[10]!,
  ];
  const determinant = determinant3(a);
  if (Math.abs(determinant) <= EPSILON) fail('pose transform matrix is singular.');
  const inverseDeterminant = 1 / determinant;
  const inverseA = [
    (a[4]! * a[8]! - a[5]! * a[7]!) * inverseDeterminant,
    (a[2]! * a[7]! - a[1]! * a[8]!) * inverseDeterminant,
    (a[1]! * a[5]! - a[2]! * a[4]!) * inverseDeterminant,
    (a[5]! * a[6]! - a[3]! * a[8]!) * inverseDeterminant,
    (a[0]! * a[8]! - a[2]! * a[6]!) * inverseDeterminant,
    (a[2]! * a[3]! - a[0]! * a[5]!) * inverseDeterminant,
    (a[3]! * a[7]! - a[4]! * a[6]!) * inverseDeterminant,
    (a[1]! * a[6]! - a[0]! * a[7]!) * inverseDeterminant,
    (a[0]! * a[4]! - a[1]! * a[3]!) * inverseDeterminant,
  ];
  const translation = [matrix[3]!, matrix[7]!, matrix[11]!] as const;
  const inverseTranslationRaw = multiplyMatrix3Vector(inverseA, translation);
  const inverseTranslation = inverseTranslationRaw.map((value) => -value);
  return [
    inverseA[0]!, inverseA[1]!, inverseA[2]!, inverseTranslation[0]!,
    inverseA[3]!, inverseA[4]!, inverseA[5]!, inverseTranslation[1]!,
    inverseA[6]!, inverseA[7]!, inverseA[8]!, inverseTranslation[2]!,
    0, 0, 0, 1,
  ];
}

function transformPoint(
  matrix: readonly number[],
  point: MediaPipeMetricGeometryPointFR76V1,
): MediaPipeMetricGeometryPointFR76V1 {
  return {
    x: matrix[0]! * point.x + matrix[1]! * point.y + matrix[2]! * point.z + matrix[3]!,
    y: matrix[4]! * point.x + matrix[5]! * point.y + matrix[6]! * point.z + matrix[7]!,
    z: matrix[8]! * point.x + matrix[9]! * point.y + matrix[10]! * point.z + matrix[11]!,
  };
}

function packMatrixColumnMajor(matrix: readonly number[]): readonly number[] {
  return Object.freeze([
    matrix[0]!, matrix[4]!, matrix[8]!, matrix[12]!,
    matrix[1]!, matrix[5]!, matrix[9]!, matrix[13]!,
    matrix[2]!, matrix[6]!, matrix[10]!, matrix[14]!,
    matrix[3]!, matrix[7]!, matrix[11]!, matrix[15]!,
  ]);
}

function uniqueExtremum(
  points: readonly MediaPipeMetricGeometryPointFR76V1[],
  direction: 'min' | 'max',
): MediaPipeMetricGeometryPointFR76V1 | null {
  const target = direction === 'min'
    ? Math.min(...points.map((point) => point.x))
    : Math.max(...points.map((point) => point.x));
  const matches = points.filter((point) => Math.abs(point.x - target) <= EPSILON);
  return matches.length === 1 ? matches[0]! : null;
}

function chordStage(
  stage: FR283StageKey,
  unit: FR283StageUnit,
  landmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
): FR283EyeChordStageScalars {
  if (landmarks.length !== 468) fail(stage + ' requires exactly 468 points.');
  landmarks.forEach((point, index) => validatePoint(point, stage + '[' + index + ']'));

  const xs = landmarks.map((point) => point.x);
  const meshMinX = Math.min(...xs);
  const meshMaxX = Math.max(...xs);
  if (!(meshMaxX - meshMinX > EPSILON)) fail(stage + ' mesh X span must be positive.');
  const meshMidX = (meshMinX + meshMaxX) / 2;

  const descriptors = EYE_CYCLE_VERTEX_SETS.map((vertices) => {
    const points = vertices.map((vertex) => {
      const point = landmarks[vertex];
      if (point === undefined) fail(stage + ' missing eye vertex ' + vertex + '.');
      return point;
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
    fail(stage + ' eye-cycle extrema are ambiguous.');
  }
  const ordered = (descriptors as NonNullable<(typeof descriptors)[number]>[])
    .sort((left, right) => left.centroidX - right.centroidX);
  if (
    ordered.length !== 2
    || (ordered[0]!.centroidX < meshMidX) === (ordered[1]!.centroidX < meshMidX)
  ) {
    fail(stage + ' eye cycles are not bilateral around mesh midline.');
  }

  const one = (entry: NonNullable<(typeof descriptors)[number]>) => {
    const horizontalSpan = Math.abs(entry.outerCorner.x - entry.innerCorner.x);
    const signedVerticalRise = entry.outerCorner.y - entry.innerCorner.y;
    if (!(horizontalSpan > EPSILON)) fail(stage + ' eye chord is degenerate.');
    return Object.freeze({
      horizontalSpan,
      signedVerticalRise,
      angleDegrees: Math.atan2(signedVerticalRise, horizontalSpan) * RAD_TO_DEG,
    });
  };
  const negative = one(ordered[0]!);
  const positive = one(ordered[1]!);

  return Object.freeze({
    stage,
    unit,
    meanHorizontalSpan: (negative.horizontalSpan + positive.horizontalSpan) / 2,
    meanSignedVerticalRise: (negative.signedVerticalRise + positive.signedVerticalRise) / 2,
    meanAngleDegrees: (negative.angleDegrees + positive.angleDegrees) / 2,
  });
}

function assertPointSequenceClose(
  actual: readonly MediaPipeMetricGeometryPointFR76V1[],
  expected: readonly MediaPipeMetricGeometryPointFR76V1[],
  label: string,
): void {
  if (actual.length !== expected.length) fail(label + ' cardinality mismatch.');
  for (let index = 0; index < actual.length; index += 1) {
    const left = actual[index]!;
    const right = expected[index]!;
    if (
      !closeEnough(left.x, right.x)
      || !closeEnough(left.y, right.y)
      || !closeEnough(left.z, right.z)
    ) {
      fail(label + ' point mismatch at index ' + index + '.');
    }
  }
}

function assertNumberSequenceClose(
  actual: readonly number[],
  expected: readonly number[],
  label: string,
): void {
  if (actual.length !== expected.length) fail(label + ' cardinality mismatch.');
  for (let index = 0; index < actual.length; index += 1) {
    if (!closeEnough(actual[index]!, expected[index]!)) {
      fail(label + ' mismatch at index ' + index + '.');
    }
  }
}

export function traceFR76EyeChordPropagationFR283(input: {
  readonly screenLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly canonicalMetricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly landmarkWeights: readonly number[];
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly expectedSameFrameMetricLandmarks?: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly expectedSameFramePoseTransformMatrixPackedColumnMajor?: readonly number[];
}): Omit<FR283SameFramePropagationEvidence, 'providerRunRef'> {
  if (
    input.screenLandmarks.length !== 468
    || input.canonicalMetricLandmarks.length !== 468
    || input.landmarkWeights.length !== 468
  ) {
    fail('screen/canonical/weight inputs must each contain exactly 468 entries.');
  }
  if (
    !Number.isInteger(input.frameWidth)
    || input.frameWidth <= 0
    || !Number.isInteger(input.frameHeight)
    || input.frameHeight <= 0
  ) {
    fail('frame dimensions must be positive integers.');
  }

  const screenPixelsYUp = input.screenLandmarks.map((point) => Object.freeze({
    x: point.x * input.frameWidth,
    y: (1 - point.y) * input.frameHeight,
    z: point.z * input.frameWidth,
  }));

  const verticalFovRadians = VERTICAL_FOV_DEGREES * Math.PI / 180;
  const heightAtNear = 2 * NEAR_PLANE_CENTIMETERS * Math.tan(0.5 * verticalFovRadians);
  const widthAtNear = input.frameWidth * heightAtNear / input.frameHeight;
  const left = -0.5 * widthAtNear;
  const bottom = -0.5 * heightAtNear;

  const projected = input.screenLandmarks.map((point) => Object.freeze({
    x: point.x * widthAtNear + left,
    y: (1 - point.y) * heightAtNear + bottom,
    z: point.z * widthAtNear,
  }));
  const depthOffset = projected.reduce((sum, point) => sum + point.z, 0) / projected.length;

  const firstIntermediate = projected.map((point) => Object.freeze({
    x: point.x,
    y: point.y,
    z: -point.z,
  }));
  const firstPose = solveWeightedOrthogonalProblemFR76(
    input.canonicalMetricLandmarks,
    firstIntermediate,
    input.landmarkWeights,
  );
  const firstIterationScale = matrix4Scale(firstPose);

  const secondIntermediate = projected.map((point) => {
    const z = (point.z - depthOffset + NEAR_PLANE_CENTIMETERS) / firstIterationScale;
    return Object.freeze({
      x: (point.x * z) / NEAR_PLANE_CENTIMETERS,
      y: (point.y * z) / NEAR_PLANE_CENTIMETERS,
      z: -z,
    });
  });
  const secondPose = solveWeightedOrthogonalProblemFR76(
    input.canonicalMetricLandmarks,
    secondIntermediate,
    input.landmarkWeights,
  );
  const secondIterationScale = matrix4Scale(secondPose);
  const totalScale = firstIterationScale * secondIterationScale;

  const runtimeMetricPrePose = projected.map((point) => {
    const z = (point.z - depthOffset + NEAR_PLANE_CENTIMETERS) / totalScale;
    return Object.freeze({
      x: (point.x * z) / NEAR_PLANE_CENTIMETERS,
      y: (point.y * z) / NEAR_PLANE_CENTIMETERS,
      z: -z,
    });
  });
  const poseTransform = solveWeightedOrthogonalProblemFR76(
    input.canonicalMetricLandmarks,
    runtimeMetricPrePose,
    input.landmarkWeights,
  );
  const packedPose = packMatrixColumnMajor(poseTransform);
  const inversePose = inverseAffineMatrix4(poseTransform);
  const canonicalMetricPostPose = runtimeMetricPrePose.map((point) =>
    Object.freeze(transformPoint(inversePose, point)));

  const official = reimplementMediaPipeScreenToMetricFR76({
    screenLandmarks: input.screenLandmarks,
    canonicalMetricLandmarks: input.canonicalMetricLandmarks,
    landmarkWeights: input.landmarkWeights,
    frameWidth: input.frameWidth,
    frameHeight: input.frameHeight,
  });
  assertPointSequenceClose(
    canonicalMetricPostPose,
    official.metricLandmarks,
    'traced final metric vs FR76',
  );
  assertNumberSequenceClose(
    packedPose,
    official.poseTransformMatrixPackedColumnMajor,
    'traced pose vs FR76',
  );
  if (
    !closeEnough(firstIterationScale, official.firstIterationScale)
    || !closeEnough(secondIterationScale, official.secondIterationScale)
    || !closeEnough(totalScale, official.totalScale)
  ) {
    fail('traced iteration scales drifted from FR76.');
  }

  if (input.expectedSameFrameMetricLandmarks !== undefined) {
    assertPointSequenceClose(
      canonicalMetricPostPose,
      input.expectedSameFrameMetricLandmarks,
      'traced final metric vs FR257 same-frame metric',
    );
  }
  if (input.expectedSameFramePoseTransformMatrixPackedColumnMajor !== undefined) {
    assertNumberSequenceClose(
      packedPose,
      input.expectedSameFramePoseTransformMatrixPackedColumnMajor,
      'traced pose vs FR257 same-frame pose',
    );
  }

  const stages = Object.freeze([
    chordStage('screen_pixels_y_up', 'pixel', screenPixelsYUp),
    chordStage('projected_near_plane', 'virtual_camera_near_plane_unit', projected),
    chordStage('first_intermediate', 'virtual_camera_near_plane_unit', firstIntermediate),
    chordStage('second_intermediate', 'fr76_internal_coordinate_unit', secondIntermediate),
    chordStage('runtime_metric_pre_pose', 'fr76_internal_coordinate_unit', runtimeMetricPrePose),
    chordStage('canonical_metric_post_pose', 'centimeter', canonicalMetricPostPose),
  ]) as FR283SameFramePropagationEvidence['stages'];

  const screen = deriveScreenEyeChordComponentsFR279({
    landmarks: input.screenLandmarks,
    frameWidth: input.frameWidth,
    frameHeight: input.frameHeight,
  });
  const canonical = deriveMetricEyeChordComponentsFR281(official.metricLandmarks);
  if (!closeEnough(
    stages[0].meanAngleDegrees,
    screen.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees,
  )) {
    fail('screen stage angle drifted from FR279.');
  }
  if (!closeEnough(
    stages[5].meanAngleDegrees,
    canonical.reconstructedFR76EyeOuterCornerTiltMeanDegrees,
  )) {
    fail('canonical stage angle drifted from FR281.');
  }

  return Object.freeze({
    schemaVersion: 'fr283-same-frame-fr76-eye-chord-propagation-v1' as const,
    contractVersion: FR283_CONTRACT_VERSION,
    authorityState:
      'fr76_internal_eye_chord_propagation_descriptive_only_no_correction_or_metric_replacement' as const,
    stages,
    scales: Object.freeze({
      firstIterationScale,
      secondIterationScale,
      totalScale,
    }),
    exactness: Object.freeze({
      tracedFinalMetricMatchesFR76: true as const,
      tracedPoseMatchesFR76: true as const,
      screenStageMatchesFR279: true as const,
      canonicalStageMatchesFR281: true as const,
      sameFrameFR257MetricMatchesTrace: true as const,
      sameFrameFR257PoseMatchesTrace: true as const,
    }),
    persistenceBoundary: Object.freeze({
      rawScreenLandmarksPersisted: false as const,
      rawIntermediateLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarStageDiagnosticsPersisted: true as const,
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

export function createSameFrameFR76EyeChordPropagationCollectorFR283(input: {
  readonly canonicalMetricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly landmarkWeights: readonly number[];
}): FR283SameFramePropagationCollector {
  if (input.canonicalMetricLandmarks.length !== 468 || input.landmarkWeights.length !== 468) {
    fail('collector requires exactly 468 canonical landmarks and weights.');
  }
  const pending = new Map<string, FR283SameFramePropagationEvidence>();
  return Object.freeze({
    observe(observation: FR257EphemeralGeometryObservation) {
      if (pending.has(observation.providerRunRef)) {
        fail('duplicate providerRunRef propagation observation.');
      }
      const evidence = traceFR76EyeChordPropagationFR283({
        screenLandmarks: observation.screenLandmarks,
        canonicalMetricLandmarks: input.canonicalMetricLandmarks,
        landmarkWeights: input.landmarkWeights,
        frameWidth: observation.frameWidth,
        frameHeight: observation.frameHeight,
        expectedSameFrameMetricLandmarks: observation.metricLandmarks,
        expectedSameFramePoseTransformMatrixPackedColumnMajor:
          observation.poseTransformMatrixPackedColumnMajor,
      });
      pending.set(observation.providerRunRef, Object.freeze({
        ...evidence,
        providerRunRef: observation.providerRunRef,
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

function validateStageOrder(stages: readonly FR283EyeChordStageScalars[]): void {
  const expected: readonly FR283StageKey[] = [
    'screen_pixels_y_up',
    'projected_near_plane',
    'first_intermediate',
    'second_intermediate',
    'runtime_metric_pre_pose',
    'canonical_metric_post_pose',
  ];
  if (
    stages.length !== expected.length
    || stages.some((stage, index) => stage.stage !== expected[index])
  ) {
    fail('stage ordering drift.');
  }
  stages.forEach((stage) => {
    finite(stage.meanHorizontalSpan, stage.stage + '.meanHorizontalSpan');
    finite(stage.meanSignedVerticalRise, stage.stage + '.meanSignedVerticalRise');
    finite(stage.meanAngleDegrees, stage.stage + '.meanAngleDegrees');
    if (!(stage.meanHorizontalSpan > EPSILON)) {
      fail(stage.stage + ' mean horizontal span must be positive.');
    }
  });
}

function validateObservation(
  observation: FR283FixedStillObservation,
  expected: (typeof EXPECTED)[number],
): void {
  if (
    observation.imageLabel !== expected.imageLabel
    || observation.condition !== expected.condition
  ) {
    fail('observations must remain ordered front_1, front_2, high_1, high_2, low_1, low_2.');
  }
  validateStageOrder(observation.stages);
  finite(observation.scales.firstIterationScale, observation.imageLabel + '.firstIterationScale');
  finite(observation.scales.secondIterationScale, observation.imageLabel + '.secondIterationScale');
  finite(observation.scales.totalScale, observation.imageLabel + '.totalScale');
  if (!closeEnough(
    observation.scales.totalScale,
    observation.scales.firstIterationScale * observation.scales.secondIterationScale,
  )) {
    fail(observation.imageLabel + ' totalScale identity drift.');
  }
  finite(observation.verticalOrientationRadians, observation.imageLabel + '.verticalOrientationRadians');
  if (!(finite(
    observation.screenFaceBoxAreaFraction,
    observation.imageLabel + '.screenFaceBoxAreaFraction',
  ) > 0)) {
    fail(observation.imageLabel + ' screen face-box area must be positive.');
  }
}

function conditionSummary(
  condition: FR274Condition,
  observations: readonly FR283FixedStillObservation[],
): FR283ConditionSummary {
  const selected = observations.filter((item) => item.condition === condition);
  if (selected.length !== 2) fail(condition + ' requires exactly two observations.');

  const stages = selected[0]!.stages.map((reference, stageIndex) => {
    const stageValues = selected.map((item) => item.stages[stageIndex]!);
    if (stageValues.some((stage) => stage.stage !== reference.stage || stage.unit !== reference.unit)) {
      fail(condition + ' stage semantics drift.');
    }
    return Object.freeze({
      stage: reference.stage,
      unit: reference.unit,
      meanHorizontalSpan: summary(stageValues.map((stage) => stage.meanHorizontalSpan)),
      meanSignedVerticalRise: summary(stageValues.map((stage) => stage.meanSignedVerticalRise)),
      meanAngleDegrees: summary(stageValues.map((stage) => stage.meanAngleDegrees)),
    });
  });

  return Object.freeze({
    condition,
    imageCount: 2 as const,
    stages: Object.freeze(stages),
    firstIterationScale: summary(selected.map((item) => item.scales.firstIterationScale)),
    secondIterationScale: summary(selected.map((item) => item.scales.secondIterationScale)),
    totalScale: summary(selected.map((item) => item.scales.totalScale)),
    verticalOrientationDegrees:
      summary(selected.map((item) => item.verticalOrientationRadians * RAD_TO_DEG)),
    screenFaceBoxAreaFraction:
      summary(selected.map((item) => item.screenFaceBoxAreaFraction)),
  });
}

function percentDelta(target: number, baseline: number): number | null {
  if (Math.abs(baseline) <= EPSILON) return null;
  return (target - baseline) / Math.abs(baseline) * 100;
}

function contrast(
  front: FR283ConditionSummary,
  target: FR283ConditionSummary,
): FR283FrontRelativeContrast {
  if (front.condition !== 'front' || target.condition === 'front') {
    fail('front-relative contrast semantics drift.');
  }
  const stages = front.stages.map((baseline, index) => {
    const current = target.stages[index]!;
    if (baseline.stage !== current.stage || baseline.unit !== current.unit) {
      fail('front-relative stage semantics drift.');
    }
    return Object.freeze({
      stage: baseline.stage,
      unit: baseline.unit,
      deltaMeanHorizontalSpan:
        current.meanHorizontalSpan.mean - baseline.meanHorizontalSpan.mean,
      deltaMeanHorizontalSpanPercentOfFront:
        percentDelta(current.meanHorizontalSpan.mean, baseline.meanHorizontalSpan.mean),
      deltaMeanSignedVerticalRise:
        current.meanSignedVerticalRise.mean - baseline.meanSignedVerticalRise.mean,
      deltaMeanSignedVerticalRisePercentOfFront:
        percentDelta(current.meanSignedVerticalRise.mean, baseline.meanSignedVerticalRise.mean),
      deltaMeanAngleDegrees:
        current.meanAngleDegrees.mean - baseline.meanAngleDegrees.mean,
    });
  });
  return Object.freeze({
    condition: target.condition as 'high_angle' | 'low_angle',
    baselineCondition: 'front' as const,
    stages: Object.freeze(stages),
    deltaFirstIterationScale:
      target.firstIterationScale.mean - front.firstIterationScale.mean,
    deltaSecondIterationScale:
      target.secondIterationScale.mean - front.secondIterationScale.mean,
    deltaTotalScale:
      target.totalScale.mean - front.totalScale.mean,
    deltaVerticalOrientationDegrees:
      target.verticalOrientationDegrees.mean - front.verticalOrientationDegrees.mean,
    deltaScreenFaceBoxAreaFraction:
      target.screenFaceBoxAreaFraction.mean - front.screenFaceBoxAreaFraction.mean,
  });
}

export function buildFixedStillFR76EyeChordPropagationReportFR283(input: {
  readonly generatedAt: string;
  readonly observations: readonly FR283FixedStillObservation[];
}): FR283FixedStillPropagationReport {
  const parsed = Date.parse(input.generatedAt);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== input.generatedAt) {
    fail('generatedAt must be exact ISO-8601 UTC.');
  }
  if (input.observations.length !== 6) {
    fail('report requires exactly six fixed still-image observations.');
  }
  input.observations.forEach((observation, index) => {
    validateObservation(observation, EXPECTED[index]!);
  });

  const observations = Object.freeze(input.observations.map((observation) =>
    Object.freeze({
      ...observation,
      stages: (
        Object.freeze(observation.stages.map((stage) => Object.freeze({ ...stage })))
        as FR283SameFramePropagationEvidence['stages']
      ),
      scales: Object.freeze({ ...observation.scales }),
    })));

  const front = conditionSummary('front', observations);
  const high = conditionSummary('high_angle', observations);
  const low = conditionSummary('low_angle', observations);

  return Object.freeze({
    schemaVersion: 'fr283-fixed-still-fr76-eye-chord-propagation-report-v1' as const,
    contractVersion: FR283_CONTRACT_VERSION,
    authorityState:
      'fixed_still_fr76_stage_propagation_descriptive_only_no_threshold_calibration_correction_or_causal_classification' as const,
    generatedAt: input.generatedAt,
    source: Object.freeze({
      runtimePackage: '@mediapipe/tasks-vision@0.10.35' as const,
      runningMode: 'IMAGE' as const,
      inputImageCount: 6 as const,
      exactInputImageReuseSupported: true as const,
      fr76VerticalFovDegrees: 63 as const,
      fr76NearPlaneCentimeters: 1 as const,
    }),
    observations,
    conditions: Object.freeze([front, high, low]) as readonly [
      FR283ConditionSummary,
      FR283ConditionSummary,
      FR283ConditionSummary,
    ],
    frontRelativeContrasts: Object.freeze([
      contrast(front, high),
      contrast(front, low),
    ]) as readonly [FR283FrontRelativeContrast, FR283FrontRelativeContrast],
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawImageDigestPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawIntermediateLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      providerRunRefPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      scalarStageDiagnosticsPersisted: true as const,
    }),
    interpretationBoundary: Object.freeze({
      singleParticipantSupportsPopulationGeneralization: false as const,
      viewpointCausalityEstablished: false as const,
      internalStageMechanismEstablishedAsCausal: false as const,
      correctionAuthorized: false as const,
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
    nextFrontier: FR283_NEXT_FRONTIER,
  });
}