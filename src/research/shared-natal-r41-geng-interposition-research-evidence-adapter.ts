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
  projectSajuR38RemoteNonjoining,
  SAJU_R38_REMOTE_NONJOINING_AUTHORITY,
  SAJU_R38_SOURCE,
} from './shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';

export const SAJU_R41_SOURCE = Object.freeze({
  ...SAJU_R38_SOURCE,
  sourceId: 'SRC-SAJU-R41-ZIPING-ZHENQUAN-INTERPOSED-GENG-SCAN',
  locator: 'PDF page 19/287 (zero-based page 18), printed folio 十, 論十干合而不合: 甲與己中間以庚間隔',
});

const policy = Object.freeze({
  primitiveId: 'SAJU_R41_EXACT_INTERPOSED_GENG_JIA_JI_NONJOINING',
  version: '0.1.0-research',
  issueRef: 'GH-2448',
  sourceId: SAJU_R41_SOURCE.sourceId,
  canonicalStemReaderAuthorityHash: SAJU_R38_REMOTE_NONJOINING_AUTHORITY.definitionHash,
  adoptedScope: 'exact_jia_geng_ji_contiguous_triple_in_year_month_day_or_month_day_hour',
  reverseOrderAuthorized: false,
  nonGengInterpositionAuthorized: false,
  fourthStemMustBeOutsideJiaGengJi: true,
  fullJoiningDenialAuthorized: true,
  noExactPatternMeansFullJoining: false,
  partialEffectAuthorized: false,
  zeroEffectAuthorized: false,
  bindingWinnerAuthorized: false,
  transformationAuthorized: false,
  supportActivationPersistenceAuthorized: false,
  postRelationRootEffectAuthorized: false,
  effectiveMechanismForceAuthorized: false,
  numericScoringAuthorized: false,
  strengthClassifierAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const SAJU_R41_GENG_INTERPOSITION_AUTHORITY = Object.freeze({
  ...policy,
  definitionHash: deterministicContentHash(policy),
});

export const SAJU_R41_GENG_INTERPOSITION_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R41-EXACT-GENG-INTERPOSITION',
  version: '1.0.0-research',
  evidenceType: 'SAJU_R41_EXACT_GENG_INTERPOSITION_EVIDENCE',
  evidenceVersion: 'saju-r41-exact-geng-interposition-v1',
  producerRef: { id: 'BUILD-SAJU-R41-GENG-INTERPOSITION', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R41-GENG-INTERPOSITION', version: '1.0.0-research' },
  sourceIds: [SAJU_R41_SOURCE.sourceId],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

export function projectSajuR41GengInterposition(snapshot: CanonicalSajuSnapshot) {
  const fail = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: 'saju-r41-' + reason,
  });
  const canonical = projectSajuR38RemoteNonjoining(snapshot);
  if (canonical.status !== 'resolved') return fail(canonical.reasonCode);
  if (
    SAJU_R38_REMOTE_NONJOINING_AUTHORITY.definitionHash !==
    policy.canonicalStemReaderAuthorityHash
  ) return fail('r38-canonical-stem-reader-authority-drift');

  // Only reuse R38's four validated stem identities, never its distance verdict.
  const stems = canonical.projection.stems;
  const ordered = [stems.year, stems.month, stems.day, stems.hour] as const;
  const admitted = [0, 1].flatMap((start) => {
    const a = ordered[start]!;
    const middle = ordered[start + 1]!;
    const b = ordered[start + 2]!;
    const other = ordered[start === 0 ? 3 : 0]!;
    return a.hanja === '甲' &&
      middle.hanja === '庚' &&
      b.hanja === '己' &&
      !['甲', '庚', '己'].includes(other.hanja)
      ? [{
          first: a,
          intervening: middle,
          last: b,
          fourthStem: other,
          pairId: 'JIA-JI' as const,
          interveningControl: 'GENG_CONTROLS_JIA' as const,
        }]
      : [];
  });
  const witness = admitted.length === 1 ? admitted[0]! : null;
  const state = witness === null
    ? 'outside_exact_source_interposition_scope'
    : 'exact_interposed_geng_nonjoining';

  return {
    status: 'resolved' as const,
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      stems,
      witness,
      state,
      fullJoining: witness === null ? 'not_determined' as const : false as const,
      partialEffect: 'not_determined' as const,
      zeroEffect: 'not_determined' as const,
      transformation: 'not_determined' as const,
      supportEffect: 'not_determined' as const,
      targetPostRelationRootState: 'not_determined' as const,
      effectiveMechanismForce: 'not_determined' as const,
      qiangRuo: 'not_determined' as const,
      constraints: SAJU_R41_GENG_INTERPOSITION_AUTHORITY,
    },
  };
}

export function buildSajuR41GengInterpositionResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const replay = projectSajuR41GengInterposition(snapshot);
  if (replay.status !== 'resolved') return replay;
  return {
    status: 'resolved' as const,
    envelope: createResearchEvidenceEnvelope(
      SAJU_R41_GENG_INTERPOSITION_EVIDENCE_DEFINITION,
      snapshot,
      replay.projection,
    ),
  };
}

export function validateSajuR41GengInterpositionResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SAJU_R41_GENG_INTERPOSITION_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const replay = projectSajuR41GengInterposition(snapshot);
  if (replay.status !== 'resolved') errors.push(replay.reasonCode);
  if (
    replay.status !== 'resolved' ||
    deterministicContentHash(replay.projection) !== deterministicContentHash(envelope.payload)
  ) errors.push('saju_r41_exact_interposition_full_replay_mismatch');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const SAJU_R41_GENG_INTERPOSITION_RUNTIME_ADAPTER = {
  definition: SAJU_R41_GENG_INTERPOSITION_EVIDENCE_DEFINITION,
  validate: validateSajuR41GengInterpositionResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
