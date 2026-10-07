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
import { projectIntrinsicTonggen } from './phase-independent-intrinsic-tonggen-authority.js';

export const INTRINSIC_TONGGEN_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R33-INTRINSIC-TONGGEN',
  version: '1.0.0-research',
  evidenceType: 'PHASE_INDEPENDENT_INTRINSIC_TONGGEN_EVIDENCE',
  evidenceVersion: 'saju-r33-phase-independent-intrinsic-tonggen-v1',
  producerRef: { id: 'BUILD-SAJU-R33-INTRINSIC-TONGGEN', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R33-INTRINSIC-TONGGEN', version: '1.0.0-research' },
  sourceIds: ['SRC-SAJU-R33-INTRINSIC-TONGGEN-POLICY'],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

export function buildIntrinsicTonggenResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = projectIntrinsicTonggen(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      INTRINSIC_TONGGEN_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}

export function validateIntrinsicTonggenResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    INTRINSIC_TONGGEN_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const result = projectIntrinsicTonggen(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  ) {
    errors.push('intrinsic_tonggen_payload_not_reproducible_from_bound_snapshot');
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const INTRINSIC_TONGGEN_RUNTIME_ADAPTER = {
  definition: INTRINSIC_TONGGEN_EVIDENCE_DEFINITION,
  validate: validateIntrinsicTonggenResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
