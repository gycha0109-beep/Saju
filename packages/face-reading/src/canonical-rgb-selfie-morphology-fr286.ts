import {
  assertCanonicalRgbSelfieMorphologyPayloadFR285,
  extractCanonicalRgbSelfieMorphologyFR285,
  type FR285CanonicalRgbSelfieMorphologyPayload,
  type FR285MouthFeature,
} from './canonical-rgb-selfie-morphology-fr285.js';
import type {
  FR284CanonicalMorphologyFeature,
  FR284FeatureQualityContext,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertVisibleMidfaceBandFR211,
  computeVisibleMidfaceBandFR211,
  type FR211VisibleMidfaceBandResult,
} from './visible-midface-band-fr211.js';
import {
  assertVisibleCheekContourProminenceFR217,
  computeVisibleCheekContourProminenceFR217,
  type FR217VisibleCheekContourProminenceResult,
} from './visible-cheek-contour-prominence-fr217.js';
import {
  assertVisibleLowerFaceWidthFR213,
  computeVisibleLowerFaceWidthFR213,
  type FR213VisibleLowerFaceWidthResult,
} from './visible-lower-face-width-fr213.js';
import {
  assertCanonicalVisibleLowerFaceContourFR216,
  computeCanonicalVisibleLowerFaceContourFR216,
  type FR216VisibleLowerFaceContourResult,
} from './canonical-visible-lower-face-contour-fr216.js';
import {
  FR286_PRODUCT_COLUMN_MAP,
  assertFR286ProductColumnMap,
} from './rgb-selfie-product-column-map-fr286.js';
import type {
  FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR286_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR286-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export type FR286FeatureKey =
  | 'cheek_midface.visible_width_ratio'
  | 'cheek_midface.visible_contour_prominence'
  | 'cheek_midface.relative_3d_prominence'
  | 'chin_lower_face.visible_width_ratio'
  | 'chin_lower_face.visible_contour'
  | 'chin_lower_face.chin_height_width_center_deviation'
  | 'chin_lower_face.relative_projection';

export interface FR286CanonicalContourPoint {
  readonly x: number;
  readonly y: number;
}

export type FR286CheekLowerFaceFeature =
  | Readonly<{
      featureKey: FR286FeatureKey;
      regionKey: 'cheek_mid_face' | 'chin_lower_face';
      status: 'available';
      value:
        | Readonly<{
            kind: 'scalar';
            value: number;
            unit: 'ratio';
          }>
        | Readonly<{
            kind: 'canonical_contour_2d';
            coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
            coordinateUnit: 'centimeter';
            points: readonly FR286CanonicalContourPoint[];
            pointCount: number;
            persistenceAllowed: false;
          }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }>
  | Readonly<{
      featureKey: FR286FeatureKey;
      regionKey: 'cheek_mid_face' | 'chin_lower_face';
      status: 'unavailable';
      reason:
        | 'source_geometry_midface_width_unavailable'
        | 'source_geometry_cheek_prominence_unavailable'
        | 'source_geometry_lower_face_width_unavailable'
        | 'source_geometry_lower_face_contour_unavailable'
        | 'rgb_relative_3d_provider_not_materialized'
        | 'chin_dimension_extractor_not_materialized';
      sourceReason?: string;
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }>;

export interface FR286CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion: 'fr286-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion: typeof FR286_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_canonical_observable_morphology_no_traditional_semantics';
  readonly captureBoundary:
    FR285CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys: readonly [
    'eye_pair',
    'mouth_lips',
    'cheek_mid_face',
    'chin_lower_face',
  ];
  readonly features: readonly (
    | FR284CanonicalMorphologyFeature
    | FR285MouthFeature
    | FR286CheekLowerFaceFeature
  )[];
  readonly pendingFeatureKeys: readonly FR284ProductFeatureKey[];
  readonly provenance: {
    readonly sourceGeometryCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly sourceLipsCoordinateFrame: 'pose_normalized_face_2d';
    readonly sourceProviderRunRefExposed: false;
    readonly sourceCanonicalAssetDigestExposed: false;
    readonly sameProviderRunVerified: true;
    readonly sameCanonicalAssetDigestVerified: true;
    readonly derivedCanonicalContourPersistenceAllowed: false;
  };
  readonly authorityBoundary:
    FR285CanonicalRgbSelfieMorphologyPayload['authorityBoundary'];
}

export interface FR286ExistingSources {
  readonly midfaceWidth: FR211VisibleMidfaceBandResult;
  readonly cheekProminence: FR217VisibleCheekContourProminenceResult;
  readonly lowerFaceWidth: FR213VisibleLowerFaceWidthResult;
  readonly lowerFaceContour: FR216VisibleLowerFaceContourResult;
}

const MIDFACE_WIDTH_REF =
  'neutral.midface.visible_width_to_face_width_ratio@0.1.0';
const CHEEK_PROMINENCE_REF =
  'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0';
const LOWER_FACE_WIDTH_REF =
  'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0';

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-286 ${message}`);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(`${label} must be finite.`);
  return value;
}

function quality(
  dependency: FR284FeatureQualityContext['dependency'],
): FR284FeatureQualityContext {
  return Object.freeze({
    dependency,
    viewpointSensitivity: 'not_characterized_by_fr283' as const,
    evidenceRefs: Object.freeze([]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

function availableScalar(
  featureKey: FR286FeatureKey,
  regionKey: 'cheek_mid_face' | 'chin_lower_face',
  value: number,
  sourceMetricRef: string,
): FR286CheekLowerFaceFeature {
  return Object.freeze({
    featureKey,
    regionKey,
    status: 'available' as const,
    value: Object.freeze({
      kind: 'scalar' as const,
      value: finite(value, featureKey),
      unit: 'ratio' as const,
    }),
    sourceMetricRefs: Object.freeze([sourceMetricRef]),
    quality: quality('canonical_metric_geometry'),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  });
}

function unavailable(
  featureKey: FR286FeatureKey,
  regionKey: 'cheek_mid_face' | 'chin_lower_face',
  reason: Extract<
    FR286CheekLowerFaceFeature,
    { status: 'unavailable' }
  >['reason'],
  dependency: FR284FeatureQualityContext['dependency'],
  sourceMetricRefs: readonly string[] = [],
  sourceReason?: string,
): FR286CheekLowerFaceFeature {
  const base = {
    featureKey,
    regionKey,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    sourceMetricRefs: Object.freeze([...sourceMetricRefs]),
    quality: quality(dependency),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };
  return sourceReason === undefined
    ? Object.freeze(base)
    : Object.freeze({ ...base, sourceReason });
}

function sourceRunRefs(sources: FR286ExistingSources): readonly string[] {
  return [
    sources.midfaceWidth.source.fr77ProviderRunRef,
    sources.cheekProminence.source.fr77ProviderRunRef,
    sources.lowerFaceWidth.source.fr77ProviderRunRef,
    sources.lowerFaceContour.source.fr77ProviderRunRef,
  ];
}

function sourceDigests(sources: FR286ExistingSources): readonly string[] {
  return [
    sources.midfaceWidth.source.fr77CanonicalAssetDigest,
    sources.cheekProminence.source.fr77CanonicalAssetDigest,
    sources.lowerFaceWidth.source.fr77CanonicalAssetDigest,
    sources.lowerFaceContour.source.fr77CanonicalAssetDigest,
  ];
}

function assertSourceBoundary(sources: FR286ExistingSources): void {
  if (
    sources.midfaceWidth.schemaVersion !==
      'fr211-visible-midface-band-v1' ||
    sources.cheekProminence.schemaVersion !==
      'fr217-visible-cheek-contour-prominence-v1' ||
    sources.lowerFaceWidth.schemaVersion !==
      'fr213-visible-lower-face-width-v1' ||
    sources.lowerFaceContour.schemaVersion !==
      'fr216-visible-lower-face-contour-v1'
  ) {
    fail('source schema boundary drift.');
  }
  if (
    new Set(sourceRunRefs(sources)).size !== 1 ||
    new Set(sourceDigests(sources)).size !== 1
  ) {
    fail('all cheek/lower-face sources must share the same governed provider run and canonical asset.');
  }

  if (
    sources.midfaceWidth.status === 'available' &&
    (
      sources.midfaceWidth.metric.metricRef !== MIDFACE_WIDTH_REF ||
      sources.midfaceWidth.metric.unit !== 'ratio' ||
      !Number.isFinite(sources.midfaceWidth.metric.value)
    )
  ) fail('FR211 available metric boundary drift.');
  if (
    sources.midfaceWidth.status === 'unavailable' &&
    sources.midfaceWidth.fallbackInvented !== false
  ) fail('FR211 unavailable source invented fallback.');

  if (
    sources.cheekProminence.status === 'available' &&
    (
      sources.cheekProminence.metric.metricRef !== CHEEK_PROMINENCE_REF ||
      sources.cheekProminence.metric.unit !== 'ratio' ||
      !Number.isFinite(sources.cheekProminence.metric.value)
    )
  ) fail('FR217 available metric boundary drift.');
  if (
    sources.cheekProminence.status === 'unavailable' &&
    sources.cheekProminence.fallbackInvented !== false
  ) fail('FR217 unavailable source invented fallback.');

  if (
    sources.lowerFaceWidth.status === 'available' &&
    (
      sources.lowerFaceWidth.metric.metricRef !== LOWER_FACE_WIDTH_REF ||
      sources.lowerFaceWidth.metric.unit !== 'ratio' ||
      !Number.isFinite(sources.lowerFaceWidth.metric.value)
    )
  ) fail('FR213 available metric boundary drift.');
  if (
    sources.lowerFaceWidth.status === 'unavailable' &&
    sources.lowerFaceWidth.fallbackInvented !== false
  ) fail('FR213 unavailable source invented fallback.');

  if (sources.lowerFaceContour.status === 'available') {
    if (
      sources.lowerFaceContour.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      sources.lowerFaceContour.coordinateUnit !== 'centimeter' ||
      sources.lowerFaceContour.pointCount !==
        sources.lowerFaceContour.points.length ||
      sources.lowerFaceContour.pointCount < 3 ||
      sources.lowerFaceContour.points.some((point) =>
        !Number.isFinite(point.x) || !Number.isFinite(point.y))
    ) {
      fail('FR216 available contour boundary drift.');
    }
  } else if (sources.lowerFaceContour.fallbackInvented !== false) {
    fail('FR216 unavailable source invented fallback.');
  }
}

export function materializeCanonicalCheekLowerFaceFeaturesFR286(
  sources: FR286ExistingSources,
): readonly FR286CheekLowerFaceFeature[] {
  assertFR286ProductColumnMap();
  assertSourceBoundary(sources);

  const features: FR286CheekLowerFaceFeature[] = [];

  if (sources.midfaceWidth.status === 'available') {
    features.push(availableScalar(
      'cheek_midface.visible_width_ratio',
      'cheek_mid_face',
      sources.midfaceWidth.metric.value,
      MIDFACE_WIDTH_REF,
    ));
  } else {
    features.push(unavailable(
      'cheek_midface.visible_width_ratio',
      'cheek_mid_face',
      'source_geometry_midface_width_unavailable',
      'canonical_metric_geometry',
      [MIDFACE_WIDTH_REF],
      sources.midfaceWidth.reason,
    ));
  }

  if (sources.cheekProminence.status === 'available') {
    features.push(availableScalar(
      'cheek_midface.visible_contour_prominence',
      'cheek_mid_face',
      sources.cheekProminence.metric.value,
      CHEEK_PROMINENCE_REF,
    ));
  } else {
    features.push(unavailable(
      'cheek_midface.visible_contour_prominence',
      'cheek_mid_face',
      'source_geometry_cheek_prominence_unavailable',
      'canonical_metric_geometry',
      [CHEEK_PROMINENCE_REF],
      sources.cheekProminence.reason,
    ));
  }

  features.push(unavailable(
    'cheek_midface.relative_3d_prominence',
    'cheek_mid_face',
    'rgb_relative_3d_provider_not_materialized',
    'rgb_relative_3d_provider_validation',
  ));

  if (sources.lowerFaceWidth.status === 'available') {
    features.push(availableScalar(
      'chin_lower_face.visible_width_ratio',
      'chin_lower_face',
      sources.lowerFaceWidth.metric.value,
      LOWER_FACE_WIDTH_REF,
    ));
  } else {
    features.push(unavailable(
      'chin_lower_face.visible_width_ratio',
      'chin_lower_face',
      'source_geometry_lower_face_width_unavailable',
      'canonical_metric_geometry',
      [LOWER_FACE_WIDTH_REF],
      sources.lowerFaceWidth.reason,
    ));
  }

  if (sources.lowerFaceContour.status === 'available') {
    features.push(Object.freeze({
      featureKey: 'chin_lower_face.visible_contour' as const,
      regionKey: 'chin_lower_face' as const,
      status: 'available' as const,
      value: Object.freeze({
        kind: 'canonical_contour_2d' as const,
        coordinateFrame:
          'canonical_aligned_right_handed_metric_xy' as const,
        coordinateUnit: 'centimeter' as const,
        points: Object.freeze(
          sources.lowerFaceContour.points.map((point) =>
            Object.freeze({
              x: finite(point.x, 'chin_lower_face.visible_contour.x'),
              y: finite(point.y, 'chin_lower_face.visible_contour.y'),
            })),
        ),
        pointCount: sources.lowerFaceContour.pointCount,
        persistenceAllowed: false as const,
      }),
      sourceMetricRefs: Object.freeze([]),
      quality: quality('governed_contour_geometry'),
      providerLandmarkIndicesExposed: false as const,
      rawLandmarksExposed: false as const,
      traditionalBindingApplied: false as const,
      classificationApplied: false as const,
      thresholdApplied: false as const,
    }));
  } else {
    features.push(unavailable(
      'chin_lower_face.visible_contour',
      'chin_lower_face',
      'source_geometry_lower_face_contour_unavailable',
      'governed_contour_geometry',
      [],
      sources.lowerFaceContour.reason,
    ));
  }

  features.push(unavailable(
    'chin_lower_face.chin_height_width_center_deviation',
    'chin_lower_face',
    'chin_dimension_extractor_not_materialized',
    'governed_contour_geometry',
  ));

  features.push(unavailable(
    'chin_lower_face.relative_projection',
    'chin_lower_face',
    'rgb_relative_3d_provider_not_materialized',
    'rgb_relative_3d_provider_validation',
  ));

  assertCanonicalCheekLowerFaceFeaturesFR286(features);
  return Object.freeze(features);
}

export function assembleCanonicalRgbSelfieMorphologyFR286(
  prior: FR285CanonicalRgbSelfieMorphologyPayload,
  cluster: readonly FR286CheekLowerFaceFeature[],
): FR286CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR285(prior);
  assertCanonicalCheekLowerFaceFeaturesFR286(cluster);

  const represented = new Set<FR284ProductFeatureKey>([
    ...prior.features.map((feature) => feature.featureKey),
    ...cluster.map((feature) => feature.featureKey),
  ]);
  const pendingFeatureKeys = FR286_PRODUCT_COLUMN_MAP
    .map((entry) => entry.featureKey)
    .filter((featureKey) => !represented.has(featureKey));

  const payload: FR286CanonicalRgbSelfieMorphologyPayload = Object.freeze({
    schemaVersion:
      'fr286-canonical-rgb-selfie-morphology-payload-v1' as const,
    contractVersion: FR286_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
    authorityState:
      'product_facing_canonical_observable_morphology_no_traditional_semantics' as const,
    captureBoundary: prior.captureBoundary,
    materializedRegionKeys: Object.freeze([
      'eye_pair',
      'mouth_lips',
      'cheek_mid_face',
      'chin_lower_face',
    ] as const),
    features: Object.freeze([
      ...prior.features,
      ...cluster,
    ]),
    pendingFeatureKeys: Object.freeze(pendingFeatureKeys),
    provenance: Object.freeze({
      sourceGeometryCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      sourceLipsCoordinateFrame: 'pose_normalized_face_2d' as const,
      sourceProviderRunRefExposed: false as const,
      sourceCanonicalAssetDigestExposed: false as const,
      sameProviderRunVerified: true as const,
      sameCanonicalAssetDigestVerified: true as const,
      derivedCanonicalContourPersistenceAllowed: false as const,
    }),
    authorityBoundary: prior.authorityBoundary,
  });
  assertCanonicalRgbSelfieMorphologyPayloadFR286(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR286(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR286CanonicalRgbSelfieMorphologyPayload {
  assertIssuedGovernedMetricGeometryFR77(fullFace);
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);
  if (
    fullFace.provider.providerRunRef !== lips.provenance.providerRunRef ||
    fullFace.provider.canonicalAssetDigest !==
      lips.provenance.canonicalAssetDigest
  ) {
    fail('FR77 full-face geometry and FR79 lips geometry must share provider run and canonical asset.');
  }

  const prior = extractCanonicalRgbSelfieMorphologyFR285(
    fullFace,
    lips,
  );

  const midfaceWidth = computeVisibleMidfaceBandFR211(fullFace, lips);
  assertVisibleMidfaceBandFR211(midfaceWidth);

  const cheekProminence = computeVisibleCheekContourProminenceFR217(
    fullFace,
    lips,
  );
  assertVisibleCheekContourProminenceFR217(cheekProminence);

  const lowerFaceWidth = computeVisibleLowerFaceWidthFR213(
    fullFace,
    lips,
  );
  assertVisibleLowerFaceWidthFR213(lowerFaceWidth);

  const lowerFaceContour = computeCanonicalVisibleLowerFaceContourFR216(
    fullFace,
    lips,
  );
  assertCanonicalVisibleLowerFaceContourFR216(lowerFaceContour);

  return assembleCanonicalRgbSelfieMorphologyFR286(
    prior,
    materializeCanonicalCheekLowerFaceFeaturesFR286({
      midfaceWidth,
      cheekProminence,
      lowerFaceWidth,
      lowerFaceContour,
    }),
  );
}

export function assertCanonicalCheekLowerFaceFeaturesFR286(
  features: readonly FR286CheekLowerFaceFeature[],
): void {
  const required: readonly FR286FeatureKey[] = [
    'cheek_midface.visible_width_ratio',
    'cheek_midface.visible_contour_prominence',
    'cheek_midface.relative_3d_prominence',
    'chin_lower_face.visible_width_ratio',
    'chin_lower_face.visible_contour',
    'chin_lower_face.chin_height_width_center_deviation',
    'chin_lower_face.relative_projection',
  ];
  if (
    features.length !== required.length ||
    new Set(features.map((feature) => feature.featureKey)).size !==
      required.length ||
    required.some((key) =>
      !features.some((feature) => feature.featureKey === key))
  ) {
    fail('cluster must cover the exact seven FR282 cheek/lower-face columns.');
  }

  for (const feature of features) {
    if (
      feature.providerLandmarkIndicesExposed !== false ||
      feature.rawLandmarksExposed !== false ||
      feature.traditionalBindingApplied !== false ||
      feature.classificationApplied !== false ||
      feature.thresholdApplied !== false ||
      feature.quality.poseAcceptanceThresholdIssued !== false ||
      feature.quality.correctionApplied !== false ||
      feature.quality.currentCapturePoseAdjudication !== 'not_issued'
    ) {
      fail(`feature authority boundary drift: ${feature.featureKey}.`);
    }
    if (feature.status === 'available') {
      if (feature.value.kind === 'scalar') {
        finite(feature.value.value, feature.featureKey);
      } else {
        if (
          feature.value.persistenceAllowed !== false ||
          feature.value.pointCount !== feature.value.points.length ||
          feature.value.pointCount < 3
        ) {
          fail('canonical contour boundary drift.');
        }
      }
    } else if (feature.fallbackInvented !== false) {
      fail(`${feature.featureKey} unavailable feature invented fallback.`);
    }
  }

  const relativeCheek = features.find((feature) =>
    feature.featureKey === 'cheek_midface.relative_3d_prominence');
  const chinDimensions = features.find((feature) =>
    feature.featureKey ===
      'chin_lower_face.chin_height_width_center_deviation');
  const relativeChin = features.find((feature) =>
    feature.featureKey === 'chin_lower_face.relative_projection');
  if (
    relativeCheek?.status !== 'unavailable' ||
    relativeCheek.reason !==
      'rgb_relative_3d_provider_not_materialized' ||
    chinDimensions?.status !== 'unavailable' ||
    chinDimensions.reason !==
      'chin_dimension_extractor_not_materialized' ||
    relativeChin?.status !== 'unavailable' ||
    relativeChin.reason !==
      'rgb_relative_3d_provider_not_materialized'
  ) {
    fail('FR282 cheek/lower-face gaps must remain explicit.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR286(
  payload: FR286CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR286ProductColumnMap();
  if (
    payload.schemaVersion !==
      'fr286-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR286_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_canonical_observable_morphology_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }
  if (
    payload.materializedRegionKeys.length !== 4 ||
    payload.materializedRegionKeys[0] !== 'eye_pair' ||
    payload.materializedRegionKeys[1] !== 'mouth_lips' ||
    payload.materializedRegionKeys[2] !== 'cheek_mid_face' ||
    payload.materializedRegionKeys[3] !== 'chin_lower_face'
  ) {
    fail('materialized region boundary drift.');
  }
  if (
    payload.features.length !== 18 ||
    new Set(payload.features.map((feature) => feature.featureKey)).size !== 18 ||
    payload.pendingFeatureKeys.length !== 11
  ) {
    fail('represented/pending FR282 feature cardinality drift.');
  }
  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance.sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.sameProviderRunVerified !== true ||
    payload.provenance.sameCanonicalAssetDigestVerified !== true ||
    payload.provenance.derivedCanonicalContourPersistenceAllowed !== false ||
    Object.entries(payload.authorityBoundary).some(([, value]) =>
      value !== false)
  ) {
    fail('payload provenance or authority widened.');
  }
}
