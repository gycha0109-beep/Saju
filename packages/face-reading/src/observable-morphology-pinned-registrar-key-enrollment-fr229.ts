import {
  createHash,
  createPublicKey,
  verify as verifySignature,
} from 'node:crypto';
import { FaceAuthorityValidationError } from './validation.js';

export const FR229_CONTRACT_VERSION =
  'FR229-PINNED-REGISTRAR-VERIFIER-KEY-ENROLLMENT-v1' as const;

export interface FR229PinnedRegistrarKey {
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly publicKeySpkiDerBase64: string;
}

export interface FR229VerifierKeyEnrollment {
  readonly verifierRef: string;
  readonly keyRef: string;
  readonly verifierPublicKeySpkiDerBase64: string;
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly certificateRef: string;
  readonly enrolledAt: string;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly verifierPossessionSignatureBase64: string;
  readonly registrarSignatureBase64: string;
}

export interface FR229VerifierKeyEnrollmentReceipt {
  readonly verifierRef: string;
  readonly keyRef: string;
  readonly verifierPublicKeyDigest: string;
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly registrarPublicKeyDigest: string;
  readonly certificateRef: string;
  readonly challengeDigest: string;
  readonly certificateEnvelopeDigest: string;
  readonly verifierKeyPossessionDemonstrated: true;
  readonly verifierPossessionSignatureValid: true;
  readonly registrarSignatureValid: true;
  readonly registrarDistinctFromVerifierRef: true;
  readonly enrollmentBoundToPinnedRegistrarKey: true;
  readonly enrollmentTimeWithinDeclaredValidityWindow: true;
  readonly registrarIdentityIndependentlyVerified: false;
  readonly registrarIndependenceIndependentlyVerified: false;
  readonly verifierIdentityIndependentlyVerified: false;
  readonly signingKeyOwnershipIndependentlyVerified: false;
  readonly publicKeyProvenanceIndependentlyAuthenticated: false;
  readonly currentValidityIndependentlyChecked: false;
  readonly revocationStatusIndependentlyChecked: false;
}

export interface FR229PinnedRegistrarVerifierKeyRegistry {
  readonly schemaVersion: 'fr229-pinned-registrar-verifier-key-registry-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR229_CONTRACT_VERSION;
  readonly authorityState:
    'verifier_key_enrollment_cryptographically_bound_to_caller_pinned_registrar_real_world_identity_unverified';
  readonly enrollmentCount: number;
  readonly verifierCount: number;
  readonly registrarCount: number;
  readonly receipts: readonly FR229VerifierKeyEnrollmentReceipt[];
  readonly registryDigest: string;
  readonly registryRef: string;
  readonly integrityBoundary: {
    readonly ed25519Required: true;
    readonly oneEnrollmentPerVerifierRequired: true;
    readonly uniqueVerifierKeyRefRequired: true;
    readonly uniqueCertificateRefRequired: true;
    readonly onePinnedKeyPerRegistrarRequired: true;
    readonly verifierRegistrarRefDistinctRequired: true;
    readonly verifierPossessionChallengeVerified: true;
    readonly registrarCertificateSignatureVerified: true;
    readonly publicKeyDigestsRecomputed: true;
    readonly enrollmentTimestampWithinDeclaredWindowRequired: true;
    readonly malformedKeyRejected: true;
    readonly malformedSignatureRejected: true;
  };
  readonly authorityBoundary: {
    readonly pinnedRegistrarMeansRegistrarIdentityVerified: false;
    readonly registrarSignatureMeansRegistrarIndependent: false;
    readonly possessionProofMeansVerifierIdentityVerified: false;
    readonly enrollmentCertificateMeansRealWorldKeyOwnershipVerified: false;
    readonly registrarIdentityIndependentlyVerified: false;
    readonly registrarIndependenceIndependentlyVerified: false;
    readonly verifierIdentityIndependentlyVerified: false;
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
  throw new FaceAuthorityValidationError(`FR-229 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('enrollment evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('enrollment evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('enrollment evidence must be JSON-compatible.');
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

function commonEnrollmentFields(input: Omit<
  FR229VerifierKeyEnrollment,
  'verifierPossessionSignatureBase64' | 'registrarSignatureBase64'
>) {
  safeRef(input.verifierRef, 'verifierRef');
  safeRef(input.keyRef, 'keyRef');
  safeRef(input.registrarRef, 'registrarRef');
  safeRef(input.registrarKeyRef, 'registrarKeyRef');
  safeRef(input.certificateRef, 'certificateRef');
  if (input.verifierRef === input.registrarRef) {
    fail('verifierRef and registrarRef must be distinct.');
  }
  const verifierDer = canonicalBase64(
    input.verifierPublicKeySpkiDerBase64,
    'verifierPublicKeySpkiDerBase64',
  );
  ed25519PublicKey(verifierDer, 'verifier public key');
  const enrolledAt = parseTime(input.enrolledAt, 'enrolledAt');
  const validFrom = parseTime(input.validFrom, 'validFrom');
  const validUntil = parseTime(input.validUntil, 'validUntil');
  if (validFrom > validUntil) fail('validFrom must not be after validUntil.');
  if (enrolledAt < validFrom || enrolledAt > validUntil) {
    fail('enrolledAt must fall inside the declared validity window.');
  }
  return {
    verifierPublicKeyDigest: sha256Bytes(verifierDer),
    verifierDer,
  };
}

export function buildVerifierKeyPossessionChallengeBytesFR229(input: Omit<
  FR229VerifierKeyEnrollment,
  'verifierPossessionSignatureBase64' | 'registrarSignatureBase64'
>): Uint8Array {
  const common = commonEnrollmentFields(input);
  return Buffer.from(canonicalJson({
    contractVersion: FR229_CONTRACT_VERSION,
    purpose: 'verifier_key_possession_challenge',
    verifierRef: input.verifierRef,
    keyRef: input.keyRef,
    verifierPublicKeyDigest: common.verifierPublicKeyDigest,
    registrarRef: input.registrarRef,
    registrarKeyRef: input.registrarKeyRef,
    certificateRef: input.certificateRef,
    enrolledAt: input.enrolledAt,
    validFrom: input.validFrom,
    validUntil: input.validUntil,
  }), 'utf8');
}

export function buildVerifierKeyEnrollmentCertificateBytesFR229(input: Omit<
  FR229VerifierKeyEnrollment,
  'registrarSignatureBase64'
>): Uint8Array {
  const base = {
    verifierRef: input.verifierRef,
    keyRef: input.keyRef,
    verifierPublicKeySpkiDerBase64: input.verifierPublicKeySpkiDerBase64,
    registrarRef: input.registrarRef,
    registrarKeyRef: input.registrarKeyRef,
    certificateRef: input.certificateRef,
    enrolledAt: input.enrolledAt,
    validFrom: input.validFrom,
    validUntil: input.validUntil,
  };
  const challengeBytes = buildVerifierKeyPossessionChallengeBytesFR229(base);
  const possessionSignature = canonicalBase64(
    input.verifierPossessionSignatureBase64,
    'verifierPossessionSignatureBase64',
  );
  if (possessionSignature.byteLength !== 64) {
    fail('verifier possession Ed25519 signature must be 64 bytes.');
  }
  return Buffer.from(canonicalJson({
    contractVersion: FR229_CONTRACT_VERSION,
    purpose: 'verifier_key_enrollment_certificate',
    ...base,
    verifierPublicKeyDigest: sha256Bytes(
      canonicalBase64(input.verifierPublicKeySpkiDerBase64, 'verifierPublicKeySpkiDerBase64'),
    ),
    challengeDigest: sha256Bytes(challengeBytes),
    verifierPossessionSignatureDigest: sha256Bytes(possessionSignature),
  }), 'utf8');
}

export function admitPinnedRegistrarVerifierKeyEnrollmentsFR229(input: {
  readonly registrarKeys: readonly FR229PinnedRegistrarKey[];
  readonly enrollments: readonly FR229VerifierKeyEnrollment[];
}): FR229PinnedRegistrarVerifierKeyRegistry {
  if (!Array.isArray(input.registrarKeys) || input.registrarKeys.length === 0) {
    fail('registrarKeys must contain at least one pinned registrar key.');
  }
  if (!Array.isArray(input.enrollments) || input.enrollments.length === 0) {
    fail('enrollments must contain at least one verifier-key enrollment.');
  }

  const registrars = new Map<string, {
    readonly registrarKeyRef: string;
    readonly publicKeyDer: Buffer;
    readonly publicKeyDigest: string;
  }>();
  const registrarKeyRefs = new Set<string>();
  for (const [index, entry] of input.registrarKeys.entries()) {
    safeRef(entry.registrarRef, `registrarKeys[${index}].registrarRef`);
    safeRef(entry.registrarKeyRef, `registrarKeys[${index}].registrarKeyRef`);
    if (registrars.has(entry.registrarRef)) {
      fail(`duplicate pinned registrar mapping: ${entry.registrarRef}.`);
    }
    if (registrarKeyRefs.has(entry.registrarKeyRef)) {
      fail(`duplicate registrarKeyRef: ${entry.registrarKeyRef}.`);
    }
    const der = canonicalBase64(
      entry.publicKeySpkiDerBase64,
      `registrarKeys[${index}].publicKeySpkiDerBase64`,
    );
    ed25519PublicKey(der, `registrarKeys[${index}]`);
    registrars.set(entry.registrarRef, Object.freeze({
      registrarKeyRef: entry.registrarKeyRef,
      publicKeyDer: der,
      publicKeyDigest: sha256Bytes(der),
    }));
    registrarKeyRefs.add(entry.registrarKeyRef);
  }

  const verifierRefs = new Set<string>();
  const verifierKeyRefs = new Set<string>();
  const certificateRefs = new Set<string>();

  const receipts = input.enrollments.map((enrollment, index) => {
    if (verifierRefs.has(enrollment.verifierRef)) {
      fail(`duplicate verifier enrollment: ${enrollment.verifierRef}.`);
    }
    if (verifierKeyRefs.has(enrollment.keyRef)) {
      fail(`duplicate verifier keyRef: ${enrollment.keyRef}.`);
    }
    if (certificateRefs.has(enrollment.certificateRef)) {
      fail(`duplicate certificateRef: ${enrollment.certificateRef}.`);
    }

    const common = commonEnrollmentFields(enrollment);
    const registrar = registrars.get(enrollment.registrarRef);
    if (registrar === undefined) {
      fail(`no pinned registrar key for registrar ${enrollment.registrarRef}.`);
    }
    if (registrar.registrarKeyRef !== enrollment.registrarKeyRef) {
      fail(`registrar keyRef mismatch for ${enrollment.registrarRef}.`);
    }

    const challengeBytes = buildVerifierKeyPossessionChallengeBytesFR229(enrollment);
    const possessionSignature = canonicalBase64(
      enrollment.verifierPossessionSignatureBase64,
      `enrollments[${index}].verifierPossessionSignatureBase64`,
    );
    if (possessionSignature.byteLength !== 64) {
      fail(`enrollments[${index}] verifier possession signature must be 64 bytes.`);
    }
    const verifierPublicKey = ed25519PublicKey(
      common.verifierDer,
      `enrollments[${index}] verifier public key`,
    );
    if (!verifySignature(null, challengeBytes, verifierPublicKey, possessionSignature)) {
      fail(`invalid verifier possession signature for ${enrollment.verifierRef}.`);
    }

    const certificateBytes = buildVerifierKeyEnrollmentCertificateBytesFR229(enrollment);
    const registrarSignature = canonicalBase64(
      enrollment.registrarSignatureBase64,
      `enrollments[${index}].registrarSignatureBase64`,
    );
    if (registrarSignature.byteLength !== 64) {
      fail(`enrollments[${index}] registrar signature must be 64 bytes.`);
    }
    const registrarPublicKey = ed25519PublicKey(
      registrar.publicKeyDer,
      `registrar ${enrollment.registrarRef}`,
    );
    if (!verifySignature(null, certificateBytes, registrarPublicKey, registrarSignature)) {
      fail(`invalid registrar signature for certificate ${enrollment.certificateRef}.`);
    }

    verifierRefs.add(enrollment.verifierRef);
    verifierKeyRefs.add(enrollment.keyRef);
    certificateRefs.add(enrollment.certificateRef);

    const receipt: FR229VerifierKeyEnrollmentReceipt = Object.freeze({
      verifierRef: enrollment.verifierRef,
      keyRef: enrollment.keyRef,
      verifierPublicKeyDigest: common.verifierPublicKeyDigest,
      registrarRef: enrollment.registrarRef,
      registrarKeyRef: enrollment.registrarKeyRef,
      registrarPublicKeyDigest: registrar.publicKeyDigest,
      certificateRef: enrollment.certificateRef,
      challengeDigest: sha256Bytes(challengeBytes),
      certificateEnvelopeDigest: sha256Bytes(certificateBytes),
      verifierKeyPossessionDemonstrated: true as const,
      verifierPossessionSignatureValid: true as const,
      registrarSignatureValid: true as const,
      registrarDistinctFromVerifierRef: true as const,
      enrollmentBoundToPinnedRegistrarKey: true as const,
      enrollmentTimeWithinDeclaredValidityWindow: true as const,
      registrarIdentityIndependentlyVerified: false as const,
      registrarIndependenceIndependentlyVerified: false as const,
      verifierIdentityIndependentlyVerified: false as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceIndependentlyAuthenticated: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
    });
    return receipt;
  }).sort((left, right) => left.verifierRef.localeCompare(right.verifierRef));

  const registryDigest = sha256Text(canonicalJson({
    contractVersion: FR229_CONTRACT_VERSION,
    receipts,
  }));

  const result: FR229PinnedRegistrarVerifierKeyRegistry = Object.freeze({
    schemaVersion: 'fr229-pinned-registrar-verifier-key-registry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR229_CONTRACT_VERSION,
    authorityState:
      'verifier_key_enrollment_cryptographically_bound_to_caller_pinned_registrar_real_world_identity_unverified' as const,
    enrollmentCount: receipts.length,
    verifierCount: verifierRefs.size,
    registrarCount: new Set(receipts.map((receipt) => receipt.registrarRef)).size,
    receipts: Object.freeze(receipts),
    registryDigest,
    registryRef:
      `evidence.fr229.verifier_key_registry:${registryDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      ed25519Required: true as const,
      oneEnrollmentPerVerifierRequired: true as const,
      uniqueVerifierKeyRefRequired: true as const,
      uniqueCertificateRefRequired: true as const,
      onePinnedKeyPerRegistrarRequired: true as const,
      verifierRegistrarRefDistinctRequired: true as const,
      verifierPossessionChallengeVerified: true as const,
      registrarCertificateSignatureVerified: true as const,
      publicKeyDigestsRecomputed: true as const,
      enrollmentTimestampWithinDeclaredWindowRequired: true as const,
      malformedKeyRejected: true as const,
      malformedSignatureRejected: true as const,
    }),
    authorityBoundary: Object.freeze({
      pinnedRegistrarMeansRegistrarIdentityVerified: false as const,
      registrarSignatureMeansRegistrarIndependent: false as const,
      possessionProofMeansVerifierIdentityVerified: false as const,
      enrollmentCertificateMeansRealWorldKeyOwnershipVerified: false as const,
      registrarIdentityIndependentlyVerified: false as const,
      registrarIndependenceIndependentlyVerified: false as const,
      verifierIdentityIndependentlyVerified: false as const,
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

export function assertPinnedRegistrarVerifierKeyRegistryFR229(
  registry: FR229PinnedRegistrarVerifierKeyRegistry,
): void {
  if (!ISSUED.has(registry)) {
    fail('verifier key registry was not issued by active FR229 runtime.');
  }
  if (
    registry.schemaVersion !== 'fr229-pinned-registrar-verifier-key-registry-v1'
    || registry.contractVersion !== FR229_CONTRACT_VERSION
    || registry.enrollmentCount !== registry.verifierCount
    || registry.integrityBoundary.ed25519Required !== true
    || registry.integrityBoundary.verifierPossessionChallengeVerified !== true
    || registry.integrityBoundary.registrarCertificateSignatureVerified !== true
    || registry.authorityBoundary.pinnedRegistrarMeansRegistrarIdentityVerified !== false
    || registry.authorityBoundary.registrarSignatureMeansRegistrarIndependent !== false
    || registry.authorityBoundary.possessionProofMeansVerifierIdentityVerified !== false
    || registry.authorityBoundary.enrollmentCertificateMeansRealWorldKeyOwnershipVerified !== false
    || registry.authorityBoundary.verifierIdentityIndependentlyVerified !== false
    || registry.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated !== false
    || registry.authorityBoundary.witnessClaimIndependentlyEstablished !== false
    || registry.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || registry.authorityBoundary.empiricalSufficiencyEstablished !== false
    || registry.authorityBoundary.calibrationAuthorized !== false
    || registry.authorityBoundary.thresholdIssued !== false
    || registry.authorityBoundary.classifierIssued !== false
    || registry.authorityBoundary.traditionalBindingIssued !== false
  ) fail('FR229 verifier-key registry authority boundary drift.');
}
