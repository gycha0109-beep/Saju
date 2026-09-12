import {
  FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
  FR170_C2PA_EXTERNAL_COMMIT,
  FR170_C2PA_EXTERNAL_REPOSITORY,
  FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
} from './eye-pair-c2pa-external-trust-root-provisioning-fr170.js';
import {
  FR171_NEXT_FRONTIER,
  FR171_PROOFMODE_ANDROID_RECORD_ID,
  FR171_PROOFMODE_IOS_RECORD_ID,
  FR171_PROOFMODE_MIN_VERSION,
  FR171_REQUIRED_MEDIA_TYPE,
  assertIssuedEyePairC2paWitnessCredentialAdmissionReadinessFR171,
  type EyePairC2paWitnessCredentialAdmissionReadinessFR171V1,
} from './eye-pair-c2pa-witness-credential-admission-readiness-fr171.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR172_EYE_PAIR_C2PA_PRODUCTION_VERIFIER_RUNTIME_INTEGRATION_RECORD_ID =
  'research.face_reading.neutral.eye_pair.c2pa_production_verifier_runtime_integration.fr172' as const;
export const FR172_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr172-eye-pair-c2pa-production-verifier-runtime-integration.md' as const;
export const FR172_NEXT_FRONTIER =
  'resolve_governed_participant_media_ingress_resource_policy_then_supply_genuine_new_prospective_original_proofmode_jpeg_and_execute_pinned_verifier' as const;

export const FR172_C2PATOOL_REPOSITORY = 'contentauth/c2pa-rs' as const;
export const FR172_C2PATOOL_TAG = 'c2patool-v0.27.22' as const;
export const FR172_C2PATOOL_VERSION = '0.27.22' as const;
export const FR172_C2PATOOL_TARGET_COMMIT = '1a56d244ee77d7e58221eabebede4281d9e868a4' as const;
export const FR172_C2PATOOL_LINUX_ARCHIVE = 'c2patool-v0.27.22-x86_64-unknown-linux-gnu.tar.gz' as const;
export const FR172_C2PATOOL_LINUX_ARCHIVE_SHA256 =
  '6f138ad53da1a62f1cd6ee71c60727efa27d13b811f4c0ea8c2a8528968b358b' as const;
export const FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA = 'a0d20f58270177608bd96fad331c8ba9a04820ad' as const;
export const FR172_OFFICIAL_MECHANICS_FIXTURE_REPOSITORY = 'contentauth/c2pa-rs' as const;
export const FR172_OFFICIAL_MECHANICS_FIXTURE_REF = 'c2patool-v0.27.22' as const;
export const FR172_OFFICIAL_MECHANICS_FIXTURE_PATH = 'sdk/tests/fixtures/C.jpg' as const;
export const FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA = 'b6579b3281fbd448163f77fe46bf8d24f3e5a018' as const;

const ISSUED = new WeakSet<object>();

export interface EyePairC2paProductionVerifierRuntimeIntegrationFR172V1 {
  readonly schemaVersion: 'fr172-eye-pair-c2pa-production-verifier-runtime-integration-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR172_EYE_PAIR_C2PA_PRODUCTION_VERIFIER_RUNTIME_INTEGRATION_RECORD_ID;
  readonly authorityState: 'pinned_c2pa_production_verifier_runtime_integrated_participant_execution_blocked_on_ingress_policy_and_real_media';
  readonly predecessor: {
    readonly issuedFR171ReadinessRequired: true;
    readonly fr171NextFrontier: typeof FR171_NEXT_FRONTIER;
    readonly actualTrustRootProvisioned: true;
    readonly actualWitnessCredentialAdmitted: false;
    readonly participantMediaAcceptedByFR171: false;
  };
  readonly externalRuntimePin: {
    readonly repository: typeof FR172_C2PATOOL_REPOSITORY;
    readonly tag: typeof FR172_C2PATOOL_TAG;
    readonly targetCommit: typeof FR172_C2PATOOL_TARGET_COMMIT;
    readonly version: typeof FR172_C2PATOOL_VERSION;
    readonly linuxArchive: typeof FR172_C2PATOOL_LINUX_ARCHIVE;
    readonly linuxArchiveSha256: typeof FR172_C2PATOOL_LINUX_ARCHIVE_SHA256;
    readonly releaseArchiveDigestVerificationRequiredBeforeExecution: true;
    readonly arbitraryCallerExecutablePathSufficientForAuthority: false;
    readonly callerSuppliedVerifierJsonSufficientForAuthority: false;
  };
  readonly governancePins: {
    readonly externalRepository: typeof FR170_C2PA_EXTERNAL_REPOSITORY;
    readonly externalCommit: typeof FR170_C2PA_EXTERNAL_COMMIT;
    readonly trustListArtifactRef: typeof FR170_C2PA_TRUST_LIST_ARTIFACT_REF;
    readonly trustListPemBlobSha: typeof FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA;
    readonly conformingProductsBlobSha: typeof FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA;
    readonly proofmodeAndroidRecordId: typeof FR171_PROOFMODE_ANDROID_RECORD_ID;
    readonly proofmodeIosRecordId: typeof FR171_PROOFMODE_IOS_RECORD_ID;
    readonly proofmodeMinimumVersion: typeof FR171_PROOFMODE_MIN_VERSION;
  };
  readonly runtimeCapabilities: {
    readonly officialC2paVerifierReleasePinned: true;
    readonly c2paManifestParserAvailableThroughPinnedRuntime: true;
    readonly claimSignatureValidatorAvailableThroughPinnedRuntime: true;
    readonly signerChainValidatorAvailableThroughPinnedRuntime: true;
    readonly assetContentBindingValidatorAvailableThroughPinnedRuntime: true;
    readonly trustAnchorInjectionAvailableThroughPinnedRuntime: true;
    readonly proofmodeConformingProductPolicyPrepared: true;
    readonly requiredParticipantMediaType: typeof FR171_REQUIRED_MEDIA_TYPE;
    readonly futureParticipantValidationStateMustBeTrusted: true;
    readonly futureTrustedSigningCredentialStatusRequired: 'signingCredential.trusted';
    readonly futureAssetBindingSuccessStatusRequired: 'assertion.dataHash.match';
  };
  readonly mechanicsEvidence: {
    readonly publicOfficialFixtureOnly: true;
    readonly fixtureRepository: typeof FR172_OFFICIAL_MECHANICS_FIXTURE_REPOSITORY;
    readonly fixtureRef: typeof FR172_OFFICIAL_MECHANICS_FIXTURE_REF;
    readonly fixturePath: typeof FR172_OFFICIAL_MECHANICS_FIXTURE_PATH;
    readonly fixtureBlobSha: typeof FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA;
    readonly fixtureMayDemonstrateRuntimeMechanics: true;
    readonly fixtureMayEstablishParticipantWitnessAuthority: false;
    readonly syntheticFixtureMayEstablishParticipantWitnessAuthority: false;
  };
  readonly resourceBoundary: {
    readonly fr145AndFr161EstablishedOnlyNonEmptyBlobRequirement: true;
    readonly inheritedProductionMediaMaximumBytes: null;
    readonly productionIngressByteLimitResolved: false;
    readonly arbitraryByteLimitInventedByFR172: false;
    readonly participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy: false;
  };
  readonly implementationReadiness: {
    readonly productionVerifierRuntimeIntegrationCompleted: true;
    readonly productionC2paManifestParserIntegrated: true;
    readonly productionSignerChainValidatorIntegrated: true;
    readonly productionAssetBindingValidatorIntegrated: true;
    readonly productionProofmodeGeneratorProfilePolicyIntegrated: true;
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
    readonly participantMediaAcceptedByThisIntegrationArtifact: false;
    readonly rawParticipantMediaPersisted: false;
    readonly rawManifestPersisted: false;
    readonly sourceImageDigestPersistedByThisArtifact: false;
    readonly participantDerivedGeometryPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR172_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR172_NEXT_FRONTIER;
}

export interface C2paToolPublicMechanicsObservationFR172V1 {
  readonly schemaVersion: 'fr172-c2patool-public-mechanics-observation-v1';
  readonly evidenceClass: 'official_public_c2pa_fixture_mechanics_only';
  readonly c2patoolVersion: typeof FR172_C2PATOOL_VERSION;
  readonly fixtureBlobSha: typeof FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA;
  readonly validationJson: unknown;
}

export interface C2paToolPublicMechanicsAssessmentFR172V1 {
  readonly activeManifestPresent: true;
  readonly activeManifestResolvable: true;
  readonly validationState: 'Trusted' | 'Valid' | 'Invalid';
  readonly successStatusCodes: readonly string[];
  readonly failureStatusCodes: readonly string[];
  readonly officialRuntimeMechanicsObserved: true;
  readonly participantAuthorityEstablished: false;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-172 ${message}`);
}

function asObject(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) fail(`${label} must be an object.`);
  return value as Record<string, unknown>;
}

function collectCodes(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  const codes: string[] = [];
  for (const item of value) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) continue;
    const code = (item as Record<string, unknown>).code;
    if (typeof code === 'string' && code.length > 0) codes.push(code);
  }
  return Object.freeze(codes);
}

function validatePredecessor(readiness: EyePairC2paWitnessCredentialAdmissionReadinessFR171V1): void {
  assertIssuedEyePairC2paWitnessCredentialAdmissionReadinessFR171(readiness);
  if (
    readiness.nextFrontier !== FR171_NEXT_FRONTIER
    || readiness.predecessor.actualTrustRootProvisioned !== true
    || readiness.predecessor.actualWitnessCredentialAdmitted !== false
    || readiness.requiredRealEvidence.allowedGeneratorProfiles[0].recordId !== FR171_PROOFMODE_ANDROID_RECORD_ID
    || readiness.requiredRealEvidence.allowedGeneratorProfiles[1].recordId !== FR171_PROOFMODE_IOS_RECORD_ID
    || readiness.requiredRealEvidence.allowedGeneratorProfiles[0].minimumVersion !== FR171_PROOFMODE_MIN_VERSION
    || readiness.requiredRealEvidence.allowedGeneratorProfiles[1].minimumVersion !== FR171_PROOFMODE_MIN_VERSION
    || readiness.verificationRequirements.boundedMediaResourcePolicyRequiredBeforeRuntimeAdmission !== true
    || readiness.verificationRequirements.concreteMediaByteLimitIssuedByThisArtifact !== false
    || readiness.implementationReadiness.productionVerifierImplementationCompleted !== false
    || readiness.implementationReadiness.realAdmissionExecutionSucceeded !== false
    || readiness.trustBoundary.actualWitnessCredentialAdmitted !== false
    || readiness.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || readiness.authorityBoundary.identityMatchingPerformed !== false
    || readiness.authorityBoundary.biometricTemplateIssued !== false
    || readiness.authorityBoundary.traditionalSemanticAuthority !== false
    || readiness.prospectiveCollectionBoundary.participantCaptureAcceptedByThisReadinessArtifact !== false
  ) fail('FR-171 predecessor drifted from the fail-closed participant admission boundary.');
}

export function getEyePairC2paProductionVerifierRuntimeIntegrationContractFR172() {
  return Object.freeze({
    issuedFR171ReadinessRequired: true as const,
    officialVerifierRepository: FR172_C2PATOOL_REPOSITORY,
    officialVerifierTag: FR172_C2PATOOL_TAG,
    officialVerifierTargetCommit: FR172_C2PATOOL_TARGET_COMMIT,
    officialVerifierArchiveSha256: FR172_C2PATOOL_LINUX_ARCHIVE_SHA256,
    pinnedTrustListPemBlobSha: FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA,
    callerSuppliedVerifierJsonSufficientForParticipantAuthority: false as const,
    publicOrSyntheticMechanicsFixtureSufficientForParticipantAuthority: false as const,
    productionIngressByteLimitResolved: false as const,
    participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy: false as const,
    participantWitnessAuthorityEstablishedByThisArtifact: false as const,
    issue492AuthorityClosureAllowedByThisArtifact: false as const,
    nextFrontier: FR172_NEXT_FRONTIER,
  });
}

export function issueEyePairC2paProductionVerifierRuntimeIntegrationFR172(
  readiness: EyePairC2paWitnessCredentialAdmissionReadinessFR171V1,
): EyePairC2paProductionVerifierRuntimeIntegrationFR172V1 {
  validatePredecessor(readiness);
  const result: EyePairC2paProductionVerifierRuntimeIntegrationFR172V1 = Object.freeze({
    schemaVersion: 'fr172-eye-pair-c2pa-production-verifier-runtime-integration-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR172_EYE_PAIR_C2PA_PRODUCTION_VERIFIER_RUNTIME_INTEGRATION_RECORD_ID,
    authorityState: 'pinned_c2pa_production_verifier_runtime_integrated_participant_execution_blocked_on_ingress_policy_and_real_media' as const,
    predecessor: Object.freeze({
      issuedFR171ReadinessRequired: true as const,
      fr171NextFrontier: FR171_NEXT_FRONTIER,
      actualTrustRootProvisioned: true as const,
      actualWitnessCredentialAdmitted: false as const,
      participantMediaAcceptedByFR171: false as const,
    }),
    externalRuntimePin: Object.freeze({
      repository: FR172_C2PATOOL_REPOSITORY,
      tag: FR172_C2PATOOL_TAG,
      targetCommit: FR172_C2PATOOL_TARGET_COMMIT,
      version: FR172_C2PATOOL_VERSION,
      linuxArchive: FR172_C2PATOOL_LINUX_ARCHIVE,
      linuxArchiveSha256: FR172_C2PATOOL_LINUX_ARCHIVE_SHA256,
      releaseArchiveDigestVerificationRequiredBeforeExecution: true as const,
      arbitraryCallerExecutablePathSufficientForAuthority: false as const,
      callerSuppliedVerifierJsonSufficientForAuthority: false as const,
    }),
    governancePins: Object.freeze({
      externalRepository: FR170_C2PA_EXTERNAL_REPOSITORY,
      externalCommit: FR170_C2PA_EXTERNAL_COMMIT,
      trustListArtifactRef: FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
      trustListPemBlobSha: FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA,
      conformingProductsBlobSha: FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
      proofmodeAndroidRecordId: FR171_PROOFMODE_ANDROID_RECORD_ID,
      proofmodeIosRecordId: FR171_PROOFMODE_IOS_RECORD_ID,
      proofmodeMinimumVersion: FR171_PROOFMODE_MIN_VERSION,
    }),
    runtimeCapabilities: Object.freeze({
      officialC2paVerifierReleasePinned: true as const,
      c2paManifestParserAvailableThroughPinnedRuntime: true as const,
      claimSignatureValidatorAvailableThroughPinnedRuntime: true as const,
      signerChainValidatorAvailableThroughPinnedRuntime: true as const,
      assetContentBindingValidatorAvailableThroughPinnedRuntime: true as const,
      trustAnchorInjectionAvailableThroughPinnedRuntime: true as const,
      proofmodeConformingProductPolicyPrepared: true as const,
      requiredParticipantMediaType: FR171_REQUIRED_MEDIA_TYPE,
      futureParticipantValidationStateMustBeTrusted: true as const,
      futureTrustedSigningCredentialStatusRequired: 'signingCredential.trusted' as const,
      futureAssetBindingSuccessStatusRequired: 'assertion.dataHash.match' as const,
    }),
    mechanicsEvidence: Object.freeze({
      publicOfficialFixtureOnly: true as const,
      fixtureRepository: FR172_OFFICIAL_MECHANICS_FIXTURE_REPOSITORY,
      fixtureRef: FR172_OFFICIAL_MECHANICS_FIXTURE_REF,
      fixturePath: FR172_OFFICIAL_MECHANICS_FIXTURE_PATH,
      fixtureBlobSha: FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA,
      fixtureMayDemonstrateRuntimeMechanics: true as const,
      fixtureMayEstablishParticipantWitnessAuthority: false as const,
      syntheticFixtureMayEstablishParticipantWitnessAuthority: false as const,
    }),
    resourceBoundary: Object.freeze({
      fr145AndFr161EstablishedOnlyNonEmptyBlobRequirement: true as const,
      inheritedProductionMediaMaximumBytes: null,
      productionIngressByteLimitResolved: false as const,
      arbitraryByteLimitInventedByFR172: false as const,
      participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy: false as const,
    }),
    implementationReadiness: Object.freeze({
      productionVerifierRuntimeIntegrationCompleted: true as const,
      productionC2paManifestParserIntegrated: true as const,
      productionSignerChainValidatorIntegrated: true as const,
      productionAssetBindingValidatorIntegrated: true as const,
      productionProofmodeGeneratorProfilePolicyIntegrated: true as const,
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
      participantMediaAcceptedByThisIntegrationArtifact: false as const,
      rawParticipantMediaPersisted: false as const,
      rawManifestPersisted: false as const,
      sourceImageDigestPersistedByThisArtifact: false as const,
      participantDerivedGeometryPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR172_RESEARCH_NOTE_REF,
    nextFrontier: FR172_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairC2paProductionVerifierRuntimeIntegrationFR172(
  value: EyePairC2paProductionVerifierRuntimeIntegrationFR172V1,
): void {
  if (!ISSUED.has(value as object)) fail('runtime integration artifact was not issued by the active FR-172 boundary.');
  if (
    value.recordId !== FR172_EYE_PAIR_C2PA_PRODUCTION_VERIFIER_RUNTIME_INTEGRATION_RECORD_ID
    || value.externalRuntimePin.linuxArchiveSha256 !== FR172_C2PATOOL_LINUX_ARCHIVE_SHA256
    || value.governancePins.trustListPemBlobSha !== FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA
    || value.resourceBoundary.productionIngressByteLimitResolved !== false
    || value.resourceBoundary.participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy !== false
    || value.implementationReadiness.productionVerifierRuntimeIntegrationCompleted !== true
    || value.implementationReadiness.participantVerifierExecutionSucceeded !== false
    || value.implementationReadiness.issue492AuthorityClosureAllowedByThisArtifact !== false
    || value.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || value.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || value.authorityBoundary.identityMatchingPerformed !== false
    || value.authorityBoundary.biometricTemplateIssued !== false
    || value.authorityBoundary.traditionalSemanticAuthority !== false
    || value.nextFrontier !== FR172_NEXT_FRONTIER
  ) fail('issued production verifier runtime integration authority boundary drift.');
}

export function assessOfficialPublicC2paToolMechanicsFR172(
  integration: EyePairC2paProductionVerifierRuntimeIntegrationFR172V1,
  observation: C2paToolPublicMechanicsObservationFR172V1,
): C2paToolPublicMechanicsAssessmentFR172V1 {
  assertIssuedEyePairC2paProductionVerifierRuntimeIntegrationFR172(integration);
  if (observation.schemaVersion !== 'fr172-c2patool-public-mechanics-observation-v1') {
    fail('public mechanics observation schemaVersion is unsupported.');
  }
  if (observation.evidenceClass !== 'official_public_c2pa_fixture_mechanics_only') {
    fail('only an explicitly non-participant official public fixture may exercise this mechanics surface.');
  }
  if (observation.c2patoolVersion !== FR172_C2PATOOL_VERSION) fail('c2patool version does not match the pinned release.');
  if (observation.fixtureBlobSha !== FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA) {
    fail('public fixture does not match the pinned official Git blob.');
  }
  const root = asObject(observation.validationJson, 'c2patool validation JSON');
  const activeManifest = root.active_manifest;
  if (typeof activeManifest !== 'string' || activeManifest.length === 0) fail('c2patool output must expose an active manifest.');
  const manifests = asObject(root.manifests, 'c2patool manifests');
  if (!(activeManifest in manifests)) fail('active manifest must resolve inside c2patool manifests.');
  const state = root.validation_state;
  if (state !== 'Trusted' && state !== 'Valid' && state !== 'Invalid') {
    fail('c2patool validation_state must be Trusted, Valid, or Invalid.');
  }
  const validationResults = asObject(root.validation_results, 'c2patool validation_results');
  const activeResults = asObject(validationResults.activeManifest, 'c2patool activeManifest validation results');
  return Object.freeze({
    activeManifestPresent: true as const,
    activeManifestResolvable: true as const,
    validationState: state,
    successStatusCodes: collectCodes(activeResults.success),
    failureStatusCodes: collectCodes(activeResults.failure),
    officialRuntimeMechanicsObserved: true as const,
    participantAuthorityEstablished: false as const,
  });
}
