import {
  assertCanonicalRgbSelfieMorphologyPayloadFR289,
  extractCanonicalRgbSelfieMorphologyFR289,
  type FR289CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr289.js';
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
  FR290_PRODUCT_COLUMN_MAP,
  assertFR290ProductColumnMap,
} from './rgb-selfie-product-column-map-fr290.js';
import {
  FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
  FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
  FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
  assertVisibleAlarNostrilGeometryFR290,
  computeVisibleAlarNostrilGeometryFR290,
  type FR290NeutralNasalAxis,
  type FR290VisibleAlarNostrilGeometryInput,
  type FR290VisibleAlarNostrilGeometryResult,
} from './visible-alar-nostril-geometry-fr290.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR290_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR290-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

const TARGET =
  'nose.alar_width_and_nostril_geometry' as const;

const SOURCE_REFS = Object.freeze([
  FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
  FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
  FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
] as const);

export type FR290AlarNostrilFeature = Readonly<
  | {
      featureKey: typeof TARGET;
      regionKey: 'nose';
      status: 'available';
      value: Readonly<{
        kind: 'composite_visible_nasal_geometry';
        axes: readonly [
          FR290NeutralNasalAxis,
          FR290NeutralNasalAxis,
          FR290NeutralNasalAxis,
        ];
      }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceLandmarkRefsExposed: false;
      anatomicalLateralityAssigned: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
  | {
      featureKey: typeof TARGET;
      regionKey: 'nose';
      status: 'unavailable';
      reason:
        | 'visible_alar_horizontal_span_collapsed'
        | 'tip_contour_horizontal_span_collapsed'
        | 'nostril_contour_horizontal_span_collapsed'
        | 'nostril_contour_vertical_span_collapsed'
        | 'nostril_contour_area_collapsed';
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceLandmarkRefsExposed: false;
      anatomicalLateralityAssigned: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
>;

export interface FR290CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr290-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR290_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly captureBoundary:
    FR289CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys:
    FR289CanonicalRgbSelfieMorphologyPayload['materializedRegionKeys'];
  readonly representedRegionKeys:
    FR289CanonicalRgbSelfieMorphologyPayload['representedRegionKeys'];
  readonly features: readonly (
    | FR289CanonicalRgbSelfieMorphologyPayload['features'][number]
    | FR290AlarNostrilFeature
  )[];
  readonly pendingFeatureKeys: readonly [];
  readonly schemaCoverage: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly canonicalExtractorMaterializedCount: 15;
    readonly extractorOrAuthorityGapCount: 14;
    readonly allFR282FeatureKeysRepresented: true;
  };
  readonly provenance:
    FR289CanonicalRgbSelfieMorphologyPayload['provenance'];
  readonly authorityBoundary:
    FR289CanonicalRgbSelfieMorphologyPayload['authorityBoundary'];
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-290 ${message}`);
}

function quality(): FR284FeatureQualityContext {
  return Object.freeze({
    dependency: 'segmentation_and_visibility' as const,
    viewpointSensitivity:
      'not_characterized_by_fr283' as const,
    evidenceRefs: Object.freeze([]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

export function materializeCanonicalAlarNostrilFeatureFR290(
  result: FR290VisibleAlarNostrilGeometryResult,
): FR290AlarNostrilFeature {
  assertVisibleAlarNostrilGeometryFR290(result);

  const base = {
    featureKey: TARGET,
    regionKey: 'nose' as const,
    sourceMetricRefs: SOURCE_REFS,
    quality: quality(),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceLandmarkRefsExposed: false as const,
    anatomicalLateralityAssigned: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };

  if (result.status === 'available') {
    return Object.freeze({
      ...base,
      status: 'available' as const,
      value: Object.freeze({
        kind: 'composite_visible_nasal_geometry' as const,
        axes: result.axes,
      }),
    });
  }

  return Object.freeze({
    ...base,
    status: 'unavailable' as const,
    reason: result.reason,
    fallbackInvented: false as const,
  });
}

export function upgradeCanonicalRgbSelfieMorphologyFR290(
  prior: FR289CanonicalRgbSelfieMorphologyPayload,
  feature: FR290AlarNostrilFeature,
): FR290CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR289(prior);
  assertFR290ProductColumnMap();
  assertCanonicalAlarNostrilFeatureFR290(feature);

  const previous = prior.features.find(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (
    previous === undefined ||
    previous.status !== 'unavailable' ||
    !('reason' in previous) ||
    previous.reason !==
      'alar_nostril_extractor_not_materialized'
  ) {
    fail('FR289 target must remain the explicit alar/nostril extractor gap before FR290 replacement.');
  }

  const features = Object.freeze(
    prior.features.map((candidate) =>
      candidate.featureKey === TARGET ? feature : candidate),
  );

  if (
    features.length !== 29 ||
    new Set(
      features.map((candidate) => candidate.featureKey),
    ).size !== 29
  ) {
    fail('FR290 must preserve exactly 29 unique FR282 feature keys.');
  }

  const materializedCount = FR290_PRODUCT_COLUMN_MAP.filter(
    (entry) =>
      entry.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 15) {
    fail('FR290 materialized extractor count drift.');
  }

  const payload: FR290CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr290-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR290_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
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
        canonicalExtractorMaterializedCount: 15 as const,
        extractorOrAuthorityGapCount: 14 as const,
        allFR282FeatureKeysRepresented: true as const,
      }),
      provenance: prior.provenance,
      authorityBoundary: prior.authorityBoundary,
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR290(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR290(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
  alarNostrilInput: FR290VisibleAlarNostrilGeometryInput,
): FR290CanonicalRgbSelfieMorphologyPayload {
  const prior = extractCanonicalRgbSelfieMorphologyFR289(
    fullFace,
    lips,
    noseInput,
  );
  const geometry = computeVisibleAlarNostrilGeometryFR290(
    alarNostrilInput,
    noseInput.tip,
  );
  return upgradeCanonicalRgbSelfieMorphologyFR290(
    prior,
    materializeCanonicalAlarNostrilFeatureFR290(geometry),
  );
}

export function assertCanonicalAlarNostrilFeatureFR290(
  feature: FR290AlarNostrilFeature,
): void {
  if (
    feature.featureKey !== TARGET ||
    feature.regionKey !== 'nose' ||
    feature.sourceMetricRefs.length !== 3 ||
    feature.sourceMetricRefs[0] !==
      FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF ||
    feature.sourceMetricRefs[1] !==
      FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF ||
    feature.sourceMetricRefs[2] !==
      FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF ||
    feature.quality.dependency !==
      'segmentation_and_visibility' ||
    feature.quality.poseAcceptanceThresholdIssued !== false ||
    feature.quality.correctionApplied !== false ||
    feature.quality.currentCapturePoseAdjudication !==
      'not_issued' ||
    feature.providerLandmarkIndicesExposed !== false ||
    feature.rawLandmarksExposed !== false ||
    feature.sourceLandmarkRefsExposed !== false ||
    feature.anatomicalLateralityAssigned !== false ||
    feature.traditionalBindingApplied !== false ||
    feature.classificationApplied !== false ||
    feature.thresholdApplied !== false
  ) {
    fail('canonical alar/nostril feature boundary drift.');
  }

  if (feature.status === 'available') {
    if (
      feature.value.kind !==
        'composite_visible_nasal_geometry' ||
      feature.value.axes.length !== 3 ||
      feature.value.axes[0]?.metricRef !==
        FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF ||
      feature.value.axes[1]?.metricRef !==
        FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF ||
      feature.value.axes[2]?.metricRef !==
        FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF
    ) {
      fail('available canonical alar/nostril axes drift.');
    }
  } else if (feature.fallbackInvented !== false) {
    fail('unavailable canonical alar/nostril feature invented fallback.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR290(
  payload: FR290CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR290ProductColumnMap();

  if (
    payload.schemaVersion !==
      'fr290-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR290_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_complete_fr282_schema_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }

  if (
    payload.features.length !== 29 ||
    new Set(
      payload.features.map(
        (candidate) => candidate.featureKey,
      ),
    ).size !== 29 ||
    payload.pendingFeatureKeys.length !== 0
  ) {
    fail('FR282 schema coverage drift.');
  }

  const targetFeatures = payload.features.filter(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (targetFeatures.length !== 1) {
    fail('FR290 payload must contain the target feature exactly once.');
  }
  assertCanonicalAlarNostrilFeatureFR290(
    targetFeatures[0] as FR290AlarNostrilFeature,
  );

  if (
    payload.schemaCoverage.fr282FeatureCount !== 29 ||
    payload.schemaCoverage.representedFeatureCount !== 29 ||
    payload.schemaCoverage.structurallyMissingFeatureCount !== 0 ||
    payload.schemaCoverage
      .canonicalExtractorMaterializedCount !== 15 ||
    payload.schemaCoverage.extractorOrAuthorityGapCount !== 14 ||
    payload.schemaCoverage.allFR282FeatureKeysRepresented !== true
  ) {
    fail('schema coverage summary drift.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance
      .sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerLandmarkIndicesExposed !== false ||
    Object.entries(payload.authorityBoundary).some(
      ([, value]) => value !== false,
    )
  ) {
    fail('payload provenance or authority widened.');
  }
}
