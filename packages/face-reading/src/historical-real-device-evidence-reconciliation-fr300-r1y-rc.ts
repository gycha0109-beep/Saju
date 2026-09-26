import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  assertFR299Independent3DNoseReferenceBundleContract,
} from './independent-3d-nose-reference-bundle-fr299.js';
import {
  FR300_R1X_ZC_CURRENT_GATE,
  FR300_R1X_ZC_RUNTIME_HARDWARE_CALIBRATION_CONTRACT_VERSION,
  assertFR300R1XZCRuntimeHardwareCalibrationContract,
} from './runtime-hardware-calibration-probe-fr300-r1x-zc.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_RECONCILIATION_CONTRACT_VERSION =
  'FR300-R1Y-RC-HISTORICAL-REAL-DEVICE-RECONCILIATION-v1' as const;

export const FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE = Object.freeze({
  device: Object.freeze({
    model: 'SM-S938N' as const,
    realDeviceObserved: true as const,
  }),
  fr273: Object.freeze({
    issueNumber: 1401 as const,
    prNumber: 1402 as const,
    mergeSha:
      '8aa5fab5c9f02a4a0acb737e084cb1af29f418e3' as const,
    toolPath: 'tools/fr273-android-depth-probe/' as const,
    realCapabilityProbeExecuted: true as const,
    userFacingCameraCountReferencedByGovernedRecord: 2 as const,
    userFacingDepthOutputAvailable: false as const,
    userFacingDepth16Available: false as const,
    userFacingMetricDepthPathAvailable: false as const,
    faceImageCaptured: false as const,
  }),
  fr275: Object.freeze({
    issueNumber: 1404 as const,
    prNumber: 1405 as const,
    mergeSha:
      '91deb9703ddfd0279d15bf9a8b00259f0394bed1' as const,
    toolPath: 'tools/fr275-arcore-raw-depth-probe/' as const,
    realDeviceProbeExecuted: true as const,
    arcoreRawDepthOperational: true as const,
    worldFacing: true as const,
    rawDepthConfidenceSampledEphemerally: true as const,
    persistedRgbDepthConfidenceFrames: false as const,
    fr299AuthorityEstablished: false as const,
  }),
  fr276: Object.freeze({
    issueNumber: 1409 as const,
    prNumber: 1410 as const,
    mergeSha:
      '2388c4961266503f0306d671d4721ca11db57a17' as const,
    toolPath: 'tools/fr276-arcore-depth-cadence/' as const,
    measuredMotionRunExecuted: true as const,
    elapsedSeconds: 20.026 as const,
    newRawDepthFrameCount: 92 as const,
    newDepthRateHz: 4.594 as const,
    medianNewDepthIntervalMs: 166.596 as const,
    centralValidDepthCoverageMean: 0.995854 as const,
    acquisitionErrorsObserved: false as const,
  }),
  fr278: Object.freeze({
    issueNumber: 1414 as const,
    prNumber: 1415 as const,
    mergeSha:
      'e7aeb3cfdd8fdc1fcf80b8ff9fb2ae11b474834e' as const,
    toolPath: 'tools/fr278-arcore-planar-validation/' as const,
    realNonhumanCalibrationExperimentExecuted: true as const,
    nominalDistancesMm: Object.freeze([500, 700, 900] as const),
    repeatsPerDistance: 3 as const,
    secondsPerTrial: 5 as const,
    rawDepthResolution: '160x90' as const,
    centralRoiFraction: 0.2 as const,
    opaqueTargetRerun: Object.freeze({
      measuredMedian500Mm: 535.5 as const,
      measuredMedian700Mm: 725 as const,
      measuredMedian900Mm: 653.5 as const,
      knownStep500To700Mm: 200 as const,
      recoveredStep500To700Mm: 189.5 as const,
      stepError500To700Mm: -10.5 as const,
      stepErrorPercent500To700: -5.25 as const,
      step700To900UsableForMetricConclusion: false as const,
      invalidReason700To900:
        '900mm_roi_contamination_or_target_membership_failure' as const,
    }),
    metricAccuracyValidatedForFR299: false as const,
    repeatabilityValidatedForFR299: false as const,
    metricAuthorityDisposition:
      'partially_characterized_not_admitted' as const,
  }),
  fr280: Object.freeze({
    issueNumber: 1420 as const,
    supersededOn: '2026-09-24' as const,
    sameFrameSteppedPlaneGateExecuted: false as const,
    gateSupersededForProductPriority: true as const,
    productInput:
      'ordinary_smartphone_rgb_selfie_25_30_cm' as const,
    specialDepthMayBecomeProductPrerequisite: false as const,
    nextResearchPriority:
      'ordinary_rgb_selfie_feature_authority_and_independent_benchmark' as const,
    arcoreGloballyRejected: false as const,
  }),
});

export interface FR300R1YRCHistoricalReceipt {
  readonly schemaVersion:
    'fr300-r1y-rc-historical-real-device-receipt-v1';
  readonly receiptClass:
    'reconstructed_from_governed_historical_records';
  readonly deviceModel: 'SM-S938N';
  readonly realDeviceObserved: true;
  readonly nativeR1XRuntimeReceiptProducedAtTheTime: false;
  readonly historicalReceiptReconstructedFromGovernedRecords: true;
  readonly reconstructionEquivalentToNativeR1XRuntimeArtifact: false;
  readonly camera2UserFacingMetricDepth: {
    readonly capabilityProbeExecuted: true;
    readonly depthOutputAvailable: false;
    readonly depth16Available: false;
    readonly metricDepthPathAvailable: false;
    readonly evidenceRef: 'FR273';
  };
  readonly arcoreRawDepth: {
    readonly operationalProbeExecuted: true;
    readonly operational: true;
    readonly worldFacing: true;
    readonly measuredMotionCadenceCharacterized: true;
    readonly newDepthRateHz: 4.594;
    readonly evidenceRefs: readonly ['FR275', 'FR276'];
    readonly currentRole: 'research_reference_candidate_only';
    readonly fr299Authority: false;
  };
  readonly nonhumanMetricCalibration: {
    readonly executed: true;
    readonly referenceClass:
      'externally_measured_nonhuman_planar_targets';
    readonly opaqueTarget500To700RecoveredStepMm: 189.5;
    readonly opaqueTarget500To700NominalStepMm: 200;
    readonly opaqueTarget500To700StepErrorPercent: -5.25;
    readonly nineHundredMmMetricConclusionUsable: false;
    readonly blocker:
      '900mm_roi_contamination_or_target_membership_failure';
    readonly metricAccuracyValidatedForFR299: false;
    readonly repeatabilityValidatedForFR299: false;
    readonly evidenceRef: 'FR278';
  };
  readonly productBoundary: {
    readonly specialDepthMayBecomeProductRequirement: false;
    readonly productInput:
      'ordinary_smartphone_rgb_selfie_25_30_cm';
    readonly hardwareDepthContinuationSuperseded: true;
    readonly evidenceRef: 'FR280';
  };
}

export const FR300_R1Y_RC_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r1y-rc-historical-reconciliation-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'historical_evidence_reconciled_rgb_selfie_benchmark_next' as const,
  predecessorR1XPreservedAsHistoricalStage: true as const,
  predecessorR1XNextActionSupersededByHistoricalEvidence:
    true as const,
  realDeviceObserved: true as const,
  concreteDeviceModelBound: true as const,
  historicalRealDeviceCapabilityEvidenceExists: true as const,
  historicalReceiptReconstructedFromGovernedRecords: true as const,
  nativeR1XRuntimeReceiptProducedAtTheTime: false as const,
  reconstructionEquivalentToNativeR1XRuntimeArtifact: false as const,
  realNonhumanCalibrationExperimentExecuted: true as const,
  newCapabilityApkRequired: false as const,
  repeatFR273Required: false as const,
  repeatFR275Required: false as const,
  repeatFR276Required: false as const,
  repeatFR278Required: false as const,
  frontUserFacingCamera2MetricDepthLane:
    'unavailable_on_sm_s938n' as const,
  arcoreRawDepthLane:
    'operational_research_reference_candidate_only' as const,
  arcoreMetricAccuracyValidatedForFR299: false as const,
  arcoreRepeatabilityValidatedForFR299: false as const,
  specialDepthMayBecomeProductRequirement: false as const,
  specialDepthMayRemainOfflineResearchReferenceCandidate:
    true as const,
  humanFaceCaptureAuthorizedByThisStage: false as const,
  biometricArtifactCollectionAuthorizedByThisStage:
    false as const,
  newHardwarePurchaseAuthorized: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionWithoutNewExternalAuthorization:
    'return_to_ordinary_rgb_selfie_independent_benchmark_reference_strategy' as const,
  authority: Object.freeze({
    existingHardwareMetricReferenceAuthorizedForFR299:
      false as const,
    realFR299SourceAuthorized: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1Y-RC ${message}`,
  );
}

export function materializeFR300R1YRCHistoricalReceipt(): FR300R1YRCHistoricalReceipt {
  assertFR300R1YRCHistoricalReconciliationContract();

  return Object.freeze({
    schemaVersion:
      'fr300-r1y-rc-historical-real-device-receipt-v1' as const,
    receiptClass:
      'reconstructed_from_governed_historical_records' as const,
    deviceModel: 'SM-S938N' as const,
    realDeviceObserved: true as const,
    nativeR1XRuntimeReceiptProducedAtTheTime: false as const,
    historicalReceiptReconstructedFromGovernedRecords:
      true as const,
    reconstructionEquivalentToNativeR1XRuntimeArtifact:
      false as const,
    camera2UserFacingMetricDepth: Object.freeze({
      capabilityProbeExecuted: true as const,
      depthOutputAvailable: false as const,
      depth16Available: false as const,
      metricDepthPathAvailable: false as const,
      evidenceRef: 'FR273' as const,
    }),
    arcoreRawDepth: Object.freeze({
      operationalProbeExecuted: true as const,
      operational: true as const,
      worldFacing: true as const,
      measuredMotionCadenceCharacterized: true as const,
      newDepthRateHz: 4.594 as const,
      evidenceRefs: Object.freeze([
        'FR275',
        'FR276',
      ] as const),
      currentRole: 'research_reference_candidate_only' as const,
      fr299Authority: false as const,
    }),
    nonhumanMetricCalibration: Object.freeze({
      executed: true as const,
      referenceClass:
        'externally_measured_nonhuman_planar_targets' as const,
      opaqueTarget500To700RecoveredStepMm: 189.5 as const,
      opaqueTarget500To700NominalStepMm: 200 as const,
      opaqueTarget500To700StepErrorPercent: -5.25 as const,
      nineHundredMmMetricConclusionUsable: false as const,
      blocker:
        '900mm_roi_contamination_or_target_membership_failure' as const,
      metricAccuracyValidatedForFR299: false as const,
      repeatabilityValidatedForFR299: false as const,
      evidenceRef: 'FR278' as const,
    }),
    productBoundary: Object.freeze({
      specialDepthMayBecomeProductRequirement: false as const,
      productInput:
        'ordinary_smartphone_rgb_selfie_25_30_cm' as const,
      hardwareDepthContinuationSuperseded: true as const,
      evidenceRef: 'FR280' as const,
    }),
  });
}

export function assertFR300R1YRCHistoricalReconciliationContract(): void {
  assertFR300R1XZCRuntimeHardwareCalibrationContract();
  assertFR299Independent3DNoseReferenceBundleContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R1X_ZC_RUNTIME_HARDWARE_CALIBRATION_CONTRACT_VERSION !==
      'FR300-R1X-ZC-RUNTIME-HARDWARE-CALIBRATION-v1' ||
    FR300_R1X_ZC_CURRENT_GATE.disposition !==
      'implementation_ready_device_execution_required' ||
    !FR300_R1X_ZC_CURRENT_GATE.runtimeProbeImplementationReady ||
    FR300_R1X_ZC_CURRENT_GATE.realRuntimeHardwareReceiptCollected ||
    FR300_R1X_ZC_CURRENT_GATE.realNonhumanCalibrationProbeExecuted
  ) {
    fail('R1X-ZC historical-stage boundary drift.');
  }

  if (
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1'
  ) {
    fail('FR299 contract drift.');
  }

  const evidence =
    FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE;

  if (
    evidence.device.model !== 'SM-S938N' ||
    !evidence.device.realDeviceObserved ||
    !evidence.fr273.realCapabilityProbeExecuted ||
    evidence.fr273.userFacingDepthOutputAvailable ||
    evidence.fr273.userFacingDepth16Available ||
    evidence.fr273.userFacingMetricDepthPathAvailable ||
    evidence.fr273.faceImageCaptured
  ) {
    fail('FR273 historical evidence drift.');
  }

  if (
    !evidence.fr275.realDeviceProbeExecuted ||
    !evidence.fr275.arcoreRawDepthOperational ||
    !evidence.fr275.worldFacing ||
    !evidence.fr275.rawDepthConfidenceSampledEphemerally ||
    evidence.fr275.persistedRgbDepthConfidenceFrames ||
    evidence.fr275.fr299AuthorityEstablished
  ) {
    fail('FR275 historical evidence drift.');
  }

  if (
    !evidence.fr276.measuredMotionRunExecuted ||
    evidence.fr276.elapsedSeconds !== 20.026 ||
    evidence.fr276.newRawDepthFrameCount !== 92 ||
    evidence.fr276.newDepthRateHz !== 4.594 ||
    evidence.fr276.medianNewDepthIntervalMs !== 166.596 ||
    evidence.fr276.centralValidDepthCoverageMean !==
      0.995854 ||
    evidence.fr276.acquisitionErrorsObserved
  ) {
    fail('FR276 historical evidence drift.');
  }

  if (
    !evidence.fr278.realNonhumanCalibrationExperimentExecuted ||
    evidence.fr278.repeatsPerDistance !== 3 ||
    evidence.fr278.secondsPerTrial !== 5 ||
    evidence.fr278.opaqueTargetRerun
      .knownStep500To700Mm !== 200 ||
    evidence.fr278.opaqueTargetRerun
      .recoveredStep500To700Mm !== 189.5 ||
    evidence.fr278.opaqueTargetRerun
      .stepErrorPercent500To700 !== -5.25 ||
    evidence.fr278.opaqueTargetRerun
      .step700To900UsableForMetricConclusion ||
    evidence.fr278.metricAccuracyValidatedForFR299 ||
    evidence.fr278.repeatabilityValidatedForFR299 ||
    evidence.fr278.metricAuthorityDisposition !==
      'partially_characterized_not_admitted'
  ) {
    fail('FR278 historical evidence drift.');
  }

  if (
    !evidence.fr280.gateSupersededForProductPriority ||
    evidence.fr280.sameFrameSteppedPlaneGateExecuted ||
    evidence.fr280.productInput !==
      'ordinary_smartphone_rgb_selfie_25_30_cm' ||
    evidence.fr280.specialDepthMayBecomeProductPrerequisite ||
    evidence.fr280.arcoreGloballyRejected ||
    evidence.fr280.nextResearchPriority !==
      'ordinary_rgb_selfie_feature_authority_and_independent_benchmark'
  ) {
    fail('FR280 supersession evidence drift.');
  }

  const gate = FR300_R1Y_RC_CURRENT_GATE;
  if (
    gate.disposition !==
      'historical_evidence_reconciled_rgb_selfie_benchmark_next' ||
    !gate.predecessorR1XPreservedAsHistoricalStage ||
    !gate.predecessorR1XNextActionSupersededByHistoricalEvidence ||
    !gate.realDeviceObserved ||
    !gate.concreteDeviceModelBound ||
    !gate.historicalRealDeviceCapabilityEvidenceExists ||
    !gate.historicalReceiptReconstructedFromGovernedRecords ||
    gate.nativeR1XRuntimeReceiptProducedAtTheTime ||
    gate.reconstructionEquivalentToNativeR1XRuntimeArtifact ||
    !gate.realNonhumanCalibrationExperimentExecuted ||
    gate.newCapabilityApkRequired ||
    gate.repeatFR273Required ||
    gate.repeatFR275Required ||
    gate.repeatFR276Required ||
    gate.repeatFR278Required ||
    gate.frontUserFacingCamera2MetricDepthLane !==
      'unavailable_on_sm_s938n' ||
    gate.arcoreRawDepthLane !==
      'operational_research_reference_candidate_only' ||
    gate.arcoreMetricAccuracyValidatedForFR299 ||
    gate.arcoreRepeatabilityValidatedForFR299 ||
    gate.specialDepthMayBecomeProductRequirement ||
    !gate.specialDepthMayRemainOfflineResearchReferenceCandidate ||
    gate.humanFaceCaptureAuthorizedByThisStage ||
    gate.biometricArtifactCollectionAuthorizedByThisStage ||
    gate.newHardwarePurchaseAuthorized ||
    gate.paidSpendAuthorized ||
    gate.fr299EligibleCandidateCount !== 0 ||
    gate.fr300R2EligibleCandidateCount !== 0 ||
    gate.authority.existingHardwareMetricReferenceAuthorizedForFR299 ||
    gate.authority.realFR299SourceAuthorized ||
    gate.authority.realFR299BundleAuthorized ||
    gate.authority.fr300R2Authorized ||
    gate.authority.productColumnMaterialized ||
    gate.authority.productionActivated ||
    gate.authority.commerceActivated
  ) {
    fail('R1Y-RC widened historical or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    gate.productMaterialization !== '18/29'
  ) {
    fail('R1Y-RC must preserve 18/29 product materialization.');
  }
}

assertFR300R1YRCHistoricalReconciliationContract();
