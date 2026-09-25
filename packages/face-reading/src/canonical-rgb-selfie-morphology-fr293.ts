import {
  assertCanonicalRgbSelfieMorphologyPayloadFR292,
  extractCanonicalRgbSelfieMorphologyFR292,
  type FR292CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr292.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  FR290VisibleAlarNostrilGeometryInput,
} from './visible-alar-nostril-geometry-fr290.js';
import {
  deriveVisibleMouthWidthReferenceFR291,
  type FR291VisiblePhiltrumGeometryInput,
} from './visible-philtrum-geometry-fr291.js';
import type {
  FR292VisibleEyebrowPairGeometryInput,
} from './visible-eyebrow-pair-geometry-fr292.js';
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
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR293_COMBINED_AREA_METRIC_REF,
  FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
  FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
  assertVisibleLipBandFullnessFR293,
  computeVisibleLipBandFullnessFR293,
  type FR293NeutralVisibleLipBandAxis,
  type FR293VisibleLipBandGeometryInput,
  type FR293VisibleLipBandGeometryResult,
} from './visible-lip-band-fullness-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

const TARGET = 'mouth.visible_lip_fullness' as const;

const SOURCE_REFS = Object.freeze([
  FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
  FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
  FR293_COMBINED_AREA_METRIC_REF,
] as const);

export type FR293LipFullnessFeature = Readonly<
  | {
      featureKey: typeof TARGET;
      regionKey: 'mouth_lips';
      status: 'available';
      value: Readonly<{
        kind: 'composite_geometry';
        axes: readonly [
          FR293NeutralVisibleLipBandAxis,
          FR293NeutralVisibleLipBandAxis,
          FR293NeutralVisibleLipBandAxis,
        ];
      }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceObservationRefsExposed: false;
      providerLipContoursConsumed: false;
      providerComponentOrderConsumed: false;
      anatomicalOuterInnerRolesAssigned: false;
      hiddenBoundaryInferred: false;
      physicalThicknessInterpretationApplied: false;
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
        | 'upper_visible_lip_band_vertical_span_collapsed'
        | 'lower_visible_lip_band_vertical_span_collapsed'
        | 'upper_visible_lip_band_area_collapsed'
        | 'lower_visible_lip_band_area_collapsed';
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceObservationRefsExposed: false;
      providerLipContoursConsumed: false;
      providerComponentOrderConsumed: false;
      anatomicalOuterInnerRolesAssigned: false;
      hiddenBoundaryInferred: false;
      physicalThicknessInterpretationApplied: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
>;

export interface FR293CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr293-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly captureBoundary:
    FR292CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys:
    FR292CanonicalRgbSelfieMorphologyPayload['materializedRegionKeys'];
  readonly representedRegionKeys:
    FR292CanonicalRgbSelfieMorphologyPayload['representedRegionKeys'];
  readonly features: readonly (
    | FR292CanonicalRgbSelfieMorphologyPayload['features'][number]
    | FR293LipFullnessFeature
  )[];
  readonly pendingFeatureKeys: readonly [];
  readonly schemaCoverage: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly canonicalExtractorMaterializedCount: 18;
    readonly extractorOrAuthorityGapCount: 11;
    readonly allFR282FeatureKeysRepresented: true;
  };
  readonly provenance:
    FR292CanonicalRgbSelfieMorphologyPayload['provenance'] &
    Readonly<{
      sameCaptureLipBandGeometryVerified: true;
      sourceLipBandObservationRefsExposed: false;
      sourceLipBandCanonicalAssetDigestExposed: false;
      providerLipContoursConsumed: false;
    }>;
  readonly authorityBoundary:
    FR292CanonicalRgbSelfieMorphologyPayload['authorityBoundary'] &
    Readonly<{
      providerLipContourThicknessPromoted: false;
      anatomicalLipThicknessClaimed: false;
      rawRgbLipBandSegmentationClaimed: false;
    }>;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-293 ${message}`,
  );
}

function quality(): FR284FeatureQualityContext {
  return Object.freeze({
    dependency: 'governed_contour_geometry' as const,
    viewpointSensitivity:
      'not_characterized_by_fr283' as const,
    evidenceRefs: Object.freeze([]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

export function materializeCanonicalLipFullnessFeatureFR293(
  result: FR293VisibleLipBandGeometryResult,
): FR293LipFullnessFeature {
  assertVisibleLipBandFullnessFR293(result);

  const base = {
    featureKey: TARGET,
    regionKey: 'mouth_lips' as const,
    sourceMetricRefs: SOURCE_REFS,
    quality: quality(),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceObservationRefsExposed: false as const,
    providerLipContoursConsumed: false as const,
    providerComponentOrderConsumed: false as const,
    anatomicalOuterInnerRolesAssigned: false as const,
    hiddenBoundaryInferred: false as const,
    physicalThicknessInterpretationApplied: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };

  if (result.status === 'available') {
    return Object.freeze({
      ...base,
      status: 'available' as const,
      value: Object.freeze({
        kind: 'composite_geometry' as const,
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

export function upgradeCanonicalRgbSelfieMorphologyFR293(
  prior: FR292CanonicalRgbSelfieMorphologyPayload,
  feature: FR293LipFullnessFeature,
): FR293CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR292(prior);
  assertFR293ProductColumnMap();
  assertCanonicalLipFullnessFeatureFR293(feature);

  const previous = prior.features.find(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (
    previous === undefined ||
    previous.status !== 'unavailable' ||
    !('reason' in previous) ||
    previous.reason !==
      'governed_lip_fullness_extractor_not_materialized'
  ) {
    fail('FR292 target must remain the explicit governed lip-fullness extractor gap before FR293 replacement.');
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
    fail('FR293 must preserve exactly 29 unique FR282 feature keys.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (entry) =>
      entry.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR293 materialized extractor count drift.');
  }

  const payload: FR293CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr293-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
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
        canonicalExtractorMaterializedCount: 18 as const,
        extractorOrAuthorityGapCount: 11 as const,
        allFR282FeatureKeysRepresented: true as const,
      }),
      provenance: Object.freeze({
        ...prior.provenance,
        sameCaptureLipBandGeometryVerified: true as const,
        sourceLipBandObservationRefsExposed: false as const,
        sourceLipBandCanonicalAssetDigestExposed: false as const,
        providerLipContoursConsumed: false as const,
      }),
      authorityBoundary: Object.freeze({
        ...prior.authorityBoundary,
        providerLipContourThicknessPromoted: false as const,
        anatomicalLipThicknessClaimed: false as const,
        rawRgbLipBandSegmentationClaimed: false as const,
      }),
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR293(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR293(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
  alarNostrilInput: FR290VisibleAlarNostrilGeometryInput,
  philtrumInput: FR291VisiblePhiltrumGeometryInput,
  eyebrowInput: FR292VisibleEyebrowPairGeometryInput,
  lipBandInput: FR293VisibleLipBandGeometryInput,
): FR293CanonicalRgbSelfieMorphologyPayload {
  const prior = extractCanonicalRgbSelfieMorphologyFR292(
    fullFace,
    lips,
    noseInput,
    alarNostrilInput,
    philtrumInput,
    eyebrowInput,
  );

  const mouthWidthReference =
    deriveVisibleMouthWidthReferenceFR291(lips);
  const geometry = computeVisibleLipBandFullnessFR293(
    lipBandInput,
    mouthWidthReference,
  );

  return upgradeCanonicalRgbSelfieMorphologyFR293(
    prior,
    materializeCanonicalLipFullnessFeatureFR293(geometry),
  );
}

export function assertCanonicalLipFullnessFeatureFR293(
  feature: FR293LipFullnessFeature,
): void {
  if (
    feature.featureKey !== TARGET ||
    feature.regionKey !== 'mouth_lips' ||
    feature.sourceMetricRefs.length !== 3 ||
    feature.sourceMetricRefs[0] !==
      FR293_UPPER_VERTICAL_SPAN_METRIC_REF ||
    feature.sourceMetricRefs[1] !==
      FR293_LOWER_VERTICAL_SPAN_METRIC_REF ||
    feature.sourceMetricRefs[2] !==
      FR293_COMBINED_AREA_METRIC_REF ||
    feature.quality.dependency !==
      'governed_contour_geometry' ||
    feature.quality.poseAcceptanceThresholdIssued !== false ||
    feature.quality.correctionApplied !== false ||
    feature.quality.currentCapturePoseAdjudication !==
      'not_issued' ||
    feature.providerLandmarkIndicesExposed !== false ||
    feature.rawLandmarksExposed !== false ||
    feature.sourceObservationRefsExposed !== false ||
    feature.providerLipContoursConsumed !== false ||
    feature.providerComponentOrderConsumed !== false ||
    feature.anatomicalOuterInnerRolesAssigned !== false ||
    feature.hiddenBoundaryInferred !== false ||
    feature.physicalThicknessInterpretationApplied !== false ||
    feature.traditionalBindingApplied !== false ||
    feature.classificationApplied !== false ||
    feature.thresholdApplied !== false
  ) {
    fail('canonical lip-fullness feature boundary drift.');
  }

  if (feature.status === 'available') {
    if (
      feature.value.kind !== 'composite_geometry' ||
      feature.value.axes.length !== 3 ||
      feature.value.axes[0]?.metricRef !==
        FR293_UPPER_VERTICAL_SPAN_METRIC_REF ||
      feature.value.axes[1]?.metricRef !==
        FR293_LOWER_VERTICAL_SPAN_METRIC_REF ||
      feature.value.axes[2]?.metricRef !==
        FR293_COMBINED_AREA_METRIC_REF
    ) {
      fail('available canonical lip-fullness axes drift.');
    }
  } else if (feature.fallbackInvented !== false) {
    fail('unavailable canonical lip-fullness feature invented fallback.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR293(
  payload: FR293CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR293ProductColumnMap();

  if (
    payload.schemaVersion !==
      'fr293-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_complete_fr282_schema_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }

  if (
    payload.materializedRegionKeys.length !== 6 ||
    payload.materializedRegionKeys[5] !== 'eyebrow'
  ) {
    fail('materialized region summary drift.');
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
    fail('FR293 payload must contain the target feature exactly once.');
  }
  assertCanonicalLipFullnessFeatureFR293(
    targetFeatures[0] as FR293LipFullnessFeature,
  );

  if (
    payload.schemaCoverage.fr282FeatureCount !== 29 ||
    payload.schemaCoverage.representedFeatureCount !== 29 ||
    payload.schemaCoverage.structurallyMissingFeatureCount !== 0 ||
    payload.schemaCoverage
      .canonicalExtractorMaterializedCount !== 18 ||
    payload.schemaCoverage.extractorOrAuthorityGapCount !== 11 ||
    payload.schemaCoverage.allFR282FeatureKeysRepresented !== true
  ) {
    fail('schema coverage summary drift.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance
      .sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerLandmarkIndicesExposed !== false ||
    payload.provenance.sameCaptureLipBandGeometryVerified !== true ||
    payload.provenance
      .sourceLipBandObservationRefsExposed !== false ||
    payload.provenance
      .sourceLipBandCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerLipContoursConsumed !== false ||
    Object.entries(payload.authorityBoundary).some(
      ([, value]) => value !== false,
    )
  ) {
    fail('payload provenance or authority widened.');
  }
}
