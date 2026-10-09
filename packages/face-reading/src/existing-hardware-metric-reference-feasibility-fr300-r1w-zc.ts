import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  assertFR299Independent3DNoseReferenceBundleContract,
} from './independent-3d-nose-reference-bundle-fr299.js';
import {
  FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION,
  FR300_R1V_ZC_CURRENT_GATE,
  assertFR300R1VZCASTControlledPreflightContract,
} from './ast-face-controlled-preflight-fr300-r1v-zc.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1W_ZC_EXISTING_HARDWARE_METRIC_CONTRACT_VERSION =
  'FR300-R1W-ZC-EXISTING-HARDWARE-METRIC-v1' as const;

export type FR300R1WZCExistingHardwareLane =
  | 'android_camera2_calibrated_hardware_depth'
  | 'arcore_raw_depth'
  | 'external_calibrated_multiview_rgb'
  | 'ordinary_monocular_rgb_only';

export interface FR300R1WZCExistingHardwareManifest {
  readonly schemaVersion: 'fr300-r1w-zc-existing-hardware-manifest-v1';
  readonly sourceRef: string;
  readonly lane: FR300R1WZCExistingHardwareLane;
  readonly alreadyOwnedHardware: true;
  readonly noPurchaseRequired: true;
  readonly independentOfCandidateProvider: boolean;
  readonly humanFaceCapturePlanned: false;
  readonly knownDimensionNonHumanTargetAvailable: boolean;
  readonly independentTargetMeasurementAvailable: boolean;
  readonly metricAccuracyValidationPlanned: boolean;
  readonly repeatabilityValidationPlanned: boolean;
  readonly providerOutputHiddenDuringReferenceConstruction: boolean;
  readonly providerIndicesHiddenDuringReferenceConstruction: boolean;
  readonly traditionalLabelsHiddenDuringReferenceConstruction: boolean;
  readonly camera2: {
    readonly depthOutputCapability: boolean;
    readonly depth16OutputAvailable: boolean;
    readonly calibrationMetadataAvailable: boolean;
    readonly lensPoseAvailable: boolean;
    readonly lensDistortionAvailable: boolean;
    readonly depthIsExclusive: boolean | null;
    readonly colorOutputAvailable: boolean;
    readonly simultaneousColorDepthCaptureVerified: boolean;
    readonly lensFacing: 'user' | 'back' | 'external' | 'unknown';
  };
  readonly arcore: {
    readonly depthApiSupported: boolean;
    readonly rawDepthAvailable: boolean;
    readonly rawDepthConfidenceAvailable: boolean;
    readonly rawDepthMillimeterUnits: boolean;
    readonly currentFrameBindingAvailable: boolean;
    readonly cameraIntrinsicsAvailable: boolean;
    readonly worldFacingCamera: boolean;
  };
  readonly externalCalibration: {
    readonly multiViewCaptureAvailable: boolean;
    readonly cameraIntrinsicsKnownOrCalibratable: boolean;
    readonly similarityScaleAnchorAvailable: boolean;
    readonly scaleAnchorIndependentOfReconstruction: boolean;
    readonly reconstructionProviderIndependentOfCandidate: boolean;
  };
}

export type FR300R1WZCLaneBlocker =
  | 'source_ref_missing'
  | 'candidate_provider_independence_missing'
  | 'known_dimension_target_missing'
  | 'independent_target_measurement_missing'
  | 'metric_accuracy_validation_not_planned'
  | 'repeatability_validation_not_planned'
  | 'provider_output_not_blinded'
  | 'provider_indices_not_blinded'
  | 'traditional_labels_not_blinded'
  | 'camera2_depth_output_capability_missing'
  | 'camera2_depth16_output_missing'
  | 'camera2_calibration_metadata_missing'
  | 'camera2_lens_pose_missing'
  | 'camera2_lens_distortion_missing'
  | 'camera2_color_output_missing'
  | 'arcore_depth_api_unsupported'
  | 'arcore_raw_depth_missing'
  | 'arcore_raw_depth_confidence_missing'
  | 'arcore_metric_units_unbound'
  | 'arcore_current_frame_binding_missing'
  | 'arcore_intrinsics_missing'
  | 'arcore_world_facing_requirement_missing'
  | 'external_multiview_capture_missing'
  | 'external_camera_intrinsics_missing'
  | 'external_similarity_scale_anchor_missing'
  | 'external_scale_anchor_not_independent'
  | 'external_reconstruction_not_provider_independent'
  | 'ordinary_monocular_rgb_has_no_independent_metric_scale';

export interface FR300R1WZCExistingHardwareAssessment {
  readonly schemaVersion: 'fr300-r1w-zc-existing-hardware-assessment-v1';
  readonly lane: FR300R1WZCExistingHardwareLane;
  readonly sourceRef: string;
  readonly status:
    | 'eligible_for_nonhuman_calibration_probe'
    | 'blocked';
  readonly blockers: readonly FR300R1WZCLaneBlocker[];
  readonly sameCaptureRgb3dPotential: boolean;
  readonly validatedRegistrationRequiredForFutureFR299: boolean;
  readonly authorityBoundary: {
    readonly deviceOwnershipInferredByStaticContract: false;
    readonly humanFaceCaptureAuthorized: false;
    readonly biometricArtifactCollectionAuthorized: false;
    readonly metricAccuracyValidated: false;
    readonly repeatabilityValidated: false;
    readonly fr266AnnotationIssued: false;
    readonly fr297AnnotationIssued: false;
    readonly fr299SourceIssued: false;
    readonly fr299BundleMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export const FR300_R1W_ZC_PLATFORM_FACTS = Object.freeze({
  androidCamera2: Object.freeze({
    depthOutputCapabilityGuaranteesDepth16: true as const,
    depthOutputCapabilityRequiresPoseTranslation: true as const,
    depthOutputCapabilityRequiresPoseRotation: true as const,
    depthOutputCapabilityRequiresIntrinsicCalibration: true as const,
    depthOutputCapabilityRequiresLensDistortion: true as const,
    depthIsExclusiveMetadataExists: true as const,
    depthIsExclusiveFalseAllowsSingleRequestColorAndDepth: true as const,
    depthIsExclusiveTrueRequiresInterleavedColorAndDepth: true as const,
    frontFacingDepthOutputGuaranteed: false as const,
  }),
  arcoreRawDepth: Object.freeze({
    deviceSupportMustBeQueriedAtRuntime: true as const,
    hardwareDepthSensorRequired: false as const,
    availableHardwareDepthMayBeFused: true as const,
    rawDepthIsSparse: true as const,
    confidenceImageAvailable: true as const,
    depthUnit: 'millimeter' as const,
    currentCameraFrameCorrespondenceDocumented: true as const,
    worldFacingMotionPrimarySource: true as const,
    fr251UserFacingSameCaptureCompatibleByDefault: false as const,
  }),
  externalMultiview: Object.freeze({
    knownIntrinsicsCanBeSuppliedToColmap: true as const,
    similarityAlignmentCanTransformReconstructionToExternalFrame:
      true as const,
    reconstructionScaleIsNotTrustedUntilExternallyAnchoredAndValidated:
      true as const,
  }),
  ordinaryMonocularRgbOnly: Object.freeze({
    independentMetricScaleAvailableByDefault: false as const,
    admissibleAsFR299MetricTruthByItself: false as const,
  }),
});

export const FR300_R1W_ZC_NONHUMAN_PROBE_POLICY = Object.freeze({
  targetClass:
    'nonhuman_known_dimension_calibration_target' as const,
  humanFaceAllowed: false as const,
  biometricArtifactAllowed: false as const,
  knownPhysicalDimensionsRequired: true as const,
  independentMeasurementReferenceRequired: true as const,
  sourceAccuracyMustBeEmpiricallyValidated: true as const,
  sourceRepeatabilityMustBeEmpiricallyValidated: true as const,
  providerBlindReferenceConstructionRequired: true as const,
  traditionalLabelBlindReferenceConstructionRequired: true as const,
  acceptanceThresholdIssuedByThisStage: false as const,
  descriptiveErrorMetricsOnlyUntilNextAdjudication: true as const,
});

export const FR300_R1W_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1w-zc-existing-hardware-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition: 'conditional_pass_to_device_probe' as const,
  concreteDeviceModelBound: false as const,
  runtimeHardwareManifestCollected: false as const,
  nonhumanCalibrationProbeExecuted: false as const,
  humanFaceCapturePerformed: false as const,
  biometricArtifactCollected: false as const,
  newHardwarePurchaseAuthorized: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionWithoutNewExternalAuthorization:
    'collect_runtime_existing_hardware_manifest_then_run_nonhuman_known_dimension_calibration_probe_for_the_first_eligible_lane' as const,
  authority: Object.freeze({
    existingHardwareMetricReferenceAuthorized: false as const,
    realFR299SourceAuthorized: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1W-ZC ${message}`);
}

function commonBlockers(
  input: FR300R1WZCExistingHardwareManifest,
): FR300R1WZCLaneBlocker[] {
  const blockers: FR300R1WZCLaneBlocker[] = [];
  if (input.sourceRef.trim().length === 0) blockers.push('source_ref_missing');
  if (!input.independentOfCandidateProvider) {
    blockers.push('candidate_provider_independence_missing');
  }
  if (!input.knownDimensionNonHumanTargetAvailable) {
    blockers.push('known_dimension_target_missing');
  }
  if (!input.independentTargetMeasurementAvailable) {
    blockers.push('independent_target_measurement_missing');
  }
  if (!input.metricAccuracyValidationPlanned) {
    blockers.push('metric_accuracy_validation_not_planned');
  }
  if (!input.repeatabilityValidationPlanned) {
    blockers.push('repeatability_validation_not_planned');
  }
  if (!input.providerOutputHiddenDuringReferenceConstruction) {
    blockers.push('provider_output_not_blinded');
  }
  if (!input.providerIndicesHiddenDuringReferenceConstruction) {
    blockers.push('provider_indices_not_blinded');
  }
  if (!input.traditionalLabelsHiddenDuringReferenceConstruction) {
    blockers.push('traditional_labels_not_blinded');
  }
  return blockers;
}

function laneBlockers(
  input: FR300R1WZCExistingHardwareManifest,
): FR300R1WZCLaneBlocker[] {
  switch (input.lane) {
    case 'android_camera2_calibrated_hardware_depth':
      return [
        ...(input.camera2.depthOutputCapability
          ? []
          : ['camera2_depth_output_capability_missing' as const]),
        ...(input.camera2.depth16OutputAvailable
          ? []
          : ['camera2_depth16_output_missing' as const]),
        ...(input.camera2.calibrationMetadataAvailable
          ? []
          : ['camera2_calibration_metadata_missing' as const]),
        ...(input.camera2.lensPoseAvailable
          ? []
          : ['camera2_lens_pose_missing' as const]),
        ...(input.camera2.lensDistortionAvailable
          ? []
          : ['camera2_lens_distortion_missing' as const]),
        ...(input.camera2.colorOutputAvailable
          ? []
          : ['camera2_color_output_missing' as const]),
      ];
    case 'arcore_raw_depth':
      return [
        ...(input.arcore.depthApiSupported
          ? []
          : ['arcore_depth_api_unsupported' as const]),
        ...(input.arcore.rawDepthAvailable
          ? []
          : ['arcore_raw_depth_missing' as const]),
        ...(input.arcore.rawDepthConfidenceAvailable
          ? []
          : ['arcore_raw_depth_confidence_missing' as const]),
        ...(input.arcore.rawDepthMillimeterUnits
          ? []
          : ['arcore_metric_units_unbound' as const]),
        ...(input.arcore.currentFrameBindingAvailable
          ? []
          : ['arcore_current_frame_binding_missing' as const]),
        ...(input.arcore.cameraIntrinsicsAvailable
          ? []
          : ['arcore_intrinsics_missing' as const]),
        ...(input.arcore.worldFacingCamera
          ? []
          : ['arcore_world_facing_requirement_missing' as const]),
      ];
    case 'external_calibrated_multiview_rgb':
      return [
        ...(input.externalCalibration.multiViewCaptureAvailable
          ? []
          : ['external_multiview_capture_missing' as const]),
        ...(input.externalCalibration.cameraIntrinsicsKnownOrCalibratable
          ? []
          : ['external_camera_intrinsics_missing' as const]),
        ...(input.externalCalibration.similarityScaleAnchorAvailable
          ? []
          : ['external_similarity_scale_anchor_missing' as const]),
        ...(input.externalCalibration.scaleAnchorIndependentOfReconstruction
          ? []
          : ['external_scale_anchor_not_independent' as const]),
        ...(input.externalCalibration
          .reconstructionProviderIndependentOfCandidate
          ? []
          : ['external_reconstruction_not_provider_independent' as const]),
      ];
    case 'ordinary_monocular_rgb_only':
      return [
        'ordinary_monocular_rgb_has_no_independent_metric_scale' as const,
      ];
  }
}

function sameCapturePotential(
  input: FR300R1WZCExistingHardwareManifest,
): boolean {
  if (
    input.lane === 'android_camera2_calibrated_hardware_depth'
  ) {
    return (
      input.camera2.lensFacing === 'user' &&
      input.camera2.depthIsExclusive === false &&
      input.camera2.simultaneousColorDepthCaptureVerified
    );
  }
  if (input.lane === 'arcore_raw_depth') return false;
  if (input.lane === 'external_calibrated_multiview_rgb') {
    return false;
  }
  return false;
}

export function assessFR300R1WZCExistingHardwareManifest(
  input: FR300R1WZCExistingHardwareManifest,
): FR300R1WZCExistingHardwareAssessment {
  assertFR300R1WZCExistingHardwareMetricContract();

  if (
    input.schemaVersion !==
      'fr300-r1w-zc-existing-hardware-manifest-v1'
  ) {
    fail('manifest schemaVersion drift.');
  }
  if (!input.alreadyOwnedHardware || !input.noPurchaseRequired) {
    fail('R1W-ZC accepts existing hardware only.');
  }
  if (input.humanFaceCapturePlanned !== false) {
    fail('human face capture is forbidden in R1W-ZC.');
  }

  const blockers = Object.freeze([
    ...commonBlockers(input),
    ...laneBlockers(input),
  ]);
  const sameCaptureRgb3dPotential = sameCapturePotential(input);

  return Object.freeze({
    schemaVersion:
      'fr300-r1w-zc-existing-hardware-assessment-v1' as const,
    lane: input.lane,
    sourceRef: input.sourceRef.trim(),
    status:
      blockers.length === 0
        ? 'eligible_for_nonhuman_calibration_probe'
        : 'blocked',
    blockers,
    sameCaptureRgb3dPotential,
    validatedRegistrationRequiredForFutureFR299:
      !sameCaptureRgb3dPotential,
    authorityBoundary: Object.freeze({
      deviceOwnershipInferredByStaticContract: false as const,
      humanFaceCaptureAuthorized: false as const,
      biometricArtifactCollectionAuthorized: false as const,
      metricAccuracyValidated: false as const,
      repeatabilityValidated: false as const,
      fr266AnnotationIssued: false as const,
      fr297AnnotationIssued: false as const,
      fr299SourceIssued: false as const,
      fr299BundleMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function assertFR300R1WZCExistingHardwareMetricContract(): void {
  assertFR300R1VZCASTControlledPreflightContract();
  assertFR299Independent3DNoseReferenceBundleContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION.disposition !==
      'hold_external_authority' ||
    FR300_R1V_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1V_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0
  ) {
    fail('R1V-ZC predecessor authority drift.');
  }

  if (
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1'
  ) {
    fail('FR299 contract drift.');
  }

  const facts = FR300_R1W_ZC_PLATFORM_FACTS;
  if (
    !facts.androidCamera2.depthOutputCapabilityGuaranteesDepth16 ||
    !facts.androidCamera2.depthOutputCapabilityRequiresPoseTranslation ||
    !facts.androidCamera2.depthOutputCapabilityRequiresPoseRotation ||
    !facts.androidCamera2.depthOutputCapabilityRequiresIntrinsicCalibration ||
    !facts.androidCamera2.depthOutputCapabilityRequiresLensDistortion ||
    !facts.androidCamera2.depthIsExclusiveMetadataExists ||
    !facts.androidCamera2.depthIsExclusiveFalseAllowsSingleRequestColorAndDepth ||
    !facts.androidCamera2.depthIsExclusiveTrueRequiresInterleavedColorAndDepth ||
    facts.androidCamera2.frontFacingDepthOutputGuaranteed
  ) {
    fail('Android Camera2 platform-fact boundary drift.');
  }

  if (
    !facts.arcoreRawDepth.deviceSupportMustBeQueriedAtRuntime ||
    facts.arcoreRawDepth.hardwareDepthSensorRequired ||
    !facts.arcoreRawDepth.availableHardwareDepthMayBeFused ||
    !facts.arcoreRawDepth.rawDepthIsSparse ||
    !facts.arcoreRawDepth.confidenceImageAvailable ||
    facts.arcoreRawDepth.depthUnit !== 'millimeter' ||
    !facts.arcoreRawDepth.currentCameraFrameCorrespondenceDocumented ||
    !facts.arcoreRawDepth.worldFacingMotionPrimarySource ||
    facts.arcoreRawDepth.fr251UserFacingSameCaptureCompatibleByDefault
  ) {
    fail('ARCore Raw Depth platform-fact boundary drift.');
  }

  if (
    !facts.externalMultiview.knownIntrinsicsCanBeSuppliedToColmap ||
    !facts.externalMultiview
      .similarityAlignmentCanTransformReconstructionToExternalFrame ||
    !facts.externalMultiview
      .reconstructionScaleIsNotTrustedUntilExternallyAnchoredAndValidated ||
    facts.ordinaryMonocularRgbOnly.independentMetricScaleAvailableByDefault ||
    facts.ordinaryMonocularRgbOnly.admissibleAsFR299MetricTruthByItself
  ) {
    fail('external/monocular reconstruction boundary drift.');
  }

  if (
    FR300_R1W_ZC_NONHUMAN_PROBE_POLICY.humanFaceAllowed ||
    FR300_R1W_ZC_NONHUMAN_PROBE_POLICY.biometricArtifactAllowed ||
    !FR300_R1W_ZC_NONHUMAN_PROBE_POLICY
      .knownPhysicalDimensionsRequired ||
    !FR300_R1W_ZC_NONHUMAN_PROBE_POLICY
      .independentMeasurementReferenceRequired ||
    !FR300_R1W_ZC_NONHUMAN_PROBE_POLICY
      .sourceAccuracyMustBeEmpiricallyValidated ||
    !FR300_R1W_ZC_NONHUMAN_PROBE_POLICY
      .sourceRepeatabilityMustBeEmpiricallyValidated ||
    FR300_R1W_ZC_NONHUMAN_PROBE_POLICY.acceptanceThresholdIssuedByThisStage
  ) {
    fail('non-human calibration probe widened authority.');
  }

  if (
    FR300_R1W_ZC_CURRENT_GATE.disposition !==
      'conditional_pass_to_device_probe' ||
    FR300_R1W_ZC_CURRENT_GATE.concreteDeviceModelBound ||
    FR300_R1W_ZC_CURRENT_GATE.runtimeHardwareManifestCollected ||
    FR300_R1W_ZC_CURRENT_GATE.nonhumanCalibrationProbeExecuted ||
    FR300_R1W_ZC_CURRENT_GATE.humanFaceCapturePerformed ||
    FR300_R1W_ZC_CURRENT_GATE.biometricArtifactCollected ||
    FR300_R1W_ZC_CURRENT_GATE.newHardwarePurchaseAuthorized ||
    FR300_R1W_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1W_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1W_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1W_ZC_CURRENT_GATE.authority
      .existingHardwareMetricReferenceAuthorized ||
    FR300_R1W_ZC_CURRENT_GATE.authority.realFR299SourceAuthorized ||
    FR300_R1W_ZC_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1W_ZC_CURRENT_GATE.authority.fr300R2Authorized ||
    FR300_R1W_ZC_CURRENT_GATE.authority.productColumnMaterialized ||
    FR300_R1W_ZC_CURRENT_GATE.authority.productionActivated ||
    FR300_R1W_ZC_CURRENT_GATE.authority.commerceActivated
  ) {
    fail('R1W-ZC widened runtime, purchase, benchmark, or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    FR300_R1W_ZC_CURRENT_GATE.productMaterialization !== '18/29'
  ) {
    fail('R1W-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1WZCExistingHardwareMetricContract();
