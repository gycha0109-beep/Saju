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
import {
  collectHiddenBiyinSupportConstituents,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY,
} from './hidden-biyin-support-constituent-authority.js';

export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R30-HIDDEN-BIYIN-SUPPORT-CONSTITUENTS',
  version: '1.0.0-research',
  evidenceType: 'HIDDEN_BIYIN_SUPPORT_CONSTITUENT_COLLECTION_EVIDENCE',
  evidenceVersion: 'saju-r30-hidden-biyin-support-constituents-v1',
  producerRef: {
    id: 'BUILD-SAJU-R30-HIDDEN-BIYIN-SUPPORT-CONSTITUENTS',
    version: '1.0.0-research',
  },
  payloadContractRef: {
    id: 'CONTRACT-SAJU-R30-HIDDEN-BIYIN-SUPPORT-CONSTITUENTS',
    version: '1.0.0-research',
  },
  sourceIds: [
    HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY.source.url,
    ...HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY.categorySources,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;
export function buildHiddenBiyinSupportConstituentResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
) {
  const result = collectHiddenBiyinSupportConstituents(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}
export function validateHiddenBiyinSupportConstituentResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const result = collectHiddenBiyinSupportConstituents(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  ) {
    errors.push('hidden_biyin_support_payload_not_reproducible_from_bound_snapshot');
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RUNTIME_ADAPTER = {
  definition: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION,
  validate: validateHiddenBiyinSupportConstituentResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
