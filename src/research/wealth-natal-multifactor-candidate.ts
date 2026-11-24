import { getTenGod } from 'manseryeok';
import type { HeavenlyStem, TenGod } from '../contracts/calculation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  RuleInputRequirement,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

/** Canonical T5 -> source-qualified Wealth T8; no parallel product interpretation. */
export const WEALTH_NATAL_MULTIFACTOR_VERSION = '0.3.0-research' as const;
const EXISTING_WEALTH_VERSION = '0.2.0-research';
const METHOD_ID = 'M-WEALTH-NATAL-MULTIFACTOR-RESOURCE-CHOICE-V1';
export const WEALTH_MONTH_OUTPUT_METHOD_ID = 'M-WEALTH-NATAL-MONTH-OUTPUT-CONTEXT-V1';
const RULE_SET = 'wealth-natal-source-bounded-multifactor';
const HIDDEN_STEM_METHOD_ID = 'M-WEALTH-NATAL-HIDDEN-STEM-T5-OBSERVATION-V1';
const HIDDEN_STEM_METHOD_VERSION = '0.1.0-research' as const;
const HIDDEN_STEM_RULE_SET = 'wealth-natal-hidden-stem-ten-god-observation';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'core' | 'creation' | 'management' | 'planning' | 'tension' | 'context';
type Channel = 'visible_stems' | 'branches' | 'hidden_stems';
interface Pattern {
  id: string;
  families: readonly Family[];
  axis: Axis;
  headline: string;
  summary: string;
  monthOutput?: '식신' | '상관';
}
const PATTERNS: readonly Pattern[] = Object.freeze([
  {
    id: 'WEALTH_OFFICER_RESOURCE',
    families: ['wealth', 'officer', 'resource'],
    axis: 'core',
    headline: '자원의 관리 기준과 준비가 이어지는 구조',
    summary:
      '자원을 운용하기 전에 어떤 관리 기준을 세우고 그 기준을 지키려면 무엇을 준비해야 하는지 살펴봅니다. 재성에서 관성으로, 관성에서 인성으로 이어지는 생조 관계를 적용한 구조 풀이입니다.',
  },
  {
    id: 'OUTPUT_WEALTH_OFFICER',
    families: ['output', 'wealth', 'officer'],
    axis: 'core',
    headline: '만들어 낸 가치와 자원, 관리 기준이 이어지는 구조',
    summary:
      '만들어 낸 결과가 어떤 자원으로 이어질 수 있는지, 그 자원을 계속 다루려면 어떤 관리 책임이 필요한지 함께 살펴봅니다. 식상으로 시작해 재성과 관성으로 이어지는 구조를 읽습니다.',
  },
  {
    id: 'OUTPUT_WEALTH',
    families: ['output', 'wealth'],
    axis: 'creation',
    headline: '만든 결과와 자원의 교환을 함께 보는 구조',
    summary:
      '식상과 재성의 연결에서는 만들어 낸 결과를 어떤 형태의 자원과 교환할 수 있을지에 초점을 둡니다. 예를 들어 무엇을 산출물로 삼고 무엇을 교환 대상으로 볼지를 구분하는 관점입니다.',
  },
  {
    id: 'WEALTH_OFFICER',
    families: ['wealth', 'officer'],
    axis: 'management',
    headline: '자원 활용과 관리 책임을 연결하는 구조',
    summary:
      '재성과 관성의 연결에서는 확보한 자원에 어떤 운용 기준을 두고 누가 그 기준을 지킬 책임을 맡는지 살펴봅니다.',
  },
  {
    id: 'WEALTH_RESOURCE',
    families: ['wealth', 'resource'],
    axis: 'planning',
    headline: '지금 가진 자원과 준비·학습 사이를 조율하는 구조',
    summary:
      '재성과 인성의 견제 관계에서는 지금 활용할 자원과 학습이나 준비를 위해 남겨 둘 자원 사이의 배분을 살펴봅니다.',
  },
  {
    id: 'PEER_WEALTH',
    families: ['peer', 'wealth'],
    axis: 'tension',
    headline: '자기 결정과 자원 배분이 마주하는 구조',
    summary:
      '비겁과 재성이 함께 놓인 구조에서는 자원을 배분할 때 스스로 정할 몫과 다른 사람과 조율할 몫이 각각 무엇인지 살펴봅니다.',
  },
  {
    id: 'PEER_WEALTH_RESOURCE',
    families: ['peer', 'wealth', 'resource'],
    axis: 'tension',
    headline: '주도권, 현실 자원, 준비의 세 기준이 교차하는 구조',
    summary:
      '비겁·재성·인성이 함께 놓인 구조에서는 자신의 판단으로 당장 쓸 자원과 준비를 위해 남겨 둘 자원 사이의 배분을 살펴봅니다.',
  },
  {
    id: 'OFFICER_RESOURCE_CONTEXT',
    families: ['officer', 'resource'],
    axis: 'context',
    headline: '책임과 준비가 만나는 주변 구조',
    summary:
      '관성(규범·책임)과 인성(수용·학습)이 같은 관측 채널에서 함께 확인됩니다. 고전의 관인 관계를 바탕으로 자원을 다루는 주제에 앞서 역할과 준비의 연결을 설명할 수 있는 제한된 주변 맥락입니다. 재성 자체의 관측이나 재물의 규모·흐름·유불리를 뜻하지 않으며, 재물운의 핵심 판단을 대신할 수 없습니다.',
  },
  {
    id: 'OFFICER_PEER_CONTEXT',
    families: ['officer', 'peer'],
    axis: 'context',
    headline: '책임과 자기 기준이 마주하는 주변 구조',
    summary:
      '관성(규범·역할)과 비겁(자기 기준·동료)이 같은 관측 채널에 함께 확인됩니다. 전통적인 관성과 비겁의 견제 관계를 바탕으로 외부 요구와 자기 기준을 나란히 살피는 제한된 주변 맥락입니다. 재성에 관한 직접 해석이나 개인의 실제 재정 행동·성공·실패를 판단할 근거가 아닙니다.',
  },
  {
    id: 'OUTPUT_PEER_CONTEXT',
    families: ['output', 'peer'],
    axis: 'context',
    monthOutput: '상관',
    headline: '자기 방식으로 만든 결과의 교환 조건',
    summary:
      '월지의 한 지장간이 상관이고 다른 지장간에서 비겁이 확인됩니다. 자원을 읽을 때는 스스로 정한 방식으로 기존 산출물을 어떻게 바꾸고 그 결과를 어떤 조건에서 교환할 수 있는지부터 살펴봅니다. 명식에서 확인한 근거는 산출 방식까지이며, 그 산출이 재성으로 이어지는 연결은 확인되지 않습니다.',
  },
  {
    id: 'OUTPUT_RESOURCE_CONTEXT',
    families: ['output', 'resource'],
    axis: 'context',
    monthOutput: '식신',
    headline: '꾸준히 만들고 준비에 쓸 몫을 가르는 구조',
    summary:
      '월지의 한 지장간이 식신이고 다른 지장간에서 인성이 확인됩니다. 반복해서 만들어 낼 수 있는 결과를 먼저 구체화하고, 준비와 검토에 드는 몫을 산출에 투입하는 몫과 구분해 읽습니다. 인성이 식신을 뒷받침하거나 제약하는 정도는 여기서 확정하지 않으며, 산출이 자원으로 바뀌는 연결도 확인되지 않습니다.',
  },
]);
const CHANNELS: readonly Channel[] = ['visible_stems', 'branches', 'hidden_stems'];
const PATTERN_CHANNELS = PATTERNS.flatMap((pattern) =>
  (pattern.monthOutput ? CHANNELS.filter((channel) => channel === 'hidden_stems') : CHANNELS).map(
    (channel) => ({ pattern, channel }),
  ),
);
const MONTH_ORDER_SOURCE = {
  sourceId: 'SRC-WEALTH-JAPYEONG-JINJEON-MONTH-ORDER',
  sourceType: 'classical_text',
  title: '子平真詮 論用神・論用神成敗救應',
  language: 'zh-Hant',
  locator: { section: '八、論用神 / 九、論用神成敗救應' },
  url: 'https://www.donglishuzhai.net/chapter/3722.html',
  provenanceTier: 'primary',
  notes:
    'Month branch as a starting context and the conditional distinction between output and its generating Wealth. No determination of Gyeokguk or its establishment.',
} satisfies SourceReference;
const SOURCE_REFS: RuleDefinition['sourceRefs'] = [
  {
    sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    supportType: 'interpretive_basis',
    notes: 'Bounded Ten-God structural language only.',
  },
  {
    sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    supportType: 'interpretive_basis',
    notes: 'Research-only classical cross-reference for generation/control relations.',
  },
];
const HIDDEN_STEMS_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-YUANHAI-HIDDEN-STEMS-WIKISOURCE',
  sourceType: 'classical_text',
  title: '\u6DF5\u6D77\u5B50\u5E73',
  language: 'zh-Hant',
  locator: {
    section:
      '\u8AD6\u5929\u5E72\u5730\u652F\u6697\u85CF\u7E3D\u8A23 / \u53C8\u5730\u652F\u85CF\u9041\u6B4C',
  },
  url: 'https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3',
  accessedAt: '2026-11-21',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
  notes:
    'The Wikisource page marks the transcription incomplete and its scan source unverified. Used only to identify hidden-stem contents and positions; not as authority for strength, prominence, fortune polarity, or outcomes.',
} satisfies SourceReference);
const HIDDEN_STEM_SOURCE_REFS: RuleDefinition['sourceRefs'] = [
  {
    sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    supportType: 'interpretive_basis',
    notes:
      'Provides the day-master to Ten-God correspondence; only neutral family mapping is used.',
  },
  {
    sourceId: HIDDEN_STEMS_SOURCE.sourceId,
    supportType: 'interpretive_basis',
    notes:
      'Lists hidden stems by branch; used only for the distinct hidden_stems observation channel.',
  },
];
const HIDDEN_STEM_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const HIDDEN_STEM_INDEXES = [0, 1, 2] as const;
const DAY_STEMS: readonly HeavenlyStem[] = [
  '\uAC11',
  '\uC744',
  '\uBCD1',
  '\uC815',
  '\uBB34',
  '\uAE30',
  '\uACBD',
  '\uC2E0',
  '\uC784',
  '\uACC4',
];
const FAMILY_TEN_GODS: Readonly<Record<Family, readonly TenGod[]>> = {
  peer: ['\uBE44\uACAC', '\uAC81\uC7AC'],
  resource: ['\uC815\uC778', '\uD3B8\uC778'],
  output: ['\uC2DD\uC2E0', '\uC0C1\uAD00'],
  wealth: ['\uC815\uC7AC', '\uD3B8\uC7AC'],
  officer: ['\uC815\uAD00', '\uD3B8\uAD00'],
};
export const WEALTH_NATAL_HIDDEN_STEM_T5_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: HIDDEN_STEM_METHOD_ID,
  version: HIDDEN_STEM_METHOD_VERSION,
  family: 'ten_gods',
  name: 'Hidden-stem Ten-God family observation (research)',
  description:
    'Maps each canonical hidden stem against the resolved day master and records family presence in a third, independent observation channel.',
  assumptions: [
    'Hidden stems remain separate from visible stems and branch representative Ten-God observations.',
    'Each hidden stem is mapped against the exact resolved day master; only family presence is recorded.',
    'No hidden-stem strength, dominance, rooting, favorable/unfavorable polarity, or financial outcome is inferred.',
    'A resolved day master and resolved year, month, and day hidden-stem facts are sufficient for observations independent of the birth hour.',
    'An unavailable hour hidden-stem fact is excluded locally; it does not invalidate resolved year, month, or day observations.',
    'Ambiguous required pillar facts remain unresolved and do not produce a confirmed T5 observation.',
    'Wealth T8 combinations may consume hidden-stem T5 claims only with other hidden_stems claims from the same canonical chart.',
    'This is an unreviewed internal research candidate and is not admitted to Product/Commerce.',
  ],
  requiredFactTypes: [
    'derivedFacts.dayMaster',
    'derivedFacts.hiddenStems.year',
    'derivedFacts.hiddenStems.month',
    'derivedFacts.hiddenStems.day',
  ],
  optionalFactTypes: ['derivedFacts.hiddenStems.hour'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, HIDDEN_STEMS_SOURCE.sourceId],
  status: 'research',
});
const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

function hiddenStemPresenceCondition(
  tenGods: readonly TenGod[],
  slots: readonly (typeof HIDDEN_STEM_SLOTS)[number][] = HIDDEN_STEM_SLOTS,
): RuleExpression {
  const byDayMaster: RuleExpression[] = DAY_STEMS.map((dayStem) => {
    const allowedHiddenStems = DAY_STEMS.filter((hiddenStem) =>
      tenGods.includes(getTenGod(dayStem, hiddenStem)),
    );
    return {
      op: 'and' as const,
      expressions: [
        {
          op: 'eq' as const,
          left: { kind: 'input' as const, key: 'dayMaster', path: 'value' },
          right: { kind: 'literal' as const, value: dayStem },
        },
        {
          op: 'or' as const,
          expressions: slots.flatMap((slot) =>
            HIDDEN_STEM_INDEXES.map((index) => ({
              op: 'in' as const,
              value: {
                kind: 'input' as const,
                key: 'hidden' + slot[0]!.toUpperCase() + slot.slice(1),
                path: String(index),
              },
              set: allowedHiddenStems,
            })),
          ),
        },
      ],
    };
  });
  return {
    op: 'and',
    expressions: [
      { op: 'exists', value: { kind: 'input', key: 'dayMaster', path: 'value' } },
      { op: 'or', expressions: byDayMaster },
    ],
  };
}
function hiddenStemT5Rule(family: Family): RuleDefinition {
  return {
    ruleId: 'RULE-WEALTH-NATAL-T5-' + family.toUpperCase() + '-HIDDEN-STEMS',
    version: EXISTING_WEALTH_VERSION,
    ruleSetId: HIDDEN_STEM_RULE_SET,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: family + '_hidden_stems' },
    methodologyRef: { id: HIDDEN_STEM_METHOD_ID, version: HIDDEN_STEM_METHOD_VERSION },
    title: family + ' Ten-God family observed in hidden stems',
    description:
      'Records hidden-stem family presence as a separate observation channel; it does not score prominence or predict an outcome.',
    inputs: [
      {
        key: 'dayMaster',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.dayMaster',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
      ...HIDDEN_STEM_SLOTS.map((slot) => ({
        key: 'hidden' + slot[0]!.toUpperCase() + slot.slice(1),
        source: 'derived_fact' as const,
        pathOrClaimType: 'derivedFacts.hiddenStems.' + slot,
        acceptedStatuses:
          slot === 'hour' ? (['resolved', 'unavailable'] as const) : (['resolved'] as const),
        required: slot !== 'hour',
        ambiguityBehavior: 'scenario_preserving' as const,
      })),
    ],
    condition: hiddenStemPresenceCondition(FAMILY_TEN_GODS[family]),
    output: {
      claimType: 'TEN_GOD_' + family.toUpperCase() + '_HIDDEN_STEMS_THEME',
      subject: 'natal_chart',
      predicate: 'ten_god_theme',
      value: {
        family,
        channel: 'hidden_stems',
        headline: family + ' family observed in hidden stems',
        summary:
          'A hidden-stem Ten-God family is observed. This is a distinct positional observation, not a strength or outcome judgment.',
        consumerSection: 'wealth',
        fortunePolarity: 'not_determined',
        dominance: 'not_scored',
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'ten-god-theme', 'hidden-stems', 'non-predictive'],
    },
    sourceRefs: HIDDEN_STEM_SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}
export const WEALTH_NATAL_HIDDEN_STEM_TEN_GOD_RULES: readonly RuleDefinition[] = Object.freeze(
  (['peer', 'resource', 'output', 'wealth', 'officer'] as const).map(hiddenStemT5Rule),
);

export const WEALTH_NATAL_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: EXISTING_WEALTH_VERSION,
  family: 'domain_synthesis',
  name: 'Wealth natal synthesis of multiple source-bounded Ten-God family channels (research)',
  description:
    'Research-only natal wealth/resource-choice interpretation from 2–3 same-channel T5 claims; explicitly distinguish indirect contextual structure from direct wealth themes, without financial outcomes.',
  assumptions: [
    'Different T5 Claim inputs must be from the exact same canonical snapshot and channel.',
    'A family presence is not a dominance or strength measure. No favourable/unfavourable polarity.',
    'The core three-family relation is a source-qualified structural chain only, not causation in real life.',
    'Officer-resource and officer-peer T5 relations may provide indirect background context only; no Wealth family is inferred from either relation and neither can satisfy the core wealth requirement.',
    'The relation can frame resource choices but cannot determine income, personal spending habits, investments, spouse, health or future events.',
    'This methodology is an unreviewed internal research candidate and is not admitted to Product/Commerce.',
  ],
  requiredFactTypes: [],
  optionalFactTypes: ['derivedFacts.tenGods', 'derivedFacts.hiddenStems'],
  sourceIds: [
    GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    HIDDEN_STEMS_SOURCE.sourceId,
  ],
  status: 'research',
});

const MONTH_OUTPUT_METHODOLOGY: MethodologyDefinition = {
  methodologyId: WEALTH_MONTH_OUTPUT_METHOD_ID,
  version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Month-position output in a resolved chart with no observed wealth',
  description: 'Uses a solitary month hidden stem to describe a value-production context.',
  assumptions: [
    'All three channels are resolved and no Wealth subtype is observed in any channel.',
    'The only month hidden stem maps to the same exact Output subtype as the month branch.',
    'Same-chart hidden-stem peer or resource support distinguishes permissible topics; no strength, pattern establishment, or financial outcome is inferred.',
  ],
  requiredFactTypes: [
    'derivedFacts.dayMaster',
    'derivedFacts.tenGods',
    ...HIDDEN_STEM_SLOTS.map((slot) => 'derivedFacts.hiddenStems.' + slot),
  ],
  sourceIds: [...WEALTH_NATAL_MULTIFACTOR_METHODOLOGY.sourceIds, MONTH_ORDER_SOURCE.sourceId],
  status: 'research',
};

function sourceRefsForChannel(channel: Channel): RuleDefinition['sourceRefs'] {
  return channel === 'hidden_stems'
    ? [
        ...SOURCE_REFS,
        {
          sourceId: HIDDEN_STEMS_SOURCE.sourceId,
          supportType: 'interpretive_basis',
          notes:
            'The hidden-stem observation channel remains separate from visible stems and branch representative Ten-Gods.',
        },
      ]
    : SOURCE_REFS;
}
function claimType(pattern: Pattern, channel: Channel) {
  return `WEALTH_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
const monthOutputInputs: readonly RuleInputRequirement[] = [
  { key: 'dayMaster', pathOrClaimType: 'derivedFacts.dayMaster' },
  { key: 'tenGods', pathOrClaimType: 'derivedFacts.tenGods' },
  ...HIDDEN_STEM_SLOTS.map((slot) => ({
    key: 'hidden' + slot[0]!.toUpperCase() + slot.slice(1),
    pathOrClaimType: 'derivedFacts.hiddenStems.' + slot,
  })),
].map((input) => ({
  ...input,
  source: 'derived_fact',
  acceptedStatuses: ['resolved'],
  required: true,
  ambiguityBehavior: 'scenario_preserving',
}));

function monthOutputConditions(monthOutput: '식신' | '상관'): RuleExpression[] {
  return [
    {
      op: 'eq',
      left: { kind: 'input', key: 'tenGods', path: 'month.branch.value' },
      right: { kind: 'literal', value: monthOutput },
    },
    {
      op: 'not',
      expression: { op: 'exists', value: { kind: 'input', key: 'hiddenMonth', path: '1' } },
    },
    hiddenStemPresenceCondition([monthOutput], ['month']),
    { op: 'not', expression: hiddenStemPresenceCondition(FAMILY_TEN_GODS.wealth) },
    ...HIDDEN_STEM_SLOTS.flatMap((slot): RuleExpression[] =>
      (slot === 'day' ? ['branch'] : ['stem', 'branch']).map((position) => ({
        op: 'not',
        expression: {
          op: 'in',
          value: { kind: 'input', key: 'tenGods', path: `${slot}.${position}.value` },
          set: FAMILY_TEN_GODS.wealth,
        },
      })),
    ),
  ];
}

function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: pattern.monthOutput ? WEALTH_NATAL_MULTIFACTOR_VERSION : EXISTING_WEALTH_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'multifactor_structure' },
    methodologyRef: pattern.monthOutput
      ? { id: WEALTH_MONTH_OUTPUT_METHOD_ID, version: WEALTH_NATAL_MULTIFACTOR_VERSION }
      : { id: METHOD_ID, version: EXISTING_WEALTH_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description:
      pattern.axis === 'context'
        ? 'Indirect source-bounded resource-context structure; cannot determine wealth direction or fulfill a wealth synthesis core.'
        : 'Wealth natal research synthesis of exact channel-bound upstream T5 themes.',
    inputs: [
      ...pattern.families.map((family, i) => ({
        key: `family${i + 1}`,
        source: 'interpretation_claim' as const,
        pathOrClaimType: `TEN_GOD_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`,
        required: true,
        cardinality: 'exactly_one' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      })),
      ...(pattern.monthOutput ? monthOutputInputs : []),
    ],
    condition: {
      op: 'and',
      expressions: [
        ...pattern.families.map((_, i) => ({
          op: 'exists' as const,
          value: { kind: 'input' as const, key: `family${i + 1}` },
        })),
        ...(pattern.monthOutput ? monthOutputConditions(pattern.monthOutput) : []),
      ],
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
        ...(pattern.monthOutput ? { monthOutput: pattern.monthOutput } : {}),
        ...(pattern.axis === 'context' ? { directWealthReadingAuthorized: false } : {}),
        realLifeOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        healthOrMoneyOutcomeAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis:
        pattern.axis === 'core' ? 'major' : pattern.axis === 'context' ? 'minor' : 'moderate',
      tags: ['research', 'wealth-natal', 'source-bound-multifactor', pattern.axis, channel],
    },
    sourceRefs: pattern.monthOutput
      ? [
          ...sourceRefsForChannel(channel),
          { sourceId: MONTH_ORDER_SOURCE.sourceId, supportType: 'interpretive_basis' },
        ]
      : sourceRefsForChannel(channel),
    quality: QUALITY,
    status: 'research',
  };
}
export const WEALTH_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERN_CHANNELS.map(({ pattern, channel }) => rule(pattern, channel)),
);
export const WEALTH_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] = Object.freeze(
  PATTERN_CHANNELS.map(({ pattern, channel }, order) => ({
    profileId: `PROFILE-${claimType(pattern, channel)}`,
    version: pattern.monthOutput ? WEALTH_NATAL_MULTIFACTOR_VERSION : EXISTING_WEALTH_VERSION,
    claimType: claimType(pattern, channel),
    semanticKeys: [
      'pattern',
      'families',
      'channel',
      'axis',
      ...(pattern.monthOutput ? ['monthOutput'] : []),
    ],
    allowedEpistemicTypes: ['interpretation' as const],
    requiredMethodAttribution: true,
    prohibitedPhrases: [
      '반드시 성공',
      '승진한다',
      '돈이 들어온다',
      '성격이 확정된다',
      '운명이 정해져',
    ],
    renderingHints: [`axis:${pattern.axis}`, `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: pattern.headline },
      {
        templateKey: 'summary',
        language: 'ko',
        text:
          (channel === 'visible_stems'
            ? '\uCC9C\uAC04\uC5D0\uC11C \uC2E4\uC81C\uB85C \uAD00\uCE21\uB41C \uC870\uD569\uC785\uB2C8\uB2E4. '
            : channel === 'branches'
              ? '\uC9C0\uC9C0 \uB300\uD45C \uC2ED\uC2E0\uC5D0\uC11C \uAD00\uCE21\uB41C \uBCF4\uC870 \uC870\uD569\uC785\uB2C8\uB2E4. '
              : '\uC9C0\uC7A5\uAC04\uC5D0\uC11C \uBCC4\uB3C4\uB85C \uAD00\uCE21\uB41C \uC870\uD569\uC785\uB2C8\uB2E4. \uCC9C\uAC04 \uBC0F \uC9C0\uC9C0 \uB300\uD45C \uC2ED\uC2E0\uACFC \uC11E\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. ') +
          pattern.summary +
          ' 이 구조만으로 소득, 재산이나 투자 성과를 판단할 수 없습니다.',
      },
    ],
  })),
);
export const WEALTH_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  wholeChartJudgment: 'research',
  packId: 'PACK-WEALTH-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  name: 'Wealth natal multifactor synthesis / internal research',
  methodologyRefs: [
    {
      id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version,
    },
    { id: HIDDEN_STEM_METHOD_ID, version: HIDDEN_STEM_METHOD_VERSION },
    { id: METHOD_ID, version: EXISTING_WEALTH_VERSION },
    { id: WEALTH_MONTH_OUTPUT_METHOD_ID, version: WEALTH_NATAL_MULTIFACTOR_VERSION },
  ],
  enabledRuleSets: [
    ...new Set([
      ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map((x) => x.ruleSetId),
      HIDDEN_STEM_RULE_SET,
      RULE_SET,
    ]),
  ],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-WEALTH-NATAL-MULTIFACTOR-RESEARCH',
    version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  },
  status: 'research',
});
export function createWealthNatalMultifactorRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
        ...WEALTH_NATAL_HIDDEN_STEM_TEN_GOD_RULES,
        ...WEALTH_NATAL_MULTIFACTOR_RULES,
      ],
      methodologies: [
        GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
        WEALTH_NATAL_HIDDEN_STEM_T5_METHODOLOGY,
        WEALTH_NATAL_MULTIFACTOR_METHODOLOGY,
        MONTH_OUTPUT_METHODOLOGY,
      ],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        HIDDEN_STEMS_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        MONTH_ORDER_SOURCE,
      ],
    },
    WEALTH_NATAL_MULTIFACTOR_PACK,
    createdAt,
  );
}
