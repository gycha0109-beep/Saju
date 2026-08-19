import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

const RULE_SET_ID = 'i7-seasonal-support-research';
const METHODOLOGY_ID = 'METHOD-I7-SEASONAL-SUPPORT-SIGNAL';
const METHODOLOGY_VERSION = '0.1.0-research';

export const I7_RESEARCH_SOURCES = Object.freeze({
  ditianSui: {
    sourceId: 'SRC-I7-DITIANSUI-WIKISOURCE',
    sourceType: 'classical_text',
    title: '滴天髓',
    author: '傳劉基',
    language: 'zh-Hant',
    locator: {
      section: '體用論 / 精神論 / 衰旺論 / 月令論',
    },
    url: 'https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93',
    accessedAt: '2026-08-19',
    provenanceTier: 'cross_reference',
    rights: {
      license: 'Wikisource transcription CC BY-SA 4.0; underlying classical work public domain',
      copyrightStatus: 'public_domain',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Research-only transcription reference. Used for the importance of month-order context and the explicit caution against one-sided strength conclusions; not treated as a verified critical edition.',
  } satisfies SourceReference,
  wuxingDayi: {
    sourceId: 'SRC-I7-WUXING-DAYI-WIKISOURCE',
    sourceType: 'classical_text',
    title: '五行大義',
    author: '蕭吉',
    language: 'zh-Hant',
    locator: {
      volume: '卷二',
      section: '第四論相生 / 三者論四時休王',
    },
    url: 'https://zh.wikisource.org/zh-hant/%E4%BA%94%E8%A1%8C%E5%A4%A7%E7%BE%A9/2',
    accessedAt: '2026-08-19',
    provenanceTier: 'cross_reference',
    rights: {
      license: 'Wikisource transcription CC BY-SA 4.0; underlying classical work public domain',
      copyrightStatus: 'public_domain',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Research-only transcription reference for the five-element generating sequence and seasonal flourishing framework. No verbatim source text is embedded in runtime output.',
  } satisfies SourceReference,
});

export const I7_SEASONAL_SUPPORT_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHODOLOGY_ID,
  version: METHODOLOGY_VERSION,
  family: 'day_master_strength',
  name: 'Month-order seasonal support signal (research)',
  description:
    'Produces a narrow seasonal support signal from the elemental relationship between the day stem and month branch. It is explicitly not an overall day-master strength classification.',
  assumptions: [
    'Month-order context is material to later strength analysis.',
    'Same-element or generating-element seasonal context may be represented as a supportive signal only.',
    'A seasonal support signal is partial evidence and must not by itself classify the day master as strong or weak.',
  ],
  requiredFactTypes: ['pillars.day', 'pillars.month'],
  sourceIds: [
    I7_RESEARCH_SOURCES.ditianSui.sourceId,
    I7_RESEARCH_SOURCES.wuxingDayi.sourceId,
  ],
  status: 'research',
});

const scenarioInputs: RuleDefinition['inputs'] = [
  {
    key: 'day',
    source: 'canonical_fact',
    pathOrClaimType: 'pillars.day',
    acceptedStatuses: ['resolved'],
    required: true,
    ambiguityBehavior: 'scenario_preserving',
  },
  {
    key: 'month',
    source: 'canonical_fact',
    pathOrClaimType: 'pillars.month',
    acceptedStatuses: ['resolved'],
    required: true,
    ambiguityBehavior: 'scenario_preserving',
  },
];

const researchQuality: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export const I7_SEASONAL_SUPPORT_RULES: readonly RuleDefinition[] = Object.freeze([
  {
    ruleId: 'RULE-I7-SEASONAL-SAME-ELEMENT',
    version: '0.1.0-research',
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'seasonal_support_signal',
    },
    methodologyRef: { id: METHODOLOGY_ID, version: METHODOLOGY_VERSION },
    title: 'Month branch shares the day-stem element',
    description:
      'Research signal only: records same-element seasonal context without classifying overall day-master strength.',
    inputs: scenarioInputs,
    condition: {
      op: 'eq',
      left: { kind: 'input', key: 'day', path: 'stem.element' },
      right: { kind: 'input', key: 'month', path: 'branch.element' },
    },
    output: {
      claimType: 'CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL',
      subject: 'day_master',
      predicate: 'seasonal_support',
      value: {
        kind: 'same_element',
        scope: 'month_branch_only',
        overallStrength: 'not_determined',
      },
      polarity: 'supportive',
      emphasis: 'minor',
      tags: ['research', 'seasonal-context', 'non-conclusive'],
    },
    sourceRefs: [
      {
        sourceId: I7_RESEARCH_SOURCES.ditianSui.sourceId,
        supportType: 'interpretive_basis',
        notes: 'Month-order context is material, but the source also cautions against one-sided conclusions.',
      },
      {
        sourceId: I7_RESEARCH_SOURCES.wuxingDayi.sourceId,
        supportType: 'corroboration',
        notes: 'Provides the seasonal flourishing framework used only as structural context.',
      },
    ],
    quality: researchQuality,
    status: 'research',
  },
  {
    ruleId: 'RULE-I7-SEASONAL-GENERATING-ELEMENT',
    version: '0.1.0-research',
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'seasonal_support_signal',
    },
    methodologyRef: { id: METHODOLOGY_ID, version: METHODOLOGY_VERSION },
    title: 'Month branch element generates the day-stem element',
    description:
      'Research signal only: records a generating elemental relationship from month branch to day stem without classifying overall strength.',
    inputs: scenarioInputs,
    condition: {
      op: 'or',
      expressions: [
        {
          op: 'and',
          expressions: [
            { op: 'eq', left: { kind: 'input', key: 'month', path: 'branch.element' }, right: { kind: 'literal', value: '수' } },
            { op: 'eq', left: { kind: 'input', key: 'day', path: 'stem.element' }, right: { kind: 'literal', value: '목' } },
          ],
        },
        {
          op: 'and',
          expressions: [
            { op: 'eq', left: { kind: 'input', key: 'month', path: 'branch.element' }, right: { kind: 'literal', value: '목' } },
            { op: 'eq', left: { kind: 'input', key: 'day', path: 'stem.element' }, right: { kind: 'literal', value: '화' } },
          ],
        },
        {
          op: 'and',
          expressions: [
            { op: 'eq', left: { kind: 'input', key: 'month', path: 'branch.element' }, right: { kind: 'literal', value: '화' } },
            { op: 'eq', left: { kind: 'input', key: 'day', path: 'stem.element' }, right: { kind: 'literal', value: '토' } },
          ],
        },
        {
          op: 'and',
          expressions: [
            { op: 'eq', left: { kind: 'input', key: 'month', path: 'branch.element' }, right: { kind: 'literal', value: '토' } },
            { op: 'eq', left: { kind: 'input', key: 'day', path: 'stem.element' }, right: { kind: 'literal', value: '금' } },
          ],
        },
        {
          op: 'and',
          expressions: [
            { op: 'eq', left: { kind: 'input', key: 'month', path: 'branch.element' }, right: { kind: 'literal', value: '금' } },
            { op: 'eq', left: { kind: 'input', key: 'day', path: 'stem.element' }, right: { kind: 'literal', value: '수' } },
          ],
        },
      ],
    },
    output: {
      claimType: 'CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL',
      subject: 'day_master',
      predicate: 'seasonal_support',
      value: {
        kind: 'generating_element',
        scope: 'month_branch_only',
        overallStrength: 'not_determined',
      },
      polarity: 'supportive',
      emphasis: 'minor',
      tags: ['research', 'seasonal-context', 'non-conclusive'],
    },
    sourceRefs: [
      {
        sourceId: I7_RESEARCH_SOURCES.wuxingDayi.sourceId,
        supportType: 'direct_basis',
        notes: 'Provides the traditional five-element generating sequence.',
      },
      {
        sourceId: I7_RESEARCH_SOURCES.ditianSui.sourceId,
        supportType: 'interpretive_basis',
        notes: 'Provides the month-order and support/assistance context while warning against reduction to one factor.',
      },
    ],
    quality: researchQuality,
    status: 'research',
  },
  {
    ruleId: 'RULE-I7-SEASONAL-SCOPE-GUARD',
    version: '0.1.0-research',
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'scope_guard',
    },
    methodologyRef: { id: METHODOLOGY_ID, version: METHODOLOGY_VERSION },
    title: 'Seasonal signal cannot determine overall day-master strength',
    description:
      'Mandatory research guard preventing a month-only signal from being promoted into a strong/weak classification.',
    inputs: scenarioInputs,
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'day', path: 'stem.element' } },
        { op: 'exists', value: { kind: 'input', key: 'month', path: 'branch.element' } },
      ],
    },
    output: {
      claimType: 'CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD',
      subject: 'day_master',
      predicate: 'overall_strength',
      value: {
        status: 'undetermined',
        reason: 'month_order_signal_is_partial_evidence',
      },
      polarity: 'neutral',
      emphasis: 'major',
      tags: ['research', 'guardrail', 'non-conclusive'],
    },
    sourceRefs: [
      {
        sourceId: I7_RESEARCH_SOURCES.ditianSui.sourceId,
        supportType: 'direct_basis',
        notes: 'The cited strength/body-use discussions explicitly reject one-sided analysis and require broader weighing.',
      },
    ],
    quality: researchQuality,
    status: 'research',
  },
]);

export const I7_SEASONAL_SUPPORT_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-I7-SEASONAL-SUPPORT-RESEARCH',
  version: '0.1.0-research',
  name: 'I7 Seasonal Support Research Pack',
  methodologyRefs: [{ id: METHODOLOGY_ID, version: METHODOLOGY_VERSION }],
  enabledRuleSets: [RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-I7-RESEARCH-ONLY', version: '0.1.0' },
  status: 'research',
});

export function createI7SeasonalSupportRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: I7_SEASONAL_SUPPORT_RULES,
      methodologies: [I7_SEASONAL_SUPPORT_METHODOLOGY],
      sources: Object.values(I7_RESEARCH_SOURCES),
    },
    I7_SEASONAL_SUPPORT_PACK,
    createdAt,
  );
}
