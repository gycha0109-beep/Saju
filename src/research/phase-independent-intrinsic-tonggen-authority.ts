import {
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
} from 'manseryeok';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarSlot,
} from '../contracts/calculation.js';
import {
  HIDDEN_STEM_MEMBERSHIP,
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  HIDDEN_STEM_MEMBERSHIP_SOURCE,
  HIDDEN_STEM_MEMBERSHIP_VERSION,
} from '../calculation/hidden-stems.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const INTRINSIC_TONGGEN_SLOTS = Object.freeze(['year', 'month', 'day', 'hour'] as const);
const definition = Object.freeze({
  primitiveId: 'PHASE_INDEPENDENT_INTRINSIC_TONGGEN',
  version: '0.1.0-research',
  policyDecision: 'https://github.com/gycha0109-beep/Saju/issues/2351',
  semanticScope: 'branch_local_same_element_canonical_hidden_root',
  criterion: 'exists_canonical_hidden_stem_with_day_master_element',
  slots: INTRINSIC_TONGGEN_SLOTS,
  yinYangEqualityRequired: false,
  twelveGrowthStageConsumed: false,
  sourceStrataConflict: 'observed_not_adjudicated',
  shenYinChangshengRootClaim: 'source_specific_observation_only',
  xuObjection: 'source_specific_observation_only',
  shenYuqiComparisonCalculationAuthorized: false,
  sourceBindings: Object.freeze({
    membershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
    membershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
    membershipSource: HIDDEN_STEM_MEMBERSHIP_SOURCE,
    stemMetadata: 'manseryeok@2.0.0#getHeavenlyStemElement/getHeavenlyStemYinYang',
  }),
  intrinsicBranchRootVerdictAuthorized: true,
  wholeChartNoRootVerdictAuthorized: false,
  canonicalStorageIndexIsRank: false,
  usableSupportAuthorized: false,
  seasonalOrInteractionEffectAuthorized: false,
  manifestationAuthorized: false,
  countOrWeightAuthorized: false,
  strengthClassificationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productRootAuthority: 'NOT_GRANTED',
  productionAuthorityAuthorized: false,
} as const);

export const INTRINSIC_TONGGEN_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export interface IntrinsicTonggenBranch {
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly sourcePillarRef: `pillars.${PillarSlot}`;
  readonly sourceFactRef: `derivedFacts.hiddenStems.${PillarSlot}`;
  readonly hiddenOccurrences: readonly {
    readonly occurrenceId: `${PillarSlot}:${HeavenlyStem}`;
    readonly hiddenStem: HeavenlyStem;
    readonly sameElementAsDayMaster: boolean;
  }[];
  readonly sameElementHiddenStems: readonly HeavenlyStem[];
  readonly tonggen: boolean;
}

export type IntrinsicTonggenResult =
  | { readonly status: 'unavailable'; readonly reasonCode: string }
  | {
      readonly status: 'resolved';
      readonly projection: {
        readonly primitiveId: typeof definition.primitiveId;
        readonly snapshotId: string;
        readonly snapshotHash: string;
        readonly dayMaster: HeavenlyStem;
        readonly dayMasterSourceFactRef: 'derivedFacts.dayMaster';
        readonly branches: Readonly<Record<PillarSlot, IntrinsicTonggenBranch>>;
        readonly authorityDefinitionHash: string;
        readonly constraints: typeof INTRINSIC_TONGGEN_AUTHORITY;
      };
    };

// Separate project methodology. No phase, TenGod, R6 support class or relation
// enters this predicate. A negative is local to a fully checked branch domain.
export function projectIntrinsicTonggen(snapshot: CanonicalSajuSnapshot): IntrinsicTonggenResult {
  const unavailable = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: `intrinsic-tonggen-${reason}`,
  });
  if (
    typeof snapshot.snapshotId !== 'string' ||
    !snapshot.snapshotId.trim() ||
    typeof snapshot.calculationHash !== 'string' ||
    !snapshot.calculationHash.trim()
  ) {
    return unavailable('snapshot-binding-missing');
  }
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length !== 0) {
    return unavailable('scenario-materialization-required');
  }
  const master = snapshot.derivedFacts.dayMaster;
  const day = snapshot.pillars.day;
  if (master?.status !== 'resolved' || day?.status !== 'resolved')
    return unavailable('day-master-unresolved');
  const stem = master.value?.value;
  const stemIndex = HEAVENLY_STEMS.indexOf(stem);
  if (
    stemIndex < 0 ||
    master.value.element !== getHeavenlyStemElement(stem) ||
    master.value.yinYang !== getHeavenlyStemYinYang(stem) ||
    master.value.hanja !== HEAVENLY_STEMS_HANJA[stemIndex] ||
    deterministicContentHash(master.value) !== deterministicContentHash(day.value?.stem)
  ) {
    return unavailable('day-master-metadata-or-parity-failed');
  }
  const branches: Partial<Record<PillarSlot, IntrinsicTonggenBranch>> = {};
  for (const slot of INTRINSIC_TONGGEN_SLOTS) {
    const pillar = snapshot.pillars[slot];
    const hidden = snapshot.derivedFacts.hiddenStems?.[slot];
    if (pillar?.status !== 'resolved' || hidden?.status !== 'resolved')
      return unavailable(`${slot}-source-unresolved`);
    const branch = pillar.value?.branch?.value;
    if (!Object.hasOwn(HIDDEN_STEM_MEMBERSHIP, branch))
      return unavailable(`${slot}-branch-invalid`);
    const canonical = HIDDEN_STEM_MEMBERSHIP[branch];
    if (
      !Array.isArray(hidden.value) ||
      hidden.value.length !== canonical.length ||
      new Set(hidden.value).size !== hidden.value.length ||
      !canonical.every((value, index) => value === hidden.value[index])
    ) {
      return unavailable(`${slot}-membership-parity-failed`);
    }
    const matches = canonical.filter(
      (value) => getHeavenlyStemElement(value) === master.value.element,
    );
    branches[slot] = Object.freeze({
      pillarSlot: slot,
      branch,
      sourcePillarRef: `pillars.${slot}` as const,
      sourceFactRef: `derivedFacts.hiddenStems.${slot}` as const,
      hiddenOccurrences: Object.freeze(
        canonical.map((value) =>
          Object.freeze({
            occurrenceId: `${slot}:${value}` as const,
            hiddenStem: value,
            sameElementAsDayMaster: getHeavenlyStemElement(value) === master.value.element,
          }),
        ),
      ),
      sameElementHiddenStems: Object.freeze(matches),
      tonggen: matches.length > 0,
    });
  }
  return {
    status: 'resolved',
    projection: Object.freeze({
      primitiveId: definition.primitiveId,
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      dayMaster: stem,
      dayMasterSourceFactRef: 'derivedFacts.dayMaster',
      branches: Object.freeze(branches as Record<PillarSlot, IntrinsicTonggenBranch>),
      authorityDefinitionHash: INTRINSIC_TONGGEN_AUTHORITY.definitionHash,
      constraints: INTRINSIC_TONGGEN_AUTHORITY,
    }),
  };
}
