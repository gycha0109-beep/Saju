import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2B_PAR_ACCESS_READINESS,
  FR300_R2B_PAR_AST_PUBLIC_AUTHORITY_RESOLUTION_CONTRACT_VERSION,
  FR300_R2B_PAR_CURRENT_GATE,
  FR300_R2B_PAR_DUA_AUTHORITY,
  FR300_R2B_PAR_METRIC_SCALE_AUTHORITY,
  FR300_R2B_PAR_MINIMUM_PILOT_INTAKE_CONTRACT,
  FR300_R2B_PAR_PAIRING_AUTHORITY,
  assertFR300R2BPARAstPublicAuthorityResolutionContract,
} from './ast-public-authority-resolution-fr300-r2b-par.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2C_DAR_AST_AUTHORITATIVE_DUA_ACCESS_READINESS_CONTRACT_VERSION =
  'FR300-R2C-DAR-AST-AUTHORITATIVE-DUA-ACCESS-READINESS-v1' as const;

export type FR300R2CDARAuthoritativeDocumentState =
  | 'reviewed'
  | 'unavailable_in_current_non_authenticated_public_path';

export type FR300R2CDARRightsCompatibility =
  | 'compatible'
  | 'ambiguous'
  | 'incompatible'
  | 'not_adjudicable_without_authoritative_document';

export const FR300_R2C_DAR_PUBLIC_ATTEMPT = Object.freeze({
  officialRepositoryReviewed: true as const,
  scientificDataArticleReviewed: true as const,
  osfProjectRef: 'https://osf.io/xk4f6/' as const,
  osfDoi: '10.17605/OSF.IO/XK4F6' as const,
  officialRepositoryDeclaresOsfDuaAuthoritative: true as const,
  currentNonAuthenticatedOsfPageRetrievalSucceeded: false as const,
  authoritativeDuaBytesRetrieved: false as const,
  authoritativeDuaTextReviewed: false as const,
  githubMirrorBlobSha:
    '5ab05af1b97cf6f1728e6c4a363414e804a650d7' as const,
  githubMirrorMaySubstituteAuthoritativeDua: false as const,
  documentState:
    'unavailable_in_current_non_authenticated_public_path' as const satisfies FR300R2CDARAuthoritativeDocumentState,
});

export const FR300_R2C_DAR_PURPOSE = Object.freeze({
  purposeClass:
    'internal_commercial_product_r_and_d_validation' as const,
  description:
    'validate_neutral_facial_geometry_estimates_from_ordinary_smartphone_rgb_against_independent_3d_reference_geometry' as const,
  identityRecognition: false as const,
  biometricVerification: false as const,
  surveillance: false as const,
  tracking: false as const,
  demographicProfiling: false as const,
  lawEnforcementUse: false as const,
  rawArtifactRedistribution: false as const,
  productRuntimeRawArtifactUseRequired: false as const,
});

export const FR300_R2C_DAR_AUTHORITATIVE_RIGHTS = Object.freeze({
  authoritativeDocumentReviewed: false as const,
  internalResearchUse:
    'not_adjudicable' as const,
  industrialResearchAndDevelopment:
    'not_adjudicable' as const,
  commercialProductValidation:
    'not_adjudicable' as const,
  biometricIdentityRestrictionCompatible:
    'not_adjudicable' as const,
  biometricVerificationRestrictionCompatible:
    'not_adjudicable' as const,
  derivedMetricRetention:
    'not_adjudicable' as const,
  nonIdentifyingAggregatePublication:
    'not_adjudicable' as const,
  rawRedistribution:
    'not_adjudicable' as const,
  secureStorage:
    'not_adjudicable' as const,
  deletionLifecycle:
    'not_adjudicable' as const,
  compatibility:
    'not_adjudicable_without_authoritative_document' as const satisfies FR300R2CDARRightsCompatibility,
});

export const FR300_R2C_DAR_REQUEST_PACKET = Object.freeze({
  schemaVersion:
    'fr300-r2c-dar-ast-controlled-access-request-packet-v1' as const,
  prepared: true as const,
  purpose:
    FR300_R2C_DAR_PURPOSE.description,
  intendedUse: Object.freeze({
    internalCommercialProductRnDValidation: true as const,
    identityRecognition: false as const,
    biometricVerification: false as const,
    surveillance: false as const,
    tracking: false as const,
    demographicProfiling: false as const,
  }),
  requestedScope: Object.freeze({
    pilotOnly: true as const,
    neutralRaw3D: true as const,
    frontalRgb: true as const,
    subjectCaptureManifestOrEquivalent: true as const,
    metricScaleMetadata: true as const,
    leftRightRgbOptional: true as const,
    scannerRgbExtrinsicsOptional: true as const,
  }),
  securityCommitments: Object.freeze({
    noRedistribution: true as const,
    isolatedStorage: true as const,
    noGitRawArtifacts: true as const,
    noGitLfsRawArtifacts: true as const,
    deletionPerAuthoritativeDua: true as const,
  }),
  derivedOutputs: Object.freeze({
    neutralGeometryScalar: true as const,
    registrationReceipt: true as const,
    aggregateBenchmarkStatistics: true as const,
    rawArtifactPublication: false as const,
  }),
  internalCodeNamesExcludedFromExternalRequest: true as const,
  sent: false as const,
});

export const FR300_R2C_DAR_CLARIFICATION_PACKET =
  Object.freeze({
    schemaVersion:
      'fr300-r2c-dar-ast-rights-clarification-packet-v1' as const,
    prepared: true as const,
    questions: Object.freeze([
      'does_industrial_r_and_d_include_internal_validation_during_commercial_software_product_development',
      'may_non_identifying_derived_geometry_measurements_and_aggregate_benchmark_statistics_be_retained',
      'does_the_biometric_identity_restriction_exclude_non_identifying_geometry_validation_from_the_prohibition',
    ] as const),
    authorizedToSend: false as const,
    sent: false as const,
  });

export const FR300_R2C_DAR_RAW_ARTIFACT_LIFECYCLE =
  Object.freeze({
    intakePerformed: false as const,
    persistedToGit: false as const,
    persistedToGitLfs: false as const,
    persistedToPublicCloud: false as const,
    deletionPolicy:
      'defer_to_authoritative_dua_once_reviewed' as const,
    derivedArtifactsThatMayBeRetainedIfAuthorized:
      Object.freeze([
        'opaque_artifact_ref',
        'sha256_digest',
        'metric_authority_receipt',
        'registration_receipt',
        'fr298_scalar',
        'benchmark_error',
        'aggregate_benchmark_statistics',
      ] as const),
  });

export const FR300_R2C_DAR_ACCESS_READINESS = Object.freeze({
  technicallyPromising:
    FR300_R2B_PAR_ACCESS_READINESS.scientificallyPromising,
  metricAuthorityLevel:
    FR300_R2B_PAR_METRIC_SCALE_AUTHORITY.metricAuthorityLevel,
  pairingAuthorityLevel:
    FR300_R2B_PAR_PAIRING_AUTHORITY.pairingAuthorityLevel,
  controlledIntakeMayResolveRemainingTechnicalAuthority:
    FR300_R2B_PAR_ACCESS_READINESS
      .controlledIntakeMayResolveRemainingTechnicalAuthority,
  authoritativeRightsCompatible: false as const,
  authoritativeRightsCompatibilityState:
    FR300_R2C_DAR_AUTHORITATIVE_RIGHTS.compatibility,
  controlledAccessScientificallyJustified: false as const,
  controlledAccessOperationallyAuthorized: false as const,
  blocker:
    'authoritative_osf_dua_not_reviewed_in_current_non_authenticated_public_path' as const,
});

export const FR300_R2C_DAR_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2c-dar-ast-authoritative-dua-access-readiness-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'authoritative_dua_unavailable_in_current_public_path_request_packet_prepared' as const,
  authoritativeDocumentState:
    FR300_R2C_DAR_PUBLIC_ATTEMPT.documentState,
  authoritativeRightsCompatibility:
    FR300_R2C_DAR_AUTHORITATIVE_RIGHTS.compatibility,
  requestPacketPrepared: true as const,
  clarificationPacketPrepared: true as const,
  controlledAccessScientificallyJustified: false as const,
  controlledAccessOperationallyAuthorized: false as const,
  osfAccountCreatedByThisStage: false as const,
  duaSigned: false as const,
  duaSubmitted: false as const,
  controlledAccessRequested: false as const,
  clarificationAuthorized: false as const,
  clarificationSent: false as const,
  externalContactPerformed: false as const,
  controlledParticipantArtifactDownloaded: false as const,
  controlledParticipantArtifactInspected: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextAction:
    'explicitly_authorized_authenticated_osf_dua_retrieval_or_controlled_access_request_stage' as const,
  authority: Object.freeze({
    authoritativeDuaCompatibilityIssued: false as const,
    accessRequestAuthorized: false as const,
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
    `FR-300-R2C-DAR ${message}`,
  );
}

export function assertFR300R2CDARAstAuthoritativeDuaAccessReadinessContract(): void {
  assertFR300R2BPARAstPublicAuthorityResolutionContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2B_PAR_AST_PUBLIC_AUTHORITY_RESOLUTION_CONTRACT_VERSION !==
      'FR300-R2B-PAR-AST-PUBLIC-AUTHORITY-RESOLUTION-v1' ||
    FR300_R2B_PAR_CURRENT_GATE.disposition !==
      'public_authority_exhausted_controlled_intake_may_resolve' ||
    FR300_R2B_PAR_DUA_AUTHORITY.authoritativeRightsGateResolved ||
    FR300_R2B_PAR_METRIC_SCALE_AUTHORITY.metricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    FR300_R2B_PAR_PAIRING_AUTHORITY.pairingAuthorityLevel !==
      'P2_same_neutral_acquisition_condition'
  ) {
    fail('R2B-PAR predecessor drift.');
  }

  const attempt = FR300_R2C_DAR_PUBLIC_ATTEMPT;
  if (
    !attempt.officialRepositoryReviewed ||
    !attempt.scientificDataArticleReviewed ||
    !attempt.officialRepositoryDeclaresOsfDuaAuthoritative ||
    attempt.currentNonAuthenticatedOsfPageRetrievalSucceeded ||
    attempt.authoritativeDuaBytesRetrieved ||
    attempt.authoritativeDuaTextReviewed ||
    attempt.githubMirrorMaySubstituteAuthoritativeDua ||
    attempt.documentState !==
      'unavailable_in_current_non_authenticated_public_path'
  ) {
    fail('authoritative-document attempt was improperly promoted.');
  }

  const rights = FR300_R2C_DAR_AUTHORITATIVE_RIGHTS;
  if (
    rights.authoritativeDocumentReviewed ||
    rights.compatibility !==
      'not_adjudicable_without_authoritative_document'
  ) {
    fail('authoritative rights were adjudicated without the authoritative DUA.');
  }

  if (
    !FR300_R2C_DAR_REQUEST_PACKET.prepared ||
    FR300_R2C_DAR_REQUEST_PACKET.sent ||
    !FR300_R2C_DAR_CLARIFICATION_PACKET.prepared ||
    FR300_R2C_DAR_CLARIFICATION_PACKET.authorizedToSend ||
    FR300_R2C_DAR_CLARIFICATION_PACKET.sent
  ) {
    fail('prepared packets were confused with sent actions.');
  }

  const readiness = FR300_R2C_DAR_ACCESS_READINESS;
  if (
    !readiness.technicallyPromising ||
    readiness.authoritativeRightsCompatible ||
    readiness.controlledAccessScientificallyJustified ||
    readiness.controlledAccessOperationallyAuthorized
  ) {
    fail('technical promise was confused with rights or access readiness.');
  }

  const current = FR300_R2C_DAR_CURRENT_GATE;
  if (
    current.disposition !==
      'authoritative_dua_unavailable_in_current_public_path_request_packet_prepared' ||
    current.requestPacketPrepared !== true ||
    current.clarificationPacketPrepared !== true ||
    current.controlledAccessScientificallyJustified ||
    current.controlledAccessOperationallyAuthorized ||
    current.osfAccountCreatedByThisStage ||
    current.duaSigned ||
    current.duaSubmitted ||
    current.controlledAccessRequested ||
    current.clarificationAuthorized ||
    current.clarificationSent ||
    current.externalContactPerformed ||
    current.controlledParticipantArtifactDownloaded ||
    current.controlledParticipantArtifactInspected ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.authoritativeDuaCompatibilityIssued ||
    current.authority.accessRequestAuthorized ||
    current.authority.astRawMetricReferenceAuthorized ||
    current.authority.fr299MetricScaleVerified ||
    current.authority.fr299CorrespondenceVerified ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2C-DAR widened rights, acquisition, or product authority.');
  }

  const intake = FR300_R2B_PAR_MINIMUM_PILOT_INTAKE_CONTRACT;
  if (
    intake.rawArtifactsMayEnterGit ||
    intake.rawArtifactsMayEnterGitLfs ||
    FR300_R2C_DAR_RAW_ARTIFACT_LIFECYCLE.persistedToGit ||
    FR300_R2C_DAR_RAW_ARTIFACT_LIFECYCLE.persistedToGitLfs ||
    FR300_R2C_DAR_RAW_ARTIFACT_LIFECYCLE.persistedToPublicCloud
  ) {
    fail('raw controlled artifact persistence boundary drift.');
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
    fail('R2C-DAR must preserve Product 18/29.');
  }
}

assertFR300R2CDARAstAuthoritativeDuaAccessReadinessContract();
