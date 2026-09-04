import type { TenGod } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
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
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_RULES,
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_METHODOLOGY,
  WEALTH_NATAL_READING_RULES,
} from './wealth-natal-reading-candidate.js';

export const WEALTH_MONTHLY_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-WEALTH-MONTHLY-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'wealth-monthly-t9-segment-activation';
const TENSION_RULE_SET = 'wealth-monthly-t9-segment-branch-clash-tension';
const SEGMENT_IDS = ['before_jeol', 'after_jeol'] as const;
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export type WealthMonthlySegmentId = (typeof SEGMENT_IDS)[number];
export type WealthMonthlyAxis =
  | 'autonomy_boundaries'
  | 'shared_resource_coordination'
  | 'value_creation_cadence'
  | 'spending_expression_change'
  | 'variable_resource_options'
  | 'structured_budgeting'
  | 'obligation_pressure'
  | 'formal_financial_rules'
  | 'exploratory_resource_learning'
  | 'financial_foundation';

interface WealthMonthlyThemeSpec {
  axis: WealthMonthlyAxis;
  semanticSuffix: string;
}

export const WEALTH_MONTHLY_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-WEALTH-MONTHLY-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Wealth Monthly Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Wealth Monthly policy. It preserves the civil target month and exact jeol split, projects each active monthly stem Ten-God into bounded money-management and resource-decision tendencies, and treats resolved branch clashes only as financial-plan adjustment pressure. It forbids deterministic income, return, loss, debt, windfall, market-event, or financial-advice claims.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, WealthMonthlyThemeSpec>> = Object.freeze({
  비견: { axis: 'autonomy_boundaries', semanticSuffix: 'AUTONOMY_SPENDING_BOUNDARIES' },
  겁재: { axis: 'shared_resource_coordination', semanticSuffix: 'SHARED_RESOURCE_COORDINATION' },
  식신: { axis: 'value_creation_cadence', semanticSuffix: 'STEADY_VALUE_CREATION_CADENCE' },
  상관: { axis: 'spending_expression_change', semanticSuffix: 'RESOURCE_USE_EXPERIMENTATION' },
  편재: { axis: 'variable_resource_options', semanticSuffix: 'VARIABLE_RESOURCE_OPTION_HANDLING' },
  정재: { axis: 'structured_budgeting', semanticSuffix: 'STRUCTURED_BUDGETING_ALLOCATION' },
  편관: { axis: 'obligation_pressure', semanticSuffix: 'OBLIGATION_PRESSURE_RESPONSE' },
  정관: { axis: 'formal_financial_rules', semanticSuffix: 'FORMAL_FINANCIAL_RULES' },
  편인: { axis: 'exploratory_resource_learning', semanticSuffix: 'EXPLORATORY_RESOURCE_LEARNING' },
  정인: { axis: 'financial_foundation', semanticSuffix: 'FINANCIAL_FOUNDATION_REVIEW' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];

const themeSemanticKey = (segmentId: WealthMonthlySegmentId, tenGod: TenGod): string =>
  `WEALTH_MONTHLY_${segmentId.toUpperCase()}_${TEN_GOD_THEME[tenGod].semanticSuffix}`;
const tensionSemanticKey = (
  segmentId: WealthMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): string => `WEALTH_MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${slot.toUpperCase()}`;

export const WEALTH_MONTHLY_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Wealth Monthly segmented policy v1',
  description:
    'Projects each solar-term-aware monthly segment stem Ten-God into a bounded wealth-management tendency and records resolved segment-to-natal branch clashes only as financial-plan adjustment pressure signals.',
  assumptions: [
    'The target period is the civil Asia/Seoul month already resolved by the consumer request adapter.',
    'The exact jeol boundary divides the civil month into before/after half-open segments rather than coercing the whole month to one month pillar.',
    'Each segment stem Ten-God is interpreted only as a bounded money-management or resource-decision tendency, never as proof of income, profit, investment return, loss, debt, windfall, or market outcome.',
    'A segment branch clash may indicate adjustment pressure around budget, commitments, shared resources, or spending priorities; it never establishes a concrete financial event.',
    'No output from this candidate constitutes investment, tax, credit, debt, insurance, or other financial advice.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Wealth Natal T8 remains the existing research candidate and is reused without rewriting or authority promotion.',
  ],
  requiredFactTypes: [
    'temporal.targetYear',
    'temporal.targetMonth',
    'temporal.jeolBoundary.at',
    'temporal.segmentsById.*.segmentId',
    'temporal.segmentsById.*.monthlyPillar',
    'temporal.segmentsById.*.monthlyStemTenGod',
  ],
  optionalFactTypes: ['temporal.segmentsById.*.monthlyBranchRelations.*.relation'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Binds every Wealth Monthly claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'targetMonth',
        mode: 'required',
        rationale: 'Binds every Wealth Monthly claim to the request-resolved civil target month.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'jeolBoundary.at',
        mode: 'required',
        rationale: 'Preserves the exact jeol split inside the civil month.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.segmentId',
        mode: 'required',
        rationale: 'Identifies the keyed before/after monthly segment.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.monthlyPillar',
        mode: 'required',
        rationale: 'Binds the claim to the actual month pillar active in the segment.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.monthlyStemTenGod',
        mode: 'required',
        rationale: 'Personalizes each Wealth Monthly activation against the natal day master.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.monthlyBranchRelations.*.relation',
        mode: 'allowed',
        rationale: 'Optional resolved monthly-segment-to-natal branch clash signal.',
      },
    ],
  },
  sourceIds: [WEALTH_MONTHLY_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: WEALTH_MONTHLY_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Wealth Monthly T9 semantics.',
    },
  ];
}

function segmentPath(segmentId: WealthMonthlySegmentId, suffix: string): string {
  return `segmentsById.${segmentId}.${suffix}`;
}

function corePeriodInputs(segmentId: WealthMonthlySegmentId): RuleDefinition['inputs'] {
  return [
    {
      key: 'targetYear',
      source: 'temporal_fact',
      pathOrClaimType: 'targetYear',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'targetMonth',
      source: 'temporal_fact',
      pathOrClaimType: 'targetMonth',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'jeolBoundaryAt',
      source: 'temporal_fact',
      pathOrClaimType: 'jeolBoundary.at',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'segmentId',
      source: 'temporal_fact',
      pathOrClaimType: segmentPath(segmentId, 'segmentId'),
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'monthlyPillar',
      source: 'temporal_fact',
      pathOrClaimType: segmentPath(segmentId, 'monthlyPillar'),
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
  ];
}

function activationRule(segmentId: WealthMonthlySegmentId, tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  return {
    ruleId: `RULE-WEALTH-MONTHLY-T9-${segmentId.toUpperCase()}-${tenGod}`,
    version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'wealth', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Wealth Monthly ${segmentId} ${tenGod} activation`,
    description:
      'Emits one bounded wealth-management and resource-decision tendency when the request-scoped monthly segment stem Ten-God matches.',
    inputs: [
      ...corePeriodInputs(segmentId),
      {
        key: 'monthlyStemTenGod',
        source: 'temporal_fact',
        pathOrClaimType: segmentPath(segmentId, 'monthlyStemTenGod'),
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'targetMonth' } },
        { op: 'exists', value: { kind: 'input', key: 'jeolBoundaryAt' } },
        { op: 'exists', value: { kind: 'input', key: 'monthlyPillar' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'segmentId' },
          right: { kind: 'literal', value: segmentId },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'monthlyStemTenGod' },
          right: { kind: 'literal', value: tenGod },
        },
      ],
    },
    output: {
      claimType: WEALTH_MONTHLY_THEME_CLAIM_TYPE,
      subject: 'monthly_period_segment',
      predicate: 'wealth_monthly_segment_theme_activation',
      value: {
        semanticKey: themeSemanticKey(segmentId, tenGod),
        segmentId,
        wealthAxis: theme.axis,
        tenGod,
        activationKind: 'monthly_segment_stem_ten_god',
        narrativeRole: 'primary',
        boundedTo: 'wealth_management_tendency',
        financialAdviceAuthorized: false,
        forbiddenInferences: [
          'income_prediction',
          'investment_return_prediction',
          'loss_prediction',
          'debt_event_prediction',
          'windfall_prediction',
          'market_event_prediction',
          'financial_advice',
        ],
      },
      polarity: 'neutral',
      emphasis: segmentId === 'after_jeol' ? 'major' : 'moderate',
      tags: ['research', 'wealth', 'monthly', 'request-scoped', segmentId, 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(
  segmentId: WealthMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): RuleDefinition {
  return {
    ruleId: `RULE-WEALTH-MONTHLY-T9-${segmentId.toUpperCase()}-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'wealth', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Wealth Monthly ${segmentId} branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved monthly-segment-to-natal branch clash only as bounded financial-plan adjustment pressure.',
    inputs: [
      ...corePeriodInputs(segmentId),
      {
        key: 'relation',
        source: 'temporal_fact',
        pathOrClaimType: segmentPath(segmentId, `monthlyBranchRelations.${slot}.relation`),
        required: false,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'targetMonth' } },
        { op: 'exists', value: { kind: 'input', key: 'jeolBoundaryAt' } },
        { op: 'exists', value: { kind: 'input', key: 'monthlyPillar' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'segmentId' },
          right: { kind: 'literal', value: segmentId },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'relation' },
          right: { kind: 'literal', value: 'clash' },
        },
      ],
    },
    output: {
      claimType: WEALTH_MONTHLY_TENSION_CLAIM_TYPE,
      subject: 'monthly_period_segment',
      predicate: 'wealth_monthly_segment_branch_clash_tension',
      value: {
        semanticKey: tensionSemanticKey(segmentId, slot),
        segmentId,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        boundedTo: 'financial_plan_adjustment_pressure',
        adjustmentAreas: ['budget', 'commitments', 'shared_resources', 'spending_priorities'],
        financialAdviceAuthorized: false,
        forbiddenInferences: [
          'income_prediction',
          'investment_return_prediction',
          'loss_prediction',
          'debt_event_prediction',
          'windfall_prediction',
          'market_event_prediction',
          'specific_financial_event',
          'financial_advice',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: ['research', 'wealth', 'monthly', 'request-scoped', segmentId, 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const WEALTH_MONTHLY_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => TEN_GODS.map((tenGod) => activationRule(segmentId, tenGod))),
);

export const WEALTH_MONTHLY_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => PILLAR_SLOTS.map((slot) => branchClashRule(segmentId, slot))),
);

export const WEALTH_MONTHLY_THEME_CLAIM_TYPE = 'WEALTH_MONTHLY_SEGMENT_THEME_ACTIVATION' as const;
export const WEALTH_MONTHLY_TENSION_CLAIM_TYPE =
  'WEALTH_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION' as const;

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
  ...WEALTH_MONTHLY_ACTIVATION_RULES,
  ...WEALTH_MONTHLY_TENSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const WEALTH_MONTHLY_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-WEALTH-MONTHLY-READING-CANDIDATE',
  version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
  name: 'Wealth Monthly Reading Research Candidate',
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
      version: WEALTH_NATAL_READING_CANDIDATE_VERSION,
    },
    { id: METHOD_ID, version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-WEALTH-MONTHLY-READING-RESEARCH',
    version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createWealthMonthlyReadingCandidateRegistry(
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
        WEALTH_MONTHLY_READING_METHODOLOGY,
      ],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        WEALTH_MONTHLY_POLICY_SOURCE,
      ],
    },
    WEALTH_MONTHLY_READING_PACK,
    createdAt,
  );
}
