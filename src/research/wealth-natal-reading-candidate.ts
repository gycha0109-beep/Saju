import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  GENERAL_NATAL_USEFUL_T8_RULES,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_RULES,
  GENERAL_NATAL_CONCLUSION_SOURCE,
  type ConclusionFamily,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';

export const WEALTH_NATAL_READING_CANDIDATE_VERSION = '0.4.0-research' as const;

const METHOD_ID = 'M-WEALTH-NATAL-READING-TEN-GOD-SYNTHESIS-V1';
const WEALTH_RULE_SET = 'wealth-natal-consumer-reading';

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export type WealthConclusionKind = 'value_creation' | 'spending' | 'management' | 'friction';

interface WealthConclusionSpec {
  id: string;
  subcategory: string;
  kind: WealthConclusionKind;
  families: readonly ConclusionFamily[];
  headline: string;
  summary: string;
}

export const WEALTH_NATAL_READING_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: WEALTH_NATAL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'Natal wealth reading from bounded Ten-God family synthesis (research)',
  description:
    'Applies already-materialized whole-chart Ten-God family themes to bounded money-reading questions such as value creation, spending criteria, resource management, and recurring financial friction without predicting wealth magnitude, investment returns, windfalls, or future money timing.',
  assumptions: [
    'Wealth claims describe money-related decision style and resource habits, not actual financial status or future outcomes.',
    'A represented Ten-God family is not a score, rank, guarantee of earning power, or proof of wealth.',
    'Net worth, salary amount, investment return, windfall, debt outcome, lottery luck, and future money timing are outside this candidate.',
    'No output from this candidate constitutes investment, tax, credit, or other financial advice.',
    'Family combinations are interpreted only as bounded coexistence or generation/control themes already supported by the underlying research candidates.',
    'The candidate remains research-only until domain review and production authorization are completed.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
});

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports bounded Ten-God semantic vocabulary used for money and resource themes.',
    },
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports bounded generation/control relations among Ten-God families used for wealth synthesis.',
    },
  ];
}

const WEALTH_CONCLUSIONS: readonly WealthConclusionSpec[] = [
  {
    id: 'WEALTH-RESULT-AS-RESOURCE',
    subcategory: 'management',
    kind: 'management',
    families: ['wealth'],
    headline: '돈을 숫자보다 실제 선택지를 만드는 자원으로 보는 편입니다',
    summary:
      '돈이 얼마나 쌓였는지만 보는 것보다 그 돈으로 무엇을 할 수 있는지, 어떤 결과를 만들 수 있는지를 함께 생각하는 편에 가깝습니다. 목적이 분명한 돈은 관리하기 쉽지만 용도가 명확하지 않은 돈은 기준이 흐려질 수 있습니다.',
  },
  {
    id: 'OUTPUT-CREATE-VALUE',
    subcategory: 'value_creation',
    kind: 'value_creation',
    families: ['output'],
    headline: '직접 만든 결과에 가치가 붙는 구조를 이해하기 쉽습니다',
    summary:
      '아이디어나 기술을 실제 결과물로 바꾸는 과정이 돈의 흐름을 이해하는 출발점이 될 수 있습니다. 무엇을 만들었고 누가 왜 필요로 하는지가 보일 때 금전적인 판단도 더 구체적으로 하기 쉬운 편입니다.',
  },
  {
    id: 'RESOURCE-CAPABILITY-SPEND',
    subcategory: 'spending',
    kind: 'spending',
    families: ['resource'],
    headline: '배움과 도구에 쓰는 돈은 비교적 납득하기 쉬운 편입니다',
    summary:
      '지식, 교육, 장비, 자료처럼 앞으로의 판단이나 작업 능력을 넓혀주는 지출에는 의미를 느끼기 쉽습니다. 다만 배우는 행위 자체가 목적이 되면 실제로 써보지 못한 채 비용만 늘어날 수 있어 사용 시점을 함께 정하는 편이 좋습니다.',
  },
  {
    id: 'OFFICER-RULED-MANAGEMENT',
    subcategory: 'management',
    kind: 'management',
    families: ['officer'],
    headline: '돈 관리에도 최소한의 기준과 책임 경계가 있는 편이 안정적입니다',
    summary:
      '매번 기분에 따라 판단하기보다 고정비, 한도, 우선순위처럼 미리 정한 기준이 있으면 돈을 다루기 훨씬 편할 수 있습니다. 기준이 너무 촘촘할 필요는 없지만 어디까지 써도 되는지는 분명한 구조가 잘 맞습니다.',
  },
  {
    id: 'PEER-AUTONOMY-SPEND',
    subcategory: 'spending',
    kind: 'spending',
    families: ['peer'],
    headline: '돈을 선택권과 자율성을 확보하는 수단으로 느끼기 쉽습니다',
    summary:
      '남이 정한 방식에 맞추기보다 내가 원하는 선택을 할 수 있게 해주는 돈의 역할을 중요하게 볼 수 있습니다. 그래서 편의, 독립성, 시간을 아끼는 데 쓰는 돈은 단순 소비보다 선택권을 사는 비용처럼 느껴질 수 있습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MAKE-TO-VALUE',
    subcategory: 'value_creation',
    kind: 'value_creation',
    families: ['output', 'wealth'],
    headline: '직접 만든 것을 실제 가치와 연결할 때 돈의 감각이 선명해집니다',
    summary:
      '만든 결과가 사람에게 어떤 도움을 주고 어떤 대가를 받을 수 있는지까지 이어서 볼 때 금전적인 판단이 구체화될 수 있습니다. 결과물과 가치 교환이 가까이 있는 구조에서 돈의 흐름을 이해하기 쉬운 편입니다.',
  },
  {
    id: 'WEALTH-OFFICER-RESULT-TO-BUDGET',
    subcategory: 'management',
    kind: 'management',
    families: ['wealth', 'officer'],
    headline: '들어오고 나가는 돈을 역할별로 나누면 관리가 쉬워집니다',
    summary:
      '돈이 생겼을 때 전부 한 덩어리로 보기보다 생활비, 운영비, 여유자금처럼 역할을 나누는 방식이 잘 맞을 수 있습니다. 현실적인 결과를 확인하면서도 지켜야 할 기준을 함께 두면 판단이 안정되는 편입니다.',
  },
  {
    id: 'WEALTH-RESOURCE-LEARN-VS-RETURN',
    subcategory: 'friction',
    kind: 'friction',
    families: ['wealth', 'resource'],
    headline: '더 배우기 위해 쓰는 돈과 지금 결과를 내야 하는 돈 사이에서 흔들릴 수 있습니다',
    summary:
      '조금 더 공부하거나 더 좋은 도구를 갖추면 결과가 좋아질 것 같다는 생각과, 지금 가진 것으로 먼저 결과를 내야 한다는 현실이 충돌하기 쉽습니다. 지출 전에 “이걸 언제 실제로 쓸 것인가”를 정하면 과잉 준비를 줄이는 데 도움이 됩니다.',
  },
  {
    id: 'PEER-WEALTH-MY-WAY-VS-BUDGET',
    subcategory: 'friction',
    kind: 'friction',
    families: ['peer', 'wealth'],
    headline: '내가 원하는 선택과 현실적인 예산이 부딪힐 때 스트레스가 커질 수 있습니다',
    summary:
      '원하는 방식이 분명할수록 비용이나 효율 때문에 선택을 바꿔야 할 때 답답함을 느끼기 쉽습니다. 모든 선택을 아끼는 방향으로 만들기보다 반드시 지킬 취향과 타협 가능한 비용을 미리 나누는 편이 현실적입니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-VALUE-OPERATING-LOOP',
    subcategory: 'management',
    kind: 'management',
    families: ['output', 'wealth', 'officer'],
    headline: '만들고, 가치가 생기는지 확인하고, 다시 관리하는 흐름이 잘 맞습니다',
    summary:
      '돈을 따로 떼어 생각하기보다 무엇을 만들었는지, 실제 가치가 생겼는지, 다음에 얼마를 다시 쓸지까지 한 흐름으로 보는 편이 이해하기 쉽습니다. 작은 프로젝트나 일에서도 결과와 비용을 함께 확인하면 판단 기준이 빠르게 선명해질 수 있습니다.',
  },
  {
    id: 'PEER-WEALTH-RESOURCE-CHOICE-GROWTH-TRADEOFF',
    subcategory: 'friction',
    kind: 'friction',
    families: ['peer', 'wealth', 'resource'],
    headline: '자유롭게 쓰고 싶은 마음, 성장에 쓰고 싶은 마음, 아껴야 한다는 현실이 동시에 생길 수 있습니다',
    summary:
      '내 선택권을 위해 쓰는 돈과 배우기 위해 쓰는 돈이 모두 중요하게 느껴지면 우선순위가 자주 흔들릴 수 있습니다. 한 번의 결제로 여러 목적을 만족시키려 하기보다 선택권·성장·유지비를 따로 구분해 보는 편이 판단을 단순하게 만듭니다.',
  },
];

function wealthConclusionRule(spec: WealthConclusionSpec): RuleDefinition {
  const inputs = spec.families.map((family) => ({
    key: family,
    source: 'interpretation_claim' as const,
    pathOrClaimType: `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`,
    required: true,
    ambiguityBehavior: 'scenario_preserving' as const,
  }));

  return {
    ruleId: `RULE-WEALTH-NATAL-${spec.id}`,
    version: WEALTH_NATAL_READING_CANDIDATE_VERSION,
    ruleSetId: WEALTH_RULE_SET,
    taxonomy: { tier: 'T8', category: 'wealth', subcategory: spec.subcategory },
    methodologyRef: { id: METHOD_ID, version: WEALTH_NATAL_READING_CANDIDATE_VERSION },
    title: spec.headline,
    description:
      'Synthesizes already-materialized whole-chart Ten-God family claims into a bounded natal wealth-reading conclusion.',
    inputs,
    condition: {
      op: 'and',
      expressions: spec.families.map((family) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: family },
      })),
    },
    output: {
      claimType: `WEALTH_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
      subject: 'natal_chart',
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: spec.kind,
        headline: spec.headline,
        summary: spec.summary,
        families: spec.families,
        netWorthAuthorized: false,
        investmentReturnAuthorized: false,
        windfallAuthorized: false,
        financialAdviceAuthorized: false,
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: spec.families.length >= 2 ? 'moderate' : 'minor',
      tags: ['research', 'wealth', 'natal', 'consumer-conclusion', spec.kind],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const WEALTH_NATAL_READING_RULES: readonly RuleDefinition[] = Object.freeze(
  WEALTH_CONCLUSIONS.map(wealthConclusionRule),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const WEALTH_NATAL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-WEALTH-NATAL-CONSUMER-READING-CANDIDATE',
  version: WEALTH_NATAL_READING_CANDIDATE_VERSION,
  name: 'Natal Wealth Consumer Reading Research Candidate',
  methodologyRefs: [
    {
      id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version,
    },
    {
      id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
    },
    {
      id: GENERAL_NATAL_CONCLUSION_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_CONCLUSION_METHODOLOGY.version,
    },
    {
      id: CAREER_NATAL_READING_METHODOLOGY.methodologyId,
      version: CAREER_NATAL_READING_METHODOLOGY.version,
    },
    { id: METHOD_ID, version: WEALTH_NATAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-WEALTH-NATAL-READING-RESEARCH',
    version: WEALTH_NATAL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createWealthNatalReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...ALL_RULES],
      methodologies: [
        GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
        GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
        GENERAL_NATAL_CONCLUSION_METHODOLOGY,
        CAREER_NATAL_READING_METHODOLOGY,
        WEALTH_NATAL_READING_METHODOLOGY,
      ],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
    },
    WEALTH_NATAL_READING_PACK,
    createdAt,
  );
}
