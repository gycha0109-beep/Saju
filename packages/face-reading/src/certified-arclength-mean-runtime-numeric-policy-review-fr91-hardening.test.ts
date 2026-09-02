import { describe, expect, it } from 'vitest';
import {
  reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91,
} from './certified-arclength-mean-runtime-numeric-policy-review-fr91.js';

describe('FR91 certified arclength numeric policy hardening', () => {
  it('keeps numerical accuracy separate from morphology, anthropometry, and traditional semantics', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.authorityBoundary.dyadicNumericBudgetMeansEmpiricalMorphologyThreshold).toBe(false);
    expect(result.authorityBoundary.dyadicNumericBudgetMeansTraditionalThicknessThreshold).toBe(false);
    expect(result.authorityBoundary.sourcePerimeterScaleMeansPhysicalAnthropometricScale).toBe(false);
    expect(result.authorityBoundary.certifiedNumericConvergenceMeansLipThickness).toBe(false);
    expect(result.authorityBoundary.certifiedNumericConvergenceMeansPhysicalBandWidth).toBe(false);
    expect(result.authorityBoundary.numericPolicyReviewMeansProductionMetricBinding).toBe(false);
    expect(result.authorityBoundary.numericPolicyReviewMeansTraditionalDuanHou).toBe(false);
  });

  it('forbids provider index and fuzzy epsilon as hidden tie-break semantics', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.deterministicSubdivisionPolicy.providerSegmentIndexTieBreakAllowed).toBe(false);
    expect(result.deterministicSubdivisionPolicy.fuzzyCoordinateEpsilonTieBreakAllowed).toBe(false);
    expect(result.deterministicSubdivisionPolicy.exactTiePolicy)
      .toBe('split_all_equal_maximum_binary64_certificate_intervals_in_same_round');
    expect(result.prohibitedShortcuts).toContain('provider_segment_index_to_subdivision_tiebreak');
    expect(result.prohibitedShortcuts).toContain('fuzzy_coordinate_epsilon_to_subdivision_tiebreak');
  });

  it('preserves cycle-start and orientation invariance at the subdivision-policy level', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.deterministicSubdivisionPolicy.contourStartIndexInvariantByConstruction).toBe(true);
    expect(result.deterministicSubdivisionPolicy.contourOrientationInvariantByConstruction).toBe(true);
    expect(result.authorityBoundary.equalMaximumBatchSplitMeansProviderSemanticOrdering).toBe(false);
  });

  it('permits only the next neutral runtime construction step and no semantic widening', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.recommendedNextFrontier).toEqual({
      frontierKey: 'certified_arclength_mean_runtime_implementation',
      purpose: 'implement the role-free certified symmetric arclength-mean nearest-set runtime under the governed FR90 algorithm and FR91 numeric policy',
      runtimeConstructionAllowed: true,
      runtimeValueAlreadyIssued: false,
      anatomicalRoleAssignmentAllowed: false,
      correspondencePairIssuanceAllowed: false,
      thicknessSemanticAssignmentAllowed: false,
      physicalAnthropometricInterpretationAllowed: false,
      traditionalSemanticAssignmentAllowed: false,
    });
  });

  it('freezes every authority-bearing nested object and collection', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.sourceAuthority)).toBe(true);
    expect(Object.isFrozen(result.numericAccuracyPolicy)).toBe(true);
    expect(Object.isFrozen(result.deterministicSubdivisionPolicy)).toBe(true);
    expect(Object.isFrozen(result.terminationCertificate)).toBe(true);
    expect(Object.isFrozen(result.policyDecision)).toBe(true);
    expect(Object.isFrozen(result.resolvedProcessGaps)).toBe(true);
    expect(Object.isFrozen(result.newlyExposedPrerequisiteBlockers)).toBe(true);
    expect(Object.isFrozen(result.remainingBlockers)).toBe(true);
    expect(Object.isFrozen(result.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(result.prohibitedShortcuts)).toBe(true);
    expect(Object.isFrozen(result.recommendedNextFrontier)).toBe(true);
  });
});
