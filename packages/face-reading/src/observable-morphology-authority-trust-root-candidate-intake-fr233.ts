import { createHash } from 'node:crypto';
import {
  assertAuthorityChainBoundWitnessSignatureVerificationFR232,
  type FR232AuthorityChainBoundWitnessSignatureVerification,
} from './observable-morphology-authority-chain-bound-witness-signatures-fr232.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR233_CONTRACT_VERSION =
  'FR233-AUTHORITY-TRUST-ROOT-CANDIDATE-INTAKE-v1' as const;

const MAX_TRUST_ROOT_ARTIFACT_BYTES = 1024 * 1024;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const ISSUED = new WeakSet<object>();

export interface FR233AuthorityTrustRootCandidateInput {
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly authorityPublicKeyDigest: string;
  readonly trustRootCandidateRef: string;
  readonly trustRootArtifactRef: string;
  readonly declaredTrustRootArtifactDigest: string;
  readonly trustRootArtifactBytes: Uint8Array;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
  readonly trustRootPolicyRef: string;
  readonly validityPolicyRef: string;
  readonly revocationStatusPolicyRef: string;
  readonly semanticVerifierRef: string;
}

export interface FR233AuthorityTrustRootCandidateReceipt {
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly authorityPublicKeyDigest: string;
  readonly trustRootCandidateRef: string;
  readonly trustRootArtifactRef: string;
  readonly trustRootArtifactDigest: string;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
  readonly trustRootPolicyRef: string;
  readonly validityPolicyRef: string;
  readonly revocationStatusPolicyRef: string;
  readonly semanticVerifierRef: string;
  readonly authorityMappingMatchesFR232: true;
  readonly trustRootArtifactByteIdentityVerified: true;
  readonly trustRootArtifactBytesRetainedInOutput: false;
  readonly trustRootFormatSemanticallyParsed: false;
  readonly trustRootArtifactSemanticContentVerified: false;
  readonly authorityIdentityIndependentlyVerified: false;
  readonly authorityIndependenceIndependentlyVerified: false;
  readonly authorityKeyPinnedByExternalGovernance: false;
  readonly currentValidityIndependentlyChecked: false;
  readonly revocationStatusIndependentlyChecked: false;
  readonly externalTrustRootProvisioned: false;
}

export interface FR233AuthorityTrustRootCandidateIntake {
  readonly schemaVersion: 'fr233-authority-trust-root-candidate-intake-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR233_CONTRACT_VERSION;
  readonly authorityState:
    'authority_trust_root_candidate_bytes_bound_to_fr232_authority_keys_no_external_governance_or_real_world_identity_verified';
  readonly sourceFR232VerificationRef: string;
  readonly sourceFR232VerificationDigest: string;
  readonly authorityCount: number;
  readonly receipts: readonly FR233AuthorityTrustRootCandidateReceipt[];
  readonly intakeDigest: string;
  readonly intakeRef: string;
  readonly integrityBoundary: {
    readonly activeFR232VerificationRequired: true;
    readonly exactAuthorityCoverageRequired: true;
    readonly oneCandidatePerAuthorityRequired: true;
    readonly authorityRefKeyRefDigestMatchRequired: true;
    readonly uniqueCandidateRefRequired: true;
    readonly uniqueTrustRootArtifactRefRequired: true;
    readonly boundedArtifactBytesRequired: true;
    readonly declaredArtifactDigestExactMatchRequired: true;
    readonly artifactBytesOmittedFromOutput: true;
  };
  readonly authorityBoundary: {
    readonly candidateByteIdentityMeansExternalTrust: false;
    readonly opaqueAuthorityIdentityEvidenceRefMeansIdentityVerified: false;
    readonly opaqueKeyPinningEvidenceRefMeansExternallyPinned: false;
    readonly opaquePolicyRefsMeanPoliciesVerified: false;
    readonly semanticVerifierRefMeansGovernedVerifier: false;
    readonly trustRootFormatSemanticallyParsed: false;
    readonly trustRootArtifactSemanticContentVerified: false;
    readonly authorityIdentityIndependentlyVerified: false;
    readonly authorityIndependenceIndependentlyVerified: false;
    readonly authorityKeyPinnedByExternalGovernance: false;
    readonly signingKeyOwnershipIndependentlyVerified: false;
    readonly publicKeyProvenanceIndependentlyAuthenticated: false;
    readonly currentValidityIndependentlyChecked: false;
    readonly revocationStatusIndependentlyChecked: false;
    readonly externalTrustRootProvisioned: false;
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

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-233 ${message}`);
}

function safeRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return value;
}

function safeDigest(value: string, label: string): string {
  if (typeof value !== 'string' || !SHA256.test(value)) {
    fail(`${label} must be a canonical lowercase sha256 digest.`);
  }
  return value;
}

function sha256Bytes(value: Uint8Array): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('intake material cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('intake material cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('intake material must be JSON-compatible.');
}

function sha256Text(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

export function computeAuthorityTrustRootArtifactDigestFR233(bytes: Uint8Array): string {
  if (!(bytes instanceof Uint8Array)) {
    fail('trust-root artifact bytes must be Uint8Array evidence bytes.');
  }
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_TRUST_ROOT_ARTIFACT_BYTES) {
    fail(`trust-root artifact bytes must be between 1 and ${MAX_TRUST_ROOT_ARTIFACT_BYTES} bytes.`);
  }
  return sha256Bytes(bytes);
}

export function intakeAuthorityTrustRootCandidateMaterialFR233(input: {
  readonly authorityChain: FR232AuthorityChainBoundWitnessSignatureVerification;
  readonly candidates: readonly FR233AuthorityTrustRootCandidateInput[];
}): FR233AuthorityTrustRootCandidateIntake {
  assertAuthorityChainBoundWitnessSignatureVerificationFR232(input.authorityChain);

  const authorityMappings = new Map<string, {
    readonly authorityKeyRef: string;
    readonly authorityPublicKeyDigest: string;
  }>();
  for (const receipt of input.authorityChain.receipts) {
    const existing = authorityMappings.get(receipt.authorityRef);
    if (
      existing !== undefined
      && (
        existing.authorityKeyRef !== receipt.authorityKeyRef
        || existing.authorityPublicKeyDigest !== receipt.authorityPublicKeyDigest
      )
    ) {
      fail(`inconsistent FR232 authority mapping: ${receipt.authorityRef}.`);
    }
    authorityMappings.set(receipt.authorityRef, {
      authorityKeyRef: receipt.authorityKeyRef,
      authorityPublicKeyDigest: receipt.authorityPublicKeyDigest,
    });
  }

  if (input.candidates.length !== authorityMappings.size) {
    fail('candidate material must exactly cover every distinct FR232 authority mapping.');
  }

  const seenAuthorities = new Set<string>();
  const seenCandidateRefs = new Set<string>();
  const seenArtifactRefs = new Set<string>();
  const receipts: FR233AuthorityTrustRootCandidateReceipt[] = [];

  for (const candidate of input.candidates) {
    safeRef(candidate.authorityRef, 'authorityRef');
    safeRef(candidate.authorityKeyRef, 'authorityKeyRef');
    safeDigest(candidate.authorityPublicKeyDigest, 'authorityPublicKeyDigest');
    safeRef(candidate.trustRootCandidateRef, 'trustRootCandidateRef');
    safeRef(candidate.trustRootArtifactRef, 'trustRootArtifactRef');
    safeDigest(candidate.declaredTrustRootArtifactDigest, 'declaredTrustRootArtifactDigest');
    safeRef(candidate.authorityIdentityEvidenceRef, 'authorityIdentityEvidenceRef');
    safeRef(candidate.externalKeyPinningEvidenceRef, 'externalKeyPinningEvidenceRef');
    safeRef(candidate.trustRootPolicyRef, 'trustRootPolicyRef');
    safeRef(candidate.validityPolicyRef, 'validityPolicyRef');
    safeRef(candidate.revocationStatusPolicyRef, 'revocationStatusPolicyRef');
    safeRef(candidate.semanticVerifierRef, 'semanticVerifierRef');

    if (seenAuthorities.has(candidate.authorityRef)) {
      fail(`duplicate authority candidate: ${candidate.authorityRef}.`);
    }
    if (seenCandidateRefs.has(candidate.trustRootCandidateRef)) {
      fail(`duplicate trustRootCandidateRef: ${candidate.trustRootCandidateRef}.`);
    }
    if (seenArtifactRefs.has(candidate.trustRootArtifactRef)) {
      fail(`duplicate trustRootArtifactRef: ${candidate.trustRootArtifactRef}.`);
    }

    const expected = authorityMappings.get(candidate.authorityRef);
    if (expected === undefined) {
      fail(`candidate authorityRef is not present in active FR232 chain: ${candidate.authorityRef}.`);
    }
    if (
      candidate.authorityKeyRef !== expected.authorityKeyRef
      || candidate.authorityPublicKeyDigest !== expected.authorityPublicKeyDigest
    ) {
      fail(`candidate authority key binding drift for ${candidate.authorityRef}.`);
    }

    const actualArtifactDigest =
      computeAuthorityTrustRootArtifactDigestFR233(candidate.trustRootArtifactBytes);
    if (actualArtifactDigest !== candidate.declaredTrustRootArtifactDigest) {
      fail(`trust-root artifact byte digest mismatch for ${candidate.authorityRef}.`);
    }

    seenAuthorities.add(candidate.authorityRef);
    seenCandidateRefs.add(candidate.trustRootCandidateRef);
    seenArtifactRefs.add(candidate.trustRootArtifactRef);
    receipts.push(Object.freeze({
      authorityRef: candidate.authorityRef,
      authorityKeyRef: candidate.authorityKeyRef,
      authorityPublicKeyDigest: candidate.authorityPublicKeyDigest,
      trustRootCandidateRef: candidate.trustRootCandidateRef,
      trustRootArtifactRef: candidate.trustRootArtifactRef,
      trustRootArtifactDigest: actualArtifactDigest,
      authorityIdentityEvidenceRef: candidate.authorityIdentityEvidenceRef,
      externalKeyPinningEvidenceRef: candidate.externalKeyPinningEvidenceRef,
      trustRootPolicyRef: candidate.trustRootPolicyRef,
      validityPolicyRef: candidate.validityPolicyRef,
      revocationStatusPolicyRef: candidate.revocationStatusPolicyRef,
      semanticVerifierRef: candidate.semanticVerifierRef,
      authorityMappingMatchesFR232: true as const,
      trustRootArtifactByteIdentityVerified: true as const,
      trustRootArtifactBytesRetainedInOutput: false as const,
      trustRootFormatSemanticallyParsed: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      authorityIdentityIndependentlyVerified: false as const,
      authorityIndependenceIndependentlyVerified: false as const,
      authorityKeyPinnedByExternalGovernance: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
      externalTrustRootProvisioned: false as const,
    }));
  }

  for (const authorityRef of authorityMappings.keys()) {
    if (!seenAuthorities.has(authorityRef)) {
      fail(`missing trust-root candidate for FR232 authority: ${authorityRef}.`);
    }
  }

  receipts.sort((left, right) => left.authorityRef.localeCompare(right.authorityRef));

  const intakeDigest = sha256Text(canonicalJson({
    contractVersion: FR233_CONTRACT_VERSION,
    sourceFR232VerificationRef: input.authorityChain.verificationRef,
    sourceFR232VerificationDigest: input.authorityChain.verificationDigest,
    receipts,
  }));

  const result: FR233AuthorityTrustRootCandidateIntake = Object.freeze({
    schemaVersion: 'fr233-authority-trust-root-candidate-intake-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR233_CONTRACT_VERSION,
    authorityState:
      'authority_trust_root_candidate_bytes_bound_to_fr232_authority_keys_no_external_governance_or_real_world_identity_verified' as const,
    sourceFR232VerificationRef: input.authorityChain.verificationRef,
    sourceFR232VerificationDigest: input.authorityChain.verificationDigest,
    authorityCount: authorityMappings.size,
    receipts: Object.freeze(receipts),
    intakeDigest,
    intakeRef:
      `evidence.fr233.authority_trust_root_candidate_intake:${intakeDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR232VerificationRequired: true as const,
      exactAuthorityCoverageRequired: true as const,
      oneCandidatePerAuthorityRequired: true as const,
      authorityRefKeyRefDigestMatchRequired: true as const,
      uniqueCandidateRefRequired: true as const,
      uniqueTrustRootArtifactRefRequired: true as const,
      boundedArtifactBytesRequired: true as const,
      declaredArtifactDigestExactMatchRequired: true as const,
      artifactBytesOmittedFromOutput: true as const,
    }),
    authorityBoundary: Object.freeze({
      candidateByteIdentityMeansExternalTrust: false as const,
      opaqueAuthorityIdentityEvidenceRefMeansIdentityVerified: false as const,
      opaqueKeyPinningEvidenceRefMeansExternallyPinned: false as const,
      opaquePolicyRefsMeanPoliciesVerified: false as const,
      semanticVerifierRefMeansGovernedVerifier: false as const,
      trustRootFormatSemanticallyParsed: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      authorityIdentityIndependentlyVerified: false as const,
      authorityIndependenceIndependentlyVerified: false as const,
      authorityKeyPinnedByExternalGovernance: false as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceIndependentlyAuthenticated: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
      externalTrustRootProvisioned: false as const,
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

export function assertAuthorityTrustRootCandidateIntakeFR233(
  intake: FR233AuthorityTrustRootCandidateIntake,
): void {
  if (!ISSUED.has(intake)) {
    fail('authority trust-root candidate intake was not issued by active FR233 runtime.');
  }
  if (
    intake.schemaVersion !== 'fr233-authority-trust-root-candidate-intake-v1'
    || intake.contractVersion !== FR233_CONTRACT_VERSION
    || intake.authorityCount !== intake.receipts.length
    || intake.integrityBoundary.activeFR232VerificationRequired !== true
    || intake.integrityBoundary.exactAuthorityCoverageRequired !== true
    || intake.integrityBoundary.authorityRefKeyRefDigestMatchRequired !== true
    || intake.integrityBoundary.declaredArtifactDigestExactMatchRequired !== true
    || intake.integrityBoundary.artifactBytesOmittedFromOutput !== true
    || intake.authorityBoundary.candidateByteIdentityMeansExternalTrust !== false
    || intake.authorityBoundary.authorityIdentityIndependentlyVerified !== false
    || intake.authorityBoundary.authorityKeyPinnedByExternalGovernance !== false
    || intake.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated !== false
    || intake.authorityBoundary.currentValidityIndependentlyChecked !== false
    || intake.authorityBoundary.revocationStatusIndependentlyChecked !== false
    || intake.authorityBoundary.externalTrustRootProvisioned !== false
    || intake.authorityBoundary.witnessClaimIndependentlyEstablished !== false
    || intake.authorityBoundary.empiricalSufficiencyEstablished !== false
    || intake.authorityBoundary.calibrationAuthorized !== false
    || intake.authorityBoundary.thresholdIssued !== false
    || intake.authorityBoundary.classifierIssued !== false
    || intake.authorityBoundary.traditionalBindingIssued !== false
    || intake.authorityBoundary.productionActivated !== false
    || intake.authorityBoundary.commerceActivated !== false
  ) {
    fail('FR233 authority trust-root candidate intake authority boundary drift.');
  }
}
