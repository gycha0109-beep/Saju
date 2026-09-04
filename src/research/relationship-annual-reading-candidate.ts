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

export const RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-RELATIONSHIP-ANNUAL-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'relationship-annual-t9-activation';
const TENSION_RULE_SET = 'relationship-annual-t9-branch-clash-tension';

export type RelationshipAnnualAxis =
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

interface RelationshipAnnualThemeSpec {
  axis: RelationshipAnnualAxis;
  semanticKey: string;
}

export const RELATIONSHIP_ANNUAL_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-RELATIONSHIP-ANNUAL-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Relationship Annual Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Request-scoped Relationship Annual policy. It projects annual temporal facts into bounded interaction, communication, reciprocity, boundary, and pacing tendencies and forbids deterministic encounter, partner, marriage, breakup, reconciliation, pregnancy, fidelity, or contact predictions.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, RelationshipAnnualThemeSpec>> = Object.freeze({
  비견: {
    axis: 'autonomy_reciprocity',
    semanticKey: 'RELATIONSHIP_ANNUAL_AUTONOMY_RECIPROCITY',
  },
  겁재: {
    axis: 'boundary_negotiation',
    semanticKey: 'RELATIONSHIP_ANNUAL_BOUNDARY_NEGOTIATION',
  },
  식신: {
    axis: 'steady_expression',
    semanticKey: 'RELATIONSHIP_ANNUAL_STEADY_EXPRESSION',
  },
  상관: {
    axis: 'communication_change',
    semanticKey: 'RELATIONSHIP_ANNUAL_COMMUNICATION_RENEGOTIATION',
  },
  편재: {
    axis: 'social_openness',
    semanticKey: 'RELATIONSHIP_ANNUAL_SOCIAL_OPENNESS',
  },
  정재: {
    axis: 'consistent_reciprocity',
    semanticKey: 'RELATIONSHIP_ANNUAL_CONSISTENT_RECIPROCITY',
  },
  편관: {
    axis: 'interaction_pressure',
    semanticKey: 'RELATIONSHIP_ANNUAL_INTERACTION_PRESSURE_RESPONSE',
  },
  정관: {
    axis: 'role_clarity',
    semanticKey: 'RELATIONSHIP_ANNUAL_ROLE_EXPECTATION_CLARITY',
  },
  편인: {
    axis: 'reflective_distance',
    semanticKey: 'RELATIONSHIP_ANNUAL_REFLECTIVE_DISTANCE',
  },
  정인: {
    axis: 'support_receptivity',
    semanticKey: 'RELATIONSHIP_ANNUAL_SUPPORT_RECEPTIVITY',
  },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export const RELATIONSHIP_ANNUAL_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Relationship Annual policy v1',
  description:
    'Projects the request-scoped annual stem Ten-God into one bounded relationship tendency and records resolved annual-to-natal branch clashes only as interaction-adjustment pressure.',
  assumptions: [
    'The target period is the civil Asia/Seoul year already resolved by the consumer request adapter.',
    'The annual stem Ten-God is interpreted only as a bounded interaction, communication, reciprocity, boundary, or pacing tendency.',
    'No annual claim establishes that a specific person appears, contacts the native, enters a relationship, marries, separates, reconciles, becomes pregnant, or behaves faithfully or unfaithfully.',
    'Annual branch clash may indicate adjustment pressure around communication, expectations, boundaries, or relational pace; it never establishes a breakup, conflict event, divorce, or other concrete relationship event.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Relationship Natal T8 remains the existing research candidate and is reused without rewriting or authority promotion.',
  ],
  requiredFactTypes: ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod'],
  optionalFactTypes: ['temporal.annualBranchRelations'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Binds every Relationship Annual claim to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualPillar',
        mode: 'required',
        rationale: 'Binds every Relationship Annual claim to the request-resolved annual pillar.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualStemTenGod',
        mode: 'required',
        rationale: 'Personalizes Relationship Annual activation against the natal day master.',
      },
      ...PILLAR_SLOTS.map((slot) => ({
        source: 'temporal_fact' as const,
        pathPattern: `annualBranchRelations.${slot}`,
        mode: 'allowed' as const,
        rationale: 'Optional resolved annual-to-natal branch clash signal.',
      })),
    ],
  },
  sourceIds: [RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'Bounds the permitted Relationship Annual T9 semantics.',
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
    ruleId: `RULE-RELATIONSHIP-ANNUAL-T9-${tenGod}`,
    version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'relationship', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Relationship Annual ${tenGod} activation`,
    description: 'Emits one bounded relationship tendency for the resolved annual stem Ten-God.',
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
      claimType: 'RELATIONSHIP_ANNUAL_THEME_ACTIVATION',
      subject: 'annual_period',
      predicate: 'relationship_annual_theme_activation',
      value: {
        semanticKey: theme.semanticKey,
        relationshipAxis: theme.axis,
        tenGod,
        activationKind: 'annual_stem_ten_god',
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
      emphasis: 'major',
      tags: ['research', 'relationship', 'annual', 'request-scoped', 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition {
  return {
    ruleId: `RULE-RELATIONSHIP-ANNUAL-T9-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'relationship', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Relationship Annual branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved annual-to-natal branch clash only as bounded interaction-adjustment pressure.',
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
      claimType: 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_TENSION',
      subject: 'annual_period',
      predicate: 'relationship_annual_branch_clash_tension',
      value: {
        semanticKey: `RELATIONSHIP_ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`,
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
      tags: ['research', 'relationship', 'annual', 'request-scoped', 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const RELATIONSHIP_ANNUAL_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.map(activationRule),
);

export const RELATIONSHIP_ANNUAL_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  PILLAR_SLOTS.map(branchClashRule),
);

export const RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE = 'RELATIONSHIP_ANNUAL_THEME_ACTIVATION' as const;
export const RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE = 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_TENSION' as const;

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  ...GENERAL_NATAL_USEFUL_T8_RULES,
  ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  ...GENERAL_NATAL_CONCLUSION_RULES,
  ...CAREER_NATAL_READING_RULES,
  ...WEALTH_NATAL_READING_RULES,
  ...RELATIONSHIP_NATAL_READING_RULES,
  ...RELATIONSHIP_ANNUAL_ACTIVATION_RULES,
  ...RELATIONSHIP_ANNUAL_TENSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const RELATIONSHIP_ANNUAL_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-RELATIONSHIP-ANNUAL-READING-CANDIDATE',
  version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
  name: 'Relationship Annual Reading Research Candidate',
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
    { id: METHOD_ID, version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-RELATIONSHIP-ANNUAL-READING-RESEARCH',
    version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createRelationshipAnnualReadingCandidateRegistry(
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
        RELATIONSHIP_ANNUAL_READING_METHODOLOGY,
      ],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        RELATIONSHIP_ANNUAL_POLICY_SOURCE,
      ],
    },
    RELATIONSHIP_ANNUAL_READING_PACK,
    createdAt,
  );
}
