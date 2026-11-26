import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationPack, MethodologyDefinition, RuleDefinition, RuleExpression, RuleInputRequirement, SourceReference } from '../contracts/interpretation.js';
import { createWholeChartRegistrySnapshot } from '../interpretation/whole-chart-claims.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_HIDDEN_STEM_SOURCE,
  GENERAL_NATAL_HIDDEN_STEM_T5_METHOD_ID,
  GENERAL_NATAL_HIDDEN_STEM_T5_METHODOLOGY,
  GENERAL_NATAL_HIDDEN_STEM_T5_RULE_SET_ID,
  GENERAL_NATAL_HIDDEN_STEM_T5_VERSION,
  GENERAL_NATAL_HIDDEN_STEM_TEN_GOD_RULES,
} from './general-natal-hidden-stem-ten-god-candidate.js';

/** Canonical T5 -> source-qualified Business T8; no parallel product interpretation. */
export const BUSINESS_NATAL_MULTIFACTOR_VERSION = '0.3.0-research' as const;
const METHOD_ID = 'M-BUSINESS-NATAL-MULTIFACTOR-EXECUTION-GOVERNANCE-V1';
const RULE_SET = 'business-natal-source-bounded-multifactor';
const MONTH_FOOD_PATTERN = 'MONTH_FOOD_WEALTH';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'core' | 'execution' | 'governance' | 'preparation' | 'coordination';
type Channel = 'visible_stems' | 'branches' | 'hidden_stems';
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
    id: MONTH_FOOD_PATTERN, families: ['output','wealth'],
    axis: 'execution', headline: '꾸준한 산출을 교환 가능한 제안으로 잇는 구조',
    summary: '월지에 든 식신과 같은 글자가 원국 천간에 보이고, 재성도 천간에서 확인됩니다. 식신생재의 국소 관계를 사업에 적용하면, 같은 품질로 반복해 만들 수 있는 산출물과 상대가 그 산출물을 선택할 교환 조건을 연결해 봅니다. 운영 책임과 기준은 관성 근거가 확인되는 범위에서 따로 살핍니다.',
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
  {
    id: 'PEER_WEALTH', families: ['peer','wealth'],
    axis: 'coordination', headline: '주도권과 자원 교환을 함께 보는 구조',
    summary: '비겁의 자기 기준·동료 관점과 재성의 교환·자원 관점이 함께 관측됩니다. 운영상 선택의 주체와 자원에 관한 관점을 구별해 보는 제한된 독해이며 투자 성향, 수익, 동업 성공이나 실제 금전관계를 예측하지 않습니다.',
  },
]);
const CHANNELS: readonly Channel[] = ['visible_stems', 'branches', 'hidden_stems'];
const PATTERN_CHANNELS = PATTERNS.flatMap((pattern) =>
  (pattern.id === MONTH_FOOD_PATTERN
    ? CHANNELS.filter((channel) => channel === 'visible_stems')
    : CHANNELS).map((channel) => ({ pattern, channel })),
);
const FOOD_SOURCE: SourceReference = {
  sourceId: 'SRC-BUSINESS-JAPYEONG-JINJEON-FOOD-WEALTH',
  sourceType: 'classical_text', title: '子平真詮 論用神成敗救應・論食神',
  language: 'zh-Hant', locator: { section: '九、論用神成敗救應' },
  url: 'https://www.donglishuzhai.net/chapter/3722.html', provenanceTier: 'primary',
  notes: 'Distinguishes Food God generating Wealth from Food God encountering Indirect Resource. No establishment or outcome verdict.',
};
const BUSINESS_MONTH_METHOD: MethodologyDefinition = {
  methodologyId: 'M-BUSINESS-NATAL-MONTH-FOOD-WEALTH-V1', version: '0.1.0-research',
  family: 'domain_synthesis', name: 'Month-position Food God and visible Wealth in business',
  description: 'Locally connects a repeated, exact month-hidden Food God stem to visible Wealth.',
  assumptions: [
    'Match the same exact stem in the month hidden membership and an observed Food God visible position.',
    'Visible Wealth is required. If Indirect Resource is also visible, withhold this local execution reading.',
    'No hidden-stem rank, established pattern, strength, remedy efficacy, or business outcome is decided.',
  ],
  requiredFactTypes: ['derivedFacts.hiddenStems.month', 'derivedFacts.tenGods'],
  sourceIds: [FOOD_SOURCE.sourceId, GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, GENERAL_NATAL_HIDDEN_STEM_SOURCE.sourceId],
  status: 'research',
};
const VISIBLE_SLOTS = ['year', 'month', 'hour'] as const;
const MONTH_FOOD_INPUTS: readonly RuleInputRequirement[] = [
  { key: 'hiddenMonth', pathOrClaimType: 'derivedFacts.hiddenStems.month', source: 'derived_fact' },
  ...VISIBLE_SLOTS.flatMap(slot => [
    { key: slot + 'Pillar', pathOrClaimType: 'pillars.' + slot, source: 'canonical_fact' as const },
    { key: slot + 'God', pathOrClaimType: `derivedFacts.tenGods.${slot}.stem`, source: 'derived_fact' as const },
  ]),
].map(input => ({ ...input, required: true, ambiguityBehavior: 'requires_resolved' })) as readonly RuleInputRequirement[];

const MONTH_FOOD_CONDITIONS: readonly RuleExpression[] = [
  {
    op: 'or',
    expressions: VISIBLE_SLOTS.map(slot => ({
      op: 'and', expressions: [
        { op: 'eq', left: { kind: 'input', key: slot + 'God' }, right: { kind: 'literal', value: '식신' } },
        { op: 'or', expressions: ['0', '1', '2'].map(path => ({
          op: 'and', expressions: [
            { op: 'exists', value: { kind: 'input', key: 'hiddenMonth', path } },
            { op: 'eq', left: { kind: 'input', key: slot + 'Pillar', path: 'stem.value' },
              right: { kind: 'input', key: 'hiddenMonth', path } },
          ],
        })) },
      ],
    })),
  },
  {
    op: 'not',
    expression: { op: 'or', expressions: VISIBLE_SLOTS.map(slot => ({
      op: 'eq', left: { kind: 'input', key: slot + 'God' }, right: { kind: 'literal', value: '편인' },
    })) },
  },
];
const SOURCE_REFS: RuleDefinition['sourceRefs'] = [
  { sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, supportType: 'interpretive_basis',
    notes: 'Bounded Ten-God structural language only.' },
  { sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, supportType: 'interpretive_basis',
    notes: 'Research-only classical cross-reference for generation/control relations.' },
];
function sourceRefsForChannel(channel: Channel): RuleDefinition['sourceRefs'] {
  return channel === 'hidden_stems'
    ? [
        ...SOURCE_REFS,
        {
          sourceId: GENERAL_NATAL_HIDDEN_STEM_SOURCE.sourceId,
          supportType: 'interpretive_basis',
          notes: 'Uses the separate hidden-stem T5 channel; no hidden-stem prominence or strength is inferred.',
        },
      ]
    : SOURCE_REFS;
}

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
  requiredFactTypes: [],
  optionalFactTypes: ['derivedFacts.tenGods', 'derivedFacts.dayMaster', 'derivedFacts.hiddenStems'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, GENERAL_NATAL_HIDDEN_STEM_SOURCE.sourceId],
  status: 'research',
});

function claimType(pattern: Pattern, channel: Channel) {
  return `BUSINESS_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  const anchored = pattern.id === MONTH_FOOD_PATTERN;
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: BUSINESS_NATAL_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'business', subcategory: 'multifactor_structure' },
    methodologyRef: anchored
      ? { id: BUSINESS_MONTH_METHOD.methodologyId, version: BUSINESS_MONTH_METHOD.version }
      : { id: METHOD_ID, version: BUSINESS_NATAL_MULTIFACTOR_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description: 'Business natal research synthesis of exact channel-bound upstream T5 themes.',
    inputs: [...pattern.families.map((family, i) => ({
      key: `family${i + 1}`,
      source: 'interpretation_claim' as const,
      pathOrClaimType: `TEN_GOD_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`,
      required: true,
      cardinality: 'exactly_one' as const,
      ambiguityBehavior: 'scenario_preserving' as const,
    })), ...(anchored ? MONTH_FOOD_INPUTS : [])],
    condition: {
      op: 'and',
      expressions: [...pattern.families.map((_, i) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: `family${i + 1}` },
      })), ...(anchored ? MONTH_FOOD_CONDITIONS : [])],
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
    sourceRefs: anchored
      ? [...sourceRefsForChannel(channel), { sourceId: GENERAL_NATAL_HIDDEN_STEM_SOURCE.sourceId, supportType: 'interpretive_basis', notes: 'Supports the exact month hidden-stem position used by this anchored rule.' }, { sourceId: FOOD_SOURCE.sourceId, supportType: 'interpretive_basis' }]
      : sourceRefsForChannel(channel),
    quality: QUALITY,
    status: 'research',
  };
}
export const BUSINESS_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERN_CHANNELS.map(({ pattern, channel }) => rule(pattern, channel)),
);
export const BUSINESS_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERN_CHANNELS.map(({ pattern, channel }, order) => ({
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
          : channel === 'branches'
            ? '지지 대표 십신에서 관측된 보조 조합입니다. '
            : '지장간에서 별도로 관측된 조합입니다. ') + pattern.summary },
    ],
  })));
export const BUSINESS_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  wholeChartJudgment: 'research',
  packId: 'PACK-BUSINESS-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: `${BUSINESS_NATAL_MULTIFACTOR_VERSION}.month-food`,
  name: 'Business natal multifactor synthesis / internal research',
  methodologyRefs: [
    { id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version },
    { id: METHOD_ID, version: BUSINESS_NATAL_MULTIFACTOR_VERSION },
    { id: BUSINESS_MONTH_METHOD.methodologyId, version: BUSINESS_MONTH_METHOD.version },
    { id: GENERAL_NATAL_HIDDEN_STEM_T5_METHOD_ID, version: GENERAL_NATAL_HIDDEN_STEM_T5_VERSION },
  ],
  enabledRuleSets: [...new Set([
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(x => x.ruleSetId),
    GENERAL_NATAL_HIDDEN_STEM_T5_RULE_SET_ID,
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
  return createWholeChartRegistrySnapshot({
    rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...GENERAL_NATAL_HIDDEN_STEM_TEN_GOD_RULES, ...BUSINESS_NATAL_MULTIFACTOR_RULES],
    methodologies: [GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
      GENERAL_NATAL_HIDDEN_STEM_T5_METHODOLOGY,
      BUSINESS_NATAL_MULTIFACTOR_METHODOLOGY, BUSINESS_MONTH_METHOD],
    sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_HIDDEN_STEM_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE, FOOD_SOURCE],
  }, BUSINESS_NATAL_MULTIFACTOR_PACK, createdAt);
}
