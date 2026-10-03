import {
  FR300_R2K_CURRENT_GATE,
  FR300_R2K_MINDS_LIBRAS,
  FR300_R2K_UL_DD,
  assertFR300R2KAlternativeAuthorityFrontierContract,
  type FR300R2KMetricAuthorityLevel,
  type FR300R2KPairingAuthorityLevel,
} from './alternative-authority-frontier-fr300-r2k.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2L_PUBLIC_ARTIFACT_CALIBRATION_EVIDENCE_CONTRACT_VERSION =
  'FR300-R2L-PUBLIC-ARTIFACT-CALIBRATION-EVIDENCE-v1' as const;

export type FR300R2LGeometryClass =
  | 'kinect_v2_hd_face_sdk_model_output_not_raw_depth_surface'
  | 'zed2_release_without_source_bound_raw_metric_surface';

export interface FR300R2LPublicEvidenceReceipt {
  readonly candidateId: 'minds_libras' | 'ul_dd';
  readonly sourceUrls: readonly string[];
  readonly publicManifestObserved: boolean;
  readonly publicSchemaObserved: boolean;
  readonly exactFileChecksumObserved: boolean;
  readonly rawSurfaceSemanticsSourceBound: boolean;
  readonly exactCalibrationBundleObserved: boolean;
  readonly exactReleaseTransformObserved: boolean;
  readonly metricAuthorityAfterAudit: FR300R2KMetricAuthorityLevel;
  readonly pairingAuthorityAfterAudit: FR300R2KPairingAuthorityLevel;
  readonly geometryClass: FR300R2LGeometryClass;
  readonly accessRequestJustified: boolean;
  readonly participantArtifactDownloadAuthorized: false;
  readonly restrictedAccessRequestAuthorized: false;
  readonly directFR299ReferenceEligible: false;
  readonly blockers: readonly string[];
  readonly nextEvidenceAction: string;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2L ${message}`,
  );
}

export const FR300_R2L_MINDS_LIBRAS = Object.freeze({
  candidateId: 'minds_libras' as const,
  sourceUrls: Object.freeze([
    'https://minds.eng.ufmg.br/projects.php',
    'https://repositorio.ufmg.br/bitstreams/4307a8e9-f22e-4374-a900-0f42d88974a8/download',
    'https://zenodo.org/records/4322984',
    'https://zenodo.org/records/2667329',
    'https://learn.microsoft.com/en-us/previous-versions/windows/kinect/dn791589(v=ieb.10)',
    'https://learn.microsoft.com/en-us/previous-versions/windows/kinect/dn791773(v=ieb.10)',
  ] as const),
  sourceBoundFindings: Object.freeze({
    kinectV2RgbDDocumented: true as const,
    rgbAndDepthVideoDistributionDocumented: true as const,
    faceTxtSchemaDocumented: true as const,
    perFrameFaceModelXYZPointCount: 1347 as const,
    faceModelReferenceFrame:
      'sensor_geometric_center' as const,
    faceModelCoordinateUnit:
      'meter' as const,
    colorFaceModelMapsFaceModelIntoRgbFrame:
      true as const,
    depthFaceModelMapsFaceModelIntoDepthFrame:
      true as const,
    fixedFrameCountPerSample: 150 as const,
    publicDistributionMetadataObserved:
      true as const,
    publicExactFileManifestObserved:
      false as const,
    publicExactFileChecksumObserved:
      false as const,
    microsoftSdkFaceModelApiObserved:
      true as const,
    microsoftHdFaceFrameAssociatesFaceModelWithColorAndDepthFrameReferences:
      true as const,
    rawDepthSurfaceEquivalentToFaceModelSourceBound:
      false as const,
    exactCalibrationBundlePubliclyObserved:
      false as const,
    exactArtifactReleaseTransformPubliclyObserved:
      false as const,
  }),
  publicManifestObserved: false as const,
  publicSchemaObserved: true as const,
  exactFileChecksumObserved: false as const,
  rawSurfaceSemanticsSourceBound: false as const,
  exactCalibrationBundleObserved: false as const,
  exactReleaseTransformObserved: false as const,
  metricAuthorityAfterAudit:
    'M2_exact_acquisition_export_metric_documented' as const satisfies FR300R2KMetricAuthorityLevel,
  pairingAuthorityAfterAudit:
    'P2_same_acquisition_with_cross_modal_mapping_documented' as const satisfies FR300R2KPairingAuthorityLevel,
  geometryClass:
    'kinect_v2_hd_face_sdk_model_output_not_raw_depth_surface' as const satisfies FR300R2LGeometryClass,
  accessRequestJustified: false as const,
  participantArtifactDownloadAuthorized: false as const,
  restrictedAccessRequestAuthorized: false as const,
  directFR299ReferenceEligible: false as const,
  blockers: Object.freeze([
    'public_distribution_metadata_does_not_expose_an_exact_participant_file_manifest_bound_to_the_face_schema',
    'exact_released_file_checksum_is_not_source_bound_without_participant_payload_inspection',
    'kinect_face_model_is_an_sdk_face_model_output_and_raw_depth_surface_equivalence_is_not_source_bound',
    'exact_artifact_level_rgb_depth_face_pair_binding_is_not_publicly_bound',
    'dataset_terms_do_not_by_themselves_establish_biometric_product_validation_consent_scope',
  ] as const),
  nextEvidenceAction:
    'seek_non_participant_public_metadata_that_binds_exact_release_file_identity_checksum_and_face_schema_without_downloading_participant_payloads' as const,
}) satisfies FR300R2LPublicEvidenceReceipt & {
  readonly sourceBoundFindings: object;
};

export const FR300_R2L_UL_DD = Object.freeze({
  candidateId: 'ul_dd' as const,
  sourceUrls: Object.freeze([
    'https://www.nature.com/articles/s41597-025-06540-1',
    'https://zenodo.org/records/17978727',
  ] as const),
  sourceBoundFindings: Object.freeze({
    zed2DepthCameraDocumented: true as const,
    captureResolution:
      '1344x376' as const,
    captureFps: 60 as const,
    captureStoredAsMp4: true as const,
    publicReleaseSplitIntoLeftRightViews:
      true as const,
    releasedViewResize:
      '440x370' as const,
    commonTimelineSynchronizationDocumented:
      true as const,
    datasetFolderAndFileNamingSchemaDocumented:
      true as const,
    codeAndTutorialsReportedInSameZenodoRecord:
      true as const,
    videoFeatureExtractionCodeIncludes2d3dFacialLandmarks:
      true as const,
    zenodoRecordPublicMetadataAccessible:
      true as const,
    zenodoParticipantFilesRestricted:
      true as const,
    publicExactFileManifestObserved:
      false as const,
    publicExactFileChecksumObserved:
      false as const,
    exactReleasedDepthEncodingSourceBound:
      false as const,
    exactZedIntrinsicsSourceBound:
      false as const,
    exactStereoExtrinsicsSourceBound:
      false as const,
    exactSplitCropResizeTransformParametersSourceBound:
      false as const,
    extracted3dLandmarksEquivalentToRawMetricSurfaceTruthSourceBound:
      false as const,
  }),
  publicManifestObserved: false as const,
  publicSchemaObserved: true as const,
  exactFileChecksumObserved: false as const,
  rawSurfaceSemanticsSourceBound: false as const,
  exactCalibrationBundleObserved: false as const,
  exactReleaseTransformObserved: false as const,
  metricAuthorityAfterAudit:
    'M1_device_class_metric_capable' as const satisfies FR300R2KMetricAuthorityLevel,
  pairingAuthorityAfterAudit:
    'P1_same_session_or_timeline' as const satisfies FR300R2KPairingAuthorityLevel,
  geometryClass:
    'zed2_release_without_source_bound_raw_metric_surface' as const satisfies FR300R2LGeometryClass,
  accessRequestJustified: false as const,
  participantArtifactDownloadAuthorized: false as const,
  restrictedAccessRequestAuthorized: false as const,
  directFR299ReferenceEligible: false as const,
  blockers: Object.freeze([
    'public_record_does_not_expose_an_exact_released_participant_file_manifest_or_checksum',
    'released_mp4_depth_or_metric_geometry_encoding_semantics_are_not_source_bound',
    'zed_intrinsics_and_stereo_extrinsics_are_not_publicly_bound_to_the_released_artifact',
    'exact_left_right_split_crop_resize_transform_parameters_are_not_publicly_bound',
    'timeline_synchronization_does_not_establish_exact_spatial_correspondence',
    'public_sources_do_not_confirm_that_restricted_files_contain_the_calibration_bundle_required_for_fr299',
  ] as const),
  nextEvidenceAction:
    'continue_public_only_search_for_an_explicit_calibration_or_release_transform_manifest_before_any_restricted_access_request' as const,
}) satisfies FR300R2LPublicEvidenceReceipt & {
  readonly sourceBoundFindings: object;
};

export const FR300_R2L_RECEIPTS = Object.freeze([
  FR300_R2L_MINDS_LIBRAS,
  FR300_R2L_UL_DD,
] as const);

function assertR2LPredecessors(): void {
  assertFR300R2KAlternativeAuthorityFrontierContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2K_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R2K_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R2K_CURRENT_GATE.productMaterialization !== '18/29' ||
    FR300_R2K_MINDS_LIBRAS.metricAuthorityLevel !==
      'M2_exact_acquisition_export_metric_documented' ||
    FR300_R2K_MINDS_LIBRAS.pairingAuthorityLevel !==
      'P2_same_acquisition_with_cross_modal_mapping_documented' ||
    FR300_R2K_UL_DD.metricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    FR300_R2K_UL_DD.pairingAuthorityLevel !==
      'P1_same_session_or_timeline'
  ) {
    fail('R2K predecessor authority drift.');
  }
}

export function assertFR300R2LPublicArtifactCalibrationEvidenceContract(): void {
  assertR2LPredecessors();

  const minds = FR300_R2L_MINDS_LIBRAS;
  if (
    minds.publicManifestObserved ||
    !minds.publicSchemaObserved ||
    minds.exactFileChecksumObserved ||
    minds.rawSurfaceSemanticsSourceBound ||
    minds.exactCalibrationBundleObserved ||
    minds.exactReleaseTransformObserved ||
    minds.metricAuthorityAfterAudit !==
      FR300_R2K_MINDS_LIBRAS.metricAuthorityLevel ||
    minds.pairingAuthorityAfterAudit !==
      FR300_R2K_MINDS_LIBRAS.pairingAuthorityLevel ||
    minds.geometryClass !==
      'kinect_v2_hd_face_sdk_model_output_not_raw_depth_surface' ||
    minds.accessRequestJustified ||
    minds.participantArtifactDownloadAuthorized ||
    minds.restrictedAccessRequestAuthorized ||
    minds.directFR299ReferenceEligible
  ) {
    fail('MINDS public audit widened authority beyond observed evidence.');
  }

  const ul = FR300_R2L_UL_DD;
  if (
    ul.publicManifestObserved ||
    !ul.publicSchemaObserved ||
    ul.exactFileChecksumObserved ||
    ul.rawSurfaceSemanticsSourceBound ||
    ul.exactCalibrationBundleObserved ||
    ul.exactReleaseTransformObserved ||
    ul.metricAuthorityAfterAudit !==
      FR300_R2K_UL_DD.metricAuthorityLevel ||
    ul.pairingAuthorityAfterAudit !==
      FR300_R2K_UL_DD.pairingAuthorityLevel ||
    ul.geometryClass !==
      'zed2_release_without_source_bound_raw_metric_surface' ||
    ul.accessRequestJustified ||
    ul.participantArtifactDownloadAuthorized ||
    ul.restrictedAccessRequestAuthorized ||
    ul.directFR299ReferenceEligible
  ) {
    fail('UL-DD public audit widened authority beyond observed evidence.');
  }

  for (const receipt of FR300_R2L_RECEIPTS) {
    const blockers: readonly string[] = receipt.blockers;

    if (
      blockers.length === 0 ||
      receipt.participantArtifactDownloadAuthorized ||
      receipt.restrictedAccessRequestAuthorized ||
      receipt.directFR299ReferenceEligible
    ) {
      fail('R2L receipt must remain fail-closed.');
    }
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail('R2L must preserve Product 18/29.');
  }
}

export const FR300_R2L_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2l-public-artifact-calibration-evidence-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'public_artifact_calibration_audit_complete_no_authority_promotion' as const,
  mindsMetricAuthorityLevel:
    FR300_R2L_MINDS_LIBRAS.metricAuthorityAfterAudit,
  mindsPairingAuthorityLevel:
    FR300_R2L_MINDS_LIBRAS.pairingAuthorityAfterAudit,
  ulDdMetricAuthorityLevel:
    FR300_R2L_UL_DD.metricAuthorityAfterAudit,
  ulDdPairingAuthorityLevel:
    FR300_R2L_UL_DD.pairingAuthorityAfterAudit,
  mindsPublicManifestObserved:
    FR300_R2L_MINDS_LIBRAS.publicManifestObserved,
  ulDdPublicManifestObserved:
    FR300_R2L_UL_DD.publicManifestObserved,
  participantArtifactDownloaded: false as const,
  restrictedAccessRequested: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextAction:
    'retain_minds_m2_p2_and_ul_dd_m1_p1_until_exact_artifact_or_calibration_evidence_is_source_bound' as const,
  authority: Object.freeze({
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

assertFR300R2LPublicArtifactCalibrationEvidenceContract();
