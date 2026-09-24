import {
  assertCanonicalRgbSelfieMorphologyPayloadFR285,
  type FR285CanonicalRgbSelfieMorphologyPayload,
  type FR285MouthFeature,
} from './canonical-rgb-selfie-morphology-fr285.js';
import {
  reviewFiveOfficerMouthMetricBindingsFR81,
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81,
} from './five-officers-mouth-metric-binding-review-fr81.js';
import {
  reviewFiveOfficerSquareBroadCombinedMetricBindingFR83,
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83,
} from './five-officers-square-broad-combined-binding-review-fr83.js';
import type {
  FRB001CanonicalFeatureRuntimeCapability,
} from './face-reading-binding-foundation-frb001.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR285_PRODUCT_COLUMN_MAP,
  assertFR285ProductColumnMap,
} from './rgb-selfie-product-column-map-fr285.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FRB002_CONTRACT_VERSION =
  'FRB002-FR285-MOUTH-CAPABILITY-HANDSHAKE-v1' as const;

const MOUTH_WIDTH_SIZE_REF = 'mouth.width_and_relative_size' as const;
const MOUTH_CORNER_REF = 'mouth.corner_orientation' as const;
const MOUTH_ANGULARITY_REF = 'mouth.outline_angularity' as const;

const FR80_METRIC_REF =
  'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;
const FR82_METRIC_REF =
  'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const;
const FR212_METRIC_REF =
  'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0' as const;
const FR214_METRIC_REF =
  'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0' as const;

const EXTRACTOR_NOT_MATERIALIZED_REASONS = new Set<string>([
  'image_model_extractor_not_materialized',
  'governed_lip_fullness_extractor_not_materialized',
  'philtrum_extractor_not_materialized',
  'appearance_model_extractor_not_materialized',
]);

export type FRB002MouthFeatureKey =
  | 'mouth.width_and_relative_size'
  | 'mouth.corner_orientation'
  | 'mouth.outline_angularity'
  | 'mouth.visible_lip_fullness'
  | 'mouth.philtrum_length_width'
  | 'mouth.visible_lip_color';

export interface FRB002MouthBindingGateEntry {
  readonly featureKey: FRB002MouthFeatureKey;
  readonly engineObservationState:
    | 'materialized_available'
    | 'materialized_capture_unavailable'
    | 'not_materialized';
  readonly sourceMetricRefs: readonly string[];
  readonly traditionalTargetRef: string | null;
  readonly traditionalBindingState:
    | 'not_admitted'
    | 'no_reviewed_binding_target';
  readonly automaticCriterionStateAuthorized: false;
  readonly thresholdRef: null;
  readonly claimIssued: false;
  readonly detail: string;
}

export interface FRB002MouthBindingGateAudit {
  readonly schemaVersion: 'frb002-mouth-traditional-binding-gate-audit-v1';
  readonly contractVersion: typeof FRB002_CONTRACT_VERSION;
  readonly authorityState:
    'fr285_mouth_observation_capabilities_available_without_traditional_binding_authority';
  readonly mouthFeatureCount: 6;
  readonly materializedAvailableCount: number;
  readonly materializedCaptureUnavailableCount: number;
  readonly notMaterializedCount: number;
  readonly admittedTraditionalMetricBindings: 0;
  readonly thresholdRefsIssued: 0;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly entries: readonly FRB002MouthBindingGateEntry[];
  readonly authorityBoundary: {
    readonly traditionalMeaningApplied: false;
    readonly thresholdInvented: false;
    readonly calibrationInvented: false;
    readonly criterionStateIssued: false;
    readonly claimIssued: false;
    readonly observationExtractionModified: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FRB-002 ${message}`);
}

function assertCompleteFeatureVocabulary(
  capabilities: readonly FRB001CanonicalFeatureRuntimeCapability[],
): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  const expected =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries
      .map((entry) => entry.featureKey);
  if (
    capabilities.length !== expected.length
    || new Set(capabilities.map((entry) => entry.featureKey)).size !== expected.length
    || expected.some((featureKey) =>
      !capabilities.some((entry) => entry.featureKey === featureKey))
  ) {
    fail('FR285 capability handshake must cover the exact 29-feature FR282 vocabulary.');
  }
}

function capabilityFromFeature(
  feature: FR285CanonicalRgbSelfieMorphologyPayload['features'][number],
): FRB001CanonicalFeatureRuntimeCapability {
  if (feature.status === 'available') {
    return Object.freeze({
      featureKey: feature.featureKey,
      materializationState: 'materialized' as const,
      availabilityState: 'available' as const,
      qualityContextRefs: Object.freeze([...feature.quality.evidenceRefs]),
    });
  }

  if (EXTRACTOR_NOT_MATERIALIZED_REASONS.has(feature.reason)) {
    return Object.freeze({
      featureKey: feature.featureKey,
      materializationState: 'not_materialized' as const,
      availabilityState: 'not_evaluated' as const,
      qualityContextRefs: Object.freeze([...feature.quality.evidenceRefs]),
    });
  }

  return Object.freeze({
    featureKey: feature.featureKey,
    materializationState: 'materialized' as const,
    availabilityState: 'unavailable' as const,
    qualityContextRefs: Object.freeze([...feature.quality.evidenceRefs]),
  });
}

export function buildFR285RuntimeCapabilitiesFRB002(
  payload: FR285CanonicalRgbSelfieMorphologyPayload,
): readonly FRB001CanonicalFeatureRuntimeCapability[] {
  assertCanonicalRgbSelfieMorphologyPayloadFR285(payload);
  assertFR285ProductColumnMap();

  const payloadFeatures = new Map(
    payload.features.map((feature) => [feature.featureKey, feature] as const),
  );
  const pending = new Set(payload.pendingFeatureKeys);

  const capabilities = FR285_PRODUCT_COLUMN_MAP.map(
    (column): FRB001CanonicalFeatureRuntimeCapability => {
      const feature = payloadFeatures.get(column.featureKey);
      if (feature !== undefined) {
        return capabilityFromFeature(feature);
      }

      if (!pending.has(column.featureKey)) {
        fail(
          `FR285 capability adapter lost ${column.featureKey}: neither payload feature nor pending key.`,
        );
      }

      if (column.implementationState === 'deferred_unavailable') {
        return Object.freeze({
          featureKey: column.featureKey,
          materializationState: 'unsupported' as const,
          availabilityState: 'unavailable' as const,
          qualityContextRefs: Object.freeze([]),
        });
      }

      return Object.freeze({
        featureKey: column.featureKey,
        materializationState: 'not_materialized' as const,
        availabilityState: 'not_evaluated' as const,
        qualityContextRefs: Object.freeze([]),
      });
    },
  );

  assertCompleteFeatureVocabulary(capabilities);

  const expectedMaterialized = new Set([
    'eye.width_height_ratio',
    'eye.inter_eye_spacing_ratio',
    'eye.outer_corner_tilt',
    'eye.bilateral_shape_asymmetry',
    MOUTH_WIDTH_SIZE_REF,
    MOUTH_CORNER_REF,
    MOUTH_ANGULARITY_REF,
  ]);
  for (const featureKey of expectedMaterialized) {
    const capability = capabilities.find((entry) => entry.featureKey === featureKey);
    if (capability === undefined || capability.materializationState !== 'materialized') {
      fail(`FR285 materialized feature lost in FRB002 handshake: ${featureKey}.`);
    }
  }

  return Object.freeze(capabilities);
}

function mouthFeature(
  payload: FR285CanonicalRgbSelfieMorphologyPayload,
  featureKey: FRB002MouthFeatureKey,
): FR285MouthFeature {
  const feature = payload.features.find(
    (candidate) => candidate.featureKey === featureKey,
  );
  if (feature === undefined || feature.regionKey !== 'mouth_lips') {
    fail(`missing FR285 mouth feature: ${featureKey}.`);
  }
  return feature as FR285MouthFeature;
}

function assertAvailableMetricRefs(
  feature: FR285MouthFeature,
  expected: readonly string[],
): void {
  if (feature.status !== 'available') {
    fail(`${feature.featureKey} must be available for its governed metric-ref audit.`);
  }
  if (
    feature.sourceMetricRefs.length !== expected.length
    || expected.some((ref) => !feature.sourceMetricRefs.includes(ref))
  ) {
    fail(`${feature.featureKey} source metric refs drifted.`);
  }
}

function engineState(
  feature: FR285MouthFeature,
): FRB002MouthBindingGateEntry['engineObservationState'] {
  if (feature.status === 'available') return 'materialized_available';
  if (EXTRACTOR_NOT_MATERIALIZED_REASONS.has(feature.reason)) {
    return 'not_materialized';
  }
  return 'materialized_capture_unavailable';
}

export function auditFR285MouthTraditionalBindingGateFRB002(
  payload: FR285CanonicalRgbSelfieMorphologyPayload,
): FRB002MouthBindingGateAudit {
  assertCanonicalRgbSelfieMorphologyPayloadFR285(payload);
  buildFR285RuntimeCapabilitiesFRB002(payload);

  const widthSize = mouthFeature(payload, MOUTH_WIDTH_SIZE_REF);
  const corner = mouthFeature(payload, MOUTH_CORNER_REF);
  const angularity = mouthFeature(payload, MOUTH_ANGULARITY_REF);
  const fullness = mouthFeature(payload, 'mouth.visible_lip_fullness');
  const philtrum = mouthFeature(payload, 'mouth.philtrum_length_width');
  const color = mouthFeature(payload, 'mouth.visible_lip_color');

  assertAvailableMetricRefs(widthSize, [FR80_METRIC_REF, FR82_METRIC_REF]);
  assertAvailableMetricRefs(angularity, [FR214_METRIC_REF]);
  if (
    corner.status === 'available'
    && (
      corner.sourceMetricRefs.length !== 1
      || corner.sourceMetricRefs[0] !== FR212_METRIC_REF
    )
  ) {
    fail('mouth.corner_orientation source metric ref drifted.');
  }

  const fr81 = reviewFiveOfficerMouthMetricBindingsFR81();
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81(fr81);
  const fr83 = reviewFiveOfficerSquareBroadCombinedMetricBindingFR83();
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83(fr83);

  if (
    fr81.bindingSummary.traditionalMetricBindingsIssued !== 0
    || fr81.bindingSummary.thresholdRefsIssued !== 0
    || fr81.bindingSummary.criterionStatesIssued !== 0
    || fr81.bindingSummary.claimsIssued !== 0
    || fr83.combinedReview.traditionalMetricBindingRef !== null
    || fr83.combinedReview.thresholdRef !== null
    || fr83.combinedReview.automaticCriterionStateAuthorized !== false
    || fr83.combinedReview.bindingDecision !== 'not_admitted'
    || fr83.criterionStatesIssued !== 0
    || fr83.claimsIssued !== 0
  ) {
    fail('upstream mouth traditional-binding authority changed; FRB002 requires re-review.');
  }

  const cornersReview = fr81.criterionReviews.find(
    (entry) => entry.criterionId === 'criterion.intake.corners_arched',
  );
  if (
    cornersReview === undefined
    || cornersReview.bindingDecision !== 'not_admitted'
    || cornersReview.traditionalMetricBindingRef !== null
    || cornersReview.thresholdRef !== null
    || cornersReview.automaticCriterionStateAuthorized !== false
  ) {
    fail('FR81 corners-arched gate drifted.');
  }

  const entries: readonly FRB002MouthBindingGateEntry[] = Object.freeze([
    Object.freeze({
      featureKey: MOUTH_WIDTH_SIZE_REF,
      engineObservationState: engineState(widthSize),
      sourceMetricRefs: Object.freeze([...widthSize.sourceMetricRefs]),
      traditionalTargetRef: 'criterion.intake.square_broad',
      traditionalBindingState: 'not_admitted' as const,
      automaticCriterionStateAuthorized: false as const,
      thresholdRef: null,
      claimIssued: false as const,
      detail:
        'FR80+FR82 are observable numeric inputs, but FR83 explicitly does not admit them as traditional 方大 semantics or an automatic criterion state.',
    }),
    Object.freeze({
      featureKey: MOUTH_CORNER_REF,
      engineObservationState: engineState(corner),
      sourceMetricRefs: Object.freeze([...corner.sourceMetricRefs]),
      traditionalTargetRef: 'criterion.intake.corners_arched',
      traditionalBindingState: 'not_admitted' as const,
      automaticCriterionStateAuthorized: false as const,
      thresholdRef: null,
      claimIssued: false as const,
      detail:
        'FR285 can expose neutral mouth-corner orientation, while FR81 keeps 角弓 capture-sensitive and admits no traditional metric binding or threshold.',
    }),
    Object.freeze({
      featureKey: MOUTH_ANGULARITY_REF,
      engineObservationState: engineState(angularity),
      sourceMetricRefs: Object.freeze([...angularity.sourceMetricRefs]),
      traditionalTargetRef: null,
      traditionalBindingState: 'no_reviewed_binding_target' as const,
      automaticCriterionStateAuthorized: false as const,
      thresholdRef: null,
      claimIssued: false as const,
      detail:
        'The neutral outline-angularity observation is available, but FR81/FR83 declare no reviewed traditional target for this metric.',
    }),
    Object.freeze({
      featureKey: 'mouth.visible_lip_fullness',
      engineObservationState: engineState(fullness),
      sourceMetricRefs: Object.freeze([...fullness.sourceMetricRefs]),
      traditionalTargetRef: 'criterion.intake.lips_substantial',
      traditionalBindingState: 'not_admitted' as const,
      automaticCriterionStateAuthorized: false as const,
      thresholdRef: null,
      claimIssued: false as const,
      detail:
        'The traditional 端厚 target exists in research, but FR285 has no materialized lip-fullness extractor and FR81 admits no binding.',
    }),
    Object.freeze({
      featureKey: 'mouth.philtrum_length_width',
      engineObservationState: engineState(philtrum),
      sourceMetricRefs: Object.freeze([...philtrum.sourceMetricRefs]),
      traditionalTargetRef: null,
      traditionalBindingState: 'no_reviewed_binding_target' as const,
      automaticCriterionStateAuthorized: false as const,
      thresholdRef: null,
      claimIssued: false as const,
      detail:
        'The FR285 philtrum observation is not materialized and no FR81/FR83 traditional binding target is reviewed.',
    }),
    Object.freeze({
      featureKey: 'mouth.visible_lip_color',
      engineObservationState: engineState(color),
      sourceMetricRefs: Object.freeze([...color.sourceMetricRefs]),
      traditionalTargetRef: 'criterion.intake.red_lip_color',
      traditionalBindingState: 'not_admitted' as const,
      automaticCriterionStateAuthorized: false as const,
      thresholdRef: null,
      claimIssued: false as const,
      detail:
        'The traditional 唇紅 target exists in research, but FR285 has no appearance extractor and FR81 keeps the criterion dynamic/capture-sensitive with no binding.',
    }),
  ]);

  return Object.freeze({
    schemaVersion: 'frb002-mouth-traditional-binding-gate-audit-v1' as const,
    contractVersion: FRB002_CONTRACT_VERSION,
    authorityState:
      'fr285_mouth_observation_capabilities_available_without_traditional_binding_authority' as const,
    mouthFeatureCount: 6 as const,
    materializedAvailableCount:
      entries.filter((entry) =>
        entry.engineObservationState === 'materialized_available').length,
    materializedCaptureUnavailableCount:
      entries.filter((entry) =>
        entry.engineObservationState === 'materialized_capture_unavailable').length,
    notMaterializedCount:
      entries.filter((entry) =>
        entry.engineObservationState === 'not_materialized').length,
    admittedTraditionalMetricBindings: 0 as const,
    thresholdRefsIssued: 0 as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    entries,
    authorityBoundary: Object.freeze({
      traditionalMeaningApplied: false as const,
      thresholdInvented: false as const,
      calibrationInvented: false as const,
      criterionStateIssued: false as const,
      claimIssued: false as const,
      observationExtractionModified: false as const,
    }),
  });
}