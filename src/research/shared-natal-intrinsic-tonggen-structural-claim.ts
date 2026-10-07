import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  MethodologyResearchEvidenceInputContract,
  RuleDefinition,
  RuleInputRequirement,
} from '../contracts/interpretation.js';
import type { PillarSlot } from '../contracts/calculation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  INTRINSIC_TONGGEN_AUTHORITY,
  INTRINSIC_TONGGEN_SLOTS,
} from './phase-independent-intrinsic-tonggen-authority.js';
import { INTRINSIC_TONGGEN_EVIDENCE_DEFINITION as definition } from './shared-natal-intrinsic-tonggen-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodologyId = 'M-PHASE-INDEPENDENT-INTRINSIC-TONGGEN';
const ruleSetId = 'saju-r33-phase-independent-intrinsic-tonggen';
const schemaId = 'day_master.branch_intrinsic_tonggen.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const INTRINSIC_TONGGEN_CLAIM_TYPE = 'DAY_MASTER_BRANCH_INTRINSIC_TONGGEN';
export const INTRINSIC_TONGGEN_SOURCES = [
  {
    sourceId: 'SRC-SAJU-R33-INTRINSIC-TONGGEN-POLICY',
    sourceType: 'web',
    title: 'Project-adopted phase-independent intrinsic Tonggen policy',
    language: 'ko',
    url: 'https://github.com/gycha0109-beep/Saju/issues/2351',
    accessedAt: '2026-10-07',
    provenanceTier: 'cross_reference',
    rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
    notes:
      'Explicit user-adopted methodology, not a primary classical source or Production authority.',
  },
] as const;
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'A branch-local boolean requires complete canonical hidden membership and independent snapshot replay. Phase does not enter the predicate.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'intrinsicTonggenEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;

export function intrinsicTonggenClaimValue(slot: PillarSlot, tonggen: boolean) {
  return {
    evidenceKind: 'phase_independent_intrinsic_tonggen',
    semanticScope: INTRINSIC_TONGGEN_AUTHORITY.semanticScope,
    slot,
    sourceFactRef: `derivedFacts.hiddenStems.${slot}`,
    tonggen,
    twelveGrowthStageUsed: false,
    effectiveRoot: 'not_determined',
    supportWeight: 'not_authorized',
    wholeChartNoRoot: 'not_determined',
    qiangRuo: 'not_determined',
    wangShuai: 'not_determined',
    gyeokguk: 'not_determined',
    narrativeMateriality: false,
    productRootAuthority: 'NOT_GRANTED',
    productionAuthority: false,
  } as const;
}
const variants = INTRINSIC_TONGGEN_SLOTS.flatMap((slot) =>
  [true, false].map((tonggen) => ({
    slot,
    tonggen,
    value: intrinsicTonggenClaimValue(slot, tonggen),
  })),
);
export const INTRINSIC_TONGGEN_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'union',
    anyOf: variants.map(({ value }) => ({
      kind: 'object' as const,
      required: Object.keys(value),
      properties: Object.fromEntries(
        Object.entries(value).map(([key, literal]) => [
          key,
          { kind: 'literal' as const, value: literal },
        ]),
      ),
      additionalProperties: false,
    })),
  },
} as const satisfies ClaimValueSchemaDefinition;
export const INTRINSIC_TONGGEN_CLAIM_TYPE_DEFINITION = {
  claimType: INTRINSIC_TONGGEN_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const INTRINSIC_TONGGEN_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Phase-independent intrinsic branch Tonggen',
  description:
    'Project-adopted same-element hidden membership criterion, separate from classical source-specific phase/root interpretations.',
  assumptions: [
    'All four branch domains including day require resolved complete canonical membership and pinned day-master metadata parity.',
    'Yin/Yang equality is not required; Twelve Growth Stage is not consumed.',
    'False means no same-element member in this checked branch only. Missing, ambiguous or scenario-dependent input cannot become false.',
    'Intrinsic root does not establish effective support, weight, seasonal usability, manifestation, strength or Production authority.',
    'Historical source-strata conflict and R6/R29/R31/R32 contracts remain unchanged.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: INTRINSIC_TONGGEN_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const INTRINSIC_TONGGEN_RULES = variants.map(
  ({ slot, tonggen, value }, index): RuleDefinition => ({
    ruleId: `RULE-SAJU-R33-INTRINSIC-TONGGEN-${index}`,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'branch_intrinsic_tonggen',
    },
    methodologyRef: { id: methodologyId, version },
    title: `${slot} intrinsic Tonggen ${tonggen}`,
    description:
      'Branch-local true or false verdict from complete independently replayed canonical membership.',
    inputs: [input],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: input.key, path: `branches.${slot}.tonggen` },
      right: { kind: 'literal', value: tonggen },
    },
    output: {
      claimType: INTRINSIC_TONGGEN_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'branch_intrinsic_same_element_root_verdict',
      value,
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'intrinsic-tonggen', 'branch-local'],
    },
    sourceRefs: INTRINSIC_TONGGEN_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Explicit adopted project criterion; no winner among historical source strata.',
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
export const INTRINSIC_TONGGEN_PACK = {
  packId: 'PACK-SAJU-R33-INTRINSIC-TONGGEN-RESEARCH',
  version,
  name: 'SAJU-R33 Phase-Independent Intrinsic Tonggen Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R33-INTRINSIC-TONGGEN-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createIntrinsicTonggenResearchRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: INTRINSIC_TONGGEN_RULES,
      methodologies: [INTRINSIC_TONGGEN_METHODOLOGY],
      sources: [...INTRINSIC_TONGGEN_SOURCES],
      claimTypeDefinitions: [INTRINSIC_TONGGEN_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [INTRINSIC_TONGGEN_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    INTRINSIC_TONGGEN_PACK,
    createdAt,
  );
}
