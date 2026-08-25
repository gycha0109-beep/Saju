import type { PillarPairKey } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';

export const CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION = '0.1.0-research' as const;
export const CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE =
  'CAREER_T6_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_CONTEXT' as const;

const METHOD_ID = 'M-CAREER-T6-BRANCH-CLASH-HIDDEN-STEM-CONTEXT-V1';
const RULE_SET_ID = 'career-t6-branch-clash-hidden-stem-context';
const PAIRS = [
  'year_month',
  'year_day',
  'year_hour',
  'month_day',
  'month_hour',
  'day_hour',
] as const satisfies readonly PillarPairKey[];

const FORBIDDEN_INFERENCES = [
  'interaction_winner',
  'damage_magnitude',
  'destruction_verdict',
  'numeric_strength_or_weight',
  'cross_relation_precedence',
  'specific_occupation',
  'career_success',
  'salary_or_promotion_outcome',
  'future_timing',
  'career_t8_conclusion',
] as const;

export const CAREER_T6_QIANLI_NLC_SCAN_SOURCE = {
  sourceId: 'SRC-CAREER-T6-QIANLI-1935-NLC-SCAN-IDENTITY',
  sourceType: 'classical_text',
  title: '千里命稿 — 1935 National Library of China scan identity',
  author: '韋千里',
  publicationYear: 1935,
  language: 'zh',
  url: 'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
  accessedAt: '2026-08-25',
  provenanceTier: 'primary',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
  notes:
    'Publication/scan identity only in this bounded rule package. It is the same QIANLI_MINGGAO work family as the public transcription and is not counted as independent corroboration of the rule text.',
} satisfies SourceReference;

export const CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE = {
  sourceId: 'SRC-CAREER-T6-QIANLI-PUBLIC-RULE-TRANSCRIPTION',
  sourceType: 'classical_text',
  title: '千里命稿 — public rule transcription for 支冲/明暗/地位 context',
  author: '韋千里',
  language: 'zh',
  url: 'https://ctext.org/wiki.pl?chapter=497083&if=en',
  accessedAt: '2026-08-25',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'paraphrase_only' },
  notes:
    'Direct public transcription used only for the bounded research finding that hidden stems inside explicitly clashing branches participate in an interaction context. Same QIANLI_MINGGAO work family as the NLC scan identity; not independent corroboration. No winner, damage, numeric weighting, or Career outcome is inferred.',
} satisfies SourceReference;

export const CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA = {
  schemaId: 'SCHEMA-CAREER-T6-BRANCH-CLASH-HIDDEN-STEM-CONTEXT-V1',
  version: CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION,
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'structuralTrigger',
      'pillarPair',
      'interactionScope',
      'qualifierMode',
      'effectSettlement',
      'scope',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: { kind: 'string', enum: ['EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_CONTEXT'] },
      structuralTrigger: { kind: 'string', enum: ['branch_clash'] },
      pillarPair: { kind: 'string', enum: PAIRS },
      interactionScope: {
        kind: 'string',
        enum: ['hidden_stems_of_explicit_clash_participants_only'],
      },
      qualifierMode: {
        kind: 'string',
        enum: ['qualifiers_authorized_as_context_but_not_applied_by_this_rule'],
      },
      effectSettlement: { kind: 'string', enum: ['not_authorized'] },
      scope: { kind: 'string', enum: ['t6_structural_interaction_context_only'] },
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

export const CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION = {
  claimType: CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  version: CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION,
  valueSchemaRef: {
    id: CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA.schemaId,
    version: CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA.version,
  },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T6'],
} satisfies ClaimTypeDefinition;

export const CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY = {
  methodologyId: METHOD_ID,
  version: CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION,
  family: 'stem_branch_interaction',
  name: 'Career T6 explicit branch-clash hidden-stem interaction context (research)',
  description:
    'Consumes only precomputed T0 branch-clash contexts and emits a bounded T6 structural interaction context for the hidden stems belonging to those exact clash participants.',
  assumptions: [
    'Eligibility exists only inside an explicit T0 branch_clash already materialized by the calculation layer.',
    'The rule does not rediscover, reconstruct, or expand branch-clash membership.',
    'Only hidden stems attached to the two exact clash participants are in scope.',
    'The existence of the context is not a strength, dominance, activation, or winner verdict.',
    'Visibility, position/separation, season, and plurality may qualify later research context but this rule does not apply those qualifiers.',
    'No numeric weighting, damage magnitude, destruction, post-relation settlement, cross-relation precedence, or multi-touch aggregation is authorized.',
    'No specific occupation, career success, salary, promotion, future timing, T8 Career conclusion, narrative, or production authority is authorized.',
  ],
  requiredFactTypes: ['derivedFacts.branchClashContexts'],
  inputContract: {
    factInputs: [
      {
        source: 'derived_fact',
        pathPattern: 'derivedFacts.branchClashContexts.*',
        mode: 'allowed',
        rationale:
          'P4 authorizes research T6 only for exact precomputed branch-clash participant contexts. No broader hidden-stem or structural-relation input is admitted.',
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
  const factPath = `derivedFacts.branchClashContexts.${pair}`;
  return {
    ruleId: `RULE-CAREER-T6-BRANCH-CLASH-HIDDEN-STEM-${pair.toUpperCase().replaceAll('_', '-')}`,
    version: CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION,
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T6',
      category: 'career',
      subcategory: 'branch_clash_hidden_stem_interaction_context',
    },
    methodologyRef: {
      id: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.version,
    },
    title: `Career T6 bounded branch-clash hidden-stem context at ${pair}`,
    description:
      'Emits one non-narrative structural interaction context only when the exact precomputed T0 branch-clash context exists for this pillar pair.',
    inputs: [
      {
        key: 'branchClashContext',
        source: 'derived_fact',
        pathOrClaimType: factPath,
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'branchClashContext' } },
    output: {
      claimType: CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'career_t6_branch_clash_hidden_stem_interaction_context',
      value: {
        semanticKey: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_CONTEXT',
        structuralTrigger: 'branch_clash',
        pillarPair: pair,
        interactionScope: 'hidden_stems_of_explicit_clash_participants_only',
        qualifierMode: 'qualifiers_authorized_as_context_but_not_applied_by_this_rule',
        effectSettlement: 'not_authorized',
        scope: 't6_structural_interaction_context_only',
        forbiddenInferences: FORBIDDEN_INFERENCES,
      },
      polarity: 'neutral',
      tags: ['research', 'career', 't6', 'branch-clash', 'hidden-stem', 'non-narrative'],
    },
    sourceRefs: [
      {
        sourceId: CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE.sourceId,
        supportType: 'direct_basis',
        notes:
          'Bounded paraphrase basis for hidden-stem interaction inside explicit 支冲 only; no winner, damage, weighting, or Career outcome.',
      },
      {
        sourceId: CAREER_T6_QIANLI_NLC_SCAN_SOURCE.sourceId,
        supportType: 'implementation_reference',
        notes:
          'Publication identity binding for the same work family; not independent corroboration and not an exact-page rule witness.',
      },
    ],
    quality: QUALITY,
    status: 'research',
  };
}

export const CAREER_T6_BRANCH_CLASH_CONTEXT_RULES: readonly RuleDefinition[] = PAIRS.map(rule);

export const CAREER_T6_BRANCH_CLASH_CONTEXT_PACK = {
  packId: 'PACK-CAREER-T6-BRANCH-CLASH-HIDDEN-STEM-CONTEXT',
  version: CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION,
  name: 'Career T6 bounded branch-clash hidden-stem context research pack',
  methodologyRefs: [
    {
      id: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.methodologyId,
      version: CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.version,
    },
  ],
  enabledRuleSets: [RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-T6-BRANCH-CLASH-HIDDEN-STEM-CONTEXT',
    version: CAREER_T6_BRANCH_CLASH_CONTEXT_VERSION,
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
    throw new Error('P4 Career T6 gate does not authorize the bounded branch-clash research rule contract.');
  }
}

export function createCareerT6BranchClashContextRegistry(
  p4Report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  generatedAt?: string,
) {
  assertP4Gate(p4Report);
  return createRuleRegistrySnapshot(
    {
      rules: CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
      methodologies: [CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY],
      sources: [CAREER_T6_QIANLI_NLC_SCAN_SOURCE, CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE],
      claimTypeDefinitions: [CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION],
      claimValueSchemas: [CAREER_T6_BRANCH_CLASH_CONTEXT_VALUE_SCHEMA],
    },
    CAREER_T6_BRANCH_CLASH_CONTEXT_PACK,
    generatedAt,
  );
}
