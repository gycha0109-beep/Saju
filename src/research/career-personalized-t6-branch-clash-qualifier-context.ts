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
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
  CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA,
  CAREER_T6_QIANLI_NLC_SCAN_SOURCE,
  CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE,
} from './career-personalized-t6-branch-clash-hidden-stem-context.js';

export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION = '0.1.0-research' as const;
export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE =
  'CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT' as const;

const METHOD_ID = 'M-CAREER-T6-BRANCH-CLASH-QUALIFIER-CONTEXT-V1';
const RULE_SET_ID = 'career-t6-branch-clash-qualifier-context';
const UPSTREAM_RULE_SET_ID = 'career-t6-branch-clash-hidden-stem-context';
const PAIRS = [
  'year_month',
  'year_day',
  'year_hour',
  'month_day',
  'month_hour',
  'day_hour',
] as const satisfies readonly PillarPairKey[];

const QUALIFIER_DIMENSIONS = [
  'visible_hidden_location_observation',
  'position_or_separation_observation',
  'plurality_location_observation',
] as const;

const FORBIDDEN_INFERENCES = [
  'visibility_activation_verdict',
  'separation_weakening_verdict',
  'plurality_strength_verdict',
  'seasonal_strength_verdict',
  'numeric_strength_or_weight',
  'interaction_winner',
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

function upstreamRuleId(pair: PillarPairKey): string {
  return `RULE-CAREER-T6-BRANCH-CLASH-HIDDEN-STEM-${pair.toUpperCase().replaceAll('_', '-')}`;
}

export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VALUE_SCHEMA = {
  schemaId: 'SCHEMA-CAREER-T6-BRANCH-CLASH-QUALIFIER-CONTEXT-V1',
  version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION,
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'structuralTrigger',
      'pillarPair',
      'qualifierEvidenceRef',
      'qualifierDimensions',
      'seasonQualifierStatus',
      'effectSettlement',
      'scope',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: { kind: 'string', enum: ['BRANCH_CLASH_QUALIFIER_CONTEXT'] },
      structuralTrigger: { kind: 'string', enum: ['branch_clash'] },
      pillarPair: { kind: 'string', enum: PAIRS },
      qualifierEvidenceRef: {
        kind: 'string',
        enum: PAIRS.map((pair) => `derivedFacts.branchClashQualifierObservations.${pair}`),
      },
      qualifierDimensions: {
        kind: 'array',
        items: { kind: 'string', enum: QUALIFIER_DIMENSIONS },
        minItems: QUALIFIER_DIMENSIONS.length,
        maxItems: QUALIFIER_DIMENSIONS.length,
      },
      seasonQualifierStatus: {
        kind: 'string',
        enum: ['deferred_to_research_evidence_input_boundary'],
      },
      effectSettlement: { kind: 'string', enum: ['not_authorized'] },
      scope: { kind: 'string', enum: ['t6_qualifier_context_only'] },
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

export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION = {
  claimType: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION,
  valueSchemaRef: {
    id: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VALUE_SCHEMA.schemaId,
    version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VALUE_SCHEMA.version,
  },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T6'],
} satisfies ClaimTypeDefinition;

export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY = {
  methodologyId: METHOD_ID,
  version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION,
  family: 'stem_branch_interaction',
  name: 'Career T6 explicit branch-clash qualifier context (research)',
  description:
    'Qualifies an existing bounded Career T6 branch-clash interaction claim with exact precomputed observation evidence for visibility locations, pillar separation, and repeated hidden-stem locations. The observations remain facts referenced by path rather than being copied or reinterpreted inside the claim.',
  assumptions: [
    'The upstream Career T6 branch-clash hidden-stem interaction context must already exist for the same pillar pair.',
    'Qualifier evidence is admitted only from the exact precomputed branch-clash qualifier observation for that same pair.',
    'Visible-stem matches are location observations only and do not establish activation or strength.',
    'Intervening pillar positions are separation observations only and do not establish weakening or distance weight.',
    'Repeated hidden-stem occurrence locations are plurality observations only and do not establish strength or numeric weight.',
    'Seasonal phase remains an independent research-evidence concern and is intentionally deferred until a governed research-input boundary exists.',
    'No winner, damage, destruction, settlement, cross-relation precedence, Career outcome, T8 synthesis, narrative, or production authority is established.',
  ],
  requiredFactTypes: ['derivedFacts.branchClashQualifierObservations'],
  inputContract: {
    factInputs: [
      {
        source: 'derived_fact',
        pathPattern: 'derivedFacts.branchClashQualifierObservations',
        mode: 'required',
        rationale:
          'The observation root must resolve so absence of a pair is distinguishable from unavailable qualifier evidence.',
      },
      {
        source: 'derived_fact',
        pathPattern: 'derivedFacts.branchClashQualifierObservations.*',
        mode: 'allowed',
        rationale:
          'Only the exact pair-local observation already materialized by P4.3A may qualify the upstream branch-clash context.',
      },
    ],
    claimInputs: [
      {
        source: 'interpretation_claim',
        claimType: CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
        mode: 'required',
        rationale:
          'Qualifier context cannot exist independently of the bounded Career T6 branch-clash interaction claim for the same pair.',
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

function rule(pair: PillarPairKey): RuleDefinition {
  const observationPath = `derivedFacts.branchClashQualifierObservations.${pair}`;
  const requiredUpstreamRuleId = upstreamRuleId(pair);
  return {
    ruleId: `RULE-CAREER-T6-BRANCH-CLASH-QUALIFIER-${pair.toUpperCase().replaceAll('_', '-')}`,
    version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION,
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T6',
      category: 'career',
      subcategory: 'branch_clash_qualifier_context',
    },
    methodologyRef: {
      id: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.version,
    },
    title: `Career T6 branch-clash qualifier context at ${pair}`,
    description:
      'Attaches pair-local visibility, separation, and plurality observation evidence to the already-established bounded branch-clash T6 context without resolving their effect.',
    inputs: [
      {
        key: 'qualifierObservationRoot',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.branchClashQualifierObservations',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
      {
        key: 'qualifierObservation',
        source: 'derived_fact',
        pathOrClaimType: observationPath,
        acceptedStatuses: ['resolved'],
        required: false,
        ambiguityBehavior: 'requires_resolved',
      },
      {
        key: 'branchClashContextClaim',
        source: 'interpretation_claim',
        pathOrClaimType: CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
        required: true,
        ambiguityBehavior: 'requires_resolved',
        cardinality: 'exactly_one',
        claimSelector: {
          taxonomy: { tiers: ['T6'], categories: ['career'] },
          predicates: ['career_t6_branch_clash_hidden_stem_interaction_context'],
          valueEquals: [{ path: 'pillarPair', value: pair }],
        },
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'qualifierObservation' } },
    output: {
      claimType: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'career_t6_branch_clash_qualifier_context',
      value: {
        semanticKey: 'BRANCH_CLASH_QUALIFIER_CONTEXT',
        structuralTrigger: 'branch_clash',
        pillarPair: pair,
        qualifierEvidenceRef: observationPath,
        qualifierDimensions: QUALIFIER_DIMENSIONS,
        seasonQualifierStatus: 'deferred_to_research_evidence_input_boundary',
        effectSettlement: 'not_authorized',
        scope: 't6_qualifier_context_only',
        forbiddenInferences: FORBIDDEN_INFERENCES,
      },
      polarity: 'neutral',
      tags: ['research', 'career', 't6', 'branch-clash', 'qualifier', 'non-narrative'],
    },
    sourceRefs: [
      {
        sourceId: CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE.sourceId,
        supportType: 'direct_basis',
        notes:
          'Bounded source basis for 明暗, position/separation, and plurality as qualifiers inside the explicit 支冲 research context; no numeric effect or winner is inferred.',
      },
      {
        sourceId: CAREER_T6_QIANLI_NLC_SCAN_SOURCE.sourceId,
        supportType: 'implementation_reference',
        notes:
          'Publication identity binding for the same QIANLI_MINGGAO work family; not independent corroboration and not an exact-page rule witness.',
      },
    ],
    quality: QUALITY,
    status: 'research',
    relations: { requires: [requiredUpstreamRuleId] },
  };
}

export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES: readonly RuleDefinition[] = PAIRS.map(rule);

export const CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_PACK = {
  packId: 'PACK-CAREER-T6-BRANCH-CLASH-QUALIFIER-CONTEXT',
  version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION,
  name: 'Career T6 bounded branch-clash qualifier context research pack',
  methodologyRefs: [
    {
      id: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.version,
    },
    {
      id: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.version,
    },
  ],
  enabledRuleSets: [UPSTREAM_RULE_SET_ID, RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-T6-BRANCH-CLASH-QUALIFIER-CONTEXT',
    version: CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VERSION,
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
    throw new Error('P4 Career T6 gate does not authorize branch-clash qualifier context rules.');
  }
}

export function createCareerT6BranchClashQualifierContextRegistry(
  p4Report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  generatedAt?: string,
) {
  assertP4Gate(p4Report);
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
        ...CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES,
      ],
      methodologies: [
        CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY,
        CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY,
      ],
      sources: [CAREER_T6_QIANLI_NLC_SCAN_SOURCE, CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE],
      claimTypeDefinitions: [
        CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION,
        CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION,
      ],
      claimValueSchemas: [
        CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA,
        CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_VALUE_SCHEMA,
      ],
    },
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_PACK,
    generatedAt,
  );
}
