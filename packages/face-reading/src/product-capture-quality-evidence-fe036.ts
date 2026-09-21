import {
  FE035B_ALLOWED_UNAVAILABLE_SURFACES,
  FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION,
  FE035B_REGION_ORDER,
  assertProductNeutralObservationSurfaceFE035B,
  type FE035BNeutralObservationSurface,
  type FE035BRegionAvailability,
} from './product-neutral-observation-contract-fe035b.js';
import { getEyePairCaptureConditionOperationalBoundaryFR162 } from './eye-pair-capture-condition-operational-boundary-fr162.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE036_PRODUCT_CAPTURE_QUALITY_EVIDENCE_VERSION =
  'FE036-PRODUCT-CAPTURE-QUALITY-EVIDENCE-v1' as const;

export type FE036QualityDimensionKey =
  | 'pose'
  | 'face_scale'
  | 'framing'
  | 'blur'
  | 'illumination'
  | 'occlusion';

export interface FE036UnassessedQualityDimension {
  readonly state: 'unassessed';
  readonly reason: 'no_validated_product_quality_construct_or_threshold_authority';
}

export interface FE036ProductCaptureQualityEvidence {
  readonly schemaVersion: 'fe036-product-capture-quality-evidence-v1';
  readonly contractVersion: typeof FE036_PRODUCT_CAPTURE_QUALITY_EVIDENCE_VERSION;
  readonly authorityState: 'capture_quality_unassessed_descriptive_observation_only';
  readonly upstream: {
    readonly neutralObservationContractVersion:
      typeof FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION;
    readonly neutralObservationSurfaceValidated: true;
    readonly fr147ModuleRef:
      'packages/face-reading/src/five-officers-square-broad-fang-capture-condition-governance-fr147.ts';
    readonly fr148ModuleRef:
      'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-candidate-features-fr148.ts';
    readonly fr162ModuleRef:
      'packages/face-reading/src/eye-pair-capture-condition-operational-boundary-fr162.ts';
  };
  readonly descriptiveRegionCoverage: readonly FE035BRegionAvailability[];
  readonly qualityDimensions: Readonly<
    Record<FE036QualityDimensionKey, FE036UnassessedQualityDimension>
  >;
  readonly researchCoachingEvidence: {
    readonly sourceScope: 'eye_pair_repeat_capture_research';
    readonly frontalNeutralPoseRequested: true;
    readonly cameraNearEyeLevelRequested: true;
    readonly avoidIntentionallyExtremeNearOrFarFraming: true;
    readonly avoidIntentionallyHighOrLowCameraAngle: true;
    readonly consistentFramingAcrossRepeatedCapturesRequested: true;
    readonly promotedToCrossFaceProductGuidance: false;
  };
  readonly authorityBoundary: {
    readonly descriptiveRegionAvailabilityOnly: true;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly automaticCaptureQualityGateAuthorized: false;
    readonly automaticMetricSuppressionThresholdAuthorized: false;
    readonly automaticRetakeThresholdAuthorized: false;
    readonly userFacingPassFailQualityLabelAllowed: false;
    readonly crossFaceProductCaptureCoachingIssued: false;
    readonly qualityScoreIssued: false;
    readonly classificationIssued: false;
    readonly traditionalSemanticAuthority: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawGeometryExposed: false;
    readonly providerTraceExposed: false;
  };
}

const UNASSESSED: FE036UnassessedQualityDimension = Object.freeze({
  state: 'unassessed' as const,
  reason:
    'no_validated_product_quality_construct_or_threshold_authority' as const,
});

const QUALITY_DIMENSIONS: Readonly<
  Record<FE036QualityDimensionKey, FE036UnassessedQualityDimension>
> = Object.freeze({
  pose: UNASSESSED,
  face_scale: UNASSESSED,
  framing: UNASSESSED,
  blur: UNASSESSED,
  illumination: UNASSESSED,
  occlusion: UNASSESSED,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FE-036 ' + message);
}

function assertFR162Boundary(): ReturnType<
  typeof getEyePairCaptureConditionOperationalBoundaryFR162
> {
  const boundary = getEyePairCaptureConditionOperationalBoundaryFR162();
  if (
    boundary.productBoundary.automaticCaptureQualityGateAuthorized !== false ||
    boundary.productBoundary.automaticMetricSuppressionThresholdAuthorized !==
      false ||
    boundary.productBoundary.automaticRetakeThresholdAuthorized !== false ||
    boundary.productBoundary.userFacingCaptureCoachingAllowed !== true ||
    boundary.productBoundary.userFacingPassFailQualityLabelAllowed !== false ||
    boundary.productBoundary.numericRepeatabilityAcceptanceThreshold !== null ||
    boundary.productBoundary.numericCaptureQualityThreshold !== null ||
    boundary.authorityBoundary.captureQualityValidated !== false ||
    boundary.authorityBoundary.captureQualityMeasurementConstructValidated !==
      false ||
    boundary.authorityBoundary.calibrationIssued !== false ||
    boundary.authorityBoundary.thresholdsIssued !== false ||
    boundary.authorityBoundary.traditionalSemanticAuthority !== false
  ) {
    fail('FR162 capture-quality authority boundary changed and requires a new review.');
  }

  const guidance = boundary.operationalCaptureGuidance;
  if (
    guidance.frontalNeutralPoseRequested !== true ||
    guidance.cameraNearEyeLevelRequested !== true ||
    guidance.avoidIntentionallyExtremeNearOrFarFraming !== true ||
    guidance.avoidIntentionallyHighOrLowCameraAngle !== true ||
    guidance.consistentFramingAcrossRepeatedCapturesRequested !== true ||
    guidance.guidanceIsNumericAcceptanceThreshold !== false ||
    guidance.guidanceMeansCaptureQualityValidated !== false ||
    guidance.guidanceMayRejectAUserCaptureAutomatically !== false
  ) {
    fail('FR162 operational capture guidance changed and requires a new review.');
  }
  return boundary;
}

function cloneRegion(
  region: FE035BRegionAvailability,
): FE035BRegionAvailability {
  return Object.freeze({
    regionKey: region.regionKey,
    state: region.state,
    unavailableSurfaces: Object.freeze([...region.unavailableSurfaces]),
  });
}

export function projectProductCaptureQualityEvidenceFE036(
  surface: FE035BNeutralObservationSurface,
): FE036ProductCaptureQualityEvidence {
  assertProductNeutralObservationSurfaceFE035B(surface);
  const fr162 = assertFR162Boundary();

  const result: FE036ProductCaptureQualityEvidence = Object.freeze({
    schemaVersion: 'fe036-product-capture-quality-evidence-v1' as const,
    contractVersion: FE036_PRODUCT_CAPTURE_QUALITY_EVIDENCE_VERSION,
    authorityState:
      'capture_quality_unassessed_descriptive_observation_only' as const,
    upstream: Object.freeze({
      neutralObservationContractVersion:
        FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION,
      neutralObservationSurfaceValidated: true as const,
      fr147ModuleRef:
        'packages/face-reading/src/five-officers-square-broad-fang-capture-condition-governance-fr147.ts' as const,
      fr148ModuleRef:
        'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-candidate-features-fr148.ts' as const,
      fr162ModuleRef:
        'packages/face-reading/src/eye-pair-capture-condition-operational-boundary-fr162.ts' as const,
    }),
    descriptiveRegionCoverage: Object.freeze(surface.regions.map(cloneRegion)),
    qualityDimensions: QUALITY_DIMENSIONS,
    researchCoachingEvidence: Object.freeze({
      sourceScope: 'eye_pair_repeat_capture_research' as const,
      frontalNeutralPoseRequested:
        fr162.operationalCaptureGuidance.frontalNeutralPoseRequested,
      cameraNearEyeLevelRequested:
        fr162.operationalCaptureGuidance.cameraNearEyeLevelRequested,
      avoidIntentionallyExtremeNearOrFarFraming:
        fr162.operationalCaptureGuidance
          .avoidIntentionallyExtremeNearOrFarFraming,
      avoidIntentionallyHighOrLowCameraAngle:
        fr162.operationalCaptureGuidance
          .avoidIntentionallyHighOrLowCameraAngle,
      consistentFramingAcrossRepeatedCapturesRequested:
        fr162.operationalCaptureGuidance
          .consistentFramingAcrossRepeatedCapturesRequested,
      promotedToCrossFaceProductGuidance: false as const,
    }),
    authorityBoundary: Object.freeze({
      descriptiveRegionAvailabilityOnly: true as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      automaticCaptureQualityGateAuthorized: false as const,
      automaticMetricSuppressionThresholdAuthorized: false as const,
      automaticRetakeThresholdAuthorized: false as const,
      userFacingPassFailQualityLabelAllowed: false as const,
      crossFaceProductCaptureCoachingIssued: false as const,
      qualityScoreIssued: false as const,
      classificationIssued: false as const,
      traditionalSemanticAuthority: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawGeometryExposed: false as const,
      providerTraceExposed: false as const,
    }),
  });

  assertProductCaptureQualityEvidenceFE036(result);
  return result;
}

export function assertProductCaptureQualityEvidenceFE036(
  value: FE036ProductCaptureQualityEvidence,
): void {
  if (
    value.schemaVersion !== 'fe036-product-capture-quality-evidence-v1' ||
    value.contractVersion !== FE036_PRODUCT_CAPTURE_QUALITY_EVIDENCE_VERSION ||
    value.authorityState !==
      'capture_quality_unassessed_descriptive_observation_only' ||
    value.upstream.neutralObservationContractVersion !==
      FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION ||
    value.upstream.neutralObservationSurfaceValidated !== true
  ) {
    fail('artifact identity or upstream contract drift.');
  }

  const expectedKeys: readonly FE036QualityDimensionKey[] = [
    'pose',
    'face_scale',
    'framing',
    'blur',
    'illumination',
    'occlusion',
  ];
  if (
    Object.keys(value.qualityDimensions).length !== expectedKeys.length ||
    expectedKeys.some((key) => {
      const dimension = value.qualityDimensions[key];
      return (
        dimension.state !== 'unassessed' ||
        dimension.reason !==
          'no_validated_product_quality_construct_or_threshold_authority'
      );
    })
  ) {
    fail('quality dimension authority widened.');
  }

  if (
    value.descriptiveRegionCoverage.length !== FE035B_REGION_ORDER.length ||
    value.descriptiveRegionCoverage.some(
      (region, index) => region.regionKey !== FE035B_REGION_ORDER[index],
    )
  ) {
    fail('descriptive region coverage order drift.');
  }

  for (const region of value.descriptiveRegionCoverage) {
    if (
      new Set(region.unavailableSurfaces).size !==
        region.unavailableSurfaces.length ||
      region.unavailableSurfaces.some(
        (entry) =>
          !FE035B_ALLOWED_UNAVAILABLE_SURFACES[region.regionKey].includes(entry),
      ) ||
      region.state !==
        (region.unavailableSurfaces.length === 0 ? 'available' : 'partial')
    ) {
      fail('descriptive region coverage drift: ' + region.regionKey);
    }
  }

  if (
    value.researchCoachingEvidence.sourceScope !==
      'eye_pair_repeat_capture_research' ||
    value.researchCoachingEvidence.promotedToCrossFaceProductGuidance !== false
  ) {
    fail('research coaching evidence was promoted beyond FR162 scope.');
  }

  if (
    value.authorityBoundary.descriptiveRegionAvailabilityOnly !== true ||
    Object.entries(value.authorityBoundary)
      .filter(([key]) => key !== 'descriptiveRegionAvailabilityOnly')
      .some(([, entry]) => entry !== false)
  ) {
    fail('capture-quality authority widened.');
  }
}

