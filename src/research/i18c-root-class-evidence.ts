import type { EarthlyBranch, FiveElement, HeavenlyStem } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { INTERPRETATION_METHODOLOGY_SOURCES } from './interpretation-methodology-catalog.js';

const METHOD_ID = 'M-STRENGTH-FUYI-INTRINSIC-ROOT-CLASS';
const METHOD_VERSION = '0.1.0-research';
const ROOT_RULE_SET = 'i18c-intrinsic-root-class-evidence';
const GUARD_RULE_SET = 'i18c-root-class-scope-guard';
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const NON_EARTH_ELEMENTS = ['목', '화', '금', '수'] as const satisfies readonly FiveElement[];
const STORAGE_BRANCHES = ['진', '술', '축', '미'] as const satisfies readonly EarthlyBranch[];

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = Object.freeze({
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
});

const STRONG_ROOT_BRANCHES: Readonly<
  Record<(typeof NON_EARTH_ELEMENTS)[number], readonly EarthlyBranch[]>
> = Object.freeze({
  목: ['해', '인', '묘'],
  화: ['인', '사', '오'],
  금: ['사', '신', '유'],
  수: ['신', '해', '자'],
});

export type IntrinsicRootClass =
  | 'strong_birth_lu_wang_candidate'
  | 'residual_storage_candidate'
  | 'earth_root_class_unresolved';

const xiejiSource: SourceReference = {
  sourceId: 'SRC-I18C-XIEJI-FIVE-ELEMENT-GROWTH',
  sourceType: 'classical_text',
  title: '欽定協紀辨方書 — 五行長生說',
  url: 'https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%85%A8%E8%A6%BD1',
  accessedAt: '2026-08-20',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'public_domain',
    reusePolicy: 'metadata_only',
  },
  notes:
    'Used only to cross-reference five-element birth-stage locations. The text records competing earth birth-stage treatments, so earth root class is intentionally unresolved.',
};

export const I18C_XIEJI_SOURCE: SourceReference = Object.freeze(xiejiSource);
export const I18C_ROOT_CLASS_SOURCES: readonly SourceReference[] = Object.freeze([
  INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei,
  I18C_XIEJI_SOURCE,
]);

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

function branchesContainingElement(element: FiveElement): readonly EarthlyBranch[] {
  const stems = STEMS_BY_ELEMENT[element];
  return (Object.entries(HIDDEN_STEM_MEMBERSHIP) as [EarthlyBranch, readonly HeavenlyStem[]][])
    .filter(([, hidden]) => hidden.some((stem) => stems.includes(stem)))
    .map(([branch]) => branch)
    .sort();
}

function residualBranches(element: (typeof NON_EARTH_ELEMENTS)[number]): readonly EarthlyBranch[] {
  const strong = new Set(STRONG_ROOT_BRANCHES[element]);
  const containing = new Set(branchesContainingElement(element));
  return STORAGE_BRANCHES.filter((branch) => containing.has(branch) && !strong.has(branch));
}

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei.sourceId,
      supportType: 'direct_basis',
      notes:
        'Distinguishes heavier longsheng/lu/wang roots from lighter storage/residual roots without reducing them to numeric weights.',
    },
    {
      sourceId: I18C_XIEJI_SOURCE.sourceId,
      supportType: 'corroboration',
      notes:
        'Cross-references five-element birth-stage locations and preserves the documented earth-stage disagreement as unresolved.',
    },
  ];
}

export const I18C_ROOT_CLASS_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: METHOD_VERSION,
  family: 'day_master_strength',
  name: 'Intrinsic root-class candidate taxonomy (research)',
  description:
    'Classifies same-element branch roots into source-backed intrinsic candidate classes before structural relation effects. Earth remains unresolved and no numeric weight or final strength is emitted.',
  assumptions: [
    'Longsheng/lu/wang-style roots and storage/residual roots are not equivalent.',
    'Intrinsic root class precedes clash/combination/transformation effect analysis.',
    'Competing earth birth-stage treatments are not silently collapsed.',
    'No root class is converted to a numeric score.',
  ],
  requiredFactTypes: ['derivedFacts.dayMaster', 'derivedFacts.hiddenStems'],
  optionalFactTypes: ['stem_branch_relations', 'root_effect_after_relations'],
  sourceIds: I18C_ROOT_CLASS_SOURCES.map((source) => source.sourceId),
  status: 'research',
});

function baseInputs(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition['inputs'] {
  return [
    {
      key: 'dayMaster',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
    {
      key: 'pillar',
      source: 'canonical_fact',
      pathOrClaimType: `pillars.${slot}`,
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
    {
      key: 'hiddenStems',
      source: 'derived_fact',
      pathOrClaimType: `derivedFacts.hiddenStems.${slot}`,
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
  ];
}

function rootRule(
  slot: (typeof PILLAR_SLOTS)[number],
  dayMasterElement: FiveElement,
  rootClass: IntrinsicRootClass,
  branches: readonly EarthlyBranch[],
): RuleDefinition {
  return {
    ruleId: `RULE-I18C-ROOT-${slot.toUpperCase()}-${dayMasterElement}-${rootClass.toUpperCase()}`,
    version: METHOD_VERSION,
    ruleSetId: ROOT_RULE_SET,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'intrinsic_root_class_candidate',
    },
    methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
    title: `${slot} ${dayMasterElement} intrinsic root class: ${rootClass}`,
    description:
      'Records an intrinsic same-element root class candidate before structural relation effects. Output remains non-numeric and non-conclusive.',
    inputs: baseInputs(slot),
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'dayMaster', path: 'element' },
          right: { kind: 'literal', value: dayMasterElement },
        },
        {
          op: 'in',
          value: { kind: 'input', key: 'pillar', path: 'branch.value' },
          set: branches,
        },
        { op: 'exists', value: { kind: 'input', key: 'hiddenStems' } },
      ],
    },
    output: {
      claimType: 'DAY_MASTER_ROOT_CLASS_EVIDENCE',
      subject: 'day_master',
      predicate: 'intrinsic_root_class_candidate',
      value: {
        evidenceKind: 'intrinsic_root_class_candidate',
        position: slot,
        dayMasterElement,
        rootClass,
        relationEffect: 'not_evaluated',
        effectiveState: 'not_determined',
        weight: 'not_assigned',
        overallStrength: 'not_determined',
      },
      polarity: 'supportive',
      emphasis: rootClass === 'strong_birth_lu_wang_candidate' ? 'moderate' : 'minor',
      tags: ['research', 'root-class', 'intrinsic-only', 'unweighted', 'non-conclusive'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function rootRules(): readonly RuleDefinition[] {
  const nonEarth = PILLAR_SLOTS.flatMap((slot) =>
    NON_EARTH_ELEMENTS.flatMap((element) => [
      rootRule(slot, element, 'strong_birth_lu_wang_candidate', STRONG_ROOT_BRANCHES[element]),
      rootRule(slot, element, 'residual_storage_candidate', residualBranches(element)),
    ]),
  );
  const earthBranches = branchesContainingElement('토');
  const earth = PILLAR_SLOTS.map((slot) =>
    rootRule(slot, '토', 'earth_root_class_unresolved', earthBranches),
  );
  return [...nonEarth, ...earth];
}

const SCOPE_GUARD: RuleDefinition = {
  ruleId: 'RULE-I18C-ROOT-CLASS-SCOPE-GUARD',
  version: METHOD_VERSION,
  ruleSetId: GUARD_RULE_SET,
  taxonomy: { tier: 'T2', category: 'day_master_strength', subcategory: 'scope_guard' },
  methodologyRef: { id: METHOD_ID, version: METHOD_VERSION },
  title: 'Intrinsic root class is not effective root strength',
  description:
    'Prevents intrinsic root-class candidates from becoming post-relation root effect, numeric weight, or final day-master strength.',
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
    claimType: 'DAY_MASTER_ROOT_CLASS_SCOPE_GUARD',
    subject: 'day_master',
    predicate: 'scope_guard',
    value: {
      intrinsicClassOnly: true,
      relationEffect: 'not_evaluated',
      effectiveRootStrength: 'not_determined',
      overallStrength: 'not_determined',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    polarity: 'neutral',
    emphasis: 'major',
    tags: ['research', 'scope-guard', 'no-final-strength'],
  },
  sourceRefs: sourceRefs(),
  quality: QUALITY,
  status: 'research',
};

export const I18C_ROOT_CLASS_RULES: readonly RuleDefinition[] = Object.freeze([
  ...rootRules(),
  SCOPE_GUARD,
]);

export const I18C_ROOT_CLASS_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-I18C-INTRINSIC-ROOT-CLASS-RESEARCH',
  version: METHOD_VERSION,
  name: 'I18C Intrinsic Root-Class Research Pack',
  methodologyRefs: [{ id: METHOD_ID, version: METHOD_VERSION }],
  enabledRuleSets: [ROOT_RULE_SET, GUARD_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-I18C-ROOT-CLASS-ONLY', version: '0.1.0' },
  status: 'research',
});

export function createI18CRootClassRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: I18C_ROOT_CLASS_RULES,
      methodologies: [I18C_ROOT_CLASS_METHODOLOGY],
      sources: I18C_ROOT_CLASS_SOURCES,
    },
    I18C_ROOT_CLASS_PACK,
    createdAt,
  );
}
