import {
  assertCanonicalRgbSelfieMorphologyPayloadFR284,
  extractCanonicalEyeMorphologyFR284,
  type FR284CanonicalMorphologyFeature,
  type FR284CanonicalRgbSelfieMorphologyPayload,
  type FR284FeatureQualityContext,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedNeutralMouthContourMetricFR80,
  computeNeutralMouthContourMetricFR80,
  type NeutralMouthContourMetricFR80V1,
} from './neutral-mouth-contour-metric-fr80.js';
import {
  assertIssuedNeutralMouthRelativeSizeMetricFR82,
  computeNeutralMouthRelativeSizeMetricFR82,
  type NeutralMouthRelativeSizeMetricFR82V1,
} from './neutral-mouth-relative-size-metric-fr82.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertVisibleMouthCornerOrientationFR212,
  computeVisibleMouthCornerOrientationFR212,
  type FR212MouthCornerOrientationResult,
} from './visible-mouth-corner-orientation-fr212.js';
import {
  assertRoleFreeMouthOutlineAngularityFR214,
  computeRoleFreeMouthOutlineAngularityFR214,
  type FR214MouthOutlineAngularityResult,
} from './role-free-mouth-outline-angularity-fr214.js';
import {
  FR285_PRODUCT_COLUMN_MAP,
  assertFR285ProductColumnMap,
} from './rgb-selfie-product-column-map-fr285.js';
import type {
  FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR285_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR285-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export type FR285MouthFeatureKey =
  | 'mouth.width_and_relative_size'
  | 'mouth.corner_orientation'
  | 'mouth.outline_angularity'
  | 'mouth.visible_lip_fullness'
  | 'mouth.philtrum_length_width'
  | 'mouth.visible_lip_color';

export interface FR285ContinuousAxisValue {
  readonly axisKey: string;
  readonly value: number;
  readonly unit: 'ratio' | 'degree';
  readonly sourceMetricRef: string;
}

export type FR285MouthFeature =
  | Readonly<{
      featureKey: FR285MouthFeatureKey;
      regionKey: 'mouth_lips';
      status: 'available';
      value:
        | Readonly<{
            kind: 'scalar';
            value: number;
            unit: 'ratio' | 'degree';
          }>
        | Readonly<{
            kind: 'continuous_axes';
            axes: readonly FR285ContinuousAxisValue[];
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
      featureKey: FR285MouthFeatureKey;
      regionKey: 'mouth_lips';
      status: 'unavailable';
      reason:
        | 'source_geometry_mouth_corner_orientation_unavailable'
        | 'governed_lip_fullness_extractor_not_materialized'
        | 'philtrum_extractor_not_materialized'
        | 'appearance_model_extractor_not_materialized';
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

export interface FR285CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion: 'fr285-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion: typeof FR285_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_canonical_observable_morphology_no_traditional_semantics';
  readonly captureBoundary: {
    readonly cameraClass: 'ordinary_smartphone_rgb_front_camera';
    readonly distanceCm: readonly [25, 30];
    readonly specialDepthHardwareRequired: false;
  };
  readonly materializedRegionKeys: readonly ['eye_pair', 'mouth_lips'];
  readonly features: readonly (
    | FR284CanonicalMorphologyFeature
    | FR285MouthFeature
  )[];
  readonly pendingFeatureKeys: readonly FR284ProductFeatureKey[];
  readonly provenance: {
    readonly sourceGeometryCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly sourceLipsCoordinateFrame: 'pose_normalized_face_2d';
    readonly sourceGeometryProviderOpaque: true;
    readonly sourceProviderRunRefExposed: false;
    readonly sourceCanonicalAssetDigestExposed: false;
    readonly sameProviderRunVerified: true;
    readonly sameCanonicalAssetDigestVerified: true;
    readonly sourceContracts: readonly [
      'FR284-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
      'fr80-neutral-mouth-contour-metric-v1',
      'fr82-neutral-mouth-relative-size-metric-v1',
      'FR212-VISIBLE-MOUTH-CORNER-ORIENTATION-v1',
      'FR214-ROLE-FREE-MOUTH-OUTLINE-ANGULARITY-v1',
    ];
  };
  readonly authorityBoundary: {
    readonly rawImageExposed: false;
    readonly rawLandmarksExposed: false;
    readonly providerLandmarkIndicesExposed: false;
    readonly identityRecognitionApplied: false;
    readonly biometricTemplateCreated: false;
    readonly depthHardwareRequired: false;
    readonly physicalMillimeterGroundTruthClaimed: false;
    readonly traditionalInterpretationIncluded: false;
    readonly traditionalBindingIssued: false;
    readonly thresholdIssued: false;
    readonly correctionFormulaApplied: false;
  };
}

export interface FR285ExistingMouthSources {
  readonly contour: NeutralMouthContourMetricFR80V1;
  readonly relativeSize: NeutralMouthRelativeSizeMetricFR82V1;
  readonly corner: FR212MouthCornerOrientationResult;
  readonly angularity: FR214MouthOutlineAngularityResult;
}

const MOUTH_ASPECT_REF =
  'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0';
const MOUTH_RELATIVE_SIZE_REF =
  'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0';
const MOUTH_CORNER_REF =
  'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0';
const MOUTH_ANGULARITY_REF =
  'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0';

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-285 ${message}`);
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
  featureKey: FR285MouthFeatureKey,
  value: number,
  unit: 'ratio' | 'degree',
  sourceMetricRef: string,
  featureQuality: FR284FeatureQualityContext,
): FR285MouthFeature {
  return Object.freeze({
    featureKey,
    regionKey: 'mouth_lips' as const,
    status: 'available' as const,
    value: Object.freeze({
      kind: 'scalar' as const,
      value: finite(value, featureKey),
      unit,
    }),
    sourceMetricRefs: Object.freeze([sourceMetricRef]),
    quality: featureQuality,
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  });
}

function unavailable(
  featureKey: FR285MouthFeatureKey,
  reason: Extract<FR285MouthFeature, { status: 'unavailable' }>['reason'],
  featureQuality: FR284FeatureQualityContext,
  sourceMetricRefs: readonly string[] = [],
  sourceReason?: string,
): FR285MouthFeature {
  const base = {
    featureKey,
    regionKey: 'mouth_lips' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    sourceMetricRefs: Object.freeze([...sourceMetricRefs]),
    quality: featureQuality,
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

function assertSourceMetricBoundary(
  sources: FR285ExistingMouthSources,
): void {
  if (
    sources.contour.schemaVersion !== 'fr80-neutral-mouth-contour-metric-v1' ||
    sources.contour.metric.metricRef !== MOUTH_ASPECT_REF ||
    sources.contour.metric.unit !== 'ratio' ||
    !Number.isFinite(sources.contour.metric.value) ||
    sources.contour.metric.classificationApplied !== false ||
    sources.contour.metric.calibrationApplied !== false ||
    sources.contour.metric.traditionalBindingApplied !== false
  ) {
    fail('FR80 source boundary drift.');
  }

  if (
    sources.relativeSize.schemaVersion !==
      'fr82-neutral-mouth-relative-size-metric-v1' ||
    sources.relativeSize.metric.metricRef !== MOUTH_RELATIVE_SIZE_REF ||
    sources.relativeSize.metric.unit !== 'ratio' ||
    !Number.isFinite(sources.relativeSize.metric.value) ||
    sources.relativeSize.metric.classificationApplied !== false ||
    sources.relativeSize.metric.calibrationApplied !== false ||
    sources.relativeSize.metric.traditionalBindingApplied !== false
  ) {
    fail('FR82 source boundary drift.');
  }

  if (
    sources.angularity.schemaVersion !== 'fr214-mouth-outline-angularity-v1' ||
    sources.angularity.metric.metricRef !== MOUTH_ANGULARITY_REF ||
    sources.angularity.metric.unit !== 'degree' ||
    !Number.isFinite(sources.angularity.metric.value)
  ) {
    fail('FR214 source boundary drift.');
  }

  if (
    sources.corner.schemaVersion !== 'fr212-mouth-corner-orientation-v1'
  ) {
    fail('FR212 source boundary drift.');
  }
  if (
    sources.corner.status === 'available' &&
    (
      sources.corner.metric.metricRef !== MOUTH_CORNER_REF ||
      sources.corner.metric.unit !== 'ratio' ||
      !Number.isFinite(sources.corner.metric.value)
    )
  ) {
    fail('FR212 available metric boundary drift.');
  }
  if (
    sources.corner.status === 'unavailable' &&
    sources.corner.fallbackInvented !== false
  ) {
    fail('FR212 unavailable source invented a fallback.');
  }

  const runRefs = [
    sources.contour.provenance.providerRunRef,
    sources.relativeSize.provenance.providerRunRef,
    sources.corner.source.fr79ProviderRunRef,
    sources.angularity.source.fr79ProviderRunRef,
  ];
  const digests = [
    sources.contour.provenance.canonicalAssetDigest,
    sources.relativeSize.provenance.canonicalAssetDigest,
    sources.corner.source.fr79CanonicalAssetDigest,
    sources.angularity.source.fr79CanonicalAssetDigest,
  ];
  if (new Set(runRefs).size !== 1 || new Set(digests).size !== 1) {
    fail('mouth source metrics must originate from the same governed provider run and canonical asset.');
  }
}

export function materializeCanonicalMouthFeaturesFR285(
  sources: FR285ExistingMouthSources,
): readonly FR285MouthFeature[] {
  assertFR285ProductColumnMap();
  assertSourceMetricBoundary(sources);

  const features: FR285MouthFeature[] = [];

  features.push(Object.freeze({
    featureKey: 'mouth.width_and_relative_size' as const,
    regionKey: 'mouth_lips' as const,
    status: 'available' as const,
    value: Object.freeze({
      kind: 'continuous_axes' as const,
      axes: Object.freeze([
        Object.freeze({
          axisKey: 'bounding_box_aspect_ratio',
          value: finite(
            sources.contour.metric.value,
            'mouth.width_and_relative_size.bounding_box_aspect_ratio',
          ),
          unit: 'ratio' as const,
          sourceMetricRef: MOUTH_ASPECT_REF,
        }),
        Object.freeze({
          axisKey: 'horizontal_span_to_full_mesh_horizontal_span_ratio',
          value: finite(
            sources.relativeSize.metric.value,
            'mouth.width_and_relative_size.horizontal_span_to_full_mesh_horizontal_span_ratio',
          ),
          unit: 'ratio' as const,
          sourceMetricRef: MOUTH_RELATIVE_SIZE_REF,
        }),
      ]),
    }),
    sourceMetricRefs: Object.freeze([
      MOUTH_ASPECT_REF,
      MOUTH_RELATIVE_SIZE_REF,
    ]),
    quality: quality('governed_contour_geometry'),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  }));

  if (sources.corner.status === 'available') {
    features.push(availableScalar(
      'mouth.corner_orientation',
      sources.corner.metric.value,
      'ratio',
      MOUTH_CORNER_REF,
      quality('governed_contour_geometry'),
    ));
  } else {
    features.push(unavailable(
      'mouth.corner_orientation',
      'source_geometry_mouth_corner_orientation_unavailable',
      quality('governed_contour_geometry'),
      Object.freeze([MOUTH_CORNER_REF]),
      sources.corner.reason,
    ));
  }

  features.push(availableScalar(
    'mouth.outline_angularity',
    sources.angularity.metric.value,
    'degree',
    MOUTH_ANGULARITY_REF,
    quality('governed_contour_geometry'),
  ));

  features.push(unavailable(
    'mouth.visible_lip_fullness',
    'governed_lip_fullness_extractor_not_materialized',
    quality('governed_contour_geometry'),
  ));
  features.push(unavailable(
    'mouth.philtrum_length_width',
    'philtrum_extractor_not_materialized',
    quality('segmentation_and_visibility'),
  ));
  features.push(unavailable(
    'mouth.visible_lip_color',
    'appearance_model_extractor_not_materialized',
    quality('appearance_image_quality'),
  ));

  assertCanonicalMouthFeaturesFR285(features);
  return Object.freeze(features);
}

export function assembleCanonicalRgbSelfieMorphologyFR285(
  eyePayload: FR284CanonicalRgbSelfieMorphologyPayload,
  mouthFeatures: readonly FR285MouthFeature[],
): FR285CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR284(eyePayload);
  assertCanonicalMouthFeaturesFR285(mouthFeatures);

  const featureKeys = new Set<FR284ProductFeatureKey>([
    ...eyePayload.features.map((feature) => feature.featureKey),
    ...mouthFeatures.map((feature) => feature.featureKey),
  ]);
  const pendingFeatureKeys = FR285_PRODUCT_COLUMN_MAP
    .map((entry) => entry.featureKey)
    .filter((featureKey) => !featureKeys.has(featureKey));

  const payload: FR285CanonicalRgbSelfieMorphologyPayload = Object.freeze({
    schemaVersion: 'fr285-canonical-rgb-selfie-morphology-payload-v1' as const,
    contractVersion: FR285_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
    authorityState:
      'product_facing_canonical_observable_morphology_no_traditional_semantics' as const,
    captureBoundary: eyePayload.captureBoundary,
    materializedRegionKeys: Object.freeze([
      'eye_pair',
      'mouth_lips',
    ] as const),
    features: Object.freeze([
      ...eyePayload.features,
      ...mouthFeatures,
    ]),
    pendingFeatureKeys: Object.freeze(pendingFeatureKeys),
    provenance: Object.freeze({
      sourceGeometryCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      sourceLipsCoordinateFrame: 'pose_normalized_face_2d' as const,
      sourceGeometryProviderOpaque: true as const,
      sourceProviderRunRefExposed: false as const,
      sourceCanonicalAssetDigestExposed: false as const,
      sameProviderRunVerified: true as const,
      sameCanonicalAssetDigestVerified: true as const,
      sourceContracts: Object.freeze([
        'FR284-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
        'fr80-neutral-mouth-contour-metric-v1',
        'fr82-neutral-mouth-relative-size-metric-v1',
        'FR212-VISIBLE-MOUTH-CORNER-ORIENTATION-v1',
        'FR214-ROLE-FREE-MOUTH-OUTLINE-ANGULARITY-v1',
      ] as const),
    }),
    authorityBoundary: Object.freeze({
      rawImageExposed: false as const,
      rawLandmarksExposed: false as const,
      providerLandmarkIndicesExposed: false as const,
      identityRecognitionApplied: false as const,
      biometricTemplateCreated: false as const,
      depthHardwareRequired: false as const,
      physicalMillimeterGroundTruthClaimed: false as const,
      traditionalInterpretationIncluded: false as const,
      traditionalBindingIssued: false as const,
      thresholdIssued: false as const,
      correctionFormulaApplied: false as const,
    }),
  });
  assertCanonicalRgbSelfieMorphologyPayloadFR285(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR285(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR285CanonicalRgbSelfieMorphologyPayload {
  assertIssuedGovernedMetricGeometryFR77(fullFace);
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);
  if (
    fullFace.provider.providerRunRef !== lips.provenance.providerRunRef ||
    fullFace.provider.canonicalAssetDigest !==
      lips.provenance.canonicalAssetDigest
  ) {
    fail('FR77 full-face geometry and FR79 lips geometry must share provider run and canonical asset.');
  }

  const eyePayload = extractCanonicalEyeMorphologyFR284(fullFace);

  const contour = computeNeutralMouthContourMetricFR80(lips);
  assertIssuedNeutralMouthContourMetricFR80(contour);

  const relativeSize = computeNeutralMouthRelativeSizeMetricFR82(
    fullFace,
    lips,
  );
  assertIssuedNeutralMouthRelativeSizeMetricFR82(relativeSize);

  const corner = computeVisibleMouthCornerOrientationFR212(lips);
  assertVisibleMouthCornerOrientationFR212(corner);

  const angularity = computeRoleFreeMouthOutlineAngularityFR214(lips);
  assertRoleFreeMouthOutlineAngularityFR214(angularity);

  return assembleCanonicalRgbSelfieMorphologyFR285(
    eyePayload,
    materializeCanonicalMouthFeaturesFR285({
      contour,
      relativeSize,
      corner,
      angularity,
    }),
  );
}

export function assertCanonicalMouthFeaturesFR285(
  features: readonly FR285MouthFeature[],
): void {
  const required: readonly FR285MouthFeatureKey[] = [
    'mouth.width_and_relative_size',
    'mouth.corner_orientation',
    'mouth.outline_angularity',
    'mouth.visible_lip_fullness',
    'mouth.philtrum_length_width',
    'mouth.visible_lip_color',
  ];
  if (
    features.length !== required.length ||
    new Set(features.map((feature) => feature.featureKey)).size !== required.length ||
    required.some((key) =>
      !features.some((feature) => feature.featureKey === key))
  ) {
    fail('mouth feature set must cover the exact six FR282 mouth columns.');
  }

  for (const feature of features) {
    if (
      feature.regionKey !== 'mouth_lips' ||
      feature.providerLandmarkIndicesExposed !== false ||
      feature.rawLandmarksExposed !== false ||
      feature.traditionalBindingApplied !== false ||
      feature.classificationApplied !== false ||
      feature.thresholdApplied !== false ||
      feature.quality.poseAcceptanceThresholdIssued !== false ||
      feature.quality.correctionApplied !== false ||
      feature.quality.currentCapturePoseAdjudication !== 'not_issued'
    ) {
      fail(`mouth feature authority boundary drift: ${feature.featureKey}.`);
    }
    if (feature.status === 'available') {
      if (feature.value.kind === 'scalar') {
        finite(feature.value.value, feature.featureKey);
      } else {
        if (feature.value.axes.length === 0) {
          fail(`${feature.featureKey} continuous axes must not be empty.`);
        }
        for (const axis of feature.value.axes) {
          finite(axis.value, `${feature.featureKey}.${axis.axisKey}`);
        }
      }
    } else if (feature.fallbackInvented !== false) {
      fail(`${feature.featureKey} unavailable feature invented a fallback.`);
    }
  }

  const fullness = features.find((feature) =>
    feature.featureKey === 'mouth.visible_lip_fullness');
  const philtrum = features.find((feature) =>
    feature.featureKey === 'mouth.philtrum_length_width');
  const color = features.find((feature) =>
    feature.featureKey === 'mouth.visible_lip_color');
  if (
    fullness?.status !== 'unavailable' ||
    fullness.reason !==
      'governed_lip_fullness_extractor_not_materialized' ||
    philtrum?.status !== 'unavailable' ||
    philtrum.reason !== 'philtrum_extractor_not_materialized' ||
    color?.status !== 'unavailable' ||
    color.reason !== 'appearance_model_extractor_not_materialized'
  ) {
    fail('unimplemented FR282 mouth columns must remain explicitly unavailable.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR285(
  payload: FR285CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR285ProductColumnMap();
  if (
    payload.schemaVersion !==
      'fr285-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR285_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_canonical_observable_morphology_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }
  if (
    payload.captureBoundary.cameraClass !==
      'ordinary_smartphone_rgb_front_camera' ||
    payload.captureBoundary.distanceCm[0] !== 25 ||
    payload.captureBoundary.distanceCm[1] !== 30 ||
    payload.captureBoundary.specialDepthHardwareRequired !== false
  ) {
    fail('capture boundary drift.');
  }
  if (
    payload.materializedRegionKeys.length !== 2 ||
    payload.materializedRegionKeys[0] !== 'eye_pair' ||
    payload.materializedRegionKeys[1] !== 'mouth_lips'
  ) {
    fail('materialized region boundary drift.');
  }

  const keys = payload.features.map((feature) => feature.featureKey);
  if (keys.length !== 11 || new Set(keys).size !== 11) {
    fail('combined canonical feature cardinality drift.');
  }
  if (payload.pendingFeatureKeys.length !== 18) {
    fail('pending FR282 feature cardinality drift.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance.sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.sameProviderRunVerified !== true ||
    payload.provenance.sameCanonicalAssetDigestVerified !== true ||
    Object.entries(payload.authorityBoundary).some(([, value]) =>
      value !== false)
  ) {
    fail('payload provenance or authority widened.');
  }
}
