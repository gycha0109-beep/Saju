import {
  FR266_NEXT_FRONTIER,
  PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  assertProviderIndependentNasalApexAuthorityFR266,
} from './provider-independent-nasal-apex-reference-fr266.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR272_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr272-independent-3d-nasal-apex-acquisition-preflight.md' as const;
export const FR272_NEXT_FRONTIER =
  'probe_user_facing_calibrated_depth_or_external_same_capture_source_then_materialize_post_freeze_registration_bridge_before_fr271_collection' as const;

export type Independent3DSourceClassFR272V1 =
  | 'android_camera2_calibrated_hardware_depth'
  | 'arcore_raw_depth'
  | 'external_calibrated_3d_scan'
  | 'mediapipe_or_fr257_derived_geometry';

export interface Independent3DSourcePreflightInputFR272V1 {
  readonly schemaVersion: 'fr272-independent-3d-source-preflight-input-v1';
  readonly sourceRef: string;
  readonly sourceClass: Independent3DSourceClassFR272V1;
  readonly independentOfMediaPipeAttested: boolean;
  readonly metricScaleAvailable: boolean;
  readonly rgbObservationAvailable: boolean;
  readonly rgbDepthCorrespondenceAvailable: boolean;
  readonly cameraIntrinsicsAvailable: boolean;
  readonly cameraExtrinsicsOrPoseAvailable: boolean;
  readonly providerOutputHiddenDuringAnnotation: boolean;
  readonly providerIndicesHiddenDuringAnnotation: boolean;
  readonly traditionalLabelHiddenDuringAnnotation: boolean;
  readonly annotationFreezeBeforeProviderScoringPlanned: boolean;
  readonly sameCaptureBindingAvailable: boolean;
  readonly fr251UserFacingSameCaptureCompatible: boolean;
  readonly camera2DepthOutputCapability: boolean;
  readonly hardwareDepthSensorConfirmed: boolean;
  readonly arcoreRawDepthAvailable: boolean;
  readonly arcoreRawDepthConfidenceAvailable: boolean;
  readonly worldFacingCamera: boolean;
  readonly externalMetricCalibrationVerified: boolean;
}

export interface Independent3DSourcePreflightFR272V1 {
  readonly schemaVersion: 'fr272-independent-3d-source-preflight-v1';
  readonly artifactVersion: '0.1.0';
  readonly baselineMainSha: '3c5ccc3d96a9ca0847351b90ad467df2906f12dd';
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    | 'independent_3d_source_and_current_fr271_lane_preflight_passed_validation_and_registration_still_required'
    | 'independent_3d_source_or_current_fr271_lane_preflight_blocked';
  readonly sourceRef: string;
  readonly sourceClass: Independent3DSourceClassFR272V1;
  readonly eligibleForIndependentSourceValidation: boolean;
  readonly eligibleForCurrentFR271Lane: boolean;
  readonly sourceValidationBlockers: readonly string[];
  readonly currentLaneBlockers: readonly string[];
  readonly requiredNextChecks: readonly string[];
  readonly sourceFacts: {
    readonly fr251CameraFacingMode: 'user';
    readonly mediaPipeDerivedGeometryUsedAsAnnotationSource: false;
    readonly providerBlindAnnotationRequired: true;
    readonly providerIndexBlindAnnotationRequired: true;
    readonly traditionalLabelBlindAnnotationRequired: true;
    readonly freezeBeforeProviderScoringRequired: true;
  };
  readonly acquisitionBoundary: {
    readonly fr266AnnotationIssued: false;
    readonly canonicalRegistrationTransformIssued: false;
    readonly sourceAccuracyValidated: false;
    readonly sourceRepeatabilityValidated: false;
    readonly fr271CollectionAuthorized: false;
    readonly candidateWinnerIssued: false;
    readonly thresholdIssued: false;
    readonly traditionalZhuntouEquivalenceIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR272_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR272_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-272 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) fail(`${label} must be non-empty.`);
  return trimmed;
}

function commonSourceBlockers(input: Independent3DSourcePreflightInputFR272V1): string[] {
  const blockers: string[] = [];
  if (!input.independentOfMediaPipeAttested) blockers.push('source_not_attested_independent_of_mediapipe');
  if (!input.metricScaleAvailable) blockers.push('metric_scale_unavailable');
  if (!input.rgbObservationAvailable) blockers.push('rgb_annotation_observation_unavailable');
  if (!input.rgbDepthCorrespondenceAvailable) blockers.push('rgb_depth_correspondence_unavailable');
  if (!input.cameraIntrinsicsAvailable) blockers.push('camera_intrinsics_unavailable');
  if (!input.cameraExtrinsicsOrPoseAvailable) blockers.push('camera_extrinsics_or_pose_unavailable');
  if (!input.providerOutputHiddenDuringAnnotation) blockers.push('provider_output_visible_during_annotation');
  if (!input.providerIndicesHiddenDuringAnnotation) blockers.push('provider_indices_visible_during_annotation');
  if (!input.traditionalLabelHiddenDuringAnnotation) blockers.push('traditional_label_visible_during_annotation');
  if (!input.annotationFreezeBeforeProviderScoringPlanned) blockers.push('annotation_freeze_before_provider_scoring_not_planned');
  return blockers;
}

function sourceSpecificBlockers(input: Independent3DSourcePreflightInputFR272V1): string[] {
  switch (input.sourceClass) {
    case 'android_camera2_calibrated_hardware_depth':
      return [
        ...(input.camera2DepthOutputCapability ? [] : ['camera2_depth_output_capability_unavailable']),
        ...(input.hardwareDepthSensorConfirmed ? [] : ['hardware_depth_sensor_not_confirmed']),
      ];
    case 'arcore_raw_depth':
      return [
        ...(input.arcoreRawDepthAvailable ? [] : ['arcore_raw_depth_unavailable']),
        ...(input.arcoreRawDepthConfidenceAvailable ? [] : ['arcore_raw_depth_confidence_unavailable']),
        ...(input.worldFacingCamera ? [] : ['arcore_world_facing_camera_requirement_not_met']),
      ];
    case 'external_calibrated_3d_scan':
      return input.externalMetricCalibrationVerified
        ? []
        : ['external_metric_calibration_not_verified'];
    case 'mediapipe_or_fr257_derived_geometry':
      return ['mediapipe_or_fr257_geometry_forbidden_as_independent_annotation_source'];
  }
}

function currentLaneBlockers(input: Independent3DSourcePreflightInputFR272V1): string[] {
  const blockers: string[] = [];
  if (!input.sameCaptureBindingAvailable) blockers.push('same_capture_binding_unavailable');
  if (!input.fr251UserFacingSameCaptureCompatible) {
    blockers.push('source_not_same_capture_compatible_with_fr251_user_facing_lane');
  }
  if (input.sourceClass === 'arcore_raw_depth') {
    blockers.push('arcore_world_facing_depth_not_fr251_user_facing_same_capture_compatible');
  }
  return blockers;
}

function requiredNextChecks(sourceClass: Independent3DSourceClassFR272V1): readonly string[] {
  const shared = [
    'validate_source_accuracy_without_mediapipe_ground_truth',
    'validate_source_repeatability',
    'freeze_provider_blind_annotation_before_any_fr267_scoring',
    'materialize_post_freeze_registration_into_fr266_canonical_frame',
  ];
  if (sourceClass === 'arcore_raw_depth') {
    return Object.freeze([
      'verify_raw_depth_coverage_at_nasal_apex_pixel',
      'review_raw_depth_confidence_without_promoting_a_confidence_threshold',
      'verify_current_frame_depth_timestamp_binding',
      'resolve_world_facing_arcore_vs_user_facing_fr251_same_capture_incompatibility',
      ...shared,
    ]);
  }
  return Object.freeze(shared);
}

export function preflightIndependent3DSourceFR272(
  input: Independent3DSourcePreflightInputFR272V1,
): Independent3DSourcePreflightFR272V1 {
  assertProviderIndependentNasalApexAuthorityFR266(
    PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  );
  if (FR266_NEXT_FRONTIER !==
    'evaluate_automated_neutral_nasal_apex_candidates_against_frozen_provider_independent_annotations_before_zhuntou_admission') {
    fail('FR266 predecessor frontier drift.');
  }
  if (input.schemaVersion !== 'fr272-independent-3d-source-preflight-input-v1') {
    fail('input schemaVersion is unsupported.');
  }

  const sourceRef = nonEmpty(input.sourceRef, 'sourceRef');
  const sourceValidationBlockers = Object.freeze([
    ...commonSourceBlockers(input),
    ...sourceSpecificBlockers(input),
  ]);
  const laneBlockers = Object.freeze(currentLaneBlockers(input));
  const eligibleForIndependentSourceValidation = sourceValidationBlockers.length === 0;
  const eligibleForCurrentFR271Lane =
    eligibleForIndependentSourceValidation && laneBlockers.length === 0;

  const result: Independent3DSourcePreflightFR272V1 = Object.freeze({
    schemaVersion: 'fr272-independent-3d-source-preflight-v1' as const,
    artifactVersion: '0.1.0' as const,
    baselineMainSha: '3c5ccc3d96a9ca0847351b90ad467df2906f12dd' as const,
    watchtowerTrack: 'face-research' as const,
    authorityState: eligibleForCurrentFR271Lane
      ? 'independent_3d_source_and_current_fr271_lane_preflight_passed_validation_and_registration_still_required' as const
      : 'independent_3d_source_or_current_fr271_lane_preflight_blocked' as const,
    sourceRef,
    sourceClass: input.sourceClass,
    eligibleForIndependentSourceValidation,
    eligibleForCurrentFR271Lane,
    sourceValidationBlockers,
    currentLaneBlockers: laneBlockers,
    requiredNextChecks: requiredNextChecks(input.sourceClass),
    sourceFacts: Object.freeze({
      fr251CameraFacingMode: 'user' as const,
      mediaPipeDerivedGeometryUsedAsAnnotationSource: false as const,
      providerBlindAnnotationRequired: true as const,
      providerIndexBlindAnnotationRequired: true as const,
      traditionalLabelBlindAnnotationRequired: true as const,
      freezeBeforeProviderScoringRequired: true as const,
    }),
    acquisitionBoundary: Object.freeze({
      fr266AnnotationIssued: false as const,
      canonicalRegistrationTransformIssued: false as const,
      sourceAccuracyValidated: false as const,
      sourceRepeatabilityValidated: false as const,
      fr271CollectionAuthorized: false as const,
      candidateWinnerIssued: false as const,
      thresholdIssued: false as const,
      traditionalZhuntouEquivalenceIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR272_RESEARCH_NOTE_REF,
    nextFrontier: FR272_NEXT_FRONTIER,
  });

  assertIndependent3DSourcePreflightFR272(result);
  return result;
}

export function assertIndependent3DSourcePreflightFR272(
  result: Independent3DSourcePreflightFR272V1,
): void {
  if (
    result.schemaVersion !== 'fr272-independent-3d-source-preflight-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.baselineMainSha !== '3c5ccc3d96a9ca0847351b90ad467df2906f12dd' ||
    result.watchtowerTrack !== 'face-research' ||
    result.researchNoteRef !== FR272_RESEARCH_NOTE_REF ||
    result.nextFrontier !== FR272_NEXT_FRONTIER
  ) fail('artifact identity/baseline drift.');

  const sourcePassed = result.sourceValidationBlockers.length === 0;
  const lanePassed = sourcePassed && result.currentLaneBlockers.length === 0;
  if (
    result.eligibleForIndependentSourceValidation !== sourcePassed ||
    result.eligibleForCurrentFR271Lane !== lanePassed ||
    result.authorityState !== (lanePassed
      ? 'independent_3d_source_and_current_fr271_lane_preflight_passed_validation_and_registration_still_required'
      : 'independent_3d_source_or_current_fr271_lane_preflight_blocked')
  ) fail('preflight state does not match source/lane blockers.');

  if (
    result.sourceFacts.fr251CameraFacingMode !== 'user' ||
    result.sourceFacts.mediaPipeDerivedGeometryUsedAsAnnotationSource !== false ||
    result.sourceFacts.providerBlindAnnotationRequired !== true ||
    result.sourceFacts.providerIndexBlindAnnotationRequired !== true ||
    result.sourceFacts.traditionalLabelBlindAnnotationRequired !== true ||
    result.sourceFacts.freezeBeforeProviderScoringRequired !== true
  ) fail('source independence/blinding boundary drift.');

  if (Object.values(result.acquisitionBoundary).some((value) => value !== false)) {
    fail('preflight widened into acquisition, semantic, or production authority.');
  }
}
