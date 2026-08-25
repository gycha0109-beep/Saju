import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
  validateResearchEvidenceEnvelope,
} from '../interpretation/research-evidence.js';
import {
  buildI20RelativeForceEvidence,
  I20_RELATIVE_FORCE_EVIDENCE_VERSION,
  I20_RELATIVE_FORCE_SOURCE_BASIS,
  type RelativeForceEvidenceReport,
} from './i20-relative-force-evidence.js';

export const I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE =
  'I20_RELATIVE_FORCE_EVIDENCE' as const;

export const I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-I20-RELATIVE-FORCE',
  version: '1.0.0-research',
  evidenceType: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-I20-RELATIVE-FORCE-EVIDENCE',
    version: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-I20-RELATIVE-FORCE-EVIDENCE-REPORT',
    version: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
  },
  sourceIds: I20_RELATIVE_FORCE_SOURCE_BASIS.map((source) => source.sourceId).sort(),
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type I20RelativeForceResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<RelativeForceEvidenceReport>;

export type I20RelativeForceResearchEvidenceBuildResult =
  | {
      status: 'resolved';
      envelope: I20RelativeForceResearchEvidenceEnvelope;
    }
  | {
      status: 'unavailable';
      reasonCode:
        | 'i20-scenario-materialization-required'
        | 'i20-pillars-unresolved'
        | 'i20-snapshot-binding-missing';
    };

function expectedI20Payload(snapshot: CanonicalSajuSnapshot): RelativeForceEvidenceReport {
  return buildI20RelativeForceEvidence(snapshot);
}

export function buildI20RelativeForceResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): I20RelativeForceResearchEvidenceBuildResult {
  const report = expectedI20Payload(snapshot);
  if (report.status === 'SCENARIO_MATERIALIZATION_REQUIRED') {
    return { status: 'unavailable', reasonCode: 'i20-scenario-materialization-required' };
  }
  if (report.status === 'PILLARS_UNRESOLVED') {
    return { status: 'unavailable', reasonCode: 'i20-pillars-unresolved' };
  }
  if (report.snapshotId !== snapshot.snapshotId) {
    return { status: 'unavailable', reasonCode: 'i20-snapshot-binding-missing' };
  }

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      report,
    ),
  };
}

export function validateI20RelativeForceResearchEvidence(
  envelope: I20RelativeForceResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const expected = expectedI20Payload(snapshot);

  if (expected.status !== 'RESOLVED_EVIDENCE') {
    errors.push(`i20_expected_status_not_resolved:${expected.status}`);
  }
  if (envelope.payload.status !== 'RESOLVED_EVIDENCE') {
    errors.push(`i20_payload_status_not_resolved:${envelope.payload.status}`);
  }
  if (envelope.payload.snapshotId !== snapshot.snapshotId) {
    errors.push(`i20_payload_snapshot_mismatch:${String(envelope.payload.snapshotId)}`);
  }
  if (envelope.payload.evidenceVersion !== I20_RELATIVE_FORCE_EVIDENCE_VERSION) {
    errors.push(`i20_payload_version_mismatch:${envelope.payload.evidenceVersion}`);
  }
  if (
    envelope.payload.relativeForceVerdictAuthorized !== false ||
    envelope.payload.rootEffectResolutionAuthorized !== false ||
    envelope.payload.classificationAuthorized !== false ||
    envelope.payload.numericScoringAuthorized !== false
  ) {
    errors.push('i20_payload_authority_widened');
  }
  if (deterministicContentHash(envelope.payload) !== deterministicContentHash(expected)) {
    errors.push('i20_payload_not_reproducible_from_bound_snapshot');
  }

  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}
