import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type { MediaPipeMetricGeometryPointFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import {
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import {
  computeEyeOuterCornerTiltFR208,
  computeMouthCornerElevationFR208,
  type EyeOuterCornerTiltInputFR208V1,
  type MouthCornerElevationInputFR208V1,
  type NeutralObservableMetricFR208V1,
} from './cross-face-neutral-observable-primitives-fr208.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR209_CONTRACT_VERSION =
  'FR209-GOVERNED-GEOMETRY-TO-FR208-ADAPTER-v1' as const;

const EPSILON = 1e-12;

export type FR209PrimitiveKey =
  | 'eye_outer_corner_tilt'
  | 'eyebrow_visible_span_arch_and_lateral_tilt'
  | 'mouth_corner_elevation'
  | 'visible_midface_width_ratio'
  | 'visible_lower_face_width_ratio';

export type FR209UnavailableReason =
  | 'eye_cycle_extrema_ambiguous'
  | 'eye_cycles_not_bilateral_around_mesh_midline'
  | 'neutral_brow_curve_not_authorized'
  | 'governed_lips_geometry_not_supplied'
  | 'mouth_horizontal_extrema_ambiguous'
  | 'governed_midface_band_not_authorized'
  | 'canonical_lower_face_projection_not_authorized';

export interface FR209AvailableSlot {
  readonly status: 'available';
  readonly primitiveKey: FR209PrimitiveKey;
  readonly metric: NeutralObservableMetricFR208V1;
  readonly derivation:
    | 'role_invariant_eye_cycle_x_extrema_relative_to_full_mesh_x_midline'
    | 'unordered_lips_union_x_extrema_plus_union_bounding_box_center';
  readonly anatomicalLateralityAssigned: false;
  readonly providerVertexIndexExposed: false;
  readonly traditionalBindingApplied: false;
}

export interface FR209UnavailableSlot {
  readonly status: 'unavailable';
  readonly primitiveKey: FR209PrimitiveKey;
  readonly reason: FR209UnavailableReason;
  readonly fallbackInvented: false;
}

export type FR209AdapterSlot = FR209AvailableSlot | FR209UnavailableSlot;

export interface FR209GovernedGeometryAdapterResult {
  readonly schemaVersion: 'fr209-governed-geometry-adapter-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR209_CONTRACT_VERSION;
  readonly authorityState: 'research_neutral_observable_adapter_only';
  readonly source: {
    readonly fr77SchemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly fr77CoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly fr77ProviderRunRef: string;
    readonly fr77CanonicalAssetDigest: string;
    readonly fr79Supplied: boolean;
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1' | null;
    readonly fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0' | null;
    readonly sameProviderRunVerified: boolean | null;
    readonly sameCanonicalAssetDigestVerified: boolean | null;
  };
  readonly slots: {
    readonly eyeOuterCornerTilt: FR209AdapterSlot;
    readonly eyebrow: FR209UnavailableSlot;
    readonly mouthCornerElevation: FR209AdapterSlot;
    readonly midfaceWidth: FR209UnavailableSlot;
    readonly lowerFaceWidth: FR209UnavailableSlot;
  };
  readonly authorityBoundary: {
    readonly providerIndexToAnatomyBindingIssued: false;
    readonly anatomicalLateralityIssued: false;
    readonly faceOvalToZygionBindingIssued: false;
    readonly mandibularBoneBindingIssued: false;
    readonly thresholdIssued: false;
    readonly classificationIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export type FR209MetricXYPoint = Readonly<{ x: number; y: number }>;

export type FR209EyeDerivation =
  | Readonly<{
      status: 'available';
      input: EyeOuterCornerTiltInputFR208V1;
    }>
  | Readonly<{
      status: 'unavailable';
      reason: 'eye_cycle_extrema_ambiguous' | 'eye_cycles_not_bilateral_around_mesh_midline';
    }>;

export type FR209MouthDerivation =
  | Readonly<{
      status: 'available';
      input: MouthCornerElevationInputFR208V1;
    }>
  | Readonly<{
      status: 'unavailable';
      reason: 'mouth_horizontal_extrema_ambiguous';
    }>;

const EYE_CYCLE_VERTEX_SETS: readonly (readonly number[])[] = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol])),
  ),
);

export const FR209_STATIC_UNAVAILABLE_SLOTS = Object.freeze({
  eyebrow: Object.freeze({
    status: 'unavailable' as const,
    primitiveKey: 'eyebrow_visible_span_arch_and_lateral_tilt' as const,
    reason: 'neutral_brow_curve_not_authorized' as const,
    fallbackInvented: false as const,
  }),
  midfaceWidth: Object.freeze({
    status: 'unavailable' as const,
    primitiveKey: 'visible_midface_width_ratio' as const,
    reason: 'governed_midface_band_not_authorized' as const,
    fallbackInvented: false as const,
  }),
  lowerFaceWidth: Object.freeze({
    status: 'unavailable' as const,
    primitiveKey: 'visible_lower_face_width_ratio' as const,
    reason: 'canonical_lower_face_projection_not_authorized' as const,
    fallbackInvented: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-209 ${message}`);
}

function finiteXY(point: FR209MetricXYPoint, path: string): void {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    fail(`${path} must contain finite x/y coordinates.`);
  }
}

function uniqueExtremum(
  points: readonly FR209MetricXYPoint[],
  direction: 'min' | 'max',
): FR209MetricXYPoint | null {
  if (points.length === 0) fail('extremum derivation requires at least one point.');
  points.forEach((point, index) => finiteXY(point, `points[${index}]`));
  const target = direction === 'min'
    ? Math.min(...points.map((point) => point.x))
    : Math.max(...points.map((point) => point.x));
  const candidates = points.filter((point) => Math.abs(point.x - target) <= EPSILON);
  return candidates.length === 1 ? candidates[0]! : null;
}

function meanX(points: readonly FR209MetricXYPoint[]): number {
  if (points.length === 0) fail('meanX requires at least one point.');
  points.forEach((point, index) => finiteXY(point, `points[${index}]`));
  return points.reduce((sum, point) => sum + point.x, 0) / points.length;
}

function asXY(point: MediaPipeMetricGeometryPointFR76V1): FR209MetricXYPoint {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
    fail('FR77 metric geometry point must contain finite x/y/z.');
  }
  return Object.freeze({ x: point.x, y: point.y });
}

export function deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(
  metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
): FR209EyeDerivation {
  if (metricLandmarks.length !== 468) {
    fail('eye derivation requires exactly 468 governed metric landmarks.');
  }
  if (EYE_CYCLE_VERTEX_SETS.length !== 2 || EYE_CYCLE_VERTEX_SETS.some((cycle) => cycle.length !== 16)) {
    fail('FR24 eye topology witness must remain exactly two 16-point cycles.');
  }

  const meshXs = metricLandmarks.map((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
      fail(`metricLandmarks[${index}] must contain finite x/y/z.`);
    }
    return point.x;
  });
  const meshMinX = Math.min(...meshXs);
  const meshMaxX = Math.max(...meshXs);
  if (!(meshMaxX - meshMinX > EPSILON)) fail('full mesh X span must be positive.');
  const meshMidX = (meshMinX + meshMaxX) / 2;

  const cycles = EYE_CYCLE_VERTEX_SETS.map((vertices) =>
    vertices.map((vertex) => {
      const point = metricLandmarks[vertex];
      if (point === undefined) fail(`metric geometry is missing FR24 eye vertex ${vertex}.`);
      return asXY(point);
    }),
  );

  const cycleDescriptors = cycles.map((points) => {
    const minPoint = uniqueExtremum(points, 'min');
    const maxPoint = uniqueExtremum(points, 'max');
    if (minPoint === null || maxPoint === null) return null;
    const centroidX = meanX(points);
    if (Math.abs(centroidX - meshMidX) <= EPSILON) return null;
    const onNegativeXSide = centroidX < meshMidX;
    return Object.freeze({
      centroidX,
      innerCorner: onNegativeXSide ? maxPoint : minPoint,
      outerCorner: onNegativeXSide ? minPoint : maxPoint,
    });
  });

  if (cycleDescriptors.some((descriptor) => descriptor === null)) {
    return Object.freeze({ status: 'unavailable' as const, reason: 'eye_cycle_extrema_ambiguous' as const });
  }
  const [first, second] = cycleDescriptors as [
    NonNullable<(typeof cycleDescriptors)[number]>,
    NonNullable<(typeof cycleDescriptors)[number]>,
  ];
  if (
    (first.centroidX < meshMidX) === (second.centroidX < meshMidX)
  ) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'eye_cycles_not_bilateral_around_mesh_midline' as const,
    });
  }

  const ordered = [first, second].sort((left, right) => left.centroidX - right.centroidX);
  return Object.freeze({
    status: 'available' as const,
    input: Object.freeze({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      leftEye: Object.freeze({
        innerCorner: ordered[0]!.innerCorner,
        outerCorner: ordered[0]!.outerCorner,
      }),
      rightEye: Object.freeze({
        innerCorner: ordered[1]!.innerCorner,
        outerCorner: ordered[1]!.outerCorner,
      }),
      sourceObservationRefs: Object.freeze([
        'fr77:canonical_aligned_metric_geometry',
        'fr24:two_closed_eye_cycles:provider_labels_not_semantic',
        'fr209:role_invariant_cycle_extrema_relative_to_mesh_midline',
      ]),
    }),
  });
}

export function deriveMouthCornerElevationInputFromContourUnionFR209(
  points: readonly FR209MetricXYPoint[],
  sourceObservationRefs: readonly string[],
): FR209MouthDerivation {
  if (points.length < 4) fail('mouth contour union requires at least four points.');
  points.forEach((point, index) => finiteXY(point, `mouthPoints[${index}]`));
  const leftCorner = uniqueExtremum(points, 'min');
  const rightCorner = uniqueExtremum(points, 'max');
  if (leftCorner === null || rightCorner === null) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'mouth_horizontal_extrema_ambiguous' as const,
    });
  }
  const ys = points.map((point) => point.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  if (!(rightCorner.x - leftCorner.x > EPSILON) || !(maxY - minY > EPSILON)) {
    fail('mouth contour union must have positive horizontal and vertical spans.');
  }
  const refs = sourceObservationRefs.map((ref) => ref.trim());
  if (refs.length === 0 || refs.some((ref) => ref.length === 0) || new Set(refs).size !== refs.length) {
    fail('mouth sourceObservationRefs must be non-empty and unique.');
  }

  return Object.freeze({
    status: 'available' as const,
    input: Object.freeze({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      leftCorner,
      rightCorner,
      visibleMouthCenter: Object.freeze({
        x: (leftCorner.x + rightCorner.x) / 2,
        y: (minY + maxY) / 2,
      }),
      sourceObservationRefs: Object.freeze([...refs]),
    }),
  });
}

export function deriveMouthCornerElevationInputFromIssuedFR79FR209(
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR209MouthDerivation {
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);
  if (
    lips.coordinateFrame !== 'pose_normalized_face_2d' ||
    lips.coordinateUnit !== 'centimeter' ||
    lips.poseCompensated !== true ||
    lips.projectionRule.projectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    lips.projectionRule.formula !== 'x2d=x3d;y2d=y3d' ||
    lips.projectionRule.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
    lips.projectionRule.recenteringApplied !== false ||
    lips.projectionRule.rescalingApplied !== false ||
    lips.contourConsumptionState !== 'unordered_set_no_outer_inner_role'
  ) {
    fail('requires the exact FR79 canonical-metric XY preserving lips projection boundary.');
  }
  const points = lips.contours.flatMap((contour) => contour.geometry.boundary);
  return deriveMouthCornerElevationInputFromContourUnionFR209(
    points,
    [
      ...lips.contours.map((contour) => contour.contourRef),
      lips.projectionRule.projectionRuleRef,
      'fr209:unordered_lips_union_extrema_and_bbox_center',
    ],
  );
}

function unavailable(
  primitiveKey: FR209PrimitiveKey,
  reason: FR209UnavailableReason,
): FR209UnavailableSlot {
  return Object.freeze({
    status: 'unavailable' as const,
    primitiveKey,
    reason,
    fallbackInvented: false as const,
  });
}

function available(
  primitiveKey: FR209PrimitiveKey,
  metric: NeutralObservableMetricFR208V1,
  derivation: FR209AvailableSlot['derivation'],
): FR209AvailableSlot {
  return Object.freeze({
    status: 'available' as const,
    primitiveKey,
    metric,
    derivation,
    anatomicalLateralityAssigned: false as const,
    providerVertexIndexExposed: false as const,
    traditionalBindingApplied: false as const,
  });
}

function assertInventoryBoundary(): void {
  const inventory = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(inventory);
  const eyebrow = inventory.entries.find((entry) => entry.regionKey === 'eyebrow');
  const midface = inventory.entries.find((entry) => entry.regionKey === 'cheek_mid_face');
  const lowerFace = inventory.entries.find((entry) => entry.regionKey === 'chin_lower_face');
  if (
    eyebrow?.smallestMissingObservablePrimitives.includes('product_brow_span_and_arch_geometry') !== true ||
    eyebrow.currentlyUnavailableConstructs.includes('provider_component_as_anatomical_brow_boundary') !== true ||
    midface?.productReadiness !== 'representative_image_validation_required' ||
    midface.currentlyUnavailableConstructs.includes('anatomical_zygion') !== true ||
    lowerFace?.smallestMissingObservablePrimitives.includes('canonical_product_2d_chin_contour_projection') !== true ||
    lowerFace.currentlyUnavailableConstructs.includes('image_only_mandibular_bone_boundary') !== true
  ) {
    fail('FR207 availability boundary drift.');
  }
}

export function adaptGovernedGeometryToFR208FR209(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips?: PoseNormalizedLipsGeometryFR79V1,
): FR209GovernedGeometryAdapterResult {
  assertInventoryBoundary();
  assertIssuedGovernedMetricGeometryFR77(fullFace);
  if (
    fullFace.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    fullFace.unit !== 'centimeter' ||
    fullFace.metricLandmarks.length !== 468 ||
    fullFace.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
    fullFace.authorityBoundary.productionNeutralObservationIssued !== false ||
    fullFace.authorityBoundary.traditionalSemanticAuthority !== false
  ) {
    fail('requires the exact issued FR77 governed research metric geometry boundary.');
  }

  const eyeDerivation = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(fullFace.metricLandmarks);
  const eyeSlot = eyeDerivation.status === 'available'
    ? available(
        'eye_outer_corner_tilt',
        computeEyeOuterCornerTiltFR208(eyeDerivation.input).mean,
        'role_invariant_eye_cycle_x_extrema_relative_to_full_mesh_x_midline',
      )
    : unavailable('eye_outer_corner_tilt', eyeDerivation.reason);

  let mouthSlot: FR209AdapterSlot;
  let sameProviderRunVerified: boolean | null = null;
  let sameCanonicalAssetDigestVerified: boolean | null = null;
  if (lips === undefined) {
    mouthSlot = unavailable('mouth_corner_elevation', 'governed_lips_geometry_not_supplied');
  } else {
    assertIssuedPoseNormalizedLipsGeometryFR79(lips);
    sameProviderRunVerified = fullFace.provider.providerRunRef === lips.provenance.providerRunRef;
    sameCanonicalAssetDigestVerified =
      fullFace.provider.canonicalAssetDigest === lips.provenance.canonicalAssetDigest;
    if (!sameProviderRunVerified || !sameCanonicalAssetDigestVerified) {
      fail('FR77 full-face geometry and FR79 lips geometry must share providerRunRef and canonicalAssetDigest.');
    }
    const mouthDerivation = deriveMouthCornerElevationInputFromIssuedFR79FR209(lips);
    mouthSlot = mouthDerivation.status === 'available'
      ? available(
          'mouth_corner_elevation',
          computeMouthCornerElevationFR208(mouthDerivation.input).mean,
          'unordered_lips_union_x_extrema_plus_union_bounding_box_center',
        )
      : unavailable('mouth_corner_elevation', mouthDerivation.reason);
  }

  return Object.freeze({
    schemaVersion: 'fr209-governed-geometry-adapter-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR209_CONTRACT_VERSION,
    authorityState: 'research_neutral_observable_adapter_only' as const,
    source: Object.freeze({
      fr77SchemaVersion: fullFace.schemaVersion,
      fr77CoordinateFrame: fullFace.coordinateFrame,
      fr77ProviderRunRef: fullFace.provider.providerRunRef,
      fr77CanonicalAssetDigest: fullFace.provider.canonicalAssetDigest,
      fr79Supplied: lips !== undefined,
      fr79SchemaVersion: lips?.schemaVersion ?? null,
      fr79ProjectionRuleRef: lips?.projectionRule.projectionRuleRef ?? null,
      sameProviderRunVerified,
      sameCanonicalAssetDigestVerified,
    }),
    slots: Object.freeze({
      eyeOuterCornerTilt: eyeSlot,
      eyebrow: FR209_STATIC_UNAVAILABLE_SLOTS.eyebrow,
      mouthCornerElevation: mouthSlot,
      midfaceWidth: FR209_STATIC_UNAVAILABLE_SLOTS.midfaceWidth,
      lowerFaceWidth: FR209_STATIC_UNAVAILABLE_SLOTS.lowerFaceWidth,
    }),
    authorityBoundary: Object.freeze({
      providerIndexToAnatomyBindingIssued: false as const,
      anatomicalLateralityIssued: false as const,
      faceOvalToZygionBindingIssued: false as const,
      mandibularBoneBindingIssued: false as const,
      thresholdIssued: false as const,
      classificationIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function assertFR209GovernedGeometryAdapterBoundary(
  result: FR209GovernedGeometryAdapterResult,
): void {
  if (
    result.schemaVersion !== 'fr209-governed-geometry-adapter-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FR209_CONTRACT_VERSION ||
    result.authorityState !== 'research_neutral_observable_adapter_only'
  ) {
    fail('adapter identity/state drift.');
  }
  if (Object.values(result.authorityBoundary).some((value) => value !== false)) {
    fail('adapter authority widened.');
  }
  for (const slot of Object.values(result.slots)) {
    if (slot.status === 'available') {
      if (
        slot.metric.classificationApplied !== false ||
        slot.metric.thresholdApplied !== false ||
        slot.metric.calibrationApplied !== false ||
        slot.metric.traditionalBindingApplied !== false ||
        slot.metric.anatomicalInterpretationAllowed !== false ||
        slot.anatomicalLateralityAssigned !== false ||
        slot.providerVertexIndexExposed !== false ||
        slot.traditionalBindingApplied !== false
      ) {
        fail(`available slot widened authority: ${slot.primitiveKey}.`);
      }
    } else if (slot.fallbackInvented !== false) {
      fail(`unavailable slot invented a fallback: ${slot.primitiveKey}.`);
    }
  }
}
