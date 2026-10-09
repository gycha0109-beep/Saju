import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1W_ZC_CURRENT_GATE,
  FR300_R1W_ZC_NONHUMAN_PROBE_POLICY,
  FR300_R1W_ZC_PLATFORM_FACTS,
  assessFR300R1WZCExistingHardwareManifest,
  assertFR300R1WZCExistingHardwareMetricContract,
  type FR300R1WZCExistingHardwareManifest,
} from './existing-hardware-metric-reference-feasibility-fr300-r1w-zc.js';

function baseManifest(
  lane: FR300R1WZCExistingHardwareManifest['lane'],
): FR300R1WZCExistingHardwareManifest {
  return {
    schemaVersion: 'fr300-r1w-zc-existing-hardware-manifest-v1',
    sourceRef: `existing-hardware:${lane}`,
    lane,
    alreadyOwnedHardware: true,
    noPurchaseRequired: true,
    independentOfCandidateProvider: true,
    humanFaceCapturePlanned: false,
    knownDimensionNonHumanTargetAvailable: true,
    independentTargetMeasurementAvailable: true,
    metricAccuracyValidationPlanned: true,
    repeatabilityValidationPlanned: true,
    providerOutputHiddenDuringReferenceConstruction: true,
    providerIndicesHiddenDuringReferenceConstruction: true,
    traditionalLabelsHiddenDuringReferenceConstruction: true,
    camera2: {
      depthOutputCapability: false,
      depth16OutputAvailable: false,
      calibrationMetadataAvailable: false,
      lensPoseAvailable: false,
      lensDistortionAvailable: false,
      depthIsExclusive: null,
      colorOutputAvailable: false,
      simultaneousColorDepthCaptureVerified: false,
      lensFacing: 'unknown',
    },
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

describe('FR300-R1W-ZC existing-hardware metric reference feasibility', () => {
  it('locks official Camera2, ARCore, and external-calibration capability facts without inventing device ownership', () => {
    expect(FR300_R1W_ZC_PLATFORM_FACTS.androidCamera2).toMatchObject({
      depthOutputCapabilityGuaranteesDepth16: true,
      depthOutputCapabilityRequiresPoseTranslation: true,
      depthOutputCapabilityRequiresPoseRotation: true,
      depthOutputCapabilityRequiresIntrinsicCalibration: true,
      depthOutputCapabilityRequiresLensDistortion: true,
      depthIsExclusiveFalseAllowsSingleRequestColorAndDepth: true,
      depthIsExclusiveTrueRequiresInterleavedColorAndDepth: true,
      frontFacingDepthOutputGuaranteed: false,
    });
    expect(FR300_R1W_ZC_PLATFORM_FACTS.arcoreRawDepth).toMatchObject({
      deviceSupportMustBeQueriedAtRuntime: true,
      hardwareDepthSensorRequired: false,
      rawDepthIsSparse: true,
      confidenceImageAvailable: true,
      depthUnit: 'millimeter',
      currentCameraFrameCorrespondenceDocumented: true,
      worldFacingMotionPrimarySource: true,
      fr251UserFacingSameCaptureCompatibleByDefault: false,
    });
    expect(FR300_R1W_ZC_CURRENT_GATE).toMatchObject({
      concreteDeviceModelBound: false,
      runtimeHardwareManifestCollected: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });
  });

  it('admits a qualifying user-facing Camera2 depth path only to the non-human probe', () => {
    const input = baseManifest(
      'android_camera2_calibrated_hardware_depth',
    );
    const result = assessFR300R1WZCExistingHardwareManifest({
      ...input,
      camera2: {
        depthOutputCapability: true,
        depth16OutputAvailable: true,
        calibrationMetadataAvailable: true,
        lensPoseAvailable: true,
        lensDistortionAvailable: true,
        depthIsExclusive: false,
        colorOutputAvailable: true,
        simultaneousColorDepthCaptureVerified: true,
        lensFacing: 'user',
      },
    });

    expect(result).toMatchObject({
      status: 'eligible_for_nonhuman_calibration_probe',
      blockers: [],
      sameCaptureRgb3dPotential: true,
      validatedRegistrationRequiredForFutureFR299: false,
    });
    expect(result.authorityBoundary.fr299SourceIssued).toBe(false);
    expect(result.authorityBoundary.humanFaceCaptureAuthorized).toBe(false);
  });

  it('admits ARCore Raw Depth to non-human calibration but keeps future validated registration required', () => {
    const input = baseManifest('arcore_raw_depth');
    const result = assessFR300R1WZCExistingHardwareManifest({
      ...input,
      arcore: {
        depthApiSupported: true,
        rawDepthAvailable: true,
        rawDepthConfidenceAvailable: true,
        rawDepthMillimeterUnits: true,
        currentFrameBindingAvailable: true,
        cameraIntrinsicsAvailable: true,
        worldFacingCamera: true,
      },
    });

    expect(result).toMatchObject({
      status: 'eligible_for_nonhuman_calibration_probe',
      blockers: [],
      sameCaptureRgb3dPotential: false,
      validatedRegistrationRequiredForFutureFR299: true,
    });
  });

  it('admits externally scaled multi-view RGB only after independent scale anchoring is present', () => {
    const input = baseManifest(
      'external_calibrated_multiview_rgb',
    );
    const blocked = assessFR300R1WZCExistingHardwareManifest({
      ...input,
      externalCalibration: {
        multiViewCaptureAvailable: true,
        cameraIntrinsicsKnownOrCalibratable: true,
        similarityScaleAnchorAvailable: true,
        scaleAnchorIndependentOfReconstruction: false,
        reconstructionProviderIndependentOfCandidate: true,
      },
    });
    expect(blocked.status).toBe('blocked');
    expect(blocked.blockers).toContain(
      'external_scale_anchor_not_independent',
    );

    const admitted = assessFR300R1WZCExistingHardwareManifest({
      ...input,
      externalCalibration: {
        multiViewCaptureAvailable: true,
        cameraIntrinsicsKnownOrCalibratable: true,
        similarityScaleAnchorAvailable: true,
        scaleAnchorIndependentOfReconstruction: true,
        reconstructionProviderIndependentOfCandidate: true,
      },
    });
    expect(admitted).toMatchObject({
      status: 'eligible_for_nonhuman_calibration_probe',
      blockers: [],
      sameCaptureRgb3dPotential: false,
      validatedRegistrationRequiredForFutureFR299: true,
    });
  });

  it('rejects ordinary monocular RGB as independent metric truth', () => {
    const result = assessFR300R1WZCExistingHardwareManifest(
      baseManifest('ordinary_monocular_rgb_only'),
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers).toContain(
      'ordinary_monocular_rgb_has_no_independent_metric_scale',
    );
    expect(
      FR300_R1W_ZC_PLATFORM_FACTS.ordinaryMonocularRgbOnly
        .admissibleAsFR299MetricTruthByItself,
    ).toBe(false);
  });

  it('blocks a depth-capable lane when the non-human metric validation plan is incomplete', () => {
    const input = baseManifest(
      'android_camera2_calibrated_hardware_depth',
    );
    const result = assessFR300R1WZCExistingHardwareManifest({
      ...input,
      knownDimensionNonHumanTargetAvailable: false,
      repeatabilityValidationPlanned: false,
      camera2: {
        depthOutputCapability: true,
        depth16OutputAvailable: true,
        calibrationMetadataAvailable: true,
        lensPoseAvailable: true,
        lensDistortionAvailable: true,
        depthIsExclusive: false,
        colorOutputAvailable: true,
        simultaneousColorDepthCaptureVerified: true,
        lensFacing: 'user',
      },
    });
    expect(result.status).toBe('blocked');
    expect(result.blockers).toEqual(
      expect.arrayContaining([
        'known_dimension_target_missing',
        'repeatability_validation_not_planned',
      ]),
    );
  });

  it('preserves the non-human boundary, FR299=0, and Product 18/29', () => {
    expect(FR300_R1W_ZC_NONHUMAN_PROBE_POLICY).toMatchObject({
      humanFaceAllowed: false,
      biometricArtifactAllowed: false,
      acceptanceThresholdIssuedByThisStage: false,
      descriptiveErrorMetricsOnlyUntilNextAdjudication: true,
    });
    expect(FR300_R1W_ZC_CURRENT_GATE.disposition).toBe(
      'conditional_pass_to_device_probe',
    );
    expect(FR300_R1W_ZC_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1W_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() =>
      assertFR300R1WZCExistingHardwareMetricContract(),
    ).not.toThrow();
  });
});
