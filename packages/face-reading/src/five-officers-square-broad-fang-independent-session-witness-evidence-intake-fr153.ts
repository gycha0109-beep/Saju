import { createHash } from 'node:crypto';
import {
  FR152_NEXT_FRONTIER,
  assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152,
  getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152,
  type SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1,
} from './five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR153_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_independent_session_witness_evidence_intake.fr153' as const;
export const FR153_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr153-square-broad-fang-independent-session-witness-evidence-intake.md' as const;
export const FR153_NEXT_FRONTIER =
  'square_broad_fang_prospective_source_backed_multi_session_capture_execution_with_candidate_witness_evidence_then_governed_witness_trust_verification_before_independent_session_admission' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const REQUEST_KEYS = new Set(['schemaVersion', 'fr152Protocol', 'evidenceBundleRef', 'sessions']);
const SESSION_KEYS = new Set([
  'sessionRef',
  'captureEventRef',
  'captureRef',
  'captureExecutionClaim',
  'witnessArtifactRef',
  'witnessAuthorityRef',
  'witnessClassClaim',
  'witnessArtifactDeclaredDigest',
  'witnessArtifactBytes',
  'sessionSeparationClaimRef',
  'captureToWitnessBindingClaimRef',
]);
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangIndependentSessionWitnessCandidateFR153V1 {
  readonly sessionRef: string;
  readonly captureEventRef: string;
  readonly captureRef: string;
  readonly captureExecutionClaim:
    'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified';
  readonly witnessArtifactRef: string;
  readonly witnessAuthorityRef: string;
  readonly witnessClassClaim: 'external_or_operator_independent_claim_not_verified';
  readonly witnessArtifactDeclaredDigest: string;
  readonly witnessArtifactBytes: Uint8Array;
  readonly sessionSeparationClaimRef: string;
  readonly captureToWitnessBindingClaimRef: string;
}

export interface SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1 {
  readonly schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-request-v1';
  readonly fr152Protocol: SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1;
  readonly evidenceBundleRef: string;
  readonly sessions: readonly SquareBroadFangIndependentSessionWitnessCandidateFR153V1[];
}

export interface SquareBroadFangIndependentSessionWitnessCandidateRecordFR153V1 {
  readonly sessionRef: string;
  readonly captureEventRef: string;
  readonly captureRef: string;
  readonly captureExecutionClaim:
    'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified';
  readonly captureExecutionIndependentlyVerified: false;
  readonly witnessArtifactRef: string;
  readonly witnessAuthorityRef: string;
  readonly witnessClassClaim: 'external_or_operator_independent_claim_not_verified';
  readonly witnessArtifactDigest: string;
  readonly witnessArtifactBytesVerifiedAtIntake: true;
  readonly witnessClassVerified: false;
  readonly witnessAuthorityTrustBound: false;
  readonly witnessArtifactSemanticContentVerified: false;
  readonly sessionSeparationClaimRef: string;
  readonly sessionSeparationVerified: false;
  readonly captureToWitnessBindingClaimRef: string;
  readonly captureToWitnessBindingVerified: false;
  readonly independentSessionEvidenceAdmitted: false;
}

export interface SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1 {
  readonly schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR153_RECORD_ID;
  readonly authorityState: 'prospective_candidate_witness_evidence_bytes_verified_and_frozen_no_trusted_witness_or_independent_session_admission';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly predecessor: {
    readonly fr152NextFrontier: typeof FR152_NEXT_FRONTIER;
    readonly issuedFR152ProtocolRequired: true;
    readonly fr152ProspectiveOnly: true;
    readonly fr152MinimumQualifyingSessionCount: 2;
    readonly fr152WitnessTrustBindingRequired: true;
    readonly fr152ProductionWitnessVerificationAlgorithm: null;
    readonly fr152PinnedWitnessTrustRootRef: null;
  };
  readonly evidenceBundleRef: string;
  readonly candidateSessions: readonly SquareBroadFangIndependentSessionWitnessCandidateRecordFR153V1[];
  readonly candidateSessionCount: number;
  readonly distinctSessionRefCount: number;
  readonly distinctCaptureEventRefCount: number;
  readonly distinctCaptureRefCount: number;
  readonly distinctWitnessArtifactRefCount: number;
  readonly candidateEvidenceBundleDigest: string;
  readonly intakeBoundary: {
    readonly candidateWitnessArtifactBytesRequiredAtIntake: true;
    readonly candidateWitnessArtifactDeclaredDigestExactMatchRequired: true;
    readonly minimumCandidateSessionCount: 2;
    readonly distinctSessionRefsRequired: true;
    readonly distinctCaptureEventRefsRequired: true;
    readonly distinctCaptureRefsRequired: true;
    readonly distinctWitnessArtifactRefsRequired: true;
    readonly candidateWitnessEvidenceByteIdentityVerifiedForEveryEntry: true;
    readonly candidateEvidenceBundleMaterialized: true;
    readonly historicalFR146OrFR147AutoAdmissionAllowed: false;
    readonly retrospectiveSessionRelabelingAllowed: false;
    readonly callerSuppliedWitnessAuthorityRefMeansTrustedWitness: false;
    readonly witnessArtifactByteDigestMatchMeansWitnessClaimTrue: false;
    readonly witnessArtifactByteDigestMatchMeansWitnessIdentityVerified: false;
    readonly captureExecutionClaimMeansCaptureExecutionIndependentlyVerified: false;
    readonly sessionSeparationClaimMeansSessionSeparationVerified: false;
    readonly captureToWitnessBindingClaimMeansBindingVerified: false;
  };
  readonly witnessTrustBoundary: {
    readonly witnessAuthorityTrustBound: false;
    readonly witnessClassVerified: false;
    readonly witnessArtifactSemanticContentVerified: false;
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly witnessTrustRootDefinedByThisArtifact: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly authorityBoundary: {
    readonly candidateWitnessEvidenceIntakePerformed: true;
    readonly independentMultiSessionEvidenceAcquired: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly candidateConstructAdvanceDecision:
      'blocked_pending_prospective_capture_execution_and_governed_witness_trust_verification';
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
    readonly witnessArtifactBytesPersistedInOutput: false;
    readonly witnessArtifactDigestPersisted: true;
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
  readonly researchNoteRef: typeof FR153_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR153_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-153 ${message}`);
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
  protocol: SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1,
): void {
  assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152(protocol);
  const contract = getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152();
  if (
    contract.nextFrontier !== FR152_NEXT_FRONTIER
    || contract.minimumQualifyingSessionCount !== 2
    || contract.prospectiveOnly !== true
    || contract.historicalFR146OrFR147AutoAdmissionAllowed !== false
    || contract.retrospectiveSessionRelabelingAllowed !== false
    || contract.operatorDeclaredSessionRefsSufficient !== false
    || contract.independentWitnessRequired !== true
    || contract.witnessTrustBindingRequired !== true
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.constructValidationPerformedByThisArtifact !== false
    || contract.thresholdDefinitionPerformedByThisArtifact !== false
    || contract.repeatabilityInterpretationPerformedByThisArtifact !== false
  ) fail('FR-152 predecessor contract drift.');

  if (
    protocol.nextFrontier !== FR152_NEXT_FRONTIER
    || protocol.prospectiveAcquisition.minimumQualifyingSessionCount !== 2
    || protocol.prospectiveAcquisition.protocolFrozenBeforeQualifyingCaptureExecution !== true
    || protocol.prospectiveAcquisition.witnessArtifactByteVerificationRequired !== true
    || protocol.prospectiveAcquisition.witnessAuthorityTrustBindingRequired !== true
    || protocol.witnessTrustBoundary.productionWitnessVerificationAlgorithm !== null
    || protocol.witnessTrustBoundary.pinnedWitnessTrustRootRef !== null
    || protocol.witnessTrustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact !== false
    || protocol.authorityBoundary.independentMultiSessionEvidenceAdmitted !== false
    || protocol.authorityBoundary.captureQualityMeasurementConstructValidated !== false
    || protocol.authorityBoundary.repeatabilityInterpretationAllowed !== false
    || protocol.traditionalSemanticAuthority !== false
  ) fail('FR-152 predecessor protocol widened authority.');
}

function validateSession(
  session: SquareBroadFangIndependentSessionWitnessCandidateFR153V1,
  index: number,
): SquareBroadFangIndependentSessionWitnessCandidateRecordFR153V1 {
  if (typeof session !== 'object' || session === null) fail(`session ${index} must be an object.`);
  exactKeys(session, SESSION_KEYS, `session ${index}`);
  opaqueRef(session.sessionRef, `session ${index} sessionRef`);
  opaqueRef(session.captureEventRef, `session ${index} captureEventRef`);
  opaqueRef(session.captureRef, `session ${index} captureRef`);
  opaqueRef(session.witnessArtifactRef, `session ${index} witnessArtifactRef`);
  opaqueRef(session.witnessAuthorityRef, `session ${index} witnessAuthorityRef`);
  opaqueRef(session.sessionSeparationClaimRef, `session ${index} sessionSeparationClaimRef`);
  opaqueRef(session.captureToWitnessBindingClaimRef, `session ${index} captureToWitnessBindingClaimRef`);

  if (
    session.captureExecutionClaim !==
      'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified'
  ) fail(`session ${index} capture execution claim authority is unsupported.`);
  if (session.witnessClassClaim !== 'external_or_operator_independent_claim_not_verified') {
    fail(`session ${index} witness class claim must remain unverified.`);
  }
  if (!(session.witnessArtifactBytes instanceof Uint8Array) || session.witnessArtifactBytes.byteLength === 0) {
    fail(`session ${index} witnessArtifactBytes must be non-empty Uint8Array evidence bytes.`);
  }
  canonicalDigest(session.witnessArtifactDeclaredDigest, `session ${index} witnessArtifactDeclaredDigest`);
  const actualDigest = digestBytes(session.witnessArtifactBytes);
  if (actualDigest !== session.witnessArtifactDeclaredDigest) {
    fail(`session ${index} witness artifact byte digest mismatch.`);
  }

  return Object.freeze({
    sessionRef: session.sessionRef,
    captureEventRef: session.captureEventRef,
    captureRef: session.captureRef,
    captureExecutionClaim: session.captureExecutionClaim,
    captureExecutionIndependentlyVerified: false as const,
    witnessArtifactRef: session.witnessArtifactRef,
    witnessAuthorityRef: session.witnessAuthorityRef,
    witnessClassClaim: session.witnessClassClaim,
    witnessArtifactDigest: actualDigest,
    witnessArtifactBytesVerifiedAtIntake: true as const,
    witnessClassVerified: false as const,
    witnessAuthorityTrustBound: false as const,
    witnessArtifactSemanticContentVerified: false as const,
    sessionSeparationClaimRef: session.sessionSeparationClaimRef,
    sessionSeparationVerified: false as const,
    captureToWitnessBindingClaimRef: session.captureToWitnessBindingClaimRef,
    captureToWitnessBindingVerified: false as const,
    independentSessionEvidenceAdmitted: false as const,
  });
}

export function computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(
  bytes: Uint8Array,
): string {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0) {
    fail('witness artifact bytes must be non-empty Uint8Array evidence bytes.');
  }
  return digestBytes(bytes);
}

export function getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153() {
  const fr152 = getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152();
  if (
    fr152.nextFrontier !== FR152_NEXT_FRONTIER
    || fr152.minimumQualifyingSessionCount !== 2
    || fr152.productionWitnessVerificationAlgorithm !== null
    || fr152.pinnedWitnessTrustRootRef !== null
  ) fail('FR-152 predecessor drift while constructing FR-153 contract.');

  return Object.freeze({
    schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR153_RECORD_ID,
    predecessorNextFrontier: FR152_NEXT_FRONTIER,
    issuedFR152ProtocolRequired: true as const,
    minimumCandidateSessionCount: 2 as const,
    candidateWitnessArtifactBytesRequiredAtIntake: true as const,
    candidateWitnessDeclaredDigestExactMatchRequired: true as const,
    candidateWitnessBytesRetainedInOutput: false as const,
    historicalFR146OrFR147AutoAdmissionAllowed: false as const,
    retrospectiveSessionRelabelingAllowed: false as const,
    callerSuppliedWitnessAuthorityRefMeansTrustedWitness: false as const,
    witnessArtifactByteMatchMeansTrustedWitness: false as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    witnessTrustRootDefinedByThisArtifact: false as const,
    independentSessionEvidenceAdmittedByThisArtifact: false as const,
    constructValidationPerformedByThisArtifact: false as const,
    thresholdDefinitionPerformedByThisArtifact: false as const,
    repeatabilityInterpretationPerformedByThisArtifact: false as const,
    nextFrontier: FR153_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(
  request: SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1,
): SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1 {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr153-square-broad-fang-independent-session-witness-evidence-intake-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  if (typeof request.fr152Protocol !== 'object' || request.fr152Protocol === null) {
    fail('fr152Protocol must be an issued FR-152 protocol object.');
  }
  validatePredecessor(request.fr152Protocol);
  opaqueRef(request.evidenceBundleRef, 'evidenceBundleRef');
  if (!Array.isArray(request.sessions) || request.sessions.length < 2) {
    fail('at least two prospective candidate sessions are required for intake.');
  }

  const sessionRefs = new Set<string>();
  const captureEventRefs = new Set<string>();
  const captureRefs = new Set<string>();
  const witnessArtifactRefs = new Set<string>();
  const candidateSessions = request.sessions.map((session, index) => {
    const record = validateSession(session, index);
    if (sessionRefs.has(record.sessionRef)) fail(`session ${index} duplicates sessionRef ${record.sessionRef}.`);
    if (captureEventRefs.has(record.captureEventRef)) {
      fail(`session ${index} duplicates captureEventRef ${record.captureEventRef}.`);
    }
    if (captureRefs.has(record.captureRef)) fail(`session ${index} duplicates captureRef ${record.captureRef}.`);
    if (witnessArtifactRefs.has(record.witnessArtifactRef)) {
      fail(`session ${index} duplicates witnessArtifactRef ${record.witnessArtifactRef}.`);
    }
    sessionRefs.add(record.sessionRef);
    captureEventRefs.add(record.captureEventRef);
    captureRefs.add(record.captureRef);
    witnessArtifactRefs.add(record.witnessArtifactRef);
    return record;
  });

  const sortedDigestMaterial = [...candidateSessions]
    .sort((left, right) => left.sessionRef.localeCompare(right.sessionRef))
    .map((entry) => ({
      sessionRef: entry.sessionRef,
      captureEventRef: entry.captureEventRef,
      captureRef: entry.captureRef,
      captureExecutionClaim: entry.captureExecutionClaim,
      witnessArtifactRef: entry.witnessArtifactRef,
      witnessAuthorityRef: entry.witnessAuthorityRef,
      witnessClassClaim: entry.witnessClassClaim,
      witnessArtifactDigest: entry.witnessArtifactDigest,
      sessionSeparationClaimRef: entry.sessionSeparationClaimRef,
      captureToWitnessBindingClaimRef: entry.captureToWitnessBindingClaimRef,
    }));
  const candidateEvidenceBundleDigest = digestBytes(Buffer.from(canonicalJson({
    schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-bundle-digest-v1',
    evidenceBundleRef: request.evidenceBundleRef,
    sessions: sortedDigestMaterial,
  }, 'fr153CandidateEvidenceBundle'), 'utf8'));

  const output: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1 = Object.freeze({
    schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR153_RECORD_ID,
    authorityState: 'prospective_candidate_witness_evidence_bytes_verified_and_frozen_no_trusted_witness_or_independent_session_admission' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    predecessor: Object.freeze({
      fr152NextFrontier: FR152_NEXT_FRONTIER,
      issuedFR152ProtocolRequired: true as const,
      fr152ProspectiveOnly: true as const,
      fr152MinimumQualifyingSessionCount: 2 as const,
      fr152WitnessTrustBindingRequired: true as const,
      fr152ProductionWitnessVerificationAlgorithm: null,
      fr152PinnedWitnessTrustRootRef: null,
    }),
    evidenceBundleRef: request.evidenceBundleRef,
    candidateSessions: Object.freeze(candidateSessions),
    candidateSessionCount: candidateSessions.length,
    distinctSessionRefCount: sessionRefs.size,
    distinctCaptureEventRefCount: captureEventRefs.size,
    distinctCaptureRefCount: captureRefs.size,
    distinctWitnessArtifactRefCount: witnessArtifactRefs.size,
    candidateEvidenceBundleDigest,
    intakeBoundary: Object.freeze({
      candidateWitnessArtifactBytesRequiredAtIntake: true as const,
      candidateWitnessArtifactDeclaredDigestExactMatchRequired: true as const,
      minimumCandidateSessionCount: 2 as const,
      distinctSessionRefsRequired: true as const,
      distinctCaptureEventRefsRequired: true as const,
      distinctCaptureRefsRequired: true as const,
      distinctWitnessArtifactRefsRequired: true as const,
      candidateWitnessEvidenceByteIdentityVerifiedForEveryEntry: true as const,
      candidateEvidenceBundleMaterialized: true as const,
      historicalFR146OrFR147AutoAdmissionAllowed: false as const,
      retrospectiveSessionRelabelingAllowed: false as const,
      callerSuppliedWitnessAuthorityRefMeansTrustedWitness: false as const,
      witnessArtifactByteDigestMatchMeansWitnessClaimTrue: false as const,
      witnessArtifactByteDigestMatchMeansWitnessIdentityVerified: false as const,
      captureExecutionClaimMeansCaptureExecutionIndependentlyVerified: false as const,
      sessionSeparationClaimMeansSessionSeparationVerified: false as const,
      captureToWitnessBindingClaimMeansBindingVerified: false as const,
    }),
    witnessTrustBoundary: Object.freeze({
      witnessAuthorityTrustBound: false as const,
      witnessClassVerified: false as const,
      witnessArtifactSemanticContentVerified: false as const,
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      witnessTrustRootDefinedByThisArtifact: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      candidateWitnessEvidenceIntakePerformed: true as const,
      independentMultiSessionEvidenceAcquired: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      candidateConstructAdvanceDecision:
        'blocked_pending_prospective_capture_execution_and_governed_witness_trust_verification' as const,
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
      witnessArtifactBytesPersistedInOutput: false as const,
      witnessArtifactDigestPersisted: true as const,
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
    researchNoteRef: FR153_RESEARCH_NOTE_REF,
    nextFrontier: FR153_NEXT_FRONTIER,
  });

  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(
  value: SquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153V1,
): void {
  if (!ISSUED.has(value)) fail('witness evidence intake artifact was not issued by the active FR-153 boundary.');
}
