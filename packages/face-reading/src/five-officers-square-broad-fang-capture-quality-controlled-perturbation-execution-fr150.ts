import {
  materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148,
  type SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1,
  type SquareBroadFangCaptureQualityCandidateFeatureValueFR148V1,
  type SquareBroadFangCaptureQualityRawAggregateFR148V1,
} from './five-officers-square-broad-fang-capture-quality-candidate-features-fr148.js';
import {
  FR149_NEXT_FRONTIER,
  assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149,
  materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149,
  type SquareBroadFangControlledPerturbationFamilyRefFR149V1,
  type SquareBroadFangPerturbationExpectedTrendFR149V1,
} from './five-officers-square-broad-fang-capture-quality-perturbation-protocol-fr149.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR150_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_capture_quality_controlled_perturbation_execution.fr150' as const;
export const FR150_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr150-square-broad-fang-capture-quality-controlled-perturbation-execution.md' as const;
export const FR150_NEXT_FRONTIER =
  'square_broad_fang_capture_quality_perturbation_evidence_review_and_independent_multi_session_evidence_acquisition_before_construct_validation_or_thresholds' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,159}$/u;
const REQUEST_KEYS = new Set(['schemaVersion', 'sources']);
const SOURCE_KEYS = new Set(['sourceRasterRef', 'sourceBackingState', 'rasterWidth', 'rasterHeight', 'rgba']);
const ISSUED = new WeakSet<object>();
const MAX_RGB_SUM = 765;

export interface SquareBroadFangSourceRasterFR150V1 {
  readonly sourceRasterRef: string;
  readonly sourceBackingState: 'authorized_source_backed_ephemeral_raster';
  readonly rasterWidth: number;
  readonly rasterHeight: number;
  readonly rgba: Uint8Array;
}

export interface SquareBroadFangControlledPerturbationExecutionRequestFR150V1 {
  readonly schemaVersion: 'fr150-square-broad-fang-controlled-perturbation-execution-request-v1';
  readonly sources: readonly SquareBroadFangSourceRasterFR150V1[];
}

export type SquareBroadFangPerturbationParameterUnitFR150V1 =
  | 'fraction_toward_black'
  | 'fraction_toward_white'
  | 'binomial_kernel_order'
  | 'horizontal_gain_half_range_fraction'
  | 'center_mask_side_fraction';

export interface SquareBroadFangPerturbationStrengthFR150V1 {
  readonly strengthOrder: 0 | 1 | 2;
  readonly strengthParameter: number;
  readonly parameterUnit: SquareBroadFangPerturbationParameterUnitFR150V1;
  readonly baseline: boolean;
}

export interface SquareBroadFangPerturbationScheduleFR150V1 {
  readonly perturbationRef: SquareBroadFangControlledPerturbationFamilyRefFR149V1;
  readonly shortRef: 'dark' | 'bright' | 'blur' | 'gradient' | 'mask';
  readonly transformImplementationRef: string;
  readonly strengths: readonly [
    SquareBroadFangPerturbationStrengthFR150V1,
    SquareBroadFangPerturbationStrengthFR150V1,
    SquareBroadFangPerturbationStrengthFR150V1,
  ];
}

export type SquareBroadFangPrimaryTrendObservationFR150V1 =
  | 'directional_order_observed'
  | 'directional_order_not_observed'
  | 'magnitude_change_observed'
  | 'no_magnitude_change_observed'
  | 'no_directional_acceptance_rule';

export interface SquareBroadFangPerturbationVariantObservationFR150V1 {
  readonly variantRef: string;
  readonly strengthOrder: 0 | 1 | 2;
  readonly strengthParameter: number;
  readonly parameterUnit: SquareBroadFangPerturbationParameterUnitFR150V1;
  readonly baseline: boolean;
  readonly featureValues: readonly SquareBroadFangCaptureQualityCandidateFeatureValueFR148V1[];
}

export interface SquareBroadFangPerturbationFamilyExecutionFR150V1 {
  readonly sourceRasterRef: string;
  readonly perturbationRef: SquareBroadFangControlledPerturbationFamilyRefFR149V1;
  readonly transformImplementationRef: string;
  readonly variants: readonly SquareBroadFangPerturbationVariantObservationFR150V1[];
  readonly primaryFeatureRef: SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1 | null;
  readonly primaryExpectedTrend: SquareBroadFangPerturbationExpectedTrendFR149V1 | null;
  readonly primaryTrendObservation: SquareBroadFangPrimaryTrendObservationFR150V1;
  readonly numericAcceptanceThreshold: null;
  readonly constructValidationDecision: 'deferred';
}

export interface SquareBroadFangControlledPerturbationExecutionFR150V1 {
  readonly schemaVersion: 'fr150-square-broad-fang-controlled-perturbation-execution-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR150_RECORD_ID;
  readonly authorityState: 'controlled_perturbation_execution_materialized_feature_response_observation_only';
  readonly predecessor: {
    readonly fr149NextFrontier: typeof FR149_NEXT_FRONTIER;
    readonly fr149ProtocolIssuedInProcess: true;
    readonly requiredPerturbationFamilyCount: 5;
    readonly minimumDistinctNonBaselineStrengthsPerFamily: 2;
  };
  readonly schedules: readonly SquareBroadFangPerturbationScheduleFR150V1[];
  readonly observedSourceRasterCount: number;
  readonly observedFamilyExecutionCount: number;
  readonly observedVariantCount: number;
  readonly familyExecutions: readonly SquareBroadFangPerturbationFamilyExecutionFR150V1[];
  readonly executionBoundary: {
    readonly sourceBackingAssertionRequired: true;
    readonly sourceBackingIndependentlyVerifiedByThisArtifact: false;
    readonly allRequiredFamiliesExecutedAgainstEachSource: true;
    readonly baselineAndTwoNonBaselineStrengthsExecutedPerFamily: true;
    readonly transformationImplementationsPinnedBeforeObservation: true;
    readonly strengthSchedulesPinnedBeforeObservation: true;
    readonly singleFactorManipulationApplied: true;
    readonly frozenFR148CandidateFormulasUsed: true;
    readonly empiricalPerturbationExecutionPerformed: true;
    readonly featureResponseTrendObservationMaterialized: true;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly exposureMetricValidated: false;
    readonly sharpnessMetricValidated: false;
    readonly lightingMetricValidated: false;
    readonly occlusionValidityVerified: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawImageReturned: false;
    readonly rawPixelRasterPersisted: false;
    readonly rawPixelRasterReturned: false;
    readonly rawAggregatePersisted: false;
    readonly rawAggregateReturned: false;
    readonly sourceDigestComputed: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly providerPayloadPersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR150_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR150_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-150 ${message}`);
}

function exactKeys(value: object, allowed: ReadonlySet<string>, label: string): void {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`${label} contains unauthorized field: ${unexpected}.`);
}

function positiveSafeInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) fail(`${label} must be a positive safe integer.`);
  return value;
}

function safeProduct(values: readonly number[], label: string): number {
  let result = 1;
  for (const value of values) {
    if (!Number.isSafeInteger(value) || value < 0) fail(`${label} factors must be non-negative safe integers.`);
    result *= value;
    if (!Number.isSafeInteger(result)) fail(`${label} exceeds JavaScript safe-integer range.`);
  }
  return result;
}

function strength(
  strengthOrder: 0 | 1 | 2,
  strengthParameter: number,
  parameterUnit: SquareBroadFangPerturbationParameterUnitFR150V1,
): SquareBroadFangPerturbationStrengthFR150V1 {
  return Object.freeze({ strengthOrder, strengthParameter, parameterUnit, baseline: strengthOrder === 0 });
}

export const FR150_PERTURBATION_SCHEDULES: readonly SquareBroadFangPerturbationScheduleFR150V1[] = Object.freeze([
  Object.freeze({
    perturbationRef: 'perturbation.capture_quality.global_intensity_darkening' as const,
    shortRef: 'dark' as const,
    transformImplementationRef: 'fr150.linear_channel_scale_toward_black_round_half_up.v1',
    strengths: Object.freeze([
      strength(0, 0, 'fraction_toward_black'),
      strength(1, 0.25, 'fraction_toward_black'),
      strength(2, 0.5, 'fraction_toward_black'),
    ]),
  }),
  Object.freeze({
    perturbationRef: 'perturbation.capture_quality.global_intensity_brightening' as const,
    shortRef: 'bright' as const,
    transformImplementationRef: 'fr150.linear_channel_scale_toward_white_round_half_up.v1',
    strengths: Object.freeze([
      strength(0, 0, 'fraction_toward_white'),
      strength(1, 0.25, 'fraction_toward_white'),
      strength(2, 0.5, 'fraction_toward_white'),
    ]),
  }),
  Object.freeze({
    perturbationRef: 'perturbation.capture_quality.gaussian_blur' as const,
    shortRef: 'blur' as const,
    transformImplementationRef: 'fr150.separable_equivalent_binomial_2d_clamp_edge_round_half_up.v1',
    strengths: Object.freeze([
      strength(0, 0, 'binomial_kernel_order'),
      strength(1, 1, 'binomial_kernel_order'),
      strength(2, 2, 'binomial_kernel_order'),
    ]),
  }),
  Object.freeze({
    perturbationRef: 'perturbation.capture_quality.spatial_illumination_gradient' as const,
    shortRef: 'gradient' as const,
    transformImplementationRef: 'fr150.horizontal_linear_gain_gradient_round_half_up.v1',
    strengths: Object.freeze([
      strength(0, 0, 'horizontal_gain_half_range_fraction'),
      strength(1, 0.25, 'horizontal_gain_half_range_fraction'),
      strength(2, 0.5, 'horizontal_gain_half_range_fraction'),
    ]),
  }),
  Object.freeze({
    perturbationRef: 'perturbation.capture_quality.opaque_region_mask_negative_control' as const,
    shortRef: 'mask' as const,
    transformImplementationRef: 'fr150.centered_black_rectangle_side_fraction.v1',
    strengths: Object.freeze([
      strength(0, 0, 'center_mask_side_fraction'),
      strength(1, 0.25, 'center_mask_side_fraction'),
      strength(2, 0.5, 'center_mask_side_fraction'),
    ]),
  }),
]);

function validateSource(source: SquareBroadFangSourceRasterFR150V1, index: number): void {
  if (typeof source !== 'object' || source === null) fail(`source ${index} must be an object.`);
  exactKeys(source, SOURCE_KEYS, `source ${index}`);
  if (!SAFE_REF.test(source.sourceRasterRef)) fail(`source ${index} sourceRasterRef must be a bounded opaque reference.`);
  if (source.sourceBackingState !== 'authorized_source_backed_ephemeral_raster') {
    fail(`source ${index} must carry the authorized source-backed ephemeral assertion.`);
  }
  const width = positiveSafeInteger(source.rasterWidth, `source ${index} rasterWidth`);
  const height = positiveSafeInteger(source.rasterHeight, `source ${index} rasterHeight`);
  if (!(source.rgba instanceof Uint8Array)) fail(`source ${index} rgba must be Uint8Array.`);
  const expectedLength = safeProduct([width, height, 4], `source ${index} rgba length`);
  if (source.rgba.length !== expectedLength) fail(`source ${index} rgba length must equal width * height * 4.`);
  for (let offset = 3; offset < source.rgba.length; offset += 4) {
    if (source.rgba[offset] !== 255) fail(`source ${index} alpha must be fully opaque.`);
  }
}

function validateRequest(request: SquareBroadFangControlledPerturbationExecutionRequestFR150V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr150-square-broad-fang-controlled-perturbation-execution-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  if (!Array.isArray(request.sources) || request.sources.length === 0) fail('sources must contain at least one source-backed raster.');
  const refs = new Set<string>();
  request.sources.forEach((source, index) => {
    validateSource(source, index);
    if (refs.has(source.sourceRasterRef)) fail(`sources duplicate sourceRasterRef ${source.sourceRasterRef}.`);
    refs.add(source.sourceRasterRef);
  });
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function copyRaster(rgba: Uint8Array): Uint8Array {
  return new Uint8Array(rgba);
}

function transformTowardBlack(rgba: Uint8Array, fraction: number): Uint8Array {
  if (fraction === 0) return copyRaster(rgba);
  const output = copyRaster(rgba);
  const factor = 1 - fraction;
  for (let offset = 0; offset < output.length; offset += 4) {
    output[offset] = clampByte(output[offset]! * factor);
    output[offset + 1] = clampByte(output[offset + 1]! * factor);
    output[offset + 2] = clampByte(output[offset + 2]! * factor);
  }
  return output;
}

function transformTowardWhite(rgba: Uint8Array, fraction: number): Uint8Array {
  if (fraction === 0) return copyRaster(rgba);
  const output = copyRaster(rgba);
  for (let offset = 0; offset < output.length; offset += 4) {
    output[offset] = clampByte(output[offset]! + ((255 - output[offset]!) * fraction));
    output[offset + 1] = clampByte(output[offset + 1]! + ((255 - output[offset + 1]!) * fraction));
    output[offset + 2] = clampByte(output[offset + 2]! + ((255 - output[offset + 2]!) * fraction));
  }
  return output;
}

function transformBinomialBlur(rgba: Uint8Array, width: number, height: number, order: number): Uint8Array {
  if (order === 0) return copyRaster(rgba);
  const kernel = order === 1 ? [1, 2, 1] : [1, 4, 6, 4, 1];
  const radius = Math.floor(kernel.length / 2);
  const oneDimensionalDivisor = kernel.reduce((sum, value) => sum + value, 0);
  const divisor = oneDimensionalDivisor * oneDimensionalDivisor;
  const output = copyRaster(rgba);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const destination = ((y * width) + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        let weighted = 0;
        for (let ky = -radius; ky <= radius; ky += 1) {
          const sy = Math.max(0, Math.min(height - 1, y + ky));
          const wy = kernel[ky + radius]!;
          for (let kx = -radius; kx <= radius; kx += 1) {
            const sx = Math.max(0, Math.min(width - 1, x + kx));
            const wx = kernel[kx + radius]!;
            const sourceOffset = ((sy * width) + sx) * 4;
            weighted += rgba[sourceOffset + channel]! * wx * wy;
          }
        }
        output[destination + channel] = clampByte(weighted / divisor);
      }
    }
  }
  return output;
}

function transformHorizontalGradient(rgba: Uint8Array, width: number, height: number, halfRange: number): Uint8Array {
  if (halfRange === 0) return copyRaster(rgba);
  const output = copyRaster(rgba);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const normalizedX = width === 1 ? 0 : ((2 * x) / (width - 1)) - 1;
      const gain = 1 + (halfRange * normalizedX);
      const offset = ((y * width) + x) * 4;
      output[offset] = clampByte(output[offset]! * gain);
      output[offset + 1] = clampByte(output[offset + 1]! * gain);
      output[offset + 2] = clampByte(output[offset + 2]! * gain);
    }
  }
  return output;
}

function transformCenteredMask(rgba: Uint8Array, width: number, height: number, sideFraction: number): Uint8Array {
  if (sideFraction === 0) return copyRaster(rgba);
  const output = copyRaster(rgba);
  const maskWidth = Math.max(1, Math.round(width * sideFraction));
  const maskHeight = Math.max(1, Math.round(height * sideFraction));
  const startX = Math.floor((width - maskWidth) / 2);
  const startY = Math.floor((height - maskHeight) / 2);
  for (let y = startY; y < startY + maskHeight; y += 1) {
    for (let x = startX; x < startX + maskWidth; x += 1) {
      const offset = ((y * width) + x) * 4;
      output[offset] = 0;
      output[offset + 1] = 0;
      output[offset + 2] = 0;
    }
  }
  return output;
}

function applyTransform(
  schedule: SquareBroadFangPerturbationScheduleFR150V1,
  strengthEntry: SquareBroadFangPerturbationStrengthFR150V1,
  source: SquareBroadFangSourceRasterFR150V1,
): Uint8Array {
  switch (schedule.shortRef) {
    case 'dark': return transformTowardBlack(source.rgba, strengthEntry.strengthParameter);
    case 'bright': return transformTowardWhite(source.rgba, strengthEntry.strengthParameter);
    case 'blur': return transformBinomialBlur(source.rgba, source.rasterWidth, source.rasterHeight, strengthEntry.strengthParameter);
    case 'gradient': return transformHorizontalGradient(source.rgba, source.rasterWidth, source.rasterHeight, strengthEntry.strengthParameter);
    case 'mask': return transformCenteredMask(source.rgba, source.rasterWidth, source.rasterHeight, strengthEntry.strengthParameter);
  }
}

function variantRef(sourceRasterRef: string, shortRef: SquareBroadFangPerturbationScheduleFR150V1['shortRef'], order: 0 | 1 | 2): string {
  return `${sourceRasterRef}:fr150:${shortRef}:s${order}`;
}

function rawAggregate(
  ref: string,
  width: number,
  height: number,
  rgba: Uint8Array,
): SquareBroadFangCaptureQualityRawAggregateFR148V1 {
  const pixelCount = safeProduct([width, height], `${ref}.pixelCount`);
  const rgbSums = new Uint16Array(pixelCount);
  let min = MAX_RGB_SUM;
  let max = 0;
  let sum = 0;
  let sumSquares = 0;
  let anyChannelZeroPixelCount = 0;
  let anyChannelFullScalePixelCount = 0;
  let xIndexWeightedSum = 0;
  let yIndexWeightedSum = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixelIndex = (y * width) + x;
      const offset = pixelIndex * 4;
      const red = rgba[offset]!;
      const green = rgba[offset + 1]!;
      const blue = rgba[offset + 2]!;
      const intensity = red + green + blue;
      rgbSums[pixelIndex] = intensity;
      min = Math.min(min, intensity);
      max = Math.max(max, intensity);
      sum += intensity;
      sumSquares += intensity * intensity;
      if (red === 0 || green === 0 || blue === 0) anyChannelZeroPixelCount += 1;
      if (red === 255 || green === 255 || blue === 255) anyChannelFullScalePixelCount += 1;
      xIndexWeightedSum += x * intensity;
      yIndexWeightedSum += y * intensity;
    }
  }

  let horizontalSquaredDifferenceSum = 0;
  let verticalSquaredDifferenceSum = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width) + x;
      if (x + 1 < width) {
        const difference = rgbSums[index]! - rgbSums[index + 1]!;
        horizontalSquaredDifferenceSum += difference * difference;
      }
      if (y + 1 < height) {
        const difference = rgbSums[index]! - rgbSums[index + width]!;
        verticalSquaredDifferenceSum += difference * difference;
      }
    }
  }

  for (const [value, label] of [
    [sum, 'sum'], [sumSquares, 'sumSquares'], [xIndexWeightedSum, 'xIndexWeightedSum'],
    [yIndexWeightedSum, 'yIndexWeightedSum'], [horizontalSquaredDifferenceSum, 'horizontalSquaredDifferenceSum'],
    [verticalSquaredDifferenceSum, 'verticalSquaredDifferenceSum'],
  ] as const) {
    if (!Number.isSafeInteger(value)) fail(`${ref}.${label} exceeds JavaScript safe-integer range.`);
  }

  return {
    captureRef: ref,
    rasterWidth: width,
    rasterHeight: height,
    pixelCount,
    rgbIntensity: {
      min,
      max,
      sum,
      sumSquares,
      anyChannelZeroPixelCount,
      anyChannelFullScalePixelCount,
    },
    adjacentIntensityDifferences: {
      horizontal: {
        pairCount: safeProduct([Math.max(0, width - 1), height], `${ref}.horizontalPairCount`),
        squaredDifferenceSum: horizontalSquaredDifferenceSum,
      },
      vertical: {
        pairCount: safeProduct([width, Math.max(0, height - 1)], `${ref}.verticalPairCount`),
        squaredDifferenceSum: verticalSquaredDifferenceSum,
      },
    },
    spatialIntensityMoments: { xIndexWeightedSum, yIndexWeightedSum },
  };
}

function trendObservation(
  expectedTrend: SquareBroadFangPerturbationExpectedTrendFR149V1 | null,
  values: readonly number[],
): SquareBroadFangPrimaryTrendObservationFR150V1 {
  if (expectedTrend === null || expectedTrend === 'no_directional_acceptance_rule') return 'no_directional_acceptance_rule';
  if (expectedTrend === 'magnitude_change_expected_direction_not_fixed') {
    return values.slice(1).some((value) => value !== values[0])
      ? 'magnitude_change_observed'
      : 'no_magnitude_change_observed';
  }
  const observed = expectedTrend === 'non_increasing_with_strength'
    ? values.every((value, index) => index === 0 || values[index - 1]! >= value)
    : values.every((value, index) => index === 0 || values[index - 1]! <= value);
  return observed ? 'directional_order_observed' : 'directional_order_not_observed';
}

export function getSquareBroadFangControlledPerturbationExecutionContractFR150() {
  const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();
  assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149(protocol);
  const refs = protocol.perturbationFamilies.map((entry) => entry.perturbationRef);
  if (
    protocol.nextFrontier !== FR149_NEXT_FRONTIER
    || protocol.perturbationDesign.requiredFamilyCount !== 5
    || protocol.perturbationDesign.minimumDistinctNonBaselineStrengthsPerFamily !== 2
    || protocol.measurementBoundary.empiricalPerturbationExecutionPerformed !== false
    || refs.length !== FR150_PERTURBATION_SCHEDULES.length
    || refs.some((ref, index) => ref !== FR150_PERTURBATION_SCHEDULES[index]?.perturbationRef)
  ) fail('FR-149 predecessor protocol drift.');

  return Object.freeze({
    schemaVersion: 'fr150-square-broad-fang-controlled-perturbation-execution-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR150_RECORD_ID,
    predecessor: Object.freeze({ fr149NextFrontier: FR149_NEXT_FRONTIER }),
    schedules: FR150_PERTURBATION_SCHEDULES,
    executionBoundary: Object.freeze({
      sourceBackedEphemeralRasterRequired: true as const,
      exactFamilyCount: 5 as const,
      exactVariantCountPerFamily: 3 as const,
      baselinePlusTwoNonBaselineStrengths: true as const,
      transformImplementationPinnedBeforeObservation: true as const,
      strengthSchedulePinnedBeforeObservation: true as const,
      frozenFR148FormulasRequired: true as const,
      rawMediaOrRasterOutputAllowed: false as const,
      sourceDigestRequired: false as const,
      constructValidationPerformedByThisArtifact: false as const,
      captureQualityThresholdsDefined: false as const,
      repeatabilityThresholdsDefined: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: FR150_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangControlledPerturbationExecutionFR150(
  request: SquareBroadFangControlledPerturbationExecutionRequestFR150V1,
): SquareBroadFangControlledPerturbationExecutionFR150V1 {
  validateRequest(request);
  const contract = getSquareBroadFangControlledPerturbationExecutionContractFR150();
  if (contract.nextFrontier !== FR150_NEXT_FRONTIER) fail('FR-150 contract drift at execution time.');

  const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();
  assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149(protocol);
  const aggregates: SquareBroadFangCaptureQualityRawAggregateFR148V1[] = [];
  const variantRasters = new Map<string, Uint8Array>();

  for (const source of request.sources) {
    for (const schedule of FR150_PERTURBATION_SCHEDULES) {
      for (const strengthEntry of schedule.strengths) {
        const ref = variantRef(source.sourceRasterRef, schedule.shortRef, strengthEntry.strengthOrder);
        const transformed = applyTransform(schedule, strengthEntry, source);
        variantRasters.set(ref, transformed);
        aggregates.push(rawAggregate(ref, source.rasterWidth, source.rasterHeight, transformed));
      }
    }
  }

  const fr148 = materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148({
    schemaVersion: 'fr148-square-broad-fang-capture-quality-candidate-features-request-v1',
    captures: aggregates,
  });
  const byRef = new Map(fr148.observations.map((observation) => [observation.captureRef, observation] as const));

  const familyExecutions: SquareBroadFangPerturbationFamilyExecutionFR150V1[] = [];
  for (const source of request.sources) {
    for (const schedule of FR150_PERTURBATION_SCHEDULES) {
      const protocolFamily = protocol.perturbationFamilies.find((entry) => entry.perturbationRef === schedule.perturbationRef);
      if (protocolFamily === undefined) fail(`missing FR-149 family ${schedule.perturbationRef}.`);
      const primary = protocolFamily.featureHypotheses.find((entry) => entry.role === 'primary') ?? null;
      const variants = schedule.strengths.map((strengthEntry) => {
        const ref = variantRef(source.sourceRasterRef, schedule.shortRef, strengthEntry.strengthOrder);
        const observation = byRef.get(ref);
        if (observation === undefined) fail(`missing FR-148 observation ${ref}.`);
        return Object.freeze({
          variantRef: ref,
          strengthOrder: strengthEntry.strengthOrder,
          strengthParameter: strengthEntry.strengthParameter,
          parameterUnit: strengthEntry.parameterUnit,
          baseline: strengthEntry.baseline,
          featureValues: observation.featureValues,
        });
      });
      const primaryValues = primary === null
        ? []
        : variants.map((variant) => {
          const feature = variant.featureValues.find((entry) => entry.featureRef === primary.featureRef);
          if (feature === undefined) fail(`missing primary feature ${primary.featureRef}.`);
          return feature.value;
        });
      familyExecutions.push(Object.freeze({
        sourceRasterRef: source.sourceRasterRef,
        perturbationRef: schedule.perturbationRef,
        transformImplementationRef: schedule.transformImplementationRef,
        variants: Object.freeze(variants),
        primaryFeatureRef: primary?.featureRef ?? null,
        primaryExpectedTrend: primary?.expectedTrend ?? null,
        primaryTrendObservation: trendObservation(primary?.expectedTrend ?? null, primaryValues),
        numericAcceptanceThreshold: null,
        constructValidationDecision: 'deferred' as const,
      }));
    }
  }

  variantRasters.clear();
  aggregates.length = 0;

  const output: SquareBroadFangControlledPerturbationExecutionFR150V1 = Object.freeze({
    schemaVersion: 'fr150-square-broad-fang-controlled-perturbation-execution-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR150_RECORD_ID,
    authorityState: 'controlled_perturbation_execution_materialized_feature_response_observation_only' as const,
    predecessor: Object.freeze({
      fr149NextFrontier: FR149_NEXT_FRONTIER,
      fr149ProtocolIssuedInProcess: true as const,
      requiredPerturbationFamilyCount: 5 as const,
      minimumDistinctNonBaselineStrengthsPerFamily: 2 as const,
    }),
    schedules: FR150_PERTURBATION_SCHEDULES,
    observedSourceRasterCount: request.sources.length,
    observedFamilyExecutionCount: familyExecutions.length,
    observedVariantCount: familyExecutions.length * 3,
    familyExecutions: Object.freeze(familyExecutions),
    executionBoundary: Object.freeze({
      sourceBackingAssertionRequired: true as const,
      sourceBackingIndependentlyVerifiedByThisArtifact: false as const,
      allRequiredFamiliesExecutedAgainstEachSource: true as const,
      baselineAndTwoNonBaselineStrengthsExecutedPerFamily: true as const,
      transformationImplementationsPinnedBeforeObservation: true as const,
      strengthSchedulesPinnedBeforeObservation: true as const,
      singleFactorManipulationApplied: true as const,
      frozenFR148CandidateFormulasUsed: true as const,
      empiricalPerturbationExecutionPerformed: true as const,
      featureResponseTrendObservationMaterialized: true as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      exposureMetricValidated: false as const,
      sharpnessMetricValidated: false as const,
      lightingMetricValidated: false as const,
      occlusionValidityVerified: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawImageReturned: false as const,
      rawPixelRasterPersisted: false as const,
      rawPixelRasterReturned: false as const,
      rawAggregatePersisted: false as const,
      rawAggregateReturned: false as const,
      sourceDigestComputed: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      providerPayloadPersisted: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR150_RESEARCH_NOTE_REF,
    nextFrontier: FR150_NEXT_FRONTIER,
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangControlledPerturbationExecutionFR150(
  value: SquareBroadFangControlledPerturbationExecutionFR150V1,
): void {
  if (!ISSUED.has(value)) fail('controlled perturbation execution was not issued by the active FR-150 boundary.');
}
