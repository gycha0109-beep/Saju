import { createHash } from 'node:crypto';
import {
  FR154_NEXT_FRONTIER,
  assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154,
  getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154,
  type SquareBroadFangWitnessSignatureMechanicalVerificationEntryFR154V1,
  type SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1,
} from './five-officers-square-broad-fang-witness-signature-mechanical-verification-fr154.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR155_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_witness_trust_evidence_intake.fr155' as const;
export const FR155_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr155-square-broad-fang-witness-trust-evidence-intake.md' as const;
export const FR155_NEXT_FRONTIER =
  'square_broad_fang_external_witness_trust_root_provisioning_and_semantic_trust_evidence_verification_plus_prospective_capture_execution_before_independent_session_admission' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const REQUEST_KEYS = new Set(['schemaVersion', 'fr154Verification', 'trustEvidenceRecords']);
const RECORD_KEYS = new Set([
  'sessionRef',
  'signerKeyRef',
  'signerPublicKeySpkiDigest',
  'witnessAuthorityRef',
  'trustEvidenceArtifactRef',
  'trustEvidenceIssuerRef',
  'trustEvidenceClassClaim',
  'declaredTrustEvidenceArtifactDigest',
  'trustEvidenceArtifactBytes',
  'signerToWitnessAuthorityBindingClaimRef',
]);
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangWitnessTrustEvidenceCandidateFR155V1 {
  readonly sessionRef: string;
  readonly signerKeyRef: string;
  readonly signerPublicKeySpkiDigest: string;
  readonly witnessAuthorityRef: string;
  readonly trustEvidenceArtifactRef: string;
  readonly trustEvidenceIssuerRef: string;
  readonly trustEvidenceClassClaim:
    'signer_key_to_witness_authority_binding_evidence_claim_not_semantically_verified';
  readonly declaredTrustEvidenceArtifactDigest: string;
  readonly trustEvidenceArtifactBytes: Uint8Array;
  readonly signerToWitnessAuthorityBindingClaimRef: string;
}

export interface SquareBroadFangWitnessTrustEvidenceIntakeRequestFR155V1 {
  readonly schemaVersion: 'fr155-square-broad-fang-witness-trust-evidence-intake-request-v1';
  readonly fr154Verification: SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1;
  readonly trustEvidenceRecords: readonly SquareBroadFangWitnessTrustEvidenceCandidateFR155V1[];
}

export interface SquareBroadFangWitnessTrustEvidenceRecordFR155V1 {
  readonly sessionRef: string;
  readonly signerKeyRef: string;
  readonly signerPublicKeySpkiDigest: string;
  readonly witnessAuthorityRef: string;
  readonly trustEvidenceArtifactRef: string;
  readonly trustEvidenceIssuerRef: string;
  readonly trustEvidenceClassClaim:
    'signer_key_to_witness_authority_binding_evidence_claim_not_semantically_verified';
  readonly trustEvidenceArtifactDigest: string;
  readonly trustEvidenceArtifactBytesVerifiedAtIntake: true;
  readonly fr154SignerCoordinatesExactMatchVerified: true;
  readonly signerToWitnessAuthorityBindingClaimRef: string;
  readonly trustEvidenceIssuerIdentityVerified: false;
  readonly trustEvidenceIssuerTrusted: false;
  readonly trustEvidenceSemanticContentVerified: false;
  readonly signerToWitnessAuthorityBindingVerified: false;
  readonly signerKeyTrustEstablished: false;
  readonly witnessAuthorityTrustBound: false;
  readonly independentSessionEvidenceAdmitted: false;
}

export interface SquareBroadFangWitnessTrustEvidenceIntakeFR155V1 {
  readonly schemaVersion: 'fr155-square-broad-fang-witness-trust-evidence-intake-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR155_RECORD_ID;
  readonly authorityState: 'candidate_witness_trust_evidence_bytes_verified_and_bound_to_fr154_coordinates_no_external_trust_root_or_witness_trust';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly predecessor: {
    readonly fr154NextFrontier: typeof FR154_NEXT_FRONTIER;
    readonly issuedFR154VerificationRequired: true;
    readonly fr154MechanicalSignatureVerificationPerformed: true;
    readonly fr154SignerKeyTrustEstablished: false;
    readonly fr154WitnessAuthorityTrustBound: false;
    readonly fr154IndependentSessionEvidenceAdmitted: false;
    readonly fr154ProductionWitnessVerificationAlgorithm: null;
    readonly fr154PinnedWitnessTrustRootRef: null;
  };
  readonly evidenceBundleRef: string;
  readonly candidateEvidenceBundleDigest: string;
  readonly trustEvidenceRecords: readonly SquareBroadFangWitnessTrustEvidenceRecordFR155V1[];
  readonly trustEvidenceRecordCount: number;
  readonly distinctTrustEvidenceArtifactRefCount: number;
  readonly candidateTrustEvidenceBundleDigest: string;
  readonly intakeBoundary: {
    readonly exactFR154VerificationCoverageRequired: true;
    readonly exactSignerCoordinateMatchRequired: true;
    readonly trustEvidenceArtifactBytesRequiredAtIntake: true;
    readonly trustEvidenceArtifactDeclaredDigestExactMatchRequired: true;
    readonly trustEvidenceArtifactBytesRetainedInOutput: false;
    readonly trustEvidenceByteIdentityVerifiedForEveryEntry: true;
    readonly candidateTrustEvidenceBundleMaterialized: true;
    readonly callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer: false;
    readonly trustEvidenceByteDigestMatchMeansSemanticContentVerified: false;
    readonly trustEvidenceByteDigestMatchMeansSignerTrustEstablished: false;
    readonly exactFR154SignerCoordinateMatchMeansSignerTrustEstablished: false;
    readonly bindingClaimRefMeansBindingVerified: false;
  };
  readonly trustBoundary: {
    readonly trustEvidenceIssuerIdentityVerified: false;
    readonly trustEvidenceIssuerTrusted: false;
    readonly trustEvidenceSemanticContentVerified: false;
    readonly signerToWitnessAuthorityBindingVerified: false;
    readonly signerKeyTrustEstablished: false;
    readonly witnessAuthorityTrustBound: false;
    readonly externalWitnessIdentityVerified: false;
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly governedWitnessTrustRootEstablished: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly authorityBoundary: {
    readonly candidateWitnessTrustEvidenceIntakePerformed: true;
    readonly independentMultiSessionEvidenceAcquired: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly candidateConstructAdvanceDecision:
      'blocked_pending_external_trust_root_semantic_trust_verification_and_real_prospective_session_evidence';
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityClassificationIssued: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImageAcceptedByThisArtifact: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawPixelRasterPersisted: false;
    readonly rawAggregatePersisted: false;
    readonly sourceDigestAcceptedByThisArtifact: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly trustEvidenceArtifactBytesPersistedInOutput: false;
    readonly trustEvidenceArtifactDigestPersisted: true;
    readonly signerPublicKeyPemPersisted: false;
    readonly detachedSignatureBytesPersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR155_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR155_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-155 ${message}`);
}

function exactKeys(value: object, allowed: ReadonlySet<string>, label: string): void {
  const actual = Object.keys(value);
  if (actual.length !== allowed.size || actual.some((key) => !allowed.has(key))) {
    fail(`${label} must contain exactly the declared fields.`);
  }
}

function opaqueRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference without whitespace.`);
  }
  return value;
}

function canonicalDigest(value: string, label: string): string {
  if (typeof value !== 'string' || !SHA256.test(value)) {
    fail(`${label} must use canonical lowercase sha256:<64-hex> form.`);
  }
  return value;
}

function digestBytes(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function canonicalJson(value: unknown, path: string): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail(`${path} contains a non-finite number.`);
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry, index) => canonicalJson(entry, `${path}[${index}]`)).join(',')}]`;
  }
  if (typeof value === 'object') {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      fail(`${path} must contain JSON-compatible plain objects only.`);
    }
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail(`${path}.${key} cannot be undefined.`);
      return `${JSON.stringify(key)}:${canonicalJson(child, `${path}.${key}`)}`;
    }).join(',')}}`;
  }
  return fail(`${path} contains a non-JSON value.`);
}

function validatePredecessor(
  verification: SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1,
): void {
  assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154(verification);
  const contract = getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154();
  if (
    contract.nextFrontier !== FR154_NEXT_FRONTIER
    || contract.exactCandidateSessionCoverageRequired !== true
    || contract.researchSignatureVerificationPrimitive !== 'ed25519_node_crypto_v1'
    || contract.callerSuppliedPublicKeyMeansPinnedTrustRoot !== false
    || contract.mathematicalSignatureValidityMeansTrustedWitnessIdentity !== false
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.witnessTrustRootDefinedByThisArtifact !== false
    || contract.independentSessionEvidenceAdmittedByThisArtifact !== false
    || contract.constructValidationPerformedByThisArtifact !== false
    || contract.thresholdDefinitionPerformedByThisArtifact !== false
    || contract.repeatabilityInterpretationPerformedByThisArtifact !== false
  ) fail('FR-154 predecessor contract drift.');

  if (
    verification.nextFrontier !== FR154_NEXT_FRONTIER
    || verification.mechanicalVerificationBoundary.allCandidateSessionsCryptographicallyVerified !== true
    || verification.mechanicalVerificationBoundary.callerSuppliedPublicKeyMeansPinnedTrustRoot !== false
    || verification.mechanicalVerificationBoundary.mathematicalSignatureValidityMeansTrustedWitnessIdentity !== false
    || verification.witnessTrustBoundary.signerKeyTrustEstablished !== false
    || verification.witnessTrustBoundary.witnessAuthorityTrustBound !== false
    || verification.witnessTrustBoundary.externalWitnessIdentityVerified !== false
    || verification.witnessTrustBoundary.productionWitnessVerificationAlgorithm !== null
    || verification.witnessTrustBoundary.pinnedWitnessTrustRootRef !== null
    || verification.witnessTrustBoundary.witnessTrustRootDefinedByThisArtifact !== false
    || verification.witnessTrustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact !== false
    || verification.authorityBoundary.independentMultiSessionEvidenceAdmitted !== false
    || verification.authorityBoundary.captureQualityMeasurementConstructValidated !== false
    || verification.authorityBoundary.repeatabilityInterpretationAllowed !== false
    || verification.privacyBoundary.rawImageAcceptedByThisArtifact !== false
    || verification.privacyBoundary.sourceDigestAcceptedByThisArtifact !== false
    || verification.traditionalSemanticAuthority !== false
  ) fail('FR-154 predecessor artifact widened trust, empirical, privacy, or semantic authority.');
}

function findFR154Entry(
  verification: SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1,
  sessionRef: string,
): SquareBroadFangWitnessSignatureMechanicalVerificationEntryFR154V1 {
  const entry = verification.verificationEntries.find((candidate) => candidate.sessionRef === sessionRef);
  if (!entry) fail(`trust evidence references unknown FR-154 sessionRef ${sessionRef}.`);
  return entry;
}

function validateCandidate(
  verification: SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1,
  candidate: SquareBroadFangWitnessTrustEvidenceCandidateFR155V1,
  index: number,
): SquareBroadFangWitnessTrustEvidenceRecordFR155V1 {
  if (typeof candidate !== 'object' || candidate === null) fail(`trust evidence ${index} must be an object.`);
  exactKeys(candidate, RECORD_KEYS, `trust evidence ${index}`);
  opaqueRef(candidate.sessionRef, `trust evidence ${index} sessionRef`);
  opaqueRef(candidate.signerKeyRef, `trust evidence ${index} signerKeyRef`);
  canonicalDigest(candidate.signerPublicKeySpkiDigest, `trust evidence ${index} signerPublicKeySpkiDigest`);
  opaqueRef(candidate.witnessAuthorityRef, `trust evidence ${index} witnessAuthorityRef`);
  opaqueRef(candidate.trustEvidenceArtifactRef, `trust evidence ${index} trustEvidenceArtifactRef`);
  opaqueRef(candidate.trustEvidenceIssuerRef, `trust evidence ${index} trustEvidenceIssuerRef`);
  opaqueRef(
    candidate.signerToWitnessAuthorityBindingClaimRef,
    `trust evidence ${index} signerToWitnessAuthorityBindingClaimRef`,
  );
  if (
    candidate.trustEvidenceClassClaim !==
      'signer_key_to_witness_authority_binding_evidence_claim_not_semantically_verified'
  ) fail(`trust evidence ${index} class claim authority is unsupported.`);

  const predecessorEntry = findFR154Entry(verification, candidate.sessionRef);
  if (
    candidate.signerKeyRef !== predecessorEntry.signerKeyRef
    || candidate.signerPublicKeySpkiDigest !== predecessorEntry.signerPublicKeySpkiDigest
    || candidate.witnessAuthorityRef !== predecessorEntry.witnessAuthorityRef
  ) fail(`trust evidence ${index} signer/witness coordinates must exactly match FR-154.`);

  canonicalDigest(
    candidate.declaredTrustEvidenceArtifactDigest,
    `trust evidence ${index} declaredTrustEvidenceArtifactDigest`,
  );
  if (!(candidate.trustEvidenceArtifactBytes instanceof Uint8Array) || candidate.trustEvidenceArtifactBytes.byteLength === 0) {
    fail(`trust evidence ${index} trustEvidenceArtifactBytes must be non-empty Uint8Array evidence bytes.`);
  }
  const actualDigest = digestBytes(candidate.trustEvidenceArtifactBytes);
  if (actualDigest !== candidate.declaredTrustEvidenceArtifactDigest) {
    fail(`trust evidence ${index} artifact byte digest mismatch.`);
  }

  return Object.freeze({
    sessionRef: predecessorEntry.sessionRef,
    signerKeyRef: predecessorEntry.signerKeyRef,
    signerPublicKeySpkiDigest: predecessorEntry.signerPublicKeySpkiDigest,
    witnessAuthorityRef: predecessorEntry.witnessAuthorityRef,
    trustEvidenceArtifactRef: candidate.trustEvidenceArtifactRef,
    trustEvidenceIssuerRef: candidate.trustEvidenceIssuerRef,
    trustEvidenceClassClaim: candidate.trustEvidenceClassClaim,
    trustEvidenceArtifactDigest: actualDigest,
    trustEvidenceArtifactBytesVerifiedAtIntake: true as const,
    fr154SignerCoordinatesExactMatchVerified: true as const,
    signerToWitnessAuthorityBindingClaimRef: candidate.signerToWitnessAuthorityBindingClaimRef,
    trustEvidenceIssuerIdentityVerified: false as const,
    trustEvidenceIssuerTrusted: false as const,
    trustEvidenceSemanticContentVerified: false as const,
    signerToWitnessAuthorityBindingVerified: false as const,
    signerKeyTrustEstablished: false as const,
    witnessAuthorityTrustBound: false as const,
    independentSessionEvidenceAdmitted: false as const,
  });
}

export function computeSquareBroadFangWitnessTrustEvidenceArtifactDigestFR155(
  bytes: Uint8Array,
): string {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0) {
    fail('trust evidence artifact bytes must be non-empty Uint8Array evidence bytes.');
  }
  return digestBytes(bytes);
}

export function getSquareBroadFangWitnessTrustEvidenceIntakeContractFR155() {
  const predecessor = getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154();
  if (
    predecessor.nextFrontier !== FR154_NEXT_FRONTIER
    || predecessor.productionWitnessVerificationAlgorithm !== null
    || predecessor.pinnedWitnessTrustRootRef !== null
    || predecessor.witnessTrustRootDefinedByThisArtifact !== false
    || predecessor.independentSessionEvidenceAdmittedByThisArtifact !== false
  ) fail('FR-154 predecessor drift while constructing FR-155 contract.');

  return Object.freeze({
    schemaVersion: 'fr155-square-broad-fang-witness-trust-evidence-intake-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR155_RECORD_ID,
    predecessorNextFrontier: FR154_NEXT_FRONTIER,
    issuedFR154VerificationRequired: true as const,
    exactFR154VerificationCoverageRequired: true as const,
    exactSignerCoordinateMatchRequired: true as const,
    trustEvidenceArtifactBytesRequiredAtIntake: true as const,
    trustEvidenceArtifactDeclaredDigestExactMatchRequired: true as const,
    trustEvidenceArtifactBytesRetainedInOutput: false as const,
    callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer: false as const,
    trustEvidenceByteMatchMeansSemanticContentVerified: false as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    governedWitnessTrustRootEstablishedByThisArtifact: false as const,
    signerKeyTrustEstablishedByThisArtifact: false as const,
    witnessAuthorityTrustBoundByThisArtifact: false as const,
    independentSessionEvidenceAdmittedByThisArtifact: false as const,
    constructValidationPerformedByThisArtifact: false as const,
    thresholdDefinitionPerformedByThisArtifact: false as const,
    repeatabilityInterpretationPerformedByThisArtifact: false as const,
    nextFrontier: FR155_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155(
  request: SquareBroadFangWitnessTrustEvidenceIntakeRequestFR155V1,
): SquareBroadFangWitnessTrustEvidenceIntakeFR155V1 {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr155-square-broad-fang-witness-trust-evidence-intake-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  if (typeof request.fr154Verification !== 'object' || request.fr154Verification === null) {
    fail('fr154Verification must be an issued FR-154 artifact object.');
  }
  validatePredecessor(request.fr154Verification);
  if (!Array.isArray(request.trustEvidenceRecords)) fail('trustEvidenceRecords must be an array.');
  if (request.trustEvidenceRecords.length !== request.fr154Verification.verifiedSessionCount) {
    fail('trustEvidenceRecords must cover every FR-154 verification entry exactly once.');
  }

  const sessionRefs = new Set<string>();
  const trustEvidenceArtifactRefs = new Set<string>();
  const records = request.trustEvidenceRecords.map((candidate, index) => {
    const record = validateCandidate(request.fr154Verification, candidate, index);
    if (sessionRefs.has(record.sessionRef)) fail(`trust evidence ${index} duplicates sessionRef ${record.sessionRef}.`);
    if (trustEvidenceArtifactRefs.has(record.trustEvidenceArtifactRef)) {
      fail(`trust evidence ${index} duplicates trustEvidenceArtifactRef ${record.trustEvidenceArtifactRef}.`);
    }
    sessionRefs.add(record.sessionRef);
    trustEvidenceArtifactRefs.add(record.trustEvidenceArtifactRef);
    return record;
  });
  if (sessionRefs.size !== request.fr154Verification.verifiedSessionCount) {
    fail('trust-evidence coverage must exactly match the FR-154 verification ledger.');
  }

  const digestMaterial = [...records]
    .sort((left, right) => left.sessionRef.localeCompare(right.sessionRef))
    .map((record) => ({
      sessionRef: record.sessionRef,
      signerKeyRef: record.signerKeyRef,
      signerPublicKeySpkiDigest: record.signerPublicKeySpkiDigest,
      witnessAuthorityRef: record.witnessAuthorityRef,
      trustEvidenceArtifactRef: record.trustEvidenceArtifactRef,
      trustEvidenceIssuerRef: record.trustEvidenceIssuerRef,
      trustEvidenceClassClaim: record.trustEvidenceClassClaim,
      trustEvidenceArtifactDigest: record.trustEvidenceArtifactDigest,
      signerToWitnessAuthorityBindingClaimRef: record.signerToWitnessAuthorityBindingClaimRef,
    }));
  const candidateTrustEvidenceBundleDigest = digestBytes(Buffer.from(canonicalJson({
    schemaVersion: 'fr155-square-broad-fang-witness-trust-evidence-bundle-digest-v1',
    evidenceBundleRef: request.fr154Verification.evidenceBundleRef,
    candidateEvidenceBundleDigest: request.fr154Verification.candidateEvidenceBundleDigest,
    records: digestMaterial,
  }, 'fr155CandidateTrustEvidenceBundle'), 'utf8'));

  const output: SquareBroadFangWitnessTrustEvidenceIntakeFR155V1 = Object.freeze({
    schemaVersion: 'fr155-square-broad-fang-witness-trust-evidence-intake-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR155_RECORD_ID,
    authorityState: 'candidate_witness_trust_evidence_bytes_verified_and_bound_to_fr154_coordinates_no_external_trust_root_or_witness_trust' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    predecessor: Object.freeze({
      fr154NextFrontier: FR154_NEXT_FRONTIER,
      issuedFR154VerificationRequired: true as const,
      fr154MechanicalSignatureVerificationPerformed: true as const,
      fr154SignerKeyTrustEstablished: false as const,
      fr154WitnessAuthorityTrustBound: false as const,
      fr154IndependentSessionEvidenceAdmitted: false as const,
      fr154ProductionWitnessVerificationAlgorithm: null,
      fr154PinnedWitnessTrustRootRef: null,
    }),
    evidenceBundleRef: request.fr154Verification.evidenceBundleRef,
    candidateEvidenceBundleDigest: request.fr154Verification.candidateEvidenceBundleDigest,
    trustEvidenceRecords: Object.freeze(records),
    trustEvidenceRecordCount: records.length,
    distinctTrustEvidenceArtifactRefCount: trustEvidenceArtifactRefs.size,
    candidateTrustEvidenceBundleDigest,
    intakeBoundary: Object.freeze({
      exactFR154VerificationCoverageRequired: true as const,
      exactSignerCoordinateMatchRequired: true as const,
      trustEvidenceArtifactBytesRequiredAtIntake: true as const,
      trustEvidenceArtifactDeclaredDigestExactMatchRequired: true as const,
      trustEvidenceArtifactBytesRetainedInOutput: false as const,
      trustEvidenceByteIdentityVerifiedForEveryEntry: true as const,
      candidateTrustEvidenceBundleMaterialized: true as const,
      callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer: false as const,
      trustEvidenceByteDigestMatchMeansSemanticContentVerified: false as const,
      trustEvidenceByteDigestMatchMeansSignerTrustEstablished: false as const,
      exactFR154SignerCoordinateMatchMeansSignerTrustEstablished: false as const,
      bindingClaimRefMeansBindingVerified: false as const,
    }),
    trustBoundary: Object.freeze({
      trustEvidenceIssuerIdentityVerified: false as const,
      trustEvidenceIssuerTrusted: false as const,
      trustEvidenceSemanticContentVerified: false as const,
      signerToWitnessAuthorityBindingVerified: false as const,
      signerKeyTrustEstablished: false as const,
      witnessAuthorityTrustBound: false as const,
      externalWitnessIdentityVerified: false as const,
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      governedWitnessTrustRootEstablished: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      candidateWitnessTrustEvidenceIntakePerformed: true as const,
      independentMultiSessionEvidenceAcquired: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      candidateConstructAdvanceDecision:
        'blocked_pending_external_trust_root_semantic_trust_verification_and_real_prospective_session_evidence' as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatabilityClassificationIssued: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImageAcceptedByThisArtifact: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawPixelRasterPersisted: false as const,
      rawAggregatePersisted: false as const,
      sourceDigestAcceptedByThisArtifact: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      trustEvidenceArtifactBytesPersistedInOutput: false as const,
      trustEvidenceArtifactDigestPersisted: true as const,
      signerPublicKeyPemPersisted: false as const,
      detachedSignatureBytesPersisted: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR155_RESEARCH_NOTE_REF,
    nextFrontier: FR155_NEXT_FRONTIER,
  });

  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangWitnessTrustEvidenceIntakeFR155(
  value: SquareBroadFangWitnessTrustEvidenceIntakeFR155V1,
): void {
  if (!ISSUED.has(value)) fail('witness trust-evidence intake artifact was not issued by the active FR-155 boundary.');
}
