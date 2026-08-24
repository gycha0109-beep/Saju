import type { FiveElement, TenGod } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

export const GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const TEN_GOD_METHOD_ID = 'M-TEN-GOD-CONSUMER-THEME-YUANHAI';
const GENERAL_METHOD_ID = 'M-GENERAL-NATAL-USEFUL-SYNTHESIS-YUANHAI';
const TEN_GOD_RULE_SET = 'general-natal-useful-ten-god-family-theme';
const BASELINE_RULE_SET = 'general-natal-useful-day-master-baseline';
const SYNTHESIS_RULE_SET = 'general-natal-useful-domain-synthesis';
const GUARD_RULE_SET = 'general-natal-useful-scope-guard';

export type GeneralNatalThemeFamily = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
export type GeneralNatalThemeChannel = 'visible_stems' | 'branches';

export const GENERAL_NATAL_USEFUL_READING_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
  sourceType: 'classical_text',
  title: '淵海子平',
  language: 'zh-Hant',
  locator: {
    section: '論日為主 / 論性情 / 十神（傷官、食神、財、官、殺、印、劫財）',
  },
  url: 'https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3',
  accessedAt: '2026-08-24',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'public_domain',
    reusePolicy: 'paraphrase_only',
  },
  notes:
    'Research-only transcription source. Consumer wording is narrower than historical deterministic fortune, health, status, spouse, and lifespan statements. Ten-God presence is only a whole-chart-qualified thematic axis.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      supportType: 'interpretive_basis' as const,
      notes:
        'Supports narrow traditional semantic vocabulary only; deterministic fortune, health, marriage, rank, lifespan, and event predictions are excluded.',
    },
  ];
}

export const GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: TEN_GOD_METHOD_ID,
  version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  family: 'ten_gods',
  name: 'Ten-God consumer theme projection from Yuanhai Ziping (research)',
  description:
    'Projects resolved whole-chart Ten-God presence into five neutral consumer theme families while preserving visible-stem versus branch channels.',
  assumptions: [
    'Ten-God presence is a semantic theme, not proof of personality, wealth level, career success, relationship outcome, or future event.',
    'Visible stems and branches remain distinct observation channels and are not collapsed into a numeric dominance score.',
    'No family is globally good or bad; chart context, strength, structure, interactions, and methodology may qualify expression.',
    'Historical spouse, disease, rank, lifespan, disaster, and deterministic wealth statements are outside this candidate.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId],
  status: 'research',
});

export const GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: GENERAL_METHOD_ID,
  version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'General natal minimum useful consumer synthesis (research)',
  description:
    'Produces consumer-readable natal themes from a day-master elemental baseline plus already-emitted Ten-God family theme claims.',
  assumptions: [
    'The day-master element is a traditional baseline and cannot by itself determine the whole personality.',
    'Theme claims describe represented concerns, not whether the user will succeed or fail in those concerns.',
    'Specific occupations, income outcomes, spouse outcomes, and future timing are not authorized.',
    'No numeric theme score, dominance percentage, or pseudo-confidence value is produced.',
  ],
  requiredFactTypes: ['derivedFacts.dayMaster'],
  optionalFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId],
  status: 'research',
});

const TEN_GOD_FAMILIES: Readonly<Record<GeneralNatalThemeFamily, readonly TenGod[]>> = Object.freeze({
  peer: ['비견', '겁재'],
  resource: ['편인', '정인'],
  output: ['식신', '상관'],
  wealth: ['편재', '정재'],
  officer: ['편관', '정관'],
});

const FAMILY_MEANING: Readonly<
  Record<GeneralNatalThemeFamily, { headline: string; summary: string; consumerSection: string }>
> = Object.freeze({
  peer: {
    headline: '자기 기준과 사람 사이의 힘',
    summary:
      '비견·겁재 계열은 나와 같은 편의 힘, 자기 기준, 동료와의 병행 또는 경쟁이라는 주제를 보여주는 축으로 읽습니다.',
    consumerSection: 'relationships_and_agency',
  },
  resource: {
    headline: '배우고 받아들이는 방식',
    summary:
      '인성 계열은 나를 생조하는 힘으로, 배우고 이해하고 지원을 받아들이는 방식과 연결되는 주제로 읽습니다.',
    consumerSection: 'learning_and_support',
  },
  output: {
    headline: '표현하고 만들어 내는 방식',
    summary:
      '식신·상관 계열은 내가 밖으로 내보내는 힘으로, 표현·생산·창작·결과물을 밖으로 꺼내는 방식과 연결되는 주제로 읽습니다.',
    consumerSection: 'expression_and_workstyle',
  },
  wealth: {
    headline: '현실 자원과 결과를 다루는 방식',
    summary:
      '재성 계열은 내가 제어하고 운용하는 현실 자원의 축으로, 돈 자체의 길흉보다 자원·성과·관리 문제와 연결되는 주제로 읽습니다.',
    consumerSection: 'resources_and_results',
  },
  officer: {
    headline: '책임과 요구를 받아들이는 방식',
    summary:
      '관성 계열은 나를 제어하는 힘으로, 규칙·책임·역할·외부 요구와 압박을 다루는 방식과 연결되는 주제로 읽습니다.',
    consumerSection: 'responsibility_and_pressure',
  },
});

const ELEMENT_BASELINES: Readonly<Record<FiveElement, { headline: string; summary: string }>> =
  Object.freeze({
    목: {
      headline: '성장과 관계를 향하는 기본축',
      summary:
        '전통 오행 성정에서 목은 인(仁), 성장·확장·배려의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    },
    화: {
      headline: '표현과 추진을 향하는 기본축',
      summary:
        '전통 오행 성정에서 화는 예(禮), 표현·활동·빠른 반응의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    },
    토: {
      headline: '안정과 신뢰를 향하는 기본축',
      summary:
        '전통 오행 성정에서 토는 신(信), 안정·지속·신뢰의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    },
    금: {
      headline: '판단과 원칙을 향하는 기본축',
      summary:
        '전통 오행 성정에서 금은 의(義), 판단·원칙·결단의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    },
    수: {
      headline: '사고와 적응을 향하는 기본축',
      summary:
        '전통 오행 성정에서 수는 지(智), 사고·기획·적응의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    },
  });

function tenGodSlotExpressions(
  channel: GeneralNatalThemeChannel,
  gods: readonly TenGod[],
): RuleExpression[] {
  const slots =
    channel === 'visible_stems'
      ? ['year.stem.value', 'month.stem.value', 'hour.stem.value']
      : ['year.branch.value', 'month.branch.value', 'day.branch.value', 'hour.branch.value'];
  return slots.map((path) => ({
    op: 'in' as const,
    value: { kind: 'input' as const, key: 'tenGods', path },
    set: gods,
  }));
}

function t5FamilyRule(
  family: GeneralNatalThemeFamily,
  channel: GeneralNatalThemeChannel,
): RuleDefinition {
  const meaning = FAMILY_MEANING[family];
  return {
    ruleId: `RULE-GENERAL-NATAL-T5-${family.toUpperCase()}-${channel.toUpperCase()}`,
    version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
    ruleSetId: TEN_GOD_RULE_SET,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: `${family}_${channel}` },
    methodologyRef: {
      id: TEN_GOD_METHOD_ID,
      version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
    },
    title: `${family} theme observed in ${channel}`,
    description:
      'Records one Ten-God family in a chart channel as a neutral thematic signal without scoring dominance or predicting an outcome.',
    inputs: [
      {
        key: 'tenGods',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.tenGods',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: { op: 'or', expressions: tenGodSlotExpressions(channel, TEN_GOD_FAMILIES[family]) },
    output: {
      claimType: `TEN_GOD_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`,
      subject: 'natal_chart',
      predicate: 'ten_god_theme',
      value: {
        family,
        channel,
        headline: meaning.headline,
        summary: meaning.summary,
        consumerSection: meaning.consumerSection,
        fortunePolarity: 'not_determined',
        dominance: 'not_scored',
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'ten-god-theme', 'consumer-readable', 'non-predictive'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function dayMasterBaselineRule(element: FiveElement): RuleDefinition {
  const baseline = ELEMENT_BASELINES[element];
  return {
    ruleId: `RULE-GENERAL-NATAL-T8-DAY-MASTER-${element}`,
    version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
    ruleSetId: BASELINE_RULE_SET,
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'self_baseline' },
    methodologyRef: {
      id: GENERAL_METHOD_ID,
      version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
    },
    title: `Day-master ${element} general natal baseline`,
    description:
      'Provides a narrow traditional elemental temperament baseline while refusing a single-pillar whole-person conclusion.',
    inputs: [
      {
        key: 'dayMaster',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.dayMaster',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: 'dayMaster', path: 'element' },
      right: { kind: 'literal', value: element },
    },
    output: {
      claimType: 'GENERAL_NATAL_DAY_MASTER_BASELINE',
      subject: 'natal_chart',
      predicate: 'self_baseline',
      value: {
        element,
        headline: baseline.headline,
        summary: baseline.summary,
        consumerSection: 'self_baseline',
        wholePersonConclusionAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'major',
      tags: ['research', 'general-natal', 'baseline', 'scope-limited'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function t8ThemeRule(
  family: GeneralNatalThemeFamily,
  channel: GeneralNatalThemeChannel,
): RuleDefinition {
  const meaning = FAMILY_MEANING[family];
  const upstreamClaimType = `TEN_GOD_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`;
  return {
    ruleId: `RULE-GENERAL-NATAL-T8-${family.toUpperCase()}-${channel.toUpperCase()}`,
    version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
    ruleSetId: SYNTHESIS_RULE_SET,
    taxonomy: { tier: 'T8', category: 'general', subcategory: meaning.consumerSection },
    methodologyRef: {
      id: GENERAL_METHOD_ID,
      version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
    },
    title: `${family} ${channel} consumer theme`,
    description:
      'Carries an emitted T5 Ten-God family theme into the general-natal domain without adding a success/failure verdict.',
    inputs: [
      {
        key: 'theme',
        source: 'interpretation_claim',
        pathOrClaimType: upstreamClaimType,
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'theme' } },
    output: {
      claimType: `GENERAL_NATAL_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`,
      subject: 'natal_chart',
      predicate: 'consumer_theme',
      value: {
        family,
        channel,
        headline: meaning.headline,
        summary: meaning.summary,
        consumerSection: meaning.consumerSection,
        outcomeAuthorized: false,
        futureTimingAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'general-natal', 'consumer-theme', 'non-predictive'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

const SCOPE_GUARD_RULE: RuleDefinition = {
  ruleId: 'RULE-GENERAL-NATAL-USEFUL-READING-SCOPE-GUARD',
  version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  ruleSetId: GUARD_RULE_SET,
  taxonomy: { tier: 'T8', category: 'general', subcategory: 'scope_guard' },
  methodologyRef: {
    id: GENERAL_METHOD_ID,
    version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  },
  title: 'General natal useful reading scope guard',
  description:
    'Prevents neutral natal themes from being promoted into deterministic fortune, spouse, health, career-success, wealth-level, or future-timing conclusions.',
  inputs: [
    {
      key: 'dayMaster',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
  ],
  condition: { op: 'exists', value: { kind: 'input', key: 'dayMaster' } },
  output: {
    claimType: 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD',
    subject: 'natal_chart',
    predicate: 'scope_guard',
    value: {
      personalityFactAuthorized: false,
      fortunePolarityAuthorized: false,
      careerSuccessAuthorized: false,
      wealthLevelAuthorized: false,
      spouseOutcomeAuthorized: false,
      healthOutcomeAuthorized: false,
      futureTimingAuthorized: false,
      numericScoringAuthorized: false,
    },
    polarity: 'neutral',
    emphasis: 'major',
    tags: ['research', 'scope-guard', 'general-natal'],
  },
  sourceRefs: sourceRefs(),
  quality: QUALITY,
  status: 'research',
};

const FAMILIES = Object.keys(TEN_GOD_FAMILIES) as GeneralNatalThemeFamily[];
const CHANNELS: readonly GeneralNatalThemeChannel[] = ['visible_stems', 'branches'];

export const GENERAL_NATAL_USEFUL_TEN_GOD_RULES: readonly RuleDefinition[] = Object.freeze(
  FAMILIES.flatMap((family) => CHANNELS.map((channel) => t5FamilyRule(family, channel))),
);

export const GENERAL_NATAL_USEFUL_T8_RULES: readonly RuleDefinition[] = Object.freeze([
  ...(Object.keys(ELEMENT_BASELINES) as FiveElement[]).map(dayMasterBaselineRule),
  ...FAMILIES.flatMap((family) => CHANNELS.map((channel) => t8ThemeRule(family, channel))),
  SCOPE_GUARD_RULE,
]);

export const GENERAL_NATAL_USEFUL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-USEFUL-READING-CANDIDATE',
  version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  name: 'General Natal Minimum Useful Reading Research Candidate',
  methodologyRefs: [
    { id: TEN_GOD_METHOD_ID, version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION },
    { id: GENERAL_METHOD_ID, version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: [TEN_GOD_RULE_SET, BASELINE_RULE_SET, SYNTHESIS_RULE_SET, GUARD_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-USEFUL-READING-RESEARCH',
    version: GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createGeneralNatalUsefulReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...GENERAL_NATAL_USEFUL_T8_RULES],
      methodologies: [
        GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
        GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
      ],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE],
    },
    GENERAL_NATAL_USEFUL_READING_PACK,
    createdAt,
  );
}
