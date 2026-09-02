import { describe, expect, it } from 'vitest';
import {
  reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89,
} from './role-free-whole-contour-separation-summary-feasibility-review-fr89.js';

describe('FR89 whole-contour separation summary hardening', () => {
  it('keeps every candidate role-free and correspondence-free', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();

    expect(result.candidates).toHaveLength(6);
    for (const candidate of result.candidates) {
      expect(candidate.explicitPointPairCorrespondenceRequired).toBe(false);
      expect(candidate.anatomicalRolesRequired).toBe(false);
      expect(candidate.symmetricUnderContourSwap).toBe(true);
      expect(candidate.cycleStartIndexInvariantByDefinition).toBe(true);
      expect(candidate.cycleOrientationInvariantByDefinition).toBe(true);
    }
  });

  it('admits exactly the continuous arclength mean and RMS specifications', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();
    const admitted = result.candidates.filter((candidate) => candidate.status.startsWith('research_spec_admitted_'));

    expect(admitted.map((candidate) => candidate.candidateKey)).toEqual([
      'symmetric_arclength_mean_nearest_set_distance',
      'symmetric_arclength_rms_nearest_set_distance',
    ]);
    expect(admitted.every((candidate) => candidate.wholeContourCoverage === 'continuous_arclength')).toBe(true);
    expect(admitted.every((candidate) => candidate.samplingDensityInvariantByDefinition)).toBe(true);
  });

  it('does not allow discrete provider vertices to stand in for continuous arclength measure', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();
    const vertexCandidate = result.candidates.find((candidate) => candidate.candidateKey === 'vertex_mean_nearest_neighbor_distance');

    expect(vertexCandidate).toBeDefined();
    expect(vertexCandidate?.status).toBe('rejected_sampling_density_dependent');
    expect(result.feasibilityDecision.vertexOnlyAggregationAllowed).toBe(false);
    expect(result.prohibitedShortcuts).toContain('provider_vertex_mean_to_continuous_arclength_mean');
    expect(result.recommendedNextFrontier.discreteVertexSamplingSubstitutionAllowed).toBe(false);
  });

  it('does not issue runtime, metric, thickness, anthropometric, criterion, claim, or traditional authority', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();

    expect(result.runtimeGeometryFunctionalDefinitionsIssued).toBe(0);
    expect(result.runtimeGeometryValuesIssued).toBe(0);
    expect(result.neutralMetricDefinitionsIssued).toBe(0);
    expect(result.neutralMetricValuesIssued).toBe(0);
    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.representativeBandWidthSemanticIssued).toBe(false);
    expect(result.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('freezes the issued review and its candidate registry', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.candidates)).toBe(true);
    expect(result.candidates.every((candidate) => Object.isFrozen(candidate))).toBe(true);
    expect(Object.isFrozen(result.feasibilityDecision)).toBe(true);
    expect(Object.isFrozen(result.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(result.recommendedNextFrontier)).toBe(true);
  });
});