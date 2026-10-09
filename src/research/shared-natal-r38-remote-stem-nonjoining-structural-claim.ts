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
  SAJU_R38_SOURCE,
  SAJU_R38_REMOTE_NONJOINING_EVIDENCE_DEFINITION as definition,
} from './shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodId = 'M-SAJU-R38-REMOTE-STEM-NONJOINING';
const ruleSetId = 'saju-r38-remote-stem-nonjoining';
const schemaId = 'natal.r38_remote_stem_nonjoining.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const SAJU_R38_REMOTE_NONJOINING_CLAIM_TYPE = 'NATAL_YEAR_HOUR_REMOTE_STEM_NONJOINING';

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
    'Independently replay four visible stem identities, year/hour pair and competing endpoint exclusion.',
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
  evidenceKind: 'bounded_year_hour_remote_stem_nonjoining',
  fullJoining: false,
  reason: 'REMOTE_YEAR_HOUR_NONJOINING',
  pairWitnessIdentity: 'validated_research_evidence_only',
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

export const SAJU_R38_REMOTE_NONJOINING_CLAIM_TYPE_DEFINITION = {
  claimType: SAJU_R38_REMOTE_NONJOINING_CLAIM_TYPE,
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
  name: 'Bounded remote year/hour stem nonjoining',
  description:
    'Deny full joining only for one year/hour R051 pair without an endpoint competitor in the two intervening visible stems.',
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

export const SAJU_R38_REMOTE_NONJOINING_RULE = {
  ruleId: 'RULE-SAJU-R38-YEAR-HOUR-REMOTE-NONJOINING',
  version,
  ruleSetId,
  taxonomy: {
    tier: 'T2',
    category: 'stem_branch_interaction',
    subcategory: 'bounded_remote_nonjoining',
  },
  methodologyRef: { id: methodId, version },
  title: 'Year/hour remote pair cannot fully join',
  description:
    'Source-bounded negative joining verdict, with partial effect and support consequences unresolved.',
  inputs: [input],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: input.key, path: 'state' },
    right: { kind: 'literal', value: 'remote_nonjoining' },
  },
  output: {
    claimType: SAJU_R38_REMOTE_NONJOINING_CLAIM_TYPE,
    subject: 'natal_visible_stems',
    predicate: 'year_hour_remote_full_joining_denied',
    value,
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'remote-position', 'nonjoining'],
  },
  sourceRefs: sources.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis' as const,
    notes: 'Remote-position nonjoining; partial consequences retained as uncertainty.',
  })),
  quality: {
    provenanceQuality: 'primary_supported',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
} as const satisfies RuleDefinition;

export const SAJU_R38_REMOTE_NONJOINING_PACK = {
  packId: 'PACK-SAJU-R38-REMOTE-NONJOINING-RESEARCH',
  version,
  name: 'SAJU-R38 Remote Year/Hour Nonjoining',
  methodologyRefs: [{ id: methodId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R38-REMOTE-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;

export function createSajuR38RemoteNonjoiningResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SAJU_R38_REMOTE_NONJOINING_RULE],
      methodologies: [methodology],
      sources: [...sources],
      claimTypeDefinitions: [SAJU_R38_REMOTE_NONJOINING_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [schema],
      reviewAttestations: [],
    },
    SAJU_R38_REMOTE_NONJOINING_PACK,
    createdAt,
  );
}
