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
import {
  CAREER_TEN_GOD_SEMANTIC_SPECS,
  careerTenGodClaimType,
  type CareerTenGodChannel,
} from './career-natal-reading-schema.js';

export type {
  CareerConclusionKind,
  CareerTenGodChannel,
} from './career-natal-reading-schema.js';
export { careerTenGodClaimType } from './career-natal-reading-schema.js';

export const CAREER_NATAL_READING_CANDIDATE_VERSION = '0.5.0-research' as const;

const METHOD_ID = 'M-CAREER-NATAL-READING-EXACT-TEN-GOD-CHANNEL-V2';
const CAREER_RULE_SET = 'career-natal-exact-ten-god-channel-reading';

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export const CAREER_NATAL_READING_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: CAREER_NATAL_READING_CANDIDATE_VERSION,
  family: 'domain_synthesis',
  name: 'Natal career reading from exact Ten-God subtype and channel (research)',
  description:
    'Projects resolved Ten-God subtypes into bounded career-reading themes while preserving the exact Ten-God identity and visible-stem versus branch channel. Visible-stem observations are the direct consumer career conclusions; branch observations remain supporting career context rather than competing for the headline.',
  assumptions: [
    'Career claims describe bounded work-style tendencies and decision criteria, not deterministic occupation assignment.',
    '비견 and 겁재, 식신 and 상관, 편재 and 정재, 편관 and 정관, 편인 and 정인 remain distinct observations and are not collapsed into a single family sentence.',
    'Visible stems and branches remain separate observation channels; neither channel is converted into a numeric dominance or strength score.',
    'Visible-stem exact Ten-God observations are surfaced as direct career conclusions, while branch exact Ten-God observations are preserved as supporting context so a shared branch theme cannot arbitrarily become the career headline.',
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
  const spec = CAREER_TEN_GOD_SEMANTIC_SPECS[god];
  const channelLabel = channel === 'visible_stems' ? 'visible stems' : 'branches';
  const directConclusion = channel === 'visible_stems';

  return {
    ruleId: `RULE-CAREER-NATAL-${spec.id}-${channel.toUpperCase()}`,
    version: CAREER_NATAL_READING_CANDIDATE_VERSION,
    ruleSetId: CAREER_RULE_SET,
    taxonomy: { tier: 'T8', category: 'career', subcategory: `ten_god_${channel}` },
    methodologyRef: { id: METHOD_ID, version: CAREER_NATAL_READING_CANDIDATE_VERSION },
    title: `${god} career theme in ${channelLabel}`,
    description: directConclusion
      ? 'Projects one exact resolved visible-stem Ten-God subtype into a bounded direct consumer career conclusion without collapsing it into a five-family generic sentence.'
      : 'Preserves one exact resolved branch Ten-God subtype as supporting career context without allowing it to compete arbitrarily for the direct consumer career headline.',
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
      claimType: careerTenGodClaimType(god, channel),
      subject: 'natal_chart',
      predicate: directConclusion ? 'career_conclusion' : 'career_context',
      value: {
        careerKind: spec.kind,
        tenGod: god,
        channel,
        specificOccupationAuthorized: false,
        careerSuccessAuthorized: false,
        incomeOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: directConclusion ? 'moderate' : 'minor',
      tags: [
        'research',
        'career',
        'natal',
        'exact-ten-god',
        channel,
        directConclusion ? 'direct-consumer-conclusion' : 'supporting-context',
        spec.kind,
      ],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

const CAREER_TEN_GODS = Object.keys(CAREER_TEN_GOD_SEMANTIC_SPECS) as TenGod[];
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
