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
      '돈의 액수보다 그 돈이 열어 주는 선택지를 먼저 보는 구조입니다. 같은 여유자금도 지금 쓸 돈인지, 다음 계획을 위해 남겨 둘 돈인지, 일을 더 쉽게 만드는 비용인지에 따라 평가 기준은 달라집니다. 이 풀이의 핵심은 자원의 많고 적음이 아니라, 목적을 분명히 했을 때 판단이 달라지는 지점에 있습니다.',
  },
  {
    id: 'OUTPUT-CREATE-VALUE',
    subcategory: 'value_creation',
    kind: 'value_creation',
    families: ['output'],
    headline: '직접 만든 결과에 가치가 붙는 구조를 이해하기 쉽습니다',
    summary:
      '생각을 메모로 남기는 일, 실제로 쓸 수 있는 결과물로 만드는 일, 그 결과가 타인에게 필요해지는 일은 서로 다릅니다. 식상의 산출 관점에서는 이 세 단계를 구분할수록 금전적인 판단이 구체화됩니다. 다만 무언가를 잘 만들었다는 사실만으로 수익을 예상하지는 않습니다.',
  },
  {
    id: 'RESOURCE-CAPABILITY-SPEND',
    subcategory: 'spending',
    kind: 'spending',
    families: ['resource'],
    headline: '배움과 도구에 쓰는 돈은 비교적 납득하기 쉬운 편입니다',
    summary:
      '강의나 장비를 더 구할지, 지금 가진 도구로 먼저 시도할지 갈림길에 놓인 상황을 떠올려 보십시오. 준비에 쓰는 돈은 활동 범위를 넓힐 수 있지만, 실제 사용 시점이 없으면 준비와 실행이 분리됩니다. 이 항목은 그 둘을 함께 살펴야 하는 구조를 설명하며 실제 지출 습관을 알아맞히는 해석은 아닙니다.',
  },
  {
    id: 'OFFICER-RULED-MANAGEMENT',
    subcategory: 'management',
    kind: 'management',
    families: ['officer'],
    headline: '돈 관리에도 최소한의 기준과 책임 경계가 있는 편이 안정적입니다',
    summary:
      '매달 반드시 나가는 비용과 그때그때 결정할 비용을 나누면, 새로운 지출이 생겨도 모든 판단을 처음부터 다시 하지 않아도 됩니다. 반대로 규칙을 지나치게 세밀하게 만들면 예외에 대응하기 어려울 수 있습니다. 이 해석에서 중요한 것은 무조건 아끼는 성향이 아니라 지출의 기준과 재량의 경계를 정하는 방식입니다.',
  },
  {
    id: 'PEER-AUTONOMY-SPEND',
    subcategory: 'spending',
    kind: 'spending',
    families: ['peer'],
    headline: '돈을 선택권과 자율성을 확보하는 수단으로 느끼기 쉽습니다',
    summary:
      '똑같은 비용이라도 어떤 선택은 물건을 얻는 데 그치고, 어떤 선택은 자신의 시간이나 결정권을 넓히는 데 쓰입니다. 이 명식에서 보이는 자기 기준의 관점은 돈이 그런 자율성과 어떻게 연결되는지 살펴보게 합니다. 다만 편의를 위한 지출이 언제나 옳거나, 실제로 그런 지출을 많이 한다는 뜻은 아닙니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MAKE-TO-VALUE',
    subcategory: 'value_creation',
    kind: 'value_creation',
    families: ['output', 'wealth'],
    headline: '직접 만든 것을 실제 가치와 연결할 때 돈의 감각이 선명해집니다',
    summary:
      '무엇인가를 완성하는 것과 누군가 그 결과에 가치를 부여하는 것은 별개의 단계입니다. 혼자 보기에는 만족스러운 작업이라도 상대에게 어떤 문제를 해결해 주는지 설명하기 어렵다면 교환의 기준은 불분명할 수 있습니다. 산출과 재성이 함께 보일 때에는 만드는 과정뿐 아니라 쓰임과 교환의 접점까지 살펴봅니다.',
  },
  {
    id: 'WEALTH-OFFICER-RESULT-TO-BUDGET',
    subcategory: 'management',
    kind: 'management',
    families: ['wealth', 'officer'],
    headline: '들어오고 나가는 돈을 역할별로 나누면 관리가 쉬워집니다',
    summary:
      '여유자금 전체를 한 덩어리로 생각하면 필요할 때 서로 다른 목적이 충돌할 수 있습니다. 생활을 유지할 몫, 이미 약속한 지출, 새 기회를 위해 남길 몫을 구분하는 예시가 이 구조를 이해하는 데 도움이 됩니다. 재성과 관성을 함께 읽는 이유는 얼마를 가져야 한다는 뜻이 아니라 자원과 책임의 기준을 따로 두지 않기 위해서입니다.',
  },
  {
    id: 'WEALTH-RESOURCE-LEARN-VS-RETURN',
    subcategory: 'friction',
    kind: 'friction',
    families: ['wealth', 'resource'],
    headline: '더 배우기 위해 쓰는 돈과 지금 결과를 내야 하는 돈 사이에서 흔들릴 수 있습니다',
    summary:
      '무언가를 한 번 더 배울지, 이미 배운 것으로 결과를 만들어 볼지 고민하는 장면을 떠올려 보십시오. 어느 선택이 무조건 좋은 것은 아닙니다. 이 명식에서 관찰된 두 관점은 준비에 쓸 자원과 현재 활용할 자원을 동시에 살펴야 한다는 긴장을 보여 줍니다. 실제 수익 여부를 여기서 결정하지는 않습니다.',
  },
  {
    id: 'PEER-WEALTH-MY-WAY-VS-BUDGET',
    subcategory: 'friction',
    kind: 'friction',
    families: ['peer', 'wealth'],
    headline: '내가 원하는 선택과 현실적인 예산이 부딪힐 때 스트레스가 커질 수 있습니다',
    summary:
      '원하는 방식을 유지하려면 추가 비용이 들고, 예산을 지키려면 일부 선택을 바꿔야 할 때가 있습니다. 이 구조는 자유를 위해 감수할 비용과 현실적으로 조정할 비용을 구분해 생각하게 합니다. 핵심은 욕구를 억누르는 것도 무조건 관철하는 것도 아니라, 자기 기준과 자원 조건이 만나는 지점을 보는 것입니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-VALUE-OPERATING-LOOP',
    subcategory: 'management',
    kind: 'management',
    families: ['output', 'wealth', 'officer'],
    headline: '만들고, 가치가 생기는지 확인하고, 다시 관리하는 흐름이 잘 맞습니다',
    summary:
      '만들기, 실제 쓰임 확인, 다음 비용 배분을 따로따로 결정하면 한 단계의 결과가 다른 단계에 반영되지 않을 수 있습니다. 산출·재성·관성이 한 구조에서 확인될 때는 결과물을 만든 뒤 쓰임을 확인하고, 확인한 내용을 다음 관리 기준에 반영하는 흐름을 함께 읽습니다. 이 구조가 특정 사업의 성공을 보장하는 것은 아닙니다.',
  },
  {
    id: 'PEER-WEALTH-RESOURCE-CHOICE-GROWTH-TRADEOFF',
    subcategory: 'friction',
    kind: 'friction',
    families: ['peer', 'wealth', 'resource'],
    headline: '자유롭게 쓰고 싶은 마음, 성장에 쓰고 싶은 마음, 아껴야 한다는 현실이 동시에 생길 수 있습니다',
    summary:
      '자신의 선택권을 지키는 비용, 배움을 위해 쓰는 비용, 현재 생활을 유지하는 비용은 모두 필요할 수 있지만 같은 돈을 동시에 쓸 수는 없습니다. 비겁·재성·인성의 관점이 함께 보일 때에는 이 셋의 우선순위를 어떻게 구분할지를 질문합니다. 어느 목적이 반드시 우선인지는 이 명식만으로 정하지 않습니다.',
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