import { createHash } from 'node:crypto';
import {
  assertVerifiedPersistedExternalWitnessEvidenceFR225,
  type FR225VerifiedPersistedExternalWitnessEvidence,
} from './observable-morphology-external-witness-evidence-fr225.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR227_CONTRACT_VERSION =
  'FR227-EXTERNAL-EVIDENCE-BYTE-INSPECTION-v1' as const;

export const FR227_MAX_EXTERNAL_EVIDENCE_BYTES = 16 * 1024 * 1024;

export type FR227EvidenceMediaType =
  | 'application/json'
  | 'application/pdf'
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp'
  | 'text/plain'
  | 'video/mp4';

export interface FR227ExternalEvidencePayload {
  readonly externalEvidenceRef: string;
  readonly mediaType: FR227EvidenceMediaType;
  readonly bytes: Uint8Array;
}

export interface FR227ExternalEvidenceInspectionReceipt {
  readonly witnessRef: string;
  readonly externalEvidenceRef: string;
  readonly mediaType: FR227EvidenceMediaType;
  readonly byteLength: number;
  readonly declaredDigest: string;
  readonly computedDigest: string;
  readonly externalEvidenceBytesPresent: true;
  readonly externalEvidenceDigestMatched: true;
  readonly externalEvidenceProvenanceAuthenticated: false;
  readonly externalEvidenceSubstanceIndependentlyAdjudicated: false;
  readonly witnessClaimCryptographicallyAuthenticated: false;
  readonly underlyingFactIndependentlyEstablished: false;
}

export interface FR227ExternalEvidenceByteInspection {
  readonly schemaVersion: 'fr227-external-evidence-byte-inspection-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR227_CONTRACT_VERSION;
  readonly authorityState:
    'external_evidence_bytes_digest_matched_substance_and_provenance_unverified';
  readonly studyGateRef: string;
  readonly studyGateDigest: string;
  readonly sourceWitnessEvidenceRef: string;
  readonly sourceWitnessEvidenceDigest: string;
  readonly witnessRecordCount: number;
  readonly inspectedEvidenceCount: number;
  readonly receipts: readonly FR227ExternalEvidenceInspectionReceipt[];
  readonly inspectionDigest: string;
  readonly inspectionRef: string;
  readonly integrityBoundary: {
    readonly activeFR225VerificationRequired: true;
    readonly onePayloadPerWitnessRecordRequired: true;
    readonly missingEvidenceRefRejected: true;
    readonly duplicateEvidenceRefRejected: true;
    readonly extraEvidenceRefRejected: true;
    readonly nonEmptyPayloadRequired: true;
    readonly operationalPayloadSizeBoundApplied: true;
    readonly sha256RecomputedFromActualBytes: true;
    readonly declaredDigestMatchRequired: true;
  };
  readonly operationalBoundary: {
    readonly maximumPayloadBytes: typeof FR227_MAX_EXTERNAL_EVIDENCE_BYTES;
    readonly maximumPayloadBytesIsEmpiricalSufficiencyThreshold: false;
  };
  readonly authorityBoundary: {
    readonly evidenceBytesPresenceMeansEvidenceAuthentic: false;
    readonly digestMatchMeansEvidenceProvenanceAuthenticated: false;
    readonly digestMatchMeansEvidenceSubstanceAdjudicated: false;
    readonly verifierIdentityIndependentlyVerified: false;
    readonly verifierIndependenceIndependentlyVerified: false;
    readonly witnessClaimCryptographicallyAuthenticated: false;
    readonly externalEvidenceProvenanceAuthenticated: false;
    readonly externalEvidenceSubstanceIndependentlyAdjudicated: false;
    readonly underlyingFactIndependentlyEstablished: false;
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
const MEDIA_TYPES = new Set<FR227EvidenceMediaType>([
  'application/json',
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'text/plain',
  'video/mp4',
]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-227 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('inspection receipt cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('inspection receipt cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('inspection receipt must be JSON-compatible.');
}

function sha256Bytes(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function sha256Text(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function validatePayload(payload: FR227ExternalEvidencePayload, index: number): void {
  if (typeof payload.externalEvidenceRef !== 'string' || !SAFE_REF.test(payload.externalEvidenceRef)) {
    fail(`payload[${index}].externalEvidenceRef must be a bounded opaque reference.`);
  }
  if (!MEDIA_TYPES.has(payload.mediaType)) {
    fail(`payload[${index}].mediaType is unsupported.`);
  }
  if (!(payload.bytes instanceof Uint8Array)) {
    fail(`payload[${index}].bytes must be Uint8Array.`);
  }
  if (payload.bytes.byteLength === 0) {
    fail(`payload[${index}] must contain non-empty evidence bytes.`);
  }
  if (payload.bytes.byteLength > FR227_MAX_EXTERNAL_EVIDENCE_BYTES) {
    fail(`payload[${index}] exceeds the operational byte-size bound.`);
  }
}

export function inspectExternalEvidenceBytesFR227(input: {
  readonly witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence;
  readonly payloads: readonly FR227ExternalEvidencePayload[];
}): FR227ExternalEvidenceByteInspection {
  assertVerifiedPersistedExternalWitnessEvidenceFR225(input.witnessEvidence);
  if (!Array.isArray(input.payloads)) fail('payloads must be an array.');

  const expectedByEvidenceRef = new Map(
    input.witnessEvidence.records.map((record) => [record.externalEvidenceRef, record] as const),
  );
  if (expectedByEvidenceRef.size !== input.witnessEvidence.records.length) {
    fail('FR225 witness evidence contains duplicate externalEvidenceRef values.');
  }

  const payloadByRef = new Map<string, FR227ExternalEvidencePayload>();
  input.payloads.forEach((payload, index) => {
    validatePayload(payload, index);
    if (payloadByRef.has(payload.externalEvidenceRef)) {
      fail(`duplicate payload externalEvidenceRef: ${payload.externalEvidenceRef}.`);
    }
    if (!expectedByEvidenceRef.has(payload.externalEvidenceRef)) {
      fail(`extra external evidence payload not represented by FR225: ${payload.externalEvidenceRef}.`);
    }
    payloadByRef.set(payload.externalEvidenceRef, payload);
  });

  const receipts = input.witnessEvidence.records
    .map((record) => {
      const payload = payloadByRef.get(record.externalEvidenceRef);
      if (payload === undefined) {
        fail(`missing external evidence payload for witness ${record.witnessRef}: ${record.externalEvidenceRef}.`);
      }
      const computedDigest = sha256Bytes(payload.bytes);
      if (computedDigest !== record.externalEvidenceDigest) {
        fail(`external evidence digest mismatch for witness ${record.witnessRef}.`);
      }
      const receipt: FR227ExternalEvidenceInspectionReceipt = Object.freeze({
        witnessRef: record.witnessRef,
        externalEvidenceRef: record.externalEvidenceRef,
        mediaType: payload.mediaType,
        byteLength: payload.bytes.byteLength,
        declaredDigest: record.externalEvidenceDigest,
        computedDigest,
        externalEvidenceBytesPresent: true as const,
        externalEvidenceDigestMatched: true as const,
        externalEvidenceProvenanceAuthenticated: false as const,
        externalEvidenceSubstanceIndependentlyAdjudicated: false as const,
        witnessClaimCryptographicallyAuthenticated: false as const,
        underlyingFactIndependentlyEstablished: false as const,
      });
      return receipt;
    })
    .sort((left, right) => left.witnessRef.localeCompare(right.witnessRef));

  if (payloadByRef.size !== receipts.length) {
    fail('payload count does not exactly match FR225 witness records.');
  }

  const inspectionDigest = sha256Text(canonicalJson({
    contractVersion: FR227_CONTRACT_VERSION,
    studyGateRef: input.witnessEvidence.studyGateRef,
    studyGateDigest: input.witnessEvidence.studyGateDigest,
    sourceWitnessEvidenceRef: input.witnessEvidence.evidenceRef,
    sourceWitnessEvidenceDigest: input.witnessEvidence.evidenceDigest,
    receipts,
  }));

  const result: FR227ExternalEvidenceByteInspection = Object.freeze({
    schemaVersion: 'fr227-external-evidence-byte-inspection-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR227_CONTRACT_VERSION,
    authorityState:
      'external_evidence_bytes_digest_matched_substance_and_provenance_unverified' as const,
    studyGateRef: input.witnessEvidence.studyGateRef,
    studyGateDigest: input.witnessEvidence.studyGateDigest,
    sourceWitnessEvidenceRef: input.witnessEvidence.evidenceRef,
    sourceWitnessEvidenceDigest: input.witnessEvidence.evidenceDigest,
    witnessRecordCount: input.witnessEvidence.recordCount,
    inspectedEvidenceCount: receipts.length,
    receipts: Object.freeze(receipts),
    inspectionDigest,
    inspectionRef:
      `evidence.fr227.external_evidence_byte_inspection:${inspectionDigest.slice('sha256:'.length)}`,
    integrityBoundary: Object.freeze({
      activeFR225VerificationRequired: true as const,
      onePayloadPerWitnessRecordRequired: true as const,
      missingEvidenceRefRejected: true as const,
      duplicateEvidenceRefRejected: true as const,
      extraEvidenceRefRejected: true as const,
      nonEmptyPayloadRequired: true as const,
      operationalPayloadSizeBoundApplied: true as const,
      sha256RecomputedFromActualBytes: true as const,
      declaredDigestMatchRequired: true as const,
    }),
    operationalBoundary: Object.freeze({
      maximumPayloadBytes: FR227_MAX_EXTERNAL_EVIDENCE_BYTES,
      maximumPayloadBytesIsEmpiricalSufficiencyThreshold: false as const,
    }),
    authorityBoundary: Object.freeze({
      evidenceBytesPresenceMeansEvidenceAuthentic: false as const,
      digestMatchMeansEvidenceProvenanceAuthenticated: false as const,
      digestMatchMeansEvidenceSubstanceAdjudicated: false as const,
      verifierIdentityIndependentlyVerified: false as const,
      verifierIndependenceIndependentlyVerified: false as const,
      witnessClaimCryptographicallyAuthenticated: false as const,
      externalEvidenceProvenanceAuthenticated: false as const,
      externalEvidenceSubstanceIndependentlyAdjudicated: false as const,
      underlyingFactIndependentlyEstablished: false as const,
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

export function assertExternalEvidenceByteInspectionFR227(
  inspection: FR227ExternalEvidenceByteInspection,
): void {
  if (!ISSUED.has(inspection)) {
    fail('external evidence inspection was not issued by active FR227 runtime.');
  }
  if (
    inspection.schemaVersion !== 'fr227-external-evidence-byte-inspection-v1'
    || inspection.contractVersion !== FR227_CONTRACT_VERSION
    || inspection.witnessRecordCount !== inspection.inspectedEvidenceCount
    || inspection.integrityBoundary.activeFR225VerificationRequired !== true
    || inspection.integrityBoundary.sha256RecomputedFromActualBytes !== true
    || inspection.integrityBoundary.declaredDigestMatchRequired !== true
    || inspection.operationalBoundary.maximumPayloadBytesIsEmpiricalSufficiencyThreshold !== false
    || inspection.authorityBoundary.evidenceBytesPresenceMeansEvidenceAuthentic !== false
    || inspection.authorityBoundary.digestMatchMeansEvidenceProvenanceAuthenticated !== false
    || inspection.authorityBoundary.digestMatchMeansEvidenceSubstanceAdjudicated !== false
    || inspection.authorityBoundary.externalEvidenceProvenanceAuthenticated !== false
    || inspection.authorityBoundary.externalEvidenceSubstanceIndependentlyAdjudicated !== false
    || inspection.authorityBoundary.underlyingFactIndependentlyEstablished !== false
    || inspection.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || inspection.authorityBoundary.empiricalSufficiencyEstablished !== false
    || inspection.authorityBoundary.calibrationAuthorized !== false
    || inspection.authorityBoundary.thresholdIssued !== false
    || inspection.authorityBoundary.classifierIssued !== false
    || inspection.authorityBoundary.traditionalBindingIssued !== false
  ) fail('FR227 external evidence inspection authority boundary drift.');
}
