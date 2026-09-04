import { describe, expect, it } from 'vitest';
import {
  FR135_AXIS_ALIGNMENT_METRIC_REF,
  FR135_NEXT_FRONTIER,
  FR135_TURNING_ANGLE_METRIC_REF,
  getSquareBroadConstructValidityAcquisitionContractFR135,
  summarizeNeutralValuesFR135,
} from './five-officers-square-broad-construct-validity-dataset-acquisition-fr135.js';


describe('FR135 square-broad construct-validity dataset acquisition', () => {
  it('consumes the exact FR134 frontier without converting neutral metrics into traditional semantics', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.predecessor.fr134NextFrontier).toBe(
      'square_broad_construct_validity_annotation_governance_and_dataset_acquisition',
    );
    expect(contract.acquisition.requiredNeutralMetricRefs).toEqual([
      FR135_AXIS_ALIGNMENT_METRIC_REF,
      FR135_TURNING_ANGLE_METRIC_REF,
    ]);
    expect(contract.acquisition.candidateFeatureCoverage).toBe('partial_fr134_shape_metrics_only');
    expect(contract.authorityBoundary.neutralAcquisitionMeansTraditionalFang).toBe(false);
    expect(contract.authorityBoundary.neutralAcquisitionMeansTraditionalDa).toBe(false);
    expect(contract.authorityBoundary.neutralAcquisitionMeansTraditionalSquareBroadCriterion).toBe(false);
    expect(contract.execution.traditionalSemanticAuthority).toBe(false);
  });

  it('freezes annotation-governance requirements without inventing authority, reviewer counts, quorum, or consensus thresholds', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.annotationGovernance.state).toBe('requirements_frozen_authority_not_materialized');
    expect(contract.annotationGovernance.independentSemanticAnnotationRequired).toBe(true);
    expect(contract.annotationGovernance.annotationEvidenceMustBeIndependentOfCandidateMetricValues).toBe(true);
    expect(contract.annotationGovernance.annotationAuthorityRef).toBeNull();
    expect(contract.annotationGovernance.annotationProtocolRef).toBeNull();
    expect(contract.annotationGovernance.labelSchemaRef).toBeNull();
    expect(contract.annotationGovernance.projectOwnerGovernanceAutoQualifies).toBe(false);
    expect(contract.annotationGovernance.reviewerCount).toBeNull();
    expect(contract.annotationGovernance.quorum).toBeNull();
    expect(contract.annotationGovernance.consensusThreshold).toBeNull();
    expect(contract.annotationGovernance.traditionalClassLabelsIssued).toBe(0);
  });

  it('keeps acquisition cardinalities and numeric acceptance thresholds unassigned', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.acquisition.subjectCount).toBeNull();
    expect(contract.acquisition.captureCountPerSubject).toBeNull();
    expect(contract.acquisition.splitRatios).toBeNull();
    expect(contract.acquisition.numericAcceptanceThresholds).toBeNull();
    expect(contract.execution.empiricalCaptureRecordsBundledAtDefinitionTime).toBe(0);
  });

  it('supports descriptive neutral repeatability statistics without classification, calibration, or thresholds', () => {
    const summary = summarizeNeutralValuesFR135(
      FR135_AXIS_ALIGNMENT_METRIC_REF,
      'ratio',
      [0.8, 0.9, 1.0],
    );
    expect(summary.count).toBe(3);
    expect(summary.min).toBeCloseTo(0.8);
    expect(summary.max).toBeCloseTo(1.0);
    expect(summary.mean).toBeCloseTo(0.9);
    expect(summary.range).toBeCloseTo(0.2);
    expect(summary.classificationApplied).toBe(false);
    expect(summary.calibrationApplied).toBe(false);
    expect(summary.acceptanceThresholdApplied).toBe(false);
  });

  it('rejects a metric/unit mismatch instead of silently normalizing it', () => {
    expect(() => summarizeNeutralValuesFR135(
      FR135_TURNING_ANGLE_METRIC_REF,
      'ratio',
      [0.2],
    )).toThrow(/FR-135/u);
  });

  it('publishes the next frontier as governed annotation authority plus empirical collection, not thresholding', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.nextFrontier).toBe(FR135_NEXT_FRONTIER);
    expect(contract.execution.calibrationProtocolsIssued).toBe(0);
    expect(contract.execution.thresholdsIssued).toBe(0);
    expect(contract.execution.criterionStatesIssued).toBe(0);
    expect(contract.execution.structuredClaimsIssued).toBe(0);
    expect(contract.execution.boundedNarrativesIssued).toBe(0);
  });
});
