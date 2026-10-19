import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationPack, MethodologyDefinition, RuleDefinition } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

/** Canonical T5 -> source-qualified Business T8; no parallel product interpretation. */
export const BUSINESS_NATAL_MULTIFACTOR_VERSION = '0.2.0-research' as const;
const METHOD_ID = 'M-BUSINESS-NATAL-MULTIFACTOR-EXECUTION-GOVERNANCE-V1';
const RULE_SET = 'business-natal-source-bounded-multifactor';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'core' | 'execution' | 'governance' | 'preparation' | 'coordination';
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
    axis: 'core', headline: '산출, 자원, 운영 기준을 함께 조망하는 사업 구조',
    summary: '식상의 산출·표현, 재성의 교환·자원, 관성의 규범·책임이 동일 관측 채널에 함께 놓입니다. 사업이라는 해석 분야에서는 무엇을 제안하고 어떤 자원을 다루며 어떤 운영 기준을 적용할지를 연결해 읽는 제한된 전통 구조입니다. 실제 창업 적합성·매출·성공 여부를 단정하지 않습니다.',
  },
  {
    id: 'OUTPUT_OFFICER', families: ['output','officer'],
    axis: 'execution', headline: '산출·실행과 역할 기준을 연결하는 구조',
    summary: '식상의 표현·산출과 관성의 규칙·역할이 함께 나타납니다. 사업의 실행 방향을 논할 때 산출 과정과 운영 기준을 구별해 살피는 해석 축이며 실제 사업 역량이나 성과를 판정하지 않습니다.',
  },
  {
    id: 'OUTPUT_RESOURCE', families: ['output','resource'],
    axis: 'preparation', headline: '실행에 앞선 학습·준비와 산출의 연결',
    summary: '식상의 표현·산출과 인성의 수용·준비가 함께 관측됩니다. 기획에서 실행까지 서로 다른 전통적 관점을 살펴볼 수 있다는 의미이며 실제 실행 속도, 창업 시점 또는 투자 여부를 예측하지 않습니다.',
  },
  {
    id: 'PEER_OFFICER', families: ['peer','officer'],
    axis: 'governance', headline: '자기 주도권과 외부 운영 기준의 조율',
    summary: '비겁의 자기 결정·동료 관점과 관성의 규범·책임 관점이 함께 놓입니다. 사업 운영이라는 주제에서 의사결정과 기준의 관계를 점검하는 구조적 질문이지 실제 조직관리 능력이나 분쟁 가능성에 관한 결론은 아닙니다.',
  },
  {
    id: 'PEER_OUTPUT', families: ['peer','output'],
    axis: 'execution', headline: '자기 주도와 구체적 산출의 연결',
    summary: '비겁의 주도·협업 관점과 식상의 생산·표현 관점이 함께 확인됩니다. 스스로 정하는 방식과 밖으로 내놓는 결과를 구별하여 읽는 구조이며 실제 실행력이나 사업가 기질을 단정하지 않습니다.',
  },
  {
    id: 'PEER_RESOURCE_OFFICER', families: ['peer','resource','officer'],
    axis: 'coordination', headline: '주도권·준비·책임 세 기준의 교차',
    summary: '비겁의 자기 기준, 인성의 준비, 관성의 역할·규범이 하나의 관측 채널에서 겹칩니다. 사업에 필요한 준비와 운영 책임을 둘러싼 관점을 비교하는 제한적 독해이며 실제 협업 갈등이나 성패를 예견하지 않습니다.',
  },
  {
    id: 'WEALTH_OFFICER', families: ['wealth','officer'],
    axis: 'governance', headline: '운영 자원과 책임 기준을 함께 놓는 구조',
    summary: '재성이 나타내는 현실 자원·교환의 관점과 관성이 나타내는 규범·책임의 관점이 같은 관측 채널에 있습니다. 사업 주제에서 자원을 다루는 선택과 그 선택에 적용할 기준을 구별해 살피는 연구용 독해이며, 실제 재무 관리 능력이나 경영 성과를 추정하지 않습니다.',
  },
  {
    id: 'WEALTH_RESOURCE', families: ['wealth','resource'],
    axis: 'preparation', headline: '자원 운용과 학습·준비를 함께 보는 구조',
    summary: '재성의 자원·교환과 인성의 수용·학습이 같은 관측 채널에 놓입니다. 사업을 준비하는 과정에서 이용할 자원과 사전에 검토할 내용을 나누어 살피는 전통적 관점일 뿐, 투자 적합성이나 창업 시점·수익을 판단하지 않습니다.',
  },
  {
    id: 'RESOURCE_OFFICER', families: ['resource','officer'],
    axis: 'coordination', headline: '준비 과정과 운영 기준을 맞춰 보는 구조',
    summary: '인성이 가리키는 받아들임·학습과 관성이 가리키는 역할·규범이 함께 확인됩니다. 사업이라는 주제에서는 준비할 내용과 지켜야 할 기준 사이의 관계를 질문할 수 있으나, 실제 허가 취득이나 계약 결과·업무 수행 능력을 예측하지 않습니다.',
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

export const BUSINESS_NATAL_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: BUSINESS_NATAL_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Business natal source-bounded synthesis of execution, governance, and preparation (research)',
  description: 'Research-only natal business/execution-governance interpretation from 2–3 same-channel T5 claims, without financial outcomes.',
  assumptions: [
    'Different T5 Claim inputs must be from the exact same canonical snapshot and channel.',
    'A family presence is not a dominance or strength measure. No favourable/unfavourable polarity.',
    'The core three-family relation is a source-qualified structural chain only, not causation in real life.',
    'Business structures can frame execution and governance questions, but cannot determine ability, profits, entrepreneurship success, income, health, or future events.',
    'This methodology is an unreviewed internal research candidate and is not admitted to Product/Commerce.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
});

function claimType(pattern: Pattern, channel: Channel) {
  return `BUSINESS_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: BUSINESS_NATAL_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'business', subcategory: 'multifactor_structure' },
    methodologyRef: { id: METHOD_ID, version: BUSINESS_NATAL_MULTIFACTOR_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description: 'Business natal research synthesis of exact channel-bound upstream T5 themes.',
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
      predicate: 'business_multifactor_structure',
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
      tags: ['research', 'business-natal', 'source-bound-multifactor', pattern.axis, channel],
    },
    sourceRefs: SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}
export const BUSINESS_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap(pattern => CHANNELS.map(channel => rule(pattern, channel))),
);
export const BUSINESS_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERNS.flatMap((pattern, order) => CHANNELS.map(channel => ({
    profileId: `PROFILE-${claimType(pattern, channel)}`,
    version: BUSINESS_NATAL_MULTIFACTOR_VERSION,
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
export const BUSINESS_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-BUSINESS-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: BUSINESS_NATAL_MULTIFACTOR_VERSION,
  name: 'Business natal multifactor synthesis / internal research',
  methodologyRefs: [
    { id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version },
    { id: METHOD_ID, version: BUSINESS_NATAL_MULTIFACTOR_VERSION },
  ],
  enabledRuleSets: [...new Set([
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(x => x.ruleSetId),
    RULE_SET,
  ])],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-BUSINESS-NATAL-MULTIFACTOR-RESEARCH',
    version: BUSINESS_NATAL_MULTIFACTOR_VERSION,
  },
  status: 'research',
});
export function createBusinessNatalMultifactorRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot({
    rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...BUSINESS_NATAL_MULTIFACTOR_RULES],
    methodologies: [GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
      BUSINESS_NATAL_MULTIFACTOR_METHODOLOGY],
    sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
  }, BUSINESS_NATAL_MULTIFACTOR_PACK, createdAt);
}
