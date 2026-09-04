import { describe, expect, it } from 'vitest';
import {
  assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  type SquareBroadFangSyntheticVerificationFR143V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.js';
import { getSquareBroadFangNeutralCandidateMetricDefinitionsFR142 } from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR143 square-broad 方 synthetic verification hardening', () => {
  it('rejects forged verification-shaped objects outside the active issuer', () => {
    const forged = {
      schemaVersion: 'fr143-square-broad-fang-neutral-candidate-metric-synthetic-verification-v1',
      artifactVersion: '0.1.0',
      authorityState: 'square_broad_fang_neutral_candidate_metrics_synthetically_verified_for_numeric_behavior_no_construct_validity',
      execution: {
        traditionalMetricBindingsIssued: 0,
        numericClassificationThresholdsIssued: 0,
        criterionStatesIssued: 0,
        traditionalSemanticAuthority: false,
      },
    } as unknown as SquareBroadFangSyntheticVerificationFR143V1;

    expect(() => assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(forged))
      .toThrow(FaceAuthorityValidationError);
  });

  it('keeps all FR142 metric definitions unbound before and after synthetic verification', () => {
    const before = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
    assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    const after = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();

    expect(after).toEqual(before);
    for (const definition of after) {
      expect(definition.traditionalCriterionBindingRef).toBeNull();
      expect(definition.calibrationRef).toBeNull();
      expect(definition.numericClassificationThreshold).toBeNull();
      expect(definition.outerInnerAnatomicalRoleRequired).toBe(false);
      expect(definition.providerVertexIdentityRequired).toBe(false);
      expect(definition.namedMouthCornerRequired).toBe(false);
    }
  });

  it('does not smuggle traditional classes or human labels into synthetic fixture metadata', () => {
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    for (const fixture of result.fixtures) {
      expect(fixture.sourceClass).toBe('synthetic_geometry_only');
      expect(fixture.traditionalLabel).toBeNull();
      expect(fixture.humanSemanticLabel).toBeNull();
      expect(fixture.empiricalCapture).toBe(false);
    }
    expect(result.evidenceBoundary.syntheticFixtureMeansTraditionalClass).toBe(false);
    expect(result.evidenceBoundary.syntheticFixtureMayBeUsedAsGroundTruthHumanLabel).toBe(false);
  });

  it('does not convert qualitative synthetic ordering into a numeric classification cutoff', () => {
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    expect(result.syntheticRelations.rectangleOrthogonalOrientationConcentrationGreaterThanCircle).toBe(true);
    expect(result.syntheticRelations.rectangleTurningAngleConcentrationGreaterThanCircle).toBe(true);
    expect(result.syntheticRelations.asymmetricReflectionResidualGreaterThanSymmetricEllipse).toBe(true);
    expect(result.transformationVerificationPolicy.numericAcceptanceTolerancePersisted).toBeNull();
    expect(result.execution.numericClassificationThresholdsIssued).toBe(0);
    expect(result.execution.calibrationProtocolsIssued).toBe(0);
  });

  it('keeps synthetic repeatability distinct from real capture repeatability and construct validity', () => {
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    expect(result.syntheticRelations.deterministicRepeatabilityObserved).toBe(true);
    expect(result.evidenceBoundary.syntheticRepeatabilityMeansEmpiricalCaptureRepeatability).toBe(false);
    expect(result.evidenceBoundary.syntheticDiscriminationMeansConstructValidity).toBe(false);
    expect(result.execution.empiricalCaptureRecordsIssued).toBe(0);
    expect(result.execution.humanSemanticLabelsIssued).toBe(0);
  });
});
