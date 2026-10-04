import { describe, expect, it } from 'vitest';
import {
  FR315_COMMON_FRAME_READINESS,
  FR315_CURRENT_GATE,
  bridgeVisibleCentralGrooveToCanonicalMetricXYFR315,
  assertFR315CommonFrameReadiness,
  assertFR315CurrentGate,
} from './common-frame-bridge-fr315.js';
import type {
  FR303VisibleCentralGrooveVerticalReference,
} from './visible-central-groove-vertical-reference-fr303.js';

function authorityBoundary() {
  return {
    neutralObservationOnly: true as const,
    anatomicalPhiltrumGroundTruthIssued: false as const,
    traditionalRenzhongEquivalenceIssued: false as const,
    traditionalBindingIssued: false as const,
    commonFrameBridgeIssued: false as const,
    mixedFrameSubtractionAllowed: false as const,
    threeDivisionsBoundaryIssued: false as const,
    threeDivisionsSpanIssued: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    classifierIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  };
}

function sourceReceipt(status: 'available' | 'unavailable') {
  return {
    sourceContractVersion:
      'FR291-VISIBLE-PHILTRUM-GEOMETRY-v1' as const,
    sourceGeometryStatus: status,
    explicitVisibleCentralGrooveAxisConsumed:
      true as const,
    sameCaptureAndDigestValidatedByFR291: true as const,
    sourceObservationRefsRetainedInternally:
      true as const,
    sourceObservationRefsExposed: false as const,
    canonicalAssetDigestExposed: false as const,
    providerSpecificIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    anatomicalLandmarkNamesExposed: false as const,
    traditionalSemanticsExposed: false as const,
  };
}

function availableSource(
  value = 2.75,
): Extract<
  FR303VisibleCentralGrooveVerticalReference,
  { readonly status: 'available' }
> {
  return {
    schemaVersion:
      'fr303-visible-central-groove-vertical-reference-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR303-VISIBLE-CENTRAL-GROOVE-VERTICAL-REFERENCE-v1',
    authorityState:
      'neutral_visible_central_groove_vertical_reference_only',
    status: 'available',
    observationRef:
      'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate@0.1.0',
    value,
    unit: 'centimeter',
    coordinateFrame: 'pose_normalized_face_2d',
    selectionRule:
      'midpoint_y_between_explicit_visible_central_groove_axis_endpoints',
    visibilitySemantics:
      'available_only_when_governed_fr291_visible_central_groove_geometry_is_available',
    endpointOrderSemantic: false,
    failClosedWhenUnavailable: true,
    crossAnchorSpanReady: false,
    crossAnchorSpanBlocker:
      'common_coordinate_frame_bridge_not_issued',
    bridgeReviewState:
      'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked',
    source: sourceReceipt('available'),
    authorityBoundary: authorityBoundary(),
  };
}

function unavailableSource(): Extract<
  FR303VisibleCentralGrooveVerticalReference,
  { readonly status: 'unavailable' }
> {
  return {
    schemaVersion:
      'fr303-visible-central-groove-vertical-reference-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR303-VISIBLE-CENTRAL-GROOVE-VERTICAL-REFERENCE-v1',
    authorityState:
      'neutral_visible_central_groove_vertical_reference_only',
    status: 'unavailable',
    reason:
      'fr291_visible_central_groove_geometry_unavailable',
    sourceUnavailableReason: 'fixture unavailable',
    fallbackInvented: false,
    crossAnchorSpanReady: false,
    bridgeReviewState:
      'neutral_observation_not_available_for_binding_review',
    source: sourceReceipt('unavailable'),
    authorityBoundary: authorityBoundary(),
  };
}

describe('FR315 common-frame bridge', () => {
  it('bridges FR303 y into canonical metric XY without changing the value', () => {
    const result =
      bridgeVisibleCentralGrooveToCanonicalMetricXYFR315(
        availableSource(3.125),
      );

    expect(result).toEqual({
      schemaVersion:
        'fr315-central-groove-metric-bridge-result-v1',
      contractVersion:
        'FR315-COMMON-FRAME-BRIDGE-v1',
      authorityState:
        'neutral_vertical_coordinate_frame_bridge_only',
      status: 'available',
      observationRef:
        'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate.canonical_metric_xy@0.1.0',
      sourceObservationRef:
        'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate@0.1.0',
      value: 3.125,
      unit: 'centimeter',
      sourceCoordinateFrame:
        'pose_normalized_face_2d',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      bridgeRule:
        'identity_y_bridge_between_fr79_pose_normalized_plane_and_fr265_canonical_metric_xy',
      formula: 'y_metric_xy=y_pose_normalized',
      valueIdentityPreserved: true,
      sourceSameCaptureAndDigestValidatedByFR291: true,
      fr79ProjectionRuleRef:
        'fr79:canonical-metric-xy-orthographic@0.1.0',
      fr265ProjectionRuleRef:
        'neutral.face.canonical_metric_xy_projection@0.1.0',
      sourceRecentered: false,
      sourceRescaled: false,
      perspectiveReprojectionApplied: false,
      screenCoordinateReconstructionApplied: false,
      failClosedWhenUnavailable: true,
      crossAnchorMetricFrameReady: true,
      authorityBoundary: {
        coordinateBridgeOnly: true,
        sourceObservationAuthorityExpanded: false,
        anatomicalIdentityIssued: false,
        traditionalBindingIssued: false,
        imageNormalizedHairlineMetricBridgeIssued: false,
        mixedFrameSubtractionAuthorized: false,
        threeDivisionsBoundaryIssued: false,
        threeDivisionsSpanIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        classifierIssued: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('fails closed when the FR303 source reference is unavailable', () => {
    const result =
      bridgeVisibleCentralGrooveToCanonicalMetricXYFR315(
        unavailableSource(),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'fr303_visible_central_groove_reference_unavailable',
      fallbackInvented: false,
      crossAnchorMetricFrameReady: false,
    });
  });

  it('audits five references already in metric XY, one explicit FR315 bridge and one blocked hairline bridge', () => {
    const states =
      FR315_COMMON_FRAME_READINESS.references.map(
        (entry) => entry.commonFrameState,
      );

    expect(
      states.filter(
        (state) =>
          state ===
          'already_in_selected_common_frame',
      ),
    ).toHaveLength(5);
    expect(
      states.filter(
        (state) =>
          state ===
          'explicit_fr315_identity_bridge_available',
      ),
    ).toHaveLength(1);
    expect(
      states.filter(
        (state) =>
          state ===
          'blocked_exact_same_capture_image_to_metric_registration_required',
      ),
    ).toHaveLength(1);

    expect(FR315_COMMON_FRAME_READINESS).toMatchObject({
      selectedCommonFrame:
        'canonical_aligned_right_handed_metric_xy',
      selectedCommonUnit: 'centimeter',
      metricFrameReadyReferenceCapabilityCount: 6,
      remainingMetricFrameBridgeCapabilityCount: 1,
      commonFrameComplete: false,
      mixedFrameSubtractionAuthorized: false,
      threeDivisionsSpanExecutionReady: false,
      traditionalBindingAdmittedCount: 0,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('keeps image-normalized hairline conversion blocked without exact same-capture metric registration', () => {
    expect(
      FR315_COMMON_FRAME_READINESS.hairlineBridge,
    ).toEqual({
      issued: false,
      sourceFrame: 'canonical_image_normalized_2d',
      sourceUnit: 'normalized_ratio',
      targetFrame:
        'canonical_aligned_right_handed_metric_xy',
      targetUnit: 'centimeter',
      requiredEvidence:
        'exact_same_capture_image_normalized_to_canonical_metric_registration_and_scale_authority',
      unrelatedAstRegistrationMaySubstitute: false,
      faceBoxScaleMaySubstitute: false,
      faceOvalScaleMaySubstitute: false,
      averageFaceSizeMaySubstitute: false,
      providerNormalizedLandmarksMayBeRelabeledAsMetric:
        false,
    });
  });

  it('does not enable span execution merely because six reference capabilities are metric-frame ready', () => {
    expect(
      FR315_COMMON_FRAME_READINESS
        .metricFrameReadyReferenceCapabilityCount,
    ).toBe(6);
    expect(
      FR315_COMMON_FRAME_READINESS.commonFrameComplete,
    ).toBe(false);
    expect(
      FR315_COMMON_FRAME_READINESS
        .threeDivisionsSpanExecutionReady,
    ).toBe(false);
  });

  it('keeps the current repository state at actual 6/7 because real hairline admission/materialization is absent', () => {
    expect(FR315_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      centralGrooveMetricBridgeImplemented: true,
      hairlineImageToMetricBridgeIssued: false,
      commonFrameComplete: false,
      actualNeutralReferenceCapabilityCount: 6,
      actualRemainingNeutralReferenceCapabilityCount: 1,
      metricFrameReadyReferenceCapabilityCount: 6,
      remainingMetricFrameBridgeCapabilityCount: 1,
      realHairlineAdmissionAvailable: false,
      realHairlineObservationMaterialized: false,
      traditionalBindingAdmittedCount: 0,
      mixedCoordinateFrameSpanBlocked: true,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() =>
      assertFR315CommonFrameReadiness(),
    ).not.toThrow();
    expect(() => assertFR315CurrentGate()).not.toThrow();
  });

  it('rejects source-frame drift instead of treating arbitrary 2D data as canonical metric XY', () => {
    const drifted = {
      ...availableSource(),
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
    } as unknown as FR303VisibleCentralGrooveVerticalReference;

    expect(() =>
      bridgeVisibleCentralGrooveToCanonicalMetricXYFR315(
        drifted,
      ),
    ).toThrow();
  });
});
