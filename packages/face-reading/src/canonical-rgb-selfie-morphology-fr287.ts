import {
  assertCanonicalRgbSelfieMorphologyPayloadFR286,
  extractCanonicalRgbSelfieMorphologyFR286,
  type FR286CanonicalRgbSelfieMorphologyPayload,
  type FR286CheekLowerFaceFeature,
} from './canonical-rgb-selfie-morphology-fr286.js';
import type {
  FR284CanonicalMorphologyFeature,
  FR284FeatureQualityContext,
} from './canonical-rgb-selfie-morphology-fr284.js';
import type {
  FR285MouthFeature,
} from './canonical-rgb-selfie-morphology-fr285.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  computeNoseBridgeCenterlineDeviation,
  computeNoseTipContourCircularity,
  type NeutralGeometryMetricResult,
  type NoseBridgeGeometryInput,
  type NoseTipContourGeometryInput,
} from './nose-geometry.js';
import {
  FR287_PRODUCT_COLUMN_MAP,
  assertFR287ProductColumnMap,
} from './rgb-selfie-product-column-map-fr287.js';
import type {
  FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR287_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR287-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export type FR287NoseFeatureKey =
  | 'nose.bridge_centerline_deviation'
  | 'nose.tip_contour_circularity'
  | 'nose.alar_width_and_nostril_geometry'
  | 'nose.tip_bridge_relative_projection';

export interface FR287GovernedNeutralNoseGeometryInput {
  readonly schemaVersion:
    'fr287-governed-neutral-nose-geometry-input-v1';
  readonly authorityState:
    'governed_neutral_nose_geometry_input_only';
  readonly bridge: NoseBridgeGeometryInput;
  readonly tip: NoseTipContourGeometryInput;
  readonly sameCaptureVerified: true;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly traditionalBindingApplied: false;
}

export type FR287NoseFeature =
  | Readonly<{
      featureKey: FR287NoseFeatureKey;
      regionKey: 'nose';
      status: 'available';
      value: Readonly<{
        kind: 'scalar';
        value: number;
        unit: 'ratio';
      }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceLandmarkRefsExposed: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }>
  | Readonly<{
      featureKey: FR287NoseFeatureKey;
      regionKey: 'nose';
      status: 'unavailable';
      reason:
        | 'alar_nostril_extractor_not_materialized'
        | 'rgb_relative_3d_provider_not_materialized';
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceLandmarkRefsExposed: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }>;

export interface FR287CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr287-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR287_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_canonical_observable_morphology_no_traditional_semantics';
  readonly captureBoundary:
    FR286CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys: readonly [
    'eye_pair',
    'mouth_lips',
    'cheek_mid_face',
    'chin_lower_face',
    'nose',
  ];
  readonly features: readonly (
    | FR284CanonicalMorphologyFeature
    | FR285MouthFeature
    | FR286CheekLowerFaceFeature
    | FR287NoseFeature
  )[];
  readonly pendingFeatureKeys: readonly FR284ProductFeatureKey[];
  readonly provenance: {
    readonly sourceGeometryCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly sourceLipsCoordinateFrame: 'pose_normalized_face_2d';
    readonly sourceNoseCoordinateFrame: 'pose_normalized_face_2d';
    readonly sourceProviderRunRefExposed: false;
    readonly sourceCanonicalAssetDigestExposed: false;
    readonly sourceLandmarkRefsExposed: false;
    readonly sameCaptureNoseGeometryVerified: true;
  };
  readonly authorityBoundary:
    FR286CanonicalRgbSelfieMorphologyPayload['authorityBoundary'];
}

const BRIDGE_REF =
  'neutral.nose.bridge.centerline_rms_deviation@0.1.0';
const TIP_REF =
  'neutral.nose.tip.contour_circularity@0.1.0';

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-287 ${message}`);
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

function assertNoseInputBoundary(
  input: FR287GovernedNeutralNoseGeometryInput,
): void {
  if (
    input.schemaVersion !==
      'fr287-governed-neutral-nose-geometry-input-v1' ||
    input.authorityState !==
      'governed_neutral_nose_geometry_input_only' ||
    input.sameCaptureVerified !== true ||
    input.providerSpecificIndicesExposed !== false ||
    input.rawLandmarksExposed !== false ||
    input.traditionalBindingApplied !== false
  ) {
    fail('governed neutral nose input authority drift.');
  }

  const bridge = input.bridge.provenance;
  const tip = input.tip.provenance;
  if (
    bridge.coordinateFrame !== 'pose_normalized_face_2d' ||
    tip.coordinateFrame !== 'pose_normalized_face_2d' ||
    bridge.poseCompensated !== true ||
    tip.poseCompensated !== true
  ) {
    fail('nose input must remain pose-normalized 2D geometry.');
  }

  if (
    bridge.observationContractVersion !==
      tip.observationContractVersion ||
    bridge.extractorVersion !== tip.extractorVersion ||
    bridge.modelVersion !== tip.modelVersion
  ) {
    fail('bridge and tip geometry must originate from the same governed nose observation/extractor/model contract.');
  }

  if (
    bridge.sourceLandmarkRefs.length === 0 ||
    tip.sourceLandmarkRefs.length === 0
  ) {
    fail('nose source provenance must retain internal source references.');
  }
}

function assertMetric(
  metric: NeutralGeometryMetricResult,
  expectedKey:
    | 'neutral.nose.bridge.centerline_rms_deviation'
    | 'neutral.nose.tip.contour_circularity',
): void {
  if (
    metric.metricKey !== expectedKey ||
    metric.metricVersion !== '0.1.0' ||
    metric.unit !== 'ratio' ||
    metric.coordinateFrame !== 'pose_normalized_face_2d' ||
    !Number.isFinite(metric.value) ||
    metric.classificationApplied !== false ||
    metric.calibrationApplied !== false ||
    metric.sourceLandmarkRefs.length === 0
  ) {
    fail(`nose metric boundary drift: ${expectedKey}.`);
  }
}

function available(
  featureKey:
    | 'nose.bridge_centerline_deviation'
    | 'nose.tip_contour_circularity',
  metric: NeutralGeometryMetricResult,
  sourceMetricRef: string,
): FR287NoseFeature {
  return Object.freeze({
    featureKey,
    regionKey: 'nose' as const,
    status: 'available' as const,
    value: Object.freeze({
      kind: 'scalar' as const,
      value: finite(metric.value, featureKey),
      unit: 'ratio' as const,
    }),
    sourceMetricRefs: Object.freeze([sourceMetricRef]),
    quality: quality('governed_contour_geometry'),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceLandmarkRefsExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  });
}

function unavailable(
  featureKey:
    | 'nose.alar_width_and_nostril_geometry'
    | 'nose.tip_bridge_relative_projection',
  reason:
    | 'alar_nostril_extractor_not_materialized'
    | 'rgb_relative_3d_provider_not_materialized',
  dependency: FR284FeatureQualityContext['dependency'],
): FR287NoseFeature {
  return Object.freeze({
    featureKey,
    regionKey: 'nose' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    sourceMetricRefs: Object.freeze([]),
    quality: quality(dependency),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceLandmarkRefsExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  });
}

export function materializeCanonicalNoseFeaturesFR287(
  input: FR287GovernedNeutralNoseGeometryInput,
): readonly FR287NoseFeature[] {
  assertFR287ProductColumnMap();
  assertNoseInputBoundary(input);

  const bridgeMetric = computeNoseBridgeCenterlineDeviation(
    input.bridge,
  );
  const tipMetric = computeNoseTipContourCircularity(input.tip);
  assertMetric(
    bridgeMetric,
    'neutral.nose.bridge.centerline_rms_deviation',
  );
  assertMetric(
    tipMetric,
    'neutral.nose.tip.contour_circularity',
  );

  const features: readonly FR287NoseFeature[] = Object.freeze([
    available(
      'nose.bridge_centerline_deviation',
      bridgeMetric,
      BRIDGE_REF,
    ),
    available(
      'nose.tip_contour_circularity',
      tipMetric,
      TIP_REF,
    ),
    unavailable(
      'nose.alar_width_and_nostril_geometry',
      'alar_nostril_extractor_not_materialized',
      'segmentation_and_visibility',
    ),
    unavailable(
      'nose.tip_bridge_relative_projection',
      'rgb_relative_3d_provider_not_materialized',
      'rgb_relative_3d_provider_validation',
    ),
  ]);

  assertCanonicalNoseFeaturesFR287(features);
  return features;
}

export function assembleCanonicalRgbSelfieMorphologyFR287(
  prior: FR286CanonicalRgbSelfieMorphologyPayload,
  noseFeatures: readonly FR287NoseFeature[],
): FR287CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR286(prior);
  assertCanonicalNoseFeaturesFR287(noseFeatures);

  const represented = new Set<FR284ProductFeatureKey>([
    ...prior.features.map((feature) => feature.featureKey),
    ...noseFeatures.map((feature) => feature.featureKey),
  ]);

  const pendingFeatureKeys = FR287_PRODUCT_COLUMN_MAP
    .map((entry) => entry.featureKey)
    .filter((featureKey) => !represented.has(featureKey));

  const payload: FR287CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr287-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR287_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
      authorityState:
        'product_facing_canonical_observable_morphology_no_traditional_semantics' as const,
      captureBoundary: prior.captureBoundary,
      materializedRegionKeys: Object.freeze([
        'eye_pair',
        'mouth_lips',
        'cheek_mid_face',
        'chin_lower_face',
        'nose',
      ] as const),
      features: Object.freeze([
        ...prior.features,
        ...noseFeatures,
      ]),
      pendingFeatureKeys: Object.freeze(pendingFeatureKeys),
      provenance: Object.freeze({
        sourceGeometryCoordinateFrame:
          'canonical_aligned_right_handed_metric_3d' as const,
        sourceLipsCoordinateFrame:
          'pose_normalized_face_2d' as const,
        sourceNoseCoordinateFrame:
          'pose_normalized_face_2d' as const,
        sourceProviderRunRefExposed: false as const,
        sourceCanonicalAssetDigestExposed: false as const,
        sourceLandmarkRefsExposed: false as const,
        sameCaptureNoseGeometryVerified: true as const,
      }),
      authorityBoundary: prior.authorityBoundary,
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR287(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR287(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
): FR287CanonicalRgbSelfieMorphologyPayload {
  const prior = extractCanonicalRgbSelfieMorphologyFR286(
    fullFace,
    lips,
  );
  return assembleCanonicalRgbSelfieMorphologyFR287(
    prior,
    materializeCanonicalNoseFeaturesFR287(noseInput),
  );
}

export function assertCanonicalNoseFeaturesFR287(
  features: readonly FR287NoseFeature[],
): void {
  const required: readonly FR287NoseFeatureKey[] = [
    'nose.bridge_centerline_deviation',
    'nose.tip_contour_circularity',
    'nose.alar_width_and_nostril_geometry',
    'nose.tip_bridge_relative_projection',
  ];

  if (
    features.length !== required.length ||
    new Set(features.map((feature) => feature.featureKey)).size !==
      required.length ||
    required.some((key) =>
      !features.some((feature) => feature.featureKey === key))
  ) {
    fail('nose feature set must cover the exact four FR282 nose columns.');
  }

  for (const feature of features) {
    if (
      feature.regionKey !== 'nose' ||
      feature.providerLandmarkIndicesExposed !== false ||
      feature.rawLandmarksExposed !== false ||
      feature.sourceLandmarkRefsExposed !== false ||
      feature.traditionalBindingApplied !== false ||
      feature.classificationApplied !== false ||
      feature.thresholdApplied !== false ||
      feature.quality.poseAcceptanceThresholdIssued !== false ||
      feature.quality.correctionApplied !== false ||
      feature.quality.currentCapturePoseAdjudication !== 'not_issued'
    ) {
      fail(`nose feature authority drift: ${feature.featureKey}.`);
    }

    if (feature.status === 'available') {
      if (
        feature.value.kind !== 'scalar' ||
        feature.value.unit !== 'ratio'
      ) {
        fail(`nose scalar boundary drift: ${feature.featureKey}.`);
      }
      finite(feature.value.value, feature.featureKey);
    } else if (feature.fallbackInvented !== false) {
      fail(`${feature.featureKey} unavailable feature invented fallback.`);
    }
  }

  const bridge = features.find((feature) =>
    feature.featureKey === 'nose.bridge_centerline_deviation');
  const tip = features.find((feature) =>
    feature.featureKey === 'nose.tip_contour_circularity');
  const alar = features.find((feature) =>
    feature.featureKey === 'nose.alar_width_and_nostril_geometry');
  const projection = features.find((feature) =>
    feature.featureKey === 'nose.tip_bridge_relative_projection');

  if (
    bridge?.status !== 'available' ||
    bridge.sourceMetricRefs[0] !== BRIDGE_REF ||
    tip?.status !== 'available' ||
    tip.sourceMetricRefs[0] !== TIP_REF ||
    alar?.status !== 'unavailable' ||
    alar.reason !== 'alar_nostril_extractor_not_materialized' ||
    projection?.status !== 'unavailable' ||
    projection.reason !==
      'rgb_relative_3d_provider_not_materialized'
  ) {
    fail('FR282 nose availability boundary drift.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR287(
  payload: FR287CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR287ProductColumnMap();

  if (
    payload.schemaVersion !==
      'fr287-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR287_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_canonical_observable_morphology_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }

  if (
    payload.materializedRegionKeys.length !== 5 ||
    payload.materializedRegionKeys[4] !== 'nose'
  ) {
    fail('materialized nose region boundary drift.');
  }

  if (
    payload.features.length !== 22 ||
    new Set(payload.features.map((feature) => feature.featureKey)).size !==
      22 ||
    payload.pendingFeatureKeys.length !== 7
  ) {
    fail('represented/pending FR282 feature cardinality drift.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance.sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.sourceLandmarkRefsExposed !== false ||
    payload.provenance.sameCaptureNoseGeometryVerified !== true ||
    Object.entries(payload.authorityBoundary).some(([, value]) =>
      value !== false)
  ) {
    fail('payload provenance or authority widened.');
  }
}
