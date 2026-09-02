import { describe, expect, it } from 'vitest';
import {
  reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93,
} from './exact-dyadic-rational-distance-enclosure-primitives-review-fr93.js';

describe('FR93 exact rational enclosure primitive hardening', () => {
  it('does not widen exact recovery into physical measurement exactness or anatomy', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.authorityBoundary.exactBinary64RecoveryMeansOriginalPhysicalQuantityExact).toBe(false);
    expect(result.authorityBoundary.exactRationalGeometryMeansAnatomicalTruth).toBe(false);
    expect(result.authorityBoundary.exactSquaredDistanceMeansCorrespondencePair).toBe(false);
    expect(result.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
  });

  it('keeps sqrt precision bits numerical rather than morphological or traditional', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.authorityBoundary.sqrtEnclosurePrecisionBitsMeanMorphologyThreshold).toBe(false);
    expect(result.prohibitedShortcuts).toContain('sqrt_precision_bits_to_morphology_threshold');
    expect(result.prohibitedShortcuts).toContain('sqrt_precision_bits_to_traditional_threshold');
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('does not treat exact nearest target segment selection as correspondence semantics', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.exactRationalGeometrySpecification.nearestTargetSegmentSelection)
      .toBe('exact_minimum_over_nonnegative_rational_squared_distances');
    expect(result.exactRationalGeometrySpecification.sqrtAvoidedDuringNearestSegmentSelection).toBe(true);
    expect(result.prohibitedShortcuts).toContain('exact_nearest_segment_to_cross_contour_correspondence_pair');
  });

  it('keeps runtime blocked until primitive implementation and total-error composition are separately governed', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'exact_rational_distance_enclosure_primitives_runtime_not_issued',
      'certified_sqrt_enclosure_precision_allocation_not_governed',
      'certified_arclength_mean_total_error_composition_not_governed',
    ]);
    expect(result.recommendedNextFrontier).toEqual({
      frontierKey: 'exact_rational_distance_enclosure_primitives_runtime_implementation',
      purpose: 'implement and verify exact binary64-to-rational conversion, exact rational point-to-segment squared distance, bigint floor sqrt, and parameterized rational outward sqrt enclosure primitives without issuing mouth semantics',
      primitiveRuntimeConstructionAllowed: true,
      arclengthMeanRuntimeConstructionAllowed: false,
      runtimeGeometryValueIssuanceAllowed: false,
      anatomicalRoleAssignmentAllowed: false,
      correspondencePairIssuanceAllowed: false,
      thicknessSemanticAssignmentAllowed: false,
      physicalAnthropometricInterpretationAllowed: false,
      traditionalSemanticAssignmentAllowed: false,
    });
  });

  it('freezes every authority-bearing nested object and collection', () => {
    const result = reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93();

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.sourceAuthority)).toBe(true);
    expect(Object.isFrozen(result.binary64ToDyadicSpecification)).toBe(true);
    expect(Object.isFrozen(result.exactRationalGeometrySpecification)).toBe(true);
    expect(Object.isFrozen(result.outwardSqrtEnclosureSpecification)).toBe(true);
    expect(Object.isFrozen(result.compositionReadiness)).toBe(true);
    expect(Object.isFrozen(result.reviewDecision)).toBe(true);
    expect(Object.isFrozen(result.resolvedProcessGaps)).toBe(true);
    expect(Object.isFrozen(result.newlyExposedPrerequisiteBlockers)).toBe(true);
    expect(Object.isFrozen(result.remainingBlockers)).toBe(true);
    expect(Object.isFrozen(result.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(result.prohibitedShortcuts)).toBe(true);
    expect(Object.isFrozen(result.recommendedNextFrontier)).toBe(true);
  });
});
