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
  composeGovernedSupportPartialOrder,
  GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY,
} from './shared-natal-governed-support-partial-order-authority.js';

export const GOVERNED_SUPPORT_PARTIAL_ORDER_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R29-GOVERNED-SUPPORT-PARTIAL-ORDER',
  version: '1.0.0-research',
  evidenceType: 'GOVERNED_BOUNDED_SUPPORT_PARTIAL_ORDER_EVIDENCE',
  evidenceVersion: 'saju-r29-governed-support-partial-order-v1',
  producerRef: { id: 'BUILD-SAJU-R29-GOVERNED-SUPPORT-PARTIAL-ORDER', version: '1.0.0-research' },
  payloadContractRef: {
    id: 'CONTRACT-SAJU-R29-GOVERNED-SUPPORT-PARTIAL-ORDER',
    version: '1.0.0-research',
  },
  sourceIds: [
    GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY.source.url,
    'https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm',
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;
export function buildGovernedSupportPartialOrderResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = composeGovernedSupportPartialOrder(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      GOVERNED_SUPPORT_PARTIAL_ORDER_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}
export function validateGovernedSupportPartialOrderResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    GOVERNED_SUPPORT_PARTIAL_ORDER_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const result = composeGovernedSupportPartialOrder(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  ) {
    errors.push('governed_support_partial_order_payload_not_reproducible_from_bound_snapshot');
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}
export const GOVERNED_SUPPORT_PARTIAL_ORDER_RUNTIME_ADAPTER = {
  definition: GOVERNED_SUPPORT_PARTIAL_ORDER_EVIDENCE_DEFINITION,
  validate: validateGovernedSupportPartialOrderResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
