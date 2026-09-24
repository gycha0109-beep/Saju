import {
  assertCanonicalRgbSelfieMorphologyPayloadFR288,
  extractCanonicalRgbSelfieMorphologyFR288,
  type FR288CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr288.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import type {
  FR284FeatureQualityContext,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  assertFR289ProductColumnMap,
  FR289_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr289.js';
import {
  assertVisibleLowerFaceDimensionsFR289,
  computeVisibleLowerFaceDimensionsFR289,
  FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF,
  FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF,
  FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF,
  type FR289ContinuousAxis,
  type FR289VisibleLowerFaceDimensionsResult,
} from './visible-lower-face-dimensions-fr289.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR289_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR289-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export type FR289ChinDimensionFeature = Readonly<
  | {
      featureKey:
        'chin_lower_face.chin_height_width_center_deviation';
      regionKey: 'chin_lower_face';
      status: 'available';
      value: Readonly<{
        kind: 'composite_continuous_axes';
        axes: readonly [
          FR289ContinuousAxis,
          FR289ContinuousAxis,
          FR289ContinuousAxis,
        ];
      }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
  | {
      featureKey:
        'chin_lower_face.chin_height_width_center_deviation';
      regionKey: 'chin_lower_face';
      status: 'unavailable';
      reason:
        | 'source_visible_lower_face_width_unavailable'
        | 'source_visible_lower_face_contour_unavailable'
        | 'visible_lower_face_horizontal_span_collapsed'
        | 'visible_lower_face_vertical_span_collapsed';
      sourceReason?: string;
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
>;

export interface FR289CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr289-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR289_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly captureBoundary:
    FR288CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys:
    FR288CanonicalRgbSelfieMorphologyPayload['materializedRegionKeys'];
  readonly representedRegionKeys:
    FR288CanonicalRgbSelfieMorphologyPayload['representedRegionKeys'];
  readonly features: readonly (
    | FR288CanonicalRgbSelfieMorphologyPayload['features'][number]
    | FR289ChinDimensionFeature
  )[];
  readonly pendingFeatureKeys: readonly [];
  readonly schemaCoverage: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly canonicalExtractorMaterializedCount: 14;
    readonly extractorOrAuthorityGapCount: 15;
    readonly allFR282FeatureKeysRepresented: true;
  };
  readonly provenance:
    FR288CanonicalRgbSelfieMorphologyPayload['provenance'];
  readonly authorityBoundary:
    FR288CanonicalRgbSelfieMorphologyPayload['authorityBoundary'];
}

const TARGET =
  'chin_lower_face.chin_height_width_center_deviation' as const;

const SOURCE_REFS = Object.freeze([
  FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF,
  FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF,
  FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF,
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-289 ${message}`);
}

function quality(): FR284FeatureQualityContext {
  return Object.freeze({
    dependency: 'governed_contour_geometry' as const,
    viewpointSensitivity: 'not_characterized_by_fr283' as const,
    evidenceRefs: Object.freeze([]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

export function materializeCanonicalChinDimensionFeatureFR289(
  result: FR289VisibleLowerFaceDimensionsResult,
): FR289ChinDimensionFeature {
  assertVisibleLowerFaceDimensionsFR289(result);

  const base = {
    featureKey: TARGET,
    regionKey: 'chin_lower_face' as const,
    sourceMetricRefs: SOURCE_REFS,
    quality: quality(),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };

  if (result.status === 'available') {
    return Object.freeze({
      ...base,
      status: 'available' as const,
      value: Object.freeze({
        kind: 'composite_continuous_axes' as const,
        axes: result.axes,
      }),
    });
  }

  const unavailable = {
    ...base,
    status: 'unavailable' as const,
    reason: result.reason,
    fallbackInvented: false as const,
  };
  return result.sourceReason === undefined
    ? Object.freeze(unavailable)
    : Object.freeze({ ...unavailable, sourceReason: result.sourceReason });
}

export function upgradeCanonicalRgbSelfieMorphologyFR289(
  prior: FR288CanonicalRgbSelfieMorphologyPayload,
  feature: FR289ChinDimensionFeature,
): FR289CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR288(prior);
  assertFR289ProductColumnMap();

  const previous = prior.features.find(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (
    previous === undefined ||
    previous.status !== 'unavailable' ||
    !('reason' in previous) ||
    previous.reason !== 'chin_dimension_extractor_not_materialized'
  ) {
    fail('FR288 target must remain the explicit chin-dimension gap before FR289 replacement.');
  }

  if (feature.featureKey !== TARGET) {
    fail('replacement feature key drift.');
  }

  const features = Object.freeze(
    prior.features.map((candidate) =>
      candidate.featureKey === TARGET ? feature : candidate),
  );

  if (
    features.length !== 29 ||
    new Set(features.map((candidate) => candidate.featureKey)).size !== 29
  ) {
    fail('FR289 must preserve exactly 29 unique FR282 feature keys.');
  }

  const materializedCount = FR289_PRODUCT_COLUMN_MAP.filter(
    (entry) =>
      entry.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 14) {
    fail('FR289 materialized extractor count drift.');
  }

  const payload: FR289CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr289-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR289_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
      authorityState:
        'product_facing_complete_fr282_schema_no_traditional_semantics' as const,
      captureBoundary: prior.captureBoundary,
      materializedRegionKeys: prior.materializedRegionKeys,
      representedRegionKeys: prior.representedRegionKeys,
      features,
      pendingFeatureKeys: Object.freeze([]) as readonly [],
      schemaCoverage: Object.freeze({
        fr282FeatureCount: 29 as const,
        representedFeatureCount: 29 as const,
        structurallyMissingFeatureCount: 0 as const,
        canonicalExtractorMaterializedCount: 14 as const,
        extractorOrAuthorityGapCount: 15 as const,
        allFR282FeatureKeysRepresented: true as const,
      }),
      provenance: prior.provenance,
      authorityBoundary: prior.authorityBoundary,
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR289(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR289(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
): FR289CanonicalRgbSelfieMorphologyPayload {
  const prior = extractCanonicalRgbSelfieMorphologyFR288(
    fullFace,
    lips,
    noseInput,
  );
  const dimensions = computeVisibleLowerFaceDimensionsFR289(
    fullFace,
    lips,
  );
  return upgradeCanonicalRgbSelfieMorphologyFR289(
    prior,
    materializeCanonicalChinDimensionFeatureFR289(dimensions),
  );
}

export function assertCanonicalChinDimensionFeatureFR289(
  feature: FR289ChinDimensionFeature,
): void {
  if (
    feature.featureKey !== TARGET ||
    feature.regionKey !== 'chin_lower_face' ||
    feature.sourceMetricRefs.length !== 3 ||
    feature.sourceMetricRefs[0] !==
      FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF ||
    feature.sourceMetricRefs[1] !==
      FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF ||
    feature.sourceMetricRefs[2] !==
      FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF ||
    feature.quality.dependency !== 'governed_contour_geometry' ||
    feature.quality.poseAcceptanceThresholdIssued !== false ||
    feature.quality.correctionApplied !== false ||
    feature.quality.currentCapturePoseAdjudication !== 'not_issued' ||
    feature.providerLandmarkIndicesExposed !== false ||
    feature.rawLandmarksExposed !== false ||
    feature.traditionalBindingApplied !== false ||
    feature.classificationApplied !== false ||
    feature.thresholdApplied !== false
  ) {
    fail('canonical chin-dimension feature boundary drift.');
  }

  if (feature.status === 'available') {
    if (
      feature.value.kind !== 'composite_continuous_axes' ||
      feature.value.axes.length !== 3 ||
      feature.value.axes[0]?.metricRef !==
        FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF ||
      feature.value.axes[1]?.metricRef !==
        FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF ||
      feature.value.axes[2]?.metricRef !==
        FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF
    ) {
      fail('available canonical chin-dimension axes drift.');
    }
  } else if (feature.fallbackInvented !== false) {
    fail('unavailable canonical chin-dimension feature invented fallback.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR289(
  payload: FR289CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR289ProductColumnMap();

  if (
    payload.schemaVersion !==
      'fr289-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR289_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_complete_fr282_schema_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }

  if (
    payload.features.length !== 29 ||
    new Set(payload.features.map((candidate) => candidate.featureKey)).size !==
      29 ||
    payload.pendingFeatureKeys.length !== 0
  ) {
    fail('FR282 schema coverage drift.');
  }

  const targetFeatures = payload.features.filter(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (targetFeatures.length !== 1) {
    fail('FR289 payload must contain the target feature exactly once.');
  }
  assertCanonicalChinDimensionFeatureFR289(
    targetFeatures[0] as FR289ChinDimensionFeature,
  );

  if (
    payload.schemaCoverage.fr282FeatureCount !== 29 ||
    payload.schemaCoverage.representedFeatureCount !== 29 ||
    payload.schemaCoverage.structurallyMissingFeatureCount !== 0 ||
    payload.schemaCoverage.canonicalExtractorMaterializedCount !== 14 ||
    payload.schemaCoverage.extractorOrAuthorityGapCount !== 15 ||
    payload.schemaCoverage.allFR282FeatureKeysRepresented !== true
  ) {
    fail('schema coverage summary drift.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance.sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerLandmarkIndicesExposed !== false ||
    Object.entries(payload.authorityBoundary).some(([, value]) =>
      value !== false)
  ) {
    fail('payload provenance or authority widened.');
  }
}
