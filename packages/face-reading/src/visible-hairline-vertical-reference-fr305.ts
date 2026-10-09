import { FaceAuthorityValidationError } from './validation.js';

export const FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION =
  'FR305-VISIBLE-HAIRLINE-VERTICAL-REFERENCE-v1' as const;

export const FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF =
  'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR305CanonicalImageNormalizedPoint2D {
  readonly x: number;
  readonly y: number;
}

export interface FR305HairlineModelAdmissionReceipt {
  readonly schemaVersion:
    'fr305-hairline-model-admission-receipt-v1';
  readonly authorityState:
    'validated_visible_hair_skin_boundary_model_only';
  readonly modelId: string;
  readonly exactRevision: string;
  readonly targetClass:
    'visible_hair_skin_boundary_segmentation';
  readonly coordinateFrame:
    'canonical_image_normalized_2d';
  readonly axisConvention:
    'x_right_y_down_unit_square';
  readonly representativeOrdinaryRgbSelfiesValidated: true;
  readonly visibleHairSkinBoundaryValidated: true;
  readonly visibilityHandlingValidated: true;
  readonly occlusionHandlingValidated: true;
  readonly hiddenHairlineCompletionAllowed: false;
  readonly faceOvalSubstitutionAllowed: false;
  readonly faceMeshTopVertexSubstitutionAllowed: false;
  readonly validationEvidenceRefs: readonly string[];
  readonly runtimeProviderAdmitted: true;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export interface FR305VisibleHairlineObservation {
  readonly schemaVersion:
    'fr305-visible-hairline-observation-v1';
  readonly authorityState:
    'validated_model_visible_boundary_observation_only';
  readonly modelId: string;
  readonly exactRevision: string;
  readonly coordinateFrame:
    'canonical_image_normalized_2d';
  readonly axisConvention:
    'x_right_y_down_unit_square';
  readonly boundaryPolyline:
    readonly FR305CanonicalImageNormalizedPoint2D[];
  readonly visibilityState:
    'visible_boundary_segment_admitted';
  readonly occlusionHandlingApplied: true;
  readonly hiddenSegmentsCompleted: false;
  readonly sourceImageDigest: string;
  readonly sourceObservationRefs: readonly string[];
  readonly providerFaceOvalUsedAsHairline: false;
  readonly providerFaceMeshTopVerticesUsedAsHairline: false;
  readonly traditionalBindingApplied: false;
}

export interface FR305SourceReceipt {
  readonly modelId: string;
  readonly exactRevision: string;
  readonly targetClass:
    'visible_hair_skin_boundary_segmentation';
  readonly coordinateFrame:
    'canonical_image_normalized_2d';
  readonly axisConvention:
    'x_right_y_down_unit_square';
  readonly visibilityHandlingValidated: true;
  readonly occlusionHandlingValidated: true;
  readonly hiddenHairlineCompletionAllowed: false;
  readonly faceOvalSubstitutionAllowed: false;
  readonly faceMeshTopVertexSubstitutionAllowed: false;
  readonly sourceImageDigestRetainedInternally: true;
  readonly sourceImageDigestExposed: false;
  readonly sourceObservationRefsRetainedInternally: true;
  readonly sourceObservationRefsExposed: false;
  readonly traditionalSemanticsExposed: false;
}

export interface FR305AuthorityBoundary {
  readonly neutralObservationOnly: true;
  readonly anatomicalHairlineGroundTruthIssued: false;
  readonly traditionalHairlineEquivalenceIssued: false;
  readonly traditionalBindingIssued: false;
  readonly hiddenHairlineCompletionIssued: false;
  readonly faceOvalHairlineSubstitutionIssued: false;
  readonly faceMeshTopVertexHairlineSubstitutionIssued: false;
  readonly canonicalMetricXYRelabelingIssued: false;
  readonly crossFrameSubtractionAllowed: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly productColumnMaterialized: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR305VisibleHairlineVerticalReference =
  | Readonly<{
      schemaVersion:
        'fr305-visible-hairline-vertical-reference-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION;
      authorityState:
        'neutral_visible_hairline_vertical_reference_only';
      status: 'available';
      observationRef:
        typeof FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF;
      value: number;
      unit: 'normalized_ratio';
      coordinateFrame:
        'canonical_image_normalized_2d';
      axisConvention:
        'x_right_y_down_unit_square';
      selectionRule:
        'arc_length_weighted_y_centroid_of_explicitly_visible_boundary_polyline';
      visibilitySemantics:
        'visible_segments_only_no_hidden_completion';
      failClosedWhenUnavailable: true;
      crossAnchorSpanReady: false;
      crossAnchorSpanBlocker:
        'common_coordinate_frame_bridge_not_issued';
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked';
      source: FR305SourceReceipt;
      authorityBoundary: FR305AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr305-visible-hairline-vertical-reference-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION;
      authorityState:
        'neutral_visible_hairline_vertical_reference_only';
      status: 'unavailable';
      reason:
        | 'validated_hairline_model_not_admitted'
        | 'visible_hairline_observation_unavailable';
      fallbackInvented: false;
      crossAnchorSpanReady: false;
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review';
      authorityBoundary: FR305AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR305AuthorityBoundary = Object.freeze({
  neutralObservationOnly: true as const,
  anatomicalHairlineGroundTruthIssued: false as const,
  traditionalHairlineEquivalenceIssued: false as const,
  traditionalBindingIssued: false as const,
  hiddenHairlineCompletionIssued: false as const,
  faceOvalHairlineSubstitutionIssued: false as const,
  faceMeshTopVertexHairlineSubstitutionIssued: false as const,
  canonicalMetricXYRelabelingIssued: false as const,
  crossFrameSubtractionAllowed: false as const,
  threeDivisionsBoundaryIssued: false as const,
  threeDivisionsSpanIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  classifierIssued: false as const,
  productColumnMaterialized: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-305 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    fail(`${label} must be non-empty.`);
  }
  return trimmed;
}

function assertStringRefs(
  refs: readonly string[],
  label: string,
): void {
  if (refs.length === 0) {
    fail(`${label} must be non-empty.`);
  }

  const normalized = refs.map((ref) => ref.trim());
  if (normalized.some((ref) => ref.length === 0)) {
    fail(`${label} must not contain empty refs.`);
  }
  if (new Set(normalized).size !== normalized.length) {
    fail(`${label} must contain unique refs.`);
  }
}

function assertPoint(
  point: FR305CanonicalImageNormalizedPoint2D,
  label: string,
): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    point.x < 0 ||
    point.x > 1 ||
    point.y < 0 ||
    point.y > 1
  ) {
    fail(`${label} must contain finite x/y within [0,1].`);
  }
}

export function assertHairlineModelAdmissionReceiptFR305(
  receipt: FR305HairlineModelAdmissionReceipt,
): void {
  if (
    receipt.schemaVersion !==
      'fr305-hairline-model-admission-receipt-v1' ||
    receipt.authorityState !==
      'validated_visible_hair_skin_boundary_model_only' ||
    receipt.targetClass !==
      'visible_hair_skin_boundary_segmentation' ||
    receipt.coordinateFrame !==
      'canonical_image_normalized_2d' ||
    receipt.axisConvention !==
      'x_right_y_down_unit_square' ||
    receipt.representativeOrdinaryRgbSelfiesValidated !== true ||
    receipt.visibleHairSkinBoundaryValidated !== true ||
    receipt.visibilityHandlingValidated !== true ||
    receipt.occlusionHandlingValidated !== true ||
    receipt.hiddenHairlineCompletionAllowed !== false ||
    receipt.faceOvalSubstitutionAllowed !== false ||
    receipt.faceMeshTopVertexSubstitutionAllowed !== false ||
    receipt.runtimeProviderAdmitted !== true ||
    receipt.traditionalBindingIssued !== false ||
    receipt.productionActivated !== false ||
    receipt.commerceActivated !== false
  ) {
    fail('model admission receipt boundary drift.');
  }

  nonEmpty(receipt.modelId, 'modelId');
  nonEmpty(receipt.exactRevision, 'exactRevision');
  assertStringRefs(
    receipt.validationEvidenceRefs,
    'validationEvidenceRefs',
  );
}

function assertObservation(
  observation: FR305VisibleHairlineObservation,
  receipt: FR305HairlineModelAdmissionReceipt,
): void {
  if (
    observation.schemaVersion !==
      'fr305-visible-hairline-observation-v1' ||
    observation.authorityState !==
      'validated_model_visible_boundary_observation_only' ||
    observation.coordinateFrame !==
      'canonical_image_normalized_2d' ||
    observation.axisConvention !==
      'x_right_y_down_unit_square' ||
    observation.visibilityState !==
      'visible_boundary_segment_admitted' ||
    observation.occlusionHandlingApplied !== true ||
    observation.hiddenSegmentsCompleted !== false ||
    observation.providerFaceOvalUsedAsHairline !== false ||
    observation.providerFaceMeshTopVerticesUsedAsHairline !== false ||
    observation.traditionalBindingApplied !== false
  ) {
    fail('visible hairline observation boundary drift.');
  }

  if (
    observation.modelId !== receipt.modelId ||
    observation.exactRevision !== receipt.exactRevision
  ) {
    fail('observation model identity must match admitted model receipt.');
  }

  nonEmpty(observation.sourceImageDigest, 'sourceImageDigest');
  assertStringRefs(
    observation.sourceObservationRefs,
    'sourceObservationRefs',
  );

  if (observation.boundaryPolyline.length < 2) {
    fail('visible hairline boundary requires at least two points.');
  }

  observation.boundaryPolyline.forEach((point, index) =>
    assertPoint(point, `boundaryPolyline[${index}]`),
  );

  for (
    let index = 0;
    index < observation.boundaryPolyline.length - 1;
    index += 1
  ) {
    const start = observation.boundaryPolyline[index]!;
    const end = observation.boundaryPolyline[index + 1]!;
    const segmentLength = Math.hypot(
      end.x - start.x,
      end.y - start.y,
    );
    if (!Number.isFinite(segmentLength) || !(segmentLength > 0)) {
      fail('visible hairline boundary contains a degenerate segment.');
    }
  }
}

function arcLengthWeightedYCentroid(
  points: readonly FR305CanonicalImageNormalizedPoint2D[],
): number {
  let totalLength = 0;
  let weightedY = 0;

  for (
    let index = 0;
    index < points.length - 1;
    index += 1
  ) {
    const start = points[index]!;
    const end = points[index + 1]!;
    const segmentLength = Math.hypot(
      end.x - start.x,
      end.y - start.y,
    );

    if (!Number.isFinite(segmentLength) || !(segmentLength > 0)) {
      fail('visible hairline boundary contains a degenerate segment.');
    }

    totalLength += segmentLength;
    weightedY +=
      segmentLength * ((start.y + end.y) / 2);
  }

  if (!Number.isFinite(totalLength) || !(totalLength > EPSILON)) {
    fail('visible hairline boundary path length collapsed.');
  }

  const value = weightedY / totalLength;
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    fail('visible hairline vertical reference is outside [0,1].');
  }

  return value;
}

function sourceReceipt(
  receipt: FR305HairlineModelAdmissionReceipt,
): FR305SourceReceipt {
  return Object.freeze({
    modelId: receipt.modelId,
    exactRevision: receipt.exactRevision,
    targetClass: receipt.targetClass,
    coordinateFrame: receipt.coordinateFrame,
    axisConvention: receipt.axisConvention,
    visibilityHandlingValidated: true as const,
    occlusionHandlingValidated: true as const,
    hiddenHairlineCompletionAllowed: false as const,
    faceOvalSubstitutionAllowed: false as const,
    faceMeshTopVertexSubstitutionAllowed: false as const,
    sourceImageDigestRetainedInternally: true as const,
    sourceImageDigestExposed: false as const,
    sourceObservationRefsRetainedInternally: true as const,
    sourceObservationRefsExposed: false as const,
    traditionalSemanticsExposed: false as const,
  });
}

export function deriveVisibleHairlineVerticalReferenceFR305(
  receipt?: FR305HairlineModelAdmissionReceipt | null,
  observation?: FR305VisibleHairlineObservation | null,
): FR305VisibleHairlineVerticalReference {
  if (receipt == null) {
    const result = Object.freeze({
      schemaVersion:
        'fr305-visible-hairline-vertical-reference-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION,
      authorityState:
        'neutral_visible_hairline_vertical_reference_only' as const,
      status: 'unavailable' as const,
      reason:
        'validated_hairline_model_not_admitted' as const,
      fallbackInvented: false as const,
      crossAnchorSpanReady: false as const,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review' as const,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

    assertVisibleHairlineVerticalReferenceFR305(result);
    return result;
  }

  assertHairlineModelAdmissionReceiptFR305(receipt);

  if (observation == null) {
    const result = Object.freeze({
      schemaVersion:
        'fr305-visible-hairline-vertical-reference-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION,
      authorityState:
        'neutral_visible_hairline_vertical_reference_only' as const,
      status: 'unavailable' as const,
      reason:
        'visible_hairline_observation_unavailable' as const,
      fallbackInvented: false as const,
      crossAnchorSpanReady: false as const,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review' as const,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

    assertVisibleHairlineVerticalReferenceFR305(result);
    return result;
  }

  assertObservation(observation, receipt);

  const result = Object.freeze({
    schemaVersion:
      'fr305-visible-hairline-vertical-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION,
    authorityState:
      'neutral_visible_hairline_vertical_reference_only' as const,
    status: 'available' as const,
    observationRef:
      FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
    value: arcLengthWeightedYCentroid(
      observation.boundaryPolyline,
    ),
    unit: 'normalized_ratio' as const,
    coordinateFrame:
      'canonical_image_normalized_2d' as const,
    axisConvention:
      'x_right_y_down_unit_square' as const,
    selectionRule:
      'arc_length_weighted_y_centroid_of_explicitly_visible_boundary_polyline' as const,
    visibilitySemantics:
      'visible_segments_only_no_hidden_completion' as const,
    failClosedWhenUnavailable: true as const,
    crossAnchorSpanReady: false as const,
    crossAnchorSpanBlocker:
      'common_coordinate_frame_bridge_not_issued' as const,
    bridgeReviewState:
      'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked' as const,
    source: sourceReceipt(receipt),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertVisibleHairlineVerticalReferenceFR305(result);
  return result;
}

export function assertVisibleHairlineVerticalReferenceFR305(
  result: FR305VisibleHairlineVerticalReference,
): void {
  if (
    result.schemaVersion !==
      'fr305-visible-hairline-vertical-reference-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_visible_hairline_vertical_reference_only' ||
    result.crossAnchorSpanReady !== false
  ) {
    fail('vertical-reference identity boundary drift.');
  }

  if (
    result.authorityBoundary.neutralObservationOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'neutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond neutral visible hairline observation.');
  }

  if (result.status === 'available') {
    if (
      result.observationRef !==
        FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.value < 0 ||
      result.value > 1 ||
      result.unit !== 'normalized_ratio' ||
      result.coordinateFrame !==
        'canonical_image_normalized_2d' ||
      result.axisConvention !==
        'x_right_y_down_unit_square' ||
      result.selectionRule !==
        'arc_length_weighted_y_centroid_of_explicitly_visible_boundary_polyline' ||
      result.visibilitySemantics !==
        'visible_segments_only_no_hidden_completion' ||
      result.failClosedWhenUnavailable !== true ||
      result.crossAnchorSpanBlocker !==
        'common_coordinate_frame_bridge_not_issued' ||
      result.bridgeReviewState !==
        'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked' ||
      result.source.hiddenHairlineCompletionAllowed !== false ||
      result.source.faceOvalSubstitutionAllowed !== false ||
      result.source.faceMeshTopVertexSubstitutionAllowed !== false ||
      result.source.sourceImageDigestExposed !== false ||
      result.source.sourceObservationRefsExposed !== false ||
      result.source.traditionalSemanticsExposed !== false
    ) {
      fail('available vertical-reference boundary drift.');
    }
  } else if (
    result.fallbackInvented !== false ||
    result.bridgeReviewState !==
      'neutral_observation_not_available_for_binding_review'
  ) {
    fail('unavailable vertical-reference boundary drift.');
  }
}

export const FR305_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr305-visible-hairline-vertical-reference-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  parentIssue: 1521 as const,
  requiredNeutralVerticalReferenceCapabilityCount: 7 as const,
  handoffReadyNeutralReferenceCapabilityCount: 6 as const,
  remainingNeutralReferenceCapabilityCount: 1 as const,
  traditionalBindingAdmittedCount: 0 as const,
  visibleHairlineReferenceContractDefined: true as const,
  validatedHairlineModelAdmitted: false as const,
  realVisibleHairlineObservationMaterialized: false as const,
  hairlineHardGapPreserved: true as const,
  mixedCoordinateFrameSpanBlocked: true as const,
  commonCoordinateFrameBridgeIssued: false as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'pin_and_empirically_validate_visible_hair_skin_boundary_segmentation_candidate_before_reference_admission' as const,
});

export function assertFR305CurrentGate(): void {
  const gate = FR305_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.requiredNeutralVerticalReferenceCapabilityCount !== 7 ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 6 ||
    gate.remainingNeutralReferenceCapabilityCount !== 1 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.visibleHairlineReferenceContractDefined !== true ||
    gate.validatedHairlineModelAdmitted !== false ||
    gate.realVisibleHairlineObservationMaterialized !== false ||
    gate.hairlineHardGapPreserved !== true ||
    gate.mixedCoordinateFrameSpanBlocked !== true ||
    gate.commonCoordinateFrameBridgeIssued !== false ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR305CurrentGate();
