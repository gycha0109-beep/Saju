import {
  FR300_R1R_ZC_CANDIDATES,
  FR300_R1R_ZC_ZERO_COST_METRIC_3D_CONTRACT_VERSION,
  assertFR300R1RZCZeroCostMetric3DContract,
} from './zero-cost-metric-3d-qualification-fr300-r1r-zc.js';
import {
  FR300_R1S_Q_CURRENT_GATE,
  FR300_R1S_Q_MINDS_RIGHTS_INQUIRY_CONTRACT_VERSION,
  assertFR300R1SQMindsRightsInquiryContract,
} from './minds-libras-rights-inquiry-fr300-r1s-q.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1T_ZC_ULDD_PUBLIC_METRIC_CONTRACT_VERSION =
  'FR300-R1T-ZC-ULDD-PUBLIC-METRIC-v1' as const;

export const FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS = Object.freeze({
  datasetDoi: '10.5281/zenodo.17978727' as const,
  datasetAccess: 'restricted_zero_cost_on_request' as const,
  permittedUse: 'bona_fide_research_including_commercial_r_and_d' as const,
  participantReleaseConsent:
    'explicit_post_collection_release_consent_for_published_subject_video_data' as const,
  ethicsApproval: 'UL_Lafayette_IRB_22_038_IRI' as const,
  captureDevice: 'ZED_2' as const,
  captureCombinedResolution: '1344x376' as const,
  captureFps: 60 as const,
  publicStereoRepresentation: 'split_left_right_mp4' as const,
  publicEyeResolution: '440x370' as const,
  publicResizeApplied: true as const,
  publicFaceLandmarks:
    '68x2_xy_from_ir_video_using_dlib_not_metric_3d' as const,
});

export const FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY = Object.freeze({
  exactCaptureDeviceSerialSourceBound: false as const,
  exactCaptureDeviceCalibrationFileSourceBound: false as const,
  exactReleasedPixelTransformSourceBound: false as const,
  rectificationStateSourceBound: false as const,
  exactLeftIntrinsicsSourceBound: false as const,
  exactRightIntrinsicsSourceBound: false as const,
  exactStereoExtrinsicsSourceBound: false as const,
  exactMetricBaselineSourceBound: false as const,
  genericZed2CalibrationAcceptableAsCaptureAuthority: false as const,
  reason:
    'ZED stereo depth requires device-specific calibration, while the public UL-DD authority does not bind the released resized MP4 pair to the exact capture-device calibration and pixel transform.' as const,
});

export const FR300_R1T_ZC_ULDD_ADJUDICATION = Object.freeze({
  metricReconstructionFromPublicRelease:
    'not_source_bound' as const,
  disposition:
    'hold_zero_cost_technical_public_release_not_fr299_metric_authority' as const,
  terminalReject: false as const,
  reopenOnlyIf: Object.freeze([
    'exact_capture_device_calibration_is_source_bound',
    'exact_release_resize_crop_rectification_transform_is_source_bound',
    'same_frame_left_right_correspondence_is_verified',
    'released_or_authorized_artifact_geometry_is_inspected_without_scale_destroying_processing',
  ] as const),
  prohibitedSubstitutions: Object.freeze([
    'generic_zed2_model_calibration_for_exact_capture_device_calibration',
    'ir_2d_facial_landmarks_for_metric_3d_face_geometry',
    'device_model_name_for_released_metric_depth_authority',
  ] as const),
});

export const FR300_R1T_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1t-zc-uldd-public-metric-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  publicSourceReviewCompleted: true as const,
  restrictedArtifactAccessRequested: false as const,
  restrictedArtifactAccessAuthorizedByThisTrack: false as const,
  subjectArtifactDownloadPerformed: false as const,
  externalContactPerformed: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  nextActionWithoutNewAuthorization:
    'hold_uldd_and_evaluate_ast_face_public_path_or_existing_hardware_metric_reference' as const,
  authority: Object.freeze({
    ulDdMetricReferenceAuthorized: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1T-ZC ${message}`);
}

export function assertFR300R1TZCULDDPublicMetricContract(): void {
  assertFR300R1RZCZeroCostMetric3DContract();
  assertFR300R1SQMindsRightsInquiryContract();

  if (
    FR300_R1R_ZC_ZERO_COST_METRIC_3D_CONTRACT_VERSION !==
      'FR300-R1R-ZC-ZERO-COST-METRIC-3D-v1' ||
    FR300_R1S_Q_MINDS_RIGHTS_INQUIRY_CONTRACT_VERSION !==
      'FR300-R1S-Q-MINDS-RIGHTS-INQUIRY-v1'
  ) {
    fail('predecessor authority drift.');
  }

  const ulDd = FR300_R1R_ZC_CANDIDATES.find(
    (candidate) => candidate.id === 'ul_dd_zed2',
  );
  if (
    ulDd?.costState !== 'zero_cost_on_request' ||
    ulDd.rightsState !== 'commercial_r_and_d_verified' ||
    ulDd.metricState !== 'metric_survivability_unresolved' ||
    ulDd.disposition !== 'hold_zero_cost_technical'
  ) {
    fail('UL-DD predecessor candidate state drift.');
  }

  if (
    !FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS.publicResizeApplied ||
    FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS.publicStereoRepresentation !==
      'split_left_right_mp4' ||
    FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS.publicFaceLandmarks !==
      '68x2_xy_from_ir_video_using_dlib_not_metric_3d'
  ) {
    fail('UL-DD public representation facts drift.');
  }

  const calibration = FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY;
  if (
    calibration.exactCaptureDeviceSerialSourceBound ||
    calibration.exactCaptureDeviceCalibrationFileSourceBound ||
    calibration.exactReleasedPixelTransformSourceBound ||
    calibration.rectificationStateSourceBound ||
    calibration.exactLeftIntrinsicsSourceBound ||
    calibration.exactRightIntrinsicsSourceBound ||
    calibration.exactStereoExtrinsicsSourceBound ||
    calibration.exactMetricBaselineSourceBound ||
    calibration.genericZed2CalibrationAcceptableAsCaptureAuthority
  ) {
    fail('UL-DD metric calibration authority was widened without source evidence.');
  }

  if (
    FR300_R1T_ZC_ULDD_ADJUDICATION.metricReconstructionFromPublicRelease !==
      'not_source_bound' ||
    FR300_R1T_ZC_ULDD_ADJUDICATION.terminalReject ||
    FR300_R1T_ZC_CURRENT_GATE.restrictedArtifactAccessRequested ||
    FR300_R1T_ZC_CURRENT_GATE.restrictedArtifactAccessAuthorizedByThisTrack ||
    FR300_R1T_ZC_CURRENT_GATE.subjectArtifactDownloadPerformed ||
    FR300_R1T_ZC_CURRENT_GATE.externalContactPerformed ||
    FR300_R1T_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1T_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1T_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1T_ZC_CURRENT_GATE.authority.ulDdMetricReferenceAuthorized ||
    FR300_R1T_ZC_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1T_ZC_CURRENT_GATE.authority.fr300R2Authorized
  ) {
    fail('UL-DD public-source qualification must remain fail-closed.');
  }

  if (
    FR300_R1S_Q_CURRENT_GATE.subjectArtifactDownloadPerformed ||
    FR300_R1S_Q_CURRENT_GATE.externalContactPerformed
  ) {
    fail('MINDS hold boundary must remain closed.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('R1T-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1TZCULDDPublicMetricContract();
