import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
  I18A_MONTH_BRANCH_STRENGTH_RULES,
  I18A_MONTH_BRANCH_STRENGTH_SOURCES,
  type MonthBranchStrengthRelation,
} from './i18a-month-branch-strength-evidence.js';

export const GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE =
  'GENERAL_NATAL_MONTH_BRANCH_STRUCTURAL_CONTEXT' as const;

const CANDIDATE_METHOD_ID = 'M-GENERAL-NATAL-MONTH-BRANCH-STRUCTURAL-SUMMARY';
const CANDIDATE_RULE_SET_ID = 'general-natal-t8-month-branch-structural-summary-candidate';
const RELATION_CLAIM_TYPE = 'DAY_MASTER_MONTH_BRANCH_EVIDENCE';
const SCOPE_GUARD_CLAIM_TYPE = 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD';

const RELATIONS = [
  { relation: 'peer', direction: 'supporting' },
  { relation: 'resource', direction: 'supporting' },
  { relation: 'output', direction: 'challenging' },
  { relation: 'wealth', direction: 'challenging' },
  { relation: 'officer', direction: 'challenging' },
] as const satisfies readonly {
  relation: MonthBranchStrengthRelation;
  direction: 'supporting' | 'challenging';
}[];

export const GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY: MethodologyDefinition =
  Object.freeze({
    methodologyId: CANDIDATE_METHOD_ID,
    version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
    family: 'domain_synthesis',
    name: 'General natal month-branch structural summary candidate',
    description:
      'Research-only consumer synthesis that carries an already-emitted I18A month-branch relation into a narrow T8 general-natal structural context claim while preserving the I18A non-classification guard.',
    assumptions: [
      'The T8 claim may restate only the upstream I18A relation family and its explicit scope limitations.',
      'The month-branch relation is one structural axis and does not determine overall day-master strength.',
      'Supporting/challenging is retained as an evidence-direction label only; it is not auspicious/inauspicious fortune meaning.',
      'No personality, event, relationship, career, wealth, health, timing, or future conclusion is authorized by this candidate.',
      'No numeric weight, score, probability, or final strong/weak classification is authorized.',
    ],
    requiredFactTypes: [RELATION_CLAIM_TYPE, SCOPE_GUARD_CLAIM_TYPE],
    sourceIds: I18A_MONTH_BRANCH_STRENGTH_SOURCES.map((source) => source.sourceId),
    status: 'research',
  });

const candidateQuality: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return I18A_MONTH_BRANCH_STRENGTH_SOURCES.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis' as const,
    notes:
      'Inherited source basis from I18A. This candidate adds no new fortune semantics and only preserves the upstream relation plus explicit scope guard.',
  }));
}

function candidateRule(
  relation: MonthBranchStrengthRelation,
  direction: 'supporting' | 'challenging',
): RuleDefinition {
  return {
    ruleId: `RULE-GENERAL-NATAL-T8-MONTH-BRANCH-${relation.toUpperCase()}`,
    version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
    ruleSetId: CANDIDATE_RULE_SET_ID,
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'month_branch_structural_context',
    },
    methodologyRef: {
      id: CANDIDATE_METHOD_ID,
      version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
    },
    title: `General natal month-branch ${relation} structural context`,
    description:
      'Research candidate that exposes one already-established I18A month-branch relation as general-natal structural context without adding a fortune verdict.',
    inputs: [
      {
        key: 'monthBranchRelation',
        source: 'interpretation_claim',
        pathOrClaimType: RELATION_CLAIM_TYPE,
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
      {
        key: 'scopeGuard',
        source: 'interpretation_claim',
        pathOrClaimType: SCOPE_GUARD_CLAIM_TYPE,
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'monthBranchRelation', path: 'relation' },
          right: { kind: 'literal', value: relation },
        },
        {
          op: 'exists',
          value: { kind: 'input', key: 'scopeGuard' },
        },
      ],
    },
    output: {
      claimType: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'month_branch_structural_context',
      value: {
        relation,
        evidenceDirection: direction,
        monthContext: 'branch_element_only',
        overallStrength: 'not_determined',
        withinMonthCommand: 'not_determined',
        rootEffect: 'not_determined',
        classificationAuthorized: false,
        numericScoringAuthorized: false,
        fortunePolarityAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'general-natal', 'structural-summary', 'non-conclusive'],
    },
    sourceRefs: sourceRefs(),
    quality: candidateQuality,
    status: 'research',
  };
}

export const GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES: readonly RuleDefinition[] =
  Object.freeze(RELATIONS.map(({ relation, direction }) => candidateRule(relation, direction)));

const I18A_RULE_SET_IDS = [
  ...new Set(I18A_MONTH_BRANCH_STRENGTH_RULES.map((rule) => rule.ruleSetId)),
].sort();

export const GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-T8-STRUCTURAL-SUMMARY-CANDIDATE',
  version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
  name: 'General Natal T8 Structural Summary Research Candidate',
  methodologyRefs: [
    {
      id: I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY.methodologyId,
      version: I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY.version,
    },
    {
      id: CANDIDATE_METHOD_ID,
      version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
    },
  ],
  enabledRuleSets: [...I18A_RULE_SET_IDS, CANDIDATE_RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-T8-STRUCTURAL-SUMMARY-RESEARCH',
    version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
  },
  status: 'research',
});

export function createGeneralNatalT8StructuralSummaryCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...I18A_MONTH_BRANCH_STRENGTH_RULES,
        ...GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES,
      ],
      methodologies: [
        I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
        GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
      ],
      sources: I18A_MONTH_BRANCH_STRENGTH_SOURCES,
    },
    GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK,
    createdAt,
  );
}
