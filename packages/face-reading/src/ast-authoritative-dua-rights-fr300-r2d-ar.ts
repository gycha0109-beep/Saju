import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2D_AQ_AST_CONTROLLED_ACCESS_REQUEST_CONTRACT_VERSION,
  FR300_R2D_AQ_CURRENT_GATE,
  FR300_R2D_AQ_REQUEST_PACKET,
  FR300_R2D_AQ_USER_AUTHORIZATION,
  assertFR300R2DAQAstControlledAccessRequestContract,
} from './ast-controlled-access-request-fr300-r2d-aq.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2D_AR_AST_AUTHORITATIVE_DUA_RIGHTS_CONTRACT_VERSION =
  'FR300-R2D-AR-AST-AUTHORITATIVE-DUA-RIGHTS-v1' as const;

export type FR300R2DARClauseState =
  | 'explicitly_allowed'
  | 'explicitly_prohibited'
  | 'conditionally_allowed'
  | 'required'
  | 'not_addressed';

export const FR300_R2D_AR_AUTHORITATIVE_DUA_IDENTITY = Object.freeze({
  source:
    'user_confirmed_authenticated_osf_authoritative_download' as const,
  projectDoi: '10.17605/OSF.IO/XK4F6' as const,
  fileName: 'Data Usage Agreement (DUA) .pdf' as const,
  byteLength: 89465 as const,
  sha256:
    'sha256:dc675a134ee2a65d46271ec8851c9511a5787e7d531fc276ed8c8513f75335ab' as const,
  gitBlobSha1:
    '5ab05af1b97cf6f1728e6c4a363414e804a650d7' as const,
  officialGithubMirrorBlobSha1:
    '5ab05af1b97cf6f1728e6c4a363414e804a650d7' as const,
  byteIdenticalToOfficialGithubMirror: true as const,
  authoritativeDocumentReviewed: true as const,
  pageCount: 2 as const,
});

export const FR300_R2D_AR_RIGHTS_MATRIX = Object.freeze({
  legitimateAcademicResearchAndDevelopment:
    'explicitly_allowed' as const satisfies FR300R2DARClauseState,
  legitimateIndustrialResearchAndDevelopment:
    'explicitly_allowed' as const satisfies FR300R2DARClauseState,
  internalAnalysisAndEvaluation:
    'explicitly_allowed' as const satisfies FR300R2DARClauseState,
  commercialProductDevelopmentValidation:
    'conditionally_allowed' as const satisfies FR300R2DARClauseState,

  participantReIdentification:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  biometricIdentification:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  biometricVerification:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  surveillance:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  profiling:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  participantTracking:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  identityRecognitionSystemTrainingOrEvaluation:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,

  controlledRawDataRedistribution:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  identifiableDerivativeDistribution:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,
  reconstructiveFaceTemplateDistribution:
    'explicitly_prohibited' as const satisfies FR300R2DARClauseState,

  nonIdentifyingAggregateStatisticsPublication:
    'explicitly_allowed' as const satisfies FR300R2DARClauseState,
  nonIdentifyingPlotsPublication:
    'explicitly_allowed' as const satisfies FR300R2DARClauseState,
  nonIdentifyingQualitativeResultsPublication:
    'explicitly_allowed' as const satisfies FR300R2DARClauseState,

  individualDerivedScalarExternalPublication:
    'not_addressed' as const satisfies FR300R2DARClauseState,
  individualDerivedScalarInternalRetention:
    'not_addressed' as const satisfies FR300R2DARClauseState,
  thirdPartyCloudProcessing:
    'not_addressed' as const satisfies FR300R2DARClauseState,

  secureTechnicalAndAdministrativeControls:
    'required' as const satisfies FR300R2DARClauseState,
  deletionWhenNoLongerNeeded:
    'required' as const satisfies FR300R2DARClauseState,
  deletionOnProviderRequest:
    'required' as const satisfies FR300R2DARClauseState,
  backupAndCopyDeletion:
    'required' as const satisfies FR300R2DARClauseState,
  datasetCitation:
    'required' as const satisfies FR300R2DARClauseState,
  breachNotification:
    'required' as const satisfies FR300R2DARClauseState,
});

export const FR300_R2D_AR_BOUNDED_USE_PROFILE = Object.freeze({
  useClass:
    'internal_commercial_product_r_and_d_validation' as const,
  permittedInterpretation:
    'bounded_internal_industrial_r_and_d_analysis_and_evaluation' as const,
  ordinarySmartphoneRgbNeutralGeometryValidation: true as const,
  independent3DReferenceComparison: true as const,

  identityRecognition: false as const,
  biometricVerification: false as const,
  faceMatching: false as const,
  surveillance: false as const,
  tracking: false as const,
  demographicProfiling: false as const,
  lawEnforcementUse: false as const,

  rawRedistribution: false as const,
  rawProductRuntimeUse: false as const,
  rawGitPersistence: false as const,
  rawGitLfsPersistence: false as const,
  thirdPartyPublicCloudProcessing: false as const,

  publicRepositoryIndividualSubjectScalarPersistence:
    false as const,
  publicRepositoryAggregateNonIdentifyingMetricsOnly:
    true as const,
  privateControlledEnvironmentMayComputePerSubjectScalars:
    true as const,
  perSubjectScalarMustNotBePublishedAsIdentifiableOrReconstructive:
    true as const,

  secureStorageRequired: true as const,
  deleteRawWhenNoLongerNeeded: true as const,
  deleteRawOnProviderRequest: true as const,
  deleteBackupsAndCopies: true as const,
  citationRequiredForPublicOutputs: true as const,
  breachNotificationRequired: true as const,
});

export const FR300_R2D_AR_COMPATIBILITY = Object.freeze({
  compatibility:
    'compatible_for_bounded_internal_industrial_r_and_d' as const,
  commercialProductValidationBasis:
    'industrial_r_and_d_plus_internal_analysis_and_evaluation' as const,
  unrestrictedCommercialUseAuthorized: false as const,
  rawArtifactCommercialRuntimeUseAuthorized: false as const,
  identitySystemUseAuthorized: false as const,
  aggregateNonIdentifyingOutputAuthorized: true as const,
  individualDerivedScalarExternalPublicationAuthorized:
    false as const,
  individualDerivedScalarInternalRetentionExplicitlyAuthorized:
    false as const,
  internalPerSubjectScalarComputationNeededForBenchmark:
    true as const,
  safeImplementationPolicy:
    'compute_subject_level_scalar_inside_controlled_environment_and_persist_publicly_only_non_identifying_aggregate_outputs_unless_provider_separately_clarifies_broader_derivative_retention' as const,
  rightsClarificationRequiredBeforeControlledAccessRequest:
    false as const,
  signerIdentityRequiredBeforeSignature: true as const,
});

export const FR300_R2D_AR_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2d-ar-ast-authoritative-dua-rights-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'authoritative_rights_compatible_signature_identity_required' as const,

  authoritativeDuaRetrieved: true as const,
  authoritativeDuaReviewed: true as const,
  authoritativeDuaByteIdentityVerified: true as const,
  rightsCompatibility:
    'compatible_for_bounded_internal_industrial_r_and_d' as const,

  userAuthorizedAccessWorkflow: true as const,
  controlledAccessScientificallyJustified: true as const,
  accessRequestExecutionAuthorizedByUser: true as const,

  signerIdentityBound: false as const,
  duaSigned: false as const,
  duaSubmitted: false as const,
  controlledAccessRequested: false as const,
  providerAcknowledged: false as const,
  controlledAccessApproved: false as const,

  externalExecutionBlocker:
    'signer_name_affiliation_email_and_signature_binding_required' as const,

  controlledParticipantArtifactDownloaded: false as const,
  controlledParticipantArtifactInspected: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,

  nextAction:
    'bind_signer_identity_fill_authoritative_dua_and_submit_controlled_access_request' as const,

  authority: Object.freeze({
    authoritativeDuaCompatibilityIssued: true as const,
    accessRequestExecutionAuthorizedByUser: true as const,
    duaSignatureAuthorizedAfterSignerBinding: true as const,
    accessRequestActuallySubmitted: false as const,
    rawParticipantArtifactUseAuthorized: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2D-AR ${message}`,
  );
}

export function assertFR300R2DARAstAuthoritativeDuaRightsContract(): void {
  assertFR300R2DAQAstControlledAccessRequestContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2D_AQ_AST_CONTROLLED_ACCESS_REQUEST_CONTRACT_VERSION !==
      'FR300-R2D-AQ-AST-CONTROLLED-ACCESS-REQUEST-v1' ||
    FR300_R2D_AQ_CURRENT_GATE.disposition !==
      'user_authorized_external_execution_blocked_authenticated_osf_session_required' ||
    !FR300_R2D_AQ_USER_AUTHORIZATION
      .controlledAccessRequestExecutionAuthorizedIfCompatible
  ) {
    fail('R2D-AQ predecessor drift.');
  }

  const identity = FR300_R2D_AR_AUTHORITATIVE_DUA_IDENTITY;
  if (
    identity.source !==
      'user_confirmed_authenticated_osf_authoritative_download' ||
    identity.byteLength !== 89465 ||
    identity.sha256 !==
      'sha256:dc675a134ee2a65d46271ec8851c9511a5787e7d531fc276ed8c8513f75335ab' ||
    identity.gitBlobSha1 !==
      identity.officialGithubMirrorBlobSha1 ||
    !identity.byteIdenticalToOfficialGithubMirror ||
    !identity.authoritativeDocumentReviewed ||
    identity.pageCount !== 2
  ) {
    fail('authoritative DUA identity drift.');
  }

  const rights = FR300_R2D_AR_RIGHTS_MATRIX;
  if (
    rights.legitimateIndustrialResearchAndDevelopment !==
      'explicitly_allowed' ||
    rights.internalAnalysisAndEvaluation !==
      'explicitly_allowed' ||
    rights.commercialProductDevelopmentValidation !==
      'conditionally_allowed' ||
    rights.biometricIdentification !==
      'explicitly_prohibited' ||
    rights.biometricVerification !==
      'explicitly_prohibited' ||
    rights.surveillance !==
      'explicitly_prohibited' ||
    rights.profiling !==
      'explicitly_prohibited' ||
    rights.participantTracking !==
      'explicitly_prohibited' ||
    rights.controlledRawDataRedistribution !==
      'explicitly_prohibited' ||
    rights.nonIdentifyingAggregateStatisticsPublication !==
      'explicitly_allowed' ||
    rights.secureTechnicalAndAdministrativeControls !==
      'required' ||
    rights.deletionWhenNoLongerNeeded !== 'required' ||
    rights.backupAndCopyDeletion !== 'required'
  ) {
    fail('authoritative DUA clause adjudication drift.');
  }

  const bounded = FR300_R2D_AR_BOUNDED_USE_PROFILE;
  if (
    !bounded.ordinarySmartphoneRgbNeutralGeometryValidation ||
    !bounded.independent3DReferenceComparison ||
    bounded.identityRecognition ||
    bounded.biometricVerification ||
    bounded.faceMatching ||
    bounded.surveillance ||
    bounded.tracking ||
    bounded.demographicProfiling ||
    bounded.lawEnforcementUse ||
    bounded.rawRedistribution ||
    bounded.rawProductRuntimeUse ||
    bounded.rawGitPersistence ||
    bounded.rawGitLfsPersistence ||
    bounded.thirdPartyPublicCloudProcessing ||
    bounded.publicRepositoryIndividualSubjectScalarPersistence ||
    !bounded.publicRepositoryAggregateNonIdentifyingMetricsOnly ||
    !bounded.secureStorageRequired ||
    !bounded.deleteRawWhenNoLongerNeeded ||
    !bounded.deleteRawOnProviderRequest ||
    !bounded.deleteBackupsAndCopies
  ) {
    fail('bounded use profile exceeds DUA scope.');
  }

  const compatibility = FR300_R2D_AR_COMPATIBILITY;
  if (
    compatibility.compatibility !==
      'compatible_for_bounded_internal_industrial_r_and_d' ||
    compatibility.unrestrictedCommercialUseAuthorized ||
    compatibility.rawArtifactCommercialRuntimeUseAuthorized ||
    compatibility.identitySystemUseAuthorized ||
    !compatibility.aggregateNonIdentifyingOutputAuthorized ||
    compatibility.individualDerivedScalarExternalPublicationAuthorized ||
    compatibility.individualDerivedScalarInternalRetentionExplicitlyAuthorized ||
    !compatibility.internalPerSubjectScalarComputationNeededForBenchmark ||
    compatibility.rightsClarificationRequiredBeforeControlledAccessRequest ||
    !compatibility.signerIdentityRequiredBeforeSignature
  ) {
    fail('DUA compatibility scope drift.');
  }

  const packet = FR300_R2D_AQ_REQUEST_PACKET;
  if (
    !packet.prepared ||
    !packet.userAuthorizationBound ||
    !packet.compatibleRightsRequiredBeforeSubmission ||
    !packet.signerIdentityBindingRequiredBeforeSignature ||
    packet.requestMayBeSubmittedIfRightsAmbiguous ||
    packet.requestMayBeSubmittedIfRightsIncompatible ||
    packet.rawParticipantArtifactDownloadInThisStage
  ) {
    fail('R2D request packet boundary drift.');
  }

  const current = FR300_R2D_AR_CURRENT_GATE;
  if (
    current.disposition !==
      'authoritative_rights_compatible_signature_identity_required' ||
    !current.authoritativeDuaRetrieved ||
    !current.authoritativeDuaReviewed ||
    !current.authoritativeDuaByteIdentityVerified ||
    current.rightsCompatibility !==
      'compatible_for_bounded_internal_industrial_r_and_d' ||
    !current.userAuthorizedAccessWorkflow ||
    !current.controlledAccessScientificallyJustified ||
    !current.accessRequestExecutionAuthorizedByUser ||
    current.signerIdentityBound ||
    current.duaSigned ||
    current.duaSubmitted ||
    current.controlledAccessRequested ||
    current.providerAcknowledged ||
    current.controlledAccessApproved ||
    current.controlledParticipantArtifactDownloaded ||
    current.controlledParticipantArtifactInspected ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    !current.authority.authoritativeDuaCompatibilityIssued ||
    !current.authority.accessRequestExecutionAuthorizedByUser ||
    !current.authority.duaSignatureAuthorizedAfterSignerBinding ||
    current.authority.accessRequestActuallySubmitted ||
    current.authority.rawParticipantArtifactUseAuthorized ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2D-AR current gate authority drift.');
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
    fail('R2D-AR must preserve Product 18/29.');
  }
}

assertFR300R2DARAstAuthoritativeDuaRightsContract();
