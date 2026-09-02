import { describe, expect, it } from 'vitest';
import {
  assertIssuedCertifiedDistanceKernelRoundoffFeasibilityReviewFR92,
  reviewCertifiedDistanceKernelRoundoffFeasibilityFR92,
  type CertifiedDistanceKernelRoundoffFeasibilityReviewFR92V1,
} from './certified-distance-kernel-roundoff-feasibility-review-fr92.js';

describe('FR92 certified distance-kernel roundoff feasibility review', () => {
  it('makes the binary64 total-error certificate gap explicit', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();
    assertIssuedCertifiedDistanceKernelRoundoffFeasibilityReviewFR92(result);

    expect(result).toMatchObject({
      schemaVersion: 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1',
      authorityState: 'distance_kernel_roundoff_certificate_feasibility_review_completed_no_runtime_value_issued',
      discoveredAuthorityGap: {
        gapKey: 'binary64_distance_kernel_roundoff_total_error_certificate_not_governed',
        quadratureCertificateAssumesExactDistanceOracle: true,
        nativeBinary64PointToSegmentRoundoffBoundGoverned: false,
        nativeBinary64SqrtRoundoffBoundGoverned: false,
        nativeBinary64MinReductionRoundoffBoundGoverned: false,
        fullRuntimeMathematicalAbsoluteErrorCertificateAvailable: false,
        runtimeMayClaimQuadratureOnlyCertificateWithoutContractRevision: false,
      },
    });
  });

  it('admits only exact dyadic rational geometry plus outward sqrt enclosure as the preferred research path', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.feasibilityDecision).toEqual({
      admittedResearchPathCount: 1,
      preferredResearchPath: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures',
      nativeBinary64DirectRuntimeTotalCertificateAdmitted: false,
      empiricalEpsilonRepairAdmitted: false,
      arbitraryPrecisionAloneCountsAsCertificate: false,
      runtimeImplementationAuthorized: false,
      runtimeValueIssued: false,
    });
    expect(result.candidates[2]).toMatchObject({
      candidateKey: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures',
      status: 'feasibility_admitted_preferred_research_path',
      exactInputValueRecovery: true,
      exactBranchComparisonsPossible: true,
      directedOutwardDistanceEnclosurePossible: true,
      totalCertificatePathPossible: true,
      empiricalToleranceRequired: false,
    });
  });

  it('records the exact-rational geometry operations that remain exact before sqrt enclosure', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.exactDyadicResearchPath).toEqual({
      binary64FiniteValueExactlyRecoverableAsDyadicRational: true,
      dyadicSubdivisionParameterExactlyRepresentableAsRational: true,
      midpointCoordinatesExactlyComputableAsRational: true,
      segmentSquaredLengthExactlyComputableAsRational: true,
      pointToSegmentProjectionBranchExactlyDecidableAsRational: true,
      interiorProjectionSquaredDistanceExactlyComputableAsRational: true,
      nearestSegmentSquaredDistanceExactlyComparableAsRational: true,
      dyadicSubdivisionCertificateHSquaredExactlyComputableAsRational: true,
      irrationalEuclideanLengthRequiresCertifiedSqrtEnclosure: true,
      integralContributionRequiresOutwardEnclosure: true,
      directedMeanDivisionRequiresOutwardEnclosure: true,
      nativeJavaScriptDirectedRoundingPrimitiveAvailable: false,
    });
  });

  it('exposes exact primitive and total-error-composition prerequisites without issuing runtime authority', () => {
    const result = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();

    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'exact_binary64_dyadic_rational_conversion_contract_not_issued',
      'certified_rational_sqrt_outward_enclosure_contract_not_issued',
      'certified_arclength_mean_total_error_composition_not_governed',
    ]);
    expect(result.runtimeGeometryFunctionalDefinitionsIssued).toBe(0);
    expect(result.runtimeGeometryValuesIssued).toBe(0);
    expect(result.neutralMetricDefinitionsIssued).toBe(0);
    expect(result.neutralMetricValuesIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects structurally plausible but unissued FR92 values', () => {
    const forged = {
      schemaVersion: 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1',
      authorityState: 'distance_kernel_roundoff_certificate_feasibility_review_completed_no_runtime_value_issued',
    } as unknown as CertifiedDistanceKernelRoundoffFeasibilityReviewFR92V1;

    expect(() => assertIssuedCertifiedDistanceKernelRoundoffFeasibilityReviewFR92(forged))
      .toThrow(/not issued by the active FR-92 boundary/u);
  });
});
