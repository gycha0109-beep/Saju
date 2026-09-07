import { createHash } from 'node:crypto';
import type { EarthlyBranch, PillarSlot } from '../contracts/calculation.js';
import type { SourceReference } from '../contracts/interpretation.js';

export const GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_KIND = 'branch_break' as const;
export const GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE =
  'sanming_tonghui_v3_po_sha_direct_list' as const;

export const GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-SANMING-V3-PO-SHA-BRANCH-BREAK',
  sourceType: 'classical_text',
  title: '三命通會（四庫全書本）卷三',
  language: 'zh-Hant',
  locator: {
    volume: '003',
    section: '總論諸神煞 / 破煞',
    anchor: '破煞：卯與午、丑與辰、子與酉、未與戌皆相破；寅申巳亥原破卻三合故不取',
  },
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
  notes:
    'Research-only source-scoped branch-break membership. The direct positive set is restricted to the four pairs explicitly taken by this passage. It does not authorize a universal modern 六破 table, relation effects, consumer meaning, or the compound 無衝破 qualification.',
} satisfies SourceReference);

export const GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS = Object.freeze([
  ['묘', '오'],
  ['축', '진'],
  ['자', '유'],
  ['미', '술'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[]);

/**
 * Common modern extension pairs used only as explicit negative fixtures for this
 * source scope. They are not direct-positive members of the 卷三 破煞 list.
 */
export const GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS = Object.freeze([
  ['인', '해'],
  ['사', '신'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[]);

export interface GeneralNatalSourceScopedBranchPillar {
  readonly branch: {
    readonly value: EarthlyBranch;
  };
}

export interface GeneralNatalSourceScopedBranchBreakInput {
  readonly year?: GeneralNatalSourceScopedBranchPillar;
  readonly month?: GeneralNatalSourceScopedBranchPillar;
  readonly day?: GeneralNatalSourceScopedBranchPillar;
  readonly hour?: GeneralNatalSourceScopedBranchPillar;
}

export interface GeneralNatalSourceScopedBranchBreakParticipant {
  readonly pillar: PillarSlot;
  readonly branch: EarthlyBranch;
}

export interface GeneralNatalSourceScopedBranchBreakCandidate {
  readonly relationId: string;
  readonly kind: typeof GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_KIND;
  readonly pairKey: string;
  readonly sourceScope: typeof GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE;
  readonly participants: readonly [
    GeneralNatalSourceScopedBranchBreakParticipant,
    GeneralNatalSourceScopedBranchBreakParticipant,
  ];
  readonly sourceIds: readonly [string];
  readonly semantics: {
    readonly structuralMatchOnly: true;
    readonly sourceScopedMembershipOnly: true;
    readonly universalBranchBreakAuthorized: false;
    readonly transformationEstablished: false;
    readonly relationEffectAuthorized: false;
    readonly noClashBreakQualificationEstablished: false;
    readonly consumerMeaningAuthorized: false;
  };
}

const SLOT_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

function directPairFor(
  left: EarthlyBranch,
  right: EarthlyBranch,
): readonly [EarthlyBranch, EarthlyBranch] | undefined {
  return GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS.find(
    ([first, second]) =>
      (left === first && right === second) || (left === second && right === first),
  );
}

function availableBranches(
  input: GeneralNatalSourceScopedBranchBreakInput,
): readonly { readonly slot: PillarSlot; readonly branch: EarthlyBranch }[] {
  return SLOT_ORDER.flatMap((slot) => {
    const pillar = input[slot];
    return pillar === undefined ? [] : [{ slot, branch: pillar.branch.value }];
  });
}

export const GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION,
      sourceId: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE.sourceId,
      sourceScope: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE,
      directPairs: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS,
      nonAdmittedModernPairs: GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS,
      semantics: {
        structuralMatchOnly: true,
        sourceScopedMembershipOnly: true,
        universalBranchBreakAuthorized: false,
        transformationEstablished: false,
        relationEffectAuthorized: false,
        noClashBreakQualificationEstablished: false,
        consumerMeaningAuthorized: false,
      },
    }),
  )
  .digest('hex');

export function deriveGeneralNatalSourceScopedBranchBreakCandidates(
  input: GeneralNatalSourceScopedBranchBreakInput,
): readonly GeneralNatalSourceScopedBranchBreakCandidate[] {
  const branches = availableBranches(input);
  const candidates: GeneralNatalSourceScopedBranchBreakCandidate[] = [];

  for (let leftIndex = 0; leftIndex < branches.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < branches.length; rightIndex += 1) {
      const left = branches[leftIndex];
      const right = branches[rightIndex];
      if (left === undefined || right === undefined) continue;

      const directPair = directPairFor(left.branch, right.branch);
      if (directPair === undefined) continue;

      const pairKey = `${directPair[0]}|${directPair[1]}`;
      candidates.push({
        relationId: `${GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_KIND}:${left.slot}:${left.branch}|${right.slot}:${right.branch}|scope:${GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE}`,
        kind: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_KIND,
        pairKey,
        sourceScope: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE,
        participants: [
          { pillar: left.slot, branch: left.branch },
          { pillar: right.slot, branch: right.branch },
        ],
        sourceIds: [GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE.sourceId],
        semantics: {
          structuralMatchOnly: true,
          sourceScopedMembershipOnly: true,
          universalBranchBreakAuthorized: false,
          transformationEstablished: false,
          relationEffectAuthorized: false,
          noClashBreakQualificationEstablished: false,
          consumerMeaningAuthorized: false,
        },
      });
    }
  }

  return candidates.sort((left, right) => left.relationId.localeCompare(right.relationId));
}
