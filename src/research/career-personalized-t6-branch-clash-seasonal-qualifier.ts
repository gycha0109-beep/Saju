import type { PillarPairKey } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
  CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA,
  CAREER_T6_QIANLI_NLC_SCAN_SOURCE,
  CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE,
} from './career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VALUE_SCHEMA,
} from './career-personalized-t6-branch-clash-qualifier-context.js';
import {
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE,
} from './i20-relative-force-research-evidence-adapter.js';
import type { SeasonalElementPhase } from './i20-relative-force-evidence.js';

export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION = '0.1.0-research' as const;
export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE =
  'CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER' as const;

const METHOD_ID = 'M-CAREER-T6-BRANCH-CLASH-SEASONAL-QUALIFIER-V1';
const RULE_SET_ID = 'career-t6-branch-clash-seasonal-qualifier';
const CONTEXT_RULE_SET_ID = 'career-t6-branch-clash-hidden-stem-context';
const QUALIFIER_RULE_SET_ID = 'career-t6-branch-clash-qualifier-context';

const PHASES = ['旺', '相', '休', '囚', '死'] as const satisfies readonly SeasonalElementPhase[];
const PILLAR_INDEX = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
} as const;
const PAIR_PARTICIPANTS = {
  year_month: ['year', 'month'],
  year_day: ['year', 'day'],
  year_hour: ['year', 'hour'],
  month_day: ['month', 'day'],
  month_hour: ['month', 'hour'],
  day_hour: ['day', 'hour'],
} as const satisfies Readonly<
  Record<
    PillarPairKey,
    readonly [
      'year' | 'month' | 'day' | 'hour',
      'year' | 'month' | 'day' | 'hour',
    ]
  >
>;

const PHASE_ID = {
  旺: 'WANG',
  相: 'XIANG',
  休: 'XIU',
  囚: 'QIU',
  死: 'SI',
} as const satisfies Readonly<Record<SeasonalElementPhase, string>>;

const FORBIDDEN_INFERENCES = [
  'seasonal_strength_verdict',
  'relative_force_verdict',
  'numeric_strength_or_weight',
  'interaction_winner',
  'interaction_loser',
  'activation_verdict',
  'elimination_verdict',
  'damage_magnitude',
  'destruction_verdict',
  'post_relation_settlement',
  'cross_relation_precedence',
  'specific_occupation',
  'career_success',
  'salary_or_promotion_outcome',
  'future_timing',
  'career_t8_conclusion',
] as const;

function upstreamQualifierRuleId(pair: PillarPairKey): string {
  return `RULE-CAREER-T6-BRANCH-CLASH-QUALIFIER-${pair.toUpperCase().replaceAll('_', '-')}`;
}

function phasePath(pillar: keyof typeof PILLAR_INDEX): string {
  return `positions.${PILLAR_INDEX[pillar]}.seasonalPhase`;
}

export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VALUE_SCHEMA = {
  schemaId: 'SCHEMA-CAREER-T6-BRANCH-CLASH-SEASONAL-QUALIFIER-V1',
  version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION,
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'structuralTrigger',
      'pillarPair',
      'participantPillar',
      'seasonalPhase',
      'seasonalPhaseAuthority',
      'researchEvidenceType',
      'researchEvidenceVersion',
      'evidencePayloadPath',
      'qualifierClass',
      'effectSettlement',
      'scope',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: {
        kind: 'string',
        enum: ['BRANCH_CLASH_PARTICIPANT_SEASONAL_PHASE_OBSERVATION'],
      },
      structuralTrigger: { kind: 'string', enum: ['branch_clash'] },
      pillarPair: { kind: 'string', enum: Object.keys(PAIR_PARTICIPANTS) },
      participantPillar: { kind: 'string', enum: Object.keys(PILLAR_INDEX) },
      seasonalPhase: { kind: 'string', enum: PHASES },
      seasonalPhaseAuthority: {
        kind: 'string',
        enum: ['month_branch_element_relation_only'],
      },
      researchEvidenceType: {
        kind: 'string',
        enum: [I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE],
      },
      researchEvidenceVersion: {
        kind: 'string',
        enum: [I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceVersion],
      },
      evidencePayloadPath: {
        kind: 'string',
        enum: Object.keys(PILLAR_INDEX).map((pillar) =>
          phasePath(pillar as keyof typeof PILLAR_INDEX),
        ),
      },
      qualifierClass: { kind: 'string', enum: ['categorical_observation_only'] },
      effectSettlement: { kind: 'string', enum: ['not_authorized'] },
      scope: { kind: 'string', enum: ['t6_seasonal_qualifier_observation_only'] },
      forbiddenInferences: {
        kind: 'array',
        items: { kind: 'string' },
        minItems: FORBIDDEN_INFERENCES.length,
        maxItems: FORBIDDEN_INFERENCES.length,
      },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition;

export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION = {
  claimType: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
  version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION,
  valueSchemaRef: {
    id: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VALUE_SCHEMA.schemaId,
    version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VALUE_SCHEMA.version,
  },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T6'],
} satisfies ClaimTypeDefinition;

export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY = {
  methodologyId: METHOD_ID,
  version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION,
  family: 'stem_branch_interaction',
  name: 'Career T6 explicit branch-clash seasonal qualifier transport (research)',
  description:
    'Transports the exact I20 month-branch-relative five-element phase category for each participant of an already-established bounded Career branch clash. The category remains a research observation and does not resolve strength, victory, activation, damage, or Career outcome.',
  assumptions: [
    'The same-pair CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT claim must already exist.',
    'Seasonal input is admitted only from the governed, snapshot-bound I20 research-evidence definition.',
    'I20 seasonal phase is read only when the I20 report is RESOLVED_EVIDENCE and retains month_branch_element_relation_only authority.',
    '旺, 相, 休, 囚, and 死 are categorical observations only; no numeric scale or ordinal magnitude is assigned.',
    'No phase automatically establishes strong/weak, winner/loser, activation/elimination, damage, destruction, or post-relation settlement.',
    'The participant pillar and exact I20 payload locus are preserved in the claim.',
    'No specific occupation, Career success, salary, promotion, future timing, T8 conclusion, consumer narrative, or production authority is established.',
  ],
  requiredFactTypes: [],
  inputContract: {
    claimInputs: [
      {
        source: 'interpretation_claim',
        claimType: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
        mode: 'required',
        rationale:
          'Seasonal qualification is pair-local and cannot exist independently of the already-established bounded branch-clash qualifier context.',
      },
    ],
    researchEvidenceInputs: [
      {
        source: 'research_evidence',
        evidenceType: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE,
        definitionRef: {
          id: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.definitionId,
          version: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.version,
        },
        mode: 'required',
        rationale:
          'Only the exact governed I20 envelope may supply the raw seasonal phase category; host payloads and canonical fact overrides are not authority.',
      },
    ],
  },
  sourceIds: [
    CAREER_T6_QIANLI_NLC_SCAN_SOURCE.sourceId,
    CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE.sourceId,
  ],
  status: 'research',
} satisfies MethodologyDefinition;

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

function rule(
  pair: PillarPairKey,
  participantPillar: keyof typeof PILLAR_INDEX,
  seasonalPhase: SeasonalElementPhase,
): RuleDefinition {
  const index = PILLAR_INDEX[participantPillar];
  return {
    ruleId: `RULE-CAREER-T6-BRANCH-CLASH-SEASONAL-${pair.toUpperCase().replaceAll('_', '-')}-${participantPillar.toUpperCase()}-${PHASE_ID[seasonalPhase]}`,
    version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION,
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T6',
      category: 'career',
      subcategory: 'branch_clash_seasonal_qualifier',
    },
    methodologyRef: {
      id: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.version,
    },
    title: `Career T6 branch-clash seasonal qualifier at ${pair}/${participantPillar}/${seasonalPhase}`,
    description:
      'Emits one non-narrative categorical seasonal observation for one exact clash participant after the pair-local qualifier context and governed I20 evidence are both present.',
    inputs: [
      {
        key: 'branchClashQualifierContext',
        source: 'interpretation_claim',
        pathOrClaimType: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
        required: true,
        ambiguityBehavior: 'requires_resolved',
        cardinality: 'exactly_one',
        claimSelector: {
          taxonomy: { tiers: ['T6'], categories: ['career'] },
          predicates: ['career_t6_branch_clash_qualifier_context'],
          valueEquals: [{ path: 'pillarPair', value: pair }],
        },
      },
      {
        key: 'i20SeasonalEvidence',
        source: 'research_evidence',
        pathOrClaimType: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE,
        evidenceVersion: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceVersion,
        researchEvidenceDefinitionRef: {
          id: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.definitionId,
          version: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.version,
        },
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'i20SeasonalEvidence', path: 'status' },
          right: { kind: 'literal', value: 'RESOLVED_EVIDENCE' },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'i20SeasonalEvidence',
            path: 'seasonalPhaseAuthority',
          },
          right: { kind: 'literal', value: 'month_branch_element_relation_only' },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'i20SeasonalEvidence',
            path: 'relativeForceVerdictAuthorized',
          },
          right: { kind: 'literal', value: false },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'i20SeasonalEvidence',
            path: 'numericScoringAuthorized',
          },
          right: { kind: 'literal', value: false },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'i20SeasonalEvidence',
            path: `positions.${index}.position`,
          },
          right: { kind: 'literal', value: participantPillar },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: 'i20SeasonalEvidence',
            path: `positions.${index}.seasonalPhase`,
          },
          right: { kind: 'literal', value: seasonalPhase },
        },
      ],
    },
    output: {
      claimType: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'career_t6_branch_clash_participant_seasonal_phase_observation',
      value: {
        semanticKey: 'BRANCH_CLASH_PARTICIPANT_SEASONAL_PHASE_OBSERVATION',
        structuralTrigger: 'branch_clash',
        pillarPair: pair,
        participantPillar,
        seasonalPhase,
        seasonalPhaseAuthority: 'month_branch_element_relation_only',
        researchEvidenceType: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_TYPE,
        researchEvidenceVersion: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceVersion,
        evidencePayloadPath: phasePath(participantPillar),
        qualifierClass: 'categorical_observation_only',
        effectSettlement: 'not_authorized',
        scope: 't6_seasonal_qualifier_observation_only',
        forbiddenInferences: FORBIDDEN_INFERENCES,
      },
      polarity: 'neutral',
      tags: [
        'research',
        'career',
        't6',
        'branch-clash',
        'seasonal-qualifier',
        'categorical',
        'non-narrative',
      ],
    },
    sourceRefs: [
      {
        sourceId: CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE.sourceId,
        supportType: 'direct_basis',
        notes:
          'P4 bounded methodology basis admits season as a qualifier context for explicit branch-clash interaction; this rule transports only the I20 category and makes no effect settlement.',
      },
      {
        sourceId: CAREER_T6_QIANLI_NLC_SCAN_SOURCE.sourceId,
        supportType: 'implementation_reference',
        notes:
          'Publication identity binding for the same QIANLI_MINGGAO work family; not independent corroboration and not authority for numeric weighting or outcome prediction.',
      },
    ],
    quality: QUALITY,
    status: 'research',
    relations: { requires: [upstreamQualifierRuleId(pair)] },
  };
}

export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES: readonly RuleDefinition[] =
  (Object.keys(PAIR_PARTICIPANTS) as PillarPairKey[]).flatMap((pair) =>
    PAIR_PARTICIPANTS[pair].flatMap((participantPillar) =>
      PHASES.map((phase) => rule(pair, participantPillar, phase)),
    ),
  );

export const CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_PACK = {
  packId: 'PACK-CAREER-T6-BRANCH-CLASH-SEASONAL-QUALIFIER',
  version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION,
  name: 'Career T6 bounded branch-clash seasonal qualifier research pack',
  methodologyRefs: [
    {
      id: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.version,
    },
    {
      id: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.version,
    },
    {
      id: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.version,
    },
  ],
  enabledRuleSets: [CONTEXT_RULE_SET_ID, QUALIFIER_RULE_SET_ID, RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-T6-BRANCH-CLASH-SEASONAL-QUALIFIER',
    version: CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} satisfies InterpretationPack;

function assertP4Gate(report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport): void {
  if (
    report.status !== 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW' ||
    report.decision !==
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION' ||
    !report.exactP3BoundaryAccepted ||
    !report.exactI252BoundaryAccepted ||
    report.structuralTriggerKind !== 'branch_clash' ||
    !report.structuralTriggerMustBeT0Candidate ||
    !report.branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized ||
    !report.branchClashParticipantScopeRequired ||
    !report.qualifierOnlyContextAuthorized ||
    !report.generalHiddenStemInteractionStillBlocked ||
    report.arbitraryHiddenStemCoPresenceInteractionAuthorized ||
    report.nonClashHiddenStemInteractionAuthorized ||
    report.damageMagnitudeAuthorized ||
    report.destructionVerdictAuthorized ||
    report.postRelationSettlementAuthorized ||
    report.crossRelationPrecedenceAuthorized ||
    report.multiTouchAggregationAuthorized ||
    report.careerOutcomeSemanticAuthorizedByThisGate ||
    report.careerT8SynthesisAuthorizedByThisGate ||
    report.consumerNarrativeAuthorizedByThisGate ||
    report.productionPromotionAuthorized
  ) {
    throw new Error('P4 Career T6 gate does not authorize branch-clash seasonal qualifier rules.');
  }
}

export function createCareerT6BranchClashSeasonalQualifierRegistry(
  p4Report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  generatedAt?: string,
) {
  assertP4Gate(p4Report);
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
        ...CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES,
        ...CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES,
      ],
      methodologies: [
        CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY,
        CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY,
        CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY,
      ],
      sources: [
        CAREER_T6_QIANLI_NLC_SCAN_SOURCE,
        CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE,
      ],
      claimTypeDefinitions: [
        CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION,
        CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION,
        CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION,
      ],
      claimValueSchemas: [
        CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA,
        CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VALUE_SCHEMA,
        CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_VALUE_SCHEMA,
      ],
    },
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_PACK,
    generatedAt,
  );
}
