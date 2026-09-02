import { describe, expect, it } from 'vitest';
import {
  reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97,
} from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';

describe('FR97 neutral arclength mean metric review hardening', () => {
  it('does not rename role-free separation as lip thickness or physical band width', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.metricDefinition.metricKey).toContain('symmetric_arclength_mean_nearest_set_distance');
    expect(result.metricDefinition.metricKey).not.toContain('thickness');
    expect(result.metricDefinition.unit).toBe('canonical_metric_plane_distance');
    expect(result.metricDefinition.thicknessInterpretationAllowed).toBe(false);
    expect(result.authorityBoundary.neutralSeparationMetricMeansLipThickness).toBe(false);
    expect(result.authorityBoundary.canonicalMetricPlaneDistanceMeansPhysicalSoftTissueAnthropometry).toBe(false);
  });

  it('keeps nearest-set geometry separate from cross-contour correspondence', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.metricDefinition.explicitPointPairCorrespondenceRequired).toBe(false);
    expect(result.reviewDecision.correspondencePairIssuanceAuthorized).toBe(false);
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
    expect(result.prohibitedShortcuts).toContain('nearest_set_distance_to_cross_contour_correspondence_pair');
  });

  it('keeps numerical certification separate from calibration and traditional semantics', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.metricDefinition.calibrationRef).toBeNull();
    expect(result.metricDefinition.thresholdRef).toBeNull();
    expect(result.metricDefinition.traditionalCriterionBindingRef).toBeNull();
    expect(result.authorityBoundary.numericalCertificateMeansCalibrationThreshold).toBe(false);
    expect(result.authorityBoundary.neutralMetricDefinitionMeansTraditionalDuanHou).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('keeps definition admission separate from value and morphology issuance', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.neutralMetricDefinitionsIssued).toBe(1);
    expect(result.neutralMetricValuesIssued).toBe(0);
    expect(result.authorityBoundary.neutralMetricDefinitionMeansMetricValue).toBe(false);
    expect(result.authorityBoundary.neutralMetricDefinitionMeansMorphologyState).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
  });
});
