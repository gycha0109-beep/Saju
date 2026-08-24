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

export const CAREER_NATAL_READING_CANDIDATE_VERSION = '0.3.0-research' as const;

const METHOD_ID = 'M-CAREER-NATAL-READING-TEN-GOD-SYNTHESIS-V1';
const CAREER_RULE_SET = 'career-natal-consumer-reading';

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export type CareerConclusionKind = 'driver' | 'fit' | 'environment' | 'friction';

interface CareerConclusionSpec {
  id: string;
  subcategory: string;
  kind: CareerConclusionKind;
  families: readonly ConclusionFamily[];
  headline: string;
  summary: string;
}

export const CAREER_NATAL_READING_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: CAREER_NATAL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'Natal career reading from bounded Ten-God family synthesis (research)',
  description:
    'Applies already-materialized whole-chart Ten-God family themes to bounded career-reading questions such as work motivation, task fit, work environment, and recurring friction without predicting a specific occupation or career outcome.',
  assumptions: [
    'Career claims describe work-style themes and decision criteria, not a deterministic occupation assignment.',
    'A represented Ten-God family is not a score, rank, aptitude test, or proof of career success.',
    'Named occupations, hiring outcomes, salary, promotion, business success, luck polarity, and future timing are outside this candidate.',
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
      notes: 'Supports bounded Ten-God semantic vocabulary used for work-style themes.',
    },
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports bounded generation/control relations among Ten-God families used for career synthesis.',
    },
  ];
}

const CAREER_CONCLUSIONS: readonly CareerConclusionSpec[] = [
  {
    id: 'PEER-SELF-DIRECTION',
    subcategory: 'work_environment',
    kind: 'environment',
    families: ['peer'],
    headline: '자기 방식이 전혀 없는 일보다는 판단 여지가 있는 일이 편합니다',
    summary:
      '일할 때 스스로 기준을 세우고 선택할 수 있는 여지가 중요하게 느껴질 수 있습니다. 모든 과정을 정해진 방식대로만 따라야 하는 역할보다, 맡은 범위 안에서 직접 판단하고 조정할 수 있는 환경이 더 자연스럽게 맞을 수 있습니다.',
  },
  {
    id: 'RESOURCE-LEARNING-ENGINE',
    subcategory: 'work_driver',
    kind: 'driver',
    families: ['resource'],
    headline: '배우고 이해하는 과정이 일의 동력으로 연결됩니다',
    summary:
      '새로운 정보를 익히고 구조를 파악하는 과정이 업무 수행과 연결될 때 강점이 살아날 수 있습니다. 이미 아는 일을 반복하는 것보다 계속 배우거나 해석해야 하는 과제가 있는 편이 더 맞을 수 있습니다.',
  },
  {
    id: 'OUTPUT-MAKING-ENGINE',
    subcategory: 'work_driver',
    kind: 'driver',
    families: ['output'],
    headline: '생각을 실제 결과물로 꺼내는 일이 중요합니다',
    summary:
      '아이디어를 말이나 문서, 코드, 디자인, 기획안, 서비스처럼 눈에 보이는 결과로 바꾸는 과정에서 만족을 느끼기 쉽습니다. 결과물이 남지 않는 역할보다 직접 만들고 개선하는 일이 포함된 역할이 더 잘 맞을 수 있습니다.',
  },
  {
    id: 'WEALTH-RESULT-ORIENTATION',
    subcategory: 'work_fit',
    kind: 'fit',
    families: ['wealth'],
    headline: '내 일이 어떤 결과로 이어지는지 보이는 편이 좋습니다',
    summary:
      '성과, 비용, 자원, 고객 반응처럼 현실적인 결과를 확인할 수 있을 때 일의 의미가 선명해질 수 있습니다. 무엇을 위해 하는 일인지 끝까지 알기 어려운 역할보다 결과와 연결되는 구조가 더 편할 수 있습니다.',
  },
  {
    id: 'OFFICER-RESPONSIBILITY-FIT',
    subcategory: 'work_fit',
    kind: 'fit',
    families: ['officer'],
    headline: '책임 범위와 기준이 분명할수록 집중하기 쉽습니다',
    summary:
      '맡은 역할과 책임, 품질 기준이 명확할 때 오히려 일하기 편할 수 있습니다. 규칙 자체를 좋아한다는 뜻이라기보다, 무엇을 책임져야 하는지 분명한 환경에서 힘을 쓰기 쉬운 쪽에 가깝습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MAKE-TO-VALUE',
    subcategory: 'work_driver',
    kind: 'driver',
    families: ['output', 'wealth'],
    headline: '만드는 일과 실제 가치가 연결될 때 동력이 커집니다',
    summary:
      '무언가를 직접 만들고 그 결과가 사용자 반응, 매출, 효율, 성과처럼 현실적인 가치로 이어지는 흐름이 잘 맞을 수 있습니다. 제작과 결과 확인이 완전히 분리된 역할보다 둘 사이의 연결을 볼 수 있는 일이 더 만족스럽게 느껴질 수 있습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-END-TO-END',
    subcategory: 'work_fit',
    kind: 'fit',
    families: ['output', 'wealth', 'officer'],
    headline: '기획부터 실행과 결과 확인까지 이어지는 역할이 잘 맞을 수 있습니다',
    summary:
      '한 단계만 잘라 맡기보다 직접 만들고, 결과를 확인하고, 필요한 책임까지 이어서 맡는 흐름에서 강점이 드러날 수 있습니다. 작은 제품이나 프로젝트를 처음부터 끝까지 소유하는 방식과 궁합이 좋은 편으로 읽을 수 있습니다.',
  },
  {
    id: 'OFFICER-RESOURCE-STRUCTURED-PROBLEM-SOLVING',
    subcategory: 'work_fit',
    kind: 'fit',
    families: ['officer', 'resource'],
    headline: '복잡한 요구를 공부해서 해결하는 일이 맞을 수 있습니다',
    summary:
      '요구사항이나 제약이 생겼을 때 자료를 찾고 원리를 이해한 뒤 해결책을 만드는 방식이 자연스럽습니다. 규정, 기술, 전문지식처럼 처음에는 복잡해 보여도 파고들수록 풀리는 일을 맡았을 때 강점을 쓰기 쉽습니다.',
  },
  {
    id: 'PEER-OFFICER-BOUNDED-AUTONOMY',
    subcategory: 'work_environment',
    kind: 'environment',
    families: ['peer', 'officer'],
    headline: '자율권은 필요하지만 책임 경계도 분명해야 합니다',
    summary:
      '세세하게 통제받는 환경은 답답할 수 있지만, 아무 기준 없이 알아서 하라는 환경도 편하지 않을 수 있습니다. 목표와 책임은 분명하고 방법은 스스로 선택할 수 있는 구조가 가장 안정적으로 맞을 가능성이 있습니다.',
  },
  {
    id: 'WEALTH-RESOURCE-PREPARE-VS-SHIP',
    subcategory: 'work_friction',
    kind: 'friction',
    families: ['wealth', 'resource'],
    headline: '충분히 알아보는 것과 빨리 결과를 내는 것 사이에서 막힐 수 있습니다',
    summary:
      '조금 더 알아보고 싶다는 마음과 일단 결과를 만들어야 한다는 현실이 충돌하기 쉽습니다. 조사와 준비의 종료 기준을 미리 정하지 않으면 시작이 늦어지거나, 반대로 너무 빨리 시작한 뒤 다시 고치는 일이 반복될 수 있습니다.',
  },
  {
    id: 'PEER-WEALTH-MY-WAY-VS-RESULT',
    subcategory: 'work_friction',
    kind: 'friction',
    families: ['peer', 'wealth'],
    headline: '내가 원하는 방식과 실제 성과 기준이 다를 때 스트레스가 커질 수 있습니다',
    summary:
      '일의 완성 방식에 대한 개인 기준이 강한데 비용, 일정, 수익, 고객 요구 같은 현실 조건이 다른 답을 요구하면 갈등이 생기기 쉽습니다. 무엇은 지키고 무엇은 타협할지 기준을 미리 나누는 것이 중요합니다.',
  },
];

function careerConclusionRule(spec: CareerConclusionSpec): RuleDefinition {
  const inputs = spec.families.map((family) => ({
    key: family,
    source: 'interpretation_claim' as const,
    pathOrClaimType: `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`,
    required: true,
    ambiguityBehavior: 'scenario_preserving' as const,
  }));

  return {
    ruleId: `RULE-CAREER-NATAL-${spec.id}`,
    version: CAREER_NATAL_READING_CANDIDATE_VERSION,
    ruleSetId: CAREER_RULE_SET,
    taxonomy: { tier: 'T8', category: 'career', subcategory: spec.subcategory },
    methodologyRef: { id: METHOD_ID, version: CAREER_NATAL_READING_CANDIDATE_VERSION },
    title: spec.headline,
    description:
      'Synthesizes already-materialized whole-chart Ten-God family claims into a bounded natal career-reading conclusion.',
    inputs,
    condition: {
      op: 'and',
      expressions: spec.families.map((family) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: family },
      })),
    },
    output: {
      claimType: `CAREER_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
      subject: 'natal_chart',
      predicate: 'career_conclusion',
      value: {
        careerKind: spec.kind,
        headline: spec.headline,
        summary: spec.summary,
        families: spec.families,
        specificOccupationAuthorized: false,
        careerSuccessAuthorized: false,
        incomeOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: spec.families.length >= 2 ? 'moderate' : 'minor',
      tags: ['research', 'career', 'natal', 'consumer-conclusion', spec.kind],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const CAREER_NATAL_READING_RULES: readonly RuleDefinition[] = Object.freeze(
  CAREER_CONCLUSIONS.map(careerConclusionRule),
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
  name: 'Natal Career Consumer Reading Research Candidate',
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
