import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1T_ZC_CURRENT_GATE,
  FR300_R1T_ZC_ULDD_ADJUDICATION,
  FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY,
  FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS,
  assertFR300R1TZCULDDPublicMetricContract,
} from './ul-dd-public-metric-qualification-fr300-r1t-zc.js';

describe('FR300-R1T-ZC UL-DD public metric qualification', () => {
  it('binds the public UL-DD stereo representation without inventing metric depth', () => {
    expect(FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS).toMatchObject({
      captureDevice: 'ZED_2',
      captureCombinedResolution: '1344x376',
      captureFps: 60,
      publicStereoRepresentation: 'split_left_right_mp4',
      publicEyeResolution: '440x370',
      publicResizeApplied: true,
      publicFaceLandmarks:
        '68x2_xy_from_ir_video_using_dlib_not_metric_3d',
    });
  });

  it('requires exact capture-device calibration rather than generic ZED 2 assumptions', () => {
    expect(FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY).toMatchObject({
      exactCaptureDeviceSerialSourceBound: false,
      exactCaptureDeviceCalibrationFileSourceBound: false,
      exactReleasedPixelTransformSourceBound: false,
      rectificationStateSourceBound: false,
      exactLeftIntrinsicsSourceBound: false,
      exactRightIntrinsicsSourceBound: false,
      exactStereoExtrinsicsSourceBound: false,
      exactMetricBaselineSourceBound: false,
      genericZed2CalibrationAcceptableAsCaptureAuthority: false,
    });
  });

  it('holds rather than terminally rejects UL-DD when public authority is insufficient', () => {
    expect(FR300_R1T_ZC_ULDD_ADJUDICATION).toMatchObject({
      metricReconstructionFromPublicRelease: 'not_source_bound',
      disposition:
        'hold_zero_cost_technical_public_release_not_fr299_metric_authority',
      terminalReject: false,
    });
    expect(FR300_R1T_ZC_ULDD_ADJUDICATION.reopenOnlyIf).toHaveLength(4);
  });

  it('does not request access, download subject artifacts, contact authors, spend, or promote', () => {
    expect(FR300_R1T_ZC_CURRENT_GATE.restrictedArtifactAccessRequested).toBe(
      false,
    );
    expect(
      FR300_R1T_ZC_CURRENT_GATE.restrictedArtifactAccessAuthorizedByThisTrack,
    ).toBe(false);
    expect(FR300_R1T_ZC_CURRENT_GATE.subjectArtifactDownloadPerformed).toBe(
      false,
    );
    expect(FR300_R1T_ZC_CURRENT_GATE.externalContactPerformed).toBe(false);
    expect(FR300_R1T_ZC_CURRENT_GATE.paidSpendAuthorized).toBe(false);
    expect(FR300_R1T_ZC_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1T_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
  });

  it('preserves product 18/29 and the complete authority contract', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() => assertFR300R1TZCULDDPublicMetricContract()).not.toThrow();
  });
});
