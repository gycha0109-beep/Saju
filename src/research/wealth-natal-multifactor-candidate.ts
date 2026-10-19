import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationPack, MethodologyDefinition, RuleDefinition } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

/** Canonical T5 -> source-qualified Wealth T8; no parallel product interpretation. */
export const WEALTH_NATAL_MULTIFACTOR_VERSION = '0.1.0-research' as const;
const METHOD_ID = 'M-WEALTH-NATAL-MULTIFACTOR-RESOURCE-CHOICE-V1';
const RULE_SET = 'wealth-natal-source-bounded-multifactor';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'core' | 'creation' | 'management' | 'planning' | 'tension';
type Channel = 'visible_stems' | 'branches';
interface Pattern {
  id: string;
  families: readonly Family[];
  axis: Axis;
  headline: string;
  summary: string;
}
const PATTERNS: readonly Pattern[] = Object.freeze([
  {
    id: 'OUTPUT_WEALTH_OFFICER', families: ['output','wealth','officer'],
    axis: 'core', headline: '만들어 낸 가치와 자원, 관리 기준이 이어지는 구조',
    summary: '식상(산출·표현), 재성(자원·교환), 관성(규범·책임)이 하나의 관측 채널에서 연결됩니다. 재물 영역에서는 무엇을 가치로 만들고, 어떤 자원으로 옮기며, 어떤 관리 원칙에 둘 것인지 세 질문을 함께 살피는 전통적 구조 해석입니다. 개인의 수입·성과를 예상하는 뜻은 아닙니다.',
  },
  {
    id: 'OUTPUT_WEALTH', families: ['output','wealth'],
    axis: 'creation', headline: '만든 결과와 자원의 교환을 함께 보는 구조',
    summary: '식상이 가리키는 생산·표현과 재성이 가리키는 현실 자원이 함께 놓입니다. 재물 해석에서는 산출한 것을 어떤 가치·자원으로 연결해 볼지에 주목하는 한정된 축이며, 소득 창출 능력이나 수익을 보증하지 않습니다.',
  },
  {
    id: 'WEALTH_OFFICER', families: ['wealth','officer'],
    axis: 'management', headline: '자원 활용과 관리 책임을 연결하는 구조',
    summary: '재성의 자원 관점과 관성의 기준·책임 관점이 만납니다. 자원을 어떻게 다룰지와 그 운용에 어떤 규칙을 둘지를 분리하지 않고 읽는 근거입니다. 실제 저축 성향이나 재정 상태를 안다는 뜻은 아닙니다.',
  },
  {
    id: 'WEALTH_RESOURCE', families: ['wealth','resource'],
    axis: 'planning', headline: '지금 가진 자원과 준비·학습 사이를 조율하는 구조',
    summary: '재성(현실 자원)과 인성(준비·수용)이 함께 관측됩니다. 전통적인 견제 관계를 바탕으로 현재 활용할 자원과 준비에 배분할 자원을 함께 고려하는 구조로 읽습니다. 구체적인 지출 습관이나 투자 행동을 추정하지 않습니다.',
  },
  {
    id: 'PEER_WEALTH', families: ['peer','wealth'],
    axis: 'tension', headline: '자기 결정과 자원 배분이 마주하는 구조',
    summary: '비겁의 주도·공유 관점과 재성의 현실 자원 관점이 한 채널에 있습니다. 자기 기준과 자원을 어떻게 함께 배치할지를 해석의 질문으로 삼되, 소비 성향·채무·수입을 단정하지 않습니다.',
  },
  {
    id: 'PEER_WEALTH_RESOURCE', families: ['peer','wealth','resource'],
    axis: 'tension', headline: '주도권, 현실 자원, 준비의 세 기준이 교차하는 구조',
    summary: '비겁의 자기 결정, 재성의 자원, 인성의 준비라는 세 축이 함께 관측됩니다. 서로 다른 목적 사이의 배분이라는 제한된 전통적 구조를 보여 줄 뿐, 실제 선택 충돌이나 자산 규모를 추론하지 않습니다.',
  },
]);
const CHANNELS: readonly Channel[] = ['visible_stems', 'branches'];
const SOURCE_REFS: RuleDefinition['sourceRefs'] = [
  { sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, supportType: 'interpretive_basis',
    notes: 'Bounded Ten-God structural language only.' },
  { sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, supportType: 'interpretive_basis',
    notes: 'Research-only classical cross-reference for generation/control relations.' },
];
const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export const WEALTH_NATAL_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Wealth natal synthesis of multiple source-bounded Ten-God family channels (research)',
  description: 'Research-only natal wealth/resource-choice interpretation from 2–3 same-channel T5 claims, without financial outcomes.',
  assumptions: [
    'Different T5 Claim inputs must be from the exact same canonical snapshot and channel.',
    'A family presence is not a dominance or strength measure. No favourable/unfavourable polarity.',
    'The core three-family relation is a source-qualified structural chain only, not causation in real life.',
    'The relation can frame resource choices but cannot determine income, personal spending habits, investments, spouse, health or future events.',
    'This methodology is an unreviewed internal research candidate and is not admitted to Product/Commerce.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
});

function claimType(pattern: Pattern, channel: Channel) {
  return `WEALTH_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: WEALTH_NATAL_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'multifactor_structure' },
    methodologyRef: { id: METHOD_ID, version: WEALTH_NATAL_MULTIFACTOR_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description: 'Wealth natal research synthesis of exact channel-bound upstream T5 themes.',
    inputs: pattern.families.map((family, i) => ({
      key: `family${i + 1}`,
      source: 'interpretation_claim' as const,
      pathOrClaimType: `TEN_GOD_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`,
      required: true,
      cardinality: 'exactly_one' as const,
      ambiguityBehavior: 'scenario_preserving' as const,
    })),
    condition: {
      op: 'and',
      expressions: pattern.families.map((_, i) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: `family${i + 1}` },
      })),
    },
    output: {
      claimType: claimType(pattern, channel),
      subject: 'natal_chart',
      predicate: 'wealth_multifactor_structure',
      value: {
        pattern: pattern.id,
        families: [...pattern.families],
        channel,
        axis: pattern.axis,
        realLifeOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        healthOrMoneyOutcomeAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: pattern.axis === 'core' ? 'major' : 'moderate',
      tags: ['research', 'wealth-natal', 'source-bound-multifactor', pattern.axis, channel],
    },
    sourceRefs: SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}
export const WEALTH_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap(pattern => CHANNELS.map(channel => rule(pattern, channel))),
);
export const WEALTH_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERNS.flatMap((pattern, order) => CHANNELS.map(channel => ({
    profileId: `PROFILE-${claimType(pattern, channel)}`,
    version: WEALTH_NATAL_MULTIFACTOR_VERSION,
    claimType: claimType(pattern, channel),
    semanticKeys: ['pattern', 'families', 'channel', 'axis'],
    allowedEpistemicTypes: ['interpretation' as const],
    requiredMethodAttribution: true,
    prohibitedPhrases: ['반드시 성공', '승진한다', '돈이 들어온다', '성격이 확정된다', '운명이 정해져'],
    renderingHints: [`axis:${pattern.axis}`, `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: pattern.headline },
      { templateKey: 'summary', language: 'ko', text:
        (channel === 'visible_stems'
          ? '천간에서 실제로 관측된 조합입니다. '
          : '지지 대표 십신에서 관측된 보조 조합입니다. ') + pattern.summary },
    ],
  }))));
export const WEALTH_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-WEALTH-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  name: 'Wealth natal multifactor synthesis / internal research',
  methodologyRefs: [
    { id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version },
    { id: METHOD_ID, version: WEALTH_NATAL_MULTIFACTOR_VERSION },
  ],
  enabledRuleSets: [...new Set([
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(x => x.ruleSetId),
    RULE_SET,
  ])],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-WEALTH-NATAL-MULTIFACTOR-RESEARCH',
    version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  },
  status: 'research',
});
export function createWealthNatalMultifactorRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot({
    rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...WEALTH_NATAL_MULTIFACTOR_RULES],
    methodologies: [GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
      WEALTH_NATAL_MULTIFACTOR_METHODOLOGY],
    sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
  }, WEALTH_NATAL_MULTIFACTOR_PACK, createdAt);
}
