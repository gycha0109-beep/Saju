import { createHash } from 'node:crypto';
import { FaceAuthorityValidationError } from './validation.js';

export const FR225_CONTRACT_VERSION =
  'FR225-PERSISTED-EXTERNAL-WITNESS-EVIDENCE-v1' as const;

export type FR225WitnessClaimType =
  | 'reviewer_cohort_human_status_observed'
  | 'reviewer_cohort_independence_observed'
  | 'capture_freshness_observed'
  | 'capture_family_same_participant_observed';

export type FR225WitnessVerificationMethod =
  | 'in_person_observation'
  | 'live_remote_observation'
  | 'supervised_capture_observation'
  | 'documented_process_review';

export interface FR225ExternalWitnessRecordInput {
  readonly witnessRef: string;
  readonly verifierRef: string;
  readonly claimType: FR225WitnessClaimType;
  readonly scopeRef: string;
  readonly verificationMethod: FR225WitnessVerificationMethod;
  readonly observedAt: string;
  readonly externalEvidenceRef: string;
  readonly externalEvidenceDigest: string;
  readonly claimAttested: true;
}

export interface FR225ExternalWitnessRecord extends FR225ExternalWitnessRecordInput {
  readonly schemaVersion: 'fr225-external-witness-record-v1';
  readonly contractVersion: typeof FR225_CONTRACT_VERSION;
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly verifierIdentityIndependentlyVerified: false;
  readonly verifierIndependenceIndependentlyVerified: false;
  readonly externalEvidenceInspectedByRuntime: false;
  readonly witnessClaimCryptographicallyAuthenticated: false;
  readonly underlyingFactIndependentlyEstablished: false;
  readonly recordDigest: string;
}

export interface FR225ExternalWitnessEvidence {
  readonly schemaVersion: 'fr225-external-witness-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR225_CONTRACT_VERSION;
  readonly authorityState:
    'external_witness_records_materialized_integrity_only_no_empirical_authority';
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly recordCount: number;
  readonly verifierCount: number;
  readonly claimCounts: Readonly<Record<FR225WitnessClaimType, number>>;
  readonly records: readonly FR225ExternalWitnessRecord[];
  readonly evidenceDigest: string;
  readonly evidenceRef: string;
  readonly authorityBoundary: FR225AuthorityBoundary;
}

export interface FR225VerifiedPersistedExternalWitnessEvidence {
  readonly schemaVersion: 'fr225-verified-persisted-external-witness-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR225_CONTRACT_VERSION;
  readonly authorityState:
    'persisted_external_witness_integrity_verified_underlying_facts_unverified';
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly recordCount: number;
  readonly verifierCount: number;
  readonly claimCounts: Readonly<Record<FR225WitnessClaimType, number>>;
  readonly records: readonly FR225ExternalWitnessRecord[];
  readonly evidenceDigest: string;
  readonly evidenceRef: string;
  readonly integrityBoundary: {
    readonly recordDigestsRecomputed: true;
    readonly aggregateDigestRecomputed: true;
    readonly evidenceRefRecomputed: true;
    readonly duplicateWitnessRefRejected: true;
    readonly duplicateVerifierClaimScopeRejected: true;
    readonly exactStudyGateBindingRequired: true;
  };
  readonly authorityBoundary: FR225AuthorityBoundary;
}

export interface FR225AuthorityBoundary {
  readonly verifierIdentityIndependentlyVerified: false;
  readonly verifierIndependenceIndependentlyVerified: false;
  readonly externalEvidenceInspectedByRuntime: false;
  readonly witnessClaimCryptographicallyAuthenticated: false;
  readonly witnessRecordPresenceMeansUnderlyingFactEstablished: false;
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
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const FR224_GATE_REF = /^evidence\.fr224\.observable_morphology_study_readiness:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const CLAIM_TYPES = Object.freeze([
  'reviewer_cohort_human_status_observed',
  'reviewer_cohort_independence_observed',
  'capture_freshness_observed',
  'capture_family_same_participant_observed',
] as const satisfies readonly FR225WitnessClaimType[]);
const CLAIM_SET = new Set<string>(CLAIM_TYPES);
const METHODS = new Set<FR225WitnessVerificationMethod>([
  'in_person_observation',
  'live_remote_observation',
  'supervised_capture_observation',
  'documented_process_review',
]);
const MATERIALIZED = new WeakSet<object>();
const VERIFIED = new WeakSet<object>();

const AUTHORITY_BOUNDARY: FR225AuthorityBoundary = Object.freeze({
  verifierIdentityIndependentlyVerified: false as const,
  verifierIndependenceIndependentlyVerified: false as const,
  externalEvidenceInspectedByRuntime: false as const,
  witnessClaimCryptographicallyAuthenticated: false as const,
  witnessRecordPresenceMeansUnderlyingFactEstablished: false as const,
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
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-225 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('witness evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('witness evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('witness evidence must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function safeRef(value: unknown, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return value;
}

function parseTimestamp(value: unknown, label: string): string {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) {
    fail(`${label} must be a parseable timestamp.`);
  }
  return value;
}

function validateStudyGate(studyGateRef: unknown, studyGateDigest: unknown): {
  readonly ref: string;
  readonly digest: string;
} {
  if (typeof studyGateRef !== 'string' || !FR224_GATE_REF.test(studyGateRef)) {
    fail('studyGateRef must be an FR224 observable-morphology study-readiness evidence ref.');
  }
  if (typeof studyGateDigest !== 'string' || !SHA256.test(studyGateDigest)) {
    fail('studyGateDigest must be canonical sha256.');
  }
  const suffix = studyGateRef.slice(studyGateRef.lastIndexOf(':') + 1);
  if (studyGateDigest !== `sha256:${suffix}`) {
    fail('studyGateRef and studyGateDigest must encode the same digest.');
  }
  return Object.freeze({ ref: studyGateRef, digest: studyGateDigest });
}

function recordPayload(record: Omit<FR225ExternalWitnessRecord, 'recordDigest'>): unknown {
  return {
    schemaVersion: record.schemaVersion,
    contractVersion: record.contractVersion,
    studyGateRef: record.studyGateRef,
    studyGateDigest: record.studyGateDigest,
    witnessRef: record.witnessRef,
    verifierRef: record.verifierRef,
    claimType: record.claimType,
    scopeRef: record.scopeRef,
    verificationMethod: record.verificationMethod,
    observedAt: record.observedAt,
    externalEvidenceRef: record.externalEvidenceRef,
    externalEvidenceDigest: record.externalEvidenceDigest,
    claimAttested: record.claimAttested,
    verifierIdentityIndependentlyVerified: record.verifierIdentityIndependentlyVerified,
    verifierIndependenceIndependentlyVerified: record.verifierIndependenceIndependentlyVerified,
    externalEvidenceInspectedByRuntime: record.externalEvidenceInspectedByRuntime,
    witnessClaimCryptographicallyAuthenticated: record.witnessClaimCryptographicallyAuthenticated,
    underlyingFactIndependentlyEstablished: record.underlyingFactIndependentlyEstablished,
  };
}

function materializeRecord(
  studyGateRef: string,
  studyGateDigest: string,
  input: FR225ExternalWitnessRecordInput,
): FR225ExternalWitnessRecord {
  const witnessRef = safeRef(input.witnessRef, 'witnessRef');
  const verifierRef = safeRef(input.verifierRef, 'verifierRef');
  const scopeRef = safeRef(input.scopeRef, 'scopeRef');
  const externalEvidenceRef = safeRef(input.externalEvidenceRef, 'externalEvidenceRef');
  if (!CLAIM_SET.has(input.claimType)) fail(`unsupported claimType: ${String(input.claimType)}.`);
  if (!METHODS.has(input.verificationMethod)) {
    fail(`unsupported verificationMethod: ${String(input.verificationMethod)}.`);
  }
  const observedAt = parseTimestamp(input.observedAt, 'observedAt');
  if (!SHA256.test(input.externalEvidenceDigest)) {
    fail('externalEvidenceDigest must be canonical sha256.');
  }
  if (input.claimAttested !== true) fail('claimAttested must be true.');

  const base = Object.freeze({
    schemaVersion: 'fr225-external-witness-record-v1' as const,
    contractVersion: FR225_CONTRACT_VERSION,
    studyGateRef,
    studyGateDigest,
    witnessRef,
    verifierRef,
    claimType: input.claimType,
    scopeRef,
    verificationMethod: input.verificationMethod,
    observedAt,
    externalEvidenceRef,
    externalEvidenceDigest: input.externalEvidenceDigest,
    claimAttested: true as const,
    verifierIdentityIndependentlyVerified: false as const,
    verifierIndependenceIndependentlyVerified: false as const,
    externalEvidenceInspectedByRuntime: false as const,
    witnessClaimCryptographicallyAuthenticated: false as const,
    underlyingFactIndependentlyEstablished: false as const,
  });
  return Object.freeze({
    ...base,
    recordDigest: sha256(canonicalJson(recordPayload(base as FR225ExternalWitnessRecord))),
  });
}

function validateRecordSet(records: readonly FR225ExternalWitnessRecord[]): void {
  if (records.length === 0) fail('witness evidence requires at least one record.');
  const witnessRefs = new Set<string>();
  const tuples = new Set<string>();
  for (const record of records) {
    if (witnessRefs.has(record.witnessRef)) fail(`duplicate witnessRef: ${record.witnessRef}.`);
    witnessRefs.add(record.witnessRef);
    const tuple = `${record.verifierRef}\u0000${record.claimType}\u0000${record.scopeRef}`;
    if (tuples.has(tuple)) {
      fail(`duplicate verifier/claim/scope witness tuple: ${record.verifierRef} / ${record.claimType} / ${record.scopeRef}.`);
    }
    tuples.add(tuple);
  }
}

function claimCounts(records: readonly FR225ExternalWitnessRecord[]) {
  return Object.freeze(Object.fromEntries(
    CLAIM_TYPES.map((claimType) => [
      claimType,
      records.filter((record) => record.claimType === claimType).length,
    ]),
  ) as Record<FR225WitnessClaimType, number>);
}

export function materializeExternalWitnessEvidenceFR225(input: {
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly records: readonly FR225ExternalWitnessRecordInput[];
}): FR225ExternalWitnessEvidence {
  const gate = validateStudyGate(input.studyGateRef, input.studyGateDigest);
  if (!Array.isArray(input.records) || input.records.length === 0) {
    fail('records must contain at least one witness input.');
  }
  const records = input.records.map((record) => materializeRecord(gate.ref, gate.digest, record));
  validateRecordSet(records);

  const sorted = [...records].sort((left, right) => left.recordDigest.localeCompare(right.recordDigest));
  const evidenceDigest = sha256(canonicalJson(sorted.map((record) => ({
    witnessRef: record.witnessRef,
    recordDigest: record.recordDigest,
  }))));

  const result: FR225ExternalWitnessEvidence = Object.freeze({
    schemaVersion: 'fr225-external-witness-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR225_CONTRACT_VERSION,
    authorityState:
      'external_witness_records_materialized_integrity_only_no_empirical_authority' as const,
    studyGateRef: gate.ref,
    studyGateDigest: gate.digest,
    recordCount: records.length,
    verifierCount: new Set(records.map((record) => record.verifierRef)).size,
    claimCounts: claimCounts(records),
    records: Object.freeze(records),
    evidenceDigest,
    evidenceRef:
      `evidence.fr225.external_witness:${evidenceDigest.slice('sha256:'.length)}`,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  MATERIALIZED.add(result);
  return result;
}

function verifyPersistedRecord(
  value: unknown,
  index: number,
  expectedGateRef: string,
  expectedGateDigest: string,
): FR225ExternalWitnessRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail(`record[${index}] must be an object.`);
  }
  const record = value as Record<string, unknown>;
  if (
    record.schemaVersion !== 'fr225-external-witness-record-v1'
    || record.contractVersion !== FR225_CONTRACT_VERSION
    || record.studyGateRef !== expectedGateRef
    || record.studyGateDigest !== expectedGateDigest
  ) fail(`record[${index}] schema/contract/study-gate drift.`);

  const rematerialized = materializeRecord(expectedGateRef, expectedGateDigest, {
    witnessRef: safeRef(record.witnessRef, `record[${index}].witnessRef`),
    verifierRef: safeRef(record.verifierRef, `record[${index}].verifierRef`),
    claimType: record.claimType as FR225WitnessClaimType,
    scopeRef: safeRef(record.scopeRef, `record[${index}].scopeRef`),
    verificationMethod: record.verificationMethod as FR225WitnessVerificationMethod,
    observedAt: parseTimestamp(record.observedAt, `record[${index}].observedAt`),
    externalEvidenceRef: safeRef(record.externalEvidenceRef, `record[${index}].externalEvidenceRef`),
    externalEvidenceDigest: String(record.externalEvidenceDigest),
    claimAttested: record.claimAttested as true,
  });
  if (
    record.verifierIdentityIndependentlyVerified !== false
    || record.verifierIndependenceIndependentlyVerified !== false
    || record.externalEvidenceInspectedByRuntime !== false
    || record.witnessClaimCryptographicallyAuthenticated !== false
    || record.underlyingFactIndependentlyEstablished !== false
  ) fail(`record[${index}] authority boundary drift.`);
  if (record.recordDigest !== rematerialized.recordDigest) {
    fail(`record[${index}] recordDigest mismatch.`);
  }
  return Object.freeze({ ...rematerialized });
}

export function verifyPersistedExternalWitnessEvidenceFR225(
  value: unknown,
): FR225VerifiedPersistedExternalWitnessEvidence {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail('persisted witness evidence must be an object.');
  }
  const evidence = value as Record<string, unknown>;
  if (
    evidence.schemaVersion !== 'fr225-external-witness-evidence-v1'
    || evidence.artifactVersion !== '0.1.0'
    || evidence.contractVersion !== FR225_CONTRACT_VERSION
    || evidence.authorityState
      !== 'external_witness_records_materialized_integrity_only_no_empirical_authority'
  ) fail('persisted witness evidence schema/contract drift.');

  const gate = validateStudyGate(evidence.studyGateRef, evidence.studyGateDigest);
  if (!Array.isArray(evidence.records) || evidence.records.length === 0) {
    fail('persisted witness evidence requires records.');
  }
  const records = evidence.records.map((record, index) =>
    verifyPersistedRecord(record, index, gate.ref, gate.digest));
  validateRecordSet(records);

  const expectedCounts = claimCounts(records);
  if (canonicalJson(evidence.claimCounts) !== canonicalJson(expectedCounts)) {
    fail('persisted claimCounts do not match records.');
  }
  const expectedVerifierCount = new Set(records.map((record) => record.verifierRef)).size;
  if (evidence.recordCount !== records.length || evidence.verifierCount !== expectedVerifierCount) {
    fail('persisted record/verifier counts do not match records.');
  }

  const sorted = [...records].sort((left, right) => left.recordDigest.localeCompare(right.recordDigest));
  const expectedDigest = sha256(canonicalJson(sorted.map((record) => ({
    witnessRef: record.witnessRef,
    recordDigest: record.recordDigest,
  }))));
  const expectedRef = `evidence.fr225.external_witness:${expectedDigest.slice('sha256:'.length)}`;
  if (evidence.evidenceDigest !== expectedDigest || evidence.evidenceRef !== expectedRef) {
    fail('persisted aggregate evidence digest/ref mismatch.');
  }
  if (canonicalJson(evidence.authorityBoundary) !== canonicalJson(AUTHORITY_BOUNDARY)) {
    fail('persisted witness authority boundary drift.');
  }

  const result: FR225VerifiedPersistedExternalWitnessEvidence = Object.freeze({
    schemaVersion: 'fr225-verified-persisted-external-witness-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR225_CONTRACT_VERSION,
    authorityState:
      'persisted_external_witness_integrity_verified_underlying_facts_unverified' as const,
    studyGateRef: gate.ref,
    studyGateDigest: gate.digest,
    recordCount: records.length,
    verifierCount: expectedVerifierCount,
    claimCounts: expectedCounts,
    records: Object.freeze(records),
    evidenceDigest: expectedDigest,
    evidenceRef: expectedRef,
    integrityBoundary: Object.freeze({
      recordDigestsRecomputed: true as const,
      aggregateDigestRecomputed: true as const,
      evidenceRefRecomputed: true as const,
      duplicateWitnessRefRejected: true as const,
      duplicateVerifierClaimScopeRejected: true as const,
      exactStudyGateBindingRequired: true as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  VERIFIED.add(result);
  return result;
}

export function assertVerifiedPersistedExternalWitnessEvidenceFR225(
  evidence: FR225VerifiedPersistedExternalWitnessEvidence,
): void {
  if (!VERIFIED.has(evidence)) {
    fail('external witness evidence was not verified by the active FR225 runtime.');
  }
  if (
    evidence.schemaVersion !== 'fr225-verified-persisted-external-witness-evidence-v1'
    || evidence.contractVersion !== FR225_CONTRACT_VERSION
    || evidence.authorityBoundary.witnessRecordPresenceMeansUnderlyingFactEstablished !== false
    || evidence.authorityBoundary.reviewerHumanStatusIndependentlyVerified !== false
    || evidence.authorityBoundary.reviewerIndependenceIndependentlyVerified !== false
    || evidence.authorityBoundary.captureFreshnessIndependentlyVerified !== false
    || evidence.authorityBoundary.sameParticipantIdentityIndependentlyVerified !== false
    || evidence.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || evidence.authorityBoundary.empiricalSufficiencyEstablished !== false
    || evidence.authorityBoundary.calibrationAuthorized !== false
    || evidence.authorityBoundary.thresholdIssued !== false
    || evidence.authorityBoundary.classifierIssued !== false
    || evidence.authorityBoundary.traditionalBindingIssued !== false
  ) fail('verified FR225 witness evidence authority boundary drift.');
}

export function assertMaterializedExternalWitnessEvidenceFR225(
  evidence: FR225ExternalWitnessEvidence,
): void {
  if (!MATERIALIZED.has(evidence)) {
    fail('external witness evidence was not materialized by the active FR225 runtime.');
  }
}
