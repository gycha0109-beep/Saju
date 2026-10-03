import {
  FR260_REFERENCE_REF,
  assertVisibleLowerFaceInferiorVerticalReferenceFR260,
  type VisibleLowerFaceInferiorVerticalReferenceFR260,
} from './visible-lower-face-inferior-vertical-reference-fr260.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR301_LOWER_FACE_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION =
  'FR301-LOWER-FACE-VERTICAL-REFERENCE-HANDOFF-v1' as const;

export interface FR301SourceReceipt {
  readonly sourceContractId:
    'visible_lower_face_inferior_vertical_reference_fr260';
  readonly sourceReferenceRef: typeof FR260_REFERENCE_REF;
  readonly sourceStatus: 'available' | 'unavailable';
  readonly sourceProvenanceRetainedInternally: true;
  readonly sourceProviderRunRefExposed: false;
  readonly sourceCanonicalAssetDigestExposed: false;
  readonly sourceProviderIndicesExposed: false;
  readonly sourceTraditionalSemanticsExposed: false;
}

export interface FR301AuthorityBoundary {
  readonly neutralObservationOnly: true;
  readonly anatomicalChinIdentityIssued: false;
  readonly traditionalDigeEquivalenceIssued: false;
  readonly traditionalBindingIssued: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly fr35DirectReplacementIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR301LowerFaceVerticalReferenceHandoff =
  | Readonly<{
      schemaVersion:
        'fr301-lower-face-vertical-reference-handoff-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR301_LOWER_FACE_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION;
      authorityState:
        'neutral_lower_face_inferior_reference_handoff_only';
      status: 'available';
      observationRef: typeof FR260_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy';
      selectionRule:
        'minimum_y_across_available_fr216_visible_lower_face_contour';
      visibilitySemantics:
        'available_only_when_governed_fr216_visible_lower_face_contour_is_available';
      failClosedWhenUnavailable: true;
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review';
      source: FR301SourceReceipt;
      authorityBoundary: FR301AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr301-lower-face-vertical-reference-handoff-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR301_LOWER_FACE_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION;
      authorityState:
        'neutral_lower_face_inferior_reference_handoff_only';
      status: 'unavailable';
      reason: 'fr260_neutral_reference_unavailable';
      sourceUnavailableReason: string;
      fallbackInvented: false;
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review';
      source: FR301SourceReceipt;
      authorityBoundary: FR301AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR301AuthorityBoundary =
  Object.freeze({
    neutralObservationOnly: true as const,
    anatomicalChinIdentityIssued: false as const,
    traditionalDigeEquivalenceIssued: false as const,
    traditionalBindingIssued: false as const,
    threeDivisionsBoundaryIssued: false as const,
    threeDivisionsSpanIssued: false as const,
    fr35DirectReplacementIssued: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    classifierIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-301 ${message}`,
  );
}

function sourceReceipt(
  source: VisibleLowerFaceInferiorVerticalReferenceFR260,
): FR301SourceReceipt {
  return Object.freeze({
    sourceContractId:
      'visible_lower_face_inferior_vertical_reference_fr260' as const,
    sourceReferenceRef: FR260_REFERENCE_REF,
    sourceStatus: source.status,
    sourceProvenanceRetainedInternally: true as const,
    sourceProviderRunRefExposed: false as const,
    sourceCanonicalAssetDigestExposed: false as const,
    sourceProviderIndicesExposed: false as const,
    sourceTraditionalSemanticsExposed: false as const,
  });
}

export function createLowerFaceVerticalReferenceHandoffFR301(
  source: VisibleLowerFaceInferiorVerticalReferenceFR260,
): FR301LowerFaceVerticalReferenceHandoff {
  assertVisibleLowerFaceInferiorVerticalReferenceFR260(source);
  const receipt = sourceReceipt(source);

  if (source.status === 'unavailable') {
    const result = Object.freeze({
      schemaVersion:
        'fr301-lower-face-vertical-reference-handoff-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR301_LOWER_FACE_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION,
      authorityState:
        'neutral_lower_face_inferior_reference_handoff_only' as const,
      status: 'unavailable' as const,
      reason: 'fr260_neutral_reference_unavailable' as const,
      sourceUnavailableReason: source.sourceUnavailableReason,
      fallbackInvented: false as const,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review' as const,
      source: receipt,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

    assertLowerFaceVerticalReferenceHandoffFR301(result);
    return result;
  }

  const result = Object.freeze({
    schemaVersion:
      'fr301-lower-face-vertical-reference-handoff-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR301_LOWER_FACE_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION,
    authorityState:
      'neutral_lower_face_inferior_reference_handoff_only' as const,
    status: 'available' as const,
    observationRef: source.referenceRef,
    value: source.value,
    unit: source.unit,
    coordinateFrame: source.coordinateFrame,
    selectionRule: source.selectionRule,
    visibilitySemantics:
      'available_only_when_governed_fr216_visible_lower_face_contour_is_available' as const,
    failClosedWhenUnavailable: true as const,
    bridgeReviewState:
      'neutral_observation_ready_for_explicit_binding_review' as const,
    source: receipt,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertLowerFaceVerticalReferenceHandoffFR301(result);
  return result;
}

export function assertLowerFaceVerticalReferenceHandoffFR301(
  result: FR301LowerFaceVerticalReferenceHandoff,
): void {
  if (
    result.schemaVersion !==
      'fr301-lower-face-vertical-reference-handoff-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR301_LOWER_FACE_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_lower_face_inferior_reference_handoff_only' ||
    result.source.sourceContractId !==
      'visible_lower_face_inferior_vertical_reference_fr260' ||
    result.source.sourceReferenceRef !== FR260_REFERENCE_REF ||
    result.source.sourceStatus !== result.status ||
    result.source.sourceProvenanceRetainedInternally !== true ||
    result.source.sourceProviderRunRefExposed !== false ||
    result.source.sourceCanonicalAssetDigestExposed !== false ||
    result.source.sourceProviderIndicesExposed !== false ||
    result.source.sourceTraditionalSemanticsExposed !== false
  ) {
    fail('identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.neutralObservationOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'neutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond neutral observation handoff.');
  }

  if (result.status === 'available') {
    if (
      result.observationRef !== FR260_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.unit !== 'centimeter' ||
      result.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      result.selectionRule !==
        'minimum_y_across_available_fr216_visible_lower_face_contour' ||
      result.visibilitySemantics !==
        'available_only_when_governed_fr216_visible_lower_face_contour_is_available' ||
      result.failClosedWhenUnavailable !== true ||
      result.bridgeReviewState !==
        'neutral_observation_ready_for_explicit_binding_review'
    ) {
      fail('available handoff boundary drift.');
    }
  } else if (
    result.reason !== 'fr260_neutral_reference_unavailable' ||
    !result.sourceUnavailableReason.trim() ||
    result.fallbackInvented !== false ||
    result.bridgeReviewState !==
      'neutral_observation_not_available_for_binding_review'
  ) {
    fail('unavailable handoff invented or widened a fallback.');
  }
}

export const FR301_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr301-lower-face-vertical-reference-handoff-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  parentIssue: 1521 as const,
  requiredNeutralVerticalReferenceCapabilityCount: 7 as const,
  handoffReadyNeutralReferenceCapabilityCount: 1 as const,
  remainingNeutralReferenceCapabilityCount: 6 as const,
  traditionalBindingAdmittedCount: 0 as const,
  lowerFaceInferiorReferenceCapabilityReady: true as const,
  runtimeAvailabilityConditional: true as const,
  hairlineHardGapPreserved: true as const,
  sourceReferenceRef: FR260_REFERENCE_REF,
  sourceCoordinateFrame:
    'canonical_aligned_right_handed_metric_xy' as const,
  anatomicalChinIdentityIssued: false as const,
  traditionalDigeEquivalenceIssued: false as const,
  threeDivisionsBoundaryIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'continue_remaining_six_neutral_vertical_reference_capabilities_without_traditional_binding' as const,
});

export function assertFR301CurrentGate(): void {
  const gate = FR301_CURRENT_GATE;

  if (
    gate.parentIssue !== 1521 ||
    gate.requiredNeutralVerticalReferenceCapabilityCount !== 7 ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 1 ||
    gate.remainingNeutralReferenceCapabilityCount !== 6 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.lowerFaceInferiorReferenceCapabilityReady !== true ||
    gate.runtimeAvailabilityConditional !== true ||
    gate.hairlineHardGapPreserved !== true ||
    gate.sourceReferenceRef !== FR260_REFERENCE_REF ||
    gate.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    gate.anatomicalChinIdentityIssued !== false ||
    gate.traditionalDigeEquivalenceIssued !== false ||
    gate.threeDivisionsBoundaryIssued !== false ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR301CurrentGate();
