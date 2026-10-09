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
  projectSnapshotBoundHiddenStemTenGodOccurrences,
  SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY,
} from './snapshot-bound-hidden-stem-ten-god-occurrences.js';

export const SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-HIDDEN-STEM-TEN-GOD-OCCURRENCES',
  version: '1.0.0-research',
  evidenceType: 'SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_EVIDENCE',
  evidenceVersion: 'myeonghwa-shared-natal-hidden-stem-ten-god-occurrence-evidence-v1',
  producerRef: {
    id: 'BUILD-SHARED-NATAL-HIDDEN-STEM-TEN-GOD-OCCURRENCE-EVIDENCE',
    version: '1.0.0-research',
  },
  payloadContractRef: {
    id: 'CONTRACT-SNAPSHOT-BOUND-HIDDEN-STEM-TEN-GOD-OCCURRENCES',
    version: '0.1.0-research',
  },
  sourceIds: [
    SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.sourceBindings.hiddenMembershipVersion,
    SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.sourceBindings.mapper,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

export function buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
) {
  const result = projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}

export function validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const result = projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(envelope.payload) !== deterministicContentHash(result.projection)
  ) {
    errors.push('hidden_stem_ten_god_occurrence_payload_not_reproducible_from_bound_snapshot');
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER = {
  definition: SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
  validate: validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
