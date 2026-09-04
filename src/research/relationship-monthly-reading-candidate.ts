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
  WEALTH_NATAL_READING_METHODOLOGY,
  WEALTH_NATAL_READING_RULES,
} from './wealth-natal-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-RELATIONSHIP-MONTHLY-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'relationship-monthly-t9-segment-activation';
const TENSION_RULE_SET = 'relationship-monthly-t9-segment-branch-clash-tension';
const SEGMENT_IDS = ['before_jeol', 'after_jeol'] as const;
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export type RelationshipMonthlySegmentId = (typeof SEGMENT_IDS)[number];
export type RelationshipMonthlyAxis =
  | 'autonomy_reciprocity'
  | 'boundary_negotiation'
  | 'steady_expression'
  | 'communication_change'
  | 'social_openness'
  | 'consistent_reciprocity'
  | 'interaction_pressure'
  | 'role_clarity'
  | 'reflective_distance'
  | 'support_receptivity';

interface RelationshipMonthlyThemeSpec {
  axis: RelationshipMonthlyAxis;
  semanticSuffix: string;
}

export const RELATIONSHIP_MONTHLY_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-RELATIONSHIP-MONTHLY-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Relationship Monthly Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Relationship Monthly policy. It preserves the civil target month and exact jeol split, projects each active monthly stem Ten-God into bounded interaction, communication, reciprocity, boundary, and pacing tendencies, and treats resolved branch clashes only as relationship-adjustment pressure. It forbids deterministic encounter, partner, marriage, breakup, reconciliation, pregnancy, fidelity, or contact predictions.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, RelationshipMonthlyThemeSpec>> = Object.freeze({
  비견: { axis: 'autonomy_reciprocity', semanticSuffix: 'AUTONOMY_RECIPROCITY' },
  겁재: { axis: 'boundary_negotiation', semanticSuffix: 'BOUNDARY_NEGOTIATION' },
  식신: { axis: 'steady_expression', semanticSuffix: 'STEADY_EXPRESSION' },
  상관: { axis: 'communication_change', semanticSuffix: 'COMMUNICATION_RENEGOTIATION' },
  편재: { axis: 'social_openness', semanticSuffix: 'SOCIAL_OPENNESS' },
  정재: { axis: 'consistent_reciprocity', semanticSuffix: 'CONSISTENT_RECIPROCITY' },
  편관: { axis: 'interaction_pressure', semanticSuffix: 'INTERACTION_PRESSURE_RESPONSE' },
  정관: { axis: 'role_clarity', semanticSuffix: 'ROLE_EXPECTATION_CLARITY' },
  편인: { axis: 'reflective_distance', semanticSuffix: 'REFLECTIVE_DISTANCE' },
  정인: { axis: 'support_receptivity', semanticSuffix: 'SUPPORT_RECEPTIVITY' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];

const themeSemanticKey = (segmentId: RelationshipMonthlySegmentId, tenGod: TenGod): string =>
  `RELATIONSHIP_MONTHLY_${segmentId.toUpperCase()}_${TEN_GOD_THEME[tenGod].semanticSuffix}`;
const tensionSemanticKey = (
  segmentId: RelationshipMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): string => `RELATIONSHIP_MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${slot.toUpperCase()}`;

export const RELATIONSHIP_MONTHLY_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Relationship Monthly segmented policy v1',
  description:
    'Projects each solar-term-aware monthly segment stem Ten-God into one bounded relationship tendency and records resolved segment-to-natal branch clashes only as interaction-adjustment pressure.',
  assumptions: [
    'The target period is the civil Asia/Seoul month already resolved by the consumer request adapter.',
    'The exact jeol boundary divides the civil month into before/after half-open segments rather than coercing the whole month to one month pillar.',
    'Each segment stem Ten-God is interpreted only as a bounded interaction, communication, reciprocity, boundary, or pacing tendency.',
    'No monthly claim establishes that a specific person appears, contacts the native, enters a relationship, marries, separates, reconciles, becomes pregnant, or behaves faithfully or unfaithfully.',
    'A segment branch clash may indicate adjustment pressure around communication, expectations, boundaries, or relational pace; it never establishes a breakup, conflict event, divorce, or other concrete relationship event.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Relationship Natal T8 remains the existing research candidate and is reused without rewriting or authority promotion.',
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
        rationale: 'Binds every Relationship Monthly claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'targetMonth',
        mode: 'required',
        rationale: 'Binds every Relationship Monthly claim to the request-resolved civil target month.',
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
        rationale: 'Personalizes each Relationship Monthly activation against the natal day master.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'segmentsById.*.monthlyBranchRelations.*.relation',
        mode: 'allowed',
        rationale: 'Optional resolved monthly-segment-to-natal branch clash signal.',
      },
    ],
  },
  sourceIds: [RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Relationship Monthly T9 semantics.',
    },
  ];
}

function segmentPath(segmentId: RelationshipMonthlySegmentId, suffix: string): string {
  return `segmentsById.${segmentId}.${suffix}`;
}

function corePeriodInputs(segmentId: RelationshipMonthlySegmentId): RuleDefinition['inputs'] {
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

function activationRule(segmentId: RelationshipMonthlySegmentId, tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  return {
    ruleId: `RULE-RELATIONSHIP-MONTHLY-T9-${segmentId.toUpperCase()}-${tenGod}`,
    version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'relationship', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Relationship Monthly ${segmentId} ${tenGod} activation`,
    description:
      'Emits one bounded relationship tendency when the request-scoped monthly segment stem Ten-God matches.',
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
      claimType: RELATIONSHIP_MONTHLY_THEME_CLAIM_TYPE,
      subject: 'monthly_period_segment',
      predicate: 'relationship_monthly_segment_theme_activation',
      value: {
        semanticKey: themeSemanticKey(segmentId, tenGod),
        segmentId,
        relationshipAxis: theme.axis,
        tenGod,
        activationKind: 'monthly_segment_stem_ten_god',
        narrativeRole: 'primary',
        boundedTo: 'relationship_interaction_tendency',
        specificPersonPredictionAuthorized: false,
        relationshipOutcomePredictionAuthorized: false,
        forbiddenInferences: [
          'specific_person_appearance_prediction',
          'specific_person_contact_prediction',
          'dating_outcome_prediction',
          'marriage_prediction',
          'breakup_prediction',
          'reconciliation_prediction',
          'pregnancy_prediction',
          'fidelity_inference',
        ],
      },
      polarity: 'neutral',
      emphasis: segmentId === 'after_jeol' ? 'major' : 'moderate',
      tags: ['research', 'relationship', 'monthly', 'request-scoped', segmentId, 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(
  segmentId: RelationshipMonthlySegmentId,
  slot: (typeof PILLAR_SLOTS)[number],
): RuleDefinition {
  return {
    ruleId: `RULE-RELATIONSHIP-MONTHLY-T9-${segmentId.toUpperCase()}-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'relationship', subcategory: 'monthly' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION },
    title: `Relationship Monthly ${segmentId} branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved monthly-segment-to-natal branch clash only as bounded relationship interaction-adjustment pressure.',
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
      claimType: RELATIONSHIP_MONTHLY_TENSION_CLAIM_TYPE,
      subject: 'monthly_period_segment',
      predicate: 'relationship_monthly_segment_branch_clash_tension',
      value: {
        semanticKey: tensionSemanticKey(segmentId, slot),
        segmentId,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        boundedTo: 'relationship_interaction_adjustment_pressure',
        adjustmentAreas: ['communication', 'expectations', 'boundaries', 'relational_pace'],
        specificPersonPredictionAuthorized: false,
        relationshipOutcomePredictionAuthorized: false,
        forbiddenInferences: [
          'breakup_prediction',
          'divorce_prediction',
          'conflict_event_prediction',
          'reconciliation_prediction',
          'specific_relationship_event',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: [
        'research',
        'relationship',
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

export const RELATIONSHIP_MONTHLY_THEME_CLAIM_TYPE =
  'RELATIONSHIP_MONTHLY_SEGMENT_THEME_ACTIVATION' as const;
export const RELATIONSHIP_MONTHLY_TENSION_CLAIM_TYPE =
  'RELATIONSHIP_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION' as const;

export const RELATIONSHIP_MONTHLY_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => TEN_GODS.map((tenGod) => activationRule(segmentId, tenGod))),
);

export const RELATIONSHIP_MONTHLY_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  SEGMENT_IDS.flatMap((segmentId) => PILLAR_SLOTS.map((slot) => branchClashRule(segmentId, slot))),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
  ...RELATIONSHIP_NATAL_READING_RULES,
  ...RELATIONSHIP_MONTHLY_ACTIVATION_RULES,
  ...RELATIONSHIP_MONTHLY_TENSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const RELATIONSHIP_MONTHLY_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-RELATIONSHIP-MONTHLY-READING-CANDIDATE',
  version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
  name: 'Relationship Monthly Reading Research Candidate',
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
      version: WEALTH_NATAL_READING_METHODOLOGY.version,
    },
    {
      id: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
      version: RELATIONSHIP_NATAL_READING_METHODOLOGY.version,
    },
    { id: METHOD_ID, version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-RELATIONSHIP-MONTHLY-READING-RESEARCH',
    version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createRelationshipMonthlyReadingCandidateRegistry(
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
        RELATIONSHIP_NATAL_READING_METHODOLOGY,
        RELATIONSHIP_MONTHLY_READING_METHODOLOGY,
      ],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        RELATIONSHIP_MONTHLY_POLICY_SOURCE,
      ],
    },
    RELATIONSHIP_MONTHLY_READING_PACK,
    createdAt,
  );
}
