import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  assertFR299Independent3DNoseReferenceBundleContract,
} from './independent-3d-nose-reference-bundle-fr299.js';
import {
  FR300_R1W_ZC_CURRENT_GATE,
  FR300_R1W_ZC_EXISTING_HARDWARE_METRIC_CONTRACT_VERSION,
  assessFR300R1WZCExistingHardwareManifest,
  assertFR300R1WZCExistingHardwareMetricContract,
  type FR300R1WZCExistingHardwareAssessment,
  type FR300R1WZCExistingHardwareManifest,
} from './existing-hardware-metric-reference-feasibility-fr300-r1w-zc.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1X_ZC_RUNTIME_HARDWARE_CALIBRATION_CONTRACT_VERSION =
  'FR300-R1X-ZC-RUNTIME-HARDWARE-CALIBRATION-v1' as const;

export interface FR300R1XZCRuntimeCamera2Capability {
  readonly cameraId: string;
  readonly lensFacing: 'user' | 'back' | 'external' | 'unknown';
  readonly depthOutputCapability: boolean;
  readonly depth16OutputAvailable: boolean;
  readonly calibrationMetadataAvailable: boolean;
  readonly lensPoseAvailable: boolean;
  readonly lensDistortionAvailable: boolean;
  readonly depthIsExclusive: boolean | null;
  readonly colorOutputAvailable: boolean;
  readonly simultaneousColorDepthCaptureVerified: boolean;
}

export interface FR300R1XZCRuntimeHardwareReceipt {
  readonly schemaVersion: 'fr300-r1x-zc-runtime-hardware-receipt-v1';
  readonly receiptRef: string;
  readonly capturedAtUtc: string;
  readonly platform: 'android';
  readonly deviceManufacturer: string;
  readonly deviceModel: string;
  readonly androidSdkInt: number;
  readonly producedByRuntimeProbe: true;
  readonly alreadyOwnedHardware: true;
  readonly noPurchaseRequired: true;
  readonly humanFaceCaptured: false;
  readonly biometricArtifactCaptured: false;
  readonly paidHardwareConsumed: false;
  readonly camera2Cameras: readonly FR300R1XZCRuntimeCamera2Capability[];
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

export interface FR300R1XZCProbePreparation {
  readonly schemaVersion: 'fr300-r1x-zc-probe-preparation-v1';
  readonly knownDimensionNonHumanTargetAvailable: boolean;
  readonly independentTargetMeasurementAvailable: boolean;
  readonly metricAccuracyValidationPlanned: boolean;
  readonly repeatabilityValidationPlanned: boolean;
  readonly independentOfCandidateProvider: boolean;
  readonly providerOutputHiddenDuringReferenceConstruction: boolean;
  readonly providerIndicesHiddenDuringReferenceConstruction: boolean;
  readonly traditionalLabelsHiddenDuringReferenceConstruction: boolean;
  readonly humanFaceCapturePlanned: false;
}

export interface FR300R1XZCRuntimeAssessmentSet {
  readonly schemaVersion: 'fr300-r1x-zc-runtime-assessment-set-v1';
  readonly receiptRef: string;
  readonly deviceRef: string;
  readonly assessments: readonly FR300R1WZCExistingHardwareAssessment[];
  readonly eligibleLaneCount: number;
  readonly authorityBoundary: {
    readonly runtimeReceiptProvesOnlyReportedCapabilities: true;
    readonly humanFaceCaptureAuthorized: false;
    readonly biometricArtifactCollectionAuthorized: false;
    readonly fr299SourceIssued: false;
    readonly fr299BundleMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR300R1XZCCalibrationScaleAnchor {
  readonly segmentRef: string;
  readonly knownCm: number;
  readonly usedToSetReconstructionScale: true;
}

export interface FR300R1XZCCalibrationValidationSegment {
  readonly segmentRef: string;
  readonly knownCm: number;
  readonly measuredCmByRepeat: readonly number[];
}

export interface FR300R1XZCCalibrationProbeInput {
  readonly schemaVersion: 'fr300-r1x-zc-calibration-probe-input-v1';
  readonly probeRef: string;
  readonly sourceAssessment: FR300R1WZCExistingHardwareAssessment;
  readonly targetRef: string;
  readonly targetClass: 'nonhuman_known_dimension_calibration_target';
  readonly humanSubjectPresent: false;
  readonly biometricArtifactPresent: false;
  readonly candidateProviderOutputVisible: false;
  readonly candidateProviderIndicesVisible: false;
  readonly traditionalLabelsVisible: false;
  readonly scaleAnchor: FR300R1XZCCalibrationScaleAnchor | null;
  readonly validationSegments:
    readonly FR300R1XZCCalibrationValidationSegment[];
}

export interface FR300R1XZCCalibrationSegmentResult {
  readonly segmentRef: string;
  readonly knownCm: number;
  readonly repeatCount: number;
  readonly meanMeasuredCm: number;
  readonly signedBiasCm: number;
  readonly meanAbsoluteErrorCm: number;
  readonly meanAbsoluteRelativeError: number;
  readonly repeatabilityRangeCm: number;
}

export interface FR300R1XZCCalibrationProbeResult {
  readonly schemaVersion: 'fr300-r1x-zc-calibration-probe-result-v1';
  readonly probeRef: string;
  readonly sourceRef: string;
  readonly lane: FR300R1WZCExistingHardwareAssessment['lane'];
  readonly targetRef: string;
  readonly status: 'descriptive_probe_complete_threshold_not_issued';
  readonly segmentCount: number;
  readonly measurementCount: number;
  readonly segmentResults: readonly FR300R1XZCCalibrationSegmentResult[];
  readonly aggregate: {
    readonly meanAbsoluteErrorCm: number;
    readonly maxAbsoluteErrorCm: number;
    readonly meanAbsoluteRelativeError: number;
    readonly maxRepeatabilityRangeCm: number;
  };
  readonly authorityBoundary: {
    readonly acceptanceThresholdIssued: false;
    readonly metricAccuracyValidated: false;
    readonly repeatabilityValidated: false;
    readonly humanFaceCaptureAuthorized: false;
    readonly biometricArtifactCollectionAuthorized: false;
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

export const FR300_R1X_ZC_PROBE_POLICY = Object.freeze({
  minimumValidationSegmentCount: 2 as const,
  minimumRepeatsPerValidationSegment: 3 as const,
  scaleAnchorMayAlsoBeValidationSegment: false as const,
  descriptiveMetricsOnly: true as const,
  acceptanceThresholdIssued: false as const,
  syntheticReceiptMayEstablishRealDeviceOwnership: false as const,
  humanFaceAllowed: false as const,
  biometricArtifactAllowed: false as const,
});

export const FR300_R1X_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1x-zc-runtime-hardware-calibration-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'implementation_ready_device_execution_required' as const,
  runtimeProbeImplementationReady: true as const,
  realRuntimeHardwareReceiptCollected: false as const,
  realDeviceCapabilityBound: false as const,
  realNonhumanCalibrationProbeExecuted: false as const,
  syntheticTestEvidenceIsRealDeviceEvidence: false as const,
  humanFaceCapturePerformed: false as const,
  biometricArtifactCollected: false as const,
  newHardwarePurchaseAuthorized: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  externalExecutionBlocker:
    'real_android_device_or_equivalent_existing_hardware_runtime_receipt_required' as const,
  nextActionWithoutNewExternalAuthorization:
    'execute_runtime_capability_probe_on_existing_hardware_then_run_nonhuman_known_dimension_calibration_if_a_lane_is_eligible' as const,
  authority: Object.freeze({
    runtimeReceiptIssuedByStaticCode: false as const,
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
  throw new FaceAuthorityValidationError(`FR-300-R1X-ZC ${message}`);
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) fail(`${label} must be non-empty.`);
  return trimmed;
}

function positiveFinite(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) {
    fail(`${label} must be a positive finite number.`);
  }
  return value;
}

function assertReceipt(
  receipt: FR300R1XZCRuntimeHardwareReceipt,
): void {
  if (
    receipt.schemaVersion !==
      'fr300-r1x-zc-runtime-hardware-receipt-v1'
  ) {
    fail('runtime receipt schemaVersion drift.');
  }
  nonEmpty(receipt.receiptRef, 'receiptRef');
  nonEmpty(receipt.capturedAtUtc, 'capturedAtUtc');
  nonEmpty(receipt.deviceManufacturer, 'deviceManufacturer');
  nonEmpty(receipt.deviceModel, 'deviceModel');
  if (
    receipt.platform !== 'android' ||
    !Number.isInteger(receipt.androidSdkInt) ||
    receipt.androidSdkInt <= 0 ||
    receipt.producedByRuntimeProbe !== true ||
    receipt.alreadyOwnedHardware !== true ||
    receipt.noPurchaseRequired !== true ||
    receipt.humanFaceCaptured !== false ||
    receipt.biometricArtifactCaptured !== false ||
    receipt.paidHardwareConsumed !== false
  ) {
    fail('runtime receipt widened platform, purchase, or biometric boundary.');
  }
  const cameraIds = new Set<string>();
  for (const camera of receipt.camera2Cameras) {
    const cameraId = nonEmpty(camera.cameraId, 'cameraId');
    if (cameraIds.has(cameraId)) {
      fail('camera2 cameraId values must be unique.');
    }
    cameraIds.add(cameraId);
  }
}

function assertPreparation(
  preparation: FR300R1XZCProbePreparation,
): void {
  if (
    preparation.schemaVersion !==
      'fr300-r1x-zc-probe-preparation-v1' ||
    preparation.humanFaceCapturePlanned !== false
  ) {
    fail('probe preparation boundary drift.');
  }
}

function commonManifestFields(
  receipt: FR300R1XZCRuntimeHardwareReceipt,
  preparation: FR300R1XZCProbePreparation,
): Pick<
  FR300R1WZCExistingHardwareManifest,
  | 'alreadyOwnedHardware'
  | 'noPurchaseRequired'
  | 'independentOfCandidateProvider'
  | 'humanFaceCapturePlanned'
  | 'knownDimensionNonHumanTargetAvailable'
  | 'independentTargetMeasurementAvailable'
  | 'metricAccuracyValidationPlanned'
  | 'repeatabilityValidationPlanned'
  | 'providerOutputHiddenDuringReferenceConstruction'
  | 'providerIndicesHiddenDuringReferenceConstruction'
  | 'traditionalLabelsHiddenDuringReferenceConstruction'
> {
  return {
    alreadyOwnedHardware: receipt.alreadyOwnedHardware,
    noPurchaseRequired: receipt.noPurchaseRequired,
    independentOfCandidateProvider:
      preparation.independentOfCandidateProvider,
    humanFaceCapturePlanned: false,
    knownDimensionNonHumanTargetAvailable:
      preparation.knownDimensionNonHumanTargetAvailable,
    independentTargetMeasurementAvailable:
      preparation.independentTargetMeasurementAvailable,
    metricAccuracyValidationPlanned:
      preparation.metricAccuracyValidationPlanned,
    repeatabilityValidationPlanned:
      preparation.repeatabilityValidationPlanned,
    providerOutputHiddenDuringReferenceConstruction:
      preparation.providerOutputHiddenDuringReferenceConstruction,
    providerIndicesHiddenDuringReferenceConstruction:
      preparation.providerIndicesHiddenDuringReferenceConstruction,
    traditionalLabelsHiddenDuringReferenceConstruction:
      preparation.traditionalLabelsHiddenDuringReferenceConstruction,
  };
}

const emptyCamera2 = Object.freeze({
  depthOutputCapability: false,
  depth16OutputAvailable: false,
  calibrationMetadataAvailable: false,
  lensPoseAvailable: false,
  lensDistortionAvailable: false,
  depthIsExclusive: null,
  colorOutputAvailable: false,
  simultaneousColorDepthCaptureVerified: false,
  lensFacing: 'unknown' as const,
});

const emptyArcore = Object.freeze({
  depthApiSupported: false,
  rawDepthAvailable: false,
  rawDepthConfidenceAvailable: false,
  rawDepthMillimeterUnits: false,
  currentFrameBindingAvailable: false,
  cameraIntrinsicsAvailable: false,
  worldFacingCamera: false,
});

const emptyExternalCalibration = Object.freeze({
  multiViewCaptureAvailable: false,
  cameraIntrinsicsKnownOrCalibratable: false,
  similarityScaleAnchorAvailable: false,
  scaleAnchorIndependentOfReconstruction: false,
  reconstructionProviderIndependentOfCandidate: false,
});

export function assessFR300R1XZCRuntimeHardwareReceipt(
  receipt: FR300R1XZCRuntimeHardwareReceipt,
  preparation: FR300R1XZCProbePreparation,
): FR300R1XZCRuntimeAssessmentSet {
  assertFR300R1XZCRuntimeHardwareCalibrationContract();
  assertReceipt(receipt);
  assertPreparation(preparation);

  const common = commonManifestFields(receipt, preparation);
  const assessments: FR300R1WZCExistingHardwareAssessment[] = [];

  for (const camera of receipt.camera2Cameras) {
    assessments.push(
      assessFR300R1WZCExistingHardwareManifest({
        schemaVersion:
          'fr300-r1w-zc-existing-hardware-manifest-v1',
        sourceRef: `${receipt.receiptRef.trim()}:camera2:${camera.cameraId.trim()}`,
        lane: 'android_camera2_calibrated_hardware_depth',
        ...common,
        camera2: camera,
        arcore: emptyArcore,
        externalCalibration: emptyExternalCalibration,
      }),
    );
  }

  assessments.push(
    assessFR300R1WZCExistingHardwareManifest({
      schemaVersion:
        'fr300-r1w-zc-existing-hardware-manifest-v1',
      sourceRef: `${receipt.receiptRef.trim()}:arcore`,
      lane: 'arcore_raw_depth',
      ...common,
      camera2: emptyCamera2,
      arcore: receipt.arcore,
      externalCalibration: emptyExternalCalibration,
    }),
  );

  assessments.push(
    assessFR300R1WZCExistingHardwareManifest({
      schemaVersion:
        'fr300-r1w-zc-existing-hardware-manifest-v1',
      sourceRef: `${receipt.receiptRef.trim()}:external-multiview`,
      lane: 'external_calibrated_multiview_rgb',
      ...common,
      camera2: emptyCamera2,
      arcore: emptyArcore,
      externalCalibration: receipt.externalCalibration,
    }),
  );

  assessments.push(
    assessFR300R1WZCExistingHardwareManifest({
      schemaVersion:
        'fr300-r1w-zc-existing-hardware-manifest-v1',
      sourceRef: `${receipt.receiptRef.trim()}:monocular-rgb-negative-control`,
      lane: 'ordinary_monocular_rgb_only',
      ...common,
      camera2: emptyCamera2,
      arcore: emptyArcore,
      externalCalibration: emptyExternalCalibration,
    }),
  );

  const frozenAssessments = Object.freeze(assessments);
  return Object.freeze({
    schemaVersion:
      'fr300-r1x-zc-runtime-assessment-set-v1' as const,
    receiptRef: receipt.receiptRef.trim(),
    deviceRef:
      `android:${receipt.deviceManufacturer.trim()}:${receipt.deviceModel.trim()}`,
    assessments: frozenAssessments,
    eligibleLaneCount: frozenAssessments.filter(
      (assessment) =>
        assessment.status ===
        'eligible_for_nonhuman_calibration_probe',
    ).length,
    authorityBoundary: Object.freeze({
      runtimeReceiptProvesOnlyReportedCapabilities: true as const,
      humanFaceCaptureAuthorized: false as const,
      biometricArtifactCollectionAuthorized: false as const,
      fr299SourceIssued: false as const,
      fr299BundleMaterialized: false as const,
      fr300R2Authorized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) /
    values.length;
}

function calibrationSegmentResult(
  segment: FR300R1XZCCalibrationValidationSegment,
): FR300R1XZCCalibrationSegmentResult {
  const knownCm = positiveFinite(
    segment.knownCm,
    `${segment.segmentRef}.knownCm`,
  );
  if (
    segment.measuredCmByRepeat.length <
    FR300_R1X_ZC_PROBE_POLICY.minimumRepeatsPerValidationSegment
  ) {
    fail(
      `${segment.segmentRef} requires at least ${FR300_R1X_ZC_PROBE_POLICY.minimumRepeatsPerValidationSegment} repeats.`,
    );
  }

  const measurements = segment.measuredCmByRepeat.map(
    (value, index) =>
      positiveFinite(
        value,
        `${segment.segmentRef}.measuredCmByRepeat[${index}]`,
      ),
  );
  const meanMeasuredCm = mean(measurements);
  const absoluteErrors = measurements.map(
    (value) => Math.abs(value - knownCm),
  );
  const relativeErrors = absoluteErrors.map(
    (value) => value / knownCm,
  );

  return Object.freeze({
    segmentRef: segment.segmentRef.trim(),
    knownCm,
    repeatCount: measurements.length,
    meanMeasuredCm,
    signedBiasCm: meanMeasuredCm - knownCm,
    meanAbsoluteErrorCm: mean(absoluteErrors),
    meanAbsoluteRelativeError: mean(relativeErrors),
    repeatabilityRangeCm:
      Math.max(...measurements) - Math.min(...measurements),
  });
}

export function materializeFR300R1XZCNonhumanCalibrationProbe(
  input: FR300R1XZCCalibrationProbeInput,
): FR300R1XZCCalibrationProbeResult {
  assertFR300R1XZCRuntimeHardwareCalibrationContract();

  if (
    input.schemaVersion !==
      'fr300-r1x-zc-calibration-probe-input-v1' ||
    input.targetClass !==
      'nonhuman_known_dimension_calibration_target' ||
    input.humanSubjectPresent !== false ||
    input.biometricArtifactPresent !== false ||
    input.candidateProviderOutputVisible !== false ||
    input.candidateProviderIndicesVisible !== false ||
    input.traditionalLabelsVisible !== false
  ) {
    fail('calibration probe privacy/blinding boundary drift.');
  }

  const probeRef = nonEmpty(input.probeRef, 'probeRef');
  const targetRef = nonEmpty(input.targetRef, 'targetRef');
  if (
    input.sourceAssessment.schemaVersion !==
      'fr300-r1w-zc-existing-hardware-assessment-v1' ||
    input.sourceAssessment.status !==
      'eligible_for_nonhuman_calibration_probe' ||
    input.sourceAssessment.authorityBoundary
      .humanFaceCaptureAuthorized ||
    input.sourceAssessment.authorityBoundary
      .biometricArtifactCollectionAuthorized ||
    input.sourceAssessment.authorityBoundary.fr299SourceIssued
  ) {
    fail('source assessment is not eligible for the non-human probe.');
  }

  if (
    input.validationSegments.length <
    FR300_R1X_ZC_PROBE_POLICY.minimumValidationSegmentCount
  ) {
    fail(
      `at least ${FR300_R1X_ZC_PROBE_POLICY.minimumValidationSegmentCount} independent validation segments are required.`,
    );
  }

  const segmentRefs = new Set<string>();
  const validationResults: FR300R1XZCCalibrationSegmentResult[] = [];
  for (const segment of input.validationSegments) {
    const segmentRef = nonEmpty(segment.segmentRef, 'segmentRef');
    if (segmentRefs.has(segmentRef)) {
      fail('validation segment refs must be unique.');
    }
    segmentRefs.add(segmentRef);
    validationResults.push(
      calibrationSegmentResult({
        ...segment,
        segmentRef,
      }),
    );
  }

  if (
    input.sourceAssessment.lane ===
      'external_calibrated_multiview_rgb'
  ) {
    if (input.scaleAnchor === null) {
      fail('external multiview probe requires a scale anchor.');
    }
    const anchorRef = nonEmpty(
      input.scaleAnchor.segmentRef,
      'scaleAnchor.segmentRef',
    );
    positiveFinite(
      input.scaleAnchor.knownCm,
      'scaleAnchor.knownCm',
    );
    if (
      input.scaleAnchor.usedToSetReconstructionScale !== true ||
      segmentRefs.has(anchorRef)
    ) {
      fail(
        'external scale anchor must be separate from every validation segment.',
      );
    }
  } else if (input.scaleAnchor !== null) {
    const anchorRef = nonEmpty(
      input.scaleAnchor.segmentRef,
      'scaleAnchor.segmentRef',
    );
    positiveFinite(
      input.scaleAnchor.knownCm,
      'scaleAnchor.knownCm',
    );
    if (segmentRefs.has(anchorRef)) {
      fail('scale anchor may not also be a validation segment.');
    }
  }

  const absoluteErrors: number[] = [];
  const relativeErrors: number[] = [];
  for (const segment of input.validationSegments) {
    for (const measurement of segment.measuredCmByRepeat) {
      const knownCm = segment.knownCm;
      const absoluteError = Math.abs(measurement - knownCm);
      absoluteErrors.push(absoluteError);
      relativeErrors.push(absoluteError / knownCm);
    }
  }

  const frozenResults = Object.freeze(validationResults);
  return Object.freeze({
    schemaVersion:
      'fr300-r1x-zc-calibration-probe-result-v1' as const,
    probeRef,
    sourceRef: input.sourceAssessment.sourceRef,
    lane: input.sourceAssessment.lane,
    targetRef,
    status:
      'descriptive_probe_complete_threshold_not_issued' as const,
    segmentCount: frozenResults.length,
    measurementCount: absoluteErrors.length,
    segmentResults: frozenResults,
    aggregate: Object.freeze({
      meanAbsoluteErrorCm: mean(absoluteErrors),
      maxAbsoluteErrorCm: Math.max(...absoluteErrors),
      meanAbsoluteRelativeError: mean(relativeErrors),
      maxRepeatabilityRangeCm: Math.max(
        ...frozenResults.map(
          (segment) => segment.repeatabilityRangeCm,
        ),
      ),
    }),
    authorityBoundary: Object.freeze({
      acceptanceThresholdIssued: false as const,
      metricAccuracyValidated: false as const,
      repeatabilityValidated: false as const,
      humanFaceCaptureAuthorized: false as const,
      biometricArtifactCollectionAuthorized: false as const,
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

export function assertFR300R1XZCRuntimeHardwareCalibrationContract(): void {
  assertFR300R1WZCExistingHardwareMetricContract();
  assertFR299Independent3DNoseReferenceBundleContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R1W_ZC_EXISTING_HARDWARE_METRIC_CONTRACT_VERSION !==
      'FR300-R1W-ZC-EXISTING-HARDWARE-METRIC-v1' ||
    FR300_R1W_ZC_CURRENT_GATE.disposition !==
      'conditional_pass_to_device_probe' ||
    FR300_R1W_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1W_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0
  ) {
    fail('R1W-ZC predecessor authority drift.');
  }

  if (
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1'
  ) {
    fail('FR299 contract drift.');
  }

  if (
    FR300_R1X_ZC_PROBE_POLICY.minimumValidationSegmentCount < 2 ||
    FR300_R1X_ZC_PROBE_POLICY.minimumRepeatsPerValidationSegment < 3 ||
    FR300_R1X_ZC_PROBE_POLICY.scaleAnchorMayAlsoBeValidationSegment ||
    !FR300_R1X_ZC_PROBE_POLICY.descriptiveMetricsOnly ||
    FR300_R1X_ZC_PROBE_POLICY.acceptanceThresholdIssued ||
    FR300_R1X_ZC_PROBE_POLICY.syntheticReceiptMayEstablishRealDeviceOwnership ||
    FR300_R1X_ZC_PROBE_POLICY.humanFaceAllowed ||
    FR300_R1X_ZC_PROBE_POLICY.biometricArtifactAllowed
  ) {
    fail('calibration probe policy widened authority.');
  }

  if (
    FR300_R1X_ZC_CURRENT_GATE.disposition !==
      'implementation_ready_device_execution_required' ||
    !FR300_R1X_ZC_CURRENT_GATE.runtimeProbeImplementationReady ||
    FR300_R1X_ZC_CURRENT_GATE.realRuntimeHardwareReceiptCollected ||
    FR300_R1X_ZC_CURRENT_GATE.realDeviceCapabilityBound ||
    FR300_R1X_ZC_CURRENT_GATE.realNonhumanCalibrationProbeExecuted ||
    FR300_R1X_ZC_CURRENT_GATE.syntheticTestEvidenceIsRealDeviceEvidence ||
    FR300_R1X_ZC_CURRENT_GATE.humanFaceCapturePerformed ||
    FR300_R1X_ZC_CURRENT_GATE.biometricArtifactCollected ||
    FR300_R1X_ZC_CURRENT_GATE.newHardwarePurchaseAuthorized ||
    FR300_R1X_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1X_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1X_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1X_ZC_CURRENT_GATE.authority.runtimeReceiptIssuedByStaticCode ||
    FR300_R1X_ZC_CURRENT_GATE.authority
      .existingHardwareMetricReferenceAuthorized ||
    FR300_R1X_ZC_CURRENT_GATE.authority.realFR299SourceAuthorized ||
    FR300_R1X_ZC_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1X_ZC_CURRENT_GATE.authority.fr300R2Authorized ||
    FR300_R1X_ZC_CURRENT_GATE.authority.productColumnMaterialized ||
    FR300_R1X_ZC_CURRENT_GATE.authority.productionActivated ||
    FR300_R1X_ZC_CURRENT_GATE.authority.commerceActivated
  ) {
    fail('R1X-ZC widened device, biometric, benchmark, or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    FR300_R1X_ZC_CURRENT_GATE.productMaterialization !== '18/29'
  ) {
    fail('R1X-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1XZCRuntimeHardwareCalibrationContract();
