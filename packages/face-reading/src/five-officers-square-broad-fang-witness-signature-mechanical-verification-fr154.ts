import {
  createHash,
  createPublicKey,
  verify as verifySignature,
  type KeyObject,
} from 'node:crypto';
import {
  FR153_NEXT_FRONTIER,
  assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153,
  getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153,
  type SquareBroadFangIndependentSessionWitnessCandidateRecordFR153V1,
  type SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
} from './five-officers-square-broad-fang-independent-session-witness-evidence-intake-fr153.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR154_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_witness_signature_mechanical_verification.fr154' as const;
export const FR154_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr154-square-broad-fang-witness-signature-mechanical-verification.md' as const;
export const FR154_NEXT_FRONTIER =
  'square_broad_fang_governed_witness_trust_evidence_intake_and_trust_root_binding_plus_prospective_source_backed_capture_execution_before_independent_session_admission' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const REQUEST_KEYS = new Set(['schemaVersion', 'fr153EvidenceIntake', 'sessionVerifications']);
const VERIFICATION_KEYS = new Set([
  'sessionRef',
  'signerKeyRef',
  'signerPublicKeyPem',
  'declaredSignerPublicKeySpkiDigest',
  'detachedSignatureBytes',
]);
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangWitnessSignatureVerificationInputFR154V1 {
  readonly sessionRef: string;
  readonly signerKeyRef: string;
  readonly signerPublicKeyPem: string;
  readonly declaredSignerPublicKeySpkiDigest: string;
  readonly detachedSignatureBytes: Uint8Array;
}

export interface SquareBroadFangWitnessSignatureMechanicalVerificationRequestFR154V1 {
  readonly schemaVersion: 'fr154-square-broad-fang-witness-signature-mechanical-verification-request-v1';
  readonly fr153EvidenceIntake: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1;
  readonly sessionVerifications: readonly SquareBroadFangWitnessSignatureVerificationInputFR154V1[];
}

export interface SquareBroadFangWitnessSignatureMechanicalVerificationEntryFR154V1 {
  readonly sessionRef: string;
  readonly captureEventRef: string;
  readonly captureRef: string;
  readonly witnessArtifactRef: string;
  readonly witnessAuthorityRef: string;
  readonly witnessArtifactDigest: string;
  readonly signerKeyRef: string;
  readonly signerPublicKeySpkiDigest: string;
  readonly signaturePayloadDigest: string;
  readonly signerPublicKeySpkiDigestSelfConsistencyVerified: true;
  readonly cryptographicSignatureMathematicallyVerified: true;
  readonly signerPublicKeyPemPersisted: false;
  readonly detachedSignatureBytesPersisted: false;
  readonly signerKeyTrustEstablished: false;
  readonly externalWitnessIdentityVerified: false;
  readonly witnessClassVerified: false;
  readonly witnessArtifactSemanticContentVerified: false;
  readonly captureExecutionIndependentlyVerified: false;
  readonly sessionSeparationVerified: false;
  readonly captureToWitnessBindingVerified: false;
  readonly independentSessionEvidenceAdmitted: false;
}

export interface SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1 {
  readonly schemaVersion: 'fr154-square-broad-fang-witness-signature-mechanical-verification-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR154_RECORD_ID;
  readonly authorityState: 'candidate_witness_signatures_mathematically_verified_with_caller_supplied_keys_no_witness_trust_or_independent_session_admission';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly predecessor: {
    readonly fr153NextFrontier: typeof FR153_NEXT_FRONTIER;
    readonly issuedFR153EvidenceIntakeRequired: true;
    readonly fr153CandidateWitnessEvidenceIntakePerformed: true;
    readonly fr153IndependentSessionEvidenceAdmitted: false;
    readonly fr153ProductionWitnessVerificationAlgorithm: null;
    readonly fr153PinnedWitnessTrustRootRef: null;
  };
  readonly evidenceBundleRef: string;
  readonly candidateEvidenceBundleDigest: string;
  readonly verificationEntries: readonly SquareBroadFangWitnessSignatureMechanicalVerificationEntryFR154V1[];
  readonly verifiedSessionCount: number;
  readonly mechanicalVerificationBoundary: {
    readonly exactCandidateSessionCoverageRequired: true;
    readonly researchSignatureVerificationPrimitive: 'ed25519_node_crypto_v1';
    readonly signaturePayloadCanonicalizationAlgorithm: 'sorted_object_keys_preserve_array_order_json_v1';
    readonly signaturePayloadDigestAlgorithm: 'sha256';
    readonly signerPublicKeySpkiDigestSelfConsistencyRequired: true;
    readonly detachedSignatureMathematicalVerificationRequired: true;
    readonly allCandidateSessionsCryptographicallyVerified: true;
    readonly callerSuppliedSignerKeyRefMeansTrustedSigner: false;
    readonly callerSuppliedPublicKeyMeansPinnedTrustRoot: false;
    readonly mathematicalSignatureValidityMeansTrustedWitnessIdentity: false;
    readonly mathematicalSignatureValidityMeansWitnessClaimTrue: false;
    readonly mathematicalSignatureValidityMeansCaptureExecutionVerified: false;
    readonly mathematicalSignatureValidityMeansSessionSeparationVerified: false;
    readonly mathematicalSignatureValidityMeansCaptureToWitnessBindingVerified: false;
    readonly mathematicalSignatureValidityMeansIndependentSessionEvidenceAdmitted: false;
  };
  readonly witnessTrustBoundary: {
    readonly signerKeyTrustEstablished: false;
    readonly witnessAuthorityTrustBound: false;
    readonly externalWitnessIdentityVerified: false;
    readonly witnessClassVerified: false;
    readonly witnessArtifactSemanticContentVerified: false;
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly witnessTrustRootDefinedByThisArtifact: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly authorityBoundary: {
    readonly mechanicalWitnessSignatureVerificationPerformed: true;
    readonly independentMultiSessionEvidenceAcquired: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly candidateConstructAdvanceDecision:
      'blocked_pending_governed_witness_trust_binding_and_real_prospective_session_evidence';
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
  readonly researchNoteRef: typeof FR154_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR154_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-154 ${message}`);
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
  intake: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
): void {
  assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(intake);
  const contract = getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153();
  if (
    contract.nextFrontier !== FR153_NEXT_FRONTIER
    || contract.minimumCandidateSessionCount !== 2
    || contract.candidateWitnessArtifactBytesRequiredAtIntake !== true
    || contract.candidateWitnessBytesRetainedInOutput !== false
    || contract.historicalFR146OrFR147AutoAdmissionAllowed !== false
    || contract.retrospectiveSessionRelabelingAllowed !== false
    || contract.callerSuppliedWitnessAuthorityRefMeansTrustedWitness !== false
    || contract.witnessArtifactByteMatchMeansTrustedWitness !== false
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.witnessTrustRootDefinedByThisArtifact !== false
    || contract.independentSessionEvidenceAdmittedByThisArtifact !== false
    || contract.constructValidationPerformedByThisArtifact !== false
    || contract.thresholdDefinitionPerformedByThisArtifact !== false
    || contract.repeatabilityInterpretationPerformedByThisArtifact !== false
  ) fail('FR-153 predecessor contract drift.');

  if (
    intake.nextFrontier !== FR153_NEXT_FRONTIER
    || intake.candidateSessionCount < 2
    || intake.intakeBoundary.candidateWitnessEvidenceByteIdentityVerifiedForEveryEntry !== true
    || intake.intakeBoundary.callerSuppliedWitnessAuthorityRefMeansTrustedWitness !== false
    || intake.intakeBoundary.witnessArtifactByteDigestMatchMeansWitnessIdentityVerified !== false
    || intake.witnessTrustBoundary.witnessAuthorityTrustBound !== false
    || intake.witnessTrustBoundary.productionWitnessVerificationAlgorithm !== null
    || intake.witnessTrustBoundary.pinnedWitnessTrustRootRef !== null
    || intake.witnessTrustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact !== false
    || intake.authorityBoundary.independentMultiSessionEvidenceAdmitted !== false
    || intake.authorityBoundary.captureQualityMeasurementConstructValidated !== false
    || intake.authorityBoundary.repeatabilityInterpretationAllowed !== false
    || intake.privacyBoundary.rawImageAcceptedByThisArtifact !== false
    || intake.privacyBoundary.sourceDigestAcceptedByThisArtifact !== false
    || intake.traditionalSemanticAuthority !== false
  ) fail('FR-153 predecessor artifact widened trust, empirical, privacy, or semantic authority.');
}

function findCandidateSession(
  intake: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
  sessionRef: string,
): SquareBroadFangIndependentSessionWitnessCandidateRecordFR153V1 {
  const entry = intake.candidateSessions.find((candidate) => candidate.sessionRef === sessionRef);
  if (!entry) fail(`session verification references unknown sessionRef ${sessionRef}.`);
  return entry;
}

function signaturePayload(
  intake: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
  candidate: SquareBroadFangIndependentSessionWitnessCandidateRecordFR153V1,
): Readonly<Record<string, unknown>> {
  return Object.freeze({
    schemaVersion: 'fr154-square-broad-fang-witness-signature-payload-v1',
    fr153RecordId: intake.recordId,
    evidenceBundleRef: intake.evidenceBundleRef,
    candidateEvidenceBundleDigest: intake.candidateEvidenceBundleDigest,
    sessionRef: candidate.sessionRef,
    captureEventRef: candidate.captureEventRef,
    captureRef: candidate.captureRef,
    captureExecutionClaim: candidate.captureExecutionClaim,
    witnessArtifactRef: candidate.witnessArtifactRef,
    witnessAuthorityRef: candidate.witnessAuthorityRef,
    witnessClassClaim: candidate.witnessClassClaim,
    witnessArtifactDigest: candidate.witnessArtifactDigest,
    sessionSeparationClaimRef: candidate.sessionSeparationClaimRef,
    captureToWitnessBindingClaimRef: candidate.captureToWitnessBindingClaimRef,
  });
}

export function buildSquareBroadFangWitnessSignaturePayloadBytesFR154(
  intake: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
  sessionRef: string,
): Uint8Array {
  validatePredecessor(intake);
  opaqueRef(sessionRef, 'sessionRef');
  const candidate = findCandidateSession(intake, sessionRef);
  return Buffer.from(canonicalJson(signaturePayload(intake, candidate), 'fr154WitnessSignaturePayload'), 'utf8');
}

export function computeSquareBroadFangWitnessSignaturePayloadDigestFR154(
  intake: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
  sessionRef: string,
): string {
  return digestBytes(buildSquareBroadFangWitnessSignaturePayloadBytesFR154(intake, sessionRef));
}

function parseEd25519PublicKey(pem: string): KeyObject {
  if (typeof pem !== 'string' || pem.trim().length === 0) fail('signerPublicKeyPem must be non-empty.');
  let key: KeyObject;
  try {
    key = createPublicKey(pem);
  } catch {
    return fail('signerPublicKeyPem must parse as a public key.');
  }
  if (key.asymmetricKeyType !== 'ed25519') {
    fail('research witness signature verification primitive requires an Ed25519 public key.');
  }
  return key;
}

function spkiDigest(key: KeyObject): string {
  const exported = key.export({ type: 'spki', format: 'der' });
  if (typeof exported === 'string') fail('Ed25519 public-key SPKI export must be binary DER.');
  return digestBytes(exported);
}

export function computeSquareBroadFangWitnessSignerPublicKeySpkiDigestFR154(
  signerPublicKeyPem: string,
): string {
  return spkiDigest(parseEd25519PublicKey(signerPublicKeyPem));
}

export function getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154() {
  const predecessor = getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153();
  if (
    predecessor.nextFrontier !== FR153_NEXT_FRONTIER
    || predecessor.productionWitnessVerificationAlgorithm !== null
    || predecessor.pinnedWitnessTrustRootRef !== null
    || predecessor.independentSessionEvidenceAdmittedByThisArtifact !== false
  ) fail('FR-153 predecessor drift while constructing FR-154 contract.');

  return Object.freeze({
    schemaVersion: 'fr154-square-broad-fang-witness-signature-mechanical-verification-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR154_RECORD_ID,
    predecessorNextFrontier: FR153_NEXT_FRONTIER,
    issuedFR153EvidenceIntakeRequired: true as const,
    exactCandidateSessionCoverageRequired: true as const,
    researchSignatureVerificationPrimitive: 'ed25519_node_crypto_v1' as const,
    signerPublicKeySpkiDigestSelfConsistencyRequired: true as const,
    detachedSignatureMathematicalVerificationRequired: true as const,
    callerSuppliedPublicKeyMeansPinnedTrustRoot: false as const,
    mathematicalSignatureValidityMeansTrustedWitnessIdentity: false as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    witnessTrustRootDefinedByThisArtifact: false as const,
    independentSessionEvidenceAdmittedByThisArtifact: false as const,
    constructValidationPerformedByThisArtifact: false as const,
    thresholdDefinitionPerformedByThisArtifact: false as const,
    repeatabilityInterpretationPerformedByThisArtifact: false as const,
    nextFrontier: FR154_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(
  request: SquareBroadFangWitnessSignatureMechanicalVerificationRequestFR154V1,
): SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1 {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr154-square-broad-fang-witness-signature-mechanical-verification-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  if (typeof request.fr153EvidenceIntake !== 'object' || request.fr153EvidenceIntake === null) {
    fail('fr153EvidenceIntake must be an issued FR-153 artifact object.');
  }
  validatePredecessor(request.fr153EvidenceIntake);
  if (!Array.isArray(request.sessionVerifications)) fail('sessionVerifications must be an array.');
  if (request.sessionVerifications.length !== request.fr153EvidenceIntake.candidateSessionCount) {
    fail('sessionVerifications must cover every FR-153 candidate session exactly once.');
  }

  const seen = new Set<string>();
  const entries = request.sessionVerifications.map((verification, index) => {
    if (typeof verification !== 'object' || verification === null) {
      fail(`session verification ${index} must be an object.`);
    }
    exactKeys(verification, VERIFICATION_KEYS, `session verification ${index}`);
    opaqueRef(verification.sessionRef, `session verification ${index} sessionRef`);
    opaqueRef(verification.signerKeyRef, `session verification ${index} signerKeyRef`);
    if (seen.has(verification.sessionRef)) {
      fail(`session verification ${index} duplicates sessionRef ${verification.sessionRef}.`);
    }
    seen.add(verification.sessionRef);
    const candidate = findCandidateSession(request.fr153EvidenceIntake, verification.sessionRef);

    canonicalDigest(
      verification.declaredSignerPublicKeySpkiDigest,
      `session verification ${index} declaredSignerPublicKeySpkiDigest`,
    );
    if (!(verification.detachedSignatureBytes instanceof Uint8Array) || verification.detachedSignatureBytes.byteLength === 0) {
      fail(`session verification ${index} detachedSignatureBytes must be non-empty Uint8Array bytes.`);
    }
    const publicKey = parseEd25519PublicKey(verification.signerPublicKeyPem);
    const actualSpkiDigest = spkiDigest(publicKey);
    if (actualSpkiDigest !== verification.declaredSignerPublicKeySpkiDigest) {
      fail(`session verification ${index} signer public-key SPKI digest mismatch.`);
    }
    const payloadBytes = buildSquareBroadFangWitnessSignaturePayloadBytesFR154(
      request.fr153EvidenceIntake,
      verification.sessionRef,
    );
    if (!verifySignature(null, payloadBytes, publicKey, verification.detachedSignatureBytes)) {
      fail(`session verification ${index} detached Ed25519 signature does not verify over the canonical FR-154 payload.`);
    }

    return Object.freeze({
      sessionRef: candidate.sessionRef,
      captureEventRef: candidate.captureEventRef,
      captureRef: candidate.captureRef,
      witnessArtifactRef: candidate.witnessArtifactRef,
      witnessAuthorityRef: candidate.witnessAuthorityRef,
      witnessArtifactDigest: candidate.witnessArtifactDigest,
      signerKeyRef: verification.signerKeyRef,
      signerPublicKeySpkiDigest: actualSpkiDigest,
      signaturePayloadDigest: digestBytes(payloadBytes),
      signerPublicKeySpkiDigestSelfConsistencyVerified: true as const,
      cryptographicSignatureMathematicallyVerified: true as const,
      signerPublicKeyPemPersisted: false as const,
      detachedSignatureBytesPersisted: false as const,
      signerKeyTrustEstablished: false as const,
      externalWitnessIdentityVerified: false as const,
      witnessClassVerified: false as const,
      witnessArtifactSemanticContentVerified: false as const,
      captureExecutionIndependentlyVerified: false as const,
      sessionSeparationVerified: false as const,
      captureToWitnessBindingVerified: false as const,
      independentSessionEvidenceAdmitted: false as const,
    });
  });

  if (seen.size !== request.fr153EvidenceIntake.candidateSessionCount) {
    fail('session verification coverage must exactly match the FR-153 candidate-session ledger.');
  }

  const output: SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1 = Object.freeze({
    schemaVersion: 'fr154-square-broad-fang-witness-signature-mechanical-verification-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR154_RECORD_ID,
    authorityState: 'candidate_witness_signatures_mathematically_verified_with_caller_supplied_keys_no_witness_trust_or_independent_session_admission' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    predecessor: Object.freeze({
      fr153NextFrontier: FR153_NEXT_FRONTIER,
      issuedFR153EvidenceIntakeRequired: true as const,
      fr153CandidateWitnessEvidenceIntakePerformed: true as const,
      fr153IndependentSessionEvidenceAdmitted: false as const,
      fr153ProductionWitnessVerificationAlgorithm: null,
      fr153PinnedWitnessTrustRootRef: null,
    }),
    evidenceBundleRef: request.fr153EvidenceIntake.evidenceBundleRef,
    candidateEvidenceBundleDigest: request.fr153EvidenceIntake.candidateEvidenceBundleDigest,
    verificationEntries: Object.freeze(entries),
    verifiedSessionCount: entries.length,
    mechanicalVerificationBoundary: Object.freeze({
      exactCandidateSessionCoverageRequired: true as const,
      researchSignatureVerificationPrimitive: 'ed25519_node_crypto_v1' as const,
      signaturePayloadCanonicalizationAlgorithm: 'sorted_object_keys_preserve_array_order_json_v1' as const,
      signaturePayloadDigestAlgorithm: 'sha256' as const,
      signerPublicKeySpkiDigestSelfConsistencyRequired: true as const,
      detachedSignatureMathematicalVerificationRequired: true as const,
      allCandidateSessionsCryptographicallyVerified: true as const,
      callerSuppliedSignerKeyRefMeansTrustedSigner: false as const,
      callerSuppliedPublicKeyMeansPinnedTrustRoot: false as const,
      mathematicalSignatureValidityMeansTrustedWitnessIdentity: false as const,
      mathematicalSignatureValidityMeansWitnessClaimTrue: false as const,
      mathematicalSignatureValidityMeansCaptureExecutionVerified: false as const,
      mathematicalSignatureValidityMeansSessionSeparationVerified: false as const,
      mathematicalSignatureValidityMeansCaptureToWitnessBindingVerified: false as const,
      mathematicalSignatureValidityMeansIndependentSessionEvidenceAdmitted: false as const,
    }),
    witnessTrustBoundary: Object.freeze({
      signerKeyTrustEstablished: false as const,
      witnessAuthorityTrustBound: false as const,
      externalWitnessIdentityVerified: false as const,
      witnessClassVerified: false as const,
      witnessArtifactSemanticContentVerified: false as const,
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      witnessTrustRootDefinedByThisArtifact: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      mechanicalWitnessSignatureVerificationPerformed: true as const,
      independentMultiSessionEvidenceAcquired: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      candidateConstructAdvanceDecision:
        'blocked_pending_governed_witness_trust_binding_and_real_prospective_session_evidence' as const,
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
    researchNoteRef: FR154_RESEARCH_NOTE_REF,
    nextFrontier: FR154_NEXT_FRONTIER,
  });

  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154(
  value: SquareBroadFangWitnessSignatureMechanicalVerificationFR154V1,
): void {
  if (!ISSUED.has(value)) fail('witness signature verification artifact was not issued by the active FR-154 boundary.');
}
