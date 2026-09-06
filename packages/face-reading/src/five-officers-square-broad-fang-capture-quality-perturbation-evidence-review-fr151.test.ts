import { describe, expect, it } from 'vitest';
import {
  materializeSquareBroadFangControlledPerturbationExecutionFR150,
  type SquareBroadFangSourceRasterFR150V1,
} from './five-officers-square-broad-fang-capture-quality-controlled-perturbation-execution-fr150.js';
import {
  FR151_NEXT_FRONTIER,
  assertIssuedSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151,
  getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151,
  materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151,
  type SquareBroadFangCaptureQualityPerturbationEvidenceReviewRequestFR151V1,
} from './five-officers-square-broad-fang-capture-quality-perturbation-evidence-review-fr151.js';

function raster(sourceRasterRef: string, reverse = false): SquareBroadFangSourceRasterFR150V1 {
  const values = reverse
    ? [180, 190, 200, 160, 170, 180, 140, 150, 160, 120, 130, 140, 100, 110, 120, 80, 90, 100, 60, 70, 80, 40, 50, 60, 20, 30, 40]
    : [20, 30, 40, 40, 50, 60, 60, 70, 80, 80, 90, 100, 100, 110, 120, 120, 130, 140, 140, 150, 160, 160, 170, 180, 180, 190, 200];
  const rgba = new Uint8Array(3 * 3 * 4);
  for (let index = 0; index < 9; index += 1) {
    rgba[(index * 4)] = values[(index * 3)]!;
    rgba[(index * 4) + 1] = values[(index * 3) + 1]!;
    rgba[(index * 4) + 2] = values[(index * 3) + 2]!;
    rgba[(index * 4) + 3] = 255;
  }
  return {
    sourceRasterRef,
    sourceBackingState: 'authorized_source_backed_ephemeral_raster',
    rasterWidth: 3,
    rasterHeight: 3,
    rgba,
  };
}

function narrowUniformRaster(sourceRasterRef = 'source:fr151:test:narrow'): SquareBroadFangSourceRasterFR150V1 {
  return {
    sourceRasterRef,
    sourceBackingState: 'authorized_source_backed_ephemeral_raster',
    rasterWidth: 1,
    rasterHeight: 2,
    rgba: new Uint8Array([
      100, 100, 100, 255,
      100, 100, 100, 255,
    ]),
  };
}

function reviewRequest(
  sources: readonly SquareBroadFangSourceRasterFR150V1[] = [
    raster('source:fr151:test:001'),
    raster('source:fr151:test:002', true),
  ],
): SquareBroadFangCaptureQualityPerturbationEvidenceReviewRequestFR151V1 {
  const execution = materializeSquareBroadFangControlledPerturbationExecutionFR150({
    schemaVersion: 'fr150-square-broad-fang-controlled-perturbation-execution-request-v1',
    sources,
  });
  return {
    schemaVersion: 'fr151-square-broad-fang-capture-quality-perturbation-evidence-review-request-v1',
    execution,
  };
}

describe('FR151 square broad Fang perturbation evidence review', () => {
  it('freezes categorical review without numeric cutoff or construct promotion', () => {
    const contract = getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151();
    expect(contract.reviewBoundary.issuedFR150ExecutionRequired).toBe(true);
    expect(contract.reviewBoundary.numericFeatureValuesRequiredForReview).toBe(false);
    expect(contract.reviewBoundary.categoricalTrendObservationOnly).toBe(true);
    expect(contract.reviewBoundary.postHocNumericCutoffAllowed).toBe(false);
    expect(contract.reviewBoundary.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.reviewBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(contract.reviewBoundary.repeatabilityThresholdsDefined).toBe(false);
    expect(contract.reviewBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(contract.reviewBoundary.traditionalSemanticAuthority).toBe(false);
    expect(contract.nextFrontier).toBe(FR151_NEXT_FRONTIER);
  });

  it('reviews two source-backed executions using only pre-registered categorical trend observations', () => {
    const report = materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(reviewRequest());
    assertIssuedSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(report);

    expect(report.reviewedSourceRasterCount).toBe(2);
    expect(report.reviewedFamilyExecutionCount).toBe(10);
    expect(report.directionalExpectationExecutionCount).toBe(6);
    expect(report.magnitudeChangeExpectationExecutionCount).toBe(2);
    expect(report.noDirectionalRuleExecutionCount).toBe(2);
    expect(report.preRegisteredExpectationObservedCount).toBe(8);
    expect(report.preRegisteredExpectationNotObservedCount).toBe(0);
    expect(report.allPreRegisteredExpectationsObservedAcrossReviewedExecutions).toBe(true);
    expect(report.reviewState).toBe('pre_registered_feature_response_observations_consistent_on_reviewed_sources');

    const masks = report.familyReviews.filter((entry) => entry.expectationStatus === 'no_directional_acceptance_rule');
    expect(masks).toHaveLength(2);
    expect(masks.every((entry) => entry.evidenceUse === 'negative_control_response_only')).toBe(true);
    expect(report.familyReviews.filter((entry) => entry.expectationStatus === 'pre_registered_expectation_observed')).toHaveLength(8);
  });

  it('records a nonconforming pre-registered response without failing or inventing a post-hoc threshold', () => {
    const report = materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(
      reviewRequest([narrowUniformRaster()]),
    );
    const gradient = report.familyReviews.find(
      (entry) => entry.perturbationRef === 'perturbation.capture_quality.spatial_illumination_gradient',
    );

    expect(gradient?.primaryExpectedTrend).toBe('magnitude_change_expected_direction_not_fixed');
    expect(gradient?.primaryTrendObservation).toBe('no_magnitude_change_observed');
    expect(gradient?.expectationStatus).toBe('pre_registered_expectation_not_observed');
    expect(report.preRegisteredExpectationNotObservedCount).toBe(1);
    expect(report.allPreRegisteredExpectationsObservedAcrossReviewedExecutions).toBe(false);
    expect(report.reviewState).toBe('mixed_or_nonconforming_feature_response_observations');
    expect(report.evidenceBoundary.postHocNumericCutoffIntroduced).toBe(false);
    expect(report.evidenceBoundary.candidateConstructAdvanceDecision).toBe(
      'deferred_pending_independent_multi_session_and_construct_validity_evidence',
    );
  });

  it('returns no candidate numeric feature values, raster material, aggregates, or digests', () => {
    const report = materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(reviewRequest());
    const serialized = JSON.stringify(report);

    expect(report.evidenceBoundary.sourceRasterReconsumedByThisArtifact).toBe(false);
    expect(report.evidenceBoundary.candidateFeatureNumericValuesReconsumedByThisArtifact).toBe(false);
    expect(report.privacyBoundary.rawImageConsumed).toBe(false);
    expect(report.privacyBoundary.rawPixelRasterConsumed).toBe(false);
    expect(report.privacyBoundary.rawAggregateConsumed).toBe(false);
    expect(report.privacyBoundary.candidateFeatureNumericValuesPersisted).toBe(false);
    expect(report.privacyBoundary.candidateFeatureNumericValuesReturned).toBe(false);
    expect(report.privacyBoundary.sourceDigestComputed).toBe(false);
    expect(serialized).not.toContain('featureValues');
    expect(serialized).not.toContain('rgba');
    expect(serialized).not.toContain('sumSquares');
  });

  it('keeps capture quality, multi-session, repeatability, and traditional authority fail-closed', () => {
    const report = materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(reviewRequest());
    expect(report.evidenceBoundary.empiricalPerturbationEvidenceReviewPerformed).toBe(true);
    expect(report.evidenceBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(report.evidenceBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(report.evidenceBoundary.exposureMetricValidated).toBe(false);
    expect(report.evidenceBoundary.sharpnessMetricValidated).toBe(false);
    expect(report.evidenceBoundary.lightingMetricValidated).toBe(false);
    expect(report.evidenceBoundary.occlusionValidityVerified).toBe(false);
    expect(report.evidenceBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(report.evidenceBoundary.captureQualityValidated).toBe(false);
    expect(report.evidenceBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(report.evidenceBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(report.evidenceBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(report.evidenceBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(report.evidenceBoundary.numericCaptureQualityThreshold).toBeNull();
    expect(report.evidenceBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(report.semanticAuthority.constructValidity).toBe('unresolved');
    expect(report.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(report.semanticAuthority.criterionState).toBeNull();
    expect(report.semanticAuthority.structuredClaim).toBeNull();
    expect(report.semanticAuthority.boundedNarrative).toBeNull();
    expect(report.traditionalSemanticAuthority).toBe(false);
  });

  it('fails closed on unauthorized request fields and forged predecessor or review objects', () => {
    const valid = reviewRequest();
    expect(() => materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151({
      ...valid,
      numericAcceptanceThreshold: 0.5,
    } as unknown as SquareBroadFangCaptureQualityPerturbationEvidenceReviewRequestFR151V1)).toThrow(/unauthorized field/i);

    expect(() => materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151({
      ...valid,
      execution: { ...valid.execution },
    })).toThrow(/not issued by the active FR-150 boundary/i);

    const issued = materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(valid);
    expect(() => assertIssuedSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151({ ...issued })).toThrow(
      /not issued by the active FR-151 boundary/i,
    );
  });
});
