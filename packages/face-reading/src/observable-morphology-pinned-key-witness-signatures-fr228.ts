import {
  createHash,
  createPublicKey,
  verify as verifySignature,
} from 'node:crypto';
import {
  assertVerifiedPersistedExternalWitnessEvidenceFR225,
  type FR225ExternalWitnessRecord,
  type FR225VerifiedPersistedExternalWitnessEvidence,
} from './observable-morphology-external-witness-evidence-fr225.js';
import {
  assertExternalEvidenceByteInspectionFR227,
  type FR227ExternalEvidenceByteInspection,
  type FR227ExternalEvidenceInspectionReceipt,
} from './observable-morphology-external-evidence-byte-inspection-fr227.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR228_CONTRACT_VERSION =
  'FR228-PINNED-KEY-WITNESS-SIGNATURE-v1' as const;

export interface FR228PinnedVerifierKey {
  readonly verifierRef: string;
  readonly keyRef: string;
  readonly publicKeySpkiDerBase64: string;
}

export interface FR228DetachedWitnessSignature {
  readonly witnessRef: string;
  readonly signatureRef: string;
  readonly signatureBase64: string;
}

export interface FR228WitnessSignatureReceipt {
  readonly witnessRef: string;
  readonly verifierRef: string;
  readonly keyRef: string;
  readonly publicKeyDigest: string;
  readonly signatureRef: string;
  readonly envelopeDigest: string;
  readonly signatureValid: true;
  readonly signedEnvelopeBoundToPinnedKey: true;
  readonly signingKeyPossessionDemonstrated: true;
  readonly signingKeyOwnershipIndependentlyVerified: false;
  readonly publicKeyProvenanceAuthenticated: false;
  readonly verifierIdentityIndependentlyVerified: false;
  readonly verifierIndependenceIndependentlyVerified: false;
  readonly witnessClaimIndependentlyEstablished: false;
}

export interface FR228PinnedKeyWitnessSignatureVerification {
  readonly schemaVersion: 'fr228-pinned-key-witness-signature-verification-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR228_CONTRACT_VERSION;
  readonly authorityState:
    'ed25519_signature_valid_against_caller_pinned_key_identity_and_claim_truth_unverified';
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly sourceWitnessEvidenceRef: string;
  readonly sourceWitnessEvidenceDigest: string;
  readonly sourceInspectionRef: string;
  readonly sourceInspectionDigest: string;
  readonly witnessRecordCount: number;
  readonly signedWitnessCount: number;
  readonly pinnedVerifierKeyCount: number;
  readonly receipts: readonly FR228WitnessSignatureReceipt[];
  readonly pinnedKeyRegistryDigest: string;
  readonly verificationDigest: string;
  readonly verificationRef: string;
  readonly integrityBoundary: {
    readonly activeFR225VerificationRequired: true;
    readonly activeFR227InspectionRequired: true;
    readonly exactFR225FR227BindingRequired: true;
    readonly oneSignaturePerWitnessRequired: true;
    readonly onePinnedKeyPerVerifierRequired: true;
    readonly missingSignatureRejected: true;
    readonly extraSignatureRejected: true;
    readonly duplicateSignatureRefRejected: true;
    readonly unknownVerifierKeyRejected: true;
    readonly malformedKeyRejected: true;
    readonly malformedSignatureRejected: true;
    readonly ed25519Required: true;
    readonly canonicalEnvelopeSignatureVerified: true;
  };
  readonly authorityBoundary: {
    readonly validSignatureMeansVerifierIdentityVerified: false;
    readonly validSignatureMeansVerifierIndependent: false;
    readonly validSignatureMeansKeyOwnershipVerified: false;
    readonly validSignatureMeansClaimTrue: false;
    readonly validSignatureMeansEvidenceProvenanceAuthentic: false;
    readonly verifierIdentityIndependentlyVerified: false;
    readonly verifierIndependenceIndependentlyVerified: false;
    readonly signingKeyOwnershipIndependentlyVerified: false;
    readonly publicKeyProvenanceAuthenticated: false;
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
  throw new FaceAuthorityValidationError(`FR-228 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('signature envelope cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('signature envelope cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('signature envelope must be JSON-compatible.');
}

function sha256Text(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function sha256Bytes(value: Uint8Array): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function safeRef(value: string, label: string): string {
  if (!SAFE_REF.test(value)) fail(`${label} must be a bounded opaque reference.`);
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

function inspectionReceiptFor(
  inspection: FR227ExternalEvidenceByteInspection,
  witnessRef: string,
): FR227ExternalEvidenceInspectionReceipt {
  const receipt = inspection.receipts.find((entry) => entry.witnessRef === witnessRef);
  if (receipt === undefined) fail(`FR227 inspection receipt missing for witness ${witnessRef}.`);
  return receipt;
}

function assertSourcesCoherent(
  witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence,
  inspection: FR227ExternalEvidenceByteInspection,
): void {
  assertVerifiedPersistedExternalWitnessEvidenceFR225(witnessEvidence);
  assertExternalEvidenceByteInspectionFR227(inspection);
  if (
    inspection.sourceWitnessEvidenceRef !== witnessEvidence.evidenceRef
    || inspection.sourceWitnessEvidenceDigest !== witnessEvidence.evidenceDigest
    || inspection.studyGateRef !== witnessEvidence.studyGateRef
    || inspection.studyGateDigest !== witnessEvidence.studyGateDigest
  ) fail('FR227 inspection must derive from the exact supplied FR225 witness evidence.');
}

function envelopeObject(
  record: FR225ExternalWitnessRecord,
  receipt: FR227ExternalEvidenceInspectionReceipt,
  inspection: FR227ExternalEvidenceByteInspection,
): Readonly<Record<string, unknown>> {
  if (
    receipt.witnessRef !== record.witnessRef
    || receipt.externalEvidenceRef !== record.externalEvidenceRef
    || receipt.declaredDigest !== record.externalEvidenceDigest
    || receipt.computedDigest !== record.externalEvidenceDigest
    || receipt.externalEvidenceDigestMatched !== true
  ) fail(`FR225/FR227 envelope binding drift for witness ${record.witnessRef}.`);

  return Object.freeze({
    contractVersion: FR228_CONTRACT_VERSION,
    studyGateRef: inspection.studyGateRef,
    studyGateDigest: inspection.studyGateDigest,
    sourceWitnessEvidenceRef: inspection.sourceWitnessEvidenceRef,
    sourceWitnessEvidenceDigest: inspection.sourceWitnessEvidenceDigest,
    sourceInspectionRef: inspection.inspectionRef,
    sourceInspectionDigest: inspection.inspectionDigest,
    witnessRef: record.witnessRef,
    verifierRef: record.verifierRef,
    claimType: record.claimType,
    scopeRef: record.scopeRef,
    verificationMethod: record.verificationMethod,
    observedAt: record.observedAt,
    witnessRecordDigest: record.recordDigest,
    externalEvidenceRef: record.externalEvidenceRef,
    externalEvidenceDigest: record.externalEvidenceDigest,
    externalEvidenceMediaType: receipt.mediaType,
    externalEvidenceByteLength: receipt.byteLength,
    externalEvidenceComputedDigest: receipt.computedDigest,
  });
}

export function buildWitnessSignatureEnvelopeBytesFR228(input: {
  readonly witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence;
  readonly inspection: FR227ExternalEvidenceByteInspection;
  readonly witnessRef: string;
}): Uint8Array {
  assertSourcesCoherent(input.witnessEvidence, input.inspection);
  const record = input.witnessEvidence.records.find((entry) => entry.witnessRef === input.witnessRef);
  if (record === undefined) fail(`unknown witnessRef for signature envelope: ${input.witnessRef}.`);
  const receipt = inspectionReceiptFor(input.inspection, record.witnessRef);
  return Buffer.from(canonicalJson(envelopeObject(record, receipt, input.inspection)), 'utf8');
}

export function verifyPinnedKeyWitnessSignaturesFR228(input: {
  readonly witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence;
  readonly inspection: FR227ExternalEvidenceByteInspection;
  readonly pinnedKeys: readonly FR228PinnedVerifierKey[];
  readonly signatures: readonly FR228DetachedWitnessSignature[];
}): FR228PinnedKeyWitnessSignatureVerification {
  assertSourcesCoherent(input.witnessEvidence, input.inspection);
  if (!Array.isArray(input.pinnedKeys) || !Array.isArray(input.signatures)) {
    fail('pinnedKeys and signatures must be arrays.');
  }

  const keyByVerifier = new Map<string, {
    readonly keyRef: string;
    readonly publicKeyDer: Buffer;
    readonly publicKeyDigest: string;
  }>();
  const keyRefs = new Set<string>();
  for (const [index, key] of input.pinnedKeys.entries()) {
    safeRef(key.verifierRef, `pinnedKeys[${index}].verifierRef`);
    safeRef(key.keyRef, `pinnedKeys[${index}].keyRef`);
    if (keyByVerifier.has(key.verifierRef)) {
      fail(`duplicate pinned verifier mapping: ${key.verifierRef}.`);
    }
    if (keyRefs.has(key.keyRef)) fail(`duplicate keyRef: ${key.keyRef}.`);
    const publicKeyDer = decodeCanonicalBase64(
      key.publicKeySpkiDerBase64,
      `pinnedKeys[${index}].publicKeySpkiDerBase64`,
    );
    let keyObject;
    try {
      keyObject = createPublicKey({ key: publicKeyDer, format: 'der', type: 'spki' });
    } catch {
      fail(`pinnedKeys[${index}] contains a malformed public key.`);
    }
    if (keyObject.asymmetricKeyType !== 'ed25519') {
      fail(`pinnedKeys[${index}] must contain an Ed25519 public key.`);
    }
    keyByVerifier.set(key.verifierRef, Object.freeze({
      keyRef: key.keyRef,
      publicKeyDer,
      publicKeyDigest: sha256Bytes(publicKeyDer),
    }));
    keyRefs.add(key.keyRef);
  }

  const signatureByWitness = new Map<string, FR228DetachedWitnessSignature>();
  const signatureRefs = new Set<string>();
  for (const [index, signature] of input.signatures.entries()) {
    safeRef(signature.witnessRef, `signatures[${index}].witnessRef`);
    safeRef(signature.signatureRef, `signatures[${index}].signatureRef`);
    if (signatureByWitness.has(signature.witnessRef)) {
      fail(`duplicate signature for witness: ${signature.witnessRef}.`);
    }
    if (signatureRefs.has(signature.signatureRef)) {
      fail(`duplicate signatureRef: ${signature.signatureRef}.`);
    }
    if (!input.witnessEvidence.records.some((record) => record.witnessRef === signature.witnessRef)) {
      fail(`extra signature for unknown witness: ${signature.witnessRef}.`);
    }
    decodeCanonicalBase64(signature.signatureBase64, `signatures[${index}].signatureBase64`);
    signatureByWitness.set(signature.witnessRef, signature);
    signatureRefs.add(signature.signatureRef);
  }

  const receipts = input.witnessEvidence.records.map((record) => {
    const key = keyByVerifier.get(record.verifierRef);
    if (key === undefined) fail(`no pinned Ed25519 key for verifier ${record.verifierRef}.`);
    const signature = signatureByWitness.get(record.witnessRef);
    if (signature === undefined) fail(`missing detached signature for witness ${record.witnessRef}.`);

    const envelopeBytes = buildWitnessSignatureEnvelopeBytesFR228({
      witnessEvidence: input.witnessEvidence,
      inspection: input.inspection,
      witnessRef: record.witnessRef,
    });
    const signatureBytes = decodeCanonicalBase64(
      signature.signatureBase64,
      `signature for ${record.witnessRef}`,
    );
    if (signatureBytes.byteLength !== 64) {
      fail(`Ed25519 signature for witness ${record.witnessRef} must be 64 bytes.`);
    }

    const publicKey = createPublicKey({ key: key.publicKeyDer, format: 'der', type: 'spki' });
    if (!verifySignature(null, envelopeBytes, publicKey, signatureBytes)) {
      fail(`invalid Ed25519 signature for witness ${record.witnessRef}.`);
    }

    const receipt: FR228WitnessSignatureReceipt = Object.freeze({
      witnessRef: record.witnessRef,
      verifierRef: record.verifierRef,
      keyRef: key.keyRef,
      publicKeyDigest: key.publicKeyDigest,
      signatureRef: signature.signatureRef,
      envelopeDigest: sha256Bytes(envelopeBytes),
      signatureValid: true as const,
      signedEnvelopeBoundToPinnedKey: true as const,
      signingKeyPossessionDemonstrated: true as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceAuthenticated: false as const,
      verifierIdentityIndependentlyVerified: false as const,
      verifierIndependenceIndependentlyVerified: false as const,
      witnessClaimIndependentlyEstablished: false as const,
    });
    return receipt;
  }).sort((left, right) => left.witnessRef.localeCompare(right.witnessRef));

  if (signatureByWitness.size !== receipts.length) {
    fail('signature count does not exactly match FR225 witness records.');
  }

  const keyRegistry = [...keyByVerifier.entries()]
    .map(([verifierRef, key]) => ({
      verifierRef,
      keyRef: key.keyRef,
      publicKeyDigest: key.publicKeyDigest,
    }))
    .sort((left, right) => left.verifierRef.localeCompare(right.verifierRef));
  const pinnedKeyRegistryDigest = sha256Text(canonicalJson(keyRegistry));
  const verificationDigest = sha256Text(canonicalJson({
    contractVersion: FR228_CONTRACT_VERSION,
    studyGateRef: input.witnessEvidence.studyGateRef,
    studyGateDigest: input.witnessEvidence.studyGateDigest,
    sourceWitnessEvidenceRef: input.witnessEvidence.evidenceRef,
    sourceWitnessEvidenceDigest: input.witnessEvidence.evidenceDigest,
    sourceInspectionRef: input.inspection.inspectionRef,
    sourceInspectionDigest: input.inspection.inspectionDigest,
    pinnedKeyRegistryDigest,
    receipts,
  }));

  const result: FR228PinnedKeyWitnessSignatureVerification = Object.freeze({
    schemaVersion: 'fr228-pinned-key-witness-signature-verification-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR228_CONTRACT_VERSION,
    authorityState:
      'ed25519_signature_valid_against_caller_pinned_key_identity_and_claim_truth_unverified' as const,
    studyGateRef: input.witnessEvidence.studyGateRef,
    studyGateDigest: input.witnessEvidence.studyGateDigest,
    sourceWitnessEvidenceRef: input.witnessEvidence.evidenceRef,
    sourceWitnessEvidenceDigest: input.witnessEvidence.evidenceDigest,
    sourceInspectionRef: input.inspection.inspectionRef,
    sourceInspectionDigest: input.inspection.inspectionDigest,
    witnessRecordCount: input.witnessEvidence.recordCount,
    signedWitnessCount: receipts.length,
    pinnedVerifierKeyCount: keyByVerifier.size,
    receipts: Object.freeze(receipts),
    pinnedKeyRegistryDigest,
    verificationDigest,
    verificationRef:
      `evidence.fr228.pinned_key_witness_signature:${verificationDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR225VerificationRequired: true as const,
      activeFR227InspectionRequired: true as const,
      exactFR225FR227BindingRequired: true as const,
      oneSignaturePerWitnessRequired: true as const,
      onePinnedKeyPerVerifierRequired: true as const,
      missingSignatureRejected: true as const,
      extraSignatureRejected: true as const,
      duplicateSignatureRefRejected: true as const,
      unknownVerifierKeyRejected: true as const,
      malformedKeyRejected: true as const,
      malformedSignatureRejected: true as const,
      ed25519Required: true as const,
      canonicalEnvelopeSignatureVerified: true as const,
    }),
    authorityBoundary: Object.freeze({
      validSignatureMeansVerifierIdentityVerified: false as const,
      validSignatureMeansVerifierIndependent: false as const,
      validSignatureMeansKeyOwnershipVerified: false as const,
      validSignatureMeansClaimTrue: false as const,
      validSignatureMeansEvidenceProvenanceAuthentic: false as const,
      verifierIdentityIndependentlyVerified: false as const,
      verifierIndependenceIndependentlyVerified: false as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceAuthenticated: false as const,
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

export function assertPinnedKeyWitnessSignatureVerificationFR228(
  verification: FR228PinnedKeyWitnessSignatureVerification,
): void {
  if (!ISSUED.has(verification)) {
    fail('pinned-key witness signature verification was not issued by active FR228 runtime.');
  }
  if (
    verification.schemaVersion !== 'fr228-pinned-key-witness-signature-verification-v1'
    || verification.contractVersion !== FR228_CONTRACT_VERSION
    || verification.witnessRecordCount !== verification.signedWitnessCount
    || verification.integrityBoundary.ed25519Required !== true
    || verification.integrityBoundary.canonicalEnvelopeSignatureVerified !== true
    || verification.authorityBoundary.validSignatureMeansVerifierIdentityVerified !== false
    || verification.authorityBoundary.validSignatureMeansClaimTrue !== false
    || verification.authorityBoundary.signingKeyOwnershipIndependentlyVerified !== false
    || verification.authorityBoundary.publicKeyProvenanceAuthenticated !== false
    || verification.authorityBoundary.witnessClaimIndependentlyEstablished !== false
    || verification.authorityBoundary.externalEvidenceProvenanceAuthenticated !== false
    || verification.authorityBoundary.externalEvidenceSubstanceIndependentlyAdjudicated !== false
    || verification.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || verification.authorityBoundary.empiricalSufficiencyEstablished !== false
    || verification.authorityBoundary.calibrationAuthorized !== false
    || verification.authorityBoundary.thresholdIssued !== false
    || verification.authorityBoundary.classifierIssued !== false
    || verification.authorityBoundary.traditionalBindingIssued !== false
  ) fail('FR228 pinned-key signature authority boundary drift.');
}
