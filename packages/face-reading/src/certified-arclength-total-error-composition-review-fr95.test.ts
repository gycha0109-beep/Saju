import { describe, expect, it } from 'vitest';
import {
  assertIssuedCertifiedArclengthTotalErrorCompositionReviewFR95,
  reviewCertifiedArclengthTotalErrorCompositionFR95,
  type CertifiedArclengthTotalErrorCompositionReviewFR95V1,
} from './certified-arclength-total-error-composition-review-fr95.js';

describe('FR95 certified arclength total-error composition review', () => {
  it('composes exact midpoint squared geometry with the FR90 quadrature certificate', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    assertIssuedCertifiedArclengthTotalErrorCompositionReviewFR95(result);

    expect(result.exactQuadratureComposition).toEqual({
      leafSquaredArclengthExactRational: true,
      nearestMidpointSquaredDistanceExactRational: true,
      midpointContributionSquaredForm: 'h_squared_times_nearest_distance_squared',
      midpointContribution: 'sqrt(h_squared_times_nearest_distance_squared)',
      midpointContributionEnclosedByFR94SqrtPrimitive: true,
      directedQuadratureIntegralErrorCertificate: 'Q=sum_leaf(h_squared)/4',
      quadratureCertificateExactRational: true,
      exactIntegralContainment: 'I_exact_in_[max(0,S_lower-Q),S_upper+Q]',
    });
  });

  it('governs positive perimeter interval division for a directed mean certificate', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();

    expect(result.perimeterAndDivisionComposition).toEqual({
      sourcePerimeterEnclosure: 'L_in_[L_lower,L_upper]_from_sum_of_segment_sqrt_enclosures',
      positiveLowerPerimeterRequired: true,
      directedMeanContainment: 'M_exact_in_[I_lower/L_upper,I_upper/L_lower]',
      intervalDivisionUsesPositiveRationalBoundsOnly: true,
      returnedPointEstimateIfRuntimeLater: 'midpoint_of_certified_mean_interval',
      returnedAbsoluteErrorCertificateIfRuntimeLater: 'half_width_of_certified_mean_interval',
    });
  });

  it('creates strict quadrature slack without an arbitrary fixed error-budget split', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();

    expect(result.strictQuadratureSlackPolicy).toEqual({
      fixedFractionBudgetSplitAdmitted: false,
      firstFR91BudgetSatisfactionMayConsumeFullBudget: true,
      additionalSubdivisionRequiredBeforeArithmeticCertification: true,
      additionalSubdivisionRule: 'one_more_equal_maximum_certificate_batch_after_first_fr91_quadrature_budget_satisfaction',
      zeroQuadratureException: 'skip_extra_batch_only_if_Q_equals_zero',
      strictSlackConsequence: 'Q_strictly_less_than_L_source_squared_over_4096_when_Q_nonzero',
      providerSegmentIndexTieBreakAllowed: false,
      empiricalToleranceUsed: false,
    });
  });

  it('selects the minimum certified sqrt precision rather than a magic precision', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();

    expect(result.sqrtPrecisionAllocationPolicy).toEqual({
      commonPrecisionPerDirectedComputation: true,
      precisionDomain: 'nonnegative_integer_bits',
      selectionRule: 'minimum_p_whose_certified_directed_mean_interval_half_width_lte_L_lower_over_4096',
      searchOrder: 'p_equals_0_1_2_3_in_strictly_increasing_order',
      perimeterLowerBoundMustBePositive: true,
      fixedMagicPrecisionAdmitted: false,
      empiricalPrecisionTuningAdmitted: false,
      strictQuadratureSlackGuaranteesFinitePrecisionExistsForNondegenerateSource: true,
      precisionBitsAreEngineeringCertificateResolutionOnly: true,
    });
  });

  it('proves the FR91 directed and symmetric budgets from conservative lower perimeter bounds', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();

    expect(result.directedCertificateAcceptance).toEqual({
      exactTruthContainedInReturnedInterval: true,
      pointEstimate: 'C=(M_lower+M_upper)/2',
      absoluteErrorCertificate: 'R=(M_upper-M_lower)/2',
      acceptanceRule: 'R<=L_lower/4096',
      implication: 'R<=L_source/4096',
      fr91DirectedBudgetSatisfiedByConstruction: true,
    });
    expect(result.symmetricComposition).toEqual({
      twoDirectedCertificatesRequired: true,
      symmetricInterval: '[0.5*(A_lower+B_lower),0.5*(A_upper+B_upper)]',
      symmetricPointEstimate: 'midpoint_of_symmetric_interval',
      symmetricRadiusBound: 'R_sym<=0.5*(L_A_lower/4096+L_B_lower/4096)',
      fr91SymmetricBudgetImplication: 'R_sym<=(L_A+L_B)/8192',
      contourSwapInvariantByConstruction: true,
    });
  });

  it('opens only the role-free certified runtime frontier and issues no runtime value yet', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();

    expect(result.compositionDecision).toEqual({
      sqrtPrecisionAllocationGoverned: true,
      quadratureAndArithmeticTotalErrorCompositionGoverned: true,
      arbitraryFixedErrorBudgetSplitRequired: false,
      certifiedDirectedMeanRuntimeMayBeImplementedNext: true,
      certifiedSymmetricMeanRuntimeMayBeImplementedNext: true,
      arclengthMeanRuntimeImplementationIssued: false,
      arclengthMeanRuntimeValueIssued: false,
      neutralMetricBindingIssued: false,
    });
    expect(result.runtimeGeometryFunctionalDefinitionsIssued).toBe(0);
    expect(result.runtimeGeometryValuesIssued).toBe(0);
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(result.recommendedNextFrontier.frontierKey)
      .toBe('certified_role_free_symmetric_arclength_mean_runtime_implementation');
  });

  it('rejects structurally plausible but unissued FR95 values', () => {
    const forged = {
      schemaVersion: 'fr95-certified-arclength-total-error-composition-review-v1',
      authorityState: 'certified_arclength_total_error_composition_review_completed_no_arclength_runtime_value_issued',
    } as unknown as CertifiedArclengthTotalErrorCompositionReviewFR95V1;

    expect(() => assertIssuedCertifiedArclengthTotalErrorCompositionReviewFR95(forged))
      .toThrow(/not issued by the active FR-95 boundary/u);
  });
});
