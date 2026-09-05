import { describe, expect, it } from 'vitest';
import {
  FR150_NEXT_FRONTIER,
  FR150_PERTURBATION_SCHEDULES,
  assertIssuedSquareBroadFangControlledPerturbationExecutionFR150,
  getSquareBroadFangControlledPerturbationExecutionContractFR150,
  materializeSquareBroadFangControlledPerturbationExecutionFR150,
  type SquareBroadFangControlledPerturbationExecutionRequestFR150V1,
  type SquareBroadFangSourceRasterFR150V1,
} from './five-officers-square-broad-fang-capture-quality-controlled-perturbation-execution-fr150.js';

function raster(sourceRasterRef = 'source:fr150:test:001'): SquareBroadFangSourceRasterFR150V1 {
  return {
    sourceRasterRef,
    sourceBackingState: 'authorized_source_backed_ephemeral_raster',
    rasterWidth: 3,
    rasterHeight: 3,
    rgba: new Uint8Array([
      20, 30, 40, 255, 40, 50, 60, 255, 60, 70, 80, 255,
      80, 90, 100, 255, 100, 110, 120, 255, 120, 130, 140, 255,
      140, 150, 160, 255, 160, 170, 180, 255, 180, 190, 200, 255,
    ]),
  };
}

function request(sources: readonly SquareBroadFangSourceRasterFR150V1[] = [raster()]): SquareBroadFangControlledPerturbationExecutionRequestFR150V1 {
  return {
    schemaVersion: 'fr150-square-broad-fang-controlled-perturbation-execution-request-v1',
    sources,
  };
}

describe('FR150 square broad Fang controlled perturbation execution', () => {
  it('pins exact transform implementations and strength schedules before observation', () => {
    const contract = getSquareBroadFangControlledPerturbationExecutionContractFR150();
    expect(contract.executionBoundary.exactFamilyCount).toBe(5);
    expect(contract.executionBoundary.exactVariantCountPerFamily).toBe(3);
    expect(contract.executionBoundary.baselinePlusTwoNonBaselineStrengths).toBe(true);
    expect(contract.executionBoundary.transformImplementationPinnedBeforeObservation).toBe(true);
    expect(contract.executionBoundary.strengthSchedulePinnedBeforeObservation).toBe(true);
    expect(contract.executionBoundary.frozenFR148FormulasRequired).toBe(true);
    expect(contract.executionBoundary.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR150_NEXT_FRONTIER);

    expect(FR150_PERTURBATION_SCHEDULES.map((entry) => [entry.shortRef, entry.strengths.map((strength) => strength.strengthParameter)])).toEqual([
      ['dark', [0, 0.25, 0.5]],
      ['bright', [0, 0.25, 0.5]],
      ['blur', [0, 1, 2]],
      ['gradient', [0, 0.25, 0.5]],
      ['mask', [0, 0.25, 0.5]],
    ]);
    for (const schedule of FR150_PERTURBATION_SCHEDULES) {
      expect(schedule.transformImplementationRef).toMatch(/^fr150\./);
      expect(schedule.strengths).toHaveLength(3);
      expect(schedule.strengths[0]?.baseline).toBe(true);
      expect(schedule.strengths[1]?.baseline).toBe(false);
      expect(schedule.strengths[2]?.baseline).toBe(false);
    }
  });

  it('executes all five families and emits only frozen FR148 candidate features', () => {
    const report = materializeSquareBroadFangControlledPerturbationExecutionFR150(request());
    assertIssuedSquareBroadFangControlledPerturbationExecutionFR150(report);

    expect(report.observedSourceRasterCount).toBe(1);
    expect(report.observedFamilyExecutionCount).toBe(5);
    expect(report.observedVariantCount).toBe(15);
    expect(report.familyExecutions).toHaveLength(5);
    for (const family of report.familyExecutions) {
      expect(family.variants).toHaveLength(3);
      expect(family.numericAcceptanceThreshold).toBeNull();
      expect(family.constructValidationDecision).toBe('deferred');
      for (const variant of family.variants) {
        expect(variant.featureValues).toHaveLength(6);
        for (const feature of variant.featureValues) {
          expect(feature.value).toBeGreaterThanOrEqual(0);
          expect(feature.value).toBeLessThanOrEqual(1);
          expect(feature.classificationApplied).toBe(false);
          expect(feature.calibrationApplied).toBe(false);
          expect(feature.thresholdApplied).toBe(false);
          expect(feature.qualityConstructValidated).toBe(false);
        }
      }
    }

    expect(report.executionBoundary.empiricalPerturbationExecutionPerformed).toBe(true);
    expect(report.executionBoundary.featureResponseTrendObservationMaterialized).toBe(true);
    expect(report.executionBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(report.executionBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(report.executionBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(report.executionBoundary.captureQualityValidated).toBe(false);
    expect(report.executionBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(report.executionBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(report.executionBoundary.empiricalRepeatabilityEstablished).toBe(false);
  });

  it('observes the pre-registered directional ordering for deterministic intensity probes', () => {
    const report = materializeSquareBroadFangControlledPerturbationExecutionFR150(request());
    const dark = report.familyExecutions.find((entry) => entry.perturbationRef === 'perturbation.capture_quality.global_intensity_darkening');
    const bright = report.familyExecutions.find((entry) => entry.perturbationRef === 'perturbation.capture_quality.global_intensity_brightening');
    expect(dark?.primaryFeatureRef).toBe('candidate.capture_quality.rgb_sum_mean_normalized');
    expect(dark?.primaryExpectedTrend).toBe('non_increasing_with_strength');
    expect(dark?.primaryTrendObservation).toBe('directional_order_observed');
    expect(bright?.primaryFeatureRef).toBe('candidate.capture_quality.rgb_sum_mean_normalized');
    expect(bright?.primaryExpectedTrend).toBe('non_decreasing_with_strength');
    expect(bright?.primaryTrendObservation).toBe('directional_order_observed');
  });

  it('keeps raw rasters, aggregates, digests, provider payloads, and semantic authority out of output', () => {
    const report = materializeSquareBroadFangControlledPerturbationExecutionFR150(request());
    expect(report.privacyBoundary.rawImagePersisted).toBe(false);
    expect(report.privacyBoundary.rawImageReturned).toBe(false);
    expect(report.privacyBoundary.rawPixelRasterPersisted).toBe(false);
    expect(report.privacyBoundary.rawPixelRasterReturned).toBe(false);
    expect(report.privacyBoundary.rawAggregatePersisted).toBe(false);
    expect(report.privacyBoundary.rawAggregateReturned).toBe(false);
    expect(report.privacyBoundary.sourceDigestComputed).toBe(false);
    expect(report.privacyBoundary.sourceDigestPersisted).toBe(false);
    expect(report.privacyBoundary.sourceDigestReturned).toBe(false);
    expect(report.privacyBoundary.providerPayloadPersisted).toBe(false);
    expect(report.privacyBoundary.embeddingPersisted).toBe(false);
    expect(report.privacyBoundary.identityTemplatePersisted).toBe(false);
    expect(report.semanticAuthority.constructValidity).toBe('unresolved');
    expect(report.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(report.semanticAuthority.criterionState).toBeNull();
    expect(report.semanticAuthority.structuredClaim).toBeNull();
    expect(report.semanticAuthority.boundedNarrative).toBeNull();
    expect(report.traditionalSemanticAuthority).toBe(false);
    expect(JSON.stringify(report)).not.toContain('rgba');
  });

  it('fails closed on unauthorized fields, duplicate refs, invalid alpha, and malformed raster length', () => {
    expect(() => materializeSquareBroadFangControlledPerturbationExecutionFR150({
      ...request(),
      sourceDigest: 'forbidden',
    } as unknown as SquareBroadFangControlledPerturbationExecutionRequestFR150V1)).toThrow(/request contains unauthorized field/i);

    const first = raster('source:fr150:test:dup');
    expect(() => materializeSquareBroadFangControlledPerturbationExecutionFR150(request([first, raster('source:fr150:test:dup')]))).toThrow(/duplicate sourceRasterRef/i);

    const invalidAlpha = raster('source:fr150:test:alpha');
    const alphaBytes = new Uint8Array(invalidAlpha.rgba);
    alphaBytes[3] = 254;
    expect(() => materializeSquareBroadFangControlledPerturbationExecutionFR150(request([{
      ...invalidAlpha,
      rgba: alphaBytes,
    }]))).toThrow(/alpha must be fully opaque/i);

    expect(() => materializeSquareBroadFangControlledPerturbationExecutionFR150(request([{
      ...raster('source:fr150:test:length'),
      rgba: new Uint8Array([0, 0, 0, 255]),
    }]))).toThrow(/rgba length must equal width \* height \* 4/i);
  });

  it('rejects a forged FR150 execution at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangControlledPerturbationExecutionFR150(request());
    expect(() => assertIssuedSquareBroadFangControlledPerturbationExecutionFR150({ ...issued })).toThrow(/not issued by the active FR-150 boundary/i);
  });
});
