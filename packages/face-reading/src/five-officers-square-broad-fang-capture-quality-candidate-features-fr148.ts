import {
  FR147_NEXT_FRONTIER,
  getSquareBroadFangCaptureConditionGovernanceContractFR147,
} from './five-officers-square-broad-fang-capture-condition-governance-fr147.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR148_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_capture_quality_candidate_features.fr148' as const;
export const FR148_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr148-square-broad-fang-capture-quality-candidate-features.md' as const;
export const FR148_NEXT_FRONTIER =
  'square_broad_fang_capture_quality_candidate_feature_empirical_perturbation_validation_and_independent_multi_session_evidence_before_quality_or_repeatability_thresholds' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUEST_KEYS = new Set(['schemaVersion', 'captures']);
const CAPTURE_KEYS = new Set([
  'captureRef',
  'rasterWidth',
  'rasterHeight',
  'pixelCount',
  'rgbIntensity',
  'adjacentIntensityDifferences',
  'spatialIntensityMoments',
]);
const RGB_KEYS = new Set([
  'min',
  'max',
  'sum',
  'sumSquares',
  'anyChannelZeroPixelCount',
  'anyChannelFullScalePixelCount',
]);
const ADJACENCY_KEYS = new Set(['horizontal', 'vertical']);
const AXIS_KEYS = new Set(['pairCount', 'squaredDifferenceSum']);
const MOMENT_KEYS = new Set(['xIndexWeightedSum', 'yIndexWeightedSum']);
const MAX_RGB_SUM = 765;
const MAX_RGB_SUM_SQUARED = MAX_RGB_SUM * MAX_RGB_SUM;
const OUTPUT_FEATURE_COUNT = 6;
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangCaptureQualityRgbAggregateFR148V1 {
  readonly min: number;
  readonly max: number;
  readonly sum: number;
  readonly sumSquares: number;
  readonly anyChannelZeroPixelCount: number;
  readonly anyChannelFullScalePixelCount: number;
}

export interface SquareBroadFangCaptureQualityAdjacentAxisFR148V1 {
  readonly pairCount: number;
  readonly squaredDifferenceSum: number;
}

export interface SquareBroadFangCaptureQualityAdjacentDifferencesFR148V1 {
  readonly horizontal: SquareBroadFangCaptureQualityAdjacentAxisFR148V1;
  readonly vertical: SquareBroadFangCaptureQualityAdjacentAxisFR148V1;
}

export interface SquareBroadFangCaptureQualitySpatialMomentsFR148V1 {
  readonly xIndexWeightedSum: number;
  readonly yIndexWeightedSum: number;
}

export interface SquareBroadFangCaptureQualityRawAggregateFR148V1 {
  readonly captureRef: string;
  readonly rasterWidth: number;
  readonly rasterHeight: number;
  readonly pixelCount: number;
  readonly rgbIntensity: SquareBroadFangCaptureQualityRgbAggregateFR148V1;
  readonly adjacentIntensityDifferences: SquareBroadFangCaptureQualityAdjacentDifferencesFR148V1;
  readonly spatialIntensityMoments: SquareBroadFangCaptureQualitySpatialMomentsFR148V1;
}

export interface SquareBroadFangCaptureQualityCandidateFeaturesRequestFR148V1 {
  readonly schemaVersion: 'fr148-square-broad-fang-capture-quality-candidate-features-request-v1';
  readonly captures: readonly SquareBroadFangCaptureQualityRawAggregateFR148V1[];
}

export type SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1 =
  | 'candidate.capture_quality.rgb_sum_mean_normalized'
  | 'candidate.capture_quality.rgb_sum_standard_deviation_normalized'
  | 'candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized'
  | 'candidate.capture_quality.any_channel_zero_fraction'
  | 'candidate.capture_quality.any_channel_full_scale_fraction'
  | 'candidate.capture_quality.intensity_centroid_offset_magnitude_normalized';

export interface SquareBroadFangCaptureQualityCandidateFeatureValueFR148V1 {
  readonly featureRef: SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1;
  readonly value: number;
  readonly unit: 'ratio';
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly thresholdApplied: false;
  readonly qualityConstructValidated: false;
}

export interface SquareBroadFangCaptureQualityCandidateObservationFR148V1 {
  readonly captureRef: string;
  readonly featureValues: readonly SquareBroadFangCaptureQualityCandidateFeatureValueFR148V1[];
  readonly intendedResearchHypotheses: {
    readonly globalIntensityLocationCandidate: true;
    readonly globalIntensityDispersionCandidate: true;
    readonly localHighFrequencyVariationCandidate: true;
    readonly channelFloorOccupancyCandidate: true;
    readonly channelCeilingOccupancyCandidate: true;
    readonly spatialIntensityBalanceCandidate: true;
    readonly exposureAdequacyEstablished: false;
    readonly sharpnessEstablished: false;
    readonly lightingAdequacyEstablished: false;
    readonly occlusionValidityEstablished: false;
  };
}

export interface SquareBroadFangCaptureQualityCandidateFeatureReportFR148V1 {
  readonly schemaVersion: 'fr148-square-broad-fang-capture-quality-candidate-feature-report-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR148_RECORD_ID;
  readonly authorityState: 'capture_quality_candidate_features_materialized_threshold_free_construct_unvalidated';
  readonly predecessor: {
    readonly fr147NextFrontier: typeof FR147_NEXT_FRONTIER;
    readonly fr147CaptureQualityMeasurementConstructValidated: false;
    readonly fr147CaptureQualityThresholdsDefined: false;
    readonly fr147RepeatabilityInterpretationAllowed: false;
  };
  readonly observedCaptureCount: number;
  readonly observations: readonly SquareBroadFangCaptureQualityCandidateObservationFR148V1[];
  readonly measurementBoundary: {
    readonly thresholdFreeCandidateFeaturesIssued: true;
    readonly rawAggregateInputOnly: true;
    readonly rawImageConsumedByThisArtifact: false;
    readonly rawProviderResponseConsumedByThisArtifact: false;
    readonly sourceDigestConsumedByThisArtifact: false;
    readonly frData05PrimitiveFamilyReusedConceptuallyWithoutDatasetEvidenceReuse: true;
    readonly syntheticUnitTestsMeanConstructValidity: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly exposureMetricValidated: false;
    readonly sharpnessMetricValidated: false;
    readonly lightingMetricValidated: false;
    readonly occlusionValidityVerified: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly rawPixelRasterPersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR148_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR148_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-148 ${message}`);
}

function exactKeys(value: object, allowed: ReadonlySet<string>, label: string): void {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`${label} contains unauthorized field: ${unexpected}.`);
}

function safeInteger(value: number, label: string, positive = false): number {
  if (!Number.isSafeInteger(value) || value < (positive ? 1 : 0)) {
    fail(`${label} must be a ${positive ? 'positive' : 'non-negative'} safe integer.`);
  }
  return value;
}

function safeProduct(values: readonly number[], label: string): number {
  let output = 1;
  for (const value of values) {
    if (!Number.isSafeInteger(value) || value < 0) fail(`${label} factors must be non-negative safe integers.`);
    output *= value;
    if (!Number.isSafeInteger(output)) fail(`${label} exceeds JavaScript safe-integer range.`);
  }
  return output;
}

function boundedRatio(value: number, label: string): number {
  if (!Number.isFinite(value) || value < -1e-12 || value > 1 + 1e-12) {
    fail(`${label} must remain within the mathematically bounded [0,1] range.`);
  }
  return Math.min(1, Math.max(0, value));
}

function validateAxis(
  axis: SquareBroadFangCaptureQualityAdjacentAxisFR148V1,
  expectedPairCount: number,
  captureRef: string,
  label: 'horizontal' | 'vertical',
): void {
  if (typeof axis !== 'object' || axis === null) fail(`${captureRef}.${label} must be an object.`);
  exactKeys(axis, AXIS_KEYS, `${captureRef}.${label}`);
  const pairCount = safeInteger(axis.pairCount, `${captureRef}.${label}.pairCount`);
  if (pairCount !== expectedPairCount) fail(`${captureRef}.${label}.pairCount must equal raster adjacency count.`);
  const squaredDifferenceSum = safeInteger(axis.squaredDifferenceSum, `${captureRef}.${label}.squaredDifferenceSum`);
  const maximum = safeProduct([pairCount, MAX_RGB_SUM_SQUARED], `${captureRef}.${label}.maximumSquaredDifferenceSum`);
  if (squaredDifferenceSum > maximum) fail(`${captureRef}.${label}.squaredDifferenceSum exceeds mathematical maximum.`);
}

function validateCapture(capture: SquareBroadFangCaptureQualityRawAggregateFR148V1, index: number): void {
  if (typeof capture !== 'object' || capture === null) fail(`capture ${index} must be an object.`);
  exactKeys(capture, CAPTURE_KEYS, `capture ${index}`);
  if (!SAFE_REF.test(capture.captureRef)) fail(`capture ${index} captureRef must be a bounded opaque reference.`);

  const width = safeInteger(capture.rasterWidth, `${capture.captureRef}.rasterWidth`, true);
  const height = safeInteger(capture.rasterHeight, `${capture.captureRef}.rasterHeight`, true);
  const pixelCount = safeInteger(capture.pixelCount, `${capture.captureRef}.pixelCount`, true);
  if (pixelCount !== safeProduct([width, height], `${capture.captureRef}.pixelCount`)) {
    fail(`${capture.captureRef}.pixelCount must exactly equal width * height.`);
  }

  const rgb = capture.rgbIntensity;
  if (typeof rgb !== 'object' || rgb === null) fail(`${capture.captureRef}.rgbIntensity must be an object.`);
  exactKeys(rgb, RGB_KEYS, `${capture.captureRef}.rgbIntensity`);
  const min = safeInteger(rgb.min, `${capture.captureRef}.rgbIntensity.min`);
  const max = safeInteger(rgb.max, `${capture.captureRef}.rgbIntensity.max`);
  const sum = safeInteger(rgb.sum, `${capture.captureRef}.rgbIntensity.sum`);
  const sumSquares = safeInteger(rgb.sumSquares, `${capture.captureRef}.rgbIntensity.sumSquares`);
  if (min > MAX_RGB_SUM || max > MAX_RGB_SUM || min > max) {
    fail(`${capture.captureRef}.rgbIntensity min/max must satisfy 0 <= min <= max <= ${MAX_RGB_SUM}.`);
  }
  if (sum > safeProduct([pixelCount, MAX_RGB_SUM], `${capture.captureRef}.rgbIntensity.maximumSum`)) {
    fail(`${capture.captureRef}.rgbIntensity.sum exceeds mathematical maximum.`);
  }
  if (sumSquares > safeProduct([pixelCount, MAX_RGB_SUM_SQUARED], `${capture.captureRef}.rgbIntensity.maximumSumSquares`)) {
    fail(`${capture.captureRef}.rgbIntensity.sumSquares exceeds mathematical maximum.`);
  }
  if (sum < min || sum < max || sumSquares < min * min || sumSquares < max * max) {
    fail(`${capture.captureRef}.rgbIntensity aggregates are inconsistent with observed extrema.`);
  }
  if (sum === 0 && (min !== 0 || max !== 0 || sumSquares !== 0)) {
    fail(`${capture.captureRef}.rgbIntensity zero-sum state is inconsistent.`);
  }
  const zeroCount = safeInteger(rgb.anyChannelZeroPixelCount, `${capture.captureRef}.rgbIntensity.anyChannelZeroPixelCount`);
  const fullCount = safeInteger(rgb.anyChannelFullScalePixelCount, `${capture.captureRef}.rgbIntensity.anyChannelFullScalePixelCount`);
  if (zeroCount > pixelCount || fullCount > pixelCount) fail(`${capture.captureRef}.rgbIntensity occupancy cannot exceed pixelCount.`);

  const adjacency = capture.adjacentIntensityDifferences;
  if (typeof adjacency !== 'object' || adjacency === null) fail(`${capture.captureRef}.adjacentIntensityDifferences must be an object.`);
  exactKeys(adjacency, ADJACENCY_KEYS, `${capture.captureRef}.adjacentIntensityDifferences`);
  validateAxis(adjacency.horizontal, safeProduct([Math.max(0, width - 1), height], `${capture.captureRef}.horizontalPairs`), capture.captureRef, 'horizontal');
  validateAxis(adjacency.vertical, safeProduct([width, Math.max(0, height - 1)], `${capture.captureRef}.verticalPairs`), capture.captureRef, 'vertical');

  const moments = capture.spatialIntensityMoments;
  if (typeof moments !== 'object' || moments === null) fail(`${capture.captureRef}.spatialIntensityMoments must be an object.`);
  exactKeys(moments, MOMENT_KEYS, `${capture.captureRef}.spatialIntensityMoments`);
  const x = safeInteger(moments.xIndexWeightedSum, `${capture.captureRef}.spatialIntensityMoments.xIndexWeightedSum`);
  const y = safeInteger(moments.yIndexWeightedSum, `${capture.captureRef}.spatialIntensityMoments.yIndexWeightedSum`);
  if (x > safeProduct([Math.max(0, width - 1), sum], `${capture.captureRef}.maximumXMoment`)) {
    fail(`${capture.captureRef}.spatialIntensityMoments.xIndexWeightedSum exceeds mathematical maximum.`);
  }
  if (y > safeProduct([Math.max(0, height - 1), sum], `${capture.captureRef}.maximumYMoment`)) {
    fail(`${capture.captureRef}.spatialIntensityMoments.yIndexWeightedSum exceeds mathematical maximum.`);
  }
  if (sum === 0 && (x !== 0 || y !== 0)) fail(`${capture.captureRef} zero intensity sum requires zero spatial moments.`);
}

function feature(
  featureRef: SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1,
  value: number,
): SquareBroadFangCaptureQualityCandidateFeatureValueFR148V1 {
  return Object.freeze({
    featureRef,
    value: boundedRatio(value, featureRef),
    unit: 'ratio' as const,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    thresholdApplied: false as const,
    qualityConstructValidated: false as const,
  });
}

function computeObservation(
  capture: SquareBroadFangCaptureQualityRawAggregateFR148V1,
): SquareBroadFangCaptureQualityCandidateObservationFR148V1 {
  const { pixelCount, rasterWidth: width, rasterHeight: height } = capture;
  const rgb = capture.rgbIntensity;
  const mean = rgb.sum / pixelCount;
  const variance = Math.max(0, (rgb.sumSquares / pixelCount) - (mean * mean));
  const standardDeviationNormalized = Math.sqrt(variance) / MAX_RGB_SUM;

  const horizontal = capture.adjacentIntensityDifferences.horizontal;
  const vertical = capture.adjacentIntensityDifferences.vertical;
  const adjacentPairCount = horizontal.pairCount + vertical.pairCount;
  const adjacentSquaredDifferenceSum = horizontal.squaredDifferenceSum + vertical.squaredDifferenceSum;
  const adjacentRmsNormalized = adjacentPairCount === 0
    ? 0
    : Math.sqrt(adjacentSquaredDifferenceSum / adjacentPairCount) / MAX_RGB_SUM;

  let centroidOffsetMagnitudeNormalized = 0;
  if (rgb.sum > 0) {
    const centroidX = capture.spatialIntensityMoments.xIndexWeightedSum / rgb.sum;
    const centroidY = capture.spatialIntensityMoments.yIndexWeightedSum / rgb.sum;
    const xOffset = width > 1 ? (centroidX - ((width - 1) / 2)) / ((width - 1) / 2) : 0;
    const yOffset = height > 1 ? (centroidY - ((height - 1) / 2)) / ((height - 1) / 2) : 0;
    centroidOffsetMagnitudeNormalized = Math.min(1, Math.hypot(xOffset, yOffset) / Math.SQRT2);
  }

  return Object.freeze({
    captureRef: capture.captureRef,
    featureValues: Object.freeze([
      feature('candidate.capture_quality.rgb_sum_mean_normalized', mean / MAX_RGB_SUM),
      feature('candidate.capture_quality.rgb_sum_standard_deviation_normalized', standardDeviationNormalized),
      feature('candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized', adjacentRmsNormalized),
      feature('candidate.capture_quality.any_channel_zero_fraction', rgb.anyChannelZeroPixelCount / pixelCount),
      feature('candidate.capture_quality.any_channel_full_scale_fraction', rgb.anyChannelFullScalePixelCount / pixelCount),
      feature('candidate.capture_quality.intensity_centroid_offset_magnitude_normalized', centroidOffsetMagnitudeNormalized),
    ]),
    intendedResearchHypotheses: Object.freeze({
      globalIntensityLocationCandidate: true as const,
      globalIntensityDispersionCandidate: true as const,
      localHighFrequencyVariationCandidate: true as const,
      channelFloorOccupancyCandidate: true as const,
      channelCeilingOccupancyCandidate: true as const,
      spatialIntensityBalanceCandidate: true as const,
      exposureAdequacyEstablished: false as const,
      sharpnessEstablished: false as const,
      lightingAdequacyEstablished: false as const,
      occlusionValidityEstablished: false as const,
    }),
  });
}

function validateRequest(request: SquareBroadFangCaptureQualityCandidateFeaturesRequestFR148V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr148-square-broad-fang-capture-quality-candidate-features-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  if (!Array.isArray(request.captures) || request.captures.length === 0) fail('captures must contain at least one raw aggregate observation.');
  const refs = new Set<string>();
  request.captures.forEach((capture, index) => {
    validateCapture(capture, index);
    if (refs.has(capture.captureRef)) fail(`captures duplicate captureRef ${capture.captureRef}.`);
    refs.add(capture.captureRef);
  });
}

export function getSquareBroadFangCaptureQualityCandidateFeatureContractFR148() {
  const predecessor = getSquareBroadFangCaptureConditionGovernanceContractFR147();
  if (
    predecessor.nextFrontier !== FR147_NEXT_FRONTIER
    || predecessor.authorityBoundary.captureQualityMeasurementConstructValidated !== false
    || predecessor.authorityBoundary.captureQualityThresholdsDefined !== false
    || predecessor.authorityBoundary.repeatabilityInterpretationAllowed !== false
    || predecessor.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || predecessor.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-147 predecessor contract drift.');

  return Object.freeze({
    schemaVersion: 'fr148-square-broad-fang-capture-quality-candidate-feature-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR148_RECORD_ID,
    predecessor: Object.freeze({ fr147NextFrontier: FR147_NEXT_FRONTIER }),
    inputBoundary: Object.freeze({
      thresholdFreeIntegerRasterAggregatesOnly: true as const,
      rawImageRequired: false as const,
      sourceDigestRequired: false as const,
      providerResponseRequired: false as const,
      captureSessionRefRequired: false as const,
    }),
    candidateDefinitions: Object.freeze({
      featureCount: OUTPUT_FEATURE_COUNT as 6,
      valuesBoundedToUnitInterval: true as const,
      formulasFrozenBeforeEmpiricalValidation: true as const,
      frData05PrimitiveFamilyReusedConceptuallyWithoutDatasetEvidenceReuse: true as const,
    }),
    authorityBoundary: Object.freeze({
      candidateFeatureDefinitionMeansCaptureQualityConstructValidated: false as const,
      deterministicUnitTestsMeanCaptureQualityConstructValidated: false as const,
      candidateFeatureValueMeansExposureAdequacy: false as const,
      candidateFeatureValueMeansSharpness: false as const,
      candidateFeatureValueMeansLightingAdequacy: false as const,
      candidateFeatureValueMeansOcclusionValidity: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: FR148_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(
  request: SquareBroadFangCaptureQualityCandidateFeaturesRequestFR148V1,
): SquareBroadFangCaptureQualityCandidateFeatureReportFR148V1 {
  validateRequest(request);
  const contract = getSquareBroadFangCaptureQualityCandidateFeatureContractFR148();
  if (contract.nextFrontier !== FR148_NEXT_FRONTIER) fail('FR-148 contract drift at execution time.');
  const observations = Object.freeze(request.captures.map(computeObservation));
  if (observations.some((observation) => observation.featureValues.length !== OUTPUT_FEATURE_COUNT)) {
    fail('candidate feature output count drift.');
  }

  const output: SquareBroadFangCaptureQualityCandidateFeatureReportFR148V1 = Object.freeze({
    schemaVersion: 'fr148-square-broad-fang-capture-quality-candidate-feature-report-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR148_RECORD_ID,
    authorityState: 'capture_quality_candidate_features_materialized_threshold_free_construct_unvalidated' as const,
    predecessor: Object.freeze({
      fr147NextFrontier: FR147_NEXT_FRONTIER,
      fr147CaptureQualityMeasurementConstructValidated: false as const,
      fr147CaptureQualityThresholdsDefined: false as const,
      fr147RepeatabilityInterpretationAllowed: false as const,
    }),
    observedCaptureCount: observations.length,
    observations,
    measurementBoundary: Object.freeze({
      thresholdFreeCandidateFeaturesIssued: true as const,
      rawAggregateInputOnly: true as const,
      rawImageConsumedByThisArtifact: false as const,
      rawProviderResponseConsumedByThisArtifact: false as const,
      sourceDigestConsumedByThisArtifact: false as const,
      frData05PrimitiveFamilyReusedConceptuallyWithoutDatasetEvidenceReuse: true as const,
      syntheticUnitTestsMeanConstructValidity: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      exposureMetricValidated: false as const,
      sharpnessMetricValidated: false as const,
      lightingMetricValidated: false as const,
      occlusionValidityVerified: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      rawPixelRasterPersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR148_RESEARCH_NOTE_REF,
    nextFrontier: FR148_NEXT_FRONTIER,
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangCaptureQualityCandidateFeatureReportFR148(
  value: SquareBroadFangCaptureQualityCandidateFeatureReportFR148V1,
): void {
  if (!ISSUED.has(value)) fail('candidate feature report was not issued by the active FR-148 boundary.');
}
