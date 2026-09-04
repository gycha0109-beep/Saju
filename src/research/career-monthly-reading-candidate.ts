import type { TenGod } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import {
  careerTenGodClaimType,
  type CareerConclusionKind,
  type CareerTenGodChannel,
} from './career-natal-reading-schema.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

export const CAREER_MONTHLY_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-CAREER-MONTHLY-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'career-monthly-t9-segment-activation';
const TENSION_RULE_SET = 'career-monthly-t9-segment-branch-clash-tension';
const SEGMENT_IDS = ['before_jeol', 'after_jeol'] as const;
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export type CareerMonthlySegmentId = (typeof SEGMENT_IDS)[number];
export type CareerMonthlyAxis =
  | 'self_direction'
  | 'coordination'
  | 'production'
  | 'expression_change'
  | 'external_resources'
  | 'structured_resources'
  | 'pressure_response'
  | 'formal_responsibility'
  | 'alternative_learning'
  | 'foundation_learning';

interface CareerMonthlyThemeSpec {
  axis: CareerMonthlyAxis;
  semanticKey: string;
}

export const CAREER_MONTHLY_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-CAREER-MONTHLY-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Career Monthly Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Career Monthly policy. It preserves the civil target month and exact jeol split, projects each active monthly stem Ten-God into bounded career working-pattern tendencies, and treats resolved branch clashes only as work-adjustment pressure. It forbids deterministic employment, firing, resignation, promotion, compensation, or business-success predictions.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, CareerMonthlyThemeSpec>> = Object.freeze({
  비견: { axis: 'self_direction', semanticKey: 'SELF_DIRECTED_WORK_DIRECTION' },
  겁재: { axis: 'coordination', semanticKey: 'PEER_COORDINATION_PRESSURE' },
  식신: { axis: 'production', semanticKey: 'STEADY_PRODUCTION_CADENCE' },
  상관: { axis: 'expression_change', semanticKey: 'EXPRESSION_PROCESS_CHANGE' },
  편재: { axis: 'external_resources', semanticKey: 'EXTERNAL_PROJECT_RESOURCE_HANDLING' },
  정재: { axis: 'structured_resources', semanticKey: 'STRUCTURED_WORK_RESOURCE_MANAGEMENT' },
  편관: { axis: 'pressure_response', semanticKey: 'PRESSURE_ACCOUNTABILITY_RESPONSE' },
  정관: { axis: 'formal_responsibility', semanticKey: 'FORMAL_ROLE_RESPONSIBILITY' },
  편인: { axis: 'alternative_learning', semanticKey: 'ALTERNATIVE_LEARNING_PROBLEM_SOLVING' },
  정인: { axis: 'foundation_learning', semanticKey: 'FORMAL_SUPPORT_FOUNDATION' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];
const CAREER_CHANNELS: readonly CareerTenGodChannel[] = ['visible_stems', 'branches'];
const CAREER_KINDS: readonly CareerConclusionKind[] = ['driver', 'fit', 'environment', 'friction'];

const themeSemanticKey = (segmentId: CareerMonthlySegmentId, tenGod: TenGod): string =>
  `CAREER_MONTHLY_${segmentId.toUpperCase()}_${TEN_GOD_THEME[tenGod].semanticKey}`;
const tensionSemanticKey = (
  segmentId: CareerMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): string => `CAREER_MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${slot.toUpperCase()}`;

export const CAREER_MONTHLY_NATAL_REUSED_CLAIM_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-CAREER-NATAL-REUSED-TEN-GOD-CLAIM-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'careerKind',
      'tenGod',
      'channel',
      'specificOccupationAuthorized',
      'careerSuccessAuthorized',
      'incomeOutcomeAuthorized',
      'futureTimingAuthorized',
      'numericScoringAuthorized',
    ],
    properties: {
      careerKind: { kind: 'string', enum: CAREER_KINDS },
      tenGod: { kind: 'string', enum: TEN_GODS },
      channel: { kind: 'string', enum: CAREER_CHANNELS },
      specificOccupationAuthorized: { kind: 'literal', value: false },
      careerSuccessAuthorized: { kind: 'literal', value: false },
      incomeOutcomeAuthorized: { kind: 'literal', value: false },
      futureTimingAuthorized: { kind: 'literal', value: false },
      numericScoringAuthorized: { kind: 'literal', value: false },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const CAREER_MONTHLY_THEME_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-CAREER-MONTHLY-SEGMENT-THEME-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'segmentId',
      'careerAxis',
      'tenGod',
      'activationKind',
      'narrativeRole',
      'boundedTo',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: {
        kind: 'string',
        enum: SEGMENT_IDS.flatMap((segmentId) =>
          TEN_GODS.map((tenGod) => themeSemanticKey(segmentId, tenGod)),
        ),
      },
      segmentId: { kind: 'string', enum: SEGMENT_IDS },
      careerAxis: { kind: 'string', enum: TEN_GODS.map((god) => TEN_GOD_THEME[god].axis) },
      tenGod: { kind: 'string', enum: TEN_GODS },
      activationKind: { kind: 'literal', value: 'monthly_segment_stem_ten_god' },
      narrativeRole: { kind: 'literal', value: 'primary' },
      boundedTo: { kind: 'literal', value: 'career_working_pattern_tendency' },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const CAREER_MONTHLY_TENSION_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-CAREER-MONTHLY-SEGMENT-TENSION-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'segmentId',
      'natalPillar',
      'relation',
      'narrativeRole',
      'boundedTo',
      'adjustmentAreas',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: {
        kind: 'string',
        enum: SEGMENT_IDS.flatMap((segmentId) =>
          PILLAR_SLOTS.map((slot) => tensionSemanticKey(segmentId, slot)),
        ),
      },
      segmentId: { kind: 'string', enum: SEGMENT_IDS },
      natalPillar: { kind: 'string', enum: PILLAR_SLOTS },
      relation: { kind: 'literal', value: 'clash' },
      narrativeRole: { kind: 'literal', value: 'tension' },
      boundedTo: { kind: 'literal', value: 'work_adjustment_pressure' },
      adjustmentAreas: {
        kind: 'array',
        items: { kind: 'string', enum: ['role', 'schedule', 'team_collaboration', 'working_method'] },
        minItems: 1,
      },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const CAREER_MONTHLY_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS: readonly ClaimTypeDefinition[] =
  Object.freeze(
    CAREER_CHANNELS.flatMap((channel) =>
      TEN_GODS.map((god) => ({
        claimType: careerTenGodClaimType(god, channel),
        version: '1.0.0',
        valueSchemaRef: {
          id: CAREER_MONTHLY_NATAL_REUSED_CLAIM_SCHEMA.schemaId,
          version: CAREER_MONTHLY_NATAL_REUSED_CLAIM_SCHEMA.version,
        },
        scope: 'natal' as const,
        exclusiveValue: true,
        scenarioSensitive: true,
        materialForNarrative: true,
        allowedTaxonomyTiers: ['T8'] as const,
      })),
    ),
  );

export const CAREER_MONTHLY_THEME_CLAIM_TYPE = Object.freeze({
  claimType: 'CAREER_MONTHLY_SEGMENT_THEME_ACTIVATION',
  version: '1.0.0',
  valueSchemaRef: {
    id: CAREER_MONTHLY_THEME_SCHEMA.schemaId,
    version: CAREER_MONTHLY_THEME_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const CAREER_MONTHLY_TENSION_CLAIM_TYPE = Object.freeze({
  claimType: 'CAREER_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION',
  version: '1.0.0',
  valueSchemaRef: {
    id: CAREER_MONTHLY_TENSION_SCHEMA.schemaId,
    version: CAREER_MONTHLY_TENSION_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const CAREER_MONTHLY_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: CAREER_MONTHLY_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Career Monthly segmented policy v1',
  description:
    'Projects each solar-term-aware monthly segment stem Ten-God into a bounded career working-pattern tendency and records resolved segment-to-natal branch clashes only as work-adjustment pressure signals.',
  assumptions: [
    'The target period is the civil Asia/Seoul month already resolved by the consumer request adapter.',
    'The exact jeol boundary divides the civil month into before/after half-open segments rather than coercing the whole month to one month pillar.',
    'Each segment stem Ten-God is interpreted only as a bounded career working-pattern tendency, never as proof of hiring, firing, resignation, promotion, compensation, or business success.',
    'A segment branch clash may indicate adjustment pressure around role, schedule, team or collaboration structure, or working method; it never establishes a concrete career event.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Career Natal T8 remains the existing research candidate and is reused without rewriting or authority promotion.',
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
        rationale: 'Binds every Career Monthly claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'targetMonth',
        mode: 'required',
        rationale: 'Binds every Career Monthly claim to the request-resolved civil target month.',
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
        rationale: 'Personalizes each Career Monthly activation against the natal day master.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.monthlyBranchRelations.*.relation',
        mode: 'allowed',
        rationale: 'Optional resolved monthly-segment-to-natal branch clash signal.',
      },
    ],
  },
  sourceIds: [CAREER_MONTHLY_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: CAREER_MONTHLY_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Career Monthly T9 semantics.',
    },
  ];
}

function segmentPath(segmentId: CareerMonthlySegmentId, suffix: string): string {
  return `segmentsById.${segmentId}.${suffix}`;
}

function corePeriodInputs(segmentId: CareerMonthlySegmentId): RuleDefinition['inputs'] {
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

function activationRule(segmentId: CareerMonthlySegmentId, tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  return {
    ruleId: `RULE-CAREER-MONTHLY-T9-${segmentId.toUpperCase()}-${tenGod}`,
    version: CAREER_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'career', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: CAREER_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Career Monthly ${segmentId} ${tenGod} activation`,
    description:
      'Emits one bounded career working-pattern tendency when the request-scoped monthly segment stem Ten-God matches.',
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
      claimType: CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType,
      subject: 'monthly_period_segment',
      predicate: 'career_monthly_segment_theme_activation',
      value: {
        semanticKey: themeSemanticKey(segmentId, tenGod),
        segmentId,
        careerAxis: theme.axis,
        tenGod,
        activationKind: 'monthly_segment_stem_ten_god',
        narrativeRole: 'primary',
        boundedTo: 'career_working_pattern_tendency',
        forbiddenInferences: [
          'hiring_prediction',
          'firing_prediction',
          'resignation_prediction',
          'job_change_prediction',
          'promotion_prediction',
          'compensation_prediction',
          'business_success_prediction',
        ],
      },
      polarity: 'neutral',
      emphasis: segmentId === 'after_jeol' ? 'major' : 'moderate',
      tags: ['research', 'career', 'monthly', 'request-scoped', segmentId, 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(
  segmentId: CareerMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): RuleDefinition {
  return {
    ruleId: `RULE-CAREER-MONTHLY-T9-${segmentId.toUpperCase()}-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: CAREER_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'career', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: CAREER_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Career Monthly ${segmentId} branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved monthly-segment-to-natal branch clash only as bounded career work-adjustment pressure.',
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
      claimType: CAREER_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      subject: 'monthly_period_segment',
      predicate: 'career_monthly_segment_branch_clash_tension',
      value: {
        semanticKey: tensionSemanticKey(segmentId, slot),
        segmentId,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        boundedTo: 'work_adjustment_pressure',
        adjustmentAreas: ['role', 'schedule', 'team_collaboration', 'working_method'],
        forbiddenInferences: [
          'firing_prediction',
          'job_loss_prediction',
          'resignation_prediction',
          'job_change_prediction',
          'promotion_prediction',
          'specific_career_event',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: ['research', 'career', 'monthly', 'request-scoped', segmentId, 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const CAREER_MONTHLY_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => TEN_GODS.map((tenGod) => activationRule(segmentId, tenGod))),
);

export const CAREER_MONTHLY_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => PILLAR_SLOTS.map((slot) => branchClashRule(segmentId, slot))),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...CAREER_NATAL_READING_RULES,
  ...CAREER_MONTHLY_ACTIVATION_RULES,
  ...CAREER_MONTHLY_TENSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const CAREER_MONTHLY_READING_PACK = Object.freeze({
  packId: 'PACK-CAREER-MONTHLY-READING-CANDIDATE',
  version: CAREER_MONTHLY_READING_CANDIDATE_VERSION,
  name: 'Career Monthly Reading Research Candidate',
  methodologyRefs: [
    {
      id: CAREER_NATAL_READING_METHODOLOGY.methodologyId,
      version: CAREER_NATAL_READING_CANDIDATE_VERSION,
    },
    { id: METHOD_ID, version: CAREER_MONTHLY_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-MONTHLY-READING-RESEARCH',
    version: CAREER_MONTHLY_READING_CANDIDATE_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} satisfies InterpretationPack);

export function createCareerMonthlyReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...ALL_RULES],
      methodologies: [CAREER_NATAL_READING_METHODOLOGY, CAREER_MONTHLY_READING_METHODOLOGY],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        CAREER_MONTHLY_POLICY_SOURCE,
      ],
      claimTypeDefinitions: [
        ...CAREER_MONTHLY_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS,
        CAREER_MONTHLY_THEME_CLAIM_TYPE,
        CAREER_MONTHLY_TENSION_CLAIM_TYPE,
      ],
      claimValueSchemas: [
        CAREER_MONTHLY_NATAL_REUSED_CLAIM_SCHEMA,
        CAREER_MONTHLY_THEME_SCHEMA,
        CAREER_MONTHLY_TENSION_SCHEMA,
      ],
    },
    CAREER_MONTHLY_READING_PACK,
    createdAt,
  );
}
