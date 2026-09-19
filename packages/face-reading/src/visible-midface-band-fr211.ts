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
  assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206,
  issueFaceReadingObservableMorphologyMeasurementBoundaryFR206,
} from './face-reading-observable-morphology-measurement-boundary-fr206.js';
import {
  computeVisibleMidfaceWidthRatioFR208,
  type NeutralObservableMetricFR208V1,
  type VisibleWidthRatioInputFR208V1,
} from './cross-face-neutral-observable-primitives-fr208.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR211_CONTRACT_VERSION =
  'FR211-VISIBLE-MIDFACE-BAND-v1' as const;

export const FR211_FACE_OVAL_TOPOLOGY_VERTICES = Object.freeze([
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
  378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127,
  162, 21, 54, 103, 67, 109,
] as const);

const EYE_CYCLE_VERTEX_SETS: readonly (readonly number[])[] = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol])),
  ),
);

const EPSILON = 1e-12;

export interface FR211XYPoint {
  readonly x: number;
  readonly y: number;
}

export type FR211BandUnavailableReason =
  | 'eye_and_mouth_vertical_references_collapsed'
  | 'midface_band_contains_fewer_than_two_contour_points'
  | 'midface_band_horizontal_envelope_collapsed';

export type FR211BandDerivation =
  | Readonly<{
      status: 'available';
      bandLowY: number;
      bandHighY: number;
      bandPointCount: number;
      ratioInput: VisibleWidthRatioInputFR208V1;
    }>
  | Readonly<{
      status: 'unavailable';
      reason: FR211BandUnavailableReason;
      fallbackInvented: false;
    }>;

export type FR211VisibleMidfaceBandResult =
  | Readonly<{
      schemaVersion: 'fr211-visible-midface-band-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR211_CONTRACT_VERSION;
      authorityState: 'observable_midface_contour_candidate_only';
      status: 'available';
      metric: NeutralObservableMetricFR208V1;
      bandDefinition: 'eye_cycle_mean_y_to_halfway_toward_lips_union_mean_y';
      bandPointCount: number;
      source: {
        fr77ProviderRunRef: string;
        fr77CanonicalAssetDigest: string;
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
        sameProviderRunVerified: true;
        sameCanonicalAssetDigestVerified: true;
        faceOvalTopologySource: 'fr200_recorded_mediapipe_face_oval_topology';
        faceOvalTopologyReleaseExactForInstalledPackage: false;
        providerIndicesExposedInOutput: false;
      };
      authorityBoundary: FR211AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion: 'fr211-visible-midface-band-v1';
      artifactVersion: '0.1.0';
      contractVersion: typeof FR211_CONTRACT_VERSION;
      authorityState: 'observable_midface_contour_candidate_only';
      status: 'unavailable';
      reason: FR211BandUnavailableReason;
      fallbackInvented: false;
      source: {
        fr77ProviderRunRef: string;
        fr77CanonicalAssetDigest: string;
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
        sameProviderRunVerified: true;
        sameCanonicalAssetDigestVerified: true;
        faceOvalTopologySource: 'fr200_recorded_mediapipe_face_oval_topology';
        faceOvalTopologyReleaseExactForInstalledPackage: false;
        providerIndicesExposedInOutput: false;
      };
      authorityBoundary: FR211AuthorityBoundary;
    }>;

export interface FR211AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly zygionClaimIssued: false;
  readonly bizygomaticBreadthClaimIssued: false;
  readonly trueZygomaticBoneWidthClaimIssued: false;
  readonly mediaPipe234454AnatomyBindingIssued: false;
  readonly fr204CalibrationApplied: false;
  readonly skeletalCalibrationIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const AUTHORITY_BOUNDARY: FR211AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  zygionClaimIssued: false as const,
  bizygomaticBreadthClaimIssued: false as const,
  trueZygomaticBoneWidthClaimIssued: false as const,
  mediaPipe234454AnatomyBindingIssued: false as const,
  fr204CalibrationApplied: false as const,
  skeletalCalibrationIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-211 ${message}`);
}

function assertPoints(points: readonly FR211XYPoint[], label: string, minimum: number): void {
  if (points.length < minimum) fail(`${label} requires at least ${minimum} points.`);
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`${label}[${index}] must contain finite x/y coordinates.`);
    }
  });
}

function meanY(points: readonly FR211XYPoint[]): number {
  return points.reduce((sum, point) => sum + point.y, 0) / points.length;
}

function envelopeX(points: readonly FR211XYPoint[], label: string): Readonly<{ minX: number; maxX: number }> {
  const xs = points.map((point) => point.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  if (!Number.isFinite(minX) || !Number.isFinite(maxX) || !(maxX - minX > EPSILON)) {
    fail(`${label} horizontal envelope must be finite and positive.`);
  }
  return Object.freeze({ minX, maxX });
}

export function deriveVisibleMidfaceBandFromPointSetsFR211(input: {
  readonly faceOvalPoints: readonly FR211XYPoint[];
  readonly eyeCyclePoints: readonly FR211XYPoint[];
  readonly lipsUnionPoints: readonly FR211XYPoint[];
  readonly sourceObservationRefs: readonly string[];
}): FR211BandDerivation {
  assertPoints(input.faceOvalPoints, 'faceOvalPoints', 4);
  assertPoints(input.eyeCyclePoints, 'eyeCyclePoints', 4);
  assertPoints(input.lipsUnionPoints, 'lipsUnionPoints', 4);

  const refs = input.sourceObservationRefs.map((ref) => ref.trim());
  if (refs.length === 0 || refs.some((ref) => ref.length === 0) || new Set(refs).size !== refs.length) {
    fail('sourceObservationRefs must be non-empty and unique.');
  }

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
  const bandPoints = input.faceOvalPoints.filter(
    (point) => point.y >= bandLowY && point.y <= bandHighY,
  );
  if (bandPoints.length < 2) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'midface_band_contains_fewer_than_two_contour_points' as const,
      fallbackInvented: false as const,
    });
  }

  const full = envelopeX(input.faceOvalPoints, 'full visible face oval');
  const bandXs = bandPoints.map((point) => point.x);
  const bandMinX = Math.min(...bandXs);
  const bandMaxX = Math.max(...bandXs);
  if (!Number.isFinite(bandMinX) || !Number.isFinite(bandMaxX) || !(bandMaxX - bandMinX > EPSILON)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'midface_band_horizontal_envelope_collapsed' as const,
      fallbackInvented: false as const,
    });
  }

  const referenceY = (bandLowY + bandHighY) / 2;
  return Object.freeze({
    status: 'available' as const,
    bandLowY,
    bandHighY,
    bandPointCount: bandPoints.length,
    ratioInput: Object.freeze({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      regionLeft: Object.freeze({ x: bandMinX, y: referenceY }),
      regionRight: Object.freeze({ x: bandMaxX, y: referenceY }),
      visibleFaceLeft: Object.freeze({ x: full.minX, y: referenceY }),
      visibleFaceRight: Object.freeze({ x: full.maxX, y: referenceY }),
      sourceObservationRefs: Object.freeze([...refs]),
    }),
  });
}

function assertFR206Boundary(): void {
  const policy = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();
  assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206(policy);
  if (
    policy.productDefaultTargetClass !== 'observable_morphology' ||
    policy.cheekMidFace.targetClass !== 'observable_morphology' ||
    policy.cheekMidFace.allowedOperationalLabels.includes('visible_midface_width') !== true ||
    policy.cheekMidFace.forbiddenAnatomicalLabels.includes('zygion') !== true ||
    policy.cheekMidFace.forbiddenAnatomicalLabels.includes('bizygomatic_breadth') !== true ||
    policy.cheekMidFace.rawFullOvalMayAdvanceAsOperationalFaceBreadthCandidate !== true ||
    policy.cheekMidFace.additionalZygionValidationBlocksOperationalUse !== false ||
    policy.cheekMidFace.fr204GenericCalibrationFactorAuthorized !== false ||
    policy.authorityBoundary.newZygionCampaignAuthorized !== false ||
    policy.authorityBoundary.new3DScanAcquisitionAuthorized !== false ||
    policy.authorityBoundary.skeletalCalibrationAuthorized !== false
  ) {
    fail('FR206 observable-morphology boundary drift.');
  }
}

function sourceReceipt(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR211VisibleMidfaceBandResult['source'] {
  return Object.freeze({
    fr77ProviderRunRef: fullFace.provider.providerRunRef,
    fr77CanonicalAssetDigest: fullFace.provider.canonicalAssetDigest,
    fr79ProjectionRuleRef: lips.projectionRule.projectionRuleRef,
    sameProviderRunVerified: true as const,
    sameCanonicalAssetDigestVerified: true as const,
    faceOvalTopologySource: 'fr200_recorded_mediapipe_face_oval_topology' as const,
    faceOvalTopologyReleaseExactForInstalledPackage: false as const,
    providerIndicesExposedInOutput: false as const,
  });
}

export function computeVisibleMidfaceBandFR211(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR211VisibleMidfaceBandResult {
  assertFR206Boundary();
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

  if (
    EYE_CYCLE_VERTEX_SETS.length !== 2 ||
    EYE_CYCLE_VERTEX_SETS.some((cycle) => cycle.length !== 16) ||
    FR211_FACE_OVAL_TOPOLOGY_VERTICES.length !== 36
  ) {
    fail('pinned eye/face-oval topology witness drift.');
  }

  const toXY = (index: number): FR211XYPoint => {
    const point = fullFace.metricLandmarks[index];
    if (point === undefined) fail(`FR77 geometry missing topology vertex ${index}.`);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
      fail(`FR77 topology vertex ${index} must contain finite x/y/z.`);
    }
    return Object.freeze({ x: point.x, y: point.y });
  };

  const faceOvalPoints = FR211_FACE_OVAL_TOPOLOGY_VERTICES.map(toXY);
  const eyeCyclePoints = EYE_CYCLE_VERTEX_SETS.flatMap((cycle) => cycle.map(toXY));
  const lipsUnionPoints = lips.contours.flatMap((contour) =>
    contour.geometry.boundary.map((point) => Object.freeze({ x: point.x, y: point.y })),
  );

  const derivation = deriveVisibleMidfaceBandFromPointSetsFR211({
    faceOvalPoints,
    eyeCyclePoints,
    lipsUnionPoints,
    sourceObservationRefs: [
      'fr77:canonical_aligned_metric_geometry',
      'fr24:two_closed_eye_cycles:provider_labels_not_semantic',
      'fr79:unordered_lips_contour_union',
      'fr200:recorded_mediapipe_face_oval_topology:selector_only',
      'fr211:eye_line_to_halfway_lips_line_visible_midface_band',
    ],
  });
  const source = sourceReceipt(fullFace, lips);

  if (derivation.status === 'unavailable') {
    return Object.freeze({
      schemaVersion: 'fr211-visible-midface-band-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR211_CONTRACT_VERSION,
      authorityState: 'observable_midface_contour_candidate_only' as const,
      status: 'unavailable' as const,
      reason: derivation.reason,
      fallbackInvented: false as const,
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const computed = computeVisibleMidfaceWidthRatioFR208(derivation.ratioInput);
  return Object.freeze({
    schemaVersion: 'fr211-visible-midface-band-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR211_CONTRACT_VERSION,
    authorityState: 'observable_midface_contour_candidate_only' as const,
    status: 'available' as const,
    metric: computed.metric,
    bandDefinition: 'eye_cycle_mean_y_to_halfway_toward_lips_union_mean_y' as const,
    bandPointCount: derivation.bandPointCount,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

export function assertVisibleMidfaceBandFR211(
  result: FR211VisibleMidfaceBandResult,
): void {
  if (
    result.schemaVersion !== 'fr211-visible-midface-band-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR211_CONTRACT_VERSION ||
    result.authorityState !== 'observable_midface_contour_candidate_only' ||
    result.source.sameProviderRunVerified !== true ||
    result.source.sameCanonicalAssetDigestVerified !== true ||
    result.source.providerIndicesExposedInOutput !== false ||
    result.source.faceOvalTopologyReleaseExactForInstalledPackage !== false
  ) {
    fail('result identity/source boundary drift.');
  }
  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond observable morphology.');
  }
  if (result.status === 'available') {
    if (
      result.metric.metricRef !== 'neutral.midface.visible_width_to_face_width_ratio@0.1.0' ||
      result.metric.classificationApplied !== false ||
      result.metric.thresholdApplied !== false ||
      result.metric.calibrationApplied !== false ||
      result.metric.traditionalBindingApplied !== false ||
      result.metric.anatomicalInterpretationAllowed !== false ||
      result.bandPointCount < 2
    ) {
      fail('available visible-midface metric boundary drift.');
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable visible-midface result invented a fallback.');
  }
}
