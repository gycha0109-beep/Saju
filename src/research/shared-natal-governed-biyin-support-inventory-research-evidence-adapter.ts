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
import { collectGovernedBiyinSupportInventory } from './governed-biyin-support-inventory-authority.js';
import { HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION } from './shared-natal-hidden-biyin-support-constituent-research-evidence-adapter.js';

export const GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R31-GOVERNED-BIYIN-SUPPORT-INVENTORY',
  version: '1.0.0-research',
  evidenceType: 'GOVERNED_NON_ADDITIVE_BIYIN_SUPPORT_INVENTORY_EVIDENCE',
  evidenceVersion: 'saju-r31-governed-biyin-support-inventory-v1',
  producerRef: { id: 'BUILD-SAJU-R31-GOVERNED-BIYIN-SUPPORT-INVENTORY', version: '1.0.0-research' },
  payloadContractRef: {
    id: 'CONTRACT-SAJU-R31-GOVERNED-BIYIN-SUPPORT-INVENTORY',
    version: '1.0.0-research',
  },
  sourceIds: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION.sourceIds,
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;
export function buildGovernedBiyinSupportInventoryResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
) {
  const result = collectGovernedBiyinSupportInventory(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}
export function validateGovernedBiyinSupportInventoryResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const errors = [
    ...validateResearchEvidenceEnvelope(
      envelope,
      snapshot,
      GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE_DEFINITION,
    ).errors,
  ];
  const result = collectGovernedBiyinSupportInventory(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  )
    errors.push('governed_biyin_inventory_payload_not_reproducible_from_bound_snapshot');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_RUNTIME_ADAPTER = {
  definition: GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE_DEFINITION,
  validate: validateGovernedBiyinSupportInventoryResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
