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
  SAJU_R40_EVIDENCE_DEFINITION as definition,
} from './shared-natal-r40-exact-relation-nonjoining-research-evidence-adapter.js';

import { SAJU_R38_SOURCE } from './shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodId = 'M-SAJU-R40-EXACT-RELATION-NONJOINING';
const ruleSetId = 'saju-r40-exact-relation-nonjoining';
const schemaId = 'natal.r40_exact_relation_nonjoining.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const SAJU_R40_EXACT_RELATION_NONJOINING_CLAIM_TYPE = 'NATAL_EXACT_SUPPORT_SOURCE_RELATION_REMOTE_NONJOINING';

const sources = [
  {
    sourceId: SAJU_R38_SOURCE.sourceId,
    sourceType: 'web',
    title: SAJU_R38_SOURCE.title,
    language: 'zh-Hant',
    url: SAJU_R38_SOURCE.url,
    accessedAt: SAJU_R38_SOURCE.accessedAt,
    provenanceTier: 'primary',
    rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
    notes: `${SAJU_R38_SOURCE.locator}. All-five-family/both-orientation coverage is explicit project research adoption; partial effect is unresolved.`,
  },
] as const;

const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Independently replay R38 and full I29-I65 scoped source-relation intersection.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'remoteNonjoining',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;

const value = {
  evidenceKind: 'bounded_exact_i61_i65_relation_nonjoining',
  fullJoining: false,
  reason: 'REMOTE_YEAR_HOUR_NONJOINING',
  pairWitnessIdentity: 'validated_r38_i61_i65_relation_and_channel_only',
  genericI65Outcome: 'not_determined',
  partialEffect: 'not_determined',
  zeroEffect: 'not_determined',
  transformedElement: 'not_determined',
  supportActivationPersistence: 'not_determined',
  postRelationRootState: 'not_determined',
  qiangRuo: 'not_determined',
  narrativeMateriality: false,
  productionAuthority: false,
} as const;

const schema = {
  schemaId,
  version,
  root: {
    kind: 'object',
    required: Object.keys(value),
    properties: Object.fromEntries(
      Object.entries(value).map(([key, literal]) => [
        key,
        { kind: 'literal' as const, value: literal },
      ]),
    ),
    additionalProperties: false,
  },
} as const satisfies ClaimValueSchemaDefinition;

export const SAJU_R40_EXACT_RELATION_NONJOINING_CLAIM_TYPE_DEFINITION = {
  claimType: SAJU_R40_EXACT_RELATION_NONJOINING_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;

const methodology = {
  methodologyId: methodId,
  version,
  family: 'stem_branch_interaction',
  name: 'Bounded R38 relation reconciliation against I61/I65',
  description:
    'Deny full joining only for a verified R38 year/hour relation that is an exact I61 support-source touch and I65 dispatched relation; no other I65 settlement outcome changes.',
  assumptions: [
    'The source example is 甲年/己時; the generic distance principle is explicitly adopted across five R051 pair families and both orientations.',
    'Remote nonjoining is compatible with unresolved partial consequences, never zero effect.',
    'Competing endpoint pairs, other distances and unknown input preserve uncertainty.',
    'No branch/hidden/root/season/strength/role input or effective support result is used.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: sources.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;

export const SAJU_R40_EXACT_RELATION_NONJOINING_RULE = {
  ruleId: 'RULE-SAJU-R40-EXACT-RELATION-NONJOINING',
  version,
  ruleSetId,
  taxonomy: {
    tier: 'T2',
    category: 'stem_branch_interaction',
    subcategory: 'bounded_support_source_relation_nonjoining',
  },
  methodologyRef: { id: methodId, version },
  title: 'Exact I61/I65 support-source relation: remote pair cannot fully join',
  description:
    'Exact support-source relation identity has bounded negative full-joining, but I65 settlement outcome and support activation remain unresolved.',
  inputs: [input],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: input.key, path: 'exactSourceRelationFullJoiningDenied' },
    right: { kind: 'literal', value: true },
  },
  output: {
    claimType: SAJU_R40_EXACT_RELATION_NONJOINING_CLAIM_TYPE,
    subject: 'natal_visible_stems',
    predicate: 'exact_support_source_relation_remote_full_joining_denied',
    value,
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'exact-relation', 'support-source', 'nonjoining'],
  },
  sourceRefs: sources.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis' as const,
    notes: 'R38 nonjoining applied to exact independently replayed I61/I65 relation identity only.',
  })),
  quality: {
    provenanceQuality: 'primary_supported',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
} as const satisfies RuleDefinition;

export const SAJU_R40_EXACT_RELATION_NONJOINING_PACK = {
  packId: 'PACK-SAJU-R40-EXACT-RELATION-NONJOINING-RESEARCH',
  version,
  name: 'SAJU-R40 Exact I61/I65 Relation Nonjoining',
  methodologyRefs: [{ id: methodId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R40-RELATION-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;

export function createSajuR40ExactRelationNonjoiningResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SAJU_R40_EXACT_RELATION_NONJOINING_RULE],
      methodologies: [methodology],
      sources: [...sources],
      claimTypeDefinitions: [SAJU_R40_EXACT_RELATION_NONJOINING_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [schema],
      reviewAttestations: [],
    },
    SAJU_R40_EXACT_RELATION_NONJOINING_PACK,
    createdAt,
  );
}
