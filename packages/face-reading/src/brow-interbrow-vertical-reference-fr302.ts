import {
  FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION,
  computeVisibleEyebrowPairGeometryFR292,
  type FR292VisibleEyebrowCurveInput,
  type FR292VisibleEyebrowPairGeometryInput,
} from './visible-eyebrow-pair-geometry-fr292.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR302_BROW_INTERBROW_VERTICAL_REFERENCE_CONTRACT_VERSION =
  'FR302-BROW-INTERBROW-VERTICAL-REFERENCE-v1' as const;

export const FR302_BROW_VERTICAL_REFERENCE_REF =
  'neutral.face.visible_eyebrow_pair.arc_length_weighted_vertical_coordinate@0.1.0' as const;

export const FR302_INTERBROW_VERTICAL_REFERENCE_REF =
  'neutral.face.visible_interbrow.medial_endpoint_midpoint_vertical_coordinate@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR302SourceReceipt {
  readonly sourceContractVersion:
    typeof FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION;
  readonly sourceGeometryStatus: 'available' | 'unavailable';
  readonly explicitVisibleSemanticCurvesConsumed: true;
  readonly canonicalAssetDigestValidatedByFR292: true;
  readonly sourceObservationRefsValidatedByFR292: true;
  readonly providerEyebrowComponentsConsumed: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly canonicalAssetDigestExposed: false;
  readonly sourceObservationRefsExposed: false;
  readonly traditionalSemanticsExposed: false;
}

export interface FR302AuthorityBoundary {
  readonly neutralObservationOnly: true;
  readonly anatomicalBrowBoundaryIssued: false;
  readonly traditionalBrowEquivalenceIssued: false;
  readonly traditionalYintangEquivalenceIssued: false;
  readonly traditionalBindingIssued: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR302BrowVerticalReference =
  | Readonly<{
      status: 'available';
      observationRef: typeof FR302_BROW_VERTICAL_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
      selectionRule:
        'mean_of_pair_arc_length_weighted_visible_curve_y_centroids';
      visibilitySemantics:
        'available_only_when_governed_fr292_visible_eyebrow_pair_geometry_is_available';
      pairOrderSemantic: false;
      failClosedWhenUnavailable: true;
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review';
    }>
  | Readonly<{
      status: 'unavailable';
      reason: 'fr292_visible_eyebrow_pair_unavailable';
      sourceUnavailableReason: string;
      fallbackInvented: false;
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review';
    }>;

export type FR302InterbrowVerticalReference =
  | Readonly<{
      status: 'available';
      observationRef: typeof FR302_INTERBROW_VERTICAL_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
      selectionRule:
        'midpoint_y_between_explicit_visible_medial_endpoints';
      visibilitySemantics:
        'available_only_when_governed_fr292_pair_is_available_and_visible_medial_endpoints_have_positive_horizontal_separation';
      pairOrderSemantic: false;
      failClosedWhenUnavailable: true;
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review';
    }>
  | Readonly<{
      status: 'unavailable';
      reason:
        | 'fr292_visible_eyebrow_pair_unavailable'
        | 'visible_interbrow_horizontal_span_collapsed';
      sourceUnavailableReason?: string;
      fallbackInvented: false;
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review';
    }>;

export interface FR302BrowInterbrowVerticalReferenceResult {
  readonly schemaVersion:
    'fr302-brow-interbrow-vertical-reference-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion:
    typeof FR302_BROW_INTERBROW_VERTICAL_REFERENCE_CONTRACT_VERSION;
  readonly authorityState:
    'neutral_visible_brow_and_interbrow_vertical_references_only';
  readonly browVerticalReference: FR302BrowVerticalReference;
  readonly interbrowVerticalReference:
    FR302InterbrowVerticalReference;
  readonly source: FR302SourceReceipt;
  readonly authorityBoundary: FR302AuthorityBoundary;
}

const AUTHORITY_BOUNDARY: FR302AuthorityBoundary = Object.freeze({
  neutralObservationOnly: true as const,
  anatomicalBrowBoundaryIssued: false as const,
  traditionalBrowEquivalenceIssued: false as const,
  traditionalYintangEquivalenceIssued: false as const,
  traditionalBindingIssued: false as const,
  threeDivisionsBoundaryIssued: false as const,
  threeDivisionsSpanIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  classifierIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-302 ${message}`);
}

function curveArcLengthWeightedYCentroid(
  curve: FR292VisibleEyebrowCurveInput,
): number {
  let totalLength = 0;
  let weightedY = 0;

  for (
    let index = 0;
    index < curve.orderedVisibleCurve.length - 1;
    index += 1
  ) {
    const start = curve.orderedVisibleCurve[index]!;
    const end = curve.orderedVisibleCurve[index + 1]!;
    const segmentLength = Math.hypot(
      end.x - start.x,
      end.y - start.y,
    );

    if (!Number.isFinite(segmentLength) || !(segmentLength > 0)) {
      fail('visible brow curve contains a degenerate segment.');
    }

    totalLength += segmentLength;
    weightedY +=
      segmentLength * ((start.y + end.y) / 2);
  }

  if (!Number.isFinite(totalLength) || !(totalLength > EPSILON)) {
    fail('visible brow curve path length collapsed.');
  }

  const value = weightedY / totalLength;
  if (!Number.isFinite(value)) {
    fail('visible brow curve vertical centroid is non-finite.');
  }
  return value;
}

function sourceReceipt(
  status: FR302SourceReceipt['sourceGeometryStatus'],
): FR302SourceReceipt {
  return Object.freeze({
    sourceContractVersion:
      FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION,
    sourceGeometryStatus: status,
    explicitVisibleSemanticCurvesConsumed: true as const,
    canonicalAssetDigestValidatedByFR292: true as const,
    sourceObservationRefsValidatedByFR292: true as const,
    providerEyebrowComponentsConsumed: false as const,
    providerSpecificIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    canonicalAssetDigestExposed: false as const,
    sourceObservationRefsExposed: false as const,
    traditionalSemanticsExposed: false as const,
  });
}

function sourceUnavailableReference(
  sourceUnavailableReason: string,
): FR302BrowVerticalReference {
  return Object.freeze({
    status: 'unavailable' as const,
    reason: 'fr292_visible_eyebrow_pair_unavailable' as const,
    sourceUnavailableReason,
    fallbackInvented: false as const,
    bridgeReviewState:
      'neutral_observation_not_available_for_binding_review' as const,
  });
}

function sourceUnavailableInterbrowReference(
  sourceUnavailableReason: string,
): FR302InterbrowVerticalReference {
  return Object.freeze({
    status: 'unavailable' as const,
    reason: 'fr292_visible_eyebrow_pair_unavailable' as const,
    sourceUnavailableReason,
    fallbackInvented: false as const,
    bridgeReviewState:
      'neutral_observation_not_available_for_binding_review' as const,
  });
}

export function deriveBrowInterbrowVerticalReferencesFR302(
  input: FR292VisibleEyebrowPairGeometryInput,
): FR302BrowInterbrowVerticalReferenceResult {
  const sourceGeometry =
    computeVisibleEyebrowPairGeometryFR292(input);

  if (sourceGeometry.status === 'unavailable') {
    const result = Object.freeze({
      schemaVersion:
        'fr302-brow-interbrow-vertical-reference-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR302_BROW_INTERBROW_VERTICAL_REFERENCE_CONTRACT_VERSION,
      authorityState:
        'neutral_visible_brow_and_interbrow_vertical_references_only' as const,
      browVerticalReference:
        sourceUnavailableReference(sourceGeometry.reason),
      interbrowVerticalReference:
        sourceUnavailableInterbrowReference(sourceGeometry.reason),
      source: sourceReceipt('unavailable'),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

    assertBrowInterbrowVerticalReferencesFR302(result);
    return result;
  }

  const firstCentroid = curveArcLengthWeightedYCentroid(
    input.unorderedVisibleBrows[0],
  );
  const secondCentroid = curveArcLengthWeightedYCentroid(
    input.unorderedVisibleBrows[1],
  );

  const browValue = (firstCentroid + secondCentroid) / 2;
  if (!Number.isFinite(browValue)) {
    fail('brow vertical reference is non-finite.');
  }

  const firstMedial =
    input.unorderedVisibleBrows[0].medialEndpoint;
  const secondMedial =
    input.unorderedVisibleBrows[1].medialEndpoint;
  const interbrowHorizontalSpan = Math.abs(
    secondMedial.x - firstMedial.x,
  );

  const browVerticalReference:
  FR302BrowVerticalReference = Object.freeze({
    status: 'available' as const,
    observationRef: FR302_BROW_VERTICAL_REFERENCE_REF,
    value: browValue,
    unit: 'centimeter' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    selectionRule:
      'mean_of_pair_arc_length_weighted_visible_curve_y_centroids' as const,
    visibilitySemantics:
      'available_only_when_governed_fr292_visible_eyebrow_pair_geometry_is_available' as const,
    pairOrderSemantic: false as const,
    failClosedWhenUnavailable: true as const,
    bridgeReviewState:
      'neutral_observation_ready_for_explicit_binding_review' as const,
  });

  const interbrowVerticalReference:
  FR302InterbrowVerticalReference =
    interbrowHorizontalSpan > EPSILON
      ? Object.freeze({
          status: 'available' as const,
          observationRef:
            FR302_INTERBROW_VERTICAL_REFERENCE_REF,
          value: (firstMedial.y + secondMedial.y) / 2,
          unit: 'centimeter' as const,
          coordinateFrame:
            'canonical_aligned_right_handed_metric_xy' as const,
          selectionRule:
            'midpoint_y_between_explicit_visible_medial_endpoints' as const,
          visibilitySemantics:
            'available_only_when_governed_fr292_pair_is_available_and_visible_medial_endpoints_have_positive_horizontal_separation' as const,
          pairOrderSemantic: false as const,
          failClosedWhenUnavailable: true as const,
          bridgeReviewState:
            'neutral_observation_ready_for_explicit_binding_review' as const,
        })
      : Object.freeze({
          status: 'unavailable' as const,
          reason:
            'visible_interbrow_horizontal_span_collapsed' as const,
          fallbackInvented: false as const,
          bridgeReviewState:
            'neutral_observation_not_available_for_binding_review' as const,
        });

  const result = Object.freeze({
    schemaVersion:
      'fr302-brow-interbrow-vertical-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR302_BROW_INTERBROW_VERTICAL_REFERENCE_CONTRACT_VERSION,
    authorityState:
      'neutral_visible_brow_and_interbrow_vertical_references_only' as const,
    browVerticalReference,
    interbrowVerticalReference,
    source: sourceReceipt('available'),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertBrowInterbrowVerticalReferencesFR302(result);
  return result;
}

export function assertBrowInterbrowVerticalReferencesFR302(
  result: FR302BrowInterbrowVerticalReferenceResult,
): void {
  if (
    result.schemaVersion !==
      'fr302-brow-interbrow-vertical-reference-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR302_BROW_INTERBROW_VERTICAL_REFERENCE_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_visible_brow_and_interbrow_vertical_references_only' ||
    result.source.sourceContractVersion !==
      FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION ||
    result.source.explicitVisibleSemanticCurvesConsumed !== true ||
    result.source.canonicalAssetDigestValidatedByFR292 !== true ||
    result.source.sourceObservationRefsValidatedByFR292 !== true ||
    result.source.providerEyebrowComponentsConsumed !== false ||
    result.source.providerSpecificIndicesExposed !== false ||
    result.source.rawLandmarksExposed !== false ||
    result.source.canonicalAssetDigestExposed !== false ||
    result.source.sourceObservationRefsExposed !== false ||
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
    fail('authority widened beyond neutral vertical references.');
  }

  const brow = result.browVerticalReference;
  if (brow.status === 'available') {
    if (
      brow.observationRef !==
        FR302_BROW_VERTICAL_REFERENCE_REF ||
      !Number.isFinite(brow.value) ||
      brow.unit !== 'centimeter' ||
      brow.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      brow.selectionRule !==
        'mean_of_pair_arc_length_weighted_visible_curve_y_centroids' ||
      brow.pairOrderSemantic !== false ||
      brow.failClosedWhenUnavailable !== true ||
      brow.bridgeReviewState !==
        'neutral_observation_ready_for_explicit_binding_review'
    ) {
      fail('available brow vertical reference boundary drift.');
    }
  } else if (
    brow.reason !==
      'fr292_visible_eyebrow_pair_unavailable' ||
    !brow.sourceUnavailableReason.trim() ||
    brow.fallbackInvented !== false
  ) {
    fail('unavailable brow vertical reference boundary drift.');
  }

  const interbrow = result.interbrowVerticalReference;
  if (interbrow.status === 'available') {
    if (
      interbrow.observationRef !==
        FR302_INTERBROW_VERTICAL_REFERENCE_REF ||
      !Number.isFinite(interbrow.value) ||
      interbrow.unit !== 'centimeter' ||
      interbrow.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      interbrow.selectionRule !==
        'midpoint_y_between_explicit_visible_medial_endpoints' ||
      interbrow.pairOrderSemantic !== false ||
      interbrow.failClosedWhenUnavailable !== true ||
      interbrow.bridgeReviewState !==
        'neutral_observation_ready_for_explicit_binding_review'
    ) {
      fail('available interbrow vertical reference boundary drift.');
    }
  } else {
    if (
      interbrow.fallbackInvented !== false ||
      interbrow.bridgeReviewState !==
        'neutral_observation_not_available_for_binding_review'
    ) {
      fail('unavailable interbrow reference invented a fallback.');
    }
    if (
      interbrow.reason ===
        'fr292_visible_eyebrow_pair_unavailable' &&
      !interbrow.sourceUnavailableReason?.trim()
    ) {
      fail('source-unavailable interbrow reference lost source reason.');
    }
  }

  if (
    result.source.sourceGeometryStatus === 'unavailable' &&
    (brow.status !== 'unavailable' ||
      interbrow.status !== 'unavailable')
  ) {
    fail('source-unavailable result issued an available reference.');
  }
}

export const FR302_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr302-brow-interbrow-vertical-reference-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  parentIssue: 1521 as const,
  requiredNeutralVerticalReferenceCapabilityCount: 7 as const,
  handoffReadyNeutralReferenceCapabilityCount: 3 as const,
  remainingNeutralReferenceCapabilityCount: 4 as const,
  traditionalBindingAdmittedCount: 0 as const,
  lowerFaceInferiorReferenceCapabilityReady: true as const,
  browVerticalReferenceCapabilityReady: true as const,
  interbrowVerticalReferenceCapabilityReady: true as const,
  runtimeAvailabilityConditional: true as const,
  hairlineHardGapPreserved: true as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'derive_visible_central_groove_vertical_reference_without_traditional_binding' as const,
});

export function assertFR302CurrentGate(): void {
  const gate = FR302_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.requiredNeutralVerticalReferenceCapabilityCount !== 7 ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 3 ||
    gate.remainingNeutralReferenceCapabilityCount !== 4 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.lowerFaceInferiorReferenceCapabilityReady !== true ||
    gate.browVerticalReferenceCapabilityReady !== true ||
    gate.interbrowVerticalReferenceCapabilityReady !== true ||
    gate.runtimeAvailabilityConditional !== true ||
    gate.hairlineHardGapPreserved !== true ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR302CurrentGate();
