import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
} from '../interpretation/research-evidence.js';
import { collectVisibleStemYinshouSupport } from './general-natal-visible-stem-yinshou-support-collection-authority.js';
import { SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION } from './shared-natal-single-fact-yinshou-support-research-evidence-adapter.js';

export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R28-VISIBLE-STEM-YINSHOU-SUPPORT-COLLECTION',
  version: '1.0.0-research',
  evidenceType: 'VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE',
  evidenceVersion: 'saju-r28-visible-stem-yinshou-support-collection-v1',
  producerRef: {
    id: 'BUILD-SAJU-R28-VISIBLE-STEM-YINSHOU-SUPPORT-COLLECTION',
    version: '1.0.0-research',
  },
  payloadContractRef: {
    id: 'CONTRACT-SAJU-R28-VISIBLE-STEM-YINSHOU-SUPPORT-COLLECTION',
    version: '1.0.0-research',
  },
  sourceIds: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.sourceIds,
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

export function buildVisibleStemYinshouSupportCollectionResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
) {
  const result = collectVisibleStemYinshouSupport(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}

export function validateVisibleStemYinshouSupportCollectionResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const result = collectVisibleStemYinshouSupport(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  ) {
    errors.push('yinshou_collection_payload_not_reproducible_from_bound_snapshot');
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RUNTIME_ADAPTER = {
  definition: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION,
  validate: validateVisibleStemYinshouSupportCollectionResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
