import { describe, expect, it } from 'vitest';
import {
  preflightIndependent3DSourceFR272,
  type Independent3DSourcePreflightInputFR272V1,
} from './independent-3d-nasal-apex-acquisition-preflight-fr272.js';

function input(
  overrides: Partial<Independent3DSourcePreflightInputFR272V1> = {},
): Independent3DSourcePreflightInputFR272V1 {
  return {
    schemaVersion: 'fr272-independent-3d-source-preflight-input-v1',
    sourceRef: 'source.fr272.device-001',
    sourceClass: 'android_camera2_calibrated_hardware_depth',
    independentOfMediaPipeAttested: true,
    metricScaleAvailable: true,
    rgbObservationAvailable: true,
    rgbDepthCorrespondenceAvailable: true,
    cameraIntrinsicsAvailable: true,
    cameraExtrinsicsOrPoseAvailable: true,
    providerOutputHiddenDuringAnnotation: true,
    providerIndicesHiddenDuringAnnotation: true,
    traditionalLabelHiddenDuringAnnotation: true,
    annotationFreezeBeforeProviderScoringPlanned: true,
    sameCaptureBindingAvailable: true,
    fr251UserFacingSameCaptureCompatible: true,
    camera2DepthOutputCapability: true,
    hardwareDepthSensorConfirmed: true,
    arcoreRawDepthAvailable: false,
    arcoreRawDepthConfidenceAvailable: false,
    worldFacingCamera: false,
    externalMetricCalibrationVerified: false,
    ...overrides,
  };
}

describe('FR272 independent 3D nasal-apex acquisition preflight', () => {
  it('admits user-facing calibrated hardware depth only to validation and registration', () => {
    const result = preflightIndependent3DSourceFR272(input());
    expect(result.eligibleForIndependentSourceValidation).toBe(true);
    expect(result.eligibleForCurrentFR271Lane).toBe(true);
    expect(result.sourceValidationBlockers).toEqual([]);
    expect(result.currentLaneBlockers).toEqual([]);
    expect(Object.values(result.acquisitionBoundary).every((value) => value === false)).toBe(true);
  });

  it('keeps ARCore raw depth as an independent source candidate but blocks the current user-facing FR251 lane', () => {
    const result = preflightIndependent3DSourceFR272(input({
      sourceClass: 'arcore_raw_depth',
      camera2DepthOutputCapability: false,
      hardwareDepthSensorConfirmed: false,
      arcoreRawDepthAvailable: true,
      arcoreRawDepthConfidenceAvailable: true,
      worldFacingCamera: true,
      sameCaptureBindingAvailable: false,
      fr251UserFacingSameCaptureCompatible: false,
    }));

    expect(result.eligibleForIndependentSourceValidation).toBe(true);
    expect(result.eligibleForCurrentFR271Lane).toBe(false);
    expect(result.currentLaneBlockers).toContain(
      'arcore_world_facing_depth_not_fr251_user_facing_same_capture_compatible',
    );
    expect(result.requiredNextChecks).toContain('verify_raw_depth_coverage_at_nasal_apex_pixel');
    expect(result.acquisitionBoundary.fr271CollectionAuthorized).toBe(false);
  });

  it('rejects MediaPipe or FR257 geometry as the independent annotation source', () => {
    const result = preflightIndependent3DSourceFR272(input({
      sourceClass: 'mediapipe_or_fr257_derived_geometry',
    }));
    expect(result.eligibleForIndependentSourceValidation).toBe(false);
    expect(result.sourceValidationBlockers).toContain(
      'mediapipe_or_fr257_geometry_forbidden_as_independent_annotation_source',
    );
  });

  it('rejects missing RGB-depth correspondence or calibration', () => {
    const result = preflightIndependent3DSourceFR272(input({
      rgbDepthCorrespondenceAvailable: false,
      cameraIntrinsicsAvailable: false,
      cameraExtrinsicsOrPoseAvailable: false,
    }));
    expect(result.eligibleForIndependentSourceValidation).toBe(false);
    expect(result.sourceValidationBlockers).toEqual(expect.arrayContaining([
      'rgb_depth_correspondence_unavailable',
      'camera_intrinsics_unavailable',
      'camera_extrinsics_or_pose_unavailable',
    ]));
  });

  it('rejects annotation flows that expose provider or traditional labels', () => {
    const result = preflightIndependent3DSourceFR272(input({
      providerOutputHiddenDuringAnnotation: false,
      providerIndicesHiddenDuringAnnotation: false,
      traditionalLabelHiddenDuringAnnotation: false,
    }));
    expect(result.eligibleForIndependentSourceValidation).toBe(false);
    expect(result.sourceValidationBlockers).toEqual(expect.arrayContaining([
      'provider_output_visible_during_annotation',
      'provider_indices_visible_during_annotation',
      'traditional_label_visible_during_annotation',
    ]));
  });

  it('rejects ARCore raw depth without confidence', () => {
    const result = preflightIndependent3DSourceFR272(input({
      sourceClass: 'arcore_raw_depth',
      camera2DepthOutputCapability: false,
      hardwareDepthSensorConfirmed: false,
      arcoreRawDepthAvailable: true,
      arcoreRawDepthConfidenceAvailable: false,
      worldFacingCamera: true,
      sameCaptureBindingAvailable: false,
      fr251UserFacingSameCaptureCompatible: false,
    }));
    expect(result.eligibleForIndependentSourceValidation).toBe(false);
    expect(result.sourceValidationBlockers).toContain('arcore_raw_depth_confidence_unavailable');
  });

  it('requires an external calibrated scan to prove same-capture compatibility separately', () => {
    const result = preflightIndependent3DSourceFR272(input({
      sourceClass: 'external_calibrated_3d_scan',
      camera2DepthOutputCapability: false,
      hardwareDepthSensorConfirmed: false,
      externalMetricCalibrationVerified: true,
      sameCaptureBindingAvailable: false,
      fr251UserFacingSameCaptureCompatible: false,
    }));
    expect(result.eligibleForIndependentSourceValidation).toBe(true);
    expect(result.eligibleForCurrentFR271Lane).toBe(false);
    expect(result.currentLaneBlockers).toEqual(expect.arrayContaining([
      'same_capture_binding_unavailable',
      'source_not_same_capture_compatible_with_fr251_user_facing_lane',
    ]));
  });
});
