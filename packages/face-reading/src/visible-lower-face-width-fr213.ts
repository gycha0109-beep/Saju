import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  computeVisibleLowerFaceWidthRatioFR208,
  type NeutralObservableMetricFR208V1,
  type VisibleWidthRatioInputFR208V1,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import { FR211_FACE_OVAL_TOPOLOGY_VERTICES } from './visible-midface-band-fr211.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR213_CONTRACT_VERSION =
  'FR213-VISIBLE-LOWER-FACE-WIDTH-v1' as const;

const EPSILON = 1e-12;

export interface FR213XYPoint {
  readonly x: number;
  readonly y: number;
}

export type FR213LowerFaceUnavailableReason =
  | 'lower_face_contour_contains_fewer_than_two_points'
  | 'lower_face_horizontal_envelope_collapsed';

export type FR213LowerFaceDerivation =
  | Readonly<{
      status: 'available';
      mouthLineY: number;
      lowerFacePointCount: number;
      ratioInput: VisibleWidthRatioInputFR208V1;
    }>
  | Readonly<{
      status: 'unavailable';
      reason: FR213LowerFaceUnavailableReason;
      fallbackInvented: false;
    }>;

export type FR213VisibleLowerFaceWidthResult =
  | Readonly<{
      schemaVersion: 'fr213-visible-lower-face-width-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR213_CONTRACT_VERSION;
      authorityState: 'observable_lower_face_contour_candidate_only';
      status: 'available';
      metric: NeutralObservableMetricFR208V1;
      contourDefinition: 'face_oval_points_at_or_below_unordered_lips_union_mean_y';
      lowerFacePointCount: number;
      source: FR213SourceReceipt;
      authorityBoundary: FR213AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion: 'fr213-visible-lower-face-width-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR213_CONTRACT_VERSION;
      authorityState: 'observable_lower_face_contour_candidate_only';
      status: 'unavailable';
      reason: FR213LowerFaceUnavailableReason;
      fallbackInvented: false;
      source: FR213SourceReceipt;
      authorityBoundary: FR213AuthorityBoundary;
    }>;

export interface FR213SourceReceipt {
  readonly fr77ProviderRunRef: string;
  readonly fr77CanonicalAssetDigest: string;
  readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
  readonly sameProviderRunVerified: true;
  readonly sameCanonicalAssetDigestVerified: true;
  readonly faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology';
  readonly providerIndicesExposedInOutput: false;
}

export interface FR213AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly mandibularBoneBoundaryIssued: false;
  readonly gonionAnatomicalMappingIssued: false;
  readonly jawBoneWidthClaimIssued: false;
  readonly skeletalCalibrationIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const AUTHORITY_BOUNDARY: FR213AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  mandibularBoneBoundaryIssued: false as const,
  gonionAnatomicalMappingIssued: false as const,
  jawBoneWidthClaimIssued: false as const,
  skeletalCalibrationIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-213 ${message}`);
}

function assertPoints(points: readonly FR213XYPoint[], label: string, minimum: number): void {
  if (points.length < minimum) fail(`${label} requires at least ${minimum} points.`);
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`${label}[${index}] must contain finite x/y coordinates.`);
    }
  });
}

function envelopeX(points: readonly FR213XYPoint[]): Readonly<{ minX: number; maxX: number }> {
  const xs = points.map((point) => point.x);
  return Object.freeze({ minX: Math.min(...xs), maxX: Math.max(...xs) });
}

export function deriveVisibleLowerFaceWidthInputFR213(input: {
  readonly faceOvalPoints: readonly FR213XYPoint[];
  readonly lipsUnionPoints: readonly FR213XYPoint[];
  readonly sourceObservationRefs: readonly string[];
}): FR213LowerFaceDerivation {
  assertPoints(input.faceOvalPoints, 'faceOvalPoints', 4);
  assertPoints(input.lipsUnionPoints, 'lipsUnionPoints', 4);

  const refs = input.sourceObservationRefs.map((ref) => ref.trim());
  if (refs.length === 0 || refs.some((ref) => ref.length === 0) || new Set(refs).size !== refs.length) {
    fail('sourceObservationRefs must be non-empty and unique.');
  }

  const mouthLineY =
    input.lipsUnionPoints.reduce((sum, point) => sum + point.y, 0) / input.lipsUnionPoints.length;
  const lowerFacePoints = input.faceOvalPoints.filter((point) => point.y <= mouthLineY);
  if (lowerFacePoints.length < 2) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'lower_face_contour_contains_fewer_than_two_points' as const,
      fallbackInvented: false as const,
    });
  }

  const full = envelopeX(input.faceOvalPoints);
  if (!(full.maxX - full.minX > EPSILON)) {
    fail('full visible face oval horizontal envelope must be positive.');
  }
  const lower = envelopeX(lowerFacePoints);
  if (!(lower.maxX - lower.minX > EPSILON)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'lower_face_horizontal_envelope_collapsed' as const,
      fallbackInvented: false as const,
    });
  }

  return Object.freeze({
    status: 'available' as const,
    mouthLineY,
    lowerFacePointCount: lowerFacePoints.length,
    ratioInput: Object.freeze({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      regionLeft: Object.freeze({ x: lower.minX, y: mouthLineY }),
      regionRight: Object.freeze({ x: lower.maxX, y: mouthLineY }),
      visibleFaceLeft: Object.freeze({ x: full.minX, y: mouthLineY }),
      visibleFaceRight: Object.freeze({ x: full.maxX, y: mouthLineY }),
      sourceObservationRefs: Object.freeze([...refs]),
    }),
  });
}

function assertFR207LowerFaceBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const lower = inventory.entries.find((entry) => entry.regionKey === 'chin_lower_face');
  if (
    lower?.mayProceedWithoutNewAnatomicalResearch !== true ||
    lower.smallestMissingObservablePrimitives.includes('visible_lower_face_width_ratio') !== true ||
    lower.currentlyUnavailableConstructs.includes('image_only_mandibular_bone_boundary') !== true
  ) {
    fail('FR207 chin/lower-face reuse boundary drift.');
  }
}

function sourceReceipt(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR213SourceReceipt {
  return Object.freeze({
    fr77ProviderRunRef: fullFace.provider.providerRunRef,
    fr77CanonicalAssetDigest: fullFace.provider.canonicalAssetDigest,
    fr79ProjectionRuleRef: lips.projectionRule.projectionRuleRef,
    sameProviderRunVerified: true as const,
    sameCanonicalAssetDigestVerified: true as const,
    faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology' as const,
    providerIndicesExposedInOutput: false as const,
  });
}

export function computeVisibleLowerFaceWidthFR213(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR213VisibleLowerFaceWidthResult {
  assertFR207LowerFaceBoundary();
  assertIssuedGovernedMetricGeometryFR77(fullFace);
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);

  if (
    fullFace.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    fullFace.unit !== 'centimeter' ||
    fullFace.metricLandmarks.length !== 468 ||
    fullFace.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
    fullFace.authorityBoundary.productionNeutralObservationIssued !== false ||
    fullFace.authorityBoundary.traditionalSemanticAuthority !== false
  ) {
    fail('requires the exact FR77 governed metric-geometry boundary.');
  }
  if (
    lips.coordinateFrame !== 'pose_normalized_face_2d' ||
    lips.coordinateUnit !== 'centimeter' ||
    lips.poseCompensated !== true ||
    lips.projectionRule.projectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    lips.projectionRule.formula !== 'x2d=x3d;y2d=y3d' ||
    lips.projectionRule.axisConvention !== 'retain_canonical_metric_x_right_y_up'
  ) {
    fail('requires the exact FR79 canonical-metric XY preserving lips boundary.');
  }
  if (
    fullFace.provider.providerRunRef !== lips.provenance.providerRunRef ||
    fullFace.provider.canonicalAssetDigest !== lips.provenance.canonicalAssetDigest
  ) {
    fail('FR77 and FR79 must share providerRunRef and canonicalAssetDigest.');
  }

  const toXY = (index: number): FR213XYPoint => {
    const point = fullFace.metricLandmarks[index];
    if (point === undefined) fail(`FR77 geometry missing FACE_OVAL vertex ${index}.`);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
      fail(`FR77 FACE_OVAL vertex ${index} must contain finite x/y/z.`);
    }
    return Object.freeze({ x: point.x, y: point.y });
  };

  const faceOvalPoints = FR211_FACE_OVAL_TOPOLOGY_VERTICES.map(toXY);
  const lipsUnionPoints = lips.contours.flatMap((contour) =>
    contour.geometry.boundary.map((point) => Object.freeze({ x: point.x, y: point.y })),
  );

  const derivation = deriveVisibleLowerFaceWidthInputFR213({
    faceOvalPoints,
    lipsUnionPoints,
    sourceObservationRefs: [
      'fr77:canonical_aligned_metric_geometry',
      'fr79:unordered_lips_contour_union',
      'fr211:face_oval_visible_contour_selector',
      'fr213:face_oval_points_at_or_below_visible_mouth_line',
    ],
  });
  const source = sourceReceipt(fullFace, lips);

  if (derivation.status === 'unavailable') {
    return Object.freeze({
      schemaVersion: 'fr213-visible-lower-face-width-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR213_CONTRACT_VERSION,
      authorityState: 'observable_lower_face_contour_candidate_only' as const,
      status: 'unavailable' as const,
      reason: derivation.reason,
      fallbackInvented: false as const,
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const computed = computeVisibleLowerFaceWidthRatioFR208(derivation.ratioInput);
  return Object.freeze({
    schemaVersion: 'fr213-visible-lower-face-width-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR213_CONTRACT_VERSION,
    authorityState: 'observable_lower_face_contour_candidate_only' as const,
    status: 'available' as const,
    metric: computed.metric,
    contourDefinition: 'face_oval_points_at_or_below_unordered_lips_union_mean_y' as const,
    lowerFacePointCount: derivation.lowerFacePointCount,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

export function assertVisibleLowerFaceWidthFR213(
  result: FR213VisibleLowerFaceWidthResult,
): void {
  if (
    result.schemaVersion !== 'fr213-visible-lower-face-width-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR213_CONTRACT_VERSION ||
    result.authorityState !== 'observable_lower_face_contour_candidate_only' ||
    result.source.sameProviderRunVerified !== true ||
    result.source.sameCanonicalAssetDigestVerified !== true ||
    result.source.providerIndicesExposedInOutput !== false
  ) {
    fail('result identity/source boundary drift.');
  }
  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible lower-face morphology.');
  }
  if (result.status === 'available') {
    if (
      result.metric.metricRef !== 'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0' ||
      result.metric.unit !== 'ratio' ||
      !Number.isFinite(result.metric.value) ||
      result.metric.classificationApplied !== false ||
      result.metric.thresholdApplied !== false ||
      result.metric.calibrationApplied !== false ||
      result.metric.traditionalBindingApplied !== false ||
      result.metric.anatomicalInterpretationAllowed !== false ||
      result.lowerFacePointCount < 2
    ) {
      fail('available lower-face metric boundary drift.');
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable lower-face result invented a fallback.');
  }
}
