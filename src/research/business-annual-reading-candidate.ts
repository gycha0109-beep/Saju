import type { TenGod } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  createBusinessNatalReadingCandidateRegistry,
} from './business-natal-reading-candidate.js';

export const BUSINESS_ANNUAL_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-BUSINESS-ANNUAL-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'business-annual-t9-activation';
const TENSION_RULE_SET = 'business-annual-t9-branch-clash-tension';
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export type BusinessAnnualAxis =
  | 'decision_ownership'
  | 'partner_coordination'
  | 'execution_cadence'
  | 'experimentation_feedback'
  | 'opportunity_allocation'
  | 'budget_discipline'
  | 'pressure_risk_response'
  | 'accountability_governance'
  | 'alternative_research'
  | 'foundation_support';

interface BusinessAnnualThemeSpec {
  axis: BusinessAnnualAxis;
  semanticKey: string;
}

export const BUSINESS_ANNUAL_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-BUSINESS-ANNUAL-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Business Annual Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Business Annual policy. It projects annual temporal facts into bounded operating, decision, resource-allocation, partnership, accountability, and pressure-response tendencies. It forbids deterministic business success, revenue, profit, funding, failure, bankruptcy, market-event, or specific timing predictions and does not authorize financial advice.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, BusinessAnnualThemeSpec>> = Object.freeze({
  비견: { axis: 'decision_ownership', semanticKey: 'BUSINESS_ANNUAL_DECISION_OWNERSHIP' },
  겁재: { axis: 'partner_coordination', semanticKey: 'BUSINESS_ANNUAL_PARTNER_COORDINATION' },
  식신: { axis: 'execution_cadence', semanticKey: 'BUSINESS_ANNUAL_EXECUTION_CADENCE' },
  상관: {
    axis: 'experimentation_feedback',
    semanticKey: 'BUSINESS_ANNUAL_EXPERIMENTATION_FEEDBACK',
  },
  편재: {
    axis: 'opportunity_allocation',
    semanticKey: 'BUSINESS_ANNUAL_OPPORTUNITY_ALLOCATION',
  },
  정재: { axis: 'budget_discipline', semanticKey: 'BUSINESS_ANNUAL_BUDGET_DISCIPLINE' },
  편관: {
    axis: 'pressure_risk_response',
    semanticKey: 'BUSINESS_ANNUAL_PRESSURE_RISK_RESPONSE',
  },
  정관: {
    axis: 'accountability_governance',
    semanticKey: 'BUSINESS_ANNUAL_ACCOUNTABILITY_GOVERNANCE',
  },
  편인: { axis: 'alternative_research', semanticKey: 'BUSINESS_ANNUAL_ALTERNATIVE_RESEARCH' },
  정인: { axis: 'foundation_support', semanticKey: 'BUSINESS_ANNUAL_FOUNDATION_SUPPORT' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];

export const BUSINESS_ANNUAL_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Business Annual policy v1',
  description:
    'Projects the request-scoped annual stem Ten-God into one bounded business operating tendency and records resolved annual-to-natal branch clashes only as business-operating adjustment pressure.',
  assumptions: [
    'The target period is the civil Asia/Seoul year already resolved by the consumer request adapter.',
    'The annual stem Ten-God is interpreted only as a bounded operating, decision, execution, allocation, partnership, accountability, learning, or pressure-response tendency.',
    'No annual claim establishes business success or failure, revenue or profit movement, funding, investment, bankruptcy, market events, founder suitability, a specific industry outcome, or a guaranteed timing event.',
    'Annual branch clash may indicate adjustment pressure around decision rights, resource allocation, partner or team coordination, or operating cadence; it never establishes a concrete business event.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Business Natal T8 remains the existing shared-channel-gated research candidate and is reused without weakening its eligibility semantics or promoting authority.',
    'This interpretation does not authorize financial or investment advice.',
  ],
  requiredFactTypes: ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod'],
  optionalFactTypes: ['temporal.annualBranchRelations'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Binds every Business Annual claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualPillar',
        mode: 'required',
        rationale: 'Binds every Business Annual claim to the request-resolved annual pillar.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualStemTenGod',
        mode: 'required',
        rationale: 'Personalizes Business Annual activation against the natal day master.',
      },
      ...PILLAR_SLOTS.map((slot) => ({
        source: 'temporal_fact' as const,
        pathPattern: `annualBranchRelations.${slot}`,
        mode: 'allowed' as const,
        rationale: 'Optional resolved annual-to-natal branch clash signal.',
      })),
    ],
  },
  sourceIds: [BUSINESS_ANNUAL_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: BUSINESS_ANNUAL_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Business Annual T9 semantics.',
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
    ruleId: `RULE-BUSINESS-ANNUAL-T9-${tenGod}`,
    version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'business', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Business Annual ${tenGod} activation`,
    description: 'Emits one bounded business operating tendency for the resolved annual stem Ten-God.',
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
      claimType: 'BUSINESS_ANNUAL_THEME_ACTIVATION',
      subject: 'annual_period',
      predicate: 'business_annual_theme_activation',
      value: {
        semanticKey: theme.semanticKey,
        businessAxis: theme.axis,
        tenGod,
        activationKind: 'annual_stem_ten_god',
        narrativeRole: 'primary',
        boundedTo: 'business_operating_tendency',
        businessSuccessPredictionAuthorized: false,
        revenueOutcomePredictionAuthorized: false,
        fundingOutcomePredictionAuthorized: false,
        failureOutcomePredictionAuthorized: false,
        specificMarketEventPredictionAuthorized: false,
        specificBusinessEventPredictionAuthorized: false,
        financialAdviceAuthorized: false,
        forbiddenInferences: [
          'business_success_prediction',
          'revenue_or_profit_prediction',
          'funding_prediction',
          'investment_prediction',
          'failure_or_bankruptcy_prediction',
          'specific_market_event_prediction',
          'specific_business_event_prediction',
          'founder_suitability_verdict',
          'specific_industry_outcome',
        ],
      },
      polarity: 'neutral',
      emphasis: 'major',
      tags: ['research', 'business', 'annual', 'request-scoped', 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition {
  return {
    ruleId: `RULE-BUSINESS-ANNUAL-T9-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'business', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Business Annual branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved annual-to-natal branch clash only as bounded business-operating adjustment pressure.',
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
      claimType: 'BUSINESS_ANNUAL_BRANCH_CLASH_TENSION',
      subject: 'annual_period',
      predicate: 'business_annual_branch_clash_tension',
      value: {
        semanticKey: `BUSINESS_ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        boundedTo: 'business_operating_adjustment_pressure',
        adjustmentAreas: [
          'decision_rights',
          'resource_allocation',
          'partner_team_coordination',
          'operating_cadence',
        ],
        businessSuccessPredictionAuthorized: false,
        revenueOutcomePredictionAuthorized: false,
        fundingOutcomePredictionAuthorized: false,
        failureOutcomePredictionAuthorized: false,
        financialAdviceAuthorized: false,
        forbiddenInferences: [
          'business_failure_prediction',
          'bankruptcy_prediction',
          'revenue_loss_prediction',
          'funding_failure_prediction',
          'partner_breakup_prediction',
          'specific_business_event',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: ['research', 'business', 'annual', 'request-scoped', 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const BUSINESS_ANNUAL_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.map(activationRule),
);

export const BUSINESS_ANNUAL_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  PILLAR_SLOTS.map(branchClashRule),
);

export const BUSINESS_ANNUAL_THEME_CLAIM_TYPE = 'BUSINESS_ANNUAL_THEME_ACTIVATION' as const;
export const BUSINESS_ANNUAL_TENSION_CLAIM_TYPE = 'BUSINESS_ANNUAL_BRANCH_CLASH_TENSION' as const;

export function createBusinessAnnualReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  const natalRegistry = createBusinessNatalReadingCandidateRegistry(createdAt);
  const annualRules = [...BUSINESS_ANNUAL_ACTIVATION_RULES, ...BUSINESS_ANNUAL_TENSION_RULES];
  const allRules = [...natalRegistry.rules, ...annualRules];
  const enabledRuleSets = [...new Set(allRules.map((rule) => rule.ruleSetId))];
  const pack: InterpretationPack = Object.freeze({
    packId: 'PACK-BUSINESS-ANNUAL-READING-CANDIDATE',
    version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
    name: 'Business Annual Reading Research Candidate',
    methodologyRefs: [
      ...natalRegistry.pack.methodologyRefs,
      { id: METHOD_ID, version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION },
    ],
    enabledRuleSets,
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: {
      id: 'COMPOSITION-BUSINESS-ANNUAL-READING-RESEARCH',
      version: BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
    },
    status: 'research',
  });

  return createRuleRegistrySnapshot(
    {
      rules: allRules,
      methodologies: [...natalRegistry.methodologies, BUSINESS_ANNUAL_READING_METHODOLOGY],
      sources: [...natalRegistry.sources, BUSINESS_ANNUAL_POLICY_SOURCE],
      claimTypeDefinitions: natalRegistry.claimTypeDefinitions,
      claimValueSchemas: natalRegistry.claimValueSchemas,
      reviewAttestations: natalRegistry.reviewAttestations,
    },
    pack,
    createdAt,
  );
}

export const BUSINESS_ANNUAL_NATAL_REGISTRY_VERSION = BUSINESS_NATAL_READING_CANDIDATE_VERSION;
