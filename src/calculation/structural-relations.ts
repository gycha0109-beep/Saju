import { createHash } from 'node:crypto';
import type {
  EarthlyBranch,
  HeavenlyStem,
  PillarFact,
  PillarSlot,
  StructuralRelationCandidate,
  StructuralRelationKind,
  StructuralRelationParticipant,
} from '../contracts/calculation.js';

export type {
  PillarSlot,
  StructuralRelationCandidate,
  StructuralRelationKind,
  StructuralRelationParticipant,
} from '../contracts/calculation.js';

export interface StructuralPillarInput {
  year?: PillarFact;
  month?: PillarFact;
  day?: PillarFact;
  hour?: PillarFact;
}

export const STRUCTURAL_RELATION_DERIVATION_VERSION = 'myeonghwa-structural-relations-v1' as const;

export const STRUCTURAL_RELATION_SOURCE_CATALOG = Object.freeze({
  yisiZhan: {
    sourceId: 'SRC-T0-YISI-ZHAN-10',
    title: '乙巳占 卷第十',
    url: 'https://zh.wikisource.org/zh-hant/%E4%B9%99%E5%B7%B3%E5%8D%A0/10',
    scope: 'Lists stem five-combinations, branch six-combinations, and opposing branch pairs.',
    accessedAt: '2026-08-19',
  },
  xuanzeYaolue: {
    sourceId: 'SRC-T0-XUANZE-YAOLUE-UPPER',
    title: '選擇要略 上',
    url: 'https://zh.wikisource.org/zh-hant/%E9%81%B8%E6%93%87%E8%A6%81%E7%95%A5/%E4%B8%8A',
    scope: 'Cross-reference listing stem combinations, branch six-combinations, three-combinations, and clashes.',
    accessedAt: '2026-08-19',
  },
  sanmingTonghui: {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    title: '三命通會 卷二',
    url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
    scope:
      'Cross-reference for three-combination sets and, importantly, separate conditions for whether combinations transform or form a complete bureau.',
    accessedAt: '2026-08-19',
  },
});

const STEM_FIVE_COMBINATIONS = [
  ['갑', '기'],
  ['을', '경'],
  ['병', '신'],
  ['정', '임'],
  ['무', '계'],
] as const satisfies readonly (readonly [HeavenlyStem, HeavenlyStem])[];

const BRANCH_SIX_COMBINATIONS = [
  ['자', '축'],
  ['인', '해'],
  ['묘', '술'],
  ['진', '유'],
  ['사', '신'],
  ['오', '미'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

const BRANCH_CLASHES = [
  ['자', '오'],
  ['축', '미'],
  ['인', '신'],
  ['묘', '유'],
  ['진', '술'],
  ['사', '해'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

const BRANCH_THREE_COMBINATIONS = [
  ['인', '오', '술'],
  ['사', '유', '축'],
  ['신', '자', '진'],
  ['해', '묘', '미'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch])[];

const SLOT_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

export const STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH = createHash('sha256')
  .update(
    JSON.stringify(
      canonicalize({
        version: STRUCTURAL_RELATION_DERIVATION_VERSION,
        sourceCatalog: STRUCTURAL_RELATION_SOURCE_CATALOG,
        stemFiveCombinations: STEM_FIVE_COMBINATIONS,
        branchSixCombinations: BRANCH_SIX_COMBINATIONS,
        branchClashes: BRANCH_CLASHES,
        branchThreeCombinations: BRANCH_THREE_COMBINATIONS,
      }),
    ),
  )
  .digest('hex');

function pairMatches<T extends string>(
  left: T,
  right: T,
  pairs: readonly (readonly [T, T])[],
): boolean {
  return pairs.some(
    ([first, second]) =>
      (left === first && right === second) || (left === second && right === first),
  );
}

function tripleMatches(
  values: readonly EarthlyBranch[],
  groups: readonly (readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch])[],
): boolean {
  const candidate = [...values].sort().join('|');
  return groups.some((group) => [...group].sort().join('|') === candidate);
}

function participantKey(participant: StructuralRelationParticipant): string {
  return `${participant.pillar}:${participant.component}:${participant.value}`;
}

function candidate(
  kind: StructuralRelationKind,
  participants: readonly StructuralRelationParticipant[],
  sourceIds: readonly string[],
): StructuralRelationCandidate {
  const relationId = `${kind}:${participants.map(participantKey).join('|')}`;
  return {
    relationId,
    kind,
    participants,
    sourceIds,
    semantics: {
      structuralMatchOnly: true,
      transformationEstablished: false,
    },
  };
}

function availablePillars(input: StructuralPillarInput): readonly { slot: PillarSlot; pillar: PillarFact }[] {
  return SLOT_ORDER.flatMap((slot) => {
    const pillar = input[slot];
    return pillar === undefined ? [] : [{ slot, pillar }];
  });
}

export interface StructuralPillarPairMatch {
  readonly kind: Exclude<StructuralRelationKind, 'branch_three_combination'>;
  readonly component: 'stem' | 'branch';
  readonly sourceIds: readonly string[];
}

/** Only the exact table match. Callers supply the two participants' provenance. */
export function matchStructuralPillarPair(
  left: PillarFact,
  right: PillarFact,
): readonly StructuralPillarPairMatch[] {
  const sourceIds = [
    STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.sourceId,
    STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.sourceId,
  ];
  const matches: StructuralPillarPairMatch[] = [];
  if (pairMatches(left.stem.value, right.stem.value, STEM_FIVE_COMBINATIONS)) {
    matches.push({ kind: 'stem_five_combination', component: 'stem', sourceIds });
  }
  if (pairMatches(left.branch.value, right.branch.value, BRANCH_SIX_COMBINATIONS)) {
    matches.push({ kind: 'branch_six_combination', component: 'branch', sourceIds });
  }
  if (pairMatches(left.branch.value, right.branch.value, BRANCH_CLASHES)) {
    matches.push({ kind: 'branch_clash', component: 'branch', sourceIds });
  }
  return matches;
}

function pairCandidates(input: StructuralPillarInput): readonly StructuralRelationCandidate[] {
  const pillars = availablePillars(input);
  const result: StructuralRelationCandidate[] = [];

  for (let leftIndex = 0; leftIndex < pillars.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < pillars.length; rightIndex += 1) {
      const left = pillars[leftIndex];
      const right = pillars[rightIndex];
      if (left === undefined || right === undefined) continue;

      for (const { kind, component, sourceIds } of matchStructuralPillarPair(left.pillar, right.pillar)) {
        result.push(
          candidate(
            kind,
            [
              { pillar: left.slot, component, value: left.pillar[component].value },
              { pillar: right.slot, component, value: right.pillar[component].value },
            ],
            sourceIds,
          ),
        );
      }
    }
  }

  return result;
}

function tripleCandidates(input: StructuralPillarInput): readonly StructuralRelationCandidate[] {
  const pillars = availablePillars(input);
  const result: StructuralRelationCandidate[] = [];

  for (let firstIndex = 0; firstIndex < pillars.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < pillars.length; secondIndex += 1) {
      for (let thirdIndex = secondIndex + 1; thirdIndex < pillars.length; thirdIndex += 1) {
        const first = pillars[firstIndex];
        const second = pillars[secondIndex];
        const third = pillars[thirdIndex];
        if (first === undefined || second === undefined || third === undefined) continue;

        const values = [first.pillar.branch.value, second.pillar.branch.value, third.pillar.branch.value] as const;
        if (!tripleMatches(values, BRANCH_THREE_COMBINATIONS)) continue;

        result.push(
          candidate(
            'branch_three_combination',
            [
              { pillar: first.slot, component: 'branch', value: first.pillar.branch.value },
              { pillar: second.slot, component: 'branch', value: second.pillar.branch.value },
              { pillar: third.slot, component: 'branch', value: third.pillar.branch.value },
            ],
            [STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.sourceId, STRUCTURAL_RELATION_SOURCE_CATALOG.sanmingTonghui.sourceId],
          ),
        );
      }
    }
  }

  return result;
}

export function deriveStructuralRelationCandidates(
  input: StructuralPillarInput,
): readonly StructuralRelationCandidate[] {
  return [...pairCandidates(input), ...tripleCandidates(input)].sort((left, right) =>
    left.relationId.localeCompare(right.relationId),
  );
}
