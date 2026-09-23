import {
  assertCanonicalVisibleLowerFaceContourFR216,
  FR216_CONTRACT_VERSION,
  type FR216UnavailableReason,
  type FR216VisibleLowerFaceContourResult,
} from './canonical-visible-lower-face-contour-fr216.js';
import {
  THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35,
} from './three-divisions-neutral-surface-extension-fr35.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR260_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr260-visible-lower-face-inferior-vertical-reference.md' as const;
export const FR260_REFERENCE_REF =
  'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0' as const;
export const FR260_NEXT_FRONTIER =
  'evaluate_fr260_repeatability_and_coordinate_bridge_requirements_before_any_three_divisions_dependency_admission' as const;

export interface FR260AuthorityBoundary {
  readonly neutralObservableOnly: true;
  readonly anatomicalChinIdentityIssued: false;
  readonly mandibularBoundaryIssued: false;
  readonly traditionalDigeEquivalenceIssued: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly fr35SlotReplacementIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly F1ClaimIssued: false;
  readonly F6ClaimIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export interface FR260SourceReceipt {
  readonly sourceSchemaVersion: 'fr216-visible-lower-face-contour-v1';
  readonly sourceArtifactVersion: '0.1.0';
  readonly sourceContractVersion: typeof FR216_CONTRACT_VERSION;
  readonly sourceAuthorityState: 'canonical_visible_soft_tissue_lower_face_contour_only';
  readonly fr77ProviderRunRef: string;
  readonly fr77CanonicalAssetDigest: string;
  readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
  readonly sourceProviderIndicesExposed: false;
  readonly sourceInterpolationApplied: false;
  readonly sourceSmoothingApplied: false;
  readonly sourceNormalizationApplied: false;
}

export type VisibleLowerFaceInferiorVerticalReferenceFR260 =
  | Readonly<{
      schemaVersion: 'fr260-visible-lower-face-inferior-vertical-reference-v1';
      artifactVersion: '0.1.0';
      contractId: 'visible_lower_face_inferior_vertical_reference_fr260';
      watchtowerTrack: 'face-research';
      authorityState: 'product_neutral_visible_lower_face_inferior_reference_only';
      status: 'available';
      referenceRef: typeof FR260_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
      axisConvention:
        'canonical_metric_xy_inherited_from_fr216_with_upstream_fr79_x_right_y_up_witness';
      selectionRule: 'minimum_y_across_available_fr216_visible_lower_face_contour';
      contributingContourPointCount: number;
      source: FR260SourceReceipt;
      fr35Compatibility: {
        readonly targetSurfaceSlot: 'neutral.face.chin_inferior_contour';
        readonly targetCoordinateFrame: 'canonical_image_normalized_2d';
        readonly sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_xy';
        readonly exactCoordinateFrameCompatibilityEstablished: false;
        readonly directSlotReplacementAuthorized: false;
      };
      authorityBoundary: FR260AuthorityBoundary;
      researchNoteRef: typeof FR260_RESEARCH_NOTE_REF;
      nextFrontier: typeof FR260_NEXT_FRONTIER;
    }>
  | Readonly<{
      schemaVersion: 'fr260-visible-lower-face-inferior-vertical-reference-v1';
      artifactVersion: '0.1.0';
      contractId: 'visible_lower_face_inferior_vertical_reference_fr260';
      watchtowerTrack: 'face-research';
      authorityState: 'product_neutral_visible_lower_face_inferior_reference_only';
      status: 'unavailable';
      reason: 'fr216_visible_lower_face_contour_unavailable';
      sourceUnavailableReason: FR216UnavailableReason;
      fallbackInvented: false;
      source: FR260SourceReceipt;
      authorityBoundary: FR260AuthorityBoundary;
      researchNoteRef: typeof FR260_RESEARCH_NOTE_REF;
      nextFrontier: typeof FR260_NEXT_FRONTIER;
    }>;

const AUTHORITY_BOUNDARY: FR260AuthorityBoundary = Object.freeze({
  neutralObservableOnly: true as const,
  anatomicalChinIdentityIssued: false as const,
  mandibularBoundaryIssued: false as const,
  traditionalDigeEquivalenceIssued: false as const,
  threeDivisionsBoundaryIssued: false as const,
  fr35SlotReplacementIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  classifierIssued: false as const,
  F1ClaimIssued: false as const,
  F6ClaimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-260 ${message}`);
}

function sourceReceipt(source: FR216VisibleLowerFaceContourResult): FR260SourceReceipt {
  return Object.freeze({
    sourceSchemaVersion: source.schemaVersion,
    sourceArtifactVersion: source.artifactVersion,
    sourceContractVersion: source.contractVersion,
    sourceAuthorityState: source.authorityState,
    fr77ProviderRunRef: source.source.fr77ProviderRunRef,
    fr77CanonicalAssetDigest: source.source.fr77CanonicalAssetDigest,
    fr79ProjectionRuleRef: source.source.fr79ProjectionRuleRef,
    sourceProviderIndicesExposed: source.source.providerIndicesExposedInOutput,
    sourceInterpolationApplied: source.source.interpolationApplied,
    sourceSmoothingApplied: source.source.smoothingApplied,
    sourceNormalizationApplied: source.source.normalizationApplied,
  });
}

function assertFR35FrameBoundary(): void {
  const surface = THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.find(
    (entry) => entry.consumerSlot === 'neutral.face.chin_inferior_contour',
  );
  if (
    surface === undefined ||
    surface.coordinateFrame !== 'canonical_image_normalized_2d' ||
    surface.providerBindingState !== 'no_verified_binding' ||
    surface.traditionalSemanticOutputAllowed !== false
  ) {
    fail('FR35 chin-inferior surface boundary drift.');
  }
}

export function deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
  source: FR216VisibleLowerFaceContourResult,
): VisibleLowerFaceInferiorVerticalReferenceFR260 {
  assertCanonicalVisibleLowerFaceContourFR216(source);
  assertFR35FrameBoundary();
  const receipt = sourceReceipt(source);

  if (source.status === 'unavailable') {
    const result = Object.freeze({
      schemaVersion: 'fr260-visible-lower-face-inferior-vertical-reference-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractId: 'visible_lower_face_inferior_vertical_reference_fr260' as const,
      watchtowerTrack: 'face-research' as const,
      authorityState: 'product_neutral_visible_lower_face_inferior_reference_only' as const,
      status: 'unavailable' as const,
      reason: 'fr216_visible_lower_face_contour_unavailable' as const,
      sourceUnavailableReason: source.reason,
      fallbackInvented: false as const,
      source: receipt,
      authorityBoundary: AUTHORITY_BOUNDARY,
      researchNoteRef: FR260_RESEARCH_NOTE_REF,
      nextFrontier: FR260_NEXT_FRONTIER,
    });
    assertVisibleLowerFaceInferiorVerticalReferenceFR260(result);
    return result;
  }

  if (
    source.coordinateFrame !== 'canonical_aligned_right_handed_metric_xy' ||
    source.coordinateUnit !== 'centimeter' ||
    source.points.length < 3
  ) {
    fail('available FR216 source coordinate boundary drift.');
  }

  const value = Math.min(...source.points.map((point) => point.y));
  if (!Number.isFinite(value)) fail('inferior vertical reference must be finite.');

  const result = Object.freeze({
    schemaVersion: 'fr260-visible-lower-face-inferior-vertical-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractId: 'visible_lower_face_inferior_vertical_reference_fr260' as const,
    watchtowerTrack: 'face-research' as const,
    authorityState: 'product_neutral_visible_lower_face_inferior_reference_only' as const,
    status: 'available' as const,
    referenceRef: FR260_REFERENCE_REF,
    value,
    unit: 'centimeter' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
    axisConvention:
      'canonical_metric_xy_inherited_from_fr216_with_upstream_fr79_x_right_y_up_witness' as const,
    selectionRule: 'minimum_y_across_available_fr216_visible_lower_face_contour' as const,
    contributingContourPointCount: source.pointCount,
    source: receipt,
    fr35Compatibility: Object.freeze({
      targetSurfaceSlot: 'neutral.face.chin_inferior_contour' as const,
      targetCoordinateFrame: 'canonical_image_normalized_2d' as const,
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      exactCoordinateFrameCompatibilityEstablished: false as const,
      directSlotReplacementAuthorized: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
    researchNoteRef: FR260_RESEARCH_NOTE_REF,
    nextFrontier: FR260_NEXT_FRONTIER,
  });
  assertVisibleLowerFaceInferiorVerticalReferenceFR260(result);
  return result;
}

export function assertVisibleLowerFaceInferiorVerticalReferenceFR260(
  result: VisibleLowerFaceInferiorVerticalReferenceFR260,
): void {
  if (
    result.schemaVersion !== 'fr260-visible-lower-face-inferior-vertical-reference-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractId !== 'visible_lower_face_inferior_vertical_reference_fr260' ||
    result.watchtowerTrack !== 'face-research' ||
    result.authorityState !== 'product_neutral_visible_lower_face_inferior_reference_only' ||
    result.source.sourceContractVersion !== FR216_CONTRACT_VERSION ||
    result.source.sourceAuthorityState !== 'canonical_visible_soft_tissue_lower_face_contour_only' ||
    result.source.fr79ProjectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    result.source.sourceProviderIndicesExposed !== false ||
    result.source.sourceInterpolationApplied !== false ||
    result.source.sourceSmoothingApplied !== false ||
    result.source.sourceNormalizationApplied !== false
  ) {
    fail('identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.neutralObservableOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'neutralObservableOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond product-neutral visible lower-face observation.');
  }

  if (result.status === 'available') {
    if (
      result.referenceRef !== FR260_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.unit !== 'centimeter' ||
      result.coordinateFrame !== 'canonical_aligned_right_handed_metric_xy' ||
      result.axisConvention !==
        'canonical_metric_xy_inherited_from_fr216_with_upstream_fr79_x_right_y_up_witness' ||
      result.selectionRule !==
        'minimum_y_across_available_fr216_visible_lower_face_contour' ||
      !Number.isInteger(result.contributingContourPointCount) ||
      result.contributingContourPointCount < 3 ||
      result.fr35Compatibility.targetSurfaceSlot !== 'neutral.face.chin_inferior_contour' ||
      result.fr35Compatibility.targetCoordinateFrame !== 'canonical_image_normalized_2d' ||
      result.fr35Compatibility.sourceCoordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      result.fr35Compatibility.exactCoordinateFrameCompatibilityEstablished !== false ||
      result.fr35Compatibility.directSlotReplacementAuthorized !== false
    ) {
      fail('available reference boundary drift.');
    }
  } else if (
    result.reason !== 'fr216_visible_lower_face_contour_unavailable' ||
    result.fallbackInvented !== false
  ) {
    fail('unavailable reference invented a fallback.');
  }

  if (
    result.researchNoteRef !== FR260_RESEARCH_NOTE_REF ||
    result.nextFrontier !== FR260_NEXT_FRONTIER
  ) {
    fail('research continuation boundary drift.');
  }
}
