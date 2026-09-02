import { describe, expect, it } from 'vitest';
import {
  assertIssuedExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93,
  reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93,
  type ExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93V1,
} from './exact-dyadic-rational-distance-enclosure-primitives-review-fr93.js';

describe('FR93 exact dyadic rational distance enclosure primitive review', () => {
  it('governs exact finite binary64 to dyadic-rational recovery', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();
    assertIssuedExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93(result);

    expect(result.binary64ToDyadicSpecification).toEqual({
      specificationIssued: true,
      inputDomain: 'finite_ieee754_binary64_only',
      extractionMechanism: 'exact_sign_exponent_fraction_bit_pattern_via_dataview_biguint64',
      normalFormula: 'value=(-1)^sign*(2^52+fraction)*2^(exponent_bits-1023-52)',
      subnormalFormula: 'value=(-1)^sign*fraction*2^-1074',
      positiveAndNegativeZeroCanonicalization: 'rational_zero',
      nanAndInfinityRejected: true,
      exactRecoveryOfInputBinary64Value: true,
      rationalCanonicalForm: 'gcd_reduced_numerator_over_positive_denominator',
      decimalStringRoundTripRequired: false,
    });
  });

  it('governs exact rational point-to-segment squared-distance branches', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.exactRationalGeometrySpecification).toEqual({
      specificationIssued: true,
      arithmeticDomain: 'bigint_exact_rational',
      midpointUnderDyadicSubdivisionExact: true,
      segmentSquaredLengthExact: true,
      pointToSegmentProjectionDotExact: true,
      projectionBranchComparisonsExact: true,
      degenerateSegmentBranch: 'if_len2_eq_0_use_exact_endpoint_squared_distance',
      beforeSegmentBranch: 'if_dot_lte_0_use_exact_start_endpoint_squared_distance',
      afterSegmentBranch: 'if_dot_gte_len2_use_exact_end_endpoint_squared_distance',
      interiorProjectionSquaredDistanceFormula: 'norm2(point-start)-dot^2/len2',
      nearestTargetSegmentSelection: 'exact_minimum_over_nonnegative_rational_squared_distances',
      sqrtAvoidedDuringNearestSegmentSelection: true,
    });
  });

  it('governs a mathematically outward dyadic sqrt enclosure construction', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.outwardSqrtEnclosureSpecification).toEqual({
      specificationIssued: true,
      inputDomain: 'nonnegative_reduced_rational_n_over_d',
      precisionParameter: 'nonnegative_integer_precision_bits_p',
      scaledFloorConstruction: 'q=floor((n*2^(2p))/d)',
      integerRootConstruction: 'm=floor_sqrt_bigint(q)',
      lowerBound: 'm/2^p',
      exactnessTest: 'm^2*d==n*2^(2p)',
      upperBound: 'exact?m/2^p:(m+1)/2^p',
      containmentGuarantee: 'lower<=sqrt(n/d)<=upper',
      widthGuarantee: 'upper-lower<=2^-p',
      integerSqrtMustBeExactFloor: true,
      floatingPointSqrtUsedForCertificate: false,
      outwardRoundingByGuessOrEpsilonAllowed: false,
    });
  });

  it('records how exact squared geometry can feed later total-error composition', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.compositionReadiness).toEqual({
      dyadicLeafHSquaredCertificateExactWithoutSqrt: true,
      midpointNearestSquaredDistanceExactBeforeSqrt: true,
      leafMidpointContributionCanBeRewrittenAsSingleSqrt: 'sqrt(source_segment_len2*nearest_distance2)/2^depth',
      sourcePerimeterRequiresSumOfCertifiedSqrtEnclosures: true,
      directedMeanRequiresCertifiedPositiveIntervalDivision: true,
      totalErrorCompositionReadyNow: false,
    });
  });

  it('issues specifications but no runtime primitive or mouth authority', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.reviewDecision).toMatchObject({
      binary64ExactConversionAlgorithmAdmitted: true,
      exactRationalPointToSegmentSquaredDistanceAlgorithmAdmitted: true,
      rationalSqrtOutwardEnclosureAlgorithmAdmitted: true,
      primitiveRuntimeImplementationMayBeReviewedNext: true,
      primitiveRuntimeImplementationIssued: false,
      arclengthMeanRuntimeAuthorized: false,
      runtimeValueIssued: false,
    });
    expect(result.runtimeGeometryFunctionalDefinitionsIssued).toBe(0);
    expect(result.runtimeGeometryValuesIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects structurally plausible but unissued FR93 values', () => {
    const forged = {
      schemaVersion: 'fr93-exact-dyadic-rational-distance-enclosure-primitives-review-v1',
      authorityState: 'exact_rational_distance_enclosure_primitive_algorithms_reviewed_no_runtime_primitive_issued',
    } as unknown as ExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93V1;

    expect(() => assertIssuedExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93(forged))
      .toThrow(/not issued by the active FR-93 boundary/u);
  });
});
