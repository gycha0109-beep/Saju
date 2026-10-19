import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationPack, MethodologyDefinition, RuleDefinition } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  GENERAL_NATAL_USEFUL_T8_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

/** Canonical T5 -> source-qualified General T8; no parallel product interpretation. */
export const GENERAL_NATAL_MULTIFACTOR_VERSION = '0.1.0-research' as const;
const METHOD_ID = 'M-GENERAL-NATAL-MULTIFACTOR-WHOLE-CHART-V1';
const RULE_SET = 'general-natal-source-bounded-multifactor';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'core' | 'expression' | 'response' | 'responsibility' | 'tension';
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
    id: 'OUTPUT_WEALTH_OFFICER',
    families: ['output', 'wealth', 'officer'],
    axis: 'core',
    headline: '표현과 결과, 그에 따르는 기준까지 이어지는 구조',
    summary: '식상에서 재성, 재성에서 관성으로 이어지는 전통적 관계를 같은 관측 채널의 세 십신 축에서 함께 확인했습니다. 무엇을 만들어 내고, 현실 자원으로 다루고, 규범·책임과 연결할지를 원국 구조의 하나의 흐름으로 읽을 수 있습니다. 실제 성격이나 사회적 성공을 증명하지 않습니다.',
  },
  {
    id: 'OUTPUT_WEALTH',
    families: ['output', 'wealth'],
    axis: 'expression',
    headline: '표현과 현실 결과가 맞닿는 구조',
    summary: '식상(표현·생산)과 재성(현실 자원)이 같은 관측 채널에 나타납니다. 명리에서 표현한 것을 현실 자원과 연결하는 주제를 읽는 근거입니다. 개인이 반드시 그런 행동을 한다는 뜻은 아닙니다.',
  },
  {
    id: 'OFFICER_RESOURCE',
    families: ['officer', 'resource'],
    axis: 'response',
    headline: '외부 기준과 배움·수용이 만나는 구조',
    summary: '관성(요구·규칙)과 인성(학습·수용)이 같은 채널에서 관측됩니다. 외부의 조건과 지원·이해의 축을 연결해 읽는 전통적 해석 후보로, 실제 대처 능력이나 학업 결과를 단정하지 않습니다.',
  },
  {
    id: 'WEALTH_OFFICER',
    families: ['wealth', 'officer'],
    axis: 'responsibility',
    headline: '현실 자원과 규범·책임이 연결되는 구조',
    summary: '재성(현실 자원)과 관성(규칙·책임)이 함께 관측됩니다. 자원의 운용과 그에 따르는 기준이라는 구조적 관점을 제시하지만, 직업·금전·지위의 결과를 예측하지 않습니다.',
  },
  {
    id: 'PEER_OFFICER',
    families: ['peer', 'officer'],
    axis: 'tension',
    headline: '자기 기준과 외부 규칙이 함께 서 있는 구조',
    summary: '비겁(자기 기준·동료)과 관성(규칙·책임)이 함께 관측됩니다. 자기 주도성과 외부 요구를 함께 살필 수 있다는 구조적 긴장으로만 읽으며 실제 갈등이나 특정 성격을 단정하지 않습니다.',
  },
  {
    id: 'WEALTH_RESOURCE',
    families: ['wealth', 'resource'],
    axis: 'tension',
    headline: '현실 실행과 학습·준비가 만나는 구조',
    summary: '재성(결과·자원)과 인성(학습·준비)이 함께 관측됩니다. 전통적 견제 관계를 현실화와 충분한 준비를 함께 살피는 축으로 제한하여 읽습니다. 개인의 투자·비용·행동을 예측하지 않습니다.',
  },
]);
const CHANNELS: readonly Channel[] = ['visible_stems', 'branches'];
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

export const GENERAL_NATAL_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: GENERAL_NATAL_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Whole-chart general natal synthesis from multiple observed Ten-God family channels (research)',
  description: 'A bounded General natal view combining two or three source-qualified T5 family themes in the same chart channel. Not a personal outcome claim.',
  assumptions: [
    'Different T5 Claim inputs must be from the exact same canonical snapshot and channel.',
    'A family presence is not a dominance or strength measure. No favourable/unfavourable polarity.',
    'The core three-family relation is a source-qualified structural chain only, not causation in real life.',
    'A General interpretation cannot be reassigned as evidence of career, income, spouse, health, or future events.',
    'This methodology is an unreviewed internal research candidate and is not admitted to Product/Commerce.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
});

function claimType(pattern: Pattern, channel: Channel) {
  return `GENERAL_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
function rule(pattern: Pattern, channel: Channel): RuleDefinition {
  return {
    ruleId: `RULE-${claimType(pattern, channel)}`,
    version: GENERAL_NATAL_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'general', subcategory: pattern.axis === 'core' ? 'core_conclusion' : pattern.axis === 'tension' ? 'tension_conclusion' : 'strength_conclusion' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_NATAL_MULTIFACTOR_VERSION },
    title: `${pattern.headline} — ${channel}`,
    description: 'General natal research synthesis of exact channel-bound upstream T5 themes.',
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
      predicate: 'general_multifactor_structure',
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
      tags: ['research', 'general-natal', 'source-bound-multifactor', pattern.axis, channel],
    },
    sourceRefs: SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}
const GENERAL_FOUNDATION_RULES = GENERAL_NATAL_USEFUL_T8_RULES.filter(
  rule => rule.taxonomy.category === 'general' && rule.taxonomy.subcategory === 'self_baseline',
);

export const GENERAL_NATAL_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap(pattern => CHANNELS.map(channel => rule(pattern, channel))),
);
export const GENERAL_NATAL_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERNS.flatMap((pattern, order) => CHANNELS.map(channel => ({
    profileId: `PROFILE-${claimType(pattern, channel)}`,
    version: GENERAL_NATAL_MULTIFACTOR_VERSION,
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
export const GENERAL_NATAL_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-SOURCE-BOUNDED-MULTIFACTOR-RESEARCH',
  version: GENERAL_NATAL_MULTIFACTOR_VERSION,
  name: 'General natal multifactor synthesis / internal research',
  methodologyRefs: [
    { id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version },
    { id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version },
    { id: METHOD_ID, version: GENERAL_NATAL_MULTIFACTOR_VERSION },
  ],
  enabledRuleSets: [...new Set([
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(x => x.ruleSetId),
    ...GENERAL_FOUNDATION_RULES.map(x => x.ruleSetId), RULE_SET,
  ])],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-MULTIFACTOR-RESEARCH',
    version: GENERAL_NATAL_MULTIFACTOR_VERSION,
  },
  status: 'research',
});
export function createGeneralNatalMultifactorRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot({
    rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...GENERAL_FOUNDATION_RULES,
      ...GENERAL_NATAL_MULTIFACTOR_RULES],
    methodologies: [GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
      GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY, GENERAL_NATAL_MULTIFACTOR_METHODOLOGY],
    sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
  }, GENERAL_NATAL_MULTIFACTOR_PACK, createdAt);
}
