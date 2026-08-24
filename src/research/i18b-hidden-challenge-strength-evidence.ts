import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
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

const METHOD_ID = 'M-STRENGTH-FUYI-HIDDEN-CHALLENGE-EVIDENCE';
const METHOD_VERSION = '0.1.0-research';
const CHALLENGE_RULE_SET = 'i18b-hidden-challenge-strength-evidence';
const GUARD_RULE_SET = 'i18b-hidden-challenge-scope-guard';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const ELEMENTS = ['목', '화', '토', '금', '수'] as const satisfies readonly FiveElement[];

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = Object.freeze({
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
});

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

export type HiddenChallengeRelation = 'output' | 'wealth' | 'officer';

function targetElementForRelation(
  dayElement: FiveElement,
  relation: HiddenChallengeRelation,
): FiveElement {
  if (relation === 'output') return GENERATES[dayElement];
  if (relation === 'wealth') return CONTROLS[dayElement];

  const controllingElement = ELEMENTS.find((element) => CONTROLS[element] === dayElement);
  if (controllingElement === undefined) {
    throw new Error(`Unable to resolve officer/control element for ${dayElement}`);
  }
  return controllingElement;
}

function branchesContainingAny(stems: readonly HeavenlyStem[]): readonly EarthlyBranch[] {
  return (Object.entries(HIDDEN_STEM_MEMBERSHIP) as [EarthlyBranch, readonly HeavenlyStem[]][])
    .filter(([, hidden]) => hidden.some((stem) => stems.includes(stem)))
    .map(([branch]) => branch)
    .sort();
}

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

export const I18B_HIDDEN_CHALLENGE_SOURCES: readonly SourceReference[] = Object.freeze([
  INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei,
  INTERPRETATION_METHODOLOGY_SOURCES.yuanhaiZiping,
]);

export const I18B_HIDDEN_CHALLENGE_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: METHOD_VERSION,
  family: 'day_master_strength',
  name: 'Hidden-stem challenging relation evidence (research)',
  description:
    'Records hidden-stem membership relevant to output, wealth, and officer/control relations so branch evidence is not support-only. Membership does not determine effect strength, successful activation, or final day-master strength.',
  assumptions: [
    'Hidden output, wealth, and officer/control membership can be relevant to whole-chart strength analysis but must not be counted as equal-force numeric units.',
    'Presence of a hidden stem does not by itself establish its effective strength or whether structural relations alter its effect.',
    'This pack complements peer-root and resource-support evidence without modifying the closed I13 research baseline.',
    'No numeric weight or final strong/weak classification is emitted.',
  ],
  requiredFactTypes: [
    'pillars.year',
    'pillars.month',
    'pillars.day',
    'pillars.hour',
    'derivedFacts.dayMaster',
    'derivedFacts.hiddenStems',
  ],
  optionalFactTypes: ['stem_branch_relations', 'root_effect'],
  sourceIds: I18B_HIDDEN_CHALLENGE_SOURCES.map((source) => source.sourceId),
  status: 'research',
});

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return I18B_HIDDEN_CHALLENGE_SOURCES.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis' as const,
    notes:
      'Supports whole-chart inspection of output/wealth/officer relations. The rule records hidden membership only and does not equate membership with effective strength.',
  }));
}

function challengeRules(): readonly RuleDefinition[] {
  const relations: readonly HiddenChallengeRelation[] = ['output', 'wealth', 'officer'];

  return PILLAR_SLOTS.flatMap((slot) =>
    ELEMENTS.flatMap((dayMasterElement) =>
      relations.map((relation) => {
        const targetElement = targetElementForRelation(dayMasterElement, relation);
        const targetBranches = branchesContainingAny(STEMS_BY_ELEMENT[targetElement]);

        return {
          ruleId: `RULE-I18B-HIDDEN-${slot.toUpperCase()}-${dayMasterElement}-${relation.toUpperCase()}`,
          version: METHOD_VERSION,
          ruleSetId: CHALLENGE_RULE_SET,
          taxonomy: {
            tier: 'T2' as const,
            category: 'day_master_strength',
            subcategory: 'hidden_challenging_membership',
          },
          methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
          title: `${slot} branch contains hidden ${relation} membership for ${dayMasterElement}`,
          description:
            'Records hidden-stem membership in an output, wealth, or officer/control relation as challenging-side evidence. Effect, activation, and weight remain unresolved.',
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
                set: targetBranches,
              },
              { op: 'exists' as const, value: { kind: 'input' as const, key: 'hiddenStems' } },
            ],
          },
          output: {
            claimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
            subject: 'day_master',
            predicate: 'strength_evidence',
            value: {
              evidenceKind: 'hidden_challenge_membership',
              position: slot,
              dayMasterElement,
              targetElement,
              relation,
              direction: 'challenging',
              effect: 'not_determined',
              weight: 'not_assigned',
              overallStrength: 'not_determined',
            },
            polarity: 'challenging' as const,
            emphasis: 'minor' as const,
            tags: [
              'research',
              'hidden-stem',
              'challenge-evidence',
              'membership-only',
              'unweighted',
              'non-conclusive',
            ],
          },
          sourceRefs: sourceRefs(),
          quality: QUALITY,
          status: 'research' as const,
        } satisfies RuleDefinition;
      }),
    ),
  );
}

const SCOPE_GUARD: RuleDefinition = {
  ruleId: 'RULE-I18B-HIDDEN-CHALLENGE-SCOPE-GUARD',
  version: METHOD_VERSION,
  ruleSetId: GUARD_RULE_SET,
  taxonomy: {
    tier: 'T2',
    category: 'day_master_strength',
    subcategory: 'scope_guard',
  },
  methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
  title: 'Hidden challenge membership does not determine effect or strength',
  description:
    'Mandatory guard preventing hidden output/wealth/officer membership from being treated as equal-weight effective force or a final strength classifier.',
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
    claimType: 'DAY_MASTER_HIDDEN_CHALLENGE_SCOPE_GUARD',
    subject: 'day_master',
    predicate: 'scope_guard',
    value: {
      hiddenMembershipOnly: true,
      relationEffect: 'not_determined',
      rootOrChallengeEffect: 'not_determined',
      overallStrength: 'not_determined',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    polarity: 'neutral',
    emphasis: 'major',
    tags: ['research', 'scope-guard', 'membership-only', 'no-final-strength'],
  },
  sourceRefs: sourceRefs(),
  quality: QUALITY,
  status: 'research',
};

export const I18B_HIDDEN_CHALLENGE_RULES: readonly RuleDefinition[] = Object.freeze([
  ...challengeRules(),
  SCOPE_GUARD,
]);

export const I18B_HIDDEN_CHALLENGE_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-I18B-HIDDEN-CHALLENGE-STRENGTH-RESEARCH',
  version: METHOD_VERSION,
  name: 'I18B Hidden Challenging Strength Evidence Research Pack',
  methodologyRefs: [{ id: METHOD_ID, version: METHOD_VERSION }],
  enabledRuleSets: [CHALLENGE_RULE_SET, GUARD_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-I18B-EVIDENCE-ONLY', version: '0.1.0' },
  status: 'research',
});

export function createI18BHiddenChallengeRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: I18B_HIDDEN_CHALLENGE_RULES,
      methodologies: [I18B_HIDDEN_CHALLENGE_METHODOLOGY],
      sources: I18B_HIDDEN_CHALLENGE_SOURCES,
    },
    I18B_HIDDEN_CHALLENGE_PACK,
    createdAt,
  );
}
