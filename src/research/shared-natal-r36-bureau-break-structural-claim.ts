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
  SAJU_R36_BUREAU_BREAK_AUTHORITY as authority,
  SAJU_R36_BUREAU_BREAK_EVIDENCE_DEFINITION as definition,
  SAJU_R36_MECHANISMS,
} from './shared-natal-r36-bureau-break-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodologyId = 'M-SAJU-R36-EXACT-TIGHT-EMBEDDED-BUREAU-BREAK';
const ruleSetId = 'saju-r36-exact-tight-embedded-bureau-break';
const schemaId = 'day_master.r36_exact_bureau_break.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const SAJU_R36_BUREAU_BREAK_CLAIM_TYPE = 'EXACT_TIGHT_EMBEDDED_BUREAU_BREAK';
export const SAJU_R36_BUREAU_BREAK_SOURCES = [{
  sourceId: definition.sourceIds[0],
  sourceType: 'web',
  title: '滴天髓闡微 — 方局 / 三合局 긴밀 내부 충파',
  language: 'zh-Hant',
  url: 'https://zh.wikisource.org/wiki/滴天髓闡微',
  accessedAt: '2026-10-08',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
  notes: 'Source-bounded direct-break rule from unchanged I46/I47, not a general transformation or harm rule.',
}] as const;
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale: 'Only full independently replayed snapshot-bound I47 single-tight-embedded break evidence.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'exactBureauBreakEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;
export function sajuR36BureauBreakClaimValue(mechanism: (typeof SAJU_R36_MECHANISMS)[number]) {
  return {
    evidenceKind: 'exact_tight_embedded_bureau_break',
    semanticScope: authority.semanticScope,
    mechanism,
    bureauBreak: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
    relationIdentity: 'exact_validated_research_evidence_only',
    genericBureauIntactness: 'not_determined',
    rootDestruction: 'not_determined',
    supportEffect: 'not_determined',
    effectiveMechanismForce: 'not_determined',
    usefulFactor: 'not_determined',
    qiangRuo: 'not_determined',
    wangShuai: 'not_determined',
    numericWeight: 'not_authorized',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const;
}
const variants = SAJU_R36_MECHANISMS.map((mechanism) => ({
  mechanism, value: sajuR36BureauBreakClaimValue(mechanism),
}));
export const SAJU_R36_BUREAU_BREAK_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'union',
    anyOf: variants.map(({ value }) => ({
      kind: 'object' as const,
      required: Object.keys(value),
      properties: Object.fromEntries(
        Object.entries(value).map(([key, literal]) => [
          key, { kind: 'literal' as const, value: literal },
        ]),
      ),
      additionalProperties: false,
    })),
  },
} as const satisfies ClaimValueSchemaDefinition;
export const SAJU_R36_BUREAU_BREAK_CLAIM_TYPE_DEFINITION = {
  claimType: SAJU_R36_BUREAU_BREAK_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const SAJU_R36_BUREAU_BREAK_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Source-bounded I47 tight embedded bureau break',
  description: 'Only a single I47 tight embedded clash can emit one research T2 break claim per mechanism.',
  assumptions: [
    'I29/I31/I35/I36/I37/I38/I39/I44/I45/I46/I47 must be independently reproduced from resolved validated canonical pillars.',
    'No implicit intactness or negative inference from missing/non-tight/outside/multiple clashes.',
    'The precise bureau, mechanism and clash identities are held by the validated evidence payload.',
    'Bureau breakage is not root destruction, effective force, transformation, useful factor, strength or Production authority.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: SAJU_R36_BUREAU_BREAK_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const SAJU_R36_BUREAU_BREAK_RULES = variants.map(
  ({ mechanism, value }, index): RuleDefinition => ({
    ruleId: 'RULE-SAJU-R36-BUREAU-BREAK-' + index,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'bounded_three_combination_bureau_break',
    },
    methodologyRef: { id: methodologyId, version },
    title: 'Single exact bureau break — ' + mechanism,
    description: 'Positive I47-specific bureau break, not challenge force or root damage.',
    inputs: [input],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: input.key, path: 'mechanismOutcomes.' + mechanism + '.observed' },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SAJU_R36_BUREAU_BREAK_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'exact_three_combination_bureau_break_observed',
      value,
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'three-combination', 'bureau-break', 'positive-only'],
    },
    sourceRefs: SAJU_R36_BUREAU_BREAK_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Direct I46/I47 placement-specific break only.',
    })),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  }),
);
export const SAJU_R36_BUREAU_BREAK_PACK = {
  packId: 'PACK-SAJU-R36-BOUNDED-BUREAU-BREAK-RESEARCH',
  version,
  name: 'SAJU-R36 Exact Embedded Clash Bureau Break Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R36-BOUNDED-BUREAU-BREAK', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createSajuR36BureauBreakResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SAJU_R36_BUREAU_BREAK_RULES,
      methodologies: [SAJU_R36_BUREAU_BREAK_METHODOLOGY],
      sources: [...SAJU_R36_BUREAU_BREAK_SOURCES],
      claimTypeDefinitions: [SAJU_R36_BUREAU_BREAK_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [SAJU_R36_BUREAU_BREAK_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    SAJU_R36_BUREAU_BREAK_PACK,
    createdAt,
  );
}
