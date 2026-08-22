import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  TenGod,
} from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { INTERPRETATION_METHODOLOGY_SOURCES } from './interpretation-methodology-catalog.js';

const METHOD_ID = 'M-STRENGTH-FUYI-EVIDENCE';
const METHOD_VERSION = '0.1.0-research';
const VISIBLE_RULE_SET = 'i13-visible-stem-strength-evidence';
const HIDDEN_RULE_SET = 'i13-hidden-stem-strength-evidence';
const GUARD_RULE_SET = 'i13-strength-scope-guard';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const VISIBLE_STEM_SLOTS = ['year', 'month', 'hour'] as const;
const ELEMENTS = ['목', '화', '토', '금', '수'] as const satisfies readonly FiveElement[];

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = Object.freeze({
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
});

const RESOURCE_ELEMENT: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '수',
  화: '목',
  토: '화',
  금: '토',
  수: '금',
});

const TEN_GODS_BY_RELATION = Object.freeze({
  peer: ['비견', '겁재'],
  resource: ['편인', '정인'],
  output: ['식신', '상관'],
  wealth: ['편재', '정재'],
  officer: ['편관', '정관'],
} satisfies Readonly<Record<StrengthEvidenceRelation, readonly TenGod[]>>);

export type StrengthEvidenceRelation = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
export type StrengthEvidenceDirection = 'supporting' | 'challenging';

const RELATION_DIRECTION: Readonly<Record<StrengthEvidenceRelation, StrengthEvidenceDirection>> = {
  peer: 'supporting',
  resource: 'supporting',
  output: 'challenging',
  wealth: 'challenging',
  officer: 'challenging',
};

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export const I13_STRENGTH_EVIDENCE_SOURCES: readonly SourceReference[] = Object.freeze([
  INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei,
  INTERPRETATION_METHODOLOGY_SOURCES.yuanhaiZiping,
]);

export const I13_STRENGTH_EVIDENCE_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: METHOD_VERSION,
  family: 'day_master_strength',
  name: 'Whole-chart strength evidence collection (research)',
  description:
    'Collects methodology-qualified structural evidence relevant to whole-chart day-master strength analysis without producing a strong/weak classification or numeric score.',
  assumptions: [
    'Month-order is important but is not a sufficient final classifier by itself.',
    'Visible peer/resource relations may support the day master while output/wealth/officer relations may represent leakage, expenditure, or control within this methodology.',
    'Same-element hidden-stem membership is recorded as root evidence; generating-element hidden membership is recorded separately as hidden resource support rather than mislabeled as a root.',
    'No evidence item carries a numeric weight in this foundation.',
    'Special-pattern, transformation, and final balancing-use gates are outside this foundation.',
  ],
  requiredFactTypes: [
    'pillars.year',
    'pillars.month',
    'pillars.day',
    'pillars.hour',
    'derivedFacts.dayMaster',
    'derivedFacts.tenGods',
    'derivedFacts.hiddenStems',
  ],
  optionalFactTypes: ['stem_branch_relations', 'month_order_evidence'],
  sourceIds: I13_STRENGTH_EVIDENCE_SOURCES.map((source) => source.sourceId),
  status: 'research',
});

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return I13_STRENGTH_EVIDENCE_SOURCES.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis' as const,
    notes:
      'Supports whole-chart strength evidence framing only; this rule does not claim that one signal or an unweighted count determines final strength.',
  }));
}

function visibleStemRules(): readonly RuleDefinition[] {
  return VISIBLE_STEM_SLOTS.flatMap((slot) =>
    (Object.keys(TEN_GODS_BY_RELATION) as StrengthEvidenceRelation[]).map((relation) => ({
      ruleId: `RULE-I13-VISIBLE-${slot.toUpperCase()}-${relation.toUpperCase()}`,
      version: METHOD_VERSION,
      ruleSetId: VISIBLE_RULE_SET,
      taxonomy: {
        tier: 'T2' as const,
        category: 'day_master_strength',
        subcategory: 'visible_stem_evidence',
      },
      methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
      title: `Visible ${slot} stem ${relation} evidence`,
      description:
        'Records one visible-stem relationship as unweighted strength evidence. It does not aggregate evidence or classify overall day-master strength.',
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
          key: 'tenGods',
          source: 'derived_fact' as const,
          pathOrClaimType: 'derivedFacts.tenGods',
          acceptedStatuses: ['resolved'] as const,
          required: true,
          ambiguityBehavior: 'scenario_preserving' as const,
        },
      ],
      condition: {
        op: 'in' as const,
        value: { kind: 'input' as const, key: 'tenGods', path: `${slot}.stem.value` },
        set: TEN_GODS_BY_RELATION[relation],
      },
      output: {
        claimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
        subject: 'day_master',
        predicate: 'strength_evidence',
        value: {
          evidenceKind: 'visible_stem_relation',
          position: slot,
          relation,
          direction: RELATION_DIRECTION[relation],
          weight: 'not_assigned',
          overallStrength: 'not_determined',
        },
        polarity: RELATION_DIRECTION[relation] === 'supporting' ? 'supportive' as const : 'challenging' as const,
        emphasis: 'minor' as const,
        tags: ['research', 'strength-evidence', 'unweighted', 'non-conclusive'],
      },
      sourceRefs: sourceRefs(),
      quality: QUALITY,
      status: 'research' as const,
    })),
  );
}

function branchesContainingAny(stems: readonly HeavenlyStem[]): readonly EarthlyBranch[] {
  return (Object.entries(HIDDEN_STEM_MEMBERSHIP) as [EarthlyBranch, readonly HeavenlyStem[]][])
    .filter(([, hidden]) => hidden.some((stem) => stems.includes(stem)))
    .map(([branch]) => branch)
    .sort();
}

function hiddenStemRules(): readonly RuleDefinition[] {
  return PILLAR_SLOTS.flatMap((slot) =>
    ELEMENTS.flatMap((dayMasterElement) => {
      const peerBranches = branchesContainingAny(STEMS_BY_ELEMENT[dayMasterElement]);
      const resourceElement = RESOURCE_ELEMENT[dayMasterElement];
      const resourceBranches = branchesContainingAny(STEMS_BY_ELEMENT[resourceElement]);

      return [
        {
          ruleId: `RULE-I13-HIDDEN-${slot.toUpperCase()}-${dayMasterElement}-PEER-ROOT`,
          version: METHOD_VERSION,
          ruleSetId: HIDDEN_RULE_SET,
          taxonomy: {
            tier: 'T2' as const,
            category: 'day_master_strength',
            subcategory: 'hidden_peer_root_evidence',
          },
          methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
          title: `${slot} branch contains same-element hidden stem root evidence for ${dayMasterElement}`,
          description:
            'Records same-element hidden-stem membership as root evidence. Membership does not imply a numeric root weight, command duration, or final strength result.',
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
              key: 'pillar',
              source: 'canonical_fact' as const,
              pathOrClaimType: `pillars.${slot}`,
              acceptedStatuses: ['resolved'] as const,
              required: true,
              ambiguityBehavior: 'scenario_preserving' as const,
            },
            {
              key: 'hiddenStems',
              source: 'derived_fact' as const,
              pathOrClaimType: `derivedFacts.hiddenStems.${slot}`,
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
                right: { kind: 'literal' as const, value: dayMasterElement },
              },
              {
                op: 'in' as const,
                value: { kind: 'input' as const, key: 'pillar', path: 'branch.value' },
                set: peerBranches,
              },
              { op: 'exists' as const, value: { kind: 'input' as const, key: 'hiddenStems' } },
            ],
          },
          output: {
            claimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
            subject: 'day_master',
            predicate: 'strength_evidence',
            value: {
              evidenceKind: 'hidden_peer_root',
              position: slot,
              dayMasterElement,
              relation: 'peer',
              direction: 'supporting',
              weight: 'not_assigned',
              overallStrength: 'not_determined',
            },
            polarity: 'supportive' as const,
            emphasis: 'minor' as const,
            tags: ['research', 'root-evidence', 'hidden-stem', 'unweighted', 'non-conclusive'],
          },
          sourceRefs: sourceRefs(),
          quality: QUALITY,
          status: 'research' as const,
        },
        {
          ruleId: `RULE-I13-HIDDEN-${slot.toUpperCase()}-${dayMasterElement}-RESOURCE`,
          version: METHOD_VERSION,
          ruleSetId: HIDDEN_RULE_SET,
          taxonomy: {
            tier: 'T2' as const,
            category: 'day_master_strength',
            subcategory: 'hidden_resource_evidence',
          },
          methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
          title: `${slot} branch contains hidden resource support for ${dayMasterElement}`,
          description:
            'Records generating-element hidden-stem membership as hidden resource support. It is not mislabeled as same-element root evidence and carries no numeric weight.',
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
              key: 'pillar',
              source: 'canonical_fact' as const,
              pathOrClaimType: `pillars.${slot}`,
              acceptedStatuses: ['resolved'] as const,
              required: true,
              ambiguityBehavior: 'scenario_preserving' as const,
            },
            {
              key: 'hiddenStems',
              source: 'derived_fact' as const,
              pathOrClaimType: `derivedFacts.hiddenStems.${slot}`,
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
                right: { kind: 'literal' as const, value: dayMasterElement },
              },
              {
                op: 'in' as const,
                value: { kind: 'input' as const, key: 'pillar', path: 'branch.value' },
                set: resourceBranches,
              },
              { op: 'exists' as const, value: { kind: 'input' as const, key: 'hiddenStems' } },
            ],
          },
          output: {
            claimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
            subject: 'day_master',
            predicate: 'strength_evidence',
            value: {
              evidenceKind: 'hidden_resource_support',
              position: slot,
              dayMasterElement,
              resourceElement,
              relation: 'resource',
              direction: 'supporting',
              weight: 'not_assigned',
              overallStrength: 'not_determined',
            },
            polarity: 'supportive' as const,
            emphasis: 'minor' as const,
            tags: ['research', 'resource-evidence', 'hidden-stem', 'unweighted', 'non-conclusive'],
          },
          sourceRefs: sourceRefs(),
          quality: QUALITY,
          status: 'research' as const,
        },
      ] satisfies readonly RuleDefinition[];
    }),
  );
}

const SCOPE_GUARD: RuleDefinition = {
  ruleId: 'RULE-I13-STRENGTH-EVIDENCE-SCOPE-GUARD',
  version: METHOD_VERSION,
  ruleSetId: GUARD_RULE_SET,
  taxonomy: {
    tier: 'T2',
    category: 'day_master_strength',
    subcategory: 'scope_guard',
  },
  methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
  title: 'Strength evidence foundation cannot classify overall strength',
  description:
    'Mandatory guard preventing unweighted evidence collection from being promoted into a final strong/weak classification or balancing-use result.',
  inputs: [
    {
      key: 'dayMaster',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
  ],
  condition: { op: 'exists', value: { kind: 'input', key: 'dayMaster' } },
  output: {
    claimType: 'DAY_MASTER_STRENGTH_SCOPE_GUARD',
    subject: 'day_master',
    predicate: 'overall_strength',
    value: {
      status: 'undetermined',
      reason: 'unweighted_strength_evidence_is_not_a_final_classification',
      numericScore: 'not_defined',
      rootWeighting: 'not_defined',
      monthOrderSynthesis: 'not_performed_here',
      specialPatternGate: 'not_evaluated',
      balancingUse: 'not_authorized',
    },
    polarity: 'neutral',
    emphasis: 'major',
    tags: ['research', 'guardrail', 'non-conclusive'],
  },
  sourceRefs: sourceRefs(),
  quality: QUALITY,
  status: 'research',
};

export const I13_STRENGTH_EVIDENCE_RULES: readonly RuleDefinition[] = Object.freeze([
  ...visibleStemRules(),
  ...hiddenStemRules(),
  SCOPE_GUARD,
]);

export const I13_STRENGTH_EVIDENCE_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-I13-STRENGTH-EVIDENCE-RESEARCH',
  version: METHOD_VERSION,
  name: 'I13 Strength Evidence Foundation Research Pack',
  methodologyRefs: [{ id: METHOD_ID, version: METHOD_VERSION }],
  enabledRuleSets: [VISIBLE_RULE_SET, HIDDEN_RULE_SET, GUARD_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-I13-EVIDENCE-ONLY', version: '0.1.0' },
  status: 'research',
});

export function createI13StrengthEvidenceRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: I13_STRENGTH_EVIDENCE_RULES,
      methodologies: [I13_STRENGTH_EVIDENCE_METHODOLOGY],
      sources: I13_STRENGTH_EVIDENCE_SOURCES,
    },
    I13_STRENGTH_EVIDENCE_PACK,
    createdAt,
  );
}
