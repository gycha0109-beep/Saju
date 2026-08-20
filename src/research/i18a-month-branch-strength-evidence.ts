import type { FiveElement } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { INTERPRETATION_METHODOLOGY_SOURCES } from './interpretation-methodology-catalog.js';

const METHOD_ID = 'M-STRENGTH-FUYI-MONTH-BRANCH-EVIDENCE';
const METHOD_VERSION = '0.1.0-research';
const RELATION_RULE_SET = 'i18a-month-branch-strength-evidence';
const GUARD_RULE_SET = 'i18a-month-branch-scope-guard';

const ELEMENTS = ['목', '화', '토', '금', '수'] as const satisfies readonly FiveElement[];

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
});

const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '토',
  화: '금',
  토: '수',
  금: '목',
  수: '화',
});

export type MonthBranchStrengthRelation = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
export type MonthBranchEvidenceDirection = 'supporting' | 'challenging';

const RELATION_DIRECTION: Readonly<Record<MonthBranchStrengthRelation, MonthBranchEvidenceDirection>> = {
  peer: 'supporting',
  resource: 'supporting',
  output: 'challenging',
  wealth: 'challenging',
  officer: 'challenging',
};

function monthElementForRelation(
  dayElement: FiveElement,
  relation: MonthBranchStrengthRelation,
): FiveElement {
  if (relation === 'peer') return dayElement;
  if (relation === 'output') return GENERATES[dayElement];
  if (relation === 'wealth') return CONTROLS[dayElement];

  const source = ELEMENTS.find((element) =>
    relation === 'resource'
      ? GENERATES[element] === dayElement
      : CONTROLS[element] === dayElement,
  );
  if (source === undefined) {
    throw new Error(`Unable to resolve ${relation} element for ${dayElement}`);
  }
  return source;
}

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export const I18A_MONTH_BRANCH_STRENGTH_SOURCES: readonly SourceReference[] = Object.freeze([
  INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei,
  INTERPRETATION_METHODOLOGY_SOURCES.yuanhaiZiping,
]);

export const I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: METHOD_VERSION,
  family: 'day_master_strength',
  name: 'Month-branch elemental strength evidence (research)',
  description:
    'Records the month branch elemental relation to the day master across all five relation families. It does not claim to resolve the within-month command deity, root effectiveness, or final day-master strength.',
  assumptions: [
    'The month branch is an important seasonal context but is not a sufficient final classifier.',
    'A month branch relation is recorded explicitly as peer, resource, output, wealth, or officer/control instead of treating absence of positive support as an unspecified negative signal.',
    'The branch-element relation is not identical to within-month hidden-stem command timing or a final strength weight.',
    'No numeric weight or final strong/weak label is emitted.',
  ],
  requiredFactTypes: ['pillars.month', 'derivedFacts.dayMaster'],
  optionalFactTypes: ['derivedFacts.hiddenStems.month', 'month_command'],
  sourceIds: I18A_MONTH_BRANCH_STRENGTH_SOURCES.map((source) => source.sourceId),
  status: 'research',
});

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return I18A_MONTH_BRANCH_STRENGTH_SOURCES.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis' as const,
    notes:
      'Supports month-order importance within whole-chart strength analysis. This rule records only month-branch elemental relation and does not assert final strength.',
  }));
}

function relationRules(): readonly RuleDefinition[] {
  const relations: readonly MonthBranchStrengthRelation[] = [
    'peer',
    'resource',
    'output',
    'wealth',
    'officer',
  ];

  return ELEMENTS.flatMap((dayElement) =>
    relations.map((relation) => {
      const monthElement = monthElementForRelation(dayElement, relation);
      const direction = RELATION_DIRECTION[relation];
      return {
        ruleId: `RULE-I18A-MONTH-${dayElement}-${relation.toUpperCase()}`,
        version: METHOD_VERSION,
        ruleSetId: RELATION_RULE_SET,
        taxonomy: {
          tier: 'T2' as const,
          category: 'day_master_strength',
          subcategory: 'month_branch_elemental_relation',
        },
        methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
        title: `${dayElement} day master / ${monthElement} month branch ${relation} evidence`,
        description:
          'Records a complete month-branch elemental relation as unweighted strength evidence. This is not a within-month command-deity determination or final strength classification.',
        inputs: [
          {
            key: 'dayMaster',
            source: 'derived_fact' as const,
            pathOrClaimType: 'derivedFacts.dayMaster',
            acceptedStatuses: ['resolved'] as const,
            required: true,
            ambiguityBehavior: 'scenario_preserving' as const,
          },
          {
            key: 'monthPillar',
            source: 'canonical_fact' as const,
            pathOrClaimType: 'pillars.month',
            acceptedStatuses: ['resolved'] as const,
            required: true,
            ambiguityBehavior: 'scenario_preserving' as const,
          },
        ],
        condition: {
          op: 'and' as const,
          expressions: [
            {
              op: 'eq' as const,
              left: { kind: 'input' as const, key: 'dayMaster', path: 'element' },
              right: { kind: 'literal' as const, value: dayElement },
            },
            {
              op: 'eq' as const,
              left: { kind: 'input' as const, key: 'monthPillar', path: 'branch.element' },
              right: { kind: 'literal' as const, value: monthElement },
            },
          ],
        },
        output: {
          claimType: 'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
          subject: 'day_master',
          predicate: 'month_branch_elemental_relation',
          value: {
            evidenceKind: 'month_branch_elemental_relation',
            monthContext: 'branch_element_only',
            dayMasterElement: dayElement,
            monthBranchElement: monthElement,
            relation,
            direction,
            weight: 'not_assigned',
            overallStrength: 'not_determined',
          },
          polarity: direction === 'supporting' ? ('supportive' as const) : ('challenging' as const),
          emphasis: 'major' as const,
          tags: ['research', 'month-branch-evidence', 'unweighted', 'non-conclusive'],
        },
        sourceRefs: sourceRefs(),
        quality: QUALITY,
        status: 'research' as const,
      } satisfies RuleDefinition;
    }),
  );
}

const SCOPE_GUARD_RULE: RuleDefinition = {
  ruleId: 'RULE-I18A-MONTH-BRANCH-SCOPE-GUARD',
  version: METHOD_VERSION,
  ruleSetId: GUARD_RULE_SET,
  taxonomy: {
    tier: 'T2',
    category: 'day_master_strength',
    subcategory: 'scope_guard',
  },
  methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
  title: 'Month-branch evidence is not a final strength classifier',
  description:
    'Requires an explicit scope guard whenever month-branch elemental evidence is evaluated.',
  inputs: [
    {
      key: 'dayMaster',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
    {
      key: 'monthPillar',
      source: 'canonical_fact',
      pathOrClaimType: 'pillars.month',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
  ],
  condition: {
    op: 'and',
    expressions: [
      { op: 'exists', value: { kind: 'input', key: 'dayMaster' } },
      { op: 'exists', value: { kind: 'input', key: 'monthPillar' } },
    ],
  },
  output: {
    claimType: 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
    subject: 'day_master',
    predicate: 'scope_guard',
    value: {
      monthContext: 'branch_element_only',
      withinMonthCommand: 'not_determined',
      rootEffect: 'not_determined',
      overallStrength: 'not_determined',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    emphasis: 'major',
    tags: ['research', 'scope-guard', 'no-final-strength'],
  },
  sourceRefs: sourceRefs(),
  quality: QUALITY,
  status: 'research',
};

export const I18A_MONTH_BRANCH_STRENGTH_RULES: readonly RuleDefinition[] = Object.freeze([
  ...relationRules(),
  SCOPE_GUARD_RULE,
]);

export const I18A_MONTH_BRANCH_STRENGTH_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-I18A-MONTH-BRANCH-STRENGTH-RESEARCH',
  version: METHOD_VERSION,
  name: 'I18A Month-Branch Strength Evidence Research Pack',
  methodologyRefs: [{ id: METHOD_ID, version: METHOD_VERSION }],
  enabledRuleSets: [RELATION_RULE_SET, GUARD_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-I18A-EVIDENCE-ONLY', version: '0.1.0' },
  status: 'research',
});

export function createI18AMonthBranchStrengthRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: I18A_MONTH_BRANCH_STRENGTH_RULES,
      methodologies: [I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY],
      sources: I18A_MONTH_BRANCH_STRENGTH_SOURCES,
    },
    I18A_MONTH_BRANCH_STRENGTH_PACK,
    createdAt,
  );
}
