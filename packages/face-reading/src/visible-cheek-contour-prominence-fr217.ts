import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import { FR211_FACE_OVAL_TOPOLOGY_VERTICES } from './visible-midface-band-fr211.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR217_CONTRACT_VERSION =
  'FR217-VISIBLE-CHEEK-CONTOUR-PROMINENCE-v1' as const;

const EPSILON = 1e-12;
const CHIN_VERTEX = 152;

const EYE_CYCLE_VERTEX_SETS: readonly (readonly number[])[] = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol])),
  ),
);

export interface FR217XYPoint {
  readonly x: number;
  readonly y: number;
}

export type FR217UnavailableReason =
  | 'eye_and_mouth_vertical_references_collapsed'
  | 'face_width_collapsed'
  | 'side_band_contains_fewer_than_three_points'
  | 'side_band_selector_run_is_disconnected'
  | 'side_band_chord_collapsed';

export type FR217Derivation =
  | Readonly<{
      status: 'available';
      bandLowY: number;
      bandHighY: number;
      unorderedSideDeviationToFaceWidthRatios: readonly [number, number];
      meanDeviationToFaceWidthRatio: number;
    }>
  | Readonly<{
      status: 'unavailable';
      reason: FR217UnavailableReason;
      fallbackInvented: false;
    }>;

export type FR217VisibleCheekContourProminenceResult =
  | Readonly<{
      schemaVersion: 'fr217-visible-cheek-contour-prominence-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR217_CONTRACT_VERSION;
      authorityState: 'visible_2d_midface_side_contour_deviation_candidate_only';
      status: 'available';
      metric: {
        readonly metricRef: 'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0';
        readonly value: number;
        readonly unit: 'ratio';
      };
      unorderedSideValues: readonly [number, number];
      sideIdentityResolved: false;
      source: FR217SourceReceipt;
      authorityBoundary: FR217AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion: 'fr217-visible-cheek-contour-prominence-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR217_CONTRACT_VERSION;
      authorityState: 'visible_2d_midface_side_contour_deviation_candidate_only';
      status: 'unavailable';
      reason: FR217UnavailableReason;
      fallbackInvented: false;
      source: FR217SourceReceipt;
      authorityBoundary: FR217AuthorityBoundary;
    }>;

export interface FR217SourceReceipt {
  readonly fr77ProviderRunRef: string;
  readonly fr77CanonicalAssetDigest: string;
  readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
  readonly sameProviderRunVerified: true;
  readonly sameCanonicalAssetDigestVerified: true;
  readonly faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology';
  readonly eyeTopologySource: 'fr24_two_closed_eye_cycles_provider_labels_not_semantic';
  readonly sidePathsConsumedAsUnordered: true;
  readonly providerIndicesExposedInOutput: false;
  readonly interpolationApplied: false;
  readonly smoothingApplied: false;
}

export interface FR217AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly zygionClaimIssued: false;
  readonly bizygomaticBreadthClaimIssued: false;
  readonly zygomaticProjectionClaimIssued: false;
  readonly skeletalCheekboneProminenceClaimIssued: false;
  readonly anatomicalSideIdentityIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const AUTHORITY_BOUNDARY: FR217AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  zygionClaimIssued: false as const,
  bizygomaticBreadthClaimIssued: false as const,
  zygomaticProjectionClaimIssued: false as const,
  skeletalCheekboneProminenceClaimIssued: false as const,
  anatomicalSideIdentityIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-217 ${message}`);
}

function assertPoints(points: readonly FR217XYPoint[], label: string, minimum: number): void {
  if (points.length < minimum) fail(`${label} requires at least ${minimum} points.`);
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`${label}[${index}] must contain finite x/y.`);
    }
  });
}

function meanY(points: readonly FR217XYPoint[]): number {
  return points.reduce((sum, point) => sum + point.y, 0) / points.length;
}

function perpendicularDistance(
  point: FR217XYPoint,
  start: FR217XYPoint,
  end: FR217XYPoint,
): number | null {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const denominator = Math.hypot(dx, dy);
  if (!(denominator > EPSILON)) return null;
  return Math.abs(dy * point.x - dx * point.y + end.x * start.y - end.y * start.x) /
    denominator;
}

function sideDeviation(
  orderedSidePath: readonly FR217XYPoint[],
  bandLowY: number,
  bandHighY: number,
  faceWidth: number,
): number | FR217UnavailableReason {
  const selected = orderedSidePath
    .map((point, index) => ({ point, index }))
    .filter(({ point }) => point.y >= bandLowY && point.y <= bandHighY);
  if (selected.length < 3) return 'side_band_contains_fewer_than_three_points';
  for (let index = 1; index < selected.length; index += 1) {
    if (selected[index]!.index !== selected[index - 1]!.index + 1) {
      return 'side_band_selector_run_is_disconnected';
    }
  }
  const start = selected[0]!.point;
  const end = selected.at(-1)!.point;
  const interior = selected.slice(1, -1);
  const distances = interior.map(({ point }) => perpendicularDistance(point, start, end));
  if (distances.some((value) => value === null)) return 'side_band_chord_collapsed';
  const maxDeviation = Math.max(...distances as number[]);
  const ratio = maxDeviation / faceWidth;
  if (!Number.isFinite(ratio) || ratio < 0) fail('side contour deviation ratio must be finite and non-negative.');
  return ratio;
}

export function deriveVisibleCheekContourProminenceFR217(input: {
  readonly orderedFaceOvalPoints: readonly FR217XYPoint[];
  readonly eyeCyclePoints: readonly FR217XYPoint[];
  readonly lipsUnionPoints: readonly FR217XYPoint[];
}): FR217Derivation {
  assertPoints(input.orderedFaceOvalPoints, 'orderedFaceOvalPoints', 36);
  assertPoints(input.eyeCyclePoints, 'eyeCyclePoints', 4);
  assertPoints(input.lipsUnionPoints, 'lipsUnionPoints', 4);
  if (input.orderedFaceOvalPoints.length !== 36) fail('orderedFaceOvalPoints must contain exactly 36 pinned selector points.');

  const eyeLineY = meanY(input.eyeCyclePoints);
  const mouthLineY = meanY(input.lipsUnionPoints);
  if (Math.abs(eyeLineY - mouthLineY) <= EPSILON) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'eye_and_mouth_vertical_references_collapsed' as const,
      fallbackInvented: false as const,
    });
  }
  const halfwayY = eyeLineY + (mouthLineY - eyeLineY) / 2;
  const bandLowY = Math.min(eyeLineY, halfwayY);
  const bandHighY = Math.max(eyeLineY, halfwayY);

  const xs = input.orderedFaceOvalPoints.map((point) => point.x);
  const faceWidth = Math.max(...xs) - Math.min(...xs);
  if (!(faceWidth > EPSILON)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'face_width_collapsed' as const,
      fallbackInvented: false as const,
    });
  }

  const chinIndex = FR211_FACE_OVAL_TOPOLOGY_VERTICES.indexOf(CHIN_VERTEX);
  if (chinIndex !== 18) fail('pinned FACE_OVAL chin split drift.');
  const firstSide = input.orderedFaceOvalPoints.slice(0, chinIndex + 1);
  const secondSide = [
    input.orderedFaceOvalPoints[0]!,
    ...input.orderedFaceOvalPoints.slice(chinIndex).reverse(),
  ];

  const first = sideDeviation(firstSide, bandLowY, bandHighY, faceWidth);
  if (typeof first === 'string') {
    return Object.freeze({ status: 'unavailable' as const, reason: first, fallbackInvented: false as const });
  }
  const second = sideDeviation(secondSide, bandLowY, bandHighY, faceWidth);
  if (typeof second === 'string') {
    return Object.freeze({ status: 'unavailable' as const, reason: second, fallbackInvented: false as const });
  }

  const sorted = [first, second].sort((a, b) => a - b) as [number, number];
  return Object.freeze({
    status: 'available' as const,
    bandLowY,
    bandHighY,
    unorderedSideDeviationToFaceWidthRatios: Object.freeze(sorted),
    meanDeviationToFaceWidthRatio: (first + second) / 2,
  });
}

function assertFR207CheekBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const cheek = inventory.entries.find((entry) => entry.regionKey === 'cheek_mid_face');
  if (
    cheek?.mayProceedWithoutNewAnatomicalResearch !== true ||
    cheek.smallestMissingObservablePrimitives.includes('cheek_contour_prominence') !== true ||
    cheek.currentlyUnavailableConstructs.includes('anatomical_zygion') !== true ||
    cheek.currentlyUnavailableConstructs.includes('skeletal_bizygomatic_breadth') !== true
  ) {
    fail('FR207 cheek/mid-face observable boundary drift.');
  }
}

function sourceReceipt(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR217SourceReceipt {
  return Object.freeze({
    fr77ProviderRunRef: fullFace.provider.providerRunRef,
    fr77CanonicalAssetDigest: fullFace.provider.canonicalAssetDigest,
    fr79ProjectionRuleRef: lips.projectionRule.projectionRuleRef,
    sameProviderRunVerified: true as const,
    sameCanonicalAssetDigestVerified: true as const,
    faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology' as const,
    eyeTopologySource: 'fr24_two_closed_eye_cycles_provider_labels_not_semantic' as const,
    sidePathsConsumedAsUnordered: true as const,
    providerIndicesExposedInOutput: false as const,
    interpolationApplied: false as const,
    smoothingApplied: false as const,
  });
}

export function computeVisibleCheekContourProminenceFR217(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR217VisibleCheekContourProminenceResult {
  assertFR207CheekBoundary();
  assertIssuedGovernedMetricGeometryFR77(fullFace);
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);
  if (
    fullFace.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    fullFace.unit !== 'centimeter' ||
    fullFace.metricLandmarks.length !== 468 ||
    fullFace.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
    fullFace.authorityBoundary.productionNeutralObservationIssued !== false ||
    fullFace.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('requires the exact FR77 governed metric-geometry boundary.');
  if (
    lips.coordinateFrame !== 'pose_normalized_face_2d' ||
    lips.coordinateUnit !== 'centimeter' ||
    lips.poseCompensated !== true ||
    lips.projectionRule.projectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    lips.projectionRule.formula !== 'x2d=x3d;y2d=y3d' ||
    lips.projectionRule.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
    lips.projectionRule.recenteringApplied !== false ||
    lips.projectionRule.rescalingApplied !== false
  ) fail('requires the exact FR79 canonical-metric XY preserving lips projection boundary.');
  if (
    fullFace.provider.providerRunRef !== lips.provenance.providerRunRef ||
    fullFace.provider.canonicalAssetDigest !== lips.provenance.canonicalAssetDigest
  ) fail('FR77 and FR79 must share providerRunRef and canonicalAssetDigest.');
  if (
    FR211_FACE_OVAL_TOPOLOGY_VERTICES.length !== 36 ||
    EYE_CYCLE_VERTEX_SETS.length !== 2 ||
    EYE_CYCLE_VERTEX_SETS.some((cycle) => cycle.length !== 16)
  ) fail('pinned FACE_OVAL/eye topology witness drift.');

  const toXY = (vertex: number): FR217XYPoint => {
    const point = fullFace.metricLandmarks[vertex];
    if (point === undefined || ![point.x, point.y, point.z].every(Number.isFinite)) {
      fail(`FR77 topology vertex ${vertex} is missing or non-finite.`);
    }
    return Object.freeze({ x: point.x, y: point.y });
  };
  const orderedFaceOvalPoints = FR211_FACE_OVAL_TOPOLOGY_VERTICES.map(toXY);
  const eyeCyclePoints = EYE_CYCLE_VERTEX_SETS.flatMap((cycle) => cycle.map(toXY));
  const lipsUnionPoints = lips.contours.flatMap((contour) =>
    contour.geometry.boundary.map((point) => Object.freeze({ x: point.x, y: point.y })),
  );
  const derivation = deriveVisibleCheekContourProminenceFR217({
    orderedFaceOvalPoints,
    eyeCyclePoints,
    lipsUnionPoints,
  });
  const source = sourceReceipt(fullFace, lips);

  if (derivation.status === 'unavailable') {
    return Object.freeze({
      schemaVersion: 'fr217-visible-cheek-contour-prominence-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR217_CONTRACT_VERSION,
      authorityState: 'visible_2d_midface_side_contour_deviation_candidate_only' as const,
      status: 'unavailable' as const,
      reason: derivation.reason,
      fallbackInvented: false as const,
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const result: FR217VisibleCheekContourProminenceResult = Object.freeze({
    schemaVersion: 'fr217-visible-cheek-contour-prominence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR217_CONTRACT_VERSION,
    authorityState: 'visible_2d_midface_side_contour_deviation_candidate_only' as const,
    status: 'available' as const,
    metric: Object.freeze({
      metricRef: 'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0' as const,
      value: derivation.meanDeviationToFaceWidthRatio,
      unit: 'ratio' as const,
    }),
    unorderedSideValues: derivation.unorderedSideDeviationToFaceWidthRatios,
    sideIdentityResolved: false as const,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertVisibleCheekContourProminenceFR217(result);
  return result;
}

export function assertVisibleCheekContourProminenceFR217(
  result: FR217VisibleCheekContourProminenceResult,
): void {
  if (
    result.schemaVersion !== 'fr217-visible-cheek-contour-prominence-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR217_CONTRACT_VERSION ||
    result.authorityState !== 'visible_2d_midface_side_contour_deviation_candidate_only' ||
    result.source.sameProviderRunVerified !== true ||
    result.source.sameCanonicalAssetDigestVerified !== true ||
    result.source.sidePathsConsumedAsUnordered !== true ||
    result.source.providerIndicesExposedInOutput !== false ||
    result.source.interpolationApplied !== false ||
    result.source.smoothingApplied !== false
  ) fail('result identity/source boundary drift.');
  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) fail('authority widened beyond visible cheek/mid-face morphology.');
  if (result.status === 'available') {
    if (
      result.metric.metricRef !== 'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0' ||
      result.metric.unit !== 'ratio' ||
      !Number.isFinite(result.metric.value) ||
      result.metric.value < 0 ||
      result.sideIdentityResolved !== false ||
      result.unorderedSideValues.length !== 2 ||
      result.unorderedSideValues.some((value) => !Number.isFinite(value) || value < 0) ||
      result.unorderedSideValues[0] > result.unorderedSideValues[1]
    ) fail('available cheek-contour metric boundary drift.');
  } else if (result.fallbackInvented !== false) {
    fail('unavailable cheek-contour result invented a fallback.');
  }
}
