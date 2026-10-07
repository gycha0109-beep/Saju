import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  MethodologyResearchEvidenceInputContract,
  RuleDefinition,
  RuleInputRequirement,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY,
  VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_VALUES,
  type VisibleStemBijieSupportMemberCount,
} from './general-natal-visible-stem-bijie-support-member-count-authority.js';
import {
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-stem-bijie-support-member-count-research-evidence-adapter.js';
import { SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES } from './shared-natal-visible-stem-bijie-support-union-structural-claim.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_EVIDENCE' as const;
const version = SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_STRUCTURAL_CLAIM_VERSION;
const schemaId = 'day_master.visible_stem_bijie_support_member_count_evidence.schema';
const methodologyId = 'M-STRENGTH-FUYI-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT';
const ruleSetId = 'saju-r25-visible-stem-bijie-support-member-count';
const definitionRef = Object.freeze({
  id: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION.definitionId,
  version:
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION.version,
});
const researchInput = {
  source: 'research_evidence',
  evidenceType: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Consumes only reproduced snapshot-bound R25 cardinality of the R23 governed support union. Count is neither a score nor a complete collection.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'visibleStemBijieSupportMemberCountEvidence',
  source: 'research_evidence',
  pathOrClaimType: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_TYPE,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_VERSION,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;

export function visibleStemBijieSupportMemberCountClaimValue(
  count: VisibleStemBijieSupportMemberCount,
) {
  return Object.freeze({
    evidenceKind: 'visible_stem_bijie_support_member_count',
    semanticScope: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.semanticScope,
    visibleStemBijieSupportMemberCount: count,
    completeBijieCollection: false,
    wholeChartBijieCount: 'not_authorized',
    supportWeight: 'not_authorized',
    dangZhong: 'not_determined',
    zhuGua: 'not_determined',
    qiangRuo: 'not_determined',
    wangShuai: 'not_determined',
    gyeokguk: 'not_determined',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const);
}

const literalProperties = Object.fromEntries(
  Object.entries(visibleStemBijieSupportMemberCountClaimValue(0))
    .filter(([key]) => key !== 'visibleStemBijieSupportMemberCount')
    .map(([key, value]) => [key, { kind: 'literal' as const, value }]),
);
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'object',
    required: Object.keys(visibleStemBijieSupportMemberCountClaimValue(0)),
    properties: {
      ...literalProperties,
      visibleStemBijieSupportMemberCount: {
        kind: 'union',
        anyOf: VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_VALUES.map((value) => ({
          kind: 'literal',
          value,
        })),
      },
    },
    additionalProperties: false,
  },
} as const satisfies ClaimValueSchemaDefinition;
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE_DEFINITION = {
  claimType: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Bounded visible-stem Bijie support-member cardinality',
  description:
    'R25 counts only true R23 support slots in year/month/hour. Zero is a resolved bounded observation; missing evidence is never zero. No downstream classifier or Production authority.',
  assumptions: [
    'R23 resolved support union with verified R21/R15/R19 parity is required.',
    'Ten-God membership is not recalculated by R25.',
    'Day self, branches, hidden stems, individual member counts and whole-chart collection are excluded.',
    'Cardinality cannot establish weight, composition, 黨眾/助寡, 強弱/旺衰 or 格局.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;

// The declarative engine uses four mutually exclusive literal outputs. Exactly
// one bounded count claim (including zero) is emitted from validated evidence.
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RULES = Object.freeze(
  VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_VALUES.map((count): RuleDefinition => ({
    ruleId: `RULE-SAJU-R25-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT-${count}`,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_bijie_support_member_count',
    },
    methodologyRef: { id: methodologyId, version },
    title: `Bounded visible-stem support-member count equals ${count}`,
    description:
      'Emits only structural cardinality of the fixed R23 union; never a strength score or whole-chart verdict.',
    inputs: [input],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: input.key, path: 'visibleStemBijieSupportMemberCount' },
      right: { kind: 'literal', value: count },
    },
    output: {
      claimType: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_bijie_support_member_count_observed',
      value: visibleStemBijieSupportMemberCountClaimValue(count),
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'visible-stem', 'bijie', 'bounded-support-member-count'],
    },
    sourceRefs: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis',
      notes:
        'Source meaning remains governed by R23. R25 adds explicit fixed-domain arithmetic authority only.',
    })),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  })),
);
export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_PACK = {
  packId: 'PACK-SAJU-R25-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT-RESEARCH',
  version,
  name: 'SAJU-R25 Bounded Visible-Stem Bijie Support-Member Count Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-SAJU-R25-VISIBLE-STEM-BIJIE-SUPPORT-MEMBER-COUNT-RESEARCH',
    version,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;

export function createSharedNatalVisibleStemBijieSupportMemberCountResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RULES,
      methodologies: [SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_METHODOLOGY],
      sources: [...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_PACK,
    createdAt,
  );
}
