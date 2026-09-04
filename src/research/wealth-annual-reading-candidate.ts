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

export const WEALTH_ANNUAL_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-WEALTH-ANNUAL-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'wealth-annual-t9-activation';
const TENSION_RULE_SET = 'wealth-annual-t9-branch-clash-tension';

export type WealthAnnualAxis =
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

interface WealthAnnualThemeSpec {
  axis: WealthAnnualAxis;
  semanticKey: string;
}

export const WEALTH_ANNUAL_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-WEALTH-ANNUAL-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Wealth Annual Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Wealth Annual policy. It projects annual temporal facts into bounded money-management and resource-decision tendencies and forbids deterministic income, return, loss, debt, windfall, market-event, or financial-advice claims.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, WealthAnnualThemeSpec>> = Object.freeze({
  비견: {
    axis: 'autonomy_boundaries',
    semanticKey: 'WEALTH_ANNUAL_AUTONOMY_SPENDING_BOUNDARIES',
  },
  겁재: {
    axis: 'shared_resource_coordination',
    semanticKey: 'WEALTH_ANNUAL_SHARED_RESOURCE_COORDINATION',
  },
  식신: {
    axis: 'value_creation_cadence',
    semanticKey: 'WEALTH_ANNUAL_STEADY_VALUE_CREATION_CADENCE',
  },
  상관: {
    axis: 'spending_expression_change',
    semanticKey: 'WEALTH_ANNUAL_RESOURCE_USE_EXPERIMENTATION',
  },
  편재: {
    axis: 'variable_resource_options',
    semanticKey: 'WEALTH_ANNUAL_VARIABLE_RESOURCE_OPTION_HANDLING',
  },
  정재: {
    axis: 'structured_budgeting',
    semanticKey: 'WEALTH_ANNUAL_STRUCTURED_BUDGETING_ALLOCATION',
  },
  편관: {
    axis: 'obligation_pressure',
    semanticKey: 'WEALTH_ANNUAL_OBLIGATION_PRESSURE_RESPONSE',
  },
  정관: {
    axis: 'formal_financial_rules',
    semanticKey: 'WEALTH_ANNUAL_FORMAL_FINANCIAL_RULES',
  },
  편인: {
    axis: 'exploratory_resource_learning',
    semanticKey: 'WEALTH_ANNUAL_EXPLORATORY_RESOURCE_LEARNING',
  },
  정인: {
    axis: 'financial_foundation',
    semanticKey: 'WEALTH_ANNUAL_FINANCIAL_FOUNDATION_REVIEW',
  },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export const WEALTH_ANNUAL_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Wealth Annual policy v1',
  description:
    'Projects the request-scoped annual stem Ten-God into one bounded wealth-management tendency and records resolved annual-to-natal branch clashes only as financial-plan adjustment pressure.',
  assumptions: [
    'The target period is the civil Asia/Seoul year already resolved by the consumer request adapter.',
    'The annual stem Ten-God is interpreted only as a bounded money-management or resource-decision tendency, never as proof of income, profit, investment return, loss, debt, windfall, or market outcome.',
    'Annual branch clash may indicate adjustment pressure around budget, commitments, shared resources, or spending priorities; it never establishes a concrete financial event.',
    'No output from this candidate constitutes investment, tax, credit, debt, insurance, or other financial advice.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Wealth Natal T8 remains the existing research candidate and is reused without rewriting or authority promotion.',
  ],
  requiredFactTypes: ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod'],
  optionalFactTypes: ['temporal.annualBranchRelations'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Binds every Wealth Annual claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualPillar',
        mode: 'required',
        rationale: 'Binds every Wealth Annual claim to the request-resolved annual pillar.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualStemTenGod',
        mode: 'required',
        rationale: 'Personalizes Wealth Annual activation against the natal day master.',
      },
      ...PILLAR_SLOTS.map((slot) => ({
        source: 'temporal_fact' as const,
        pathPattern: `annualBranchRelations.${slot}`,
        mode: 'allowed' as const,
        rationale: 'Optional resolved annual-to-natal branch clash signal.',
      })),
    ],
  },
  sourceIds: [WEALTH_ANNUAL_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: WEALTH_ANNUAL_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Wealth Annual T9 semantics.',
    },
  ];
}

function corePeriodInputs(): RuleDefinition['inputs'] {
  return [
    {
      key: 'targetYear',
      source: 'temporal_fact',
      pathOrClaimType: 'targetYear',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'annualPillar',
      source: 'temporal_fact',
      pathOrClaimType: 'annualPillar',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
  ];
}

function activationRule(tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  return {
    ruleId: `RULE-WEALTH-ANNUAL-T9-${tenGod}`,
    version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'wealth', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Wealth Annual ${tenGod} activation`,
    description:
      'Emits one bounded wealth-management and resource-decision tendency for the resolved annual stem Ten-God.',
    inputs: [
      ...corePeriodInputs(),
      {
        key: 'annualStemTenGod',
        source: 'temporal_fact',
        pathOrClaimType: 'annualStemTenGod',
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'annualPillar' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'annualStemTenGod' },
          right: { kind: 'literal', value: tenGod },
        },
      ],
    },
    output: {
      claimType: 'WEALTH_ANNUAL_THEME_ACTIVATION',
      subject: 'annual_period',
      predicate: 'wealth_annual_theme_activation',
      value: {
        semanticKey: theme.semanticKey,
        wealthAxis: theme.axis,
        tenGod,
        activationKind: 'annual_stem_ten_god',
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
      emphasis: 'major',
      tags: ['research', 'wealth', 'annual', 'request-scoped', 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition {
  return {
    ruleId: `RULE-WEALTH-ANNUAL-T9-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'wealth', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Wealth Annual branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved annual-to-natal branch clash only as bounded financial-plan adjustment pressure.',
    inputs: [
      ...corePeriodInputs(),
      {
        key: 'relation',
        source: 'temporal_fact',
        pathOrClaimType: `annualBranchRelations.${slot}`,
        required: false,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'annualPillar' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'relation', path: 'relation' },
          right: { kind: 'literal', value: 'clash' },
        },
      ],
    },
    output: {
      claimType: 'WEALTH_ANNUAL_BRANCH_CLASH_TENSION',
      subject: 'annual_period',
      predicate: 'wealth_annual_branch_clash_tension',
      value: {
        semanticKey: `WEALTH_ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`,
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
      tags: ['research', 'wealth', 'annual', 'request-scoped', 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const WEALTH_ANNUAL_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.map(activationRule),
);

export const WEALTH_ANNUAL_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  PILLAR_SLOTS.map(branchClashRule),
);

export const WEALTH_ANNUAL_THEME_CLAIM_TYPE = 'WEALTH_ANNUAL_THEME_ACTIVATION' as const;
export const WEALTH_ANNUAL_TENSION_CLAIM_TYPE = 'WEALTH_ANNUAL_BRANCH_CLASH_TENSION' as const;

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
  ...WEALTH_ANNUAL_ACTIVATION_RULES,
  ...WEALTH_ANNUAL_TENSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const WEALTH_ANNUAL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-WEALTH-ANNUAL-READING-CANDIDATE',
  version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
  name: 'Wealth Annual Reading Research Candidate',
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
    { id: METHOD_ID, version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-WEALTH-ANNUAL-READING-RESEARCH',
    version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createWealthAnnualReadingCandidateRegistry(
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
        WEALTH_ANNUAL_READING_METHODOLOGY,
      ],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        WEALTH_ANNUAL_POLICY_SOURCE,
      ],
    },
    WEALTH_ANNUAL_READING_PACK,
    createdAt,
  );
}
