import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1Y_RC_CURRENT_GATE,
  FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE,
  assertFR300R1YRCHistoricalReconciliationContract,
  materializeFR300R1YRCHistoricalReceipt,
} from './historical-real-device-evidence-reconciliation-fr300-r1y-rc.js';

describe('FR300-R1Y-RC historical real-device evidence reconciliation', () => {
  it('binds the real SM-S938N Camera2 result without inventing front metric depth', () => {
    expect(
      FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE.device,
    ).toEqual({
      model: 'SM-S938N',
      realDeviceObserved: true,
    });

    expect(
      FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE.fr273,
    ).toMatchObject({
      issueNumber: 1401,
      prNumber: 1402,
      mergeSha:
        '8aa5fab5c9f02a4a0acb737e084cb1af29f418e3',
      realCapabilityProbeExecuted: true,
      userFacingCameraCountReferencedByGovernedRecord: 2,
      userFacingDepthOutputAvailable: false,
      userFacingDepth16Available: false,
      userFacingMetricDepthPathAvailable: false,
      faceImageCaptured: false,
    });
  });

  it('binds ARCore operational and measured-motion cadence evidence without promoting it to FR299 truth', () => {
    expect(
      FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE.fr275,
    ).toMatchObject({
      realDeviceProbeExecuted: true,
      arcoreRawDepthOperational: true,
      worldFacing: true,
      rawDepthConfidenceSampledEphemerally: true,
      persistedRgbDepthConfidenceFrames: false,
      fr299AuthorityEstablished: false,
    });

    expect(
      FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE.fr276,
    ).toMatchObject({
      measuredMotionRunExecuted: true,
      elapsedSeconds: 20.026,
      newRawDepthFrameCount: 92,
      newDepthRateHz: 4.594,
      medianNewDepthIntervalMs: 166.596,
      centralValidDepthCoverageMean: 0.995854,
      acquisitionErrorsObserved: false,
    });
  });

  it('binds the real non-human calibration rerun while preserving unresolved metric authority', () => {
    const fr278 =
      FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE.fr278;

    expect(fr278).toMatchObject({
      realNonhumanCalibrationExperimentExecuted: true,
      nominalDistancesMm: [500, 700, 900],
      repeatsPerDistance: 3,
      secondsPerTrial: 5,
      rawDepthResolution: '160x90',
      centralRoiFraction: 0.2,
      metricAccuracyValidatedForFR299: false,
      repeatabilityValidatedForFR299: false,
      metricAuthorityDisposition:
        'partially_characterized_not_admitted',
    });

    expect(fr278.opaqueTargetRerun).toEqual({
      measuredMedian500Mm: 535.5,
      measuredMedian700Mm: 725,
      measuredMedian900Mm: 653.5,
      knownStep500To700Mm: 200,
      recoveredStep500To700Mm: 189.5,
      stepError500To700Mm: -10.5,
      stepErrorPercent500To700: -5.25,
      step700To900UsableForMetricConclusion: false,
      invalidReason700To900:
        '900mm_roi_contamination_or_target_membership_failure',
    });
  });

  it('imports FR280 product-priority supersession without globally rejecting ARCore', () => {
    expect(
      FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_EVIDENCE.fr280,
    ).toEqual({
      issueNumber: 1420,
      supersededOn: '2026-09-24',
      sameFrameSteppedPlaneGateExecuted: false,
      gateSupersededForProductPriority: true,
      productInput: 'ordinary_smartphone_rgb_selfie_25_30_cm',
      specialDepthMayBecomeProductPrerequisite: false,
      nextResearchPriority:
        'ordinary_rgb_selfie_feature_authority_and_independent_benchmark',
      arcoreGloballyRejected: false,
    });
  });

  it('materializes a historical receipt but does not pretend it was a native R1X runtime artifact', () => {
    const receipt =
      materializeFR300R1YRCHistoricalReceipt();

    expect(receipt).toMatchObject({
      receiptClass:
        'reconstructed_from_governed_historical_records',
      deviceModel: 'SM-S938N',
      realDeviceObserved: true,
      nativeR1XRuntimeReceiptProducedAtTheTime: false,
      historicalReceiptReconstructedFromGovernedRecords:
        true,
      reconstructionEquivalentToNativeR1XRuntimeArtifact:
        false,
    });

    expect(receipt.camera2UserFacingMetricDepth).toEqual({
      capabilityProbeExecuted: true,
      depthOutputAvailable: false,
      depth16Available: false,
      metricDepthPathAvailable: false,
      evidenceRef: 'FR273',
    });

    expect(receipt.arcoreRawDepth).toMatchObject({
      operationalProbeExecuted: true,
      operational: true,
      worldFacing: true,
      measuredMotionCadenceCharacterized: true,
      newDepthRateHz: 4.594,
      currentRole: 'research_reference_candidate_only',
      fr299Authority: false,
    });

    expect(receipt.nonhumanMetricCalibration).toMatchObject({
      executed: true,
      opaqueTarget500To700RecoveredStepMm: 189.5,
      opaqueTarget500To700NominalStepMm: 200,
      opaqueTarget500To700StepErrorPercent: -5.25,
      nineHundredMmMetricConclusionUsable: false,
      metricAccuracyValidatedForFR299: false,
      repeatabilityValidatedForFR299: false,
      evidenceRef: 'FR278',
    });
  });

  it('retires duplicate capability probing and returns the frontier to ordinary RGB-selfie benchmarking', () => {
    expect(FR300_R1Y_RC_CURRENT_GATE).toMatchObject({
      disposition:
        'historical_evidence_reconciled_rgb_selfie_benchmark_next',
      predecessorR1XPreservedAsHistoricalStage: true,
      predecessorR1XNextActionSupersededByHistoricalEvidence:
        true,
      realDeviceObserved: true,
      concreteDeviceModelBound: true,
      historicalRealDeviceCapabilityEvidenceExists: true,
      historicalReceiptReconstructedFromGovernedRecords:
        true,
      nativeR1XRuntimeReceiptProducedAtTheTime: false,
      reconstructionEquivalentToNativeR1XRuntimeArtifact:
        false,
      realNonhumanCalibrationExperimentExecuted: true,
      newCapabilityApkRequired: false,
      repeatFR273Required: false,
      repeatFR275Required: false,
      repeatFR276Required: false,
      repeatFR278Required: false,
      frontUserFacingCamera2MetricDepthLane:
        'unavailable_on_sm_s938n',
      arcoreRawDepthLane:
        'operational_research_reference_candidate_only',
      arcoreMetricAccuracyValidatedForFR299: false,
      arcoreRepeatabilityValidatedForFR299: false,
      specialDepthMayBecomeProductRequirement: false,
      specialDepthMayRemainOfflineResearchReferenceCandidate:
        true,
      nextActionWithoutNewExternalAuthorization:
        'return_to_ordinary_rgb_selfie_independent_benchmark_reference_strategy',
    });
  });

  it('preserves FR299=0, FR300-R2=0, paid spend=0, and Product 18/29', () => {
    expect(FR300_R1Y_RC_CURRENT_GATE).toMatchObject({
      humanFaceCaptureAuthorizedByThisStage: false,
      biometricArtifactCollectionAuthorizedByThisStage:
        false,
      newHardwarePurchaseAuthorized: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(
      FR300_R1Y_RC_CURRENT_GATE.authority,
    ).toEqual({
      existingHardwareMetricReferenceAuthorizedForFR299: false,
      realFR299SourceAuthorized: false,
      realFR299BundleAuthorized: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState ===
          'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);

    expect(() =>
      assertFR300R1YRCHistoricalReconciliationContract(),
    ).not.toThrow();
  });
});
