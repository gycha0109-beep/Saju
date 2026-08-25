import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { VersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from './rule-registry.js';

export const RESEARCH_EVIDENCE_ENVELOPE_VERSION =
  'myeonghwa-research-evidence-envelope-v1' as const;

export interface ResearchEvidenceDefinition {
  definitionId: string;
  version: string;
  evidenceType: string;
  evidenceVersion: string;
  producerRef: VersionedRef;
  payloadContractRef: VersionedRef;
  sourceIds: readonly string[];
  authority: 'research_only';
  snapshotBinding: 'snapshot_id_and_hash';
}

export interface ResearchEvidenceEnvelope<T = unknown> {
  envelopeId: string;
  envelopeVersion: typeof RESEARCH_EVIDENCE_ENVELOPE_VERSION;
  definitionRef: VersionedRef;
  definitionContentHash: string;
  evidenceType: string;
  evidenceVersion: string;
  producerRef: VersionedRef;
  payloadContractRef: VersionedRef;
  snapshotId: string;
  snapshotHash: string;
  sourceIds: readonly string[];
  payloadHash: string;
  payload: T;
  authority: 'research_only';
}

export interface ResearchEvidenceValidationResult {
  valid: boolean;
  errors: readonly string[];
}

function normalizedSourceIds(sourceIds: readonly string[]): readonly string[] {
  return [...new Set(sourceIds)].sort();
}

function sameStrings(left: readonly string[], right: readonly string[]): boolean {
  const a = normalizedSourceIds(left);
  const b = normalizedSourceIds(right);
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function sameRef(left: VersionedRef, right: VersionedRef): boolean {
  return left.id === right.id && left.version === right.version;
}

export function researchEvidenceDefinitionContentHash(
  definition: ResearchEvidenceDefinition,
): string {
  return deterministicContentHash({
    ...definition,
    sourceIds: normalizedSourceIds(definition.sourceIds),
  });
}

export function createResearchEvidenceEnvelope<T>(
  definition: ResearchEvidenceDefinition,
  snapshot: CanonicalSajuSnapshot,
  payload: T,
): ResearchEvidenceEnvelope<T> {
  const sourceIds = normalizedSourceIds(definition.sourceIds);
  const payloadHash = deterministicContentHash(payload);
  const definitionContentHash = researchEvidenceDefinitionContentHash(definition);
  const material = {
    envelopeVersion: RESEARCH_EVIDENCE_ENVELOPE_VERSION,
    definitionRef: { id: definition.definitionId, version: definition.version },
    definitionContentHash,
    evidenceType: definition.evidenceType,
    evidenceVersion: definition.evidenceVersion,
    producerRef: definition.producerRef,
    payloadContractRef: definition.payloadContractRef,
    snapshotId: snapshot.snapshotId,
    snapshotHash: snapshot.calculationHash,
    sourceIds,
    payloadHash,
    authority: 'research_only' as const,
  };
  const envelopeId = `research_evidence_${deterministicContentHash(material).slice(0, 24)}`;

  return {
    envelopeId,
    ...material,
    payload,
  };
}

export function validateResearchEvidenceEnvelope(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
  definition: ResearchEvidenceDefinition,
): ResearchEvidenceValidationResult {
  const errors: string[] = [];
  const expectedDefinitionRef = { id: definition.definitionId, version: definition.version };
  const expectedDefinitionHash = researchEvidenceDefinitionContentHash(definition);
  const expectedPayloadHash = deterministicContentHash(envelope.payload);

  if (envelope.envelopeVersion !== RESEARCH_EVIDENCE_ENVELOPE_VERSION) {
    errors.push(`envelope_version_mismatch:${envelope.envelopeVersion}`);
  }
  if (!sameRef(envelope.definitionRef, expectedDefinitionRef)) {
    errors.push(
      `definition_ref_mismatch:${envelope.definitionRef.id}@${envelope.definitionRef.version}`,
    );
  }
  if (envelope.definitionContentHash !== expectedDefinitionHash) {
    errors.push('definition_content_hash_mismatch');
  }
  if (envelope.evidenceType !== definition.evidenceType) {
    errors.push(`evidence_type_mismatch:${envelope.evidenceType}`);
  }
  if (envelope.evidenceVersion !== definition.evidenceVersion) {
    errors.push(`evidence_version_mismatch:${envelope.evidenceVersion}`);
  }
  if (!sameRef(envelope.producerRef, definition.producerRef)) {
    errors.push(`producer_ref_mismatch:${envelope.producerRef.id}@${envelope.producerRef.version}`);
  }
  if (!sameRef(envelope.payloadContractRef, definition.payloadContractRef)) {
    errors.push(
      `payload_contract_ref_mismatch:${envelope.payloadContractRef.id}@${envelope.payloadContractRef.version}`,
    );
  }
  if (envelope.snapshotId !== snapshot.snapshotId) {
    errors.push(`snapshot_id_mismatch:${envelope.snapshotId}`);
  }
  if (envelope.snapshotHash !== snapshot.calculationHash) {
    errors.push('snapshot_hash_mismatch');
  }
  if (!sameStrings(envelope.sourceIds, definition.sourceIds)) {
    errors.push('source_ids_mismatch');
  }
  if (envelope.payloadHash !== expectedPayloadHash) {
    errors.push('payload_hash_mismatch');
  }
  if (envelope.authority !== 'research_only' || definition.authority !== 'research_only') {
    errors.push('research_only_authority_required');
  }
  if (definition.snapshotBinding !== 'snapshot_id_and_hash') {
    errors.push(`unsupported_snapshot_binding:${definition.snapshotBinding}`);
  }

  const expectedEnvelope = createResearchEvidenceEnvelope(definition, snapshot, envelope.payload);
  if (envelope.envelopeId !== expectedEnvelope.envelopeId) {
    errors.push('envelope_id_mismatch');
  }

  return { valid: errors.length === 0, errors: errors.sort() };
}
