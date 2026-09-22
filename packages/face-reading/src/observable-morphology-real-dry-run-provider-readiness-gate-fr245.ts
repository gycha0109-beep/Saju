import {
  getSquareBroadFangCaptureQualityCandidateFeatureContractFR148,
} from './five-officers-square-broad-fang-capture-quality-candidate-features-fr148.js';
import {
  getEyePairCaptureConditionOperationalBoundaryFR162,
} from './eye-pair-capture-condition-operational-boundary-fr162.js';
import {
  FR209_CONTRACT_VERSION,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import {
  FR237_PRIMARY_METRIC,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import {
  FR244_CONTRACT_VERSION,
  getGovernedBrowserLiveCameraJpegBridgeContractFR244,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR245_CONTRACT_VERSION =
  'FR245-REAL-DRY-RUN-PROVIDER-READINESS-GATE-v1' as const;

export const FR245_NEXT_FRONTIER =
  'issue_governed_quality_operationalizations_and_privacy_compatible_same_frame_provider_binding_before_real_fr243_execution' as const;

export type FR245ReadinessState =
  | 'mechanically_observable_not_quality_validated'
  | 'unresolved_operationalization';

export interface FR245QualityCheckReadiness {
  readonly check:
    | 'single_face'
    | 'frontal_pose'
    | 'sharpness'
    | 'bilateral_eye_region_visibility'
    | 'bilateral_eye_landmark_coverage'
    | 'major_eye_region_occlusion_absent';
  readonly state: FR245ReadinessState;
  readonly mayBePassedBySyntheticFixtureInRealDryRun: false;
  readonly governedAcceptanceRuleIssued: boolean;
}

export interface FR245RealDryRunProviderReadiness {
  readonly schemaVersion: 'fr245-real-dry-run-provider-readiness-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR245_CONTRACT_VERSION;
  readonly authorityState:
    'real_dry_run_provider_dependencies_audited_execution_remains_blocked';
  readonly source: {
    readonly fr237PrimaryMetric: typeof FR237_PRIMARY_METRIC;
    readonly fr209ContractVersion: typeof FR209_CONTRACT_VERSION;
    readonly fr244ContractVersion: typeof FR244_CONTRACT_VERSION;
  };
  readonly transport: {
    readonly browserLiveCameraToEphemeralJpegReady: true;
    readonly explicitOperatorTriggerRequired: true;
    readonly sourceJpegZeroizedAfterFR243: true;
    readonly cameraOwnershipRetainedByCaller: true;
  };
  readonly quality: {
    readonly requiredCheckCount: 6;
    readonly checks: readonly FR245QualityCheckReadiness[];
    readonly allGovernedAcceptanceRulesIssued: false;
    readonly syntheticPassAllCallbackAllowedForRealExecution: false;
    readonly automaticQualityGateCurrentlyAuthorized: false;
    readonly numericCaptureQualityThresholdIssued: false;
  };
  readonly primaryMetric: {
    readonly metricRef: typeof FR237_PRIMARY_METRIC;
    readonly formulaSurfaceAvailableThroughFR208FR209: true;
    readonly existingFR77ProviderGeometryRequiresCanonicalAssetDigest: true;
    readonly fr242CurrentResultContractRequiresRawImageDigestComputedFalse: true;
    readonly directFR77ReuseInsideCurrentFR242BoundaryAuthorized: false;
    readonly privacyCompatibleSameFrameProviderBindingIssued: false;
    readonly executableSameFrameProviderMetricBindingReady: false;
  };
  readonly blockers: readonly [
    'frontal_pose_operationalization_not_issued',
    'sharpness_operationalization_not_issued',
    'bilateral_eye_region_visibility_operationalization_not_issued',
    'major_eye_region_occlusion_operationalization_not_issued',
    'capture_quality_construct_not_validated',
    'fr77_fr242_raw_image_digest_contract_mismatch_unresolved',
    'privacy_compatible_same_frame_provider_metric_binding_not_issued',
  ];
  readonly executionGate: {
    readonly actualParticipantActionStillRequired: true;
    readonly actualLiveCameraInputStillRequired: true;
    readonly realFR243ExecutionReady: false;
    readonly failClosed: true;
  };
  readonly authorityBoundary: {
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR245_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-245 ' + message);
}

function qualityCheck(
  check: FR245QualityCheckReadiness['check'],
  state: FR245ReadinessState,
): FR245QualityCheckReadiness {
  return Object.freeze({
    check,
    state,
    mayBePassedBySyntheticFixtureInRealDryRun: false as const,
    governedAcceptanceRuleIssued: false,
  });
}

export function assessRealDryRunProviderReadinessFR245():
FR245RealDryRunProviderReadiness {
  const fr148 = getSquareBroadFangCaptureQualityCandidateFeatureContractFR148();
  const fr162 = getEyePairCaptureConditionOperationalBoundaryFR162();
  const fr244 = getGovernedBrowserLiveCameraJpegBridgeContractFR244();

  if (
    FR237_PRIMARY_METRIC !== 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0'
    || FR209_CONTRACT_VERSION !== 'FR209-GOVERNED-GEOMETRY-TO-FR208-ADAPTER-v1'
    || fr244.contractVersion !== FR244_CONTRACT_VERSION
    || fr244.execution.framesConsumedPerInvocation !== 1
    || fr244.execution.automaticCaptureTriggeringAllowed !== false
    || fr244.execution.sourceJpegZeroizedAfterFR243 !== true
    || fr244.execution.callerRetainsCameraOwnership !== true
  ) {
    fail('primary metric or FR244 transport predecessor drift.');
  }

  if (
    fr148.authorityBoundary.candidateFeatureValueMeansSharpness !== false
    || fr148.authorityBoundary.candidateFeatureValueMeansOcclusionValidity !== false
    || fr148.authorityBoundary.captureQualityThresholdsDefined !== false
    || fr148.authorityBoundary.captureQualityValidated !== false
  ) {
    fail('FR148 capture-quality candidate authority unexpectedly widened.');
  }

  if (
    fr162.operationalCaptureGuidance.frontalNeutralPoseRequested !== true
    || fr162.operationalCaptureGuidance.guidanceIsNumericAcceptanceThreshold !== false
    || fr162.operationalCaptureGuidance.guidanceMeansCaptureQualityValidated !== false
    || fr162.operationalCaptureGuidance.guidanceMayRejectAUserCaptureAutomatically !== false
    || fr162.productBoundary.automaticCaptureQualityGateAuthorized !== false
    || fr162.productBoundary.numericCaptureQualityThreshold !== null
    || fr162.authorityBoundary.captureQualityValidated !== false
  ) {
    fail('FR162 capture-condition authority unexpectedly widened.');
  }

  const checks = Object.freeze([
    qualityCheck('single_face', 'mechanically_observable_not_quality_validated'),
    qualityCheck('frontal_pose', 'unresolved_operationalization'),
    qualityCheck('sharpness', 'unresolved_operationalization'),
    qualityCheck('bilateral_eye_region_visibility', 'unresolved_operationalization'),
    qualityCheck(
      'bilateral_eye_landmark_coverage',
      'mechanically_observable_not_quality_validated',
    ),
    qualityCheck('major_eye_region_occlusion_absent', 'unresolved_operationalization'),
  ] as const);

  return Object.freeze({
    schemaVersion: 'fr245-real-dry-run-provider-readiness-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR245_CONTRACT_VERSION,
    authorityState:
      'real_dry_run_provider_dependencies_audited_execution_remains_blocked' as const,
    source: Object.freeze({
      fr237PrimaryMetric: FR237_PRIMARY_METRIC,
      fr209ContractVersion: FR209_CONTRACT_VERSION,
      fr244ContractVersion: FR244_CONTRACT_VERSION,
    }),
    transport: Object.freeze({
      browserLiveCameraToEphemeralJpegReady: true as const,
      explicitOperatorTriggerRequired: true as const,
      sourceJpegZeroizedAfterFR243: true as const,
      cameraOwnershipRetainedByCaller: true as const,
    }),
    quality: Object.freeze({
      requiredCheckCount: 6 as const,
      checks,
      allGovernedAcceptanceRulesIssued: false as const,
      syntheticPassAllCallbackAllowedForRealExecution: false as const,
      automaticQualityGateCurrentlyAuthorized: false as const,
      numericCaptureQualityThresholdIssued: false as const,
    }),
    primaryMetric: Object.freeze({
      metricRef: FR237_PRIMARY_METRIC,
      formulaSurfaceAvailableThroughFR208FR209: true as const,
      existingFR77ProviderGeometryRequiresCanonicalAssetDigest: true as const,
      fr242CurrentResultContractRequiresRawImageDigestComputedFalse: true as const,
      directFR77ReuseInsideCurrentFR242BoundaryAuthorized: false as const,
      privacyCompatibleSameFrameProviderBindingIssued: false as const,
      executableSameFrameProviderMetricBindingReady: false as const,
    }),
    blockers: Object.freeze([
      'frontal_pose_operationalization_not_issued',
      'sharpness_operationalization_not_issued',
      'bilateral_eye_region_visibility_operationalization_not_issued',
      'major_eye_region_occlusion_operationalization_not_issued',
      'capture_quality_construct_not_validated',
      'fr77_fr242_raw_image_digest_contract_mismatch_unresolved',
      'privacy_compatible_same_frame_provider_metric_binding_not_issued',
    ] as const),
    executionGate: Object.freeze({
      actualParticipantActionStillRequired: true as const,
      actualLiveCameraInputStillRequired: true as const,
      realFR243ExecutionReady: false as const,
      failClosed: true as const,
    }),
    authorityBoundary: Object.freeze({
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR245_NEXT_FRONTIER,
  });
}

export function assertRealDryRunProviderReadinessBlockedFR245(
  readiness: FR245RealDryRunProviderReadiness,
): void {
  if (
    readiness.contractVersion !== FR245_CONTRACT_VERSION
    || readiness.authorityState
      !== 'real_dry_run_provider_dependencies_audited_execution_remains_blocked'
    || readiness.transport.browserLiveCameraToEphemeralJpegReady !== true
    || readiness.quality.requiredCheckCount !== 6
    || readiness.quality.checks.length !== 6
    || readiness.quality.allGovernedAcceptanceRulesIssued !== false
    || readiness.quality.syntheticPassAllCallbackAllowedForRealExecution !== false
    || readiness.primaryMetric.metricRef !== FR237_PRIMARY_METRIC
    || readiness.primaryMetric.executableSameFrameProviderMetricBindingReady !== false
    || readiness.blockers.length !== 7
    || readiness.executionGate.realFR243ExecutionReady !== false
    || readiness.executionGate.failClosed !== true
    || Object.values(readiness.authorityBoundary).some((value) => value !== false)
    || readiness.nextFrontier !== FR245_NEXT_FRONTIER
  ) {
    fail('real dry-run readiness gate widened or drifted.');
  }
}
