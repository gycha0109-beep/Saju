import { describe, expect, it } from 'vitest';
import {
  reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90,
} from './role-free-arclength-mean-integration-algorithm-review-fr90.js';

describe('FR90 certified arclength integration hardening', () => {
  it('keeps every algorithm candidate role-free and correspondence-free', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.candidates).toHaveLength(6);
    for (const candidate of result.candidates) {
      expect(candidate.explicitPointPairCorrespondenceRequired).toBe(false);
      expect(candidate.anatomicalRolesRequired).toBe(false);
    }
  });

  it('requires continuous target segments for every certified nearest-set midpoint evaluation', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.algorithmDecision.nearestSetEvaluationMustUseContinuousTargetSegments).toBe(true);
    expect(result.mathematicalBasis.nearestSetEvaluationRequirement)
      .toBe('midpoint_distance_must_be_minimum_over_all_target_closed_polyline_segments');
    expect(result.prohibitedShortcuts).toContain('provider_vertices_to_continuous_arclength_measure');
  });

  it('does not conflate numerical error tolerance with any morphology or semantic threshold', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.authorityBoundary.numericalAccuracyBudgetMeansEmpiricalMorphologyThreshold).toBe(false);
    expect(result.recommendedNextFrontier.semanticThresholdSelectionAllowed).toBe(false);
    expect(result.prohibitedShortcuts).toContain('numeric_accuracy_budget_to_morphology_threshold');
  });

  it('does not issue runtime values, thickness, anthropometry, claims, or traditional semantics', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.runtimeGeometryFunctionalDefinitionsIssued).toBe(0);
    expect(result.runtimeGeometryValuesIssued).toBe(0);
    expect(result.neutralMetricDefinitionsIssued).toBe(0);
    expect(result.neutralMetricValuesIssued).toBe(0);
    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(result.authorityBoundary.arclengthMeanSeparationMeansLipThickness).toBe(false);
    expect(result.authorityBoundary.certifiedAlgorithmClassMeansTraditionalDuanHou).toBe(false);
  });

  it('freezes the review, candidates, decision, basis, and next frontier', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.candidates)).toBe(true);
    expect(result.candidates.every((candidate) => Object.isFrozen(candidate))).toBe(true);
    expect(Object.isFrozen(result.algorithmDecision)).toBe(true);
    expect(Object.isFrozen(result.mathematicalBasis)).toBe(true);
    expect(Object.isFrozen(result.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(result.recommendedNextFrontier)).toBe(true);
  });
});