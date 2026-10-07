import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
  validateResearchEvidenceEnvelope,
} from '../interpretation/research-evidence.js';
import { evaluateVisibleStemBijieSupportConstituentUnion } from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import {
  evaluateVisibleStemBijieSupportMemberCount,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY,
} from './general-natal-visible-stem-bijie-support-member-count-authority.js';
import { SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION } from './shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-stem-bijie-support-member-count-evidence-v1' as const;
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_EVIDENCE' as const;
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT-EVIDENCE',
    version: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT-EVIDENCE',
    version: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION.sourceIds,
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

function reproducePayload(snapshot: CanonicalSajuSnapshot) {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-stem-bijie-support-member-count-scenario-materialization-required',
    } as const;
  }
  const union = evaluateVisibleStemBijieSupportConstituentUnion(snapshot.derivedFacts.tenGods);
  const count = evaluateVisibleStemBijieSupportMemberCount(union);
  if (count.state !== 'visible_stem_bijie_support_member_count_resolved') {
    return {
      status: 'unavailable',
      reasonCode: `visible-stem-bijie-support-member-count-${count.state.replaceAll('_', '-')}`,
    } as const;
  }
  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      primitiveId: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.primitiveId,
      semanticScope: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.semanticScope,
      visibleStemBijieSupportMemberCount: count.visibleStemBijieSupportMemberCount,
      upstreamThreeWayParityVerified: true as const,
      upstreamR23State: union.state,
      upstreamR23ResultHash: deterministicContentHash(union),
      authorityDefinitionHash:
        GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.definitionHash,
      constraints: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY,
    }),
  } as const;
}

export type SharedNatalVisibleStemBijieSupportMemberCountResearchEvidencePayload = Extract<
  ReturnType<typeof reproducePayload>,
  { status: 'resolved' }
>['payload'];

export function buildSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
) {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  } as const;
}

export function validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') errors.push(reproduced.reasonCode);
  // Exact reproduction also rejects additional fields, widened authority, wrong
  // counts, forged upstream bindings and zero substituted for unresolved input.
  if (
    reproduced.status !== 'resolved' ||
    deterministicContentHash(envelope.payload) !== deterministicContentHash(reproduced.payload)
  ) {
    errors.push(
      'visible_stem_bijie_support_member_count_payload_not_reproducible_from_bound_snapshot',
    );
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
    validate: validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;
