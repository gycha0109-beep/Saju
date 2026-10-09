import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1X_ZC_CURRENT_GATE,
  FR300_R1X_ZC_PROBE_POLICY,
  assessFR300R1XZCRuntimeHardwareReceipt,
  assertFR300R1XZCRuntimeHardwareCalibrationContract,
  materializeFR300R1XZCNonhumanCalibrationProbe,
  type FR300R1XZCProbePreparation,
  type FR300R1XZCRuntimeHardwareReceipt,
} from './runtime-hardware-calibration-probe-fr300-r1x-zc.js';

const preparation: FR300R1XZCProbePreparation = {
  schemaVersion: 'fr300-r1x-zc-probe-preparation-v1',
  knownDimensionNonHumanTargetAvailable: true,
  independentTargetMeasurementAvailable: true,
  metricAccuracyValidationPlanned: true,
  repeatabilityValidationPlanned: true,
  independentOfCandidateProvider: true,
  providerOutputHiddenDuringReferenceConstruction: true,
  providerIndicesHiddenDuringReferenceConstruction: true,
  traditionalLabelsHiddenDuringReferenceConstruction: true,
  humanFaceCapturePlanned: false,
};

function baseReceipt(): FR300R1XZCRuntimeHardwareReceipt {
  return {
    schemaVersion: 'fr300-r1x-zc-runtime-hardware-receipt-v1',
    receiptRef: 'runtime:synthetic-test-device',
    capturedAtUtc: '2026-09-26T00:00:00Z',
    platform: 'android',
    deviceManufacturer: 'synthetic',
    deviceModel: 'test-fixture',
    androidSdkInt: 36,
    producedByRuntimeProbe: true,
    alreadyOwnedHardware: true,
    noPurchaseRequired: true,
    humanFaceCaptured: false,
    biometricArtifactCaptured: false,
    paidHardwareConsumed: false,
    camera2Cameras: [],
    arcore: {
      depthApiSupported: false,
      rawDepthAvailable: false,
      rawDepthConfidenceAvailable: false,
      rawDepthMillimeterUnits: false,
      currentFrameBindingAvailable: false,
      cameraIntrinsicsAvailable: false,
      worldFacingCamera: false,
    },
    externalCalibration: {
      multiViewCaptureAvailable: false,
      cameraIntrinsicsKnownOrCalibratable: false,
      similarityScaleAnchorAvailable: false,
      scaleAnchorIndependentOfReconstruction: false,
      reconstructionProviderIndependentOfCandidate: false,
    },
  };
}

describe('FR300-R1X-ZC runtime hardware calibration probe', () => {
  it('keeps static repository state blocked on real-device execution', () => {
    expect(FR300_R1X_ZC_CURRENT_GATE).toMatchObject({
      disposition: 'implementation_ready_device_execution_required',
      runtimeProbeImplementationReady: true,
      realRuntimeHardwareReceiptCollected: false,
      realDeviceCapabilityBound: false,
      realNonhumanCalibrationProbeExecuted: false,
      syntheticTestEvidenceIsRealDeviceEvidence: false,
      humanFaceCapturePerformed: false,
      biometricArtifactCollected: false,
      newHardwarePurchaseAuthorized: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
      externalExecutionBlocker:
        'real_android_device_or_equivalent_existing_hardware_runtime_receipt_required',
    });
  });

  it('turns a synthetic qualifying Camera2 receipt into probe eligibility without issuing FR299 authority', () => {
    const receipt = baseReceipt();
    const result = assessFR300R1XZCRuntimeHardwareReceipt(
      {
        ...receipt,
        camera2Cameras: [
          {
            cameraId: 'front-depth',
            lensFacing: 'user',
            depthOutputCapability: true,
            depth16OutputAvailable: true,
            calibrationMetadataAvailable: true,
            lensPoseAvailable: true,
            lensDistortionAvailable: true,
            depthIsExclusive: false,
            colorOutputAvailable: true,
            simultaneousColorDepthCaptureVerified: true,
          },
        ],
      },
      preparation,
    );

    const camera2 = result.assessments.find(
      (assessment) =>
        assessment.lane ===
        'android_camera2_calibrated_hardware_depth',
    );
    expect(camera2).toMatchObject({
      status: 'eligible_for_nonhuman_calibration_probe',
      sameCaptureRgb3dPotential: true,
      validatedRegistrationRequiredForFutureFR299: false,
    });
    expect(result.eligibleLaneCount).toBe(1);
    expect(result.authorityBoundary.fr299SourceIssued).toBe(false);
    expect(
      result.authorityBoundary.humanFaceCaptureAuthorized,
    ).toBe(false);
  });

  it('turns a synthetic ARCore Raw Depth receipt into probe eligibility while retaining future registration', () => {
    const receipt = baseReceipt();
    const result = assessFR300R1XZCRuntimeHardwareReceipt(
      {
        ...receipt,
        arcore: {
          depthApiSupported: true,
          rawDepthAvailable: true,
          rawDepthConfidenceAvailable: true,
          rawDepthMillimeterUnits: true,
          currentFrameBindingAvailable: true,
          cameraIntrinsicsAvailable: true,
          worldFacingCamera: true,
        },
      },
      preparation,
    );

    const arcore = result.assessments.find(
      (assessment) => assessment.lane === 'arcore_raw_depth',
    );
    expect(arcore).toMatchObject({
      status: 'eligible_for_nonhuman_calibration_probe',
      sameCaptureRgb3dPotential: false,
      validatedRegistrationRequiredForFutureFR299: true,
    });
  });

  it('always keeps ordinary monocular RGB blocked as independent metric truth', () => {
    const result = assessFR300R1XZCRuntimeHardwareReceipt(
      baseReceipt(),
      preparation,
    );
    const monocular = result.assessments.find(
      (assessment) =>
        assessment.lane === 'ordinary_monocular_rgb_only',
    );
    expect(monocular?.status).toBe('blocked');
    expect(monocular?.blockers).toContain(
      'ordinary_monocular_rgb_has_no_independent_metric_scale',
    );
  });

  it('computes descriptive accuracy and repeatability metrics without issuing an acceptance threshold', () => {
    const receipt = baseReceipt();
    const assessmentSet =
      assessFR300R1XZCRuntimeHardwareReceipt(
        {
          ...receipt,
          camera2Cameras: [
            {
              cameraId: 'front-depth',
              lensFacing: 'user',
              depthOutputCapability: true,
              depth16OutputAvailable: true,
              calibrationMetadataAvailable: true,
              lensPoseAvailable: true,
              lensDistortionAvailable: true,
              depthIsExclusive: false,
              colorOutputAvailable: true,
              simultaneousColorDepthCaptureVerified: true,
            },
          ],
        },
        preparation,
      );
    const sourceAssessment = assessmentSet.assessments.find(
      (assessment) =>
        assessment.lane ===
        'android_camera2_calibrated_hardware_depth',
    );
    expect(sourceAssessment).toBeDefined();
    if (sourceAssessment === undefined) {
      throw new Error('synthetic Camera2 assessment missing');
    }

    const result =
      materializeFR300R1XZCNonhumanCalibrationProbe({
        schemaVersion:
          'fr300-r1x-zc-calibration-probe-input-v1',
        probeRef: 'probe:synthetic-camera2',
        sourceAssessment,
        targetRef: 'target:known-dimension-fixture',
        targetClass:
          'nonhuman_known_dimension_calibration_target',
        humanSubjectPresent: false,
        biometricArtifactPresent: false,
        candidateProviderOutputVisible: false,
        candidateProviderIndicesVisible: false,
        traditionalLabelsVisible: false,
        scaleAnchor: null,
        validationSegments: [
          {
            segmentRef: 'validation:a',
            knownCm: 10,
            measuredCmByRepeat: [10.1, 9.9, 10],
          },
          {
            segmentRef: 'validation:b',
            knownCm: 20,
            measuredCmByRepeat: [20.2, 20.1, 19.9],
          },
        ],
      });

    expect(result).toMatchObject({
      status:
        'descriptive_probe_complete_threshold_not_issued',
      segmentCount: 2,
      measurementCount: 6,
    });
    expect(result.segmentResults[0]?.meanMeasuredCm).toBeCloseTo(
      10,
      10,
    );
    expect(
      result.segmentResults[0]?.meanAbsoluteErrorCm,
    ).toBeCloseTo(0.0666666667, 8);
    expect(
      result.segmentResults[0]?.repeatabilityRangeCm,
    ).toBeCloseTo(0.2, 10);
    expect(result.aggregate.meanAbsoluteErrorCm).toBeCloseTo(
      0.1,
      10,
    );
    expect(result.aggregate.maxAbsoluteErrorCm).toBeCloseTo(
      0.2,
      10,
    );
    expect(
      result.authorityBoundary.acceptanceThresholdIssued,
    ).toBe(false);
    expect(result.authorityBoundary.metricAccuracyValidated).toBe(
      false,
    );
    expect(result.authorityBoundary.repeatabilityValidated).toBe(
      false,
    );
    expect(result.authorityBoundary.fr299SourceIssued).toBe(false);
  });

  it('rejects tautological external multi-view validation when the scale anchor is reused as a validation segment', () => {
    const receipt = baseReceipt();
    const assessmentSet =
      assessFR300R1XZCRuntimeHardwareReceipt(
        {
          ...receipt,
          externalCalibration: {
            multiViewCaptureAvailable: true,
            cameraIntrinsicsKnownOrCalibratable: true,
            similarityScaleAnchorAvailable: true,
            scaleAnchorIndependentOfReconstruction: true,
            reconstructionProviderIndependentOfCandidate: true,
          },
        },
        preparation,
      );
    const sourceAssessment = assessmentSet.assessments.find(
      (assessment) =>
        assessment.lane ===
        'external_calibrated_multiview_rgb',
    );
    expect(sourceAssessment?.status).toBe(
      'eligible_for_nonhuman_calibration_probe',
    );
    if (sourceAssessment === undefined) {
      throw new Error('synthetic external assessment missing');
    }

    expect(() =>
      materializeFR300R1XZCNonhumanCalibrationProbe({
        schemaVersion:
          'fr300-r1x-zc-calibration-probe-input-v1',
        probeRef: 'probe:external',
        sourceAssessment,
        targetRef: 'target:scale-fixture',
        targetClass:
          'nonhuman_known_dimension_calibration_target',
        humanSubjectPresent: false,
        biometricArtifactPresent: false,
        candidateProviderOutputVisible: false,
        candidateProviderIndicesVisible: false,
        traditionalLabelsVisible: false,
        scaleAnchor: {
          segmentRef: 'segment:anchor',
          knownCm: 30,
          usedToSetReconstructionScale: true,
        },
        validationSegments: [
          {
            segmentRef: 'segment:anchor',
            knownCm: 30,
            measuredCmByRepeat: [30, 30.1, 29.9],
          },
          {
            segmentRef: 'segment:independent',
            knownCm: 15,
            measuredCmByRepeat: [15, 15.1, 14.9],
          },
        ],
      }),
    ).toThrow(
      /scale anchor must be separate from every validation segment/u,
    );
  });

  it('requires at least two validation segments and three repeats per segment', () => {
    const receipt = baseReceipt();
    const assessmentSet =
      assessFR300R1XZCRuntimeHardwareReceipt(
        {
          ...receipt,
          arcore: {
            depthApiSupported: true,
            rawDepthAvailable: true,
            rawDepthConfidenceAvailable: true,
            rawDepthMillimeterUnits: true,
            currentFrameBindingAvailable: true,
            cameraIntrinsicsAvailable: true,
            worldFacingCamera: true,
          },
        },
        preparation,
      );
    const sourceAssessment = assessmentSet.assessments.find(
      (assessment) => assessment.lane === 'arcore_raw_depth',
    );
    if (sourceAssessment === undefined) {
      throw new Error('synthetic ARCore assessment missing');
    }

    expect(() =>
      materializeFR300R1XZCNonhumanCalibrationProbe({
        schemaVersion:
          'fr300-r1x-zc-calibration-probe-input-v1',
        probeRef: 'probe:too-few-segments',
        sourceAssessment,
        targetRef: 'target:test',
        targetClass:
          'nonhuman_known_dimension_calibration_target',
        humanSubjectPresent: false,
        biometricArtifactPresent: false,
        candidateProviderOutputVisible: false,
        candidateProviderIndicesVisible: false,
        traditionalLabelsVisible: false,
        scaleAnchor: null,
        validationSegments: [
          {
            segmentRef: 'segment:a',
            knownCm: 10,
            measuredCmByRepeat: [10, 10, 10],
          },
        ],
      }),
    ).toThrow(/at least 2 independent validation segments/u);

    expect(() =>
      materializeFR300R1XZCNonhumanCalibrationProbe({
        schemaVersion:
          'fr300-r1x-zc-calibration-probe-input-v1',
        probeRef: 'probe:too-few-repeats',
        sourceAssessment,
        targetRef: 'target:test',
        targetClass:
          'nonhuman_known_dimension_calibration_target',
        humanSubjectPresent: false,
        biometricArtifactPresent: false,
        candidateProviderOutputVisible: false,
        candidateProviderIndicesVisible: false,
        traditionalLabelsVisible: false,
        scaleAnchor: null,
        validationSegments: [
          {
            segmentRef: 'segment:a',
            knownCm: 10,
            measuredCmByRepeat: [10, 10],
          },
          {
            segmentRef: 'segment:b',
            knownCm: 20,
            measuredCmByRepeat: [20, 20, 20],
          },
        ],
      }),
    ).toThrow(/requires at least 3 repeats/u);
  });

  it('preserves the policy boundary, FR299=0, and Product 18/29', () => {
    expect(FR300_R1X_ZC_PROBE_POLICY).toMatchObject({
      minimumValidationSegmentCount: 2,
      minimumRepeatsPerValidationSegment: 3,
      scaleAnchorMayAlsoBeValidationSegment: false,
      descriptiveMetricsOnly: true,
      acceptanceThresholdIssued: false,
      syntheticReceiptMayEstablishRealDeviceOwnership: false,
      humanFaceAllowed: false,
      biometricArtifactAllowed: false,
    });
    expect(FR300_R1X_ZC_CURRENT_GATE.fr299EligibleCandidateCount).toBe(
      0,
    );
    expect(FR300_R1X_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(
      0,
    );
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState ===
          'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() =>
      assertFR300R1XZCRuntimeHardwareCalibrationContract(),
    ).not.toThrow();
  });
});
