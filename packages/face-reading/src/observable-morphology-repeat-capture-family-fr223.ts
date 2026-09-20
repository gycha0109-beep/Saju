import { createHash } from 'node:crypto';
import {
  assertVerifiedPersistedCandidateProvenanceEvidenceFR221,
  type FR221PersistedCandidateRecord,
  type FR221VerifiedPersistedCandidateEvidence,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR223_CONTRACT_VERSION =
  'FR223-DECLARED-REPEAT-CAPTURE-FAMILY-DESCRIPTIVES-v1' as const;

export interface FR223DeclaredRepeatCaptureFamilySummary {
  readonly captureFamilyKey: string;
  readonly participantKey: string;
  readonly partition: 'selection' | 'holdout';
  readonly metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0';
  readonly unit: 'degree';
  readonly candidateCount: number;
  readonly distinctCaptureAdmissionRefCount: number;
  readonly sampleRefs: readonly string[];
  readonly captureAdmissionRefs: readonly string[];
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly captureFamilyKeyRole: 'protocol_local_declared_grouping_only';
  readonly distinctCaptureAdmissionRefsMeanDistinctFreshCaptureEvents: false;
  readonly sameParticipantIdentityIndependentlyVerified: false;
  readonly freshnessIndependentlyVerified: false;
  readonly captureQualityValidated: false;
  readonly evaluationState: 'descriptive_only_no_repeatability_adjudication';
  readonly repeatabilityPassFailIssued: false;
  readonly numericRepeatabilityAcceptanceThreshold: null;
}

export interface FR223DeclaredRepeatCaptureFamilyEvidence {
  readonly schemaVersion: 'fr223-declared-repeat-capture-family-descriptives-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR223_CONTRACT_VERSION;
  readonly authorityState:
    'declared_repeat_capture_family_descriptives_only_no_repeatability_or_empirical_sufficiency';
  readonly sourceEvidence: {
    readonly fr221CandidateEvidenceRef: string;
    readonly fr221CandidateEvidenceDigest: string;
  };
  readonly metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0';
  readonly unit: 'degree';
  readonly candidateCount: number;
  readonly declaredFamilyCount: number;
  readonly repeatFamilyCount: number;
  readonly singletonFamilyCount: number;
  readonly selectionRepeatFamilyCount: number;
  readonly holdoutRepeatFamilyCount: number;
  readonly repeatFamilies: readonly FR223DeclaredRepeatCaptureFamilySummary[];
  readonly evidenceDigest: string;
  readonly evidenceRef: string;
  readonly integrityBoundary: {
    readonly activeFR221VerificationRequired: true;
    readonly captureFamilyOwnershipRechecked: true;
    readonly captureFamilyPartitionRechecked: true;
    readonly duplicateCaptureAdmissionWithinFamilyRejected: true;
    readonly minimumTwoCandidateCapturesPerRepeatFamily: true;
    readonly singletonFamiliesExcludedFromRepeatSummaries: true;
    readonly selectionHoldoutPreserved: true;
  };
  readonly authorityBoundary: {
    readonly captureFamilyKeyMeansIdentityProof: false;
    readonly distinctCaptureAdmissionRefsMeanDistinctFreshCaptureEvents: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly freshnessIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly descriptiveVariationMeansEmpiricalRepeatabilityEstablished: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly numericRepeatabilityAcceptanceThreshold: null;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const ASSEMBLED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-223 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('descriptive evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('descriptive evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('descriptive evidence must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function summarizeFamily(
  records: readonly FR221PersistedCandidateRecord[],
): FR223DeclaredRepeatCaptureFamilySummary {
  const first = records[0];
  if (first === undefined || records.length < 2) fail('repeat family requires at least two candidates.');
  const participants = new Set(records.map((record) => record.participantKey));
  const partitions = new Set(records.map((record) => record.partition));
  if (participants.size !== 1) fail(`capture family ownership drift: ${first.captureFamilyKey}.`);
  if (partitions.size !== 1) fail(`capture family partition drift: ${first.captureFamilyKey}.`);

  const captureAdmissionRefs = records.map((record) => record.captureAdmissionRef);
  if (new Set(captureAdmissionRefs).size !== captureAdmissionRefs.length) {
    fail(`duplicate capture admission within declared repeat family: ${first.captureFamilyKey}.`);
  }
  const values = records.map((record) => record.metricValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

  return Object.freeze({
    captureFamilyKey: first.captureFamilyKey,
    participantKey: first.participantKey,
    partition: first.partition,
    metricRef: first.metricRef,
    unit: first.unit,
    candidateCount: records.length,
    distinctCaptureAdmissionRefCount: captureAdmissionRefs.length,
    sampleRefs: Object.freeze(records.map((record) => record.sampleRef).sort()),
    captureAdmissionRefs: Object.freeze([...captureAdmissionRefs].sort()),
    min,
    max,
    mean,
    range: max - min,
    captureFamilyKeyRole: 'protocol_local_declared_grouping_only' as const,
    distinctCaptureAdmissionRefsMeanDistinctFreshCaptureEvents: false as const,
    sameParticipantIdentityIndependentlyVerified: false as const,
    freshnessIndependentlyVerified: false as const,
    captureQualityValidated: false as const,
    evaluationState: 'descriptive_only_no_repeatability_adjudication' as const,
    repeatabilityPassFailIssued: false as const,
    numericRepeatabilityAcceptanceThreshold: null,
  });
}

export function assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(
  candidateEvidence: FR221VerifiedPersistedCandidateEvidence,
): FR223DeclaredRepeatCaptureFamilyEvidence {
  assertVerifiedPersistedCandidateProvenanceEvidenceFR221(candidateEvidence);

  const byFamily = new Map<string, FR221PersistedCandidateRecord[]>();
  for (const record of candidateEvidence.records) {
    const family = byFamily.get(record.captureFamilyKey) ?? [];
    family.push(record);
    byFamily.set(record.captureFamilyKey, family);
  }

  const repeated = [...byFamily.entries()]
    .filter(([, records]) => records.length >= 2)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, records]) => summarizeFamily(records));
  if (repeated.length === 0) {
    fail('verified candidate evidence contains no declared capture family with at least two candidates.');
  }

  const singletonFamilyCount = [...byFamily.values()].filter((records) => records.length === 1).length;
  const selectionRepeatFamilyCount =
    repeated.filter((family) => family.partition === 'selection').length;
  const holdoutRepeatFamilyCount = repeated.length - selectionRepeatFamilyCount;

  const digest = sha256(canonicalJson({
    contractVersion: FR223_CONTRACT_VERSION,
    fr221CandidateEvidenceRef: candidateEvidence.evidenceRef,
    fr221CandidateEvidenceDigest: candidateEvidence.evidenceDigest,
    repeatFamilies: repeated,
  }));

  const result: FR223DeclaredRepeatCaptureFamilyEvidence = Object.freeze({
    schemaVersion: 'fr223-declared-repeat-capture-family-descriptives-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR223_CONTRACT_VERSION,
    authorityState:
      'declared_repeat_capture_family_descriptives_only_no_repeatability_or_empirical_sufficiency' as const,
    sourceEvidence: Object.freeze({
      fr221CandidateEvidenceRef: candidateEvidence.evidenceRef,
      fr221CandidateEvidenceDigest: candidateEvidence.evidenceDigest,
    }),
    metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
    unit: 'degree' as const,
    candidateCount: candidateEvidence.candidateCount,
    declaredFamilyCount: byFamily.size,
    repeatFamilyCount: repeated.length,
    singletonFamilyCount,
    selectionRepeatFamilyCount,
    holdoutRepeatFamilyCount,
    repeatFamilies: Object.freeze(repeated),
    evidenceDigest: digest,
    evidenceRef:
      `evidence.fr223.observable_morphology_repeat_family:${digest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR221VerificationRequired: true as const,
      captureFamilyOwnershipRechecked: true as const,
      captureFamilyPartitionRechecked: true as const,
      duplicateCaptureAdmissionWithinFamilyRejected: true as const,
      minimumTwoCandidateCapturesPerRepeatFamily: true as const,
      singletonFamiliesExcludedFromRepeatSummaries: true as const,
      selectionHoldoutPreserved: true as const,
    }),
    authorityBoundary: Object.freeze({
      captureFamilyKeyMeansIdentityProof: false as const,
      distinctCaptureAdmissionRefsMeanDistinctFreshCaptureEvents: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      freshnessIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      descriptiveVariationMeansEmpiricalRepeatabilityEstablished: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
  ASSEMBLED.add(result);
  return result;
}

export function assertDeclaredRepeatCaptureFamilyDescriptivesFR223(
  evidence: FR223DeclaredRepeatCaptureFamilyEvidence,
): void {
  if (!ASSEMBLED.has(evidence)) {
    fail('repeat-family descriptives were not assembled by the active FR223 runtime.');
  }
  if (
    evidence.schemaVersion !== 'fr223-declared-repeat-capture-family-descriptives-v1'
    || evidence.contractVersion !== FR223_CONTRACT_VERSION
    || evidence.repeatFamilyCount < 1
    || evidence.integrityBoundary.activeFR221VerificationRequired !== true
    || evidence.integrityBoundary.duplicateCaptureAdmissionWithinFamilyRejected !== true
    || evidence.authorityBoundary.captureFamilyKeyMeansIdentityProof !== false
    || evidence.authorityBoundary.distinctCaptureAdmissionRefsMeanDistinctFreshCaptureEvents !== false
    || evidence.authorityBoundary.descriptiveVariationMeansEmpiricalRepeatabilityEstablished !== false
    || evidence.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || evidence.authorityBoundary.repeatCaptureStabilityEstablished !== false
    || evidence.authorityBoundary.empiricalSufficiencyEstablished !== false
    || evidence.authorityBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || evidence.authorityBoundary.thresholdIssued !== false
    || evidence.authorityBoundary.classifierIssued !== false
    || evidence.authorityBoundary.traditionalBindingIssued !== false
  ) fail('assembled FR223 repeat-family authority boundary drift.');
}
