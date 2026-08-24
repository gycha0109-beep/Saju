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
import {
  WEALTH_NATAL_READING_METHODOLOGY,
  WEALTH_NATAL_READING_RULES,
} from './wealth-natal-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const BUSINESS_NATAL_READING_CANDIDATE_VERSION = '0.6.0-research' as const;

const METHOD_ID = 'M-BUSINESS-NATAL-READING-TEN-GOD-SYNTHESIS-V1';
const BUSINESS_RULE_SET = 'business-natal-consumer-reading';

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export type BusinessConclusionKind =
  | 'uncertainty'
  | 'decision_execution'
  | 'allocation'
  | 'partnership'
  | 'accountability'
  | 'pressure'
  | 'friction';

interface BusinessConclusionSpec {
  id: string;
  kind: BusinessConclusionKind;
  families: readonly ConclusionFamily[];
  headline: string;
  summary: string;
}

export const BUSINESS_NATAL_READING_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'Natal business operating-style reading from bounded Ten-God family synthesis (research)',
  description:
    'Applies already-materialized whole-chart Ten-God family themes to bounded business-operating questions such as uncertainty, decision and execution cadence, resource allocation, partner role boundaries, accountability, and performance pressure without predicting business success, revenue, founder suitability, or future timing.',
  assumptions: [
    'Business claims describe operating tendencies and conditions the native may handle more comfortably; they do not classify the person as suited or unsuited for entrepreneurship.',
    'A represented Ten-God family is not a startup score, founder score, success probability, revenue forecast, investment recommendation, or proof of future business outcomes.',
    'Specific industries, products, company size, revenue, profit, funding, exit, bankruptcy, market events, and future business timing are outside this candidate.',
    'Career claims must not be renamed or reused as business claims; every business conclusion must address a distinct operating concern such as uncertainty, allocation, partnership, governance, or market-feedback pressure.',
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
      notes: 'Supports bounded Ten-God semantic vocabulary reused for business operating-style themes.',
    },
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports bounded generation/control relations among Ten-God families used for business synthesis.',
    },
  ];
}

const BUSINESS_CONCLUSIONS: readonly BusinessConclusionSpec[] = [
  {
    id: 'PEER-DECISION-OWNERSHIP',
    kind: 'decision_execution',
    families: ['peer'],
    headline: '중요한 판단에서 내가 결정할 수 있는 영역이 있을 때 움직이기 편한 편입니다',
    summary:
      '사업처럼 답이 정해져 있지 않은 상황에서는 모든 결정을 남에게 맡기기보다 내가 납득한 기준으로 선택할 수 있을 때 실행력이 살아날 수 있습니다. 반대로 책임은 지는데 결정권은 거의 없는 구조에서는 답답함이 커질 수 있습니다.',
  },
  {
    id: 'RESOURCE-UNCERTAINTY-BEFORE-COMMIT',
    kind: 'uncertainty',
    families: ['resource'],
    headline: '큰 결정을 하기 전에 정보를 모아 불확실성을 줄이는 과정이 중요한 편입니다',
    summary:
      '무작정 뛰어들기보다 상황과 조건을 이해하고 필요한 정보를 확인한 뒤 움직일 때 심리적으로 안정되기 쉽습니다. 다만 완전히 확실해질 때까지 기다리려 하면 결정 시점을 놓칠 수 있어 무엇까지 확인하면 실행할지 기준을 정해두는 편이 도움이 됩니다.',
  },
  {
    id: 'OUTPUT-TEST-BY-DOING',
    kind: 'decision_execution',
    families: ['output'],
    headline: '계속 검토만 하기보다 작게 실행해 반응을 확인할 때 판단이 빨라질 수 있습니다',
    summary:
      '아이디어를 머릿속에서 오래 굴리는 것보다 작은 형태로 먼저 실행해 결과와 반응을 확인하는 방식이 더 잘 맞을 수 있습니다. 직접 해본 결과가 다음 판단의 근거가 되기 때문에 실행과 수정의 반복이 중요해질 수 있습니다.',
  },
  {
    id: 'WEALTH-RESOURCE-ALLOCATION',
    kind: 'allocation',
    families: ['wealth'],
    headline: '시간과 돈을 어디에 써야 실제 결과가 커지는지 따져보는 감각이 중요한 편입니다',
    summary:
      '여러 선택지가 있을수록 제한된 자원을 어디에 먼저 넣을지가 중요해집니다. 비용이나 노력의 크기만 보기보다 지금 무엇에 투입해야 실제 반응이나 성과를 확인할 수 있는지를 기준으로 우선순위를 잡는 방식이 잘 맞을 수 있습니다.',
  },
  {
    id: 'OFFICER-ACCOUNTABILITY-BOUNDARY',
    kind: 'accountability',
    families: ['officer'],
    headline: '역할과 책임 기준이 분명해야 사업이 안정적으로 굴러간다고 느끼기 쉬운 편입니다',
    summary:
      '누가 무엇을 결정하고 어디까지 책임지는지 애매한 상태가 길어지면 피로가 커질 수 있습니다. 함께 일하는 사람이 있다면 결정 기준, 기한, 책임 범위처럼 최소한의 운영 규칙을 분명히 해두는 편이 지속적으로 관리하기 쉽습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MARKET-FEEDBACK',
    kind: 'pressure',
    families: ['output', 'wealth'],
    headline: '만든 것을 실제 반응과 연결해 빠르게 고치는 흐름에서 사업 감각을 확인하기 쉽습니다',
    summary:
      '무엇을 만들었는지 자체보다 외부 반응, 실제 이용 여부, 선택 결과처럼 확인 가능한 피드백이 들어올 때 다음 행동을 정하기 쉬울 수 있습니다. 반응이 없는데도 계속 만드는 것보다 작은 결과를 확인하면서 방향을 바꾸는 운영이 더 자연스러울 수 있습니다.',
  },
  {
    id: 'RESOURCE-OUTPUT-ANALYZE-THEN-EXPERIMENT',
    kind: 'uncertainty',
    families: ['resource', 'output'],
    headline: '조사와 실행을 따로 두기보다 확인한 내용을 바로 작은 실험으로 연결하는 편이 좋습니다',
    summary:
      '정보를 충분히 이해하고 싶어 하는 마음과 직접 시험해보고 싶은 마음이 함께 있을 수 있습니다. 조사만 길어지거나 반대로 근거 없이 실행만 반복하면 효율이 떨어질 수 있어, 하나를 확인하면 하나를 시험하는 식으로 검토와 실험을 짝지으면 판단 속도를 유지하기 쉽습니다.',
  },
  {
    id: 'PEER-OFFICER-PARTNER-DECISION-RIGHTS',
    kind: 'partnership',
    families: ['peer', 'officer'],
    headline: '파트너와 함께할 때는 친분보다 결정권과 책임 범위를 먼저 나누는 편이 안전합니다',
    summary:
      '각자 자기 방식대로 움직이고 싶은 성향과 역할 기준을 분명히 하고 싶은 성향이 함께 나타날 수 있습니다. 함께 사업을 한다면 누가 어떤 결정을 단독으로 할 수 있는지, 합의가 필요한 영역은 무엇인지 미리 정해두면 힘겨루기와 책임 떠넘기기를 줄이는 데 도움이 됩니다.',
  },
  {
    id: 'WEALTH-OFFICER-BUDGET-ACCOUNTABILITY',
    kind: 'allocation',
    families: ['wealth', 'officer'],
    headline: '예산과 책임을 함께 묶어 관리할 때 자원 낭비를 줄이기 쉬운 편입니다',
    summary:
      '돈을 쓰는 결정과 그 결과를 확인하는 책임이 떨어져 있으면 운영이 답답하게 느껴질 수 있습니다. 항목별로 얼마를 왜 쓰는지와 누가 결과를 확인할지를 연결해두면 비용을 줄이는 것보다 더 명확한 기준으로 자원을 배분하기 쉽습니다.',
  },
  {
    id: 'PEER-WEALTH-CONVICTION-VS-ECONOMICS',
    kind: 'friction',
    families: ['peer', 'wealth'],
    headline: '내가 밀고 싶은 방향과 실제 반응에서 확인되는 선택이 다를 때 갈등이 커질 수 있습니다',
    summary:
      '내 판단에 확신이 생기면 그대로 밀고 가고 싶지만 사업에서는 비용, 수요, 효율 때문에 방향을 조정해야 할 때가 있습니다. 무엇은 끝까지 지킬 원칙이고 무엇은 반응에 따라 바꿀 가설인지 구분해두면 고집과 성급한 포기 사이에서 균형을 잡기 쉽습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-OPERATING-LOOP',
    kind: 'pressure',
    families: ['output', 'wealth', 'officer'],
    headline: '만들기, 결과 확인, 운영 기준 정리를 한 흐름으로 연결할 때 사업을 다루기 편할 수 있습니다',
    summary:
      '아이디어를 실행하고 실제 반응을 확인한 뒤 그 결과를 다음 운영 기준으로 만드는 과정이 이어질 때 강점이 살아날 수 있습니다. 다만 결과 압박이 커질수록 당장 만드는 일에만 몰리거나 관리 기준만 늘어날 수 있어 실행과 점검을 같은 주기로 묶어두는 편이 좋습니다.',
  },
];

function businessConclusionRule(spec: BusinessConclusionSpec): RuleDefinition {
  const inputs = spec.families.map((family) => ({
    key: family,
    source: 'interpretation_claim' as const,
    pathOrClaimType: `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`,
    required: true,
    ambiguityBehavior: 'scenario_preserving' as const,
  }));

  return {
    ruleId: `RULE-BUSINESS-NATAL-${spec.id}`,
    version: BUSINESS_NATAL_READING_CANDIDATE_VERSION,
    ruleSetId: BUSINESS_RULE_SET,
    taxonomy: { tier: 'T8', category: 'business' },
    methodologyRef: { id: METHOD_ID, version: BUSINESS_NATAL_READING_CANDIDATE_VERSION },
    title: spec.headline,
    description:
      'Synthesizes already-materialized whole-chart Ten-God family claims into a bounded business operating-style conclusion.',
    inputs,
    condition: {
      op: 'and',
      expressions: spec.families.map((family) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: family },
      })),
    },
    output: {
      claimType: `BUSINESS_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
      subject: 'natal_chart',
      predicate: 'business_conclusion',
      value: {
        businessKind: spec.kind,
        headline: spec.headline,
        summary: spec.summary,
        families: spec.families,
        entrepreneurSuitabilityAuthorized: false,
        specificIndustryAuthorized: false,
        businessSuccessAuthorized: false,
        revenueOutcomeAuthorized: false,
        fundingOutcomeAuthorized: false,
        failureOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        financialAdviceAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: spec.families.length >= 2 ? 'moderate' : 'minor',
      tags: ['research', 'business', 'natal', 'consumer-conclusion', spec.kind],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const BUSINESS_NATAL_READING_RULES: readonly RuleDefinition[] = Object.freeze(
  BUSINESS_CONCLUSIONS.map(businessConclusionRule),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
  ...RELATIONSHIP_NATAL_READING_RULES,
  ...BUSINESS_NATAL_READING_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const BUSINESS_NATAL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-BUSINESS-NATAL-CONSUMER-READING-CANDIDATE',
  version: BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  name: 'Natal Business Consumer Reading Research Candidate',
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
    {
      id: WEALTH_NATAL_READING_METHODOLOGY.methodologyId,
      version: WEALTH_NATAL_READING_METHODOLOGY.version,
    },
    {
      id: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
      version: RELATIONSHIP_NATAL_READING_METHODOLOGY.version,
    },
    { id: METHOD_ID, version: BUSINESS_NATAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-BUSINESS-NATAL-READING-RESEARCH',
    version: BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createBusinessNatalReadingCandidateRegistry(
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
        RELATIONSHIP_NATAL_READING_METHODOLOGY,
        BUSINESS_NATAL_READING_METHODOLOGY,
      ],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
    },
    BUSINESS_NATAL_READING_PACK,
    createdAt,
  );
}