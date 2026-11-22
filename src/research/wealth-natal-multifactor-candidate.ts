import { getTenGod } from 'manseryeok';
import type { HeavenlyStem, TenGod } from '../contracts/calculation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
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
export const WEALTH_NATAL_MULTIFACTOR_VERSION = '0.2.0-research' as const;
const METHOD_ID = 'M-WEALTH-NATAL-MULTIFACTOR-RESOURCE-CHOICE-V1';
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
}
const PATTERNS: readonly Pattern[] = Object.freeze([
  {
    id: 'WEALTH_OFFICER_RESOURCE',
    families: ['wealth', 'officer', 'resource'],
    axis: 'core',
    headline: '자원의 관리 기준과 준비가 이어지는 구조',
    summary:
      '재성(현실 자원)·관성(기준과 책임)·인성(준비와 수용)이 하나의 실제 관측 채널에 함께 있습니다. 재성에서 관성, 관성에서 인성으로 이어지는 고전의 생조 관계를 토대로 자원을 다루는 기준과 필요한 준비를 함께 살피는 제한된 구조 해석입니다. 개인의 실제 재산·경제적 결과·투자 능력과 미래 재물운을 예측하는 결론은 아닙니다.',
  },
  {
    id: 'OUTPUT_WEALTH_OFFICER',
    families: ['output', 'wealth', 'officer'],
    axis: 'core',
    headline: '만들어 낸 가치와 자원, 관리 기준이 이어지는 구조',
    summary:
      '식상(산출·표현), 재성(자원·교환), 관성(규범·책임)이 하나의 관측 채널에서 연결됩니다. 재물 영역에서는 무엇을 가치로 만들고, 어떤 자원으로 옮기며, 어떤 관리 원칙에 둘 것인지 세 질문을 함께 살피는 전통적 구조 해석입니다. 개인의 수입·성과를 예상하는 뜻은 아닙니다.',
  },
  {
    id: 'OUTPUT_WEALTH',
    families: ['output', 'wealth'],
    axis: 'creation',
    headline: '만든 결과와 자원의 교환을 함께 보는 구조',
    summary:
      '식상이 가리키는 생산·표현과 재성이 가리키는 현실 자원이 함께 놓입니다. 재물 해석에서는 산출한 것을 어떤 가치·자원으로 연결해 볼지에 주목하는 한정된 축이며, 소득 창출 능력이나 수익을 보증하지 않습니다.',
  },
  {
    id: 'WEALTH_OFFICER',
    families: ['wealth', 'officer'],
    axis: 'management',
    headline: '자원 활용과 관리 책임을 연결하는 구조',
    summary:
      '재성의 자원 관점과 관성의 기준·책임 관점이 만납니다. 자원을 어떻게 다룰지와 그 운용에 어떤 규칙을 둘지를 분리하지 않고 읽는 근거입니다. 실제 저축 성향이나 재정 상태를 안다는 뜻은 아닙니다.',
  },
  {
    id: 'WEALTH_RESOURCE',
    families: ['wealth', 'resource'],
    axis: 'planning',
    headline: '지금 가진 자원과 준비·학습 사이를 조율하는 구조',
    summary:
      '재성(현실 자원)과 인성(준비·수용)이 함께 관측됩니다. 전통적인 견제 관계를 바탕으로 현재 활용할 자원과 준비에 배분할 자원을 함께 고려하는 구조로 읽습니다. 구체적인 지출 습관이나 투자 행동을 추정하지 않습니다.',
  },
  {
    id: 'PEER_WEALTH',
    families: ['peer', 'wealth'],
    axis: 'tension',
    headline: '자기 결정과 자원 배분이 마주하는 구조',
    summary:
      '비겁의 주도·공유 관점과 재성의 현실 자원 관점이 한 채널에 있습니다. 자기 기준과 자원을 어떻게 함께 배치할지를 해석의 질문으로 삼되, 소비 성향·채무·수입을 단정하지 않습니다.',
  },
  {
    id: 'PEER_WEALTH_RESOURCE',
    families: ['peer', 'wealth', 'resource'],
    axis: 'tension',
    headline: '주도권, 현실 자원, 준비의 세 기준이 교차하는 구조',
    summary:
      '비겁의 자기 결정, 재성의 자원, 인성의 준비라는 세 축이 함께 관측됩니다. 서로 다른 목적 사이의 배분이라는 제한된 전통적 구조를 보여 줄 뿐, 실제 선택 충돌이나 자산 규모를 추론하지 않습니다.',
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
]);
const CHANNELS: readonly Channel[] = ['visible_stems', 'branches', 'hidden_stems'];
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

function hiddenStemPresenceCondition(family: Family): RuleExpression {
  const byDayMaster: RuleExpression[] = DAY_STEMS.map((dayStem) => {
    const allowedHiddenStems = DAY_STEMS.filter((hiddenStem) =>
      FAMILY_TEN_GODS[family].includes(getTenGod(dayStem, hiddenStem)),
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
          expressions: HIDDEN_STEM_SLOTS.flatMap((slot) =>
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
    version: WEALTH_NATAL_MULTIFACTOR_VERSION,
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
    condition: hiddenStemPresenceCondition(family),
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
  version: WEALTH_NATAL_MULTIFACTOR_VERSION,
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
function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: WEALTH_NATAL_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'multifactor_structure' },
    methodologyRef: { id: METHOD_ID, version: WEALTH_NATAL_MULTIFACTOR_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description:
      pattern.axis === 'context'
        ? 'Indirect source-bounded resource-context structure; cannot determine wealth direction or fulfill a wealth synthesis core.'
        : 'Wealth natal research synthesis of exact channel-bound upstream T5 themes.',
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
    sourceRefs: sourceRefsForChannel(channel),
    quality: QUALITY,
    status: 'research',
  };
}
export const WEALTH_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap((pattern) => CHANNELS.map((channel) => rule(pattern, channel))),
);
export const WEALTH_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] = Object.freeze(
  PATTERNS.flatMap((pattern, order) =>
    CHANNELS.map((channel) => ({
      profileId: `PROFILE-${claimType(pattern, channel)}`,
      version: WEALTH_NATAL_MULTIFACTOR_VERSION,
      claimType: claimType(pattern, channel),
      semanticKeys: ['pattern', 'families', 'channel', 'axis'],
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
            pattern.summary,
        },
      ],
    })),
  ),
);
export const WEALTH_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-WEALTH-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: WEALTH_NATAL_MULTIFACTOR_VERSION,
  name: 'Wealth natal multifactor synthesis / internal research',
  methodologyRefs: [
    {
      id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version,
    },
    { id: HIDDEN_STEM_METHOD_ID, version: HIDDEN_STEM_METHOD_VERSION },
    { id: METHOD_ID, version: WEALTH_NATAL_MULTIFACTOR_VERSION },
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
      ],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        HIDDEN_STEMS_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
      ],
    },
    WEALTH_NATAL_MULTIFACTOR_PACK,
    createdAt,
  );
}
