import { describe, expect, it } from 'vitest';
import {
  FR148_NEXT_FRONTIER,
  assertIssuedSquareBroadFangCaptureQualityCandidateFeatureReportFR148,
  getSquareBroadFangCaptureQualityCandidateFeatureContractFR148,
  materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148,
  type SquareBroadFangCaptureQualityCandidateFeaturesRequestFR148V1,
  type SquareBroadFangCaptureQualityRawAggregateFR148V1,
} from './five-officers-square-broad-fang-capture-quality-candidate-features-fr148.js';

function singlePixel(captureRef = 'capture:fr148:test:single'): SquareBroadFangCaptureQualityRawAggregateFR148V1 {
  return {
    captureRef,
    rasterWidth: 1,
    rasterHeight: 1,
    pixelCount: 1,
    rgbIntensity: {
      min: 300,
      max: 300,
      sum: 300,
      sumSquares: 90_000,
      anyChannelZeroPixelCount: 0,
      anyChannelFullScalePixelCount: 0,
    },
    adjacentIntensityDifferences: {
      horizontal: { pairCount: 0, squaredDifferenceSum: 0 },
      vertical: { pairCount: 0, squaredDifferenceSum: 0 },
    },
    spatialIntensityMoments: { xIndexWeightedSum: 0, yIndexWeightedSum: 0 },
  };
}

function varied2x2(captureRef = 'capture:fr148:test:varied'): SquareBroadFangCaptureQualityRawAggregateFR148V1 {
  return {
    captureRef,
    rasterWidth: 2,
    rasterHeight: 2,
    pixelCount: 4,
    rgbIntensity: {
      min: 0,
      max: 765,
      sum: 1_530,
      sumSquares: 910_350,
      anyChannelZeroPixelCount: 1,
      anyChannelFullScalePixelCount: 1,
    },
    adjacentIntensityDifferences: {
      horizontal: { pairCount: 2, squaredDifferenceSum: 130_050 },
      vertical: { pairCount: 2, squaredDifferenceSum: 520_200 },
    },
    spatialIntensityMoments: { xIndexWeightedSum: 1_020, yIndexWeightedSum: 1_275 },
  };
}

function request(captures: readonly SquareBroadFangCaptureQualityRawAggregateFR148V1[] = [singlePixel()]): SquareBroadFangCaptureQualityCandidateFeaturesRequestFR148V1 {
  return {
    schemaVersion: 'fr148-square-broad-fang-capture-quality-candidate-features-request-v1',
    captures,
  };
}

describe('FR148 square broad Fang capture-quality candidate features', () => {
  it('freezes threshold-free candidate definitions without validating capture quality', () => {
    const contract = getSquareBroadFangCaptureQualityCandidateFeatureContractFR148();
    expect(contract.candidateDefinitions.featureCount).toBe(6);
    expect(contract.candidateDefinitions.valuesBoundedToUnitInterval).toBe(true);
    expect(contract.candidateDefinitions.formulasFrozenBeforeEmpiricalValidation).toBe(true);
    expect(contract.authorityBoundary.candidateFeatureDefinitionMeansCaptureQualityConstructValidated).toBe(false);
    expect(contract.authorityBoundary.deterministicUnitTestsMeanCaptureQualityConstructValidated).toBe(false);
    expect(contract.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(contract.authorityBoundary.captureQualityValidated).toBe(false);
    expect(contract.authorityBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(contract.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.traditionalSemanticAuthority).toBe(false);
    expect(contract.nextFrontier).toBe(FR148_NEXT_FRONTIER);
  });

  it('computes six bounded candidate features from aggregate-only input', () => {
    const report = materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([singlePixel(), varied2x2()]));
    assertIssuedSquareBroadFangCaptureQualityCandidateFeatureReportFR148(report);
    expect(report.observedCaptureCount).toBe(2);
    expect(report.observations).toHaveLength(2);
    for (const observation of report.observations) {
      expect(observation.featureValues).toHaveLength(6);
      for (const feature of observation.featureValues) {
        expect(feature.value).toBeGreaterThanOrEqual(0);
        expect(feature.value).toBeLessThanOrEqual(1);
        expect(feature.classificationApplied).toBe(false);
        expect(feature.calibrationApplied).toBe(false);
        expect(feature.thresholdApplied).toBe(false);
        expect(feature.qualityConstructValidated).toBe(false);
      }
    }

    const first = report.observations[0]!;
    const values = Object.fromEntries(first.featureValues.map((feature) => [feature.featureRef, feature.value]));
    expect(values['candidate.capture_quality.rgb_sum_mean_normalized']).toBeCloseTo(300 / 765, 12);
    expect(values['candidate.capture_quality.rgb_sum_standard_deviation_normalized']).toBe(0);
    expect(values['candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized']).toBe(0);
    expect(values['candidate.capture_quality.any_channel_zero_fraction']).toBe(0);
    expect(values['candidate.capture_quality.any_channel_full_scale_fraction']).toBe(0);
    expect(values['candidate.capture_quality.intensity_centroid_offset_magnitude_normalized']).toBe(0);

    expect(report.measurementBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(report.measurementBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(report.measurementBoundary.exposureMetricValidated).toBe(false);
    expect(report.measurementBoundary.sharpnessMetricValidated).toBe(false);
    expect(report.measurementBoundary.lightingMetricValidated).toBe(false);
    expect(report.measurementBoundary.occlusionValidityVerified).toBe(false);
    expect(report.measurementBoundary.numericCaptureQualityThreshold).toBeNull();
    expect(report.measurementBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(report.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects raw image, digest, threshold, and unauthorized fields through strict allowlists', () => {
    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148({
      ...request(),
      rawImage: 'forbidden',
    } as unknown as SquareBroadFangCaptureQualityCandidateFeaturesRequestFR148V1)).toThrow(/request contains unauthorized field/i);

    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([{
      ...singlePixel(),
      sourceDigest: 'sha256:forbidden',
    } as unknown as SquareBroadFangCaptureQualityRawAggregateFR148V1]))).toThrow(/capture 0 contains unauthorized field/i);

    const aggregate = singlePixel();
    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([{
      ...aggregate,
      rgbIntensity: { ...aggregate.rgbIntensity, threshold: 0.5 },
    } as unknown as SquareBroadFangCaptureQualityRawAggregateFR148V1]))).toThrow(/rgbIntensity contains unauthorized field/i);
  });

  it('rejects invalid raster arithmetic, adjacency counts, moments, and duplicate capture refs', () => {
    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([{
      ...singlePixel(),
      pixelCount: 2,
    }]))).toThrow(/pixelCount must exactly equal width \* height/i);

    const varied = varied2x2();
    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([{
      ...varied,
      adjacentIntensityDifferences: {
        ...varied.adjacentIntensityDifferences,
        horizontal: { pairCount: 1, squaredDifferenceSum: 0 },
      },
    }]))).toThrow(/pairCount must equal raster adjacency count/i);

    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([{
      ...singlePixel(),
      spatialIntensityMoments: { xIndexWeightedSum: 1, yIndexWeightedSum: 0 },
    }]))).toThrow(/xIndexWeightedSum exceeds mathematical maximum/i);

    expect(() => materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([
      singlePixel('capture:fr148:test:dup'),
      singlePixel('capture:fr148:test:dup'),
    ]))).toThrow(/duplicate captureRef/i);
  });

  it('keeps synthetic arithmetic verification separate from empirical construct validity', () => {
    const report = materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request([varied2x2()]));
    expect(report.measurementBoundary.syntheticUnitTestsMeanConstructValidity).toBe(false);
    expect(report.measurementBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(report.measurementBoundary.captureQualityValidated).toBe(false);
    expect(report.measurementBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(report.semanticAuthority.constructValidity).toBe('unresolved');
    expect(report.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(report.semanticAuthority.criterionState).toBeNull();
    expect(report.semanticAuthority.structuredClaim).toBeNull();
    expect(report.semanticAuthority.boundedNarrative).toBeNull();
  });

  it('rejects a forged FR148 report at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148(request());
    expect(() => assertIssuedSquareBroadFangCaptureQualityCandidateFeatureReportFR148({ ...issued })).toThrow(/not issued by the active FR-148 boundary/i);
  });
});
