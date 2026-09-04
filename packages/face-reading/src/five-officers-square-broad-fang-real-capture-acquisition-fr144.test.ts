import { describe, expect, it } from 'vitest';
import {
  FR144_CORRESPONDENCE_METRIC_REF,
  FR144_NEXT_FRONTIER,
  FR144_ORTHOGONALITY_METRIC_REF,
  FR144_TURN_CONCENTRATION_METRIC_REF,
  getSquareBroadFangRealCaptureAcquisitionContractFR144,
  materializeSquareBroadFangNeutralAcquisitionDatasetFR144,
  recordSquareBroadFangNeutralCaptureFR144,
  summarizeSquareBroadFangNeutralValuesFR144,
} from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';
import { getSquareBroadConstructValidityAcquisitionContractFR135 } from './five-officers-square-broad-construct-validity-dataset-acquisition-fr135.js';
import type { SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 } from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';

describe('FR144 square-broad 方 real-capture neutral acquisition extension', () => {
  it('extends FR135 acquisition mechanics without mutating the historical FR135 contract', () => {
    const before = getSquareBroadConstructValidityAcquisitionContractFR135();
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    const after = getSquareBroadConstructValidityAcquisitionContractFR135();

    expect(after).toEqual(before);
    expect(contract.predecessor.reusesFR135IdentityAndSeriesGroupingInvariantsWithoutMutatingFR135).toBe(true);
    expect(contract.authorityBoundary.historicalFR135ArtifactMutated).toBe(false);
    expect(contract.acquisition.captureUnit).toBe('same_subject_repeated_pose_normalized_neutral_expression_capture');
    expect(contract.acquisition.repeatedCaptureRequired).toBe(true);
  });

  it('requires exactly the three FR142 neutral metric refs without inventing acquisition counts or thresholds', () => {
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.acquisition.runtimeInputAuthority).toBe('issued_fr142_only');
    expect(contract.acquisition.requiredNeutralMetricRefs).toEqual([
      FR144_CORRESPONDENCE_METRIC_REF,
      FR144_ORTHOGONALITY_METRIC_REF,
      FR144_TURN_CONCENTRATION_METRIC_REF,
    ]);
    expect(contract.acquisition.subjectCount).toBeNull();
    expect(contract.acquisition.captureCountPerSubject).toBeNull();
    expect(contract.acquisition.splitRatios).toBeNull();
    expect(contract.acquisition.numericRepeatabilityAcceptanceThresholds).toBeNull();
    expect(contract.acquisition.empiricalCaptureRecordsBundledAtDefinitionTime).toBe(0);
    expect(contract.execution.empiricalDatasetsBundledAtDefinitionTime).toBe(0);
  });

  it('produces descriptive summaries only and does not classify repeatability', () => {
    const summary = summarizeSquareBroadFangNeutralValuesFR144(
      FR144_ORTHOGONALITY_METRIC_REF,
      [0.2, 0.4, 0.8],
    );
    expect(summary).toMatchObject({
      metricRef: FR144_ORTHOGONALITY_METRIC_REF,
      unit: 'ratio',
      count: 3,
      min: 0.2,
      max: 0.8,
      mean: (0.2 + 0.4 + 0.8) / 3,
      classificationApplied: false,
      calibrationApplied: false,
      acceptanceThresholdApplied: false,
    });
    expect(summary.range).toBeCloseTo(0.6, 12);
    expect(() => summarizeSquareBroadFangNeutralValuesFR144(FR144_CORRESPONDENCE_METRIC_REF, []))
      .toThrow(/at least one finite/u);
    expect(() => summarizeSquareBroadFangNeutralValuesFR144(FR144_TURN_CONCENTRATION_METRIC_REF, [Number.NaN]))
      .toThrow(/at least one finite/u);
  });

  it('rejects structurally plausible but unissued FR142 runtime input', () => {
    const forged = {
      schemaVersion: 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1',
      artifactVersion: '0.1.0',
      authorityState: 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding',
      nextFrontier: 'square_broad_fang_neutral_candidate_metric_repeatability_and_synthetic_geometry_discrimination_without_traditional_binding',
    } as unknown as SquareBroadFangNeutralCandidateMetricRuntimeFR142V1;

    expect(() => recordSquareBroadFangNeutralCaptureFR144(forged, {
      researchSubjectRef: 'study-subject:A',
      captureSeriesRef: 'capture-series:A',
      captureRef: 'capture:A1',
    })).toThrow(/FR-142|FR-144/u);
  });

  it('does not materialize an empty empirical dataset at definition time', () => {
    expect(() => materializeSquareBroadFangNeutralAcquisitionDatasetFR144([]))
      .toThrow(/at least one issued FR-144 neutral capture record/u);
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.execution.empiricalCaptureRecordsBundledAtDefinitionTime).toBe(0);
    expect(contract.execution.empiricalDatasetsBundledAtDefinitionTime).toBe(0);
    expect(contract.nextFrontier).toBe(FR144_NEXT_FRONTIER);
  });

  it('keeps semantic labels and all downstream traditional authority closed', () => {
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.semanticBoundary.semanticAnnotationRequiredToAcquireNeutralMetrics).toBe(false);
    expect(contract.semanticBoundary.humanSemanticLabelsBundledAtDefinitionTime).toBe(0);
    expect(contract.semanticBoundary.traditionalClassLabelsBundledAtDefinitionTime).toBe(0);
    expect(contract.authorityBoundary.neutralAcquisitionMeansEmpiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.neutralAcquisitionMeansConstructValidity).toBe(false);
    expect(contract.authorityBoundary.neutralAcquisitionMeansTraditionalFang).toBe(false);
    expect(contract.execution.humanSemanticLabelsIssued).toBe(0);
    expect(contract.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(contract.execution.calibrationProtocolsIssued).toBe(0);
    expect(contract.execution.thresholdsIssued).toBe(0);
    expect(contract.execution.criterionStatesIssued).toBe(0);
    expect(contract.execution.structuredClaimsIssued).toBe(0);
    expect(contract.execution.boundedNarrativesIssued).toBe(0);
    expect(contract.execution.traditionalSemanticAuthority).toBe(false);
  });
});
