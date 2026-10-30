import type { MethodologyDefinition, RuleDefinition, SourceReference } from '../contracts/interpretation.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';

export const WEALTH_NATAL_CROSS_CHANNEL_VERSION = '0.1.0-research' as const;
export const WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE =
  'WEALTH_NATAL_CROSS_CHANNEL_SHANGGUAN_WEALTH_OBSERVED' as const;
export const WEALTH_NATAL_CROSS_CHANNEL_SOURCE: SourceReference = Object.freeze({
  sourceId: 'SRC-SAMYEONG-TONGHOE-V5-SHANGGUAN-TO-WEALTH-PRIMARY-WITNESS',
  sourceType: 'classical_text',
  title: '三命通會（四庫全書本）卷五',
  language: 'zh-Hant',
  locator: { volume: '卷05', section: '論傷官' },
  url: 'https://zh.wikisource.org/zh/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B705',
  accessedAt: '2026-10-30',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
  notes: 'The original 論傷官 says 傷盡則能生財 and requires further conditions. '
    + 'This source supports that the two concepts are discussed together; it does '
    + 'NOT verify 傷盡, 身旺, 財旺, cross-channel activation, money outcomes, or any official Claim.',
} satisfies SourceReference);
export const WEALTH_NATAL_CROSS_CHANNEL_METHOD: MethodologyDefinition = Object.freeze({
  methodologyId: 'M-WEALTH-NATAL-CROSS-CHANNEL-OBSERVATION-V1',
  version: WEALTH_NATAL_CROSS_CHANNEL_VERSION,
  family: 'domain_synthesis',
  name: 'Separate stem Shangguan and branch Wealth facts for source-qualified comparison only',
  description: 'Research-only comparison of two actually emitted T5 observations '
    + 'across different canonical channels; does not assert generation or usable wealth.',
  assumptions: [
    'A matched output T5 is not itself proof of 傷官: the actual resolved stem must equal 상관.',
    'A matched wealth T5 must have an actually resolved branch representative 정재/편재.',
    'The primary text gives a conditional 傷官/財 relation, not permission to infer that '
      + 'two different channels generate money or that 傷官傷盡 was established.',
    'Neither the presence nor count of these families establishes strength, timing, outcomes, '
      + 'net worth, real-life behaviour, or an independently complete wealth synthesis.',
    'Only research comparison can be shown; production, commerce and Official remain held.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [
    GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    WEALTH_NATAL_CROSS_CHANNEL_SOURCE.sourceId,
  ],
  status: 'research',
});
const stemPaths = ['year', 'month', 'hour'] as const;
const branchPaths = ['year', 'month', 'day', 'hour'] as const;
export const WEALTH_NATAL_CROSS_CHANNEL_RULE: RuleDefinition = Object.freeze({
  ruleId: 'RULE-' + WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE,
  version: WEALTH_NATAL_CROSS_CHANNEL_VERSION,
  ruleSetId: 'wealth-natal-cross-channel-primary-source-comparison',
  taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'cross_channel_comparison_research_only' },
  methodologyRef: {
    id: WEALTH_NATAL_CROSS_CHANNEL_METHOD.methodologyId,
    version: WEALTH_NATAL_CROSS_CHANNEL_VERSION,
  },
  title: '상관 천간과 재성 지지의 제한된 출처 비교',
  description: 'Source-grounded research contrast, explicitly not a same-channel Wealth T8 core.',
  inputs: [
    { key: 'outputStem', source: 'interpretation_claim',
      pathOrClaimType: 'TEN_GOD_OUTPUT_VISIBLE_STEMS_THEME', required: true,
      cardinality: 'exactly_one', ambiguityBehavior: 'scenario_preserving' },
    { key: 'wealthBranch', source: 'interpretation_claim',
      pathOrClaimType: 'TEN_GOD_WEALTH_BRANCHES_THEME', required: true,
      cardinality: 'exactly_one', ambiguityBehavior: 'scenario_preserving' },
    { key: 'tenGods', source: 'derived_fact', pathOrClaimType: 'derivedFacts.tenGods',
      acceptedStatuses: ['resolved'], required: true, ambiguityBehavior: 'requires_resolved' },
  ],
  condition: {
    op: 'and', expressions: [
      { op: 'exists', value: { kind: 'input', key: 'outputStem' } },
      { op: 'exists', value: { kind: 'input', key: 'wealthBranch' } },
      { op: 'or', expressions: stemPaths.map(slot => ({
        op: 'in' as const,
        value: { kind: 'input' as const, key: 'tenGods', path: slot + '.stem.value' },
        set: ['상관'],
      })) },
      { op: 'or', expressions: branchPaths.map(slot => ({
        op: 'in' as const,
        value: { kind: 'input' as const, key: 'tenGods', path: slot + '.branch.value' },
        set: ['편재', '정재'],
      })) },
    ],
  },
  output: {
    claimType: WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE,
    subject: 'natal_chart',
    predicate: 'wealth_cross_channel_source_comparison',
    value: {
      pattern: 'SHANGGUAN_STEMS_WEALTH_BRANCHES',
      observedOnly: true,
      crossChannelSynthesisAuthorized: false,
      sourceConditionalSatisfied: false,
      completeWealthMeaningAuthorized: false,
      financialOutcomeAuthorized: false,
      officialPublicationAuthorized: false,
    },
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'wealth', 'primary-text-conditional', 'cross-channel-observation-only'],
  },
  sourceRefs: [
    { sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      supportType: 'interpretive_basis', notes: 'Original T5 terms only.' },
    { sourceId: WEALTH_NATAL_CROSS_CHANNEL_SOURCE.sourceId,
      supportType: 'direct_basis', notes: 'Conditional 傷官-to-財 primary text, not a fulfilled condition.' },
  ],
  quality: {
    provenanceQuality: 'secondary_only',
    testCoverage: 'examples',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
} satisfies RuleDefinition);
