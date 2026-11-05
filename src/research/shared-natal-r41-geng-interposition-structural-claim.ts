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
  SAJU_R41_SOURCE as source,
  SAJU_R41_GENG_INTERPOSITION_EVIDENCE_DEFINITION as definition,
} from './shared-natal-r41-geng-interposition-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodId = 'M-SAJU-R41-GENG-INTERPOSITION';
const ruleSetId = 'saju-r41-exact-geng-interposition';
const schemaId = 'natal.r41_exact_geng_interposition.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const SAJU_R41_GENG_INTERPOSITION_CLAIM_TYPE =
  'NATAL_EXACT_GENG_INTERPOSED_JIA_JI_NONJOINING';

const sources = [{
  sourceId: source.sourceId,
  sourceType: 'web',
  title: source.title,
  language: 'zh-Hant',
  url: source.url,
  accessedAt: source.accessedAt,
  provenanceTier: 'primary',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
  notes: source.locator + '. Exact source example only; positional triple windows are bounded project methodology. No partial/net effects.',
}] as const;
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale: 'Four-stem canonical binding and independent replay of exact 甲 庚 己 intervening witness.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'gengInterposition',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;

const value = {
  evidenceKind: 'source_exact_jia_geng_ji_interposition',
  pairId: 'JIA-JI',
  interveningStem: '庚',
  fullJoining: false,
  witnessIdentity: 'validated_research_evidence_only',
  partialEffect: 'not_determined',
  zeroEffect: 'not_determined',
  bindingWinner: 'not_determined',
  transformedElement: 'not_determined',
  supportActivationPersistence: 'not_determined',
  supportNetEffect: 'not_determined',
  postRelationRootState: 'not_determined',
  effectiveMechanismForce: 'not_determined',
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
const claimType = {
  claimType: SAJU_R41_GENG_INTERPOSITION_CLAIM_TYPE,
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
  name: 'Exact source 甲 庚 己 intervening nonjoining',
  description:
    'Only the source example of 庚 intervening between 甲 and 己 is an admitted full-joining denial.',
  assumptions: [
    'The original scan expressly discusses 甲 and 己 with one intervening 庚 that controls 甲.',
    'The adopted exact contiguous triple is year/month/day or month/day/hour, with an unrelated fourth visible stem.',
    'Reverse order, additional competing endpoints, wider separation or a different intermediary have no verdict.',
    'A denied full joining is not a zero effect, proof of destroyed support, transformation, force or classification.',
    'R38 supplies canonical validation only; R38 remote nonjoining and R39 positional rivalry are unchanged.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: sources.map((s) => s.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const SAJU_R41_GENG_INTERPOSITION_RULE = {
  ruleId: 'RULE-SAJU-R41-EXACT-GENG-INTERPOSITION',
  version,
  ruleSetId,
  taxonomy: {
    tier: 'T2',
    category: 'stem_branch_interaction',
    subcategory: 'source_exact_interposed_nonjoining',
  },
  methodologyRef: { id: methodId, version },
  title: 'Exact 甲 庚 己 interposition denies full joining',
  description: 'The source-bounded positional negative verdict; all effect consequences unresolved.',
  inputs: [input],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: input.key, path: 'state' },
    right: { kind: 'literal', value: 'exact_interposed_geng_nonjoining' },
  },
  output: {
    claimType: SAJU_R41_GENG_INTERPOSITION_CLAIM_TYPE,
    subject: 'natal_visible_stems',
    predicate: 'source_exact_interposed_geng_full_joining_denied',
    value,
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'source-exact', 'interposed-geng', 'nonjoining'],
  },
  sourceRefs: sources.map((s) => ({
    sourceId: s.sourceId,
    supportType: 'interpretive_basis' as const,
    notes: '甲 庚 己 source example only; no support-effect settlement.',
  })),
  quality: {
    provenanceQuality: 'primary_supported',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
} as const satisfies RuleDefinition;

export const SAJU_R41_GENG_INTERPOSITION_PACK = {
  packId: 'PACK-SAJU-R41-GENG-INTERPOSITION-RESEARCH',
  version,
  name: 'SAJU-R41 Exact Geng Interposition Research',
  methodologyRefs: [{ id: methodId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R41-GENG-INTERPOSITION-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;

export function createSajuR41GengInterpositionResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SAJU_R41_GENG_INTERPOSITION_RULE],
      methodologies: [methodology],
      sources: [...sources],
      claimTypeDefinitions: [claimType],
      claimValueSchemas: [schema],
      reviewAttestations: [],
    },
    SAJU_R41_GENG_INTERPOSITION_PACK,
    createdAt,
  );
}
