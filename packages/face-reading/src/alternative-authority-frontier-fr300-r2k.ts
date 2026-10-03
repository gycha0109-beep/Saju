import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2J_CURRENT_GATE,
  assertFR300R2JFR299QualificationAdjudicatorContract,
} from './fr299-qualification-adjudicator-fr300-r2j.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2K_ALTERNATIVE_AUTHORITY_FRONTIER_CONTRACT_VERSION =
  'FR300-R2K-ALTERNATIVE-AUTHORITY-FRONTIER-v1' as const;

export type FR300R2KMetricAuthorityLevel =
  | 'M0_unknown'
  | 'M1_device_class_metric_capable'
  | 'M2_exact_acquisition_export_metric_documented'
  | 'M3_exact_artifact_scale_source_bound';

export type FR300R2KPairingAuthorityLevel =
  | 'P0_same_subject_only'
  | 'P1_same_session_or_timeline'
  | 'P2_same_acquisition_with_cross_modal_mapping_documented'
  | 'P3_exact_artifact_pair_binding';

export type FR300R2KRightsState =
  | 'open_license_distribution_but_biometric_product_consent_unresolved'
  | 'restricted_research_license_commercial_r_and_d_permitted_product_release_unresolved';

export interface FR300R2KAlternativeCandidate {
  readonly candidateId: 'minds_libras' | 'ul_dd';
  readonly sourceUrls: readonly string[];
  readonly rightsState: FR300R2KRightsState;
  readonly commercialRAndDPermittedByDatasetTerms: boolean;
  readonly publicRedistributionOfRestrictedParticipantDataPermitted: false;
  readonly participantConsentForBiometricProductValidationSourceBound: false;
  readonly metricAuthorityLevel: FR300R2KMetricAuthorityLevel;
  readonly pairingAuthorityLevel: FR300R2KPairingAuthorityLevel;
  readonly exactArtifactDigestBound: false;
  readonly exactArtifactMetricScaleBound: false;
  readonly exactArtifactPairBindingBound: false;
  readonly rawMetricFaceSurfaceReferenceSourceBound: boolean;
  readonly registrationWitnessUseful: boolean;
  readonly directFR299ReferenceEligible: false;
  readonly blockers: readonly string[];
  readonly allowedNextEvidenceAction: string;
  readonly restrictedArtifactAcquisitionAuthorizedByThisStage: false;
  readonly externalAccessRequestAuthorizedByThisStage: false;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2K ${message}`,
  );
}

export const FR300_R2K_MINDS_LIBRAS = Object.freeze({
  candidateId: 'minds_libras' as const,
  sourceUrls: Object.freeze([
    'https://minds.eng.ufmg.br/projects.php',
    'https://repositorio.ufmg.br/handle/1843/39785',
    'https://doi.org/10.5281/zenodo.4322984',
    'https://doi.org/10.5281/zenodo.2667329',
  ] as const),
  sourceBoundFacts: Object.freeze({
    institutionProjectDocumentsKinectV2RgbD: true as const,
    rgbFramesDocumented: true as const,
    depthFramesDocumented: true as const,
    perFrameFaceModelXYZPointCount: 1347 as const,
    faceModelReferenceFrame:
      'sensor_geometric_center' as const,
    faceModelCoordinateUnitDocumented:
      'meter' as const,
    colorFaceModelProjectsSameFaceModelIntoRgbFrame:
      true as const,
    depthFaceModelProjectsSameFaceModelIntoDepthFrame:
      true as const,
    perFrameTimeFieldDocumented: true as const,
    publicDistributionMetadataReportsCCBY4:
      true as const,
    rawDepthSurfaceArtifactBoundToFaceModelVertices:
      false as const,
    exactDownloadedArtifactDigestInspected:
      false as const,
    participantConsentForBiometricProductValidationSourceBound:
      false as const,
  }),
  rightsState:
    'open_license_distribution_but_biometric_product_consent_unresolved' as const,
  commercialRAndDPermittedByDatasetTerms: true as const,
  publicRedistributionOfRestrictedParticipantDataPermitted:
    false as const,
  participantConsentForBiometricProductValidationSourceBound:
    false as const,
  metricAuthorityLevel:
    'M2_exact_acquisition_export_metric_documented' as const satisfies FR300R2KMetricAuthorityLevel,
  pairingAuthorityLevel:
    'P2_same_acquisition_with_cross_modal_mapping_documented' as const satisfies FR300R2KPairingAuthorityLevel,
  exactArtifactDigestBound: false as const,
  exactArtifactMetricScaleBound: false as const,
  exactArtifactPairBindingBound: false as const,
  rawMetricFaceSurfaceReferenceSourceBound: false as const,
  registrationWitnessUseful: true as const,
  directFR299ReferenceEligible: false as const,
  blockers: Object.freeze([
    'exact_downloaded_artifact_digest_not_bound_to_meter_scale_schema',
    'face_model_geometry_is_documented_separately_from_raw_depth_frames_and_raw_surface_equivalence_is_not_source_bound',
    'exact_artifact_pair_binding_not_yet_inspected',
    'dataset_license_does_not_by_itself_prove_participant_consent_scope_for_biometric_product_validation',
  ] as const),
  allowedNextEvidenceAction:
    'inspect_public_zenodo_file_manifest_schema_and_license_without_promoting_face_model_geometry_to_raw_fr299_reference' as const,
  restrictedArtifactAcquisitionAuthorizedByThisStage:
    false as const,
  externalAccessRequestAuthorizedByThisStage:
    false as const,
}) satisfies FR300R2KAlternativeCandidate & {
  readonly sourceBoundFacts: object;
};

export const FR300_R2K_UL_DD = Object.freeze({
  candidateId: 'ul_dd' as const,
  sourceUrls: Object.freeze([
    'https://www.nature.com/articles/s41597-025-06540-1',
    'https://doi.org/10.5281/zenodo.17978727',
  ] as const),
  sourceBoundFacts: Object.freeze({
    zed2DepthCameraDocumented: true as const,
    zed2CaptureResolutionDocumented:
      '1344x376' as const,
    zed2CaptureFpsDocumented: 60 as const,
    releaseStoredAsMp4: true as const,
    releaseSplitIntoLeftAndRightViews:
      true as const,
    releasedViewResizeDocumented:
      '440x370' as const,
    commonTimelineSynchronizationDocumented:
      true as const,
    exactReleasedDepthValuesSourceBound:
      false as const,
    exactReleasedCameraIntrinsicsSourceBound:
      false as const,
    exactReleasedStereoExtrinsicsSourceBound:
      false as const,
    exactSplitCropResizeTransformParametersSourceBound:
      false as const,
    restrictedAccessRequired: true as const,
    institutionalOrCorporateRAndDEmailRequired:
      true as const,
    commercialRAndDExplicitlyPermitted:
      true as const,
    datasetRedistributionProhibited:
      true as const,
    advertisingUseProhibited: true as const,
  }),
  rightsState:
    'restricted_research_license_commercial_r_and_d_permitted_product_release_unresolved' as const,
  commercialRAndDPermittedByDatasetTerms: true as const,
  publicRedistributionOfRestrictedParticipantDataPermitted:
    false as const,
  participantConsentForBiometricProductValidationSourceBound:
    false as const,
  metricAuthorityLevel:
    'M1_device_class_metric_capable' as const satisfies FR300R2KMetricAuthorityLevel,
  pairingAuthorityLevel:
    'P1_same_session_or_timeline' as const satisfies FR300R2KPairingAuthorityLevel,
  exactArtifactDigestBound: false as const,
  exactArtifactMetricScaleBound: false as const,
  exactArtifactPairBindingBound: false as const,
  rawMetricFaceSurfaceReferenceSourceBound: false as const,
  registrationWitnessUseful: true as const,
  directFR299ReferenceEligible: false as const,
  blockers: Object.freeze([
    'released_mp4_depth_or_metric_geometry_semantics_not_source_bound',
    'exact_intrinsics_and_stereo_extrinsics_not_bound_to_released_artifact',
    'exact_split_crop_resize_transform_chain_not_source_bound',
    'timeline_synchronization_does_not_substitute_exact_spatial_correspondence',
    'research_license_permits_commercial_r_and_d_but_does_not_authorize_public_product_data_redistribution',
  ] as const),
  allowedNextEvidenceAction:
    'inspect_public_release_code_and_metadata_for_exact_zed_calibration_and_release_transform_evidence_before_any_restricted_access_request' as const,
  restrictedArtifactAcquisitionAuthorizedByThisStage:
    false as const,
  externalAccessRequestAuthorizedByThisStage:
    false as const,
}) satisfies FR300R2KAlternativeCandidate & {
  readonly sourceBoundFacts: object;
};

export const FR300_R2K_CANDIDATES = Object.freeze([
  FR300_R2K_MINDS_LIBRAS,
  FR300_R2K_UL_DD,
] as const);

function assertR2KPredecessors(): void {
  assertFR300R2JFR299QualificationAdjudicatorContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2J_CURRENT_GATE.disposition !==
      'fr299_adjudicator_ready_real_evidence_not_eligible' ||
    FR300_R2J_CURRENT_GATE.providerResponseState !==
      'pending' ||
    FR300_R2J_CURRENT_GATE.realFR299CandidateEligible ||
    FR300_R2J_CURRENT_GATE.fr299EligibleCandidateCount !== 0
  ) {
    fail('R2J predecessor authority drift.');
  }
}

export function assertFR300R2KAlternativeAuthorityFrontierContract(): void {
  assertR2KPredecessors();

  const minds = FR300_R2K_MINDS_LIBRAS;
  if (
    !minds.sourceBoundFacts.institutionProjectDocumentsKinectV2RgbD ||
    !minds.sourceBoundFacts.rgbFramesDocumented ||
    !minds.sourceBoundFacts.depthFramesDocumented ||
    minds.sourceBoundFacts.perFrameFaceModelXYZPointCount !== 1347 ||
    minds.sourceBoundFacts.faceModelReferenceFrame !==
      'sensor_geometric_center' ||
    minds.sourceBoundFacts.faceModelCoordinateUnitDocumented !==
      'meter' ||
    !minds.sourceBoundFacts
      .colorFaceModelProjectsSameFaceModelIntoRgbFrame ||
    !minds.sourceBoundFacts
      .depthFaceModelProjectsSameFaceModelIntoDepthFrame ||
    minds.metricAuthorityLevel !==
      'M2_exact_acquisition_export_metric_documented' ||
    minds.pairingAuthorityLevel !==
      'P2_same_acquisition_with_cross_modal_mapping_documented' ||
    minds.exactArtifactMetricScaleBound ||
    minds.exactArtifactPairBindingBound ||
    minds.rawMetricFaceSurfaceReferenceSourceBound ||
    !minds.registrationWitnessUseful ||
    minds.directFR299ReferenceEligible
  ) {
    fail('MINDS-Libras authority frontier widened beyond source-bound evidence.');
  }

  const ul = FR300_R2K_UL_DD;
  if (
    !ul.sourceBoundFacts.zed2DepthCameraDocumented ||
    !ul.sourceBoundFacts.releaseStoredAsMp4 ||
    !ul.sourceBoundFacts.releaseSplitIntoLeftAndRightViews ||
    !ul.sourceBoundFacts.commonTimelineSynchronizationDocumented ||
    ul.sourceBoundFacts.exactReleasedDepthValuesSourceBound ||
    ul.sourceBoundFacts.exactReleasedCameraIntrinsicsSourceBound ||
    ul.sourceBoundFacts.exactReleasedStereoExtrinsicsSourceBound ||
    ul.sourceBoundFacts
      .exactSplitCropResizeTransformParametersSourceBound ||
    !ul.sourceBoundFacts.commercialRAndDExplicitlyPermitted ||
    !ul.sourceBoundFacts.datasetRedistributionProhibited ||
    ul.metricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    ul.pairingAuthorityLevel !==
      'P1_same_session_or_timeline' ||
    ul.exactArtifactMetricScaleBound ||
    ul.exactArtifactPairBindingBound ||
    ul.rawMetricFaceSurfaceReferenceSourceBound ||
    !ul.registrationWitnessUseful ||
    ul.directFR299ReferenceEligible
  ) {
    fail('UL-DD authority frontier widened beyond source-bound evidence.');
  }

  for (const candidate of FR300_R2K_CANDIDATES) {
    if (
      candidate.restrictedArtifactAcquisitionAuthorizedByThisStage ||
      candidate.externalAccessRequestAuthorizedByThisStage ||
      candidate.directFR299ReferenceEligible ||
      candidate.exactArtifactDigestBound ||
      candidate.participantConsentForBiometricProductValidationSourceBound
    ) {
      fail('R2K may not issue acquisition, exact-artifact, FR299, or product-consent authority.');
    }
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail('R2K must preserve Product 18/29.');
  }
}

export const FR300_R2K_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2k-alternative-authority-frontier-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'alternative_authority_frontier_resolved_no_direct_fr299_replacement' as const,
  providerResponseState: 'pending' as const,
  mindsMetricAuthorityLevel:
    FR300_R2K_MINDS_LIBRAS.metricAuthorityLevel,
  mindsPairingAuthorityLevel:
    FR300_R2K_MINDS_LIBRAS.pairingAuthorityLevel,
  ulDdMetricAuthorityLevel:
    FR300_R2K_UL_DD.metricAuthorityLevel,
  ulDdPairingAuthorityLevel:
    FR300_R2K_UL_DD.pairingAuthorityLevel,
  mindsDirectFR299ReferenceEligible: false as const,
  ulDdDirectFR299ReferenceEligible: false as const,
  publicEvidenceResearchOnly: true as const,
  participantArtifactDownloaded: false as const,
  restrictedAccessRequested: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextAction:
    'inspect_minds_public_manifest_and_ul_dd_public_calibration_metadata_without_participant_artifact_acquisition' as const,
  authority: Object.freeze({
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

assertFR300R2KAlternativeAuthorityFrontierContract();
