import { createHash } from 'node:crypto';
import {
  assertEnrollmentBoundWitnessSignatureVerificationFR230,
  type FR230EnrollmentBoundWitnessSignatureVerification,
} from './observable-morphology-enrollment-bound-witness-signatures-fr230.js';
import {
  assertExternalAuthorityRegistrarRegistryFR231,
  type FR231ExternalAuthorityRegistrarRegistry,
  type FR231RegistrarAuthorityAttestationReceipt,
} from './observable-morphology-external-authority-registrar-attestations-fr231.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR232_CONTRACT_VERSION =
  'FR232-AUTHORITY-CHAIN-BOUND-WITNESS-SIGNATURE-v1' as const;

export interface FR232AuthorityChainBoundWitnessReceipt {
  readonly witnessRef: string;
  readonly verifierRef: string;
  readonly verifierKeyRef: string;
  readonly verifierPublicKeyDigest: string;
  readonly witnessSignatureRef: string;
  readonly witnessEnvelopeDigest: string;
  readonly registrarRef: string;
  readonly registrarKeyRef: string;
  readonly registrarPublicKeyDigest: string;
  readonly verifierEnrollmentCertificateRef: string;
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly authorityPublicKeyDigest: string;
  readonly registrarAuthorityCertificateRef: string;
  readonly registrarAuthorityAttestationEnvelopeDigest: string;
  readonly verifierEnrollmentMatchesFR230: true;
  readonly registrarAuthorityMappingMatchesFR231: true;
  readonly authoritySignaturePreviouslyVerifiedByActiveFR231: true;
  readonly witnessSignaturePreviouslyVerifiedByActiveFR230: true;
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
}

export interface FR232AuthorityChainBoundWitnessSignatureVerification {
  readonly schemaVersion: 'fr232-authority-chain-bound-witness-signature-verification-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR232_CONTRACT_VERSION;
  readonly authorityState:
    'fr230_witness_path_bound_to_active_fr231_registrar_authority_attestations_real_world_identity_and_claim_truth_unverified';
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly sourceFR230VerificationRef: string;
  readonly sourceFR230VerificationDigest: string;
  readonly sourceFR231RegistryRef: string;
  readonly sourceFR231RegistryDigest: string;
  readonly sourceFR229RegistryRef: string;
  readonly sourceFR229RegistryDigest: string;
  readonly witnessCount: number;
  readonly registrarCount: number;
  readonly authorityCount: number;
  readonly receipts: readonly FR232AuthorityChainBoundWitnessReceipt[];
  readonly verificationDigest: string;
  readonly verificationRef: string;
  readonly integrityBoundary: {
    readonly activeFR230VerificationRequired: true;
    readonly activeFR231RegistryRequired: true;
    readonly exactSharedFR229RegistryRefRequired: true;
    readonly exactSharedFR229RegistryDigestRequired: true;
    readonly exactRegistrarCoverageRequired: true;
    readonly duplicateFR230RegistrarMappingRejected: true;
    readonly duplicateFR231RegistrarMappingRejected: true;
    readonly registrarRefKeyRefDigestMatchRequired: true;
    readonly authorityCertificateProvenanceBound: true;
    readonly witnessAndEnrollmentProvenanceBound: true;
  };
  readonly authorityBoundary: {
    readonly authorityChainMeansAuthorityIdentityVerified: false;
    readonly authorityChainMeansAuthorityIndependent: false;
    readonly authorityChainMeansRegistrarIdentityVerified: false;
    readonly authorityChainMeansVerifierIdentityVerified: false;
    readonly authorityChainMeansRealWorldKeyOwnershipVerified: false;
    readonly authorityChainMeansWitnessClaimTrue: false;
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

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-232 ${message}`);
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

function registrarMapFromFR231(
  registry: FR231ExternalAuthorityRegistrarRegistry,
): ReadonlyMap<string, FR231RegistrarAuthorityAttestationReceipt> {
  const map = new Map<string, FR231RegistrarAuthorityAttestationReceipt>();
  for (const receipt of registry.receipts) {
    if (map.has(receipt.registrarRef)) {
      fail(`duplicate FR231 registrar mapping: ${receipt.registrarRef}.`);
    }
    map.set(receipt.registrarRef, receipt);
  }
  return map;
}

export function bindWitnessSignaturesToRegistrarAuthorityChainFR232(input: {
  readonly witnessVerification: FR230EnrollmentBoundWitnessSignatureVerification;
  readonly registrarAuthorityRegistry: FR231ExternalAuthorityRegistrarRegistry;
}): FR232AuthorityChainBoundWitnessSignatureVerification {
  assertEnrollmentBoundWitnessSignatureVerificationFR230(input.witnessVerification);
  assertExternalAuthorityRegistrarRegistryFR231(input.registrarAuthorityRegistry);

  if (
    input.witnessVerification.sourceVerifierKeyRegistryRef
      !== input.registrarAuthorityRegistry.sourceFR229RegistryRef
  ) {
    fail('FR230 and FR231 must reference the exact same FR229 registryRef.');
  }
  if (
    input.witnessVerification.sourceVerifierKeyRegistryDigest
      !== input.registrarAuthorityRegistry.sourceFR229RegistryDigest
  ) {
    fail('FR230 and FR231 must reference the exact same FR229 registryDigest.');
  }

  const fr231ByRegistrar = registrarMapFromFR231(input.registrarAuthorityRegistry);
  const fr230RegistrarMappings = new Map<string, {
    readonly registrarKeyRef: string;
    readonly registrarPublicKeyDigest: string;
  }>();

  for (const receipt of input.witnessVerification.receipts) {
    const existing = fr230RegistrarMappings.get(receipt.registrarRef);
    if (
      existing !== undefined
      && (
        existing.registrarKeyRef !== receipt.registrarKeyRef
        || existing.registrarPublicKeyDigest !== receipt.registrarPublicKeyDigest
      )
    ) {
      fail(`inconsistent FR230 registrar mapping: ${receipt.registrarRef}.`);
    }
    fr230RegistrarMappings.set(receipt.registrarRef, {
      registrarKeyRef: receipt.registrarKeyRef,
      registrarPublicKeyDigest: receipt.registrarPublicKeyDigest,
    });
  }

  if (fr230RegistrarMappings.size !== fr231ByRegistrar.size) {
    fail('FR230 witness path and FR231 authority registry must have exact registrar coverage.');
  }
  for (const registrarRef of fr231ByRegistrar.keys()) {
    if (!fr230RegistrarMappings.has(registrarRef)) {
      fail(`extra FR231 registrar authority mapping outside FR230 witness path: ${registrarRef}.`);
    }
  }

  const receipts = input.witnessVerification.receipts.map((witness) => {
    const authority = fr231ByRegistrar.get(witness.registrarRef);
    if (authority === undefined) {
      fail(`missing FR231 registrar authority mapping for ${witness.registrarRef}.`);
    }
    if (
      authority.registrarKeyRef !== witness.registrarKeyRef
      || authority.registrarPublicKeyDigest !== witness.registrarPublicKeyDigest
    ) {
      fail(`FR230/FR231 registrar key binding drift for ${witness.registrarRef}.`);
    }

    const receipt: FR232AuthorityChainBoundWitnessReceipt = Object.freeze({
      witnessRef: witness.witnessRef,
      verifierRef: witness.verifierRef,
      verifierKeyRef: witness.keyRef,
      verifierPublicKeyDigest: witness.verifierPublicKeyDigest,
      witnessSignatureRef: witness.signatureRef,
      witnessEnvelopeDigest: witness.witnessEnvelopeDigest,
      registrarRef: witness.registrarRef,
      registrarKeyRef: witness.registrarKeyRef,
      registrarPublicKeyDigest: witness.registrarPublicKeyDigest,
      verifierEnrollmentCertificateRef: witness.certificateRef,
      authorityRef: authority.authorityRef,
      authorityKeyRef: authority.authorityKeyRef,
      authorityPublicKeyDigest: authority.authorityPublicKeyDigest,
      registrarAuthorityCertificateRef: authority.certificateRef,
      registrarAuthorityAttestationEnvelopeDigest: authority.attestationEnvelopeDigest,
      verifierEnrollmentMatchesFR230: true as const,
      registrarAuthorityMappingMatchesFR231: true as const,
      authoritySignaturePreviouslyVerifiedByActiveFR231: true as const,
      witnessSignaturePreviouslyVerifiedByActiveFR230: true as const,
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
    });
    return receipt;
  }).sort((left, right) => left.witnessRef.localeCompare(right.witnessRef));

  const verificationDigest = sha256Text(canonicalJson({
    contractVersion: FR232_CONTRACT_VERSION,
    studyGateRef: input.witnessVerification.studyGateRef,
    studyGateDigest: input.witnessVerification.studyGateDigest,
    sourceFR230VerificationRef: input.witnessVerification.verificationRef,
    sourceFR230VerificationDigest: input.witnessVerification.verificationDigest,
    sourceFR231RegistryRef: input.registrarAuthorityRegistry.registryRef,
    sourceFR231RegistryDigest: input.registrarAuthorityRegistry.registryDigest,
    sourceFR229RegistryRef: input.witnessVerification.sourceVerifierKeyRegistryRef,
    sourceFR229RegistryDigest: input.witnessVerification.sourceVerifierKeyRegistryDigest,
    receipts,
  }));

  const result: FR232AuthorityChainBoundWitnessSignatureVerification = Object.freeze({
    schemaVersion: 'fr232-authority-chain-bound-witness-signature-verification-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR232_CONTRACT_VERSION,
    authorityState:
      'fr230_witness_path_bound_to_active_fr231_registrar_authority_attestations_real_world_identity_and_claim_truth_unverified' as const,
    studyGateRef: input.witnessVerification.studyGateRef,
    studyGateDigest: input.witnessVerification.studyGateDigest,
    sourceFR230VerificationRef: input.witnessVerification.verificationRef,
    sourceFR230VerificationDigest: input.witnessVerification.verificationDigest,
    sourceFR231RegistryRef: input.registrarAuthorityRegistry.registryRef,
    sourceFR231RegistryDigest: input.registrarAuthorityRegistry.registryDigest,
    sourceFR229RegistryRef: input.witnessVerification.sourceVerifierKeyRegistryRef,
    sourceFR229RegistryDigest: input.witnessVerification.sourceVerifierKeyRegistryDigest,
    witnessCount: receipts.length,
    registrarCount: fr230RegistrarMappings.size,
    authorityCount: new Set(receipts.map((receipt) => receipt.authorityRef)).size,
    receipts: Object.freeze(receipts),
    verificationDigest,
    verificationRef:
      `evidence.fr232.authority_chain_bound_witness_signature:${verificationDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR230VerificationRequired: true as const,
      activeFR231RegistryRequired: true as const,
      exactSharedFR229RegistryRefRequired: true as const,
      exactSharedFR229RegistryDigestRequired: true as const,
      exactRegistrarCoverageRequired: true as const,
      duplicateFR230RegistrarMappingRejected: true as const,
      duplicateFR231RegistrarMappingRejected: true as const,
      registrarRefKeyRefDigestMatchRequired: true as const,
      authorityCertificateProvenanceBound: true as const,
      witnessAndEnrollmentProvenanceBound: true as const,
    }),
    authorityBoundary: Object.freeze({
      authorityChainMeansAuthorityIdentityVerified: false as const,
      authorityChainMeansAuthorityIndependent: false as const,
      authorityChainMeansRegistrarIdentityVerified: false as const,
      authorityChainMeansVerifierIdentityVerified: false as const,
      authorityChainMeansRealWorldKeyOwnershipVerified: false as const,
      authorityChainMeansWitnessClaimTrue: false as const,
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

export function assertAuthorityChainBoundWitnessSignatureVerificationFR232(
  verification: FR232AuthorityChainBoundWitnessSignatureVerification,
): void {
  if (!ISSUED.has(verification)) {
    fail('authority-chain-bound witness verification was not issued by active FR232 runtime.');
  }
  if (
    verification.schemaVersion
      !== 'fr232-authority-chain-bound-witness-signature-verification-v1'
    || verification.contractVersion !== FR232_CONTRACT_VERSION
    || verification.witnessCount !== verification.receipts.length
    || verification.integrityBoundary.activeFR230VerificationRequired !== true
    || verification.integrityBoundary.activeFR231RegistryRequired !== true
    || verification.integrityBoundary.exactSharedFR229RegistryRefRequired !== true
    || verification.integrityBoundary.exactSharedFR229RegistryDigestRequired !== true
    || verification.integrityBoundary.exactRegistrarCoverageRequired !== true
    || verification.integrityBoundary.registrarRefKeyRefDigestMatchRequired !== true
    || verification.authorityBoundary.authorityChainMeansAuthorityIdentityVerified !== false
    || verification.authorityBoundary.authorityChainMeansRegistrarIdentityVerified !== false
    || verification.authorityBoundary.authorityChainMeansVerifierIdentityVerified !== false
    || verification.authorityBoundary.authorityChainMeansRealWorldKeyOwnershipVerified !== false
    || verification.authorityBoundary.authorityChainMeansWitnessClaimTrue !== false
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
  ) {
    fail('FR232 authority-chain-bound witness verification authority boundary drift.');
  }
}
