import { getTenGod } from 'manseryeok';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarSlot,
  TenGod,
} from '../contracts/calculation.js';
import {
  HIDDEN_STEM_MEMBERSHIP,
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  HIDDEN_STEM_MEMBERSHIP_SOURCE,
  HIDDEN_STEM_MEMBERSHIP_VERSION,
} from '../calculation/hidden-stems.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY } from './saju-r26-bijie-branch-hidden-scope-audit.js';

const slots = Object.freeze(['year', 'month', 'day', 'hour'] as const);
const stems = new Set<HeavenlyStem>(Object.values(HIDDEN_STEM_MEMBERSHIP).flat());
const definition = Object.freeze({
  primitiveId: 'SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCES',
  version: '0.1.0-research',
  authority: 'structural_mapping_only',
  slots,
  occurrenceIdentity: 'pillar_slot_and_hidden_stem_value',
  sourceBindings: Object.freeze({
    r26DefinitionHash: SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY.definitionHash,
    hiddenMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
    hiddenMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
    hiddenMembershipSource: HIDDEN_STEM_MEMBERSHIP_SOURCE,
    mapper: 'manseryeok@2.0.0#getTenGod',
    mapperRepository: 'https://github.com/yhj1024/manseryeok',
  }),
  canonicalArrayIndexIsSemanticRank: false,
  representativeBranchAdded: false,
  visibleDaySelfIncluded: false,
  hiddenSupportAuthorized: false,
  tonggenAuthorized: false,
  completeSupportCollectionAuthorized: false,
  countOrWeightAuthorized: false,
  strengthClassificationAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export interface SnapshotBoundHiddenStemTenGodOccurrence {
  readonly occurrenceId: `${PillarSlot}:${HeavenlyStem}`;
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly hiddenStem: HeavenlyStem;
  readonly tenGod: TenGod;
  readonly sourceFactRef: `derivedFacts.hiddenStems.${PillarSlot}`;
  readonly sourcePillarRef: `pillars.${PillarSlot}`;
}

export type SnapshotBoundHiddenStemTenGodOccurrenceResult =
  | { readonly status: 'unavailable'; readonly reasonCode: string }
  | {
      readonly status: 'resolved';
      readonly projection: {
        readonly primitiveId: typeof definition.primitiveId;
        readonly snapshotId: string;
        readonly snapshotHash: string;
        readonly dayMaster: HeavenlyStem;
        readonly dayMasterSourceFactRef: 'derivedFacts.dayMaster';
        readonly occurrences: readonly SnapshotBoundHiddenStemTenGodOccurrence[];
        readonly authorityDefinitionHash: string;
        readonly constraints: typeof SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY;
      };
    };

// A derived research projection only. Neither canonical facts nor R23 support
// membership are changed; one unavailable slot makes this projection unavailable.
export function projectSnapshotBoundHiddenStemTenGodOccurrences(
  snapshot: CanonicalSajuSnapshot,
): SnapshotBoundHiddenStemTenGodOccurrenceResult {
  const unavailable = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: `hidden-stem-ten-god-occurrences-${reason}`,
  });
  if (!snapshot.snapshotId?.trim() || !snapshot.calculationHash?.trim()) {
    return unavailable('snapshot-binding-missing');
  }
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length > 0) {
    return unavailable('scenario-materialization-required');
  }
  const master = snapshot.derivedFacts.dayMaster;
  const day = snapshot.pillars.day;
  if (master?.status !== 'resolved' || day?.status !== 'resolved') {
    return unavailable('day-master-or-day-pillar-unresolved');
  }
  if (
    !stems.has(master.value?.value) ||
    deterministicContentHash(master.value) !== deterministicContentHash(day.value?.stem)
  ) {
    return unavailable('day-master-day-pillar-parity-failed');
  }
  const occurrences: SnapshotBoundHiddenStemTenGodOccurrence[] = [];
  for (const slot of slots) {
    const pillar = snapshot.pillars[slot];
    const hidden = snapshot.derivedFacts.hiddenStems?.[slot];
    if (pillar?.status !== 'resolved' || hidden?.status !== 'resolved') {
      return unavailable(`${slot}-source-unresolved`);
    }
    const branch = pillar.value?.branch?.value;
    if (!Object.hasOwn(HIDDEN_STEM_MEMBERSHIP, branch)) {
      return unavailable(`${slot}-branch-invalid`);
    }
    const canonical = HIDDEN_STEM_MEMBERSHIP[branch];
    if (
      !Array.isArray(hidden.value) ||
      new Set(hidden.value).size !== hidden.value.length ||
      hidden.value.length !== canonical.length ||
      !canonical.every((stem, index) => hidden.value[index] === stem)
    ) {
      return unavailable(`${slot}-hidden-membership-parity-failed`);
    }
    for (const stem of canonical) {
      occurrences.push(
        Object.freeze({
          occurrenceId: `${slot}:${stem}` as const,
          pillarSlot: slot,
          branch,
          hiddenStem: stem,
          tenGod: getTenGod(master.value.value, stem),
          sourceFactRef: `derivedFacts.hiddenStems.${slot}` as const,
          sourcePillarRef: `pillars.${slot}` as const,
        }),
      );
    }
  }
  return {
    status: 'resolved',
    projection: Object.freeze({
      primitiveId: definition.primitiveId,
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      dayMaster: master.value.value,
      dayMasterSourceFactRef: 'derivedFacts.dayMaster',
      occurrences: Object.freeze(occurrences),
      authorityDefinitionHash:
        SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.definitionHash,
      constraints: SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY,
    }),
  };
}
