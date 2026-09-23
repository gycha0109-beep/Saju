import type {
  FR257CaptureGeometryAttributionBundle,
  FR257CaptureGeometryAttributionSlot,
} from './observable-morphology-capture-geometry-attribution-fr257.js';
import type {
  FR269SameFrameEyeTiltDiagnosticBundle,
  FR269SameFrameEyeTiltDiagnosticSlot,
  FR269ScalarSummary,
} from './observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import { FR237_PRIMARY_METRIC } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR270_CONTRACT_VERSION =
  'FR270-CONTROLLED-SAME-FRAME-EYE-TILT-DIVERGENCE-v1' as const;

export const FR270_NEXT_FRONTIER =
  'collect_baseline_low_high_paired_fr257_fr269_evidence_then_review_screen_vs_fr76_divergence_before_capture_guidance_reconstruction_or_metric_redesign' as const;

export type FR270ControlledCondition =
  | 'baseline_eye_level'
  | 'low_angle'
  | 'high_angle';

export interface FR270PairedCaptureObservation {
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly frozenFR76EyeOuterCornerTiltMeanDegrees: number;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: number;
  readonly screenMinusFr76Degrees: number;
  readonly verticalOrientationRadians: number;
  readonly lateralOrientationRadians: number;
  readonly inPlaneLateralAxisOrientationRadians: number;
  readonly screenFaceBoxAreaFraction: number;
}

export interface FR270ConditionSummary {
  readonly condition: FR270ControlledCondition;
  readonly fr257SourceRef: string;
  readonly fr269SourceRef: string;
  readonly sourceGeneratedAt: string;
  readonly captureCount: 4;
  readonly captures: readonly FR270PairedCaptureObservation[];
  readonly frozenFR76EyeOuterCornerTiltMeanDegrees: FR269ScalarSummary;
  readonly screenSpaceEyeOuterCornerTiltMeanDegrees: FR269ScalarSummary;
  readonly screenMinusFr76Degrees: FR269ScalarSummary;
  readonly verticalOrientationRadians: FR269ScalarSummary;
  readonly lateralOrientationRadians: FR269ScalarSummary;
  readonly inPlaneLateralAxisOrientationRadians: FR269ScalarSummary;
  readonly screenFaceBoxAreaFraction: FR269ScalarSummary;
}

export interface FR270BaselineRelativeContrast {
  readonly condition: 'low_angle' | 'high_angle';
  readonly baselineCondition: 'baseline_eye_level';
  readonly deltaMeanFrozenFR76EyeOuterCornerTiltDegrees: number;
  readonly deltaMeanScreenSpaceEyeOuterCornerTiltDegrees: number;
  readonly deltaMeanScreenMinusFr76Degrees: number;
  readonly deltaMeanVerticalOrientationRadians: number;
  readonly deltaMeanLateralOrientationRadians: number;
  readonly deltaMeanInPlaneLateralAxisOrientationRadians: number;
  readonly deltaMeanScreenFaceBoxAreaFraction: number;
}

export interface FR270ControlledSameFrameEyeTiltDivergenceReport {
  readonly schemaVersion: 'fr270-controlled-same-frame-eye-tilt-divergence-report-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR270_CONTRACT_VERSION;
  readonly authorityState:
    'controlled_same_frame_eye_tilt_divergence_descriptive_only_no_causal_classification_threshold_calibration_or_correction';
  readonly generatedAt: string;
  readonly metricRef: typeof FR237_PRIMARY_METRIC;
  readonly conditions: readonly [
    FR270ConditionSummary,
    FR270ConditionSummary,
    FR270ConditionSummary,
  ];
  readonly baselineRelativeContrasts: readonly [
    FR270BaselineRelativeContrast,
    FR270BaselineRelativeContrast,
  ];
  readonly interpretationBoundary: {
    readonly sameExecutionPairVerified: true;
    readonly screenSpaceCausalityEstablished: false;
    readonly fr76ReconstructionCausalityEstablished: false;
    readonly providerLandmarkInferenceCausalityEstablished: false;
    readonly faceScaleConfoundingEliminated: false;
    readonly singleParticipantSupportsPopulationGeneralization: false;
    readonly diagnosticCaseClassificationIssued: false;
  };
  readonly privacyBoundary: {
    readonly participantRefRetained: false;
    readonly operatorRefRetained: false;
    readonly providerRunRefRetained: false;
    readonly rawMediaPersisted: false;
    readonly rawImageDigestPersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly scalarAnalysisPersisted: true;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly poseAcceptanceThresholdIssued: false;
    readonly distanceAcceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly repeatabilityPassFailIssued: false;
    readonly confidenceGradeIssued: false;
    readonly causalClassificationIssued: false;
    readonly frozenMetricReplaced: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR270_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-270 ' + message);
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

function boundedSourceRef(value: string, label: string): string {
  if (value.trim().length === 0 || value.length > 512) {
    fail(label + ' must be a bounded non-empty research reference.');
  }
  return value;
}

function summary(values: readonly number[]): FR269ScalarSummary {
  if (values.length !== 4) fail('each controlled condition requires exactly four scalar values.');
  values.forEach((value, index) => finite(value, 'scalar[' + index + ']'));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    min,
    max,
    span: max - min,
  });
}

function approximatelyEqual(a: number, b: number): boolean {
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= 1e-12 * scale;
}

function assertFR257Privacy(bundle: FR257CaptureGeometryAttributionBundle): void {
  const p = bundle.privacyBoundary;
  if (
    p.participantRefRetained !== false
    || p.operatorRefRetained !== false
    || p.providerRunRefRetained !== false
    || p.rawMediaPersisted !== false
    || p.rawImageDigestPersisted !== false
    || p.rawProviderResponsePersisted !== false
    || p.rawScreenLandmarksPersisted !== false
    || p.rawMetricLandmarksPersisted !== false
    || p.poseTransformMatrixPersisted !== false
    || p.scalarGeometryPersisted !== true
    || p.faceEmbeddingPersisted !== false
    || p.identityTemplatePersisted !== false
    || Object.values(bundle.authorityBoundary).some((value) => value !== false)
  ) {
    fail('FR257 privacy or authority boundary widened.');
  }
}

function assertFR269Privacy(bundle: FR269SameFrameEyeTiltDiagnosticBundle): void {
  const p = bundle.persistenceBoundary;
  if (
    p.participantRefRetained !== false
    || p.operatorRefRetained !== false
    || p.providerRunRefRetained !== false
    || p.rawMediaPersisted !== false
    || p.rawScreenLandmarksPersisted !== false
    || p.rawMetricLandmarksPersisted !== false
    || p.poseTransformMatrixPersisted !== false
    || p.scalarDiagnosticPersisted !== true
    || Object.values(bundle.authorityBoundary).some((value) => value !== false)
  ) {
    fail('FR269 privacy or authority boundary widened.');
  }
}

function pairedCapture(
  fr257: FR257CaptureGeometryAttributionSlot,
  fr269: FR269SameFrameEyeTiltDiagnosticSlot,
  expectedKey: string,
): FR270PairedCaptureObservation {
  const actual257 = String(fr257.sessionOrdinal) + ':' + String(fr257.captureOrdinal);
  const actual269 = String(fr269.sessionOrdinal) + ':' + String(fr269.captureOrdinal);
  if (actual257 !== expectedKey || actual269 !== expectedKey) {
    fail('FR257 and FR269 slots must remain aligned in 1:1,1:2,2:1,2:2 order.');
  }
  if (
    fr257.resultStatus !== 'accepted_for_dry_run_mechanics_only'
    || fr269.resultStatus !== 'accepted_for_dry_run_mechanics_only'
    || fr257.primaryMetric === null
    || fr257.geometry === null
    || fr269.frozenPrimaryMetric === null
    || fr269.screenSpaceEyeOuterCornerTiltMeanDegrees === null
    || fr269.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees === null
    || fr269.screenMinusFr76Degrees === null
  ) {
    fail('controlled divergence analysis requires four accepted paired captures per condition.');
  }
  if (
    fr257.primaryMetric.metricRef !== FR237_PRIMARY_METRIC
    || fr269.frozenPrimaryMetric.metricRef !== FR237_PRIMARY_METRIC
    || fr257.primaryMetric.unit !== 'degree'
    || fr269.frozenPrimaryMetric.unit !== 'degree'
    || fr257.primaryMetric.value !== fr269.frozenPrimaryMetric.value
    || fr269.frozenPrimaryMetric.value
      !== fr269.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees
  ) {
    fail('paired capture must preserve the exact frozen FR76 primary metric binding.');
  }
  const expectedDifference =
    fr269.screenSpaceEyeOuterCornerTiltMeanDegrees
    - fr269.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees;
  if (!approximatelyEqual(expectedDifference, fr269.screenMinusFr76Degrees)) {
    fail('FR269 screen-minus-FR76 scalar is inconsistent with its paired diagnostics.');
  }

  return Object.freeze({
    sessionOrdinal: fr257.sessionOrdinal,
    captureOrdinal: fr257.captureOrdinal,
    frozenFR76EyeOuterCornerTiltMeanDegrees: finite(
      fr269.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees,
      'FR76 eye tilt',
    ),
    screenSpaceEyeOuterCornerTiltMeanDegrees: finite(
      fr269.screenSpaceEyeOuterCornerTiltMeanDegrees,
      'screen-space eye tilt',
    ),
    screenMinusFr76Degrees: finite(fr269.screenMinusFr76Degrees, 'screen-minus-FR76'),
    verticalOrientationRadians: finite(
      fr257.geometry.verticalOrientationRadians,
      'vertical orientation',
    ),
    lateralOrientationRadians: finite(
      fr257.geometry.lateralOrientationRadians,
      'lateral orientation',
    ),
    inPlaneLateralAxisOrientationRadians: finite(
      fr257.geometry.inPlaneLateralAxisOrientationRadians,
      'in-plane orientation',
    ),
    screenFaceBoxAreaFraction: finite(
      fr257.geometry.screenFaceBoxAreaFraction,
      'face-box area',
    ),
  });
}

function summarizeCondition(input: {
  readonly condition: FR270ControlledCondition;
  readonly fr257SourceRef: string;
  readonly fr269SourceRef: string;
  readonly fr257: FR257CaptureGeometryAttributionBundle;
  readonly fr269: FR269SameFrameEyeTiltDiagnosticBundle;
}): FR270ConditionSummary {
  boundedSourceRef(input.fr257SourceRef, 'fr257SourceRef');
  boundedSourceRef(input.fr269SourceRef, 'fr269SourceRef');
  exactIso(input.fr257.generatedAt);
  exactIso(input.fr269.generatedAt);
  if (input.fr257.generatedAt !== input.fr269.generatedAt) {
    fail('paired FR257 and FR269 bundles must share the same generatedAt execution timestamp.');
  }
  if (
    input.fr257.schemaVersion !== 'fr257-capture-geometry-attribution-bundle-v1'
    || input.fr257.contractVersion !== 'FR257-SAME-FRAME-CAPTURE-GEOMETRY-ATTRIBUTION-v1'
    || input.fr257.source.metricRef !== FR237_PRIMARY_METRIC
    || input.fr257.source.requiredSlotCount !== 4
    || input.fr257.slots.length !== 4
    || input.fr257.descriptiveSummary.recordedSlotCount !== 4
    || input.fr257.descriptiveSummary.acceptedMetricCount !== 4
    || input.fr257.descriptiveSummary.geometryAttributionCount !== 4
  ) {
    fail('FR257 bundle is not a complete four-capture controlled execution.');
  }
  if (
    input.fr269.schemaVersion !== 'fr269-same-frame-eye-tilt-diagnostic-bundle-v1'
    || input.fr269.contractVersion !== 'FR269-CONTROLLED-CAPTURE-GEOMETRY-SENSITIVITY-v1'
    || input.fr269.slots.length !== 4
    || input.fr269.descriptiveSummary.acceptedDiagnosticCount !== 4
  ) {
    fail('FR269 bundle is not a complete four-capture controlled execution.');
  }
  assertFR257Privacy(input.fr257);
  assertFR269Privacy(input.fr269);

  const expected = ['1:1', '1:2', '2:1', '2:2'] as const;
  const captures = expected.map((key, index) => {
    const fr257 = input.fr257.slots[index];
    const fr269 = input.fr269.slots[index];
    if (fr257 === undefined || fr269 === undefined) fail('paired slot is missing.');
    return pairedCapture(fr257, fr269, key);
  });

  const values = <K extends keyof FR270PairedCaptureObservation>(key: K): number[] =>
    captures.map((capture) => {
      const value = capture[key];
      if (typeof value !== 'number') fail('requested summary field is not numeric.');
      return value;
    });

  return Object.freeze({
    condition: input.condition,
    fr257SourceRef: input.fr257SourceRef,
    fr269SourceRef: input.fr269SourceRef,
    sourceGeneratedAt: input.fr257.generatedAt,
    captureCount: 4 as const,
    captures: Object.freeze(captures),
    frozenFR76EyeOuterCornerTiltMeanDegrees:
      summary(values('frozenFR76EyeOuterCornerTiltMeanDegrees')),
    screenSpaceEyeOuterCornerTiltMeanDegrees:
      summary(values('screenSpaceEyeOuterCornerTiltMeanDegrees')),
    screenMinusFr76Degrees: summary(values('screenMinusFr76Degrees')),
    verticalOrientationRadians: summary(values('verticalOrientationRadians')),
    lateralOrientationRadians: summary(values('lateralOrientationRadians')),
    inPlaneLateralAxisOrientationRadians:
      summary(values('inPlaneLateralAxisOrientationRadians')),
    screenFaceBoxAreaFraction: summary(values('screenFaceBoxAreaFraction')),
  });
}

function contrast(
  baseline: FR270ConditionSummary,
  condition: FR270ConditionSummary,
): FR270BaselineRelativeContrast {
  if (baseline.condition !== 'baseline_eye_level') {
    fail('contrast baseline must be baseline_eye_level.');
  }
  if (condition.condition === 'baseline_eye_level') {
    fail('contrast target must be low_angle or high_angle.');
  }
  return Object.freeze({
    condition: condition.condition,
    baselineCondition: 'baseline_eye_level' as const,
    deltaMeanFrozenFR76EyeOuterCornerTiltDegrees:
      condition.frozenFR76EyeOuterCornerTiltMeanDegrees.mean
      - baseline.frozenFR76EyeOuterCornerTiltMeanDegrees.mean,
    deltaMeanScreenSpaceEyeOuterCornerTiltDegrees:
      condition.screenSpaceEyeOuterCornerTiltMeanDegrees.mean
      - baseline.screenSpaceEyeOuterCornerTiltMeanDegrees.mean,
    deltaMeanScreenMinusFr76Degrees:
      condition.screenMinusFr76Degrees.mean - baseline.screenMinusFr76Degrees.mean,
    deltaMeanVerticalOrientationRadians:
      condition.verticalOrientationRadians.mean - baseline.verticalOrientationRadians.mean,
    deltaMeanLateralOrientationRadians:
      condition.lateralOrientationRadians.mean - baseline.lateralOrientationRadians.mean,
    deltaMeanInPlaneLateralAxisOrientationRadians:
      condition.inPlaneLateralAxisOrientationRadians.mean
      - baseline.inPlaneLateralAxisOrientationRadians.mean,
    deltaMeanScreenFaceBoxAreaFraction:
      condition.screenFaceBoxAreaFraction.mean - baseline.screenFaceBoxAreaFraction.mean,
  });
}

export function analyzeControlledSameFrameEyeTiltDivergenceFR270(input: {
  readonly generatedAt: string;
  readonly conditions: readonly {
    readonly condition: FR270ControlledCondition;
    readonly fr257SourceRef: string;
    readonly fr269SourceRef: string;
    readonly fr257: FR257CaptureGeometryAttributionBundle;
    readonly fr269: FR269SameFrameEyeTiltDiagnosticBundle;
  }[];
}): FR270ControlledSameFrameEyeTiltDivergenceReport {
  exactIso(input.generatedAt);
  if (input.conditions.length !== 3) {
    fail('requires exactly baseline_eye_level, low_angle, and high_angle conditions.');
  }
  const expectedConditions: readonly FR270ControlledCondition[] = [
    'baseline_eye_level',
    'low_angle',
    'high_angle',
  ];
  input.conditions.forEach((entry, index) => {
    if (entry.condition !== expectedConditions[index]) {
      fail('conditions must remain ordered baseline_eye_level, low_angle, high_angle.');
    }
  });

  const summaries = input.conditions.map((entry) => summarizeCondition(entry));
  const baseline = summaries[0];
  const low = summaries[1];
  const high = summaries[2];
  if (baseline === undefined || low === undefined || high === undefined) {
    fail('controlled condition summary is missing.');
  }

  return Object.freeze({
    schemaVersion: 'fr270-controlled-same-frame-eye-tilt-divergence-report-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR270_CONTRACT_VERSION,
    authorityState:
      'controlled_same_frame_eye_tilt_divergence_descriptive_only_no_causal_classification_threshold_calibration_or_correction' as const,
    generatedAt: input.generatedAt,
    metricRef: FR237_PRIMARY_METRIC,
    conditions: Object.freeze([baseline, low, high]) as readonly [
      FR270ConditionSummary,
      FR270ConditionSummary,
      FR270ConditionSummary,
    ],
    baselineRelativeContrasts: Object.freeze([
      contrast(baseline, low),
      contrast(baseline, high),
    ]) as readonly [
      FR270BaselineRelativeContrast,
      FR270BaselineRelativeContrast,
    ],
    interpretationBoundary: Object.freeze({
      sameExecutionPairVerified: true as const,
      screenSpaceCausalityEstablished: false as const,
      fr76ReconstructionCausalityEstablished: false as const,
      providerLandmarkInferenceCausalityEstablished: false as const,
      faceScaleConfoundingEliminated: false as const,
      singleParticipantSupportsPopulationGeneralization: false as const,
      diagnosticCaseClassificationIssued: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantRefRetained: false as const,
      operatorRefRetained: false as const,
      providerRunRefRetained: false as const,
      rawMediaPersisted: false as const,
      rawImageDigestPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarAnalysisPersisted: true as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      poseAcceptanceThresholdIssued: false as const,
      distanceAcceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      repeatabilityPassFailIssued: false as const,
      confidenceGradeIssued: false as const,
      causalClassificationIssued: false as const,
      frozenMetricReplaced: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR270_NEXT_FRONTIER,
  });
}
