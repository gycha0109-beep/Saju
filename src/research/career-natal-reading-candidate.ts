import type { TenGod } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
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
} from './general-natal-conclusion-synthesis-candidate.js';

export const CAREER_NATAL_READING_CANDIDATE_VERSION = '0.4.0-research' as const;

const METHOD_ID = 'M-CAREER-NATAL-READING-EXACT-TEN-GOD-CHANNEL-V2';
const CAREER_RULE_SET = 'career-natal-exact-ten-god-channel-reading';

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export type CareerConclusionKind = 'driver' | 'fit' | 'environment' | 'friction';
export type CareerTenGodChannel = 'visible_stems' | 'branches';

interface CareerTenGodSpec {
  id: string;
  kind: CareerConclusionKind;
  headline: string;
  visibleSummary: string;
  branchSummary: string;
}

export const CAREER_NATAL_READING_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: CAREER_NATAL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'Natal career reading from exact Ten-God subtype and channel (research)',
  description:
    'Projects resolved Ten-God subtypes into bounded career-reading themes while preserving the exact Ten-God identity and visible-stem versus branch channel. It intentionally avoids collapsing all ten subtypes into five broad families before consumer synthesis.',
  assumptions: [
    'Career claims describe bounded work-style tendencies and decision criteria, not deterministic occupation assignment.',
    '비견 and 겁재, 식신 and 상관, 편재 and 정재, 편관 and 정관, 편인 and 정인 remain distinct observations and are not collapsed into a single family sentence.',
    'Visible stems and branches remain separate observation channels; neither channel is converted into a numeric dominance or strength score.',
    'A Ten-God subtype or channel is not a rank, aptitude score, proof of career success, or prediction of employment, salary, promotion, or future timing.',
    'Named occupations, hiring outcomes, salary, promotion, business success, luck polarity, and future timing are outside this candidate.',
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
      notes:
        'Supports narrow Ten-God subtype semantics while excluding historical deterministic career, rank, wealth, spouse, health, and lifespan claims.',
    },
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'corroboration',
      notes:
        'Provides bounded synthesis context; exact subtype and channel identity remain primary evidence for this career candidate.',
    },
  ];
}

const TEN_GOD_SPECS: Readonly<Record<TenGod, CareerTenGodSpec>> = Object.freeze({
  비견: {
    id: 'BI_GYEON',
    kind: 'environment',
    headline: '내 판단 기준을 지키면서 일할 여지가 중요합니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 자기 기준과 판단을 직접 세우는 힘이 나타납니다. 맡은 범위 안에서 방법을 선택하거나 스스로 결정을 내려야 할 때 편할 수 있고, 세부 방식까지 계속 통제받는 환경에서는 답답함을 느끼기 쉽습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 자기 기준을 쉽게 버리지 않는 흐름이 나타납니다. 겉으로 강하게 주장하지 않더라도 중요한 선택에서는 납득한 방식이 있어야 오래 집중하기 쉬울 수 있습니다.',
  },
  겁재: {
    id: 'GEOP_JAE',
    kind: 'friction',
    headline: '사람과 자원을 함께 다룰 때 경쟁과 역할 경계가 중요합니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 동료와 속도를 맞추거나 경쟁하면서 움직이는 힘이 나타납니다. 협업 자체보다 누가 무엇을 맡고 어떤 자원을 함께 쓰는지가 분명할 때 불필요한 힘겨루기를 줄이기 쉽습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 사람 사이의 비교, 경쟁, 몫의 문제가 신경 쓰이기 쉬울 수 있습니다. 공동 작업에서는 기여 범위와 책임을 구체적으로 나누는 편이 안정적입니다.',
  },
  식신: {
    id: 'SIK_SIN',
    kind: 'driver',
    headline: '꾸준히 만들어 결과를 쌓는 과정이 동력이 되기 쉽습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 생각을 실제 산출물로 차분히 이어가는 힘이 나타납니다. 한 번의 강한 승부보다 반복해서 만들고 품질을 다듬으며 결과를 축적하는 일이 잘 맞을 수 있습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 꾸준히 생산하고 완성하는 과정이 중요하게 작용할 수 있습니다. 눈앞의 반응이 크지 않아도 일정한 리듬으로 결과를 쌓을 수 있는 구조가 도움이 됩니다.',
  },
  상관: {
    id: 'SANG_GWAN',
    kind: 'driver',
    headline: '문제를 발견하고 기존 방식을 고쳐 결과로 보여주는 힘이 큽니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 기존 방식의 문제를 발견하고 더 나은 형태로 바꾸려는 힘이 나타납니다. 정해진 절차를 그대로 반복하기보다 개선할 여지가 있고 생각을 말이나 결과물로 드러낼 수 있는 일이 더 자연스러울 수 있습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 비효율이나 모순을 그냥 넘기기 어려운 흐름이 나타납니다. 충분히 납득되지 않는 기준을 오래 따르기보다 문제를 찾아 수정할 여지가 있을 때 집중하기 쉽습니다.',
  },
  편재: {
    id: 'PYEON_JAE',
    kind: 'fit',
    headline: '여러 현실 조건과 외부 반응을 빠르게 엮는 일이 맞을 수 있습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 여러 사람, 자원, 일정, 외부 반응을 동시에 보며 현실적인 선택을 하는 힘이 나타납니다. 한 가지 조건만 오래 파기보다 변화하는 상황을 읽고 우선순위를 조정하는 역할에서 강점을 쓰기 쉽습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 시간과 자원을 어디에 배분할지 판단하는 문제가 중요하게 작용할 수 있습니다. 선택지가 많을수록 현실적인 효율과 활용 가능성을 확인하는 편이 도움이 됩니다.',
  },
  정재: {
    id: 'JEONG_JAE',
    kind: 'fit',
    headline: '구체적인 결과와 자원을 안정적으로 관리하는 역할이 편할 수 있습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 맡은 자원과 결과를 구체적으로 확인하고 안정적으로 관리하려는 힘이 나타납니다. 완료 기준과 책임 범위가 보이는 일, 쌓인 결과를 꾸준히 관리하는 역할이 더 편할 수 있습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 결과를 허술하게 넘기기보다 일정, 비용, 품질처럼 현실적인 조건을 챙기는 흐름이 나타납니다. 목표와 관리 기준이 구체적일수록 지속하기 쉽습니다.',
  },
  편관: {
    id: 'PYEON_GWAN',
    kind: 'fit',
    headline: '압박이나 난도가 있는 상황에서 빠르게 책임지는 역할과 연결될 수 있습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 긴장도가 있거나 빠른 판단이 필요한 상황을 정면으로 다루는 힘이 나타납니다. 책임은 분명하되 대응 여지가 있는 역할에서 집중력이 살아날 수 있고, 압박만 크고 결정권이 없는 환경은 소모적일 수 있습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 기준을 어기지 않으면서 어려운 조건을 버티는 문제가 중요하게 작용할 수 있습니다. 책임의 무게가 커질수록 무엇까지 맡을지 경계를 분명히 하는 편이 필요합니다.',
  },
  정관: {
    id: 'JEONG_GWAN',
    kind: 'fit',
    headline: '역할과 기준이 명확한 구조에서 안정적으로 책임지기 쉽습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 역할, 기준, 절차를 분명하게 이해하고 책임지는 힘이 나타납니다. 무엇을 지켜야 하고 어디까지 책임져야 하는지가 명확한 환경에서 일의 방향을 잡기 쉬울 수 있습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 질서와 책임 기준을 무시하기보다 일정한 틀 안에서 안정적으로 완수하려는 흐름이 나타납니다. 기준이 계속 바뀌거나 책임 소재가 불분명한 환경은 피로하게 느껴질 수 있습니다.',
  },
  편인: {
    id: 'PYEON_IN',
    kind: 'driver',
    headline: '익숙하지 않은 정보를 연결해 새로운 해석을 만드는 일이 맞을 수 있습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 정해진 설명만 받아들이기보다 다른 자료와 관점을 연결해 패턴을 찾는 힘이 나타납니다. 낯선 문제를 탐색하거나 기존 방식으로 바로 풀리지 않는 과제를 다루는 일이 더 흥미로울 수 있습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 혼자 자료를 파고들거나 남들이 지나친 연결점을 찾는 과정이 중요하게 작용할 수 있습니다. 충분한 탐색 시간이 없으면 생각이 끊기는 느낌을 받을 수 있습니다.',
  },
  정인: {
    id: 'JEONG_IN',
    kind: 'driver',
    headline: '정보를 체계적으로 이해하고 정리하는 과정이 일의 기반이 되기 쉽습니다',
    visibleSummary:
      '겉으로 드러나는 업무 방식에서 정보를 배우고 구조화해 안정적인 근거로 만드는 힘이 나타납니다. 자료, 원리, 기준을 충분히 이해한 뒤 움직이는 역할에서 실수를 줄이고 완성도를 높이기 쉽습니다.',
    branchSummary:
      '일을 실제로 이어가는 바탕에서 충분히 이해하고 정리된 근거가 있어야 마음이 놓이는 흐름이 나타납니다. 배울 시간이나 참고할 기준이 전혀 없는 상태에서 즉흥적으로만 처리하는 일은 피로할 수 있습니다.',
  },
});

const CHANNEL_PATHS: Readonly<Record<CareerTenGodChannel, readonly string[]>> = Object.freeze({
  visible_stems: ['year.stem.value', 'month.stem.value', 'hour.stem.value'],
  branches: ['year.branch.value', 'month.branch.value', 'day.branch.value', 'hour.branch.value'],
});

function channelCondition(channel: CareerTenGodChannel, god: TenGod): RuleExpression {
  return {
    op: 'or',
    expressions: CHANNEL_PATHS[channel].map((path) => ({
      op: 'eq' as const,
      left: { kind: 'input' as const, key: 'tenGods', path },
      right: { kind: 'literal' as const, value: god },
    })),
  };
}

function careerTenGodRule(god: TenGod, channel: CareerTenGodChannel): RuleDefinition {
  const spec = TEN_GOD_SPECS[god];
  const summary = channel === 'visible_stems' ? spec.visibleSummary : spec.branchSummary;
  const channelLabel = channel === 'visible_stems' ? 'visible stems' : 'branches';

  return {
    ruleId: `RULE-CAREER-NATAL-${spec.id}-${channel.toUpperCase()}`,
    version: CAREER_NATAL_READING_CANDIDATE_VERSION,
    ruleSetId: CAREER_RULE_SET,
    taxonomy: { tier: 'T8', category: 'career', subcategory: `ten_god_${channel}` },
    methodologyRef: { id: METHOD_ID, version: CAREER_NATAL_READING_CANDIDATE_VERSION },
    title: `${god} career theme in ${channelLabel}`,
    description:
      'Projects one exact resolved Ten-God subtype in one preserved chart channel into a bounded work-style theme without collapsing it into a five-family generic sentence.',
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
    condition: channelCondition(channel, god),
    output: {
      claimType: `CAREER_NATAL_TEN_GOD_${spec.id}_${channel.toUpperCase()}`,
      subject: 'natal_chart',
      predicate: 'career_conclusion',
      value: {
        careerKind: spec.kind,
        tenGod: god,
        channel,
        headline: spec.headline,
        summary,
        specificOccupationAuthorized: false,
        careerSuccessAuthorized: false,
        incomeOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: channel === 'visible_stems' ? 'moderate' : 'minor',
      tags: ['research', 'career', 'natal', 'exact-ten-god', channel, spec.kind],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

const CAREER_TEN_GODS = Object.keys(TEN_GOD_SPECS) as TenGod[];
const CAREER_CHANNELS: readonly CareerTenGodChannel[] = ['visible_stems', 'branches'];

export const CAREER_NATAL_READING_RULES: readonly RuleDefinition[] = Object.freeze(
  CAREER_CHANNELS.flatMap((channel) =>
    CAREER_TEN_GODS.map((god) => careerTenGodRule(god, channel)),
  ),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const CAREER_NATAL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-CAREER-NATAL-CONSUMER-READING-CANDIDATE',
  version: CAREER_NATAL_READING_CANDIDATE_VERSION,
  name: 'Natal Career Exact Ten-God Consumer Reading Research Candidate',
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
    { id: METHOD_ID, version: CAREER_NATAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-NATAL-READING-RESEARCH',
    version: CAREER_NATAL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createCareerNatalReadingCandidateRegistry(
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
      ],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
    },
    CAREER_NATAL_READING_PACK,
    createdAt,
  );
}
