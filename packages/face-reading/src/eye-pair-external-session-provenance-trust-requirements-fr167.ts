import {
  FR166_CRITERION_SPECIFIC_PRECEDENT_REFS,
  FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID,
} from './eye-pair-post-fr165-authority-frontier-review-fr166.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR167_EYE_PAIR_EXTERNAL_SESSION_PROVENANCE_TRUST_REQUIREMENTS_RECORD_ID =
  'research.face_reading.neutral.eye_pair.external_session_provenance_trust_requirements.fr167' as const;
export const FR167_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr167-eye-pair-external-session-provenance-trust-requirements.md' as const;
export const FR167_NEXT_FRONTIER =
  'provision_and_review_eye_pair_external_witness_trust_root_before_collecting_authority_promotable_sessions' as const;

const ISSUED = new WeakSet<object>();

export interface EyePairExternalSessionProvenanceTrustRequirementsFR167V1 {
  readonly schemaVersion: 'fr167-eye-pair-external-session-provenance-trust-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR167_EYE_PAIR_EXTERNAL_SESSION_PROVENANCE_TRUST_REQUIREMENTS_RECORD_ID;
  readonly authorityState: 'eye_pair_external_session_provenance_trust_requirements_frozen_only';
  readonly predecessorRecordId: typeof FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID;
  readonly requirementsBoundary: {
    readonly prospectiveApplicationRequired: true;
    readonly externalOperatorIndependentWitnessRequired: true;
    readonly governedWitnessProvenanceRequired: true;
    readonly deterministicWitnessArtifactVerificationRequired: true;
    readonly captureToWitnessBindingRequired: true;
    readonly trustRootIndependentProvisioningRequired: true;
    readonly trustRootGovernancePinningRequired: true;
    readonly exactTrustMaterialBindingRequired: true;
    readonly eyePairCriterionScopeBindingRequired: true;
    readonly witnessAuthorityScopeBindingRequired: true;
    readonly witnessValidityWindowOrEquivalentProspectiveBindingRequired: true;
  };
  readonly insufficiencyBoundary: {
    readonly byteDistinctCaptureAloneSufficient: false;
    readonly metadataTimestampAloneSufficient: false;
    readonly uploadSeparationAloneSufficient: false;
    readonly callerSelfAttestationAloneSufficient: false;
    readonly opaqueSessionRefAloneSufficient: false;
    readonly callerSuppliedPublicKeyAloneSufficient: false;
    readonly callerSuppliedTrustRootRefAloneSufficient: false;
    readonly digestEqualityAloneSufficient: false;
    readonly mathematicalSignatureValidityAloneSufficient: false;
    readonly selfSignedCredentialAloneSufficient: false;
    readonly syntheticCredentialAloneSufficient: false;
    readonly candidateTrustRootMaterialIntakeMeansTrustedAuthority: false;
  };
  readonly precedentBoundary: {
    readonly refs: typeof FR166_CRITERION_SPECIFIC_PRECEDENT_REFS;
    readonly squareBroadFangArtifactsAreDesignPrecedentOnly: true;
    readonly squareBroadFangAuthorityInheritedByEyePair: false;
    readonly crossCriterionTrustRootReuseWithoutExplicitEyePairAdmissionAllowed: false;
  };
  readonly prospectiveCollectionBoundary: {
    readonly existingFR163ToFR165SessionsRetrospectivelyPromotable: false;
    readonly newParticipantCaptureRequiredToFreezeTheseRequirements: false;
    readonly authorityPromotableCaptureAllowedBeforeTrustPathProvisionedAndReviewed: false;
    readonly ordinaryFR165CaptureMayContinueForDescriptionOnly: true;
    readonly ordinaryFR165CaptureCreatesIndependentSessionAuthority: false;
  };
  readonly authorityBoundary: {
    readonly requirementsFrozen: true;
    readonly actualTrustRootProvisioned: false;
    readonly actualWitnessCredentialAdmitted: false;
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
  readonly privacyBoundary: {
    readonly rawImageAccepted: false;
    readonly participantDerivedNumericMetricInputAccepted: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly participantDerivedNumericMetricValuesPersisted: false;
    readonly sourceDigestPersisted: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR167_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR167_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-167 ${message}`);
}

export function issueEyePairExternalSessionProvenanceTrustRequirementsFR167(): EyePairExternalSessionProvenanceTrustRequirementsFR167V1 {
  const result: EyePairExternalSessionProvenanceTrustRequirementsFR167V1 = Object.freeze({
    schemaVersion: 'fr167-eye-pair-external-session-provenance-trust-requirements-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR167_EYE_PAIR_EXTERNAL_SESSION_PROVENANCE_TRUST_REQUIREMENTS_RECORD_ID,
    authorityState: 'eye_pair_external_session_provenance_trust_requirements_frozen_only' as const,
    predecessorRecordId: FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID,
    requirementsBoundary: Object.freeze({
      prospectiveApplicationRequired: true as const,
      externalOperatorIndependentWitnessRequired: true as const,
      governedWitnessProvenanceRequired: true as const,
      deterministicWitnessArtifactVerificationRequired: true as const,
      captureToWitnessBindingRequired: true as const,
      trustRootIndependentProvisioningRequired: true as const,
      trustRootGovernancePinningRequired: true as const,
      exactTrustMaterialBindingRequired: true as const,
      eyePairCriterionScopeBindingRequired: true as const,
      witnessAuthorityScopeBindingRequired: true as const,
      witnessValidityWindowOrEquivalentProspectiveBindingRequired: true as const,
    }),
    insufficiencyBoundary: Object.freeze({
      byteDistinctCaptureAloneSufficient: false as const,
      metadataTimestampAloneSufficient: false as const,
      uploadSeparationAloneSufficient: false as const,
      callerSelfAttestationAloneSufficient: false as const,
      opaqueSessionRefAloneSufficient: false as const,
      callerSuppliedPublicKeyAloneSufficient: false as const,
      callerSuppliedTrustRootRefAloneSufficient: false as const,
      digestEqualityAloneSufficient: false as const,
      mathematicalSignatureValidityAloneSufficient: false as const,
      selfSignedCredentialAloneSufficient: false as const,
      syntheticCredentialAloneSufficient: false as const,
      candidateTrustRootMaterialIntakeMeansTrustedAuthority: false as const,
    }),
    precedentBoundary: Object.freeze({
      refs: FR166_CRITERION_SPECIFIC_PRECEDENT_REFS,
      squareBroadFangArtifactsAreDesignPrecedentOnly: true as const,
      squareBroadFangAuthorityInheritedByEyePair: false as const,
      crossCriterionTrustRootReuseWithoutExplicitEyePairAdmissionAllowed: false as const,
    }),
    prospectiveCollectionBoundary: Object.freeze({
      existingFR163ToFR165SessionsRetrospectivelyPromotable: false as const,
      newParticipantCaptureRequiredToFreezeTheseRequirements: false as const,
      authorityPromotableCaptureAllowedBeforeTrustPathProvisionedAndReviewed: false as const,
      ordinaryFR165CaptureMayContinueForDescriptionOnly: true as const,
      ordinaryFR165CaptureCreatesIndependentSessionAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      requirementsFrozen: true as const,
      actualTrustRootProvisioned: false as const,
      actualWitnessCredentialAdmitted: false as const,
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
    privacyBoundary: Object.freeze({
      rawImageAccepted: false as const,
      participantDerivedNumericMetricInputAccepted: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      participantDerivedNumericMetricValuesPersisted: false as const,
      sourceDigestPersisted: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR167_RESEARCH_NOTE_REF,
    nextFrontier: FR167_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairExternalSessionProvenanceTrustRequirementsFR167(
  result: EyePairExternalSessionProvenanceTrustRequirementsFR167V1,
): void {
  if (!ISSUED.has(result)) fail('requirements artifact was not issued by the active FR-167 boundary.');
  if (
    result.schemaVersion !== 'fr167-eye-pair-external-session-provenance-trust-requirements-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR167_EYE_PAIR_EXTERNAL_SESSION_PROVENANCE_TRUST_REQUIREMENTS_RECORD_ID
    || result.authorityState !== 'eye_pair_external_session_provenance_trust_requirements_frozen_only'
    || result.predecessorRecordId !== FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID
    || Object.values(result.requirementsBoundary).some((value) => value !== true)
    || Object.values(result.insufficiencyBoundary).some((value) => value !== false)
    || result.precedentBoundary.refs !== FR166_CRITERION_SPECIFIC_PRECEDENT_REFS
    || result.precedentBoundary.squareBroadFangArtifactsAreDesignPrecedentOnly !== true
    || result.precedentBoundary.squareBroadFangAuthorityInheritedByEyePair !== false
    || result.precedentBoundary.crossCriterionTrustRootReuseWithoutExplicitEyePairAdmissionAllowed !== false
    || result.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || result.prospectiveCollectionBoundary.newParticipantCaptureRequiredToFreezeTheseRequirements !== false
    || result.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedBeforeTrustPathProvisionedAndReviewed !== false
    || result.prospectiveCollectionBoundary.ordinaryFR165CaptureMayContinueForDescriptionOnly !== true
    || result.prospectiveCollectionBoundary.ordinaryFR165CaptureCreatesIndependentSessionAuthority !== false
    || result.authorityBoundary.requirementsFrozen !== true
    || result.authorityBoundary.actualTrustRootProvisioned !== false
    || result.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || result.authorityBoundary.externalWitnessAuthorityEstablished !== false
    || result.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || result.authorityBoundary.multiSessionIndependenceVerified !== false
    || result.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.captureQualityValidated !== false
    || result.authorityBoundary.inferentialStatisticIssued !== false
    || result.authorityBoundary.repeatabilityPassFailIssued !== false
    || result.authorityBoundary.captureSensitivityPassFailIssued !== false
    || result.authorityBoundary.calibrationIssued !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.biometricTemplateIssued !== false
    || result.authorityBoundary.constructValidity !== 'unresolved'
    || result.authorityBoundary.traditionalBinding !== 'unresolved'
    || result.authorityBoundary.traditionalSemanticAuthority !== false
    || Object.values(result.privacyBoundary).some((value) => value !== false)
    || result.researchNoteRef !== FR167_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR167_NEXT_FRONTIER
  ) fail('issued external session-provenance trust requirements boundary drift.');
}
