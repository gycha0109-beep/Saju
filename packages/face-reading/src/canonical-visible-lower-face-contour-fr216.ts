import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import { FR211_FACE_OVAL_TOPOLOGY_VERTICES } from './visible-midface-band-fr211.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR216_CONTRACT_VERSION =
  'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1' as const;

export interface FR216XYPoint {
  readonly x: number;
  readonly y: number;
}

export type FR216UnavailableReason =
  | 'lower_face_contour_contains_fewer_than_three_points'
  | 'lower_face_contour_contains_duplicate_points'
  | 'lower_face_selector_run_is_disconnected';

export type FR216ContourDerivation =
  | Readonly<{
      status: 'available';
      mouthLineY: number;
      points: readonly FR216XYPoint[];
    }>
  | Readonly<{
      status: 'unavailable';
      reason: FR216UnavailableReason;
      fallbackInvented: false;
    }>;

export type FR216VisibleLowerFaceContourResult =
  | Readonly<{
      schemaVersion: 'fr216-visible-lower-face-contour-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR216_CONTRACT_VERSION;
      authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only';
      status: 'available';
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
      coordinateUnit: 'centimeter';
      contourDefinition: 'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y';
      points: readonly FR216XYPoint[];
      pointCount: number;
      source: FR216SourceReceipt;
      authorityBoundary: FR216AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion: 'fr216-visible-lower-face-contour-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR216_CONTRACT_VERSION;
      authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only';
      status: 'unavailable';
      reason: FR216UnavailableReason;
      fallbackInvented: false;
      source: FR216SourceReceipt;
      authorityBoundary: FR216AuthorityBoundary;
    }>;

export interface FR216SourceReceipt {
  readonly fr77ProviderRunRef: string;
  readonly fr77CanonicalAssetDigest: string;
  readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
  readonly sameProviderRunVerified: true;
  readonly sameCanonicalAssetDigestVerified: true;
  readonly faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology';
  readonly faceOvalTopologyReleaseExactForInstalledPackage: false;
  readonly providerIndicesExposedInOutput: false;
  readonly interpolationApplied: false;
  readonly smoothingApplied: false;
  readonly normalizationApplied: false;
}

export interface FR216AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly mandibularBoneBoundaryIssued: false;
  readonly anatomicalChinBoundaryIssued: false;
  readonly gonionAnatomicalMappingIssued: false;
  readonly jawBoneWidthClaimIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const AUTHORITY_BOUNDARY: FR216AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  mandibularBoneBoundaryIssued: false as const,
  anatomicalChinBoundaryIssued: false as const,
  gonionAnatomicalMappingIssued: false as const,
  jawBoneWidthClaimIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-216 ${message}`);
}

function assertPoints(points: readonly FR216XYPoint[], label: string, minimum: number): void {
  if (points.length < minimum) fail(`${label} requires at least ${minimum} points.`);
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`${label}[${index}] must contain finite x/y.`);
    }
  });
}

function pointKey(point: FR216XYPoint): string {
  return `${point.x}:${point.y}`;
}

export function deriveCanonicalVisibleLowerFaceContourFR216(input: {
  readonly orderedFaceOvalPoints: readonly FR216XYPoint[];
  readonly lipsUnionPoints: readonly FR216XYPoint[];
}): FR216ContourDerivation {
  assertPoints(input.orderedFaceOvalPoints, 'orderedFaceOvalPoints', 4);
  assertPoints(input.lipsUnionPoints, 'lipsUnionPoints', 4);

  const mouthLineY =
    input.lipsUnionPoints.reduce((sum, point) => sum + point.y, 0) /
    input.lipsUnionPoints.length;

  const selected = input.orderedFaceOvalPoints
    .map((point, index) => ({ point, index }))
    .filter(({ point }) => point.y <= mouthLineY);

  if (selected.length < 3) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'lower_face_contour_contains_fewer_than_three_points' as const,
      fallbackInvented: false as const,
    });
  }

  const keys = selected.map(({ point }) => pointKey(point));
  if (new Set(keys).size !== keys.length) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'lower_face_contour_contains_duplicate_points' as const,
      fallbackInvented: false as const,
    });
  }

  for (let index = 1; index < selected.length; index += 1) {
    if (selected[index]!.index !== selected[index - 1]!.index + 1) {
      return Object.freeze({
        status: 'unavailable' as const,
        reason: 'lower_face_selector_run_is_disconnected' as const,
        fallbackInvented: false as const,
      });
    }
  }

  return Object.freeze({
    status: 'available' as const,
    mouthLineY,
    points: Object.freeze(selected.map(({ point }) => Object.freeze({ x: point.x, y: point.y }))),
  });
}

function assertFR207LowerFaceBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const lower = inventory.entries.find((entry) => entry.regionKey === 'chin_lower_face');
  if (
    lower?.mayProceedWithoutNewAnatomicalResearch !== true ||
    lower.smallestMissingObservablePrimitives.includes('canonical_product_2d_chin_contour_projection') !== true ||
    lower.currentlyUnavailableConstructs.includes('image_only_mandibular_bone_boundary') !== true ||
    lower.prohibitedShortcuts.includes('provider_face_oval_to_reviewed_chin_contour') !== true ||
    lower.prohibitedShortcuts.includes('soft_tissue_contour_to_mandibular_bone_boundary') !== true
  ) {
    fail('FR207 chin/lower-face projection boundary drift.');
  }
}

function sourceReceipt(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR216SourceReceipt {
  return Object.freeze({
    fr77ProviderRunRef: fullFace.provider.providerRunRef,
    fr77CanonicalAssetDigest: fullFace.provider.canonicalAssetDigest,
    fr79ProjectionRuleRef: lips.projectionRule.projectionRuleRef,
    sameProviderRunVerified: true as const,
    sameCanonicalAssetDigestVerified: true as const,
    faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology' as const,
    faceOvalTopologyReleaseExactForInstalledPackage: false as const,
    providerIndicesExposedInOutput: false as const,
    interpolationApplied: false as const,
    smoothingApplied: false as const,
    normalizationApplied: false as const,
  });
}

export function computeCanonicalVisibleLowerFaceContourFR216(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR216VisibleLowerFaceContourResult {
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
    lips.projectionRule.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
    lips.projectionRule.recenteringApplied !== false ||
    lips.projectionRule.rescalingApplied !== false
  ) {
    fail('requires the exact FR79 canonical-metric XY preserving lips projection boundary.');
  }
  if (
    fullFace.provider.providerRunRef !== lips.provenance.providerRunRef ||
    fullFace.provider.canonicalAssetDigest !== lips.provenance.canonicalAssetDigest
  ) {
    fail('FR77 and FR79 must share providerRunRef and canonicalAssetDigest.');
  }
  if (FR211_FACE_OVAL_TOPOLOGY_VERTICES.length !== 36) {
    fail('FR211 FACE_OVAL selector must remain exactly 36 vertices.');
  }

  const orderedFaceOvalPoints = FR211_FACE_OVAL_TOPOLOGY_VERTICES.map((vertex) => {
    const point = fullFace.metricLandmarks[vertex];
    if (point === undefined) fail(`FR77 geometry missing FACE_OVAL vertex ${vertex}.`);
    if (![point.x, point.y, point.z].every(Number.isFinite)) {
      fail(`FR77 FACE_OVAL vertex ${vertex} must contain finite x/y/z.`);
    }
    return Object.freeze({ x: point.x, y: point.y });
  });
  const lipsUnionPoints = lips.contours.flatMap((contour) =>
    contour.geometry.boundary.map((point) => Object.freeze({ x: point.x, y: point.y })),
  );

  const derivation = deriveCanonicalVisibleLowerFaceContourFR216({
    orderedFaceOvalPoints,
    lipsUnionPoints,
  });
  const source = sourceReceipt(fullFace, lips);

  if (derivation.status === 'unavailable') {
    return Object.freeze({
      schemaVersion: 'fr216-visible-lower-face-contour-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR216_CONTRACT_VERSION,
      authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only' as const,
      status: 'unavailable' as const,
      reason: derivation.reason,
      fallbackInvented: false as const,
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const result: FR216VisibleLowerFaceContourResult = Object.freeze({
    schemaVersion: 'fr216-visible-lower-face-contour-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR216_CONTRACT_VERSION,
    authorityState: 'canonical_visible_soft_tissue_lower_face_contour_only' as const,
    status: 'available' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
    coordinateUnit: 'centimeter' as const,
    contourDefinition: 'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y' as const,
    points: derivation.points,
    pointCount: derivation.points.length,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertCanonicalVisibleLowerFaceContourFR216(result);
  return result;
}

export function assertCanonicalVisibleLowerFaceContourFR216(
  result: FR216VisibleLowerFaceContourResult,
): void {
  if (
    result.schemaVersion !== 'fr216-visible-lower-face-contour-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR216_CONTRACT_VERSION ||
    result.authorityState !== 'canonical_visible_soft_tissue_lower_face_contour_only' ||
    result.source.sameProviderRunVerified !== true ||
    result.source.sameCanonicalAssetDigestVerified !== true ||
    result.source.providerIndicesExposedInOutput !== false ||
    result.source.interpolationApplied !== false ||
    result.source.smoothingApplied !== false ||
    result.source.normalizationApplied !== false
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
      result.coordinateFrame !== 'canonical_aligned_right_handed_metric_xy' ||
      result.coordinateUnit !== 'centimeter' ||
      result.contourDefinition !== 'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y' ||
      result.pointCount !== result.points.length ||
      result.pointCount < 3 ||
      result.points.some((point) => !Number.isFinite(point.x) || !Number.isFinite(point.y)) ||
      new Set(result.points.map(pointKey)).size !== result.points.length
    ) {
      fail('available visible lower-face contour boundary drift.');
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable visible lower-face contour invented a fallback.');
  }
}
