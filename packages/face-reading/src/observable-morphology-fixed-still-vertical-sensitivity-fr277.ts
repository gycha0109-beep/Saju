import {
  FR274_CONTRACT_VERSION,
  type FR274Condition,
  type FR274DeterministicStillImageDiagnosticReport,
  type FR274StillImageScalarObservation,
} from './observable-morphology-deterministic-still-image-diagnostic-fr274.js';
import { FR237_PRIMARY_METRIC } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR277_CONTRACT_VERSION =
  'FR277-FIXED-STILL-VERTICAL-VIEWPOINT-SENSITIVITY-v1' as const;

export const FR277_NEXT_FRONTIER =
  'decompose_same_fixed_image_screen_space_eye_chords_into_horizontal_and_vertical_scalar_components_ephemerally_before_any_capture_guidance_metric_redesign_or_correction' as const;

const RAD_TO_DEG = 180 / Math.PI;

export interface FR277ScalarRange {
  readonly min: number;
  readonly max: number;
  readonly span: number;
}

export interface FR277ConditionMean {
  readonly condition: FR274Condition;
  readonly imageCount: 2;
  readonly screenSpaceEyeTiltDegrees: number;
  readonly fr76EyeTiltDegrees: number;
  readonly screenMinusFr76Degrees: number;
  readonly verticalOrientationDegrees: number;
  readonly lateralOrientationDegrees: number;
  readonly inPlaneOrientationDegrees: number;
  readonly screenFaceBoxAreaFraction: number;
}

export type FR277ResponseMetric =
  | 'screen_space_eye_tilt_degrees'
  | 'fr76_eye_tilt_degrees'
  | 'screen_minus_fr76_degrees';

export interface FR277VerticalAssociationSummary {
  readonly predictor: 'vertical_orientation_degrees';
  readonly response: FR277ResponseMetric;
  readonly observationCount: 6;
  readonly leastSquaresSlopeResponseDegreesPerVerticalDegree: number;
  readonly leastSquaresInterceptDegrees: number;
  readonly pearsonCorrelation: number;
  readonly rSquared: number;
  readonly evaluationState:
    'descriptive_only_no_linear_model_admission_or_causal_interpretation';
}

export interface FR277FixedStillVerticalSensitivityReport {
  readonly schemaVersion: 'fr277-fixed-still-vertical-sensitivity-report-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR277_CONTRACT_VERSION;
  readonly authorityState:
    'fixed_six_image_vertical_viewpoint_association_descriptive_only_no_threshold_calibration_correction_or_causal_classification';
  readonly source: {
    readonly fr274ContractVersion: typeof FR274_CONTRACT_VERSION;
    readonly metricRef: typeof FR237_PRIMARY_METRIC;
    readonly runCount: 2;
    readonly inputImageCountPerRun: 6;
    readonly exactObservationScalarsMatchAcrossRuns: true;
    readonly generatedAtExcludedFromReproducibilityComparison: true;
  };
  readonly conditionMeans: readonly [
    FR277ConditionMean,
    FR277ConditionMean,
    FR277ConditionMean,
  ];
  readonly verticalAssociations: readonly [
    FR277VerticalAssociationSummary,
    FR277VerticalAssociationSummary,
    FR277VerticalAssociationSummary,
  ];
  readonly potentialConfoundDescriptors: {
    readonly verticalOrientationDegrees: FR277ScalarRange;
    readonly lateralOrientationDegrees: FR277ScalarRange;
    readonly inPlaneOrientationDegrees: FR277ScalarRange;
    readonly screenFaceBoxAreaFraction: FR277ScalarRange;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly imageDigestPersisted: false;
    readonly rawLandmarksPersisted: false;
    readonly metricGeometryPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly providerRunRefPersisted: false;
    readonly perImageScalarRowsPersistedByFR277: false;
    readonly aggregateScalarEvidencePersisted: true;
    readonly biometricEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly interpretationBoundary: {
    readonly singleParticipantSupportsPopulationGeneralization: false;
    readonly sixImagesEstablishLinearResponse: false;
    readonly verticalOrientationCausalityEstablished: false;
    readonly providerInferenceCausalityEstablished: false;
    readonly perspectiveProjectionCausalityEstablished: false;
    readonly fr76ReconstructionCausalityEstablished: false;
    readonly faceScaleConfoundingEliminated: false;
    readonly repeatedRuntimeIdentityEstablishesCaptureRepeatability: false;
  };
  readonly authorityBoundary: {
    readonly poseAcceptanceThresholdIssued: false;
    readonly distanceAcceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly captureGuidanceIssued: false;
    readonly causalClassificationIssued: false;
    readonly frozenMetricReplaced: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR277_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-277 ' + message);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function validateFR274(report: FR274DeterministicStillImageDiagnosticReport): void {
  if (
    report.schemaVersion !== 'fr274-deterministic-still-image-diagnostic-report-v1'
    || report.artifactVersion !== '0.1.0'
    || report.contractVersion !== FR274_CONTRACT_VERSION
    || report.metricRef !== FR237_PRIMARY_METRIC
    || report.source.runtimePackage !== '@mediapipe/tasks-vision@0.10.35'
    || report.source.runningMode !== 'IMAGE'
    || report.source.inputImageCount !== 6
    || report.source.exactInputImageReuseSupported !== true
    || report.observations.length !== 6
  ) {
    fail('requires a complete FR274 fixed six-image diagnostic report.');
  }
  if (
    report.privacyBoundary.rawImagePersisted !== false
    || report.privacyBoundary.rawImageDigestPersisted !== false
    || report.privacyBoundary.rawProviderResponsePersisted !== false
    || report.privacyBoundary.rawScreenLandmarksPersisted !== false
    || report.privacyBoundary.rawMetricLandmarksPersisted !== false
    || report.privacyBoundary.poseTransformMatrixPersisted !== false
    || report.privacyBoundary.providerRunRefPersisted !== false
    || report.privacyBoundary.biometricEmbeddingPersisted !== false
    || report.privacyBoundary.identityTemplatePersisted !== false
    || report.privacyBoundary.scalarDiagnosticPersisted !== true
  ) {
    fail('FR274 privacy boundary widened.');
  }
  if (Object.values(report.authorityBoundary).some((value) => value !== false)) {
    fail('FR274 authority boundary widened.');
  }
}

function stableEvidencePayload(
  report: FR274DeterministicStillImageDiagnosticReport,
): string {
  return JSON.stringify({
    metricRef: report.metricRef,
    source: report.source,
    observations: report.observations,
    conditions: report.conditions,
    frontRelativeContrasts: report.frontRelativeContrasts,
    privacyBoundary: report.privacyBoundary,
    interpretationBoundary: report.interpretationBoundary,
    authorityBoundary: report.authorityBoundary,
  });
}

function range(values: readonly number[]): FR277ScalarRange {
  if (values.length === 0) fail('range requires at least one scalar.');
  values.forEach((value, index) => finite(value, 'range[' + index + ']'));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({ min, max, span: max - min });
}

function conditionMean(
  report: FR274DeterministicStillImageDiagnosticReport,
  condition: FR274Condition,
): FR277ConditionMean {
  const source = report.conditions.find((entry) => entry.condition === condition);
  if (source === undefined || source.imageCount !== 2) {
    fail(condition + ' condition summary is unavailable.');
  }
  return Object.freeze({
    condition,
    imageCount: 2 as const,
    screenSpaceEyeTiltDegrees:
      finite(source.screenSpaceEyeOuterCornerTiltMeanDegrees.mean, condition + '.screen'),
    fr76EyeTiltDegrees:
      finite(source.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees.mean, condition + '.fr76'),
    screenMinusFr76Degrees:
      finite(source.screenMinusFr76Degrees.mean, condition + '.difference'),
    verticalOrientationDegrees:
      finite(source.verticalOrientationDegrees.mean, condition + '.vertical'),
    lateralOrientationDegrees:
      finite(source.lateralOrientationDegrees.mean, condition + '.lateral'),
    inPlaneOrientationDegrees:
      finite(source.inPlaneLateralAxisOrientationDegrees.mean, condition + '.inPlane'),
    screenFaceBoxAreaFraction:
      finite(source.screenFaceBoxAreaFraction.mean, condition + '.faceArea'),
  });
}

function responseValue(
  observation: FR274StillImageScalarObservation,
  response: FR277ResponseMetric,
): number {
  if (response === 'screen_space_eye_tilt_degrees') {
    return observation.screenSpaceEyeOuterCornerTiltMeanDegrees;
  }
  if (response === 'fr76_eye_tilt_degrees') {
    return observation.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees;
  }
  return observation.screenMinusFr76Degrees;
}

function verticalAssociation(
  observations: readonly FR274StillImageScalarObservation[],
  response: FR277ResponseMetric,
): FR277VerticalAssociationSummary {
  if (observations.length !== 6) fail('association requires exactly six observations.');
  const x = observations.map((item) => item.verticalOrientationRadians * RAD_TO_DEG);
  const y = observations.map((item) => responseValue(item, response));
  x.forEach((value, index) => finite(value, 'vertical[' + index + ']'));
  y.forEach((value, index) => finite(value, response + '[' + index + ']'));

  const meanX = x.reduce((sum, value) => sum + value, 0) / x.length;
  const meanY = y.reduce((sum, value) => sum + value, 0) / y.length;
  let covariance = 0;
  let varianceX = 0;
  let varianceY = 0;
  for (let index = 0; index < x.length; index += 1) {
    const dx = x[index]! - meanX;
    const dy = y[index]! - meanY;
    covariance += dx * dy;
    varianceX += dx * dx;
    varianceY += dy * dy;
  }
  if (!(varianceX > 0) || !(varianceY > 0)) {
    fail('association requires non-degenerate predictor and response variance.');
  }
  const slope = covariance / varianceX;
  const intercept = meanY - slope * meanX;
  const correlation = covariance / Math.sqrt(varianceX * varianceY);
  const boundedCorrelation = Math.max(-1, Math.min(1, correlation));

  return Object.freeze({
    predictor: 'vertical_orientation_degrees' as const,
    response,
    observationCount: 6 as const,
    leastSquaresSlopeResponseDegreesPerVerticalDegree:
      finite(slope, response + '.slope'),
    leastSquaresInterceptDegrees: finite(intercept, response + '.intercept'),
    pearsonCorrelation: finite(boundedCorrelation, response + '.correlation'),
    rSquared: finite(boundedCorrelation * boundedCorrelation, response + '.rSquared'),
    evaluationState:
      'descriptive_only_no_linear_model_admission_or_causal_interpretation' as const,
  });
}

export function analyzeFixedStillVerticalSensitivityFR277(input: {
  readonly runA: FR274DeterministicStillImageDiagnosticReport;
  readonly runB: FR274DeterministicStillImageDiagnosticReport;
}): FR277FixedStillVerticalSensitivityReport {
  validateFR274(input.runA);
  validateFR274(input.runB);
  if (stableEvidencePayload(input.runA) !== stableEvidencePayload(input.runB)) {
    fail('independent FR274 runs must match exactly on all persisted scalar evidence.');
  }

  const observations = input.runA.observations;
  const verticalDegrees = observations.map(
    (item) => item.verticalOrientationRadians * RAD_TO_DEG,
  );
  const lateralDegrees = observations.map(
    (item) => item.lateralOrientationRadians * RAD_TO_DEG,
  );
  const inPlaneDegrees = observations.map(
    (item) => item.inPlaneLateralAxisOrientationRadians * RAD_TO_DEG,
  );
  const faceAreas = observations.map((item) => item.screenFaceBoxAreaFraction);

  return Object.freeze({
    schemaVersion: 'fr277-fixed-still-vertical-sensitivity-report-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR277_CONTRACT_VERSION,
    authorityState:
      'fixed_six_image_vertical_viewpoint_association_descriptive_only_no_threshold_calibration_correction_or_causal_classification' as const,
    source: Object.freeze({
      fr274ContractVersion: FR274_CONTRACT_VERSION,
      metricRef: FR237_PRIMARY_METRIC,
      runCount: 2 as const,
      inputImageCountPerRun: 6 as const,
      exactObservationScalarsMatchAcrossRuns: true as const,
      generatedAtExcludedFromReproducibilityComparison: true as const,
    }),
    conditionMeans: Object.freeze([
      conditionMean(input.runA, 'front'),
      conditionMean(input.runA, 'high_angle'),
      conditionMean(input.runA, 'low_angle'),
    ] as const),
    verticalAssociations: Object.freeze([
      verticalAssociation(observations, 'screen_space_eye_tilt_degrees'),
      verticalAssociation(observations, 'fr76_eye_tilt_degrees'),
      verticalAssociation(observations, 'screen_minus_fr76_degrees'),
    ] as const),
    potentialConfoundDescriptors: Object.freeze({
      verticalOrientationDegrees: range(verticalDegrees),
      lateralOrientationDegrees: range(lateralDegrees),
      inPlaneOrientationDegrees: range(inPlaneDegrees),
      screenFaceBoxAreaFraction: range(faceAreas),
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      imageDigestPersisted: false as const,
      rawLandmarksPersisted: false as const,
      metricGeometryPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      providerRunRefPersisted: false as const,
      perImageScalarRowsPersistedByFR277: false as const,
      aggregateScalarEvidencePersisted: true as const,
      biometricEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    interpretationBoundary: Object.freeze({
      singleParticipantSupportsPopulationGeneralization: false as const,
      sixImagesEstablishLinearResponse: false as const,
      verticalOrientationCausalityEstablished: false as const,
      providerInferenceCausalityEstablished: false as const,
      perspectiveProjectionCausalityEstablished: false as const,
      fr76ReconstructionCausalityEstablished: false as const,
      faceScaleConfoundingEliminated: false as const,
      repeatedRuntimeIdentityEstablishesCaptureRepeatability: false as const,
    }),
    authorityBoundary: Object.freeze({
      poseAcceptanceThresholdIssued: false as const,
      distanceAcceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      captureGuidanceIssued: false as const,
      causalClassificationIssued: false as const,
      frozenMetricReplaced: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR277_NEXT_FRONTIER,
  });
}