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

export const BUSINESS_MONTHLY_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-BUSINESS-MONTHLY-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'business-monthly-t9-segment-activation';
const TENSION_RULE_SET = 'business-monthly-t9-segment-branch-clash-tension';
const SEGMENT_IDS = ['before_jeol', 'after_jeol'] as const;
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export type BusinessMonthlySegmentId = (typeof SEGMENT_IDS)[number];
export type BusinessMonthlyAxis =
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

interface BusinessMonthlyThemeSpec {
  axis: BusinessMonthlyAxis;
  semanticSuffix: string;
}

export const BUSINESS_MONTHLY_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-BUSINESS-MONTHLY-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Business Monthly Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Business Monthly policy. It preserves the civil target month and exact jeol split, projects each active monthly stem Ten-God into bounded operating, decision, resource-allocation, partnership, accountability, learning, and pressure-response tendencies, and treats resolved branch clashes only as business-operating adjustment pressure. It forbids deterministic business success, revenue, profit, funding, failure, bankruptcy, market-event, or concrete business-event predictions and does not authorize financial advice.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, BusinessMonthlyThemeSpec>> = Object.freeze({
  비견: { axis: 'decision_ownership', semanticSuffix: 'DECISION_OWNERSHIP' },
  겁재: { axis: 'partner_coordination', semanticSuffix: 'PARTNER_COORDINATION' },
  식신: { axis: 'execution_cadence', semanticSuffix: 'EXECUTION_CADENCE' },
  상관: { axis: 'experimentation_feedback', semanticSuffix: 'EXPERIMENTATION_FEEDBACK' },
  편재: { axis: 'opportunity_allocation', semanticSuffix: 'OPPORTUNITY_ALLOCATION' },
  정재: { axis: 'budget_discipline', semanticSuffix: 'BUDGET_DISCIPLINE' },
  편관: { axis: 'pressure_risk_response', semanticSuffix: 'PRESSURE_RISK_RESPONSE' },
  정관: { axis: 'accountability_governance', semanticSuffix: 'ACCOUNTABILITY_GOVERNANCE' },
  편인: { axis: 'alternative_research', semanticSuffix: 'ALTERNATIVE_RESEARCH' },
  정인: { axis: 'foundation_support', semanticSuffix: 'FOUNDATION_SUPPORT' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];

const themeSemanticKey = (segmentId: BusinessMonthlySegmentId, tenGod: TenGod): string =>
  `BUSINESS_MONTHLY_${segmentId.toUpperCase()}_${TEN_GOD_THEME[tenGod].semanticSuffix}`;
const tensionSemanticKey = (
  segmentId: BusinessMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): string => `BUSINESS_MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${slot.toUpperCase()}`;

export const BUSINESS_MONTHLY_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Business Monthly segmented policy v1',
  description:
    'Projects each solar-term-aware monthly segment stem Ten-God into one bounded business operating tendency and records resolved segment-to-natal branch clashes only as business-operating adjustment pressure.',
  assumptions: [
    'The target period is the civil Asia/Seoul month already resolved by the consumer request adapter.',
    'The exact jeol boundary divides the civil month into before/after half-open segments rather than coercing the whole month to one month pillar.',
    'Each segment stem Ten-God is interpreted only as a bounded operating, decision, execution, allocation, partnership, accountability, learning, or pressure-response tendency.',
    'No monthly claim establishes business success or failure, revenue or profit movement, funding, investment, bankruptcy, market events, founder suitability, a specific industry outcome, or a guaranteed timing event.',
    'A segment branch clash may indicate adjustment pressure around decision rights, resource allocation, partner or team coordination, or operating cadence; it never establishes a concrete business event.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Business Natal T8 remains the existing shared-channel-gated research candidate and is reused without weakening its eligibility semantics or promoting authority.',
    'Business Annual T9 is excluded from Business Monthly product evidence by the reading profile and is not reused here.',
    'This interpretation does not authorize financial or investment advice.',
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
        rationale: 'Binds every Business Monthly claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'targetMonth',
        mode: 'required',
        rationale: 'Binds every Business Monthly claim to the request-resolved civil target month.',
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
        rationale: 'Personalizes each Business Monthly activation against the natal day master.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.monthlyBranchRelations.*.relation',
        mode: 'allowed',
        rationale: 'Optional resolved monthly-segment-to-natal branch clash signal.',
      },
    ],
  },
  sourceIds: [BUSINESS_MONTHLY_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: BUSINESS_MONTHLY_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Business Monthly T9 semantics.',
    },
  ];
}

function segmentPath(segmentId: BusinessMonthlySegmentId, suffix: string): string {
  return `segmentsById.${segmentId}.${suffix}`;
}

function corePeriodInputs(segmentId: BusinessMonthlySegmentId): RuleDefinition['inputs'] {
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

function activationRule(segmentId: BusinessMonthlySegmentId, tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  return {
    ruleId: `RULE-BUSINESS-MONTHLY-T9-${segmentId.toUpperCase()}-${tenGod}`,
    version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'business', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Business Monthly ${segmentId} ${tenGod} activation`,
    description:
      'Emits one bounded business operating tendency when the request-scoped monthly segment stem Ten-God matches.',
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
      claimType: BUSINESS_MONTHLY_THEME_CLAIM_TYPE,
      subject: 'monthly_period_segment',
      predicate: 'business_monthly_segment_theme_activation',
      value: {
        semanticKey: themeSemanticKey(segmentId, tenGod),
        segmentId,
        businessAxis: theme.axis,
        tenGod,
        activationKind: 'monthly_segment_stem_ten_god',
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
      emphasis: segmentId === 'after_jeol' ? 'major' : 'moderate',
      tags: ['research', 'business', 'monthly', 'request-scoped', segmentId, 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(
  segmentId: BusinessMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): RuleDefinition {
  return {
    ruleId: `RULE-BUSINESS-MONTHLY-T9-${segmentId.toUpperCase()}-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'business', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Business Monthly ${segmentId} branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved monthly-segment-to-natal branch clash only as bounded business-operating adjustment pressure.',
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
      claimType: BUSINESS_MONTHLY_TENSION_CLAIM_TYPE,
      subject: 'monthly_period_segment',
      predicate: 'business_monthly_segment_branch_clash_tension',
      value: {
        semanticKey: tensionSemanticKey(segmentId, slot),
        segmentId,
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
      tags: [
        'research',
        'business',
        'monthly',
        'request-scoped',
        segmentId,
        'branch-clash',
        'tension',
      ],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const BUSINESS_MONTHLY_THEME_CLAIM_TYPE =
  'BUSINESS_MONTHLY_SEGMENT_THEME_ACTIVATION' as const;
export const BUSINESS_MONTHLY_TENSION_CLAIM_TYPE =
  'BUSINESS_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION' as const;

export const BUSINESS_MONTHLY_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => TEN_GODS.map((tenGod) => activationRule(segmentId, tenGod))),
);

export const BUSINESS_MONTHLY_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => PILLAR_SLOTS.map((slot) => branchClashRule(segmentId, slot))),
);

export function createBusinessMonthlyReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  const natalRegistry = createBusinessNatalReadingCandidateRegistry(createdAt);
  const monthlyRules = [...BUSINESS_MONTHLY_ACTIVATION_RULES, ...BUSINESS_MONTHLY_TENSION_RULES];
  const allRules = [...natalRegistry.rules, ...monthlyRules];
  const enabledRuleSets = [...new Set(allRules.map((rule) => rule.ruleSetId))];
  const pack: InterpretationPack = Object.freeze({
    packId: 'PACK-BUSINESS-MONTHLY-READING-CANDIDATE',
    version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
    name: 'Business Monthly Reading Research Candidate',
    methodologyRefs: [
      ...natalRegistry.pack.methodologyRefs,
      { id: METHOD_ID, version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION },
    ],
    enabledRuleSets,
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: {
      id: 'COMPOSITION-BUSINESS-MONTHLY-READING-RESEARCH',
      version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
    },
    status: 'research',
  });

  return createRuleRegistrySnapshot(
    {
      rules: allRules,
      methodologies: [...natalRegistry.methodologies, BUSINESS_MONTHLY_READING_METHODOLOGY],
      sources: [...natalRegistry.sources, BUSINESS_MONTHLY_POLICY_SOURCE],
      claimTypeDefinitions: natalRegistry.claimTypeDefinitions,
      claimValueSchemas: natalRegistry.claimValueSchemas,
      reviewAttestations: natalRegistry.reviewAttestations,
    },
    pack,
    createdAt,
  );
}

export const BUSINESS_MONTHLY_NATAL_REGISTRY_VERSION = BUSINESS_NATAL_READING_CANDIDATE_VERSION;
