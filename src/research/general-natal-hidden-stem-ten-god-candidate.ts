import { getTenGod } from 'manseryeok';
import type { HeavenlyStem, TenGod } from '../contracts/calculation.js';
import type {
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  SourceReference,
} from '../contracts/interpretation.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';

type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type HiddenStemSlot = 'year' | 'month' | 'day' | 'hour';

export const GENERAL_NATAL_HIDDEN_STEM_T5_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_HIDDEN_STEM_T5_METHOD_ID =
  'M-GENERAL-NATAL-HIDDEN-STEM-T5-OBSERVATION-V1';
export const GENERAL_NATAL_HIDDEN_STEM_T5_RULE_SET_ID =
  'general-natal-hidden-stem-ten-god-observation';
export const GENERAL_NATAL_HIDDEN_STEM_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const HIDDEN_STEM_INDEXES = [0, 1, 2] as const;
export const GENERAL_NATAL_HIDDEN_STEM_DAY_STEMS: readonly HeavenlyStem[] = [
  '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계',
];
export const GENERAL_NATAL_HIDDEN_STEM_FAMILY_TEN_GODS: Readonly<
  Record<Family, readonly TenGod[]>
> = {
  peer: ['비견', '겁재'],
  resource: ['정인', '편인'],
  output: ['식신', '상관'],
  wealth: ['정재', '편재'],
  officer: ['정관', '편관'],
};

export const GENERAL_NATAL_HIDDEN_STEM_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-YUANHAI-HIDDEN-STEMS-WIKISOURCE',
  sourceType: 'classical_text',
  title: '淵海子平',
  language: 'zh-Hant',
  locator: {
    section: '論天干地支暗藏總訣 / 又地支藏遁歌',
  },
  url: 'https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3',
  accessedAt: '2026-11-21',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
  notes:
    'The Wikisource page marks the transcription incomplete and its scan source unverified. Used only to identify hidden-stem contents and positions; not as authority for strength, prominence, fortune polarity, or outcomes.',
} satisfies SourceReference);

export const GENERAL_NATAL_HIDDEN_STEM_SOURCE_REFS: RuleDefinition['sourceRefs'] = [
  {
    sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    supportType: 'interpretive_basis',
    notes: 'Provides the day-master to Ten-God correspondence; only neutral family mapping is used.',
  },
  {
    sourceId: GENERAL_NATAL_HIDDEN_STEM_SOURCE.sourceId,
    supportType: 'interpretive_basis',
    notes: 'Lists hidden-stem contents and positions only; no strength or outcome is inferred.',
  },
];

export const GENERAL_NATAL_HIDDEN_STEM_T5_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: GENERAL_NATAL_HIDDEN_STEM_T5_METHOD_ID,
  version: GENERAL_NATAL_HIDDEN_STEM_T5_VERSION,
  family: 'ten_gods',
  name: 'General natal hidden-stem Ten-God family observation (research)',
  description:
    'Maps each canonical hidden stem against the resolved day master and records family presence in a distinct observation channel.',
  assumptions: [
    'Hidden stems remain separate from visible stems and branch representative Ten-God observations.',
    'Each hidden stem is mapped against the exact resolved day master; only family presence is recorded.',
    'No hidden-stem strength, dominance, rooting, favorable/unfavorable polarity, or life outcome is inferred.',
    'Resolved year, month, and day hidden-stem facts are sufficient for observations independent of the birth hour.',
    'An unavailable hour hidden-stem fact is excluded locally; it does not invalidate resolved year, month, or day observations.',
    'Ambiguous required pillar facts remain unresolved and do not produce a confirmed T5 observation.',
    'This shared observation is research-only and does not authorize any domain-specific conclusion.',
  ],
  requiredFactTypes: [
    'derivedFacts.dayMaster',
    'derivedFacts.hiddenStems.year',
    'derivedFacts.hiddenStems.month',
    'derivedFacts.hiddenStems.day',
  ],
  optionalFactTypes: ['derivedFacts.hiddenStems.hour'],
  sourceIds: [
    GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    GENERAL_NATAL_HIDDEN_STEM_SOURCE.sourceId,
  ],
  status: 'research',
});

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export function generalHiddenStemPresenceCondition(
  tenGods: readonly TenGod[],
  slots: readonly HiddenStemSlot[] = GENERAL_NATAL_HIDDEN_STEM_SLOTS,
): RuleExpression {
  const byDayMaster: RuleExpression[] = GENERAL_NATAL_HIDDEN_STEM_DAY_STEMS.map((dayStem) => {
    const allowedHiddenStems = GENERAL_NATAL_HIDDEN_STEM_DAY_STEMS.filter((hiddenStem) =>
      tenGods.includes(getTenGod(dayStem, hiddenStem)),
    );
    return {
      op: 'and' as const,
      expressions: [
        {
          op: 'eq' as const,
          left: { kind: 'input' as const, key: 'dayMaster', path: 'value' },
          right: { kind: 'literal' as const, value: dayStem },
        },
        {
          op: 'or' as const,
          expressions: slots.flatMap((slot) =>
            HIDDEN_STEM_INDEXES.map((index) => ({
              op: 'in' as const,
              value: {
                kind: 'input' as const,
                key: 'hidden' + slot[0]!.toUpperCase() + slot.slice(1),
                path: String(index),
              },
              set: allowedHiddenStems,
            })),
          ),
        },
      ],
    };
  });
  return {
    op: 'and',
    expressions: [
      { op: 'exists', value: { kind: 'input', key: 'dayMaster', path: 'value' } },
      { op: 'or', expressions: byDayMaster },
    ],
  };
}

function hiddenStemT5Rule(family: Family): RuleDefinition {
  return {
    ruleId: 'RULE-GENERAL-NATAL-T5-' + family.toUpperCase() + '-HIDDEN-STEMS',
    version: GENERAL_NATAL_HIDDEN_STEM_T5_VERSION,
    ruleSetId: GENERAL_NATAL_HIDDEN_STEM_T5_RULE_SET_ID,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: family + '_hidden_stems' },
    methodologyRef: {
      id: GENERAL_NATAL_HIDDEN_STEM_T5_METHOD_ID,
      version: GENERAL_NATAL_HIDDEN_STEM_T5_VERSION,
    },
    title: family + ' Ten-God family observed in hidden stems',
    description:
      'Records hidden-stem family presence as a separate observation channel; it does not score prominence or predict an outcome.',
    inputs: [
      {
        key: 'dayMaster',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.dayMaster',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
      ...GENERAL_NATAL_HIDDEN_STEM_SLOTS.map((slot) => ({
        key: 'hidden' + slot[0]!.toUpperCase() + slot.slice(1),
        source: 'derived_fact' as const,
        pathOrClaimType: 'derivedFacts.hiddenStems.' + slot,
        acceptedStatuses:
          slot === 'hour' ? (['resolved', 'unavailable'] as const) : (['resolved'] as const),
        required: slot !== 'hour',
        ambiguityBehavior: 'scenario_preserving' as const,
      })),
    ],
    condition: generalHiddenStemPresenceCondition(GENERAL_NATAL_HIDDEN_STEM_FAMILY_TEN_GODS[family]),
    output: {
      claimType: 'TEN_GOD_' + family.toUpperCase() + '_HIDDEN_STEMS_THEME',
      subject: 'natal_chart',
      predicate: 'ten_god_theme',
      value: {
        family,
        channel: 'hidden_stems',
        headline: family + ' family observed in hidden stems',
        summary:
          'A hidden-stem Ten-God family is observed. This is a distinct positional observation, not a strength or outcome judgment.',
        fortunePolarity: 'not_determined',
        dominance: 'not_scored',
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'ten-god-theme', 'hidden-stems', 'non-predictive'],
    },
    sourceRefs: GENERAL_NATAL_HIDDEN_STEM_SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}

export const GENERAL_NATAL_HIDDEN_STEM_TEN_GOD_RULES: readonly RuleDefinition[] = Object.freeze(
  (['peer', 'resource', 'output', 'wealth', 'officer'] as const).map(hiddenStemT5Rule),
);
