import {
  computeEyeAsymmetrySurfaceFR215,
  assertEyeAsymmetrySurfaceFR215,
  type FR215EyeAsymmetrySurface,
} from './eye-asymmetry-surface-fr215.js';
import {
  computeEyeNeutralAxisBundleFR210,
  assertEyeNeutralAxisBundleFR210,
  type FR210EyeAxis,
  type FR210EyeNeutralAxisBundle,
} from './eye-neutral-axis-bundle-fr210.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR284_PRODUCT_COLUMN_MAP,
  assertFR284ProductColumnMap,
  getFR284ProductColumn,
  type FR284ProductFeatureKey,
  type FR284QualityDependency,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR284_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR284-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export type FR284CanonicalFeatureUnit = 'ratio' | 'degree' | 'radian';

export type FR284ViewpointSensitivity =
  | 'not_characterized_by_fr283'
  | 'documented_low_angle_sensitivity_fr283'
  | 'not_applicable';

export interface FR284FeatureQualityContext {
  readonly dependency: FR284QualityDependency;
  readonly viewpointSensitivity: FR284ViewpointSensitivity;
  readonly evidenceRefs: readonly string[];
  readonly poseAcceptanceThresholdIssued: false;
  readonly correctionApplied: false;
  readonly currentCapturePoseAdjudication: 'not_issued';
}

export interface FR284ScalarFeatureValue {
  readonly kind: 'scalar';
  readonly value: number;
  readonly unit: FR284CanonicalFeatureUnit;
}

export interface FR284ContinuousAxisValue {
  readonly axisKey: string;
  readonly value: number;
  readonly unit: FR284CanonicalFeatureUnit;
  readonly sourceMetricRef: string;
}

export interface FR284ContinuousAxesFeatureValue {
  readonly kind: 'continuous_axes';
  readonly axes: readonly FR284ContinuousAxisValue[];
}

export type FR284CanonicalFeatureValue =
  | FR284ScalarFeatureValue
  | FR284ContinuousAxesFeatureValue;

interface FR284CanonicalFeatureBase {
  readonly featureKey: FR284ProductFeatureKey;
  readonly regionKey: 'eye_pair';
  readonly sourceMetricRefs: readonly string[];
  readonly quality: FR284FeatureQualityContext;
  readonly providerLandmarkIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly traditionalBindingApplied: false;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
}

export interface FR284AvailableCanonicalFeature
  extends FR284CanonicalFeatureBase {
  readonly status: 'available';
  readonly value: FR284CanonicalFeatureValue;
}

export interface FR284UnavailableCanonicalFeature
  extends FR284CanonicalFeatureBase {
  readonly status: 'unavailable';
  readonly reason:
    | 'source_geometry_eye_corner_tilt_unavailable'
    | 'image_model_extractor_not_materialized';
  readonly sourceReason?: string;
  readonly fallbackInvented: false;
}

export type FR284CanonicalMorphologyFeature =
  | FR284AvailableCanonicalFeature
  | FR284UnavailableCanonicalFeature;

export interface FR284CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion: 'fr284-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion: typeof FR284_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_canonical_observable_morphology_no_traditional_semantics';
  readonly captureBoundary: {
    readonly cameraClass: 'ordinary_smartphone_rgb_front_camera';
    readonly distanceCm: readonly [25, 30];
    readonly specialDepthHardwareRequired: false;
  };
  readonly materializedRegionKeys: readonly ['eye_pair'];
  readonly features: readonly FR284CanonicalMorphologyFeature[];
  readonly pendingFeatureKeys: readonly FR284ProductFeatureKey[];
  readonly provenance: {
    readonly sourceGeometryCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly sourceGeometryProviderOpaque: true;
    readonly sourceProviderRunRefExposed: false;
    readonly sourceCanonicalAssetDigestExposed: false;
    readonly sameGovernedGeometrySourceVerified: true;
    readonly sourceContracts: readonly [
      'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
      'FR215-ROLE-INVARIANT-EYE-ASYMMETRY-SURFACE-v1',
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

const WIDTH_HEIGHT_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0';
const SPACING_REF =
  'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0';
const OUTER_TILT_REF =
  'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0';
const ASYM_X_REF =
  'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0';
const ASYM_YX_REF =
  'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0';
const ASYM_TURN_REF =
  'neutral.eye_pair.asymmetry.absolute_mean_turning_angle_difference@0.1.0';

const FR283_EVIDENCE_REFS = Object.freeze([
  'packages/face-reading/src/observable-morphology-fr76-eye-chord-propagation-fr283.ts',
  'research/face-reading/evidence/fr283-fixed-still-fr76-eye-chord-propagation/fr283-empirical-evidence.json',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-284 ${message}`);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(`${label} must be finite.`);
  return value;
}

function quality(
  dependency: FR284QualityDependency,
  viewpointSensitivity: FR284ViewpointSensitivity,
  evidenceRefs: readonly string[] = [],
): FR284FeatureQualityContext {
  return Object.freeze({
    dependency,
    viewpointSensitivity,
    evidenceRefs: Object.freeze([...evidenceRefs]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

function availableScalar(
  featureKey: FR284ProductFeatureKey,
  value: number,
  unit: FR284CanonicalFeatureUnit,
  sourceMetricRef: string,
  featureQuality: FR284FeatureQualityContext,
): FR284AvailableCanonicalFeature {
  if (getFR284ProductColumn(featureKey).implementationState !== 'canonical_extractor_materialized') {
    fail(`attempted to materialize unauthorized column ${featureKey}.`);
  }
  return Object.freeze({
    featureKey,
    regionKey: 'eye_pair' as const,
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
  featureKey: FR284ProductFeatureKey,
  reason: FR284UnavailableCanonicalFeature['reason'],
  featureQuality: FR284FeatureQualityContext,
  sourceMetricRefs: readonly string[],
  sourceReason?: string,
): FR284UnavailableCanonicalFeature {
  const base = {
    featureKey,
    regionKey: 'eye_pair' as const,
    status: 'unavailable' as const,
    reason,
    sourceMetricRefs: Object.freeze([...sourceMetricRefs]),
    quality: featureQuality,
    fallbackInvented: false as const,
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

function assertAxis(
  axis: FR210EyeAxis,
  expectedAxisKey: FR210EyeAxis['axisKey'],
  expectedMetricRef: string,
  expectedUnit: FR210EyeAxis['unit'],
): void {
  if (
    axis.axisKey !== expectedAxisKey ||
    axis.sourceMetricRef !== expectedMetricRef ||
    axis.unit !== expectedUnit ||
    !Number.isFinite(axis.value) ||
    axis.classificationApplied !== false ||
    axis.thresholdApplied !== false ||
    axis.calibrationApplied !== false ||
    axis.traditionalBindingApplied !== false ||
    axis.anatomicalInterpretationAllowed !== false
  ) {
    fail(`source eye axis boundary drift: ${expectedAxisKey}.`);
  }
}

function buildEyeFeatures(
  eyeAxes: FR210EyeNeutralAxisBundle,
  asymmetry: FR215EyeAsymmetrySurface,
): readonly FR284CanonicalMorphologyFeature[] {
  assertEyeNeutralAxisBundleFR210(eyeAxes);
  assertEyeAsymmetrySurfaceFR215(asymmetry);

  if (
    eyeAxes.source.fr77ProviderRunRef !== asymmetry.source.fr77ProviderRunRef ||
    eyeAxes.source.fr77CanonicalAssetDigest !== asymmetry.source.fr77CanonicalAssetDigest
  ) {
    fail('FR210 and FR215 must originate from the same governed geometry source.');
  }

  assertAxis(
    eyeAxes.axes.geometricVerticalToHorizontalRatio,
    'geometric_vertical_to_horizontal_ratio',
    WIDTH_HEIGHT_REF,
    'ratio',
  );
  assertAxis(
    eyeAxes.axes.centroidSeparation,
    'centroid_separation',
    SPACING_REF,
    'ratio',
  );

  const features: FR284CanonicalMorphologyFeature[] = [
    availableScalar(
      'eye.width_height_ratio',
      eyeAxes.axes.geometricVerticalToHorizontalRatio.value,
      'ratio',
      WIDTH_HEIGHT_REF,
      quality(
        'canonical_metric_geometry',
        'not_characterized_by_fr283',
      ),
    ),
    availableScalar(
      'eye.inter_eye_spacing_ratio',
      eyeAxes.axes.centroidSeparation.value,
      'ratio',
      SPACING_REF,
      quality(
        'canonical_metric_geometry',
        'not_characterized_by_fr283',
      ),
    ),
  ];

  const tilt = eyeAxes.axes.outerCornerTilt;
  if ('status' in tilt) {
    features.push(unavailable(
      'eye.outer_corner_tilt',
      'source_geometry_eye_corner_tilt_unavailable',
      quality(
        'canonical_metric_geometry_and_fr283_viewpoint_context',
        'documented_low_angle_sensitivity_fr283',
        FR283_EVIDENCE_REFS,
      ),
      Object.freeze([OUTER_TILT_REF]),
      tilt.reason,
    ));
  } else {
    assertAxis(tilt, 'outer_corner_tilt', OUTER_TILT_REF, 'degree');
    features.push(availableScalar(
      'eye.outer_corner_tilt',
      tilt.value,
      'degree',
      OUTER_TILT_REF,
      quality(
        'canonical_metric_geometry_and_fr283_viewpoint_context',
        'documented_low_angle_sensitivity_fr283',
        FR283_EVIDENCE_REFS,
      ),
    ));
  }

  const asymmetryAxes = [
    {
      axisKey: 'horizontal_span_relative_difference',
      source: asymmetry.axes.horizontalSpanRelativeDifference,
      expectedMetricRef: ASYM_X_REF,
    },
    {
      axisKey: 'geometric_y_to_x_ratio_absolute_difference',
      source: asymmetry.axes.geometricYToXRatioAbsoluteDifference,
      expectedMetricRef: ASYM_YX_REF,
    },
    {
      axisKey: 'mean_turning_angle_absolute_difference',
      source: asymmetry.axes.meanTurningAngleAbsoluteDifference,
      expectedMetricRef: ASYM_TURN_REF,
    },
  ] as const;

  for (const entry of asymmetryAxes) {
    if (
      entry.source.metricRef !== entry.expectedMetricRef ||
      !Number.isFinite(entry.source.value) ||
      entry.source.value < 0
    ) {
      fail(`source eye asymmetry boundary drift: ${entry.axisKey}.`);
    }
  }

  features.push(Object.freeze({
    featureKey: 'eye.bilateral_shape_asymmetry' as const,
    regionKey: 'eye_pair' as const,
    status: 'available' as const,
    value: Object.freeze({
      kind: 'continuous_axes' as const,
      axes: Object.freeze(asymmetryAxes.map((entry) => Object.freeze({
        axisKey: entry.axisKey,
        value: entry.source.value,
        unit: entry.source.unit,
        sourceMetricRef: entry.source.metricRef,
      }))),
    }),
    sourceMetricRefs: Object.freeze([
      ASYM_X_REF,
      ASYM_YX_REF,
      ASYM_TURN_REF,
    ]),
    quality: quality(
      'canonical_metric_geometry',
      'not_characterized_by_fr283',
    ),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  }));

  features.push(unavailable(
    'eye.eyelid_crease_or_hooded_category',
    'image_model_extractor_not_materialized',
    quality(
      'appearance_image_quality',
      'not_applicable',
    ),
    Object.freeze([]),
  ));

  return Object.freeze(features);
}

export function materializeCanonicalEyeMorphologyFR284(
  eyeAxes: FR210EyeNeutralAxisBundle,
  asymmetry: FR215EyeAsymmetrySurface,
): FR284CanonicalRgbSelfieMorphologyPayload {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR284ProductColumnMap();

  const features = buildEyeFeatures(eyeAxes, asymmetry);
  const eyeFeatureKeys = new Set(features.map((feature) => feature.featureKey));

  const expectedEyeKeys = FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
    .featureEntries
    .filter((entry) => entry.regionKey === 'eye_pair')
    .map((entry) => entry.featureKey);
  if (
    features.length !== expectedEyeKeys.length ||
    expectedEyeKeys.some((key) => !eyeFeatureKeys.has(key as FR284ProductFeatureKey))
  ) {
    fail('eye cluster does not cover the exact FR282 eye-pair feature set.');
  }

  const pendingFeatureKeys = FR284_PRODUCT_COLUMN_MAP
    .map((entry) => entry.featureKey)
    .filter((featureKey) => !eyeFeatureKeys.has(featureKey));

  const payload: FR284CanonicalRgbSelfieMorphologyPayload = Object.freeze({
    schemaVersion: 'fr284-canonical-rgb-selfie-morphology-payload-v1' as const,
    contractVersion: FR284_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
    authorityState:
      'product_facing_canonical_observable_morphology_no_traditional_semantics' as const,
    captureBoundary: Object.freeze({
      cameraClass: 'ordinary_smartphone_rgb_front_camera' as const,
      distanceCm: Object.freeze([25, 30] as const),
      specialDepthHardwareRequired: false as const,
    }),
    materializedRegionKeys: Object.freeze(['eye_pair'] as const),
    features,
    pendingFeatureKeys: Object.freeze(pendingFeatureKeys),
    provenance: Object.freeze({
      sourceGeometryCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      sourceGeometryProviderOpaque: true as const,
      sourceProviderRunRefExposed: false as const,
      sourceCanonicalAssetDigestExposed: false as const,
      sameGovernedGeometrySourceVerified: true as const,
      sourceContracts: Object.freeze([
        'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
        'FR215-ROLE-INVARIANT-EYE-ASYMMETRY-SURFACE-v1',
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
  assertCanonicalRgbSelfieMorphologyPayloadFR284(payload);
  return payload;
}

export function extractCanonicalEyeMorphologyFR284(
  source: GovernedMetricGeometryCandidateFR77V1,
): FR284CanonicalRgbSelfieMorphologyPayload {
  const eyeAxes = computeEyeNeutralAxisBundleFR210(source);
  const asymmetry = computeEyeAsymmetrySurfaceFR215(source);
  return materializeCanonicalEyeMorphologyFR284(eyeAxes, asymmetry);
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR284(
  payload: FR284CanonicalRgbSelfieMorphologyPayload,
): void {
  if (
    payload.schemaVersion !== 'fr284-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !== FR284_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
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
    fail('product capture boundary drift.');
  }
  if (
    payload.materializedRegionKeys.length !== 1 ||
    payload.materializedRegionKeys[0] !== 'eye_pair'
  ) {
    fail('FR284 must materialize only the eye-pair cluster.');
  }

  const featureKeys = payload.features.map((feature) => feature.featureKey);
  if (
    new Set(featureKeys).size !== featureKeys.length ||
    featureKeys.length !== 5
  ) {
    fail('eye feature set cardinality/uniqueness drift.');
  }

  const required = [
    'eye.width_height_ratio',
    'eye.inter_eye_spacing_ratio',
    'eye.outer_corner_tilt',
    'eye.bilateral_shape_asymmetry',
    'eye.eyelid_crease_or_hooded_category',
  ] as const;
  if (required.some((key) => !featureKeys.includes(key))) {
    fail('required FR282 eye feature missing from canonical payload.');
  }

  for (const feature of payload.features) {
    if (
      feature.regionKey !== 'eye_pair' ||
      feature.providerLandmarkIndicesExposed !== false ||
      feature.rawLandmarksExposed !== false ||
      feature.traditionalBindingApplied !== false ||
      feature.classificationApplied !== false ||
      feature.thresholdApplied !== false ||
      feature.quality.poseAcceptanceThresholdIssued !== false ||
      feature.quality.correctionApplied !== false ||
      feature.quality.currentCapturePoseAdjudication !== 'not_issued'
    ) {
      fail(`feature authority/quality boundary drift: ${feature.featureKey}.`);
    }
    if (feature.status === 'available') {
      if (feature.value.kind === 'scalar') {
        finite(feature.value.value, feature.featureKey);
      } else {
        if (feature.value.axes.length === 0) {
          fail(`${feature.featureKey} composite axes must be non-empty.`);
        }
        for (const axis of feature.value.axes) {
          finite(axis.value, `${feature.featureKey}.${axis.axisKey}`);
        }
      }
    } else if (feature.fallbackInvented !== false) {
      fail(`${feature.featureKey} unavailable feature invented a fallback.`);
    }
  }

  const tilt = payload.features.find(
    (feature) => feature.featureKey === 'eye.outer_corner_tilt',
  );
  if (
    tilt === undefined ||
    tilt.quality.dependency !==
      'canonical_metric_geometry_and_fr283_viewpoint_context' ||
    tilt.quality.viewpointSensitivity !==
      'documented_low_angle_sensitivity_fr283' ||
    tilt.quality.evidenceRefs.length !== 2
  ) {
    fail('FR283 eye-tilt quality handoff drift.');
  }

  const eyelid = payload.features.find(
    (feature) => feature.featureKey ===
      'eye.eyelid_crease_or_hooded_category',
  );
  if (
    eyelid?.status !== 'unavailable' ||
    eyelid.reason !== 'image_model_extractor_not_materialized'
  ) {
    fail('eyelid appearance gap must remain explicitly unavailable.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance.sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.sameGovernedGeometrySourceVerified !== true ||
    Object.entries(payload.authorityBoundary).some(([, value]) => value !== false)
  ) {
    fail('payload provenance or authority widened.');
  }
}
