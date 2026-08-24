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

export const RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION = '0.5.0-research' as const;

const METHOD_ID = 'M-RELATIONSHIP-NATAL-READING-TEN-GOD-SYNTHESIS-V1';
const RELATIONSHIP_RULE_SET = 'relationship-natal-consumer-reading';

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export type RelationshipConclusionKind =
  | 'closeness'
  | 'values'
  | 'expression'
  | 'boundary'
  | 'friction';

interface RelationshipConclusionSpec {
  id: string;
  kind: RelationshipConclusionKind;
  families: readonly ConclusionFamily[];
  headline: string;
  summary: string;
}

export const RELATIONSHIP_NATAL_READING_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'Natal general-relationship reading from bounded Ten-God family synthesis (research)',
  description:
    'Applies already-materialized whole-chart Ten-God family themes to bounded general-relationship questions such as closeness, communication, reciprocity, boundaries, and recurring interpersonal friction without predicting a specific partner, marriage, breakup, infidelity, or future relationship timing.',
  assumptions: [
    'Relationship claims describe the native person’s broad interpersonal tendencies and preferred interaction conditions, not another person’s traits or intentions.',
    'A represented Ten-God family is not a score, attachment diagnosis, compatibility judgment, or proof of a future relationship outcome.',
    'Specific partner appearance, occupation, personality, fidelity, marriage, divorce, breakup, children, and future relationship timing are outside this candidate.',
    'General relationship conclusions must not be reused as spouse-specific claims or compatibility claims.',
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
      notes: 'Supports bounded Ten-God semantic vocabulary reused for general interpersonal themes.',
    },
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports bounded generation/control relations among Ten-God families used for relationship synthesis.',
    },
  ];
}

const RELATIONSHIP_CONCLUSIONS: readonly RelationshipConclusionSpec[] = [
  {
    id: 'PEER-EQUAL-FOOTING',
    kind: 'closeness',
    families: ['peer'],
    headline: '가까워져도 서로의 선택권이 남아 있는 관계가 편한 편입니다',
    summary:
      '친해질수록 모든 것을 함께해야 하는 관계보다 각자 결정할 수 있는 영역이 있으면서 필요할 때 나란히 움직이는 관계를 편하게 느낄 수 있습니다. 지나치게 간섭받는다고 느끼면 가까운 사이에서도 거리를 두고 싶어질 수 있습니다.',
  },
  {
    id: 'RESOURCE-UNDERSTAND-BEFORE-CLOSE',
    kind: 'closeness',
    families: ['resource'],
    headline: '상대를 충분히 이해했다는 느낌이 있어야 마음을 열기 쉬운 편입니다',
    summary:
      '처음부터 빠르게 가까워지기보다 대화를 통해 상대의 생각과 맥락을 이해하고 신뢰를 확인하는 시간이 중요할 수 있습니다. 마음이 복잡할 때도 바로 반응하기보다 먼저 생각을 정리할 시간이 있으면 관계를 더 안정적으로 다루기 쉽습니다.',
  },
  {
    id: 'OUTPUT-EXPRESS-TO-CONNECT',
    kind: 'expression',
    families: ['output'],
    headline: '생각과 감정을 표현할 통로가 있을 때 관계가 더 자연스럽습니다',
    summary:
      '마음속으로만 이해하는 것보다 말이나 행동으로 표현하고 반응을 확인할 수 있을 때 관계가 살아 있다고 느끼기 쉽습니다. 하고 싶은 말을 계속 삼켜야 하는 관계에서는 답답함이 쌓일 수 있습니다.',
  },
  {
    id: 'WEALTH-PRACTICAL-RECIPROCITY',
    kind: 'values',
    families: ['wealth'],
    headline: '관계에서도 서로 실제로 무엇을 해주는지가 중요한 편입니다',
    summary:
      '좋은 마음만큼 시간과 노력, 약속을 지키는 행동처럼 현실에서 확인되는 부분을 중요하게 볼 수 있습니다. 한쪽만 계속 챙기거나 부담을 떠안는 흐름이 반복되면 관계의 균형이 깨졌다고 느끼기 쉽습니다.',
  },
  {
    id: 'OFFICER-RELIABLE-BOUNDARY',
    kind: 'values',
    families: ['officer'],
    headline: '가까운 사이일수록 약속과 책임이 분명한 관계를 중요하게 보는 편입니다',
    summary:
      '친하다는 이유로 기준이 계속 바뀌는 관계보다 서로 지킬 것은 지키고 맡은 부분은 책임지는 관계에서 신뢰를 느끼기 쉽습니다. 말과 행동이 자주 달라지는 상대와는 피로가 커질 수 있습니다.',
  },
  {
    id: 'PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
    kind: 'boundary',
    families: ['peer', 'officer'],
    headline: '자유롭게 지내되 서로 넘지 않을 선은 분명한 관계가 잘 맞을 수 있습니다',
    summary:
      '내 방식과 상대의 방식을 모두 인정하면서도 약속이나 책임의 경계가 분명하면 관계를 편하게 유지하기 쉽습니다. 반대로 간섭은 많은데 책임 기준은 애매한 관계에서는 특히 답답함을 느낄 수 있습니다.',
  },
  {
    id: 'RESOURCE-OUTPUT-PROCESS-THEN-SPEAK',
    kind: 'expression',
    families: ['resource', 'output'],
    headline: '생각을 정리한 뒤 솔직하게 풀어낼 때 소통이 가장 잘 되는 편입니다',
    summary:
      '바로 말해야 한다는 압박을 받으면 표현이 꼬일 수 있지만 충분히 생각만 하고 말하지 않으면 상대는 알기 어렵습니다. 잠깐 정리할 시간을 가진 뒤 실제 대화로 이어가는 방식이 관계 갈등을 줄이는 데 더 잘 맞을 수 있습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-WORDS-TO-ACTION',
    kind: 'values',
    families: ['output', 'wealth'],
    headline: '말로 표현한 마음이 실제 행동까지 이어질 때 신뢰가 커지기 쉽습니다',
    summary:
      '좋다고 말하는 것만큼 시간을 내고 도와주고 약속을 실행하는 것처럼 눈에 보이는 행동을 중요하게 볼 수 있습니다. 표현과 실제 행동이 자주 어긋나면 말 자체를 믿기 어려워질 수 있습니다.',
  },
  {
    id: 'OFFICER-RESOURCE-CARE-THROUGH-PREPARATION',
    kind: 'expression',
    families: ['officer', 'resource'],
    headline: '관심을 보여주는 방식이 챙기고 준비하고 책임지는 쪽으로 나타날 수 있습니다',
    summary:
      '감정을 크게 드러내는 것보다 필요한 정보를 알아두거나 약속을 기억하고 실제 문제를 챙겨주는 방식으로 마음을 표현하기 쉬울 수 있습니다. 다만 상대가 원하는 표현 방식과 다르면 내가 충분히 표현했다고 생각해도 전달이 약할 수 있습니다.',
  },
  {
    id: 'PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    kind: 'friction',
    families: ['peer', 'wealth'],
    headline: '내 선택과 함께 써야 하는 시간·돈·에너지의 균형에서 갈등이 생길 수 있습니다',
    summary:
      '내가 원하는 방식이 분명할수록 공동 일정이나 비용, 서로에게 쓰는 노력 때문에 선택을 조정해야 할 때 답답함을 느끼기 쉽습니다. 무엇을 각자 결정하고 무엇을 함께 정할지 미리 나누면 불필요한 힘겨루기를 줄이는 데 도움이 됩니다.',
  },
  {
    id: 'WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND',
    kind: 'friction',
    families: ['wealth', 'resource'],
    headline: '문제를 빨리 해결하고 싶은 마음과 충분히 이해하고 싶은 마음이 충돌할 수 있습니다',
    summary:
      '갈등이 생기면 현실적인 해결책을 빨리 찾고 싶으면서도 왜 이런 일이 생겼는지 충분히 납득하고 싶을 수 있습니다. 해결책만 서두르거나 반대로 생각만 길어지면 답답함이 커질 수 있어 이해할 시간과 결정할 시간을 나눠두는 편이 좋습니다.',
  },
];

function relationshipConclusionRule(spec: RelationshipConclusionSpec): RuleDefinition {
  const inputs = spec.families.map((family) => ({
    key: family,
    source: 'interpretation_claim' as const,
    pathOrClaimType: `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`,
    required: true,
    ambiguityBehavior: 'scenario_preserving' as const,
  }));

  return {
    ruleId: `RULE-RELATIONSHIP-NATAL-${spec.id}`,
    version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    ruleSetId: RELATIONSHIP_RULE_SET,
    taxonomy: { tier: 'T8', category: 'relationship', subcategory: 'general' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION },
    title: spec.headline,
    description:
      'Synthesizes already-materialized whole-chart Ten-God family claims into a bounded general-relationship conclusion.',
    inputs,
    condition: {
      op: 'and',
      expressions: spec.families.map((family) => ({
        op: 'exists' as const,
        value: { kind: 'input' as const, key: family },
      })),
    },
    output: {
      claimType: `RELATIONSHIP_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
      subject: 'natal_chart',
      predicate: 'relationship_conclusion',
      value: {
        relationshipKind: spec.kind,
        headline: spec.headline,
        summary: spec.summary,
        families: spec.families,
        specificPartnerAuthorized: false,
        partnerAttributePredictionAuthorized: false,
        marriageOutcomeAuthorized: false,
        breakupOutcomeAuthorized: false,
        infidelityInferenceAuthorized: false,
        futureTimingAuthorized: false,
        compatibilityAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: spec.families.length >= 2 ? 'moderate' : 'minor',
      tags: ['research', 'relationship', 'general', 'natal', 'consumer-conclusion', spec.kind],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const RELATIONSHIP_NATAL_READING_RULES: readonly RuleDefinition[] = Object.freeze(
  RELATIONSHIP_CONCLUSIONS.map(relationshipConclusionRule),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
  ...RELATIONSHIP_NATAL_READING_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const RELATIONSHIP_NATAL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-RELATIONSHIP-NATAL-CONSUMER-READING-CANDIDATE',
  version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  name: 'Natal General Relationship Consumer Reading Research Candidate',
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
    { id: METHOD_ID, version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-RELATIONSHIP-NATAL-READING-RESEARCH',
    version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createRelationshipNatalReadingCandidateRegistry(
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
      ],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
    },
    RELATIONSHIP_NATAL_READING_PACK,
    createdAt,
  );
}
