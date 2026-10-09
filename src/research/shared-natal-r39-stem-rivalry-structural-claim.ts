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
  SAJU_R39_SOURCE as source,
  SAJU_R39_STEM_RIVALRY_EVIDENCE_DEFINITION as definition,
} from './shared-natal-r39-stem-rivalry-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodId = 'M-SAJU-R39-STEM-RIVALRY';
const ruleSetId = 'saju-r39-stem-rivalry';
const schemaId = 'natal.r39_stem_rivalry.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const SAJU_R39_STEM_RIVALRY_CLAIM_TYPE = 'NATAL_POSITION_SPECIFIC_STEM_RIVALRY';
const sources = [
  {
    sourceId: source.sourceId,
    sourceType: 'web',
    title: source.title,
    language: 'zh-Hant',
    url: source.url,
    accessedAt: source.accessedAt,
    provenanceTier: 'primary',
    rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
    notes: `${source.locator}. Exact V1 position domain/all-family execution is explicit project research methodology; no joining winner or force.`,
  },
] as const;
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Independent replay of one exact two-to-one pair and admitted position-specific rivalry distinction.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'stemRivalry',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;
const variants = [
  { state: 'contiguous_rivalry', jealousRivalry: true },
  { state: 'separated_without_rivalry', jealousRivalry: false },
] as const;
function claimValue(jealousRivalry: boolean) {
  return {
    evidenceKind: 'bounded_position_specific_stem_rivalry',
    jealousRivalry,
    witnessIdentity: 'validated_research_evidence_only',
    fullJoining: 'not_determined',
    joiningWinner: 'not_determined',
    partialEffect: 'not_determined',
    zeroEffect: 'not_determined',
    transformedElement: 'not_determined',
    supportActivationPersistence: 'not_determined',
    postRelationRootState: 'not_determined',
    qiangRuo: 'not_determined',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const;
}
const schema = {
  schemaId,
  version,
  root: {
    kind: 'union',
    anyOf: variants.map(({ jealousRivalry }) => {
      const value = claimValue(jealousRivalry);
      return {
        kind: 'object' as const,
        required: Object.keys(value),
        properties: Object.fromEntries(
          Object.entries(value).map(([key, literal]) => [
            key,
            { kind: 'literal' as const, value: literal },
          ]),
        ),
        additionalProperties: false,
      };
    }),
  },
} as const satisfies ClaimValueSchemaDefinition;
const claimType = {
  claimType: SAJU_R39_STEM_RIVALRY_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
const methodology = {
  methodologyId: methodId,
  version,
  family: 'stem_branch_interaction',
  name: 'Position-specific two-to-one heavenly stem rivalry',
  description:
    'Settle the bounded 爭妒 distinction, retaining all joining/effect consequences as unresolved.',
  assumptions: [
    'Exactly one unique R051 member, two counterparts and a fourth stem outside that pair.',
    'Contiguous counterpart/unique/counterpart is admitted rivalry; unique outer with adjacent and remote counterparts is admitted no-rivalry.',
    'All-five-family and mirrored execution is explicit project adoption; other arrangements remain unresolved.',
    'The text retains joining intent during rivalry: neither boolean settles full joining, winner, transformation, role or support effect.',
    'R38 contributes only validated canonical identities; its competitor state and nonjoining authority remain unchanged.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: sources.map((s) => s.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const SAJU_R39_STEM_RIVALRY_RULES = variants.map(
  ({ state, jealousRivalry }, index): RuleDefinition => ({
    ruleId: `RULE-SAJU-R39-STEM-RIVALRY-${index}`,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'stem_branch_interaction',
      subcategory: 'position_specific_rivalry',
    },
    methodologyRef: { id: methodId, version },
    title: `Bounded stem rivalry ${jealousRivalry}`,
    description: 'Actual source-bounded rivalry verdict with full binding and effect unresolved.',
    inputs: [input],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: input.key, path: 'state' },
      right: { kind: 'literal', value: state },
    },
    output: {
      claimType: SAJU_R39_STEM_RIVALRY_CLAIM_TYPE,
      subject: 'natal_visible_stems',
      predicate: 'position_specific_jealous_rivalry',
      value: claimValue(jealousRivalry),
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'rivalry', 'position'],
    },
    sourceRefs: sources.map((s) => ({
      sourceId: s.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Two-to-one rivalry versus separated no-rivalry; joining intent not removed.',
    })),
    quality: {
      provenanceQuality: 'primary_supported',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  }),
);
export const SAJU_R39_STEM_RIVALRY_PACK = {
  packId: 'PACK-SAJU-R39-STEM-RIVALRY-RESEARCH',
  version,
  name: 'SAJU-R39 Position-specific Stem Rivalry',
  methodologyRefs: [{ id: methodId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R39-STEM-RIVALRY-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createSajuR39StemRivalryResearchRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: SAJU_R39_STEM_RIVALRY_RULES,
      methodologies: [methodology],
      sources: [...sources],
      claimTypeDefinitions: [claimType],
      claimValueSchemas: [schema],
      reviewAttestations: [],
    },
    SAJU_R39_STEM_RIVALRY_PACK,
    createdAt,
  );
}
