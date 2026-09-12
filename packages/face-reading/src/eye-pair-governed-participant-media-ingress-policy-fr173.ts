import {
  FR172_C2PATOOL_TAG,
  FR172_C2PATOOL_TARGET_COMMIT,
  FR172_C2PATOOL_VERSION,
  FR172_NEXT_FRONTIER,
  assertIssuedEyePairC2paProductionVerifierRuntimeIntegrationFR172,
  type EyePairC2paProductionVerifierRuntimeIntegrationFR172V1,
} from './eye-pair-c2pa-production-verifier-runtime-integration-fr172.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR173_EYE_PAIR_GOVERNED_PARTICIPANT_MEDIA_INGRESS_POLICY_RECORD_ID =
  'research.face_reading.neutral.eye_pair.governed_participant_media_ingress_resource_policy.fr173' as const;
export const FR173_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr173-eye-pair-governed-participant-media-ingress-resource-policy.md' as const;
export const FR173_MAX_PARTICIPANT_MEDIA_BYTES = 32 * 1024 * 1024;
export const FR173_REQUIRED_MEDIA_TYPE = 'image/jpeg' as const;
export const FR173_REQUIRED_MEDIA_OBJECT_COUNT = 1 as const;
export const FR173_REQUIRED_TRANSPORT_ENCODING = 'raw-binary' as const;
export const FR173_NEXT_FRONTIER =
  'accept_genuine_new_prospective_original_proofmode_jpeg_within_governed_ingress_policy_then_execute_pinned_c2pa_verifier_and_admit_session_if_all_checks_succeed' as const;

const ISSUED = new WeakSet<object>();

export interface EyePairGovernedParticipantMediaIngressPolicyFR173V1 {
  readonly schemaVersion: 'fr173-eye-pair-governed-participant-media-ingress-resource-policy-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR173_EYE_PAIR_GOVERNED_PARTICIPANT_MEDIA_INGRESS_POLICY_RECORD_ID;
  readonly authorityState:
    'governed_participant_media_ingress_resource_policy_resolved_no_participant_media_admitted';
  readonly predecessor: {
    readonly issuedFR172IntegrationRequired: true;
    readonly fr172NextFrontier: typeof FR172_NEXT_FRONTIER;
    readonly c2paToolTag: typeof FR172_C2PATOOL_TAG;
    readonly c2paToolTargetCommit: typeof FR172_C2PATOOL_TARGET_COMMIT;
    readonly c2paToolVersion: typeof FR172_C2PATOOL_VERSION;
    readonly productionVerifierRuntimeIntegrationCompleted: true;
    readonly productionIngressByteLimitResolvedBeforeFR173: false;
    readonly actualWitnessCredentialAdmitted: false;
  };
  readonly resourcePolicy: {
    readonly policyClass: 'myeongha_application_operational_resource_ceiling';
    readonly maximumParticipantMediaBytes: typeof FR173_MAX_PARTICIPANT_MEDIA_BYTES;
    readonly maximumParticipantMediaMiB: 32;
    readonly requiredMediaType: typeof FR173_REQUIRED_MEDIA_TYPE;
    readonly requiredMediaObjectCount: typeof FR173_REQUIRED_MEDIA_OBJECT_COUNT;
    readonly requiredTransportEncoding: typeof FR173_REQUIRED_TRANSPORT_ENCODING;
    readonly nonEmptyBodyRequired: true;
    readonly declaredContentLengthPrecheckRequiredWhenPresent: true;
    readonly declaredContentLengthMustBeSafeNonNegativeInteger: true;
    readonly declaredContentLengthMustMatchObservedBytesWhenPresent: true;
    readonly observedByteCountAlwaysAuthoritativeForLimitEnforcement: true;
    readonly base64JsonAuthorityInputAllowed: false;
    readonly productionIngressByteLimitResolved: true;
    readonly inheritedFromCalculationJsonLimit: false;
    readonly derivedFromC2paSpecification: false;
    readonly derivedFromProofmodeSpecification: false;
    readonly derivedFromParticipantEmpiricalData: false;
    readonly biometricThreshold: false;
    readonly captureQualityThreshold: false;
    readonly repeatabilityThreshold: false;
    readonly traditionalSemanticThreshold: false;
  };
  readonly exactByteVerificationOrdering: {
    readonly originalExactBytesMustReachPinnedVerifierBeforeMutation: true;
    readonly exifStripBeforeC2paVerificationAllowed: false;
    readonly resizeBeforeC2paVerificationAllowed: false;
    readonly recompressionBeforeC2paVerificationAllowed: false;
    readonly transcodingBeforeC2paVerificationAllowed: false;
    readonly decodeReencodeBeforeC2paVerificationAllowed: false;
    readonly sanitizedDerivativeAllowedOnlyAfterExactByteVerification: true;
    readonly downstreamSanitizedDerivativeMayReplaceAuthorityBearingOriginal: false;
  };
  readonly temporaryResourceBoundary: {
    readonly temporaryFileMayBeUsedForPinnedVerifierInvocation: true;
    readonly temporaryFileMustContainExactAcceptedBytes: true;
    readonly temporaryFileMustNotBecomeRepositoryFixture: true;
    readonly temporaryFileCleanupRequiredOnSuccess: true;
    readonly temporaryFileCleanupRequiredOnFailure: true;
    readonly rawOriginalPersistenceAfterVerificationAllowed: false;
  };
  readonly implementationReadiness: {
    readonly governedIngressResourcePolicyResolved: true;
    readonly metadataOnlyAdmissionValidatorImplemented: true;
    readonly participantBytesAcceptedByThisArtifact: false;
    readonly genuineParticipantCredentialSupplied: false;
    readonly participantVerifierExecutionAttempted: false;
    readonly participantVerifierExecutionSucceeded: false;
    readonly issue492AuthorityClosureAllowedByThisArtifact: false;
  };
  readonly authorityBoundary: {
    readonly actualWitnessCredentialAdmitted: false;
    readonly captureToWitnessBindingVerifiedForParticipantMedia: false;
    readonly signerKeyTrustEstablishedForParticipantMedia: false;
    readonly witnessAuthorityTrustBoundForParticipantMedia: false;
    readonly externalWitnessAuthorityEstablishedForParticipantMedia: false;
    readonly semanticTrustEvidenceVerificationPerformedForParticipantMedia: false;
    readonly independentSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityValidated: false;
    readonly inferentialStatisticIssued: false;
    readonly repeatabilityPassFailIssued: false;
    readonly captureSensitivityPassFailIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly privacyBoundary: {
    readonly participantMediaAcceptedByPolicyArtifact: false;
    readonly rawParticipantMediaPersisted: false;
    readonly rawManifestPersisted: false;
    readonly sourceImageDigestPersistedByThisArtifact: false;
    readonly participantDerivedGeometryPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR173_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR173_NEXT_FRONTIER;
}

export interface ParticipantMediaIngressMetadataFR173V1 {
  readonly schemaVersion: 'fr173-participant-media-ingress-metadata-v1';
  readonly mediaObjectCount: number;
  readonly contentType: string;
  readonly transportEncoding: string;
  readonly declaredContentLength?: number;
  readonly observedByteLength: number;
}

export interface ParticipantMediaIngressMetadataAssessmentFR173V1 {
  readonly schemaVersion: 'fr173-participant-media-ingress-metadata-assessment-v1';
  readonly acceptedByResourcePolicy: true;
  readonly requiredMediaType: typeof FR173_REQUIRED_MEDIA_TYPE;
  readonly maximumParticipantMediaBytes: typeof FR173_MAX_PARTICIPANT_MEDIA_BYTES;
  readonly observedByteLength: number;
  readonly declaredContentLengthPresent: boolean;
  readonly declaredContentLengthMatchedObservedBytes: boolean | null;
  readonly exactBytesMayProceedToPinnedVerifierWithoutMutation: true;
  readonly participantWitnessAuthorityEstablished: false;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-173 ${message}`);
}

function validatePredecessor(
  integration: EyePairC2paProductionVerifierRuntimeIntegrationFR172V1,
): void {
  assertIssuedEyePairC2paProductionVerifierRuntimeIntegrationFR172(integration);
  if (
    integration.nextFrontier !== FR172_NEXT_FRONTIER
    || integration.externalRuntimePin.tag !== FR172_C2PATOOL_TAG
    || integration.externalRuntimePin.targetCommit !== FR172_C2PATOOL_TARGET_COMMIT
    || integration.externalRuntimePin.version !== FR172_C2PATOOL_VERSION
    || integration.implementationReadiness.productionVerifierRuntimeIntegrationCompleted !== true
    || integration.resourceBoundary.productionIngressByteLimitResolved !== false
    || integration.resourceBoundary.inheritedProductionMediaMaximumBytes !== null
    || integration.resourceBoundary.participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy !== false
    || integration.implementationReadiness.genuineParticipantCredentialSupplied !== false
    || integration.implementationReadiness.participantVerifierExecutionAttempted !== false
    || integration.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || integration.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || integration.authorityBoundary.identityMatchingPerformed !== false
    || integration.authorityBoundary.biometricTemplateIssued !== false
    || integration.authorityBoundary.traditionalSemanticAuthority !== false
  ) {
    fail('FR-172 predecessor drifted from the fail-closed verifier/runtime boundary.');
  }
}

function validateSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value)) fail(`${label} must be a safe integer.`);
}

export function getEyePairGovernedParticipantMediaIngressPolicyContractFR173() {
  return Object.freeze({
    issuedFR172IntegrationRequired: true as const,
    maximumParticipantMediaBytes: FR173_MAX_PARTICIPANT_MEDIA_BYTES,
    maximumParticipantMediaMiB: 32 as const,
    requiredMediaType: FR173_REQUIRED_MEDIA_TYPE,
    requiredMediaObjectCount: FR173_REQUIRED_MEDIA_OBJECT_COUNT,
    requiredTransportEncoding: FR173_REQUIRED_TRANSPORT_ENCODING,
    declaredLengthMustMatchObservedBytesWhenPresent: true as const,
    observedBytesAlwaysEnforceMaximum: true as const,
    preVerificationMutationAllowed: false as const,
    sanitizedDerivativeAllowedOnlyAfterExactByteVerification: true as const,
    participantWitnessAuthorityEstablishedByThisArtifact: false as const,
    issue492AuthorityClosureAllowedByThisArtifact: false as const,
    nextFrontier: FR173_NEXT_FRONTIER,
  });
}

export function issueEyePairGovernedParticipantMediaIngressPolicyFR173(
  integration: EyePairC2paProductionVerifierRuntimeIntegrationFR172V1,
): EyePairGovernedParticipantMediaIngressPolicyFR173V1 {
  validatePredecessor(integration);

  const result: EyePairGovernedParticipantMediaIngressPolicyFR173V1 = Object.freeze({
    schemaVersion: 'fr173-eye-pair-governed-participant-media-ingress-resource-policy-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR173_EYE_PAIR_GOVERNED_PARTICIPANT_MEDIA_INGRESS_POLICY_RECORD_ID,
    authorityState:
      'governed_participant_media_ingress_resource_policy_resolved_no_participant_media_admitted' as const,
    predecessor: Object.freeze({
      issuedFR172IntegrationRequired: true as const,
      fr172NextFrontier: FR172_NEXT_FRONTIER,
      c2paToolTag: FR172_C2PATOOL_TAG,
      c2paToolTargetCommit: FR172_C2PATOOL_TARGET_COMMIT,
      c2paToolVersion: FR172_C2PATOOL_VERSION,
      productionVerifierRuntimeIntegrationCompleted: true as const,
      productionIngressByteLimitResolvedBeforeFR173: false as const,
      actualWitnessCredentialAdmitted: false as const,
    }),
    resourcePolicy: Object.freeze({
      policyClass: 'myeongha_application_operational_resource_ceiling' as const,
      maximumParticipantMediaBytes: FR173_MAX_PARTICIPANT_MEDIA_BYTES,
      maximumParticipantMediaMiB: 32 as const,
      requiredMediaType: FR173_REQUIRED_MEDIA_TYPE,
      requiredMediaObjectCount: FR173_REQUIRED_MEDIA_OBJECT_COUNT,
      requiredTransportEncoding: FR173_REQUIRED_TRANSPORT_ENCODING,
      nonEmptyBodyRequired: true as const,
      declaredContentLengthPrecheckRequiredWhenPresent: true as const,
      declaredContentLengthMustBeSafeNonNegativeInteger: true as const,
      declaredContentLengthMustMatchObservedBytesWhenPresent: true as const,
      observedByteCountAlwaysAuthoritativeForLimitEnforcement: true as const,
      base64JsonAuthorityInputAllowed: false as const,
      productionIngressByteLimitResolved: true as const,
      inheritedFromCalculationJsonLimit: false as const,
      derivedFromC2paSpecification: false as const,
      derivedFromProofmodeSpecification: false as const,
      derivedFromParticipantEmpiricalData: false as const,
      biometricThreshold: false as const,
      captureQualityThreshold: false as const,
      repeatabilityThreshold: false as const,
      traditionalSemanticThreshold: false as const,
    }),
    exactByteVerificationOrdering: Object.freeze({
      originalExactBytesMustReachPinnedVerifierBeforeMutation: true as const,
      exifStripBeforeC2paVerificationAllowed: false as const,
      resizeBeforeC2paVerificationAllowed: false as const,
      recompressionBeforeC2paVerificationAllowed: false as const,
      transcodingBeforeC2paVerificationAllowed: false as const,
      decodeReencodeBeforeC2paVerificationAllowed: false as const,
      sanitizedDerivativeAllowedOnlyAfterExactByteVerification: true as const,
      downstreamSanitizedDerivativeMayReplaceAuthorityBearingOriginal: false as const,
    }),
    temporaryResourceBoundary: Object.freeze({
      temporaryFileMayBeUsedForPinnedVerifierInvocation: true as const,
      temporaryFileMustContainExactAcceptedBytes: true as const,
      temporaryFileMustNotBecomeRepositoryFixture: true as const,
      temporaryFileCleanupRequiredOnSuccess: true as const,
      temporaryFileCleanupRequiredOnFailure: true as const,
      rawOriginalPersistenceAfterVerificationAllowed: false as const,
    }),
    implementationReadiness: Object.freeze({
      governedIngressResourcePolicyResolved: true as const,
      metadataOnlyAdmissionValidatorImplemented: true as const,
      participantBytesAcceptedByThisArtifact: false as const,
      genuineParticipantCredentialSupplied: false as const,
      participantVerifierExecutionAttempted: false as const,
      participantVerifierExecutionSucceeded: false as const,
      issue492AuthorityClosureAllowedByThisArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      actualWitnessCredentialAdmitted: false as const,
      captureToWitnessBindingVerifiedForParticipantMedia: false as const,
      signerKeyTrustEstablishedForParticipantMedia: false as const,
      witnessAuthorityTrustBoundForParticipantMedia: false as const,
      externalWitnessAuthorityEstablishedForParticipantMedia: false as const,
      semanticTrustEvidenceVerificationPerformedForParticipantMedia: false as const,
      independentSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      inferentialStatisticIssued: false as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantMediaAcceptedByPolicyArtifact: false as const,
      rawParticipantMediaPersisted: false as const,
      rawManifestPersisted: false as const,
      sourceImageDigestPersistedByThisArtifact: false as const,
      participantDerivedGeometryPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR173_RESEARCH_NOTE_REF,
    nextFrontier: FR173_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairGovernedParticipantMediaIngressPolicyFR173(
  value: EyePairGovernedParticipantMediaIngressPolicyFR173V1,
): void {
  if (!ISSUED.has(value as object)) {
    fail('ingress policy artifact was not issued by the active FR-173 boundary.');
  }
  if (
    value.recordId !== FR173_EYE_PAIR_GOVERNED_PARTICIPANT_MEDIA_INGRESS_POLICY_RECORD_ID
    || value.resourcePolicy.maximumParticipantMediaBytes !== FR173_MAX_PARTICIPANT_MEDIA_BYTES
    || value.resourcePolicy.productionIngressByteLimitResolved !== true
    || value.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || value.authorityBoundary.independentSessionEvidenceAdmitted !== false
  ) {
    fail('issued ingress policy artifact drifted from the governed resource boundary.');
  }
}

export function assessParticipantMediaIngressMetadataFR173(
  policy: EyePairGovernedParticipantMediaIngressPolicyFR173V1,
  input: ParticipantMediaIngressMetadataFR173V1,
): ParticipantMediaIngressMetadataAssessmentFR173V1 {
  assertIssuedEyePairGovernedParticipantMediaIngressPolicyFR173(policy);

  if (input.schemaVersion !== 'fr173-participant-media-ingress-metadata-v1') {
    fail('participant media ingress metadata schemaVersion is unsupported.');
  }
  validateSafeInteger(input.mediaObjectCount, 'mediaObjectCount');
  if (input.mediaObjectCount !== FR173_REQUIRED_MEDIA_OBJECT_COUNT) {
    fail(`exactly ${FR173_REQUIRED_MEDIA_OBJECT_COUNT} media object is required.`);
  }
  if (input.contentType !== FR173_REQUIRED_MEDIA_TYPE) {
    fail(`contentType must be ${FR173_REQUIRED_MEDIA_TYPE}.`);
  }
  if (input.transportEncoding !== FR173_REQUIRED_TRANSPORT_ENCODING) {
    fail(`transportEncoding must be ${FR173_REQUIRED_TRANSPORT_ENCODING}.`);
  }

  validateSafeInteger(input.observedByteLength, 'observedByteLength');
  if (input.observedByteLength < 1) fail('observed participant media body must be non-empty.');
  if (input.observedByteLength > FR173_MAX_PARTICIPANT_MEDIA_BYTES) {
    fail('observed participant media exceeds the governed 32 MiB resource ceiling.');
  }

  const declaredPresent = input.declaredContentLength !== undefined;
  if (declaredPresent) {
    const declared = input.declaredContentLength as number;
    validateSafeInteger(declared, 'declaredContentLength');
    if (declared < 0) fail('declaredContentLength must be non-negative.');
    if (declared > FR173_MAX_PARTICIPANT_MEDIA_BYTES) {
      fail('declared participant media exceeds the governed 32 MiB resource ceiling.');
    }
    if (declared !== input.observedByteLength) {
      fail('declaredContentLength must match the actually observed participant media bytes.');
    }
  }

  return Object.freeze({
    schemaVersion: 'fr173-participant-media-ingress-metadata-assessment-v1' as const,
    acceptedByResourcePolicy: true as const,
    requiredMediaType: FR173_REQUIRED_MEDIA_TYPE,
    maximumParticipantMediaBytes: FR173_MAX_PARTICIPANT_MEDIA_BYTES,
    observedByteLength: input.observedByteLength,
    declaredContentLengthPresent: declaredPresent,
    declaredContentLengthMatchedObservedBytes: declaredPresent ? true : null,
    exactBytesMayProceedToPinnedVerifierWithoutMutation: true as const,
    participantWitnessAuthorityEstablished: false as const,
  });
}
