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

export const GENERAL_MONTHLY_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-GENERAL-MONTHLY-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'general-monthly-t9-segment-activation';
const TENSION_RULE_SET = 'general-monthly-t9-segment-branch-clash-tension';
const SEGMENT_IDS = ['before_jeol', 'after_jeol'] as const;
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export type GeneralMonthlyThemeFamily = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
export type GeneralMonthlySegmentId = (typeof SEGMENT_IDS)[number];

export const GENERAL_MONTHLY_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-MONTHLY-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Monthly Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Product policy for request-scoped monthly interpretation. A civil Asia/Seoul target month is preserved while its exact solar-term jeol boundary splits the month into before/after segments. Each segment stem Ten-God is a bounded activation theme and each resolved segment-to-natal branch clash is only a tension signal. The policy does not authorize deterministic events, luck scores, health outcomes, wealth magnitude, relationship outcomes, or guaranteed timing.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<
  Record<TenGod, { family: GeneralMonthlyThemeFamily; semanticKey: string }>
> = Object.freeze({
  비견: { family: 'peer', semanticKey: 'PEER_SELF_DIRECTION' },
  겁재: { family: 'peer', semanticKey: 'PEER_COMPETITION_COORDINATION' },
  식신: { family: 'output', semanticKey: 'OUTPUT_STEADY_PRODUCTION' },
  상관: { family: 'output', semanticKey: 'OUTPUT_EXPRESSION_CHANGE' },
  편재: { family: 'wealth', semanticKey: 'WEALTH_EXTERNAL_RESOURCES' },
  정재: { family: 'wealth', semanticKey: 'WEALTH_STRUCTURED_RESOURCES' },
  편관: { family: 'officer', semanticKey: 'OFFICER_PRESSURE_RESPONSE' },
  정관: { family: 'officer', semanticKey: 'OFFICER_ROLE_RESPONSIBILITY' },
  편인: { family: 'resource', semanticKey: 'RESOURCE_ALTERNATIVE_LEARNING' },
  정인: { family: 'resource', semanticKey: 'RESOURCE_SUPPORT_LEARNING' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];
const themeSemanticKey = (segmentId: GeneralMonthlySegmentId, tenGod: TenGod): string =>
  `MONTHLY_${segmentId.toUpperCase()}_${TEN_GOD_THEME[tenGod].semanticKey}`;
const tensionSemanticKey = (
  segmentId: GeneralMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): string => `MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${slot.toUpperCase()}`;

export const GENERAL_MONTHLY_THEME_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-GENERAL-MONTHLY-SEGMENT-THEME-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'segmentId',
      'themeFamily',
      'tenGod',
      'activationKind',
      'narrativeRole',
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
      themeFamily: { kind: 'string', enum: ['peer', 'resource', 'output', 'wealth', 'officer'] },
      tenGod: { kind: 'string', enum: TEN_GODS },
      activationKind: { kind: 'literal', value: 'monthly_segment_stem_ten_god' },
      narrativeRole: { kind: 'literal', value: 'primary' },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const GENERAL_MONTHLY_TENSION_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-GENERAL-MONTHLY-SEGMENT-TENSION-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'segmentId',
      'natalPillar',
      'relation',
      'narrativeRole',
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
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const GENERAL_MONTHLY_THEME_CLAIM_TYPE = Object.freeze({
  claimType: 'GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION',
  version: '1.0.0',
  valueSchemaRef: {
    id: GENERAL_MONTHLY_THEME_SCHEMA.schemaId,
    version: GENERAL_MONTHLY_THEME_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const GENERAL_MONTHLY_TENSION_CLAIM_TYPE = Object.freeze({
  claimType: 'GENERAL_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION',
  version: '1.0.0',
  valueSchemaRef: {
    id: GENERAL_MONTHLY_TENSION_SCHEMA.schemaId,
    version: GENERAL_MONTHLY_TENSION_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const GENERAL_MONTHLY_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped monthly segmented theme policy v1',
  description:
    'Projects each solar-term-aware segment stem Ten-God into a bounded monthly phase theme and records resolved segment-to-natal branch clashes as tension signals without deterministic event prediction.',
  assumptions: [
    'The target period is the civil Asia/Seoul month already resolved by the consumer request adapter.',
    'The exact jeol boundary divides the civil month into before/after half-open segments rather than coercing the whole month to one month pillar.',
    'A segment stem Ten-God is an activation theme, not a luck score, outcome guarantee, or proof of a specific event.',
    'A segment branch clash is a tension signal only and cannot establish loss, illness, separation, accident, or another concrete event.',
    'Unknown or ambiguous natal pillars do not authorize fabricated monthly relation claims.',
  ],
  requiredFactTypes: [
    'temporal.targetYear',
    'temporal.targetMonth',
    'temporal.jeolBoundary',
    'temporal.segments',
  ],
  optionalFactTypes: ['temporal.segments.monthlyBranchRelations'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Every monthly claim must remain bound to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'targetMonth',
        mode: 'required',
        rationale: 'Every monthly claim must remain bound to the request-resolved civil target month.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'jeolBoundary',
        mode: 'required',
        rationale: 'Every monthly phase claim must preserve the exact jeol split inside the civil month.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segments',
        mode: 'required',
        rationale: 'Monthly phase semantics are evaluated only from the deterministic before/after segment set.',
      },
    ],
  },
  sourceIds: [GENERAL_MONTHLY_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: GENERAL_MONTHLY_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'MyeongHa Monthly Interpretation Policy v1 bounds the permitted monthly semantics.',
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
      key: 'targetMonth',
      source: 'temporal_fact',
      pathOrClaimType: 'targetMonth',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'jeolBoundary',
      source: 'temporal_fact',
      pathOrClaimType: 'jeolBoundary',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'segments',
      source: 'temporal_fact',
      pathOrClaimType: 'segments',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
  ];
}

function segmentIndex(segmentId: GeneralMonthlySegmentId): 0 | 1 {
  return segmentId === 'before_jeol' ? 0 : 1;
}

function activationRule(segmentId: GeneralMonthlySegmentId, tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  const index = segmentIndex(segmentId);
  return {
    ruleId: `RULE-GENERAL-MONTHLY-T9-${segmentId.toUpperCase()}-${tenGod}`,
    version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'general', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Monthly ${segmentId} ${tenGod} activation theme`,
    description:
      'Emits one bounded monthly segment activation theme only when the request-scoped segment stem Ten-God matches.',
    inputs: corePeriodInputs(),
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'targetMonth' } },
        { op: 'exists', value: { kind: 'input', key: 'jeolBoundary' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'segments', path: `${index}.segmentId` },
          right: { kind: 'literal', value: segmentId },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'segments', path: `${index}.monthlyStemTenGod` },
          right: { kind: 'literal', value: tenGod },
        },
      ],
    },
    output: {
      claimType: GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType,
      subject: 'monthly_period_segment',
      predicate: 'monthly_segment_theme_activation',
      value: {
        semanticKey: themeSemanticKey(segmentId, tenGod),
        segmentId,
        themeFamily: theme.family,
        tenGod,
        activationKind: 'monthly_segment_stem_ten_god',
        narrativeRole: 'primary',
        forbiddenInferences: [
          'deterministic_future_event',
          'luck_score',
          'wealth_magnitude',
          'health_outcome',
          'relationship_outcome',
        ],
      },
      polarity: 'neutral',
      emphasis: segmentId === 'after_jeol' ? 'major' : 'moderate',
      tags: ['research', 'general', 'monthly', 'request-scoped', segmentId, 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(
  segmentId: GeneralMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): RuleDefinition {
  const index = segmentIndex(segmentId);
  return {
    ruleId: `RULE-GENERAL-MONTHLY-T9-${segmentId.toUpperCase()}-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'general', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Monthly ${segmentId} branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved monthly segment-to-natal branch clash as a bounded tension signal without inferring a concrete event.',
    inputs: corePeriodInputs(),
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'segments', path: `${index}.segmentId` },
          right: { kind: 'literal', value: segmentId },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'segments',
            path: `${index}.monthlyBranchRelations.${slot}.status`,
          },
          right: { kind: 'literal', value: 'resolved' },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'segments',
            path: `${index}.monthlyBranchRelations.${slot}.value.relation`,
          },
          right: { kind: 'literal', value: 'clash' },
        },
      ],
    },
    output: {
      claimType: GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      subject: 'monthly_period_segment',
      predicate: 'monthly_segment_branch_clash_tension',
      value: {
        semanticKey: tensionSemanticKey(segmentId, slot),
        segmentId,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        forbiddenInferences: [
          'specific_event',
          'accident_prediction',
          'health_outcome',
          'separation_prediction',
          'financial_loss_prediction',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: ['research', 'general', 'monthly', 'request-scoped', segmentId, 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const GENERAL_MONTHLY_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => TEN_GODS.map((tenGod) => activationRule(segmentId, tenGod))),
);

export const GENERAL_MONTHLY_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) =>
    PILLAR_SLOTS.map((slot) => branchClashRule(segmentId, slot)),
  ),
);

export const GENERAL_MONTHLY_READING_PACK = Object.freeze({
  packId: 'PACK-GENERAL-MONTHLY-READING-CANDIDATE',
  version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
  name: 'General Monthly Reading Research Candidate',
  methodologyRefs: [{ id: METHOD_ID, version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION }],
  enabledRuleSets: [ACTIVATION_RULE_SET, TENSION_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-MONTHLY-READING-RESEARCH',
    version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} satisfies InterpretationPack);

export function createGeneralMonthlyReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...GENERAL_MONTHLY_ACTIVATION_RULES, ...GENERAL_MONTHLY_TENSION_RULES],
      methodologies: [GENERAL_MONTHLY_READING_METHODOLOGY],
      sources: [GENERAL_MONTHLY_POLICY_SOURCE],
      claimTypeDefinitions: [GENERAL_MONTHLY_THEME_CLAIM_TYPE, GENERAL_MONTHLY_TENSION_CLAIM_TYPE],
      claimValueSchemas: [GENERAL_MONTHLY_THEME_SCHEMA, GENERAL_MONTHLY_TENSION_SCHEMA],
    },
    GENERAL_MONTHLY_READING_PACK,
    createdAt,
  );
}
