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
import { R051_FIVE_COMBINATION_FAMILIES } from './general-natal-heavenly-stem-five-combination.js';
import {
  projectSajuR38RemoteNonjoining,
  SAJU_R38_REMOTE_NONJOINING_AUTHORITY,
  SAJU_R38_SOURCE,
} from './shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';

export const SAJU_R39_SOURCE = Object.freeze({
  ...SAJU_R38_SOURCE,
  sourceId: 'SRC-SAJU-R39-ZIPING-ZHENQUAN-STEM-RIVALRY-SCAN',
  locator: 'PDF pages 20–21 of 287, printed folios 十一–十二, 論十干合而不合',
});
const policy = Object.freeze({
  primitiveId: 'SAJU_R39_POSITION_SPECIFIC_STEM_RIVALRY',
  version: '0.1.0-research',
  issueRef: 'GH-2442',
  source: SAJU_R39_SOURCE,
  upstreamPairFamiliesHash: deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES),
  canonicalStemReaderAuthorityHash: SAJU_R38_REMOTE_NONJOINING_AUTHORITY.definitionHash,
  projectAdoptedScope: 'one_unique_two_counterparts_all_r051_families_both_member_orientations',
  rivalryTrueDomain: 'contiguous_counterpart_unique_counterpart_triple',
  rivalryFalseDomain: 'unique_outer_counterparts_adjacent_and_opposite_outer',
  otherTopology: 'unresolved_no_verdict',
  fourthStemRequiredOutsidePair: true,
  joiningIntentRemovalAuthorized: false,
  joiningWinnerAuthorized: false,
  fullJoiningAuthorized: false,
  zeroEffectAuthorized: false,
  transformationAuthorized: false,
  supportActivationPersistenceAuthorized: false,
  postRelationRootEffectAuthorized: false,
  strengthClassifierAuthorized: false,
  numericScoringAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);
export const SAJU_R39_STEM_RIVALRY_AUTHORITY = Object.freeze({
  ...policy,
  definitionHash: deterministicContentHash(policy),
});
export const SAJU_R39_STEM_RIVALRY_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R39-STEM-RIVALRY',
  version: '1.0.0-research',
  evidenceType: 'SAJU_R39_STEM_RIVALRY_EVIDENCE',
  evidenceVersion: 'saju-r39-stem-rivalry-v1',
  producerRef: { id: 'BUILD-SAJU-R39-STEM-RIVALRY', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R39-STEM-RIVALRY', version: '1.0.0-research' },
  sourceIds: [SAJU_R39_SOURCE.sourceId],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

export function projectSajuR39StemRivalry(snapshot: CanonicalSajuSnapshot) {
  // Reuse canonical four-stem validation, not R38's semantic state or verdict.
  const canonical = projectSajuR38RemoteNonjoining(snapshot);
  const fail = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: `saju-r39-${reason}`,
  });
  if (canonical.status !== 'resolved') return fail(canonical.reasonCode);
  if (
    deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES) !== policy.upstreamPairFamiliesHash ||
    SAJU_R38_REMOTE_NONJOINING_AUTHORITY.definitionHash !== policy.canonicalStemReaderAuthorityHash
  )
    return fail('upstream-authority-drift');
  const stems = canonical.projection.stems;
  const ordered = [stems.year, stems.month, stems.day, stems.hour];
  const candidates = R051_FIVE_COMBINATION_FAMILIES.flatMap((pair) =>
    [false, true].flatMap((reverse) => {
      const uniqueValue = reverse ? pair.right : pair.left;
      const counterpartValue = reverse ? pair.left : pair.right;
      const unique = ordered.filter((stem) => stem.hanja === uniqueValue);
      const counterparts = ordered.filter((stem) => stem.hanja === counterpartValue);
      if (unique.length !== 1 || counterparts.length !== 2) return [];
      const uniqueStem = unique[0]!;
      const uniqueIndex = ordered.indexOf(uniqueStem);
      const counterpartIndices = counterparts.map((stem) => ordered.indexOf(stem));
      const contiguous =
        counterpartIndices[0] === uniqueIndex - 1 && counterpartIndices[1] === uniqueIndex + 1;
      const separated =
        (uniqueIndex === 0 && counterpartIndices[0] === 1 && counterpartIndices[1] === 3) ||
        (uniqueIndex === 3 && counterpartIndices[0] === 0 && counterpartIndices[1] === 2);
      return [
        {
          pairId: pair.pairId,
          uniqueStem,
          counterpartStems: counterparts,
          otherStem: ordered.find(
            (stem) => stem.hanja !== uniqueValue && stem.hanja !== counterpartValue,
          )!,
          topology: contiguous
            ? 'contiguous_rivalry'
            : separated
              ? 'separated_without_rivalry'
              : 'unresolved_topology',
        },
      ];
    }),
  );
  const witness = candidates.length === 1 ? candidates[0]! : null;
  const state = witness?.topology ?? 'outside_single_two_to_one_scope';
  return {
    status: 'resolved',
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      stems,
      witness,
      state,
      jealousRivalry:
        state === 'contiguous_rivalry'
          ? true
          : state === 'separated_without_rivalry'
            ? false
            : 'not_determined',
      fullJoining: 'not_determined',
      joiningWinner: 'not_determined',
      constraints: SAJU_R39_STEM_RIVALRY_AUTHORITY,
    },
  } as const;
}

export function buildSajuR39StemRivalryResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const replay = projectSajuR39StemRivalry(snapshot);
  if (replay.status !== 'resolved') return replay;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SAJU_R39_STEM_RIVALRY_EVIDENCE_DEFINITION,
      snapshot,
      replay.projection,
    ),
  } as const;
}
export function validateSajuR39StemRivalryResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SAJU_R39_STEM_RIVALRY_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const replay = projectSajuR39StemRivalry(snapshot);
  if (replay.status !== 'resolved') errors.push(replay.reasonCode);
  if (
    replay.status !== 'resolved' ||
    deterministicContentHash(replay.projection) !== deterministicContentHash(envelope.payload)
  )
    errors.push('saju_r39_stem_rivalry_payload_not_reproducible_from_bound_snapshot');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}
export const SAJU_R39_STEM_RIVALRY_RUNTIME_ADAPTER = {
  definition: SAJU_R39_STEM_RIVALRY_EVIDENCE_DEFINITION,
  validate: validateSajuR39StemRivalryResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
