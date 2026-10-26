import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationPack, MethodologyDefinition, RuleDefinition } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
} from './relationship-natal-reading-candidate.js';

/** Canonical T5 -> source-qualified relationship-general T8; no parallel product interpretation. */
export const RELATIONSHIP_NATAL_MULTIFACTOR_VERSION = '0.2.0-research' as const;
const METHOD_ID = 'M-RELATIONSHIP-NATAL-MULTIFACTOR-BOUNDARY-DIALOGUE-V1';
const RULE_SET = 'relationship-natal-source-bounded-multifactor';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'core' | 'expression' | 'boundaries' | 'reception' | 'coordination';
type Channel = 'visible_stems' | 'branches';
interface Pattern {
  id: string;
  families: readonly Family[];
  axis: Axis;
  headline: string;
  summary: string;
}
const PATTERNS: readonly Pattern[] = Object.freeze([
  {
    id: 'PEER_OUTPUT_OFFICER', families: ['peer','output','officer'],
    axis: 'core', headline: '자기 관점·표현·관계의 기준을 함께 읽는 구조',
    summary: '비겁(자기 기준·동료 관점), 식상(표현·산출), 관성(역할·규범)이 같은 관측 채널에 함께 놓입니다. 관계 일반에서는 자신의 입장, 밖으로 전달하는 방식, 서로의 역할이라는 세 관점을 함께 살피는 구조적 독해입니다. 실제 소통 능력이나 관계 결과를 판정하지 않습니다.',
  },
  {
    id: 'PEER_OUTPUT', families: ['peer','output'],
    axis: 'expression', headline: '자기 관점과 표현을 연결해 보는 구조',
    summary: '비겁의 자기 기준·동료 관점과 식상의 표현·발산이 함께 관측됩니다. 관계를 읽을 때 자신의 입장과 표현되는 내용을 따로 살펴볼 수 있다는 전통적 구조이며 실제 말투나 대인 성격을 추정하지 않습니다.',
  },
  {
    id: 'PEER_OFFICER', families: ['peer','officer'],
    axis: 'boundaries', headline: '자율적인 관점과 역할 기준의 경계',
    summary: '비겁의 자기 기준과 관성의 역할·규범 관점이 함께 놓입니다. 관계에서 자신과 상대의 책임·경계를 질문하는 구조적 설명이며 실제 권력 다툼이나 갈등을 예견하지 않습니다.',
  },
  {
    id: 'RESOURCE_OUTPUT', families: ['resource','output'],
    axis: 'reception', headline: '받아들이는 과정과 밖으로 표현하는 과정',
    summary: '인성의 수용·준비와 식상의 표현·산출을 한 채널에서 함께 확인할 수 있습니다. 관계 일반에서 듣고 받아들이는 관점과 표현하는 관점을 나누어 살피는 제한적 독해이며 실제 공감 능력이나 친밀도를 측정하지 않습니다.',
  },
  {
    id: 'PEER_RESOURCE', families: ['peer','resource'],
    axis: 'reception', headline: '자기 관점과 주변에서 받는 지원의 접점',
    summary: '비겁의 자기 기준·동료 관점과 인성의 수용·지원 관점이 함께 나타납니다. 상호 지지라는 해석의 질문을 마련할 뿐 실제 가족·친구의 지원 정도나 관계의 질을 판단하지 않습니다.',
  },
  {
    id: 'PEER_RESOURCE_OFFICER', families: ['peer','resource','officer'],
    axis: 'coordination', headline: '자기 관점·수용·책임의 세 기준이 교차',
    summary: '비겁의 자기 관점, 인성의 수용, 관성의 역할 기준이 같은 채널에 관측됩니다. 다양한 관계에서 입장과 경계를 어떻게 구분해 볼지 설명하는 연구 후보일 뿐 실제 배우자·결혼·연애 결과를 뜻하지 않습니다.',
  },
  {
    id: 'RESOURCE_OUTPUT_OFFICER', families: ['resource','output','officer'],
    axis: 'core', headline: '받아들이기·표현하기·역할 기준의 세 관점',
    summary: '인성의 수용·학습, 식상의 표현·산출, 관성의 역할·규범이 같은 관측 채널에서 함께 나타납니다. 관계 일반에서는 받아들인 것을 어떻게 표현하고 어떤 역할 기준과 구별할지 함께 검토하는 전통적 구조로만 읽습니다. 실제 성격이나 의사소통의 우열, 관계 성패를 판정하지 않습니다.',
  },
  {
    id: 'OUTPUT_OFFICER', families: ['output','officer'],
    axis: 'boundaries', headline: '표현하는 일과 역할 기준을 나누어 보는 구조',
    summary: '식상의 표현·발산과 관성의 역할·규범이 함께 관측됩니다. 관계 일반에서 표현의 관점과 책임·경계의 관점을 구별해 질문할 수 있으나, 실제 대인 갈등이나 연애·결혼 결과를 예견하지 않습니다.',
  },
  {
    id: 'RESOURCE_OFFICER', families: ['resource','officer'],
    axis: 'coordination', headline: '받아들이는 관점과 책임 기준의 교차',
    summary: '인성의 수용·학습과 관성의 역할·규범 관점이 같은 채널에 놓입니다. 관계에서 이해하려는 관점과 서로에게 적용하는 기준을 비교해 보는 제한된 전통 독해일 뿐, 가족의 지원이나 배우자의 속성·관계 만족도를 알 수 있다는 뜻은 아닙니다.',
  },
  {
    id: 'OUTPUT_WEALTH', families: ['output','wealth'],
    axis: 'expression', headline: '표현과 교환의 구조적 관계',
    summary: '식상의 표현·산출 관점과 재성의 교환·자원 관점이 같은 채널에 나타납니다. 관계 일반에서 표현과 주고받음이라는 서로 다른 상징을 비교해 볼 수 있으나 성별 역할, 연애·결혼 결과, 경제적 관계 또는 실제 호혜성을 단정하지 않습니다.',
  },
]);
const CHANNELS: readonly Channel[] = ['visible_stems', 'branches'];
const DIRECT_RELATIONSHIP_FAMILY_RULES = Object.freeze(
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES.filter(rule =>
    RELATIONSHIP_NATAL_READING_RULES.some(direct =>
      direct.inputs.some(input => input.pathOrClaimType === rule.output.claimType))),
);
const SOURCE_REFS: RuleDefinition['sourceRefs'] = [
  { sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, supportType: 'interpretive_basis',
    notes: 'Bounded Ten-God structural language only.' },
  { sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, supportType: 'interpretive_basis',
    notes: 'Research-only classical cross-reference for generation/control relations.' },
];
const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export const RELATIONSHIP_NATAL_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Relationship-general natal synthesis of expressive and boundary-oriented T5 structures (research)',
  description: 'Research-only natal relationship/boundary-dialogue interpretation from 2–3 same-channel T5 claims, without financial outcomes.',
  assumptions: [
    'Different T5 Claim inputs must be from the exact same canonical snapshot and channel.',
    'A family presence is not a dominance or strength measure. No favourable/unfavourable polarity.',
    'The core three-family relation is a source-qualified structural chain only, not causation in real life.',
    'The relation provides structural reflection themes only, not relationship quality, spouse, marriage, compatibility, outcomes, gender roles, health or future events.',
    'This methodology is an unreviewed internal research candidate and is not admitted to Product/Commerce.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
});

function claimType(pattern: Pattern, channel: Channel) {
  return `RELATIONSHIP_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'relationship', subcategory: 'multifactor_structure' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description: 'Relationship natal research synthesis of exact channel-bound upstream T5 themes.',
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
      predicate: 'relationship_multifactor_structure',
      value: {
        pattern: pattern.id,
        families: [...pattern.families],
        channel,
        axis: pattern.axis,
        realLifeOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        healthOrMoneyOutcomeAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: pattern.axis === 'core' ? 'major' : 'moderate',
      tags: ['research', 'relationship-natal', 'source-bound-multifactor', pattern.axis, channel],
    },
    sourceRefs: SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}
export const RELATIONSHIP_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap(pattern => CHANNELS.map(channel => rule(pattern, channel))),
);
export const RELATIONSHIP_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERNS.flatMap((pattern, order) => CHANNELS.map(channel => ({
    profileId: `PROFILE-${claimType(pattern, channel)}`,
    version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION,
    claimType: claimType(pattern, channel),
    semanticKeys: ['pattern', 'families', 'channel', 'axis'],
    allowedEpistemicTypes: ['interpretation' as const],
    requiredMethodAttribution: true,
    prohibitedPhrases: ['반드시 성공', '승진한다', '돈이 들어온다', '성격이 확정된다', '운명이 정해져'],
    renderingHints: [`axis:${pattern.axis}`, `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: pattern.headline },
      { templateKey: 'summary', language: 'ko', text:
        (channel === 'visible_stems'
          ? '천간에서 실제로 관측된 조합입니다. '
          : '지지 대표 십신에서 관측된 보조 조합입니다. ') + pattern.summary },
    ],
  }))));
export const RELATIONSHIP_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-RELATIONSHIP-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION,
  name: 'Relationship natal multifactor synthesis / internal research',
  methodologyRefs: [
    { id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version },
    { id: METHOD_ID, version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION },
    { id: GENERAL_NATAL_CONCLUSION_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_CONCLUSION_METHODOLOGY.version },
    { id: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
      version: RELATIONSHIP_NATAL_READING_METHODOLOGY.version },
  ],
  enabledRuleSets: [...new Set([
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(x => x.ruleSetId),
    ...DIRECT_RELATIONSHIP_FAMILY_RULES.map(x => x.ruleSetId),
    ...RELATIONSHIP_NATAL_READING_RULES.map(x => x.ruleSetId),
    RULE_SET,
  ])],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-RELATIONSHIP-NATAL-MULTIFACTOR-RESEARCH',
    version: RELATIONSHIP_NATAL_MULTIFACTOR_VERSION,
  },
  status: 'research',
});
export function createRelationshipNatalMultifactorRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot({
    rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
      ...DIRECT_RELATIONSHIP_FAMILY_RULES,
      ...RELATIONSHIP_NATAL_MULTIFACTOR_RULES,
      ...RELATIONSHIP_NATAL_READING_RULES],
    methodologies: [GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
      RELATIONSHIP_NATAL_MULTIFACTOR_METHODOLOGY,
      GENERAL_NATAL_CONCLUSION_METHODOLOGY,
      RELATIONSHIP_NATAL_READING_METHODOLOGY],
    sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
  }, RELATIONSHIP_NATAL_MULTIFACTOR_PACK, createdAt);
}
