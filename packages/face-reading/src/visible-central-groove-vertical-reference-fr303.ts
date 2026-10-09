import {
  FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION,
  computeVisiblePhiltrumGeometryFR291,
  type FR291VisibleMouthWidthReference,
  type FR291VisiblePhiltrumGeometryInput,
} from './visible-philtrum-geometry-fr291.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_CONTRACT_VERSION =
  'FR303-VISIBLE-CENTRAL-GROOVE-VERTICAL-REFERENCE-v1' as const;

export const FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF =
  'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate@0.1.0' as const;

export interface FR303SourceReceipt {
  readonly sourceContractVersion:
    typeof FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION;
  readonly sourceGeometryStatus: 'available' | 'unavailable';
  readonly explicitVisibleCentralGrooveAxisConsumed: true;
  readonly sameCaptureAndDigestValidatedByFR291: true;
  readonly sourceObservationRefsRetainedInternally: true;
  readonly sourceObservationRefsExposed: false;
  readonly canonicalAssetDigestExposed: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalLandmarkNamesExposed: false;
  readonly traditionalSemanticsExposed: false;
}

export interface FR303AuthorityBoundary {
  readonly neutralObservationOnly: true;
  readonly anatomicalPhiltrumGroundTruthIssued: false;
  readonly traditionalRenzhongEquivalenceIssued: false;
  readonly traditionalBindingIssued: false;
  readonly commonFrameBridgeIssued: false;
  readonly mixedFrameSubtractionAllowed: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR303VisibleCentralGrooveVerticalReference =
  | Readonly<{
      schemaVersion:
        'fr303-visible-central-groove-vertical-reference-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_CONTRACT_VERSION;
      authorityState:
        'neutral_visible_central_groove_vertical_reference_only';
      status: 'available';
      observationRef:
        typeof FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame: 'pose_normalized_face_2d';
      selectionRule:
        'midpoint_y_between_explicit_visible_central_groove_axis_endpoints';
      visibilitySemantics:
        'available_only_when_governed_fr291_visible_central_groove_geometry_is_available';
      endpointOrderSemantic: false;
      failClosedWhenUnavailable: true;
      crossAnchorSpanReady: false;
      crossAnchorSpanBlocker:
        'common_coordinate_frame_bridge_not_issued';
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked';
      source: FR303SourceReceipt;
      authorityBoundary: FR303AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr303-visible-central-groove-vertical-reference-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_CONTRACT_VERSION;
      authorityState:
        'neutral_visible_central_groove_vertical_reference_only';
      status: 'unavailable';
      reason: 'fr291_visible_central_groove_geometry_unavailable';
      sourceUnavailableReason: string;
      fallbackInvented: false;
      crossAnchorSpanReady: false;
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review';
      source: FR303SourceReceipt;
      authorityBoundary: FR303AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR303AuthorityBoundary = Object.freeze({
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
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-303 ${message}`);
}

function sourceReceipt(
  status: FR303SourceReceipt['sourceGeometryStatus'],
): FR303SourceReceipt {
  return Object.freeze({
    sourceContractVersion:
      FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION,
    sourceGeometryStatus: status,
    explicitVisibleCentralGrooveAxisConsumed: true as const,
    sameCaptureAndDigestValidatedByFR291: true as const,
    sourceObservationRefsRetainedInternally: true as const,
    sourceObservationRefsExposed: false as const,
    canonicalAssetDigestExposed: false as const,
    providerSpecificIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    anatomicalLandmarkNamesExposed: false as const,
    traditionalSemanticsExposed: false as const,
  });
}

export function deriveVisibleCentralGrooveVerticalReferenceFR303(
  input: FR291VisiblePhiltrumGeometryInput,
  reference: FR291VisibleMouthWidthReference,
): FR303VisibleCentralGrooveVerticalReference {
  const sourceGeometry =
    computeVisiblePhiltrumGeometryFR291(input, reference);

  if (sourceGeometry.status === 'unavailable') {
    const result = Object.freeze({
      schemaVersion:
        'fr303-visible-central-groove-vertical-reference-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_CONTRACT_VERSION,
      authorityState:
        'neutral_visible_central_groove_vertical_reference_only' as const,
      status: 'unavailable' as const,
      reason:
        'fr291_visible_central_groove_geometry_unavailable' as const,
      sourceUnavailableReason: sourceGeometry.reason,
      fallbackInvented: false as const,
      crossAnchorSpanReady: false as const,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review' as const,
      source: sourceReceipt('unavailable'),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

    assertVisibleCentralGrooveVerticalReferenceFR303(result);
    return result;
  }

  const first =
    input.visibleCentralGrooveAxisEndpoints[0];
  const second =
    input.visibleCentralGrooveAxisEndpoints[1];
  const value = (first.y + second.y) / 2;

  if (!Number.isFinite(value)) {
    fail('central-groove vertical midpoint is non-finite.');
  }

  const result = Object.freeze({
    schemaVersion:
      'fr303-visible-central-groove-vertical-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_CONTRACT_VERSION,
    authorityState:
      'neutral_visible_central_groove_vertical_reference_only' as const,
    status: 'available' as const,
    observationRef:
      FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF,
    value,
    unit: 'centimeter' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    selectionRule:
      'midpoint_y_between_explicit_visible_central_groove_axis_endpoints' as const,
    visibilitySemantics:
      'available_only_when_governed_fr291_visible_central_groove_geometry_is_available' as const,
    endpointOrderSemantic: false as const,
    failClosedWhenUnavailable: true as const,
    crossAnchorSpanReady: false as const,
    crossAnchorSpanBlocker:
      'common_coordinate_frame_bridge_not_issued' as const,
    bridgeReviewState:
      'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked' as const,
    source: sourceReceipt('available'),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertVisibleCentralGrooveVerticalReferenceFR303(result);
  return result;
}

export function assertVisibleCentralGrooveVerticalReferenceFR303(
  result: FR303VisibleCentralGrooveVerticalReference,
): void {
  if (
    result.schemaVersion !==
      'fr303-visible-central-groove-vertical-reference-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_visible_central_groove_vertical_reference_only' ||
    result.source.sourceContractVersion !==
      FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION ||
    result.source
      .explicitVisibleCentralGrooveAxisConsumed !== true ||
    result.source
      .sameCaptureAndDigestValidatedByFR291 !== true ||
    result.source
      .sourceObservationRefsRetainedInternally !== true ||
    result.source.sourceObservationRefsExposed !== false ||
    result.source.canonicalAssetDigestExposed !== false ||
    result.source.providerSpecificIndicesExposed !== false ||
    result.source.rawLandmarksExposed !== false ||
    result.source.anatomicalLandmarkNamesExposed !== false ||
    result.source.traditionalSemanticsExposed !== false
  ) {
    fail('identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.neutralObservationOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'neutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond neutral vertical reference.');
  }

  if (result.crossAnchorSpanReady !== false) {
    fail('cross-anchor span cannot be enabled before a common-frame bridge.');
  }

  if (result.status === 'available') {
    if (
      result.source.sourceGeometryStatus !== 'available' ||
      result.observationRef !==
        FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.unit !== 'centimeter' ||
      result.coordinateFrame !== 'pose_normalized_face_2d' ||
      result.selectionRule !==
        'midpoint_y_between_explicit_visible_central_groove_axis_endpoints' ||
      result.visibilitySemantics !==
        'available_only_when_governed_fr291_visible_central_groove_geometry_is_available' ||
      result.endpointOrderSemantic !== false ||
      result.failClosedWhenUnavailable !== true ||
      result.crossAnchorSpanBlocker !==
        'common_coordinate_frame_bridge_not_issued' ||
      result.bridgeReviewState !==
        'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked'
    ) {
      fail('available central-groove reference boundary drift.');
    }
  } else if (
    result.source.sourceGeometryStatus !== 'unavailable' ||
    result.reason !==
      'fr291_visible_central_groove_geometry_unavailable' ||
    !result.sourceUnavailableReason.trim() ||
    result.fallbackInvented !== false ||
    result.bridgeReviewState !==
      'neutral_observation_not_available_for_binding_review'
  ) {
    fail('unavailable central-groove reference boundary drift.');
  }
}

export const FR303_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr303-visible-central-groove-vertical-reference-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  parentIssue: 1521 as const,
  requiredNeutralVerticalReferenceCapabilityCount: 7 as const,
  handoffReadyNeutralReferenceCapabilityCount: 4 as const,
  remainingNeutralReferenceCapabilityCount: 3 as const,
  traditionalBindingAdmittedCount: 0 as const,
  lowerFaceInferiorReferenceCapabilityReady: true as const,
  browVerticalReferenceCapabilityReady: true as const,
  interbrowVerticalReferenceCapabilityReady: true as const,
  centralGrooveVerticalReferenceCapabilityReady: true as const,
  mixedCoordinateFrameSpanBlocked: true as const,
  commonCoordinateFrameBridgeIssued: false as const,
  threeDivisionsSpanExecutionReady: false as const,
  hairlineHardGapPreserved: true as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'review_nose_root_and_nose_tip_neutral_vertical_reference_product_admission_without_traditional_binding' as const,
});

export function assertFR303CurrentGate(): void {
  const gate = FR303_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.requiredNeutralVerticalReferenceCapabilityCount !== 7 ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 4 ||
    gate.remainingNeutralReferenceCapabilityCount !== 3 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.lowerFaceInferiorReferenceCapabilityReady !== true ||
    gate.browVerticalReferenceCapabilityReady !== true ||
    gate.interbrowVerticalReferenceCapabilityReady !== true ||
    gate.centralGrooveVerticalReferenceCapabilityReady !== true ||
    gate.mixedCoordinateFrameSpanBlocked !== true ||
    gate.commonCoordinateFrameBridgeIssued !== false ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.hairlineHardGapPreserved !== true ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR303CurrentGate();
