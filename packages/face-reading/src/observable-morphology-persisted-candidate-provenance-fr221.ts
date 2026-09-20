import { createHash } from 'node:crypto';
import {
  FR218_CONTRACT_VERSION,
  FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
  FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
  assertSelectionHoldoutCoverageFR218,
  type FR218MetricCandidateRecord,
} from './observable-morphology-validation-fr218.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR221_CONTRACT_VERSION =
  'FR221-PERSISTED-CANDIDATE-PROVENANCE-v1' as const;

export interface FR221PersistedCandidateRecord {
  readonly schemaVersion: 'fr221-persisted-candidate-record-v1';
  readonly sourceContractVersion: typeof FR218_CONTRACT_VERSION;
  readonly constructRef: typeof FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF;
  readonly sampleRef: string;
  readonly participantKey: string;
  readonly captureFamilyKey: string;
  readonly partition: 'selection' | 'holdout';
  readonly reviewItemRef: string;
  readonly reviewArtifactRef: string;
  readonly captureAdmissionRef: string;
  readonly captureAdmissionSource: 'fr159_prospective_attestation_manifest';
  readonly captureAdmissionReevaluatedByFR218: false;
  readonly freshnessIndependentlyVerified: false;
  readonly sameParticipantIdentityIndependentlyVerified: false;
  readonly captureQualityValidated: false;
  readonly metricRef: typeof FR218_EYE_OUTER_CORNER_TILT_METRIC_REF;
  readonly metricValue: number;
  readonly unit: 'degree';
  readonly confounderTags: readonly string[];
  readonly metricRole: 'candidate_measurement_only';
  readonly humanLabelObserved: false;
  readonly thresholdApplied: false;
  readonly classifierApplied: false;
  readonly traditionalBindingApplied: false;
  readonly reviewerExposureAllowed: false;
  readonly recordDigest: string;
}

export interface FR221PersistedCandidateEvidence {
  readonly schemaVersion: 'fr221-persisted-candidate-provenance-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR221_CONTRACT_VERSION;
  readonly authorityState:
    'fr218_candidate_provenance_materialized_for_later_empirical_join_no_empirical_sufficiency';
  readonly sourceContractVersion: typeof FR218_CONTRACT_VERSION;
  readonly constructRef: typeof FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF;
  readonly metricRef: typeof FR218_EYE_OUTER_CORNER_TILT_METRIC_REF;
  readonly candidateCount: number;
  readonly selectionCount: number;
  readonly holdoutCount: number;
  readonly records: readonly FR221PersistedCandidateRecord[];
  readonly evidenceDigest: string;
  readonly evidenceRef: string;
  readonly materializationBoundary: {
    readonly activeFR218IssuanceRequired: true;
    readonly candidatePoolValidatedBeforeMaterialization: true;
    readonly selectionHoldoutCoverageRequired: true;
    readonly metricValueReviewerExposureAllowed: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
  };
  readonly authorityBoundary: FR221AuthorityBoundary;
}

export interface FR221AuthorityBoundary {
  readonly persistedDigestConsistencyMeansOriginalFR218IssuanceIndependentlyProven: false;
  readonly freshnessIndependentlyVerified: false;
  readonly sameParticipantIdentityIndependentlyVerified: false;
  readonly captureQualityValidated: false;
  readonly empiricalSufficiencyEstablished: false;
  readonly repeatCaptureStabilityEstablished: false;
  readonly transitionZoneIssued: false;
  readonly thresholdIssued: false;
  readonly classifierIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export interface FR221VerifiedPersistedCandidateEvidence {
  readonly schemaVersion: 'fr221-verified-persisted-candidate-provenance-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR221_CONTRACT_VERSION;
  readonly authorityState:
    'persisted_fr218_candidate_provenance_integrity_verified_no_empirical_sufficiency';
  readonly evidenceRef: string;
  readonly evidenceDigest: string;
  readonly candidateCount: number;
  readonly selectionCount: number;
  readonly holdoutCount: number;
  readonly records: readonly FR221PersistedCandidateRecord[];
  readonly integrityBoundary: {
    readonly recordDigestsRecomputed: true;
    readonly evidenceDigestRecomputed: true;
    readonly evidenceRefRecomputed: true;
    readonly duplicateSampleRejected: true;
    readonly duplicateReviewItemRejected: true;
    readonly duplicateReviewArtifactRejected: true;
    readonly participantPartitionLeakageRejected: true;
    readonly captureFamilyPartitionLeakageRejected: true;
    readonly captureFamilyOwnershipDriftRejected: true;
    readonly bothPartitionsRequired: true;
  };
  readonly authorityBoundary: FR221AuthorityBoundary;
}

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const EVIDENCE_REF = /^evidence\.fr221\.observable_morphology_candidate:([0-9a-f]{64})$/u;
const VERIFIED = new WeakSet<object>();
const MATERIALIZED = new WeakSet<object>();

const AUTHORITY_BOUNDARY: FR221AuthorityBoundary = Object.freeze({
  persistedDigestConsistencyMeansOriginalFR218IssuanceIndependentlyProven: false,
  freshnessIndependentlyVerified: false,
  sameParticipantIdentityIndependentlyVerified: false,
  captureQualityValidated: false,
  empiricalSufficiencyEstablished: false,
  repeatCaptureStabilityEstablished: false,
  transitionZoneIssued: false,
  thresholdIssued: false,
  classifierIssued: false,
  traditionalBindingIssued: false,
  productionActivated: false,
  commerceActivated: false,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-221 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('canonical evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    return `{${keys.map((key) => {
      const child = record[key];
      if (child === undefined) fail('canonical evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('canonical evidence must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function safeRef(value: unknown, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded protocol-local opaque reference.`);
  }
  return value;
}

function uniqueStrings(value: unknown, label: string): readonly string[] {
  if (
    !Array.isArray(value)
    || value.some((entry) => typeof entry !== 'string' || entry.trim().length === 0)
  ) {
    fail(`${label} must be an array of non-empty strings.`);
  }
  const out = value as readonly string[];
  if (new Set(out).size !== out.length) fail(`${label} must not contain duplicates.`);
  return Object.freeze([...out]);
}

function recordPayload(candidate: FR218MetricCandidateRecord | FR221PersistedCandidateRecord) {
  return {
    schemaVersion: 'fr221-persisted-candidate-record-v1' as const,
    sourceContractVersion: FR218_CONTRACT_VERSION,
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    sampleRef: candidate.sampleRef,
    participantKey: candidate.participantKey,
    captureFamilyKey: candidate.captureFamilyKey,
    partition: candidate.partition,
    reviewItemRef: candidate.reviewItemRef,
    reviewArtifactRef: candidate.reviewArtifactRef,
    captureAdmissionRef: candidate.captureAdmissionRef,
    captureAdmissionSource: candidate.captureAdmissionSource,
    captureAdmissionReevaluatedByFR218: false as const,
    freshnessIndependentlyVerified: false as const,
    sameParticipantIdentityIndependentlyVerified: false as const,
    captureQualityValidated: false as const,
    metricRef: FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
    metricValue: candidate.metricValue,
    unit: 'degree' as const,
    confounderTags: [...candidate.confounderTags].sort(),
    metricRole: 'candidate_measurement_only' as const,
    humanLabelObserved: false as const,
    thresholdApplied: false as const,
    classifierApplied: false as const,
    traditionalBindingApplied: false as const,
    reviewerExposureAllowed: false as const,
  };
}

function evidenceDigest(records: readonly FR221PersistedCandidateRecord[]): string {
  const ordered = [...records].sort((left, right) =>
    left.sampleRef.localeCompare(right.sampleRef));
  return sha256(canonicalJson({
    contractVersion: FR221_CONTRACT_VERSION,
    sourceContractVersion: FR218_CONTRACT_VERSION,
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    metricRef: FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
    records: ordered,
  }));
}

function validateCrossRecordInvariants(records: readonly FR221PersistedCandidateRecord[]): void {
  if (records.length === 0) fail('candidate evidence must not be empty.');
  const samples = new Set<string>();
  const reviewItems = new Set<string>();
  const reviewArtifacts = new Set<string>();
  const participantPartition = new Map<string, 'selection' | 'holdout'>();
  const familyPartition = new Map<string, 'selection' | 'holdout'>();
  const familyOwner = new Map<string, string>();

  for (const record of records) {
    if (samples.has(record.sampleRef)) fail(`duplicate sampleRef: ${record.sampleRef}.`);
    if (reviewItems.has(record.reviewItemRef)) fail(`duplicate reviewItemRef: ${record.reviewItemRef}.`);
    if (reviewArtifacts.has(record.reviewArtifactRef)) {
      fail(`duplicate reviewArtifactRef: ${record.reviewArtifactRef}.`);
    }
    samples.add(record.sampleRef);
    reviewItems.add(record.reviewItemRef);
    reviewArtifacts.add(record.reviewArtifactRef);

    const participantExisting = participantPartition.get(record.participantKey);
    if (participantExisting !== undefined && participantExisting !== record.partition) {
      fail(`participant leakage across selection/holdout: ${record.participantKey}.`);
    }
    participantPartition.set(record.participantKey, record.partition);

    const familyExisting = familyPartition.get(record.captureFamilyKey);
    if (familyExisting !== undefined && familyExisting !== record.partition) {
      fail(`capture-family leakage across selection/holdout: ${record.captureFamilyKey}.`);
    }
    familyPartition.set(record.captureFamilyKey, record.partition);

    const owner = familyOwner.get(record.captureFamilyKey);
    if (owner !== undefined && owner !== record.participantKey) {
      fail(`capture family belongs to multiple participants: ${record.captureFamilyKey}.`);
    }
    familyOwner.set(record.captureFamilyKey, record.participantKey);
  }

  const partitions = new Set(records.map((record) => record.partition));
  if (!partitions.has('selection') || !partitions.has('holdout')) {
    fail('persisted candidate evidence must contain both selection and holdout partitions.');
  }
}

function makePersistedRecord(candidate: FR218MetricCandidateRecord): FR221PersistedCandidateRecord {
  const payload = recordPayload(candidate);
  return Object.freeze({
    ...payload,
    confounderTags: Object.freeze(payload.confounderTags),
    recordDigest: sha256(canonicalJson(payload)),
  });
}

export function materializeCandidateProvenanceEvidenceFR221(
  candidates: readonly FR218MetricCandidateRecord[],
): FR221PersistedCandidateEvidence {
  assertSelectionHoldoutCoverageFR218(candidates);
  const records = Object.freeze(
    candidates.map(makePersistedRecord).sort((left, right) =>
      left.sampleRef.localeCompare(right.sampleRef)),
  );
  validateCrossRecordInvariants(records);
  const digest = evidenceDigest(records);
  const selectionCount = records.filter((record) => record.partition === 'selection').length;
  const holdoutCount = records.length - selectionCount;

  const result: FR221PersistedCandidateEvidence = Object.freeze({
    schemaVersion: 'fr221-persisted-candidate-provenance-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR221_CONTRACT_VERSION,
    authorityState:
      'fr218_candidate_provenance_materialized_for_later_empirical_join_no_empirical_sufficiency' as const,
    sourceContractVersion: FR218_CONTRACT_VERSION,
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    metricRef: FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
    candidateCount: records.length,
    selectionCount,
    holdoutCount,
    records,
    evidenceDigest: digest,
    evidenceRef:
      `evidence.fr221.observable_morphology_candidate:${digest.slice('sha256:'.length)}`,
    materializationBoundary: Object.freeze({
      activeFR218IssuanceRequired: true as const,
      candidatePoolValidatedBeforeMaterialization: true as const,
      selectionHoldoutCoverageRequired: true as const,
      metricValueReviewerExposureAllowed: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  MATERIALIZED.add(result);
  return result;
}

function verifyRecord(value: unknown, index: number): FR221PersistedCandidateRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail(`record[${index}] must be an object.`);
  }
  const record = value as Record<string, unknown>;
  const sampleRef = safeRef(record.sampleRef, `record[${index}].sampleRef`);
  const participantKey = safeRef(record.participantKey, `record[${index}].participantKey`);
  const captureFamilyKey = safeRef(record.captureFamilyKey, `record[${index}].captureFamilyKey`);
  const reviewItemRef = safeRef(record.reviewItemRef, `record[${index}].reviewItemRef`);
  const reviewArtifactRef = safeRef(record.reviewArtifactRef, `record[${index}].reviewArtifactRef`);
  const captureAdmissionRef = safeRef(record.captureAdmissionRef, `record[${index}].captureAdmissionRef`);
  const confounderTags = uniqueStrings(record.confounderTags, `record[${index}].confounderTags`);

  if (
    record.schemaVersion !== 'fr221-persisted-candidate-record-v1'
    || record.sourceContractVersion !== FR218_CONTRACT_VERSION
    || record.constructRef !== FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF
    || (record.partition !== 'selection' && record.partition !== 'holdout')
    || record.captureAdmissionSource !== 'fr159_prospective_attestation_manifest'
    || record.captureAdmissionReevaluatedByFR218 !== false
    || record.freshnessIndependentlyVerified !== false
    || record.sameParticipantIdentityIndependentlyVerified !== false
    || record.captureQualityValidated !== false
    || record.metricRef !== FR218_EYE_OUTER_CORNER_TILT_METRIC_REF
    || typeof record.metricValue !== 'number'
    || !Number.isFinite(record.metricValue)
    || record.unit !== 'degree'
    || record.metricRole !== 'candidate_measurement_only'
    || record.humanLabelObserved !== false
    || record.thresholdApplied !== false
    || record.classifierApplied !== false
    || record.traditionalBindingApplied !== false
    || record.reviewerExposureAllowed !== false
    || typeof record.recordDigest !== 'string'
    || !SHA256.test(record.recordDigest)
  ) fail(`record[${index}] schema or authority boundary drift.`);

  const normalized = {
    schemaVersion: 'fr221-persisted-candidate-record-v1' as const,
    sourceContractVersion: FR218_CONTRACT_VERSION,
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    sampleRef,
    participantKey,
    captureFamilyKey,
    partition: record.partition,
    reviewItemRef,
    reviewArtifactRef,
    captureAdmissionRef,
    captureAdmissionSource: 'fr159_prospective_attestation_manifest' as const,
    captureAdmissionReevaluatedByFR218: false as const,
    freshnessIndependentlyVerified: false as const,
    sameParticipantIdentityIndependentlyVerified: false as const,
    captureQualityValidated: false as const,
    metricRef: FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
    metricValue: record.metricValue,
    unit: 'degree' as const,
    confounderTags,
    metricRole: 'candidate_measurement_only' as const,
    humanLabelObserved: false as const,
    thresholdApplied: false as const,
    classifierApplied: false as const,
    traditionalBindingApplied: false as const,
    reviewerExposureAllowed: false as const,
  };
  const expectedDigest = sha256(canonicalJson(normalized));
  if (record.recordDigest !== expectedDigest) fail(`record[${index}] digest mismatch.`);

  return Object.freeze({
    ...normalized,
    recordDigest: expectedDigest,
  });
}

function assertFixedTopLevelBoundary(value: Record<string, unknown>): void {
  const materialization = value.materializationBoundary as Record<string, unknown> | undefined;
  const authority = value.authorityBoundary as Record<string, unknown> | undefined;
  if (
    materialization === undefined
    || authority === undefined
    || value.schemaVersion !== 'fr221-persisted-candidate-provenance-evidence-v1'
    || value.artifactVersion !== '0.1.0'
    || value.contractVersion !== FR221_CONTRACT_VERSION
    || value.authorityState !==
      'fr218_candidate_provenance_materialized_for_later_empirical_join_no_empirical_sufficiency'
    || value.sourceContractVersion !== FR218_CONTRACT_VERSION
    || value.constructRef !== FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF
    || value.metricRef !== FR218_EYE_OUTER_CORNER_TILT_METRIC_REF
    || materialization.activeFR218IssuanceRequired !== true
    || materialization.candidatePoolValidatedBeforeMaterialization !== true
    || materialization.selectionHoldoutCoverageRequired !== true
    || materialization.metricValueReviewerExposureAllowed !== false
    || materialization.rawImagePersisted !== false
    || materialization.rawProviderResponsePersisted !== false
    || materialization.rawLandmarkSetPersisted !== false
    || authority.persistedDigestConsistencyMeansOriginalFR218IssuanceIndependentlyProven !== false
    || authority.freshnessIndependentlyVerified !== false
    || authority.sameParticipantIdentityIndependentlyVerified !== false
    || authority.captureQualityValidated !== false
    || authority.empiricalSufficiencyEstablished !== false
    || authority.repeatCaptureStabilityEstablished !== false
    || authority.transitionZoneIssued !== false
    || authority.thresholdIssued !== false
    || authority.classifierIssued !== false
    || authority.traditionalBindingIssued !== false
    || authority.productionActivated !== false
    || authority.commerceActivated !== false
  ) fail('persisted candidate evidence top-level authority boundary drift.');
}

export function verifyPersistedCandidateProvenanceEvidenceFR221(
  value: unknown,
): FR221VerifiedPersistedCandidateEvidence {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail('persisted candidate evidence must be an object.');
  }
  const evidence = value as Record<string, unknown>;
  assertFixedTopLevelBoundary(evidence);
  if (!Array.isArray(evidence.records) || evidence.records.length === 0) {
    fail('persisted candidate evidence records must be a non-empty array.');
  }

  const records = Object.freeze(evidence.records.map(verifyRecord).sort((left, right) =>
    left.sampleRef.localeCompare(right.sampleRef)));
  validateCrossRecordInvariants(records);

  const selectionCount = records.filter((record) => record.partition === 'selection').length;
  const holdoutCount = records.length - selectionCount;
  if (
    evidence.candidateCount !== records.length
    || evidence.selectionCount !== selectionCount
    || evidence.holdoutCount !== holdoutCount
  ) fail('persisted candidate evidence counts do not match records.');

  const digest = evidenceDigest(records);
  if (evidence.evidenceDigest !== digest || !SHA256.test(String(evidence.evidenceDigest))) {
    fail('persisted candidate evidence digest mismatch.');
  }
  const expectedRef =
    `evidence.fr221.observable_morphology_candidate:${digest.slice('sha256:'.length)}`;
  if (evidence.evidenceRef !== expectedRef || !EVIDENCE_REF.test(String(evidence.evidenceRef))) {
    fail('persisted candidate evidence ref mismatch.');
  }

  const result: FR221VerifiedPersistedCandidateEvidence = Object.freeze({
    schemaVersion: 'fr221-verified-persisted-candidate-provenance-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR221_CONTRACT_VERSION,
    authorityState:
      'persisted_fr218_candidate_provenance_integrity_verified_no_empirical_sufficiency' as const,
    evidenceRef: expectedRef,
    evidenceDigest: digest,
    candidateCount: records.length,
    selectionCount,
    holdoutCount,
    records,
    integrityBoundary: Object.freeze({
      recordDigestsRecomputed: true as const,
      evidenceDigestRecomputed: true as const,
      evidenceRefRecomputed: true as const,
      duplicateSampleRejected: true as const,
      duplicateReviewItemRejected: true as const,
      duplicateReviewArtifactRejected: true as const,
      participantPartitionLeakageRejected: true as const,
      captureFamilyPartitionLeakageRejected: true as const,
      captureFamilyOwnershipDriftRejected: true as const,
      bothPartitionsRequired: true as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  VERIFIED.add(result);
  return result;
}

export function assertVerifiedPersistedCandidateProvenanceEvidenceFR221(
  evidence: FR221VerifiedPersistedCandidateEvidence,
): void {
  if (!VERIFIED.has(evidence)) fail('candidate provenance was not verified by the active FR221 runtime.');
  if (
    evidence.schemaVersion !== 'fr221-verified-persisted-candidate-provenance-v1'
    || evidence.contractVersion !== FR221_CONTRACT_VERSION
    || evidence.authorityState !==
      'persisted_fr218_candidate_provenance_integrity_verified_no_empirical_sufficiency'
    || evidence.integrityBoundary.recordDigestsRecomputed !== true
    || evidence.integrityBoundary.evidenceDigestRecomputed !== true
    || evidence.integrityBoundary.bothPartitionsRequired !== true
    || evidence.authorityBoundary.empiricalSufficiencyEstablished !== false
    || evidence.authorityBoundary.repeatCaptureStabilityEstablished !== false
    || evidence.authorityBoundary.thresholdIssued !== false
    || evidence.authorityBoundary.classifierIssued !== false
    || evidence.authorityBoundary.traditionalBindingIssued !== false
  ) fail('verified FR221 candidate provenance authority boundary drift.');
}

export function assertMaterializedCandidateProvenanceEvidenceFR221(
  evidence: FR221PersistedCandidateEvidence,
): void {
  if (!MATERIALIZED.has(evidence)) {
    fail('candidate provenance evidence was not materialized from active FR218 issuance in this runtime.');
  }
}
