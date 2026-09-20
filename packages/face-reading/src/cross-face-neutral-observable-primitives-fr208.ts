import { FaceAuthorityValidationError } from './validation.js';

export const FR208_CONTRACT_VERSION =
  'FR208-CROSS-FACE-NEUTRAL-OBSERVABLE-PRIMITIVES-v1' as const;

export interface CanonicalAlignedMetricPointXYFR208V1 {
  readonly x: number;
  readonly y: number;
}

export interface NeutralObservableMetricBoundaryFR208V1 {
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly anatomicalInterpretationAllowed: false;
}

export interface NeutralObservableMetricFR208V1 extends NeutralObservableMetricBoundaryFR208V1 {
  readonly metricRef:
    | 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0'
    | 'neutral.eye.outer_corner_tilt.left_degrees@0.1.0'
    | 'neutral.eye.outer_corner_tilt.right_degrees@0.1.0'
    | 'neutral.eyebrow.span_to_face_width_ratio@0.1.0'
    | 'neutral.eyebrow.arch_amplitude_to_span_ratio@0.1.0'
    | 'neutral.eyebrow.lateral_endpoint_tilt_degrees@0.1.0'
    | 'neutral.mouth.corner_elevation.left_to_mouth_width_ratio@0.1.0'
    | 'neutral.mouth.corner_elevation.right_to_mouth_width_ratio@0.1.0'
    | 'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0'
    | 'neutral.midface.visible_width_to_face_width_ratio@0.1.0'
    | 'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0';
  readonly value: number;
  readonly unit: 'ratio' | 'degree';
  readonly sourceObservationRefs: readonly string[];
}

export interface EyeSideVisibleCornersFR208V1 {
  readonly innerCorner: CanonicalAlignedMetricPointXYFR208V1;
  readonly outerCorner: CanonicalAlignedMetricPointXYFR208V1;
}

export interface EyeOuterCornerTiltInputFR208V1 {
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
  readonly leftEye: EyeSideVisibleCornersFR208V1;
  readonly rightEye: EyeSideVisibleCornersFR208V1;
  readonly sourceObservationRefs: readonly string[];
}

export interface EyeOuterCornerTiltResultFR208V1 {
  readonly schemaVersion: 'fr208-eye-outer-corner-tilt-v1';
  readonly convention:
    'positive_when_outer_corner_has_greater_canonical_metric_y_than_inner_corner';
  readonly left: NeutralObservableMetricFR208V1;
  readonly right: NeutralObservableMetricFR208V1;
  readonly mean: NeutralObservableMetricFR208V1;
}

export interface EyebrowVisibleCurveInputFR208V1 {
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
  readonly medialEndpoint: CanonicalAlignedMetricPointXYFR208V1;
  readonly lateralEndpoint: CanonicalAlignedMetricPointXYFR208V1;
  readonly orderedVisibleCurve: readonly CanonicalAlignedMetricPointXYFR208V1[];
  readonly visibleFaceLeft: CanonicalAlignedMetricPointXYFR208V1;
  readonly visibleFaceRight: CanonicalAlignedMetricPointXYFR208V1;
  readonly sourceObservationRefs: readonly string[];
}

export interface EyebrowVisibleCurveResultFR208V1 {
  readonly schemaVersion: 'fr208-eyebrow-visible-curve-v1';
  readonly spanToFaceWidth: NeutralObservableMetricFR208V1;
  readonly archAmplitudeToSpan: NeutralObservableMetricFR208V1;
  readonly lateralEndpointTilt: NeutralObservableMetricFR208V1;
  readonly tiltConvention:
    'positive_when_lateral_endpoint_has_greater_canonical_metric_y_than_medial_endpoint';
}

export interface MouthCornerElevationInputFR208V1 {
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
  readonly leftCorner: CanonicalAlignedMetricPointXYFR208V1;
  readonly rightCorner: CanonicalAlignedMetricPointXYFR208V1;
  readonly visibleMouthCenter: CanonicalAlignedMetricPointXYFR208V1;
  readonly sourceObservationRefs: readonly string[];
}

export interface MouthCornerElevationResultFR208V1 {
  readonly schemaVersion: 'fr208-mouth-corner-elevation-v1';
  readonly convention:
    'positive_when_corner_has_greater_canonical_metric_y_than_explicit_visible_mouth_center';
  readonly left: NeutralObservableMetricFR208V1;
  readonly right: NeutralObservableMetricFR208V1;
  readonly mean: NeutralObservableMetricFR208V1;
}

export interface VisibleWidthRatioInputFR208V1 {
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
  readonly regionLeft: CanonicalAlignedMetricPointXYFR208V1;
  readonly regionRight: CanonicalAlignedMetricPointXYFR208V1;
  readonly visibleFaceLeft: CanonicalAlignedMetricPointXYFR208V1;
  readonly visibleFaceRight: CanonicalAlignedMetricPointXYFR208V1;
  readonly sourceObservationRefs: readonly string[];
}

export interface VisibleWidthRatioResultFR208V1 {
  readonly schemaVersion:
    | 'fr208-visible-midface-width-ratio-v1'
    | 'fr208-visible-lower-face-width-ratio-v1';
  readonly region: 'midface' | 'lower_face';
  readonly metric: NeutralObservableMetricFR208V1;
}

export const FACE_READING_NEUTRAL_OBSERVABLE_PRIMITIVE_PACK_FR208 = Object.freeze({
  schemaVersion: 'fr208-v1' as const,
  contractVersion: FR208_CONTRACT_VERSION,
  targetClass: 'observable_morphology' as const,
  baseNeutralObservationContractMutated: false as const,
  primitives: Object.freeze([
    'eye_outer_corner_tilt',
    'eyebrow_visible_span_arch_and_lateral_tilt',
    'mouth_corner_elevation',
    'visible_midface_width_ratio',
    'visible_lower_face_width_ratio',
  ] as const),
  authorityBoundary: Object.freeze({
    providerIndexToAnatomyBindingIssued: false as const,
    zygionClaimIssued: false as const,
    bizygomaticBreadthClaimIssued: false as const,
    mandibularBoneClaimIssued: false as const,
    eyelidCreaseClassificationIssued: false as const,
    traditionalCriterionBindingIssued: false as const,
    thresholdIssued: false as const,
    scoreIssued: false as const,
    productionActivationIssued: false as const,
    commerceActivationIssued: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-208 ${message}`);
}

function assertCoordinateFrame(value: string): void {
  if (value !== 'canonical_aligned_right_handed_metric_xy') {
    fail('requires coordinateFrame=canonical_aligned_right_handed_metric_xy.');
  }
}

function assertPoint(point: CanonicalAlignedMetricPointXYFR208V1, label: string): void {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    fail(`${label} must contain finite x/y coordinates.`);
  }
}

function assertRefs(refs: readonly string[]): readonly string[] {
  if (refs.length === 0) fail('sourceObservationRefs must be non-empty.');
  const trimmed = refs.map((ref) => ref.trim());
  if (trimmed.some((ref) => ref.length === 0)) fail('sourceObservationRefs must not contain empty refs.');
  if (new Set(trimmed).size !== trimmed.length) fail('sourceObservationRefs must be unique.');
  return Object.freeze([...trimmed]);
}

function pointKey(point: CanonicalAlignedMetricPointXYFR208V1): string {
  return `${point.x}:${point.y}`;
}

function horizontalSpan(
  left: CanonicalAlignedMetricPointXYFR208V1,
  right: CanonicalAlignedMetricPointXYFR208V1,
  label: string,
): number {
  const span = Math.abs(right.x - left.x);
  if (!Number.isFinite(span) || span <= 0) fail(`${label} horizontal span must be positive.`);
  return span;
}

function euclideanDistance(
  a: CanonicalAlignedMetricPointXYFR208V1,
  b: CanonicalAlignedMetricPointXYFR208V1,
  label: string,
): number {
  const value = Math.hypot(b.x - a.x, b.y - a.y);
  if (!Number.isFinite(value) || value <= 0) fail(`${label} distance must be positive.`);
  return value;
}

function metric(
  metricRef: NeutralObservableMetricFR208V1['metricRef'],
  value: number,
  unit: NeutralObservableMetricFR208V1['unit'],
  refs: readonly string[],
): NeutralObservableMetricFR208V1 {
  if (!Number.isFinite(value)) fail(`${metricRef} produced a non-finite value.`);
  return Object.freeze({
    metricRef,
    value,
    unit,
    coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
    sourceObservationRefs: refs,
  });
}

function outwardTiltDegrees(side: EyeSideVisibleCornersFR208V1, label: string): number {
  assertPoint(side.innerCorner, `${label}.innerCorner`);
  assertPoint(side.outerCorner, `${label}.outerCorner`);
  const horizontal = horizontalSpan(side.innerCorner, side.outerCorner, label);
  // Canonical metric +Y points upward. Positive means the outer corner is above the inner corner.
  return Math.atan2(side.outerCorner.y - side.innerCorner.y, horizontal) * 180 / Math.PI;
}

export function computeEyeOuterCornerTiltFR208(
  input: EyeOuterCornerTiltInputFR208V1,
): EyeOuterCornerTiltResultFR208V1 {
  assertCoordinateFrame(input.coordinateFrame);
  const refs = assertRefs(input.sourceObservationRefs);
  const left = outwardTiltDegrees(input.leftEye, 'leftEye');
  const right = outwardTiltDegrees(input.rightEye, 'rightEye');
  const mean = (left + right) / 2;

  return Object.freeze({
    schemaVersion: 'fr208-eye-outer-corner-tilt-v1' as const,
    convention:
      'positive_when_outer_corner_has_greater_canonical_metric_y_than_inner_corner' as const,
    left: metric('neutral.eye.outer_corner_tilt.left_degrees@0.1.0', left, 'degree', refs),
    right: metric('neutral.eye.outer_corner_tilt.right_degrees@0.1.0', right, 'degree', refs),
    mean: metric('neutral.eye.outer_corner_tilt.mean_degrees@0.1.0', mean, 'degree', refs),
  });
}

function perpendicularDistanceToChord(
  point: CanonicalAlignedMetricPointXYFR208V1,
  start: CanonicalAlignedMetricPointXYFR208V1,
  end: CanonicalAlignedMetricPointXYFR208V1,
): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const denominator = Math.hypot(dx, dy);
  if (!Number.isFinite(denominator) || denominator <= 0) fail('eyebrow endpoint chord is degenerate.');
  return Math.abs(dy * point.x - dx * point.y + end.x * start.y - end.y * start.x) / denominator;
}

export function computeEyebrowVisibleCurveFR208(
  input: EyebrowVisibleCurveInputFR208V1,
): EyebrowVisibleCurveResultFR208V1 {
  assertCoordinateFrame(input.coordinateFrame);
  const refs = assertRefs(input.sourceObservationRefs);
  assertPoint(input.medialEndpoint, 'medialEndpoint');
  assertPoint(input.lateralEndpoint, 'lateralEndpoint');
  assertPoint(input.visibleFaceLeft, 'visibleFaceLeft');
  assertPoint(input.visibleFaceRight, 'visibleFaceRight');

  if (input.orderedVisibleCurve.length < 3) fail('orderedVisibleCurve requires at least three points.');
  input.orderedVisibleCurve.forEach((point, index) => assertPoint(point, `orderedVisibleCurve[${index}]`));
  if (new Set(input.orderedVisibleCurve.map(pointKey)).size !== input.orderedVisibleCurve.length) {
    fail('orderedVisibleCurve points must be unique.');
  }
  if (
    pointKey(input.orderedVisibleCurve[0]!) !== pointKey(input.medialEndpoint) ||
    pointKey(input.orderedVisibleCurve[input.orderedVisibleCurve.length - 1]!) !== pointKey(input.lateralEndpoint)
  ) {
    fail('orderedVisibleCurve must begin at medialEndpoint and end at lateralEndpoint.');
  }

  const browHorizontalSpan = horizontalSpan(input.medialEndpoint, input.lateralEndpoint, 'eyebrow');
  const browChordLength = euclideanDistance(input.medialEndpoint, input.lateralEndpoint, 'eyebrow');
  const faceWidth = horizontalSpan(input.visibleFaceLeft, input.visibleFaceRight, 'visible face');
  const browSpanRatio = browHorizontalSpan / faceWidth;
  if (!Number.isFinite(browSpanRatio) || browSpanRatio <= 0 || browSpanRatio > 1) {
    fail('eyebrow horizontal-span-to-face-width ratio must be within (0,1].');
  }
  const maxArchDistance = Math.max(
    ...input.orderedVisibleCurve.map((point) =>
      perpendicularDistanceToChord(point, input.medialEndpoint, input.lateralEndpoint)),
  );
  const lateralTilt =
    Math.atan2(
      input.lateralEndpoint.y - input.medialEndpoint.y,
      horizontalSpan(input.medialEndpoint, input.lateralEndpoint, 'eyebrow endpoint'),
    ) * 180 / Math.PI;

  return Object.freeze({
    schemaVersion: 'fr208-eyebrow-visible-curve-v1' as const,
    spanToFaceWidth: metric(
      'neutral.eyebrow.span_to_face_width_ratio@0.1.0',
      browSpanRatio,
      'ratio',
      refs,
    ),
    archAmplitudeToSpan: metric(
      'neutral.eyebrow.arch_amplitude_to_span_ratio@0.1.0',
      maxArchDistance / browChordLength,
      'ratio',
      refs,
    ),
    lateralEndpointTilt: metric(
      'neutral.eyebrow.lateral_endpoint_tilt_degrees@0.1.0',
      lateralTilt,
      'degree',
      refs,
    ),
    tiltConvention:
      'positive_when_lateral_endpoint_has_greater_canonical_metric_y_than_medial_endpoint' as const,
  });
}

export function computeMouthCornerElevationFR208(
  input: MouthCornerElevationInputFR208V1,
): MouthCornerElevationResultFR208V1 {
  assertCoordinateFrame(input.coordinateFrame);
  const refs = assertRefs(input.sourceObservationRefs);
  assertPoint(input.leftCorner, 'leftCorner');
  assertPoint(input.rightCorner, 'rightCorner');
  assertPoint(input.visibleMouthCenter, 'visibleMouthCenter');

  const mouthWidth = horizontalSpan(input.leftCorner, input.rightCorner, 'visible mouth');
  const mouthMinX = Math.min(input.leftCorner.x, input.rightCorner.x);
  const mouthMaxX = Math.max(input.leftCorner.x, input.rightCorner.x);
  if (input.visibleMouthCenter.x < mouthMinX || input.visibleMouthCenter.x > mouthMaxX) {
    fail('visibleMouthCenter.x must lie between the supplied mouth corners.');
  }
  const left = (input.leftCorner.y - input.visibleMouthCenter.y) / mouthWidth;
  const right = (input.rightCorner.y - input.visibleMouthCenter.y) / mouthWidth;
  const mean = (left + right) / 2;

  return Object.freeze({
    schemaVersion: 'fr208-mouth-corner-elevation-v1' as const,
    convention:
      'positive_when_corner_has_greater_canonical_metric_y_than_explicit_visible_mouth_center' as const,
    left: metric(
      'neutral.mouth.corner_elevation.left_to_mouth_width_ratio@0.1.0',
      left,
      'ratio',
      refs,
    ),
    right: metric(
      'neutral.mouth.corner_elevation.right_to_mouth_width_ratio@0.1.0',
      right,
      'ratio',
      refs,
    ),
    mean: metric(
      'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0',
      mean,
      'ratio',
      refs,
    ),
  });
}

function computeVisibleWidthRatio(
  input: VisibleWidthRatioInputFR208V1,
  region: VisibleWidthRatioResultFR208V1['region'],
): VisibleWidthRatioResultFR208V1 {
  assertCoordinateFrame(input.coordinateFrame);
  const refs = assertRefs(input.sourceObservationRefs);
  assertPoint(input.regionLeft, 'regionLeft');
  assertPoint(input.regionRight, 'regionRight');
  assertPoint(input.visibleFaceLeft, 'visibleFaceLeft');
  assertPoint(input.visibleFaceRight, 'visibleFaceRight');

  const regionWidth = horizontalSpan(input.regionLeft, input.regionRight, `${region} region`);
  const faceWidth = horizontalSpan(input.visibleFaceLeft, input.visibleFaceRight, 'visible face');
  const faceMinX = Math.min(input.visibleFaceLeft.x, input.visibleFaceRight.x);
  const faceMaxX = Math.max(input.visibleFaceLeft.x, input.visibleFaceRight.x);
  const regionMinX = Math.min(input.regionLeft.x, input.regionRight.x);
  const regionMaxX = Math.max(input.regionLeft.x, input.regionRight.x);
  if (regionMinX < faceMinX || regionMaxX > faceMaxX) {
    fail(`${region} region endpoints must lie inside the supplied visible face width reference.`);
  }
  const ratio = regionWidth / faceWidth;
  if (!Number.isFinite(ratio) || ratio <= 0) fail(`${region} visible width ratio must be positive.`);
  if (ratio > 1) {
    fail(`${region} visible width cannot exceed the supplied visible face width reference.`);
  }

  if (region === 'midface') {
    return Object.freeze({
      schemaVersion: 'fr208-visible-midface-width-ratio-v1' as const,
      region,
      metric: metric(
        'neutral.midface.visible_width_to_face_width_ratio@0.1.0',
        ratio,
        'ratio',
        refs,
      ),
    });
  }

  return Object.freeze({
    schemaVersion: 'fr208-visible-lower-face-width-ratio-v1' as const,
    region,
    metric: metric(
      'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0',
      ratio,
      'ratio',
      refs,
    ),
  });
}

export function computeVisibleMidfaceWidthRatioFR208(
  input: VisibleWidthRatioInputFR208V1,
): VisibleWidthRatioResultFR208V1 {
  return computeVisibleWidthRatio(input, 'midface');
}

export function computeVisibleLowerFaceWidthRatioFR208(
  input: VisibleWidthRatioInputFR208V1,
): VisibleWidthRatioResultFR208V1 {
  return computeVisibleWidthRatio(input, 'lower_face');
}

export function assertFaceReadingNeutralObservablePrimitivePackFR208(): void {
  const authority = FACE_READING_NEUTRAL_OBSERVABLE_PRIMITIVE_PACK_FR208;
  if (
    authority.schemaVersion !== 'fr208-v1' ||
    authority.contractVersion !== FR208_CONTRACT_VERSION ||
    authority.targetClass !== 'observable_morphology' ||
    authority.baseNeutralObservationContractMutated !== false
  ) {
    fail('contract identity or base-contract boundary drift.');
  }

  const expectedPrimitives = [
    'eye_outer_corner_tilt',
    'eyebrow_visible_span_arch_and_lateral_tilt',
    'mouth_corner_elevation',
    'visible_midface_width_ratio',
    'visible_lower_face_width_ratio',
  ];
  if (
    authority.primitives.length !== expectedPrimitives.length ||
    authority.primitives.some((value, index) => value !== expectedPrimitives[index])
  ) {
    fail('primitive inventory drift.');
  }

  for (const [key, value] of Object.entries(authority.authorityBoundary)) {
    if (value !== false) fail(`authority widening: ${key}`);
  }
}
