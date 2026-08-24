import type { TenGod } from '../contracts/calculation.js';
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
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  GENERAL_NATAL_USEFUL_T8_RULES,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';

export const GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION = '0.2.0-research' as const;

export type ConclusionFamily = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';

const METHOD_ID = 'M-GENERAL-NATAL-CONCLUSION-SYNTHESIS-SAMYEONG-V1';
const FAMILY_RULE_SET = 'general-natal-conclusion-family-presence';
const CONCLUSION_RULE_SET = 'general-natal-conclusion-synthesis';

export const GENERAL_NATAL_CONCLUSION_SOURCE = Object.freeze({
  sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
  sourceType: 'classical_text',
  title: '三命通會（四庫全書本）卷五',
  language: 'zh-Hant',
  locator: {
    section: '論古人立印食官財名義',
  },
  url: 'https://zh.wikisource.org/zh/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B705',
  accessedAt: '2026-08-24',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'public_domain',
    reusePolicy: 'paraphrase_only',
  },
  notes:
    'Research-only classical cross-reference for the structural meanings and mutual generation/control relations among 印、食傷、財、官殺、比劫. Consumer conclusions are intentionally narrower than historical rank, spouse, illness, lifespan, and deterministic fortune statements.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

const FAMILIES: Readonly<Record<ConclusionFamily, readonly TenGod[]>> = Object.freeze({
  peer: ['비견', '겁재'],
  resource: ['편인', '정인'],
  output: ['식신', '상관'],
  wealth: ['편재', '정재'],
  officer: ['편관', '정관'],
});

const ALL_SLOTS = [
  'year.stem.value',
  'month.stem.value',
  'hour.stem.value',
  'year.branch.value',
  'month.branch.value',
  'day.branch.value',
  'hour.branch.value',
] as const;

export const GENERAL_NATAL_CONCLUSION_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'General natal conclusion synthesis from Ten-God relations (research)',
  description:
    'Turns whole-chart Ten-God family coexistence and traditional generation/control relationships into bounded consumer conclusions about work style, resource handling, self-direction, responsibility, and internal tensions.',
  assumptions: [
    'A conclusion is an interpretation of a structural pattern, not an observed psychological fact about the person.',
    'Family presence is not a numeric dominance score and does not establish strong/weak classification.',
    '食傷→財, 財→官殺, 官殺→印 and control tensions such as 比劫↔財, 財↔印, 官殺↔比劫 are used only as structural interpretive relations.',
    'Specific income, occupation, spouse, health, event, luck polarity, and future timing remain outside this candidate.',
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
      notes: 'Supports bounded Ten-God semantic vocabulary.',
    },
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports generation/control relations among Ten-God families used for synthesis.',
    },
  ];
}

function familyCondition(family: ConclusionFamily): RuleExpression {
  return {
    op: 'or',
    expressions: ALL_SLOTS.map((path) => ({
      op: 'in' as const,
      value: { kind: 'input' as const, key: 'tenGods', path },
      set: FAMILIES[family],
    })),
  };
}

function familyPresenceRule(family: ConclusionFamily): RuleDefinition {
  return {
    ruleId: `RULE-GENERAL-NATAL-CONCLUSION-FAMILY-${family.toUpperCase()}-PRESENT`,
    version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
    ruleSetId: FAMILY_RULE_SET,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'family_presence' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION },
    title: `${family} family presence for conclusion synthesis`,
    description: 'Materializes non-numeric whole-chart family presence for downstream conclusion rules.',
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
    condition: familyCondition(family),
    output: {
      claimType: `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`,
      subject: 'natal_chart',
      predicate: 'ten_god_family_presence',
      value: { family, presence: 'observed', dominance: 'not_scored' },
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'ten-god-family', 'non-numeric'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

interface ConclusionSpec {
  id: string;
  subcategory: string;
  kind: 'core' | 'strength' | 'tension' | 'work' | 'money' | 'relationship';
  families: readonly ConclusionFamily[];
  headline: string;
  summary: string;
}

const CONCLUSIONS: readonly ConclusionSpec[] = [
  {
    id: 'CORE-FIVE-FAMILY-CYCLE',
    subcategory: 'core_conclusion',
    kind: 'core',
    families: ['peer', 'resource', 'output', 'wealth', 'officer'],
    headline: '생각을 결과와 책임까지 끌고 가는 다축형 구조',
    summary:
      '한 가지 성향으로 단순화하기 어려운 명식입니다. 자기 기준, 학습과 준비, 표현과 생산, 현실 성과, 책임과 규칙의 축이 모두 같이 잡힙니다. 핵심은 배우고 생각한 것을 밖으로 꺼내 결과로 만들고 그 결과의 책임까지 지는 흐름을 살리면서, 내 방식과 현실 조건 사이의 충돌을 조절하는 데 있습니다.',
  },
  {
    id: 'OUTPUT-TO-WEALTH',
    subcategory: 'strength_conclusion',
    kind: 'strength',
    families: ['output', 'wealth'],
    headline: '아이디어를 실제 결과로 바꾸는 축',
    summary:
      '표현·생산과 현실 결과의 축이 함께 있습니다. 생각이나 기술을 머릿속에만 두기보다 결과물로 꺼내고, 그것을 성과나 자원으로 연결하려는 작동 방식이 명식 안에 잡힙니다.',
  },
  {
    id: 'WEALTH-TO-OFFICER',
    subcategory: 'strength_conclusion',
    kind: 'strength',
    families: ['wealth', 'officer'],
    headline: '결과를 만들고 책임까지 떠안는 축',
    summary:
      '현실 성과와 책임·역할의 축이 같이 있습니다. 결과만 만들고 끝내기보다 그 결과에 붙는 기준, 책임, 관리 문제까지 함께 다루는 쪽으로 흐름이 이어집니다.',
  },
  {
    id: 'OFFICER-TO-RESOURCE',
    subcategory: 'strength_conclusion',
    kind: 'strength',
    families: ['officer', 'resource'],
    headline: '압박을 공부와 체계화로 소화하는 축',
    summary:
      '외부 요구와 압박의 축이 학습·준비의 축과 연결됩니다. 부담이 생겼을 때 감으로 버티기보다 자료를 찾고 이해하고 구조를 잡아 대응하는 방식으로 읽힙니다.',
  },
  {
    id: 'PEER-WEALTH-TENSION',
    subcategory: 'tension_conclusion',
    kind: 'tension',
    families: ['peer', 'wealth'],
    headline: '내 방식과 현실 자원 사이의 긴장',
    summary:
      '자기 기준과 주도권의 축이 돈·자원·성과의 축을 직접 견제합니다. 하고 싶은 방식대로 밀어붙이는 문제와 비용, 수익, 분배를 맞추는 현실 문제가 따로 놀지 않는 구조입니다.',
  },
  {
    id: 'WEALTH-RESOURCE-TENSION',
    subcategory: 'tension_conclusion',
    kind: 'tension',
    families: ['wealth', 'resource'],
    headline: '실행 속도와 충분한 준비 사이의 긴장',
    summary:
      '현실 결과를 빨리 만들려는 축과 더 배우고 검토하려는 축이 서로 견제합니다. 준비를 늘리면 실행이 늦어지고, 실행을 서두르면 검토가 부족해지는 식의 긴장이 생기기 쉬운 구조로 읽힙니다.',
  },
  {
    id: 'PEER-OFFICER-TENSION',
    subcategory: 'tension_conclusion',
    kind: 'tension',
    families: ['peer', 'officer'],
    headline: '자율성과 외부 기준 사이의 긴장',
    summary:
      '자기 기준과 외부의 규칙·책임이 동시에 작동합니다. 남이 정한 기준에 무조건 맞추는 것도, 반대로 규칙을 무시하고 내 방식만 밀어붙이는 것도 편하지 않은 구조로 읽힙니다.',
  },
  {
    id: 'WORK-OUTPUT-WEALTH-OFFICER',
    subcategory: 'work_conclusion',
    kind: 'work',
    families: ['output', 'wealth', 'officer'],
    headline: '일에서는 산출물과 책임이 붙는 역할이 맞물립니다',
    summary:
      '일에서는 생각만 하거나 지시만 수행하는 역할보다, 무언가를 직접 만들고 결과를 확인하고 그 결과에 대한 책임까지 이어지는 역할의 흐름이 더 선명합니다. 기획·제작·실행·운영이 완전히 분리된 환경보다 서로 이어지는 환경에서 구조가 자연스럽게 드러납니다.',
  },
  {
    id: 'MONEY-WEALTH-PEER-RESOURCE',
    subcategory: 'money_conclusion',
    kind: 'money',
    families: ['wealth', 'peer', 'resource'],
    headline: '돈은 보유보다 운용과 선택의 문제로 읽힙니다',
    summary:
      '자원 축이 자기 기준과 학습·준비 축에 동시에 걸려 있습니다. 돈이나 자원을 그냥 쌓아두는 문제보다 어디에 쓰고, 무엇을 위해 투입하고, 어떤 기준으로 배분할지가 중요한 구조입니다. 내 욕구와 현실 효율, 학습·준비에 쓰는 비용을 분리해서 보는 습관이 중요합니다.',
  },
  {
    id: 'RELATIONSHIP-PEER-OFFICER',
    subcategory: 'relationship_conclusion',
    kind: 'relationship',
    families: ['peer', 'officer'],
    headline: '관계에서도 자기 기준과 역할 경계가 중요합니다',
    summary:
      '사람 사이에서도 자기 기준을 놓지 않으면서 동시에 책임과 규칙을 강하게 의식하는 축이 있습니다. 무조건 맞춰주는 관계보다 서로의 역할과 선을 분명히 아는 관계가 편한 쪽으로 읽힙니다.',
  },
];

function conclusionRule(spec: ConclusionSpec): RuleDefinition {
  const inputs = spec.families.map((family) => ({
    key: family,
    source: 'interpretation_claim' as const,
    pathOrClaimType: `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`,
    required: true,
    ambiguityBehavior: 'scenario_preserving' as const,
  }));

  return {
    ruleId: `RULE-GENERAL-NATAL-CONCLUSION-${spec.id}`,
    version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
    ruleSetId: CONCLUSION_RULE_SET,
    taxonomy: { tier: 'T8', category: 'general', subcategory: spec.subcategory },
    methodologyRef: { id: METHOD_ID, version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION },
    title: spec.headline,
    description:
      'Synthesizes already-materialized whole-chart Ten-God family claims into one bounded consumer conclusion.',
    inputs,
    condition: {
      op: 'and',
      expressions: spec.families.map((family) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: family },
      })),
    },
    output: {
      claimType: `GENERAL_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
      subject: 'natal_chart',
      predicate: 'consumer_conclusion',
      value: {
        conclusionKind: spec.kind,
        headline: spec.headline,
        summary: spec.summary,
        families: spec.families,
        fortunePolarity: 'not_determined',
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: spec.kind === 'core' ? 'major' : 'moderate',
      tags: ['research', 'general-natal', 'consumer-conclusion', spec.kind],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const GENERAL_NATAL_CONCLUSION_FAMILY_RULES: readonly RuleDefinition[] = Object.freeze(
  (Object.keys(FAMILIES) as ConclusionFamily[]).map(familyPresenceRule),
);

export const GENERAL_NATAL_CONCLUSION_RULES: readonly RuleDefinition[] = Object.freeze(
  CONCLUSIONS.map(conclusionRule),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const GENERAL_NATAL_CONCLUSION_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-CONCLUSION-SYNTHESIS-CANDIDATE',
  version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
  name: 'General Natal Conclusion-Oriented Reading Research Candidate',
  methodologyRefs: [
    {
      id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version,
    },
    {
      id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
    },
    { id: METHOD_ID, version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-CONCLUSION-RESEARCH',
    version: GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createGeneralNatalConclusionCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...ALL_RULES],
      methodologies: [
        GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
        GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
        GENERAL_NATAL_CONCLUSION_METHODOLOGY,
      ],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
    },
    GENERAL_NATAL_CONCLUSION_PACK,
    createdAt,
  );
}
