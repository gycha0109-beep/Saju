import { createHash } from 'node:crypto';
import type {
  FR225VerifiedPersistedExternalWitnessEvidence,
} from './observable-morphology-external-witness-evidence-fr225.js';
import type {
  FR227ExternalEvidenceByteInspection,
} from './observable-morphology-external-evidence-byte-inspection-fr227.js';
import {
  assertPinnedKeyWitnessSignatureVerificationFR228,
  verifyPinnedKeyWitnessSignaturesFR228,
  type FR228DetachedWitnessSignature,
  type FR228PinnedVerifierKey,
} from './observable-morphology-pinned-key-witness-signatures-fr228.js';
import {
  assertPinnedRegistrarVerifierKeyRegistryFR229,
  type FR229PinnedRegistrarVerifierKeyRegistry,
  type FR229VerifierKeyEnrollmentReceipt,
} from './observable-morphology-pinned-registrar-key-enrollment-fr229.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR230_CONTRACT_VERSION =
  'FR230-ENROLLMENT-BOUND-WITNESS-SIGNATURE-v1' as const;

export interface FR230VerifierKeyMaterial {
  readonly verifierRef: string;
  readonly keyRef: string;
  readonly publicKeySpkiDerBase64: string;
}

export interface FR230EnrollmentBoundWitnessSignatureReceipt {
  readonly witnessRef: string;
  readonly verifierRef: string;
  readonly keyRef: string;
  readonly verifierPublicKeyDigest: string;
  readonly signatureRef: string;
  readonly witnessEnvelopeDigest: string;
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly registrarPublicKeyDigest: string;
  readonly certificateRef: string;
  readonly enrollmentChallengeDigest: string;
  readonly enrollmentCertificateEnvelopeDigest: string;
  readonly verifierKeyExactMatchToActiveFR229Registry: true;
  readonly fr228SignatureValidAgainstExactEnrolledKey: true;
  readonly verifierKeyPossessionDemonstratedAtEnrollment: true;
  readonly enrollmentBoundToPinnedRegistrarKey: true;
  readonly registrarIdentityIndependentlyVerified: false;
  readonly registrarIndependenceIndependentlyVerified: false;
  readonly verifierIdentityIndependentlyVerified: false;
  readonly signingKeyOwnershipIndependentlyVerified: false;
  readonly publicKeyProvenanceIndependentlyAuthenticated: false;
  readonly currentValidityIndependentlyChecked: false;
  readonly revocationStatusIndependentlyChecked: false;
  readonly witnessClaimIndependentlyEstablished: false;
}

export interface FR230EnrollmentBoundWitnessSignatureVerification {
  readonly schemaVersion: 'fr230-enrollment-bound-witness-signature-verification-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR230_CONTRACT_VERSION;
  readonly authorityState:
    'fr228_witness_signatures_verified_only_with_active_fr229_enrolled_keys_identity_and_claim_truth_unverified';
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly sourceVerifierKeyRegistryRef: string;
  readonly sourceVerifierKeyRegistryDigest: string;
  readonly sourceFR228VerificationRef: string;
  readonly sourceFR228VerificationDigest: string;
  readonly witnessRecordCount: number;
  readonly signedWitnessCount: number;
  readonly enrolledVerifierKeyCount: number;
  readonly receipts: readonly FR230EnrollmentBoundWitnessSignatureReceipt[];
  readonly verificationDigest: string;
  readonly verificationRef: string;
  readonly integrityBoundary: {
    readonly activeFR229RegistryRequired: true;
    readonly fullFR229KeyMaterialCoverageRequired: true;
    readonly exactVerifierRefRequired: true;
    readonly exactKeyRefRequired: true;
    readonly exactPublicKeyDigestRequired: true;
    readonly missingKeyMaterialRejected: true;
    readonly extraKeyMaterialRejected: true;
    readonly duplicateVerifierKeyMaterialRejected: true;
    readonly duplicateKeyRefRejected: true;
    readonly fr228PinnedKeysDerivedInternally: true;
    readonly independentFR228PinnedKeyInputForbidden: true;
    readonly activeFR228VerificationRequired: true;
    readonly witnessSignatureReverifiedAgainstEnrolledKey: true;
  };
  readonly authorityBoundary: {
    readonly enrollmentBindingMeansRegistrarIdentityVerified: false;
    readonly enrollmentBindingMeansRegistrarIndependent: false;
    readonly enrollmentBindingMeansVerifierIdentityVerified: false;
    readonly enrollmentBindingMeansRealWorldKeyOwnershipVerified: false;
    readonly enrollmentBindingMeansClaimTrue: false;
    readonly registrarIdentityIndependentlyVerified: false;
    readonly registrarIndependenceIndependentlyVerified: false;
    readonly verifierIdentityIndependentlyVerified: false;
    readonly verifierIndependenceIndependentlyVerified: false;
    readonly signingKeyOwnershipIndependentlyVerified: false;
    readonly publicKeyProvenanceIndependentlyAuthenticated: false;
    readonly currentValidityIndependentlyChecked: false;
    readonly revocationStatusIndependentlyChecked: false;
    readonly witnessClaimIndependentlyEstablished: false;
    readonly externalEvidenceProvenanceAuthenticated: false;
    readonly externalEvidenceSubstanceIndependentlyAdjudicated: false;
    readonly reviewerHumanStatusIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly calibrationAuthorized: false;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const ISSUED = new WeakSet<object>();
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-230 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('verification material cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('verification material cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('verification material must be JSON-compatible.');
}

function sha256Text(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function sha256Bytes(value: Uint8Array): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function safeRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return value;
}

function decodeCanonicalBase64(value: string, label: string): Buffer {
  if (typeof value !== 'string' || value.length === 0 || !BASE64.test(value)) {
    fail(`${label} must be canonical base64.`);
  }
  const bytes = Buffer.from(value, 'base64');
  if (bytes.toString('base64') !== value) fail(`${label} must be canonical base64.`);
  return bytes;
}

function enrollmentReceiptFor(
  registry: FR229PinnedRegistrarVerifierKeyRegistry,
  verifierRef: string,
): FR229VerifierKeyEnrollmentReceipt {
  const receipt = registry.receipts.find((entry) => entry.verifierRef === verifierRef);
  if (receipt === undefined) fail(`FR229 enrollment receipt missing for verifier ${verifierRef}.`);
  return receipt;
}

function deriveFR228PinnedKeys(input: {
  readonly registry: FR229PinnedRegistrarVerifierKeyRegistry;
  readonly verifierKeyMaterials: readonly FR230VerifierKeyMaterial[];
}): readonly FR228PinnedVerifierKey[] {
  assertPinnedRegistrarVerifierKeyRegistryFR229(input.registry);
  if (!Array.isArray(input.verifierKeyMaterials)) {
    fail('verifierKeyMaterials must be an array.');
  }

  const byVerifier = new Map<string, FR228PinnedVerifierKey>();
  const keyRefs = new Set<string>();

  for (const [index, material] of input.verifierKeyMaterials.entries()) {
    safeRef(material.verifierRef, `verifierKeyMaterials[${index}].verifierRef`);
    safeRef(material.keyRef, `verifierKeyMaterials[${index}].keyRef`);
    if (byVerifier.has(material.verifierRef)) {
      fail(`duplicate verifier key material: ${material.verifierRef}.`);
    }
    if (keyRefs.has(material.keyRef)) {
      fail(`duplicate verifier keyRef: ${material.keyRef}.`);
    }

    const receipt = input.registry.receipts.find(
      (entry) => entry.verifierRef === material.verifierRef,
    );
    if (receipt === undefined) {
      fail(`extra verifier key material not admitted by FR229: ${material.verifierRef}.`);
    }
    if (receipt.keyRef !== material.keyRef) {
      fail(`FR229 keyRef mismatch for verifier ${material.verifierRef}.`);
    }

    const publicKeyDer = decodeCanonicalBase64(
      material.publicKeySpkiDerBase64,
      `verifierKeyMaterials[${index}].publicKeySpkiDerBase64`,
    );
    const publicKeyDigest = sha256Bytes(publicKeyDer);
    if (publicKeyDigest !== receipt.verifierPublicKeyDigest) {
      fail(`FR229 public-key digest mismatch for verifier ${material.verifierRef}.`);
    }

    byVerifier.set(material.verifierRef, Object.freeze({
      verifierRef: material.verifierRef,
      keyRef: material.keyRef,
      publicKeySpkiDerBase64: material.publicKeySpkiDerBase64,
    }));
    keyRefs.add(material.keyRef);
  }

  for (const receipt of input.registry.receipts) {
    if (!byVerifier.has(receipt.verifierRef)) {
      fail(`missing verifier key material for FR229 enrollment ${receipt.verifierRef}.`);
    }
  }
  if (byVerifier.size !== input.registry.verifierCount) {
    fail('verifier key material count must exactly match the active FR229 registry.');
  }

  return Object.freeze(
    [...byVerifier.values()].sort((left, right) =>
      left.verifierRef.localeCompare(right.verifierRef)),
  );
}

export function verifyEnrollmentBoundWitnessSignaturesFR230(input: {
  readonly witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence;
  readonly inspection: FR227ExternalEvidenceByteInspection;
  readonly verifierKeyRegistry: FR229PinnedRegistrarVerifierKeyRegistry;
  readonly verifierKeyMaterials: readonly FR230VerifierKeyMaterial[];
  readonly signatures: readonly FR228DetachedWitnessSignature[];
}): FR230EnrollmentBoundWitnessSignatureVerification {
  assertPinnedRegistrarVerifierKeyRegistryFR229(input.verifierKeyRegistry);

  const derivedPinnedKeys = deriveFR228PinnedKeys({
    registry: input.verifierKeyRegistry,
    verifierKeyMaterials: input.verifierKeyMaterials,
  });

  const fr228 = verifyPinnedKeyWitnessSignaturesFR228({
    witnessEvidence: input.witnessEvidence,
    inspection: input.inspection,
    pinnedKeys: derivedPinnedKeys,
    signatures: input.signatures,
  });
  assertPinnedKeyWitnessSignatureVerificationFR228(fr228);

  const receipts = fr228.receipts.map((signatureReceipt) => {
    const enrollment = enrollmentReceiptFor(
      input.verifierKeyRegistry,
      signatureReceipt.verifierRef,
    );
    if (
      signatureReceipt.keyRef !== enrollment.keyRef
      || signatureReceipt.publicKeyDigest !== enrollment.verifierPublicKeyDigest
    ) {
      fail(`FR228/FR229 verifier-key binding drift for ${signatureReceipt.verifierRef}.`);
    }

    const receipt: FR230EnrollmentBoundWitnessSignatureReceipt = Object.freeze({
      witnessRef: signatureReceipt.witnessRef,
      verifierRef: signatureReceipt.verifierRef,
      keyRef: signatureReceipt.keyRef,
      verifierPublicKeyDigest: signatureReceipt.publicKeyDigest,
      signatureRef: signatureReceipt.signatureRef,
      witnessEnvelopeDigest: signatureReceipt.envelopeDigest,
      registrarRef: enrollment.registrarRef,
      registrarKeyRef: enrollment.registrarKeyRef,
      registrarPublicKeyDigest: enrollment.registrarPublicKeyDigest,
      certificateRef: enrollment.certificateRef,
      enrollmentChallengeDigest: enrollment.challengeDigest,
      enrollmentCertificateEnvelopeDigest: enrollment.certificateEnvelopeDigest,
      verifierKeyExactMatchToActiveFR229Registry: true as const,
      fr228SignatureValidAgainstExactEnrolledKey: true as const,
      verifierKeyPossessionDemonstratedAtEnrollment: true as const,
      enrollmentBoundToPinnedRegistrarKey: true as const,
      registrarIdentityIndependentlyVerified: false as const,
      registrarIndependenceIndependentlyVerified: false as const,
      verifierIdentityIndependentlyVerified: false as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceIndependentlyAuthenticated: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
      witnessClaimIndependentlyEstablished: false as const,
    });
    return receipt;
  }).sort((left, right) => left.witnessRef.localeCompare(right.witnessRef));

  const verificationDigest = sha256Text(canonicalJson({
    contractVersion: FR230_CONTRACT_VERSION,
    studyGateRef: fr228.studyGateRef,
    studyGateDigest: fr228.studyGateDigest,
    sourceVerifierKeyRegistryRef: input.verifierKeyRegistry.registryRef,
    sourceVerifierKeyRegistryDigest: input.verifierKeyRegistry.registryDigest,
    sourceFR228VerificationRef: fr228.verificationRef,
    sourceFR228VerificationDigest: fr228.verificationDigest,
    receipts,
  }));

  const result: FR230EnrollmentBoundWitnessSignatureVerification = Object.freeze({
    schemaVersion: 'fr230-enrollment-bound-witness-signature-verification-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR230_CONTRACT_VERSION,
    authorityState:
      'fr228_witness_signatures_verified_only_with_active_fr229_enrolled_keys_identity_and_claim_truth_unverified' as const,
    studyGateRef: fr228.studyGateRef,
    studyGateDigest: fr228.studyGateDigest,
    sourceVerifierKeyRegistryRef: input.verifierKeyRegistry.registryRef,
    sourceVerifierKeyRegistryDigest: input.verifierKeyRegistry.registryDigest,
    sourceFR228VerificationRef: fr228.verificationRef,
    sourceFR228VerificationDigest: fr228.verificationDigest,
    witnessRecordCount: fr228.witnessRecordCount,
    signedWitnessCount: fr228.signedWitnessCount,
    enrolledVerifierKeyCount: input.verifierKeyRegistry.verifierCount,
    receipts: Object.freeze(receipts),
    verificationDigest,
    verificationRef:
      `evidence.fr230.enrollment_bound_witness_signature:${verificationDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR229RegistryRequired: true as const,
      fullFR229KeyMaterialCoverageRequired: true as const,
      exactVerifierRefRequired: true as const,
      exactKeyRefRequired: true as const,
      exactPublicKeyDigestRequired: true as const,
      missingKeyMaterialRejected: true as const,
      extraKeyMaterialRejected: true as const,
      duplicateVerifierKeyMaterialRejected: true as const,
      duplicateKeyRefRejected: true as const,
      fr228PinnedKeysDerivedInternally: true as const,
      independentFR228PinnedKeyInputForbidden: true as const,
      activeFR228VerificationRequired: true as const,
      witnessSignatureReverifiedAgainstEnrolledKey: true as const,
    }),
    authorityBoundary: Object.freeze({
      enrollmentBindingMeansRegistrarIdentityVerified: false as const,
      enrollmentBindingMeansRegistrarIndependent: false as const,
      enrollmentBindingMeansVerifierIdentityVerified: false as const,
      enrollmentBindingMeansRealWorldKeyOwnershipVerified: false as const,
      enrollmentBindingMeansClaimTrue: false as const,
      registrarIdentityIndependentlyVerified: false as const,
      registrarIndependenceIndependentlyVerified: false as const,
      verifierIdentityIndependentlyVerified: false as const,
      verifierIndependenceIndependentlyVerified: false as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceIndependentlyAuthenticated: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
      witnessClaimIndependentlyEstablished: false as const,
      externalEvidenceProvenanceAuthenticated: false as const,
      externalEvidenceSubstanceIndependentlyAdjudicated: false as const,
      reviewerHumanStatusIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      calibrationAuthorized: false as const,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });

  ISSUED.add(result);
  return result;
}

export function assertEnrollmentBoundWitnessSignatureVerificationFR230(
  verification: FR230EnrollmentBoundWitnessSignatureVerification,
): void {
  if (!ISSUED.has(verification)) {
    fail('enrollment-bound witness signature verification was not issued by active FR230 runtime.');
  }
  if (
    verification.schemaVersion
      !== 'fr230-enrollment-bound-witness-signature-verification-v1'
    || verification.contractVersion !== FR230_CONTRACT_VERSION
    || verification.integrityBoundary.activeFR229RegistryRequired !== true
    || verification.integrityBoundary.fr228PinnedKeysDerivedInternally !== true
    || verification.integrityBoundary.independentFR228PinnedKeyInputForbidden !== true
    || verification.integrityBoundary.witnessSignatureReverifiedAgainstEnrolledKey !== true
    || verification.authorityBoundary.enrollmentBindingMeansRegistrarIdentityVerified !== false
    || verification.authorityBoundary.enrollmentBindingMeansVerifierIdentityVerified !== false
    || verification.authorityBoundary.enrollmentBindingMeansRealWorldKeyOwnershipVerified !== false
    || verification.authorityBoundary.enrollmentBindingMeansClaimTrue !== false
    || verification.authorityBoundary.verifierIdentityIndependentlyVerified !== false
    || verification.authorityBoundary.signingKeyOwnershipIndependentlyVerified !== false
    || verification.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated !== false
    || verification.authorityBoundary.currentValidityIndependentlyChecked !== false
    || verification.authorityBoundary.revocationStatusIndependentlyChecked !== false
    || verification.authorityBoundary.witnessClaimIndependentlyEstablished !== false
    || verification.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || verification.authorityBoundary.empiricalSufficiencyEstablished !== false
    || verification.authorityBoundary.calibrationAuthorized !== false
    || verification.authorityBoundary.thresholdIssued !== false
    || verification.authorityBoundary.classifierIssued !== false
    || verification.authorityBoundary.traditionalBindingIssued !== false
    || verification.authorityBoundary.productionActivated !== false
    || verification.authorityBoundary.commerceActivated !== false
  ) fail('FR230 enrollment-bound witness-signature authority boundary drift.');
}
