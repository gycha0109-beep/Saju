import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  assertFR299Independent3DNoseReferenceBundleContract,
} from './independent-3d-nose-reference-bundle-fr299.js';
import {
  FR300_R1U_ZC_AST_ADJUDICATION,
  FR300_R1U_ZC_CURRENT_GATE,
  assertFR300R1UZCASTPublicMetricContract,
} from './ast-face-public-metric-qualification-fr300-r1u-zc.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1V_ZC_AST_CONTROLLED_PREFLIGHT_CONTRACT_VERSION =
  'FR300-R1V-ZC-AST-CONTROLLED-PREFLIGHT-v1' as const;

export const FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS = Object.freeze({
  datasetDoi: '10.17605/OSF.IO/XK4F6' as const,
  paperDoi: '10.1038/s41597-026-07098-2' as const,
  controlledRawFormat: 'OBJ' as const,
  rawScansAreOriginalPreTopologyStandardizationGeometry: true as const,
  structuredLightCaptureDocumented: true as const,
  synchronizedRgbConsentingParticipantCount: 52 as const,
  synchronizedRgbViews: Object.freeze([
    'frontal',
    'left',
    'right',
  ] as const),
  synchronizedRgbCaptureDocumented: true as const,
  scannerAndRgbRigsUseStandardizedPositionsAndAngles: true as const,
  exactScannerModel: 'not_source_bound' as const,
  exactScannerCalibration: 'not_source_bound' as const,
  exactScannerAccuracy: 'not_source_bound' as const,
  rawObjPhysicalCoordinateUnit: 'not_source_bound' as const,
  rawObjExportScaleSemantics: 'not_source_bound' as const,
  exactScannerToRgbExtrinsics: 'not_source_bound' as const,
  exactPerCapture3dRgbRegistrationReceipt: 'not_source_bound' as const,
});

export const FR300_R1V_ZC_AST_DUA_PREFLIGHT = Object.freeze({
  githubMirrorBlobSha:
    '5ab05af1b97cf6f1728e6c4a363414e804a650d7' as const,
  githubMirrorInspected: true as const,
  osfHostedDuaDeclaredAuthoritativeByOfficialRepository: true as const,
  osfAuthoritativeDuaByteVerifiedAgainstMirror: false as const,
  controlledScopeIncludesRaw3dScans: true as const,
  controlledScopeIncludesConsentedTexturesAndSynchronizedRgb: true as const,
  industrialResearchAndDevelopment:
    'permitted_for_internal_analysis_and_evaluation_on_inspected_mirror' as const,
  academicResearchAndDevelopment:
    'permitted_for_internal_analysis_and_evaluation_on_inspected_mirror' as const,
  broadProductionRuntimeReuse:
    'not_established_by_internal_analysis_and_evaluation_permission' as const,
  biometricIdentificationPermitted: false as const,
  biometricVerificationPermitted: false as const,
  surveillancePermitted: false as const,
  identityProfilingPermitted: false as const,
  identityRecognitionTrainingOrEvaluationPermitted: false as const,
  controlledFileRedistributionPermitted: false as const,
  identifiableDerivativeRedistributionPermitted: false as const,
  nonIdentifyingAggregateOutputsPermitted: true as const,
  secureStorageRequired: true as const,
  deletionWhenNoLongerNeededOrProviderRequests: true as const,
});

export const FR300_R1V_ZC_AST_FR299_GAP = Object.freeze({
  metricScaleVerified: false as const,
  metricScaleVerificationBlocker:
    'exact_raw_obj_physical_unit_and_export_scale_not_source_bound' as const,
  synchronizedRgbExistsForConsentingSubset: true as const,
  sameCaptureBindingEstablishedForFR299: false as const,
  validatedRegistrationBindingEstablishedForFR299: false as const,
  correspondenceVerifiedForFR299: false as const,
  rgbCorrespondenceBlocker:
    'synchronization_and_standardized_rig_geometry_do_not_substitute_exact_artifact_binding_or_validated_registration_receipt' as const,
  providerLandmarksMayIssueFR266Truth: false as const,
  providerLandmarksMayIssueFR297Truth: false as const,
  publicStandardizedMeshMaySubstituteControlledRawMetricGeometry:
    false as const,
  genericStructuredLightCaptureMaySubstituteExactMetricUnitAuthority:
    false as const,
});

export const FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION = Object.freeze({
  disposition: 'hold_external_authority' as const,
  controlledPathTerminalReject: false as const,
  rightsGate:
    'bounded_internal_industrial_r_and_d_permitted_on_inspected_mirror_authoritative_osf_version_not_byte_verified' as const,
  metricGate:
    'hold_exact_raw_physical_unit_calibration_accuracy_and_export_scale_not_source_bound' as const,
  rgbGate:
    'hold_exact_fr299_correspondence_receipt_not_source_bound' as const,
  providerIndependentAnnotationGate:
    'provider_landmarks_never_issue_fr266_or_fr297_truth' as const,
  reopenConditions: Object.freeze([
    'authoritative_osf_dua_version_is_confirmed_for_the_intended_internal_validation_use',
    'exact_raw_obj_physical_unit_or_equivalent_metric_scale_authority_is_source_bound',
    'scanner_or_export_documentation_binds_metric_scale_to_the_exact_controlled_raw_artifact',
    'exact_subject_capture_level_3d_rgb_binding_or_validated_registration_receipt_is_available',
    'controlled_access_is_separately_authorized_before_any_subject_artifact_is_requested_or_downloaded',
  ] as const),
  nextFrontierWithoutNewExternalAuthorization:
    'fr300_r1w_zc_existing_hardware_metric_reference_feasibility' as const,
});

export const FR300_R1V_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1v-zc-ast-controlled-preflight-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  publicOnlyPreflightCompleted: true as const,
  controlledDataAccessRequested: false as const,
  controlledDataAccessAuthorizedByThisTrack: false as const,
  duaSigned: false as const,
  duaSent: false as const,
  externalContactPerformed: false as const,
  controlledSubjectArtifactDownloaded: false as const,
  controlledSubjectArtifactInspected: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  authority: Object.freeze({
    astPublicStandardizedMeshMetricReferenceAuthorized: false as const,
    astControlledRawMetricReferenceAuthorized: false as const,
    fr299SourceMetricScaleVerified: false as const,
    fr299RgbCorrespondenceVerified: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1V-ZC ${message}`);
}

export function assertFR300R1VZCASTControlledPreflightContract(): void {
  assertFR300R1UZCASTPublicMetricContract();
  assertFR299Independent3DNoseReferenceBundleContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R1U_ZC_AST_ADJUDICATION.publicTierDisposition !==
      'terminal_reject_public_standardized_mesh_as_fr299_metric_source' ||
    FR300_R1U_ZC_AST_ADJUDICATION.wholeCandidateTerminalReject ||
    FR300_R1U_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0
  ) {
    fail('R1U-ZC public-vs-controlled predecessor authority drift.');
  }

  if (
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1'
  ) {
    fail('FR299 independent 3D reference contract drift.');
  }

  const rights = FR300_R1V_ZC_AST_DUA_PREFLIGHT;
  if (
    !rights.githubMirrorInspected ||
    !rights.osfHostedDuaDeclaredAuthoritativeByOfficialRepository ||
    rights.osfAuthoritativeDuaByteVerifiedAgainstMirror ||
    rights.industrialResearchAndDevelopment !==
      'permitted_for_internal_analysis_and_evaluation_on_inspected_mirror' ||
    rights.broadProductionRuntimeReuse !==
      'not_established_by_internal_analysis_and_evaluation_permission' ||
    rights.biometricIdentificationPermitted ||
    rights.biometricVerificationPermitted ||
    rights.surveillancePermitted ||
    rights.identityProfilingPermitted ||
    rights.identityRecognitionTrainingOrEvaluationPermitted ||
    rights.controlledFileRedistributionPermitted ||
    rights.identifiableDerivativeRedistributionPermitted
  ) {
    fail('AST-Face controlled DUA boundary drift.');
  }

  const source = FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS;
  if (
    !source.rawScansAreOriginalPreTopologyStandardizationGeometry ||
    !source.structuredLightCaptureDocumented ||
    !source.synchronizedRgbCaptureDocumented ||
    source.synchronizedRgbConsentingParticipantCount !== 52 ||
    source.exactScannerModel !== 'not_source_bound' ||
    source.exactScannerCalibration !== 'not_source_bound' ||
    source.exactScannerAccuracy !== 'not_source_bound' ||
    source.rawObjPhysicalCoordinateUnit !== 'not_source_bound' ||
    source.rawObjExportScaleSemantics !== 'not_source_bound' ||
    source.exactScannerToRgbExtrinsics !== 'not_source_bound' ||
    source.exactPerCapture3dRgbRegistrationReceipt !== 'not_source_bound'
  ) {
    fail('controlled raw metric or RGB source-binding boundary drift.');
  }

  const gap = FR300_R1V_ZC_AST_FR299_GAP;
  if (
    gap.metricScaleVerified ||
    gap.sameCaptureBindingEstablishedForFR299 ||
    gap.validatedRegistrationBindingEstablishedForFR299 ||
    gap.correspondenceVerifiedForFR299 ||
    gap.providerLandmarksMayIssueFR266Truth ||
    gap.providerLandmarksMayIssueFR297Truth ||
    gap.publicStandardizedMeshMaySubstituteControlledRawMetricGeometry ||
    gap.genericStructuredLightCaptureMaySubstituteExactMetricUnitAuthority
  ) {
    fail('FR299 gap was improperly promoted.');
  }

  if (
    FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION.disposition !==
      'hold_external_authority' ||
    FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION.controlledPathTerminalReject ||
    FR300_R1V_ZC_CURRENT_GATE.controlledDataAccessRequested ||
    FR300_R1V_ZC_CURRENT_GATE.controlledDataAccessAuthorizedByThisTrack ||
    FR300_R1V_ZC_CURRENT_GATE.duaSigned ||
    FR300_R1V_ZC_CURRENT_GATE.duaSent ||
    FR300_R1V_ZC_CURRENT_GATE.externalContactPerformed ||
    FR300_R1V_ZC_CURRENT_GATE.controlledSubjectArtifactDownloaded ||
    FR300_R1V_ZC_CURRENT_GATE.controlledSubjectArtifactInspected ||
    FR300_R1V_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1V_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1V_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1V_ZC_CURRENT_GATE.authority.astControlledRawMetricReferenceAuthorized ||
    FR300_R1V_ZC_CURRENT_GATE.authority.fr299SourceMetricScaleVerified ||
    FR300_R1V_ZC_CURRENT_GATE.authority.fr299RgbCorrespondenceVerified ||
    FR300_R1V_ZC_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1V_ZC_CURRENT_GATE.authority.fr300R2Authorized ||
    FR300_R1V_ZC_CURRENT_GATE.authority.productColumnMaterialized ||
    FR300_R1V_ZC_CURRENT_GATE.authority.productionActivated ||
    FR300_R1V_ZC_CURRENT_GATE.authority.commerceActivated
  ) {
    fail('controlled preflight widened operational or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    FR300_R1V_ZC_CURRENT_GATE.productMaterialization !== '18/29'
  ) {
    fail('R1V-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1VZCASTControlledPreflightContract();
