import {
  assertCanonicalRgbSelfieMorphologyPayloadFR291,
  extractCanonicalRgbSelfieMorphologyFR291,
  type FR291CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr291.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  FR290VisibleAlarNostrilGeometryInput,
} from './visible-alar-nostril-geometry-fr290.js';
import type {
  FR291VisiblePhiltrumGeometryInput,
} from './visible-philtrum-geometry-fr291.js';
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
  FR292_PRODUCT_COLUMN_MAP,
  assertFR292ProductColumnMap,
} from './rgb-selfie-product-column-map-fr292.js';
import {
  FR292_MEAN_ARCH_METRIC_REF,
  FR292_MEAN_SPAN_METRIC_REF,
  FR292_MEAN_TAIL_TILT_METRIC_REF,
  assertVisibleEyebrowPairGeometryFR292,
  computeVisibleEyebrowPairGeometryFR292,
  type FR292NeutralEyebrowPairAxis,
  type FR292VisibleEyebrowPairGeometryInput,
  type FR292VisibleEyebrowPairGeometryResult,
} from './visible-eyebrow-pair-geometry-fr292.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR292_CANONICAL_MORPHOLOGY_CONTRACT_VERSION =
  'FR292-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

const TARGET =
  'eyebrow.span_arch_tail_orientation' as const;

const SOURCE_REFS = Object.freeze([
  FR292_MEAN_SPAN_METRIC_REF,
  FR292_MEAN_ARCH_METRIC_REF,
  FR292_MEAN_TAIL_TILT_METRIC_REF,
] as const);

export type FR292EyebrowFeature = Readonly<
  | {
      featureKey: typeof TARGET;
      regionKey: 'eyebrow';
      status: 'available';
      value: Readonly<{
        kind: 'composite_continuous_axes';
        axes: readonly [
          FR292NeutralEyebrowPairAxis,
          FR292NeutralEyebrowPairAxis,
          FR292NeutralEyebrowPairAxis,
        ];
      }>;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceObservationRefsExposed: false;
      providerEyebrowComponentsConsumed: false;
      providerComponentRoleMappingIssued: false;
      anatomicalBoundaryRoleAssigned: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
  | {
      featureKey: typeof TARGET;
      regionKey: 'eyebrow';
      status: 'unavailable';
      reason:
        | 'visible_face_width_collapsed'
        | 'visible_brow_horizontal_span_collapsed';
      fallbackInvented: false;
      sourceMetricRefs: readonly string[];
      quality: FR284FeatureQualityContext;
      providerLandmarkIndicesExposed: false;
      rawLandmarksExposed: false;
      sourceObservationRefsExposed: false;
      providerEyebrowComponentsConsumed: false;
      providerComponentRoleMappingIssued: false;
      anatomicalBoundaryRoleAssigned: false;
      traditionalBindingApplied: false;
      classificationApplied: false;
      thresholdApplied: false;
    }
>;

export interface FR292CanonicalRgbSelfieMorphologyPayload {
  readonly schemaVersion:
    'fr292-canonical-rgb-selfie-morphology-payload-v1';
  readonly contractVersion:
    typeof FR292_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly captureBoundary:
    FR291CanonicalRgbSelfieMorphologyPayload['captureBoundary'];
  readonly materializedRegionKeys: readonly [
    'eye_pair',
    'mouth_lips',
    'cheek_mid_face',
    'chin_lower_face',
    'nose',
    'eyebrow',
  ];
  readonly representedRegionKeys:
    FR291CanonicalRgbSelfieMorphologyPayload['representedRegionKeys'];
  readonly features: readonly (
    | FR291CanonicalRgbSelfieMorphologyPayload['features'][number]
    | FR292EyebrowFeature
  )[];
  readonly pendingFeatureKeys: readonly [];
  readonly schemaCoverage: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly canonicalExtractorMaterializedCount: 17;
    readonly extractorOrAuthorityGapCount: 12;
    readonly allFR282FeatureKeysRepresented: true;
  };
  readonly provenance:
    FR291CanonicalRgbSelfieMorphologyPayload['provenance'] &
    Readonly<{
      sameCaptureEyebrowGeometryVerified: true;
      sourceEyebrowObservationRefsExposed: false;
      sourceEyebrowCanonicalAssetDigestExposed: false;
      providerEyebrowComponentsConsumed: false;
    }>;
  readonly authorityBoundary:
    FR291CanonicalRgbSelfieMorphologyPayload['authorityBoundary'] &
    Readonly<{
      providerEyebrowComponentRolePromoted: false;
      anatomicalEyebrowBoundaryClaimed: false;
      rawRgbEyebrowDetectorClaimed: false;
    }>;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-292 ${message}`,
  );
}

function quality(): FR284FeatureQualityContext {
  return Object.freeze({
    dependency: 'canonical_metric_geometry' as const,
    viewpointSensitivity:
      'not_characterized_by_fr283' as const,
    evidenceRefs: Object.freeze([]),
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });
}

export function materializeCanonicalEyebrowFeatureFR292(
  result: FR292VisibleEyebrowPairGeometryResult,
): FR292EyebrowFeature {
  assertVisibleEyebrowPairGeometryFR292(result);

  const base = {
    featureKey: TARGET,
    regionKey: 'eyebrow' as const,
    sourceMetricRefs: SOURCE_REFS,
    quality: quality(),
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceObservationRefsExposed: false as const,
    providerEyebrowComponentsConsumed: false as const,
    providerComponentRoleMappingIssued: false as const,
    anatomicalBoundaryRoleAssigned: false as const,
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

export function upgradeCanonicalRgbSelfieMorphologyFR292(
  prior: FR291CanonicalRgbSelfieMorphologyPayload,
  feature: FR292EyebrowFeature,
): FR292CanonicalRgbSelfieMorphologyPayload {
  assertCanonicalRgbSelfieMorphologyPayloadFR291(prior);
  assertFR292ProductColumnMap();
  assertCanonicalEyebrowFeatureFR292(feature);

  const previous = prior.features.find(
    (candidate) => candidate.featureKey === TARGET,
  );
  if (
    previous === undefined ||
    previous.status !== 'unavailable' ||
    !('reason' in previous) ||
    previous.reason !==
      'eyebrow_boundary_role_wiring_not_materialized'
  ) {
    fail('FR291 target must remain the explicit eyebrow boundary-role wiring gap before FR292 replacement.');
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
    fail('FR292 must preserve exactly 29 unique FR282 feature keys.');
  }

  const materializedCount = FR292_PRODUCT_COLUMN_MAP.filter(
    (entry) =>
      entry.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 17) {
    fail('FR292 materialized extractor count drift.');
  }

  const payload: FR292CanonicalRgbSelfieMorphologyPayload =
    Object.freeze({
      schemaVersion:
        'fr292-canonical-rgb-selfie-morphology-payload-v1' as const,
      contractVersion:
        FR292_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
      authorityState:
        'product_facing_complete_fr282_schema_no_traditional_semantics' as const,
      captureBoundary: prior.captureBoundary,
      materializedRegionKeys: Object.freeze([
        'eye_pair',
        'mouth_lips',
        'cheek_mid_face',
        'chin_lower_face',
        'nose',
        'eyebrow',
      ] as const),
      representedRegionKeys: prior.representedRegionKeys,
      features,
      pendingFeatureKeys: Object.freeze([]) as readonly [],
      schemaCoverage: Object.freeze({
        fr282FeatureCount: 29 as const,
        representedFeatureCount: 29 as const,
        structurallyMissingFeatureCount: 0 as const,
        canonicalExtractorMaterializedCount: 17 as const,
        extractorOrAuthorityGapCount: 12 as const,
        allFR282FeatureKeysRepresented: true as const,
      }),
      provenance: Object.freeze({
        ...prior.provenance,
        sameCaptureEyebrowGeometryVerified: true as const,
        sourceEyebrowObservationRefsExposed: false as const,
        sourceEyebrowCanonicalAssetDigestExposed: false as const,
        providerEyebrowComponentsConsumed: false as const,
      }),
      authorityBoundary: Object.freeze({
        ...prior.authorityBoundary,
        providerEyebrowComponentRolePromoted: false as const,
        anatomicalEyebrowBoundaryClaimed: false as const,
        rawRgbEyebrowDetectorClaimed: false as const,
      }),
    });

  assertCanonicalRgbSelfieMorphologyPayloadFR292(payload);
  return payload;
}

export function extractCanonicalRgbSelfieMorphologyFR292(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
  noseInput: FR287GovernedNeutralNoseGeometryInput,
  alarNostrilInput: FR290VisibleAlarNostrilGeometryInput,
  philtrumInput: FR291VisiblePhiltrumGeometryInput,
  eyebrowInput: FR292VisibleEyebrowPairGeometryInput,
): FR292CanonicalRgbSelfieMorphologyPayload {
  const prior = extractCanonicalRgbSelfieMorphologyFR291(
    fullFace,
    lips,
    noseInput,
    alarNostrilInput,
    philtrumInput,
  );

  if (
    eyebrowInput.sourceCanonicalAssetDigest !==
      fullFace.provider.canonicalAssetDigest
  ) {
    fail('eyebrow geometry and FR77 full-face geometry must share canonical asset digest.');
  }

  const geometry =
    computeVisibleEyebrowPairGeometryFR292(eyebrowInput);

  return upgradeCanonicalRgbSelfieMorphologyFR292(
    prior,
    materializeCanonicalEyebrowFeatureFR292(geometry),
  );
}

export function assertCanonicalEyebrowFeatureFR292(
  feature: FR292EyebrowFeature,
): void {
  if (
    feature.featureKey !== TARGET ||
    feature.regionKey !== 'eyebrow' ||
    feature.sourceMetricRefs.length !== 3 ||
    feature.sourceMetricRefs[0] !==
      FR292_MEAN_SPAN_METRIC_REF ||
    feature.sourceMetricRefs[1] !==
      FR292_MEAN_ARCH_METRIC_REF ||
    feature.sourceMetricRefs[2] !==
      FR292_MEAN_TAIL_TILT_METRIC_REF ||
    feature.quality.dependency !==
      'canonical_metric_geometry' ||
    feature.quality.poseAcceptanceThresholdIssued !== false ||
    feature.quality.correctionApplied !== false ||
    feature.quality.currentCapturePoseAdjudication !==
      'not_issued' ||
    feature.providerLandmarkIndicesExposed !== false ||
    feature.rawLandmarksExposed !== false ||
    feature.sourceObservationRefsExposed !== false ||
    feature.providerEyebrowComponentsConsumed !== false ||
    feature.providerComponentRoleMappingIssued !== false ||
    feature.anatomicalBoundaryRoleAssigned !== false ||
    feature.traditionalBindingApplied !== false ||
    feature.classificationApplied !== false ||
    feature.thresholdApplied !== false
  ) {
    fail('canonical eyebrow feature boundary drift.');
  }

  if (feature.status === 'available') {
    if (
      feature.value.kind !==
        'composite_continuous_axes' ||
      feature.value.axes.length !== 3 ||
      feature.value.axes[0]?.metricRef !==
        FR292_MEAN_SPAN_METRIC_REF ||
      feature.value.axes[1]?.metricRef !==
        FR292_MEAN_ARCH_METRIC_REF ||
      feature.value.axes[2]?.metricRef !==
        FR292_MEAN_TAIL_TILT_METRIC_REF
    ) {
      fail('available canonical eyebrow axes drift.');
    }
  } else if (feature.fallbackInvented !== false) {
    fail('unavailable canonical eyebrow feature invented fallback.');
  }
}

export function assertCanonicalRgbSelfieMorphologyPayloadFR292(
  payload: FR292CanonicalRgbSelfieMorphologyPayload,
): void {
  assertFR292ProductColumnMap();

  if (
    payload.schemaVersion !==
      'fr292-canonical-rgb-selfie-morphology-payload-v1' ||
    payload.contractVersion !==
      FR292_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    payload.authorityState !==
      'product_facing_complete_fr282_schema_no_traditional_semantics'
  ) {
    fail('payload identity drift.');
  }

  if (
    payload.materializedRegionKeys.length !== 6 ||
    payload.materializedRegionKeys[5] !== 'eyebrow'
  ) {
    fail('materialized eyebrow region summary drift.');
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
    fail('FR292 payload must contain the target feature exactly once.');
  }
  assertCanonicalEyebrowFeatureFR292(
    targetFeatures[0] as FR292EyebrowFeature,
  );

  if (
    payload.schemaCoverage.fr282FeatureCount !== 29 ||
    payload.schemaCoverage.representedFeatureCount !== 29 ||
    payload.schemaCoverage.structurallyMissingFeatureCount !== 0 ||
    payload.schemaCoverage
      .canonicalExtractorMaterializedCount !== 17 ||
    payload.schemaCoverage.extractorOrAuthorityGapCount !== 12 ||
    payload.schemaCoverage.allFR282FeatureKeysRepresented !== true
  ) {
    fail('schema coverage summary drift.');
  }

  if (
    payload.provenance.sourceProviderRunRefExposed !== false ||
    payload.provenance
      .sourceCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerLandmarkIndicesExposed !== false ||
    payload.provenance.sameCaptureEyebrowGeometryVerified !== true ||
    payload.provenance
      .sourceEyebrowObservationRefsExposed !== false ||
    payload.provenance
      .sourceEyebrowCanonicalAssetDigestExposed !== false ||
    payload.provenance.providerEyebrowComponentsConsumed !== false ||
    Object.entries(payload.authorityBoundary).some(
      ([, value]) => value !== false,
    )
  ) {
    fail('payload provenance or authority widened.');
  }
}
