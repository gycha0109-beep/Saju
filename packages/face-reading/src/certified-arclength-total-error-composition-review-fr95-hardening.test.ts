import { describe, expect, it } from 'vitest';
import { reviewCertifiedArclengthTotalErrorCompositionFR95 } from './certified-arclength-total-error-composition-review-fr95.js';

describe('FR95 total-error composition hardening', () => {
  it('does not admit an arbitrary 50/50 or fixed-fraction error split', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    expect(result.strictQuadratureSlackPolicy.fixedFractionBudgetSplitAdmitted).toBe(false);
    expect(result.compositionDecision.arbitraryFixedErrorBudgetSplitRequired).toBe(false);
    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(/50.?50|half.?budget|fixed.?fraction.?allocation/ui);
  });

  it('requires strict slack after first FR91 satisfaction except the exact Q=0 case', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    expect(result.strictQuadratureSlackPolicy.additionalSubdivisionRequiredBeforeArithmeticCertification).toBe(true);
    expect(result.strictQuadratureSlackPolicy.additionalSubdivisionRule)
      .toBe('one_more_equal_maximum_certificate_batch_after_first_fr91_quadrature_budget_satisfaction');
    expect(result.strictQuadratureSlackPolicy.zeroQuadratureException)
      .toBe('skip_extra_batch_only_if_Q_equals_zero');
    expect(result.strictQuadratureSlackPolicy.providerSegmentIndexTieBreakAllowed).toBe(false);
    expect(result.strictQuadratureSlackPolicy.empiricalToleranceUsed).toBe(false);
  });

  it('uses conservative lower perimeter bounds rather than treating enclosure midpoints as exact', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    expect(result.sqrtPrecisionAllocationPolicy.perimeterLowerBoundMustBePositive).toBe(true);
    expect(result.directedCertificateAcceptance.acceptanceRule).toBe('R<=L_lower/4096');
    expect(result.directedCertificateAcceptance.implication).toBe('R<=L_source/4096');
    expect(result.perimeterAndDivisionComposition.directedMeanContainment)
      .toBe('M_exact_in_[I_lower/L_upper,I_upper/L_lower]');
  });

  it('keeps precision allocation deterministic, minimal, and non-semantic', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    expect(result.sqrtPrecisionAllocationPolicy.selectionRule)
      .toBe('minimum_p_whose_certified_directed_mean_interval_half_width_lte_L_lower_over_4096');
    expect(result.sqrtPrecisionAllocationPolicy.searchOrder)
      .toBe('p_equals_0_1_2_3_in_strictly_increasing_order');
    expect(result.sqrtPrecisionAllocationPolicy.fixedMagicPrecisionAdmitted).toBe(false);
    expect(result.sqrtPrecisionAllocationPolicy.empiricalPrecisionTuningAdmitted).toBe(false);
    expect(result.sqrtPrecisionAllocationPolicy.precisionBitsAreEngineeringCertificateResolutionOnly).toBe(true);
  });

  it('does not widen certified separation into correspondence, anatomy, thickness, or traditional semantics', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    expect(result.authorityBoundary).toEqual({
      totalErrorBudgetMeansMorphologyThreshold: false,
      totalErrorBudgetMeansTraditionalThicknessThreshold: false,
      additionalSubdivisionMeansSemanticCalibration: false,
      minimumPrecisionBitsMeanBiologicalPrecision: false,
      certifiedArclengthMeanSeparationMeansLipThickness: false,
      certifiedArclengthMeanSeparationMeansPhysicalBandWidth: false,
      coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false,
      totalErrorCompositionReviewMeansProductionMetricBinding: false,
      totalErrorCompositionReviewMeansTraditionalDuanHou: false,
    });
    expect(result.prohibitedShortcuts).toContain('certified_arclength_mean_separation_to_lip_thickness');
    expect(result.prohibitedShortcuts).toContain('coordinate_centimeter_to_physical_soft_tissue_anthropometry');
    expect(result.prohibitedShortcuts).toContain('total_error_composition_review_to_runtime_value');
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('resolves only numerical composition blockers and retains source/semantic blockers', () => {
    const result = reviewCertifiedArclengthTotalErrorCompositionFR95();
    expect(result.resolvedProcessGaps).toEqual([
      'certified_sqrt_enclosure_precision_allocation_not_governed',
      'certified_arclength_mean_total_error_composition_not_governed',
    ]);
    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'certified_arclength_mean_runtime_implementation_not_issued',
    ]);
    expect(result.remainingBlockers).toContain('five_officers_source_not_scan_checked');
    expect(result.remainingBlockers).toContain('outer_inner_lip_roles_not_authorized');
    expect(result.remainingBlockers).toContain('role_free_cross_contour_correspondence_not_defined');
    expect(result.remainingBlockers).toContain('lips_substantial_thickness_metric_not_defined');
  });
});
