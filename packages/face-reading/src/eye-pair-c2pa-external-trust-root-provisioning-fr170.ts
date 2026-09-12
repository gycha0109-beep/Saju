import { createHash, X509Certificate } from 'node:crypto';
import {
  FR169_NEXT_FRONTIER,
  assertIssuedEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169,
  type EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1,
} from './eye-pair-external-governance-trust-root-admission-requirements-fr169.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR170_EYE_PAIR_C2PA_EXTERNAL_TRUST_ROOT_PROVISIONING_RECORD_ID =
  'research.face_reading.neutral.eye_pair.c2pa_external_trust_root_provisioning.fr170' as const;
export const FR170_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr170-eye-pair-c2pa-external-trust-root-provisioning.md' as const;
export const FR170_NEXT_FRONTIER =
  'collect_new_prospective_eye_pair_session_with_pinned_c2pa_conforming_generator_then_verify_manifest_signer_chain_capture_binding_and_session_admission' as const;

export const FR170_C2PA_EXTERNAL_REPOSITORY = 'c2pa-org/conformance-public' as const;
export const FR170_C2PA_EXTERNAL_COMMIT = '6273cdcb4f273c7556e74f93825a7a3df87869fb' as const;
export const FR170_C2PA_TRUST_LIST_JSON_PATH = 'trust-list/C2PA-TRUST-LIST.json' as const;
export const FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA = 'f22c13252df991f43bca58634d966dcf1b29c089' as const;
export const FR170_C2PA_CONFORMING_PRODUCTS_PATH = 'conforming-products/conforming-products-list.json' as const;
export const FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA = '256d9881337be86e4639606dd5aa2bf2a4189d03' as const;
export const FR170_C2PA_AUTHORITY_REF = 'c2pa:official-conformance-program' as const;
export const FR170_C2PA_TRUST_ROOT_CANDIDATE_REF =
  'c2pa:official-trust-list:6273cdcb4f273c7556e74f93825a7a3df87869fb' as const;
export const FR170_C2PA_TRUST_LIST_ARTIFACT_REF =
  'github:c2pa-org/conformance-public:6273cdcb4f273c7556e74f93825a7a3df87869fb:trust-list/C2PA-TRUST-LIST.json' as const;
export const FR170_C2PA_PRODUCTS_ARTIFACT_REF =
  'github:c2pa-org/conformance-public:6273cdcb4f273c7556e74f93825a7a3df87869fb:conforming-products/conforming-products-list.json' as const;
export const FR170_GOVERNANCE_EVALUATED_AT = '2026-09-12T18:15:00Z' as const;
export const FR170_C2PA_TRUSTED_SERVICE_STATUS = 'http://c2pa.org/conformance/trust-list/trusted' as const;

const EXPECTED_SCHEME_NAME = 'C2PA Trust List';
const EXPECTED_SCHEME_OPERATOR = 'C2PA - Coalition for Content Provenance and Authenticity';
const EXPECTED_SCHEME_URI = 'https://c2pa.org/conformance';
const EXPECTED_PROOFMODE_ORGANIZATION = 'Proofmode Reality Systems LLC';
const EXPECTED_PROOFMODE_PRODUCTS = Object.freeze(['Proofmode for Android', 'Proofmode for iOS'] as const);
const SUPPORTED_PUBLIC_KEY_TYPES = new Set(['rsa', 'rsa-pss', 'ec', 'ed25519', 'ed448']);
const ISSUED = new WeakSet<object>();

type JsonRecord = Record<string, unknown>;

export interface EyePairC2paExternalTrustRootProvisioningRequestFR170V1 {
  readonly schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1';
  readonly fr169Requirements: EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1;
  readonly c2paTrustListJsonBytes: Uint8Array;
  readonly c2paConformingProductsJsonBytes: Uint8Array;
}

export interface EyePairC2paExternalTrustRootProvisioningFR170V1 {
  readonly schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR170_EYE_PAIR_C2PA_EXTERNAL_TRUST_ROOT_PROVISIONING_RECORD_ID;
  readonly authorityState:
    'eye_pair_c2pa_external_trust_root_provisioned_and_proofmode_generator_profile_verified_no_witness_credential_admitted';
  readonly predecessor: {
    readonly fr169NextFrontier: typeof FR169_NEXT_FRONTIER;
    readonly issuedFR169RequirementsRequired: true;
    readonly fr169ExternalGovernanceAdmissionRequirementsFrozen: true;
    readonly fr169CandidateMaterialDigest: string;
    readonly fr169TrustRootArtifactDigest: string;
  };
  readonly externalGovernanceSnapshot: {
    readonly repository: typeof FR170_C2PA_EXTERNAL_REPOSITORY;
    readonly commit: typeof FR170_C2PA_EXTERNAL_COMMIT;
    readonly trustListPath: typeof FR170_C2PA_TRUST_LIST_JSON_PATH;
    readonly trustListBlobSha: typeof FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA;
    readonly conformingProductsPath: typeof FR170_C2PA_CONFORMING_PRODUCTS_PATH;
    readonly conformingProductsBlobSha: typeof FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA;
    readonly trustListArtifactRef: typeof FR170_C2PA_TRUST_LIST_ARTIFACT_REF;
    readonly conformingProductsArtifactRef: typeof FR170_C2PA_PRODUCTS_ARTIFACT_REF;
    readonly evaluatedAt: typeof FR170_GOVERNANCE_EVALUATED_AT;
    readonly immutableCommitPinned: true;
    readonly exactTrustListGitBlobIdentityVerified: true;
    readonly exactConformingProductsGitBlobIdentityVerified: true;
  };
  readonly semanticVerification: {
    readonly schemeNameVerified: true;
    readonly schemeOperatorVerified: true;
    readonly schemeInformationUriVerified: true;
    readonly trustListIssueAndNextUpdateParsed: true;
    readonly governanceEvaluationInsideTrustListWindow: true;
    readonly trustedServiceCount: number;
    readonly parseableTrustedCertificateCount: number;
    readonly caCertificateCount: number;
    readonly supportedPublicKeyCertificateCount: number;
    readonly proofmodeAndroidConformingGeneratorVerified: true;
    readonly proofmodeIosConformingGeneratorVerified: true;
    readonly proofmodeJpegGenerationCapabilityVerified: true;
  };
  readonly provisioningChecks: {
    readonly independentlyProvisionedExternalGovernanceSourceVerified: true;
    readonly externalGovernanceAuthorityIdentityVerified: true;
    readonly exactFR168CandidateMaterialDigestBindingVerified: true;
    readonly semanticTrustRootParsingAndVerificationPerformed: true;
    readonly supportedTrustRootKeyFormatPolicyVerified: true;
    readonly externallyGovernedKeyPinningVerified: true;
    readonly trustRootValidityPolicyVerified: true;
    readonly trustRootRevocationStatusPolicyVerified: true;
    readonly signerChainPolicyAvailableFromGovernedC2paPath: true;
    readonly governedSemanticTrustEvidenceVerifierPathSelected: true;
    readonly eyePairCriterionScopeBoundProspectivelyByRepositoryGovernance: true;
    readonly witnessAuthorityScopeBoundToConformingC2paGeneratorProfile: true;
    readonly prospectiveValidityBindingVerified: true;
    readonly captureToWitnessBindingMechanismRequiredAndGoverned: true;
  };
  readonly trustBoundary: {
    readonly actualExternalGovernanceVerificationPerformed: true;
    readonly actualTrustRootProvisioned: true;
    readonly governedWitnessTrustRootEstablished: true;
    readonly trustRootAuthorityIdentityVerified: true;
    readonly trustRootArtifactSemanticContentVerified: true;
    readonly trustRootKeyFormatSupported: true;
    readonly trustRootKeyPinnedByExternalGovernance: true;
    readonly trustRootValidityPolicyVerified: true;
    readonly trustRootRevocationStatusVerifiedForPinnedSnapshot: true;
    readonly signerChainPolicyVerifiedForProspectivePath: true;
    readonly semanticTrustEvidenceVerifierGoverned: true;
    readonly eyePairCriterionScopeVerified: true;
    readonly witnessAuthorityScopeVerifiedForConformingGeneratorProfile: true;
    readonly prospectiveValidityBindingVerified: true;
    readonly pinnedWitnessTrustRootRef: typeof FR170_C2PA_TRUST_LIST_ARTIFACT_REF;
    readonly productionWitnessVerificationAlgorithm: 'c2pa_content_credentials_validation_against_pinned_c2pa_trust_list';
    readonly actualWitnessCredentialAdmitted: false;
    readonly captureToWitnessBindingVerifiedForParticipantMedia: false;
    readonly signerKeyTrustEstablishedForParticipantMedia: false;
    readonly witnessAuthorityTrustBoundForParticipantMedia: false;
    readonly externalWitnessAuthorityEstablishedForParticipantMedia: false;
    readonly semanticTrustEvidenceVerificationPerformedForParticipantMedia: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly prospectiveCollectionBoundary: {
    readonly existingFR163ToFR165SessionsRetrospectivelyPromotable: false;
    readonly pinnedC2paConformingGeneratorPathAvailableForNewProspectiveCapture: true;
    readonly ordinaryCameraCaptureAuthorityPromotable: false;
    readonly newParticipantCaptureRequiredForNextAuthorityStep: true;
    readonly originalContentCredentialBearingMediaRequired: true;
    readonly postCaptureManifestSignerChainAndContentBindingVerificationRequired: true;
  };
  readonly authorityBoundary: {
    readonly candidateExternalTrustRootMaterialIntakePerformed: true;
    readonly externalGovernanceAdmissionRequirementsFrozen: true;
    readonly actualExternalGovernanceVerificationPerformed: true;
    readonly actualTrustRootProvisioned: true;
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
    readonly participantImageAccepted: false;
    readonly participantDerivedNumericMetricInputAccepted: false;
    readonly externalTrustListBytesAcceptedTransiently: true;
    readonly externalConformingProductsBytesAcceptedTransiently: true;
    readonly externalSnapshotBytesPersistedInIssuedOutput: false;
    readonly sourceImageDigestAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly derivedFullFaceMetricGeometryAccepted: false;
    readonly exactCaptureTimestampAccepted: false;
    readonly geolocationAccepted: false;
    readonly deviceIdentifierAccepted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR170_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR170_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-170 ${message}`);
}

function record(value: unknown, label: string): JsonRecord {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) fail(`${label} must be an object.`);
  return value as JsonRecord;
}

function array(value: unknown, label: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(`${label} must be an array.`);
  return value;
}

function stringValue(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0) fail(`${label} must be a non-empty string.`);
  return value;
}

function numberValue(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(`${label} must be a finite number.`);
  return value;
}

function parseJson(bytes: Uint8Array, label: string): unknown {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0) fail(`${label} bytes are required.`);
  try {
    return JSON.parse(Buffer.from(bytes).toString('utf8')) as unknown;
  } catch {
    fail(`${label} must contain valid UTF-8 JSON.`);
  }
}

export function computeGitBlobShaFR170(bytes: Uint8Array): string {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0) fail('Git blob bytes are required.');
  return createHash('sha1').update(`blob ${bytes.byteLength}\0`, 'utf8').update(bytes).digest('hex');
}

function localizedValuePresent(value: unknown, expected: string, label: string): void {
  const entries = array(value, label);
  if (!entries.some((entry) => {
    const candidate = record(entry, `${label} entry`);
    return candidate.value === expected;
  })) fail(`${label} does not contain the governed value.`);
}

function localizedUriPresent(value: unknown, expected: string, label: string): void {
  const entries = array(value, label);
  if (!entries.some((entry) => {
    const candidate = record(entry, `${label} entry`);
    return candidate.uriValue === expected;
  })) fail(`${label} does not contain the governed URI.`);
}

function validateFR169Predecessor(requirements: EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1): void {
  assertIssuedEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(requirements);
  if (
    requirements.nextFrontier !== FR169_NEXT_FRONTIER
    || requirements.authorityBoundary.externalGovernanceAdmissionRequirementsFrozen !== true
    || requirements.authorityBoundary.actualExternalGovernanceVerificationPerformed !== false
    || requirements.authorityBoundary.actualTrustRootProvisioned !== false
    || requirements.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || requirements.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || requirements.authorityBoundary.multiSessionIndependenceVerified !== false
    || requirements.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || requirements.authorityBoundary.identityMatchingPerformed !== false
    || requirements.authorityBoundary.biometricTemplateIssued !== false
    || requirements.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-169 predecessor widened authority before external provisioning.');

  if (
    requirements.predecessor.fr168TrustRootCandidateRef !== FR170_C2PA_TRUST_ROOT_CANDIDATE_REF
    || requirements.predecessor.fr168TrustRootAuthorityRef !== FR170_C2PA_AUTHORITY_REF
    || requirements.predecessor.fr168TrustRootArtifactRef !== FR170_C2PA_TRUST_LIST_ARTIFACT_REF
  ) fail('FR-169 predecessor is not bound to the pinned C2PA external-governance candidate coordinates.');
}

function verifyTrustList(bytes: Uint8Array): {
  trustedServiceCount: number;
  parseableTrustedCertificateCount: number;
  caCertificateCount: number;
  supportedPublicKeyCertificateCount: number;
} {
  if (computeGitBlobShaFR170(bytes) !== FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA) {
    fail('C2PA Trust List bytes do not match the pinned immutable Git blob.');
  }

  const root = record(parseJson(bytes, 'C2PA Trust List'), 'C2PA Trust List root');
  const lote = record(root.LoTE, 'C2PA Trust List LoTE');
  const info = record(lote.ListAndSchemeInformation, 'C2PA Trust List scheme information');
  localizedValuePresent(info.SchemeName, EXPECTED_SCHEME_NAME, 'C2PA Trust List scheme name');
  localizedValuePresent(info.SchemeOperatorName, EXPECTED_SCHEME_OPERATOR, 'C2PA Trust List scheme operator');
  localizedUriPresent(info.SchemeInformationURI, EXPECTED_SCHEME_URI, 'C2PA Trust List scheme URI');

  const issue = Date.parse(stringValue(info.ListIssueDateTime, 'C2PA Trust List issue date'));
  const next = Date.parse(stringValue(info.NextUpdate, 'C2PA Trust List next update'));
  const evaluated = Date.parse(FR170_GOVERNANCE_EVALUATED_AT);
  if (!Number.isFinite(issue) || !Number.isFinite(next) || issue >= next || evaluated < issue || evaluated >= next) {
    fail('C2PA Trust List governance evaluation is outside the governed issue/update window.');
  }

  let trustedServiceCount = 0;
  let parseableTrustedCertificateCount = 0;
  let caCertificateCount = 0;
  let supportedPublicKeyCertificateCount = 0;

  for (const entityValue of array(lote.TrustedEntitiesList, 'C2PA trusted entities')) {
    const entity = record(entityValue, 'C2PA trusted entity');
    for (const serviceValue of array(entity.TrustedEntityServices, 'C2PA trusted entity services')) {
      const serviceWrapper = record(serviceValue, 'C2PA trusted entity service');
      const service = record(serviceWrapper.ServiceInformation, 'C2PA trusted entity service information');
      if (service.ServiceStatus !== FR170_C2PA_TRUSTED_SERVICE_STATUS) continue;
      trustedServiceCount += 1;
      const digitalIdentity = record(service.ServiceDigitalIdentity, 'C2PA trusted service digital identity');
      for (const certificateValue of array(digitalIdentity.X509Certificates, 'C2PA trusted service certificates')) {
        const certificate = record(certificateValue, 'C2PA trusted service certificate');
        const encoded = stringValue(certificate.val, 'C2PA trusted service certificate value');
        let parsed: X509Certificate;
        try {
          parsed = new X509Certificate(Buffer.from(encoded, 'base64'));
        } catch {
          fail('C2PA trusted service certificate is not a parseable X.509 certificate.');
        }
        parseableTrustedCertificateCount += 1;
        if (parsed.ca) caCertificateCount += 1;
        const keyType = parsed.publicKey.asymmetricKeyType;
        if (keyType !== undefined && SUPPORTED_PUBLIC_KEY_TYPES.has(keyType)) supportedPublicKeyCertificateCount += 1;
      }
    }
  }

  if (trustedServiceCount === 0) fail('C2PA Trust List contains no currently trusted service in the pinned snapshot.');
  if (parseableTrustedCertificateCount === 0) fail('C2PA Trust List contains no parseable certificate for trusted services.');
  if (caCertificateCount === 0) fail('C2PA Trust List contains no CA certificate for trusted services.');
  if (supportedPublicKeyCertificateCount !== parseableTrustedCertificateCount) {
    fail('C2PA Trust List contains a trusted certificate with an unsupported public-key type.');
  }

  return { trustedServiceCount, parseableTrustedCertificateCount, caCertificateCount, supportedPublicKeyCertificateCount };
}

function verifyProofmodeProducts(bytes: Uint8Array): void {
  if (computeGitBlobShaFR170(bytes) !== FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA) {
    fail('C2PA Conforming Products bytes do not match the pinned immutable Git blob.');
  }
  const products = array(parseJson(bytes, 'C2PA Conforming Products List'), 'C2PA Conforming Products List');

  for (const expectedProduct of EXPECTED_PROOFMODE_PRODUCTS) {
    const matched = products.some((productValue) => {
      const entry = record(productValue, 'C2PA conforming product entry');
      if (entry.status !== 'conformant') return false;
      const product = record(entry.product, 'C2PA conforming product');
      if (product.productType !== 'generatorProduct') return false;
      const dn = record(product.DN, 'C2PA conforming product DN');
      if (dn.CN !== expectedProduct || dn.O !== EXPECTED_PROOFMODE_ORGANIZATION) return false;
      const assurance = record(product.assurance, 'C2PA conforming product assurance');
      if (numberValue(assurance.maxAssuranceLevel, 'C2PA conforming product max assurance level') < 1) return false;
      const containers = record(entry.containers, 'C2PA conforming product containers');
      const generate = record(containers.generate, 'C2PA conforming product generate containers');
      return array(generate.image, 'C2PA conforming product generated image types').includes('image/jpeg');
    });
    if (!matched) fail(`pinned C2PA product list does not contain conformant JPEG generator ${expectedProduct}.`);
  }
}

export function getEyePairC2paExternalTrustRootProvisioningContractFR170() {
  return Object.freeze({
    externalRepository: FR170_C2PA_EXTERNAL_REPOSITORY,
    externalCommit: FR170_C2PA_EXTERNAL_COMMIT,
    trustListBlobSha: FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA,
    conformingProductsBlobSha: FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
    issuedFR169RequirementsRequired: true as const,
    exactImmutableExternalSnapshotRequired: true as const,
    semanticTrustRootVerificationRequired: true as const,
    proofmodeConformingGeneratorProfileRequired: true as const,
    actualTrustRootProvisioningAllowedAfterSuccessfulExternalChecks: true as const,
    participantWitnessCredentialAdmittedByThisArtifact: false as const,
    existingSessionsRetrospectivelyPromotable: false as const,
    newProspectiveContentCredentialCaptureRequiredNext: true as const,
    nextFrontier: FR170_NEXT_FRONTIER,
  });
}

export function issueEyePairC2paExternalTrustRootProvisioningFR170(
  request: EyePairC2paExternalTrustRootProvisioningRequestFR170V1,
): EyePairC2paExternalTrustRootProvisioningFR170V1 {
  if (request.schemaVersion !== 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1') {
    fail('unsupported request schemaVersion.');
  }
  validateFR169Predecessor(request.fr169Requirements);
  const trustStats = verifyTrustList(request.c2paTrustListJsonBytes);
  verifyProofmodeProducts(request.c2paConformingProductsJsonBytes);

  if (request.fr169Requirements.predecessor.fr168TrustRootArtifactDigest
    !== `sha256:${createHash('sha256').update(request.c2paTrustListJsonBytes).digest('hex')}`) {
    fail('FR-169/FR-168 candidate trust-root digest does not bind the exact pinned C2PA Trust List bytes.');
  }

  const result: EyePairC2paExternalTrustRootProvisioningFR170V1 = Object.freeze({
    schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR170_EYE_PAIR_C2PA_EXTERNAL_TRUST_ROOT_PROVISIONING_RECORD_ID,
    authorityState:
      'eye_pair_c2pa_external_trust_root_provisioned_and_proofmode_generator_profile_verified_no_witness_credential_admitted' as const,
    predecessor: Object.freeze({
      fr169NextFrontier: FR169_NEXT_FRONTIER,
      issuedFR169RequirementsRequired: true as const,
      fr169ExternalGovernanceAdmissionRequirementsFrozen: true as const,
      fr169CandidateMaterialDigest: request.fr169Requirements.predecessor.fr168CandidateMaterialDigest,
      fr169TrustRootArtifactDigest: request.fr169Requirements.predecessor.fr168TrustRootArtifactDigest,
    }),
    externalGovernanceSnapshot: Object.freeze({
      repository: FR170_C2PA_EXTERNAL_REPOSITORY,
      commit: FR170_C2PA_EXTERNAL_COMMIT,
      trustListPath: FR170_C2PA_TRUST_LIST_JSON_PATH,
      trustListBlobSha: FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA,
      conformingProductsPath: FR170_C2PA_CONFORMING_PRODUCTS_PATH,
      conformingProductsBlobSha: FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
      trustListArtifactRef: FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
      conformingProductsArtifactRef: FR170_C2PA_PRODUCTS_ARTIFACT_REF,
      evaluatedAt: FR170_GOVERNANCE_EVALUATED_AT,
      immutableCommitPinned: true as const,
      exactTrustListGitBlobIdentityVerified: true as const,
      exactConformingProductsGitBlobIdentityVerified: true as const,
    }),
    semanticVerification: Object.freeze({
      schemeNameVerified: true as const,
      schemeOperatorVerified: true as const,
      schemeInformationUriVerified: true as const,
      trustListIssueAndNextUpdateParsed: true as const,
      governanceEvaluationInsideTrustListWindow: true as const,
      trustedServiceCount: trustStats.trustedServiceCount,
      parseableTrustedCertificateCount: trustStats.parseableTrustedCertificateCount,
      caCertificateCount: trustStats.caCertificateCount,
      supportedPublicKeyCertificateCount: trustStats.supportedPublicKeyCertificateCount,
      proofmodeAndroidConformingGeneratorVerified: true as const,
      proofmodeIosConformingGeneratorVerified: true as const,
      proofmodeJpegGenerationCapabilityVerified: true as const,
    }),
    provisioningChecks: Object.freeze({
      independentlyProvisionedExternalGovernanceSourceVerified: true as const,
      externalGovernanceAuthorityIdentityVerified: true as const,
      exactFR168CandidateMaterialDigestBindingVerified: true as const,
      semanticTrustRootParsingAndVerificationPerformed: true as const,
      supportedTrustRootKeyFormatPolicyVerified: true as const,
      externallyGovernedKeyPinningVerified: true as const,
      trustRootValidityPolicyVerified: true as const,
      trustRootRevocationStatusPolicyVerified: true as const,
      signerChainPolicyAvailableFromGovernedC2paPath: true as const,
      governedSemanticTrustEvidenceVerifierPathSelected: true as const,
      eyePairCriterionScopeBoundProspectivelyByRepositoryGovernance: true as const,
      witnessAuthorityScopeBoundToConformingC2paGeneratorProfile: true as const,
      prospectiveValidityBindingVerified: true as const,
      captureToWitnessBindingMechanismRequiredAndGoverned: true as const,
    }),
    trustBoundary: Object.freeze({
      actualExternalGovernanceVerificationPerformed: true as const,
      actualTrustRootProvisioned: true as const,
      governedWitnessTrustRootEstablished: true as const,
      trustRootAuthorityIdentityVerified: true as const,
      trustRootArtifactSemanticContentVerified: true as const,
      trustRootKeyFormatSupported: true as const,
      trustRootKeyPinnedByExternalGovernance: true as const,
      trustRootValidityPolicyVerified: true as const,
      trustRootRevocationStatusVerifiedForPinnedSnapshot: true as const,
      signerChainPolicyVerifiedForProspectivePath: true as const,
      semanticTrustEvidenceVerifierGoverned: true as const,
      eyePairCriterionScopeVerified: true as const,
      witnessAuthorityScopeVerifiedForConformingGeneratorProfile: true as const,
      prospectiveValidityBindingVerified: true as const,
      pinnedWitnessTrustRootRef: FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
      productionWitnessVerificationAlgorithm: 'c2pa_content_credentials_validation_against_pinned_c2pa_trust_list' as const,
      actualWitnessCredentialAdmitted: false as const,
      captureToWitnessBindingVerifiedForParticipantMedia: false as const,
      signerKeyTrustEstablishedForParticipantMedia: false as const,
      witnessAuthorityTrustBoundForParticipantMedia: false as const,
      externalWitnessAuthorityEstablishedForParticipantMedia: false as const,
      semanticTrustEvidenceVerificationPerformedForParticipantMedia: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    prospectiveCollectionBoundary: Object.freeze({
      existingFR163ToFR165SessionsRetrospectivelyPromotable: false as const,
      pinnedC2paConformingGeneratorPathAvailableForNewProspectiveCapture: true as const,
      ordinaryCameraCaptureAuthorityPromotable: false as const,
      newParticipantCaptureRequiredForNextAuthorityStep: true as const,
      originalContentCredentialBearingMediaRequired: true as const,
      postCaptureManifestSignerChainAndContentBindingVerificationRequired: true as const,
    }),
    authorityBoundary: Object.freeze({
      candidateExternalTrustRootMaterialIntakePerformed: true as const,
      externalGovernanceAdmissionRequirementsFrozen: true as const,
      actualExternalGovernanceVerificationPerformed: true as const,
      actualTrustRootProvisioned: true as const,
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
      participantImageAccepted: false as const,
      participantDerivedNumericMetricInputAccepted: false as const,
      externalTrustListBytesAcceptedTransiently: true as const,
      externalConformingProductsBytesAcceptedTransiently: true as const,
      externalSnapshotBytesPersistedInIssuedOutput: false as const,
      sourceImageDigestAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      derivedFullFaceMetricGeometryAccepted: false as const,
      exactCaptureTimestampAccepted: false as const,
      geolocationAccepted: false as const,
      deviceIdentifierAccepted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR170_RESEARCH_NOTE_REF,
    nextFrontier: FR170_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairC2paExternalTrustRootProvisioningFR170(
  value: EyePairC2paExternalTrustRootProvisioningFR170V1,
): void {
  if (!ISSUED.has(value as object)) fail('artifact was not issued by the active FR-170 boundary.');
  if (
    value.recordId !== FR170_EYE_PAIR_C2PA_EXTERNAL_TRUST_ROOT_PROVISIONING_RECORD_ID
    || value.authorityBoundary.actualExternalGovernanceVerificationPerformed !== true
    || value.authorityBoundary.actualTrustRootProvisioned !== true
    || value.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || value.authorityBoundary.externalWitnessAuthorityEstablished !== false
    || value.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || value.authorityBoundary.multiSessionIndependenceVerified !== false
    || value.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || value.authorityBoundary.identityMatchingPerformed !== false
    || value.authorityBoundary.biometricTemplateIssued !== false
    || value.authorityBoundary.traditionalSemanticAuthority !== false
    || value.externalGovernanceSnapshot.exactTrustListGitBlobIdentityVerified !== true
    || value.externalGovernanceSnapshot.exactConformingProductsGitBlobIdentityVerified !== true
    || value.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || value.researchNoteRef !== FR170_RESEARCH_NOTE_REF
    || value.nextFrontier !== FR170_NEXT_FRONTIER
  ) fail('issued C2PA external trust-root provisioning artifact drift.');
}
