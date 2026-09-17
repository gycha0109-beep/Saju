import type { TenGod } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

export const GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION = '0.2.0-research' as const;

export type GeneralNatalSourceBoundedFamily =
  | 'peer'
  | 'resource'
  | 'output'
  | 'wealth'
  | 'officer';

export type GeneralNatalSourceBoundedRelationKind =
  | 'generates'
  | 'adverse_to'
  | 'conflicts_with';

const METHOD_ID = 'M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1';
const FAMILY_RULE_SET = 'general-natal-source-bounded-family-presence';
const RELATION_RULE_SET = 'general-natal-source-bounded-structural-relation';

export const GENERAL_NATAL_PEER_TAXONOMY_SOURCE = Object.freeze({
  sourceId: 'SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY',
  sourceType: 'classical_text',
  title: '三命通會（四庫全書本）卷七',
  language: 'zh-Hant',
  locator: {
    section: '兄弟',
  },
  url: 'https://zh.wikisource.org/w/index.php?title=%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)%2F%E5%8D%B707&oldid=2082208',
  accessedAt: '2026-09-18',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'public_domain',
    reusePolicy: 'paraphrase_only',
  },
  notes:
    'Research-only direct peer-family taxonomy witness. The pinned transcription states 兄弟者，即劫財比肩, directly supporting the 比肩 + 劫財 peer grouping. Permanent transcription identity is pinned, but scan/transcription identity and Production source-integrity qualification remain separate.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

const FAMILIES: Readonly<Record<GeneralNatalSourceBoundedFamily, readonly TenGod[]>> =
  Object.freeze({
    peer: ['비견', '겁재'],
    resource: ['편인', '정인'],
    output: ['식신', '상관'],
    wealth: ['편재', '정재'],
    officer: ['편관', '정관'],
  });

const ALL_SLOTS = [
  'year.stem.value',
  'month.stem.value',
  'hour.stem.value',
  'year.branch.value',
  'month.branch.value',
  'day.branch.value',
  'hour.branch.value',
] as const;

export const GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  family: 'domain_synthesis',
  name: 'General natal source-bounded Ten-God structural relations (research)',
  description:
    'Materializes whole-chart Ten-God family presence and only the five structural relations directly covered by the currently pinned classical passage witnesses.',
  assumptions: [
    'Family presence is non-numeric and does not establish dominance, strength, Gyeokguk, Yongshin, or fortune polarity.',
    'Structural relation claims preserve only the source-bounded relation between Ten-God families.',
    'Where registered sources differ in breadth, executable scope is narrowed to their directly supported intersection.',
    'No personality, behavior, work, money, relationship, health, event, timing, or success/failure inference is authorized by this methodology.',
    'Consumer projection from a structural relation requires a separately reviewed semantic bridge and is not authorized here.',
    'The methodology remains research-only until independently governed provenance, review, trust, and lifecycle gates are satisfied.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [
    GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
  ],
  status: 'research',
});

function familyCondition(family: GeneralNatalSourceBoundedFamily): RuleExpression {
  return {
    op: 'or',
    expressions: ALL_SLOTS.map((path) => ({
      op: 'in' as const,
      value: { kind: 'input' as const, key: 'tenGods', path },
      set: FAMILIES[family],
    })),
  };
}

function tenGodPresenceCondition(inputKey: string, tenGod: TenGod): RuleExpression {
  return {
    op: 'or',
    expressions: ALL_SLOTS.map((path) => ({
      op: 'in' as const,
      value: { kind: 'input' as const, key: inputKey, path },
      set: [tenGod],
    })),
  };
}

function familySourceRefs(
  family: GeneralNatalSourceBoundedFamily,
): RuleDefinition['sourceRefs'] {
  const yuanhai = {
    sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    supportType: 'direct_basis' as const,
    notes: 'Supports the bounded Ten-God family taxonomy around the day master.',
  };
  if (family === 'peer') {
    return [
      yuanhai,
      {
        sourceId: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
        supportType: 'direct_basis' as const,
        notes: 'Directly groups 劫財 and 比肩 on the sibling/peer side in 三命通會卷七.',
      },
    ];
  }
  return [
    yuanhai,
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'corroboration' as const,
      notes: 'Corroborates the generating/generated/controlling/controlled family taxonomy.',
    },
  ];
}

function familyPresenceRule(family: GeneralNatalSourceBoundedFamily): RuleDefinition {
  return {
    ruleId: `RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-${family.toUpperCase()}-PRESENT`,
    version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    ruleSetId: FAMILY_RULE_SET,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'source_bounded_family_presence' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION },
    title: `${family} family presence for source-bounded synthesis`,
    description:
      'Materializes one observed Ten-God family without assigning dominance, behavior, fortune polarity, or consumer meaning.',
    inputs: [
      {
        key: 'tenGods',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.tenGods',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: familyCondition(family),
    output: {
      claimType: `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_${family.toUpperCase()}_PRESENT`,
      subject: 'natal_chart',
      predicate: 'ten_god_family_presence',
      value: {
        family,
        presence: 'observed',
        dominance: 'not_scored',
        consumerProjectionAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'source-bounded', 'ten-god-family', 'non-numeric'],
    },
    sourceRefs: familySourceRefs(family),
    quality: QUALITY,
    status: 'research',
  };
}

interface StructuralRelationSpec {
  readonly id: string;
  readonly fromFamily: GeneralNatalSourceBoundedFamily;
  readonly toFamily: GeneralNatalSourceBoundedFamily;
  readonly relationKind: GeneralNatalSourceBoundedRelationKind;
  readonly classicalPattern: string;
  readonly evidenceScope: 'family_level' | 'exact_member_intersection';
  readonly requiredTenGod?: TenGod;
}

const STRUCTURAL_RELATIONS = Object.freeze([
  {
    id: 'OUTPUT-TO-WEALTH',
    fromFamily: 'output',
    toFamily: 'wealth',
    relationKind: 'generates',
    classicalPattern: '食傷→財',
    evidenceScope: 'family_level',
  },
  {
    id: 'WEALTH-TO-OFFICER',
    fromFamily: 'wealth',
    toFamily: 'officer',
    relationKind: 'generates',
    classicalPattern: '財→官殺',
    evidenceScope: 'family_level',
  },
  {
    id: 'OFFICER-TO-RESOURCE',
    fromFamily: 'officer',
    toFamily: 'resource',
    relationKind: 'generates',
    classicalPattern: '官殺→印',
    evidenceScope: 'family_level',
  },
  {
    id: 'PEER-TO-WEALTH-ADVERSE',
    fromFamily: 'peer',
    toFamily: 'wealth',
    relationKind: 'adverse_to',
    classicalPattern: '劫財→財',
    evidenceScope: 'exact_member_intersection',
    requiredTenGod: '겁재',
  },
  {
    id: 'WEALTH-RESOURCE-CONFLICT',
    fromFamily: 'wealth',
    toFamily: 'resource',
    relationKind: 'conflicts_with',
    classicalPattern: '財↔印',
    evidenceScope: 'family_level',
  },
] as const satisfies readonly StructuralRelationSpec[]);

const STRUCTURAL_SOURCE_REFS: RuleDefinition['sourceRefs'] = Object.freeze([
  {
    sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    supportType: 'direct_basis',
    notes: 'Provides the passage-pinned structural relation in the fixed Yuanhai transcription.',
  },
  {
    sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    supportType: 'direct_basis',
    notes: 'Provides an independently passage-pinned structural relation in Samyeong Tonghoe volume 5.',
  },
]);

function structuralRelationRule(spec: StructuralRelationSpec): RuleDefinition {
  const inputs: RuleDefinition['inputs'] = [
    {
      key: spec.fromFamily,
      source: 'interpretation_claim',
      pathOrClaimType: `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_${spec.fromFamily.toUpperCase()}_PRESENT`,
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
    {
      key: spec.toFamily,
      source: 'interpretation_claim',
      pathOrClaimType: `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_${spec.toFamily.toUpperCase()}_PRESENT`,
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    },
    ...(spec.requiredTenGod === undefined
      ? []
      : [
          {
            key: 'exactTenGod',
            source: 'derived_fact' as const,
            pathOrClaimType: 'derivedFacts.tenGods',
            acceptedStatuses: ['resolved'] as const,
            required: true,
            ambiguityBehavior: 'scenario_preserving' as const,
          },
        ]),
  ];

  const expressions: RuleExpression[] = [
    {
      op: 'exists',
      value: { kind: 'input', key: spec.fromFamily },
    },
    {
      op: 'exists',
      value: { kind: 'input', key: spec.toFamily },
    },
  ];
  if (spec.requiredTenGod !== undefined) {
    expressions.push(tenGodPresenceCondition('exactTenGod', spec.requiredTenGod));
  }

  return {
    ruleId: `RULE-GENERAL-NATAL-SOURCE-BOUNDED-${spec.id}`,
    version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    ruleSetId: RELATION_RULE_SET,
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'source_bounded_relation' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION },
    title: `${spec.classicalPattern} source-bounded structural relation`,
    description:
      'Emits only a classical Ten-God structural relation after its source-bounded endpoint and exact-member constraints are satisfied; no modern consumer inference is added.',
    inputs,
    condition: { op: 'and', expressions },
    output: {
      claimType: `GENERAL_NATAL_SOURCE_BOUNDED_${spec.id.replaceAll('-', '_')}`,
      subject: 'natal_chart',
      predicate: 'ten_god_structural_relation',
      value: {
        relationId: spec.id,
        fromFamily: spec.fromFamily,
        toFamily: spec.toFamily,
        relationKind: spec.relationKind,
        classicalPattern: spec.classicalPattern,
        evidenceScope: spec.evidenceScope,
        exactTenGodConstraint: spec.requiredTenGod ?? null,
        consumerProjectionAuthorized: false,
        behavioralInferenceAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'source-bounded', 'structural-relation', 'no-consumer-projection'],
    },
    sourceRefs: STRUCTURAL_SOURCE_REFS,
    quality: QUALITY,
    status: 'research',
  };
}

export const GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES = Object.freeze(
  (Object.keys(FAMILIES) as GeneralNatalSourceBoundedFamily[]).map(familyPresenceRule),
);

export const GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES = Object.freeze(
  STRUCTURAL_RELATIONS.map(structuralRelationRule),
);

const ALL_RULES = Object.freeze([
  ...GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  ...GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
]);

export const GENERAL_NATAL_SOURCE_BOUNDED_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1',
  version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  name: 'General natal source-bounded structural relation research pack',
  methodologyRefs: [
    { id: METHOD_ID, version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION },
  ],
  enabledRuleSets: [FAMILY_RULE_SET, RELATION_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-SOURCE-BOUNDED-RESEARCH',
    version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  },
  status: 'research',
});

export function createGeneralNatalSourceBoundedRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...ALL_RULES],
      methodologies: [GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
      ],
    },
    GENERAL_NATAL_SOURCE_BOUNDED_PACK,
    createdAt,
  );
}
