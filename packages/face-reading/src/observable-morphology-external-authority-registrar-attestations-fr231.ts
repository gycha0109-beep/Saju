import {
  createHash,
  createPublicKey,
  verify as verifySignature,
} from 'node:crypto';
import {
  assertPinnedRegistrarVerifierKeyRegistryFR229,
  type FR229PinnedRegistrarVerifierKeyRegistry,
} from './observable-morphology-pinned-registrar-key-enrollment-fr229.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR231_CONTRACT_VERSION =
  'FR231-EXTERNAL-AUTHORITY-REGISTRAR-ATTESTATION-v1' as const;

export interface FR231PinnedAuthorityKey {
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly publicKeySpkiDerBase64: string;
}

export interface FR231RegistrarAuthorityAttestation {
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly registrarPublicKeyDigest: string;
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly certificateRef: string;
  readonly attestedAt: string;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly authoritySignatureBase64: string;
}

export interface FR231RegistrarAuthorityAttestationReceipt {
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly registrarPublicKeyDigest: string;
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly authorityPublicKeyDigest: string;
  readonly certificateRef: string;
  readonly attestationEnvelopeDigest: string;
  readonly registrarMappingMatchesFR229: true;
  readonly authoritySignatureValid: true;
  readonly authorityDistinctFromRegistrarRef: true;
  readonly attestedTimeWithinDeclaredValidityWindow: true;
  readonly authorityIdentityIndependentlyVerified: false;
  readonly authorityIndependenceIndependentlyVerified: false;
  readonly registrarIdentityIndependentlyVerified: false;
  readonly registrarIndependenceIndependentlyVerified: false;
  readonly publicKeyProvenanceIndependentlyAuthenticated: false;
  readonly currentValidityIndependentlyChecked: false;
  readonly revocationStatusIndependentlyChecked: false;
}

export interface FR231ExternalAuthorityRegistrarRegistry {
  readonly schemaVersion: 'fr231-external-authority-registrar-registry-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR231_CONTRACT_VERSION;
  readonly authorityState:
    'registrar_keys_cryptographically_attested_by_caller_pinned_external_authority_real_world_identity_unverified';
  readonly sourceFR229RegistryRef: string;
  readonly sourceFR229RegistryDigest: string;
  readonly registrarCount: number;
  readonly authorityCount: number;
  readonly receipts: readonly FR231RegistrarAuthorityAttestationReceipt[];
  readonly registryDigest: string;
  readonly registryRef: string;
  readonly integrityBoundary: {
    readonly activeFR229RegistryRequired: true;
    readonly exactRegistrarCoverageRequired: true;
    readonly oneAttestationPerRegistrarRequired: true;
    readonly uniqueCertificateRefRequired: true;
    readonly onePinnedKeyPerAuthorityRequired: true;
    readonly authorityRegistrarRefDistinctRequired: true;
    readonly registrarRefKeyRefDigestMatchRequired: true;
    readonly authoritySignatureVerified: true;
    readonly authorityPublicKeyDigestsRecomputed: true;
    readonly attestationTimestampWithinDeclaredWindowRequired: true;
    readonly malformedKeyRejected: true;
    readonly malformedSignatureRejected: true;
  };
  readonly authorityBoundary: {
    readonly callerPinnedAuthorityMeansAuthorityIdentityVerified: false;
    readonly authoritySignatureMeansAuthorityIndependent: false;
    readonly authorityAttestationMeansRegistrarIdentityVerified: false;
    readonly authorityAttestationMeansRealWorldKeyOwnershipVerified: false;
    readonly authorityIdentityIndependentlyVerified: false;
    readonly authorityIndependenceIndependentlyVerified: false;
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
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-231 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('attestation evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('attestation evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('attestation evidence must be JSON-compatible.');
}

function sha256Bytes(value: Uint8Array): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function sha256Text(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function safeRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return value;
}

function safeDigest(value: string, label: string): string {
  if (typeof value !== 'string' || !SHA256.test(value)) {
    fail(`${label} must be a lowercase sha256 digest.`);
  }
  return value;
}

function canonicalBase64(value: string, label: string): Buffer {
  if (typeof value !== 'string' || value.length === 0 || !BASE64.test(value)) {
    fail(`${label} must be canonical base64.`);
  }
  const bytes = Buffer.from(value, 'base64');
  if (bytes.toString('base64') !== value) fail(`${label} must be canonical base64.`);
  return bytes;
}

function parseTime(value: string, label: string): number {
  if (typeof value !== 'string') fail(`${label} must be a timestamp string.`);
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) fail(`${label} must be a parseable timestamp.`);
  return parsed;
}

function ed25519PublicKey(der: Buffer, label: string) {
  try {
    const key = createPublicKey({ key: der, format: 'der', type: 'spki' });
    if (key.asymmetricKeyType !== 'ed25519') fail(`${label} must be an Ed25519 public key.`);
    return key;
  } catch (error) {
    if (error instanceof FaceAuthorityValidationError) throw error;
    fail(`${label} contains a malformed public key.`);
  }
}

function validateAttestationFields(
  input: Omit<FR231RegistrarAuthorityAttestation, 'authoritySignatureBase64'>,
): void {
  safeRef(input.registrarRef, 'registrarRef');
  safeRef(input.registrarKeyRef, 'registrarKeyRef');
  safeDigest(input.registrarPublicKeyDigest, 'registrarPublicKeyDigest');
  safeRef(input.authorityRef, 'authorityRef');
  safeRef(input.authorityKeyRef, 'authorityKeyRef');
  safeRef(input.certificateRef, 'certificateRef');
  if (input.registrarRef === input.authorityRef) {
    fail('registrarRef and authorityRef must be distinct.');
  }
  const attestedAt = parseTime(input.attestedAt, 'attestedAt');
  const validFrom = parseTime(input.validFrom, 'validFrom');
  const validUntil = parseTime(input.validUntil, 'validUntil');
  if (validFrom > validUntil) fail('validFrom must not be after validUntil.');
  if (attestedAt < validFrom || attestedAt > validUntil) {
    fail('attestedAt must fall inside the declared validity window.');
  }
}

export function buildRegistrarAuthorityAttestationBytesFR231(
  input: Omit<FR231RegistrarAuthorityAttestation, 'authoritySignatureBase64'>,
): Uint8Array {
  validateAttestationFields(input);
  return Buffer.from(canonicalJson({
    contractVersion: FR231_CONTRACT_VERSION,
    purpose: 'registrar_key_external_authority_attestation',
    registrarRef: input.registrarRef,
    registrarKeyRef: input.registrarKeyRef,
    registrarPublicKeyDigest: input.registrarPublicKeyDigest,
    authorityRef: input.authorityRef,
    authorityKeyRef: input.authorityKeyRef,
    certificateRef: input.certificateRef,
    attestedAt: input.attestedAt,
    validFrom: input.validFrom,
    validUntil: input.validUntil,
  }), 'utf8');
}

export function bindRegistrarKeysToExternalAuthorityAttestationsFR231(input: {
  readonly verifierKeyRegistry: FR229PinnedRegistrarVerifierKeyRegistry;
  readonly authorityKeys: readonly FR231PinnedAuthorityKey[];
  readonly attestations: readonly FR231RegistrarAuthorityAttestation[];
}): FR231ExternalAuthorityRegistrarRegistry {
  assertPinnedRegistrarVerifierKeyRegistryFR229(input.verifierKeyRegistry);

  if (!Array.isArray(input.authorityKeys) || input.authorityKeys.length === 0) {
    fail('authorityKeys must contain at least one pinned external authority key.');
  }
  if (!Array.isArray(input.attestations) || input.attestations.length === 0) {
    fail('attestations must contain at least one registrar authority attestation.');
  }

  const registrarMappings = new Map<string, {
    readonly registrarKeyRef: string;
    readonly registrarPublicKeyDigest: string;
  }>();
  for (const receipt of input.verifierKeyRegistry.receipts) {
    const existing = registrarMappings.get(receipt.registrarRef);
    if (existing !== undefined) {
      if (
        existing.registrarKeyRef !== receipt.registrarKeyRef
        || existing.registrarPublicKeyDigest !== receipt.registrarPublicKeyDigest
      ) {
        fail(`FR229 registrar mapping drift for ${receipt.registrarRef}.`);
      }
      continue;
    }
    registrarMappings.set(receipt.registrarRef, Object.freeze({
      registrarKeyRef: receipt.registrarKeyRef,
      registrarPublicKeyDigest: receipt.registrarPublicKeyDigest,
    }));
  }

  const authorities = new Map<string, {
    readonly authorityKeyRef: string;
    readonly publicKeyDer: Buffer;
    readonly publicKeyDigest: string;
  }>();
  const authorityKeyRefs = new Set<string>();
  for (const [index, entry] of input.authorityKeys.entries()) {
    safeRef(entry.authorityRef, `authorityKeys[${index}].authorityRef`);
    safeRef(entry.authorityKeyRef, `authorityKeys[${index}].authorityKeyRef`);
    if (authorities.has(entry.authorityRef)) {
      fail(`duplicate pinned authority mapping: ${entry.authorityRef}.`);
    }
    if (authorityKeyRefs.has(entry.authorityKeyRef)) {
      fail(`duplicate authorityKeyRef: ${entry.authorityKeyRef}.`);
    }
    const der = canonicalBase64(
      entry.publicKeySpkiDerBase64,
      `authorityKeys[${index}].publicKeySpkiDerBase64`,
    );
    ed25519PublicKey(der, `authorityKeys[${index}]`);
    authorities.set(entry.authorityRef, Object.freeze({
      authorityKeyRef: entry.authorityKeyRef,
      publicKeyDer: der,
      publicKeyDigest: sha256Bytes(der),
    }));
    authorityKeyRefs.add(entry.authorityKeyRef);
  }

  if (input.attestations.length !== registrarMappings.size) {
    fail('attestations must exactly cover the distinct FR229 registrar mappings.');
  }

  const coveredRegistrars = new Set<string>();
  const certificateRefs = new Set<string>();

  const receipts = input.attestations.map((attestation, index) => {
    if (coveredRegistrars.has(attestation.registrarRef)) {
      fail(`duplicate registrar attestation: ${attestation.registrarRef}.`);
    }
    if (certificateRefs.has(attestation.certificateRef)) {
      fail(`duplicate certificateRef: ${attestation.certificateRef}.`);
    }

    const expected = registrarMappings.get(attestation.registrarRef);
    if (expected === undefined) {
      fail(`attestation references registrar not present in FR229: ${attestation.registrarRef}.`);
    }
    if (expected.registrarKeyRef !== attestation.registrarKeyRef) {
      fail(`registrar keyRef mismatch for ${attestation.registrarRef}.`);
    }
    if (expected.registrarPublicKeyDigest !== attestation.registrarPublicKeyDigest) {
      fail(`registrar public-key digest mismatch for ${attestation.registrarRef}.`);
    }

    const authority = authorities.get(attestation.authorityRef);
    if (authority === undefined) {
      fail(`no pinned authority key for ${attestation.authorityRef}.`);
    }
    if (authority.authorityKeyRef !== attestation.authorityKeyRef) {
      fail(`authority keyRef mismatch for ${attestation.authorityRef}.`);
    }

    const envelopeBytes = buildRegistrarAuthorityAttestationBytesFR231(attestation);
    const signature = canonicalBase64(
      attestation.authoritySignatureBase64,
      `attestations[${index}].authoritySignatureBase64`,
    );
    if (signature.byteLength !== 64) {
      fail(`attestations[${index}] authority Ed25519 signature must be 64 bytes.`);
    }
    const authorityPublicKey = ed25519PublicKey(
      authority.publicKeyDer,
      `authority ${attestation.authorityRef}`,
    );
    if (!verifySignature(null, envelopeBytes, authorityPublicKey, signature)) {
      fail(`invalid authority signature for certificate ${attestation.certificateRef}.`);
    }

    coveredRegistrars.add(attestation.registrarRef);
    certificateRefs.add(attestation.certificateRef);

    const receipt: FR231RegistrarAuthorityAttestationReceipt = Object.freeze({
      registrarRef: attestation.registrarRef,
      registrarKeyRef: attestation.registrarKeyRef,
      registrarPublicKeyDigest: attestation.registrarPublicKeyDigest,
      authorityRef: attestation.authorityRef,
      authorityKeyRef: attestation.authorityKeyRef,
      authorityPublicKeyDigest: authority.publicKeyDigest,
      certificateRef: attestation.certificateRef,
      attestationEnvelopeDigest: sha256Bytes(envelopeBytes),
      registrarMappingMatchesFR229: true as const,
      authoritySignatureValid: true as const,
      authorityDistinctFromRegistrarRef: true as const,
      attestedTimeWithinDeclaredValidityWindow: true as const,
      authorityIdentityIndependentlyVerified: false as const,
      authorityIndependenceIndependentlyVerified: false as const,
      registrarIdentityIndependentlyVerified: false as const,
      registrarIndependenceIndependentlyVerified: false as const,
      publicKeyProvenanceIndependentlyAuthenticated: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
    });
    return receipt;
  }).sort((left, right) => left.registrarRef.localeCompare(right.registrarRef));

  for (const registrarRef of registrarMappings.keys()) {
    if (!coveredRegistrars.has(registrarRef)) {
      fail(`missing registrar authority attestation for ${registrarRef}.`);
    }
  }

  const registryDigest = sha256Text(canonicalJson({
    contractVersion: FR231_CONTRACT_VERSION,
    sourceFR229RegistryRef: input.verifierKeyRegistry.registryRef,
    sourceFR229RegistryDigest: input.verifierKeyRegistry.registryDigest,
    receipts,
  }));

  const result: FR231ExternalAuthorityRegistrarRegistry = Object.freeze({
    schemaVersion: 'fr231-external-authority-registrar-registry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR231_CONTRACT_VERSION,
    authorityState:
      'registrar_keys_cryptographically_attested_by_caller_pinned_external_authority_real_world_identity_unverified' as const,
    sourceFR229RegistryRef: input.verifierKeyRegistry.registryRef,
    sourceFR229RegistryDigest: input.verifierKeyRegistry.registryDigest,
    registrarCount: receipts.length,
    authorityCount: new Set(receipts.map((receipt) => receipt.authorityRef)).size,
    receipts: Object.freeze(receipts),
    registryDigest,
    registryRef:
      `evidence.fr231.registrar_authority_registry:${registryDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR229RegistryRequired: true as const,
      exactRegistrarCoverageRequired: true as const,
      oneAttestationPerRegistrarRequired: true as const,
      uniqueCertificateRefRequired: true as const,
      onePinnedKeyPerAuthorityRequired: true as const,
      authorityRegistrarRefDistinctRequired: true as const,
      registrarRefKeyRefDigestMatchRequired: true as const,
      authoritySignatureVerified: true as const,
      authorityPublicKeyDigestsRecomputed: true as const,
      attestationTimestampWithinDeclaredWindowRequired: true as const,
      malformedKeyRejected: true as const,
      malformedSignatureRejected: true as const,
    }),
    authorityBoundary: Object.freeze({
      callerPinnedAuthorityMeansAuthorityIdentityVerified: false as const,
      authoritySignatureMeansAuthorityIndependent: false as const,
      authorityAttestationMeansRegistrarIdentityVerified: false as const,
      authorityAttestationMeansRealWorldKeyOwnershipVerified: false as const,
      authorityIdentityIndependentlyVerified: false as const,
      authorityIndependenceIndependentlyVerified: false as const,
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

export function assertExternalAuthorityRegistrarRegistryFR231(
  registry: FR231ExternalAuthorityRegistrarRegistry,
): void {
  if (!ISSUED.has(registry)) {
    fail('registrar authority registry was not issued by active FR231 runtime.');
  }
  if (
    registry.schemaVersion !== 'fr231-external-authority-registrar-registry-v1'
    || registry.contractVersion !== FR231_CONTRACT_VERSION
    || registry.registrarCount !== registry.receipts.length
    || registry.integrityBoundary.activeFR229RegistryRequired !== true
    || registry.integrityBoundary.exactRegistrarCoverageRequired !== true
    || registry.integrityBoundary.authoritySignatureVerified !== true
    || registry.authorityBoundary.callerPinnedAuthorityMeansAuthorityIdentityVerified !== false
    || registry.authorityBoundary.authoritySignatureMeansAuthorityIndependent !== false
    || registry.authorityBoundary.authorityAttestationMeansRegistrarIdentityVerified !== false
    || registry.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated !== false
    || registry.authorityBoundary.witnessClaimIndependentlyEstablished !== false
    || registry.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || registry.authorityBoundary.empiricalSufficiencyEstablished !== false
    || registry.authorityBoundary.calibrationAuthorized !== false
    || registry.authorityBoundary.thresholdIssued !== false
    || registry.authorityBoundary.classifierIssued !== false
    || registry.authorityBoundary.traditionalBindingIssued !== false
    || registry.authorityBoundary.productionActivated !== false
    || registry.authorityBoundary.commerceActivated !== false
  ) fail('FR231 registrar authority registry authority boundary drift.');
}
