import {
  FR170_C2PA_AUTHORITY_REF,
  FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
  FR170_C2PA_EXTERNAL_COMMIT,
  FR170_C2PA_EXTERNAL_REPOSITORY,
  FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
  FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA,
  FR170_NEXT_FRONTIER,
  assertIssuedEyePairC2paExternalTrustRootProvisioningFR170,
  type EyePairC2paExternalTrustRootProvisioningFR170V1,
} from './eye-pair-c2pa-external-trust-root-provisioning-fr170.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR171_EYE_PAIR_C2PA_WITNESS_CREDENTIAL_ADMISSION_READINESS_RECORD_ID =
  'research.face_reading.neutral.eye_pair.c2pa_witness_credential_admission_readiness.fr171' as const;
export const FR171_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr171-eye-pair-c2pa-witness-credential-admission-readiness.md' as const;
export const FR171_NEXT_FRONTIER =
  'supply_genuine_new_prospective_original_proofmode_jpeg_with_intact_content_credential_then_verify_manifest_signer_chain_content_binding_and_session_admission' as const;

export const FR171_PROOFMODE_ANDROID_RECORD_ID = '019876c6-8379-73d1-9f3b-c6c5a880f6d9' as const;
export const FR171_PROOFMODE_IOS_RECORD_ID = '019dfe5f-40cc-7cfb-8082-96ba7548bfbd' as const;
export const FR171_PROOFMODE_MIN_VERSION = '3.0.0' as const;
export const FR171_REQUIRED_MEDIA_TYPE = 'image/jpeg' as const;

const ISSUED = new WeakSet<object>();

export interface EyePairC2paWitnessCredentialAdmissionReadinessFR171V1 {
  readonly schemaVersion: 'fr171-eye-pair-c2pa-witness-credential-admission-readiness-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR171_EYE_PAIR_C2PA_WITNESS_CREDENTIAL_ADMISSION_READINESS_RECORD_ID;
  readonly authorityState:
    'eye_pair_c2pa_witness_credential_admission_requirements_frozen_real_participant_credential_not_yet_supplied';
  readonly predecessor: {
    readonly issuedFR170ProvisioningRequired: true;
    readonly fr170NextFrontier: typeof FR170_NEXT_FRONTIER;
    readonly externalRepository: typeof FR170_C2PA_EXTERNAL_REPOSITORY;
    readonly externalCommit: typeof FR170_C2PA_EXTERNAL_COMMIT;
    readonly trustListBlobSha: typeof FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA;
    readonly conformingProductsBlobSha: typeof FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA;
    readonly c2paAuthorityRef: typeof FR170_C2PA_AUTHORITY_REF;
    readonly pinnedWitnessTrustRootRef: typeof FR170_C2PA_TRUST_LIST_ARTIFACT_REF;
    readonly actualExternalGovernanceVerificationPerformed: true;
    readonly actualTrustRootProvisioned: true;
    readonly governedWitnessTrustRootEstablished: true;
    readonly actualWitnessCredentialAdmitted: false;
  };
  readonly requiredRealEvidence: {
    readonly genuinelyNewProspectiveCaptureRequired: true;
    readonly originalContentCredentialBearingMediaRequired: true;
    readonly jpegContainerRequired: true;
    readonly requiredMediaType: typeof FR171_REQUIRED_MEDIA_TYPE;
    readonly allowedGeneratorOrganization: 'Proofmode Reality Systems LLC';
    readonly allowedGeneratorProfiles: readonly [
      {
        readonly platform: 'android';
        readonly recordId: typeof FR171_PROOFMODE_ANDROID_RECORD_ID;
        readonly commonName: 'Proofmode for Android';
        readonly minimumVersion: typeof FR171_PROOFMODE_MIN_VERSION;
      },
      {
        readonly platform: 'ios';
        readonly recordId: typeof FR171_PROOFMODE_IOS_RECORD_ID;
        readonly commonName: 'Proofmode for iOS';
        readonly minimumVersion: typeof FR171_PROOFMODE_MIN_VERSION;
      },
    ];
    readonly screenshotSufficient: false;
    readonly recompressedExportSufficient: false;
    readonly ordinaryCameraCaptureSufficient: false;
    readonly callerGeneratedManifestSufficient: false;
    readonly syntheticFixtureSufficient: false;
    readonly priorFR163ToFR165SessionMediaSufficient: false;
  };
  readonly verificationRequirements: {
    readonly boundedMediaResourcePolicyRequiredBeforeRuntimeAdmission: true;
    readonly concreteMediaByteLimitIssuedByThisArtifact: false;
    readonly embeddedContentCredentialPresenceVerificationRequired: true;
    readonly c2paManifestAndClaimSemanticVerificationRequired: true;
    readonly exactAssetContentBindingVerificationRequired: true;
    readonly signerCertificateChainVerificationAgainstPinnedTrustListRequired: true;
    readonly signerValidityAndRevocationPolicyVerificationRequired: true;
    readonly conformingProofmodeGeneratorIdentityVerificationRequired: true;
    readonly minimumProofmodeVersionVerificationRequired: true;
    readonly captureSpecificWitnessBindingRequired: true;
    readonly prospectiveSessionBindingRequired: true;
    readonly samePersonCallerAttestationRequiredWithoutBiometricProof: true;
    readonly allChecksMustSucceedBeforeParticipantWitnessAuthority: true;
  };
  readonly implementationReadiness: {
    readonly admissionContractFrozen: true;
    readonly productionVerifierImplementationCompleted: false;
    readonly productionC2paManifestParserIntegrated: false;
    readonly productionSignerChainValidatorIntegrated: false;
    readonly productionAssetBindingValidatorIntegrated: false;
    readonly productionProofmodeGeneratorProfileValidatorIntegrated: false;
    readonly genuineParticipantCredentialSupplied: false;
    readonly realAdmissionExecutionAttempted: false;
    readonly realAdmissionExecutionSucceeded: false;
    readonly readinessMayBeIssuedWithoutParticipantMedia: true;
    readonly issue492AuthorityClosureAllowedByThisArtifact: false;
  };
  readonly trustBoundary: {
    readonly actualExternalGovernanceVerificationPerformed: true;
    readonly actualTrustRootProvisioned: true;
    readonly governedWitnessTrustRootEstablished: true;
    readonly actualWitnessCredentialAdmitted: false;
    readonly captureToWitnessBindingVerifiedForParticipantMedia: false;
    readonly signerKeyTrustEstablishedForParticipantMedia: false;
    readonly witnessAuthorityTrustBoundForParticipantMedia: false;
    readonly externalWitnessAuthorityEstablishedForParticipantMedia: false;
    readonly semanticTrustEvidenceVerificationPerformedForParticipantMedia: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly authorityBoundary: {
    readonly participantWitnessAdmissionRequirementsFrozen: true;
    readonly externalWitnessAuthorityEstablished: false;
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
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly traditionalSemanticAuthority: false;
  };
  readonly prospectiveCollectionBoundary: {
    readonly existingFR163ToFR165SessionsRetrospectivelyPromotable: false;
    readonly genuinelyNewParticipantCaptureRequiredForAuthorityAdvance: true;
    readonly collectionMustOccurThroughPinnedConformingGeneratorPath: true;
    readonly ordinaryCameraCaptureAuthorityPromotable: false;
    readonly participantCaptureAcceptedByThisReadinessArtifact: false;
  };
  readonly privacyBoundary: {
    readonly rawParticipantImageAcceptedByThisArtifact: false;
    readonly rawContentCredentialAcceptedByThisArtifact: false;
    readonly sourceImageDigestAcceptedByThisArtifact: false;
    readonly participantDerivedNumericMetricInputAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly derivedFullFaceMetricGeometryAccepted: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR171_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR171_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-171 ${message}`);
}

function validatePredecessor(provisioning: EyePairC2paExternalTrustRootProvisioningFR170V1): void {
  assertIssuedEyePairC2paExternalTrustRootProvisioningFR170(provisioning);
  if (
    provisioning.nextFrontier !== FR170_NEXT_FRONTIER
    || provisioning.externalGovernanceSnapshot.repository !== FR170_C2PA_EXTERNAL_REPOSITORY
    || provisioning.externalGovernanceSnapshot.commit !== FR170_C2PA_EXTERNAL_COMMIT
    || provisioning.externalGovernanceSnapshot.trustListBlobSha !== FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA
    || provisioning.externalGovernanceSnapshot.conformingProductsBlobSha !== FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA
    || provisioning.trustBoundary.actualExternalGovernanceVerificationPerformed !== true
    || provisioning.trustBoundary.actualTrustRootProvisioned !== true
    || provisioning.trustBoundary.governedWitnessTrustRootEstablished !== true
    || provisioning.trustBoundary.actualWitnessCredentialAdmitted !== false
    || provisioning.trustBoundary.externalWitnessAuthorityEstablishedForParticipantMedia !== false
    || provisioning.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || provisioning.authorityBoundary.multiSessionIndependenceVerified !== false
    || provisioning.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || provisioning.authorityBoundary.identityMatchingPerformed !== false
    || provisioning.authorityBoundary.biometricTemplateIssued !== false
    || provisioning.authorityBoundary.traditionalSemanticAuthority !== false
    || provisioning.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || provisioning.prospectiveCollectionBoundary.newParticipantCaptureRequiredForNextAuthorityStep !== true
    || provisioning.prospectiveCollectionBoundary.originalContentCredentialBearingMediaRequired !== true
  ) fail('FR-170 predecessor drifted from the provisioned prospective trust path.');
}

export function getEyePairC2paWitnessCredentialAdmissionReadinessContractFR171() {
  return Object.freeze({
    issuedFR170ProvisioningRequired: true as const,
    genuinelyNewProspectiveCaptureRequired: true as const,
    originalContentCredentialBearingJpegRequired: true as const,
    proofmodeAndroidRecordId: FR171_PROOFMODE_ANDROID_RECORD_ID,
    proofmodeIosRecordId: FR171_PROOFMODE_IOS_RECORD_ID,
    proofmodeMinimumVersion: FR171_PROOFMODE_MIN_VERSION,
    embeddedCredentialManifestChainAndAssetBindingVerificationRequired: true as const,
    syntheticOrCallerControlledSuccessPathAllowed: false as const,
    participantMediaAcceptedByThisReadinessArtifact: false as const,
    participantWitnessAuthorityEstablishedByThisReadinessArtifact: false as const,
    independentSessionEvidenceAdmittedByThisReadinessArtifact: false as const,
    issue492AuthorityClosureAllowedByThisReadinessArtifact: false as const,
    nextFrontier: FR171_NEXT_FRONTIER,
  });
}

export function issueEyePairC2paWitnessCredentialAdmissionReadinessFR171(
  provisioning: EyePairC2paExternalTrustRootProvisioningFR170V1,
): EyePairC2paWitnessCredentialAdmissionReadinessFR171V1 {
  validatePredecessor(provisioning);

  const result: EyePairC2paWitnessCredentialAdmissionReadinessFR171V1 = Object.freeze({
    schemaVersion: 'fr171-eye-pair-c2pa-witness-credential-admission-readiness-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR171_EYE_PAIR_C2PA_WITNESS_CREDENTIAL_ADMISSION_READINESS_RECORD_ID,
    authorityState:
      'eye_pair_c2pa_witness_credential_admission_requirements_frozen_real_participant_credential_not_yet_supplied' as const,
    predecessor: Object.freeze({
      issuedFR170ProvisioningRequired: true as const,
      fr170NextFrontier: FR170_NEXT_FRONTIER,
      externalRepository: FR170_C2PA_EXTERNAL_REPOSITORY,
      externalCommit: FR170_C2PA_EXTERNAL_COMMIT,
      trustListBlobSha: FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA,
      conformingProductsBlobSha: FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
      c2paAuthorityRef: FR170_C2PA_AUTHORITY_REF,
      pinnedWitnessTrustRootRef: FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
      actualExternalGovernanceVerificationPerformed: true as const,
      actualTrustRootProvisioned: true as const,
      governedWitnessTrustRootEstablished: true as const,
      actualWitnessCredentialAdmitted: false as const,
    }),
    requiredRealEvidence: Object.freeze({
      genuinelyNewProspectiveCaptureRequired: true as const,
      originalContentCredentialBearingMediaRequired: true as const,
      jpegContainerRequired: true as const,
      requiredMediaType: FR171_REQUIRED_MEDIA_TYPE,
      allowedGeneratorOrganization: 'Proofmode Reality Systems LLC' as const,
      allowedGeneratorProfiles: Object.freeze([
        Object.freeze({
          platform: 'android' as const,
          recordId: FR171_PROOFMODE_ANDROID_RECORD_ID,
          commonName: 'Proofmode for Android' as const,
          minimumVersion: FR171_PROOFMODE_MIN_VERSION,
        }),
        Object.freeze({
          platform: 'ios' as const,
          recordId: FR171_PROOFMODE_IOS_RECORD_ID,
          commonName: 'Proofmode for iOS' as const,
          minimumVersion: FR171_PROOFMODE_MIN_VERSION,
        }),
      ]) as readonly [
        { readonly platform: 'android'; readonly recordId: typeof FR171_PROOFMODE_ANDROID_RECORD_ID; readonly commonName: 'Proofmode for Android'; readonly minimumVersion: typeof FR171_PROOFMODE_MIN_VERSION },
        { readonly platform: 'ios'; readonly recordId: typeof FR171_PROOFMODE_IOS_RECORD_ID; readonly commonName: 'Proofmode for iOS'; readonly minimumVersion: typeof FR171_PROOFMODE_MIN_VERSION },
      ],
      screenshotSufficient: false as const,
      recompressedExportSufficient: false as const,
      ordinaryCameraCaptureSufficient: false as const,
      callerGeneratedManifestSufficient: false as const,
      syntheticFixtureSufficient: false as const,
      priorFR163ToFR165SessionMediaSufficient: false as const,
    }),
    verificationRequirements: Object.freeze({
      boundedMediaResourcePolicyRequiredBeforeRuntimeAdmission: true as const,
      concreteMediaByteLimitIssuedByThisArtifact: false as const,
      embeddedContentCredentialPresenceVerificationRequired: true as const,
      c2paManifestAndClaimSemanticVerificationRequired: true as const,
      exactAssetContentBindingVerificationRequired: true as const,
      signerCertificateChainVerificationAgainstPinnedTrustListRequired: true as const,
      signerValidityAndRevocationPolicyVerificationRequired: true as const,
      conformingProofmodeGeneratorIdentityVerificationRequired: true as const,
      minimumProofmodeVersionVerificationRequired: true as const,
      captureSpecificWitnessBindingRequired: true as const,
      prospectiveSessionBindingRequired: true as const,
      samePersonCallerAttestationRequiredWithoutBiometricProof: true as const,
      allChecksMustSucceedBeforeParticipantWitnessAuthority: true as const,
    }),
    implementationReadiness: Object.freeze({
      admissionContractFrozen: true as const,
      productionVerifierImplementationCompleted: false as const,
      productionC2paManifestParserIntegrated: false as const,
      productionSignerChainValidatorIntegrated: false as const,
      productionAssetBindingValidatorIntegrated: false as const,
      productionProofmodeGeneratorProfileValidatorIntegrated: false as const,
      genuineParticipantCredentialSupplied: false as const,
      realAdmissionExecutionAttempted: false as const,
      realAdmissionExecutionSucceeded: false as const,
      readinessMayBeIssuedWithoutParticipantMedia: true as const,
      issue492AuthorityClosureAllowedByThisArtifact: false as const,
    }),
    trustBoundary: Object.freeze({
      actualExternalGovernanceVerificationPerformed: true as const,
      actualTrustRootProvisioned: true as const,
      governedWitnessTrustRootEstablished: true as const,
      actualWitnessCredentialAdmitted: false as const,
      captureToWitnessBindingVerifiedForParticipantMedia: false as const,
      signerKeyTrustEstablishedForParticipantMedia: false as const,
      witnessAuthorityTrustBoundForParticipantMedia: false as const,
      externalWitnessAuthorityEstablishedForParticipantMedia: false as const,
      semanticTrustEvidenceVerificationPerformedForParticipantMedia: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      participantWitnessAdmissionRequirementsFrozen: true as const,
      externalWitnessAuthorityEstablished: false as const,
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
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    prospectiveCollectionBoundary: Object.freeze({
      existingFR163ToFR165SessionsRetrospectivelyPromotable: false as const,
      genuinelyNewParticipantCaptureRequiredForAuthorityAdvance: true as const,
      collectionMustOccurThroughPinnedConformingGeneratorPath: true as const,
      ordinaryCameraCaptureAuthorityPromotable: false as const,
      participantCaptureAcceptedByThisReadinessArtifact: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawParticipantImageAcceptedByThisArtifact: false as const,
      rawContentCredentialAcceptedByThisArtifact: false as const,
      sourceImageDigestAcceptedByThisArtifact: false as const,
      participantDerivedNumericMetricInputAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      derivedFullFaceMetricGeometryAccepted: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR171_RESEARCH_NOTE_REF,
    nextFrontier: FR171_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairC2paWitnessCredentialAdmissionReadinessFR171(
  value: EyePairC2paWitnessCredentialAdmissionReadinessFR171V1,
): void {
  if (!ISSUED.has(value as object)) fail('admission readiness artifact was not issued by the active FR-171 boundary.');
  if (
    value.recordId !== FR171_EYE_PAIR_C2PA_WITNESS_CREDENTIAL_ADMISSION_READINESS_RECORD_ID
    || value.predecessor.actualTrustRootProvisioned !== true
    || value.requiredRealEvidence.genuinelyNewProspectiveCaptureRequired !== true
    || value.requiredRealEvidence.syntheticFixtureSufficient !== false
    || value.implementationReadiness.realAdmissionExecutionSucceeded !== false
    || value.implementationReadiness.issue492AuthorityClosureAllowedByThisArtifact !== false
    || value.trustBoundary.actualWitnessCredentialAdmitted !== false
    || value.authorityBoundary.externalWitnessAuthorityEstablished !== false
    || value.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || value.authorityBoundary.multiSessionIndependenceVerified !== false
    || value.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || value.authorityBoundary.identityMatchingPerformed !== false
    || value.authorityBoundary.biometricTemplateIssued !== false
    || value.authorityBoundary.traditionalSemanticAuthority !== false
    || value.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || value.privacyBoundary.rawParticipantImageAcceptedByThisArtifact !== false
    || value.researchNoteRef !== FR171_RESEARCH_NOTE_REF
    || value.nextFrontier !== FR171_NEXT_FRONTIER
  ) fail('issued C2PA witness credential admission readiness artifact drift.');
}
