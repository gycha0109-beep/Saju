import {
  extractCanonicalRgbSelfieMorphologyFR287,
  assertCanonicalRgbSelfieMorphologyPayloadFR287,
  type FR287CanonicalRgbSelfieMorphologyPayload,
  type FR287GovernedNeutralNoseGeometryInput,
  type FR287NoseFeature,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  FR284CanonicalMorphologyFeature,
  FR284FeatureQualityContext,
} from './canonical-rgb-selfie-morphology-fr284.js';
import type {
  FR285MouthFeature,
} from './canonical-rgb-selfie-morphology-fr285.js';
import type {
  FR286CheekLowerFaceFeature,
} from './canonical-rgb-selfie-morphology-fr286.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR287_PRODUCT_COLUMN_MAP,
  assertFR287ProductColumnMap,
} from './rgb-selfie-product-column-map-fr287.js';
import type {
  FR284ProductFeatureKey,
  FR284QualityDependency,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR288_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR288-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export type FR288RemainingFeatureKey =
  | 'forehead.visible_width_shape'
  | 'forehead.visible_hairline_boundary'
  | 'forehead.relative_surface_curvature'
  | 'eyebrow.span_arch_tail_orientation'
  | 'eyebrow.visible_hair_density_texture'
  | 'ear.visible_boundary_height_shape'
  | 'ear.thickness_attachment_canal_boundary';

export type FR288RemainingUnavailableReason =
  | 'forehead_visible_shape_segmentation_not_materialized'
  | 'forehead_hairline_segmentation_not_materialized'
  | 'forehead_relative_3d_provider_not_materialized'
  | 'eyebrow_boundary_role_wiring_not_materialized'
  | 'eyebrow_appearance_model_not_materialized'
  | 'ear_visibility_shape_extractor_not_materialized'
  | 'current_rgb_selfie_observation_authority_unavailable';

export type FR288RemainingFeature = Readonly<{
  featureKey: FR288RemainingFeatureKey;
  regionKey: 'forehead' | 'eyebrow' | 'ear';
  status: 'unavailable';
  reason: FR288RemainingUnavailableReason;
  fallbackInvented: false;
  sourceMetricRefs: readonly [];
  quality: FR284FeatureQualityContext;
  providerLandmarkIndicesExposed: false;
  rawLandmarksExposed: false;
  traditionalBindingApplied: false;
  classificationApplied: false;
  thresholdApplied: false;
}>;

export interface FR288CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr288-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR288_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly captureBoundary:
    FR287CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys:
    FR287CanonicalRgbSelfieMorphologyPayload['materializedRegionKeys'];
  readonly representedRegionKeys: readonly [
    'forehead',
    'eyebrow',
    'eye_pair',
    'nose',
    'mouth_lips',
    'ear',
    'cheek_mid_face',
    'chin_lower_face',
  ];
  readonly features: readonly (
    | FR284CanonicalMorphologyFeature
    | FR285MouthFeature
    | FR286CheekLowerFaceFeature
    | FR287NoseFeature
    | FR288RemainingFeature
  )[];
  readonly pendingFeatureKeys: readonly [];
  readonly schemaCoverage: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly canonicalExtractorMaterializedCount: 13;
    readonly extractorOrAuthorityGapCount: 16;
    readonly allFR282FeatureKeysRepresented: true;
  };
  readonly provenance: {
    readonly sourceProviderRunRefExposed: false;
    readonly sourceCanonicalAssetDigestExposed: false;
    readonly providerLandmarkIndicesExposed: false;
  };
  readonly authorityBoundary:
    FR287CanonicalRgbSelfieMorphologyPayload['authorityBoundary'];
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-288 ${message}`);
}

function quality(
  dependency: FR284QualityDependency,
  viewpointSensitivity:
    FR284FeatureQualityContext['viewpointSensitivity'] =
      'not_characterized_by_fr283',
): FR284FeatureQualityContext {
  return Object.freeze({
    dependency,
    viewpointSensitivity,
    evidenceRefs: Object.freeze([]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

function unavailable(
  featureKey: FR288RemainingFeatureKey,
  regionKey: FR288RemainingFeature['regionKey'],
  reason: FR288RemainingUnavailableReason,
  dependency: FR284QualityDependency,
  viewpointSensitivity:
    FR284FeatureQualityContext['viewpointSensitivity'] =
      'not_characterized_by_fr283',
): FR288RemainingFeature {
  return Object.freeze({
    featureKey,
    regionKey,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    sourceMetricRefs: Object.freeze([]) as readonly [],
    quality: quality(dependency, viewpointSensitivity),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  });
}

export function materializeCanonicalRemainingFeatureGapsFR288():
readonly FR288RemainingFeature[] {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR287ProductColumnMap();

  const features = Object.freeze([
    unavailable(
      'forehead.visible_width_shape',
      'forehead',
      'forehead_visible_shape_segmentation_not_materialized',
      'segmentation_and_visibility',
    ),
    unavailable(
      'forehead.visible_hairline_boundary',
      'forehead',
      'forehead_hairline_segmentation_not_materialized',
      'segmentation_and_visibility',
    ),
    unavailable(
      'forehead.relative_surface_curvature',
      'forehead',
      'forehead_relative_3d_provider_not_materialized',
      'rgb_relative_3d_provider_validation',
    ),
    unavailable(
      'eyebrow.span_arch_tail_orientation',
      'eyebrow',
      'eyebrow_boundary_role_wiring_not_materialized',
      'canonical_metric_geometry',
    ),
    unavailable(
      'eyebrow.visible_hair_density_texture',
      'eyebrow',
      'eyebrow_appearance_model_not_materialized',
      'appearance_image_quality',
      'not_applicable',
    ),
    unavailable(
      'ear.visible_boundary_height_shape',
      'ear',
      'ear_visibility_shape_extractor_not_materialized',
      'visibility_gate',
      'not_applicable',
    ),
    unavailable(
      'ear.thickness_attachment_canal_boundary',
      'ear',
      'current_rgb_selfie_observation_authority_unavailable',
      'currently_unavailable',
      'not_applicable',
    ),
  ] as const);

  assertCanonicalRemainingFeatureGapsFR288(features);
  return features;
}

export function closeCanonicalRgbSelfieMorphologyFR288(
  prior: FR287CanonicalRgbSelfieMorphologyPayload,
): FR288CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR287(prior);
  const remaining = materializeCanonicalRemainingFeatureGapsFR288();

  const features = Object.freeze([
    ...prior.features,
    ...remaining,
  ]);
  const actualKeys = new Set(
    features.map((feature) => feature.featureKey),
  );
  const expectedKeys =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((entry) => entry.featureKey);

  if (
    features.length !== expectedKeys.length ||
    actualKeys.size !== expectedKeys.length ||
    expectedKeys.some((key) => !actualKeys.has(key as FR284ProductFeatureKey))
  ) {
    fail('full payload must represent every FR282 feature key exactly once.');
  }

  const materializedCount = FR287_PRODUCT_COLUMN_MAP.filter(
    (entry) =>
      entry.implementationState === 'canonical_extractor_materialized',
  ).length;
  const gapCount = FR287_PRODUCT_COLUMN_MAP.length - materializedCount;
  if (materializedCount !== 13 || gapCount !== 16) {
    fail('FR287 implementation-state counts drifted.');
  }

  const payload: FR288CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr288-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR288_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
      authorityState:
        'product_facing_complete_fr282_schema_no_traditional_semantics' as const,
      captureBoundary: prior.captureBoundary,
      materializedRegionKeys: prior.materializedRegionKeys,
      representedRegionKeys: Object.freeze([
        'forehead',
        'eyebrow',
        'eye_pair',
        'nose',
        'mouth_lips',
        'ear',
        'cheek_mid_face',
        'chin_lower_face',
      ] as const),
      features,
      pendingFeatureKeys: Object.freeze([]) as readonly [],
      schemaCoverage: Object.freeze({
        fr282FeatureCount: 29 as const,
        representedFeatureCount: 29 as const,
        structurallyMissingFeatureCount: 0 as const,
        canonicalExtractorMaterializedCount: 13 as const,
        extractorOrAuthorityGapCount: 16 as const,
        allFR282FeatureKeysRepresented: true as const,
      }),
      provenance: Object.freeze({
        sourceProviderRunRefExposed: false as const,
        sourceCanonicalAssetDigestExposed: false as const,
        providerLandmarkIndicesExposed: false as const,
      }),
      authorityBoundary: prior.authorityBoundary,
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR288(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR288(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
): FR288CanonicalRgbSelfieMorphologyPayload {
  return closeCanonicalRgbSelfieMorphologyFR288(
    extractCanonicalRgbSelfieMorphologyFR287(
      fullFace,
      lips,
      noseInput,
    ),
  );
}

export function assertCanonicalRemainingFeatureGapsFR288(
  features: readonly FR288RemainingFeature[],
): void {
  const required: readonly FR288RemainingFeatureKey[] = [
    'forehead.visible_width_shape',
    'forehead.visible_hairline_boundary',
    'forehead.relative_surface_curvature',
    'eyebrow.span_arch_tail_orientation',
    'eyebrow.visible_hair_density_texture',
    'ear.visible_boundary_height_shape',
    'ear.thickness_attachment_canal_boundary',
  ];

  if (
    features.length !== required.length ||
    new Set(features.map((feature) => feature.featureKey)).size !==
      required.length ||
    required.some((key) =>
      !features.some((feature) => feature.featureKey === key))
  ) {
    fail('remaining gap set must cover the exact seven unrepresented FR282 columns.');
  }

  for (const feature of features) {
    if (
      feature.status !== 'unavailable' ||
      feature.fallbackInvented !== false ||
      feature.sourceMetricRefs.length !== 0 ||
      feature.providerLandmarkIndicesExposed !== false ||
      feature.rawLandmarksExposed !== false ||
      feature.traditionalBindingApplied !== false ||
      feature.classificationApplied !== false ||
      feature.thresholdApplied !== false ||
      feature.quality.poseAcceptanceThresholdIssued !== false ||
      feature.quality.correctionApplied !== false ||
      feature.quality.currentCapturePoseAdjudication !== 'not_issued'
    ) {
      fail(`remaining feature boundary drift: ${feature.featureKey}.`);
    }
  }

  const earUnavailable = features.find((feature) =>
    feature.featureKey ===
      'ear.thickness_attachment_canal_boundary');
  if (
    earUnavailable?.reason !==
      'current_rgb_selfie_observation_authority_unavailable' ||
    earUnavailable.quality.dependency !== 'currently_unavailable'
  ) {
    fail('ear thickness/attachment/canal must remain authority-unavailable.');
  }

  const brow = features.find((feature) =>
    feature.featureKey === 'eyebrow.span_arch_tail_orientation');
  if (
    brow?.reason !==
      'eyebrow_boundary_role_wiring_not_materialized' ||
    brow.quality.dependency !== 'canonical_metric_geometry'
  ) {
    fail('eyebrow geometry gap boundary drift.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR288(
  payload: FR288CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );

  if (
    payload.schemaVersion !==
      'fr288-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR288_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_complete_fr282_schema_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }

  const expectedKeys =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((entry) => entry.featureKey);
  const actualKeys = payload.features.map(
    (feature) => feature.featureKey,
  );

  if (
    payload.features.length !== 29 ||
    new Set(actualKeys).size !== 29 ||
    expectedKeys.some((key) => !actualKeys.includes(key as FR284ProductFeatureKey)) ||
    payload.pendingFeatureKeys.length !== 0
  ) {
    fail('FR282 schema coverage drift.');
  }

  if (
    payload.schemaCoverage.fr282FeatureCount !== 29 ||
    payload.schemaCoverage.representedFeatureCount !== 29 ||
    payload.schemaCoverage.structurallyMissingFeatureCount !== 0 ||
    payload.schemaCoverage.canonicalExtractorMaterializedCount !== 13 ||
    payload.schemaCoverage.extractorOrAuthorityGapCount !== 16 ||
    payload.schemaCoverage.allFR282FeatureKeysRepresented !== true
  ) {
    fail('schema coverage summary drift.');
  }

  if (
    payload.representedRegionKeys.length !== 8 ||
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance.sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerLandmarkIndicesExposed !== false ||
    Object.entries(payload.authorityBoundary).some(([, value]) =>
      value !== false)
  ) {
    fail('payload provenance or authority widened.');
  }
}
