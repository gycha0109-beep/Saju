import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS,
  FR300_R1V_ZC_AST_DUA_PREFLIGHT,
  assertFR300R1VZCASTControlledPreflightContract,
} from './ast-face-controlled-preflight-fr300-r1v-zc.js';
import {
  FR300_R2A_QG_AST_FACE_CONTROLLED,
  FR300_R2A_QG_CURRENT_GATE,
  FR300_R2A_QG_FIRST_REFERENCE_ACQUISITION_QUALIFICATION_CONTRACT_VERSION,
  assertFR300R2AQGFirstReferenceAcquisitionQualificationContract,
} from './first-fr299-reference-acquisition-qualification-fr300-r2a-qg.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2B_PAR_AST_PUBLIC_AUTHORITY_RESOLUTION_CONTRACT_VERSION =
  'FR300-R2B-PAR-AST-PUBLIC-AUTHORITY-RESOLUTION-v1' as const;

export type FR300R2BPARMetricAuthorityLevel =
  | 'M0_unknown'
  | 'M1_device_class_metric_capable'
  | 'M2_exact_acquisition_export_metric_documented'
  | 'M3_exact_ast_raw_artifact_scale_source_bound';

export type FR300R2BPARPairingAuthorityLevel =
  | 'P0_same_subject_only'
  | 'P1_same_session'
  | 'P2_same_neutral_acquisition_condition'
  | 'P3_exact_controlled_artifact_pair_binding';

export type FR300R2BPARAuthorityResolutionState =
  | 'resolved'
  | 'public_evidence_exhausted'
  | 'promising_unverified'
  | 'blocked'
  | 'terminal_reject';

export const FR300_R2B_PAR_OFFICIAL_SOURCES = Object.freeze({
  paper:
    'https://doi.org/10.1038/s41597-026-07098-2' as const,
  osf:
    'https://doi.org/10.17605/OSF.IO/XK4F6' as const,
  repository:
    'https://github.com/zhaopu99/AST-face' as const,
  icpScript:
    'https://github.com/zhaopu99/AST-face/blob/main/ASTFace%20Pipline/01_icp.py' as const,
  flameFittingUpstream:
    'https://github.com/Rubikplayer/flame-fitting' as const,
});

export const FR300_R2B_PAR_PUBLIC_SEARCH_RECEIPT = Object.freeze({
  paperMainTextInspected: true as const,
  officialRepositoryReadmeInspected: true as const,
  officialRepositoryTreeInspected: true as const,
  officialPipelineStep01Inspected: true as const,
  officialPipelineStep03ReadmeInspected: true as const,
  officialPipelineOverviewInspected: true as const,
  githubDuaMirrorMetadataInspected: true as const,
  osfProjectDeclaredAuthoritativeByOfficialRepository: true as const,
  osfAuthoritativeDuaBytesInspectedByThisStage: false as const,
  publicScannerModelSourceFound: false as const,
  publicScannerCalibrationSourceFound: false as const,
  publicRawObjUnitSourceFound: false as const,
  publicRawObjExportScaleSourceFound: false as const,
  publicControlledArtifactManifestFound: false as const,
  publicScannerRgbExtrinsicsFound: false as const,
  publicExactPerFileRgbRawScanPairingReceiptFound: false as const,
  publicSearchExhaustedForCurrentThreeQuestions: true as const,
});

export const FR300_R2B_PAR_DUA_AUTHORITY = Object.freeze({
  githubMirrorBlobSha:
    '5ab05af1b97cf6f1728e6c4a363414e804a650d7' as const,
  githubMirrorPreviouslyInspected: true as const,
  osfHostedDuaDeclaredAuthoritative: true as const,
  authoritativeBytesInspectedByThisStage: false as const,
  byteIdentityVerified: false as const,
  semanticEquivalenceVerified: false as const,
  inspectedMirrorIndustrialRAndD:
    'bounded_internal_analysis_and_evaluation_permitted' as const,
  inspectedMirrorBiometricIdentificationPermitted: false as const,
  inspectedMirrorBiometricVerificationPermitted: false as const,
  inspectedMirrorSurveillancePermitted: false as const,
  inspectedMirrorControlledRedistributionPermitted: false as const,
  inspectedMirrorNonIdentifyingAggregateOutputsPermitted: true as const,
  authoritativeRightsGateResolved: false as const,
  state: 'public_evidence_exhausted' as const satisfies FR300R2BPARAuthorityResolutionState,
  blocker:
    'official_repository_declares_osf_dua_authoritative_but_exact_osf_bytes_or_semantic_equivalence_are_not_publicly_verified_in_this_stage' as const,
});

export const FR300_R2B_PAR_METRIC_SCALE_AUTHORITY = Object.freeze({
  structuredLightAcquisitionDocumented: true as const,
  highPrecision3DFaceScannerDocumented: true as const,
  exactScannerMakeModelSourceBound: false as const,
  exactScannerCalibrationSourceBound: false as const,
  exactScannerAccuracySourceBound: false as const,
  rawControlledScansArePreTopologyStandardization: true as const,
  rawControlledFormat: 'OBJ' as const,
  rawObjPhysicalUnit:
    'unknown_not_source_bound' as const,
  rawObjExportScaleSemantics:
    'unknown_not_source_bound' as const,
  astStep01NormalizesSourceToUnitSphere: true as const,
  astStep01NormalizesTargetToUnitSphere: true as const,
  astStep01DenormalizesOutputIntoTargetScale: true as const,
  astStep01MayEstimateSimilarityScale: true as const,
  publicProcessedMeshMayProveRawMetricScale: false as const,
  upstreamFlameDefaultScanUnitMayProveAstRawUnit: false as const,
  metricAuthorityLevel:
    'M1_device_class_metric_capable' as const satisfies FR300R2BPARMetricAuthorityLevel,
  m2Established: false as const,
  m3Established: false as const,
  fr299MetricScaleVerified: false as const,
  state: 'public_evidence_exhausted' as const satisfies FR300R2BPARAuthorityResolutionState,
  blocker:
    'no_public_ast_source_binds_exact_scanner_export_pipeline_physical_unit_or_scale_to_the_controlled_raw_obj_artifact' as const,
});

export const FR300_R2B_PAR_PAIRING_AUTHORITY = Object.freeze({
  neutralBaseline3DScanDocumented: true as const,
  neutralBaselineSynchronizedMultiViewRgbDocumented: true as const,
  frontalRgbDocumented: true as const,
  leftRgbDocumented: true as const,
  rightRgbDocumented: true as const,
  threeRgbViewsSimultaneous: true as const,
  scannerAndRgbRigsStandardizedPositionsAndAngles: true as const,
  paperClaimsSpatialAlignmentAcrossModalities: true as const,
  unifiedFileNamingDocumented: true as const,
  controlledArtifactNamesPubliclyExposed: false as const,
  controlledManifestPubliclyExposed: false as const,
  scannerToRgbExtrinsicsPubliclySourceBound: false as const,
  exactPerFileCaptureBindingPubliclySourceBound: false as const,
  temporalSynchronizationMaySubstituteSpatialCorrespondence:
    false as const,
  sameSubjectMaySubstituteExactCaptureBinding: false as const,
  pairingAuthorityLevel:
    'P2_same_neutral_acquisition_condition' as const satisfies FR300R2BPARPairingAuthorityLevel,
  p3Established: false as const,
  fr299SameCaptureBindingEstablished: false as const,
  fr299ValidatedRegistrationBindingEstablished: false as const,
  fr299CorrespondenceVerified: false as const,
  state: 'public_evidence_exhausted' as const satisfies FR300R2BPARAuthorityResolutionState,
  blocker:
    'public_sources_establish_synchronized_neutral_multimodal_acquisition_but_not_exact_controlled_file_pair_binding_or_validated_registration_receipt' as const,
});

export const FR300_R2B_PAR_REGISTRATION_FEASIBILITY = Object.freeze({
  standardizedCrossModalRigGeometryDocumented: true as const,
  exactExtrinsicsAvailablePublicly: false as const,
  exactControlledArtifactsAvailablePublicly: false as const,
  candidateIndependentRegistrationConceptuallyFeasible: true as const,
  registrationExecuted: false as const,
  registrationValidated: false as const,
  state: 'promising_unverified' as const satisfies FR300R2BPARAuthorityResolutionState,
  nextEvidenceNeeded:
    'controlled_artifact_metadata_or_candidate_independent_post_acquisition_registration_receipt' as const,
});

export const FR300_R2B_PAR_MINIMUM_PILOT_INTAKE_CONTRACT =
  Object.freeze({
    subjectCountGoal: 'minimum_supported_pilot_subset' as const,
    requiredArtifacts: Object.freeze([
      'neutral_raw_3d_obj',
      'corresponding_frontal_rgb',
      'subject_capture_manifest_or_equivalent_pairing_metadata',
      'scanner_export_unit_or_metric_scale_metadata',
    ] as const),
    optionalArtifacts: Object.freeze([
      'left_rgb',
      'right_rgb',
      'scanner_rgb_extrinsics',
      'textured_neutral_mesh',
    ] as const),
    rawArtifactsMayEnterGit: false as const,
    rawArtifactsMayEnterGitLfs: false as const,
    persistedRepositoryArtifacts: Object.freeze([
      'opaque_artifact_ref',
      'sha256_digest',
      'derived_scalar_receipt',
      'registration_receipt',
      'aggregate_benchmark_metric',
    ] as const),
    providerLandmarksMayIssueFR266Truth: false as const,
    providerLandmarksMayIssueFR297Truth: false as const,
  });

export const FR300_R2B_PAR_ACCESS_READINESS = Object.freeze({
  scientificallyPromising: true as const,
  controlledIntakeMayResolveRemainingTechnicalAuthority:
    true as const,
  controlledAccessScientificallyJustifiedNow: false as const,
  controlledAccessOperationallyAuthorized: false as const,
  reasonNotScientificallyJustifiedNow:
    'authoritative_dua_terms_remain_unverified_and_fr299_metric_m3_pairing_p3_are_not_publicly_closed' as const,
  conditionForScientificJustification: Object.freeze([
    'authoritative_osf_dua_terms_reviewed_for_intended_internal_product_r_and_d_validation',
    'remaining_metric_or_pairing_gap_is_reasonably_resolvable_from_controlled_metadata_or_minimum_pilot_artifacts',
  ] as const),
});

export const FR300_R2B_PAR_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2b-par-ast-public-authority-resolution-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'public_authority_exhausted_controlled_intake_may_resolve' as const,
  publicAuthorityResolutionCompleted: true as const,
  duaAuthorityState:
    FR300_R2B_PAR_DUA_AUTHORITY.state,
  metricAuthorityLevel:
    FR300_R2B_PAR_METRIC_SCALE_AUTHORITY.metricAuthorityLevel,
  pairingAuthorityLevel:
    FR300_R2B_PAR_PAIRING_AUTHORITY.pairingAuthorityLevel,
  scientificallyPromising: true as const,
  controlledIntakeMayResolveRemainingTechnicalAuthority:
    true as const,
  controlledAccessScientificallyJustifiedNow: false as const,
  controlledAccessOperationallyAuthorized: false as const,
  osfAccountCreatedByThisStage: false as const,
  controlledAccessRequested: false as const,
  duaSigned: false as const,
  duaSubmitted: false as const,
  externalContactAuthorized: false as const,
  externalContactPerformed: false as const,
  controlledParticipantArtifactDownloaded: false as const,
  controlledParticipantArtifactInspected: false as const,
  rawFaceArtifactCommittedToGit: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionWithoutNewExternalAuthorization:
    'review_authoritative_osf_dua_if_obtainable_without_submission_otherwise_hold_until_explicit_controlled_access_authorization' as const,
  authority: Object.freeze({
    astRawMetricReferenceAuthorized: false as const,
    fr299MetricScaleVerified: false as const,
    fr299CorrespondenceVerified: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2B-PAR ${message}`,
  );
}

export function assertFR300R2BPARAstPublicAuthorityResolutionContract(): void {
  assertFR300R2AQGFirstReferenceAcquisitionQualificationContract();
  assertFR300R1VZCASTControlledPreflightContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2A_QG_FIRST_REFERENCE_ACQUISITION_QUALIFICATION_CONTRACT_VERSION !==
      'FR300-R2A-QG-FIRST-REFERENCE-ACQUISITION-QUALIFICATION-v1' ||
    FR300_R2A_QG_CURRENT_GATE.disposition !==
      'all_candidates_hold_before_acquisition_authorization' ||
    FR300_R2A_QG_CURRENT_GATE.preferredPublicAuthorityFrontier !==
      'ast_face_controlled_metric_scale_and_exact_pairing_authority' ||
    FR300_R2A_QG_AST_FACE_CONTROLLED.acquisitionReady
  ) {
    fail('R2A-QG AST handoff drift.');
  }

  if (
    FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS
      .rawObjPhysicalCoordinateUnit !== 'not_source_bound' ||
    FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS
      .rawObjExportScaleSemantics !== 'not_source_bound' ||
    FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS
      .exactScannerToRgbExtrinsics !== 'not_source_bound' ||
    FR300_R1V_ZC_AST_DUA_PREFLIGHT
      .osfAuthoritativeDuaByteVerifiedAgainstMirror
  ) {
    fail('R1V source-bound gap was improperly widened.');
  }

  const search = FR300_R2B_PAR_PUBLIC_SEARCH_RECEIPT;
  if (
    !search.paperMainTextInspected ||
    !search.officialRepositoryReadmeInspected ||
    !search.officialRepositoryTreeInspected ||
    !search.officialPipelineStep01Inspected ||
    !search.officialPipelineStep03ReadmeInspected ||
    !search.officialPipelineOverviewInspected ||
    !search.githubDuaMirrorMetadataInspected ||
    !search.osfProjectDeclaredAuthoritativeByOfficialRepository ||
    search.osfAuthoritativeDuaBytesInspectedByThisStage ||
    search.publicScannerModelSourceFound ||
    search.publicScannerCalibrationSourceFound ||
    search.publicRawObjUnitSourceFound ||
    search.publicRawObjExportScaleSourceFound ||
    search.publicControlledArtifactManifestFound ||
    search.publicScannerRgbExtrinsicsFound ||
    search.publicExactPerFileRgbRawScanPairingReceiptFound ||
    !search.publicSearchExhaustedForCurrentThreeQuestions
  ) {
    fail('public search receipt drift.');
  }

  const dua = FR300_R2B_PAR_DUA_AUTHORITY;
  if (
    !dua.githubMirrorPreviouslyInspected ||
    !dua.osfHostedDuaDeclaredAuthoritative ||
    dua.authoritativeBytesInspectedByThisStage ||
    dua.byteIdentityVerified ||
    dua.semanticEquivalenceVerified ||
    dua.authoritativeRightsGateResolved ||
    dua.inspectedMirrorBiometricIdentificationPermitted ||
    dua.inspectedMirrorBiometricVerificationPermitted ||
    dua.inspectedMirrorSurveillancePermitted ||
    dua.inspectedMirrorControlledRedistributionPermitted ||
    !dua.inspectedMirrorNonIdentifyingAggregateOutputsPermitted ||
    dua.state !== 'public_evidence_exhausted'
  ) {
    fail('DUA authority was improperly promoted.');
  }

  const metric = FR300_R2B_PAR_METRIC_SCALE_AUTHORITY;
  if (
    !metric.structuredLightAcquisitionDocumented ||
    !metric.highPrecision3DFaceScannerDocumented ||
    metric.exactScannerMakeModelSourceBound ||
    metric.exactScannerCalibrationSourceBound ||
    metric.exactScannerAccuracySourceBound ||
    !metric.rawControlledScansArePreTopologyStandardization ||
    metric.rawControlledFormat !== 'OBJ' ||
    metric.rawObjPhysicalUnit !== 'unknown_not_source_bound' ||
    metric.rawObjExportScaleSemantics !==
      'unknown_not_source_bound' ||
    !metric.astStep01NormalizesSourceToUnitSphere ||
    !metric.astStep01NormalizesTargetToUnitSphere ||
    !metric.astStep01DenormalizesOutputIntoTargetScale ||
    !metric.astStep01MayEstimateSimilarityScale ||
    metric.publicProcessedMeshMayProveRawMetricScale ||
    metric.upstreamFlameDefaultScanUnitMayProveAstRawUnit ||
    metric.metricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    metric.m2Established ||
    metric.m3Established ||
    metric.fr299MetricScaleVerified ||
    metric.state !== 'public_evidence_exhausted'
  ) {
    fail('metric authority was improperly promoted.');
  }

  const pairing = FR300_R2B_PAR_PAIRING_AUTHORITY;
  if (
    !pairing.neutralBaseline3DScanDocumented ||
    !pairing.neutralBaselineSynchronizedMultiViewRgbDocumented ||
    !pairing.threeRgbViewsSimultaneous ||
    !pairing.scannerAndRgbRigsStandardizedPositionsAndAngles ||
    !pairing.paperClaimsSpatialAlignmentAcrossModalities ||
    !pairing.unifiedFileNamingDocumented ||
    pairing.controlledArtifactNamesPubliclyExposed ||
    pairing.controlledManifestPubliclyExposed ||
    pairing.scannerToRgbExtrinsicsPubliclySourceBound ||
    pairing.exactPerFileCaptureBindingPubliclySourceBound ||
    pairing.temporalSynchronizationMaySubstituteSpatialCorrespondence ||
    pairing.sameSubjectMaySubstituteExactCaptureBinding ||
    pairing.pairingAuthorityLevel !==
      'P2_same_neutral_acquisition_condition' ||
    pairing.p3Established ||
    pairing.fr299SameCaptureBindingEstablished ||
    pairing.fr299ValidatedRegistrationBindingEstablished ||
    pairing.fr299CorrespondenceVerified ||
    pairing.state !== 'public_evidence_exhausted'
  ) {
    fail('pairing authority was improperly promoted.');
  }

  const readiness = FR300_R2B_PAR_ACCESS_READINESS;
  if (
    !readiness.scientificallyPromising ||
    !readiness.controlledIntakeMayResolveRemainingTechnicalAuthority ||
    readiness.controlledAccessScientificallyJustifiedNow ||
    readiness.controlledAccessOperationallyAuthorized
  ) {
    fail('scientific promise was conflated with access authorization.');
  }

  const current = FR300_R2B_PAR_CURRENT_GATE;
  if (
    current.disposition !==
      'public_authority_exhausted_controlled_intake_may_resolve' ||
    !current.publicAuthorityResolutionCompleted ||
    current.metricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    current.pairingAuthorityLevel !==
      'P2_same_neutral_acquisition_condition' ||
    !current.scientificallyPromising ||
    !current.controlledIntakeMayResolveRemainingTechnicalAuthority ||
    current.controlledAccessScientificallyJustifiedNow ||
    current.controlledAccessOperationallyAuthorized ||
    current.osfAccountCreatedByThisStage ||
    current.controlledAccessRequested ||
    current.duaSigned ||
    current.duaSubmitted ||
    current.externalContactAuthorized ||
    current.externalContactPerformed ||
    current.controlledParticipantArtifactDownloaded ||
    current.controlledParticipantArtifactInspected ||
    current.rawFaceArtifactCommittedToGit ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.astRawMetricReferenceAuthorized ||
    current.authority.fr299MetricScaleVerified ||
    current.authority.fr299CorrespondenceVerified ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2B-PAR widened access or product authority.');
  }

  const intake = FR300_R2B_PAR_MINIMUM_PILOT_INTAKE_CONTRACT;
  if (
    intake.rawArtifactsMayEnterGit ||
    intake.rawArtifactsMayEnterGitLfs ||
    intake.providerLandmarksMayIssueFR266Truth ||
    intake.providerLandmarksMayIssueFR297Truth
  ) {
    fail('pilot intake privacy or annotation boundary drift.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    current.productMaterialization !== '18/29'
  ) {
    fail('R2B-PAR must preserve Product 18/29.');
  }
}

assertFR300R2BPARAstPublicAuthorityResolutionContract();
