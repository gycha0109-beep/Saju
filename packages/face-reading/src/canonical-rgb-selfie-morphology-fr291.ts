import {
  assertCanonicalRgbSelfieMorphologyPayloadFR290,
  extractCanonicalRgbSelfieMorphologyFR290,
  type FR290CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr290.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  FR290VisibleAlarNostrilGeometryInput,
} from './visible-alar-nostril-geometry-fr290.js';
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
  FR291_PRODUCT_COLUMN_MAP,
  assertFR291ProductColumnMap,
} from './rgb-selfie-product-column-map-fr291.js';
import {
  FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
  FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
  assertVisiblePhiltrumGeometryFR291,
  computeVisiblePhiltrumGeometryFR291,
  deriveVisibleMouthWidthReferenceFR291,
  type FR291NeutralVisibleGrooveAxis,
  type FR291VisiblePhiltrumGeometryInput,
  type FR291VisiblePhiltrumGeometryResult,
} from './visible-philtrum-geometry-fr291.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR291_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR291-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

const TARGET =
  'mouth.philtrum_length_width' as const;

const SOURCE_REFS = Object.freeze([
  FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
  FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
] as const);

export type FR291PhiltrumFeature = Readonly<
  | {
      featureKey: typeof TARGET;
      regionKey: 'mouth_lips';
      status: 'available';
      value: Readonly<{
        kind: 'composite_continuous_axes';
        axes: readonly [
          FR291NeutralVisibleGrooveAxis,
          FR291NeutralVisibleGrooveAxis,
        ];
      }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceObservationRefsExposed: false;
      anatomicalLandmarkNamesAssigned: false;
      hiddenBoundaryInferred: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
  | {
      featureKey: typeof TARGET;
      regionKey: 'mouth_lips';
      status: 'unavailable';
      reason:
        | 'visible_mouth_horizontal_span_collapsed'
        | 'visible_central_groove_axis_collapsed'
        | 'visible_corridor_width_collapsed';
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceObservationRefsExposed: false;
      anatomicalLandmarkNamesAssigned: false;
      hiddenBoundaryInferred: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
>;

export interface FR291CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr291-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR291_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly captureBoundary:
    FR290CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys:
    FR290CanonicalRgbSelfieMorphologyPayload['materializedRegionKeys'];
  readonly representedRegionKeys:
    FR290CanonicalRgbSelfieMorphologyPayload['representedRegionKeys'];
  readonly features: readonly (
    | FR290CanonicalRgbSelfieMorphologyPayload['features'][number]
    | FR291PhiltrumFeature
  )[];
  readonly pendingFeatureKeys: readonly [];
  readonly schemaCoverage: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly canonicalExtractorMaterializedCount: 16;
    readonly extractorOrAuthorityGapCount: 13;
    readonly allFR282FeatureKeysRepresented: true;
  };
  readonly provenance:
    FR290CanonicalRgbSelfieMorphologyPayload['provenance'];
  readonly authorityBoundary:
    FR290CanonicalRgbSelfieMorphologyPayload['authorityBoundary'];
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-291 ${message}`);
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

export function materializeCanonicalPhiltrumFeatureFR291(
  result: FR291VisiblePhiltrumGeometryResult,
): FR291PhiltrumFeature {
  assertVisiblePhiltrumGeometryFR291(result);

  const base = {
    featureKey: TARGET,
    regionKey: 'mouth_lips' as const,
    sourceMetricRefs: SOURCE_REFS,
    quality: quality(),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceObservationRefsExposed: false as const,
    anatomicalLandmarkNamesAssigned: false as const,
    hiddenBoundaryInferred: false as const,
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

  return Object.freeze({
    ...base,
    status: 'unavailable' as const,
    reason: result.reason,
    fallbackInvented: false as const,
  });
}

export function upgradeCanonicalRgbSelfieMorphologyFR291(
  prior: FR290CanonicalRgbSelfieMorphologyPayload,
  feature: FR291PhiltrumFeature,
): FR291CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR290(prior);
  assertFR291ProductColumnMap();
  assertCanonicalPhiltrumFeatureFR291(feature);

  const previous = prior.features.find(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (
    previous === undefined ||
    previous.status !== 'unavailable' ||
    !('reason' in previous) ||
    previous.reason !==
      'philtrum_extractor_not_materialized'
  ) {
    fail('FR290 target must remain the explicit philtrum extractor gap before FR291 replacement.');
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
    fail('FR291 must preserve exactly 29 unique FR282 feature keys.');
  }

  const materializedCount = FR291_PRODUCT_COLUMN_MAP.filter(
    (entry) =>
      entry.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 16) {
    fail('FR291 materialized extractor count drift.');
  }

  const payload: FR291CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr291-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR291_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
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
        canonicalExtractorMaterializedCount: 16 as const,
        extractorOrAuthorityGapCount: 13 as const,
        allFR282FeatureKeysRepresented: true as const,
      }),
      provenance: prior.provenance,
      authorityBoundary: prior.authorityBoundary,
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR291(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR291(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
  alarNostrilInput: FR290VisibleAlarNostrilGeometryInput,
  philtrumInput: FR291VisiblePhiltrumGeometryInput,
): FR291CanonicalRgbSelfieMorphologyPayload {
  const prior = extractCanonicalRgbSelfieMorphologyFR290(
    fullFace,
    lips,
    noseInput,
    alarNostrilInput,
  );

  const mouthWidthReference =
    deriveVisibleMouthWidthReferenceFR291(lips);
  const geometry = computeVisiblePhiltrumGeometryFR291(
    philtrumInput,
    mouthWidthReference,
  );

  return upgradeCanonicalRgbSelfieMorphologyFR291(
    prior,
    materializeCanonicalPhiltrumFeatureFR291(geometry),
  );
}

export function assertCanonicalPhiltrumFeatureFR291(
  feature: FR291PhiltrumFeature,
): void {
  if (
    feature.featureKey !== TARGET ||
    feature.regionKey !== 'mouth_lips' ||
    feature.sourceMetricRefs.length !== 2 ||
    feature.sourceMetricRefs[0] !==
      FR291_VISIBLE_GROOVE_AXIS_METRIC_REF ||
    feature.sourceMetricRefs[1] !==
      FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF ||
    feature.quality.dependency !==
      'segmentation_and_visibility' ||
    feature.quality.poseAcceptanceThresholdIssued !== false ||
    feature.quality.correctionApplied !== false ||
    feature.quality.currentCapturePoseAdjudication !==
      'not_issued' ||
    feature.providerLandmarkIndicesExposed !== false ||
    feature.rawLandmarksExposed !== false ||
    feature.sourceObservationRefsExposed !== false ||
    feature.anatomicalLandmarkNamesAssigned !== false ||
    feature.hiddenBoundaryInferred !== false ||
    feature.traditionalBindingApplied !== false ||
    feature.classificationApplied !== false ||
    feature.thresholdApplied !== false
  ) {
    fail('canonical philtrum feature boundary drift.');
  }

  if (feature.status === 'available') {
    if (
      feature.value.kind !==
        'composite_continuous_axes' ||
      feature.value.axes.length !== 2 ||
      feature.value.axes[0]?.metricRef !==
        FR291_VISIBLE_GROOVE_AXIS_METRIC_REF ||
      feature.value.axes[1]?.metricRef !==
        FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF
    ) {
      fail('available canonical philtrum axes drift.');
    }
  } else if (feature.fallbackInvented !== false) {
    fail('unavailable canonical philtrum feature invented fallback.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR291(
  payload: FR291CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR291ProductColumnMap();

  if (
    payload.schemaVersion !==
      'fr291-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR291_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
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
    fail('FR291 payload must contain the target feature exactly once.');
  }
  assertCanonicalPhiltrumFeatureFR291(
    targetFeatures[0] as FR291PhiltrumFeature,
  );

  if (
    payload.schemaCoverage.fr282FeatureCount !== 29 ||
    payload.schemaCoverage.representedFeatureCount !== 29 ||
    payload.schemaCoverage.structurallyMissingFeatureCount !== 0 ||
    payload.schemaCoverage
      .canonicalExtractorMaterializedCount !== 16 ||
    payload.schemaCoverage.extractorOrAuthorityGapCount !== 13 ||
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
