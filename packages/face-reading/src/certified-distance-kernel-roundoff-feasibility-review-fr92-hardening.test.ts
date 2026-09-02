import { describe, expect, it } from 'vitest';
import {
  reviewCertifiedDistanceKernelRoundoffFeasibilityFR92,
} from './certified-distance-kernel-roundoff-feasibility-review-fr92.js';

describe('FR92 distance-kernel roundoff feasibility hardening', () => {
  it('rejects native binary64 and empirical epsilon as total-error certification shortcuts', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.candidates[0].status).toBe('rejected_total_error_certificate_gap');
    expect(result.candidates[1].status).toBe('rejected_empirical_nonproof');
    expect(result.prohibitedShortcuts).toContain('quadrature_certificate_to_total_runtime_error_certificate');
    expect(result.prohibitedShortcuts).toContain('machine_epsilon_to_universal_distance_kernel_roundoff_bound');
    expect(result.prohibitedShortcuts).toContain('empirical_epsilon_to_roundoff_proof');
  });

  it('does not confuse extra decimal precision with a certified outward enclosure', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.candidates[3]).toMatchObject({
      candidateKey: 'arbitrary_precision_decimal_without_outward_error_proof',
      status: 'not_admitted_precision_without_outward_certificate',
      directedOutwardDistanceEnclosurePossible: false,
      totalCertificatePathPossible: false,
    });
    expect(result.authorityBoundary.arbitraryPrecisionMeansCertifiedOutwardEnclosure).toBe(false);
    expect(result.prohibitedShortcuts).toContain('more_decimal_digits_to_outward_error_certificate');
  });

  it('keeps exact coordinate recovery separate from anthropometric or thickness semantics', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.authorityBoundary.exactDyadicRecoveryMeansPhysicalAnthropometricExactness).toBe(false);
    expect(result.authorityBoundary.certifiedDistanceEnclosureMeansLipThickness).toBe(false);
    expect(result.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(result.thicknessMetricIssued).toBe(false);
  });

  it('blocks runtime issuance until exact rational and outward sqrt primitives are governed', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.recommendedNextFrontier).toEqual({
      frontierKey: 'exact_dyadic_rational_distance_enclosure_primitives_review',
      purpose: 'govern exact binary64-to-dyadic conversion, rational point-to-segment squared-distance branches, and certified outward square-root enclosures before total-error-certified runtime construction',
      nativeBinary64DirectRuntimeAllowed: false,
      empiricalToleranceRepairAllowed: false,
      runtimeValueIssuanceAllowed: false,
      anatomicalRoleAssignmentAllowed: false,
      correspondencePairIssuanceAllowed: false,
      thicknessSemanticAssignmentAllowed: false,
      physicalAnthropometricInterpretationAllowed: false,
      traditionalSemanticAssignmentAllowed: false,
    });
  });

  it('freezes all authority-bearing objects and collections', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.sourceAuthority)).toBe(true);
    expect(Object.isFrozen(result.discoveredAuthorityGap)).toBe(true);
    expect(Object.isFrozen(result.exactDyadicResearchPath)).toBe(true);
    expect(Object.isFrozen(result.candidates)).toBe(true);
    expect(result.candidates.every((candidate) => Object.isFrozen(candidate))).toBe(true);
    expect(Object.isFrozen(result.feasibilityDecision)).toBe(true);
    expect(Object.isFrozen(result.newlyExposedPrerequisiteBlockers)).toBe(true);
    expect(Object.isFrozen(result.remainingBlockers)).toBe(true);
    expect(Object.isFrozen(result.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(result.prohibitedShortcuts)).toBe(true);
    expect(Object.isFrozen(result.recommendedNextFrontier)).toBe(true);
  });
});
