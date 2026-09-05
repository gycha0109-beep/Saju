import { describe, expect, it } from 'vitest';
import {
  FR149_NEXT_FRONTIER,
  assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149,
  getSquareBroadFangCaptureQualityPerturbationProtocolContractFR149,
  materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149,
} from './five-officers-square-broad-fang-capture-quality-perturbation-protocol-fr149.js';

describe('FR149 square broad Fang capture-quality controlled perturbation protocol', () => {
  it('freezes five pre-registered perturbation families before empirical execution', () => {
    const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();
    assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149(protocol);

    expect(protocol.perturbationDesign.protocolFrozenBeforeEmpiricalExecution).toBe(true);
    expect(protocol.perturbationDesign.requiredFamilyCount).toBe(5);
    expect(protocol.perturbationDesign.minimumDistinctNonBaselineStrengthsPerFamily).toBe(2);
    expect(protocol.perturbationDesign.strengthScheduleMustBePreRegistered).toBe(true);
    expect(protocol.perturbationDesign.perturbationImplementationMustBePinned).toBe(true);
    expect(protocol.perturbationDesign.singleFactorManipulationRequired).toBe(true);
    expect(protocol.perturbationFamilies).toHaveLength(5);

    expect(protocol.perturbationFamilies.map((entry) => entry.perturbationRef)).toEqual([
      'perturbation.capture_quality.global_intensity_darkening',
      'perturbation.capture_quality.global_intensity_brightening',
      'perturbation.capture_quality.gaussian_blur',
      'perturbation.capture_quality.spatial_illumination_gradient',
      'perturbation.capture_quality.opaque_region_mask_negative_control',
    ]);

    for (const family of protocol.perturbationFamilies) {
      expect(family.requiredAtExecution).toBe(true);
      expect(family.baselineVariantRequired).toBe(true);
      expect(family.minimumDistinctNonBaselineStrengths).toBe(2);
      expect(family.strengthSchedulePreRegisteredBeforeExecution).toBe(true);
      expect(family.sameDecodedSourceRasterLineageRequired).toBe(true);
      expect(family.singleFactorManipulationRequired).toBe(true);
      expect(family.transformationImplementationPinnedBeforeExecution).toBe(true);
      expect(family.rawRasterPersistenceAllowed).toBe(false);
      expect(family.sourceDigestPersistenceAllowed).toBe(false);
      expect(family.qualityLabelIssued).toBe(false);
      expect(family.featureHypotheses.length).toBeGreaterThan(0);
      for (const hypothesis of family.featureHypotheses) {
        expect(hypothesis.validationStatus).toBe('hypothesis_only_unvalidated');
        expect(hypothesis.numericAcceptanceThreshold).toBeNull();
      }
    }
  });

  it('pre-registers directional hypotheses without converting them into thresholds', () => {
    const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();
    const byRef = Object.fromEntries(protocol.perturbationFamilies.map((entry) => [entry.perturbationRef, entry]));

    expect(byRef['perturbation.capture_quality.global_intensity_darkening']?.featureHypotheses).toEqual(expect.arrayContaining([
      expect.objectContaining({
        featureRef: 'candidate.capture_quality.rgb_sum_mean_normalized',
        role: 'primary',
        expectedTrend: 'non_increasing_with_strength',
        numericAcceptanceThreshold: null,
      }),
    ]));

    expect(byRef['perturbation.capture_quality.global_intensity_brightening']?.featureHypotheses).toEqual(expect.arrayContaining([
      expect.objectContaining({
        featureRef: 'candidate.capture_quality.rgb_sum_mean_normalized',
        role: 'primary',
        expectedTrend: 'non_decreasing_with_strength',
        numericAcceptanceThreshold: null,
      }),
    ]));

    expect(byRef['perturbation.capture_quality.gaussian_blur']?.featureHypotheses).toEqual(expect.arrayContaining([
      expect.objectContaining({
        featureRef: 'candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized',
        role: 'primary',
        expectedTrend: 'non_increasing_with_strength',
        numericAcceptanceThreshold: null,
      }),
    ]));

    expect(byRef['perturbation.capture_quality.spatial_illumination_gradient']?.featureHypotheses).toEqual(expect.arrayContaining([
      expect.objectContaining({
        featureRef: 'candidate.capture_quality.intensity_centroid_offset_magnitude_normalized',
        role: 'primary',
        expectedTrend: 'magnitude_change_expected_direction_not_fixed',
        numericAcceptanceThreshold: null,
      }),
    ]));

    const occlusion = byRef['perturbation.capture_quality.opaque_region_mask_negative_control'];
    expect(occlusion?.purpose).toBe('occlusion_conflation_negative_control_only');
    expect(occlusion?.featureHypotheses.every((entry) => entry.role === 'diagnostic')).toBe(true);
    expect(occlusion?.featureHypotheses.every((entry) => entry.expectedTrend === 'no_directional_acceptance_rule')).toBe(true);
  });

  it('keeps empirical execution and capture-quality construct validation closed', () => {
    const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();

    expect(protocol.empiricalAdmissionRequirements.realOrSourceBackedRasterExecutionRequired).toBe(true);
    expect(protocol.empiricalAdmissionRequirements.syntheticArithmeticFixturesAloneSufficient).toBe(false);
    expect(protocol.empiricalAdmissionRequirements.eachRequiredFamilyExecutedAgainstEachAdmittedBaseline).toBe(true);
    expect(protocol.empiricalAdmissionRequirements.baselineAndPerturbedCandidateFeaturesMustUseFrozenFR148Formulas).toBe(true);
    expect(protocol.empiricalAdmissionRequirements.observedTrendMustBeEvaluatedWithoutInventingPostHocThresholds).toBe(true);
    expect(protocol.empiricalAdmissionRequirements.constructValidationDecisionDeferredToLaterEvidenceReview).toBe(true);

    expect(protocol.measurementBoundary.controlledPerturbationProtocolFrozen).toBe(true);
    expect(protocol.measurementBoundary.empiricalPerturbationExecutionPerformed).toBe(false);
    expect(protocol.measurementBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(protocol.measurementBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(protocol.measurementBoundary.exposureMetricValidated).toBe(false);
    expect(protocol.measurementBoundary.sharpnessMetricValidated).toBe(false);
    expect(protocol.measurementBoundary.lightingMetricValidated).toBe(false);
    expect(protocol.measurementBoundary.occlusionValidityVerified).toBe(false);
    expect(protocol.measurementBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(protocol.measurementBoundary.captureQualityValidated).toBe(false);
    expect(protocol.measurementBoundary.numericCaptureQualityThreshold).toBeNull();
  });

  it('requires independent multi-session evidence without treating distinct refs as proof', () => {
    const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();
    const track = protocol.multiSessionEvidenceTrack;

    expect(track.independentTrackRequiredBeforeRepeatabilityInterpretation).toBe(true);
    expect(track.minimumDistinctSessionRefs).toBe(2);
    expect(track.distinctSessionRefsAloneProveIndependence).toBe(false);
    expect(track.independentSessionEvidenceRefRequiredForIndependenceClaim).toBe(true);
    expect(track.retroactiveRelabelingOfHistoricalCapturesForbidden).toBe(true);
    expect(track.captureTimestampRequired).toBe(false);
    expect(track.deviceIdentifierRequired).toBe(false);
    expect(track.geolocationRequired).toBe(false);
    expect(track.currentHistoricalFR146PairProvesIndependentSessions).toBe(false);
    expect(track.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(protocol.measurementBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(protocol.measurementBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.measurementBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
  });

  it('preserves privacy and semantic authority boundaries', () => {
    const protocol = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();

    expect(protocol.perturbationDesign.rawPixelRasterMayBeRecorded).toBe(false);
    expect(protocol.perturbationDesign.rawImageMayBeRecorded).toBe(false);
    expect(protocol.perturbationDesign.sourceDigestMayBeRecorded).toBe(false);
    expect(protocol.perturbationDesign.providerPayloadMayBeRecorded).toBe(false);
    expect(protocol.perturbationDesign.traditionalInterpretationMayBeRecorded).toBe(false);

    expect(protocol.privacyBoundary.rawImagePersisted).toBe(false);
    expect(protocol.privacyBoundary.rawProviderResponsePersisted).toBe(false);
    expect(protocol.privacyBoundary.sourceDigestPersisted).toBe(false);
    expect(protocol.privacyBoundary.sourceDigestReturned).toBe(false);
    expect(protocol.privacyBoundary.embeddingPersisted).toBe(false);
    expect(protocol.privacyBoundary.identityTemplatePersisted).toBe(false);
    expect(protocol.privacyBoundary.rawPixelRasterPersisted).toBe(false);

    expect(protocol.semanticAuthority.constructValidity).toBe('unresolved');
    expect(protocol.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(protocol.semanticAuthority.criterionState).toBeNull();
    expect(protocol.semanticAuthority.structuredClaim).toBeNull();
    expect(protocol.semanticAuthority.boundedNarrative).toBeNull();
    expect(protocol.traditionalSemanticAuthority).toBe(false);
  });

  it('pins the predecessor authority and next frontier', () => {
    const contract = getSquareBroadFangCaptureQualityPerturbationProtocolContractFR149();
    expect(contract.protocolBoundary.requiredPerturbationFamilyCount).toBe(5);
    expect(contract.protocolBoundary.minimumDistinctNonBaselineStrengthsPerFamily).toBe(2);
    expect(contract.protocolBoundary.protocolFrozenBeforeEmpiricalExecution).toBe(true);
    expect(contract.protocolBoundary.syntheticFixturesAloneSufficientForConstructValidity).toBe(false);
    expect(contract.protocolBoundary.independentMultiSessionEvidenceRequiredBeforeRepeatabilityInterpretation).toBe(true);
    expect(contract.protocolBoundary.historicalSessionRelabelingAllowed).toBe(false);
    expect(contract.protocolBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(contract.protocolBoundary.repeatabilityThresholdsDefined).toBe(false);
    expect(contract.protocolBoundary.traditionalSemanticAuthority).toBe(false);
    expect(contract.nextFrontier).toBe(FR149_NEXT_FRONTIER);
  });

  it('rejects a forged FR149 protocol at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149();
    expect(() => assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149({ ...issued })).toThrow(/not issued by the active FR-149 boundary/i);
  });
});
