import { describe, expect, it } from 'vitest';
import {
  FR159_NEXT_FRONTIER,
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
  admitEyePairProspectiveCaptureManifestFR159,
  assertIssuedEyePairProspectiveCaptureManifestFR159,
  getEyePairProspectiveRepeatabilityProtocolFR159,
  summarizeEyePairProspectiveMetricValuesFR159,
} from './eye-pair-prospective-repeatability-protocol-fr159.js';


describe('FR159 eye-pair prospective repeatability protocol', () => {
  it('consumes the exact FR158 frontier and preregisters exactly two primary metric refs', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.predecessor.requiredFr158NextFrontier).toBe(
      'prospective_eye_pair_metric_3d_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion',
    );
    expect(protocol.preregistration.primaryMetricRefs).toEqual([
      FR159_X_SPAN_METRIC_REF,
      FR159_PERIMETER_METRIC_REF,
    ]);
    expect(protocol.preregistration.primaryMetricCount).toBe(2);
    expect(protocol.preregistration.candidateSelectionFrozenBeforeProspectiveCapture).toBe(true);
    expect(protocol.preregistration.currentDevelopmentCapturesEligible).toBe(false);
    expect(protocol.preregistration.retrospectiveDevelopmentCapturePromotionAllowed).toBe(false);
  });

  it('does not invent repeatability, capture-quality, calibration, or numeric thresholds', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.preregistration.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(protocol.preregistration.numericCaptureQualityThreshold).toBeNull();
    expect(protocol.descriptiveAnalysis.repeatabilityPassFailIssued).toBe(false);
    expect(protocol.descriptiveAnalysis.captureSensitivityPassFailIssued).toBe(false);
    expect(protocol.descriptiveAnalysis.captureQualityMeasurementConstructValidated).toBe(false);
    expect(protocol.execution.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.execution.captureQualityValidated).toBe(false);
    expect(protocol.authorityBoundary.constructValidity).toBe('unresolved');
    expect(protocol.authorityBoundary.traditionalBinding).toBe('unresolved');
  });

  it('admits a protocol-local manifest only when prospective eligibility attestations remain fail-closed', () => {
    const manifest = admitEyePairProspectiveCaptureManifestFR159({
      prospectiveCollectionRef: 'fr159-collection:alpha',
      captureSeriesRef: 'fr159-series:001',
      captureRef: 'fr159-capture:001-01',
      captureConditionRef: 'fr159-condition:baseline',
      captureSequenceIndex: 1,
      postPreregistrationFreshCaptureAttested: true,
      sameParticipantSeriesAttested: true,
      usedForCandidateSelection: false,
      developmentCaptureReuse: false,
      identityMatchingPerformed: false,
    });
    expect(() => assertIssuedEyePairProspectiveCaptureManifestFR159(manifest)).not.toThrow();
    expect(manifest.identityBoundary.captureSeriesRefMeansIdentityMatch).toBe(false);
    expect(manifest.identityBoundary.biometricTemplateIssued).toBe(false);
    expect(manifest.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects development-capture reuse or candidate-selection reuse', () => {
    const base = {
      prospectiveCollectionRef: 'fr159-collection:alpha',
      captureSeriesRef: 'fr159-series:001',
      captureRef: 'fr159-capture:001-01',
      captureConditionRef: 'fr159-condition:baseline',
      captureSequenceIndex: 1,
      postPreregistrationFreshCaptureAttested: true,
      sameParticipantSeriesAttested: true,
      usedForCandidateSelection: false,
      developmentCaptureReuse: false,
      identityMatchingPerformed: false,
    } as const;
    expect(() => admitEyePairProspectiveCaptureManifestFR159({
      ...base,
      developmentCaptureReuse: true,
    })).toThrow(/development captures/u);
    expect(() => admitEyePairProspectiveCaptureManifestFR159({
      ...base,
      usedForCandidateSelection: true,
    })).toThrow(/candidate selection/u);
  });

  it('rejects missing freshness, same-participant attestation, identity matching, and invalid sequence indexes', () => {
    const base = {
      prospectiveCollectionRef: 'fr159-collection:alpha',
      captureSeriesRef: 'fr159-series:001',
      captureRef: 'fr159-capture:001-01',
      captureConditionRef: 'fr159-condition:baseline',
      captureSequenceIndex: 1,
      postPreregistrationFreshCaptureAttested: true,
      sameParticipantSeriesAttested: true,
      usedForCandidateSelection: false,
      developmentCaptureReuse: false,
      identityMatchingPerformed: false,
    } as const;
    expect(() => admitEyePairProspectiveCaptureManifestFR159({
      ...base,
      postPreregistrationFreshCaptureAttested: false,
    })).toThrow(/fresh-capture attestation/u);
    expect(() => admitEyePairProspectiveCaptureManifestFR159({
      ...base,
      sameParticipantSeriesAttested: false,
    })).toThrow(/same-participant/u);
    expect(() => admitEyePairProspectiveCaptureManifestFR159({
      ...base,
      identityMatchingPerformed: true,
    })).toThrow(/identity matching/u);
    expect(() => admitEyePairProspectiveCaptureManifestFR159({
      ...base,
      captureSequenceIndex: 0,
    })).toThrow(/positive safe integer/u);
  });

  it('supports descriptive summaries without issuing repeatability adjudication', () => {
    const summary = summarizeEyePairProspectiveMetricValuesFR159(
      FR159_X_SPAN_METRIC_REF,
      [0.2, 0.22, 0.21],
    );
    expect(summary.count).toBe(3);
    expect(summary.min).toBeCloseTo(0.2);
    expect(summary.max).toBeCloseTo(0.22);
    expect(summary.mean).toBeCloseTo(0.21);
    expect(summary.range).toBeCloseTo(0.02);
    expect(summary.evaluationState).toBe('descriptive_only_no_repeatability_adjudication');
    expect(summary.acceptanceThresholdApplied).toBe(false);
    expect(summary.captureQualityThresholdApplied).toBe(false);
    expect(summary.calibrationApplied).toBe(false);
  });

  it('rejects unsupported/non-finite/empty descriptive inputs rather than normalizing them', () => {
    expect(() => summarizeEyePairProspectiveMetricValuesFR159(
      'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0' as typeof FR159_X_SPAN_METRIC_REF,
      [0.1],
    )).toThrow(/unsupported prospective primary metric/u);
    expect(() => summarizeEyePairProspectiveMetricValuesFR159(
      FR159_PERIMETER_METRIC_REF,
      [Number.NaN],
    )).toThrow(/finite/u);
    expect(() => summarizeEyePairProspectiveMetricValuesFR159(
      FR159_PERIMETER_METRIC_REF,
      [],
    )).toThrow(/at least one/u);
  });

  it('publishes fresh collection as the next frontier, not an empirical result', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.execution.empiricalFreshCaptureRecordsBundledAtDefinitionTime).toBe(0);
    expect(protocol.nextFrontier).toBe(FR159_NEXT_FRONTIER);
    expect(protocol.authorityBoundary.criterionStatesIssued).toBe(0);
    expect(protocol.authorityBoundary.structuredClaimsIssued).toBe(0);
    expect(protocol.authorityBoundary.boundedNarrativesIssued).toBe(0);
    expect(protocol.execution.traditionalSemanticAuthority).toBe(false);
  });
});
