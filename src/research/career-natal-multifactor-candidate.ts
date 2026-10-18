import type {
  InterpretationPack, MethodologyDefinition, RuleDefinition, RuleExpression,
} from '../contracts/interpretation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

/**
 * Source-bounded FIRST multifactor Career T8 experiment.
 *
 * The older career-natal-reading-candidate pack emits one T8 per individual
 * Ten-God subtype; it remains unchanged and is NOT imported into this pack.
 * These new claims consume two independent, chart-resolved T5 channel facts.
 * Coexistence supports a traditional interpretive axis, NOT a personal fact,
 * career aptitude, success, occupation, prediction or a ranked dominance.
 */
export const CAREER_MULTIFACTOR_VERSION = '0.1.0-research' as const;
const METHOD_ID = 'M-CAREER-NATAL-SOURCE-BOUNDED-PAIR-SYNTHESIS-V1';
const RULE_SET = 'career-natal-source-bounded-multifactor';
const CHANNELS = ['visible_stems', 'branches'] as const;
type Channel = typeof CHANNELS[number];
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Axis = 'execution' | 'responsibility' | 'tension';

interface Pattern {
  id: string;
  families: readonly [Family, Family];
  axis: Axis;
  title: string;
  description: string;
}
const PATTERNS: readonly Pattern[] = Object.freeze([
  {
    id: 'OUTPUT_WEALTH',
    families: ['output', 'wealth'],
    axis: 'execution',
    title: '만들어 낸 결과와 자원을 연결하는 일의 구조',
    description: '식상(표현·산출)과 재성(자원·결과)이 함께 관측됩니다. 전통적 식상→재성 관계에 근거하여 일에서 산출물과 그 활용을 연결해 읽는 한 축입니다. 실제 수입이나 직업 적성을 확정하지 않습니다.',
  },
  {
    id: 'OFFICER_RESOURCE',
    families: ['officer', 'resource'],
    axis: 'responsibility',
    title: '요구와 학습·준비를 연결하는 일의 구조',
    description: '관성(규칙·요구)과 인성(학습·준비)이 함께 관측됩니다. 전통적 관성→인성 관계에 근거하여 일의 요구와 체계적 준비를 연결해 읽는 한 축입니다. 실제 승진이나 업무 능력을 확정하지 않습니다.',
  },
  {
    id: 'PEER_OFFICER',
    families: ['peer', 'officer'],
    axis: 'tension',
    title: '자기 기준과 역할·규칙을 함께 살피는 일의 구조',
    description: '비겁(자기 기준·동료)과 관성(규칙·책임)이 함께 관측됩니다. 전통적 견제 관계를 일의 자율성과 역할 경계에 관한 해석 축으로 제한합니다. 실제 갈등이나 직장 사건을 예측하지 않습니다.',
  },
]);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});
const sources = [
  { sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, supportType: 'interpretive_basis' as const,
    notes: 'Research-only Ten-God family/channel themes, not an individual personality fact.' },
  { sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, supportType: 'interpretive_basis' as const,
    notes: 'Research-only classical generation/control relationships, not career outcomes.' },
];

export const CAREER_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: CAREER_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Career natal channel-specific two-T5 structural synthesis (research)',
  description: 'Combines two distinct matched T5 Ten-God family themes in the SAME canonical observation channel to surface a bounded Career structure, never an outcome.',
  assumptions: [
    'A matched pair is a structural interpretation candidate, not the user\'s observed behavior.',
    'Visible stems may form an interpretive headline; branch channel is supporting context.',
    'A shared whole-chart family count does not establish the channel-specific pair.',
    'No numeric dominance, aptitude, salary, named profession, promotion, fortune, future timing, or causal life event is authorized.',
    'Source/interpretation remains contested and research-only; this is not Production/Commerce admission.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
});

function t5ClaimType(family: Family, channel: Channel): string {
  return `TEN_GOD_${family.toUpperCase()}_${channel.toUpperCase()}_THEME`;
}
function patternClaimType(pattern: Pattern, channel: Channel): string {
  return `CAREER_NATAL_MULTIFACTOR_${pattern.id}_${channel.toUpperCase()}`;
}
function ruleFor(pattern: Pattern, channel: Channel): RuleDefinition {
  const input = (key: string, family: Family) => ({
    key,
    source: 'interpretation_claim' as const,
    pathOrClaimType: t5ClaimType(family, channel),
    required: true,
    ambiguityBehavior: 'scenario_preserving' as const,
    cardinality: 'exactly_one' as const,
  });
  const condition: RuleExpression = {
    op: 'and',
    expressions: [
      { op: 'exists', value: { kind: 'input', key: 'left' } },
      { op: 'exists', value: { kind: 'input', key: 'right' } },
    ],
  };
  return {
    ruleId: `RULE-${patternClaimType(pattern, channel)}`,
    version: CAREER_MULTIFACTOR_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'multifactor_structure' },
    methodologyRef: { id: METHOD_ID, version: CAREER_MULTIFACTOR_VERSION },
    title: `${pattern.title} — ${channel}`,
    description: 'Actual two-T5-claim career synthesis in one observed Ten-God channel; research interpretation only.',
    inputs: [input('left', pattern.families[0]), input('right', pattern.families[1])],
    condition,
    output: {
      claimType: patternClaimType(pattern, channel),
      subject: 'natal_chart',
      predicate: 'career_multifactor_structure',
      value: {
        pattern: pattern.id,
        families: [...pattern.families],
        channel,
        axis: pattern.axis,
        causalOutcomeAuthorized: false,
        occupationAuthorized: false,
        careerSuccessAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: channel === 'visible_stems' ? 'major' : 'minor',
      tags: ['research', 'career', 'natal', 'two-upstream-t5', channel, pattern.axis],
    },
    sourceRefs: sources,
    quality: QUALITY,
    status: 'research',
  };
}

export const CAREER_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap(pattern => CHANNELS.map(channel => ruleFor(pattern, channel))),
);

export const CAREER_MULTIFACTOR_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERNS.flatMap((pattern, order) => CHANNELS.map(channel => {
    const claimType = patternClaimType(pattern, channel);
    return {
      profileId: `PROFILE-${claimType}`,
      version: CAREER_MULTIFACTOR_VERSION,
      claimType,
      semanticKeys: ['pattern', 'families', 'channel', 'axis'],
      allowedEpistemicTypes: ['interpretation' as const],
      requiredMethodAttribution: true,
      prohibitedPhrases: ['반드시 성공', '승진한다', '연봉이 오른다', '직업이 정해져'],
      renderingHints: [`axis:${pattern.axis}`, `order:${order}`],
      templates: [
        { templateKey: 'headline', language: 'ko', text: pattern.title },
        { templateKey: 'summary', language: 'ko',
          text: channel === 'branches'
            ? `지지 대표 십신에서 관측되는 보조 맥락입니다. ${pattern.description}`
            : `천간에 드러난 조합에서 관측되는 중심 해석 후보입니다. ${pattern.description}` },
      ],
    };
  })));

export const CAREER_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-CAREER-NATAL-MULTIFACTOR-SOURCE-BOUNDED-RESEARCH',
  version: CAREER_MULTIFACTOR_VERSION,
  name: 'Career multifactor structural interpretation / research only',
  methodologyRefs: [
    { id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version },
    { id: METHOD_ID, version: CAREER_MULTIFACTOR_VERSION },
  ],
  enabledRuleSets: [...new Set([
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(rule => rule.ruleSetId), RULE_SET,
  ])],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-CAREER-MULTIFACTOR-RESEARCH',
    version: CAREER_MULTIFACTOR_VERSION },
  status: 'research',
});

export function createCareerMultifactorResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot({
    rules: [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...CAREER_MULTIFACTOR_RULES],
    methodologies: [GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY, CAREER_MULTIFACTOR_METHODOLOGY],
    sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
  }, CAREER_MULTIFACTOR_PACK, createdAt);
}
